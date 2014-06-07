// ==UserScript==
// @name          Light Dailymotion
// @description   Try to make Dailymotion lighter
// @include       http://*.dailymotion.com/*
// ==/UserScript==

// Agbeladem -- Version 1.0.0

function CheckAndDel (name) {
 if(document.getElementById(name)==null)
   return false
 else {
  document.getElementById(name).innerHTML='';
  return true;
 }
}

CheckAndDel('mc_Middle');