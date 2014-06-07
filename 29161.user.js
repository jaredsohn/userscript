// ==UserScript==
// @name           Pixel ääres
// @namespace      http://*pixel.ee/
// @include        http://*pixel.ee/
// ==/UserScript==
   var style="CENTER { text-align: left; margin-left: 15px; }";
   var head=document.getElementsByTagName("HEAD")[0];
   var el=window.document.createElement('link');
   el.rel='stylesheet';
   el.type='text/css';
   el.href='data:text/css;charset=utf-8,'+escape(style);
   head.appendChild(el);