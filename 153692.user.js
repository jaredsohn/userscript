// ==UserScript==
// @name        Albanian Eagles
// @namespace   ShqiponjaT
// @include     http://www.cyberrepublik.com/en/index*
// @version     3.0.1
// @description	Shqiponjat Albanian Eagles.
// ==/UserScript==
// Ultimo update: 28/10/2013
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
			url: 'https://docs.google.com/spreadsheet/pub?key=0Av5vIo_E0LkNdGFvUFBvYXlzWGZELVJVM0xtTExvYnc&single=true&gid=0&output=txt',
			method: 'GET',
//			
//
			onload: function(response) {
				$(document).ready(function() {
					var orders = '<div id="mon_orders" style="text-align: center" />';			
					$('#battle_listing').prepend(orders);
					var battles = $.parseJSON(response.responseText);
					var imageHeader = "http://img850.imageshack.us/img850/74/e9ab18896194403fa2ca5b6.png";
					
					$('#mon_orders').append('<img src="'+ imageHeader + '" style="float: none; margin-top:0px; margin-bottom:-3px"/>');
					
                    for(var i in battles) {
						var battle = battles[i];
						var url = battle['url'];
                        var image;
						var regiao;
                        var cor;
                        
						if (i==10){
							image = battle['image'];
                            image = 'http://i.imgur.com/jsDCf.png';
							
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