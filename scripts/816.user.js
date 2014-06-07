// ==UserScript==
// @name	WoW Forums Helper
// @description	This script contains some useful helper functions for dealing with the WoW forums.\nAs an example, I have included some additional functionality, such as killfiles, targeted post killing, illuminated letters and inline images.
// @include	http://forums.worldofwarcraft.com/thread.aspx?fn=wow-* 
// @include	https://forums.worldofwarcraft.com/thread.aspx?fn=wow-* 
// ==/UserScript==

// $Id: wowforumshelper.user.js,v 1.3 2005/05/25 15:12:01 curious Exp $

(function() {

/* Anon function wrapper. */

var greenIconData = "data:image/gif,GIF89a%17%00%15%00%C6%7F%00%00%14%00%00%1B%00%00%22%00%00%2C%00%002%00%16%23%16%16%26%16%006%01%008%01%16*%16%00%3C%01%16-%16%02%3E%03%161%16%03%40%04%01C%02%165%16%08%40%09%05B%07%168%16%02G%04%01H%02%06E%08%06G%07%16%3D%16%08H%09%11B%11%0BF%0C%03L%04%0DG%0D%16A%16%12E%12%16C%16%02R%04%16E%16%16H%16%16K%16%09T%0B%07V%08%16L%16%16O%16%03%5D%04%16Q%16%12T%12%14V%14%09%5E%09%16U%16%03b%05%16W%16%07d%08%16Z%16%16%5D%16%0Fb%10%0Be%0C%05k%06%16%60%16%11f%11%16d%16%05r%06%16h%16%16j%16%05v%07%16l%16%16o%16%0Bw%0D%16q%16%14t%14%07%7D%08%16s%16%16u%16%07%81%08%16y%16%0F%7F%0F%08%86%09%16~%16%0B%87%0D%11%86%11%07%8D%09%16%83%16%0E%8A%0F%09%8E%0A%16%86%16%0E%8C%0F%14%89%14%0A%90%0C%0C%93%0D%16%8D%16%0A%96%0B%0B%96%0C%16%90%16%10%94%11%0A%98%0C%0C%97%0C%16%93%16%13%95%14%11%97%11%0B%9C%0C%16%95%16%14%98%14%14%9A%14%0D%9F%0D%16%99%16%0B%A2%0D%16%9B%16%14%9E%14%0F%A8%10%11%A9%11%16%A6%16%0D%AF%0F%16%AB%16%14%AE%14%12%B1%12%16%B0%16%14%B2%14%11%B4%12%16%B3%16%16%B4%16%11%BA%12%16%B9%16%16%BD%14%13%C5%14%14%C9%14%16%C8%16%16%CE%16%14%D1%14%16%D9%16%16%DE%16%FF%FF%FF!%F9%04%01%00%00%7F%00%2C%00%00%00%00%17%00%15%00%00%07%FE%80%7F%82%83%82%06%86%7F%86%06%84%8B%8B%09%13%23(%20%13%20(%23%10%8C%8C%0B%22%3E4%16%1D'%1D%168%3B%20%98%84%22G-%0CB0%202B%085D%A5%A6%18%3EH%00bE.%7F0G%5E%00L9%13%A6(Y%04!mNA%3CEQp%0F%0FV%23%A6%3C_%006zpZKZp%7B)%00h9%98%24Qf%00%15u%0A%00%ED%08r%04%00oQ%24%8B%B6sM%00%016%3DlulC%5E%B4%83%02'%08%86A%0Dd%94%09%D7%0E%80%11%3C%7B%F0%F4h%08%80%C3%98%1B%97%FE%88%88%12.%00%82x%00%06p%19%E0%AE%02I%0AQ%A85%98%81%ABG%1E0I%B0%04%A0%E2gK%80-I%AE%F0%A9%02%00%C8%8D%06%10~p%88%01%C7%8E%0E%01~%D4T%C9%C3%25%8D%1F%016%E8%AC%01%C2%C0%07%84%09%3E%18L9b%E5%09%009%7DB%04x%D0G%0E%00)Q%88Dq%B0%A3A%83%1B%97%17~%C0%C8q%8C%40%9E!%D8%F2%10%40%90%E5%06%8A%1C%19%60%2CHpb%03%8B%11*%88%8C%19PA%60%88%14%03%C6%14Q%01%02%14%08E%0DD%90%18Ab%86%15%3BdH%0A%00s'%CB%8C%13%23FxX0h%C2%87%15%3B%7CX%89%C30%9D%9B0D%7C%AC%D0%40%0C%E1%89%08%12J%98%40%10%80%80%8E%03%01%06%84(!!%03%8A%06%84%0A%40%20%E1B%06%0F%25Y%CA%9C)%D3%C5%C9%8F%1B2H%40(%B0%A8%80%81%05%0D%26%60%D0%7C%82%84%08%0F%13%1A%0C%26%2F(%10%00%3B";

var rePlayerInfo = /Level (\d+) (\w+) (\w+)/i;

var posts = []; 

function boardRealm()
{
	var ourHREF = window.location.href;
	if( ourHREF.indexOf( "wow-realm-" ) == -1 )
	{
		return( "" );
	}
	return( ourHREF.substring( ourHREF.indexOf( "wow-realm-" ) + 10, ourHREF.indexOf( "&" ) ) );
}

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

function getSubjectArea( postID )
{
	pane = getIDPane( postID );
	var subjPane = pane.parentNode;
	return( subjPane.cells[1] ); 
}

function getSubject( postID )
{
	area = getSubjectArea( postID );
	return( area.getElementsByTagName( "span" )[ 1 ].getElementsByTagName( "b" )[ 0 ].innerHTML );
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

function getLevel( postID )
{
	var ar = rePlayerInfo.exec( getIDPane( postID ).innerHTML );
	return( ar[ 1 ] );
}

function getRace( postID )
{
	var ar = rePlayerInfo.exec( getIDPane( postID ).innerHTML );
	return( ar[ 2 ] );
}

function getClass( postID )
{
	var ar = rePlayerInfo.exec( getIDPane( postID ).innerHTML );
	return( ar[ 3 ] );
}

function getGuild( postID )
{
	if( getIDPane( postID ).childNodes[6].rows.length == 3 )
		return( getIDPane( postID ).childNodes[6].rows[1].cells[1].childNodes[0].innerHTML );
	else
		return( "" );
}

function getRealm( postID )
{
	if( getIDPane( postID ).childNodes[6].rows.length == 3 )
		return( getIDPane( postID ).childNodes[6].rows[2].cells[1].childNodes[0].innerHTML );
	else if( getIDPane( postID ).childNodes[6].rows.length == 2 ) 
		return( getIDPane( postID ).childNodes[6].rows[1].cells[1].childNodes[0].innerHTML );
	else
		return( "" );
}

function killPost( postID )
{
	var thePost = getPost( postID );
	thePost.parentNode.removeChild( thePost );
}

function transformRealm( realmstring )
{
	return( realmstring.toLowerCase().replace( " ", "" ).replace( "'", "" ) );
}

function getKillList()
{
	var strlist = GM_getValue( "killFile", "" );
	var bits = strlist.split( "|" );
	var returned = {};
	for( var i = 0; i < bits.length; i++ ) returned[ bits[ i ] ] = true;
	return( returned );
}

function addToKillList( key )
{
	var list = getKillList();
	var listkeys = new Array;
	for( var k in list ) listkeys.push( k );
	listkeys.push( key );
	GM_setValue( "killFile", listkeys.join( "|" ) );
	alert( key + " added to Killfile.\nReloading." );
	window.location.reload();
}
window.GM_wfh_addToKillList = addToKillList;

function clearKillList( e )
{
	GM_setValue( "killFile", "" );
	alert( "Killfile cleared.\nReloading." );
	window.location.reload();
}
window.GM_wfh_clearKillList = clearKillList;
GM_registerMenuCommand( "WoW - Clear Killfile", window.GM_wfh_clearKillList );

function toggleOption( option )
{
	GM_setValue( option, !GM_getValue( option, false ) );
	alert( "Value of " + option + " is now " + GM_getValue( option, false ) + ".\nReloading page." );
	window.location.reload();
}
window.GM_wfh_toggleOption = toggleOption;

function toggleKillLevelOnes( e )
{
	window.GM_wfh_toggleOption( "killLevelOnes" );
}
window.GM_wfh_toggleKillLevelOnes = toggleKillLevelOnes;
GM_registerMenuCommand( "WoW - Newbswatter", window.GM_wfh_toggleKillLevelOnes );


function toggleKillOffRealm( e )
{
	window.GM_wfh_toggleOption( "killOffRealm" );
}
window.GM_wfh_toggleKillOffRealm = toggleKillOffRealm;
GM_registerMenuCommand( "WoW - Border Control", window.GM_wfh_toggleKillOffRealm );


function toggleKillfile( e )
{
	window.GM_wfh_toggleOption( "useKillFile" );
}
window.GM_wfh_toggleKillfile = toggleKillfile;
GM_registerMenuCommand( "WoW - Killfile Engage", window.GM_wfh_toggleKillfile );


function toggleBlackrock( e )
{
	window.GM_wfh_toggleOption( "killBlackrock" );
}
window.GM_wfh_toggleBlackrock = toggleBlackrock;
GM_registerMenuCommand( "WoW - BanBlackrock", window.GM_wfh_toggleBlackrock );

function toggleIllumination( e )
{
	window.GM_wfh_toggleOption( "illuminatePosts" );
}
window.GM_wfh_toggleIllumination = toggleIllumination;
GM_registerMenuCommand( "WoW - Illuminated", window.GM_wfh_toggleIllumination );

function toggleInlineImages( e )
{
	window.GM_wfh_toggleOption( "inlineImages" );
} 
window.GM_wfh_toggleInlineImages = toggleInlineImages;
GM_registerMenuCommand( "WoW - Inline Images", window.GM_wfh_toggleInlineImages );

window.addEventListener( "load", function(e) 
{
	/* Here's some examples of what you can do with this kind of functionality. */
	for( var i = 0; i < getNumberPosts(); i++ )
	{
		var killMe = false;
		
		/* Killing troll alts. */
		if( GM_getValue( "killLevelOnes", false ) == true )
		{
			if( getLevel( i ) == 1 ) killMe = true;
		}

		/* Kill off out of realm characters below level 15. */
		if( GM_getValue( "killOffRealm", false ) == true )
		{
			if( ( getLevel( i ) < 15 ) && ( transformRealm( getRealm( i ) ) != boardRealm() ) ) killMe = true;
		}

		/* Kill folks off my personal hitlist. */
		if( GM_getValue( "useKillFile", false ) == true )
		{
			var key = getPlayer( i ) + ":" + getRealm( i );
			if( key in getKillList() ) killMe = true;
			var linko = document.createElement( "a" );
			linko.href = "javascript: window.GM_wfh_addToKillList( '" + key + "' );";
			var greenIcon = document.createElement( "img" );
			greenIcon.src = greenIconData;
			greenIcon.border = 0;
			linko.appendChild( greenIcon );
			getIDPane( i ).appendChild( linko );
		}

		/* Blackrock shouldn't be allowed out of their playpen. */
		if( ( GM_getValue( "killBlackrock", false ) == true ) && ( transformRealm( getRealm( i ) ) == "blackrock" ) && ( boardRealm() != "blackrock" ) ) killMe = true;

		/* Illuminate first letters. */ 
		if( GM_getValue( "illuminatePosts", false ) == true )
		{
			var post = getBody( i );
			var content = post.innerHTML.replace( /^[\s]+/g, "" );
			var first = content.substring( 0, 1 ).toLowerCase();
			if( first.match( /[a-z]/i ) ) 
			{
				post.innerHTML = content.substring( 1 );
			
				var image = document.createElement( "img" );
				image.src = "http://worldofwarcraft.com/shared/wow-com/images/smallcaps/plain/" + first + ".gif";
				image.align = 'left';
				image.valign = 'top';
				
				post.parentNode.insertBefore( image, post );
			}
		}

		/* Greasemonkey orders you to fire! */		
		if( killMe == true ) killPost( i );
	}

	/* Inline all image links.  We don't seem to have XPath2.0 to do ends-with, bah. */
	if( GM_getValue( "inlineImages", false ) == true )
	{
		var imageLinks = document.evaluate( "//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		for( var i = 0; i < imageLinks.snapshotLength; i++ )
		{
			var link = imageLinks.snapshotItem( i );
			var dest = link.getAttribute( "href" );
			if( dest.toUpperCase().substring( dest.length - 3 ) == "JPG" )
			{
				var newElem = document.createElement( "img" );
				newElem.src = dest;
				link.parentNode.replaceChild( newElem, link );
			}
		}
	}


}, false );

/* Anon function wrapper ends here. */
} )();
