// ==UserScript==
// @name          Invisibility Cloak
// @description   Turns time-wasting web pages invisible until a specified time of day.

// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// @include       http://orkut.com/*
// @include       http://*.orkut.com/*
// @include       http://twitter.com/*
// @include       http://*.twitter.com/*
// @include       http://deviantart.com/*
// @include       http://*.deviantart.com/*
// @include       http://rate.ee/*
// @include       http://*.rate.ee/*
// @include       http://iha.ee/*
// @include       http://*.iha.ee/*
// Other
// @include       http://feedly.com/*
// @include       http://*.feedly.com/*
// @include       http://hinnavaatlus.ee/*
// @include       http://*.hinnavaatlus.ee/*
// News
// @include       http://epl.ee/*
// @include       http://*.epl.ee/*
// @include       http://postimees.ee/*
// @include       http://*.postimees.ee/*
// ==/UserScript==
//
// Initial release by Gina Trapani, modified by Sander Soots

(function () {
	// EDIT THE NEXT LINE TO SET THE HOUR AFTER WHICH SITES SHOULD APPEAR
	// HOURS IN MILITARY TIME, SO 15 = 3PM
	var surf_time_after = 17;
	// END EDIT

	var readable_time = '';
	if (surf_time_after > 12 )
	{
		readable_time = surf_time_after - 12;
		readable_time = readable_time + 'PM';
	} else {
		readable_time = surf_time_after + 'AM';
	}

	var tstamp = new Date();

	if (tstamp.getHours() < surf_time_after )
	{
		var b = (document.getElementsByTagName("body")[0]);
		b.setAttribute('style', 'display:none!important');
		alert("You can surf after "+ readable_time + ";  right now, get back to work!");
	}

})();