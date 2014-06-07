// ==UserScript==
// @name           novcici
// @namespace      http://userscripts.org/scripts/review/53732
// @include        http://apps.facebook.com/friendsforsale/users/show/*
// @include        http://apps.facebook.com/friendsforsale/users*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function nextFriend() {
	var next = $('a.next');
	window.location = next.attr('href');
}

var coin = $('div[id*="the_coin"]');
if (coin.length) {
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, false);
	coin[0].dispatchEvent(evt);
	
	window.setTimeout(nextFriend,1000);
}
else {
	nextFriend();
}