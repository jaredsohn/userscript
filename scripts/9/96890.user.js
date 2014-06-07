// ==UserScript==
// @name           New test
// @namespace      http://userscripts.org/users/75950
// @description    Works in Lite Mode
// @include        http://www.delugerpg.com/catch.php
// ==/UserScript==
// list of buttons
var theButtons = document.getElementsByTagName('button');
var found = false;
if(theButtons.length==0) {
	// no buttons found, get the submit button and click it
	var theSubmit = single("//input[@type='submit']");
	if(theSubmit) {
		theSubmit.attack();
	} else {
		location.href = 'http://www.delugerpg.com/catch.php';
	}
} else {
        if(document.body.textContent.indexOf('food')!=-1) {
		theButtons[0].attack();
        } else {
	    for(i=0; i<theButtons.length; i++) {
        	// get item attribute and look for it elsewhere on the page
	        var theAttribute = theButtons[i].textContent.match(/\((.*)\)/)[1];
        	if(document.body.textContent.toUpperCase().indexOf(theAttribute) != document.body.textContent.toUpperCase().lastIndexOf(theAttribute) && !found) {
	            found = true;
        	    theButtons[i].attack();
	        }
	    }
        }
}

// xpath function to get single node with specific attributes
function single() {
	if(arguments.length==2 && !arguments[1]) return;
	return document.evaluate("." + arguments[0], arguments[1] || document.body, null, 9, null).singleNodeValue;
}