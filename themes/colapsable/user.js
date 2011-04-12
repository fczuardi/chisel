function tweakUpdates(){
  $('.activity').each(function(i){
    if (! $(this).hasClass('tweaked')) { 
      $(this).addClass('tweaked');
      var classname = '';
      try{
        classname = $(this).children('.activity-inner').children('.activity-meta').children().last().html().substring(2);
      } catch(e){}
      $(this).addClass(classname);
      $(this).addClass('closed');
      $(this).click(function(e) {
        $(this).toggleClass('open closed');
      });
    }
  });
}
function init(){
  // Forrst.applyLibs is the function that the page call when the DOM is ready
  // and after every new pagination is loaded, so we extend it and use as the
  // hook to run the custom modifications (tweakUpdates).
  // If the Forrst object is not present, it means that the Forrst javascript 
  //is not loaded yet, so we wait for 2 secconds before trying again.
  if (typeof Forrst != 'undefined') {
    applyLibsCopy = Forrst.applyLibs;
    extendedApplyLibs = function(){
      applyLibsCopy();
      tweakUpdates();
    };
    Forrst.applyLibs = extendedApplyLibs;
    tweakUpdates();
  }else{
    setTimeout(init, 1000 * 2);
  }
}
init();