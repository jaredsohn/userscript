// ==UserScript==
// @namespace   http://www.tweaksthelimbs.org/greasemonkey
// @name          woot checker tweak
// @include     http://www.totalfta.com/woot/
// ==/UserScript==

var i = document.getElementsByTagName('img')[0];
i.setAttribute('style','border:0');
var link = document.createElement('a');
link.setAttribute('href','http://www.woot.com');
link.setAttribute('target','_blank');
var insert = i.parentNode.insertBefore(link,i);
insert.appendChild(i);
//.user.js