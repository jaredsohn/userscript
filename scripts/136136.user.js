// ==UserScript==
// @name           Junandia Facebook Chatbar Modifications
// @namespace      Junandia Chatbar Modif
// @description    Some modification for the Facebook Chatbar and stuff. Implements "Wider Facebook".
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @exclude        http://apps.facebook.com/*
// @exclude        https://apps.facebook.com/*
// @version        0.0.1
// @changes        Option to hide Offline-Friends fixed.
// ==/UserScript==

//Update-Function

function checkUpdate(response) {
	if (response) {
		response = response.split("\n");
		var version = "1.3.1";
		for (var i = 0; i < response.length; i++) {
			if (response[i].substring(0, 11) == "// @version") {
				newVersion = response[i].substring(19);
			} else if (response[i].substring(0, 11) == "// @changes") {
				changes = response[i].substring(19);
			}
		}
		if (newer(version, newVersion) && confirm(text[lang][0] + version + "->" + newVersion + text[lang][1] + changes + text[lang][2])) {
			self.location.href = "http://userscripts.org/scripts/source/119724.user.js";
		}
	} else {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/119724.meta.js",
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

//Functions from "Wider Facebook", partly modified.

var style = document.createElement("style");
var sidebarwidth = GM_getValue("fbwidth", 250);
var sidebarwidthold;
var sidebarpull = document.createElement("div");
var sidebardrag = false;
var width;
var height;
var chatbaritemheight = 32;
var chatbaritemheightold;
var showofflinefriends = GM_getValue("offlinefriends", true);
var showofflinefriendsold;
var offlinefriendsbutton;
var offlinehiddenimg = "data:image\/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%08%06%00%00%00%8D2%CF%BD%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%09pHYs%00%00%0E%C2%00%00%0E%C2%01%15(J%80%00%00%00LIDAT(Sc%9C1w%F3%7F%06%20%88%0Aw%05Q8%01%13Lf%D9%CA%DD%0C%20%8C%0B%C0%15%12%D2%80%A1%10%97%06F%98%1B%F1%3A%10(%89%D3Dt%8D%04%15%82B%03%84q*%84)%80%99%8C%A1%10%5D%01%86B%5C%0A%60%0A%01%06%97%1A%C3%2F%07%14%1C%00%00%00%00IEND%AEB%60%82";
var offlineshownimg = "data:image\/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%08%02%00%00%00%02PX%EA%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%004IDAT(Sc%9C1w3%03n%C0%84G%0E(%C5%14%15%EE%8AK%05P%8A%90n%A0V%AC%06%40%04%89%D0%8Di%00%DC%3C%E2t%23%1B%80%EC%14%02%BA%01%89%C1%09%AC%D6%A2%8D%F2%00%00%00%00IEND%AEB%60%82";
var lang = 0, de = 1, en = 0;
var text = new Array();
text[0] = new Array();//English - English
text[1] = new Array();//Deutsch - German
text[0][0] = "A new version of Facebook Chatbar Modifications is available (";
text[1][0] = "Eine Neue Version von Facebook Chatbar Modifications ist verfügbar (";
text[0][1] = ").\nChanges: ";
text[1][1] = ").\nÄnderungen: ";
text[0][2] = "\nDownload now?";
text[1][2] = "\nJetzt herunterladen?";
text[0][3] = "OFFLINE-FRIENDS (";
text[1][3] = "OFFLINE-FREUNDE (";
text[0][4] = ", VISIBLE)";
text[1][4] = ", EINGEBLENDET)";
text[0][5] = ", HIDDEN)";
text[1][5] = ", VERSTECKT)";
window.addEventListener("load", firstStep, false);


function firstStep() {
	style.type = "text/css";
	document.getElementsByTagName("head")[0].appendChild(style);
	sidebarpull.className = "slide";
	sidebarpull.addEventListener("dbclick", sidebarSetback, false);
	sidebarpull.addEventListener("mousedown", sidebarDown, false);
	window.addEventListener("mousemove", sidebarDrag, false);
	window.addEventListener("mouseup", sidebarUp, false);
	offlinefriendsbutton = document.createElement("img");
	offlinefriendsbutton.addEventListener("click", showOfflineFriends, true);
	offlinefriendsbutton.src = showofflinefriends ? offlineshownimg : offlinehiddenimg;
	offlinefriendsbutton.style.cursor = "pointer";
	offlinefriendsbutton.style.zIndex = 10;
	offlinefriendsbutton.style.marginTop = "12px";
	offlinefriendsbutton.style.marginLeft = "12px";
	var langidentify = xpath("a", "href", "http://www.facebook.com/find-friends/browser/?ref=tn").snapshotItem(0) ? xpath("a", "href", "http://www.facebook.com/find-friends/browser/?ref=tn").snapshotItem(0) : xpath("a", "href", "https://www.facebook.com/find-friends/browser/?ref=tn").snapshotItem(0);
	if (langidentify) {
		switch (langidentify.innerHTML) {
			case "Freunde finden":
				lang = de;
				break;
			default:
				lang = en;
				break;
		}
	}
	if (!document.getElementById("pagelet_sidebar") || !langidentify) {
		window.setTimeout(function() { firstStep(); }, 1000);
		return;
	}
	if (document.getElementsByClassName("separator moreOnlineFriends")[0]) {
		document.getElementsByClassName("separator moreOnlineFriends")[0].appendChild(offlinefriendsbutton);
	}
	document.getElementById("pagelet_sidebar").appendChild(sidebarpull);
	checkUpdate();
	nextStep();
}

function nextStep() {
	if (document.getElementsByClassName("separator moreOnlineFriends")[0] && document.getElementsByClassName("separator moreOnlineFriends")[0].childNodes.length == 1) {
		document.getElementsByClassName("separator moreOnlineFriends")[0].insertBefore(offlinefriendsbutton, document.getElementsByClassName("separator moreOnlineFriends")[0].firstChild);
		document.getElementsByClassName("separator moreOnlineFriends")[0].style.verticalAlign = "middle";
	}
	if (width != window.innerWidth || height != window.innerHeight || sidebarwidthold != sidebarwidth || chatbaritemheight != chatbaritemheightold || showofflinefriends != showofflinefriendsold) {
		var html = "";
		if (window.innerWidth > 1000) {
			html += "#globalContainer { position: absolute ! important; left: 23px ! important; width: " + (window.innerWidth - sidebarwidth - 45) + "px ! important; } \n";
			html += ".slide { position: fixed ! important; right: " + sidebarwidth + "px ! important; width: 5px ! important; height: 100% ! important; background-color: #4B67A1 ! important; opacity: 0.2; z-index: 100 ! important; cursor: e-resize ! important; } \n";
			html += ".sidebarMode.ticker .fbChatSidebar, .sidebarMode.ticker .fbChatSidebar .uiScrollableAreaBody { width: " + sidebarwidth + "px ! important; } \n";
			html += ".sidebarMode.ticker .fbChatSidebar .ticker_container { width: " + sidebarwidth + "px ! important; } \n";
			html += "#pageHead { position: fixed ! important; left: 23px ! important; width: " + (window.innerWidth - sidebarwidth - 47) + "px ! important; } \n";
			html += "#headNav { width: " + (window.innerWidth - sidebarwidth - 224) + "px ! important; } \n";
			html += "#contentArea { width: " + (window.innerWidth - sidebarwidth - 516) + "px ! important; } \n";
			html += "#navSearch { width: " + (window.innerWidth - sidebarwidth - 600) + "px ! important; } \n"; //Suchfeld wird verbreitert
			html += "#q { width: 100% ! important; } \n"; //Suchfeld wird verbreitert
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
			html += "form.fbEigenpollForm { width: " + (window.innerWidth - sidebarwidth - 580) + "px ! important; } \n"; //Umfragen werden verbreitert
			html += ".fbEigenpoll .fbEigenpollAddOption, .fbEigenpoll .fbEigenpollPager, .fbEigenpoll .fbEigenpollResults { width: " + (window.innerWidth - sidebarwidth - 742) + "px ! important; } \n"; //Umfragen werden verbreitert
			if (!showofflinefriends) {
				html += ".fbChatOrderedList .item { height: 0px ! important; visibility: collapse ! important; } \n"; //Offline-Freunde werden ggf. ausgeblendet
				html += ".fbChatOrderedList .item.active { height: " + (chatbaritemheight) + "px ! important; visibility: visible ! important; } \n"; //Restliche Freunde in der chatbar rücken ggf. zusammen
				html += ".fbChatOrderedList .item.mobile { height: " + (chatbaritemheight) + "px ! important; visibility: visible ! important; } \n"; //das gleiche nochmal
			} else {
				html += ".fbChatOrderedList .item { height: " + (chatbaritemheight) + "px ! important; visibility: visible ! important; } \n"; //Freunde in der Chatbar rücken ggf. zusammen
			}
			if (window.innerWidth > 1500) {
				html += "#home_stream li { /*float: left ! important;*/ } \n";
			}
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
		chatbaritemheightold = chatbaritemheight;
		showofflinefriendsold = showofflinefriends;
		style.innerHTML = html;
	}
	sidebarwidth = GM_getValue("fbwidth", 250);
	fixChatbar();
	if (window.location.href.split("\/")[3] == "groups" && window.innerWidth > 1000) {
		checkGroups();
	}
	window.setTimeout(function() { nextStep(); }, 40);
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

//Added Functions.

function fixChatbar() {
	var chatbar = xpath("ul", "class", "fbChatOrderedList clearfix").snapshotItem(0);
	var chatseparator = xpath("li", "class", "separator moreOnlineFriends", chatbar).snapshotItem(0);
	if (chatseparator) {
		var chatseparatortext = xpath("div", "class", "dive").snapshotItem(0).previousSibling;
	}
	var chatlist = xpath("li", "class", "item", chatbar);
	var friends = new Array();
	for (var i = 0; i < chatbar.childNodes.length; i++) {
		switch (chatbar.childNodes[i].className) {
			case "item":
				friends[i] = new Array();
				friends[i][0] = 0;
				friends[i][1] = chatbar.childNodes[i].firstChild.lastChild.innerHTML;
				friends[i][2] = i;
				break;
			case "item active":
				friends[i] = new Array();
				friends[i][0] = 2;
				friends[i][1] = chatbar.childNodes[i].firstChild.lastChild.innerHTML;
				friends[i][2] = i;
				break;
			case "item mobile":
				friends[i] = new Array();
				friends[i][0] = 1;
				friends[i][1] = chatbar.childNodes[i].firstChild.lastChild.innerHTML;
				friends[i][2] = i;
				break;
			case "separator moreOnlineFriends":
				friends[i] = new Array();
				friends[i][0] = 0;
				friends[i][1] = "";
				friends[i][2] = i;
				break;
			case "item invis":
				friends[i] = new Array();
				friends[i][0] = -1;
				friends[i][1] = chatbar.childNodes[i].firstChild.lastChild.innerHTML;
				friends[i][2] = i;
				break;
			default:
				friends[i] = new Array();
				friends[i][0] = 0;
				friends[i][1] = "";
				friends[i][2] = i;
		}
	}
	friends.sort(compare);
	chatbaritemheight = showofflinefriends ? Math.max(28, Math.min(32, Math.floor(window.innerHeight / friends.length - 1.5))) : Math.max(28, Math.min(32, Math.floor(window.innerHeight / (friends.length - chatlist.snapshotLength) - 1.5)));
	var changed = false;
	for (var i = 0; i < friends.length; i++) {
		if (friends[i][2] != i) {
			changed = true;
			//alert(i + ";" + friends[i][2]);
		}
		friends[i] = chatbar.childNodes[friends[i][2]];
	}
	if (changed) {
		for (var i = 0; i < friends.length; i++) {
			chatbar.removeChild(friends[i]);
			chatbar.appendChild(friends[i]);
		}
	}
	if (chatseparatortext) {
		chatseparatortext.innerHTML = text[lang][3] + chatlist.snapshotLength + (showofflinefriends ? text[lang][4] : text[lang][5]);
	}
}

function compare(a, b) {
	if (a[0] > b[0]) {
		return -1;
	} else if (a[0] < b[0]) {
		return 1;
	} else {
		if (a[1] < b[1]) {
			return -1;
		} else if (a[1] > b[1]) {
			return 1;
		} else {
			return 0;
		}
	}
}

function xpath(tag, attribute, value, where) {
	if (attribute) {
		return document.evaluate("//" + (tag? tag : "*") + "[@" + attribute + (value ? "=\"" + value + "\"" : "") + "]", (where ? where : document), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	} else {
		return false;
	}
}

function checkGroups() {
	var moreMembers = (window.innerWidth - 1270) / 100;
	var list = xpath("img", "class", "scaledImageFitWidth img");
	if (list.snapshotLength > 8) {
		//Will be implemented later.
	}
}

function showOfflineFriends(e) {
	showofflinefriends = !showofflinefriends;
	offlinefriendsbutton.src = showofflinefriends ? offlineshownimg : offlinehiddenimg;
	GM_setValue("offlinefriends", showofflinefriends);
}
