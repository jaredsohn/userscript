// Yahoo Mail Google Gadget Cleanup - Detail Pages
// Version 0.1.5
// Copyright (c) 2008, SpanishGringo
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name           Yahoo Mobile Mail Detail Cleanup - Google Gadget
// @namespace      http://www.google.com/ig
// @include        http://intl.m.yahoo.com/p/mail/messagedetail*
// @description    Clean up Mobile Yahoo Mail in your Google Gadget - Detail Page
// @author        Michael Freeman (http://spanishgringo.blogspot.com)
// @datecreated   March 10 2008
// @lastupdated   Sept 17 2008
// ==/UserScript==

document.styleSheets[0].insertRule('body { font-size:11px;}',document.styleSheets[0].cssRules.length);

var arr = document.getElementsByTagName('img');
arr[0].style.display='none';
arr[arr.length-1].style.display='none';

var arr = document.getElementsByTagName('div');
arr[arr.length-1].style.display='none';
arr[arr.length-2].style.display='none';
//arr[arr.length-3].style.display='none';

