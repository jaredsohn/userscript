// My Netvibe
// Version 0.1
// 2006-04-03
// Copyright (c) 2006, Kyrlian
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           My Netvibe
// @namespace      http://www.netvibes.com
// @description    Change the layout of netvibes' top items
// @include        *.netvibes.*
// @exclude        
// ==/UserScript==
(function (){
 var menulist=['pageTitle','divTabs','topLinks','savingStatus'];
 var menualign=['left','left','right','right'];
 
// reduce player
 document.getElementById('player').parentNode.style.width='';
// reduce top menus
 document.getElementById('contentLink').parentNode.style.width=''; 
 document.getElementById('contentLink').parentNode.parentNode.parentNode.parentNode.width='*';
 document.getElementById('collapseAllLink').parentNode.style.width='';
// remove 'add content' text (still get the green +)
 document.getElementById('addContentLink').innerHTML='Add'; 
// remove 'signout' text(still get the red switch)
 document.getElementById('signInOutLink').innerHTML=''; 
// remove the | betwen collapse all and expand all arrows
 document.getElementById('collapseAllLink').nextSibling.nodeValue=''; 
// changes'Settings' text to 'cfg'
 document.getElementById('userSettings').innerHTML='cfg'; 

// those changes must wait for the page to be loaded
 // changes user email text to 'usr'
 //window.setTimeout("document.getElementById('userProfile').innerHTML='usr';",500);
 // changes'New Tab' text to '+'
 window.setTimeout("document.getElementById('aNewTab').innerHTML='+';",500);

//rebuild top table
 var top=document.getElementById('topPart');
 var table=document.createElement('table');
 table.style.width="100%";
 var tr=document.createElement('tr');
 for(item in menulist){
  var d=document.getElementById(menulist[item]);
  var td=document.createElement('td');
  td.setAttribute('align',menualign[item]);
  td.appendChild(d);
  tr.appendChild(td);
 }
 table.appendChild(tr);
 top.appendChild(table);

//remove stuff
 var rmlist=['divTabsOuter'];
 for(item in rmlist){
  var trm=document.getElementById(rmlist[item]);
  trm.parentNode.removeChild(trm);
 }
}());
