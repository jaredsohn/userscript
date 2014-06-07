// ==UserScript==
// @name        SA Kontrola spoja
// @namespace   http://userscripts.org/users/670363
// @author		Michal Kovac - upraveny Studentizer od Premek Vysoky - http://premun.kiba.cz/
// @description Kontrola autobusovych miest v portali StudentAgency
// @include     https://jizdenky.studentagency.cz/Booking/*
// @version     1
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


// CSS
	var head = document.getElementsByTagName('head')[0];
	var elem = head.appendChild(window.document.createElement( 'style' ));
	elem.innerHTML = 'div#kontrolaSpoja {background-color: #0679B6; background-image: -moz-linear-gradient(center top , #2399C9 0%, #0679B6 100%); padding:8px; border: 4px solid rgba(118, 183, 213, 1);} div#kontrolaSpoja h3 {margin:0 0 5px;} div#kontrolaSpoja span{margin:0 5px 0 10px} div#kontrolaSpoja a{display: block; margin: 4px auto 0; cursor: pointer; background-color: #FBFBFA; background-image: -moz-linear-gradient(center top , #FBFBFA 0%, rgba(168, 163, 147, 1) 100%); width: 80px; padding:1px; text-decoration: none !important; border-radius: 8px; border: 1px solid rgba(168, 163, 147, 1)}';


// Premek Vysoky - Nacteni refresh hodnot z #hash
	unsafeWindow.cas = "";
	var hash = window.location.hash;
	if(hash.indexOf('!watch') > 0) {
		// #hash!watch[CAS_ODJEZDU],[FREKVENCE]		
		var kusy = hash.substr(hash.indexOf('!watch') + 6).split(',');
		unsafeWindow.cas = kusy[0];
		unsafeWindow.frekvence = kusy[1];	
	}
	

// Premek Vysoky - Helper pro zobrazovani casu. Asi to jde i pres Date(), ale s tim jsem nikdy neumel
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
	unsafeWindow.checkTime = function(cas) {
		var volno = false;
		
		$('.routeSummary:first').nextUntil('h2','div.routeSummary').andSelf().each(function(index, element) {
			var c = $('.col_depart', $(this)).html();
			if(c == cas && ($(this).hasClass('free') || $(this).hasClass('item_blue'))) {
				var d = new Date();			
				var hodiny = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
				
				alert('[' + unsafeWindow.timeFormat(new Date()) + '] Voľné miesto o ' + cas + '!');
				$('body').append('<embed src="https://dl.dropboxusercontent.com/u/25270838/drzim-ti-miesto.mp3" hidden=true autostart=true loop=false>');
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
	
	// cekani na nacteni autobusu (ten jejich hloupej AJAX loading)		
	if($('div.item_gray').length == 0) {
		setTimeout('start()', 500);
		return;	
	}
	
	// hlavni div		
	$('h2.overflow_hl:nth-child(1)').after('<div id="kontrolaSpoja">\
							<h3>Kontrola spoja</h3>\
							<div id="nastavenieKS">\
								<span>Frekvencia</span>\
								<select id="studentizer_frekvence">\
									<option value="30000">30 sekúnd</option>\
									<option value="60000" selected="selected">1 minúta</option>\
									<option value="300000">5 minút</option>\
									<option value="600000">10 minút</option>\
									<option value="900000">15 minút</option>\
								</select>\
								<span>Odjazd</span>\
								<select id="studentizer_cas">\
									<option value=""></option>\
								</select>\
							</div>\
						</div>');
						
	var div = $('#nastavenieKS');
	
	// pokud je pripraveny refresh, zkontrolujeme cas a napiseme prubeh hledani
	if(unsafeWindow.cas != "") {	
		var d = new Date();						  
		d = new Date(d.getTime() + parseInt(unsafeWindow.frekvence));
	
		div.html('<div id="aktivnaKS">Sleduje sa spoj s odjazdom o <strong>' + unsafeWindow.cas + '</strong><br />\
				  <em>Posledná kontrola o ' + unsafeWindow.timeFormat(new Date()) + '</em> <strong>|</strong>\
				  <em>Ďalšia kontrola o ' + unsafeWindow.timeFormat(d) + '</em><br />\
				  <a onclick="window.location.reload(true)">Zrušiť</a>\
				  </div>');
				  
		unsafeWindow.checkTime(unsafeWindow.cas);
	
	// jinak naplnime <select> a dame handler na spodni select	
	} else {				
		$('.routeSummary:first').nextUntil('h2','div.routeSummary').andSelf().filter('.item_gray').each(function(index, element) {
			var c = $('.col_depart', $(this)).html();
			$('#studentizer_cas').append('<option value="' + c + '">' + c + '</option>');
		});
				
		$('#studentizer_cas').bind('change', function(e) {
			div.hide();
			var d = new Date();						  
			d = new Date(d.getTime() + parseInt($('#studentizer_frekvence').val()));
			div.after('<div id="aktivnaKS">Sleduje sa spoj s odjazdom o <strong>' + $('#studentizer_cas').val() + '</strong><br />\
				  <em>Posledná kontrola o ' + unsafeWindow.timeFormat(new Date()) + '</em> <strong>|</strong>\
				  <em>Ďalšia kontrola o ' + unsafeWindow.timeFormat(d) + '</em><br />\
				  <a onclick="window.location.reload(true)">Zrušiť</a>\
				  </div>');
			unsafeWindow.checkTime($('#studentizer_cas').val());
		});
	}
}


$(document).ready(function(e) {	
	unsafeWindow.start();
});