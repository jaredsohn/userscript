// ==UserScript==
// @name          Auto-Refreshing website (30 min) 
// @description   Auto-Refreshing website (30 min) 
// @version       1.0.0
// @copyright     2011 Alfred Dagenais
// @namespace     http://www.alfreddagenais.com
// @include       *
// @debug         0
// ==/UserScript==

(function() {
	var km_timer_minutes = 30; // Minutes to wait before reloading
	var km_timer_redirection = false;
	function km_timer_reload() {
		if( km_timer_redirection ){
			window.location = window.location;
		}else{
			setTimeout("km_timer_reload()", ( km_timer_minutes * 60 * 1000));
			km_timer_redirection = true;
		}
	}
	km_timer_reload();
})();


