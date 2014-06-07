// ==UserScript==
// @name          DisConnect
// @description   Remove twitter and facebook connect options
// @author        goodsoft
// @include       http://livejournal.com/*
// @include       http://*.livejournal.com/*
// ==/UserScript==
(function() {
	var Replaced = '<strong>Repost to</strong>';
	var ReplacedToo = 'Twitter\n                </label>\n            </p>';
	
	var cid = document.getElementById('qrdiv') ? 'qrdiv' : 'container';
	
	var Original = document.getElementById(cid).innerHTML;

	var New = Original.replace(Replaced, "<!--");
	New = New.replace(ReplacedToo, "-->");

	document.getElementById(cid).innerHTML = New;
})();