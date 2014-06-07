// ==UserScript==
// @name        daisy
// @namespace   K14
// @description Disable search featues of Youtube.
// @include     *//www.youtube.com/wa*
// @include     *//www.youtube.com/resu*
// @version     1
// ==/UserScript==

function remove(id) {
	document.getElementById(id).style.visibility = "hidden";
}
function move(id, parent, child) {
	var item = document.getElementById(id);
	var list = document.getElementById(parent);

		list.insertBefore(item, list.childNodes[child]);
}

move("masthead-upload-button-group", "yt-masthead-signin",0)
remove("search-btn");
remove("masthead-search-terms");

