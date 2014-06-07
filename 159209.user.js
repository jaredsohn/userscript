// ==UserScript==
// @name			General Alert
// @autor			Vovochka
// @version			0.0.0
// @include			http://s*.*.ikariam.*/*
// ==/UserScript==

(function(){
	var TO = 25000;
	// js_GlobalMenu_military, js_GlobalMenu_cities
	var oldAdvisor = document.getElementById("js_GlobalMenu_military").className;
		
	setTimeout(function(){
		var newAdvisor = document.getElementById("js_GlobalMenu_military").className;
		if(newAdvisor != oldAdvisor)
			alert("\u0428\u0443\u0445\u0435\u0440! \u0412\u0440\u0430\u0436\u0438\u043d\u0430 \u0438\u0434\u0451\u0442!");
		else
			setTimeout(arguments.callee,TO);
		
		oldAdvisor = newAdvisor;
	},TO);
})();