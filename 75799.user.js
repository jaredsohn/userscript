// ==UserScript==
// @name           chessbomb.filter
// @namespace      http://collective.no/greasemonkey/
// @description    Filter chat on chessbomb to exclude general chatter
// @author         Simon Skrede
// @homepage       http://collective.no/greasemonkey/
// @include        http://livechess.chessdom.com/*
// ==/UserScript==

(function(){

if( typeof unsafeWindow.jQuery != 'function' ){
	// Could not locate jQuery, must not be livechess... just return.
	return;
}

var $ = unsafeWindow.jQuery;

$(document).ready(function () {

	var simpub = unsafeWindow.simpub;
	var _onMessage = simpub.onMessage;

	simpub.onMessage = function(c){

		c.items = $.grep( c.items, function( item, n ){

			if( typeof item.payload.c != 'undefined' ){
				return item.payload.c != 1;
			} else {
				return true;
			}
		});

		_onMessage(c);
	}

});

})();
