// ==UserScript==
//
// @name            DeviantART AD Killer
// @namespace	  DeviantART AD Killer
// @description	  Remove all ADs from DeviantART and Clean-Up the Layout
// @version         1
// @encoding	  UTF-8
// @grant           GM_addStyle
// @include         http*://*.deviantart.com/*
// @author          Chris Hultberg - http://www.Ez-IT-Solutions.com
// @url             http://www.Ez-IT-Solutions.com/GM_Scripts/DeviantART_AD_Kill.user.js
// @updateURL       http://www.Ez-IT-Solutions.com/GM_Scripts/DeviantART_AD_Kill.user.js
//
// ==/UserScript==

var DeviantART_Ad_Cleaner={

    start : function(){
        
        var ads=["sleek-browse-ad-target","theAd"];
        var ads_by_Class=["div.stream.stream-fh .sleekadbubble", ".sleekadbubble section squareBrowsead square200H ch"];
        
        for(i=0;i<ads.length;i++)
        {
			tbl=parent.document.getElementById(ads[i]);
			if(tbl!=null) tbl.style.display="none";
        }
        
        for(x=0;i<ads_by_Class.length;x++)
        {
			tbl=parent.document.getElementsByClassName(ads_by_Class[x]);
			if(tbl!=null) tbl.style.display="none";
        }
        
    	xTimer = setTimeout(DeviantART_Ad_Cleaner.start,500);
        DeviantART.Clean_Up()
        
    }
    
}

var DeviantART={

	Clean_Up : function(){
        	
		// Fix the width of the header so it fits 1024x768 screen resolution
		// ----------------------------------------------------------------------
    		//GM_addStyle("#overhead #search7-ctrl { width: 97px !important; }");
    		GM_addStyle(".oh-search { padding-right: 0px !important; }");
    		GM_addStyle(".oh-gap { display: none !important; }");
    		
		// Take care of AD on Homepage
		// -----------------------------------
		//GM_addStyle("html body#deviantART-v7.pickle div#output div.browse-container div.browse-content div#browse-results.stream div#browse-results-page-1.browse-results-page div.page-results div.sleekadbubble { display: none !important; }");
    		GM_addStyle("div.stream.stream-fh .sleekadbubble { display: none !important; }");
		
		// Take care of ADs on ART Pages
		// -----------------------------------
		GM_addStyle("div.dp-ad-visible, .dp-ad-wrapper-active { display: none !important; }");
		GM_addStyle(".textbanner-ad.dp-ad-visible + .dev-page-view.view-mode-normal .dev-view-deviation { margin-top: 15px !important; }");
		GM_addStyle("div.partial-ad { display: none !important; }");
		
		// Take care of ADs on Profile Pages
		// --------------------------------------
    		GM_addStyle(".ad-blocking-makes-fella-confused, .gr-adcast { display: none !important; }");
    		
    		// Fix width issues for 1024x768 on "BUY/SHOP" section
		// -------------------------------------------------------
		GM_addStyle(".header-panel { min-width: 0px !important; }");
    		GM_addStyle(".header-panel .featured { padding: 23px 0px 0px 0px !important; }");
    		
    		// Take care of Messages & Notes Pages
		// ----------------------------------------
    		GM_addStyle("#sidebar-you-know-what, .mczone-you-know-what { display: none !important; }");
		
		Timer.stop();
		
	}
}

var Timer={

    stop : function(){
    
        clearTimeout(xTimer);
    
    }

}

//-------------------------------------------------------------------//
// * Start the process of Removing ADs and Cleaning Up DeviantART! * //
//-------------------------------------------------------------------//
DeviantART_Ad_Cleaner.start()

