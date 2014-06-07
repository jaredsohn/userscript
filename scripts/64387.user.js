// ==UserScript==
// @name           	Change M
// @namespace      	Change M
// @include        	https://129.39.234.13/managenowen.war/servlet/com.sdtc.wsi.MainServlet?Command=CustomFilterBean&src=first
// @include			https://*mn6.sdcne-services.ihost.com/*
// ==/UserScript==

// PROBLEM MANAGEMENT START

//Saved
xSaved = document.evaluate("//input[@name='saved']", document, null,  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
xUnscheduled = document.evaluate("//input[@name='unscheduled']", document, null,  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
xOpen = document.evaluate("//input[@name='open']", document, null,  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
xHeld = document.evaluate("//input[@name='held']", document, null,  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xSaved.snapshotItem(0).checked = "true";
	xUnscheduled.snapshotItem(0).checked = "true";
	xOpen.snapshotItem(0).checked = "true";
	xHeld.snapshotItem(0).checked = "true";

var mesic = (new Date().getMonth()<10)?"0"+new Date().getMonth():new Date().getMonth()
var den = (new Date().getDate()<10)?"0"+new Date().getDate():new Date().getDate()
	
//Start Datum
xStartdatemonth = document.evaluate("//select[@name='startdatemonth']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xStartdatemonth.snapshotItem(0).value = mesic
xStartdateday = document.evaluate("//select[@name='startdateday']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xStartdateday.snapshotItem(0).value = den;
xStartdateyear = document.evaluate("//select[@name='startdateyear']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xStartdateyear.snapshotItem(0).value = new Date().getFullYear();
xStartdatehour = document.evaluate("//select[@name='startdatehour']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xStartdatehour.snapshotItem(0).value = "00";
xStartdateminute = document.evaluate("//select[@name='startdateminute']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xStartdateminute.snapshotItem(0).value = "00";

//End datum
xEnddatemonth = document.evaluate("//select[@name='enddatemonth']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xEnddatemonth.snapshotItem(0).value = mesic;
xEnddateday = document.evaluate("//select[@name='enddateday']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xEnddateday.snapshotItem(0).value = den;
xEnddateyear = document.evaluate("//select[@name='enddateyear']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xEnddateyear.snapshotItem(0).value = new Date().getFullYear();
xEnddatehour = document.evaluate("//select[@name='enddatehour']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xEnddatehour.snapshotItem(0).value = "23";
xEnddateminute = document.evaluate("//select[@name='enddateminute']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xEnddateminute.snapshotItem(0).value = "59";
	
//Date type
xDateoption = document.evaluate("//select[@name='dateoption']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xDateoption.snapshotItem(0).value = "BetweenBoth";
xDatetype = document.evaluate("//select[@name='datetype']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xDatetype.snapshotItem(0).value = "Scheduled";

// Assignee role
xResourcerole = document.evaluate("//select[@name='resourcerole']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xResourcerole.snapshotItem(0).value = "Approver";

// input Resource ID
xResourceid = document.evaluate("//input[@name='resourceid']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	xResourceid.snapshotItem(0).value = "SDD-CZNSSNW";

//Type group
xResourcetype = document.evaluate("//select[@name='resourcetype']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
xResourcetype.snapshotItem(0).value = "Group";