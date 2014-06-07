// ==UserScript==
// @name          YouTube download link
// @namespace     www.pberndt.com
// @description   Adds a download link (including the t= parameter) to YouTube videos
// @include       *
// ==/UserScript==

var download_url = 'http://youtube.com/get_video?video_id=';
var tube_url = 'http://youtube.com/watch?v=';

if(document.location.href.match(/www.youtube.com/))
	var players = document.evaluate("//embed[contains(@src, 'video_id')]", document, null, XPathResult.ANY_TYPE, null); 
else
	var players = document.evaluate("//embed[contains(@src, 'http://www.youtube.com/')]", document, null, XPathResult.ANY_TYPE, null); 

var player = players.iterateNext(); 
while(player) {
	if(player.src.match(/video_id=([^(\&|$)]*)/))
		var video_id = player.src.match(/video_id=([^(\&|$)]*)/)[1];
	else
		var video_id = player.src.match(/v\/([^(\&|$)]*)/)[1];

	GM_xmlhttpRequest({
		method: "GET",
		url: tube_url + video_id,
		onload: function(details) {
			var t = details.responseText.match(/&t=([^&"]+)/)[1];
			var v = details.responseText.match(/\?v=([^&"]+)/)[1];

			var player = document.evaluate("//embed[contains(@src, '" + v + "')]", document, null, XPathResult.ANY_TYPE, null);
			player = player.iterateNext();

			var newSrc = download_url + v + "&t=" + t;
			var link = document.createElement("a");
			link.innerHTML = "Download";
			link.href = newSrc;
			player.parentNode.insertBefore(link, player.nextSibling);

		}});

	player = players.iterateNext();
}
