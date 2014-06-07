// ==UserScript==
// @name          Log Formtter
// @description   Allows for view salesforce.com System Log in a friendlier format.
// @include       https://prerelna1.pre.salesforce.com/apexdebug/SystemLog.apexp
// ==/UserScript==

var include_jq = document.createElement('script');
include_jq.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js';
include_jq.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(include_jq);

var flexi =document.createElement('script');
flexi.src = 'http://flexigrid.info/flexigrid.js';
flexi.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(flexi);

var flexi =document.createElement('script');
flexi.src = 'http://flexigrid.info/flexigrid.js';
flexi.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(flexi);

var fcss = document.createElement('link');
fcss.rel = "stylesheet";
fcss.href="http://www.flexigrid.info/style.css";
//document.getElementsByTagName('head')[0].appendChild(fcss);

var fcss1 = document.createElement('link');
fcss1.rel = "stylesheet";
fcss1.href="http://www.flexigrid.info/css/flexigrid/flexigrid.css";
document.getElementsByTagName('head')[0].appendChild(fcss1);

function include_jq_wait() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(include_jq_wait,100); }
   else { $ = unsafeWindow.jQuery; setup(); }
}
include_jq_wait();

function getExecuteAnonymous() {
	var snapAnon = document.evaluate("//textarea", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for (var i = snapAnon.snapshotLength -1;i >= 0;i--) { 
		var item = snapAnon.snapshotItem(i); 
		if (item.id && item.id.indexOf('anonymousBody') != -1) { 
			return item;
		}
	}
}

function getExecuteButton() {
	var snapAnon = document.evaluate("//input", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for (var i = snapAnon.snapshotLength -1;i >= 0;i--) { 
		var item = snapAnon.snapshotItem(i); 
		if (item.id && item.id.indexOf('executeButton') != -1) { 
			return item;
		}
	}
}

function getTraceList() {
	var snapAnon = document.evaluate("//select", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for (var i = snapAnon.snapshotLength -1;i >= 0;i--) { 
		var item = snapAnon.snapshotItem(i); 
		if (item.id && item.id.indexOf('traceListSelect') != -1) { 
			return item;
		}
	}
}

function getLogContent() {
	var snapAnon = document.evaluate("//*[@class='selectedLogContentStyle']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for (var i = snapAnon.snapshotLength -1;i >= 0;i--) { 
		var item = snapAnon.snapshotItem(i); 
		if (item.id && item.id.indexOf('logContent') != -1) { 
			return item;
		}
	}
}

function my_func() {
	/*if (showingMyDiv == false) {
		lContent.parentNode.style.display = "block";
	}*/
	window.setTimeout(popLog, 500);
}
function popLog() {
	/*if (showingMyDiv == true) {
		lContent.parentNode.style.display = "none";
	}*/
	lContent = getLogContent();
	var lines = lContent.innerHTML.split('<br>');
	try {
		var parsedLog = parseLog(lines);
	} catch(e) {
		alert(e);
	}
	var logRows = parsedLog.rows;
	try {
		makeTable(logRows, parsedLog);
	} catch(e) {
		alert(e);
	}
}

function getDebugLines(row) {
	return '<tr><td></td><td style="overflow: visible">' + row.debugLines + '</td></tr>';
}
function getContentLines(row) {
	var ret = '';
	for (var k=0;k<row.content.length;k++) {
		ret += '<tr><td><td>' + row.content[k] + '</td></td></tr>';
	}
	return ret;
}
function getStandardRow(row) {
	ret = '<tr>';
	for (var j=0;j<row.cols.length;j++) {
		var col = row.cols[j];
		ret += '<td>' + col + '</td>';
	}
	ret += '</tr>';
	return ret;
}

function makeTable(logRows, parsedLog) {
	var tString = '<table class="flexme1" >';
	var colCount = parsedLog.ColumnCount;
	
	tString += '<thead>';
	tString += '<tr>';

	tString += '<th></th>';
	
	for (var x=1;x<parsedLog.columnCount;x++) {
		tString += '<th></th>';
		colCount = x;
	}
	
	tString += '</tr></thead>';
	tString += '<tbody>';
	for (var i=0;i< logRows.length;i++) {
		var row = logRows[i];
		var dLines = "";
		var cLines = "";
		var sLine = "";

		if (row.content) {
			cLines = getContentLines(row);
		} else if (row.debugLines) {
			dLines = getDebugLines(row);
		}
		if (row.cols) {
			sLine = getStandardRow(row);
		}
		tString += sLine + cLines + dLines;
	}
	tString += '</tbody></table>';

	var div;
	div =document.getElementById("contentDiv");

	div.innerHTML = tString;
	var colM = [];

	for (var ii=0;ii<colCount + 1;ii++) {
		switch (ii) {
			case 0:
				colM[ii] = {display: 'Time Stamp', width : 100, sortable : true, align: 'left' };
				break;
			case 1:
				colM[ii] = {display: 'Execution State', width: 180, sortable : false, align: 'left' };
				break;
			default:
				colM[ii] = {display: 'Info Col ' + (ii - 1), width: 180, sortable : true, align: 'left' };
				break;
		}
	}
	$('.flexme1').flexigrid({height:'auto', 
			colModel :  colM });
	if (showingMyDiv == false) {
		mydiv.style.display = "none";
	}
}

function parseLog(trace) {
	debugger;
	var maxCols = 0;
	var log = {};
	var tsRegEx = new RegExp( /\d{1,2}:\d\d:\d\d\.\d\d\d\|/);

	var rows = [];
	for (var i=0;i<trace.length;i++) {
		// Add a new entry to the rows
		var rcount = rows.push({});

		var line = trace[i];

		if (line.match(tsRegEx)) {
			// This is a time stamped log entry 
			var cols = line.split("|");
			if (cols.length > maxCols) {
				maxCols = cols.length;
			}
			rows[rcount - 1].cols = cols;
			if (rows[rcount - 1].cols[1] == "USER_DEBUG") {
				var lastCol = cols[cols.length - 1];
				rows[rcount  -1].debugLines = lastCol.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
				cols[cols.length - 1] = "";
			}
		} else {
			// This entry does not have a time stamp, so is informational about the previous entry
			if (rcount == 1) {
				// Do nothing, this is the first Row
			} else {
				// Remove the object just pushed on above
				rows.pop();
				// Grab the previous object off the array
				var rowObj = rows.pop();
				// Check to see if this is user debug
				if (rowObj.cols[1] == 'USER_DEBUG') {
					if (!rowObj.debugLines) {
						rowObj.debugLines = line.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
					} else {
						rowObj.debugLines += line.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
					}
				} else {
					if (!rowObj.content) {
						rowObj.content = [];
					}
					rowObj.content.push(line);
				}
				rows.push(rowObj);
			}
		}
	}
	log.rows = rows;
	log.columnCount = maxCols;
	return log;
}

swapViews = function() {
	try {
		var curDisplay = lContent.parentNode.style.display;
		if (curDisplay == "block") {
			lContent.parentNode.style.display = "none";
			mydiv.style.display = "block";
			showingMyDiv = true;
		} else {
			lContent.parentNode.style.display = "block";
			mydiv.style.display = "none";
			showingMyDiv = false;
		}
	} catch(e) {
		alert(e);
	}
}

function addMyDiv(divNode) {
	mydiv = document.createElement('div');
	mydiv.id = "contentDiv";
	divNode.parentNode.parentNode.appendChild(mydiv);
}

function addBtnDiv(divNode) {
	try {
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		var mdiv = document.createElement('div');
		mdiv.id = "buttonDiv";

		td.appendChild(mdiv);
		tr.appendChild(td);

		mdiv.innerHTML = '<input type="button" ' +
			'value="Swap Log View" ' +
			'class = "btn" />';

		mdiv.addEventListener("click", swapViews, true);

		divNode.parentNode.parentNode.parentNode.parentNode.insertBefore(tr, divNode.parentNode.parentNode.parentNode);
	} catch(e) {
		alert(e);
	}
}

var lContent;
var traceList;
var mydiv;
var showingMyDiv = false;

function setup() {
	var item = getExecuteAnonymous();
	
	// Populates a command in execute anonymous - USED FOR DEVELOPMENT ONLY
/*
	if (item.value == "") { 
		item.value = "List<Phone__c> p = [Select Id, Description__c From Phone__c];\n" + 
			"for (Phone__c pp : p) {\n" + 
    				"System.debug('Rich Text: ' + pp.Description__c);\n" +
			"}"; 
	} 
	var eBtn = getExecuteButton();
	eBtn.click();
*/
	lContent = getLogContent();
	lContent.parentNode.style.display = "block";
	addMyDiv(lContent);
	addBtnDiv(lContent);
	traceList = getTraceList();
	traceList.addEventListener("change", my_func, true);
}