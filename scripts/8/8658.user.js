// ==UserScript==
// @name           FacebookScriptHider
// @namespace      Eh?
// @include        http://userscripts.org/?page=*
// @include        http://userscripts.org/
// ==/UserScript==
var tables, table;
var kill_list = new Array();
var text;
tables = document.getElementsByTagName("table");
if (tables.length >= 1) {
    table = tables[0];
    for (var i=1; i < table.rows.length; i++) {
        var text = table.rows[i].getElementsByTagName("td")[1].innerHTML;
        if (text.toLowerCase().search("facebook") != -1) {
            kill_list.push(i);
        }
    }
    while (kill_list.length) {
        table.deleteRow(kill_list.pop());
    }
}
