// ==UserScript==
// @name		Cobraoi Ex Military Unit Order Battle
// @namespace		Piyai
// @description		Provide order priority for Laskar Cobraoi member
// @include		http://www.erepublik.com/*
// @updateURL		https://userscripts.org/scripts/source/158645.meta.js
// @downloadURL		https://userscripts.org/scripts/source/158645.user.js
// @author		Piyai http://www.erepublik.com/id/citizen/profile/3048943
// @contributor		Modified by Piyai http://www.erepublik.com/id/citizen/profile/5562505
// @license		(CC) by-nc-sa 3.0
// @version		1.0.0
// ==/UserScript==

function GM_wait() {

	//script will wait until page loaded completely
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else {
		$ = unsafeWindow.jQuery;
		
		if(document.getElementById('homepage_feed') == null) {
			return;
		}
		
	
		GM_xmlhttpRequest({
			url: 'http://j.mp/TR8EA0',
			method: 'GET',
			onload: function(response) {
				$(document).ready(function() {
					var orders = '<div id="new_orders" style="text-align: center" />';			
					$('#battle_listing').prepend(orders);
					var battles = $.parseJSON(response.responseText);
					
					header();
					
					var sortableBattles = [];
					
					for(var i in battles) {
						sortableBattles.push([i, battles[i]]);
					}
					sortableBattles.sort(sortBattlesFunction);

					for(var i = 0; i < sortableBattles.length; i++) {
						var battle = sortableBattles[i][1];
						var url = battle['url'];
						var title = battle['title'];
						
						if(title != null && url != null && title != "" && url != "") {

							var image = findImage(battle['prio'][findDiv()]);
							
							$('#new_orders').append('<font face="Droid Sans"><a target="_blank" href="' + url + '" style="padding-top: 12px; padding-bottom: 110px; margin-top: 0px; margin-bottom: 0px; margin-left: auto; margin-right: auto; color: black; background: url('+image+'); text-align: center; display: block; font-size:17pt;">'+title+'</a></font>');

						}
					}
				
					footer();
				});
			},
			onerror: function(response) {
				log(response);
				var orders = '<br/><div id="new_orders_error" style="text-align: center" />Error loading military order script, try refreshing the page<br />';		
				$('#battle_listing').prepend(orders);
			}
		});
	}
}

function header() {
	var imageHeader = 'http://s11.postimage.org/wxzoma6df/Cobrakkk2.png';;
	$('#new_orders').append('<img src="'+ imageHeader + '" style="float: none; margin-top:0px; margin-bottom:-3px"/>');
}

function footer() {
	var footer = 'http://s9.postimage.org/v1udtfzbz/Neoi.png';
	$('#new_orders').append('<a target="_blank" href="http://j.mp/TRbt4b"><img src="'+ footer + '" style="margin-top:0;"/></a><br/>');
}

function findDiv() {
	var usrLevel = parseInt($('.user_level > b').html(), 10);
	if (usrLevel <= 24) {
			return "d1";
		} else if (usrLevel <= 29) {
					return "d2";
				} else if (usrLevel <= 36) {
							return "d3";
						} else {
							return "d4";
						}
}

function sortBattlesFunction(a, b) {
	return findValue(a[1]['prio'][findDiv()]) - findValue(b[1]['prio'][findDiv()]);
}

function findValue(key){
	switch(key) {
		case 'MAXIMUM': return 2;
		case 'HIGH': return 4;
		case 'MEDIUM': return 8;
		case 'LOW': return 16;
		case 'RELEASE': return 32;
		case 'DO NOT FIGHT': return 64;
		default: return 0;
	}
}

function findImage(key) {
	var images = {};
	images['MAXIMUM'] = 'http://s7.postimage.org/z5ewvingb/max_zps19c4945c.png';
	images['HIGH'] = 'http://s7.postimage.org/ld0hzvwor/high_zps2f5cfeee.png';
	images['MEDIUM'] = 'http://s7.postimage.org/y5olzt8aj/med_zps3f5c2fd5.png';
	images['LOW'] = 'http://s7.postimage.org/mulybg1ff/low_zps738678f6.png';
	images['RELEASE'] = 'http://s7.postimage.org/clth5mddn/release_zps56b77cac.png';
	images['DO NOT FIGHT'] = 'http://s7.postimage.org/k32oku2wr/donot_zps699bde46.png';
	images['null'] = 'http://s7.postimage.org/esxptjinv/top_2_zps61ec91c0.png';

	if(images[key] == null){
		return images['null'];
	} else {
		return images[key];
	}
}


function log(response) {
	if(unsafeWindow.console){
		//firebug
		var GM_log = unsafeWindow.console.log;
	}
	GM_log([
		'Error script not loaded:',
		'status: ' + response.status,
		'statusText: ' + response.statusText,
		'readyState: ' + response.readyState,
		'responseHeaders: ' + response.responseHeaders,
		'responseText: ' + response.responseText,
		'finalUrl: ' + response.finalUrl,
	].join('\n'));
}

GM_wait();

(function(font) {
	var	head = document.getElementsByTagName('head')[0],
		link = document.createElement('link'),
		style = document.createElement('style'),
		rules = document.createTextNode('div id="new_orders" * { font-family: "' + font.family + '", arial, sans-serif !important }');
	
    link.rel  = 'stylesheet';
	link.href = 'http://fonts.googleapis.com/css?family=' + font.family + ':' + (font.style || []) + '&subset=' + (font.subset || ['latin']);
	head.appendChild(link);
	
	style.styleSheet ? style.styleSheet.cssText = rules.nodeValue : style.appendChild(rules);
	head.appendChild(style);
})({ family:'Droid Sans', style:['400','700'] });