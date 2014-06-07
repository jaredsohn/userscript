// ==UserScript==
// @name           Dotsiefy all
// @description    This script applies the "Dotsies" font on every Page. The code equals the one from the bookmarklet at http://dotsies.org
// @namespace      isthisreallife
// @include        *
// ==/UserScript==

var l=document.createElement('link');
document.getElementsByTagName('head')[0].appendChild(l);
l.setAttribute('href','http://dotsies.org/dotsies.css');
l.setAttribute('type','text/css');
l.setAttribute('rel','stylesheet');
var s=document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(s);
s.innerHTML=('body,p,div,span,a,li,textarea,input,font,blockquote{font-family:Dotsies!important}');