// Title:	ForumExtender
// Version: 	0.1b (beta version)
// Date:	05-February-2009
// Author:	Diado
// URL:	http://diado.deviantart.com/
// Note:	This is a beta version of ForumExtender, so please report any bugs or feature requests to Diado at the above URL.
// Disclaimer:	This script is provided 'as is', without any warranty or guarantee of any kind.
//
// ==UserScript==
// @name          ForumExtender v0.1b
// @namespace     ForumExtender
// @description   Enhances the functionality of the deviantART forum pages
// @include       http://forum.deviantart.com/*
// ==/UserScript==

var tableRows, i, trRow, lastPageLink, tdReplies, noReplies, offset, threadLink, spaceNode, newLink, navDiv, firstLink, lastLink, navDivs, navSpan, pageURL, pageStub;
var threadLinkTag, lastOffset, newNavDiv, divComments, divCommentsParent;
GM_log('ForumExtender initialisation commencing...');
pageURL = document.location.href;
if (pageURL != 'http://forum.deviantart.com/') {
	if (isThread() == false && isForumDescriptionPage() == false) {
		GM_log('Processing listing page...');
		tableRows = document.evaluate("//table[@class='forum f full']/tbody/tr",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if (tableRows.snapshotLength > 0) {
			GM_addStyle('a.ForumExtender_Link:link {font-size:11px;color:#196ba7 !important;text-decoration:underline;}');
			GM_addStyle('a.ForumExtender_Link:visited {font-size:11px;color:#196ba7 !important;text-decoration:underline;}');
			GM_addStyle('a.ForumExtender_Link:hover {font-size:11px;color:#ffffff;text-decoration:underline;}');
			for (i = 0; i < tableRows.snapshotLength; i++) {
				trRow = tableRows.snapshotItem(i);
				if (trRow.childNodes.length > 3) {
					if (trRow.childNodes[1].tagName != 'TH') {
						tdReplies = trRow.childNodes[7]
						noReplies = parseInt(tdReplies.innerHTML.replace(/^\s+|\s+$/g, '').replace(/\,/g, ''));
						offset = parseInt(noReplies / 25) * 25;
						if (offset == noReplies && offset > 0) {
							offset -= 25;
						}
						threadLinkTag = trRow.childNodes[3].childNodes[1];
						threadLink = threadLinkTag.getAttribute('href');
						newLink = threadLink;
						if (threadLink.search(/\?/) > -1) {
							threadLink += '&';
						} else {
							threadLink += '?';
						}
						threadLink += 'fx_lastOffset=' + offset;
						threadLinkTag.setAttribute('href', threadLink);
						if (offset > 0) {
							newLink += '?offset=' + offset + '&fx_lastOffset=' + offset;
						} else {
							newLink += '?fx_lastOffset=' + offset;
						}
						
						lastPageLink = document.createElement('a');
						lastPageLink.setAttribute('href', newLink);
						lastPageLink.setAttribute('class', 'ForumExtender_Link');
						lastPageLink.innerHTML = '[last]';
						trRow.childNodes[3].insertBefore(lastPageLink, trRow.childNodes[3].childNodes[1].nextSibling);
						spaceNode = document.createTextNode('  ');
						trRow.childNodes[3].insertBefore(spaceNode, lastPageLink);
					}
				}
			}
		}
	} else {
		if (isThread() == true)  {
			GM_log('Processing thread page...');
			lastOffset = querySt('fx_lastOffset');
			if (lastOffset.length == 0) {
				lastOffset = 0;
			} else {
				lastOffset = parseInt(lastOffset);
			}
			offset = querySt('offset');
			if (offset.length == 0) {
				offset = 0;
			} else {
				offset = parseInt(offset);
			}
			navDivs = document.evaluate("//div[@class='alink nav nav-big' or @class='alink nav']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			if (navDivs.snapshotLength > 0) {
				navDiv = navDivs.snapshotItem(0);
				navSpan = navDiv.childNodes[0].childNodes[0];
				navSpan.innerHTML = navSpan.innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', '');
				pageStub = pageURL.slice(0, pageURL.lastIndexOf('/') + 1);
				if (offset > 0) {
					firstLink = document.createElement('a');
					firstLink.setAttribute('href', pageStub + '?fx_lastOffset=' + lastOffset);
					firstLink.innerHTML = 'First Page';
				} else {
					firstLink = document.createElement('del');
					firstLink.innerHTML = 'First Page';
				}
				navSpan.insertBefore(firstLink, navSpan.childNodes[0]);
				if (lastOffset > 0) {
					if (lastOffset == offset) {
						lastLink = document.createElement('del');
						lastLink.innerHTML = 'Last Page';
					} else {
						lastLink = document.createElement('a');
						lastLink.setAttribute('href', pageStub + '?offset=' + lastOffset + '&fx_lastOffset=' + lastOffset);
						lastLink.innerHTML = 'Last Page';
					}
				} else {
					lastLink = document.createElement('del');
					lastLink.innerHTML = 'Last Page';
				}
				navSpan.appendChild(lastLink);
				newNavDiv = navDiv.cloneNode(true);
				divComments = document.getElementById('comments');
				divCommentsParent = divComments.parentNode;
				divComments.insertBefore(newNavDiv, divComments.childNodes[0]);
			}
		} else {
			GM_log('No processing performed - not a forum thread listing or thread page');
		}
	}
}
GM_log('ForumExtender initialisation successful');

function isThread() {
	var pageURL = document.location.href;
	if (pageURL.indexOf('offset=') > -1 || pageURL.indexOf('fx_lastOffset=') > -1) {
		return true;
	}
	if (isNaN(pageURL.charAt(pageURL.length - 2)) == false) {
		return true;
	}
	return false;
}
function isForumDescriptionPage() {
	var pageURL = document.location.href;
	var matches = pageURL.match(/\//g);
	var count = matches.length;
	if (count == 4) {
		return true;
	} else {
		return false;
	}
}
function querySt(requestedKey) {
	var qs, values, key, i;
	qs = window.location.search.substring(1);
	values = qs.split("&");
	for (i = 0; i < values.length; i++) {
		key = values[i].split("=");
		if (key[0] == requestedKey) {
			return key[1];
		}
	}
	return '';
}
