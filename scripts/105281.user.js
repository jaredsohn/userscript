// ==UserScript==
// @name           colons_r.star_r_sa_g
// @namespace      8389ca2708aadce6b5e9f467ef58ab34
// @description    More /r/shittyadvice, fewer /r/shittysubreddits
// @include        http://www.reddit.com/*
// @author	   dixie_recht
// @version        20110621
// ==/UserScript==

// This is free software in the public domain.

// Scans titles on reddit and makes them appear to have been posted to
//  /r/shittyadvice if the title appears to ask for advice.

$ = unsafeWindow.jQuery;
if( unsafeWindow.console ) {
    // Use Firebug's console if it's available
    var GM_log = unsafeWindow.console.log;
}

function makeShittier() {
    warnUser();
    var regexQInTitle = new RegExp( '[?]|can I|should I|help me|(need|like) (some )?(help|feedback)|your opinion|(looking|seeking).{1,20}?idea|h[ea]lp!', 'i' );
    var regexSelfDomain = new RegExp( '^self[.]' );

    // Iterate over every article title
    $( 'div.entry:has(span.domain)' ).each( function( n, fragTitle ) {
	// Get article title text
	GM_log( 'Evaluating ' + fragTitle + ' (' + n + ')' );
	textTitle = $( 'a.title', fragTitle ).text();
	isQInTitle = regexQInTitle.test( textTitle );
	GM_log( 'textTitle: ' + textTitle + ', isQInTitle: ' + isQInTitle );

	// Modify entry if there is a question in the title
	if( isQInTitle ) {
	    // Get domain
	    textDomain = $( 'span.domain > a', fragTitle ).text();
	    isSelfDomain = regexSelfDomain.test( textDomain );
	
	    if( !isSelfDomain ) {
		// Change title link to go directly to comments
		// Get the comments link
		linkComments = $( 'a.comments', fragTitle ).attr( 'href' );
		// Set the title href to the comments link
		$( 'a.title', fragTitle ).attr( 'href', linkComments );
	    }

	    // Just change the text to refer to SA, not the links
	    $( 'span.domain > a', fragTitle ).text( 'self.shittyadvice' );
	    $( 'p.tagline > a.subreddit', fragTitle ).text( 'shittyadvice' );
	}
	return true;
    } );
}

function warnUser() {
    $( 'body' ).prepend( '<div class="attention" id="shittier-warning">Warning: Shittier Advice enabled</div>' )
}

makeShittier();
