// ==UserScript==
// @name          LiveJournal image placeholder replacer
// @namespace     http://www.zimzat.com/greasemonkey/
// @description   Replaces image placeholders with the original image in-line. It also attempts to re-link images to an adjacent link tag.
// @include       http://*.livejournal.com/*
// ==/UserScript==

/* Copyright (c) 2006 Zimzat
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 2.5 License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/ or send 
 * a letter to Creative Commons, 543 Howard Street, 5th Floor, San Francisco, California, 94105, USA.
 */

(function() {
	function fnReplaceImage(varEvent) {
		varEvent.preventDefault();
		varEvent.stopPropagation();

		var varLink = varEvent.currentTarget;

		var varImage = document.createElement('img');
		varImage.setAttribute('src', varLink.getAttribute('href'));

		var foundInsertionPoint = false;
		var insertionPoint = varLink;
		while (insertionPoint = insertionPoint.previousSibling)
		{
			if (insertionPoint.nodeName.toLowerCase() != 'a')
			{
				break;
			}

			if (insertionPoint.className.indexOf('ljimgplaceholder') == -1)
			{
				foundInsertionPoint = true;
				break;
			}
		}

		if (foundInsertionPoint)
		{
			insertionPoint.appendChild(varImage);
		}
		else
		{
			varLink.parentNode.insertBefore(varImage, varLink);
		}

		varLink.parentNode.removeChild(varLink);
	}

	var oLinks = document.evaluate("//A[@class='ljimgplaceholder']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var x = 0; x < oLinks.snapshotLength; x++) {
		oLinks.snapshotItem(x).addEventListener('click', fnReplaceImage, false);
	}
})();
