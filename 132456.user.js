// ==UserScript==
// @name Window fixer
// @description Prevent opening of links in new windows by setting target to null
// @include http://*
// @include https://*
// ==/UserScript==
var links;
links = document.getElementsByTagName('a');
for(i=0;i<links.length;i++)
{
links[i].setAttribute('target','');
}
