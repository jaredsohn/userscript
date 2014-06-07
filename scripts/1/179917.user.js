// ==UserScript==
// @name        Expand Wikipedia Acronyms
// @namespace   http://userscripts.org/scripts/show/179917
// @description Provides a better tooltip for a link to a Wikipedia page about an acronym
// @include     *.wikipedia.org/wiki/*
// @grant       none
// ==/UserScript==

var link_text, link_target;
var all_caps_segments;
var stripped_target;
var leading_index;
var true_title;
var request;

var i;
var links = document.getElementsByTagName("a");

function get_true_title() {
	var pos1 = -1;
	var pos2 = -1;
	var title = link_text;
	var text = this.responseText;
	
	pos1 = text.indexOf("<title>");
	if (pos1 >= 0) pos2 = text.indexOf("</title>", pos1);
	if (pos2 >= 0) title = text.substring(pos1 + 7, pos2);
	
	pos1 = title.indexOf(" - ");
	if (pos1 >= 0) true_title = title.substring(0, pos1);
}

for (i = 0; i < links.length; i++) {
	link_text = links[i].innerHTML;
	if (link_text.indexOf(" ") >= 0) continue;
	if (link_text.indexOf("/") >= 0) continue;
	if (link_text.indexOf("#") >= 0) continue;
	
	all_caps_segments = link_text.match(/[^a-z]+/);
	if (!all_caps_segments) continue;
	if (all_caps_segments[0] != link_text) continue;
	
	link_target = links[i].getAttribute("href");
	leading_index = link_target.indexOf("/wiki/");
	if (leading_index < 0) continue;
	
	stripped_target = link_target.substring(leading_index + 6);
	if (stripped_target != link_text) continue;
	
	true_title = link_text;
	request = new XMLHttpRequest();
	request.onload = get_true_title;
	request.open("get", link_text, false);
	request.send();
	links[i].setAttribute("href", "/wiki/" + true_title);
}