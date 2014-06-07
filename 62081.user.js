// ==UserScript==

// @name           Delphiforums: Remove from Recently Visited

// @namespace      http://www.nyboria.de

// @description    Remove button for the Recently Visited list

// @include        http://profiles.delphiforums.com/n/pfx/profile.aspx?nav=myforums*

// ==/UserScript==



// Find out whether there is a table of Recently Visited Forums at all first.

var isRecent = document.evaluate("//table[@class='ptcContentTable ptcMyForums ptcRecentForums']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (isRecent.snapshotItem(0)) {


// Depending on various factors the relevant section can be in one of three places. 

	var actionSpan = document.evaluate("//span[@class='ptbAction']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (actionSpan.snapshotItem(2)) {
		var rvfSpan = actionSpan.snapshotItem(2);}

	else if (actionSpan.snapshotItem(1)) {
		var rvfSpan = actionSpan.snapshotItem(1);}

	else if (actionSpan.snapshotItem(0)) {
		var rvfSpan = actionSpan.snapshotItem(0);}

// Now the section should be known, and we can insert the new button.

	if (rvfSpan) {



	var newButton = document.createElement('button');



	newButton.setAttribute('class', 'ptbAdd');

	newButton.setAttribute('type', 'button');



	newButton.setAttribute('onclick', 'return PTButtonCmd(\'cmdMyForumsReset(mfRecentForums)\', true, \'\');');

	newButton.appendChild(document.createTextNode('Remove'));



	rvfSpan.parentNode.insertBefore(newButton, rvfSpan.nextSibling);




// And now we change the text underneath the buttons. First we get the buttons with ptcInfo class.

	var helpSpan = document.evaluate("//span[@class='ptcInfo']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


// This button can also be in one of three places.


if (helpSpan.snapshotItem(5)) {
		var addremSpan = helpSpan.snapshotItem(4);}

	else if (helpSpan.snapshotItem(3)) {
		var addremSpan = helpSpan.snapshotItem(2);}

	else if (helpSpan.snapshotItem(1)) {
		var addremSpan = helpSpan.snapshotItem(0);}

// Now we create the text to replace the one under the relevant button.

	var mySpan = document.createElement('span');

	mySpan.appendChild(document.createTextNode('Add checked to favorites or remove from list'));

	mySpan.setAttribute('class', 'ptcInfo');

	addremSpan.parentNode.replaceChild(mySpan, addremSpan);



	}
}