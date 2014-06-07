// ==UserScript==

// @name           Shartak Underworld Gateway

// @namespace      http://www.philosoph.us/

// @description    Adds buttons to profile pages so that kills and deaths can be easily viewed and logged in the Shartak Underworld.

// @include        http://www.shartak.com/profile.cgi?*

// ==/UserScript==



// Shartak Underworld Gateway

// Version: 1.1 (2008-06-23)

//

// Old versions:

// 1.0 (2006-06-20)





var profileID;

if (profileID=document.location.href.split("=")[1]) {

	var contentElement=document.getElementsByTagName('p')[0];

	var url = "http://www.philosoph.us/misc/shartak/underworld/";

	contentElement.innerHTML = "<div class=\"underworldbuttons\" style=\"float: right\"><a class=\"txbutton\" href=\"" + url + "?id=" + profileID + "\">See kills/deaths</a><br /><a class=\"txbutton\" href=\"" + url + "?log=" + profileID + "\">Log last death</a></div>" + contentElement.innerHTML;

}

