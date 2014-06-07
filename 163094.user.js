// ==UserScript==
// @name       Woopra 8.0 Beta remove toolbars
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.woopra.com/livebeta/website/*
// @copyright  2013+, MZT
// ==/UserScript==

GM_addStyle("div.session-toolbar, div.wsidebar, div.footer  {display:none !important;}");
GM_addStyle("div.session-viewport  {top:0 !important;}");
GM_addStyle("div.viewport  {left:0 !important;}");
GM_addStyle("div.global-view  {bottom:0 !important;}");