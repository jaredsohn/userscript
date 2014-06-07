// ==UserScript==
// @name           {Fur Affinity} Add Submission Post Dates
// @namespace      http://wolfey.sillydog.org/
// @description    Adds the date a submission was posted under that submission's title.
// @include        http://www.furaffinity.net/browse/
// @include        http://www.furaffinity.net/browse/*
// @include        http://www.furaffinity.net/favorites/*
// @include        http://www.furaffinity.net/gallery/*
// @include        http://www.furaffinity.net/scraps/*
// @include        http://www.furaffinity.net/search/
// @include        https://www.furaffinity.net/browse/
// @include        https://www.furaffinity.net/browse/*
// @include        https://www.furaffinity.net/favorites/*
// @include        https://www.furaffinity.net/gallery/*
// @include        https://www.furaffinity.net/scraps/*
// @include        https://www.furaffinity.net/search/
// ==/UserScript==

// [Last Updated] April 2, 2012

// =====================================================================
// =====================================================================
// [START] "Get Elements by Class Name"
// [ http://snipplr.com/view/1696/get-elements-by-class-name/ ]
// (This section has been modified to be valid, according to JSLint)
function getElementsByClassName(classname, node) {

	"use strict";

	var a, re, els, i, j = "";

	if (!node) {
		node = document.getElementsByTagName("body")[0];
	}
	a = [];
	re = new RegExp('\\b' + classname + '\\b');
	els = node.getElementsByTagName("*");
	for (i = 0, j = els.length; i < j; i = i + 1) {
		if (re.test(els[i].className)) {
			a.push(els[i]);
		}
	}
	return a;

}
// [END] "Get Elements by Class Name"
// =====================================================================
// =====================================================================

function addSubmissionPostDates() {

	// Enable ECMAScript 5 Strict Mode

	"use strict";

	// Set variables

	var
		currentItem, currentItemFilename, currentItemHeight, currentItemLink,
		currentItemNode, currentItemTitle, itemCount, itemCountLocation, itemDate,
		itemDateSpan, itemDateSpanText, itemDay, itemFullDate, itemLineBreak, itemMonth,
		itemYear, thumbnailPreviews, timeStamp =
		"";

	// Identify the value for the "id" attribute based on its counterpart in the URL

	thumbnailPreviews = document.URL.split("/")[3];

	// Count how many items there are on the current page

	itemCountLocation = document.getElementById(thumbnailPreviews);

	itemCount = itemCountLocation.getElementsByClassName("flow")[0].getElementsByTagName("b").length;

	// Set a variable for the position of the current item

	currentItem = 0;

	// Check each image to determine whether or not a submission date is available
	// If so, add it as part of the <li> element; otherwise, go to the next item

	for (currentItem = 0; currentItem < itemCount; currentItem = currentItem + 1) {

		// Set a variable for the current item

		currentItemNode = itemCountLocation.getElementsByClassName("flow")[0].getElementsByTagName("b")[currentItem];

		// If the item has been deleted, skip it; otherwise, prepare to add a submission date
		// Deleted items will return a value of "3" and all other items will return a value of "6"

		if (currentItemNode.getElementsByTagName("img")[0].getAttribute("src").split("/").length !== 3) {

			// Determine where the filename is based on the URL

			currentItemFilename = currentItemNode.getElementsByTagName("img")[0].getAttribute("src").split("/").length - 1;

			// Set a variable for the submission date within the filename (represented in UNIX time)

			timeStamp = "";

			// Set a variable for the item's full submission date (if available)

			itemFullDate = "";

			// Find the item's submission date (if available)
			// Multiple formats are used, so the timestamp's position will vary as a result
			// Submissions uploaded prior to February 28, 2005 (this date is approximate) do not have a timestamp in the filename

			if (currentItemNode.getElementsByTagName("img")[0].getAttribute("src").split("/")[currentItemFilename].match("[0-9]{10}") !== null) {

				timeStamp = currentItemNode.getElementsByTagName("img")[0].getAttribute("src").split("/")[currentItemFilename].match("[0-9]{10}");

				// Convert the timestamp into a human-readable form - credit for this line goes to:
				// [http://www.whoisgregg.com/blog/2007/02/convert-unix-timestamp-to-javascript-date-object.html]

				itemDate = new Date(timeStamp * 1000);

				// Set individual variables for the item's day, month and year

				itemDay = itemDate.getDate();
				itemMonth = itemDate.getMonth() + 1;
				itemYear = itemDate.getFullYear();

				// Add a leading zero to the month's value if it is under ten

				if (itemMonth < 10) {

					itemMonth = "0" + itemMonth;
				}

				// Add a leading zero to the day's value if it is under ten

				if (itemDay < 10) {

					itemDay = "0" + itemDay;

				}

				// The item's full submission date is available - show it in the format of "DD/MM/YYYY"

				itemFullDate = itemMonth + "/" + itemDay + "/" + itemYear;

			} else {

				// The item's full submission date is not available - show "No Date Available"

				itemFullDate = "(No Date Available)";

			}

			// Add a "span" element to contain the item submission date

			itemDateSpan = document.createElement("span");

			// Add a "br" element to split up the lines between the title and user
			// Only the "Favorites" section will make use of this

			itemLineBreak = document.createElement("br");

			// Add a text node within the "span" element to contain the item submission date

			itemDateSpanText = document.createTextNode(itemFullDate);

			// Set an "id" attribute for the item submission date's "span" element (for user customization)

			itemDateSpan.setAttribute("id", "item_date");

			// Set a "style" attribute for the item submission date's "span" element
			// Only the "Favorites" section will make use of this

			itemDateSpan.setAttribute("style", "font-weight: normal;");

			// Place the item submission date's text into its "span" element

			itemDateSpan.appendChild(itemDateSpanText);

			// Place the item submission date's "span" element at the end of its "li" element, after its title
			// For "Favorites", add it after its title but before the user link

			currentItemTitle = currentItemNode.childNodes[1].firstChild;

			// Set a variable for the item's link
			// Only the "Favorites" section will make use of this

			currentItemLink = currentItemNode.childNodes[1].childNodes[2];

			// Add the item submission date to the item

			if ((thumbnailPreviews === "browse") || (thumbnailPreviews === "favorites") || (thumbnailPreviews === "search")) {

				currentItemNode.insertBefore(itemLineBreak, currentItemNode.childNodes[2]);

				currentItemNode.insertBefore(itemDateSpan, currentItemNode.childNodes[3]);

			} else {

				currentItemNode.appendChild(itemDateSpan);

			}

			currentItemHeight = currentItemNode.offsetHeight + itemDateSpan.offsetHeight;

			currentItemHeight = "height: " + currentItemHeight + "px;";

			currentItemNode.setAttribute("style", currentItemHeight);

		}

	}

}

addSubmissionPostDates();