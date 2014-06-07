// Invisibility Cloak
// version 0.2
// Gina Trapani
// 2006-01-03
// Released to the public domain.
//
// ==UserScript==
// @name          Invisibility Cloak
// @description   Turns time-wasting web pages invisible until a specified time of day; optionally on weekdays only.
// @include       http://flickr.com/*
// @include       http://*.flickr.com/*
// @include       http://metafilter.com/*
// @include       http://*.metafilter.com/*
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.1:
// Released: 2006-01-03.
// Initial release.
//
// Version 0.2:
// Released: 2006-01-18.
// Includes option to not apply cloak on the weekends.
// ==/RevisionHistory==



(function () {
	// EDIT THE NEXT LINES TO SET THE HOUR AFTER WHICH SITES SHOULD APPEAR
	// HOURS IN MILITARY TIME, SO 15 = 3PM
	var surf_time_after = 23;
	// TAKE OFF CLOAK ON WEEKENDS?
	var cloak_off_weekends = true;
	// END EDIT

	var tstamp = new Date();
	var its_the_weekend = false;
	if (tstamp.getDay() == 6 || tstamp.getDay() == 0)
	{
		its_the_weekend = true;
	}

	var readable_time = '';
	if (surf_time_after > 12 )
	{
		readable_time = surf_time_after - 12;
		readable_time = readable_time + 'PM';
	} else {
		readable_time = surf_time_after + 'AM';
	}

	if (tstamp.getHours() < surf_time_after )
	{
		if (cloak_off_weekends == true)
		{
			if (its_the_weekend == false)
			{
				var b = (document.getElementsByTagName("body")[0]);
				b.setAttribute('style', 'display:none!important');
				alert("You can surf after "+ readable_time + ";  bitch");
			}
		} else {
				var b = (document.getElementsByTagName("body")[0]);
				b.setAttribute('style', 'display:none!important');
				alert("You can surf after "+ readable_time + ";  bitch");
		}

	}

})();

