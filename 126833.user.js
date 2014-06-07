// ==UserScript==
// @name       WG RC Valide
// @namespace  lankou2976
// @version    V2
// @description  rapport des depense de l attaquant et perte deffendeur
// @include    http://static.fr.wargame1942.com/world*/kb/*
// @copyright  2011+, Lankou2976
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
var Perte_Essence_Attaquant = 0;
var Ratio = '';
var Ratio2 = '';

Unites_Stats['Soldat'] = new Array(120,0, 'Essence', 	1, 	1); 
Unites_Stats['Grenadier'] = new Array(400,0, 'Essence', 	6, 	5);
Unites_Stats['3,7-cm Pak 37 (t)'] = new Array(1150,0, 'Essence', 	9, 	9); 
Unites_Stats['MG 34 Stellung'] = new Array(2200,0, 'Essence', 	14, 	17);
Unites_Stats['M22 Locust'] = new Array(3500,4, 'Essence', 	41, 	30);
Unites_Stats['SdKfz 7/1'] = new Array(18000,3, 'Essence', 	38, 	17);
Unites_Stats['M5A1'] = new Array(10500,5, 'Essence',  45, 	35);
Unites_Stats['PzKpfw III'] = new Array(40000,6, 'Essence', 	60, 	40);
Unites_Stats['PzKpfw IV'] = new Array(70000,7, 'Essence', 	50, 	40);
Unites_Stats['PzKpfw V "Panther"'] = new Array(70.000,3, 'Essence', 	60, 	50);
Unites_Stats['M26 Pershing'] = new Array(85000,8, 'Essence', 	64, 	55);
Unites_Stats['PzKpfw IV "Tiger"'] = new Array(100000,9, 'Essence', 	75, 	75);
Unites_Stats['Messerschmitt Bf 109 A'] = new Array(60000,3, 'Essence', 	34, 	20);
Unites_Stats['Junkers Ju 87a "Stuka"'] = new Array(75000,6, 'Essence', 	38, 	25);
Unites_Stats['★ Supermarine Spitfire'] = new Array(85000,3, 'Essence', 	53, 	20);
Unites_Stats['Messerschmitt Bf 110 A'] = new Array(110000,4, 'Essence', 	40, 	50);
Unites_Stats['De Havilland Mosquito FB VI'] = new Array(130000,5, 'Essence', 	45, 	60);
Unites_Stats['Junkers Ju 88 B'] = new Array(85000,8, 'Essence', 	45, 	70);
Unites_Stats['Heinkel He 111 B'] = new Array(90000,8, 'Essence', 	53, 	80);
Unites_Stats['Vickers Wellington B.I'] = new Array(110000,10, 'Essence', 	60, 	110);
Unites_Stats['Avro 679 Manchester Mk. IA'] = new Array(130000,11, 'Essence', 	75, 	150);
Unites_Stats['Avro 683 "Lancaster"'] = new Array(250000,15, 'Essence', 	150, 	200);
Unites_Stats['Arado Ar 234B-1'] = new Array(900000,23, 'Essence', 	191, 	330);
Unites_Stats['Mouilleur de mines'] = new Array(10000,7, 'Diesel', 	75, 	10);
Unites_Stats['Sous-marin classe King George V'] = new Array(35000,9, 'Diesel', 	105, 	20);
Unites_Stats['Croiseur Léger Classe Town'] = new Array(500000,14, 'Diesel', 	113, 	15);
Unites_Stats['Zerstörer 1936'] = new Array(1000000,15, 'Diesel', 	150, 	50); 
Unites_Stats['Le Redoutable S 611'] = new Array(500000,14, 'Diesel', 	130, 	20); 
Unites_Stats['Sous-marin Type VII classe C'] = new Array(650000,14, 'Diesel', 	135, 	21); 
Unites_Stats['Sous-marin classe XIII'] = new Array(800000,15, 'Diesel', 	165, 	30); 
Unites_Stats['Porte-avions HMS Eagle'] = new Array(1500000,19, 'Diesel', 	165, 	80); 
Unites_Stats['barbelés'] = new Array(20000,0, 'Essence', 	0, 	0); 
Unites_Stats['Mine antipersonnel'] = new Array(100000,0, 'Essence', 	0, 	0); 
Unites_Stats['Mine marine'] = new Array(100000,0, 'Essence', 	0, 	0);
Unites_Stats['2-cm-Flak-Vierling 38'] = new Array(100000,0, 'Essence', 	0, 	0);
Unites_Stats['barrage antichar'] = new Array(200000,0, 'Essence', 	0, 	0);
Unites_Stats['Mine antichar'] = new Array(250000,0, 'Essence', 	0, 	0);

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
		Perte_Essence_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][1];	
	}
}
var Ratio_Attaquant = Perte_Diesel_Attaquant * 600 + Perte_Essence_Attaquant * 600 + Perte_Munition_Attaquant * 8.4 + Perte_Argent_Unites_Attaquant;
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
	+ '<tr><td>Essence : ' + Convert(Perte_Essence_Attaquant, 'Petrole') + '</td></tr>'
	+ '<tr><th colspan="2">Prix du Pétrole en $</th></tr>'
	+ '<tr><td>Diesel : ' + Convert(Perte_Diesel_Attaquant * 6002, 'Argent') + '</td></tr>'
	+ '<tr><td>Essence : ' + Convert(Perte_Essence_Attaquant * 12003, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Dépenses Totales :</th></tr>'
	+ '<tr><td>' + Convert(Perte_Diesel_Attaquant * 6002 + Perte_Essence_Attaquant * 12003 + Perte_Munition_Attaquant * 8.4 + Perte_Argent_Unites_Attaquant, 'Argent') + '</td><td>' + Convert(Perte_Argent_Unites_Defenseur, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Ratio</th></tr>'
	+ '<tr><td colspan="2" style="text-align:center">' + Ratio2 + '</td></tr>'
	+ '<tr><th colspan="2">Ratio (Pétrole & Munitions inclu)</th></tr>'
	+ '<tr><td colspan="2" style="text-align:center">' + Ratio + '</td></tr>'
	+ '</table></div></tr>';
