// ==UserScript==
// @name         Onda_Cero_Mejorizer
// @version      1.1
// @description  Onda Cero is a spanish radio station. Its live audio URL is filled with adds and crap. This Script simply removes all that bullshit from it. The URL affected is http://www.ondacero.es/directo/
// @include      *://*.ondacero.*/directo*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @copyright    2014, Juan Prada
// @update       http://www.silueth.com/app/tampermonkey/Onda_Cero_Mejorizer.tamper.js
// ==/UserScript==


$(document).ready(function() {
    $('div.mod_roba_principal').remove();
    $('div.grid_4.omega').remove();
    $('div.mod_publi').remove();
    $('div.shell_1').children('div.shell_2').children('div.container_12').remove();
    $('div.data').children('div.clearfix').remove();
    $('div.grid_8').children('div.mod_chapter').remove();
    $('div.grid_8').find('div.separator').remove();
    $('div.grid_8').find('div.grid_4').remove();
    $('div.shell_1').css('background','none');
});
