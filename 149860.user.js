// ==UserScript==
// @name        Ordens de Defesa - MoD ePortuguês
// @namespace   Ministério de Defesa de ePortugal
// @include     /^.*\.erepublik\.com/..$/
// @version     4
// @description	Plugin feito pelo Ministério da Defesa Português, para ver todas as batalhas importantes em que ePortugal está a lutar.
// ==/UserScript==
// Feito por: Ptwonder, jotapelx e Nuno Correia
// Gráficos: Marta Li
// Ultimo update: 27/02/2013
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
			url: 'https://docs.google.com/spreadsheet/pub?key=0At56i_YbWewNdDVVQVRadDZFdEd0UXRMSWF6S1dBMEE&single=true&gid=0&range=a1&output=txt',
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
					var imageHeader = "http://img706.imageshack.us/img706/9148/priosmod1banner.jpg";
					
					$('#mon_orders').append('<img class="mon_orders_block" src="'+ imageHeader + '" style="float: none; margin-top:0px; margin-bottom:-3px"/>');
                    
                    if(GM_getValue('ordens')=='activas'){
                        $('#mon_orders').append('<div id="mon_orders_content"/>');
                    }
                    else{
                        $('#mon_orders').append('<div id="mon_orders_content" style="display: none"/>');
                    }
					
                    for(var i in battles) {
						var battle = battles[i];
						var url = battle['url'];
                        var image;
						var regiao;
                        var cor;
                        
						if (i==10){
							image = battle['image'];
                            image = 'http://img809.imageshack.us/img809/5189/priosmod8facebook.jpg';
							$('#mon_orders_content').append('<font face="Cambria"><a target="_blank" href="' + url + '" style="margin: auto; display: block; font-size:36px;"><img src="'+ image + '" style="margin-top:0;"/></a></font><br/>');
						} else if(i<5){
							image = battle['image'];
							regiao = battle['regiao'];
                            cor = battle['prioridade'];
                            if(image==''){
                                $('#mon_orders_content').append('<font face="Arial Narrow"><a target="_blank" href="' + url + '" style="padding-top: 12px; padding-bottom: 58px ; margin-top: 0px; margin-bottom: 0px; margin-left: auto; margin-right: auto ; color: white ;background-color:'+cor+'; text-align: center;display: block; font-size:17pt;">'+regiao+'</a></font>');
                            }
                            else{
                                $('#mon_orders_content').append('<font face="Arial Narrow"><a target="_blank" href="' + url + '" style="padding-top: 12px; padding-bottom: 58px ; margin-top: 0px; margin-bottom: 0px; margin-left: auto; margin-right: auto ; color: white ;background: url('+image+'); text-align: center;display: block; font-size:17pt;">'+regiao+'</a></font>');
                            }
                            
						} else {
 							image = battle['image'];
							regiao = battle['regiao'];
							cortemp = battle['prioridade'];
                            cor = battle['prioridade'];
                            
                            if(image==''){
                                $('#mon_orders_content').append('<font face="Arial Narrow"><a target="_blank" href="' + url + '" style="padding-top: 17px; padding-bottom: 24px ; margin: auto; color: white ;background-color:' +cor+ '; text-align: center;display: block; font-size:14pt;">'+regiao+'</a></font>');
                            }
                            else{
                                $('#mon_orders_content').append('<font face="Arial Narrow"><a target="_blank" href="' + url + '" style="padding-top: 17px; padding-bottom: 24px ; margin: auto; color: white ;background: url('+image+'); text-align: center;display: block; font-size:14pt;">'+regiao+'</a></font>');
                            }
                         }
					}
                    
                    var imagehided = 'http://i.imgur.com/qiCLU.jpg';
                    
                    if(GM_getValue('ordens')=='activas'){
                        $('#mon_orders').append('<img id="mon_orders_hided" class="mon_orders_block" src="'+ imagehided + '" style="display:none; margin-top: -1px;margin-left: 1px;"/><br/>');
                    }
                    else{
                        $('#mon_orders').append('<img id="mon_orders_hided" class="mon_orders_block" src="'+ imagehided + '" style="margin-top: -1px;margin-left: 1px;"/><br/>');
                    }                    
                    
                    $(".mon_orders_block").click(
                        function(){
                            if(GM_getValue('ordens')=='activas')
                                GM_setValue('ordens','inactivas');
                            else
                                GM_setValue('ordens','activas');
                            
                            $('#mon_orders_content').slideToggle('slow', function() {
                                $('#mon_orders_hided').slideToggle('slow');
                            });
                        }
                    );
                    
                });
			},
			onerror: function() {
				alert('Não está a funcionar');
			}
		});
	}
}
GM_wait();