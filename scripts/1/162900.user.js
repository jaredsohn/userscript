// ==UserScript==
// @name        Installs - Total
// @namespace   www.vsysop.co.uk
// @include     http://userstyles.org/users/14310
// @version     1
// ==/UserScript==

// count number of rows
var count = document.getElementsByTagName('tr').length;

var author_table = document.getElementsByClassName('author-styles')[0];

var total_installs = 0;
var this_week_installs = 0;

for (i=1;i<count;i++) {
var p = document.getElementsByTagName('tr')[i].childNodes[7].innerHTML;
var q = document.getElementsByTagName('tr')[i].childNodes[7];
var tw = document.getElementsByTagName('tr')[i].childNodes[5].innerHTML;
var twcell = document.getElementsByTagName('tr')[i].childNodes[5];
if (tw == 0)
{
twcell.style.color="#313131";
}
else if (tw != null)
{
twcell.style.color="green";
}
if (p == 0)
{
  q.style.color="#313131";
} else if (p != null) {
  total_number = Number(p.split(",").join(""));
  current_number = Number(tw.split(",").join(""));
  total_installs += total_number;
  this_week_installs += current_number;
  q.style.color="green";
}
}

// create table at bottom with results
var row=author_table.insertRow(-1);
var cell1=row.insertCell(0);
var cell2=row.insertCell(1);
var cell3=row.insertCell(2);
var cell4=row.insertCell(3);
var cell5=row.insertCell(4);
var cell6=row.insertCell(5);
var cell7=row.insertCell(6);
row.style.fontWeight = "bold";
cell1.innerHTML = "Totals";
cell2.innerHTML = "-";
cell3.innerHTML = this_week_installs;
  cell3.style.color = "green";
  cell3.style.textAlign = "right";
cell4.innerHTML = total_installs;
  cell4.style.color = "green";
  cell4.style.textAlign = "right";
cell5.innerHTML = "-";
  cell5.style.textAlign = "center";
cell6.innerHTML = "-";
  cell6.style.textAlign = "center";
cell7.innerHTML = "";