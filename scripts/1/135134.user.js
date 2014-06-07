// ==UserScript==
// @name              Ładne linki na Wykopie
// @namespace         http://kamdz.pl
// @description       Skrypt zamienia linki do znalezisk i komentarzy na bardziej przyjemne.
// @author            Kamil "kamdz" Dzwonkowski
// @version           1.0
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () {
	$(document).ready(function ($) {
		$('a:contains("http://www.wykop.pl/")').live('hover', function () {
			var link = this;
			var type;
			if ($(link).text().match(/^http:\/\//)) {
				if (link.href.indexOf('#') != -1)
					type = ' - Komentarz';
				else
					type = ' - Znalezisko';
				$.get(link.href, function (html) {
					$(link).text(html.match(/<title>(.*?)<\/title>/)[1].slice(0, -11) + type);
				});
			}
		});
		
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
