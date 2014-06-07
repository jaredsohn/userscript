// RedBubble Advanced Search Widget
// Version 0.3
// 2009-05-14
// Copyright (c) 2009, Matt Simner <http://www.mattsimner.com/>
// Released under the GPL
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "RedBubble Advanced Search Widget", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RedBubble Advanced Search Widget
// @namespace     http://www.mattsimner.com/
// @description   perform 'advanced' search functions on Redbubble such as search by product and search for people
// @include       http://www.redbubble.com/*
// ==/UserScript==


	// Add jQuery
    var GM_JQ = document.createElement('script');
    var pendingRequests = 0;
    GM_JQ.src = 'http://www.mattsimner.com/google/redbubble/jquery-1.2.6.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

	// Check if jQuery's loaded
    function GM_wait() 
    {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    	else { jQuery = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

	// All your GM code must be inside this function
    function letsJQuery() 
    {
		jQuery.noConflict(); //interferes with RB Prototype library
		//Add link
		jQuery("#search-global").prepend("<a href='javascript:ToggleAdvancedSearch();' style='font-size:0.8em;margin-top:8px;display:block;float:left;margin-right:4px;' title='Show advanced search options.'>options</a>");
		unsafeWindow.ToggleAdvancedSearch = ToggleAdvancedSearch;
		unsafeWindow.ChangeFormTarget = ChangeFormTarget;
		unsafeWindow.ResetChecked = ResetChecked;
		
	
	}	

  function ChangeFormTarget(type)
  {
    switch(type)
    {
      case 0: //everything
        jQuery("#search-global-button").click(function() 
        {
          document.location="/search/"+escape(document.getElementById("search-global-query").value).replace("/","%2f").replace(".","%2e");return false;
        });
        break;
      case 1: //art
        jQuery("#search-global-button").click(function() 
        {
          document.location="/search/"+escape(document.getElementById("search-global-query").value).replace("/","%2f").replace(".","%2e") + "/art";return false;
        });
        break;
      case 2: //clothing
        jQuery("#search-global-button").click(function() 
        {
          document.location="/search/"+escape(document.getElementById("search-global-query").value).replace("/","%2f").replace(".","%2e") + "/clothing";return false;
        });
        break;
      case 3: //calendars
        jQuery("#search-global-button").click(function() 
        {
          document.location="/search/"+escape(document.getElementById("search-global-query").value).replace("/","%2f").replace(".","%2e") + "/calendars";return false;
        });
        break;
      case 4: //writing
        jQuery("#search-global-button").click(function() 
        {
          document.location="/search/"+escape(document.getElementById("search-global-query").value).replace("/","%2f").replace(".","%2e") + "/writing";return false;
        });
        break;            
      case 5: //journals
        jQuery("#search-global-button").click(function() 
        {
          document.location="/search/"+escape(document.getElementById("search-global-query").value).replace("/","%2f").replace(".","%2e") + "/journals";return false;
        });
        break;    
      case 6: //people
        jQuery("#search-global-button").click(function() 
        {
          document.location="/foyer/search?tag="+escape(document.getElementById("search-global-query").value).replace("/","%2f").replace(".","%2e");return false;
        });
        break;  
      case 7: //groups
        jQuery("#search-global-button").click(function() 
        {
          document.location="/groups/search?q="+escape(document.getElementById("search-global-query").value).replace("/","%2f").replace(".","%2e");return false;
        });
        break;  
      case 8: //forums
        jQuery("#search-global-button").click(function() 
        {
          document.location="/groups/redbubble/forums/posts/search?q="+escape(document.getElementById("search-global-query").value).replace("/","%2f").replace(".","%2e");return false;
        });
        break;  
        
	}        
  }	
  	
  	//Reset checkbox and form action to defaults
  	function ResetChecked()
  	{
		if (jQuery("#searchAll").length > 0)
		{
			//Reset checkboxes
			jQuery("#searchAll").checked = "checked";
			ChangeFormTarget(0);
		}
  	}
  	
	function ToggleAdvancedSearch()
	{
		if (jQuery("#advancedsearch").length > 0)
		{
			if (jQuery("#advancedsearch").css("display") == "none")
			{
				//Reset checkboxes
				jQuery("#searchAll").attr("checked", "checked");
			}
			jQuery("#advancedsearch").toggle("normal");
		}
		else
		{	
			//Remove any existing data
			jQuery("#search").append("<div id='advancedsearch'><strong>Search...</strong><br/><input id='searchAll' name='searchType' type='radio' value='0' checked='checked' onclick='ChangeFormTarget(0);'/>&nbsp;Everything<br/><br/><strong>Works</strong><br/><input name='searchType' type='radio' value='1'  onclick='ChangeFormTarget(1);'/>&nbsp;Art&nbsp;&nbsp;<input name='searchType' type='radio' value='2' onclick='ChangeFormTarget(2);'/>&nbsp;T-Shirts&nbsp;&nbsp;<input name='searchType' type='radio' value='3' onclick='ChangeFormTarget(3);'/>&nbsp;Calendars&nbsp;&nbsp;<input name='searchType' type='radio' value='4' onclick='ChangeFormTarget(4);'/>&nbsp;Writing&nbsp;&nbsp;<input name='searchType' type='radio' value='5' onclick='ChangeFormTarget(5);'/>&nbsp;Journals&nbsp;&nbsp;<br/><br/><strong>Other - Find...</strong><br/><input name='searchType' type='radio' value='6' onclick='ChangeFormTarget(6);'/>&nbsp;People&nbsp;&nbsp;<input name='searchType' type='radio' value='7' onclick='ChangeFormTarget(7);'/>&nbsp;Groups&nbsp;&nbsp;<input name='searchType' type='radio' value='8' onclick='ChangeFormTarget(8);'/>&nbsp;In Forums<span style='float:right;'><a href='#' onclick='ResetChecked();ToggleAdvancedSearch()'>Close</a></span></div>");
			jQuery("#advancedsearch").attr("style", "display:none; background-color: #f8f8f8; width: 300px; height: 130px; border: 1px solid #cccccc; padding: 6px;top: 30px; top: 80px; left: 798px; height: 145px; z-index: 100; position: absolute; -moz-border-radius: 4px; line-height:1.2em; font-size:0.7em;text-align:left");
			//fade in
			jQuery("#advancedsearch").toggle("normal");
		}
	}	
		
