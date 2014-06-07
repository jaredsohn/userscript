// ==UserScript==
// @name       auto-download-www3
// @include     http://www3*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

$('#down_btn').removeAttr('onclick')
document.getElementById('down_btn').click()