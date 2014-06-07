// ==UserScript==
// @name 		New Pirate 4x4 Colors
// @namespace 	pirate4x4.com/forum/
// @description	Changes default color theme to more readable
// @include 	http://pirate4x4.com/forum/*
// @include 	http://www.pirate4x4.com/forum/*
// ==/UserScript==

   var style = "body{ -x-system-font: none; background: #777 none repeat scroll 0 0; color: #f5f5f5; }";
   style += ".page{background: #777 none repeat scroll 0 0}";
   style += ".alt1,.alt1Active{background: #333 none repeat scroll 0 0}";
   style += ".alt2,.alt2Active{background: #555 none repeat scroll 0 0}";
   style += ".panel{background: #333 none repeat scroll 0 0; border: 2px outset; color: #f5f5f5; padding: 10px;}";
   style += "a:visited, body_avisited{color: #888; text-decoration: none;}";
   var head=document.getElementsByTagName("HEAD")[0];
   var el=window.document.createElement('link');
   el.rel='stylesheet';
   el.type='text/css';
   el.href='data:text/css;charset=utf-8,'+escape(style);
   head.appendChild(el);