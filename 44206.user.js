// ==UserScript==
// @name           Minimal Google Reader
// @namespace      http://userscripts.org/users/52899
// @include        http*://www.google.com/reader/view/*
// ==/UserScript==


function alter() {
	var logoContainer = document.getElementById("logo-container");
	var addSubscription = document.getElementById("lhn-add-subscription-section");
	var search = document.getElementById("search");
	var searchInput = document.getElementById("search-input");
	var searchRestrict = document.getElementById("search-restrict");

	var children = searchRestrict.getElementsByTagName("*");
	for(var i=0, length=children.length; i < length; ++i) {
		children[i].style.cssFloat = "none";
	}
	
	search.insertBefore(addSubscription, searchInput);
	logoContainer.parentNode.removeChild(logoContainer);

	var styleBlock = document.createElement("style");
	styleBlock.type = "text/css";

	var newStyle = "";
	newStyle += "#lhn-add-subscription-section {display:inline-block;}";
	newStyle += "#search {left:0;padding-left:0;top:20px;}";
	newStyle += "#search-input {float:none;margin-left:0.5em;padding:2px;}";
	newStyle += "#search-restrict {display:inline-block;float:none;}";
	newStyle += "#search-submit {float:none;}";
	newStyle += "#search-restrict-button {position:relative;padding:0;}";
	newStyle += "#nav {font-size:85%;}";
	newStyle += ".lhn-section {font-size:inherit;}";
	newStyle += ".scroll-tree {font-size:inherit;}";
	newStyle += ".goog-button-base-outer-box, #search-input {font-size:80%;}";
	newStyle += "#main {top:45px;} #gbar, #global-info{font-size:80%;}";
	newStyle += ".gbh{top:20px;}";
	newStyle += "#chrome-header,#viewer-top-controls,#viewer-footer{padding:2px;}";
	newStyle += "#chrome-title{font-size:inherit;}";
	newStyle += "#viewer-top-controls{padding: 2px;}";
	newStyle += "div.item-body{font-size: 145%;font-weight:bold;}";
	newStyle += "#entries-status{top:0;}";
	newStyle += "#entries .entry{font-size:85%;padding:0;}";
	newStyle += "#entries.list .entry .collapsed{padding:2px;}";
	
	styleBlock.appendChild(document.createTextNode(newStyle));
	document.getElementsByTagName("head")[0].appendChild(styleBlock);
}

function startUp() {
 if(!document.getElementById("lhn-add-subscription-section")) {
		window.setTimeout(startUp, "", 100);
	}
	else {
		alter();
	}
}

startUp();