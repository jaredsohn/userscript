// Modified Invisibility Cloak For Revision Purposes
// 3.0
// 19/03/2010
//
// ==UserScript==
// @name          Revision Helper (Only Allow cam.ac.uk URLs)
// @description   Stops you viewing non-work websites until a certain time of day.
// @include http://*
// @exclude http://*.cam.ac.uk/*
//
// @run-at document-start
// ==/UserScript==

(function () {
	var block_time_stop = 20;

	var tstamp = new Date();
	if (tstamp.getDay() == 6 || tstamp.getDay() == 0)
	{ //its the weekend
	   var block_time_stop = 16;
	}

	if (tstamp.getHours() > 8 && tstamp.getHours() != 13 && tstamp.getHours() <= block_time_stop)
	{
		var b = (document.getElementsByTagName("body")[0]);
		b.setAttribute('style', 'display:none!important');
		//alert("Get back to work!");
	}	
})();