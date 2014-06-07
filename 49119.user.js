// ==UserScript==
// @name           Submit URL Ping.fm to PLURK
// @namespace      http://beinghacked.blogspot.com
// @description    This script allows you to quickly submit the current page to Ping.fm.
// @include        *
// ==/UserScript==

// Register the menu commands
GM_registerMenuCommand("Set Ping.fm App Key", setAppKey);
GM_registerMenuCommand("Submit current page to Ping.fm", postURL);
//GM_registerMenuCommand("Test function", testFunction);

// Simple function to request and set the app key
function setAppKey() {
	GM_setValue("appkey", prompt("Please enter your Ping.fm app key.", GM_getValue("appkey", "")));
}

// Function to post the url and title to Ping.fm
function postURL() {
	// Check to see if the app key has been set
	if (!GM_getValue("appkey", false)) {
		setAppKey();
	}
	
	url = document.location.href;
	title = prompt("Please enter/edit the title for the page.", document.title);
	
	// Try to maintain the url as it is
	if(url.length <= 136) {
		if(url.length + title.length <= 136) {
			// If the total of the URL and title is under 136 chars, we're in business
			url = url;
		} else {
			// If the total of the URL and title is over 137, but the URL is still under 137, we can shorten the title
			url = url;
			title = title.substr(0, 134 - url.length) + "...";
		}
	}
	
	var message = url + " (" + title.substr(0, 134 - url.length) + ")";

	// Build the Ping.fm API parameters
	var pingFmParameters = encodeURI("api_key=ac40b3a1d64c826f496346c03ac8af18&user_app_key=" + GM_getValue("appkey") + "&post_method=default&body=" + message);
	
	// Submit the title and url to Ping.fm
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://api.ping.fm/v1/user.post",
		headers: {
			"Content-Type" : "application/x-www-form-urlencoded"
		}, 
		data : pingFmParameters,
		onload: function(response) {
			// Create the dom parser
			var parser = new DOMParser();
			var dom = parser.parseFromString(response.responseText, "application/xml");
			
			// Check the status and output the result
			var status = dom.getElementsByTagName('rsp')[0].attributes.getNamedItem("status").value;
			if(status == "FAIL") {
				var errorMessage = dom.getElementsByTagName('message')[0].childNodes[0].nodeValue;
				alert(errorMessage);
			} else {
				alert("URL submitted to Ping.fm");
			}
		}	
	});
}

