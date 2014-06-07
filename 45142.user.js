// ==UserScript==
// @name           Check Boxes
// @namespace      Autocheck SSL Encryption
// @description    Automatically checks SSL Encryption box
// @include        https://na04.daptiv.com/default.aspx*
// @include        https://login.daptiv.com/*
// ==/UserScript==

var chkboxes=document.getElementsByTagName('input')
for (var i=0; i < chkboxes.length; i++) {
  if (chkboxes[i].type=="checkbox" && chkboxes[i].name=="_ssl") {
    chkboxes[i].checked=true
  }
}