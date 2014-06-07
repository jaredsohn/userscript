// ==UserScript==
// @name           CrackDB.cd Fixer
// @namespace      #aVg
// @description    Really not a bad site if you know what is malicious and what is not. But not to fear. This script takes away all the malicious things for you.
// @include        http://crackdb.cd/*
// @include        http://loadcrack.com/*
// @version        0.1
// ==/UserScript==
(function() {
try{
function single(A) {return document.evaluate(A, document, null, 9, null).singleNodeValue;}
function remove(A) {if(A) A.parentNode.removeChild(A);}
if(/crackdb/.test(document.URL)) {
var ads = ["marquee[text()='Astalavista']/../../../../../../../../../../..","center/object/..","center"];
for(var i = ads.length - 1; i>=0; --i)
	remove(single("//"+ads[i]));
if (/\/get/.test(document.URL)) {
	var ref=single("//b[text()='MIRROR']/..");
	remove(ref.previousSibling);
	remove(ref);
	remove(single("//div[contains(text(),'FULL Do')]/.."));
	remove(single("//img[@src='/confirm_16.png']/.."));
	return;
}
if (/\/index/.test(document.URL)) {
	var fake = single("//td[@class='themearticle']/a[starts-with(@href, 'http://down.cd/info')]/..");
	if(fake) {
		for(var i=21; i>=0; --i) {
			fake.removeChild(fake.childNodes[i]);
		}
	}
	return;
}
if(/\/search/.test(document.URL)) {
	var ref = single("//h3[contains(text(), 'Site results')]");
	if (ref) {
		ref = ref.parentNode;
		var ad;
		while((ad=ref.previousSibling)!=null)
			ad.parentNode.removeChild(ad);
	}
	return;
}
	return;
}
if (/loadcrack/.test(document.URL)) {
	document.body.innerHTML = "Downloading file...";
	location.href = location.href;
	setTimeout(close, 2000);
}
} catch(e) {alert("Major error in the script! For now disable it, and copy + paste this message into userscripts.org to get it fixed ASAP:\n\n"+e);}
})();