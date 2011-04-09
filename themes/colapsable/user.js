function tweakUpdates(){
  $('.activity').each(function(i){
    if (! $(this).hasClass('tweaked')) { 
      $(this).addClass('tweaked');
      var classname = '';
      try{
        classname = $(this).children('.activity-inner').children('.activity-meta').children().last().html().substring(2);
      } catch(e){}
      $(this).addClass(classname);
      $(this).click(function(e) {
        $(this).children('.activity-inner').toggleClass('open');
      });
    }
  });
}
function init(){
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