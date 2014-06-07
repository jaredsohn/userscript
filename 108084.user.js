// ==UserScript==
// @name           Wider Facebook
// @namespace      .
// @description    Align the width of Facebook on the window.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @exclude        http://apps.facebook.com/*
// @exclude        https://apps.facebook.com/*
// @version        1.3.6
// @changes        Fitted to Style upgrade by Facebook.
// ==/UserScript==

//Testing my own Update-Function now.

function checkUpdate(response) {
	if (response) {
		response = response.split("\n");
		var version = "1.4";
		for (var i = 0; i < response.length; i++) {
			if (response[i].substring(0, 11) == "// @version") {
				newVersion = response[i].substring(19);
			} else if (response[i].substring(0, 11) == "// @changes") {
				changes = response[i].substring(19);
			}
		}
		if (newer(version, newVersion) && confirm("Eine Neue Version von Wider Facebook ist verfügbar (" + version + "->" + newVersion + "). Änderungen: " + changes + "\nJetzt herunterladen?")) {
			self.location.href = "http://userscripts.org/scripts/source/108084.user.js";
		}
	} else {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/108084.meta.js",
			onload: function(response) { checkUpdate(response.responseText); }
		});
	}
}

function newer(version, newVersion) {
	version = version.split(".");
	newVersion = newVersion.split(".");
	for (var i = 0; true; i++) {
		if (version[i] && newVersion[i] && (parseInt(version[i]) < parseInt(newVersion[i]))) {
			return true;
		} else if (!newVersion[i]) {
			return false;
		} else if (!version[i]) {
			return true;
		}
	}
}

//Original Code

var style = document.createElement("style"),
	sidebarwidth = GM_getValue("fbwidth", 250),
	sidebarwidthold,
	sidebarpull = document.createElement("div"),
	sidebardrag = false,
	width,
	height;
window.addEventListener("load", firstStep, false);

function firstStep() {
	style.type = "text/css";
	document.getElementsByTagName("head")[0].appendChild(style);
	sidebarpull.className = "slide";
	sidebarpull.addEventListener("dbclick", sidebarSetback, false);
	sidebarpull.addEventListener("mousedown", sidebarDown, false);
	window.addEventListener("mousemove", sidebarDrag, false);
	window.addEventListener("mouseup", sidebarUp, false);
	if (!document.getElementById("pagelet_sidebar")) {
		window.setTimeout(function() { firstStep(); }, 1000);
		return;
	}
	document.getElementById("pagelet_sidebar").appendChild(sidebarpull);
	checkUpdate();
	nextStep();
}

function nextStep() {
	if (width != window.innerWidth || height != window.innerHeight || sidebarwidthold != sidebarwidth) {
		var html = "";
		if (window.innerWidth > 1000) {
			html += ".fbx #globalContainer { position: absolute ! important; left: 615px ! important; width: " + (window.innerWidth - sidebarwidth - 45) + "px ! important; } \n"; //Hauptteil nach links verschieben und verbreitern
			html += ".slide { position: fixed ! important; right: " + sidebarwidth + "px ! important; width: 5px ! important; height: 100% ! important; background-color: #4B67A1 ! important; opacity: 0.2; z-index: 100 ! important; cursor: e-resize ! important; } \n";
			html += ".sidebarMode.ticker .fbChatSidebar, .sidebarMode.ticker .fbChatSidebar .uiScrollableAreaBody { width: " + sidebarwidth + "px ! important; } \n";
			html += ".sidebarMode.ticker .fbChatSidebar .ticker_container { width: " + sidebarwidth + "px ! important; } \n";
			html += ".fbx #pageHead, #blueBar #pageHead { position: fixed ! important; left: 615px ! important; width: " + (window.innerWidth - sidebarwidth - 47) + "px ! important; } \n"; //Bluebar nach links verschieben und verbreitern
			html += "#headNav { width: " + (window.innerWidth - sidebarwidth - 224) + "px ! important; } \n";
			html += "#contentArea { width: " + (window.innerWidth - sidebarwidth - 516) + "px ! important; } \n";
			html += "#navSearch { width: " + (window.innerWidth - sidebarwidth - 600) + "px ! important; } \n";
			html += "#q { width: 100% ! important; } \n";
			html += ".uiSearchInput span { width: 100% ! important; } \n";
			html += "#headerArea { width: " + (window.innerWidth - sidebarwidth - 265) + "px ! important; } \n";
			html += ".fbProfileByline { width: " + (window.innerWidth - sidebarwidth - 265) + "px ! important; } \n";
			html += "#MessagingFrame { width: " + (window.innerWidth - sidebarwidth - 265) + "px ! important; } \n";
			html += "#MessagingMainContent { width: " + (window.innerWidth - sidebarwidth - 270) + "px ! important; } \n";
			html += "#MessagingNetegoWrapper { width: " + (window.innerWidth - sidebarwidth - 270) + "px ! important; } \n";
			html += ".fixedBody .MessagingContentHeaderWrapper { width: " + (window.innerWidth - sidebarwidth - 270) + "px ! important; } \n";
			html += ".fixedBody .MessagingReadHeader { width: " + (window.innerWidth - sidebarwidth - 270) + "px ! important; } \n";
			html += ".MessagingContentBorder { width: " + (window.innerWidth - sidebarwidth - 270) + "px ! important; } \n";
			html += "#MessagingLoadingSpinner, .MessagingForwardedContent, .MessagingReadViewMainContent, #MessagingShelf { width: " + (window.innerWidth - sidebarwidth - 270) + "px ! important; } \n";
			html += "#MessagingInlineComposer .MessagingComposerForm { max-width: " + (window.innerWidth - sidebarwidth - 357) + "px ! important; } \n";
			html += "#MessagingInlineComposer textarea { max-width: " + (window.innerWidth - sidebarwidth - 421) + "px ! important; } \n";
			html += "#MessagingComposerOptions { max-width: " + (window.innerWidth - sidebarwidth - 421) + "px ! important; } \n";
			html += ".threadMainCol { width: " + (window.innerWidth - sidebarwidth - 302) + "px ! important; } \n";
			html += ".threadRow .snippet { max-width: " + (window.innerWidth - sidebarwidth - 500) + "px ! important; } \n";
			//html += ".fbNubFlyout { height: " + Math.max(window.innerHeight - 1000, 285) + "px ! important; } \n"; //wtf is this?
			html += ".uiUfi { width: 100% ! important; } \n"; //Kommentare haben immer die größtmögliche Breite
			//html += ".container { width: " + Math.max(window.innerWidth - 298, 962) + "px ! important; } \n"; //wtf is this?
			html += ".sidebarMode.ticker .fbDockWrapper { right: " + sidebarwidth + "px ! important; } \n"; //Chatfenster rücken nach links
			html += "#MessagingNetegoPlaceholder { margin-top: 0px ! important; } \n";
			html += ".MessagingMessage .content { width: " + (window.innerWidth - sidebarwidth - 330) + "px ! important; } \n";
			html += "form.fbEigenpollForm { width: " + (window.innerWidth - sidebarwidth - 580) + "px ! important; } \n";
			html += ".fbEigenpoll .fbEigenpollAddOption, .fbEigenpoll .fbEigenpollPager, .fbEigenpoll .fbEigenpollResults { width: " + (window.innerWidth - sidebarwidth - 742) + "px ! important; } \n";
			if (document.getElementById("MessagingNetegoWrapper") && document.getElementById("MessagingNetegoPlaceholder")) {
				document.getElementById("MessagingNetegoWrapper").removeChild(document.getElementById("MessagingNetegoPlaceholder"));
			}
		}
		if (document.getElementById("leftCol") && window.innerHeight > parseInt(document.getElementById("leftCol").clientHeight)) {
			html += "#leftCol { position: fixed ! important; } \n";
		}
		width = window.innerWidth;
		height = window.innerHeight;
		sidebarwidthold = sidebarwidth;
		style.innerHTML = html;
	}
	window.setTimeout(function() { nextStep(); }, 50);
}

function sidebarSetback() {
	sidebarwidth = 250;
}

function sidebarDown(e) {
	sidebardrag = true;
	document.getElementsByTagName("body")[0].style.cursor = "e-resize";
}

function sidebarDrag(e) {
	if (sidebardrag) {
		sidebarwidth = window.innerWidth - e.clientX - 22;
	}
}

function sidebarUp(e) {
	if (sidebardrag) {
		sidebarwidth = window.innerWidth - e.clientX - 22;
	}
	GM_setValue("fbwidth", sidebarwidth);
	sidebardrag = false;
	document.getElementsByTagName("body")[0].style.cursor = "default";
}
