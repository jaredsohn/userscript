// ==UserScript==
// @name			mthai download link
// @description		mhai download link
// @author			zaki
// @include     http://video.mthai.com/*

// ==/UserScript==

function appendDownloadLink() {
	var scripts = document.getElementsByTagName('script');
	var hd_url = null;

	for (var i=0; i<scripts.length; i++) {
		var html = scripts[i].innerHTML;
		var start = html.indexOf('url:');
		if (start != -1) {
                        start+=6;
			hd_url = html.substring(start, html.indexOf("',"));

			alert(hd_url);
			break;
		}
	}



}

window.setTimeout(appendDownloadLink, 1);