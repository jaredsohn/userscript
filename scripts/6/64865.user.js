// ==UserScript==
// @name           YouTube Blind Link Exposer
// @namespace      http://www.truthandbeautybombs.com/bb2
// @description    Exposes the titles of blind-linked YouTube videos
// @include        *
// ==/UserScript==

var links = new Array();
var i = 0;
var j = 0;

function handleHttpResponse(r) {
	// set link title
	links[j].innerHTML = r.responseText.split("<title>")[1].split("</title>")[0].replace(/\s\s+/g, " ");

	// now, find the next relevant link, if there is one
 	for (i = j+1; i < links.length; i++) {
		if ( links[i].getAttribute('href') && (links[i].getAttribute('href').search(/youtube\.com\/watch\?v\=[a-zA-Z0-9]*/) > 0) && (links[i].innerHTML.search(/youtube\.com\/watch\?v\=[a-zA-Z0-9]*/) > 0) ) {
  			j = i;
 			GM_xmlhttpRequest({
 				method: "GET",
 				url: links[i].getAttribute('href'),
				onload: handleHttpResponse
 			});
 			break;
 		}
 	}
}

(function(){
 	links = document.getElementsByTagName('a');
 
 	// find the first link
 	for(i = 0; i < links.length; i++) {
 		if ( links[i].getAttribute('href') && (links[i].getAttribute('href').search(/youtube\.com\/watch\?v\=[a-zA-Z0-9]*/) > 0) && (links[i].innerHTML.search(/youtube\.com\/watch\?v\=[a-zA-Z0-9]*/) > 0) ) {
  			// send the first request and then break out of the loop
 			j = i;
 			GM_xmlhttpRequest({
 				method: "GET",
 				url: links[i].getAttribute('href'),
 				onload: handleHttpResponse
			});
 			break;
 		}
 	}
})();