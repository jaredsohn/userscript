// ==UserScript==
// @name          eBay feedback in results
// @namespace     http://henrik.nyh.se
// @description	Displays positive feedback percentage and (optionally) feedback rating for the seller of each item in an eBay auction listing. The limit between green and red colored feedback can be set and the feedback rating toggled - see option in "Tools > User Script Commands" when viewing an eBay auction listing.
// @include       http://*search*.ebay.*/*
// @include       http://*listings.ebay.*/*
// ==/UserScript==

// XPath to get all auction links

var auctionLinks = document.evaluate("//td[contains(@class, 'ebcTtl')]/descendant::a",
						 document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Set options: Limit

var limit = GM_getValue('limit', 100) * 1.0;  // Default is 100 - force into float

GM_registerMenuCommand('eBay feedback: Set percentage color limit', function() {

	while (true) {

		newLimit = prompt("This value determines what feedback percentages should be displayed in what color.\n\nPercentages above or equal to the limit will be GREEN; others RED.\n\nRecommended values are about 98 - 100 and may include decimals.\n\nSet to 0 to show all percentages in BLACK.", limit, "eBay feedback in results");
		
		if (newLimit >= 0 && newLimit <= 100) {
			GM_setValue('limit', newLimit);
			reload = confirm("The limit has been "+(limit == newLimit ? "un" : "")+"changed from " + limit + " to " + newLimit + ".\n\nYou will need to reload the page to use this value. Reload now?");
			limit = newLimit; // If we're re-setting before reloading
			if (reload) location.reload();
			break;
		} else {
			retry = confirm("The value cannot be \"" + newLimit + "\"! You can only select a number between 0 and 100.\n\nThe limit is currently "+limit+".\n\nTry again?");
			if (!retry) break;
		}
		
	}
	
});

// Set options: display feedback score

// Set full width options

// The value determines whether to display the feedback score
// (total amount of feedback received) in addition to the percentage
// of positive feedback.

var displayScore = GM_getValue('displayScore', true);  // Default is true

GM_registerMenuCommand('eBay feedback: '+ (displayScore ? "Don\'t d" : "D") +'isplay total feedback received', function() {
	GM_setValue('displayScore', !displayScore);
	
	reload = confirm("Feedback scores will "+(displayScore ? "not" : "")+" be displayed.\n\nYou will need to reload the page to see this in action. Reload now?");
	displayScore = !displayScore; // If we're re-setting before reloading
	if (reload) location.reload();
});


/*

	TO DO
	- Recognize same seller and only retrieve once (could get from "store" column if available, but obviously only for stores...)
	- could solve this with a short-lived cache? Still need to find the user ID though.

*/

// Get and show the feedback for the seller of the auction on URL
function showFeedback(link) {

	// Get rating from auction page

	GM_xmlhttpRequest({
	method:"GET",
	url:link.href,
	onload:function(result) {
	
		r = result.responseText;
		
		// Extract feedback and rating

		// eBay.com changed the format:
			regexp = /: (\d+)\D{0,2}\|\D{0,2}([\d,.]+)%/;
		if (!regexp.exec(r))  // This one is still used internationally, though:
			regexp = /: (\d+)<br><b>.*?: ([\d\.,]+)%/;
		
		p = regexp.exec(r)[2].replace(',', '.') * 1.0;  // Percentage - force into float
		r = regexp.exec(r)[1];  // Rating
		
		// Add first parenthesis
		link.parentNode.appendChild(document.createTextNode(' ('));

		// Set up the percentage
		perc = document.createElement('span');
		perc.innerHTML = p + ' %';
		
		// Color it
		if (limit)
			perc.style.color = (p >= limit) ? 'green' : 'red';

		// Add it
		link.parentNode.appendChild(perc);
		
		// Display the feedback score as well?
		if (displayScore)
			link.parentNode.appendChild(document.createTextNode(' / '+r));
		
		// Add the ending parenthesis
		link.parentNode.appendChild(document.createTextNode(')'));
	
	}
	});


}

for(var i = 0; i < auctionLinks.snapshotLength; i++) {  // For each link...

	var al = auctionLinks.snapshotItem(i);
	
	showFeedback(al);  // ...show the user feedback.
		
}

