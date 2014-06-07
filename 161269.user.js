// ==UserScript==
// @name	qbatplay
// @namespace	qbatplay
// @description	qbatplay
// @include	http://*/*/*qvod*.html
// @version	1.0.0.6a
// @updateURL	https://userscripts.org/scripts/source/161269.meta.js
// @downloadURL	https://userscripts.org/scripts/source/161269.user.js
// ==/UserScript==
window.onload = function() {
		Player.QVOD.domute();
		quiplay();
		setTimeout(lowplay, 8000);
}
function quiplay() {
	var e = document.getElementById("loading").style.display,s = $("span.rate").text(),pe = Player.QVOD.etime,pb = Player.QVOD.object.BufferPercent;
	if (pe > 0 || s == "正在播放" || e == "none" || s == "正在缓冲 100%") {
		cntpl()
	} else if (pb >= 3 && pb < 10) {
		cntpl()
	} else {
		setTimeout(quiplay, 100)
	}
}
function lowplay() {
	var s = $("span.rate").text();
	if (s == "正在缓冲 60%") {
		cntpl();
	} else if (s == "正在缓冲...") {
		cntpl();
	} else if (s == "停止" || s == "") {
		alert("播放器崩溃,重启浏览器吧");
	} else {
		setTimeout(lowplay, 100)
	}
}
function cntpl() {
	if (LI.offset + 1 != LI.count) {
		LI.go(1);
	} else{
		window.close();
	}
}