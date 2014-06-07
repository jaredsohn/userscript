// Invisibility Cloak
// version 0.1
// Gina Trapani
// 2006-01-03
// Released to the public domain.
//
// ==UserScript==
// @name          Invisibility Cloak
// @description   Turns time-wasting web pages invisible until a specified time of day.
// @include       http://flickr.com/*
// @include       http://*.flickr.com/*
// @include       http://metafilter.com/*
// @include       http://*.metafilter.com/*
// @include       http://reader.*.com/
// @include       http://google.com/reader/*
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
	var surf_time_after = 20;
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
