// ==UserScript==
// @name           Google+ Refresher
// @namespace      ojensen
// @description    Refreshes landing page every 30s until capacity is not exceeded
// @include        https://plus.google.com/up/start/*
// @include        https://plus.google.com/u/*
// ==/UserScript==

if (document.getElementsByClassName('a-H-f-zbIvOe').length > 0 && document.getElementsByClassName('a-H-f-zbIvOe')[0].innerHTML == "Already invited?") {
	document.title = "G+: still waiting...";
	setTimeout("location.reload(true)", 1000*30);
} else {
	document.title = "G+ READY!!!!";
	setInterval(function(){flashy();}, 1000);
}

function flashy() {
	setTimeout("document.title='OMG'", 500);
	setTimeout("document.title='G+ READY!!!!'", 1000);
}
