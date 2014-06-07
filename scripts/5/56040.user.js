
// ==UserScript==
	// @name          I dont care..I just want to play yoville!
	// @namespace     http://userscripts.org/users/CEEJINC
	// @author        ceejinc
		// @description	  Redirects you from the crew accepting page to the page where you can actually play!
	// @version       1.0.0
	// @include    http://apps.facebook.com/yoville/my_crew.php?accepted*
// ==/UserScript==



location.replace("http://apps.facebook.com/yoville/index.php?bypass_reminder=1");