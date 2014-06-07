// ==UserScript==
// @name           forum.privet.com ignore boring threads
// @namespace      http://www.fruit6.com
// @description    Adds 'ignore thread' buttons (not implemented yet, use about:config to enter comma separated topic ids manually to preference name "greasemonkey.scriptvals.http://www.fruit6.com/forum.privet.com ignore boring threads.privetIgnoreThreads").
// @include        http://forum.privet.com/*
// @include        https://forum.privet.com/*
// ==/UserScript==

console.debug("'privet ignore thread' has been called");

window.addEventListener('load', function()
{	
function init() {
	// create new value if it does not exist
	var key = "privetIgnoreThreads";
	var value = GM_getValue(key);
	if (value == undefined) {
		GM_setValue(key, "");
	}

}

function isThreadIgnored(threadNum, threadNums) {
	for (var t = 0; t < threadNums.length; t++) {
		if (threadNums[t] == threadNum) {
			return true;
		}
	}
	return false;
}

/**
	get topic ids from firefox storage and hide topic rows
*/
function ignoreTopicThreads(threadNumber) {
	var key = "privetIgnoreThreads";
	var list = GM_getValue(key, "");
	var threadNums = new Array();
	threadNums = list.split(',');

	var div = document.getElementById("pagecontent"); // there should be just one div with this id.
	if (div == null) {
		return;
	}
	var tables = div.getElementsByTagName("table");
	for (var j = 0; j < tables.length; j++) {
		var one_table = tables[j];
		var table_classname = one_table.className;
		if (table_classname == "tablebg") {
			var rows = one_table.tBodies[0].rows;
			for (var i = rows.length - 1; i >= 0 ; i--) {
				var tr = rows[i];
				var tds = tr.getElementsByTagName("td");
				/* loop thru tds and find the right one.
				we are looking for tr elements that have at least 2 td elemnts with class
				name "row1".
				*/
				if (tds.length < 3) {
					continue;
				}
				var td1 = tds[0];
				var td2 = tds[1];
				var td3 = tds[2];
				
				// find thread id.
				var fragment = "&amp;t=";
				var rawText = td3.innerHTML;
				var pos1 = rawText.indexOf(fragment);
				if (pos1 == -1) {
					continue;
				}
				var temp_last_part = rawText.substring(pos1 + fragment.length, rawText.length);
				var pos2 = temp_last_part.indexOf('"');
				var pos2_2 = temp_last_part.indexOf('&');
				if (pos2_2 != -1 && pos2_2 < pos2) {
					pos2 = pos2_2;
				}
				var threadNum = rawText.substring(pos1 + fragment.length, pos1 + fragment.length + pos2);
				if (td1.className == "row1" && td2.className == "row1") {
					// modify content here.
					// check whether thread is in 'ignored' list
					var isIgnored = isThreadIgnored(threadNum, threadNums);
					if (isIgnored) {
						log("thread '" + threadNum + "' will be ignored/removed from DOM.");
						// remove row from the table
						one_table.deleteRow(i);
					}
				}
			
			}
		}
	}
	
	// show 'ignore topic' buttons.
	//showIgnoreButtons();
	log("ignoreTopicThreads ends");
}

function log(message) {
	console.debug(message);
}

init();
ignoreTopicThreads();

   
}, true);

