// ==UserScript==
// @name           More Informations For Kingdom
// @author         Devether <devether@gmail.com>
// @namespace      muxxu
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://buzzy.260mb.com/AutoUpdater.js
// @include        http://kingdom.muxxu.com/
// @description    Some additional useful informations on http://kingdom.muxxu.com/
// @version        1.0.0
// ==/UserScript==

var version = "1.0.0";
var usCode = 88886;

( function() {

	// access to window object cross-browser
	var uW;
	if (typeof unsafeWindow === 'object') {
		uW = unsafeWindow;
	} else {
		uW = window;
	}

	// get jQuery
	//var $ = uW.jQuery;

	// add a console function
	var l;
	if (typeof uW.console === 'object' && typeof uW.console.log === 'function') {
		l = uW.console.log;
	} else {
		l = function() {
			return false;
		};
	}
	
	// Object.create() by Douglas Crockford
	if (typeof Object.create !== 'function') {
		Object.create = function(o) {
			var F = function() {
			};
			F.prototype = o;
			return new F();
		};
	}
	
	// The script
	var Kingdom = ( function() {

		
		var getNbNourriture = function(){			
			return $('table.homeres td:first div.homegest span.n').text();			
		};
		
		var getToursNourriture = function(){			
			var number = $('table.homeres td:first div.homegest p.number').text().split("/");
			return number[0];		
		};
		
		var getNbOr = function(){			
			return $('table.homeres td:last div.homegest span.n').text();			
		};
		
		var getToursOr = function(){			
			var number = $('table.homeres td:last div.homegest p.number').text().split("/");
			return number[0];		
		};
		
		return function() {
		
			var nbNourriture = getNbNourriture();
			var toursNourriture = getToursNourriture();
			var nbOr = getNbOr();
			var toursOr = getToursOr();
			
			var nbToursNourriture 	= Math.round(nbNourriture/Math.abs(parseInt(toursNourriture)));
			var nbToursOr 			= Math.round(nbOr/Math.abs(parseInt(toursOr)));
			
			$('table.homeres td:first div.homegest').append('<p>'+nbToursNourriture+' tour'+((nbToursNourriture > 1) ? 's' : '')+' restant'+((nbToursNourriture > 1) ? 's' : '')+'</p>');
			$('table.homeres td:last div.homegest').append('<p>'+nbToursOr+' tour'+((nbToursOr > 1) ? 's' : '')+' restant'+((nbToursOr > 1) ? 's' : '')+'</p>');
			
			
		}

	}());
	
	
	
	Kingdom();
	autoUpdate(usCode, version);

}());