// ==UserScript==
// @name           Tumblr 24 Hour Queue
// @namespace      http://www.hitori.org/~rika/
// @version        1.0
// @include        http://www.tumblr.com/blog/*/queue
// @description    Script to change the queue times to 24 hour time.
// ==/UserScript==
// Author:         RIKA <rika@hitori.org>

// Function to convert the list of start or end post times from 12 to 24 hour time
function listTo24Hours(selElem) {
	// The times are "child" nodes, so get the list of them -- hoursList will be an array
	var hoursList = selElem.children;
	
	// Here we go through each child
	for (var i = 0; i < hoursList.length; ++i) {
		// And here we make a simple name for it
		var hourOption = hoursList[i];
		
		// Check to make sure it's an option, and no an internal child node (idk)
		if (hourOption.tagName == "OPTION") {
			// It turns out that Tumblr uses a 24 hour time internally, so the "value" of the option is what we want
			var hourString = ((hourOption.value < 10) ? "0" + hourOption.value : hourOption.value) + ":00";
			
			// Just update what it says in the option itself
			hourOption.innerHTML = hourString;
		}
	}
}

// State variable to avoid working when there's nothing to do
var qTimeTagsCount = 0;

// This function changes the little boxes beside queue entries that say the day
// and time a queued post is going to be published
function updateQueue(timeTags) {
	for (var i = 0; i < timeTags.length; ++i) {
		// Grab the tag
		var timeTag = timeTags[i];
		
		// And the text inside it
		var text = timeTag.innerHTML;

		// Fix it if it's a 12 hour time
		var index = text.indexOf('m');
		if (index > 0) {
			// AM or PM
			var isPM = (text.charAt(index - 1) == "p");
			
			// Also, pull the time apart just to make things easier
			var hour = parseInt(text);
			var min = parseInt(text.substring(text.indexOf(':') + 1));
			
			// The 12s are... interesting - deal with them here
			if (hour == 12) {
				// 12am is 0, and 12pm is 12
				hour = (isPM) ? 12 : 0;
			} else if (isPM) {
				hour += 12;
			}
			
			// Put the time back together
			var fixedTime = ((hour < 10) ? "0" + hour : hour) + ":" + ((min < 10) ? "0" + min : min);
			
			// And update
			timeTag.innerHTML = fixedTime;
		}
	}
}

// Update the list times, first the start time, then then end time
listTo24Hours(document.getElementById("queue_start_hour"));
listTo24Hours(document.getElementById("queue_end_hour"));

// Now, update the little tags beside each post
// We do it this way so that when we scroll and new entries are added they're also automagically fixed
setInterval(function() {
	// The tags all have the class "publish_on_time", so just find the elements that use this
	var timeTags = document.getElementsByClassName("publish_on_time");
	
	// Because we're calling so frequently (relatively), don't process the list unless it's changed
	if (timeTags.length != qTimeTagsCount) {
		// It's chaged, so fix the tags (again)
		updateQueue(timeTags);
		
		// And save the new count
		qTimeTagsCount = timeTags.length;
	}
}, 100);
