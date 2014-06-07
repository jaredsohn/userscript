// ==UserScript==
// @name           Conqueror
// @namespace      Lame noire
// @description    Statistique d'expédition
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

var version = "0.1.2";

var expeditionSum;
var expeditionSession;
var expeditionSumRecord;
var expeditionSessionRecord;

/**Ressources Constantes*/
var METAL = 0;
var CRISTAL = 1;
var DEUT = 2;

/**Options*/
var lineColor = ["#4040FF", "#408040"];
var tableColor = "black";

/**Type Constantes*/
var NOTHING = 0;
var LATER = 1;
var FLEET = 2;
var AM = 3;
var ALIENS = 4;
var PIRATES = 5;
var BLACKHOLE = 6;
var TRADER = 7;
var RESSOURCE = 8;
var ADVANCE = 9;

var typeNames = [
	"Rien",
	"Retard",
	"Vaisseaux",
	"Antimatière",
	"Aliens",
	"Pirates",
	"Trou noir",
	"Marchand",
	"Ressource",
	"Avance"
];

/**Flotte constante*/
var PT = 0;
var GT = 1;
var CLE = 2;
var CLO = 3;
var CROIS = 4;
var VB = 5;
var BB = 6;
var DESTRO = 7;
var TRAQUOS = 8;
var SONDE = 9;

var fleetCost = [
	[2000, 2000, 0],
	[6000, 6000, 0],
	[3000, 1000, 0],
	[6000, 4000, 0],
	[20000, 7000, 2000],
	[45000, 15000, 0],
	[50000, 25000, 15000],
	[60000, 50000, 15000],
	[30000, 40000, 15000],
	[0, 1000, 0]
];

var fleetNames = [
	"Petit transporteur",
	"Grand transporteur",
	"Chasseur léger",
	"Chasseur lourd",
	"Croiseur",
	"Vaisseau de bataille",
	"Bombardier",
	"Destructeur",
	"Traqueur",
	"Sonde d`espionnage" 
];

/**Messages Contantes*/
var ressourceNames = ["Métal", "Cristal", "Deutérium", "Antimatière"];
var expeditionMessages = [
	"Voici le dernier signe de vie de l`expédition : ZZZrrt Oh mon dieu ! krrzrzzzt Cela zrrrtrzt ressemble krgzzz à un krzzzzzzzzz.... ", BLACKHOLE,
	"Votre expédition un convoi de transporteurs abandonnés mais remplis de ressources. Elle a pû récupérer une partie de ces ressources.", RESSOURCE,
	"Un petit défaut dans les réacteurs de votre flotte l`a fait voyager à une vitesse supérieure à la vitesse normale, ce qui fait que votre flotte rentre avec un peu d`avance sur ce qui était initialement prévu. A part cela, vos chercheurs n`ont rien découvert de spécial.", ADVANCE,
	"Votre expédition a réussi à collecter de l`antimatière et à la conserver.", AM,
	"Nous avons retrouvé les restes d`une expédition précédente. Nos techniciens sont en train de vérifier si nous pouvons sauver quelques vaisseaux.", FLEET,
	"Votre expédition a découvert un champ d`astéroides duquel elle a pû extraire un certain nombre de ressources.", RESSOURCE,
	"Votre flotte d`expédition a fait une rencontre fort peu agréable avec des pirates de l`espace. ", PIRATES,
	"Quelques pirates, apparemment complètement désespérés, ont tenté d`attaquer notre flotte d`expédition.", PIRATES,
	"Une erreur de calcul de votre officier de navigation vous a fait faire un saut vers une destination complètement erronée, retardant ainsi le retour de votre flotte.", LATER,
	"Mis à part quelques petits animaux provenant d`une planète marécageuse jusque là inconnue, votre expédition ne ramène rien de spécial. ", NOTHING,
	"La flotte d`expédition a eu une rencontre peu amicale avec une espèce inconnue." , ALIENS,
	"Nous avons découvert un immense cimetière de vaisseaux. Nos techniciens ont réussi à remettre quelques vaisseaux en état.", FLEET,
	"Notre expédition a réussi une expérience unique. Les chercheurs ont réussi à gagner de l`antimatière à partir du matériel projeté par une supernova.", AM,
	"Une irrégularité momentanée dans l`hyperespace a permis à votre expédition de collecter une grande quantité d`antimatière !", AM,
	"Nous avons découvert un immense cimetière de vaisseaux. Nos techniciens ont réussi à remettre quelques vaisseaux en état.", FLEET,
	"Nous avons retrouvé les restes d`une armada. Les techniciens se sont immédiatement rendus sur les vaisseaux les mieux conservés et essaient de les remettre en état.", FLEET,
	"Votre expédition a eu un bref contact avec une espèce alien visiblement très timide. Ils vous ont annoncé qu`ils enverraient dans votre empire un représentant chargé de ressources à échanger.", TRADER,
	"Une ceinture de minerai autour d`une planète jusque là inconnue vous a procuré des tonnes de matières premiÈres. Vos soutes sont pleines à craquer !", RESSOURCE
];

var expeditionTitle = "Résultat de l`expédition";
var ERROR = "Le rapport d'expédition n'est pas réconnu, contacté Lame noire.";
var MAJ = "Mise à jour";
var URL = "http://userscripts.org/scripts/show/79045";
var URLS = "http://userscripts.org/scripts/source/79045.user.js";
var first = true;
var EXPESESSION = "__ExpeSession__";
var EXPESUM = "__ExpeSum__";
var EXPESESSIONRECORD = "__ExpeSessionRecord__";
var EXPESUMRECORD = "__ExpeSumRecord__";
var SESSIONDATE = "__Date__";
var upDateButton = document.createElement("span");
var buttonsText = ["Total", "Session courante", "Modification"];
var buttons = ["", "", ""];
var VIEW = {
	SUM : 0,
	SESSION : 1,
	MODIF : 2
};
var title = "Vers l'infini et l'au delà...";
var lineColor = ["#4040FF", "#408040"];  
var tableColor = "black"; 
var repartitionTitle = ["Répartition", "Nom", "Occurence", "%"];
var ressourceTitle = ["Ressources", "Nom", "Quantité", "%", "Record"];
var fleetTitle = ["Flottes", "Nom", "Quantité", "Ressources", "Points", "%", "Record (pts)"];
var winLostNothingText = [
	"Gain",
	"Perte",
	"Rien"
];
var total = "Total";
var formulaireTitle = ["Ajout manuel"];
var submit = "Envoyer";
var type = "Type";
var reset = "Remettre à zéro";
var add_remove = ["Ajouter", "Retirer", "+/-"];
var playerName;
var server = location.href.split('/')[2];
var sessionDate;
var sinds = "Depuis";

/**************************************************************
 *                                                            *
 *                          Objects                           *
 *                                                            *
 **************************************************************/

function Expedition(){
	this.type = 0;
	this.ressources = [0,0,0,0];
	this.fleet = new Fleet();	
}
function Fleet(){this.ship =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];}
Fleet.prototype.toPoint = function(){
	var sum = 0;
	for(var i = 0; i < this.ship.length; ++i)sum += this.ship[i]*(fleetCost[i][METAL] + fleetCost[i][CRISTAL]);
	return Math.round(sum/1000);
}
Fleet.prototype.toNumber = function(){
	var sum = 0;
	for(var i = 0; i < this.ship.length; ++i)sum += this.ship[i];
	return sum;
}
Fleet.prototype.toRessource = function(){
	var sum = [0,0,0];
	for(var i = 0; i < this.ship.length; ++i){
		sum[METAL] += this.ship[i]*fleetCost[i][METAL];
		sum[CRISTAL] += this.ship[i]*fleetCost[i][CRISTAL];
		sum[DEUT] += this.ship[i]*fleetCost[i][DEUT];
	}
	return sum;
}

/**************************************************************
 *                                                            *
 *                     Fonction principale.                   *
 *                                                            *
 **************************************************************/

function mainFunction(){
	if(!first)return;
	if(isExpeditionReport())
		registerExpedition(readReport());
	else if(isExpeditionPage())
		initInterface();
	else 
		addExpeditionButton();
}
function getIdentifier(){
	if(document.getElementById("playerName"))
		playerName = document.getElementById("playerName").getElementsByTagName("span")[0].innerHTML;
	else
		playerName = getElementsByList("wrapper", ["div", "table", "tbody", "tr", "td"], [1,0,0,1,0]).innerHTML;
}
function isExpeditionReport(){
	var tmp;
	if(!(tmp=getElementsByList("wrapper",["div", "table", "tbody", "tr", "td"],[1,0,0,2,0]))) return false;
	if(!strContains(tmp.innerHTML, expeditionTitle)) return false;
	if(!(getElementsByList("wrapper",["div", "table", "tbody", "tr", "td", "span"],[1,0,0,0,0,2]))) return false;
	first = false;
	return true;
}
function registerExpedition(expe){
	loadInformations();
	var type_ = expe.type;
	expeditionSession.type[type_]++;
	switch(type_){
		case FLEET :
			var shipNumber = expe.fleet.toNumber();
			var points = expe.fleet.toPoint();
			for(var i = 0; i < expe.fleet.ship.length; i++)
				expeditionSession.fleet.ship[i] += expe.fleet.ship[i];				
			if(expeditionSessionRecord.fleet.toPoint() < points){
				delete expeditionSessionRecord.fleet;
				expeditionSessionRecord.fleet = expe.fleet;
			}
			break;
		case RESSOURCE :
			var metal = expe.ressources[METAL];
			var cristal = expe.ressources[CRISTAL];
			var deut = expe.ressources[DEUT];
			expeditionSession.ressources[METAL] += metal;
			expeditionSession.ressources[CRISTAL] += cristal;
			expeditionSession.ressources[DEUT] += deut;
			
			if(expeditionSessionRecord.ressources[METAL] < metal)
				expeditionSessionRecord.ressources[METAL] = metal;
			if(expeditionSessionRecord.ressources[CRISTAL] < cristal)
				expeditionSessionRecord.ressources[CRISTAL] = cristal;
			if(expeditionSessionRecord.ressources[DEUT] < deut)
				expeditionSessionRecord.ressources[DEUT] = deut;
			break;
		case AM :
			var am = expe.ressources[AM];
			expeditionSession.ressources[AM] += am;
			if(expeditionSessionRecord.ressources[AM] < am)
				expeditionSessionRecord.ressources[AM] = am;
			break;
		case ADVANCE :
			break;
		default :
			break;
	}
	saveInformations();
}
function removeExpedition(expe){
	loadInformations();
	var type_ = expe.type;
	expeditionSession.type[type_]--;
	switch(type_){
		case FLEET :
			var shipNumber = expe.fleet.toNumber();
			var points = expe.fleet.toPoint();
			for(var i = 0; i < expe.fleet.ship.length; i++)
				expeditionSession.fleet.ship[i] -= expe.fleet.ship[i];				
			break;
		case RESSOURCE :
			var metal = expe.ressources[METAL];
			var cristal = expe.ressources[CRISTAL];
			var deut = expe.ressources[DEUT];
			expeditionSession.ressources[METAL] -= metal;
			expeditionSession.ressources[CRISTAL] -= cristal;
			expeditionSession.ressources[DEUT] -= deut;
			break;
		case AM :
			var am = expe.ressources[AM];
			expeditionSessionRecord.ressourcess[AM] -= am;
			break;
		case ADVANCE :
			break;
		default :
			break;
	}
	saveInformations();
}
function isExpeditionPage(){first = false;return strContains(document.location.toString(), "&Conqueror");}
function loadInformations(){
	expeditionSum = loadExpedition(EXPESUM);
	expeditionSession = loadExpedition(EXPESESSION);
	expeditionSumRecord = loadExpedition(EXPESUMRECORD);
	expeditionSessionRecord = loadExpedition(EXPESESSIONRECORD);
	sessionDate = loadDate();
}
function loadDate(){
	getIdentifier();
	var tmp = cookies.get(server + "_" + playerName + SESSIONDATE, "");
	if(tmp == ""){
		saveDate();
		return new Date().toLocaleString();
	}
	return tmp;
}
function saveDate(){
	var date = new Date().toLocaleString();
	cookies.set(server + "_" + playerName + SESSIONDATE, date);
}
function saveInformations(){
	saveExpedition(EXPESUM, expeditionSum);
	saveExpedition(EXPESESSION, expeditionSession);
	saveExpedition(EXPESUMRECORD, expeditionSumRecord);
	saveExpedition(EXPESESSIONRECORD, expeditionSessionRecord);
}
function loadExpedition(key){
	var expe = new Expedition();
	expe.type = [0,0,0,0,0,0,0,0,0,0];
	getIdentifier();
	var loadExpe = cookies.get(server + "_" + playerName + key, "");
	if(loadExpe == "")		
		return expe;
	var splits = loadExpe.split("|");
	for(var i = 0; i<typeNames.length; ++i)
		expe.type[i] = parseInt(splits[i]);
	for(var i = 0; i<ressourceNames.length; ++i)
		expe.ressources[i] = parseInt(splits[typeNames.length + i]);
	for(var i = 0; i<fleetNames.length; ++i)
		expe.fleet.ship[i] = parseInt(splits[typeNames.length + ressourceNames.length + i]);
	return expe;	
}
function saveExpedition(key, expe){
	getIdentifier();
	var text = "";
	for(var i = 0; i<typeNames.length; ++i)
		text += expe.type[i] + "|";
	for(var i = 0; i<ressourceNames.length; ++i)
		text += expe.ressources[i] + "|";
	for(var i = 0; i<fleetNames.length; ++i)
		text += expe.fleet.ship[i] + "|";
	cookies.set(server + "_" + playerName + key, text);	
}
function initInterface(){
	addExpeditionButton();
	checkUpDate();
	switchDisplay(VIEW.SESSION);
	document.getElementById("box").insertBefore(upDateButton, document.getElementById("inhalt"));
}
function initButtons(){
	var text = "<center><h2 id=conquerorTitle><font color=orange>" + title + "</font><br\><br\></h2></center>"
	document.getElementById("inhalt").innerHTML = text;
	for(var i = buttons.length-1; i >= 0 ; --i){
		buttons[i] = document.createElement("input");
		buttons[i].type="submit";
		buttons[i].setAttribute("style", "width: 150px");
		buttons[i].setAttribute("id", "button" + i);
		buttons[i].value = buttonsText[i];
		insertAfter(buttons[i], document.getElementById("conquerorTitle"));
		if(i!=0)
			insertAfter(makeSpaces(10), document.getElementById("conquerorTitle"));
	}
}
function switchDisplay(digit){
	loadInformations();
	var text = "";
	switch(digit){
		case VIEW.MODIF:
			text = makeFormulaire();
			break;
		case VIEW.SUM:
			text = toHTML(expeditionSum, expeditionSumRecord);
			break;
		case VIEW.SESSION:
			text = "<center><br>" + sinds + " " + sessionDate 
			+ toHTML(expeditionSession, expeditionSessionRecord) 
			+ "<br><br><input style='width: 230px'  id='resetId' type=submit value='" + reset + "'></center>";
			break;
		default:
			break;
	}
	initButtons();
	document.getElementById("inhalt").innerHTML += text;
	document.getElementById("button0").addEventListener("click", function(event){switchDisplay(0);},true);
	document.getElementById("button1").addEventListener("click", function(event){switchDisplay(1);},true);
	document.getElementById("button2").addEventListener("click", function(event){switchDisplay(2);},true);
	if(digit == VIEW.MODIF)
		document.getElementById("submitId").addEventListener("click",function(event){submitExpedition();},true);
	if(digit == VIEW.SESSION)
		document.getElementById("resetId").addEventListener("click",function(event){resetSession();},true);
	
}
function resetSession(){
	loadInformations();
	for(var i = 0; i < typeNames.length; ++i)
		expeditionSum.type[i] += expeditionSession.type[i];
	for(var i = 0; i < ressourceNames.length; ++i)
		expeditionSum.ressources[i] += expeditionSession.ressources[i];
	for(var i = 0; i < fleetNames.length; ++i)
		expeditionSum.fleet.ship[i] += expeditionSession.fleet.ship[i];
		
	for(var i = 0; i < ressourceNames.length; ++i){
		if(expeditionSumRecord.ressources[i] < expeditionSessionRecord.ressources[i])
			expeditionSumRecord.ressources[i] = expeditionSessionRecord.ressources[i];
	}
	if(expeditionSumRecord.fleet.toPoint() < expeditionSessionRecord.fleet.toPoint())
		expeditionSumRecord.fleet = expeditionSessionRecord.fleet;
	saveInformations();
	getIdentifier();
	cookies.erase(server + "_" + playerName + EXPESESSION);
	cookies.erase(server + "_" + playerName + EXPESESSIONRECORD);
	saveDate();
	switchDisplay(VIEW.SESSION);		
}
function toHTML(sum, record){
	return "<center>"
		+ "<br\><br\>" 
		+ makeRepartitionTable(sum)
		+ "<br\><br\>" 
		+ makeRessourceTable(sum, record) 
		+ "<br\><br\>" 
		+ makeFleetTable(sum, record) 
		+ "</center>";
}
function makeRepartitionTable(sum){
	var repartitionTalbe = "<table bgcolor='" + tableColor + "'>";
	repartitionTalbe += "<caption><h2>" + repartitionTitle[0] + "</h2></caption>";
	repartitionTalbe += "<thead>";
	for(var i = 1; i < repartitionTitle.length; ++i)	repartitionTalbe += "<th>" + repartitionTitle[i] + "</th>";
	repartitionTalbe += "</thead>";
	repartitionTalbe += "<tbody>";
	var sum_ = 0;
	for(var i = 0; i < sum.type.length; ++i){sum_ += sum.type[i];}
	for(var i = 0; i < sum.type.length; ++i){
		repartitionTalbe += "<tr bgcolor='" + lineColor[i%2] + "'>";
		repartitionTalbe += "<td align='center'>" + typeNames[i] + "</td>";
		repartitionTalbe += "<td align='center'>" +  addPoints(sum.type[i])  + "</td>";
		repartitionTalbe += "<td align='center' >" + addPoints(Math.round(sum.type[i]/sum_*100)) + "%" + "</td>";
		repartitionTalbe += "</tr>";
	}
	repartitionTalbe += "<tr><td>&nbsp;</td></tr>";
	var winLostNothing = [
		sum.type[FLEET] + sum.type[TRADER] + sum.type[RESSOURCE] + sum.type[AM],
		sum.type[PIRATES] + sum.type[ALIENS] + sum.type[BLACKHOLE],
		sum.type[NOTHING] + sum.type[LATER] + sum.type[ADVANCE]
	];
	for(var i = 0; i< winLostNothing.length; ++i){
		repartitionTalbe += "<tr>";
		repartitionTalbe += "<td align='center'>" + winLostNothingText[i] + "</td>";
		repartitionTalbe += "<td align='center'>" + addPoints((winLostNothing[i]))  + "</td>";
		repartitionTalbe += "<td align='center'>" + Math.round(winLostNothing[i]/sum_*100) + "%" + "</td>";
		repartitionTalbe += "</tr>";
	}
	repartitionTalbe += "</tbody></table>";
	return repartitionTalbe;
}
function makeRessourceTable(sum, record){
	var ressourceTable = "<table bgcolor='" + tableColor + "'>";
	ressourceTable += "<caption><h2>" + ressourceTitle[0] + "</h2></caption>";
	ressourceTable += "<thead>";
	for(var i = 1; i < ressourceTitle.length; ++i)	ressourceTable += "<th>" + ressourceTitle[i] + "</th>";
	ressourceTable += "</thead>";
	ressourceTable += "<tbody>";
	var sum_ = 0;
	for(var i = 0; i < sum.ressources.length-1; ++i){sum_ += sum.ressources[i];}
	for(var i = 0; i < sum.ressources.length-1; ++i){
		ressourceTable += "<tr bgcolor='" + lineColor[i%2] + "'>";
		ressourceTable += "<td align='center'>" + ressourceNames[i] + "</td>";
		ressourceTable += "<td align='center'>" + addPoints(Math.round(sum.ressources[i]/1000)) + "K"  + "</td>";
		ressourceTable += "<td align='center'>" + addPoints(Math.round(sum.ressources[i]/sum_*100)) + "%" + "</td>";
		ressourceTable += "<td align='center'>" + addPoints(Math.round(record.ressources[i]/1000)) + "K" + "</td>";
		ressourceTable += "</tr>";
	}
	ressourceTable += "<tr>";
	ressourceTable += "<td align='center'>" + total + "</td>";
	ressourceTable += "<td align='center'>" + addPoints(Math.round((sum.ressources[METAL] + sum.ressources[CRISTAL] + sum.ressources[DEUT])/1000)) + "K" + "</td>";
	ressourceTable += "<td align='center'>" + "100%" + "</td>";
	ressourceTable += "<td align='center'>" + addPoints(Math.round((record.ressources[METAL] + record.ressources[CRISTAL] + record.ressources[DEUT])/1000)) + "K" + "</td>";
	ressourceTable += "</tr>";
	ressourceTable += "<tr bgcolor='" + lineColor[1] + "'>";
	ressourceTable += "<td align='center'>" + ressourceNames[3] + "</td>";
	ressourceTable += "<td align='center'>" + addPoints(Math.round(sum.ressources[3])) + "</td>";
	ressourceTable += "<td align='center'>" + addPoints(Math.floor(sum.ressources[3]/2500)) + " marchand" + "</td>";
	ressourceTable += "<td align='center'>" + addPoints(Math.round(record.ressources[3])) + "</td>";
	ressourceTable += "</tr>";
	ressourceTable += "</tbody></table>";
	return ressourceTable;
}
function makeFleetTable(sum, record){
	var fleetTable = "<table bgcolor='" + tableColor + "'>";
	fleetTable += "<caption><h2>" + fleetTitle[0] + "</h2></caption>";
	fleetTable += "<thead>";
	for(var i = 1; i < fleetTitle.length; ++i)	fleetTable += "<th>" + fleetTitle[i] + "</th>";
	fleetTable += "</thead>";
	fleetTable += "<tbody>";
	var sum_ = sum.fleet.toNumber();
	for(var i = 0; i < sum.fleet.ship.length; ++i){
		fleetTable += "<tr bgcolor='" + lineColor[i%2] + "'>";
		fleetTable += "<td align='center'>" + fleetNames[i] + "</td>";
		fleetTable += "<td align='center'>" + addPoints(sum.fleet.ship[i]) + "</td>";
		fleetTable += "<td align='center'>" + addPoints(Math.round(((sum.fleet.ship[i]*fleetCost[i][METAL]) + (sum.fleet.ship[i]*fleetCost[i][CRISTAL]) + (sum.fleet.ship[i]*fleetCost[i][DEUT]))/1000)) + "K" + "</td>";
		fleetTable += "<td align='center'>" + addPoints(Math.round(((sum.fleet.ship[i]*fleetCost[i][METAL]) + (sum.fleet.ship[i]*fleetCost[i][CRISTAL]))/1000)) + "</td>";
		fleetTable += "<td align='center'>" + Math.round(sum.fleet.ship[i]/sum_*100) + "%" + "</td>";
		fleetTable += "<td align='center'>" + addPoints(record.fleet.ship[i]) + "</td>";
		fleetTable += "</tr>";
	}
	sumRessource = sum.fleet.toRessource();	
	fleetTable += "<tr>";
	fleetTable += "<td align='center'>" + total + "</td>";
	fleetTable += "<td align='center'>" + addPoints(sum_) + "</td>";
	fleetTable += "<td align='center'>" + addPoints(Math.round((sumRessource[METAL] + sumRessource[CRISTAL] + sumRessource[DEUT])/1000)) + "K" + "</td>";
	fleetTable += "<td align='center'>" + addPoints(sum.fleet.toPoint()) + "</td>";
	fleetTable += "<td align='center'>" + "100%" + "</td>";
	fleetTable += "<td align='center'>" + addPoints(record.fleet.toPoint()) + "</td>";
	fleetTable += "</tr>";
	fleetTable += "</tbody></table>";
	return fleetTable;
}
function makeFormulaire(){
	var text = "";
	text += "<center><br><br><table bgcolor='" + tableColor + "'>";
	text += "<caption><h2>" + formulaireTitle[0] + "</h2></caption>";
	text += "<tbody>";
	text += "<tr><td>&nbsp</td></tr>";
	text += "<tr><td>" + type + "</td><td><select id='selectId'>";
	for(var i = 0; i<typeNames.length; i++)
		text += "<option value='" + typeNames[i] + "'>" + typeNames[i] + "</option>";
	text += "</select></td></tr>"
	text += "<tr><td>&nbsp</td></tr>";
	for(var i = 0; i<fleetNames.length; i++){
		text += "<tr bgcolor='" + lineColor[i%2] + "'>";
		text += "<td>" + fleetNames[i] + "</td>";
		text += "<td><input id='" + fleetNames[i] + "' value='0' size=8></td>";
		text += "</tr>";
	}
	text += "<tr><td>&nbsp</td></tr>";
	for(var i = 0; i<ressourceNames.length; i++){
		text += "<tr bgcolor='" + lineColor[i%2] + "'>";
		text += "<td>" + ressourceNames[i] + "</td>";
		text += "<td><input id='" + ressourceNames[i] + "' value='0' size=8></td>";
		text += "</tr>";
	}
	text += "<tr><td>&nbsp</td></tr>";
	text += "<tr><td>" + add_remove[2] + "</td><td><select id='selectId2'>";
	text += "<option value='" + add_remove[0] + " selected '>" + add_remove[0] + "</option>";
	text += "<option value='" + add_remove[1] + "'>" + add_remove[1] + "</option>";
	text += "</select></td></tr>"
	text += "<tr><td>&nbsp</td></tr>";
	text += "<tr><td colspan=2 align=right><input style='width: 230px'  id='submitId' type=submit value='" + submit + "'></td></tr>";
	text += "</tbody>";
	text += "</table></center>";
	return text;
}
function submitExpedition(){
	var expe = new Expedition();
	expe.type = document.getElementById("selectId").selectedIndex;
	expe.ressources[METAL] = parseInt(document.getElementById(ressourceNames[METAL]).value);
	expe.ressources[CRISTAL] = parseInt(document.getElementById(ressourceNames[CRISTAL]).value);
	expe.ressources[DEUT] = parseInt(document.getElementById(ressourceNames[DEUT]).value);
	expe.ressources[AM] = parseInt(document.getElementById(ressourceNames[AM]).value);
	expe.fleet.ship[PT] = parseInt(document.getElementById(fleetNames[PT]).value);
	expe.fleet.ship[GT] = parseInt(document.getElementById(fleetNames[GT]).value);
	expe.fleet.ship[CLE] = parseInt(document.getElementById(fleetNames[CLE]).value);
	expe.fleet.ship[CLO] = parseInt(document.getElementById(fleetNames[CLO]).value);
	expe.fleet.ship[CROIS] = parseInt(document.getElementById(fleetNames[CROIS]).value);
	expe.fleet.ship[VB] = parseInt(document.getElementById(fleetNames[VB]).value);
	expe.fleet.ship[BB] = parseInt(document.getElementById(fleetNames[BB]).value);
	expe.fleet.ship[DESTRO] = parseInt(document.getElementById(fleetNames[DESTRO]).value);
	expe.fleet.ship[TRAQUOS] = parseInt(document.getElementById(fleetNames[TRAQUOS]).value);
	expe.fleet.ship[SONDE] = parseInt(document.getElementById(fleetNames[SONDE]).value);
	text = typeNames[expe.type] + "\n\n";
	for(var i = 0; i<expe.fleet.ship.length; i++)
		text += fleetNames[i] + " : " + expe.fleet.ship[i] + "\n";
	text += "\n\n";
	for(var i = 0; i<expe.ressources.length; i++)
		text += ressourceNames[i] + " : " + expe.ressources[i] + "\n";
	if(document.getElementById("selectId2").selectedIndex == 0){
		if(confirm(text + "\nEtes vous sur de vouloir rajouter cette expédition ?")){
			registerExpedition(expe);
			saveInformations();
		}
	}
	else{
		if(confirm(text + "\nEtes vous sur de vouloir retirer cette expédition ?")){
			removeExpedition(expe);
			saveInformations();
		}
	}
}
function addExpeditionButton(){
	var buttonAccess = document.getElementById("links");
	if(!buttonAccess) return;
	buttonAccess = buttonAccess.getElementsByTagName("ul")[0].getElementsByTagName("li")[7];
	var button = document.createElement("li");
	button.innerHTML = '<a target="_self" accesskey="" href="' + buttonAccess.getElementsByTagName("a")[0].href + "&Conqueror" + '" class="menubutton "><span class="textlabel">Conqueror</span></a>';
	buttonAccess = document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
	insertAfter(button, buttonAccess);
}
function readReport(){
	var text = (getElementsByList("wrapper",["div", "div"],[4,0]).innerHTML).replace(/<br>/g, "").replace(/ /g, "");
	var type_ = -1;
	for(var i = 0; i < expeditionMessages.length; i+=2){
		if(strContains(text, expeditionMessages[i].replace(/ /g, ""))){
			type_ = expeditionMessages[i+1];
			break;
		}
	}
	var expe = new Expedition();
	expe.type = type_;
	switch(type_){
		case NOTHING :
			break;
		case LATER :
			break;
		case FLEET :
			for(var i = 0; i<fleetNames.length; ++i){
				var tmp = fleetNames[i].replace(/ /g, "");
				if(strContains(text, tmp)){
					var digit = text.indexOf(fleetNames[i].replace(/ /g, "")) + fleetNames[i].length-1;
					expe.fleet.ship[i] = parseInt((text.substr(digit, 7)).replace(/[^0-9]/g, ""));
				}					
			}
			break;
		case RESSOURCE :
			for(var i = 0; i<ressourceNames.length; ++i){
				if(strContains(text, ressourceNames[i])){
					expe.ressources[i] = parseInt(text.replace(/[^0-9]/g, ""));
					return expe;
				}					
			}
			alert(ERROR);
			break;
		case ALIENS : 
			break;
		case PIRATES :
			break;
		case BLACKHOLE :
			break;
		case TRADER :
			break;
		case AM :
			expe.ressources[AM] = parseInt(text.replace(/[^0-9]/g, ""));
			break;
		case ADVANCE:
			break;
		default :
			alert(ERROR);
			break;
	}
	return expe;
}
function checkUpDate(){
	GM_xmlhttpRequest({
		method: 'GET', url: URL, onload: 
		function(answers){
			var page = answers.responseText;
			var versionOfScript = page.substring(page.indexOf('<b>Version</b> : ')+17, page.length);
			versionOfScript = versionOfScript.substring(1, versionOfScript.indexOf("]"));
			if(version != versionOfScript)
				upDateButton.innerHTML = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='" + URLS + "'><font color=orange> " + MAJ + "</font></a><br><br>";	
		}
	});
}

/**************************************************************
 *                                                            *
 *                   Pack utilitaires  0.3                    *
 *                                                            *
 **************************************************************/

/**
 * Atteint un élément à partir d'un chemin de tags.
 * @param id L'identifier de l'objet de départ
 * @param tags Liste de tags àsuivre
 * @param index Liste des index associés au tags
 * @return l'objet correspondant ou null si il n'est pas trouvé
 */
function getElementsByList(id, tags, index){
	if(tags.length != index.length)return; //donnée invalide
	var elem;
	for(var i = 0, elem = document.getElementById(id) ; elem && i < tags.length; elem = elem.getElementsByTagName(tags[i])[index[i]], ++i);
	return (elem ? elem : null);
}

/**
 * Objet permettant l'utilisation des scripts sur Firefox, Opera et Chrome
 * @param author L'auteur du script
 * @param scriptName Le nom du script
 * @return Un objet cookies initialisé pour la type de navigateur détecté
 * 
 * Fonctions :
 * - set : Modifie une valeur, param : Clé et valeur
 * - get : Récupère une valeur, param : Clé et valeur par défaut dans le cas ou la clé ne correspond a rien
 * - erase : Supprime la valeur, param : Clé de la valeur a supprimer
 * - eraseAll : Permet de supprimer plusieurs valeurs en une fois, param : string que dois contenir les clés à supprimer
 * - xmlhttpRequest : Recupère le contenu d'un page, param : l'url de la page et la fonction à appliquer
 * - popUp : crée une petite fenêtre d'alert  
 */
function Cookies (author, scriptName){
	//Namespace pour les navigateur sans GM
	 var namespace = author + "/" + scriptName + "/";
	
	//Firefox
	if(navigator.userAgent.indexOf('Firefox')>-1){
		this.set = function (key, value){GM_setValue(key, value);};
		this.get = function (key, defaultValue){return GM_getValue(key, defaultValue);};
		this.erase = function (key){GM_deleteValue(key);};
		this.eraseAll =
		function(str){	
			var keys = GM_listValues();
			for (var i=0, key=null; key=keys[i]; i++){
				if(key.indexOf(str)!=-1)
					GM_deleteValue(key);
			}
		};
		this.xmlhttpRequest = function (URL, function_) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: URL,
				onload: function_
			});
		};
		this.popup = 
		function popUp(message, failed, time){
			unsafeWindow.tb_remove();
			if (failed)	unsafeWindow.$("#fadeBoxStyle").attr("class", "failed");
			else unsafeWindow.$("#fadeBoxStyle").attr("class", "success");
			unsafeWindow.$("#fadeBoxContent").html(message);
			unsafeWindow.$("#fadeBox").stop(false, true).show().fadeOut(time);
		};	
	}
	
	//Autres navigateurs
	else{
		this.set = function (key, value){localStorage.setItem(namespace + key, value);};
		this.get = function (key, defaultValue){var res = localStorage.getItem(namespace + key); return (res ? res : defaultValue);};
		this.erase = function (key){localStorage.removeItem(namespace + key);};
		this.eraseAll = function(key){};
		this.xmlhttpRequest = function(URL, function_){alert("Not yet Implemented");};
		this.popup = function(){alert("Not yet Implemented");};
	}
}

/**
 * Objet vecteur, contient un Array.
 * Les elements d'un vector doivent impérativement avoir une fonction equals
 * 
 * Fonctions :
 * - contains : Renvoit vrai si le vecteur contient l'objet
 * - indexOf : Renvoit l'indice de l'élément dans le vecteur, -1 s'il n'est pas présent
 * - fromArray : Converti un array en vecteur
 * - toArray : Converti un vecteur en array
 * - size : Renvoit la taille du vecteur
 */
function Vector(){this.vector = new Array();}
Vector.prototype.contains = function (elem){return (this.indexOf(elem) != -1);};
Vector.prototype.indexOf = function (elem){for(var i = 0; i < vector.length; ++i)	if(vector[i].equals(elem))return i;	return -1;};
Vector.prototype.fromArray = function (array){for(var i = 0; i < array.length; ++i)this.vector.push(array[i]);};
Vector.prototype.toArray = function(){return this.vector;};
Vector.prototype.size = function(){return this.vector.length;};

/**
 * Fonction de convertion
 * @todo : permettre de changer de separateur
 */

function addPoints(nombre){
	var signe = '';
	if (nombre<0){
		nombre = Math.abs(nombre);
		signe = '-';
	}
	nombre=parseInt(nombre);
	var str = nombre.toString(), n = str.length;
	if (n <4){return signe + nombre;} 
	return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
}


/** Fonction HTML*/

function insertAfter(element, after) {
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(element);
	else 
		dad.insertBefore(element, after.nextSibling);
}
function makeSpaces(nbr){
	var spaces = "";
	for(var i=0; i<nbr; i++) spaces += '\u00a0';
	return document.createTextNode(spaces);
}

function makeLineBreak(){return document.createElement("br");}
function show(elem){elem.style.display = "";}
function hide(elem){elem.style.display = "none";}
	
/**
 * Object Element
 * 
 * Fonctions : 
 * - create : Crée un élément
 * - show : Montre l'objet
 * - hide : Cache l'objet
 * - addSpaces : Ajoute des espaces
 * - addLineBreak : Ajoute un saut de ligne
 * - clear : Efface tout le contenu de l'objet
 * - insertAfter : Insert après le paramètre
 * - insertBefore : Insert avant le paramètre
 */
function Element(type){this.element = this.create(type);}
Element.prototype.create = function (type){element = document.createElement(type);};
Element.prototype.show = function (){element.style.display = "";};
Element.prototype.hide = function (){element.style.display = "none";};
Element.prototype.addSpaces = function (number){for(var i=0; i<number; i++) element.innerHTML += '\u00a0';};
Element.prototype.addLineBreak = function (){element.innerHTML += "<br>";};
Element.prototype.clear = function () {element.innerHTML = "";};
Element.prototype.setContent = function (text) {element.innerHTML = text;};
Element.prototype.getContent = function () {return element.innerHTML;};
Element.prototype.insertAfter = function(after){insertAfter(this.element, after);};
Element.prototype.insertBefore = 
	function (before) {
		var dad = before.parentNode;
		dad.insertBefore(element, before);
	}

/**Fonction sur les strings*/
/**
 * String compare
 * 1 : a > b (ex bbb > aaa)
 * -1 : b > a
 * 0 : a==b
 */
function strcmp(str1, str2){
	var a = str1.toLowerCase();
	var b = str2.toLowerCase();
	if (a == b) return 0;
	return (a>b?1:-1);
}
function strContains(text, str){return (text.indexOf(str)!=-1);}


////////////////////////////////////////////////////////////////////////
var cookies = new Cookies("Lame noire", "Conqueror");
mainFunction();
