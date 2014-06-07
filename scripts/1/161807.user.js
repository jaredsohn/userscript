// ==UserScript==
// @name           2tu Thunder address directly
// @description    直接得到迅雷地址
// @auther		   yoelyu
// @version	0.0.1
// @include        http://www.2tu.cc/Html/*
// ==/UserScript==


var TM0 = setInterval(function () {
		var H;
		if (H = document.querySelector("a[thunderhref]")) {
			H.href = H.getAttribute("thunderhref");
			H.removeAttribute("thunderhref");
			H.removeAttribute("onclick");
			H.removeAttribute("oncontextmenu");
			H.onclick = null;
		}
	}, 100);
document.addEventListener('DOMContentLoaded', function () {
	clearInterval(TM0);
}, true);
var playsite = "http://www.tvgua.com/vodtest.php?url"
	var links = document.getElementsByClassName("dwon_y");
for (x in links) {
	links[x].firstElementChild.href = links[x].firstElementChild.href.replace("http://vod.lixian.xunlei.com/share.html?from=un_20369&url", playsite);
}
