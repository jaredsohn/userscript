// ==UserScript==
// @name           Enter ETHZ
// @author         pixelgeek
// @description    Automatically sends the Enter ETHZ form
// @include        http://enter.ethz.ch/*
// @include        https://enter.ethz.ch/*
// @email          felix@pixelgeek.ch
// @version        1.0
// ==/UserScript==

if(document.URL.indexOf("https://enter.ethz.ch/enter?")<0) {
	var exPos = "//a[contains(@href,'https://enter.ethz.ch')]";
	var nextlink = document.evaluate(exPos,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	nextlinkURL = nextlink.snapshotItem(0).href;
	window.open(nextlinkURL,"_self");
} else {
	var sForm = document.getElementsByTagName('form');
	sForm[0].submit();
}