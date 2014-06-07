// ==UserScript==
// @name           Facebook - Hide Stuff
// @namespace      shervey.userscripts.org
// @include        http://www.facebook.com/*
// ==/UserScript==


window.hideStuff = function() {
	var h6 = document.getElementsByTagName( "h6" );
	
	// STUFF TO HIDE
	var phrases = new Array();
	phrases.push( "> likes <" );
	phrases.push( "> attended <" );
	phrases.push( "> added <" );
	phrases.push( "is now friends with" );
	phrases.push( "are now friends" );
	phrases.push( "was tagged" );
	phrases.push( "were tagged" );
	phrases.push( "joined the group" );
	phrases.push( "commented on" );	
	phrases.push( "is attending" );
	phrases.push( "profile picture" );
	

	for( var i = 0; i < h6.length; i++ )
	{
		for( var j = 0; j < phrases.length; j++ )
		{
			if( h6[i].innerHTML.indexOf( phrases[j] ) >= 0 )
			{
				h6[i].parentNode.parentNode.parentNode.style.display = "none";
			}
		}
	}
}



window.addHideLink = function() { 
	var links = document.getElementsByTagName( "A" );
	var button = document.createElement( "INPUT" );
	
	button.type = "button";
	button.value = "Hide Stuff";
	button.style.fontSize = "8pt";
	button.style.marginLeft = "10px";
	
	button.addEventListener( "click", window.hideStuff, false )
	
	for( var i = 0; i < links.length; i ++ )
	{
		if( links[i].innerHTML.indexOf( "Top News" ) > -1 || 
			links[i].innerHTML.indexOf( "Most Recent" ) > -1 )
		{
			links[i].parentNode.appendChild( button );
		}
	}
}



window.functionToString = function( funct ) 
{
	// Get function as string
	funct = funct.toString();
	
	// Get what's inside the function
	var str = funct.slice( ( funct.indexOf( "{" ) + 1 ), ( funct.length - 1 ) );
	
	// Make it a single line
	str = str.replace( /( \n )/g, "" );
	
	// Preserve single quotes
	str = str.replace( /'/g, "$" );
	
	// Replace double quotes with single quotes
	str = str.replace( /"/g, "'" );
	
	// Escape single quotes
	str = str.replace( /\$/g, "\\'" );
	
	return str;
}



window.addEventListener( "load", window.addHideLink, false );
