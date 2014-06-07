// ==UserScript==
// @name           tiscali megs
// @namespace      znerp
// @description    converts bytes into megabytes for tiscali internet usage page.
// @include        https://ecare.tiscali.co.uk/*
// ==/UserScript==

var scriptsTable = document.getElementsByTagName("table")[0];
var rows = scriptsTable.getElementsByTagName("tr");
if (rows[0].getElementsByTagName("b")[0].innerHTML == "Details of your connections") {
  var column = rows[1].getElementsByTagName("td");
  column[4].innerHTML = "<b>Upload</b><br>				(megs sent)";
  column[5].innerHTML = "<b>Download</b><br>				(megs received)";
  for (i = rows.length - 3; i >= 3; i--) {
    var columns = rows[i].getElementsByTagName("td");
    for (j = 4; j <= 5; j++) {
      columns[j].innerHTML = (parseInt(parseInt(columns[j].innerHTML)/(1024))/1024).toFixed(2);
      columns[j].setAttribute("style", "text-align: right !important; padding-right: 13px !important;");
    }
    columns[6].setAttribute("style", "text-align: right !important; padding-right: 13px !important;");
  }
}