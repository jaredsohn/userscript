// ==UserScript==
// @name           Give me the MP3
// @namespace      mevio.com
// @description    Pull the mp3 link out instead of using the annoying in-page flash player
// @include        http://curry.mevio.com/
// ==/UserScript==

// ==UserScript==
// @name           Give me the MP3
// @namespace      mevio.com
// @description    Pull the mp3 link out instead of using the annoying in-page flash player
// @include        http://curry.mevio.com/*
// ==/UserScript==


var allFlashParams, fp;
allFlashParams = document.evaluate(
	'//param[@name="FlashVars"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allFlashParams.snapshotLength; i++) 
{
	fp = allFlashParams.snapshotItem(i);
	var ma = fp.attributes.getNamedItem("value").value.match(/soundFile=([^&]+)/);
   if(ma.length > 1)
   {
      var newP = document.createElement("p");
      var newLink = document.createElement("a");
      newLink.href = unescape(ma[1]);
      newLink.innerHTML = "MP3 link";
      newP.appendChild(newLink);
      fp.parentNode.parentNode.parentNode.insertBefore(newP, fp.parentNode.parentNode);
   }
}