// ==UserScript==
// @name           CSUSM Auto Login
// @namespace      http://www.xlotus.net
// @description    Automatically logs you in to CSUSM
// @include        https://smu-aruba*.csusm.edu/cgi-bin/login?cmd=login&*
// @include		   http://tom.xlotus.net/tmp/login.html
// ==/UserScript==

// ============================================================================================
// Configuration --  put your username and password inside the quotes
// Log in with your student credentials...
var username = "lastn123";
var password = "password";

// ... OR log in with email and leave the above as ""
var email = "example@example.com";

// ============================================================================================

// Do not edit below this line ----------------------------------------------------------------
var message = "GreaseMonkey is automatically logging you in.";
var waitSecs = 1;

var newdiv = document.createTextNode(message);
var logins = document.getElementById("logins");
logins.insertBefore(newdiv, logins.firstChild);

if (username != "") {

	document.getElementById("user").value = username;
	document.getElementById("password").value = password;
	getElementsByClass("button")[0].click();
	
} else {

	document.getElementById("email").value = email;
	getElementsByClass("button")[1].click();

}

function getElementsByClass(searchClass,node,tag) {

	var classElements = new Array();

	if ( node == null )	node = document;

	if ( tag == null ) tag = '*';

	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");

	for (i = 0, j = 0; i < elsLen; i++) {

		if ( pattern.test(els[i].className) ) {

			classElements[j] = els[i];
			j++;

		}

	}

	return classElements;

}