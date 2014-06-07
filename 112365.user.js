// ==UserScript==
// @match http://*.google.com/*
// @match http://www.google.com/*
// @match https://*.google.com/*
// @name          G-
// @namespace     http://www.adnansiddiqi.com/
// @description   Remove Google Plus Notification from all google sites
// ==/UserScript==

setInterval(hideNotification, 100);
function hideNotification()
{		
	var gNotification = document.getElementById('gbgs1');
	if (gNotification)
	{
		gNotification.parentNode.removeChild(gNotification);
	}
}