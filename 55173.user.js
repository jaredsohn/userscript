// ==UserScript==
// @name           diena.lv bez reklāmām
// @description    Mazliet attīra un novāc reklāmas no portāla diena.lv
// @include        http://www.diena.lv/*
// @require        http://www.diena.lv/js/jquery-latest.js
// @namespace      http://userscripts.org/users/102772
// ==/UserScript==


$('#ht', 'body').remove();

$('#BANNER_120x600_tornis', 'body').remove();
$('#BANNER_210x200_mazais', 'body').remove();
$('#BANNER_250x120_special', 'body').remove();
$('#BANNER_250x250_kvadrats_1', 'body').remove();
$('#BANNER_250x250_kvadrats_2', 'body').remove();
$('#BANNER_250x250_kvadrats_3', 'body').remove();
$('#BANNER_300x600_lielais', 'body').remove();
$('#BANNER_340x55_centrs', 'body').remove();
$('#BANNER_800x35_slidrinda', 'body').remove();
$('#BANNER_900x500_top', 'body').remove();
$('#banner_980x90', 'body').remove();
$('#BANNER_980x45_sponsora', 'body').remove();
$('#BANNER_fullsplit_sides', 'body').remove();
$('#BANNER_fullsplit', 'body').remove();
$('#BANNER_starp_virsrakstu_un_attelu', 'body').remove();
$('#BANNER_raksta_zem_city24', 'body').remove();
$('#BANNER_TextLinesAll', 'body').remove();

$('#baneris', 'body').remove();
$('#city24-wrapper', 'body').remove();
$('#city24-wrapper_390', 'body').remove();
