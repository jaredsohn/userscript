// ==UserScript==
// @name       FtN searchbars
// @author     rp
// @description  searchbars
// @include    http*://feedthe.net/*
// @date       2011-11-12
// @version    0.1
// ==/UserScript==

tables = document.getElementsByTagName('table');
menuTable = null;
for(j = 0; j < tables.length; j++){
if(tables[j].className == 'menubarbackground'){
menuTable = tables[j];
break;}}

Search_1=
'<form method="get" action="browse.php">' +"\n&nbsp;"+
'<b><font size="1" color="d4d4d4">Torrents:</font></b> <input name="search" size="20" type="text">' +"\n"+
'<input value="search..." class="btn" type="submit"></form>';

Search_2=
'<form method="get" action="forums.php">' +"\n"+
'<b><font size="1" color="d4d4d4">Forums:</font></b> <input name="keywords" size="20" type="text">' +"\n"+
'<input name="action" value="search" type="hidden">' +"\n"+
'<input value="search..." class="btn" type="submit"></form>';
   
newTableContent=
'<tr>'+ "\n"+
'<td class="embedded" style="text-align:center">'+Search_1+'</td>'+"\n"+
'<td class="embedded" style="text-align:center">'+Search_2+'</td>'+"\n"+
'</tr>';

searchTable = document.createElement('table');
searchTable.innerHTML = newTableContent;
menuTable.parentNode.insertBefore(searchTable,menuTable.nextSibling);
searchTable.style.backgroundColor = "#3a3d3d";
searchTable.width = "100%";