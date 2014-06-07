// ==UserScript==
// @name            Gros(beta)
// @namespace       http://userscripts.org/scripts/show/94874
// @description     essai shootbox
// @author          Nexton/Lekensteyn/Sandevil/Pedro Ramirez/Zyphir Randrott/Y
// @include         http://*.the-west.*/game.php*
// @include         http://*.the-west.*/forum.php*
// @include         http://userscripts.org/scripts/source/93313.meta.js
// @version         beta
//
// @history         1.004n.d.f More accurate Fort battle calculations
// @history         1.004n.d.f New tab with preferences in the TW Pro Settings window
// @history         1.004n.d.f Default sorting option
// @history         1.004n.d.f Added average damage on weapons
// @history         1.004n.d.e Bugfix on Duel & Fort weapons suggestions
// @history         1.004n.d.d Fortbattle calculations improved (beta feature, still in progress)
// @history         1.004n.d.c Set filters buttons improved
// @history         1.004n.d.c Javascript Math.pow usable in the Custom Jobs formula
// @history         1.004n.d.b Test updater
// @history         1.004n.d.a Test updater
// @history         1.004n.d Modif compatibilité pour plusieurs updaters simultanés
// @history         1.004n.c Correction Regen Soldier Premium
// @history         1.004n.b Note for translators : language file updated
// @history         1.004n.a Corrections on Speed, Construction & Worker class xp values
// @history         1.004m The selected job is now always displayed first in the merchants pop-up list, even if he receives less bonus than other jobs.
// @history         1.004l Added temporary bug fix on telegrams for fr. worlds (until Inno fix this ^^)
// @history         1.004l Added automatic room selection in hotels (checks the best free room or the cheapest one)
// @history         1.004l Improved highliting & compatibility between Set filters, Search box & Jobs list
// @history         1.004l New features & speed improvements, thanks to the Lekensteyn script.<br><span style="font-size: 10px;">Since Lekensteyn has done a really great job on optimization and calculation speed and because of the many new features he added, I really hesitated to pursue my TW Pro version.<br>However, as some people from the French community asked me to continue and as long as I get pleasure to do it, I will keep this version updated.<br>For these reasons I decided to import the major improvements from the Lekensteyn script in this release but I also decided to no longer provide included translations for languages other than English and French. (However, in case you want to continue using my version, I added a feature that lets you easily plug an external language pack. I will do a help page soon for custom language pack creation).<br>Finally, thanks again to Lekensteyn and I really invite you to visit his work at the following address: <a href="http://twpro.lekensteyn.nl/" target="_blank">Lekensteyn page</a></span>
// @history         1.004k Added Set filters
// @history         1.004k Inventory statistics improvements
// @history         1.004k Automatic updater is now Chrome compatible
// @history         1.004j Added Christmas Sled
// @history         1.004i Merry Christmas !
// @history         1.004i <img src="http://img703.imageshack.us/img703/8439/starontreeoutside065344.jpg">
// @history         1.004h Added Italian & Romanian language
// @history         1.004g TW version checker included in the script himself (From now, TW Pro FR 1.29 & Pro+ 1.30 can be both installed at the same time on all servers, so you don't need to tamper with script permissions during transition period)
// @history         1.004f Fixed level check on belts & pants
// @history         1.004f All values are now displayed and sorted in the job list, even if you can't do the job (use "hide jobs" for filtering)
// @history         1.004f Filter "Hide jobs I can't do" runs now instantly (calculation is not rerun anymore)
// @history         1.004f Added danger values and jobrank % in the job list
// @history         1.004f New color coding for the LP box
// @history         1.004e Some code improvements
// @history         1.004e Minor layout changes
// @history         1.004e Forum BBCode bar is back
// @history         1.004e Added Hungarian language
// @history         1.004d Added all job values (xp, wages, luck, danger) // I hope I didn't make any mistake
// @history         1.004d Sets work duration to maximum by default // Lekensteyn code, thx ;)
// @history         1.004c Chrome small fix (LP display box)
// @history         1.004b Greenhorn set added
// @history         1.004b Updated design for TW 1.30
// @history         1.004a Emergency release for TW 1.30 // It looks bad but it works ;)
// @history         1.003 Ajout d'une variable de traduction oubliée
// @history         1.002 Ajout du 6ème élément du Kit spécial Fêtes
// @history         1.002 Correction de l'affichage des apostrophes dans le menu déroulant
// @history         1.001 Correction de bugs sur les stats duels dans les profils
// @history         1.001 Repositionnement des "Niveaux d'importance" pour être compatible avec les scripts "Wardrobe" et "SortInvent"
// @history         1.001 Filtre du set Grincheux activable et désactibale à souhait
// @history         1.001 Ajout du Script Updater "PhasmaExMachina" (Firefox+GM uniquement)
// @history         1.000 Ajout traduction FR
// ==/UserScript==

var twpro_version = "BETA-Confederation";

var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {

if (url.indexOf("game.php") != -1) {
  var insertBeforeElement = document.getElementById('left_top');
  var newScriptElement = document.createElement('script');
  newScriptElement.setAttribute('type', 'text/javascript');
  var myScript = "var twpro_version = '"+twpro_version+"';";
  newScriptElement.innerHTML = myScript;
  insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
}

if (localStorage.getItem("TWPro_LanguagePack") && decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) != "fr" && decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) != "http://fr"){
	try{
	var myScript = document.createElement("script");
	myScript.type = "text/javascript";
	myScript.src = decodeURIComponent(localStorage.getItem("TWPro_LanguagePack"));
	document.body.appendChild(myScript);
	}catch(e){}
}


(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){
	

window.addEvent('domready', check_TW_version);
function check_TW_version() {
var url = window.location.href;
if (url.indexOf(".the-west.") != -1 && url.indexOf("game.php") != -1) {
	if (TheWestApi.version >= 1.30){


var twpro_lang = {
	info: ['Y', 'mailto:knownas.y@gmail.com', 4343, '.w1.'],
		AUTHOR: 'Authors',
		TRANSLATOR: 'Translator',
		TWPRO_DISABLED: 'script disabled',
		SORTBYNAME: 'Order by <b>name</b>',
		SORTBYXP: 'Order by <b>experience</b>',
		SORTBYWAGES: 'Order by <b>wages</b>',
		SORTBYLUCK: 'Order by <b>luck</b>',
		SORTBYCOMB: 'Order by <b>job rank</b>',
		SORTBYDANGER: 'Order by <b>danger</b>',
		SORTBYLABORP: 'Order by <b>labor points</b>',
		FILTERJOBS: "Hide activities I cannot do",
		FILTERCLOTHING: 'Just display the best clothing available for the selected activity',
		CHOOSEJOB: 'Choose activity...',
		CALCJOB: 'Calculating values, please wait...',
		INVENTSTATS: 'Inventory statistics',
		SELLVALUE: 'Sales value',
		OBJECTS: 'Objects',
		PRODUCTS: 'Products',
		TOTAL: 'Total',
		QUANTITIES: 'Quantities',
		LABORP: 'LP',
		CONSTRUCTION: ' \u25B7 Construction',
		HPTOTAL: 'Total health points',
		STARTCALC: 'Calculate data...',
		CONVERT: 'Convert',
		MULTISEL: 'Sell multiple items...',
		SELL: 'Sell selection',
		CONFIRMSELL: 'Do you really want to sell %1 stacks of items?',
		SELLING: 'Selling...',
		SALEDONE: 'The selected items have been sold.',
		NONESELECTED: 'You have to select at least one item!',
		JOBRANKSETTINGS: 'Job ranking settings',
		SEARCHINVENTORY: 'Search inventory',
		NOSEARCHRESULT: 'Your search for %1 returned no results.%2Display all items%3',
		DISABLEBESTFORJOB: 'Disable hiding items which are inferior for a selected activity.',
		SEARCHHELP: 'Search the inventory. You can use wildcards (* for zero or more characters, ? for one character)',
		DUELSHOOTINGATT: ' \u25B7 Range dueler (attacker)',
		DUELSHOOTINGDEF: ' \u25B7 Range dueler (defender)',
		DUELVIGOR: ' \u25B7 Melee dueler',
		FORTATTACK: ' \u25B7 Fortbattle (attacker)',
		FORTDEFEND: ' \u25B7 Fortbattle (defender)',
		FORTMESSAGE: 'Message to participants',
		FORTMESSAGERCP: 'Number of recipients',
		HIDEJOBS: 'Activities & Itemsets Management',
		CONFIRM: 'Confirm',
		HIDEJOBDESC: 'Jobs can be hidden here. Mark all activities which should not be calculated automatically, and click Confirm.',
		SHOWN: 'Shown',
		HIDDEN: 'Hidden',
		SETTINGSSAVED: 'The settings for TW Pro have been applied!',
		SETTINGSSAVEDSESSION: 'The settings for TW Pro have been applied! (for this session only)',
		PERSISTSETTINGS: 'Save these settings for every session.',
		CANNOTWEAR: 'You cannot wear this set, or this set has no influence on the Activity calculations.',
		SETSETTINGS: 'Disable itemsets for faster calculations. Sets with special, unmet requirements are disabled by default.',
		CUSTOMNAME: 'Enter the desired name for an activity',
		CUSTOMCALCULATION: 'Enter a valid TW Pro calculation here.',
		CUSTOMENABLED: 'Check this box to enable this activity',
		NEW: 'New',
		SPEED: ' \u25B7 Speed',
		REGENERATION: ' \u25B7 Fastest lifepoints',
		SETSINFO: "Itemsets",
		WITHSETITEMS: 'Bonuses with %1 items',
		LABORPOINTS: 'Labor points',
		USEFULITEM: 'This number indicates the amount of items which are used in calculations',
		PERCREGENERATION: 'Regeneration',
		LUCK: 'luck',
		PRAYING: 'praying',
		NOITEMSETS: "You don\'t have any item of this Set",
		AVERAGEDAMAGE: "Average damage",
		PREFERENCES: "Preferences",
		DEFAULTSORTING: "Default sorting",
		FBHEALTHPRIORITY: "Desired health points bonus on fort battles",
		FBHEALTHPRIORITYZERO: "No bonus",
		FBHEALTHPRIORITYLOW: "Low bonus",
		FBHEALTHPRIORITYMEDIUM: "Medium bonus",
		FBHEALTHPRIORITYHIGH: "High bonus",
		FBHEALTHPRIORITYAUTO: "Automatic"
};
	var twpro_langs = {};
	twpro_langs.fr = {
		info: ["Y", "mailto:knownas.y@gmail.com", 4145, ".fr1."],
		AUTHOR: "Auteurs",
		TRANSLATOR: "Traducteur",
		TWPRO_DISABLED: "script d\xE9sactiv\xE9",
		SORTBYNAME: "Trier par <b>Nom</b>",
		SORTBYXP: "Trier par <b>Exp\xE9rience</b>",
		SORTBYWAGES: "Trier par <b>Salaire</b>",
		SORTBYLUCK: "Trier par <b>Chance</b>",
		SORTBYCOMB: "Trier par <b>Importance</b>",
		SORTBYDANGER: "Trier par <b>Danger</b>",
		SORTBYLABORP: "Trier par <b>Points de Travail</b>",
		FILTERJOBS: "Cacher les travaux que je ne peux pas faire",
		FILTERCLOTHING: "Afficher uniquement le meilleur \xE9quipement disponible pour l\'activit\xE9 s\xE9lectionn\xE9e",
		CHOOSEJOB: "Choisir une Activit\xE9...",
		CALCJOB: "Calcul en cours, veuillez patienter...",
		INVENTSTATS: "Statistiques Inventaire",
		SELLVALUE: "Valeurs de vente",
		OBJECTS: "Objets",
		PRODUCTS: "Produits",
		TOTAL: "Total",
		QUANTITIES: "Quantit\xE9s",
		LABORP: "PT",
		CONSTRUCTION: " \u25B7 Construction",
		HPTOTAL: "Total des coups r\xE9ussis",
		STARTCALC: "Lancer le calcul...",
		CONVERT: "Convertir",
		MULTISEL: "Vendre plusieurs articles...",
		SELL: "Vendre la s\xE9lection",
		CONFIRMSELL: "Souhaitez-vous vraiment vendre ces %1 types d\'articles?",
		SELLING: "Vente en cours...",
		SALEDONE: "Les articles s\xE9lectionn\xE9s ont \xE9t\xE9 vendus.",
		NONESELECTED: "Vous devez s\xE9lectionner au moins un article!",
		JOBRANKSETTINGS: "Niveaux d\'Importance",
		SEARCHINVENTORY: "Chercher dans l\'inventaire",
		NOSEARCHRESULT: "Votre recherche pour %1 n\'a pas donn\xE9 de r\xE9sultat.%2Afficher tous les articles%3",
		DISABLEBESTFORJOB: "D\xE9sactivez la fonction qui cache les articles inf\xE9rieurs pour un job s\xE9lectionn\xE9.",
		SEARCHHELP: "Recherche dans l\'inventaire. Vous pouvez utiliser des caract\xE8res joker (* pour plusieurs caract\xE8res, ? pour un seul caract\xE8re)",
		DUELSHOOTINGATT: " \u25B7 Duel / Arme \xE0 feu (attaquant)",
		DUELSHOOTINGDEF: " \u25B7 Duel / Arme \xE0 feu (d\xE9fenseur)",
		DUELVIGOR: " \u25B7 Duel / Arme de contact",
		FORTATTACK: " \u25B7 Bataille de fort (attaquant)",
		FORTDEFEND: " \u25B7 Bataille de fort (d\xE9fenseur)",
		FORTMESSAGE: 'Message aux participants',
		FORTMESSAGERCP: 'Nombre de destinataires',
		HIDEJOBS: "Gestion des Activit\xE9s & Objets de Sets.",
		CONFIRM: "Confirmer",
		HIDEJOBDESC: "Les travaux peuvent \xEAtre cach\xE9s ici. S\xE9lectionnez toutes les Activit\xE9s qui ne doivent pas \xEAtre calcul\xE9es automatiquement et cliquez sur Confirmer.",
		SHOWN: "Affich\xE9s",
		HIDDEN: "Cach\xE9s",
		SETTINGSSAVED: "Les param\xE8tres TW Pro ont \xE9t\xE9 appliqu\xE9s!",
		SETTINGSSAVEDSESSION: 'Les param\xE8tres TW Pro ont \xE9t\xE9 appliqu\xE9s! (pour cette session uniquement)',
		PERSISTSETTINGS: "Sauver ces param\xE8tres pour toutes les sessions.",
		CANNOTWEAR: "Vous ne pouvez pas porter ce Set, ou ce Set n\'a aucune influence sur les calculs d\'Activit\xE9s.",
		SETSETTINGS: "D\xE9sactivez les objets de Sets pour am\xE9liorer la vitesse de calcul. Les Sets avec des conditions sp\xE9ciales requises non remplies sont d\xE9sactiv\xE9s par d\xE9faut.",
		CUSTOMNAME: "Entrez le nom d\xE9sir\xE9 pour l\'Activit\xE9.",
		CUSTOMCALCULATION: "Entrez ici une formule TW Pro valide.",
		CUSTOMENABLED: "Cochez cette case pour activer cette Activit\xE9",
		NEW: "Nouveau",
		SPEED: " \u25B7 Vitesse",
		REGENERATION: " \u25B7 R\xE9g\xE9n\xE9ration PV",
		SETSINFO: "Objets de Sets",
		WITHSETITEMS: "Bonus avec %1 objets",
		LABORPOINTS: "Points de Travail",
		USEFULITEM: "Ce nombre indique le nombre d\'objets qui sont utilis\xE9s dans les calculs.",
		PERCREGENERATION: "R\xE9g\xE9n\xE9ration",
		LUCK: "Chance",
		PRAYING: "Prier",
		NOITEMSETS: "Vous ne possédez aucun objet de ce Set",
		AVERAGEDAMAGE: "Endommagement moyen",
		PREFERENCES: "Préférences",
		DEFAULTSORTING: "Tri par défaut",
		FBHEALTHPRIORITY: "Bonus de points de vie souhaité en batailles de fort",
		FBHEALTHPRIORITYZERO: "Aucun bonus",
		FBHEALTHPRIORITYLOW: "Bonus faible",
		FBHEALTHPRIORITYMEDIUM: "Bonus moyen",
		FBHEALTHPRIORITYHIGH: "Bonus élevé",
		FBHEALTHPRIORITYAUTO: "Automatique"
	};

var twpro_langname = location.host.match(/(\D+)\d+\./);
if(twpro_langname && twpro_langs[twpro_langname[1]]) twpro_lang = twpro_langs[twpro_langname[1]];

if (decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) == "fr" || decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) == "http://fr") twpro_lang = twpro_langs['fr'];

if (typeof twpro_lp_custom != "undefined"){
  for (var twpro_lang_translations in twpro_lang) {
	  if (typeof twpro_lp_custom[twpro_lang_translations] != "undefined") twpro_lang[twpro_lang_translations] = twpro_lp_custom[twpro_lang_translations];
  }
}
	function twpro_initLanguage(lang) {
	  localStorage.setItem("TWPro_LanguagePack", encodeURIComponent(lang));
	}

//Sprites für Sortierbuttons
var twpro_sortButtonImg = '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'
var twpro_searchButtonImg = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHNJREFUOMvNkbENwCAMBM/p6BiNcRiTEVKwh9O4QAEiQ1LkJUvokc/yG/6mAGRAgWrvsNJ8AgVIVsU8FyRbQ2y8aF72AKpNvSvZ31DHlwHOVlDvCqMQtantMz5CxAnWWY8sZDSEyGLQHUQ2rqWbG0wh73QBwKsfIwV17B4AAAAASUVORK5CYII%3D'
var twpro_loadingSearchImg = 'data:image/gif;base64,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'


	var specialMessages = {
		'[del]construct': function(twpro_job){
			return "";
			//Zou de ingebrachte constructiepunten voor een bepaalde level moeten weergeven
		},
		'[del]speed': function(){
			return "";
		},
		'regeneration': function(twpro_job){
			return Character.skill_titles.health+": " + twpro_job.maxlifes + " @ " + Math.round(TWPro.twpro_sleeperBonus(twpro_job.sleepCount)*10000)/100 + "%";
			/*
			Regen_speed:
			Job:  .02
			Idle: .05
			
			Fort: 1-80%, 2-85%, 3-90%, 4-95%, 5-100%, 6-100% - 6 uur
			Hotel: 1-64%, 2-72%, 3-80%, 4-88%, 5-100% - 8 uur
			
			LP = level + LP_level * (soldier?15:10) + 90
			var regens = {
				fort: [000, .80, .85, .90, .95, 1.0, 1.0],
				hotl: [000, .64, .72, .80, .88, 1.0]
			}
			FortSpeed: 1/6 * regens.fort[stars] * (1+REGENMOD_SLEEPERSET) * LP = CONSTANT * (1+%REGEN) * LP
			HotelSped: 1/8 * regens.hotl[stars] * (1+REGENMOD_SLEEPERSET) * LP = CONSTANT * (1+%REGEN) * LP
			---> = CONSTANT * (1+REGENMOD_SLEEPERSET) * LP
			
			Sleeper:
			#	REGEN	diff
			6	.25	---
			5	.18	.07
			4	.12	.06
			3	.08	.04
			2	.06	.02
			1/0	.00	.06
			
			Calculaton procedure:
			START:
				VARS cache, equip, lifes, dlife, newlifes
				VAR regen []
				EQUIP all sleeper items > equip[]
				soldier ? 1.5 : 1 > dlife
				90 + level *10 + lifepoints_skill * dlife > lifes
				ORDER equipment_slots BY lifepoints_bonus (highest at top) > cache
				LOOP THROUGH cache
					# sleeper_count = sleeper count
					# sleeper_count_minus_one = new sleeper count
					TEST_EQUIP clothing
						lifes + xtra_life_bonus * dlife > newlifes
						IF lifes * (1+regen[sleeper_count]) < newlifes * (1+regen[sleeper_count_minus_one])
							clothing > equip[]
							lifes = newlifes
							CONTINUE
						ELSE
							BREAK
						/
					/
				/
				# equip[] = best Life regeneration
			
			
			1 item: d(%REGEN)/dt * LP > (1+%REGEN) * d(LP)/dt
			n items: 
			*/
		},
		'fortatt': function(){
			new Ajax('game.php?window=character', {
			  method:'post',
			  data:{},
			  onComplete:function(data) {
				bonus = new RegExp("bonus_icon_fb[^>]+><[^>]+><[^>]+>([^<]+)");
				bonus = data.match(bonus);
				if(bonus && $('fort_bonus_popup')) $('fort_bonus_popup').title = unescape(('<b>'+ClassChoose.nameTranslations.mainclass[Character.characterClass]+'</b>: '+bonus[1]).replace(/\\/g, "%"));
			  }
			}).request();
			fort_bonus_xhtml = "<div id='fort_bonus_popup' style='position: relative; left:-25px; float: right; top: -2px;'><div style='position: absolute; background-image:url(/images/bgdark.png); opacity:0.3; width:100%; height:100%; z-index:1;'><\/div><div style='position: relative; z-index:2; padding:1px;'><img src='images/fort/battle/attacker_secondary.png'> "+Math.floor((25+Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1), 0.4)+Math.pow(Character.skills.endurance+Character.bonus.skills_total.endurance, 0.4)+Math.pow(Character.skills.aim+Character.bonus.skills_total.aim, 0.4))*100)/100 + " <img src='images\/fort\/battle\/defender_secondary.png'> " + Math.floor((10+Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1), 0.4)+Math.pow(Character.skills.endurance+Character.bonus.skills_total.endurance, 0.4)+Math.pow(Character.skills.dodge+Character.bonus.skills_total.dodge, 0.4))*100)/100;
			 if(Character.characterClass == "soldier"){
				 fort_bonus_xhtml += " <img src='images\/fort\/battle\/leadsupport.png'> " + Math.floor(Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(PremiumBoni.hasBonus('character')?0.5:0.25), 0.4)*100)/100;
			 }
			 fort_bonus_xhtml += "<\/div><\/div>";
			return fort_bonus_xhtml;
		},
		'fortdef': function(){
			new Ajax('game.php?window=character', {
			  method:'post',
			  data:{},
			  onComplete:function(data) {
				bonus = new RegExp("bonus_icon_fb[^>]+><[^>]+><[^>]+>([^<]+)");
				bonus = data.match(bonus);
				if(bonus && $('fort_bonus_popup')) $('fort_bonus_popup').title = unescape(('<b>'+ClassChoose.nameTranslations.mainclass[Character.characterClass]+'</b>: '+bonus[1]).replace(/\\/g, "%"));
			  }
			}).request();
			fort_bonus_xhtml = "<div id='fort_bonus_popup' style='position: relative; left:-25px; float: right; top: -2px;'><div style='position: absolute; background-image:url(/images/bgdark.png); opacity:0.3; width:100%; height:100%; z-index:1;'><\/div><div style='position: relative; z-index:2; padding:1px;'><img src='images/fort/battle/attacker_secondary.png'> "+Math.floor((25+Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1), 0.4)+Math.pow(Character.skills.hide+Character.bonus.skills_total.hide, 0.4)+Math.pow(Character.skills.aim+Character.bonus.skills_total.aim, 0.4))*100)/100 + " <img src='images\/fort\/battle\/defender_secondary.png'> " + Math.floor((10+Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1), 0.4)+Math.pow(Character.skills.hide+Character.bonus.skills_total.hide, 0.4)+Math.pow(Character.skills.dodge+Character.bonus.skills_total.dodge, 0.4))*100)/100;
			 if(Character.characterClass == "soldier"){
				 fort_bonus_xhtml += " <img src='images\/fort\/battle\/leadsupport.png'> " + Math.floor(Math.pow((Character.skills.leadership+Character.bonus.skills_total.leadership)*(PremiumBoni.hasBonus('character')?0.5:0.25), 0.4)*100)/100;
			 }
			 fort_bonus_xhtml += "<\/div><\/div>";
			return fort_bonus_xhtml;
		}
	};



{ // Duelconverter and Fort Message
	
function makefortmessage(twpro_fort_elementin){
var twpro_fort_elementid=twpro_fort_elementin.id;
var twpro_fort_instructions=twpro_fort_elementid.replace('window_fort_battlepage','fortbattle_placement_map')+"_instructions";
var tmparray3=document.getElementById(twpro_fort_instructions).getElementsByTagName('a');
var tmparray3=tmparray3[0].parentNode;
var twpro_fort_divplayerid=twpro_fort_elementid.replace('window_fort_battlepage','fortbattle_placement_map')+"_playerlistdiv";
n = new Element('a', {'href': "javascript:makefortlist('"+twpro_fort_divplayerid+"');", 'style':'cursor: pointer;'});
n.innerHTML="<br/><br/>"+TWPro.lang.FORTMESSAGE;
tmparray3.appendChild(n);
}

function makefortlist(twpro_fort_divplayerid){
var tmparray2=document.getElementById(twpro_fort_divplayerid).childNodes;
alert(TWPro.lang.FORTMESSAGERCP+':\n'+tmparray2.length);
var fortplayerlist=tmparray2[0].innerHTML;
for (var j = 1 ; j < tmparray2.length ; j++){
	if (tmparray2[j].innerHTML == Character.name){
} else {
	fortplayerlist +=";"+tmparray2[j].innerHTML;
}
}
AjaxWindow.show('messages',{addressee:fortplayerlist});
}


function makeadvicemessage(twpro_advice_elementin, data){
var twpro_advice_elementid=twpro_advice_elementin.id;
data = data.replace(/Saloon<\/h2>/, '$&<a onclick="makeadvicelist(\''+twpro_advice_elementid+'\');" href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">Mensaje</span><span class="button_right"></span><span style="clear:both"></span></a><br>');
return data;
}

function makeadvicelist(twpro_advice_elementid){
 var tbl=document.getElementById(twpro_advice_elementid).getElementsByTagName('table');
 tbl = tbl[2].getElementsByTagName('a');
 var adviceplayerlist = tbl[0].innerHTML; 
 for (var i=1;i<tbl.length;i++){
 if (tbl[i].href.search(/profile/) != -1) {
 adviceplayerlist += ';'+tbl[i].innerHTML;
 }
}
AjaxWindow.show('messages',{addressee:adviceplayerlist});
}

	{ // Duelconverter by Lekensteyn
		function convertduelreport(winname, data){
			if(data && data.indexOf("Reports.switchDuel") > 0){
				data = data.replace(/"ReportPublish\.selectPublish.+?\n\s+.+?\n\s+.+?\n\s+<\/th>/, '$&<th style="width:20px"><a onclick="convertduelreportfunc(\''+winname+'\');" href="javascript:void(0);"><img src="/images/forum/icon/spanner.png" alt="'+TWPro.lang.CONVERT+'" title="'+TWPro.lang.CONVERT+'"></a></th>');
			}
			return data;
		}
		function convertduelreportfunc(dc) {
			var dce = document.getElementById(dc);
			if(document.getElementById(dc+'_cnv')) return;
			if (dce.innerHTML.indexOf('images/report/attacker.png') != -1) {
				var duel = duellers = avatars = place = '';
				var tbl = dce.getElementsByTagName('table');
				var k = 0;
				var si = tbl[2].rows[0].cells;
				var s1 = si[0].getElementsByTagName('strong');
				var s2 = si[5].getElementsByTagName('strong');
				var ex = '[player]'+s1[0].firstChild.innerHTML+'[/player]';
				if(s1.length > 1) ex += ' ('+s1[1].innerHTML+')';
				ex += " \u2015 ";
				if(s2[0].getElementsByTagName('a').length){
					ex += '[player]'+s2[0].getElementsByTagName('a')[0].innerHTML.replace(/^\s+|\s+$/g, '')+'[/player]';
				}
				else{
					ex += '[b]'+s2[0].innerHTML.replace(/^\s+|\s+$/g, '')+'[/b]';
				}
				if(s2.length > 1) ex += ' ('+s2[1].innerHTML+')';
				ex += "\n";
				ex += '[img]'+si[1].getElementsByTagName('img')[0].src+'[/img]';
				ex += '[img]'+si[2].getElementsByTagName('img')[0].src+'[/img]';
				ex += '[img]/images/jobs/duell.png[/img]';
				ex += '[img]'+si[3].getElementsByTagName('img')[0].src+'[/img]';
				ex += '[img]'+si[4].getElementsByTagName('img')[0].src+'[/img]';
				ex += '\n__________________________________________________\n';
				var dh = tbl[3].rows;
				var bpa = {
					'0px 0px': 'http://img43.imageshack.us/img43/3745/nohitatt.png',
					'0px -78px': 'http://img196.imageshack.us/img196/6343/haedatt.png',
					'0px -156px': 'http://img269.imageshack.us/img269/382/rightscatt.png',
					'0px -234px': 'http://img195.imageshack.us/img195/8398/leftscatt.png',
					'0px -312px': 'http://img39.imageshack.us/img39/1285/righthaatt.png',
					'0px -390px': 'http://img35.imageshack.us/img35/3261/lefthaatt.png',
					'0px -468px': 'http://img32.imageshack.us/img32/1503/winatt.png',
					'0px -546px': 'http://img193.imageshack.us/img193/1825/loseatt.png',
					'0px -624px': 'http://img9.imageshack.us/img9/5177/leftdie.png'
				};
				var bpd = {
					'0px 0px': 'http://img196.imageshack.us/img196/5995/nohitdeff.png',
					'0px -78px': 'http://img39.imageshack.us/img39/6522/haeddeff.png',
					'0px -156px': 'http://img195.imageshack.us/img195/8905/rightscdeff.png',
					'0px -234px': 'http://img32.imageshack.us/img32/9089/leftscdeff.png',
					'0px -312px': 'http://img35.imageshack.us/img35/3111/righthadeff.png',
					'0px -390px': 'http://img269.imageshack.us/img269/7476/lefthadeff.png',
					'0px -468px': 'http://img193.imageshack.us/img193/7641/windeff.png',
					'0px -546px': 'http://img194.imageshack.us/img194/8311/losedeff.png',
					'0px -624px': 'http://img30.imageshack.us/img30/8627/rightdie.png'
				};
				for(var i=0; i<dh.length; i++){
					if(i == dh.length-1){
						ex += '[b]_______________'+TWPro.lang.HPTOTAL+':_______________[/b]\n';
					}
					var d1 = dh[i].cells[0].getElementsByTagName('span');
					if(d1.length > 1){
						d1 = d1[1].innerHTML;
						if(d1.length < 9){
							d1 = '[color=#D3C6AF]'+(new Array(10-d1.length)).join('0')+'[/color][color=red]'+d1;
						}
						else{
							d1 = '[color=red]'+d1;
						}
						ex += '[b][size=17]'+d1+' [/color][/size][/b]';
					}
					else{
						ex += '[size=17][color=#D3C6AF]0000000[/color]0 [/size]';
					}
					var dud = dh[i].cells[1].getElementsByTagName('div');
					ex += '[img]'+bpa[dud[1].style.backgroundPosition]+'[/img][img]'+bpd[dud[2].style.backgroundPosition]+'[/img]';
					var d2 = dh[i].cells[2].getElementsByTagName('span');
					if(d2.length > 1){
						ex += '[b][size=17][color=blue]'+d2[1].innerHTML+'[/color][/size][/b]';
					}
					else{
						ex += '[size=17][color=#D3C6AF]0000[/color]0 [/size]';
					}
					ex += '\n';
				}
				ex += '[b][size=16]'+dce.getElementsByTagName('h4')[0].innerHTML+'[/size][/b]';
				var dd = document.createElement('div');
				dd.style.cssText = 'overflow: auto; position: relative; height: 340px; padding: 5px;';
				dd.id = dc+'_cnv';
				dd.innerHTML = '<img src="/img.php?type=button&subtype=normal&value=back" alt="Back" style="float:right;cursor:pointer" onclick="this.parentNode.previousSibling.style.display=\'\';this.parentNode.parentNode.removeChild(this.parentNode);">BB Code: <br><textarea rows="10" cols="40"  style="width:85%;height:80%;background-image: url(images/muster.jpg);margin-left:auto;margin-right:auto;" onfocus="this.select();" readonly="readonly">' + ex + "</textarea>";
				var bf = tbl[2].parentNode.nextSibling;
				bf.previousSibling.style.display = 'none';
				bf.parentNode.insertBefore(dd, bf);
			}
	
		}
	}


}
if ((window.location.href.indexOf('.the-west.') != -1 || window.location.href.indexOf('tw.innogames.net') != -1) && window.location.href.indexOf('game') != -1) {
	/*
Diese Script wird von http://www.tw-pro.de/ bereitgestellt.
Es gelten die im Impressum http://www.tw-pro.de/?site=impressum hinterlegten rechtlichen Hinweise.
Insbesondere bedarf eine Veraenderung, Weitergabe oder eine eigene Veroeffentlichung dieses Scripts
oder Teilen davon einer schriftlichen Genehmigung des Autors. Das Copyright liegt beim Autor.
*/
	
	// manipuliert interne Funktionen und fuegt eigene Aufrufe ein
	function twpro_injectScript() {
		var style = document.createElement('style'),
			css = '.twpro_search_hide{display:none;}.twpro_setinfo_entry{margin:5px;border:1px solid #32201A;padding:2px;}.twpro_setinfo_name_clicker{cursor:pointer;color:#523E30;}.twpro_setinfo_set{background:url(../images/messages/post-bgr.jpg) repeat scroll 0 0 transparent;margin-left:10px;}.twpro_setinfo_xitems{margin-left:-5px;padding:0;}';
		style.setAttribute('type', 'text/css');
		if(style.styleSheet){ // IE
			style.styleSheet.cssText = css;
		}
		else{
			style.appendChild(document.createTextNode(css));
		}
			document.getElementsByTagName('head')[0].appendChild(style);
		/*	TWPro.locationSharp = location.href.replace(/^([^#]+)#?/, '$1')+"#";
			TWPro.hrefSharpToJSVoid = window.setInterval(function(){for(var a=document.getElementsByTagName("a"),i=a.length-1;i>=0;i--)if(a[i].href==TWPro.locationSharp) a[i].href="javascript:void(0);";}, 200);
			try{
				WMap.recalcMarker = eval('('+WMap.recalcMarker.toString().replace(/"#"/g, '"javascript:void(0);"')+')');
			}catch(e){} */
		TWPro.enablebbcodes = true;
		TWPro.twpro_calculated = false;
		TWPro.twpro_failure = false;
		TWPro.twpro_failureInject = false;
		TWPro.twpro_failureRollback = [];
		TWPro.twpro_active = true;
		TWPro.twpro_bestAnimal = 0;
		TWPro.damage_min = {left_arm:0, right_arm_shot:0, right_arm_hand: 0};
		TWPro.damage_max = {left_arm:0, right_arm_shot:0, right_arm_hand: 0};
		TWPro.damage_average = {left_arm:0, right_arm_shot:0, right_arm_hand: 0};
		TWPro.twpro_sorts = ['name', 'xp', 'wages', 'luck', 'comb', 'danger', 'laborp'];
		TWPro.twpro_health_priority = ['zero', 'low', 'medium', 'high', 'auto'];
		function getPCookie(n){var c='; '+document.cookie+';',s='; twpro_'+Character.playerId+'_'+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
		TWPro.prefs = {
			'Hide_unjobs': 1,
			'dispJobClothingOnly': 2,
			'multipliers': getPCookie('multipliers'),
				'reportaccess': getPCookie('reportaccess'),
				'hidejobs': getPCookie('hidejobs'),
				'disabledSets': getPCookie('disabledSets'),
				'customJobs': getPCookie('customJobs'),
				'defaultSorting': getPCookie('defaultSorting'),
				'healthPriority': getPCookie('healthPriority')
		};
		TWPro.prefNumber = parseInt(getPCookie('prefs'), 10) || 0;
		TWPro.multipliers = {xp:1, wages:1, luck:1, danger:1};
		var multiplier,
			savedMultipliers = TWPro.twpro_preference('multipliers').split(':'),
				j=0,
				disabled = TWPro.twpro_preference('hidejobs').split('|');
		for(var i in TWPro.multipliers){
			multiplier = parseInt(savedMultipliers[j++], 10);
			if(!isNaN(multiplier)){
				TWPro.multipliers[i] = multiplier;
			}
		}
			try {
				TWPro.item_type_title = eval("(" + ItemPopup.prototype.getXHTML.toString().match(/var item_type_title\s*=\s*(\{[^}]+\})/)[1] + ")"),
				TWPro.item_sub_title = eval("(" + ItemPopup.prototype.getXHTML.toString().match(/var item_sub_title\s*=\s*(\{[^}]+\})/)[1] + ")");
			} catch (e) {
				TWPro.item_type_title = {};
				TWPro.item_sub_title = {};
			}
			TWPro.job_titles = {};
			for (var i in JobList) {
				TWPro.job_titles[JobList[i].shortName] = JobList[i].name;
			}
			//TWPro.job_titles.construct = TWPro.lang.CONSTRUCTION;
			TWPro.disabledJobs = {};
			for(var i=0;i<disabled.length; i++){
				TWPro.disabledJobs[disabled[i]] = true;
			}
		TWPro.searchInventory = {timer:null};
		TWPro.searchTrader = {};
		TWPro.twpro_jobs = [];
		// Jobs
		{
			TWPro.twpro_jobValues = {};
			TWPro.twpro_jobValues.swine = {};
			TWPro.twpro_jobValues.swine.erfahrung = 1;
			TWPro.twpro_jobValues.swine.lohn = 3;
			TWPro.twpro_jobValues.swine.glueck = 0;
			TWPro.twpro_jobValues.swine.gefahr = 1;
			TWPro.twpro_jobValues.scarecrow = {};
			TWPro.twpro_jobValues.scarecrow.erfahrung = 3;
			TWPro.twpro_jobValues.scarecrow.lohn = 1;
			TWPro.twpro_jobValues.scarecrow.glueck = 2;
			TWPro.twpro_jobValues.scarecrow.gefahr = 20;
			TWPro.twpro_jobValues.wanted = {};
			TWPro.twpro_jobValues.wanted.erfahrung = 3;
			TWPro.twpro_jobValues.wanted.lohn = 2;
			TWPro.twpro_jobValues.wanted.glueck = 0;
			TWPro.twpro_jobValues.wanted.gefahr = 10;
			TWPro.twpro_jobValues.tabacco = {};
			TWPro.twpro_jobValues.tabacco.erfahrung = 1;
			TWPro.twpro_jobValues.tabacco.lohn = 6;
			TWPro.twpro_jobValues.tabacco.glueck = 2;
			TWPro.twpro_jobValues.tabacco.gefahr = 2;
			TWPro.twpro_jobValues.cotton = {};
			TWPro.twpro_jobValues.cotton.erfahrung = 4;
			TWPro.twpro_jobValues.cotton.lohn = 1;
			TWPro.twpro_jobValues.cotton.glueck = 0;
			TWPro.twpro_jobValues.cotton.gefahr = 3;
			TWPro.twpro_jobValues.sugar = {};
			TWPro.twpro_jobValues.sugar.erfahrung = 2;
			TWPro.twpro_jobValues.sugar.lohn = 5;
			TWPro.twpro_jobValues.sugar.glueck = 4;
			TWPro.twpro_jobValues.sugar.gefahr = 1;
			TWPro.twpro_jobValues.angle = {};
			TWPro.twpro_jobValues.angle.erfahrung = 0;
			TWPro.twpro_jobValues.angle.lohn = 1;
			TWPro.twpro_jobValues.angle.glueck = 6;
			TWPro.twpro_jobValues.angle.gefahr = 2;
			TWPro.twpro_jobValues.cereal = {};
			TWPro.twpro_jobValues.cereal.erfahrung = 6;
			TWPro.twpro_jobValues.cereal.lohn = 2;
			TWPro.twpro_jobValues.cereal.glueck = 2;
			TWPro.twpro_jobValues.cereal.gefahr = 4;
			TWPro.twpro_jobValues.berry = {};
			TWPro.twpro_jobValues.berry.erfahrung = 6;
			TWPro.twpro_jobValues.berry.lohn = 2;
			TWPro.twpro_jobValues.berry.glueck = 5;
			TWPro.twpro_jobValues.berry.gefahr = 6;
			TWPro.twpro_jobValues.sheeps = {};
			TWPro.twpro_jobValues.sheeps.erfahrung = 5;
			TWPro.twpro_jobValues.sheeps.lohn = 3;
			TWPro.twpro_jobValues.sheeps.glueck = 0;
			TWPro.twpro_jobValues.sheeps.gefahr = 2;
			TWPro.twpro_jobValues.newspaper = {};
			TWPro.twpro_jobValues.newspaper.erfahrung = 1;
			TWPro.twpro_jobValues.newspaper.lohn = 6;
			TWPro.twpro_jobValues.newspaper.glueck = 2;
			TWPro.twpro_jobValues.newspaper.gefahr = 1;
			TWPro.twpro_jobValues.cut = {};
			TWPro.twpro_jobValues.cut.erfahrung = 7;
			TWPro.twpro_jobValues.cut.lohn = 5;
			TWPro.twpro_jobValues.cut.glueck = 3;
			TWPro.twpro_jobValues.cut.gefahr = 3;
			TWPro.twpro_jobValues.grinding = {};
			TWPro.twpro_jobValues.grinding.erfahrung = 7;
			TWPro.twpro_jobValues.grinding.lohn = 11;
			TWPro.twpro_jobValues.grinding.glueck = 0;
			TWPro.twpro_jobValues.grinding.gefahr = 5;
			TWPro.twpro_jobValues.corn = {};
			TWPro.twpro_jobValues.corn.erfahrung = 7;
			TWPro.twpro_jobValues.corn.lohn = 4;
			TWPro.twpro_jobValues.corn.glueck = 8;
			TWPro.twpro_jobValues.corn.gefahr = 5;
			TWPro.twpro_jobValues.beans = {};
			TWPro.twpro_jobValues.beans.erfahrung = 7;
			TWPro.twpro_jobValues.beans.lohn = 9;
			TWPro.twpro_jobValues.beans.glueck = 4;
			TWPro.twpro_jobValues.beans.gefahr = 5;
			TWPro.twpro_jobValues.fort_guard = {};
			TWPro.twpro_jobValues.fort_guard.erfahrung = 9;
			TWPro.twpro_jobValues.fort_guard.lohn = 3;
			TWPro.twpro_jobValues.fort_guard.glueck = 2;
			TWPro.twpro_jobValues.fort_guard.gefahr = 7;
			TWPro.twpro_jobValues.tanning = {};
			TWPro.twpro_jobValues.tanning.erfahrung = 15;
			TWPro.twpro_jobValues.tanning.lohn = 12;
			TWPro.twpro_jobValues.tanning.glueck = 5;
			TWPro.twpro_jobValues.tanning.gefahr = 18;
			TWPro.twpro_jobValues.digging = {};
			TWPro.twpro_jobValues.digging.erfahrung = 3;
			TWPro.twpro_jobValues.digging.lohn = 11;
			TWPro.twpro_jobValues.digging.glueck = 5;
			TWPro.twpro_jobValues.digging.gefahr = 7;
			TWPro.twpro_jobValues.grave = {};
			TWPro.twpro_jobValues.grave.erfahrung = 12;
			TWPro.twpro_jobValues.grave.lohn = 16;
			TWPro.twpro_jobValues.grave.glueck = 22;
			TWPro.twpro_jobValues.grave.gefahr = 9;
			TWPro.twpro_jobValues.turkey = {};
			TWPro.twpro_jobValues.turkey.erfahrung = 14;
			TWPro.twpro_jobValues.turkey.lohn = 3;
			TWPro.twpro_jobValues.turkey.glueck = 7;
			TWPro.twpro_jobValues.turkey.gefahr = 21;
			TWPro.twpro_jobValues.rail = {};
			TWPro.twpro_jobValues.rail.erfahrung = 18;
			TWPro.twpro_jobValues.rail.lohn = 10;
			TWPro.twpro_jobValues.rail.glueck = 5;
			TWPro.twpro_jobValues.rail.gefahr = 10;
			TWPro.twpro_jobValues.cow = {};
			TWPro.twpro_jobValues.cow.erfahrung = 17;
			TWPro.twpro_jobValues.cow.lohn = 5;
			TWPro.twpro_jobValues.cow.glueck = 0;
			TWPro.twpro_jobValues.cow.gefahr = 11;
			TWPro.twpro_jobValues.fence = {};
			TWPro.twpro_jobValues.fence.erfahrung = 11;
			TWPro.twpro_jobValues.fence.lohn = 7;
			TWPro.twpro_jobValues.fence.glueck = 5;
			TWPro.twpro_jobValues.fence.gefahr = 6;
			TWPro.twpro_jobValues.saw = {};
			TWPro.twpro_jobValues.saw.erfahrung = 12;
			TWPro.twpro_jobValues.saw.lohn = 23;
			TWPro.twpro_jobValues.saw.glueck = 6;
			TWPro.twpro_jobValues.saw.gefahr = 32;
			TWPro.twpro_jobValues.stone = {};
			TWPro.twpro_jobValues.stone.erfahrung = 8;
			TWPro.twpro_jobValues.stone.lohn = 17;
			TWPro.twpro_jobValues.stone.glueck = 9;
			TWPro.twpro_jobValues.stone.gefahr = 33;
			TWPro.twpro_jobValues.straighten = {};
			TWPro.twpro_jobValues.straighten.erfahrung = 22;
			TWPro.twpro_jobValues.straighten.lohn = 8;
			TWPro.twpro_jobValues.straighten.glueck = 15;
			TWPro.twpro_jobValues.straighten.gefahr = 12;
			TWPro.twpro_jobValues.wood = {};
			TWPro.twpro_jobValues.wood.erfahrung = 5;
			TWPro.twpro_jobValues.wood.lohn = 18;
			TWPro.twpro_jobValues.wood.glueck = 2;
			TWPro.twpro_jobValues.wood.gefahr = 21;
			TWPro.twpro_jobValues.irrigation = {};
			TWPro.twpro_jobValues.irrigation.erfahrung = 13;
			TWPro.twpro_jobValues.irrigation.lohn = 7;
			TWPro.twpro_jobValues.irrigation.glueck = 15;
			TWPro.twpro_jobValues.irrigation.gefahr = 6;
			TWPro.twpro_jobValues.brand = {};
			TWPro.twpro_jobValues.brand.erfahrung = 25;
			TWPro.twpro_jobValues.brand.lohn = 8;
			TWPro.twpro_jobValues.brand.glueck = 0;
			TWPro.twpro_jobValues.brand.gefahr = 35;
			TWPro.twpro_jobValues.wire = {};
			TWPro.twpro_jobValues.wire.erfahrung = 13;
			TWPro.twpro_jobValues.wire.lohn = 17;
			TWPro.twpro_jobValues.wire.glueck = 6;
			TWPro.twpro_jobValues.wire.gefahr = 0;
			TWPro.twpro_jobValues.dam = {};
			TWPro.twpro_jobValues.dam.erfahrung = 18;
			TWPro.twpro_jobValues.dam.lohn = 4;
			TWPro.twpro_jobValues.dam.glueck = 9;
			TWPro.twpro_jobValues.dam.gefahr = 41;
			TWPro.twpro_jobValues.gems = {};
			TWPro.twpro_jobValues.gems.erfahrung = 7;
			TWPro.twpro_jobValues.gems.lohn = 25;
			TWPro.twpro_jobValues.gems.glueck = 8;
			TWPro.twpro_jobValues.gems.gefahr = 4;
			TWPro.twpro_jobValues.claim = {};
			TWPro.twpro_jobValues.claim.erfahrung = 4;
			TWPro.twpro_jobValues.claim.lohn = 31;
			TWPro.twpro_jobValues.claim.glueck = 4;
			TWPro.twpro_jobValues.claim.gefahr = 29;
			TWPro.twpro_jobValues.chuck_wagon = {};
			TWPro.twpro_jobValues.chuck_wagon.erfahrung = 23;
			TWPro.twpro_jobValues.chuck_wagon.lohn = 5;
			TWPro.twpro_jobValues.chuck_wagon.glueck = 42;
			TWPro.twpro_jobValues.chuck_wagon.gefahr = 11;
			TWPro.twpro_jobValues.break_in = {};
			TWPro.twpro_jobValues.break_in.erfahrung = 32;
			TWPro.twpro_jobValues.break_in.lohn = 13;
			TWPro.twpro_jobValues.break_in.glueck = 10;
			TWPro.twpro_jobValues.break_in.gefahr = 52;
			TWPro.twpro_jobValues.trade = {};
			TWPro.twpro_jobValues.trade.erfahrung = 3;
			TWPro.twpro_jobValues.trade.lohn = 15;
			TWPro.twpro_jobValues.trade.glueck = 25;
			TWPro.twpro_jobValues.trade.gefahr = 12;
			TWPro.twpro_jobValues.mast = {};
			TWPro.twpro_jobValues.mast.erfahrung = 25;
			TWPro.twpro_jobValues.mast.lohn = 21;
			TWPro.twpro_jobValues.mast.glueck = 3;
			TWPro.twpro_jobValues.mast.gefahr = 14;
			TWPro.twpro_jobValues.spring = {};
			TWPro.twpro_jobValues.spring.erfahrung = 33;
			TWPro.twpro_jobValues.spring.lohn = 9;
			TWPro.twpro_jobValues.spring.glueck = 23;
			TWPro.twpro_jobValues.spring.gefahr = 19;
			TWPro.twpro_jobValues.beaver = {};
			TWPro.twpro_jobValues.beaver.erfahrung = 17;
			TWPro.twpro_jobValues.beaver.lohn = 32;
			TWPro.twpro_jobValues.beaver.glueck = 6;
			TWPro.twpro_jobValues.beaver.gefahr = 21;
			TWPro.twpro_jobValues.coal = {};
			TWPro.twpro_jobValues.coal.erfahrung = 14;
			TWPro.twpro_jobValues.coal.lohn = 30;
			TWPro.twpro_jobValues.coal.glueck = 0;
			TWPro.twpro_jobValues.coal.gefahr = 13;
			TWPro.twpro_jobValues.print = {};
			TWPro.twpro_jobValues.print.erfahrung = 20;
			TWPro.twpro_jobValues.print.lohn = 30;
			TWPro.twpro_jobValues.print.glueck = 5;
			TWPro.twpro_jobValues.print.gefahr = 7;
			TWPro.twpro_jobValues.fishing = {};
			TWPro.twpro_jobValues.fishing.erfahrung = 23;
			TWPro.twpro_jobValues.fishing.lohn = 6;
			TWPro.twpro_jobValues.fishing.glueck = 23;
			TWPro.twpro_jobValues.fishing.gefahr = 38;
			TWPro.twpro_jobValues.trainstation = {};
			TWPro.twpro_jobValues.trainstation.erfahrung = 47;
			TWPro.twpro_jobValues.trainstation.lohn = 12;
			TWPro.twpro_jobValues.trainstation.glueck = 7;
			TWPro.twpro_jobValues.trainstation.gefahr = 15;
			TWPro.twpro_jobValues.windmeel = {};
			TWPro.twpro_jobValues.windmeel.erfahrung = 43;
			TWPro.twpro_jobValues.windmeel.lohn = 42;
			TWPro.twpro_jobValues.windmeel.glueck = 6;
			TWPro.twpro_jobValues.windmeel.gefahr = 18;
			TWPro.twpro_jobValues.explore = {};
			TWPro.twpro_jobValues.explore.erfahrung = 45;
			TWPro.twpro_jobValues.explore.lohn = 1;
			TWPro.twpro_jobValues.explore.glueck = 22;
			TWPro.twpro_jobValues.explore.gefahr = 37;
			TWPro.twpro_jobValues["float"] = {};
			TWPro.twpro_jobValues["float"].erfahrung = 45;
			TWPro.twpro_jobValues["float"].lohn = 23;
			TWPro.twpro_jobValues["float"].glueck = 0;
			TWPro.twpro_jobValues["float"].gefahr = 52;
			TWPro.twpro_jobValues.bridge = {};
			TWPro.twpro_jobValues.bridge.erfahrung = 33;
			TWPro.twpro_jobValues.bridge.lohn = 17;
			TWPro.twpro_jobValues.bridge.glueck = 18;
			TWPro.twpro_jobValues.bridge.gefahr = 53;
			TWPro.twpro_jobValues.springe = {};
			TWPro.twpro_jobValues.springe.erfahrung = 45;
			TWPro.twpro_jobValues.springe.lohn = 29;
			TWPro.twpro_jobValues.springe.glueck = 0;
			TWPro.twpro_jobValues.springe.gefahr = 42;
			TWPro.twpro_jobValues.coffin = {};
			TWPro.twpro_jobValues.coffin.erfahrung = 8;
			TWPro.twpro_jobValues.coffin.lohn = 42;
			TWPro.twpro_jobValues.coffin.glueck = 15;
			TWPro.twpro_jobValues.coffin.gefahr = 20;
			TWPro.twpro_jobValues.dynamite = {};
			TWPro.twpro_jobValues.dynamite.erfahrung = 12;
			TWPro.twpro_jobValues.dynamite.lohn = 23;
			TWPro.twpro_jobValues.dynamite.glueck = 64;
			TWPro.twpro_jobValues.dynamite.gefahr = 93;
			TWPro.twpro_jobValues.coyote = {};
			TWPro.twpro_jobValues.coyote.erfahrung = 43;
			TWPro.twpro_jobValues.coyote.lohn = 15;
			TWPro.twpro_jobValues.coyote.glueck = 26;
			TWPro.twpro_jobValues.coyote.gefahr = 45;
			TWPro.twpro_jobValues.buffalo = {};
			TWPro.twpro_jobValues.buffalo.erfahrung = 62;
			TWPro.twpro_jobValues.buffalo.lohn = 24;
			TWPro.twpro_jobValues.buffalo.glueck = 0;
			TWPro.twpro_jobValues.buffalo.gefahr = 72;
			TWPro.twpro_jobValues.fort = {};
			TWPro.twpro_jobValues.fort.erfahrung = 71;
			TWPro.twpro_jobValues.fort.lohn = 33;
			TWPro.twpro_jobValues.fort.glueck = 17;
			TWPro.twpro_jobValues.fort.gefahr = 35;
			TWPro.twpro_jobValues.indians = {};
			TWPro.twpro_jobValues.indians.erfahrung = 14;
			TWPro.twpro_jobValues.indians.lohn = 11;
			TWPro.twpro_jobValues.indians.glueck = 63;
			TWPro.twpro_jobValues.indians.gefahr = 34;
			TWPro.twpro_jobValues.clearing = {};
			TWPro.twpro_jobValues.clearing.erfahrung = 8;
			TWPro.twpro_jobValues.clearing.lohn = 62;
			TWPro.twpro_jobValues.clearing.glueck = 9;
			TWPro.twpro_jobValues.clearing.gefahr = 16;
			TWPro.twpro_jobValues.silver = {};
			TWPro.twpro_jobValues.silver.erfahrung = 8;
			TWPro.twpro_jobValues.silver.lohn = 76;
			TWPro.twpro_jobValues.silver.glueck = 0;
			TWPro.twpro_jobValues.silver.gefahr = 32;
			TWPro.twpro_jobValues.diligence_guard = {};
			TWPro.twpro_jobValues.diligence_guard.erfahrung = 77;
			TWPro.twpro_jobValues.diligence_guard.lohn = 34;
			TWPro.twpro_jobValues.diligence_guard.glueck = 45;
			TWPro.twpro_jobValues.diligence_guard.gefahr = 43;
			TWPro.twpro_jobValues.wolf = {};
			TWPro.twpro_jobValues.wolf.erfahrung = 63;
			TWPro.twpro_jobValues.wolf.lohn = 21;
			TWPro.twpro_jobValues.wolf.glueck = 15;
			TWPro.twpro_jobValues.wolf.gefahr = 67;
			TWPro.twpro_jobValues.track = {};
			TWPro.twpro_jobValues.track.erfahrung = 60;
			TWPro.twpro_jobValues.track.lohn = 10;
			TWPro.twpro_jobValues.track.glueck = 30;
			TWPro.twpro_jobValues.track.gefahr = 33;
			TWPro.twpro_jobValues.ox = {};
			TWPro.twpro_jobValues.ox.erfahrung = 34;
			TWPro.twpro_jobValues.ox.lohn = 64;
			TWPro.twpro_jobValues.ox.glueck = 18;
			TWPro.twpro_jobValues.ox.gefahr = 43;
			TWPro.twpro_jobValues.guard = {};
			TWPro.twpro_jobValues.guard.erfahrung = 35;
			TWPro.twpro_jobValues.guard.lohn = 25;
			TWPro.twpro_jobValues.guard.glueck = 38;
			TWPro.twpro_jobValues.guard.gefahr = 4;
			TWPro.twpro_jobValues.bible = {};
			TWPro.twpro_jobValues.bible.erfahrung = 61;
			TWPro.twpro_jobValues.bible.lohn = 5;
			TWPro.twpro_jobValues.bible.glueck = 52;
			TWPro.twpro_jobValues.bible.gefahr = 77;
			TWPro.twpro_jobValues.ponyexpress = {};
			TWPro.twpro_jobValues.ponyexpress.erfahrung = 48;
			TWPro.twpro_jobValues.ponyexpress.lohn = 15;
			TWPro.twpro_jobValues.ponyexpress.glueck = 51;
			TWPro.twpro_jobValues.ponyexpress.gefahr = 44;
			TWPro.twpro_jobValues.weapons = {};
			TWPro.twpro_jobValues.weapons.erfahrung = 35;
			TWPro.twpro_jobValues.weapons.lohn = 15;
			TWPro.twpro_jobValues.weapons.glueck = 72;
			TWPro.twpro_jobValues.weapons.gefahr = 82;
			TWPro.twpro_jobValues.dead = {};
			TWPro.twpro_jobValues.dead.erfahrung = 14;
			TWPro.twpro_jobValues.dead.lohn = 14;
			TWPro.twpro_jobValues.dead.glueck = 90;
			TWPro.twpro_jobValues.dead.gefahr = 34;
			TWPro.twpro_jobValues.grizzly = {};
			TWPro.twpro_jobValues.grizzly.erfahrung = 78;
			TWPro.twpro_jobValues.grizzly.lohn = 25;
			TWPro.twpro_jobValues.grizzly.glueck = 35;
			TWPro.twpro_jobValues.grizzly.gefahr = 71;
			TWPro.twpro_jobValues.oil = {};
			TWPro.twpro_jobValues.oil.erfahrung = 25;
			TWPro.twpro_jobValues.oil.lohn = 83;
			TWPro.twpro_jobValues.oil.glueck = 20;
			TWPro.twpro_jobValues.oil.gefahr = 7;
			TWPro.twpro_jobValues.treasure_hunting = {};
			TWPro.twpro_jobValues.treasure_hunting.erfahrung = 20;
			TWPro.twpro_jobValues.treasure_hunting.lohn = 20;
			TWPro.twpro_jobValues.treasure_hunting.glueck = 83;
			TWPro.twpro_jobValues.treasure_hunting.gefahr = 24;
			TWPro.twpro_jobValues.army = {};
			TWPro.twpro_jobValues.army.erfahrung = 76;
			TWPro.twpro_jobValues.army.lohn = 55;
			TWPro.twpro_jobValues.army.glueck = 17;
			TWPro.twpro_jobValues.army.gefahr = 35;
			TWPro.twpro_jobValues.steal = {};
			TWPro.twpro_jobValues.steal.erfahrung = 50;
			TWPro.twpro_jobValues.steal.lohn = 48;
			TWPro.twpro_jobValues.steal.glueck = 74;
			TWPro.twpro_jobValues.steal.gefahr = 66;
			TWPro.twpro_jobValues.mercenary = {};
			TWPro.twpro_jobValues.mercenary.erfahrung = 52;
			TWPro.twpro_jobValues.mercenary.lohn = 92;
			TWPro.twpro_jobValues.mercenary.glueck = 23;
			TWPro.twpro_jobValues.mercenary.gefahr = 65;
			TWPro.twpro_jobValues.bandits = {};
			TWPro.twpro_jobValues.bandits.erfahrung = 75;
			TWPro.twpro_jobValues.bandits.lohn = 28;
			TWPro.twpro_jobValues.bandits.glueck = 85;
			TWPro.twpro_jobValues.bandits.gefahr = 83;
			TWPro.twpro_jobValues.aggression = {};
			TWPro.twpro_jobValues.aggression.erfahrung = 27;
			TWPro.twpro_jobValues.aggression.lohn = 78;
			TWPro.twpro_jobValues.aggression.glueck = 78;
			TWPro.twpro_jobValues.aggression.gefahr = 86;
			TWPro.twpro_jobValues.diligence_aggression = {};
			TWPro.twpro_jobValues.diligence_aggression.erfahrung = 73;
			TWPro.twpro_jobValues.diligence_aggression.lohn = 43;
			TWPro.twpro_jobValues.diligence_aggression.glueck = 95;
			TWPro.twpro_jobValues.diligence_aggression.gefahr = 67;
			TWPro.twpro_jobValues.bounty = {};
			TWPro.twpro_jobValues.bounty.erfahrung = 32;
			TWPro.twpro_jobValues.bounty.lohn = 92;
			TWPro.twpro_jobValues.bounty.glueck = 79;
			TWPro.twpro_jobValues.bounty.gefahr = 72;
			TWPro.twpro_jobValues.captured = {};
			TWPro.twpro_jobValues.captured.erfahrung = 69;
			TWPro.twpro_jobValues.captured.lohn = 23;
			TWPro.twpro_jobValues.captured.glueck = 85;
			TWPro.twpro_jobValues.captured.gefahr = 44;
			TWPro.twpro_jobValues.train = {};
			TWPro.twpro_jobValues.train.erfahrung = 87;
			TWPro.twpro_jobValues.train.lohn = 67;
			TWPro.twpro_jobValues.train.glueck = 92;
			TWPro.twpro_jobValues.train.gefahr = 96;
			TWPro.twpro_jobValues.burglary = {};
			TWPro.twpro_jobValues.burglary.erfahrung = 34;
			TWPro.twpro_jobValues.burglary.lohn = 80;
			TWPro.twpro_jobValues.burglary.glueck = 81;
			TWPro.twpro_jobValues.burglary.gefahr = 26;
			TWPro.twpro_jobValues.quackery = {};
			TWPro.twpro_jobValues.quackery.erfahrung = 50;
			TWPro.twpro_jobValues.quackery.lohn = 65;
			TWPro.twpro_jobValues.quackery.glueck = 52;
			TWPro.twpro_jobValues.quackery.gefahr = 67;
			TWPro.twpro_jobValues.peace = {};
			TWPro.twpro_jobValues.peace.erfahrung = 68;
			TWPro.twpro_jobValues.peace.lohn = 33;
			TWPro.twpro_jobValues.peace.glueck = 76;
			TWPro.twpro_jobValues.peace.gefahr = 44;
			TWPro.twpro_jobValues.ship = {};
			TWPro.twpro_jobValues.ship.erfahrung = 35;
			TWPro.twpro_jobValues.ship.lohn = 82;
			TWPro.twpro_jobValues.ship.glueck = 15;
			TWPro.twpro_jobValues.ship.gefahr = 14;
			TWPro.twpro_jobValues.smuggle = {};
			TWPro.twpro_jobValues.smuggle.erfahrung = 45;
			TWPro.twpro_jobValues.smuggle.lohn = 62;
			TWPro.twpro_jobValues.smuggle.glueck = 83;
			TWPro.twpro_jobValues.smuggle.gefahr = 56;
			TWPro.twpro_jobValues.ranch = {};
			TWPro.twpro_jobValues.ranch.erfahrung = 61;
			TWPro.twpro_jobValues.ranch.lohn = 28;
			TWPro.twpro_jobValues.ranch.glueck = 17;
			TWPro.twpro_jobValues.ranch.gefahr = 24;
			TWPro.twpro_jobValues.iron = {};
			TWPro.twpro_jobValues.iron.erfahrung = 32;
			TWPro.twpro_jobValues.iron.lohn = 52;
			TWPro.twpro_jobValues.iron.glueck = 15;
			TWPro.twpro_jobValues.iron.gefahr = 29;
			TWPro.twpro_jobValues.agave = {};
			TWPro.twpro_jobValues.agave.erfahrung = 42;
			TWPro.twpro_jobValues.agave.lohn = 25;
			TWPro.twpro_jobValues.agave.glueck = 12;
			TWPro.twpro_jobValues.agave.gefahr = 27;
			TWPro.twpro_jobValues.tomato = {};
			TWPro.twpro_jobValues.tomato.erfahrung = 12;
			TWPro.twpro_jobValues.tomato.lohn = 13;
			TWPro.twpro_jobValues.tomato.glueck = 7;
			TWPro.twpro_jobValues.tomato.gefahr = 11;
			TWPro.twpro_jobValues.horseshoe = {};
			TWPro.twpro_jobValues.horseshoe.erfahrung = 28;
			TWPro.twpro_jobValues.horseshoe.lohn = 14;
			TWPro.twpro_jobValues.horseshoe.glueck = 9;
			TWPro.twpro_jobValues.horseshoe.gefahr = 23;
			TWPro.twpro_jobValues.fire = {};
			TWPro.twpro_jobValues.fire.erfahrung = 41;
			TWPro.twpro_jobValues.fire.lohn = 15;
			TWPro.twpro_jobValues.fire.glueck = 65;
			TWPro.twpro_jobValues.fire.gefahr = 45;
			TWPro.twpro_jobValues.orange = {};
			TWPro.twpro_jobValues.orange.erfahrung = 25;
			TWPro.twpro_jobValues.orange.lohn = 14;
			TWPro.twpro_jobValues.orange.glueck = 10;
			TWPro.twpro_jobValues.orange.gefahr = 21;
			TWPro.twpro_jobValues.muck_out = {};
			TWPro.twpro_jobValues.muck_out.erfahrung = 5;
			TWPro.twpro_jobValues.muck_out.lohn = 4;
			TWPro.twpro_jobValues.muck_out.glueck = 2;
			TWPro.twpro_jobValues.muck_out.gefahr = 6;
			TWPro.twpro_jobValues.shoes = {};
			TWPro.twpro_jobValues.shoes.erfahrung = 2;
			TWPro.twpro_jobValues.shoes.lohn = 3;
			TWPro.twpro_jobValues.shoes.glueck = 3;
			TWPro.twpro_jobValues.shoes.gefahr = 2;
			TWPro.twpro_jobValues.socks_darn = {};
			TWPro.twpro_jobValues.socks_darn.erfahrung = 4;
			TWPro.twpro_jobValues.socks_darn.lohn = 1;
			TWPro.twpro_jobValues.socks_darn.glueck = 0;
			TWPro.twpro_jobValues.socks_darn.gefahr = 0;
			TWPro.twpro_jobValues.potatoe = {};
			TWPro.twpro_jobValues.potatoe.erfahrung = 53;
			TWPro.twpro_jobValues.potatoe.lohn = 8;
			TWPro.twpro_jobValues.potatoe.glueck = 5;
			TWPro.twpro_jobValues.potatoe.gefahr = 5;
			TWPro.twpro_jobValues.feed_animal = {};
			TWPro.twpro_jobValues.feed_animal.erfahrung = 60;
			TWPro.twpro_jobValues.feed_animal.lohn = 17;
			TWPro.twpro_jobValues.feed_animal.glueck = 10;
			TWPro.twpro_jobValues.feed_animal.gefahr = 20;
			TWPro.twpro_jobValues.pumpkin = {};
			TWPro.twpro_jobValues.pumpkin.erfahrung = 45;
			TWPro.twpro_jobValues.pumpkin.lohn = 45;
			TWPro.twpro_jobValues.pumpkin.glueck = 10;
			TWPro.twpro_jobValues.pumpkin.gefahr = 10;
			TWPro.twpro_jobValues.blueberries = {};
			TWPro.twpro_jobValues.blueberries.erfahrung = 35;
			TWPro.twpro_jobValues.blueberries.lohn = 52;
			TWPro.twpro_jobValues.blueberries.glueck = 35;
			TWPro.twpro_jobValues.blueberries.gefahr = 15;
			TWPro.twpro_jobValues.plant_trees = {};
			TWPro.twpro_jobValues.plant_trees.erfahrung = 25;
			TWPro.twpro_jobValues.plant_trees.lohn = 34;
			TWPro.twpro_jobValues.plant_trees.glueck = 54;
			TWPro.twpro_jobValues.plant_trees.gefahr = 25;
			TWPro.twpro_jobValues.gather_feathers = {};
			TWPro.twpro_jobValues.gather_feathers.erfahrung = 23;
			TWPro.twpro_jobValues.gather_feathers.lohn = 47;
			TWPro.twpro_jobValues.gather_feathers.glueck = 60;
			TWPro.twpro_jobValues.gather_feathers.gefahr = 15;
			TWPro.twpro_jobValues.lotus_gathering = {};
			TWPro.twpro_jobValues.lotus_gathering.erfahrung = 45;
			TWPro.twpro_jobValues.lotus_gathering.lohn = 54;
			TWPro.twpro_jobValues.lotus_gathering.glueck = 35;
			TWPro.twpro_jobValues.lotus_gathering.gefahr = 20;
			TWPro.twpro_jobValues.crab_hunting = {};
			TWPro.twpro_jobValues.crab_hunting.erfahrung = 56;
			TWPro.twpro_jobValues.crab_hunting.lohn = 67;
			TWPro.twpro_jobValues.crab_hunting.glueck = 35;
			TWPro.twpro_jobValues.crab_hunting.gefahr = 12;
			TWPro.twpro_jobValues.teaching = {};
			TWPro.twpro_jobValues.teaching.erfahrung = 79;
			TWPro.twpro_jobValues.teaching.lohn = 54;
			TWPro.twpro_jobValues.teaching.glueck = 5;
			TWPro.twpro_jobValues.teaching.gefahr = 23;
			TWPro.twpro_jobValues.sheriff_work = {};
			TWPro.twpro_jobValues.sheriff_work.erfahrung = 76;
			TWPro.twpro_jobValues.sheriff_work.lohn = 67;
			TWPro.twpro_jobValues.sheriff_work.glueck = 56;
			TWPro.twpro_jobValues.sheriff_work.gefahr = 45;
			TWPro.twpro_jobValues.sulfur_gathering = {};
			TWPro.twpro_jobValues.sulfur_gathering.erfahrung = 34;
			TWPro.twpro_jobValues.sulfur_gathering.lohn = 76;
			TWPro.twpro_jobValues.sulfur_gathering.glueck = 78;
			TWPro.twpro_jobValues.sulfur_gathering.gefahr = 32;
			TWPro.twpro_jobValues.wildwater = {};
			TWPro.twpro_jobValues.wildwater.erfahrung = 74;
			TWPro.twpro_jobValues.wildwater.lohn = 84;
			TWPro.twpro_jobValues.wildwater.glueck = 30;
			TWPro.twpro_jobValues.wildwater.gefahr = 57;
			TWPro.twpro_jobValues.gambler = {};
			TWPro.twpro_jobValues.gambler.erfahrung = 57;
			TWPro.twpro_jobValues.gambler.lohn = 67;
			TWPro.twpro_jobValues.gambler.glueck = 69;
			TWPro.twpro_jobValues.gambler.gefahr = 63;
			TWPro.twpro_jobValues.rattlesnake = {};
			TWPro.twpro_jobValues.rattlesnake.erfahrung = 46;
			TWPro.twpro_jobValues.rattlesnake.lohn = 72;
			TWPro.twpro_jobValues.rattlesnake.glueck = 71;
			TWPro.twpro_jobValues.rattlesnake.gefahr = 73;
			TWPro.twpro_jobValues.salpeter_gathering = {};
			TWPro.twpro_jobValues.salpeter_gathering.erfahrung = 53;
			TWPro.twpro_jobValues.salpeter_gathering.lohn = 62;
			TWPro.twpro_jobValues.salpeter_gathering.glueck = 58;
			TWPro.twpro_jobValues.salpeter_gathering.gefahr = 27;
			TWPro.twpro_jobValues.horse_transport = {};
			TWPro.twpro_jobValues.horse_transport.erfahrung = 82;
			TWPro.twpro_jobValues.horse_transport.lohn = 66;
			TWPro.twpro_jobValues.horse_transport.glueck = 69;
			TWPro.twpro_jobValues.horse_transport.gefahr = 48;
			TWPro.twpro_jobValues.rodeo = {};
			TWPro.twpro_jobValues.rodeo.erfahrung = 56;
			TWPro.twpro_jobValues.rodeo.lohn = 76;
			TWPro.twpro_jobValues.rodeo.glueck = 69;
			TWPro.twpro_jobValues.rodeo.gefahr = 78;
			TWPro.twpro_jobValues.travelling_salesman = {};
			TWPro.twpro_jobValues.travelling_salesman.erfahrung = 46;
			TWPro.twpro_jobValues.travelling_salesman.lohn = 59;
			TWPro.twpro_jobValues.travelling_salesman.glueck = 97;
			TWPro.twpro_jobValues.travelling_salesman.gefahr = 67;
			TWPro.twpro_jobValues.con_artist = {};
			TWPro.twpro_jobValues.con_artist.erfahrung = 89;
			TWPro.twpro_jobValues.con_artist.lohn = 78;
			TWPro.twpro_jobValues.con_artist.glueck = 35;
			TWPro.twpro_jobValues.con_artist.gefahr = 83;
			TWPro.twpro_jobValues.cougar = {};
			TWPro.twpro_jobValues.cougar.erfahrung = 89;
			TWPro.twpro_jobValues.cougar.lohn = 46;
			TWPro.twpro_jobValues.cougar.glueck = 39;
			TWPro.twpro_jobValues.cougar.gefahr = 93;
			TWPro.twpro_jobValues.alcohol = {};
			TWPro.twpro_jobValues.alcohol.erfahrung = 91;
			TWPro.twpro_jobValues.alcohol.lohn = 74;
			TWPro.twpro_jobValues.alcohol.glueck = 34;
			TWPro.twpro_jobValues.alcohol.gefahr = 56;
			TWPro.twpro_jobValues.lead_gathering = {};
			TWPro.twpro_jobValues.lead_gathering.erfahrung = 72;
			TWPro.twpro_jobValues.lead_gathering.lohn = 89;
			TWPro.twpro_jobValues.lead_gathering.glueck = 22;
			TWPro.twpro_jobValues.lead_gathering.gefahr = 72;
			TWPro.twpro_jobValues.gem_gathering = {};
			TWPro.twpro_jobValues.gem_gathering.erfahrung = 78;
			TWPro.twpro_jobValues.gem_gathering.lohn = 91;
			TWPro.twpro_jobValues.gem_gathering.glueck = 23;
			TWPro.twpro_jobValues.gem_gathering.gefahr = 77;
			TWPro.twpro_jobValues.mission = {};
			TWPro.twpro_jobValues.mission.erfahrung = 82;
			TWPro.twpro_jobValues.mission.lohn = 92;
			TWPro.twpro_jobValues.mission.glueck = 54;
			TWPro.twpro_jobValues.mission.gefahr = 38;
			TWPro.twpro_jobValues.casino = {};
			TWPro.twpro_jobValues.casino.erfahrung = 92;
			TWPro.twpro_jobValues.casino.lohn = 78;
			TWPro.twpro_jobValues.casino.glueck = 23;
			TWPro.twpro_jobValues.casino.gefahr = 47;
			TWPro.twpro_jobValues.marshall = {};
			TWPro.twpro_jobValues.marshall.erfahrung = 90;
			TWPro.twpro_jobValues.marshall.lohn = 87;
			TWPro.twpro_jobValues.marshall.glueck = 60;
			TWPro.twpro_jobValues.marshall.gefahr = 94;
			TWPro.twpro_jobValues.shatter_gang = {};
			TWPro.twpro_jobValues.shatter_gang.erfahrung = 70;
			TWPro.twpro_jobValues.shatter_gang.lohn = 84;
			TWPro.twpro_jobValues.shatter_gang.glueck = 89;
			TWPro.twpro_jobValues.shatter_gang.gefahr = 99;
			TWPro.twpro_jobValues.bankrobbery = {};
			TWPro.twpro_jobValues.bankrobbery.erfahrung = 84;
			TWPro.twpro_jobValues.bankrobbery.lohn = 93;
			TWPro.twpro_jobValues.bankrobbery.glueck = 30;
			TWPro.twpro_jobValues.bankrobbery.gefahr = 89;
			TWPro.twpro_jobValues.free_slaves = {};
			TWPro.twpro_jobValues.free_slaves.erfahrung = 93;
			TWPro.twpro_jobValues.free_slaves.lohn = 84;
			TWPro.twpro_jobValues.free_slaves.glueck = 28;
			TWPro.twpro_jobValues.free_slaves.gefahr = 92;
			TWPro.twpro_jobValues.buffelo_bill = {};
			TWPro.twpro_jobValues.buffelo_bill.erfahrung = 94;
			TWPro.twpro_jobValues.buffelo_bill.lohn = 92;
			TWPro.twpro_jobValues.buffelo_bill.glueck = 65;
			TWPro.twpro_jobValues.buffelo_bill.gefahr = 70;
			
			extra_jobs = ['construct', 'duelshootingatt', 'duelshootingdef', 'duelvigor', 'fortatt', 'fortdef', 'speed', 'regeneration'];
			for(var i=0; i<extra_jobs.length; i++){
				TWPro.twpro_jobValues[extra_jobs[i]] = {'erfahrung':-1, 'lohn':-6, 'glueck':-6, 'gefahr':-1};
			}
		}
		TWPro.twpro_setBonusParsed = false;
		// Setitems
		{
			TWPro.twpro_setBonus = {};
			TWPro.twpro_setBonus.set_sleeper = [];
			TWPro.twpro_setBonus.set_sleeper[1] = {image:"images/items/head/mini/sleep_cap.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[2] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[3] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[4] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[5] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[6] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set = [];
			TWPro.twpro_setBonus.season_set[1] = {image:"images/items/yield/mini/dfgrocket1a.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set[2] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:2};
			TWPro.twpro_setBonus.season_set[3] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:6};
			TWPro.twpro_setBonus.season_set[4] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:15};
			TWPro.twpro_setBonus.season_set[5] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:25};
			TWPro.twpro_setBonus.season_set[6] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:37};
			TWPro.twpro_setBonus.season_set[7] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:52};
			TWPro.twpro_setBonus.season_set[8] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:0};
			TWPro.twpro_setBonus.season_set[9] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:0};
			TWPro.twpro_setBonus.season_set[10] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{},luckBonus:0};
			TWPro.twpro_setBonus.set_indian = [];
			TWPro.twpro_setBonus.set_indian[1] = {image:"images/items/head/mini/indian_hat.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_indian[2] = {};
			TWPro.twpro_setBonus.set_indian[2].bonus = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.attributes.flexibility = 2;
			TWPro.twpro_setBonus.set_indian[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[2].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[2].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[2].speedBonus = 15;
			TWPro.twpro_setBonus.set_indian[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[3] = {};
			TWPro.twpro_setBonus.set_indian[3].bonus = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.attributes.flexibility = 5;
			TWPro.twpro_setBonus.set_indian[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[3].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[3].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[3].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[3].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[3].speedBonus = 30;
			TWPro.twpro_setBonus.set_indian[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[4] = {};
			TWPro.twpro_setBonus.set_indian[4].bonus = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.attributes.flexibility = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.pitfall = 8;
			TWPro.twpro_setBonus.set_indian[4].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.wolf = 50;
			TWPro.twpro_setBonus.set_indian[4].speedBonus = 45;/////////////////// The West shows 44%, but in reality, the speed is 45%!!!
			TWPro.twpro_setBonus.set_indian[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[5] = {};
			TWPro.twpro_setBonus.set_indian[5].bonus = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.attributes.flexibility = 12;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.pitfall = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.animal = 8;
			TWPro.twpro_setBonus.set_indian[5].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.wolf = 50;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.grizzly = 60;
			TWPro.twpro_setBonus.set_indian[5].speedBonus = 60;
			TWPro.twpro_setBonus.set_indian[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman = [];
			TWPro.twpro_setBonus.set_gentleman[1] = {image:"images/items/yield/mini/cane.png",gender:"male",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_gentleman[2] = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.set_gentleman[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[2].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[2].jobBonus.all = 5;
			TWPro.twpro_setBonus.set_gentleman[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[3] = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes.charisma = 3;
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[3].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[3].jobBonus.all = 15;
			TWPro.twpro_setBonus.set_gentleman[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[4] = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes.charisma = 6;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.trade = 8;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[4].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[4].jobBonus.all = 30;
			TWPro.twpro_setBonus.set_gentleman[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[5] = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes.charisma = 10;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.trade = 8;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.appearance = 16;
			TWPro.twpro_setBonus.set_gentleman[5].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[5].jobBonus.all = 50;
			TWPro.twpro_setBonus.set_gentleman[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer = [];
			TWPro.twpro_setBonus.set_dancer[1] = {image:"images/items/yield/mini/umbrella.png",gender:"female",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_dancer[2] = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.attributes.charisma = 2;
			TWPro.twpro_setBonus.set_dancer[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[2].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[2].jobBonus.all = 5;
			TWPro.twpro_setBonus.set_dancer[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[3] = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.attributes.charisma = 5;
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[3].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[3].jobBonus.all = 15;
			TWPro.twpro_setBonus.set_dancer[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[4] = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.attributes.charisma = 9;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.finger_dexterity = 12;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[4].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[4].jobBonus.all = 30;
			TWPro.twpro_setBonus.set_dancer[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[5] = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.attributes.charisma = 11;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.finger_dexterity = 12;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.endurance = 6;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.appearance = 16;
			TWPro.twpro_setBonus.set_dancer[5].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[5].jobBonus.all = 50;
			TWPro.twpro_setBonus.set_dancer[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery = [];
			TWPro.twpro_setBonus.set_quackery[1] = {image:"images/items/yield/mini/potion.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_quackery[2] = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.attributes.dexterity = 1;
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills.endurance = 5;
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills.trade = 5;
			TWPro.twpro_setBonus.set_quackery[2].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[2].jobBonus.quackery = 30;
			TWPro.twpro_setBonus.set_quackery[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[3] = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.attributes.dexterity = 2;
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills.endurance = 10;
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills.trade = 10;
			TWPro.twpro_setBonus.set_quackery[3].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[3].jobBonus.quackery = 60;
			TWPro.twpro_setBonus.set_quackery[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[4] = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.attributes.dexterity = 4;
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills.endurance = 15;
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills.trade = 15;
			TWPro.twpro_setBonus.set_quackery[4].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[4].jobBonus.quackery = 90;
			TWPro.twpro_setBonus.set_quackery[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[5] = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.attributes.dexterity = 6;
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills.endurance = 20;
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills.trade = 20;
			TWPro.twpro_setBonus.set_quackery[5].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[5].jobBonus.quackery = 120;
			TWPro.twpro_setBonus.set_quackery[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[6] = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.attributes.dexterity = 9;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.tough = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.endurance = 20;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.reflex = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.aim = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.shot = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.trade = 20;
			TWPro.twpro_setBonus.set_quackery[6].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[6].jobBonus.quackery = 120;
			TWPro.twpro_setBonus.set_quackery[6].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[6].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican = [];
			TWPro.twpro_setBonus.set_mexican[1] = {image:"images/items/head/mini/mexican_sombrero.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_mexican[2] = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_mexican[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[2].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[2].speedBonus = 12;
			TWPro.twpro_setBonus.set_mexican[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[3] = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus.attributes.strength = 2;
			TWPro.twpro_setBonus.set_mexican[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[3].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[3].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[3].speedBonus = 24;
			TWPro.twpro_setBonus.set_mexican[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[4] = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus.attributes.strength = 4;
			TWPro.twpro_setBonus.set_mexican[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[4].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[4].speedBonus = 36;
			TWPro.twpro_setBonus.set_mexican[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[5] = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus.attributes.strength = 6;
			TWPro.twpro_setBonus.set_mexican[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[5].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.smuggle = 80;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[5].speedBonus = 48;
			TWPro.twpro_setBonus.set_mexican[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[6] = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus.attributes.strength = 9;
			TWPro.twpro_setBonus.set_mexican[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[6].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.dynamite = 90;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.smuggle = 80;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[6].speedBonus = 60;
			TWPro.twpro_setBonus.set_mexican[6].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male = [];
			TWPro.twpro_setBonus.set_pilgrim_male[1] = {image:"images/items/head/mini/pilger_hat.png",gender:"male",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_pilgrim_male[2] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.construct = 5;
			TWPro.twpro_setBonus.set_pilgrim_male[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.construct = 15;
			TWPro.twpro_setBonus.set_pilgrim_male[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.construct = 30;
			TWPro.twpro_setBonus.set_pilgrim_male[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.bible = 150;
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.construct = 50;
			TWPro.twpro_setBonus.set_pilgrim_male[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female = [];
			TWPro.twpro_setBonus.set_pilgrim_female[1] = {image:"images/items/head/mini/pilger_cap.png",gender:"female",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_pilgrim_female[2] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.construct = 5;
			TWPro.twpro_setBonus.set_pilgrim_female[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.construct = 15;
			TWPro.twpro_setBonus.set_pilgrim_female[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.construct = 30;
			TWPro.twpro_setBonus.set_pilgrim_female[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.bible = 150;
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.construct = 50;
			TWPro.twpro_setBonus.set_pilgrim_female[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[5].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set = [];
			TWPro.twpro_setBonus.greenhorn_set[1] = {image:"images/items/neck/mini/greenhorn_neck.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.greenhorn_set[2] = {};
			TWPro.twpro_setBonus.greenhorn_set[2].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[2].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[2].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[2].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[2].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[2].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[2].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[3] = {};
			TWPro.twpro_setBonus.greenhorn_set[3].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[3].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[3].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[3].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[3].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[4] = {};
			TWPro.twpro_setBonus.greenhorn_set[4].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[4].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[4].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[4].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[4].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[5] = {};
			TWPro.twpro_setBonus.greenhorn_set[5].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[5].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[5].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[5].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[5].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[6] = {};
			TWPro.twpro_setBonus.greenhorn_set[6].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[6].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[6].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.cow = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[6].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[6].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[7] = {};
			TWPro.twpro_setBonus.greenhorn_set[7].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[7].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[7].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.all = 5;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.cow = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[7].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[7].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[8] = {};
			TWPro.twpro_setBonus.greenhorn_set[8].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.all = 15;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.cow = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[8].speedBonus = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer = [];
			TWPro.twpro_setBonus.set_farmer[1] = {image:"images/items/yield/mini/pitchfork.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_farmer[2] = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.flexibility = 1;
			TWPro.twpro_setBonus.set_farmer[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[2].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer[3] = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.flexibility = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.dexterity = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[3].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cow = 20;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.wire = 20;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.horseshoe = 20;
			TWPro.twpro_setBonus.set_farmer[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer[4] = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.strength = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.flexibility = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.dexterity = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.charisma = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[4].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cow = 20;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.wire = 20;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.windmeel = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.springe = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.ranch = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.horseshoe = 20;
			TWPro.twpro_setBonus.set_farmer[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[4].parsedBonus = {};
			TWPro.twpro_setBonus.gold_set = [];
			TWPro.twpro_setBonus.gold_set[1] = {image:"images/items/left_arm/mini/golden_rifle.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.gold_set[2] = {};
			TWPro.twpro_setBonus.gold_set[2].bonus = {};
			TWPro.twpro_setBonus.gold_set[2].bonus.attributes = {};
			TWPro.twpro_setBonus.gold_set[2].bonus.skills = {};
			TWPro.twpro_setBonus.gold_set[2].bonus.skills.health = 10;
			TWPro.twpro_setBonus.gold_set[2].jobBonus = {};
			TWPro.twpro_setBonus.gold_set[2].jobBonus.all = 25;
			TWPro.twpro_setBonus.gold_set[2].speedBonus = 20;
			TWPro.twpro_setBonus.gold_set[2].parsedBonus = {};
			TWPro.twpro_setBonus.fireworker_set = [];
			TWPro.twpro_setBonus.fireworker_set[1] = {};
			TWPro.twpro_setBonus.fireworker_set[1].image = "images/items/yield/mini/bucket_fire.png";
			TWPro.twpro_setBonus.fireworker_set[1].gender = "mixed";
			TWPro.twpro_setBonus.fireworker_set[1].bonus = {};
			TWPro.twpro_setBonus.fireworker_set[1].bonus.attributes = {};
			TWPro.twpro_setBonus.fireworker_set[1].bonus.skills = {};
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus = {};
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus.all = 0;
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus.fire = 15;
			TWPro.twpro_setBonus.fireworker_set[1].speedBonus = 0;
			TWPro.twpro_setBonus.fireworker_set[1].parsedBonus = {};

		};
			for(var set in TWPro.twpro_setBonus){
				for(var i=0; i<TWPro.twpro_setBonus[set].length; i++){
					if (TWPro.twpro_setBonus[set][i] && TWPro.twpro_setBonus[set][i].bonus) {
						TWPro.twpro_setBonus[set][i].jobBonus.speed = ((TWPro.twpro_setBonus[set][i].bonus.attributes && TWPro.twpro_setBonus[set][i].bonus.attributes.flexibility || 0)
						+ (TWPro.twpro_setBonus[set][i].bonus.skills && TWPro.twpro_setBonus[set][i].bonus.skills.ride || 0));
					}
				}
			}
			TWPro.set_names = {};
			for(var internal_name in TWPro.twpro_setBonus){
				TWPro.set_names[internal_name] = '<em>'+internal_name+'</em>';
			}
		
		TWPro.twpro_invHash = '';
		TWPro.twpro_itemStorage = {};
		while (TWPro.twpro_active) {
			//alert('// Original AjaxWindow.show:\n'+AjaxWindow.show.toString());
			//alert('// Original Bag.getInstance().add:\n'+Bag.getInstance().add.toString());
			//for(var twpro_i = 0; twpro_i < ItemPopup.prototype.getXHTML.toString().length; twpro_i += 2000)
			//{
			//  alert(((twpro_i == 0)?('// Original ItemPopup.prototype.getXHTML:\n'):(''))+ItemPopup.prototype.getXHTML.toString().substr(twpro_i,2000));
			//}
			var twpro_matchtest;
			if (AjaxWindow.show.toString().search(/evalJS/) == -1) {
				if ((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/eval\(data\.js\);/) == -1)) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('AjaxWindow.show = ' + AjaxWindow.show.toString());
					eval('AjaxWindow.show = ' + AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/, 'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null,params);').replace(/eval\(data\.js\);/, 'TWPro.twpro_injectionSwitch(extendeName,\'js\',data,\'js\',params);try{eval(data.js);}catch(e){new HumanMessage("TW Pro detected an error in AjaxWindow.show: "+e)/*add debug code here*/}TWPro.twpro_injectionSwitch(extendeName,\'after\',data,null,params);'));
				//alert('// TW Pro AjaxWindow.show:\n'+AjaxWindow.show.toString());
			}
			else { if ((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/this\.evalJS\(\);/) == -1)) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('AjaxWindow.show = ' + AjaxWindow.show.toString());
					var newAjaxWindowShow = 'AjaxWindow.show = ' + AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/, 'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null,params);').replace(/this\.evalJS\(\);/, 'this.twpro_extendeName=extendeName;this.twpro_params=params;if(data.js)this.jsContent=data.js;this.evalJS();'),
					newAjax_index = newAjaxWindowShow.lastIndexOf('new Ajax(');
					newAjaxWindowShow = newAjaxWindowShow.substring(0,newAjax_index)+newAjaxWindowShow.substring(newAjax_index).replace(/([^A-Za-z0-9_$])extendeName([^A-Za-z0-9_$])/g, '$1(data.newExtendeName||extendeName)$2');
					eval(newAjaxWindowShow);
				//alert('// TW Pro AjaxWindow.show:\n'+AjaxWindow.show.toString());
				//alert('// Original Ajax.prototype.evalJS:\n'+Ajax.prototype.evalJS.toString());
				if (Ajax.prototype.evalJS.toString().search(/eval\(this\.jsContent\);/) == -1) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('Ajax.prototype.evalJS = ' + Ajax.prototype.evalJS.toString());
				eval('Ajax.prototype.evalJS = ' + Ajax.prototype.evalJS.toString().replace(/eval\(this\.jsContent\);/, 'TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'js\',this,\'jsContent\',this.twpro_params);try{eval(this.jsContent.replace("Merci d\'indiquer","Merci d\\\\\'indiquer").replace("C\'est un petit","C\\\\\'est un petit"));}catch(e){new HumanMessage("TW Pro detected an error in Ajax.evalJS: "+e)/*add debug code here*/;}TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'after\',this,null,this.twpro_params);')); // Zyphir : temporary bugfix for fr worlds
				//alert('// TW Pro Ajax.prototype.evalJS:\n'+Ajax.prototype.evalJS.toString());
			}
			WEvent.register('inventory_add', {
				exec: function(data){data=typeof data=='string'?Json.evaluate(data[0]):data[0];setTimeout(TWPro.twpro_changeItem, 0, {inv_id:data.inv_id})}
			});
			WEvent.register('inventory_remove', {
				exec: function(inv_id){setTimeout(TWPro.twpro_changeItem, 0, {inv_id:inv_id,deleted:1})}
			});
			if (Bag.getInstance().add.toString().search(/}, *('*)over/) == -1) {
				TWPro.twpro_failureInject = true;
				break;
			}
			twpro_matchtest = Bag.getInstance().add.toString().match(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g);
			if (twpro_matchtest == null || twpro_matchtest.length != 3) {
				TWPro.twpro_failureInject = true;
				break;
			}
			TWPro.twpro_failureRollback.unshift('Bag.getInstance().add = ' + Bag.getInstance().add.toString());
			eval('Bag.getInstance().add = ' + Bag.getInstance().add.toString().replace(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g, '(TWPro.twpro_activeJob())?($1$1):($1wear_$1+item.get_type()+$1_highlight$1)'));
			if (ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *(['"])<span class=(\\*)"item_popup_trader_price/) == -1) {
				TWPro.twpro_failureInject = true;
				break;
			}
			TWPro.twpro_failureRollback.unshift('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString());
			eval('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *['"]<span class=\\*"item_popup_damage\\*">*['"] *\+ item.damage.damage_min *\+ *['"]-*['"] *\+ item.damage.damage_max *\+ *['"] *['"] *\+ *['"]*([^"]+)/, 'xhtml += "<span class=\\"item_popup_damage\\">" + item.damage.damage_min + "-" + item.damage.damage_max + " " + "$1<br \/><span style=\\"font-size:11px;font-weight:normal;font-style:italic\\">&nbsp;&nbsp;" + (item.damage.damage_min+item.damage.damage_max)/2 + " "+TWPro.lang.AVERAGEDAMAGE+"<\/span>'));
			eval('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *(['"])<span class=(\\*)"item_popup_trader_price/, 'xhtml+=TWPro.twpro_popup(item);xhtml+=$1<span class=$2"item_popup_trader_price'));
			//for(var twpro_i = 0; twpro_i < ItemPopup.prototype.getXHTML.toString().length; twpro_i += 2000)
			//{
			//  alert(((twpro_i == 0)?('// TW Pro ItemPopup.prototype.getXHTML:\n'):(''))+ItemPopup.prototype.getXHTML.toString().substr(twpro_i,2000));
			//}
			break;
		}
        
   
		TWPro.twpro_world = location.hostname.match(/^[^.]+/)[0];
		var twpro_support = document.createElement('div');
		twpro_support.id = 'twpro_support';
		twpro_support.style.cssText = 'position:absolute; color:#656565; font-size:10px; margin-left:2px; z-index:2';
		var twpro_supportLink = document.createElement('a');
		twpro_supportLink.id = 'twpro_supportLink';
		twpro_supportLink.href = 'http://userscripts.org/scripts/show/93313';
		twpro_supportLink.target = '_blank';
		twpro_supportLink.appendChild(document.createTextNode('v'+twpro_version));
		var twpro_supportAuthor = document.createElement('a');
		twpro_supportAuthor.id = 'twpro_supportAuthor';
		twpro_supportAuthor.style.cursor = 'help';
		twpro_supportAuthor.appendChild(document.createTextNode("[+++]"));
		twpro_support.appendChild(document.createTextNode("TW Pro+: "));
		twpro_support.appendChild(twpro_supportLink);
		twpro_support.appendChild(document.createTextNode(' '+TWPro.lang.AUTHOR+': '));
		twpro_support.appendChild(twpro_supportAuthor);
		var translator = TWPro.lang.info;
		if(translator && translator.length){
			var twpro_translatorLink = document.createElement('a');
			twpro_translatorLink.appendChild(document.createTextNode(translator[0]));
			if(translator.length > 1){
				if(translator.length > 3 && translator[3].indexOf('.'+location.host.match(/\w+\./)) != -1){
					twpro_translatorLink.href = 'javascript:AjaxWindow.show("profile",{char_id:'+translator[2]+'},"'+translator[2]+'");';
				}
				else{
					twpro_translatorLink.href = translator[1];
					twpro_translatorLink.target = '_blank';
				}
			}
			twpro_support.appendChild(document.createTextNode(" "+TWPro.lang.TRANSLATOR+": "));
			twpro_support.appendChild(twpro_translatorLink);
		}
			twpro_support.appendChild(document.createTextNode(" ["));
			var langChanger = document.createElement("a");
			langChanger.appendChild(document.createTextNode("Change language"));
			langChanger.href = "javascript://Change language";
			langChanger.onclick = function() {
			  var newlang = prompt("LANGUAGE PACK\n\n Visit your community forum to know if there is one for your language or learn how to make your own at this page: http://userscripts.org/scripts/show/94133\n\n For French language, you can just type \"fr\" in this box.\n\nPlease enter a valid language pack url:\n", (localStorage.getItem("TWPro_LanguagePack") ? decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) : "http://"));
			  if (newlang != null) {
				if (newlang.length > 7 || newlang == "fr") {
				  if (decodeURIComponent(localStorage.getItem("TWPro_LanguagePack")) != newlang) new HumanMessage("Language pack applied.<br><br>Please refresh your page (press F5).", {type:'success'});
				  window.twpro_initLanguage(newlang);
				}
				else {
				  localStorage.removeItem("TWPro_LanguagePack")
				}
			  }
			};
			twpro_support.appendChild(langChanger);
			twpro_support.appendChild(document.createTextNode("]"));
		if (!TWPro.twpro_active) {
			twpro_support.appendChild(document.createTextNode(" ("+TWPro.lang.TWPRO_DISABLED+")"));
		}
		var flags = 'data:image/gif;base64,R0lGODlhPgAKAMQaAAAAAK4cKMYLHv7LAO0pOeJnD5MAAOSzt//EAP3DAtaVDN0AAP///+KxD6NODrWKWc2KLYhAIKl5cehFALXB2M6sLLl8Fb5rG//OACFGi////wAAAAAAAAAAAAAAAAAAACH5BAHoAxoALAAAAAA+AAoAAAWXICCOZCkGaKquQuu+cDnMM2HbZk6uvAr/LxltcMPpdL1kYclsOoW0IsFArVqv1IN2y+0ivgmFIvEtl6G14mLNbrvXjLh8Ti83HI+G2Ywmqt+AbHSDc2UQERIQe2ckQ343E5GSk5SRFJeYmZplFRYXFYtffVIYpaanqKUZq6ytrk6wTaNFqbWnrritQLuzN7a/ucG7QL02IQA7'
		var ib = document.getElementById('main_footnotes');
		ib.insertBefore(twpro_support, ib.firstChild);
		$(twpro_supportAuthor.id).addMousePopup(new MousePopup('<table cellspacing="0" cellpadding="0"><tr><td>Author:</td><td>Nexton<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')0px;width:17px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td>Lekensteyn<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-17px;width:15px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td>Sandevil<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-32px;width:15px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td>Pedro Ramirez<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')0px;width:17px;height: 10px;"></div></td></tr><tr><td>This release:&nbsp;</td><td>Zyphir Randrott<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-47px;width:15px;height: 10px;"></div></td></tr></table>'));
		if (TWPro.twpro_failureInject) {
			TWPro.twpro_throwFailure();
		}
	}

    


	function twpro_preference(pref, enabledValue){
		if(!(pref in TWPro.prefs)) return false;
		var prefVal = TWPro.prefs[pref];
		if(typeof enabledValue == 'undefined'){
			if(typeof prefVal != 'number') return prefVal;
			return TWPro.prefNumber & prefVal;
		}
		if(typeof prefVal != 'number'){
			document.cookie = 'twpro_'+Character.playerId+'_'+pref+'='+enabledValue+'; max-age=5184000';
			return enabledValue;
		}
		if(enabledValue) TWPro.prefNumber |= prefVal;
		else TWPro.prefNumber = (TWPro.prefNumber | prefVal) - prefVal;
		document.cookie = 'twpro_'+Character.playerId+'_prefs='+TWPro.prefNumber+'; max-age=5184000';
		return enabledValue;
	}

	function twpro_throwFailure() {
		if (TWPro.twpro_failure) return;
		TWPro.twpro_failure = true;
		for (var twpro_i = 0; twpro_i < TWPro.twpro_failureRollback.length; twpro_i++) {
			eval(TWPro.twpro_failureRollback[twpro_i]);
		}
	}

	function twpro_injectionSwitch(twpro_extendeName, twpro_injectionType, twpro_data, twpro_jsversion, twpro_params) {
		if (TWPro.twpro_failure) return;
		if (!twpro_extendeName) {
			return;
		} else
//		alert(twpro_extendeName+"\n\n"+twpro_injectionType+"\n\n"+twpro_data[twpro_jsversion]);
		switch (twpro_injectionType) {
		case 'page':
			{
				if (twpro_extendeName == 'inventory') {
						TWPro.twpro_internalWindowToTop("window_inventory");
						TWPro.twpro_insertList(twpro_data);
					}
					else if(twpro_extendeName == 'item_trader'){
						TWPro.twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion);
					}
					else if(twpro_extendeName.substr(0, 16) == 'building_market_'){
						var town_id = twpro_extendeName.match(/\d+/),
						market_id = twpro_data.page.match(/InventoryTownTraderControl\(AjaxWindow\.getWindowDivId\('market',\d+\)\), 'market', '(\d+)'\);/);
						if(!town_id || !market_id) return;
						market_id = market_id[1];
						TWPro.searchTrader[town_id] = {timer:null};
						(new Image()).src = twpro_loadingSearchImg;
						twpro_data.page = twpro_data.page.replace(/top:18px' id="market_\d+_inv_div"><\/div>/, 'height:350px;$&<div style="margin-top:19px;position:relative;"><label style="position:absolute;top:4px;left:21px;font-style:italic;color:#636;cursor:pointer" for="twpro_market_'+town_id+'_search" class="twpro_lang_SEARCHINVENTORY">'+TWPro.lang.SEARCHINVENTORY+'</label><input type="text" style="width:150px;background:#F0CD8B url(data:image/png;base64,'+twpro_searchButtonImg+') no-repeat scroll 0 0;padding:0 2px 0 19px" id="twpro_market_'+town_id+'_search" onfocus="previousSibling.style.display=\'none\'" onblur="if(this.value==\'\')previousSibling.style.display=\'block\'" onkeyup="TWPro.twpro_searchTrader(event.keyCode==13,null,'+town_id+', '+market_id+')" /><span id="twpro_search_help" style="font-weight:bold;color:#191970;cursor:help;background:#D4C7B0;width:20px;height:17px" title="'+TWPro.lang.SEARCHHELP+'">?</span></div>');
				}
				else if(twpro_extendeName.substr(0, 4) == 'job_' || twpro_extendeName.substr(0, 15) == 'cityhall_build_'){
						var workSpeed = (twpro_data.js ? twpro_data.js.match(/JobCalculation\.workSpeed\s*=\s*([^;]+);/) : JobCalculation.workSpeed)||[,1];
						var hours = workSpeed[1] * 2,
							seconds = hours * 3600;
						twpro_data.page = twpro_data.page.replace(new RegExp('(value="'+seconds+'")( label="'+hours+' .+?")?>'+hours+' '), '$1$2 selected="selected">'+hours+' ');
					}
				else if(twpro_extendeName.substr(0, 13) == 'reports_show_'){
						if(twpro_data.page.match(/<object /)){
							twpro_data.page = twpro_data.page.replace('width: 460px; height: 270px;', 'width: 414px; height: 243px;').replace(/height="270"/g, 'height="243"').replace(/width="460"/g, 'width="414"').replace('</object>', '</object><br />');
						}
					twpro_data.page = convertduelreport('window_'+twpro_extendeName, twpro_data.page);
				}
/*				else if(twpro_extendeName.substr(0, 7) == 'profile' && twpro_params){
				// hack to have one profile window 
					if(typeof twpro_params.player_name == "string"){
						var char_id = twpro_data.page.match(/WMap\.scroll_map_to_player\((\d+)\);/),
						profile_name = 'profile_'+decodeURIComponent(twpro_params.player_name);
						if(!char_id) break;
						twpro_params.char_id = char_id[1]; 
						char_id = 'profile_'+char_id[1];
						var oldWindow = document.getElementById("window_"+char_id);
						if(oldWindow){
							document.getElementById("window_"+profile_name).style.cssText = oldWindow.style.cssText;
							AjaxWindow.close(char_id);
						}
						document.getElementById("window_"+profile_name).id = "window_"+char_id;
						document.getElementById("window_"+profile_name+"_title").id = "window_"+char_id+"_title";
						document.getElementById("window_"+char_id+"_title").firstChild.innerHTML = "window_"+char_id+"_title";
						document.getElementById("window_"+profile_name+"_content").id = "window_"+char_id+"_content";
						twpro_profile = document.getElementById("window_"+char_id).getElementsByTagName("a");
						twpro_profile[0].href = "javascript:AjaxWindow.show('profile',{char_id:'"+char_id.substr(8)+"'}, '"+char_id.substr(8)+"');";
						twpro_profile[2].href = decodeURIComponent(twpro_profile[1].href).replace(profile_name, char_id);
						twpro_profile[3].href = decodeURIComponent(twpro_profile[2].href).replace(profile_name, char_id);
						twpro_data.page = twpro_data.page.replace(new RegExp(profile_name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "gi"), char_id);
						twpro_data.js = twpro_data.js.replace(new RegExp(profile_name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "gi"), char_id);
						AjaxWindow.windows[char_id] = AjaxWindow.windows[profile_name];
						AjaxWindow.windows[profile_name] = null;
						delete twpro_params.player_name;
						delete AjaxWindow.windows[profile_name];
						twpro_data.newExtendeName = char_id;
						
					}
				}*/
				else if(twpro_extendeName.substr(0,15) == 'building_saloon' ){
	 			 var twpro_advice_elementid="window_"+twpro_extendeName;
				  var twpro_advice_elementin=$(twpro_advice_elementid);
					if (Character.name == 'William Manney' || Character.name == 'Sandevil' || Character.name == 'Belgo' || Character.name == 'Manolkin' || Character.name == 'Coprofagia'  || Character.name == 'cliff hamett' || Character.name == 'walkerutebo' || Character.name == 'igmu' || Character.name == 'henryque' || Character.name == 'Ambrosio II' || Character.name == 'Zebx') {
	 				 twpro_data.page = makeadvicemessage(twpro_advice_elementin, twpro_data.page);
					}
    			       }
				break;
			}
		case 'js':
			{
				if ((twpro_extendeName == 'inventory') || (twpro_extendeName.substr(0, 15) == 'building_tailor') || (twpro_extendeName.substr(0, 17) == 'building_gunsmith') || (twpro_extendeName.substr(0, 16) == 'building_general')) {
					TWPro.twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion);
				}
				else if(twpro_extendeName.substr(0, 7) == 'profile'){
					if(typeof twpro_params.player_name == "string"){
						var char_id = twpro_data.page.match(/WMap\.scroll_map_to_player\((\d+)\);/),
						profile_name = 'profile_'+decodeURIComponent(twpro_params.player_name);
						if(!char_id) break;
						twpro_data.js = twpro_data.js.replace(new RegExp(profile_name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "gi"), char_id);
						twpro_data.js = "alert(1)";
						AjaxWindow.windows[char_id] = AjaxWindow.windows[profile_name];
						AjaxWindow.windows[profile_name] = null;
						delete twpro_params.player_name;
						delete AjaxWindow.windows[profile_name];
						twpro_data.newExtendeName = char_id;
						
					}
					try{
						var who = twpro_data.response.text.match(/messages', {addressee:'([^']+)'}/);
						if(who){
							try{
								who = Json.evaluate('"'+who[1]+'"');
							}
							catch(e){
								who = null;
							}
						}
						if(!who){
							who = $('window_'+twpro_extendeName).getElement('.char_name');
							who = (who.textContent ? who.textContent : who.innerText).replace(/^\s+/, '').replace(/ \([^)]+\)$/, '');
						}

						if(who) (new Ajax('/game.php?window=ranking&mode=ajax_duels',
						{
							data: {
								type: 'duels',
								page: 0,
								skill: 0,
								search: who,
								rank: 0,
								action: 'search'
							},
							method: 'post',
							onComplete: function(resp){
								if(resp){
									var re=new RegExp("'"+twpro_extendeName.substr(8)+"'\\);\\\\\">[^<]+<\\\\\\/a><\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>\\d+<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(\\d+)<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(\\d+)<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(-?\\d+)<"), d = resp.match(re);
									if(d){
											var tr = document.createElement('tr'),
												td = document.createElement('td');
											td.colSpan = '2';
											td.style.cssText = "max-width:212px;font-size:8pt;";
											var trans = resp.match(/("gew|"ver|diff)\\">[^.<]+/g);
											td.appendChild(document.createTextNode(eval('"' + trans[0].substr(7) + ": " + d[1] + " | " + trans[1].substr(7) + ": " + d[2] + " | " + trans[2].substr(7) + ": " + d[3] + '"')));
											tr.appendChild(td);
											var rp = $('window_'+twpro_extendeName).getElement('.rank').parentNode;
											rp.nextSibling.nextSibling.cells[0].style.padding = '0';
											rp.parentNode.insertBefore(tr, rp.nextSibling);
											rp.parentNode.parentNode.style.borderCollapse = 'collapse';
									}
								}
							}
						})).request();
					}
					catch(e){}
				}
				break;
			}
		case 'after':
			{

				if (twpro_extendeName == 'inventory') {
					var specialMessageDiv = document.getElementById("twpro_specialMessage");
					if(specialMessageDiv) specialMessageDiv.innerHTML = "";
					else{
						specialMessageDiv = document.createElement("div");
						specialMessageDiv.id = "twpro_specialMessage";
						specialMessageDiv.style.cssText = "position: absolute; font-size: 10px; color:#ffffff; top: 0px; padding-top: 2px; height: 2em; left: 375px; overflow: hidden; width: 200px; z-index: 1; font-weight:normal;";
						document.getElementById("window_inventory_title").appendChild(specialMessageDiv);
					}
					var twpro_aktuelleapvalueDiv = document.getElementById("twpro_aktuelleapvalue");
					if(twpro_aktuelleapvalueDiv) twpro_aktuelleapvalueDiv.innerHTML = "";
					else{
						twpro_aktuelleapvalueDiv = document.createElement("div");
						twpro_aktuelleapvalueDiv.id = "twpro_aktuelleapvalue";
						twpro_aktuelleapvalueDiv.style.cssText = "position:absolute;right:80px;top:-4px;border-style:solid;border-width:1px;padding:2px;font-size:13px;color:#000000;visibility:hidden;";
						document.getElementById("window_inventory_title").appendChild(twpro_aktuelleapvalueDiv);
					}
					TWPro.twpro_showList();
				} else if(twpro_extendeName.substr(0,15) == 'fort_battlepage' ){
				 var twpro_fort_elementid="window_"+twpro_extendeName;
				  var twpro_fort_elementin=$(twpro_fort_elementid);
	 				 makefortmessage(twpro_fort_elementin);
			    } else if (twpro_extendeName == 'messages') {
				  document.getElementById('tab_write').firstChild.style.width = '610px';
				  var messagebox = document.getElementById('write_table');
				  messagebox.parentNode.style.cssText = 'overflow: auto; height: 397px; width: 595px;';
				  messagebox.style.width = '575px';
				  messagebox = messagebox.getElementById('text');
				  insertbbcodesfunc(messagebox, false);
			    }
				else if(twpro_extendeName.substr(0, 15) == 'building_hotel_'){
				  var twpro_table_rooms = document.querySelector('table.rooms');
				  if (twpro_table_rooms) {
					for (var i=twpro_table_rooms.getElementsByTagName('input').length-1;i>=0;i--)	{
					  if (!twpro_table_rooms.getElementsByTagName('input')[i].disabled && (twpro_table_rooms.getElementsByClassName('costs')[i].innerHTML.indexOf('$') == -1 || i == 0)){
						  twpro_table_rooms.getElementsByTagName('input')[i].checked = "checked";
						  break;
					  }
					}
				  }
				}
				else if(twpro_extendeName.substr(0, 15) == 'building_tailor' || twpro_extendeName.substr(0, 17) == 'building_gunsmith' || twpro_extendeName.substr(0, 16) == 'building_general'){
					try{
						var ins = $('window_'+twpro_extendeName+'_content').getElement('#own_inv_div h2'),
							stu = $('window_'+twpro_extendeName+'_content').getElements('.own_inv .bag_item'),
							but = document.createElement('button'),
							bas = document.createElement('input');
						but.style.cssText = 'font-size:small;position:absolute;right:9px';
						bas.style.cssText = 'bottom:25px;float:right;font-size:small;font-weight:bold;right:3px;opacity:.7;overflow:hidden;position:relative;z-index:2;text-align:center;width:18px;height:16px;';
						bas.type = 'text';
						bas.className = 'lkn_shopsell';
						but.innerHTML = TWPro.lang.MULTISEL;
						but.onclick = function(){
							but.disabled = true;
							for(var i=0, wat, count; i<stu.length; i++){
								wat = bas.cloneNode(false);
								if(!stu[i].getElementsByTagName('p').length){
									wat.readonly = 'readonly';
									wat.onclick = function(){
										this.value = this.value == 1 ? '' : 1;
									};
								}
								else{
									wat.onclick = function(){
										var all = this.parentNode.getElementsByTagName('p')[0].innerHTML;
										this.value = this.value == all ? '' : all;
										this.select();
									};
									wat.maxLength = 2;
									wat.onblur = function(){
										var n = Math.max(parseInt(this.value, 10) || 0, 0);
										n = Math.min(n, this.parentNode.getElementsByTagName('p')[0].innerHTML);
										this.value = n == '0' ? '' : n;
									};
								}
								stu[i].appendChild(wat);
							}
							but.innerHTML = TWPro.lang.SELL;
							but.onclick = function(){
								but.disabled = true;
								var sellList = [], building = twpro_extendeName.match(/building_[^_]+/)+'',
								baseUrl='game.php?window='+building+'&action=sell&h='+h, town_id=twpro_extendeName.match(/\d+/);
								for(var i=0, n; i<stu.length; i++){
									if((n=1*stu[i].getElement('.lkn_shopsell').value)){
										sellList.push([stu[i].id.substr(5), n]);
									}
								}
								if(!sellList.length){
									alert(TWPro.lang.NONESELECTED);
									but.disabled = false;
								}
								else if(confirm(TWPro.lang.CONFIRMSELL.replace(/%1/g, sellList.length))){
									var that = this;
									this.innerHTML = TWPro.lang.SELLING + ' (0/'+sellList.length+')';
									var sold = 0, errors = [];
									function sellStuff(inv_id, count){
										(new Ajax(baseUrl, {
											method: 'post',
											data: {
												inv_id: inv_id,
												town_id: town_id,
												count: count
											},
											onComplete: function(data){
												sold++;
												that.innerHTML = TWPro.lang.SELLING + ' ('+sold+'/'+sellList.length+')';
												data = Json.evaluate(data);
												if(data.error[0]){
													errors.push(data.error[1]);
												}
												else{
													Character.set_money(data.money);
													WEvent.trigger('inventory_remove', [inv_id]);
												}
												if(sold == sellList.length){
													that.innerHTML = TWPro.lang.SELL;
													that.disabled = false;
													new HumanMessage(TWPro.lang.SALEDONE, {type:'success'});
													if(errors.length){
														alert('Sale errors:\n'+errors.join('\n'));
													}
													AjaxWindow.show(building, {town_id:town_id}, town_id);
												}
											}.bind(this)
										})).request();
									}
									for(var i=0; i<sellList.length; i++){
										sellStuff(sellList[i][0], sellList[i][1]);
									}
								}
								else{
									but.disabled = false;
								}
							};
							but.disabled = false;
						};
						ins.parentNode.insertBefore(but, ins);
					}
					catch(e){}
				}
				break;
			}
		}
	}


		var skill_to_AttNum = {
			build: ["strength", 0],
			punch: ["strength", 1],
			tough: ["strength", 2],
			endurance: ["strength", 3],
			health: ["strength", 4],
	
			ride: ["flexibility", 0],
			reflex: ["flexibility", 1],
			dodge: ["flexibility", 2],
			hide: ["flexibility", 3],
			swim: ["flexibility", 4],
	
			aim: ["dexterity", 0],
			shot: ["dexterity", 1],
			pitfall: ["dexterity", 2],
			finger_dexterity: ["dexterity", 3],
			repair: ["dexterity", 4],
	
			leadership: ["charisma", 0],
			tactic: ["charisma", 1],
			trade: ["charisma", 2],
			animal: ["charisma", 3],
			appearance: ["charisma", 4]
		};
		function twpro_bestLifeRestore(){
			var bag_items = Bag.getInstance().items, wear={}, iid, type, item, order=[], i, setcount=0,
			dlife = Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?20:15):10,
			lifes = 90 + 10 * Character.level + dlife * Character.skills.health, newlifes,
			sleeper_bonuses =
				[	[.00,  00]/*0*/,
					[.00, .06]/*1*/,
					[.06, .02]/*2*/,
					[.08, .04]/*3*/,
					[.12, .06]/*4*/,
					[.18, .07]/*5*/,
					[.25,  00]/*6*/
				],
			twpro_job = {
				twpro_calculation: "(90 + 10 * Character.level + (Character.characterClass=='soldier'?(PremiumBoni.hasBonus('character')?20:15):10) * ((Character.bonus.attributes.health||0) + (Character.skills.health||0))) * TWPro.twpro_sleeperBonus()",
				malus: -1,
				name: TWPro.lang.REGENERATION,
				shortName: "regeneration",
				twpro_jobid: 0,//////////// TWPro.twpro_jobs.length
				twpro_skill: Character.skills.health,////// min level
				twpro_skills: "0",
				twpro_attributes: "0",
				twpro_bestStats: {},
				twpro_aps: 0,
				twpro_parsedItemBonus: {},// Set items...
				twpro_bestCombi: {},// Set items...
				twpro_noSetAps: 0,
//				luckItemValue: 0,
//				money: 0,
				maxlifes: 0,
				sleepCount: 0
			},
			bestStats, items,
			mexican=1,
			donkey=[];
			
			for(type=0; type<TWPro.twpro_bag.twpro_types.length; type++){
				wear[TWPro.twpro_bag.twpro_types[type]] = [[]/*sleeper item & best item*/, [{twpro_jobbonus:{regeneration:0}}]/*lifepoints bonus item*/, []/*Mexican set?*/];
			}
			for(type in Wear.wear){
				if((item=Wear.wear[type].obj) && item.set && item.set.key == "set_sleeper" && TWPro.twpro_wearItem(item)){
					if(!wear[item.type][0][0]) setcount++;
					wear[item.type][0].push(item);
				}
				else if(item.bonus && (newlifes=(item.bonus.skills && item.bonus.skills.health || 0)+(item.bonus.attributes && item.bonus.attributes.strength || 0)) && TWPro.twpro_wearItem(item)){
					if(!item.twpro_jobbonus) item.twpro_jobbonus = {};
					if(!TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus = {};
					TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus.regeneration = item.twpro_jobbonus.regeneration = dlife * newlifes;
					if(dlife*newlifes == wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1].push(item);
					}
					else if(dlife*newlifes > wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1] = [item];
					}
				}
				if(item.set && item.set.key == "set_mexican" && TWPro.twpro_wearItem(item)){
					if(item["short"] == "donkey"){
						donkey.push(item);
					}
					else wear[item.type][2].push(item);
				}
			}
			for(iid in bag_items){
				if((item=bag_items[iid].obj) && item.set && item.set.key == "set_sleeper" && TWPro.twpro_wearItem(item)){
					if(!wear[item.type][0][0]) setcount++;
					wear[item.type][0].push(item);
				}
				else if(item.bonus && (newlifes=(item.bonus.skills && item.bonus.skills.health || 0)+(item.bonus.attributes && item.bonus.attributes.strength || 0)) && TWPro.twpro_wearItem(item)){
					if(!item.twpro_jobbonus) item.twpro_jobbonus = {};
					if(!TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus = {};
					TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus.regeneration = item.twpro_jobbonus.regeneration = dlife * newlifes;
					if(dlife*newlifes == wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1].push(item);
					}
					else if(dlife*newlifes > wear[item.type][1][0].twpro_jobbonus.regeneration){
						wear[item.type][1] = [item];
					}
				}
				if(item.set && item.set.key == "set_mexican" && TWPro.twpro_wearItem(item)){
					if(item["short"] == "donkey"){
						donkey.push(item);
					}
					else wear[item.type][2].push(item);
				}
			}
			
			for(type in wear){
				if(wear[type][1][0].twpro_jobbonus.regeneration){
					order.push(wear[type][1]);
				}
			}
			order.sort(function(x,y){return y[0].twpro_jobbonus.regeneration-x[0].twpro_jobbonus.regeneration;});
			
			for(i=order.length-1; i>=0; i--){
				type = order[i][0].type;
				if(!wear[type][0][0]){
					wear[type][0] = order[i];
					lifes += order[i][0].twpro_jobbonus.regeneration;
					order.splice(i, 1);
				}
			}
			for(i=0; i<order.length; i++){
				type = order[i][0].type;
				newlifes = lifes + order[i][0].twpro_jobbonus.regeneration;
				if(lifes * (1+sleeper_bonuses[setcount--][0]) < newlifes * (1+sleeper_bonuses[setcount][0])){
					wear[type][0] = order[i];
					lifes = newlifes;
					continue;
				} else{
					// All other sleeper set items will > the other Lifepoints clothing
					setcount++;
					break;
				}
			}
			if(donkey.length){//if a donkey exists, mexican=1 counts for donkey
				nextWearType:for(type in wear){
					if(!wear[type][0][0] && wear[type][2][0]){
						mexican++;
					}
					else{
						for(i=0; i<wear[type][0].length; i++){
							if(wear[type][0][i].set && wear[type][0][i].set.key == "set_mexican"){
								mexican++;
								continue nextWearType;
							}
						}
						wear[type][2] = [];
					}
				}
				if(mexican > 1){
					for(type in wear){
						if(wear[type][2][0]){
							for(i=0; i<wear[type][2].length; i++){
								if(!wear[type][2][i].twpro_jobbonus) wear[type][2][i].twpro_jobbonus = {regeneration:0};
								wear[type][2][i].twpro_jobbonus.regeneration++;
							}
							wear[type][0] = wear[type][2];
						}
					}
					var mexicanLifes = [0, 0, 1, 2, 4, 5, 9][mexican]*dlife;
					for(i=0; i<donkey.length; i++){
						if(!donkey[i].twpro_jobbonus) donkey[i].twpro_jobbonus = {};
						donkey[i].twpro_jobbonus.regeneration = mexicanLifes;
					}
					wear["animal"][0] = donkey;
					lifes += mexicanLifes;
					twpro_job.twpro_bestAnimal = mexicanLifes;
				}
			}
			for(type in wear){
				items = wear[type][0];
				item = items[0];
				if(!items[0]) bestStats = 0;
				else if(item.set && item.set.key == "set_sleeper"){
					bestStats = Math.round(sleeper_bonuses[setcount][0] * lifes);
				}
				else{
					bestStats = item.twpro_jobbonus.regeneration;
				}
				twpro_job.twpro_bestStats[type] = bestStats;
				for(i=0; i<items.length; i++){
					if(!items[i].twpro_jobbonus) items[i].twpro_jobbonus = {};
					if(!TWPro.twpro_itemStorage[items[i].item_id].twpro_jobbonus) TWPro.twpro_itemStorage[items[i].item_id].twpro_jobbonus = {};
					TWPro.twpro_itemStorage[items[i].item_id].twpro_jobbonus.regeneration = items[i].twpro_jobbonus.regeneration = bestStats;
					TWPro.twpro_itemStorage[items[i].item_id].twpro_bonus = items[i].twpro_bonus = true;
					
				}
			}
			twpro_job.maxlifes = lifes;
			twpro_job.sleepCount = setcount;
			TWPro.twpro_jobValues.regeneration.laborp = twpro_job.twpro_skill = twpro_job.twpro_aps = twpro_job.twpro_noSetAps = Math.round(lifes * (1+sleeper_bonuses[setcount][0]));
			return twpro_job;
		}
		function twpro_sleeperBonus(sleepCount){
			var type,
			sleeper_bonuses =
				[	[.00,  00]/*0*/,
					[.00, .06]/*1*/,
					[.06, .02]/*2*/,
					[.08, .04]/*3*/,
					[.12, .06]/*4*/,
					[.18, .07]/*5*/,
					[.25,  00]/*6*/
				];
			if(!(1*sleepCount) || isNaN(sleepCount)){
				sleepCount = 0;
				for(type in Wear.wear){
					if(Wear.wear[type].obj.set && Wear.wear[type].obj.set.key == "set_sleeper") sleepCount++;
				}
			}
			return 1+sleeper_bonuses[sleepCount][0];
		}


	function twpro_activeJob() {
		if (TWPro.twpro_failure) return false;
		return TWPro.twpro_calculated && document.getElementById("twpro_jobList") && document.getElementById("twpro_jobList").selectedIndex != 0;
	}

	function twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion) {
		//alert('2: '+twpro_extendeName);
		if (TWPro.twpro_failure) return;
		if (twpro_extendeName == 'inventory') {
			if (twpro_data[twpro_jsversion].search(/wear_content\[i\]\);(\s*)\}/) == -1) {
				//alert('1');
				TWPro.twpro_throwFailure();
				return;
			}
			if (twpro_data[twpro_jsversion].search(/bag_content\[i\]\);(\s*)\}/) == -1) {
				//alert('2');
				TWPro.twpro_throwFailure();
				return;
			}

			twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace(/wear_content\[i\]\);(\s*)\}/, 'wear_content[i]);$1};TWPro.twpro_initializeItems(\'wear\',null);').replace(/bag_content\[i\]\);(\s*)\}/, 'bag_content[i]);$1};TWPro.twpro_initializeItems(\'bag\',null);');
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
		}
		else if(twpro_extendeName == 'item_trader'){
			twpro_data.page = twpro_data.page.replace(/var trader_inv/, 'TWPro.twpro_initializeItems(\'own\',playerInventory);var trader_inv').replace(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/, 'trader_inv[i],$1$2$1);$3};TWPro.twpro_initializeItems(\'trader\',traderInventory);');
		}
		else { if (twpro_data[twpro_jsversion].search(/var trader_inv/) == -1) {
				//alert('3');
				TWPro.twpro_throwFailure();
				return;
			}
			if (twpro_data[twpro_jsversion].search(/trader_inv\[i\]\);(\s*)\}/) == -1 && twpro_data[twpro_jsversion].search(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/) == -1) {
				//alert('4');
				TWPro.twpro_throwFailure();
				return;
			}
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
			twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace('var trader_inv', 'TWPro.twpro_initializeItems(\'own\',playerInventory);var trader_inv').replace(/trader_inv\[i\]\);(\s*)\}/, 'trader_inv[i]);$1};TWPro.twpro_initializeItems(\'trader\',traderInventory);').replace(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/, 'trader_inv[i],$1$2$1);$3};TWPro.twpro_initializeItems(\'trader\',traderInventory);');
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
		}
	}

	// wird beim Erstellen eines Popups ausgefuehrt, stellt Code fuer diesen zusammen
	function twpro_popup(twpro_item) {
		if (TWPro.twpro_failure) return '';
		var twpro_xhtml = '';
		if (TWPro.twpro_calculated && twpro_item.twpro_place && document.getElementById("twpro_jobList")) {
			if ((twpro_item.twpro_place == 'wear') || (twpro_item.twpro_place == 'bag')) {
				if (document.getElementById("twpro_jobList").selectedIndex != 0) {
					var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
					if (twpro_selectedJob >= 0) {
						var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
//						if (twpro_item.twpro_bonus == undefined) {
						if (twpro_item.twpro_bonus == undefined) {
							TWPro.twpro_prepareItem(twpro_item);
							if (twpro_item.twpro_bonus) {
								for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
									twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
								}
							}
						}
						if (twpro_item.twpro_bonus) {
							var twpro_aktplus = twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName];
							if (twpro_aktplus > 0) {
								twpro_xhtml += '<span class="item_popup_bonus">+'
								twpro_xhtml += Math.round(twpro_aktplus*100)/100 + ' ' + twpro_job.name;
								if(TWPro.twpro_jobs[twpro_selectedJob].shortName == 'fortatt' || TWPro.twpro_jobs[twpro_selectedJob].shortName == 'fortdef'){
								twpro_xhtml += '<br /><span style="font-size:10px;">&nbsp;&nbsp;<img width="18" height="13" style="background: url(\/images\/fort\/battle\/attacker_secondary.png) no-repeat;" src="images\/transparent.png"> +' + Math.round((TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_0']+TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_2']/2+TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_3']/2)*100)/100;
								twpro_xhtml += '<br />&nbsp;&nbsp;<img width="18" height="13" style="background: url(\/images\/fort\/battle\/defender_secondary.png) no-repeat;" src="images\/transparent.png"> +' + Math.round((TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_1']+TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_2']/2+TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_3']/2)*100)/100;
								twpro_xhtml += '<br />&nbsp;&nbsp;<img width="13" height="12" style="background: url(\/images\/charstats.png) no-repeat -76px -22px;" src="images\/transparent.png"><img width="5" height="13" src="images\/transparent.png"> +' + Math.round(TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName+'_4']*100)/100 + '<\/span>';
								}
								twpro_xhtml += '<br /></span><br />';
							}
						}
					}
				}
			}
			if (twpro_item.twpro_place == 'trader') {
				if (twpro_item.twpro_bonus == undefined) {
					TWPro.twpro_prepareItem(twpro_item);
					if (twpro_item.twpro_bonus) {
						for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
							twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
						}
					}
				}
				if (twpro_item.twpro_bonus) {
					var twpro_j = 0;
					var twpro_plus = [];
					var twpro_better;
					var twpro_xhtml_activejob = '';
					for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
						twpro_better = Math.round((twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] - TWPro.twpro_jobs[twpro_i].twpro_bestStats[twpro_item.type])*100)/100;
						if (twpro_better > 0) {
						  var re_jobname = TWPro.twpro_jobs[parseInt(document.getElementById('twpro_jobList')[document.getElementById('twpro_jobList').selectedIndex].value)] || '';
						  if(re_jobname) re_jobname = re_jobname.name;
							  if (TWPro.twpro_activeJob() && (TWPro.twpro_jobs[twpro_i].name.indexOf(re_jobname) != -1)){
								twpro_xhtml_activejob = '<span style="white-space:nowrap;color:rgb(34, 34, 136);">+' + twpro_better + ' ' + TWPro.twpro_jobs[twpro_i].name + '</span><br />';
							  }
							  else{
								twpro_plus.push(twpro_better + ' ' + TWPro.twpro_jobs[twpro_i].name);
							  }
							  twpro_j++;
						  }
					}
					if (twpro_j > 0) {
						twpro_plus.sort(TWPro.twpro_sortPlus);
						twpro_xhtml += '<span class="item_popup_bonus"><table><tr><td>';
						if (twpro_xhtml_activejob) twpro_xhtml += twpro_xhtml_activejob;
						var bool_j = twpro_j > 30 && twpro_j <= 33;
						for (var twpro_i = 0; (twpro_i < twpro_plus.length) && (twpro_i < 33); twpro_i++) {
							twpro_xhtml += '<span style="white-space:nowrap;';
							twpro_xhtml += '">+' + twpro_plus[twpro_i] + '</span><br />';
							if ((twpro_j <= 30 && twpro_i == 14) || (bool_j && (twpro_i == (Math.round(twpro_j / 2) - 1))) || (twpro_j > 33 && twpro_i == 16)) {
								twpro_xhtml += '</td><td>';
							}
						}
						if (twpro_i < twpro_plus.length) {
							twpro_xhtml += '...';
						}
						twpro_xhtml += '</td></tr></table></span><br />';
					}
				}
			}
		}
		return twpro_xhtml;
	}

	// fuegt Auswahlliste in das Inventar ein
	function twpro_insertList(twpro_data) {
		if (TWPro.twpro_failure) return;
		if (!TWPro.twpro_jobsort) {
			TWPro.twpro_jobsort = TWPro.prefs['defaultSorting']||'name';
		}
		TWPro.twpro_bag = {};
		TWPro.twpro_bag.twpro_priceWear = 0;
		TWPro.twpro_bag.twpro_priceBag = 0;
		TWPro.twpro_bag.twpro_priceItems = 0;
		TWPro.twpro_bag.twpro_priceYields = 0;
		TWPro.twpro_wear_items_list = '';
		TWPro.twpro_bag.twpro_countType = {};
		TWPro.twpro_bag.twpro_countType_diff = {};
		TWPro.twpro_bag.twpro_types = [];
		TWPro.twpro_setItems = {};
		TWPro.twpro_setItemsCount = {};
		for (var twpro_set in TWPro.twpro_setBonus) {
			TWPro.twpro_setItemsCount[twpro_set] = 0;
		}
		TWPro.twpro_invHashTest = [];
		for (var twpro_type in Character.itemLevelRequirementDecrease) {
			if ((twpro_type != 'all') && (!isNaN(Character.itemLevelRequirementDecrease[twpro_type]))) {
				TWPro.twpro_bag.twpro_types.push(twpro_type);
				TWPro.twpro_bag.twpro_countType[twpro_type] = 0;
				TWPro.twpro_bag.twpro_countType_diff[twpro_type] = 0;
			}
		}
		if(typeof Character.itemLevelRequirementDecrease.belt == "undefined" || typeof Character.itemLevelRequirementDecrease.pants == "undefined"){
				TWPro.twpro_bag.twpro_types.push("belt", "pants");
				TWPro.twpro_bag.twpro_countType["belt"] = 0;
				TWPro.twpro_bag.twpro_countType_diff["belt"] = 0;
				TWPro.twpro_bag.twpro_countType["pants"] = 0;
				TWPro.twpro_bag.twpro_countType_diff["pants"] = 0;
				Character.itemLevelRequirementDecrease.belt = 0;
				Character.itemLevelRequirementDecrease.pants = 0;
		}

$('window_inventory').style.height = "502px";
var new_inventory ="data:image/jpg;base64,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"; // wood background

		var twpro_xhtml = '<div style="background:url(images/inventory/west_inventar_2.jpg); margin-top:-33px; margin-left:-15px; width:770px; height:100%;"></div><div style="position: absolute; background:url('+new_inventory+'); top:0px; margin-top:2px; margin-left:-9px; width:100%; height:49px;"></div>';
		twpro_data.page += twpro_xhtml;

	$('window_inventory_content').style.height = "460px";
		twpro_xhtml = '<div style="text-align:right;width:100%;position:relative;margin-top:-6px;height:50px;"><table width="200px" id="twpro_jobDisplay" style="display: inline;position: absolute; visibility:hidden; right:-24px; z-index:2;text-align:right;"><tr><td>';
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			var name = TWPro.twpro_sorts[i];
			twpro_xhtml += '<a href="javascript:" onmouseup="TWPro.twpro_sortList(\''+name+'\')"><img id="twpro_jobsort_link_'+name+'" alt="" src="images/transparent.png" width="20" height="17" style="background-image:url(data:image/png;base64,'+twpro_sortButtonImg+');background-position:-'+(i*20)+'px '+(TWPro.twpro_jobsort==name?0:-17)+'px" onmouseover="this.style.backgroundPosition=\'-'+(i*20)+'px 0\'" onmouseout="if(TWPro.twpro_jobsort!=\''+name+'\')this.style.backgroundPosition=\'-'+(i*20)+'px -17px\'"/></a>';
		}
		twpro_xhtml += '<a href="javascript:/*Click here to configure TW Pro*/TWPro.twpro_disableJobs();"><img id="twpro_config_button" title="TW Pro: ' + AjaxWindow.possibleValues['settings'] + '" width="25" height="15" style="border: 1px solid rgb(62, 44, 35); background: url(/img.php?type=menu) repeat scroll -128px -180px transparent;" src="images/transparent.png"></a>';
		twpro_xhtml += '</td></tr><tr><td>';
		twpro_xhtml += '<input id="twpro_jobsort_filter" type="checkbox"' + (TWPro.twpro_preference('Hide_unjobs')?' checked="checked"':'') + '  onclick="TWPro.twpro_preference(\'Hide_unjobs\',this.checked);TWPro.twpro_clickfilterList()"/> <select id="twpro_jobList" size="1" onchange="TWPro.twpro_changeJob()" onclick="TWPro.twpro_clickList()" style="background-color: rgb(207, 195, 166); font-size: 10px; width:130px;"><option value="-1" id="twpro_wait" style="background-color: rgb(207, 195, 166);">'+TWPro.lang.STARTCALC+'</option></select>';
		twpro_xhtml += ' <input id="twpro_clothingfilter" type="checkbox"' + (TWPro.twpro_preference('dispJobClothingOnly')?' checked="checked"':'') + '  onclick="TWPro.twpro_preference(\'dispJobClothingOnly\',this.checked);TWPro.twpro_bagVis()" />';
		twpro_xhtml += '</td></tr></table></div>';
		twpro_xhtml += '<div style="position:absolute;top: 52px; left: 72px; overflow-y:auto;height:34px;width:189px;opacity:0.9;z-index:2;" id="twpro_currentJobSkills"><div style="margin:0;float:left;"></div><div style="margin:0;float:left;"></div><div style="margin:0;float:left;"></div><div style="margin:0;float:left;"></div><div style="margin:0;float:left;"></div></div>';
		twpro_data.page = twpro_data.page.replace(/<div(.*)top: 13px; left: 5px;"><h2>/, '<div id="div_equipment"$1top: 58px; left: 5px;"><h2>');
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
		  var rep_filter = new RegExp("<div id=\"filter_"+TWPro.twpro_bag.twpro_types[twpro_i]+"\"","g");
		  twpro_data.page = twpro_data.page.replace(rep_filter, '<div id="filter_'+TWPro.twpro_bag.twpro_types[twpro_i]+'" style="top:98px;"');
		}
		twpro_data.page = twpro_data.page.replace(/<div id="item_trader_button"/, '<div id="item_trader_button" style="position: absolute; margin-top:45px;"');
		twpro_data.page = twpro_xhtml+twpro_data.page;

		// settings for job rankings
		twpro_xhtml = '<div style="left:320px;position:absolute; top:0px; margin-top:3px;color:#C77341;text-align:center;line-height:160%">'+TWPro.lang.JOBRANKSETTINGS+'<br>';
		var imgorder = [20, 40, 60, 100], j=0;
		for(var i in TWPro.multipliers){
			twpro_xhtml += '<img src="images/transparent.png" alt="" style="background-image:url(data:image/png;base64,'+twpro_sortButtonImg+');background-position:-'+imgorder[j++]+'px 0;margin-left:5px" width="20" height="17" /><input type="text" style="background-color: rgb(207, 195, 166);width:23px" value="'+TWPro.multipliers[i]+'" onchange="TWPro.twpro_handleJobrank(this, \''+i+'\')" />';
		}
		twpro_xhtml += '</div>';
twpro_data.page += twpro_xhtml;
		// search inventory
		TWPro.searchInventory = {timer:null};
		(new Image()).src = twpro_loadingSearchImg;
		twpro_xhtml = '<label style="z-index:2;position:absolute;top:8px;right:26px;font-size:13px;font-weight:normal;font-style:italic;color:#636;cursor:pointer" for="twpro_searchinventory">'+TWPro.lang.SEARCHINVENTORY+'</label><input type="text" style="z-index:2;width:150px;background:#F0CD8B url(data:image/png;base64,'+twpro_searchButtonImg+') no-repeat scroll 0 0;padding:0 2px 0 19px" id="twpro_searchinventory" onfocus="previousSibling.style.display=\'none\'" onblur="if(this.value==\'\')previousSibling.style.display=\'block\'" onkeyup="TWPro.twpro_searchInventory(event.keyCode==13)" /><span id="twpro_search_help" style="z-index:2;font-size:13px;font-weight:bold;color:#191970;cursor:help;background:#D4C7B0;width:20px;height:17px">?</span>&nbsp;&nbsp;';
		
		twpro_data.page = twpro_data.page.replace(/<div(.*)text-align: center; top: 13px; left: 316px;"><h2>(.+)<\/h2>/, '<div id="twpro_bag" style="position:absolute; z-index:2;left: 318px; margin-top:6px;"><img src="/images/items/yield/bagpack.png" width="25" height="25"></div><div$1top: 58px; left: 316px;text-align: right;z-index:1;"><h2>$2 '+twpro_xhtml+'</h2>');

		twpro_xhtml = '<div id ="display_sets" style="z-index:2;position:absolute;right:3px;top:105px;">';
		twpro_xhtml_2 = '';
		for (var twpro_set in TWPro.twpro_setBonus) {
			if (TWPro.twpro_setBonus[twpro_set][1].gender == Character.characterSex || TWPro.twpro_setBonus[twpro_set][1].gender == "mixed"){
		twpro_xhtml += '<a href="javascript:void(0)"><img id="twpro_set_filters_'+twpro_set+'_bg" src="images/inventory/bag.png" style="z-index:1;width:21px;height:21px;"/><img id="twpro_set_filters_'+twpro_set+'" alt="" src="'+TWPro.twpro_setBonus[twpro_set][1].image+'" style="z-index:2;width:19px;height:19px;margin-left:-20px;opacity:0.7;" onmouseover="if(this.style.outlineWidth == \'thin\'){this.setStyles({\'outline-style\':\'inset\'})};this.setOpacity(parseFloat(this.style.opacity)+0.3);" onmouseout="this.setStyles({\'outline-style\':\'inherit\'});this.setOpacity(parseFloat(this.style.opacity)-0.3);" onclick="this.setOpacity(1.3);this.parentNode.setStyles({\'outline-style\':\'inset\'});this.setStyles({outline:\'#000000 inset thin\'});TWPro.twpro_show_set(\''+twpro_set+'\')"/></a><br>';
		}
		else{
		twpro_xhtml_2 += '<a href="javascript:void(0)"><img id="twpro_set_filters_'+twpro_set+'_bg" src="images/inventory/bag.png" style="z-index:1;width:21px;height:21px;"/><img id="twpro_set_filters_'+twpro_set+'" alt="" src="'+TWPro.twpro_setBonus[twpro_set][1].image+'" style="z-index:2;width:19px;height:19px;margin-left:-20px;opacity:0.7;" onmouseover="if(this.style.outlineWidth == \'thin\'){this.setStyles({\'outline-style\':\'inset\'})};this.setOpacity(parseFloat(this.style.opacity)+0.3);" onmouseout="this.setStyles({\'outline-style\':\'inherit\'});this.setOpacity(parseFloat(this.style.opacity)-0.3);" onclick="this.setOpacity(1.3);this.parentNode.setStyles({\'outline-style\':\'inset\'});this.setStyles({outline:\'#000000 inset thin\'});TWPro.twpro_show_set(\''+twpro_set+'\')"/></a><br>';
			}
			}
		twpro_xhtml_2 += '</div>';
twpro_data.page += twpro_xhtml+twpro_xhtml_2;


	}

	function twpro_handleJobrank(field, type){
		var val = parseFloat(field.value);
		if(isNaN(val)) val = 1;
		field.value = val;
		TWPro.multipliers[type] = 1*val;
		var multipliers = [];
		for(var i in TWPro.multipliers){
			multipliers.push(TWPro.multipliers[i]);
		}
		TWPro.twpro_preference('multipliers', multipliers.join(':'));
		if(TWPro.twpro_jobsort == 'comb'){
			TWPro.twpro_sortList('comb');
		}
	}
	
	twpro_toggle_set = 0;
	function twpro_show_set(set_searched){
	  var anyresult = null;
	  if (twpro_toggle_set != set_searched && set_searched != 0){
	  if(document.getElementById('twpro_searchinventory').value != ''){
		document.getElementById('twpro_searchinventory').value = '';
		TWPro.twpro_searchInventory(true);
		document.getElementById('twpro_searchinventory').previousSibling.style.display = '';
	  }
		remove_highlight();
		twpro_toggle_set = set_searched;
		var bag_items = document.getElementById('bag').getElementsByTagName('div'),
		i, inv_id;
		
		for(i=0; i<bag_items.length; i++){
		  if (bag_items[i].firstChild.getAttribute('src') !=null){
			bag_items[i].style.display = 'none';
			inv_id = (bag_items[i].id).replace("item_", "");
			if (Bag.getInstance().items[inv_id].obj.set != null){
			  if (Bag.getInstance().items[inv_id].obj.set.key == set_searched){
			  bag_items[i].style.display = '';
			  anyresult = 1;
			  }
			}
		  }
		}
		
		for (var twpro_wear in Wear.wear) {
			if (Wear.wear[twpro_wear].obj.set != null && Wear.wear[twpro_wear].obj.set.key == set_searched){
				$('char_'+twpro_wear).className = $('char_'+twpro_wear).className + ' wear_'+twpro_wear+'_highlight';
			}
			else{
				$('char_'+twpro_wear).className = $('char_'+twpro_wear).className.replace(' wear_'+twpro_wear+'_highlight',' wear_'+twpro_wear+'_highlight2');
			}
		}
	  }
	  else{
		remove_highlight();
		twpro_toggle_set = 0;
		TWPro.twpro_bagVis();
	  }
	  
	  function remove_highlight(){
		if (twpro_toggle_set != 0) {
		  $('twpro_set_filters_'+twpro_toggle_set).setOpacity(parseFloat($('twpro_set_filters_'+twpro_toggle_set).style.opacity)-0.3);
		  $('twpro_set_filters_'+twpro_toggle_set).setStyles({'outline-style':'none'});
		  $('twpro_set_filters_'+twpro_toggle_set).parentNode.setStyles({'outline-style':'none'});
		  for (var twpro_wear in Wear.wear) {
			  if (Wear.wear[twpro_wear].obj.set != null && Wear.wear[twpro_wear].obj.set.key == twpro_toggle_set){
				  $('char_'+twpro_wear).className = $('char_'+twpro_wear).className.replace(' wear_'+twpro_wear+'_highlight', '');
			  }
			  else{
				  $('char_'+twpro_wear).className = $('char_'+twpro_wear).className.replace(' wear_'+twpro_wear+'_highlight2',' wear_'+twpro_wear+'_highlight');
			  }
		  }
		}
	  }
	}
	
	function twpro_searchInventory(searchNow, updateItemId){
		if(twpro_toggle_set != 0) TWPro.twpro_show_set(0);
		if(!TWPro.searchInventory.cache && updateItemId) return;
		if(!searchNow){
			clearTimeout(TWPro.searchInventory.timer);
			TWPro.searchInventory.timer = setTimeout(TWPro.twpro_searchInventory, 500, true, updateItemId);
			return;
		}
		clearTimeout(TWPro.searchInventory.timer);
		TWPro.searchInventory.timer = null;
		var search = document.getElementById('twpro_searchinventory');
		if(!search) return;
		TWPro.twpro_internalWindowToTop("window_inventory");
		var cache, i, item,
			invent = document.getElementById('bag'),
			reJunk = /<[^>]+>|\n+/g, reSplit = /\t+/g,
			rePopupType = /"item_popup_type">([^<]+)<\/span>/,
			rePopupBonusAttr = /"item_popup_bonus_attr">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
			rePopupBonusSkill = /"item_popup_bonus_skill">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
			unjunk = function(subject, replace){return subject.replace(reJunk, replace||'').replace(reSplit, ' ').toLowerCase()},
			searchTerms = unjunk(search.value), isRegExp = false;
//			anyresult;
		if(/[*?]/.test(searchTerms)){
			searchTerms = new RegExp(searchTerms.replace(/[.+\[\]()\\{}]/g, '\\$&').replace(/\?+/g, '[^\t]?').replace(/\*+/g, '[^\t]*?'));
			isRegExp = true;
		}
		search.style.backgroundImage = 'url('+twpro_loadingSearchImg+')';
		var processbagItem = function(iid, bag_item){
				if(bag_item){
					bag_obj = bag_item.obj;
					cache[iid] = unjunk(bag_obj.name);
					if((wat = bag_obj.description)){
						cache[iid] += '\t' + unjunk(wat);
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupType))){
						cache[iid] += '\t' + unjunk(wat[1]);
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusAttr))){
						cache[iid] += '\t' + unjunk(wat[1], '\t');
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusSkill))){
						cache[iid] += '\t' + unjunk(wat[1], '\t');
					}
					if((wat = bag_obj.set)){
						cache[iid] += '\t' + unjunk(wat.name);
					}
				}
				if((item=invent.getElementById('item_'+iid))){
					disp = isRegExp ? searchTerms.test(cache[iid]) : cache[iid].indexOf(searchTerms) != -1;
					// don't add them together, FF 3.6 has an annoying bug: disp = false instead of '' or 'twpro_search_hide'
					disp = disp ? '' : 'twpro_search_hide';
					item.className = item.className.replace(/\s*twpro_search_hide|$/, " " + disp);

				}
			},
			bag_items = Bag.getInstance().items, i, disp
		if(!(cache = TWPro.searchInventory.cache)){
			cache = TWPro.searchInventory.cache = {};
			for(i in bag_items){
				processbagItem(i, bag_items[i]);
			}
		}
		else{
			for(i in cache){
				processbagItem(i);
			}
			if(bag_items[updateItemId]){
				processbagItem(updateItemId, bag_items[updateItemId]);
			}
		}
		if(search.value == '') TWPro.searchInventory.cache = null; // avoid full bag reload when using set filters
		TWPro.twpro_bagVis();
		search.style.backgroundImage = 'url(data:image/png;base64,'+twpro_searchButtonImg+')';
	}

		function twpro_searchTrader(searchNow, updateItemId, town_id, market_id){
			var searchIn = TWPro.searchTrader[town_id];
			if(!searchIn.cache && updateItemId) return;
			if(!searchNow){
				clearTimeout(searchIn.timer);
				searchIn.timer = setTimeout(TWPro.twpro_searchTrader, 500, true, updateItemId, town_id, market_id);
				return;
			}
			clearTimeout(searchIn.timer);
			searchIn.timer = null;
			var search = document.getElementById('twpro_market_'+town_id+'_search');
			if(!search) return;
			TWPro.twpro_internalWindowToTop("window_building_market_"+town_id);
			var cache, item,
				invent = document.getElementById('market_'+town_id+'_inv_div'),
				reJunk = /<[^>]+>|\n+/g, reSplit = /\t+/g,
				rePopupType = /"item_popup_type">([^<]+)<\/span>/,
				rePopupBonusAttr = /"item_popup_bonus_attr">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
				rePopupBonusSkill = /"item_popup_bonus_skill">((?:[+\-]\d{1,2}\s[^<]+(?:<br \/>)?)+)<\/span>/,
				unjunk = function(subject, replace){return subject.replace(reJunk, replace||'').replace(reSplit, ' ').toLowerCase()},
				searchTerms = unjunk(search.value), isRegExp = false,
				anyresult=0;
			if(/[*?]/.test(searchTerms)){
				searchTerms = new RegExp(searchTerms.replace(/[.+\[\]()\\{}]/g, '\\$&').replace(/\?+/g, '[^\t]?').replace(/\*+/g, '[^\t]*?'));
				isRegExp = true;
			}
			search.style.backgroundImage = 'url('+twpro_loadingSearchImg+')';
			var processbagItem = function(iid, bag_item){
					if(bag_item){
						bag_obj = bag_item.obj;
						cache[iid] = unjunk(bag_obj.name);
						if((wat = bag_obj.description)){
							cache[iid] += '\t' + unjunk(wat);
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupType))){
							cache[iid] += '\t' + unjunk(wat[1]);
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusAttr))){
							cache[iid] += '\t' + unjunk(wat[1], '\t');
						}
						if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusSkill))){
							cache[iid] += '\t' + unjunk(wat[1], '\t');
						}
						if((wat = bag_obj.set)){
							cache[iid] += '\t' + unjunk(wat.name);
						}
					}
					if((item=invent.getElementById('item_'+iid))){
						disp = isRegExp ? searchTerms.test(cache[iid]) : cache[iid].indexOf(searchTerms) != -1;
						// don't add them together, FF 3.6 has an annoying bug: disp = false instead of '' or 'twpro_search_hide'
						disp = disp ? '' : 'twpro_search_hide';
						item.className = item.className.replace(/\s*twpro_search_hide|$/, " " + disp);
					}
				},
				bii_bag_items = PlayerInventory.getInstance().bags["market_"+market_id].items, i, disp,
				bag_items = invent.getElementsByTagName('div'),
				nores = document.getElementById('twpro_nosearchresult'+town_id);
			if(!(cache = searchIn.cache)){
				cache = searchIn.cache = {};
				for(i in bii_bag_items){
					processbagItem(i, bii_bag_items[i]);
				}
			}
			else{
				for(i in cache){
					processbagItem(i);
				}
				if(bii_bag_items[updateItemId]){
					processbagItem(updateItemId, bii_bag_items[updateItemId]);
				}
			}
			
			for(i=0; i<bag_items.length; i++){
				if(bag_items[i].id.substr(0, 5) != 'item_') continue;
				if(bag_items[i].className.indexOf("twpro_search_hide") != -1 || bag_items[i].className.indexOf("nonauctionable") != -1){
					continue;
				}
				anyresult = 1;
			}
			if(!anyresult){
				if(!nores){
					nores = document.createElement('div');
					nores.id = 'twpro_nosearchresult'+town_id;
					nores.style.cssText = 'height: 290px;';
					invent.appendChild(nores);
				}
				nores.innerHTML = TWPro.lang.NOSEARCHRESULT.replace('%2', '<br><a href="javascript:" onclick="document.getElementById(\'twpro_market_'+town_id+'_search\').value=\'\';TWPro.twpro_searchTrader(true, null, '+town_id+', '+market_id+')">').replace('%3', '</a>').replace('%1', '<em>'+document.getElementById('twpro_market_'+town_id+'_search').value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')+'</em>');
			}
			else if(nores){
				nores.parentNode.removeChild(nores);
			}
			search.style.backgroundImage = 'url(data:image/png;base64,'+twpro_searchButtonImg+')';
		}


	function twpro_bagVis(){
		var bag_items = document.getElementById('bag').getElementsByTagName('div'),
			i, hide = TWPro.twpro_preference('dispJobClothingOnly') && document.getElementById('twpro_jobList').selectedIndex != 0,
			anyresult,
			nores = document.getElementById('twpro_nosearchresult');
		for(i=0; i<bag_items.length; i++){
			if(bag_items[i].id.substr(0, 5) != 'item_') continue;
			if(bag_items[i].className.indexOf('twpro_search_hide') != -1){
				continue;
			}
			if(hide && bag_items[i].firstChild.className == ''){
				bag_items[i].style.display = 'none';
			}
			else{
				bag_items[i].style.display = '';
				anyresult = 1;
			}
		}
		if(!anyresult){
			var extra = hide?'<br /><br /><a href="javascript:TWPro.twpro_preference(\'dispJobClothingOnly\',document.getElementById(\'twpro_clothingfilter\').checked=false);TWPro.twpro_bagVis()">'+TWPro.lang.DISABLEBESTFORJOB+'</a>':'';
			if(!nores){
				nores = document.createElement('div');
				nores.id = 'twpro_nosearchresult';
//				nores.style.color = "#C77341";
				nores.style.cssText = 'padding: 5px; background-image: url("/images/bgdark.png");border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;';
				document.getElementById('bag').appendChild(nores);
			}
			nores.innerHTML = TWPro.lang.NOSEARCHRESULT
				.replace('%2', '<br /><a href="javascript:" onclick="document.getElementById(\'twpro_searchinventory\').value=\'\';TWPro.twpro_searchInventory(true)">')
				.replace('%3', '</a>'+extra)
				.replace('%1', '<em>'+document.getElementById('twpro_searchinventory').value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')+'</em>');
		}
		else if(nores){
			nores.parentNode.removeChild(nores);
		}
	}

		function internalWindowToTop(windowId){
			var windows = document.getElementById("windows"),
			inv = document.getElementById(windowId);
			if(inv && inv.parentNode == windows && inv != windows.firstChild){
				windows.insertBefore(inv, windows.firstChild);
			}
		}


	function twpro_sortList(twpro_jobSortItem) {
		if (TWPro.twpro_failure) return;
		TWPro.twpro_jobsort = twpro_jobSortItem;
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			TWPro.twpro_jobSortMark(TWPro.twpro_sorts[i], false);
		}
		TWPro.twpro_jobSortMark(twpro_jobSortItem, true);
		if (TWPro.twpro_calculated && document.getElementById("twpro_jobList")) {
			if (document.getElementById('twpro_wait').text == TWPro.lang.CHOOSEJOB) {
				document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
				var twpro_selectedJobName = 'none';
				if (document.getElementById("twpro_jobList").selectedIndex != 0) {
					var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
					if (twpro_selectedJob >= 0) {
						twpro_selectedJobName = TWPro.twpro_jobs[twpro_selectedJob].shortName;
					}
				}
				document.getElementById("twpro_jobList").selectedIndex = 0;
				while (document.getElementById("twpro_jobList").lastChild.id != 'twpro_wait') {
					document.getElementById("twpro_jobList").removeChild(document.getElementById("twpro_jobList").lastChild);
				}
				TWPro.twpro_sortJobs();
				TWPro.twpro_insertListItems();
				for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
					TWPro.twpro_jobs[twpro_i].twpro_jobid = twpro_i;
				}
				for (var twpro_i = 0; twpro_i < document.getElementById("twpro_jobList").options.length; twpro_i++) {
					var twpro_jobTest = parseInt(document.getElementById("twpro_jobList").options[twpro_i].value);
					if (twpro_jobTest >= 0) {
						if (twpro_selectedJobName == TWPro.twpro_jobs[twpro_jobTest].shortName) {
							document.getElementById("twpro_jobList").selectedIndex = twpro_i;
						}
					}
				}
				document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
			}
			else {
				TWPro.twpro_sortJobs();
			}
		}
		document.getElementById('twpro_jobsort_link_' + twpro_jobSortItem).blur();
	}

	function twpro_jobSortMark(twpro_jobSortItem, twpro_jobSortValue) {
		if (TWPro.twpro_failure) return;
		var twpro_bgposition = '';
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			if(TWPro.twpro_sorts[i] == twpro_jobSortItem){
				twpro_bgposition = (20*-i)+'px ';
				break;
			}
		}
		twpro_bgposition += twpro_jobSortValue ? '0px' : '-17px';
		document.getElementById('twpro_jobsort_link_' + twpro_jobSortItem).style.backgroundPosition = twpro_bgposition;
	}

	// macht die Liste sichtbar
	function twpro_showList() {
		if (TWPro.twpro_failure) return;
		$('twpro_jobsort_link_name').addMousePopup(new MousePopup(TWPro.lang.SORTBYNAME, 100, {opacity:0.95}));
		$('twpro_jobsort_link_xp').addMousePopup(new MousePopup(TWPro.lang.SORTBYXP, 100, {opacity:0.95}));
		$('twpro_jobsort_link_wages').addMousePopup(new MousePopup(TWPro.lang.SORTBYWAGES, 100, {opacity:0.95}));
		$('twpro_jobsort_link_luck').addMousePopup(new MousePopup(TWPro.lang.SORTBYLUCK, 100, {opacity:0.95}));
		$('twpro_jobsort_link_comb').addMousePopup(new MousePopup(TWPro.lang.SORTBYCOMB, 100, {opacity:0.95}));
		$('twpro_jobsort_link_danger').addMousePopup(new MousePopup(TWPro.lang.SORTBYDANGER, 100, {opacity:0.95}));
		$('twpro_jobsort_link_laborp').addMousePopup(new MousePopup(TWPro.lang.SORTBYLABORP, 100, {opacity:0.95}));
		$('twpro_jobsort_filter').addMousePopup(new MousePopup(TWPro.lang.FILTERJOBS, 100, {opacity:0.95}));
		$('twpro_clothingfilter').addMousePopup(new MousePopup(TWPro.lang.FILTERCLOTHING, 100, {opacity:0.95}));
		$('twpro_search_help').addMousePopup(new MousePopup(TWPro.lang.SEARCHHELP, 100, {opacity:0.95}));

		for (var twpro_wear in Wear.wear) {
		  if (Wear.wear[twpro_wear].obj.set != null){
		  TWPro.twpro_setBonus[Wear.wear[twpro_wear].obj.set.key][1].name = Wear.wear[twpro_wear].obj.set.name;
		  }
		}
		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
		  if (bagitems[twpro_bag].obj.set != null){
			TWPro.twpro_setBonus[bagitems[twpro_bag].obj.set.key][1].name = bagitems[twpro_bag].obj.set.name;
		  }
		}	
		for (var twpro_set in TWPro.twpro_setBonus) {
		  if (TWPro.twpro_setBonus[twpro_set][1].name){
			$('twpro_set_filters_'+twpro_set).addMousePopup(new MousePopup('<b>'+TWPro.twpro_setBonus[twpro_set][1].name+'</b>', 100, {opacity:0.95})); 
			$('twpro_set_filters_'+twpro_set).setStyles({'outline-width':'thin','outline-color':'#000000'});
		  }
		  else{
			$('twpro_set_filters_'+twpro_set).addMousePopup(new MousePopup(TWPro.lang.NOITEMSETS+' (<i>'+twpro_set+'</i>)', 100, {opacity:0.95})); 
			$('twpro_set_filters_'+twpro_set).setOpacity(0.05);
			$('twpro_set_filters_'+twpro_set).style.cursor="default";
			$('twpro_set_filters_'+twpro_set).onclick="void(0)";
		  }
		}

		TWPro.twpro_bag.twpro_bagPopup = new MousePopup('', 100, {opacity:0.95});
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh = function () {
			this.setXHTML(TWPro.twpro_getBagPopup());
		};
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
		$('twpro_bag').addMousePopup(TWPro.twpro_bag.twpro_bagPopup);

		if (TWPro.twpro_invHash == TWPro.twpro_invHashTest.join(',')) {
			for (var twpro_wear in Wear.wear) {
				TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
				if (Wear.wear[twpro_wear].obj.twpro_bonus) {
					Wear.wear[twpro_wear].obj.twpro_jobbonus = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus;
				}
			}
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
				if (bagitems[twpro_bag].obj.twpro_bonus) {
					bagitems[twpro_bag].obj.twpro_jobbonus = TWPro.twpro_itemStorage[bagitems[twpro_bag].obj.item_id].twpro_jobbonus;
				}
			}
			TWPro.twpro_insertListItems();
			document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
		}
		document.getElementById('twpro_jobDisplay').style.visibility = 'visible';
	}

	function twpro_getBagPopup() {
		if (TWPro.twpro_failure) return '';
		eval(String(ItemPopup.prototype.getXHTML.toString().match(/var item_type_title.+"};/)));
		var twpro_xhtml = '';
		twpro_xhtml += '<div class="item_popup">';
		twpro_xhtml += '<span class="item_popup_title">'+TWPro.lang.INVENTSTATS+'</span>';
		twpro_xhtml += '<span class="item_popup_requirement_text"><hr>'+TWPro.lang.SELLVALUE+'<hr></span>';
		twpro_xhtml += '<table>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+document.getElementById('window_inventory_content').getElementsByTagName('h2')[1].innerHTML+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceWear + ' $</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+document.getElementById('window_inventory_content').getElementsByTagName('h2')[0].innerHTML.substring(0,document.getElementById('window_inventory_content').getElementsByTagName('h2')[0].innerHTML.indexOf(" <label"))+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceBag + ' $<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.OBJECTS+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceItems + ' $</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.PRODUCTS+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceYields + ' $<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.TOTAL+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + parseInt(TWPro.twpro_bag.twpro_priceWear + TWPro.twpro_bag.twpro_priceBag) + ' $</td></tr>';
		twpro_xhtml += '</table>';
		twpro_xhtml += '<hr><span style="text-align:right;font-weight:normal;float:right;">[&ne;]&nbsp;</span><span class="item_popup_requirement_text">'+TWPro.lang.QUANTITIES+'</span><hr>';
		twpro_xhtml += '<table width="100%">';
		var twpro_all = 0;
		var twpro_all_diff = 0;
		for (var twpro_type in item_type_title){
		  if (twpro_type != "yield"){
			twpro_xhtml += '<tr><td class="item_popup_trader_price">'+item_type_title[twpro_type]+':&nbsp;&nbsp;</td>';
			twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_countType[twpro_type] + '</td>';
			twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + TWPro.twpro_bag.twpro_countType_diff[twpro_type] + ']</td></tr>';
			twpro_all += TWPro.twpro_bag.twpro_countType[twpro_type];
			twpro_all_diff += TWPro.twpro_bag.twpro_countType_diff[twpro_type];
		  }
		}
		twpro_xhtml += '<tr><td></td><td><hr></td><td><hr></td></tr><tr><td class="item_popup_trader_price">'+TWPro.lang.OBJECTS+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + twpro_all + '<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + twpro_all_diff + ']<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.PRODUCTS+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_countType['yield'] + '<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + TWPro.twpro_bag.twpro_countType_diff['yield'] + ']<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.TOTAL+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + parseInt(twpro_all + TWPro.twpro_bag.twpro_countType['yield']) + '</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + parseInt(twpro_all_diff + TWPro.twpro_bag.twpro_countType_diff['yield']) + ']</td></tr>';
		twpro_xhtml += '</table>';
		twpro_xhtml += '</div>';
		return twpro_xhtml;
	}

	// wird beim draufklicken auf die Liste ausgefuehrt, stoesst Berechnungen an
	function twpro_clickList() {
		if (TWPro.twpro_failure) return;
		if (document.getElementById('twpro_wait').text != TWPro.lang.CALCJOB && document.getElementById('twpro_wait').text != TWPro.lang.CHOOSEJOB) {
			document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
			window.setTimeout(TWPro.twpro_updateList, 0);
		}
	}
	function twpro_clickfilterList() {
		if (TWPro.twpro_failure) return;
		if (document.getElementById('twpro_wait').text == TWPro.lang.CHOOSEJOB) {
  //		document.getElementById('twpro_wait').text = TWPro.lang.LOADING;
		  var twpro_wait = document.getElementById('twpro_wait');
		  document.getElementById('twpro_jobList').style.backgroundColor = 'rgb(207, 195, 166)';
		  document.getElementById('twpro_jobList').innerHTML = '<option style="background-color: rgb(207, 195, 166);" id="twpro_wait" value="-1">'+twpro_wait.text+'</option>';
		  //twpro_clickList();
		  TWPro.twpro_insertListItems();
		}
	}
	

		function twpro_setInfo(centerWindowId) {
			var html = '<table class="shadow_table" style="width:100%;height:100%;">';
			html += '<tbody><tr>';
			html += '<td class="edge_shadow_top_left"></td>';
			html += '<td class="border_shadow_top"></td>';
			html += '<td class="edge_shadow_top_right"></td>';
			html += '</tr>';
			html += '<tr>';
			html += '<td class="border_shadow_left"></td>';
			html += '<td class="shadow_content">';
			html += '<div style="overflow:auto;height:400px;width:250px;">';
			for (var setName in TWPro.twpro_setBonus) {
				//if (setName == "fireworker_set") continue;
				var friendlyName = TWPro.set_names[setName];
				html += '<div class="item_popup twpro_setinfo_entry">';
				if (friendlyName.charAt(0) != "<") {
					html += '<a style="float:right;" href="javascript://Search inventory for items from this set" onclick="(function(){var search=decodeURIComponent(\'' + encodeURIComponent(friendlyName).replace(/'/g, "\\'") + '\'),query=document.getElementById(\'twpro_searchinventory\').value==search?\'\':search;document.getElementById(\'twpro_searchinventory\').previousSibling.style.display=query?\'none\':\'\';document.getElementById(\'twpro_searchinventory\').value=query;TWPro.twpro_searchInventory(true);})()"><img title="' + TWPro.lang.SEARCHINVENTORY + ': ' + friendlyName + '" alt="Q" src="data:image/png;base64,'+twpro_searchButtonImg+'" width="16" height="16" style="border:1px solid black;"></a>';
				}
				html += '<span class="item_popup_title twpro_setinfo_name_clicker"';
				html += ' onclick="nextSibling.style.display=nextSibling.style.display?\'\':\'none\'">' + friendlyName + "</span>";
				html += '<div class="twpro_setinfo_set" style="display:none">';
				var items = TWPro.twpro_setBonus[setName], html2, html3;
				for (var i=0; i<items.length; i++) {
					if (!items[i]) continue;
					if (setName == "set_sleeper" && i==1) continue;
					html3 = '<span class="item_popup_requirement_text twpro_setinfo_xitems">' + TWPro.lang.WITHSETITEMS.replace('%1', i) + '</span>';
					var setInfo = items[i], anyinfo=0;
					if (setInfo.bonus) {
						if (setInfo.bonus.attributes) {
							html2 = '';
							for (var attr_name in setInfo.bonus.attributes) {
								if (setInfo.bonus.attributes[attr_name]) {
									if (setInfo.bonus.attributes[attr_name] > 0) {
										html2 += '+';
									}
									html2 += setInfo.bonus.attributes[attr_name] + ' ' + Character.attribute_titles[attr_name] + '<br>';
								}
							}
							if (html2) {
								html3 += '<span class="item_popup_bonus_attr">' + html2 + '</span>';
								anyinfo++;
							}
						}
						if (setInfo.bonus.skills) {
							html2 = '';
							for (var skill_name in setInfo.bonus.skills) {
								if (setInfo.bonus.skills[skill_name]) {
									if (setInfo.bonus.skills[skill_name] > 0) {
										html2 += '+';
									}
									html2 += setInfo.bonus.skills[skill_name] + ' ' + Character.skill_titles[skill_name] + '<br>';
								}
							}
							if (html2) {
								html3 += '<span class="item_popup_bonus_skill">' + html2 + '</span>';
								anyinfo++;
							}
						}
					}
					if (setInfo.jobBonus) {
						html2 = '';
						for (var job_name in setInfo.jobBonus) {
							if (setInfo.jobBonus[job_name]) {
								var job_title = job_name == 'all' ? TWPro.lang.LABORPOINTS : TWPro.job_titles[job_name];
								
								if (!job_title) {
									job_title = job_name;
								}
								if (setInfo.jobBonus[job_name] > 0) {
									html2 += '+';
								}
								html2 += setInfo.jobBonus[job_name] + ' ' + job_title + '<br>';
							}
						}
						if (html2) {
							html3 += '<span class="item_popup_bonus">' + html2 + '</span>';
							anyinfo++;
						}
					}
					if (setInfo.speedBonus) {
						html3 += '<span class="item_popup_bonus">+' + setInfo.speedBonus + '% ' + TWPro.lang.SPEED + '</span>';
						anyinfo++;
					}
					if (setName == "set_sleeper") {
						html3 += '<span class="item_popup_bonus">+' + Math.abs(Math.round(100-100*TWPro.twpro_sleeperBonus(i))) + '% '+TWPro.lang.PERCREGENERATION;
						if (i == 6) {
							html3 += '<br>+1 ' + TWPro.lang.PRAYING;
						}
						html3 += '</span>';
						anyinfo++;
					}
					if (setInfo.luckBonus) {
						html3 += '<span class="item_popup_bonus">+' + setInfo.luckBonus + '% '+TWPro.lang.LUCK+'</span>';
						anyinfo++;
					}
					if (anyinfo) {
						html += html3;
					}
				}
				html += '</div></div>';
			}
			html += '</div></td>';
			html += '<td class="border_shadow_right"></td>';
			html += '</tr>';
			html += '<tr>';
			html += '<td class="edge_shadow_bottom_left"></td>';
			html += '<td class="border_shadow_bottom"></td>';
			html += '<td class="edge_shadow_bottom_right"></td>';
			html += '</tr>';
			html += '</tbody></table>';
			var wasPreviouslyOpened = document.getElementById("window_TWPro_setsInfo_Sets") ? true : false;
			AjaxWindow.show("TWPro_setsInfo", undefined, "Sets", html, {title:TWPro.lang.SETSINFO}, true);
			$E("#window_TWPro_setsInfo_Sets .window_refresh").href = "javascript:TWPro.twpro_setInfo('" + (centerWindowId||"") + "');";
			var window_TWPro_setsInfo_Sets = document.getElementById("window_TWPro_setsInfo_Sets");
			window_TWPro_setsInfo_Sets.style.width = "296px";
			if (window_TWPro_setsInfo_Sets.firstChild.className != "twpro_left_border") {
				window_TWPro_setsInfo_Sets.firstChild.style.backgroundPosition = "right center";
				var leftBorder = document.createElement("div");
				leftBorder.style.cssText = "background: url(../images/main/borders_window.png) repeat scroll 0 0 transparent;height:100%";
				leftBorder.className = "twpro_left_border";
				window_TWPro_setsInfo_Sets.insertBefore(leftBorder, window_TWPro_setsInfo_Sets.firstChild);
			}
			window_TWPro_setsInfo_Sets.getElementsByTagName("h2")[0].style.cssText = "width:285px;text-align:center";
			document.getElementById("window_TWPro_setsInfo_Sets_content").style.cssText = "width:272px;height:409px;";
			var centerWindow;
			if (centerWindowId && (centerWindow=document.getElementById(centerWindowId))) {
				window_TWPro_setsInfo_Sets.style.top = centerWindow.offsetTop + "px";
				var totalWidthRequired = centerWindow.offsetWidth + window_TWPro_setsInfo_Sets.offsetWidth,
					availWidth = document.body.offsetWidth;
				if (totalWidthRequired < availWidth * 1.1) {// ten percent treshold
					if (centerWindow.offsetLeft + totalWidthRequired > availWidth) {
						centerWindow.style.left = Math.max(0, availWidth - totalWidthRequired) / 2 + "px";
					}
					window_TWPro_setsInfo_Sets.style.left = centerWindow.offsetLeft + centerWindow.offsetWidth + "px";
				}
			}
		}
		function twpro_disableJobs(){
			var CustomJobList = {
				'construct': TWPro.lang.CONSTRUCTION,
				'duelshootingatt': TWPro.lang.DUELSHOOTINGATT,
				'duelshootingdef': TWPro.lang.DUELSHOOTINGDEF,
				'duelvigor': TWPro.lang.DUELVIGOR,
				'fortatt': TWPro.lang.FORTATTACK,
				'fortdef': TWPro.lang.FORTDEFEND,
				'speed': TWPro.lang.SPEED,
				'regeneration': TWPro.lang.REGENERATION
			};
			if(!TWPro.disabledJobs) TWPro.disabledJobs = {};
			var xhtmlShowHide = ['', ''],
			ShowHide = ['show_to_hide', 'hide_to_show'],
			jobs = [],
			xhtml = "    <div class=\"tab_container\" style=\"margin-left:7px; width:100%; height:400px\">"
			xhtml += "<ul class=\"tabs\"><li class=\"active\" id=\"twpro_settings.tab.1\" onclick=\"TWPro.showTab(this);\">" + TWPro.lang.HIDEJOBS + "</li><li id=\"twpro_settings.tab.2\" onclick=\"TWPro.showTab(this);\">" + TWPro.lang.PREFERENCES + "</li></ul>";
  TWPro.showTab = function showTab(obj) {
    var showTab1 = obj.id == "twpro_settings.tab.1";
    $("twpro_settings.tab.1.div").setStyle("display", showTab1 ? "block" : "none");
    $("twpro_settings.tab.2.div").setStyle("display", showTab1 ? "none" : "block");
    if (showTab1) {
        $("twpro_settings.tab.1").addClass("active");
        $("twpro_settings.tab.2").removeClass("active");
    } else {
        $("twpro_settings.tab.1").removeClass("active");
        $("twpro_settings.tab.2").addClass("active");
    }
}
			xhtml += '<table class="shadow_table" style="width:100%;height:50%;">';
			xhtml += '<tbody><tr>';
			xhtml += '<td class="edge_shadow_top_left"></td>';
			xhtml += '<td class="border_shadow_top"></td>';
			xhtml += '<td class="edge_shadow_top_right"></td>';
			xhtml += '</tr>';
			xhtml += '<tr>';
			xhtml += '<td class="border_shadow_left"></td>';
			xhtml += '<td class="shadow_content">';
			xhtml += '<div style="overflow:auto;height:360px;width:679px;">';
			xhtml += '<div id="twpro_settings.tab.1.div">';
			xhtml += '<table id="twpro_settings_hidejob_table"><tbody>';
			xhtml += '<tr><td colSpan="4">' + TWPro.lang.HIDEJOBDESC + '</td></tr>';
			
			xhtml += '<tr><td colSpan="2">'+TWPro.lang.SHOWN;
			xhtml += '</td><td>'+TWPro.lang.HIDDEN+'</td>';
			xhtml += '<td><a href="javascript:/*Click here to open the Set info window*/TWPro.twpro_setInfo(\'window_TWPro_settings_Jobs\');">' + TWPro.lang.SETSINFO + '</a></td></tr>\n';
			for(var job in JobList){
				job = JobList[job];
				jobs.push([job.shortName, job.name]);
			}
			for(var job in CustomJobList){
				jobs.push([job, CustomJobList[job]]);
			}
			jobs.sort(function(x,y){return x[1].localeCompare(y[1])});
			for(var i=0;i<jobs.length;i++){
				job = jobs[i];
				xhtmlShowHide[!!TWPro.disabledJobs[job[0]]*1] += '<option ondblclick="javascript:void TWPro.twpro_moveJobSetting(\''+ShowHide[!!TWPro.disabledJobs[job[0]]*1]+'\');" value="'+job[0]+'">'+job[1]+'</option>\n';
			}
			xhtml += '<tr id="twpro_settings_jobs_main"><td><select id="twpro_settings_jobs_shown" multiple="multiple" size="13" style="width:200px;">';
			xhtml += xhtmlShowHide[0];
			xhtml += '</select></td><td><div style="width:46px">';
			xhtml += '<a href="javascript:void TWPro.twpro_moveJobSetting(\'show_to_hide\');" class="button_wrap button"><span class="button_left"></span><span class="button_middle">&gt;&gt;</span><span class="button_right"></span><span style="clear: both;"></span></a>';
			xhtml += '<br /><a href="javascript:void TWPro.twpro_moveJobSetting(\'hide_to_show\');" class="button_wrap button"><span class="button_left"></span><span class="button_middle">&lt;&lt;</span><span class="button_right"></span><span style="clear: both;"></span></a>';
//			xhtml += '<br /><input id="twpro_jobsort_filter" type="checkbox"' + (TWPro.twpro_preference('Hide_unjobs')?' checked="checked"':'') + ' title="'+TWPro.lang.FILTERJOBS+'" />';
			xhtml += '</div></td><td><select id="twpro_settings_jobs_hidden" multiple="multiple" size="13" style="width:200px;">';
			xhtml += xhtmlShowHide[1];
			xhtml += '</select></td>';
			xhtml += '<td><div style="height:220px;overflow-y:auto;width:200px;"><p style="font-size:10.5px;">';
			xhtml += TWPro.lang.SETSETTINGS + '</p>';
			for (var internal_name in TWPro.set_names) {
				if(internal_name == "fireworker_set") continue;
				var isValidSet = TWPro.twpro_validSet(internal_name);
				xhtml += '<label id="twpro_settings_setlabel_' + internal_name + '" title="';
				if (!isValidSet) {
					xhtml += TWPro.lang.CANNOTWEAR;
					xhtml += '" style="text-decoration:line-through'
				}
				xhtml += '"><input type="checkbox" id="twpro_settings_enabled_'+internal_name+'"'+(isValidSet&&TWPro.prefs['disabledSets'].indexOf('|'+internal_name+'|')==-1?' checked="checked"':'')+'"'+(isValidSet?'':' disabled="disabled"')+' />' + TWPro.set_names[internal_name]+'</label> <span title="'+TWPro.lang.USEFULITEM+'">('+TWPro.twpro_setItemsCount[internal_name]+')</span><br />';
			}
			
			xhtml += '</div></td><td></td></tr>';
			xhtml += '<tr><td colSpan="5">';
			xhtml += '<div id="twpro_settings_customJob">';
			xhtml += '<span style="position:relative"><div style="position:absolute;bottom:20px;left:330px;width:275px;display:none;background-image:url(\'../images/border/table/bright.png\');" id="twpro_settings_calc_helper">';
			var lines = 0;
			for(var skill_name in TWPro.skill_to_AttNum){
				if(lines && lines++%5==0) xhtml += '<br style="clear:both;" />';
				xhtml += '<a href="javascript:void TWPro.twpro_customJobs(\'editCalculation\',\''+skill_name+'\');"><div class="skill_box skill_'+TWPro.skill_to_AttNum[skill_name][0]+' img'+TWPro.skill_to_AttNum[skill_name][1]+'" title="'+Character.skill_titles[skill_name]+'" style="margin:0px;cursor:pointer;"></div></a>';
			}
			xhtml += '</div></span>';
			xhtml += '<button onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');" onclick="TWPro.twpro_customJobs(\'new\')" title="'+TWPro.lang.NEW+'">+</button>&nbsp;'
			xhtml += '<select onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');TWPro.twpro_customJobs(\'switchFocus\')" style="width: 190px;" onchange="TWPro.twpro_customJobs(\'switch\')"><option>...</option></select>';
			xhtml += '<input type="hidden" title="{shortname}" maxlength="20" />';
			xhtml += '<input onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');" type="text" title="'+TWPro.lang.CUSTOMNAME+'" style="width: 100px;" onblur="TWPro.twpro_customJobs(\'blur\', [3, this.value, this])" />';
			xhtml += '<input type="text" title="'+TWPro.lang.CUSTOMCALCULATION+'" style="width: 300px;" onblur="TWPro.twpro_customJobs(\'calcBlur\')" onfocus="TWPro.twpro_customJobs(\'calcFocus\')" />';
			xhtml += '<input onfocus="TWPro.twpro_customJobs(\'calcBlurNow\');" type="checkbox" title="'+TWPro.lang.CUSTOMENABLED+'" checked="checked" onblur="TWPro.twpro_customJobs(\'blur\', [1, this.checked*1, this])" />';
			xhtml += '</div>';
			xhtml += '<br><input type="checkbox" id="twpro_settings_persist" checked="checked" title="'+TWPro.lang.PERSISTSETTINGS+'" />';
			xhtml += '<a href="javascript:void TWPro.twpro_confirmHideJobs();" class="button_wrap button"><span class="button_left"></span><span class="button_middle">'+TWPro.lang.CONFIRM+'</span><span class="button_right"></span><span style="clear: both;"></span></a><span style="position:absolute;bottom:2px;right:2px;font-size:10.5px;">Powered by <a href="http://twpro.lekensteyn.nl/" target="_blank">Lekensteyn</a></span></td></tr>';
			xhtml += '</tbody></table></div>';
			
			xhtml += '<div id="twpro_settings.tab.2.div" style="display:none;">';
			xhtml += '<table id="twpro_settings_prefs"><tbody>';
			xhtml += '<tr><td>' + TWPro.lang.DEFAULTSORTING + ': </td><td><select size="1" onchange="TWPro.save_preferences(\'defaultSorting\',this);" style="background-color: rgb(207, 195, 166); font-size: 10px; width:130px;">';
			for(var i=0;i<TWPro.twpro_sorts.length;i++){
			  xhtml += '<option value="'+TWPro.twpro_sorts[i]+'" style="background-color: rgb(207, 195, 166);"';
			  if(TWPro.twpro_sorts[i] == TWPro.prefs['defaultSorting']){
				xhtml += ' selected';
			  }
			  xhtml += '>'+TWPro.lang['SORTBY'+TWPro.twpro_sorts[i].toUpperCase()]+'</option>';
			}
 			xhtml += '</select></td></tr>';
			xhtml += '<tr><td>' + TWPro.lang.FBHEALTHPRIORITY + ': </td><td><select size="1" onchange="TWPro.save_preferences(\'healthPriority\',this);TWPro.twpro_calculated = false;TWPro.twpro_confirmHideJobs(\'fortbattle\');" style="background-color: rgb(207, 195, 166); font-size: 10px; width:130px;">';
			if(!TWPro.prefs['healthPriority']){
				 TWPro.prefs['healthPriority'] = 'medium';
				 TWPro.twpro_preference('healthPriority','medium');
			}
			for(var i=0;i<TWPro.twpro_health_priority.length;i++){
			  xhtml += '<option value="'+TWPro.twpro_health_priority[i]+'" style="background-color: rgb(207, 195, 166);"';
			  if(TWPro.twpro_health_priority[i] == TWPro.prefs['healthPriority']){
				xhtml += ' selected';
			  }
			  xhtml += '>'+TWPro.lang['FBHEALTHPRIORITY'+TWPro.twpro_health_priority[i].toUpperCase()]+'</option>';
			}
		TWPro.save_preferences = function save_preferences(pref, obj) {
		TWPro.twpro_preference(pref,obj.options[obj.selectedIndex].value);
		TWPro.prefs[pref] = obj.options[obj.selectedIndex].value;
		}
  			xhtml += '</select></td></tr>';
			xhtml += '</tbody></table>';
			xhtml += '</div></div></div></td>';
			xhtml += '<td class="border_shadow_right"></td>';
			xhtml += '</tr>';
			xhtml += '<tr>';
			xhtml += '<td class="edge_shadow_bottom_left"></td>';
			xhtml += '<td class="border_shadow_bottom"></td>';
			xhtml += '<td class="edge_shadow_bottom_right"></td>';
			xhtml += '</tr>';
			xhtml += '</tbody></table></div>';
			AjaxWindow.show("TWPro_settings", undefined, "Jobs", xhtml, {title:'TW Pro: ' + AjaxWindow.possibleValues['settings']}, true);
			$E("#window_TWPro_settings_Jobs .window_refresh").href = "javascript:TWPro.twpro_disableJobs();";
			document.getElementById("window_TWPro_settings_Jobs").getElementsByTagName("h2")[0].style.cssText = "text-align:center";
			TWPro.moveJobAdjusted = false;
			TWPro.disableSetsAdjusted = false;
			TWPro.twpro_customJobs("load");
		}
		function twpro_confirmHideJobs(arg){
			var disabledSets = '|';
			for(var internal_name in TWPro.twpro_setItemsCount){
				if(document.getElementById("twpro_settings_enabled_"+internal_name) && !document.getElementById("twpro_settings_enabled_"+internal_name).checked){
						disabledSets += internal_name+'|';
				}
			}
			TWPro.disableSetsAdjusted = TWPro.prefs["disabledSets"] != disabledSets;
			if(TWPro.disableSetsAdjusted){
				TWPro.prefs["disabledSets"] = disabledSets;
				if(document.getElementById("twpro_settings_persist").checked) document.cookie = "twpro_"+Character.playerId+"_disabledSets=" +disabledSets + "; max-age=5184000";
				TWPro.twpro_setItems = {};
				TWPro.twpro_setItemsCount = {};
				for (var twpro_set in TWPro.twpro_setBonus) {
					TWPro.twpro_setItemsCount[twpro_set] = 0;
				}
				for (var twpro_wear in Wear.wear) {
					if ((Wear.wear[twpro_wear].obj.set != null) && !TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] && TWPro.twpro_validSet(Wear.wear[twpro_wear].obj)) {
						TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
						TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
					}
				}
				var bagitems = Bag.getInstance().items;
				for (var twpro_bag in bagitems) {
					if ((bagitems[twpro_bag].obj.set != null) && !TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] && TWPro.twpro_validSet(bagitems[twpro_bag].obj)) {
						TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] = bagitems[twpro_bag].obj;
						TWPro.twpro_setItemsCount[bagitems[twpro_bag].obj.set.key]++;
					}
				}
			}
			if(TWPro.moveJobAdjusted){
				var hidden = document.getElementById("twpro_settings_jobs_hidden"), inputs, disable={},persist=[], count=0;
				if(!hidden) return;
				hidden = hidden.options;
				for(; count<hidden.length; count++){
					persist.push(hidden[count].value);
					disable[hidden[count].value] = true;
				}
				TWPro.disabledJobs = disable;
				TWPro.twpro_invHash = '';
				TWPro.twpro_calculated = false;
				inputs = document.getElementById("twpro_settings_jobs_shown").options.length*1;
				inputs += count;
				persist = persist.join("|");
				TWPro.prefs["hidejobs"] = persist;
				if(document.getElementById("twpro_settings_persist").checked) document.cookie = "twpro_"+Character.playerId+"_hidejobs=" +persist + "; max-age=5184000";
			}
			if((TWPro.twpro_customJobs("save") && !(TWPro.twpro_calculated=false)) || document.getElementById("twpro_jobsort_filter") && TWPro.twpro_preference("Hide_unjobs") != TWPro.twpro_preference("Hide_unjobs", document.getElementById("twpro_jobsort_filter").checked) || (TWPro.moveJobAdjusted && document.getElementById('twpro_jobList') && document.getElementById('twpro_jobList').options.length > 1) || TWPro.disableSetsAdjusted || arg == 'fortbattle'){
				TWPro.twpro_setBonusParsed = false;
				var lastSelected = document.getElementById('twpro_jobList').options[document.getElementById('twpro_jobList').selectedIndex].value*1;
				if(lastSelected >= 0) lastSelected = TWPro.twpro_jobs[lastSelected].shortName;
				TWPro.twpro_customJobs("clear_item_cache", arg);
				document.getElementById('twpro_jobList').options.length = 1;
				document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
				TWPro.twpro_updateList();
				if(lastSelected && TWPro.prefs["hidejobs"].indexOf('|'+lastSelected+'|') == -1){
					for(var i=1; i<document.getElementById('twpro_jobList').options.length; i++){
						if(TWPro.twpro_jobs[document.getElementById('twpro_jobList').options[i].value].shortName == lastSelected && (lastSelected=i))break;
					}
				}
				if(typeof lastSelected != "number" || lastSelected < 0)lastSelected = 0;
				document.getElementById('twpro_jobList').selectedIndex = lastSelected;
				TWPro.twpro_changeJob();
			}
			new HumanMessage(document.getElementById("twpro_settings_persist").checked?TWPro.lang.SETTINGSSAVED:TWPro.lang.SETTINGSSAVEDSESSION, {type:'success'});
			TWPro.moveJobAdjusted = false;
			TWPro.disableSetsAdjusted = false;
		}
		function twpro_moveJobSetting(from_to_dest){
			var from,dest,dest_to_from,temp=document.createDocumentFragment();
			if(from_to_dest == "show_to_hide"){
				from = document.getElementById("twpro_settings_jobs_shown").options;
				dest = document.getElementById("twpro_settings_jobs_hidden");
				dest_to_from = "hide_to_show";
			}
			else if(from_to_dest == "hide_to_show"){
				from = document.getElementById("twpro_settings_jobs_hidden").options;
				dest = document.getElementById("twpro_settings_jobs_shown");
				dest_to_from = "show_to_hide";
			}
			else {
				new HumanMessage("TWPro.moveJobSetting(): Unexpected error.");
				return;
			}
			for(var i=from.length-1; i>=0; i--){
				if(from[i].selected) {
				  from[i].setAttribute('ondblclick', "javascript:void TWPro.twpro_moveJobSetting(\'"+dest_to_from+"\');"); 
				  temp.insertBefore(from[i], temp.firstChild);
				}
			}
			dest.appendChild(temp);
			TWPro.moveJobAdjusted = true;
		}


		function twpro_updateInternalJobInfo(){
			var twpro_jobCount = 0, twpro_calculation_health;
			if(!TWPro.disabledJobs) TWPro.disabledJobs = {};
			TWPro.twpro_customJobs("clear_cache");
			TWPro.twpro_jobs = [];
			switch(TWPro.prefs['healthPriority']){
				case 'zero':
				twpro_calculation_health = '0 * Character.skills.health - 0*Character.skills["health"]';
				break;
				case 'low':
				twpro_calculation_health = '1 * Character.skills.health/('+Character.level+'/5) - 0*Character.skills["health"]';
				break;
				case 'medium':
				twpro_calculation_health = '1 * Character.skills.health/('+Character.level+'/10) - 0*Character.skills["health"]';
				break;
				case 'high':
				twpro_calculation_health = '1 * Character.skills.health/('+Character.level+'/15) - 0*Character.skills["health"]';
				break;
				case 'auto':
				twpro_calculation_health = '1 * Math.pow((Character.skills.health+Character.skills["health"]), 0.4) - Math.pow(Character.skills["health"], 0.4)';
				break;
				default:
				twpro_calculation_health = '1 * Character.skills.health/('+Character.level+'/10) - 0*Character.skills["health"]';
			}
			for (var twpro_job in JobList) {
				if(TWPro.disabledJobs[JobList[twpro_job].shortName]) continue;
				TWPro.twpro_jobs[twpro_job*1] = JobList[twpro_job];
				TWPro.twpro_jobs[twpro_job*1].west_id = twpro_job;
				TWPro.twpro_jobs[twpro_job*1].twpro_calculation = TWPro.twpro_jobs[parseInt(twpro_job)].formular.replace(/skills\./g, 'Character.skills.');
				twpro_jobCount++;
			}
			if(!TWPro.disabledJobs['construct']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '3 * Character.skills.build + 1 * Character.skills.repair + 1 * Character.skills.leadership',
				'malus': -1,
				'name': TWPro.lang.CONSTRUCTION,
				'shortName': 'construct'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['duelshootingatt']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 1 * Character.skills.appearance + 1 * Character.skills.shot',
				'malus': -1,
				'name': TWPro.lang.DUELSHOOTINGATT,
				'shortName': 'duelshootingatt'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['duelshootingdef']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 1 * Character.skills.tactic + 1 * Character.skills.shot',
				'malus': -1,
				'name': TWPro.lang.DUELSHOOTINGDEF,
				'shortName': 'duelshootingdef'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['duelvigor']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.reflex + 1 * Character.skills.tough + 1 * Character.skills.punch',
				'malus': -1,
				'name': TWPro.lang.DUELVIGOR,
				'shortName': 'duelvigor'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['fortatt']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
//				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 2 * Character.skills.leadership + 2 * Character.skills.endurance + 1 * Character.skills.health',
				'twpro_calculation': '1 * Math.pow((Character.skills.aim+Character.skills["aim"]), 0.4) - Math.pow(Character.skills["aim"], 0.4) + 1 * Math.pow((Character.skills.dodge+Character.skills["dodge"]), 0.4) - Math.pow(Character.skills["dodge"], 0.4) + 2 * Math.pow((Character.skills.leadership+Character.skills["leadership"])*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) - 2*Math.pow((Character.skills["leadership"])*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) + 2 * Math.pow((Character.skills.endurance+Character.skills["endurance"]), 0.4) - 2*Math.pow(Character.skills["endurance"], 0.4) + '+twpro_calculation_health,
				'malus': -1,
				'name': TWPro.lang.FORTATTACK,
				'shortName': 'fortatt'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['fortdef']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
//				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 2 * Character.skills.leadership + 2 * Character.skills.hide + 1 * Character.skills.health',
				'twpro_calculation': '1 * Math.pow((Character.skills.aim+Character.skills["aim"]), 0.4) - Math.pow(Character.skills["aim"], 0.4) + 1 * Math.pow((Character.skills.dodge+Character.skills["dodge"]), 0.4) - Math.pow(Character.skills["dodge"], 0.4) + 2 * Math.pow((Character.skills.leadership+Character.skills["leadership"])*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) - 2*Math.pow((Character.skills["leadership"])*('+(Character.characterClass == "soldier"?(PremiumBoni.hasBonus('character')?1.5:1.25):1)+'), 0.4) + 2 * Math.pow((Character.skills.hide+Character.skills["hide"]), 0.4) - 2*Math.pow(Character.skills["hide"], 0.4) + '+twpro_calculation_health,
				'malus': -1,
				'name': TWPro.lang.FORTDEFEND,
				'shortName': 'fortdef'
			}) && twpro_jobCount++;
			if(!TWPro.disabledJobs['speed']) (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.ride + 100',//=100 * Character.default_speed/Character.speed
				'malus': -1,
				'name': TWPro.lang.SPEED,
				'shortName': 'speed'
			}) && twpro_jobCount++;
			twpro_jobCount += TWPro.twpro_customJobs("get")*1||0;
			TWPro.twpro_sortJobs();
			while (TWPro.twpro_jobs.length > twpro_jobCount) {
				TWPro.twpro_jobs.pop();
			}
		}
		function twpro_customJobs(action, args){try{
			var custom = TWPro.prefs["customJobs"],//(?:\d\s*\*\s*[A-Za-z_.\[\]"']+(?:\s*\+\s*)?)+
			REcustom = /^(cj_\d+)#([01])#(.+?)#(.+?)$/,
			screen_settings = document.getElementById("twpro_settings_customJob");
			if(action == "get"){
				if(!custom) return 0;
				var customs = custom.split('|'), twpro_jobCount=0;
				for(var i=0; i<customs.length; i++){
					var custom_i = customs[i].match(REcustom);
					if(!custom_i) continue;
					var shortName = custom_i[1],
					enabledJob = custom_i[2],
					twpro_calculation = custom_i[3];
					name = custom_i[4];
					if((function(){try{var i=0, customs=0, custom=0;if(isNaN(eval(twpro_calculation)))throw NaN}catch(e){return true}return false})()) continue;
					TWPro.twpro_jobValues[shortName] = {'erfahrung':-1, 'lohn':-6, 'glueck':-6, 'gefahr':-1};
					if(enabledJob == "1") (TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
						'twpro_calculation': twpro_calculation,
						'malus': -1,
						'name': name,
						'shortName': shortName
					}) && twpro_jobCount++;
				}
				return twpro_jobCount;
			}
			else if(action == "clear_cache"){
				for(var i=TWPro.twpro_jobs.length-1, cleared=0; i>=0; i--){
					if(TWPro.twpro_jobs[i].shortName.match(/^cj_\d+$/)){
						TWPro.twpro_jobValues[TWPro.twpro_jobs[i].shortName] = null;
						delete TWPro.twpro_jobValues[TWPro.twpro_jobs[i].shortName];
						TWPro.twpro_jobs.splice(i, 1);
						cleared++;
					}
				}
				return cleared;
			}
			else if(action == "clear_item_cache"){
				var items = Bag.getInstance().items, i, item, j, k, deleted=0;
				for(i in items){
					item = items[i].obj;
					if(item.twpro_jobbonus){
						k=0;
						for(j in item.twpro_jobbonus){
							k++;
							if(j.match(/^cj_\d+$/) || ((args = 'fortbattle') && (j.match(/fortatt/) || j.match(/fortdef/)))){
//if(j.match(/fortatt/)) alert("test");
//							if(j.match(/^cj_\d+$/) || ((j.match(/fortatt/) || j.match(/fortdef/)))){
								delete item.twpro_jobbonus[j];
								if(TWPro.twpro_itemStorage[item.item_id] && TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus){
//if(k<5) alert(TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus[j]);
									delete TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus[j];
								}
								k--;
								deleted++;
							}
						}
						if(!k) delete item.twpro_jobbonus;
					}
				}
				for(i in Wear.wear){
					item = Wear.wear[i].obj;
					if(item.twpro_jobbonus){
						k=0;
						for(j in item.twpro_jobbonus){
							k++;
//							if(j.match(/^cj_\d+$/)){
							if(j.match(/^cj_\d+$/) || ((args = 'fortbattle') && (j.match(/fortatt/) || j.match(/fortdef/)))){
//							if(j.match(/^cj_\d+$/) || ((j.match(/fortatt/) || j.match(/fortdef/)))){
								delete item.twpro_jobbonus[j];
								if(TWPro.twpro_itemStorage[item.item_id] && TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus){
									delete TWPro.twpro_itemStorage[item.item_id].twpro_jobbonus[j];
								}
								k--;
								deleted++;
							}
						}
						if(!k) delete item.twpro_jobbonus;
					}
				}
				return deleted;
			}
			else if(screen_settings){
				var select = screen_settings.getElementsByTagName("select")[0],
				shortName = screen_settings.getElementsByTagName("input")[0],
				name = screen_settings.getElementsByTagName("input")[1],
				calculation = screen_settings.getElementsByTagName("input")[2],
				enabledJob = screen_settings.getElementsByTagName("input")[3],
				wannabejob = shortName.value+"#"+enabledJob.checked*1+"#"+calculation.value+"#"+name.value;
				if(action == "load"){
					select.options.length = 0;
					if(custom){
						var customs = custom.split('|');
						for(var i=0; i<customs.length; i++){
							var custom_i = customs[i].match(REcustom), valid = true;
							if(!custom_i && (invalid = false)) custom_i = select.options[select.selectedIndex].value.match(/^(.+?)#(.+?)#(.+?)#(.+?)$/);
							if(!custom_i) continue;
							var shortName = custom_i[1],
							enabledJob = custom_i[2],
							calculation = custom_i[3],
							name = custom_i[4];
							select.add(new Option(name, shortName+"#"+enabledJob+"#"+calculation+"#"+name), null);
							select.options[select.options.length-1].style.backgroundColor = valid?enabledJob=="1"?"#A0DA78":"#FFA500":"#E89678";
						}
					}
					if(!custom || !customs.length) return TWPro.twpro_customJobs("new");
					return TWPro.twpro_customJobs("switch");
				}
				else if(select.selectedIndex >= 0){
					if(action == "switch"){
						custom = select.options[select.selectedIndex].value.match(REcustom);
						if(!custom) custom = select.options[select.selectedIndex].value.match(/^(.+?)#(.+?)#(.+?)#(.+?)$/);
						if(!custom){
							shortName.value = "cj_"+((new Date()).getTime()+"").substring(3);
							enabledJob.checked = true;
							calculation.value = "";
							name.value = TWPro.lang.NEW;
							name.style.backgroundColor = "#AODA78";
							calculation.style.backgroundColor = "#E89678";
							return 0;
						}
						window.clearTimeout(TWPro.twpro_calc_blurred);
						shortName.value = custom[1];
						enabledJob.checked = custom[2] == "1";
						calculation.value = custom[3];
						name.value = custom[4];
						TWPro.twpro_customJobs("check");
					}
					else if(action == "blur" || action == "save" || action == "new"){
						select.options[select.selectedIndex].value = wannabejob;
						select.options[select.selectedIndex].style.backgroundColor = wannabejob.match(REcustom) ? enabledJob.checked ? "#A0DA78" : "#FFA500" : "#E89678";
						select.options[select.selectedIndex].innerHTML = name.value.replace(/&/g,'&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
					}
				}
				
				if(action == "new" || action == "cleared&new"){
					if(action == "new" && (name.value == "" || name.value == TWPro.lang.NEW) && calculation.value == "" && select.options.length){
						if(select.selectedIndex < 0) select.selectedIndex = 0;
					}
					else {
						for(var i=0; i<select.options.length; i++){
							if(select.options[i].value == "" || select.options[i].value.replace(/^cj_\d+/,'') == "###" || select.options[i].value.replace(/^cj_\d+/,'') == "###"+TWPro.lang.NEW){
								select.selectedIndex = i;
								TWPro.twpro_customJobs("switch");
								return 0;
							}
						}
						document.getElementById("twpro_settings_calc_helper").style.display = "none";
						select.add(new Option(TWPro.lang.NEW, ""), null);
						select.options[select.options.length-1].style.backgroundColor = "#E89678";
						select.selectedIndex = select.options.length-1;
						select.options[select.options.length-1].value = shortName.value+"###"+TWPro.lang.NEW;
						shortName.value = "cj_"+((new Date()).getTime()+"").substring(3);
						enabledJob.checked = true;
						calculation.value = "";
						name.value = TWPro.lang.NEW;
						calculation.style.backgroundColor = "#E89678";
					}
				}
				else if(action == "check" || action == "blur"){
					name.style.backgroundColor =  ["cj_0123456789", "1", "1 * Character.skills.ride", name.value].join("#").match(REcustom) ? "#A0DA78" : "#E89678";
					var code = calculation.value,
						check = ["cj_0123456789", "1", code, "Valid name"];
					try{(function(){var res=0,i=0,select=0,args=0,check=0,calculation=0,name=0,shortName=0,wannabejob=0,enabledJob=0;if(isNaN(eval(code)))throw NaN})();}catch(e){/*new HumanMessage("Invalid TW Pro Calculation!");*/check = [];}
					if(args && args[1] == 2) shortName.value = "cj_"+((new Date()).getTime()+"").substring(3);
					wannabejob = wannabejob.replace(/^.*?#/, shortName.value+"#");
					select.options[select.selectedIndex].value = wannabejob;
					calculation.style.backgroundColor = check.join("#").match(REcustom) ? "#A0DA78" : "#E89678";
				}
				else if(action == "switchFocus"){
					if((name.value == "" || name.value == TWPro.lang.NEW) && calculation.value == ""){
						select.remove(select.selectedIndex);
						TWPro.twpro_customJobs("cleared&new");
						return 0;
					}
				}
				else if(action == "calcFocus"){
					window.clearTimeout(TWPro.twpro_calc_blurred);
					TWPro.twpro_calc_blurred = null;
					document.getElementById("twpro_settings_calc_helper").style.display = "block";
				}
				else if(action == "calcBlur"){
					TWPro.twpro_customJobs("blur", [2, calculation.value, calculation]);
					if((typeof TWPro.twpro_calc_blurred != "undefined" && TWPro.twpro_calc_blurred != null) || action == "calcBlur"){
						window.clearTimeout(TWPro.twpro_calc_blurred);
						TWPro.twpro_calc_blurred = window.setTimeout(function(){
							TWPro.twpro_customJobs("calcBlurNow");
						}, 500);
					}
				}
				else if(action == "calcBlurNow"){
					window.clearTimeout(TWPro.twpro_calc_blurred);
					TWPro.twpro_calc_blurred = null;
					document.getElementById("twpro_settings_calc_helper").style.display = "none";
				}
				else if(action == "editCalculation" && typeof args == "string" && (args in TWPro.skill_to_AttNum)){
					var calc = calculation.value,
					REcalc = new RegExp("(\\d)\\s*\\*\\s*Character\\.skills\\."+args, ""),
					match;
					if((match=calc.match(REcalc))){
						var count = match[1]*1;
						if(++count <= 9) calc = calc.replace(REcalc, count + " * Character.skills."+args);
					}
					else {
						calc += (calc==""?"":" + ")+"1 * Character.skills."+args;
					}
					calculation.value = calc;
					TWPro.twpro_customJobs("blur", [2, calc, calculation]);
					calculation.focus();
				}
				else if(action == "save"){
					var res = [], res;
					for(var i=0; i<select.options.length; i++){
						if((match=select.options[i].value.match(REcustom))){
							var code = match[2];
							(function(){var res=0,i=0,select=0,custom=0;if(isNaN(eval(code)))throw NaN})();
							res.push(encodeURIComponent(select.options[i].value));
						}
					}
					res = res.join('|');
					custom = TWPro.prefs["customJobs"] != decodeURIComponent(res);
					TWPro.prefs["customJobs"] = decodeURIComponent(res);
					if(document.getElementById("twpro_settings_persist").checked) document.cookie = "twpro_"+Character.playerId+"_customJobs="+res+"; max-age=5184000";
					return custom;
				}
			}
		}catch(e){new HumanMessage("TWPro error, customJobs: "+e)}return 0}

		function twpro_updateList() {
			if (TWPro.twpro_failure) return;
			if (!TWPro.twpro_calculated) {
				document.getElementById('twpro_jobList').blur();
				TWPro.twpro_updateInternalJobInfo();
				document.getElementById('twpro_jobList').focus();
			}
			TWPro.twpro_calculateJobs();
			TWPro.twpro_sortJobs();
			TWPro.twpro_insertListItems();
			document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
		}


	function twpro_insertListItems() {
		if (TWPro.twpro_failure) return;
		
		var twpro_jobList = document.getElementById('twpro_jobList'),
			jobsort = TWPro.twpro_jobsort,
			twpro_jobElement, twpro_apstmp, extra;

			
		for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
			var twpro_job = TWPro.twpro_jobs[twpro_i];
			var twpro_aktuelleap = twpro_job.twpro_skill - twpro_job.malus;
			var twpro_setCounter = new Object();
			for(var twpro_wear in Wear.wear){
				if(Wear.wear[twpro_wear].obj.twpro_bonus && Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName]){
				  twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
				}
				if(Wear.wear[twpro_wear].obj.set != null){
				  if(twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]==undefined){
					twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
				  }
				  else {
					twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
				  }
				}
			}
			for(var twpro_set in twpro_setCounter){
				if(twpro_setCounter[twpro_set]>=2 && TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName]){
					twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
				}
			}
			twpro_jobElement = document.createElement('option');
			
				var n = 1;
					
				if(Character.characterClass == 'worker' && twpro_job.shortName == 'construct'){
					n = PremiumBoni.hasBonus('character') ? 1.10 : 1.05;
				}
				twpro_aktuelleap = Math.floor(n*twpro_aktuelleap);

			if ( jobsort == 'xp' ) {
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].experience + ' xp';
			}
			else if ( jobsort ==  'wages' ) { 
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].wages + ' $';
			}
			else if ( jobsort ==  'luck' ) { 
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemin + ' - ' + TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemax + ' $';
			}
			else if ( jobsort ==  'danger' ) { 
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].danger + ' /!\\';
			}
			else if ( jobsort ==  'comb' ) {
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].jobrank + '%';
			}
			else {
				extra = '';
			}
//			twpro_apstmp = eval(twpro_job.twpro_aps - (twpro_job.malus<0?twpro_job.malus:0));
			twpro_apstmp = eval(TWPro.twpro_jobValues[twpro_job.shortName].laborp - (twpro_job.malus<0?twpro_job.malus:0));
//			twpro_apstmp = TWPro.twpro_jobValues[twpro_job.shortName].laborp;

			twpro_jobElement.value = twpro_i;
			twpro_strreplace = TWPro.twpro_jobs[twpro_i].name.replace(/&#039;/g,"\'");
			if(twpro_job.shortName != "speed" && twpro_job.shortName != "regeneration" ){
			if (TWPro.twpro_jobValues[twpro_job.shortName].experience < 0) {
				extra = '';
			}
			twpro_jobElement.appendChild(document.createTextNode(((twpro_strreplace.length > 25) ? (unescape(twpro_strreplace.substr(0, 23)) + '...') : unescape(twpro_strreplace)) + ' (' + eval(twpro_apstmp - 1) + ' / '+ eval(twpro_aktuelleap - 1) + ' '+TWPro.lang.LABORP+')'+extra));
			}
			else{
				if(twpro_job.shortName == "speed"){
					twpro_aktuelleap = Math.round(100*Character.default_speed/Character.speed);
					if(!isFinite(twpro_aktuelleap)) twpro_aktuelleap = 100;
					twpro_aktuelleap = twpro_aktuelleap + "%"
				}
				else if(twpro_job.shortName == "regeneration") twpro_aktuelleap = Math.round(eval(twpro_job.twpro_calculation));
			  twpro_jobElement.appendChild(document.createTextNode(((twpro_strreplace.length > 25) ? (unescape(twpro_strreplace.substr(0, 23)) + '...') : unescape(twpro_strreplace)) + ' (' + eval(twpro_apstmp - 1) + ' / '+ twpro_aktuelleap + ')'));
			}
			if (twpro_apstmp > 0) {
				if (twpro_aktuelleap <= 0) {
					twpro_jobElement.style.backgroundColor='rgb(230, 235, 108)'; // yellow
				}
				else {
					twpro_jobElement.style.backgroundColor = 'rgb(160, 218, 120)'; // green
				}
				twpro_jobList.appendChild(twpro_jobElement);
			}
			else if (!TWPro.twpro_preference('Hide_unjobs')) {
				twpro_jobElement.style.backgroundColor = 'rgb(232, 150, 120)'; // red
				twpro_jobList.appendChild(twpro_jobElement);
			}
		}
	}

	// bestimmt Sortierreihenfolge der Jobs in der Liste
	function twpro_sortJobs(){
		if (TWPro.twpro_failure) return;
		var sortby = TWPro.twpro_jobsort, twpro_jobValues = TWPro.twpro_jobValues;

		twpro_jobValues.regeneration.jobrank = twpro_jobValues.regeneration.experience = twpro_jobValues.regeneration.wages = twpro_jobValues.regeneration.luckvaluemax = twpro_jobValues.regeneration.danger = -2;

		var moneyFactor = 1 + (PremiumBoni.hasBonus('money')?.50:0), multiplier, twpro_apstmp;
		for(var i=0; i<TWPro.twpro_jobs.length; i++){
				if(!(twpro_job=TWPro.twpro_jobs[i])) continue;

				var n = 1;
					
				if(Character.characterClass == 'worker' && twpro_job.shortName == 'construct'){
					n = PremiumBoni.hasBonus('character') ? 1.10 : 1.05;
				}
				else if(Character.characterClass == 'duelist' && twpro_job.shortName == 'speed'){
					n = PremiumBoni.hasBonus('character') ? 1.20 : 1.10;
				}
//				TWPro.twpro_jobValues[twpro_job.shortName].laborp = twpro_job.twpro_aps = Math[twpro_job.shortName == 'speed' ? "round" : "floor"](n*twpro_job.twpro_aps);
//				TWPro.twpro_jobValues[twpro_job.shortName].laborp = Math[twpro_job.shortName == 'speed' ? "round" : "floor"](n*twpro_job.twpro_aps);
				TWPro.twpro_jobValues[twpro_job.shortName].laborp = Math[n != 1 ? "floor" : "round"](n*Math[twpro_job.shortName == 'speed' ? "round" : "floor"](twpro_job.twpro_aps));
				twpro_apstmp = TWPro.twpro_jobs[i].twpro_aps - (twpro_job.malus<0?twpro_job.malus:0);
				multiplier = Math.pow(Math.max(1,twpro_apstmp),.2) * moneyFactor;
				TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemin = Math.floor(5 * (.9 * TWPro.twpro_jobValues[twpro_job.shortName].glueck + 5) * multiplier);
				TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemax = Math.floor(15 * (.9 * TWPro.twpro_jobValues[twpro_job.shortName].glueck + 5) * multiplier);
				TWPro.twpro_jobValues[twpro_job.shortName].wages = Math.round((.9 * TWPro.twpro_jobValues[twpro_job.shortName].lohn + 5) * multiplier  * 2);
				if(TWPro.twpro_jobValues[twpro_job.shortName].gefahr < 0) {
				  TWPro.twpro_jobValues[twpro_job.shortName].danger = -1;
				  TWPro.twpro_jobValues[twpro_job.shortName].jobrank = -1;
				 }
				else{
				  TWPro.twpro_jobValues[twpro_job.shortName].danger = Math.round((8*Math.pow(TWPro.twpro_jobValues[twpro_job.shortName].gefahr,1.35)) / (Math.max(1,twpro_apstmp)+3));
				
				TWPro.twpro_jobValues[twpro_job.shortName].jobrank = Math.round((TWPro.multipliers.xp * TWPro.twpro_jobValues[twpro_job.shortName].erfahrung + 
												(TWPro.multipliers.wages * TWPro.twpro_jobValues[twpro_job.shortName].lohn + 
												TWPro.multipliers.luck * TWPro.twpro_jobValues[twpro_job.shortName].glueck ) * pow(Math.max(1,twpro_apstmp),0.2) + TWPro.multipliers.danger * (100 - (TWPro.twpro_jobValues[twpro_job.shortName].gefahr/((Math.max(1,twpro_apstmp)+3)/8))))/Math.max(1,(TWPro.multipliers.xp+TWPro.multipliers.wages+TWPro.multipliers.luck+TWPro.multipliers.danger)));
				}
				if(Character.characterClass == 'worker'){
					n = PremiumBoni.hasBonus('character') ? 1.10 : 1.05;
				}
				TWPro.twpro_jobValues[twpro_job.shortName].experience = Math.round(TWPro.twpro_jobValues[twpro_job.shortName].erfahrung*2*n);

				//	TWPro.twpro_jobValues[twpro_job.shortName].twpro_apstmp = twpro_apstmp;
		}



		var sortfunc = function(twpro_a, twpro_b){
			var twpro_a_str = twpro_a.name,
				twpro_b_str = twpro_b.name;
			if(sortby == 'name'){
				return twpro_a_str.localeCompare(twpro_b_str);
			}
			if(sortby == 'comb'){
				return (twpro_jobValues[twpro_a.shortName].jobrank == twpro_jobValues[twpro_b.shortName].jobrank) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].jobrank - twpro_jobValues[twpro_a.shortName].jobrank);
			}
			if(sortby == 'xp'){
				return (twpro_jobValues[twpro_a.shortName].experience == twpro_jobValues[twpro_b.shortName].experience) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].experience - twpro_jobValues[twpro_a.shortName].experience);
			} if(sortby == 'wages'){
				return (twpro_jobValues[twpro_a.shortName].wages == twpro_jobValues[twpro_b.shortName].wages) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].wages - twpro_jobValues[twpro_a.shortName].wages);
			} if(sortby == 'luck'){
				return (twpro_jobValues[twpro_a.shortName].luckvaluemax == twpro_jobValues[twpro_b.shortName].luckvaluemax) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].luckvaluemax - twpro_jobValues[twpro_a.shortName].luckvaluemax);
			} if(sortby == 'danger'){
				return (twpro_jobValues[twpro_a.shortName].danger == twpro_jobValues[twpro_b.shortName].danger) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_a.shortName].danger - twpro_jobValues[twpro_b.shortName].danger);
			}  else {
				return (twpro_jobValues[twpro_a.shortName][sortby] == twpro_jobValues[twpro_b.shortName][sortby]) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName][sortby] - twpro_jobValues[twpro_a.shortName][sortby]);
			}
		}
		TWPro.twpro_jobs.sort(sortfunc);
		//if(sortby == 'danger') TWPro.twpro_jobs.reverse();
	}

	function twpro_sortPlus(twpro_a, twpro_b) {
		if (TWPro.twpro_failure) return 0;
		var twpro_a_num = parseInt(twpro_a.substring(0, twpro_a.search(/ /)));
		var twpro_b_num = parseInt(twpro_b.substring(0, twpro_b.search(/ /)));
		return twpro_b_num - twpro_a_num;
	}

		function twpro_validSet(obj_set_obj){
			var valid = true,
				obj_set=obj_set_obj,
				disabledSets = TWPro.prefs["disabledSets"],
				wearable = true;
			if(!(obj_set_obj = typeof obj_set_obj == "string")){
				wearable = TWPro.twpro_wearItem(obj_set);
				obj_set = obj_set.set;
				TWPro.set_names[obj_set.key] = obj_set.name;
				obj_set = obj_set.key;
			}
			if(obj_set == 'season_set' || obj_set == 'set_sleeper'){
				valid = false;//No bonuses, don't calculate
			}
			else if(obj_set == 'set_dancer'){
				valid = Character.characterSex == 'female';
			}
			else if(obj_set == 'set_farmer'){
				
			}
			else if(obj_set == 'set_gentleman'){
				//valid = Character.characterSex == characterSex;
			}
			else if(obj_set == 'set_indian'){
				
			}
			else if(obj_set == 'set_mexican'){
				
			}
			else if(obj_set == 'set_pilgrim_female'){
				valid = Character.characterSex == 'female';
			}
			else if(obj_set == 'set_pilgrim_male'){
				valid = Character.characterSex == 'male';
			}
			else if(obj_set == 'set_quackery'){
				
			}
			else if(obj_set == 'fireworker_set'){
				valid = false;//Handled by TWPro.twpro_prepareItem
			}
			else if(obj_set == 'gold_set'){
				
			}
			else if(obj_set == 'greenhorn_set'){
				
			}
			else {
				if(!top.twpro_unknown_sets) top.twpro_unknown_sets = [];
				top.twpro_unknown_sets.push(obj_set);
				valid = false;//unknown set
			}
			return valid && (obj_set_obj || (disabledSets+'').indexOf('|'+obj_set+'|') == -1) && wearable;
		}


	function twpro_initializeItems(twpro_place, twpro_itemlist) {
		if (TWPro.twpro_failure) return;
		var twpro_i = 0;
		if (twpro_place == 'wear') {
			for (var twpro_wear in Wear.wear) {
				Wear.wear[twpro_wear].obj.twpro_place = twpro_place;
				Wear.wear[twpro_wear].obj.twpro_html = document.getElementById('char_' + Wear.wear[twpro_wear].obj.type);
				TWPro.twpro_bag.twpro_priceWear += Wear.wear[twpro_wear].obj.sell_price;
				TWPro.twpro_bag.twpro_countType[Wear.wear[twpro_wear].obj.type]++;
				TWPro.twpro_bag.twpro_countType_diff[Wear.wear[twpro_wear].obj.type]++;
				TWPro.twpro_wear_items_list += ';'+Wear.wear[twpro_wear].obj.item_id+';';
				if (Wear.wear[twpro_wear].obj.type == 'yield') {
					TWPro.twpro_bag.twpro_priceYields += Wear.wear[twpro_wear].obj.sell_price;
				}
				else {
					TWPro.twpro_bag.twpro_priceItems += Wear.wear[twpro_wear].obj.sell_price;
				}
				if ((Wear.wear[twpro_wear].obj.set != null) && !TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] && TWPro.twpro_validSet(Wear.wear[twpro_wear].obj)) {
					TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
					TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
				}
				if (!TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id]) {
					TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id] = 1;
				}
			}
		}
		if (twpro_place == 'bag') {
			var twpro_itemcount;
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				bagitems[twpro_bag].obj.twpro_place = twpro_place;
				bagitems[twpro_bag].obj.twpro_html = bagitems[twpro_bag].bag_item;
				if (bagitems[twpro_bag].count_text) {
					twpro_itemcount = parseInt(bagitems[twpro_bag].count_text.firstChild.data);
				}
				else {
					twpro_itemcount = 1;
				}
				TWPro.twpro_bag.twpro_priceBag += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				TWPro.twpro_bag.twpro_countType[bagitems[twpro_bag].obj.type] += twpro_itemcount;
				if (TWPro.twpro_wear_items_list.indexOf(';'+bagitems[twpro_bag].obj.item_id+';') == -1) {
				  TWPro.twpro_bag.twpro_countType_diff[bagitems[twpro_bag].obj.type]++;
				}
				if (bagitems[twpro_bag].obj.type == 'yield') {
					TWPro.twpro_bag.twpro_priceYields += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				}
				else {
					TWPro.twpro_bag.twpro_priceItems += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				}
				if ((bagitems[twpro_bag].obj.set != null) && !TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] && TWPro.twpro_validSet(bagitems[twpro_bag].obj)) {
					TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] = bagitems[twpro_bag].obj;
					TWPro.twpro_setItemsCount[bagitems[twpro_bag].obj.set.key]++;
				}
				if (!TWPro.twpro_invHashTest[bagitems[twpro_bag].obj.item_id]) {
					TWPro.twpro_invHashTest[bagitems[twpro_bag].obj.item_id] = 1;
				}
			}
		}
		else if (twpro_place == 'trader') {
			for (var twpro_obj in twpro_itemlist.items) {
				twpro_itemlist.items[twpro_obj].obj.twpro_place = twpro_place;
				twpro_itemlist.items[twpro_obj].obj.twpro_html = twpro_itemlist.items[twpro_obj].bag_item;
				twpro_itemlist.items[twpro_obj].popup.refresh();
				twpro_i++;
			}
		}
		else if (twpro_place == 'own') {
			for (var twpro_obj in twpro_itemlist.data) {
				twpro_itemlist.data[twpro_obj].twpro_place = twpro_place;
				twpro_i++;
			}
			for (var twpro_bag in twpro_itemlist.bags) {
				for (var twpro_obj in twpro_itemlist.bags[twpro_bag].items) {
					twpro_itemlist.bags[twpro_bag].items[twpro_obj].obj.twpro_html = twpro_itemlist.bags[twpro_bag].items[twpro_obj].bag_item;
				}
			}
		}
	}

	// ermittelt die optimalen Kleidungsstuecke und errechnet die resultierenden Arbeitspunkte
	function twpro_calculateJobs() {
		if (TWPro.twpro_failure) return;
		var twpro_setitembonus;
		var twpro_setitemjobname;
		for (var twpro_wear in Wear.wear) {
			TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
		}
		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
			TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
		}
		TWPro.twpro_calculated = false;
		
		// alle Setberechnungen löschen
		TWPro.twpro_setItemsCalc = {};
		TWPro.twpro_setItemsEffect = false;
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
			TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_i]] = [null];
		}
		
		// Check ob Berechnung nötig und Flags setzen --> für 1er Sets müsste hier von >=2 auf >=1 geändert werden
		TWPro.twpro_setCount = {};
		for (var twpro_setItemId in TWPro.twpro_setItems) {
			var twpro_setItem = TWPro.twpro_setItems[twpro_setItemId];
			if (twpro_setItem.twpro_wearable && TWPro.twpro_setItemsCount[twpro_setItem.set.key] >= 2) {
				TWPro.twpro_setItemsCalc[twpro_setItem.type].push(twpro_setItem);
				TWPro.twpro_setCount[twpro_setItem.set.key] = 0;
				TWPro.twpro_setItemsEffect = true;
			}

		}
		if(!TWPro.twpro_re_att){
			TWPro.twpro_re_att = {};
			TWPro.twpro_re_skill = {};
			TWPro.twpro_re_skills = {};
			for(var twpro_attname in Character.skill_names){
				var skill_names = Character.skill_names[twpro_attname];
				TWPro.twpro_re_skills[twpro_attname] = new RegExp(skill_names.join('|'), 'g');
				TWPro.twpro_re_att[twpro_attname] = new RegExp(twpro_attname, 'g');
				for(var i=0; i<skill_names.length; i++){
					TWPro.twpro_re_skill[skill_names[i]] = new RegExp(skill_names[i], 'g');
				}
			}
		}
		var re_char_skills = /Character\.skills\./g,
			regen_exist = -1;
		for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
			var twpro_job = TWPro.twpro_jobs[twpro_i];
			if(TWPro.disabledJobs[twpro_job.shortName] || (twpro_job.shortName == "regeneration" && (regen_exist=twpro_i))) continue;
			twpro_job.twpro_jobid = twpro_i;
			twpro_job.twpro_skill = eval(twpro_job.twpro_calculation);
			if(!isFinite(twpro_job.twpro_skill) || isNaN(twpro_job.twpro_skill)) twpro_job.twpro_skill = 0;
			twpro_job.twpro_skills = twpro_job.twpro_calculation.replace(/\s*\+\s*\d+$/, '').replace(re_char_skills, '');
			twpro_job.twpro_attributes = twpro_job.twpro_skills.replace(re_char_skills, '');
			for (var twpro_attname in Character.skill_names) {
				twpro_job.twpro_attributes = twpro_job.twpro_attributes.replace(TWPro.twpro_re_skills[twpro_attname], twpro_attname);
			}
		
			// Hier folgt Setberechnung, wenn oben Flag gesetzt wurde
			if (TWPro.twpro_setItemsEffect && !TWPro.twpro_setBonusParsed) {
				for (var twpro_itemSet in TWPro.twpro_setBonus) {
					var twpro_itemSetBouns = TWPro.twpro_setBonus[twpro_itemSet];
					// Berechnung ab hier auch für twpro_j=1 (war vorher 2) um auch 1er Sets zu berücksichtigen)
					for (var twpro_j = 2; twpro_j < twpro_itemSetBouns.length; twpro_j++) {
						twpro_setitembonus = twpro_itemSetBouns[twpro_j];
						twpro_setitemjobname = twpro_job.shortName;
						twpro_setitembonus.parsedBonus[twpro_setitemjobname] = (twpro_job.malus == -1 ? 0 : twpro_setitembonus.jobBonus.all) +
						(!twpro_setitembonus.jobBonus[twpro_setitemjobname] ? 0 : twpro_setitembonus.jobBonus[twpro_setitemjobname]) + TWPro.twpro_testItem(twpro_job, twpro_setitembonus);
					}
				}
			}
			twpro_job.twpro_bestStats = {};
			for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
				twpro_job.twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = 0;
			}
			if (twpro_job.shortName == "fortatt" || twpro_job.shortName == "fortdef") {
				for (var twpro_wear in Wear.wear) {
					if (twpro_wear != "left_arm") {
						TWPro.twpro_compareItem(twpro_job, Wear.wear[twpro_wear].obj);
					}
				}
				for (var twpro_bag in bagitems) {
					if (bagitems[twpro_bag].obj.type != "left_arm") {
						TWPro.twpro_compareItem(twpro_job, bagitems[twpro_bag].obj);
					}
				}
			} else if (twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef") {
				for (var twpro_wear in Wear.wear) {
					var twpro_item = Wear.wear[twpro_wear].obj;
					if (twpro_item.sub_type == "shot") {
						twpro_item.twpro_bonus = true;
						if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
						twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
						twpro_job.twpro_bestStats[twpro_item.type] = 1;
					} else if (twpro_item.sub_type != "hand") {
						TWPro.twpro_compareItem(twpro_job, twpro_item);
					}
				}
				for (var twpro_bag in bagitems) {
					var twpro_item = bagitems[twpro_bag].obj;
					if (twpro_item.sub_type == "shot") {
						twpro_item.twpro_bonus = true;
						if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
						twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
						twpro_job.twpro_bestStats[twpro_item.type] = 1;
					} else if (twpro_item.sub_type != "hand") {
						TWPro.twpro_compareItem(twpro_job, twpro_item);
					}
				}
			}  else if (twpro_job.shortName == "duelvigor") {
				for (var twpro_wear in Wear.wear) {
					var twpro_item = Wear.wear[twpro_wear].obj;
					if (twpro_item.sub_type == "hand") {
						twpro_item.twpro_bonus = true;
						if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
						twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
						twpro_job.twpro_bestStats[twpro_item.type] = 1;
					} else if (twpro_item.sub_type != "shot") {
						TWPro.twpro_compareItem(twpro_job, twpro_item);
					}
				}
				for (var twpro_bag in bagitems) {
					var twpro_item = bagitems[twpro_bag].obj;
					if (twpro_item.sub_type == "hand") {
						twpro_item.twpro_bonus = true;
						if (!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
						twpro_item.twpro_jobbonus[twpro_job.shortName] = 1;
						if (!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
						TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = 1;
						twpro_job.twpro_bestStats[twpro_item.type] = 1;
					} else if (twpro_item.sub_type != "shot") {
						TWPro.twpro_compareItem(twpro_job, twpro_item);
					}
				}
			} else {
				for (var twpro_wear in Wear.wear) {
					TWPro.twpro_compareItem(twpro_job, Wear.wear[twpro_wear].obj);
				}
				for (var twpro_bag in bagitems) {
					TWPro.twpro_compareItem(twpro_job, bagitems[twpro_bag].obj);
				}
			}
			twpro_job.twpro_aps = twpro_job.twpro_skill - Math.max(0, twpro_job.malus);
//			twpro_job.twpro_aps = twpro_job.twpro_skill - Math.max(0, twpro_job.malus+1);
				if (twpro_job.shortName == "speed") {
					if (!TWPro.twpro_bestAnimal || Character.characterClass == "greenhorn") {
						for(var twpro_bag in bagitems){
							var twpro_item = bagitems[twpro_bag].obj;
							if (twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.speed) {
								twpro_item.twpro_jobbonus.speed = 0;
								TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus.speed = 0;
							}
						}
						for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
							twpro_job.twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = 0;
						}
						twpro_job.twpro_aps = Character.characterClass == "greenhorn" ? 250 : 100;
					}
					else {
						for (var twpro_type in twpro_job.twpro_bestStats) {
							twpro_job.twpro_aps += twpro_job.twpro_bestStats[twpro_type];
						}
					}
				}
				else {
					for (var twpro_type in twpro_job.twpro_bestStats) {
						twpro_job.twpro_aps += twpro_job.twpro_bestStats[twpro_type];
					}
				}
			if (TWPro.twpro_setItemsEffect) {
				var twpro_setItem;
				twpro_job.twpro_parsedItemBonus = {};
				twpro_job.twpro_bestCombi = {};
				for (var twpro_type in twpro_job.twpro_bestStats) {
					twpro_job.twpro_bestCombi[twpro_type] = 0;
					for (var twpro_j = 1; twpro_j < TWPro.twpro_setItemsCalc[twpro_type].length; twpro_j++) {
						twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_j];
						twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id] = TWPro.twpro_testItem(twpro_job, twpro_setItem);
					}
				}
				twpro_job.twpro_noSetAps = twpro_job.twpro_aps;
			}
		}
		if (TWPro.twpro_setItemsEffect) {
			TWPro.twpro_calcSets();
		}
		if(!TWPro.disabledJobs['regeneration']){
			if(regen_exist == -1){
				twpro_job = TWPro.twpro_bestLifeRestore();
				twpro_job.twpro_jobid = TWPro.twpro_jobs.length;
				TWPro.twpro_jobs.push(TWPro.twpro_bestLifeRestore());
			}
			else TWPro.twpro_jobs[regen_exist] = TWPro.twpro_bestLifeRestore();
		}
		TWPro.twpro_setBonusParsed = true;
		TWPro.twpro_invHash = TWPro.twpro_invHashTest.join(',');
		TWPro.twpro_calculated = true;
	}

	function twpro_calcSets() {
		var twpro_testCombi = {};
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
			twpro_testCombi[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
		}
		var twpro_setCounter = TWPro.twpro_setCount;
		TWPro.twpro_testnextvalid = [];
		var twpro_testnextvalid = TWPro.twpro_testnextvalid;
		TWPro.twpro_testnextnamen = {};
		var twpro_testnextnamen = TWPro.twpro_testnextnamen;
		for (var twpro_set in twpro_setCounter) {
			twpro_testnextnamen[twpro_set] = twpro_testnextvalid.push(0) - 1;
		}
		var twpro_next = false;
		var twpro_set;
		do {
			for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
				var twpro_job = TWPro.twpro_jobs[twpro_i];
				var twpro_testAps = twpro_job.twpro_noSetAps;
				var speedfactor = 1;
					if ((twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef" || twpro_job.shortName == "duelvigor") && twpro_testCombi.right_arm) continue;
				for (var twpro_type in twpro_testCombi) {
					if (twpro_testCombi[twpro_type]) {
						twpro_testAps -= twpro_job.twpro_bestStats[twpro_type];
						var twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_testCombi[twpro_type]];
						twpro_testAps += twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id];
					}
				}
				for (var twpro_set in twpro_setCounter) {
					if (twpro_setCounter[twpro_set] > 0) {
						twpro_testAps += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
						speedfactor += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].speedBonus/100 || 0;
					}
				}
				if (twpro_job.shortName == "speed") {
					if (Character.characterClass == "greenhorn") {
						twpro_testAps = 250;
						speedfactor = 1;
						} else if (!TWPro.twpro_bestAnimal) twpro_testAps = 100;
					twpro_testAps *= speedfactor;
				}
				if (twpro_testAps > twpro_job.twpro_aps) {
					twpro_job.twpro_aps = twpro_testAps;
					for (var twpro_type in twpro_testCombi) {
						twpro_job.twpro_bestCombi[twpro_type] = twpro_testCombi[twpro_type];
					}
				}
			}
			do {
				//TWPro.anzahl3++;
				twpro_next = false;
				for (var twpro_type in twpro_testCombi) {
					var twpro_setItemsCalcType = TWPro.twpro_setItemsCalc[twpro_type];
					var twpro_testCombiType = twpro_testCombi[twpro_type];
						if (twpro_testCombiType) {
						twpro_set = twpro_setItemsCalcType[twpro_testCombiType].set.key;
						if ((--twpro_setCounter[twpro_set]) == 1) {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
						}
						else {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
						}
					}
					if ((twpro_testCombiType + 1) < twpro_setItemsCalcType.length) {
						twpro_set = twpro_setItemsCalcType[++twpro_testCombi[twpro_type]].set.key;
						if ((++twpro_setCounter[twpro_set]) == 1) {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
						}
						else {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
						}
						twpro_next = true;
						break;
					}
					else {
						twpro_testCombi[twpro_type] = 0;
					}
				}
			}
				while (twpro_next && twpro_testnextvalid.join('') > 0);
		}
		while (twpro_next);
	}

	function twpro_prepareItem(twpro_item) {
		try {
			if (TWPro.twpro_failure) return;
			var twpro_storedItem;
			if (!(twpro_storedItem=TWPro.twpro_itemStorage[twpro_item.item_id])) {
				TWPro.twpro_itemStorage[twpro_item.item_id] = {};
				twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
			}
			else {
				if ((twpro_item.twpro_bonus = twpro_storedItem.twpro_bonus)) {
					if(twpro_storedItem.twpro_jobbonus) twpro_item.twpro_jobbonus = twpro_storedItem.twpro_jobbonus;
					else twpro_item.twpro_jobbonus = {};
				}
				twpro_item.twpro_wearable = twpro_storedItem.twpro_wearable;
				return;
			}
//			if ((twpro_item.twpro_wearable = TWPro.twpro_wearItem(twpro_item))) {
			twpro_item.twpro_wearable = TWPro.twpro_wearItem(twpro_item);
				if (twpro_item["short"] == "bucket_fire") {
					twpro_item.twpro_bonus = true;
					twpro_item.twpro_jobbonus = {"fire": 15};
					twpro_storedItem.twpro_jobbonus = {"fire": 15};
					TWPro.set_names.fireworker_set = twpro_item.set.name;
				} else {
					var speed=Math.round(100/twpro_item.speed-100);
					if(!isFinite(speed) || isNaN(speed)) speed = 0;
					var twpro_i = 0;
					if (twpro_item.bonus.skills.length == undefined) {
						for (var twpro_skillname in twpro_item.bonus.skills) {
							twpro_i++;
						}
						speed += twpro_item.bonus.skills.ride*1||0;
					}
					if (twpro_item.bonus.attributes.length == undefined) {
						for (var twpro_attname in twpro_item.bonus.attributes) {
							twpro_i++;
						}
						speed += twpro_item.bonus.attributes.flexibility*1||0;
					}
					if (twpro_i > 0) {
						twpro_item.twpro_bonus = true;
						twpro_item.twpro_jobbonus = {};
						twpro_storedItem.twpro_jobbonus = {};
					}
					else {
						twpro_item.twpro_bonus = false;
					}
					if(speed > 0){
						twpro_item.twpro_jobbonus = {"speed": speed};
						twpro_storedItem.twpro_jobbonus = {"speed": speed};
						twpro_item.twpro_bonus = true;
						if (twpro_item.type == "animal") {
							if(speed > TWPro.twpro_bestAnimal) TWPro.twpro_bestAnimal = speed;
						}
					}
					if (twpro_item.damage && twpro_item.twpro_wearable) {
						var damage_type = twpro_item.type;
						if (twpro_item.sub_type) {
							damage_type += '_' + twpro_item.sub_type;
						}
						if (twpro_item.damage.damage_min > TWPro.damage_min[damage_type]) TWPro.damage_min[damage_type] = twpro_item.damage.damage_min;
						if (twpro_item.damage.damage_max > TWPro.damage_max[damage_type]) TWPro.damage_max[damage_type] = twpro_item.damage.damage_max;
						if ((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 > TWPro.damage_average[damage_type]) TWPro.damage_average[damage_type] = (twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2;
					}
				}
				twpro_storedItem.twpro_bonus = twpro_item.twpro_bonus;
//			}
//			twpro_item.twpro_wearable = TWPro.twpro_wearItem(twpro_item)
			twpro_storedItem.twpro_wearable = twpro_item.twpro_wearable;
		} catch (e) {
			new HumanMessage("TW Pro error, twpro_prepareItem: "+e+"<br />"+(twpro_item&&twpro_item.name));
		}
	}

	function twpro_wearItem(twpro_item) {
		if (TWPro.twpro_failure) return false;
		if ((twpro_item.characterClass != null) && (twpro_item.characterClass != Character.characterClass)) {
			return false;
		}
		if ((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > Character.level)) {
			return false;
		}
		if ((twpro_item.characterSex != null) && ((twpro_item.characterSex != Character.characterSex) || (Character.characterClass == 'greenhorn'))) {
			return false;
		}
		return true;
	}

	function twpro_compareItem(twpro_job, twpro_item) {
		if (TWPro.twpro_failure) return;
		var twpro_aktplus = TWPro.twpro_testItem(twpro_job, twpro_item);
		if (twpro_item.twpro_bonus) {
			twpro_item.twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
			TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
			if(twpro_job.shortName == "fortatt" || twpro_job.shortName == "fortdef") {
			  for(var i=0; i<5; i++){
				TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName+'_'+i] = twpro_item.twpro_jobbonus[twpro_job.shortName+'_'+i]
			  }
			}
		}
		if (twpro_aktplus >= twpro_job.twpro_bestStats[twpro_item.type] && twpro_item.twpro_wearable) {
			twpro_job.twpro_bestStats[twpro_item.type] = twpro_aktplus;
		}
	}

	function twpro_testItem(twpro_job, twpro_item) {
		if (TWPro.twpro_failure) return 0;
		if (twpro_job.shortName == "speed") {
			if (twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.speed) {
				return twpro_item.twpro_jobbonus.speed;
			} else {
				return 0;
			}
		}
		if (!twpro_item.twpro_bonus && !twpro_item.jobBonus) {
			return 0;
		}
		if (TWPro.twpro_itemStorage[twpro_item.item_id]) {
			if (TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] != undefined) {
				return TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName];
			}
		}
		var twpro_aktskills = twpro_job.twpro_skills;
		var twpro_aktattributes = twpro_job.twpro_attributes;
		if(twpro_job.shortName == "fortatt" || twpro_job.shortName == "fortdef") {
			var twpro_split_aktskills = twpro_aktskills.split(' + ');
			twpro_aktskills = 0;
			for(var i=0; i<twpro_split_aktskills.length; i++){
			  twpro_aktskill_to_Att = twpro_split_aktskills[i].match(/"(\w+)"/);
			  if(twpro_item.bonus.skills.length !== 0){
				  for (var twpro_skillname in twpro_item.bonus.skills) {
					  var native_skill=new RegExp('Character.skills\\["'+twpro_skillname+'"\\]','g');
					  twpro_split_aktskills[i] = twpro_split_aktskills[i].replace(native_skill, Character.skills[twpro_skillname]).replace(TWPro.twpro_re_skill[twpro_skillname], (twpro_item.bonus.skills[twpro_skillname]+(twpro_item.bonus.attributes[TWPro.skill_to_AttNum[twpro_skillname][0]]||0)));
				  }
			  }
			  if(twpro_aktskill_to_Att){
				var native_skill=new RegExp('Character.skills\\["'+twpro_aktskill_to_Att[1]+'"\\]','g');
				twpro_split_aktskills[i] = twpro_split_aktskills[i].replace(native_skill, Character.skills[twpro_aktskill_to_Att[1]]).replace(TWPro.twpro_re_skill[twpro_aktskill_to_Att[1]], (twpro_item.bonus.attributes[TWPro.skill_to_AttNum[twpro_aktskill_to_Att[1]][0]]||0));
			  }
/*			  if(!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
			  twpro_item.twpro_jobbonus[twpro_job.shortName+'_'+i] = eval((twpro_split_aktskills[i]||0).replace(/Math.pow/gi, '^').replace(/[a-z_]+/gi, '0').replace(/\^/gi, 'Math.pow'));
			  twpro_aktskills = twpro_aktskills + twpro_item.twpro_jobbonus[twpro_job.shortName+'_'+i]; */
			  if(!twpro_item.twpro_jobbonus) twpro_item.twpro_jobbonus = {};
//for (var i in twpro_item) { document.write(i+': '+twpro_item[i]+'<br>')};
//			  if(!TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus) TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus = {};
//			  twpro_item.twpro_jobbonus[twpro_job.shortName+'_'+i] = TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName+'_'+i] = eval((twpro_split_aktskills[i]||0).replace(/Math.pow/gi, '^').replace(/[a-z_]+/gi, '0').replace(/\^/gi, 'Math.pow'));
			  twpro_item.twpro_jobbonus[twpro_job.shortName+'_'+i] = eval((twpro_split_aktskills[i]||0).replace(/Math.pow/gi, '^').replace(/[a-z_]+/gi, '0').replace(/\^/gi, 'Math.pow'));
			  twpro_aktskills = twpro_aktskills + twpro_item.twpro_jobbonus[twpro_job.shortName+'_'+i];
			}
			var returnValue = twpro_aktskills||0;
		}
		else if(twpro_job.shortName.indexOf("cj_") != -1 && (twpro_aktskills.indexOf("Math.pow") != -1 || twpro_aktskills.indexOf("Character.skills") != -1)) {
		  if(twpro_item.bonus.skills.length !== 0){
			  for (var twpro_skillname in twpro_item.bonus.skills) {
				  var native_skill=new RegExp('Character.skills\\["'+twpro_skillname+'"\\]','g');
				  twpro_aktskills = twpro_aktskills.replace(native_skill, Character.skills[twpro_skillname]).replace(TWPro.twpro_re_skill[twpro_skillname], (twpro_item.bonus.skills[twpro_skillname]+(twpro_item.bonus.attributes[TWPro.skill_to_AttNum[twpro_skillname][0]]||0)));
			  }
		  }
		  for(var twpro_skillname in TWPro.skill_to_AttNum){
			  var native_skill=new RegExp('Character.skills\\["'+twpro_skillname+'"\\]','g');
			  twpro_aktskills = twpro_aktskills.replace(native_skill, Character.skills[twpro_skillname]).replace(TWPro.twpro_re_skill[twpro_skillname], (twpro_item.bonus.attributes[TWPro.skill_to_AttNum[twpro_skillname][0]]||0));
		  }
		  var returnValue = eval((twpro_aktskills||0).replace(/Math.pow/gi, '^').replace(/[a-z_]+/gi, '0').replace(/\^/gi, 'Math.pow'));
		}
		else {
		  if(twpro_item.bonus.skills.length !== 0){
			  for (var twpro_skillname in twpro_item.bonus.skills) {
				  twpro_aktskills = twpro_aktskills.replace(TWPro.twpro_re_skill[twpro_skillname], twpro_item.bonus.skills[twpro_skillname]);
			  }
		  }
		  for (var twpro_attname in twpro_item.bonus.attributes) {
			  if(!TWPro.twpro_re_att[twpro_attname]) continue;
			  twpro_aktattributes = twpro_aktattributes.replace(TWPro.twpro_re_att[twpro_attname], twpro_item.bonus.attributes[twpro_attname]);
		  }
		  var returnValue = eval(((twpro_aktskills||0)+'+'+(twpro_aktattributes||0)).replace(/[a-z_]+/gi, '0'));
		}
		return isNaN(returnValue) || !isFinite(returnValue) ? 0 : returnValue;
	}

	function twpro_changeItem(change) {

		if (TWPro.twpro_failure) return;
		TWPro.twpro_bag.twpro_priceWear = 0;
		TWPro.twpro_bag.twpro_priceBag = 0;
		TWPro.twpro_bag.twpro_priceItems = 0;
		TWPro.twpro_bag.twpro_priceYields = 0;
		TWPro.twpro_setItems = {};
		for (var twpro_set in TWPro.twpro_setBonus) {
			TWPro.twpro_setItemsCount[twpro_set] = 0;
		}
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
			TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
			TWPro.twpro_bag.twpro_countType_diff[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
		}
		TWPro.twpro_initializeItems('wear', null);
		TWPro.twpro_initializeItems('bag', null);
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
		if(change && change.inv_id && TWPro.searchInventory.cache){
			if(change.deleted) delete TWPro.searchInventory.cache[change.inv_id];
			else TWPro.twpro_searchInventory(true, change.inv_id);
		}
		if (document.getElementById('twpro_jobList').selectedIndex != 0) { // avoid full bag reload when using set filters
		  TWPro.twpro_changeJob();
		}
		}

	function selectChat(){
		if((document.getElementById('selectChatRoom').value=='1')){
			var twpro_shootBoxInnerHTML = new String();
			twpro_shootBoxInnerHTML = document.getElementById('chat_room').innerHTML;
    			twpro_shootBoxInnerHTML = twpro_shootBoxInnerHTML.concat('<object width="190" height="300" id="obj_1295394569176"><param name="movie" value="http://laconfederation.chatango.com/group"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1295394569176&a=301E19&b=100&c=CCCCCC&d=CCCCCC&e=C7B47C&f=91&h=C7B47C&j=230400&k=230400&l=000000&m=C7B47C&n=230400&q=494136&r=100&s=1&v=0&w=0"/><embed id="emb_1295394569176" src="http://laconfederation.chatango.com/group" width="190" height="300" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1295394569176&a=301E19&b=100&c=CCCCCC&d=CCCCCC&e=C7B47C&f=91&h=C7B47C&j=230400&k=230400&l=000000&m=C7B47C&n=230400&q=494136&r=100&s=1&v=0&w=0"></embed></object><br>');
			document.getElementById('chat_room').innerHTML = twpro_shootBoxInnerHTML;
		} else if ((document.getElementById('selectChatRoom').value=='-1')){
			var twpro_shootBoxInnerHTML = new String();
			twpro_shootBoxInnerHTML = ' ';
			document.getElementById('chat_room').innerHTML = twpro_shootBoxInnerHTML;	
		}else if ((document.getElementById('selectChatRoom').value=='2')){
			var twpro_shootBoxInnerHTML = new String();
			twpro_shootBoxInnerHTML = ' ';
			document.getElementById('chat_room').innerHTML = twpro_shootBoxInnerHTML;	
		}
	}
	function twpro_changeJob() {
		if (TWPro.twpro_failure) return;
		if (TWPro.twpro_calculated) {
			if(twpro_toggle_set != 0) TWPro.twpro_show_set(0);
			var twpro_jobList = document.getElementById('twpro_jobList');
			var twpro_selected = twpro_jobList.selectedIndex;
			twpro_jobList.style.backgroundColor = twpro_jobList[twpro_selected].style.backgroundColor;
			var twpro_selectedJob = parseInt(twpro_jobList[twpro_selected].value);
			var currentJobSkillsDivs = document.getElementById("twpro_currentJobSkills").getElementsByTagName("div");
			for(var i=0;i<currentJobSkillsDivs.length;i++){
				currentJobSkillsDivs[i].innerHTML = "";
				currentJobSkillsDivs[i].title = "";
			}
			document.getElementById("twpro_specialMessage").innerHTML = "";
			for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
				if (document.getElementById('char_' + TWPro.twpro_bag.twpro_types[twpro_i])) {
					document.getElementById('char_' + TWPro.twpro_bag.twpro_types[twpro_i]).className = 'wear_' + TWPro.twpro_bag.twpro_types[twpro_i];
				}
			}
			for (var twpro_wear in Wear.wear) {
				Wear.wear[twpro_wear].popup.refresh();
			}
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				bagitems[twpro_bag].popup.refresh();
				bagitems[twpro_bag].obj.twpro_html.firstChild.className = '';
			}
			if (twpro_selectedJob >= 0) {
				$("div_equipment").style.display = "none";
				var twpro_job = TWPro.twpro_jobs[twpro_selectedJob], skill;
				for(var allSkills=twpro_job.twpro_skills.replace(/Math.pow\(*/g,'').split(/\s*\+\s*/), i=0, j=0; i<allSkills.length; i++){
					if((skill=allSkills[i].match(/(\d) \* ([a-z_]+)/))){
						var skill_name = skill[2];
						for(var k=1; k<=skill[1]*1; k++){
							if(j>=currentJobSkillsDivs.length){
								var div_currentSkills = document.createElement("div");
								div_currentSkills.style.margin = "0";
								div_currentSkills.style.cssFloat = "left";
								document.getElementById("twpro_currentJobSkills").appendChild(div_currentSkills);
							}
							currentJobSkillsDivs[j++].innerHTML = '<img src="../images/skill/skills_'+TWPro.skill_to_AttNum[skill_name][0]+'.png" width="138" height="55" style="margin-left:-'+(28*TWPro.skill_to_AttNum[skill_name][1])+'px">';
							currentJobSkillsDivs[j-1].title = Character.skill_titles[skill_name];
							currentJobSkillsDivs[j-1].style.height = "27px";
							currentJobSkillsDivs[j-1].style.width = "27px";
							currentJobSkillsDivs[j-1].style.overflow = "hidden";
						}
					}
				}
				if(j-1<=7){
					$("twpro_currentJobSkills").style.top = "57px";
					$("twpro_currentJobSkills").style.overflow = "visible";
				} else{
					$("twpro_currentJobSkills").style.top = "52px";
					$("twpro_currentJobSkills").style.overflow = "auto";
				}
				var specialMessage = TWPro.specialMessages && TWPro.specialMessages[twpro_job.shortName];
				if(typeof specialMessage != "undefined"){
					if(typeof specialMessage == "function"){
						document.getElementById("twpro_specialMessage").innerHTML = specialMessage(twpro_job);
					}
					else if(typeof specialMessage == "string" || typeof specialMessage == "number"){
						document.getElementById("twpro_specialMessage").innerHTML = specialMessage;
					}
					else{// Should not happen.
						document.getElementById("twpro_specialMessage").innerHTML = specialMessage;
					}
				}
				TWPro.twpro_highlight(twpro_job);
//				var twpro_aktuelleap = twpro_job.twpro_skill - Math.max(0, twpro_job.malus) - (twpro_job.malus<0?twpro_job.malus:0);
				var twpro_aktuelleap = twpro_job.twpro_skill - Math.max(0, twpro_job.malus) - (twpro_job.malus<0?twpro_job.malus:0)-1;
//				twpro_apstmp = eval(twpro_job.twpro_aps -1 - (twpro_job.malus<0?twpro_job.malus:0));
				twpro_apstmp = eval(TWPro.twpro_jobValues[twpro_job.shortName].laborp -1 - (twpro_job.malus<0?twpro_job.malus:0));
//				twpro_apstmp = TWPro.twpro_jobValues[twpro_job.shortName].laborp;

				if(twpro_job.shortName != "speed" && twpro_job.shortName != "regeneration"){
					var twpro_setCounter = {};
					for (var twpro_wear in Wear.wear) {
						if (Wear.wear[twpro_wear].obj.twpro_bonus) {
						twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName]||0;
//						twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
						}
						if (Wear.wear[twpro_wear].obj.set != null) {
							if (twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] == undefined) {
								twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
							}
							else {
								twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
							}
						}
					}
					for (var twpro_set in twpro_setCounter) {
						if (twpro_setCounter[twpro_set] >= 2) {
						twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName] || 0;
//						twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
						}
					}
									var n = 1;
				if(Character.characterClass == 'worker' && twpro_job.shortName == 'construct'){
					n = PremiumBoni.hasBonus('character') ? 1.10 : 1.05;
				}
				twpro_aktuelleap = Math.floor(n*twpro_aktuelleap);

					document.getElementById('twpro_aktuelleapvalue').innerHTML = twpro_apstmp + ' / '+ eval(twpro_aktuelleap) + ' ' +TWPro.lang.LABORP;
				} else {
					if(twpro_job.shortName == "speed"){
						twpro_aktuelleap = Math.round(100*Character.default_speed/Character.speed);
						if(!isFinite(twpro_aktuelleap)) twpro_aktuelleap = 100;
						twpro_aktuelleap = twpro_aktuelleap + "%"
					}
					else if(twpro_job.shortName == "regeneration") twpro_aktuelleap = Math.round(eval(twpro_job.twpro_calculation));
					document.getElementById('twpro_aktuelleapvalue').innerHTML = twpro_apstmp + ' / '+ twpro_aktuelleap;
					twpro_aktuelleap = parseFloat(twpro_aktuelleap);
				}
				if (twpro_aktuelleap > 0) {
					if (twpro_aktuelleap >= twpro_apstmp) {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(118, 195, 237)'; // blue
					}
					else {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(160, 218, 120)'; // green
					}
				}
				else {
					if (twpro_job.twpro_aps > 0) {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(230, 235, 108)'; // yellow
					}
					else {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(232, 150, 120)'; // red
					}
				}
				document.getElementById('twpro_aktuelleapvalue').style.visibility = 'visible';
					if (typeof twpro_job.west_id != "undefined") {
						document.getElementById("minimap_job_id").value = twpro_job.west_id;
						if (WMinimap.visible) {
							WMinimap.update();
						}
					}
			}
			else {
				$("div_equipment").style.display = "block";
				document.getElementById('twpro_aktuelleapvalue').style.visibility = 'hidden';
			}
			TWPro.twpro_bagVis();
		}
	}
//Modif shootbox
	

	var twpro_insertDivInnerHTML = new String();
	twpro_insertDivInnerHTML = document.getElementById('abdorment_right').innerHTML;
    	twpro_insertDivInnerHTML = twpro_insertDivInnerHTML.concat('<select id="selectChatRoom" size="1" onchange="TWPro.selectChat();" style="background-color: rgb(207, 195, 166); font-size: 10px; width:120px;"><option value="-1">- Chat Room -</option><option value="1" >La confédération</option><option value="2">miaou</option></select><div id="chat_room"> </div>');     
    	document.getElementById('abdorment_right').innerHTML = twpro_insertDivInnerHTML;
	



//fin modif
	

	function twpro_highlight(twpro_job) {
		if (TWPro.twpro_failure) return;
		var job_is_fort = twpro_job.shortName == "fortatt" || twpro_job.shortName == "fortdef",
			job_is_duel_shot = twpro_job.shortName == "duelshootingatt" || twpro_job.shortName == "duelshootingdef",
			job_is_duel_hand = twpro_job.shortName == "duelvigor",
			job_is_duel = job_is_duel_shot || job_is_duel_hand;
		for (var twpro_wear in Wear.wear) {
			var twpro_item = Wear.wear[twpro_wear].obj;
			if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
				if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
					twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
				}
			}
			else {
				if ((twpro_item.twpro_wearable) &&
					(twpro_item.type != "left_arm" || (job_is_fort && !(twpro_item.damage.damage_min < TWPro.damage_min.left_arm && twpro_item.damage.damage_max < TWPro.damage_max.left_arm)) || (job_is_fort && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.left_arm)) || (!job_is_fort && twpro_item.twpro_bonus)) &&
					
					(twpro_item.type != "right_arm" || (
						(job_is_duel_shot && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_shot && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_shot)) || (job_is_duel_shot && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.right_arm_shot)) ||
						(job_is_duel_hand && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_hand && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_hand)) || (job_is_duel_hand && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.right_arm_hand))
						) || (!job_is_duel && twpro_item.twpro_bonus)) &&
					((twpro_item.type == 'animal' && ((twpro_job.shortName == "regeneration" && twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.regeneration >= twpro_job.twpro_bestAnimal) || (twpro_job.shortName != "regeneration" && Math.round(100/twpro_item.speed-100) >= TWPro.twpro_bestAnimal))) || twpro_item.type != 'animal' && (((twpro_item.twpro_bonus == false) && (twpro_job.twpro_bestStats[twpro_item.type] == 0)) || ((twpro_item.twpro_bonus == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type]))))) {
					twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
				}
			}
		}
		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
			var twpro_item = bagitems[twpro_bag].obj;
			if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
				if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
					twpro_item.twpro_html.firstChild.className = 'wear_yield_highlight';
				}
			}
			else {
				if ((twpro_item.twpro_wearable) &&
					(twpro_item.type != "left_arm" || (job_is_fort && !(twpro_item.damage.damage_min < TWPro.damage_min.left_arm && twpro_item.damage.damage_max < TWPro.damage_max.left_arm)) || (job_is_fort && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.left_arm)) || (!job_is_fort && twpro_item.twpro_bonus)) &&
					
					(twpro_item.type != "right_arm" || (
						(job_is_duel_shot && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_shot && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_shot)) || (job_is_duel_shot && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.right_arm_shot)) ||
						(job_is_duel_hand && !(twpro_item.damage.damage_min < TWPro.damage_min.right_arm_hand && twpro_item.damage.damage_max < TWPro.damage_max.right_arm_hand)) || (job_is_duel_hand && !((twpro_item.damage.damage_min + twpro_item.damage.damage_max)/2 < TWPro.damage_average.right_arm_hand))
						) || (!job_is_duel && twpro_item.twpro_bonus)) &&
					((twpro_item.type != 'animal' || (twpro_job.shortName == "regeneration" && twpro_item.twpro_jobbonus && twpro_item.twpro_jobbonus.regeneration >= twpro_job.twpro_bestAnimal) || (twpro_job.shortName != "regeneration" && Math.round(100/twpro_item.speed-100) >= TWPro.twpro_bestAnimal)) && ((((twpro_item.type == 'yield') || (twpro_item.type == 'right_arm')) && (twpro_item.twpro_bonus == true) && (twpro_job.twpro_bestStats[twpro_item.type] > 0) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type])) || ((twpro_item.type != 'yield') && (twpro_item.type != 'right_arm') && (((twpro_item.twpro_bonus == false) && (twpro_job.twpro_bestStats[twpro_item.type] == 0)) || ((twpro_item.twpro_bonus == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type]))))))) {
					twpro_item.twpro_html.firstChild.className = 'wear_yield_highlight';
				}
			}
		}
	}
	if(typeof window.TWPro == 'undefined'){try{
		window.twpro_initLanguage = twpro_initLanguage;
		window.TWPro = {};
		TWPro.lang = twpro_lang;
		TWPro.skill_to_AttNum = skill_to_AttNum;
		TWPro.specialMessages = specialMessages;
		TWPro.twpro_injectScript = twpro_injectScript;
		TWPro.twpro_preference = twpro_preference;
		TWPro.twpro_throwFailure = twpro_throwFailure;
		TWPro.twpro_injectionSwitch = twpro_injectionSwitch;
		TWPro.twpro_activeJob = twpro_activeJob;
		TWPro.twpro_getPlace = twpro_getPlace;
		TWPro.twpro_popup = twpro_popup;
		TWPro.twpro_insertList = twpro_insertList;
		TWPro.twpro_handleJobrank = twpro_handleJobrank;
		TWPro.twpro_searchInventory = twpro_searchInventory;
		TWPro.twpro_internalWindowToTop = internalWindowToTop;
		TWPro.twpro_bagVis = twpro_bagVis;
		TWPro.twpro_sortList = twpro_sortList;
		TWPro.twpro_show_set = twpro_show_set;
		TWPro.twpro_jobSortMark = twpro_jobSortMark;
		TWPro.twpro_showList = twpro_showList;
		TWPro.twpro_getBagPopup = twpro_getBagPopup;
		TWPro.twpro_clickList = twpro_clickList;
		TWPro.twpro_clickfilterList = twpro_clickfilterList;
		TWPro.twpro_updateList = twpro_updateList;
		TWPro.twpro_insertListItems = twpro_insertListItems;
		TWPro.twpro_sortJobs = twpro_sortJobs;
		TWPro.twpro_sortPlus = twpro_sortPlus;
		TWPro.twpro_initializeItems = twpro_initializeItems;
		TWPro.twpro_calculateJobs = twpro_calculateJobs;
		TWPro.twpro_calcSets = twpro_calcSets;
		TWPro.twpro_prepareItem = twpro_prepareItem;
		TWPro.twpro_wearItem = twpro_wearItem;
		TWPro.twpro_compareItem = twpro_compareItem;
		TWPro.twpro_testItem = twpro_testItem;
		TWPro.twpro_changeItem = twpro_changeItem;
		TWPro.twpro_changeJob = twpro_changeJob;
		TWPro.selectChat=selectChat;
		TWPro.twpro_highlight = twpro_highlight;
		TWPro.twpro_updateInternalJobInfo = twpro_updateInternalJobInfo;
		TWPro.twpro_validSet = twpro_validSet;
		TWPro.twpro_disableJobs = twpro_disableJobs;
		TWPro.twpro_moveJobSetting = twpro_moveJobSetting;
		TWPro.twpro_confirmHideJobs = twpro_confirmHideJobs;
		TWPro.twpro_customJobs = twpro_customJobs;
		TWPro.twpro_searchTrader = twpro_searchTrader;
		TWPro.twpro_bestLifeRestore = twpro_bestLifeRestore;
		TWPro.twpro_sleeperBonus = twpro_sleeperBonus;
		TWPro.twpro_setInfo = twpro_setInfo;
		// clean up to avoid possible memory leaks
		twpro_initLanguage = twpro_lang = skill_to_AttNum = specialMessages = twpro_injectScript = twpro_preference = twpro_throwFailure = twpro_injectionSwitch = twpro_activeJob = twpro_getPlace = twpro_popup = twpro_insertList = twpro_handleJobrank = twpro_searchInventory = internalWindowToTop = twpro_bagVis = twpro_sortList = twpro_show_set = twpro_jobSortMark = twpro_showList = twpro_getBagPopup = twpro_clickList = twpro_clickfilterList = twpro_updateList = twpro_insertListItems = twpro_sortJobs = twpro_sortPlus = twpro_initializeItems = twpro_calculateJobs = twpro_calcSets = twpro_prepareItem = twpro_wearItem = twpro_compareItem = twpro_testItem = twpro_changeItem = twpro_changeJob = twpro_highlight = twpro_updateInternalJobInfo = twpro_validSet = twpro_disableJobs = twpro_moveJobSetting = twpro_confirmHideJobs = twpro_customJobs = twpro_searchTrader = twpro_bestLifeRestore = twpro_sleeperBonus = twpro_setInfo = null;
		//TWPro.twpro_injectScript();
		window.addEvent('domready', TWPro.twpro_injectScript);
		// WMap binds too early to AjaxWindow, causing any twpro_injectionSwitch to fail
		// if (typeof WMap != "undefined")	WMap.recalcMarker();
		}catch(e){alert(e)}
	}
	// export other stuff, not related to TW Pro item stuff

	(function(){
		try{
			
			window.convertduelreport = convertduelreport;
			window.convertduelreportfunc = convertduelreportfunc;
			window.makefortmessage = makefortmessage;
			window.makefortlist = makefortlist;
			window.makeadvicemessage = makeadvicemessage;
			window.makeadvicelist = makeadvicelist;
			convertduelreportfunc = makefortlist = makeadvicelist = null;
			
			(Reports.show = eval('('+Reports.show.toString()
								 .replace('{', '{data=convertduelreport("window_reports_show_"+report_id, data);')
								 +')')).bind(Reports);
		}catch(e){}
	})();
	if(!('_expand_answer' in Messages)){
		Messages._expand_answer = Messages.expand_answer;
		Messages.expand_answer = function(){
			Messages._expand_answer();
			window.insertbbcodesfunc(document.getElementById('answer_field_row').getElementsByTagName('textarea')[0], false);
		};
	}
			// BBCode at reports
			try {
				if (ReportPublish.selectPublish.toString().indexOf("textarea_height") == -1) {
					var hook = 'try{var textarea_height=0;(' + (function(){
						for(var i=0, report_links=[]; i<reportIds.length; i++){
							var hash = document.getElementById("window_reports_show_"+reportIds[i]+"_content");
							hash = hash && hash.innerHTML.match(/showLink\(\d+,\s*'([^']+)'\)/);
							var hash_title;
							if(hash){
								hash = hash[1];
							}
							else{
								hash = document.getElementById("reportList_title_" + reportIds[i]);
								if(hash){
									hash_title = hash.textContent || hash.innerText;
									hash = hash.href.match(/'([^']+)'/);
									if(hash) hash = hash[1];
								}
							}
							if(!hash_title){
								hash_title = document.getElementById('report_title_'+reportIds[i]);
								hash_title = hash_title && hash_title.hashtitle || null;
							}
							if(hash && hash_title){
								report_links.push('[report='+
									reportIds[i] + hash
								+']'+
									hash_title
								+'[/report]');
							}
						}
						if(1){
							textarea_height = 15 * (1 + Math.min(5, report_links.length));
							xhtml += '<textarea rows="3" cols="50" style="width:365px;height:'+textarea_height+'px" class="input_layout" onclick="this.select()" readonly="readonly">'+report_links.join("\n")+"</textarea>";
						}
					}).toString() + ')()}catch(e){}';
					ReportPublish.selectPublish = eval('('+ReportPublish.selectPublish.toString().replace(
						/(showMessage\(xhtml,\s*header,)[^,]+,[^,]+/,
						hook+';$1 400, 300+textarea_height'
					)+')');
				}
			}
			catch (e) {alert(e)}
}
}}} // check_TW_version ends here

{ // BBcodes
	function insertBBcode(startTag, endTag, elementid) {
		var input = document.getElementById(elementid);
		input.focus();
		/* für Internet Explorer */
		if (typeof document.selection != 'undefined') {
			/* Einfügen */
			var range = document.selection.createRange();
			var insText = range.text;
			range.text = startTag + insText + endTag;

			/* Cursorposition anpassen */
			range = document.selection.createRange();
			if (insText.length == 0) {
				range.move('character', -endTag.length);
			} else {
				range.moveStart('character', startTag.length + insText.length + endTag.length);
			}
			range.select();
		}
		/* für neuere auf Gecko basierende Browser */
		else if (typeof input.selectionStart != 'undefined') {
			/* BB code bugfix: scrolling by Lekensteyn <lekensteyn@gmail.com> */
			input.focus();
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var sts = input.scrollTop;
			var ste = input.scrollHeight;
			var insText = input.value.substring(start, end);
			input.value = input.value.substr(0, start) + startTag + insText + endTag + input.value.substr(end);
			var pos;
			if(insText.length == 0){
				pos = start + startTag.length;
			}
			else{
				pos = start + startTag.length + insText.length + endTag.length;
			}
			input.selectionStart = pos;
			input.selectionEnd = pos;
			input.scrollTop = sts + input.scrollHeight - ste;
		}
	}

	window.insertBBcode = insertBBcode;

	function insertbbcodesfunc(messagebox, extended) {
		if(window.TWPro && !window.TWPro.enablebbcodes) return;
		var bbcodeplace = messagebox.parentNode;
		var elementidmessagebox;
		if(!(elementidmessagebox=messagebox.id)) elementidmessagebox = messagebox.id = 'twpro_bbbar'+Math.random();
		var bbs = ['b', 'i', 'u', 's', 'player', 'town', 'fort', 'quote=Author', 'url'];
		if(extended) bbs.push('img', 'color=red', 'size=10');
		var bbtemplate = ' <img src="images/transparent.png" onclick="insertBBcode(\'[%1]\', \'[/%2]\', \''+elementidmessagebox+'\');" alt="%1" style="background-image:url(../images/bbcodes.png);background-position: -%3px;height:20px;width:20px;margin:6px 1px;" />';
		var bbhtml = '';
		for(var i=0; i<bbs.length; i++){
			bbhtml += bbtemplate.replace(/%1/g, bbs[i]).replace(/%2/g, bbs[i].replace(/=.+/, '')).replace(/%3/g, i*20);
		}
		var bbbar = document.createElement('div');
		bbbar.id = 'new_bbbar';
		bbbar.innerHTML = bbhtml;
		bbcodeplace.insertBefore(bbbar, messagebox)

	}
}

var url = window.location.href;
if (url.indexOf("forum.php?page=") != -1) {
	if (url.indexOf("page=forum&mode=new_thread") != -1 || ((url.indexOf("&answer") != -1 || url.indexOf("&edit_post")) && url.indexOf("page=thread") != -1)) {
		window.insertBBcode = insertBBcode;
		window.insertbbcodesfunc = insertbbcodesfunc;
		insertBBcode = insertbbcodesfunc = null;
		var ta = document.getElementsByTagName('textarea');
		if(ta.length){
		  if(ta[0].parentNode.firstChild.id != 'new_bbbar') window.insertbbcodesfunc(ta[0], true);
		}
	}
}
})

if (url.indexOf("game.php") != -1) {

/***************************************************************
* DOM Storage Wrapper Class
* 
* Public members:
*     ctor({"session"|"local"}[, <namespace>])
*     setItem(<key>, <value>)
*     getItem(<key>, <default value>)
*     removeItem(<key>)
*     keys()
***************************************************************/
function Storage(type, namespace) {
	var object = this;

	if(typeof(type) != "string")
		type = "session";

	switch(type) {
		case "local": {
			object.storage = localStorage;
		} break;

		case "session": {
			object.storage = sessionStorage;
		} break;

		default: {
			object.storage = sessionStorage;
		} break;
	}

	if (!namespace || (typeof(namespace) != "string" && typeof(namespace) != "number"))
		namespace = "ScriptStorage";

	object.namespace = [namespace, "."].join("");

	object.setItem = function(key, value) {
		try {
			object.storage.setItem(escape([object.namespace, key].join("")), JSON.stringify(value));
		}
		catch(e) {
		}
	}

	object.getItem = function(key, defaultValue) {
		try {
			var value = object.storage.getItem(escape([object.namespace, key].join("")));
			if(value)
				return eval(value);
			else
				return defaultValue;
		}
		catch(e) {
			return defaultValue;
		}
	}

	object.removeItem = function(key) {
		try {
			object.storage.removeItem(escape([object.namespace, key].join("")));
		}
		catch(e) {
		}
	}

	object.keys = function() {
		var array = [];
		var i = 0;
		do {
			try {
				var key = unescape(object.storage.key(i++));
				if(key.indexOf(object.namespace) == 0 && object.storage.getItem(key))
					array.push(key.slice(object.namespace.length));
			}
			catch(e) {
				break;
			}
		} while(true);
		return array;
	}
}

/***************************************************************
* ScriptUpdater Class
* 
* Public members:
*     ScriptUpdater.check(<script id>, <current script version>[, <callback function>])
*     ScriptUpdater.forceCheck(<script id>, <current script version>[, <callback function>])
*     ScriptUpdater.forceNotice(<script id>, <current script version>[, <callback function>])
***************************************************************/
ScriptUpdater = {
	id: 74144,
	version: "1.03",
	scriptId: null,
	scriptCurrentVersion: null,
	scriptCallbackFunction: null,
	scriptUseNotice: null,
	scriptForceNotice: null,
	scriptMetaTags: null,
	scriptStorage: null,
	icons: {
		install: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
		close: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
		uso: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D"
	},


	$: function(id) {
		return document.getElementById(id);
	},

	initialize: function(scriptId, scriptCurrentVersion, scriptCallbackFunction, scriptUseNotice, scriptForceNotice) {
		ScriptUpdater.scriptId = scriptId;
		ScriptUpdater.scriptCurrentVersion = scriptCurrentVersion;
		ScriptUpdater.scriptCallbackFunction = typeof(scriptCallbackFunction) == "function" ? scriptCallbackFunction : false;
		ScriptUpdater.scriptUseNotice = scriptUseNotice;
		ScriptUpdater.scriptForceNotice = scriptForceNotice;
		if(ScriptUpdater.scriptStorage == null) {
			ScriptUpdater.scriptStorage = new Storage("local", "ScriptUpdater." + scriptId);
		}
	},

	setValue: function(key, value) {
		if(ScriptUpdater.scriptStorage != null) {
			ScriptUpdater.scriptStorage.setItem(key, value);
		}
	},

	getValue: function(key, defaultValue) {
		if(ScriptUpdater.scriptStorage != null) {
			return ScriptUpdater.scriptStorage.getItem(key, defaultValue);
		}
		else {
			return defaultValue;
		}
	},

	getOffers: function() {
		var offers = ScriptUpdater.getValue("offers", "");
		return (typeof(offers) == "undefined" || typeof(offers.length) == "undefined" || typeof(offers.push) == "undefined") ? new Array() : offers;
	},

	addOffer: function(version) {
		var offers = ScriptUpdater.getOffers();
		offers.push(version);
		ScriptUpdater.setValue("offers", offers);
	},

	alreadyOffered: function(version) {
		var offers = ScriptUpdater.getOffers();
		for(var i = 0; i < offers.length; i++) {
			if(version.toString() == offers[i].toString())
				return true;
		}
		return false;
	},

	addStyle: function(css) {
		var head = document.getElementsByTagName("head")[0];
		if (!head)
			return;
		var style = document.createElement("style");
		style.type = "text/css";
		style.textContent = css;
		head.appendChild(style);
	},

	parseMetaTags: function(metaTags) {
	 function find_meta(element, index, array) {  
	   return (element.indexOf("// @") != -1);  
	 }  
		var headers = {};
		var name, prefix, header, key, value;
		var lines = metaTags.split(/\n/).filter(find_meta);
		for(var i in lines) {
			if(typeof(lines[i]) == "string") {
				name = lines[i].match(/\/\/ @(\S+)\s*.*/)[1];
				value = lines[i].match(/\/\/ @\S+\s*(.*)/)[1];
				key = name.split(/:/).reverse()[0];
				prefix = name.split(/:/).reverse()[1];
				
				if(prefix) {
					if(!headers[prefix]) {
						headers[prefix] = new Object;
					}
					header = headers[prefix];
				}
				else {
					header = headers;
				}
				
				if(header[key] && !(header[key] instanceof Array)) {
					header[key] = new Array(header[key]);
				}

				if(header[key] instanceof Array)
					header[key].push(value);
				else
					header[key] = value;
			}
		}
		return headers;
	},

	checkRemoteScript: function() {
		
		if(ScriptUpdater.scriptCurrentVersion && !ScriptUpdater.alreadyOffered(ScriptUpdater.scriptCurrentVersion)) {
			ScriptUpdater.addOffer(ScriptUpdater.scriptCurrentVersion);
		}
		
		var date = new Date();
		ScriptUpdater.setValue("lastCheck", parseInt(date.getTime()));

		var su_script=document.createElement('iframe');
		su_script.setAttribute('id', 'updater_93313');
		su_script.setAttribute('style', 'display:none;');
		su_script.src="http://userscripts.org/scripts/source/93313.meta.js";
		document.body.appendChild(su_script);

		window.addEventListener('message', onMessage, true);


		function onMessage(e){
		if (e.origin != "http://userscripts.org") return;
		  myversion = unescape(e.data);
		  if (myversion.substring(0, myversion.indexOf("/")) == 93313) gonextstep();
		}
		function gonextstep(){
			ScriptUpdater.scriptMetaTags = ScriptUpdater.parseMetaTags(myversion);
			ScriptUpdater.setValue("versionAvailable", ScriptUpdater.scriptMetaTags.version);
			if(ScriptUpdater.scriptForceNotice || (!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version) && ScriptUpdater.scriptUseNotice)) {
				if(!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version)) {
					ScriptUpdater.addOffer(ScriptUpdater.scriptMetaTags.version);
				}
				ScriptUpdater.showNotice();
			}
			if(typeof(ScriptUpdater.scriptCallbackFunction) == "function") {
				ScriptUpdater.scriptCallbackFunction(ScriptUpdater.scriptMetaTags.version);
			}
		}
	},

	getLastCheck: function() {
		return ScriptUpdater.getValue("lastCheck", 0);
	},

	getInterval: function() {
		var interval = ScriptUpdater.getValue("interval", 86400000);
		return (typeof(interval) == "undefined" || !interval.toString().match(/^\d+$/)) ? 86400000 : parseInt(interval.toString());
	},

	setInterval: function(interval) {
		ScriptUpdater.setValue("interval", parseInt(interval));
	},

	check: function(scriptId, scriptVersion, scriptCallbackFunction) {
		ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
		var date = new Date();
		if((date.getTime() - ScriptUpdater.getLastCheck()) > ScriptUpdater.getInterval()) {
			ScriptUpdater.checkRemoteScript();
		}
	},

	forceCheck: function(scriptId, scriptVersion, scriptCallbackFunction) {
		ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
		ScriptUpdater.checkRemoteScript();
	},

	forceNotice: function(scriptId, scriptVersion, scriptCallbackFunction) {
		ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, true);
		ScriptUpdater.checkRemoteScript();
	},

	showNotice: function() {
		if(ScriptUpdater.scriptMetaTags.name && ScriptUpdater.scriptMetaTags.version) {
			ScriptUpdater.addStyle([
				["#ScriptUpdater", ScriptUpdater.scriptId, "Mask { position:fixed; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body * { border:none; font-size:12px; color:#333; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body { width:500px; margin:auto; top:125px; position:fixed; left:35%; text-align:left; background:#DED7C5; border:1px outset #333; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em ; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body strong { font-weight:bold; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 { font-size:13px; font-weight:bold; padding:.5em; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h2 { font-weight:bold; margin:.5em 1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; cursor:help; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a:hover { text-decoration:underline; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body table { width:auto; margin:0 1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr td { line-height:2em; font-weight:bold; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body li { list-style-type:circle; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body p { font-size:12px; font-weight:normal; margin:1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "History { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "History ul { margin-left:2em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Close { float:right; cursor:pointer; height:14px; opacity:.5; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Close:hover { opacity:.9; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer { margin:.75em 1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:70px; float:right; margin-left:.5em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input:hover { background-color:#f9f9f9; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer select { border:1px inset #666; }"].join(""),
				""
			].join("\n"));

			var html = new Array();
			html.push(["<h2><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.id, "\" target=\"_blank\" title=\"About the Userscripts.org Script Updater\"><img src=\"", ScriptUpdater.icons.uso, "\" align=\"absmiddle\" style=\"margin-top:-2px;\"/></a><img id=\"ScriptUpdater", ScriptUpdater.scriptId, "Close\" src=\"", ScriptUpdater.icons.close, "\" title=\"Close\"/>Userscripts.org Updater</h2>"].join(""));

			if(!ScriptUpdater.scriptForceNotice) {
				html.push(["<p>There is a new version of <strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\">", ScriptUpdater.scriptMetaTags.name, "</a></strong> available for installation.</p>"].join(""));
			}
			else {
				html.push(["<p><strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\" style=\"margin:0; padding:0;\">", ScriptUpdater.scriptMetaTags.name, "</a></strong></p>"].join(""));
			}

			if(ScriptUpdater.scriptCurrentVersion) {
				html.push(["<p>You currently have version <strong>", ScriptUpdater.scriptCurrentVersion, "</strong> installed. The latest version is <strong>", ScriptUpdater.scriptMetaTags.version, "</strong></p>"].join(""));
			}

			if(ScriptUpdater.scriptMetaTags.history) {
				html.push(["<h2>Version History:</h2><div id=\"ScriptUpdater", ScriptUpdater.scriptId, "History\">"].join(""));

				var history = new Array();
				var version, desc;
				if(typeof(ScriptUpdater.scriptMetaTags.history) != "string") {
					for(var i = 0; i < ScriptUpdater.scriptMetaTags.history.length; i++) {
						version = ScriptUpdater.scriptMetaTags.history[i].match(/(\S+)\s+.*$/)[1];
						change = ScriptUpdater.scriptMetaTags.history[i].match(/\S+\s+(.*)$/)[1];
					
						history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
						history[version].push(change);
					}
				}
				else {
						version = ScriptUpdater.scriptMetaTags.history.match(/(\S+)\s+.*$/)[1];
						change = ScriptUpdater.scriptMetaTags.history.match(/\S+\s+(.*)$/)[1];
					history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
					history[version].push(change);
				}

				for(var v in history) {
					if(typeof(v) == "string" && v.match(/v?[0-9.]+[a-z]?/) || typeof(v) == "number") {
						html.push(["<div style=\"margin-top:.75em;\"><strong>v", v, "</strong></div><ul>"].join(""));
						for(var i = 0; i < history[v].length; i++) {
							html.push(["<li>", history[v][i], "</li>"].join(""));
						}
						html.push("</ul>");
					}
				}

				html.push("</div>");
			}

			html.push(["<div id=\"ScriptUpdater" + ScriptUpdater.scriptId + "Footer\">", "<input type=\"button\" id=\"ScriptUpdater", ScriptUpdater.scriptId, "CloseButton\" value=\"Close\" style=\"background-image:url(", ScriptUpdater.icons.close, ")\"/><input type=\"button\" id=\"ScriptUpdater" + ScriptUpdater.scriptId + "BodyInstall\" value=\"Install\" style=\"background-image:url(", ScriptUpdater.icons.install, ");\"/>", "Check this script for updates "].join(""));
			html.push(["<select id=\"ScriptUpdater", ScriptUpdater.scriptId, "Interval\">",
				"<option value=\"3600000\">every hour</option>",
				"<option value=\"21600000\">every 6 hours</option>",
				"<option value=\"86400000\">every day</option>",
				"<option value=\"604800000\">every week</option>",
				"<option value=\"0\">never</option>",
			"</select>"].join(""));
			html.push("</div>");

			var noticeBackground = document.createElement("div");
			noticeBackground.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Mask"].join("");
			document.body.appendChild(noticeBackground);

			var noticeWrapper = document.createElement("div");
			noticeWrapper.setAttribute("style", "position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;");
			noticeWrapper.id = ["ScriptUpdater", ScriptUpdater.scriptId, "BodyWrapper"].join("");

			var notice = document.createElement("div");
			notice.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Body"].join("");
			notice.innerHTML = html.join("");

			noticeWrapper.appendChild(notice);

			document.body.appendChild(noticeWrapper);

			ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Close"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
			ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "CloseButton"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
			ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "BodyInstall"].join("")).addEventListener("click", function() {
				setTimeout(ScriptUpdater.closeNotice, 500);
				document.location = ["http://userscripts.org/scripts/source/", ScriptUpdater.scriptId, ".user.js"].join("");
			}, true);

			var selector = ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Interval"].join(""));
			for(var i = 0; i < selector.options.length; i++) {
				if(selector.options[i].value.toString() == ScriptUpdater.getInterval().toString())
					selector.options[i].selected = true;
			}

			ScriptUpdater.setInterval(selector.value);
			selector.addEventListener("change", function() {
				ScriptUpdater.setInterval(selector.value);
			}, true);

			window.addEventListener("keyup", ScriptUpdater.keyUpHandler, true);
		}
	},

	closeNotice: function() {
		document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'BodyWrapper'].join("")));
		document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'Mask'].join("")));
		window.removeEventListener("keyup", ScriptUpdater.keyUpHandler, true);
	},

	keyUpHandler: function(event) {
		switch(event.keyCode) {
			case 27:
				ScriptUpdater.closeNotice();
				break;
		}
	}
};

//ScriptUpdater.forceNotice(93313, twpro_version);
//ScriptUpdater.forceCheck(93313, twpro_version);
ScriptUpdater.check(93313, twpro_version);
}
}
else
{
  (function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){
	function sendMessage(){
	  var dstWindow = window.parent;
	  mymessage = String(escape(document.body.textContent));
	  if(dstWindow.postMessage){
		dstWindow.postMessage('93313'+mymessage, '*');
	  }
	}
	sendMessage();
  })
}