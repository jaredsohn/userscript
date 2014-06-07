// Zamunda.net script for Remove XXX links
// version 1.1
// 2010-03-23
// Copyright (c) 2010, Hasan Köroğlu
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name          Zamunda Remove Adult Content
// @include       http://zamunda.net/browse.php*
// @include       http://www.zamunda.net/browse.php*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js


// ==/UserScript==
$(document).ready(function(){
    $("a[href='browse.php?cat=9']").parents('tr').remove();
    $("a[href='browse.php?cat=49']").parents('tr').remove();
    $("a[href='browse.php?cat=48']").parents('tr').remove();
    $("a[href='browse.php?cat=27']").parents('tr').remove();
});