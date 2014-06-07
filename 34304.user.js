// ==UserScript==
// @name           The Register - Remove Ads
// @namespace      http://googatrix.googlepages.com
// @description    Removes ads and nonsense from The Register (works with new layout Sep 2008)
// @include        *theregister.co.uk*
// @include        *channelregister.co.uk*
// @include        *reghardware.co.uk*
// ==/UserScript==

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function removeElementById( sId )
{
	if( document.getElementById( sId ) != null )
	{
		var banner = document.getElementById( sId );
		banner.parentNode.removeChild( banner );
	}
}

// top of the page Google ads
removeElementById( "leader" );
// whitepaper link on top of article page
removeElementById( "top-text-link" );
// bottom of the page "More from the Register" box
removeElementById( "more-from-the-reg" );
// bottom of the page Google ads
removeElementById( "trailer" );
// whitepaper link at the end of an article
removeElementById( "tl-article-bottom" );
// Google ads at the bottom of article page
removeElementById( "google" );
// whitepapers at the bottom article page (theregister.co.uk)
removeElementById( "related-whitepapers" );
// whitepapers at the bottom article page (channelregister.co.uk)
removeElementById( "whitepapers" );
// whitepapers box in the middle of article page
removeElementById( "ad-mpu1-spot" );

// whitepaper at top and bottom of article
if( document.getElementById( "article" ) != null )
{
	var article 	= document.getElementById( "article" );
	var boxes		= article.childNodes;
		
	// now loop	through the boxes in the right column
	for( var i = 0; i < boxes.length; i++ )
	{
		if( boxes[i].nodeType == 1 && boxes[i].tagName.toLowerCase() == "p" && ( boxes[i].className == "wptl top" || boxes[i].className == "wptl btm" ) )
		{
			boxes[i].parentNode.removeChild( boxes[i] );
		}
	}
}

// various ad boxes on the right hand side
if( document.getElementById( "right-col" ) != null )
{
	var rightcol 	= document.getElementById( "right-col" );
	//var boxes		= rightcol.getElementsByTagName( "div" );
	var boxes		= rightcol.childNodes;
		
	// now loop	through the boxes in the right column
	for( var i = 0; i < boxes.length; i++ )
	{
		//GM_log( boxes[i].nodeType );
		if( ( boxes[i].nodeType == 1 && boxes[i].tagName.toLowerCase() == "div" ) && ( boxes[i].id == null || boxes[i].id != "hot" ) )
		{
			boxes[i].parentNode.removeChild( boxes[i] );
		}
	}
}

// turn all images to 50% opacity
/*
var imgs = document.getElementsByTagName( "img" );
for( var i = 0; i < imgs.length; i++ )
{
	imgs[i].style.MozOpacity = 0.5;
}
*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// end of the_register_-_remove_ad.user.js