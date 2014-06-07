// ==UserScript==
// @name           Storm Who?
// @namespace      shaldengeki
// @description    My contribution to the fight against a contracting universe.
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// @include        http://archives.endoftheinter.net/showmessages.php*
// ==/UserScript==

function filterPosts() {
	var posts=document.getElementsByClassName('message-top');
	for (var i=0; i<posts.length; i++) {
		if (posts[i].innerHTML.indexOf('<b>From:</b> <a href="//endoftheinter.net/profile.php?user=5545">Storm Chamber</a>') != -1) {
			var imageDivs = posts[i].nextSibling.getElementsByClassName("imgs");
			for (var j = 0; j < imageDivs.length; j++) {
				imageDivs[j].setAttribute("style", "display:none");
			}
		}
	}
}

filterPosts();
document.addEventListener("DOMNodeInserted", filterPosts, false);