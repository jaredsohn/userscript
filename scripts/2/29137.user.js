// Released under the GPL license v3.0
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name		MySpace Comment Blocker
// @namespace		tag:polyhelix.org,2008-06-04:MSComBlock
// @description		A script that removes comments on MySpace profiles
// @include		http://www.myspace.com/*
// @include		http://*myspace.com/*
// @exclude
// ==/UserScript==

var comments, this_comment;

comments = document.evaluate( "//table[@class='friendsComments']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null
			);

for( var i = 0; i < comments.snapshotLength; i++ )
{
	this_comment = comments.snapshotItem( i );
	this_comment.parentNode.removeChild( this_comment );
}