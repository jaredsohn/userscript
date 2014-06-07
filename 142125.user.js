// ==UserScript==
// @name           DW Plus
// @description    Rozszerza podstawowe mozliwosci www.darkwarez.pl
// @version        1.0.0
// @author		   mentor90
// @include        *darkwarez.pl/forum/*
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function (){
	if(typeof getCookie('dwPlusStart') == 'undefined'){
		setCookie('dwPlusStart', 1);
		setCookie('dwPlusTopZWyszukiwarka', 1);
		setCookie('dwPlusDodatkoweWyszukiwarki', 1);
		setCookie('dwPlusUkryjOnline', 1);
		setCookie('dwPlusYoutubeNaLinki', 1);
		setCookie('dwPlusSzybkaOdpowiedz', 1);
		setCookie('dwPlusCytowanieSelektywne', 1);
		setCookie('dwPlusUkryjOgloszenie', 1);
		setCookie('dwPlusPostyNaStronie', 1);
		setCookie('dwPlusPowiadomienieCzat', 1);
	}
	dwPlus();
	
	if(getCookie('dwPlusTopZWyszukiwarka') == 1){
		wyszukiwarkaTop();
	}	
	if(getCookie('dwPlusDodatkoweWyszukiwarki') == 1 && /darkwarez\.pl\/forum\/$/.test(document.URL)){
		dodatkoweWyszukiwarki();
	}	
	if(getCookie('dwPlusUkryjOnline') == 1 && /darkwarez\.pl\/forum\/$/.test(document.URL)){
		podzialKtoJestNaForum();
		ukryjOnline();
		zmianaLegendy();
	}
	if((getCookie('dwPlusYoutubeNaLinki') == 1) && (/darkwarez\.pl\/forum\/[a-z0-9\-]+\/[0-9]+\-[a-z0-9\-]+\.html/.test(document.URL) || /darkwarez\.pl\/forum\/post\-[0-9]+\.html/.test(document.URL))){
		zmienYoutube();
	}
	if((getCookie('dwPlusSzybkaOdpowiedz') == 1) && (/darkwarez\.pl\/forum\/[a-z0-9\-]+\/[0-9]+\-[a-z0-9\-]+\.html/.test(document.URL) || /darkwarez\.pl\/forum\/post\-[0-9]+\.html/.test(document.URL))){
		szybkaOdpowiedz();
	}
	if((getCookie('dwPlusCytowanieSelektywne') == 1) && (/darkwarez\.pl\/forum\/[a-z0-9\-]+\/[0-9]+\-[a-z0-9\-]+\.html/.test(document.URL) || /darkwarez\.pl\/forum\/post\-[0-9]+\.html/.test(document.URL))){
		obrazekCytujSelektywnie();
	}
	if((getCookie('dwPlusUkryjOgloszenie') == 1)){
		ukryjOgloszenie();
	}
	if(getCookie('dwPlusPostyNaStronie') == 1){
		if(/darkwarez\.pl\/forum\/[a-z0-9\-]+\/$/.test(document.URL) || /darkwarez\.pl\/forum\/[a-z0-9\-]+\/index\-[0-9]+\.html$/.test(document.URL)){
			liczbaPostowNaStronieDzial();
		}
		if(/darkwarez\.pl\/forum\/[a-z0-9\-]+\/[0-9]+\-[a-z0-9\-]+\.html/.test(document.URL) || /darkwarez\.pl\/forum\/post\-[0-9]+\.html/.test(document.URL)){
			liczbaPostowNaStronieTemat();
		}
		if(/darkwarez\.pl\/forum\/search\.php\?/.test(document.URL)){
			liczbaPostowNaStronieSzukaj();
		}
	}
	if(getCookie('dwPlusPowiadomienieCzat') == 1 && /darkwarez\.pl\/forum\/chat\.php/.test(document.URL)){
		czatowyPowiadamiacz();
	}
}, false);


// DW Plus i ustawienia
function dwPlus(){
	var a = document.getElementsByTagName('a');
	for(var i=0; i<a.length; i++){
		if(/status\.php/.test(a[i].href)){
			var span = document.createElement('span');
			span.setAttribute('id', 'dwPlus');
		
			var img = document.createElement('img');
			img.setAttribute('src', 'templates/bLock/images/cellpic.gif');

			var aNowe = document.createElement('a');
			aNowe.setAttribute('id', 'dwPlusLink');
			aNowe.setAttribute('class', 'mainmenu');
			aNowe.innerHTML = 'DW Plus';
			aNowe.onclick = pokazOpcje;
			
			span.appendChild(document.createTextNode(' '));
			span.appendChild(img);
			span.appendChild(document.createTextNode(' '));
			span.appendChild(aNowe);
			a[i].parentNode.insertBefore(span, a[i].nextSibling);
			break;
		}
	}
}

function pokazOpcje(){
	var dwPlus = document.getElementById('dwPlus');

	// top z wyszukiwarka
	var dwPlusTopZWyszukiwarka = getCookie('dwPlusTopZWyszukiwarka');
	if(dwPlusTopZWyszukiwarka == 1)
		var dwPlusTopZWyszukiwarka1 = 'checked="checked"';
	else
		var dwPlusTopZWyszukiwarka2 = 'checked="checked"';

	// 4 dodatkowe wyszukiwarki
	var dwPlusDodatkoweWyszukiwarki = getCookie('dwPlusDodatkoweWyszukiwarki');
	if(dwPlusDodatkoweWyszukiwarki == 1)
		var dwPlusDodatkoweWyszukiwarki1 = 'checked="checked"';
	else
		var dwPlusDodatkoweWyszukiwarki2 = 'checked="checked"';

	// ukrycie listy online
	var dwPlusUkryjOnline = getCookie('dwPlusUkryjOnline');
	if(dwPlusUkryjOnline == 1)
		var dwPlusUkryjOnline1 = 'checked="checked"';
	else
		var dwPlusUkryjOnline2 = 'checked="checked"';

	// zamiana video youtube na linki
	var dwPlusYoutubeNaLinki = getCookie('dwPlusYoutubeNaLinki');
	if(dwPlusYoutubeNaLinki == 1)
		var dwPlusYoutubeNaLinki1 = 'checked="checked"';
	else
		var dwPlusYoutubeNaLinki2 = 'checked="checked"';

	// szybka odpowiedz 
	var dwPlusSzybkaOdpowiedz = getCookie('dwPlusSzybkaOdpowiedz');
	if(dwPlusSzybkaOdpowiedz == 1)
		var dwPlusSzybkaOdpowiedz1 = 'checked="checked"';
	else
		var dwPlusSzybkaOdpowiedz2 = 'checked="checked"';

	// cytowanie selektywne
	var dwPlusCytowanieSelektywne = getCookie('dwPlusCytowanieSelektywne');
	if(dwPlusCytowanieSelektywne == 1)
		var dwPlusCytowanieSelektywne1 = 'checked="checked"';
	else
		var dwPlusCytowanieSelektywne2 = 'checked="checked"';

	// ukryj ogloszenie
	var dwPlusUkryjOgloszenie = getCookie('dwPlusUkryjOgloszenie');
	if(dwPlusUkryjOgloszenie == 1)
		var dwPlusUkryjOgloszenie1 = 'checked="checked"';
	else
		var dwPlusUkryjOgloszenie2 = 'checked="checked"';

	// posty na stronie
	var dwPlusPostyNaStronie = getCookie('dwPlusPostyNaStronie');
	if(dwPlusPostyNaStronie == 1)
		var dwPlusPostyNaStronie1 = 'checked="checked"';
	else
		var dwPlusPostyNaStronie2 = 'checked="checked"';

	// powiadomienie na czacie
	var dwPlusPowiadomienieCzat = getCookie('dwPlusPowiadomienieCzat');
	if(dwPlusPowiadomienieCzat == 1)
		var dwPlusPowiadomienieCzat1 = 'checked="checked"';
	else
		var dwPlusPowiadomienieCzat2 = 'checked="checked"';
	
	
	dwPlus.innerHTML += '<table id="dwPlusOpcje" cellpadding="3" cellspacing="1" width="60%" class="forumline" style="margin-top: 30px;"><tr><th class="thHead" colspan="2" height="25" valign="middle">Ustawienia DW Plus</th></tr>'
	+'<tr><td class="row1" width="60%"><img src="./templates/bLock/images/cellpic.gif" border="0"> <span class="gen">Pokaż nowy top z wyszukiwarką:</span></td><td class="row2"><input type="radio" name="dwPlusTopZWyszukiwarka" id="dwPlusTopZWyszukiwarka1" ' + dwPlusTopZWyszukiwarka1 + '/><span class="gen">Tak</span><input type="radio" name="dwPlusTopZWyszukiwarka" id="dwPlusTopZWyszukiwarka2" ' + dwPlusTopZWyszukiwarka2 + '/><span class="gen">Nie</span></td></tr>'
	+'<tr><td class="row1" width="60%"><img src="./templates/bLock/images/cellpic.gif" border="0"> <span class="gen">Pokaż 4 dodatkowe wyszukiwarki:</span></td><td class="row2"><input type="radio" name="dwPlusDodatkoweWyszukiwarki" id="dwPlusDodatkoweWyszukiwarki1" ' + dwPlusDodatkoweWyszukiwarki1 + '/><span class="gen">Tak</span><input type="radio" name="dwPlusDodatkoweWyszukiwarki" id="dwPlusDodatkoweWyszukiwarki2" ' + dwPlusDodatkoweWyszukiwarki2 + '/><span class="gen">Nie</span></td></tr>'
	+'<tr><td class="row1" width="60%"><img src="./templates/bLock/images/cellpic.gif" border="0"> <span class="gen">Ukryj liste użytkowników online:</span></td><td class="row2"><input type="radio" name="dwPlusUkryjOnline" id="dwPlusUkryjOnline1" ' + dwPlusUkryjOnline1 + '/><span class="gen">Tak</span><input type="radio" name="dwPlusUkryjOnline" id="dwPlusUkryjOnline2" ' + dwPlusUkryjOnline2 + '/><span class="gen">Nie</span></td></tr>'
	+'<tr><td class="row1" width="60%"><img src="./templates/bLock/images/cellpic.gif" border="0"> <span class="gen">Zamieniaj video YouTube na linki:</span></td><td class="row2"><input type="radio" name="dwPlusYoutubeNaLinki" id="dwPlusYoutubeNaLinki1" ' + dwPlusYoutubeNaLinki1 + '/><span class="gen">Tak</span><input type="radio" name="dwPlusYoutubeNaLinki" id="dwPlusYoutubeNaLinki2" ' + dwPlusYoutubeNaLinki2 + '/><span class="gen">Nie</span></td></tr>'
	+'<tr><td class="row1" width="60%"><img src="./templates/bLock/images/cellpic.gif" border="0"> <span class="gen">Szybka odpowiedź:</span></td><td class="row2"><input type="radio" name="dwPlusSzybkaOdpowiedz" id="dwPlusSzybkaOdpowiedz1" ' + dwPlusSzybkaOdpowiedz1 + '/><span class="gen">Tak</span><input type="radio" name="dwPlusSzybkaOdpowiedz" id="dwPlusSzybkaOdpowiedz2" ' + dwPlusSzybkaOdpowiedz2 + '/><span class="gen">Nie</span></td></tr>'
	+'<tr><td class="row1" width="60%"><img src="./templates/bLock/images/cellpic.gif" border="0"> <span class="gen">Cytowanie selektywne (działa tylko z szybką odpowiedzią):</span></td><td class="row2"><input type="radio" name="dwPlusCytowanieSelektywne" id="dwPlusCytowanieSelektywne1" ' + dwPlusCytowanieSelektywne1 + '/><span class="gen">Tak</span><input type="radio" name="dwPlusCytowanieSelektywne" id="dwPlusCytowanieSelektywne2" ' + dwPlusCytowanieSelektywne2 + '/><span class="gen">Nie</span></td></tr>'
	+'<tr><td class="row1" width="60%"><img src="./templates/bLock/images/cellpic.gif" border="0"> <span class="gen">Ukryj ogłoszenie:</span></td><td class="row2"><input type="radio" name="dwPlusUkryjOgloszenie" id="dwPlusUkryjOgloszenie1" ' + dwPlusUkryjOgloszenie1 + '/><span class="gen">Tak</span><input type="radio" name="dwPlusUkryjOgloszenie" id="dwPlusUkryjOgloszenie2" ' + dwPlusUkryjOgloszenie2 + '/><span class="gen">Nie</span></td></tr>'
	+'<tr><td class="row1" width="60%"><img src="./templates/bLock/images/cellpic.gif" border="0"> <span class="gen">Liczba postów na stronie:</span></td><td class="row2"><input type="radio" name="dwPlusPostyNaStronie" id="dwPlusPostyNaStronie1" ' + dwPlusPostyNaStronie1 + '/><span class="gen">Tak</span><input type="radio" name="dwPlusPostyNaStronie" id="dwPlusPostyNaStronie2" ' + dwPlusPostyNaStronie2 + '/><span class="gen">Nie</span></td></tr>'
	+'<tr><td class="row1" width="60%"><img src="./templates/bLock/images/cellpic.gif" border="0"> <span class="gen">Powiadomienie o nowej wiadomości na czacie:</span></td><td class="row2"><input type="radio" name="dwPlusPowiadomienieCzat" id="dwPlusPowiadomienieCzat1" ' + dwPlusPowiadomienieCzat1 + '/><span class="gen">Tak</span><input type="radio" name="dwPlusPowiadomienieCzat" id="dwPlusPowiadomienieCzat2" ' + dwPlusPowiadomienieCzat2 + '/><span class="gen">Nie</span></td></tr>'
	+'<tr><th class="thHead" colspan="2" height="25" valign="middle"><input type="button" class="mainoption" onclick="location.href=\''+document.URL+'\'" value="Zapisz" /></th></tr>';
	+'</table>';
	
	// top z wyszukiwarka
	dwPlusTopZWyszukiwarka1 =  document.getElementById('dwPlusTopZWyszukiwarka1');
	dwPlusTopZWyszukiwarka2 =  document.getElementById('dwPlusTopZWyszukiwarka2');
	dwPlusTopZWyszukiwarka1.onclick = function(){
			setCookie('dwPlusTopZWyszukiwarka', 1);
	}
	dwPlusTopZWyszukiwarka2.onclick = function(){
			setCookie('dwPlusTopZWyszukiwarka', 0);
	}
	
	// 4 dodatkowe wyszukiwarki
	dwPlusDodatkoweWyszukiwarki1 =  document.getElementById('dwPlusDodatkoweWyszukiwarki1');
	dwPlusDodatkoweWyszukiwarki2 =  document.getElementById('dwPlusDodatkoweWyszukiwarki2');
	dwPlusDodatkoweWyszukiwarki1.onclick = function(){
			setCookie('dwPlusDodatkoweWyszukiwarki', 1);
	}
	dwPlusDodatkoweWyszukiwarki2.onclick = function(){
			setCookie('dwPlusDodatkoweWyszukiwarki', 0);
	}
	
	// ukrycie listy online
	dwPlusUkryjOnline1 =  document.getElementById('dwPlusUkryjOnline1');
	dwPlusUkryjOnline2 =  document.getElementById('dwPlusUkryjOnline2');
	dwPlusUkryjOnline1.onclick = function(){
			setCookie('dwPlusUkryjOnline', 1);
	}
	dwPlusUkryjOnline2.onclick = function(){
			setCookie('dwPlusUkryjOnline', 0);
	}
	
	// zamiana video youtube na linki
	dwPlusYoutubeNaLinki1 =  document.getElementById('dwPlusYoutubeNaLinki1');
	dwPlusYoutubeNaLinki2 =  document.getElementById('dwPlusYoutubeNaLinki2');
	dwPlusYoutubeNaLinki1.onclick = function(){
			setCookie('dwPlusYoutubeNaLinki', 1);
	}
	dwPlusYoutubeNaLinki2.onclick = function(){
			setCookie('dwPlusYoutubeNaLinki', 0);
	}
	
	// szybka odpowiedz 
	dwPlusSzybkaOdpowiedz1 =  document.getElementById('dwPlusSzybkaOdpowiedz1');
	dwPlusSzybkaOdpowiedz2 =  document.getElementById('dwPlusSzybkaOdpowiedz2');
	dwPlusSzybkaOdpowiedz1.onclick = function(){
			setCookie('dwPlusSzybkaOdpowiedz', 1);
	}
	dwPlusSzybkaOdpowiedz2.onclick = function(){
			setCookie('dwPlusSzybkaOdpowiedz', 0);
	}
	
	// cytowanie selektywne
	dwPlusCytowanieSelektywne1 =  document.getElementById('dwPlusCytowanieSelektywne1');
	dwPlusCytowanieSelektywne2 =  document.getElementById('dwPlusCytowanieSelektywne2');
	dwPlusCytowanieSelektywne1.onclick = function(){
			setCookie('dwPlusCytowanieSelektywne', 1);
	}
	dwPlusCytowanieSelektywne2.onclick = function(){
			setCookie('dwPlusCytowanieSelektywne', 0);
	}
	
	// ukryj ogloszenie
	dwPlusUkryjOgloszenie1 =  document.getElementById('dwPlusUkryjOgloszenie1');
	dwPlusUkryjOgloszenie2 =  document.getElementById('dwPlusUkryjOgloszenie2');
	dwPlusUkryjOgloszenie1.onclick = function(){
			setCookie('dwPlusUkryjOgloszenie', 1);
	}
	dwPlusUkryjOgloszenie2.onclick = function(){
			setCookie('dwPlusUkryjOgloszenie', 0);
	}
	
	// posty na stronie
	dwPlusPostyNaStronie1 =  document.getElementById('dwPlusPostyNaStronie1');
	dwPlusPostyNaStronie2 =  document.getElementById('dwPlusPostyNaStronie2');
	dwPlusPostyNaStronie1.onclick = function(){
			setCookie('dwPlusPostyNaStronie', 1);
	}
	dwPlusPostyNaStronie2.onclick = function(){
			setCookie('dwPlusPostyNaStronie', 0);
	}
	
	// pwoadomienie czat
	dwPlusPowiadomienieCzat1 =  document.getElementById('dwPlusPowiadomienieCzat1');
	dwPlusPowiadomienieCzat2 =  document.getElementById('dwPlusPowiadomienieCzat2');
	dwPlusPowiadomienieCzat1.onclick = function(){
			setCookie('dwPlusPowiadomienieCzat', 1);
	}
	dwPlusPowiadomienieCzat2.onclick = function(){
			setCookie('dwPlusPowiadomienieCzat', 0);
	}
	
	
	var dwPlusLink = document.getElementById('dwPlusLink');
	dwPlusLink.onclick = function(){
		var dwPlusOpcje = document.getElementById('dwPlusOpcje');
		dwPlusOpcje.parentNode.removeChild(dwPlusOpcje);
		
		dwPlusLink.onclick = pokazOpcje;
	};
}


// ustawienia cookies
function getCookie(c_name){
	var i, x, y, ARRcookies=document.cookie.split(';');
	for (i=0; i<ARRcookies.length; i++){
		x = ARRcookies[i].substr(0,ARRcookies[i].indexOf('='));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf('=')+1);
		x = x.replace(/^\s+|\s+$/g,'');
		if (x == c_name)
			return unescape(y);
	}
}

function setCookie(c_name, value){
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + 365);
	var c_value=escape(value) + ((365==null) ? '' : '; expires='+exdate.toUTCString());
	document.cookie=c_name + '=' + c_value;
}


// skrypty wlasciwe
function wyszukiwarkaTop(){
	var img = document.getElementsByTagName('img');
	for(var i=0; i<img.length; i++){
		if(img[i].width == 840){
			var gdzie = img[i].parentNode.parentNode;
			gdzie.innerHTML = '<form method="post" style="display: inline;" action="http://darkwarez.pl/forum/search.php?mode=results" name="search2"><input name="show_results" value="topics" type="hidden"><input name="search_terms" value="all" type="hidden"><input name="only_topics" value="topics" type="hidden"><input name="search_fields" value="all" type="hidden"><input type="hidden" name="search_cat" value="1"><div id="prototyp_logo" style="width: 840px;height: 120px;position:relative;text-align: left;"><a href="http://darkwarez.pl/forum" id="#prototyp_link"><img border="0" src="http://46.19.139.50:81/warez.jpg" alt="warez" id="prototype_img"></a><div id="prototyp_szukajka" style="width: 350px;position: absolute;left: 282px;top: 95px;font-size: 11px;font-family:verdana;color:#555555;"><input type="text" style="color: #808080; width: 250px;"  class="post" name="search_keywords" value="Szukaj..." onfocus="if(this.value==\'\' || this.value == this.defaultValue) {this.value=\'\';}" onblur="if(this.value == \'\') {this.value=this.defaultValue;}" > <input type="submit" style="border: 1px solid #555555;background-color:#000000;font-size: 11px;color: #555555;padding-left: 2px;padding-right: 2px;width: 47px;" value="Szukaj" name="submit"></div></div></form>';
			break;
		}
	}
}


function dodatkoweWyszukiwarki(){
	var a = document.getElementsByTagName('a');
	for(var i=0; i<a.length; i++){
		if(/logout/.test(a[i].href)){
			var log = 1;
			break;
		}
	}
	if(log){
		var font=document.getElementsByTagName('font');
		var e = 0;
		for(var i=0; i<font.length; i++){
			if(font[i].color == '#6b696b'){
				var ideki = new Array(3, 1, 6, 5);
				var szukajW = font[i].innerHTML;
				szukajW = szukajW.toLowerCase();
				font[i].parentNode.style.cssFloat = 'left';
				font[i].parentNode.style.margin = '4px 0px 0px 0px';
				font[i].parentNode.parentNode.innerHTML += '<form action="search.php?mode=results" method="POST" name="search" style="float: right;  margin: 0px;  margin-bottom: 2px;"><input type="text" name="search_keywords" class="post" size="26" style="color:#808080; width: 194px;" value="Szukaj w '+szukajW+'..." onfocus="if(this.value==\'\' || this.value == this.defaultValue) {this.value=\'\';}" onblur="if(this.value == \'\') {this.value=this.defaultValue;}" /> <input type="submit" style="border: 1px solid #555555;background-color:#000000;font-size: 11px;color: #555555;padding-left: 2px;padding-right: 2px;width: 47px;" value="Szukaj" name="submit"/>&nbsp;<input type="hidden" name="search_cat" value="'+ideki[e]+'" /><input type="hidden" name="only_topics" value="topics" /><input type="hidden" name="search_terms" value="all" /><input type="hidden" name="search_forum" value="-1" /><input type="hidden" name="search_time" value="0" /><input type="hidden" name="sort_by" value="0" /><input type="hidden" name="sort_dir" value="DESC" /><input type="hidden" name="show_results" value="topics" /><input type="hidden" name="return_chars" value="0" /></form>';
				e++;
			}
		}
	}
}


var statyUkryte1;
var statyUkryte2;
var admin = new Array;
var smod = new Array;
var mod = new Array;
var uplinker = new Array;
var uploader = new Array;
var evip = new Array;
var svip = new Array;
var vip = new Array;

function podzialKtoJestNaForum(){
	var td=document.getElementsByTagName('td');
	for(var i=120; i<td.length; i++){
		if(td[i].className == "row1" && td[i].title == 'warez forum' && td[i].vAlign == 'top'){
			// podzial online na staty + userzy
			var staty = td[i].childNodes[0].innerHTML.split("<br>");
			statyUkryte2 = staty[4];
			staty[4] = '';
			statyUkryte1 = staty.join('<br />');
			// podzial na grupy
			var a = td[i].childNodes[0].getElementsByTagName('a');
			for(var k=0; k<a.length; k++){
				if(a[k].style.color=='rgb(255, 204, 102)')
					admin.push('<a href="'+a[k].href+'" style="color:#FFCC66; font-weight: bold;">'+a[k].innerHTML+'</a>');
				if(a[k].style.color=='rgb(20, 116, 38)')
					smod.push('<a href="'+a[k].href+'" style="color:#147426">'+a[k].innerHTML+'</a>');
				if(a[k].style.color=='rgb(153, 153, 0)')
					mod.push('<a href="'+a[k].href+'" style="color:#999900">'+a[k].innerHTML+'</a>');
				if(a[k].style.color=='rgb(169, 126, 152)')
					uplinker.push('<a href="'+a[k].href+'" style="color:#A97E98">'+a[k].innerHTML+'</a>');
				if(a[k].style.color=='rgb(198, 186, 198)')
					uploader.push('<a href="'+a[k].href+'" style="color:#C6BAC6">'+a[k].innerHTML+'</a>');
				if(a[k].style.color=='rgb(187, 18, 18)')
					evip.push('<a href="'+a[k].href+'" style="color:#BB1212">'+a[k].innerHTML+'</a>');
				if(a[k].style.color=='rgb(69, 167, 167)')
					svip.push('<a href="'+a[k].href+'" style="color:#45A7A7">'+a[k].innerHTML+'</a>');
				if(a[k].style.color=='rgb(142, 47, 182)')
					vip.push('<a href="'+a[k].href+'" style="color:#8e2fb6">'+a[k].innerHTML+'</a>');
			}
			admin = admin.join(', ');
			smod = smod.join(', ');
			mod = mod.join(', ');
			uplinker = uplinker.join(', ');
			uploader = uploader.join(', ');
			evip = evip.join(', ');
			svip = svip.join(', ');
			vip = vip.join(', ');
			break;
		}
	}
}

function ukryjOnline(){
	var td=document.getElementsByTagName('td');
	for(var i=120; i<td.length; i++){
		if(td[i].className == 'row1' && td[i].title == 'warez forum' && td[i].vAlign == 'top'){
			td[i].childNodes[0].innerHTML = statyUkryte1;
			break;
		}
	}
}

function zmianaLegendy(){	
	var td=document.getElementsByTagName('td');
	for(var i=120; i<td.length; i++){
		if(td[i].className == 'row1' && td[i].title == 'gry download'){
			var span = td[i].childNodes[0].childNodes[0];
			var legenda = span.getElementsByTagName('span');
			// dodawanie onclick do legendy
			legenda[0].onclick = pokazRangi.bind(legenda[0], 1);
			legenda[1].onclick = pokazRangi.bind(legenda[1], 2);
			legenda[2].onclick = pokazRangi.bind(legenda[2], 3);
			legenda[3].onclick = pokazRangi.bind(legenda[3], 4);
			legenda[4].onclick = pokazRangi.bind(legenda[4], 5);
			legenda[5].onclick = pokazRangi.bind(legenda[5], 6);
			legenda[6].onclick = pokazRangi.bind(legenda[6], 7);
			legenda[7].onclick = pokazRangi.bind(legenda[7], 8);
			// tworzenie id dodawanie nowych "grup"
			// nawiasy
			var nawias1 = document.createTextNode(' [ ');
			var nawias2 = document.createTextNode(' ] ');
			// kolorowi
			span.appendChild(nawias1);
				var kolorowi = document.createElement('span');  
				kolorowi.style.color = '#005EFF'; 
				kolorowi.style.fontWeight = 'bold'; 
				kolorowi.innerHTML = 'Kolorowi'; 
				kolorowi.onclick = pokazRangi.bind(kolorowi, 10);
				span.appendChild(kolorowi);
			span.appendChild(nawias2);
			nawias1 = document.createTextNode(' [ '); 
			nawias2 = document.createTextNode(' ] ');
			// wszyscy
			span.appendChild(nawias1);
				var wszyscy = document.createElement('span');  
				wszyscy.style.color = '#FFB300'; 
				wszyscy.innerHTML = 'Wszyscy'; 
				wszyscy.onclick = pokazRangi.bind(wszyscy, 11);
				span.appendChild(wszyscy);
			span.appendChild(nawias2);
			nawias1 = document.createTextNode(' [ '); 
			nawias2 = document.createTextNode(' ] ');
			// ukryj
			span.appendChild(nawias1);
				var ukryj = document.createElement('span');  
				ukryj.style.color = '#808080'; 
				ukryj.innerHTML = 'Ukryj'; 
				ukryj.onclick = pokazRangi.bind(ukryj, 12);
				span.appendChild(ukryj);
			span.appendChild(nawias2);
		}
	}
}

function pokazRangi(ranga){
	var td=document.getElementsByTagName('td');
	for(var i=120; i<td.length; i++){
		if(td[i].className == 'row1' && td[i].title == 'warez forum' && td[i].vAlign == 'top'){
			var gdzie = td[i].childNodes[0];
			var dopisek = 'Użytkownicy przeglądający to forum: ';
			if(ranga==1){
				if(admin != '')
					gdzie.innerHTML = statyUkryte1 + dopisek + admin;
				else
					gdzie.innerHTML = statyUkryte1 + dopisek + 'Brak';
			}
			if(ranga==2){
				if(smod != '')
					gdzie.innerHTML = statyUkryte1 + dopisek + smod;
				else
					gdzie.innerHTML = statyUkryte1 + dopisek + 'Brak';
			}
			if(ranga==3){
				if(mod != '')
					gdzie.innerHTML = statyUkryte1 + dopisek + mod;
				else
					gdzie.innerHTML = statyUkryte1 + dopisek + 'Brak';
			}
			if(ranga==4){
				if(uplinker != '')
					gdzie.innerHTML = statyUkryte1 + dopisek + uplinker;
				else
					gdzie.innerHTML = statyUkryte1 + dopisek + 'Brak';
			}
			if(ranga==5){
				if(uploader != '')
					gdzie.innerHTML = statyUkryte1 + dopisek + uploader;
				else
					gdzie.innerHTML = statyUkryte1 + dopisek + 'Brak';
			}
			if(ranga==6){
				if(evip != '')
					gdzie.innerHTML = statyUkryte1 + dopisek + evip;
				else
					gdzie.innerHTML = statyUkryte1 + dopisek + 'Brak';
			}
			if(ranga==7){
				if(svip != '')
					gdzie.innerHTML = statyUkryte1 + dopisek + svip;
				else
					gdzie.innerHTML = statyUkryte1 + dopisek + 'Brak';
			}
			if(ranga==8){
				if(vip != '')
					gdzie.innerHTML = statyUkryte1 + dopisek + vip;
				else
					gdzie.innerHTML = statyUkryte1 + dopisek + 'Brak';
			}
			if(ranga==10){
				var zlepek='';
				if(admin!='')
					zlepek += admin+', ';
				if(smod!='')
					zlepek += smod+', ';
				if(mod!='')
					zlepek += mod+', ';
				if(uplinker!='')
					zlepek += uplinker+', ';
				if(uploader!='')
					zlepek += uploader+', ';
				if(evip!='')
					zlepek += evip+', ';
				if(svip!='')
					zlepek += svip+', ';
				if(vip!='')
					zlepek += vip+'';
			
				gdzie.innerHTML = statyUkryte1 + dopisek + zlepek;
			}
			if(ranga==11)
				gdzie.innerHTML = statyUkryte1 + statyUkryte2;
			if(ranga==12)
				gdzie.innerHTML = statyUkryte1;
			break;
		}
	}
}


function zmienYoutube(){
	var iframe = document.getElementsByTagName('iframe');
	for(var i = iframe.length - 1; i>= 0; --i){
		if(iframe[i].width == '640' && /youtube/.test(iframe[i].src)){
			var nowyLink = iframe[i].src.replace('embed/','watch?v=');
			var a = document.createElement('a');
			a.href = nowyLink;
			a.innerHTML = nowyLink;
			iframe[i].parentNode.replaceChild(a,  iframe[i]);
		}
	}
}


var bbtags = new Array('[b]','[/b]','[i]','[/i]','[u]','[/u]','[quote]','[/quote]','[code]','[/code]','[list]','[/list]','[list=]','[/list]','[img]','[/img]','[url]','[/url]');

function szybkaOdpowiedz(){
	var elements = document.getElementsByName('search_topic');
	var topicid = elements[0].value;
	
	var elements = document.getElementsByTagName("td");
	for(i=0;i<elements.length;i++)
	{
		if(elements[i].className == "catBottom") {var targetd = elements[i].parentNode;break;}
	}

	var elements = document.getElementsByTagName("img");
	for(i=0;i<elements.length;i++)
	{
		if(elements[i].alt == "Odpowiedz do tematu") {var open = 1;break;}
	}
	var elements = document.getElementsByTagName("a");
	for(i=0;i<elements.length;i++)
	{
		if(/logout/.test(elements[i].href) ) {arr = elements[i].href.split(/sid=/);sid=arr[1];break;}
	}
	if(topicid && targetd && sid && open)
	{
		// struktura
		var trMain = document.createElement("tr");
		
		var tdMain = document.createElement("td");
			tdMain.setAttribute("colspan", 2);
			tdMain.setAttribute("style", "padding: 0");
			tdMain.setAttribute("class", "row2");
			
		var form = document.createElement("form");
			form.setAttribute("action", "posting.php");
			form.setAttribute("method", "post");
			form.setAttribute("name", "post");
			form.setAttribute("style", "margin-bottom: 0");
			
		var table = document.createElement("table");
			table.setAttribute("width", "100%");
			table.setAttribute("cellSpacing", 1);
			table.setAttribute("cellPadding", 3);
			table.setAttribute("border", 0);
			
		var tr1 = document.createElement("tr");
			tr1.innerHTML = '<th colspan="2">Szybka odpowiedź</th>';
			
		var tr2 = document.createElement("tr");
		
		var td1 = document.createElement("td");
			td1.setAttribute("colspan", 2);
			td1.setAttribute("align", "center");
			// b, i, u...
		var input1 = document.createElement("input");
			input1.setAttribute("type", "button");
			input1.setAttribute("class", "button");
			input1.setAttribute("value", " B ");
			input1.setAttribute("style", "font-weight:bold; width: 30px");
			input1.onclick = bbstyle.bind(input1, 0);
			
		var input2 = document.createElement("input");
			input2.setAttribute("type", "button");
			input2.setAttribute("class", "button");
			input2.setAttribute("value", " I ");
			input2.setAttribute("style", "font-style:italic; width: 30px");
			input2.onclick = bbstyle.bind(input2, 2);
			
		var input3 = document.createElement("input");
			input3.setAttribute("type", "button");
			input3.setAttribute("class", "button");
			input3.setAttribute("value", " U ");
			input3.setAttribute("style", "text-decoration: underline; width: 30px");
			input3.onclick = bbstyle.bind(input3, 4);
			
		var input4 = document.createElement("input");
			input4.setAttribute("type", "button");
			input4.setAttribute("class", "button");
			input4.setAttribute("value", "Quote");
			input4.setAttribute("style", "width: 50px");
			input4.onclick = bbstyle.bind(input4, 6);
			
		var input5 = document.createElement("input");
			input5.setAttribute("type", "button");
			input5.setAttribute("class", "button");
			input5.setAttribute("value", "Code");
			input5.setAttribute("style", "width: 40px");
			input5.onclick = bbstyle.bind(input5, 8);
			
		var input6 = document.createElement("input");
			input6.setAttribute("type", "button");
			input6.setAttribute("class", "button");
			input6.setAttribute("value", "List");
			input6.setAttribute("style", "width: 40px");
			input6.onclick = bbstyle.bind(input6, 10);
			
		var input7 = document.createElement("input");
			input7.setAttribute("type", "button");
			input7.setAttribute("class", "button");
			input7.setAttribute("value", "List=");
			input7.setAttribute("style", "width: 40px");
			input7.onclick = bbstyle.bind(input7, 12);
			
		var input8 = document.createElement("input");
			input8.setAttribute("type", "button");
			input8.setAttribute("class", "button");
			input8.setAttribute("value", "Img");
			input8.setAttribute("style", "width: 40px");
			input8.onclick = bbstyle.bind(input8, 14);
			
		var input9 = document.createElement("input");
			input9.setAttribute("type", "button");
			input9.setAttribute("class", "button");
			input9.setAttribute("value", "URL");
			input9.setAttribute("style", "text-decoration: underline; width: 40px");
			input9.onclick = bbstyle.bind(input9, 16);
		//kolor
		var select1 = document.createElement("select");
			select1.setAttribute("id", 'kolor');
			select1.onchange = zmienKolorRozmiar;
			
		var optionK1 = document.createElement("option");
			optionK1.setAttribute("value", 0);
			optionK1.innerHTML = 'Kolor';
			
		var optionK2 = document.createElement("option");
			optionK2.setAttribute("value", '#a80000');
			optionK2.setAttribute("style", "color: #a80000;");
			optionK2.innerHTML = 'Ciemnoczerwony';
			
		var optionK3 = document.createElement("option");
			optionK3.setAttribute("value", '#e50000');
			optionK3.setAttribute("style", "color: #e50000;");
			optionK3.innerHTML = 'Czerwony';
			
		var optionK4 = document.createElement("option");
			optionK4.setAttribute("value", '#ffb300');
			optionK4.setAttribute("style", "color: #ffb300;");
			optionK4.innerHTML = 'Pomarańczowy';
			
		var optionK5 = document.createElement("option");
			optionK5.setAttribute("value", '#994c00');
			optionK5.setAttribute("style", "color: #994c00;");
			optionK5.innerHTML = 'Brązowy';
			
		var optionK6 = document.createElement("option");
			optionK6.setAttribute("value", '#ffcc66');
			optionK6.setAttribute("style", "color: #ffcc66;");
			optionK6.innerHTML = 'Żółty';
			
		var optionK7 = document.createElement("option");
			optionK7.setAttribute("value", '#147426');
			optionK7.setAttribute("style", "color: #147426;");
			optionK7.innerHTML = 'Zielony';
			
		var optionK8 = document.createElement("option");
			optionK8.setAttribute("value", '#999900');
			optionK8.setAttribute("style", "color: #999900;");
			optionK8.innerHTML = 'Oliwkowy';
			
		var optionK9 = document.createElement("option");
			optionK9.setAttribute("value", '#45a7a7');
			optionK9.setAttribute("style", "color: #45a7a7;");
			optionK9.innerHTML = 'Błękitny';
			
		var optionK10 = document.createElement("option");
			optionK10.setAttribute("value", '#6699ff');
			optionK10.setAttribute("style", "color: #6699ff;");
			optionK10.innerHTML = 'Niebieski';
			
		var optionK11 = document.createElement("option");
			optionK11.setAttribute("value", '#476bb3');
			optionK11.setAttribute("style", "color: #476bb3;");
			optionK11.innerHTML = 'Ciemnoniebieski';
			
		var optionK12 = document.createElement("option");
			optionK12.setAttribute("value", '#8e2fb6');
			optionK12.setAttribute("style", "color: #8e2fb6;");
			optionK12.innerHTML = 'Purpurowy';
			
		var optionK13 = document.createElement("option");
			optionK13.setAttribute("value", '#a97e98');
			optionK13.setAttribute("style", "color: #a97e98;");
			optionK13.innerHTML = 'Fioletowy';
			
		var optionK14 = document.createElement("option");
			optionK14.setAttribute("value", '#c6bac6');
			optionK14.setAttribute("style", "color: #c6bac6;");
			optionK14.innerHTML = 'Biały';
			
		var optionK15 = document.createElement("option");
			optionK15.setAttribute("value", '#555555');
			optionK15.setAttribute("style", "color: #555555;");
			optionK15.innerHTML = 'Szary';
		
		// rozmiar
		var select2 = document.createElement("select");
			select2.setAttribute("id", 'rozmiar');
			select2.onchange = zmienKolorRozmiar;
			
		var option1 = document.createElement("option");
			option1.setAttribute("value", 0);
			option1.innerHTML = 'Rozmiar';
			
		var option2 = document.createElement("option");
			option2.setAttribute("value", 7);
			option2.innerHTML = 'Minimalny';
			
		var option3 = document.createElement("option");
			option3.setAttribute("value", 9);
			option3.innerHTML = 'Mały';
			
		var option4 = document.createElement("option");
			option4.setAttribute("value", 12);
			option4.innerHTML = 'Normalny';
			
		var option5 = document.createElement("option");
			option5.setAttribute("value", 18);
			option5.innerHTML = 'Duży';
			
		var option6 = document.createElement("option");
			option6.setAttribute("value", 24);
			option6.innerHTML = 'Ogromny';
			
			
		var tr3 = document.createElement("tr");
			tr3.innerHTML = '<td width="150" id="emotki" align="center"><table width="100" cellspacing="0" cellpadding="5" border="0"><tbody><tr align="center"> <td class="gensmall" colspan="4"><b>Emotikony</b></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :D \';txtarea.focus();" name="emotka"><img border="0" title="" alt="" src="images/smiles/big_smile.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :) \';txtarea.focus();" name="emotka"><img border="0" title="Smile" alt="Smile" src="images/smiles/smile.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :( \';txtarea.focus();" name="emotka"><img border="0" title="Sad" alt="Sad" src="images/smiles/sad.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :o \';txtarea.focus();" name="emotka"><img border="0" title="Surprised" alt="Surprised" src="images/smiles/yikes.png"/></a></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' 8) \';txtarea.focus();" name="emotka"><img border="0" title="Cool" alt="Cool" src="images/smiles/cool.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :lol: \';txtarea.focus();" name="emotka"><img border="0" title="Laughing" alt="Laughing" src="images/smiles/lol.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :x \';txtarea.focus();" name="emotka"><img border="0" title="Mad" alt="Mad" src="images/smiles/mad.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :P \';txtarea.focus();" name="emotka"><img border="0" title="Razz" alt="Razz" src="images/smiles/tongue.png"/></a></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :oops: \';txtarea.focus();" name="emotka"><img border="0" title="Embarassed" alt="Embarassed" src="images/smiles/icon_redface.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :cry: \';txtarea.focus();" name="emotka"><img border="0" title="Crying or Very sad" alt="Crying or Very sad" src="images/smiles/icon_cry.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :evil: \';txtarea.focus();" name="emotka"><img border="0" title="Evil or Very Mad" alt="Evil or Very Mad" src="images/smiles/icon_evil.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :twisted: \';txtarea.focus();" name="emotka"><img border="0" title="Twisted Evil" alt="Twisted Evil" src="images/smiles/icon_twisted.gif"/></a></td></tr><tr valign="middle" align="center"><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :roll: \';txtarea.focus();" name="emotka"><img border="0" title="Rolling Eyes" alt="Rolling Eyes" src="images/smiles/roll.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :wink: \';txtarea.focus();" name="emotka"><img border="0" title="Wink" alt="Wink" src="images/smiles/wink.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :| \';txtarea.focus();" name="emotka"><img border="0" title="Neutral" alt="Neutral" src="images/smiles/neutral.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :mrgreen: \';txtarea.focus();" name="emotka"><img border="0" title="Mr. Green" alt="Mr. Green" src="images/smiles/icon_mrgreen.gif"/</a></td></tr></tbody></table></td><td id="poletxt"><textarea class="post" tabindex="3" style="width: 100%;background-color:#0c0c0c;" wrap="virtual" rows="10" name="message" id="message"/></textarea></td>';
		var tr4 = document.createElement("tr");
			tr4.innerHTML = '<td style="padding:0"></td><td style="padding:0" id="opcje"><table width="100%"><tr><td><input type="checkbox" name="disable_bbcode"/> <span class="gen">Wyłącz BBCode</span> <input type="checkbox" name="disable_smilies"/> <span class="gen">Wyłącz Uśmieszki</span> <input type="checkbox" checked="checked" name="attach_sig"/> <span class="gen">Dodaj podpis</span></td><td align="right"><input type="hidden" name="mode" value="reply" /><input type="hidden" name="sid" value="'+sid+'" /><input type="hidden" name="t" value="'+topicid+'" /> <input type="submit" tabindex="5" name="preview" class="mainoption" value="Podgląd"> <input type="submit" accesskey="s" tabindex="6" name="post" class="mainoption" value="Wyślij" id="post" /></td></tr></table></td>';

		// dodawanie nowych rzeczy
		select1.appendChild(optionK1);
		select1.appendChild(optionK2);
		select1.appendChild(optionK3);
		select1.appendChild(optionK4);
		select1.appendChild(optionK5);
		select1.appendChild(optionK6);
		select1.appendChild(optionK7);
		select1.appendChild(optionK8);
		select1.appendChild(optionK9);
		select1.appendChild(optionK10);
		select1.appendChild(optionK11);
		select1.appendChild(optionK12);
		select1.appendChild(optionK13);
		select1.appendChild(optionK14);
		select1.appendChild(optionK15);
		
		select2.appendChild(option1);
		select2.appendChild(option2);
		select2.appendChild(option3);
		select2.appendChild(option4);
		select2.appendChild(option5);
		select2.appendChild(option6);
		
		td1.appendChild(input1);
		td1.appendChild(document.createTextNode(' '));
		td1.appendChild(input2);
		td1.appendChild(document.createTextNode(' '));
		td1.appendChild(input3);
		td1.appendChild(document.createTextNode(' '));
		td1.appendChild(input4);
		td1.appendChild(document.createTextNode(' '));
		td1.appendChild(input5);
		td1.appendChild(document.createTextNode(' '));
		td1.appendChild(input6);
		td1.appendChild(document.createTextNode(' '));
		td1.appendChild(input7);
		td1.appendChild(document.createTextNode(' '));
		td1.appendChild(input8);
		td1.appendChild(document.createTextNode(' '));
		td1.appendChild(input9);
		td1.appendChild(document.createTextNode(' '));
		td1.appendChild(select1);
		td1.appendChild(document.createTextNode(' '));
		td1.appendChild(select2);
		tr2.appendChild(td1);
		table.appendChild(tr1);
		table.appendChild(tr2);
		table.appendChild(tr3);
		table.appendChild(tr4);
		form.appendChild(table);
		tdMain.appendChild(form);
		trMain.appendChild(tdMain);
		targetd.parentNode.insertBefore(trMain, targetd.nextSibling);
	}
}

function zmienKolorRozmiar() {
	var txtarea = document.getElementById('message');
	var zmienna = this.options[this.selectedIndex].value;
	if(this.id == 'rozmiar'){
		var bbopen = '[size=' + zmienna + ']';
		var bbclose = '[/size]';
	}
	if(this.id == 'kolor'){
		var bbopen = '[color=' + zmienna + ']';
		var bbclose = '[/color]';
	}
	this.options.selectedIndex=0;
	
	if (txtarea.selectionEnd && (txtarea.selectionEnd - txtarea.selectionStart > 0)){
		mozWrap(txtarea, bbopen, bbclose);
		return;
	}
}

function bbstyle(bbnumber) {
	var txtarea = document.getElementById('message');
		if (txtarea.selectionEnd && (txtarea.selectionEnd - txtarea.selectionStart > 0)){
			mozWrap(txtarea, bbtags[bbnumber], bbtags[bbnumber+1]);
				txtarea.scrollTop = prevTop;
			return;
		}
}

function mozWrap(txtarea, open, close){
	var selLength = txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	if (selEnd == 1 || selEnd == 2)
		selEnd = selLength;

	var s1 = (txtarea.value).substring(0,selStart);
	var s2 = (txtarea.value).substring(selStart, selEnd)
	var s3 = (txtarea.value).substring(selEnd, selLength);
	txtarea.value = s1 + open + s2 + close + s3;
	if(close=='[/b]'||close=='[/u]'||close=='[/i]'||close=='[/size]'||close=='[/color]'){
		txtarea.selectionStart = selStart;
		txtarea.selectionEnd = selEnd + open.length + close.length;
		txtarea.focus();
	}
	return;
}


function zaznaczTekst(){

	var zaznaczone = window.getSelection();
    if(zaznaczone != '' && zaznaczone.anchorNode.parentNode.className == 'postbody'){
		var span = document.createElement('span');
			span.setAttribute('class', 'postdetails');
			span.setAttribute('id', 'plusJeden');
			span.setAttribute('style', 'vertical-align: 4px; color: #00CC00');
			span.innerHTML = '+1 ';
		this.parentNode.insertBefore(span, this);
	
		var nick = zaznaczone.anchorNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0];
		var message = document.getElementById('message');
		message.innerHTML += '[quote="' + nick.innerHTML + '"]' + zaznaczone + '[/quote]\n\n';
		ukryjPlus1();
    }
}

function ukryjPlus1(){
	setTimeout(function (){
		var plusJeden = document.getElementById('plusJeden');
			plusJeden.parentNode.removeChild(plusJeden)
	}, 1000);
}

function obrazekCytujSelektywnie(){
	var img = document.getElementsByTagName('img');
	for(var i=0; i<img.length; i++){
		if(img[i].alt == 'Odpowiedz do tematu'){
			var otwarty = 1;
			break;
		}
	}
	if(otwarty){
		var img = document.getElementsByTagName('img');
		var k = 1;
		for(var i=0; i<img.length; i++){
			if(/bLock\/images\/lang_english\/icon_quote\.gif/.test(img[i].src)){
				var link = img[i].parentNode.parentNode;
				var obrazek = document.createElement('img');  
				obrazek.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAASCAYAAACghwvPAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAANJJREFUeNrsWEESxCAI2+z4/y/2Kel9ZxAUrdpNZnqpWCMBpYDkR1iPr1wgIQQJISEECXGmEPx5PLSWXqNKtQy32eVi0/dLZQwTSeIPghwjMiKiMp0IaLH1MjGSoRGbq5OzZ2dxDnMrG0Y5nPcMzKUhFJKcaczJchsqxIyzFQPvA2y0r+2FqDkeyWxaLQZ67wjrTGMl9aO2rWt6YxEbGHdEy/4y1VaVPxJNv94I4yGV06MZVDqd+NbSdVkrurzIiUf/36jFsXmLQ3gYNwAAAP//AwBL4F6rZF8CuwAAAABJRU5ErkJggg=='; 
				obrazek.alt = 'obrazekSelektywny';
				obrazek.onclick = zaznaczTekst;
				link.insertBefore(obrazek, link.childNodes[8]);
			}
		}
	}
}


function ukryjOgloszenie(){
	var table = document.getElementsByTagName('table');
	for(var i=0; i<table.length; i++){
		if(table[i].width == '100%' && table[i].cellSpacing == 0 && table[i].cellPadding == 0 && table[i].border == 0){
			table[i].style.display = 'none';
			break;
		}
	}
}


function liczbaPostowNaStronieDzial(){
	var th = document.getElementsByTagName('th');
	for(var i=0; i<th.length; i++){
		if(th[i].className == 'thTop' && /Odpowiedzi/.test(th[i].innerHTML)){
			var table = th[i].parentNode.parentNode;
			var span =  table.getElementsByTagName('span');
			for(var k=0; k<span.length; k++){
				var reszta = (parseInt(span[4+7*k].innerHTML)+1)%16;
				if (reszta == 0)
					reszta = 16;
				span[4+7*k].appendChild(document.createTextNode(' / '));
				span[4+7*k].appendChild(document.createTextNode(reszta));
//				span[4+7*k].innerHTML+=' / ' + reszta;
			}
			break;
		}
	}
}

function liczbaPostowNaStronieTemat(){
	var img = document.getElementsByTagName('img');
	var k = 1;
	for(var i=0; i<img.length; i++){
		if(/bLock\/images\/icon_minipost/.test(img[i].src)){
			var link = img[i].parentNode;
			link = link.href;
		}
		if(/bLock\/images\/icon_report\.gif/.test(img[i].src)){
			var span = document.createElement('span');
				span.setAttribute('style', 'vertical-align: 3; padding: 5px;');
			var a = document.createElement('a');
				a.setAttribute('href', link);
				a.innerHTML = '<img src="http://darkwarez.pl/forum/img/lvl/' + k + '.gif" />';
			span.appendChild(a);
			img[i].parentNode.parentNode.appendChild(span);
			k++;
		}
	}
}

function liczbaPostowNaStronieSzukaj(){
	var th = document.getElementsByTagName('th');
	for(var i=0; i<th.length; i++){
		if(th[i].className == 'thTop' && /Odpowiedzi/.test(th[i].innerHTML)){
			var table = th[i].parentNode.parentNode;
			var span =  table.getElementsByTagName('span');
			for(k=0; k<span.length; k++){
				var reszta = (parseInt(span[5+8*k].innerHTML)+1)%16;
				if (reszta == 0)
					reszta = 16;
				span[5+8*k].innerHTML+=' / ' + reszta;
			}
			break;
		}
	}
}


function czatowyPowiadamiacz(){
	if(/Opera/.test(navigator.userAgent))
		initJavaScript();
	var ostatnieID = 'row_14';
	var ileNowych = 1;
	
	window.addEventListener("mouseover", function (){
		document.title = 'DW Czat';

		var oID = document.getElementById(ostatnieID);
		ostatnieID = oID.parentNode.childNodes[0].id;
	}, false);

	setInterval(function (){
		var oID = document.getElementById(ostatnieID);
		var noweID = oID.parentNode.childNodes[0];

		if(noweID.id != ostatnieID){
		var czas = noweID.getElementsByTagName('i')[0].innerHTML;
		ileNowych = noweID.id.substr(4)-ostatnieID.substr(4);
		document.title = 'DW Czat [' + ileNowych + '] (' + czas + ')';
		}
	}, 5000);
}

