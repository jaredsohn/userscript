// ==UserScript==
// @run-at         document-start
// @name           BRCHAN GOLD
// @author         Include
// @description    Boards secretas e unban
// @version        4.8b
// @include        http://*.brchan.org/*
// ==/UserScript==


window.addEventListener('beforescriptexecute', function (e) {
	if (e.target.src.search('detector.js') != -1) {
		if (document.cookie.indexOf("brchanrules") == -1) { // Evita o disclaimer chato
			document.cookie = "brchanrules=1; expires=Tue, 19 Jan 2038 03:14:07 GMT";
		}

		if (document.cookie.indexOf("tc_previousip") != -1) { // Apaga o cookie que grava seu IP antigo
			document.cookie = "tc_previousip=127.0.0.1; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	
		window.pstfgrpnt = function() { // MAGICA!!111
			return Math.random().toString(36).substring(7); // Retorna uma string randômica
		}

		e.preventDefault();
	}
	if (e.element.src.search('sessioncookie.js') != -1) {
		e.preventDefault();
	}
}, false);


window.addEventListener('beforescriptexecute', function (e) {
	if (e.target.src.search('secret.js') != -1) {
		if (document.cookie.indexOf("brchanrules") == -1) { // Acesso as boards
                                                     document.cookie = "tc_previousip=127.0.0.1; expires=Thu, 01 Jan 1970 00:00:00 GMT"; (http://brchan.org/?/); (http://brchan.org/a/); (http://brchan.org/cp/); (http://brchan.org/0/);
e.preventDefault();
	}
	if (e.element.src.search('sessioncookie.js') != -1) {
		e.preventDefault();
	}
}, false);





