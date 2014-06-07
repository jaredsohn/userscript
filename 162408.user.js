// ==UserScript==
// @name        Youtube return of the old bar
// @namespace   http://userscripts.org/users/428476
// @description returned the grey bar from 2009 to youtube, and adds broadcast yourself back
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant          metadata
// @grant          GM_metadata
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @grant          GM_listValues
// @grant          GM_addStyle
// @include     http://www.youtube.com/*
// @exclude     http://www.youtube.com/wat-ch?v=*
// @include     https://www.youtube.com/*
// @exclude     https://www.youtube.com/wa-tch?v=*
// @version     1
// ==/UserScript==
// var script.mainCSS = "";
// var script.mainCSS = "#slogan {background:url(http://web.archive.org/web/20090305161138/http://s.ytimg.com/yt/img/master-vfl77641.png) repeat-x scroll 0 -33px transparent !important; cursor:default !important; display:block !important; height:11px !important; margin: 2px 2px 3px !important; width:125px !important; float:left !important;}";



// insertCSS(script.mainCSS);



// Create the main bar
$(document.createElement("div"))
	.attr("id", "bar")
	.attr("class", "master-sprite")
	.insertAfter("#yt-masthead");

// Create links
$(document.createElement("a"))
	.attr("class", "master-sprite nav-item")
	.attr("href", "http://www.youtube.com/")
	.html("Home")
	.appendTo("#bar");

$(document.createElement("a"))
	.attr("class", "master-sprite nav-item")
	.attr("href", "http://www.youtube.com/browse")
	.html("Videos")
	.appendTo("#bar");

$(document.createElement("a"))
	.attr("class", "master-sprite nav-item")
	.attr("href", "http://www.youtube.com/members")
	.html("Channels")
	.appendTo("#bar");

$(document.createElement("a"))
	.attr("class", "master-sprite nav-item")
	.attr("href", "http://www.youtube.com/Shows")
	.html("Shows")
	.appendTo("#bar");

// Create the contents
$(document.createElement("div"))
	.attr("id", "masthead-bar-contents")
	.appendTo("#bar");

// Create the form
// $(document.createElement("form"))
//	.attr("autocomplete", "off")
//	.attr("class", "search-form")
//	.attr("action", "http://www.youtube.com/results")
//	.attr("method", "get")
//	.attr("name", "searchform")
//	.appendTo("#masthead-bar-contents");

// $(document.createElement("input"))
//	.attr("id", "search-form")
//	.attr("name", "search_type")
//	.attr("value", "")
//	.attr("type", "hidden")
//	.appendTo("#masthead-bar-contents .search-form");

// $(document.createElement("input"))
//	.attr("type", "text")
//	.attr("onkeyup", "goog.i18n.bidi.setDirAttribute(event,this)")
//	.attr("tabindex", "1")
//	.attr("value", "")
//	.attr("name", "search_query")
//	.attr("class", "search-term")
//	.attr("id", "masthead-search-term")
//	.attr("dir", "ltr")
//	.attr("autocomplete", "off")
//	.attr("spellcheck", "false")
//	.attr("style", "outline: medium none;")
//	.appendTo("#masthead-bar-contents .search-form");



// copy search bar not create new one
debug("copying search");
$(document.createElement("form"))
	.attr("id", "masthead-search")
	.attr("class", "search-form consolidated-form")
	.attr("onsubmit", "if (_gel('masthead-search-term').value == '') return false;")
	.attr("action", "/results")
	.html($("#masthead-search").html())
	.appendTo("#masthead-bar-contents");
//	.insertBefore("#yt-masthead-content");
$("#masthead-search").remove();
debug("search copied");



// copy contents, not create new ones
debug("copying search");
$(document.createElement("div"))
	.attr("id", "yt-masthead-content")
	.html($("#yt-masthead-content").html())
//	.appendTo("#masthead-bar-contents");
	.insertBefore("#masthead-search");
$("#yt-masthead-content").remove();
debug("contents copied");








var searchimg = $("#search-btn span");
searchimg.removeClass("yt-uix-button-content");





$(document.createElement("button"))
	.attr("id", "slogan")
	.attr("class", "master-sprite")
	.attr("type", "button")
	.attr("title", "")
	.insertAfter("#logo-container");




// #slogan {
//    background: url("http://web.archive.org/web/20090305161138/http://s.ytimg.com/yt/img/master-vfl77641.png") repeat-x scroll 0 -33px transparent !important;
//    cursor: default !important;
//    display: block !important;
//    height: 11px !important;
//    margin: 2px 2px 3px !important;
//    width: 125px !important;
// }



// var cssToInsert = "";
cssToInsert = "#slogan {background:url(http://web.archive.org/web/20090305161138/http://s.ytimg.com/yt/img/master-vfl77641.png) repeat-x scroll 0 -33px transparent !important; cursor:default !important; display:block !important; height:11px !important; margin: 2px 2px 3px !important; width:125px !important; float:left !important;}";
	var head=document.getElementsByTagName('head')[0];
	if(!head)
		return;
	var style=document.createElement('style');
	style.setAttribute('type','text/css');
	style.appendChild(document.createTextNode(cssToInsert));
	head.appendChild(style);





// function insertCSS(cssToInsert) {
//	var head=document.getElementsByTagName('head')[0];
//	if(!head)
//		return;
//	var style=document.createElement('style');
//	style.setAttribute('type','text/css');
//	style.appendChild(document.createTextNode(cssToInsert));
//	head.appendChild(style);
// }

