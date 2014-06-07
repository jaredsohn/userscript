// BlackBoxSearch user script
// version 0.1
// 2006-06-21
// Copyright (c) 2005, Nemanja Stefanovic
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BlackBoxSearch", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BlackBoxSearch
// @namespace     http://www.nemik.net/blackboxsearch.js
// @description   Lets you do anonymous searches on Google, Yahoo, and MSN
// @include       http://*.google.*/*
// @include       http://*.yahoo.*/*
// @include       http://*.msn.*/*
// ==/UserScript==

if (location.href.indexOf("google.com/ig") != -1)
{
	var search_form = document.getElementById('sfrm');
	var bbs_hidden = document.createElement('input');
	
	bbs_hidden.setAttribute('type', 'hidden');
	bbs_hidden.setAttribute('name', 'engine');
	bbs_hidden.setAttribute('value', 'google');
	
	search_form.setAttribute('action', 'http://www.blackboxsearch.com/cgi-bin/search.cgi');
	search_form.setAttribute('method', 'post');
	search_form.appendChild(bbs_hidden);
}
if (location.href.indexOf("google") != -1)
{
	var search_form = document.getElementsByName('f');

	for(var i=0; i<search_form.length; i++)
	{
		
		var bbs_hidden = document.createElement('input');
	
		bbs_hidden.setAttribute('type', 'hidden');
		bbs_hidden.setAttribute('name', 'engine');
		bbs_hidden.setAttribute('value', 'google');
	
		search_form[i].setAttribute('action', 'http://www.blackboxsearch.com/cgi-bin/search.cgi');
		search_form[i].setAttribute('method', 'post');
		search_form[i].appendChild(bbs_hidden);
	}
}
else if (location.href.indexOf("yahoo") != -1)
{
	var search_form = document.getElementById('search');
	var search_input = document.getElementById('p');
	var bbs_hidden = document.createElement('input');
	
	search_input.setAttribute('name', 'q');

	bbs_hidden.setAttribute('type', 'hidden');
	bbs_hidden.setAttribute('name', 'engine');
	bbs_hidden.setAttribute('value', 'yahoo');

	search_form.setAttribute('action', 'http://www.blackboxsearch.com/cgi-bin/search.cgi');
	search_form.setAttribute('method', 'post');
	search_form.appendChild(bbs_hidden);
}
else if (location.href.indexOf("msn") != -1)
{
	var search_form = document.getElementById('srchfrm');
	var bbs_hidden = document.createElement('input');
	
	bbs_hidden.setAttribute('type', 'hidden');
	bbs_hidden.setAttribute('name', 'engine');
	bbs_hidden.setAttribute('value', 'msn');

	search_form.setAttribute('action', 'http://www.blackboxsearch.com/cgi-bin/search.cgi');
	search_form.setAttribute('method', 'post');
	search_form.appendChild(bbs_hidden);
}
