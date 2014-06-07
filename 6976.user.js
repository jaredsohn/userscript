// ==UserScript==
// Version: 4.1 - 30/06/2007
// @name            Co-op/Smile to OFX
// @description    	UNOFFICIAL script to convert co-op and smile bank statements and co-op credit card statements into CSV and OFX files
// @namespace		http://userscripts.org/scripts/show/6976
// @include         https://welcome22.smile.co.uk/SmileWeb/getDomesticStatementPage.do*
// @include         https://welcome22.smile.co.uk/SmileWeb/paginateDomesticStatement.do*
// @include         https://welcome23.smile.co.uk/SmileWeb/getDomesticStatementPage.do*
// @include         https://welcome23.smile.co.uk/SmileWeb/paginateDomesticStatement.do*
// @include         https://welcome26.co-operativebank.co.uk/CBIBSWeb/domesticRecentItems*
// @include         https://welcome26.co-operativebank.co.uk/CBIBSWeb/balances.do*
// @include         https://welcome26.co-operativebank.co.uk/CBIBSWeb/getDomesticStatementPage.do*
// @include         https://welcome26.co-operativebank.co.uk/CBIBSWeb/paginateDomesticStatement.do*
// @include         https://welcome26.co-operativebank.co.uk/CBIBSWeb/getVisaStatementPage.do*
// @include         https://welcome26.co-operativebank.co.uk/CBIBSWeb/visaStatement.do*
// @include         https://welcome27.co-operativebank.co.uk/CBIBSWeb/domesticRecentItems*
// @include         https://welcome27.co-operativebank.co.uk/CBIBSWeb/balances.do*
// @include         https://welcome27.co-operativebank.co.uk/CBIBSWeb/getDomesticStatementPage.do*
// @include         https://welcome27.co-operativebank.co.uk/CBIBSWeb/paginateDomesticStatement.do*
// @include         https://welcome27.co-operativebank.co.uk/CBIBSWeb/getVisaStatementPage.do*
// @include         https://welcome27.co-operativebank.co.uk/CBIBSWeb/visaStatements.do*
// ==/UserScript==
//N.B. Many thanks to Michael Vandercamp on who's script (http://userscripts.org/scripts/show/3420) this is heavily based

var trs = document.evaluate("//tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
var CSV = "";
var i = 0;
var j = 0;
var statsArrayCSV = new Array(25);
var statsArrayOFX = new Array(25);
var statLine;
var date,transaction,deposit,withdrawal,balance;
var sortCode,accountNumber,statementDate, statementFrom, statementTo;
var transCount = 0;
var OFX;
var startRow;
var buttonRow;
var windowURL = window.location.href;
var noBalance = new Boolean(false);
var tableWidth = 11;

if (windowURL.indexOf("smile.co.uk") > 0) 
{
	startRow = 35;
	buttonRow = 31;
	sortCode = trs.snapshotItem(22).childNodes[3].textContent;
	accountNumber = trs.snapshotItem(21).childNodes[3].textContent;	
	statementDate = parseDate(trs.snapshotItem(24).childNodes[3].textContent);

} else if (windowURL.indexOf("co-operativebank.co.uk") > 0)
{
	if (windowURL.toLowerCase().indexOf("visastatement") > 0)
	{
		startRow = 30;
		buttonRow = 26;
		
		//first page is different
		if (windowURL.indexOf("visaPage=1") > 0 || windowURL.indexOf("visaStatements.do") > 0) 
		{
			startRow = 35;
			buttonRow = 30;
		}
		
		tableWidth = 9;
		sortCode = "";
		accountNumber = parseCreditCardNumber(document.getElementsByTagName("TABLE")[7].rows[1].cells[0].innerHTML);
		statementDate = parseDate(document.getElementsByTagName("TABLE")[9].rows[0].cells[1].innerHTML);
		noBalance = new Boolean(true);
	} 
	// current live bank statement
	else if (windowURL.indexOf("balances") > 0 || windowURL.indexOf("domesticRecentItems") > 0) 
	{
		tableWidth = 9;
		startRow = 25;
		buttonRow = 21;
		sortCode = parseSortCode(trs.snapshotItem(19).childNodes[1].textContent);
		accountNumber = parseAccountNumber(trs.snapshotItem(19).childNodes[1].textContent);
		var dateTimeNow = new Date();
		statementDate = fixDate(dateTimeNow)
		noBalance = new Boolean(true);

	} else
	{
		startRow = 26;
		buttonRow = 21;
		sortCode = parseSortCode(trs.snapshotItem(19).childNodes[1].textContent);
		accountNumber = parseAccountNumber(trs.snapshotItem(19).childNodes[1].textContent);
		statementDate = parseDate(trs.snapshotItem(21).childNodes[3].textContent);
	}
}


for (i = startRow;trs.snapshotItem(i).childNodes.length == tableWidth;i++)
{
	transCount++;
	statLine = trs.snapshotItem(i).childNodes;
	date = trimString(statLine[1].textContent) ;
	// skip lines with no dates
	if (date == '') {
		continue;
	}
 	transaction	= trimString(statLine[3].textContent) ;
	deposit = trimString(statLine[5].textContent);
	withdrawal = trimString(statLine[7].textContent) ;

	if (deposit == "&nbsp;")
	{
		deposit = '';
	}
	else
	{
		deposit = deposit.substring(1);
	}
	
	if (withdrawal == "&nbsp;")
	{
		withdrawal = '';
	}
	else
	{
		withdrawal = withdrawal.substring(1);
	}
	
	if (noBalance == true)
	{
		balance = '';
	} else	{
		balance = trimString(statLine[9].textContent);
		if (balance == "&nbsp;")
		{
			balance ='';
		}
		else
		{
			balance = balance.substring(1);
			balance = fixBalance(balance);
		
		}
	}
	
//alert(transCount+", "+date+", "+transaction+", "+deposit+", "+withdrawal);	
	statsArrayOFX[transCount] = lineToOFX(date,deposit,withdrawal*-1,transaction);
	CSV += date +","+ transaction +","+ deposit +","+ withdrawal +","+ balance + "\n";
	
	if (i == startRow)
	{
		statementFrom = date ;
	}
	
	statementTo = date;

}

OFX = header1XML(sortCode,accountNumber);
OFX += header2XML(statementFrom.substring(6,10)+statementFrom.substring(3,5)+statementFrom.substring(0,2)+"000000",statementTo.substring(6,10)+statementTo.substring(3,5)+statementTo.substring(0,2)+"000000");

for(i=1;i<=transCount;i++)
{
	OFX += statsArrayOFX[i];
}

GM_log(OFX);

GM_log(CSV);


var trs1 = document.getElementsByTagName('tr');

var div = document.createElement('div');

div.appendChild((createCSVButton("", "","CSV data",80,15, 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAIAAAD8q9/YAAAA0klEQVR4nOVXQRKEMAgLO75V3sRr'+
'8eCKlpaO2qqH5kRThkkUcKR5njESJgAi8rWMl8DM0xZSh3qixB3KPAQVAPh9LeNtDGd4KnCiQNrk'+
'K2Ok6H57jFPothnWPndHY9yxzrQjM2wG8uAKVLxK4oS02IIooS/iljaTTBDdX7IxqD2LVb1W1389'+
'4UyFG4gNO4dm8jSI/6LrCS0VbiBraTN2nFK7cmlxq7eP3xMDjPLScjYiV9XBLqo8khYXyahCO4b7'+
'LA1neGvpiwspQvel2h002t/SAoQjXAfYBEnCAAAAAElFTkSuQmCC')),trs.snapshotItem(buttonRow).nextSibling);



div.appendChild((createOFXButton("", "","OFX data",80,15, 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAIAAAD8q9/YAAAA00lEQVR4nOVXQQ7EIAgcNn2rvInX'+
'soeurFqlTdX24JxgNITJgE0phICVsAEQkbfbeAjMvMWQBtQTJR5QZhJUAODzdhtPYznBW4UTBZIh'+
'31NjRLOj9i5ofBn2OS9SY4rUZ/pxEGwaUjGpKqbf0ZnaokvijLTYgtaFsag5fETh+ZlaxO7hmqPu'+
'x+FKhRu4tsNMmTxz2AXxv2nnQk+FGzg4bEpaBpq3rs/96zdjgVEf6UKDk7anutplSlpcJVsV+rHc'+
'Z2k5wXGkz16gixj7wMwArfa39AVuZlgZGDYq9gAAAABJRU5ErkJggg==')),trs.snapshotItem(buttonRow).nextSibling);

trs.snapshotItem(buttonRow).parentNode.insertBefore(div, trs.snapshotItem(buttonRow).nextSibling);


function createCSVButton(target, func, title, width, height, src) {
    var img, button;
    img = document.createElement('img');
    img.width = width;
    img.height = height;

    img.src = src;
    button = document.createElement('a');
    button._target = target;
    button.title = title;
    button.href = '#';
   
    button.appendChild(img);
	
	button.addEventListener('click',
                           function(e) { wCSV() ; },
                           false);
    return button;
}


function createOFXButton(target, func, title, width, height, src) {
    var img, button;
    img = document.createElement('img');
    img.width = width;
    img.height = height;

    img.src = src;
    button = document.createElement('a');
    button._target = target;
    button.title = title;
    button.href = '#';
   
    button.appendChild(img);
	
	button.addEventListener('click',
                           function(e) { wOFX() ; },
                           false);
    return button;
}


// trim whitespace at the beginning, end and multiple occurences in the middle
function trimString(str) 
{
	str = str.replace(new RegExp(/^\s+/),""); // START WHITESPACES
	str = str.replace(new RegExp(/\s+$/),""); // END WHITESPACES
	str = str.replace(new RegExp(/\s+\s+/g)," "); // MIDDLE MULTIPLE WHITESPACES
	return str;
}


function fixBalance(balanceIn)
{
	var balanceSplit = new Array();
	balanceSplit = balanceIn.split(' ');
	
	if (balanceSplit[1] == 'DR')
	{
		return (balanceSplit[0] * -1);
	
	}
	else 
	{
		return balanceSplit[0];
	}

}


function lineToOFX(dateIN,dep,withd,trans)
{
	var transactionXML = '';
	
	transactionXML += '<STMTTRN>' + "\n";
	
	transactionXML += '<TRNTYPE>';
	if (dep != '')
	{
		transactionXML += 'CREDIT';
	}
	else if ( withd != '')
	{
		transactionXML += 'DEBIT';
	}
	transactionXML += '</TRNTYPE>';
	transactionXML += "\n";
	
	transactionXML += '<DTPOSTED>';
	transactionXML += dateIN.substring(6,10) + dateIN.substring(3,5) + dateIN.substring(0,2) + '000000';
	transactionXML += '</DTPOSTED>';
	transactionXML += "\n";
	
	transactionXML += '<TRNAMT>';
	var amount = new Number(dep + withd);
	transactionXML += amount.toFixed(2);
	transactionXML += '</TRNAMT>';
	transactionXML += "\n";
	
	transactionXML += '<FITID>';
	transactionXML += dateIN.substring(6,10) + dateIN.substring(3,5) + dateIN.substring(0,2) + '000000';
	transactionXML += '</FITID>';
	transactionXML += "\n";
	
	transactionXML += '<NAME>';
	transactionXML += trans;
	transactionXML += '</NAME>';
	transactionXML += "\n";
	
	transactionXML += '<MEMO>';
	transactionXML += trans;
	transactionXML += '</MEMO>';
	transactionXML += "\n";
	
	transactionXML += '</STMTTRN>' + "\n";
	
	return transactionXML;
}


function parseSortCode(str)
{
	var _sortCode = str.match(  (/\d\d-\d\d-\d\d/ ))
	return _sortCode[0];
	
}


function parseAccountNumber(str)
{
	var _accountNumber = str.match(  (/\d\d\d\d\d\d\d\d/ ) )
	return _accountNumber[0];
	
}


function parseCreditCardNumber(str)
{
	var _accountNumber = str.match(  (/\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d/ ) )
	return _accountNumber[0];
	
}


function parseDate(str)
{
	var _statementDate = str.match( ( /\d\d\/\d\d\/\d\d\d\d/  ) )
	return _statementDate[0];
}


function header1XML(_sortCode,_accountNumber)
{
	
	var dateTimeNow = new Date();
	
	var headerXML = ''
	headerXML += "OFXHEADER:100\nDATA:OFXSGML\nVERSION:102\nSECURITY:NONE\nENCODING:USASCII\nCHARSET:1252\nCOMPRESSION:NONE\nOLDFILEUID:NONE\nNEWFILEUID:NONE\n\n";
	headerXML += "<OFX>\n<SIGNONMSGSRSV1>\n<SONRS>\n<STATUS>\n<CODE>0</CODE>\n<SEVERITY>INFO</SEVERITY>\n</STATUS>";
	headerXML += "<DTSERVER>" + fixDate(dateTimeNow) +"</DTSERVER>\n";
	headerXML += "<LANGUAGE>ENG</LANGUAGE>\n</SONRS>\n</SIGNONMSGSRSV1>\n";
	headerXML += "<BANKMSGSRSV1>\n<STMTTRNRS><TRNUID>1</TRNUID>\n";
	headerXML += "<STATUS><CODE>0</CODE><SEVERITY>INFO</SEVERITY></STATUS>\n";
	headerXML += "<STMTRS><CURDEF>GBP</CURDEF><BANKACCTFROM><BANKID>";
	headerXML += _sortCode;
	headerXML += "</BANKID><ACCTID>";
	headerXML += _accountNumber;
	headerXML += "</ACCTID><ACCTTYPE>CHECKING</ACCTTYPE>\n</BANKACCTFROM>\n\n";
	
	return headerXML;
}


function fixDate(_date)
{
	
	var temp,_year,_month,_day,_hour,_minute,_second;
			
	_year = _date.getFullYear();
	_month = _date.getMonth() + 1;
	_day = _date.getDate();
	_hour = _date.getHours();
	_minute = _date.getMinutes();
	_second = _date.getSeconds();
	
	temp =  _year;
	temp += ((_month < 10) ? "0" : "") + _month;
	temp += ((_day < 10) ? "0" : "") + _day;
	temp += ((_hour < 10) ? "0" : "") + _hour;
	temp += ((_minute < 10) ? "0" : "") + _minute;
	temp += ((_second < 10) ? "0" : "") + _second;
	return temp;
}


function header2XML(_start,_end)
{
	var headerXML ='';
	headerXML += "<BANKTRANLIST>\n<DTSTART>";
	headerXML += _start;
	headerXML += "</DTSTART><DTEND>";
	headerXML += _end;
	headerXML += "</DTEND>\n";
	
	return headerXML;
}


function wOFX()
{
	OpenWindow=window.open("", "newwin", "height=700, width=500,resizable=yes,scrollbars=yes,toolbar=no,menubar=yes");
	OpenWindow.document.open("text/plain", "replace");
	OpenWindow.document.write(OFX)
	OpenWindow.document.close();
}


function wCSV()
{
	OpenWindow=window.open("", "newwin", "height=700, width=500,resizable=yes,scrollbars=yes,toolbar=no,menubar=yes");
	OpenWindow.document.open("text/plain", "replace");
	OpenWindow.document.write(CSV)
	OpenWindow.document.close();
}
