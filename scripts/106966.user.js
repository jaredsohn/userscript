// ==UserScript==
// @name           IPPractice.ca - CIPO Database Tool
// @namespace      ippractice.ca
// @description    Makes CIPO database results more useful
// @version	   0.1
// @author	   Alan Macek
// @copyright	   2011, Alan Macek (http://www.alanmacek.com)
// @include        http://brevets-patents.ic.gc.ca/opic-cipo/cpd/eng/search/results.html*
// ==/UserScript==

/*
Release History
2011/07/13: Version 0.1
	- initial release

*/

var mainTable = document.getElementById("ResultsTable");

columns = [ "#", "Patent Number", "Patent Title", "Score", "Filed", "Issued", "Agent" ];
myRows = new Array();

header = mainTable.tHead.rows[0];

//delete extra columns
for (var i = 0; i < header.cells.length; i++) {
	if (columns[i] != header[i]) {
		
	}
}
//add new columns
for (var i = header.cells.length; i < columns.length; i++) {
	var newColumn = header.insertCell(-1);
	newColumn.innerHTML = columns[i];
}

for (var i = 1; i < mainTable.rows.length; i++) {
	var thisRow = mainTable.rows[i];
	
	var urlCell = thisRow.cells[1];
	var m = urlCell.innerHTML.match(/\/.*?html/);

	myRows[i] = createMyRow(thisRow);
	
	displayRow(myRows[i]);
}

function createMyRow(htmlRow) {
	var myRow = new Object();
	myRow.htmlRow = htmlRow;
	myRow.url = htmlRow.cells[1].innerHTML.match(/\/.*?html/);
	myRow.number = htmlRow.cells[1].innerHTML.match(/[0-9]+/);
	myRow.finURL = 'http://brevets-patents.ic.gc.ca/opic-cipo/cpd/eng/patent/' 
		+ myRow.number + 
		'/financial_transactions.html';
	myRow.claimsURL = 'http://brevets-patents.ic.gc.ca/opic-cipo/cpd/eng/patent/'
		+ myRow.number +
		'/claims.html';
	myRow.status = 'unknown';
	myRow.agent = 'unknown';
	myRow.issued = 'unknown';
	myRow.filing = 'unknown';
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: myRow.url,
		onload: function(responseDetails) {
			refreshRow(myRow, responseDetails);
		}
	});

	return myRow;
}

function refreshRow(myRow, responseDetails) {
	//agent
	var agentRegExp = new RegExp('headers="agent"\>\n.+?>(.+)<','mi');
	var agentText = responseDetails.responseText.match(agentRegExp);
	myRow.agent = agentText[1];

	//issued
	var issuedRegExp = new RegExp('"issued".+?\n.+?(\\d{4}-\\d{2}-\\d{2})',"mi");
	var issuedDate = responseDetails.responseText.match(issuedRegExp);
	if (issuedDate) {
		myRow.issued = issuedDate[1];
	} else {
		myRow.issued = '-';
	}

	//filing
	var filingDateRE = new RegExp('"filingDate".+?\n.+?(\\d{4}-\\d{2}-\\d{2})',"mi");
	var filingDate = responseDetails.responseText.match(filingDateRE);
	if (filingDate) {
		myRow.filingDate = filingDate[1];
	}

	displayRow(myRow);
}

function xPathQuery(dom, query) {
	return document.evaluate(query, body, null, XPathResult.UNORDERED_NOTE_SNAPSHOT_TYPE, null);
}

function displayRow(myRow) {
	for (var i = 0; i < columns.length; i++) {
		//GM_log("Displaying row " + myRow.number + " with column " + columns[i]);
		if (myRow.htmlRow.cells[i] == undefined) {
			myRow.htmlRow.insertCell(-1);
		}
		if (columns[i] == 'Patent Number') {
			myRow.htmlRow.cells[i].innerHTML = 
				"<a href='" + myRow.url	+ "'>" + myRow.number + "</a> ("
				+ "<a href='" + myRow.finURL + "'>$</a> "
				+ "<a href='" + myRow.claimsURL + "'>C</a>)";
		} else if (columns[i] == 'Status') {
			myRow.htmlRow.cells[i].innerHTML = myRow.status;
		} else if (columns[i] == 'Issued') {
			myRow.htmlRow.cells[i].innerHTML = myRow.issued;
		} else if (columns[i] == 'Agent') {
			myRow.htmlRow.cells[i].innerHTML = myRow.agent;
		} else if (columns[i] == 'Filed') {
			myRow.htmlRow.cells[i].innerHTML = myRow.filingDate;
		}
	}
}