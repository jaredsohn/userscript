// ==UserScript==
// @name        Linicom ads page skip
// @namespace   Linicom.co.il
// @version     1.0
// @description	Skips the Linicom advertisements appear before navigating the wanted url
// @include     http://linicom.co.il/external/?*
// @include     http://linicom.co.il/*
// @version     1.0
// ==/UserScript==

var link = document.getElementById("url");
if (link != null)
	document.location.href = link.href;