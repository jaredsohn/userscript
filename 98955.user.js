// ==UserScript==
// @name LJ/DW Title Rewriter
// @namespace http://murklins.talkoncorners.net/
// @description Reformats post titles as "username in community: title" -- useful when tagging in Delicious.
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
        
        // if this is a comm post, get the poster name from the post html
        var poster = "";
        
        if ( (site == "livejournal.com") || (site == "dreamwidth.org") ) {
          // convert subdomain dashes to underscores
          subdomain = subdomain.replace(/-/g, "_");
          
        	var preWroteIn;
        	var posActionBox;
        	var regex;
        	if (site == "livejournal.com") {
        	  posActionBox = respText.indexOf('<hr />');
        	  regex = new RegExp("(.*?) wrote in <span class=\'ljuser ljuser-name_\' lj:user=\'" + subdomain + "\'");
        	}
        	else {
            posActionBox = respText.indexOf('<div class="action-box">');
            regex = new RegExp("(.*?) wrote in <span class=\'ljuser\' lj:user=\'" + subdomain + "\'");
          }
          
          // get the html between the closing head tag and the action box/hr tag
          var posHeadTag = respText.indexOf('</head>');
          preActionBox = respText.substring(posHeadTag, posActionBox);
          if (preActionBox) {
            // get the community name
            preWroteIn = regex.exec(preActionBox);
            if (preWroteIn) {
              preWroteIn = preWroteIn[1];
              var posterTemp = preWroteIn.match(/<span class=\'ljuser.*?\' lj:user=\'(.*?)\'/);
              if (posterTemp) {
                poster = posterTemp[1] + ' in ';
              }
            }
          }
        }
        
        // get the format=light page's title and set it as this page's title
        var titleTemp = respText.match(/<title>(.*?)<\/title>/);
        if (titleTemp) {
          document.title = poster + titleTemp[1];
        } 
			  
 		}  
	};  
	req.send(null);
}