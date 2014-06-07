// ==UserScript==
// @name           Printable Attach Fix
// @namespace      PseudoParadise
// @version        2.0
// @description    Fix attachment images replaced by 1x1 none.gif at their inserted position
// @include        http://www.lightnovel.cn/viewthread.php?action=printable*
// ==/UserScript==

// XPath
var insertedAttachPath = '//img[@file]';
var attachImagePath    = '/html/body/img[@onload]';
var attachSpanDivPath  = '//span[@id]|//div[@class="t_attach"]';
var forumLogoPath      = '//img[@alt="Board logo"]|/html/body/br[1]|/html/body/br[2]';
var jammerPath         = '//span[@style and not(@id)]|//font[contains(@style, "0px")]';
var styledFontPath     = '//font[@style]';

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var aidp = /aid=(\d+)/;

//var console = unsafeWindow.console;

// move inserted attachment images to their position
function replaceAttach()
{
	var allInsAttach, allAttachImg;
	allInsAttach = xpath(insertedAttachPath);
	allAttach = xpath(attachImagePath);
	
	// look for name of attachment
	var aida = new Array(allAttach.snapshotLength);	// aid list
	for (var i = 0; i < allAttach.snapshotLength; i++) {
		aida[i] = aidp.exec(allAttach.snapshotItem(i).previousSibling.previousSibling.previousSibling.textContent)[1];
		//console.log("Attach %d: %s", i, aida[i]);
	}

	// replace attachment
	var theAttach, theImage, aid, aidx;
	for (var i = 0; i < allInsAttach.snapshotLength; i++) {
		theAttach = allInsAttach.snapshotItem(i);
		aid = theAttach.id.replace('aimg_', '');
		aidx = aida.indexOf(aid);
		if (aidx != -1)
		{
			theImage = allAttach.snapshotItem(aidx);
			theImage.setAttribute('alt', theAttach.alt);
			theAttach.parentNode.replaceChild(theImage, theAttach);
		}
	}
}

// remove unnecessary elements
function searchAndDestroy() {
	var snapshot;

	// preceding spans and following divs
	var allSpanDiv = xpath(attachSpanDivPath);
	for (var i = 0; i < allSpanDiv.snapshotLength; i++) {
		snapshot = allSpanDiv.snapshotItem(i);
		snapshot.parentNode.removeChild(snapshot);
	}
	
	// forum logo and 2 following br
	var logo = xpath(forumLogoPath);
	for (var i = 0; i < logo.snapshotLength; i++) {
		snapshot = logo.snapshotItem(i);
		snapshot.parentNode.removeChild(snapshot);
	}
	
	// attachment icon
	var allAttachIcon = xpath('//img[contains(@src, "images/attachicons/")]');
	for (var i = 0; i < allAttachIcon.snapshotLength; i++) {
		snapshot = allAttachIcon.snapshotItem(i);
		snapshot.parentNode.removeChild(snapshot);
	}
}

function removeNoise() {
	var discord = xpath(jammerPath);
	for (var i = 0; i < discord.snapshotLength; i++) {
		snapshot = discord.snapshotItem(i);
		snapshot.parentNode.removeChild(snapshot);
	}
}

function main() {
	removeNoise();
	replaceAttach();
	searchAndDestroy();
}

main();