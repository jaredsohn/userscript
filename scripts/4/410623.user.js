// ==UserScript==
// @name        du00.bookcase
// @namespace   zhang
// @include     http://www.du00.com/bookcase.php
// @version     1
// @grant       GM_log
// ==/UserScript==

var grid = document.querySelector('table.grid');
if (grid) {
    var rows = grid.getElementsByTagName('tr');
    for (var i = rows.length - 1; i > 0; i--) {
        var row = rows[i];
        var cells = row.getElementsByTagName('td');
        switch(cells.length) {
            case 6:
                var latest = cells[2].getElementsByTagName('a');
                var marked = cells[3].getElementsByTagName('a');
                if (latest.length == 1 && marked.length == 1 &&
                    latest[0].href == marked[0].href) {
                    cells[3].innerHTML = '&nbsp;';
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
