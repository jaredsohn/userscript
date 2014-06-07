// ==UserScript==
// @name	İş Güvenliği Uzaktan Eğitim Saat Saydırıcısı
// @author	ayhanabi@hotmail.com
// @description	Uzaktan eğitimde 90 saati doldurmayı sağlar. Egitim sayfasına login olup bilgisayarı açık bırakın. Ekran koruyucusunu ve hipernationı kapatın. Egitim URLsini @include ile eklemeyi unutmayın.
// @version	1.0.0
// @run-at	document-end
// @grant	none
//
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//
// @include	/^https?://(www\.)?uzesumer\.com/.*/
// @include	/^https?://(www\.)?uzepusula\.com/.*/
// ==/UserScript==

$(function() {
   setInterval(function() {   
     location.reload();
   }, 60000); // 1000 milisaniye = 1 saniye
});
