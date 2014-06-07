// ==UserScript==
// @name           gorgor image linker
// @namespace      http://foo.bar.com
// @description    Fark user gorgor has been banned from posting images and links in comment threads.  This script looks for the URLs in his posts and automatically puts the images in their rightful place.
// @include        http://www.fark.com/cgi/*
// @version        1.5
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


// Find all posts by gorgor
function findGorgorPosts(){	
	// Get all gorgor posts...
	return $("a:contains('gorgor')").parents('table').next('div').map(function(){
		return this;
	}).get();
}

// Search through the post body and replace any URLs with their respective links...
function replaceUrls(postBody){
	GM_log("gorgor post: " + postBody.innerHTML);
	//find the URLs:
	var urls = getUrls(postBody.innerHTML);

	if(urls){
		GM_log("found urls");
		for(var i=0; i<urls.length; i++){
			doUrlReplace(postBody, urls[i]);
		}
	}
	else{
		GM_log("no urls found");
	}
}

function getUrls(bodyString){
	var rex = new RegExp("https?://[^<>\\s]+", "ig");
	return bodyString.match(rex);
}

// See if URL is an image so we know if we need an img or a tag for it...
function doUrlReplace(postBody, urlToReplace){
	GM_log("replace gorgor url: " + urlToReplace);

	var allowImgs = GM_getValue("allowImgs", false);
	
	// Check for SFW
	if(allowImgs == "SFW" && postBody.innerHTML.toLowerCase().indexOf("nsfw") >= 0){
		allowImgs = false;
	}
		
	if(allowImgs){
		GM_xmlhttpRequest({
			method:"GET",
			url:urlToReplace,
			onload:function(details){
				var isImage = false;
				if(details.responseHeaders.indexOf("Content-Type: image") >= 0){
					isImage = true;
				}
				
				replaceWorker(postBody, urlToReplace, isImage);
			}
		});
	}
	else{
		replaceWorker(postBody, urlToReplace, false);
	}
}

function replaceWorker(postBody, urlToReplace, isImage){
	var replaceWith = "<a href='" + urlToReplace + "'>" + urlToReplace + "</a>";
				
	if(isImage){
		replaceWith = "<img src='" + urlToReplace + "'><br/>" + replaceWith;
	}
	GM_log("replace " + urlToReplace + " with " + replaceWith);
	
	postBody.innerHTML = postBody.innerHTML.replace(urlToReplace, replaceWith);
}

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_log("wait for jquery");
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
		GM_log("jquery done");
    var gorgorPosts = findGorgorPosts();
    
    GM_log(gorgorPosts.length + " found");
		for(var i=0; i< gorgorPosts.length; i++){
			replaceUrls(gorgorPosts[i]);
		}
}


// Setup menu commands to toggle links vs. images
var allowImgs = GM_getValue("allowImgs", false);

GM_registerMenuCommand((!allowImgs?"*":"") + "show gorgor URLs as links", function(){
	GM_setValue("allowImgs", false);
	location.reload();
});

GM_registerMenuCommand(((allowImgs && allowImgs != "SFW")?"*":"") + "show gorgor URLs as images", function(){
	GM_setValue("allowImgs", "all");
	location.reload();
});

GM_registerMenuCommand(((allowImgs && allowImgs == "SFW")?"*":"") + "show gorgor URLs as images (except NSFW)", function(){
	GM_setValue("allowImgs", "SFW");
	location.reload();
});