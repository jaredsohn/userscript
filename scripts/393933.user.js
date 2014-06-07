// ==UserScript==
// @name       redmine backlogs tasks hide test col
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

if(document.location.href.match(/taskboards/)){
    function show_hide_column(id, col_no) {
        var tbl = document.getElementById(id);
        var rows = tbl.getElementsByTagName('tr');
    
        for (var row = 0; row < rows.length; row++) {
            var cols = rows[row].children;
            if (col_no >= 0 && col_no < cols.length) {
                var cell = cols[col_no];
                if (cell.tagName == 'TD') cell.style.display = 'none';
            }
        }
    }
    
    var cols = [2,4,6,7,9];
    var tables = ["board_header","tasks","impediments"];
    tables.forEach(function(tbl){
        cols.forEach(function(col){
            show_hide_column(tbl, col);
        })
    });
}