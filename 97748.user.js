// ==UserScript==
// @name           YouTubeHTML52Flash
// @namespace      http://userscripts.org/scripts/show/97748
// @version	0.3.3
// @description    This script will eliminate the need of Javascript for viewing YouTube Embeded videos on external sites. (Handy if you have NoScript extension on) 
// @include        *
// @exclude       *.google.com/*

// ==/UserScript==

(function(){

	if (window.self === window.top) { 
		//we are not in a frame. do nothing 
		
	} else {
		// we are in a frame
		if(document.location.href.match(/^http:\/\/www.youtube.com\/embed\//) || document.location.href.match(/^https:\/\/www.youtube.com\/embed\//) || document.location.href.match(/^http:\/\/www.youtube-nocookie.com\/embed\//) || document.location.href.match(/^https:\/\/www.youtube-nocookie.com\/embed\//)){
			document.location.href = document.location.href.replace('/embed/', '/v/');
		}
		else {
			try {
				var iframes = document.getElementsByTagName('iframe');
				for(var i =0, k = iframes.length; i< k ; i++){
					var iframe = iframes[i] ; 
					if(iframe.src.match(/^(http|https):\/\/www.youtube.com\/embed\//) || iframe.src.match(/^(http|https):\/\/www.youtube-nocookie.com\/embed\//)){
						iframe.src = iframe.src.replace('/embed/', '/v/');
					}		
				}
			}
			catch(e){
				//alert(e);
			}
		}
		
	}

	
})();
