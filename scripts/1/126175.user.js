// ==UserScript==
// @name			Facepunch Extended Ratings
// @version			1.26
// @namespace		http://www.vertinode.nl/
// @description		Shows extended rating info.
// @include			http://www.facepunch.com/*
// @include			http://facepunch.com/*
// ==/UserScript==

//	========================================================================
//		Helpers
//	========================================================================

var user = -1;
if ( document.getElementById( "navbar-login" ).getElementsByClassName( "buttons" ).length != 0 )
{
	var user = document.getElementById( "navbar-login" ).getElementsByTagName( "a" );
	for ( var i = 0; i < user.length; i++ ) {
		if ( user[i].href != undefined && user[i].href.indexOf( "member.php" ) != -1 ) {
			user = user[i].href.match( /[0-9]+/ )[0];
			break;
		}
	}
}

function webRequest( url, postbody, callback )
{
	var request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if ( request.readyState == 4 )
		{
			callback( request.responseText );
		}
	}
	
	if ( postbody == null ) {
		request.open( "GET", url + "&user=" + user, true );
		request.send( null );
	} else {
		request.open( "POST", url + "?user=" + user, true );
		request.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
		request.setRequestHeader( "Content-Length", postbody.length );
		request.setRequestHeader( "Connection", "close" );
		request.send( postbody );
	}
}

//	========================================================================
//		Static content
//	========================================================================

var icons = { "agree": "tick", "disagree": "cross", "funny": "funny2", "winner": "winner", "zing": "zing", "informative": "information", "friendly": "heart", "useful": "wrench", "optimistic": "rainbow", "artistic": "palette", "late": "clock", "dumb": "box", "oify pinknipple": "nipple", "lua helper": "lua_helper", "lua king": "lua_king", "smarked": "weed", "programming king": "programming_king", "mapping king": "mapping_king", "moustache": "moustache" };
var messages = {
	"agree": "This user is usually agreed with.",
	"disagree": "This user doesn't have a popular opinion.",
	"funny": "This user is funny!",
	"winner": "This user is a true winner.",
	"zing": "This user is witty.",
	"informative": "This user knows what's up!",
	"friendly": "This user is a bro.",
	"useful": "This user helps people out.",
	"optimistic": "This user is very optimistic.",
	"artistic": "This user is artistic.",
	"late": "This user lives under a rock.",
	"dumb": "This user is packed with an extra chromosome.",
	"oify pinknipple": "This is the hottest user on the web.",
	"lua helper": "This user aids others in making Lua aimbots.",
	"lua king": "This user excels at making Lua aimbots.",
	"smarked": "This user wanted to post, but then they got high.",
	"programming king": "This user is quite possibly a computer hacker.",
	"mapping king": "This user is good with a hammer.",
	"moustache": "This user is a gentleman."
};

//	========================================================================
//		Global ratings navbar item
//	========================================================================

var container = document.getElementById( "navbarlinks" );
	var div = document.createElement( "div" );
		div.className = "navbarlink";
		
		var a = document.createElement( "a" );
		a.href = "#";
		a.setAttribute( "onclick", "return OpenURLInBox( 'ratings', 'http://dev.vertinode.nl/fpstats.php' );" );
			var img = document.createElement( "img" );
				img.src = "fp/ratings/funny2.png";
				img.alt = img.title = "Ratings";
				img.style.marginRight = "5px";
			a.appendChild( img );
			
			var t = document.createTextNode( " Ratings" );
			a.appendChild( t );
	div.appendChild( a );
container.insertBefore( div, container.getElementsByTagName( "div" )[4] );

//	========================================================================
//		Profile
//	========================================================================

if ( document.location.pathname.match( "^/member.php" ) )
{
	// Add tab button
	var tabContainer = document.getElementsByClassName( "tabslight" )[0];
		var dd = document.createElement( "dd" );
			var a = document.createElement( "a" );
			a.id = "ratings-tab";
			a.href = document.location.pathname + "#ratings";
			a.setAttribute( "onclick", "return tabViewPicker( this );" );
			a.innerHTML = "Ratings";
		dd.appendChild( a );
	tabContainer.appendChild( dd );
	
	// Add ratings content
	var contentContainer = document.getElementsByClassName( "profile_content" )[0];
		var div = document.createElement( "div" );
		div.id = "view-ratings";
		div.className = "view_section";
		div.style.marginTop = "10px";
	contentContainer.appendChild( div );
	
	webRequest( "http://dev.vertinode.nl/fpratings.php?uid=" + document.location.href.match( /[0-9]+/ )[0] + "&w=400&col=444", null, function( src )
	{
		document.getElementById( "view-ratings" ).innerHTML = src;
	} );
}

//	========================================================================
//		Forum
//	========================================================================

if ( document.location.pathname.match( "^/forumdisplay.php" ) || document.location.pathname.match( "^/fp_popular.php" ) || document.location.pathname.match( "^/fp_read.php" ) )
{
	// Collect threads on page and ask server for most received ratings
	var threadElements = document.getElementsByClassName( "threadtitle" );
	var tids = "";
	for ( var i in threadElements )
	{
		if ( threadElements[i].getElementsByTagName )
			tids += threadElements[i].getElementsByTagName( "a" )[0].href.match( /[0-9]+/ ) + ",";
	}
	tids = tids.substring( 0, tids.length - 1 );

	webRequest( "http://dev.vertinode.nl/fpratings.php", "tids=" + tids, function( src )
	{
		var ratingSections = document.getElementsByClassName( "threadratings" );
		var ratings = src.split( "," );

		for ( var i in ratingSections )
		{
			if ( ratings[i] == undefined || ratings[i] == "null" ) continue;
			if ( ratingSections[i].childNodes.length > 1 ) { ratingSections[i].removeChild( ratingSections[i].getElementsByTagName( "span" )[0] ); };

			var ratingInfo = ratings[i].split( "|" );

			var img = document.createElement( "img" );
				img.src = "/fp/ratings/" + icons[ ratingInfo[0] ] + ".png";
				img.style.position = "relative";
				img.style.left = "-2px";
				img.style.top = "3px";
			ratingSections[i].appendChild( img );
			ratingSections[i].innerHTML += " x <strong>" + ratingInfo[1] + "</strong>";

			ratingSections[i].style.position = "relative";
			ratingSections[i].style.top = "-8px";
			ratingSections[i].style.width = "60px";
			ratingSections[i].style.marginTop = "-2px";
		}
	} );
}

//	========================================================================
//		Thread
//	========================================================================

if ( document.location.pathname.match( "^/showthread.php" ) )
{
	// Collect users on page and ask server for most received ratings
	var usernameElements = document.getElementsByClassName( "username_container" );
	var userIds = "";
	for ( var i in usernameElements )
	{
		if ( usernameElements[i].getElementsByTagName )
			userIds += usernameElements[i].getElementsByTagName( "a" )[0].href.match( /[0-9]+/ ) + ",";
	}
	userIds = userIds.substring( 0, userIds.length - 1 );
	
	webRequest( "http://dev.vertinode.nl/fpratings.php", "uids=" + userIds, function( src )
	{
		addRatingButtons( src.split( "," ) );
	} );

	// Adds the rating buttons to posts where the most received rating is known
	function addRatingButtons( ratings )
	{
		var postLinkSections = document.getElementsByClassName( "postlinking" );

		for ( var i in postLinkSections )
		{
			if ( ratings[i] == "null" ) continue;
			var icon = icons[ ratings[i] ];
			var message = messages[ ratings[i] ];
			
			var container = postLinkSections[i];
			if ( !container.getElementsByTagName ) continue;
			var eventLogButton = container.getElementsByTagName( "a" )[0];
			
			var button = document.createElement( "img" );
			button.src = "/fp/ratings/" + icon + ".png";
			button.alt = button.title = message;
			button.style.marginRight = "2px";
			button.style.cursor = "pointer";
			
			var userid = eventLogButton.getAttribute( "onclick" ).match( /[0-9]+/ );
			button.setAttribute( "onclick", "document.location = 'javascript:void(OpenURLInBox( \"ratinginfo_" + userid + "\", \"http://dev.vertinode.nl/fpratings.php?uid=" + userid + "\" ));';" );
			
			container.insertBefore( button, eventLogButton );
		}
	}
}