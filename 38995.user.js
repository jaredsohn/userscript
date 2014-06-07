// ==UserScript==
// @name           Skip Myspace "Sent Notification"
// @description	   When it takes you to the sent notification it auto-loads your inbox.
// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.sent&*
// ==/UserScript==

window.location="http://messaging.myspace.com/index.cfm?fuseaction=mail.inbox";
onload = function () {location.reload()};
