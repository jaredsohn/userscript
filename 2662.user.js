// Copyright (c) Nicolas Hoizey 2006
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// FeedLounge2Blogmarks
// Greasemonkey script to adds a button in FeedLounge that lets
// you post directly to Blogmarks any item
//
// See http://userscripts.org/scripts/show/2662
//
// Based on FeedLounge script for del.icio.us
// http://feedlounge.com/support/tools/feedlounge-to-delicious/
//
// History
// 0.1   2006-01-17   First release
//
// 0.2   2006-01-18   Added Blogmarks logo
//
// ==UserScript==
// @name          FeedLounge2Blogmarks
// @namespace     http://www.gasteroprod.com/
// @description   Add a "Post to Blogmarks" button to FeedLounge.
// @include       http://my.feedlounge.com/*
// ==/UserScript==

var blogmarksImg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAMAAACHgmeRAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADSUExURcHpIL3hMbfeH7rlD7feHLXdFrPcDrLcDrvkGx0WJzY5HrviISAaJ7nfIbbeGLnjDxgRIXiOGtLqchwUKLffFneOFJ7AFFNdIMPkQrTdFLXdF/H50+r1u9LyV0ZBTB8cHHCHDaK7QLDaBa/aA6/aAvv5/7rjG9TtcSooJr3gMefwxqLFE7zoD6vSELzjILTdEFlVWR8bHcjlUSonJvv6/8znXb3hMr7nIJGwFsblTNHqbZm5FLfeG46rFry7vLrgIWFvHtHqbrXdFLPcELjeIf///yPb0YAAAABwSURBVHjaYtBU03MBAhZGBm4xbR1+Z2dnFwYGQQ0Ha2ZmfSBLVIDHWNzCmZeBQ1FO3pBT2NacQVJd1c6AS0HXnsHJ0dXVREtWhAnMAgIjKQhL2ooVKCbkKmPKpsLuwmAjYamkzAYy2YyVD2IbQIABAAn3EbppE4FQAAAAAElFTkSuQmCC" width="9" height="12" alt="" border="0" style="float: left;" />';

if (document.getElementById('fl_items_toolbar_ul')) {
	var newButton = document.createElement('li');
	newButton.setAttribute(
		'onclick'
		, "var dataNode = false; if (document.getElementById('fl_items_river').style.visibility == 'visible') { for (var i = 0; i < document.getElementById('fl_river').childNodes.length; i++) { if (document.getElementById('fl_river').childNodes[i].className.indexOf('selected') != -1) { var dataNode = document.getElementById('fl_river').childNodes[i].childNodes[1].firstChild.firstChild; } } } else { var dataNode = document.getElementById('fl_viewpane_header').firstChild.firstChild.firstChild; } if (dataNode) { window.open('http://blogmarks.net/my/new.php?mini=1&truc=3&url='+encodeURIComponent(dataNode.getAttribute('href'))+'&title='+encodeURIComponent(dataNode.innerHTML)); }"
	);

	newButton.setAttribute('style', 'padding: 4px 3px; cursor: pointer;');
	newButton.setAttribute('onmouseover', "itemToolbarEffect(this, 'over');");
	newButton.setAttribute('onmousedown', "itemToolbarEffect(this, 'down');");
	newButton.setAttribute('onmouseup', "itemToolbarEffect(this, 'over');");
	newButton.setAttribute('onmouseout', "itemToolbarEffect(this, 'out');");
	newButton.innerHTML = blogmarksImg + ' Post to Blogmarks';
	document.getElementById('fl_items_toolbar_ul').appendChild(newButton);
}
