// IRCTC Availability Display User Script
// version 0.1 BETA!
// 2008-03-28
// Copyright (c) 2008, Vikas Kedia
// Released under the GPL license
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
// select "IRCTC AVAIL", and click Uninstall.
//

// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IRCTC AVAIL
// @namespace     http://viked.livejournal.com/
// @description   Script to add availability status in the table containing list of trains
// @include       http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do*
// ==/UserScript==


function evaluateXPath(query) {
	return document.evaluate(query,
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
}


function chomp(raw_text)
{
  return raw_text.replace(/(\n|\r)+$/, '');
}


function getTrainIds() {
	var allIds, thisId;
	allIds = evaluateXPath("//div[@id='can0']");
	var ids = new Array();
	for (var i =0; i <allIds.snapshotLength;i++) {
		thisId = allIds.snapshotItem(i);
		ids[i] = chomp(thisId.innerHTML);
	}
	return ids;
}

function sessionInfo() {
	var url = window.location.href;
	var sessionIndex = url.indexOf('BV_SessionID');
	if (sessionIndex == -1)
		return;
	var startSessionId = url.indexOf('=', sessionIndex) + 1;
	var endSessionId = url.indexOf('&', sessionIndex);
	var sessionId = url.substring(startSessionId, endSessionId);
	var engineIndex = url.indexOf('BV_EngineID');
	if (engineIndex == -1)
		return;
        var startEngineId = url.indexOf('=', engineIndex) + 1;
	var endEngineId = url.indexOf('&', engineIndex);
	if (endEngineId != -1)
		var engineId = url.substring(startEngineId, endEngineId);
	else
		engineId = url.substring(startEngineId);
	return {sessionId: sessionId, engineId:engineId};

}



function getPlanDetails() {
	var stationFromNodes = evaluateXPath("//input[@name='stationFrom']");
	var stationFrom = stationFromNodes.snapshotItem(0).value;
	var stationTo = evaluateXPath("//input[@name='stationTo']").snapshotItem(0).value;
	var day = evaluateXPath("//select[@name='day']").snapshotItem(0).value;
	var month = evaluateXPath("//select[@name='month']").snapshotItem(0).value;
	var year = evaluateXPath("//select[@name='year']").snapshotItem(0).value;
	var classCode = evaluateXPath("//select[@name='classCode']").snapshotItem(0).value;	
	var quota = evaluateXPath("//input[@name='quota']").snapshotItem(0).value;
		if(stationFrom.indexOf("(")<0)
			sf = stationFrom;
		else
			sf = stationFrom.substring(stationFrom.indexOf("(")+1,stationFrom.indexOf(")"));
		if(stationTo.indexOf("(")<0)
			st = stationTo;
		else
			st = stationTo.substring(stationTo.indexOf("(")+1,stationTo.indexOf(")"));
	return {stationFrom:sf,stationTo:st,day:day,month:month,year:year,classCode:classCode,quota:quota};
//	return {stationFrom:"NGP", stationTo:"NZM", day:"14", month:"04",year:"2008",classCode:"Sleeper Class(SL)",quota:""};	
}


function formUrl(sessioninfo, plan, trainnum) {
var url = "http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/enquiry/avail.do?BV_SessionID="+sessioninfo.sessionId+"&BV_EngineID=" + sessioninfo.engineId + "&trainTo=true&availabilityPop=true&hdnTrnNo="+trainnum+"&hdnDay="+plan.day+"&hdnMonth="+plan.month+"&hdnYear="+plan.year+"&hdnClasscode="+plan.classCode+"&fromStation="+plan.stationFrom+"&toStation="+plan.stationTo+"&hdnQuota="+plan.quota+"&leftWidth=0";
return url;

}

var session = sessionInfo();
var plan = getPlanDetails();
var ids = getTrainIds();
var allIds, thisId;
allIds = evaluateXPath("//div[@id='can0']");
var ids = new Array();
for (var i =0; i <allIds.snapshotLength;i++) {
	thisId = allIds.snapshotItem(i);
	var trainid = chomp(thisId.innerHTML);
	var url = formUrl(session,plan,trainid);
	var statustd = document.createElement('td');
	var statusdiv = document.createElement('div');
	statusdiv.className = "boldFourteen";
	statusdiv.align = "center";
	statustd.appendChild(statusdiv);
	statusdiv.innerHTML = "...";
	thisId.parentNode.parentNode.appendChild(statustd);
GM_xmlhttpRequest({
    statuselem:statusdiv, 
    method: 'GET',
    url: url,
    onload: function(res){
	var ind1 = res.responseText.indexOf("AVAILABLE");
	var ind2 = res.responseText.indexOf("RAC");
	var ind3 = res.responseText.indexOf("WL");
	var ind4 = res.responseText.indexOf("NOT AVAILABLE");
	var ind5 = res.responseText.indexOf("REGRET");
	var firstindex;
	if (ind1 + ind2 + ind3 + ind4 + ind5 == -5) return;
	if (ind1 == -1) ind1 = 100000;
	if (ind2 == -1) ind2 = 100000;
	if (ind3 == -1) ind3 = 100000;
	if (ind4 == -1) ind4 = 100000;
	if (ind5 == -1) ind5 = 100000;
	if (ind1 < ind2)
		firstindex = ind1;
	else
		firstindex = ind2;
	if (firstindex > ind3)
		firstindex = ind3;
	if (firstindex > ind4)
		firstindex = ind4;
	if (firstindex > ind5)
		firstindex = ind5;	
	var endindex = res.responseText.indexOf("<", firstindex);
	var availstatus = res.responseText.substring(firstindex, endindex);
	this.statuselem.innerHTML = availstatus;
    }
    });    
}