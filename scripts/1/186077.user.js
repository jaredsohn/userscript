// ==UserScript==
// @name	altsearch links
// @description	Adds search on other sites for google, bing, and yahoo
// @version	0.1.3
// @include	http://www.google.com*
// @include	https://*.google.com*
// @include	http://www.google.com*
// @include	https://www.google.com*
// @include https://duckduckgo.com*
// @include http://duckduckgo.com*
// @include	http://www.wolframalpha.com*
// @include	http://www3.wolframalpha.com*
// @include	http://yandex.ru*
// @include	http://nigma.ru*
// @include	http://www.bing.com*
// @include	http://ru.wikipedia.org/w/*
// @include	http://nova.rambler.ru/*
// @include	http://rambler.ru/*
// @include http://scholar.google.com*
// @include http://search.yahoo.com*
// @include http://academic.research.microsoft.com/*
// @grant       none
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function () {

var SEARCH_ON = 'Search on:';
var POSITION = 'left'; 



var PLACEHOLDER_SELECTORS = '#main, #resultStats, #subform_ctrl, #gs_ab, .sb_count, .b-wordstat__text, .searchresults b, #ext_link, #sidebar, #left, .b-global-wrapper, #zero_click_wrapper, bing-summary, .bing-summary, #bing-summary';


var results = document.querySelector(PLACEHOLDER_SELECTORS);

	other = document.createElement('div');
	other.setAttribute("style", "width: 1000px; font-size: small; margin: 10px 10px 5px 159px;");
	if (window.location.href.indexOf("?query=") > -1) {
query = window.location.href.match(/\?query=[^&]*/gi)[0].substr(7);
} else if (window.location.href.indexOf("?q=") > -1) {
query = window.location.href.match(/\?q=[^&]*/gi)[0].substr(3);
} else {
	query = window.location.href.match(/\?p=[^&]*/gi)[0].substr(3);}
	query = query.replace(/\+filterui%3[^&^+]*/gi,"");
	links = "Try this search on " +
			"<a href =\"https://www.google.com/search?q=" + query + "\">Google</a>, " +
			"<a href =\"http://www.bing.com/search?q=" + query + "\">Bing</a>, " +
			"<a href =\"http://search.yahoo.com/search?p=" + query + "\">Yahoo</a>, " +
			//"<a href =\"http://web.ask.com/web?q=" + query + "\">Ask</a>, " +
			"<a href =\"https://duckduckgo.com/?q=" + query + "\">DuckDuckGo</a>, " +
			"<a href =\"http://www.wolframalpha.com/input/?i=" + query + "\">WolframAlpha</a>, " +
			"<a href =\"http://twitter.com/search?q=" + query + "\">Twitter</a>, " +
			"<a href =\"http://scholar.google.com/scholar?q=" + query + "\">Google Scholar</a>, " +
			"<a href =\"http://academic.research.microsoft.com/Search?query=" + query + "\">MS Academic</a>";
	other.innerHTML = links;
	results.parentNode.insertBefore(other, results);
}, false);