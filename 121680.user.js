// ==UserScript==
// @name 100 Thread 1 page
// @description buat yang pengen satu halaman forum terdiri dari 100 thread sekaligus ditampilkan dalam 1 page
// @author darkseekeer; Origin: Joe Simmon
// @include        http://www.kaskus.us/forumdisplay.php?f=*
// ==/UserScript==

var theurl = window.content.location.href.toString();

if (theurl.search("pp=100") == -1) {
  window.content.location.href = (theurl + "&pp=100");
}