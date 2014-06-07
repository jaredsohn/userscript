// ==UserScript==
// @name		Mafia Wars Bot
// @namespace	MafiaWarsBot
// @author		Dennis Rasmussen
// @version		0.0.1
// @description    	Why play when you can make a bot do it for you.
// @include        	http://apps.facebook.com/inthemafia/*
// @include       	http://apps.new.facebook.com/inthemafia/*
// @exclude		http://apps.facebook.com/inthemafia/links.php*
// @exclude		http://apps.new.facebook.com/inthemafia/links.php*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js
// ==/UserScript==

var Options;
var defaultOptions = {
	installed: false,
}

var Script = {
	name: 'Mafia Wars Bot',
	version: '0.0.1',
	author: 'Dennis Rasmussen',
	id: '45655',
	source: 'http://userscripts.org/scripts/review/45655',
	about: 'http://userscripts.org/scripts/show/45655',
	Run: function() {
		Options = load_options('OPTIONS');
		if (Options.installed == false || Options.installed == undefined) {
			Options = defaultOptions;
			this.Install();
			return;
		}
	},
	Install: function() {
		alert('this is the first time you run this script');
	},
}

var Game = {
	name: 'inthemafia',
	id: '10979261223',
	appId: 'app10979261223',
	remote: 'http://apps.facebook.com/inthemafia/remote/html_server.php?',
	controller: '&xw_controller=',
	action: '&xw_action=',
	opponent: '&opponent_id=',
	upgrade_key: '&upgrade_key=',
	user: '&user_id=',
	
	Heal: function(city) {
	
	}
}

var Player = {

}

function load_options(key, def) {
	return eval(GM_getValue(key, (def || '({})')));
}

function save_options(key, val) {
	GM_setValue(key, uneval(val));
}




Script.Run();