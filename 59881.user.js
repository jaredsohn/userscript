// ==UserScript==
// @name           A Jango Script
// @namespace      #aVg
// @description    Cleans up jango; lets you be a listener without signing up or viewing pointless advertisements. More to come. Make a request for a feature!
// @include        http://www.jango.com/*
// @version        0.1
// ==/UserScript==
function single(A) {return document.evaluate(A, document, null, 9, null).singleNodeValue;}
function remove(A) {if(A)A.parentNode.removeChild(A);return remove;}
function $(A) {return document.getElementById(A)}
function loop(A, B) {
	A = document.evaluate(A, document, null, 6, null);
	var I = A.snapshotLength;
	while(--I>=0) B(A.snapshotItem(I));
}
function truth() {return true;}
var loc = location.pathname.substring(1);
if(loc.indexOf("player")==0) {
	unsafeWindow.soundManager._writeDebug = truth;
} else if(location.search=="?l=0") {
	document.title = "Jango";
} else {
	let(ad=$("media-window")) {
		remove(ad)($("login-layover"));
	}
	remove($("signup-window"))(single("//a[@id='strident']/.."))(single("//div[@id='leaderboard']/.."))(single("//img[@alt='Footer_quotes_white_798x76']"))(single("//a[text()='Advertise']/.."))(single("//a[@href='http://www.jango.com/advertise']/.."));
	loop("//div[contains(@class, 'ad ') or contains(@class, 'copyright')]", remove);
	unsafeWindow.skippable = truth;
	unsafeWindow.hide_all_ads = truth;
	unsafeWindow.show_all_ads = truth;
}