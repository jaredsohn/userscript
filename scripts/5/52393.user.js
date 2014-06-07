// Enhance TweetDeckColorSchemes user script for http://tweetdeckcolorschemes.com
// version 1.0 BETA!
// 2005-04-25
// Copyright (c) 2009, jaron barends
// Released under the Creative Commons GPL license
// http://creativecommons.org/licenses/GPL/2.0/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Enhance TweetDeckColorSchemes", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Enhance TweetDeckColorSchemes
// @namespace     http://jaron.nl/
// @description   Resizes and repositions the colorsamples at tweetdeckcolorschemes.com to represent the shape of a tweetdeck window
// @include       http://tweetdeckcolorschemes.com/*
// @exclude       
// ==/UserScript==

var h = document.getElementsByTagName("head")[0];
h.innerHTML += '<style type="text/css">	body .colorpalette{position:relative;}body .colorpalette div{border:none;}body .post{margin-bottom:1em;}body #contentwrap .permalink{border-bottom:1px solid #333;}.colorpalette div[title^="Primary Background Color"]{position:absolute;top:0;left:0;width:100px;height:50px;border:1px solid #333;}.colorpalette div[title^="Secondary Background Color"]{position:absolute;top:5px;left:2px;width:96px;height:40px;}.colorpalette div[title^="Input Area Background Color"]{position:absolute;top:12px;left:8px;width:76px;height:10px;border-top:1px solid #000;border-left:1px solid #000;}.colorpalette div[title^="Primary Text Color"]{position:absolute;top:29px;left:6px;width:70px;height:2px;}.colorpalette div[title^="Primary Text Color"]:after{}.colorpalette div[title^="Secondary Text Color"]{position:absolute;top:34px;left:6px;width:50px;height:1px;}.colorpalette div.legend{float:none;margin-left:120px;width:300px;height:auto;font-size:11px;}#contentwrap .colorpalette div.legend a{text-decoration:underline;color:#999;}#contentwrap .colorpalette div.legend a:hover{text-decoration:underline;}.colorpalette div.legend .colors{display:none;float:none;width:300px;height:auto;color:#999;}</style>';

var pHtml, tagcloud, cw;
var divs = document.getElementsByTagName("div");
for (var i=0; i<divs.length; i++) {
	var d = divs[i];
	if (d.className.indexOf("pagination") != -1) {
		pHtml = d.innerHTML;
	}
	if (d.className.indexOf("tagcloud") != -1) {
		tagcloud = d;//later insert pagination before this div
	}
	if (d.className != "colorpalette") continue;
	var html = "<div class='legend'>";
	var id = "colors-"+i;
	html += '<a href="#" onclick="document.getElementById(\''+id+'\').style.display=\'block\';return false;">Show colors</a>';
	html += "<div class='colors' id='"+id+"'>";
	var pdivs = divs[i].getElementsByTagName("div");
	for (var j=0; j<pdivs.length; j++) {
		html += pdivs[j].title+"<br>";
	}
	html += "</div>";
	html += "</div>";
	divs[i].innerHTML += html;
}
//add extra pager
if (tagcloud) {
	var cw = document.getElementById("contentwrap");
	var paginator = document.createElement('div');
	paginator.setAttribute('class', 'post pagination');
	cw.insertBefore(paginator,tagcloud);
	paginator.innerHTML = pHtml;
}