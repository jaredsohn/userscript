// ==UserScript==
// @name        Dashboard\HP_AMS
// @namespace   Dashboard\HP_AMS
// @description Dashboard\HP_AMS
// @include     https://na15.salesforce.com/01Zi0000000US1E
// @exclude     %exclude%
// @version     1
// @grant       none
// ==/UserScript==

console.log('refresh daschboard init');

setInterval(function(){
  console.log('refresh daschboard ...');
  document.getElementById('refreshInput').click();
}, ((1000 * 60) * 1 /* << por minutos */));