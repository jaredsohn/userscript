// ==UserScript==
// @name                ask.fm deanonimizer

// @description         Automatically uncheck the ask.fm "ask anonymous" checkbox
// @namespace           https://hugo.barrera.io/userscripts
// @include             *ask.fm/*
// @require             http://code.jquery.com/jquery-2.1.0.min.js
// @version             1
// ==/UserScript==

$('input#question_force_anonymous  ').attr('checked', false);
