// ==UserScript==
// @name            Redirect to Old Version of Gmail
// @author          Jake Kasprzak
// @namespace	http://jake.kasprzak.ca
// @version	0.2.0
// @description 	Automatically redirects the user to the older version of Gmail when logging into it.
// @include 	http://www.google.com/accounts/*
// @include 	https://www.google.com/accounts/*
// @include 	http://mail.google.com/*
// @include 	https://mail.google.com/*
// @include	http://www.google.tld/ig

(function() {
    
	//this function is for initializing menu option for redirecting to a secure connection to Gmail or not
	function makeMenuToggle(key, defaultValue, toggleOn, toggleOff) {
	  // Load current value into variable
	  window[key] = GM_getValue(key, defaultValue);
	  // Add menu toggle
	  GM_registerMenuCommand((window[key] ? toggleOff : toggleOn), function() {
		GM_setValue(key, !window[key]);
		
	  });
	}  //makeMenuToggle
	
	makeMenuToggle("useSecure", true, "Ensure Connections to Gmail are Secure", "Do Not Ensure Connections to Gmail are Secure");
	
	//the two URLs to which the user can be redirected
	oldVersionURL = "http://mail.google.com/mail/?ui=1";
	oldVersionURLSec = "https://mail.google.com/mail/?ui=1";
	
	//the URL used when Gmail is accessed via Gmail Notifier
	notifierURL = "https://mail.google.com/mail/";
	
	// handle case of secure connection, and handle case of secure connection accessed from Gmail Notifier Extension
	redirectFromSecure = new RegExp("mail\.google\.com\/mail\/.*\?shva=1", "i");
    
	if ( (redirectFromSecure.test(window.location.href)) || (window.location.href==notifierURL) ) {
		window.location.href = oldVersionURLSec;
    }

	
	//handle case of non-secure connections from iGoogle, and one in which the URL for non-secure connections is chosen
	
	//when accessing Gmail via iGoogle, the URL will match one of the following regular expressions
	redirectFromiGoogle1 = new RegExp("mail\.google\.com\/mail\/.*hl.*tab", "i");
	redirectFromiGoogle2 = new RegExp("mail\.google\.com\/mail\/.*account_id", "i");
	
	//the URL used when a non-secure connection to Gmail is made
	nonSecureURL = "http://mail.google.com/mail/";
	
	if ( (redirectFromiGoogle1.test(window.location.href)) || (redirectFromiGoogle2.test(window.location.href))   
			|| window.location.href==nonSecureURL ) {
		
		
		if (useSecure) {
			window.location.href = oldVersionURLSec;
		}
		else {
			window.location.href = oldVersionURL;
		}
	}
	
	
})();


