// EZShowList
// version 0.2
// 2008-11-05
// Copyright (c) 2013, Omair Mohammed Abdullah
// Released under the GPL v3 license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "EZShowList", and click Uninstall.
//
// Click the 'Show All' and select the shows you are interested in,
// and then reload the page. Selected shows are automatically saved.
//
// Thanks to Chris Porter and his _@/ mininova script which inspired this.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            EZShowList
// @namespace       tag:oma,2013-06-29:EZShowList
// @description     See only the shows you are interested in
// @include         http://eztv.it/showlist/
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_log
// ==/UserScript==
//
// TODO:
//  - Remove reload requirement
//  - Fix checkbox spacing issue when displaying only selected shows
//  - Don't hide all on first run
//  - Print message on first run


var EZTV = {
    EZTVRowName : 'forum_thread_post',
    EZTVSettingsSectionName : 'section_post_header',
    EZTVMainTableName : 'forum_header_border',
    EZTVTableColHeader : 'forum_thread_header',
    EZTVColsInTable : 3,
    EZSLSettingsId : 'show_EZSLsettings',
	
	getByXPath: function(sPath) {
		return document.evaluate(sPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	},
	
	getChkID: function(tblRow) {
		var hrefVal = tblRow.firstChild.href;
		// Extract the show ID from the href (it is of type href="http://eztv.it/shows/<id>/blahblah")
		return hrefVal.substr(21, hrefVal.indexOf("/",21) - 21);
	},
	
	onCreate: function() {
	    GM_log("Running EZShowList");
		this.createSettingsBoxes();
	},
	
	//===================================================================================================================
	addEZSLBox: function() {
        // The settings row has this path //table[@class='forum_header_border']/tbody/tr/td[@class='section_post_header']
	    var filterCol = this.getByXPath("//table[@class='" + this.EZTVMainTableName + "']/tbody/tr/td[@class='" + this.EZTVSettingsSectionName + "']").snapshotItem(0);
		
		filterCol.colSpan -= 1;
		filterCol.parentNode.innerHTML += "<td id='EZSLBoxCol' class='" + this.EZTVSettingsSectionName + "' colspan='2'><label><input id='" + this.EZSLSettingsId + "' type='checkbox' />Show All</label></td>";
		
		document.getElementById(this.EZSLSettingsId).addEventListener("click", function(event) {
										if (!event.target.checked)
											location.reload();		//checkbox was unchecked
										else {
											var chkCols = EZTV.getByXPath("//tr[@style]/td/input[starts-with(@id,'chk')]")
											
											//show all the hidden rows by unsetting the 'display: none' style
											for (var i=0; i < chkCols.snapshotLength; i++)
												chkCols.snapshotItem(i).parentNode.parentNode.setAttribute("style", "");
										}
										
										}, true);
										
	},
	//===================================================================================================================
	addTableHead: function() {
		var tableHead = this.getByXPath("//table[@class='" + this.EZTVMainTableName + "']/tbody/tr/td[@class='" + this.EZTVTableColHeader + "']").snapshotItem(0);
		var newColHead = document.createElement("td");
		//newColHead.setAttribute("id", "ChkColHeader");
		newColHead.setAttribute("class", this.EZTVTableColHeader);
		newColHead.innerHTML = "Pick";
		tableHead.parentNode.insertBefore(newColHead, tableHead);
	},
	//===================================================================================================================
	createSettingsBoxes: function() {
		
		// Add the 'Show All' checkbox beside the 'filter' dropdown list
		this.addEZSLBox();
		
		// Add table header for checkbox column
		this.addTableHead();
		
		// Add the extra column to each row
		var tableCols = this.getByXPath("//table[@class='" + this.EZTVMainTableName + "']/tbody/tr/td[@class='" + this.EZTVRowName + "']")
		
		// Add a new column containing a checkbox for each row
		for (var i=0; i < tableCols.snapshotLength; i += this.EZTVColsInTable) {
			var startCol = tableCols.snapshotItem(i);	
			var newCheckCol = document.createElement("td");
			var newID = this.getChkID(startCol);
			
			newCheckCol.setAttribute("class", this.EZTVRowName);
			newCheckCol.setAttribute("style", "padding-right: 1px");
			newCheckCol.innerHTML = "<input type='checkbox' id=chk" + newID + " />";
			
			var isChecked = GM_getValue("chk"+newID, false);
			newCheckCol.firstChild.checked = isChecked;
			
			newCheckCol.firstChild.addEventListener("click", function(event) { 
														GM_setValue(event.target.getAttribute("id"), event.target.checked); 
														}, true);
			
			startCol.parentNode.insertBefore(newCheckCol, startCol);
			
			// If checkbox is not checked, don't display that row
			if (!GM_getValue("chk"+newID, false))
				newCheckCol.parentNode.setAttribute("style", "display: none;");
		}
		
	}
};

EZTV.onCreate();
