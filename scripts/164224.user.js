// ==UserScript==
// @name       SIUBBmessages
// @namespace       http://userscripts.org/users/332789
// @version       v0.1
// @description       adding a new messages status
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include       *siuonline.blackboard.com*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var messaging = document.createElement("div");
onlinerank.setAttribute("class", "CourseMenu");
onlinerank.innerHTML = "<a>New Messages</a>";

delete messaging;