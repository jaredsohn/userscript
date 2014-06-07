// ==UserScript==
// @name           MySpace Script Hider
// @namespace      CampSoup1988
// @description    Hides any userscript containing "MySpace" in the description. 
// @include        http://userscripts.org/?page=*
// @include        http://userscripts.org/
// @include        http://userscripts.*/*
// ==/UserScript==
var tables, table;
var kill_list = new Array();
var text;
tables = document.getElementsByTagName("table");
if (tables.length >= 1) {
    table = tables[0];
    for (var i=1; i < table.rows.length; i++) {
        var text = table.rows[i].getElementsByTagName("td")[1].innerHTML;
        if (text.toLowerCase().search("myspace") != -1) {
            kill_list.push(i);
        }
    }
    while (kill_list.length) {
        table.deleteRow(kill_list.pop());
    }
}