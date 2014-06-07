// ==UserScript==
// @name        Studentizer
// @namespace   http://premun.kiba.cz/app/studentizer
// @author	Premek Vysoky - http://premun.kiba.cz/
// @description Hlidani uvolnenych mist ve spojich StudentAgency
// @include     http://jizdenky.studentagency.cz/Booking/*
// @version     1.6
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


// Vlastni CSS styly:
	var head = document.getElementsByTagName('head')[0];
	var elem = head.appendChild(window.document.createElement( 'style' ));
	elem.innerHTML = '@import "http://premun.kiba.cz/app/studentizer/studentizer.css";';


// Nacteni refresh hodnot z #hash
	unsafeWindow.cas = "";
	var hash = window.location.hash;
	if(hash.indexOf('!watch') > 0) {
		// #hash!watch[CAS_ODJEZDU],[FREKVENCE]		
		var kusy = hash.substr(hash.indexOf('!watch') + 6).split(',');
		unsafeWindow.cas = kusy[0];
		unsafeWindow.frekvence = kusy[1];	
	}
	

// Helper pro zobrazovani casu. Asi to jde i pres Date(), ale s tim jsem nikdy neumel
	unsafeWindow.timeFormat = function (d) {
		var hodiny = d.getHours();
		var minuty = d.getMinutes();
		var sekundy = d.getSeconds();
		
		return (hodiny < 10 ? '0' : '') + hodiny
			   + ':' + 
			   (minuty < 10 ? '0' : '') + minuty
			   + ':' + 
			   (sekundy < 10 ? '0' : '') + sekundy;
	}


// Kontrola, jestli cas volny
// Kdyz ano - alert
// Kdyz ne - refresh
// Piece of cake.
	unsafeWindow.checkTime = function(cas) {
		var volno = false;
		
		$('.item_blue, .item_gray').each(function(index, element) {
			var c = $('.col_depart', $(this)).html();
			if(c == cas && ($(this).hasClass('free') || $(this).hasClass('item_blue'))) {
				var d = new Date();			
				var hodiny = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
				
				alert('[' + unsafeWindow.timeFormat(new Date()) + '] Volno v ' + cas + '!');
				volno = true;
				return;
			}
		});
		
		if(!volno) {
			var freq = ($('#studentizer_frekvence').length == 0 ? unsafeWindow.frekvence : $('#studentizer_frekvence').val());
			
			setTimeout("window.location.href = '" + window.location + "!watch" + cas + "," + freq + "'", parseInt(freq));
			setTimeout("window.location.reload(true)", parseInt(freq) + 10);
		}
	}


// Funkce, ktera se spusti po nacteni dat na SA webu (tabulky busu)
unsafeWindow.start = function() {
	
	// cekani na nacteni autobusu (ten jejich hloupej AJAX loading		
	if($('div.item_gray').length == 0) {
		setTimeout('start()', 500);
		return;	
	}
	
	// hlavni div		
	$('body').append('<div id="studentizer">\
						<div>Začít hlídat!</div>\
							<table cellspacing="5">\
							<tr>\
								<td>1) Frekvence:</td>\
								<td>\
									<select id="studentizer_frekvence">\
										<option value="5000">5 sekund</option>\
										<option value="10000">10 sekund</option>\
										<option value="30000">30 sekund</option>\
										<option value="60000" selected="selected">1 minuta</option>\
										<option value="300000">5 minut</option>\
										<option value="600000">10 minut</option>\
										<option value="900000">15 minut</option>\
									</select>\
								</td>\
							</tr>\
							<tr>\
								<td>2) Čas:</td>\
								<td>\
									<select id="studentizer_cas">\
										<option value=""></option>\
									</select>\
								</td>\
							</tr>\
						</table>\
					  </div>');
						
	var div = $('#studentizer');
	
	// pokud je pripraveny refresh, zkontrolujeme cas a napiseme prubeh hledani
	if(unsafeWindow.cas != "") {	
		var d = new Date();						  
		d = new Date(d.getTime() + parseInt(unsafeWindow.frekvence));
	
		div.html('<div>Hlídám spoj v <strong>' + unsafeWindow.cas + '</strong></div>\
				  <em>Poslední kontrola v ' + unsafeWindow.timeFormat(new Date()) + '</em><br />\
				  <em>Příští kontrola v ' + unsafeWindow.timeFormat(d) + '</em><br />\
				  <a onclick="window.location.reload(true)">zrušit</a>');
				  
		unsafeWindow.checkTime(unsafeWindow.cas);
	
	// jinak naplnime <select> a dame handler na spodni select	
	} else {				
		$('.item_gray').each(function(index, element) {
			var c = $('.col_depart', $(this)).html();
			$('#studentizer_cas').append('<option value="' + c + '">' + c + '</option>');
		});
				
		$('#studentizer_cas').bind('change', function(e) {
			div.find('table').hide();
			div.find('div').after('<br />Zahajuji hlídání...');
			unsafeWindow.checkTime($('#studentizer_cas').val());
		});
	}
}

// A vsechno to odstartujeme
$(document).ready(function(e) {	
	unsafeWindow.start();
});