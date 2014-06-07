// ==UserScript==
// @id             Aljazeera
// @name           AlJazeera
// @version        1.0.0
// @history        1.0.0 
// @namespace      www.userscripts.com
// @author         Plato
// @description    Stop redirect
// @include        http://www.aljazeera.com/
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
