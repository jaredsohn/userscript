// ==UserScript==
// @name          Smile.co.uk to OXF
// @namespace     http://www.smile.co.uk/
// @description	  Unofficial script that opens a window on the printable stament page of smile.co.uk with OXF content for use on Wesabe or other products
// @author        Michael Campbell
// @homepage      http://www.campbellssource.com/
// @include       https://welcome23.smile.co.uk/SmileWeb/sidebar.do?action=printStatement*
// ==/UserScript==
// This script uses Joan Piedra's jQuery code http://joanpiedra.com/jquery/greasemonkey/
// it also copies a function or two from Chris b's http://userscripts.org/scripts/show/6976 who thanks Michael Vandercamp for (http://userscripts.org/scripts/show/3420)


var $;

// Add jQuery
//****************************
(function(){
  if (typeof unsafeWindow.jQuery == 'undefined') {
    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
    GM_JQ = document.createElement('script');

    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;

    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
  }
  GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery.noConflict(true);
    letsJQuery();
  }
}

// All your Greasemoney code must be inside this function
function letsJQuery() {

  //when it's ready
  $(document).ready(function() {
  
  //a few usefully functions
  //***************************************
      
    //Current date and time
    var dateTimeNow = new Date();

    //function used by DTSERVER to format the time correctly (uses dateTimeNow)
    function fixDate(_date){
    
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
    
    function formatSmileDate(date){
      var year = date.substring(7);
      var month = date.substring(4,6);
      var day = date.substring(0,3);
      var temp = year+month+day+"000000";
      //remove all white space (I don't know why there is whitespace here?)
      temp = temp.replace(/\s/g, "");
      return (temp);
    }
    
    //Grab a few specific details
    //********************************
    
    //Get sortcode (bankid)
    function sortCode(){
      var bankID = $('.printTable:eq(0) tr:eq(2) td:eq(1)').html();
      //remove the "-" from the sort code. Each line of code removes a '-' (I know, efficient)
      bankID = bankID.replace("-", "");
      bankID = bankID.replace("-", "");
      return bankID;
    }
    
    //get account number
    function accountNumber(){
      var accountNumber = $('.printTable:eq(0) tr:eq(1) td:eq(1)').html();
      return (accountNumber);
    }
    
    //get statement start timestamp (DTSTART)
    function statementStart(){
      var statementStart = $('.printTable:eq(1) tr:eq(1) td:eq(0)').html();
      statementStart = formatSmileDate(statementStart);
      return statementStart;
    }
    
    //get statement end timestamp
    function statementEnd(){
      var statementEnd = $('.printTable:eq(1) tr:last td:eq(0)').html();
      statementEnd = formatSmileDate(statementEnd);
      return statementEnd;
    }

    //get balance at the end of the statement
    function statementBalance(){
      var statementBalance = $('.printTable:eq(1) tr:last td:eq(4)').html();
      //remove whitespace
      var statementBalance = statementBalance.replace(/\s/g, "");;
      //get last carachter (i.e. + or -)
      var startC = statementBalance.length -1;
      var endC = statementBalance.length;
      var plusMinus = statementBalance.substring(startC, endC);
      //get value (without £, -, +)
      var finalStatementAmount = statementBalance.substring(1, startC);
      
      //if in the black(plus) or in the red(minus)
      if(plusMinus == "+"){ //plus
        ledgerBalance = finalStatementAmount;
      }else if(plusMinus == "-"){ //minus
        ledgerBalance = "-"+finalStatementAmount;
      }else{ //error
        alert("Error, could not format end balance")
      }
      return(ledgerBalance);
    }
    
    //Build the OFX
    //***************************************************************

    var ofxxml = '';
    
    ofxxml += "OFXHEADER:100"+"\n";
    ofxxml += "DATA:OFXSGML"+"\n";
    ofxxml += "VERSION:102"+"\n";
    ofxxml += "SECURITY:NONE"+"\n";
    ofxxml += "ENCODING:USASCII"+"\n";
    ofxxml += "CHARSET:1252"+"\n";
    ofxxml += "COMPRESSION:NONE"+"\n";
    ofxxml += "OLDFILEUID:NONE"+"\n";
    ofxxml += "NEWFILEUID:NONE"+"\n";

    ofxxml += "<OFX>"+"\n";
    ofxxml += "<SIGNONMSGSRSV1>"+"\n";
    ofxxml += "<SONRS>"+"\n";
    ofxxml += "<STATUS>"+"\n";
    ofxxml += "<CODE>0</CODE>"+"\n";
    ofxxml += "<SEVERITY>INFO</SEVERITY>"+"\n";
    ofxxml += "</STATUS>"+"\n";
    ofxxml += "<DTSERVER>"+fixDate(dateTimeNow)+"</DTSERVER>"+"\n";
    ofxxml += "<LANGUAGE>ENG</LANGUAGE>"+"\n";
    ofxxml += "<INTU.BID>01267"+"\n";
    ofxxml += "</SONRS>"+"\n";
    ofxxml += "</SIGNONMSGSRSV1>"+"\n";
    ofxxml += "<BANKMSGSRSV1>"+"\n";
    ofxxml += "<STMTTRNRS>"+"\n";
    ofxxml += "<TRNUID>1</TRNUID>"+"\n";
    ofxxml += "<STATUS>"+"\n";
    ofxxml += "<CODE>0</CODE>"+"\n";
    ofxxml += "<SEVERITY>INFO</SEVERITY>"+"\n";
    ofxxml += "</STATUS>"+"\n";
    ofxxml += "<STMTRS>"+"\n";
    ofxxml += "<CURDEF>GBP</CURDEF>"+"\n";
    ofxxml += "<BANKACCTFROM>"+"\n";
    ofxxml += "<BANKID>"+sortCode()+"</BANKID>"+"\n";
    ofxxml += "<ACCTID>"+sortCode()+accountNumber()+"</ACCTID>"+"\n";
    ofxxml += "<ACCTTYPE>CHECKING</ACCTTYPE>"+"\n";
    ofxxml += "</BANKACCTFROM>"+"\n";
    ofxxml += "<BANKTRANLIST>"+"\n";
    ofxxml += "<DTSTART>"+statementStart()+"</DTSTART>"+"\n";
    ofxxml += "<DTEND>"+statementEnd()+"</DTEND>"+"\n";
    
    // Statement rows
    /*******************************************
    This chunk of code gets all of the rows in the transaction table
    *******************************************/
    var row = 0;
    //for each tr in (the second) .printTable
    $('.printTable:eq(1) tr').each(function() {
      
      //skip the table header and the first row ("Brought Forward")
      if (row >= 2){
        var transactionAmount;
        var transactionUniqueID;
        
        //get transaction name
        var transaction = $(this).find(".summaryDetailL").html();
        //remove html ampersands from transaction name
        transaction = transaction.replace("&amp;", "&");
        //remove html ampersands from transaction name
        transaction = transaction.replace("&nbsp;", " ");
        
        //get transaction date
        var date = $(this).find(".summaryDetailC").html();
        //reformat the date for OXF (yyyymmddhhmmss)
        date = formatSmileDate(date);
        
        //get money in and money values
        var moneyIn = $(this).find(".summaryDetailR:eq(0)").html().replace(/\s/g, "");
        var moneyOut = $(this).find(".summaryDetailR:eq(1)").html().replace(/\s/g, "");
        //detect if it is an incoming or out going transaction by looking for the &nbsp;
        if(moneyIn == "&nbsp;"){ //money out
          transactionAmount = moneyOut.substring(1); //removes leading pound sign
          transactionAmount = "-"+transactionAmount; //includes a minus sign inform of the transaction amount
        }else{ //money in
          transactionAmount = moneyIn.substring(1); //removes leading pound sign
        }
        
        //Create an FITID. An FITID is ment to be issued by the bank and is a unique id for each transaction...
        //However, in this case we have to invent one. I've simply used the date with the row number added at the end.
        //this is only likely to be a problem if you have more than 26 identical transactions on the same day.
        fitid = date+row;
        //remove all white spaces
        fitid = fitid.replace(/\s/g, "");
        
        //put it all together
        ofxxml += "<STMTTRN>"+"\n";
        ofxxml += "<TRNTYPE>OTHER</TRNTYPE>"+"\n";
        ofxxml += "<DTPOSTED>"+date+"</DTPOSTED>"+"\n";
        ofxxml += "<TRNAMT>"+transactionAmount+"</TRNAMT>"+"\n";
        ofxxml += "<FITID>"+fitid+"</FITID>"+"\n";
        ofxxml += "<NAME>"+transaction+"</NAME>"+"\n";
        ofxxml += "<MEMO></MEMO>"+"\n";
        ofxxml += "</STMTTRN>"+"\n";    
      }
      row ++;
    }); //end each table row
    
    ofxxml += "</BANKTRANLIST>"+"\n";
    ofxxml += "<LEDGERBAL>"+"\n";
    ofxxml += "<BALAMT>"+statementBalance()+"</BALAMT>"+"\n";
    ofxxml += "<DTASOF>"+statementEnd()+"</DTASOF>"+"\n";
    ofxxml += "</LEDGERBAL>"+"\n";
    ofxxml += "</STMTRS>"+"\n";
    ofxxml += "</STMTTRNRS>"+"\n";
    ofxxml += "</BANKMSGSRSV1>"+"\n";
    ofxxml += "</OFX>"+"\n";
    
    OpenWindow=window.open("", "newwin", "height=700, width=500,resizable=yes,scrollbars=yes,toolbar=no,menubar=yes");
    OpenWindow.document.open("text/plain", "replace");
    OpenWindow.document.write(ofxxml)
    OpenWindow.document.close();
    
  }); //end document ready


}