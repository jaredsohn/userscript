// ==UserScript==
//
// @name        Gmail Exclude My Email As Recipient
// @description Automatically exclude my email address from being a recipient in Gmail.

// @namespace   http://jonathanhult.com/
// @author      Jonathan Hult
// @license     MIT

// @version     1.0
// @changelog   1.0 Initial version

// @match       https://mail.google.com/*
// @match       http://mail.google.com/*
//
// ==/UserScript==
setInterval(function() {
	// to/cc/bcc fields
	var recipients = document.getElementsByClassName('vR');

	// div elements for from field
	var class_az3 = document.getElementsByClassName('az3')[0];
	if (typeof class_az3 != 'undefined') {
		// email address in from field
		var from = document.getElementsByClassName('az3')[0].childNodes[1].childNodes[0].childNodes[0].innerHTML;
		
		// loop to/cc/bcc fields
		for (i = 0; i < recipients.length; i++) {
			// get email addresses
			var emailAddresses = recipients[i].getElementsByTagName('span');
			
			// loop email addresses
			for (j = 0; j < emailAddresses.length; j++) {
				// Delete email address if it matches
				if (from.indexOf(emailAddresses[j].getAttribute('email')) >= 0) {
					recipients[i].parentNode.removeChild(recipients[i]);
					break;
				}
			}
		}
	}
}, 1000);