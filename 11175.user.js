/*
Wesabe total balance greasemonkey script
version 0.1 - last updated 2007-08-05
matiaspelenur@gmail.com

Released under The MIT License

Copyright (c) 2007 Matias Pelenur

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

// ==UserScript==
// @name           Wesabe total balance
// @namespace      http://matiaspelenur.com/greasemonkey
// @description    Adds the total balance to the Wesabe accounts index page
// @include        https://www.wesabe.com/accounts
// @include        https://www.wesabe.com/accounts/index
// ==/UserScript==

// begin closure
(function() {

  // from http://diveintogreasemonkey.org/patterns/match-attribute.html
  function xpath(query) {      return document.evaluate(query, document, null,          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);  }	
  
  // from http://www.mredkj.com/javascript/numberFormat.html
  function addCommas(nStr) {   	x = nStr.split('.');   	x1 = x[0];   	x2 = x.length > 1 ? '.' + x[1] : '';   	var rgx = /(\d+)(\d{3})/;   	while (rgx.test(x1)) {   		x1 = x1.replace(rgx, '$1' + ',' + '$2');   	}   	return x1 + x2;  }
  
  function getTotalBalance() {
    var balances = xpath("//td[@class='balance']/span//text()");
    
    var totalBalance = 0.0;
    for (var i=0; i<balances.snapshotLength; i++) {
      var balance = parseFloat(balances.snapshotItem(i).textContent.replace(/\$|,/g,'')); 
      totalBalance += balance;
    }
  
    return totalBalance;
  }
  
  // main script
  var totalBalance = getTotalBalance().toFixed(2);
  var totalBalanceHtml = '<span style="color:';
  if (totalBalance > 0) {
    totalBalanceHtml += 'green">$' + addCommas(totalBalance);
  } else {
    totalBalanceHtml += 'red">' + addCommas(totalBalance).replace('-','-$'); 
  }
  totalBalanceHtml += '</span>';
  
  var table = document.getElementById('accounts');
  var totalBalanceRow = table.insertRow(1); 
  totalBalanceRow.id = 'accounts_total_balance';
  totalBalanceRow.innerHTML = 
   "<td class='account'><span class='account_name'>Total Balance</span>"+
   "<div class='unedited_untagged'>&nbsp;</div></td>"+
   "<td class='balance'>" + totalBalanceHtml + "</td><td class='balance_date'>&nbsp;</td>";
    
})();  // end closure