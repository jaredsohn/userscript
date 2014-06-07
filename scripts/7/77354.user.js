// ==UserScript==
// @name           deviantART v7 transparent shadow
// @description    Removes the shadow overlay on deviantART v7 allowing transparent PNG deviations to blend in with the site
// @namespace      dev7transshdw
// @include        http://*.deviantart.com/
// ==/UserScript==

var style=".smshadow,.smshadowbg {background:none}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);