// ==UserScript==
// @name           Grepolis: Grondstof Procent (NL)
// @version        1.00
// @date           15-09-2010
// @description    Bij Grepolis (browser spel) voegt de percentage bij de grondstoffen toe.
// @include        http://*.grepolis.*
// @license 	   Open Source
// @copyright	   © Nimix Nederland
// @author         NimixWare
// @source         http://userscripts.org/scripts/show/71107
// ==/UserScript==

// VERSIE
// 1.00
// - Eerste release

 
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
	
	//cookie-based
	var value = function (prefix) {
		var prefix = 'tilx_' + prefix + '_';
		
		//cookie-functions
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
	
	//update-checker
	var updateCheck = (function () {
		var getBox = function () {
			if ($('#tilx_updates').length === 0) {
				$('#menu').append(
					'<table cellspacing="0" cellpadding="0" class="game_border game_inner_box" style="position:absolute;top:540px;left:5px;width:163px;">' + 
						'<tr><td class="game_border_edge"/><td class="game_border_top"/><td class="game_border_edge game_border_edge_2"/></tr>' + 
						'<tr><td class="game_border_left"/>' + 
							'<td style="text-align:left;">' + 
								'<div class="game_header">Script-Updates</div>' + 
								'<ul class="game_list" id="tilx_updates"></ul>' + 
							'</td>' + 
						'<td class="game_border_right"/></tr>' + 
						'<tr><td class="game_border_edge game_border_edge_3"/><td class="game_border_bottom"/><td class="game_border_edge game_border_edge_4"/></tr>' + 
					'</table>'
				);
			}
			return $('#tilx_updates');
		};
		
		var addLi = function (name, id, version) {
			getBox().append(
				'<li class="' + ($('#tilx_updates li').length % 2 === 0 ? 'even' : 'odd') + '">' + 
				'<a href="http://userscripts.org/scripts/source/' + id + '.user.js">' + name + ' (' + version + ')</a></li>'
			);
		};
			
		return function (name, id, version) {
			if (typeof GM_xmlhttpRequest === 'function' && name && id > 0 && version){
				if(parseFloat(value.get('newVersion', -1), 10) > version){
					addLi(name, id, value.get('newVersion'));
				} else {
					if((new Date()).getTime() - parseInt(value.get('lastUpdate', 0), 10) > 43200000){
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://userscripts.org/scripts/source/' + id + '.meta.js?' + (new Date()).getTime(),
							onload: function (response) {
								var results = response.responseText.match(/@version +(\d+(?:\.\d+)?)/);
								if(results && results[1]){
									var newVersion = parseFloat(results[1], 10);
									if (!isNaN(newVersion) && newVersion > version) {
										value.set('newVersion', newVersion);
										addLi(name, id, newVersion);
									}
									value.set('lastUpdate', (new Date()).getTime());
								}
							}
						});
					}
				}
			}
		};
	}());
	
	
	
	//the actual script
	var grepoPercent = (function () {
		
		var SCRIPTNAME = 'grepoPercent';
		var SCRIPTID = 71107;
		var SCRIPTVERSION = 1.00;
		
		var storage;
		var res = ['wood', 'stone', 'iron', 'favor'];
		
		var initStyle = function () {
				var style = [];
				style.push('div#box #main_area .tilx_percent {position:absolute;top:3px;left:12px; width:40px;height:29px; background:rgba(255, 255, 255, 0.6); font-size:11px;text-align:center;line-height:29px;}');
				style.push('div#box #main_area #favor .tilx_percent {padding-right:10px;}');
				style.push('.res_plenty,.res_rare {position:relative;z-index:1;}');
				$('<style type="text/css">' + style.join("\n") + '</style>').appendTo('head');
		}
		
		var calcColor =  function (p) {
			var r, g, b = '44';
			r = Number(Math.round(p / 100 * 255)).toString(16);
			if(r.length == 1) {
				r = '0' + r;
			}
			g = Number(Math.round((100 - p) / 100 * 255)).toString(16);
			if(g.length == 1) {
				g = '0' + g;
			}
			return '#' + r + g + b;
		};
		
		var calc = function () {
			$.each(res, function () {
				var p;
				if(this == 'favor'){
					p = Math.round((parseInt($('#' + this + '_text').text(), 10) / 500) * 100);
				} else {
					p = Math.round((parseInt($('#' + this + '_count').text(), 10) / storage) * 100);
				}
				$('#' + this + ' .tilx_percent')
					.text(p + '%')
					.css('color', calcColor(p));
				;
			});
			
			window.setTimeout(calc, 100);
		};
		
		return function () {
			value = value(SCRIPTNAME);
			updateCheck(SCRIPTNAME, SCRIPTID, SCRIPTVERSION);
			
			
			initStyle();
			
			storage = parseInt($('a#storage').text(), 10);
			
			$.each(res, function () {
				$('a#' + this).prepend('<div class="tilx_percent">');
			});
			
			calc();
		};
	}());
	
	grepoPercent();
}());

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_126', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_126', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=126&version=1.00';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();