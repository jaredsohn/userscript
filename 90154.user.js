// ==UserScript==
// @name		nicovideo Download MyList Video
// @namespace		http://www5.atpages.jp/rabbitbelly/
// @author		Jankokutou
// @version		0.0.2
// @description		ニコニコ動画のマイリストにそれぞれの動画をダウンロードするためのリンクを追加します。 / Adds the links to download each video of MyList in Nico Nico Douga.
// @include		http://www.nicovideo.jp/mylist/*
// ==/UserScript==


/* ****************************************************************

	Related Article:
		http://jankokutou.blog133.fc2.com/blog-entry-11.html

	Last Update:
		2010-11-10

**************************************************************** */

(function(){

var _version = "0.0.2";

var _mylist_id;
var _button_click_time;
var _video_list;
var _first_list_item;
var _list_item_count;

/* **************** MAIN FUNCTIONS **************** */

/* menu CSS */
function setMenuCSS() {
	GM_addStyle([
			".x_gmjct_nvdlmlv_box {margin: 0; padding-top: 2px;}",
			".x_gmjct_nvdlmlv_box a.x_gmjct_nvdlmlv_dllink {font-size: 0.75em; font-weight: bold; margin: 0 10px 0 0;}",
			".x_gmjct_nvdlmlv_box input.x_gmjct_nvdlmlv_filename {background-color: #FFFFD0;}"
		].join("\n"));
}
function getSysPageItems() {
	var target_node = document.getElementById("SYS_page_items");
	var list_items;

	if (target_node && _first_list_item != (list_items = target_node.getElementsByClassName("SYS_box_item_data"))[0]) {
		readSysPageItems(target_node, true);
	}
	else if (target_node && _list_item_count < list_items.length) {
		readSysPageItems(target_node, false);
	}
}

function readSysPageItems(sys_page_items_node, all) {
	var list_items = sys_page_items_node.getElementsByClassName("SYS_box_item_data"), list_item;
	var paragraph_node, button_node;
	var video_link;
	var watch_url, video_title, video_id;
	var matched;
	var video_list_item;
	var i, count = list_items.length;

	if (all) {
		_list_item_count = 0;
		_first_list_item = list_items[0];
	}

	for (i = _list_item_count; i < count; i++) {
		list_item = list_items[i];
		video_link = list_item.getElementsByClassName("watch")[0];
		if (video_link && video_link.tagName == "A" && (matched = video_link.pathname.match(/^\/watch\/((?:[a-z]{2})?\d+)(?:$|\/)/))) {
			watch_url = video_link.href;
			video_id = matched[1];
			video_title = getNodeText(video_link);

			paragraph_node = document.createElement("p");
			paragraph_node.className = "x_gmjct_nvdlmlv_box";

			if (video_list_item = _video_list[video_id]) {
				createDownloadNodes(paragraph_node, video_list_item.url, video_title, watch_url, video_list_item.type, video_list_item.low);
			}
			else {
				button_node = document.createElement("input");
				button_node.className = "x_gmjct_nvdlmlv_dlbutton";
				button_node.setAttribute("type", "button");
				button_node.setAttribute("value", "download");
				addDLButtonEventListener(button_node, video_id, video_title, watch_url);
				paragraph_node.appendChild(button_node);
			}
			list_item.appendChild(paragraph_node);
		}
	}

	_list_item_count = count;
}

function readGetflv(xhr, button_node, video_id, video_title, watch_url) {
	var params;
	var matched;
	var video_list_item;
	var video_url;
	var i, count;
	if (xhr.status == 200) {
		params = xhr.responseText.split("&");
		for (count = params.length, i = 0; i < count; i++) {
			if (matched = params[i].match(/^url=(http.+)$/)) {
				video_url = decodeURIComponent(matched[1]);
				if (matched = video_url.match(/[\?&](\w)=\d+\.\d+(\w+)?(?:$|&)/)) {
					video_list_item = _video_list[video_id] = {
							url: video_url,
							type: matched[1],
							low: matched[2] == "low"
						};
					createDownloadNodes(button_node.parentNode, video_url, video_title, watch_url, video_list_item.type, video_list_item.low);
					if (button_node.parentNode) {
						button_node.parentNode.removeChild(button_node);
					}
				}
				else {
					button_node.disabled = false;
					addDLButtonEventListener(button_node, video_id, video_title, watch_url);
					alert("* ERROR *\n動画ファイルのURIが取得できませんでした。\n時間をおくとダウンロードできるかも。");
				}
				break;
			}
		}
	}
	else {
		alert("* ERROR *\ngetflv APIのロードに失敗しました。\nstatus: " + xhr.status);
	}
}

function createDownloadNodes(parent_node, video_url, video_title, watch_url, video_type_id, is_low) {
	var anchor_node, textbox_node;
	var video_type = {v: "FLV", m: "MP4", s: "SWF"}[video_type_id];

	if (parent_node) {
		anchor_node = document.createElement("a");
		anchor_node.className = "x_gmjct_nvdlmlv_dllink";
		anchor_node.setAttribute("href", video_url);
		anchor_node.setAttribute("title", video_title + "をダウンロードする");
		anchor_node.appendChild(document.createTextNode("Download: " + (video_type || "???") + (is_low ? "[low]" : "")));
		addDLLinkEventListener(anchor_node, watch_url);
		parent_node.appendChild(anchor_node);

		textbox_node = document.createElement("input");
		textbox_node.className = "x_gmjct_nvdlmlv_filename";
		textbox_node.setAttribute("type", "text");
		textbox_node.setAttribute("size", "64");
		textbox_node.setAttribute("readonly", "readonly");
		textbox_node.value = video_title + "." + (video_type ? video_type.toLowerCase() : "flv");
		addTextboxEventListener(textbox_node);
		parent_node.appendChild(textbox_node);
	}
}

function addDLLinkEventListener(node, watch_url) {
	var time = 0;
	var listener = function (event) {
			var new_date = new Date();
			if (new_date > time + 30000 || new_date < time) {
				time = new_date;
				GM_xmlhttpRequest({
						method: "GET",
						url: watch_url,
					});
			}
		};
	node.addEventListener("click", listener, false);
	node.addEventListener("mousedown", listener, false);
	node.addEventListener("contextmenu", listener, false);
}

function addDLButtonEventListener(node, video_id, video_title, watch_url) {
	var listener = function (event) {
			var video_list_item = _video_list[video_id];
			var button_click_time;

			if (video_list_item) {
				createDownloadNodes(button_node.parentNode, video_list_item.url, video_title, watch_url, video_list_item.type, video_list_item.low);
			}
			else {
				button_click_time = new Date();
				if (button_click_time - _button_click_time >= 5000 || button_click_time < _button_click_time) {
					_button_click_time = button_click_time;
					node.removeEventListener("click", listener, false);
					node.disabled = true;
					GM_xmlhttpRequest({
							method: "GET",
							url: "http://flapi.nicovideo.jp/api/getflv?as3=1&v=" + video_id,
							onload: function (xhr) {readGetflv(xhr, node, video_id, video_title, watch_url);}
						});
				}
				else {
					alert("少し時間をおいてください・・・。");
				}
			}
		};
	node.addEventListener("click", listener, false);
}

function addTextboxEventListener(node) {
	node.addEventListener("focus", function (event) {
			node.select();
		}, false);
}

/* **************** /MAIN FUNCTIONS **************** */
/* **************** /SUB FUNCTIONS **************** */

function getNodeText(node) {
	var text = [];
	var scanNode = function (node) {
			var childnodes;
			var i, count;
			if (node.nodeType == 3) {	// if node type is TEXT_NODE then
				text[text.length] = node.nodeValue;
			}
			else if (childnodes = node.childNodes) {
				for (count = childnodes.length, i = 0; i < count; i++) {
					scanNode(childnodes[i]);
				}
			}
		};
	scanNode(node);
	return text.join("");
}

/* **************** /SUB FUNCTIONS **************** */
/* **************** INIT **************** */

function init() {
	var matched;
	if (matched = location.pathname.match(/^\/mylist\/(\d+)$/) && unsafeWindow.my) {
		_mylist_id = Number(matched[1]);
		_button_click_time = 0;
		_list_item_count = 0;
		_video_list = {};
		setMenuCSS();
		setInterval(getSysPageItems, 250);
	}
}

// ******** start program********

init();

/* **************** /INIT **************** */

})();