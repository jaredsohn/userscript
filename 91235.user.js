// ==UserScript==
// @name           lwgame img resizer
// @namespace      http://userscripts.org/scripts/show/91235
// @include        http://www.lwgame.net/news*
// @version        1.0
// ==/UserScript==

var content=document.getElementsByClassName('eMessage')

for(var i=0;i<content.length;i++){
var img=content[i].getElementsByTagName('img')[0];
if(img.width>=450){img.setAttribute('width','440px')}
}