// ==UserScript==
// @name           better lsp-f
// @namespace      lsp-f,vbulliten,forum,great,skin
// @description    the previous skin for lsp-f
// @include        http://lsp-f.co.il/*
// @include        http://www.lsp-f.co.il/*
// ==/UserScript==
   var style = "body{background: white 0 0 repeat}";
   style += ".page{background: white none repeat scroll 0 0}";
   style += ".panel{background: white none repeat scroll 0 0; border: 2px outset; color: black; padding: 10px;}";
   style += ".vbmenu_control {background: black;}";
   var head=document.getElementsByTagName("HEAD")[0];
   var el=window.document.createElement('link');
   el.rel='stylesheet';
   el.type='text/css';
   el.href='data:text/css;charset=utf-8,'+escape(style);
   head.appendChild(el);
