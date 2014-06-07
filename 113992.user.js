// ==UserScript==
// @name           Die FB Ticker Die
// @description    Removes the FB ticker and FB games ticker from the top right corner
// @include        http*://*.facebook.*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.1.1
// @copyright      Charlie Ewing

// ==/UserScript== 
(function() { 

	var version = "0.0.1";

	function run(){
		var node = document.getElementById('pagelet_rhc_ticker') || document.getElementById('pagelet_ticker');
		if (node) node.style.display="none";
		window.setTimeout(run,1000);
	}
	window.setTimeout(run,500);
	
})(); // anonymous function wrapper end