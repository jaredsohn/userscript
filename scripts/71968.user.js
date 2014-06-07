// ==UserScript==
// @name           SWChallenge Replay Previews
// @namespace      http://userscripts.org/users/xathis
// @include        http://2010.software-challenge.de/wettbewerb/spieltage/*/matches/*
// ==/UserScript==

for (var i = document.links.length - 1; i >= 0; i--) {
	var link = document.links[i];
	if (link.innerHTML == "Replay herunterladen") {
		var a = document.createElement('a');
		a.href = "javascript:void(0);";
		a.innerHTML = "Replay ansehen";
		a.addEventListener("click", delegate(showReplay, link), false);
		link.parentNode.appendChild(a);
	}
}

function delegate(func, param) {
	return function() { return func(param); };
}

function showReplay(link) {
	var s = '<iframe width="660" height="510" style="border:none;" src="http://mathis.kilu.de/swcreplay/iframe.php?autoplay=1&replayURL='+link.href+'"></iframe>';
	link.parentNode.parentNode.innerHTML += s;
}