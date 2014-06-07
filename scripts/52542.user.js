// ==UserScript==
// @name I-Am-Bored Window Fixer
// @description    Prevent opening of links in new window
// @include	*.i-am-bored.com/*
// ==/UserScript==

var links;
links = document.getElementsByTagName('a');
for(i=0;i<links.length;i++)
{
links[i].setAttribute('target','');
}