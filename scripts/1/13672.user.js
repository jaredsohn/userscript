// ==UserScript==
// @name           matar - lev-liba
// @namespace      education
// @description    enable flash in lev liba (matar)
// @include        http://matar.go.cet.ac.il/*
// ==/UserScript==

// Modified by Lior Zur, 2007 (many thanks :-)


// ==UserScript==
// name  LevLiba - Display Flash
// namespace Nadav Kavalerchik
// description	  Enables Flash Objects on LevLiba Site by MA.TA.CH (v0.2)
// include	  http://science.cet.ac.il/*
// ==/UserScript==



// --------------------------------------------------------------------
//
// This is a Greasemonkey  (0.5+) user script.
//
// To install, you need Firefox  http://www.getfirefox.com and
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools|Manage User Scripts,
// select the script and click Uninstall.
//
// --------------------------------------------------------------------



var obj = document.getElementById("DivFlash");

var changes = [
{url: '/science/matter/activity1.asp' , flash: 'images/volume1.swf', height: 280 ,width: 480},
{url: '/science/matter/activity2.asp' , flash: 'images/dissolve.swf', height: 280 ,width: 480},
{url: '/science/matter/activity3.asp' , flash: 'images/water.swf', height: 280 ,width: 690},
{url: '/science/matter/activity4.asp' , flash: 'images/solid-liquid.swf', height: 290 ,width: 680},
{url: '/science/matter/activity5.asp' , flash: 'images/separate.swf', height: 317 ,width: 680},
{url: '/science/matter/activity6.asp' , flash: 'images/attributes.swf', height: 285 ,width: 680},
{url: '/science/matter/activity7.asp' , flash: 'images/oil3.swf', height: 290 ,width: 680},
{url: '/science/matter/activity8.asp' , flash: 'images/Solid-Liquid-Gas.swf', height: 280 ,width: 680},
{url: '/science/matter/activity10.asp', flash: 'images/dead-sea2.swf', height: 317 ,width: 680},
{url: '/science/transportation/transport1.asp' , flash: '/science/transportation/images_human/system.swf', height: 386 ,width: 210},
{url: '/science/transportation/transport2.asp' , flash: '/science/transportation/images_human/Game7.swf', height: 386 ,width: 370},
{url: '/science/transportation/transport3.asp' , flash: '/science/transportation/images_human/heart.swf', height: 386 ,width: 385},
{url: '/science/transportation/transport4.asp' , flash: '/science/transportation/images_human/BloodToOrgans12.swf', height: 386 ,width: 565},
{url: '/science/transportation/transport5.asp' , flash: '/science/transportation/images_human/inheart.swf', height: 386 ,width: 385},
{url: '/science/transportation/transport6.asp' , flash: '/science/transportation/images_plants/sysplants.swf', height: 386 ,width: 565},
{url: '/science/transportation/transport7.asp' , flash: '/science/transportation/images_plants/pionit11.swf', height: 386 ,width: 565},
{url: '/science/transportation/transport8.asp' , flash: '/science/transportation/images_plants/roots.swf', height: 386 ,width: 565},
{url: '/science/transportation/transport9.asp' , flash: '/science/transportation/images_plants/cellwater.swf', height: 386 ,width: 565},
{url: '/science/transportation/transport10.asp', flash: '/science/transportation/images_plants/transpocell.swf', height: 386 ,width: 565}

//{url: '' , flash: '', height:'' ,width:''}

];


for (i in changes)
	fixFlash (changes[i]);

function fixFlash (c){
	if (!obj) return false;
	if (document.location.pathname == c.url) {
		var div = obj.parentNode;
		// Remove Ofek's Original Flash Object
		var newDiv = div.cloneNode(false);
		div.parentNode.replaceChild(newDiv, div);
		
		var newObj = document.createElement("object");
		newObj.type = "application/x-shockwave-flash";
		newObj.quality = "high";
		newObj.wmode = "transparent";
		newObj.allowScriptAccess = "sameDomain";
		newObj.height = c.height;
		newObj.width = c.width;
		newObj.movie = c.flash;
		newObj.data =  c.flash;
		
		newDiv.appendChild(newObj);
	}
}

