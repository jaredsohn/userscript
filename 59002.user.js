// ==UserScript==
// @name		  Katz.cd Interface Simplified
// @namespace	  http://userscripts.org/users/110447
// @description   Simple script that removes many unwanted elements to give a cleaner look.
// @version       0.8
// @require   http://usocheckup.dune.net/59002.js?maxage=10
// @include       http://*katz.cd*
// @include		  http://*katzporn.com*
// @exclude	   
// ==/UserScript==

// -=- Release Notes -=-
// Version 0.8
// -script rewrite. Much faster now.
// Version 0.7
// -Removed objects including ads and sideframes
// Version 0.6
// -Removed "Works Best On Firefox" box
// -Added include for katzporn.com
// -Removed "Join us on..." box
// Version 0.5
// -Removed livesex menu tab
// -Removed Respected Sites box
// -Removed DDL box ad

// Start katz.cd simplified
// Remove objects including ads and sideframes onclick of links
var objects = document.getElementsByTagName("object");
while (objects.length)
objects[0].parentNode.removeChild(objects[0]);

function removeElement(el, attribs, attribValue) {
	// Get element tag
	var div = document.getElementsByTagName(el);
	var myAttribs = "";
		for (var i = div.length - 1; i >= 0; i--) {
			// Get attribute
			myAttribs = div[i].getAttribute(attribs);
			// Get attribute value
			if(myAttribs == attribValue){
				div[i].parentNode.removeChild(div[i]);
			}
		}
	};
	
removeElement('a', 'href', '/cams/');
removeElement('div', 'class', 'head');
removeElement('div', 'class', 'box');
removeElement('div', 'class', 'box center ff');
removeElement('div', 'style', 'margin-top:30px;color:#666;text-align:center;');
removeElement('a', 'id', 'im');
// katzsimplified.user.js