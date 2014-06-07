// ==UserScript==
// @name           Babylon Dictionary Improver
// @namespace      #aVg
// @description    Fixes this site.
// @include        http://www.babylon.com/definition/*
// @version        0.1
// ==/UserScript==
(function() {
function $(A) {return document.getElementById(A)}
function single(A, B) {return document.evaluate("." + A, B || document.body, null, 9, null).singleNodeValue}
function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
remove(single("//div[@class='top']"))($("ads-col"))(single("//img[@src='lib/gifs/04.gif']/../.."))(single("//img[@class='OT_OnlineImageArea']/.."))(single("//a[@onclick='return addthis_sendto()']/.."));
loop("//a[@class='about-gloss']/..", function() {this.parentNode.removeChild(this)});
single("//img[@src='lib/gifs/free-downloads.gif']/..").href = "http://www.babylon.com/affiliates/landing/download.php";
GM_addStyle("h1.top {padding-top:90px!important} #results-col {width:100%!important}");
})();