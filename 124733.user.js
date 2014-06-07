// ==UserScript==
// @name           BBC Football League Table Sorter
// @namespace      BBCFootTableSorter
// @description    Sort the BBC Football League Table via any column header
// @include        http://www.bbc.co.uk/sport/football/*/table
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require       http://tablesorter.com/__jquery.tablesorter.min.js
// ==/UserScript==

var embedCode = document.getElementsByClassName("table-stats");
 var clone = embedCode[0].attributes;
 var tableName = "#"+clone.id.value;
$(document).ready(function()
    {
        $(tableName).tablesorter({
        headers: {
            0: { sorter: false }, 1: { sorter: false }, 17: { sorter: false }
        },
		textExtraction: function(node) {

		if (node.className == 'last-10-games' && node.nodeName == "TD") {

			var lastTen = node.getElementsByTagName('li');
			var formPoints = 0;
			for (var i = 0; i < lastTen.length; i++ ) {
				if (lastTen[i].className == 'win')	{
					  formPoints = formPoints + 3;
					}
				if (lastTen[i].className == 'draw')	{
					var formPoints = formPoints + 1;
				}
			}
		return ""+formPoints;
		}
		return node.innerHTML;
		}
    });
});