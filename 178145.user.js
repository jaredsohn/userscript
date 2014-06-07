// ==UserScript==
// @name		Link Countinator
// @namespace	DutchSaint
// @description	Counts all the links in the Tri-State Area
// @include		http://nolinks.net/links/links.php*
// @include		http://www.nolinks.net/links/links.php*
// @version		1.0
// ==/UserScript==

// Seriously, why the hell don't I have database access? Or at least permission to alter userlist.php
// so that I can sort by Topics Created?

// Get the number of links on the page and add that to 50*(page number-1)
// If there are no links on the page, post ??? instead
var link_count=document.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
var count_area=document.getElementsByTagName("h1")[0].textContent;
var links=0;

if (link_count == 0) {
	document.getElementsByTagName("h1")[0].textContent = count_area + " (???)";
} else {
	var strong_item=document.getElementsByTagName("thead")[0].getElementsByTagName("strong").length-2;
	var page_num=document.getElementsByTagName("thead")[0].getElementsByTagName("strong")[strong_item].textContent;
	if (page_num == 1) {
		links=link_count;
	} else {
		links=link_count+(50*(page_num-1));
	}
	document.getElementsByTagName("h1")[0].textContent = count_area + " (" + links + ")";
}