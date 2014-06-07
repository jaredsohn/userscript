// ==UserScript==
// @name           GLB Username Replacement
// @namespace      pbr/unr
// @include        http://goallineblitz.com/*
// @copyright      2012, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        12.02.19
// ==/UserScript==

var users = new Array();

// add this : users.push([ ]);
// and put the user's id and the replacement name between the brackets with the name surrounded by quotes and each separated by commas
users.push([110096, "schmuck who needs a greasemonkey script created just for him because he can't bother to remember anyone's name"]);

window.setTimeout( function() {
	var head = "http://goallineblitz.com/game/home.pl?user_id=";
	var links = document.getElementsByTagName("a");

	for (var l=0; l<links.length; l++) {
		if (links[l].href.toString().indexOf(head) == 0) {
			if (links[l].getElementsByTagName("img").length == 0) {
				for (var u=0; u<users.length; u++) {
					var a = head+users[u][0];
					if (links[l].href.toString() == a) {
						links[l].innerHTML = users[u][1];
					}
				}
			}
		}
	}
}, 500);

