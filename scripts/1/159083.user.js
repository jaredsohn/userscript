// ==UserScript==
// @name		Youtube - Hide watched videos and other useless stuff
// @description	This script will hide all activities on your Youtube-Feed-Subscriptions and shows only uploaded (unseen) videos.
// @namespace	johns-youtube-hide-watched-videos
// @include		https://*.youtube.com/feed/*
// @include		https://*.youtube.com/channel/*
// @include		https://*.youtube.com/user/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version		1.3
// @grant		none
// @run-at		document-end
// ==/UserScript==


//Redirect, if the Link contains "/channel/" redirect to the recent uploads
var oldUrlPath  = window.location.pathname;
if ( /\/channel\//.test(oldUrlPath)) {
	var menuItems = document.getElementById("channel-navigation-menu").getElementsByTagName("li");
	
	for (var i=0; i < menuItems.length; i++)
	{
		var currentElement = menuItems[i];	
		var linky = currentElement.innerHTML.match(/\/user\/.*\/videos/);

		if(linky != null){			
			window.location.replace("https://www.youtube.com" + linky);
			break;															//just for safety
		}
	} 
}
//Redirect, if the feed url doesn't end with "/u" (for uploads) or ! "/subscriptions" or ! "/user/"
else if ( ! /\/u$/.test(oldUrlPath) && ! /\/feed\/subscriptions$/.test(oldUrlPath) && ! /\/user\//.test(oldUrlPath)) {
    var newURL  = window.location.protocol + "//"
                + window.location.hostname
                + oldUrlPath + "/u"
                + window.location.search
                + window.location.hash
                ;
    window.location.replace(newURL);
}


//If we are on the "feed" page
if( /\/u$/.test(oldUrlPath) || /\/feed\/subscriptions$/.test(oldUrlPath)){

	//Hide the first static loaded elements
	hideFeed($("div.feed-page"));

	//Hide dynamically added elements
	$('div.feed-page').live('DOMNodeInserted' ,function(event){
		if(event.target.attributes["class"].nodeValue == 'feed-page'){
			hideFeed($(this));
		}
	});
}


//If we are on the "user" or "channel" page
if( /\/user\//.test(oldUrlPath)){

	//Hide the first static loaded elements
	$(".watched").parent().parent().hide(2000,function () {
		var vid = $(this).find("span[data-context-item-id]").attr("data-context-item-id");
		if(vid.match(/.{11}/g)){
			localStorage.setItem("YTBSPseen", (localStorage.getItem("YTBSPseen") || "") + vid);
		}
	});
	
	//Hide dynamically added elements
	$('li.channels-content-item').live('DOMNodeInserted' ,function(event){
		if(event.target.attributes["class"].nodeValue == 'channels-content-item'){
			$(this).find("div.channel-video-thumb-watched").parent().parent().parent().hide(2000,function () {
				var vid = $(this).find("span[data-context-item-id]").attr("data-context-item-id");
				if(vid.match(/.{11}/g)){
					localStorage.setItem("YTBSPseen", (localStorage.getItem("YTBSPseen") || "") + vid);
				}
			});
		}
	});
}


//The magic happens here for the feed
function hideFeed(e) {
	var tmpContainer = e.find("li.feed-item-container");
	
	tmpContainer.has("span:contains('replied to a')").hide();
			
	tmpContainer.has("span:contains('liked')").hide();

	tmpContainer.has("span:contains('commented')").hide();

	tmpContainer.has("span:contains('added ')").hide();

	tmpContainer.has("span:contains('posted')").hide();
	
	tmpContainer.has("span:contains('created')").hide();

	tmpContainer.has("span:contains('subscribed to a channel')").hide();
				
	tmpContainer.has("span.feed-item-rec").hide();

	// Show combinations of "uploaded and ..."
	tmpContainer.has("span:contains('uploaded and ')").show();

	// But hide watched videos
	tmpContainer.has("div:contains('WATCHED')").hide(4000,function () {
		var vid = $(this).find("div[data-context-item-id]").attr("data-context-item-id");
		if(vid.match(/.{11}/g)){
			// console.info("hideFeed() " + vid);
			localStorage.setItem("YTBSPseen", (localStorage.getItem("YTBSPseen") || "") + vid);
		}
	});
}
