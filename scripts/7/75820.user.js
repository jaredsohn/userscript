// ==UserScript==
// @name           FanFiction.net remove "(? Ratings Guide)" link
// @namespace      nmxbones
// @description    Removes FictionRating.com link from the rating filter menu
// @include        http://*.fanfiction.net/*
// @exclude        http://*.fanfiction.net/s/*
// ==/UserScript==

var optionItem = document.getElementsByTagName("select");

for (i = 0; i < optionItem.length; i++) {
    for (x = 0; x < optionItem[i].options.length; x++) {
	if (optionItem[i].options[x].value == "-1") {
	    optionItem[i].remove(x);
	    optionItem[i].setAttribute("onchange", "");
	}
    }
}
