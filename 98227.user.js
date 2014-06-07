// ==UserScript==
// @name          meebo.com: No prompt when leaving page
// @description   Closes the page immediately by deactivating "Confirm. Are you sure you want to navigate away from this page?".
// @include       http://www.meebo.com/
// @include       https://www.meebo.com/
// @include       http://www.meebo.com/?*
// @include       https://www.meebo.com/?*
// @include       https://www.meebo.com/messenger
// @include       http://www.meebo.com/messenger
// ==/UserScript==

function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();';}
  var script = document.createElement('script');
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

var myl = window.addEventListener("load", function(){
contentEval(function(){
  var xyzblabla_edcrfv_tbg=window.onbeforeunload;
  window.onbeforeunload=function(a){xyzblabla_edcrfv_tbg(a);return;}

});
}, true);