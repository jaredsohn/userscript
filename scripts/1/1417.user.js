// ==UserScript==
// @name           Show Alt
// @description    Superimpose alt tags over images
// @include        http://*
// ==/UserScript==


	var allImgs, thisImg, newDiv, newText, i;
	
	allImgs = document.evaluate(
	    '//img[@alt!=""] | //input[@type="image" and @alt!=""]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (i = 0; i < allImgs.snapshotLength; i++) {
	    thisImg = allImgs.snapshotItem(i);
	   	newDiv = document.createElement("div");
	    newDiv.setAttribute("style","padding: 0; margin: 0; font-family: Arial; position: absolute; overflow: hidden; z-index: 998; font-size: 9px; padding: 2px; background-color: yellow; border: 1px solid orange; -moz-opacity:0.85;");
		newText= document.createTextNode(thisImg.getAttribute("alt"));
		newDiv.appendChild(newText);
	    thisImg.parentNode.insertBefore(newDiv,thisImg);
	}
	
	allImgs = document.evaluate(
	    '//img[not(@alt)] | //img[@alt=""] | //input[@type="image" and @alt=""] | //input[@type="image" and not(@alt)]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (i = 0; i < allImgs.snapshotLength; i++) {
	    thisImg = allImgs.snapshotItem(i);
	   	newDiv = document.createElement("div");
		newDiv.setAttribute("style","padding: 0; margin: 0; font-family: Arial; position: absolute; overflow: hidden; z-index: 998; font-size: 9px; padding: 2px; background-color: orange; border: 1px solid yellow; filter:alpha(opacity=85); -moz-opacity:0.85; opacity: 0.85");
		newText= document.createTextNode("no ALT");
		newDiv.appendChild(newText);
	    thisImg.parentNode.insertBefore(newDiv,thisImg);
	}


