// ==UserScript==
// @name           experts-exchange.com cleaner
// @author         Devether <devether@gmail.com>
// @namespace      muxxu
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://buzzy.260mb.com/AutoUpdater.js
// @include        http://www.experts-exchange.com/*
// @description    Removes ads and puts answers on top.
// @version        1.0.0
// ==/UserScript==

var version = "1.0.0";
var usCode = 96956;

( function() {

	// add a console function
	var l;
	if (typeof uW.console === 'object' && typeof uW.console.log === 'function') {
		l = uW.console.log;
	} else {
		l = function() {
			return false;
		};
	}
	
	// The script
	var EECleaner = ( function() {

		
		var clean = function(){			
			
			$('#pageMain .question .answers').remove();
			$('#pageMain .allZones').remove();
		};

	}());
	
	
	
	var cleaner = new EECleaner();
	cleaner.clean();
	autoUpdate(usCode, version);

}());