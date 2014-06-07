// ==UserScript==
// @name        Google Maps fullview
// @namespace   sbm
// @include     http://maps.google.de/*
// @include     http://maps.google.com/*
// @include     https://maps.google.de/*
// @include     https://maps.google.com/*
// @version     1.0
// ==/UserScript==

var pfeil = document.getElementById("panelarrow2");
var topbars = document.getElementById("gb");
var map = document.getElementById("map");

var topbarsH = topbars.offsetHeight;

var status = true;

pfeil.onclick = toggleVisibility;


function toggleVisibility()
{
	if(status)
	{
		map.style.height = (map.offsetHeight + topbarsH).toString() + "px";
		topbars.style.display = "none";
	}
	else
	{
		map.style.height = (map.offsetHeight - topbarsH).toString() + "px";
		topbars.style.display = "block";
	}
	status = !status;
}