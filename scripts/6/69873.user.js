// JavaScript Document
// ==UserScript==
// @name		SCI.paging for Google search
// @description Adds Site Common Interface paging to Google search results page
// @author		Kain Haart <dev@mail.kain-haart.info>
// @namespace	http://projects.kain-haart.info/greasemonkey-scripts
// @include		http://www.google.com/search?*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

// Constrcting SCI if not exists
if(typeof(unsafeWindow['SCI'])=="undefined")
	unsafeWindow.SCI = {};
// Getting SCI
var SCI = unsafeWindow.SCI;
// Constructing SCI paging
if(typeof(SCI['paging'])=="undefined")
SCI.paging = {"version":"default v 0.1"};

if(typeof(SCI.paging.next)!="function")
	SCI.paging.next = function()
		{
		if($("#nav td:last a").size())
			document.location = $("#nav td:last a").attr("href");
		};
		
if(typeof(SCI.paging.prev)!="function")
	SCI.paging.prev = function()
		{
		if($("#nav td:first a").size())
			document.location = $("#nav td:first a").attr("href");
		};

if(typeof(SCI.paging.current)!="function")
	SCI.paging.current = function()
		{
		var iPage = ($("#nav td.cur").size()) ? parseInt($("#nav td.cur").text()) : 1;
		return iPage;
		};

