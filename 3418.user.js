// ==UserScript==
// @name          Yahoo! Mail Remove Avator
// @description	  Removes the yahoo avatar from the your Yahoo! Mail Homepage
// @include       http://*mail.yahoo.com/*
// @include       http://us.f354.mail.yahoo.com/*
// ==/UserScript==


document.getElementById('AvtTD').innerHTML = '';
document.getElementById('AvtTD').width = '0';