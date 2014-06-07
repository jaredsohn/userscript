// ==UserScript==
// @name       GVoice DND
// @namespace  GVoice DND
// @version    0.5
// @description  show do not disturb on main page
// @match      https://*.google.com/voice*
// @updateURL  http://userscripts.org/scripts/source/136362.meta.js
// @downloadURL http://userscripts.org/scripts/source/136362.user.js
// @copyright  2013 Boris Joffe
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/*
    Copyright (C) 2013 Boris Joffe

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

// Global Strings
const ENABLE_DND = "Enable DND";
const TOGGLE_TO_ENABLED = "Success! - Enabled Do Not Disturb";

// Global URLs
//const ENABLE_DND_URL = 'https://www.google.com/voice/settings/editGeneralSettings/';
const ENABLE_DND_URL = 'https://www.google.com/voice/b/0/service/post'; // new URL

// Search and Regexp strings
const FIND_IF_DND_DISABLED_1 = '<span id="gc-dnd-static" style="display: none;">"Do Not Disturb" is enabled.';		// For DND with no end
const FIND_IF_DND_DISABLED_2 = '<span id="gc-dnd-until" style="display: none;">"Do Not Disturb" is enabled';	// For DND until

// Other Global const
const TOGGLE_TIMEOUT = 300;
const DEFAULT_DND_MINUTES = 20;
const OPACITY_PERCENT = 0.65;

// Colors
const FATALERR_COLOR = '#f00';
const ERR_COLOR = '#f31';
const WARN_COLOR = '#ffaa00';
const INFO_COLOR = '#999';
const BUTTON_BG_COLOR = '#f0f0ff';

// Globar DOM vars
var dndDiv;
var debugDiv;
var dndEnable, dndExp;

// URL Params
var _rnr_se;

// Global boolean vars
var DBG = false;
var ERR_VAL = -1;

window.addEventListener('load', 
function() {

	main();
	
	function main() {
		if (DBG) addDebugPane();
		
		// Initialization
		//dbgInfol(document.getElementsByName('_rnr_se')[0].value);
		_rnr_se = name0('_rnr_se').value;
		dbgInfol('_rnr_se: ' + _rnr_se);
		
		makeDNDdiv(isDNDenabled());
		
		document.body.appendChild(dndDiv);
		if (DBG && debugDiv != null) document.body.appendChild(debugDiv);
	}
	
	// Return true if DND is enabled; otherwise return false
	// TODO - fix console error below as a result of elIDstyle
	// Error: uncaught exception: [Exception... "Operation is not supported"  code: "9" nsresult: "0x80530009 (NS_ERROR_DOM_NOT_SUPPORTED_ERR)"  location: "resource://greasemonkey/runScript.js Line: 118"]
	function isDNDenabled() {
		const FIND_STATIC_DND = 'gc-dnd-display';
		var s = elIDstyle(FIND_STATIC_DND)
		
		if (s == null || s == ERR_VAL) {
		  dbgErrl('isDNDenabled/elIDstyle - s is: ' + s);
		  return ERR_VAL;
		} 
		s = s.display;
		if (s == ERR_VAL) {
		  dbgErrl('isDNDenabled/elIDstyle returned err');
		  return ERR_VAL;
		}
		//dbgInfol('display: ' + s);
		return s.indexOf('none') != -1;
	}
        
    
    // Create DND Div
    function makeDNDdiv(isEnabled) {
        if (DBG && isEnabled) dbgInfol("dnd enabled but making div anyway");
    
        dndDiv = document.createElement('div');
        dndDiv.id = "dndDiv";
        dndDiv.style.position = 'fixed';
        dndDiv.style.top = "23%";
        dndDiv.style.right = "10%";
        //dndDiv.style.border = "1px solid blue";
	dndDiv.style.padding = "7px";
    	dndDiv.style.backgroundColor = "#002"; //"#f0f0ff";
    	dndDiv.style.opacity = OPACITY_PERCENT;
    	dndDiv.style.zIndex="100";	// put it in front of other elements
	dndDiv.style.minWidth = "200px";
	
    	dndEnable = document.createElement('button');
        dndEnable.style.padding = '1px';
    	dndEnable.style.border = '1px solid blue';
    	dndEnable.style.margin = '5px';
    	dndEnable.style.backgroundColor = BUTTON_BG_COLOR;
    	dndEnable.textContent = ENABLE_DND;
    	
    	// Expiration Time Field - in unixtime
    	dndExp = document.createElement('input');
    	dndExp.id = "dndExp";
    	dndExp.type = "text";
    	dndExp.size = 13;
    	dndExp.style.display = "none";
    	//dndExp.style.visible = "none";
    	if (DBG) dndExp.style.display = "inline";
    	
    	// How long to set DND for
    	dndExpDate = document.createElement('input');
    	dndExpDate.id = "dndExpDate";
    	dndExpDate.type = "text";
    	dndExpDate.size = 4;
    	
    	var expValue = new Date( dndExp.value );
    	dndExpDate.value = DEFAULT_DND_MINUTES;
    	
    	// Units of time to set DND for
    	dndExpUnit = document.createElement('select');
    	dndExpUnit.id = "dndExpUnit";
    	minOpt = document.createElement('option');
    	minOpt.value = minOpt.text = 'Min';
    	hrOpt = document.createElement('option');
    	hrOpt.value = hrOpt.text = 'Hr';
    	dndExpUnit.add(minOpt);
    	dndExpUnit.add(hrOpt);
    	dndExpUnit.selectedIndex = 0;
    	//dndExpUnit.size = 2;
    	
    	dndFutureDate = document.createElement('span');
    	dndFutureDate.id = "dndFutureDate";
    	dndFutureDate.innerHTML = "";
    	dndFutureDate.style.color = "#fc0";
    	dndFutureDate.style.fontSize = 8;
    	//dndFutureDate.style.margin = "2px";
	//dndFutureDate.style.padding = "2px";
    	
    	dndDiv.appendChild(dndExpDate);
    	dndDiv.appendChild(dndExpUnit);
    	dndDiv.appendChild(dndEnable);
    	if (DBG) dndDiv.appendChild( document.createElement('br') );
    	dndDiv.appendChild(dndExp);
    	dndDiv.appendChild( document.createElement('br') );
    	dndDiv.appendChild(dndFutureDate);
    	
		
	// Create event listener toggle
    	dndEnable.addEventListener('click', enableDND, true);
    	dndExpDate.addEventListener('change', expChange, true);
    	dndExpDate.addEventListener('click', expChange, true);
    	dndExpUnit.addEventListener('change', expChange, true);
    	
    	// When Do Not Distrub expiration date changes
    	// Update seconds
    	function expChange() {
    	   var addMin = addHr = 0;
    	   var futureDate = new Date();
    	
    	   if ( dndExpUnit.selectedIndex == 0 ) {  // minutes selected
    	       addMin = dndExpDate.value;
    	       addMin = addMin * 60 * 1000;    // convert to UNIX ms
    	       futureDate.setTime( futureDate.getTime() + addMin );
    	   } else if ( dndExpUnit.selectedIndex == 1 ) { // hours selected
    	       addHr = dndExpDate.value;
    	       addHr = addHr * 60 * 60 * 1000;  // convert to UNIX ms
    	       futureDate.setTime( futureDate.getTime() + addHr );
    	   } else {
    	       dbgErrl('expChange evt: could not get selectedIndex');
    	       return ERR_VAL;
    	   }
    	   
    	   dndExp.value = futureDate.getTime();    // update unix time
    	   dbgInfol('futureDate: ' + futureDate);
    	   futureDate = futureDate.toString().replace(/GMT-\d{4}/, '');
    	   dndFutureDate.innerHTML = futureDate;
    	
    	}
	
    	// send AJAX POST request to enable DND for unspecified amt of time
    	function enableDND() {
    		dbgInfol('enabling');
    		oldReq = "doNotDisturb=1&_rnr_se=";
    		
    		actualReq1 = 'sid=3&mid=5&req=%5Bnull%2C%5Bnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cfalse%2C';
    		actualReq2 = '%5D%5D&_rnr_se=';
    		
    		expChange();
    		myFullReq = actualReq1 + dndExp.value + actualReq2 + encodeURIComponent(_rnr_se);
    		
    		GM_xmlhttpRequest({
    		  method: "POST",
    		  url: ENABLE_DND_URL,
    		  data: myFullReq,
    		  headers: {
    			"Content-Type": "application/x-www-form-urlencoded"
    		  },
    		  onload: function(response) {
    			//dndEnable.innerHTML = TOGGLE_TO_ENABLED;
    			dndFutureDate.innerHTML = TOGGLE_TO_ENABLED;
    			//dbgInfol( 'Sending request:\n\n' +  myFullReq);
    			setTimeout(window.location.reload(true), TOGGLE_TIMEOUT);  // is this useless like the dev console says??? - gv does a 2nd get request to update the page
    		  },
    		  onerror: function(response) {
    		      if (DBG) alert('Err: \n\n' + response);
    		  }
    		});
    	}
    }
	
	// Helper Functions
	function el(elStr) { 
	    x = document.getElementById(elStr);    // get el by ID
	    if (x == null) {
	       dbgErrl("el: no el by id: " + elStr);
	       return ERR_VAL;
	    } else 
	       return x;
	}	
	function elStyle(el) { 
	   x = window.getComputedStyle(el, null);	// get computed style of el
	   if (x == null) {
	       dbgErrl('elStyle: no el style for: ' + el);
	       return ERR_VAL;
	   } else 
	       return x;
	}
	
	function elIDstyle(elStr) { 
	   x = el(elStr);
	   if (x==ERR_VAL) {
	       dbgErrl('elIDStyle/el - el by ID returned error');
	       return ERR_VAL;
	   }
	   x = window.getComputedStyle( x, null ); 	// get computed style from el ID str
	   
	   //dbgInfol("computed style:\n"+x.content);
	   
	   if (x == null) {
	       dbgErrl('elIDStyle: could not get el style from elbyId: ' + elStr);
	       return ERR_VAL;
	   } else 
	       return x;
	}
	
	function name0(elStr) { 
	   x = document.getElementsByName(elStr); // get first element of a certain name
	   if (x == null) {
	       dbgErrl("name0: no el by name: " + elStr);
	       return ERR_VAL;
	   } else if (x[0]==null) {
	       dbgErrl('name0: el exists but el[0] doesnt');
	       return ERR_VAL;
	   } else if (x[0].value==null) {
	       dbgWarnl('name0: el[0].value is null');
	       return x[0];
	   } else 
	       return x[0];
	}	
	
	// ========== DEBUGGING SECTION =========
	// Adds a fixed div at the top right with debug info
	function addDebugPane() {
		debugDiv = document.createElement('div');
		debugDiv.id = "debugDiv";

		//Some CSS stuff
		debugDiv.style.position = "fixed";
		debugDiv.style.top = "38%";
		debugDiv.style.right = "5%";
		debugDiv.style.padding = "5px";
		debugDiv.style.border = "2px solid red";
		debugDiv.style.backgroundColor = "white";
		//debugDiv.style.minWidth = "20%";
		debugDiv.style.zIndex="100";	// put it in front of other elements
		
		debugDiv.innerHTML = "<b><u>Debug Info</u></b><br>";
	}
	
	// Add info to debug div
	function dbgAdd(htmlText) {	
		if (DBG && debugDiv != null)
			debugDiv.innerHTML += htmlText; 
		else if (DBG) {
			var tmpDiv = document.createElement('div');
			tmpDiv.innerHTML = htmlText;
			alert('DBG info:\n\t' + tmpDiv.textContent + ' \n\n\n(Note: debugDiv is null)');
		}
	}
	function dbgAddl(htmlText) { dbgAdd(htmlText + "<br>"); }
	function dbgFatal(htmlText) { dbgAdd('<b style="color:' + FATALERR_COLOR + ';">Fatal Err:</b> ' + htmlText);}
	function dbgFatall(htmlText) { dbgAddl('<b style="color:' + FATALERR_COLOR + ';">Fatal Err:</b> ' + htmlText);}
	function dbgErr(htmlText) { dbgAdd('<b style="color:' + ERR_COLOR + ';">Err:</b> ' + htmlText); }
	function dbgErrl(htmlText) { dbgAddl('<b style="color:' + ERR_COLOR + ';">Err:</b> ' + htmlText); }
	function dbgWarn(htmlText) { dbgAdd('<i style="color:' + WARN_COLOR + ';">Warning:</i> ' + htmlText); }
	function dbgWarnl(htmlText) { dbgAddl('<i style="color:' + WARN_COLOR + ';">Warning:</i> ' + htmlText); }
	function dbgInfo(htmlText) { dbgAdd('<i style="color:' + INFO_COLOR + ';">Info:</i> ' + htmlText); }
	function dbgInfol(htmlText) { dbgAddl('<i style="color:' + INFO_COLOR + ';">Info:</i> ' + htmlText); }
	
}, true);
