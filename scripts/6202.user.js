// ==UserScript==
// @name           IGN Movie Downloader
// @author         Phillip Collier
// @namespace      http://nowhereyet/
// @description    Downloads videos from IGN media pages
// @include        http://media.*.ign.com/*
// ==/UserScript==

(function()
{
	s = document.getElementsByTagName("script");
	for( var i = 0; i < s.length; i++ )
	{
		var bURL = s[i].text.indexOf("downloadURL");
		if( bURL != -1 )
		{
			var eURL = s[i].text.indexOf("&",bURL);
			if( eURL == -1 )
				var downloadURL = s[i].text.substring(bURL + 12);
			else
				var downloadURL = s[i].text.substring(bURL + 12, eURL );
			window.location.replace( downloadURL );
			break;
		}
	}
})();