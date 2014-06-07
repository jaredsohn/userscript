// ==UserScript==
// @name          WaniKani Review Search
// @namespace     https://www.wanikani.com
// @description   Do a WaniKani Search on your review answer.  By RhosVeedcy.
// @version 1.4
// @downloadURL https://userscripts.org/scripts/source/448656.user.js
// @updateURL https://userscripts.org/scripts/source/448656.meta.js 
// @include       https://www.wanikani.com/review/session
// @include       http://www.wanikani.com/review/session
// @grant       none
// ==/UserScript==



function get(id) {
    if (id && typeof id === 'string') {
        id = document.getElementById(id);
    }
    return id || null;
}



function init(){
	console.log('init() start');
	var footer = document.getElementsByTagName('footer');
	
	footer[0].innerHTML = '<button id="hook_button" type="button" onclick="window.dispatchEvent(new Event(\'evtWKSearch\'));">Search</button>' +
	                      footer[0].innerHTML;
	window.addEventListener('evtWKSearch',doWKSearch); 

	window.addEventListener("keypress", hook_hotkey);

	var hotkeys = get("hotkeys");

	console.log(hotkeys);

	if (hotkeys) {

		var tbl = hotkeys.childNodes[3];
		console.log(tbl);
	
		if (tbl) {

			// Create an empty <tr> element and add it to the 1st position of the table:
			var row = tbl.insertRow(0);

			// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);

			// Add some text to the new cells:
			cell1.innerHTML = "S";
			cell2.innerHTML = "Search";
		}
	}

	console.log('init() end');
}


function hook_hotkey( e ) {

	var thebody = document.getElementsByTagName("body")[0];

	if (document.activeElement == thebody) {
		var thechar = e.which || e.keyCode;
		if (thechar == 83 || thechar == 115) {    // 's' key

			doWKSearch();
		}
	}
}



var sText = "";
var sWindow = null;



function copytext(){

	var qin;

	if (sWindow && sWindow.document) {

		qin = sWindow.document.getElementById("query");
	}

	if (qin) {

		qin.focus();
		qin.value = sText;
	}

	sWindow = null;
	sText = "";
}



function doWKSearch(){

    sText = get("user-response").value;
    sWindow = window.open("https://www.wanikani.com/about");

    if (sWindow) {
    	sWindow.addEventListener("load", copytext, false);
    }
}


init();
console.log('WK Rvw Srch load end');
