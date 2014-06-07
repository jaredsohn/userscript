// ==UserScript==
// @name          Download video from badjojo.com
// @namespace     http://userscripts.org/scripts/show/37710
// @description   Download video from badjojo.com
// @include       http://www.badjojo.com/*
// @include       http://badjojo.com/*
// @version       1.1.2
// ==/UserScript==

window.addEventListener(
	'load',
	function() {
		var regex = /http:\/\/(?:www\.)?badjojo\.com\/[0-9]+\/[a-z-]+\//i;
		if (regex.test(document.location)) {
			var embed = document.getElementById("xmoov-flv-player");
			if (embed) {
				regexp = /content_video=(files\/videos\/videos[^\/]*\/[0-9a-z]+\.flv)/i;
				var link = embed.getAttribute("flashvars").match(regexp);
				if (link) {
					var file_links = document.evaluate("//div[@id='content']//h2[@class='relatedh2']/a[contains(@href, 'action=share')]/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					if (file_links.snapshotLength == 1) {
						file_links.snapshotItem(0).innerHTML = "<a href='http://media1.badjojo.com/" + link[1] + "'>free download</a> / " + file_links.snapshotItem(0).innerHTML
					}
				}
			}
		}
	},
true);