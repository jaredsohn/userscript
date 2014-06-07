// ==UserScript==
// @name           PicName
// @namespace      http://pokeliga.com
// @include        http://pokeliga.com/fanart/art.php?pic=*
// ==/UserScript==

document.title+=" > "+document.getElementsByTagName("h1").item(0).innerHTML;
document.title+=" ["+document.getElementsByTagName("h1").item(0).nextSibling.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.innerHTML+"]";