// Released under the GPL license v3.0
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name		MySpace Remove Ad Blocks
// @namespace		tag:polyhelix.org,2008-07-04:MySpaceRemoveAdBlocks
// @description		Removes various MySpace ad blocks, including sidebar and sponsored links in searches
// @include		http://www.myspace.com/
// @include		http://*.myspace.com/*
// @exclude
// ==/UserScript==

var	ad_sidebar = document.getElementById( "col3" );

if( ad_sidebar)
	ad_sidebar.parentNode.removeChild( ad_sidebar );

var	ad_block = document.getElementById( "ad-wrap" );

if( ad_block ) 
	ad_block.parentNode.removeChild( ad_block );

var	banner_header = document.getElementById( "marketing" );

if( banner_header )
	banner_header.parentNode.removeChild( banner_header );