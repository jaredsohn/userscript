// ==UserScript==
// @name Sprawdzator
// @namespace http://www.wykop.pl/ludzie/Dreszczyk
// @description Poszukuje spamerów.
// @author Dreszczyk
// @include http://*.wykop.pl/ludzie/*
// @version 0.2
// ==/UserScript==


// dodajemy przycisk w profilu
var main = function () 
{	
$(document).ready(function($) 
{
	
var nickname = $('.userstory h2').text();

$('a[title="Usuń z obserwowanych"], a[title="Dodaj do obserwowanych"]').after('<a href="http://sprawdzator.plamka.net/?osoba=' + nickname +'" class="button large obs various" id="iframe" style="margin-top:10px; width:110px;"><span>sprawdź ಠ_ರೃ</span></a>');



	$(".various").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});


});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)


// dodajemy FB js
var G_JQ_FC = document.createElement('script');
G_JQ_FC.src = 'http://www.plamka.net/mikrowykop/jquery.fancybox.pack.js';
G_JQ_FC.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(G_JQ_FC);
// dodajemy FB CSS
var G_JQ_FC_STYLE = document.createElement('link');
G_JQ_FC_STYLE.rel = 'stylesheet';
G_JQ_FC_STYLE.href = 'http://www.plamka.net/mikrowykop/jquery.fancybox.css';
G_JQ_FC_STYLE.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(G_JQ_FC_STYLE);

// sprawdzamy, czy jQuery jest załadowane
window.G_wait = function G_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { 
    window.setTimeout(G_wait,100); 
  } else { 
    $ = unsafeWindow.jQuery; start_fancy(); 
  }
}