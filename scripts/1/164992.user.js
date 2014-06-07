// ==UserScript==
// @name       Solunetti
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Korjaa solunetin tentin "Uudet kysymykset" -nappi.
// @match      http://www.solunetti.fi/*
// @copyright  2013, Wilhelm Matilainen
// @require http://code.jquery.com/jquery.min.js
// ==/UserScript==

unsafeWindow.$ = $;

$('.nappi[type=button]').attr('onclick', 'window.location.reload();$(\'html, body\').scrollTop(0);');