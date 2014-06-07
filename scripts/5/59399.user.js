// ==UserScript==
// @name	Instapaper Unread Counter
// @version	1.0
// @description Unread counter for Instapaper Fluid App
// @include     http://*.instapaper.com/*
// @copyright 	2009+, Filip Tpper (http://killingcreativity.com)
// ==/UserScript==

if (window.fluid) {
	function IPCounter() {
		var unread_count = document.getElementsByClassName("titleRow").length
		if (unread_count == 0) {
			window.fluid.setDockBadge("");
		} else {
		  window.fluid.setDockBadge(unread_count);
		}
	}

	setInterval(IPCounter, 500);
}