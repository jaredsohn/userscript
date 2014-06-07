// ==UserScript==
// @name           hide_the_salami
// @namespace      8389ca2708aadce6b5e9f467ef58ab34
// @description    Autohides dick shots in /r/gonewild.
// @include        http://www.reddit.com/*
// @author	   dixie_recht
// @version        20110702
// ==/UserScript==

// This software is free and in the public domain.

// Autohides dick shots in /r/gonewild.

$ = unsafeWindow.jQuery;
if( unsafeWindow.console ) {
    // Use Firebug's console if it's available
    var GM_log = unsafeWindow.console.log;
}

function hideTheSalami() {
    GM_log( 'hideTheSalami()' );
    var regexDickInTitle = new RegExp( '[{(\\[](?=.{0,2}m)[mf+&-/]{1,3}[})\\]]', 'i' );

    // Iterate over every article title
    $( 'div.thing:has(div.entry:has(span.domain))' ).each( function( n, frag ) {
	// Get article title text
	textTitle = $( 'a.title', frag ).text();
	isDickInTitle = regexDickInTitle.test( textTitle );
	GM_log( 'textTitle: ' + textTitle + ', isDickInTitle: ' + isDickInTitle );
	if( isDickInTitle ) {
	    // Hide the salami
	    GM_log( 'Hiding the salami (' + (n+1) + '): ' + textTitle );
	    $( frag ).hide();
	}

	return true;

    } );

}

hideTheSalami();
