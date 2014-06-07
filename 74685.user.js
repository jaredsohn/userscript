// ==UserScript==
// @name           MangaFox Chapter Loader
// @namespace      sillymokona
// @include        http://www.mangafox.com/manga/*
// ==/UserScript==

if( window.top == window.self )
{
    var userAgent = navigator.userAgent.match( /(chrome|firefox)\/([0-9]+)/i );
    var browser = userAgent[1].toUpperCase();
    var browserVersion = parseInt( userAgent[2] );
    var href = window.location.href.split( "/" );
    var manga = href[4];
    var volume = document.URL.match( /\/(v[\d]+)\// );
    if( volume ) { volume = volume[1]; }
    var chapter = document.URL.match( /\/(c[.\d]+)\// );
    if( chapter ) { chapter = chapter[1]; }
    var body = document.body;
    var imageContainer;

	if( manga && chapter )
	{
		/*var adIds = [ "ad_top", "bottom_ads" ];
		for(var adIdIndex = adIds.length; --adIdIndex >= 0; )
		{
            var adId = adIds[adIdIndex];
			var ad = document.getElementById( adId );
			ad.parentNode.removeChild( ad );
		}
		
		var topBarIds = [ "top_left_bar", "top_center_bar", "top_right_bar" ];
		for(var topBarIdIndex = topBarIds.length; --topBarIdIndex >= 0; )
		{
            var topBarId = topBarIds[topBarIdIndex];
			var topBar = document.getElementById( topBarId );
			topBar.style.height = "50px";
		}*/
		
		var viewer = document.getElementById( "viewer" );
		var viewerTool = document.getElementById( "tool" )
		var viewerChildren = viewer.childNodes;
		var viewerChildCount = viewerChildren.length;
		for( var viewerChildIndex = viewerChildCount; --viewerChildIndex >= 0; )
		{
			var viewerChild = viewerChildren[viewerChildIndex];
			if( viewerTool != viewerChild )
			{
				viewer.removeChild( viewerChild );
			}
		}
		
		imageContainer = document.createElement( "div" );
		viewer.appendChild( imageContainer );
		
		var pageSelectFound = false;
		var selects = document.getElementsByTagName( "select" );
		for(var selectIndex = selects.length; --selectIndex >= 0; )
		{
            var select = selects[selectIndex];
			if( select.className == "m" )
			{
				if( !pageSelectFound )
				{
					pageSelectFound = true;
					for(var optionIndex = 0; optionIndex < select.options.length; optionIndex++)
					{
                        var pageSelectOption = select.options[optionIndex];
						var pageURL = volume ? [
							"http://www.mangafox.com/manga",
							manga,
							volume,
							chapter,
							pageSelectOption.value + ".html"
						].join( "/" ) : [
							"http://www.mangafox.com/manga",
							manga,
							chapter,
							pageSelectOption.value + ".html"
						].join( "/" );
						var image = document.createElement( "img" );
						image.style.marginLeft = "auto";
						image.style.marginRight = "auto";
						image.style.display = "block";
						imageContainer.appendChild( image );
						getPage( pageURL, image );
					}
				}
			}
		}
		
		var pageControls = document.getElementsByClassName( "right middle" );
		for( var pageControlIndex = pageControls.length; --pageControlIndex >= 0; )
		{
			var pageControl = pageControls[pageControlIndex];
			pageControl.parentNode.removeChild( pageControl );
		}
		
		viewerTool.style.width = "740px"
		viewerTool.style.border = "5px solid #A9A9A9";
		viewerTool.style.marginLeft = "auto";
		viewerTool.style.marginRight = "auto";
		viewer.style.width = "100%";
		viewer.style.border = "none";
		viewer.style.background = "none";
	}
}

function getPage( pageURL, image )
{
	makeXmlHttpRequest( pageURL, function( response ) {
		var imgTag = response.responseText.match( /<img[^>]+id[^>]+image[^>]+>/ );
		if( imgTag )
		{
			var imgSrc = imgTag[0].match( /src="([^"]+)"/ );
			if( imgSrc && imgSrc.length > 1 )
			{
				image.src = imgSrc[1];
			}
		}
	} );
}

function makeXmlHttpRequest( url, callback )
{
	if( browser == "CHROME" )
	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if( xhr.readyState == 4 )
			{
				if( xhr.status == 200 )
				{
					callback( xhr );
				}
				else
				{
					/*alert( "There has been an error with retrieving data from MangaFox's site. Please refresh the page to try again." );*/
                    makeXmlHttpRequest(url, callback);
				}
			}
		};
		xhr.open( "GET", url, true );
		xhr.send( null );
	}
	else
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: callback,
			onerror: function(response) {
				alert( "There has been an error with retrieving data from MangaFox's site. Please refresh the page to try again." );
			}
		});
	}
}