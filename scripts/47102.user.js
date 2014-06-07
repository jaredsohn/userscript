// ==UserScript==
// @name        redmine_reload
// @namespace   http://fluidapp.com
// @description automatically reloads certain pages in redmine
// @include     */projects/activity/*
// @include		*/projects/*/issues
// @author      tanguy de courson
// ==/UserScript==

(function () {
    if (window.fluid) {
		// do yer thang!
		var defaultSeconds = 300,   // change this if you want faster or slower reloads
		//scheduling so no unnessary reloads
		var d=new Date();
		var day = d.getDay();
		var hour = d.getHours();
		if(day == 0 || day == 6 || (hour <7 || hour >19))
		{
			//sunday or saturday or less than 7am or later than 7pm
			defaultSeconds = 3600; //one hour
		}
		
		
		
            secondsRemaining = defaultSeconds,
                        
		    reloadFluidBrowser = function() {
    		    secondsRemaining--;
                
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
                
    	    },
	    
            countdown = setInterval( reloadFluidBrowser, 1000);
    }
})();
