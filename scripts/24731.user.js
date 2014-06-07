// ==UserScript==
// @name           mlb
// @namespace      mlb
// @description    mlb fix
// @include        http://www.mlb.com/enterworkflow.do*
// ==/UserScript==
var patt1 = /http:[^"]*/g;
media_url=document.getElementsByTagName('head')[0].innerHTML.match(patt1);
window.open(media_url);

