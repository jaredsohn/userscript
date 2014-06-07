// ==UserScript==
// @name           Unread Msgs
// @namespace      moo
// @include        http://*theateam.freeforums.org/index.php*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(".icon").each(function() {
	if($(this).css('background-image').indexOf('forum_unread') != -1) {
		$(this).css('background-image','url(http://codephox.com/images/hunterIcon.jpg');
	}
});
