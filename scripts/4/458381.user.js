// ==UserScript==
// @name         Writing.com Timer Bypass
// @namespace    http://userscripts.org/users/zackton
// @description  Bypasses the timer and "click here" link.
// @include      http://www.writing.com/main/interact/item_id/*
// @grant        none
// @run-at       document-end
// @version      1.0
// ==/UserScript== 

var del = document.getElementById('chapterContentShow');
del.parentNode.removeChild(del);
$('#chapterContent').show();     
