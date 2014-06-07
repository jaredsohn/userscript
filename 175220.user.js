// ==UserScript==
// @name       Anti-gente que usa hotmail y me hace scrollear
// @namespace  http://akhanubis.heroku.com/
// @version    0.1
// @description  enter something useful
// @match      http://mail.google.com/*
// @match      https://mail.google.com/*
// @copyright  2013+, Pablo Bianciotto
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

jQuery(document).on('click', function(e){
    a = document.getElementsByClassName('gs');
    for(var i=0; i < a.length; i++) a[i].innerHTML = a[i].innerHTML.replace(/---Original Message---[^]*/, '');
});