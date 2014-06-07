// ==UserScript==
// @name        cpnsMA
// @namespace   agus
// @description Beri nama dan NIP by Agus Sudarmanto
// @include     http://cpnsonline.mahkamahagung.go.id/cetaks.php?id_pelamar=*&op=pendaftaran&jlap=kartuujian
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

// == setiing dibawah ini
var nama = "ERRY MARDIANTO";
var nip = "19760301 200502 1 001";

// == jangan diubah ==================================================
$("td:contains('NIP ')").html("<b>"+nama+"</b><br>NIP. "+nip);