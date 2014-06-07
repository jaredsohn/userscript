// ==UserScript==
// @name           Nico Live Link Maker
// @namespace      http://userscripts.org/users/121129
// @description    ニコニコ生放送のコミュニティリンク(co9999)の隣に放送ページへのリンクを追加
// @include        http://live.nicovideo.jp/watch/*
// @include        http://com.nicovideo.jp/community/*
// @version        2
// @grant          none
// ==/UserScript==

;(function() {
'use strict';

var LIVE_LINK_TEXT = "(コミュニティIDから放送ページを開く)";

function newLink(href, textContent, blankTarget) {
	var result = document.createElement("a");
	if (blankTarget)
		result.target = "_blank";
	result.href = href;
	result.textContent = textContent;
	return result;		
}

function newLiveLink(communityId, textContent, blankTarget) {
	return newLink(
			"http://live.nicovideo.jp/watch/" + communityId,
			textContent,
			blankTarget);
}

function getCommunityIdInURL(url) {
	var r = /^http:\/\/com\.nicovideo\.jp\/community\/(co\d+)$/.exec(url);
	return r ? r[1] : null;
}

function toArray(arraylike) {
	var result = [];
	for (var i = 0; i < arraylike.length; i++)
		result.push(arraylike[i]);
	return result;
}

function makeLiveLinks(element) {
	if (!element)
		return;
	toArray(element.getElementsByTagName("a")).forEach(function(a) {
		var id = getCommunityIdInURL(a.href);
		if (id)
			a.parentNode.insertBefore(newLiveLink(id, "[LIVE]", true), a.nextSibling);
	});
}

function makeLiveLinksAndLinkify(element) {
	makeLiveLinks(element);
	linkifyURL(element);
}

function collectTextNodesExceptInAnchor(element, collected) {
	if (!element || element.tagName === "A")
		return;
	toArray(element.childNodes).forEach(function(c) {
		if (c.nodeType === 3) // TEXT_NODE
			collected.push(c);
		else if (c.nodeType === 1) // ELEMENT_NODE
			collectTextNodesExceptInAnchor(c, collected);
	});
}

function newLinkifiedDocumentFragment(text, regExp, newLinkByRegExpResult) {
	var regExpResult;
	var lastIndex = 0;
	var df = document.createDocumentFragment();
	while ((regExpResult = regExp.exec(text)) !== null) {
		df.appendChild(document.createTextNode(
				text.substring(lastIndex, regExpResult.index)));
		lastIndex = regExp.lastIndex;

		df.appendChild(newLinkByRegExpResult(regExpResult));
	}
	if (lastIndex === 0)
		return null;
	df.appendChild(document.createTextNode(text.substring(lastIndex)));
	return df;
}

function linkifyURL(element) {
	var textNodes = [];
	collectTextNodesExceptInAnchor(element, textNodes);
	
	var newLinkByRegExpResult = function(regExpResult) {
		return newLink(regExpResult[0], regExpResult[0], true);
	};
	textNodes.forEach(function(textNode) {
		var df = newLinkifiedDocumentFragment(
				textNode.nodeValue,
				/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g,
				newLinkByRegExpResult);
		if (df !== null)
			textNode.parentNode.replaceChild(df, textNode);
	});
}

function isLiveWatchPage() {
	return location.href.indexOf("http://live.nicovideo.jp/watch/") === 0;
}

function isHarajukuLivePage() {
	return isLiveWatchPage() && getLiveDescriptionElement();
}

function getLiveDescriptionElement() {
	return document.getElementById("stream_description");
}

function isLivePageByLiveId() {
	return location.href.indexOf("http://live.nicovideo.jp/watch/lv") === 0;
}

function getCommunityIdByDescendentAnchor(parent) {
	if (!parent)
		return null;
	var nl = parent.getElementsByTagName("a");
	for (var i = 0; i < nl.length; i++) {
		var a = nl.item(i);
		var id = getCommunityIdInURL(a.href);
		if (id)
			return id;
	}
	return null;
}

function processForLivePage() {
	var made = [];
	
	makeLiveLinksAndLinkifyAndSave(getLiveDescriptionElement());
	observeDescriptionElementReplacement();

	if (isLivePageByLiveId() && getDateSpanInTitlebar() && getCommunityId())
		getDateSpanInTitlebar().appendChild(
				newLiveLink(getCommunityId(), LIVE_LINK_TEXT));

	function observeDescriptionElementReplacement() {
		var mainContents = document.getElementById("mainContents");
		if (!mainContents) {
			mainContents = document.getElementById("mainContents_of");
			if (!mainContents)
				return;
		}
		mainContents.addEventListener("DOMNodeInserted", function(evt) {
			if (evt.target.id !== "stream_description")
				return;
			if (hasBeenMade(evt.target))
				return;
			makeLiveLinksAndLinkifyAndSave(evt.target);
		}, false);
	}

	function getDateSpanInTitlebar() {
		return document.querySelector("#titlebar span.date");
	}

	function getCommunityId() {
		return getCommunityIdByDescendentAnchor(document.getElementById("com"));
	}
	
	function hasBeenMade(element) {
		return made.some(function(e) { return e === element; });
	}

	function makeLiveLinksAndLinkifyAndSave(element) {
		makeLiveLinksAndLinkify(element);
		made.push(element);
	}
}

function isCommunityPage() {
	return location.href.indexOf("http://com.nicovideo.jp/community/") === 0;
}

function processForCommunityPage() {
	addLiveLinkOpenByCommunityId();
	makeLiveLinksAndLinkify(document.getElementById("profile"));
	makeLiveLinksAndLinkify(document.getElementById("news"));

	function addLiveLinkOpenByCommunityId() {
		if (!nowOnAir())
			return;
		var communityID = location.href.substr(location.href.lastIndexOf("/") + 1);
		var liveLink = newLiveLink(communityID, LIVE_LINK_TEXT);
		var a = getCommunityAnchor();
		if (!a)
			return;
		var h2 = a.parentNode;
		h2.parentNode.insertBefore(liveLink, h2.nextSibling);
	}

	function nowOnAir() {
		return document.getElementById("now_live") ? true : false;
	}

	function getCommunityAnchor() {
		return document.querySelector("#now_live a.community");
	}
}

function getClosedLiveDescriptionElement() {
	return document.getElementById("bn_gbox")
			.parentNode.querySelector("div.stream_description");
}

function isClosedLivePage() {
	return isLiveWatchPage() && getClosedLiveDescriptionElement();
}

function processForClosedLivePage() {
	makeLiveLinksAndLinkify(getClosedLiveDescriptionElement());
	if (isLivePageByLiveId() && getCommunityId() && getTitleH2Element()) {
		var link = newLiveLink(getCommunityId(), LIVE_LINK_TEXT);
		link.style.color = "white";
		getTitleH2Element().appendChild(link);
	}

	function getCommunityId() {
		var comDiv = document.getElementById("bn_gbox")
				.parentNode.querySelector("div.com");
		return getCommunityIdByDescendentAnchor(comDiv);
	}

	function getTitleH2Element() {
		return document.querySelector("#gate > div.infobox > h2");
	}
}

function isGinzaLivePage() {
	return isLiveWatchPage() && getViewDiv();
}

function getViewDiv() {
	return document.querySelector('#watch_tab_box div.view');
}

function processForGinzaLivePage() {
	linkifyCommunityID();
	makeLiveLinksAndLinkify(getViewDiv());

	function linkifyCommunityID() {
		var textNodes = [];
		var newLinkByRegExpResult = function(regExpResult) {
			return newLink(
					"http://com.nicovideo.jp/community/" + regExpResult[0],
					regExpResult[0],
					true);
		};
		
		collectTextNodesExceptInAnchor(getViewDiv(), textNodes);
		textNodes.forEach(function(textNode) {
			var df = newLinkifiedDocumentFragment(
					textNode.nodeValue,
					/co[0-9]+/g,
					newLinkByRegExpResult);
			if (df != null)
				textNode.parentNode.replaceChild(df, textNode);
		});
	}
}

if (isHarajukuLivePage()) {
	processForLivePage();
} else if (isGinzaLivePage()) {
	processForGinzaLivePage();
} else if (isClosedLivePage()) {
	processForClosedLivePage();
} else if (isCommunityPage()) {
	processForCommunityPage();
}

})();
