// ==UserScript==
// @name          Google search link on Yahoo! [Context sensitive]
// @namespace     http://sarat.xcelens.co.uk/greasemonkey/googlesearchlinkonyahoo.user.js
// @description	  Reverses Premshree's Yahoo! on Google script to put Google on Yahoo! Duhhh!
//				  This script actually does a context-sensitive search mapping Image search, Video and
//			      other search to Google provided services.
// @include       http://*.search.yahoo.com/*
// @include       http://search.yahoo.com/*
// @include 	  http://local.yahoo.com/*
// @include		  http://shopping.yahoo.com/*
// ==/UserScript==

/*
 * @author		 Sarat Pediredla
 * @version		 1.0
 * @created		 2005-5-18 23:25
 * @email		 sarat [dot] pediredla [at] xcelens [dot] co [dot] uk
 */

(function() {
	if (document.getElementById("yschsp") || document.getElementById("stx")) 
	{
		var searchTerm 
		if(document.getElementById("stx"))
		{
			searchTerm = document.getElementById("stx").value;
		}
		else
		{
			searchTerm = document.getElementById("yschsp").value;		
		}
		var yahooSearchBox = document.getElementById("yschtg");
		// Which kind of search are we on?
		var searchOptions = "";    // Set query string to be passed for certain Google sites
		var currentLocation = window.location.href;
		if(currentLocation.search("images.search.yahoo") != -1)
		{
			googleUrl = "http://images.google.com/images";
		}
		else if(currentLocation.search("video.search.yahoo") != -1)
			 {
				googleUrl = "http://video.google.com/videosearch";				
			 }
			 else if(currentLocation.search("search/dir") != -1)
			 	  {
					googleUrl = "http://www.google.com/search";
					searchOptions = "&cat=gwd%2FTop";
	              }				 
	              else if(currentLocation.search("local.yahoo") != -1)
				  	   {
						   googleUrl = "http://local.google.com/local";
					   }
					   else if(currentLocation.search("news.search.yahoo") != -1)
							{
								googleUrl = "http://news.google.com/news";
							}							
							else if(currentLocation.search("shopping.yahoo") != -1)
								 {
									 googleUrl = "http://froogle.google.com/froogle";
								 } 
								 else
								 {
									 googleUrl = "http://www.google.com/search";
								 }
				 	
		var yahooSearchBoxHtml = yahooSearchBox.innerHTML;
		var googleTag = "<a class=\"yschfirst\" href=\""+ googleUrl +"?q=" + searchTerm;
		if(searchOptions.length > 0)
			googleTag += searchOptions;
		googleTag += "\"> Google! </a>";
		// Add a seperator tag to this
		// Perform fix for Yahoo! Products
		if(currentLocation.search("shopping.yahoo") != -1)
		{
			googleTag = googleTag + "<i> | </i>";
		}
		else
		{
			googleTag = googleTag + "<span class=\"yschsep\"> | </span>";
		}
		// Replace the yschfirst tag in the box as this renders the text awkwardly
		// Also removes the bold focus from current search page to Google
		yahooSearchBoxHtml = yahooSearchBoxHtml.replace(/yschfirst/i, "");
		// Add google tag to start of search box 
		yahooSearchBoxHtml = googleTag + yahooSearchBoxHtml;
		yahooSearchBox.innerHTML = yahooSearchBoxHtml;				
	}
	else
		alert('Not found!');
})();