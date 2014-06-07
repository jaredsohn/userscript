// ==UserScript==
// @id             block-unload-events
// @name           Block unload events
// @version        1.0
// @namespace      
// @author         Tenno Seremel
// @description    
// @include        *
// @run-at         document-start
// @homepage http://userscripts.org/scripts/show/477070
// @updateURL http://userscripts.org/scripts/source/477070.user.js
// ==/UserScript==
(function(){
	function eat_event(e){
		e.stopImmediatePropagation();
	}
	window.addEventListener("beforeunload", eat_event, true);
	window.addEventListener("unload", eat_event, true);
})();
