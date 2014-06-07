// ==UserScript==
// @name           collectr.net without iframes
// @description    Cleans up the frameset after clicking on a link on collectr.net and automatically clicks the "Over 18" Button
// @namespace      ak
// @include        http://collectr.net/out/*
// ==/UserScript==

if(document.forms.length > 0 && document.forms[0].action.match("out")) {
  document.forms[0].action = window.location.href; 
  window.setTimeout("document.forms[0].o18.click()", 1000); 
}
if(document.getElementById('displayPage')) {
  location.replace(document.getElementById('displayPage').src);
}
