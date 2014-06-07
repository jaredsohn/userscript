// ==UserScript==
// @name           YouTubeProfileImageInComments
// @namespace      faleij
// @description    Adds authors profile image to their comments
// @include        htt*://www.youtube.com/*
// @updateURL      http://userscripts.org/scripts/source/123181.meta.js
// @version	   0.0.3
// ==/UserScript==
function sendRequest(Url,user,postData) {
	GM_xmlhttpRequest({
	method : ((postData) ? "POST" : "GET"),
	url : Url,
	onload : function (req) {
		if (req.readyState != 4) return;
		if (req.status != 200 && req.status != 304) {
			unsafeWindow.console.error('HTTP error ' + req.status);
			return;
		}
		user.process(req);
	}
	});
}

function User(elmt){
	this.elmt = elmt;
	this.profileName = elmt.querySelector(".yt-user-name").textContent.trim();
	this.profilePictureUrl;
	this.profileUrl = elmt.querySelector(".yt-user-name").getAttribute("href");
	
	this.process = function(req,user){
		var json = JSON.parse(req.responseText);
		this.profilePictureUrl = json.entry.media$thumbnail["url"];
		unsafeWindow.console.log("Got:"+this.profilePictureUrl);
		this.createCommentImage();
	};
	this.getProfilePictureUrl = function(){
		sendRequest("http://gdata.youtube.com/feeds/api/users/"+this.profileName+"?v=2&alt=json",this);
	};
	this.createCommentImage = function(){
		var html = '<a href="'+this.profileUrl+'" class="yt-user-photo comments-post-profile"><span class="profile-thumb ux-thumb ux-thumb-profile-46" style="margin:3px;margin-top:6px;box-shadow: 0px 0px 3px #888;"><img src="'+this.profilePictureUrl+'" style="width:44px;height:auto;" alt="'+this.profileName+'"><span class="vertical-align"></span></span></a>';
		if(!this.elmt.querySelector(".comment-text").querySelector(".yt-user-photo"))
			this.elmt.querySelector(".comment-text").innerHTML = html + elmt.querySelector(".comment-text").innerHTML;
	};
}

function FixComments(){
	console.log("FixComments");
	var comments = document.querySelectorAll("li.comment");
	for(x=0; x < comments.length; x++){
		if(comments[x].querySelector(".yt-user-photo"))
			return;
		var user = new User(comments[x]);
		user.getProfilePictureUrl();
	}
}
var fixTimeout;
function fixTimer(){
    console.log("cleartimer");
	clearTimeout(fixTimeout);
	fixTimeout = setTimeout(FixComments,500);
}
document.getElementById("comments-view").addEventListener("DOMNodeInserted", fixTimer, false);
FixComments();