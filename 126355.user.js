// ==UserScript==
// @name				Facepunch Extended Ratings
// @namespace		http://www.facepunch.com/threads/*
// @description		Shows extended rating info.
// @include			http://www.facepunch.com/threads/*
// ==/UserScript==

// Collect users on page and ask server for most received ratings
var usernameElements = document.getElementsByClassName( "username_container" );
var userIds = "";
for ( var i in usernameElements )
{
	if ( usernameElements[i].getElementsByTagName )
		userIds += usernameElements[i].getElementsByTagName( "a" )[0].href.match( /[0-9]+/ ) + ",";
}
userIds = userIds.substring( 0, userIds.length - 1 );

var request = new XMLHttpRequest();
request.onreadystatechange = function()
{
	if ( request.readyState == 4 )
	{
		addRatingButtons( request.responseText.split( "," ) );
	}
}
request.open( "GET", "http://dev.vertinode.nl/fpratings.php?uids=" + userIds, true );
request.send( null );

// Adds the rating buttons to posts where the most received rating is known
function addRatingButtons( ratings )
{
	var postLinkSections = document.getElementsByClassName( "postlinking" );
	
	var icons = { "agree": "tick", "disagree": "cross", "funny": "funny2", "winner": "winner", "zing": "zing", "informative": "information", "friendly": "heart", "useful": "wrench", "optimistic": "rainbow", "artistic": "palette", "late": "clock", "dumb": "box", "oify pinknipple": "nipple", "lua helper": "lua_helper", "lua king": "lua_king", "smarked": "weed", "programming king": "programming_king", "mapping king": "mapping_king" };
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
		"mapping king": "This user is good with a hammer."
	};

	for ( var i in postLinkSections )
	{
		if ( ratings[i] == "null" ) continue;
		var icon = icons[ ratings[i] ];
		var message = messages[ ratings[i] ];
		
		var container = postLinkSections[i];
		var eventLogButton = container.getElementsByTagName( "a" )[0];
		
		var button = document.createElement( "img" );
		button.src = "/fp/ratings/" + icon + ".png";
		button.alt = button.title = message;
		if(icon == 'funny2'){
			button.width = 15;
			button.height = 15;
		} else {
			button.width = 16;
			button.height = 16;
		}
		button.style.marginRight = "2px";
		button.style.cursor = "pointer";
		
		var userid = eventLogButton.getAttribute( "onclick" ).match( /[0-9]+/ );
		button.setAttribute( "onclick", "document.location = 'javascript:void(OpenURLInBox( \"ratinginfo_" + userid + "\", \"http://dev.vertinode.nl/fpratings.php?uid=" + userid + "\" ));';" );
		
		container.insertBefore( button, eventLogButton );
	}
}