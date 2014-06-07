// ==UserScript==
// @name           WoWMeter
// @namespace      armata
// @include        http://www.wowmeteronline.com/*
// @author          armata4ATgmailD0Tcom
// ==/UserScript==

// very short but quit good ^^

var tables=document.getElementsByTagName('table');
var reg1=new RegExp("google|announce","g");
for (i=0;i<tables.length;i++){
  if (tables[i].innerHTML.match(reg1)) {
    tables[i].innerHTML="";
  }
}
