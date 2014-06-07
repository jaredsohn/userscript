// ==UserScript==
// @name          STSRefresh
// @namespace     by_Shin82
// @description   Refresh page from server, NO Cache!
// @author 		  Shin82
// @version       1
// ==/UserScript==

window.onload = function() {
	this.addEventListenr('onbeforeunload', function(e) {
		e.preventDefault();
		this.setTimeout(function() {
			window.location.reload(true);
		}, 5000);
		
	}, false);
};