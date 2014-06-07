// ==UserScript==
// @name			Ministerio de Defensa de Bolivia
// @namespace		http://tspbs.superforo.net/
// @description		Ordenes de Batallas del Ministerio de Defensa de Bolivia
// @include			http://www.erepublik.com/*
// @version			0.4.9.3
// @updateURL		http://userscripts.org/scripts/show/172908.meta.js
// @downloadURL		http://userscripts.org/scripts/show/172908.user.js
// @grant			GM_wait
// @grant			GM_xmlhttpRequest
// @grant			GM_log
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_info
// ==/UserScript==

// Feito por: Ptwonder, jotapelx e Nuno Correia para o ePT
// Adaptado para o eBR por: nW0lf
// Baseado no original de: 28/10/2012
// Update em: 25/04/2013

function GM_wait() {

	//jQuery is already defined by eRep, waits for it to load
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else {
		$ = unsafeWindow.jQuery;
		
		if(document.getElementById('homepage_feed') == null) {
			return;
		}
		
		registerInstall();
	
		GM_xmlhttpRequest({
			url: 'http://goo.gl/vXbSg',
			method: 'GET',
			onload: function(response) {
				$(document).ready(function() {
					var orders = '<div id="mon_orders" style="text-align: center" />';			
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
						var type = battle['type'];
						
						if(title != null && url != null && title != "" && url != "") {

							var image = findImage(battle['prio'][findDiv()], battle['type']);

							var linkHtml = '<font face="Arial Narrow"><a target="_blank" href="' + url + '" style="padding-top: 12px; padding-bottom: 58px; margin-top: 0px; margin-bottom: 0px; margin-left: auto; margin-right: auto; color: white; background: url('+image+'); text-align: center; display: block; font-size:17pt;">'+title+'</a></font>';
														
							$('#mon_orders').append(linkHtml);

						}
					}
				
					footer();
				});
			},
			onerror: function(response) {
				log(response);
				var orders = '<br/><div id="mon_orders_error" style="text-align: center" />Erro ao carregar planilha de ordens <br />'+
							'<a target="_blank" href="https://docs.google.com/spreadsheet/ccc?key=0Ar1KkXTdol1tdE5zYTFnMVBYZk81dnhraUxkTkxZdnc#gid=0">Verificar atualizações do script</a></div><br/>';		
				$('#battle_listing').prepend(orders);
			}
		});
	}
}

function registerInstall() {
	var curVersion = GM_info.script.version;
	if(GM_getValue('registeredVersion', '0') != curVersion) {
		GM_xmlhttpRequest({
			url: 'https://md-ebrasil.appspot.com/md/register',
			data: 'version=' + curVersion,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: 'POST',
			onload: function(response) {
				GM_setValue('registeredVersion', curVersion);
			}
		});
	}
}

function header() {
	var imageHeader = 'aaa';;
	$('#mon_orders').append('<img src="'+ imageHeader + '" style="float: none; margin-top:0px; margin-bottom:-3px"/>');
}

function footer() {
	var footer = 'http://md-ebrasil.appspot.com/md/footer1.jpg';
	$('#mon_orders').append('<a target="_blank" href="https://docs.google.com/spreadsheet/ccc?key=0Ar1KkXTdol1tdE5zYTFnMVBYZk81dnhraUxkTkxZdnc#gid=0"><img src="'+ footer + '" style="margin-top:0;"/></a><br/>');
	
	footer = 'http://md-ebrasil.appspot.com/md/footer2.jpg';
	$('#mon_orders').append('<a target="_blank" href="http://www.erepublikbr.com/chat/"><img src="'+ footer + '" style="margin-top:0;"/></a><br/>');
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
		case 'MÁXIMA': 
		case 'MAXIMA': return 2;
		
		case 'ALTA': return 4;
		
		case 'MÉDIA':
		case 'MEDIA': return 8;
		
		case 'BAIXA': return 16;
		
		case 'SEGURA': return 32;
		
		case 'PERDIDA': return 64;
		
		case 'NÃO LUTAR': 
		case 'NAO LUTAR': return 128;
		
		default: return 999;
	}
}

function findImage(key, type) {
	var images = {};
	images['MÁXIMA'] = 'prio_maxima';
	images['MAXIMA'] = 'prio_maxima';
	images['ALTA'] = 'prio_alta';
	images['MÉDIA'] = 'prio_media';
	images['MEDIA'] = 'prio_media';
	images['BAIXA'] = 'prio_baixa';
	images['SEGURA'] = 'prio_segura';
	images['NÃO LUTAR'] = 'prio_nlutar';
	images['NAO LUTAR'] = 'prio_nlutar';
	images['null'] = 'prio_null';

	var base = 'http://md-ebrasil.appspot.com/md/'
		
	if(images[key] == null){
		return base + images['null'] + '_' + type + '.jpg';
	} else {
		return base + images[key] + '_' + type + '.jpg';
	}
}

function log(response) {
	if(unsafeWindow.console){
		//firebug
		var GM_log = unsafeWindow.console.log;
	}
	GM_log([
		'Erro no script de ordens:',
		'status: ' + response.status,
		'statusText: ' + response.statusText,
		'readyState: ' + response.readyState,
		'responseHeaders: ' + response.responseHeaders,
		'responseText: ' + response.responseText,
		'finalUrl: ' + response.finalUrl,
	].join('\n'));
}

GM_wait();