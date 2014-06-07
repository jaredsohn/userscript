// ==UserScript==
// Version         0.2 - 19/09/2008
// @name           Wizard Clear Advantage to OFX/CSV
// @namespace      vagabond
// @description    Exports Wizard Clear Advantage Credit Card statement to OFX/CSV formats
// @include        https://service.gemoney.com.au/*?page=trans-hist*
// ==/UserScript==
//N.B. Many thanks to Chris B. whose script (http://userscripts.org/scripts/show/6976) inspired me to write this one and has also been a source of shameless copy-paste.

var statement;
var busy = false;
var initialised = false;

function init() {
	if (initialised) return;
	initialised = true;
//	alert("Initialising...");
	createControls();
}


function createControls() {
	createButton('Export to OFX', function(e) { writeStatement(caStatementBuilder, ofxStatementFormatter); });
	createButton('Export to CSV', function(e) { writeStatement(caStatementBuilder, csvStatementFormatter); });
}

function createButton(title, listener) {
//	alert("Creating button: " + title);
	var optsBox = document.getElementById('optsbox');
	var buttonList = optsBox.getElementsByTagName('ul')[0];
	var button = document.createElement('li');
	var link = document.createElement('a');
	link.title = title;
	link.href = '#';
	link.addEventListener('click', listener, false);
	link.innerHTML = title;
	button.appendChild(link);
	buttonList.appendChild(button);
}

function writeStatement(builder, formatter) {
//	alert('Click');
	if (busy == true) return;
	busy = true;
	if (statement == null) {
//		alert('Building statement');
		builder();
	}
//	alert('Formatting OFX');
	var text = formatter();
	OpenWindow=window.open("", "newwin", "height=700, width=500,resizable=yes,scrollbars=yes,toolbar=no,menubar=yes");
	OpenWindow.document.open("text/plain", "replace");
	OpenWindow.document.write(text)
	OpenWindow.document.close();
	busy = false;
}

var caStatementBuilder = function() {
	statement = new Object();
	statement.accountId = 'Wizard CA ' + document.getElementById('main').getElementsByTagName('div')[0].getElementsByTagName('p')[1].textContent.match(new RegExp(/\d{4}/))[0];
	statement.currency = 'AUD';
	var tables = document.getElementById('main').getElementsByTagName('table');
	var dataTable = tables[tables.length - 1];
	var tranMap = new Object();
	for (i = 1; i < dataTable.tBodies[0].rows.length; i++) {
		row = dataTable.tBodies[0].rows[i];
//		alert('Processing row: ' + row);
		var tranId = row.cells[2].textContent;
		var t = tranMap[tranId];
		if (!t) {
//			alert('Creating new transaction: ' + tranId);
			t = new Object();
			tranMap[tranId] = t;
			t.reference = tranId;
			t.date = new Date(trimString(row.cells[0].textContent));
			t.memo = trimString(row.cells[1].textContent);
		}
		var amount = row.cells[4].textContent.slice(1);
		if (amount == '0.00') {
			t.origcurrency = new Object();
			var foreignData = trimString(row.cells[3].textContent).split(' ');
			t.origcurrency.amount = parseFloat(foreignData[0].replace(',', '', 'g'));
			t.origcurrency.symbol = foreignData[1];
			t.memo += '. ' + trimString(row.cells[3].textContent);
		} else {
			amount = amount.replace(',', '', 'g');
			if (amount.substr(-2) == 'CR') {
				amount = amount.substring(0, amount.length - 2);
				t.amount = -parseFloat(amount);
			} else {
				t.amount = parseFloat(amount);
			}
			t.description = trimString(row.cells[3].textContent);
			if (t.amount != null && t.origcurrency != null) {
				t.origcurrency.rate = Math.abs(t.origcurrency.amount / t.amount);
			}
		}
		if (statement.startDate == null || statement.startDate > t.date) {
			statement.startDate = t.date;
		}
		if (statement.endDate == null || statement.endDate < t.date) {
			statement.endDate = t.date;
		}
	}
	statement.transactions = new Array();
	for each (var t in tranMap) {
		statement.transactions.push(t);
	}
}



var ofxStatementFormatter = function() {
	var OFX = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
	OFX += '<?OFX OFXHEADER="200" VERSION="211" SECURITY="NONE" OLDFILEUID="NONE" NEWFILEUID="NONE"?>\n';
	OFX += '<OFX>\n';
	OFX += '<SIGNONMSGSRSV1><SONRS>'
		+ '<STATUS><CODE>0</CODE><SEVERITY>INFO</SEVERITY></STATUS>'
		+ '<DTSERVER>' + formatDateForOFX(new Date()) + '</DTSERVER>'
		+ '<LANGUAGE>ENG</LANGUAGE></SONRS></SIGNONMSGSRSV1>\n';
	OFX += '<CCSTMTTRNRS><TRNUID>0</TRNUID>'
		+ '<STATUS><CODE>0</CODE><SEVERITY>INFO</SEVERITY></STATUS>'
		+ '<CCSTMTRS>'
		+ '<CURDEF>' + statement.currency + '</CURDEF>'
		+ '<CCACCTFROM><ACCTID>' + statement.accountId + '</ACCTID></CCACCTFROM>'
		+ '<BANKTRANLIST>'
		+ '<DTSTART>' + formatDateForOFX(statement.startDate) + '</DTSTART>'
		+ '<DTEND>' + formatDateForOFX(statement.endDate) + '</DTEND>\n';

	for (i = 0; i < statement.transactions.length; i++) {
		var t = statement.transactions[i];
		OFX += ofxTransactionFormatter(t);
	}
	OFX += '</BANKTRANLIST></CCSTMTRS></CCSTMTTRNRS>';
	OFX += '</OFX>';
	return OFX;
}

var ofxTransactionFormatter = function(t) {
	var result = 
		tag('STMTTRN',
			  tag('TRNTYPE', t.amount > 0 ? 'CREDIT' : 'DEBIT')
			+ tag('DTPOSTED', formatDateForOFX(t.date))
			+ tag('TRNAMT', t.amount)
			+ tag('FITID', t.reference)
			+ tag('NAME', t.description)
			+ (t.memo ? tag('MEMO', t.memo) : '')
			+ (t.origcurrency ? tag('ORIGCURRENCY', tag('CURRATE', t.origcurrency.rate) + tag('CURSYM', t.origcurrency.symbol)) : '')
		) + '\n';
	return result;
}

var csvStatementFormatter = function() {
	var CSV = "date,refnumber,description,credit,debit,foreign currency,foreign amount, FX rate\n";
	for (i = 0; i < statement.transactions.length; i++) {
		var t = statement.transactions[i];
		CSV += formatDateForCSV(t.date) + ',' + t.reference + ',"' + t.description + '",' + (t.amount > 0 ? t.amount : '') + ',' + (t.amount < 0 ? -t.amount : '');
		if (t.origcurrency) {
			CSV += ', ' + t.origcurrency.symbol + ', ' + t.origcurrency.amount + ', ' + t.origcurrency.rate;
		}
		CSV += '\n';
	}
	return CSV;
}

function tag(name, body) {
	return '<' + name + '>' + body + '</' + name + '>';
}


// trim whitespace at the beginning, end and multiple occurences in the middle
function trimString(str) 
{
	str = str.replace(new RegExp(/^\s+/),""); // START WHITESPACES
	str = str.replace(new RegExp(/\s+$/),""); // END WHITESPACES
	str = str.replace(new RegExp(/\s+\s+/g)," "); // MIDDLE MULTIPLE WHITESPACES
	return str;
}

function prettyPrint(t) {
	var result = 'Transaction[';
	for (var prop in t) {
		result += prop + ': ' + t[prop] + ', ';
	}
	result += ']';
	return result;
}

function formatDateForCSV(d) {
	var result = d.toLocaleFormat('%d/%m/%Y');
	return result;
}

function formatDateForOFX(d) {
	if (d == null) return null;
	var result = d.toLocaleFormat('%Y%m%d%H%M%S');
	return result;
}

function parseAmount(element) {
	var text = element.textContent;
	if (text == null) return null;
	var matches = text.match(new RegExp(/\d*\.\d*/));
	if (matches == null) return null;
	text = matches[0];
	var value = parseFloat(text);
	value = value ? value : 0;
	return value;
}

init();