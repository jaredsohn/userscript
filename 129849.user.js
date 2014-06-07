// ==UserScript==
// @name           JPopsuki2D
// @description    Disables 3D on JPopsuki
// @author         kamehame
// @include        http://jpopsuki.eu/*
// @include        http://*.jpopsuki.eu/*
// @include        https://jpopsuki.eu/*
// @include        https://*.jpopsuki.eu/*

makeall2d();

function makeall2d() {
	make2d("img", "src");
	make2d("link", "href");
	make2d("a", "href");
}

function make2d(tag, attr) {
	list = document.getElementsByTagName(tag);
	for (i = list.length-1; i > -1; i--) {
		item = list[i];
		cur = item.getAttribute(attr);
		if (cur.indexOf("static_3D") > -1) item.setAttribute(attr, cur.replace("static_3D", "static"));
	}
}

// ==/UserScript==