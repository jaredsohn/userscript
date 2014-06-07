// ==UserScript==
// @name           GossipGirl
// @namespace      ytm
// @include        http://www.watch-gossip-girl.com/*
// ==/UserScript==

function updateLinks() {

oldUrl = /.*oldURL=(.*)\&timer=.*/


var matches;
for (var i=0; i < document.links.length; i++) {
  var li = document.links[i];
  if (li.className == 'int') {
	matches = li.href.match(oldUrl)
	if (matches.length > 1) {
		//replace the anoying add url thing
		//with the direct version
		li.href = matches[1];
	}
  }
}

}

//run it after their js changed the links :P
setTimeout(updateLinks, 500);