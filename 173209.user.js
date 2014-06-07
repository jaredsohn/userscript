// ==UserScript==
// @name			Wordtwist keyboard shortcuts
// @sourcescript	http://userscripts.org/scripts/review/114745
// @include			http://www.wordtwist.org/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version			0.1
// ==/UserScript==

jQuery.noConflict();

(function() {		
	function init() {
		window.location.href = 'http://www.wordtwist.org/init.php';
	}
	
	function init4x4() {
		window.location.href = 'http://www.wordtwist.org/init4.php';
	}
	
	function init5x5() {
		window.location.href = 'http://www.wordtwist.org/init5.php';
	}
	
	function startPlay() {
		window.location.href = document.querySelector('div#newgameboard p a').getAttribute('href');
	}
	
	function start() {
		var evt = new MouseEvent('click');
		document.getElementById('start').dispatchEvent(evt);
	}
		
	jQuery(document).keydown(function (e) {
		element = e.target;
		if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;//if cursor on a textarea or input, disable hotkey
		tecla = String.fromCharCode(e.which).toLowerCase();
		if (tecla == "f" && !e.shiftKey && !e.ctrlKey && !e.altKey) { init(); }
		else if (tecla == "e" && !e.shiftKey && !e.ctrlKey && !e.altKey) { init4x4(); }
		else if (tecla == "r" && !e.shiftKey && !e.ctrlKey && !e.altKey) { init5x5(); }
		else if (tecla == "s" && !e.shiftKey && !e.ctrlKey && !e.altKey) { startPlay(); }
		else if (tecla == ";" && !e.shiftKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); start(); }
	});

})();
