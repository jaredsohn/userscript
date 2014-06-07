// ==UserScript==
// @name           grepoServerTime
// @author         TilX
// @version        0.5
// @license        Creative Commons: Namensnennung - Weitergabe unter gleichen Bedingungen 3.0 Deutschland (http://creativecommons.org/licenses/by-sa/3.0/de/)
// @namespace      tilx_grepoServerTime
// @include        http://*.grepolis.*/game*
// @description    Shows the server time in the browsergame Grepolis.
// ==/UserScript==

/* CHANGELOG
 * 
 * 0.1
 * -erste funktionsfaehige Version  
 * 
 * 0.3
 * - keine Requests an den grepo-Server, dafür kann sich die Genauigkeit verringern!
 * 
 * 0.4
 * - Update auf neue Code-Basis 
 * - die Position der Anzeige kann per drag & drop geaendert werden
 * - die Farbe des Textes und des Schattens können in den Einstellungen geaendert werden -  erlaubt sind beliebige CSS-Farbangaben
 * 
 * 0.41
 * - neue Einstellmöglichkeit für die Schriftgröße
 * 
 * 0.45 
 * - angepasster Update-Checker fuer userscripts.org     
 * 
 * 0.5
 * - added english localization
 * - fixed dragging bug
 * - slightly more accurate (about 1s)
 */

 
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
	var value = function (prefix) {
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
	
	//translator
	var t = function (langs) {
		var tld = document.URL.match(/\.(\w{2,4})\/game/)[1];
		var lang;
		switch(tld){
			case 'at':
				lang = 'de';
				break;
			default:
				lang = tld;
		}
		
		return function(str){
			if(langs[lang] !== undefined && langs[lang][str] !== undefined){
				str = langs[lang][str];
			}
			for(var i = 1; i < arguments.length; i++){
				str = str.replace(new RegExp('%'+i), arguments[i]);
			}
			return str;
		}
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
	var grepoServerTime = (function () {
		
		var SCRIPTNAME = 'grepoServerTime';
		var SCRIPTID = 65912;
		var SCRIPTVERSION = 0.5;
		
		var LANGUAGES = {
			'de': {
				'Font color': 'Schriftfarbe',
				'Shadow color': 'Schattenfarbe',
				'Font size': 'Schriftgr&ouml;&szlig;e',
				'servertime': 'Serverzeit'
			}
		};
		
		var time;
		var startTime;
		
		var originalTimeElement = $('#server_time');
		
		var colorRegexp = (function () {
			var alphaVal = '\\s*[01]?(\\.\\d+)?';
			var colorVal = '\\s*\\b(-*[0-9]+)\\b\\s*';
			var rgb = '(rgb\\('+colorVal+','+colorVal+','+colorVal+'\\))';
			var rgba = '(rgba\\('+colorVal+','+colorVal+','+colorVal+','+alphaVal+'\\))';
			var colorValPrecent = '\\s*\\b([0-9]+)%\\s*';
			var rgbPercent = '(rgb\\('+colorValPrecent+','+colorValPrecent+','+colorValPrecent+'\\))';
			var rgbaPercent = '(rgba\\('+colorValPrecent+','+colorValPrecent+','+colorValPrecent+','+alphaVal+'\\))';
			var colorNamed = '(aqua)|(black)|(blue)|(fuchsia)|(gray)|(green)|(lime)|(maroon)|(navy)|(olive)|(orange)|(purple)|(red)|(silver)|(teal)|(white)|(yellow)|(transparent)';
			return new RegExp('^(#(([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\\b)|'+colorNamed+'|'+rgb+'|'+rgbPercent+'|'+rgba+'|'+rgbaPercent+')$');
		}());	
		
		var initStyle = function () {
				var style = [];
				style.push('.tilx_blocker {display:none; position:fixed;top:0;bottom:0;left:0;right:0; z-index:20;}');
				style.push('.tilx_servertime {position:absolute;top:'+value.get('top', '640px')+';left:'+value.get('left', '840px')+';z-index:21; padding:15px; cursor:move; line-height:1em;white-space:nowrap;text-align:center; font-size:'+value.get('size', '11')+'px;color:'+value.get('color', 'white')+';text-shadow:'+value.get('shadow', 'black')+' 1px 1px 1px;}');
				style.push('.tilx_form label {display:block;margin:5px 0;} .tilx_form label span {float:left;width:120px;} .tilx_form input {border:1px solid #aaa}');
				$('<style type="text/css">' + style.join("\n") + '</style>').appendTo('head');
		}
		
		var initDate = function(){
			$('body').append('<div class="tilx_blocker"></div>');
			$('#box').append('<div class="tilx_servertime">' + t('servertime') + ': <span class="tilx_time"></span></div>');
			
			time = parseInt(originalTimeElement.text(), 10);
			startTime = time;
			
			updateDate();
			window.setInterval(updateDate, 1000);
		}
		
		var updateDate = function () {
		
			$('.tilx_time').text(uW.readableDate(new Date(time * 1000)));
			time += 1;
			if(parseInt(originalTimeElement.text(), 10) !== startTime){
				time = parseInt(originalTimeElement.text(), 10);
				startTime = time;
			}
		}
		
		var initMove = (function () {
			var boxOffset, elemOffset, clickOffset;
			
					
			var doMove = function (ev) {
				var top = ev.pageY - boxOffset.top - clickOffset.top;
				var left = ev.pageX - boxOffset.left - clickOffset.left;
				if (top+15 < 0) {
					top = -15;
				}
				if(left+15 < -boxOffset.left){
					left = -boxOffset.left-15;
				}
				$('.tilx_servertime').css({
					top: top,
					left: left
				});
				return false;
			};
			
			var endMove = function (e) {
				value.set('top', $('.tilx_servertime').css('top'));
				value.set('left', $('.tilx_servertime').css('left'));
				
				$(window)
					.unbind('mousemove', doMove)
					.unbind('mouseup', endMove)
				;
				
				$('.tilx_blocker').css('display', 'none');
				
				return false;
			};
			
			var startMove = function (e) {
				boxOffset = $('#box').offset();
				elemOffset = $('.tilx_servertime').offset();
				clickOffset = {
					top: e.pageY - elemOffset.top,
					left: e.pageX - elemOffset.left
				};
				
				$(window)
					.bind('mousemove', doMove)
					.bind('mouseup', endMove)
				;
				
				$('.tilx_blocker').css('display', 'block');
				
				return false;
			}
		
			return function () {
				$('.tilx_servertime').bind('mousedown', startMove);
			};
		})();
		
		var initSettings = (function () {
			
			var addHTML = function () {
				$('#settings_profile_form').append(
					'<li class="'+($('#settings_profile_form li').length % 2 == 1 ? 'even' : 'odd')+' tilx_form" style="padding-bottom:4px;">' + 
					'<h3>grepoServerTime</h3>' + 
					'<label><span>' + t('Font color') + ': </span><input type="text" id="tilx_color" value="'+value.get('color', 'white')+'"></label>' +
					'<label><span>' + t('Shadow color') + ': </span><input type="text" id="tilx_shadow" value="'+value.get('shadow', 'black')+'"></label>' +
					'<label><span>' + t('Font size') + ': </span><input type="text" id="tilx_size" value="'+value.get('size', '11')+'"></label>' +
					'</li>'
				);
			};
			
			var handleColorInput = function () {
				if($('#tilx_color').val().match(colorRegexp)){
					$('#tilx_color').css('background-color', '#fff');
					$('.tilx_servertime').css('color', $('#tilx_color').val());
					value.set('color', $('#tilx_color').val());	
				} else {
					$('#tilx_color').css('background-color', '#fbb');
				}
			};
			
			var handleShadowInput = function () {
				if($('#tilx_shadow').val().match(colorRegexp)){
					$('#tilx_shadow').css('background-color', '#fff');
					$('.tilx_servertime').css('text-shadow', $('#tilx_shadow').val()+' 1px 1px 1px');
					value.set('shadow', $('#tilx_shadow').val());
				} else {
					$('#tilx_shadow').css('background-color', '#fbb');
				}
			};
			
			var handleSizeInput = function () {
				if($('#tilx_size').val().match(/^\d+$/)){
					$('#tilx_size').css('background-color', '#fff');
					$('.tilx_servertime').css('font-size', $('#tilx_size').val()+'px');
					value.set('size', $('#tilx_size').val());
				} else {
					$('#tilx_size').css('background-color', '#fbb');
				}
			};
		
			return function () {
				if (document.URL.indexOf('game/player') !== -1 && (document.URL.indexOf('action=index') !== -1 || document.URL.indexOf('action=') === -1)) {
					addHTML();
 					$('#tilx_color').keyup(handleColorInput);
 					$('#tilx_shadow').keyup(handleShadowInput);
 					$('#tilx_size').keyup(handleSizeInput);
				}
			};
		}());
		
	
		return function () {
			value = value(SCRIPTNAME);
			t = t(LANGUAGES);
			updateCheck(SCRIPTNAME, SCRIPTID, SCRIPTVERSION);
		
			initStyle();
			initDate();
			initMove();
			initSettings();
		};
	}());
	
	grepoServerTime();
}());