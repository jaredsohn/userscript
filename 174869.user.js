// ==UserScript==
// @id             nnm-club.me-2b4079ab-7519-4e82-a1a0-980489b4706f@scriptish
// @name           nnm-club anti redirect
// @version        1.0.0
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/174869
// @author         Black_Sunlight
// @description    Убирает дурацкий редирект для Москвы
// @include        http://nnm-club.me/
// @include        http://nnm-club.ru/
// @include        http://nnm-club.me/*
// @include        http://nnm-club.ru/*
// @run-at         document-start
// ==/UserScript==

var changed = 1;

window.addEventListener('beforescriptexecute', function(e) {

	src = e.target.src;
	if (src.search(/geoip\.js/) != -1) {
                changed--;
		e.preventDefault();
		e.stopPropagation();
	};

	if(changed == 0) window.removeEventListener(e.type, arguments.callee, true);

}, true);
