// afPLonk user script
// version 0.5 BETA!
// 2009-06-11
// Copyright (c) 2009, Dave Milbut
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "afPlonkJive", and click Uninstall.
//
// --------------------------------------------------------------------
// History:
// Version 0.2 fixes an array index issue.
// Version 0.3 adds the ability to do differnt plonks to differnet users
// Version 0.5 does it for the Jive based forums. File also renamed from 
//			afPlonk to afPlonkJive
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          afPlonkJive
// @namespace     http://milbut.org
// @description   script to plonk specific users on every adobe forums page (jive based forums)
// @include       http://forums.adobe.com/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

	
	//names in the list should be surrounded in quotes
	// and comma delimited (seperated).
	// add names to the list by adding a comma then 	
	// the name in quotes to the end of the list... 
	// like the below ',"Sample Name"'
	// Remove names by removing the name from the array.
	//
	
	// array of names to plonk
	var arPlonks=new Array("aname to plonk", "another name", "still another name etc.");   

	//get all divs... find the "jive-author" classed 
	var allDivs= document.getElementsByTagName("div"); 
	var name;

	//for each name in the plonk array
	for (var j=0; j < arPlonks.length; j++) 
	{ 
		name=arPlonks[j]; //get a name

		for (var i=0; i < allDivs.length; i++) //loop through the div tags. 
		{
			if (allDivs[i].className == "jive-username-link-wrapper") //find the username wrapper div
			{
				var el=allDivs[i]; // temp user name div element storage
				var aels=el.getElementsByTagName("a"); //get all the a tags in the wrapper
	
				if (aels[0].innerHTML == name) //if the innerHTML matches the name (this is where the user's name is displayed in clear text)...
				{
					//alert(foundUser.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML);	 //dm: debug only

					// use style.display attribute to hide the entire message div. yipee!
					aels[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display="none";
				}
			}
		}
	}
	return; 
	