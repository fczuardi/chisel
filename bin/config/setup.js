//= Default Options
this.options = { 
    'theme': 'collapsible_forrst'
   ,'clipboard': false
   ,'buildpage': false
};

//= Constants
this.DEFAULT_BUILD_PATH = "../builds";
this.DEFAULT_THEMES_PATH = "../themes";
this.DEFAULT_BOOKMARKLET_TEMPLATE = "../templates/bookmarklet_template.js";
this.DEFAULT_INSTALL_PAGE_TEMPLATE = "../templates/install_page.html";
this.SCRIPT_SOURCE_CODE_URL = "https://github.com/fczuardi/chisel";
this.SCRIPT_NAME = 'Chisel Compiler';
this.VERSION = '0.1';
this.SCRIPT_TITLE = '\n'+this.SCRIPT_NAME+
                    '\n-------------------------------\n';
this.HELP_TEXT = ''
+ 'Description:\n'
// +'\tExtensions for Mobile Safari'
+ '\tBuilds a bookmarklet URL to apply changes on the content of a web-page.\n'
+ '\tThe bookmarklet is built from a set of user-scripts (javascript and css) \n'
+ '\torganized in a folder containing a manifest file. That folder is a theme.\n'
+ '\n'
+ 'Usage:\n'
+ '\tnode chiselc.js [option value] [option value]…\n'
+ '\n'
+ 'Options:\n'
+ '\t-c/--clipboard:\n'
+ '\t\tCopy the resulting bookmark to the clipboard. Requires pbcopy http://is.gd/lv5j9U \n'
+ '\n'
+ '\t-h/--help:\n'
+ '\t\tPrint this help page.\n'
+ '\n'
+ '\t-p/--build-page:\n'
+ '\t\tGenerates a HTML page containing the bookmarklets under the '
+ this.DEFAULT_BUILD_PATH +'/<themplate name> folder.\n'
+ '\n'
+ '\t-t/--theme:\n'
+ '\t\tThe name of the theme to use. Defaults to "colapsable".\n'
+ '\n'
+ '\t--version:\n'
+ '\t\tPrint the software version and exit.\n'
+ '\n'
+ 'Example:\n'
+ '\tnode chiselc.js -t collapsible_forrst\n'
+ '\n'
+ 'Author:\n'
+ '\tFabricio Campos Zuardi\n'
+ '\tForrst:  @fabricio\n'
+ '\tTwitter: @fczuardi\n'
+ '\tWebsite: http://fabricio.org\n'
+ '\n'
+ 'Contributions:\n'
+ '\t'+this.SCRIPT_NAME+' is a Free Software released under the MIT License, which\n'
+ '\tmeans that you are welcome to copy, study and modify this software and, why not,\n'
+ '\teven contribute with improvements and bug fixes!\n'
+ '\n'
+ '\tThe code is hosted at '+this.SCRIPT_SOURCE_CODE_URL+'\n'
+ '\n';
