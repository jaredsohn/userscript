// ==UserScript==
// @name           Outlook365 Unread Count
// @namespace      http://userscripts.org/users/65373
// @description    Shows Outlook365 unread count.
// @include       http*://outlook.office365.com/*
// @include       http*://*.outlook.com/*
// @version        1.0
// ==/UserScript==

var unreadCount = 0;

function notify(diff) {
  var text = "You have " + diff.toString() + " new emails."
  var havePermission = window.webkitNotifications.checkPermission();
  if (havePermission == 0) {
    var notification = window.webkitNotifications.createNotification(
      'http://i.stack.imgur.com/dmHl0.png',
       text,
      'Outlook365 notification.'
    );

    notification.onclick = function () {
      notification.close();
    }
    notification.show();
  } else {
      window.webkitNotifications.requestPermission();
  }
}  

function checkUnreadCount() {
	
	html = document.getElementsByTagName('html')[0].innerHTML
	var regex = /([0-9]+)\sUnread/g, result
	
    var parts = html.match(regex);
    var sum = 0
    if (parts)
    	parts.forEach(function(entry) {
    		sum += parseInt(entry.split(" ")[0]);
    	});
    if (sum > unreadCount) {
        notify(sum-unreadCount);
    }
    document.title = "(" + sum + ") " + title;
    unreadCount = sum;

}
var title = document.title;
timer = setInterval(checkUnreadCount, 3000);