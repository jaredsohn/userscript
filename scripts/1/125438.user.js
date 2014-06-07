// ==UserScript==
// @name           Apfeltalk Clean&Simple
// @namespace      my.own
// @include        http://www.apfeltalk.de/*
// ==/UserScript==

var ad = document.getElementById('rightcontent');
var content = document.getElementById('bodycontent');
var topHeader = document.getElementById('top_header');
var main = document.getElementById('maincontent');
var home = document.body;

content.removeChild(ad);
main.removeChild(topHeader);

main.style.width = '1000px';;
content.style.width = '1000px';
content.style.minWidth = '1000x';
content.style.maxWidth = '1000px';
content.style.position = 'absolute';
content.style.left = '50%';
content.style.marginLeft = '-500px';

home.style.width = '1000px';

