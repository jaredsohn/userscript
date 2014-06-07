// ==UserScript==
// @name          Cookie Revealer
// @author          Jake Kasprzak
// @namespace	http://jake.kasprzak.ca
// @description	  Adds elements to web pages through which cookie data set by pages can be viewed.
// @include       * 
// @version       0.1.0
// ==/UserScript==

(function() {

	//initialize the element to be added and the text to be displayed in the element
	var trigger = document.createElement("div");
	var cookieText = document.createTextNode(document.cookie);
	var triggerText = document.createTextNode("Cookie");

	
	//toggles whether or not cookie data is to be displayed
	function handleDblClick()  {
		
		//if cookie data is not displayed, then update the cookie data and display it
		if (trigger.style.MozOpacity =="0.4") {
		
			trigger.style.MozOpacity = "1";
			cookieText = document.createTextNode(document.cookie);
			
			if (document.cookie != '') {
					trigger.replaceChild(cookieText, triggerText);
			}
	
		}
		
		//if cookie data is being displayed, then replace the cookie data
		else {
			trigger.style.MozOpacity = "0.4";
			trigger.replaceChild(triggerText, cookieText);
		}
		
	} //handleDblClick

	
	
	//called when pages are first loaded
	function setup() {
		
		//exit if no cookie data is set by the page
		if (document.cookie == '') { return; }

		
		//set the text and style of the element to be added, add it, and set up event handler for double-clicking of the element
		
		trigger.appendChild(triggerText);

		with(trigger.style) {
			position = "fixed";
			left = bottom = "0px";
			color = "black";
			background = "white";
			border = "1px solid";
			padding = "3px";   
			font = "10px sans-serif";
			cursor = "pointer";
			overflow = "auto";
			MozOpacity = "0.4";
		}

		document.body.appendChild(trigger);

		trigger.addEventListener("dblclick", handleDblClick, false);
		
	} //setup
	
	window.addEventListener("load", setup, false);
})();