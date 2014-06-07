// ==UserScript==
// @name          BugSort
// @namespace     http://squarefree.com/userscripts
// @description   Lets you sort Bugzilla bug lists without contacting the server.
// @include       https://bugzilla.mozilla.org/buglist.cgi?*
// ==/UserScript==

/*

  Author: Jesse Ruderman - http://www.squarefree.com/

  Version history:
    2005-05-21: Fix JS strict warnings.
    2005-05-02: Faster, see http://www.squarefree.com/2005/05/02/faster-bug-sort-user-script/.
    2005-04-18: Initial release, see http://www.squarefree.com/2005/04/18/bug-sort-user-script/.

  License: MPL
  
  Features:

   * The sort is stable.  For example, if you sort by votes and then sort by resolution, 
     the bugs at the top are open bugs sorted by votes.

   * You can reverse the order of the bugs by clicking a column header again.
   
  On Jesse's computer (1.6 GHz P4), this script takes about 2 seconds to sort a 600-bug list.

*/


/*
 Odd things about Bugzilla:
  * some columns have special sort orders
  * multirow "staggered" headers
  * table isn't split across pages like in most search engines. but it is split into multiple tables.
  * even/odd row coloring
*/

var BUGS_PER_TABLE = 100;

function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}


function getBugTables()
{
  var i, table, tables=[];
  for (i=0; table = document.getElementsByTagName("table")[i]; ++i) 
    if (table.className == "bz_buglist")
      tables.push(table);
  return tables;
}


function fixHeaderLinks(whichIsDescending)
{
  var t, i, table, row, colIndex, j, cell, link, descending;

  for (t=0; table = bugTables[t]; ++t)
    for (i=0; row = table.rows[i]; ++i)
      if (row.cells[0].tagName=="TH")
        for (colIndex=0, j=0; cell = row.cells[j]; ++j)
        {
          descending = (colIndex == whichIsDescending);
          if ( (link = cell.getElementsByTagName("A")[0]) )
            link.href = 'javascript:sortBugs(' + colIndex + ', "' + trim(cell.textContent) + '", ' + descending + ');';
          colIndex += cell.colSpan;
        }
}

// getSortMethod : given a column name, return two functions:
// - preprocess
// - compare
function getSortMethod(columnName)
{
  function compareNumericalDesc(x,y) { return y-x; }
  function compareNumericalAsc(x,y) { return x-y; }
  function compareString(x,y) { return (x==y) ? 0 : (y<x) ? 1 : -1; }
  
  function preprocessUsingHash(hash) { return function(cellText) { return hash[cellText]; }; }
  function integerize(cellText) { return parseInt(cellText, 10); }
  function uppercase(cellText) { return cellText.toUpperCase(); }

  var hashes = 
    {
      "Sev" : { "blo":7, "cri":6, "maj":5, "nor":4, "min":3, "tri":2, "enh":1 }, // BMO's sane order
      "Status" : { "UNCO":7, "NEW":6, "ASSI":5, "REOP":4, "RESO":3, "VERI":2, "CLOS":1 }, // BMO's sane order
      "Resolution": { "":7, "FIXE":6, "INVA":5, "WONT":4, "DUPL":3, "WORK":2, "MOVE":1 } // BMO's weird order
    };


  switch(columnName) {

    case "Sev":
    case "Status":
    case "Resolution":
      return { preprocess: preprocessUsingHash(hashes[columnName]), compare: compareNumericalDesc };

    case "Votes":
      // bugs with the most votes first
      return { preprocess: integerize, compare: compareNumericalDesc };
      
    case "ID":
      // oldest bugs first
      return { preprocess: integerize, compare: compareNumericalAsc };

    default:
      // case-insensitive, alphabetical
      return { preprocess: uppercase, compare: compareString};

  }

  //also dates! maybe skip those, because the server has more information about dates than it gives us?
}



function sortBugs(columnIndex, columnName, descending)
{
  if (descending)
    fixHeaderLinks();
  else
    fixHeaderLinks(columnIndex); // next time this one is clicked, just reverse the order

  var sortMethod = getSortMethod(columnName);
  
  var i, table, j, row;
  var rows = [];
  var cellText;

  
  var t1 = new Date();

  // gather the rows into an array to be sorted.
  for (i=0; table = bugTables[i]; ++i)
    for (j=0; row = table.rows[j]; ++j)
      if (row.cells[0].tagName == "TD")
        // Put a 3-element array into the array "rows".
        rows.push(
          [
            sortMethod.preprocess( trim(row.cells[columnIndex].textContent) ) ,
            j,     // make it a stable sort by keeping the old row index around
            row    // not compared, but kept with the sorted objects
          ]
        );


  var t2 = new Date();

  if (descending) {
    rows.reverse(); // only reverse the order of the rows; don't sort at all!
  }
  else {
    var compare = sortMethod.compare;

    function compareAll(x,y) 
    {
      var c;
      if ((c = compare(x[0], y[0])) != 0) // if primary sort column differs
        return c;
      return x[1] - y[1]; // stable sort. these always differ for different rows.
    }
    
    // performance: This is just data, no DOM, so it's really fast compared to the other parts of the script.
    rows.sort(compareAll);
  }

  var t3 = new Date();
  
  // Remove all the tables from the page.  They will be put back one at a time.
  // This helps a *lot* with speed, since most of the time of this script is spent in DOM and most of that
  // time is spent in changing the DOM / layout.
    

  for (i=0; table = bugTables[i]; ++i) {
    // Keep track of where the first bug table was so we can put it back.
    var parent = table.parentNode;
    var nextSibling = table.nextSibling; // this is a text node that survives the subsequent removal!

    // Remove it from the document (speeds things up)
    parent.removeChild(table);

    // Later, add this table to the document with the correct rows
    
    function thingie(table, parent, nextSibling, i) {
      var j, row, rowTuple;

      var tableBody = table.tBodies[0];
      
      // Clear data rows, which might belong in a subsequent table.
      for (j = 0; row = tableBody.rows[j]; ++j)
      {
        if (row.cells[0].tagName == "TD") {
          --j;
          tableBody.removeChild(row);      
        }
      }
      
      
      // Add the children that belong here.
  
      // Toss the rows into tables, one tablefull (BUGS_PER_TABLE) at a time.
      // Unfortunately, DOM 2 HTML insertRow is for creating *new* rows, so use DOM 2 Core.
  
      for (j = i * BUGS_PER_TABLE; (j < (i+1) * BUGS_PER_TABLE) && (rowTuple = rows[j]); ++j) {
        row = rowTuple[2];
        
        if (j % 2)
          row.className = row.className.replace(/bz_odd/, "bz_even");
        else
          row.className = row.className.replace(/bz_even/, "bz_odd");
  
        tableBody.appendChild(row);
      }
   
      // Put it back into the document.    
      parent.insertBefore(table, nextSibling);
    }
    
    if(i == 0)
      thingie(table, parent, nextSibling, i);
    else
      setTimeout(thingie, i * 200, table, parent, nextSibling, i);

 }
        
        

  var t4 = new Date();


  //GM_log((t4 - t3) + ", " + (t3 - t2) + ", " + (t2 - t1));
  
  // Put the first table back in the document.
}

var bugTables = getBugTables();

window.sortBugs = sortBugs;

if (bugTables.length) { // for when Greasemonkey inserts this script into the "please stand by" page, etc.
  fixHeaderLinks();
}
