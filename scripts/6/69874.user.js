// JavaScript Document
// ==UserScript==
// @name		SCI.paging for Habrahabr
// @description Adds Site Common Interface paging to Habrahabr pages with paging
// @author		Kain Haart <dev@mail.kain-haart.info>
// @namespace	http://projects.kain-haart.info/greasemonkey-scripts
// @include		http://habrahabr.ru/*
// @include		http://*.habrahabr.ru/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

if($("div.page-nav").size())
	{
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
			if($("div.page-nav ul.next-prev li:last a").size())
				document.location = $("div.page-nav ul.next-prev li:last a").attr("href");
			};
			
	if(typeof(SCI.paging.prev)!="function")
		SCI.paging.prev = function()
			{
			if($("div.page-nav ul.next-prev li:first a").size())
				document.location = $("div.page-nav ul.next-prev li:first a").attr("href");
			};
	
	if(typeof(SCI.paging.current)!="function")
		SCI.paging.current = function()
			{
			var iPage = ($("#nav-pages li em").size()) ? parseInt($("#nav-pages li em").text()) : 1;
			return iPage;
			};
	}