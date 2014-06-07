// ==UserScript==
// @name           Spy Report Keeper
// @version	1.0
// @author	miasM
// @namespace	http://www.no-net.org/miasma/ikariam/SpyReportKeeper.user.js
// @description    this script add link to save spy reports
// @include        http://s1.ikariam.it/*?view=safehouse*
// ==/UserScript==

// http://www.no-net.org/miasma/ikariam/SpyReportKeeper.user.js
// version 0.3.0
// 2009-05-05
// Copyright (c) 2009, www.entula.net by miasM
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
// select, and click Uninstall.
//
// --------------------------------------------------------------------
//
// Version History:
// 0.1.0: Original Public Release
// 0.2.0: First code rewrite.
// 0.3.0: some bug fix
// 1.0.0: Added display function, set refresh when data has been deleted


/*
This function lets us access an element by it's class name
Original Author: wphilipw
Edited: ImmortalNights
*/

document.getElementsByClass = function(className) {
    var all = document.getElementsByTagName('*');
    var elements = new Array();
    for (var e = 0; e < all.length; e++) { //
        var searchRegExp = new RegExp(className);
        var htmlObject = all[e].className;
        if (searchRegExp.exec(htmlObject) != null)
          elements[elements.length] = all[e];
    }
    return elements;
}

unsafeWindow.cleandata = function(str){
	if(str != null){
		GM_deleteValue(str);
		showReport();
	}else{
		saves = GM_listValues();
		for (var d = 0; d < saves.length; d++){
			GM_deleteValue(saves[d]);
			showReport();
		}
	}
}


function getIdentifier(objectClass) {
    var logType = objectClass.substr(8, 4)
    return logType;
}

function getLimit(logLength) {
    var processMaximum = 30;
    if (processMaximum != 0) {
        return (logLength > processMaximum ? processMaximum : logLength);
    }
    return logLength;
}

/*
This function runs when the system starts, also does the main funtions of the script
Author: miasM
*/
function WriteFile(str,data)
{
	saves = GM_listValues();
	Saved=false;
	for (var d = 0; d < saves.length; d++){
		if(str==saves[d]){ Saved=true; break;}
	}
	if(!Saved){
		GM_setValue(str, data); // Write the string to a file
	}
}
function showReport(){
	window.location.reload();
}
// TODO: to be completed :)
function whereToShow() {
	if (document.getElementById('information')!=null &&
		document.getElementById('island')==null) return 'information';
	if (document.getElementById('buildingUpgrade')!=null) return 'buildingUpgrade';
	if (document.getElementById('infocontainer')!=null) return 'infocontainer';
	if (document.getElementById('backTo')!=null) return 'backTo';
	if (document.getElementById('viewMilitaryImperium')!=null) return 'viewMilitaryImperium';
	if (document.getElementById('viewDiplomacyImperium')!=null) return 'viewDiplomacyImperium';
	if (document.getElementById('viewResearchImperium')!=null) return 'viewResearchImperium';
	if (document.getElementById('viewCityImperium')!=null) return 'viewCityImperium';
	return null;
}

function init() {
    var logs = document.getElementsByClass("subject");
	var title = new Array();
    for (var m = 0; m < logs.length;m ++) {
		var pip2 = logs[m].innerHTML.substr(logs[m].innerHTML.lastIndexOf("=")+1);
		var spyMsgID = pip2.slice(0,pip2.lastIndexOf("\""));
		//
		var pip4 = logs[m].innerHTML.indexOf("=");
        var pip3 = logs[m].innerHTML.substr(pip4+2);
		if((pip3.slice(0,1)=="T")||(pip3.slice(0,2)=="Ri")){
		pip3 = pip3.slice(0,pip3.indexOf("\""));
		pip6 = pip3.substr(pip3.indexOf(" "),pip3.length);
		//alert(pip3.indexOf(" ")+" - "+pip3.length+" - "+pip6);
		WriteFile(spyMsgID,pip6+": "+logs[m].innerHTML);
		}
    }
	var baseElements = '<h3 class="header">Spy Report</h3>';
    baseElements += '<div id="SpyReportKeeperContent" style="font-size:8pt; text-align:left;"></div>';
    baseElements += '<div class="footer"></div>';

		//need a new div under unitconstructionlist
	if(document.getElementById('SpyReportKeeper') == null) {
    var divContainer = document.createElement('div');
    divContainer.setAttribute('id','SpyReportKeeper');
    divContainer.innerHTML = baseElements;
    document.getElementById(whereToShow()).appendChild(divContainer);
	}
	var foot = document.getElementById("SpyReportKeeperContent");
	//ids.SpyReportKeeperContent.a.display="none";
	//ids.SpyReportKeeperContent.tags.a.fontSize="8pt";
	//ids.SpyReportKeeperContent.tags.a.fontStyle="normal";
	//ids.SpyReportKeeperContent.tags.a.text-align="left";
	
	var saves = GM_listValues();
	var pip;
	pip="<ul>";
		for (var d = 0; d < saves.length; d++){
			pip +="<li>"+GM_getValue(saves[d])+"<a Style='display:normal;margin:0px auto; font-weight:normal; font-size:8pt; text-align:left; color:blue' href='javascript:void(0)' title='Elimina solo questa riga' onClick='cleandata("+saves[d]+")'> X </a></li>";
		}
		pip +="<li><a Style='display:normal;margin:0px auto; font-weight:normal; font-size:8pt; text-align:left; color:blue' href='javascript:void(0)' title='Elimina tutti i dati archiviati!' onClick='cleandata()'>clean data</a></li>";
		pip +="</ul>";
	foot.innerHTML=pip;
	//ids.SpyReportKeeperContent.tags.a.color="blue";
	
}

//Start the Script
init();