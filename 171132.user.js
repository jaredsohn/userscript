// Last Updated: 11-13-2009
// By SiNiquity (-Bane)
// 
// == VERSION HISTORY ==
// Version 1.0:
// - Hides posts. Post height threshold is configurable.
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tribalwar Long Post", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Tribalwar Long Post
// @namespace     SiNiquity
// @description   Hides long posts in spoiler-like tags. Can configure the post height threshold in User Script Commands under the Greasemonkey menu.
// @version       1.0
// @include       http://*tribalwar.com/forums/*
// ==/UserScript==

if(!GM_getValue("twLongPostThreshold")) {
	GM_setValue("twLongPostThreshold", 1000);
}

var allDiv = document.getElementsByTagName("div");
for(var i = allDiv.length - 1; i >= 0; i--) {
	var div = allDiv[i];
	if(nodeIsPost(div)) {
		var threshold = GM_getValue("twLongPostThreshold");
		if(div.offsetHeight > threshold) {
			handleLongAssPost(div);
		}
	}
}

/**
  * Returns true iff the node has an id containing the string "post_message"
  */
function nodeIsPost(node) {
	var id = node.getAttribute("id");
	return (id && id.indexOf("post_message") >= 0);
}

function handleLongAssPost(postDiv) {
	var container = document.createElement("div");

	var preSpoiler = document.createElement("div");
	preSpoiler.setAttribute("class", "pre-spoiler");
	
	var spoilerName = document.createElement("span");
	spoilerName.style.cssFloat = "left";
	spoilerName.style.paddingTop = "2px";
	spoilerName.appendChild(document.createTextNode("Long ass post"));
	
	var showButton = document.createElement("input");
	showButton.setAttribute("class", "button");
	showButton.setAttribute("type", "button");
	showButton.setAttribute("value", "Show");
	showButton.setAttribute("onClick", "if (this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display != '') { this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display = '';this.innerText = ''; this.value = ' Hide '; } else { this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display = 'none'; this.value = 'Show';}");
	
	preSpoiler.appendChild(spoilerName);
	preSpoiler.appendChild(showButton);
	
	var spoilerOuterContainer = document.createElement("div");
	var spoilerInnerContainer = document.createElement("div");
	spoilerInnerContainer.setAttribute("class", "spoiler");
	spoilerInnerContainer.style.display = "none";
	
	spoilerOuterContainer.appendChild(spoilerInnerContainer);
	container.appendChild(preSpoiler);
	container.appendChild(spoilerOuterContainer);
	
	while(postDiv.firstChild) {
		var child = postDiv.firstChild;
		postDiv.removeChild(child);
		spoilerInnerContainer.appendChild(child);
	}
	
	postDiv.appendChild(container);
	
}

GM_registerMenuCommand("TW Long Post: Set threshold", function(event) {
	var threshold = prompt("Set post height threshold in pixels (current value is " + GM_getValue("twLongPostThreshold") + "):");
	threshold = parseInt(threshold, 10);
	if(!isNaN(threshold) && threshold > 0) {
		GM_setValue("twLongPostThreshold", threshold);
	}
});