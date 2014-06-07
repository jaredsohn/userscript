// ==UserScript==\par
// @name           Facebook Sasak Lombok 
// @namespace      http://kumpulancara.com/\par
// @description    Replaces Bahasa Indonesia words to Base Sasak Lombok\par
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// @include        http://*.facebook.com/
// @copyright      Modified by Daenk Rhapy inspired by Mushon Zer-Aviv "Don't "Friend" me!" base on By JoeSimmons "Replace Text On Webpages"\par
// @version        1.0.00\par
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/us/\par
// ==/UserScript==\par
\par
var words = \{\par
///////////////////////////////////////////////////////\par
// Syntax: 'Silak Batur Te Kadu nike adek sak Molah',\par
// Syntax: 'Search word' : 'Replace word',\par
///////////////////////////////////////////////////////\par
"ada" : "arak",\par
"Ada" : "Arak",\par
"Anda" : "Side",\par
"Apa" : "Ape",\par
"Bacalah" : "Bace bae",\par
"Bagikan" : "Bagikne",\par
"bahasa" : "base",\par
"Bahasa" : "Base",\par
"banyak" : "luek",\par
"belum" : "ndek man",\par
"Beranda" : "Teras",\par
"Beriklan" : "Pasang Iklan",\par
"bepergian" : "Lalo",\tab\par
"berkat" : "lantaran",\par
"berteman" : "bebaturan",\par
"Berteman" : "Bebaturan",\par
"Buat" : "Buat",\par
"Cari" : "Boyak",\par
"Catatan" : "Catetan",\par
"Cobalah" : "Coba'n",\par
"Colek" : "Colet",\par
"Colek Kembali" : "Colet Malik",\tab\par
"dalam" : "dalem",\par
"dan" : "kance",\par
"dari" : "leman",\par
"dengan" : "kance",\par
"Foto" : "Poto",\par
"Gunakan" : "Kadu",\par
"Halaman" : "Leleah",\par
"Harap" : "Moge",\par
"Indonesia" : "Lombok",\par
"ini" : "ene",\par
"Jalin" : "Sambung",\par
"jika" : "mun",\par
"Kabar Berita" : "Kabar Berite",\par
"kami" : "Facebook",\par
"Kelola" : "Kelolaq",\par
"Keluar" : "Sugul",\par
"Ketentuan" : "Ketentuan",\par
"ketentuan" : "ketentuan",\par
"kini" : "nani",\par
"komentar" : "uni",\par
"Komentari" : "Tulis Uni",\par
"Kunjungi" : "Silak kunjung",\par
"Lacak" : "Lacak",\par
"lain" : "lain",\par
"Lainnya" : "Lain ne",\par
"lainnya" : "lain ne",\par
"Lampirkan" : "Lampiran",\par
"Laporkan" : "Laporan",\par
"layanan" : "layanan",\par
"Lebih" : "Lebih",\par
"Lihat Semua" : "Gitak Selapuk",\par
"masukkan" : "Petamak",\par
"melalui" : "leman",\par
"mengomentari" : "puniqan",\par
"meninggalkan" : "bilin",\par
"menyukai" : "demen",\par
"mereka" : "nie",\par
"nama" : "aran",\par
"orang" : "dengan",\par
"Paling Baru" : "Paling baru",\par
"Pemberitahuan" : "Pembadaq",\par
"Pencarian" : "Pemboyaan",\par
"Pengaturan" : "Pengaturan",\par
"Permainan" : "Pekedekan",\par
"Permintaan" : "Pengendengan",\par
"Pertemanan" : "Bebaturan",\par
"Pesan" : "Pesen",\par
"pikirkan" : "pikiran",\par
"Pusat" : "Pusat",\par
"saat" : "saat",\par
"saja" : "bae",\par
"Saya" : "Tiang",\par
"sebagai" : "Maraq",\par
"sedikit" : "sekedik",\par
"sekarang" : "Nani",\par
"Sembunyikan" : "Sebok",\par
"Semua" : "Selapuk",\par
"Siapa" : "Sai",\par
"sini" : "te",\par
"suka" : "demen",\par
"Suka" : "Demen",\par
"sama" : "pade",\par
"Sunting" : "kerisak",\par
"Tambahkan" : "Rombokn",\par
"Tautan" : "Tautan",\par
"Teman" : "Batur",\par
"Temukan" : "Boyaq",\par
"Tentang" : "Tentang",\par
"tentang" : "tentang",\par
"Terhubung" : "Nyambung",\par
"Tetap" : "Tetep",\par
"Tidak" : "Ndek",\par
"Ulang Tahun" : "Ulang Taun",\par
"Undang" : "Undang",\par
"undangan" : "undangan",\par
"untuk" : "untuk",\par
"Upload" : "Unggah",\par
"Video" : "Vidio",\par
"yang" : "sak",\par
\par
\par
"jalin hubungan kembali dengannya" : "Silak jalin hubungan malik",\par
"kepadanya" : "jok nie",\par
"yang lalu" : "Sak laek",\par
"Terima Kasih" : "Tampi Asih",\par
"Berita Populer" : "Berite Populer",\par
"Mafia Wars Game" : "Perang Mafia",\par
"sudah menggunakan" : "Wah ngadu",\par
"dengan akun" : "kadu akun",\par
"mulailah berhubungan" : "mulaian berhubungan",\par
"Cari Teman" : "Boyak batur",\par
"adalah teman bersama" : "ne batur bebarengan",\par
"Ngobrol dengan Teman" : "Ngeraos kance batur",\par
"Jadikan Online" : "Piakn Online",\par
"Teman-teman" : "Batur-batur",\par
"permintaan pertemanan" : "Endeng bebaturan",\par
///////////////////////////////////////////////////////\par
"":""\};\par
\par
//////////////////////////////////////////////////////////////////////////////\par
// Kodena, ulah diropea iwal mun wanoh kana Javascript\par
// This is where the real code is\par
// Don't edit below this\par
//////////////////////////////////////////////////////////////////////////////\par
\par
// prepareRegex by JoeSimmons http://userscripts.org/scripts/review/41369\par
// Used to take a string and ready it for use in new RegExp()\par
String.prototype.prepareRegex = function() \{\par
return this.replace(/([\\[\\]\\^\\&\\$\\.\\(\\)\\?\\/\\\\\\+\\\{\\\}\\|])/g, "\\\\$1");\par
\};\par
\par
function isOkTag(tag) \{\par
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);\par
\}\par
\par
var regexs=new Array(),\par
\tab replacements=new Array();\par
for(var word in words) \{\par
if(word != "") \{\par
regexs.push(new RegExp("\\\\b"+word.prepareRegex().replace(/\\*/g,'[^ ]*')+"\\\\b", 'gi'));\par
replacements.push(words[word]);\par
\}\par
\}\par
\par
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";\par
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) \{\par
\tab if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) \{\par
\tab for(var x=0,l=regexs.length; x<l; x++) \{\par
\tab text = text.replace(regexs[x], replacements[x]);\par
\tab this_text.textContent = text;\par
\tab\}\par
\tab\}\par
\}\par
}
