// ==UserScript==
// @name           Favicons for Google Reader
// @namespace      meta.ironi.st
// @include        htt*://www.google.*/reader/view*
// @include        http://www.google.com/reader/view*

// ==/UserScript==

(function () {
    var script = document.createElement('script');
    script.innerHTML = '(' + main + ')()';
    document.querySelector('head').appendChild(script);

    function main(){
	var FEED_NODE = 'outline[htmlUrl]',
		FAVICON_CSS =['background-position:0px; background-image:url(/s2/favicons?domain=', ')'],
		TITLE_SELECTOR = ['span[title^="' , '"]'],
		FEED_DATA_URL = '/reader/subscriptions/export';
		
	var xhr = new XMLHttpRequest;
	xhr.open('get', FEED_DATA_URL);
	xhr.addEventListener('load', handler, false);
	xhr.send(null);

	function handler() {
		var feeds = xhr.responseXML.querySelectorAll(FEED_NODE);
	
		for (var i = 0, feed; feed = feeds[i++];) {
			var domain = feed.getAttribute('htmlUrl').split('/')[2],
				escapedTitle = feed.getAttribute('title').replace(/"/g, '\\"'),
				titleNode = document.querySelector(TITLE_SELECTOR.join(escapedTitle)),
				iconNode = titleNode.previousSibling;

			iconNode.style.cssText = FAVICON_CSS.join(domain);
		}

		setTimeout(arguments.callee, 1000);
	}
    };
})();