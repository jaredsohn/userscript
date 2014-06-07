// ==UserScript==
// @name          Google Reader Share
// @namespace     http://www.sonhuynh.com
// @description   Replicates the old Share functionality of Google Reader.
// @include       http://www.google.com/reader/view/*
// @version       0.1
// ==/UserScript==

var grs_ShareLinkId = 'googleReaderShare';
var grs_SharedItemsLinkId = 'shared-selector';

var grs_CurrentItem;
var grs_IsCurrentItemShared;

document.addEventListener('DOMContentLoaded', grs_Init(), false);

window.addEventListener('hashchange', grs_HashChanged, false);

function grs_Init() {
	grs_AddSharedItemsLink();
	
	grs_EntriesAddEventListener();
	
	var entries = document.getElementById('entries');
	entries.addEventListener('DOMNodeInserted', grs_EntriesAddEventListener, false);
}

function grs_AddSharedItemsLink() {
	var sharedItems = document.createElement('div');
	sharedItems.id = grs_SharedItemsLinkId;
	sharedItems.className = 'selector';
	
	var icon = grs_CreateShareIconElement();
	icon.style.marginRight = '5px';
	
	var sharedItemsLink = document.createElement('a');
	sharedItemsLink.className = 'link';
	sharedItemsLink.innerHTML = '<span class="text">Shared items</span>';
	sharedItemsLink.addEventListener('click', function() { location.hash = '#stream/user/-/state/com.google/broadcast'; }, false);
	sharedItemsLink.insertBefore(icon, sharedItemsLink.firstChild);
	
	sharedItems.appendChild(sharedItemsLink);
	
	var trends = document.getElementById('trends-selector');
	trends.parentNode.insertBefore(sharedItems, trends);
}

function grs_HashChanged() {
	grs_GoogleReaderEntries = null;

	grs_UpdateSharedItemsLink();
}

function grs_UpdateSharedItemsLink() {
	var sharedItems = document.getElementById(grs_SharedItemsLinkId);
	
	var regex = new RegExp('#stream/user/[0-9]+/state/com.google/broadcast', 'i');
	
	if (unescape(location.hash).match(regex)) {
		sharedItems.className = 'selector selected';
	}
	else {
		sharedItems.className = 'selector';
	}
}

function grs_EntriesAddEventListener() {
	var entries = document.getElementById('entries');

	for (var i = 0; i < entries.childNodes.length; i++) {
		var entry = entries.childNodes[i];
		entry.addEventListener('DOMNodeInserted', grs_AddShareLink, false);
	}
}

function grs_AddShareLink(event) {
	if (event.target.className == 'entry-actions') {
		var actions = event.target;
		
		var entry = actions.parentNode;
		
		grs_CurrentItem = grs_GetGoogleReaderItem(entry);
		grs_IsCurrentItemShared = grs_IsGoogleReaderItemShared(grs_CurrentItem);
	
		var share = document.createElement('span');
		share.id = grs_ShareLinkId;
		share.className = 'link unselectable';
		share.style.marginRight = '16px';
		share.addEventListener('click', grs_ShareClick, false);
		
		grs_UpdateShareLink(share);
		
		actions.insertBefore(share, actions.firstChild);
	}
}

function grs_ShareClick(event) {
	var token = grs_GetGoogleReaderToken();
	
	if (token) {
		var a = grs_IsCurrentItemShared ? 'r' : 'a';
		var s = 'user/-/state/com.google/broadcast';
		
		var request = new XMLHttpRequest();
		request.open('POST', 'http://www.google.com/reader/api/0/edit-tag', false);
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		request.setRequestHeader('Authorization', 'GoogleLogin auth=' + grs_GetGoogleClientLoginAuth());
		request.send('i=' + grs_CurrentItem.id + '&' + a + '=' + s + '&T=' + token);
		
		if (request.status == 200) {
			grs_IsCurrentItemShared = !grs_IsCurrentItemShared;
			
			if (grs_IsCurrentItemShared) {
				grs_CurrentItem.categories.push('user/1/state/com.google/broadcast');
			}
			else {
				grs_CurrentItem.categories.splice(grs_GetBroadcastIndex(grs_CurrentItem), 1);
			}
			
			grs_UpdateShareLink(document.getElementById(grs_ShareLinkId));
		}
	}
}

var grs_GoogleReaderToken;

function grs_GetGoogleReaderToken() {
	if (!grs_GoogleReaderToken) {
		var request = new XMLHttpRequest();
		request.open('GET', 'http://www.google.com/reader/api/0/token', false);
		request.send();
		
		if (request.status == 200)
			grs_GoogleReaderToken = request.responseText;
	}
		
	return grs_GoogleReaderToken;
}

var grs_GoogleClientLoginAuth;

function grs_GetGoogleClientLoginAuth() {
	if (!grs_GoogleClientLoginAuth) {
		var cookies = document.cookie.split(';');
		
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			
			var name = cookie.substr(0, cookie.indexOf('=')).replace(/^\s+|\s+$/g, '');
			var value = cookie.substr(cookie.indexOf('=') + 1);
			
			if (name == 'APISID') {
				grs_GoogleClientLoginAuth = value;
				break;
			}
		}
	}
	
	return grs_GoogleClientLoginAuth;
}

function grs_GetGoogleReaderItem(entry) {
	if (entry) {
		var entries = grs_GetGoogleReaderEntries();
		
		if (entries) {
			for (var i = 0; i < entries.length; i++) {
				var item = entries[i];
			
				var itemHref = item.alternate[0].href;
				var entryHref = entry.childNodes[0].getElementsByTagName('a')[0].href;
				
				if (itemHref == entryHref)
					return item;
			}
		}
	}
	
	return null;
}

var grs_GoogleReaderEntries;

function grs_GetGoogleReaderEntries() {
	if (!grs_GoogleReaderEntries) {
		var parts = location.href.split('/');
		
		var url = 'http://www.google.com/reader/api/0/stream/contents/';
		var stream = parts[parts.length - 1];
		var params = 'n=200&likes=false&comments=false';
		
		var request = new XMLHttpRequest();
		request.open('GET', url + stream + '?' + params, false);
		request.send();
		
		if (request.status == 200) {
			var response = eval('(' + request.responseText + ')');
			grs_GoogleReaderEntries = response.items;
		}
	}
	
	return grs_GoogleReaderEntries;
}

function grs_GetBroadcastIndex(item) {
	if (item) {
		for (var i = 0; i < item.categories.length; i++) {
			var regex = new RegExp('user/[0-9]+/state/com.google/broadcast', 'i');
			
			if (item.categories[i].match(regex))
				return i;
		}
	}
	
	return null;
}

function grs_IsGoogleReaderItemShared(item) {
	if (grs_GetBroadcastIndex(item) != null)
		return true;
		
	return false;
}

function grs_CreateShareIconElement() {
		var icon = document.createElement('div');
		icon.style.background = 'url("/reader/ui/3660573864-lhn-sprite.png") no-repeat -81px 2px';
		icon.style.cssFloat = 'left';
		icon.style.height = '16px';
		icon.style.paddingRight = '16px';
		return icon;
}

function grs_UpdateShareLink(share) {
	share.innerHTML = !grs_IsCurrentItemShared ? 'Share' : 'Unshare';
	
	var icon = grs_CreateShareIconElement();

	if (!grs_IsCurrentItemShared) {
		icon.style.background = 'url("/reader/ui/3660573864-lhn-sprite.png") no-repeat -32px 2px';
		icon.style.marginRight = '1px';
	}
	
	share.insertBefore(icon, share.firstChild);
}