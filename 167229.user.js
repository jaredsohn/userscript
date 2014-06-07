// ==UserScript==
// @name        Watch Youtube Videos In VLC
// @description Watch Youtube Videos In VLC via VLC's HTTP Command Interface
// @include     http*://www.youtube.com/*
// @version     3
// @grant       none
// ==/UserScript==

baseVlcCmdUrl1 = "http://127.0.0.1:6669/requests/status.xml?command=in_";
baseVlcCmdUrl2 = "&input=";
vlcCmdPlayUrl = baseVlcCmdUrl1 + "play" + baseVlcCmdUrl2;
vlcCmdEnqueueUrl = baseVlcCmdUrl1 + "enqueue" + baseVlcCmdUrl2;

var res = document.evaluate("//a[contains(@href,'/watch?v=')]", document, null, 7, null);

snapshotLen = res.snapshotLength;
for(i = 0; i < snapshotLen; ++i)
{
	currentAnchor = res.snapshotItem(i);
	relativeVidPath = currentAnchor.href;
	if(relativeVidPath.length > 0) //eh, what?
	{
		youtubeUrlURIencoded = encodeURIComponent("http://www.youtube.com" + relativeVidPath);
		vlcCmdUrl = vlcCmdPlayUrl + youtubeUrlURIencoded;
		currentAnchor.href = vlcCmdUrl;
		
		if(location.pathname == '/results') //adding Enqueue to front page messes everything up
		{
			var enqueueAnchor = document.createElement("a");
			enqueueAnchor.href = vlcCmdEnqueueUrl + youtubeUrlURIencoded;
			enqueueAnchor.innerHTML = "Enqueue";
			currentAnchor.parentNode.insertBefore(enqueueAnchor, currentAnchor.nextSibling); //insert after hack (LOL JS)
			var spacePrettyIfy = document.createElement("span");
			spacePrettyIfy.innerHTML = " - ";
			currentAnchor.parentNode.insertBefore(spacePrettyIfy, currentAnchor.nextSibling);
		}
	}
}

if(location.pathname == '/watch')
{
	vlcCmdUrl = vlcCmdPlayUrl + encodeURIComponent(location.href);
	GM_xmlhttpRequest({ method: "GET", url: vlcCmdUrl, onload: function(response) { }});
}