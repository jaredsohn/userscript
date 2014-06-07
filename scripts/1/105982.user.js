// ==UserScript==
// @author         enli
// @version        1.2
// @name           Legacy Google Search Engine Results formatter
// @namespace      http://enli.co.cc
// @description    Google recently changed the appearance of how search results show up. This script places links after the result descriptions.
// @include        http://www.google.*/search?*
// @uso:script     105982
// @require        http://code.jquery.com/jquery.min.js
 // @require http://sizzlemctwizzle.com/updater.php?id=105982
/* StartHistory

v1.2 - 24 July, 2011
- [Bugfix] Incorrect links are displayed for result pages containing videos.

v1.1 - 10 July, 2011
 - [Bugfix] Link positions are not updated for page 2 onwards.

v1.0 - 3 July, 2011
 - Initial release.

EndHistory */
// ==/UserScript==

updatePage();

document.addEventListener('DOMAttrModified', function (event) {
  if (event.target.id == 'foot') {
	updatePage();
  }

}, false);


function updatePage() {
	var urls = {};
	var descriptions = {};
	var i = 0;

	jQuery(".vsc").each(function() {
		var link = jQuery(this).find(".f.kv");
		if (link.length != 0) {
			urls[i] = link;
		} else {
			urls[i] = null;
		}

		var description = jQuery(this).find(".st");
		if (description.length != 0) {
			descriptions[i] = description;
		} else {
			descriptions[i] = null;
		}

		i++;
	});

	var total = i;

	for (i = 0; i < total; i++) {
		var url = urls[i];
		var description = descriptions[i];

		if ((url != null) && (description != null)) {
			jQuery(url).insertAfter(description);
		}
	}
}

