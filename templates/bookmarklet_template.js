(function() {
  var css_url,js_url,new_link,new_script;
  css_url = "data:text/css,{{CSS_CODE}}";
  js_url = "data:text/javascript,{{JS_CODE}}";
  new_link = document.createElement('link');
  new_link.rel = 'stylesheet';
  new_link.href = css_url;
  document.getElementsByTagName('head')[0].appendChild(new_link);
  new_script = document.createElement('script');
  new_script.type = 'text/javascript';
  new_script.src = js_url;
  document.body.appendChild(new_script);
})();