// ==UserScript==
// @name              Ukrywanie reklamy z urwiska 
// @namespace         http://www.wykop.pl/ludzie/artur125/
// @description       Ukrywa reklamę z urwiska + rozwija listę wykopów z urwiska  
// @author            Artur125
// @version           1.0
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () {
	$(document).ready(function($) {	
                 $('article.newmarket').removeClass('dnone');
                 $("article.newmarket:contains('wykop market')").hide();
                 $('a.prev-link').hide();
                 $('a.next-link').hide();
		
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)