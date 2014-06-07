// ==UserScript==
// @name        Kercovari
// @namespace   UCK
// @include     http://www.erepublik.com/*
// @version     3.0.1
// @description	Kercovari UCK.
// ==/UserScript==
// Ultimo update: 09/12/2012
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else {
		$ = unsafeWindow.jQuery;
		
		// Code here
		if(document.getElementById('homepage_feed') == null) {
			return;
		}
		
		GM_xmlhttpRequest({
			url: 'https://docs.google.com/spreadsheet/ccc?key=0AvLL6T3dgzLUdDN3R0RvRDNjcFpvS3FUejdHV2RZSVE',
			method: 'GET',
//			headers: {
//				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
//				'Accept': 'application/json',
//			},
			onload: function(response) {
				$(document).ready(function() {
					var orders = '<div id="mon_orders" style="text-align: center" />';			
					$('#battle_listing').prepend(orders);
					var battles = $.parseJSON(response.responseText);
					var imageHeader = "http://i49.tinypic.com/2l8f82h.png";
					
					$('#mon_orders').append('<img src="'+ imageHeader + '" style="float: none; margin-top:0px; margin-bottom:-3px"/>');
					
                    for(var i in battles) {
						var battle = battles[i];
						var url = battle['url'];
                        var image;
						var regiao;
                        var cor;
                        
						if (i==10){
							image = battle['image'];
                            image = 'http://i50.tinypic.com/34i07qw.png';
							
$('#mon_orders').append('<font face="Cambria"><a target="_blank" href="' + url + '" style="margin: auto; display: block; font-size:36px;"><img src="'+ image + '" style="margin-top:0;"/></a></font><br/>');
						} else if(i<5){
							image = battle['image'];
							regiao = battle['regiao'];
                            cor = battle['prioridade'];
                            if(image==''){
                                $('#mon_orders').append('<font face="Arial Narrow"><a target="_blank" href="' + url + '" style="padding-top: 12px; padding-bottom: 58px ; margin-top: 0px; margin-bottom: 0px; margin-left: auto; margin-right: auto ; color: white ;background-color:'+cor+'; text-align: center;display: block; font-size:17pt;">'+regiao+'</a></font>');
                            }
                            else{
                                $('#mon_orders').append('<font face="Arial Narrow"><a target="_blank" href="' + url + '" style="padding-top: 12px; padding-bottom: 58px ; margin-top: 0px; margin-bottom: 0px; margin-left: auto; margin-right: auto ; color: white ;background: url('+image+'); text-align: center;display: block; font-size:17pt;">'+regiao+'</a></font>');
                            }
                            
						} else {
 							image = battle['image'];
							regiao = battle['regiao'];
							cortemp = battle['prioridade'];
                            cor = battle['prioridade'];
                            
                            if(image==''){
                                $('#mon_orders').append('<font face="Arial Narrow"><a target="_blank" href="' + url + '" style="padding-top: 17px; padding-bottom: 24px ; margin: auto; color: white ;background-color:' +cor+ '; text-align: center;display: block; font-size:14pt;">'+regiao+'</a></font>');
                            }
                            else{
                                $('#mon_orders').append('<font face="Arial Narrow"><a target="_blank" href="' + url + '" style="padding-top: 17px; padding-bottom: 24px ; margin: auto; color: white ;background: url('+image+'); text-align: center;display: block; font-size:14pt;">'+regiao+'</a></font>');
                            }
                         }
					}
                });
			},
			onerror: function() {
				alert('Não está a funcionar');
			}
		});
	}
}
GM_wait();






{"battles":[{"battleID":"41","battle_code":"36609","battle_link":"http:\/\/www.erepublik.com\/en\/military\/battlefield\/36609","battle_status":"1","battle_priority":"2","battle_division":"0","battle_cant_be_order":"0","battle_is_resistance":"0","battle_is_finished":"0","battle_comment":"","battle_region_id":"198","battle_region_name":"Midi-Pyrenees","battle_last_update":"2012-12-14 00:03:02","attacker":[{"battleID":"36609","attacker_num":"65","attacker_name":"Serbia","attacker_code":"RS","attacker_points_total":"68","attacker_division":"4","attacker_division_points":"25","attacker_division_bar":"50","attacker_division_domination":"0","attacker_division_won":"0"}],"defender":[{"battleID":"36609","defender_num":"11","defender_name":"France","defender_code":"FR","defender_points_total":"5","defender_division":"4","defender_division_points":"5","defender_division_bar":"50","defender_division_domination":"0","defender_division_won":"0"}]}],"other_battles":[],"divisions_battles":[]}