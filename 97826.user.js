// ==UserScript==
// @name           Breakup Alert fixer
// @namespace      waldirpimenta.com
// @description    hides undisclosed-status entries from the Breakup Alert watchlist, and adds color-coded backgrounds for easy lookup. DOES NOT WORK ON FACEBOOK, VISIT THE APP PAGE INSTEAD: http://breakupalert.socialshaker.com/
// @include        http://breakupalert.socialshaker.com/
// ==/UserScript==

var tableRows = document.getElementsByTagName('tr');
var rowsToRemove = [];

for (i in tableRows) {
  if(tableRows[i].className == "listData"){
    statusCellContent = tableRows[i].children[1].children[0];
    if(statusCellContent.nodeName == "TABLE"){
      // technically the next two lines could be commented out, but let's be sure
      statusString = statusCellContent.children[0].children[0].children[1].textContent;
      if (statusString.replace(/[\n\t]/g,'').indexOf("hasn't revealed their status") > 0)
        rowsToRemove[rowsToRemove.length]=tableRows[i];
    }
    else{
      if (statusCellContent.textContent == "Single")
        tableRows[i].children[1].style.background="LimeGreen";
      if (statusCellContent.textContent == "In a relationship")
        tableRows[i].children[1].style.background="Crimson";
      if (statusCellContent.textContent == "Engaged")
        tableRows[i].children[1].style.background="FireBrick";
      if (statusCellContent.textContent == "Married")
        tableRows[i].children[1].style.background="DarkRed";
    }
  }

}
for (i in rowsToRemove) rowsToRemove[i].parentNode.removeChild(rowsToRemove[i]);