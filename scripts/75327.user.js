// ==UserScript==
// @name          Reddit Single Tab
// @namespace     akjdfkjs
// @description   For zouhair :)
// @include       http://www.reddit.com/*
// @include       http://reddit.com/*
// ==/UserScript==



// var allLinks, thisLink;
// allLinks = document.evaluate(
    // '//a[@href]',
    // document,
    // null,
    // XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    // null);
// for (var i = 0; i < allLinks.snapshotLength; i++) {
    // thisLink = allLinks.snapshotItem(i);
	// var open = document.createElement("div");
	// open.innerHTML = '<div onclick="myfunc">';
	// var close = document.createElement("close");
	// close.innerHTML = '</div>';
	// thisLink.parentNode.insertBefore(open, thisLink);
	// thisLink.parentNode.insertBefore(close, thisLink.nextSibling);
	// }

	// ^^^ That worked, but I forgot that I would need the div to have the 
	// same text as the link to be selected by 'f'. Easier Solution:vvv
	
function myfunc(){
	return "Starcraft 2 is the illin";
}

var bodies, body;
setTimeout(continueExecution, 3000);

function continueExecution()
{
	alert("Single Tab is Go!");
	bodies = document.getElementsByTagName('body');
	for (var i = 0; i < bodies.length; i++) {
		body = bodies[i];
		body.setAttribute('onclick', "myfunc()");
	}
}