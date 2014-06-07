// ==UserScript==
// @name 	Persian Blogger
// @description 	Changing Blogger's default font to Tahoma, making it better looking for persian users.
// @author	Araz Rad
// @namespace 	Blogger
// @version 	1.0
// @license 	GPL
// @include 	http://*.blogger.com/*
// @include 	https://*.blogger.com/*
// ==/UserScript==

var fontTahoma = "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p {font-family: tahoma !important;} ";
fontTahoma+=" *{font-family: tahoma !important;}";
GM_addStyle(fontTahoma);
