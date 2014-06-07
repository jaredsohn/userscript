// ==UserScript==
// @name        Scirra Forum - PMs
// @description Display your private message unread count
// @namespace   www.scirra.com/users/ramones
// @include     https://www.scirra.com/*
// @include		http://www.scirra.com/*
// @version     1.0
// ==/UserScript==

if (window.top != window.self)  // don't run on frames or iframes
    return;

	
function PMAlertScript() {
	$(document).ready(function() {	
		var pmCount = $('#UserDropDown .dropdown-links a:first').text().match(/Inbox \(([0-9]*)\)/);
		pmCount = (pmCount === null) ? '?' : pmCount[1];
		var pmUnreadCountLink = $('<a id="PMUnreadCount" class="alert-box" href="pm_inbox.asp" title="Click to open inbox.">' + pmCount + '</a>');
		pmUnreadCountLink.insertBefore('.user-panel #AlertBoxLink').css('margin-left', '2px');
		if(pmCount === '0') {
			$('#PMUnreadCount').addClass('alert-inactive');
		}
	});
}

// inject script into page (for Chrome)
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + PMAlertScript + ')();'));
script.type = "text/javascript";
(document.body || document.head || document.documentElement).appendChild(script);