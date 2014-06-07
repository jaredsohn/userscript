// ==UserScript==
// @name           Newgrounds Quick GM
// @namespace      quickGM@snakehole.net
// @include        *.newgrounds.com/*
// @description    Adds a GM Button to Newgrounds
// ==/UserScript==

function NGQuickGM()
{
	if(document.getElementById('loginbox_loggedin_msg') && !document.getElementById('loginboxform'))
	{
		try
		{
			var gmIcon = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAO4AsgARws3ITQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCRYdMFKewNwAAAHpSURBVDjLfZPPTxNREMc/8/oKTU337QIXgqSJ/4I9QUhE4g1QOPj/efWirZwUwYSkJ/8IGyFeavdHtW7DdsfDtrK0lpdM3rx535nJzHxHWHK+v2Wt/N5+zeB/OJk3RGcEaY6/ysZnJHcAqInH9A9qhsg/JFwWQH68o1mzGxequQ8azOUKwYTG9FvlIHIvq1m/oOI1VRGy6M7X+sWdxaExgxYQzoJI74wnXr5xruQ+tcdBsNdBgejqJWQJWA9/r40A4dUxpNehYKJ00n++eUJPBp21AWiA9Qn2v0BtCzCh3sZorr4YiaTqgDwgvSG8fAaTSEUr38T0n9pyrVrxECoh0JKqj8An4EXxW/mqFa/AKoLkbjhCbLlNqiAUFUxNeUlX1cUxmqK7AtYDw8PHUOBEFDVxo44aY0YtqbrQ7bbVWDfL5k/FlHSMdZHbbatYF435deAOicxwtBKBqFgvhskpkAAfp+JKegKT0wInepuuxAI67YFCNvSoem8QXgFxiSezyh0q78mGHug/kthGPVHNVuKke+Q/2uls23rz/M7nPmmzP9fB7+5xTjaMG/VEZxkKClfXL1ndarqdD2Ddon8WE3ePYHzTS29/7m+e0ANU5vcA67mlU8iSOM0KBs5Kk8UV9h6YY7Kw1n8BIZrO0iNTl04AAAAASUVORK5CYII=)';
			var gmLink = document.createElement('a');
			gmLink.href = 'http://www.newgrounds.com/bbs/topic/1295996/';
			gmLink.title = 'Greasemonkey Scripts';
			gmLink.innerHTML = '<span class="" style="background-image:' + gmIcon + '">Greasemonkey Scripts</span><em></em>';
			var referenceElement = document.querySelector('.sitelinks .quicklinks form');
			document.querySelector('.sitelinks .quicklinks').insertBefore(gmLink, referenceElement);
		}catch(e){};
	}
}
NGQuickGM();

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