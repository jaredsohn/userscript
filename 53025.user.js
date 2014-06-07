// ==UserScript==
// @name           ixbt.com wide layout
// @namespace      http://www.ixbt.com/
// @description    patch table width (600px => 100%)
// @include        http://www.ixbt.com/*/*.shtml
// ==/UserScript==

var ixbt_tables = document.getElementsByTagName('table');

for (var i = 0; i < ixbt_tables.length; i++) {
    var table = ixbt_tables[i];
    if (table.width >= 600) {
        table.width = 0;
    }
}

var ixbt_td = document.getElementsByTagName('td');

for (var i = 0; i < ixbt_td.length; i++) {
    var td = ixbt_td[i];
    if (td.width >= 600) {
        td.width = 0;
    }
    if (td.className == 'right_col_banner_and_import') {
        td.style.display = 'none';
    }
}

var ixbt_div = document.getElementsByTagName('div');

for (var i = 0; i < ixbt_div.length; i++) {
    var div = ixbt_div[i];
    if (div.className == 'content') {
        div.style.width = '100%';
    }
}
