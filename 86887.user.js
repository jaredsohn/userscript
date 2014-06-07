// ==UserScript==
// @name           GoogleLinkFix
// @namespace      http://userscripts.org/users/27225
// @description    Change the hyperlink in google results to point to the website directly
// @include        http://*.google.com*
// @include        http://*.google.pl*
// @include        https://*.google.com*
// @include        https://*.google.pl*
// ==/UserScript==

//FOR DEBUGGING
// if(unsafeWindow.console){
   // var GM_log = unsafeWindow.console.log;
// }


function wait(msecs)
{
var start = new Date().getTime();
var cur = start
while(cur - start < msecs)
{
cur = new Date().getTime();
}	
} 


function changeLinks(){
        wait(500);
	var findPattern = "//h3[@class='r']";
	var linkResults= document.evaluate( findPattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );	
	for(var x=0;x < linkResults.snapshotLength;x++){
		correctLinkItem = linkResults.snapshotItem(x);
		var correctLink = correctLinkItem.innerHTML;
		var index1 = correctLink.indexOf('onmousedown="');
		var index2 = correctLink.indexOf('"',index1+'onmousedown="'.length);
		var index3 = correctLink.indexOf('" class');
		if(index1 != -1)


GM_log(correctLink.substring(index3-index1,index1-12));
GM_log(correctLink.substring(index2));



// Add something to the below line to put something next to each search result.
correctLinkItem.innerHTML =  correctLink.substring(index3-index1,index1-12) + '#' + x + correctLink.substring(index2);


	}
}

window.addEventListener('load', function() { changeLinks(); }, false);
