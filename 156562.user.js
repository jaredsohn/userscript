// ==UserScript==
// @name  	 		SoundCloud Downloader - Technowise
// @namespace  		http://www.technowise.in
// @author	 		Technowise
// @description		Adds download links to all soundcloud tracks. *Works for the new Soundcloud website interface*
// @include			http://www.soundcloud.com/*
// @include			http://soundcloud.com/*
// @include			https://www.soundcloud.com/*
// @include			https://soundcloud.com/*
// @version			0.6
// ==/UserScript==
//-------------------------------------------------------------------------------------------

var scdlr = {};
scdlr.JQ = null;
scdlr.myUnsafeWindow = null;
scdlr.clientId = 'b45b1aa10f1ac2941910a7f0d10f8e28';
scdlr.addDownloadButton= function ( sound )
{
	if( scdlr.JQ(sound).find(".sc-button-download").length == 0 )//No download button found, lets add one.
	{	
		var downloadLink = scdlr.JQ(document.createElement("a") );
		anchor = scdlr.JQ(sound).find(".soundTitle__title").eq(0);
		var resolveUrl = null, buttonClass=null;
		if( scdlr.JQ(sound).is(".single") )
		{
			resolveUrl = document.location.href;
			buttonClass = 'sc-button sc-button-download sc-button-medium sc-button-icon sc-button-responsive'
		}
		else
		{
			resolveUrl = 'https://soundcloud.com'+anchor.attr("href");
			buttonClass = 'sc-button sc-button-download sc-button-small sc-button-icon sc-button-responsive';
		}

		downloadLink.attr({ 
			'title': 'Download',
			'name': 'Download',
			'target': '_blank',
			'download':	anchor.text(),
			'class': buttonClass
		});

		scdlr.JQ.getJSON("https://api.soundcloud.com/resolve.json?callback=?", {url: resolveUrl, client_id:scdlr.clientId}, function(track)
		{				
			trackId = track.id.toString();
			scdlr.JQ.getJSON("https://api.soundcloud.com/i1/tracks/"+trackId+"/streams?callback=?", {client_id:scdlr.clientId}, function( data )
			{
				downloadLink.attr("href", data.http_mp3_128_url);
				downloadLink.attr("id", 'track-'+trackId);
			});				
		});			
		
		scdlr.JQ(sound).find(".soundActions .sc-button-group:first").eq(0).append(downloadLink);
	}
}

function myMain()
{	
	scdlr.JQ(".sound").not(".playlist").each( function()
	{
		scdlr.addDownloadButton( this );
	});
	
	if( scdlr.JQ(".trackList").length > 0 )//We have a playlist, add download link to each item in the playlist.
	{
		scdlr.JQ(".trackList .trackList__listItem").each( function ()
		{
			scdlr.addDownloadButton( this );
		});
	}
}

function GM_wait() 
{
	if( typeof unsafeWindow != 'undefined')
	{
		scdlr.myUnsafeWindow = unsafeWindow;
	}
	else if( window.navigator.vendor.match(/Google/) )
	{	
		scdlr.myUnsafeWindow = (function()
		{
			var el = document.createElement('p');
			el.setAttribute('onclick', 'return window;');
			return el.onclick();
		}());
	}
	if(typeof scdlr.myUnsafeWindow.jQuery == 'undefined')
	{ 
		window.setTimeout(GM_wait,200); 
	}
	else 
	{
		scdlr.JQ = scdlr.myUnsafeWindow.jQuery;
		myMain();
		setInterval(myMain, 3000);//Check for new tracks and update with download links every 3 seconds.
	}
}
GM_wait();
