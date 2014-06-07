// Word counts for text areas user script
// version 0.5 BETA!
// 2007-10-10
// Copyright (c) 2007, Bjoern Guenzel
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Word Count
// @namespace     http://net.blinker.greasemonkey/wordCount
// @description   display word count next to textareas. Originally written for the in YCombinator application form, but it turns out it works well on most other websites, too. 
// @include       *
// ==/UserScript==

var debug = false;

function updateWordCount() {
	var areaName = this.getAttribute("name");
	if(debug) {
		GM_log("count "+areaName);
	}
	var area = document.getElementsByName(areaName)[0];
	var counterContainer = document.getElementById(areaName+"Counter");
	if(debug){
		GM_log("countContainer: "+counterContainer);
	}
	var countText = counterContainer.firstChild;
	var count = 0;
	if(area.value){
		var text = area.value;
		if(debug) {
			GM_log("text: "+text);
		}
		var words = text.match(/(\w+)/g);
		
		if(words){
			count = words.length;
		} else {
			count = 0;
		}
	}
	if(debug) {
		GM_log("count: "+count);
	}
	countText.data = count;
	var color = "green";
	if(count > 120){
		color = "red";
	}
	counterContainer.setAttribute("style","color: "+color+";");
}

//setup - add word count field to all text areas and link textarea to update event

var areas = document.getElementsByTagName('textarea');

var i = 0;

for(i = 0;i<areas.length;i++){
	area = areas[i];
	var areaName = area.getAttribute("name")

	var parent = area.parentNode;

	var descriptionContainer = document.createElement("div");
	descriptionContainer.appendChild(document.createTextNode("Word Count: "));

	var countContainer = document.createElement("span");
	countContainer.id = areaName+"Counter";
	var countText = document.createTextNode("");
	countContainer.appendChild(countText);

	descriptionContainer.appendChild(countContainer);
	parent.appendChild(descriptionContainer);

	area.updateWordCount = updateWordCount;
	area.updateWordCount();

	//not all relevant events are being captured (ie try to select all text and delete), but I think it is good enough...
	area.addEventListener("keypress", area.updateWordCount, true);
}
