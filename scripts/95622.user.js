// ==UserScript==
// @name           Lib.Game
// @namespace      script.betterday.co.uk
// @description    Ikariam: Game Object
// ==/UserScript==

/* author: Nick Sewell ( contact: script@betterday.co.uk ) */

/*
	use @require in your userscript header to include this module 

	@require http://script.betterday.co.uk/modules/game.js

	please do not copy/paste this code into your script
	if you must please include a link back to the original!

	if you have any ideas, comments or problems please mail them to me
*/

/* Released under the GPL license - http://www.gnu.org/copyleft/gpl.html */

game = function() {
	var _url = document.location.href;
	var _host = document.location.host.toLowerCase().split(".");
	var _language;
	var _server;
	var _world = _host[0];

	switch(_host.length) {
		case 3:
			 _server = _host[2];
			break;
		case 4:
			_server = _host[1];
			break;
		case 5:
			_server = _host[3];
			break;
		default:
			_server = false;
	}

	this.language = (_server == "com" || _server == "org"?"en":_server);

	this.server = _server;

	this.world = _world;
	
	this.url = _url;

	this.view = document.getElementsByTagName("body")[0].id;

	this.actionRequest = (function() { 
		var i = document.getElementById("changeCityForm").getElementsByTagName("fieldset")[0].getElementsByTagName("input"); 
		for (var x = 0; x < i.length; x++) { 
			if (i[x].name == "actionRequest") { 
				return i[x].value; 
			} 
		} 
	})();
};