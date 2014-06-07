// ==UserScript==
// @name Pique's LJ/DW Title Rewriter
// @namespace http://murklins.talkoncorners.net/
// @description Reformats post titles as "title | username".
// @include http://*.livejournal.com/*.html*
// @include http://*.dreamwidth.org/*.html*
// ==/UserScript==

var post = window.location.pathname;
var domainPieces = window.location.host.split(".");
var subdomain = domainPieces.shift();
getNewTitle(subdomain, domainPieces.join("."), post);

function getNewTitle(subdomain, site, post) {  
	var req = new XMLHttpRequest();  
	req.open("GET",  "http://" + subdomain + "." + site + post + "?format=light&nohtml=1&view=flat", true);  
	req.onreadystatechange = function (aEvt) { 
		if (req.readyState == 4) { 
        var respText = req.responseText;
        var poster = "";
        var sep = " | ";
        
        // if this is a comm post, get the poster name from the post html
        if ( ((site == "livejournal.com") && (subdomain == "community")) || (site == "dreamwidth.org") ) {
        	var preWroteIn;
        	if ( (site == "livejournal.com") && (subdomain == "community") ) {
          	var posWroteIn = respText.indexOf("wrote in <span class='ljuser");
        	  preWroteIn = respText.substring(0, posWroteIn);
        	}
       		// dreamwidth URLs don't use community subdomain for comms, so need more complex regex
        	else {
        	  // get the html before the action box
        	  var posActionBox = respText.indexOf('<div class="action-box">');
        	  preActionBox = respText.substring(0, posActionBox);
        	  if (preActionBox) {
							// convert subdomain dashes to underscores
							subdomain = subdomain.replace(/-/g, "_");
							
							var regex = new RegExp("(.*?) wrote in <span class=\'ljuser\' lj:user=\'" + subdomain + "\'");  
          	  preWroteIn = regex.exec(preActionBox); 
          	  if (preWroteIn) {
          	    preWroteIn = preWroteIn[1];          	  
          	  }
          	}
        	}
          if (preWroteIn) {
            var posterTemp = preWroteIn.match(/<span class=\'ljuser.*?\' lj:user=\'(.*?)\'/);
            if (posterTemp) {
              poster = posterTemp[1];
            }
          }
        }
        
        // get the format=light page's title and use it to set the current page's title
        var titleTemp = respText.match(/<title>(.*?)<\/title>/);
        if (titleTemp) {
          // separate the journal name from the post subject
          var titlePieces = titleTemp[1].split(":");
          
          // if poster was not already obtained, set it now
          if (poster == "") {
            poster = titlePieces[0];
          }
          
          document.title = titlePieces[1] + sep + poster;
        } 
			  
 		}  
	};  
	req.send(null);
}