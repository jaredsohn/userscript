// ==UserScript==
// @name           The Ultimate ultimateGuitar Script
// @namespace      #aVg
// @description    Fixes the "ultimate" site.
// @include        http://www.ultimate-guitar.com/*
// @version        0.1.4
// ==/UserScript==
function single(A, B) {return document.evaluate("."+A, B || document.body, null, 9, null).singleNodeValue;}
function remove(A) {if(A)A.parentNode.removeChild(A);return remove;}
function $(A) {return document.getElementById(A)}
function loop(A, B) {
	A = document.evaluate(A, document, null, 6, null);
	var I = A.snapshotLength;
	while(--I>=0) B(A.snapshotItem(I));
}
var loc = location.pathname.substring(1);
if(loc.indexOf("print")==0) {
	var t = document.body.childNodes[1];
	let(begin=t.childNodes[1]) begin.nodeValue = begin.nodeValue.substring(520);
	let(foot=t.lastChild) foot.nodeValue = foot.nodeValue.substring(0, foot.nodeValue.length - 418);
} else if(loc.indexOf("search")==0) remove(single("//td[@class='b']/script/../.."))(single("//td[@bgcolor='#141414']"))(single("//iframe/.."));
else {
loop("//div/a[@rel='nofollow' and starts-with(@href, 'http')]/..", remove);
}
if(!/^(?:vote|report)/.test(loc)) remove(single("//table[2]"));
if(loc.indexOf("tabs")==0) {
	document.title = document.title.substring(0, document.title.length - 22);
	//loop("//a[contains(@href, 'jamplay')]/..", remove);
	loop("//img[@src='http://img.ultimate-guitar.com/_img/ring_left.gif']/../..", remove);
	remove(single("/..", $("whole_scroll")));
	var dl = single("//input[starts-with(@value, 'Down')]");
	if(dl) {
		var a = document.createElement("a");
		a.textContent = dl.value;
		a.href = dl.parentNode.parentNode.action;
		a.setAttribute("style", "padding: 4px; color: white; background-color: black; -moz-border-radius: 8px;");
		dl.parentNode.replaceChild(a, dl);
	}
	var keep = $("d1");
	for(var i = 4; i>=0; --i) remove(keep.firstChild);

}