// ==UserScript==
// @name           Digg.com shorturl remover
// @namespace      facebook
// @description    Digg.com direct url in front page
// @include        http://digg.com/*
// ==/UserScript==

var links = document.getElementsByClassName('offsite');
var i=0;
for(i=0;i<links.length;i++)
{
    if(links[i].getAttribute('title')!='')
        links[i].href = links[i].getAttribute('title');
}