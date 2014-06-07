
// ==UserScript==
// @name           HDB tiny search
// @description    adds a compact row with 3 search fields
// @include        https://hdbits.org*
// @include        http://hdbits.org*
// ==/UserScript==

tables = document.getElementsByTagName('table');
menuTable = null;

for(j = 0; j < tables.length; j++){
   if(tables[j].className == 'menubarbackground'){
       menuTable = tables[j];
       break;
   }
}

search1 = '<form method="get" action="users.php">' +"\n&nbsp;"+
         'Members: <input name="search" size="20" type="text">' +"\n"+
         '<input value="Search!" class="btn" type="submit"></form>';

search2 = '<form method="get" action="browse.php">' +"\n"+
         'Torrents: <input name="search" size="20" type="text">' +"\n"+
         '<input value="Search!" class="btn" type="submit"></form>';

search3 = '<form method="get" action="forums.php">' +"\n"+
         'Forums: <input name="keywords" size="20" type="text">' +"\n"+
         '<input name="action" value="search" type="hidden">' +"\n"+
         '<input value="Search!" class="btn" type="submit"></form>';
   
newTableContent = '<tr>'+ "\n"+
          '<td class="embedded" style="text-align:left" width="33%">'+search1+'</td>'+"\n"+
          '<td class="embedded" style="text-align:center" width="33%">'+search2+'</td>'+"\n"+
          '<td class="embedded" style="text-align:right" width="33%">'+search3+'</td>'+"\n"+
          '</tr>';

searchTable = document.createElement('table');
searchTable.width = "100%";
searchTable.style.borderTop = "1px solid black";
//searchTable.style.backgroundColor = "#7c98ae";    // <-- modifiy backgroundcolor here
searchTable.innerHTML = newTableContent;
menuTable.parentNode.insertBefore(searchTable,menuTable.nextSibling);