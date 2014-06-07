// ==UserScript==
// @name           Stop iTunes
// @namespace      http://openguild.com/greasemonkey/stopitunes.xml
// @description    Stop iTunes from launching
// @include        http://itunes.apple.com/*
// @include        http://phobos.apple.com/*
// ==/UserScript==
function main() {
	document.body.setAttribute("onload", "");  
}

main();