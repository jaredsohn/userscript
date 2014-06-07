// ==UserScript==
// @name           reply2list
// @namespace      http://www.pureandapplied.com.au/greasemonkey/hordereply2list
// @description    makes reply to list more prominent when replying to a mailing list in Horde
// @include        */horde/*
// ==/UserScript==
var OldButton;

OldButton = document.evaluate(
    '//a[@accesskey="R"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null); //find the reply button

if (OldButton.snapshotItem(0) != null){
	var button2 = OldButton.snapshotItem(0).parentNode.children[1]; 
	var button3 = OldButton.snapshotItem(0).parentNode.children[2]; 
	//the reply and reply to list buttons are 
	//the second and third children of the control table data element
	
	var temphref = button2.href;
	var tempAccessKey = button2.accesskey;
	var tempHTML = button2.innerHTML;
	
	button2.innerHTML=button3.innerHTML;
	button2.href = button3.href;
	button2.accesskey = button3.accesskey; //I put this in for completeness, it doesn't work on my system

	button3.innerHTML=tempHTML.replace(/>eply/, ">eply to Sender Only");
	button3.href=temphref;
	button3.accesskey = tempAccessKey;
	//swap them round so that reply to list comes first, and change the text on the reply button, so that it specifies sender only
}