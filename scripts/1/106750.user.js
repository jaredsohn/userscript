// ==UserScript==
// @name          G+ Friends First
// @namespace     http://www.hardtoremember.org
// @description   Shows Friends Stream by default when Google Plus is first loaded. 
// @include       http://plus.google.com/*
// @include       https://plus.google.com/*
// ==/UserScript==



function fetchDOMSubnode(container, path) {

	var temp = container;
	for (p = 0; p < path.length; p++) {
		if (temp.childNodes == null) return null;
		if (path[p] > temp.childNodes.length) return null;
		temp = temp.childNodes[path[p]];
	}
	return temp;
}


(function() {
	
	var content = document.getElementById("content");
	
	if (content != null && document.URL == "https://plus.google.com/") {
    	
  	var friend_div = fetchDOMNode(content,[0,0,0,1,4,0]);
  	
    if (friend_div != null) {
	  	window.location.href = friend_div.href;
    }	
  }
  
}) ();