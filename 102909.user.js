// ==UserScript==
// @name           DO Handel Info PL
// @namespace      http://grimpow.lescigales.org/
// @description    Kalkulacja do handlu na DO : -20%, +20%...
// @include        http://*.desert-operations.*/world*/handel.php*
// @version        produced by dembian80
// ==/UserScript==

var tr = document.getElementsByTagName('tr');
var Quantite = new Array();
var Prix = new Array();
var IndiceJavaScript = 0;
var Unites_Stats = new Array();
var Argent_Courant = document.getElementById('rs_money').innerHTML;
Unites_Stats['Żołnierz'] = 120;
Unites_Stats['Przeciwczołgowa wyrzutnia granatów'] = 1150;
Unites_Stats['Spadochroniarz'] = 400;
Unites_Stats['Płetwonurek'] = 2200;
Unites_Stats['Gepard'] = 18000;
Unites_Stats['Jaguar 2'] = 35000;
Unites_Stats['Artyleria rakietowa Mars'] = 65000;
Unites_Stats['Panzerhaubitze 2000'] = 55000;
Unites_Stats['Leopard 2'] = 100000;
Unites_Stats['M1 Abrams'] = 70.000;
Unites_Stats['T-90'] = 85000;
Unites_Stats['Mil MI-24 Hind'] = 75000;
Unites_Stats['AH-64 Apache'] = 60000;
Unites_Stats['A-10 Thunderbolt'] = 110000;
Unites_Stats['Eurofighter Typhoon'] = 85000;
Unites_Stats['F22 Raptor'] = 90000;
Unites_Stats['F117A Nighthawk'] = 120000;
Unites_Stats['Rockwell B1'] = 250000;
Unites_Stats['Northrop B2 Spirit'] = 2000000;
Unites_Stats['Statek do szukania min Hameln'] = 70000;
Unites_Stats['Fregatte F124'] = 500000;
Unites_Stats['Korvette'] = 350000;
Unites_Stats['Lotniskowiec USS Nimitz'] = 1500000;
Unites_Stats['U-bot klasy 212A'] = 800000;
Unites_Stats['Batalistyczny U-bot klasy Typhoon'] = 1000000;
Unites_Stats['Champs de barbelés'] = 20000;
Unites_Stats['Bunker'] = 40000;
Unites_Stats['Champs de mines'] = 250000;
Unites_Stats['Batterie de Patriot'] = 150000;
Unites_Stats['Mines sous-marines'] = 100000;
Unites_Stats['Batteries de DCA'] = 100000;
Unites_Stats['Batteries côtières'] = 200000;
Unites_Stats['Eurocopter Tigre'] = 80000;
Unites_Stats['T-95 Black Eagle'] = 170000;
Unites_Stats['B-52 Stratofortress'] = 4000000;
Unites_Stats['Fraegate F239'] = 1000000;
Unites_Stats['Czołg do rozminowywania Keiler'] = 45000;
Unites_Stats['Mil MI-28 Havoc'] = 70000;
Unites_Stats['Leopard 3'] = 150000;
Unites_Stats['Złoto'] = 1000;
Unites_Stats['Ropa'] = 500;
Unites_Stats['Amunicja'] = 7;
Unites_Stats['Grey Ghost'] = 85000;
function Arrondir(x, n) {
	var decalage = Math.pow(10, n);
	x *= decalage;
	x = Math.round(x);
	x /= decalage;
	return x;
} function ChangePrix(Arg) {
	Arg = Arg.replace(/ /g,'');
	Arg = Arg.replace(/	/g,'');
	Arg = Arg.replace(/\n/g,'');
	Arg = Arg.replace(/\./g,'');
	Arg = Arg.replace(/,/g,'.');
	Arg = Arg.replace(/Argent/g,'');
	if (Arg.match(/M/g)) {
		Arg = parseInt(Arg) * Math.pow(10,6);
	} Arg = parseInt(Arg);
	return Arg;
} function ChangeQuantite(Arg) {
	var Type = '';
	Arg = Arg.replace(/ /g,'');
	Arg = Arg.replace(/	/g,'');
	Arg = Arg.replace(/\n/g,'');
	Arg = Arg.replace(/\./g,'');
	Arg = Arg.replace(/,/g,'.');
	if (Arg.match(/Or|Złoto/g,'')) {
		Type = 'Złoto';
	} if (Arg.match(/Ropa/g)) {
		Type = 'Ropa';
	} else if (Arg.match(/MilMI-28Havoc/g)) {
		Type = 'Mil MI-28 Havoc';
		Arg = Arg.replace(/MilMI-28Havoc/,'');
	} else if (Arg.match(/Żołnierz/g)) {
		Type = 'Żołnierz';	
	} else if (Arg.match(/Przeciwczołgowawyrzutniagranatów/g)) {
		Type = 'Przeciwczołgowa wyrzutnia granatów';	
		Arg = Arg.replace(/Przeciwczołgowawyrzutniagranatów/,'');
	} else if (Arg.match(/Spadochroniarz/g)) {
		Type = 'Spadochroniarz';	
	} else if (Arg.match(/Płetwonurek/g)) {
		Type = 'Płetwonurek';
	} else if (Arg.match(/Gepard/g)) {
		Type ='Gepard';
	} else if (Arg.match(/Jaguar2/g)) {
		Type = 'Jaguar 2';
	} else if (Arg.match(/ArtyleriarakietowaMars/g)) {
		Type = 'Artyleria rakietowa Mars';
		Arg = Arg.replace(/ArtyleriarakietowaMars/,'');
	} else if (Arg.match(/Panzerhaubitze2000/g)) {
		Type = 'Panzerhaubitze 2000';
	} else if (Arg.match(/T-90/g)) {
		Type = 'T-90';
	} else if (Arg.match(/MilMI-24Hind/g)) {
		Type = 'Mil MI-24 Hind';
	} else if (Arg.match(/M1Abrams/g)) {
		Type = 'M1 Abrams';
		Arg = Arg.replace(/M1Abrams/g,'');
	} else if (Arg.match(/AH-64Apache/g)) {
		Type = 'AH-64 Apache';
	} else if (Arg.match(/Leopard2/g)) {
		Type = 'Leopard 2';
	} else if (Arg.match(/A-10Thunderbolt/g)) {
		Type = 'A-10 Thunderbolt';
	} else if (Arg.match(/EurofighterTyphoon/g)) {
		Type = 'Eurofighter Typhoon';
	} else if (Arg.match(/F22Raptor/g)) {
		Type = 'F22 Raptor';
	} else if (Arg.match(/F117ANighthawk/g)) {
		Type = 'F117A Nighthawk';
	} else if (Arg.match(/RockwellB1/g)) {
		Type = 'Rockwell B1';
	} else if (Arg.match(/NorthropB2Spirit/g)) {
		Type = 'Northrop B2 Spirit';
	} else if (Arg.match(/StatekdoszukaniaminHameln/g)) {
		Type = 'Statek do szukania min Hameln';
		Arg = Arg.replace(/StatekdoszukaniaminHameln/,'');
	} else if (Arg.match(/FregatteF124/g)) {
		Type = 'Fregatte F124';
	} else if (Arg.match(/Korvette/g)) {
		Type = 'Korvette';
	} else if (Arg.match(/LotniskowiecUSSNimitz/g)) {
		Type = 'Lotniskowiec USS Nimitz';
	} else if (Arg.match(/U-botklasy212A/g)) {
		Type = 'U-bot klasy 212A';
	} else if (Arg.match(/BatalistycznyU-botklasyTyphoon/g)) {
		Type = 'Batalistyczny U-bot klasy Typhoon';
	} else if (Arg.match(/T-95BlackEagle/g)) {
		Type = 'T-95 Black Eagle';
	} else if (Arg.match(/B-52Stratofortress/g)) {
		Type = 'B-52 Stratofortress';
	} else if (Arg.match(/FraegateF239/g)) {
		Type = 'Fraegate F239';
	} else if (Arg.match(/CzołgdorozminowywaniaKeiler/g)) {
		Type = 'Czołg do rozminowywania Keiler';
		Arg = Arg.replace(/CzołgdorozminowywaniaKeiler/,'');
	} else if (Arg.match(/GreyGhost/g)) {
		Type = 'Grey Ghost';
	} else if (Arg.match(/Leopard3/g)) {
		Type = 'Leopard 3';
	} else if (Arg.match(/EurocopterTigre/g)) {
		Type = 'Eurocopter Tigre';
	} else if (Arg.match(/Amunicja/g)) {
		Type = 'Amunicja';
		Arg = Arg.replace(/Amunicja/,'');
	} if (Arg.match(/M/)) {
		Arg = parseInt(Arg) * Math.pow(10,6);
	}
	Arg = parseInt(Arg);
	return Array(Type,Arg);
} for (i = 14, c = tr.length; i < c; i++) {
	if (tr[i].className == 'odd' || tr[i].className == 'even') {
		Quantite[IndiceJavaScript] = ChangeQuantite(tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		Prix[IndiceJavaScript] = ChangePrix(tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		if (Unites_Stats[Quantite[IndiceJavaScript][0]] != 'undefined') {
			var Pourcent = Prix[IndiceJavaScript] / Quantite[IndiceJavaScript][1];
			if (Pourcent > 105/100 * Unites_Stats[Quantite[IndiceJavaScript][0]]) {
				Color = 'f4d00a';
			} if (Pourcent > 11/10 * Unites_Stats[Quantite[IndiceJavaScript][0]]) {
				Color = 'f4a40a';
			} if (Pourcent > 115/100 * Unites_Stats[Quantite[IndiceJavaScript][0]]) {
				Color = 'f46d0a';
			} if(Pourcent > 119/100 * Unites_Stats[Quantite[IndiceJavaScript][0]]) {
				Color = 'F40A0A';
			} if (Pourcent < 95/100 * Unites_Stats[Quantite[IndiceJavaScript][0]]) {
				Color = 'C1FB00';
			} if (Pourcent < 9/10 * Unites_Stats[Quantite[IndiceJavaScript][0]]) {
				Color = '88FB00';
			} if (Pourcent < 81/100 * Unites_Stats[Quantite[IndiceJavaScript][0]]) {
				Color = '0F0';
			} if (Pourcent > 95/100 * Unites_Stats[Quantite[IndiceJavaScript][0]] && Pourcent < 105/100 * Unites_Stats[Quantite[IndiceJavaScript][0]]){
				Color = 'FF0';
			}
			tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = 
			'<span style="color:#' + Color +  '">'
			+ tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML
			+ '</span>';
			Taux = Math.floor(1000 * (Pourcent / Unites_Stats[Quantite[IndiceJavaScript][0]] - 1)) / 10;
			tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = 
			'<span style="color:#' + Color +  '">'
			+ tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML
			+ '</span><br /><div align="right">' + ((Taux < 0) ? '-' : '+') + ((Math.abs(Taux) >= 19.9) ? 20 : Math.abs(Taux)) + '%</div>';
		}
		IndiceJavaScript++;
	}
}