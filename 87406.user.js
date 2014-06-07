// ==UserScript==
// @name           Salesforce.com Setup and Apps Hover Links
// @namespace      Tehnrd
// @description    Add hover support to user options and app links in header
// @include        https://*.salesforce.com/*
// @include 	   https://*.visual.force.com/*
// ==/UserScript==

	//Setup Links
	var userNavButtonWidth = document.getElementById("userNavButton").offsetWidth;
	var userNav = document.getElementById("userNav");
	var userNavMenu = document.getElementById("userNavMenu");
	var userNavMenuOriginalClasses = userNavMenu.className;
	
	var userNavOriginalClasses = userNav.className;

	function show() {
		userNav.className = userNavOriginalClasses + ' menuButtonActivated';
		userNavMenu.style.display = 'block';
		
		if(userNavButtonWidth > 104){
			userNavMenu.style.width = userNavButtonWidth+'px';
		}else{
			userNavMenu.className = userNavMenuOriginalClasses + ' menuWidthExtended';
		}
	}

	function hide(){
		userNavMenu.style.display = 'none';
		userNav.className = userNavOriginalClasses;
	}

	userNav.addEventListener('mouseover', show, false);
	userNav.addEventListener('mouseout', hide, false);
	
	//App Links
	var tsid = document.getElementById("tsid");
	var tsidOriginalClasses = tsid.className;
	var tsidMenu = document.getElementById("tsidMenu");
	var tsidMenuOriginalClasses = tsidMenu.className;

	function showApps() {
		tsid.className = tsidOriginalClasses + ' menuButtonActivated';
		tsidMenu.className = tsidMenuOriginalClasses + ' menuWidthExtended';
		
		tsidMenu.style.display = 'block';
		tsidMenu.style.width = '179px';
	}

	function hideApps(){
		tsid.className = tsidOriginalClasses;
		tsidMenu.className = tsidMenuOriginalClasses;
		tsidMenu.style.display = 'none';
	}

	tsid.addEventListener('mouseover', showApps, false);
	tsid.addEventListener('mouseout', hideApps, false);