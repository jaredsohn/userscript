// ==UserScript==
// @name        CTRL+W_armadaMushRoom
// @namespace   Mush
// @include     http://mush.vg/*
// @include     http://mush.twinoid.com/*
// @include     http://mush.twinoid.es/*
// @require     http://ctrl-w.badconker.com/js/sprintf.min.js
// @version     0.33
// ==/UserScript==

var Main = unsafeWindow.Main;
Main.k = function() {};
Main.k.version = GM_info.script.version;
Main.k.website = "http://ks26782.kimsufi.com/ctrlw";
Main.k.servurl = "http://ctrl-w.badconker.com";
Main.k.servurl_badconker = 'http://ctrlw.badconker.com';
Main.k.topicurl = "http://twd.io/e/KKyl0g";
Main.k.window = window;
Main.k.domain = document.domain;
Main.k.mushurl = 'http://' + document.domain;

Main.k.text = {};
Main.k.langpack = {};
Main.k.langpack.fr = {};
Main.k.langpack.en = {};
Main.k.langpack.es = {};

/************************* TRANSLATIONS **********************/
Main.k.setuptranslations = function() {
	/********* FRENCH ************/
	var text = {};
	text.menuPlay = "Jouer";
	text.menuAccount = "Mon compte";
	text.menuRanking = "Classements";
	text.menuForum = "Forum";
	text.menuHelp = "Aide";
	text.menuCastings = "Castings";
	text.menuVending = "Distributeur";
	text.menuXP = "Expérience";
	text.menuMyFile = "Ma fiche";
	text.menuMySettings = "Mes réglages";
	text.menuNews = "News";
	text.menuHelpMush = "Aide Mush";
	text.menuPatchlog = "Patchlog";
	text.menuTutoChar = "Tuto %s";

	text.menuForumDiscussion = "Discussion";
	text.menuForumDiscussionId = 67061;
	text.menuForumAdvice = "Entraide";
	text.menuForumAdviceId = 67561;
	text.menuForumLounge = "Détente";
	text.menuForumLoungeId = 74323;
	text.menuForumCastings = "Castings";
	text.menuForumCastingsId = 93847;
	text.menuForumOfficers = "Officiers";
	text.menuForumOfficersId = 78267;

	// Tutorial topics' url
	text.tutorials = {};
	text.tutorials["eleesha"] = 20507142;
	text.tutorials["janice"] = 19645493;
	text.tutorials["chao"] = 21006818;
	text.tutorials["terrence"] = 20598308;
	text.tutorials["paola"] = 20451046;
	text.tutorials["raluca"] = 20458805;
	text.tutorials["roland"] = 20340650;
	text.tutorials["ian"] = 20442357;
	text.tutorials["frieda"] = 19689575;
	text.tutorials["finola"] = 20507704;
	text.tutorials["jin su"] = 19614210;
	text.tutorials["gioele"] = 20629766;
	text.tutorials["kuan ti"] = 20719766;
	text.tutorials["chun"] = 20552058;
	text.tutorials["hua"] = 20261535;
	text.tutorials["stephen"] = 19654941;

	// Titles
	text.TITLES = {
		commander: ["Commandant", "Le Commandant décide des planètes que le Daedalus explorera."],
		comms: ["Responsable de Communications", "Le Responsable de Communications est la seule personne habilitée à décider quels seront les téléchargements prioritaires du Centre de Communication."],
		admin: ["Administrateur NERON", "Le responsable NERON semble avoir une certaine influence auprès de l'ordinateur de bord. Il est notamment le seul à avoir la possibilité de transmettre des messages à tout l'équipage."]
	};

	// Ctrl+W options
	text.optionsWarning = "Plus d'options disponibles prochainement.";
	text.options = [
		"Activer la mise en forme personnalisée des messages (bordure + couleur nom + image de fond).",
		"Simplifier la mise en forme personnalisée des messages (suppression de l'image de fond).",
		"Afficher le logo Mush au dessus des onglets.",
		"Séparer les projets / recherches / pilgred sous la zone de jeu.",
		"Désactiver les confirmations d'actions bénéfiques pour l'équipages en tant que Mush."
	];
	
	//Astropad
	text.astroUpdated = 'Astropad synchronisé.';
	
	//Confirm
	text.confirmBeneficialAction = '\r\n		<h4>Vous êtes du Mush !</h4>\r\n		<p>Cette action est bénéfique pour l\'équipage du Deaedalus et votre rôle est de les convertir ou de détruire le Daedalus. Êtes-vous vraiment sûr de vouloir faire cela ?</p>\r\n	';
	
	// Misc text
	text.needPageReload = " Nécessite un rechargement de la page.";
	text.about = "à propos";
	text.tools = "outils";
	text.titles = "titres";
	text.crew = "équipage";
	text.shelf = "inventaire";
	text.aboutTip = "Cliquez ici pour plus d'informations sur le script.";
	text.connected = "connecté(e)";
	text.shareInventory = "Insère l'inventaire de la pièce dans la zone de texte active, de la forme&nbsp;:</p><p><strong>Couloir central :</strong> <i>Combinaison</i>, <i>Couteau</i>, <i>Médikit</i>, <i>Extincteur</i></p><p><strong>Partage aussi sur Astropad si celui-ci est installé.</strong></p>"
	
	text.lastVersionInstalled = "Dernière version de CTRL+W installée (%s) :";
	text.autoUpdateOk = 'Très bien, merci !';
	
	text.loads = "charges";
	text.empty = "vide";
	text.mageBook = "apprentron";
	text.camera = "caméra";
	text.drone = "drone";
	text.plants = "plantes";
	text.diseased = "malade";
	text.thirsty = "soif";
	text.dry = "desséché";
	text.nothingToReport = "RAS";

	text.HEROES_SHORTDESC = [
		"Commandant suprême du Daedalus.",
		"Scientifique millénaire.",
		"Grand architecte du Daedalus.",
		"Psychologue Digitale aux atouts certains.",
		"Humoriste pilote de chasse à ses heures.",
		"Exploratrice de l'extrême.",
		"Officier principal des Communications du Daedalus.",
		"Chef de la sécurité du Daedalus.",
		"Biologiste de renommée internationale, pionnière dans l'étude du Mush.",
		"Cuisinier le plus dangereux de la galaxie.",
		"Chercheur frugivore flexible.",
		"Dernier espoir de l'Humanité.",
		"Génie de la physique quantique félinophile.",
		"Armateur philantrophobe.",
		"Investigatrice déchue de premier plan.",
		"Technophile motorisé."
	];
	Main.k.langpack.fr = text;
	/********* /FRENCH ************/



	/********* ENGLISH ************/
	var text = {};
	text.menuPlay = "Play";
	text.menuAccount = "My account";
	text.menuRanking = "Ranking";
	text.menuForum = "Forum";
	text.menuHelp = "Help";
	text.menuVending = "Vending Machine";
	text.menuXP = "Experience";
	text.menuMyFile = "My File";
	text.menuMySettings = "My settings";
	text.menuNews = "News";
	text.menuHelpMush = "Mush help";
	text.menuPatchlog = "Patchlog";
	text.menuTutoChar = "Tuto %s";

	text.connected = "connected";
	text.lastVersionInstalled = "Last version of CTRL+W was installed (%s):";
	text.autoUpdateOk = 'Ok';

	text.menuForumDiscussion = "Discussion";
	text.menuForumDiscussionId = 104909;
	text.menuForumAdvice = "Advice";
	text.menuForumAdviceId = 112222;
	text.menuForumLounge = "Lounge";
	text.menuForumLoungeId = 112216;
	text.menuForumOfficers = "Officiers";
	text.menuForumOfficersId = 104918;


	// Tutorial topics' url
	text.tutorials = {};
	text.tutorials["mush"] = 32534875;
	text.tutorials["eleesha"] = 32790916; //unofficial
	text.tutorials["janice"] = 32488283; //neron admin, unofficial
	text.tutorials["chao"] = 32300186;
	text.tutorials["terrence"] = 32323021; //unofficial
	text.tutorials["paola"] = 32423154; //comms manager
	text.tutorials["raluca"] = 32609208;
	text.tutorials["roland"] = 32255633;
	text.tutorials["ian"] = 30242550; //gardening
	text.tutorials["frieda"] = 32621356;
	text.tutorials["finola"] = 20507704; //french tuto
	text.tutorials["jin su"] = 32270135;
	text.tutorials["gioele"] = 20629766; //french tuto
	text.tutorials["kuan ti"] = 32777661;
	text.tutorials["chun"] = 32587937; //unofficial
	text.tutorials["hua"] = 32641831; //unofficial
	text.tutorials["stephen"] = 19654941; //french tuto

	// Titles
	text.TITLES = {
		commander: ["Commander", "TODO"],
		comms: ["Comms Manager", "The Communications manager can start to contact others once contact with Sol is re-established."],
		admin: ["NERON Admin", "TODO"]
	};

	// Ctrl+W options'
	text.optionsWarning = "More options will be available later.";
	text.options = [
		"Use custom styling for messages (colored border and name + background image.",
		"Simplify custom styling (don't display background images).",
		"Display Mush logo (above tabs).",
		"Add line breaks between NERON projects, research projects and Pilgred."
	];
	
	//Astropad
	text.astroUpdated = 'Astropad synchronised.';
	
	// Misc text
	text.needPageReload = " Page reload needed.";
	text.about = "about";
	text.tools = "tools";
	text.titles = "titles";
	text.crew = "crew members";
	text.shelf = "shelf content";
	text.aboutTip = "Click here for more informations on Ctrl+W.";

	text.loads = "loads";
	text.empty = "empty";
	text.mageBook = "mage book";
	text.camera = "camera";
	text.plants = "plants";
	text.diseased = "diseased";
	text.thirsty = "thirsty";
	text.dry = "dry";
	text.nothingToReport = "nothing to report";

	text.HEROES_SHORTDESC = [
		"[TODO: JINSU]",
		"[TODO: FRIEDA]",
		"[TODO: KUANTI]",
		"A Digital Psychologist and one-woman enigma machine.",
		"Amateur comedian and elite fighter pilot. Born to destroy Hunters.",
		"An extreme explorer with an irrational fear of balloon animals.",
		"Chief Communications Officer and former political activist.",
		"[TODO: CHAO]",
		"[TODO: FINOLA]",
		"[TODO: STEPHEN]",
		"Flexible fructivorous researcher. Better living through botany!",
		"[TODO: CHUN]",
		"[TODO: RALUCA]",
		"[TODO: GIOELE]",
		"Deposed first-rate investigator on the run from the Federation.",
		"Disillusioned motorized technophile with an unhealthy drone fixation.",
	];

	Main.k.langpack.en = text;
	/********* /ENGLISH ************/



	/********* SPANISH ************/
	Main.k.langpack.es.menuPlay = "Jugar";
	Main.k.langpack.es.menuAccount = "Mi cuenta";
	Main.k.langpack.es.menuRanking = "Clasificación";
	Main.k.langpack.es.menuForum = "Foro";
	Main.k.langpack.es.menuHelp = "Ayuda";
	Main.k.langpack.es.menuCastings = "Reality Mush";
	Main.k.langpack.es.menuVending = "Distributeur";
	Main.k.langpack.es.menuXP = "Experiencia";
	Main.k.langpack.es.menuMyFile = "Mi ficha ";
	Main.k.langpack.es.menuMySettings = "Mis opciones";
	Main.k.langpack.es.menuNews = "Noticias ";
	Main.k.langpack.es.menuHelpMush = "Ayuda Mush";
	Main.k.langpack.es.menuPatchlog = "Patchlog";
	Main.k.langpack.es.menuTutoChar = "Tuto %s";
	Main.k.langpack.es.connected = "connecté(e)";
	/********* /SPANISH ************/
}
Main.k.setuptranslations();
/************************* /TRANSLATIONS **********************/


// Fix chrome
Main.k.ischrome = true;
Main.k.window = unsafeWindow;
var $ = unsafeWindow.jQuery;
var $hxClasses = unsafeWindow.$hxClasses;
var _tid = unsafeWindow._tid;
var ArrayEx = unsafeWindow.ArrayEx;
var ChatType = unsafeWindow.ChatType;
var Clients = unsafeWindow.Clients;
var CrossConsts = unsafeWindow.CrossConsts;
var haxe = unsafeWindow.haxe;
var HxOverrides = unsafeWindow.HxOverrides;
var JqEx = unsafeWindow.JqEx;
var js = unsafeWindow.js;
var Lambda = unsafeWindow.Lambda;
var prx = unsafeWindow.prx;
var Reflect = unsafeWindow.Reflect;
var Selection = unsafeWindow.Selection;
var Std = unsafeWindow.Std;
var StringBuf = unsafeWindow.StringBuf;
var StringTools = unsafeWindow.StringTools;
var Tag = unsafeWindow.Tag;
var Tools = unsafeWindow.Tools;
var Utils = unsafeWindow.Utils;
var Closet = unsafeWindow.Closet;
				
				

String.prototype.capitalize = function() {
	return this.replace(/(?:^|\s)\S/g, function(a) {
		return a.toUpperCase();
	});
};

Main.k.initLang = function() {
	// Language detection
	switch(Main.k.domain) {
		case "mush.twinoid.com":
			Main.k.lang = "en";
			break;
		case "mush.twinoid.es":
			Main.k.lang = "es";
			break;
		default:
			Main.k.lang = "fr";
	}

	// Default language pack = french (most translated)
	// Switch to english when fully translated
	Main.k.currentLangpack = Main.k.langpack.fr;

	// Use available translations instead of default one
	if (Main.k.lang != "fr" && typeof(Main.k.langpack[Main.k.lang]) != 'undefined') {
		for (a in Main.k.langpack[Main.k.lang]) {
			Main.k.currentLangpack[a] = Main.k.langpack[Main.k.lang][a];
		}
	}

	// Create smaller proxy
	Main.k.text = Main.k.currentLangpack;
}
Main.k.initData = function() {
	// Define if we are ingame
	Main.k.playing = Main.heroes.iterator().hasNext();

	Main.k.BMAXWIDTH = 1160;
	Main.k.HEROES =   ["jin_su", "frieda", "kuan_ti", "janice", "roland", "hua", "paola", "chao", "finola", "stephen", "ian", "chun", "raluca", "gioele", "eleesha", "terrence"];
	Main.k.COMMANDERS = ["jin_su", "chao", "gioele", "stephen", "frieda", "kuan_ti", "hua", "roland", "raluca", "finola", "paola", "terrence", "eleesha", "ian", "janice", "chun"];
	Main.k.COMMS = ["paola", "eleesha", "stephen", "janice", "roland", "hua", "jin_su", "kuan_ti", "gioele", "chun", "ian", "finola", "terrence", "frieda", "chao", "raluca"];
	Main.k.ADMINS =   ["janice", "terrence", "eleesha", "raluca", "finola", "frieda", "ian", "stephen", "paola", "jin_su", "hua", "kuan_ti", "gioele", "chun", "roland", "chao"];

	Main.k.cssToHeroes = [];
	Main.k.cssToHeroes["-1185px"] = "janice";
	Main.k.cssToHeroes["-1282px"] = "chao";
	Main.k.cssToHeroes["-1335px"] = "eleesha";
	Main.k.cssToHeroes["-1233px"] = "ian";
	Main.k.cssToHeroes["-1444px"] = "terrence";
	Main.k.cssToHeroes["-1554px"] = "hua";
	Main.k.cssToHeroes["-1499px"] = "jin_su";
	Main.k.cssToHeroes["-1604px"] = "jin_su";
	Main.k.cssToHeroes["-1391px"] = "raluca";
	Main.k.cssToHeroes["-1681px"] = "stephen";
	Main.k.cssToHeroes["-1728px"] = "paola";
	Main.k.cssToHeroes["-1056px"] = "roland";

	Main.k.compActiveMush = [];

	Main.k.compInactiveMush = [];
	Main.k.compInactiveMush["cold_blood"] = true;
	Main.k.compInactiveMush["wrestler"] = true;
	Main.k.compInactiveMush["sturdy"] = true;
	Main.k.compInactiveMush["opportunist"] = true;
	Main.k.compInactiveMush["optimistic"] = true;
	Main.k.compInactiveMush["mycologist"] = true;
	Main.k.compInactiveMush["panic"] = true;
	Main.k.compInactiveMush["caffeinomaniac"] = true;
	Main.k.compInactiveMush["frugivore"] = true;

	Main.k.researchGlory = [];
	Main.k.researchGlory["drug_dispenser"] = 0;//
	Main.k.researchGlory["healing_ointmant"] = 0;//
	Main.k.researchGlory["natamy_gun"] = 0;//
	Main.k.researchGlory["ncc_lens"] = 0;//
	Main.k.researchGlory["spore_extractor"] = 0;//
	Main.k.researchGlory["steroids"] = 0;//
	Main.k.researchGlory["tesla_sup2x"] = 0;//
	Main.k.researchGlory["antispore_gaz"] = 3;//
	Main.k.researchGlory["constipaspore_serum"] = 3;//
	Main.k.researchGlory["fungus_scrambler"] = 3;//
	Main.k.researchGlory["infinite_water"] = 3;//
	Main.k.researchGlory["mushicide_soap"] = 3;
	Main.k.researchGlory["mushophage_bacteria"] = 3;//
	Main.k.researchGlory["myco_alarm"] = 3;//
	Main.k.researchGlory["mycoscan"] = 3;//
	Main.k.researchGlory["patuline_scrambler"] = 3;//
	Main.k.researchGlory["pheromodem"] = 3;//
	Main.k.researchGlory["mush_breeding_system"] = 6;//
	Main.k.researchGlory["mush_breeds"] = 6;//
	Main.k.researchGlory["myco_dialect"] = 6;//
	Main.k.researchGlory["mush_predator"] = 6;//
	Main.k.researchGlory["anti_mush_serum"] = 16;//
}
Main.k.displayMainMenu = function() {
	Main.k.css.customMenu();

	// Fix position
	var fix = $("ul.mtabs").length > 0 ? 70 : 20;
	$("#maincontainer, .boxcontainer").css("margin", fix + "px auto 0");

	Main.k.ownHero = ($(".who").length > 0 ) ? $(".who").html().toLowerCase().trim() : false;
	Main.k.silver = true; //TODO
	Main.k.fds = ($("a.butmini[href='/fds']").length > 0);
	var menu = $("<ul>").addClass("kmenu").insertBefore("#maincontainer, .boxcontainer");
	var play = $("<li class='kmenuel active first'><a href='"+Main.k.mushurl+"/chooseHero'>"+Main.k.text.menuPlay+"</a></li>").appendTo(menu);
	var account = $("<li class='kmenuel'><a href='"+Main.k.mushurl+"/me'>"+Main.k.text.menuAccount+"</a></li>").appendTo(menu);
	if(typeof(Main.k.langpack[Main.k.lang]['menuCastings']) != 'undefined'){
		var casting = $("<li class='kmenuel'><a href='"+Main.k.mushurl+"/group/list'>"+Main.k.text.menuCastings+"</a></li>").appendTo(menu);
	}
	var rankings = $("<li class='kmenuel'><a href='"+Main.k.mushurl+"/ranking'>"+Main.k.text.menuRanking+"</a></li>").appendTo(menu);
	var forum = $("<li class='kmenuel'><a href='"+Main.k.mushurl+"/tid/forum'>"+Main.k.text.menuForum+"</a></li>").appendTo(menu);
	var help = $("<li class='kmenuel last'><a href='"+Main.k.mushurl+"/help'>"+Main.k.text.menuHelp+"</a></li>").appendTo(menu);

	var play_ss = $("<ul>").appendTo(play);
	$("<a class='kssmenuel' href='"+Main.k.mushurl+"/vending'><li><img src='/img/icons/skills/rebel.png' />"+Main.k.text.menuVending+"</li></a>")
	.css("display", "none").attr("id", "vendingmenu").appendTo(play_ss);
    
	if(casting != null){
	    var casting_ss = $("<ul>").appendTo(casting);
		$("<a class='kssmenuel' target='_self' href='http://mush.vg/g/armada-mush-s-rooms'><li>Mush's Rooms</li></a>").appendTo(casting_ss);
	    $("<a class='kssmenuel' target='_self' href='http://mush.vg/g/armada-mush-s-rooms/forum/#!view/97599'><li style='font-size:13px'>Mush's Rooms - Forum</li></a>").appendTo(casting_ss);
	}

	var account_ss = $("<ul>").attr("id", "accountmenu").appendTo(account);
	$("<a class='kssmenuel' href='"+Main.k.mushurl+"/me'><li><img src='/img/icons/skills/persistent.png' />"+Main.k.text.menuXP+"</li></a>").appendTo(account_ss);
	$("<a class='kssmenuel' href='"+Main.k.mushurl+"/me?profile'><li><img src='/img/icons/skills/opportunist.png' />"+Main.k.text.menuMyFile+"</li></a>").appendTo(account_ss);
	$("<a class='kssmenuel' href='"+Main.k.mushurl+"/me?config'><li><img src='/img/icons/skills/engineer.png' />"+Main.k.text.menuMySettings+"</li></a>").appendTo(account_ss);
	$("<a class='kssmenuel' href='"+Main.k.mushurl+"/me?news'><li><img src='/img/icons/skills/radio_expert.png' />"+Main.k.text.menuNews+"</li></a>").appendTo(account_ss);

	var rankings_ss = $("<ul>").appendTo(rankings);
	$("<a class='kssmenuel' href='"+Main.k.mushurl+"/ranking'><li><img src='/img/icons/skills/persistent.png' />"+Main.k.text.menuRanking+"</li></a>").appendTo(rankings_ss);
	$("<a class='kssmenuel ext' href='http://twinorank.kubegb.fr/'><li><img src='/img/icons/skills/persistent.png' />Twin-O-Rank</li></a>").appendTo(rankings_ss);

	var forum_ss = $("<ul>").appendTo(forum);
	if(typeof(Main.k.langpack[Main.k.lang]['menuForumDiscussionId']) != 'undefined'){
		$("<a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.menuForumDiscussionId+"'><li><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.menuForumDiscussion+"</li></a>").appendTo(forum_ss);
	}
	if(typeof(Main.k.langpack[Main.k.lang]['menuForumAdviceId']) != 'undefined'){
		$("<a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.menuForumAdviceId+"'><li><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.menuForumAdvice+"</li></a>").appendTo(forum_ss);
	}
	if(typeof(Main.k.langpack[Main.k.lang]['menuForumLoungeId']) != 'undefined'){
		$("<a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.menuForumLoungeId+"'><li><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.menuForumLounge+"</li></a>").appendTo(forum_ss);
	}
	if(typeof(Main.k.langpack[Main.k.lang]['menuForumCastingsId']) != 'undefined'){
		$("<a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.menuForumCastingsId+"'><li><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.menuForumCastings+"</li></a>").appendTo(forum_ss);
	}
	if (Main.k.silver && typeof(Main.k.langpack[Main.k.lang]['menuForumOfficersId']) != 'undefined') {
		$("<a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.menuForumOfficersId+"'><li><img src='/img/icons/skills/rebel.png' />"+Main.k.text.menuForumOfficers+"</li></a>").appendTo(forum_ss);
	}

	var help_ss = $("<ul>").appendTo(help);
	$("<a class='kssmenuel' href='"+Main.k.mushurl+"/help'><li><img src='/img/icons/skills/genius.png' />"+Main.k.text.menuHelpMush+"</li></a>").appendTo(help_ss);
	$("<a class='kssmenuel' href='"+Main.k.mushurl+"/patchlog'><li><img src='/img/icons/skills/persistent.png' />"+Main.k.text.menuPatchlog+"</li></a>").appendTo(help_ss);

	if (Main.k.ownHero && Main.k.text.tutorials[Main.k.ownHero]) {
		var charname = Main.k.ownHero.replace("_", "");
		$("<a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/67561|thread/" + Main.k.text.tutorials[Main.k.ownHero] + "'><li><img src='/img/icons/ui/" + charname + ".png' />" + sprintf(Main.k.text.menuTutoChar, Main.k.ownHero.capitalize()) + "</li></a>").appendTo(help_ss);
	}
	$("<a class='kssmenuel ext' href='http://www.twinpedia.com/mush'><li><img src='http://www.twinpedia.com/_media//favicon.ico' />Twinpedia</li></a>").appendTo(help_ss);
	$("<a class='kssmenuel ext' href='http://apps-scipion.com/pictoid/mush'><li><img src='/img/icons/ui/win_triumph.png' />Pictoid</li></a>").appendTo(help_ss);

	if (Main.k.fds) {
		$("<a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/77714'><li><img src='/img/icons/skills/cold_blood.png' />Magistrature</li></a>").appendTo(forum_ss);

		$("<a class='kssmenuel' href='"+Main.k.mushurl+"/fds'><li><img src='/img/icons/skills/cold_blood.png' />FDS</li></a>").appendTo(play_ss);
	}
}

Main.k.ArrayContains = function(arr, o) {
	for (a in arr) {
		if (a == o) return true;
	}
	for (var i=0; i<arr.length; i++) {
		if (arr[i] == o) return true;
	}
	return false;
}
Main.k.EliminateDuplicates = function(arr) {
	var i, len=arr.length, out=[], obj={};
	for (i=0;i<len;i++) obj[arr[i]]=0;
	for (i in obj) out.push(i);
	return out;
}
Main.k.CreatePopup = function() {
	var popup = {};

	popup.dom = $("<td>").attr("id", "usPopup").addClass("usPopup chat_box");
	popup.mask = $("<div>").addClass("usPopupMask").on("click", Main.k.ClosePopup).appendTo(popup.dom);
	popup.content = $("<div>").addClass("usPopupContent chattext").css({
		"width": (Main.k.window.innerWidth - 300) + "px",
		"height": (Main.k.window.innerHeight - 100) + "px"
	}).appendTo(popup.dom);

	return popup;
}
Main.k.OpenPopup = function(popup) { $("body").append(popup); }
Main.k.ClosePopup = function() {
	var popup = $("#usPopup");
	if (!popup.get()) return;

	popup.remove();
	var tgt = $("#formattingpopuptgt");
	if (tgt.get()) {
		tgt.focus();
		tgt.attr("id", "");
	}
}
Main.k.CustomTip = function(e) {
	var tgt = (e || event).target;
	var title = tgt.getAttribute("_title");
	var desc = tgt.getAttribute("_desc");
	if (desc) desc = desc.replace(/(\\r|\\n)/g, "");
	var max = 3, current = 0, t = tgt;
	while (!title && !desc && current<max) {
		t = t.parentNode;
		title = t.getAttribute("_title");
		desc = t.getAttribute("_desc");
		if (desc) desc = desc.replace(/(\\r|\\n)/g, "");
		current++;
	}

	Main.showTip(tgt,
		"<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'>" +
		(title ? "<h1>" + title + "</h1>" : "") +
		(desc ? "<p>" + desc.replace("\r\n", "") + "</p>" : "") +
		"</div></div></div></div>"
	);
}
Main.k.MakeButton = function(content, href, onclick, tiptitle, tipdesc) {
	var but = $("<div>").addClass("action but");
	var butbr = $("<div>").addClass("butright").appendTo(but);
	var butbg = $("<div>").addClass("butbg").appendTo(butbr);

	var buta = $("<a>").attr("href", href ? href : "#").html(content).appendTo(butbg)
	.on("click", onclick ? onclick : href ? null : function() { return false; });

	if (tiptitle || tipdesc) {
		if (tiptitle) buta.attr("_title", tiptitle);
		if (tipdesc) buta.attr("_desc", tipdesc);
		buta.on("mouseover", Main.k.CustomTip);
		buta.on("mouseout", Main.hideTip);
	}

	return but;
}
Main.k.GetHeroNameFromTopic = function(topic) {
	var hero = '';
	var div = null;

	// First tries to get the character-specific css class name
	if (topic.find(".char,.tid_char").length >0) {
		div = topic.find(".char,.tid_char");
		hero = div.attr('class').replace("char ", "").replace("tid_char tid_", "");
	}

	// If it failed, compare the image position with custom outfits
	if (div != null && hero == '') {
		var sp = div.css('backgroundPosition').split(" ");
		var pos_y = sp[1];

		// Don't need to check if undefined thanks to the shield in the return
		hero = Main.k.cssToHeroes[pos_y];
	}

	// If no hero found (hero = "" or hero = undefined), use jin su
	return hero ? hero : "jin_su";
}
Main.k.getShortDesc = function(hero) {
	for (var i=0; i<Main.k.HEROES.length; i++) {
		if (Main.k.HEROES[i] == hero) return Main.k.text.HEROES_SHORTDESC[i];
	}
}
Main.k.SyncAstropad = function(tgt){
	if($('#astro_maj_inventaire').length > 0){
		$('#astro_maj_inventaire').trigger('click');
		Main.showTip(tgt,
			"<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'>" +
			Main.k.text.astroUpdated + 
			"</div></div></div></div>"
		);
	}
}

// == Options Manager  ========================================
Main.k.Options = {};
Main.k.Options.initialized = false;
Main.k.Options.cbubbles = false;
Main.k.Options.cbubblesNB = false;
Main.k.Options.dlogo = false;
Main.k.Options.splitpjt = true;
Main.k.Options.altpa = false;
Main.k.Options.mushNoConf = false;
Main.k.Options.options = [];

Main.k.Options.open = function() {
	if (Main.k.folding.displayed == "options") {
		Main.k.folding.displayGame();
		return;
	}

	if (!Main.k.Options.initialized) {
		Main.k.Options.initialized = true;

		var td = $("<td>").addClass("chat_box").css({
			"padding-right": "6px",
			"padding-top": "1px",
			transform: "scale(0,1)",
			color: "rgb(9,10,97)"
		}).attr("id", "options_col").appendTo($("table.inter tr").first());

		$("<p>").addClass("warning").html(Main.k.text.optionsWarning).appendTo(td);


		for (var i=0; i<Main.k.Options.options.length; i++) {
			var opt = Main.k.Options.options[i];
			var html = opt[4];
			if (opt[2]) html += Main.k.text.needPageReload;

			var p = $("<p>").css({
				color: "#EEE",
				padding: "5px",
				border: "1px dashed #EEE",
				background: "rgba(255,255,255,0.1)",
				margin: "10px 20px",
				clear: "both"
			})
			.html('<div style="margin-left: 30px;">' + html + '</div>')
			.appendTo(td);

			var chk = $("<input>").css({
				"float": "left",
				"margin-bottom": "40px",
				"margin-right": "5px"
			})
			.attr("type", "checkbox")
			.attr("optname", opt[0])
			.attr("opti", i)
			.on("change", Main.k.Options.update)
			.prependTo(p);
			if (opt[1]) chk.attr("checked", "checked");
		}
	}

	Main.k.folding.display([null,null, "#options_col"], "options");
}
Main.k.Options.update = function(e) {
	var tgt = $(e.target);
	var key = $(tgt).attr("optname");
	var val = $(tgt).attr("checked") ? "y" : "n";
	var i = $(tgt).attr("opti");

	Main.k.Options.updateOpt(key,val);
	Main.k.Options.updateCookie();
	if (Main.k.Options.options[i][3]) Main.k.Options.options[i][3]();
}
Main.k.Options.updateOpt = function(key, val) {
	switch(key) {
		case "custombubbles":
		case "cbubbles":
			Main.k.Options.cbubbles = (val == "y");
			Main.k.Options.options[0][1] = (val == "y");
			break;
		case "custombubbles_nobackground":
		case "cbubblesNB":
			Main.k.Options.cbubblesNB = (val == "y");
			Main.k.Options.options[1][1] = (val == "y");
			break;
		case "displaylogo":
		case "dlogo":
			Main.k.Options.dlogo = (val == "y");
			Main.k.Options.options[2][1] = (val == "y");
			break;
		case "splitpjt":
			Main.k.Options.splitpjt = (val == "y");
			Main.k.Options.options[3][1] = (val == "y");
			break;
		case "mushNoConf":
			Main.k.Options.mushNoConf = (val == "y");
			Main.k.Options.options[4][1] = (val == "y");
			break;
		//case "altpa":
		//	Main.k.Options.altpa = (val == "y");
		//	Main.k.Options.options[4][1] = (val == "y");
		//	break;
	}
}
Main.k.Options.updateCookie = function() {
	var cook = "";
	for (var i=0; i<Main.k.Options.options.length; i++) {
		if (i>0) cook += "|";
		cook += Main.k.Options.options[i][0] + ":";
		cook += Main.k.Options.options[i][1] ? "y" : "n";
	}

	js.Cookie.set("ctrlwoptions",cook,420000000);
}
Main.k.Options.init = function() {
	Main.k.Options.options = [
	//  Option Name,	Option Object,				Need refresh,	After(),				Desc
		["cbubbles",	Main.k.Options.cbubbles,	false,			Main.k.customBubbles,	Main.k.text.options[0]],
		["cbubblesNB",	Main.k.Options.cbubblesNB,	false,			Main.k.customBubbles,	Main.k.text.options[1]],
		["dlogo",		Main.k.Options.dlogo,		true,			null,					Main.k.text.options[2]],
		["splitpjt",	Main.k.Options.splitpjt,	false,			Main.k.updateBottom,	Main.k.text.options[3]],
		["mushNoConf",	Main.k.Options.mushNoConf,	false,			null,					Main.k.text.options[4]],
		//["altpa",		Main.k.Options.altpa,		true,			null,					"Utiliser des images alternatives pour les pa / pm."]
	];

	var cook = js.Cookie.get("ctrlwoptions");
	if (!cook) return;

	var parts = cook.split("|");
	for (var i=0; i<parts.length; i++) {
		var part = parts[i].split(":");
		var key = part[0];
		var val = part[1];

		Main.k.Options.updateOpt(key,val);
	}
}
// == /Options Manager  =======================================


Main.k.css = {};
Main.k.css.customMenu = function() {
	$("<style>").attr("type", "text/css").html("\
	body.gold #maincontainer{margin-top:543px !important;}\
	#menuBar { display: none; }\
	.mxhead a.logo, .mxhead a.logo3 { position: relative! important; display: block; }\
	.mxhead {padding:0}\
	.kmenu {\
		margin: 10px auto 20px;\
		text-align: center;\
	}\
	.bgmachine {\
		top: -200px;\
		left: 143px;\
		background: #111317;\
		border-radius: 8px;\
	}\
	.machine {\
		margin-top: 13px;\
	}\
	.butdistr2 {\
		text-align: center;\
		cursor: pointer;\
        height: 22px;\
	}\
	.kmenuel {\
		position: relative;\
		display: inline-block;\
		border: 1px solid rgba(19,32,85,0.8);\
		border-left: none;\
		background: #003baf;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px -15px 15px -10px rgba(0,0,0,0.5);\
		cursor: pointer;\
	}\
	.kmenuel a {\
		display: block;\
		width: 160px;\
		height: 24px;\
		padding: 4px 5px;\
		color: #DDD! important;\
		text-decoration: none! important;\
		text-shadow: 0 0 3px #000;\
	}\
	.kmenuel:hover a { color: #FFF! important; }\
	.kmenuel a:hover { color: rgb(255, 78, 100)! important; }\
	.kmenuel a:hover li {\
		color: #FFF! important;\
		text-shadow: 0 0 1px #000;\
	}\
	.kmenuel:hover {\
		border-color: rgb(19,32,85);\
		background: #0044bd;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px 5px 15px 0px rgba(0,0,0,0.4);\
	}\
	.kmenuel.first {\
		border-left: 1px solid rgba(19,32,85,0.8);\
		border-top-left-radius: 8px;\
		border-bottom-left-radius: 8px;\
	}\
	.kmenuel.last {\
		border-top-right-radius: 8px;\
		border-bottom-right-radius: 8px;\
	}\
	.kmenuel ul { display: none; }\
	.kmenuel ul a { display: inline; height: auto; width: auto; padding: 0; }\
	.kmenuel:hover ul {\
		display: block;\
		position: absolute;\
		width: 100%;\
		top: 33px;\
		left: 0;\
		text-align: center;\
		z-index: 50;\
		padding: 0;\
	}\
	.kmenuel ul li {\
		text-align: left;\
		margin: 0 auto;\
		display: block! important;\
		border: 1px solid rgb(2,16,66);\
		border-top: none! important;\
		width: 140px;\
		height: 22px;\
		padding: 0 15px 0 5px! important;\
		background: #0071e3;\
		color: #EEE;\
		text-shadow: 0 0 1px #000;\
		text-decoration: none! important;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px -8px 8px -5px rgba(0,0,0,0.3);\
	}\
	.kmenuel ul li:hover {\
		background: #0094ff;\
		text-shadow: 0 0 3px #000;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px 4px 8px 0px rgba(0,0,0,0.3);\
	}\
	.kmenuel ul li img {\
		margin-right : 5px;\
		position: relative;\
		top: 2px;\
		height: 16px;\
	}\
	").appendTo("head");
}
Main.k.css.ingame = function() {
	Main.k.css.bubbles();

	$("<style>").attr("type", "text/css").html("\
	.mxhead { height: 0; }\
	.cdReadMeHook { display: none! important; }\
	.tabon { background-image: url(" + Main.k.servurl + "/img/tabon.png)! important; }\
	.taboff { background-image: url(" + Main.k.servurl + "/img/taboff.png)! important; }\
	.taboff:hover { background-image: url(" + Main.k.servurl + "/img/tabon.png)! important; }\
	td.chat_box .right {\
		position: relative;\
		background: url(" + Main.k.servurl + "/img/chatbgtop.png) no-repeat scroll right top;\
	}\
	td.chat_box .right:before {\
		content: '';\
		display: block;\
		position: absolute;\
		top: 0; left: 0; right: 6px;\
		height: 5px;\
		background: rgb(194, 243, 252);\
	}\
	td.chat_box .chattext .bubble .talks .from { background-image: url(" + Main.k.servurl + "/img/chat_from_left.png)! important; }\
	.customtabs li { margin-right: 3px; margin-bottom: 0! important; }\
	html { overflow-x: auto; width: 100%; }\
	body { background-position: 50% -100px; overflow-x: hidden! important; min-width: " + Main.k.BMAXWIDTH + "px; width: 100%; }\
	ul.mtabs li { margin-right: 5px! important; }\
	.helpguide { display: none; }\
	#tid_bar_down { clear: both; }\
	#cdMainChat { position: relative; }\
	#cdTabsChat { margin: 0; top: -24px; }\
	#topinfo_bar { margin-top: 5px; }\
	#tooltip { z-index: 500! important; }\
	#floating_ui_start { position: absolute; top: 42px; left: 5px; z-index: 20; }\
	.mtabs a { color: #FFF! important; }\
	#char_col .sheetmain { position: relative; }\
	#char_col .statuses { margin: 0! important; top: 10px; left: 7px; }\
	#char_col .skills { margin: 0! important; top: 0px; left: 177px; }\
	span.highlight {\
		background: #FF6;\
		padding: 0 2px;\
		margin: 0 -2px;\
	}\
	.exploring {\
		top: -30px! important;\
		right: 15px! important;\
		width: 200px! important;\
		height: 24px! important;\
		z-index: 20;\
		overflow: hidden! important;\
	}\
	.exploring .exploring2 {\
		height: 22px! important;\
	}\
	.exploring:hover {\
		width: auto! important;\
		height: auto! important;\
	}\
	.exploring:hover .exploring2 {\
		height: auto! important;\
	}\
	a.butmini { \
		outline: none! important; \
		position: relative;\
	}\
	a.butmini:after { \
		display: block;\
		content: '';\
		position: absolute;\
		top: 0px; bottom: 0px; left: 0px; right: 0px;\
		border: 1px solid #1D2028;\
		z-index: 3;\
	}\
	.customreply { \
		right: -7px! important;\
		bottom: 2px! important;\
		text-align: right;\
	}\
	.customreply a { \
		opacity: 0.8;\
	}\
	.customreply a:hover { \
		opacity: 1;\
	}\
	.chatformatbtn { \
		float: right;\
		margin-right: 5px! important;\
		margin-top: 7px! important;\
		width: auto! important;\
	}\
	.chatformatbtn img { \
		vertical-align: middle! important;\
	}\
	.alertnbwrapper { \
		position: absolute;\
		top: 16px;\
		left: -3px;\
		height: 17px;\
		width: 22px;\
		text-align: center;\
		overflow: visible;\
		cursor: default;\
		z-index: 1;\
	}\
	.alertnbwrapper .alertnb { \
		position: relative;\
		display: inline-block;\
		background: url(/img/design/alarm_on_bg.gif) repeat-x bottom;\
		color: rgb(255, 78, 100);\
		padding: 0 0px;\
		font-size: 10px;\
		line-height: 16px;\
		height: 17px;\
		min-width: 10px;\
	}\
	.alertnbwrapper .alertnb:before { \
		content: '';\
		display: block;\
		position: absolute;\
		left: -4px;\
		top: 0px;\
		bottom: 0px;\
		width: 4px;\
		background: url(" + Main.k.servurl + "/img/alertleft.gif) bottom left;\
	}\
	.alertnbwrapper .alertnb:after { \
		content: '';\
		display: block;\
		position: absolute;\
		right: -4px;\
		top: 0px;\
		bottom: 0px;\
		width: 4px;\
		background: url(" + Main.k.servurl + "/img/alertright.gif) bottom right;\
	}\
	.usLeftbar { \
		position: relative;\
		float: left;\
		background-color: #17195B;\
		background: url('/img/design/bg_right.png') right repeat-y;\
		border-right: 1px solid rgba(0,0,0,0.1);\
		box-shadow: 1px 0 3px 1px rgba(0,0,0,0.2);\
		min-height: 725px;\
		margin-right: 15px;\
		padding: 8px 0;\
		width: 125px;\
	}\
	.usLeftbar:before { \
		display: block;\
		content: '';\
		position: absolute;\
		top: 0; bottom: 0; right: 113px;\
		width: 10000px;\
		background-color: #17195B;\
		z-index: -1;\
	}\
	.usLeftbar h3 { \
		clear: both;\
		position: relative;\
		margin: 20px 0 10px;\
		padding: 0 16px 2px 4px;\
		color: rgba(255,255,255,0.8);\
		font-variant: small-caps;\
		font-size: 15px;\
		border-bottom: 1px solid rgba(255,255,255,0.6);\
	}\
	.usLeftbar h3:before { \
		display: block;\
		content: '';\
		position: absolute;\
		bottom: -3px; left: 0; right: 0;\
		border-bottom: 1px solid rgba(255,255,255,0.6);\
	}\
	.usLeftbar h3.first { \
		margin: 0 0 10px 0! important;\
	}\
	.usLeftbar h3 span { \
		position: absolute;\
		width: 16px;\
		height: 16px;\
		top: 1px; right: 4px;\
		cursor: pointer;\
		opacity: 0.4;\
	}\
	.usLeftbar h3 span:hover { \
		opacity: 1;\
	}\
	.usLeftbar h3 .displaymore { \
		background: url(/img/icons/ui/more.png);\
	}\
	.usLeftbar h3 .displayless { \
		background: url(/img/icons/ui/less.png);\
	}\
	.usLeftbar .hero { \
		position: relative;\
		clear: both;\
		margin: 10px 0;\
		min-height: 45px;\
		background: rgba(255,255,255,0.08);\
		border-top: 1px solid rgba(255,255,255,0.1);\
		border-bottom: 1px solid rgba(255,255,255,0.1);\
	}\
	.usLeftbar .missingheroes { \
		position: relative;\
		clear: both;\
		margin: 10px 0;\
		padding: 1px 3px 3px;\
		line-height: 0px;\
		background: rgba(255,255,255,0.08);\
		border-top: 1px solid rgba(255,255,255,0.1);\
		border-bottom: 1px solid rgba(255,255,255,0.1);\
	}\
	.usLeftbar img { \
		opacity: 0.7;\
	}\
	.butbg img.alerted {\
	   vertical-align: -20%;\
	   margin-right: -10px;\
	}\
	.butbg img.alert {\
	   position: relative;\
	   left: 0px;\
	   top: 2px;\
	   transform: scale(1);\
	}\
	.usLeftbar .inventory { \
		padding-left: 4px;\
	}\
	.usLeftbar .item { \
		position: relative;\
		transform: scale(0.5);\
		-webkit-transform: scale(0.5);\
		margin: -14px;\
	}\
	.usLeftbar .item img.broken { \
		position: absolute;\
		right: 2px; top: 1px;\
		transform: scale(1.2);\
		-webkit-transform: scale(1.2);\
		opacity: 1! important;\
	}\
	.usLeftbar .item span.charges { \
		position: absolute;\
		padding: 0px 2px;\
		left: 2px; bottom: 1px;\
		background: rgba(0,0,0,0.7);\
		transform: scale(1.2);\
		-webkit-transform: scale(1.2);\
	}\
	.usLeftbar .item span.charges img { \
		width: 12px; height: 12px;\
	}\
	.usLeftbar .body { \
		float: left;\
		position: relative;\
		opacity: 1;\
		left: -5px;\
		width: 28px;\
		height: 44px;\
		background: url('/img/art/char.png') no-repeat;\
		z-index: 2;\
	}\
	.usLeftbar .missingheroes .body { \
		height: 24px;\
		opacity: 0.7;\
		position: static! important;\
		float: none! important;\
		margin: 0 -3px! important;\
	}\
	.usLeftbar .hero .icons { \
		white-space: nowrap;\
		position: relative;\
		left: -2px;\
	}\
	.usLeftbar img:hover { \
		opacity: 1! important;\
	}\
	.usLeftbar .but { \
		margin: 0 2px;\
	}\
	.usLeftbar .but img { \
		opacity: 1! important;\
	}\
	.usLeftbar .hero .skills { \
		top: 2px;\
	}\
	.usLeftbar .hero .skills span.skill { \
		position: relative;\
	}\
	.usLeftbar .hero .skills .hiddenSkills { \
        position: absolute;\
        height: 100%;\
        top: 2px;\
		z-index: 110;\
		width: 0px;\
		overflow: hidden;\
	}\
	.usLeftbar .hero .skills .hiddenSkillsDeploy { \
        float: right;\
		width: 17px;\
        height: 100%;\
		cursor: pointer;\
		background: url('/img/design/bg_right.png') right repeat-y;\
		z-index: 115;\
		border-radius: 0px 5px 5px 0px;\
	}\
	.usLeftbar .hero .skills .overSkills { \
        position: relative;\
        float: right;\
        left: 20px;\
        top: -25px;\
		height: 20px;\
		width: 17px;\
		z-index: 100;\
		background: #142B71;\
		border-top: 1px solid rgba(255,255,255,0.3);\
		border-bottom: 1px solid rgba(255,255,255,0.3);\
		border-right: 1px solid rgba(255,255,255,0.3);\
		border-radius: 0px 5px 5px 0px;\
	}\
	.usLeftbar .hero .statuses .hiddenStatuses { \
        position: absolute;\
        height: 100%;\
		z-index: 110;\
		width: 0px;\
		overflow: hidden;\
	}\
	.usLeftbar .hero .statuses .hiddenStatusesDeploy { \
        float: right;\
		width: 17px;\
        height: 100%;\
		cursor: pointer;\
		background: url('/img/design/bg_right.png') right repeat-y;\
		z-index: 115;\
		border-radius: 0px 5px 5px 0px;\
	}\
	.usLeftbar .hero .statuses .overStatuses { \
        position: relative;\
        float: right;\
        left: 20px;\
        top: -22px;\
		height: 20px;\
		width: 17px;\
		z-index: 100;\
		background: #142B71;\
		border-top: 1px solid rgba(255,255,255,0.3);\
		border-bottom: 1px solid rgba(255,255,255,0.3);\
		border-right: 1px solid rgba(255,255,255,0.3);\
		border-radius: 0px 5px 5px 0px;\
	}\
	.usLeftbar .hero .skills span.skill img.actmush { \
		position: absolute;\
		bottom: 1px;\
		right: 0px;\
		opacity: 1! important;\
	}\
	.usLeftbar .hero .statuses { \
		top: -2px;\
	}\
	.usLeftbar .hero .titles { \
		position: relative;\
		left: 25px;\
		bottom: 3px;\
		width: 16px;\
		line-height: 12px;\
		z-index: 2;\
	}\
	.usLeftbar .titles_list .icon { \
		margin: 0px 5px 3px 4px;\
		opacity: 1;\
	}\
	.usLeftbar .titles_list .body { \
		height: 24px;\
		opacity: 0.5;\
		position: static! important;\
		float: none! important;\
		margin: 0 -3px! important;\
	}\
	.usLeftbar .projectspreview { \
		text-align: center;\
	}\
	.usLeftbar .labpreview { \
		max-width: 120px;\
	}\
	.usLeftbar .projectpreview { \
		display: inline-block;\
		position: relative;\
		margin: 0 1px;\
		width: 34px;\
		height: 43px;\
		overflow: hidden;\
		border: 1px solid #458ddf;\
	}\
	.usLeftbar .projectpreview img.projectimg { \
		position: absolute;\
		top: -15px;\
		left: -7px;\
		z-index: 1;\
	}\
	.usLeftbar .projectpreview:hover img.projectimg { \
		opacity: 1;\
	}\
	.usLeftbar .projectpreview .projectpct { \
		position: absolute;\
		top: 6px;\
		left: 0px;\
		width: 34px;\
		text-align: center;\
		font-weight: bold;\
		font-size: 14px;\
		text-shadow: 0 0 6px black;\
		cursor: default;\
		z-index: 3;\
	}\
	.usLeftbar .projectpreview .projectbonus { \
		position: absolute;\
		bottom: 0px;\
		left: 0px;\
		width: 34px;\
		height: 16px;\
		text-align: center;\
		z-index: 3;\
	}\
	.usLeftbar .projectpreview .projectbonus img { \
		height: 16px;\
		opacity: 1;\
	}\
	td.chat_box .chattext .wall .mainmessage.neron_talks {\
		background-color : #74CBF3! important;\
		font-variant: small-caps;\
	}\
	#tabreply_content .loading { \
		text-align: center;\
		margin-top: 42px;\
	}\
	#tabreply_content .wall { \
		resize: none;\
	}\
	#tabreply_content .tid_buttons { \
		position: absolute;\
		bottom: 0px; left: 0; width: 100%;\
		text-align: center;\
	}\
	#tabreply_content .tid_button { \
		min-width: 0! important;\
		display: inline-block;\
		margin: 10px 4px;\
		padding: 3px 8px;\
	}\
	#tabreply_content textarea { \
		width: 95%;\
		height: 80px! important;\
		resize: none! important;\
		margin: 3px auto! important;\
		background-color: #fff;\
		box-shadow: inset 0 0 3px #aad4e5, 0px 1px 0px #fff;\
		border: 1px solid #aad4e5;\
		border-radius : 3px;\
		color: rgb(10,40,80);\
		padding: 3px 5px;\
		font-size: 10pt;\
		overflow: auto;\
		text-align: left;\
	}\
	#tabreply_content form { \
		height: 100%! important;\
	}\
	#tabreply_content .tid_wrapper { \
		height: 100%! important;\
		padding: 4px;\
	}\
	#tabreply_content .tid_smileyPanel { \
		margin: 2px auto;\
	}\
	#tabreply_content .tid_smileyPopUp .tid_wrapper { \
		max-height: 80px! important;\
	}\
	#tabreply_content .reply { \
		overflow-y: auto! important;\
		height: 80px! important;\
		width: 95%! important;\
		text-align: left;\
		margin: 5px auto;\
	}\
	.recap p { \
		border: 1px solid rgb(9,10,97);\
		background: rgba(255,255,255,0.3);\
		margin: 10px 20px;\
		padding: 2px;\
		text-align: center;\
	}\
	.recap .chars { \
		text-align: center;\
	}\
	.recap .chars .hero { \
		display: inline-block;\
		position: relative;\
		width: 26px;\
		height: 30px;\
	}\
	.recap .chars .hero img { \
		position: absolute;\
		top: 0; left: 4px;\
	}\
	.recap .chars .hero span { \
		position: absolute;\
		bottom: 0; left: 0;\
		width: 100%;\
		text-align: center;\
		font-size: 10px;\
	}\
	.recap .chars .highlight { \
		width: 105px;\
		height: 16px;\
		margin-bottom: 6px;\
	}\
	.recap .chars .highlight span { \
		top: 0px; left: 24px;\
		width: auto;\
		line-height: 16px;\
		text-align: left;\
		font-size: 12px;\
	}\
	.recap textarea { \
		display: block;\
		height: 40px;\
		width: 90%;\
		border: 1px solid rgb(10,40,80);\
		padding: 2px;\
		margin: 5px auto;\
		font-size: 10px;\
		color: rgb(10,40,80);\
		opacity: 0.4;\
		resize: none;\
	}\
	.recap textarea:active { \
		opacity: 1;\
	}\
	.recap textarea:focus { \
		opacity: 1;\
	}\
	#tabtopic_content .mainmessage { \
		margin: 3px 5px;\
	}\
	#tabtopic_content table.treereply { \
		width: 92%;\
	}\
	#tabtopic_content td.tree { \
		width: 15px;\
	}\
	#tabfav_content .reply, #tabsearch_content .reply, #tabnew_content .reply, #tabwall_content .reply { \
		max-height: 65px;\
		overflow-y: hidden! important;\
		width: 92%;\
		margin: 5px 5px 0! important;\
	}\
	#tabfav_content .topicact, #tabsearch_content .topicact, #tabnew_content .topicact, #tabwall_content .topicact { \
		display: block;\
		text-align: center;\
		color: rgb(150,22,12)! important;\
		margin: 0 20px 8px;\
	}\
	#tabsearch_content { \
		padding-top: 30px;\
		position: relative;\
	}\
	#tabsearch_content .bar { \
		position: absolute;\
		top: 0px;\
		left: 0px;\
		right: 0px;\
		text-align: center;\
		padding: 4px 0;\
		border-bottom: 1px solid #555;\
	}\
	#tabsearch_content .bar input[type=text] { \
		color: black;\
		padding: 1px 3px;\
		border: 1px solid #555;\
	}\
	#tabsearch_content .bar .butmini { \
		margin: 0px 2px -6px;\
		padding: 3px 4px;\
	}\
	#searchresults h4 { \
		margin: 4px 8px; \
		font-size: 14px; \
	}\
	#searchresults p.help { \
		margin: 4px 8px; \
	}\
	#searchresults p.help i { \
		color: rgb(80,10,10); \
	}\
	.usPopup { \
		display: block! important;\
		position: fixed;\
		top: 23px;\
		bottom: 0px;\
		left: 0px;\
		right: 0px;\
		z-index: 98;\
	}\
	.usPopup .usPopupMask { \
		position: absolute;\
		top: 0; bottom: 0; right: 0; left: 0;\
		background: rgba(0,0,0,0.8);\
		z-index: -1;\
	}\
	.usPopup .usPopupContent { \
		position: relative;\
		margin: 30px auto;\
		background: rgba(28, 56, 126, 0.976);\
		box-shadow: 0px 0px 3px 3px rgba(57, 101, 251, 0.5), 0px 0px 3px 3px rgba(57, 101, 251, 0.5) inset;\
		resize: none! important;\
	}\
	.updatescontent { \
		margin: 30px;\
	}\
	.updatescontent ul.updateslist { \
		font-size: 12px;\
		margin: 10px;\
	}\
	.updatescontent ul.updateslist li { \
		margin-left: 20px;\
		list-style-type: square;\
	}\
	.updatesactions { \
		text-align: center;\
		margin-bottom: 10px;\
	}\
	.updatesbtn { \
		display: inline-block;\
		margin: 0 3px;\
	}\
	#char_col, #room_col, #chat_col, #topics_col, #topic_col, #reply_col, #options_col, #about_col, #profile_col {\
		transition: all 200ms;\
		-webkit-transition: all 200ms;\
		-o-transition: all 200ms;\
	}\
	/** pour régler les probleme du au scale css3 sur firefox**/\
	#char_col .sheetbgcontent table td.two .extrapa{\
		position:relative;\
	}\
	#cdMainContent{\
		position:relative;\
	}\
	").appendTo("head");
	if (navigator.userAgent.indexOf("Firefox")==-1) $(".usLeftbar .hero .icons").css("padding-right", "30px");
}
Main.k.css.bubbles = function() {
	var d = "3px";
	var custombubbles_glow = "text-shadow: 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF;";

	$("<style>").attr("type", "text/css").html("\
	.bubble_stephen {\
		background: url(" + Main.k.servurl + "/img/tile_stephen.png) center repeat #FFF! important;\
		border: 1px solid #b48d75;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_hua {\
		background: url(" + Main.k.servurl + "/img/tile_hua.png) center repeat #FFF! important;\
		border: 1px solid #6c543e;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_frieda {\
		background: url(" + Main.k.servurl + "/img/tile_frieda.png) center repeat #FFF! important;\
		border: 1px solid #204563;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_roland {\
		background: url(" + Main.k.servurl + "/img/tile_roland.png) center repeat #FFF! important;\
		border: 1px solid #dc3d8d;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_paola {\
		background: url(" + Main.k.servurl + "/img/tile_paola.png) center repeat #FFF! important;\
		border: 1px solid #792b70;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_jin_su {\
		background: url(" + Main.k.servurl + "/img/tile_jin_su.png) center repeat #FFF! important;\
		border: 1px solid #a41834;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_chao {\
		background: url(" + Main.k.servurl + "/img/tile_chao.png) center repeat #FFF! important;\
		border: 1px solid #5457b0;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_finola {\
		background: url(" + Main.k.servurl + "/img/tile_finola.png) center repeat #FFF! important;\
		border: 1px solid #35adbc;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_kuan_ti {\
		background: url(" + Main.k.servurl + "/img/tile_kuan_ti.png) center repeat #FFF! important;\
		border: 1px solid #e89413;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_ian {\
		background: url(" + Main.k.servurl + "/img/tile_ian.png) center repeat #FFF! important;\
		border: 1px solid #647c27;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_eleesha {\
		background: url(" + Main.k.servurl + "/img/tile_eleesha.png) center repeat #FFF! important;\
		border: 1px solid #dca312;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_terrence {\
		background: url(" + Main.k.servurl + "/img/tile_terrence.png) center repeat #FFF! important;\
		border: 1px solid #55141c;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_janice {\
		background: url(" + Main.k.servurl + "/img/tile_janice.png) center repeat #FFF! important;\
		border: 1px solid #df2b4e;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_raluca {\
		background: url(" + Main.k.servurl + "/img/tile_raluca.png) center repeat #FFF! important;\
		border: 1px solid #4c4e4c;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_chun {\
		background: url(" + Main.k.servurl + "/img/tile_chun.png) center repeat #FFF! important;\
		border: 1px solid #3aa669;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_gioele {\
		background: url(" + Main.k.servurl + "/img/tile_gioele.png) center repeat #FFF! important;\
		border: 1px solid #cb5b29;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.custombubbles_nobackground {\
		background: #FFF! important;\
	}\
	.bubble_stephen span.buddy, .colored_stephen { color: #b48d75! important; }\
	.bubble_hua span.buddy, .colored_hua { color: #6c543e! important; }\
	.bubble_frieda span.buddy, .colored_frieda { color: #204563! important; }\
	.bubble_roland span.buddy, .colored_roland { color: #dc3d8d! important; }\
	.bubble_paola span.buddy, .colored_paola { color: #792b70! important; }\
	.bubble_jin_su span.buddy, .colored_jin_su { color: #a41834! important; }\
	.bubble_chao span.buddy, .colored_chao { color: #5457b0! important; }\
	.bubble_finola span.buddy, .colored_finola { color: #35adbc! important; }\
	.bubble_kuan_ti span.buddy, .colored_kuan_ti { color: #e89413! important; }\
	.bubble_ian span.buddy, .colored_ian { color: #647c27! important; }\
	.bubble_eleesha span.buddy, .colored_eleesha { color: #dca312! important; }\
	.bubble_terrence span.buddy, .colored_terrence { color: #55141c! important; }\
	.bubble_janice span.buddy, .colored_janice { color: #df2b4e! important; }\
	.bubble_raluca span.buddy, .colored_raluca { color: #4c4e4c! important; }\
	.bubble_chun span.buddy, .colored_chun { color: #3aa669! important; }\
	.bubble_gioele span.buddy, .colored_gioele { color: #cb5b29! important; }\
	.bubble .replybuttons { text-shadow: none! important; }\
	.bubble ::-moz-selection {\
		text-shadow: none! important;\
		background: #38F;\
		color: #fff;\
	}\
	.bubble ::-webkit-selection {\
		text-shadow: none! important;\
		background: #38F;\
		color: #fff;\
	}\
	.bubble ::selection {\
		text-shadow: none! important;\
		background: #38F;\
		color: #fff;\
	}\
	").appendTo("head");
}




Main.k.tabs = {};
Main.k.tabs.playing = function() {
	Main.k.css.ingame();

	// Open links in a new tab
	$("ul.kmenu a.ext").on("click", function() { Main.k.window.open(this.href); return false; });
	Main.k.hasTalkie = $("#walltab").length > 0;

	$('#swf_ISO_MODULE').click(function(){
		if($('.fakeitem.on').length == 1){
			Main.k.fakeSelectItem($('.fakeitem.on'));
		}
	});

	// == Extend Prototype  =======================================
	/*Selection.prototype.cancelSelection = function(node) {
		var doHeroInv = node != null?node.parents("#myInventory").length > 0:true;
		var doRoomInv = node != null?node.parents(".inventory").length > 0:true;
		if(doHeroInv) {
			js.Cookie.set(CrossConsts.COOK_SEL,null,3600);
			var allItems = Selection.j("#myInventory .item").not(".cdEmptySlot");
			Selection.j(".cdCharColSel").remove();
			Selection.j("#myInventory .selected").parent().removeClass("on");
			Selection.j("#myInventory .selected").remove();
			Lambda.iter(allItems.toArray(),function(h) {
				h.onclick = function(e) {
					Main.selectItem(h);
				};
			});
			this.currentInvSelection = null;
			Main.acListMaintainer.refreshHeroInv();
			null;
		}
		if(doRoomInv) {
			js.Cookie.set(CrossConsts.COOK_SEL,null,3600);
			var allItems = Selection.j(".inventory .item").not(".cdEmptySlot");
			Selection.j(".inventory .selected").parent().removeClass("on");
			Selection.j(".inventory .selected").remove();
			Selection.j("#tt_itemname").text("");
			Lambda.iter(allItems.toArray(),function(h1) {
				h1.onclick = function(e) {
					Main.selectItem(h1);
				};
			});
			this.currentRoomSelection = null;
			Main.acListMaintainer.refreshRoomInv();
			null;
		}
		if(!Main.closet.visible) {
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(439);
			Selection.j(".inv").css("visibility","hidden");
		}
	}
	Closet.prototype.show = function(forced,immediate) {
		var _g = this;
		var doIt = function() {
			$(".invcolorbg").show();
			$(".inv#cdInventory").addClass("placard_on");
			_g.visible = true;
			if(!forced) Main.cancelSelection();
			$(".inv").css("visibility","visible");
			$(".inv").css("display", "block");
			$(".inv").css("margin-top", "-194px");
			var invbloc = $("#cdInventory .invcolorbg");
			invbloc.css("display", "block");
			invbloc.find(".exceed").css("display", "block");
			invbloc.find(".arrowleft").css("display", "block");
			invbloc.find(".arrowright").css("display", "block");
			$("#cdItemActions").removeClass("selectplayer");
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(CrossConsts.BASELINE_CLOSET);
		};
		if(Main.isTuto() && !forced && (Main.uiFlags().rep & 1 << UI_FLAGS.UF_EXPECT_CLOSET_OPENED[1]) != 0) Tools.updateContent("/co",Main.selUpdtArr,null,function() {
			Main.resetJs();
			doIt();
		}); else doIt();
	}*/
	$.fn.insertAtCaret = function(text) {
		return this.each(function() {
			if (this.selectionStart || this.selectionStart == '0') {
				startPos = this.selectionStart;
				endPos = this.selectionEnd;
				scrollTop = this.scrollTop;
				this.value = this.value.substring(0, startPos) + text + this.value.substring(endPos, this.value.length);
				this.focus();
				this.selectionStart = startPos + text.length;
				this.selectionEnd = startPos + text.length;
				this.scrollTop = scrollTop;
			} else {
				this.value += text;
				this.focus();
				this.value = this.value;
			}
		});
	}
	$.fn.insertAroundCaret = function(b, a) {
		return this.each(function() {
			if (this.selectionStart || this.selectionStart == '0') {
				startPos = this.selectionStart;
				endPos = this.selectionEnd;
				scrollTop = this.scrollTop;
				this.value = this.value.substring(0, startPos) + b + this.value.substring(startPos, endPos) + a + this.value.substring(endPos, this.value.length);
				this.focus();
				this.selectionStart = startPos + b.length;
				this.selectionEnd = endPos + a.length;
				this.scrollTop = scrollTop;
			} else {
				this.value += b + a; // TODO: move caret?
				this.focus();
				this.value = this.value;
			}
		});
	}
	/*haxe.remoting.ExternalConnection.prototype.call = function(params) {
		var s = new haxe.Serializer();
		s.serialize(params);
		var params1 = s.toString();
		var data = null;
		var fobj = Main.k.window.document[this.__data.flash];
		if(fobj == null) {
			fobj = Main.k.window.document.getElementById(this.__data.flash);
		}
		if(fobj == null) {
			throw "Could not find flash object '" + this.__data.flash + "'";
		}
		try {
			if (fobj.externalRemotingCall) {
				data = fobj.externalRemotingCall(this.__data.name,this.__path.join("."),params1);
			}
		} catch( e ) {
		}
		if(data == null) {
			var domain, pageDomain;
			try {
				domain = fobj.src.split("/")[2];
				pageDomain = js.Lib.window.location.host;
			} catch( e ) {
				domain = null;
				pageDomain = null;
			}
			if(domain != pageDomain) throw "ExternalConnection call failure : SWF need allowDomain('" + pageDomain + "')";
			throw "Call failure : ExternalConnection is not initialized in Flash";
		}
		return new haxe.Unserializer(data).unserialize();
	}*/
	// == /Extend Prototype =======================================


	// == Extend Reflect  =========================================
	/*var Reflect = function() {};
	$hxClasses["Reflect"] = Reflect;
	Reflect.__name__ = ["Reflect"];
	Reflect.field = function(o,field) {
		var v = null;
		try {
			v = o[field];
		} catch( e ) {
		}
		return v;
	}
	Reflect.fields = function(o) {
		var a = [];
		if(o != null) {
			var hasOwnProperty = Object.prototype.hasOwnProperty;
			for( var f in o ) {
			if(hasOwnProperty.call(o,f)) a.push(f);
			}
		}
		return a;
	}
	Reflect.copy = function(o) {
		var o2 = { };
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
		return o2;
	}
	Reflect.compare = function(a,b) { return a == b?0:a > b?1:-1; }*/
	// == /Extend Reflect =========================================


	// == Extend Main  ============================================
	Main.onChatInput = function(event,jq) {
		var tgt = new js.JQuery(event.target);
		tgt.siblings("input").show();
		if(event.keyCode == 13) {
			if(!event.ctrlKey) {
				event.preventDefault();
				var pr = tgt.parent();
				pr.submit();
				Tools.send2Store("mush_chatContent_" + jq.attr("id"),"");
				jq.data("default",true);
			} else {
				// Insert line break at caret, not at the end...
				tgt.insertAtCaret("\n");
				Tools.send2Store("mush_chatContent_" + jq.attr("id"),tgt.val());
			}
		} else Tools.send2Store("mush_chatContent_" + jq.attr("id"),tgt.val());
	}
	Main.onWallFocus = function(jq) {//TODO: MULTILANG
		if(jq.data("default")) {
			jq.val(Main.getText("edit_me"));
			jq.data("default",false);
		}
		if (!jq.parent().find(".formatbtn").get(0)) {
			jq.attr("onblur", "");

			td = jq.parent().parent().siblings("td").first();
			var sharediv = $("<div>").css({
				"margin-top": "20px",
				"margin-left": "5px"
			}).appendTo(td);

			// Life
			$("<a>").addClass("butmini formatbtn").html("<img src='" + Main.k.servurl + "/img/viemoral.png' />").attr("href", "#").appendTo(sharediv)
			.on("click", function() {
				var txt = Main.k.FormatLife();
				$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
				return false;
			})
			.attr("_title", "Partager son état de santé")
			.attr("_desc", "Insère votre nombre de points de vie et de moral dans la zone de texte active, de la forme&nbsp;:</p><p>TODO: example")
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.hideTip);

			// Inventory
			$("<a>").addClass("butmini formatbtn").html("<img src='http://data.hordes.fr/gfx/icons/item_bag.gif' />").attr("href", "#").appendTo(sharediv)
			.on("click", function(e) {
				var txt = Main.k.FormatInventory();
				$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
				Main.k.SyncAstropad(e);
				return false;
			})
			.attr("_title", "Partager l'inventaire")
			.attr("_desc", Main.k.text.shareInventory)
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.hideTip);

			// Conso
			if ($("#pharmashare").css("display") != "none") {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/sat.png' />").attr("href", "#").appendTo(sharediv)
				.on("click", function() {
					var txt = Main.k.FormatPharma();
					$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
					return false;
				});
			}

			// Plants
			if ($("#plantmanager").length > 0) {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/plant_youngling.png' />").attr("href", "#").appendTo(sharediv)
				.on("click", function() {
					var txt = Main.k.FormatPlants();
					$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
					return false;
				})
				.attr("_title", "Partager l'état des plantes")
				.attr("_desc", "TODO: Texte")
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);
			}

			// Projects
			if ($(".shareprojectbtn").length > 0) {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/conceptor.png' />").attr("href", "#").appendTo(sharediv)
				.on("click", function() {
					var txt = Main.k.FormatProjects();
					$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
					return false;
				})
				.attr("_title", "Partager les projets")
				.attr("_desc", "Insère la liste de projets dans la zone de texte active, de la forme&nbsp;:</p><p>" +
				"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>" +
				"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>" +
				"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>")
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);
			}

			// Research
			if ($(".shareresearchbtn").length > 0) {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/microsc.png' />").attr("href", "#").appendTo(sharediv)
				.on("click", function() {
					var txt = Main.k.FormatResearch();
					$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
					return false;
				})
				.attr("_title", "Partager les recherches")
				.attr("_desc", "Insère la liste de recherches dans la zone de texte active, de la forme&nbsp;:</p><p>" +
				"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>" +
				"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>" +
				"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>")
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);
			}

			// BIOS
			if ($("#biosModule").length > 0) {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/pa_core.png' />").attr("href", "#").appendTo(sharediv)
				.on("click", function() {
					var txt = Main.k.FormatBIOS();
					$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
					return false;
				})
				.attr("_title", "Partager les paramètres BIOS")
				.attr("_desc", "Insère la liste de paramètres BIOS Neron dans la zone de texte active, de la forme&nbsp;:</p><p>TODO: aperçu")
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);
			}

			// Planets
			if ($("#navModule").length > 0) {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/planet.png' />").attr("href", "#").appendTo(sharediv)
				.on("click", function() {
					var txt = Main.k.FormatPlanets();
					$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
					return false;
				})
				.attr("_title", "Partager les planètes")
				.attr("_desc", "TODO: Texte | Séparer les planètes en deux boutons")
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);
			}



			// Formatting
			var formatdiv = $("<div>").addClass("replybuttons customreply").appendTo(jq.parent());
			formatdiv.siblings("textarea").css({"padding-bottom": "22px", height: "130px"});

			// Bold
			$("<a>").addClass("butmini formatbtn").html("<strong>B</strong>").attr("href", "#").appendTo(formatdiv)
			.on("click", function() {
				var t = $(this).parent().parent().find("textarea").insertAroundCaret("**","**");
			});

			// Italic
			$("<a>").addClass("butmini formatbtn").html("<i>I</i>").attr("href", "#").appendTo(formatdiv)
			.on("click", function() {
				var t = $(this).parent().parent().find("textarea").insertAroundCaret("//","//");
			});

			// Add smile
			$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/moral.png' />").attr("href", "#").appendTo(formatdiv)
			.on("click", function() {
				// TODO
			})
			.attr("_title", "Insérer un smiley")
			.attr("_desc", "Bientôt disponible.")
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.hideTip);

			// Empty textarea
			$("<a>").addClass("butmini").html("<img src='/img/icons/ui/bin.png' />").attr("href", "#").appendTo(formatdiv)
			.on("click", function() {
				var t = $(this).closest(".unit").find("textarea");
				t.val("");
				t.focus();
				return false;
			})
			.attr("_desc", "Vider la zone de texte.")
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.hideTip);

			// Close textarea
			$("<a>").addClass("butmini").html("<img src='/img/icons/ui/status/unsociable.png' />").attr("href", "#").appendTo(formatdiv)
			.on("click", function() {
				var jq = $(this);
				var jqp = jq.closest(".unit");
				jqp.find(".tree").not(".cdTreeReply").last().addClass("treelast");
				jqp.find(".blockreply").addClass("hide");
				jqp.find("textarea").val("");
				return false;
			})
			.attr("_desc", "Fermer la zone de texte.")
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.hideTip);

			// Add formatting link (manager)
			$("<span>&nbsp;</span>").appendTo(formatdiv);
			$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/pam.png' /> Formater").attr("href", "#").appendTo(formatdiv)
			.on("click", function() {
				var tgt = $(this);
				if (tgt.hasClass("butmini")) tgt = tgt.parent().parent().find("textarea");

				Main.k.Manager.openOn("reply", tgt.val(), tgt.closest(".unit").attr("data-k"));
				return false;
			})
			.attr("_desc", "Ouvrir le manager.")
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.hideTip);
		}
	}
	Main.onChatFocus = function(t,i) {
		if(t.data("default")) {
			t.val("");
			t.data("default",false);
		}
		null;
		if(0 == (Main.rst & 1 << i)) {
			Main.rst |= 1 << i;

			if (!t.parent().find(".formatbtn").get(0)) {
				t.attr("onblur", "");

				// Add formatting
				$("<a>").addClass("butmini chatformatbtn").html("<img src='/img/icons/ui/pam.png' /> Formater").attr("href", "#").appendTo(t.parent())
				.on("click", function() {
					var tgt = $(this);
					if (tgt.hasClass("butmini")) tgt = tgt.parent().find("textarea");

					Main.k.Manager.openOn("newtopic", tgt.val());
					return false;
				});

				// Display chat button & fix tabindex
				t.siblings("input").show();
				t.siblings("input").attr("tabindex",1);
			}
		}
	}
	// Still need correction to insert line break at caret
	// But nice try blackmagic, anyway~
	Main.onWallInput = function(event) {
		var tgt = new js.JQuery(event.target);
		var val = tgt.val();
		if (event.keyCode == 13) {
			if (!event.ctrlKey && val.length > 1) {
				var updtArr = ["cdTabsChat","chatBlock","char_col"];
				var scr = new js.JQuery(".cdWallChannel").scrollTop();
				var sendChatProc = function() {
					Main.resetJs();
					var jq = new js.JQuery(".cdWallChannel");
					jq.scrollTop(scr + 100);
				};
				if(Main.isTuto()) {
					updtArr.unshift("floating_ui_start");
					"floating_ui_start";
					updtArr.unshift("cdDialogs");
					"cdDialogs";
					updtArr.push("ode");
					"ode";
				}
				var stVal = StringTools.urlEncode(val);
				var url = "/wallReply?k=" + tgt.closest(".unit").data("k") + "&msg=" + stVal;
				Main.updateContent(url,updtArr,null,sendChatProc);
				Tools.send2Store("mush_wallReply_" + tgt.attr("id"),"");
				tgt.val(Main.getText("edit_me"));
				tgt.data("default",true);
			} else {
				// Insert line break at caret, not at the end...
				tgt.insertAtCaret("\n");
				Tools.send2Store("mush_wallReply_" + tgt.attr("id"),tgt.val());
			}
		} else Tools.send2Store("mush_wallReply_" + tgt.attr("id"),tgt.val());
	}

	Main.loadMoreWall = function(jq) {
		if(Main.lmwProcessing) return;
		Main.lmwProcessing = true;
		var w = Main.getChannel(Main.curChatIndex()).find("div.wall div.unit").last();
		var wp = w.closest(".wall");
		if(w.length > 0) {
			JqEx.postLoading(wp);
			Tools.ping("/retrWallAfter/" + w.data("k"),function(content) {
				var jq1 = $(content);
				JqEx.remLoading(wp);
				w.removeClass("cdLast"); // TODO: remove?
				wp.append(jq1.find(".wall").html());
				Main.lmwProcessing = false;

				if (Main.k.Options.cbubbles) Main.k.customBubbles();

				// Never hide unread msg
				$("table.treereply tr.not_read.cdRepl").css("display", "table-row");
			});
		} else {
			Main.lmwProcessing = false;
		}
	}
	Main.resetJs = function(doActions, skipK) {
		if(doActions == null) doActions = true;
		$(".cdLoading").remove();
		Main.onFirstFrame(false);
		Main.removeTip();
		Main.doChat();
		Main.refreshSelection();
		if(doActions) Main.acListMaintainer.refresh(true);
		Main.syncInvOffset(null,true);
		Main.doChatPacks();
		Main.topChat();
		Main.onRealLoad();

		if (!skipK) Main.k.MushUpdate();
	}
	Main.k.fakeSelected = null;
	Main.k.fakeSelectItem = function(frm) {
		frm = $(frm);
		if (frm.hasClass("on")) {
			Main.closet.hide(true);
			$(".inventory .selected").parent().removeClass("on");
			$(".inventory .selected").remove();

			//$(".inv").css("display", "none");
			var invbloc = $("#cdInventory .invcolorbg");
			//invbloc.css("display", "none");
			//invbloc.find(".exceed").css("display", "block");
			invbloc.find(".arrowleft").css("display", "block");
			invbloc.find(".arrowright").css("display", "block");
			Main.cancelSelection(frm);
			Main.k.fakeSelected = null;

		} else {
			Main.closet.show(true,false);
			Main.rmMan.getProxy(Clients.ISO_MODULE)._cancelSelection()
			Main.k.fakeSelected = frm;
			$(".inventory .selected").parent().removeClass("on");
			$(".inventory .selected").remove();
			//$(".inv").css("display", "block");
			$(".inv").addClass("placard_on");
			//$(".inv").css("margin-top", "-194px");

			Main.sel.selectBySerial(frm.attr("serial_fake"));
			var invbloc = $("#cdInventory .invcolorbg");
			invbloc.css("display", "block");
			//invbloc.find(".exceed").css("display", "none");
			invbloc.find(".arrowleft").css("display", "none");
			invbloc.find(".arrowright").css("display", "none");

			frm.addClass("on");
			if (frm.find(".selected").length == 0) frm.prepend($("<div>").addClass("selected"));
		}
	}
	Main.selectItem = function(frm) {
		frm = $(frm);
		if (frm.hasClass("fakeitem")) return;
		if (frm.hasClass("on") && frm.parents('#research_module').length < 1) {
			Main.cancelSelection(frm);
		} else {
			Main.sel.selectBySerial(frm.attr("serial"));
		}
	}

	// Seems to work again; if not use next method instead
	Main.sel.selectBySerial = function(serial) {
		var jMe = $("[serial='" + serial + "']");
		//if (jMe.length == 0) return; // << from flash
		js.Cookie.set(CrossConsts.COOK_SEL,StringTools.urlEncode(serial),3600);

		var parentId = "";
		var realJMe = null;
		jMe.each(function() {
			if ($(this).parent().attr("id") != undefined) {
				realJMe = $(this);
				parentId = $(this).parent().attr("id");
			}
		});

		if (parentId == "myInventory") {
			var islab = (realJMe.parent().parent().parent().attr("id") == "research_module");

			if (islab) {
				if (realJMe.hasClass("fakeselected")) {
					// Clear selection
					realJMe.removeClass("fakeselected");
					$("#cdActionList div").not(".move").remove();
					Main.cancelSelection(realJMe);
					this.currentInvSelection = null;

					var tgt = $(".cdActionList");
					var src = $(".cdActionRepository .heroRoomActions").children().clone();
					tgt.html(src);
					$(".cdActionList .move").hide();

					return;
				}

				var allItems = $("#myInventory .item").not(".cdEmptySlot").add("[serverselected=true]");
				$(".cdCharColSel").remove();
				$("#myInventory .selected").parent().removeClass("on");
				$("#myInventory .selected").remove();
				realJMe.addClass("fakeselected");

				var realJMe = $("[data-tip='" + realJMe.attr("data-tip") + "']").not("[serial='" + serial + "']");
				var serial = realJMe.attr("serial");
				this.currentInvSelection = null;
				Main.cancelSelection(realJMe);
				Main.acListMaintainer.heroWorking = true;
				Main.acListMaintainer.refreshHeroInv();
				Main.acListMaintainer.heroWorking = true;
				this.currentInvSelection = serial;
				Main.acListMaintainer.refreshHeroInv();


				var actions = $("div[webdata='" + serial + "']");
				$("#cdActionList").find("div").hide();
				actions.each(function() {
					$(this).clone().appendTo("#cdActionList");
				})


				$("<div class='action stSel'> " + realJMe.attr("data-name").split("\\'").join("'") + " :</div>").prependTo("#cdActionList");

			} else {
				var allItems = $("#myInventory .item").not(".cdEmptySlot").add("[serverselected=true]");
				$(".cdCharColSel").remove();
				$("#myInventory .selected").parent().removeClass("on");
				$("#myInventory .selected").remove();
				realJMe.addClass("on").prepend(new Tag("div").attr("class","selected").toString());

				var pre = $("<div class='action stSel cdCharColSel'> " + realJMe.data("name").split("\\'").join("'") + " :</div>");
				$(".cdHeroOne").prepend(pre);
				Lambda.iter(allItems.toArray(),function(h) {
					h.onclick = function(e) {
						Main.selectItem(h);
					};
				});
				realJMe.get().onclick = function(e) {
					Main.cancelSelection(realJMe);
				};

				Main.acListMaintainer.heroWorking = false;
				this.currentInvSelection = serial;
				Main.acListMaintainer.refreshHeroInv();
			}
		} else if (parentId == "room") {
			var allItems = $(".inventory .item").not(".cdEmptySlot");
			$(".inventory .selected").parent().removeClass("on");
			$(".inventory .selected").remove();

			// Select object
			realJMe.addClass("on");
			realJMe.prepend($("<div>").addClass("selected"));

			var lit = realJMe.data("name").split("\\'").join("'");
			$("#tt_itemname").html(lit);
			Lambda.iter(allItems.toArray(),function(h1) {
				h1.onclick = function(e) {
					Main.selectItem(h1);
				};
			});

			$(".inv").css("display", "block");
			var invbloc = $("#cdInventory .invcolorbg");
			invbloc.css("display", "block");
			invbloc.find(".exceed").css("display", "block");
			invbloc.find(".arrowleft").css("display", "block");
			invbloc.find(".arrowright").css("display", "block");

			this.currentRoomSelection = serial;
			Main.acListMaintainer.refreshRoomInv();
			Main.k.fakeSelected = null;

			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) {
				if(Main.closet.visible) prx._setBaseLine(CrossConsts.BASELINE_CLOSET); else prx._setBaseLine(CrossConsts.BASELINE_ACTIONS);
			}
			$(".inv").css("visibility","visible");
		} else {
			Main.closet.visible = false;
			Main.cancelSelection(Main.k.fakeSelected);
			Main.acListMaintainer.refreshRoomInv();
			this.currentRoomSelection = serial;
			Main.acListMaintainer.refreshRoomInv();
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(CrossConsts.BASELINE_ACTIONS);
			$(".inv").css("display","block");
			$(".inv").css("visibility","visible");
			$(".inv").css("margin-top", "-108px");
			$("#cdInventory .invcolorbg").css("display", "none");
			$("#cdItemActions").addClass("selectplayer");
			$("#cdInventory").removeClass("placard_on");
		}
	}
	Main.confirmAction = function(frm,text,fct){
		if(Main.k.Options.mushNoConf && text == Main.k.text.confirmBeneficialAction){
			fct(frm);
		}else{
			Main.jsChoiceBox("",text,Main.getText("ok"),Main.getText("cancel"),function(_) {
				fct(frm);
			},function(_) {
				return;
			},fct == Main.ajaxAction ? "ok" : "");
		}
	}
	
	Main.confirmCustomProjAction = function(frm,text) {
		Main.confirmAction(frm,text,Main.customProjAction);
	};

	Main.confirmCustomLabAction = function(frm,text) {
		Main.confirmAction(frm,text,Main.customLabAction);
	};
	
	Main.confirmCustomPilgredAction = function(frm,text) {
		Main.confirmAction(frm,text,Main.customPilgredAction);
	};

	Main.confirmAjaxAction = function(frm,text) {
		Main.confirmAction(frm,text,Main.ajaxAction);
	};

	/*Main.sel.selectBySerial = function(serial) {
		js.Cookie.set(CrossConsts.COOK_SEL,StringTools.urlEncode(serial),3600);
		var jMe = Selection.j("[serial=" + serial + "]:not(.fakeitem)");
		var domMe = jMe.toArray()[0];
		if(jMe.parent().attr("id") == "myInventory") {
			// ******** CTRL+W ******* /
			if(jMe.parents('#research_module').length > 0){ //is lab
				var allItems = $("#myInventory .item").not(".cdEmptySlot").add("[serverselected=true]");
				$(".cdCharColSel").remove();
				$("#myInventory .selected").parent().removeClass("on");
				$("#myInventory .selected").remove();
				var realJMe = $("[data-tip='" + jMe.attr("data-tip") + "']").not("[serial='" + serial + "']");
				var serial = realJMe.attr("serial");
				this.currentInvSelection = null;
				//Main.cancelSelection(realJMe);
				Main.acListMaintainer.heroWorking = true;
				Main.acListMaintainer.refreshHeroInv();
				Main.acListMaintainer.heroWorking = true;
				this.currentInvSelection = serial;
				Main.acListMaintainer.refreshHeroInv();


				var actions = $("div[webdata='" + serial + "']");
				$("#cdActionList").find("div").hide();
				actions.each(function() {
					$(this).clone().appendTo("#cdActionList");
				})
				jMe.addClass("on").prepend(new Tag("div").attr("class","selected").toString());
				$("<div class='action stSel'> " + realJMe.attr("data-name").split("\\'").join("'") + " :</div>").prependTo("#cdActionList");

			}else{
			// ******** /CTRL+W ******* /
				var allItems = JqEx.j("#myInventory .item").not(".cdEmptySlot").add("[serverselected=true]");
				Selection.j(".cdCharColSel").remove();
				Selection.j("#myInventory .selected").parent().removeClass("on");
				Selection.j("#myInventory .selected").remove();
				jMe.addClass("on").prepend(new Tag("div").attr("class","selected").toString());
				var pre = Selection.j("<div class='action stSel cdCharColSel'> " + (function($this) {
					var $r;
					var s = jMe.data("name");
					$r = s.split("\\'").join("'");
					return $r;
				}(this)) + " :</div>");

				Selection.j(".cdHeroOne").prepend(pre);
				Lambda.iter(allItems.toArray(),function(h) {
					h.onclick = function(e) {
						Main.selectItem(h);
					};
				});
				if(domMe != null) domMe.onclick = function(e) {
					Main.cancelSelection(jMe);
				};
				this.currentInvSelection = serial;
				Main.acListMaintainer.refreshHeroInv();
			}

		} else if(jMe.parent().attr("id") == "room") {
			var allItems = JqEx.j("#room .item").not(".cdEmptySlot");
			Selection.j("#room .selected").parent().removeClass("on");
			Selection.j("#room .selected").remove();
			jMe.addClass("on").prepend(new Tag("div").attr("class","selected").toString());
			var lit;
			var s = jMe.data("name");
			lit = s.split("\\'").join("'");
			Selection.j("#tt_itemname").html(lit);
			var tab = allItems.toArray();
			Lambda.iter(allItems.toArray(),function(h1) {
				h1.onclick = function(e) {
					Main.selectItem(h1);
				};
			});
			if(domMe != null) domMe.onclick = function(e) {
				Main.cancelSelection(jMe);
			};
			this.currentRoomSelection = serial;
			Main.acListMaintainer.refreshRoomInv();
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) {
				if(Main.closet.visible) prx._setBaseLine(CrossConsts.BASELINE_CLOSET); else prx._setBaseLine(CrossConsts.BASELINE_ACTIONS);
			}
			Selection.j(".inv").css("visibility","visible");
			Selection.j(".cdDistrib").addClass("placard_on");
		} else {
			this.currentRoomSelection = serial;
			Main.acListMaintainer.refreshRoomInv();
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(CrossConsts.BASELINE_ACTIONS);
			Selection.j(".inv").css("visibility","visible");
			Selection.j(".cdDistrib").addClass("placard_on");
		}
	}*/
	// == /Extend Main ============================================




	// ============================================================
	// == User Script  ============================================
	// ============================================================
	
	Main.k.COMPLETE_SURNAME = function(n) { return n.replace("_", " ").capitalize(); }
	Main.k.LoadJS = function(url, params, after) {
		var s = js.Lib.document.createElement("script");
		s.async = true;
		var p = Reflect.copy(params);
		p.jsm = "1";
		p.lang = "FR";
		s.src = _tid.makeUrl(url,p);
		if (after != null) s.onload = after;
		js.Lib.document.body.appendChild(s);
	}
	Main.k.postMessage = function(k, msg, after) {
		// Save msg
		var stVal = StringTools.urlEncode(msg);
		js.Cookie.set("lastsentmsg", stVal);
		Main.k.displayLastSent(true);

		var sendChatProc = function() {
			Main.resetJs();

			// Message sent
			Main.k.displayLastSent(false);
			if (after) after();
		};

		var updtArr = ["cdTabsChat","chatBlock","char_col"];
		var url = "/wallReply?k=" + k + "&msg=" + stVal;
		Main.updateContent(url,updtArr,null,sendChatProc);
	}
	Main.k.newTopic = function(msg, after) {
		// Save msg
		var stVal = StringTools.urlEncode(msg);
		js.Cookie.set("lastsentmsg", stVal);
		Main.k.displayLastSent(true);

		var sendChatProc = function() {
			Main.resetJs();

			// Message sent
			Main.k.displayLastSent(false);
			if (after) after();
		};

		var updtArr = ["cdTabsChat","chatBlock","char_col"];
		var url = "/newWallThread?message=" + stVal;
		Main.updateContent(url,updtArr,null,sendChatProc);
	}
	Main.k.displayLastSent = function(show) {
		var btn = $("#lastsentmsg");
		if (show) {
			btn.css("display", "block");
			var cook = js.Cookie.get("lastsentmsg");
		} else {
			btn.css("display", "none");
			js.Cookie.set("lastsentmsg", "");
		}
	}
	Main.k.FormatInventory = function() {
		// Room name
		var inv = "**" + $("#input").attr("d_name") + " :** ";

		// Objects
		var objects = $("#room").clone();
		objects.find(".cdEmptySlot").remove();
		var first = true;
		objects.find("li").each(function(i) {
			// Ignore hidden objects
			if ($(this).attr("data-name").indexOf("/img/icons/ui/hidden.png") != -1) return;
			var name = $(this).attr("data-name");

			// Ignore personal objects
			var perso = ["itrakie","itrackie", "talkie", "walkie", "traqueur", "tracker"]; // TODO: add other translations (itrackie exists or it's a mistake ?)
			for (var a = 0 ; a < perso.length ; a++) if (name.toLowerCase().indexOf(perso[a].toLowerCase()) != -1) return;

			// Handle broken objects
			var broken = (name.indexOf("/img/icons/ui/broken.png") > -1);

			// Remove img from desc
			name = name.replace(/(<img.+\/>)/ig, "").trim();

			// Handle mage books
			if (name.toLowerCase() == Main.k.text.mageBook.toLowerCase()) {
				name = decodeURIComponent(/namey[0-9]+:(.+)g$/.exec($(this).attr("data-tip"))[1]).replace(/(\s\s)/, " ");
			}

			// Handle quantity
			var qty = "";
			if ($(this).find(".qty").get(0)) {
				qty = " x" + $(this).find(".qty").html().trim();
			}

			// Handle loads
			var reg = /x([0-9]+)$/;
			if (reg.test(name)) name += " " + Main.k.text.loads;

			if (!first) inv += ", ";
			inv += "//" + name + "//" + qty;
			if (broken) inv += " :alert:";
			first = false;
		});
		if (first) inv += "//" + Main.k.text.empty + "//";

		// Camera / Drone
		var ncamera = 0;
		var ndrones = 0;
		var $it = Main.items.iterator();
		while( $it.hasNext() ) {
			var item = $it.next();
			if (item.iid == "CAMERA") ncamera++;
			else if (item.iid == "HELP_DRONE") ndrones++;
		}
		if (ncamera || ndrones) inv += " [";
		if (ncamera) inv += ncamera + " " + Main.k.text.camera + (ncamera != 1 ? "s" : "");
		if (ncamera && ndrones) inv += " - ";
		if (ndrones) inv += ndrones + " " + Main.k.text.drone + (ndrones != 1 ? "s" : "");
		if (ncamera || ndrones) inv += "]";

		return inv;
	}
	Main.k.FormatPlants = function() {
		var ret = "**//" + Main.k.text.plants.capitalize() + " : //**";

		$("#room").find("[data-id='TREE_POT']").each(function(i) {
			var name = /^([^<]+)/.exec($(this).attr("data-name"))[1].trim();
			var diseased = ($(this).attr("data-name").indexOf("plant_diseased") != -1);
			var thirsty = ($(this).attr("data-name").indexOf("plant_thirsty") != -1);
			var dry = ($(this).attr("data-name").indexOf("plant_dry") != -1);
			var adult = true; // TODO

			ret += "\n- ////**" + name + "** ";
			//ret += adult ? "(mature)" : "(X cycles)";
			ret += " - ";

			var problems = [];
			if (diseased) problems.push("//" + Main.k.text.diseased.capitalize() + "//");
			if (thirsty) problems.push("//" + Main.k.text.thirsty.capitalize() + "//");
			if (dry) problems.push("//" + Main.k.text.dry.capitalize() + "//");
			if(problems.length == 0) problems.push("//" + Main.k.text.nothingToReport.capitalize() + "//");

			ret += problems.join();

		});

		return ret;
	}
	Main.k.FormatProjects = function() {//TODO: MULTILANG
		var ret = "**//Projets : //**";

		var parse = function(t) {
			t = t.replace(/<img\s+src=\"\/img\/icons\/ui\/pa_slot1.png\"[\/\s]*>/ig, ":pa:");
			t = t.replace(/&nbsp;/ig, " ");
			t = t.replace(/\n/ig, "");
			t = t.replace(/<p>/ig, " ");
			t = t.replace(/<\/?[^>]+>/g, "");
			return t;
		}

		$("#cdModuleContent ul.dev li.cdProjCard").each(function(i) {
			var name = $(this).find("h3").html().trim();
			var pct = $(this).find("span").html().trim();
			var desc = parse($(this).find("div.desc").html().trim());
			var bonus1 = /<h1>([^<]+)<\/h1>/.exec($(this).find("div.suggestprogress ul li img").first().attr("onmouseover"))[1].trim();
			var bonus2 = /<h1>([^<]+)<\/h1>/.exec($(this).find("div.suggestprogress ul li img").last().attr("onmouseover"))[1].trim();

			ret += "\r\n**" + name + "** - " + pct + "\n";
			ret += "" + desc + "\n";
			ret += "Bonus : //" + bonus1 + "//, //" + bonus2 + "//";
		});

		return ret;
	}
	Main.k.FormatResearch = function() {//TODO: MULTILANG
		var ret = "**//Recherches : //**";

		var parse = function(t) {
			t = t.replace(/<img\s+src=\"\/img\/icons\/ui\/triumph.png\"\s+alt=\"triomphe\"[\/\s]*>/ig, ":mush_triumph:");
			t = t.replace(/&nbsp;/ig, " ");
			t = t.replace(/\n/ig, "");
			t = t.replace(/<p>/ig, " ");
			t = t.replace(/<\/?[^>]+>/g, "");
			return t;
		}

		$("#cdModuleContent ul.dev li.cdProjCard").each(function(i) {
			var h3 = $(this).find("h3").clone();
			h3.find("em").remove();
			var name = parse(h3.html().trim());
			var pct = $(this).find("span").html().trim();
			var desc = parse($(this).find("div.desc").html().trim());
			var bonus1 = /<strong>([^<]+)<\/strong>/.exec($(this).find("div.suggestprogress ul li img").first().attr("onmouseover"))[1].trim().replace("Médeçin", "Médecin");
			var bonus2 = /<strong>([^<]+)<\/strong>/.exec($(this).find("div.suggestprogress ul li img").last().attr("onmouseover"))[1].trim().replace("Médeçin", "Médecin");
			ret += "\r\n**" + name + "** - " + pct + "\n";
			ret += "" + desc + "\n";
			ret += "Bonus : //" + bonus1 + "//, //" + bonus2 + "//";
		});

		return ret;
	}
	Main.k.FormatPlanets = function() {//TODO: MULTILANG
		var ret = "**//Planètes : //**";

		var parse = function(t) {
			t = t.replace(/<img\s+src=\"\/img\/icons\/ui\/triumph.png\"\s+alt=\"triomphe\"[\/\s]*>/ig, ":mush_triumph:");
			t = t.replace(/&nbsp;/ig, " ");
			t = t.replace(/\n/ig, "");
			t = t.replace(/<p>/ig, " ");
			t = t.replace(/<\/?[^>]+>/g, "");
			return t;
		}

		$("#navModule .planet").not(".planetoff").each(function(i) {
			// Name + Planet img
			var name = $(this).find("h3").html().trim();
			var img = $(this).find("img.previmg").attr("src");

			// Distance & fuel
			var dir, dist;
			var pllist = $(this).find("ul.pllist li");
			if (pllist.length > 0) {
				dir = /(Nord|Est|Ouest|Sud)/.exec(pllist.eq(-2).html())[1];
				dist = /([0-9]+)/.exec(pllist.last().html())[1];
			}

			// Cases
			var nbcases = $(this).find("td img.explTag").length;
			var cases = [];
			var casenamereg = /<h1>([^<]+)<\/h1>/;
			$(this).find("td img.explTag.on").each(function() {
				cases.push(casenamereg.exec($(this).attr("onmouseover"))[1]);
			});

			// Print planet
			ret += "\n**" + name + "** (" + nbcases + " cases)\n";
			if (dist && dir) ret += "//" + dir + " - " + dist + " :mush_fuel:****//\n";
			ret += cases.join(", ");
		});

		return ret;
	}
	Main.k.FormatBIOS = function() {//TODO: MULTILANG
		var ret = "**//Paramètres BIOS : //**";

		$('#biosModule ul.dev li').each(function() {
			var biosParam = $(this);
			ret += "\n**" + $(this).children("h3:first").text().trim() + "** : ";
			ret += $(this).find("input[checked='checked']").siblings("label").text();
		});

		return ret;
	}
	Main.k.FormatPharma = function() {//TODO: MULTILANG
		var ret = "**//Consommables : //**";

		$("#room").find("li").not(".cdEmptySlot").each(function() {
			var name = $(this).attr("data-name").capitalize();
			var desc = $(this).attr("data-desc");

			if (desc.indexOf("Effets") != -1) {
				ret += "\n**" + name + "** : ";
				ret += desc.substring(desc.indexOf("</em>")+5, desc.length);
			}
		});

		ret = ret.replace(/<\/p>/g, ", ");
		ret = ret.replace(/(\t|\\r\\n|\\|<\/?(p|div)>)/g, "");
		ret = ret.replace(/,\s<br\/>/g, "\n");
		ret = ret.replace(/<img[^>]+pa_slot1[^>]+>/g, ":pa:");
		ret = ret.replace(/<img[^>]+pa_slot2[^>]+>/g, ":pm:");
		ret = ret.replace(/<img[^>]+moral[^>]+>/g, ":moral:");

		return ret;
	}
	Main.k.FormatLife = function() {//TODO: MULTILANG
		var pv = $("table.pvsm td").not(".barmoral").find("span").html().trim();
		var moral = $("table.pvsm td.barmoral span").html().trim();
		return pv + " :mush_hp: / " + moral + " :mush_moral:";
	}
    Main.k.Resize = function() {
		var leftbar = $(".usLeftbar");
		var content = $("#content");
		var bw = $("body").width();
		var lbw = 125; //leftbar.width();
		var w = Math.min(Main.k.BMAXWIDTH, bw - lbw - 30);
		content.css("width", w);

		if ($(Main.k.window).width() > (w + (lbw + 15)*2)) {
			content.css("left", (bw - w) / 2 + "px");

			// Fix background position
			if (Main.k.Options.dlogo) $("body").css("background-position", "-" + ((1830-bw)/2) + "px 20px");
		} else {
			content.css("left", lbw + 15 + "px");

			// Fix background position
			if (Main.k.Options.dlogo) $("body").css("background-position", "-272px 20px");
		}

		var content_height = content.height() + content.position().top;
		if (leftbar.height() < content_height) {
			leftbar.css("height", content_height-11);
		} else {
			content.css("height", leftbar.height() - content.position().top + 11);
		}
	}
	Main.k.ToggleDisplay = function() {
		if (this.className == "displaymore") {
			this.className = "displayless";
			$("" + $(this).attr("_target")).css("display", "block");
		} else {
			this.className = "displaymore";
			$("" + $(this).attr("_target")).css("display", "none");
		}
		Main.k.Resize;
	}
	Main.k.ExtendPilgred = function() {//TODO: MULTILANG
		$("#pilgredbonus").remove();
		var pilgred = $("#cdBottomBlock div.pilgred").parent().css({
			position: "relative",
			"margin-right": "160px"
		});

		// Double research points
		var research = $("#cdBottomBlock div.research");
		var researchtriumph = 0;
		research.each(function() {
			var name = $(this).parent().find("img").attr("src").replace("/img/cards/research/", "").replace(".png", "");
			if(Main.k.researchGlory[name]) researchtriumph += Main.k.researchGlory[name];
		});

		// -10 / mush alive
		var nmush = $("ul.people img[src='/img/icons/ui/p_mush.png']").length;
		var mushtriumph = -10 * nmush;

		// Print result
		var res = "<h4>Triomphe retour sur sol</h4>" +
		"- Retour sur Sol : 20 <br/>" +
		"- Bonus recherches : " + researchtriumph + "<br/>" +
		"- Malus mush en vie : " + mushtriumph + "<br/>" +
		"Total : " + (20 + researchtriumph + mushtriumph);
		$("<div>").attr("id", "pilgredbonus").css({
			position: "absolute",
			top: "3px",
			left: "54px",
			width: "140px",
			"font-size": "11px"
		}).html(res).appendTo(pilgred);
	}
	Main.k.maxAgo = function(a,b) {//TODO: MULTILANG
		// TODO: factorize code

		// undefined
		if (!a) return b;
		if (!b) return a;

		// <1min
		if (a == "&lt;1m") return b;
		if (b == "&lt;1m") return a;

		// Minutes
		var reg_min = /([0-9]+)min/;
		if (reg_min.test(a)) {
			if (!reg_min.test(b)) return b;

			var min_a = parseInt(reg_min.exec(a)[1]);
			var min_b = parseInt(reg_min.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		} else if (reg_min.test(b)) {
			if (!reg_min.test(a)) return a;

			var min_a = parseInt(reg_min.exec(a)[1]);
			var min_b = parseInt(reg_min.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		}

		// Hours
		var reg_hours = /\~([0-9]+)h/;
		if (reg_hours.test(a)) {
			if (!reg_hours.test(b)) return b;

			var min_a = parseInt(reg_hours.exec(a)[1]);
			var min_b = parseInt(reg_hours.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		} else if (reg_hours.test(b)) {
			if (!reg_hours.test(a)) return a;

			var min_a = parseInt(reg_hours.exec(a)[1]);
			var min_b = parseInt(reg_hours.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		}

		// Days
		var reg_days = /\~([0-9]+)j/;
		if (reg_days.test(a)) {
			if (!reg_days.test(b)) return b;

			var min_a = parseInt(reg_days.exec(a)[1]);
			var min_b = parseInt(reg_days.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		} else if (reg_days.test(b)) {
			if (!reg_days.test(a)) return a;

			var min_a = parseInt(reg_days.exec(a)[1]);
			var min_b = parseInt(reg_days.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		}

		// ?
		return a;
	}
	Main.k.minAgo = function(a,b) {//TODO: MULTILANG
		// TODO: factorize code

		// undefined
		if (!a) return b;
		if (!b) return a;

		// <1min
		if (a == "&lt;1m") return a;
		if (b == "&lt;1m") return b;

		// Minutes
		var reg_min = /([0-9]+)min/;
		if (reg_min.test(a)) {
			if (!reg_min.test(b)) return a;

			var min_a = parseInt(reg_min.exec(a)[1]);
			var min_b = parseInt(reg_min.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		} else if (reg_min.test(b)) {
			if (!reg_min.test(a)) return b;

			var min_a = parseInt(reg_min.exec(a)[1]);
			var min_b = parseInt(reg_min.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		}

		// Hours
		var reg_hours = /\~([0-9]+)h/;
		if (reg_hours.test(a)) {
			if (!reg_hours.test(b)) return a;

			var min_a = parseInt(reg_hours.exec(a)[1]);
			var min_b = parseInt(reg_hours.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		} else if (reg_hours.test(b)) {
			if (!reg_hours.test(a)) return b;

			var min_a = parseInt(reg_hours.exec(a)[1]);
			var min_b = parseInt(reg_hours.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		}

		// Days
		var reg_days = /\~([0-9]+)j/;
		if (reg_days.test(a)) {
			if (!reg_days.test(b)) return a;

			var min_a = parseInt(reg_days.exec(a)[1]);
			var min_b = parseInt(reg_days.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		} else if (reg_days.test(b)) {
			if (!reg_days.test(a)) return b;

			var min_a = parseInt(reg_days.exec(a)[1]);
			var min_b = parseInt(reg_days.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		}

		// ?
		return a;
	}
	Main.k.extendAgo = function(ago) {//TODO: MULTILANG
		var one = (parseInt(/([0-9]+)/.exec(ago)[1]) == 1);

		ago = ago.replace("min", " minute" + (one ? "" : "s"));
		ago = ago.replace("h", " heure" + (one ? "" : "s"));
		ago = ago.replace("j", " jour" + (one ? "" : "s"));
		ago = ago.replace("&lt;1m", "moins d'une minute");
		ago = ago.replace("~", "environ ");
		return ago;
	}
	Main.k.surnameToBubble = function(surname){
		return surname.replace(/(\s)/g, "_").toLowerCase();
	}
	Main.k.customBubbles = function() {
		var bubbles = $(".bubble");
		if (Main.k.Options.cbubbles) {
			bubbles.each(function() {
				charname = Main.k.GetHeroNameFromTopic($(this).parent());
				$(this).addClass("bubble_" + charname);
				if (Main.k.Options.cbubblesNB) $(this).addClass("custombubbles_nobackground");
			});
		} else {
			bubbles.removeClass("custombubbles_nobackground");

			for (var i=0; i<Main.k.HEROES.length; i++ ) {
				bubbles.removeClass("bubble_" + Main.k.HEROES[i]);
			}
		}
	}
	Main.k.updateBottom = function() {
		if ($("#cdBottomBlock div.pilgred").length > 0) Main.k.ExtendPilgred();
		$("#cdBottomBlock div.split").remove();
		if (Main.k.Options.splitpjt) {
			if ($("#cdBottomBlock div.project").length > 0) $("<div>").addClass("split").insertAfter($("#cdBottomBlock div.project").last().parent());
			if ($("#cdBottomBlock div.research").length > 0) $("<div>").addClass("split").insertAfter($("#cdBottomBlock div.research").last().parent());
		}
	}

	// Game zone fold/unfold
	Main.k.folding = {};
	Main.k.folding.displayed = "game";
	Main.k.folding.busy = false;
	Main.k.folding.currcols = ["#char_col", "#room_col", "#chat_col"];
	Main.k.folding.gamecols = ["#char_col", "#room_col", "#chat_col"];
	Main.k.folding.display = function(cols, newdisplay, afterdisplay) {
		if (Main.k.folding.busy) return;
		Main.k.folding.busy = true;
		Main.k.folding.displayed = newdisplay;

		// Get cols to fold
		var tofold = [null, null, null];
		for (var i=0; i<Main.k.folding.currcols.length; i++) {
			if (cols[i]) {
				if (cols[i] != Main.k.folding.currcols[i]) tofold[i] = Main.k.folding.currcols[i];
			} else if (Main.k.folding.currcols[i] != Main.k.folding.gamecols[i]) {
				tofold[i] = Main.k.folding.currcols[i];
			}
		}

		// Unfolding
		var after = function() {
			// Get cols to unfold
			var tounfold = [null, null, null];
			for (var i=0; i<Main.k.folding.currcols.length; i++) {
				// If a new col is wanted here
				if (cols[i]) {
					if (cols[i] != Main.k.folding.currcols[i]) tounfold[i] = cols[i];

				// Else display game col
				} else if (Main.k.folding.currcols[i] != Main.k.folding.gamecols[i]) {
					tounfold[i] = Main.k.folding.gamecols[i];
				}
			}

			// Unfold
			Main.k.folding.unfold(tounfold, function() {
				Main.k.folding.busy = false;
				if (afterdisplay && typeof afterdisplay == 'function') afterdisplay();
			});
		}

		// Fold previous cols, then unfold new cols
		Main.k.folding.fold(tofold, after);
	}
	Main.k.folding.displayGame = function(afterdisplay) {
		if (Main.k.folding.busy) return;
		Main.k.folding.busy = true;
		Main.k.folding.displayed = "game";

		// Get cols to fold
		var tofold = [null, null, null];
		for (var i=0; i<Main.k.folding.currcols.length; i++) {
			if (Main.k.folding.currcols[i] != Main.k.folding.gamecols[i]) tofold[i] = Main.k.folding.currcols[i];
		}

		// Unfolding
		var after = function() {
			// Get cols to unfold
			var tounfold = [null, null, null];
			for (var i=0; i<Main.k.folding.currcols.length; i++) {
				// Display game col
				if (Main.k.folding.currcols[i] != Main.k.folding.gamecols[i]) {
					tounfold[i] = Main.k.folding.gamecols[i];
				}
			}

			// Unfold
			Main.k.folding.unfold(tounfold, function() {
				Main.k.folding.busy = false;
				if (afterdisplay) afterdisplay();
			});
		}

		// Fold previous cols, then unfold new cols
		Main.k.folding.fold(tofold, after);
	}
	Main.k.folding.fold = function(cols, after) {
		// Init CSS transform
		for (var i=0; i<cols.length; i++) {
			if (cols[i]) $(cols[i]).css({
				"transform": "scale(0,1)",
				"-o-transform": "scale(0,1)",
				"-webkit-transform": "scale(0,1)"
			});
		}

		setTimeout(function() {
			// Hide previous cols
			for (var i=0; i<cols.length; i++) {
				if (cols[i]) $(cols[i]).hide();
			}

			if (after) after();
		}, 250);
	}
	Main.k.folding.unfold = function(cols, after) {
		// Display new cols
		for (var i=0; i<cols.length; i++) {
			if (cols[i]) $(cols[i]).show();
		}

		setTimeout(function() {
			// Init CSS transform
			for (var i=0; i<cols.length; i++) {
				if (cols[i]) $(cols[i]).css({
					"transform": "scale(1,1)",
					"-o-transform": "scale(1,1)",
					"-webkit-transform": "scale(1,1)"
				});
			}

			setTimeout(function() {
				// Update current cols
				for (var i=0; i<cols.length; i++) {
					if (cols[i]) Main.k.folding.currcols[i] = cols[i];
				}

				if (after) after();

				// Fix flash (chrome)
				if (cols[1] == Main.k.folding.gamecols[1]) {
					$("body").delay(200, "myQueue").queue("myQueue", function() {
						Main.refreshChat();
						Main.acListMaintainer.refresh(true);
						Main.syncInvOffset(null,true);
						Main.doChatPacks();
						Main.topChat();
						Main.onChanDone(ChatType.Local[1],true)
					}).dequeue("myQueue");
				}
			}, 230);
		}, 20);
	}

	Main.k.About = {};
	Main.k.About.initialized = false;
	Main.k.About.open = function() {//TODO: MULTILANG
		if (Main.k.folding.displayed == "about") {
			Main.k.folding.displayGame();
			return;
		}

		if (!Main.k.About.initialized) {
			Main.k.About.initialized = true;

			var td = $("<td>").addClass("").css({
				"padding-right": "6px",
				"padding-top": "1px",
				transform: "scale(0,1)",
				color: "rgb(9,10,97)"
			}).attr("id", "about_col").appendTo($("table.inter tr").first());

			// Logo

			// Links
			var links = $("<div>").css({
				"text-align": "center"
			}).appendTo(td);
			$("<img>").css({
				height: "100px",
				margin: "0 auto 0px"
			}).attr("src", Main.k.servurl + "/img/ctrlw1.png").appendTo(links);
			$("<br/>").appendTo(links);
			Main.k.MakeButton("<img src='/img/icons/ui/planet.png' /> Site Web", Main.k.website).css({
				margin: "0 2px",
				display: "inline-block"
			}).appendTo(links);
			Main.k.MakeButton("<img src='/img/icons/ui/talkie.png' /> Chan IRC", "http://webchat.quakenet.org/?channels=#ctrlw").css({
				margin: "0 2px",
				display: "inline-block"
			}).appendTo(links)
			.find("a").attr("_title", "Chan IRC")
			.attr("_desc", "Venez discuter sur IRC avec les autres utilisateurs du script. \
			Vous pourrez également y trouver de l'aide ou faire des suggestions.</p><p><strong>Chan #ctrlw sur Quakenet</strong>")
			.on("mouseover", Main.k.CustomTip).on("mouseout", Main.hideTip);
			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> Topic (Forum Mush)", Main.k.topicurl).css({
				margin: "0 2px",
				display: "inline-block"
			}).appendTo(links);

			// Disclaimer
			$("<p>").css({
				margin: "20px",
				color: "#CCC",
				"text-align": "center"
			}).html("Script développé par <a href='http://twinoid.com/user/8297'>kill0u</a>, maintenu par <a href='http://twinoid.com/user/1244143'>badconker</a><br/>\
			Le logo, les images (mise en forme personnalisée des messages) et le design du site web ont été faits par \
			<a href='http://twinoid.com/user/2992052'>Gnux</a>.").appendTo(td);

			// Coming soon
			$("<h2>").css({
				color: "#EEE",
				margin: "10px 15px 0"
			}).html("Fonctionnalités à venir&nbsp;:").appendTo(td);
			var ul = $("<ul>").css({
				margin: "0 20px 0 30px",
				color: "#CCC",
				"list-style-type": "square"
			}).appendTo(td);
			$("<li>").html("Enregistrement (manuel) des informations sur les joueurs").appendTo(ul);
			$("<li>").html("Amélioration du Manager").appendTo(ul);
			$("<li>").html("Amélioration de la gestion des plantes").appendTo(ul);
			$("<li>").html("Gestion des médicaments et de la nourriture").appendTo(ul);
			$("<li>").html("Gestion des animations distributeur").appendTo(ul);
			$("<li>").html("Informations sur le démontage d'objets").appendTo(ul);
			$("<li>").html("Assistant Admin. Neron + messages pré-enregistrés").appendTo(ul);
			$("<li>").html("Whiteboard (surprise)").appendTo(ul);
			$("<li>").css("list-style-type", "none").html("<a href='" + Main.k.website + "'>Liste des mises à jour</a>").appendTo(ul);

			// Close
			var close = $("<div>").css({
				"text-align": "center",
				margin: "30px 0 0"
			}).appendTo(td);
			Main.k.MakeButton("<img src='/img/icons/ui/pageleft.png' /> Retour au jeu", null, Main.k.About.open).css("display", "inline-block").appendTo(close);
		}

		Main.k.folding.display([null,null, "#about_col"], "about");
	}


	// == Profile Manager  ========================================
	Main.k.Profiles = {};
	Main.k.Profiles.initialized = false;
	Main.k.Profiles.current = 0;
	Main.k.Profiles.open = function() {//TODO: MULTILANG
		if (Main.k.folding.displayed == "profiles") {
			Main.k.folding.displayGame();
			return;
		}

		if (!Main.k.Profiles.initialized) {
			Main.k.Profiles.initialized = true;

			var td = $("<td>").addClass("chat_box").css({
				"padding-right": "6px",
				"padding-top": "1px",
				transform: "scale(0,1)",
				color: "rgb(9,10,97)"
			}).attr("id", "profile_col").appendTo($("table.inter tr").first());

			$("<p>").addClass("warning").html("Les profils de joueurs seront disponibles prochainement.").appendTo(td);
		}

		Main.k.folding.display([null,null, "#profile_col"], "profiles");
	}
	Main.k.Profiles.display = function(i) {
		Main.k.Profiles.current = i;
		if (Main.k.folding.displayed != "profiles") {
			Main.k.Profiles.open();
			return;
		}

		// Display hero
		// TODO
	}
	// == /Profile Manager  =======================================



	// == Message Manager  ========================================
	Main.k.Manager = {};
	Main.k.Manager.initialized = false;
	Main.k.Manager.heroes = [];
	Main.k.Manager.open = function(after) {
		if (Main.k.folding.displayed == "manager" || Main.k.folding.displayed == "manager_mini") {
			Main.k.folding.displayGame();
			return;
		}

		// TEMP CONFIG
		var hasmushchat = true;
		var haschat1 = true;
		var haschat2 = true;
		var haschat3 = true;

		if (!Main.k.Manager.initialized) {
			Main.k.Manager.initialized = true;

			// Topics
			// ----------------------------------------------------------
			var td_topics = $("<td>").addClass("chat_box").css({
				"padding-right": "6px",
				"padding-top": "1px",
				width: "330px",
				transform: "scale(0,1)"
			}).attr("id", "topics_col").appendTo($("table.inter tr").first());

			// Tabs
			var tabs = $("<ul>").addClass("tabschat customtabs").css({margin: 0, position: "relative"}).appendTo(td_topics);
			$("<img>").attr("src", "/img/icons/ui/tip.png").appendTo($("<li>").addClass("tab taboff").attr("id", "tabstats").appendTo(tabs));
			$("<img>").attr("src", "http://twinoid.com/img/icons/new.png").appendTo($("<li>").addClass("tab taboff").attr("id", "tabnew").appendTo(tabs));
			$("<img>").attr("src", "http://twinoid.com/img/icons/search.png").appendTo($("<li>").addClass("tab taboff").attr("id", "tabsearch").appendTo(tabs));
			$("<img>").attr("src", "/img/icons/ui/wall.png").appendTo($("<li>").addClass("tab taboff").attr("id", "tabwall").appendTo(tabs));
			$("<img>").attr("src", "/img/icons/ui/fav.png").appendTo($("<li>").addClass("tab tabon").attr("id", "tabfav").appendTo(tabs));

			// Tab content
			var r = $("<div>").addClass("right").css("margin-top", 0).appendTo(td_topics);
			var rbg = $("<div>").addClass("rightbg chattext").css({
				"resize": "none"
			}).appendTo(r);

			$("<div>").addClass("tabcontent").attr("id", "tabstats_content").appendTo(rbg);
			$("<div>").addClass("tabcontent wall").attr("id", "tabnew_content").appendTo(rbg);
			$("<div>").addClass("tabcontent wall").attr("id", "tabsearch_content").appendTo(rbg);
			if (hasmushchat) $("<div>").addClass("tabcontent").attr("id", "tabmush_content").appendTo(rbg);
			$("<div>").addClass("tabcontent wall").attr("id", "tabwall_content").appendTo(rbg);
			$("<div>").addClass("tabcontent wall").attr("id", "tabfav_content").appendTo(rbg);
			if (haschat1) $("<div>").addClass("tabcontent").attr("id", "tabchat1_content").appendTo(rbg);
			if (haschat2) $("<div>").addClass("tabcontent").attr("id", "tabchat2_content").appendTo(rbg);
			if (haschat3) $("<div>").addClass("tabcontent").attr("id", "tabchat3_content").appendTo(rbg);
			rbg.find(".tabcontent").css("display", "none");

			// Tooltips
			$("#tabstats").attr("_title", "Statistiques").attr("_desc", "Affiche les statistiques, et permet de gérer le nombre de messages chargés dans la page.");
			$("#tabnew").attr("_title", "Nouveaux Messages").attr("_desc", "Beaucoup de messages à lire ? Le manager permet de rattraper son retard plus facilement. En chargeant tous les messages dans l'onglet Statistiques, vous pouvez aussi voir les messages non lus manqués à cause du bug (Mush) des messages.");
			$("#tabsearch").attr("_title", "Recherche de Messages").attr("_desc", "Une discussion à retrouver ? Envie de savoir combien d'incendies se sont déclarés ? (@neron incendie daedalus)");
			$("#tabwall").attr("_title", "Discussion").attr("_desc", "Le canal de discussion est indispensable pour s'organiser avec l'équipage.</p><p>Pour participer vous devez posséder un <strong>talkie-walkie</strong>.");
			$("#tabfav").attr("_title", "Favoris").attr("_desc", "Votre sélection de sujets favoris.");
			tabs.find(".tab").on("mouseover", Main.k.CustomTip);
			tabs.find(".tab").on("mouseout", Main.hideTip);
			tabs.find(".tab").on("click", function() { Main.k.Manager.selectTab(this); });


			// Current topic
			// ----------------------------------------------------------
			var td_topic = $("<td>").addClass("chat_box").css({
				"padding-right": "6px",
				"padding-top": "1px",
				width: "330px",
				transform: "scale(0,1)"
			}).attr("id", "topic_col").appendTo($("table.inter tr").first());

			// Tabs
			var tabs = $("<ul>").addClass("tabschat customtabs").css({margin: 0, position: "relative"}).appendTo(td_topic);
			$("<img>").attr("src", "/img/icons/ui/wall.png").appendTo(
				$("<li>").addClass("tab tabon").attr("id", "tabtopic").attr("_title", "Discussion").attr("_desc", "Le canal de discussion est indispensable pour s'organiser avec l'équipage.").appendTo(tabs)
			);


			// List
			var r = $("<div>").addClass("right").css("margin-top", 0).appendTo(td_topic);
			var rbg = $("<div>").addClass("rightbg chattext").css({
				resize: "none"
			}).appendTo(r);

			var topic = $("<div>").attr("id", "tabtopic_content").addClass("tabcontent wall topicwall").css({
				resize: "none",
				"min-height": "427px"
			}).appendTo(rbg);
			$("<p>").addClass("warning").html("Aucun topic sélectionné.").appendTo(topic);

			if (hasmushchat) {
				var mushtab = $("<li>").addClass("tab taboff").attr("id", "tabmush").attr("_title", "Canal Mush").attr("_desc", "Ssshh, personne nous entend ici... Le Canal Mush est le <em>canal privé</em> pour les adhérents aux <strong>Mush</strong> <img src='/img/icons/ui/mush.png' />.</p><p><strong>/!\\ Fonctionnalité non codée</strong>").appendTo(tabs);
				$("<img>").attr("src", "/img/icons/ui/mush.png").appendTo(mushtab);
				var mushchat = $("<div>").attr("id", "tabmush_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
				$("<p>").addClass("warning").html("Disponible prochainement.").appendTo(mushchat);
			}
			if (haschat1) {
				var chat1tab = $("<li>").addClass("tab taboff").attr("id", "tabchat1").attr("_title", "Chat privé #1").attr("_desc", "Chat privé ouvert avec :<br/>[liste des participants]</p><p><strong>/!\\ Fonctionnalité non codée</strong>").appendTo(tabs);
				$("<img>").attr("src", "/img/icons/ui/private.png").appendTo(chat1tab);
				var chat1 = $("<div>").attr("id", "tabchat1_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
				$("<p>").addClass("warning").html("Disponible prochainement.").appendTo(chat1);
			}
			if (haschat2) {
				var chat2tab = $("<li>").addClass("tab taboff").attr("id", "tabchat2").attr("_title", "Chat privé #2").attr("_desc", "Chat privé ouvert avec :<br/>[liste des participants]</p><p><strong>/!\\ Fonctionnalité non codée</strong>").appendTo(tabs);
				$("<img>").attr("src", "/img/icons/ui/private.png").appendTo(chat2tab);
				var chat2 = $("<div>").attr("id", "tabchat2_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
				$("<p>").addClass("warning").html("Disponible prochainement.").appendTo(chat2);
			}
			if (haschat3) {
				var chat3tab = $("<li>").addClass("tab taboff").attr("id", "tabchat3").attr("_title", "Chat privé #3").attr("_desc", "Chat privé ouvert avec :<br/>[liste des participants]</p><p><strong>/!\\ Fonctionnalité non codée</strong>").appendTo(tabs);
				$("<img>").attr("src", "/img/icons/ui/private.png").appendTo(chat3tab);
				var chat3 = $("<div>").attr("id", "tabchat3_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
				$("<p>").addClass("warning").html("Disponible prochainement.").appendTo(chat3);
			}
			tabs.find(".tab").on("mouseover", Main.k.CustomTip);
			tabs.find(".tab").on("mouseout", Main.hideTip);
			tabs.find(".tab").on("click", function() { Main.k.Manager.selectTopicTab(this); });


			// Reply
			// ----------------------------------------------------------
			var td_reply = $("<td>").addClass("chat_box").css({
				transform: "scale(0,1)",
				"padding-top": "1px",
				"text-align": "right"
			}).attr("id", "reply_col").appendTo($("table.inter tr").first());

			// Tabs
			var tabs = $("<ul>").addClass("tabschat customtabs").css({
				margin: 0,
				"text-align": "left",
				position: "relative"
			}).appendTo(td_reply);
			var tabreply = $("<li>").addClass("tab tabon").attr("id", "tabreply").attr("_title", "Nouveau message").attr("_desc", "Répondez à un topic / une discussion ou créez un nouveau topic.").appendTo(tabs);
			var tabneron = $("<li>").addClass("tab taboff").attr("id", "tabneron").attr("_title", "Annonces vocodées").attr("_desc", "Assistant pour les Admin. Néron pour faciliter la création d'annonces vocodées.</p><p><strong>/!\\ Fonctionnalité non codée</strong>").appendTo(tabs);
			var tabcustom = $("<li>").addClass("tab taboff").attr("id", "tabcustom").attr("_title", "Messages pré-enregistrés").attr("_desc", "Messages récurrents & autres (à définir).</p><p><strong>/!\\ Fonctionnalité non codée</strong>").appendTo(tabs);
			$("<img>").attr("src", "http://twinoid.com/img/icons/edit.png").appendTo(tabreply);
			$("<img>").attr("src", "/img/icons/ui/neron.png").appendTo(tabneron);
			$("<img>").attr("src", "/img/icons/ui/book.png").appendTo(tabcustom);
			tabs.find(".tab").on("mouseover", Main.k.CustomTip);
			tabs.find(".tab").on("mouseout", Main.hideTip);
			tabs.find(".tab").on("click", function() { Main.k.Manager.selectReplyTab(this); });

			var r = $("<div>").addClass("right").css("margin-top", 0).appendTo(td_reply);
			var rbg = $("<div>").addClass("rightbg chattext").css({
				"resize": "none",
				"text-align": "center",
				"position": "relative"
			}).appendTo(r);
			var reply = $("<div>").attr("id", "tabreply_content").addClass("tabcontent wall").appendTo(rbg);
			var vocod = $("<div>").attr("id", "tabneron_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
			var custom = $("<div>").attr("id", "tabcustom_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
			$("<p>").addClass("warning").html("Disponible prochainement.").appendTo(vocod);
			$("<p>").addClass("warning").html("Disponible prochainement.").appendTo(custom);

			// Actions
			var mini = Main.k.MakeButton("<img src='/img/icons/ui/less.png' /> Réduire le Manager",null,function() {
				Main.k.Manager.minimize();
			}).attr("id", "manager_togglemini").appendTo(td_reply);
			mini.css({
				"margin": "3px 4px 0 auto",
				"display": "inline-block"
			});
			var close = Main.k.MakeButton("<img src='/img/icons/ui/pageleft.png' /> Fermer le Manager",null,function() {
				Main.k.Manager.open();
			}).appendTo(td_reply);
			close.css({
				"margin": "3px 4px 0 auto",
				"display": "inline-block"
			});
		}

		// Load data
		Main.k.Manager.update();
		Main.k.Manager.selectTab($("#tabstats"));

		$("#manager_togglemini a").html("<img src='/img/icons/ui/less.png' /> Réduire le Manager");
		Main.k.folding.display(["#topics_col", "#topic_col", "#reply_col"], "manager", after);
	}
	Main.k.Manager.replywaiting = "";
	Main.k.Manager.openOn = function(_target, val, k) {
		if (val && val.length > 0) Main.k.Manager.replywaiting = val;

		if (_target == "newtopic") {
			Main.k.Manager.open();
		} else if (_target == "reply") {
			Main.k.Manager.displayedTopic = k;
			var after = function() {
				var k = Main.k.Manager.displayedTopic;
				Main.k.Manager.selectTopic(k);
			}
			Main.k.Manager.open(after);
		}
	}
	Main.k.Manager.minimize = function() {
		if (Main.k.folding.displayed == "manager") {
			$("#manager_togglemini a").html("<img src='/img/icons/ui/more.png' /> Agrandir le Manager");
			Main.k.folding.display([Main.k.folding.gamecols[0], Main.k.folding.gamecols[1], "#reply_col"], "manager_mini");
		} else {
			$("#manager_togglemini a").html("<img src='/img/icons/ui/less.png' /> Réduire le Manager");
			Main.k.folding.display(["#topics_col", "#topic_col", "#reply_col"], "manager");
		}
	}
	Main.k.Manager.selectTab = function(el) {
		// Select tab
		$("#topics_col .tab").removeClass("tabon").addClass("taboff");
		$(el).removeClass("taboff").addClass("tabon");

		// Display content
		$("#topics_col .tabcontent").css("display", "none");
		$("#" + $(el).attr("id") + "_content").css("display", "block");
	}
	Main.k.Manager.selectTopicTab = function(el) {
		// Select tab
		$("#topic_col .tab").removeClass("tabon").addClass("taboff");
		$(el).removeClass("taboff").addClass("tabon");

		// Display content
		$("#topic_col .tabcontent").css("display", "none");
		$("#" + $(el).attr("id") + "_content").css("display", "block");
	}
	Main.k.Manager.selectReplyTab = function(el) {
		// Select tab
		$("#reply_col .tab").removeClass("tabon").addClass("taboff");
		$(el).removeClass("taboff").addClass("tabon");

		// Display content
		$("#reply_col .tabcontent").css("display", "none");
		$("#" + $(el).attr("id") + "_content").css("display", "block");
	}
	Main.k.Manager.topics = [];
	Main.k.Manager.replies = [];
	Main.k.Manager.lastago = "";
	Main.k.Manager.loadedtopics = [];
	Main.k.Manager.loadedreplies = [];
	Main.k.Manager.lmwProcessing = false;
	Main.k.Manager.loadWholeWall = function(k) {
		if (Main.k.Manager.lmwProcessing) return;
		Main.k.Manager.lmwProcessing = true;

		var w = Main.getChannel(Main.curChatIndex()).find("div.wall div.unit").last();
		var wp = w.closest(".wall");

		if (w.length > 0) {
			var datak = k ? k : w.attr("data-k");
			Tools.ping("/retrWallAfter/" + datak,function(content) {
				var jq1 = $(content);
				Main.k.Manager.lmwProcessing = false;
				if (jq1.find(".wall").html().trim().length > 0) {
					// Store messages
					Main.k.Manager.parseWall(jq1.find(".wall"));

					// Get data-k
					var datak = jq1.find(".wall .unit").last().attr("data-k");

					// Load moar
					Main.k.Manager.loadWholeWall(datak);
				} else {
					Main.k.Manager.update();
				}
			});
		} else {
			Main.k.Manager.lmwProcessing = false;
			Main.k.Manager.update();
		}
	}
	Main.k.Manager.parseWall = function(wall) {
		if (!wall.find) wall = $(wall);
		var topics = wall.find(".mainmessage");

		topics.each(function() {
			var tid = $(this).closest(".unit").attr("data-k");
			var editing = (Main.k.Manager.loadedtopics[tid]);

			// Create topic object
			var topic = editing ? Main.k.Manager.getTopicByTid(tid) : {};
			if (!editing) topic.mushid = tid;

			// Favorite ?
			if (!editing) topic.fav = $(this).closest(".cdWallChannel").attr("id") == "cdFavWall";

			// Neron or Hero ?
			var hero = "";
			if (!editing) {
				if ($(this).find(".mainsaid.neron_talks").length != 0) {
					hero = "neron";
					Main.k.Manager.heroes[hero].mess++;

					// AV
					if ($(this).find(".mainsaid.neron_talks p").length > 0) {
						Main.k.Manager.heroes[hero].av++;

						topic.msg = "";
						$(this).find("p, ul").each(function() {
							topic.msg += "<" + $(this).prop("tagName") + ">" + $(this).html() + "</" + $(this).prop("tagName") + ">";
						});
					} else {
						Main.k.Manager.heroes[hero].a++;

						var msg = $(this).find(".mainsaid.neron_talks").html();
						msg = msg.replace(/([\r\n]+)/g, "");
						topic.msg = /NERON\s:<\/span>(.+)<span\s*class="ago"/i.exec(msg)[1].trim();
					}
				} else {
					hero = Main.k.GetHeroNameFromTopic($(this));
					Main.k.Manager.heroes[hero].mess++;
					Main.k.Manager.heroes[hero].topic++;

					topic.msg = "";
					$(this).find("p, ul").each(function() {
						topic.msg += "<" + $(this).prop("tagName") + ">" + $(this).html() + "</" + $(this).prop("tagName") + ">";
					});
				}

				topic.author = hero;
				topic.id = Main.k.Manager.topics.length;
			}

			topic.ago = $(this).find(".ago").html().trim();
			topic_ago = topic.ago;
			topic.read = !$(this).hasClass("not_read");
			topic.realread = !$(this).hasClass("not_read");
			if (!topic.realread && !Main.k.hasTalkie) return;

			Main.k.Manager.loadedtopics[tid] = true;
			if (!editing) topic.replies = [];
			if (!editing) Main.k.Manager.topics.push(topic);

			// Add messages
			$(this).parent().find(".cdRepl").each(function() {
				var tid = $(this).closest(".unit").attr("data-k");
				var topic = Main.k.Manager.getTopicByTid(tid);

				var idx = $(this).attr("data-idx");
				var rid = topic.mushid + "." + idx;

				var editing = (Main.k.Manager.loadedreplies[rid] == true);

				// Create message object
				var reply = editing ? topic.replies[idx] : {};
				if (!reply) reply = {};

				// Neron or Hero ?
				var hero = "";
				if (!editing) {
					if ($(this).find(".neron").length != 0) {
						hero = "neron";
						Main.k.Manager.heroes[hero].mess++;
						Main.k.Manager.heroes[hero].av++;
					} else {
						hero = Main.k.GetHeroNameFromTopic($(this));
						Main.k.Manager.heroes[hero].mess++;
					}

					reply.author = hero;
					reply.msg = "";
					$(this).find("p, ul").each(function() {
						reply.msg += "<" + $(this).prop("tagName") + ">" + $(this).html() + "</" + $(this).prop("tagName") + ">";
					});
					reply.tid = topic.id;
					reply.id = idx;
				}

				reply.ago = $(this).find(".ago").html().trim();
				topic_ago = Main.k.minAgo(reply.ago, topic_ago);
				reply.read = !$(this).hasClass("not_read");
				if (topic.read && !reply.read) topic.read = false;
				if (!reply.read && !Main.k.hasTalkie) return;
				Main.k.Manager.loadedreplies[rid] = true;

				// Save message
				if (!editing) {
					topic.replies.push(reply);
					Main.k.Manager.replies.push(reply);
				}
			});

			Main.k.Manager.lastago = Main.k.maxAgo(topic_ago, Main.k.Manager.lastago);
		});
	}
	Main.k.Manager.parseTopic = function(topic, highlight) {
		var topicDOM = $("<div>").addClass("reply bubble unit");
		if (Main.k.Options.cbubbles) topicDOM.addClass("bubble_" + topic.author);
		if (Main.k.Options.cbubblesNB) topicDOM.addClass("custombubbles_nobackground");
		var isneron = (topic.author == "neron");

		// Author
		var authdiv = $("<div>").addClass(isneron ? topic.author : "char " + topic.author).appendTo(topicDOM);
		if (topic.author == "neron") authdiv.html('<img src="/img/icons/ui/neron.png">');

		// Buddy
		$("<span>").addClass("buddy").html(isneron ? " NERON : " : " " + Main.k.COMPLETE_SURNAME(topic.author) + " : ").appendTo(topicDOM);

		// Content
		var msg = topic.msg;
		if (highlight) {
			for (var i=0; i<highlight.length; i++) {
				var reg = new RegExp(highlight[i], "gi");
				msg = msg.replace(reg, "<span class='highlight'>" + highlight[i] + "</span>");
			}
		}
		$("<div>").css("display", "inline").html(msg).appendTo(topicDOM);

		// Ago
		$("<span>").addClass("ago").html(topic.ago).appendTo(topicDOM);

		return topicDOM;
	}
	Main.k.Manager.displayedTopic = null;
	Main.k.Manager.displayTopic = function(ti, lwords) {
		var displaymore = true; // TEMP

		// Clear currtopic
		var currtopic = $("#tabtopic_content").empty();

		// Parse topic
		var topic = Main.k.Manager.topics[ti];
		var mainsaid = Main.k.Manager.parseTopic(topic, lwords);
		Main.k.Manager.displayedTopic = topic.mushid;
		mainsaid.attr("class", "bubble mainmessage mainsaid");
		if (topic.author == "neron") {
			mainsaid.find("img").remove();
			mainsaid.addClass("neron_talks");
		}
		mainsaid.css({
			"padding-bottom": "20px",
			"z-index": "10"
		}).appendTo(currtopic);
		if (Main.k.Options.cbubbles) {
			mainsaid.addClass("bubble_" + topic.author);
			if (Main.k.Options.cbubblesNB) mainsaid.addClass("custombubbles_nobackground");
		} else {
			mainsaid.css("background", "rgba(255,255,255,0.8)");
		}

		// Mark as read
		if (!topic.realread) {
			mainsaid.addClass("not_read");
			mainsaid.prepend($('<img>').addClass("recent").attr("src", "/img/icons/ui/recent.png"));
			mainsaid.attr("data-k", topic.mushid);
			mainsaid.on("mouseover", function() {
				ArrayEx.pushBack(Main.checkedWallPost,$(this).attr("data-k"));
				haxe.Timer.delay(Main.sendWallChecked,1000);

				$(this).find(".recent").remove();
				$(this).removeClass("not_read");
				this.onmouseover = undefined;
			});
		}

		// Display read messages
		// TODO: do not display if no read messages
		if (topic.replies.length > 10 && !displaymore) {
			$("<a>").addClass("displaymore").attr("href", "#").on("click", Main.k.Manager.displayAllReplies)
			.html("Afficher les " + topic.replies.length + " messages").appendTo(currtopic);
		}

		// Display replies
		var replytable = $("<table>").addClass("treereply").appendTo(currtopic);
		var tbody = $("<tbody>").appendTo(replytable);

		for (var i=0; i<topic.replies.length; i++) {
			var reply = topic.replies[i];

			var tr = $("<tr>").addClass("cdRepl").appendTo(tbody);
			if (topic.replies.length > 10 && reply.read && !displaymore) tr.addClass("messread");
			if (!reply.read) tr.addClass("not_read");

			var _class = "tree" + (i == (topic.replies.length -1) ? " treelast" : "");
			$("<td>").addClass(_class).appendTo(tr);
			var td2 = $("<td>").appendTo(tr);

			var replyDOM = Main.k.Manager.parseTopic(reply, lwords);
			replyDOM.removeClass("unit").appendTo(td2);
			replyDOM.prepend($('<div>').attr("class", "triangleup"));
			if (!reply.read) replyDOM.prepend($('<img>').addClass("recent").attr("src", "/img/icons/ui/recent.png"));

			// Mark as read
			if (true || !reply.read) {
				tr.attr("data-k", topic.mushid);
				tr.attr("data-idx", reply.id);
				tr.on("mouseover", function() {
					ArrayEx.pushBack(Main.checkedWallPost, $(this).attr("data-k") + "#" + $(this).attr("data-idx"));
					haxe.Timer.delay(Main.sendWallChecked,1000);

					$(this).find(".recent").remove();
					$(this).removeClass("not_read");
					$(this).off("mouseover");
				});
			}
		}
	}
	Main.k.Manager.displayAllReplies = function() {
		$("#tabtopic_content").find(".messread").each(function() {
			$(this).removeClass("messread");
		});
		$("#tabtopic_content").find(".displaymore").addClass("messread");
	}
	Main.k.Manager.getTopicByTid = function(tid) {
		for (var i=0; i<Main.k.Manager.topics.length; i++) {
			var t = Main.k.Manager.topics[i];
			if (t.mushid == tid) return t;
		}
		return false;
	}
	Main.k.Manager.clearSess = function() {
		// Clear sid cookie
		js.Cookie.set("sid", "", -42, "/", "."+Main.k.domain+"");

		// Reload session
		$('<iframe>', {
			src: Main.k.mushurl+'/me',
			id: 'sessionframe',
			scrolling: 'no'
		}).css({
			width: 0,
			height: 0,
			display: "none",
			position: "absolute"
		}).appendTo('body').load(function() {
			// Get new flash
			var el = $('#cdContent', $('#sessionframe').contents()).clone();
			el.find("embed").remove();

			// Replace flash
			$("#cdContent").replaceWith(el);
			eval($("#cdContent").find("script").html());

			// Delete iframe
			$("#sessionframe").remove();

			// Update new flash
			Main.refreshChat();
			Main.acListMaintainer.refresh(true);

			// Fix page title
			$(document).attr("title", "Mush - Jeu de survie dans l'espace : Vous êtes le seul espoir de l'humanité !");

			// Update manager
			Main.k.Manager.topics = [];
			Main.k.Manager.replies = [];
			Main.k.Manager.lastago = "";
			Main.k.Manager.loadedtopics = [];
			Main.k.Manager.loadedreplies = [];
			Main.k.Manager.update();
		});
	}
	Main.k.Manager.updateHeroes = function() {
		Main.k.Manager.initHeroes();

		for (var i=0; i<Main.k.Manager.topics.length; i++) {
			var topic = Main.k.Manager.topics[i];
			Main.k.Manager.heroes[topic.author].topic++;
			Main.k.Manager.heroes[topic.author].mess++;

			for (var j=0; j<topic.replies.length; j++) {
				var reply = topic.replies[j];
				Main.k.Manager.heroes[reply.author].mess++;
			}
		}
	}
	Main.k.Manager.sortedheroes = [];
	Main.k.Manager.sortHeroes = function() {
		// Init
		Main.k.Manager.sortedheroes = [];
		for (h in Main.k.Manager.heroes) {
			var hero = Main.k.Manager.heroes[h];
			if (!hero || hero.mess == undefined) continue;

			Main.k.Manager.sortedheroes.push(h);
		}

		// Sort
		Main.k.Manager.sortedheroes.sort(function(b,a) {
			a = Main.k.Manager.heroes[a];
			b = Main.k.Manager.heroes[b];

			var a1 = a.mess, b1 = b.mess;
			if (a1 == b1) {
				var a2 = a.topic, b2 = b.topic;
				if (a2 == b2) {
					var a3 = a.name, b3 = b.name;
					return a3 > b3 ? 1 : -1;
				}
				return a2 > b2 ? 1 : -1;
			}
			return a1 > b1 ? 1 : -1;
		});
	}
	Main.k.Manager.loadingMessages = function() {
		$("#recap_div").empty();
		$("<p>").addClass("warning").html("Chargement en cours...").appendTo($("#recap_div"));
	}
	Main.k.Manager.fillStats = function() {
		var tab = $("#tabstats_content").empty();
		tab.css({
			color: "rgb(9, 10, 97)"
		});

		var warn = $("<div>").addClass("warning").html("Gérez le nombre de messages chargés.\
		Le manager est plus complet lorsque tous les messages sont chargés, \
		mais le jeu devient beaucoup plus lent à cause du chargement de ces messages à chaque action (particularité de mush...).")
		.css("background-position", "7px 15px")
		.appendTo(tab);

		// Actions
		var actions = $("<div>").css({
			"text-align": "center",
			"margin-top": "8px"
		}).appendTo(warn);

		// Action : load all
		Main.k.MakeButton("<img src='/img/icons/ui/wall.png' class='alerted' /><img src='/img/icons/ui/onceplus.png' class='alert' /> Tout charger",null,function() {
			Main.k.Manager.loadingMessages();
			Main.k.Manager.loadWholeWall();
		})
		.appendTo(actions)
		.find("a")
		.attr("_title", "Charger tous les messages").attr("_desc", "Chargez tous les messages pour profiter pleinement du manager : recherches dans tous les messages depuis le début de la partie, nouveaux messages manqués à cause du bug de mush, statistiques complètes, etc.</p><p><strong>Cette action peut prendre un certain temps, suivant le nombre de messages postés sur votre vaisseau.</strong>")
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip);

		// Action : unload
		Main.k.MakeButton("<img src='/img/icons/ui/wall.png' class='alerted' /><img src='/img/icons/ui/bin.png' class='alert' /> Décharger",null,function() {
			Main.k.Manager.loadingMessages();
			Main.k.Manager.clearSess();
		})
		.appendTo(actions)
		.find("a")
		.attr("_title", "Décharger les messages").attr("_desc", "Déchargez la liste de messages pour alléger le jeu. Lorsque vous chargez des messages (en scrollant sur le chat, par exemple), ceux-ci restent chargés. Mush chargeant toute la page (dont les messages) à chaque action, votre jeu est grandement ralenti lorsque le nombre de messages chargés est conséquent.</p><p><strong>Cette action bloque le jeu pendant quelques secondes.</strong>")
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip);

		// Fix actions
		actions.find(".but").css({
			display: "inline-block",
			margin: "0 2px"
		});

		// Print recap
		var recap = $("<div>").attr("id", "recap_div").addClass("recap").appendTo(tab);
		Main.k.Manager.updateHeroes();
		Main.k.Manager.sortHeroes();

		var topic_nb = Main.k.Manager.topics.length;
		var answer_nb = Main.k.Manager.replies.length;
		var total_msg = topic_nb + answer_nb;
		var recap_p = $("<p>").html("Total : <b>" + total_msg + "</b> message" + (total_msg != 1 ? "s" : "") +
			" chargés en <b>" + topic_nb + "</b> topic" + (topic_nb != 1 ? "s" : "") + ". <br/> (depuis " + Main.k.extendAgo(Main.k.Manager.lastago) + ")").appendTo(recap);

		// Hero count
		var popup_recap_char = $("<div>").addClass("chars").appendTo(recap);
		var popup_msg = "//Total : " + total_msg + " messages//";
		var max_highlighted = 6;
		for (var i=0; i<Main.k.Manager.sortedheroes.length; i++) {
			var hero = Main.k.Manager.heroes[Main.k.Manager.sortedheroes[i]];
			if (!hero || hero.mess == undefined) continue;
			if (i == max_highlighted) $("<br/>").appendTo(popup_recap_char);

			var heroDiv = $("<div>").addClass("hero _" + hero.name).attr("_title", Main.k.COMPLETE_SURNAME(hero.name)).css("cursor", "help").appendTo(popup_recap_char);
			if (i < max_highlighted) heroDiv.addClass("highlight");
			if (hero.name == "neron") {
				heroDiv.attr("_desc", "<b>" + hero.mess + "</b> messages"); // dont <b>" + hero.a + "</b> annonces officielles et <b>" + hero.av + "</b> annonces vocodées.");
			} else {
				heroDiv.attr("_desc", "<b>" + hero.mess + "</b> messages dont <b>" + hero.topic + "</b> topics.");
			}
			heroDiv.on("mouseover", Main.k.CustomTip);
			heroDiv.on("mouseout", Main.hideTip);
			heroDiv.on("click", Main.k.Manager.searchHero);

			$("<img>").attr("src", "/img/icons/ui/" + hero.name.replace("_", "") + ".png").appendTo(heroDiv);
			var msg = (i < max_highlighted) ? hero.mess + "&nbsp;messages" : hero.mess;
			$("<span>").html(msg).appendTo(heroDiv);

			popup_msg += "\n**" + Main.k.COMPLETE_SURNAME(hero.name) + " : ** //" + hero.mess + "// messages";
		}

		// Code for sharing msg count
		$("<textarea>").val(popup_msg).appendTo(recap);
	}
	Main.k.Manager.fillNewFav = function() {
		var active_topics = $("#tabnew_content").empty().css("color", "rgb(9, 10, 97)");
		var favtopics = $("#tabfav_content").empty().css("color", "rgb(9, 10, 97)");

		var allread = true;
		var favorites = [];
		for (var i=0; i<this.topics.length; i++) {
			var topic = this.topics[i];

			if (topic.fav) favorites.push(topic);
			if (!topic.read) {
				allread = false;
				var topicDOM = this.parseTopic(topic);
				if (topic.author == "neron") {
					topicDOM.find("img").remove();
					topicDOM.addClass("mainmessage neron_talks");
				}
				active_topics.append(topicDOM);


				// Unread replies
				var unread = 0;
				if (!topic.realread) unread++;
				for (var j=0; j<topic.replies.length; j++) {
					var m = topic.replies[j];
					if (!m.read) unread++;
				}

				// Actions
				var actions = $("<a>").addClass("topicact").attr("href", "#topic" + i)
				.on("click", function() { Main.k.Manager.displayTopic(parseInt(/([0-9]+)/.exec(this.href)[1])); return false; })
				.html(topic.replies.length + " réponse" + (topic.replies.length == 1 ? "" : "s") + " - " + unread + " message" + (unread == 1 ? "" : "s") + " non lu" + (unread == 1 ? "" : "s"))
				.appendTo(active_topics);
			}
		}
		if (allread) $("<p>").addClass("warning").html("Aucun message non lu.").appendTo(active_topics);

		if (favorites.length == 0) $("<p>").addClass("warning").html("Vous n'avez pas de favoris.").appendTo(active_topics);
		for (var i=0; i<favorites.length; i++) {
			var topic = favorites[i];

			var topicDOM = this.parseTopic(topic);
			if (topic.author == "neron") {
				topicDOM.find("img").remove();
				topicDOM.addClass("mainmessage neron_talks");
			}
			favtopics.append(topicDOM);

			// Actions
			var actions = $("<a>").addClass("topicact").attr("href", "#topic" + topic.id)
			.on("click", function() { Main.k.Manager.displayTopic(parseInt(/([0-9]+)/.exec(this.href)[1])); return false; })
			.html(topic.replies.length + " réponse" + (topic.replies.length == 1 ? "" : "s"))
			.appendTo(favtopics);
		}
	}
	Main.k.Manager.fillWall = function() {
		var wall = $("#tabwall_content").empty().css("color", "rgb(9, 10, 97)");
		for (var i=0; i<this.topics.length; i++) {
			var topic = this.topics[i];

			var topicDOM = this.parseTopic(topic);
			if (topic.author == "neron") {
				topicDOM.find("img").remove();
				topicDOM.addClass("mainmessage neron_talks");
			}
			wall.append(topicDOM);

			// Unread replies
			var unread = 0;
			if (!topic.realread) unread++;
			for (var j=0; j<topic.replies.length; j++) {
				var m = topic.replies[j];
				if (!m.read) unread++;
			}

			// Actions
			var actions = $("<a>").addClass("topicact").attr("href", "#topic" + i)
			.on("click", function() { Main.k.Manager.displayTopic(parseInt(/([0-9]+)/.exec(this.href)[1])); return false; })
			.html(topic.replies.length + " réponse" + (topic.replies.length == 1 ? "" : "s"))
			.appendTo(wall);
		}
	}
	Main.k.Manager.fillSearch = function() {
		var search = $("#tabsearch_content").empty().css("color", "rgb(9, 10, 97)");

		// Search tools
		var searchbar = $("<div>").addClass("bar").appendTo(search);
		$("<input>").css("padding-bottom", "2px").attr("type", "text").attr("id", "searchfield").on("keypress", function(event) {
			if(event.keyCode == 13) Main.k.Manager.search();
		}).appendTo(searchbar);

		$("<a>").css({
			cursor: "pointer",
			position: "absolute",
			top: "4px",
			left: "4px"
		}).addClass("butmini")
		.html('<img src="/img/icons/ui/guide.png"></img>')
		.appendTo(searchbar)
		.on("click", Main.k.Manager.fillSearch);

		$("<a>").css("cursor", "pointer").addClass("butmini")
		.html('<img src="http://twinoid.com/img/icons/search.png"></img>')
		.appendTo(searchbar)
		.on("click", Main.k.Manager.search);

		var results = $("<div>").attr("id", "searchresults").appendTo(search);
		$("<h4>").html("Fonction de recherche").appendTo(results);
		$("<p>").addClass("help").html("- Vous pouvez rechercher plusieurs mots, dans le désordre, complets ou non, qu'importe le contenu entre eux dans le message.").appendTo(results);
		$("<p>").addClass("help").html("- Pour rechercher les messages d'un joueur en particulier, utilisez <i>@personnage</i> (le prénom en minuscule, avec un _ pour kuan_ti et jin_su).").appendTo(results);
		$("<p>").addClass("help").html("- Pour rechercher uniquement dans le premier message des topics, utilisez <i>@topic</i>.").appendTo(results);
	}
	Main.k.Manager.search = function() {
		var val = $("#searchfield").val().trim();
		var results = [];
		var max_results = 500;
		var topiconly = false;

		// Clear results
		$("#searchresults").empty();

		// Get searched words
		var tmp = val.split(/\s+/);
		var lwords = [];
		var iwords = [];
		var authors = [];
		for (var i=0; i<tmp.length; i++) {
			// Topics only?
			if (tmp[i] == "@topic") {
				topiconly = true;
				continue;
			}

			// Search by author
			if (tmp[i][0] == "@") {
				var author = tmp[i].replace("@", "");
				authors.push(author);
				continue;
			}

			// Ignored keyword
			if (tmp[i][0] == "!") {
				var word = tmp[i].replace(/([^a-z0-9-éèêëàâœôöîïüûùç'%_]+)/gi, "");
				if (word.length > 2) iwords.push(word);
				continue;
			}

			// Keyword
			var word = tmp[i].replace(/([^a-z0-9-éèêëàâœôöîïüûùç'%_]+)/gi, "");
			if (word.length > 2) lwords.push(word);
		}

		// Delete doubles
		lwords = Main.k.EliminateDuplicates(lwords);
		iwords = Main.k.EliminateDuplicates(iwords);
		authors = Main.k.EliminateDuplicates(authors);

		// Search
		if (authors.length >= 1 || lwords.length >= 1 || iwords.length >= 1) {
			var words = "(" + lwords.join("|") + ")";
			var nwords = lwords.length;
			var matched_topics = 0;

			for (var i=0; i<Main.k.Manager.topics.length && matched_topics < max_results; i++) {
				var topic = Main.k.Manager.topics[i];
				var matched = false;
				var autmatched = false;
				var imatched = false;

				// Search by author
				if (authors.length > 0) {
					for (var k=0; k<authors.length; k++) {
						if (topic.author == authors[k]) {
							autmatched = true;

							if (nwords == 0) matched = true;
						}
					}
				}

				// Ignored keywords
				if (iwords.length > 0) {
					var ireg = new RegExp( "(" + iwords.join("|") + ")", "gi");
					if (topic.msg.match(ireg)) {
						matched = false;
						imatched = true;
					}
				}

				// Search by keywords
				if (!imatched && lwords.length > 0 && (authors.length == 0 || autmatched)) {
					var reg = new RegExp(words, "gi");
					var res = topic.msg.match(reg);
					if (res && res.length >= nwords) {
						var res1 = Main.k.EliminateDuplicates(res);
						if (res.length == res1.length) matched = true;
					}
				}

				// Search in replies
				for (var j=0; j<topic.replies.length && !matched && !topiconly; j++) {
					var m = topic.replies[j];
					autmatched = false;
					imatched = false;

					// Search by author
					if (authors.length > 0) {
						for (var l=0; l<authors.length; l++) {
							if (m.author == authors[l]) {
								autmatched = true;

								if (nwords == 0) matched = true;
							}
						}
					}

					// Ignored keywords
					if (iwords.length > 0) {
						var reg = new RegExp( "(" + iwords.join("|") + ")", "gi");
						if (m.msg.match(reg)) {
							matched = false;
							imatched = true;
						}
					}

					// Search by keywords
					if (!imatched && lwords.length > 0 && (authors.length == 0 || autmatched)) {
						var reg = new RegExp(words, "gi");
						var res = m.msg.match(reg);
						if (res && res.length >= nwords) {
							var res1 = Main.k.EliminateDuplicates(res);
							if (res.length == res1.length) matched = true;
						}
					}
				}

				if (matched) {
					matched_topics++;
					results.push(topic);
				}
			}
		}

		// Display results
		if (results.length > 0) {
			// Récap'
			$("<p>").addClass("warning").html(results.length + " résultat" + (results.length == 1 ? "" : "s") + " (maximum : " + max_results + ").")
			.appendTo($("#searchresults"));

			// Display topics
			for (var i=0; i<results.length; i++) {
				var topic = results[i];

				var topicDOM = Main.k.Manager.parseTopic(topic, lwords);
				$("#searchresults").append(topicDOM);

				// Actions
				$("<a>").addClass("topicact").attr("href", "#topic" + topic.id)
				.on("click", function() { Main.k.Manager.displayTopic(parseInt(/([0-9]+)/.exec(this.href)[1]), lwords); return false; })
				.html(topic.replies.length + " réponse" + (topic.replies.length == 1 ? "" : "s")).appendTo($("#searchresults"));
			}

		} else if (authors.length >= 1 || lwords.length >= 1 || iwords.length >= 1) {
			$("<p>").addClass("warning").html("Aucun résultat.").appendTo($("#searchresults"));
		} else {
			$("<p>").addClass("warning").html("Le texte recherché est trop court.").appendTo($("#searchresults"));
		}
	}
	Main.k.Manager.searchHero = function(event) {
		var tgt = $(event.target);
		if (!tgt.attr("class")) tgt = tgt.parent();
		var hero = tgt.attr("class").replace("hero _" , "").replace("highlight", "");

		Main.k.Manager.selectTab($("#tabsearch"));
		$("#searchfield").val("@" + hero);
		Main.k.Manager.search();
	}
	Main.k.Manager.replyloaded = false;
	Main.k.Manager.fillReply = function() {
		if (Main.k.Manager.replyloaded) {
			// Update message content
			if (Main.k.Manager.replywaiting != "") {
				$("#tid_wallPost").val(Main.k.Manager.replywaiting);
				Main.k.Manager.replywaiting = "";
			}
		} else {
			var newpost = $("#tabreply_content").empty();
			newpost.html("<div class='loading'><img src='http://twinoid.com/img/loading.gif' alt='Chargement' /> Chargement…</div>");
			Main.k.LoadJS('/mod/wall/post', {_id: "tabreply_content"}, function() {
				Main.k.Manager.replyloaded = true;

				// Remove inactive tags
				$("#tabreply_content").find(".tid_advanced").remove();
				$("#tabreply_content").find(".tid_button").remove();
				$("#tabreply_content").find(".tid_options").remove();
				$("#tabreply_content").find(".tid_editorBut_question").remove();
				$("#tabreply_content").find(".tid_editorBut__user").remove();
				// TODO: remove inactive tags in main chat

				var preview = $("#tid_wallPost_preview").attr("id", "").addClass("reply bubble");
				if (Main.k.Options.cbubbles) preview.addClass("bubble_" + Main.k.ownHero);
				if (Main.k.Options.cbubblesNB) preview.addClass("custombubbles_nobackground");

				var bubble = Main.k.ownHero.replace(/(\s)/g, "_").toLowerCase();
				$("<div>").addClass("char " + bubble).appendTo(preview);
				$("<span>").addClass("buddy").html(Main.k.ownHero.capitalize() + " : ").appendTo(preview);
				$("<p>").addClass("tid_preview tid_editorContent").attr("id", "tid_wallPost_preview").appendTo(preview);
				$("<div>").addClass("clear").appendTo(preview);

				// Actions
				var buttons = $("<div>").addClass("tid_buttons").appendTo($("#tabreply_content"));
				var answer = Main.k.MakeButton("<img src='http://twinoid.com/img/icons/reply.png' /> Répondre au topic",null,function() {
					var val = $("#tid_wallPost").val();
					var k = Main.k.Manager.displayedTopic;
					Main.k.postMessage(k, val, Main.k.Manager.update);
					$("#tid_wallPost").val("");

					Main.k.Manager.waitingforupdate = true;
					setTimeout(function() {
						if (Main.k.Manager.waitingforupdate) Main.k.Manager.update();
					}, 5000);
				})
				.css({display: "inline-block", margin: "4px 4px 8px"})
				.appendTo(buttons)
				.find("a")
				.attr("_title", "Répondre").attr("_desc", "Envoyer ce message en tant que réponse au topic affiché ci-contre.")
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);

				var newtopic = Main.k.MakeButton("<img src='http://twinoid.com/img/icons/reply.png' /> Nouveau topic",null,function() {
					var val = $("#tid_wallPost").val();
					Main.k.newTopic(val, Main.k.Manager.update);
					$("#tid_wallPost").val("");
				})
				.css({display: "inline-block", margin: "4px 4px 8px"})
				.appendTo(buttons)
				.find("a")
				.attr("_title", "Nouveau topic").attr("_desc", "Poster ce message en tant que nouveau topic.")
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);

				// Modify preview
				js.Lib.window["editor_tid_wallPost"].preview = $("#tid_wallPost_preview");

				// Remove inactive icons
				js.Lib.window["editor_tid_wallPost"].loadSmileys = function(q) {
					var _g = this;
					this.initIcons();
					if(this.smileysPanel.find(".tid_active").removeClass("tid_active")["is"](q)) return this.hideSmileys(true);
					this.hideSmileys(false);
					var cid = q.attr("tid_cat");
					var cat = null;
					if(cid != "_funtag") {
						var $it0 = this.config.icons.iterator();
						while( $it0.hasNext() ) {
							var c = $it0.next();
							if(c.category == cid) {
								cat = c;
								break;
							}
						}
						if(cat == null) return false;
					}
					var s = new StringBuf();
					s.b += "<div class=\"tid_smileyPopUp\">";
					if(cid == "_funtag") {
						s.b += Std.string("<div class=\"tid_title\">" + this.config.funTitle + "</div>");
						var keys = new Array();
						var $it1 = this.config.fun.keys();
						while( $it1.hasNext() ) {
							var k = $it1.next();
							keys.push(k);
						}
						keys.sort(function(a,b) {
							return Reflect.compare(a,b);
						});
						var _g1 = 0;
						while(_g1 < keys.length) {
							var k = keys[_g1];
							++_g1;
							s.b += Std.string("<a class=\"tid_fun\" href=\"#\" tid_s=\"" + StringTools.htmlEscape("{" + k + "}") + "\"><img src=\"http://" + _tid.host + "/img/icons/" + this.config.fun.get(k).i + ".png\" alt=\"" + k + "\" title=\"" + StringTools.htmlEscape(this.config.fun.get(k).n) + "\"/>" + StringTools.htmlEscape(this.config.fun.get(k).n) + "</a>");
						}
					} else {
						s.b += Std.string("<div class=\"tid_title\">" + cat.category + "</div>");
						s.b += "<div class=\"tid_wrapper\">";
						var $it2 = cat.icons.iterator();
						var a = true;
						while( $it2.hasNext() ) {
							var i = $it2.next();

							// Ignore incorrect icons
							if (cat.category == "Mush") {
								// Delete inactive icons
								if (i.image == "/ui/o2.png") continue;
								if (i.tag == ":mush_pa_gen:") continue;
								if (i.tag == ":mush_pa_mov:") continue;
								if (i.tag == ":mush_planet:") continue;

								// Modify incorrect icons
								if (i.tag == ":mush_pa:") {
									i.tag = ":pa:";
									i.image = "/img/icons/ui/pa_slot1.png";
								} else if (i.tag == ":mush_pm:") {
									i.tag = ":pm:";
									i.image = "/img/icons/ui/pa_slot2.png";
								} else if (i.tag == ":mush_exp:") {
									i.tag = ":xp:";
									i.image = "/img/icons/ui/xp.png";
								}
							}

							var str = i.tag;
							var desc = i.tag;
							if(i.alt != null) {
								str = i.alt;
								desc = i.alt + ", " + i.tag;
							}
							var mh = "";
							if(i.max != null) mh += "<span class=\"tid_max tid_max_" + i.tag.split(":").join("") + "\">" + i.max + "</span>";
							s.b += Std.string("<a class=\"tid_smiley\" href=\"#\">" + mh + "<img src=\"" + cat.url + i.image + "\" tid_s=\"" + StringTools.htmlEscape(str) + "\" title=\"" + StringTools.htmlEscape(desc) + "\"/></a>");
						}
						s.b += "</div>";
					}
					s.b += "<div class=\"tid_clear\"></div>";
					s.b += "</div>";
					q.addClass("tid_active");
					var pop = $(s.b);
					q.parent().append(pop);
					pop.hide().slideDown(200);
					if(cid == "_funtag") pop.find("a.tid_fun").click(function() {
						_g.insert($(this).attr("tid_s"));
						return false;
					}); else pop.find("a.tid_smiley").click(function() {
						var m = $(this).find(".tid_max");
						if(m.length > 0 && Std.parseInt(m.html()) == 0) return false;
						_g.insert($(this).find("img").attr("tid_s"));
						return false;
					});
					return false;
				}

				// Auto-load Mush icons
				//$("#editor_tid_wallPost").loadSmileys($("#editor_tid_wallPost a.tid_smcat[tid_cat='Mush']"));

				// Update message content
				if (Main.k.Manager.replywaiting != "") {
					$("#tid_wallPost").val(Main.k.Manager.replywaiting);
					Main.k.Manager.replywaiting = "";
				}
			});
		}
	}
	Main.k.Manager.initHeroes = function() {
		Main.k.Manager.heroes["neron"] = { name: "neron", mess: 0, av: 0, a: 0 };
		for (var i=0; i<Main.k.HEROES.length; i++) {
			Main.k.Manager.heroes[Main.k.HEROES[i]] = { name: Main.k.HEROES[i], mess: 0, topic: 0 };
		}
	}
	Main.k.Manager.waitingforupdate = false;
	Main.k.Manager.update = function() {
		Main.k.Manager.waitingforupdate = false;
		Main.k.Manager.initHeroes();
		Main.k.Manager.parseWall($(".cdWallChannel"));
		Main.k.Manager.fillStats();
		Main.k.Manager.fillNewFav();
		Main.k.Manager.fillWall();
		Main.k.Manager.fillSearch();
		Main.k.Manager.fillReply();

		// Update current displayed topic
		if (Main.k.Manager.displayedTopic) {
			Main.k.Manager.displayTopic(Main.k.Manager.getTopicByTid(Main.k.Manager.displayedTopic).id);
		}
	}
	Main.k.Manager.selectTopic = function(k) {
		var tid = Main.k.Manager.getTopicByTid(k).id;
		Main.k.Manager.displayTopic(tid);
	}
	// == /MessageManager =========================================




	Main.k.AliveHeroes = [];
	Main.k.MushInit = function() {
		Main.k.AliveHeroes = [];
		Main.k.MushInitHeroes();
		// Handle Mush Logo (option)
		if (Main.k.Options.dlogo) {
			$("#content").css({ position: "absolute", top: "120px", left: "125px" });
			$("#content .logo, #content .logo3").css({ top: "-100px" });
			$("body").css("background-position", "50% 20px");
            
            //position du distributeur
            $(".butdistr").parent().parent().append("<div class='butdistr2'><img src='/img/icons/ui/more.png'></div>");
            $(".butdistr").html("");
            $(".butdistr").removeClass("butdistr");
            
            $(".butdistr2").on("click", function(){
                if($(".butdistr2").hasClass("down")){
                    $(".bgmachine").animate({top : "-200px"});
                    $(".butdistr2").removeClass("down").html("<img src='/img/icons/ui/more.png'>");
                } else {
                    $(".bgmachine").animate({top : "-130px"});
                    $(".butdistr2").addClass("down").html("<img src='/img/icons/ui/less.png'>");
                }
            });
            
            $("<style>").attr("type", "text/css").html("\
                .bgmachine {\
                    top: -200px;\
                    left: 143px;\
                    background: #111317;\
					border-radius: 0px 0px 8px 8px;\
                }\
            ").appendTo("head");
		} else {
			$("#content").css({ position: "absolute", top: "40px", left: "125px" });
			$("#content .logo, #content .logo3").css({ display: "none" });
            
            //position du distributeur
            $(".distr").wrap("<div class='machinelink'></div>");
            $(".bgmachine").append("<div class='butdistr2'><img src='/img/icons/ui/more.png'></div>");
            $(".butdistr").html("");
            $(".butdistr").removeClass("butdistr");
            
            $(".butdistr2").on("click", function(){
                if($(".butdistr2").hasClass("down")){
                    $(".machinelink").animate({height : "0px"});
                    $(".butdistr2").removeClass("down").html("<img src='/img/icons/ui/more.png'>");
                } else {
                    $(".machinelink").animate({height : "81px"});
                    $(".butdistr2").addClass("down").html("<img src='/img/icons/ui/less.png'>");
                }
            });
            
            $("<style>").attr("type", "text/css").html("\
                .bgmachine {\
                    top: 100px;\
                    left: 0px;\
					background: none;\
                }\
				.machinelink{\
					height: 0px;\
					overflow: hidden;\
					background: #171B55;\
                }\
				.bgmachine a{\
					background: #171B55;\
                }\
				.bgmachine .butdistr2{\
					background: #171B55;\
                }\
				.bgmachine .butdistr2 img{\
					margin-top: 3px;\
                }\
            ").appendTo("head");
		}
		var vending = $(".butmini.distr").css("display", "none");
		if (vending.length > 0) {
			$("#vendingmenu").css("display", "inline");
		}

		// Add left bar
		// ----------------------------------- //
		var leftbar = $("<div>").addClass("usLeftbar").insertBefore($("#content"));
		Main.k.MakeButton("<img src='" + Main.k.servurl + "/img/ctrlw_sml.png' height='16' /> " +  Main.k.version, null, Main.k.About.open, Main.k.text.about.capitalize(), Main.k.text.aboutTip).css({
			display: "inline-block",
			margin: "0 auto 10px"
		}).appendTo($("<div>").css("text-align", "center").appendTo(leftbar));
		// ----------------------------------- //


		// Misc tools
		// ----------------------------------- //
		$("<h3>").addClass("first").html(Main.k.text.tools.capitalize()).appendTo(leftbar);

		// Update Manager
		Main.k.MakeButton("<img src='http://twinoid.com/img/icons/new.png' /> Mise à jour", null, null, "Mise à jour du script",
			"Une nouvelle version du script CTRL+W est disponible.")
		.appendTo(leftbar).attr("id", "updatebtn").css("display", "none").find("a").on("mousedown", Main.k.UpdateDialog);

		// Message Manager
		Main.k.MakeButton("<img src='http://twinoid.com/img/icons/archive.png' style='vertical-align: -20%' /> Msg Manager", null, null, "Message Manager",
			"Ne manquez plus de messages ! Tous les topics avec des messages non lus seront mis en évidence, et vous pourrez effectuer des recherches par auteur ou contenu.")
		.appendTo(leftbar).find("a").on("mousedown", Main.k.Manager.open);

		// Options Manager
		Main.k.MakeButton("<img src='/img/icons/ui/pa_eng.png' style='vertical-align: -20%' /> Options", null, null, "Gérer les options", "Certaines fonctionnalitées de Ctrl+W sont configurables. Cliquez ici pour spécifier vos préférences.")
		.appendTo(leftbar).find("a").on("mousedown", Main.k.Options.open);

		// Page reloader
		Main.k.MakeButton("<img src='http://twinoid.com/img/icons/refresh.png' style='vertical-align: -20%' /> Actualiser", null, null, "Actualiser",
			"Actualiser la page sans tout recharger. <strong>Fonctionnalité en cours d'optimisation.</strong>")
		.appendTo(leftbar).find("a").on("mousedown", function() {
			// TODO: loading screen -- Optimize

			Main.refreshChat();
			Main.acListMaintainer.refresh(true);
			Main.syncInvOffset(null,true);
			Main.doChatPacks();
			Main.topChat();
			Main.onChanDone(ChatType.Local[1],true)
		});
		// ----------------------------------- //

		// Exploration
		// ----------------------------------- //
		$("<div>").attr("id", "expblock").appendTo(leftbar);
		// ----------------------------------- //

		// Heroes' titles
		// ----------------------------------- //
		var t = $("<h3>").html(Main.k.text.titles.capitalize()).appendTo(leftbar);
		$("<span>").addClass("displaymore").attr("_target", "#titles_list").appendTo(t).on("click", Main.k.ToggleDisplay);
		$("<div>").addClass("titles_list").attr("id", "titles_list").css("display", "none").appendTo(leftbar);
		// ----------------------------------- //


		// Heroes
		// ----------------------------------- //
		var t = $("<h3>").html(Main.k.text.crew.capitalize()).appendTo(leftbar);
		$("<span>").addClass("displaymore").attr("_target", "#heroes_list").appendTo(t).on("click", Main.k.ToggleDisplay);
		$("<div>").attr("id", "heroes_list").css("display", "none").appendTo(leftbar);
		// ----------------------------------- //


		// Inventory
		// ----------------------------------- //
		var t = $("<h3>").html(Main.k.text.shelf.capitalize()).appendTo(leftbar);
		$("<span>").addClass("displaymore").attr("_target", ".kobject_list").appendTo(t).on("click", Main.k.ToggleDisplay);
		$("<div>").addClass("inventory kobject_list").css("display", "none").appendTo(leftbar);
		$("<div>").css({"clear": "both", "height": "5px"}).appendTo(leftbar);

		// Inventory actions
		Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> Partager", null, null, "Partager l'inventaire",
			Main.k.text.shareInventory
		).appendTo(leftbar)
		.find("a").on("mousedown", function(e) {
			Main.k.SyncAstropad(e);
			$('textarea:focus').each(function(e) {
				var txt = Main.k.FormatInventory();
				$(this).insertAtCaret(txt);
			});
			return false;
		});
		Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> Consommables", null, null, "Partager les effets des consommables",
			"Insère la liste des consommables avec leurs effets dans la zone de texte active, de la forme&nbsp;:</p><p>" +
			"TODO: aperçu")
		.attr("id", "pharmashare").css("display", "none").appendTo(leftbar)
		.find("a").on("mousedown", function(e) {
			$('textarea:focus').each(function(e) {
				var txt = Main.k.FormatPharma();
				$(this).insertAtCaret(txt);
			});
			return false;
		});
		//Main.k.MakeButton("<img src='/img/icons/ui/notes.gif' /> Daedalus", null, null, "Inventaire complet",
		//	"Affiche l'inventaire complet du Daedalus, pièce par pièce.</p><p><strong>/!\\ Fonctionnalité non codée</strong>").appendTo(leftbar);
		// ----------------------------------- //

		// Fix "o²"
		$(".spaceshipstatus li").first().attr("onmouseover", $(".spaceshipstatus li").first().attr("onmouseover").replace(/\(o²\)\s+/g, ""));

		// Lab - Nexus - Pilgred - Plants - Planets
		// ----------------------------------- //
		$("<div>").attr("id", "project_list").appendTo(leftbar);
		// ----------------------------------- //
	}
	Main.k.MushAfterInit = function() {
		// Display title list
		var maxshown = 4;
		var titles_list = $("#titles_list");

		// Commanders
		var commanders = $("<div>").appendTo(titles_list);
		$("<img>").addClass("icon").attr("src", "/img/icons/ui/title_01.png")
		.attr("_title", Main.k.text.TITLES.commander[0])
		.attr("_desc", Main.k.text.TITLES.commander[1])
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip)
		.appendTo(commanders);
		var commander_nb = 0;
		for (var i=0; commander_nb<maxshown && i<Main.k.HEROES.length; i++) {
			var hero = Main.k.COMMANDERS[i];
			if (Main.k.ArrayContains(Main.k.AliveHeroes, hero)) {
				commander_nb++;
				$("<img>").addClass("body " + hero).attr("src", "/img/design/pixel.gif").css("cursor", "pointer").appendTo(commanders);
			}
		}

		// Admins
		var admins = $("<div>").appendTo(titles_list);
		$("<img>").addClass("icon").attr("src", "/img/icons/ui/title_02.png")
		.attr("_title", Main.k.text.TITLES.admin[0])
		.attr("_desc", Main.k.text.TITLES.admin[1])
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip)
		.appendTo(admins);
		var admin_nb = 0;
		for (var i=0; admin_nb<maxshown && i<Main.k.HEROES.length; i++) {
			var hero = Main.k.ADMINS[i];
			if (Main.k.ArrayContains(Main.k.AliveHeroes, hero)) {
				admin_nb++;
				$("<img>").addClass("body " + hero).attr("src", "/img/design/pixel.gif").css("cursor", "pointer").appendTo(admins);
			}
		}

		// Comms manager
		var comms = $("<div>").appendTo(titles_list);
		$("<img>").addClass("icon").attr("src", "/img/icons/ui/title_03.png")
		.attr("_title", Main.k.text.TITLES.comms[0])
		.attr("_desc", Main.k.text.TITLES.comms[1])
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip)
		.appendTo(comms);
		var comms_nb = 0;
		for (var i=0; comms_nb<maxshown && i<Main.k.HEROES.length; i++) {
			var hero = Main.k.COMMS[i];
			if (Main.k.ArrayContains(Main.k.AliveHeroes, hero)) {
				comms_nb++;
				$("<img>").addClass("body " + hero).attr("src", "/img/design/pixel.gif").css("cursor", "pointer").appendTo(comms);
			}
		}
		// ----------------------------------- //


		// Fix dimensions
		Main.k.Resize();
		$(Main.k.window).resize(Main.k.Resize);
		$("#chatBlock").on("resize", Main.k.Resize);
	}
	Main.k.MushUpdate = function() {
		var leftbar = $(".usLeftbar");
		Main.k.hasTalkie = $("#walltab").length > 0;

		// Never hide unread msg
		$("table.treereply tr.not_read.cdRepl").css("display", "table-row");

		// Heroes
		// ----------------------------------- //
		var heroes_list = $("#heroes_list").empty();

		// Display players' skills & statuses
		var $it = Main.heroes.iterator();
		var heroes = "";
		var missingheroes = [];
		while ($it.hasNext()) {
			var hero = $it.next();
			var display = false;
			var bubble = hero.surname.replace(/(\s)/g, "_").toLowerCase();

			var statuses = $("<div>").addClass("icons statuses");
			if (hero.statuses) {
				var $_statuses = hero.statuses.iterator();
                var nbStatuses = 0;
                var widthOver = 0;
                var divover, divdeploy, divhidden;
				while( $_statuses.hasNext() ) {
                    nbStatuses += 1;
					display = true;
					var status = $_statuses.next();
                    
                    if(nbStatuses == 7){
                        divover = $("<div>").attr("id","statusesOver_"+bubble).addClass("overStatuses").appendTo(statuses);
                        divhidden = $("<div>").attr("id","hiddenStatuses_"+bubble).addClass("hiddenStatuses").appendTo(divover);
                        divdeploy = $("<div>").attr("id","hiddenStatusesDeploy_"+bubble).addClass("hiddenStatusesDeploy").appendTo(divover);
                        $("<img>").attr("src","http://twinoid.com/img/icons/right.png").appendTo(divdeploy);
                    }
                    
                    var img = $("<img>").attr("src", "/img/icons/ui/status/" + status.img + ".png")
                        .attr("height", "14").attr("alt", status.img)
                        .attr("_title", status.name)
                        .attr("_desc", status.desc)
                        .on("mouseover", Main.k.CustomTip)
                        .on("mouseout", Main.hideTip);
                    
                    if(nbStatuses > 6){
                        widthOver += 15;
                        img.appendTo(divhidden);
                    } else {
                        img.appendTo(statuses);
                    }
                    
                    if(!$_statuses.hasNext() && nbStatuses > 6){
                        divdeploy.bind('click', {width: widthOver, personame: bubble}, deploy_overstatuses);
                    }
				}
			}

			var skills = $("<div>").addClass("icons skills");
			if (hero.skills) {
                var nbSkills = 0;
                var widthOver = 0;
                var divover, divdeploy, divhidden;
				var $_skills = hero.skills.iterator();
				while( $_skills.hasNext() ) {
                    nbSkills += 1;
					display = true;
					var skill = $_skills.next();
					var skilldom = $("<span>").addClass("skill");
                    
                    if(nbSkills == 6){
                        divover = $("<div>").attr("id","skillOver_"+bubble).addClass("overSkills").appendTo(skills);
                        divhidden = $("<div>").attr("id","hiddenSkills_"+bubble).addClass("hiddenSkills").appendTo(divover);
                        divdeploy = $("<div>").attr("id","hiddenSkillsDeploy_"+bubble).addClass("hiddenSkillsDeploy").appendTo(divover);
                        $("<img>").attr("src","http://twinoid.com/img/icons/right.png").appendTo(divdeploy);
                    }
                    
                    if(nbSkills > 5){
                        skilldom.appendTo(divhidden);
                        widthOver += 20;
                    } else {
                        skilldom.appendTo(skills);
                    }

					$("<img>").attr("src", "/img/icons/skills/" + skill.img + ".png")
					.attr("height", "18").attr("alt", skill.img)
					.attr("_title", skill.name)
					.attr("_desc", skill.desc + (Main.k.compInactiveMush[skill.img] ? "<p><strong>Compétence inactive mush</strong></p>" : ""))
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.hideTip)
					.appendTo(skilldom);

					if (Main.k.compInactiveMush[skill.img]) {
						$("<img>").attr("src", Main.k.servurl_badconker + "/img/non-mush.png").addClass("actmush")
						.attr("width", "10").attr("height", "10")
						.attr("_title", "Compétence inactive mush")
						.attr("_desc", "Cette compétence est inactive quand on est mush (source : Twinpedia).")
						.on("mouseover", Main.k.CustomTip)
						.on("mouseout", Main.hideTip)
						.appendTo(skilldom);
					}
                    
                    if(!$_skills.hasNext() && nbSkills > 5){
                        divdeploy.bind('click', {width: widthOver, personame: bubble}, deploy_overskills);
                    }
				}
			}

			var titles = $("<div>").addClass("titles");
			if (hero.titles) {
				var $_titles = hero.titles.iterator();
				while( $_titles.hasNext() ) {
					var title = $_titles.next();

					$("<img>").attr("src", "/img/icons/ui/" + title.img + ".png")
					.attr("alt", title.img)
					.attr("_title", title.name)
					.attr("_desc", title.desc)
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.hideTip)
					.appendTo(titles);
				}
			}

			if (display) {
				var heroDiv = $("<div>").addClass("hero").appendTo(heroes_list);

				$("<img>").addClass("body " + bubble)
				.attr("src", "/img/design/pixel.gif")
				.css("cursor", "pointer")
				.attr("_hid", hero.id)
				.attr("_title", hero.name)
				.attr("_desc", hero.short_desc + "</p><p><strong>Cliquez pour plus d'informations <br/>/!\\ Fonctionnalité non codée</strong>")
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip)
				.on("click", function() {
					Main.k.Profiles.display($(this).attr("_hid"));
				})
				.appendTo(heroDiv);

				heroDiv.append(skills);
				heroDiv.append(statuses);
				heroDiv.append(titles);
			} else {
				missingheroes.push(hero);
			}

			Main.k.AliveHeroes.push(bubble);
		}
		// Display unavailable heroes
		if (missingheroes.length > 0) {
			var missingDiv = $("<div>").addClass("missingheroes").appendTo(heroes_list);

			for (var i=0; i<missingheroes.length; i++) {
				if (i%5 == 0) $("<br/>").appendTo(missingDiv);
				var hero = missingheroes[i];
				var bubble = hero.surname.replace(/(\s)/g, "_").toLowerCase();

				$("<img>").addClass("body " + bubble)
				.attr("src", "/img/design/pixel.gif")
				.css("cursor", "pointer")
				.attr("_hid", hero.id)
				.attr("_title", hero.name)
				.attr("_desc", hero.short_desc + "</p><p><strong>Cliquez pour plus d'informations <br/>/!\\ Fonctionnalité non codée</strong>")
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip)
				.on("click", function() {
					Main.k.Profiles.display($(this).attr("_hid"));
				})
				.appendTo(missingDiv);
			}

			var j=0;
			for (var i=0; i<Main.k.HEROES.length; i++) {
				var hero = Main.k.HEROES[i];

				if (!Main.k.ArrayContains(Main.k.AliveHeroes, hero)) {
					if ((j+missingheroes.length)%5 == 0) $("<br/>").appendTo(missingDiv);
					j++;
					var bubble = hero.replace(/(\s)/g, "_").toLowerCase();

					$("<img>").addClass("body " + bubble)
					.attr("src", "/img/design/pixel.gif")
					.css("cursor", "pointer")
					.attr("_hid", -1)
					.attr("_title", hero)
					.attr("_desc", Main.k.getShortDesc(bubble) + "</p><p><strong>Cliquez pour plus d'informations <br/>/!\\ Fonctionnalité non codée</strong>")
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.hideTip)
					.on("click", function() {
						Main.k.Profiles.display($(this).attr("_hid"), hero);
					})
					.appendTo(missingDiv);
				}
			}
		}
		// ----------------------------------- //


		// Exploration
		// ----------------------------------- //
		var exploring = $(".exploring .exploring2");
		$("#expblock").empty();
		if (exploring.length > 0) {
			var t = $("<h3>").html("Exploration").appendTo("#expblock");
			$("<span>").addClass("displayless").attr("_target", "#expblockdiv").appendTo(t).on("click", Main.k.ToggleDisplay);
			expblock = $("<div>").attr("id", "expblockdiv").appendTo("#expblock");

			var i = 0;
			var planetname = "";
			var back = "";
			exploring.find("li").each(function() {
				var li = $(this).clone();
				li.find("span").remove();
				var imgsrc = "";

				switch(i) {
					case 1:
						var players = $("<div>").addClass("missingheroes").appendTo(expblock);
						var p = li.html().split(",");
						for (var j=0; j<p.length; j++) {
							var hero = p[j].trim();
							var bubble = hero.replace(/(\s)/g, "_").toLowerCase();

							$("<img>").addClass("body " + bubble)
							.attr("src", "/img/design/pixel.gif")
							.attr("_title", hero)
							.attr("_desc", Main.k.getShortDesc(bubble))
							.on("mouseover", Main.k.CustomTip)
							.on("mouseout", Main.hideTip)
							.appendTo(players);
						}
						break;

					case 0:
						imgsrc = "planet";
					case 2:
						if (imgsrc == "") imgsrc = "casio"
						$("<p>").css({
							color: "#DDD",
							"font-size": "12px",
							margin: "-6px 0 0",
							"text-align": "center"
						}).html("<img src='/img/icons/ui/" + imgsrc + ".png' /> " + li.html().trim()).appendTo(expblock)
						.find("img").css({
							position: "relative",
							top: "4px"
						});
						break;
				}

				i++;
			});
		}
		// ----------------------------------- //


		// Inventory
		// ----------------------------------- //
		var hasPlants = false;
		var hasPharma = false;
		var mwidth = 120; //$(".usLeftbar").width();
		//$("#room").addClass("roominventory"); // New class used for cancelSelection
		$(".kobject_list").empty();
		var objects = $("#room");
		if (objects.find("[data-id='TREE_POT']").size()) hasPlants = true;
		objects.find("li").not(".cdEmptySlot").not("[data-id='TREE_POT']").each(function() {
			var li = $("<li>")
				.addClass("item fakeitem")
				.attr("serial_fake", $(this).attr("serial"))
				.attr("data-name", $(this).attr("data-name"))
				.attr("data-id", "TREE_POT")
				.css("list-style-type", "none")
				.html($(this).html())
				.on("click", function() { Main.k.fakeSelectItem(this); })
				.appendTo(".kobject_list")
				.find("td")
				.attr("_title", $(this).attr("data-name").split("\\'").join("'"))
				.attr("_desc", $(this).attr("data-desc").split("\\'").join("'"))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);

			// Loads
			var name = $(this).attr("data-name");
			var reg = /\/>x([0-9]+)$/;
			if (reg.test(name)) {
				var charges = reg.exec(name)[1];
				$("<span>")
					.addClass("charges")
					.html("x" + charges)
					.appendTo(li.find("tr"));
			}

			// Broken?
			var broken = "/img/icons/ui/broken.png";
			if (name.indexOf(broken) > -1) {
				$("<img>").attr("src", broken).addClass("broken").appendTo(li.find("tr"));
			}

			// Pharma?
			if ($(this).attr("data-desc").indexOf("Effets") != -1) hasPharma = true;
		});
		$(".usLeftbar .inventory").css("max-width", mwidth + "px").css("margin-left", "0px");
		// Pharma
		$("#pharmashare").css("display", !hasPharma ? "none" : "block");
		// ----------------------------------- //


		// Lab - Nexus - Pilgred - Plants - Planets
		// ----------------------------------- //
		var project_list = $("#project_list").empty();
		var projects = $("#cdModuleContent ul.dev li.cdProjCard");

		// Research
		if ($("#research_module").length > 0 && projects.length > 0) {
			var t = $("<h3>").html("Laboratoire").appendTo(project_list);
			$("<span>").addClass("displayless").attr("_target", "#projectspreview")
			.on("click", Main.k.ToggleDisplay).appendTo(t);

			var projectsdiv = $("<div>").addClass("projectspreview labpreview").attr("id", "projectspreview").appendTo(project_list);
			projects.each(function(i) {
				var projectdiv = $("<div>").addClass("projectpreview").appendTo(projectsdiv);

				// Project card
				$("<img>").addClass("projectimg")
				.attr("src", $(this).find("img.devcard").attr("src"))
				.appendTo(projectdiv);

				// Completion %
				$("<div>").addClass("projectpct")
				.html($(this).find("span").html().trim())
				.appendTo(projectdiv);

				// Bonuses
				var projectbonus = $("<div>").addClass("projectbonus").appendTo(projectdiv);
				$(this).find("div.suggestprogress ul li img").each(function(i) { $(this).clone().appendTo(projectbonus); });

				// Tooltip
				var h3 = $(this).find("h3").clone();
				h3.find("em").remove();

				projectdiv.attr("_title", h3.html().trim())
				.attr("_desc",
					$(this).find("div.desc").html().trim() + "</p><p>" +
					$(this).find("p.efficacity").html().trim()
				)
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);
			});

			// Research actions
			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> Partager", null, null, "Partager les recherches",
				"Insère la liste de recherches dans la zone de texte active, de la forme&nbsp;:</p><p>" +
				"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>" +
				"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>" +
				"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>"
			).appendTo(project_list)
			.find("a").addClass("shareresearchbtn").on("mousedown", function(e) {
				$('textarea:focus').each(function(e) {
					var txt = Main.k.FormatResearch();
					$(this).insertAtCaret(txt);
				});
				return false;
			});
			$("#research_module ul.inventory li.item").on("click", function(){
				Main.selectItem($(this));
			});

		// Projects
		} else if (projects.length > 0 && /Coeur\sde\sNERON/.test($("#cdModuleContent h2").html().trim())) {
			var t = $("<h3>").html("Projets Neron").appendTo(project_list);
			$("<span>").addClass("displayless").attr("_target", "#projectspreview")
			.on("click", Main.k.ToggleDisplay).appendTo(t);

			var projectsdiv = $("<div>").addClass("projectspreview").attr("id", "projectspreview").appendTo(project_list);
			projects.each(function(i) {
				var projectdiv = $("<div>").addClass("projectpreview").appendTo(projectsdiv);

				// Project card
				$("<img>").addClass("projectimg").attr("src", $(this).find("img").attr("src")).appendTo(projectdiv);

				// Completion %
				$("<div>").addClass("projectpct").html($(this).find("span").html().trim()).appendTo(projectdiv);

				// Bonuses
				var projectbonus = $("<div>").addClass("projectbonus").appendTo(projectdiv);
				$(this).find("div.suggestprogress ul li img").each(function(i) { $(this).clone().appendTo(projectbonus); });

				// Tooltip
				projectdiv.attr("_title", $(this).find("h3").html().trim())
				.attr("_desc",
					$(this).find("div.desc").html().trim() + "</p><p>" +
					$(this).find("p.efficacity").html().trim()
				)
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);
			});

			// Projects actions
			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> Partager", null, null, "Partager les projets",
				"Insère la liste de projets dans la zone de texte active, de la forme&nbsp;:</p><p>" +
				"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>" +
				"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>" +
				"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>"
			).appendTo(project_list)
			.find("a").addClass("shareprojectbtn").on("mousedown", function(e) {
				$('textarea:focus').each(function(e) {
					var txt = Main.k.FormatProjects();
					$(this).insertAtCaret(txt);
				});
				return false;
			});

		// Astro
		} else if ($("#navModule").length > 0) {
			var nav = $("#navModule");
			var planets = nav.find(".planet").not(".planetoff");
			if (planets.length > 0) {
				var t = $("<h3>").html("Planètes").appendTo(project_list);
				$("<span>").addClass("displayless").attr("_target", "#projectspreview")
				.on("click", Main.k.ToggleDisplay).appendTo(t);

				var projectsdiv = $("<div>").addClass("projectspreview planetpreview").attr("id", "projectspreview").appendTo(project_list);
				planets.each(function(i) {
					// Print planet
					var planet = $("<div>").addClass("planetpreview").appendTo(projectsdiv);
					$("<img>").attr("width", "40")
					.attr("src", $(this).find("img.previmg").attr("src"))
					.appendTo(planet);
				});

				// Planets actions
				Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> Partager", null, null, "Partager les planètes",
					"Insère la liste de planètes dans la zone de texte active, de la forme&nbsp;:</p><p>" +
					"TODO: aperçu"
				).appendTo(project_list)
				.find("a").on("mousedown", function(e) {
					$('textarea:focus').each(function(e) {
						var txt = Main.k.FormatPlanets();
						$(this).insertAtCaret(txt);
					});
					return false;
				});
			}

		// BIOS
		} else if ($("#biosModule").length > 0) {
			$("<h3>").html("BIOS NERON").appendTo(project_list);


			// Share params
			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> Partager", null, null, "Partager les paramètres",
				"Insère la liste de paramètres BIOS Neron dans la zone de texte active, de la forme&nbsp;:</p><p>" +
				"TODO: aperçu"
			).appendTo(project_list)
			.find("a").on("mousedown", function(e) {
				$('textarea:focus').each(function(e) {
					var txt = Main.k.FormatBIOS();
					$(this).insertAtCaret(txt);
				});
				return false;
			});
		}

		// Plants
		$(".usLeftbar").find("#plantmanager").remove();
		if (hasPlants) {
			// Create div
			var plantsDIV = $("<div>").attr("id", "plantmanager").appendTo(leftbar);
			var t = $("<h3>").html("Plantes").appendTo(plantsDIV);
			$("<span>").addClass("displayless").attr("_target", ".kplantlist").appendTo(t).on("click", Main.k.ToggleDisplay);

			// List plants
			var plantlist = $("<div>").addClass("kplantlist plants inventory").css("max-width", mwidth + "px").appendTo(plantsDIV);
			$("#room").find("[data-id='TREE_POT']").each(function() {
				$("<li>")
					.addClass("item fakeitem")
					.attr("serial", $(this).attr("serial"))
					.attr("data-name", $(this).attr("data-name"))
					.attr("data-id", "TREE_POT")
					.css("list-style-type", "none")
					.html($(this).html())
					.on("click", function() { Main.k.fakeSelectItem(this); })
					.appendTo(plantlist)
					.find("td")
					.attr("_title", $(this).attr("data-name").split("\\'").join("'"))
					.attr("_desc", $(this).attr("data-desc").split("\\'").join("'"))
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.hideTip);
			})

			// Plants actions
			$("<div>").css("clear", "both").css("height", "5px").appendTo(plantsDIV);
			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> Partager", null, null, "TODO: Texte", "TODO: Texte")
			.appendTo(plantsDIV)
			.find("a").on("mousedown", function(e) {
				$('textarea:focus').each(function(e) {
					var txt = Main.k.FormatPlants();
					$(this).insertAtCaret(txt);
				});
				return false;
			});
		}
		// ----------------------------------- //


		// Enhance alerts
		// ----------------------------------- //
		var alarm = $("#topinfo_bar .alarm");
		if (alarm.length > 0) {
			alarm.find(".alertnb").remove();
			var alarm_equip = "/img/icons/ui/alert.png";
			var alarm_door = "/img/icons/ui/door.png";
			var alarm_hunter = "/img/icons/ui/hunter.png";
			var alarm_fire = "/img/icons/ui/fire.png";

			alarm.find("img").each(function() {
				var _alarm = $(this).attr("src").toLowerCase();
				var alarm_nb = 0;
				var omo = $(this).parent().attr("onmouseover");

				switch (_alarm) {
					case alarm_equip:
						alarm_nb = parseInt(/>([0-9]+)/.exec(omo)[1]);
						break;
					case alarm_door:
						alarm_nb = parseInt(/>([0-9]+)/i.exec(omo)[1]);
						break;
					case alarm_hunter:
						if (/([0-9]+|un)\s+appareil/i.test(omo)) {
							alarm_nb = /([0-9]+|un)\s+appareil/i.exec(omo)[1];
						} else if (/>([0-9]+|un)/i.test(omo)) {
							alarm_nb = />([0-9]+|un)/i.exec(omo)[1];
						}
						if (alarm_nb) alarm_nb = alarm_nb.toLowerCase() == "un" ? 1 : parseInt(alarm_nb);
						break;
					case alarm_fire:
						alarm_nb = parseInt(/>([0-9]+)/i.exec(omo)[1]);
						break;
				}

				// Display nb if needed
				if (alarm_nb!=0) {
					updatebg = true;

					$(this).css({
						position: "relative",
						"z-index": "5"
					});
					$(this).parent().css("position", "relative");

					var wrap = $("<div>").addClass("alertnbwrapper")
					.css("left", parseInt(($(this).parent().width() - 20) / 2) + "px")
					.appendTo($(this).parent());

					$("<div>").addClass("alertnb").html(alarm_nb).appendTo(wrap);
				}



			});
			$("#topinfo_bar .alarm_on").css("background-image", "url(" + Main.k.servurl + "/img/alertpleft.gif)");
			$("#topinfo_bar .alarm_right_on").css("background-image", "url(" + Main.k.servurl + "/img/alertpright.gif)");
			$("#topinfo_bar .alarm_bg_on").css("background-image", "url(" + Main.k.servurl + "/img/alertbg.gif)");
		}
		//Display shield is needed
		var spaceshipstatus = $("#topinfo_bar .spaceshipstatus");
		if (spaceshipstatus.length > 0) {
			spaceshipstatus.find(".spaceshipstatus-info").remove();
			spaceshipstatus.find("img").each(function() {
				var regex = /\/([a-z]+)\.png$/;
				var matches = regex.exec($(this).attr('src'));
				if(matches != null){
					switch (matches[1]) {
						case 'shield':
							if(/: *[0-9]+<br\/>.+: *([0-9]+)<br\/>/.test($(this).parent().attr('onmouseover'))){
								var wrap = $('<div class="spaceshipstatus-info" style="font-size:10px;text-align:center;">'+RegExp.$1+'&nbsp;<img src="http://'+Main.k.domain+'/img/icons/ui/plasma.png" width="11"></div>').appendTo($(this).parent());

							}
						break;
					}
				}
			});
		}

		// ----------------------------------- //


		// Enhance private chats
		// ----------------------------------- //
		for (var i=0; i<3; i++) {
			var tab = $("#cdTabsChat .cdPrivateTab" + i);
			var tabcontent = $("#cdPrivate" + i);
			if (tab.length > 0 && tabcontent.length > 0) {
				var tip = "";
				var heroes = tabcontent.find(".mini_priv");
				for (var j=0; j<heroes.length; j++) {
					var mouseover = $(heroes[j]).attr("onmouseover");
					var name = /<h1>([^<]+)<\/h1>/.exec(mouseover)[1];
					var co = /[a-zA-Z]+\s?:\s([^<]+)/.exec(mouseover)[1].toLowerCase();
					tip += "<strong>" + name + "</strong> - "+Main.k.text.connected+" " + co + "<br/>";
				}

				tab.find("img").off("mouseover").off("mouseout")
				.attr("_title", "Canal privé #" + (i+1))
				.attr("_desc", tip)
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.hideTip);
			}
		}
		// ----------------------------------- //

		// Update manager?
		if (Main.k.Manager.opened) Main.k.Manager.update();

		// Options
		Main.k.updateBottom();
		Main.k.customBubbles();

		// Fix PAbis
		$("#cdPaBloc img[src='/img/design/pa1bis.png']").attr("src", Main.k.servurl + "/img/pa1bis.png");

		// Fix dimensions
		Main.k.Resize();

		// Last sent message lost ?
		var cook = js.Cookie.get("lastsentmsg");
		if (cook) {
			Main.k.displayLastSent(true);
		} else {
			//Main.k.displayLastSent(false);
		}
	}
	Main.k.MushInitHeroes = function(){
		Main.k.heroes = jQuery.extend(true, {}, Main.heroes);
		var $it = Main.k.heroes.iterator();
		var heroes = "";
		var tab_heroes = jQuery.extend([], Main.k.HEROES);

		while ($it.hasNext()) {
			var hero = $it.next();
			tab_heroes = jQuery.grep(tab_heroes, function(value) {
			  return value != Main.k.surnameToBubble(hero.surname);
			});
		}
	};
	Main.k.MushInit();
	Main.k.MushUpdate();
	Main.k.MushAfterInit();

	// TODO: fix for chrome
	$(document).keypress(function(e){
		if (e.keyCode === 27) Main.k.ClosePopup();
	});
}

function deploy_overskills(event){
    var width = event.data.width;
    var pname = event.data.personame;
    var wid = Number(width);
    if($("#hiddenSkillsDeploy_"+pname).hasClass("show")){
        $("#hiddenSkillsDeploy_"+pname).removeClass("show");
        var leftpx = $("#skillOver_"+pname).css("left");
        var widthpx = $("#skillOver_"+pname).css("width");
        var newleft = Number(leftpx.substring(0,leftpx.length-2)) - wid;
        var newwidth = Number(widthpx.substring(0,widthpx.length-2)) - wid;
        $("#skillOver_"+pname).animate({"width":newwidth,"left":newleft+"px"});
        $("#hiddenSkills_"+pname).animate({"width":"0px"});
		changeArrow($("#hiddenSkillsDeploy_"+pname+" img"), "http://twinoid.com/img/icons/right.png");
	} else {
		//$("#hiddenSkills_"+pname).show();
        var leftpx = $("#skillOver_"+pname).css("left");
        var widthpx = $("#skillOver_"+pname).css("width");
        var newleft = Number(leftpx.substring(0,leftpx.length-2)) + wid;
        var newwidth = Number(widthpx.substring(0,widthpx.length-2)) + wid;
        $("#skillOver_"+pname).animate({"width":newwidth,"left":newleft+"px"});
        $("#hiddenSkills_"+pname).animate({"width":wid+"px"});
        $("#hiddenSkillsDeploy_"+pname).addClass("show");
        changeArrow($("#hiddenSkillsDeploy_"+pname+" img"), "http://twinoid.com/img/icons/left.png");
	}
}

function deploy_overstatuses(event){
    var width = event.data.width;
    var pname = event.data.personame;
    var wid = Number(width);
    if($("#hiddenStatusesDeploy_"+pname).hasClass("show")){
        $("#hiddenStatusesDeploy_"+pname).removeClass("show");
        var leftpx = $("#statusesOver_"+pname).css("left");
        var widthpx = $("#statusesOver_"+pname).css("width");
        var newleft = Number(leftpx.substring(0,leftpx.length-2)) - wid;
        var newwidth = Number(widthpx.substring(0,widthpx.length-2)) - wid;
        $("#statusesOver_"+pname).animate({"width":newwidth,"left":newleft+"px"});
        $("#hiddenStatuses_"+pname).animate({"width":"0px"});
		changeArrow($("#hiddenStatusesDeploy_"+pname+" img"), "http://twinoid.com/img/icons/right.png");
	} else {
        var leftpx = $("#statusesOver_"+pname).css("left");
        var widthpx = $("#statusesOver_"+pname).css("width");
        var newleft = Number(leftpx.substring(0,leftpx.length-2)) + wid;
        var newwidth = Number(widthpx.substring(0,widthpx.length-2)) + wid;
        $("#statusesOver_"+pname).animate({"width":newwidth,"left":newleft+"px"});
        $("#hiddenStatuses_"+pname).animate({"width":wid+"px"});
        $("#hiddenStatusesDeploy_"+pname).addClass("show");
        changeArrow($("#hiddenStatusesDeploy_"+pname+" img"), "http://twinoid.com/img/icons/left.png");
	}
}

function changeArrow(div, img){
    div.attr("src",img);
}

Main.k.tabs.credits = function() {
	$("blockquote").css("overflow", "visible");
	$("blockquote p").css({
		height: "auto",
		"font-size": "10pt",
		"margin-top": "10px"
	});
	$("#extra .nova").css("display", "none");

	// Add menu
	$("<div>").addClass("mainmenu").html('<ul id="menuBar">\
		<li class="daed"><a href="/">Jouer</a></li>\
		<li><a href="/me">Mon Compte</a></li>\
		<li><a href="/ranking">Classement</a></li>\
		<li><a href="/tid/forum">Forum</a></li>\
	</ul>').appendTo(".mxhead");

	// Enhance mushs
	$(".scoremush").siblings("h3").css("color", "rgb(255, 64, 89)");
	$(".triumphmush").siblings(".dude").find("h3").css("color", "rgb(255, 64, 89)");
}
Main.k.tabs.myprofile = function() {
	// Fix Experience
	$(".charboostbg ul.slots").css("display", "none");
	$("ul.boost li.charboost").css("height", "200px");

	// Fix menu
	$("#accountmenu a").each(function() {
		$(this).on("click", function() {
			var r = /\?([a-z]+)$/;
			if (r.test(this.href)) {
				$('.cdTabTgt').hide();
				$("#" + r.exec(this.href)[1]).show();
				$("#" + r.exec(this.href)[1] + "tab").addClass('active');
				$("#" + r.exec(this.href)[1] + "tab").siblings().removeClass('active');
			} else {
				$('.cdTabTgt').hide();
				$("#experience").show();
				$("#experiencetab").addClass('active');
				$("#experiencetab").siblings().removeClass('active');
			}
			return false;
		})
	})

	// Autoselect tab
	var url = Main.k.window.location;
	var r = /\?([a-z]+)$/;
	if (r.test(url)) {
		$('.cdTabTgt').hide();
		$("#" + r.exec(url)[1]).show();
		$("#" + r.exec(url)[1] + "tab").addClass('active');
		$("#" + r.exec(url)[1] + "tab").siblings().removeClass('active');
	}
}
Main.k.tabs.ranking = function() {

	Main.k.SwitchRankingTab = function(event) {
		var selectedtab = $(event.target).attr("id");
		$("div.bgtablesummar").addClass("hide");
		$("ul.tablefilter li").addClass("off");
		$(event.target).removeClass("off");

		switch (selectedtab) {
			case "cdTabFriends":
				$("div.cdFriends").removeClass("hide");
				break;

			case "cdTabContacts":
				$("div.cdContacts").removeClass("hide");
				break;

			case "cdTabAll":
				$("div.cdGlobal").removeClass("hide");
				break;
		}
	}

	$("<style>").attr("type", "text/css").html("\
	span.rankhead {\
		display: block;\
		position: absolute;\
		top: 30px; left: 250px;\
		bottom: 30px; right: 10px;\
		z-index: 10;\
		font-size: 24pt;\
		color: #FFF;\
		text-align: left;\
		font-family: 'PT Sans Caption','Arial','Segoe UI','Lucida Grande','Trebuchet MS','lucida sans unicode',sans-serif;\
		text-shadow: -1px 0px 2px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.3), 1px 0px 2px rgba(0, 0, 0, 0.3);\
		text-transform: uppercase;\
	}\
	").appendTo($("head"));


	$("#category_triumph, #category_nova").css({
		margin: "0",
		width: "50%",
		float: "left",
		display: "block"
	});

	$("th").each(function() {
		var txt = $(this).html().trim();
		if (txt == "Héros Favori") $(this).html("");
	})

	$("ul.tablefilter").first().clone().css({
		float: "right",
		width: "auto"
	}).prependTo("#ranking").find("li").attr("onclick", "").on("click", Main.k.SwitchRankingTab);
	$("#category_triumph, #category_nova").find(".tablefilter, .clear").remove();
	$("#ranking th.distinctions").css("width", "auto");
	$(".bgtablesummar").css("margin", "0 5px");
	$("table.summar").css("width", "100%");
	$("table.summar tr.top td").css("font-size", "12pt");
	$(".pages").css("display", "none");//TEMP
	$("ul.category").css("display", "none");
	$("tr.cdRhtTr").css("display", "table-row");
	$("<div>").addClass("clear").appendTo("#ranking");
	$("<div>").addClass("clear").insertBefore("#category_triumph");

	var headers = $("<div>").css({"margin": "20px auto 10px", "text-align": "center", position: "relative"}).prependTo("#category_triumph, #category_nova");
	headers.first().html("<span class='rankhead'>Triomphe</span><img alt='Triomphe' src='" + Main.k.servurl + "/img/rank_triumph.png' />");
	headers.last().html("<span class='rankhead'>Super NOVA</span><img alt='NOVA' src='" + Main.k.servurl + "/img/rank_nova.png' />");
}
Main.k.tabs.expPerma = function() {
	if (Main.k.Options.cbubbles) {
		Main.k.css.bubbles();

		$("div.exploreevent p").each(function() {
			var heroes = [];
			var heroes_replace = [];
			$("ul.adventurers .char").each(function() {
				var hero = $(this).attr("class").replace("char ", "");
				var herof = hero.replace("_", " ").capitalize();
				heroes_replace.push('<span class="colored_' + hero + '"><img src="/img/icons/ui/' + hero.replace("_", "") + '.png" /> ' + herof + '</span>');
				heroes.push(herof);
			})

			var html = $(this).html();
			for (var i=0; i<heroes.length; i++) {
				html = html.replace(heroes[i], heroes_replace[i]);
			}
			$(this).html(html);
		})
	}
}
Main.k.tabs.gameover = function() {
	// Triumph logs
	var logs = $("#logtri li span, #logtri div div li");
	var logcount = {
		humanC: 0,			// 1
		researchMin: 0,		// 3
		research: 0,		// 6
		hunter: 0,			// 1
		expe: 0,			// 3
		planet: 0,			// 5
	};

	var reg = /([0-9]+)\sx\s([^\(]+)\s\(\s(?:\+|-)\s([0-9]+)\s\)/;
	$("#logtri div").css("display", "block");
	$("#logtri .rreadmore").css("display", "none");
	logs.each(function() {
		var counted = false;
		var data = reg.exec($(this).html());
		switch (data[2].trim()) {
			case "Cycle Humain":
				counted = true;
				logcount.humanC += parseInt(data[1]);
				break;
			case "Recherche Mineur":
				counted = true;
				logcount.researchMin += parseInt(data[1]);
				break;
			case "Recherche":
				counted = true;
				logcount.research += parseInt(data[1]);
				break;
			case "Défenseur Du Daedalus":
				counted = true;
				logcount.hunter += parseInt(data[1]);
				break;
			case "Expédition":
				counted = true;
				logcount.expe += parseInt(data[1]);
				break;
			case "Nouvel Planète":
				counted = true;
				logcount.planet += parseInt(data[1]);
				break;
		}

		if (counted) {
			var tgt = ($(this).tagName == "SPAN") ? $(this).parent() : $(this);
			tgt.css("display", "none");
		}
	});
	if (logcount.planet) {
		$("<li>").html(logcount.planet + " x Nouvelle Planète ( + " + logcount.planet * 5 + " )")
		.attr("_title", "Nouvelle Planète")
		.attr("_desc", "Gagné à chaque planète (arrivée en orbite).")
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip)
		.prependTo("#logtri");
	}
	if (logcount.expe) {
		$("<li>").html(logcount.expe + " x Expédition ( + " + logcount.expe * 3 + " )")
		.attr("_title", "Expédition")
		.attr("_desc", "Gagné à chaque exploration.")
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip)
		.prependTo("#logtri");
	}
	if (logcount.researchMin) {
		$("<li>").html(logcount.researchMin + " x Recherche Mineure ( + " + logcount.researchMin * 3 + " )")
		.attr("_title", "Recherche Mineure")
		.attr("_desc", "Gagné lorsque la recherche est terminée ainsi qu'une seconde fois lors du retour sur SOL.")
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip)
		.prependTo("#logtri");
	}
	if (logcount.research) {
		$("<li>").html(logcount.research + " x Recherche ( + " + logcount.research * 6 + " )")
		.attr("_title", "Recherche")
		.attr("_desc", "Gagné lorsque la recherche est terminée ainsi qu'une seconde fois lors du retour sur SOL.")
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip)
		.prependTo("#logtri");
	}
	if (logcount.hunter) {
		$("<li>").html(logcount.hunter + " x Défenseur du Daedalus ( + " + logcount.hunter * 1 + " )")
		.attr("_title", "Défenseur du Daedalus")
		.attr("_desc", "Gagné pour chaque Hunter abattu.")
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip)
		.prependTo("#logtri");
	}
	if (logcount.humanC) {
		$("<li>").html(logcount.humanC + " x Cycle Humain ( + " + logcount.humanC * 1 + " )")
		.attr("_title", "Cycle Humain")
		.attr("_desc", "Gagné à chaque cycle.")
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.hideTip)
		.prependTo("#logtri");
	}

	//Loading on like click
	$(document).on('click','a.like',function(){
		$(this).replaceWith('<img class="cdLoading" src="/img/icons/ui/loading1.gif" alt="loading..." />');
	});
}


// == Redéfinition de fonctions/variables  =======================================
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
js.Cookie = function() { }
$hxClasses["js.Cookie"] = js.Cookie;

var CrossConsts = function() { }
$hxClasses["CrossConsts"] = CrossConsts;
CrossConsts.__name__ = ["CrossConsts"];
CrossConsts.COOK_SEL = "sel";
CrossConsts.COOK_CURCHAT = "curChat";
CrossConsts.REMOTING_COM_CHANNEL = "default";
CrossConsts.COOK_INV_OFFSET_L = "inv_offset_l";
CrossConsts.BASELINE_NONE = 439;
CrossConsts.BASELINE_CLOSET = 260;
CrossConsts.BASELINE_ACTIONS = 350;
CrossConsts.ISO_VERSION = 21;
CrossConsts.NB_PRIVATE_CHAN = 3;
CrossConsts.PRIVATE_CHAN_START = 7;


js.Cookie.__name__ = ["js","Cookie"];
js.Cookie.set = function(name,value,expireDelay,path,domain) {
	var s = name + "=" + StringTools.urlEncode(value);
	if(expireDelay != null) {
		var d;
		var d1 = new Date();
		var t = d1.getTime() + expireDelay * 1000;
		var d2 = new Date();
		d2.setTime(t);
		d = d2;
		s += ";expires=" + d.toGMTString();
	}
	if(path != null) s += ";path=" + path;
	if(domain != null) s += ";domain=" + domain;
	window.document.cookie = s;
}
js.Cookie.all = function() {
	var h = new haxe.ds.StringMap();
	var a = window.document.cookie.split(";");
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		e = StringTools.ltrim(e);
		var t = e.split("=");
		if(t.length < 2) continue;
		h.set(t[0],StringTools.urlDecode(t[1]));
	}
	return h;
}
js.Cookie.get = function(name) {
	return js.Cookie.all().get(name);
}

js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
if (typeof document != "undefined") js.Lib.document = document;
if (typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}

js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch(e) {
		return null;
	}
}
js.Browser.getSessionStorage = function() {
	try {
		var s = window.sessionStorage;
		s.getItem("");
		return s;
	} catch(e) {
		return null;
	}
}
js.Browser.createXMLHttpRequest = function() {
	if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if (typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
}

var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = {};
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
}
haxe.remoting = {}
haxe.remoting.Context = function() {
	this.objects = new haxe.ds.StringMap();
};
$hxClasses["haxe.remoting.Context"] = haxe.remoting.Context;
haxe.remoting.Context.__name__ = ["haxe","remoting","Context"];
haxe.remoting.Context.prototype = {
	addObject: function(name,obj,recursive) {
		this.objects.set(name,{ obj : obj, rec : recursive});
	}
	,call: function(path,params) {
		if(path.length < 2) throw "Invalid path '" + path.join(".") + "'";
		var inf = this.objects.get(path[0]);
		if(inf == null) throw "No such object " + path[0];
		var o = inf.obj;
		var m;
		var v = null;
		try {
			v = o[path[1]];
		} catch( e ) {
		}
		m = v;
		if(path.length > 2) {
			if(!inf.rec) throw "Can't access " + path.join(".");
			var _g1 = 2;
			var _g = path.length;
			while(_g1 < _g) {
				var i = _g1++;
				o = m;
				var v = null;
				try {
					v = o[path[i]];
				} catch( e ) {
				}
				m = v;
			}
		}
		if(!Reflect.isFunction(m)) throw "No such method " + path.join(".");
		return m.apply(o,params);
	}
	,__class__: haxe.remoting.Context
}
haxe.remoting.ExternalConnection = function(data,path) {
	this.__data = data;
	this.__path = path;
};

haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe.Http;
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.prototype = {
	setParameter: function(param,value) {
		this.params = Lambda.filter(this.params,function(p) {
			return p.param != param;
		});
		this.params.push({ param : param, value : value});
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(me.responseData = r.responseText); else if(s == null) me.onError("Failed to connect or resolve host"); else switch(s) {
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlEncode(p.param) + "=" + StringTools.urlEncode(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h.header,h.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe.Http
}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
}
Math.__name__ = ["Math"];


var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,last: function() {
		if(this.q == null) return null; else return this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
}



var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}

var JqEx = function() { }
$hxClasses["JqEx"] = JqEx;
JqEx.__name__ = ["JqEx"];
JqEx.blink = function(j,period,start,finish) {
	if(finish == null) finish = -1;
	if(start == null) start = 0;
	if(period == null) period = 200;
	var cbk = null;
	cbk = function() {
		if(start != finish) {
			start = start + 1;
			JqEx.blink(j,period,start,finish);
		}
	};
	j.fadeOut(period).fadeIn(period,cbk);
	return j;
}
JqEx.j = function(sel) {
	return new js.JQuery(sel);
}
JqEx.ok = function(j) {
	return j;
}
JqEx.softHide = function(j) {
	j.css("visibility","hidden");
	j.attr("oldHeight",j.css("height"));
	return j;
}
JqEx.vis = function(j,onOff) {
	if(onOff) j.css("visibility","visible"); else j.css("visibility","hidden");
	return j;
}
JqEx.softShow = function(j) {
	j.css("visibility","visible");
	j.css("height",j.attr("oldHeight"));
	j.removeAttr("oldHeight");
}
JqEx.loading = function(jq) {
	jq.prepend("<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading...' />");
}
JqEx.postLoading = function(jq) {
	jq.append("<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading...' />");
	return jq;
}
JqEx.remLoading = function(jq) {
	jq.find(".cdLoading").remove();
	return jq;
}
JqEx.warp = function(jq,x,y) {
	var lval = jq.css("left").split("px")[0];
	jq.css("left",Std.parseInt(lval) + x + "px");
	if(y != null) {
		var tval = jq.css("top").split("px")[0];
		jq.css("top",Std.parseInt(tval) + y + "px");
	}
	return jq;
}
JqEx.move = function(jq,x,y,dur) {
	if(dur == null) dur = 200;
	var lval = jq.css("left").split("px")[0];
	jq.animate({ left : Std.parseInt(lval) + x + "px"},dur);
	if(y != null) {
		var tval = jq.css("top").split("px")[0];
		jq.animate({ top : Std.parseInt(tval) + y + "px"},dur);
	}
	return jq;
}
JqEx.countTo = function(jq,i,delay_ms) {
	if(delay_ms == null) delay_ms = 20;
	var start = Std.parseInt(jq.text());
	if(start == null) start = 0;
	if(start <= i + 1) {
		var steps = i + 1 - start;
		var _g = 0;
		while(_g < steps) {
			var j = [_g++];
			haxe.Timer.delay((function(j) {
				return function() {
					jq.text(Std.string(start + j[0]));
				};
			})(j),delay_ms * j[0]);
		}
	} else {
		var steps = start - i + 1;
		var _g = 0;
		while(_g < steps) {
			var j1 = [_g++];
			haxe.Timer.delay((function(j1) {
				return function() {
					jq.text(Std.string(start - j1[0]));
				};
			})(j1),delay_ms * j1[0]);
		}
	}
	return jq;
}
JqEx.tip = function(jq,t,b) {
	jq.hover(function(e) {
		mt.js.Tip.showTip(jq.toArray()[0],"","<div class='tiptop' >" + "<div class='tipbottom'>" + "<div class='tipbg'>" + "<div class='tipcontent'>" + "<h1>" + t + "</h1>" + b + "</div>" + "</div>" + "</div>" + "</div>");
	},function(e) {
		mt.js.Tip.hide();
	});
	return jq;
}

var Tools = $hxClasses["Tools"] = function() { }
Tools.__name__ = ["Tools"];
Tools.globalEval = function(script) {
	if(script.content == null || script.content.length == 0) return;
	var o = js.Lib.document;
	js.Lib.document = { write : function(data) {
		var t = o.createElement("div");
		t.setAttribute("id","_" + script.id);
		t.innerHTML = data;
		var s = o.getElementById(script.id);
		s.parentNode.insertBefore(t,s);
	}, getElementById : $bind(o,o.getElementById), getElementsByTagName : $bind(o,o.getElementsByTagName), getElementsByName : $bind(o,o.getElementsByName), body : o.body, attachEvent : function(eventName,handler) {
		return o.attachEvent(eventName,handler);
	}, detachEvent : function(eventName,handler) {
		return o.detachEvent(eventName,handler);
	}, addEventListener : function(eventName,handler,useCapture) {
		return o.addEventListener(eventName,handler,useCapture);
	}, removeEventListener : function(eventName,handler,useCapture) {
		return o.removeEventListener(eventName,handler,useCapture);
	}, _document : o, cookie : o.cookie};
	try {
		if(js.Lib.window.execScript != null) js.Lib.window.execScript(script.content); else if(js.Lib.window.eval != null) js.Lib.window.eval(script.content); else {
			var s = js.Lib.document.createElement("script");
			s.setAttribute("type","text/jatvascript");
			s.innerHTML = script.content;
			js.Lib.document.getElementsByTagName("head")[0].appendChild(s);
		}
	} catch( e ) {
		js.Lib.document = o;
		throw e;
	}
	js.Lib.document = o;
	return;
}
Tools.extractId = function(flow,id) {
	var a = flow.split("id=\"" + id + "\"");
	if(a.length != 2) return null;
	var tagPart = a[0];
	var id1 = tagPart.lastIndexOf("<") + 1;
	var tag = "";
	var _g1 = id1, _g = tagPart.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = HxOverrides.cca(tagPart,i);
		if((c < 97 || c > 122) && (c < 65 || c > 90) && c != 58) break;
		tag += String.fromCharCode(c);
	}
	var imp = a[1];
	var beginIndex = imp.indexOf(">") + 1;
	var crtIndex = beginIndex;
	var nextCloseIndex = 0;
	var nextOpenIndex = 0;
	var count = 1;
	var limit = 100000;
	while(true) {
		nextCloseIndex = imp.indexOf("</" + tag + ">",crtIndex);
		nextOpenIndex = imp.indexOf("<" + tag,crtIndex);
		var descending = nextOpenIndex < nextCloseIndex && nextOpenIndex != -1;
		count += descending?1:-1;
		if(count <= 0) break;
		crtIndex = descending?imp.indexOf(">",nextOpenIndex + 1):nextCloseIndex + 3 + tag.length;
		if(limit-- == 0) return null;
	}
	return HxOverrides.substr(imp,beginIndex,nextCloseIndex - 1 - beginIndex);
}
Tools.extractTag = function(data,tag,offset) {
	if(offset == null) offset = 0;
	var start = data.indexOf("<" + tag,offset);
	if(start == -1) return null;
	var begin = data.indexOf(">",start) + 1;
	var end = data.indexOf("</" + tag + ">",begin);
	var content = HxOverrides.substr(data,begin,end - begin);
	end += 3 + tag.length;
	var fullContent = HxOverrides.substr(data,start,end - start);
	return { content : content, start : start, end : end, fullContent : fullContent, id : null};
}
Tools.extractScripts = function(data) {
	var scripts = [];
	var currentIndex = 0;
	while(true) {
		var info = Tools.extractTag(data,"script",currentIndex);
		if(info == null) break;
		scripts.push(info);
		currentIndex = info.end;
	}
	return scripts;
}
Tools.hasTag = function(tag,source) {
	return source.split(tag + "=").length > 1;
}
Tools.makeTag = function(tag,source) {
	var output = { source : source, id : ""};
	var pos = source.indexOf(">");
	if(pos == -1) return null;
	if(Tools.hasTag(tag,source)) output.id = source.split(tag + "=")[1].split("\"")[1]; else {
		var before = HxOverrides.substr(source,0,pos);
		var after = HxOverrides.substr(source,pos,null);
		output.id = "script_" + Tools.SCRIPT_ID++;
		output.source = before + " id=\"" + output.id + "\"" + after;
	}
	return output;
}
Tools.updateContent = function(url,seek,dest,cb) {
	var r = new haxe.Http(url);
	var dbg = false;
	r.onData = function(data) {
		var meR = r;
		var _g1 = 0, _g = seek.length;
		while(_g1 < _g) {
			var i = _g1++;
			var target = js.Lib.document.getElementById(dest != null?dest[i]:seek[i]);
			if(target == null) {
				if(dbg) null;
				continue;
			}
			var input = Tools.extractId(data,seek[i]);
			if(input == null) try {
				if(dbg) null;
				target = js.Lib.document.body;
				var tag = Tools.extractTag(data,"body",0);
				input = tag.content;
				var scripts = Tools.extractScripts(input);
				var _g2 = 0;
				while(_g2 < scripts.length) {
					var s = scripts[_g2];
					++_g2;
					var data1 = Tools.makeTag("id",s.fullContent);
					if(data1 != null) {
						s.id = data1.id;
						input = StringTools.replace(input,s.fullContent,data1.source);
					}
				}
				target.innerHTML = input;
				if(dbg) null;
				var _g2 = 0;
				while(_g2 < scripts.length) {
					var s = scripts[_g2];
					++_g2;
					Tools.globalEval(s);
				}
				if(cb != null) cb();
				return;
			} catch( e ) {
				var regIt = true;
				var h = "";
				var meta = "";
				try {
					h = data.split("<head>")[1].split("</head>")[0];
					var start = "<meta name=\"msh\" content=\"";
					var i1 = h.indexOf("<meta name=\"msh\"");
					if(i1 != null) {
						meta = HxOverrides.substr(h,i1 + start.length,null);
						var end = meta.indexOf("\"");
						meta = HxOverrides.substr(meta,0,end);
						var keys = meta.split(",");
						if(Lambda.has(keys,"DEATH")) regIt = false;
					}
				} catch( d ) {
					h = "parse error data:" + data.length + " ";
					if(data.length < 256) h = h + " data: " + data;
				}
				var dsize = data.length;
				var msg = "error 2  loading:" + url + " tgt:" + seek[i] + " meta: " + meta + " hlen: " + h.length + " err: " + Std.string(e) + " es: " + haxe.Stack.exceptionStack().toString();
				if(h.length > 0) msg += " hl : >>" + h + "<<";
				if(dbg) null;
				js.Lib.window.location.assign(Tools.defaultUrl == null?url:Tools.defaultUrl);
				var s = StringTools.urlEncode(msg);
				if(regIt) Tools.ping("registerError/" + s);
				return;
			} else if(dbg) null;
			var scripts = Tools.extractScripts(input);
			var _g2 = 0;
			while(_g2 < scripts.length) {
				var s = scripts[_g2];
				++_g2;
				var data1 = Tools.makeTag("id",s.fullContent);
				if(data1 != null) {
					s.id = data1.id;
					input = StringTools.replace(input,s.fullContent,data1.source);
				}
			}
			target.innerHTML = input;
			if(dbg) null;
			var _g2 = 0;
			while(_g2 < scripts.length) {
				var s = scripts[_g2];
				++_g2;
				Tools.globalEval(s);
			}
			if(dbg) null;
		}
		if(cb != null) cb();
	};
	r.request(false);
	return false;
}
Tools.ping = function(url,cbk) {
	var r = new haxe.Http(url);
	r.async = true;
	r.request(false);
	if(cbk != null) r.onData = cbk;
}
Tools.send2SessionStore = function(k,v) {
	try {
		var ser = haxe.Serializer.run(v);
		((function($this) {
			var $r;
			var s;
			try {
				s = window.sessionStorage;
				s.getItem("");
			} catch( e ) {
				s = null;
			}
			$r = s;
			return $r;
		}(this))).setItem(k,ser);
	} catch( d ) {
		null;
	}
}
Tools.getFromSessionStore = function(k) {
	var v = ((function($this) {
		var $r;
		var s;
		try {
			s = window.sessionStorage;
			s.getItem("");
		} catch( e ) {
			s = null;
		}
		$r = s;
		return $r;
	}(this))).getItem(k);
	if(v == null) return null;
	return haxe.Unserializer.run(v);
}
Tools.send2Store = function(k,v) {
	try {
		var ser = haxe.Serializer.run(v);
		((function($this) {
			var $r;
			var s;
			try {
				s = window.localStorage;
				s.getItem("");
			} catch( e ) {
				s = null;
			}
			$r = s;
			return $r;
		}(this))).setItem(k,ser);
	} catch( d ) {
		null;
	}
}
Tools.getFromStore = function(k) {
	var v = ((function($this) {
		var $r;
		var s;
		try {
			s = window.localStorage;
			s.getItem("");
		} catch( e ) {
			s = null;
		}
		$r = s;
		return $r;
	}(this))).getItem(k);
	if(v == null) return null;
	return haxe.Unserializer.run(v);
}
Tools.jqColToInt = function(str,def) {
	if(StringTools.startsWith(str,"#")) return Std.parseInt("0x" + HxOverrides.substr(str,1,999)); else if(StringTools.startsWith(str,"rgb")) {
		str = HxOverrides.substr(str,3,null);
		var spl = str.split(",");
		var r = "0";
		var g = "0";
		var b = "0";
		var _g = 0;
		while(_g < spl.length) {
			var s = spl[_g];
			++_g;
			if(StringTools.startsWith(s,"(")) r = HxOverrides.substr(s,1,null); else if(StringEx.endsWith(s,")")) b = HxOverrides.substr(s,0,s.length - 1); else g = s;
		}
		return Std.parseInt(r) << 16 | Std.parseInt(g) << 8 | Std.parseInt(b);
	} else return def;
}

var Lambda = function() { }
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
}
function $iterator(o) { if( $.isArray(o) ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) {
	if( m == null ) return null;
	if( m.__id__ == null ) m.__id__ = $fid++;
	var f;
	if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__];
	if( f == null ) {
		f = function(){
			return f.method.apply(f.scope, arguments);
		};
		f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f;
	} return f;
};
$.fn.iterator = function() {
	return {
	pos : 0, j : this,
	hasNext : function() {
		return this.pos < this.j.length;
	}, next : function() {
		return $(this.j[this.pos++]);
	}};
};


var ALMHeroListState = $hxClasses["ALMHeroListState"] = { __ename__ : ["ALMHeroListState"], __constructs__ : ["DisplayHeroRoomActionActions","DisplayHeroItemActions"] }
ALMHeroListState.DisplayHeroRoomActionActions = ["DisplayHeroRoomActionActions",0];
ALMHeroListState.DisplayHeroRoomActionActions.toString = $estr;
ALMHeroListState.DisplayHeroRoomActionActions.__enum__ = ALMHeroListState;
ALMHeroListState.DisplayHeroItemActions = function(serial) { var $x = ["DisplayHeroItemActions",1,serial]; $x.__enum__ = ALMHeroListState; $x.toString = $estr; return $x; }
var ALMRoomListState = $hxClasses["ALMRoomListState"] = { __ename__ : ["ALMRoomListState"], __constructs__ : ["DisplayHeroAction","DisplayRoomAction","DisplayNone"] }
ALMRoomListState.DisplayHeroAction = function(serial) { var $x = ["DisplayHeroAction",0,serial]; $x.__enum__ = ALMRoomListState; $x.toString = $estr; return $x; }
ALMRoomListState.DisplayRoomAction = function(serial) { var $x = ["DisplayRoomAction",1,serial]; $x.__enum__ = ALMRoomListState; $x.toString = $estr; return $x; }
ALMRoomListState.DisplayNone = ["DisplayNone",2];
ALMRoomListState.DisplayNone.toString = $estr;
ALMRoomListState.DisplayNone.__enum__ = ALMRoomListState;

var ActionListMaintainer = $hxClasses["ActionListMaintainer"] = function() {
	this.heroWorking = false;
	this.roomWorking = false;
};
ActionListMaintainer.__name__ = ["ActionListMaintainer"];
ActionListMaintainer.j = function(s) {
	return new js.JQuery(s);
}
ActionListMaintainer.prototype = {
	refreshRoomInv: function() {
		var roomSel = JqEx.j("#room .selected");
		var toShow = null;
		if(roomSel.length > 0) toShow = roomSel.parent().attr("serial"); else if(Main.sel.currentRoomSelection != null) {
			toShow = Main.sel.currentRoomSelection;
			this.updateRoomListState(ALMRoomListState.DisplayRoomAction(Main.sel.currentRoomSelection));
		} else this.updateRoomListState(ALMRoomListState.DisplayNone);
		if(toShow == null) this.updateRoomListState(ALMRoomListState.DisplayNone); else if(Main.heroes.get(toShow) != null) this.updateRoomListState(ALMRoomListState.DisplayHeroAction(toShow)); else this.updateRoomListState(ALMRoomListState.DisplayRoomAction(toShow));
	}
	,refreshHeroInv: function() {
		var itemSel = JqEx.j("#myInventory .selected");
		if(itemSel.length <= 0) this.changeHeroListState(ALMHeroListState.DisplayHeroRoomActionActions); else this.changeHeroListState(ALMHeroListState.DisplayHeroItemActions(itemSel.parent().attr("serial")));
	}
	,refresh: function(force) {
		if(force == null) force = false;
		if(force) {
			this.heroState = null;
			this.roomState = null;
			this.roomWorking = false;
			this.heroWorking = false;
		}
		this.refreshHeroInv();
		this.refreshRoomInv();
	}
	,updateRoomListState: function(st) {
		var _g = this;
		var set = JqEx.j("#roomActionList1").add("#roomActionList2");
		if(this.roomState != null && Type.enumEq(this.roomState,st)) return;
		if(this.roomWorking) {
			if(this.roomState == null || this.roomState == ALMRoomListState.DisplayNone) {
				set.stop();
				this.roomWorking = false;
				this.updateRoomListState(st);
			} else null;
			return;
		}
		if(set.length > 0) {
			this.roomWorking = true;
			set.fadeTo(120,0,function() {
				var $e = (st);
				switch( $e[1] ) {
				case 0:
					var inSerial = $e[2];
					var pack = Main.heroes.get(inSerial);
					var tgt = JqEx.j("#roomActionList2");
					var src = JqEx.j(".cdActionRepository");
					var actions = src.find("[webdata=" + inSerial + "]").clone();
					tgt.html(actions);
					new js.JQuery("#cdItemActions").addClass("selectplayer");
					var tgth = JqEx.j("#roomActionList1");
					tgth.html("");
					tgth.parent().addClass("player");
					var htmlRes = new js.JQuery(".cdHeroSheet").clone();
					htmlRes.find(".cdFace").addClass("portrait_" + pack.dev_surname);
					htmlRes.find(".cdCharName").html(pack.name);
					htmlRes.find(".cdSkills").html(pack.skills.map(function(s) {
						return new Tag("li").append(new Tag("img").attr("src","/img/icons/skills/" + s.img + ".png")).tip(Utils.escapeJS(s.name),Utils.escapeJS(s.desc)).toString();
					}).join(""));
					var stCont = new js.JQuery(".cdStatusList");
					var content = new List();
					var $it0 = pack.statuses.iterator();
					while( $it0.hasNext() ) {
						var st1 = $it0.next();
						content.push(new Tag("li").append(new Tag("img").attr("src","/img/icons/ui/status/" + st1.img + ".png")).tip(Utils.escapeJS(st1.name),Utils.escapeJS(st1.desc)).toString());
					}
					var $it1 = pack.titles.iterator();
					while( $it1.hasNext() ) {
						var t = $it1.next();
						content.push(new Tag("li").append(new Tag("img").attr("src","/img/icons/ui/" + t.img + ".png")).tip(Utils.escapeJS(t.name),Utils.escapeJS(t.desc)).toString());
					}
					if(pack.spores != null) content.push(new Tag("span").append(new Tag("li").append(new Tag("img").attr("src",pack.spores.img))).content("x" + pack.spores.nb).toString());
					stCont.html(content.join(""));
					htmlRes.find(".cdStatusList").html(content.join(""));
					htmlRes.find(".presentation").html(pack.short_desc);
					if(pack.me) htmlRes.find(".cdEcoLink").hide();
					tgth.html(htmlRes.children());
					tgt.fadeTo(120,1);
					tgth.fadeTo(120,1);
					Main.tipAll();
					_g.roomWorking = false;
					break;
				case 1:
					var inSerial = $e[2];
					var tgt1 = JqEx.j("#roomActionList1");
					var tgt2 = JqEx.j("#roomActionList2");
					var src = JqEx.j(".cdActionRepository");
					var actions = src.find("[webdata=" + inSerial + "]").clone();
					new js.JQuery("#cdItemActions").removeClass("selectplayer");
					tgt1.parent().removeClass("player");
					tgt1.html(actions.filter(":even"));
					tgt2.html(actions.filter(":odd"));
					tgt1.fadeTo(120,1);
					tgt2.fadeTo(120,1);
					Main.tipAll();
					_g.roomWorking = false;
					break;
				case 2:
					var tgt1 = JqEx.j("#roomActionList1");
					var tgt2 = JqEx.j("#roomActionList2");
					tgt1.html("");
					tgt2.html("");
					_g.roomWorking = false;
					break;
				}
			});
		} else null;
	}
	,changeHeroListState: function(st) {
		var _g = this;
		if(this.roomState != null && Type.enumEq(this.heroState,st)) return;
		if(this.heroWorking) return;
		this.heroWorking = true;
		JqEx.j(".cdActionList").fadeTo(120,0,function() {
			_g.changeHeroListState2(st);
		});
	}
	,changeHeroListState2: function(st) {
		var _g = this;
		var $e = (st);
		switch( $e[1] ) {
		case 0:
			var tgt = JqEx.j(".cdActionList");
			var src = JqEx.j(".cdActionRepository .heroRoomActions").children().clone();
			tgt.html(src);
			JqEx.j(".cdActionList .move").hide();
			break;
		case 1:
			var serial = $e[2];
			var tgt = JqEx.j(".cdActionList");
			var src = JqEx.j(".cdActionRepository .heroSerialActions");
			var actions = src.children("[webdata=" + serial + "]").add(".cdActionRepository .heroSerialActions .cdReturnFromSelButton").clone();
			tgt.html(actions);
			Main.tipAll();
			JqEx.j(".cdActionList .move").hide();
			break;
		}
		this.heroState = st;
		JqEx.j(".cdActionList").hide().fadeTo(120,1,function() {
			_g.heroWorking = false;
		});
	}
	,__class__: ActionListMaintainer
}

var ArrayEx = function() { }
$hxClasses["ArrayEx"] = ArrayEx;
ArrayEx.__name__ = ["ArrayEx"];
ArrayEx.scramble = function(arr) {
	var _g1 = 0;
	var _g = 3 * (arr.length + Std.random(arr.length));
	while(_g1 < _g) {
		var x = _g1++;
		var b = Std.random(arr.length);
		var a = Std.random(arr.length);
		var temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}
	return arr;
}
ArrayEx.first = function(arr) {
	return arr[0];
}
ArrayEx.last = function(arr) {
	return arr[arr.length - 1];
}
ArrayEx.random = function(arr) {
	return arr[Std.random(arr.length)];
}
ArrayEx.reserve = function(n) {
	var r = new Array();
	r[n] = null;
	return r;
}
ArrayEx.rfind = function(arr,proc) {
	var res = null;
	var _g1 = 0;
	var _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		var idx = arr.length - i - 1;
		if(proc(arr[idx])) {
			res = arr[idx];
			break;
		}
	}
	return res;
}
ArrayEx.clear = function(arr) {
	arr.splice(0,arr.length);
}
ArrayEx.removeByIndex = function(arr,i) {
	arr.splice(i,1);
}
ArrayEx.enqueue = function(a,b) {
	var $it0 = $iterator(b)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		a.push(x);
	}
	return a;
}
ArrayEx.strip = function(a,f) {
	var top = a.length - 1;
	while(top >= 0) {
		if(f(a[top])) a.splice(top,1);
		top--;
	}
	return a;
}
ArrayEx.splat = function(arr,nb,e) {
	var _g = 0;
	while(_g < nb) {
		var i = _g++;
		arr.push(Reflect.copy(e));
	}
	return arr;
}
ArrayEx.wrap = function(arr,pre,post) {
	var r = [];
	var _g = 0;
	while(_g < arr.length) {
		var k = arr[_g];
		++_g;
		r.push(pre + Std.string(k) + post);
	}
	return r;
}
ArrayEx.bsearch = function(a,key,f) {
	var st = 0;
	var max = a.length;
	var index = -1;
	while(st < max) {
		index = st + max >> 1;
		var val = a[index];
		var cmp = f(key,val);
		if(cmp < 0) max = index; else if(cmp > 0) st = index + 1; else return val;
	}
	return null;
}
ArrayEx.except = function(it,exc) {
	return Lambda.filter(it,function(a) {
		return !Lambda.has(exc,a);
	});
}
ArrayEx.excepta = function(it,exc) {
	return Lambda.array(ArrayEx.except(it,exc));
}
ArrayEx.pushBack = function(l,e) {
	l.push(e);
	return e;
}
ArrayEx.pushFront = function(l,e) {
	l.unshift(e);
	return e;
}
ArrayEx.partition = function(it,predicate) {
	var p = new mt.gx.Pair([],[]);
	var _g = 0;
	while(_g < it.length) {
		var x = it[_g];
		++_g;
		if(predicate(x)) p.first.push(x); else p.second.push(x);
	}
	return p;
}
ArrayEx.removeLast = function(arr) {
	arr.pop();
}
ArrayEx.best = function(arr,f) {
	if(arr.length == 0) return null; else {
		var i = 0;
		var idx = 0;
		var _g1 = 0;
		var _g = arr.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(f(arr[idx]) < f(arr[i1])) idx = i1;
		}
		return arr[i];
	}
}
ArrayEx.bestNZ = function(arr,f) {
	if(arr.length == 0) return null; else {
		var cur = null;
		var idx = null;
		var _g1 = 0;
		var _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			var nv = f(arr[i]);
			if(nv != 0) {
				if(idx == null) {
					idx = i;
					cur = f(arr[idx]);
				} else if(nv > cur) {
					idx = i;
					cur = nv;
				}
			}
		}
		if(idx != null) return arr[idx]; else return null;
	}
}
ArrayEx.worstNZ = function(arr,f) {
	if(arr.length == 0) return null; else {
		var i = 0;
		var cur = 0;
		var idx = null;
		var _g1 = 0;
		var _g = arr.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			var nv = f(arr[i1]);
			if(nv != 0) {
				if(idx == null) {
					idx = 0;
					cur = f(arr[idx]);
				} else if(nv < cur) {
					idx = i1;
					cur = nv;
				}
			}
		}
		if(idx != null) return arr[idx]; else return null;
	}
}
ArrayEx.worst = function(arr,f) {
	if(arr.length == 0) return null; else {
		var i = 0;
		var idx = 0;
		var _g1 = 1;
		var _g = arr.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(f(arr[idx]) > f(arr[i1])) idx = i1;
		}
		return arr[i];
	}
}
ArrayEx.removeAll = function(a,f) {
	var _g = 0;
	var _g1 = a.slice();
	while(_g < _g1.length) {
		var d = _g1[_g];
		++_g;
		if(f(d)) HxOverrides.remove(a,d);
	}
}
var ChatType = $hxClasses["ChatType"] = { __ename__ : ["ChatType"], __constructs__ : ["Local","_Central","Mush","_Alert","Objectives","Wall","FavWall","Private0","Private1","Private2"] }
ChatType.Local = ["Local",0];
ChatType.Local.toString = $estr;
ChatType.Local.__enum__ = ChatType;
ChatType._Central = ["_Central",1];
ChatType._Central.toString = $estr;
ChatType._Central.__enum__ = ChatType;
ChatType.Mush = ["Mush",2];
ChatType.Mush.toString = $estr;
ChatType.Mush.__enum__ = ChatType;
ChatType._Alert = ["_Alert",3];
ChatType._Alert.toString = $estr;
ChatType._Alert.__enum__ = ChatType;
ChatType.Objectives = ["Objectives",4];
ChatType.Objectives.toString = $estr;
ChatType.Objectives.__enum__ = ChatType;
ChatType.Wall = ["Wall",5];
ChatType.Wall.toString = $estr;
ChatType.Wall.__enum__ = ChatType;
ChatType.FavWall = ["FavWall",6];
ChatType.FavWall.toString = $estr;
ChatType.FavWall.__enum__ = ChatType;
ChatType.Private0 = ["Private0",7];
ChatType.Private0.toString = $estr;
ChatType.Private0.__enum__ = ChatType;
ChatType.Private1 = ["Private1",8];
ChatType.Private1.toString = $estr;
ChatType.Private1.__enum__ = ChatType;
ChatType.Private2 = ["Private2",9];
ChatType.Private2.toString = $estr;
ChatType.Private2.__enum__ = ChatType;

mt.gx = {}
mt.gx.Pair = function(a,b) {
	this.first = a;
	this.second = b;
};

var Tag = function(n) {
	this.name = n;
	this.children = new List();
	this.att = new Array();
};
$hxClasses["Tag"] = Tag;
Tag.__name__ = ["Tag"];
Tag.attr2Html = function(s) {
	var l = s;
	var $it0 = Tag.hash2Attr.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		l = l.split(k).join(Tag.hash2Attr.get(k));
	}
	return l;
}
var Clients = $hxClasses["Clients"] = { __ename__ : ["Clients"], __constructs__ : ["ISO_MODULE"] }
Clients.ISO_MODULE = ["ISO_MODULE",0];
Clients.ISO_MODULE.toString = $estr;
Clients.ISO_MODULE.__enum__ = Clients;

Tag.prototype = {
	css: function(n,v) {
		this.att.push(new mt.gx.Pair("style","" + n + ":" + v + ";"));
	}
	,attr: function(n,c) {
		this.att.push(new mt.gx.Pair(n,c));
		return this;
	}
	,clone: function() {
		var cl = new Tag(this.name);
		cl.children = this.children.map(function(e) {
			switch(e[1]) {
			case 0:
				var s = e[2];
				return TagElem.Txt(s);
			case 1:
				var t = e[2];
				return TagElem.Tg(t.clone());
			}
		});
		cl.att = Lambda.fold(this.att,function(p,r) {
			r.push(new mt.gx.Pair(p.first,p.second));
			return r;
		},[]);
		return cl;
	}
	,content: function(str) {
		this.children.add(TagElem.Txt(str));
		return this;
	}
	,append: function(tg) {
		this.children.add(TagElem.Tg(tg));
		return this;
	}
	,format: function(c) {
		this.name = StdEx.format(this.name,c);
		this.children = this.children.map(function(e) {
			switch(e[1]) {
			case 0:
				var s = e[2];
				return TagElem.Txt(StdEx.format(s,c));
			case 1:
				var t = e[2];
				t.format(c);
				return TagElem.Tg(t);
			}
		});
		var _g = 0;
		var _g1 = this.att;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p.second = StdEx.format(p.second);
		}
	}
	,toString: function() {
		var _g = this;
		var listAttr = function() {
			var s = " ";
			var _g1 = 0;
			var _g2 = _g.att;
			while(_g1 < _g2.length) {
				var p = _g2[_g1];
				++_g1;
				s += " " + p.first + " =\"" + p.second + "\" ";
			}
			return s;
		};
		var s;
		s = "<" + this.name + " " + listAttr() + (this.children.length > 0?">":"/>");
		var $it0 = this.children.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			switch(c[1]) {
			case 1:
				var tg = c[2];
				s += tg.toString();
				break;
			case 0:
				var t = c[2];
				s += t;
				break;
			}
		}
		if(this.children.length > 0) s += "</" + this.name + ">";
		return s;
	}
	,htmlEscapeEx: function(s) {
		var l = s;
		var $it0 = Tag.escapeHash.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			l = l.split(k).join(Tag.escapeHash.get(k));
		}
		return StringTools.htmlEscape(l);
	}
	,tip: function(title,body) {
		if(body == null) body = "";
		this.attr("onmouseover","Main.showTip(this," + "'<div class=\\'tiptop\\' >" + "<div class=\\'tipbottom\\'>" + "<div class=\\'tipbg\\'>" + "<div class=\\'tipcontent\\'>" + "<h1>" + Tag.attr2Html(title) + "</h1>" + Tag.attr2Html(body) + "</div>" + "</div>" + "</div>" + "</div>')");
		this.attr("onmouseout","Main.hideTip()");
		return this;
	}
	,__class__: Tag
}
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
}
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		var value;
		var v = null;
		try {
			v = o[f];
		} catch( e ) {
		}
		value = v;
		o2[f] = value;
	}
	return o2;
}
var Selection = function() {
};
$hxClasses["Selection"] = Selection;
$hxExpose(Selection, "Selection");
Selection.__name__ = ["Selection"];
Selection.j = function(sel) {
	return new js.JQuery(sel);
}
Selection.attr2Html = function(s) {
	return s.split("\\'").join("'");
}
Selection.prototype = {
	hasSelection: function() {
		return this.currentInvSelection != null || this.currentRoomSelection != null;
	}
	,canSelect: function(serial) {
		var jinv = Selection.j(".inv");
		var jset = Selection.j("#roomActionList1").add(Selection.j("#roomActionList2"));
		return jset.length > 0 && jinv.length > 0;
	}
	,selectBySerial: function(serial) {
		js.Cookie.set(CrossConsts.COOK_SEL,StringTools.urlEncode(serial),3600);
		var jMe = Selection.j("[serial=" + serial + "]");
		var domMe = jMe.toArray()[0];
		if(jMe.parent().attr("id") == "myInventory") {
			var allItems = JqEx.j("#myInventory .item").not(".cdEmptySlot").add("[serverselected=true]");
			Selection.j(".cdCharColSel").remove();
			Selection.j("#myInventory .selected").parent().removeClass("on");
			Selection.j("#myInventory .selected").remove();
			jMe.addClass("on").prepend(new Tag("div").attr("class","selected").toString());
			var pre = Selection.j("<div class='action stSel cdCharColSel'> " + (function($this) {
				var $r;
				var s = jMe.data("name");
				$r = s.split("\\'").join("'");
				return $r;
			}(this)) + " :</div>");
			Selection.j(".cdHeroOne").prepend(pre);
			Lambda.iter(allItems.toArray(),function(h) {
				h.onclick = function(e) {
					Main.selectItem(h);
				};
			});
			if(domMe != null) domMe.onclick = function(e) {
				Main.cancelSelection(jMe);
			};
			this.currentInvSelection = serial;
			Main.acListMaintainer.refreshHeroInv();
		} else if(jMe.parent().attr("id") == "room") {
			var allItems = JqEx.j("#room .item").not(".cdEmptySlot");
			Selection.j("#room .selected").parent().removeClass("on");
			Selection.j("#room .selected").remove();
			jMe.addClass("on").prepend(new Tag("div").attr("class","selected").toString());
			var lit;
			var s = jMe.data("name");
			lit = s.split("\\'").join("'");
			Selection.j("#tt_itemname").html(lit);
			Lambda.iter(allItems.toArray(),function(h1) {
				h1.onclick = function(e) {
					Main.selectItem(h1);
				};
			});
			if(domMe != null) domMe.onclick = function(e) {
				Main.cancelSelection(jMe);
			};
			this.currentRoomSelection = serial;
			Main.acListMaintainer.refreshRoomInv();
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) {
				if(Main.closet.visible) prx._setBaseLine(CrossConsts.BASELINE_CLOSET); else prx._setBaseLine(CrossConsts.BASELINE_ACTIONS);
			}
			Selection.j(".inv").css("visibility","visible");
			Selection.j(".cdDistrib").addClass("placard_on");
		} else {
			this.currentRoomSelection = serial;
			Main.acListMaintainer.refreshRoomInv();
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(CrossConsts.BASELINE_ACTIONS);
			Selection.j(".inv").css("visibility","visible");
			Selection.j(".cdDistrib").addClass("placard_on");
		}
	}
	,selectItem: function(frm) {
		this.selectBySerial(frm.getAttribute("serial"));
	}
	,cancelSelection: function(node) {
		var doHeroInv;
		if(node != null) doHeroInv = node.parents("#myInventory").length > 0; else doHeroInv = true;
		var doRoomInv;
		if(node != null) doRoomInv = node.parents("#room").length > 0; else doRoomInv = true;
		if(doHeroInv) {
			js.Cookie.set(CrossConsts.COOK_SEL,null,3600);
			var allItems = Selection.j("#myInventory .item").not(".cdEmptySlot");
			Selection.j(".cdCharColSel").remove();
			Selection.j("#myInventory .selected").parent().removeClass("on");
			Selection.j("#myInventory .selected").remove();
			Lambda.iter(allItems.toArray(),function(h) {
				h.onclick = function(e) {
					Main.selectItem(h);
				};
			});
			this.currentInvSelection = null;
			Main.acListMaintainer.refreshHeroInv();
			null;
		}
		if(doRoomInv) {
			js.Cookie.set(CrossConsts.COOK_SEL,null,3600);
			var allItems = Selection.j("#room .item").not(".cdEmptySlot");
			Selection.j("#room .selected").parent().removeClass("on");
			Selection.j("#room .selected").remove();
			Selection.j("#tt_itemname").text("");
			Lambda.iter(allItems.toArray(),function(h1) {
				h1.onclick = function(e) {
					Main.selectItem(h1);
				};
			});
			this.currentRoomSelection = null;
			Main.acListMaintainer.refreshRoomInv();
			null;
		}
		if(!Main.closet.visible) {
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(439);
			Selection.j(".inv").css("visibility","hidden");
			Selection.j(".cdDistrib").removeClass("placard_on");
		}
	}
	,refreshSelection: function() {
		if(this.currentInvSelection != null) this.selectBySerial(this.currentInvSelection);
		if(this.currentRoomSelection != null) this.selectBySerial(this.currentRoomSelection);
	}
	,__class__: Selection
}
function $hxExpose(src, path) {
	var o = typeof window != "undefined" ? window : exports;
	var parts = path.split(".");
	for(var ii = 0; ii < parts.length-1; ++ii) {
		var p = parts[ii];
		if(typeof o[p] == "undefined") o[p] = {};
		o = o[p];
	}
	o[parts[parts.length-1]] = src;
}
// == /Redéfinition de fonctions  =======================================





// Script initialization
Main.k.initLang();
Main.k.Options.init();
Main.k.initData();
Main.k.displayMainMenu();

// If ingame
if (Main.k.playing && $("#topinfo_bar").length > 0) {
	Main.k.tabs.playing();

// Fix ending messages
} else if ($("#credits").length > 0) {
	Main.k.tabs.credits();

// Fix account page
} else if ($("#experience.cdTabTgt").length > 0) {
	Main.k.tabs.myprofile();

// Fix rankings
} else if ($("#ranking").length > 0) {
	Main.k.tabs.ranking();

// ExpPerma
} else if (Main.k.window.location.href.indexOf("expPerma") != -1) {
	Main.k.tabs.expPerma();

// Game over
} else if ($("#gameover").length > 0) {
	Main.k.tabs.gameover();

// Home
} else if ($("#mediaShow").length > 0) {
	$("#maincontainer, .boxcontainer").css("margin", "0 auto 0");
	$(".kmenu").css({
		position: "relative",
		top: "180px",
	});
	$("a.logostart").css("top", "20px");
}