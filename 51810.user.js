// ==UserScript==
// @name           EQAL Tagline Script
// @namespace      Renegade
// @description    Just a snarky little script to add the common mock-tagline to EQAL's site. Also kills the annoyingly bloated, slow, autoplaying flash video player on their landing page.
// @include        http://www.eqal.com/*
// @include        http://eqal.com/*
// ==/UserScript==

if(document.getElementById("head") != null) {
	var tempHead = document.getElementById("head");
	var tempDiv = document.createElement("div");
	tempDiv.appendChild(document.createTextNode("because U don't matter"));
	tempDiv.style.color = "#EEEEEE";
	tempDiv.style.fontSize = "140%";
	tempDiv.style.fontWeight = "bold";
	tempDiv.style.textTransform = "uppercase";
	tempDiv.style.position = "absolute";
	tempDiv.style.top = "73px";
	tempDiv.style.left = "95px";
	tempDiv.style.letterSpacing = "0.03em";
	tempHead.style.position = "relative";
	tempHead.style.top = "0px";
	tempHead.style.left = "0px";
	tempHead.appendChild(tempDiv);
}

if(document.getElementById("player") != null) {
	document.getElementById("player").innerHTML = "";
}

// EOF