// ==UserScript==
// @name           Google blank links
// @namespace      http://yperevoznikov.com
// @description    Makes all links in google open in new tabs
// @include        http://www.google.com/(.*)
// ==/UserScript==

setInterval(function(){
	
	/**
	 * If you want to open all google's links in the same window set `true` for this param
	 * otherwise set `false` to open all google result's pages in new tab 
	 */
	var showAllPagesInCurrentTab = true;
	
	var container = document.getElementById('res');
	var elements = container.getElementsByTagName('a');
	
	for (var i in elements) {
		var target = elements[i].getAttribute('target');
		if (showAllPagesInCurrentTab) {
			if (target != '_self') {
				elements[i].setAttribute('target', '_self');
			}
		}
		if (!showAllPagesInCurrentTab) {
			if (target != '_blank') {
				elements[i].setAttribute('target', '_blank');
			}
		}
	}	
}, 100);