// ==UserScript==
// @name           Kolab webadmin - tweaks
// @namespace      http://khopis.com/scripts
// @description    tweaks for the kolab webadmin user interface; sort users by first name, big MODIFY link on tables
// @include        https://kolab.yourcompany.com/admin/*
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2008 by Adam Katz
// @license        AGPL v3+
// @version        0.4
// @lastupdated    2009-03-11
// ==/UserScript==
/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */

var firstName = true; // set to false to start with users sorted by LAST name

GM_addStyle( (""
  + ".contenttable a { position:relative; z-index:2; }" // on top of "modify"
  + ".contenttable a.modify { position:absolute; z-index:1; left:2.5em;"
  + "       width:82%; text-align:right; margin-top:-0.7em; display:block; }"
  + ".contenttable a:hover { color:red; }"
  + "tr.contentroweven:hover > td, tr.contentrowodd:hover > td\n"
  + "     { background:#99f; }"
  + "#tog0, #tog1 { display:block; }"
  + "span.topmenuitem:hover { background-color:#eeeeee; }"
  + "span.topmenuitem:active { border-bottom:solid 1px transparent; color:red }"
).replace(/({?)}/g,"$1}\n") );

// Add a title to each "Modify" link, add the "modify" class for the CSS above
var links = document.evaluate("//a[contains(@href,'?action=modify')]",
              document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<links.snapshotLength; i++) {
  var linkI = links.snapshotItem(i);
  linkI.className += " modify";
  linkI.title = unescape(linkI.href).replace(/.*dn=cn=([^,]+),.*/,"$1");
}

contenttable = document.getElementsByClassName("contenttable");
while (contenttable && contenttable[0]) { // while() lets us use break.
  contenttable = contenttable[0];
  contenttable.id = "contenttable";

  if (!location.pathname.match(/admin\/user\//)) break; // stop if not on users


  /////// SORT USERS BY FIRST NAME, ALLOW TOGGLING BETWEEN SORTS { /////////

  // copy the table to a second table (via innerHTML to ensure uniquenes)
  var contenttable2 = document.createElement("table");
  contenttable2.className = "contenttable";
  contenttable2.id = "contenttable2";
  contenttable2.cellPadding = "0";
  contenttable2.cellSpacing = "1";
  contenttable2.style.display = "none";
  contenttable2.innerHTML = contenttable.innerHTML;

  contenttable.parentNode.appendChild(contenttable2); // put copy on page

  // If we're overriding or filtering it by last name, sort by last name
  if ( !firstName || location.search.match(/alphalimit=[a-z]/) ) {
    contenttable2.style.display = "table";
    contenttable.style.display = "none";
  }

  var rows = contenttable.getElementsByTagName("tr"); // the table's rows

  // pull the text we want to compare from the row's innerHTML
  function rowMatcher(text) {
    text = text.replace(/\n/g,'').
             replace(/.*title="([^"]+)" class=.modify.*/, "$1").toLowerCase();
    if ( text.match(/</) ) { text = ''; }
    return text;
  }

  // I can't sort an object of type "HTMLCollection" for some reason
  var rowList = new Array();  // so we'll copy it into this temporary array
  for (var c=0; c<rows.length; c++) { rowList.push(rows[c].innerHTML); }
  var newRows = rowList.sort( // sort tmp array w/ rowMatcher()
    function(a, b) { return rowMatcher(a) > rowMatcher(b); }
  );

  // populate real table's rows with sorted array's data and perform name swap.
  // recycling the row's attributes preserves the stripes.
  for (var d=0; d<rows.length; d++) {
    var flname = unescape(newRows[d]).replace(/\n/g,'').
                   replace(/.*\bdn=cn=([^,]*),.*/,"$1") + "<";
    if ( flname.match(">") ) { // try another method
      var lfname = newRows[d].match(/\w+, \w+/); // "Last, First"
      if (lfname) {
        flname = lfname.toString().replace(/(\w+), (\w+)/, "$2 $1<");
      }
    }
    if ( flname.match("<") && !flname.match(">") ) {
      rows[d].innerHTML = newRows[d].replace(/\w+, \w+[^<]*</, flname);
    } else {
      rows[d].innerHTML = newRows[d];
    }
  }
  
  // change the "Name" header on each table to toggle between them
  var toggleRows = document.getElementsByClassName("contentrow");
  for (var r=0; r<toggleRows.length; r++) {
    var togTitle = "Toggle bewteen 'Last, First' and 'First Last'";
    var tog = 'th><a id="tog'+r+'" title="' + togTitle + '">Name</a><';
    toggleRows[r].innerHTML = toggleRows[r].innerHTML.replace(/th>Name</,tog);
    document.getElementById("tog"+r).href = "javascript:"
      + "void(document.getElementById('contenttable" + ( r ? '' : '2' )
      + "').style.display='table');"
      + "void(document.getElementById('contenttable" + ( r ? '2' : '' )
      + "').style.display='none');";
  }

  ////////// } DONE SORTING USERS BY FIRST NAME ////////////


  break; // break out of while loop
}