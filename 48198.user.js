// ==UserScript==
// @name           Facebook News Feed App Auto-Blocker
// @namespace      www.facebook.com
// @description    Automatically blocks all apps that appear in the news feed.
// @include        http://www.facebook.com/home.php
// ==/UserScript==

//var count=0;
var regex = new RegExp('http://www.facebook.com/apps/application.php[?]id=([0-9]+)');
var http_request = false;

function makePOSTRequest(url, parameters) {
	http_request = false;
	if (window.XMLHttpRequest) { 
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/html');
		}
	}
	if (!http_request) {
		alert('Cannot create XMLHTTP instance');
		return false;
	}
	http_request.onreadystatechange = alertContents;
	http_request.open('POST', url, true);
	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http_request.setRequestHeader("Content-length", parameters.length);
	http_request.setRequestHeader("Connection", "close");
	http_request.send(parameters);
}

function alertContents() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			//alert(http_request.responseText);
			//count = count + 1;
			//window.status = '(' + count + ' Facebook apps blocked)';
		} else {
			//alert("There was a problem with the request.\n - Facebook News Feed App Auto-Blocker\n (Greasemonkey Script)");
		}
	}
}
   
function postIt(appId) {
	var poststr = "app_id=" + appId + "&action=block&save=1&Submit=Block";
	makePOSTRequest("http://www.facebook.com/apps/block.php?id=" + appId + "&action=block&source=about", poststr);
}
	
function findAppsAndBlock() {
	var a = document.links;
		for (i=0; i<a.length; i++) 
		{
			if ( regex.test(a[i].href) ) 
			{ 
				postIt(regex.exec(a[i].href)[1]);
			}
		}
}

//findAppsAndBlock(); // run it after DOM is fully loaded, but before onload occurs.
window.addEventListener("load", findAppsAndBlock, false);
window.addEventListener('load', function() {
	document.getElementById('home_stream').addEventListener('DOMSubtreeModified', findAppsAndBlock, false);
}, false); // (this line adapted from http://userscripts.org/scripts/review/44834)