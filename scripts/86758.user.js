// ==UserScript==
// @name           3ICE's Youtube Link Optimizer / Cleaner / Shortener / Tracking Remover
// @namespace      http://3ice.hu/
// @version        3.333
// @description    Removes the annoying extra parameters from YouTube video links.
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// ==/UserScript==

// Thanks to Mewes Kochheim (http://userscripts.org/users/118296) for refactoring my script.
// He also added EventListeners, and changed my huge annoyances array to a simple regexp, /&?feature=[a-z_]*/.
// Now I changed that regexp to a substr, because all YouTube links have the same pattern at the moment.


/**
 * log
 * @author 3ICE
 * @description Helper function, used for logging. Tries console.warn then console.log then throw and finally alert.
 * @param {string} s (What to display.)
 * @ignore
 *//*
function log(s){
	console.warn ? console.warn(s) :
	console.log ? console.log("Error: "+s) :
	window.setTimeout ? window.setTimeout(function(){throw new Error(s);},0) :
	alert("Error: "+s);
}*/


/**
 * isYouTubeLink
 * @author 3ICE
 * @description Helper function, determines whether the link points to a youtube video or not.
 * @param {string} s (What to check.)
 */
function isYouTubeLink(s){
//3ICE: Uncomment the next line for playlist support: Will not clean URLs with "&list=..." in them.
//	if(s.match(/&list=/)){return false;}
	return (s.substr(0,29)=="http://www.youtube.com/watch?") || (s.substr(0,30)=="https://www.youtube.com/watch?");
}


/**
 * CleanURL
 * @author 3ICE
 * @description This function removes all parameters from a YouTube URL, leaving only the video id.
 * @param {string} s (What to clean.)
 * @return {string} s The cleaned URL.
 * @throws Error if the first parameter is not "v".
 */
function CleanURL(s){
/* 3ICE:
	Ugly URL examples:
		"http://www.youtube.com/watch?v=1rnfE4eo1bY&feature=related"
		"http://www.youtube.com/watch?v=1rnfE4eo1bY&playnext=1&videos=1rnfE4eo1bY&feature=mfu_in_order"
	Clean URL example:
		"http://www.youtube.com/watch?v=1rnfE4eo1bY" */

	if(s.substr(4,1)==":"){ //3ICE: this is for normal http
		if(s.substr(28,3)=="?v=" && s.length>42 && s.substr(42,1)!="#"){ //3ICE: Make sure we don't remove #anchors.
			return s.substr(0,42);
		}else{
			//log("Function CleanURL(s) got incompatible URL: \""+s+"\". Returning s with no change.\n(3ICEsYoutubeLinkCleanerShortenerTrackingRemover.user.js:60)")
			return s;
		}
	}
	if(s.substr(4,1)=="s"){ //3ICE: This is for the https protocol
		if(s.substr(29,3)=="?v=" && s.length>43 && s.substr(43,1)!="#"){
			return s.substr(0,43);
		}else{
			return s
		}
	}
}


/**
 * CleanURLs
 * @author 3ICE
 * @description This function calls CleanURL on all YouTube video links.
 */
function CleanURLs(){
	//3ICE: Grab all links into an array:
	var links=document.getElementsByTagName('a');

	//3ICE: Start the loop:
	for(var i=0; i<links.length; i++){
		//3ICE: replace("color: #03c","");
		links[i].style.color="";
		//3ICE: Only optimize links that point to videos.
		if(isYouTubeLink(links[i].href)){
			//3ICE: Finally, remove parameters from the link:
			links[i].href=CleanURL(links[i].href);
		}
	}
}


/**
 * main
 * @author 3ICE
 * @description This function makes sure we are on YouTube, cleans document.location, and registers our EventListeners.
 */
(function(){
/* 3ICE:
 * Prevent the script from running on all websites when using Google Chrome.
 * We have to check whether we are actually on YouTube or somewhere else.
 * Why? Because in Chrome, @includes simply do not work as expected.
 * See http://userscripts.org/topics/60691 for more details and discussion. */
if(!document.location.href.match(/https?:\/\/www\.youtube\.com\//)){return;}
//3ICE: Actually it wouldn't hurt to run this script on all websites. Do we still need this hack? Perhaps not...

//3ICE: Remove parameters from the URL we are at:
if(isYouTubeLink(document.location.href)){
	var l=CleanURL(document.location.href);
	if(l!=document.location.href){document.location.href=l;}
}
//3ICE: Get <body> for attaching our EventListeners:
var b=document.getElementsByTagName("body")[0];

//3ICE: onload is pretty straightforward
b.addEventListener("load",CleanURLs,true);

/* 3ICE:
 * But when we click the [Show More], [Page 2], [Load more suggestions] or [1234 videos]
 * buttons, YouTube loads new videos for us with AJAX. But those still have the ugly
 * parameters like &feature=more_related so we better optimize all links on the page again! */
b.addEventListener("DOMNodeInserted",CleanURLs,true);
/*
//3ICE: On your subscriptions page the visited links are hardcoded to blue. We have to overwrite this silly behavior.
var linkColorOverride=document.createElement("style");
linkColorOverride.type="text/css";
linkColorOverride.innerHTML="a:visited{color:#551A8B;}"; //3ICE: Purple color for visited links. There is no standard...
document.getElementsByTagName("head")[0].appendChild(linkColorOverride);*/

})();

/* 3ICE: List of all annoyances I came across:
"&feature=aso", "&feature=channel", "&feature=chclk",
"&feature=dka", "&feature=featured", "&feature=fvhl",
"&feature=fvhr", "&feature=fvsr", "&feature=fvwk",
"&feature=geo", "&feature=grec_index", "&feature=mhum",
"&feature=mh", "&feature=me_related",
"&feature=popular", "&feature=related",
"&feature=spotlight", "&feature=sub",
"&feature=topvideos", "&feature=watch_response_rev",
"&feature=watch_response", "&eurl=*" */
