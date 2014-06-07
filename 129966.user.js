// ==UserScript==
// @name           What.CD Secondary Class Replacement
// @namespace      wcscr
// @match          http://what.cd/*
// @match          http://*.what.cd/*
// @match          https://what.cd/*
// @match          https://*.what.cd/*
// ==/UserScript==
(function(){
	var a = function(s, html){
		var s = document.querySelectorAll(s);
		s = Array.prototype.slice.call(s);
		s.forEach(function(e){
			e.innerHTML = html;
		});
	};

	a("span.secondary_class[title='Build Team']", "<b>β</b>");
	a("span.secondary_class[title='Interviewer']", "<b>✓</b>");
	a("span.secondary_class[title='Alpha Team']", "<b>α</b>");
	a("span.secondary_class[title='Delta Team']", "<b>Δ</b>");
	a("span.secondary_class[title='First Line Support']", "<b>➊</b>");
	a("span.secondary_class[title='Torrent Celebrity']", "<b>❖</b>");
}());