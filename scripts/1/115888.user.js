// ==UserScript==
// @name           Facebook Hide Offline Friends
// @namespace
// @description    Hide the Friends, who are offline from your chat bar
// @include        http://*.facebook.*
// ==/UserScript==

var ul, a = 0, b = 32, c;
window.styles = document.createElement("style");
window.styles.type = "text/css";
window.things = document.createElement("style");
window.things.type = "text/css";
function start() {
	window.styles.innerHTML = ".fbChatOrderedList .item { visibility: collapse ! important; height: 0px ! important; } \n";
	//window.styles.innerHTML += ".fbChatOrderedList .item.active { visibility: visible ! important; height: 32px ! important; } \n";
	window.styles.innerHTML += ".fbChatOrderedList .separator { visibility: collapse ! important; height: 0px ! important; } \n";
	window.styles.innerHTML += ".ego_section { visibility: collapse ! important; height: 0px; ! important; } \n";

	window.styles.innerHTML += ".fbSidebarGripper { visibility: collapse ! important; height: 0px ! important; } \n";
	window.styles.innerHTML += ".sidebarMode.ticker .fbChatSidebar #pagelet_ticker { visibility: collapse ! important; height: 0px ! important; } \n";
	window.styles.innerHTML += ".fbChatSidebar .fbChatOrderedList, .fbChatSidebar .fbChatTypeaheadView { padding: 0px ! important; } \n";
	window.styles.innerHTML += ".fbChatSidebar .scrollableOrderedList .uiScrollableAreaTrack { top: 0px ! important; } \n";
	window.styles.innerHTML += ".fbChatOrderedList .item a { padding-top: 0px ! important; padding-bottom: 0px ! important; } \n";
}
function updateThings() {
	a = 0;
	ul = document.evaluate(
		"//ul[@class='fbChatSidebarBody']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	if (ul.snapshotItem(0)) {
		ul.snapshotItem(0).firstChild.className = "";
		ul.snapshotItem(0).firstChild.firstChild.className = "";
		ul.snapshotItem(0).firstChild.firstChild.firstChild.className = "";
		ul.snapshotItem(0).firstChild.firstChild.firstChild.firstChild.className = "";
	}
	ul = document.evaluate(
		"//ul[@class='fbChatOrderedList clearfix']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	if (ul.snapshotItem(0)) {
		for (var i = 0; i < ul.snapshotItem(0).childNodes.length; i++) {
			if (ul.snapshotItem(0).childNodes[i].className == "item active") {
				a++;
			}
		}
		if (a * 32 > window.innerHeight - 24) {
			b = Math.max(Math.floor((window.innerHeight - 24) / a), 28);
		} else {
			b = 32;
		}
		window.things.innerHTML = ".fbChatOrderedList .item.active { visibility: visible ! important; height: " + b + "px ! important; } \n";
		document.getElementsByTagName("head")[0].appendChild(window.things);
	}
	window.setTimeout(function () { updateThings(); }, 1000);
}
document.getElementsByTagName("head")[0].appendChild(window.styles);
document.getElementsByTagName("head")[0].appendChild(window.things);
start();
updateThings();
