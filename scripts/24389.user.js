// ==UserScript==
// @name           leprosorium lowercase
// @namespace      syntezzz.leprosorium
// @include        http://leprosorium.ru/
// @include        http://www.leprosorium.ru/
// @include        http://www.leprosorium.ru/pages/*
// ==/UserScript==

if (new Date() >= new Date(2008, 2, 27) && new Date() <= new Date(2008, 3, 3))
{
	var divs = document.getElementsByClassName("post");
	
	for (i = 0;i < divs.length;i++) {
		div = divs[i];
		div.style.textTransform = 'lowercase';
	}
}