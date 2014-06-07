// ==UserScript==
// @name           FCdash
// @namespace      FantasticContraption
// @description    This script changes the image at the bottom of the FantasticContraption homepage.
// @author         TweekDash
// @version        1.0
// @include        http://*.fantasticcontraption.com/*
// @include        http://fantasticcontraption.com/*
// @include        http://*.fantasticcontraption.com/forum/*
// @include        http://fantasticcontraption.com/forum/*
// ==/UserScript==


var allImgs, thisImg;
allImgs = document.evaluate('//img[@src]',document,null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allImgs.snapshotLength; i++) {
	thisImgs = allImgs.snapshotItem(i);

	if(thisImgs.src=='http://fantasticcontraption.com/forum/styles/contraption/theme/images/fantastic_contraption_logo.png'){
		thisImgs.src='http://img17.imageshack.us/img17/6052/fantasticcontraption.png';
	}else if(thisImgs.src=='http://fantasticcontraption.com/images/bar.gif'){
		thisImgs.src='http://img67.imageshack.us/img67/7081/fantasticbanner.png';
	}
}



