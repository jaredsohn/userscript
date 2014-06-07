// ==UserScript==
// @name           Wrts 2.0
// @namespace      wrts.nl
// @description    Past Wrts aan
// @include        http://www.wrts.nl/*
// ==/UserScript==

var x_url = document.location.href;
if (x_url.indexOf("thiememeulenhoff") == "-1") 
{
	var x_link = document.getElementsByTagName("link")[0];
	x_link.href = "http://icurse.nl/wrts/style_basic.css";
}