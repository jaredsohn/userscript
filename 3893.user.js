// Hello World! example user script
// version 0.1 BETA!
// 2006-04-18
// Copyright (c) 2006, Ed Botzum
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Odeo Inbox Update", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Odeo Inbox Update
// @namespace     http://www.chocolatay.com/scripts
// @description   Updates your odeo inbox by checking to see if there are new podcasts for any of your subscriptions.
// @include       http://odeo.com/*
// ==/UserScript==
window.addEventListener("load", function(e) {
	// Get the podcasts
	var podcasts, podcast;
	var updateText = "";
	
	// Write out some text for where the notifications come in
	document.getElementById("main-body").innerHTML += "<p style=\"font-weight:bold;\">Finished getting new shows for:</p><ol id=\"show-returns\"></ol>";
	podcasts = document.getElementById("sync-subs").getElementsByTagName('li');
	for (var i = 0; i < podcasts.length; i++) {
		podcast = podcasts[i];
		
		// Create the button
		var logo = "data:image/gif,GIF89aF%00%14%00%B3%00%00%3A%5B%86%DD%DD%DDIj%95%FF%FF%FF%60%81%ACAb%8D%3C%5D%89De%91%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%08%00%2C%00%00%00%00F%00%14%00%00%04%F0p%C8I%AB%BD8%EBm%89%FF%60(%8Edi%96%15!%ACl%EB%BEp%2C%CF2%40%A9t%AE%EF%BA%1DH8%9Ep%B8%F3%01%89%C8%24%EB%C0%3C%18%07A%D9%046xIVUXs%CB%EDn%9FQ*%2B%DB%22c%CF%E6%A5%D29%F8Aii%C1u%3A.%D3%E5%F3%B3%1C%1F_%15%C0%5E%5B%03L%12%07%83%86%88%5C%85%89%88%87%8D%8F%8E%81%7Fm%40%81M%8E%83%14%8C%8A%8C%99%07%05%90%89%8B%5E%93n%04%96%84%97%9B%91%A2%9D%88%05%05%87%9E%82%81%06%06%94P%B0%BA%BB%BA%13%BD%12%B1%03%BC%C0%B1%BD%B0%13%B6%B7%CA%B7%12%C9%CE%CE%B8%04%BC%D3%D4%D3%CF%D7%D8%D9%DA%D7%D1%D4%DB%DF%E0%E1%E0%D1%E2%E5%E6%C9%00%E9%EA%EB%EC%E9%E4%E7%E1%ED%F2%F3%F4%EB%B8%03%E2%F5%FA%FB%FC%F6%F7%1C%00%03%0A%DC%E0fB%80%83%08%13*%5C%C8%B0%A1%C3%87%0E'D%00%00%3B";

		// Get the show id
		var link, showID, showName;
		link = podcast.getElementsByTagName('a')[0];
		showID = link.id.substr(1);
		showName = podcast.getElementsByTagName('a')[1].innerHTML;
		//podcast.getElementsByTagName('div')[0].innerHTML = "<a href=\"http://odeo.com/channel/check_for_updates/" + showID + "\"><img rel=\"button\" src=\"" + logo + "\" /></a>" + podcast.getElementsByTagName('div')[0].innerHTML;
		//podcast.innerHTML += "&nbsp;";

		// Load the latest data by default
		GM_xmlhttpRequest({
	    	method: 'GET',
		    url: 'http://odeo.com/channel/check_for_updates/' + showID,
	  	  	headers: {
	    	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	      	  	'Accept': 'text/html',
		    },
	  	  	onload: function(responseDetails) {
	    	    showTitle = responseDetails.responseText.split("title")[1].substr(6);
	    	    updateText = "<li>" + showTitle + " returned " + responseDetails.status + " - " + responseDetails.statusText  + "</li>\r\n";
	    	    document.getElementById("show-returns").innerHTML += updateText;
		    }
		});
	}
}, false);
