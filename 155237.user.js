// ==UserScript==
// @name  	 		Soundcloud Downloader - Technowise
// @namespace  		http://www.technowise.in
// @author	 		Technowise
// @description		Adds download links to all soundcloud tracks.
// @include			http://www.soundcloud.com/*
// @include			http://soundcloud.com/*
// @include			https://www.soundcloud.com/*
// @include			https://soundcloud.com/*
// @version			0.53
// ==/UserScript==
//-------------------------------------------------------------------------------------------

var JQ = null;
var myUnsafeWindow = null;

function myMain()
{
	
	if( JQ(".sound").length == 0 )//We do not have sounds loaded yet, lets wait a few seconds.
	{
		return;
	}
	else
	JQ(".sound").each( function()
	{
		if( JQ(this).find(".sc-button-download").length == 0 )//No download button found, lets add one.
		{
			var downloadLink = JQ(document.createElement("a") );
			anchor = JQ(this).find(".soundTitle__title").eq(0);
			var resolveUrl = null, buttonClass=null;
			if( JQ(this).is(".single") )
			{
				resolveUrl = document.location.href;
				buttonClass = 'sc-button sc-button-download sc-button-medium sc-button-icon sc-button-responsive'
			}
			else
			{
				resolveUrl = 'https://soundcloud.com'+anchor.attr("href");
				buttonClass= 'sc-button sc-button-download sc-button-small sc-button-icon sc-button-responsive';
			}

			downloadLink.attr({ 
				'title': 'Download',
				'name': 'Download',
				'target': '_blank',
				'download':	anchor.text(),
				'class': buttonClass
			});
			
			JQ.getJSON("https://api.soundcloud.com/resolve.json", {url: resolveUrl, client_id:'b45b1aa10f1ac2941910a7f0d10f8e28'  }, function(track)
			{
				trackId = track.id.toString();
				JQ.getJSON("https://api.sndcdn.com/i1/tracks/"+trackId+"/streams?client_id=b45b1aa10f1ac2941910a7f0d10f8e28", function( data )
				{
					downloadLink.attr("href", data.http_mp3_128_url);
					downloadLink.attr("id", 'track-'+trackId);
				});			
			});	
			
			JQ(this).find(".soundActions .sc-button-group:first").eq(0).append(downloadLink);
		}
	});
}

function GM_wait() 
{
	if( typeof unsafeWindow != 'undefined')
	{
		myUnsafeWindow = unsafeWindow;
	}
	else if( window.navigator.vendor.match(/Google/) )
	{	
		myUnsafeWindow = (function() 
		{
			var el = document.createElement('p');
			el.setAttribute('onclick', 'return window;');
			return el.onclick();
		}());
	}
	if(typeof myUnsafeWindow.jQuery == 'undefined')
	{ 
		window.setTimeout(GM_wait,200); 
	}
	else 
	{
		JQ = myUnsafeWindow.jQuery;
		myMain();
		setInterval(myMain, 3000);//Check for new tracks and update with download links every 3 seconds.
	}
}

GM_wait();
