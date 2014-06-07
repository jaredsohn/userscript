// ==UserScript==
// @name           Digg Media Describer
// @namespace      http://www.neaveru.com/
// @include        http://*.digg.com/*
// @include        http://digg.com/*
// ==/UserScript==

function xpathHandler(xpath, cb)
{
    var elems = document.evaluate(
	xpath,
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

    for (var i = 0; i < elems.snapshotLength; i++) 
	cb(elems.snapshotItem(i));
}
function describeMedia(mediaId, mediaDescription)
{
    var removeRegExp = new RegExp('\\s*[\\(\\[]+' + mediaDescription + '[\\)\\]]+\\s*$', "i");
    xpathHandler(
	"//div[@id='topten-list']/div[@class='news-summary " + mediaId + "-thumb']/h3/a[1]",
	function(elem) 
	{
	    elem.firstChild.nodeValue = elem.firstChild.nodeValue.replace(removeRegExp, '');
	    elem.firstChild.nodeValue += ' [' + mediaDescription + ']';
	});
}
describeMedia("vid", "VID");
describeMedia("img", "PIC");
