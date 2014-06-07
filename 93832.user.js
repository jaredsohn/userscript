// ==UserScript==
// @name		Pixiv Nickname Adder
// @namespace		http://www5.atpages.jp/rabbitbelly/
// @author		Jankokutou
// @version		0.0.1
// @description		Adds authors' nicknames to illustrations in Pixiv. / Pixivのイラストに作者のニックネームを表示させます。
// @include		http://www.pixiv.net/*
// ==/UserScript==

/* ****************************************************************

	Last Update:
		2010-12-30

**************************************************************** */

(function () {

/* **************** MAIN FUNCTIONS **************** */

function setNickname(target_node) {
	var list_nodes, anchor_node, image_node, separator_node, nickname_node, node;
	var separator_className = "x_gmjct_pxvnna_separator";
	var nickname_className = "x_gmjct_pxvnna_nickname";
	var image_alt, image_title, image_nickname;
	var i, count;

	if (list_nodes = target_node.getElementsByTagName("li")) {
		count = list_nodes.length;
		for (i = 0; i < count; i++) {
			if ((anchor_node = list_nodes[i].getElementsByTagName("a")[0]) && (image_node = anchor_node.getElementsByTagName("img")[0])) {
				image_alt = image_node.getAttribute("alt");
				while (node = image_node.nextSibling) {
					if (node.nodeType == 3) {
						image_title = node.nodeValue;
						break;
					}
				}
				if (node && image_title && image_alt) {
					image_alt = image_alt.replace(/[\r\n]/g, "");
					image_title = image_title.replace(/[\r\n]/g, "");
					if (image_alt.indexOf(image_title) == 0) {
						image_nickname = image_alt.substr(image_title.length + 1);
						separator_node = document.createElement("span");
						separator_node.className = separator_className;
						separator_node.appendChild(document.createTextNode("/"));
						nickname_node = document.createElement("span");
						nickname_node.className = nickname_className;
						nickname_node.appendChild(document.createTextNode(image_nickname));
						anchor_node.appendChild(separator_node);
						anchor_node.appendChild(nickname_node);
					}
				}
			}
		}
	}
}

/* **************** /MAIN FUNCTIONS **************** */
/* **************** INIT FUNCTIONS **************** */

function setMenuCSS() {
	GM_addStyle([
			".x_gmjct_pxvnna_separator {color: #A0A0A0;}",
			".x_gmjct_pxvnna_nickname {color: #6000B0;}"
		].join("\n"));
}

function init() {
	var target_nodes, imagelist_node;
	var i, count;

	if (/^\/(?:bookmark_new_illust|new_illust|mypage|member|profile|response)\.php$/.test(location.pathname)) {
		setMenuCSS();
		target_nodes = document.getElementsByClassName("linkStyleWorks");
		for (count = target_nodes.length, i = 0; i < count; i++) {
			if (target_nodes[i].tagName == "UL") {
				setNickname(target_nodes[i]);
			}
			if (imagelist_node = target_nodes[i].getElementsByTagName("ul")[0]) {
				setNickname(imagelist_node);
			}
		}
	}
}

/* **************** /INIT FUNCTIONS **************** */

init();

})();