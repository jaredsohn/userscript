// ==UserScript==
// @name        GameKnot Keep Going
// @namespace   http://userscripts.org/users/481387
// @description Replaces the GameKnot 'Resign' link with a 'Keep Going' link
// @include     http://gameknot.com/chess.pl*
// @version     1.1
// ==/UserScript==
function replace_resign() {
	var linksArr = document.links;
	for(var i=0; i<linksArr.length; i++) {
		var linkObj = linksArr[i];
		if(linkObj.title.indexOf('Resign this game')!=-1) {
			linkObj.href= "http://cottonreeltank.org/cafelunar/dr/";
			linkObj.text= "Keep Going";
			linkObj.onclick= "";
			linkObj.title="Keep Going!";
		}
	}
}; // End add_player_images
window.addEventListener("load", function() { replace_resign() }, false);