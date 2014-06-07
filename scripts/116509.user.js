// ==UserScript==
// @name           Facebook Desktop Notifications
// @namespace      http://www.userscripts.org
// @author         aliosmanyuksel
// @version        1.0
// @description    Enable Chrome desktop notifications for Facebook.
// @match          *://*.facebook.com/*
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
		pageLogo.innerHTML = "<a title='Allow Desktop Notifications for facebook.com!' onclick='void(window.webkitNotifications.requestPermission());' ></a>";
		alert("Please allow notifications by clicking the Facebook logo in the top left corner! | Lütfen bildirimlere izin vermek için sol taraftaki Facebook logosuna tıklayın!");
		setTimeout("waitForPerm()",2000);	
	}
	enableNotifications();
}