// ==UserScript==
// @name		For viewing Gujarati Unicode in Firefox
// @namespace		http://www.kakasab.com
// @description		Temp. fix for Mozilla Bug # 270012.
// @version		2006-03-18
// @include		http://*
// @include		file://*
// ==/UserScript==

// Comments/Suggestions ? saravanannkl at gmail dot com
//
// Tested with
// 	Firefox 1.0.7/Greasemonkey 0.53
// 	Firefox 1.5/Greasemonkey 0.6.4
// 	Opera 9.0 Build 8212
//
// ChangeLog
// 2006-03-18
//	Added support for the following language scripts,
//		Devanagari(Hindi)
//		Bengali
//		Gurumukhi
//		Gujarati
//		Oriya
//		Telugu
//		Kannada
//		Malayalam
//	Fixes Letter Spacing bug in Opera.
//
// 2005-08-03
//	Added support for automatic detection of Tamil scripts.
//
// 
// uploaded by Kakasab
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You can download a copy of the GNU General Public License at
// http://www.gnu.org/licenses/gpl.txt
// or get a free printed copy by writing to the Free Software Foundation,
// Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
// 
// END LICENSE BLOCK 

/* Build Regexp strings for the supported languages using the unicode range. */
var INDIC_REG_EXP_STR = "[" + String.fromCharCode(0x0900) + "-" + String.fromCharCode(0x0D7F) + "]+";


/* Create array of RegExp objects for the supported languages. */
var arrRegExp = [new RegExp(INDIC_REG_EXP_STR)];

var justifiedObjects = new Array();
var objwithLtrSpg = new Array();
var objwithWrdSpg = new Array();
var objLtrSpgVal = new Array();
var objWrdSpgVal = new Array();
var bToggled = false;


function canIFix () {
	// Check the current page for the supported languages.
	var allBody = document.getElementsByTagName("body")
	if(allBody.length==0) return false;
	for(var iScrIndx=0;iScrIndx<arrRegExp.length; iScrIndx++) {
		if(arrRegExp[iScrIndx].test(allBody[0].innerHTML)) return true;
	}
	return false;
}
	
function fixTags (obj) {
	if(!obj) return;

	if(obj.style) {

		var objStyle = window.getComputedStyle(obj, '');

		if(objStyle.textAlign.length == 7 && !window.opera) {
			obj.style.textAlign = "left";
			justifiedObjects[justifiedObjects.length] = obj;
		}

		if(objStyle.letterSpacing.length!=0 && objStyle.letterSpacing.length!=6 ) {
			objwithLtrSpg[objwithLtrSpg.length] = obj;
			objLtrSpgVal[objLtrSpgVal.length] = objStyle.letterSpacing;
			obj.style.letterSpacing = "normal";
		}

		if(objStyle.wordSpacing.length!=0 && objStyle.wordSpacing.length!=6 && !window.opera) {
			objwithWrdSpg[objwithWrdSpg.length] = obj;
			objWrdSpgVal[objWrdSpgVal.length] = objStyle.wordSpacing;
			obj.style.wordSpacing = "normal";
		}

	}

	var kids = obj.childNodes;

	if(!kids) return;

	// Do the same for Object's Children
	for (var i = 0; i < kids.length; i++)
		fixTags(kids[i]);
}

function toggleChanges(e) {
	if(bToggled) {
		for(i=0;i<justifiedObjects.length; i++)
			justifiedObjects[i].style.textAlign = 'left';

		for(i=0;i<objwithLtrSpg.length; i++)
			objwithLtrSpg[i].style.letterSpacing = 'normal';

		for(i=0;i<objwithWrdSpg.length; i++)
			objwithWrdSpg[i].style.wordSpacing = 'normal';
	}
	else {
		for(i=0;i<justifiedObjects.length; i++)
			justifiedObjects[i].style.textAlign = 'justify';

		for(i=0;i<objwithLtrSpg.length; i++)
			objwithLtrSpg[i].style.letterSpacing = objLtrSpgVal[i];

		for(i=0;i<objwithWrdSpg.length; i++)
			objwithWrdSpg[i].style.wordSpacing = objWrdSpgVal[i];
	}
	bToggled = !bToggled;
}

function notifyUser() {
	if(justifiedObjects.length == 0 && objwithLtrSpg.length == 0 && objwithWrdSpg.length == 0) return;
	if(GM_registerMenuCommand)
		GM_registerMenuCommand('MozTxtAlign - Undo the Changes', toggleChanges);
}

function processPage() {
	if(!canIFix()) return;
	fixTags(document.body);
	notifyUser();
}

processPage();