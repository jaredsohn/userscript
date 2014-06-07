// SuperWebClip
// version 0.5 BETA
// 2007-NOV-26
// Copyright (c) 2007, Jorge Monasterio
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// HISTORY
//	0.5 26-NOV-2007 Added background color support.
//	0.4 20-NOV-2007 Minimum reload clip = 15 seconds.
//	0.3 20-NOV-2007 Added &__reloadclip=XX, to reload clip every XXX seconds.
//	0.2	13-NOV-2007	Fixed problem with cssclip where nested clips didn't always move up to top/left corner.
//	0.1	9-NOV-2007	First version
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           SuperWebClip
// @namespace      logonpro.com
// @description    Show part of a web page "clipped" from the rest. The remainder of the page is hidden.
// @include        *__cssclip=*
// @include        *__rectclip=*
// @include        *__reloadclip=*
// @include        *__bgcolorclip=*
// @version	  		0.4
// ==/UserScript==
//
// This greasemonkey script works VERY differently from most scripts. By appending special text on the
//		end of any URL, you can force this script to run and "crop" content from the returned page. You can also
//		force the clip to be reloaded every X seconds.
//
// You can then, for example, take the new URL and use it in NETVIBES or other mashup. That way you can "clip"
//		live content from any web page and stick it into your mashup.
//
// There are several params currently supported:
//
//		1. Append &__cssclip=cssselector to the URL. The css selector can be any valid css selector such as TABLE, or .class or #name. You figure out the proper css selector by examining the html on the page you want to clip content from.
//			EXAMPLE: http://userscripts.org/scripts/search?q=meebo+blog&__cssclip=td[class='inv lp']
//
//			TIP: The __cssclip param should be escaped, because many CSS characters are not valid in a URL. To figure out the escape text enter this url in your browser:
//					javascript:alert(escape("#header"))
//
//		2. Append &__rectclip=Top,Left,Bottom,Right to the URL. The coordinates define a rectangle in pixels that you want to clip from the page -- very dependent on font-size and page-content but may work for you.
//			EXAMPLE: http://userscripts.org/scripts/search?q=meebo+blog&__rectclip=240,430,100,70
//
//		3. Append &__reloadclip=seconds to the URL. The 'seconds' parameter is a value like "30" to reload the clip every 30 seconds. This parameter can be combined with others.
//			EXAMPLE: http://userscripts.org/scripts/search?q=meebo+blog&__rectclip=240,430,100,70&__reloadclip=30
//
//		4. Append &__bgcolorclip=csscolor to the URL. The 'csscolor' parameter is a value like "white" or "#ffffff" to change backcolor of clip.
//			EXAMPLE: http://userscripts.org/scripts/search?q=meebo+blog&__rectclip=240,430,100,70&__bgcolorclip=blue
//
//
//-- NetVibes instructions --
//(1) Test your url, like examples above in your browser (outside of netvibes) until you get the clip right.
//(2) In NetVibes, Click "add content" then "external widgets" then "web page".
//(3) Click "edit" on the new widget.
//(4) Take the URL with appended params (like EXAMPLES above) and put it in the URL field.
//(5) Click OK.
//
//-- PageFlakes instruction --
//(1) Test your url, like examples above in your browser (outside of PageFlakes) until you get the clip right.
//(2) In PageFlakes, click on the flake in top right corner to add a new flake. Browse for the "Bitty Browser" flake.
//(3) Edit the flake: Choose "Icon Only".  Search Bar "off". And set HomePage to "Web site Url". Then set your url in the box labelled: >>
//(4) Click save.
//
(function()
	{
   	var query = document.location.search;

   	// PARSE QUERY -- From : http://www.bennadel.com/blog/695-Ask-Ben-Getting-Query-String-Values-In-JavaScript.htm

   	// Build an empty URL structure in which we will store
	// the individual query values by key.
	var queryParams = new Object();

	// Use the String::replace method to iterate over each
	// name-value pair in the query string. Location.search
	// gives us the query string (if it exists).
	query.replace(
	new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
		// For each matched query string pair, add that
		// pair to the URL struct using the pre-equals
		// value as the key.
		function( $0, $1, $2, $3 ){
		queryParams[ $1 ] = $3
		}
		);

	// Loop over the URL values that we collected.
	for (var strKey in queryParams)
	{
		// Clip by CSS selector
		if( strKey == "__cssclip" )
		{
			// EXAMPLE: http://userscripts.org/scripts/search?q=meebo+blog&__cssclip=td[class='inv lp']
			// 	This is the selector: td[class'inv lp']

		   	var webClip = queryParams["__cssclip"];
		   	var selector = unescape(webClip);

		   	// SECURITY: Avoid { } in selector, to avoid called page adding extra CSS
		   	selector = selector.replace( "}", "");

			// Make only one element visible.
			GM_addStyle( 'body { visibility: hidden }');
			GM_addStyle( selector + ' { visibility: visible; position:fixed; left:0; top:0  } ');
		}

		// Clip by Top,Left,Width,Height
		// This is not so good, because it IS browser font-size dependent.
		// However, it may work for folks who don't understand CSS selectors.
		if( strKey == "__rectclip")
		{
			// EXAMPLE: http://userscripts.org/scripts/search?q=meebo+blog&__rectclip=240,430,100,70

			var rectClip = queryParams["__rectclip"];
			var coords=rectClip.split(",");

			var y=parseFloat(coords[0]);
			var x=parseFloat(coords[1]);
			var w=parseFloat(coords[2]);
			var h=parseFloat(coords[3]);

			var top=y;
			var right=x+w;
			var bottom=y+h;
			var left=x;

			GM_addStyle( 'html { position:absolute; width:' + w + 'px; height: ' + h + 'px; overflow:hidden  } ');
			GM_addStyle( 'body { position:absolute; clip:rect(' + top + 'px, ' + right + 'px, ' + bottom + 'px, ' + left + 'px); left:-' +x+ 'px; top:-' +y+ 'px; overflow:hidden } ');
		}

		// Reload in specified number of seconds.
	    if( strKey == "__reloadclip" )
	    {
	    	var reload = parseFloat( queryParams["__reloadclip"]);

			// arbitrarily limit the maximum refresh rate to 4-times-per-second.
			if( reload < 15.0)
	    	{
				reload = 15.0;
			}
			var time_out = reload*1000;

			window.setTimeout( reloadTimeout, time_out);
		}

		// Reload in specified number of seconds.
	    if( strKey == "__bgcolorclip" )
	    {
	    	var bc = queryParams["__bgcolorclip"];

			GM_addStyle( 'body { background-color: ' + bc + ' !important } ' );

		   	var webClip = queryParams["__cssclip"];
		   	if( webClip)
		   	{
			   	var selector = unescape(webClip);

			   	// SECURITY: Avoid { } in selector, to avoid called page adding extra CSS
			   	selector = selector.replace( "}", "");
				GM_addStyle( selector + ' { background-color: ' + bc + ' !important  } ');
		  	}

		}

	}

	function reloadTimeout()
	{
		this.location.href = this.location.href;
	}

  	})();