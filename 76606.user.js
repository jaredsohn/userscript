// ==UserScript==
// @name           MangaToshokan Chapter Loader
// @namespace      sillymokona
// @include        http://www.mangatoshokan.com/read/*
// ==/UserScript==

function loadPage( url, img )
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
		if( xhr.readyState == 4 && xhr.status == 200 )
		{
			var imgSrc = xhr.responseText.replace( /\n/gm, "" ).match( /<img[^>]+id="readerPage"[^>]+>/ )[0].match( /src="([^"]+)"/ )[1];
			img.addEventListener( "error", function imgError( e ) {
				img.removeEventListener( "error", imgError, true );
				img.addEventListener( "error", imgError, true );
				img.src = img.src.replace( /#.+$/, "" ) + "#" + new Date().getTime();
			}, true );
			img.src = imgSrc;
		}
	};
    xhr.open( "GET", page, true );
    xhr.send( null );
}

var script = document.createElement( "script" );
script.type = "text/javascript";
script.innerHTML = "document.body.onload = '';";
document.body.appendChild( script );

var container = document.getElementsByClassName( 'rpage' )[0];
while( container.hasChildNodes() )
{
    container.removeChild( container.firstChild );
}

var pageSelect = document.getElementsByClassName( 'headerSelect' )[0];
for( var i = 0; i < pageSelect.options.length; i++ )
{
    var page = "http://" + document.domain + pageSelect.options[i].value;
	var div = document.createElement( "div" );
	div.style.display = "block";
	div.style.marginLeft = "auto";
	div.style.marginRight = "auto";
	var img = document.createElement( "img" );
	img.alt = "Loading page " + pageSelect.options[i].innerHTML;
	div.appendChild( img );
	container.appendChild( div );
	loadPage( page, img );
}
pageSelect.parentNode.parentNode.removeChild( pageSelect.parentNode );