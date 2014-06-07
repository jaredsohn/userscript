// ==UserScript==
// @name           DO RC Info
// @namespace      http://grimpow.lescigales.org/
// @author         Grimpow
// @description    Dodaj małe okno z informacjami o walce: wskaźnik wydatków ...
// @include        http://static.*.desert-operations.com/world*/kb/*
// @version        1.03
//	
// ==/UserScript==
var Add = document.getElementsByTagName('body')[0].firstChild.nextSibling.firstChild.nextSibling;
var Unites_Atakujący_Nom = new Array();
var Unites_Atakujący_Debut = new Array();
var Unites_Atakujący_Fin = new Array();
var Unites_Atakujący_Detruit = new Array();
var Unites_Obrońca_Nom = new Array();
var Unites_Obrońca_Debut = new Array();
var Unites_Obrońca_Fin = new Array();
var Unites_Obrońca_Detruit = new Array();
var Unites_Stats = new Array();
var Temporaire = document.getElementsByTagName('tr');
var IndiceJavaScript1 = 0;
var IndiceJavaScript2 = 0;
var Perte_Argent_Unites_Atakujący = 0;
var Perte_Argent_Unites_Obrońca = 0;
var Perte_Amunicja_Atakujący = 0;
var Perte_Ropa_Atakujący = 0;
var Perte_Benzyna_Atakujący = 0;
var Ratio = '';
var Ratio2 = '';

Unites_Stats['Żołnierz'] = new Array(120,0, 'Benzyna', 	1, 	1); 
Unites_Stats['Przeciwczołgowa wyrzutnia granatów'] = new Array(1150,0, 'Benzyna', 	12, 	9);
Unites_Stats['Spadochroniarz'] = new Array(400,0, 'Benzyna', 	8, 	5); 
Unites_Stats['Płetwonurek'] = new Array(2200,1, 'Ropa', 	18, 	17);
Unites_Stats['Gepard'] = new Array(18000,4, 'Ropa', 	50, 	20);
Unites_Stats['Jaguar 2'] = new Array(35000,5, 'Ropa', 	55, 	30);
Unites_Stats['Artyleria rakietowa Mars'] = new Array(65000,8, 'Ropa', 	80, 	40);
Unites_Stats['Panzerhaubitze 2000'] = new Array(55000,			6, 'Ropa', 	60, 	35);
Unites_Stats['Leopard 2'] = new Array(100000,		12, 'Ropa', 	100, 	75);
Unites_Stats['M1 Abrams'] = new Array(70.000,		8, 'Ropa', 	80, 	55);
Unites_Stats['T-90'] = new Array(85000,			10, 'Ropa', 	85, 	60);
Unites_Stats['Mil MI-24 Hind'] = new Array(75000,			8, 'Benzyna', 	50, 	22);
Unites_Stats['AH-64 Apache'] = new Array(60000,			6, 'Benzyna', 	45, 	18);
Unites_Stats['A-10 Thunderbolt'] = new Array(110000,		13, 'Benzyna', 	80, 	45);
Unites_Stats['Eurofighter Typhoon'] = new Array(85000,			11, 'Benzyna', 	60, 	35);
Unites_Stats['F22 Raptor'] = new Array(90000,			11, 'Benzyna', 	70, 	35);
Unites_Stats['F117A Nighthawk'] = new Array(120000,		14, 'Benzyna', 	100, 	50);
Unites_Stats['Rockwell B1'] = new Array(250000,		20, 'Benzyna', 	200, 	60);
Unites_Stats['Northrop B2 Spirit'] = new Array(2000000,		30, 'Benzyna', 	255, 	80);
Unites_Stats['Statek do szukania min Hameln'] = new Array(70000,			9, 'Ropa', 	100, 	30);
Unites_Stats['Fregate F124'] = new Array(500000,		18, 'Ropa', 	150, 	60);
Unites_Stats['Korvette'] = new Array(350000,		12, 'Ropa', 	140, 	50);
Unites_Stats['Lotniskowiec USS Nimitz'] = new Array(1500000,		25, 'Benzyna', 	220, 	90);
Unites_Stats['U-bot klasy 212A'] = new Array(800000,		20, 'Ropa', 	180, 	80);
Unites_Stats['Batalistyczny U-bot klasy Typhoon'] = new Array(1000000,		20, 'Ropa', 	200, 	80);
Unites_Stats['Drut kolczasty'] = new Array(20000,			0, 'Benzyna', 	0, 	0); 
Unites_Stats['Bunkier'] = new Array(40000,			0, 'Benzyna', 	0, 	0); 
Unites_Stats['Mina lądowa'] = new Array(250000,		0, 'Benzyna', 	0, 	0); 
Unites_Stats['Patriot-Batterie'] = new Array(150000,		0, 'Benzyna', 	0, 	0); 
Unites_Stats['Mina wodna'] = new Array(100000,		0, 'Benzyna', 	0, 	0); 
Unites_Stats['Dział-Gatling'] = new Array(100000,		0, 'Benzyna', 	0, 	0); 
Unites_Stats['Bateria wybrzeżna'] = new Array(200000,		0, 'Benzyna', 	0, 	0); 
Unites_Stats['Eurocopter Tigre'] = new Array(80000,			8, 'Benzyna', 	50, 	30);
Unites_Stats['T-95 Black Eagle'] = new Array(170000,		10, 'Ropa', 	100, 	100);
Unites_Stats['B-52 Stratofortress'] = new Array(4000000,		50, 'Benzyna', 	255, 	140);
Unites_Stats['Fraegate F239'] = new Array(1000000,		25, 'Ropa', 	200, 	120);
Unites_Stats['Czołg do rozminowywania Keiler'] = new Array(45000,			6, 'Ropa', 	60, 	35);
Unites_Stats['Mil MI-28 Havoc'] = new Array(70000,			7, 'Benzyna', 	45, 	18);
Unites_Stats['Leopard 3'] = new Array(150000,		3, 'Ropa', 	100, 	40);
Unites_Stats['Grey Ghost'] = new Array(85000,		4, 'Benzyna', 70, 20);

function DelPoint(Nombre) {
	var	End = Nombre.replace(/\./g,'');
	return End;
} function Arrondir(x, n) {
	var decalage = Math.pow(10, n);
	x *= decalage;
	x = Math.round(x);
	x /= decalage;
	return x;
} function Convert(Quantite, Type) {
	if (Quantite < Math.pow(10,3)) {
		if (Type == 'Argent') { 
			Quantite += ' $';
		} else if (Type == 'Petrole') {
			Quantite += ' Litres';
		} else {
			Quantite += ' Caisses';
		}
	} else if (Quantite < Math.pow(10,6)) {
		Quantite /= Math.pow(10,3);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' k';
	} else if (Quantite < Math.pow(10,9)) {
		Quantite /= Math.pow(10,6);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' m';
	} else if (Quantite < Math.pow(10,12)) {
		Quantite /= Math.pow(10,9);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' Md';
	} else if (Quantite < Math.pow(10,15)) {
		Quantite /= Math.pow(10,12);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' b';
	} else if (Quantite < Math.pow(10,18)) {
		Quantite /= Math.pow(10,15);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' B';
	} else if (Quantite < Math.pow(10,21)) {
		Quantite /= Math.pow(10,18);
		Quantite = Arrondir(Quantite,1);
		Quantite += (Type == 'Argent') ? ' Crésus' : ' t';
	}
	return Quantite; 
} for (i = 0, c = Temporaire.length; i < c; i++) {
	if (Temporaire[i].className == 'unitsOfAttacker') {
		Unites_Atakujący_Nom[IndiceJavaScript1] = Temporaire[i].firstChild.nextSibling.innerHTML;
		Unites_Atakujący_Debut[IndiceJavaScript1] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Atakujący_Fin[IndiceJavaScript1] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Atakujący_Detruit[IndiceJavaScript1] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		IndiceJavaScript1++;
	} else if (Temporaire[i].className == 'unitsOfDefender') {
		Unites_Obrońca_Nom[IndiceJavaScript2] = Temporaire[i].firstChild.nextSibling.innerHTML;
		Unites_Obrońca_Debut[IndiceJavaScript2] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Obrońca_Fin[IndiceJavaScript2] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Obrońca_Detruit[IndiceJavaScript2] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		IndiceJavaScript2++;
	}
} for (i = 0, c = Unites_Atakujący_Nom.length; i < c; i++) {
	Perte_Argent_Unites_Atakujący += Unites_Atakujący_Detruit[i] * Unites_Stats[Unites_Atakujący_Nom[i]][0];	
} for (i = 0, c = Unites_Obrońca_Nom.length; i < c; i++) {
	Perte_Argent_Unites_Obrońca += Unites_Obrońca_Detruit[i] * Unites_Stats[Unites_Obrońca_Nom[i]][0];	
} for (i = 0, c = Unites_Atakujący_Nom.length; i < c; i++) {
	Perte_Amunicja_Atakujący += Unites_Atakujący_Debut[i] * Unites_Stats[Unites_Atakujący_Nom[i]][3];	
} for (i = 0, c = Unites_Atakujący_Nom.length; i < c; i++) {
	if (Unites_Stats[Unites_Atakujący_Nom[i]][2] == 'Ropa') {
		Perte_Ropa_Atakujący += Unites_Atakujący_Debut[i] * Unites_Stats[Unites_Atakujący_Nom[i]][1];	
	} else {
		Perte_Benzyna_Atakujący += Unites_Atakujący_Debut[i] * Unites_Stats[Unites_Atakujący_Nom[i]][1];	
	}
}
var Ratio_Atakujący = Perte_Ropa_Atakujący * 600 + Perte_Benzyna_Atakujący * 600 + Perte_Amunicja_Atakujący * 8.4 + Perte_Argent_Unites_Atakujący;
var Ratio_Obrońca = Perte_Argent_Unites_Obrońca;
if ((Ratio_Atakujący > Ratio_Obrońca) && Ratio_Obrońca != 0) {
	Ratio = Arrondir(Ratio_Atakujący / Ratio_Obrońca, 1) + ':1';	
} else if (Ratio_Atakujący != 0 && Ratio_Obrońca != 0) {
	Ratio = '1:' +Arrondir(Ratio_Obrońca / Ratio_Atakujący, 1);	
} else {
	Ratio = '-';
} if ((Perte_Argent_Unites_Atakujący > Perte_Argent_Unites_Obrońca) && Perte_Argent_Unites_Obrońca != 0) {
	Ratio2 = Arrondir(Perte_Argent_Unites_Atakujący / Perte_Argent_Unites_Obrońca, 1) + ':1';	
} else if (Perte_Argent_Unites_Atakujący != 0 && Perte_Argent_Unites_Obrońca != 0) {
	Ratio2 = '1:' +Arrondir(Perte_Argent_Unites_Obrońca / Perte_Argent_Unites_Atakujący, 1);	
} else {
	Ratio2 = '-';
}
Add.innerHTML += '<tr><div align="center"><table><tr><th>Atakujący</th><th>Défenseur</th></tr><tr><th colspan="2">Jednostki i straty w $</tr>'
	+ '<tr><td>' + Convert(Perte_Argent_Unites_Atakujący, 'Argent') + '</td><td>' + Convert(Perte_Argent_Unites_Obrońca, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Amunicjas</th></tr>'
	+ '<tr><td>' + Convert(Perte_Amunicja_Atakujący, 'Amunicja') + '</td><td></td></tr>'
	+ '<tr><th colspan="2">Cena amunicji w $</th></tr>'
	+ '<tr><td>' + Convert(Perte_Amunicja_Atakujący * 8.4, 'Argent') + '</td><td></td></tr>'
	+ '<tr><th colspan="2">Olej</th></tr>'
	+ '<tr><td>Ropa : ' + Convert(Perte_Ropa_Atakujący, 'Petrole') + '</td></tr>'
	+ '<tr><td>Benzyna : ' + Convert(Perte_Benzyna_Atakujący, 'Petrole') + '</td></tr>'
	+ '<tr><th colspan="2">Ceny Oleju w $</th></tr>'
	+ '<tr><td>Ropa : ' + Convert(Perte_Ropa_Atakujący * 6002, 'Argent') + '</td></tr>'
	+ '<tr><td>Benzyna : ' + Convert(Perte_Benzyna_Atakujący * 12003, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Łączne nakłady</th></tr>'
	+ '<tr><td>' + Convert(Perte_Ropa_Atakujący * 6002 + Perte_Benzyna_Atakujący * 12003 + Perte_Amunicja_Atakujący * 8.4 + Perte_Argent_Unites_Atakujący, 'Argent') + '</td><td>' + Convert(Perte_Argent_Unites_Obrońca, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Stosunek</th></tr>'
	+ '<tr><td colspan="2" style="text-align:center">' + Ratio2 + '</td></tr>'
	+ '<tr><th colspan="2">Stosunek (Olej i Amunicja w komplecie)</th></tr>'
	+ '<tr><td colspan="2" style="text-align:center">' + Ratio + '</td></tr>'
	+ '</table></div></tr>';