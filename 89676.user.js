// ==UserScript==
// @name           formulawan_bonusanalyse
// @namespace      formulawananalyse
// @description    Erstellt eine Analyse der eingebauten Tuningteile am Auto. Uebersetzt aus dem Franzoesischen. Vielen Dank an fer a rire
// @include        http://www.formulawan.de/Fenetre_Olympe.php?action=fiche_voiture*
// @include        http://www.formulawan.de/Fenetre_Statut.php?action=voiture*
// @include        http://www.formulawan.de/Fenetre_Voiture.php?action=Gestion;id=*
// @version	   1.0
// @licence	   GPLv3        
// ==/UserScript==
// @translate by  Die Stuemper


/******* LISTE DER TRIGGERBONI /55

Gas - Gas	***		/15
Gas - Bremsen		**** 		/20
Gas - Kurven		****		/20
Gas - Tempo		***		/15

Bremsen - Gas		*** 		/15
Bremsen - Bremsen		*****		/25
Bremsen - Kurven		****		/20
Bremsen - Tempo		****		/20
	
Kurven - Gas		****		/20
Kurven - Bremsen		****		/20
Kurven - Kurven			*** 		/15
Kurven - Tempo		****		/20

Tempo - Gas		**		/10
Tempo - Bremsen		***		/15
Tempo - Kurven		**		/10
Tempo - Tempo		***		/15
*/

var bonus, regex, key, textnodes, node;

bonus = construct_bonus();
regex = construct_regex(bonus);
var bonus_number=0, bonus_name = {};
bonus_number = calcul_bonus_tuning(bonus_name,bonus);

var name_bonus_cond = ['Acc - Acc','Acc - Fre','Acc - Vir','Acc - Vit','Fre - Acc','Fre - Fre','Fre - Vir','Fre - Vit','Vir - Acc','Vir - Fre','Vir - Vir','Vir - Vit','Vit - Acc','Vit - Fre','Vit - Vir','Vit - Vit'];
var max_bonus_cond = [15,20,20,15,15,25,20,20,20,20,15,20,10,15,10,15];
var bonus_cond = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


var i = 0;
var stat_car = {};
while(document.getElementsByClassName('statBar')[i]) {
	stat_car[i] = document.getElementsByClassName('statBar')[i].title;	
	i++;
} 

var nb_bonus=0;
var bonus_pilote = [0,0,0,0];
var lvl_name, lvl_value = 0;
while((nb_bonus<bonus_number)) {	
	lvl_name = document.getElementsByClassName('rarity')[nb_bonus].getElementsByTagName("img")[0].title;
	if(lvl_name=="Klitzeklein") lvl_value = 1;
	else if(lvl_name=="Mittelm\u00e4ssig") lvl_value = 2;
	else if(lvl_name=="Gut") lvl_value = 3;
	else if(lvl_name=="Super") lvl_value = 4;
	else lvl_value = 5;
	bonus_name[nb_bonus] = bonus_name[nb_bonus].toLowerCase(); 
	bonus_name[nb_bonus] = bonus_name[nb_bonus].replace(new RegExp('.*6.*|.*[kn]:.*|.*%.*|.*:.1.|.*haftung| |\t|\n|\r|', 'g'),'');
	switch(bonus_name[nb_bonus]) {
	case "beschleunigung":
		bonus_pilote[0] += (lvl_value);
		break;
	case "bremsen":
		bonus_pilote[1] += (lvl_value);
		break;
	case "kurven":
		bonus_pilote[2] += (lvl_value);
		break;
	case "geschwindigkeit":
		bonus_pilote[3] += (lvl_value);
		break;
	case "gas":
		bonus_pilote[0] += (lvl_value);
		break;
	case "tempo":
		bonus_pilote[3] += (lvl_value);
		break;
	case "gas-gas":
		bonus_pilote[0] += (lvl_value);
		bonus_cond[0] += (lvl_value);
		break;
	case "gas-bremsen":
		bonus_pilote[0] += (lvl_value/2);
		bonus_pilote[1] += (lvl_value/2);
		bonus_cond[1] += (lvl_value);
		break;
	case "gas-kurven":
		bonus_pilote[0] += (lvl_value/2);
		bonus_pilote[2] += (lvl_value/2);
		bonus_cond[2] += (lvl_value);
		break;
	case "gas-tempo":
		bonus_pilote[0] += (lvl_value/2);
		bonus_pilote[3] += (lvl_value/2);
		bonus_cond[3] += (lvl_value);
		break;
	case "bremsen-gas":
		bonus_pilote[1] += (lvl_value/2);
		bonus_pilote[0] += (lvl_value/2);
		bonus_cond[4] += (lvl_value);
		break;
	case "bremsen-bremsen":
		bonus_pilote[1] += (lvl_value);
		bonus_cond[5] += (lvl_value);
		break;
	case "bremsen-kurven":
		bonus_pilote[1] += (lvl_value/2);
		bonus_pilote[2] += (lvl_value/2);
		bonus_cond[6] += (lvl_value);
		break;
	case "bremsen-tempo":
		bonus_pilote[1] += (lvl_value/2);
		bonus_pilote[3] += (lvl_value/2);
		bonus_cond[7] += (lvl_value);
		break;
	case "kurven-gas":
		bonus_pilote[2] += (lvl_value/2);
		bonus_pilote[0] += (lvl_value/2);
		bonus_cond[8] += (lvl_value);
		break;
	case "kurven-bremsen":
		bonus_pilote[2] += (lvl_value/2);
		bonus_pilote[1] += (lvl_value/2);
		bonus_cond[9] += (lvl_value);
		break;
	case "kurven-kurven":
		bonus_pilote[2] += (lvl_value);
		bonus_cond[10] += (lvl_value);
		break;
	case "kurven-tempo":
		bonus_pilote[2] += (lvl_value/2);
		bonus_pilote[3] += (lvl_value/2);
		bonus_cond[11] += (lvl_value);
		break;
	case "tempo-gas":
		bonus_pilote[3] += (lvl_value/2);
		bonus_pilote[0] += (lvl_value/2);
		bonus_cond[12] += (lvl_value);
		break;
	case "tempo-bremsen":
		bonus_pilote[3] += (lvl_value/2);
		bonus_pilote[1] += (lvl_value/2);
		bonus_cond[13] += (lvl_value);
		break;
	case "tempo-kurven":
		bonus_pilote[3] += (lvl_value/2);
		bonus_pilote[2] += (lvl_value/2);
		bonus_cond[14] += (lvl_value);
		break;
	case "tempo-tempo":
		bonus_pilote[3] += (lvl_value);
		bonus_cond[15] += (lvl_value);
		break;
	default :
	}
	nb_bonus++;
}


var k=2;
if (location.search.split("=")[1] == "voiture;id") { k = 1 ;}
for (var i = 0; i < 4; i++) document.getElementsByTagName("strong")[i + k].innerHTML +=
		": " + document.getElementsByClassName("statBar")[i].title;

var titre_stat = document.createElement("h2");
titre_stat.innerHTML = 'Detailanalyse';
var content_stat = document.createElement("div");
content_stat.appendChild(titre_stat);

var i = 0;
var j = 0;

var chaine_tmp;
var name_bonus_ord2 = ['Beschleunigung','Bremsen','Kurven','Geschwindigkeit'];
var sum_bonus_cond = somme_bonus_cond();

chaine_tmp= '\n\n</dl><h3>Fahrerbonus durch Tuning:</h3><dl>\n'; 
i=0;
while(i<4) {	
    chaine_tmp += '<dt>'+name_bonus_ord2[i]+':</dt><dd>' + 
	parseInt((stat_car[i]/25)) + ' \+ ' + bonus_pilote[i] + '\t\= ' + 
	(parseInt((stat_car[i]/25)) + bonus_pilote[i]) + '</dd>\n';
    i++;}
chaine_tmp += '\n\n</dl><h3>Trigger-Boni: ';	
chaine_tmp += sum_bonus_cond  + ' von '+ 30*5 +' (' + parseInt(sum_bonus_cond*100/(5*30)) + '\%)</h3>\n' ;

var chaine_tmp;
var name_bonus_ord = ['Bes','Bre','Kur','Ges'];
chaine_tmp += '<table class=\"table largeTable\"><thead>\n' +
    '<th></th>\n<th width="60">Bes</th>\n<th width="60">Bre</th>\n<th width="60">Kur</th>\n<th width="60">Ges</th>\n</thead>\n'
    while(j<4) {
	i=0;
	chaine_tmp += '<tr><th>'+name_bonus_ord[j]+'</th>'; 
	while(i<4) {
	    chaine_tmp+=
		'<td><center>' + bonus_cond[4*j+i] +
		'<div class=\"bar\" onMouseOver=\'showTip(\"' + parseInt(bonus_cond[4*j+i]*100/max_bonus_cond[4*j+i]) +
		'\%\",\"\");\' onMouseOut=\'hideTip();\'><div class=\"inside \" style=\"width: '+ 
		bonus_cond[4*j+i]*60/max_bonus_cond[4*j+i] +'px; "></div></div>' + '</center></td>\n'; 
	    i++;}
	chaine_tmp+= '</tr>\n';
	j++;}
chaine_tmp+= '</table>\n';
content_stat.innerHTML += chaine_tmp;

if (document.location.href.indexOf("http://www.formulawan.de/Fenetre_Voiture.php?action=Gestion;id=")>=0)
    document.getElementById("innerContent").insertBefore(content_stat,document.getElementsByClassName('table largeTable')[0]);
 else document.getElementById("innerContent").insertBefore(content_stat,document.getElementsByTagName('h2')[1]);



//////  functions

// Summiert den Inhalt von bonus_cond und gibt das Resultat zurück
// Im Prinzip werden hier alle Triggerboni addiert.
function somme_bonus_cond() {
	var sum = 0;
	for (var i = 0; i < 16; i++) sum += bonus_cond[i];
	return sum
};

// Erstellt die Bonusliste
function construct_bonus() {
	var bonus_tmp = {
	"Extrabreite Windfl\u00fcgel":		"Fahrer: +1 Bremsen",
	"Doppel Turbo":						"\u00fcberholen: +2 Tempo",
	"Autopilot":						"Auto: +6 Kurven",
	"Blitzschnell":						"Auto: +6 Tempo",
	"Doppeltreibstofffach": 			"Auto: +6 Tempo",
	"Energiesaugnapf":					"Auto: +6 Bremsen",
	"Energieschild":          			"Auto: +5 Struct",
	"Extra-Metallplatte":     			"Auto: +5 Struct",
	"Extrabreit":        				"Auto: +6 Kurven",
	"Federleicht":						"Auto: +6 Gas",
	"Fliegleinflieg":					"Auto: +6 Tempo",
	"G\u00f6tterPower":					"Auto: +6 Tempo",
	"Liegestuhl":						"Auto: +6 Gas",
	"Magnetisierung":					"Auto: +6 Bremsen",
	"Megabremssystem":					"Auto: +6 Bremsen",
	"N\u00e4geldecke":					"Auto: +6 Bremsen",
	"Platte Form":						"Auto: +6 Kurven",
	"Premiumenergie":					"Auto: +6 Tempo",
	"Schaukelsystem":					"Auto: +6 Kurven",
	"Staubsauger":						"Auto: +6 Tempo",
	"Unzerst\u00f6rbar":				"Auto: +5 Struct",
	"Vollgasgang":						"Auto: +6 Gas",
	"\u00d6l Erste Klasse":				"Auto: +6 Gas",	
	"1000 Pferdest\u00e4rke":			"Fahrer: +1 Tempo",
	"Autosteuerung":					"Fahrer: +1 Kurven",
	"Blockierte Reifen":				"Fahrer: +1 Kurven",
	"Doppelbremsescheiben":				"Fahrer: +1 Bremsen",
	"Erster Gang MegaBooster":			"Fahrer: +1 Gas",
	"Erstklassige Bremsen":				"Fahrer: +1 Bremsen",
	"Extra Kolben":						"Fahrer: +1 Gas",
	"Extra Vorsicht":					"Fahrer: +1 Bremsen",
	"Faltreifen":						"Fahrer: +1 Kurven",
	"Feinste Metalllegierung":			"Fahrer: +1 Gas",
	"Geschwindigkeitsprofi":			"Fahrer: +1 Tempo",
	"Hitzfeste Reifen":					"Fahrer: +1 Bremsen",
	"Hochm\u00fctig":					"Fahrer: +1 Tempo",
	"Immer Vorne":						"Fahrer: +1 Gas",
	"Kurvenrowdy":						"Fahrer: +1 Kurven",
	"Ministeuer":						"Fahrer: +1 Kurven",
	"Muskul\u00f6se Kurbelwelle":		"Fahrer: +1 Bremsen",
	"Perfektes Gleichgewicht":			"Fahrer: +1 Kurven",
	"Saugnapf":							"Fahrer: +1 Kurven",
	"Siebter Gang":						"Fahrer: +1 Tempo",
	"Strassenrandprofi":				"Fahrer: +1 Kurven",
	"Super Bremse":						"Fahrer: +1 Bremsen",
	"Super Instinkt":					"Fahrer: +1 Bremsen",
	"Supergasgeber":					"Fahrer: +1 Gas",
	"Tempokanone":						"Fahrer: +1 Tempo",
	"Tiefliegend":						"Fahrer: +1 Tempo",
	"Unglaublich Stolz":				"Fahrer: +1 Gas",
	"Windfl\u00fcgel":					"Fahrer: +1 Gas",
	"Windschnittig":					"Fahrer: +1 Gas",
	"\u00dcberhitzte Z\u00fcndkerzen":	"Fahrer: +1 Gas",
	"Zweiter Gang MegaBooster":			"Fahrer: +1 Gas",
	"ABS":								"Gas - Bremsen",
	"Alles Unter Kontrolle":			"Gas - Kurven",
	"Automatischer Weg":				"Kurven - Gas",
	"Bremsi-Kurvi":						"Bremsen - Kurven",
	"Bremskarli":						"Tempo - Bremsen",
	"Bremsklappen":						"Bremsen - Bremsen",
	"DreierBonus":						"Bremsen - Bremsen",
	"Dreifaches Gaspedal":				"Gas - Tempo",
	"Dritter Gang MegaBooster":			"Kurven - Gas",
	"Eierf\u00f6rmig":					"Kurven - Gas",
	"Elastische Pl\u00e4ttchen":		"Bremsen - Tempo",
	"Extra Gummireifen":				"Gas - Kurven",
	"Extrabremssystem":					"Bremsen - Bremsen",
	"Flitzi-Bremsi":					"Bremsen - Gas",
	"Gang 3-5":							"Gas - Tempo",
	"Gang 5-2":							"Bremsen - Bremsen",
	"Gang sechseinhalb":				"Tempo - Tempo",
	"Gekreutzte Kolben":				"Kurven - Tempo",
	"Grosse Zylinder":					"Gas - Bremsen",
	"Gummilegierung":					"Bremsen - Kurven",
	"Gummireifen":						"Tempo - Bremsen",
	"Hinterteil federleicht":			"Bremsen - Tempo",
	"H\u00f6flich":						"Tempo - Tempo",
	"Konstant":							"Bremsen - Tempo",
	"Kurvenheini":						"Gas - Kurven",
	"Kurvenprofi":						"Kurven - Bremsen",
	"Kurvenschnell":					"Kurven - Tempo",
	"Kurze G\u00e4nge":					"Gas - Gas",
	"Lenkradblockierung":				"Tempo - Kurven",
	"Magische F\u00fcnf":				"Kurven - Tempo",
	"Megakurven":						"Kurven - Kurven",
	"Nah am Gaspedal":					"Bremsen - Gas",
	"Niedriger 5-Gang":					"Tempo - Bremsen",
	"Nonplusultra G\u00e4nge":			"Bremsen - Gas",
	"Optimum Gewicht":					"Bremsen - Kurven",
	"Premium Reifen":					"Gas - Bremsen",
	"Rakete":							"Gas - Tempo",
	"Reifenspuren":						"Gas - Gas",
	"Rotative Bremsen":					"Kurven - Bremsen",
	"R\u00fcckprall":					"Kurven - Kurven",
	"Schwerpunkt Extra":				"Kurven - Gas",
	"Superhaftung":						"Kurven - Kurven",
	"Tiefliegende Reifen":				"Kurven - Bremsen",
	"Todessprung":						"Kurven - Tempo",
	"Turboknopf":						"Tempo - Gas",
	"Turborohr":						"Tempo - Gas",
	"Turbo":							"Gas - Gas",
	"Ultra Gummikleber":				"Bremsen - Bremsen",
	"Unabh\u00e4ngig Rechts-Links":		"Bremsen - Kurven",
	"Vierfacher Auspuff":				"Tempo - Tempo",
	"Vierte St\u00e4rke":				"Gas - Kurven",
	"Wandelgummi":						"Tempo - Kurven",
	"Wechselreich":						"Gas - Bremsen",
	"Zweist\u00fcckiges Ger\u00fcst":	"Kurven - Bremsen",
	"Zweiter Gang Megabooster":			"Bremsen - Tempo",
	"Auspuffallergisch":				"\u00fcberholen: +1",
	"Ausscheren":						"\u00fcberholen: +1",
	"Ausserirdisches Bremssystem":		"\u00fcberholen: +2 Bremsen",
	"Breite Fl\u00fcgel":				"\u00fcberholen: +2 Tempo",
	"Gang 3-1":							"\u00fcberholen: +2 Bremsen",
	"Gangsalat":						"\u00fcberholen: +2 Gas",
	"Jupiter-Handbremse":				"\u00fcberholen: +2 Bremsen",
	"Kleiner Kopf":						"\u00fcberholen: +1",
	"Nahstehende G\u00e4nge":			"\u00fcberholen: +2 Tempo",
	"Nitroinjektor":					"\u00fcberholen: +2 Gas",
	"N\u00e4gelreifen":					"\u00fcberholen: +2 Bremsen",
	"Platte Reifen":					"\u00fcberholen: +2 Kurven",
	"Rote Zone":						"\u00fcberholen: +1",
	"Schaukel Hin-Schaukel Her":		"\u00fcberholen: +1",
	"Spitznase":						"\u00fcberholen: +1",
	"Ungeheuer schlank":				"\u00fcberholen: +2 Kurven",
	"Volle Kurve":						"\u00fcberholen: +2 Kurven",
	"\u00dcberholheini":				"\u00fcberholen: +1",
	"Abgasturbo":						"block: +1",
	"Bremskalkulator":					"block: +2 Bremsen",
	"Elektronische Bremsen":			"block: +2 Bremsen",
	"Extragang":						"block: +2 Gas",
	"Falsche Linie":					"block: +2 Kurven",
	"Fettes Hinterteil":				"block: +1",
	"Gaspedalkalkulator":				"block: +2 Gas",
	"Kurvenkalkulator":					"block: +2 Kurven",
	"Pr\u00e4zisionsbremse":			"block: +1",
	"Seitenwechsel":					"block: +2 Tempo",
	"Selbstachtung":					"block: +1",
	"Tempokalkulator":					"block: +2 Tempo",
	"Tennisb\u00e4lle":					"block: +1",
	"Ausweichprofi":					"-2% Kollision",
	"Empfindliche Motorbremse":			"-2% Kollision",
	"Gummiblech":						"-2% Kollision",
	"Lebenslustig":						"-2% Kollision",
	"Sehr Empfindlich":					"-2% Kollision",
	"Aufsaugblase":						"-5% Schaden",
	"Panzerplatte":						"-5% Schaden",
	"G\u00f6ttliche Haftung":			"+1 Haftung",
	"Super Strassenlage":				"+1 Haftung",
	"Synthetische Reifen":				"+1 Haftung",
	"Thesafilm":						"+1 Haftung",
	// Basiswerte (noch ohne Funktion)
	"Acceleration : niveau":			"Base Acceleration : niveau",
	"Structure : niveau":				"Base Structure : niveau",
	"Freinage : niveau":				"Base Freinage : niveau",
	"Vitesse : niveau":					"Base Vitesse : niveau",
	"Tenue de route : niveau":			"Base Tenue de route : niveau",
	"Virage : niveau":					"Base Virage : niveau"
};
	return bonus_tmp;
}
// Erstellt eine Liste mit regulären Ausdrücken aufgrund der Bonusliste
function construct_regex(bonus) {	
    var tmp_regex = {}, key;
    for (key in bonus) tmp_regex[key] = new RegExp(key, 'g');
    return tmp_regex;
};

// Analysiert das Tuning und erstellt eine Liste der Boni. Gibt die Anzahl der einzelnen Boni zurück.
function calcul_bonus_tuning(bonus_name,bonus) {
var i = 0;
var tmp_obj,key,s;
var document_cpy = document;
	while(document_cpy.getElementsByClassName('equipment')[i]) {
		s = document_cpy.getElementsByClassName('equipment')[i++].textContent;
		for (key in bonus) {
        		tmp_obj = s.replace(regex[key], bonus[key]);
			if(tmp_obj != s) {
				bonus_name[bonus_number++] = bonus[key];
				break;
			}
    		}
	} 
	return bonus_number;
};

// css-style in html add: for a future use, or not...
// function addGlobalStyle(css) {
//     var head, style;
//     head = document.getElementsByTagName('head')[0];
//     if (!head) { return; }
//     style = document.createElement('style');
//     style.type = 'text/css';
//     style.innerHTML = css;
//     head.appendChild(style);
// }