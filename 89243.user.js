// Advanced blog.hu comment filter v1.0
//
// ==UserScript==
// @name           Advanced blog.hu comment filter
// @namespace      http://palacsint.hu/gmscripts
// @include        http://*.blog.hu/*
// ==/UserScript==
//
// Az egyes bejegyzések fejléce mellé (szerző, dátum) elhelyez egy Mute, illetve
// Unmute feliratú linket. A linkre történő kattintás után az adott felhasználó
// összes kommentje eltűnik (Mute), illetve megjelenik (Unmute).
//
// A némított felhasználók ID-ja a GM_setValue() hívással van tárolva,
// Firefox újraindítás után is megmaradnak a tiltások.
//
// palacsint, 2010. 10. 30.
// http://palacsint.hu/
//
// based on Blog.hu komment filter 1.1 by martonx

function getCurrentUrl() {
	var url = window.location.href;
	var hashIndex = url.indexOf("#")
	if (hashIndex > 0) {
		url = url.substr(0, hashIndex);
	}
	return url;
}

function refreshComments() {
	var allComments = document.evaluate('//div[@id="comment_container"]//div[@class="comment" or @class="comment owncomment"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allComments.snapshotLength; i++) {
		//GM_log('i: ' + i);
		var commentDiv = allComments.snapshotItem(i);
		var userId = getUserId(commentDiv);
		var userName = getUserName(commentDiv);
		//GM_log("userId: " + userId);
		var muted = isMuted(userId);
		//GM_log('isMuted: ' + userId + ', result: ' + muted + ', username: ' + userName);

		var commentAuthorSpan = getCommentAuthorSpan(commentDiv);
		var commentHeaderElement = commentAuthorSpan.parentNode;
		var href = getCurrentUrl() + '#' + commentDiv.id;
		//GM_log('CommentDiv.id: ' + href);

		if (muted) {
			hide(commentDiv, 'commentFooter');
			hide(commentDiv, 'commentText');
			//hideAvatar(commentDiv);
			addUnmuteLink(commentHeaderElement, userId, userName, href);
		} else {
			addMuteLink(commentHeaderElement, userId, userName, href);
			show(commentDiv, 'commentFooter');
			show(commentDiv, 'commentText');
			//showAvatar(commentDiv);
		}
	}
}

function show(commentDiv, hideClassName) {
	var toHideTags = getElementsByClassName(commentDiv, 'div', hideClassName);
	for (var i = 0; i < toHideTags.length; i++) {
		toHideTags[i].style.display = '';
	}
}

//TODO: összevonni a show() függvénnyel
function hide(commentDiv, hideClassName) {
	var toHideTags = getElementsByClassName(commentDiv, 'div', hideClassName);
	for (var i = 0; i < toHideTags.length; i++) {
		toHideTags[i].style.display = 'none';
	}
}

//TODO: valami lib nincs erre?
function getElementsByClassName(parent, tagName, className) {
	var elements = parent.getElementsByTagName(tagName);
	var results = [];
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		var class = element.getAttribute('class');
		if (class == className) {
			results.push(element);
		}
	}
	return results;
}

// Sajnos nem mindig működik jól, mert ha nincs avatar,
// akkor az első div mást tartalmaz.
//function hideAvatar(commentDiv) {
//	setFirstDivSubDivDisplayStyle(commentDiv, 'none');
//}
//
//function showAvatar(commentDiv) {
//	setFirstDivSubDivDisplayStyle(commentDiv, '');
//}
//
//function setFirstDivSubDivDisplayStyle(parent, display) {
//	var firstDiv = getFirstElementsByTagName(parent, 'div');
//	if (firstDiv == null) {
//		return;
//	}
//	var firstSubDiv = getFirstElementsByTagName(firstDiv, 'div');
//	if (firstSubDiv == null) {
//		return;
//	}
//	firstSubDiv.style.display = display;
//}

function getFirstElementsByTagName(parent, tagName) {
	var elements = parent.getElementsByTagName(tagName);
	if (elements.length == 0) {
		return null;
	}
	return elements[0];
}


function refreshPage() {
	removeMuteUnmuteLinks();
	refreshComments();
	refreshMutedUsersInfo();
}

function removeMuteUnmuteLinks() {
	var muteLinks = document.evaluate('//span[@class="mutelink"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < muteLinks.snapshotLength; i++) {
		var muteLink = muteLinks.snapshotItem(i);
		muteLink.parentNode.removeChild(muteLink);
	}
}

function addMuteLink(linkParent, userId, userName, href) {
	var link = createMuteUnmuteDiv('Mute', userId, userName, href, mute);
	linkParent.appendChild(link);
}

function addUnmuteLink(linkParent, userId, userName, href) {
	var link = createMuteUnmuteDiv('Unmute', userId, userName, href, unmute);
	linkParent.appendChild(link);
}

function createMuteUnmuteDiv(text, userId, userName, href, listener) {
	var link = document.createElement("span");
	link.setAttribute('class', 'mutelink');
	link.innerHTML = '<a href="' + href + '" class="' + userId + '">' + text + '</a>';
	// TODO: itt valami anonymous function jobb lenne, ami tárolná is magában
	// a tiltandó/engedélyezendő user ID-ját, hogy kattintáskor majd ne a class
	// attribútumból kelljen kiolvasni 
	link.addEventListener('click', listener, true);
	return link;
}

function mute(event) {
	var key = getKeyFromEvent(event);
	GM_setValue(key, true);
	refreshPage();
}

function unmute(event) {
	var key = getKeyFromEvent(event);
	GM_deleteValue(key);
	refreshPage();
}

function getKeyFromEvent(event) {
	var userId = event.target.getAttribute('class');
	var key = getKey(userId);
	return key;
}


function getUserNameFromEvent(event) {
	var userName = event.target.getAttribute('userName');
	return userName;
}

function getUserName(commentDiv) {
	var profileLinkA = getProfileATag(commentDiv);
	return profileLinkA.textContent;
}

function getProfileATag(commentDiv) {
	var commentAuthorSpan = getCommentAuthorSpan(commentDiv);
	
	var profileLinkA = commentAuthorSpan.getElementsByTagName('a')[0];
	return profileLinkA;
}

function getUserId(commentDiv) {
	var profileLinkA = getProfileATag(commentDiv);
	var profileUrl = profileLinkA.getAttribute('href');

	var linktomb = profileUrl.split("/");
	var hossz = linktomb.length;
	var userID = linktomb[hossz-1];
	return userID;
}

function getCommentAuthorSpan(commentDiv) {
	var commentTimeSpans = commentDiv.getElementsByTagName('span');
	for (var i = 0; i < commentTimeSpans.length; i++) {
		var span = commentTimeSpans[i];
		var classAttr = span.getAttribute('class');
		if (classAttr = 'commentAuthor') {
			return span;
		}
	}
	return;
}

function getKey(userId) {
	return 'muted_' + userId;
}

function getUserIdFromKey(key) {
	return key.replace(/muted_/g, '');
}

function isMuted(userId) {
	var key = getKey(userId)
	var muted = GM_getValue(key);
	if (muted != null) {
		return true;
	} else {
		return false;
	}
}

function writeMutedUsersInfoFooter() {
	var footer = document.getElementById('commentlist_header');
	if (footer == null) {
		return;
	}
	var mutedUsersInfoDiv = createMutedUsersInfoDiv();
	footer.parentNode.insertBefore(mutedUsersInfoDiv, footer.nextSibling);
}

function createMutedUsersInfoDiv() {
	var mutedUsersInfoDiv = document.createElement("div");
	mutedUsersInfoDiv.id = 'mutedusers';
	var html = "Muted user(s): ";

	var found = false;
	for each (var key in GM_listValues()) {
		var userId = getUserIdFromKey(key);
		html += userId + ' ';
		found = true;
	}
	if (!found) {
		html += "none";
	}
	mutedUsersInfoDiv.innerHTML = html;
	return mutedUsersInfoDiv;
}

function removeMutedUsersInfoDiv() {
	var mutedUsersDiv = document.getElementById('mutedusers');
	if (mutedUsersDiv == null) {
		return;
	}
	mutedUsersDiv.parentNode.removeChild(mutedUsersDiv);
}

function refreshMutedUsersInfo() {
	removeMutedUsersInfoDiv();
	writeMutedUsersInfoFooter();
}

refreshPage();

