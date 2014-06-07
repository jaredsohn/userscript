// ==UserScript==
// @name           911tabs Improver
// @namespace      #aVg
// @description    Heavily improves this already excellent site by cleaning non-ABP adverts and fixing titles for bookmark awesome.
// @version        0.1.1
// @include        http://www.911tabs.com/*
// ==/UserScript==
function single(A) {return document.evaluate(A, document, null, 9, null).singleNodeValue;}
function remove(A) {if(A)A.parentNode.removeChild(A);return remove;}
function $(A) {return document.getElementById(A)}
function loop(A, B) {
	A = document.evaluate(A, document, null, 6, null);
	var I = A.snapshotLength;
	while(--I>=0) B(A.snapshotItem(I));
}
var loc = location.pathname.substring(1);
if(loc.indexOf("link")==0) {
	if(loc.indexOf("frame.php")==5) {
		remove(single("//a[@class='trubo']/../.."));
		window.top.document.title = single("//a[starts-with(@href, '/tabs/')]").textContent + " - " + single("//h2").textContent;
	} else {
		remove($("overlay1"))($("overlay"));
		loop("//*[contains(@style, 'height: 133px;')]", function(A) {
			A.style.height = "98px";
		});
	}
} else if(loc.indexOf("tabs")==0 || loc.indexOf("bands")==0) {
	document.title = document.title.substring(0, document.title.length - 31) + " (911Tabs)";
	var ad = single("//tr[@class='tr1'][2]");
	remove(single("//td[@width='180']"))(single("//table[@width='728']"))(ad.nextElementSibling)(ad.parentNode.lastElementChild)(ad)(single("//img[@src='/img/get_ico.gif']/../../../../.."));
	loop("//img[@src='/img/ringtone_left.gif']/..", remove);
}