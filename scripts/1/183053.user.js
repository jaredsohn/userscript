// ==UserScript==
// @name        	mini Informator
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
// @updateURL		http://userscripts.org/scripts/source/183053.user.js    
// @version     	1.25
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
		var nick = $('.avatar a').attr('title');
		
		//panel informatora
		$('div[class="fblock margin20_0"]').before('<div class="fblock margin10_0 marginbott20"><fieldset class="bgf6f6f6 pding5"><h3 class="large fbold fleft"><a title="Strona dodatku" href="http://www.wykop.pl/dodatki/pokaz/409/">Informator</a></h3><div class="fleft"><p><input id="inf1" name="inf1" class="chk-box" type="checkbox" value="on" ' + (inf1 ? 'checked="checked"' : '') + '><label for="inf1"> rozpatrzone zgłoszenia w procentach</label></p><p><input id="inf2" name="inf2" class="chk-box" type="checkbox" value="on" ' + (inf2 ? 'checked="checked"' : '') + '><label for="inf2"> rozkład ocen bez podpisów pokazany na prostokątach</label></p><p style="font-size:x-small;" ><br>Penel zgłoszeń możesz odnaleźć <a title="zakładka zgłoszeń" href="http://www.wykop.pl/naruszenia/moje/">tutaj</a> natomiast pełną wersje Informatora ze statystykami <a title="Strona dodatku" href="http://www.wykop.pl/dodatki/pokaz/409/">tu</a>.</p></div></fieldset></div>');
		
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
		
	}
	});}

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)

window.G_wait = function G_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') {window.setTimeout(G_wait,100);}
  else {$ = unsafeWindow.jQuery; start_fancy();}}