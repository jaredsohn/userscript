// ==UserScript==
// @name           Co-op to CSV
// @namespace      http://factorial.co.uk/coop2csv
// @description    UNOFFICIAL script to convert bank statements into CSV files
// @include        https://welcome6.co-operativebank.co.uk/CBIBSWeb/getDomesticStatementPage*
// @include			 https://welcome6.co-operativebank.co.uk/CBIBSWeb/paginateDomesticStatement*
// @include        https://welcome7.co-operativebank.co.uk/CBIBSWeb/getDomesticStatementPage*
// @include			 https://welcome7.co-operativebank.co.uk/CBIBSWeb/paginateDomesticStatement*
// ==/UserScript==
var trs = document.evaluate("//tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); 
var CSV = "";
var i = 0;
var j = 0;
var statsArrayCSV = new Array(25);
var statsArrayOFX = new Array(25);
var statsLineArray = new Array(5);
var statLine;
var date,transaction,deposit,withdrawal,balance;
var sortCode,accountNumber,statementDate, statementFrom, statementTo;
var transCount = 0;
var OFX;


sortCode = parseSortCode( trs.snapshotItem(19).childNodes[1].textContent ) ;
accountNumber = parseAccountNumber(trs.snapshotItem(19).childNodes[1].textContent);	
statementDate = parseDate(trs.snapshotItem(21).childNodes[3].textContent) ;







for (i = 25;trs.snapshotItem(i).childNodes.length == 11;i++)
{
		statLine = trs.snapshotItem(i).childNodes;
		date 			=	trimString(statLine[1].innerHTML) ;
		transaction	= trimString(statLine[3].innerHTML) ;
		deposit 		= trimString(statLine[5].innerHTML);
		withdrawal  = trimString(statLine[7].innerHTML) ;
		balance 		= trimString(statLine[9].innerHTML);

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
		
		if (balance == "&nbsp;")
		{
			balance ='';
		}
		else
		{
			balance = balance.substring(1);
			balance = fixBalance(balance);
			
		}
		
		statsLineArray[0] = date;
		statsLineArray[1] = transaction;
		statsLineArray[2] = deposit;
		statsLineArray[3] = withdrawal;
		statsLineArray[4] = balance;
		
		
		
		statsArrayOFX[i-25] = lineToOFX(date,deposit,withdrawal,transaction);
		CSV += date +","+ transaction +","+ deposit +","+ withdrawal +","+ balance + "\n";
		transCount++;
		
		if (i == 25)
		{
			statementFrom = date ;
		}
		
		if (trs.snapshotItem(i+1).childNodes.length != 11)
		{
			statementTo = date;
		}
}

OFX = header1XML(sortCode,accountNumber);
OFX += header2XML(statementFrom.substring(6,10)+statementFrom.substring(3,5)+statementFrom.substring(0,2)+"000000",statementTo.substring(6,10)+statementTo.substring(3,5)+statementTo.substring(0,2)+"000000");

for(i=1;i<transCount;i++)
{
	OFX += statsArrayOFX[i];
}

GM_log(OFX);

GM_log(CSV);


var trs1 = document.getElementsByTagName('tr');

var div = document.createElement('div');

div.appendChild((createButton1("", "","blah",80,15, 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAIAAAD8q9/YAAAA0klEQVR4nOVXQRKEMAgLO75V3sRr'+
'8eCKlpaO2qqH5kRThkkUcKR5njESJgAi8rWMl8DM0xZSh3qixB3KPAQVAPh9LeNtDGd4KnCiQNrk'+
'K2Ok6H57jFPothnWPndHY9yxzrQjM2wG8uAKVLxK4oS02IIooS/iljaTTBDdX7IxqD2LVb1W1389'+
'4UyFG4gNO4dm8jSI/6LrCS0VbiBraTN2nFK7cmlxq7eP3xMDjPLScjYiV9XBLqo8khYXyahCO4b7'+
'LA1neGvpiwspQvel2h002t/SAoQjXAfYBEnCAAAAAElFTkSuQmCC')),trs.snapshotItem(16).nextSibling);



div.appendChild((createButton2("", "","blah",80,15, 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAIAAAD8q9/YAAAA00lEQVR4nOVXQQ7EIAgcNn2rvInX'+
'soeurFqlTdX24JxgNITJgE0phICVsAEQkbfbeAjMvMWQBtQTJR5QZhJUAODzdhtPYznBW4UTBZIh'+
'31NjRLOj9i5ofBn2OS9SY4rUZ/pxEGwaUjGpKqbf0ZnaokvijLTYgtaFsag5fETh+ZlaxO7hmqPu'+
'x+FKhRu4tsNMmTxz2AXxv2nnQk+FGzg4bEpaBpq3rs/96zdjgVEf6UKDk7anutplSlpcJVsV+rHc'+
'Z2k5wXGkz16gixj7wMwArfa39AVuZlgZGDYq9gAAAABJRU5ErkJggg==')),trs.snapshotItem(16).nextSibling);

trs.snapshotItem(16).parentNode.insertBefore(div, trs.snapshotItem(16).nextSibling);






function createButton1(target, func, title, width, height, src) {
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

function createButton2(target, func, title, width, height, src) {
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



	function trimString(str) 
	{
		if(str.charAt(0) == " ")
		{  
		str = trimString(str.substring(1));
		}
		if (str.charAt(str.length-1) == " ")
		{  
			str = trimString(str.substring(0,str.length-1));
		}
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
		transactionXML += dep + withd;
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
		OpenWindow=window.open("", "newwin", "height=700, width=700,toolbar=no,menubar=yes");
		OpenWindow.document.open("text/plain", "replace");
		OpenWindow.document.write(OFX)
		OpenWindow.document.close();
   }

   function wCSV()
      {
   		OpenWindow=window.open("", "newwin", "height=700, width=700,toolbar=no,menubar=yes");
   		OpenWindow.document.open("text/plain", "replace");
   		OpenWindow.document.write(CSV)
   		OpenWindow.document.close();
      }