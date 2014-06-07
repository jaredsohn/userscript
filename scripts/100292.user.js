// ==UserScript==
// @name           Salesforce Fields List Enhancement
// @version        0.9.20
// @date           2011-04-02
// @namespace      SalesForce
// @description    Add a FieldID column to the page and add a link to 'Set Field Level Securuity' next to the 'Edit' link
// @include        https://*.salesforce.com/p/setup/layout/LayoutFieldList*
// @include        https://*.salesforce.com/*?setupid=CustomObjects*
// ==/UserScript==
//
// Copyright (c) 2011, Michael Smith (http://www.force2b.net)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================
var baseURL = window.location.href;
var isCustomObject = (baseURL.indexOf('setupid=CustomObjects') >0);
var retURL = null;
var objectID = null;
var setupID =  null;
var customFieldsID = null;
var securityImage = '<img src="/img/icon/custom51_100/keys16.png">';

if (baseURL.indexOf('LayoutFieldList') >0 || baseURL.indexOf('setupid=CustomObjects') > 0) {
	
	if (isCustomObject) objectID = baseURL.substr(baseURL.indexOf("?setupid")-15,15);
	else objectID = (baseURL.split("&")[0]).substr(baseURL.split("&")[0].indexOf("=")+1);

	if (isCustomObject) setupID = 'CustomObjects';
	else setupID = objectID + 'Fields';

	customFieldsID = 'CustomFieldRelatedList_body';
	if (isCustomObject) customFieldsID = objectID + '_' + customFieldsID;
	
	if (isCustomObject) retURL = '/' + objectID + '?setupid=CustomObjects';
	else retURL = '/p/setup/layout/LayoutFieldList?type=' + objectID + '&setupid=' + objectID + 'Fields';
	
	processFieldsList('LayoutFieldList$RelatedStandardFieldsList_body', false);
	processFieldsList(customFieldsID, true);

}

function processFieldsList(tableID, isCustom) {

	// retrieve the table object
	var customFieldTable = document.getElementById(tableID); // .length > 0 ? document.getElementById(customFieldsID)[0] : null;
	
	if (customFieldTable == null) return;
	
	// for each row of the table
	for (var rownum = 0; rownum < customFieldTable.getElementsByTagName("tr").length; rownum++) {
		var row = customFieldTable.getElementsByTagName("tr")[rownum];
		var fieldID = null;
		
		if (row.getElementsByTagName("td").length > 0) {  				// if there are TD columns (the header row doesn't have this)
			var actionColumn = row.getElementsByTagName("td")[0];
			if (actionColumn.getElementsByTagName("a").length > 0) {	// is there an action link for this field?
				
				// https://cs3.salesforce.com/_ui/common/lookupFilters/FieldAttributesUi/e?FieldOrColumn=AccountNumber
				// https://cs3.salesforce.com/_ui/common/lookupFilters/FieldAttributesUi/e?Table=01IQ0000000D2Wm&FieldOrColumn=Owner&setupid=CustomObjects
				
				actionColumn.innerHTML = actionColumn.innerHTML + '&nbsp;|&nbsp;';
				var link = actionColumn.getElementsByTagName("a")[0];		// retrieve the 'Edit' link (the first one)
				
				// Standard fields have the 'Replace' link before the Edit Link
				if (link.href.indexOf("replacePickList.jsp") > 0) var link = actionColumn.getElementsByTagName("a")[1]
				
				// Name field: https://cs3.salesforce.com/p/setup/custent/CustomEntityNameFieldEdit?id=01IQ0000000D2Wm&setupid=CustomObjects
				// Standard field: https://cs3.salesforce.com/_ui/common/lookupFilters/FieldAttributesUi/e?&Table=01IQ0000000D2Wm&FieldOrColumn=Owner&setupid=CustomObjects
				// Custom Field: https://cs3.salesforce.com/00NQ0000000igKh/e?setupid=CustomObjects
				
				// Parse out the FieldName or FieldID from the URL
				if (link.href.indexOf("CustomEntityNameFieldEdit") > 0) fieldID = 'Name';					// 'Name' field
				else if (link.href.indexOf("currencylist.jsp") > 0) 	fieldID = 'CurrencyIsoCode';		// 'CurrencyIsoCode' field
				else if (link.href.indexOf("FieldOrColumn=") > 0) 		fieldID = getURLParameter( link.href, 'FieldOrColumn');  // other standard field
				else 													fieldID = link.href.split('/')[3];	// custom field
				//// GM_log('FieldID=' + fieldID);

				if (link.href.indexOf("retURL=") > 0) 		retURL = getURLParameter( link.href, 'retURL'); 
				
				// https://cs3.salesforce.com/p/setup/field/StandardFieldAttributes/e?id=00NQ0000000k35E&type=01IQ0000000D2Wm&setupid=CustomObjects
				// https://cs3.salesforce.com/p/setup/field/StandardFieldAttributes/e?id=Name&type=01IQ0000000D2Wm&setupid=CustomObjects
				
				// Build the URL and resulting HTML to use for the 'Set Field Level Security' page
				var securityURL = "/p/setup/field/StandardFieldAttributes/e?id=" + fieldID + "&type=" + objectID + "&setupid=" + setupID + "&retURL=" + retURL;
				var addHTML = '&nbsp;|&nbsp;<a href="' + securityURL + '" title="Edit Field Security">' + securityImage + '</a>';
				//// GM_log(addHTML);
				
				// Append the link to the TD HTML node
				var newLink = document.createElement('a');
				newLink.setAttribute('href',securityURL);
				newLink.setAttribute('title',"Edit Field Security");
				newLink.innerHTML = securityImage;
				//// GM_log(newLink.innerHTML);
				actionColumn.appendChild(newLink);
			}
		}
		
		// TO DO: Convert the FieldID to an 18 character version!! (maybe not!)
		if (isCustom) {
			// If this is the Custom Fields table, then add the column to show the FieldID
			var newColumn = document.createElement('td');
			if (fieldID == null) fieldID = 'Field ID';		// if there is no FieldID, then this is the column header
			newColumn.innerHTML = '<td>' + fieldID + '</td>';
			row.appendChild(newColumn);
		}
	}

}


function getURLParameter( url, name ) {
// Return a URL parameter value (or '')
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    if( results == null ) return "";
    else return results[1];
}
