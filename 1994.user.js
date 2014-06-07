/*
Geocaching Bookmark Buttons - v1.0 2005-11-02
(c) 2005, Prime Suspect Software

Greasemonkey user script: see http://greasemonkey.mozdev.org

Compatible with Greasemonkey 0.6.4.

Function:
 Adds 'Check All Active' 'Check All Archived' and 'Check All 
 Disabled' buttons next to the existing 'Check All' button. 
 Like the 'Check All' button, these toggle between Check and
 Uncheck functions when they are clicked.
 
 Also, adds the bookmark title as the link title text.
 
Usage:
 Just click, to check or uncheck the appropriate type of entry.

*/

// ==UserScript==
// @name           GC Bookmark Buttons
// @namespace      http://gmscripts.locusprime.net/
// @description    Adds buttons to select all archived/disabled
// @include        http://www.geocaching.com/bookmarks/view.aspx?*
// @include        http://www.geocaching.com/bookmarks/bulk.aspx?*
// ==/UserScript==

(function() {

	//  Globals.
	var xButtonID;
	var checkVal = new Array(false, false, false);

	//  Get handle to 'Check All' button.
	ButtonList = document.evaluate(
		"//input[@value='Check All']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);		
	if (ButtonList.snapshotLength == 1) {
		var e_CheckAll = ButtonList.snapshotItem(0);
	} else {
		return;
	}

	//  Create spacer 1.
	e_space_span1 = document.createElement("span");
	e_space_span1.id = 'space_span1';
	e_space_span1.innerHTML = '&nbsp;';
	e_CheckAll.parentNode.insertBefore(e_space_span1, e_CheckAll.nextSibling);

	//  Create 'All Active' button.
	e_btn_AllActive = document.createElement("input");
	e_btn_AllActive.id = 'btn_AllActive';
	e_btn_AllActive.type = 'button';
	e_btn_AllActive.name = 'btn_AllActive';
	e_btn_AllActive.value = 'Check All Active';
	e_space_span1.parentNode.insertBefore(e_btn_AllActive, e_space_span1.nextSibling);

	//  Create spacer 2.
	e_space_span2 = document.createElement("span");
	e_space_span2.id = 'space_span2';
	e_space_span2.innerHTML = '&nbsp;';
	e_btn_AllActive.parentNode.insertBefore(e_space_span2, e_btn_AllActive.nextSibling);

	//  Create 'All Disabled' button.
	e_btn_AllDisabled = document.createElement("input");
	e_btn_AllDisabled.id = 'btn_AllDisabled';
	e_btn_AllDisabled.type = 'button';
	e_btn_AllDisabled.name = 'btn_AllDisabled';
	e_btn_AllDisabled.value = 'Check All Disabled';
	e_space_span2.parentNode.insertBefore(e_btn_AllDisabled, e_space_span2.nextSibling);

	//  Create spacer 3.
	e_space_span3 = document.createElement("span");
	e_space_span3.id = 'space_span3';
	e_space_span3.innerHTML = '&nbsp;';
	e_btn_AllDisabled.parentNode.insertBefore(e_space_span3, e_btn_AllDisabled.nextSibling);

	//  Create 'All Archived' button.
	e_btn_AllArchived = document.createElement("input");
	e_btn_AllArchived.id = 'btn_AllArchived';
	e_btn_AllArchived.type = 'button';
	e_btn_AllArchived.name = 'btn_AllArchived';
	e_btn_AllArchived.value = 'Check All Archived';
	e_space_span3.parentNode.insertBefore(e_btn_AllArchived, e_space_span3.nextSibling);
	
	//  Add event listeners to buttons.
	e_btn_AllActive.addEventListener('click', AllActiveClicked, false);
	e_btn_AllArchived.addEventListener('click', AllArchivedClicked, false);
	e_btn_AllDisabled.addEventListener('click', AllDisabledClicked, false);

	//  Get collection of links.
	var AllLinks = document.evaluate(
		"//a[@href]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	maxR = AllLinks.snapshotLength;
	//  Look for cache links.
	for (var i = 0; i < maxR; i++) {
		var xLink = AllLinks.snapshotItem(i);
		//  If a cache link.
		if (xLink.href.search(/\/seek\/cache_details\.aspx\?/,"g") >= 0) {
			if (xLink.firstChild.nodeName != 'IMG') {
				var zText = xLink.firstChild;
				while ((zText.nodeName != '#text') && (zText)) {
					zText = zText.firstChild
				}
				xLink.title = zText.data;
			}
		}
	}


//	------------------------------ Functions ------------------------------


	//  Event listener for All Active button.
	function AllActiveClicked() {
		xButtonID = e_btn_AllActive.id;
		AllOfType(0);
	}

	//  Event listener for All Disabled button.
	function AllDisabledClicked() {
		xButtonID = e_btn_AllDisabled.id;
		AllOfType(1);
	}

	//  Event listener for All Archived button.
	function AllArchivedClicked() {
		xButtonID = e_btn_AllArchived.id;
		AllOfType(2);
	}

	//  Set checkmarks, based on selected type.
	function AllOfType(aot) {
		//  Toggle action value.
		checkVal[aot] = !checkVal[aot];
		//  Get list of all bookmark checkboxes.
		var CheckBoxList = document.evaluate(
			"//input[@name='BID']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		//  Process list.
		var maxR = CheckBoxList.snapshotLength;
		if (maxR > 0) {
			for (var i = 0; i < maxR; i++) {
				var aCheckBox = CheckBoxList.snapshotItem(i);
				var xNode = aCheckBox.parentNode.parentNode.childNodes[7].firstChild.firstChild.firstChild;
				//  Determine cache status.
				if (xNode.nodeName == 'FONT') {var status = 2}
				else if (xNode.nodeName == 'STRIKE') {status = 1}
				else {status = 0}
				//  If cache status matches button clicked, change checkbox value.
				if (aot == status) {aCheckBox.checked = checkVal[aot]}
			}
		}
		//  Toggle button label.
		var btnLabel = document.getElementById(xButtonID).value;
		if (checkVal[aot]) {
			btnLabel = btnLabel.replace(/Check/, 'Uncheck');
		} else {
			btnLabel = btnLabel.replace(/Uncheck/, 'Check');
		}
		document.getElementById(xButtonID).value = btnLabel;
	}

})();
