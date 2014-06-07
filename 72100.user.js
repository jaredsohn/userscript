// ==UserScript==
// @name           BlockTex
// @description    Blocks bigtexian
// @include        http://www.selectsmart.com/DISCUSS/list.php?16*
// ==/UserScript==

var tables = document.getElementsByTagName('table');

for (i in tables) {
    var table = tables[i];
    if (table.className != 'list') {
        continue;
    }
    
    for (j = 1; j < table.rows.length; j++) {
        var row = table.rows[j];
        var title = row.cells[1].innerHTML;
        var byPos = title.lastIndexOf('by');
        var author = title.slice(byPos + 3);
        
        if (author.match('big') && author.match('tex')) {
            table.deleteRow(row.rowIndex);
            j--;
        }
        
    }
    
    for (j = 1; j < table.rows.length; j++) {    
        var row = table.rows[j];

        var cellClass = '';
        if ((j % 2) == 0) {
            cellClass = 'alt';
        }
        
        for (k in row.cells) {
            row.cells[k].className = cellClass;
        }
    }
}
