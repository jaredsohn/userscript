// ==UserScript==
// @name           YouTube Ban from Frontpage
// @namespace      #aVg
// @description    Bans shit from YouTube's frontpage
// @include        http://*youtube.tld/
// ==/UserScript==
const bannedUsers = ["ShaneDawsonTV2", "BlackChameleon", "sxephil", "Fred", "WHATTHEBUCKSHOW", "ShaneDawsonTV", "PhilipDeFranco"];
function loop(A, B) {
	A = document.evaluate(A, document, null, 6, null);
	var i = A.snapshotLength;
	while(--i >= 0) B(A.snapshotItem(i), i);
}
function remove(A) {A.parentNode.removeChild(A);}
loop("//a[starts-with(@href, '/user/')]", function(user) {
	if(bannedUsers.indexOf(user.pathname.substring(6)) != -1)
		remove(user.parentNode.parentNode.parentNode.parentNode);
});