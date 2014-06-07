// ==UserScript==
// @name		Amazon.co.jp - Bookmeter Link Adder
// @namespace		http://www5.atpages.jp/rabbitbelly/
// @author		Jankokutou
// @version		0.0.2
// @description		Amazon.co.jpの商品ページに読書メーターへのリンクを追加する。
// @include		http://www.amazon.co.jp/exec/obidos/ASIN/*
// @include		http://www.amazon.co.jp/*/dp/*
// @include		http://www.amazon.co.jp/dp/*
// @include		http://www.amazon.co.jp/gp/product/*
// ==/UserScript==

/* ****************************************************************

	Last Update:
		2011-03-27

**************************************************************** */

(function () {

function openWindow(event) {
	var link_uri;

	if (link_uri = event.currentTarget.href) {
		event.preventDefault();
		window.open(link_uri);
	}
}

function addBookmeterLink(target_node, asin) {
	var anchor_node, image_node;

	anchor_node = document.createElement("a");
	anchor_node.id = "x_gmjct_ambmla";
	anchor_node.href = "http://book.akahoshitakuya.com/b/" + asin;
	image_node = document.createElement("img");
	image_node.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEX///8yryUQtpbhAAAAAXRSTlMAQObYZgAAABZJREFUCJljYAACORTEfA+BqlERAwMArlEK2MwTLvAAAAAASUVORK5CYII=";
	image_node.setAttribute("width", "16");
	image_node.setAttribute("height", "16");
	image_node.setAttribute("alt", "読書メーター");
	image_node.c;
	anchor_node.appendChild(image_node);
	anchor_node.addEventListener("click", openWindow, false);

	target_node.appendChild(anchor_node);
}

function setMenuCSS() {
	var css_str = [
			"#x_gmjct_ambmla {margin: 0; padding: 0; border: 0;}",
			"#x_gmjct_ambmla img {margin: 0; padding: 0; border: 0; vertical-align: bottom;}"
		].join("\n");
	var style_node;

	if (typeof GM_addStyle == typeof Function()) {
		GM_addStyle(css_str);
	}
	else {
		style_node = document.createElement("style");
		style_node.setAttribute("style", "text/css");
		style_node.appendChild(document.createTextNode(css_str));
		document.getElementsByTagName("head")[0].appendChild(style_node);
	}
}

function init() {
	var link_container_node, category_node;
	var matched;
	var asin;
	var category_name;

	if (matched = location.pathname.match(/^\/(?:exec\/obidos\/ASIN|gp\/product)\/([a-z\d]{10})(?:\/|%3F|$)/i)) {
		asin = matched[1];
	}
	else if (matched = location.pathname.match(/^\/(?:[^\/]+\/)?dp\/(?:[^\/]+\/)?([a-z\d]{10})(?:\/|%3F|$)/i)) {
		asin = matched[1];
	}

	if (matched && (category_node = document.getElementsByClassName("navCatA")[0]) && (category_name = category_node.innerHTML) && (category_name == "本" || "洋書") && (link_container_node = document.getElementsByClassName("tafContainerDiv")[0])) {
		setMenuCSS();
		addBookmeterLink(link_container_node, asin);
	}
}

init();
})();