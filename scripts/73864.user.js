// ==UserScript==
// @name           ColorHenk
// @namespace      tweakers.net
// @description    Haalt Henk uit cover als je over hem heen gaat op de forum index
// @include        http://gathering.tweakers.*/
// @exclude        http://gathering.tweakers.*/forum/*
// ==/UserScript==

var header = document.getElementById('forumheading');
header.style.background = "transparent";
header.style.position = 'relative';
header.firstChild.style.width = '550px';
header.firstChild.nextSibling.style.width = '550px';
var henkdiv = document.createElement('div');
henkdiv = header.insertBefore(henkdiv, header.firstChild);
henkdiv.id = 'henkdiv';

function addCss(cssCode) {
var styleElement = document.createElement("style");
  styleElement.type = "text/css";
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = cssCode;
  } else {
    styleElement.appendChild(document.createTextNode(cssCode));
  }
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}

addCss(	'#henkdiv { width: 150px; height: 63px; margin-right: 38px; float: right; background: url("/g/forum/images/layout/henk.gif") no-repeat scroll left bottom transparent} #henkdiv:hover { background-image: url("http://tweakers.net/ext/f/ysnnTZgm1SJ8lGjtTbW5Wk7u/full.png")}');