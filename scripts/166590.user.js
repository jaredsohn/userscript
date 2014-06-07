// ==UserScript==
// @name        TheTVDBLanguageFilter
// @namespace   http://www.craigmouser.com
// @description Only shows 1 language in search results. 
// @include     http://thetvdb.com/?string=*
// @version     1
// ==/UserScript==

var table = document.getElementById("listtable");
for (var i = 1, row; row = table.rows[i]; i++) {
    if(row.cells[1].innerHTML != 'English'){
        row.style.display = "none";
    }
}
