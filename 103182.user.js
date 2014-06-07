// ==UserScript==
// @name           formulawan_resume_car_english
// @namespace      formulawanresumecarenglish
// @description    Add a summary for a car
// @include        http://www.formulawan.com/Fenetre_Olympe.php?action=fiche_voiture*
// @include        http://www.formulawan.com/Fenetre_Statut.php?action=voiture*
// @include        http://www.formulawan.com/Fenetre_Voiture.php?action=Gestion&id=*
// @include        http://www.formulawan.com/Fenetre_Voiture.php?action=Gestion;id=*
// @version	   1.0
// @licence	   GPLv3        
// ==/UserScript==


/******* LISTE DES BONUS CONDITIONNELS /55

Acceleration - Acceleration	***		/15
Acceleration - Braking		**** 		/20
Acceleration - Cornering		****		/20
Acceleration - ​​Speed		***		/15

Braking - Acceleration		*** 		/15
Braking - Braking		*****		/25
Braking - Cornering		****		/20
Braking - ​​Speed		****		/20
	
Cornering - Acceleration		****		/20
Cornering - Braking		****		/20
Cornering - Cornering			*** 		/15
Cornering - ​​Speed		****		/20

​​Speed - Acceleration		**		/10
​​Speed - Braking		***		/15
​​Speed - Cornering		**		/10
​​Speed - ​​Speed		***		/15
*/

var bonus, regex, key, textnodes, node;

bonus = construct_bonus();
regex = construct_regex(bonus);
var bonus_number=0, bonus_name = {};
bonus_number = calcul_bonus_tuning(bonus_name,bonus);

var name_bonus_cond = ['Acc - Acc','Acc - Brk','Acc - Cor','Acc - Spd','Brk - Acc','Brk - Brk','Brk - Cor','Brk - Spd','Cor - Acc','Cor - Brk','Cor - Cor','Cor - Spd','Spd - Acc','Spd - Brk','Spd - Cor','Spd - Spd'];
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
	if(lvl_name=="Measly") lvl_value = 1;
	else if(lvl_name=="Medium") lvl_value = 2;
	else if(lvl_name=="Interesting") lvl_value = 3;
	else if(lvl_name=="Exceptional") lvl_value = 4;
	else lvl_value = 5;
	bonus_name[nb_bonus] = bonus_name[nb_bonus].toLowerCase(); 
	bonus_name[nb_bonus] = bonus_name[nb_bonus].replace(new RegExp('.6.*|.*:.*level.*|.*roadholding.*|.1 point in|per level.*| |\t|\n|\r|', 'g'),'');
	switch(bonus_name[nb_bonus]) {
	case "acceleration":
		bonus_pilote[0] += (lvl_value);
		break;
	case "braking":
		bonus_pilote[1] += (lvl_value);
		break;
	case "cornering":
		bonus_pilote[2] += (lvl_value);
		break;
	case "speed":
		bonus_pilote[3] += (lvl_value);
		break;
	case "acceleration-acceleration":
		bonus_pilote[0] += (lvl_value);
		bonus_cond[0] += (lvl_value);
		break;
	case "acceleration-braking":
		bonus_pilote[0] += (lvl_value/2);
		bonus_pilote[1] += (lvl_value/2);
		bonus_cond[1] += (lvl_value);
		break;
	case "acceleration-bend":
		bonus_pilote[0] += (lvl_value/2);
		bonus_pilote[2] += (lvl_value/2);
		bonus_cond[2] += (lvl_value);
		break;
	case "acceleration-speed":
		bonus_pilote[0] += (lvl_value/2);
		bonus_pilote[3] += (lvl_value/2);
		bonus_cond[3] += (lvl_value);
		break;
	case "braking-acceleration":
		bonus_pilote[1] += (lvl_value/2);
		bonus_pilote[0] += (lvl_value/2);
		bonus_cond[4] += (lvl_value);
		break;
	case "braking-braking":
		bonus_pilote[1] += (lvl_value);
		bonus_cond[5] += (lvl_value);
		break;
	case "braking-cornering":
		bonus_pilote[1] += (lvl_value/2);
		bonus_pilote[2] += (lvl_value/2);
		bonus_cond[6] += (lvl_value);
		break;
	case "braking-speed":
		bonus_pilote[1] += (lvl_value/2);
		bonus_pilote[3] += (lvl_value/2);
		bonus_cond[7] += (lvl_value);
		break;
	case "bend-acceleration":
		bonus_pilote[2] += (lvl_value/2);
		bonus_pilote[0] += (lvl_value/2);
		bonus_cond[8] += (lvl_value);
		break;
	case "bend-braking":
		bonus_pilote[2] += (lvl_value/2);
		bonus_pilote[1] += (lvl_value/2);
		bonus_cond[9] += (lvl_value);
		break;
	case "bend-bend":
		bonus_pilote[2] += (lvl_value);
		bonus_cond[10] += (lvl_value);
		break;
	case "bend-speed":
		bonus_pilote[2] += (lvl_value/2);
		bonus_pilote[3] += (lvl_value/2);
		bonus_cond[11] += (lvl_value);
		break;
	case "speed-acceleration":
		bonus_pilote[3] += (lvl_value/2);
		bonus_pilote[0] += (lvl_value/2);
		bonus_cond[12] += (lvl_value);
		break;
	case "speed-braking":
		bonus_pilote[3] += (lvl_value/2);
		bonus_pilote[1] += (lvl_value/2);
		bonus_cond[13] += (lvl_value);
		break;
	case "speed-bend":
		bonus_pilote[3] += (lvl_value/2);
		bonus_pilote[2] += (lvl_value/2);
		bonus_cond[14] += (lvl_value);
		break;
	case "speed-speed":
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
titre_stat.innerHTML = 'Detailed analysis';
var content_stat = document.createElement("div");
content_stat.appendChild(titre_stat);

var i = 0;
var j = 0;

var chaine_tmp;
var name_bonus_ord2 = ['Acceleration','Braking','Cornering','​​Speed'];
var sum_bonus_cond = somme_bonus_cond();

chaine_tmp= '\n\n</dl><h3>Bonus pilot (before clamping):</h3><dl>\n'; 
i=0;
while(i<4) {	
    chaine_tmp += '<dt>'+name_bonus_ord2[i]+':</dt><dd>' + 
	parseInt((stat_car[i]/25)) + ' \+ ' + bonus_pilote[i] + '\t\= ' + 
	(parseInt((stat_car[i]/25)) + bonus_pilote[i]) + '</dd>\n';
    i++;}
chaine_tmp += '\n\n</dl><h3>Conditional Bonus: ';	
chaine_tmp += sum_bonus_cond  + ' on '+ 30*5 +' (or ' + parseInt(sum_bonus_cond*100/(5*30)) + '\%)</h3>\n' ;

var chaine_tmp;
var name_bonus_ord = ['acc','brk','cor','spd'];
chaine_tmp += '<table class=\"table largeTable\"><thead>\n' +
    '<th></th>\n<th width="60">acc</th>\n<th width="60">brk</th>\n<th width="60">cor</th>\n<th width="60">spd</th>\n</thead>\n'
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

if (document.location.href.indexOf("http://www.formulawan.com/Fenetre_Voiture.php?action=Gestion;id=")>=0)
    document.getElementById("innerContent").insertBefore(content_stat,document.getElementsByClassName('table largeTable')[0]);
 else document.getElementById("innerContent").insertBefore(content_stat,document.getElementsByTagName('h2')[1]);



//////  Convenient Functions

// Summed bonus_cond content and returns the result
// Basically, it adds up all the conditional bonuses 
function somme_bonus_cond() {
	var sum = 0;
	for (var i = 0; i < 16; i++) sum += bonus_cond[i];
	return sum
};

// constructs the list of association bonuses
function construct_bonus() {
	var bonus_tmp = {
	"Astonishing Performance":				"+6 points at maximum speed per level",
	"Double Gas Tank":						"+6 points at maximum speed per level",
	"Energy Shield":						"+5 points per level",
	"Extra Large Tyre":						"+6 points at maximum cornering per level",
	"Extra Plate":							"+5 points per level",
	"Flatened Shape":						"+6 points at maximum cornering per level",
	"God power":							"+6 points at maximum acceleration per level",
	"Heater Vaccum Cleaner": 				"+6 points at maximum speed per level",
	"High Speed No Matter What Happens":	"+6 points at maximum speed per level",
	"Incredible Magnetic Field":			"+6 points at maximum braking per level",
	"Kinetic Energy Absorber":				"+6 points at maximum braking per level",
	"Light Tyre": 							"+6 points at maximum acceleration per level",
	"Optimized balance":					"+6 points at maximum cornering per level",
	"Retro-laser":							"+6 points at maximum braking per level",
	"Speedy Funky Oil":						"+6 points at maximum acceleration per level",
	"Studded Tyre":							"+6 points at maximum braking per level",
	"Subliminal Acceleration": 				"+6 points at maximum acceleration per level",
	"Super Auto Pilot":						"+6 points at maximum cornering per level",
	"Super Structure":						"+5 points per level",
	"Take Off Tendency":					"+6 points at maximum speed per level",
	"Weightlessness":						"+6 points at maximum acceleration per level",
	"500 horsepower":						"+1 point in speed per level",
	"Additional Piston":					"+1 point in acceleration per level",
	"Always Ahead":							"+1 point in acceleration per level",
	"Antiheat StepOnTheGas":				"+1 point in braking per level",
	"Body Down":							"+1 point in speed per level",
	"Caution&Warning":						"+1 point in braking per level",
	"Double Brake Shoe":					"+1 point in braking per level",
	"Extended Profile":						"+1 point in acceleration per level",
	"First Boosted":						"+1 point in acceleration per level",
	"Flexible StepOnTheGas":				"+1 point in cornering per level",
	"Full Wings":							"+1 point in braking per level",
	"Great Change Down":					"+1 point in braking per level",
	"Mad Driver":							"+1 point in speed per level",
	"Overheating Spark Plus":				"+1 point in acceleration per level",
	"Overproud":							"+1 point in speed per level",
	"Perfect Balance":						"+1 point in cornering per level",
	"Poky Wheel":							"+1 point in cornering per level",
	"Power-Steering":						"+1 point in cornering per level",
	"Powerful Crankshaft":					"+1 point in braking per level",
	"Proud Of It !":						"+1 point in acceleration per level",
	"Road Verges Lover":					"+1 point in cornering per level",
	"Second Boosted":						"+1 point in acceleration per level",
	"Seventh' Gear":						"+1 point in speed per level",
	"Shoot Off Acceleration":				"+1 point in acceleration per level",
	"Shoot Off Speed":						"+1 point in speed per level",
	"Stikky Car Body":						"+1 point in cornering per level",
	"Super Alloy":							"+1 point in acceleration per level",
	"Super Bend":							"+1 point in handling a bend per level",
	"Super Brake":							"+1 point in braking per level",
	"Tyre Blocking":						"+1 point in cornering per level",
	"Unfailing Marker":						"+1 point in braking per level",
	"Wings Spread":							"+1 point in acceleration per level",
	"Acceleration stick shift":				"Acceleration - Acceleration",
	"Air Slip":								"Speed - Speed",
	"Air Turbo":							"Speed - Acceleration",
	"Anticipate Change Down":				"Acceleration - Braking",
	"Balanced Weight":						"Acceleration - Bend",
	"Bendshape Adopting":					"Bend - Acceleration",
	"Big Engined Car":						"Acceleration - Braking",
	"Brake Speed Switch":					"Acceleration - Braking",
	"Brake Wings":							"Braking-Braking",
	"Braking Absorbtion":					"Acceleration - Braking",
	"Close To Gas Pedal":					"Braking - Acceleration",
	"CoolRocket":							"Acceleration - Speed",
	"Elastic Discs":						"Braking-Speed",
	"Excellium Motorbrake":					"Speed - Braking",
	"Extra Speed Down":						"Braking-Braking",
	"Extra Steering Lock":					"Bend - Speed",
	"Extra StepOnTheGas":					"Acceleration - Bend",
	"Extra Tyre Tracks":					"Speed - Braking",
	"Flexible Centre Of Gravity":			"Bend - Acceleration",
	"Forth ' Power":						"Acceleration - Bend",
	"Funky TurnOfTheWheel":					"Bend - Bend",
	"Gear Skip Down":						"Braking-Braking",
	"Gear Skip Up":							"Acceleration - Speed",
	"Independant Right Left":			 	"Braking-Bend",
	"Jamming StepOnTheGas":					"Braking-Braking",
	"Jointed Car Body":						"Bend - Braking",
	"Jumping Bend":							"Bend - Speed",
	"Keep Speed":							"Braking-Speed",
	"Light Weight":							"Braking-Bend",
	"Lightened Back":						"Braking-Speed",
	"Locked Wheel":							"Speed - Bend",
	"Maximum Grip":						 	"Bend - Bend",
	"Metamorphosis Tyres":					"Speed - Bend",
	"Multiservice Piston":					"Bend - Speed",
	"Optimizing Trajectory":				"Bend - Acceleration",
	"Power Brake Drum":						"Braking-Braking",
	"Powerbooster":							"Acceleration - Speed",
	"Powerfull Change Down":				"Braking - Acceleration",
	"Quadruple Nija Silencer":				"Speed - Speed",
	"Quicky Fifth' Gear":					"Bend - Speed",
	"RightInTheMiddle":						"Bend - Bend",
	"Rotary Brake":							"Bend - Braking",
	"Rubber Alloy":							"Braking-Bend",
	"Second Gear Up":						"Braking-Speed",
	"Sixth And A Half":						"Speed - Speed",
	"Speedy Brake":							"Speed - Braking",
	"Strong Acceleration":					"Braking - Acceleration",
	"TakeABend Bonus":						"Braking-Bend",
	"TakeABend like A Mad":					"Bend - Braking",
	"Third Gear Up":						"Bend - Acceleration",
	"Trajectory Correcting":				"Acceleration - Bend",
	"Turbo":								"Acceleration - Acceleration",
	"Turbo Button":							"Speed - Acceleration",
	"Tyre Marks":							"Acceleration - Acceleration",
	"TyreAtTheBottom":						"Bend - Braking",
	"Acceleration Calculator":				"+2 points per level when accelerating",
	"Anti Smoke Calculator":				"+1 point per level",
	"Bend Calculator":						"+2 points per level when handling a bend",
	"Brake Calculator":						"+2 points per level when braking",
	"Electronic Braking":					"+2 points per level when braking",
	"Extended Second Gear":					"+2 points per level when accelerating",
	"Fat Posterior":						"+1 point per level",
	"Misleading path":						"+2 points per level when handling a bend",
	"Path loss":							"+1 point per level",
	"Precision Brake":						"+1 point per level",
	"Self-Esteem":						 	"+1 point per level",
	"Side Change":							"+2 points per level in speed",
	"Speed Calculator":						"+2 points per level in speed",
	"Dodge":								"+2% per level",
	"Extra Sensitivy":					 	"+2% per level",
	"Feel Like Living":						"+2% per level",
	"Rubber Bodywork":	 					"+2% per level",
	"Sensitive Engine Braking":				"+2% per level",
	"Absorbtion Bubble":					"-5% per level",
	"Armour Plating":						"-5% per level",
	"Extra Roadholding":					"+1 point in roadholding per level",
	"Mad Grip":							 	"+1 point in roadholding per level",
	"Skotch-Tape":							"+1 point in roadholding per level",
	"Synthetic Tyres":						"+1 point in roadholding per level",
	// addition of bases
	"Acceleration : level":					"Base Acceleration : level",
	"Structure : level":					"Base Structure : level",
	"Braking : level":						"Base Braking : level",
	"​​Speed : level":						"Base ​​Speed : level",
	"Roadholding : level":					"Base Roadholding : level",
	"Cornering : level":					"Base Cornering : level"
};
	return bonus_tmp;
}
// constructs the list of regular expressions from the list of association bonuses
function construct_regex(bonus) {	
    var tmp_regex = {}, key;
    for (key in bonus) tmp_regex[key] = new RegExp(key, 'g');
    return tmp_regex;
};

// Analysis of tuning the car and the list of bonuses and then returns the number of bonus
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