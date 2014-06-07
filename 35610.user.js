// ==UserScript==
// @name          Twitter search in sidebar 1.1
// @namespace     http://kilianvalkhof.com
// @description   adds the search.twitter.com search in the twitter sidebar
// @include       http://twitter.com/*
// @include       http://www.twitter.com/*
// @include       https://twitter.com/*
// @include       https://www.twitter.com/*
// ==/UserScript==

var tabmenu, searchhtml;
tabmenu = document.getElementById('tabMenu');

if (tabmenu) {
  searchhtml = document.createElement("div");
  searchhtml.innerHTML = '<form action="http://search.twitter.com/search" id="searchForm" method="get" style="margin-left:14px;width:185px;"><input style="width:60%;margin-bottom:0.5em;display:inline;" autosave="com.twitter.search" id="searchBox" name="q" placeholder="Enter your query" results="10" type="search" value="Search Twitter" onfocus="this.value=\'\'" /> <input type="submit" value="Search" style="display:inline;padding:0;" /></form><form action="http://twitter.com/search/users" id="email" name="user_search_form" style="margin-left:14px;width:185px;"><input type="text" style="width:60%;margin-bottom:0.5em;display:inline;" value="Search people" id="user_search_q" name="q" onfocus="this.value=\'\'" /> <input type="submit" value="Search" style="display:inline;padding:0;" /></form>';
  tabmenu.parentNode.insertBefore(searchhtml, tabmenu);
}