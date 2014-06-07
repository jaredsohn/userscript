// ==UserScript==
// @name       Sortowanie opcji wyboru
// @version    1
// @include    *hegira.com.pl/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @copyright  2014, Igorogi
// ==/UserScript==

/**
 * @return {number}
 */
 function NASort(a, b) {
 return (a.innerHTML > b.innerHTML) ? 1 : -1;
 }

 $('select').each(function( index ) {
 $(this).find('option').sort(NASort).appendTo($(this));
 });