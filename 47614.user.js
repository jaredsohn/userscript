// ==UserScript==
	// @name			No Drivers Ed Timer
	// @namespace		http://www.whirljack.net
	// @description		disables the timer on driversed.com for fast readers
	// @include			https://driversed.com/*
	// ==/UserScript==
		   

	   /* There is probably a better way to do this, but this works.
              This just removes the onclick attribute value from the "next"
              button, so you can read the page as fast as you want without
              waiting for the timer.
           */
	   var snapHidden = document.evaluate("//input[@type='image']",
		   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	   for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
		   var elmHidden = snapHidden.snapshotItem(i);
		   var theName = elmHidden.getAttribute("name");
		   if (theName = "ctl00$pageContent$Continue") {
		       elmHidden.setAttribute("onclick", "");
		     
			}
	   }