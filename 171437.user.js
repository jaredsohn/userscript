// ==UserScript==
// @name        Bugzilla - Github - Mozilla Gaia Linker
// @namespace   http://userscripts.org/users/delapouite
// @description Create links from Github issues to their corresponding Bugzilla entries for the Mozilla Gaia project
// @include     https://github.com/mozilla-b2g/gaia/*
// @version     1
// ==/UserScript==

var re = /^\[?bug (\d*)\]? (.*)/i;
var endPoint = 'https://bugzilla.mozilla.org/show_bug.cgi?id=';

// Issue page
var discussionTitle = document.getElementsByClassName('discussion-topic-title');
if (discussionTitle.length !== 0) {
	discussionTitle = discussionTitle[0];
	var matches = discussionTitle.textContent.trim().match(re);
	if (matches && matches[1]) {
		// create link
		discussionTitle.innerHTML = '<a href="' + endPoint + matches[1] + '">Bug ' + matches[1] + '</a>';
		discussionTitle.innerHTML += ' ' + matches[2];
	}
}

function splitLink(link) {
	var matches = link.textContent.trim().match(re);
	if (!matches || !matches[1]) {
		return;
	}
	// append bugzilla link
	var bugzillaLink = document.createElement('a');
	bugzillaLink.href = endPoint + matches[1];
	bugzillaLink.textContent = 'Bug ' + matches[1];
	bugzillaLink.style.cssFloat = 'left';
	bugzillaLink.style.color = '#4183c4';
	bugzillaLink.style.marginRight = '6px';
	link.parentNode.insertBefore(bugzillaLink, link);

	// shorten the original link
	link.textContent = matches[2];
}

// Notifications page
var notifications = document.querySelectorAll('.js-notification h4');
if (notifications.length !== 0) {
	Array.prototype.forEach.call(notifications, function (notification) {
		// move icons out of the way
		var icon = notification.getElementsByClassName('type-icon')[0];
		var link = notification.getElementsByTagName('a')[0];
		var clonedIcon = icon.cloneNode();
		clonedIcon.style.cssFloat = 'left';
		notification.insertBefore(clonedIcon, link);
		icon.remove();

		splitLink(link);
	});
}

// Issues page
var issues = document.querySelectorAll('.issue-list-item h4');
if (issues.length !== 0) {
	Array.prototype.forEach.call(issues, function (issue) {
		splitLink(issue.getElementsByTagName('a')[0]);
	});
}