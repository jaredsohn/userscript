// ==UserScript==

// @name           comics.com - HD

// @namespace      http://

// @include        http://comics.com/*

// ==/UserScript==

var links;
var thumbMode = window.location.search.indexOf ('ViewType=Thumb') != -1 ? 1 : null;



var items = document.evaluate ('//a[@class="STR_StripImage"]/img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


if (items.snapshotLength) {

	if (!thumbMode) {

		for (var i = 0; i < items.snapshotLength; i++) {

			var img = items.snapshotItem (i);

			var big = img.src.replace (/\.full\.gif$/, '.zoom.gif');

			var alt = img.alt;

			links += "\n<br>" + img.alt + "\n<br><img src=\"" + big + "\">\n<br>";
		}

	}

output = document.createElement('textarea');
output.text = links;
}

