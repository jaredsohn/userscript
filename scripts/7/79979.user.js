// ==UserScript==
// @name           MangaStream Chapter Loader
// @namespace      znogav
// @include        http://www.mangastream.com/read/*
// @include        http://mangastream.com/read/*
// ==/UserScript==

if( window.top == window.self )
{
	var userAgent = navigator.userAgent.match( /(chrome|firefox)\/([0-9]+)/i );
	var browser = userAgent[1].toUpperCase();
	var browserVersion = parseInt( userAgent[2] );
	var href = window.location.href.split( "/" );
	var manga = href[4];
	var chapterid = href[5];
	var body = document.body;
	var imageContainer;

	if( manga && chapterid )
	{		
		document.getElementsByTagName("body")[0].style.backgroundColor = "#cccccc";
		document.getElementById("contentwrap").style.backgroundColor = "#cccccc";
		document.getElementById("page").style.backgroundColor = "#cccccc";
		
		var nextprev = document.getElementsByClassName("nextprev");
		for( var i = nextprev.length; --i >= 0; )
		{
			nextprev[i].parentNode.removeChild( nextprev[i] );
		}
				
		var pagenav0 = document.getElementsByClassName("pagenav")[0];
		var divpage = pagenav0.parentNode;
		var pagenav1 = document.getElementsByClassName("pagenav")[1];;
		
		var imageContainer0 = pagenav0.nextSibling;
		while (imageContainer0.nodeType != 1) {
			imageContainer0 = imageContainer0.nextSibling;
		}
		imageContainer0.style.marginBottom = "30px";
		
		var pageSelectFound = false;
		var selects = document.getElementsByTagName( "select" );
		var select = selects[1];
		
		var i=1;
		function getNextImage(){
			if (i<select.options.length){
				var pageSelectOption = select.options[i];
				var pageMark = pageSelectOption.value;
				var pageURL = "http://www.mangastream.com"+pageMark;		
				var imageContainer = document.createElement( "div" );
				divpage.insertBefore( imageContainer, pagenav1 );
				getPage( pageURL, imageContainer, getNextImage);
				i++;
			}
		}
		getNextImage();
		
		var chaptercontrols = document.getElementsByClassName("chaptercontrols");
		chaptercontrols[1].parentNode.removeChild(chaptercontrols[1]);
		var chaptercontrol = chaptercontrols[0];
		var chchilds = chaptercontrol.childNodes;
		var j = 0;
		while (chchilds[j].nodeName.toLowerCase() != "select") 
			++j;
		for (var k = chchilds.length; --k > j;)
		{
			chaptercontrol.removeChild(chchilds[k]);
		}		
	}
}

function getPage( pageURL, imageContainer, callback )
{
	makeXmlHttpRequest( pageURL, function( response ) {
		imageContainer.style.marginBottom = "30px";
		var imgTag = response.responseText.match( /<a[^>]+href[^>]+\/read\/[^>]+>+<img[^>]+>+<\/a>/g );
		if( imgTag )
		{
			if ( imgTag.length == 1){
				var image = document.createElement( "img" );				
				image.onLoad = (function(){ 
					callback();
				})();
				imageContainer.appendChild( image );
				var imgSrc = imgTag[0].match( /src="([^"]+)"/ );
				image.src = imgSrc[1];
			} else {
				var div0 = document.createElement("div");
				div0.style.position = "relative";
				imageContainer.appendChild(div0);
				var style = response.responseText.match( /<div style="position:relative[^>]+>/ );
				arr = (/width:([\d]+).*height:([\d]+)/).exec(style[0]);						
				var info = {width: arr[1], height: arr[2]};
				div0.style.width = info.width + "px";
				div0.style.height = info.height + "px";		
				
				//style = response.responseText.match( /<style[^>]+>[\s|\S]+<\/style>/ );
				style = response.responseText.match( /<div style="position:absolute[^>]+>.*<\/div>/g );
				var loadedImage = 0;
				for (var i=0; i<style.length; i++){
					var css = style[i].match( /style="position:absolute[^"]+"/ );
					arr = (/z-index:([\d]+).*width:([\d]+).*height:([\d]+).*top:([\d]+).*left:([\d]+)/).exec(css[0]);						
					info = {zIndex: arr[1], width: arr[2], height: arr[3], top: arr[4], left: arr[5]};
					var div = document.createElement("div");
					div0.appendChild(div);
					div.style.position = "absolute";
					div.style.zIndex = info.zIndex;
					div.style.width = info.width + "px";
					div.style.height = info.height + "px";
					div.style.top = info.top + "px";
					div.style.left = info.left + "px";
					var image = document.createElement("img");
					image.onLoad = (function(){
						loadedImage++;
						if (loadedImage == style.length){
							callback();
						}
					})();
					div.appendChild(image);
					var imgSrc = style[i].match(/img src="([^"]+)"/);
					image.src = imgSrc[1];
				}
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
					alert( "There has been an error with retrieving data from MangaStream's site. Please refresh the page to try again." );
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
				alert( "There has been an error with retrieving data from MangaStream's site. Please refresh the page to try again." );
			}
		});
	}
}