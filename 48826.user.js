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
// @include       http://www.gamerdna.com/*
// @include       http://*.google.com/reader/*
// @include       http://www.deviantart.com/*
// @include       http://revision3.com/*
// @include       http://www.facebook.com/*
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
//
// Version 0.2.1
// Released: 2009-05-11.
// Includes option to specify when the cloak starts and stops.
// ==/RevisionHistory==



(function () {
	// EDIT THE NEXT LINES TO SET THE HOUR AFTER WHICH SITES SHOULD APPEAR
	// HOURS IN MILITARY TIME, SO 24 = PM
	// START TIME
	var surf_time_before = 18; //6PM
	// END TIME
	var surf_time_after = 27; //3AM
	// TAKE OFF CLOAK ON WEEKENDS?
	var cloak_off_weekends = true;
	var overnite_time = 0;
	// END EDIT

	var tstamp = new Date();
	var its_the_weekend = false;
	if (tstamp.getDay() >= 5 || tstamp.getDay() == 0)
	{
		its_the_weekend = true;
	}

	var readable_time = '';
	if (surf_time_after > 12 && surf_time_after < 24)
	{
		readable_time = surf_time_after - 12;
		readable_time = readable_time + 'PM';
	} 
	else if (surf_time_after == 24 || surf_time_after == 0)
	{
		readable_time = (surf_time_after == 24)?(surf_time_after - 12) + 'AM':(surf_time_after + 12) +'AM';
	}
	else if (surf_time_after > 24) //OVERNIGHT
	{
		readable_time = (surf_time_after - 24) + 'AM';
	}
	else
	{
		readable_time = surf_time_after + 'AM';
	}
	
	if (tstamp.getHours() > surf_time_before )
	{
		overnite_time = (surf_time_after > 24 && tstamp.getHours() <= 12)?(tstamp.getHours() + 24):tstamp.getHours();
		if (overnite_time < surf_time_after )
		{
			if (cloak_off_weekends == true)
			{
				if (its_the_weekend == false)
				{
					var b = (document.getElementsByTagName("body")[0]);
					b.setAttribute('style', 'display:none!important');
					alert("You can surf after "+ readable_time + ";  right now, get back to work!");
				}
			}
			else 
			{
					var b = (document.getElementsByTagName("body")[0]);
					b.setAttribute('style', 'display:none!important');
					alert("You can surf after "+ readable_time + ";  right now, get back to work!");
			}

		}
	}

})();