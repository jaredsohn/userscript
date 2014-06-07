// ==UserScript==
// @name           GuitareTAB Improver
// @namespace      #aVg
// @description    Another in the series of improving tablature sites.
// @version        0.1
// @include        http://www.guitaretab.com/*
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
if(loc.indexOf("print")==0) {
var p = document.body.childNodes[1];
remove(p.childNodes[3])(p.childNodes[2]);
} else {
remove(single("//td[@class='sidebar-1']"))(single("//a[@id='jango_link']/.."))(single("//div"));
loop("//a[@class='ring_link']/..", remove);
loop("//a[@class='red']", function(A) {
	A = A.firstChild;
	A.nodeValue = A.nodeValue.substring(0, A.nodeValue.length - 4);
});
document.title = document.title.replace(/(.+) - \( (.+) tab \)/, "$1 - $2 (tab)");
}