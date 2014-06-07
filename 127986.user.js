// ==UserScript==
// @name           Newgrounds Drift
// @namespace      notifdrift@snakehole.net
// @description    Fixes the notification drift caused by some userscripts
// @include        *.newgrounds.com/*
// ==/UserScript==

/**
 * FIX NOTIFICATION DRIFT - by Snake-Arsenic (http://snake-arsenic.newgrounds.com/)
 * Free for use and modification by others provided this credit remains intact.
 * For best results, place this at the end of your script.
 */
function SA_fixNotificationDrift()
{

	// Initialise variables and calculate total drift to get
	var currentSize = window.getComputedStyle(document.getElementById('loginbox_loggedin_msg'), null).getPropertyValue("width");
	var buttons = document.querySelectorAll('#loginbox_loggedin_msg > a');
	var driftAmount = 0;
	for (var i = buttons.length - 1; i >= 0; i--) {if (buttons[i].id != 'event_link') {driftAmount += 30;} else {break;}};
	var driftFix = 'div.eventlist ul, div.eventlist p { right: ' + (-163 + driftAmount) + 'px;}';
	var style = null;
	// If another script has added this fix, update. If not, add fix.
	if(document.getElementById('SA_fixNotificationDrift'))
	{
		document.getElementById('SA_fixNotificationDrift').textContent = driftFix.toString();
	}else{
		style = document.createElement("style"); style.type = "text/css"; style.id = "SA_fixNotificationDrift"; style.textContent = driftFix.toString(); document.body.appendChild(style);
	}
	// Clean up for garbage collection
	style = currentSize = driftFix = buttons = null;
	document.getElementById('event_link').removeEventListener('click',SA_fixNotificationDrift);
	SA_fixNotificationDrift = null;
}
// There's no need to fix something we can't see, so wait until just before we can.
if(document.getElementById('event_link')) {document.getElementById('event_link').addEventListener('click',SA_fixNotificationDrift);} else {SA_fixNotificationDrift = null;}
/**
 * END FIX NOTIFICATION DRIFT
 */