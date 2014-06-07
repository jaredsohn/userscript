// ==UserScript==
// @name           HTML Help Central VBulletin Zero Replies Replier
// @namespace      http://www.htmlhelpcentral.com
// @description    Helps you to reply to a zero replies thread
//
// @include        *htmlhelpcentral.com/messageboard/showthread.php*
// ==/UserScript==

var message = "This post is just to remove this thread from the [URL=http://htmlhelpcentral.com/messageboard/search.php?do=process&replyless=1&replylimit=0]zero replies list[/url]. This post can be ignored.";

var postCount = document.getElementById('posts').children.length;
var textarea = document.getElementById('vB_Editor_QR_textarea');
var form = document.getElementById('qrform');

if(postCount <= 2) {
	textarea.value = message;
	form.submit();
}