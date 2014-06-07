// ==UserScript==
// @name           Youjizz Downloader
// @author         xmRipper (xmripper@gmail.com)
// @version        1.1
// @include        http://youjizz.com/*
// @include        http://www.youjizz.com/*
// ==/UserScript==

var allItems, thisItem;
allItems = document.evaluate(
    "//span[@id='min']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allItems.snapshotLength; i++) {
    thisItem = allItems.snapshotItem(i);
	var kaynak, bas, son, dlink, media;
	kaynak = thisItem.innerHTML;
	bas = kaynak.indexOf("src=\"") + 5;
	son = kaynak.indexOf("\"", bas);
	dlink = kaynak.substr(bas, son-bas);
	
	dlink = dlink.substr(0, dlink.length-6);
	
	bas = dlink.indexOf("media");
	son = dlink.indexOf("/", bas);
	media = dlink.substr(bas, son-bas);
	
	dlink = dlink.replace(media, "flvs");
	dlink = dlink.replace("pics", media);
	
	thisItem.innerHTML = thisItem.innerHTML + "<div style='position:absolute; margin-top: 40px; margin-left: 125px;'><a style='color: red; font-family: Arial; font-size: 14px; font-weight: bold;' href='"+dlink+"'>Download</a></div>";
}

allItems = document.evaluate(
    "//div[@id='player']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allItems.snapshotLength; i++) {
    thisItem = allItems.snapshotItem(i);
	var kaynak, bas, son, dlink, media;
	kaynak = thisItem.innerHTML;
	bas = kaynak.indexOf("content_video\",") + 16 ;
	son = kaynak.indexOf("\"", bas);
	dlink = kaynak.substr(bas, son-bas);
	
	thisItem.innerHTML = thisItem.innerHTML + "<div style='position:absolute; margin-top: 90px; margin-left: 250px;'><a style='color: red; font-family: Arial; font-size: 20px; font-weight: bold;' href='"+dlink+"'>Download</a></div>"
}