// ==UserScript==
// @name                Niconico Wiki script for Niconico Live:Q
// @namespace           http://niconicowiki.ckwng.com/
// @description	        Add wiki link after nicopedia link on Niconico Live. Report bugs to @ckwng
// @include             http://live.nicovideo.jp/watch/lv*
// @downloadURL         https://userscripts.org/scripts/source/163258.user.js
// @updateURL           http://userscripts.org/scripts/source/163258.meta.js
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

//---Live specific----------------------------------------------------------------------------------

function addBroadcasterEnDicLink () {
	if (broadcasterTagSpan) {
		addEnDicLink(broadcasterTagSpan, "broadcaster");
	}
}

function addTagEnDicLink () {
	addEnDicLink(liveHeaderTagList, "tag");
}

function addEnDicLink (context, eventListener) {
	var dicSnapResults = document.evaluate("//img[@class='dic']",
		context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var wikiApiCalls = [];
	for (var i = dicSnapResults.snapshotLength - 1; i >= 0; i--) {

		var dicElem = dicSnapResults.snapshotItem(i);
		var dicLinkElem = dicElem.parentNode;
		var tagElem = dicLinkElem.parentNode;
		if (tagElem.getElementsByClassName("enDicLink").length == 0) {
			//add it
			var enDicLinkElem = dicLinkElem.cloneNode(true);
			enDicLinkElem.className = "enDicLink";
			enDicLinkElem.href = enDicLinkElem.href.replace(/http:\/\/dic.nicovideo.jp\/a\/|http:\/\/dic.nicovideo.jp\/l\//, "http://niconicowiki.ckwng.com/wiki/");
			var enDicElem = enDicLinkElem.getElementsByTagName("img")[0];
			enDicElem.src = "img/2012/watch/tag_icon003.png";
			tagElem.insertBefore(enDicLinkElem, dicLinkElem.nextSibling);
			var dest = enDicLinkElem.href;
			wikiApiCalls.push(new NicoNicoWikiApiQueryCallback(
				enDicLinkElem.href,
				enDicElem,
				function () {
					this.elem.src = "img/2012/watch/tag_icon002.png";					
				}));
		}
	}
	if (wikiApiCalls.length > 0) {
		var listener = new NicoNicoWikiApiQueryRequestListener(wikiApiCalls, eventListener);
		GM_xmlhttpRequest(listener);
	}
}

function addBroadcasterEnDicLinkTimeout () {
	setTimeout(addBroadcasterEnDicLink, 0);
}

function addTagEnDicLinkTimeout () {
	setTimeout(addTagEnDicLink, 0);
}

GM_addStyle("div#watch_player_top_box div div.livetag_box div.cover {height: auto !important;}");
    // margin: 0px 0px 7px 45px;
    // overflow: hidden;
    // padding-top: 3px;

var liveHeaderTagList = document.getElementById("livetags");
var broadcasterTagSpan = document.getElementsByClassName("name");
if (broadcasterTagSpan.length == 0) {
	broadcasterTagSpan = null;
} else {
	broadcasterTagSpan = broadcasterTagSpan[0];
}

var nicoNicoWikiListeners = {
	"broadcaster": [broadcasterTagSpan, "DOMSubtreeModified", addBroadcasterEnDicLinkTimeout, false],
	"tag": [liveHeaderTagList, "DOMSubtreeModified", addTagEnDicLinkTimeout, false]
};

if (broadcasterTagSpan) {
	addNicoNicoWikiEventListener("broadcaster");
	fireNicoNicoWikiEventListener("broadcaster");
}
addNicoNicoWikiEventListener("tag");
fireNicoNicoWikiEventListener("tag");