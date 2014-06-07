// ==UserScript==
// @name           RapidShareIndex Fixer
// @namespace      #aVg
// @description    Cleans up the layout of this site, and permanently solves the captcha for you in the comments box.
// @include        http://www.rapidshareindex.com/*
// @version        0.1.1
// ==/UserScript==
function $(A) {return document.getElementById(A);}
function remove(A) {if(A) A.parentNode.removeChild(A);}
function single(A) {return document.evaluate(A, document, null, 9, null).singleNodeValue;}

var links = $("more-category"), next=links;
for(var i = 2; i>=0; --i)
	remove(links.children[i]);

links=links.parentNode;
for(var did = 2; did > 0; --did && (links = links.parentNode)) {
while(links.children.length > 2){
	remove(links.lastElementChild);
}
}

remove(single("//span[@style='color: rgb(255, 0, 0);']"));
var base=single("//div[@class='codemain']");
if(base) {
	remove(base.previousElementSibling);
	remove(base.parentNode.nextElementSibling);
	remove(base);
}
remove($("ad_download").parentNode);
remove(single("//h3[text()='Rapidshare Download Links']"));
remove(single("//a[@href='/go/PCSpeed.html']"));

unsafeWindow.document.cookie="captcharef=92ba261465537b0684e7d4bd181a760b;";
var cap=single("//input[@name='captcha']");
cap.value="e60fa";
cap.type = "hidden";
remove(cap.nextElementSibling);
remove(cap.previousElementSibling);
$("email").value = "uso.script@gmail.com";

var nof = document.evaluate("//a[@rel='nofollow']", document, null, 6, null), i = nof.snapshotLength - 1, nofi;
while(nofi=nof.snapshotItem(--i))
	remove(nofi);