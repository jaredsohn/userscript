// ==UserScript==
// @author         Lord Dalzhim
// @name           Blood Wars Quest BOT
// @namespace      bw
// @description    Ce script prend en charge de façon automatisée les quêtes dans blood wars pour plusieurs zones et plusieurs niveaux de difficulté.
// @include        http://r*.fr.bloodwars.net/?*
// @include        http://r*.fr.bloodwars.net/index.php?*
// @include        http://r*.bloodwars.net/?*
// @include        http://r*.bloodwars.net/index.php?*
// @include        http://r*.bloodwars.interia.pl/?*
// @include        http://r*.bloodwars.interia.pl/index.php?*
// ==/UserScript==

var questCost = new Array(
	new Array(50, 150, 250), // Quêtes Faciles
	new Array(250, 500, 1000, 3000), // Quêtes Moyennes
	new Array(1000, 2000, 4000, 8000)  // Quêtes Difficiles
);

function estPolonais()
{
	return new RegExp("http\:\/\/r.\.bloodwars.interia.pl").test(location.href);
}

function estAnglais()
{
	return new RegExp("http\:\/\/r.\.bloodwars.net").test(location.href);
}

var raceName = new Array();
raceName[1]=22;
raceName[2]=23;
raceName[3]=24;
raceName[4]=25;
raceName[5]=26;

var sBotIs = 0;
var sActive = 1;
var sInactive = 2;
var sStartsQuests = 3;
var sMedium = 4;
var sHard = 5;
var sEasy = 6;
var sRemainingQuests = 7;
var sMessageList = 8;
var sUpdateRequired = 9;
var sStartBot = 10;
var sStopBot = 11;
var sConfigEasy = 12;
var sConfigMedium = 13;
var sConfigHard = 14;
var sConfigStatus = 15;
var sShowDrops = 16;
var sClearDrops = 17;
var sFirstUsage = 18;
var sVersionBw = 19;

var sChooseRace = 20;
var sDispRace = 21;

var sCapteur = 22;
var sCultiste = 23;
var sSeigneur = 24;
var sAbsorbeur = 25;
var sDamne = 26;

var sChooseYourRace = 27;

var sNbOfArk = 28;
var sCharisme = 29;
var sReputation = 30;
var sAgilite = 31;
var sForce = 32;
var sResistance = 33;
var sChance = 34;
var sPerception = 35;

var sParamStuff = 36;
var sParamStuff1 = 37;
var sParamStuff2 = 38;

var sActivStuff = 39;
var sActivStuff1 = 40;
var sIsActivStuff = 41;

var sActiveF = 42;
var sInactiveF = 43;
var sPreset = 44;

var frenchStrings = new Array(
	"Le BOT est ",
	"actif",
	"inactif",
	"Configuré pour lancer des quêtes ",
	"moyennes",
	"difficiles",
	"faciles",
	"Les quêtes restantes: ",
	"LISTE DES MESSAGES",
	"Une mise à jour du script est nécessaire pour continuer à s'en servir. Souhaitez-vous vérifier si une telle mise à jour est disponible?",
	"Démarrer le BOT",
	"Arrêter le BOT",
	"Quêtes Faciles",
	"Quêtes Moyennes",
	"Quêtes Difficiles",
	"Statut",
	"Afficher Drops",
	"Effacer Drops",
	"Félicitations, vous venez de réussir l'installation du bot bloodwars! Faites bien attention à ne pas laisser d'objets importants sur votre tablette #2 car cette tablette est utilisée par le bot pour obtenir des LOL en vendant au magasin. Cliquez Ok pour lancer le bot et Annuler pour aller protéger vos objets! Bon Jeu!",
	"v 1.3.1a",
	"Choisir la Race",
	"Voir la Race et les Arcanes Choisis",
	"Capteur d'Esprit",
	"Cultiste",
	"Seigneur des Bêtes",
	"Absorbeur",
	"Damné",
	"Choisissez votre Race :",
	"Nombre d'arcane",
	"Masque d'Adonis (Charisme)",
	"Masque de Caligula (Réputation)",
	"Voies Félines (Agilité)",
	"Frénésie Sauvage (Force)",
	"Peau de Bête (Rsistance)",
	"Pouvoir du Sang (Chance)",
	"Le Chasseur de la Nuit (Perception)",
	"Parametrage du Stuff",
	"Choisir le stuff à replacer après les quêtes.\r\nEnsemble prédéfinit entre 1 et 10.",
	"Il y a t'il des objets perso à remettre en AC ?\r\nLes éléments doivent se retrouver en étagère #9.\r\n1)Oui\r\n0)Non",
	"Activer Stuff",
	"Activer la fonction de remise du stuff en AC après les quêtes. Et de remettre un stuff prédéfinit ?\r\n1)Oui\r\n0)Non",
	"La fonction Stuff est ",
	"active",
	"inactive",
	"Preset N°"
);

var englishStrings = new Array(
	"The BOT is ",
	"active",
	"inactive",
	"Configure to performs ",
	"medium quests",
	"hard quests",
	"easy quests",
	"Quests remaining: ",
	"MESSAGES LIST",
	"An update of this script is necessary to continue using it. Do you wish to look if an update is currently available?",
	"Start BOT",
	"Stop BOT",
	"Easy Quests",
	"Medium Quests",
	"Hard Quests",
	"Status",
	"Show Drops",
	"Clear Drops",
	"Congratulations, you have successfully installed the bloodwars bot! Be careful never to have any important objects on your shelf #2 as it is used by the bot to generate LOL for quests by selling it's content to the shop. Click Ok to start the bot or Cancel to go protect your objects! Enjoy!",
	"v 1.3.1a",
	"Choose the Race",
	"View Race and Arcana",
	"Thoughtcatcher",
	"Cultist",
	"Beastmaster",
	"Absorber",
	"Cursed one",
	"Choose your Race :",
	"Number of arcana",
	"Mask of Adonis (Charisma)",
	"Mask of Caligula (Reputation)",
	"Cat's Paths (Agility)",
	"Bloodfrenzy (Strength)",
	"Beast's Hide (Toughness)",
	"Power of blood (Chance)",
	"Night hunter (Perception)",
	"Stuff options",
	"Choose the stuff to replace after quest finished .\r\nPredefined set between 1 and 10.",
	"There are any personal items to replace in AC ?\r\nThe elements should be placed in shelf #9.\r\n1)Yes\r\n0)No",
	"Enable Stuff",
	"Activate the delivery of AC stuff after the quest. And provide a predefined stuff ?\r\n1) Yes\r\n0) No",
	"Stuff fonction is ",
	"active",
	"inactive",
	"Preset N°"
);

var polishStrings = new Array(
	"Bot jest",
	"aktywny",
	"nieaktywny",
	"i wykonuje",
	"srednie zadania",
	"trudne zadania",
	"latwe zadania",
	"Pozostalo questow",
	"LISTA WIADOMOSCI",
	"Niezbedny jest update do dalszego korzystania z niego ! Czy chcesz zobaczyc czy jest dostepny na stronie ?",
	"start bot",
	"stop bot",
	"latwe zadania",
	"srednie zadania",
	"trudne zadania",
	"status",
	"pokaz",
	"wyczysc",
	"Congratulations, you have successfully installed the bloodwars bot! Be careful never to have any important objects on your shelf #2 as it is used by the bot to generate LOL for quests by selling it's content to the shop. Click Ok to start the bot or Cancel to go protect your objects! Enjoy!",
	"v 1.3.1a",
	"Choose the Race",
	"View Race and Arcana",
	"Thoughtcatcher",
	"Cultist",
	"Beastmaster",
	"Absorber",
	"Cursed one",
	"Choose your Race :",
	"Number of arcana",
	"Mask of Adonis (Charisma)",
	"Mask of Caligula (Reputation)",
	"Cat's Paths (Agility)",
	"Bloodfrenzy (Strength)",
	"Beast's Hide (Toughness)",
	"Power of blood (Chance)",
	"Night hunter (Perception)",
	"Stuff options",
	"Choose the stuff to replace after quest finished .\r\nPredefined set between 1 and 10.",
	"There are any personal items to replace in AC ?\r\nThe elements should be placed in shelf #9.\r\n1)Yes\r\n0)No",
	"Enable Stuff",
	"Activate the delivery of AC stuff after the quest. And provide a predefined stuff ?\r\n1) Yes\r\n0) No",
	"Stuff fonction is ",
	"aktywny",
	"nieaktywny",
	"Preset N°"
);

function getChildAttr(element, tagName, attributeNames, attributeValues){
	if (element == null || attributeNames.length != attributeValues.length) {
		return null;
	}
	//alert("Looking for " + tagName + " in " + element.childNodes.length + " elements.");
	for (var i = 0; i < element.childNodes.length; ++i) {
		if (tagName == null || element.childNodes[i].nodeName == tagName) {
			//alert("found " + tagName);
			var j;
			for (j = 0; j < attributeNames.length; ++j) {
				//alert(attributeNames[j] + " = " + attributeValues[j] + " = " + element.childNodes[i].getAttribute(attributeNames[j]));
				if (element.childNodes[i].getAttribute(attributeNames[j]) != attributeValues[j]) {
					break;
				}
			}
			if (j == attributeNames.length) {
				return element.childNodes[i];
			}
		}
	}
	return null;
}

function getChild(element, tagName){
	return getChildAttr(element, tagName, Array(), Array());
}

var strings;
if (estPolonais()) {
	strings = polishStrings;
} else if (estAnglais()) {
	strings = englishStrings;
} else {
	strings = frenchStrings;
}

function startBOT(){
	GM_setValue(location.hostname + "NbQuetesRestantes",1);
	GM_setValue(location.hostname + "isBotRunning", "true");
	runBot();
}

function stopBOT(){
	GM_setValue(location.hostname + "isBotRunning", "false");
}

function easyQuests(){
	GM_setValue(location.hostname + "questIndex", "0");
	GM_setValue(location.hostname + "questDiff", "questDiff_0");
}

function mediumQuests(){
	GM_setValue(location.hostname + "questIndex", "1");
	GM_setValue(location.hostname + "questDiff", "questDiff_1");
}

function hardQuests(){
	GM_setValue(location.hostname + "questIndex", "2");
	GM_setValue(location.hostname + "questDiff", "questDiff_2");
}

function premiereUtilisation(){
	var pasPremier = GM_getValue(location.hostname + "firstUsage") == "true";
	GM_setValue(location.hostname + "firstUsage", "true");
	return !pasPremier;
}

function isBotRunning(){
	return GM_getValue(location.hostname + "isBotRunning", "false") == "true";
}

function getQuestIndex(){
	return GM_getValue(location.hostname + "questIndex", "1");
}

function getQuestDiff(){
	return GM_getValue(location.hostname + "questDiff", "questDiff_0");
}

function showBotStatus(){
	alert(
		strings[sBotIs] + (isBotRunning() ? strings[sActive] : strings[sInactive]) + ".\r\n" +
		strings[sStartsQuests] + (getQuestIndex() == "1" ? strings[sMedium] : (getQuestIndex() == "2" ? strings[sHard] : strings[sEasy])) + ".\r\n" +
		strings[sIsActivStuff] + (GM_getValue(location.hostname + "destuffActif") == "true" ? strings[sActiveF] : strings[sInactiveF]) + (GM_getValue(location.hostname + "ens")!=0 ? ' (' + strings[sPreset] + GM_getValue(location.hostname + "ens") + ')' : '') + ".\r\n" +
		affRace()
	);
}

function getDrops(){
	return GM_getValue(location.hostname + "drops", "");
}

function showDrops(){
	document.getElementById("content-mid").innerHTML = GM_getValue(location.hostname + "drops_rapports", "");
}

function clearDrops(){
	GM_setValue(location.hostname + "drops_rapports", "");
}

function setChangementPageAutomatique(){
	GM_setValue(location.hostname + "autoNavigate", "true");
}

function setChangementPageAutomatiqueEffectue(){
	GM_setValue(location.hostname + "autoNavigate", "false");
}

function estChangementPageAutomatique(){
	return GM_getValue(location.hostname + "autoNavigate", "false") == "true";
}


function allerPageQuetes(){
	if(evitePause()){
		setChangementPageAutomatique();
		window.location.href = '/?a=quest';
	}
	else{
		setTimeout(allerPageQuetes,Math.ceil(1500*Math.random() + 10000));
	}
}

function allerPageArmurerie(){
	if(evitePause()){
		setChangementPageAutomatique();
		window.location.href = '/?a=equip';
	}
	else{
		setTimeout(allerPageArmurerie,Math.ceil(1500*Math.random() + 10000));
	}
	
}


function launchQuestForReal(){
		if(evitePause()){
			var tmp =GM_getValue(location.hostname + "race");
			if(GM_getValue(location.hostname + "verifCout")==1){
					verifCout(tmp);
					GM_setValue(location.hostname + "verifCout",0);
			}
			if(tmp==1){
			document.getElementById("ark_1").value = parseInt(GM_getValue(location.hostname + "ark_1"));
			document.getElementById("ark_2").value = parseInt(GM_getValue(location.hostname + "ark_2"));
			}
			else if(tmp==2){
					document.getElementById("ark_6").value = parseInt(GM_getValue(location.hostname + "ark_1"));
			}
			else if(tmp==3){
				document.getElementById("ark_3").value = parseInt(GM_getValue(location.hostname + "ark_1"));
				document.getElementById("ark_4").value = parseInt(GM_getValue(location.hostname + "ark_2"));
			}
			else if(tmp==4){
				document.getElementById("ark_12").value = parseInt(GM_getValue(location.hostname + "ark_1"));
			}
			else if(tmp==5){
				document.getElementById("ark_13").value = parseInt(GM_getValue(location.hostname + "ark_1"));
			}
			document.getElementById("startQuest").click();
		}
		else{
			setTimeout(launchQuestForReal,Math.ceil(1500*Math.random() + 10000));
		}
}

function getArgent() {
	var divMain = getChildAttr(document.body, "DIV", Array("class"), Array("main"));
	var subDiv = getChild(divMain, "DIV");
	var divTop = getChildAttr(subDiv, "DIV", Array("class"), Array("top"));
	var divCash = getChildAttr(divTop, "DIV", Array("class"), Array("topstats stats-cash"));
	var table = getChild(divCash, "TABLE");
	var tbody = getChild(table, "TBODY");
	var tr = getChild(tbody, "TR");
	var td = getChildAttr(tr, "TD", Array("class"), Array("panel-cell"));
	var str = td.childNodes[4].nodeValue;
	var numbers = str.match(/(\d{1,3})/g);
	var strFormattee = "";
	for(var i = 0; i < numbers.length; ++i) {
		strFormattee = strFormattee.concat(numbers[i]);
	}
	return parseInt(strFormattee);
}

function getZone() {
	var divMain = getChildAttr(document.body, "DIV", Array("class"), Array("main"));
	var subDiv = getChild(divMain, "DIV");
	var divTop = getChildAttr(subDiv, "DIV", Array("class"), Array("top"));
	var divPlayer = getChildAttr(divTop, "DIV", Array("class"), Array("stats-player"));
	var span = getChild(divPlayer, "SPAN");
	return span.childNodes[0].nodeValue.charAt(0);
}

function getQuestCost(){
	return questCost[parseInt(getQuestIndex())][(getZone() - 5) * -1];
}

function isArgentAssezPourQuete(){
	return getArgent() > getQuestCost();
}

function getSecondesRestantes(){
	var timeleft = document.getElementById("quest_timeleft");
	var str = timeleft.childNodes[0].nodeValue;
	var myArray = /(\d+) s/.exec(str);
	secondsRemaining = -1;
	if (myArray != null) {
		secondsRemaining = parseInt(myArray[1]);
	} else {
		myArray = /\d:(\d{2}):(\d{2})/.exec(str);
		if (myArray != null) {
			secondsRemaining = (parseInt(myArray[1]) * 60) + parseInt(myArray[2]);
		}
	}
	return secondsRemaining;
}

function attendreFinDeLaQuete(){
	if(evitePause()){
		var secondsRemaining = getSecondesRestantes();
		if (secondsRemaining >= 0) {
			setTimeout(attendreFinDeLaQuete, (secondsRemaining + Math.ceil(10*Math.random()) + 5) * 1000);
		} else {
			var timeleft = document.getElementById("quest_timeleft");
			if (timeleft.childNodes[0].nodeName == "A") {
				setChangementPageAutomatique();
				window.location.href = timeleft.childNodes[0].href;
			}
		}
	}else	{
		setTimeout(attendreFinDeLaQuete, (secondsRemaining + Math.ceil(10*Math.random()) + 10) * 1000);
	}
}

function getNbQuetesRestantes(){
	var content = document.getElementById("content-mid");
	var div = getChildAttr(content, "DIV", Array("style"), Array("margin-top: 10px; margin-bottom: 20px;"));
	var span = getChild(div, "SPAN");
	var b = getChild(span, "B");
	return parseInt(b.childNodes[0].nodeValue);
}

function estQuetePreteALancer(){
	return document.getElementById("startQuest") != null;
}

function estSurPageLancementQuete(){
	var resultat = location.search.search(/\?a=quest/);
	return resultat != -1;
}

function estSurPageProgressionQuete(){
	return document.getElementById("quest_timeleft") != null;
}

function estSurPageArmurerie(){
	return document.getElementById("formularz") != null;
}

function estSurPageMessages(){
	var content = document.getElementById("content-mid");
	var divTopOptions = getChildAttr(content, "DIV", Array("class"), Array("top-options"));
	var a = getChildAttr(divTopOptions, "A", Array("href"), Array("?a=msg"));
	return a != null;
}

function estSurPageRapportQuete(){
	var content = document.getElementById("content-mid");
	var divTopOptions = getChildAttr(content, "DIV", Array("class"), Array("top-options"));
	if (divTopOptions != null) {
		var divCenter = getChildAttr(content, "DIV", Array("align"), Array("center"));
		var divQuest = getChildAttr(divCenter, "DIV", Array("class"), Array("msg-content msg-quest"));
		return divQuest != null;
	}
	return false;
}

function enregistrerDrop(drop){
	var drops = getDrops();
	if(drops.length > 0) {
		drops += ", " + drop;
	} else {
		drops = drop;
	}
	GM_setValue(location.hostname + "drops", drops);
}

function enregistrerDrops(){
	var content = document.getElementById("content-mid");
	GM_setValue(location.hostname + "drops_rapports", GM_getValue(location.hostname + "drops_rapports", "") + content.innerHTML);

	var itemsDropped = content.getElementsByClassName("item-caption");
	for(var i = 0; i < itemsDropped.length; i++) {
		GM_setValue(location.hostname + "statsDrops", GM_getValue(location.hostname + "statsDrops", "") + itemsDropped[i].id + "^" + itemsDropped.innerHTML + '\n');
	}
}


function supprimerMessageRapportQuete(){
	if(evitePause()){
	var content = document.getElementById("content-mid");
	var divTopOptions = getChildAttr(content, "DIV", Array("class"), Array("top-options"));
	if (divTopOptions != null) {
		var divCenter = getChildAttr(content, "DIV", Array("align"), Array("center"));
		var span = getChild(divCenter, "SPAN");
		var deleteMsg = span.childNodes[3];
		if (deleteMsg != null) {
			setChangementPageAutomatique();
			window.location.href = deleteMsg.href;
			return;
		}
	}
	window.location.href = '/?a=quest';
	}
	else{
		setTimeout(supprimerMessageRapportQuete,Math.ceil(1500*Math.random() + 10000));
	}
}

function supprimerPremierObjet(){
	if(evitePause()){
		var tablette = document.getElementById('hc_c1');
		var div = getChild(tablette, "DIV");
		var table = getChild(div, "TABLE");
		var tbody = getChild(table, "TBODY");
		var tr = getChild(tbody, "TR");
		var td = getChild(tr, "TD");
		var itemDiv = getChild(td, "DIV");
		if (itemDiv != null) {
			setChangementPageAutomatique();
			document.location = ('http://' + location.hostname + '/?a=equip&sell=' + itemDiv.id.substr(5));	
		}
	}else	{
		setTimeout(supprimerPremierObjet,Math.ceil(1500*Math.random() + 10000));
	}
}


function runBot(){
	var divMain = getChildAttr(document.body, "DIV", Array("class"), Array("main"));
	var subDiv = getChild(divMain, "DIV");
	var divVersion = getChildAttr(subDiv, "DIV", Array("class"), Array("version"));
	var versionNode = getChild(divVersion, "A");
	if ((versionNode.childNodes[1].nodeName == "B" && versionNode.childNodes[1].childNodes[0].nodeValue != strings[sVersionBw]) || (versionNode.childNodes.length >= 3 && versionNode.childNodes[2].nodeName == "B" && versionNode.childNodes[2].childNodes[0].nodeValue != strings[sVersionBw])) {
		var answer = confirm(strings[sUpdateRequired]);
		if (answer) {
			window.location.href = "http://userscripts.org/scripts/show/56853";
		}
		return;
	}
	if (premiereUtilisation()) {
		var answer = confirm(strings[sFirstUsage]);
		if (!answer) {
			stopBOT();
			return;
		}
	}
	var changementPageAutomatique = estChangementPageAutomatique();
	setChangementPageAutomatiqueEffectue();


	if (estSurPageLancementQuete()) {
		// Si on est sur la page de lancement de quête
		saveNbQuetes();
		if (estSurPageProgressionQuete()) {
			// Si on est sur la page de progression d'une quête
			attendreFinDeLaQuete();
		} else if (getNbQuetesRestantes() > 0){
			if (!isArgentAssezPourQuete()){
				setTimeout(allerPageArmurerie, Math.ceil((20 * Math.random() + 5) * 1000));
			} else if (estQuetePreteALancer()) {
// 				var targetQuest = document.getElementById(getQuestDiff());
// 				targetQuest.click();
				window.location.href="javascript: void(selectQuest("+getQuestIndex()+"))";
				setTimeout(launchQuestForReal, Math.ceil(1500*Math.random() + 1000));
			} else{
				stopBOT();
			}
		} else {
			if(destuffActif()){
				setTimeout(mettreStuffDef, Math.ceil(1500*Math.random() + 1000));
			}
			else{
				stopBOT();
			}
		}
	} else if (changementPageAutomatique) {
		if (estSurPageArmurerie()) {
			if (isArgentAssezPourQuete()) {
				setTimeout(allerPageQuetes, Math.ceil(1500*Math.random() + 1000));
			} else {
				// Si on est sur la page de l'armurerie
				var tablette = document.getElementById('hc_c1');
				if (tablette != null) {
					setTimeout(supprimerPremierObjet, Math.ceil(2500 * Math.random() + 1000));
				} else {
					GM_setValue(location.hostname + "NbQuetesRestantes",0);
					setTimeout(mettreStuffDef, Math.ceil(1500*Math.random() + 1000));
				}
			}
		} else if (estSurPageRapportQuete()) {
			// Si on est dans le message de résultat d'une quête
			enregistrerDrops();
			setTimeout(supprimerMessageRapportQuete, Math.ceil(2500*Math.random() + 1000));
		} else if (estSurPageMessages()) {
			// Si on est sur la page des messages
			setTimeout(allerPageQuetes, Math.ceil(1500*Math.random() + 1000));
		}
	}
	else{
		if (estSurPageArmurerie()) {
			if(destuffActif()&&pluDeQuete()){
				rendStuffClan();
			}
		}
	}
}

/////////////////////////
// ViP Team Functions //
///////////////////////
function chooseRace(){
	var racetmp = prompt(strings[sChooseYourRace] + ' \r\n1=>'+strings[sCapteur]+'\r\n2=>'+strings[sCultiste]+'\r\n3=>'+strings[sSeigneur]+'\r\n4=>'+strings[sAbsorbeur]+'\r\n5=>'+strings[sDamne]+'', '');
	GM_setValue(location.hostname + "race", racetmp);

	if(racetmp == 1){
		var CHARISME = prompt(strings[sNbOfArk] + ' ' + strings[sCharisme], 0);
		var REPUTATION = prompt(strings[sNbOfArk] + ' ' + strings[sReputation], 0);
		GM_setValue(location.hostname + "ark_1", CHARISME);
		GM_setValue(location.hostname + "ark_2", REPUTATION);

		GM_setValue(location.hostname + "ark1", sCharisme);
		GM_setValue(location.hostname + "ark2", sReputation);
	}
	if(racetmp == 2){
		var AGILITE = prompt(strings[sNbOfArk] + ' ' + strings[sAgilite], 0);
		GM_setValue(location.hostname + "ark_1", AGILITE);
		GM_setValue(location.hostname + "ark_2", 0);

		GM_setValue(location.hostname + "ark1", sAgilite);
		GM_setValue(location.hostname + "ark2", 0);
	}
	if(racetmp == 3){
		var FORCE = prompt(strings[sNbOfArk] + ' ' + strings[sForce], 0);
		var RESISTANCE = prompt(strings[sNbOfArk] + ' ' + strings[sResistance], 0);
		GM_setValue(location.hostname + "ark_1", FORCE);
		GM_setValue(location.hostname + "ark_2", RESISTANCE);

		GM_setValue(location.hostname + "ark1", sForce);
		GM_setValue(location.hostname + "ark2", sResistance);
	}
	if(racetmp == 4){
		var CHANCE = prompt(strings[sNbOfArk] + ' ' + strings[sChance], 0);
		GM_setValue(location.hostname + "ark_1", CHANCE);
		GM_setValue(location.hostname + "ark_2", 0);

		GM_setValue(location.hostname + "ark1", sChance);
		GM_setValue(location.hostname + "ark2", 0);
	}
	if(racetmp == 5){
		var PERCEPTION = prompt(strings[sNbOfArk] + ' ' + strings[sPerception], 0);
		GM_setValue(location.hostname + "ark_1", PERCEPTION);
		GM_setValue(location.hostname + "ark_2", 0);

		GM_setValue(location.hostname + "ark1", sPerception);
		GM_setValue(location.hostname + "ark2", 0);
	}
	if(racetmp<=5&&racetmp>0){
		GM_setValue(location.hostname + "verifCout",1);
		if(estSurPageLancementQuete()){
			location.reload();
		}
	}
}



function estCourtePause(){
	return  document.getElementsByClassName("komunikat").length!=0;
}


function activeDestuff(){
	GM_setValue(location.hostname + "destuffActif", "true");
}

function desactiveDestuff(){
	GM_setValue(location.hostname + "destuffActif", "false");
}

function destuffActif(){
	return GM_getValue(location.hostname + "destuffActif", "false") == "true";
}

//mettre stuff defense
function mettreStuffDef(){
	if(evitePause()){
		var test=GM_getValue(location.hostname + "ens");
		document.location = ('http://' + location.hostname + '?a=equip&eqset='+test);
	}
	else{
		setTimeout(mettreStuffDef,Math.ceil(1500*Math.random() + 10000));
	}
}

function aElementsAc(){
	return GM_getValue(location.hostname + "optionDestuff") ==1;
}

//rend le stuff emprunter au clan
function rendStuffClan(){
	var div = document.getElementById('hc_c10');
	if(div!=null){
		div.childNodes[1].click();
		div.childNodes[3].click();
	}
	if(aElementsAc()){
		setTimeout(replaceStuffPrete, Math.ceil(1500*Math.random() + 1000));
	}
	else{
		stopBOT();
	}
}

//replace le stuff  preté au clan (placé en etagere 9)
function replaceStuffPrete(){
	if(evitePause()){
		var tablette = document.getElementById('hc_c8');
		var div = getChild(tablette, "DIV");
		var table = getChild(div, "TABLE");
		var tbody = getChild(table, "TBODY");
		var tr = getChild(tbody, "TR");
		var td = getChild(tr, "TD");
		var itemDiv = getChild(td, "DIV");
	
		if (itemDiv != null) {
				tablette.childNodes[3].click();
				document.getElementsByName("armoryPutIn")[0].click();
		}
		stopBOT();
	}
	else{
		setTimeout(replaceStuffPrete,Math.ceil(1500*Math.random() + 10000));
	}
}

function paramStuff(){
	var option = -1;
	var test = 1;
	// Le joueur choisi son stuff a replacer apres ses quetes
	var test = prompt(strings[sParamStuff1],0);
	if(test>0&& test<=10){
		GM_setValue(location.hostname + "ens", test);
	}else {
		GM_setValue(location.hostname + "ens", 1);
	}

	// A t'on du stuff perso a remettre a l'AC
	option = prompt(strings[sParamStuff2],0);
	if(option!=1 && option!=0){
		option = 0;
	}
	GM_setValue(location.hostname + "optionDestuff",option);

	// on active le destuffage et on sécurise l'armurerie
	activeDestuff();
}

function saveNbQuetes(){
	GM_setValue(location.hostname + "NbQuetesRestantes",getNbQuetesRestantes());
}

function pluDeQuete(){
	return GM_getValue(location.hostname + "NbQuetesRestantes")==0;
}

function activStuff(){
	var test = prompt(strings[sActivStuff1],0);
	if (test !=1){
		desactiveDestuff();
	}else {
		activeDestuff();
	}
}

function affRace(){
	var text = "\r\n" + strings[raceName[GM_getValue(location.hostname + "race")]] + "\r\n";
	text += strings[GM_getValue(location.hostname + "ark1")] + " : " + GM_getValue(location.hostname + "ark_1") + "\r\n";
	if(GM_getValue(location.hostname + "ark2") !=0) { text += strings[GM_getValue(location.hostname + "ark2")] + " : " + GM_getValue(location.hostname + "ark_2"); }
	return text;
}


function evitePause(){
	var tempServeur=document.getElementById('servertime').innerHTML;
	//debut d'heure paire
	if(parseInt(tempServeur.substring(0,2))%2==0){ 
	      if(parseInt(tempServeur.substring(3,5))==0){
		      if(parseInt(tempServeur.substring(6,8))<15){   
			      return false;
		      }
	      }
	}
	//fin d'heure impaire
	if(parseInt(tempServeur.substring(0,2))%2==1){
	      if(parseInt(tempServeur.substring(3,5))==59){
		      if(parseInt(tempServeur.substring(6,8))>57){ 
			      return false;
		      }
	      }
	}
	return true;
}




function ptSang(){
	return	parseInt(document.getElementById('bloodd').innerHTML);
}

function coutArc(ark){
	var arcaneBorder=document.getElementsByClassName("arcane-border")[0];
	var code=arcaneBorder.innerHTML;
	var ind=code.indexOf("addArc(1, "+ark,0);
	var ind2=code.indexOf(")",ind);
	return parseInt(code.substring(ind+11+ark.length,ind2));
}



function verifCout(race){
	var arcV1;
	var arcV2;
	var cout1;
	var cout2;
	var pt;
	var i;
	var cout;
	var id1;
	var id2;
	if(race==1||race==3){
		if(race==1){
			id1="1";
			id2="2";
		}
		else{
			id1="3";
			id2="4";
		}
		
		arcV1=parseInt(GM_getValue(location.hostname + "ark_1"));
		arcV2=parseInt(GM_getValue(location.hostname + "ark_2"));
		cout1=coutArc(id1);
		cout2=coutArc(id2);
		pt=ptSang();

		if(pt-arcV1*cout1>=0){
			pt-=arcV1*cout1;
			i=arcV2;
			cout=i*cout2;	
		
			while((pt-cout)<0){
				cout-=cout2;
				i--;
			}
			GM_setValue(location.hostname + "ark_2",i);
		}
		else{
			i=arcV1;
			cout=i*cout1;
		
			while((pt-cout)<0){
				cout-=cout1;
				i--;
			}
			GM_setValue(location.hostname + "ark_1",i);
			pt-=i*cout1;
			i=arcV2;
			cout=i*cout2;	
			while((pt-cout)<0){
				cout-=cout2;
				i--;
			}
			GM_setValue(location.hostname + "ark_2",i);
		}
	}
	else{
		if(race==2){
			id1="6";
		}
		else if(race==4){
			id1="12";
		}
		else if(race==5){
			id1="13";
		}

		arcV1=parseInt(GM_getValue(location.hostname + "ark_1"));
		cout1=coutArc(id1);
		
		pt=ptSang();
		if(pt-arcV1*cout1<0){
			i=arcV1;
			cout=i*cout1;
			while((pt-cout)<0){
				cout-=cout1;
				i--;
			}
			GM_setValue(location.hostname + "ark_1",i);
		}
	}
}

GM_registerMenuCommand(strings[sStartBot], startBOT);
GM_registerMenuCommand(strings[sStopBot], stopBOT);
GM_registerMenuCommand(strings[sConfigEasy], easyQuests);
GM_registerMenuCommand(strings[sConfigMedium], mediumQuests);
GM_registerMenuCommand(strings[sConfigHard], hardQuests);
GM_registerMenuCommand(strings[sConfigStatus], showBotStatus);
GM_registerMenuCommand(strings[sShowDrops], showDrops);
GM_registerMenuCommand(strings[sClearDrops], clearDrops);
GM_registerMenuCommand(strings[sChooseRace], chooseRace);
GM_registerMenuCommand(strings[sParamStuff], paramStuff);
GM_registerMenuCommand(strings[sActivStuff], activStuff);


// MAIN //
if (isBotRunning()) {
	runBot();
}