// ==UserScript==
// @id             SingleColumnPrefixIndex
// @name           MediaWiki single-column PrefixIndex maker
// @version        1.0.1
// @namespace      http://www.thzinc.com
// @author         Daniel James
// @description    Makes a PrefixIndex on a MediaWiki into a single column
// @include        *
// @run-at         document-end
// ==/UserScript==
(function(){
    var tables = document.querySelectorAll("table#mw-prefixindex-list-table tbody");
    for (var ti = 0, til = tables.length; ti < til; ti++) {
        var table = tables[ti];
        var cells = table.querySelectorAll("td");
        for (var ci = 0, cil = cells.length; ci < cil; ci++) {
            var cell = cells[ci];
            var row = document.createElement("tr");
            
            if (cell.parentNode.children.length == 1) {
                table.removeChild(cell.parentNode);
            }
            row.appendChild(cell);
            table.appendChild(row);
        }
    }
})();