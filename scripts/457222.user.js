// ==UserScript==
// @name        SFDC Autorefresh
// @description Automatically updates Salesforce.com dashboards.  Configure for frequency and stop/start times.
// @namespace   http://damiansmith.us
// @include     https://*.salesforce.com/*
// @version     1.2
// @grant       GM_addStyle
// ==/UserScript==

//configuration
//the hours you want to start and stop - using 24 hour clock
var starthour = 8;
var stophour = 18;
//time in minutes you want the page to continue to autorefresh
var refreshfreq = 10;

//here be dragons
function sfdcAutorefresh() {
	var currentdate = new Date();
	var currenthour = currentdate.getHours();
	if (currenthour >= starthour && currenthour < stophour) {
		//within the configured time range, let's refresh the data
		refreshData();
	}else{
		//not within the configured time range, let's just wait 15 minutes then refresh the page to keep from getting logged out
		setTimeout(refreshPage, 900000);
	}
}

function refreshData() {
	var thebutton = document.getElementById('refreshInput');
	if (thebutton == null) {
		// not Enterprise SFDC
		document.getElementById('refreshButton').click();
	}else{
	// Enterprise edition
		location.assign( "javascript:" + thebutton.getAttribute("onclick") + ";void(0)" );            
	}
	//alternatively, the below line will also work, but it is not secure
	//unsafeWindow.sfdc.dashboardView.doRefresh();
	setTimeout(sfdcAutorefresh, refreshfreq * 60 * 1000);
}

function refreshPage() {
	location.reload();
}

sfdcAutorefresh();