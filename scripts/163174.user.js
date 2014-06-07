// ==UserScript==
// @name                Niconico Wiki script for Niconico Video:Q
// @namespace           http://niconicowiki.ckwng.com/
// @description	        Add wiki link after nicopedia link on Niconico Video. Report bugs to @ckwng
// @include             http://www.nicovideo.jp/watch/*
// @downloadURL         https://userscripts.org/scripts/source/163174.user.js
// @updateURL           http://userscripts.org/scripts/source/163174.meta.js
// @version             2.0.0
// ==/UserScript==

function NormalizeMap(normalizationList) {
	this.addNormalizationFromArray(normalizationList);
}
NormalizeMap.prototype.addNormalizationFromArray = function(array) {
	if (typeof array != 'undefined') {
		for (var i = 0; i < array.length; i++) {
			this.addNormalization(array[i]);
		}
	}
}
NormalizeMap.prototype.addNormalization = function(normalization) {
	this[normalization.from] = normalization.to;
}
NormalizeMap.prototype.lookUpNormalization = function(value) {
	if (this.hasOwnProperty(value)) {
		return this[value];
	} else {
		return value;
	}
}

function NicoNicoWikiApiQueryRequestListener(calls, eventListener) {
	this.method = 'GET'; 
	this.url = "http://niconicowiki.ckwng.com/w/api.php?action=query&format=json&titles=" + 
		calls.map(function (value) {
			return value.title;
		}).reduce(function (previousValue, currentValue, index, array) {
			return previousValue + "|" + currentValue;
		});
	this.calls = calls;
	this.eventListener = eventListener;
};
NicoNicoWikiApiQueryRequestListener.prototype.onload = function (results) {
	var queryResponse = JSON.parse(results.responseText).query;
	var normalizer = new NormalizeMap(queryResponse.normalized);
	var pages = {};
	for (var key in queryResponse.pages) {
		if (queryResponse.pages.hasOwnProperty(key)) {
			var pageTitle = queryResponse.pages[key].title;
			var pageExists = !(queryResponse.pages[key].hasOwnProperty("missing") || queryResponse.pages[key].hasOwnProperty("invalid"));
			pages[pageTitle] = pageExists;
		}
	}
	removeNicoNicoWikiEventListener(this.eventListener);
	this.calls.forEach(function (call) {
		if (pages[normalizer.lookUpNormalization(call.title)]) {
			call.enabler();
		}
	});
	addNicoNicoWikiEventListener(this.eventListener);
}

function NicoNicoWikiApiQueryCallback(title, elem, enabler) {
	this.title = title.replace("http://niconicowiki.ckwng.com/wiki/", "");
	this.elem = elem;
	this.enabler = enabler;
}

function addNicoNicoWikiEventListener(type) {
	listenerParameters = nicoNicoWikiListeners[type];
	listenerParameters[0].addEventListener(listenerParameters[1], listenerParameters[2], listenerParameters[3]);
}

function removeNicoNicoWikiEventListener(type) {
	listenerParameters = nicoNicoWikiListeners[type];
	listenerParameters[0].removeEventListener(listenerParameters[1], listenerParameters[2], listenerParameters[3]);
}

function fireNicoNicoWikiEventListener(type) {
	listenerParameters = nicoNicoWikiListeners[type];
	listenerParameters[2]();
}

//---Douga specific----------------------------------------------------------------------------------

function addVideoEnDicLink () {
	var enDicIcons = videoInformation.getElementsByClassName("enDicIcon");
	var enDicIconSpan = null;
	var enDicIconLink = null;
	var enDicSpan = null;
	removeNicoNicoWikiEventListener("video");
	if (enDicIcons.length == 0) {
		enDicIconSpan = videoDicIconSpan.cloneNode(true);
		enDicIconSpan.className = "dicIcon enDicIcon";
		enDicIconSpan.style.setProperty('border-left', '1px solid rgb(187, 187, 187)');
		enDicIconSpan.style.setProperty('padding-left', '8px');
		enDicIconSpan.style.setProperty('margin-left', '8px');
		enDicIconLink = enDicIconSpan.getElementsByTagName("a")[0];
		videoInformation.insertBefore(enDicIconSpan, videoDicIconSpan.nextSibling);
		enDicSpan = enDicIconLink.getElementsByClassName("dic")[0];
		enDicSpan.className = "dic enDic disable";
		enDicSpan.style.removeProperty('display');
		enDicSpan.innerHTML = "Wiki";
		enDicIconLink.href = enDicIconLink.href.replace("http://dic.nicovideo.jp/v/", "http://niconicowiki.ckwng.com/wiki/");
	} else {
		enDicIconSpan = enDicIcons[0];
		enDicIconLink = enDicIconSpan.getElementsByTagName("a")[0];
		var newLink = videoDicIconSpan.getElementsByTagName("a")[0].href.replace("http://dic.nicovideo.jp/v/", "http://niconicowiki.ckwng.com/wiki/");
		if (enDicIconLink.href != newLink) {
			enDicIconLink.href = newLink;
			enDicSpan = enDicIconLink.getElementsByClassName("dic")[0];
			enDicSpan.className = "dic enDic disable";
		} else {
			addNicoNicoWikiEventListener("video");
			return false;
		}
	}
	addNicoNicoWikiEventListener("video");
	var wikiApiCall = new NicoNicoWikiApiQueryCallback(
		enDicIconLink.href, 
		enDicSpan,
		function () {
			this.elem.className = "dic enDic enable";
		});
	var listener = new NicoNicoWikiApiQueryRequestListener([wikiApiCall], "video");
	GM_xmlhttpRequest(listener);
}

function addEnDicLink () {
	var tagSnapResults = document.evaluate("//*[@class='tagControlContainer']",
		videoHeaderTagList, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//window.alert(tagSnapResults.snapshotLength);
	var wikiApiCalls = [];
	for (var i = tagSnapResults.snapshotLength - 1; i >= 0; i--) {

		var tagElem = tagSnapResults.snapshotItem(i);
		if (tagElem.getElementsByClassName("enDic").length == 0) {
			//add it
			var dicElem = tagElem.getElementsByClassName("dic")[0];
			var enDicElem = dicElem.cloneNode(true);
			enDicElem.className = "dic enDic";
			var enDicLinkElem = enDicElem.getElementsByTagName("a")[0];
			enDicLinkElem.href = dicElem.getElementsByTagName("a")[0].href.replace("http://dic.nicovideo.jp/a/", "http://niconicowiki.ckwng.com/wiki/");
			enDicLinkElem.getElementsByTagName("span")[0].className = "disable";
			tagElem.insertBefore(enDicElem, dicElem.nextSibling);
			wikiApiCalls.push(new NicoNicoWikiApiQueryCallback(
				enDicLinkElem.href,
				enDicElem,
				function () {
					this.elem.getElementsByTagName("span")[0].className = "enable";
				}));
		}
	}
	if (wikiApiCalls.length > 0) {
		var listener = new NicoNicoWikiApiQueryRequestListener(wikiApiCalls, "tag");
		GM_xmlhttpRequest(listener);
	}
}

function addVideoEnDicLinkTimeout () {
	setTimeout(addVideoEnDicLink, 0);	
}

function addEnDicLinkTimout () {
	setTimeout(addEnDicLink, 0);
}

var videoHeaderTagList = document.getElementById("videoHeaderTagList");
var videoDicIconSpan = document.getElementsByClassName("dicIcon");
videoDicIconSpan = videoDicIconSpan[0];
videoDicIconSpan.getElementsByClassName("dic")[0].innerHTML = "Nicopedia";
var videoInformation = videoDicIconSpan.parentNode;

var nicoNicoWikiListeners = {
	"video": [videoInformation, "DOMSubtreeModified", addVideoEnDicLinkTimeout, false],
	"tag": [videoHeaderTagList, "DOMSubtreeModified", addEnDicLinkTimout, false]
}

addNicoNicoWikiEventListener("video");
addNicoNicoWikiEventListener("tag");
fireNicoNicoWikiEventListener("video");
fireNicoNicoWikiEventListener("tag");