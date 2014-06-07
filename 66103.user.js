// ==UserScript==
// @author 			Wesoły
// @name 			AntyRamol
// @description			Usuwa Ramola komentarze z dyskusji oraz pod niektórymi serwisami IDG
// @version			2.2
// @run-at 			document-start
// @match 			http://*.pcworld.pl/*
// @match 			http://*.idg.pl/*
// @match 			http://*.computerworld.pl/*
// @match 			http://*.networld.pl/*
// @match 			http://*.cxo.pl/*
// @match 			http://*.storagestandard.pl/*
// @match 			http://*.securitystandard.pl/*
// @match 			http://*.mspstandard.pl/*
// @match 			http://*.internetstandard.pl/*
// @match 			http://*.storagestandard.pl/*
// ==/UserScript==

/*
* Tutaj są zmienne z IP i ksywą Ramonesa. Nie trzeba podawać w całości,
* wystarczy początkowy fragment. Tylko pamiętajcie że jeżeli podacie za ip
* tylko 89 to usunie WSZYSTKICH których IP zaczyna się na 89.
* Tak samo jak wpiszecie samo ram. Usunie wszystkich mających ram w nicku.
*/

var ramones_ksywa = 'ramones';
var ramones_ksywa2 = 'Dj.JanuszM';
var ramones_ksywa3 = 'Luka2010';
var ramones_ksywa4 = 'FonoMS';
var ramones_ip = '89.79.153';
var ramones_ip2 = '213.158.199';
var ramones_ip3 = '109.243';
var ramones_ip4 = '89.78.87';

/*
* Tej funkcji nie ruszać. Pod nią jest wywołanie jej z powyższymi zmiennymi jako
* argumenty. Twórzcie sobie ile chcecie zmiennych i odpalajcie ile chcecie 
* tą funkcję jeżeli chcecie z komentarzy usunąć jakiegoś innego trolla. 
*/

function antyRamol(ramonesNICK,ramonesIP) {
	//Zmienna przechowująca Ramola
	var ramol = null;
	//Liczniki do skryptu
	var ramol_i=0;
	var ramol_j=0;
	//Tworzymy ciąg testujący dla ksywy oraz ip
	var ramoltestnick = '{0}';
	ramoltestnick = new RegExp(ramonesNICK,"i");
	var ramoltestip = '{0}';
	ramoltestip = new RegExp(ramonesIP,"i");
	//Pobieramy komentarze
	var ramol_komentarze = document.getElementsByClassName('komentarz');
	var ramol_komentarze_lp = ramol_komentarze.length;
	if(ramol_komentarze_lp==0) { return false }
	//Zakładamy że komentarz nie należy do Ramola
	var jestRamol = false;
	//Przeszukujemy komentarze
	for(ramol_i=0;ramol_i<ramol_komentarze_lp;ramol_i++) {
		jestRamol=false;
		//SPRAWDZAMY IP RAMOLA
		var ramolip = ramol_komentarze[ramol_i].getElementsByTagName('li');
		for(ramol_j=0;ramol_j<ramolip.length;ramol_j++) {
			ramol = ramolip[ramol_j].innerHTML;
			if(ramol.match(ramoltestip)!=null) {
				jestRamol = true;
				break;
			}
		}
		if(jestRamol==false) {
			//SZUKAMY KSYWY RAMOLA NIEZALEŻNIE OD DODATKÓW
			var ramolnick = ramol_komentarze[ramol_i].getElementsByTagName('a');
			for(ramol_j=0;ramol_j<ramolnick.length;ramol_j++) {
				ramol = ramolnick[ramol_j].innerHTML;
				if(ramol.match(ramoltestnick)!=null) {
					jestRamol = true;
					break;
				}
			}
		}
		//TESTUJEMY CZY KOMENTARZ NALEŻY DO RAMOLA
		if(jestRamol==true) {
			ramol_komentarze[ramol_i].style.display = 'none';
		}
	}
}

/*
* Tutaj następuje wywołanie powyższej funkcji. Dla przykładu jeżeli chcemy
* zablokować jeszcze użytkownika Tad, dopisujemy na końcu pliku:
* antyRamol("Tad","85.222");
*/

antyRamol(ramones_ksywa,ramones_ip);
antyRamol(ramones_ksywa2,ramones_ip2);
antyRamol(ramones_ksywa3,ramones_ip3);
antyRamol(ramones_ksywa4,ramones_ip4);