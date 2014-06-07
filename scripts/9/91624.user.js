// ==UserScript==
// @name           tl reklama
// @namespace      :)
// @include        http://www.torrentleech.org/*
// ==/UserScript==    
// ??

var divs = document.getElementsByTagName('div');

for(i=0;i<divs.length;i++)
{
if(divs[i].id=='supportTorrentLeech')
divs[i].style.display="none";
}