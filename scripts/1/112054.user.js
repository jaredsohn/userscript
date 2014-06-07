// ==UserScript==
// @name           Facebook Desktop Notifications
// @namespace      http://www.userscripts.org
// @update-url     http://userscripts.org/scripts/source/112054.user.js
// @author         jonyMit
// @version        1.0
// @description    Enable Chrome desktop notifications for Facebook.
// @match          *://www.facebook.com/*
// ==/UserScript==
enableNotifications = function() {
	if ( document.readyState=="complete" ) {
		location.assign( "javascript:presenceNotifications.allowDesktopNotifications=true;" );
	} setTimeout( "enableNotifications()", 1000 );
}
waitForPerm = function() {
	if ( !webkitNotifications.checkPermission() ) location.reload(true);
	setTimeout("waitForPerm()", 2000);
}

if ( window.webkitNotifications ) {
	if ( window.webkitNotifications.checkPermission() ) {
		var pageLogo = document.getElementById("pageLogo");
		pageLogo.innerHTML = "<a title='Allow Desktop Notifications for www.facebook.com!' onclick='void(window.webkitNotifications.requestPermission());' ></a>";
		alert("Please allow notifications by clicking the Facebook logo in the top left corner!");
		setTimeout("waitForPerm()",2000);	
	}
	enableNotifications();
}