// ==UserScript==
// @name           NYTimes Book Review Link to Amazon
// @namespace      shervey.userscripts.org
// @include        http://www.nytimes.com/*/books/*
// ==/UserScript==

function unicodeToAscii(str) {
	var asciiStr = "";
	var chr = "";
	
	for(var i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		if(chr >= 32 && chr <= 126) {
			asciiStr += str.charAt(i);
		}
	}

	return asciiStr;
}

function linkBook() {
	var ps = document.getElementsByTagName("p");
	var titleElements = new Array();
	var titleClassName = "nitf";
	var searchURL = "http://www.amazon.com/s/ref=nb_ss_gw?url=search-alias%3Daps&field-keywords="
	
	for(var i = 0; i < ps.length; i++) {
		if(ps[i].className == titleClassName) {
			titleElements.push(ps[i]);
		}
	}

	if(titleElements.length > 0) {
		var searchArray = new Array();
		var searchStr = "";
		
		for(var i = 0; i < titleElements.length; i++) {
			searchArray.push(titleElements[i].innerHTML);
		}
		
		searchURL += unicodeToAscii(searchArray.join(" ").replace(/\s/g,"+"));
		
		var searchLink = document.createElement("a");
		searchLink.href = searchURL;
		searchLink.target = "_blank";
		searchLink.innerHTML = "Search Amazon...";
		searchLink.style.fontWeight = "bold";
		
		titleElements[0].parentNode.parentNode.appendChild(searchLink);
	}	
}

window.addEventListener("load",function(){linkBook()},false);