// ==UserScript==
// @name           xkcd2goatkcd
// @namespace      throwawayworld
// @include        http://xkcd.com/*
// ==/UserScript==



function getComicNumber() {
	var comicNumPQ = document.evaluate(
		"//a[@accesskey='p']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	var comicNumNQ = document.evaluate(
		"//a[@accesskey='n']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var comicNumN = comicNumPQ.snapshotItem(0);
	var comicNumP = comicNumNQ.snapshotItem(0);

	var comic_prev = comicNumN.toString().match(/[1-9][0-9]*(?=\/$)/);
	var comic_next = comicNumP.toString().match(/[1-9][0-9]*(?=\/$)/);
	if(null != comic_prev)
	{
		return 1+new Number(comic_prev[0]);
	}
	else if(null != comic_next)
	{
		return -1+new Number(comic_next[0]);
	}
	else
	{
		GM_log("failed to parse comic number...");
		return null;
	}
}

function doScript() {
	var comicNum = getComicNumber();
	if(null == comicNum) {
		return;
	}
	if(comicNum < 91) { // first goatkcd was for strip #91
		return;
	}
	//GM_log(comicNum);

	// won't match thumbnail images (eg http://xkcd.com/273/ )
	// goatkcd doesn't do it correctly for these
	var comicImgSearch = document.evaluate(
		"//div[@id='middleContent']//div[@class='s']/img[1]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	if(comicImgSearch.snapshotLength < 1) {
		GM_log('could not find comic image...');
		return;
	}
	var comicImg = comicImgSearch.snapshotItem(0);
	var originalImg = comicImg.src;

	var nws = GM_getValue("nws",false);

	if(true == nws) {
		comicImg.src = "http://goatkcd.com/strips/"+comicNum+".jpg";
	}
	else {
		comicImg.src = "http://goatkcd.com/strips_sfw/"+comicNum+".jpg";
	}
}

doScript();
