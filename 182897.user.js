// ==UserScript==
// @name Radio Paradise User Mute
// @description Hides song comments by username on Radio Paradise.
// @version 1.3
// @include http://www.radioparadise.com/rp2-content.php?*=songinfo*
// @downloadURL https://dietrich.cx/dev/greasemonkey/rpUserMute.user.js
// @updateURL https://dietrich.cx/dev/greasemonkey/rpUserMute.meta.js
// @namespace cx.dietrich.greasemonkey
// @grant none
// @require https://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var muted = {};
var commentsDiv = undefined;

var loadMuted = function () {
	var json = undefined;
	if (window.localStorage) {
		json = window.localStorage.getItem('rpUserMute.muted');
		if (json) {
			muted = JSON.parse(json);
		}
	}
};

var storeMuted = function () {
	var json = undefined;
	if (window.localStorage) {
		json = JSON.stringify(muted);
		window.localStorage.setItem('rpUserMute.muted', json);
	}
};

var decorateUsernames = function () {
	var tables = commentsDiv.find('> table').not('[data-rpusermute="true"]');
	tables.each(function () {
		var table = $(this);
		getComments(table).each(function () {
			var element = $(this).children('td').first().find('a').first();
			var username = element.text().trim();
			decorateUsername(element, username);
		});
		table.attr('data-rpusermute', 'true');
	});
};

var decorateUsername = function (element, username) {
	$('<img/>')
		.attr('src', 'https://dietrich.cx/dev/greasemonkey/rpUserMute.mute.png')
		.attr('title', 'Mute ' + username)
		.css('vertical-align', 'middle')
		.click(function () { mute(username); })
		.insertAfter(element);
	element.css('vertical-align', 'middle').after('&nbsp;');
};

var mute = function (username) {
	var confirmed = window.confirm('Would you like to mute ' + username + '?');
	if (confirmed) {
		muted[username] = true;
		storeMuted();
		filterComments();
	}
};

var filterComments = function () {
	getComments().filter(usernameFilter).hide();
};

var usernameFilter = function () {
	var commentRow = $(this);
	var filtered = false;

	// Posting user
	var element = commentRow.children('td').first().find('a').first();
	var username = element.text().trim();
	if (muted[username]) {
		return true;
	}

	// Quoted users
	commentRow
		.children('td')
		.eq(1)
		.find('strong:contains(" wrote:"),b:contains(" wrote:")')
		.each(function () {
			var username = $(this).text().replace(' wrote:', '').trim();
			if (muted[username]) {
				filtered = true;
				return false;
			}
		});

	return filtered;
};

var getComments = function (table) {
	if (table) {
		return table.find('> tbody > tr');
	} else {
		return commentsDiv.find('> table > tbody > tr');
	}
}

var addUnmute = function () {
	$('<img/>')
		.attr('src', 'https://dietrich.cx/dev/greasemonkey/rpUserMute.unmute.png')
		.attr('title', 'Unmute all users')
		.css('float', 'left')
		.click(function () { unmute(); })
		.prependTo($('#mojo'));
};

var unmute = function () {
	var confirmed = window.confirm('Would you like to unmute all users?');
	if (confirmed) {
		muted = {};
		storeMuted();
		getComments().show();
	}
};

var onAddComments = function () {
	commentsDiv.off('DOMNodeInserted', onAddComments);
	decorateUsernames();
	filterComments();
	commentsDiv.on('DOMNodeInserted', onAddComments);
};

var setup = function () {
	commentsDiv = $('div#maincontent-1');
	loadMuted();
	addUnmute();
	decorateUsernames();
	filterComments();
	commentsDiv.on('DOMNodeInserted', onAddComments);
};

setup();
