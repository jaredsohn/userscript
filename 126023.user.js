// ==UserScript==
// @name           tagz_dyslexie
// @namespace      tagz
// @description    Réduit la largeur des boites de commentaires pour les gens dyslexique
// @include        http://www.tagz.com/Outaouais/forum_add.asp*
// @include        http://www.tagz.com/Outaouais/forum_add.asp
// ==/UserScript==
//
//


area = document.getElementsByTagName('textarea');
oldWidth = parseInt(area[0].style.width);
newWidth = 280;
area[0].style.width= newWidth;
area[0].style.marginLeft = (oldWidth-newWidth)/2;

