// ==UserScript==
// @name           DivX Stage6 linkThemAll
// @namespace      http://the.J.
// @description    Download DivX files directly from the video gallery or video site!
// @include        http://stage6.divx.com/*
// ==/UserScript==


window.addEventListener("load", function(e) {
	createPreviewLinks();
	createVideoLink();
       
}, false);


function getElementsByClass(searchClass) {
	
	var searchClassElements = new Array();
	var allElements = document.getElementsByTagName("*");
	var allElementsLength = allElements.length;
	var pattern = new RegExp(searchClass);

	for (i = 0, j = 0; i < allElementsLength; i++) {
 		if ( pattern.test(allElements[i].className) ) {
 			searchClassElements[j] = allElements[i];
 			j++;
 		}
	}
	return searchClassElements;
}

function createPreviewLinks() {
	
	var videoDescription;
	var videoUrl;
	var videoID;
	var videoLink;
	var videoLinkNode;
	
	var videoArray = getElementsByClass("\\bvideo-title\\b");
	var targetArray = getElementsByClass("-icon\\b");
	
	for (i = 0; i < videoArray.length; i++) {
 
		videoLinkNode = videoArray[i].firstChild.firstChild;
		
		videoDescription = videoLinkNode.innerHTML;
	 	
		videoID = getVideoID(videoLinkNode.href);
		
		videoUrl = 'http://video.stage6.com/' + videoID + '/.' + videoDescription + '.divx'
		
		videoLink = '&nbsp;&nbsp;&nbsp;<div class="channel-icon" style="display:inline"><a class="entity" title="Direct Download" href="' + videoUrl + '">DivX file</a></div';
 	
		targetArray[i].innerHTML = targetArray[i].innerHTML + videoLink;
	}
}


function createVideoLink() {
	
	var videoDescription;
	var videoUrl;
	var videoID;
	var videoLinkEmbed;
	var videoLinkShare;
	var targetShare = document.getElementById("share-video");
	var targetEmbed = document.getElementById("video-embed");
	var locationArray = document.location.href.split("/");
	
	if (locationArray.length >= 7) {
		
		if (locationArray[3] == "user") {
        	
			videoDescription = locationArray[7];
    	} else {
	  		
			videoDescription = locationArray[6];
    	}
		
		videoID = getVideoID(document.location.href);
		
		videoUrl = 'http://video.stage6.com/' + videoID + '/.' + videoDescription + '.divx'
		
		videoLinkEmbed = '&nbsp;&nbsp;&nbsp;<div class="channel-icon" style="display:inline"><a class="entity" title="Direct Download" href="' + videoUrl + '">DivX file - direct link</a></div';
 	
		videoLinkShare = '<li><a href="' + videoUrl + '" class="vid-share function" id="video_control_share">DivX file</a></li>';
		
		document.getElementById("video_control_favorite").innerHTML = "Favorites";
		document.getElementById("video_control_add").innerHTML = "Channel";
		
		targetShare.innerHTML = videoLinkShare + targetShare.innerHTML;
		targetEmbed.innerHTML = targetEmbed.innerHTML + videoLinkEmbed;
	}
}


function getVideoID(urlWithID) {
	
	videoID = urlWithID.split("/");
	
	if (videoID[3] == "user") {
        videoID = videoID[6];
    } else {
	  	videoID = videoID[5];
    }
	return videoID;
}

