// ==UserScript==
// @name	Last.fm - fix library
// @namespace	http://no.name.space/
// @description	Allows user to fix the information on the library pages
// @include	http://www.last.fm/user/*/library/music/*
// ==/UserScript==


function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var pCount = 0;
var tCount = 0;

(function () {
	var aPath = "//TABLE[@id='libraryList']/TBODY/TR/TD[contains(@class,'album')]/A";
	var pPath = "//TABLE[@id='libraryList']/TBODY/TR/TD[contains(@class,'playcount')]/A";
	var tPath = "//TABLE[@id='libraryList']/TBODY/TR/TD[contains(@class,'time')]";
	var aData = xpath(aPath); var pData = xpath(pPath);
	var tData = xpath(tPath);
	var tHead = "//TABLE[@id='libraryList']/THEAD";
	var tHeadEl = xpath(aPath).snapshotItem(0);
	for (var i=0; i<aData.snapshotLength;i++) {
		aData.snapshotItem(i).href = aData.snapshotItem(i).href.replace(/\/user\/[^\/]*\/library\//i,"/");
		var pCountI = parseInt(pData.snapshotItem(i).text.replace(/,/g,""));     
		var tString = ""+tData.snapshotItem(i).innerHTML;
		var tMin = 0; var tSec = 0;
		if (tString.match(/:/)) {
			tMin = parseInt(tString.split(":")[0]);
			tSec = parseInt(tString.split(":")[1]);
		}
		tCount += pCountI * ( tMin * 60 + tSec );
		pCount += pCountI;
	}
	if (aData.snapshotLength > 1) {
		var tFootEl = document.createElement("TFOOT");
		var tableEl = xpath("//TABLE[@id='libraryList']").snapshotItem(0);
		tFootEl.innerHTML= "<TR><TD></TD><TD>Tracks: "+i+"</TD><TD COLSPAN=3></TD><TD></TD><TD>"+mTimeStr(tCount)+"</TD><TD ALIGN=RIGHT>"+pCount+"</TD><TD></TD></TR>";
		tableEl.insertBefore(tFootEl, tableEl.firstChild.nextSibling.nextSibling);
	}
}) ();

function mTimeStr(newTotTim){
	var secTot = newTotTim % 60; newTotTim = (newTotTim - secTot)/60;
	var minTot = newTotTim % 60; newTotTim = (newTotTim - minTot)/60;
	var hourTt = newTotTim % 24; var dayTot = (newTotTim - hourTt)/24;
	if (hourTt < 10) {hourTt = "0"+hourTt;}
	if (minTot < 10) {minTot = "0"+minTot;}
	if (secTot < 10) {secTot = "0"+secTot;}
	var timPlyStr = dayTot +"d,"+hourTt+":"+minTot+":"+secTot;
	return(timPlyStr);
}