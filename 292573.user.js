// ==UserScript==
// @name          Twitch.TV - Infinite scroll / Load more
// @version       1.0
// @description   Automatically clicks the "Load More" button in Twitch.tv directories.
// @author        jim
// @include       http://www.twitch.tv/*
// @include       http://*.twitch.tv/*
// @updateURL     https://userscripts.org/scripts/source/292573.meta.js
// @grant         none
// ==/UserScript==

// jQuery window onChange plugin
if ( typeof(jQuery) == "function" && typeof(jQuery.windowLocationChange) == "undefined" ) {  
    // http://www.bennadel.com/blog/1520-Binding-Events-To-Non-DOM-Objects-With-jQuery.htm
    // Our plugin will be defined within an immediately
    // executed method.
    (function( $ ){
    	
		// Default to the current location.
		var strLocation = window.location.href;
		var strHash = window.location.hash;
		var strPrevLocation = "";
		var strPrevHash = "";
    
		// This is how often we will be checkint for
		// changes on the location.
		var intIntervalTime = 100;

		// This method removes the pound from the hash.
		var fnCleanHash = function( strHash ){
			return(
				strHash.substring( 1, strHash.length )
				);
		}
    
		// This will be the method that we use to check
		// changes in the window location.
		var fnCheckLocation = function(){
			// Check to see if the location has changed.
			if (strLocation != window.location.href){

				// Store the new and previous locations.
				strPrevLocation = strLocation;
				strPrevHash = strHash;
				strLocation = window.location.href;
				strHash = window.location.hash;
				// The location has changed. Trigger a
				// change event on the location object,
				// passing in the current and previous
				// location values.
				$( window.location ).trigger(
					"change",
					{
						currentHref: strLocation,
						currentHash: fnCleanHash( strHash ),
						previousHref: strPrevLocation,
						previousHash: fnCleanHash( strPrevHash )
					}
					);

			}
		}
            

        jQuery.windowLocationChange = {
            isRunning: true
        };          

    	// Set an interval to check the location changes.
    	setInterval( fnCheckLocation, intIntervalTime );

	})( jQuery );
}
            
window.ttvislm = {

    clickTimer: null,
    
    load: function() {
    
        setTimeout(function () {
        
            if ( typeof(jQuery) == "function" ) {
            
                clearInterval(ttvislm.clickTimer);
                
                if ( jQuery("#directory-list").length > 0 ) {
                
                    ttvislm.clickTimer = setInterval(function () {
                    
                        var loadMore = jQuery("a.js-load-more");
                        
                        if ( loadMore.is(":visible") === true && ttvislm.isElementInViewport(loadMore[0]) === true ) {
                        
                            loadMore.click();
                            
                        }
                        
                    }, 250);
                    
                }
                
                jQuery(window.location).off("change", null, ttvislm.onChangeEvent);
                jQuery(window.location).on("change", null, ttvislm.onChangeEvent);
                
            }
            
        }, 1000);
        
    },
    
    onChangeEvent: function() {
        ttvislm.load();
    },
    
    // from: http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
    isElementInViewport: function(el) { 
        var rect = el.getBoundingClientRect();
    
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }
}

ttvislm.load();
