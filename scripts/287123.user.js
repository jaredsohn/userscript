// ==UserScript== 
// @name No More Comments
// @namespace http://www.marcoporcho.com/
// @description Removes the comments from Folha de São Paulo website.
// @include http://*.folha.uol.com.br/* 
// ==/UserScript==


document.getElementById("articleComments").style.display = "none"
