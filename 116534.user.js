// ==UserScript==
// @name                Bike-Forum Cleaner
// @namespace	        http://camlost.wz.cz/grasemonkey
// @description	        Script to improve bike-forum.cz useability.
// @include             http://www.bike-forum.cz/
// @include             http://bike-forum.cz/
// @include             http://www.bike-forum.cz/forum*
// @include             http://bike-forum.cz/forum*
// @version             4.1
// ==/UserScript==

var _DEBUG = false;

function hideElement(sId)
{
	var el = document.getElementById(sId);
	if (el)
		el.style.display = "none";
}

function setElementWidth(sId, sCssWidth)
{
	var el = document.getElementById(sId);
	if (el) 
		el.style.width = sCssWidth;
}

function hidePRThreads()
{
	var elContentBox = document.getElementById("content");
	var sXpathExpr = "//span[@class='title']/parent::p";
	var xpathRes = document.evaluate(sXpathExpr, elContentBox, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < xpathRes.snapshotLength; ++i) {
		var el = xpathRes.snapshotItem(i);
		sXpathExpr = "./span";
		var xR = document.evaluate(sXpathExpr, el, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		_DEBUG && GM_log("Number of <span> elements:  " + xR.snapshotLength);
		if (xR.snapshotLength < 2) {
			var elLi = el.parentNode;
			elLi.style.display = "none";
		}
	}
}

function setGalleryWindow()
{
	var sXpathExpr = "//div[@id='photogalleryGadget']/div";
	var xpathRes = document.evaluate(sXpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < xpathRes.snapshotLength; ++i) {
		var el = xpathRes.snapshotItem(i);
		_DEBUG && GM_log("bike-forum_cleaner Gallery window width set to 950px");
		el.style.display = "block";
		el.style.cssFloat = "none";
		//el.style.stylefloat = "none";
		el.style.width = "950px";
		el.style.height = "auto";
		el.style.padding = " 0em 1em 1em";
		el.style.marginLeft = "auto";
		el.style.marginRight = "auto";
	}
}

function setTitleWidth()
{
	var widthStr = "50%";
	var sXpathExpr = "//li[@class='clearfix']/p";
	var xpathRes = document.evaluate(sXpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (xpathRes.snapshotLength > 0) {
		var delta = 21;
		var el = xpathRes.snapshotItem(0);
		if (el.childElementCount < 7) 
			delta = 21;
		_DEBUG && GM_log("SPAN element count: " + el.childElementCount);
		_DEBUG && GM_log("P width: " + el.offsetWidth);
		   
		for (var i = 0; i < el.childElementCount; ++i) {
			var elChild = el.children[i];
			if (elChild.className.indexOf("title") < 0)
			delta += elChild.offsetWidth;
			_DEBUG && GM_log(elChild.tagName + "[" + elChild.className + "] width: " + elChild.offsetWidth
			+ "\ndelta " + delta);
		}
		var width = el.offsetWidth - delta;
		widthStr = width + "px";
	}
	_DEBUG && GM_log("title width: " + widthStr);
	GM_addStyle("span.title {width: " + widthStr + "!important; min-width: 400px !important;}");
}

function showFullTitle()
{
	var sXpathExpr = "//span[@class='title']/a[@title]";
	var xpathRes = document.evaluate(sXpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < xpathRes.snapshotLength; ++i) {
		var el = xpathRes.snapshotItem(i);
		//_DEBUG && GM_log(el.href + "\n" + el.innerHTML);
		el.innerHTML = el.title;
		el.style.overflow = "hidden";
	}
}

function showItemNumber()
{
	GM_addStyle("div.CommentNumber {width: 4em; height: 1em; float: right; margin: 0em 0em 0.3em 0.3em; padding: 2px; text-align: right;}");
	var sXpathExpr = "//div[@class='comment']";
	var xpathRes = document.evaluate(sXpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < xpathRes.snapshotLength; ++i) {
		var el = xpathRes.snapshotItem(i);
		//_DEBUG && GM_log("comment (idx " + i + ") found");
		el.innerHTML = '<div class="CommentNumber" >#' + (i + 1) + '</div>' + el.innerHTML;
	}
}

_DEBUG && GM_log("bike-forum_cleaner STARTED");

if (window)
	window.addEventListener("resize", setTitleWidth, false);
hideElement("right");
hideElement("wideSquare");
setElementWidth("content", "auto");
setGalleryWindow();
hidePRThreads();
setTitleWidth();
showFullTitle();
showItemNumber();

// add a category filter
// TODO:

_DEBUG && GM_log("bike-forum_cleaner FINISHED");

