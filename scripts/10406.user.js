// ==UserScript==
// @name		OWA select all
// @namespace	http://royale.zerezo.com/
// @include	*/exchange/inbox/messages.asp*
// @author		Royale
// @description	This script adds a toggle all function on Microsoft Outlook Web Access version 5.5 SP4-2
// ==/UserScript==

// invert checkboxes selection
function toggle()
{
	// get all checkboxes
	allCheckboxs = document.evaluate(
	    "//input[@type='checkbox']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	// for each one, invert selection
	for (var i = 0; i < allCheckboxs.snapshotLength; i++) {
	    thisCheckbox = allCheckboxs.snapshotItem(i);
		thisCheckbox.checked = !thisCheckbox.checked;
	}
}

// get checkbox image button
allImgs = document.evaluate(
    "//img[@src='../images/mark.gif']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
// if we found it, add the toggle function
if (allImgs.snapshotLength) {
    thisImg = allImgs.snapshotItem(0);
	thisImg.addEventListener('click', toggle, true);
}
