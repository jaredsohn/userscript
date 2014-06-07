// ==UserScript==
// @name           actionflash.com php 2 swf
// @namespace      none
// @description    makes links to games point to the swf file itself (click the image to open game in a new window, right click and save as to save
// @include        http://www.actionflash.com/directory*
// ==/UserScript==

document.body.innerHTML= document.body.innerHTML.replace(/.php\" target=\"_blank\"><img/g,".swf\" target=\"_blank\"><img");
