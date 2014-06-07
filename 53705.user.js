// ==UserScript==
// @name           Adobe Forums: Search this forum only
// @namespace      http://adobeforums.adobe.com/community/*
// @description    Forum searches default to the current sub-forum rather than globally searching all of Adobe Forums.
// @include        http://forums.adobe.com/community/*
// @include        http://forums.adobe.com/thread/*
// ==/UserScript==

// Author: Eric Taylor
// Last Modified: 2009-07-14
// v1.00 - Initial release

// Instantiate variables
var allLinks, communityID, myString, mySplit, search_obj, form_obj;
communityID = "ERROR";

// Determine the community id, if it exists
allLinks = document.getElementsByTagName('link');
for(var i = 0; i < allLinks.length; ++i) {
	if( myString = allLinks[i].href.match(/community=[0-9]+/) ) {
		communityID = myString.toString();
		mySplit = communityID.split("=");
		communityID = mySplit[1];
		//alert(communityID);
		break;
	}
}

// Find the search form and stuff the communityID into it
if(communityID !== "ERROR") {
	if (document.getElementById) {
		if(document.getElementById('jive-userbar-search')) {
			search_obj = document.getElementById('jive-userbar-search');
			form_obj = search_obj.getElementsByTagName('form')[0];
			form_obj.innerHTML = '<input type="hidden" value="'+communityID+'" name="CommunityID"/>' + form_obj.innerHTML;
		}
	}
}