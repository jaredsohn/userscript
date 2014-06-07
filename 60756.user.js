// ==UserScript==
// @name           A sing365 Script
// @namespace      #aVg
// @include        http://*sing365.com/*
// @description    Cleans up sing365, fills out comment boxes for you.
// @version        0.1
// ==/UserScript==
(function() {
if(top && top.location != location) return;
document = document.wrappedJSObject;
function single(A, B) {return document.evaluate("."+A, B || document.body, null, 9, null).singleNodeValue;}
function remove(A) {if(A)A.parentNode.removeChild(A);return remove;}
function $(A) {return document.getElementById(A)}
function loop(A, B, C) {
	A = document.evaluate("."+A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I>=0) B(A.snapshotItem(I));
	return loop;
}
loop("//div[@align='center']/img/..", remove);
var main = single("//table[@width='760']");
loop("//td[@width='5']", remove, main);
remove(single("//td[@width='160']", main))(single("//font[@face='arial']/.."))(single("//td[contains(., 'LYRICS are') and @width='779']/.."));
single("//input[@name='AnonymName']", main).value="UserScripts";
single("//input[@name='EmailAddr']", main).value="uso.script@gmail.com";
single("//input[@name='Subject']", main).value="Amazing";
single("//textarea", main).value="These lyrics are correct. Thank you!";
})();