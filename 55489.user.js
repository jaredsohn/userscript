// ==UserScript==
// @name Remove Gulli Dereferer
// @description Entfernt den dontknow.me Link auf Gulli
// @include *gulli.com*
// ==/UserScript==

var dontknow = document.getElementsByTagName("a");
for(var i=0; i<dontknow.length; i++) if(dontknow[i].href)
dontknow[i].href = dontknow[i].href.replace("http://dontknow.me/at/?","");