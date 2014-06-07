// ==UserScript==
// @name           City of Heroes vBulletin Font Stripper
// @namespace      Bryan K. Williams
// @description    Strips Font changes (style and color) from posts in CoH Boards
// @include        http://boards.CityOfHeroes.com/*
// ==/UserScript==
//
// Untested, but it might also be able to strip font changes from other vBulletin boards

var PostDiv = document.getElementById("posts").getElementsByTagName("font");
for (i=0;i< PostDiv.length;i++)
{
    PostDiv[i].removeAttribute("face");
    PostDiv[i].removeAttribute("color");
    PostDiv[i].removeAttribute("size");
}
