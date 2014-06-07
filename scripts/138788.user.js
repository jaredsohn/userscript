// ==UserScript==
// @name        Erply Barcode Labeling
// @namespace   erply.com
// @author      Ryan Alberts
// @description Printing Barcode Labels
// @include     https://*.erply.com/*/*popup.php*label*
// @include     http://*.erply.com/*/*popup.php*label*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1.2
// ==/UserScript==

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];

	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
};

addCss(
	'.prod { width: 57mm ! important; height: 12mm ! important; }'
);


//Check to make sure we are looking at the barcode printing popup
if(document.getElementsByClassName('prodframe') && document.getElementsByClassName('prodframe')[0]) {
	
	addCss('.title { height: 10mm ! important; } ');
	addCss('.ean_in_right_side { height: 10mm ! important; } ');
	addCss('.ean { padding-top: 10px; } ');
	//addCss('.prod_name { padding-top: 10px; } ');
	addCss('.ean_in_right_side { width: 25mm ! important; } ');

	var barcodes = document.evaluate("//img",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	for (var i = barcodes.snapshotLength - 1; i >= 0; i--) {
		var img = barcodes.snapshotItem(i);
		img.width = "110";
		img.height = "25";
	}	

}