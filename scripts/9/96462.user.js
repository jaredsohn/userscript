// ==UserScript==
//
// @name           reddit.com - overloaddit
// @namespace      v1
// @description    Automatically load the google cache version of a reddit page When reddit is down or overloaded.
//
// @include        http://www.reddit.com/*
// @include        http://webcache.googleusercontent.com/search?q=cache*
// @exclude        *#nocache
//
// ==/UserScript==

// If reddit is down, redirect
if(	( document.title == 'blackout' )					// SOPA Blackout message
 ||	( document.title == '502 Bad Gateway' )					// 502 status
 ||	( document.title == 'Ow! -- reddit.com' )				// Heavy load page
 ||	( document.title == 'Reddit broke!' )					// Service Unavailable error
 ||	( document.title == 'reddit is down' )					// Generic 'site down' page
 ||	( document.title.indexOf( 'Service Unavailable' ) != -1 )		// Service Unavailable error
 ||	( document.title.indexOf( 'reddit is currently offline' ) != -1 )	// Dancing aliens
 &&	( location.href.indexOf( '#nocache' ) == -1 )				// No cached page available (as we already tried)
 &&	( location.href.indexOf( 'http://www.reddit.com/message/' ) == -1 )	// Don't attempt to find a cached version of user message pages
)	window.location = "http://webcache.googleusercontent.com/search?q=cache%3A" + location.href;

// Check if we're viewing a google cache page
if ( location.href.indexOf( 'http://webcache.googleusercontent.com/search?q=cache%3Ahttp://www.reddit.com' ) != -1 )
{
	// Check if google found a cache page for the reddit url we searched for. If not, go back to reddit.
	if( document.getElementById('res') && document.getElementById('res').innerHTML.indexOf( 'did not match any documents' ) != -1 )
		window.location = document.title.substr( 6,title.length-22 ) +'#nocache';

	// Get page elements we want to work with.
	var	topdiv		= document.getElementsByTagName('div')[0],
		popupdiv	= document.getElementsByClassName('popup')[0];
		aboutdiv	= document.getElementsByClassName('infobar')[1],
		userlinediv	= document.getElementById('header-bottom-right'),
		logindiv	= document.getElementById('login_login-main'),
		logininput	= logindiv.childNodes[1],
		baseurl		= document.getElementsByTagName("base")[0];
		
	// If the user just refreshed the page forward them back to the reddit page (bit of a kludge).
	if( logininput.value == 'refresh' )
		window.location = baseurl.href;
	logininput.value = 'refresh';

	// Hide some page elements.
	topdiv.style.display	= 'none';	// Hide google cache header
	aboutdiv.style.display	= 'none';	// Hide div explaining what reddit is about.
	logindiv.style.display	= 'none';	// Hide login box.
	
	// Replace the register/login popup (appears when user tries to vote)
	popupdiv.style.width	= '50%';
	popupdiv.style.left	= '25%';
	popupdiv.innerHTML	= '<h1 style="color: red; font-size: 200%;">reddit.com is currently unavailable</h1>'+
				  '<div style="text-align: center">'+
				  ' <h2>You are currently viewing the latest google cache for this page.<br />Voting and commenting will be unavailable</h2>'+
				  ' <img src="http://sp.reddit.com/heavyload-alien.png">'+
				  '</div><div class="clear"></div>'+
				  '<div style="text-align: center; clear: both;"><a href="'+baseurl.href+'">reload the page</a> &nbsp; | &nbsp; <a onclick="return hidecover(this)" href="#">close this window</a></div>';

	// Replace userinfo line
	userlinediv.innerHTML	= '<p style="font-weight:bold; font-size:120%; padding:0 1em">[ <a href="'+baseurl.href+'">cached page</a> ]</p>'
}