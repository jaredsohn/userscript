// ==UserScript==
// @name           Saringan Sampah Politikana
// @namespace      http://wongiseng.co.cc
// @description    Menyembunyikan komentar orang-orang yang mengganggu anda di Politikana
// @include        http://politikana.com
// @include        http://politikana.com/*
// @include        http://politikana.com/baca/*/*/*/*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(function () { 	

    var arrayTokohPengganggu = new Array();

    /* Link ke profile page user yang menurut anda mengganggu, silahkan tambahkan di sini*/
    arrayTokohPengganggu.push('http://politikana.com/profil/gajahmada.html');
    arrayTokohPengganggu.push('http://politikana.com/profil/fatamorgana.html');

    /* Periksa link user ada dalam array black list atau tidak, fixed/shortened by HoD */
     function apakahMengganggu(profilPenulis) {
             return arrayTokohPengganggu.indexOf(profilPenulis) >= 0;
     }

    /** Untuk filtering main page */
    if(window.location.href=="http://politikana.com/" || window.location.href=="http://politikana.com" || window.location.href.match("arsip")){

          /** Asumsi-asumsi:  
		Struktur berita terbaru (li span.small a)         : <li> <span class=small > <a href="penulis"></a></span></li>
           	Struktur stream komentar (li span.byline a)       : <li> <span class=byline> <a href="penulis"></a></span></li> 
	   	Struktur berita front page (li p.byline a)        : <li> <p    class=byline> <a href="penulis"></a></p>   </li>
		Struktur judul berita di arsip (td span.byline a) : <td> <span class=byline> <a href="penulis"></a></span></li>
	   */

	   $("li span.small a, li span.byline a, li p.byline a, td span.byline a").each(function(){ 
		penulisIni = $(this).attr("href");
		if(apakahMengganggu(penulisIni)){
			$(this).parent().parent().hide();
		}
		return true;
	   });
	
    } else {
          /** Asumsi struktur komentar di artikel: 
			<dt> <a href="penulis" class=comment-author></a></dt>
			<dd> isi komentar </dd>
	    */    		

	    $("dt a.comment-author").each(function(){ 
		penulisIni = $(this).attr("href");
		if(apakahMengganggu(penulisIni)){
			/* Hapus <dt> */
			$(this).parent().hide(); 
			/* Hapus <dd> */			
			$(this).parent().next().hide();
		}
		return true;
	    });
   }   
});