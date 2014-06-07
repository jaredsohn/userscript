// ==UserScript==
// @name           Allakhazam Wow Link Changer
// @namespace      all
// @include        http://wow.allakhazam.com/*
// ==/UserScript==


var style="a { color:#004090; }";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);