// ==UserScript==
// @name			WoWForumMVPAdder
// @namespace		tag:tardmrr@gmail.com,2006-01-12:MVPAdder
// @description		Makes Cairenn and Iriel forum MVPs
// @include			http://forums.worldofwarcraft.com/thread.aspx?fn=wow-*
// @include			https://forums.worldofwarcraft.com/thread.aspx?fn=wow-*
// ==/UserScript==



(function() {

var posts = [];

function getNumberPosts()
{
	if( posts.length != 0 ) return( posts.length );

	var postTables = document.evaluate( "//table[@class='threadTable' and @cellpadding='4']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	posts = new Array();
	for( var i = 0; i < postTables.snapshotLength; i++ )
	{
		posts[ i ] =  postTables.snapshotItem( i );
	}
	return( posts.length );
}

function getPost( postID )
{
	if( posts.length == 0 )
	{
		getNumberPosts();
	}
	return( posts[ postID ] ); 
}

function getIDPane( postID )
{
	var post = getPost( postID );
	var IDPane = document.evaluate( ".//td[@width='200' and @rowspan='2' and @valign='top' and @align='center']", post, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	return( IDPane.snapshotItem( 0 ) );
}

function getBody( postID )
{
	var post = getPost( postID );
	var divs = document.evaluate( ".//div[@class='breakWord']", post, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	return( divs.snapshotItem( 0 ).childNodes[ 0 ] );	
}

function getPlayer( postID )
{
	var chunk = getIDPane( postID ).childNodes[3].rows[0].cells[0].childNodes[0].innerHTML;
	var startPos = chunk.indexOf( ">" ) + 1;
	return( chunk.substring( startPos, chunk.indexOf( "<", startPos ) ) );
}



window.addEventListener( "load", function(e) 
{
	for( var i = 0; i < getNumberPosts(); i++ )
	{
		if(getPlayer(i) == "Cairenn" || getPlayer(i) == "Iriel")
		{
			getBody(i).setAttribute("class","mvp");
		}

	}
}, false );

} )();

