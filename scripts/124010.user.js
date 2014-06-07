// ==UserScript==
// @name           Reddit Display Inline Image
// @namespace      http://userscripts.org/users/432375
// @description    Displays linked imgaes directly in the page
// @version        2.0
// @updateURL      https://userscripts.org/scripts/source/124010.meta.js
// @include        http://www.reddit.com/*
// @author         aditya
// @grant          GM_xmlhttpRequest
// ==/UserScript==

var init = function(){
	var directLinks = [], indirectLinks = [];
	var titleLink = document.getElementsByClassName("title");
	var i = 0,j = 0, url;
	var re = /jpg$|jpeg$|png$|gif$/i;
	
	for(idx in titleLink){
		if(titleLink[idx].tagName == "A"){
			var obj = {};
			url = titleLink[idx].getAttribute('href');
			if(url.search(re) != -1){
				obj.DOMElement = titleLink[idx];
				obj.url = url;
				directLinks[i] = obj;
				i++;
			}
			else if(url.indexOf('imgur') > -1){
				obj.DOMElement = titleLink[idx];
				obj.url = url + '.jpg';
				directLinks[i] = obj;
				i++;
			}
			else if(url.indexOf('quickmeme') > -1){
				obj.DOMElement = titleLink[idx];
				code = url.split('/')[4];
				var newUrl = 'http://i.qkme.me/'+code+'.jpg'
				obj.url = newUrl;
				directLinks[i] = obj;
				i++;
			}
			else if(url.indexOf('qkme') > -1){
				obj.DOMElement = titleLink[idx];
				code = url.split('/')[3];
				if(code.indexOf('?id') > -1){
					code = code.split('?')[0];
				}
				var newUrl = 'http://i.qkme.me/'+code+'.jpg'
				obj.url = newUrl;
				directLinks[i] = obj;
				i++;
			}
			else if(url.indexOf('flickr') > -1){
				obj.DOMElement = titleLink[idx];
				obj.url = url;
				indirectLinks[j] = obj;
				j++;
			}
		}
	}
	
	loadImage(directLinks);
	
	if(indirectLinks.length > 0){
		makeRequest(indirectLinks);
	}
}

/**
*	Calls home to retreive image links from the indirect links of flickr and 500px.
*
*/
var makeRequest = function(indirectLinks){
	
	var postData = "",subreddit = "-";
	var linksArr = []

	var urlArr = window.location.pathname.split('/');
	
	if ((urlArr.length > 2) && (urlArr[1] == 'r')) {
		subreddit = urlArr[2]; 
	}
	
	for(var i = 0; i < indirectLinks.length; i++){
		linksArr[i] = indirectLinks[i].url;
	}
	
	postData = "url=" + encodeURIComponent(JSON.stringify(linksArr));
	postData += "&subreddit="+subreddit;
	
	requestURL = 'http://getimgurl.aws.af.cm/';

	GM_xmlhttpRequest({
		method: "POST",
		url: requestURL,
		data: postData,
		headers: {
		"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			var isEmpty = false;
			var fetchedDirectLinks = JSON.parse(response.responseText);
			var fetchedLinks = [];
			for(var i = 0; i < fetchedDirectLinks.length; i++){
				if(fetchedDirectLinks[i] != ''){
					indirectLinks[i].url = fetchedDirectLinks[i];
				}else{
					indirectLinks[i].url='';
					isEmpty = true;
				}
			}
			update(isEmpty);
			if(indirectLinks.length > 0){
				loadImage(indirectLinks);
			}
		},
		onerror: function(e){
			console.log(e);
		}
	});
}

var update = function(isEmpty){
	if(isEmpty){
		requestURL = 'http://getimgurl.aws.af.cm/update.php';
		GM_xmlhttpRequest({
			method: "GET",
			url: requestURL,
		});
	}
}

/**
*	Recursive function to load and display images one by one from top.
*
*/
var loadImage = function(linkArray){
		
	var img = new Image();
	
	img.addEventListener('load',function(){
		displayImage(this,linkArray[0].DOMElement);
		linkArray.splice(0,1); 
		loadImage(linkArray);
	},false);
	
	img.addEventListener('error',function(){
		linkArray.splice(0,1);
		loadImage(linkArray);
	},false);
	
	if(linkArray.length > 0){
		if(linkArray[0].url != ''){
			img.src = linkArray[0].url;
		}else{
			linkArray.splice(0,1);
			loadImage(linkArray);
		}
	}
}

/**
*	Resizes the really big images to a proportionate size and displays them.
*
*/
var displayImage = function(image,DOMElement){
	var calculated_height,calculated_width;
	var MAX_HEIGHT = 450;
	var MIN_WIDTH = 350;
	var ADJUSTED_WIDTH = 450;
	
	if(image.height > MAX_HEIGHT){
		// Resize the height to MAX_HEIGHT
		calculated_height = MAX_HEIGHT;
		calculated_width = (MAX_HEIGHT*image.width)/image.height;
		
		//If height resize makes the width too small for really long images then resize the width and let the image be long.
		if(calculated_width < MIN_WIDTH){
			calculated_height = (MAX_HEIGHT*ADJUSTED_WIDTH)/calculated_width;
			calculated_width = ADJUSTED_WIDTH;
		}
		
		image.height = calculated_height;
		image.width = calculated_width;
	}
	
	DOMElement.innerHTML += "<br/><img height='" + image.height+"' width='" + image.width + "' src='" + image.src + "'  /><br/>";
}
init();