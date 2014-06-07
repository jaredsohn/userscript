// ==UserScript==
// @name           wot google clear
// @namespace      google
// @description    Requires WOT Firefox extension! Clears any dangerous result in google, so only the green ones are shown.
// @include        http://www.google*
// ==/UserScript==

function xpath(query) {
return document.evaluate(query, document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

window.addEventListener(
'load',
function() { 

	var q="//div";
	allDivs=xpath(q);
	GM_log("Count: " + allDivs.snapshotLength);

	for (var i = 0; i < allDivs.snapshotLength; i++) 
		{
			thisDiv = allDivs.snapshotItem(i);
			thisBack= getComputedStyle(thisDiv, '').getPropertyValue("background-image");
			var lid=thisBack.lastIndexOf('(');
			var thisBackFile= thisBack.substring(lid+1,thisBack.length-1);
			if ((thisBackFile)&&(thisBackFile!='non'))  
			{
				
				switch(thisBackFile)
				{
				case 'chrome://wot/skin/fusion/16_16/plain/not_safe.png':
					thisDiv.parentNode.style.display='none';
					GM_log("back: "+thisBackFile);
					break;
				case 'chrome://wot/skin/fusion/16_16/plain/danger.png':
					thisDiv.parentNode.style.display='none';
					GM_log("back: "+thisBackFile);
					break;
				}
			}
		}

},
true);

