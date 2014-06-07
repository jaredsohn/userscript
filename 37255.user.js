// ==UserScript==
// @name           Slashdot - Remove Left Menu
// @namespace      http://userscripts.org
// @description    Remove the left menu from the Slashdot website.
// @include        http://slashdot.org/*
// @include        http://*.slashdot.org/*
// ==/UserScript==

var tag;

if(tag = document.getElementById("links"))
{
	tag.parentNode.removeChild(tag)
}

if(tag = document.getElementById("contents"))
{
	tag.style.marginLeft = "0px";
}