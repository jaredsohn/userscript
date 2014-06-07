// ==UserScript==

// @name           iAmA OP Response Count

// @namespace     http://www.reddit.com/user/jogger19

// @description    A script that runs on /r/IAmA/ page to automatically show underneath the title the number of comments/responses that the author of the AmA has made.

// @include        http://www.reddit.com/*
// @include        http://www.reddit.com/
// @include        http://reddit.com/*

// ==/UserScript==

var alreadyLoaded = false;

// Check if jQuery's loaded
function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    	else { if(alreadyLoaded != true) { $ = unsafeWindow.jQuery; setup(); } }
}

GM_wait();

//How many entries we've loaded (for AutoPage)
var entryCount = 0;

function setup() {
	//Set so this only loads once
	alreadyLoaded = true;
	
	//Get all entries from the page
	var entry = $("#siteTable > div").children(".entry");
	entryCount = entry.length;

	getResponseCount(entry);
	setInterval(checkForNew, 8000);
}

function checkForNew()
{
	//Get all entries from the page
	var entry = $("#siteTable > div").children(".entry");
	
	if(entryCount - entry.length > 0)
	{
		getResponseCountentry(entry.slice(entryCount, entry.length - 1));
		entryCount += entry.length;
	}
}

//For later storing the matching entry element with the url
var entries;

function getResponseCount(entry) 
{
	entries = new Array();
	//Loop through the entries
	for(var i = 0; i < entry.length; i++)
	{
	    //jQuery it
	    var e = $(entry[i]);

	    //Get the url to the AmA page
	    var href = e.children("p.title").children("a.title").attr("href");
		if(href && href.match("IAmA")) {
	    //Add "Loading..." to the tagline
            e.children("p.tagline").html(e.children("p.tagline").html() + " :: <span id=\"tagLineResponseCount\">Loading...</span>");

	    //Set the corrisponding url to the jQuery element
	    entries[href] = e;

	    //Ajax GET the AmA
	    $.ajax({
	      type: "GET",
	      url: href,
	      dataType: "html",
	      success: function(msg){
	           //Re-get the url. We send all requests out at the same time, so we don't know which order they're coming back in.
		   var hrefPat = new RegExp("/r/IAmA/comments/.{5}/([^/]+)");

		   //Get all elements with the class submitter by RegExp    
		   var sPat = new RegExp("class=\"submitter","g");
		   var sPatMatch = msg.match(sPat);

		   //If there is any matches
		   if(msg.match(sPat) != null)
		   {
		       //Divide by two because there are two elements for every submitted comment element
		       var responses = sPatMatch.length / 2;

		       //Get the tagline on this page
		       var tagL = entries[msg.match(hrefPat)[0] + "/"].children("p.tagline").children("#tagLineResponseCount");

		       //Put the response count
		       tagL.text(responses + " response(s)");
		   } else {
		       //There are none, put 0
		       var tagL = entries[msg.match(hrefPat)[0] + "/"].children("p.tagline").children("#tagLineResponseCount");
		       tagL.text("No responses");
		   }
	      }
	    });
	}
	}
}