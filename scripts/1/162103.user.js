// ==UserScript==
// @name       QueenAlice sortable tables
// @namespace  http://userscripts.org/users/509399
// @version    0.2
// @description  makes Queenalice.com tables sortable
// @match      http://*queenalice.com/*
// @copyright  2012+, orothain
// @require http://www.kryogenix.org/code/browser/sorttable/sorttable.js
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


// mark each table as sortable
$(".data").addClass("sortable");

// and sort by default on the score column
$(document).ready(initialSort);

function initialSort() {
    var toSort = $("th:contains('Score')");

    for (var cnt=0; cnt<toSort.length; cnt++) {
        //first call sorts less to greatest
        sorttable.innerSortFunction.apply(toSort[cnt],[]);
        //second call sorts greatest to least
        sorttable.innerSortFunction.apply(toSort[cnt],[]);
    }
}