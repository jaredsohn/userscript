// ==UserScript==
// @name           Windows Media Player Embedder
// @namespace      Armada
// @include        http://*
// ==/UserScript==

// User configuration

//Extensions this script will respond to, in lower case
var extensions = [
	"mp3",
	"wma",
	"aac",
	"wav",
	"mp4",
	"wmv",
	"avi",
	"mpeg",
	"mpg",
	"au",
	"aif",
	"asf"
];

//Video player configuration
videoWidth = "480";
videoHeight = "384";
var videoOptions = [
	"autostart=true"
];

//Audio player configuration
audioWidth = "320";
audioHeight = "64";
var audioOptions = [
	"autostart=true"
];

//This will turn off the AJAX requests and always inject the video player.
//Turn this on if the script tries to follow a link instead of playing the media file.
var ignoreHeader = false;

// End of user configuration

//The anchor of the active player
var anchor;
//The paragraph of the active player
var p;
//The AJAX request currently being processed
var ajax;

//Loading icon in base64
var loadingIcon = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///05XV9TW1nuCgk5XV5GXl6isrLO2tiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="

//Add our listener to every link on the page if it has a known extension
for(var i=0; i<document.links.length; i++) {
	var a = document.links[i];
	var file = a.href.substr(a.href.lastIndexOf("/")+1);
	
	var fileDot = file.lastIndexOf(".");
	
	if(fileDot > 0) {
		var fileExt = file.substr(fileDot+1);
		for(var j=0; j<extensions.length; j++) {
			if(fileExt.toLowerCase() == extensions[j]) {
				a.addEventListener("click", click, false);
			}
		}
	}
}

//When one of our anchors is clicked
function click(e) {
	e.preventDefault();
	
	if(ajax != null) {
		//If we were already processing an AJAX request, abort it
		ajax.abort();
		anchor.parentNode.removeChild(p);
	}
	else if(anchor != null && p != null) {
		//If there's an active player, remove it
		anchor.parentNode.removeChild(p);
		if(this.href == anchor.href) //Did we already play this file?
		{
			//We don't want to play it again
			anchor = null;
			p = null;
			return;
		}
	}
	
	//Save this anchor for later
	anchor = this;
	
	//Make a player paragraph
	p = document.createElement("P");
	p.style.width = 16;
	p.style.height = 16;
	anchor.parentNode.insertBefore(p, anchor.nextSibling); //Insert the player after the anchor
	
	if(ignoreHeader) {
		//If the user chose to ignore headers, inject immediatly
		injectPlayer(p, anchor.href, videoWidth, videoHeight, videoOptions);
	}
	else {
		//Add a loading icon when we are making an AJAX request
		p.innerHTML = "<img src='" + loadingIcon + "' />";
		
		//Request the header so we can see what type of file this is
		ajax = GM_xmlhttpRequest({
			url: anchor.href,
			method: "HEAD",
			onerror: error,
			onload: load
		});
	}
}

//AJAX onload callback method
function load(response) {
	//AJAX request complete
	ajax = null;
	
	//Check if the request was successful
	if(status == null || status == 404) {
		error();
		return;
	}
	
	//Get the response headers
	var header = response.responseHeaders;
	
	//Filter the content-type
	var contentPos = header.indexOf("Content-Type: ");
	var eol = header.indexOf("\n", contentPos+14);
	if(contentPos == -1 || eol == -1) {
		error(); //Malformed header
		return;
	}
	var content = header.substring(contentPos+14,eol);
	var contentArray = content.split(/\/|\; /); //Split on '/' or '; '
	
	//Check what file-type this is
	if(contentArray[1] == "html") {
		//A webpage, visit it
		error();
	}
	else if(contentArray[0] == "video") {
		//This is a video file
		injectPlayer(p, anchor.href, videoWidth, videoHeight, videoOptions);
	}
	else if(contentArray[0] == "audio") {
		//This is an audio file
		injectPlayer(p, anchor.href, audioWidth, audioHeight, audioOptions);
	}
	else if(contentArray[0] == "application") {
		//This is probably a media file, embed a video player
		injectPlayer(p, anchor.href, videoWidth, videoHeight, videoOptions);
	}
	else {
		//File-type not recognized
		error();
	}
}

//Error handler
function error() {
	var href = anchor.href
	anchor.parentNode.removeChild(p);
	anchor = null;
	p = null;
	location.href = href;
}

//Inject the player, if you want to change the player, all you have to do is edit this function
function injectPlayer(elem, src, width, height, options) {
	var embed = "<embed type='application/x-ms-wmp' src='" + src + "' width=" + width + " height=" + height + " ";
	for(var i=0; i<options.length; i++)
	{
		embed += options[i] + " ";
	}
	embed += "/>";
	elem.innerHTML = embed;
	elem.style.width = width + "px";
	elem.style.height = height + "px";
}
