// ==UserScript==
// @name Tumblr: dashboard links, new tabs
// @namespace http://chillidonut.com/userscripts
// @description makes tubmlr dashboard links open in a new tab
// @include http://*.tumblr.com/dashboard
// @version 1.0
// ==/UserScript==

this.watchingPaging = null;

function retargetLinks() {
	var posts = document.getElementsByClassName('post_content');
	var links = new Array();
	for (var i = 0; i < posts.length; ++i) {
		var linklist = posts[i].getElementsByTagName('a');
		for (var j = 0; j < linklist.length; ++j) {
			links = links.concat(linklist[j]);
		}
	}
	for (var i in links) {
		links[i].target = "_blank";
	}
	
	if (this.watchingPaging == false) {
		// if we can't attach to tumblr's main Ajax object, just do it periodically
		setTimeout(retargetLinks, 750);
	} else if (this.watchingPaging != true) {
		setTimeout(function () {
			watchingPaging = endlessPagingWatch();
		}, 3000);
	}
}

function endlessPagingWatch() {
	try {
		// the following line won't work in chrome because of its "isolated world"
		// policy. how fucking annoying is that!!!
		// <http://code.google.com/chrome/extensions/content_scripts.html#execution-environment>
		unsafeWindow.Ajax.Responders.register({
			onComplete: function() {
				retargetLinks();
			}
		});
		return true;
	} catch (e) {
		return false;
	}
}

retargetLinks();