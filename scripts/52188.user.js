// ==UserScript==
// @name           sum chase amounts
// @namespace      userscripts.org
// @include        https://cards.chase.com/Account/AccountActivity.aspx*
// ==/UserScript==

var t=document.getElementById('ActivityGrid');
totalSales=0;
totalPayments=0;
i=1;
for(i=1;i<t.rows.length;i++) {
  if(t.rows[i].cells.length==6) { // not every row is an activity row, need to check
    a=parseFloat(t.rows[i].cells[5].innerHTML.substring(1));
    if(a>0)
      totalSales += a;
    else
      totalPayments += a;
  }
}
total = totalSales+totalPayments;
blackString = '$'+Math.round(totalSales*100)/100;
redString = '$'+Math.round(totalPayments*100)/100;
totalString = '$'+Math.round(total*100)/100;

t.insertRow(i);
t.rows[i].insertCell(0); t.rows[i].cells[0].innerHTML='-';
t.rows[i].insertCell(1); t.rows[i].cells[1].innerHTML='-';
t.rows[i].insertCell(2); t.rows[i].cells[2].innerHTML='-';
t.rows[i].insertCell(3); t.rows[i].cells[3].innerHTML='-';
t.rows[i].insertCell(4); t.rows[i].cells[4].innerHTML='total sales';
t.rows[i].insertCell(5); t.rows[i].cells[5].innerHTML = blackString;

i++;
t.insertRow(i);
t.rows[i].insertCell(0); t.rows[i].cells[0].innerHTML='-';
t.rows[i].insertCell(1); t.rows[i].cells[1].innerHTML='-';
t.rows[i].insertCell(2); t.rows[i].cells[2].innerHTML='-';
t.rows[i].insertCell(3); t.rows[i].cells[3].innerHTML='-';
t.rows[i].insertCell(4); t.rows[i].cells[4].innerHTML='total payments';
t.rows[i].insertCell(5); t.rows[i].cells[5].innerHTML=redString;

i++;
t.insertRow(i);
t.rows[i].insertCell(0); t.rows[i].cells[0].innerHTML='-';
t.rows[i].insertCell(1); t.rows[i].cells[1].innerHTML='-';
t.rows[i].insertCell(2); t.rows[i].cells[2].innerHTML='-';
t.rows[i].insertCell(3); t.rows[i].cells[3].innerHTML='-';
t.rows[i].insertCell(4); t.rows[i].cells[4].innerHTML='total';
t.rows[i].insertCell(5); t.rows[i].cells[5].innerHTML=totalString;