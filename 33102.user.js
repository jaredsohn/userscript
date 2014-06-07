// Released under the GPL license v3.0
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name		Remove Myspace Comment Images
// @namespace		tag:polyhelix.org,2008-08-27:RemoveMyspaceCommentImages
// @description		A script that removes comments on MySpace profiles
// @include		http://www.myspace.com/*
// @include		http://*.myspace.com/*
// @exclude
// ==/UserScript==

var imgs, this_img;

imgs = document.evaluate( "//td[ @class='columnsWidening' ]//img",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null
			);

for( var i = 0; i < imgs.snapshotLength; i++ )
{
 	this_img = imgs.snapshotItem( i );
	this_img.parentNode.removeChild( this_img );
}
