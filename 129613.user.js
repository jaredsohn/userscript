// ==UserScript==
// @name           NyaaTorrents Download Redirector
// @version        0.12
// @description    Redirects immediately to the download link when on a NyaaTorrents torrent info page.
// @include        http://www.nyaa.eu/?page=torrentinfo&tid=*
// @namespace      http://scripts.lewisl.net
// ==/UserScript==

function IsNyaaTorrentPage(url)
{
	return ( url.substr(0,41) == "http://www.nyaa.eu/?page=torrentinfo&tid=" );
}

function NyaaRedirect(url)
{
	url = url.replace( "?page=torrentinfo&tid=" , "?page=download&tid=" );
	return url;
}

(function() {

if(!document.location.href.match(/http:\/\/[a-zA-Z\.]*nyaa\.eu\//)){return;}

if( IsNyaaTorrentPage( document.location.href ) )
{
	var newUrl = NyaaRedirect( document.location.href );
	if( newUrl != document.location.href )
	{
		document.location.assign(newUrl);
	}
}

})();
