// ==UserScript==
// @name 100page/tread for your forum
// @description Skrip ini ditujukan untuk pengguna forum yang pengen satu halaman forum terdiri dari 1000 thread sekaligus, biar gak capek next page. Karena 200 thread dalam 1 halaman = 10 halaman berisi 10 thread. 
// @author Diedit Oleh : supri4dhy terinspirasi dari : Adi D. Jayanto 
// @include        */forumdisplay.php?f=*
// ==/UserScript==

var theurl = window.content.location.href.toString();

if (theurl.search("pp=100") == -1) {
  window.content.location.href = (theurl + "&pp=100");
}