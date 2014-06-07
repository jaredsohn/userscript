// ==UserScript==
// @name           APOD Large Arrows
// @namespace      http://steecky.com
// @description    APOD large arrows.
// @include        http://antwrp.gsfc.nasa.gov/apod/*
// ==/UserScript==

var aTags = document.getElementsByTagName("center");
aTags = aTags[aTags.length - 1].getElementsByTagName("a");
var leftArrow;
var rightArrow;

for (var i = 0; i < aTags.length; i++) 
	if (aTags[i].innerHTML.indexOf("&lt;") == 0) leftArrow = aTags[i];
	else if (aTags[i].innerHTML.indexOf("&gt;") == 0) rightArrow = aTags[i];

leftArrow.innerHTML = "&lt;&lt;&lt;---";
rightArrow.innerHTML = "---&gt;&gt;&gt;";

var title = document.getElementsByTagName("h1")[0];
var titleTxt = document.createTextNode(title.innerHTML);

title.innerHTML = "";
title.appendChild(leftArrow);
title.appendChild(titleTxt);
title.appendChild(rightArrow);
	