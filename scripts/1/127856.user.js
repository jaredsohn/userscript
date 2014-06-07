// ==UserScript==
// @name           Salesforce User Menu Enhancement - Developer Version
// @namespace      Salesforce
// @include        https://*.salesforce.com/*
// @include        https://c.*.force.com/*
// @exclude        https://dreamevent.my.salesforce.com/*
// @version        1.01
// @date           2012-03-10
// @description    Adds links for commonly used DEVELOPER Setup items to the 'User Menu' (the menu under your name on the Salesforce page).
// ==/UserScript==
// Copyright (c) 2011, Michael Smith (http://www.force2b.net)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================

var newMenuOptions = [
	[ 'Debug Logs',   '/setup/ui/listApexTraces.apexp?setupid=ApexDebugLogs' ], 
	[ 'Apex Jobs',    '/apexpages/setup/listAsyncApexJobs.apexp?setupid=AsyncApexJobs' ], 
	[ 'Scheduled Jobs',    	'/08e?setupid=ScheduledJobs' ], 
	[ 'Apex Classes', 		'/01p?setupid=ApexClasses' ], 
	[ 'VisualForce Pages', 	'/apexpages/setup/listApexPage.apexp?setupid=ApexPages' ], 
	[ 'Triggers', 			'/setup/build/allTriggers.apexp?setupid=ApexTriggers' ], 
	[ 'Static Resources', '/setup/listStaticResource.apexp?setupid=StaticResources' ], 
	[ 'Outbound Change Sets',  '/changemgmt/listOutboundChangeSet.apexp?setupid=OutboundChangeSet' ], 
	[ 'Custom Objects', 	   '/p/setup/custent/CustomObjectsPage?setupid=CustomObjects' ], 
	[ 'Custom Settings', 	   '/setup/ui/listCustomSettings.apexp?setupid=CustomSettings' ] 
	
];

// look for the drop down menu item
var menuArea = null;
try {
	menuArea = document.getElementById('userNav-menuItems');
} catch (e) { }

if (menuArea != null) {

	var menuLinks = menuArea.getElementsByTagName("a");
	var lastLink = menuLinks[menuLinks.length-1];
	GM_log('menuLinks.length=' + menuLinks.length );
	
	// Create a separator in the menu list
	var newLink = document.createElement('hr');
	menuArea.insertBefore(newLink, lastLink);
	
	for(var i=0, il=newMenuOptions.length; i<il; i+=1){
		var itemName = newMenuOptions[i][0];
		var itemURL = newMenuOptions[i][1];
		
		GM_log('itemName =' + itemName );

		// Append the link to the links block
		var newLink = document.createElement('a');
		newLink.setAttribute('href', itemURL);
		newLink.setAttribute('class',"menuButtonMenuLink");
		newLink.setAttribute('style',"font-style:italic; color: green");
		newLink.innerHTML = itemName;
		menuArea.insertBefore(newLink, lastLink);
	}

}
