// ==UserScript==
// @name           Terminator
// @namespace      Lame noire
// @description    Générateur de statistique de raids
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

var version = "0.4 BETA";

var raidSum;
var raidSession;

/**Ressources Constantes*/
var METAL = 0;
var CRISTAL = 1;
var DEUT = 2;

/**Options*/
var lineColor = ["#4040FF", "#408040"];
var tableColor = "black";

/**Messages Contantes*/
var ressourceNames = ["Métal", "Cristal", "Deutérium"];

var raidTitle = "Rapport de combat";
var units = "unités";
var MAJ = "Mise à jour";
var URL = "http://userscripts.org/scripts/show/80548";
var URLS = "http://userscripts.org/scripts/source/80548.user.js";
var first = true;
var RAIDSUM = "__RaidSum__";
var RAIDSESSION = "__RaidSession__";
var SESSIONDATE = "__Date__";
var upDateButton = document.createElement("span");
var buttonsText = ["Total", "Session courante", "Modification"];
var buttons = ["", "", ""];
var VIEW = {
	SUM : 0,
	SESSION : 1,
	MODIF : 2
};
var total = "Total";
var mean = "Moyenne";
var coord ="Coordonnée";
var title = "Et PAF, ca fait des chocapic !";
var sessionTitle = "Liste des raids";
var sessionTitleUp = ["&nbsp", "Pillages", "Recyclage", total];
var sessionTitleDown = ["n°", "Coordonnée", ressourceNames[METAL], ressourceNames[CRISTAL], ressourceNames[DEUT], ressourceNames[METAL], ressourceNames[CRISTAL], "&nbsp"];
var sumTitle = ["Résumé", "&nbsp", "Pillages", "Recyclages", total, "%", mean];
var formTitle = ["Coordonnée", "Pillage", "Recyclage", "Pertes", "Suppression", "Type"];
var add_remove = ["Ajouter", "Retirer", "+/-"];


var formulaireTitle = ["Ajout manuel"];
var submit = "Envoyer";
var reset = "Remettre à zéro";
var playerName;
var server = location.href.split('/')[2];
var sessionDate;
var sinds = "Depuis";
var lostText = ["Unités perdues", "Unités détruites"]

/**************************************************************
 *                                                            *
 *                          Objects                           *
 *                                                            *
 **************************************************************/

function Raid(){
	this.number = 0;
	this.ressources = [0,0,0];
	this.debrisField = [0,0];
	this.myLost = 0;
	this.hisLost = 0;
	this.coordonate = "[0:0:0]";
}
Raid.prototype.sum = function(){return this.ressources[0] + this.ressources[1] + this.ressources[2] + this.debrisField[0] + this.debrisField[1];}

/**************************************************************
 *                                                            *
 *                     Fonction principale.                   *
 *                                                            *
 **************************************************************/

function mainFunction(){
	if(!first)return;
	if(isRaidReport())
		registerRaid(readReport());
	else if(isRaidPage())
		initInterface();
	else 
		addRaidButton();
}
function getIdentifier(){
	if(document.getElementById("playerName"))
		playerName = document.getElementById("playerName").getElementsByTagName("span")[0].innerHTML;
	else
		playerName = getElementsByList("wrapper", ["div", "table", "tbody", "tr", "td"], [1,0,0,1,0]).innerHTML;
}
function isRaidReport(){
	var tmp;
	first = false;
	if(!(tmp=getElementsByList("wrapper",["div", "table", "tbody", "tr", "td"],[1,0,0,2,0]))) return false;
	if(!strContains(tmp.innerHTML, raidTitle)) return false;
	if(!(getElementsByList("wrapper",["div", "table", "tbody", "tr", "td", "span"],[1,0,0,0,0,2]))) return false;
	getIdentifier();
	if(!strContains(document.getElementById("winner").innerHTML, playerName)) return false;
	return true;
}
function registerRaid(raid){
	if(strContains(raid.coordonate.split(":")[2], "16"))
		return;
	loadInformations();
	saveRaid(RAIDSESSION + raidSession.number, raid);
	raidSession.number++;
	raidSession.ressources[METAL] += raid.ressources[METAL];
	raidSession.ressources[CRISTAL] += raid.ressources[CRISTAL];
	raidSession.ressources[DEUT] += raid.ressources[DEUT];
	raidSession.debrisField[METAL] += raid.debrisField[METAL];
	raidSession.debrisField[CRISTAL] += raid.debrisField[CRISTAL];
	raidSession.myLost += raid.myLost;
	raidSession.hisLost += raid.hisLost;
	saveInformations();
}
function removeRaid(number){
	loadInformations();
	var raid = loadRaid(RAIDSESSION + number);
	if(raid.coordonate == "[0:0:0]")
		return;
	raidSession.number--;
	raidSession.ressources[METAL] -= raid.ressources[METAL];
	raidSession.ressources[CRISTAL] -= raid.ressources[CRISTAL];
	raidSession.ressources[DEUT] -= raid.ressources[DEUT];
	raidSession.debrisField[METAL] -= raid.debrisField[METAL];
	raidSession.debrisField[CRISTAL] -= raid.debrisField[CRISTAL];
	raidSession.myLost -= raid.myLost;
	raidSession.hisLost -= raid.hisLost;
	cookies.erase(server + "_" + playerName + RAIDSESSION + number);
	var raids = new Array();
	for(var i = 0; i < raidSession.number+1; ++i){
		var tmp = loadRaid(RAIDSESSION + i);
		if(tmp.coordonate != "[0:0:0]")
			raids.push(tmp);
	}
	for(var i = 0; i < raidSession.number; i++){cookies.erase(server + "_" + playerName + RAIDSESSION + i);}
	for(var i = 0; i < raids.length; i++){saveRaid(RAIDSESSION + i, raids[i]);}
		
	saveInformations();
}
function isRaidPage(){first = false;return strContains(document.location.toString(), "&Terminator");}
function loadInformations(){
	raidSession = loadRaid(RAIDSESSION, "");
	raidSum = loadRaid(RAIDSUM, "");
	sessionDate = loadDate();
}
function saveDate(){
	var date = new Date().toLocaleString();
	getIdentifier();
	cookies.save(server + "_" + playerName + SESSIONDATE, date);
}
function loadDate(){
	getIdentifier();
	var tmp = cookies.load(server + "_" + playerName + SESSIONDATE, "");
	if(tmp == ""){
		saveDate();
		return new Date().toLocaleString();
	}
	return tmp;
}
function saveInformations(){
	saveRaid(RAIDSESSION, raidSession);
	saveRaid(RAIDSUM, raidSum);
}
function loadRaid(key){
	getIdentifier();
	var raid = new Raid();
	var tmp = cookies.load(server + "_" + playerName + key, "");
	if(tmp == "")
		return raid;
	var splits = tmp.split("|");
	raid.number = parseInt(splits[0]);
	raid.ressources[METAL] = parseInt(splits[1]);
	raid.ressources[CRISTAL] = parseInt(splits[2]);
	raid.ressources[DEUT] = parseInt(splits[3]);
	raid.debrisField[METAL] = parseInt(splits[4]);
	raid.debrisField[CRISTAL] = parseInt(splits[5]);
	raid.myLost = parseInt(splits[6]);
	raid.hisLost = parseInt(splits[7]);
	raid.coordonate = splits[8];
	return raid;
}
function saveRaid(key, raid){
	getIdentifier();
	var text = "";
	text += raid.number + "|";
	text += raid.ressources[METAL] + "|"; 
	text += raid.ressources[CRISTAL] + "|"; 
	text += raid.ressources[DEUT] + "|"; 
	text += raid.debrisField[METAL] + "|"; 
	text += raid.debrisField[CRISTAL] + "|"; 
	text += raid.myLost + "|"; 
	text += raid.hisLost + "|";
	text += raid.coordonate + "|";
	cookies.save(server + "_" + playerName + key, text);
}
function initInterface(){
	addRaidButton();
	checkUpDate();
	switchDisplay(VIEW.SESSION);
	document.getElementById("box").insertBefore(upDateButton, document.getElementById("inhalt"));
}
function initButtons(){
	var text = "<center><h2 id=RaidTitle><font color=orange>" + title + "</font><br\><br\></h2></center>"
	document.getElementById("inhalt").innerHTML = text;
	for(var i = buttons.length-1; i >= 0 ; --i){
		buttons[i] = document.createElement("input");
		buttons[i].type="submit";
		buttons[i].setAttribute("style", "width: 150px");
		buttons[i].setAttribute("id", "button" + i);
		buttons[i].value = buttonsText[i];
		insertAfter(buttons[i], document.getElementById("RaidTitle"));
		if(i!=0)
			insertAfter(makeSpaces(10), document.getElementById("RaidTitle"));
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
			text = makeRaidSumSummary(raidSum);
			break;
		case VIEW.SESSION:
			text = makeRaidSessionSummary(raidSession) 
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
		document.getElementById("submitId").addEventListener("click",function(event){submitRaid();},true);
	if(digit == VIEW.SESSION)
		document.getElementById("resetId").addEventListener("click",function(event){resetSession();},true);
}
function resetSession(){
	loadInformations();
	raidSum.number += raidSession.number;
	raidSum.ressources[METAL] += raidSession.ressources[METAL];
	raidSum.ressources[CRISTAL] += raidSession.ressources[CRISTAL];
	raidSum.ressources[DEUT] += raidSession.ressources[DEUT];
	raidSum.debrisField[METAL] += raidSession.debrisField[METAL];
	raidSum.debrisField[CRISTAL] += raidSession.debrisField[CRISTAL];
	raidSum.myLost += raidSession.myLost;
	raidSum.hisLost += raidSession.hisLost;
	saveInformations();
	getIdentifier();
	cookies.erase(server + "_" + playerName + RAIDSESSION);
	for(var i = 0; i < raidSession.number; i++){cookies.erase(server + "_" + playerName + RAIDSESSION + i);}
	saveDate();
	switchDisplay(VIEW.SESSION);		
}
function makeRaidSessionSummary(){
	var table = "<br><center>" + sinds + " " + sessionDate  + "<br><br><table bgcolor='" + tableColor + "'>";
	table += "<caption><h2>" + sessionTitle + "</h2></caption>";
	table += "<thead><tr>";
	table += "<th colspan=2>" + sessionTitleUp[0] + "</th>";
	table += "<th colspan=3>" + sessionTitleUp[1] + "</th>";
	table += "<th colspan=2>" + sessionTitleUp[2] + "</th>";
	table += "<th colspan=1>" + sessionTitleUp[3] + "</th>";
	table += "</tr><tr>";
	for(var i =0; i < sessionTitleDown.length; i++)
		table += "<th style='width:70px'>" + sessionTitleDown[i] + "</th>";
	table += "</tr></thead><tbody>";
	var tmp;
	for(var i = 0; i < raidSession.number; ++i){
		if((tmp = loadRaid(RAIDSESSION + i, "")) == "")
			continue;
		table += "<tr bgcolor='" + lineColor[i%2] + "'>";
		table += "<td align=center>" + (i+1) + "</td>";
		table += "<td align=center>" + tmp.coordonate + "</td>";
		table += "<td align=center>" + addPoints(tmp.ressources[METAL]) + "</td>";
		table += "<td align=center>" + addPoints(tmp.ressources[CRISTAL]) + "</td>";
		table += "<td align=center>" + addPoints(tmp.ressources[DEUT]) + "</td>";
		table += "<td align=center>" + addPoints(tmp.debrisField[METAL]) + "</td>";
		table += "<td align=center>" + addPoints(tmp.debrisField[CRISTAL]) + "</td>";
		table += "<td align=center>" + addPoints(tmp.sum()) + "</td>";
		table += "</tr>";
	}
	
	table += "<tr>";
	table += "<td align=center>" + total + "</td>";
	table += "<td align=center>" + "[-]" + "</td>";
	table += "<td align=center>" + addPoints(raidSession.ressources[METAL]) + "</td>";
	table += "<td align=center>" + addPoints(raidSession.ressources[CRISTAL]) + "</td>";
	table += "<td align=center>" + addPoints(raidSession.ressources[DEUT]) + "</td>";
	table += "<td align=center>" + addPoints(raidSession.debrisField[METAL]) + "</td>";
	table += "<td align=center>" + addPoints(raidSession.debrisField[CRISTAL]) + "</td>";
	table += "<td align=center>" + addPoints(raidSession.sum()) + "</td>";
	table += "</tr>";
	var sum = raidSession.sum();
	table += "<tr>";
	table += "<td align=center>" + "%" + "</td>";
	table += "<td align=center>" + "[-]" + "</td>";
	table += "<td align=center>" + Math.round(raidSession.ressources[METAL]/sum*100) + "%</td>";
	table += "<td align=center>" + Math.round(raidSession.ressources[CRISTAL]/sum*100) + "%</td>";
	table += "<td align=center>" + Math.round(raidSession.ressources[DEUT]/sum*100) + "%</td>";
	table += "<td align=center>" + Math.round(raidSession.debrisField[METAL]/sum*100) + "%</td>";
	table += "<td align=center>" + Math.round(raidSession.debrisField[CRISTAL]/sum*100) + "%</td>";
	table += "<td align=center>" + "100%" + "</td>";
	table += "</tr>";
	table += "</tbody></table>";
	table += "<br><br>" + lostText[0] + " = " + raidSession.myLost + "<br>" + lostText[1] + " = " + raidSession.hisLost;
	table += "<br><br><input style='width: 230px'  id='resetId' type=submit value='" + reset + "'>" + "</center>";
	return table;
}
function makeRaidSumSummary(sum){
	var table = "<br><br><center><table bgcolor='" + tableColor + "'>";
	table += "<caption><h2>" + sumTitle[0] + " : " + raidSum.number + " raids" + "</h2></caption>";
	table += "<thead><tr>";
	for(var i = 1; i < sumTitle.length; ++i)
		table += "<th style='width:70px'>" + sumTitle[i] + "</th>";
	table += "</tr></thead><tbody>";
	var sumsum = raidSum.sum();
	for(var i = 0; i < ressourceNames.length; ++i){
		table += "<tr bgcolor='" + lineColor[i%2] + "'>";
		table += "<td align=center>" + ressourceNames[i] + "</td>";
		table += "<td align=center>" + addPoints(raidSum.ressources[i]) + "</td>";
		table += "<td align=center>" + addPoints((raidSum.debrisField[i] ? raidSum.debrisField[i] : "0")) + "</td>";
		var sum = (raidSum.ressources[i] + (raidSum.debrisField[i] ? raidSum.debrisField[i] : 0));
		table += "<td align=center>" + addPoints(sum)+ "</td>";
		table += "<td align=center>" + Math.round(sum/sumsum*100) + "</td>";
		table += "<td align=center>" + addPoints(Math.round(sum/raidSum.number)) + "</td>";
		table += "</tr>";
	}
	table += "<tr>";
	table += "<td align=center>" + total + "</td>";
	table += "<td align=center>" + addPoints((raidSum.ressources[0] + raidSum.ressources[1] + raidSum.ressources[2])) + "</td>";
	table += "<td align=center>" + addPoints((raidSum.debrisField[0] + raidSum.debrisField[1])) + "</td>";
	table += "<td align=center>" + addPoints(sumsum) + "</td>";
	table += "<td align=center>" + "100%" + "</td>";
	table += "<td align=center>" + addPoints(Math.round(sumsum/raidSum.number)) + "</td>";
	table += "</tr>";
	table += "</tbody></table>";
	table += "<br><br>" + lostText[0] + " = " + raidSum.myLost + "<br>" + lostText[1] + " = " + raidSum.hisLost + "</center>";
	return table;	
}
function makeFormulaire(){
	var table = "<br><br><center><table bgcolor='" + tableColor + "'>";
	table += "<caption><h2>" + formulaireTitle + "</h2></caption>";
	table += "<tr><td colspan=2 align=center>" + formTitle[0] + "</td></tr>";
	table += "<tr bgcolor='" + lineColor[1] + "'><td>" + coord + "</td><td><input id='mod" + -1 + "' value='[undefined]' size=8></td></tr>";
	table += "<tr><td>&nbsp</td></tr>";
	table += "<tr><td colspan=2 align=center>" + formTitle[1] + "</td></tr>";
	table += "<tr bgcolor='" + lineColor[0] + "'><td>" + ressourceNames[METAL] + "</td><td><input id='mod" + 0 + "' value='0' size=8></td></tr>";
	table += "<tr bgcolor='" + lineColor[1] + "'><td>" + ressourceNames[CRISTAL] + "</td><td><input id='mod" + 1 + "' value='0' size=8></td></tr>";
	table += "<tr bgcolor='" + lineColor[0] + "'><td>" + ressourceNames[DEUT] + "</td><td><input id='mod" + 2 + "' value='0' size=8></td></tr>";
	table += "<tr><td>&nbsp</td></tr>";
	table += "<tr><td colspan=2 align=center>" + formTitle[2] + "</td></tr>";
	table += "<tr bgcolor='" + lineColor[1] + "'><td>" + ressourceNames[METAL] + "</td><td><input id='mod" + 3 + "' value='0' size=8></td></tr>";
	table += "<tr bgcolor='" + lineColor[0] + "'><td>" + ressourceNames[CRISTAL] + "</td><td><input id='mod" + 4 + "' value='0' size=8></td></tr>";
	table += "<tr><td>&nbsp</td></tr>";
	table += "<tr><td colspan=2 align=center>" + formTitle[3] + "</td></tr>";
	table += "<tr bgcolor='" + lineColor[1] + "'><td>" + ressourceNames[METAL] + "</td><td><input id='mod" + 5 + "' value='0' size=8></td></tr>";
	table += "<tr bgcolor='" + lineColor[0] + "'><td>" + ressourceNames[CRISTAL] + "</td><td><input id='mod" + 6 + "' value='0' size=8></td></tr>";
	table += "<tr><td>&nbsp</td></tr>";
	table += "<tr><td colspan=2 align=center>" + formTitle[4] + "</td></tr>";
	table += "<tr bgcolor='" + lineColor[1] + "'><td>" + "n°" + "</td><td><input id='" + "numberid" + "' value='0' size=8></td></tr>";
	table += "<tr><td>&nbsp</td></tr>";
	table += "<tr><td colspan=2 align=center>" + formTitle[5] + "</td></tr>";
	table += "<tr bgcolor='" + lineColor[0] + "'><td>" + add_remove[2] + "</td><td><select id='selectId'>";
	table += "<option value='" + add_remove[0] + " selected '>" + add_remove[0] + "</option>";
	table += "<option value='" + add_remove[1] + "'>" + add_remove[1] + "</option>";
	table += "</select></td></tr>"
	table += "<tr><td>&nbsp</td></tr>";
	table += "<tr><td colspan=2 align=right><input style='width: 230px'  id='submitId' type=submit value='" + submit + "'></td></tr>";
	table += "</tbody></table></center>";
	return table;
}
function submitRaid(){
	var raid = new Raid();
	raid.number = parseInt(document.getElementById("numberid").value);
	raid.coordonate = document.getElementById("mod" + -1).value;
	raid.ressources[METAL] = parseInt(document.getElementById("mod" + 0).value);
	raid.ressources[CRISTAL] = parseInt(document.getElementById("mod" + 1).value);
	raid.ressources[DEUT] = parseInt(document.getElementById("mod" + 2).value);
	raid.debrisField[METAL] = parseInt(document.getElementById("mod" + 3).value);
	raid.debrisField[CRISTAL] = parseInt(document.getElementById("mod" + 4).value);
	raid.myLost = parseInt(document.getElementById("mod" + 5).value);
	raid.hisLost = parseInt(document.getElementById("mod" + 6).value);
	
	if(document.getElementById("selectId").selectedIndex == 1){
		if(confirm("Etes vous sur de vouloir supprimer le raid n°" + raid.number + " ?")){
			removeRaid(raid.number-1);
			switchDisplay(VIEW.SESSION);
		}
		return;
	}
	registerRaid(raid);
	switchDisplay(VIEW.SESSION);
}
function addRaidButton(){
	var buttonAccess = document.getElementById("links");
	if(!buttonAccess) return;
	buttonAccess = buttonAccess.getElementsByTagName("ul")[0].getElementsByTagName("li")[7];
	var button = document.createElement("li");
	button.innerHTML = '<a target="_self" accesskey="" href="' + buttonAccess.getElementsByTagName("a")[0].href + "&Terminator" + '" class="menubutton "><span class="textlabel">Terminator</span></a>';
	buttonAccess = document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
	insertAfter(button, buttonAccess);
}
function readReport(){
	var raid = new Raid();
	getIdentifier();	
	var pos = 1
	if(strContains(document.getElementById("combatants").getElementsByTagName("div")[0].innerHTML, playerName))
		pos = 0;
	var access = getElementsByList("shortreport", ["tbody", "tr"], [0,1]);
	var lost = [0,0];
	lost[0] = parseInt(access.getElementsByClassName("value")[0].innerHTML.replace(/[^0-9]/g, ""));
	lost[1] = parseInt(access.getElementsByClassName("value")[1].innerHTML.replace(/[^0-9]/g, ""));
	raid.myLost = lost[pos];
	raid.hisLost = lost[(pos+1)%2];
	access = getElementsByList("shortreport", ["tbody", "tr", "td", "table", "tbody", "tr", "td"], [0,6,0,0,0,1,1]);
	var ressources = access.innerHTML;
	var splits = ressources.split(units);
	raid.ressources[METAL] = parseInt(splits[0].replace(/[^0-9]/g, ""));
	raid.ressources[CRISTAL] = parseInt(splits[1].replace(/[^0-9]/g, ""));
	raid.ressources[DEUT] = parseInt(splits[2].replace(/[^0-9]/g, ""));
	access = getElementsByList("shortreport", ["tbody", "tr", "td", "table", "tbody", "tr", "td"], [0,6,0,0,0,2,1]);
	var debrisField = access.innerHTML;
	splits = debrisField.split(units);
	raid.debrisField[METAL] = parseInt(splits[0].replace(/[^0-9]/g, ""));
	raid.debrisField[CRISTAL] = parseInt(splits[1].replace(/[^0-9]/g, ""));
	access = getElementsByList("battlereport", ["p", "a"], [0,0]);
	var coordonate = access.innerHTML;
	raid.coordonate = coordonate;
	return raid;
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
 *             Fonctions utilitaires pack 0.2                 *
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
 * Crée une fade box et l'affiche
 * @param message Message afficher
 * @param failed Vrai si c'est un message d'erreur, faux dans les autres cas
 * @param time Le temps pendant lequel la fade box est affichée
 */
function popUp(message, failed, time){
	unsafeWindow.tb_remove();
	if (failed)	unsafeWindow.$("#fadeBoxStyle").attr("class", "failed");
	else unsafeWindow.$("#fadeBoxStyle").attr("class", "success");
	unsafeWindow.$("#fadeBoxContent").html(message);
	unsafeWindow.$("#fadeBox").stop(false, true).show().fadeOut(time);
}

/**
 * Fonctions de gestion des cookies
 * @param Recoit un booleen qui indique si il s'agit de Firefox ou pas
 * @return Renvoit un object contenant les differentes fonctions
 */
var cookies = coockiesFunctions(navigator.userAgent.indexOf('Firefox')>-1);
var autor = "Lame_noire";
var scriptName = "Terminator";
var namespace = autor + "/" + scriptName + "/";
function coockiesFunctions(isFirefox){
	if(isFirefox){
		return {
			save : function (key, value){GM_setValue(key, value);},
			load : function (key, defaultValue){return GM_getValue(key, defaultValue);},
			erase : function (key){GM_deleteValue(key);},
			eraseAll : function(){	
				var keys = GM_listValues();
				for (var i=0, key=null; key=keys[i]; i++){
					if(strContains(key,server))
						GM_deleteValue(key);
				}
			},
			xmlhttpRequest : function(){}
		};
	}
	else {
		return {
			save : function (key, value){localStorage.setItem(namespace + key, value);},
			load : function (key, defaultValue){var res = localStorage.getItem(namespace + key); return (res ? res : defaultValue); },
			erase : function (key){removeItem(namespace + key);},
			eraseAll : function(){},
			xmlhttpRequest : function(){}
		};
	}
}

/** 
 * Test si un elem est dans l'array, il faut la méthode equals
 * @param Array Le tableau sur lequel le test est fait
 * @param elem L'element chercher
 * @return boolean
 */
function arrayContains(array, elem){return (arrayIndexOf(array, elem) != -1);}

/**
 * Renvoit la position d'un element dans un array
 * @param array Le talbeau
 * @param elem L'element rechercher
 * @return Indice de l'element ou -1 si il n'est pas présent
 */
function arrayIndexOf(array, elem){
	for(var i = 0; i < array.length; ++i)
		if(array[i].equals(elem))
			return i;
	return -1;
}

/**
 * Ajoute les points dans les nombres
 * @Copyright InfoCompte3
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

function show(elem){elem.style.display = "";}
function hide(elem){elem.style.display = "none";}

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

function makeSpaces(nbr){
	var spaces = "";
	for(var i=0; i<nbr; i++) spaces += '\u00a0';
	return document.createTextNode(spaces);
}

function makeLineBreak(){return document.createElement("br");}

function insertAfter(elem, after) {
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(elem);
	else 
		dad.insertBefore(elem, after.nextSibling);
}

function strContains(text, str){return (text.indexOf(str)!=-1);}

mainFunction();
