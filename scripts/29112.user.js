// ==UserScript==
// @name           Add Player Images
// @namespace      http://userscripts.org/users/57265
// @include        http://gameknot.com/online.pl
// ==/UserScript==

function add_player_images() {
	var linksArr = document.links;
	for(var i=0; i<linksArr.length; i++) {
		var linkObj = linksArr[i];
		if(linkObj.href.indexOf('/stats.pl?')!=-1) {
			var nickName = linkObj.innerHTML;
			var nick1st = nickName.substr(0, 1);
			var nick2nd = nickName.substr(1, 1);
			var nickElse = nickName.substr(2);
			linkObj.innerHTML += "<img src=\"http://gameknot.com/img/u/" + nick1st + "/" + nick2nd + "/" + nickName + ".jpg\" border=\"0\"/><img src=\"http://gameknot.com/img/a/" + nick1st + "/" + nick2nd + "/" + nickName + ".gif\" width=\"80\" border=\"0\"/>";
		}
	}
}; // End add_player_images
window.addEventListener("load", function() { add_player_images() }, false);