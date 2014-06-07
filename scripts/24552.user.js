// ==UserScript==
// @name           Preview Tiny Urls
// @namespace      http://diggrocksdon.tyouknow.yeah/woot
// @description    Automatically changes all tinyurl links to preview.tinyurl, so that you know where they are trying to send you.
// @include        *
// @exclude	   http://tinyurl.com/create.php
// @exclude	   http://tinyurl.com/#*
// ==/UserScript==

var myScript = function(){
	var xpathResult = document.evaluate('//a', document, null, 0, null);
	var outArray = new Array();
	while ((outArray[outArray.length] = xpathResult.iterateNext())){}
	for (var x in outArray){
		if(outArray[x].href.toLowerCase().split("\/")[2]=="tinyurl.com")
			outArray[x].href="http\:\/\/preview.tinyurl.com\/"+outArray[x].href.split("\/")[3];
	}
}
myScript();