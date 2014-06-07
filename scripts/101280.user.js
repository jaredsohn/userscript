// ==UserScript==
// @name           Use DSLReports.com Domain for Broadband Reports
// @namespace      trparky.broadbandreports.dslreports.url.redirector
// @description    This redirects every URL that has http://www.broadbandreports.com so that it redirects to http://www.dslreports.com instead.
// @version        1.20
// @include        http://www.broadbandreports.com/*
// @include        http://broadbandreports.com/*
// ==/UserScript==

(function () {
	if (/broadbandreports\.com/i.test(document.location.toString())) {
		document.head.innerHTML = ""; // Cleans the HTML Document's Head Tag Contents.  We don't need them.

		var locationURL = document.location.toString(); // Get the current URL.
		var locationURL = locationURL.replace(/broadbandreports\.com/ig, "dslreports.com"); // Replace parts of the URL.
		var secondsPassed = 6;

		document.body.innerHTML = "<h1>Redirecting to the DSLReports.com domain in <span id=\"seconds\">5</span> seconds...</h1>"; // Put some new content on the page.
		document.body.innerHTML += "<p style=\"font-size:16pt;\">If you do not want to wait, click <strong><a href=\"" + locationURL + "\">here</a></strong>.</p>"; // Put some more new content on the page.
		
		var countDownFunction = function() {
			if (secondsPassed == 0) document.location = locationURL;
			else {
				secondsPassed -= 1;
				document.getElementById("seconds").innerHTML = secondsPassed;
				setTimeout(function() { countDownFunction(); }, 1000); // Waits 1 second then calls itself.
			}
		}
		
		countDownFunction();
	}
})();