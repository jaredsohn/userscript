// ==UserScript==
// @name           Google Reader - hide/remove unread count
// @version        3
// @namespace      http://www.rithish.in
// @author         Rithish
// @description    Remove/Hide unread count from Google Reader's Subscribed Feeds
// @include        http*://www.google.*/reader/*
// ==/UserScript==

var i, span_elems = document.getElementsByTagName("span");
var match_string = /-unread-count$/;
var loop_count = span_elems.length;

// remove the count from each element that displays it
for (i=0; i<loop_count; i++)
{
	if(span_elems[i].id.match(match_string)) span_elems[i].style.display = "none";
}

// remove the count from page title
document.title = "Google Reader";