// ==UserScript==
// @name           Comment signature
// @description    Automatically adds a signature to comments on a place.
// @namespace      Andrew
// @include        *.roblox.com/*-place?id=*
// @version        1
// ==/UserScript==

var siggy = "I got a new signature! :D"
document.getElementById('ctl00_cphRoblox_TabbedInfo_CommentaryTab_CommentsPane_NewCommentTextBox').className = "translate";

document.getElementById('ctl00_cphRoblox_TabbedInfo_CommentaryTab_CommentsPane_NewCommentTextBox').defaultValue = "\n\n\n" + siggy;
