// ==UserScript==
// @name           Cleaner EvoTab
// @description    Cleaner and smaller header for EvoTab. Also removes the ads in the header.
// @namespace      cleanerevotab
// @include        http://www.evotab.com/
// ==/UserScript==

var style="#header{height:45px}#headerline,#footer{display:none}#login{margin:0;}#login p{margin:5px!important;}#menu,#curtime,#navi{position:absolute;margin-left:120px;top:1px;}#menu{displat:block;width:400px;position:relative;margin-left:0;top:5px;}#navi{top:13px;}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);