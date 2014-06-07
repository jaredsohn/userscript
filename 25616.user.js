// ==UserScript==
// @name Rom Hustler Hack
// @namespace http://dophin.name/romhustler/hack
// @description Download rom from rom list directly. If you have any suggestions or find any bugs, please email me(torshie at gmail dot com). (Modified by WindPower)
// @include http://romhustler.net/roms/*
// ==/UserScript==

var linkList = '';
c = document.getElementById("content");
for (var n = c.firstChild; n; n = n.nextSibling) {
	if (n.tagName == 'UL') {
		break;
	}
}
linkList = n;
for (var n = linkList.firstChild; n; n = n.nextSibling) {
	if (n.tagName == 'LI') {
		var a = n.firstChild;
		a.addEventListener("click", hack, true);
		a.setAttribute("detailUrl", a.getAttribute("href"));
		a.setAttribute("href", "javascript: void 0;");
	}
}

function hack() {
	detailUrl = "http://romhustler.net" + this.getAttribute("detailUrl");
	downloadUrl = detailUrl.replace(/\/rom\//, '/download/').replace(/(\/\d+)\/.*/i,'$1');
	GM_xmlhttpRequest({
			method: "GET",
			url: downloadUrl,
			headers: {
				Referer: detailUrl
			},
			onload: download,
			onerror: function(r) {
				alert("Error");
			}
		});
}

function download(r) {
	text = r.responseText;
	link= getLink(text);
	location.href = link;
}

function getLink(text) {
	pattern = /<script type="text\/javascript">(\s*var link_enc(?:.|\s)*?)<\/script>/i;
	js = text.match(pattern);
	eval(js[1]);
	return link;
}