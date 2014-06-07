// ==UserScript==
// @name          YousableTube
// @description   Removes ads, allows downloading and resizing videos, displaying all comments on video page, etc.
// @include       http://www.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==

///////////////////////// START OF USER CONFIGURATION ////////////////////////

// Default video player size (a floating point number or either "fill" or "max")
var videoSize = "fill";

// Maximum number of comments under which they will be automatically retrieved (put 0 to disable)
var maxComments = 500;

// Optional junk removal (either "true" or "false", without quotes)
var removeQuicklistIntro = true;
var removeSpOffers = true;

// Automatically expand the description and tags, hide collapse links
var expandDescription = true;
var expandTags = true;
var hideCollapse = true;

///////////////////////// END OF USER CONFIGURATION /////////////////////////

// YouTube Video URL:    http://www.youtube.com/watch?v=[videoId]
// YouTube Download URL: http://youtube.com/get_video?video_id=[videoId]&t=[tId]

// Get video download URL and add link to title
var player = document.getElementById("movie_player");
if (!player) return;

var tId = player.src.match(/t=([^&]+)/)[1];
var videoId = window.location.href.split("?")[1].match(/v=([^&]+)/)[1];
var videoURL = 'http://www.youtube.com/get_video?video_id=' + videoId + '&t=' + tId;

var vidTitle = document.getElementById("video_title");
vidTitle.innerHTML = '<a href="' + videoURL 
	+ '" type="video/x-flv" style="text-decoration:none">' + vidTitle.innerHTML + '</a>';

// Remove top ad (or empty space left by adblock)
var ad = document.getElementById("leaderboardAd");
if (ad) ad.parentNode.removeChild(ad);

// Remove "director video" ads
var dv = document.getElementById("sideAdDiv");
if (dv) dv.parentNode.removeChild(dv);

// Remove "sp offers" ("New on YouTube") ads
if (removeSpOffers) {
	var divs = document.getElementsByTagName("div");
	for (var i=0; i < divs.length; i++)
		if (divs[i].className == "spOffersDiv")
			divs[i].parentNode.removeChild(divs[i]);
}

// Remove quicklist intro
if (removeQuicklistIntro) {
	var ql = document.getElementById("quicklist_intro");
	if (ql) ql.parentNode.removeChild(ql);
}

// Move player below title
var playerDiv = document.getElementById("playerDiv");
var playerParent = playerDiv;
while (playerParent && playerParent.parentNode.id != "baseDiv")
	playerParent = playerParent.parentNode;
if (!playerParent)
	return;

playerParent.id = "contentTable";
playerParent.align = "left";
playerDiv.parentNode.removeChild(playerDiv);
var playerSrc = player.src;
playerSrc.replace("player.swf", "player2.swf");
if (player.src.indexOf("&fs=") == -1) playerSrc += "&fs=1";
if (player.src.indexOf("&watch2=") == -1) playerSrc += "&watch2=1";
player.src = playerSrc;
playerParent.parentNode.insertBefore(playerDiv, playerParent);

// Move info boxes to align stuff properly
var aboutVidDiv = document.getElementById("aboutVidDiv");
if (aboutVidDiv) aboutVidDiv.style.marginTop = document.getElementById("vResponseParent") ? "6px" : "12px";

var aboutExploreDiv = document.getElementById("aboutExploreDiv");
if (aboutExploreDiv) aboutExploreDiv.style.marginLeft = "10px";

// Add video resize links
var watchFull = unsafeWindow.openFull.toString().match(/(\/watch_fullscreen\?video_id=[^"']*)/)[1];
watchFull = watchFull.replace(/\&s=[^&]*/, "");
var linkDiv = document.createElement("div");
linkDiv.id = 'resizeLinks';
linkDiv.innerHTML = 
"&nbsp;<a id='resizeLink0' href='javascript:void(null)' style='text-decoration:none' onclick='resizeVideo(1)'>1x</a> \
- <a id='resizeLink1' href='javascript:void(null)' style='text-decoration:none' onclick='resizeVideo(1.25)'>1.25x</a> \
- <a id='resizeLink2' href='javascript:void(null)' style='text-decoration:none' onclick='resizeVideo(1.5)'>1.5x</a> \
- <a id='resizeLink3' href='javascript:void(null)' style='text-decoration:none' onclick='resizeVideo(1.75)'>1.75x</a> \
- <a id='resizeLink4' href='javascript:void(null)' style='text-decoration:none' onclick='resizeVideo(2)'>2x</a> \
- <a id='resizeLink5' href='javascript:void(null)' style='text-decoration:none' onclick='resizeVideo(\"fill\")'>fill</a> \
- <a id='resizeLink6' href='javascript:void(null)' style='text-decoration:none' onclick='resizeVideo(\"max\")'>max</a> \
- <a id='resizeLink7' href='" + watchFull + "' style='text-decoration:none'>full</a> \
- <a id='resizeLink8' href='javascript:void(null)' style='text-decoration:none' onclick='openFull()'>fullscreen</a>";
playerParent.parentNode.insertBefore(linkDiv, playerParent);

// Expand the video's description if appropriate
if (expandDescription && document.getElementById('vidDescRemain')) {
	unsafeWindow.showInline('vidDescRemain');
	unsafeWindow.hideInline('vidDescBegin');
	unsafeWindow.hideInline('vidDescMore');
	if (hideCollapse) unsafeWindow.hideInline('vidDescLess');
	else unsafeWindow.showInline('vidDescLess');
}

// Expand the video's tags if appropriate
if (expandTags) {
	unsafeWindow.showInline('vidTagsRemain');
	unsafeWindow.hideInline('vidTagsMore');
	if (hideCollapse) unsafeWindow.hideInline('vidTagsLess');
	else unsafeWindow.showInline('vidTagsLess');
}

// Function used to resize video
unsafeWindow.resizeVideo = function(aSize) {
	var player = document.getElementById("movie_player");
	var newH, newW;
	if (aSize == "fill" || aSize == "max") {
		var ch = document.documentElement.clientHeight;
		ch -= aSize == "fill" ? 60 : 32;
		var cw = document.documentElement.clientWidth - player.offsetParent.offsetLeft - 7;
		var vw = (425 / 318) * ch;
		if (vw <= cw) {
			newW = Math.round(vw);
			newH = Math.round(ch) + 32;
		}
		else {
			newW = Math.round(cw);
			newH = Math.round((318 / 425) * cw) + 32;
		}
	}
	else {
		newW = Math.round(425 * aSize);
		newH = Math.round(318 * aSize) + 32;
	}
	player.height = newH;
	player.width = newW;
	
	// This is an ugly hack to force a page redraw...
	var resizeLinks = document.getElementById("resizeLinks");
	resizeLinks.style.display = "none";
	
	// Scroll to video top (doesn't work without timer...)
	var scrollHeight;
	if (aSize == "max") scrollHeight = player.offsetTop + 8;
	else scrollHeight = document.getElementById("video_title").offsetTop + 5;
	window.setTimeout("scrollTo(0, " + scrollHeight + ");", 1);
	
	resizeLinks.style.display = "inline";
}

// Resize the video to default size
if (videoSize) unsafeWindow.resizeVideo(videoSize);


// Workaround a bug where comment form doesn't get focus on click if it was focused before focusing the video
unsafeWindow._printCommentReplyForm = unsafeWindow.printCommentReplyForm;
unsafeWindow.printCommentReplyForm = function(form_id, reply_parent_id, is_main_comment_form) {
	unsafeWindow._printCommentReplyForm(form_id, reply_parent_id, is_main_comment_form);
	var form = document.getElementById("comment_form" + form_id);
	form.elements[5].addEventListener("click",
		function (evt) {
			document.getElementById("movie_player").blur();
			evt.currentTarget.focus();
		}
	, false);
};

// Retrieve all comments if appropriate
if (maxComments) {
	var recentComments = document.getElementById("recent_comments");
	if (!recentComments) return;
	
	var commentsLink = window.location.protocol + "//" + window.location.host + "/comment_servlet?all_comments";
	var cLinks = recentComments.getElementsByTagName("A");
	for (var i=cLinks.length-1; i >= 0 ; i--) {
		if (cLinks[i].href.length > commentsLink.length && cLinks[i].href.substring(0, commentsLink.length) == commentsLink) {
			commentsLink = cLinks[i];
			break;
		}
	}
	if (typeof(commentsLink) == "string") return;
	
	var commentNumber = commentsLink.text.match(/([0-9]+)/)[1];
	if (commentNumber > maxComments) return;
	
	GM_xmlhttpRequest({
	  method: "GET",
	  url: commentsLink.href,
	  onload: function(response) {
		if (response.readyState != 4 || response.status != 200) return;
		
		var startIndex = response.responseText.indexOf('<div id="div_main_comment2"></div>') + 34;
		var endIndex = response.responseText.indexOf('<h2 class="commentHeading">Comment on this video</h2>');
		if (endIndex == -1) endIndex = response.responseText.indexOf('<h2 class="commentHeading">Would you like to Comment?</h2>');
		if (startIndex == 33 || endIndex == -1) {
			GM_log("Error retrieving comments");
			return;
		}
		
		var allCommentsText = response.responseText.substring(startIndex, endIndex);
		var allCommentsContent = document.getElementById("all_comments_content");
		allCommentsContent.innerHTML = allCommentsText;
		
		recentComments.parentNode.removeChild(recentComments);
		
		var allComments = document.getElementById("all_comments");
		allComments.style.display = "block";
		
		aboutExploreDiv.style.marginLeft = "45px";
		
		var commentsTitle;
		if (document.getElementById("vResponseDiv")) {
			var tmpElm = document.getElementById("reply_main_comment2");
			while (tmpElm && tmpElm.tagName != "TABLE") tmpElm = tmpElm.parentNode;
			commentsTitle = tmpElm.getElementsByTagName("B")[0];
		}
		else commentsTitle = document.getElementById("commentsDiv").getElementsByTagName("H2")[0];
		commentsTitle.innerHTML = "Text Comments (<a href='" + commentsLink.href 
								+ "' style='text-decoration:none'>" + commentNumber + "</a>)";
	  }
	});
}