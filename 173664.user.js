// ==UserScript==
// @name        Twitch Hide Games
// @namespace   jim
// @description Hide games you'll never watch
// @include     http://www.twitch.tv/*
// @include     http://*.twitch.tv/*
// @grant       none
// @version     1.1
// ==/UserScript==

// GAMES TO HIDE:
var games = Array(
                    "League of Legends",
                    "Call of Duty: Black Ops II",
                    "StarCraft II: Heart of the Swarm",
                    "World of Warcraft: Mists of Pandaria",
                    "Dota 2"
                    );

// DO NOT EDIT BELOW

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
            
window.ttvhg = {

    hideTimer: null,
    
    load: function() {
        
        if ( typeof(jQuery) == "function" ) {
        
            clearInterval(ttvhg.hideTimer);
            
            if ( ttvhg.endsWith(window.location.href, "/directory/all") ) {
            
                ttvhg.hideTimer = setInterval(function () {
                
                    jQuery('.boxart').each(function() {
                        element = $(this);
                        $.each(games, function( gameIndex, game ) {
                            if ( element.attr("title") == game ) {
                                element.parent().parent().hide();
                            }
                        });
                    });
                    
                }, 1500);
                
            }
            
            jQuery(window.location).off("change", null, ttvhg.onChangeEvent);
            jQuery(window.location).on("change", null, ttvhg.onChangeEvent);
        }
    },
    
    onChangeEvent: function() {
        ttvhg.load();
    },
    
    // http://stackoverflow.com/questions/280634/endswith-in-javascript
    endsWith: function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    
}

ttvhg.load();