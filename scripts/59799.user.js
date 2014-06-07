// ==UserScript==
// @author		dOCnOK
// @namespace	http://userscripts.org/users/56730
// @name		Save/share Link.info Skiper
// @description	Skip ads pages and send you directly to download page
// @include		http://save-link.info/*
// @include		http://share-link.info/*
// ==/UserScript==

var inputs = document.getElementsByTagName('input');

if (!inputs.length)
{
	var url = "" + document.location;
	url = url.split(".info/");
	document.location = url[0] + ".info/m1.php?id=" + url[1];
}