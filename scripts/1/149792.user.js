// ==UserScript==
// @name        PassThePopcorn - Easily add source-encode comparison images
// @description Makes it easy to convert the HTML source of the source-encode comparison images to BBCode to use it on PassThePopcorn. v2012.01.09. by TnS
// @homepage    http://userscripts.org/scripts/show/122679
// @namespace   http://greasemonkey.mozdev.com
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @include     
// @include     
// ==/UserScript==

$( "#release_desc" ).after( '<br><input type="button" id="ConvertComparisonCode" value="Convert comparison code">' );

$( "#ConvertComparisonCode" ).click( function()
{
	var releaseNotes = $( "#release_desc" );

	var text = releaseNotes.val().replace( /<b>/gi, "" );
	text = text.replace( /<\/b>/gi, "" );
	text = text.replace( /<br>/gi, "\n" );
	text = text.replace( /&nbsp;/gi, " " );
	// E.g.: <a href="http://www.imagebam.com/image/50a6ce137826241" target="_blank"><img id="ncode_imageresizer_container_1" src="http://thumbnails43.imagebam.com/13783/50a6ce137826241.jpg" alt="" onload="NcodeImageResizer.createOn(this);" border="0"></a>
	text = text.replace( /<a.*?href="(.+?)".*?><img.*?src="(.+?)".*?>.*?<\/a>/gi, "[url=$1][img]$2[/img][/url]" );

	releaseNotes.val( text );
} );