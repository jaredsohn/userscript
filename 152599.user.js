// ==UserScript==
// @name        Dagblad De Limburger change page title
// @namespace   http://www.limburger.nl
// @description Changes the title of the page to reflect the article name and the date/time
// @include     http://www.limburger.nl/article/*
// @version     1
// ==/UserScript==
document.title = document.getElementsByTagName('h1')[0].innerHTML + ' - ' + (/.*laatste update: (.*)/g).exec(document.querySelector('p.published').innerHTML)[1] + ' - Dagblad De Limburger';