// ==UserScript==
// @name           mint.com Net Total
// @description    Shows net total on Transactions tab.
// @include        https://wwws.mint.com/transaction.event*
// ==/UserScript==

window.addEventListener('load', function() {

    //add commas between every 3 digits
    var add_commas = function(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while(rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    //add "Net Total" header 
    var totalTable = document.getElementById('account-table-all-bank');
    var tableHeaders = totalTable.firstChild;
    var tableHeadersArray = tableHeaders.getElementsByTagName('th');
    tableHeadersArray[2].innerHTML = 'Net Total';

    //add net total amount
    var tableValues = tableHeaders.nextSibling;
    var tableValuesArray = tableValues.getElementsByTagName('td');
    tableValuesArray[0].className = 'money';
    tableValuesArray[1].removeAttribute('colspan');
    var totalCash = tableValuesArray[0].innerHTML.replace('$', '');
    totalCash = totalCash.replace(',', '');
    var totalDebt = tableValuesArray[1].innerHTML.replace(',', '');
    totalDebt = totalDebt.substring(2);
    var netTotal = document.createElement('td');
    netTotal.className = 'money large positive';
    netTotal.innerHTML = '$' + add_commas((new Number(totalCash) - new Number(totalDebt)).toFixed(2));
    netTotal.setAttribute('colspan', '3');
    tableValues.appendChild(netTotal);

}, true);
