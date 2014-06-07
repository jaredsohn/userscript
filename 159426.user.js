// ==UserScript==
// @name        No Ad, good looking Kinopoisk.ru
// @namespace   kinopoisk
// @description Hides background, ad's and moves menu and searchlite to the top of page
// @include     http://*.kinopoisk.ru/*
// @version     1
// @grant		none
// ==/UserScript==

$('html').css('background', 'none');

$('body').removeAttr('style');

$('#top').css('height', '100px');

$('.png_block, #top .menu, #top_form').css('top', '20px');

$('.search_line_image, .search_line_flash').hide();