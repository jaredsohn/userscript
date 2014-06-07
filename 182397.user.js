// ==UserScript==
// @name        Jenkins Console Parser - Link for Screenshots
// @namespace   lr
// @include     http://*/job/*
// @version     1
// @grant       none.
// @author 		Laurynas Remeika
// Thanks to Andrius & Mindaugas for their contribution :)
// ==/UserScript==

//var patternScreenshot = "[\s\.,;]*target[^/]*.png*";
var patternScreenshot = "[\s\.,;]*target[^\]*?.png";
var patternLocation = "[^\S,;]*job/[^/]*/";

var blocks = document.querySelectorAll ("pre");
//alert(blocks.length);
for (var J = blocks.length-1;  J >= 0; --J) { 
    var block = blocks[J]; 
	var findScreenshot = block.innerHTML.match(patternScreenshot);

	if (findScreenshot != null) {				
		for (var Y = 0; findScreenshot.length; Y++) {

			//alert(findScreenshot[0])
			var screenshotLocationFixed = findScreenshot[Y].replace( /\\/g, '/');	
			
			var site = document.URL;
			var findSite = site.match(patternLocation)[0];
			
			var newElement          = document.createElement ("a");
			var newURL              = findSite + 'ws/' + screenshotLocationFixed;    
			newElement.innerHTML    = '&nbsp;&nbsp;<a href="' + newURL + '">CLICK TO SEE SCREENSHOT</a>';

			InsertNodeAfter(newElement, block);
		}
	}
} 


function InsertNodeAfter(newElement, targetElement) {
    var parent  = targetElement.parentNode;
    if (parent.lastChild == targetElement)
        parent.appendChild  (newElement);
    else
        parent.insertBefore (newElement, targetElement.nextSibling);
}
