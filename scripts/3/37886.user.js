// ==UserScript==
// @name         Twitter Search Box
// @namespace    http://sebastiancelis.com/
// @description  Adds a search box to the Twitter sidebar.
// @include      http://twitter.com/*
// @include      https://twitter.com/*
// @author       Sebastian Celis
// ==/UserScript==

// Copyright (c) 2008, Sebastian Celis
// Released under the BSD license.
// http://www.opensource.org/licenses/bsd-license.php

var friendsNode = document.getElementById('friends');
if (typeof(friendsNode) != "undefined" && friendsNode != null)
{
	var html = [];
	html[html.length] = '<div class="section-header" style="margin-top:0px">';
	html[html.length] = '<a href="http://search.twitter.com/advanced" class="section-links">advanced</a>';
	html[html.length] = '<h1>Search</h1>';
	html[html.length] = '</div>';

	html[html.length] = '<div><form action="http://search.twitter.com/search" id="searchForm"';
	html[html.length] = ' method="GET" name="searchForm">';
	html[html.length] = '<input autosave="com.twitter.search" id="searchBox" name="q"';
	html[html.length] = ' results="10" type="search" style="width:98%;"'
	html[html.length] = ' placeholder="Enter your query" />';
	html[html.length] = '</form></div>';

	var div = document.createElement('div');
	div.className = 'section last';
	div.innerHTML = html.join('');
	followingNode = friendsNode.parentNode;
	followingNode.parentNode.insertBefore(div, followingNode);
}
