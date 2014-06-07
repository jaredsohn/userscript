// ==UserScript==
// @name           Subreddit Background Image Toggle
// @description    Removes custom background images that some Subreddits use. Can then toggle the image on/off with a hotkey (F2 is default)
// @include        http://www.reddit.com/r/*
// @version        2011-02-19
// ==/UserScript==


// option to remove BG image when loading the page
var removeOnPageLoad = true;

// option to enable/disable image toggling
var enableToggling = true;

// the key code for toggling. The default is F2 (code 113)
var hotkeyCode = 113;    


// simple stylesheet for clearing the background
var noBGstyle = document.createElement( "style" );
noBGstyle.id = "noBGstylesheet";
noBGstyle.innerHTML = "body { background: none; !important }";

// starting state on page load
if ( removeOnPageLoad )
{
    document.getElementsByTagName( "head" )[0].appendChild( noBGstyle );
}

if ( enableToggling )
{
    window.addEventListener( "keypress", toggleBackground, true );
}

function toggleBackground( e ) 
{
    if ( e.keyCode == hotkeyCode ) 
    {
		if ( null == document.getElementById( "noBGstylesheet" ) )
        {   // create and add it
			document.getElementsByTagName( "head" )[0].appendChild( noBGstyle );
		}
        else 
        {   // in use so remove it
			document.getElementsByTagName( "head" )[0].removeChild( noBGstyle );
		} 
	}
}

