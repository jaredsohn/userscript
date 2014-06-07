// ==UserScript==
// @name           Can haz Wiki?
// @namespace      http://what.cd
// @description    Add wiki quick search to what
// @include        *what.cd*
// ==/UserScript==


var ul = document.getElementById('searchbars').getElementsByTagName("ul")[0];
var html = '<li><span class="hidden">Wiki: </span>';
html +=    '<form action="wiki.php" method="get">';
html +=    '<input type="hidden" name="action" value="search">';
html +=    '<input value="Wiki" type="text" name="search" size="17" />';
html +=    '<input value="Search" type="submit" class="hidden" />';
html +=    '</form>';
html +=    '</li>';

ul.innerHTML += html;