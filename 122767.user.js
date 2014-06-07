// ==UserScript==

// @name          Replace [img]...[/img] with Image

// @namespace     http://www.webmonkey.com

// @description   Replaces the [img] and the text between them with the image

// @include       *
// @exclude       http://www.youtube.com/*

// ==/UserScript==


document.body.innerHTML = document.body.innerHTML.replace(/\[img\]/g,"<img src=\"").replace(/\[\/img\]/g,"\"/>");
document.body.innerHTML = document.body.innerHTML.replace(/\[IMG\]/g,"<img src=\"").replace(/\[\/IMG\]/g,"\"/>");