// ==UserScript==
// @name           Ukrywacz Nieobecnosci 2.1
// @namespace      hash010a01241baba012 
// @include        http://dziennik.librus.pl/*
// @include        http://dziennik.librus.pl/przegladaj_oceny/*
// @include        http://dziennik.librus.pl/przegladaj_oceny/*
// @include        https://dziennik.librus.pl/przegladaj_oceny/szczegoly/1059713
// @include        http://dziennik.librus.pl/przegladaj_oceny/szczegoly/1059713
// @grand          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

// updated.

$(document).ready(function(){
  $('body').hide();
	//$(".KolTab:contains('2011-11-29 (wt.)')").parent().hide().remove();
 
  $('div#centrowanie table.TabelaSzeroka tbody tr.wiersz1 td.KolTab p.box a').hide();  
  $('.box a[href*="szczegoly/132963"]').show();
  $('.box a[href*="szczegoly/523000"]').show();
  $('.box a[href*="szczegoly/1059713"]').show().html('5');;  
	//$(".KolTab:contains('Historia')").next('td').html('Brak ocen');
	$(".KolTab:contains('Historia')").next('td').next('td').html('5.00');
	$(".KolTab:contains('Historia')").next('td').next('td').next('td').next('td').next('td').next('td').next('td').html('5.00');
  
  $('.NaglowekTab:first').next('td').html('5');
  
});