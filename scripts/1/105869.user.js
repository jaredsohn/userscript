// ==UserScript==
// @include http://google.*
// @include http://www.google.*
// @include https://google.*
// @name remove the plus one mouseover
// @description if you hate google's animated +1 button, then you'll love this script.
// ==/UserScript==
//
// google.pw.a.F = google.pw.a.j = function() {};
// ripped some from http://userscripts.org/scripts/show/105768

function addStyle(newStyle) {
  var styleElement = document.getElementById('style_js');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.id = 'style_js';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  styleElement.appendChild(document.createTextNode(newStyle));
}
addStyle('.esw { background: url(/images/experiments/nav_logo78.png) !important; background-position: 0 -243px !important; }' +
  '.esw:hover { background: url(/images/experiments/p1/p1sprite.png) !important; background-position: -400px 0 !important; }');
