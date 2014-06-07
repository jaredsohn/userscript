// ==UserScript==
// @name           Reddit Inline YouTube Viewer
// @namespace      reddit_youtube_expando
// @description    Add an inline expand button for YouTube links like RES does for images.
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @updateURL      https://userscripts.org/scripts/source/117724.meta.js
// @version        1.2
// ==/UserScript==

// This version of the regex can scrub some technicaly invalid links into valid ones, but I'm not sure
// the list of video ID characters is correct.
var youtubeLinkRegex = new RegExp("(?:^https?://(?:www\\.)?youtube\\.com/watch\\?(?:.*&)*v=([a-zA-Z0-9\\-_]+)(?:#t=(.*$))?)|(?:^http://youtu.be/([a-zA-Z0-9\\-_]+))")

/*
 // Flash Embed
 var starTimeRegex = new RegExp("(?:(\\d+)m)?(\\d+)s")
 function addYouTubeEmbed(videoID, startTime) {
 var videoURL = "http://www.youtube.com/v/" + videoID
 if (startTime) {
 starTimeResult = starTimeRegex.exec(startTime)
 if (starTimeResult) {
 minutes = parseInt(starTimeResult[1])
 if (!minutes) {
 minutes = 0
 }
 seconds = parseInt(starTimeResult[2])
 seconds += minute * 60
 videoURL = videoURL + "&start=" + seconds
 }
 }
 
 var embedDiv = document.createElement("div")
 var embedObject = document.createElement("object")
 embedObject.setAttribute("type",  "application/x-shockwave-flash")
 embedObject.setAttribute("style", "width:450px; height:366px; float: left")
 embedObject.setAttribute("data", videoURL)
 var paramElm = document.createElement("param")
 paramElm.setAttribute("name",  "movie")
 paramElm.setAttribute("value", videoURL)
 embedObject.appendChild(paramElm)
 embedDiv.appendChild(embedObject)
 
 return embedDiv
 }
 */


// IFrame Embed
function addYouTubeEmbed(videoID, startTime) {
    var embedDiv = document.createElement("div")
    var embedObject = document.createElement("iframe")
    embedObject.setAttribute("class",  "youtube-player")
    embedObject.setAttribute("type",   "text/html")
    embedObject.setAttribute("width",  "450")
    embedObject.setAttribute("height", "366")
    if (startTime) {
        embedObject.setAttribute("src",    "http://www.youtube.com/embed/" + videoID + "#t=" + startTime)
    }
    else {
        embedObject.setAttribute("src",    "http://www.youtube.com/embed/" + videoID)
    }
    embedObject.setAttribute("frameborder", "0")
    embedDiv.appendChild(embedObject)
    
    return embedDiv
}

var commentExpandoStyle = "vertical-align:top !important; float: none; width: 23px; height: 23px;" +
"max-width: 23px; max-height: 23px; display: inline-block;" +
"margin-right: 6px; cursor: pointer;  padding: 0px;"

function addButtons(postDiv) {
    var innerLinks = Array.prototype.slice.call(postDiv.getElementsByTagName("a"));
    for (var j in innerLinks) {
        //innerLinks[j].className += " youtubeScanned"
        linkResult = youtubeLinkRegex.exec(innerLinks[j].href)
        if (linkResult) {
            innerLinks[j].className = innerLinks[j].className + " youtubeLinkFound"
            
            function genClickFunc() {
                // Capture these values with closure for the button function
                var theDiv = document.createElement("div")
                var embedObject = null
                // videoID from a youtube.com link || from a youtu.be link
                var videoID = linkResult[1] || linkResult[3]
                var startTime = linkResult[2]
                
                theDiv.setAttribute("class", "expando-button collapsed video")
                theDiv.setAttribute("style", commentExpandoStyle)
                
                var clickFunc = function () {
                    if(theDiv.className.indexOf("collapsed") != -1) {
                        theDiv.setAttribute("class", "expando-button expanded video")
                        if (!embedObject) {
                            embedObject = addYouTubeEmbed(videoID, startTime)
                        }
                        theDiv.parentNode.insertBefore(embedObject, theDiv.nextSibling)
                    }
                    else {
                        theDiv.setAttribute("class", "expando-button collapsed video")
                        theDiv.parentNode.removeChild(embedObject)
                    }
                }
                
                innerLinks[j].parentNode.insertBefore(theDiv, innerLinks[j].nextSibling)
                theDiv.addEventListener('click', clickFunc, true)
            }
            
            genClickFunc()
        }
    }
}

var mdElements = document.getElementsByClassName("md")

// Find all user created comment sections
for (var i in mdElements) {
    if (mdElements[i].tagName == 'DIV') {
        addButtons(mdElements[i]);
    }
}

// hasClass, stolen from the Reddit Enhancement Suite
function hasClass(ele,cls) {
	if ((typeof(ele) == 'undefined') || (ele == null)) {
		console.log(arguments.callee.caller);
		return false;
	}
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

// Add a listener for the DOMNodeInserted event so we can expand emotes in new comments
// created by either a reply or by clicking "load more comments" in large threads.
function handleInsertion( event ) {
    // The actual even we see will be the insertion of the outer "thing" div
    if ((event.target.tagName == 'DIV') && (hasClass(event.target, "thing"))) {
        var mdElements = event.target.getElementsByClassName("md")
        for (var i in mdElements) {
            if (mdElements[i].tagName == 'DIV') {
                addButtons(mdElements[i]);
            }
        }
    }
}

document.body.addEventListener('DOMNodeInserted', handleInsertion, false);