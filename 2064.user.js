// Greasemonkey for Firefox: http://greasemonkey.mozdev.org/
// TO INSTALL: Click on 'Tools' menu and select 'Install This User Script'
///////////////////////////////////////////////////////////////////////////////
// MapQuest.com: Print Simple Directions     Version 1.0                     //
// Copyright 2005 Matt Wright                http://www.scriptarchive.com/   //
// Created On: 2005-11-02                    Last Modified: 2005-11-02       //
///////////////////////////////////////////////////////////////////////////////
// This script relies on the layout and format of MapQuest.com as of last    //
// modified date. Should you experience any problems, disable this script    //
// in greasemonkey and look for a newer version.                             //
///////////////////////////////////////////////////////////////////////////////
// COPYRIGHT NOTICE                                                          //
// Copyright 2005 Matthew M. Wright  All Rights Reserved.                    //
//                                                                           //
// Redistribution and use, with or without modification, are permitted       //
// provided that the following conditions are met:                           //
//                                                                           //
//   * Redistribution must retain the above copyright notice, this list of   //
//     conditions and the following disclaimer.                              //
//   * Neither the name Matt Wright or Matt's Script Archive may be used to  //
//     endorse or promote products derived from this software without        //
//     specific prior written permission.                                    //
//                                                                           //
// This software is provided "as is" and any express or implied warranties,  //
// including, but not limited to, the implied warranties of merchantability  //
// and fitness for a particular purpose are disclaimed. In no event shall    //
// Matt's Script Archive, Inc. or contributors be liable for any direct,     //
// indirect, incidental, special, exemplary or consequential damages         //
// (including, but not limited to, procurement of substitute goods or        //
// services; loss of use, data or profits; or business interruption) however //
// caused and on any theory of liability, whether in contract, strict        //
// liability, or tort (include negligence or otherwise) arising in any way   //
// out of the use of this software, even if advised of the possibility of    //
// such damage.                                                              //
///////////////////////////////////////////////////////////////////////////////
// Define Variables                                                          //

// Set this variable to 'false' to hide the directional icons by default.    //
// Setting it to true will show them by default. You can change this in the  //
// Greasemonkey menu while viewing directions from MapQuest.com using        //
// 'Toggle Directional Icons' under 'User Script Commands'.                  //

var showIcons = false;

// Set this variable to 'false' to hide the graphical maps by default.       //
// Setting it to true will show them by default. You can change this in the  //
// Greasemonkey menu while viewing directions from MapQuest.com using        //
// 'Toggle Map Images' under 'User Script Commands'.                         //

var showMaps = false;

// Done                                                                      //
///////////////////////////////////////////////////////////////////////////////

// ==UserScript==
// @name          MapQuest.com: Print Simple Directions
// @namespace     http://www.scriptarchive.com/
// @description	  Simplifies printer-friendly directions from MapQuest.com
// @include       http://www.mapquest.com/directions/main.adp?*do=prt*
// ==/UserScript==

(function() {
	// Setup Greasemonkey menu options and variables.
	GM_registerMenuCommand("Toggle Directional Icons", toggleIcons);
	GM_registerMenuCommand("Toggle Map Images", toggleMaps);
	GM_setValue('icons', showIcons ? true : false);
	GM_setValue('maps', showMaps ? true : false);

	// Move the To/From where the ad is located and remove ad
	var addrNode = document.getElementById('query');
	var adNode = document.getElementById('adPrint');
	if (addrNode && adNode) {
		adNode.parentNode.replaceChild(addrNode, adNode);
	}

	// Remove the notes text area
	var notesNode = document.getElementById('notes').parentNode;
	if (notesNode) {
		notesNode.style.display = "none";
	}

	displayIcons();
	displayMaps();

	// Remove the disclaimers and extra text
	var divs = document.getElementsByTagName('DIV');
	for (i=0; i<divs.length; i++) {
		if (divs[i].className == 'disclaimer clear') {
			divs[i].style.display = "none";
		}
	}

	// No need to display total miles and time more than once
	var tds = document.getElementsByTagName('TD');
	for (i=0; i<tds.length; i++) {
		if (tds[i].className == 'totals') {
			tds[i].style.display = "none";
			break;
		}
	}
})();

function toggleIcons() {
	GM_setValue('icons', GM_getValue('icons') ? false : true);
	displayIcons();
}

function toggleMaps() {
	GM_setValue('maps', GM_getValue('maps') ? false : true);
	displayMaps();
}

function displayIcons() {
	var showIcons = GM_getValue('icons');

	// Remove all map images
	var images = document.getElementsByTagName("IMG");
	for(i=0; i<images.length; i++) {
		if((images[i].width == 32 && images[i].height == 32) ||
		   images[i].src.indexOf('http://mq-signs.websys.aol.com') == 0) {
			images[i].style.display = showIcons ? "" : "none";
		}
	}
}

function displayMaps() {
	var showMaps = GM_getValue('maps');

	var images = document.getElementsByTagName("IMG");
	for(i=0; i<images.length; i++) {
		if(images[i].className == 'map') {
			images[i].style.display = showMaps ? "" : "none";
		}
	}

	// Remove the disclaimers and extra text
	var divs = document.getElementsByTagName('DIV');
	for (i=0; i<divs.length; i++) {
		if (divs[i].className == 'half clear startendprint') {
			divs[i].style.display = showMaps ? "" : "none";
		}
	}
}
