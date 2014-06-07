// ==UserScript==
// @name           Stream MP3 in Winamp
// @namespace      Stream MP3 in Winamp
// @description    When clicking a link to an mp3 it will directly stream it in Winamp
// @include        *
// ==/UserScript==

(function() {
	var links = document.getElementsByTagName("a");

	for(i=0;i < links.length;i++)
	{
		var a = links[i];
		if(a.href.indexOf(".mp3")>0 || a.href.indexOf("%2Emp3")>0)
		{
			a.setAttribute('href',"data:audio/x-mpegurl, "+encodeURIComponent('#EXTM3U\n')+a.href);
			a.setAttribute('style',"background: yellow;text-decoration:underline;");
			a.innerHTML+=" << stream";
			a.setAttribute('onclick',"location.href=data:audio/x-mpegurl, " +encodeURIComponent('#EXTM3U\n')+a.href);
		}
	}
})();

 