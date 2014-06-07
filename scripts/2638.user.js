/*
 * Author:  Jeremy Roberts
 *          jdrobert /at/ letterboxes /dot/ org
 * Created: 2006-01-16
 */

// ==UserScript==
// @name          QDB submit copy
// @description   Copies the sumbit buttons to the top of the page.
// @include       http://www.qdb.us/?latest*
// @version       1.1
// @GM_version    0.6.4
// ==/UserScript==

var allInputs;
var buttonRow;
var table;
var firstNode;

// Get a list of all 'intput' elements.
allInputs = document.getElementsByTagName('input');

// Find the reset and submit votes buttons.
for (var i = allInputs.length - 1; i >= 0; i--) {
    var thisInput;
    thisInput = allInputs[i];

    if (thisInput.type == "reset")
    {
        // Clone the row.
        buttonRow = thisInput.parentNode.parentNode.cloneNode(true);

        // Grab a reference to the table.
        table = thisInput.parentNode.parentNode.parentNode;

        // Grab the first node.
        firstNode = table.rows[0];

        break;
    }
}

// Copy the row to the front.
table.insertBefore(buttonRow, firstNode);