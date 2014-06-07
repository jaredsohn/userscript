// ==UserScript==
// @name           MySpace Tweak
// @namespace      MST
// @description    Removes ad's.
// @include        http://*.myspace.com/*
// ==/UserScript==

try{
	if (document.getElementById('content') != 'undefined'){
		document.getElementById('content').innerHTML = document.getElementById('home_friends').innerHTML;
	}
}
catch(err){}

try{
	if (document.getElementById('header') != 'undefined'){
		document.getElementById('header').innerHTML = document.getElementById('homelink').innerHTML + "<div>" + document.getElementById('toprightlinks').innerHTML + "</div>";
	}
}
catch(err){}

try{
	if (document.getElementById('googlebar') != 'undefined'){
		document.getElementById('googlebar').style.visibility = 'hidden';
	}
}
catch(err){}

try{
	if (document.getElementById('splash_login_container') != 'undefined'){
		document.body.innerHTML = "<center>" + document.getElementById('splash_login_container').innerHTML + "</center>";
	}
}
catch(err){}

// try{
	// if (document.getElementById('home_messages') != 'undefined'){
		// document.body.innerHTML = "<center><div id='homelink'>" + document.getElementById('homelink').innerHTML + "</div><div id='home_profileInfo'>" + document.getElementById('home_profileInfo').innerHTML + "</div><div id='StatusBox'>" + document.getElementById('StatusBox').innerHTML + "</div><div id='home_messages'>" + document.getElementById('home_messages').innerHTML + "</div><div id='home_bulletins'>" + document.getElementById('home_bulletins').innerHTML + "</div><div id='home_schools'>" + document.getElementById('home_schools').innerHTML + "</div></center><div id='home_friends'>" + document.getElementById('home_friends').innerHTML + "</div>";
	// }
// }
// catch(err){}