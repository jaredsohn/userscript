// ==UserScript==
// @name           PassthePopcorn.org - Move navbar down to own line
// @namespace      http://notsecret.net
// @description    moves the Inbox, Uploads, etc. navbar to its own line in conrtacular theme
// @author         p4lindromica
// @include        http://*passthepopcorn.me/*
// ==/UserScript==

//create function, it expects 2 values.
function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
	
	//if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
		//add the newElement after the target element.
		parent.appendChild(newElement);
		} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
		}
}

var stats = document.getElementById('userinfo_stats');
var navbar = document.getElementById('userinfo_minor');

var span = document.createElement('span');

insertAfter(span, stats);
span.innerHTML = '<br>';