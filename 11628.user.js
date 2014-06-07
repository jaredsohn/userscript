// ==UserScript==
// @name           w3schools LargeView
// @namespace      redleafong
// @description    Larger content area for w3schools.com
// @include        http://www.w3schools.com/*
// ==/UserScript==

var leftTDWidth = 137;
var rightTDWidth = 145;
var midTDWidthMin = 490;

function resizeMidTD()
{
	var winWidth = window.innerWidth;
	var pos = document.body.childNodes.length - 2;
	var midTD = document.body.childNodes[pos].childNodes[1].childNodes[0].childNodes[3];
	midTD.style.width = "100%";
}
	
window.addEventListener("load", function() { resizeMidTD(); }, true);
