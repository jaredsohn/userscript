// ==UserScript==
// @name           Anchor Title = href
// @namespace      
// @version	0.1
// @description   Set title of every anchor as its href
// @include        *
// ==/UserScript==

(function(){
	var anchors = document.getElementsByTagName('a');
	for (var i = 0, k = anchors.length; i < k ; i++) {
		anchors[i].setAttribute('title', anchors[i].getAttribute('href'));
	}
})();