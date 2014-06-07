// ==UserScript==
// @name           Show YouTube Star Ratings
// @description    Shows star ratings and number of ratings on YouTube video pages without requiring you to rate the video first.
// @version        1.1.0
// @require        http://usocheckup.dune.net/73110.js
// @include        http://*youtube.com/*
// ==/UserScript==

function appendJS(strJsFile) {
	document.body.appendChild(document.createElement('script')).src = strJsFile;
}
function insertSiblingBefore(oldSibling, newSibling) {
	oldSibling.parentNode.insertBefore(newSibling, oldSibling);
}
function getOffset(n) {
    switch(Math.round(n*2)/2){
        case 0: return [-75, -110];
        case 0.5: return [-59, -126];
        case 1: return [-59, -110];
        case 1.5: return [-44, -126];
        case 2: return [-44, -110];
        case 2.5: return [-29, -126];
        case 3: return [-29, -110];
        case 3.5: return [-15, -126];
        case 4: return [-15, -110];
        case 4.5: return [0, -126];
        case 5: return [0, -110];
    }
}
unsafeWindow.jsonCallBack = function jsonCallBack(root) {
	var rating = 0;
	var ratingCount = 0;
	var strRatingHTML;	
	try {
		rating = root.feed.entry[0].gd$rating.average;
		ratingCount  = root.feed.entry[0].gd$rating.numRaters;
	} catch(e) {
		rating = -1;
		ratingCount = -1;
	}
	var sibDiv = document.getElementById("watch-actions");
	if (sibDiv) {
		if ( rating >= 0 ) {
			rating = Math.round(rating*10)/10;
			strRatingHTML = '<div style="float: left; background: transparent url(\'http://s.ytimg.com/yt/img/master_watch5-vfl155666.png\') no-repeat ' + getOffset(rating)[0] + 'px ' + getOffset(rating)[1] + 'px; width: 75px; height: 16px; margin: -2px 5px;"></div>';
			strRatingHTML += " &nbsp; Rating: " + rating + " out of 5 &nbsp; &nbsp; Number of Ratings: " + ratingCount;
		} else {
			strRatingHTML = "unable to find rating";
		}
		var newDiv = document.createElement("div");
		newDiv.style.margin = '0px 0px 5px 0px';
		newDiv.innerHTML = strRatingHTML;
		insertSiblingBefore(sibDiv, newDiv);
	}
}

function parseId(url) {
	var patt = /[?#&]v=([^&]+)/;
	var result = patt.exec(url);
	return (result!=null && result.length == 2) ? result[1] : '';
}

var strLoc = document.location.href;
var video_id = parseId(strLoc);
if ( video_id != "" ) appendJS("http://gdata.youtube.com/feeds/api/videos?v=2&max-results=1&safeSearch=none&q=" + video_id + "&alt=json-in-script&callback=jsonCallBack");
