// ==UserScript==
// @name		   top2blank
// @description    Set External links' target value to _blank
// @namespace      http://abhiomkar.in
// @include        http://*
// @include        https://*
// ==/UserScript==

aTags = document.getElementsByTagName("a");

for(i=0; i< aTags.length; i++) {
	protocol = window.location.protocol+"//";
	host = window.location.hostname;
	url = aTags[i].href;
	if(url.indexOf("http://") == 0 || url.indexOf("https://") == 0){
		// This may be internal link or external link
		if (url.indexOf("http://") == 0){
			url = url.replace("http://","");
		}
		else if(url.indexOf("https://") == 0){
			url = url.replace("https://","");
		}
		
		if( url.indexOf("/") >= 0 ){
			// Example: http://google.com/images
			url = url.substring(0, url.indexOf("/"));
			if( url == host ){
				// Internal link
				// Do Nothing
			}
			else{
				// Yah!! External link
				// change the target attribute to _blank
				//	console.log("Changing " + aTags[i].href + " to _blank");
				aTags[i].target = "_blank";
			}
		}
	}
}