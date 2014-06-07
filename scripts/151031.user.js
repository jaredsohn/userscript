// ==UserScript==
// @name           phpteam
// @namespace      http://userscripts.org/users/424107
// @description    Outils pour Grepolis phpteam
// @include        http://*.grepolis.*/game*
// @version        0.0.1 Beta
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==



var $;
//var log = unsafeWindow.console.log;
var log = nullLog;

if (unsafeWindow.jQuery === undefined) {
    log("jquery is undefinde");
} else {
    log("jquery is loaded");
    $ = unsafeWindow.jQuery;
}

function nullLog(date) {}

$(document).ready(function() 
{
    setInterval("grepoAlert();",5000);
});

//License: Creative Commons
//based on the work of TilX : http://userscripts.org/users/tilx
(function () {

	//access to window object cross-browser
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}
	
	//get jQuery
	var $ = uW.jQuery;
	
	//add a console function
	var l;
	if (typeof uW.console === 'object' && typeof uW.console.log === 'function') {
		l = uW.console.log;
	} else {
		l = function () {
			return false;
		};
	}
	
	//cookie-based alternative for GM_*Value functions
	var value, newValueLib = function (prefix) {
		var prefix = 'tilx_' + prefix + '_';
		
		//cookie-functions by Peter-Paul Koch (http://www.quirksmode.org/js/cookies.html#script)
		var createCookie = function (name, value, days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		};
		var readCookie = function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1,c.length);
				}
				if (c.indexOf(nameEQ) == 0) {
					return c.substring(nameEQ.length,c.length);
				}
			}
			return undefined;
		};
		
		return {
			set: function (name, value) {
				createCookie(prefix + name, value, 365);
			}, 
			get: function (name, def){
				var ret = readCookie(prefix + name);
				if(ret !== undefined){
					return ret;
				} else {
					return def;
				}
			}
		};
	};
	
	//Object.create() by Douglas Crockford
	if(typeof Object.create !== 'function'){
		Object.create = function (o) {
			var F = function () {};
			F.prototype = o;
			return new F();
		};
	} 
	
		
	//the actual script
	var grepoAlert = (function () {
		var detect = $('#incoming_attack_count').length;
		console.debug(detect);
		if (detect > 0) {
			var nbattack = $('.incoming_attack_count_text').html();
		}
	}());
}());






