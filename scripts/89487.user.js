// ==UserScript==
// @name        Hobowars Strip Ads
// @version     1.1
// @copyright   2010, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Strip the ads out of hobowars
// @include     http://www.hobowars.com/*
// @exclude     http://support.hobowars.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

$( document ).ready( function(){
		$( "<div id='mylog' style='color: black'></div>" ).appendTo( "#wrapper" );
		function log( msg )
		{
			$( "#mylog" ).append( msg + "<br/>" );
		}

		// only delete contents if this page has an ad
		var ins = $( "#google_ads_frame1_anchor" );
		if( ins )
		{
			var adtable = ins.parents( "table" ).eq( 0 );
			if( adtable )
			{
				adtable.remove();
			}
		}
});

