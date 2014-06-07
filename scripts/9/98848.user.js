// ==UserScript==
// @name           Keyboard Buy
// @namespace      http://userscripts.org/
// @description    Buy from your keyboard
// @version        1
// @include        http://s*.travian.*/dorf*
// @include        http://www.travian.org/dorf*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var KeyboardBuy = {

	init: function() { 
		KeyboardBuy.registerEvents();
	},
	buy: function() { 
		window.location = window.location.protocol + "//" + window.location.host + window.location.pathname + "?buildingFinish=1";
	},
	registerEvents: function() { 
		$(document).keypress(function(event) { // main keypress listener
			switch (event.charCode) {
				case 98: // key 'b'
					KeyboardBuy.buy();
					break;
			}
		});
	}
};

$(function(){
	KeyboardBuy.init();
}); 