// ==UserScript==
// @name           ebayForumImageBlocker
// @namespace      http://fastcheck.blogspot.com
// @description    Bilder in den Postings werden in Orginalgr&ouml;&szlig;e nur 
// @description	   von den freigegebenen Domains zulassen. Alle anderen Bilder 
// @description	   werden verkleinert angezeigt und wechseln erst auf Mausklick 
// @description	   zur Orginalgroesse und wieder zur&uuml;ck.
// @description	   Zusätzlich wird die rechte 'Aktuell' Tabelle ausgeblendet.
// @include        http://forums.ebay.de/*
// ==/UserScript==
(function () { // function wrapper for Opera

/***********************************************************************************************/
// Liste freigegebener domains 
var imgURLs = new Array("http://www.ebay.de/","http://forums.ebay.de/","http://www.falle-internet.de/");

// Entfernt die 'Aktuell' Tabelle auf der rechten Seite.
// Zum Unterdr&uuml;cken dieser Funktion den Wert auf 0 setzten
hideTable = 1;

/***********************************************************************************************/

if (hideTable!=0) {
	var x = document.evaluate("//table[@id='table1']", document, null, 9, null).singleNodeValue;
	x.setAttribute("style", "display:none;");
	x.parentNode.width = 0;
	x.parentNode.setAttribute("style", "display:none;");
	x = document.evaluate("//td[@class='poweredByLiveworld']", document, null, 9, null).singleNodeValue;
}

	var imgNodes = document.evaluate("//td[@class='jive-description']//descendant::img",
					 document, null, 7, null);

	Array.prototype.contains = function(obj) {
    	for (var x=0;x<this.length;x++) {
       		if (this[x] == obj) return true;
     	}
     	return false;
   	};

	var node, pNode, s;
	
	for(var i=0;i<imgNodes.snapshotLength;i++) {
		node = imgNodes.snapshotItem(i)
		if (!node.src) continue; 
		pNode = node.parentNode

		regExp = /(^\D{7}\b[^\/]*\/)/;
		s = (regExp.exec(node.src)[1])

		if (!imgURLs.contains(s)){
			if (pNode.nodeName == "A") pNode.removeAttribute("href");
			node.setAttribute("width", '19');
			node.setAttribute("height", '19');
			node.addEventListener('click', showImage, false)
		}
	}

function showImage(){
	(this.width !=19) ? this.setAttribute("width", '19') : this.setAttribute("width", '');
	(this.height !=19) ? this.setAttribute("height", '19') : this.setAttribute("height", '');
}

})(); // function wrapper for Opera