// ==UserScript==
// @name           MySpace - Add Friend
// @namespace      http://profile.myspace.com/add_friend
// @description    Automatically post to the add friend form
// @include        *.myspace.com/*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

start_adding_friends = function() {
	GM_setValue('adding_friends', true)
}

stop_adding_friends = function() {
	GM_setValue('adding_friends', false)
}

add_friend = function() {
	link = document.getElementById('ctl00_Main_ctl00_UserContactLinks1_AddFriendLink')	
	window.location = link.href
}

submit_friendship = function() {
	if (document.getElementsByName('addFriend').length >= 1)
		document.getElementsByName('addFriend')[0].submit()
}

friend_status = function() {
	if (document.body.innerHTML.indexOf('This person is already your Friend') == -1)
		submit_friendship()
	else
		history.back()
}

return_to_profile = function() {
	if (getElementsByClass('blacktext8').length >= 1)
		history.go(-2)
}


register_helpers = function() {
	if (window.location.href.indexOf('collect.myspace') != -1)
		friend_status()

	if (window.location.href.indexOf('mail.myspace') != -1)
		return_to_profile()

	window.addEventListener('keydown', function(event) {
		if (event.keyCode == 65) // Letter 'a'
			add_friend()
	}, false)
}

if (GM_getValue('adding_friends')) {
	register_helpers()
}


GM_registerMenuCommand('start_adding_friends', start_adding_friends)
GM_registerMenuCommand('stop_adding_friends', stop_adding_friends)
GM_registerMenuCommand('add_friend', add_friend)

