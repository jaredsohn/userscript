// Ikariam Transport Countdown
// version 0.4.0
// 07-16-2008
// Copyright (c) 2008, Matthew Hancock
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
// select "Ikariam Transport Countdown", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Version History:
// 0.2.0: Original Public Release
// 0.2.1: Update time increased from 5 seconds to 1 second
// 0.2.2: Fixed Bug that caused Hours not to be displayed
// correctly for long transport times
// 0.3.0: Added countdown to Trading Port
// 0.4.0: Overkill perfected countdown logic and NAN bugs
// ==================================================
//
// This script modifies the Time of Arrival and Mission End
// times on the Trade Fleet page and modifies the Time of 
// Arrival on the Trading Port so that they countdown
// instead of showing a static time.  This makes it easier
// to see how much time is remaining until your transports
// arrive at a glance.
//
// This script was originally created by matthewaaron and perfected by Overkill
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ikariam Transport Countdown PL
// @namespace     http://noobflash.com/gm/
// @description   Convert Ikariam transport times to a countdown instead of static timestamp
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*
// ==/UserScript==


function debug(aMsg) { setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0); }

function itime2Date(ikariamTime){
	var dateTimeString,thisDate,month,day,year,thisTime,hour,minute,second;
	dateTimeString = ikariamTime.split(" ");
	thisDate = dateTimeString[0].split(".");
	year     = parseInt(thisDate[2],10);
	month    = parseInt(thisDate[1],10) - 1;
	day      = parseInt(thisDate[0],10);
	thisTime = dateTimeString[1].split(":");
	hour     = parseInt(thisTime[0],10);
	minute   = parseInt(thisTime[1],10);
	second   = parseInt(thisTime[2],10);
	//debug(ikariamTime + " " + year + " " + month + " " + day);
	return new Date(year,month,day,hour,minute,second);
}

function duration(seconds){
	var x = [Math.floor(seconds/86400) ,	Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 ,	seconds % 60 ];
	var y = ['d'                       , 'h'                            , 'm'                         , 's'];
	var r = [];
	for (var i = 0; i < x.length; ++i){ if (x[i] > 0) { r.push(x[i].toString() + y[i]); } }
	return r.join(' ');
}

function returnTableCells_merchantNavy(serverTime){
	var contents, y;
	var parent = $('mainview').childNodes[3].childNodes[3];
	var TDs = parent.getElementsByTagName("td");
	for (var td=0;td<TDs.length;td++){
		contents = TDs[td].innerHTML;
		if (contents.search(/Pozostalo/) != -1){ contents = TDs[td].firstChild.title; }
		if (contents.search(/\..*\..*:.*:/) != -1){
			y = itime2Date(contents);
			finalTime = y.getTime()-serverTime.getTime();
			//debug("td : " + td + " finalTime : " + finalTime);
			if (finalTime <= 0) {
				clearInterval(ev_updateServerTime);
				TDs[td].innerHTML = ' - ';
				window.location.reload();
				return;
			} else {
				TDs[td].innerHTML = '<span title=\"'+ contents +'\">'+duration(finalTime/1000)+'<br/>Pozostalo</span>';
			}
		}
	}
}

function returnTableCells_port(serverTime){
	var contents, y;
	var parent = $('mainview').childNodes[16].childNodes[3];
	var TDs = parent.getElementsByTagName("td");
	var obj_ServerTime = $('servertime');
	var serverDate     = obj_ServerTime.innerHTML.split(' ')[0];
	for(var td=0;td<TDs.length;td++){
		contents = TDs[td].innerHTML;
		if (contents.search(/Pozostalo/) != -1){ contents = TDs[td].firstChild.title; }
		if (contents.search(':') != -1){
			y = itime2Date(serverDate + " " + contents);
			finalTime = y.getTime()-serverTime.getTime();
			if (finalTime < -1) { finalTime += 86400; }
			if ((finalTime == 0) || (finalTime == -1)) {
				clearInterval(ev_updateServerTime);
				TDs[td].innerHTML = ' - ';
				window.location.reload();
				return;
			}else{
				TDs[td].innerHTML = '<span title="'+ contents +'">'+duration(finalTime/1000)+'<br/>Pozostalo</span>';
			}
		}
	}
}

function $(id) {
  return document.getElementById(id);
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}

function updateMerchantNavy(){
	var serverTime = itime2Date(obj_ServerTime.innerHTML);
	returnTableCells_merchantNavy(serverTime);
}

function updatePort(){
	var serverTime = itime2Date(obj_ServerTime.innerHTML);
	returnTableCells_port(serverTime);
}

switch(document.body.id) {
	case 'merchantNavy' :
		var obj_ServerTime = $('servertime');
		var ev_updateServerTime = setInterval(updateMerchantNavy, 1000);
		break;
	case 'port' :
		var obj_ServerTime = $('servertime');
		var ev_updateServerTime = setInterval(updatePort, 1000);
		break;
}