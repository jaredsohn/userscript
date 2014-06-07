// ==UserScript==
// @name reddit.com - Twitter link remove hash
// @include	http://www.reddit.com/prefs/
// @include	http://www.reddit.com/*
// @exclude	http://www.reddit.com/user/*
// @exclude	http://www.reddit.com/info/*
// @source      http://userscripts.org/scripts/show/92112
// @identifier  http://userscripts.org/scripts/source/92112.user.js
// ==/UserScript==

var GM_Debug = 0;

// * enable logging in firebug only
if(!unsafeWindow.console || !GM_Debug){
  	var GM_log = function(){};
} else {
	var GM_log = unsafeWindow.console.log;
}

var links = document.getElementsByTagName( 'a' );
var element;

for ( var i = 0; i < links.length; i++ ) {

    element = links[ i ];

	// This check seems very inelegant, but it works. 
    if ( element.href.indexOf( "http://twitter.com" ) == 0 || element.href.indexOf( "https://twitter.com" ) == 0) {
	GM_log(element.href);
        element.href = element.href.replace("\/#!\/", "\/");

    }
}