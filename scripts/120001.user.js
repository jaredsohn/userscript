// ==UserScript==
// @name           tgfc ad block
// @namespace      com.tgfcer.club
// @include http://club.tgfcer.com/*
// @include http://club.tgfcer.com/forumdisplay.php*
// @include http://club.tgfcer.com/viewthread.php*
// @include http://club.tgfcer.com/thread*
// @include http://club.tgfcer.com/post.php*
// @include http://bbs.tgfcer.com/forum*
// @include http://bbs.tgfcer.com/forumdisplay.php*
// @include http://bbs.tgfcer.com/viewthread.php*
// @include http://bbs.tgfcer.com/thread*
// @include http://bbs.tgfcer.com/post.php* 
// ==/UserScript==

(function(){
	var removeElementById = function(strId)
	{
		var elem = document.getElementById(strId);
		if (elem) {
			elem.parentNode.removeChild(elem);
		}
	}

	var removeDivElementByClass = function(strClass)
	{
		var allDivs, thisDiv;
		allDivs = document.evaluate(
			"//div[@class='" + strClass + "']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
			thisDiv = allDivs.snapshotItem(i);
			thisDiv.parentNode.removeChild(thisDiv);
		}
	}

	removeDivElementByClass("ad_headerbanner");
	removeDivElementByClass("ad_text");
	removeElementById("leftadv");
	removeDivElementByClass("ad_footerbanner");
	removeElementById("googlead");
	removeElementById("baiduad");
	removeElementById("house");
	removeElementById("ckepop");
	removeDivElementByClass("ad_column");
	removeElementById("cproIframe3");

	var content_main = document.getElementById("content_main");
	if (content_main) {
		content_main.style.marginRight = '0px';
	}
})();