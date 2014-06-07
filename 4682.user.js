// ==UserScript==
// @name          Userscripts.org "add script" shortcut
// @namespace     http://henrik.nyh.se
// @description   Adds a link to the button strip to access the Userscripts.org "add script" form without the default hassle.
// @include       http://*userscripts.org*
// ==/UserScript==


var focusUpload = true;  // true = focus file upload field; false = focus URL input field 
var addPath = "/myaccount";
var addPathAndHash = addPath+"#addscript";
var accLink = xps('//a[@href = "/myaccount" and .="manage your account"]');


function $(id) { return document.getElementById(id); }
function xps(query, root) { return document.evaluate(query, root || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; }
function insertAfter(inserted, aftered) { aftered.parentNode.insertBefore(inserted, aftered.nextSibling); }


if (!accLink)  // Bail if we're not logged in
	return;
	
// Inject the "add script" link

var addLink = document.createElement("a");
addLink.appendChild(document.createTextNode('add script'));
addLink.href = addPathAndHash;

insertAfter(addLink, accLink);
insertAfter(document.createTextNode(', '), accLink);


// Make the "add script" form expand and gain focus when requested

if(addPathAndHash == location.pathname+location.hash)
	showAndFocusField();

// ...even when already on the "myaccount" page

if (addPath == location.pathname)
	addLink.addEventListener('click', showAndFocusField, true);

function showAndFocusField() {
	unsafeWindow.show_addscript();

	setTimeout(function() {
		$(focusUpload ? 'browse' : 'script_location').focus();
	}, 200);
}
