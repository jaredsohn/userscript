// ==UserScript==
// @name 200 Thread Selembar
// @description Diedit dari skrip milik Joe Simmon "watch Youtube videos in high quality" yang menambahkan &fmt=18 ke setiap akhir URL Youtube. Skrip ini ditujukan untuk pengguna KASKUS yang pengen satu halaman forum terdiri dari 200 thread sekaligus, biar gak capek next page. Karena 200 thread dalam 1 halaman = 10 halaman berisi 20 thread. PERINGATAN: Tidak mengubah jumlah post yang ditampilkan dalam thread!
// @author Adi D. Jayanto; Origin: Joe Simmon
// @include        http://www.kaskus.us/forumdisplay.php?f=*
// @include     http://www.kaskus.com/forumdisplay.php?f=*
// @include     http://www.kaskus.co.id/forumdisplay.php?f=*
// ==/UserScript==

var theurl = window.content.location.href.toString();

if (theurl.search("pp=200") == -1) {
  window.content.location.href = (theurl + "&pp=200");
}