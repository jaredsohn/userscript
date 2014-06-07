// ==UserScript==
// @name          Twitter Reloaded
// @namespace     http://joemaller.com/2008/07/08/twitter-reloaded-userscript
// @description   For Fluid: Reloads Twitter every two minutes with an in-page countdown. If there is any text in the status box reloads are postponed.
// @author		  Joe Maller (http://joemaller.com), loosely based on work by Yoshiomi Kurisu (http://chris4403.blogspot.com) and Eric Eggert (http://yatil.de/)
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://twitter.com/account/archive
// @include       https://twitter.com/account/archive
// @exclude       http://twitter.com/account/setting
// @exclude       https://twitter.com/account/setting
// @exclude       http://twitter.com/
// @exclude       https://twitter.com/
// @exclude       http://twitter.com/*/statuses/*
// @exclude       https://twitter.com/*/statuses/*
// ==/UserScript==

( function () {
    if ( window.fluid ) {
        var defaultSeconds = 120,   // change this if you want faster or slower reloads
            secondsRemaining = defaultSeconds,
                        
		    reloadFluidBrowser = function() {
    		    secondsRemaining--;
                var twitterStatus = document.getElementById('status'),  // twitter's text field
                    twitterDirectMessageField = document.getElementById('text'),  // twitter's direct message field, nice distinctive id there...
                    b = document.getElementsByTagName('body')[0],
                    reloadStatusDiv = document.getElementById('_fluidReload');
                    
                if ( !reloadStatusDiv ) {
                    var reloadStatusDiv = document.createElement('div');
                    reloadStatusDiv.id = '_fluidReload';
                    reloadStatusDiv.appendChild( document.createTextNode() );
                    reloadStatusDiv.style.backgroundColor = "#fff";
                    reloadStatusDiv.style.color = "#000";
                    reloadStatusDiv.style.opacity = "0.7";
                    b.insertBefore( reloadStatusDiv, b.firstChild );
                } 

                var countStatus = function( statusString ) {
                    reloadStatusDiv.replaceChild(document.createTextNode( statusString ), reloadStatusDiv.firstChild);
                }

                if ( ( twitterStatus && twitterStatus.value != '' ) || 
                     ( twitterDirectMessageField && twitterDirectMessageField.value != '' ) ) {
                    countStatus( "Reload postponed, clear status to reset timer." );
                    secondsRemaining = defaultSeconds;
                } else {
                    if ( secondsRemaining > 0 ) {
                        var plural = ( secondsRemaining == 1 ) ? '' : 's';
                        countStatus( "Reloading in " + secondsRemaining + " second" + plural );
                    } else {            
                        countStatus( "Reloading..." );
                        clearInterval( countdown );
                        window.location = window.location.href.toString().replace( /\?$/, "" ).replace( /#$/, "?" ); 
                        // I had a problem with trailing hash urls not honoring location so the above replacement
                        // first clears empty queries, then swaps trailing hashes for empty queries, this effectively
                        // cleans the url in two iterations, and should be completely transparent to the user.
                        // Somewhat ironically, the trailing hash problem might have been what was breaking
                        // all the other scripts I tried before starting this one. 
                    }
                }
    	    },
	    
            countdown = setInterval( reloadFluidBrowser, 1000);

	};
} )();