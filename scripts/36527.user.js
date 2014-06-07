// ==UserScript==
// @name           AskMetafilter Best Answer Linkage
// @description		Jump to the first 'best answer' when you click on the tick/check.
// @namespace      http://userscripts.org/users/71401
// @include        http://ask.metafilter.com/*
// @include       http://ask.metafilter.com
// ==/UserScript==

/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/

	function getElementsByClassName(className, tag, elm) {
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					// returnElements.push(current);
					return current;
				}
			}
	}

if (document.URL == 'http://ask.metafilter.com/' || document.URL.match('http://ask.metafilter.com/index')) {
	//Find all the best answer ticks, and change them to 'bestanswer' links.
	
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
	// We're on an askme question page with a 'bestanswer' fake anchor, so scroll down to the first marked answer.
	// This might be quicker with a DOM search.
// 	bestElem = document.evaluate(
// 		'//div[attribute::class=\'comments best\'][1]',
// 		document,
// 		null,
// 		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
// 		null);
// 	window.scroll(0, bestElem.snapshotItem(0).offsetTop);

// DOM version 
	bestArr = getElementsByClassName('comments best', 'div', document.getElementById("body"));
	window.scroll(0, bestArr.offsetTop);

}