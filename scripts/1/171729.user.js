// ==UserScript==
// @name        Supplement Rc DO FR
// @namespace   Lankoui2976
// @description indice pour la consomation total utiliser attaque deffence 
// @include     http://static.fr.desert-operations.com/world*/kb/*
// @include     http://static.uk.desert-operations.com/world*/kb/*
// @version     1 by lankou2976 2013+
	
// ==/UserScript==

var Add = document.getElementsByTagName('body')[0].firstChild.nextSibling.firstChild.nextSibling;
var Unites_Attaquant_Nom = new Array();
var Unites_Attaquant_Debut = new Array();
var Unites_Attaquant_Fin = new Array();
var Unites_Attaquant_Detruit = new Array();
var Unites_Defenseur_Nom = new Array();
var Unites_Defenseur_Debut = new Array();
var Unites_Defenseur_Fin = new Array();
var Unites_Defenseur_Detruit = new Array();
var Unites_Stats = new Array();
var Temporaire = document.getElementsByTagName('tr');
var IndiceJavaScript1 = 0;
var IndiceJavaScript2 = 0;
var Perte_Argent_Unites_Attaquant = 0;
var Perte_Argent_Unites_Defenseur = 0;
var Perte_Munition_Attaquant = 0;
var Perte_Diesel_Attaquant = 0;
var Perte_Kerosene_Attaquant = 0;
var Ratio = '';
var Ratio2 = '';

Unites_Stats['Fantassin'] = new Array(102,0, 'Kérosène', 	0, 	1);
Unites_Stats['Paras'] = new Array(340,0, 'Kérosène', 	3, 	5);
Unites_Stats['Antichar'] = new Array(978,0, 'Kérosène', 	4, 	9);
Unites_Stats['Commando de marine'] = new Array(1870,0, 'Diesel', 	6, 	17);
Unites_Stats['AMX-13 DCA'] = new Array(15300,1, 'Diesel', 	18, 	20);
Unites_Stats['AMX-30'] = new Array(29750,1, 'Diesel', 	19, 	30);
Unites_Stats['Destructeur de mines'] = new Array(38250,2, 'Diesel', 	21, 	35);
Unites_Stats['Artillerie automotrice PzH2000'] = new Array(46750,2, 'Diesel', 	21, 	35);
Unites_Stats['Lance-missile mobile'] = new Array(55250,2, 'Diesel', 	28, 	40);
Unites_Stats['M1A2 Abrams'] = new Array(59500,2, 'Diesel', 	28, 	55);
Unites_Stats['T-90'] = new Array(72250,	3, 'Diesel', 	30, 	60);
Unites_Stats['Leclerc 2'] = new Array(85000,3, 'Diesel', 	35, 	75);
Unites_Stats['Leopard 3'] = new Array(127500,1, 'Diesel', 	35, 	40);
Unites_Stats['T-95 Black Eagle'] = new Array(144500,3, 'Diesel', 	35, 	100);
Unites_Stats['AH-64 Apache'] = new Array(51000,	2, 'Kérosène', 	16, 	18);
Unites_Stats['Mil MI-28 Havoc'] = new Array(59500,2, 'Kérosène', 	16, 	18);
Unites_Stats['Mil MI-24 Hind'] = new Array(63750,	2, 'Kérosène', 	18, 	22);
Unites_Stats['Eurocopter Tigre'] = new Array(68000,2, 'Kérosène', 	16, 	30);
Unites_Stats['Eurofighter Typhoon'] = new Array(72250,3, 'Kérosène', 	21, 	35);
Unites_Stats['F22 Raptor'] = new Array(76500,3, 'Kérosène', 	25, 	35);
Unites_Stats['A-10 Thunderbolt'] = new Array(93500,3, 'Kérosène', 	28, 	45);
Unites_Stats['F117A Nighthawk'] = new Array(102000,4, 'Kérosène', 	35, 	50);
Unites_Stats['Rockwell B1'] = new Array(212500,5, 'Kérosène', 	70, 	60);
Unites_Stats['Northrop B2 Spirit'] = new Array(1700000,8, 'Kérosène', 	89, 	80);
Unites_Stats['Grey Ghost'] = new Array(72250,1, 'Kérosène', 	25, 	20);
Unites_Stats['B-52 Stratofortress'] = new Array(3400000,13, 'Kérosène', 	89, 	140);
Unites_Stats['Corvette K130'] = new Array(297500,	3, 'Diesel', 	49, 	50);
Unites_Stats['Destroyer Type 333'] = new Array(59500,2, 'Diesel', 	35, 	30);
Unites_Stats['Frégate de 2nd rang'] = new Array(425000,5, 'Diesel', 	53, 	60);
Unites_Stats['Sous-marin d attaque'] = new Array(680000,5, 'Diesel', 	63, 	80);
Unites_Stats['Sous-marin lanceur d engins'] = new Array(850000,5, 'Diesel', 	70, 	80);
Unites_Stats['Porte-avions nucléaire'] = new Array(1275000,6, 'Kérosène', 	77, 	90);
Unites_Stats['Porte-avions Charles de Gaulle'] = new Array(1700000,10, 'Kérosène', 	88, 	90);
Unites_Stats['Frégate de 1er rang'] = new Array(850000,6, 'Diesel', 	70, 	120);
Unites_Stats['Croiseur IOWA Classe B'] = new Array(935,4, 'Diesel', 	70, 	100);
Unites_Stats['Champs de barbelés'] = new Array(17000,0, 'Kérosène', 	0, 	0); 
Unites_Stats['Bunker'] = new Array(34000,0, 'Kérosène', 	0, 	0); 
Unites_Stats['Champs de mines'] = new Array(212500,0, 'Kérosène', 	0, 	0);
Unites_Stats['Mines sous-marines'] = new Array(85000,0, 'Kérosène', 	0, 	0);
Unites_Stats['Batteries de DCA'] = new Array(85000,0, 'Kérosène', 	0, 	0); 
Unites_Stats['Batterie de Patriot'] = new Array(127500,0, 'Kérosène', 	0, 	0); 
Unites_Stats['Batteries côtières'] = new Array(170000,0, 'Kérosène', 	0, 	0);

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
		Unites_Attaquant_Nom[IndiceJavaScript1] = Temporaire[i].firstChild.nextSibling.innerHTML;
		Unites_Attaquant_Debut[IndiceJavaScript1] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Attaquant_Fin[IndiceJavaScript1] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Attaquant_Detruit[IndiceJavaScript1] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		IndiceJavaScript1++;
	} else if (Temporaire[i].className == 'unitsOfDefender') {
		Unites_Defenseur_Nom[IndiceJavaScript2] = Temporaire[i].firstChild.nextSibling.innerHTML;
		Unites_Defenseur_Debut[IndiceJavaScript2] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Defenseur_Fin[IndiceJavaScript2] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Defenseur_Detruit[IndiceJavaScript2] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		IndiceJavaScript2++;
	}
} for (i = 0, c = Unites_Attaquant_Nom.length; i < c; i++) {
	Perte_Argent_Unites_Attaquant += Unites_Attaquant_Detruit[i] * Unites_Stats[Unites_Attaquant_Nom[i]][0];	
} for (i = 0, c = Unites_Defenseur_Nom.length; i < c; i++) {
	Perte_Argent_Unites_Defenseur += Unites_Defenseur_Detruit[i] * Unites_Stats[Unites_Defenseur_Nom[i]][0];	
} for (i = 0, c = Unites_Attaquant_Nom.length; i < c; i++) {
	Perte_Munition_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][3];	
} for (i = 0, c = Unites_Attaquant_Nom.length; i < c; i++) {
	if (Unites_Stats[Unites_Attaquant_Nom[i]][2] == 'Diesel') {
		Perte_Diesel_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][1];	
	} else {
		Perte_Kerosene_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][1];	
	}
}
var Ratio_Attaquant = Perte_Diesel_Attaquant * 600 + Perte_Kerosene_Attaquant * 600 + Perte_Munition_Attaquant * 8.4 + Perte_Argent_Unites_Attaquant;
var Ratio_Defenseur = Perte_Argent_Unites_Defenseur;
if ((Ratio_Attaquant > Ratio_Defenseur) && Ratio_Defenseur != 0) {
	Ratio = Arrondir(Ratio_Attaquant / Ratio_Defenseur, 1) + ':1';	
} else if (Ratio_Attaquant != 0 && Ratio_Defenseur != 0) {
	Ratio = '1:' +Arrondir(Ratio_Defenseur / Ratio_Attaquant, 1);	
} else {
	Ratio = '-';
} if ((Perte_Argent_Unites_Attaquant > Perte_Argent_Unites_Defenseur) && Perte_Argent_Unites_Defenseur != 0) {
	Ratio2 = Arrondir(Perte_Argent_Unites_Attaquant / Perte_Argent_Unites_Defenseur, 1) + ':1';	
} else if (Perte_Argent_Unites_Attaquant != 0 && Perte_Argent_Unites_Defenseur != 0) {
	Ratio2 = '1:' +Arrondir(Perte_Argent_Unites_Defenseur / Perte_Argent_Unites_Attaquant, 1);	
} else {
	Ratio2 = '-';
}
Add.innerHTML += '<tr><div align="center"><table><tr><th>Attaquant</th><th>Défenseur</th></tr><tr><th colspan="2">Pertes Unités en $</tr>'
	+ '<tr><td>' + Convert(Perte_Argent_Unites_Attaquant, 'Argent') + '</td><td>' + Convert(Perte_Argent_Unites_Defenseur, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Munitions</th></tr>'
	+ '<tr><td>' + Convert(Perte_Munition_Attaquant, 'Munition') + '</td><td></td></tr>'
	+ '<tr><th colspan="2">Prix des Munitions en $</th></tr>'
	+ '<tr><td>' + Convert(Perte_Munition_Attaquant * 8.4, 'Argent') + '</td><td></td></tr>'
	+ '<tr><th colspan="2">Pétrole</th></tr>'
	+ '<tr><td>Diesel : ' + Convert(Perte_Diesel_Attaquant, 'Petrole') + '</td></tr>'
	+ '<tr><td>Kérosène : ' + Convert(Perte_Kerosene_Attaquant, 'Petrole') + '</td></tr>'
	+ '<tr><th colspan="2">Prix du Pétrole en $</th></tr>'
	+ '<tr><td>Diesel : ' + Convert(Perte_Diesel_Attaquant * 6002, 'Argent') + '</td></tr>'
	+ '<tr><td>Kérosène : ' + Convert(Perte_Kerosene_Attaquant * 12003, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Dépenses Totales :</th></tr>'
	+ '<tr><td>' + Convert(Perte_Diesel_Attaquant * 6002 + Perte_Kerosene_Attaquant * 12003 + Perte_Munition_Attaquant * 8.4 + Perte_Argent_Unites_Attaquant, 'Argent') + '</td><td>' + Convert(Perte_Argent_Unites_Defenseur, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Ratio</th></tr>'
	+ '<tr><td colspan="2" style="text-align:center">' + Ratio2 + '</td></tr>'
	+ '<tr><th colspan="2">Ratio (Pétrole & Munitions inclu)</th></tr>'
	+ '<tr><td colspan="2" style="text-align:center">' + Ratio + '</td></tr>'
	+ '</table></div></tr>';