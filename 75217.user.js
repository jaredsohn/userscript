// ==UserScript==
// @name        Mediafire Auto Download
// @namespace   http://fyfm.luckymancvp.info
// @description Mediafire Auto Download
// @include     *.mediafire.*/?*
// @exclude      *.mediafire.*/?sharekey*
// @grant none
// ==/UserScript==

$(document).ready(function() {

	downloadEl = $(".download_link a");

	if (downloadEl[0]){
		window.location.href = downloadEl.attr("href");
		setTimeout("window.close()",1000);
	}

});