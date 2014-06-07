// ==UserScript==
// @name           tianya ad closer
// @namespace      tag:shinxjl@gmail.com,2010-10-19:tianya
// @include        http://www.tianya.cn/*/*.shtml
// ==/UserScript==

function _tianya_ad_closer_href(itemarr) {
	if (itemarr) {
		var idx;
		var item;
		var regexp_close = /javascript:(.*close.*)/i
		for (idx in itemarr) {
			item = itemarr[idx];
			if (jsarr = item.href.match(regexp_close)) {
				setTimeout(jsarr[1], 0);
			}
		}
	}
}

_tianya_ad_closer_href(document.getElementsByTagName("a"));

var btn_ads = document.getElementsByTagName("button");
for (var idx in btn_ads) {
	btn_ads[idx].style.display = "none";
}

setTimeout(function() {
	document.getElementById("ty_msg_box").style.display = "none";
}, 2000);

var divs = document.getElementsByTagName("div");
var adiv = false;
var adiv_regexp_close = /(tianyaBrandSpan.*)|(adsp_.*)/i
for (var idx in divs) {
	adiv = divs[idx];
	if (adiv.id.match(adiv_regexp_close)) {
		adiv.style.display = "none";
	}
}

document.getElementById("adsp_content_replybox_frame_1").style.display = "";