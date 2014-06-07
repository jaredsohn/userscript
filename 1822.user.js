// ==UserScript==
// @name           UserScripts pre-fill original URL when updating script
// @namespace      http://henrik.nyh.se
// @description    When updating your UserScripts scripts, pre-fill the input box with the original source location.
// @include        http://*userscripts.org/scripts/show/*
// ==/UserScript==

// Finding and filling the script location is by me - 
// the rest is modifications by LouCypher@UserScripts.org.

// Is it one of my scripts?

var myScript = document.getElementById('manage');
if(!myScript) return;

// What is the original source location?

var loc = document.getElementById('script_location');

// Look through all links...

var as = document.getElementsByTagName("a");
for (var i = 0; i < as.length; i++) {

	// ...until we find the "Original Source Location" one

	if ((as[i].innerHTML == 'Original Source Location') && (!as[i].href.match(/\/scripts\/show\/\d+/))) {
	
		// Set the form field value
		loc.value = as[i].href;
		
		// Create another link
		var submitter = document.createElement('a');
		submitter.href = as[i].href;
		submitter.title = 'Update this script from Original Source Location';
		submitter.setAttribute('onclick', 'return false;');
		submitter.innerHTML = 'from original location<br>';
		submitter.addEventListener('click', function(event) {
			document.getElementById('updatescript').getElementsByTagName('form')[0].submit();
		}, false);
		
		// Insert it into the page
		myScript.insertBefore(submitter, myScript.getElementsByTagName('a')[0].nextSibling.nextSibling);
	}

}
