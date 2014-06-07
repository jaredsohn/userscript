// ==UserScript==
// @name        9GAG NSFW Viewer (for new design)
// @namespace   http://www.example.org
// @description Shows NSFW Images on the new 9GAG design
// @include     http://9gag.com/*
// @version     1.3
// @grant       GM_log
// @grant       GM_xmlhttpRequest
// ==/UserScript==

setTimeout(function(){showNSFWImages();}, 1000);


function showNSFWImages(){
	var nsfwImages = document.getElementsByClassName("nsfw-post");
	
	for(var i=0;i<nsfwImages.length;i++){
		var nsfwImage = nsfwImages[i];
		var imageURL = nsfwImage.parentNode.parentNode.parentNode.getAttribute('data-entry-thumbnail-url');
		
		var animatedURL = imageURL.replace(/_\d+x\d+([\._])/g,"_460sa$1");
		animatedURL = animatedURL.replace(/\.jpg/g,".gif");
		
		GM_xmlhttpRequest({
		method: "GET",
		url: animatedURL,
		onload: function(response) {
				//alert(response.status+' '+response.statusText+' '+animatedURL);
				if(response.status == "200"){
					imageURL = animatedURL;
				}else{
					if(window.location.href.indexOf('/gag/') > -1){
						imageURL = imageURL.replace(/_\d+x\d+([\._])/g,"_700b$1");
					}else{
						imageURL = imageURL.replace(/_\d+x\d+([\._])/g,"_460s$1");
					}
				}
				GM_log("replaced NSFW Image: "+imageURL);
		
				var newImage = document.createElement("img");
				newImage.src = imageURL;
				var nsfwImageLink = nsfwImage.parentNode;
				nsfwImage.parentNode.removeChild(nsfwImage);
				nsfwImageLink.appendChild(newImage);
		}
		});
		
		
		
	}
	setTimeout(function(){showNSFWImages();}, 3000);
}