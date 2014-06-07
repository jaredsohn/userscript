// ==UserScript==
//
// @name            Google AD Killer
// @namespace	  Google AD Killer
// @description	  Remove all ADs from Google's Search Results
// @version         1
// @encoding	  UTF-8
// @grant           GM_addStyle
// @include         http*://*.google.com/*
// @author          Chris Hultberg - http://www.Ez-IT-Solutions.com
// @url             http://www.Ez-IT-Solutions.com/GM_Scripts/Google_AD_Kill.user.js
// @updateURL       http://www.Ez-IT-Solutions.com/GM_Scripts/Google_AD_Kill.user.js
//
// ==/UserScript==

var Google_Ad_Cleaner={

    start : function(){
        
        var ads=["tads","tadsb"];
        
        for(i=0;i<ads.length;i++)
        {
			tbl=parent.document.getElementById(ads[i]);
			if(tbl!=null) tbl.style.display="none";
        }
        
	  xTimer = setTimeout(Google_Ad_Cleaner.start,500);
        Google.Clean_Up()
        
    }
    
}

var Google={

	Clean_Up : function(){
        
		// Hide our ADs that Google display's at the TOP and Bottom of our Search Results
		// -----------------------------------------------------------------------------------
    		
	    	GM_addStyle("#tads { display: none !important; }");
		GM_addStyle("#tadsb { display: none !important; }");
		
		Timer.stop();
		
	}
}

var Timer={

    stop : function(){
    
        clearTimeout(xTimer);
    
    }

}

//-------------------------------------------------------------------//
// * Start the process of Removing ADs and Cleaning Up Google! * //
//-------------------------------------------------------------------//
Google_Ad_Cleaner.start()

