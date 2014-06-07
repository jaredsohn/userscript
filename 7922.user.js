// Yamar's Realistic Pocket Queries
// Copyright 2007 Wes Hardaker
// Released under GPLv2
//
// ==UserScript==
// @name		Realistic Pocket Queries
// @description		Changes Pocket Query Parameters to things you like
// @namespace       	http://yamar.geoqo.org/monkey/
// @include         	http://www.geocaching.com/pocket/*
// ==/UserScript==

(function() {

	// -------------Switches-------------
	// To enable a feature, set the value to 1 (one).
	// To disable a feature, set the value to 0 (zero).

	// Change the default number of queries and search radius to XXX
	var showme = 500;
	var radius = 500;

        // Sets these check boxes
        var notfound = 1;
        var dontown = 1;
        var chkisactive = 1;

	// -------------End of Switches-------------

	var thebox = document.getElementById('tbResults');
	if (thebox) {
		thebox.value = showme;
	}

	thebox = document.getElementById('tbRadius');
	if (thebox) {
		thebox.value = radius;
	}

        var cbd = document.getElementById('cbOptions_0');
	if (cbd && notfound) {
		cbd.checked = 1;
	}

        var cbd2 = document.getElementById('cbOptions_2');
	if (cbd2 && dontown) {
		cbd2.checked = 1;
	}

        var cbd12 = document.getElementById('cbOptions_12');
	if (cbd12 && chkisactive) {
		cbd.checked = 1;
	}

})();
