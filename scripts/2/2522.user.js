// ==UserScript==
// @name            4chan ad removal
// @description     Remove ads from 4chan.org ^__^
// @author          Anonymous
// @version         0.6 (January 9th, 2007)
// @include         http://*.4chan.org/*
// ==/UserScript==

//Remove top ads
bodyHeight=document.body.offsetHeight;
scrolledHeight=self.pageYOffset+self.innerHeight;
adDiv=document.getElementById('ad');
if(adDiv) adDiv.parentNode.removeChild(adDiv);
res=document.evaluate("//a/img[contains(@src,'/dontblockthis/') or contains(@src,'adbrite-your-ad-here-banner')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(i=0; adImg=res.snapshotItem(i); i++) {
	theAd=(adImg.parentNode.parentNode.nodeName=="BODY")?adImg.parentNode:adImg.parentNode.parentNode;
	if(theAd.nextSibling.nodeName=="HR" || theAd.parentNode.nodeName=="CENTER") theAd.nextSibling.parentNode.removeChild(theAd.nextSibling);
	if(theAd.parentNode.nodeName=="CENTER" && theAd.parentNode.nextSibling.nodeName=="HR") theAd.parentNode.nextSibling.parentNode.removeChild(theAd.parentNode.nextSibling);
	if(theAd.parentNode) theAd.parentNode.removeChild(theAd);
}

//Remove bottom ad
botAd=document.getElementById("bottomAdOuter");
if(botAd) {
	botAd=botAd.parentNode;
	botHR=botAd.previousSibling.previousSibling;
	botCenter=botHR.previousSibling.previousSibling;
	if(botCenter.nodeName=="CENTER") botCenter.parentNode.removeChild(botCenter);
	if(botHR.nodeName=="HR") botHR.parentNode.removeChild(botHR);
	botAd.parentNode.removeChild(botAd);
}

//Avoid full-page ads
res=document.evaluate("//a[contains(@href,'/src.cgi/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(i=0; imgA=res.snapshotItem(i); i++) {
	imgA.href = imgA.href.replace(/\/src\.cgi\//, "/src/");
}

//Fix scrolling
if((document.body.offsetHeight!=bodyHeight)&&(bodyHeight>scrolledHeight)) {
	newScroll=(bodyHeight<document.body.offsetHeight)?bodyHeight-document.body.offsetHeight:document.body.offsetHeight-bodyHeight;
	window.scrollBy(0, newScroll);
}