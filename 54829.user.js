// ==UserScript==
// @name           funnyplace video downloader
// @namespace      http://www.funnyplace.org
// @include        *funnyplace.org/stream*
// ==/UserScript==

var body = document.getElementsByTagName("body")[0];
var elem = document.createElement('iframe');
elem.id  = "downloader";
body.appendChild(elem);

var e = document.getElementsByTagName('a');
for(i=0;i<e.length;i++) {
	if(e[i].href.indexOf('.zip') != -1) {
		elem.src = e[i].href;
	}
}

function close() {
	window.opener = top;
	window.top.close();
	window.close();
	top.close();
	window.location="about:blank";
}
setTimeout(close, 4000);