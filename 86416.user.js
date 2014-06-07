// ==UserScript==
// @name           Oglaf image text
// @namespace      org.foomanbar.oglafimage
// @description    Displays "alt" and "title" text in tooltip
// @include        http://www.oglaf.com/*
// @include        http://oglaf.com/*
// ==/UserScript==

for (var images = document.getElementsByTagName("img").wrappedJSObject, i = 0, image; image = images[i]; i++) {
	if (image.id == 'strip' && image.title && image.alt) {
		image.title = "ALT: " + image.alt + "    TITLE: " + image.title;
	}
}
