// ==UserScript==
// @name        Kingofdown
// @description Add support of Firefox, Opera and Safari for Kingofdown
// @include     *kingofdown.com*
// @include     *hdstreamium.com*
// @include     *kingofshrink.com*
// @grant       GM_xmlhttpRequest
// @version     2.21
// @homepageURL    http://userscripts.org/scripts/show/165651
// @updateURL      https://userscripts.org/scripts/source/165651.meta.js
// @icon           http://kingofdown.com/img/favicon.png
// ==/UserScript==


// *** Options ***

// Don't get through the adf.ly and kingofshrink.com pages but directly to the download page
o_DirectToDownloadPage = true;


// *** Code ***

// Download page
function toDownloadLink() {
	return document.location.origin + document.location.pathname + '?file=1';
}


// If we are on an ad link
if (document.location.hostname == 'kingofshrink.com') {
	// If it doesn't exist (security changed), it outputs an error so anyways we are not redirected
	document.location.href = document.getElementById("textresult").getElementsByTagName("a")[0].href;
	
// If we are on a download page
} else {

	function checkForSubmit(event) {
		event = (event) ? event : ((window.event) ? window.event : "")
		if (event) {
			// Process event here
			if (event.keyCode==13 || event.which==13) {
				sendDownloadRequest();
			}
		}
	}

	// Send download request with a fake user agent
	function sendDownloadRequest() {
		userLink = linkForm.value;
		currURL = document.location.href;
		if (currURL.substring(currURL.length - 1, currURL.length) == "#") {
		  currURL = currURL.substring(0, currURL.length - 1);
		}
		GM_xmlhttpRequest({
			method: "POST",
			url: currURL,
			data: "link=" +  encodeURIComponent(userLink),
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36",    // Kingofdown only accepts Chrome User Agent
				"Referer": currURL,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onprogress: function(response) {
						if (response.finalUrl != null && response.finalUrl != currURL) {
							if (o_DirectToDownloadPage) {
								document.location.href = toDownloadLink();
							} else {
								document.location.href = response.finalUrl;
							}
						}
			},
			onload: function(response) {
						if (response.finalUrl == currURL) {
							alert("Invalid link or server is busy, please retry");
						} else {
							if (o_DirectToDownloadPage) {
								document.location.href = toDownloadLink();
							} else {
								document.location.href = response.finalUrl;
							}
						}
			}
		});
	}

	// PART 1: Fix download links
	var buttons = document.getElementsByClassName('btn');

	// Process buttons
	for each (currlink in buttons)  {
		// Make sure it's an element
		if (currlink.nodeType == 1)  {
			var currhref = currlink.getAttribute('href');
			
			// Fix link only in the case of a download button
			if (currlink.getAttribute('title') == 'Happy downloading :)')  {
				currlink.setAttribute('href', currhref.replace(/\\/g,''));
			}
		}
	}

	// PART 2: Remove timers
	timer = document.getElementById("timer");
	if (timer != null) {
		timer.parentNode.removeChild(timer);
		document.getElementById("textresult").removeAttribute("style");
	}


	// PART 3: Fix user agent for download request
	var linkForm = 0;

	// Find the download form
	docForms = document.getElementsByName("linkCheckerForm");

	for each (currForm in docForms) {
		if (currForm.nodeType == 1) {
		  // Get the request URL
		  currAction = currForm.getAttribute("action");
		  // Prevent any form submission other than ours
		  currForm.setAttribute("action", "javascript: void(0)");
		  // Get the user URL input object
		  linkForm = currForm.getElementsByTagName("input")[0];
		   // Found a valid user URL input?
		   if (linkForm.nodeType == 1 && linkForm.getAttribute("name") == "link") {
			// Target the submit button
			btnClick = currForm.getElementsByClassName("btn")[0];
			// Remove the old target
			btnClick.removeAttribute('onclick');
			// Set our custom one
			btnClick.addEventListener('click', sendDownloadRequest);
			linkForm.addEventListener('keypress', checkForSubmit);
			currForm.setAttribute('onsubmit', 'return 0');
		  }
		}
	}
}