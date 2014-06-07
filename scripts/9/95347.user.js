// ==UserScript==
// @name                KASKUS 2010 Signature By geeks
// @description         Pasang Signature Khusus junker2 sejati™ Untuk Mempromosikan SG, Penambahan Fitur Spoiler Link Ke DIrect Grup, Gambar Monyet + Direct Ke Grup Dapat Digunakan Di M.Kaskus.Us
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @include             http://m.kaskus.us/*
// @author              original author *JagoWand | Edited By Henry Trianta | 
// ==/UserScript==

var signature = "[COLOR="Blue"][B]Check Another Cool Thread :[/B][/COLOR]
[Spoiler=jangan dibuka]
[URL="http://archive.kaskus.us/thread/5346680"]<<{ Micro Home }>> mungkin salah satu cara untuk menyelamatkan hutan kita..[/URL]
[URL="http://kask.us/6747251"]10 Jalan raya Terindah dengan Pemandangan yang eksotik[/URL]
[URL="http://kask.us/6751494"]Mobil Paling Irit didunia dan Mendukung Green Campaign.. cekidot/6751494[/URL]
[URL=http://kask.us/6768601]Kontes Kecantikan di Hotel Prodeo..[Nyesal gag liat, sedikit BB..cekidot][/URL]
[URL=http://kask.us/6771482]Foto yang menguji Imajinasi agan2.. cekidot!!![/URL]

Singgah Juga ke :
[URL="http://www.kaskus.us/showthread.php?t=6142424"]Yamaha Byson Owner Lounge[/URL]
[URL="http://www.kaskus.us/showthread.php?t=4542456"]Arma 2 Lounge[/URL]
[/spoiler][/RIGHT]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)