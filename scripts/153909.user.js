// ==UserScript==
// @name       Remove Gmail Message Preview
// @namespace  http://banholzer.me/
// @version    0.1
// @description  Removes the Gmail Message Preview Line
// @match      https://mail.google.com/mail/u/0/*
// @copyright  2012+, Ueli Banholzer
// ==/UserScript==

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.apB { display: none; } .xY.apA, .xY.apE { padding: 0 !important; padding-bottom: 7px; } .apd { padding-top: 0 !important; padding-bottom: 7px !important; }';
document.getElementsByTagName('head')[0].appendChild(style);
