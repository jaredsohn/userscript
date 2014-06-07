// ----------
// CraigslistFriendHighlighter (modified version of CraigslistTrollBlocker)
// 01-12-2008 MasterSeijuro@yahoo.com
// Please consider this script released under GPL
//
// Offers a configurable list for highlighting <s>blocking</s> handles on forums in CL.  All
// posts for listed handles will be <s>over-written with an innocuous message</s> highlighted.
// This is great for <s>blocking</s> spotting those <s>annoyances from idiots</s> awesome peeps.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Craigslist Friend Highlighter
// @description   This is a tool which will let you filter Craigslist Forum posts somewhat.
// @include       http://*.craigslist.*/forums*act=DF*
// @include       http://*.craigslist.*/forums*act=showThread*
// @include       http://*.craigslist.*/forums*act=shuffle*
// @version 	  2011.05.04
// ==/UserScript==
//
// ----------------------------------------------------------------------------------


//load the real script at http://fbastage.zxq.net/cl_highlight.js
var js = document.createElement('script');
js.type = "text/javascript";
js.src= "http://fbastage.zxq.net/cl_highlight.js";
document.getElementsByTagName('head')[0].appendChild(js);
