// ==UserScript==
// @name           kaztorka.org image floatifier
// @namespace      -
// @description    floats images from pics.kz, image.kz, fastpic.ru and radikal.ru in kaztorka.org torrent descriptions 
// @include        http://kaztorka.org/*
// @include        http://www.kaztorka.org/*
// ==/UserScript==


var lnks, lnk, pic, ref;

lnks = document.evaluate("//a[contains(@href,'pics.kz/view/')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < lnks.snapshotLength; i++) 
{
	lnk = lnks.snapshotItem(i);
	pic = lnk.childNodes[0];
	ref = pic.src;
	ref = ref.replace("_preview","");
	lnk.href = ref;
	lnk.setAttribute("class","highslide");
	lnk.setAttribute("onclick","return hs.expand(this)");
}


lnks = document.evaluate("//img[contains(@src,'image.kz/img/')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < lnks.snapshotLength; i++) 
{
	lnk = lnks.snapshotItem(i).parentNode;
	pic = lnk.childNodes[0];
	ref = pic.src;
	ref = ref.replace("-sml","");
	lnk.href = ref;
	lnk.setAttribute("class","highslide");
	lnk.setAttribute("onclick","return hs.expand(this)");
}


lnks = document.evaluate("//a[contains(@href,'radikal.ru/F/')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < lnks.snapshotLength; i++) 
{
	lnk = lnks.snapshotItem(i);
	pic = lnk.childNodes[0];
	ref = lnk.href;
	ref = ref.replace("radikal.ru/F/","");
	ref = ref.replace(".html","");
	lnk.href = ref;
	lnk.setAttribute("class","highslide");
	lnk.setAttribute("onclick","return hs.expand(this)");
}


lnks = document.evaluate("//a[contains(@href,'fastpic.ru/view/')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < lnks.snapshotLength; i++) 
{
	lnk = lnks.snapshotItem(i);
	ext = lnk.href.split(".")[2];
	pic = lnk.childNodes[0];
	ref = pic.src;
	ref = ref.replace("/thumb/","/big/");
	ref = ref.replace(".jpeg","."+ext);
	lnk.href = ref;
	lnk.setAttribute("class","highslide");
	lnk.setAttribute("onclick","return hs.expand(this)");
}