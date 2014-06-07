// ==UserScript==
// @name        FeedLink
// @description Displays images for the feeds (rss,atom,etc...) that is available from the site.
// @include     http://*.blogspot.com*
// @include     http://www.livejournal.com/users/*
// ==/UserScript==
 
(function() {

// This script will create the necessary functions and adds a handler to onLoad function hook
// The reason is, the greasemonkey plugins will be called after creating DOM of document
// and before onLoad function of body is called. So changing DOM that is now available
// may lead to few problems in firefox.
window.addEventListener("load",addFeedLinks,false);

function addFeedLinks() {
    // First discover the feeds
    var feeds = discoverFeeds();
                                                                                                               
    var feedlinkDiv = document.createElement("div");
    for(feedname in feeds) {
        feedlinkDiv.appendChild(getLinkElementToAdd(feedname,feeds[feedname]));
    }
    document.body.appendChild(feedlinkDiv);
}

function discoverFeeds() {
	var links = document.getElementsByTagName("link");
	var linkmap = new Object();

	for(idx = 0; idx < links.length; ++idx) {
		var link = links.item(idx);
		if(link.rel == "alternate")	{
			// link type can be: (application/atom+xml) ,(application/rss+xml), (text/xml), ...
			var feedtype = (link.type.split('/'))[1];
			// now feedtype can be: (atom+xml), (rss+xml), (xml), (undefined)
			switch(feedtype) {
				case "atom+xml": linkmap["atom"] = link.href; break;
				case "rss+xml" : linkmap["rss"]  = link.href; break;
				case "xml"     : linkmap["xml"]  = link.href; break;
			}
		}		
	}
	return linkmap;
}
function getLinkElementToAdd(feedname,linkurl) {
	var imgelem = document.createElement("img");
	imgelem.setAttribute("align","right");
	imgelem.setAttribute("border","0");
	imgelem.setAttribute("hspace","2");

	var linkelem = document.createElement("a");
	linkelem.setAttribute("href",linkurl);
	linkelem.setAttribute("title",linkurl);
	linkelem.appendChild(imgelem);

	// set img src depending on feedname which can be (atom,rss,xml)
	switch(feedname) {
		case "atom": imgelem.setAttribute("src",ATOMIMGDATA); break;
		case "rss" : imgelem.setAttribute("src",RSSIMGDATA);  break;
		case "xml" : imgelem.setAttribute("src",XMLIMGDATA);  break;
	}
	return linkelem;
}

// Image data:
const ATOMIMGDATA = 
"data:image/gif;base64,R0lGODlhVAASAKEAAICAgP////+AQP///ywAAAAAV" +
"AASAAACt4SPqcvtD1eYtNqLs968VxMI4kiW5omWQcQ+KxCm8iy/7Z28Mc33Ng7U" +
"mXYCy4hyVKVsFtin+YEISSFikZos7ibLww+WC4OkIKV1a95aqV5xG/H7KqbJc7Z" +
"+rXZBFH4fCudSdkeEhqWnh8LkNhb41kCnhURolnel+NiYCbY5N3hJGRozuse5+b" +
"UoCHMnYnjE1RoLOnT6ZDsREdmziwnkq8sbfOT7+yl8XEQc5OfR7PwMHaU8TY1TAAA7"; 

const RSSIMGDATA =
"data:image/gif;base64,R0lGODlhVAASAKEAAICAgP////+AQP///ywAAAAAV" +
"AASAAACq4SPqcvtD1eYtNqLs968VxMI4kiW5omWQcQ+KxCm8iy/7Z28Mc33Ng7U" +
"jSxDSnHSUx0ssA/zAxGKdoIQ1Uqi+pa5LsL2Y0irWbIqiQJ7ud+2Y0ycapHo7JI" +
"CcjrdDfjURFdUN8VWCLIG4wIyxAjoWKfGdygZpuD3Z/Z3NRhpmMhXabmIiVlxpL" +
"U1eYf3hBc1OhhLCEQ7JstJWwt7C5kblOcRLDxMzOR7jAxUAAA7";

const XMLIMGDATA =
"data:image/gif;base64,R0lGODlhVAASAKEAAICAgP////+AQP///ywAAAAAV" + 
"AASAAACsISPqcvtD1eYtNqLs968VxMI4kiW5omWQcQ+KxCm8iy/7Z28Mc33Ng7U" +
"jXaCELGI7J1sFtin+YEIh6LYZGhULg8/WO4LkoJI1uruetQWuWA24tdVTLHUbFZ" +
"N5lJAz+fbNUZ2hmSHlxf2l+iG2DCXVFaYpsXUxmgZB0ZU9liVZLhm6aXIiJlJVd" +
"dJWIFH+da3FwUI80lbCiQ2S2toe+vgqKvE28ug42F8jJx8MczcfFsAADs="; 

}) ();
