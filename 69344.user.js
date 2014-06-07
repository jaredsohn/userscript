// Chews Invisibility Cloak
// version 2.0
// Chris Hughes
// 2010-2-17
// Released to the public domain.
//
// ==UserScript==
// @name          Chews Invisibility Cloak
// @description   Turns time-wasting web pages invisible until a specified time of day.
// @match       http://flickr.com/*
// @match       http://*.flickr.com/*
// @match       http://facebook.com/*
// @match       http://*.facebook.com/*
// @match       http://*.reddit.com/*
// @match       http://reddit.com/*
// @match       http://*.digg.com/*
// @match       http://*.engadget.com/
// @match       http://digg.com/*
// @match       http://engadget.com/*
// @match       http://gizmodo.com/*
// @match       http://lifehacker.com/*
// @match       http://twitter.com/*
// @match       http://*.twitter.com/*
// @match       http://lifehacker.com/*
// @match       http://*.lifehacker.com/*
// @match       http://*.tuaw.com/*
// @match       http://tuaw.com/*
// @match       http://downloadsquad.com/*
// @match       http://*.downloadsquad.com/*
// @run-at document-start

// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.1:
// Released: 2006-01-03.
// Initial release.
// ==/RevisionHistory==



(function () {
	// EDIT THE NEXT LINE TO SET THE HOUR AFTER WHICH SITES SHOULD APPEAR
	// HOURS IN MILITARY TIME, SO 15 = 3PM
	var block_time_start = 8;
	var block_time_stop = 18;

	// END EDIT

	var tstamp = new Date();
	if (tstamp.getDay() == 6 || tstamp.getDay() == 0)
	{
	   // it's the weekend do nothing
	} else {
		if (tstamp.getHours() > block_time_start && tstamp.getHours() <= block_time_stop)
		{
			var b = (document.getElementsByTagName("body")[0]);
			b.setAttribute('style', 'display:none!important');
			alert("You cant surf right now, get back to work!");
		}	
	}

})();