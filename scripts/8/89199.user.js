// Fix Reddit Subscription Buttons
// Author: Ictinus
// Released: 30 October 2010, make the Reddit Subscription Buttons more understandable.
// Update: 08 December 2010, also make 'friends' buttons more understandable
// Update: 28 January 2011, (1.02) fix label background.
// Updated: 21 Oct 2011, v1.03, added https support and removed scary "Requires your data on all websites" permission requirements. Changed button words to maintain compatability with Reddit design.
// Updated: 18 Nov 2011, v1.04, corrected for reddit changes.
//						 v1.05, fixed mouse pointer over label.
// Updated: 15 Jan 2012, v1.06, fixed button background image.

// ==UserScript==
// @name            Fix Reddit Subscription Buttons
// @version         1.06
// @namespace       http://ictinus.com/frsb/
// @description     Make the Reddit Subscription Buttons more understandable.
// @match 	http://*.reddit.com/*
// @match 	https://*.reddit.com/*
// ==/UserScript==

var fixRedditSubscriptionButtons = {
	fixSubscriptionButtons: true,    //add checkboxes to the frontpage subscription buttons, checked when 
	
	version : 1.06,
	changeBtnText: function () {
		var theBtns = document.getElementsByClassName("fancy-toggle-button");
		var allLinks;
		for (var iBtn = 0; iBtn < theBtns.length; iBtn++) {
			allLinks = theBtns[iBtn].getElementsByTagName("a");
			for (var iLinks = 0; iLinks < allLinks.length; iLinks++) {
				if (allLinks[iLinks].innerHTML === "subscribe") {
					allLinks[iLinks].innerHTML = '<input type="checkbox"> <label>not subscribed</label>';
				} else if (allLinks[iLinks].innerHTML === "unsubscribe") {
					allLinks[iLinks].innerHTML = '<input type="checkbox" checked> <label>subscribed</label>';
				} else if (allLinks[iLinks].innerHTML === "+ friends") {
					allLinks[iLinks].innerHTML = '<input type="checkbox"> <label>friends</label>';
				} else if (allLinks[iLinks].innerHTML === "- friends") {
					allLinks[iLinks].innerHTML = '<input type="checkbox" checked> <label>friends</label>';
				}
			}
		}
	},
	addGlobalStyle: function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	},
	init: function() {
		this.addGlobalStyle("span.fancy-toggle-button a input {position:relative; top:0.2em; margin-top:0px;} span.fancy-toggle-button a { outline:none; padding-top: 3px !important; padding-bottom:3px !important;} .fancy-toggle-button a label {background: transparent; cursor:pointer;} .fancy-toggle-button .add {background-position: -0px -106px;} .fancy-toggle-button .remove {background-position: 0px 0px;}");
		if (this.fixSubscriptionButtons == true) {
			this.changeBtnText();
		}
	}
}
document.addEventListener('load',fixRedditSubscriptionButtons.init(),true);
