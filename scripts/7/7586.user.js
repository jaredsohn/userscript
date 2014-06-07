// ==UserScript==
// @name          XKCD Redesigned
// @namespace     http://azrael.awardspace.co.uk/
// @description   A redesign of XKCD.
// @author        Peter "Azrael" Bunyan
// @include       http://xkcd.tld/*.html
// @include       http://www.xkcd.tld/*.html
// @include       http://xkcd.tld/
// @include       http://www.xkcd.tld/
// ==/UserScript==

title = document.getElementsByTagName('h1')[0];
document.title = 'xkcd - '+title.innerHTML;
img = document.getElementsByTagName('img')[1];
info = document.getElementsByTagName('h3');
permalink = info[1].innerHTML.split(': ')[1];
subtitle = document.createElement('h3');
title.parentNode.insertBefore(subtitle, title.nextSibling);
subtitle = document.getElementsByTagName('h3')[0];
subtitle.innerHTML = '"'+img.title+'"';
img.title = '';
info[1].innerHTML = 'URL: <a href="'+img.src+'">'+img.src+'</a>';
info[2].innerHTML = 'Permalink: <a href="'+permalink+'">'+permalink+'</a>';

GM_addStyle("body {font-variant:normal; font-size: 8pt; font-weight: normal; font-style: normal; background: #494e52;} h3 {font-variant: normal; font-weight: normal; font-style: italic; font-size: 8pt;} #middleContent ul{width: 440px;} #middleContent ul li a {background: #494e52;} #middleContent ul li a:hover {color: #494e52;} #topLeft a, #topLeft a:hover {font-size: 20px;} .dialog .hd, .dialog .hd .c, .dialog .bd, .dialog .bd .c, .dialog .ft, .dialog .ft .c {background: #494e52;} .dialog .bd .c .s {padding-bottom: 20px; margin-top: -10px;} a {color: #494e52;} #container {padding-bottom: 0;} a > img {display: none;} #logo a > img {display: inline;}") 