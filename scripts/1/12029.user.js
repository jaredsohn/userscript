// A Neptunban osszeadja a felvett krediteket a Tagyak/Aktualis targyak menupont alatt
//
// ==UserScript==
// @name          Neptun kredit sum
// @namespace     http://diveintogreasemonkey.org/download/
// @description   A Neptunban osszeadja a felvett krediteket
// @include       *hallgatoi/main.aspx?ctrl=04*
// @author	  Kovianyo
// ==/UserScript==


function log(line)
{
/*
var curdate = new Date();
var times = curdate.toGMTString();

GM_log("\n" + times + ";  " + line);
*/
}

function getXPath( xpath, root)
{
return document.evaluate(
    xpath,
    root,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
}

var allElements, thisElement;
var sum = 0;

allElements = getXPath("//table[@id='subjects_gridSubjects_DataGrid1']/tbody/tr", document);

log("sorok: " + allElements.snapshotLength);
for (var i = 0; i < allElements.snapshotLength; i++) {
  if (i!=0)
  {
//  log("sor: " + i);

  thisElement = allElements.snapshotItem(i);
  var tds;
  tds = getXPath("td", thisElement);
//  log("tds: " + tds.snapshotLength);
  
  var kredit = tds.snapshotItem(2).innerHTML;
  sum += parseInt(kredit);
  log("kredit: " + kredit);
  }
}

log("sum: " + sum);

var sor = document.createElement("tr");
//sor.innerHTML = 'Sum: ' + sum;

var leiras = document.createElement("td");
leiras.innerHTML = "Sum";
sor.appendChild(leiras);

sor.appendChild(document.createElement("td"));

var td = document.createElement("td");
td.innerHTML = sum;
sor.appendChild(td);


sor.appendChild(document.createElement("td"));
sor.appendChild(document.createElement("td"));

var tbody = getXPath("//table[@id='subjects_gridSubjects_DataGrid1']/tbody", document).snapshotItem(0);
tbody.appendChild(sor);
