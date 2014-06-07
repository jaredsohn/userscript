// ==UserScript==
// @name           Huuto.net remove new products from view
// @namespace      http://www.huuto.net
// @description    As there is no option to exclude brand new items from huuto.net search results, this script removes annoying new items from search results.
// @include        http://www.huuto.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


$('.showlist_td_5_1').prepend('<p class="hidden">Uudet tuotteet piilotettu <a href="#" class="showhidden">näytä uudet tuotteet</a></p><p class="visible">Uudet tuotteet näkyvillä <a href="#" class="hide">piilota uudet tuotteet</a></p>');

$('img[alt*="UUSI"]').closest('tr').hide();

$('#hise_dynsearch').closest('tr').hide();

$('.visible').hide();

$('.showhidden').click(function() {
	$('img[alt*="UUSI"]').closest('tr').show();
	$('.hidden').hide();
	$('.visible').show();
});

$('.hide').click(function() {
	$('img[alt*="UUSI"]').closest('tr').hide();
	$('.hidden').show();
	$('.visible').hide();
});