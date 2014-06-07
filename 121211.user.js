// ==UserScript==
// @name           Zealot Tony fix v2
// @namespace      namespace
// @include        http://www.bungie.net/Forums/*
// @version        2
// ==/UserScript==

//selects the save thread btn
var savethreadbutton = document.getElementById('ctl00_showSaveThreadButton');
var savethreadinner = document.getElementById('ctl00_trackTopicText');
//checks if thread isn't saved
if (!savethreadinner) {
	//Replaces HTML to avoid asp trigger
	savethreadbutton.innerHTML="<a href=\"#\" id=\"ctl00_trackTopicLinkButton\">Save Thread</a>";
	//sets up click listener
	savethreadbutton.addEventListener ("click", function () {OnButtonDown()}, false);
	}

//click event
function OnButtonDown() {
	//check
	var response = confirm('Are you sure you want to save this thread?')
	if (response) {
	//asp call
	window.location.href = "javascript:__doPostBack('ctl00$trackTopicLinkButton','')"
	//savethreadbutton.innerHTML="<p id=\"ctl00_trackTopicLinkButton\">[Thread Saved]</p>";
	}
}