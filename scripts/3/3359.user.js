// View All Netflix Profile Queues
// version 0.1 BETA!
// 2006-02-23
// by Jim Biancolo
//
// ====================================================================
// YOU MUST SAVE THIS SCRIPT LOCALLY AND EDIT IT TO INCLUDE INFORMATION 
// ABOUT THE NETFLIX PROFILE YOU WANT TO INCLUDE BEFORE INSTALLING.  
// GO TO LINE 41 BELOW FOR INSTRUCTIONS.
// ====================================================================
//
// Thanks to Mark Pilgrim for Dive Into Greasemonkey:
//   http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Autosort Netflix Queue", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          View All Netflix Profile Queues
// @namespace     http://www.biancolo.com
// @description   If you run multiple profiles at Netflix, this script will show all profile queues on your queue page.  IMPORTANT:  you must update the script to include your profile info before installing!
// @include       http://netflix.com/Queue*
// @include       http://*.netflix.com/Queue*
// ==/UserScript==

// Set up profiles
var profiles = new Array();
var initials = new Array();

// INSTRUCTIONS: You need to update the two values below.  First, go to the 
// profile you want to pull in to your queue.  Then go here:
//
//    http://www.netflix.com/RSSFeeds?lnkctr=sbRssF
//
// Look at the links under the "Personalized Feeds" section.  Each one should 
// include an "id" that looks similiar to the one below next to "profiles[0]".
// replace the value below with the ID from the link.  Then replace the "X"
// in "initials" with whatever initial you want to preface the incorporated
// movies.
profiles[0] = 'P1818999999999999999999999999999999';
initials[0] = 'X';

// more profiles, as needed (uncomment following two lines)
// profiles[1] = 'P1818999999999999999999999999999999';
// initials[1] = 'X';


// Set up new queue table
var newQueueTable

newQueueTable = document.createElement("table");
newQueueTable.setAttribute("class", "qtbl");
newQueueTable.setAttribute("cellspacing", "0");
newQueueTable.setAttribute("cellpadding", "0");
newQueueTable.setAttribute("border", "0");

var row = document.createElement("tr");
var cell = document.createElement("th");
cell.setAttribute("colspan", "10");
cell.innerHTML = '<b>Other Profile Queues</b>';
row.appendChild(cell);
newQueueTable.appendChild(row);

// Set up new queue DIV
var newQueueDiv;
newQueueDiv = document.createElement("div");
newQueueDiv.setAttribute("class", "dvd-queue");
newQueueDiv.setAttribute("style", "border-top: 2px solid #ccc;");

// Get rows from "Movies You Have Out", identify last row so we can add rows
// from other profiles after it.
outRows = document.evaluate(
  "//tr[@class='or']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

var lastOutRow = outRows.snapshotItem(outRows.snapshotLength-1);

// Find the DIV that contains the queue so we can add our new queue div/table
// after it
queueDiv = document.evaluate(
  "//form[@name='MainQueueForm']", 
  document, 
  null, 
  XPathResult.FIRST_ORDERED_NODE_TYPE, 
  null ).singleNodeValue;

// Loop over the profiles and get the "Movies Out" and Queues for each
for(var i=0; i<profiles.length; i++) { 
  getOut(profiles[i], initials[i]);
  getQueue(profiles[i], initials[i]);
}

// Put the new queue table, which is now full into its container DIV, and
// then insert the whole thing after the existing queue.
newQueueDiv.appendChild(newQueueTable);
queueDiv.parentNode.insertBefore(newQueueDiv, queueDiv.nextSibling);

function getOut(profile, initials) {
  GM_xmlhttpRequest ({
    method:'GET',
    url: 'http://rss.netflix.com/AtHomeRSS?id=' + profile,
    onload: function(results) {
      var parser = new DOMParser();
      var dom = parser.parseFromString(results.responseText, "application/xml");
      var items = dom.getElementsByTagName('item');

      var title;
      var link;

      var blankRow;
      blankRow = document.createElement("tr");
      blankRow.setAttribute("class", "os");
      blankRow.appendChild(document.createElement("td"));
  
      for (var i = 0; i < items.length; i++) {
        title = items[i].getElementsByTagName('title')[0].textContent;
        link = items[i].getElementsByTagName('link')[0].textContent;

        var row = document.createElement("tr");
        row.setAttribute("class", "or");

        var cell1 = document.createElement("td");
        cell1.setAttribute("class", "qo");
        cell1.innerHTML = '<b>' + initials +  '</b>';
    
        var cell2 = document.createElement("td");
        cell2.setAttribute("class", "qt");
        cell2.innerHTML = '<a href="' + link + '">' + title + '</a>';
    
        var cell3 = document.createElement("td");
        cell3.setAttribute("colspan", "5");
        cell3.innerHTML = '';
    
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        lastOutRow.parentNode.insertBefore(row, lastOutRow.nextSibling);
        lastOutRow.parentNode.insertBefore(blankRow, lastOutRow.nextSibling);
      }
    }
  });
}

function getQueue(profile, initials) {
  GM_xmlhttpRequest ({
    method:'GET',
    url: 'http://rss.netflix.com/QueueRSS?id=' + profile,
    onload: function(results) {
      var parser = new DOMParser();
      var dom = parser.parseFromString(results.responseText, "application/xml");
      var items = dom.getElementsByTagName('item');

      var priority;
      var title;
      var link;

      var blankRow, blankCell;
      blankRow = document.createElement("tr");
      blankRow.setAttribute("class", "s");
      blankCell = document.createElement("td");
      blankCell.setAttribute("colspan", "2");
      blankRow.appendChild(blankCell);
  
      var priorityMatch = new RegExp("^[0-9]+");
      var priorityReplace = new RegExp("^[0-9 ]+\- *");
  
      for (var i = 0; i < items.length; i++) {
        title = items[i].getElementsByTagName('title')[0].textContent;
        priority = title.match(priorityMatch);
        title = title.replace(priorityReplace, '');

        link = items[i].getElementsByTagName('link')[0].textContent;

        var row = document.createElement("tr");
        row.setAttribute("class", "bd");

        var cell1 = document.createElement("td");
        cell1.innerHTML = '<b>&nbsp;&nbsp;' + initials + priority + '</b>';
    
        var cell2 = document.createElement("td");
        cell2.setAttribute("class", "et");
        cell2.innerHTML = '<a href="' + link + '">' + title + '</a>';
    
        row.appendChild(cell1);
        row.appendChild(cell2);
    
        newQueueTable.appendChild(row);
        newQueueTable.appendChild(blankRow);
      }
    }
  });
}
