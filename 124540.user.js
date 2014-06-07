// ==UserScript==
// @name           I don't want to Install Google Chrome
// @include        http://www.google.*/
// @include        https://www.google.*/
// @include        https://encrypted.google.com/
// @version        0.4
// @grant          none
// ==/UserScript==


window.setTimeout(function(){
google.promos&&google.promos.pushdown&& google.promos.pushdown.pd_dp('gpx');
google.promos&&google.promos.toast&& google.promos.toast.cpc();
// document.getElementById('pushdown').style.visibility = 'hidden';
},500);


