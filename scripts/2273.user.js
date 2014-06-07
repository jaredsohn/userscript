// ==UserScript==
// @name        MrSkin Links in IMDb
// @namespace   http://finkel.org/avi/
// @description Link actresses' names to their MrSkin info pages.
// @include     http://*imdb.com/name/nm*
// @version     1.2
// ==/UserScript==

(function() {
	/* Check for actress */

	if (
		document.evaluate(
			'//h5/a[text()=\'Actress:\']', document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		).snapshotLength == 0
	) {
		/* This isn't an actress, ignore. */
		return;
	}

	// Check for legal age

	// Get year
	var now = new Date();
	var years = document.evaluate(
		"//a[contains(@href,'BornInYear')]", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
	if (years.snapshotLength > 0) {
		var href = new String(years.snapshotItem(0));
		var bornYear = href.substring(href.length - 4);
		if ((now.getFullYear() - bornYear) < 18) {
			// Too young
			return;
		}
		if ((now.getFullYear() - bornYear) == 18) {
			// Might still be too young
			var dates = document.evaluate(
				"//a[contains(@href,'OnThisDay')]", document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
			);
			if (dates.snapshotLength > 0) {
				href = new String(dates.snapshotItem(0));

				var dateindex   = href.indexOf('day=');
				var monthindex = href.indexOf('month=');

				var day = href.substring(dateindex + 4, monthindex - 1);
				var month = href.substring(monthindex + 6);

				// convert month into a number
				switch (month) {
					case 'January':         month = 0;      break;
					case 'February':        month = 1;      break;
					case 'March':           month = 2;      break;
					case 'April':           month = 3;      break;
					case 'May':             month = 4;      break;
					case 'June':            month = 5;      break;
					case 'July':            month = 6;      break;
					case 'August':          month = 7;      break;
					case 'September':       month = 8;      break;
					case 'October':         month = 9;      break;
					case 'November':        month = 10;     break;
					case 'December':        month = 11;     break;
				}

				if (month > now.getMonth()) {
					// Too young
					return;
				}
				if (month == now.getMonth()) {
					if (day > now.getDate()) {
						// Too young, but only just
						return;
					}
				}
			}
		}
	}


	var s = document.evaluate(
		'id(\'tn15title\')/h1', document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	).snapshotItem(0);

	var span = document.createElement("span");
	span.setAttribute("style", "font-size:small");
	s.parentNode.insertBefore(span, s.nextSibling);

	span.appendChild(document.createTextNode(" ("));
	var newLink = document.createElement("a");
	newLink.setAttribute(
		"href",
		"http://www.mrskin.com/search/search?term=" +
		escape(
			s.childNodes.item(0).data.replace(/ \(I+\)$/, "").replace(/ /g, "+")
		)
	);
	newLink.appendChild(document.createTextNode("MrSkin"));
	span.appendChild(newLink);
	span.appendChild(document.createTextNode(")"));
})();

// 1.0: Initial release
// 1.1: No longer link for underage actresses
// 1.2: Updated for IMDb redesign.
// 1.3: Updated for MrSkin redesign.
