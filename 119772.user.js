// ==UserScript==
// @name 		Blogger.com Tahoma Font
// @description 	Tahoma font for blogger. If you are sick of Blogger font, this script is for you.
// @author		Salar2K
// @namespace 	Blogger
// @version 	1.0
// @license 	Creative Commons Attribution-Noncommercial-Share Alike 3.0
// @include 	http://blogger.com/*
// @include 	http://www.blogger.com/*
// ==/UserScript==

var fontTahoma = "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p {font-family: tahoma !important;} ";
fontTahoma+=" *{font-family: tahoma !important;}";
GM_addStyle(fontTahoma);