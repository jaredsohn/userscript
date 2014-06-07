// ==UserScript==
// @name          GC Favorites Percentage
// @description   (v1.11) Displays Favorites as percentage of finds in addition to the absolute value.
// @namespace     http://gc.owyn.de/
// @version       1.12
// @license       Creative Commons Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @copyright     (c) 2010, Owyn
// @include       http://*.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

/* Geocaching Favorites Percentage
v1.12 2010-12-30
(c) Owyn
Since v1.1 based on a script by Lil Devil (http://www.lildevil.org/greasemonkey/favorites-percentage). Thank you!


This script shows not only the absolute number of favorites in cache listings on
www.geocaching.com, but also the percentage in relation to the number of finds.
Additionally, it displays a score based on the "lower bounds of confidence interval"
(http://www.evanmiller.org/how-not-to-sort-by-average-rating.html). That score takes
into account that the number or percentage of favorites has less significance if the
find count is low.

Note: Only premium members are allowed to award favorites. It would be more accurate
to only include the number of finds by premium members, but that is impossible.


Dieses Greasemonkey-Script zeigt in Cache-Listings auf www.geocaching.com nicht nur die
absolute Anzahl der Favoriten an, sondern auch die Prozentzahl in Relation zu den Funden.
Außerdem zeigt es einen Wert "Score" an, der auf dem "lower bounds of confidence interval"
(http://www.evanmiller.org/how-not-to-sort-by-average-rating.html) basiert. Dieser Wert
berücksichtigt die geringere Aussagekraft des Favoritenanteils bei wenigen Funden.

Achtung: Nur Premium-Mitglieder dürfen Favoriten empfehlen. Es wäre also genauer, nur
die Funde von Premium-Mitglieder zu berücksichtigen, das ist aber nicht möglich.
*/

/* Changelog
v1.0 2010-12-24
- Initial release

v1.1 2010-12-30
- Added score based on the "lower bounds of confidence interval" (thanks, Karsten & Co!)
- Now based on Lil Devil's script (thanks, Lil Devil!)
  - should work with GC VIP List now

v1.11 2010-12-30
- Bugfix: If a cache is added or removed from the favorites, the display got corrupted

v1.12 2010-12-30
- Changed score calculation slightly

*/

(function(){
	// get the FavPoints box. If it doesn't exist, then this cache type can't be favorited.
	var favPointsBox = xPath('.//div[@class="favorite"]',
								$('Content'), XPathResult.FIRST_ORDERED_NODE_TYPE);
	if (!favPointsBox) { return; }

	// get the Find Counts box. If it doesn't exist, then this cache has no logs.
	var findCountsBox = $('ctl00_ContentBody_lblFindCounts');
	if (!findCountsBox) { return; }

	var findCountImages = xPath('.//img[contains(@src, "icon_smile.gif")]|' +
								'.//img[contains(@src, "icon_attended.gif")]|' +
								'.//img[contains(@src, "icon_camera.gif")]',
								findCountsBox);
	if (!findCountImages) { return; }

	var findCount = 0;
	for (var i=0; i<findCountImages.snapshotLength; i++) {
		var thisImage = findCountImages.snapshotItem(i);

		if (thisImage.parentNode.nodeName == 'A') {
			// VIP List has changed things
			findCount += parseInt(thisImage.parentNode.nextSibling.textContent, 10);
		} else {
			findCount += parseInt(thisImage.nextSibling.textContent, 10);
		}
	}

	// if there are no finds, then the cache can't be favorited.
	if (findCount === 0) { return; }

	// find the Favorites count within the Favorites box
	var favPointsValue = favPointsBox.getElementsByClassName('favorite-value');
	if (!favPointsValue) { return; }
	favPointsValue = favPointsValue[0];

	// remove "Favorites"
	favPointsValue.parentNode.removeChild(favPointsValue.nextSibling);
	// remove <br>
	favPointsValue.parentNode.removeChild(favPointsValue.nextSibling);

	// create new spans to hold the data
	var favPercentElement = document.createElement('span');
	favPercentElement.className = 'favorite-percent';
	LD_addStyle('.favorite-percent { font-size: 174%; font-weight:bold; }');
	favPointsValue.parentNode.appendChild(favPercentElement);
	
	favPointsValue.parentNode.appendChild(document.createElement('br'));

	var favFindsElement = document.createElement('span');
	favFindsElement.className = 'favorite-finds';
	LD_addStyle('.favorite-finds a, .favorite-finds a:hover, .favorite-finds a:visited, .favorite-finds a:active, .favorite-finds a:link, .favorite-finds a:focus { color: #000000 !important; }');
	favPointsValue.parentNode.appendChild(favFindsElement);

	var favScoreElement = document.createElement('span');
	favScoreElement.className = 'favorite-score';
	LD_addStyle('.favorite-score a, .favorite-score a:hover, .favorite-score a:visited, .favorite-score a:active, .favorite-score a:link, .favorite-score a:focus { color: #000000 !important; }');
	favPointsValue.parentNode.appendChild(favScoreElement);
	
	// hide the "What's this" link
	lastElementChild(favPointsBox).style.display = 'none';

	// set an event trigger to fire when the Favorites count changes,
	// such as when the user adds or removes the cache from his Favorites list.
	favPointsValue.addEventListener('DOMSubtreeModified', computeValues, false);
	
	// Calculate and display all data
	computeValues();
	

function computeValues() {
	// when the add or remove link is clicked, the value is cleared before the new value is drawn.
	if (favPointsValue.textContent.length === 0) { return; }

	var favPoints = parseInt(favPointsValue.textContent, 10);

	// Prozentwert berechnen
	var percentage = Math.round(100 * favPoints / findCount);
	var percentageDisplay = " = " + percentage + "%";

	// Anzahl Funde
	var findsImage = document.createElement('img');
	findsImage.setAttribute('src', '/images/icons/icon_smile.gif');
	findsImage.setAttribute('alt', 'Finds:');
	var findsDisplay = " " + findCount;

	// Score basierend auf dem "Lower Bounds of Confidence Interval" berechnen
	var score = Math.round(ci_lower_bound(favPoints, findCount, 0.1) * 1000) / 10;
	var scoreDisplay = " / " + "Score: " + score;
	
	// Alte Werte löschen
	while (favPercentElement.hasChildNodes()) favPercentElement.removeChild(favPercentElement.firstChild);
	while (favFindsElement.hasChildNodes()) favFindsElement.removeChild(favFindsElement.firstChild);
	while (favScoreElement.hasChildNodes()) favScoreElement.removeChild(favScoreElement.firstChild);
	
	// Werte anzeigen
	favPercentElement.appendChild(document.createTextNode(percentageDisplay));
	favFindsElement.appendChild(findsImage);
	favFindsElement.appendChild(document.createTextNode(findsDisplay));
	favScoreElement.appendChild(document.createTextNode(scoreDisplay));
}

	
// FUNKTIONEN

// Führende und abschließende Leerzeichen entfernen
function trim(str) {
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

function pnormaldist(qn) {
	var b = new Array(11);
	
	b[0]  = 1.570796288;
	b[1]  = 0.03706987906;
	b[2]  = -0.8364353589e-3;
	b[3]  = -0.2250947176e-3;
	b[4]  = 0.6841218299e-5;
	b[5]  = 0.5824238515e-5;
	b[6]  = -0.104527497e-5;
	b[7]  = 0.8360937017e-7;
	b[8]  = -0.3231081277e-8;
	b[9]  = 0.3657763036e-10;
	b[10] = 0.6936233982e-12;
	
	if (qn < 0.0 || 1.0 < qn) {
		return 0.0;
	}
	
	if (qn == 0.5) {
		return 0.0;
	}
	
	var w1 = qn;
	if (qn > 0.5) {
		w1 = 1.0 - w1;
	}
	
	var w3;
	w3 = - Math.log(4.0 * w1 * (1.0 - w1));
	
	w1 = b[0];
	for (var i = 1; i <= 10; i++) {
		w1 += b[i] * Math.pow(w3, i);
	}
	
	if (qn > 0.5) {
		return Math.sqrt(w1*w3);
	} else {
		return -Math.sqrt(w1*w3);
	}
}

function ci_lower_bound(pos, n, power) {
	if (n == 0) return 0.0;
	var z = pnormaldist(1 - power / 2);
	var phat = 1.0 * pos / n;
	return (phat + z * z / (2 * n) - z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) / (1 + z * z / n);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function $(theID) {
	if (theID) {
		return document.getElementById(theID);
	}
	return null;
}

function xPath(expr, context, typ) {
	var result = document.evaluate(	(expr || '//body'),
									(context || document),
									null,
									(typ || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE),
									null);
	switch (typ) {
		case XPathResult.NUMBER_TYPE: return result.numberValue;
		case XPathResult.STRING_TYPE: return result.stringValue;
		case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
		case XPathResult.ANY_UNORDERED_NODE_TYPE:
		case XPathResult.FIRST_ORDERED_NODE_TYPE: return result.singleNodeValue;
		default: return result;
	}
}

function lastElementChild(p) {
	if (typeof(p.lastElementChild) != 'undefined') {
		return p.lastElementChild;
	} else {
		var child = p.lastChild;
		while (child && child.nodeType !== 1) {
			child = child.previousSibling;
		}
		return child;
	}
}

function LD_removeStyle(theID) {
	var styleSheet = document.getElementById(theID);
	if (styleSheet) {
		styleSheet.parentNode.removeChild(styleSheet);
	}
}

function LD_addStyle(css, theID) {
	var head = document.getElementsByTagName('head');
	if (!head) { return; }
	var styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';
	try {
		styleSheet.innerHTML = css;
	} catch(err) {
		styleSheet.innerText = css;
	}
	if (theID) {
		LD_removeStyle(theID);	// no duplicate IDs
		styleSheet.id = theID;
		styleSheet.title = theID;
	}
	head[0].appendChild(styleSheet);
}

})();
