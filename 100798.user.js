// ==UserScript==
// @name           Salesforce User Menu Enhancement - Administrators
// @version        1.03
// @date           2012-03-10
// @namespace      SalesForce
// @description    Adds links for commonly used Setup items to the 'User Menu' (the menu under your name on the Salesforce page).
// @include        https://*.salesforce.com/*
// @include        https://c.*.force.com/*
// @exclude        https://dreamevent.my.salesforce.com/*
// ==/UserScript==
// Copyright (c) 2011, Michael Smith (http://www.force2b.net)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================

var newMenuOptions = [
	[ 'User Management', '/005?setupid=ManageUsers' ], 
	[ 'Profiles', '/00e?setupid=EnhancedProfiles' ], 
	[ 'Permission Sets', '/0PS?setupid=PermSets' ], 
	[ 'Workflow Rules', '/01Q?&setupid=WorkflowRules' ], 
	[ 'Email Templates', '/00X?setupid=CommunicationTemplatesEmail' ], 
	[ 'Mobile Configuration', '	/_ui/core/mobileadmin/MobileSplashUi?Type=M&EntityId=MobileConfig&setupid=ApexMobileConfigurations' ], 
	[ 'Outlook Configuration', '/063?Type=E&setupid=EmailConfigurations' ] 
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
		newLink.setAttribute('style',"font-style:italic; color: blue");
		newLink.innerHTML = itemName;
		menuArea.insertBefore(newLink, lastLink);
	}

	// Create a separator in the menu list
	var newLink = document.createElement('hr');
	menuArea.insertBefore(newLink, lastLink);
	
}
