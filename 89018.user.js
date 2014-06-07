// ==UserScript==
// @name           formulawan_resume_car
// @namespace      formulawanresumecar
// @description    Ajoute un résumé pour une voiture
// @include        http://www.formulawan.fr/Fenetre_Olympe.php?action=fiche_voiture*
// @include        http://www.formulawan.fr/Fenetre_Statut.php?action=voiture*
// @include        http://www.formulawan.fr/Fenetre_Voiture.php?action=Gestion&id=*
// @include        http://www.formulawan.fr/Fenetre_Voiture.php?action=Gestion;id=*
// @version	   1.0
// @licence	   GPLv3        
// ==/UserScript==


/******* LISTE DES BONUS CONDITIONNELS /55

Acceleration - Acceleration	***		/15
Acceleration - Freinage		**** 		/20
Acceleration - Virage		****		/20
Acceleration - Vitesse		***		/15

Freinage - Acceleration		*** 		/15
Freinage - Freinage		*****		/25
Freinage - Virage		****		/20
Freinage - Vitesse		****		/20
	
Virage - Acceleration		****		/20
Virage - Freinage		****		/20
Virage - Virage			*** 		/15
Virage - Vitesse		****		/20

Vitesse - Acceleration		**		/10
Vitesse - Freinage		***		/15
Vitesse - Virage		**		/10
Vitesse - Vitesse		***		/15
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
	if(lvl_name=="Faible") lvl_value = 1;
	else if(lvl_name=="Moyen") lvl_value = 2;
	else if(lvl_name=="Fort") lvl_value = 3;
	else if(lvl_name=="Très Important") lvl_value = 4;
	else lvl_value = 5;
	bonus_name[nb_bonus] = bonus_name[nb_bonus].toLowerCase(); 
	bonus_name[nb_bonus] = bonus_name[nb_bonus].replace(new RegExp('.6.*|.*:.*niveau.*|.*tenue.*|au pilote.*|.1 niveau en| |\t|\n|\r|', 'g'),'');
	switch(bonus_name[nb_bonus]) {
	case "accélération":
		bonus_pilote[0] += (lvl_value);
		break;
	case "freinage":
		bonus_pilote[1] += (lvl_value);
		break;
	case "virage":
		bonus_pilote[2] += (lvl_value);
		break;
	case "vitesse":
		bonus_pilote[3] += (lvl_value);
		break;
	case "acceleration-acceleration":
		bonus_pilote[0] += (lvl_value);
		bonus_cond[0] += (lvl_value);
		break;
	case "acceleration-freinage":
		bonus_pilote[0] += (lvl_value/2);
		bonus_pilote[1] += (lvl_value/2);
		bonus_cond[1] += (lvl_value);
		break;
	case "acceleration-virage":
		bonus_pilote[0] += (lvl_value/2);
		bonus_pilote[2] += (lvl_value/2);
		bonus_cond[2] += (lvl_value);
		break;
	case "acceleration-vitesse":
		bonus_pilote[0] += (lvl_value/2);
		bonus_pilote[3] += (lvl_value/2);
		bonus_cond[3] += (lvl_value);
		break;
	case "freinage-acceleration":
		bonus_pilote[1] += (lvl_value/2);
		bonus_pilote[0] += (lvl_value/2);
		bonus_cond[4] += (lvl_value);
		break;
	case "freinage-freinage":
		bonus_pilote[1] += (lvl_value);
		bonus_cond[5] += (lvl_value);
		break;
	case "freinage-virage":
		bonus_pilote[1] += (lvl_value/2);
		bonus_pilote[2] += (lvl_value/2);
		bonus_cond[6] += (lvl_value);
		break;
	case "freinage-vitesse":
		bonus_pilote[1] += (lvl_value/2);
		bonus_pilote[3] += (lvl_value/2);
		bonus_cond[7] += (lvl_value);
		break;
	case "virage-acceleration":
		bonus_pilote[2] += (lvl_value/2);
		bonus_pilote[0] += (lvl_value/2);
		bonus_cond[8] += (lvl_value);
		break;
	case "virage-freinage":
		bonus_pilote[2] += (lvl_value/2);
		bonus_pilote[1] += (lvl_value/2);
		bonus_cond[9] += (lvl_value);
		break;
	case "virage-virage":
		bonus_pilote[2] += (lvl_value);
		bonus_cond[10] += (lvl_value);
		break;
	case "virage-vitesse":
		bonus_pilote[2] += (lvl_value/2);
		bonus_pilote[3] += (lvl_value/2);
		bonus_cond[11] += (lvl_value);
		break;
	case "vitesse-acceleration":
		bonus_pilote[3] += (lvl_value/2);
		bonus_pilote[0] += (lvl_value/2);
		bonus_cond[12] += (lvl_value);
		break;
	case "vitesse-freinage":
		bonus_pilote[3] += (lvl_value/2);
		bonus_pilote[1] += (lvl_value/2);
		bonus_cond[13] += (lvl_value);
		break;
	case "vitesse-virage":
		bonus_pilote[3] += (lvl_value/2);
		bonus_pilote[2] += (lvl_value/2);
		bonus_cond[14] += (lvl_value);
		break;
	case "vitesse-vitesse":
		bonus_pilote[3] += (lvl_value);
		bonus_cond[15] += (lvl_value);
		break;
	default :
	}
	nb_bonus++;
}


var k=2;
if ((location.search.split("=")[1] == "voiture&id") || 
(location.search.split("=")[1] == "voiture;id")) { k = 1 ;}
for (var i = 0; i < 4; i++) document.getElementsByTagName("strong")[i + k].innerHTML +=
		": " + document.getElementsByClassName("statBar")[i].title;

var titre_stat = document.createElement("h2");
titre_stat.innerHTML = 'Analyse Détaillée';
var content_stat = document.createElement("div");
content_stat.appendChild(titre_stat);

var i = 0;
var j = 0;

var chaine_tmp;
var name_bonus_ord2 = ['Accélération','Freinage','Virage','Vitesse'];
var sum_bonus_cond = somme_bonus_cond();

chaine_tmp= '\n\n</dl><h3>Bonus pilote (avant bridage):</h3><dl>\n'; 
i=0;
while(i<4) {	
    chaine_tmp += '<dt>'+name_bonus_ord2[i]+':</dt><dd>' + 
	parseInt((stat_car[i]/25)) + ' \+ ' + bonus_pilote[i] + '\t\= ' + 
	(parseInt((stat_car[i]/25)) + bonus_pilote[i]) + '</dd>\n';
    i++;}
chaine_tmp += '\n\n</dl><h3>Bonus conditionnels: ';	
chaine_tmp += sum_bonus_cond  + ' sur '+ 30*5 +' (soit ' + parseInt(sum_bonus_cond*100/(5*30)) + '\%)</h3>\n' ;

var chaine_tmp;
var name_bonus_ord = ['acc','fre','vir','vit'];
chaine_tmp += '<table class=\"table largeTable\"><thead>\n' +
    '<th></th>\n<th width="60">acc</th>\n<th width="60">fre</th>\n<th width="60">vir</th>\n<th width="60">vit</th>\n</thead>\n'
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

if (document.location.href.indexOf("http://www.formulawan.fr/Fenetre_Voiture.php?action=Gestion;id=")>=0)
    document.getElementById("innerContent").insertBefore(content_stat,document.getElementsByClassName('table largeTable')[0]);
 else document.getElementById("innerContent").insertBefore(content_stat,document.getElementsByTagName('h2')[1]);



//////  fonctions pratiques

// Fait la somme du contenu de bonus_cond et renvoit le résultat
// En gros, çà additionne tous les bonus conditionnels
function somme_bonus_cond() {
	var sum = 0;
	for (var i = 0; i < 16; i++) sum += bonus_cond[i];
	return sum
};

// construit la liste d'association des bonus
function construct_bonus() {
	var bonus_tmp = {
	"Absorbeur d`énergie cinétique":			"+6 au plafond de freinage par niveau",
	"Aimantation":						"+6 au plafond de freinage par niveau",
	"Aspirateur dans le radiateur":				"+6 au plafond de vitesse par niveau",
	"Auto pilote":						"+6 au plafond de vitesse par niveau",
	"Balancement optimisé":					"+6 au plafond de virage par niveau",
	"Bouclier énergétique":					"+5 points de structure par niveau",
	"Clous sur la surface":					"+6 au plafond de freinage par niveau",
	"Clous":						"+2 aux dépassements par niveau pendant un freinage",
	"Double entrée à carburant":				"+6 au plafond de vitesse par niveau",
	"Forme aplatie":					"+6 au plafond de virage par niveau",
	"Grande Vitesse":					"+6 au plafond de vitesse par niveau",
	"Huile Totul":						"+6 au plafond d`accélération par niveau",
	"Largeur accrue":					"+6 au plafond de virage par niveau",
	"Léger":						"+6 au plafond d`accélération par niveau",
	"Plaque supplémentaire":				"+5 points de structure par niveau",
	"Portance":						"+6 au plafond de vitesse par niveau",
	"Position allongée":					"+6 au plafond d`accélération par niveau",
	"Puissance des dieux":					"+6 au plafond d`accélération par niveau",
	"Qualité ZF":						"+6 au plafond d`accélération par niveau",
	"Retro-laser":						"+6 au plafond de freinage par niveau",
	"Super Structure":					"+5 points de structure par niveau",
	"V14":							"+6 au plafond de vitesse par niveau",
	"1ière boostée":					"+1 niveau en accélération au pilote par niveau",
	"2nd boostée":						"+1 niveau en accélération au pilote par niveau",
	"500 chevaux":						"+1 niveau en vitesse au pilote par niveau",
	"7ième vitesse":					"+1 niveau en vitesse au pilote par niveau",
	"Aileron large":					"+1 niveau en freinage au pilote par niveau",
	"Aileron levé":						"+1 niveau en accélération au pilote par niveau",
	"Alliage fin":						"+1 niveau en accélération au pilote par niveau",
	"Amour des bas-cotés":					"+1 niveau en virage au pilote par niveau",
	"Besoin de prudence":					"+1 niveau en freinage au pilote par niveau",
	"Blocage des roues":					"+1 niveau en virage au pilote par niveau",
	"Bougie surchauffante":					"+1 niveau en accélération au pilote par niveau",
	"Direction assistée":					"+1 niveau en virage au pilote par niveau",
	"Doubles plaquettes":					"+1 niveau en freinage au pilote par niveau",
	"Equilibre parfait":					"+1 niveau en virage au pilote par niveau",
	"Fier de l`avoir":					"+1 niveau en accélération au pilote par niveau",
	"Fou du volant":					"+1 niveau en vitesse au pilote par niveau",
	"Gomme anti chauffe":					"+1 niveau en freinage au pilote par niveau",
	"Gomme souple":						"+1 niveau en virage au pilote par niveau",
	"Nez au raz la piste":					"+1 niveau en vitesse au pilote par niveau",
	"Orgueilleux":						"+1 niveau en vitesse au pilote par niveau",
	"Petit volant":						"+1 niveau en virage au pilote par niveau",
	"Piston supplémentaire":				"+1 niveau en accélération au pilote par niveau",
	"Profil allongé":					"+1 niveau en accélération au pilote par niveau",
	"Repères sans failles":					"+1 niveau en freinage au pilote par niveau",
	"Rétrogradation courte":				"+1 niveau en freinage au pilote par niveau",
	"Robe ventouse":					"+1 niveau en virage au pilote par niveau",
	"Super Acceleration":					"+1 niveau en accélération au pilote par niveau",
	"Super Freinage":					"+1 niveau en freinage au pilote par niveau",
	"Super Virage":						"+1 niveau en virage au pilote par niveau",
	"Super Vitesse":					"+1 niveau en vitesse au pilote par niveau",
	"Toujours devant":					"+1 niveau en accélération au pilote par niveau",
	"Vilebrequin musclé":					"+1 niveau en freinage au pilote par niveau",
	"Adhérence de dieux":					"+1 en tenue de route par niveau",
	"Carbone Synthétique":					"+1 en tenue de route par niveau",
	"Scotch":						"+1 en tenue de route par niveau",
	"Super Tenue de route":					"+1 en tenue de route par niveau",
	"Aura d`absorption":					"-5% des dégats par niveau",
	"Blindage":						"-5% des dégats par niveau",
	"Envie de vivre":					"+2% anti-collision par niveau",
	"Esquive":						"+2% anti-collision par niveau",
	"Freins moteurs sensibles":				"+2% anti-collision par niveau",
	"Sensibilité accrue":					"+2% anti-collision par niveau",
	"Tôle en caoutchouc":					"+2% anti-collision par niveau",
	"2nd améliorée":					"Freinage - Vitesse",
	"3ième - 5ième":					"Acceleration - Vitesse",
	"3ième améliorée":					"Virage - Acceleration",
	"4ième puissante":					"Acceleration - Virage",
	"5ième - 2nd":						"Freinage - Freinage",
	"5ième vitesse forte en bas régime":			"Vitesse - Freinage",
	"6ième vitesse et demi":				"Vitesse - Vitesse",
	"ABS":							"Acceleration - Freinage",
	"Alliage Caoutchouc":					"Freinage - Virage",
	"Arbre à came supplémentaire":				"Freinage - Freinage",
	"Armature en 2 morceaux":				"Virage - Freinage",
	"Arrière allégé":					"Freinage - Vitesse",
	"Basse":						"Freinage - Virage",
	"Bouton de turbo":					"Vitesse - Acceleration",

	"Burn":							"Acceleration - Acceleration",
	"Canal dans l`armature":				"Virage - Vitesse",
	"Conservation de régime":				"Freinage - Vitesse",
	"Contre-braquage":					"Virage - Vitesse",
	"Correcteur de trajectoire":				"Acceleration - Virage",
	"Couple triple":					"Acceleration - Vitesse",
	"Courte":						"Virage - Virage",
	"Cylindres segmentés":					"Vitesse - Acceleration",
	"Disque à tambour":					"Freinage - Freinage",
	"Disques élastiques":					"Freinage - Vitesse",
	"Dissipation du bruit":					"Vitesse - Freinage",
	"Droite-gauche indépendants":				"Freinage - Virage",
	"Echappement quadruple":				"Vitesse - Vitesse",
	"Forme de fusée":					"Acceleration - Vitesse",
	"Forme ovale":						"Virage - Acceleration",
	"Frein rotatif":					"Virage - Freinage",
	"Gomme Additionnelle":					"Acceleration - Virage",
	"Gomme métamorphe":					"Vitesse - Virage",
	"Gomme ultra grippante":				"Freinage - Freinage",
	"Gros Cylindres":					"Acceleration - Freinage",
	"Inclinable":						"Virage - Virage",
	"Masse mouvante":					"Virage - Acceleration",
	"Négociateur de virage":				"Virage - Freinage",
	"Optimiseur de trajectoire":				"Virage - Acceleration",
	"Piston croisés":					"Virage - Vitesse",
	"Pneu bas":						"Virage - Freinage",
	"Poids vers l`avant":					"Acceleration - Virage",
	"Polie":						"Vitesse - Vitesse",
	"Proche de l`accélérateur":				"Freinage - Acceleration",
	"Rainure asymétrique":					"Acceleration - Freinage",
	"Rapports courts":					"Acceleration - Acceleration",
	"Rebond":						"Virage - Virage",
	"Reprise en force":					"Freinage - Acceleration",
	"Retour de force":					"Freinage - Virage",
	"Rétrogradation anticipante":				"Acceleration - Freinage",
	"Rétrogradation en puissance":				"Freinage - Acceleration",
	"Trace de gomme":					"Vitesse - Freinage",
	"Volant à bloqueur":					"Vitesse - Virage",
	"Volet de freinage":					"Freinage - Freinage",
	"X -> 5ième":						"Virage - Vitesse",
	"Double Turbo":						"+2 aux dépassements par niveau pendant une vitesse",
	"Turbo":						"Acceleration - Acceleration",
	"1ière - 2nd dans le rouge":				"+2 aux dépassements par niveau pendant une acceleration",
	"3ième - 1ière":					"+2 aux dépassements par niveau pendant un freinage",
	"Aileron Fuselé":					"+2 aux dépassements par niveau pendant une vitesse",
	"Allergique aux échappements":				"+1 aux dépassements par niveau",
	"Appel - contre appel":					"+1 aux dépassements par niveau",
	"Carcasse fine":					"+2 aux dépassements par niveau pendant un virage",
	"Décalage":						"+1 aux dépassements par niveau",
	"Exter-Inter-Exter":					"+2 aux dépassements par niveau pendant un virage",
	"Frein à main":						"+2 aux dépassements par niveau pendant un freinage",
	"Haut rapports raccourcis":				"+2 aux dépassements par niveau pendant une vitesse",
	"Injecteur à Nitro":					"+2 aux dépassements par niveau pendant une acceleration",
	"Nez en flèche":					"+1 aux dépassements par niveau",
	"Pneu aplati":						"+2 aux dépassements par niveau pendant un virage",
	"Soupape sur 2 étages":					"+2 aux dépassements par niveau pendant un freinage",
	"Talon-Pointe":						"+1 aux dépassements par niveau",
	"Tête Brûlée":						"+1 aux dépassements par niveau",
	"Zone rouge puissante":					"+1 aux dépassements par niveau",
	"2nd très longue":					"+2 aux contre-dépassements par niveau pendant une accélération",
	"Amour-propre":						"+1 aux contre-dépassements par niveau",
	"Appel de trajectoire":					"+2 aux contre-dépassements par niveau pendant un virage",
	"Arrière Large":					"+1 aux contre-dépassements par niveau",
	"Calculateur : spécialité accélération":		"+2 aux contre-dépassements par niveau pendant une acceleration",
	"Calculateur : spécialité frein":			"+2 aux contre-dépassements par niveau pendant un freinage",
	"Calculateur : spécialité virage":			"+2 aux contre-dépassements par niveau pendant un virage",
	"Calculateur : spécialité vitesse":			"+2 aux contre-dépassements par niveau pendant une vitesse",
	"Calculateur d`aspiration":				"+1 aux contre-dépassements par niveau",
	"Changement de côté":					"+2 aux contre-dépassements par niveau pendant une vitesse",
	"Freinage électronique":				"+2 aux contre-dépassements par niveau pendant un freinage",
	"Freins de précision":					"+1 aux contre-dépassements par niveau",
	"Perte de trajectoire":					"+1 aux contre-dépassements par niveau",
	// ajout des bases
	"Acceleration : niveau":				"Base Acceleration : niveau",
	"Structure : niveau":					"Base Structure : niveau",
	"Freinage : niveau":					"Base Freinage : niveau",
	"Vitesse : niveau":					"Base Vitesse : niveau",
	"Tenue de route : niveau":				"Base Tenue de route : niveau",
	"Virage : niveau":					"Base Virage : niveau"
};
	return bonus_tmp;
}
// construit la liste des expressions régulière à partir de la liste d'association des bonus
function construct_regex(bonus) {	
    var tmp_regex = {}, key;
    for (key in bonus) tmp_regex[key] = new RegExp(key, 'g');
    return tmp_regex;
};

// analyse le tuning de la voiture et fait la liste des bonus puis renvoit le nombre de bonus
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
