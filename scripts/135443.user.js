// ==UserScript==
// @name bmg
// @description BmBG
// @author Nop
// @license MIT
// @version 1.0
// @include 
// ==/UserScript==

(function(window, undefined) {

	var w;
	if (typeof unsafeWindow != undefined) {
		w = unsafeWindow
	} else {
		w = window;
	}

	if (w.self != w.top) {
		return;
	}

	// [4] дополнительная проверка наряду с @include
	if (/.com/.test(w.location.href)) {
		//Ниже идёт непосредственно код скрипта
		alert("Userscripts приветствует вас навязчивым окном.");
	}
})(window);