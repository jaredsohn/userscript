// RedBubble CSV Stats retrieval for My RedBubble
// Version 1.2
// 2009-07-04
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
// select "RedBubble Work Stats Retriever", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RedBubble Work Stats Retriever
// @namespace     http://www.mattsimner.com/
// @description   Retrieve stats in CSV format from the My RedBubble page for all work types in one hit.  This adds a 'Retrieve CSV Stats' link to your quick links at the top of the page, then presents the retrieved results in tables at the bottom of the page.  Hover over the link for instructions.
// @include       http://www.redbubble.com/mybubble
// ==/UserScript==


	// Add jQuery
    var GM_JQ = document.createElement('script');
    var pendingRequests = 0;
    var worksPerPage = 20;
    GM_JQ.src = 'http://www.mattsimner.com/google/redbubble/jquery-1.2.6.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

	// Check if jQuery's loaded
    function GM_wait() 
    {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    	else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

	function WaitForCompletedResponses(workType) 
	{
		if(pendingRequests > 0) { window.setTimeout(WaitForCompletedResponses,100); }
    	else 
			FormatResults(workType); 
	}
	
	// All your GM code must be inside this function
    function letsJQuery() 
    {

		//Add link to 'Quick links'
		$("#quicklinks>ul").append("<li><a style='background-image: url(http://i433.photobucket.com/albums/qq58/msimner/excel-1.gif); -moz-border-radius-bottomright:10px; -moz-border-radius-bottomleft:10px;' href='javascript:RetrieveStatsData();' title='Click to retrieve current stats from all pages of all types of works.  Results will be presented at the bottom of the page.  NOTE: The browser may lock whilst data is being retrieved.'>Retrieve CSV Stats</a></li>");
		unsafeWindow.RetrieveStatsData = RetrieveStatsData;
	
	}	
		
	function RetrieveStatsData()
	{
		//Remove any existing data
		$(".csv").remove();
		
		//We're going to loop through all the different types of works here
		//var workTypes = new Array("clothing");
		var requestNumber = 0;
		var workTypes = new Array("clothing", "art", "writing", "calendars", "journal");
			
		for(i=0; i < workTypes.length; i++)
		{	
			//Get all other items and show on this page
			var nextPage = 1;
			var endOfWorks = false;
			var workType = workTypes[i];
			var tempTypeDiv = "tempswap_" + workType;
					
			$("<div id='" + tempTypeDiv + "' style='display:none'><table class='works_list'><tbody></tbody></table></div>").appendTo("body");
		
			while(!endOfWorks)
			{
				requestNumber++; //increment unique request number
				var tempDiv = "tempswap_" + requestNumber;
				pendingRequests++; //add to logical queue
				$("<div id='" + tempDiv + "' style='display:none'></div>").appendTo("body");
				
				//Blocking AJAX request
				$("#" + tempDiv).html($.ajax({  url: "/mybubble/" + workType + "?page=" + nextPage, async: false }).responseText);
				
				$("#" + tempDiv + " .works_list tr").appendTo("#" + tempTypeDiv + " .works_list > tbody"); //Add to main content
				endOfWorks = ($("#" + tempDiv + " .pagination .next .inactive").length > 0) || ($("#" + tempDiv + " .pagination .next").length == 0) ; //We're at the end if there's no 'next' link
				$("#" + tempDiv).remove();
				nextPage++;

				pendingRequests--;  //decrement from queue
				
			}
			
			//block here 
			WaitForCompletedResponses(workType);
			$("#" + tempTypeDiv).remove();
		}

		
	}	
		
		function FormatResults(workType)
		{
		
    	//OK - we know we're on an applicable My Redbubble page - so we're only interested in the stats.  We're going to 
    	//get all of these from the page (including the summary) and build a collection that we can spit out into different formats.
    	//We'll initially support CSV for Excel use, but may go to XML etc (as we're just talking formatting).
    	var statsType = $(".mybubble > h1").text();
    	var stats = new Array();
    	var i = 0;

    	var works = $("#tempswap_" + workType + " .works_list tr").each(function() //for each item in works list
    	{
			var currentWork = $(this);
			stats[i] = new WorkInformation();
			stats[i].Description = $(".description .title > a", currentWork).text();
			var currentWorkStats = $(".stats li", currentWork).each(function() //for each stat in this work
			{
				var statText = $(this).text();
				var spaceIndex = statText.indexOf(" ");
				var statType = statText.substr(spaceIndex +1, statText.length - spaceIndex);
				var statValue = statText.substr(0, spaceIndex);
				statValue
				
				//We have the 'type' so put the value in the right bucket
				switch(statType)
				{
					case "sales":
					case "sale":
						stats[i].Sales = statValue;
						break;
					case "comments":
					case "comment":
						stats[i].Comments = statValue;
						break;
					case "favoritings":
						stats[i].Favouritings = statValue;
						break;
					case "views":
						stats[i].Views = statValue;
						break;
					default:
						stats[i].Views = 0;
						stats[i].Favouritings = 0;
						stats[i].Comments = 0;
						stats[i].Sales = 0;
						break;
				}
			
				var dt = new Date();
				stats[i].AsOf = FormatSortableDate(dt);
				stats[i].RBPage = Math.floor(i / worksPerPage) + 1;
				var editSrc = $(".edit-link", currentWork).attr("href");
				var srcParts = editSrc.split("/"); 
				//This is a bit 'interesting' as we have to use the edit link because 'private' items don't have a 'public view', and writing items
				//don't have a thumbnail
				stats[i].ID = srcParts[srcParts.length -2].substr(0, srcParts[srcParts.length -2].indexOf("-"));
			});
			
			i++;
    	});

    	//Now spit out into a usable format (CSV)
    	var csvOutput = "AsOf;Description;Sales;Comments;Favouritings;Views;ID;RBPage\n";
    	for(var item = 0; item < stats.length; item++)
    	{
			csvOutput += stats[item].AsOf + ";" + stats[item].Description + ";" + stats[item].Sales + ";" + stats[item].Comments + ";" + stats[item].Favouritings + ";" + stats[item].Views + ";" + stats[item].ID + ";" + stats[item].RBPage + "\n";
    	}

		$("<div class='CSV' style='clear:both;width:815px;margin-left:30px;'><h2>" + workType + "</h2><pre id='csvStats_" + workType + "'></pre></div>").appendTo("#mybubble-sans-new-nav");
		$("#csvStats_" + workType).text(csvOutput);
		$("#csvStats_" + workType).attr("style", "border: 1px solid #333333; font-family: monotype, courier new; font-size: 0.8em; background-color: #ececec; margin-top: 10px; padding: 6px");
		$("pre").attr("style", "clear:both;");
		
    }

	function FormatSortableDate(dateToFormat) 
	{
	
		return  dateToFormat.getFullYear() + "-" + (dateToFormat.getMonth() +1 ) + "-" + dateToFormat.getDate() + " " + dateToFormat.getHours() + ":" + dateToFormat.getMinutes() + ":" + dateToFormat.getSeconds()
	}
	
	
    function WorkInformation(id, asOf, description, sales, comments, favouritings, views, rbPage)
    {
		this.AsOf = asOf
		this.Description = description;
		this.Sales = sales;
		this.Comments = comments;
		this.Favouritings = favouritings;
		this.views = views;
		this.ID = id;
		this.RBPage = rbPage;
    }