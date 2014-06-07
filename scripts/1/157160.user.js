// ==UserScript==
// @name           Reddit open all in iframes
// @namespace      reddit
// @include        http://www.reddit.com/*
// ==/UserScript==

window.addButton = function () {
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id','buttonDiv');
		
	var inputButton = document.createElement('input');
	inputButton.type = 'button';
	inputButton.value = 'Open All Links';
	inputButton.setAttribute("onclick", "openAllReddit();");
	
	var clearButton = document.createElement('input');
	clearButton.type = 'button';
	clearButton.value = 'Clear Reddit History';
	clearButton.setAttribute("onclick", "clearRedditHistory();");
	
	// Append the button to the div
	document.getElementsByTagName("body")[0].appendChild(newDiv);
	document.getElementById("buttonDiv").appendChild(inputButton); 
	document.getElementById("buttonDiv").appendChild(clearButton); 
}
addButton();

var myButtonDiv = document.getElementById("buttonDiv");
myButtonDiv.style.position = "fixed";
myButtonDiv.style.left = "0px";
myButtonDiv.style.bottom = "0px";
myButtonDiv.style.backgroundColor = "black";

unsafeWindow.openAllReddit = function () {
	var hist = (unsafeWindow.localStorage.getItem("redditHistory") || "").split(',');
	var query = document.querySelectorAll('#siteTable a.title');
	var parent = document.querySelectorAll('#siteTable div.link');
	var focused = false;
	for(var i = 0; i < query.length; i++) {
		var href = query[i].href;
		if(hist.indexOf(href) == -1) {
			//F = window.open(href, '_blank');
			var frame = document.createElement('iframe');
			frame.style.width = "700px";
			frame.style.height = "600px";
			parent[i].appendChild(frame);
			frame.src = href;
			if(!focused) {
				focused = true;
				frame.focus();
			}
			hist.push(href);
		}
	}
	unsafeWindow.localStorage.setItem("redditHistory", hist);
};

unsafeWindow.clearRedditHistory = function () {
	unsafeWindow.localStorage.setItem("redditHistory", []);
};