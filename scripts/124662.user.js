// ==UserScript==
// @name           Reddit Vote Removal
// @namespace      Fiskie
// @description    Hides upvote/downvote arrows and post points.
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// @version        1.0
// @copyright      2012, Catboy Studios
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @supported      Firefox 3.5+, Opera 10.50+, Chrome 4+
// ==/UserScript==

var objects = new Array();

objects[0] = document.getElementsByClassName("score unvoted");
objects[1] = document.getElementsByClassName("score likes");
objects[2] = document.getElementsByClassName("score dislikes");
objects[3] = document.getElementsByClassName("midcol unvoted");
objects[4] = document.getElementsByClassName("midcol likes");
objects[5] = document.getElementsByClassName("midcol dislikes");

var i = 0;

while(objects[i]){
	while(objects[i][0]){
		objects[i][0].style.visibility = "hidden";
		objects[i][0].parentNode.removeChild(objects[i][0]);
	}
	i++;
}