    // ==UserScript==
    // @name           AmateurBoobTube Video Downloader
    // @namespace      amateurboobtube-video-downloader@domain.com
    // @description    Provides direct download link for AmateurBoobTube videos
    // @include        http://www.amateurboobtube.com/videos/*
    // @include        http://amateurboobtube.com/videos/*
    // ==/UserScript==
    
    var embedElement = document.evaluate("//div[@id='video']//div[@id='player']//embed[contains(@flashvars, 'file=')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (embedElement.snapshotLength > 0) {
    	var flashVars = embedElement.snapshotItem(0).getAttribute('flashvars');
    	var videoPath = flashVars.match(/file=(.+?)&/)[1];
		if (videoPath.indexOf('http://') == 0) {
			var videoURL = videoPath;
		} else {
			var videoURL = "http://media.amateurboobtube.com/" + videoPath;
		}
    	var downloadAnchor = document.evaluate("//a[contains(@href, '/download.php')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    	if (downloadAnchor.snapshotLength > 0) {
    		downloadAnchor = downloadAnchor.snapshotItem(0);
    		downloadAnchor.setAttribute("href", videoURL);
    	} else {
    		console.log("No suitable download link found :(");
    	}
    } else {
    	console.log("No suitable flash elment found :(");
    }
