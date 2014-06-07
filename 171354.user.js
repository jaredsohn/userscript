// ==UserScript==
// @name           holesinthenet VOD
// @namespace      http://techplusil.wordpress.com/
// @description    change player in holesinthenet
// @include        http://www.holesinthenet.co.il/*
// ==/UserScript==

(function()
{
	var res = document.evaluate('//*[starts-with(@id,"player")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//for each player replace with html5 video tag
	for (var i=0;i<res.snapshotLength;i++ )
 	{
                var fff = res.snapshotItem(i);
		var vidDiv = document.createElement("video");
		vidDiv.setAttribute("controls","true");
                vidDiv.setAttribute("width","100%");
		var srcDiv = document.createElement("source");
		srcDiv.src = fff.getAttribute("url");
		srcDiv.type = "video/mp4";
		vidDiv.appendChild(srcDiv);
		fff.parentNode.replaceChild(vidDiv, fff);
	}
})();