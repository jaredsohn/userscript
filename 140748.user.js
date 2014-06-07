// ==UserScript==
// @name            Knopen bij KNMI waarnemingen
// @namespace       http://www.m4rc3lv.nl
// @description     Knopen bij KNMI waarnemingen
// @version 1.0
// @include         http://www.knmi.nl/actueel/*
// @require         http://www.m4rc3lv.nl/jquery-1.6.4.min.js
// @resource hacked http://www.m4rc3lv.nl/pix/hacked.gif
// ==/UserScript==

$(function () {

 $("#sortable tr td:nth-child(6)").each(function() {
  var x = $(this).text()*1;
  if(x>0) {
   var knopen = x*1.944;
   knopen = Math.floor(knopen * 10)/10;
   var tekst = x + " ["+ knopen + "]";
   $(this).text(tekst);
  }
 });
 
 $("#sortable tr th:nth-child(6)").html("m/s [kts]");
});
