// ==UserScript==
// @name          Bethany Kayako Styles
// @namespace     http://www.bethany.org
// @description   Blah
// @include       https://support.bethany.org/staff/*
// @version       1.2
// ==/UserScript==

var doc = document;
var head  = doc.getElementsByTagName('head')[0];
var link  = doc.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = 'https://www.bethany.org/assets/css/kayako.css';
link.media = 'all';
head.appendChild(link);
