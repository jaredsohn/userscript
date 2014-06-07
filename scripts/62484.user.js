// ==UserScript==
// @name           ObstDB Check
// @namespace      ObstDB
// @include        http://de26.die-staemme.de/game.php?*screen=map*
// ==/UserScript==

//***************************************************************************
//*                              obstcheck.user.js
//*                            -------------------
//*   author               : Sush
//*   copyright            : (C) Sush
//*
//***************************************************************************/

javascript:var cells=document.getElementById('mapCoords').getElementsByTagName('table')[0].getElementsByTagName('td');
for (var i=0; i<cells.length; i++){
  if (cells[i].innerHTML[1]=='a'){
    var a=cells[i].getElementsByTagName('a');
    var ausdruck = /.+\((\d+)\|(\d+)\)\sK/;
    ausdruck.exec(cells[i].innerHTML);
    var id=a[0].href.split('id=')[1];
    var div = document.createElement("div");
    div.style.position="absolute";
    div.style.zIndex="4";
    div.style.marginTop="-20px";
    div.style.marginLeft="10px";  
    div.innerHTML="<img src=\"http://www.obst.iqw26.de/index.php?page=check&pic=1&x="+RegExp.$1+"&y="+RegExp.$2+"\" title=\"Bericht vorhanden\" onClick=\"var win=window.open('http://www.obst.iqw26.de/index.php?page=check&x="+RegExp.$1+"&y="+RegExp.$2+"','BerichteDB','innerWidth=800,innerHeight=800,scrollbars=yes'); win.focus();\" />";
    cells[i].insertBefore(div,cells[i].firstSibling);}}
