// ==UserScript==
// @name        muyuge.bookcase.cleanup
// @namespace   clumsyman
// @description 移除未更新的书签
// @include     http://muyuge.com/bookcase.php
// @version     1
// ==/UserScript==

var table = document.querySelector('div.gridtop+table');
if (table) {
    var tbody = table.tBodies[0];
    var rows = tbody.getElementsByTagName('tr');
    for (var i = rows.length - 1; i > 0; i--) {
        var row = rows[i];
        var cells = row.getElementsByTagName('td');
        switch(cells.length) {
            case 6:
            case 7:
                var latest = cells[cells.length-4].getElementsByTagName('a');
                var marked = cells[cells.length-3].getElementsByTagName('a');
                if (latest.length == 1 && marked.length == 1 &&
                    latest[0].href == marked[0].href) {
                    cells[cells.length-3].innerHTML = '&nbsp;';
                }
                break;
            case 0:
                if (row.getElementsByTagName('th').length == 6) {
                    //bookcase header
                    break;
                }
            case 1:
                if (cells[0].className == 'foot') {
                    //bookcase footer
                    break;
                }
            default:
                alert('invalid bookcase structure');
        }
    }
}
