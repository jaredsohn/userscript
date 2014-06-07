// ==UserScript==
// @name           MinecraftSkins
// @namespace      mcskindex
// @description    Limit content width to 900px (better for widescreen high resolutions)
// @include        http://www.minecraftskins.com/
// ==/UserScript==

var style="#content{width:900px;margin:0 auto}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);