// ==UserScript==
// @name           Block Michael Gartenberg
// @namespace      http://userscripts.org/scripts/show/66981
// @description    Strip content from Michael Gartenberg from Engadget
// @include        http://www.engadget.com/*
// ==/UserScript==

(function () {

var tags = document.getElementsByTagName('div');

for (var key in tags)

with (tags[key])

	if (className == 'post_byline') {
		if (innerHTML.indexOf('Gartenberg') > -1){
			parentNode.parentNode.style.display = 'none';
		}
	}

})();