// ==UserScript==
// @name           join.me leavebox
// @namespace      http://userscripts.org/scripts/show/116350
// @include        https://join.me
// ==/UserScript==

function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();';}
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function(){
  window.onbeforeunload = function () { return confirm('Are you sure you want to leave?'); }
});
