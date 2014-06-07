// ==UserScript==
// @name        ntv biggerscreen
// @include     http://cm.ntvmsnbc.com/ServerSite/wui/NTVCanliYayin/default.aspx
// @version     1
// ==/UserScript==

function biggerScreen() {
	var VideoPanel = document.getElementById('VideoPanel');
	VideoPanel.style.height = "830px";
	VideoPanel.style.width = "1056px";
	document.getElementById('TekCift').style.left = "0px";
	/*
	window.setTimeout(function () {
		$("#VideoPanel").css({
			height: 830,
			width: 1056
		});
		$("#TekCift").css("left", "0");
	}, 1000);
	*/
}
if (window.addEventListener) {
	window.addEventListener('load', biggerScreen, false);
} else {
	window.attachEvent('onload', biggerScreen);
}
