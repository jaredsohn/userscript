// ==UserScript==
// @name shpaleri
// @description sckipt for spaleri.com.ua
// @include http://shpaleri.com.ua/*
// ==/UserScript==
function show_hide('top_menu'){
    document.getElementById('top_menu').style.display='none'; // Скроет слой
    document.getElementById('top_menu').style.display = 'block'; //покажет
}