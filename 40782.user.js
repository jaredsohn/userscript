// ==UserScript==
// @name           StudiVZ - Bilder speichern
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @include        http://www.studivz.net/*
// @include        http://studivz.net/*
// @include        http://www.schuelervz.net/*
// @include        http://schuelervz.net/*
// @include        http://www.meinvz.net/*
// @include        http://meinvz.net/*
// ==/UserScript==

var images = document.evaluate("//img[@oncontextmenu and contains(@src, 'imagevz.net')]", document, null, 6, null), img, i=0;
while (img = images.snapshotItem(i++)) {
	img.removeAttribute("oncontextmenu");
}
