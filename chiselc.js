//= Globals
//== Libraries
var  config = require('./config/setup')
    ,arguments = require('node-arguments')
    ,util = require('util')
    ,fs = require('fs')
    ,path = require('path')
    ,sys = require("sys")
    ,exec  = require('child_process').exec
    ,cssmin = require('yuicompressor/ports/js/cssmin').cssmin
    ,uglify = require("uglify-js");

// sys.print('\x1B[0;0H');
// sys.print('\x1B[2J');//clearscreen DEBUG

//== Variables
var  options = config.options
    ,manifestContents = ''
    ,manifest = {}
    ,cssData = []
    ,jsData = []
    ,bookmarkletTemplate = ''
    ,compressedBookmarklet = ''
    ,bookmarklet = '';

//= Functions
//== loadManifest()
function loadManifest(callback, err){
  var manifestPath = path.join(config.DEFAULT_THEMES_PATH, config.options.theme, 'manifest.json');
  fs.readFile(manifestPath, 'utf-8', function (err, data) {
    if (err) return callback(err);
    manifestContents = data;
    callback();
  });
}

//== loadScripts()
function loadScripts(callback, err){
  var  cssFiles = []
      ,jsFiles = []
      ,cssCount = 0
      ,jsCount = 0
      ,scriptCounter = {'total':0, 'loaded':0}
      ,scriptGroups = [{'data':cssData,'fileset':[]}, {'data':jsData,'fileset':[]}];
  if (err) return callback(err);
  try{
    manifest = JSON.parse(manifestContents);
  } catch(e){
    printAndExit('Invalid JSON manifest: ' + e.message, -1);
    return false;
  }
  manifest.content_scripts.forEach(function updateGlobalVars(item){
    scriptGroups[0].fileset = scriptGroups[0].fileset.concat(item.css);
    scriptGroups[1].fileset = scriptGroups[1].fileset.concat(item.js);
    scriptCounter.total = scriptCounter.total + item.css.length + item.js.length;
  });
  scriptGroups.forEach(
    function processGroup(scriptGroup) {
      scriptGroup.fileset.forEach(
        function loadScript(item, index){
          var scriptPath = path.join(config.DEFAULT_THEMES_PATH, config.options.theme, item);
          fs.readFile(scriptPath, 'utf-8', 
            function scriptLoaded(index, group, counter, err, data) {
              if (err) return callback(err);
              group.data[index] = data;
              counter.loaded = counter.loaded + 1;
              if (counter.loaded === counter.total){
                callback();
              }
            }.bind(this, index, scriptGroup, scriptCounter)
          );
        }
      );
    }
  );
}

//== loadBookmarkTemplate()
function loadBookmarkTemplate(callback, err){
  if (err) return callback(err);
  fs.readFile(config.DEFAULT_BOOKMARKLET_TEMPLATE, 'utf-8', 
    function templateLoaded(err, data) {
      if (err) return callback(err);
      bookmarkletTemplate = data;
      callback();
    }
  );
}

//== writeBookmarklets() 
function writeBookmarklets(err){
  var  urlProtocol = 'javascript'
      ,css = cssData.join('\n')
      ,js = jsData.join('\n')
      ,compressedCss = ''
      ,compressedJs = '';
      if (err) return(console.log(err));
  //regular bookmarklet
  bookmarklet = bookmarkletTemplate.replace('{{CSS_CODE}}', css).replace('{{JS_CODE}}', js);

  //compressed bookmarklet
  compressedCss = cssmin(css);
  compressedJs = uglifyScript(js).replace(/\"/g,"\\\"");
  compressedTemplate = uglifyScript(bookmarkletTemplate); 
  compressedBookmarklet = compressedTemplate.replace('{{CSS_CODE}}', compressedCss).replace('{{JS_CODE}}', compressedJs);

  if (config.options.clipboard){
    //send compressed version to clipboard
    exec('echo "$CONTENTS"|pbcopy', {env:{'CONTENTS':urlProtocol + ':' + compressedBookmarklet}},
      function (error, stdout, stderr) {
        if (error !== null) {
          console.log('Error sending bookmarklet to clipboard: ' + error);
        }
    });
  }
  console.log('---\nTheme: %s v%s', manifest.name, manifest.version);
  console.log('Description: %s', manifest.description+'\n---');
  console.log("\n--BOOKMARKLET CODE--");
  console.log(urlProtocol + ':' + compressedBookmarklet+"\n");
  return true;
}


//= Preferences and Help
//== setPreference()
function setPreference(prefName, end, prefValue){
  if (prefName == 'clipboard'){ prefValue = true; }
  config.options[prefName] = prefValue || config.options[prefName];
  end();
}

//== printDefaultHeader()
function printDefaultHeader(){
  console.log(config.SCRIPT_TITLE);
  if (process.argv.length == 2){
    console.log(' * Check the HELP page: node '+ __filename.substring(__dirname.length+1, __filename.length) +' --help\n');
  }
}

//== printHelp()
printHelp = function (){
  printDefaultHeader();
  printAndExit(config.HELP_TEXT, 0);
};

//== printVersion()
function printVersion(){
  printAndExit(config.VERSION+'\n', 0);
}

//== invalidArgument()
function invalidArgument(arg, valueMissing){
  printAndExit('Error: the argument '+arg+' '+(valueMissing?'expects a value':'is not valid.')+'\n', 1);
}


//= Helper functions
//== printAndExit()
printAndExit = function (msg, exitcode){
  exitcode = (exitcode === undefined) ? 0 : exitcode;
  process.stdout.end(msg+'\n');
  process.stdout.addListener('close', function(){
    // process.exit(exitcode);
  });
};

//== uglifyScript()
uglifyScript = function (js){
  var  jsp = uglify.parser
      ,pro = uglify.uglify
      ,ast = jsp.parse(js,true);
  ast = pro.ast_mangle(ast,{'toplevel':true});
  ast = pro.ast_squeeze(ast);
  return pro.gen_code(ast);
};

//= Main
main = function (){
  printDefaultHeader();
  loadManifest(
    loadScripts.bind(this,
      loadBookmarkTemplate.bind(this,
        writeBookmarklets
      )
    )
  );
};

//= Command Line Options
arguments.parse([
     {'name': /^(-h|--help)$/, 'expected': null, 'callback': printHelp}
    ,{'name': /^(--version)$/, 'expected': null, 'callback': printVersion}
    ,{'name': /^(-c|--clipboard)$/, 'expected': null, 'callback': setPreference.bind(this,'clipboard')}
    ,{'name': /^(-t|--theme)$/, 'expected': /^.+$/, 'callback': setPreference.bind(this,'theme')}
  ], main, invalidArgument);