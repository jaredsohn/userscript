// ==UserScript==
// @name           bgg_one_column
// @namespace      http://*
// @description    Makes left column of BGG as wide as possible whilst shrinking right column of BGG to 1 pixel
// @include        http://www.boardgamegeek.com/
// ==/UserScript==

var nameOfTagToMatch = "td";
var classOfTagToMatch = "geekcentral_leftcol";
var class2TagToMatch = "geekcentral_rightcol";

// Do not edit below this point.

function alterLeftCol(tagType, tagClass){
	var element = document.getElementsByTagName(tagType);

	for (i=0; i<element.length; i++) {
		if (element[i].className==tagClass) {
			element[i].width="100%";
		}
	}
}

function alterRightCol(tagType, tagClass){
	var element = document.getElementsByTagName(tagType);

	for (i=0; i<element.length; i++) {
		if (element[i].className==tagClass) {
			element[i].width="1px";
		}
	}
}


alterLeftCol(nameOfTagToMatch,classOfTagToMatch);
alterRightCol(nameOfTagToMatch,class2TagToMatch);