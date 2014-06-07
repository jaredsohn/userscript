// ==UserScript==
// Version         0.1 - 19/09/2008
// @name           M&S Mastercard to OFX/CSV
// @description    Exports Marks & Spencer Credit Card statement to OFX/CSV formats
// @namespace      vagabond
// @include        https://www*.marksandspencer.com/1/2/ServiceCentre/your-accounts/your-statements*
// @include        https://www*.marksandspencer.com/1/2/!ut/p/kcxml/*
// ==/UserScript==

//alert('Loading...');

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
	createButton('To OFX', function(e) { writeStatement(msStatementBuilder, ofxStatementFormatter); });
	createButton('To CSV', function(e) { writeStatement(msStatementBuilder, csvStatementFormatter); });
}

function createButton(title, listener) {
//	alert("Creating button: " + title);
	var buttonList = document.getElementById('ulv1').getElementsByTagName('form')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[0];
	var button = document.createElement('div');
	button.className = 'floatRight';
	var wrapper = document.createElement('div');
	wrapper.className = 'ctaThreeButtonLeft';
	button.appendChild(wrapper);
	wrapper = document.createElement('div');
	wrapper.className = 'ctaThreeButtonCentre';
	var link = document.createElement('a');
	link.title = title;
	link.href = '#';
	link.addEventListener('click', listener, false);
	link.innerHTML = title;
	wrapper.appendChild(link);
	button.appendChild(wrapper);
	wrapper = document.createElement('div');
	wrapper.className = 'ctaThreeButtonRight';
	button.appendChild(wrapper);
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


var msStatementBuilder = function() {
	statement = new Object();
	var mainForm = document.getElementById('ulv1').getElementsByTagName('form')[0];
	statement.accountId = mainForm.getElementsByTagName('p')[0].getElementsByTagName('span')[0].textContent;
	statement.currency = 'GBP';
	statement.endDate = new Date(mainForm.getElementsByTagName('div')[0].getElementsByTagName('table')[0].tBodies[0].rows[0].cells[1].textContent);
	statement.transactions = new Array();
	var dataTable = mainForm.getElementsByTagName('div')[0].getElementsByTagName('table')[1];
	for (i = 1; i < dataTable.tBodies[0].rows.length; i++) {
		row = dataTable.tBodies[0].rows[i];
//		alert('Processing row: ' + row);
		if (row.cells.length < 4) {
			continue;
		}
		var t = new Object();
		var dateString = trimString(row.cells[0].textContent);
//		alert('Date string: ' + dateString);
		if (dateString != null && dateString != '') {
			var dc = dateString.match(new RegExp(/\d+/g));
			t.date = new Date(dc[2], parseInt(dc[1], 10) - 1, dc[0]);
		} else {
			t.date = statement.endDate;
		}
//		alert('Date: ' + t.date);
		if (statement.startDate == null || statement.startDate > t.date) {
			statement.startDate = t.date;
//			alert('Start Date: ' + statement.startDate);
		}
		t.description = row.cells[1].textContent;
		var credit = parseAmount(row.cells[2]);
		var debit = parseAmount(row.cells[3]);
		t.amount = credit - debit;
		if (t.amount == 0 && t.description.match('FOREIGN CURRENCY')) {
			t = statement.transactions[statement.transactions.length - 1];
			t.memo = row.cells[1].textContent;
			t.origcurrency = new Object();
//			alert('Memo: ' + t.memo);
			var fxParts = t.memo.split(/\s+/);
//			alert('FX parts: ' + fxParts);
			t.origcurrency.symbol = fxParts[3];
			t.origcurrency.amount = parseFloat(fxParts[2]);
			t.origcurrency.rate = Math.abs(t.origcurrency.amount / t.amount);
		} else {
			t.reference = 'MS' + formatDateForOFX(t.date)  + (1000 + i);
	//		alert('Processing ' + prettyPrint(t));
			statement.transactions.push(t);
		}
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