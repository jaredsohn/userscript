// ==UserScript==
// @name                KASKUS Signature Auto Paste
// @description         Pasang signature di kaskus secara Otomatis TAnpa Membebani ServerKaskus
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @author              mHc@DAL.net
// ==/UserScript==

var signature = "[COLOR=Red]Wajib Dikunjungi:[/COLOR]\n[QUOTE]\n[B][U]Longue[/U][/B]\n[URL=http://kask.us/4617414]Agro Wisata di Kab Banyuwangi[/URL]\n[URL=http://kask.us/4548773]Mau tau Reputasi Bar berbalok balok = berapa point?[/URL]\n[URL=http://kask.us/4578164][Positif dan Negatif] Elektronik rokok atau e-cigarette[/URL]\n[URL=http://kask.us/4850879]Fasilitas Mewah Anggota DPR, Kinerja Rendah[/URL][/QUOTE]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)