// ==UserScript==
// @name           Angel session extender
// @namespace      http://freecog.net/2008/
// @description    Extend your Angel session indefinitely
// @include        https://angel.rose-hulman.edu/Angel/*
// ==/UserScript==

// Copyright (C) 2008-2009 Thomas W. Most
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function inject(func) {
	window.location = 'javascript:(' + encodeURIComponent(uneval(func)) + ')();';
}

inject(function() {
	// Disable error messages from pinging the API (otherwise two pop up
	// each time the network connection drops).
	var alt = window.alert;
	window.alert = function(s) {
		if (!String(s).match(/Error: unable to connect to API/)) {
			alt.apply(window, arguments);
		}
	};
	
	// Ping the Angel server every five minutes
	window.setTimeout(function() {
		if (window.ANGEL && ANGEL.sessionTimer) {
			ANGEL.sessionTimer.reset();
			ANGEL.sessionTimer.extendSession();
		}
		window.setTimeout(arguments.callee, 5 * 60 * 1000);
	}, 5 * 60 * 1000);
});
