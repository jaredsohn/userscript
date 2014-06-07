// ==UserScript==
// @name           Reddit open all in tabs
// @namespace      reddit
// @include        http://www.reddit.com/*
// ==/UserScript==

window.addButton = function () {
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id','buttonDiv');
		
	var inputButton = document.createElement('input');
	inputButton.type = 'button';
	inputButton.value = 'Open All Links';
	inputButton.setAttribute("onclick", "openAllInTabs();");
	
	// Append the button to the div
	document.getElementsByTagName("body")[0].appendChild(newDiv);
	document.getElementById("buttonDiv").appendChild(inputButton); 
}
addButton();

var myButtonDiv = document.getElementById("buttonDiv");
myButtonDiv.style.position = "fixed";
myButtonDiv.style.left = "0px";
myButtonDiv.style.bottom = "0px";
myButtonDiv.style.backgroundColor = "black";

var lastCheck = unsafeWindow.localStorage.getItem("lastCheck") || new Date();
var now = new Date();

if(now - lastCheck > 3600 * 1000 * 8) {
   unsafeWindow.localStorage.setItem("lastCheck", now);
   unsafeWindow.localStorage.setItem("redditHistory", []);
}

unsafeWindow.openAllInTabs = function () {
	var hist = (unsafeWindow.localStorage.getItem("redditHistory") || "").split(',');
	var query = document.querySelectorAll('#siteTable a.title');
	for(var i = 0; i < query.length; i++) {
		var href = query[i].href;
		if(hist.indexOf(href) == -1) {
			F = window.open(href, '_blank');
			hist.push(href);
		}
	}
	unsafeWindow.localStorage.setItem("redditHistory", hist);
};