// ==UserScript==
// @name        Google Analytics Disabler
// @namespace   kobachi
// @include     *
// @version     0.1
// ==/UserScript==

(function(){
	var ga = false;
	Array.forEach(document.querySelectorAll("script"), function(s){
		if(s.innerHTML && 0 < s.innerHTML.indexOf(".google-analytics.com/ga.js")){
			s.parentNode.removeChild(s);
			ga = true;
		}
	});
	if(ga){
		window._gaq = {};
		window._gaq.length = 0;
		window._gaq.push = function(){
			console.log.apply(console.log, arguments);
		};
		document.addEventListener("DOMContentLoaded", function(){
			delete window._gat;
			delete window.gaGlobal;
		});
	}
})();
