// ==UserScript==
// @name        Reddit hide user comment
// @namespace   Reddit hide user comment
// @description Reddit hide user comment
// @include     *.reddit.com/r/*
// @require       http://code.jquery.com/jquery.min.js
// @version     1
// ==/UserScript==

document.onload = hideBlockedUsers();

$(function() {
	$('a.rhuc_blockLink').click(function() {
		var user = $(this).parent().find('a.author')[0].innerHTML;
		if(checkUser(user)==false) {
			GM_setValue(GM_listValues().length, user);
			$(this).parent().parent().parent().parent().fadeOut(1000);
		}
	});
});

function hideBlockedUsers() {
	var parentComments = $('.sitetable.nestedlisting>.comment');
	for (var i=0; i<parentComments.length; i++) {
		var author = $(parentComments[i]).find('div.noncollapsed a.author').first();
		if(checkUser(author[0].innerHTML)) {
			$(parentComments[i]).css('display', 'none');
		} else {
			$(author).parent().append(" <a class='rhuc_blockLink' href='javascript:void(0)'> block</a>");
		}
	}	
}

function checkUser(user) {
	var found = false;
	for (var i=0; i<GM_listValues().length; i++) {
		if (user==GM_getValue(i)) {
			found = true;
			break;
		}
	}
	return found;
}