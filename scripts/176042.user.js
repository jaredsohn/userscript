// ==UserScript==
// @name		Amazon's Mechanical Turk: Always Show All Details
// @author		David Shumway
// @description		Always "Show all details" on Amazon Mechanical Turk search pages.
// @include		https://www.mturk.com/mturk/*
// @updateURL		http://userscripts.org/scripts/source/176042.user.js
// @downloadURL		http://userscripts.org/scripts/source/176042.user.js
// @version		1
// ==/UserScript==

// Copyright 2013 David Shumway.

/**
 *
 * This is the relevant part of the search pages, regarding the Show all details button.
 * The Javascript handler for expand/collapse is at https://www.mturk.com/js/expandcollapse.js.
 * 
<script type="text/javascript" >
   document.write('<div style="text-align: center;" valign="bottom" nowrap><a id="expandall" class="footer_links" href="#">Show all details</a>' +
	   '&nbsp;&nbsp;<font color="#9ab8ef">|</font>&nbsp;&nbsp;' +
	   '<a id="collapseall" class="footer_links" href="#">Hide all details</a></div>');
</script>
 *
*/

var term;

var interval;

var interval_amount;

var maxTimeToWaitFor_ShowAllDetails;

var date_start;

var date_now;

var link_expandall;

interval_amount = 400; // in milliseconds

maxTimeToWaitFor_ShowAllDetails = 6; // in seconds

date_start = new Date(); // start date of this script
date_start = date_start.getTime() / 1000; // in seconds

// The text in the page that is present when "Show all details" is present.
// The text that seems to only be on search pages (is 100% true?).
term = /<span class="capsulelink">/;

// Wait for the document
if (document.readyState == "complete" || document.readyState == "interactive") {
	load();
}
else {
	document.onreadystatechange = function () {
		if (document.readyState == "complete" || document.readyState == "interactive") {
			load();
		}
	}
}

// load
function load() {
	
	// Is this a search page (i.e. a page that has <span class="capsulelink">)?
	// Otherwise we are done here.
	// I.e., does not waste any more resources at this point.
	if (term.exec(document.body.innerHTML)) {

		// Wait for just a moment if expandall link is being created.
		// But only just a moment. After that just give up.
		
		var interval = window.setInterval(function() {
			
			// Link expandall
			link_expandall = document.getElementById('expandall');
			
			// If link exists
			if (link_expandall) {
				
				// Clear the watch interval
				clearInterval(interval);
				
				// Click expand all link
				link_expandall.click();
				
			} else { // give up?
				
				date_now = new Date();
				date_now = date_now/1000; // in seconds
				
				// Has max time to wait elapsed?
				// Not very likely that this will ever occur!
				if (date_now - date_start > maxTimeToWaitFor_ShowAllDetails) {
					
					// Exit
					clearInterval(interval);
					
				}
				
			}
			
		}, interval_amount);
		
	}
	
}