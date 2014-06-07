// ==UserScript==
// @name           DO Commerce Info
// @namespace      http://grimpow.lescigales.org/
// @description    Donne des infos cruciales sur les ressources en vente sur le commerce : -20%, +20%...
// @include        http://*.desert-operations.*/world*/handel.php*
// @version        1.06
// ==/UserScript==

var tr = document.getElementsByTagName('tr');
var Quantite = new Array();
var Prix = new Array();
var IndiceJavaScript = 0;
var Unites_Stats = new Array();
var Argent_Courant = document.getElementById('rs_money').innerHTML;
Unites_Stats['Fantassin'] = 120;
Unites_Stats['Antichar'] = 1150;
Unites_Stats['Paras'] = 400;
Unites_Stats['Commando de marine'] = 2200;
Unites_Stats['AMX-13 DCA'] = 18000;
Unites_Stats['AMX-30'] = 35000;
Unites_Stats['Lance-missile mobile'] = 65000;
Unites_Stats['Artillerie automotrice PzH2000'] = 55000;
Unites_Stats['Leclerc 2'] = 100000;
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
Unites_Stats['Destroyer'] = 70000;
Unites_Stats['Frégate de 2nd rang'] = 500000;
Unites_Stats['Corvette'] = 350000;
Unites_Stats['Porte-avions nucléaire'] = 1500000;
Unites_Stats['Sous-marin d attaque'] = 800000;
Unites_Stats['Sous-marin lanceur d engins'] = 1000000;
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
Unites_Stats['Frégate de 1er rang'] = 1000000;
Unites_Stats['Destructeur de mines'] = 45000;
Unites_Stats['Mil MI-28 Havoc'] = 70000;
Unites_Stats['Leopard 3'] = 150000;
Unites_Stats['Or'] = 1000;
Unites_Stats['Pétrole'] = 500;
Unites_Stats['Munitions'] = 7;
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
	if (Arg.match(/kMd/g)) {
		Arg = parseInt(Arg) * Math.pow(10,12);
	} else if (Arg.match(/Md/g)) {
		Arg = parseInt(Arg) * Math.pow(10,9);
	} else if (Arg.match(/M/g)) {
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
	if (Arg.match(/Or|Gold/g,'')) {
		Type = 'Or';
	} if (Arg.match(/Pétrole|Oil/g)) {
		Type = 'Pétrole';
	} else if (Arg.match(/MilMI-28Havoc/g)) {
		Type = 'Mil MI-28 Havoc';
		Arg = Arg.replace(/MilMI-28Havoc/,'');
	} else if (Arg.match(/Fantassin|Soldier/g)) {
		Type = 'Fantassin';	
	} else if (Arg.match(/Antichar|Anti-TankMissile/g)) {
		Type = 'Antichar';	
		Arg = Arg.replace(/Anti-TankMissile/,'');
	} else if (Arg.match(/Paras|Paratrooper/g)) {
		Type = 'Paras';	
	} else if (Arg.match(/Commandodemarine|Frogman/g)) {
		Type = 'Commando de marine';
	} else if (Arg.match(/AMX-13DCA|AAtankGepardRadarG/g)) {
		Type ='AMX-13 DCA';
	} else if (Arg.match(/AMX-30|Jaguar2/g)) {
		Type = 'AMX-30';
	} else if (Arg.match(/Lance-missilemobile|M270MLRS\(Mars\)/g)) {
		Type = 'Lance-missile mobile';
		Arg = Arg.replace(/M270MLRS\(Mars\)/,'');
	} else if (Arg.match(/ArtillerieautomotricePzH2000|Tankhowitzer2000/g)) {
		Type = 'Artillerie automotrice PzH2000';
	} else if (Arg.match(/T-90/g)) {
		Type = 'T-90';
	} else if (Arg.match(/MilMI-24Hind/g)) {
		Type = 'Mil MI-24 Hind';
	} else if (Arg.match(/M1Abrams|M1A2Abrams/g)) {
		Type = 'M1 Abrams';
		Arg = Arg.replace(/M1Abrams|M1A2Abrams/g,'');
	} else if (Arg.match(/AH-64Apache/g)) {
		Type = 'AH-64 Apache';
	} else if (Arg.match(/Leclerc2|Leopard2/g)) {
		Type = 'Leclerc 2';
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
	} else if (Arg.match(/Destroyer|HamelnClass\(Type333\)Minesweeper/g)) {
		Type = 'Destroyer';
		Arg = Arg.replace(/HamelnClass\(Type333\)Minesweeper/,'');
	} else if (Arg.match(/Frégatede2ndrang|FrigateF124/g)) {
		Type = 'Frégate de 2nd rang';
	} else if (Arg.match(/Corvette/g)) {
		Type = 'Corvette';
	} else if (Arg.match(/Porte-avionsnucléaire|AircraftCarrierUSSNimitz/g)) {
		Type = 'Porte-avions nucléaire';
	} else if (Arg.match(/Sous-marindattaque|Submarineclass212A/g)) {
		Type = 'Sous-marin d attaque';
	} else if (Arg.match(/Sous-marinlanceurdengins|BallisticsubmarineTyphoon-class/g)) {
		Type = 'Sous-marin lanceur d engins';
	} else if (Arg.match(/T-95BlackEagle/g)) {
		Type = 'T-95 Black Eagle';
	} else if (Arg.match(/B-52Stratofortress/g)) {
		Type = 'B-52 Stratofortress';
	} else if (Arg.match(/Frégatede1errang|FrigateF239/g)) {
		Type = 'Frégate de 1er rang';
	} else if (Arg.match(/Destructeurdemines|MineClearingVehicleKeiler/g)) {
		Type = 'Destructeur de mines';
		Arg = Arg.replace(/MineClearingVehicleKeiler/,'');
	} else if (Arg.match(/GreyGhost/g)) {
		Type = 'Grey Ghost';
	} else if (Arg.match(/Leopard3/g)) {
		Type = 'Leopard 3';
	} else if (Arg.match(/EurocopterTigre/g)) {
		Type = 'Eurocopter Tigre';
	} else if (Arg.match(/Munitions|Ammunition/g)) {
		Type = 'Munitions';
		Arg = Arg.replace(/Munitions/,'');
	} if (Arg.match(/kMd/g)) {
		Arg = parseInt(Arg) * Math.pow(10,12);
	} else if (Arg.match(/Md/g)) {
		Arg = parseInt(Arg) * Math.pow(10,9);
	} else if (Arg.match(/M/g)) {
		Arg = parseInt(Arg) * Math.pow(10,6);
	}
	Arg = parseInt(Arg);
	return Array(Type,Arg);
} for (i = 14, c = tr.length; i < c; i++) {
	if (tr[i].className == 'odd' || tr[i].className == 'even') {
		Quantite[IndiceJavaScript] = ChangeQuantite(tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		Prix[IndiceJavaScript] = ChangePrix(tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.innerHTML);
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