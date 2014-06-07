// ==UserScript==
// @name           EL Autologin
// @namespace      snyke.net
// @include        http://portal.earthlost.de/index.phtml*
// ==/UserScript==

if(document.getElementsByTagName("input")[3].value){
  // Disable autologin
  document.getElementsByTagName("input")[0].checked = false;
  // Enable autologin
  document.getElementsByTagName("input")[1].checked = true;
  document.getElementsByTagName("form")[0].submit();
}