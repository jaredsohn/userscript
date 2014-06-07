// ==UserScript==
// @id             unblockyoutube-bb1a4fd3-6164-4559-a0c8-a1dcd49647f7@scriptish
// @name           Unblock YouTube videos
// @version        1.21
// @author         voks
// @description    If a youtube video can't be played and an error message is shown, you can click on the error message to unblock the video. unblockyoutube.co.uk is used therefore. This site is working like a proxy in the United Kingdom. You can watch all videos which are not banned in the UK this way.
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @include        http://www.unblockyoutube.co.uk/
// @include        http://www.unblockyoutube.co.uk/search.php*
// @run-at         document-end
// ==/UserScript==

// storage.js from http://aktuell.de.selfhtml.org/artikel/javascript/wertuebergabe/storage.js
// framework to store data in window.name
var storage = new function () {
	/* --------- Private Properties --------- */

	var dataContainer = {};

	/* --------- Private Methods --------- */

	function linearize () {
		var string = "", name, value;
		for (name in dataContainer) {
			name = encodeURIComponent(name);
			value = encodeURIComponent(dataContainer[name]);
			string += name + "=" + value + "&";
		}
		if (string != "") {
			string = string.substring(0, string.length - 1);
		}
		return string;
	}

	function read () {
		if (window.name == '' || window.name.indexOf("=") == -1) {
			return;
		}
		var pairs = window.name.split("&");
		var pair, name, value;
		for (var i = 0; i < pairs.length; i++) {
			if (pairs[i] == "") {
				continue;
			}
			pair = pairs[i].split("=");
			name = decodeURIComponent(pair[0]);
			value = decodeURIComponent(pair[1]);
			dataContainer[name] = value;
		}
	}

	function write () {
		window.name = linearize();
	}

	/* --------- Public Methods --------- */

	this.set = function (name, value) {
		dataContainer[name] = value;
		write();
	};

	this.get = function (name) {
		var returnValue = dataContainer[name];
		return returnValue;
	};

	this.getAll = function () {
		return dataContainer;
	};

	this.remove = function (name) {
		if (typeof(dataContainer[name]) != undefined) {
			delete dataContainer[name];
		}
		write();
	};

	this.removeAll = function () {
		dataContainer = {};
		write();
	};

	/* --------- Construction --------- */

	read();
};


function unblockThis() {
	var proxyUrl = "http://www.unblockyoutube.co.uk/";
	var href = location.href;
	// replace embedded url with normal watch url
	if ((href.indexOf("/embed/") != -1) && (top != self)) {
		href = href.replace("/embed/", "/watch?v=");
		storage.set("unblockEmbedded", true);
	}
	storage.set("unblockUrl", href);
	location.href = proxyUrl;
}

function checkForVideoError() {
	var errorNode = getErrorNode();
	//alert(errorNode.innerHTML);
	//if ((errorNode != null) && errorNode.innerHTML.indexOf('GEMA') > -1) {
	if (errorNode != null) {
		// method 1: unblock by clicking error message
		// 1.1: onClick event
		errorNode.addEventListener("click", unblockThis, false);
		errorNode.addEventListener("onMouseOver", new function() { errorNode.style.cursor='pointer' } );
		// 1.2: <a> element //// TODO: doesn't work! //// not used as direct link because opening it in a new tab/window doesn't work
		//errorNode.innerHTML = '<a href="javascript:unblockThis();">' + errorNode.innerHTML + '</a>';
		// method 2: unblock the video directly
		//unblockThis();
	}
}

// on youtube?
if (window.location.host.match(/^(?:[^\.]+\.)?youtube\./i)) {
	var errorNode = getErrorNode();
	if (errorNode != null) {
		checkForVideoError();
		errorNode.addEventListener("DOMAttrModified", checkForVideoError, false);
	}
}
// on unblockyoutube.co.uk?
else {
	// already on result page
	if (location.href.indexOf("search.php") != -1) {
		// break out of frames, if video was embedded
		if (storage.get("unblockEmbedded") != undefined) {
			storage.remove("unblockEmbedded");
			top.location = location;
		}
	}
	// on start page
	else {
		var unblockUrl = storage.get("unblockUrl");
		//alert(unblockUrl);
		if (unblockUrl != undefined) {
			document.forms[0].elements[0].value = unblockUrl;
			storage.remove("unblockUrl");
			document.forms[0].submit();
		}
	}
}

function getErrorNode() {
	var errorNode = document.getElementById('playnav-custom-error-message');
	if (errorNode != null) {
		return errorNode;
	}
	errorNode = document.getElementById('unavailable-message');
	if (errorNode != null) {
		return errorNode;
	}
	/*
	// html5 embedded
	<div tabindex="-1" style="" class="html5-video-player el-embedded " id="video-player-html5">
		<div style="" class="video-fallback html5-stop-propagation">
			<div class="video-fallback-content">Dieses Video ist in Deutschland leider nicht verfügbar, da es möglicherweise Musik enthält, für die die erforderlichen Musikrechte von der GEMA nicht eingeräumt wurden.</div>
		<!-- ... -->
	*/
	errorNode = document.evaluate('//div[@class="video-fallback-content"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	return errorNode;
}