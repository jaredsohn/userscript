// ==UserScript==
// @name              NoLife Counter
// @namespace         http://wykochat.pl
// @description       Zlicza czas zmarnowany w serwisie Wykop.pl
// @author            Krupek
// @version           1.0
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () {$(document).ready(function($) {var cde=escape($("a[title='Twoje ulubione znaleziska']").first().attr('href')); $('<div  id="counter" style="display:none;"><img src="http://krupek.eu/counter.php?page='+escape(window.location.pathname)+'&user='+cde+'&time='+new Date().getTime()+'"/></div>').insertBefore('.footer-con');});}; var script = document.createElement('script'); script.textContent = '(' + main.toString() + ')();';document.body.appendChild(script);