// ==UserScript==
// @name           GoogleResult sites blocker
// @namespace      http://wikiwiki.jp/hyagni/
// @description    Hide irritating sites from google search results
// @include        http://www.google.*/search*
// ==/UserScript==
// Thanks to the Author of Autopagerize.
// I borrowed your source of scrolling.
(function() {

ignoreList = new Array();
ignoreList[0] = /oshiete.*\.goo\.ne\.jp.*/;
ignoreList[1] = /okwave\.jp.*/;
ignoreList[2] = /q\.hatena\.ne\.jp\/[0-9]*/;
ignoreList[3] = /b\.hatena\.ne\.jp.*/;
ignoreList[4] = /\.wikipedia\.org/;
ignoreList[5] = /qa\.mapion\.co\.jp.*/;
ignoreList[6] = /oshiete.*\.nifty\.com/;
ignoreList[7] = /questionbox\.jp\.msn\.com/;
ignoreList[8] = /knowledge\.livedoor\.com/;
ignoreList[9] = /chiebukuro\.yahoo/;
ignoreList[10]= /d\.hatena\.ne\.jp\/keyword/;
ignoreList[11]= /kakaku\.com/;
ignoreList[12]= /weblio\.jp/;
ignoreList[13]= /wpedia\..*\.goo\.ne\.jp/;
ignoreList[14]= /spysee\.jp/;
ignoreList[15]= /dictionary\.goo/;
ignoreList[16]= /dic\.yahoo\.co\.jp/;
ignoreList[17]= /wapedia\.mobi/;


var allLinks,backupLength;

this.scroll= function() { onScroll() }
window.addEventListener("scroll", this.scroll, false);

function onScroll() {
    checkup();
}

checkup();

function checkup(){
	allLinks = document.evaluate(
		'//a[contains(concat(" ",normalize-space(@class)," "), " l ")]', 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	if(!allLinks.snapshotLength ||
		backupLength == allLinks.snapshotLength){
		return;
	}
	backupLength = allLinks.snapshotLength
	
	for(var i=0;i<allLinks.snapshotLength;i++){
		for(var j=0;j<ignoreList.length;j++){
			if(allLinks.snapshotItem(i).href.match(ignoreList[j])
					!= null){
				allLinks.snapshotItem(i).parentNode.parentNode.parentNode.
					parentNode.style.display = "none";
			}
	}
}
}
})();
