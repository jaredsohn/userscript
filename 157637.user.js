// ==UserScript==
// @name		GA Agency Profile unmask
// @description	        Shows hidden stuff
// @version		1.01
// @include		https://account.globalagendagame.com/GAregister/stats/agencyprofile.aspx?a=*
// @include		http://account.globalagendagame.com/GAregister/stats/agencyprofile.aspx?a=*
// ==/UserScript==

var id1;
var id2;
var id3;
var id4;
var id5;
var id6;
var id7;
var debugMode = false;

function getElements()
{
	id1 = document.getElementById('ctl00_Content_ValidationSummary1');
	id2 = document.getElementById('ctl00_Content_lblMotd');
	id3 = document.getElementById('ctl00_Content_hypAdmin');
	id4 = document.getElementById('ctl00_Content_divAImage');
	id5 = document.getElementById('ctl00_Content_imgAgency');
	id6 = document.getElementById('ctl00_Content_linkAgency');
	id7 = document.getElementById('ctl00_Content_TabContainerAccount_TabPanel5');
}

function ModElements()
{
	id1.style.visibility = "visible";
	id1.style.display = "block";
	id2.style.visibility = "visible";
	id2.style.display = "block";
	id3.style.visibility = "visible";
	id3.style.display = "block";
	id4.style.visibility = "visible";
	id4.style.display = "block";
	id5.style.visibility = "visible";
	id5.style.display = "block";
	id6.style.visibility = "visible";
	id6.style.display = "block";
	id7.style.visibility = "visible";
	id7.style.display = "block";
}



function writeLog(text)
{
	if (debugMode)
	{
		GM_log(text);
	}
}

function init()
{
	writeLog('init start');
	
	getElements();
	ModElements();
	
	writeLog('init end');
}

writeLog('GA Agency Profile Script starting...');
init();
writeLog('GA Agency Profile Script finished.');