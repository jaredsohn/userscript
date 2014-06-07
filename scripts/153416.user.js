// ==UserScript==
// @name	Pokazywarka wykopo i zakopowiczów +
// @namespace	http://userscripts.org/scripts/show/153416
// @author	kasper93, oparte na pomyśle i wykonaniu przez owczareknietrzymryjski
// @description	Skrypt pokazuje przy komentarzach czy ktoś zakopał / wykopał dane znalezisko 
// @include     http://*wykop.pl/link/*
// @downloadURL	https://userscripts.org/scripts/source/153416.user.js
// @updateURL	https://userscripts.org/scripts/source/153416.meta.js
// @version	1.0.3
// @grant	none
// @run-at	document-end
// ==/UserScript==

function main() {
	$(function () {
		var id = /link\/(\d*)\//.exec(document.location.pathname)[1];
		var $this = $('header strong[class="fbold"]', '#comments-list-entry');

		$.getJSON("http://www.wykop.pl/ajax/link/dug/" + id, function (data) {
			var people = szukaj(/<span class="abs top10 left45">(.*)<\/span>/g, data.html);

			$this.filter(function () {
				return people.indexOf($(this).text()) != -1;
			}).closest('header').append('<span class="small color-0 fbold">(wykopał)</span>');
		});

		$.getJSON("http://www.wykop.pl/ajax/link/buried/" + id, function (data) {
			var reason = [];
			var reasons = szukaj(/<td class="pding10_0 tcenter brtopda vmiddle">([a-zęść ]+)<\/td>/g, data.html);
			var people = szukaj(/<span class="hvline">(.*?)<\/span>/g, data.html);

			$this.filter(function () {
				var n = people.indexOf($(this).text());
				if (n != -1) {
					reason.push(reasons[n]);
					return true;
				}
			}).closest('header').each(function (i) {
				$(this).append('<span class="small color-2 fbold">(' + reason[i] + ')</span>')
			});
		});
	});

	function szukaj(r, s) {
		var a = [], m;
		while (m = r.exec(s)) {
			a.push(m[1]);
		}
		return a;
	};
};

if (typeof $ == 'undefined') {
	if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
		var $ = unsafeWindow.jQuery;
		main();
	} else {
		addJQuery(main);
	}
} else {
	main();
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
};