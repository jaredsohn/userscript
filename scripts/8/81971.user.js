// ==UserScript==
// @name           Replace default image art
// @namespace      http://userscripts.org
// @description    Replaces default image art
// @include        http://what.cd/torrents.php?id=*
// @include        https://ssl.what.cd/torrents.php?id=*
// ==/UserScript==

var img = "put your own image here"; //put image link here

//don't change anything after here
var cover = document.getElementsByTagName("img")[0]; //fetches the coverart
if (cover.src == "http://what.cd/static/common/noartwork/music.png" || cover.src == "https://ssl.what.cd/static/common/noartwork/music.png") { //if there is no coverart, proceed
	cover.src = img; //replace default image with your own
}

//made by Amareus