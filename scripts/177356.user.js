// ==UserScript==
// @name                BlueJay Labs Check Answers
// @author              Chet Manley
// @version             0.1
// @description         Automatically checks all radio buttons
// @include             https://www.mturkcontent.com/*
// @require             http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// v0.1, 2013-09-07     Automatically checks the radio buttons.
//                      ---------------------------------------------------------------------------

$('div.step td.bad.columnradio > input').prop('checked', 'true');
$('div.step:first td.good.columnradio > input').prop('checked', 'true');