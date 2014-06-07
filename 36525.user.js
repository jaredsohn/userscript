// ==UserScript==
// @name        	AskMetafilter Only Best Answer Linkage
// @description		Removes non-'best' answers when you click on the best-answered tick/check. 
// @namespace      http://userscripts.org/users/71401
// @include        http://ask.metafilter.com/*
// @include       http://ask.metafilter.com
// ==/UserScript==

if (document.URL == 'http://ask.metafilter.com/' || document.URL.match('http://ask.metafilter.com/index')) {
	// Find all the best answer ticks, and change them to 'bestanswer' links.
	
	var imgElements, urlElements, thisElement;
	imgElements = document.evaluate(
		'//img[attribute::title=\'this question contains answers marked as best\']',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	
	urlElements = document.evaluate(
   		'//img[attribute::title=\'this question contains answers marked as best\']/preceding-sibling::a[position()=1]',
    	document,
    	null,
    	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    	null);
     
	for (var i = 0; i < urlElements.snapshotLength; i++) {
		thisElement = urlElements.snapshotItem(i);
		imgElement = imgElements.snapshotItem(i);
		// replace tick img with doctored anchor link
		var newa=document.createElement('a');
		var newimg=document.createElement('img');
		newimg.src=imgElement.src;
		newimg.style.verticalAlign=imgElement.style.verticalAlign;
		newimg.border='0';
		newa.className='more';
		newa.appendChild(newimg);
		newa.href=thisElement.href+'#bestanswer';
		var foo = thisElement.parentNode.replaceChild(newa,imgElements.snapshotItem(i));

	}
			
} else if (document.URL.split('#')[1] == 'bestanswer') {
	// We're on an askme question page with a 'bestanswer' fake anchor, so remove all non-best answers and associated spacing
	brElements = document.evaluate(
		'//br[./preceding-sibling::div[position()=1 and @class!=\'comments best\' and contains(@class, \'comments\')]]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	for (var j = 0; j< brElements.snapshotLength; j++) {
		brElement = brElements.snapshotItem(j);
		brElement.parentNode.removeChild(brElement);
	}
	
	commentElements = document.evaluate(
		'//div[contains(@class,\'comments\') and @class!=\'comments best\' and not(@id)]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < commentElements.snapshotLength; i++) {
		commentElement = commentElements.snapshotItem(i);
		commentElement.parentNode.removeChild(commentElement);
	}
}