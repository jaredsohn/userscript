// ==UserScript==
// @name           kikarhashabat VOD ads remover
// @namespace      http://techplusil.wordpress.com/
// @description    change player in kikarhashabat
// @include        http://www.kikarhashabat.co.il/*
// ==/UserScript==

(function()
{
    var res = document.evaluate('//*[starts-with(@id,"artmedia_flowplayer")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//for each player replace with html5 video tag
	for (var i=0;i<res.snapshotLength;i++ )
	{
		var fff = res.snapshotItem(i);
		var jso0 = unescape(fff.innerHTML.split("m4v")[0]);
		var begin = jso0.lastIndexOf("http");
		var url = jso0.slice(begin,jso0.length) +"m4v";
		var vidDiv = document.createElement("video");
		vidDiv.setAttribute("controls","true");
		vidDiv.setAttribute("width","100%");
		vidDiv.setAttribute("height","100%");
		var srcDiv = document.createElement("source");
		srcDiv.src = url;
		srcDiv.type = "video/mp4";
		vidDiv.appendChild(srcDiv);
		fff.parentNode.replaceChild(vidDiv, fff);
	}
})();