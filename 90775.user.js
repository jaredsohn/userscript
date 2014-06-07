// ==UserScript==
// @name           campfire-hide-enter-leave-notifications
// @description    hides the "xxx has entered the room" and "xxx has left the room" posts in campfire forums
// @namespace      campfirenow.com
// @include        https://*.campfirenow.com*
// Thanks to Emil Sundberg for the CSS in this thread: 
// http://answers.37signals.com/campfire/620-can-you-hide-the-has-entered-the-room-details-in-chat-rooms
// ==/UserScript==

var cssToRemoveEnterAndLeaveRoomMessages = "tr.timestamp_message + tr.timestamp_message, "+
"tr.leave_message + tr.timestamp_message, "+
"tr.enter_message + tr.timestamp_message, "+
"tr.kick_message + tr.timestamp_message, "+
"tr.enter_message, tr.kick_message, tr.leave_message { "+
"display: none !important; "+
"}";

GM_addStyle(cssToRemoveEnterAndLeaveRoomMessages);