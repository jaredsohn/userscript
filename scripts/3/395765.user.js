// ==UserScript==
// @name       extratorrent.cc Colour your favorite torrent
// @namespace  my page
// @version    1.0
// @description  add your torrent names by edit the script
// @include     *extratorrent.cc/*
// @copyright  2014, drakulaboy
// @require     http://code.jquery.com/jquery-1.6.4.js
// ==/UserScript==

$('table.tl td').filter(function () {
    return /Photoshop|Barefoot/.test(this.innerText);
}).closest('tr').css('background-color', '#40E0D0');