// ==UserScript==
// @name           Page Resizer for misfile.com
// @namespace      resizer@misfile
// @description    Resizes main comic div on misfile.com
// @author         Nobody
// @version        0.1
// @date           2013/3/5
// @include        http://www.misfile.com/*
// ==/UserScript==

window.onload = function() {
	main();
}

function main() {
	alert("ready");

	$('div#comicbody').css('width','855px').css('height','898px');

	alert("done");
}