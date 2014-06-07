// ==UserScript==

// @name           iAmA OP Response Count

// @namespace     http://www.reddit.com/user/jogger19

// @description    A script that runs on /r/IAmA/ page to automatically show underneath the title the number of comments/responses that the author of the AmA has made.

// @include        http://www.reddit.com/*
// @include        http://www.reddit.com/
// @include        http://reddit.com/*

// ==/UserScript==
function responseCount() {
	var alreadyLoaded = false;

	// Check if jQuery's loaded
	function GM_wait() {
		if (typeof $ != 'undefined') { setup(); } //Opera
		else if (typeof this.jQuery != 'undefined') { $ = this.jQuery; setup(); } //Chrome
		else if (typeof unsafeWindow != 'undefined' && typeof unsafeWindow.jQuery != 'undefined') { $ = unsafeWindow.jQuery; setup(); } //Firefox
		else window.setTimeout(GM_wait, 100);
	}

	GM_wait();

	function setup() {
		//Set so this only loads once
		alreadyLoaded = true;
	
		//Get all entries from the page
		var entry = $("#siteTable > div").children(".entry");
	
		//Check to see if this page has entries
		if(entry.length > 0)
		{
			getResponseCount(entry);
		}
	}

	//For later storing the matching entry element with the url
	var entries;

	function getResponseCount(entry) 
	{
		//Set entries to a new Array
		entries = new Array();

		//Loop through the entries
		for(var i = 0; i < entry.length; i++)
		{
			//jQuery it
			var e = $(entry[i]);

			//Get the url to the AmA page
			var href = e.children("p.title").children("a.title").attr("href");
	
			//Check to see if this entry is an IAmA
			if(href && href.match("IAmA")) 
			{
				//Get the comments Anchor
				var cA = e.children("ul.flat-list").children("li.first").children("a.comments");

				//Add "Loading..." to the tagline
				cA.html(cA.html() + " (<span id=\"tagLineResponseCount\">loading...</span>)");

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
						var responces = sPatMatch.length / 2;

						//Get the tagline on this page
						var tagL = entries[msg.match(hrefPat)[0] + "/"].children("ul.flat-list").children("li.first").children("a.comments").children("#tagLineResponseCount");

						//Put the response count
						tagL.text(responces + " by submitter");
					   } else {
						//There are none, put 0
						var tagL = entries[msg.match(hrefPat)[0] + "/"].children("ul.flat-list").children("li.first").children("a.comments").children("#tagLineResponseCount");
						tagL.text("none by submitter");
					   }
					}
				});
			}
		}
	}
}

//Load it into the window so we can use local vars
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + responseCount + ")();";

document.body.appendChild(script);
