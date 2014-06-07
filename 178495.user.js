// ==UserScript==
// @name        	Informator
// @namespace   	http://www.wykop.pl/ludzie/Deykun
// @description 	Dodatkowe informacje o zgłoszeniach w panelu.
// @author      	Deykun
// @icon        	http://c3201142.cdn02.imgwykop.pl/comment_PwBob1lVqPIGUGJRBn9kSGZhUVyj1CeA.gif
// @include	    	http://*.wykop.pl/naruszenia/moje*
// @include	    	http://wykop.pl/naruszenia/moje*
// @include	    	http://wykop.pl/ustawienia*
// @include	    	http://wykop.pl/settings*
// @include	    	http://*.wykop.pl/ustawienia*
// @include	    	http://*.wykop.pl/settings*
// @updateURL		http://userscripts.org/scripts/source/178495.user.js    
// @version     	1.25d
// @grant       	none
// @run-at			document-end
//
// Podziękowania i inspiracje.
// Kod dodawania inspirowany Sprawdzatorem Dreszczyka.
// Kod zapisywania danych inspirowany Automatycznym trybem nocnym Kamdza.
//
// ==/UserScript==
var main = function () {
//Ikony: logo, ziel, czer, nieb
var inicon = ['http://c3201142.cdn03.imgwykop.pl/comment_ULVNdabLvaJFoNIncxLt069s2daYNTVy.jpg','http://c3201142.cdn03.imgwykop.pl/comment_oVVceNrf4sbOPsHTnFQEqmSyABh25VXs.jpg','http://c3201142.cdn03.imgwykop.pl/comment_mR09NQ7smlpnKcqgoPDPTNirXUJkEU2W.jpg', 'http://c3201142.cdn03.imgwykop.pl/comment_usGFEDKBTE9OchcFfd5K3xSGECcyy6Vj.jpg']

$(document).ready(function($) {
    //ustawienia
    var inf1 = (localStorage.getItem('inf1_dane') || 'off') == 'on' ? true : false; //wyświetlanie %
	var inf2 = (localStorage.getItem('inf2_dane') || 'off') == 'on' ? true : false; //wyświetlanie tylko kwadrarów
	var inf3 = (localStorage.getItem('inf3_dane') || 'off') == 'on' ? true : false; //prowadzenie statystyk
	
    //Strona z naruszeniami
    if (document.location.pathname.match('/naruszenia/'))
        {
        //Liczba zgłoszeń (liczy obrazki)
    	var popr = $('img[src="http://s3.cdn03.imgwykop.pl/static/wykoppl/img/market/accepted.png"]').size();
    	var niep = $('img[src="http://s3.cdn03.imgwykop.pl/static/wykoppl/img/market/banned.png"]').size();
    	var ocze = $('img[src="http://s3.cdn03.imgwykop.pl/static/wykoppl/img/market/waiting.png"]').size();
			
		//Wersja awaryjna
		if (popr == 0 && niep == 0 && ocze == 0) {
			popr = $('img[src="http://s2.cdn02.imgwykop.pl/static/wykoppl/img/market/accepted.png"]').size();
			niep = $('img[src="http://s2.cdn02.imgwykop.pl/static/wykoppl/img/market/banned.png"]').size();
			ocze = $('img[src="http://s2.cdn02.imgwykop.pl/static/wykoppl/img/market/waiting.png"]').size();}
		
		//Komunikat z informacją o braku danych
    	if (popr == 0 && niep == 0 && ocze == 0){
            $('div[class="clr pding5_0 medium brbottdf lheight20 filters"]').before('<class style="float:right; margin-top:13px; margin-right:5px; font-size:x-small;" ><img height="8px" src="'+ inicon[0] +'" title="Informator"> Informator: Brak zgłoszeń na stronie lub błąd który można zgłosić <a title="Podpowiedź: (Jeżeli w panelu zgłoszeń nie masz żadnych zgłoszeń to Informator nie ma czego liczyć)" href="http://www.wykop.pl/wiadomosc-prywatna/konwersacja/Deykun">tutaj</a>.</class>');}
        else {			
			//Dane w procentach
			var suma = popr + niep;
			if (suma != 0) 
				{ var infpp = parseInt((popr/suma)*100);
				var infnpnp = parseInt((niep/suma)*100);}
			else { var infpp = 0; var infnpnp = 0;}
				
            var poprawne = parseFloat((popr/suma)*100).toFixed(1);
            var niepoprawne = parseFloat((niep/suma)*100).toFixed(1);
			
			if (inf1 == true)
				{ var poprpokaz = poprawne +'%';
				var nieppokaz = niepoprawne +'%';}
			else { var poprpokaz = popr; var nieppokaz = niep;}
			
			//Podpisy
			var infp = 'Prawidłowych zgłoszeń:';
			var infnp = 'Nieprawidłowych zgłoszeń:';
			var info = 'Oczekujących zgłoszeń:';
			
			var titpop = 'title="Prawidłowych zgłoszeń: '+ popr +' czyli '+ poprawne +'%."';
			var titnie = 'title="Nieprawidłowych zgłoszeń: '+ niep +' czyli '+ niepoprawne +'%."';
			var titocz = 'title="Oczekujących zgłoszeń: '+ ocze +' przy '+ suma +' rozpatrzonych."';
            
			//Statystyki
			if (inf3 == true) {
				Date.prototype.getWeek = function() {
				var onejan = new Date(this.getFullYear(),0,1);
				return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
				} 
				var inweek = parseInt((new Date()).getWeek()); //obecny tydzień
				var inday = parseInt((new Date()).getDay()); //obecny dzień
			
				var inlastweek = parseInt(localStorage.getItem('informator.lastweek')) || 0; //tydzień ostatniej wizyty
				var inlastday = parseInt(localStorage.getItem('informator.lastday')) || 0; //dzien ostatniej wizyty
				
				var inf4 = (localStorage.getItem('inf4_dane') || 'off') == 'on' ? true : false; //pokazywanie zmian
				
				//Pokazywanie zmian statystyk
				if (inf4 == true) {		
					var inlapop = parseInt(localStorage.getItem('informator.inlapop')) || 0; //ostatni stan
					var inlanpop = parseInt(localStorage.getItem('informator.inlanpop')) || 0;
					
					var deltapop = popr - inlapop;
					var deltanpop = niep - inlanpop;
					
					if (deltapop != 0){
						if (deltapop > 0) {deltapop = '+'+ deltapop;}
						var poprpokaz = '('+ deltapop +') '+ poprpokaz;}
					
					if (deltanpop != 0){
						if (deltanpop > 0) {deltanpop = '+'+ deltanpop;}
						var nieppokaz = nieppokaz +' ('+ deltanpop +')';}}

				//Najlepsze
				var inbspop = parseInt(localStorage.getItem('informator.inbspop')) || 0; //stan najlepszych
				var inbsnpop = parseInt(localStorage.getItem('informator.inbsnpop')) || 0;
				var inbssuma = parseInt(inbspop+inbsnpop);
				
				if (suma >= inbssuma){
					if (inbssuma != 0) {var inbspro = parseFloat((inbspop/inbssuma)*100).toFixed(1);}
					else {var inbspro = 0;}
					
					if (poprawne >= inbspro) {
						localStorage.setItem('informator.inbspop', popr);
						localStorage.setItem('informator.inbsnpop', niep);}}
					
				//Zapis obencego statnu
				localStorage.setItem('informator.inlapop', popr);
				localStorage.setItem('informator.inlanpop', niep);
				
				//Średnie
				if (inweek == (inlastweek+1) && inday >= inlastday) {
					var instpop = parseInt(localStorage.getItem('informator.instpop')) || 0; //stan statystyk
					var instnpop = parseInt(localStorage.getItem('informator.instnpop')) || 0;
							
					var instpop = popr + instpop;
					var instnpop = niep + instnpop;
					
					localStorage.setItem('informator.instpop', instpop);
					localStorage.setItem('informator.instnpop', instnpop);
					localStorage.setItem('informator.lastweek', inweek);
					localStorage.setItem('informator.lastday', inday);}
				else if (inweek != inlastweek || inlastweek == 0){
					var instpop = parseInt(localStorage.getItem('informator.instpop')) || 0; //stan statystyk
					var instnpop = parseInt(localStorage.getItem('informator.instnpop')) || 0;
										
					var instpop = popr + instpop;
					var instnpop = niep + instnpop;
					
					localStorage.setItem('informator.instpop', instpop);
					localStorage.setItem('informator.instnpop', instnpop);
					localStorage.setItem('informator.lastweek', inweek);
					localStorage.setItem('informator.lastday', inday);}}
	
        	if (ocze == 0) {
				if (inf2 == true) {
					$('div[class="clr pding5_0 medium brbottdf lheight20 filters"]').before('<class style="float:right; margin-top:13px; margin-right:5px; font-size:x-small;" > ' + poprpokaz + ' <img height="8px" width="'+ (infpp+1) +'px" '+ titpop +' src="'+ inicon[1] +'"><img height="8px" width="'+ (infnpnp+1) +'px" '+ titnie +' src="'+ inicon[2] +'"> ' + nieppokaz + '</class>');} //bez podpisu
				else {
					$('div[class="clr pding5_0 medium brbottdf lheight20 filters"]').before('<class style="float:right; margin-top:13px; margin-right:5px; font-size:x-small;" >'+infp+' ' + poprpokaz + ' <img height="8px" '+ titpop +' src="'+ inicon[1] +'"> '+ infnp +' ' + nieppokaz + ' <img height="8px" '+ titnie +' src="'+ inicon[2] +'"></class>');}} //z podpisem
        	
        	else if (suma != 0){
				if (inf2 == true) {
					$('div[class="clr pding5_0 medium brbottdf lheight20 filters"]').before('<class style="float:right; margin-top:13px; margin-right:5px; font-size:x-small;" > ' + poprpokaz + ' <img height="8px" width="'+ (infpp+1) +'px" '+ titpop +' src="'+ inicon[1] +'"><img height="8px" width="'+ (infnpnp+1) +'px" '+ titnie +' src="'+ inicon[2] +'"> ' + nieppokaz + ' <img height="8px" '+ titocz +' src="'+ inicon[3] +'"> ' + ocze + '</class>');}
				else {
					$('div[class="clr pding5_0 medium brbottdf lheight20 filters"]').before('<class style="float:right; margin-top:13px; margin-right:5px; font-size:x-small;" >'+infp+' ' + poprpokaz + ' <img height="8px" '+ titpop +' src="'+ inicon[1] +'"> '+infnp+' ' + nieppokaz + ' <img height="8px" '+ titnie +' src="'+ inicon[2] +'"> '+info+' ' + ocze + ' <img height="8px" '+ titocz +' src="'+ inicon[3] +'"></class>');}}
					
			else {
				if (inf2 == true) {
					$('div[class="clr pding5_0 medium brbottdf lheight20 filters"]').before('<class style="float:right; margin-top:13px; margin-right:5px; font-size:x-small;" ><img height="8px" '+ titocz +' src="'+ inicon[3] +'"> ' + ocze + '</class>');}
				else {
					$('div[class="clr pding5_0 medium brbottdf lheight20 filters"]').before('<class style="float:right; margin-top:13px; margin-right:5px; font-size:x-small;" >Brak rozpatrzonych zgłoszeń. '+info+' ' + ocze + ' <img height="8px" '+ titocz +' src="'+ inicon[3] +'"></class>');}}}}
    	
    //Strona ustawień
	if (document.location.pathname.match('/ustawienia/')) {
		var inf4 = (localStorage.getItem('inf4_dane') || 'off') == 'on' ? true : false; //informacje
        var nick = $('.avatar a').attr('title');
		
		if (inf3 == true) {
		var infsize = 8; //wysokość wykresów
		
		//Obecnie:
		var inlapop = parseInt(localStorage.getItem('informator.inlapop')) || 0;
		var inlanpop = parseInt(localStorage.getItem('informator.inlanpop')) || 0;
		var suma = parseInt(inlapop+inlanpop);
           
		if (suma != 0) {
			var inlapro = parseFloat((inlapop/suma)*100).toFixed(1); var inlapops = parseInt((inlapop/suma)*150);
			var inlanpops = 150 - inlapops;
			
			var infplot0 = '<td style="text-align:right; padding-right:5px;">Obecnie: </td><td><img height="'+ infsize +'px" width="'+ inlapops +'px" title="Prawidłowych zgłoszeń: '+ inlapop +'" src="'+ inicon[1] +'"><img height="'+ infsize +'px" width="'+ inlanpops +'px" title="Nieprawidłowych zgłoszeń: '+ inlanpop +'" src="'+ inicon[2] +'"></td><td>'+ inlapro +'% z '+ suma +' zgłoszeń</td></tr><tr>';}
		else {var infplot0 = '';}
			
		//Średnio:
		var instpop = parseInt(localStorage.getItem('informator.instpop')) || 0;
		var instnpop = parseInt(localStorage.getItem('informator.instnpop')) || 0;
		var suma = parseInt(instpop+instnpop);
            
			if (suma != 0) {
				var instpro = parseFloat((instpop/suma)*100).toFixed(1); var instpops = parseInt((instpop/suma)*150);
				var instnpops = 150 - instpops;
				
				var infplot1 = '<td style="font-weight:bold; text-align:right; padding-right:5px;">Średnio: </td><td><img height="'+ infsize +'px" width="'+ instpops +'px" title="Prawidłowych zgłoszeń: '+ instpop +'" src="'+ inicon[1] +'"><img height="'+ infsize +'px" width="'+ instnpops +'px" title="Nieprawidłowych zgłoszeń: '+ instnpop +'" src="'+ inicon[2] +'"></td><td>'+ instpro +'% z '+ suma +' zgłoszeń</td></tr><tr>';}
			else {var infplot1 = '';}
				
		//Rekord:
		var inbspop = parseInt(localStorage.getItem('informator.inbspop')) || 0;
		var inbsnpop = parseInt(localStorage.getItem('informator.inbsnpop')) || 0;
		var suma = parseInt(inbspop+inbsnpop);
		
		if (suma != 0) {
			var inbspro = parseFloat((inbspop/suma)*100).toFixed(1); var inbspops = parseInt((inbspop/suma)*150);
			var inbsnpops = 150 - inbspops;
			
			var infplot2 = '<td style="text-align:right; padding-right:5px;">Rekord: </td><td><img height="'+ infsize +'px" width="'+ inbspops +'px" title="Prawidłowych zgłoszeń: '+ inbspop +'" src="'+ inicon[1] +'"><img height="'+ infsize +'px" width="'+ inbsnpops +'px" title="Nieprawidłowych zgłoszeń: '+ inbsnpop +'" src="'+ inicon[2] +'"></td><td>'+ inbspro +'% z '+ suma +' zgłoszeń</td></tr><tr>';}
		else {var infplot2 = '';}			
		
		//Komunikat o braku danych
		if (infplot0 == '' && infplot1 == '' && infplot2 == '') {
			var infstat1 = '<p style="padding-left:25px; font-size:x-small;">Brak danych. Odwiedź panel zgłoszeń by dodać ewentualne zgłoszenia.</p><p style="padding-left:25px;"><input id="inf4" name="inf4" class="chk-box" type="checkbox" value="on" ' + (inf4 ? 'checked="checked"' : '') + '><label for="inf4"> pokazuj zmiany od ostatniej wizyty na stronie naruszeń</p>';}
		else {
			var infstat2 = infplot0+infplot1+infplot2;
			var infstat1 = '<p><table style="font-size:x-small;"><tr><td width="70px"></td><td width="155px">Rozkład ocen</td><td width="150px"></td></tr><tr>'+infstat2+'</table></p><p style="padding-left:25px;"><input id="inf4" name="inf4" class="chk-box" type="checkbox" value="on" ' + (inf4 ? 'checked="checked"' : '') + '><label for="inf4"> pokazuj zmiany od ostatniej wizyty na stronie naruszeń</p>';}}
		
		//Statystyki wylaczone
		else {
		var infstat1 = '<p style="padding-left:25px;"><input id="inf4" name="inf4" class="chk-box" type="checkbox" value="off" ' + (inf4 ? 'checked="checked"' : '') + ' disabled="disabled"><label for="inf4"> pokazuj zmiany od ostatniej wizyty na stronie naruszeń</p>';}
		
		//panel informatora
		$('div[class="fblock margin20_0"]').before('<div class="fblock margin10_0 marginbott20"><fieldset class="bgf6f6f6 pding5"><h3 class="large fbold fleft"><a title="Strona dodatku" href="http://www.wykop.pl/dodatki/pokaz/409/">Informator</a></h3><div class="fleft"><p><input id="inf3" name="inf3" class="chk-box" type="checkbox" value="on" ' + (inf3 ? 'checked="checked"' : '') + ' onclick="this.form.elements[&#039inf4&#039].disabled = !this.checked"><label for="inf3"> prowadź statystyki rozpatrzonych zgłoszeń</label></p>'+infstat1+'<p><p><input id="inf1" name="inf1" class="chk-box" type="checkbox" value="on" ' + (inf1 ? 'checked="checked"' : '') + '><label for="inf1"> rozpatrzone zgłoszenia w procentach</label></p><p><input id="inf2" name="inf2" class="chk-box" type="checkbox" value="on" ' + (inf2 ? 'checked="checked"' : '') + '><label for="inf2"> rozkład ocen bez podpisów pokazany na prostokątach</label></p><p style="font-size:x-small;" ><br>Penel zgłoszeń możesz odnaleźć <a title="zakładka zgłoszeń" href="http://www.wykop.pl/naruszenia/moje/">tutaj</a> natomiast mininalistyczną wersje Informatora bez statystyk <a title="Strona dodatku" href="http://userscripts.org/scripts/show/183053">tu</a>.</p></div></fieldset></div>');
		
		//inf1 - wyświetlanie %
		if ($('#inf1').is(':checked')){
			$('#info1').attr('disabled', true);}
		
		$('#inf1').click(function () {
			if (this.checked) {
				$('#info1').attr('disabled', true);}
			else {
				$('#info1').removeAttr('disabled');
				$('#info1').attr('checked', false);}});
		
		$(document).delegate('form', 'submit', function () {
			localStorage.setItem('inf1_data', $('input[name*="user"][name!="user[info1]"]').serialize());
			if ($('#inf1').is(':checked')) {localStorage.setItem('inf1_dane', $('#inf1').val());}
			else {localStorage.setItem('inf1_dane', 'off');}});
		
		//inf2 - wyświetlanie tylko kwadratów
		if ($('#inf2').is(':checked')){
			$('#info2').attr('disabled', true);}
		
		$('#inf2').click(function () {
			if (this.checked) {
				$('#info2').attr('disabled', true);}
			else {
				$('#info2').removeAttr('disabled');
				$('#info2').attr('checked', false);}});	
		
		$(document).delegate('form', 'submit', function () {
			localStorage.setItem('inf2_data', $('input[name*="user"][name!="user[info2]"]').serialize());
			if ($('#inf2').is(':checked')) {localStorage.setItem('inf2_dane', $('#inf1').val());}
			else {localStorage.setItem('inf2_dane', 'off');}});
		
		//inf3 - statystyki
		if ($('#inf3').is(':checked')){
			$('#info3').attr('disabled', true);}
		
		$('#inf3').click(function () {
			if (this.checked) {
				$('#info3').attr('disabled', true);}
			else {
				$('#info3').removeAttr('disabled');
				$('#info3').attr('checked', false);}});
		
		$(document).delegate('form', 'submit', function () {
			localStorage.setItem('inf3_data', $('input[name*="user"][name!="user[info3]"]').serialize());
			if ($('#inf3').is(':checked')) {localStorage.setItem('inf3_dane', $('#inf3').val());}
			else {localStorage.setItem('inf3_dane', 'off');}});}
		
		//inf4 - statystyki w panelu zakladek
		if (inf3 == true){
			if ($('#inf4').is(':checked')){
				$('#info4').attr('disabled', true);}
			
			$('#inf4').click(function () {
				if (this.checked) { $('#info4').attr('disabled', true);}
				else {
					$('#info4').removeAttr('disabled');
					$('#info4').attr('checked', false);}});
			
			$(document).delegate('form', 'submit', function () {
				localStorage.setItem('inf4_data', $('input[name*="user"][name!="user[info4]"]').serialize());
				if ($('#inf4').is(':checked')) {localStorage.setItem('inf4_dane', $('#inf3').val());}
				else {localStorage.setItem('inf4_dane', 'off');}});}});}

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)

window.G_wait = function G_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') {window.setTimeout(G_wait,100);}
  else {$ = unsafeWindow.jQuery; start_fancy();}}