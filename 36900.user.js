// ==UserScript==
// @name           Nealz Nuze Formatter
// @namespace      eric.biven.us
// @description    Restores Nealz Nuze to it's previous glory (with improvements).
// @include        http://boortz.com/*
// @include        http://www.boortz.com/*
// ==/UserScript==

var listenLive = document.getElementById('streamLink');
listenLive.style.cssFloat = 'right';
listenLive.style.width = '200px';

var header = document.getElementById('logoAdContainer');
header.removeChild(header.childNodes[1]);
header.appendChild(listenLive);

var ads = document.getElementById('rightColumnCell');
ads.parentNode.removeChild(ads);

var head = document.getElementsByTagName('head')[0];
if (head) {
    style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode('.hrDivider, .blogFooter, .blogEntryByline { display: none; }'));
    style.appendChild(document.createTextNode('.blogEntry { padding-bottom:20px; }'));
    style.appendChild(document.createTextNode('.storyhed { padding-bottom:10px; display:block; }'));
    style.appendChild(document.createTextNode('.blogEntryBody > table { margin:10px 0px 10px 20px; }'));
    style.appendChild(document.createTextNode('#pageWrapper, #centerColumn { width:auto; }'));
    style.appendChild(document.createTextNode('.pageContainer { margin:0px 10px 0px 10px; }'));
    
    head.appendChild(style);
}
