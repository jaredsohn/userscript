// Project Euler - Problem Sorter v0.1
//
// Sorts Project Euler problems by the age of the last forum post.
// If two problems show the same age, the problem with the higher ID is shown first.
// Currently only works on the page http://projecteuler.net/index.php?section=problems&show=solved

// Possible Issues:
// - When a user makes a post which locks the forum, the problem will not rise to the top, but instead
//   will be sorted with the other locked problems.

// ==UserScript==
// @name           Project Euler - Problem Sorter
// @namespace      http://userscripts.org/users/74256
// @description    Sorts Project Euler solved problems page by the age of the last forum post.
// @include        http://projecteuler.net/index.php?section=problems&show=solved
// ==/UserScript==

function init() {
    var rows = get_rows();

    if (rows.length == 0) {
        return;
    }

    rows.sort(compare_rows);

    reorder_rows(rows);
}

// get all the rows of the summary table
// for each row keep track of the last post time and the original index
function get_rows() {
    var allRows = new Array();

    var rows = document.evaluate(
        "//tr[@class='bg_table_row1'] | //tr[@class='bg_table_row2']",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (var i = 0; i < rows.snapshotLength; i++) {
        var row = {};
        row["node"] = rows.snapshotItem(i);
        row["time"] = get_time(rows.snapshotItem(i));
        row["index"] = i;

        allRows.push(row);
    }

    return allRows;
}

// returns number of minutes since last post
// inifity if unknown
function get_time(row) {
    var links = row.getElementsByTagName('a');
    var time_string = links[links.length-1].lastChild.nodeValue;

    // this occurs when the forum is locked
    // (time_string is set to a span element)
    if (time_string === null) {
        return Infinity;
    }

    var value = parseInt(time_string)
    
    if (time_string.indexOf("minute") != -1) {
        return value;
    } else if (time_string.indexOf("hour") != -1) {
        return value*60;
    } else if (time_string.indexOf("day") != -1) {
        return value*1440;
    } else if (time_string.indexOf("week") != -1) {
        return value*10080;
    } else {
        return Infinity;
    }
}

// compare two rows
// first compare by time of last post, then by original index
function compare_rows(row1, row2) {
    if (row1["time"] == row2["time"]) {
        return row2["index"] - row1["index"];
    } else {
        return row1["time"] - row2["time"];
    }
}

// reorder the rows according to the order they appear in the rows array
function reorder_rows(rows) {
    // get the unique parent of all the rows
    var parentNode = rows[0]["node"].parentNode;

    // remove the rows
    for (var i = 0; i < rows.length; i++) {
        parentNode.removeChild(rows[i]["node"]);
    }
    
    // add the rows in the correct order
    for (var i = 0; i < rows.length; i++) {
        parentNode.appendChild(rows[i]["node"]);
    }
}



init();