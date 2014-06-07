// ==UserScript==
// @name          Twitter Ajax Reload
// @namespace     http://marclandis.com
// @description   Reloads Twitter every two minutes with an in-page countdown. If there is any text in the status box reloads are postponed. Uses the new Ajax reload function.
// @author		   Marc Landis - based on work by Joe Maller (http://userscripts.org/scripts/show/29826) and darrinholst (http://userscripts.org/scripts/show/34204)
// @include       http://twitter.com/home
// @include       https://twitter.com/home
// ==/UserScript==

( function () {
        var defaultSeconds = 120,   // change this if you want faster or slower reloads
            secondsRemaining = defaultSeconds,
                        
		    reloadFluidBrowser = function() {
    		    secondsRemaining--;
                var twitterStatus = document.getElementById('status'),  // twitter's text field
                    twitterDirectMessageField = document.getElementById('text'),  // twitter's direct message field, nice distinctive id there...
                    injectID = document.getElementById('timeline_body_for_update'),
                    reloadStatusDiv = document.getElementById('_fluidReload');
                                       
                if ( !reloadStatusDiv ) {
                    var reloadStatusTBody = document.createElement('tbody');
                    var reloadStatusTR = reloadStatusTBody.appendChild(document.createElement('tr'))
                    reloadStatusTR.setAttribute( "class" , "hentry status");
                    var reloadStatusDiv = reloadStatusTR.appendChild(document.createElement('td'))
                    reloadStatusDiv.setAttribute( "class" , "status-body");
                    reloadStatusDiv.setAttribute( "colspan" , "3");
                    reloadStatusDiv.id = '_fluidReload';
                    reloadStatusDiv.appendChild( document.createTextNode('') );
                    injectID.parentNode.insertBefore(reloadStatusTBody, injectID);
                    

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
                        secondsRemaining = defaultSeconds;
                        
                        var tabID="",x;
                      	x = unsafeWindow.location;
                      
                      	if( x == "http://twitter.com/home" || x == "https://twitter.com/home" )
                      	{
                      		tabID = "home_tab";
                      	}
                      	if( tabID != "" )
                      		unsafeWindow.document.getElementById(tabID).onclick();
                        
                    }
                }
    	    },
	    
            countdown = setInterval( reloadFluidBrowser, 1000);

} )();
