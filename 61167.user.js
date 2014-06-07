// ==UserScript==
// @name           AntiGame
// @namespace      antikiller
// @description    A couple of Neogame functions for Ogame Redesign - v1.12.0
// @version	1.12.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

// Changelog:

/*
02.11.2009	v1.12.0
	+ Option added: Show unfolded Event list on Overview
	= Strings to translate:
		opt_showEventList: 'Show unfolded Event list on Overview'

02.11.2009	v1.11.1
	* ACS time is marked orange when the ACS will be slowed down and red when it's too late to join the ACS

02.11.2009	v1.11.0
	* New time processing after Ogame update

01.11.2009	v1.10.4
	* Support for HR servers

29.10.2009	v1.10.3
	* 'Set target to DF' logic changed - now it works independently on coords auto-insertion

28.10.2009	v1.10.2
	* 'Fix briefing layout' option is now universe-specific
	* Brifing layout changed to reach the desired effect at BG servers
	* Shortlinks ordering changed
	- Shortlinks didn't work at non-RU servers
	- Bug with storage capacity displaying

28.10.2009	v1.10.1
	- A few minor fixes
	= Strings to translate:
		lbl_sectionFleetDispatch: 'Fleet dispatch'
		(instead of incorrect lbl_sectionFleetDeparture in 1.10.0)
		
28.10.2009	v1.10.0
	+ Option added: Hide Moon picture
	+ Option added: Show ships capacity and speed
	+ Option added: Set target to DF if the fleet includes recyclers
	+ Option added: Fix briefing layout
	+ Option added: Target shortlinks
	+ Options added: Highlight players and alliances
	+ Option added: Keep server time for top-right Ogame clock
	+ Some options are now universe-specific
	+ Shows storage capacity
	* Plunder calculator shows alternative ships names to avoid problems with Speedsim
	- Antigame options button opened a new blank tab

	= Strings to translate:
		opt_fleet_showCapacity: 'Show ships capacity and speed',
		opt_fleet2_setTargetDF: 'Set target to DF if the fleet includes recyclers',
		opt_fleet2_fixLayout: 'Fix briefing layout',
		opt_fleet2_ShortLinks: 'Target shortlinks',
		lbl_sectionFleetDeparture: 'Fleet departure',
		opt_galaxyHideMoon: 'Hide Moon picture (display moon size instead)',
		lbl_optionsNote1: 'The option is stored for this universe only',
		opt_galaxy_Players: 'Highlight the following players',
		opt_galaxy_PlayerColors: 'Colors for player highlighting',
		opt_galaxy_Allys: 'Highlight the following alliances',
		opt_galaxy_AllyColors: 'Colors for alliance highlighting',
		opt_showServerOgameClock: 'Keep server time for top-right Ogame clock',
		lbl_shipSCargoAlt: 'SC',
		lbl_shipLCargoAlt: 'LC',
		lbl_shipRecyclerAlt: 'Recs',

// 19.10.2009	v1.9.0
//	+ Replaces Moon image with Moon:<moon size> text
//	= Strings to translate:
//		Interface.lbl_Moon: 'Moon'

// 19.10.2009	v1.8.4
//	- A bug with planet production in speed unis

// 18.10.2009	v1.8.3
//	- Missing energy doesn't require cargoes :)

// 18.10.2009	v1.8.2
//	* Mines production and reactor consumption calculated correctly for 42org (speed x2)
//	* Antigame version is displayed on 'Antigame' button
//	- Labels fixed for EN localizaton
//	- Now shows missing energy for GraviTech and Terraformer

// 17.10.2009	v1.8.1
//	- Bug with techs remembering in Opera

// 16.10.2009	v1.8.0
//	+ Shows production/consumption changes for new mines/plants
//	+ Shows speed for each type of ships on FLEET1 page
//	* Finish time is displayed on DEFENCE page
//  = Strings to translate:
//		Interface.lbl_MinSpeed: 'Minimal speed'
//		Interface.lbl_Production: 'Production',
//		Labels.lbl_RequiredEnergy: 'Energy required' - should be exactly the same as written at Mine building details

// 15.10.2009	v1.7.3
//	- Bugfix: PlunderThreshold/DebrisThreshold were not checked correctly against plunder in reports

// 14.10.2009	v1.7.2
//	* Missing resources now are not displayed for constructions already being in process
//	* Missing res layout slightly changed
//	- Bugfix: Extended res info at Statistics page
//	- Bugfix: Missing resources were calculated even if that type of resources was not present in the cost

// 14.10.2009	v1.7.1
//	+ Shows total res and needed cargoes on FLEET1 page even if there is no ships on the planet

// 14.10.2009	v1.7.0
//	+ Threshold for debris added
//	+ Option added: show boxes with resource information at the bottom of the left menu
//	* Missing resources view changed
//	* Some options window changes
//	- When coords were auto-inserted the target remained 'Moon' if the fleet was sent from the moon; now it is alway set to 'Planet'

// 12.10.2009	v1.7b0
//	+ Folding spy reports with theoretical plunder < threshold
//	+ Additional button: delete spy reports with theoretical plunder < threshold

// 12.10.2009	v1.6.3
//	- 'Mission color: Harvest' was listed twice in the options
//	- Missing resources were calculated incorrectly with values like 1.231kk
//	* Namespace changed in the header

// 10.10.2009	v1.6.2
//	+ Fleet ships are displayed in the message body for 'fleet returned' messages.

// 10.10.2009	v1.6.1
//	+ Tooltips added to message control buttons

// 10.10.2009	v1.6.0
//	+ Message control buttons on Messages page: Mark as read, Mark all as read, Delete, Delete all
//	* Messages processing optimized

// 09.10.2009	v1.5.1
// + Buttons instead of drop-down box in Messages

// 09.10.2009	v1.5.1
// - Bugfix: server language was detected as EN for servers like FI.OGAME.ORG

// 08.10.2009	v1.5.0
// * Got rid of DOM getElementsByClassName - works in Firefox 2.x now
// * Changed lbl_resourses to lbl_resourses in localization vars and the code
// * Finishing time is displayed in server timezone if showLocalTime is unset
// * Seconds in finishing time are according to server time
// + Shows ACS arrival time (fleet3 page)

// 07.10.2009	v1.4.2
//	- Real bugfix for Coords now :)

// 07.10.2009	v1.4.1
//	- Bugfix: Coords were auto-inserted each time even if they had already been set (non-Russian servers)
//	* SendFleet functions (fleet1/fleet2/fleet3 pages) now don't use getElementsByClassName any more

// 07.10.2009	v1.4.0
//	+ Option added: show deficient resources
//	+ Total resources on planet are shown at FLEET1 page together with total ships capacity
//	* runScript and runEventHandler are rewritten

// 05.10.2009	v1.3.4
//	- Time in battle reports (short view) was not changed to local

// 04.10.2009	v1.3.3
//	- Bug with server language setting

// 04.10.2009	v1.3.2
//	+ Loot/Debris section in spy reports translated
//	+ Check is added to avoid double executing of the script

// 03.10.2009	v1.3.1
//	- Bug with Harvest color

// 03.10.2009	v1.3
//	+ Language pack moved to a separate file (script). Main script contains RU and EN only
//	+ Language detection for all (I hope) official Ogame servers - thanks to Bontchev
//	+ Text boxes with color settings are highlighted with the corresponding color in Options window
//	* 'Until' label is removed due to problems on some servers

// 03.10.2009	v1.2
//	* Minor changes in language selection

// 03.10.2009	v1.2.b2
//	+ Shows local time in Event list
//	+ Interface language is set to server language if it is not found in the saved options
//	- Bug with player rank in Galaxy view at BG servers

// 02.10.2009	v1.2.b1
//	* Localization split into Labels (auto-selected for a server) and Interface
//	+ Bulgarian servers and interface language

// 02.10.2009	v1.1.1
//	- Bug with reversal time - now start time is retrieved prior to Server2Local changes

// 02.10.2009	v1.1
//	+ Servers with Redesign are recognized
//	+ Option added: Show ranks in Galaxy view
//  + Option added: Rank color (only for players with rank>800 and alliances)
//	+ Option added: Show reversal time (now it is separated from "expand fleets" feature)
//  + Shows local time in Messages
//	+ Autodetection of server language
//	* Improved 'fleetDetails' node selecting (use XPath now)
//	* Current planet highlighting (Galaxy) now works with both address formats
//	- Debris calculation in spy reports - solar satellite was missing
//	- 'Language' option removed
//

// 01.10.2009	v1.0
//	Initial release
*/


(function () {
	var version = '1.12.0';
	
	var mywindow;
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (mywindow.AntiGame_started) return;
	mywindow.AntiGame_started = 1;
	
	var AntiGame_lang = {};
	
AntiGame_lang.LabelsFR =
    {
	lbl_missAttack: 'Attaquer',
	lbl_missColony: 'Coloniser',
	lbl_missDeploy: 'Déployer',
	lbl_missDestroy: 'Détruire une lune',
	lbl_missEspionage: 'Espionner',
	lbl_missExpedition: 'Expédition',
	lbl_missFederation: 'Attaque ACS',
	lbl_missHarvest: 'Recycler',
	lbl_missHold: 'Défendre ACS',
	lbl_missTransport: 'Transporter',
		
	lbl_shipSCargo: 'Transporteur léger',
	lbl_shipLCargo: 'Transporteur lourd',
	lbl_shipLFighter: 'Chasseur léger',
	lbl_shipHFighter: 'Chasseur lourd',
	lbl_shipCruiser: 'Croiseur',
	lbl_shipBattleship: 'Vaisseau de bataille',
	lbl_shipColonizator: 'Vaisseau de colonisation',
	lbl_shipRecycler: 'Recycleur',
	lbl_shipSpy: 'Sonde d\'espionnage',
	lbl_shipBomber: 'Bombardier',
	lbl_shipDestroyer: 'Destructeur',
	lbl_shipRIP: 'Étoile de la mort',
	lbl_shipBCruiser: 'Vaisseau de bataille',
	lbl_shipSatellite: 'Satellite solaire',
		
	lbl_RequiredEnergy: 'Energie requise'
		
}

AntiGame_lang.InterfaceFR =
{
	opt_languageName: 'Français',

	opt_title: 'Options AntiGame',
	opt_btnOk: 'OK',
	opt_btnCancel: 'Annuler',
	opt_btnDefault: 'Par défaut',

	opt_language: 'Langage',
	opt_autocopyCoords: 'Copier automatiquement les coordonnées',
	opt_showLocalTime: "Afficher l'heure locale plutôt que l'heure du serveur (les heures seulement)",
	opt_showServerOgameClock: 'Gardez les heures du serveur ogame pour l\'horloge en haut à droite',
	opt_blockAutoComplete: 'Bloquer l\'auto-complétion dans firefox',
	opt_showEventList: 'Montrer les évenements complets dans la vue Générale',
		
	opt_galaxyShowRank: 'Afficher le rang des joueurs/alliances dans la vue Galaxie',
	opt_galaxyRankColor: 'Couleur des rangs Joueur/alliance',
	opt_galaxyDebrisMin: 'Taille minimale pour surligner les débris (0 pour désactiver)',
	opt_galaxyDebrisColor: 'Couleur des débris surlignés',
	opt_galaxyHideMoon: 'Cacher les photos de la Lune (Taille de lune a la place)',
	opt_galaxy_Players: 'Mettez en surbrillance les joueurs suivants',
	opt_galaxy_PlayerColors: 'Couleurs du joueur en soulignant',
	opt_galaxy_Allys: 'Mettez en surbrillance les alliances suivant',
	opt_galaxy_AllyColors: 'Couleurs pour une alliance en soulignant',
		
	opt_msg_PlunderThreshold: 'Taille minimale pour pillage théorique (en K)',
	opt_msg_DebrisThreshold: 'Taille minimale pour recyclage théorique (en K)',
	opt_msg_foldSmallPlunder: 'Pliez les rapports avec le pillage et les débris inférieurs à la limite',
	opt_msg_showPlunder: 'Afficher le pillage dans les rapports d\'espionnage',
	opt_msg_addButtons: 'Ajouter des boutons pour les messages',
	opt_msg_fixColors: 'Fixer la couleur des rapports de combat',  
		
	opt_showDeficient: 'Afficher les ressources manquantes',
	opt_showResources: 'Afficher les informations de ressources avancées',
	
	opt_fleet_showCapacity: 'Montrer la capacité et la vitesse des vaisseaux',
	opt_fleet2_setTargetDF: 'Objectif fixé à DF, si la flotte comprend les recycleurs',
	opt_fleet2_fixLayout: 'Correction d\'information mise en page',
	opt_fleet2_ShortLinks: 'Raccourci de cibles',
		
	opt_missionPriority: 'Priorité des missions',
		
	opt_mvmt_expandFleets: 'Montrez la flotte et la cargaison de celle-ci',
	opt_mvmt_showReversal: 'Afficher le temps inversé pour les flottes',
		
	opt_missAttack: 'Couleur de mission: Attaquer',  
	opt_missColony: 'Couleur de mission: Coloniser',  
	opt_missDeploy: 'Couleur de mission: Déployer', 
	opt_missDestroy: 'Couleur de mission: Détruire',  
	opt_missEspionage: 'Couleur de mission: Espionner',   
	opt_missExpedition: 'Couleur de mission: Expédition', 
	opt_missFederation: 'Couleur de mission: Fédération',  
	opt_missHarvest: 'Couleur de mission: Recycler', 
	opt_missHold: 'Couleur de mission: Soutenir',   
	opt_missTransport: 'Couleur de mission: Transporter',
		
	// these label are shown in Options
	lbl_missAttack: 'Attaquer',  
	lbl_missColony: 'Coloniser',  
	lbl_missDeploy: 'Stationner',  
	lbl_missDestroy: 'Détruire',  	
	lbl_missEspionage: 'Espionner',  
	lbl_missExpedition: 'Expédition',  
	lbl_missFederation: 'Attaque de fédération',  
	lbl_missHarvest: 'Recycler',  
	lbl_missHold: 'Soutenir',  
	lbl_missTransport: 'Transporter',  
	//
		
	lbl_sectionGeneral: 'Général',
	lbl_sectionGalaxy: 'Galaxie',
	lbl_sectionMessages: 'Messages',
	lbl_sectionFleetMovement: 'Mouvements de flotte',
			
	lbl_TotalCapacity: 'Capacité totale',
	lbl_MinSpeed: 'Vitesse minimale',
	lbl_mvmt_Return: 'R',
	lbl_mvmt_Expedition: 'E',
		
	lbl_resources: 'Ressources',
	lbl_debris: 'Débris',
	lbl_total: 'Total',
	lbl_loot: 'Butin',
	lbl_metal: 'Métal',
	lbl_crystal: 'Cristal',
		

	lbl_deficientRes: 'Ressources manquantes',
	lbl_Production: 'Production',
	lbl_ArrivalACS: 'Arrivée (ACS)',
		
	lbl_btnMarkReadAll: 'Marquer tous les messages sélectionnés comme lus',
	lbl_btnDeleteSmallPlunder: 'Supprimer les rapports d\'espionnage avec pillage < $plunder et débris < $debris'
	}

	var Options =
	{
		blockAutoComplete: true,
		showLocalTime: true,
		showServerOgameClock: false,
		showFinishTime: true,
		showDeficient : true,
		showResources : true,
		
		showEventList: true,
		
		// 1 - attack
		// 2 - federation
		// 3 - transport
		// 4 - deploy
		// 5 - hold
		// 6 - espionage
		// 7 - colonization
		// 8 - recycle
		// 9 - destroy
		// 15 - expedition
		mission1: 6,
		mission2: 1,
		mission3: 4,
		mission4: 3,
		mission5: 9,
		
		missAttack: '#66CC33',
		missColony: '#C1C1C1',
		missDeploy: '#666666',
		missDestroy: '#FFFF99',
		missEspionage: '#FFCC66',
		missExpedition: '#5555BB',
		missFederation: '#CC6666',
		missHarvest: '#CEFF68',
		missHold: '#80A0C0',
		missTransport: '#A0FFA0',
		missMissile: '#FFCC66',
		
		mvmt_expandFleets: true,
		mvmt_showReversal: true,
		
		fleet_showCapacity: true,
		fleet2_fixLayout: true,
		autocopyCoords: true,
		fleet2_setTargetDF: false,
		fleet2_ShortLinks: "1#1#2#3#Legor's moon",

		galaxyShowRank: true,
		galaxyRankColor: '#DDDDDD',

		galaxyRank10: '#FFFF40',
		galaxyRank50: '#FFDF00',
		galaxyRank100: '#FFBF00',
		galaxyRank200: '#FF8F00',
		galaxyRank800: '#33FF33',
		galaxyRank0: '#305060',

		galaxyDebrisMin: 10000,
		galaxyDebrisColor: '#FF0000',
		galaxyHideMoon: false,
		
		galaxy_Players: 'Legor,player 2',
		galaxy_PlayerColors: '#FF0000,#2222FF',
		galaxy_Allys: 'alliance 1,alliance 2',
		galaxy_AllyColors: '#FF00FF,#00FFFF',
		
		msg_PlunderThreshold: 10,
		msg_DebrisThreshold: 20,
		msg_foldSmallPlunder: true,
		msg_showPlunder: true,
		msg_fixColors: true,
		msg_addButtons: true,

		language: '',
		Labels: null,
		Interface: null,
		
		uni_options: 
		{
			fleet2_ShortLinks:1, galaxyDebrisMin:1, msg_PlunderThreshold:1, msg_DebrisThreshold:1, 
			galaxy_Players:1, galaxy_PlayerColors:1, galaxy_Allys:1, galaxy_AllyColors:1, fleet2_fixLayout:1
		},
		
		firefox_options: 
		{
			fleet2_setTargetDF:1
		},

		saveOptions: function()
		{
			try {
				var str = '';
				var str_uni = '';

				for (var i in Options) {
					var param = Options[i];
					if (this.firefox_options[i] && !Utils.isFirefox) continue;
					
					var type = typeof(param);
					if (type == 'number' || type == 'string' || type == 'boolean') {
					
						// uni-specific options
						if (this.uni_options[i]) {
							if (str_uni != '') str_uni +='&';
							str_uni += i+'='+param;
						}
						
						// global options
						else {
							if (str != '') str +='&';
							str += i+'='+param;
						}
					}
				}
				
				if (Utils.isFirefox){
					Utils.setValue('antigame', str);
					Utils.setValueUni('antigame', str_uni);
				}
				else {
					str += '&' + str_uni;
					Utils.setValue('antigame', str);
				}
			}
			catch (e) { Utils.log(e); }
		},
		
		loadOptions: function()
		{
			try {
				var str = Utils.getValue('antigame');
				if (!str) return;
				
				var str_uni = Utils.getValueUni('antigame');
				if (str_uni) str += '&' + str_uni;
				
				str = str.split('&');

				for (var i=0; i<str.length; i++) {
					var pair = str[i].split('=');
					if (!pair || pair.length != 2) continue;

					var param = Options[pair[0]];
					switch (typeof(param))
					{
						case('number'): Options[pair[0]] = parseInt(pair[1],10); break;
						case('string'): Options[pair[0]] = pair[1]; break;
						case('boolean'): Options[pair[0]] = (pair[1]=='true' ? true: false); break;
						default: ;
					}
				}
			}
			catch (e) { Utils.log(e); }

		},
		
		setOptionWithValidation: function(name, value)
		{
			var oldtype = this.getValueType(Options[name]);
			var newtype = this.getValueType(value);
			var ok = false;

			if (name=='galaxy_PlayerColors' || name=='galaxy_AllyColors') {
				ok = true;
			}
			else if ( (oldtype != 'number' && oldtype != 'color') || oldtype == newtype )
			{	
				if (oldtype == 'color')
					value = value.toUpperCase();
				
				ok = true;
			}
			
			if (ok) Options[name] = value;
		},
		
		getValueType: function(value)
		{
			if (!value) return typeof(value);
			
			var val = value.toString();
			
			if ( val.replace(/\d{1,10}/i, '') == '' ) return 'number';
			if ( val.replace(/#[A-F\d]{6,6}/i, '') == '' ) return 'color';
			
			return 'string';
		},
		
		insertCSSRules: function()
		{
			Utils.insertCSSRule('#anti_options_window { \
				position:absolute; \
				left: 200px; \
				top:100px; \
				width:600px; \
				background:#202025; \
				border: 1px solid #555555; \
				z-index:1000; \
				}');

			Utils.insertCSSRule('#anti_options_window div[id] { ' +
				'padding: 10px; ' +
				'}');
				
			Utils.insertCSSRule('#anti_options_window div#note { \
				text-align: left; \
				padding-bottom: 0; \
				font-size: 10px; \
				}');
				
			Utils.insertCSSRule('#anti_options_window span.notemark, div#note { \
				color: #3344CC; \
				}');

			Utils.insertCSSRule('#anti_options_window #content { \
				text-align: left; \
				max-height: 400px; \
				overflow:auto; \
				border-top: 1px #555555 dashed; \
				border-bottom: 1px #555555 dashed; \
				}');
				
			Utils.insertCSSRule('#anti_options_window #content .sectiontitle {\
				text-align: center;\
				border: 1px solid #772277;\
				}');

			Utils.insertCSSRule('#anti_options_window .section table {\
				width: 100%;\
				}');

			Utils.insertCSSRule('#anti_options_window .section td.input {\
				width: 20em;\
				}');


			Utils.insertCSSRule('#anti_options_window #content td { ' +
				'padding: 0.2em;' +
				'text-align: left;' +
				'font-size: 11px;' +
				'}');

			Utils.insertCSSRule('#anti_options_window input[type="text"] { ' +
				'width: 8em;' +
				'}');
				
			Utils.insertCSSRule('#anti_options_window input[type="text"].long { ' +
				'width: 18em;' +
				'}');
				
			Utils.insertCSSRule('#anti_options_window option { ' +
				'width: 7em;' +
				'}');


			Utils.insertCSSRule('.anti_button { \
				display: block; \
				float: left; \
				width: 50px; \
				background:#442233; \
				border: 2px black solid; \
				text-decoration: none; \
				margin: 0px 5px; \
				padding: 2px 5px; \
				}');
			Utils.insertCSSRule('.anti_button:hover { \
				background:#664466; \
				}');
		},

		addOptionsButton: function()
		{
			try {
				var $ = Utils.unsafeWindow.$;
				var item = $('#menuTable li:last').clone(true);
				
				item.find('.menu_icon').remove();
				item.find('.menubutton')
					.attr('href','javascript:void(0)')
					.attr('id','btnAntiOptions')
					.attr('target','_self')
					.bind('click', Options.showWindow)
					.find('.textlabel').html('Antigame v'+version);
				item.appendTo('#menuTable');
			}
			catch (e) { Utils.log(e); }
		},

		hideWindow: function(save)
		{
			try {
				var $ = Utils.unsafeWindow.$;
				
				if (save) {
					var inputs = $('#anti_options_window input, #anti_options_window select');

					for (var i=0; i<inputs.length; i++) {
						var item = inputs.eq(i);
						var id = item.attr('id');
						var param = Options[id];

						if (typeof(param) == 'boolean')
							Options[id] = item.attr('checked');

						else if ( (typeof(param) == 'string' || typeof(param) == 'number') ) {
							Options.setOptionWithValidation(id, item.attr('value'))
						}
					}
					
					Options.saveOptions();
				}

				$('#anti_options_window').addClass('hidden');
			}
			catch (e) { Utils.log(e); }
		},

		showWindow: function()
		{
			try {
				var $ = Utils.unsafeWindow.$;
				
				if ($('#anti_options_window').length == 0) Options.createWindow();

				var inputs = $('#anti_options_window input, #anti_options_window select');
				
				for (var i=0; i<inputs.length; i++) {
					var item = inputs.eq(i);
					var param = Options[item.attr('id')];
					
					if (typeof(param) == 'boolean' && param)
						item.attr('checked', param);

					else if ( (typeof(param) == 'string' || typeof(param) == 'number') )
						item.attr('value', param);
				}

				$('#anti_options_window .color').trigger('keyup');

				$('#anti_options_window').removeClass('hidden');
			}
			catch (e) { Utils.log(e); }
		},

		changeInputColor: function(e)
		{
			try {
				var value = e.target.value.split(',').pop();
				if (Options.getValueType(value) == 'color')
					e.target.style.backgroundColor = value;
			}
			catch (e) {Utils.log(e); }
			return true;
		},

		createWindow: function()
		{
			var notemark = '<span class="notemark">(*)</span>';
			function createButton(id) {
				var str = '<a class="anti_button" id="'+id+'" href="javascript:void(0)">'+Options.Interface['opt_'+id]+'</a>';
				return str;
			}
			
			function addItem(label, content, newrow) {
				if(typeof(newrow) == 'undefined') newrow = true;

				var str = '<td class="label">'+label+'</td><td class="input">'+content+'</td>';
				if (newrow) str = '<tr>' + str + '</tr>';

				return str;
			}

			function createSelect(id, options, label, newrow) {
				if(typeof(newrow) == 'undefined') newrow = true;
				if(typeof(label) == 'undefined' || label == '-auto-') label = Options.Interface['opt_'+id];

				var str = '';

				for (var i=0; i<options.length; i++) {
					str += '<option value="'+options[i].value+'">'+options[i].text+'</option>';
				}

				str = '<select id="'+id+'">' + str + '</select>';
				str = addItem(label, str, newrow);
				return str;
			}

			function createInput(id,label,newrow) {
				if (Options.firefox_options[id] && !Utils.isFirefox) return;
				
				var param = Options[id];
				var type, class_attr='';
				if (typeof(param)=='boolean') type = 'checkbox';
				if ((typeof(param) == 'string' || typeof(param) == 'number') ) type = 'text';

				if(!type) return;
				
				if (id == 'galaxy_PlayerColors' || id == 'galaxy_AllyColors') class_attr = 'class="color long"';
				else if (Options.getValueType(param) == 'color') class_attr = 'class="color"';
				else if (typeof(param) == 'string') class_attr = 'class="long"';

				if(typeof(newrow) == 'undefined') newrow = true;
				
				if(typeof(label) == 'undefined' || label == '-auto-') label = Options.Interface['opt_'+id];
				if (Options.uni_options[id]) label += ' ' + notemark;
				
				var str = addItem(label, '<input id="'+id+'" type="'+type+'" '+class_attr+'>', newrow);
				return str;
			}
			
			function startSection(title, classname) {
				classname = classname || '';
				classname += ' section';
				var str = '<div class="'+classname+'"><table>';
				if (title) str += '<tr><td colspan="4" class="sectiontitle">'+title+'</td></tr>';
				
				return str;
			}

			function endSection() {
				return '</table></div>';
			}

			var $ = Utils.unsafeWindow.$;
			
			var missions = [
				{value:1, text:Options.Interface.lbl_missAttack},
				{value:3, text:Options.Interface.lbl_missTransport},
				{value:4, text:Options.Interface.lbl_missDeploy},
				{value:5, text:Options.Interface.lbl_missHold},
				{value:6, text:Options.Interface.lbl_missEspionage},
				{value:9, text:Options.Interface.lbl_missDestroy},
				];
				
			var language_list = [];
			for (var i in AntiGame_lang) {
				var str = i.toString().match(/^Interface([A-Z]{2,3})$/);
				if (str)
					language_list.push( {value: str[1], text: AntiGame_lang[i].opt_languageName} );
			}

			missions.sort( function (a,b) { return (a.text==b.text) ? 0 :  (a.text<b.text) ? -1 : 1 } );

			var div = document.createElement('div');
			div.className = 'hidden';
			div.id = 'anti_options_window';
			div.innerHTML =
				'<div id="title">'+Options.Interface.opt_title+'</div>' + 
				'<div id="content">' +
				startSection(Options.Interface.lbl_sectionGeneral) +
					createSelect('language', language_list) +
					createInput('showLocalTime') +
					createInput('showServerOgameClock') +
					createInput('blockAutoComplete') +
					createInput('showResources') +
					createInput('showDeficient') +
					createInput('showEventList') +
				endSection() +
				startSection(Options.Interface.lbl_sectionGalaxy) +
					createInput('galaxyShowRank') +
					createInput('galaxyRankColor') +
					createInput('galaxyDebrisMin') +
					createInput('galaxyDebrisColor') +
					createInput('galaxyHideMoon') +
					createInput('galaxy_Players') +
					createInput('galaxy_PlayerColors') +
					createInput('galaxy_Allys') +
					createInput('galaxy_AllyColors') +
				endSection() +
				startSection(Options.Interface.lbl_sectionMessages) +
					createInput('msg_PlunderThreshold') +
					createInput('msg_DebrisThreshold') +
					createInput('msg_foldSmallPlunder') +
					createInput('msg_showPlunder') +
					createInput('msg_addButtons') +
					createInput('msg_fixColors') +
				endSection() +
				startSection(Options.Interface.lbl_sectionFleetDispatch) +
					createInput('fleet_showCapacity') +
					createInput('autocopyCoords') +
					createInput('fleet2_setTargetDF') +
					createInput('fleet2_fixLayout') +
					createInput('fleet2_ShortLinks') +
					createSelect('mission1', missions, Options.Interface.opt_missionPriority) +
					createSelect('mission2', missions, '') +
					createSelect('mission3', missions, '') +
					createSelect('mission4', missions, '') +
					createSelect('mission5', missions, '') +
				endSection() +
				startSection(Options.Interface.lbl_sectionFleetMovement) +
					createInput('mvmt_expandFleets') +
					createInput('mvmt_showReversal') +
					createInput('missAttack') +
					createInput('missColony') +
					createInput('missDeploy') +
					createInput('missDestroy') +
					createInput('missEspionage') +
					createInput('missExpedition') +
					createInput('missFederation') +
					createInput('missHarvest') +
					createInput('missHold') +
					createInput('missTransport') +
				endSection() +
				'</div>' +
				'<div id="note"> ' + notemark + ' ' + this.Interface.lbl_optionsNote1 + ' (Firefox)</div>' +
				'<div id="control">' + 
					createButton('btnOk') + createButton('btnCancel') + 
				'<div style="clear:both; padding: 0px"></div></div>';
			document.body.appendChild(div);
			
			$('#btnOk').bind('click', function() { setTimeout( function () {Options.hideWindow(true);}, 0)} );
			$('#btnCancel').bind('click', function() { Options.hideWindow(false);} );
			$('#anti_options_window .color')
				.bind('change', Options.changeInputColor)
				.bind('keyup', Options.changeInputColor);
		},
		
		copyMissingProperties: function(src, parent, strChild)
		{
			var dst = parent[strChild];
			if (!dst) {
				parent[strChild] = src;
				return;
			}
			
			if (src === dst) return;

			for (i in src) {
				if ( !dst[i] || typeof(src[i]) != typeof(dst[i]) )
					dst[i] = src[i];
			}
		},

		readResLabels: function()
		{
			function getValueFromId(id) {
				var node = document.getElementById(id);
				if (!node || !node.title) return;
				
				return node.title.match(/\|<B>\s*(.+):\s*<\/B>/i)[1];
			}
			
			this.Labels.lbl_metal = getValueFromId('metal_box');
			this.Labels.lbl_crystal = getValueFromId('crystal_box');
			this.Labels.lbl_deuterium = getValueFromId('deuterium_box');
			this.Labels.lbl_energy = getValueFromId('energy_box');
		},

		initLang: function()
		{
			if (!this.language) this.language = Utils.server_lang;
			
			var external_langpack = Utils.unsafeWindow.AntiGame_lang;
			if (external_langpack)
				for (var i in external_langpack)
					AntiGame_lang[i] = external_langpack[i];

			this.Interface = AntiGame_lang['Interface'+this.language];
			this.Labels = AntiGame_lang['Labels'+Utils.server_lang];
						
			this.copyMissingProperties(AntiGame_lang.LabelsEN, this, 'Labels');
			this.copyMissingProperties(AntiGame_lang.InterfaceEN, this, 'Interface');
			
			this.readResLabels();
		},

		Init: function()
		{
			this.insertCSSRules();
			this.loadOptions();
			
			this.initLang();
			this.addOptionsButton();
			
			this.Interface.lbl_btnDeleteSmallPlunder = this.Interface.lbl_btnDeleteSmallPlunder
				.replace( '$plunder', Utils.formatNumber(this.msg_PlunderThreshold*1000) )
				.replace( '$debris', Utils.formatNumber(this.msg_DebrisThreshold*1000) )
				;

		}
	}


	// =======================================================================
	// Date/Time functions
	// =======================================================================

	var DateTime = 
	{
		TimeDelta: 0,
		TimeZoneDelta: 0,
		InitialServerTime: 0,

		getTimeDelta: function()
		{
			if (Utils.isCurrentPage('showmessage,eventList'))
			{
				this.TimeZoneDelta = parseInt(Utils.getValueUni('TimeZoneDelta', 0), 10);
				return;
			}

			this.TimeDelta = 0;
			if (!Utils.script) return;

			this.InitialServerTime = Utils.unsafeWindow.serverTime;

			if (!this.InitialServerTime) return;
			this.InitialServerTime = this.InitialServerTime.getTime();

			var now = new Date();

			// server time (using current timezone) - local time
			this.TimeDelta = now.getTime() - this.InitialServerTime;

			// timezone correction
			this.TimeZoneDelta = - ( now.getTimezoneOffset()/60 + Utils.unsafeWindow.TimezoneOffset ) *60*60*1000;

			if (!Utils.isCurrentPage('showmessage,eventList'))
				Utils.setValueUni('TimeZoneDelta', this.TimeZoneDelta);
		},

		LZ: function(x)
		{
			return (x<0||x>9?"":"0") + x;
		},

		getDatePart: function (date)
		{ 
			return Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()); 
		},
		
		getFinishTime: function(tick)
		{
			var date = new Date();
			date.setTime(this.InitialServerTime + parseInt(tick)*1000, 10);
			return date;
		},
		
		formatDate: function (date, format)
		{
			var str = "";
			try {
				if (!format || format=="") {
					format = '[H]:[i]:[s]';
					var now = new Date();

					if (this.getDatePart(now) != this.getDatePart(date) )
						format = '[d]/[m] ' + format;
				}
				
				var str = format;
				
				str = str.replace("[d]",this.LZ(date.getDate()));
				str = str.replace("[m]", this.LZ(date.getMonth()+1));
				str = str.replace("[Y]", date.getFullYear());
				str = str.replace("[y]", date.getFullYear().toString().substr(2,4));
				str = str.replace("[H]", this.LZ(date.getHours()));
				str = str.replace("[i]", this.LZ(date.getMinutes()));
				str = str.replace("[s]",this.LZ(date.getSeconds()));
			}
			catch (e) { Utils.log(e); }

			return str;
		},
		
		formatDate2: function (date, format)
		{
			if (Options.showLocalTime)
				return DateTime.formatDate(date, format);
			else
				return DateTime.formatDateServer(date, format);
		},
		
		formatDateServer: function (date, format)
		{
			if (!format || format=="") {
				format = '[H]:[i]:[s]';
				var now = new Date();

				if (this.getDatePart(now) != this.getDatePart(date) )
					format = '[d]/[m] ' + format;
			}

			
			date.setTime (date.getTime() - this.TimeZoneDelta );
			return DateTime.formatDate( date, format);
		},
		
		parseTime: function (strTime)
		{
			if (!strTime) return 0;
			
			strTime = strTime.replace(/[^0-9:]/,'');
			var parts = strTime.split(':');
			
			if (!parts || parts.length != 3) return 0;
			
			return (parseInt(parts[0],10)*60*60 + parseInt(parts[1],10)*60 + parseInt(parts[2],10)) * 1000;
		},

		// d = day, m = month, y = year (2 digits), Y = year (4 digits), H = hour (2 digits), i = minutes, s = seconds
		parse: function (strDate, format)
		{
			strDate = strDate.toString();
			var str = format.match(/\[[dmyYHis]\]/g);
			
			if (!str || !str.length) return null;

			var rx = format;
			rx = rx.replace(/\./g,'\\.');
			rx = rx.replace(/\//g,'\\/');
			rx = rx.replace(/\-/g,'\\-');
			
			var index = {};

			for (var i=0; i<str.length; i++) {
				var token = str[i];
				if (token == '[Y]') rx = rx.replace(token, '(\\d{4,4})');
				else if (token == '[y]') rx = rx.replace(token, '(\\d{2,2})');
				else rx = rx.replace(token, '(\\d{1,2})');

				token = token.substr(1,1);
				index[token] = i+1;
			}
			
			str = strDate.match(new RegExp(rx, ''));
			
			
			if (!str || !str.length) return null;
			
			
			var date = new Date();
			date.setSeconds(0); date.setMinutes(0); date.setHours(0);
			
			if (str[index.s]) date.setSeconds(str[index.s]);
			if (str[index.i]) date.setMinutes(str[index.i]);
			if (str[index.H]) date.setHours(str[index.H]);
			
			if (str[index.Y]) date.setFullYear(str[index.Y]);
			else if (str[index.y]) {
				var year = date.getFullYear();
				year = Math.floor(year / 100) * 100 + str[index.y];
				if (year > date.getFullYear()) year -= 100;
				date.setFullYear(year);
			}
			
			if (str[index.m]) date.setMonth(str[index.m] - 1);
			if (str[index.d]) date.setDate(str[index.d]);
			
			return date;
		},
		
		parse2: function(strDate, timeFormat, dateFormat)
		{
			if (!strDate) return null;
			
			if (!timeFormat) {
				timeFormat = '[H]:[i]:[s]';
				dateFormat = '[d].[m].[Y]';
			}

			var str = strDate.toString();

			if (!dateFormat)
			{
				return this.parse(str, timeFormat, true);
			}
			else 
			{
				var time = this.parse(str, timeFormat);
				var date = this.parse(str, dateFormat);

				if (!date && !time) return null;

				var newDate = new Date();

				if (date) {
					newDate.setFullYear(date.getFullYear());
					newDate.setMonth(date.getMonth());
					newDate.setDate(date.getDate());
				}

				if (time) {
					newDate.setHours(time.getHours());
					newDate.setMinutes(time.getMinutes());
					newDate.setSeconds(time.getSeconds());
				}
				
				return newDate;
			}
		},
		
		convertDateServer2Local: function(date)
		{
			var newDate = new Date();
			newDate.setTime( date.getTime() + this.TimeZoneDelta );
			return newDate;
		},
		
		convertStringServer2Local: function (strDate, timeFormat, dateFormat)
		{
			if (!timeFormat) {
				timeFormat = '[H]:[i]:[s]';
				dateFormat = '[d].[m].[Y]';
			}

			var oldDate = this.parse2(strDate, timeFormat, dateFormat);
			if (!oldDate) return strDate;

			var newDate = this.convertDateServer2Local(oldDate);
			
			var str = strDate.toString();
			str = str.replace(this.formatDate(oldDate,timeFormat), this.formatDate(newDate,timeFormat));
			
			if (dateFormat) str = str.replace(this.formatDate(oldDate,dateFormat), this.formatDate(newDate,dateFormat));
			
			return str;
		},
		
		changeOgameClocks2Server: function()
		{
			var code = ' \
				function UhrzeitAnzeigen() { \
				var Sekunden = serverTime.getSeconds(); \
				serverTime.setSeconds(Sekunden+1); \
				Uhrzeitanzeige = getFormatedDate(serverTime.getTime() - ' + this.TimeZoneDelta + ', "[d].[m].[Y] <span>[H]:[i]:[s]</span>"); \
				if(document.getElementById) \
					document.getElementById("OGameClock").innerHTML = Uhrzeitanzeige; \
				else if(document.all) \
					Uhrzeit.innerHTML = Uhrzeitanzeige; \
				} ';
				
			Utils.runScript(code);
		},
		
		Init: function()
		{
			this.getTimeDelta();
			
			//if (Options.showLocalTime)
			//	this.changeOgameClocks2Local();
			
			if (Options.showServerOgameClock)
				this.changeOgameClocks2Server();
		}
	}

	
	// =======================================================================
	// misc functions
	// =======================================================================
	var Utils =
	{
		unsafeWindow: window,
		bg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAALHRFWHRDcmVhdGlvbiBUaW1lAHPhYiAzMSBPdXQgMjAwOSAxODoyNjowOSAtMDAwMBvBwloAAAAHdElNRQfZCh8SGy7RbQlkAAAACXBIWXMAAB7BAAAewQHDaVRTAAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpjYGBgmAEAAJ0AmeuxAnUAAAAASUVORK5CYII=",
		
		// wrappers for GM functions
		setValue: function ( cookieName, cookieValue )
		{
			if (Utils.isFirefox)
				GM_setValue(cookieName, cookieValue);
				
			else {
			if( !cookieName ) { return; }
				var lifeTime = 31536000;
				document.cookie = escape( cookieName ) + "=" + escape( Utils.getRecoverableString( cookieValue ) ) +
					";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
			}
		},
		
		getValue: function ( cookieName, oDefault )
		{
			if (Utils.isFirefox)
				return GM_getValue(cookieName, oDefault);
				
			else {
				var cookieJar = document.cookie.split( "; " );
				for( var x = 0; x < cookieJar.length; x++ ) {
					var oneCookie = cookieJar[x].split( "=" );
					if( oneCookie[0] == escape( cookieName ) ) {
						try {
							eval('var footm = '+unescape( oneCookie[1] ));
						} catch(e) { return oDefault; }
						return footm;
					}
				}
				return oDefault;
			}
		},
		
		setValueUni: function ( name, value )
		{
			Utils.setValue(Utils.uni_prefix + name, value);
		},

		getValueUni: function ( name, def )
		{
			return Utils.getValue(Utils.uni_prefix + name, def);
		},

		log: function (str)
		{
			if (Utils.isFirefox)
				GM_log(str);
			else if (Utils.isOpera)
				window.opera.postError(str);
		},
		
		dump: function(obj, proplist, showUndefined)
		{
			if ( typeof(showUndefined) == 'undefined' ) showUndefined = true;
			
			if (typeof(obj) != 'object') {
				var label = ( proplist ? proplist+': ' : '' );
				Utils.log(''+label+obj);
			}

			else if (!proplist) {
				for (var i in obj)
					try {
						if (typeof(obj[i]) != 'function')
							Utils.log(i+': '+obj[i])
					} catch(e) {}

			}
			else {
				var props = proplist.split(',');
				for (var i=0; i<props.length; i++)
					try {
						var prop = props[i];
						if (showUndefined || typeof(obj[prop]) != 'undefined') Utils.log(prop+': '+obj[props[i]])
					} catch(e) {}
			}
		},
		
		getRecoverableString: function(oVar,notFirst)
		{
			var oType = typeof(oVar);
			if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
				//most browsers say that the typeof for null is 'object', but unlike a real
				//object, it will not have any overall value
				return 'null';
			}
			if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
			if( oType == 'object' ) {
				//Safari throws errors when comparing non-objects with window/document/etc
				if( oVar == window ) { return 'window'; }
				if( oVar == document ) { return 'document'; }
				if( oVar == document.body ) { return 'document.body'; }
				if( oVar == document.documentElement ) { return 'document.documentElement'; }
			}
			if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
			if( !notFirst ) {
				Object.prototype.toRecoverableString = function (oBn) {
					if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
					this.tempLockIgnoreMe = true;
					var retVal = '{', sepChar = '', j;
					for( var i in this ) {
						if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
						if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
						j = this[i];
						if( !i.match(basicObPropNameValStr) ) {
							//for some reason, you cannot use unescape when defining peoperty names inline
							for( var x = 0; x < cleanStrFromAr.length; x++ ) {
								i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
							}
							i = '\''+i+'\'';
						} else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
							//IE mac does not allow numerical property names to be used unless they are quoted
							i = '\''+i+'\'';
						}
						retVal += sepChar+i+':'+getRecoverableString(j,true);
						sepChar = ',';
					}
					retVal += '}';
					this.tempLockIgnoreMe = false;
					return retVal;
				};
				Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
				Array.prototype.toRecoverableString = function () {
					if( this.tempLock ) { return '[\'LoopBack\']'; }
					if( !this.length ) {
						var oCountProp = 0;
						for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
						if( oCountProp ) { return this.toRecoverableObString(true); }
					}
					this.tempLock = true;
					var retVal = '[';
					for( var i = 0; i < this.length; i++ ) {
						retVal += (i?',':'')+getRecoverableString(this[i],true);
					}
					retVal += ']';
					delete this.tempLock;
					return retVal;
				};
				Boolean.prototype.toRecoverableString = function () {
					return ''+this+'';
				};
				Date.prototype.toRecoverableString = function () {
					return 'new Date('+this.getTime()+')';
				};
				Function.prototype.toRecoverableString = function () {
					return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
				};
				Number.prototype.toRecoverableString = function () {
					if( isNaN(this) ) { return 'Number.NaN'; }
					if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
					if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
					return ''+this+'';
				};
				RegExp.prototype.toRecoverableString = function () {
					return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
				};
				String.prototype.toRecoverableString = function () {
					var oTmp = escape(this);
					if( oTmp == this ) { return '\''+this+'\''; }
					return 'unescape(\''+oTmp+'\')';
				};
			}
			if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
			var oTmp = oVar.toRecoverableString();
			if( !notFirst ) {
				//prevent it from changing for...in loops that the page may be using
				delete Object.prototype.toRecoverableString;
				delete Array.prototype.toRecoverableObString;
				delete Array.prototype.toRecoverableString;
				delete Boolean.prototype.toRecoverableString;
				delete Date.prototype.toRecoverableString;
				delete Function.prototype.toRecoverableString;
				delete Number.prototype.toRecoverableString;
				delete RegExp.prototype.toRecoverableString;
				delete String.prototype.toRecoverableString;
			}
			return oTmp;
		},
				
		addSpanMark: function(value, content)
		{
			var className = !value ? 'middlemark' : value > 0 ? 'undermark' : 'overmark';
			content = content || ('(' + ( (value>0)?'+':'' ) + Utils.formatNumber(value) + ')' );
			return '<span class="'+className+'">'+content+'</span>';
		},
		
		blockAutocomplete: function()
		{
			var forms = document.getElementsByTagName('form');
			for (var i=0; i<forms.length; i++) 
				forms[i].setAttribute('autocomplete','off');
		},

		checkRedesign: function()
		{
			return (this.unsafeWindow.$ || this.isCurrentPage('showmessage')) ? true : false;
		},
		
		createStyleSheet: function()
		{
			document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
			Utils.stylesheet = document.styleSheets[document.styleSheets.length-1];
		},
		
		formatNumber: function (num)
		{
			var str = '' + num;
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(str)) {
				str = str.replace(rgx, '$1' + '.' + '$2');
			}

			return str;
		},
		
		getDocScript: function()
		{
			var scripts = document.getElementsByTagName('script');
			this.script = null;
			
			var n = 0;

			for (var i=0; i<scripts.length; i++)
				if (!scripts[i].src && ! (this.isCurrentPage('messages') && n++ == 0)) {
					this.script = scripts[i];
					break;
				}

		},

	    insertAfter: function (newElement,targetElement)
		{
			if (!newElement || !targetElement) return;
			
			var parent = targetElement.parentNode;
			if(parent.lastchild == targetElement)
				parent.appendChild(newElement);
			else
				parent.insertBefore(newElement, targetElement.nextSibling);
		},
		
		deleteNode: function(node)
		{
			if(node) node.parentNode.removeChild(node);
		},

		insertCSSRule: function (rule)
		{
			Utils.stylesheet.insertRule(rule, 0);
		},
		
		isCurrentPage: function (page)
		{
			var pages = page.split(',');
			var url = window.location.href;
			for (var i=0; i<pages.length; i++)
				if (url.indexOf('index.php?page='+pages[i]) >-1 )
					return true;
					
			return false;
		},
		
		runScript: function (code)
		{
			if (!code || code=="") return;
			document.location.href = 'javascript:'+code+';void(0);';
		},
		
		trigger: function (id, event)
		{
			
			var node = ( (typeof(id) == 'string') ? document.getElementById(id) : id );
			if (!node) return;
			
			var evt;
			if (event == 'click' || event == 'mouseup') {
				evt = document.createEvent("MouseEvents");
				evt.initMouseEvent(event, true, true, Utils.unsafeWindow,  0, 0, 0, 0, 0, false, false, false, false, 0, null);
			}
			else if (event == 'change' || event == 'focus') {
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent(event, true, false);
			}
			else if (event == 'keyup' || event == 'keypress') {
			}
			
			if (evt) node.dispatchEvent(evt);
			
		},
		
		XPath: function(path, context, type)
		{
			try {
				if (!context) context = document;
				if (!type) type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
				return document.evaluate(path, context, null, type, null)
			}
			catch (e) {Utils.log(e); }
		},
		
		XPathSingle: function(path, context)
		{
			return this.XPath(path, context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
		},
		
		getElementsByClassName: function(className, context)
		{
			var path = '';
			var classes = className.match(/\S+/gi);
			for (var i=0; i<classes.length; i++) {
				var c = classes[i];
				if (path) path += ' and ';
				if (c.substr(0,1) == '!') {
					path += 'false=';
					c = c.substr(1);
				}

				path += 'contains(concat(" ", normalize-space(@class), " "), " ' + c + ' ")';
			}
			
			return this.XPath('descendant::*['+path+']', context);
		},
		
		getElementByClassName: function(className, context)
		{
			return this.getElementsByClassName(className,context).snapshotItem(0);
		},
		
		parseInt: function(str)
		{
			if (!str) return null;
			str = str.replace(/(\d+)kk/i, '$1'+'000000');
			return parseInt(str.replace(/[^\d\-]/g, ''), 10);
		},

		extractInt: function(str, rx)
		{
			if (!str) return null;
			str = str.toString();
			
			if (!rx)
				return Utils.parseInt(str);

			str = str.match(rx);
			if (!str) return null;
			else return Utils.parseInt(str[1]);
		},
		
		getIntById: function(id, property, rx) {
			var node = document.getElementById(id);
			property = property || 'innerHTML';
			if (!node || !node[property]) return null;
			return Utils.extractInt(node[property], rx);
		},
		
		getIntByXPath: function(xpath, property, rx)
		{
			property = property || 'innerHTML';
			var node = Utils.XPathSingle(xpath);
			if (!node) return null;
			return Utils.extractInt(node[property], rx);
		},

		initUni: function()
		{
			this.server = "EN";
			
			var url = document.location.href;
			server = url.match(/http:\/\/([^\\\/]+[\\\/])/i);
			
			if (server) server = server[1].toUpperCase();
			server = server.replace(/\\/i, '/');
			
			if 		(server.indexOf('AR.OGAME.ORG/') > -1)  this.server = 'AR'; // Argentina
			else if (server.indexOf('BA.OGAME.ORG/') > -1)  this.server = 'BA'; // Balkan countries
			else if (server.indexOf('BG.OGAME.ORG/') > -1)  this.server = 'BG'; // Bulgaria
			else if (server.indexOf('OGAME.COM.BR/') > -1)  this.server = 'BR'; // Brasil
			else if (server.indexOf('CN.OGAME.ORG/') > -1)  this.server = 'CN'; // China
			else if (server.indexOf('OGAME.CZ/') > -1)  this.server = 'CZ'; // Czech Republic
			else if (server.indexOf('OGAME.DE/') > -1)  this.server = 'DE'; // Germany
			else if (server.indexOf('OGAME.DK/') > -1)  this.server = 'DK'; // Denmark
			else if (server.indexOf('OGAME.COM.ES/') > -1)  this.server = 'ES'; // Spain
			else if (server.indexOf('FI.OGAME.ORG/') > -1)  this.server = 'FI'; // Finnland
			else if (server.indexOf('OGAME.FR/') > -1)  this.server = 'FR'; // France
			else if (server.indexOf('OGAME.GR/') > -1)  this.server = 'GR'; // Greece
			else if (server.indexOf('OGAME.COM.HR/') > -1)  this.server = 'HR'; // Croatia
			else if (server.indexOf('OGAME.HU/') > -1)  this.server = 'HU'; // Hungary
			else if (server.indexOf('OGAME.IT/') > -1)  this.server = 'IT'; // Italy
			else if (server.indexOf('OGAME.JP/') > -1)  this.server = 'JP'; // Japan
			else if (server.indexOf('OGAME2.CO.KR/') > -1)  this.server = 'KR'; // Korea
			else if (server.indexOf('OGAME.LT/') > -1)  this.server = 'LT'; // Lithuania
			else if (server.indexOf('OGAME.LV/') > -1)  this.server = 'LV'; // Latvia
			else if (server.indexOf('MX.OGAME.ORG/') > -1)  this.server = 'MX'; // Mexico
			else if (server.indexOf('OGAME.NL/') > -1)  this.server = 'NL'; // Netherlands
			else if (server.indexOf('OGAME.NO/') > -1)  this.server = 'NO'; // Norway
			else if (server.indexOf('OGAME.ONET.PL/') > -1)  this.server = 'PL'; // Poland
			else if (server.indexOf('OGAME.COM.PT/') > -1)  this.server = 'PT'; // Portugal
			else if (server.indexOf('OGAME.RO/') > -1)  this.server = 'RO'; // Romania
			else if (server.indexOf('OGAME.RU/') > -1)  this.server = 'RU'; // Russia
			else if (server.indexOf('OGAME.SE/') > -1)  this.server = 'SE'; // Sweden
			else if (server.indexOf('OGAME.SI/') > -1)  this.server = 'SI'; // Slovenia
			else if (server.indexOf('OGAME.SK/') > -1)  this.server = 'SK'; // Slovakia
			else if (server.indexOf('OGAME.COM.TR/') > -1)  this.server = 'TR'; // Turkey
			else if (server.indexOf('OGAME.TW/') > -1)  this.server = 'TW'; // Taiwan
			else if (server.indexOf('OGAME.US/') > -1 ) this.server = 'US'; // USA
			else if (server.indexOf('OGAME.ORG/') > -1) this.server = 'ORG'; // UK
			
			this.server_lang = this.server;
			if (this.server == 'US' && this.server == 'ORG') this.server_lang = 'EN';

			this.uni = url.toUpperCase().match(/:\/\/([a-z0-9]+)\./i);
			this.uni = this.uni ? this.uni[1] : '0';
			
			this.speedfactor = 1;
			
			var uni_server = this.uni + '.' + this.server;
			
			if (uni_server == 'UNI42.ORG') this.speedfactor = 2;
			
			this.uni_prefix = uni_server.replace(/[\.\-]/g, '_');
		},
		
		Init: function()
		{
			this.createStyleSheet();

			this.isOpera = (window.opera) ? true : false;
			this.isFirefox = (window.navigator.userAgent.indexOf('Firefox') > -1 ) ? true : false;
			
			this.getDocScript();
			
			try { this.unsafeWindow = unsafeWindow; }
			catch (e) { this.unsafeWindow = window; }
			
			this.$ = this.unsafeWindow.$;
			
			// server abbr, server language, uni, speedfactor
			this.initUni();
		}
	}


	// =======================================================================
	// Ogame formulas and functions
	// =======================================================================
	
	var Ogame =
	{
		TECH_ENERGY: 113,
		TECH_COMB_DRIVE: 115,
		TECH_IMPULSE_DRIVE: 117,
		TECH_HYPER_DRIVE: 118,
		
		used_techs: [113, 115, 117, 118],

		createShip: function (id, name, metal, crystal, drive, speed, capacity)
		{
			var ship = new Object();
			ship.name = name;
			ship.metal = metal;
			ship.crystal = crystal;
			
			switch (drive) {
				case 1: drive = this.TECH_COMB_DRIVE; break;
				case 2: drive = this.TECH_IMPULSE_DRIVE; break;
				case 3: drive = this.TECH_HYPER_DRIVE; break;
				default: drive = this.TECH_COMB_DRIVE; break;
			}
			ship.drive = drive;
			ship.speed = speed;
			ship.capacity = capacity;
			
			this.ships[id] = ship;
		},

		readTechs: function()
		{
			try {
				this.techs = [];
				Utils.$('#buttonz a.detail_button').each(
					function() {
						Ogame.techs[this.getAttribute('ref')] = 
							Utils.parseInt( Utils.$(this).find('.level').get(0).lastChild.nodeValue );
					} );
				
				this.saveTechs();
			} catch (e) { Utils.log(e) }
		},

		readTemperature: function()
		{
			// ---------
			// min t * 2
			// ---------
			this.temperature = 0;
			var node = Utils.XPathSingle('//A[contains(@class,"planetlink") and contains(@class,"active")][@title]');
			if (!node) return;
			
			var t = node.title.match(/<br>.*<br>[^\d\-]*([\d\-]+)/i);
			if (!t) return;

			this.temperature = t[1] * 2;
		},

		readOfficers: function()
		{
			function checkOfficer(i) {
				return officers.get(i).src.indexOf('_un.gif') == -1;
			}
			
			var officers = Utils.$('#officers a img');
			this.engineer = checkOfficer(2);
			this.geologist = checkOfficer(3);
		},
		
		getTech: function(id)
		{
			if (this.techs == null) this.loadTechs();
			return this.techs[id];
		},
		
		getTemperature: function()
		{
			if (this.temperature == null) this.readTemperature();
			return this.temperature;
		},
		
		getGeologist: function()
		{
			if (this.geologist == null) this.readOfficers();
			return this.geologist;
		},

		getEngineer: function()
		{
			if (this.engineer == null) this.readOfficers();
			return this.engineer;
		},

		getConsumption: function(id, level)
		{
			if (!id || level<0) return;
			
			if (level == 0) return 0;
			
			var res = 0;
			
			if (id == 12)
				res = 10 * level * Math.pow(1.1, level) * Utils.speedfactor;
				
			return Math.floor(res);
		},
		
		getProduction: function(id, level)
		{
			if (!id || level<0) return;

			if (level == 0)
				return (id==1) ? 20 * Utils.speedfactor :
								(id==2) ? 10  * Utils.speedfactor : 0;
			
			var res = 0;

			if (id == 1)
				res = 30 * level * Math.pow(1.1, level);
			else if (id == 2)
				res = 20 * level * Math.pow(1.1, level);
			else if (id == 3)
				res = 10 * level * Math.pow(1.1, level) * (1.28 - 0.002 * this.getTemperature());
			else if (id == 4)
				res = 20 * level * Math.pow(1.1, level);
			else if (id == 12)
				res = 30 * level * Math.pow( 1.05 + this.getTech(this.TECH_ENERGY) * 0.01, level);
			
			if (id==1 || id==2 || id==3)
				res *= Utils.speedfactor;
				
			if (id <=3 && this.getGeologist())
				res = Math.floor(res) * 1.1;
			else if (id>3 && this.getEngineer())
				res = Math.floor(res) * 1.1;

				
			return Math.floor( res + this.getProduction(id, 0) );
			
		},
		
		getStorageCapacity: function(id, level)
		{
			if (!id || level<0) return;
			if (id != 22 && id != 23 && id != 24) return;
			var res;
			
			switch (level) {
				case 0: res = 10; break;
				case 1: res = 20; break;
				case 2: res = 40; break;
				case 3: res = 75; break;
				case 4: res = 140; break;
				case 5: res = 255; break;
				case 6: res = 470; break;
				case 7: res = 865; break;
				case 8: res = 1590; break;
				case 9: res = 2920; break;
				case 10: res = 5355; break;
				case 11: res = 9820; break;
				case 12: res = 18005; break;
				case 13: res = 33005; break;
				case 14: res = 60510; break;
				case 15: res = 110925; break;
				case 16: res = 203350; break;
				case 17: res = 372785; break;
				case 18: res = 683385; break;
				case 19: res = 1297589; break;
				case 20: res = 2296600; break;
				default: res = 0;
			}
			
			return res*1000;
		},
		
		loadTechs: function()
		{
			try {
				//if (!Utils.isFirefox) return;
				//restore saved values

				this.techs = [];
				
				var str = Utils.getValueUni('techs');
				if (!str) return;
				
				str = str.split('&');
				for (var i=0; i<str.length; i++) {
					var pair = str[i].split('=');
					this.techs[ parseInt(pair[0],10) ] = parseInt(pair[1],10);
				}
			} catch (e) { Utils.log(e) }
		},
		
		saveTechs: function()
		{
			//if (!Utils.isFirefox) return;

			var str = '';
			for (var i in this.used_techs) {
				var id = this.used_techs[i];
				if (str) str += '&';
				str += ''+id+'='+this.techs[id];
			}
			
			Utils.setValueUni('techs', str);
		},

		updateShipSpeed: function()
		{
			if (this.getTech(this.TECH_IMPULSE_DRIVE) >= 5) {
				this.ships[202].speed = 10000;
				this.ships[202].drive = this.TECH_IMPULSE_DRIVE;
			}

			if (this.getTech(this.TECH_HYPER_DRIVE) >= 8) {
				this.ships[211].speed = 5000;
				this.ships[211].drive = this.TECH_HYPER_DRIVE;
			}

			for (var i in this.ships) {
				var ship = this.ships[i];
				var factor = (ship.drive == this.TECH_COMB_DRIVE) ? 0.1 : (ship.drive == this.TECH_IMPULSE_DRIVE) ? 0.2 : 0.3;
				ship.speed = Math.floor( ship.speed * (1 + this.getTech(ship.drive) * factor) );
				
			}
			
		},
		
		Init: function()
		{
			this.temperature = this.geologist = this.engineer = this.techs = null;

			var str = document.location.href.match(/:\/\/([^\/]+)\//);
			this.prefix = str ? str[1].toUpperCase().replace(/[\.\-]/g, '') : '';

			this.ships = [];
			// id, name, metal, crystal, drive, speed, capacity
			this.createShip(202, 'SCargo',		2000,	2000,	1, 5000,	5000);
			this.createShip(203, 'LCargo',		6000,	6000,	1, 7500,	25000);
			this.createShip(204, 'LFighter',	3000,	1000,	1, 12500,	50);
			this.createShip(205, 'HFighter',	6000,	4000,	2, 10000,	100);
			this.createShip(206, 'Cruiser',		20000,	7000,	2, 15000,	800);
			this.createShip(207, 'Battleship',	45000,	15000,	3, 10000,	1500);
			this.createShip(208, 'Colonizator',	10000,	20000,	2, 2500,	7500);
			this.createShip(209, 'Recycler',	10000,	6000,	1, 2000,	20000);
			this.createShip(210, 'Spy',			0,		1000,	1, 100000000, 0);
			this.createShip(211, 'Bomber',		50000,	25000,	2, 4000,	500);
			this.createShip(213, 'Destroyer',	60000,	50000,	3, 5000,	2000);
			this.createShip(214, 'RIP',			5000000,4000000,3, 100,		1000000);
			this.createShip(215, 'BCruiser',	30000,	40000,	3, 10000,	750);
			this.createShip(212, 'Satellite',	0,		2000,	1, 0,		0);
		}
	}


	// functions to create simple table like 
	// 		<title>
	// <label:> <value>
	// <label:> <value>
	
	var SimpleTable =
	{
		addCell: function(_key, _value, _value_class, _id)
		{
			if (typeof(_key) == 'undefined') _key = '';
			if (typeof(_value) == 'undefined') _value = '';
			
			this.data[this.data.length] = { key: _key, value: _value, value_class: _value_class, id: _id, attr: '' };
			this.lastCell = this.data[this.data.length-1];
		},
		
		addHref: function (key, value, id)
		{
			if (typeof(key) == 'undefined') key = '';
			if (typeof(value) == 'undefined') value = '';
			var str = '<a href="javascript:void(0)" id="'+id+'">'+value+'</a>';
			this.addCell(key, str, this.href_class || '', id);
		},
		
		createTableString: function(values_in_row)
		{
			function addAttr(attr, value) {
				return (value ? attr+'="'+value+'" ' : '');
			}
			
			values_in_row = values_in_row || 1;
			var str = '';
			for (var i=0; i<Math.ceil(this.data.length/values_in_row); i++)
			{
				str += '<tr>';
				for (var j=0; j<values_in_row; j++) {
					var cell = this.data[i*values_in_row+j];
					if (!cell) continue;
					str +=	'<td '+addAttr('class', this.key_class)+'>' + (cell.key ? cell.key+':' : ' ') + '</td>' +
							'<td '+ addAttr('class', cell.value_class || this.value_class) +
									addAttr('id', cell.id)+' '+cell.attr+'>' + Utils.formatNumber(cell.value) + '</td>';
				}
				
				str += '</tr>';
			}
			str = '<tbody><tr>' + 
						'<th class="'+this.title_class+'" colspan="'+values_in_row*2+'">' + this.title +'</th>' +
					'</tr>' + str + '</tbody>';
			return str;
		},

		init: function(title, title_class, key_class, value_class)
		{
			this.title = title || '';
			this.title_class = title_class || '';
			this.key_class = key_class || '';
			this.value_class = value_class || '';
			this.data = new Array();
		}
	};
	
	
	// =======================================================================
	// functions for Coords storing
	// =======================================================================
	var Coords = 
	{
		get: function ()
			{
				return Utils.getValueUni('Coords');
			},

		parse: function (str, reg, extract, save)
			{
				var found = false;
				var matches = str.match(reg);
				if (!matches) return false;

				for (var i=0; i<matches.length; i++)
				{
					var coords = matches[i].toString();
					if (extract) coords = coords.replace(reg,"$1");


					var temp = coords.split(':');
					var g = parseInt(temp[0],10);
					var s = parseInt(temp[1],10);
					var p = parseInt(temp[2],10);
					if (g+"" == temp[0] && s+"" == temp[1] && p+"" == temp[2] &&
						!(g < 1 || g > 50) && !(s < 1 || s > 499 || (s > 100 && g > 9)) && !(p < 1 || p > 16))
					{
						if (save) 
							this.set(coords);
						found = true;
						break;
					}
				}

				return found;
			},
			
		read: function(str, save)
			{
				if (typeof(save) == 'undefined') save = true;
				
				if(str.length > 0)
				{
					if (this.parse(str, /\[(\d{1,2}:\d{1,3}:\d{1,2})\]/gi,true, save))
						return true;
					else if (this.parse(str, /\d{1,2}:\d{1,3}:\d{1,2}/gi,false, save))
						return true;
					else {
						str = str.replace(/[>\s\[\(](\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})[\s\]\)<,\.]/gi,"$1:$2:$3");
						str = str.replace(/^(\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})[\s\]\)<,\.]/gi,"$1:$2:$3");
						str = str.replace(/[>\s\[\(](\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})$/gi,"$1:$2:$3");
						str = str.replace(/^(\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})$/gi,"$1:$2:$3");
						return this.parse(str, /\d{1,2}:\d{1,3}:\d{1,2}/gi,false, save);
					}
				}
				return false;
			},
			
		saved: function()
			{
				return Utils.getValueUni('CoordsFlag');
			},
			
		set: function (value)
			{
				Utils.setValueUni('Coords', value); 
				Utils.setValueUni('CoordsFlag', '1');
			},
			
		onMouseUp: function(e) {
			if ((!e) || ((e.ctrlKey) && (!e.keyCode))) return;
			
			var targetclassname = e.target.toString();

			try {
				if(targetclassname.match(/InputElement|SelectElement|OptionElement/i) || targetclassname.match(/object XUL/i))
					return;
				/*
				if(e.target.ownerDocument.designMode)
					if(e.target.ownerDocument.designMode.match(/on/i))
						return;
				*/
				Coords.read(window.getSelection().toString());
			}
			catch(e) {
				Utils.log(e);
			}
		},
		
		Init: function()
		{
			document.addEventListener('mouseup', function (e){ Coords.onMouseUp(e); }, false);
		}
	
	}
	
	
	var EventList =
	{
		changeTime: function()
		{
			var nodes = Utils.XPath('//LI[@class="arrivalTime"]');
			
			for (var i=0; i<nodes.snapshotLength; i++) {
				var node = nodes.snapshotItem(i);
				node.innerHTML = DateTime.convertStringServer2Local(node.innerHTML, '[H]:[i]:[s]');
			}
		},
		
		updateParentHeight: function()
		{
			try{
				var parent = window.parent;
				if (parent)
					window.parent.document.getElementById('newEventBox').style.height = document.body.offsetHeight + 'px';
			}
			catch (e) { Utils.log(e) }
		},

		showEventList: function ()
		{
			try {
				this.insertCSSRules();
				var div = document.createElement('div');
				div.id = 'newEventBox';
				div.innerHTML = '<iframe src="index.php?page=eventList&pro=1&session='+ Utils.unsafeWindow.session +'"></iframe>';
				document.getElementById('inhalt').appendChild(div);
			} catch (e) { Utils.log(e) }
		},

		insertCSSRules: function ()
		{
			Utils.insertCSSRule(' \
			#newEventBox{ \
				height: 100px; \
				width: 720px; \
				margin-left: -40px; \
			} \
			');

			Utils.insertCSSRule(' \
			#newEventBox iframe{ \
				width: 100%; \
				height: 100%; \
			} \
			');
		},

		Run: function()
		{
			if (Options.showLocalTime)
				this.changeTime();
				
			if ( document.location.href.indexOf('pro=1') > -1 )
				this.updateParentHeight();
		}
	}
	
	
	var FinishTime = 
	{
		addConstructionTime: function (id, time)
		{
			if ( !id || !time || isNaN(time)) return;


			var tbody = document.getElementById(id).parentNode.parentNode.parentNode;

			var newRow = document.createElement('tr');
			newRow.className = 'data green';
			newRow.appendChild(document.createElement('td'));
			newRow.appendChild(document.createElement('td'));
			
			newRow.firstChild.className = 'text_align_right';
			newRow.lastChild.innerHTML = DateTime.formatDate2(DateTime.getFinishTime(time));
			newRow.lastChild.className = 'finishTime';
			tbody.appendChild(newRow);
		},
		
		
		ShowConstructions: function ()
		{
			var script = Utils.script;
			if (!script) return;

			Utils.insertCSSRule('.finishTime { padding-left: 12px }');
			Utils.insertCSSRule('.green { color: green; }');

			// buildings and research
			var str = script.innerHTML.match(/baulisteCountdown\(getElementByIdWithCache\(["']\w+["']\)\,\s*\d*/gi);

			if (str)
				for (var i=0; i<str.length; i++)
				{
					var res = str[i].match(/["'](\w+)["']\)\,\s*(\d*)/i);
					FinishTime.addConstructionTime(res[1], res[2]);
				}

			// shipyard
			str = script.innerHTML.match(/shipCountdown\((\s*getElementByIdWithCache\(["']\w+["']\)\,)+(\s*\d*\,){3,3}/i);

			if (str) {
				str[2] = str[2].match(/(\d+)/)[0];
				FinishTime.addConstructionTime('shipAllCountdown', str[2]);
			}
		}
	}


	// =======================================================================
	// functions for Fleet movement view
	// =======================================================================
	var FleetMovement = 
	{
		fleetXPath: '//*[@id="inhalt"]/descendant::*[contains(concat(" ",@class," ")," fleetDetails ") and contains(@id,"fleet")]',
		
		addReversalTimeBox: function(fleet)
		{
			if (! Utils.getElementsByClassName('reversal',fleet).snapshotLength ) return;

			var tip = Utils.XPathSingle('//*[@id="'+ fleet.id +'"]/descendant::*[contains(@class,"origin")]/*[@class="tips4"]');
			if(!tip) return;

			var str = tip.getAttribute('title');
			if (!str) return;

			var date = DateTime.parse2(str);
			if (!date) return;
			
			date = DateTime.convertDateServer2Local(date);

			var span = document.createElement('span');
			span.className = 'reversalTime';
			span.setAttribute('title', date.getTime());

			fleet.appendChild(span);
			this.updateReversalClock();
		},

		updateReversalClock: function()
		{
			try {
				var spans = Utils.getElementsByClassName('reversalTime');
				for (var i=0; i<spans.snapshotLength; i++)
				{
					var node = spans.snapshotItem(i);
					var date = new Date();
					var start = node.getAttribute('title');
					if (!start) continue;

					start = parseInt(start,10);
					
					date.setTime( (date.getTime() - DateTime.TimeDelta) * 2 - start );
					node.innerHTML = DateTime.formatDate2(date);
				}
			}
			catch (e) { Utils.log(e); }
		},
		
		correctTimes: function(fleet)
		{
			var times = Utils.XPath(
				'//*[@id="'+ fleet.id +'"]/descendant::*[contains(@class,"absTime")] | ' +
				'//*[@id="'+ fleet.id +'"]/*[@class="starStreak"]/descendant::*[@class="tips4"]'
			);
					
			for (var i=0 ; i < times.snapshotLength; i++ )
			{
				var node = times.snapshotItem(i);
				var property = (node.tagName=='IMG' ? 'title' : 'innerHTML');
				node[property] = DateTime.convertStringServer2Local(node[property]);
			}
		},
		
		getDetails: function (div)
		{
			var result = new Object();
			var string = "";

			var cells = div.getElementsByTagName('td');

			for (var i=0; i<cells.length; i++) {
				if (cells[i].colSpan=="2") {
					result.ships = string;
					string = "";
				}
				else {
					if (cells[i].className!="value" && string!="") string += " ";
					string += cells[i].innerHTML;
				}
			}

			result.cargo = string;
			return result;
		},

		getMissionClass: function (fleet)
		{
			var mission = Utils.getElementByClassName("mission", fleet);
			var mclass = "";
			
			switch(mission.innerHTML) {
				case (Options.Labels.lbl_missAttack): mclass = "ownattack"; break;
				case (Options.Labels.lbl_missHold): mclass = "ownhold"; break;
				case (Options.Labels.lbl_missColony): mclass = "owncolony"; break;
				case (Options.Labels.lbl_missDeploy): mclass = "owndeploy"; break;
				case (Options.Labels.lbl_missHarvest): mclass = "ownharvest"; break;
				case (Options.Labels.lbl_missTransport): mclass = "owntransport"; break;
				case (Options.Labels.lbl_missFederation): mclass = "ownfederation"; break;
				case (Options.Labels.lbl_missDestroy): mclass = "owndestroy"; break;
				case (Options.Labels.lbl_missEspionage): mclass = "ownespionage"; break;
				case (Options.Labels.lbl_missExpedition): mclass = "ownexpedition"; break;
				default: mclass = "owntransport";
			}
			
			return mclass;
		},

		insertCSSRules: function ()
		{
			if (Options.mvmt_expandFleets) {
				Utils.insertCSSRule(".detailsOpened .starStreak  {background:none}");
				Utils.insertCSSRule(".anti_fleetDetails {left:60px; width:290px; white-space:normal; padding:0px 7px; font-size:0.9em; text-align:left; line-height:1.2em}");

				Utils.insertCSSRule(".ownattack { color: "+Options.missAttack+" }");
				Utils.insertCSSRule(".owncolony { color: "+Options.missColony+" }");
				Utils.insertCSSRule(".owndeploy { color: "+Options.missDeploy+" }");
				Utils.insertCSSRule(".owndestroy { color: "+Options.missDestroy+" }");
				Utils.insertCSSRule(".ownespionage { color: "+Options.missEspionage+" }");
				Utils.insertCSSRule(".ownexpedition { color: "+Options.missExpedition+" }");
				Utils.insertCSSRule(".ownfederation { color: "+Options.missFederation+" }");
				Utils.insertCSSRule(".ownharvest { color: "+Options.missHarvest+" }");
				Utils.insertCSSRule(".ownhold { color: "+Options.missHold+" }");
				Utils.insertCSSRule(".owntransport { color: "+Options.missTransport+" } ");
				Utils.insertCSSRule(".ownmissile { color: "+Options.missMissile+" } ");
			}
			
			if (Options.mvmt_showReversal)
				Utils.insertCSSRule(".reversalTime { position: absolute; top: 43px; left: 555px; color: yellow;} ");
		},

		myOpenCloseFleet: function (id, change)
		{
			var fleet = document.getElementById(id);
			var span = Utils.getElementByClassName('starStreak', fleet);
			var details = Utils.getElementByClassName('anti_fleetDetails', fleet);

			var opened = fleet.className.match('detailsOpened') ? 1 : 0;
			
			// original OGame handler will be executed first
			// so if change=true then className has been already changed

			if ( change && !opened ) {

				span.removeAttribute("style");
				fleet.removeAttribute("style");

			}
			else if ( opened ) {
				var details_height = parseInt(details.offsetHeight, 10);
				var span_height = parseInt(span.offsetHeight, 10);
				var fleet_height = parseInt(fleet.offsetHeight, 10);
				var dif = details_height - span_height + 2;

				if (dif>0) {
					span_height += dif;
					fleet_height += dif;
					
					span.setAttribute("style","height:"+span_height+"px");
					fleet.setAttribute("style","height:"+fleet_height+"px");
				}
			}
		},
		
		myOpenCloseAll: function ()
		{
			var fleets = Utils.XPath(FleetMovement.fleetXPath);

			for (var i=0; i<fleets.snapshotLength; i++) {
				FleetMovement.myOpenCloseFleet(fleets.snapshotItem(i).id, 1);
			}
		},


		expandFleet: function (fleet)
		{
				var id = fleet.id.replace(/\D+/g, '');

				if (!id) return;

				var details = document.getElementById('details'+id);

				var newNode = document.createElement('div');
				newNode.setAttribute('class', 'anti_fleetDetails fixed '+this.getMissionClass(fleet));

				var res = this.getDetails(details);
				newNode.innerHTML = res.ships+'<br/><br/>'+res.cargo;

				var picto = Utils.XPathSingle(
					'descendant::*[contains(@class,"starStreak")]/' +
					'descendant::*[contains(@class,"route")]', fleet);

				picto.parentNode.replaceChild(newNode, picto);
				
				var mission = Utils.getElementByClassName('mission', fleet);
				var reversal = Utils.getElementByClassName('reversal', fleet);
				var next = Utils.getElementByClassName('nextMission', fleet);

				if (!reversal && next)
					mission.innerHTML += ' ('+Options.Interface.lbl_mvmt_Expedition+')';
				else if (!reversal)
					mission.innerHTML += ' ('+Options.Interface.lbl_mvmt_Return+')';

				// set 'openDetails' button handler
				var btn = Utils.XPathSingle('descendant::*[contains(@class,"openDetails")]/A', fleet);
				btn.addEventListener("click", function (){ setTimeout(function (){ FleetMovement.myOpenCloseFleet(fleet.id, 1); }, 0); }, false);

				// invoke the handler
				this.myOpenCloseFleet(fleet.id, 0);
		},

		Run: function()
		{
			if (!Options.mvmt_expandFleets && !Options.mvmt_showReversal) return;

			this.insertCSSRules();

			var fleets = Utils.XPath(FleetMovement.fleetXPath);

			for (var i=0; i<fleets.snapshotLength; i++) {
				var fleet = fleets.snapshotItem(i);
				if (Options.mvmt_expandFleets) this.expandFleet(fleet);
				if (Options.mvmt_showReversal) this.addReversalTimeBox(fleet);
				if (Options.showLocalTime) this.correctTimes(fleet);

			}

			if (Options.mvmt_expandFleets) {
				// set 'closeAll' button handler
				var btn = Utils.XPath('//*[@id="inhalt"]/descendant::*[contains(@class,"closeAll")]/A');
				btn = btn.snapshotItem(0);
				btn.addEventListener("click", function (){ setTimeout(FleetMovement.myOpenCloseAll, 0); }, false);
			}
			
			if (Options.mvmt_showReversal)
				setInterval(FleetMovement.updateReversalClock, 200);
		}
	}


	// =======================================================================
	// functions for Send fleet pages
	// =======================================================================
	var FleetSend = 
	{
		Capacity_insertCSSRules: function()
		{
			Utils.insertCSSRule('.total_capacity td {padding: 2px 5px; color: #A1A1A1; font-size: 11px;}');
			Utils.insertCSSRule('.total_capacity #total_capacity {color: green;}');
			Utils.insertCSSRule('.total_capacity td.capacity_href {text-decoration: underline; color: #5577EE;}');
			
			Utils.insertCSSRule('.speed { \
				position: absolute; \
				top: 8px; \
				width: 76px; \
				padding: 1px 4px 1px 1px; \
				color: white; \
				background: transparent url("'+Utils.bg+'") repeat;\
				text-align: right; \
				font-size: 10px; \
			}');
		},
		
		addSpeed: function(node)
		{
			var id = node.id.replace(/\D/g, '');
			var speed = Ogame.ships[id].speed;
			/*speed = speed<10000000 ?
				Utils.formatNumber(speed) :
				'' + (speed/1000000) + Utils.unsafeWindow.LocalizationStrings['unitMega'];*/
			speed = Utils.formatNumber(speed);
			
			Utils.$(node).find('div a').append('<div class="speed">'+speed+'</div>');
		},
		
		showCapacity: function (node)
		{
			try {
				var txtFields = Utils.getElementsByClassName('fleetValues');

				var sum = 0, minspeed = 0;
				
				for ( var i=0; i<txtFields.snapshotLength; i++ ) {
					txt = txtFields.snapshotItem(i);
					var id = txt.id.replace('ship_','');
					if (! (id in Ogame.ships) ) continue;
					
					capacity = Ogame.ships[id].capacity;

					if (!isNaN(txt.value) && txt.value>0) {
						sum += txt.value * capacity;
						minspeed = Math.min(minspeed, Ogame.ships[id].speed) || Ogame.ships[id].speed;
					}
				}

				document.getElementById('total_capacity').innerHTML = Utils.formatNumber(sum);
				document.getElementById('min_speed').innerHTML = Utils.formatNumber(minspeed);
			}
			catch (e) {Utils.log(e);}
			
			return true;
		},
		
		setShips: function(ship_id, cnt)
		{
			var node = document.getElementById(ship_id);
			if (!node || node.disabled) return;
			node.value = cnt;
			Utils.trigger(ship_id,'change');
		},
		
		checkRecyclers: function()
		{
			var recyclers = false;
			var value = document.getElementById('ship_209').value;
			if (value && !isNaN(value) && parseInt(value, 10)>0) recyclers = true;
			
			setTimeout( function(){ Utils.setValueUni('fleet1_recyclers', recyclers) }, 0);
		},
		
		Fleet1_Run: function()
		{
			var unsafe = Utils.unsafeWindow;
			
			if (Utils.isFirefox && Options.fleet2_setTargetDF) {
				unsafe.old_trySubmit = unsafe.trySubmit;
				unsafe.trySubmit = function () { FleetSend.checkRecyclers(); unsafe.old_trySubmit() };
			}
		
			if (!Options.fleet_showCapacity) return;
			var no_fleet = false;
			
			var parent = Utils.getElementByClassName('allornonewrap');
			
			if(!parent) {
				no_fleet = true;
				parent = document.getElementById('warning');
				if(!parent) return;
			}

			this.Capacity_insertCSSRules();
			
			var res = Utils.getIntById('resources_metal') + Utils.getIntById('resources_crystal') + Utils.getIntById('resources_deuterium');
			var scargo = Math.ceil(res/5000);
			var lcargo = Math.ceil(res/25000);
			
			var newDiv = document.createElement('div');
			newDiv.className = 'fleft total_capacity';
			SimpleTable.init();
			SimpleTable.key_class = 'capacity_key';
			SimpleTable.href_class = 'capacity_href';
			SimpleTable.addCell(Options.Interface.lbl_resources, res);
			SimpleTable.lastCell.attr = 'colspan="2"';
			SimpleTable.addCell();
			
			if (no_fleet) {
				Utils.insertCSSRule('.total_capacity {margin: 2px 25px;}');
				
				SimpleTable.addCell(Options.Labels.lbl_shipSCargo, scargo);
				SimpleTable.addCell(Options.Labels.lbl_shipLCargo, lcargo);
				newDiv.innerHTML = '<table>' + SimpleTable.createTableString(2) + '</table>';
				parent.appendChild(newDiv);
			}
			else {
				Ogame.updateShipSpeed();
				Utils.$('form li')
					.filter( function() {return !isNaN(this.id.replace('button','')) } )
					.each( function(){FleetSend.addSpeed(this)});

				SimpleTable.addHref(Options.Labels.lbl_shipSCargo, scargo, 'SCargo');
				SimpleTable.addHref(Options.Labels.lbl_shipLCargo, lcargo, 'LCargo');
				SimpleTable.addCell(Options.Interface.lbl_TotalCapacity,0, '', 'total_capacity');
				SimpleTable.addCell();
				SimpleTable.addCell(Options.Interface.lbl_MinSpeed,0, '', 'min_speed');
				SimpleTable.lastCell.attr = 'colspan="2"';
				newDiv.innerHTML = '<table>' + SimpleTable.createTableString(2) + '</table>';

				Utils.insertAfter(newDiv, parent.firstChild.nextSibling);

				document.getElementById('SCargo').addEventListener('click', function (){ FleetSend.setShips('ship_202', scargo); return true; }, false );
				document.getElementById('LCargo').addEventListener('click', function (){ FleetSend.setShips('ship_203', lcargo); return true; }, false );

				//this.setCapacityHandler();
				unsafe.old_checkShips = unsafe.checkShips;
				unsafe.checkShips = function(form) { FleetSend.showCapacity(); unsafe.old_checkShips(form) }

			}
			
			
		},

		getPartsFromLink: function(link)
		{
			var parts = link.split('#');
			if (parts.length < 4) return null;
			
			var res = {};
			res.galaxy = parseInt(parts[0], 10);
			res.system = parseInt(parts[1], 10);
			res.planet = parseInt(parts[2], 10);
			res.type = parseInt(parts[3], 10);
			res.name = parts[4] || '';
			res.weight = res.galaxy * 1000000 + res.system*1000 + res.planet*10 + res.type;
			
			return res;
		},

		insertShortLink: function(link,nextlink)
		{
			try {
				var parts = this.getPartsFromLink(link);
				if (!parts) return;
				if (!parts.name) link += '#';
				
				var slbox = document.getElementById('slbox');
				if (!slbox) return;
				var options = slbox.getElementsByTagName('option');
				var next;
				
				for (var i=1; i<options.length; i++) {
					if (nextlink && options[i].value == nextlink) next = options[i];
					if (link == options[i].value) return;
				}
				
				var opt = document.createElement('option');
				opt.value = link;
				opt.innerHTML = parts.name + ' [' + parts.galaxy + ':' + parts.system + ':' + parts.planet + ']';
				
				if (next) slbox.insertBefore(opt,next)
				else slbox.appendChild(opt);
				
			} catch (e) { Utils.log(e) }
		},
		
		getSLinkFromPlanet: function(planet)
		{
			try {
				var name = Utils.XPathSingle('SPAN[@class="planet-name"]', planet).innerHTML;
				var coords = Utils.XPathSingle('SPAN[@class="planet-koords"]', planet).innerHTML;
				var type = 1;
				coords = coords.replace(/[\[\]]/g,'').split(':');
				var res = coords[0] + '#' + coords[1] + '#' + coords[2] + '#' + type + '#' + name;
				return res;
			} catch (e) { Utils.log(e) }
		},
		
		isTargetEmpty: function()
		{
			//check whether the coords have been already set
			var items = Utils.XPath('//*[@id="inhalt"]/descendant::*[@class="fleetStatus"]/UL/LI');
			
			for (var i=0; i<items.snapshotLength; i++)
				if ( Coords.read(items.snapshotItem(i).innerHTML, false) )
					return false;
					
			return true;
		},
		
		SetCoords: function ()
		{
			if (!Coords.saved()) return;

			var coords = Coords.get().split(':');
			
			document.getElementById('galaxy').value = coords[0];
			document.getElementById('system').value = coords[1];
			document.getElementById('position').value = coords[2];

			Utils.trigger('galaxy', 'change');
			
			var df = document.getElementById('dbutton');
			if ( !df || df.className.indexOf('selected') == -1 )			
				Utils.trigger('pbutton', 'click');
		},
		
		Fleet2_Run: function()
		{
			if (Options.fleet2_fixLayout) {
				var nodes = Utils.XPath('//DIV[@id="buttonz"]/DIV/UL');
				if (nodes.snapshotLength) {
					nodes.snapshotItem(0).style.marginLeft = "20px";
					nodes.snapshotItem(1).style.marginLeft = "20px";
				}
			}
			
			var unsafe = Utils.unsafeWindow;
			
			var activelink, nextlink;
			
			var activePlanet = Utils.XPathSingle('//A[contains(@class,"active") and contains(@class,"planetlink")]');
			activelink = this.getSLinkFromPlanet(activePlanet);
			
			var nextPlanet = Utils.XPathSingle('parent::*/following-sibling::*/A[contains(@class,"planetlink")]', activePlanet);
			if (nextPlanet) nextlink = this.getSLinkFromPlanet(nextPlanet);
			
			this.insertShortLink(activelink, nextlink);
			
			var shortlinks = Options.fleet2_ShortLinks.split(',');
			for (var i=0; i<shortlinks.length; i++)
				this.insertShortLink(shortlinks[i]);
		
			if (Options.fleet2_setTargetDF && Utils.getValueUni('fleet1_recyclers'))
				Utils.trigger('dbutton', 'click');

			if (Options.autocopyCoords && this.isTargetEmpty())
				this.SetCoords();
		},
		
		setMission: function ()
		{
			// if mission is set then do nothing
			if (Utils.XPath('//*[@id="missions"]/descendant::*[contains(@id,"missionButton") and contains(@class,"selected")]').snapshotLength > 0)
				return;

			// look for the first 'on' mission
			var missions = new Array(
				Options.mission1, Options.mission2, Options.mission3, Options.mission4, Options.mission5,
				1,3,4,5,6,9
				);

			for (var i=0; i<missions.length; i++) {
				if (missions[i]>0 && document.getElementById('button' + missions[i]).className == 'on' )
				{
					Utils.trigger('missionButton' + missions[i], 'click');
					break;
				}
			}
		},
		
		checkACStime: function()
		{
			var now = new Date();
			var durationAKS = ( this.dateACS.getTime() - (now.getTime() - DateTime.TimeDelta) ) / 1000;
			var duration = Utils.unsafeWindow.duration;
			var className = "";
			
			if ( duration/durationAKS >= 1.3 ) 
			{
				clearInterval(this.intervalACS);
				className = 'overmark';
			}
			else if ( duration >= durationAKS && this.stateACS == 0 ) {
				this.stateACS = 1;
				className = 'middlemark';
			}
			
			if (className) document.getElementById('timeACS').className = className;
		},
		
		showACStime: function()
		{
			if (!Utils.script) return;
			
			var str = Utils.script.innerHTML.match(/durationAKS\s*=\s*(\d+)\s*\;/i);
			if (!str || !Utils.XPathSingle('//*[@id="button2" and @class="on"]') ) return;
			
			var tick = parseInt(str[1], 10);
			if (!tick) return;
			this.dateACS = DateTime.getFinishTime(tick);
			
			this.stateACS = 0;
			this.intervalACS = setInterval(function(){FleetSend.checkACStime() }, 1000);
			
			var li = document.createElement('li');
			li.style.color = 'yellow';
			li.innerHTML = Options.Interface.lbl_ArrivalACS+': <span class="value" id="timeACS">'+DateTime.formatDate2(this.dateACS)+'</span>';
			Utils.insertAfter(li, document.getElementById('aks') );
			
			// fixing layout
			var h = Utils.XPathSingle('//*[@id="roundup"]/descendant::UL').offsetHeight;
			if (h > 125) {
				h -= 125;
				var div = Utils.XPathSingle('//*[@id="sendfleet"]/DIV');
				if (div) div.style.paddingTop = '' + (parseInt(div.style.paddingTop) + h) + 'px';
			}
			
		},
		
		Fleet3_Run: function()
		{
			this.setMission();
			this.showACStime();
		}
	}
	
	
	// =======================================================================
	// functions for Galaxy view
	// =======================================================================
	var Galaxy =
	{
		highlightAllyPlayer: function(row)
		{
			function highlight(who, xpath)
			{
				var node = Utils.XPathSingle(xpath, row);
				if(!node || !node.firstChild) return;
				
				var name = node.firstChild.nodeValue;
				if(!name) return;

				var color = this[who+'Colors'][name];
				if (color) node.style.color = color;
			}
			
			highlight('Player', 'descendant::A[contains(@rel,"player")]/SPAN');
			highlight('Ally', 'descendant::SPAN[contains(@rel,"alliance")]');
		},
		
		prepareAllyPlayerColors: function()
		{
			function prepare(who)
			{
				var names = Options['galaxy_'+who+'s'].split(',');
				var colors = Options['galaxy_'+who+'Colors'].split(',');
				
				this[who+'Colors'] = [];
				
				for (var i=0; i<names.length; i++)
					if (names[i] || colors[i]) this[who+'Colors'][names[i]] = colors[i];
			}
			
			prepare('Player');
			prepare('Ally');
		},
		
		showCurrent: function(row)
		{
			try {
				var url = window.location.href;
				coords = url.match(/galaxy=(\d{1,2})&system=(\d{1,3})&position=(\d{1,2})/i);
				if (!coords) coords = url.match(/galaxy=(\d{1,2})&system=(\d{1,3})&planet=(\d{1,2})/i);
				
				if (!coords) return;

				var galaxy = document.getElementById('galaxy_input').value;
				var system = document.getElementById('system_input').value;
				var position = Utils.getElementByClassName('position', row).innerHTML;

				if (coords[1]!=galaxy || coords[2]!=system || coords[3]!=position)
					return;

				row.style.borderStyle = 'dashed';
				row.style.borderColor = 'yellow';
				row.style.borderWidth = '1px';
				document.getElementById('galaxytable').style.borderCollapse='collapse';
			}
			catch (e) { Utils.log(e) }
		},
		
		showDebris: function (row)
		{
			try {
				var debris = Utils.getElementByClassName('debris', row);

				var link = Utils.getElementByClassName('TTgalaxy', debris);
				if(!link) return;

				var img = link.getElementsByTagName('img')[0];

				// getting resources of this DF
				var content = Utils.getElementsByClassName('debris-content',debris);
				var resources = new Array();
				var sum = 0;

				for ( var i=0; i<content.snapshotLength; i++) {
					var res = ''+content.snapshotItem(i).innerHTML.split(' ')[1];

					resources[i] = res;
					res = res.replace(/\./g, '');

					sum += parseInt(res, 10);
				}

				// creating a new DIV element
				newNode = document.createElement('div');
				newNode.className = 'anti_debris';

				var style = 'color:#CCCCCC; padding: 1px; text-align:center;';
				if (sum>Options.galaxyDebrisMin && Options.galaxyDebrisMin>0) style += 'background-color:'+Options.galaxyDebrisColor+';';

				newNode.setAttribute('style', style);
				newNode.innerHTML = ''+resources[0]+'<br/>'+resources[1];
				
				link.replaceChild(newNode, img);
			} catch (e) { Utils.log(e) }
		},

		showMoon: function (row)
		{
			try {
				var size = Utils.XPathSingle('TD[@class="moon"]/DIV/DIV/DIV/UL/LI[3]/SPAN', row);
				if (!size) return;
				
				size = Options.Interface.lbl_Moon + ': ' + Utils.parseInt(size.innerHTML);
				var img = Utils.XPathSingle('TD[@class="moon"]/A/IMG',row);
				img.parentNode.style.color = '#CCCCCC';
				img.alt = size;
				
				if (Options.galaxyHideMoon)
					img.src = '';

			} catch (e) { Utils.log(e) }
		},

		showRank: function (row) 
		{
			try {
				var player = Utils.getElementByClassName('playername', row);
				var rank = Utils.getElementByClassName('rank', player);

				if (!rank) return;
				rank = Utils.parseInt(rank.innerHTML);

				if (rank)
				{
					newNode = document.createElement('span');
					newNode.setAttribute('class','anti_rank');
					newNode.innerHTML = ' #'+rank;
					
					var color=Options.galaxyRankColor;
					
					if (rank==0) color=Options.constRank0;
					else if (rank<=10) color=Options.galaxyRank10;
					else if (rank<=50) color=Options.galaxyRank50;
					else if (rank<=100) color=Options.galaxyRank100;
					else if (rank<=200) color=Options.galaxyRank200;
					else if (rank<=800) color=Options.galaxyRank800;
					
					newNode.style.color = color;
					
					player.appendChild(newNode);
				}
			} catch (e) { Utils.log(e) }
		},

		showAllyRank: function (row) 
		{
			var ally = Utils.getElementByClassName('allytag', row);
			var rank = Utils.getElementByClassName('rank', ally);
			var members = Utils.getElementByClassName('members', ally);

			if (!rank) return;

			rank = Utils.parseInt(rank.innerHTML);
			members = Utils.parseInt(members.innerHTML);
			
			var str = '';
			if (rank && !isNaN(rank)) str += '#'+rank;
			if (members && !isNaN(members)) str += '/'+members;

			if (str)
			{
				newNode = document.createElement('span');
				newNode.className = 'anti_allyrank';
				newNode.innerHTML = ' '+str;

				color=Options.galaxyRankColor;
				newNode.style.color = color;

				ally.appendChild(newNode);
			}
		},
		
		onDOMNodeInserted: function(e)
		{
			if(!e || !e.target || !e.target.id) return;
			if( e.target.id == "galaxytable")  Galaxy.redrawGalaxy();
		},

		redrawGalaxy: function ()
		{
			try {
				document.body.removeEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);
			
				var rows = Utils.XPath('//*[@id="galaxyContent"]/descendant::*[@class="row"]');
				for ( var i=0; i<rows.snapshotLength; i++ ) {
					var row = rows.snapshotItem(i);
					
					if (Options.galaxyShowRank) {
						this.showRank(row);
						this.showAllyRank(row);
					}
					this.showDebris(row);
					this.showCurrent(row);
					this.showMoon(row);
					this.highlightAllyPlayer(row);
					
				}
				
				document.body.addEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);	
			}
			catch(e) { Utils.log(e); }
		},

		Run: function()
		{
			this.prepareAllyPlayerColors();
			
			document.body.addEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);
		}
	}

		
	// =======================================================================
	// functions for Plunder calculation
	// =======================================================================

	var Plunder = 
	{
		readValue: function(cell)
		{
			return parseInt(cell.innerHTML.replace(/\D/g, ''), 10);
		},

		insertTable: function(container, mytable)
		{
			var table = document.createElement('table');
			table.className = 'fleetdefbuildings spy plunder';
			mytable.title_class = 'area plunder';	
			mytable.key_class = 'plkey plunder';
			mytable.value_class = 'plvalue plunder';
			table.innerHTML = mytable.createTableString(2);

			container.appendChild(table);
		},
		
		calculatePlunder: function(report)
		{
			this.plunder_metal = this.plunder_crystal = this.plunder_deuterium = 0;
			
			var cells = Utils.XPath('descendant::*[contains(@class,"fragment")]/descendant::TD', report);

			this.plunder_metal = Plunder.readValue(cells.snapshotItem(1)) / 2;
			this.plunder_crystal = Plunder.readValue(cells.snapshotItem(3)) / 2;
			this.plunder_deuterium = Plunder.readValue(cells.snapshotItem(5)) / 2;
		},
		
		calculateDebris: function(report)
		{
			this.debris_metal = this.debris_crystal = 0;
			
			var fleet = Utils.getElementByClassName('fleetdefbuildings spy !plunder', report);
			if (!fleet) return;

			var cells = Utils.getElementsByClassName('key', fleet);

			var first = 0, metal = 0, crystal = 0;
			for (var i=0; i<cells.snapshotLength; i++) 
			{
				var cell = cells.snapshotItem(i);
				var txt = cell.innerHTML;
				var cntNode  = cell.nextSibling;

				for (var j in Ogame.ships)
				{ 	
					var ship = Ogame.ships[j];
					var label = Options.Labels['lbl_ship'+ship.name];

					if (label && txt.indexOf(label) > -1)
					{
						var cnt = Plunder.readValue(cntNode);
						metal += cnt * ship.metal;
						crystal += cnt * ship.crystal;
						first = j;
						break;
					}
				}
			}
			
			this.debris_metal = metal * 0.3;
			this.debris_crystal = crystal * 0.3;

		},

		showPlunder: function (report)
		{
			var total = (this.plunder_metal + this.plunder_crystal + this.plunder_deuterium) * 2;

			var capacity_needed =
				Math.max(	this.plunder_metal + this.plunder_crystal + this.plunder_deuterium,
							Math.min(	(2 * this.plunder_metal + this.plunder_crystal + this.plunder_deuterium) * 3 / 4,
										(2 * this.plunder_metal + this.plunder_deuterium)
									)
						);

			var small_cargos = Math.ceil(capacity_needed/5000);
			var large_cargos = Math.ceil(capacity_needed/25000);

			SimpleTable.init(Options.Interface.lbl_resources);
			SimpleTable.addCell(Options.Interface.lbl_total, total);
			SimpleTable.addCell(Options.Interface.lbl_loot, Math.floor(total/2));
			SimpleTable.addCell(Options.Interface.lbl_shipLCargoAlt, large_cargos);
			SimpleTable.addCell(Options.Interface.lbl_shipSCargoAlt, small_cargos);
			
			Plunder.insertTable(report, SimpleTable);
		},

		showDebris: function (report)
		{
			var total = this.debris_metal + this.debris_crystal;
			
			SimpleTable.init(Options.Interface.lbl_debris);
			SimpleTable.addCell(Options.Interface.lbl_metal, this.debris_metal);
			SimpleTable.addCell(Options.Interface.lbl_crystal, this.debris_crystal);
			SimpleTable.addCell(Options.Interface.lbl_total, total);
			SimpleTable.addCell(Options.Interface.lbl_shipRecyclerAlt, Math.ceil(total/20000));
			
			Plunder.insertTable(report, SimpleTable);
		},

		Show: function()
		{
			var container;
			if ( Utils.isCurrentPage('showmessage') ) {
				container = document.getElementById("messagebox");
			} else {
				container = document.getElementById("messageContent");
			}

			var rows = Utils.getElementsByClassName('material spy', container);

			for (var i=0; i<rows.snapshotLength; i++) {
				var report = rows.snapshotItem(i).parentNode;

				Plunder.calculatePlunder(report);
				Plunder.calculateDebris(report);
				
				if (Options.msg_PlunderThreshold && Utils.isCurrentPage('messages') ) {
					var total_pl = this.plunder_metal + this.plunder_crystal + this.plunder_deuterium;
					var total_df = this.debris_metal + this.debris_crystal;
					if (total_pl < Options.msg_PlunderThreshold*1000 && total_df < Options.msg_DebrisThreshold*1000)
						document.getElementById( report.parentNode.parentNode.id.replace('spioDetails_','')+'TR' ).className += ' smallplunder';
				}
				
				if (Options.msg_showPlunder) {
					Plunder.showPlunder(report);
					Plunder.showDebris(report);
				}
			}
		}

	}


	var Messages = 
	{
		addButtons: function()
		{
			function insertButton(value, mod, title) {
			
				if (!title && mod>0) {
					var opt = Utils.XPathSingle('//SELECT/OPTION[@id="'+mod+'"]');
					if (opt) title = opt.innerHTML;
				}
			
				var btn = document.createElement('input');
				btn.type = 'button';
				btn.value = value;
				
				if (mod==12) btn.style.color = '#00CC22';
				else if (mod==-12) btn.style.color = '#229922';
				else if (mod==7) btn.style.color = '#660011';
				else if (mod==-7) btn.style.color = '#993300';
				else if (mod==9) btn.style.color = '#990000';
				
				if (title) btn.title = title;
				btn.setAttribute('mod', mod);
				span.appendChild(btn);
			}

			// Recycle bin
			if (Utils.unsafeWindow.aktCat == 3) return;
			
			var span = document.createElement('span');
			span.className = 'msgButtons';

			insertButton('V', 12);
			insertButton('VV', -12, Options.Interface.lbl_btnMarkReadAll);
			insertButton('X', 7);
			insertButton('Xx', -7, Options.Interface.lbl_btnDeleteSmallPlunder);
			insertButton('XX', 9);
			
			var form = document.getElementsByTagName('form')[0];
			form.parentNode.insertBefore(span, form);
			
			var $ = Utils.unsafeWindow.$;
			$('.msgButtons').clone(true).insertAfter('form');
			$('.msgButtons input').click(Messages.onButtonClick);
		},
		
		onButtonClick: function()
		{
			try {
				var mod = this.getAttribute('mod');
				
				if (mod>0) {
					Utils.unsafeWindow.mod = mod;
					Utils.trigger(Utils.getElementByClassName('buttonOK deleteIt'), 'click');
				}
				
				else if (mod == -12 || mod == -7) {
					var delIds = []; 
					var classname = ( mod == -12) ? 'trigger new' : 'trigger smallplunder';
					var nodes = Utils.getElementsByClassName(classname);
					
					for (var i=0; i<nodes.snapshotLength; i++)
						delIds.push( nodes.snapshotItem(i).id.toString().replace(/\D/g, '') );
					
					Utils.unsafeWindow.executeAction(delIds, -mod);
				}
			} catch (e) { Utils.log(e) }
		},
		
		changeNodesTime: function (xpath, format)
		{
			nodes = Utils.XPath(xpath);

			for (var i = 0; i < nodes.snapshotLength; i++)
				{
					var node = nodes.snapshotItem(i);
					node.innerHTML = DateTime.convertStringServer2Local(node.innerHTML, format);
				}
		},
		
		changeTimes: function()
		{
			if (Utils.isCurrentPage('messages'))
			{
				this.changeNodesTime(
					'//*[@id="mailz"]/TBODY/TR[contains(@class,"entry")]/*[@class="date"]',
					'[d].[m].[Y] [H]:[i]:[s]' );
					
				this.changeNodesTime(
					'//*[@id="mailz"]/TBODY/TR[contains(@id,"spioDetails")]/descendant::*[@class="material spy"]/TBODY/TR/TH',
					'[m]-[d] [H]:[i]:[s]' );
			}

			else if (Utils.isCurrentPage('showmessage'))
			{
				this.changeNodesTime(
					'//*[contains(@class,"infohead")]/TABLE/TBODY/TR[last()]/TD | '+
					'//*[@id="battlereport"]/P',
					'[d].[m].[Y] [H]:[i]:[s]' );

				this.changeNodesTime(
					'//*[@class="material spy"]/TBODY/TR/TH',
					'[m]-[d] [H]:[i]:[s]' );
			}

		},

		Show: function(evt)
		{
			try {
				if (evt && evt.target.tagName != 'FORM')
					return;
					
				var need_plunder = false;
				if ( Utils.isCurrentPage('messages') && Options.msg_PlunderThreshold && (Options.msg_foldSmallPlunder || Options.msg_addButtons) )
					need_plunder = true;
					
				if (Options.msg_showPlunder || need_plunder) {
					Plunder.Show();
				}
				
				if (Options.showLocalTime) {
					Messages.changeTimes();
				}
				
				if ( Utils.isCurrentPage('messages') && Options.msg_PlunderThreshold && Options.msg_foldSmallPlunder)
					setTimeout( function() { Utils.$('.smallplunder .subject a').trigger('click') }, 0);

				if ( Options.msg_addButtons && Utils.isCurrentPage('messages') ) {
					Messages.addButtons();
				}
				
				if ( Utils.isCurrentPage('showmessage') ) {
					var span = Utils.XPathSingle('//DIV[@class="note"]/SPAN[@class="tips" and @title]');
					if (span) {
						var text = span.title.toString();
						text = text.replace(/<br>$/gi, '').replace(/<br>/gi, ', ').replace(/\|/gi, '');
						if (text) span.innerHTML += ' ('+text+')';
					}
				}
			}
			catch(e) {
				Utils.log(e);
			}
		},
		
		insertCSSRules: function()
		{
			Utils.insertCSSRule(".plkey { width: 30% }");
			Utils.insertCSSRule(".plvalue { width: 20% }");
			Utils.insertCSSRule(".plunder { border: 1px solid grey !important; }");
			Utils.insertCSSRule("table.plunder { border-collapse: collapse; }");
			Utils.insertCSSRule(".plkey, .plvalue { padding: 5px !important; }");
			
			if ( Utils.isCurrentPage('messages') ) {
				Utils.insertCSSRule('.msgButtons input { ' +
					'-moz-background-clip:border;' +
					'-moz-background-inline-policy:continuous;' +
					'-moz-background-origin:padding;' +
					'background:transparent url(./img/layout/formular_buttons.gif) no-repeat scroll -88px -54px;' +
					'border:0 none;' +
					'color:#0D1014;' +
					'cursor:pointer;' +
					'font-size:11px;' +
					'font-weight:700;' +
					'text-align:center;' +
					'height: 27px; ' +
					'width: 42px; ' +
					'}');
					
				Utils.insertCSSRule('.msgButtons input:hover { ' +
					'background:transparent url(./img/layout/formular_buttons.gif) no-repeat scroll -88px -80px;' +
					'}');

			}

		},

		
		Run: function()
		{
			this.insertCSSRules();
			
			if ( Utils.isCurrentPage('messages') )
				document.getElementById('section2').addEventListener('DOMNodeInserted', this.Show, false);
			else
				this.Show();

		}

	}

	
	// =======================================================================
	// Various resources calculation
	// =======================================================================
	
	var Resources = 
	{
		res_array: ['metal', 'crystal', 'deuterium', 'energy'],
		res_array_firstcap: ['Metal', 'Crystal', 'Deuterium', 'Energy'],
		currentRes: {}, 
		costRes: {},
		
		addCell: function(key, value)
		{
			if (this.html) this.html += ' ';
			this.html += key+':<span class="time" style="padding-right: 0px">'+Utils.formatNumber(value)+'</span>';
		},

		showMissing: function()
		{
			try{
				// will not show missing res if the construction is already in process
				if (Utils.getElementByClassName('abort')) return;

				container = Utils.XPath('//*[@id="detail"]/DIV[@class="pic"]').snapshotItem(0);
				if (!container) return;

				SimpleTable.init(Options.Interface.lbl_deficientRes);
				
				var sum = 0, show = false;
				
				for (var i=0; i<this.res_array.length; i++) {
					var attr = this.res_array[i];
					
					if (attr != 'energy')
						this.currentRes[attr] = Utils.getIntById('resources_'+attr);
					else {
						var energy = document.getElementById('energy_box').title;
						energy = energy.match(/\([\-\d\.]+\/([\-\d\.]+)\)/);
						if (energy) 
							this.currentRes[attr] = Utils.parseInt(energy[1]);
					}
					
					this.costRes[attr] = Utils.getIntByXPath(
						'//*[@id="content"]/descendant::*[@id="resources"]/LI[contains(@title,"'+Options.Labels['lbl_'+attr]+'")]',
						'title');

					if (this.costRes[attr] == null) continue;
						
					var def = this.costRes[attr] - this.currentRes[attr];

					if (def>0) {
						SimpleTable.addCell(Options.Labels['lbl_'+attr], def, attr);
						show = true;
						
						if (attr != 'energy') sum += def;
					}
				}

				if (!show) return;
				
				var html = '<table>'+SimpleTable.createTableString()+'</table>';
				
				SimpleTable.init('');
				SimpleTable.addCell(Options.Labels.lbl_shipSCargo, Math.ceil(sum/5000));
				SimpleTable.addCell(Options.Labels.lbl_shipLCargo, Math.ceil(sum/25000));
				
				html += '<table>'+SimpleTable.createTableString()+'</table>';
				
				var node = document.createElement('div');
				node.id = 'deficient';
				
				node.innerHTML = html;
				container.appendChild(node);
			}
			catch (e) { Utils.log(e) }

		},

		showProduction: function()
		{
			try {
				var node = Utils.XPathSingle('//DIV[contains(@class,"buildingimg")]/descendant::A[contains(@id,"details") and contains(@class,"active")][@ref]');
				if (!node) return;

				var level = Utils.getElementByClassName('level',node);
				if (!level) return;
				
				var id = Utils.parseInt(node.getAttribute('ref'));
				level = Utils.parseInt(level.lastChild.nodeValue);

				var str, oldvalue, newvalue;
				var $ = Utils.$;
				
				// energy consumption
				var spareEnergy = Utils.getIntById('resources_energy');
				var energy = $('#action ul li')
					.filter( function(){return $(this).html().indexOf( Options.Labels.lbl_RequiredEnergy ) >- 1 } )
					.find('.time')
				;
				energy.after( Utils.addSpanMark( spareEnergy - Utils.parseInt( energy.html() ) ) );

				// deuterium consumption in fusion reactor
				if (id == 12) {
					oldvalue = -Ogame.getConsumption(id,level);
					newvalue = -Ogame.getConsumption(id,level+1);
					str = '<li>'+Options.Labels['lbl_deuterium']+': <span class="time">'+Utils.formatNumber(newvalue)+'</span> '
						+ Utils.addSpanMark(newvalue-oldvalue)+'</li>';
					$('#action ul').append(str);
				}

				// res/energy production
				oldvalue = Ogame.getProduction(id,level);
				newvalue = Ogame.getProduction(id,level+1);
				if (newvalue) {
					str = '<li>'+Options.Interface.lbl_Production + ': <span class="time">'+Utils.formatNumber(newvalue)+'</span> '
						+ Utils.addSpanMark(newvalue-oldvalue)+'</li>';
					
					$('#action ul').append(str);
				}
				
				// storage capacity
				oldvalue = Ogame.getStorageCapacity(id,level);
				newvalue = Ogame.getStorageCapacity(id,level+1);
				if (newvalue) {
					var label = $('#description div.display div').get(0).firstChild.nodeValue;
					str = '<li>'+label+' <span class="time">'+Utils.formatNumber(newvalue)+'</span> '
						+ Utils.addSpanMark(newvalue-oldvalue)+'</li>';
					
					$('#action ul').append(str);
				}
				
				// if at least 1 line was appended - increase size of the container
				if (str) $('#action ul').css('padding-top', '0');
				
			} catch (e) { Utils.log(e) }
			
		},
		
		Missing_Show: function(e)
		{
			if (e.target.id != 'content') return;
			
			this.showMissing();

			if (Utils.isCurrentPage('resources'))
				this.showProduction();
		},

		Missing_insertCSSRules: function()
		{
			Utils.insertCSSRule(
			'#deficient table tr td, #deficient table tr th {\
				padding: 1px;\
				font-size: 11px;\
				color: white;\
				/*font-family: "Arial";*/ \
				}');

			Utils.insertCSSRule(
			'#deficient {\
				background: transparent url("'+Utils.bg+'") repeat;\
				position: absolute;\
				bottom: 0;\
				right: 0;\
				}\
				');
		},

		Missing_Run: function()
		{
			this.Missing_insertCSSRules();
			var container = document.getElementById('planet');
			container.addEventListener(
				'DOMNodeInserted',
				function(e){ 
					setTimeout( function(){Resources.Missing_Show(e) }, 0 )
				},
				false);
		},
		
		Resources_insertCSSRules: function()
		{
			Utils.insertCSSRule(
			'.antires {\
				margin: 2px;\
				padding: 4px;\
				display: block;\
				width: 160px;\
				float: left;\
				background-color: #111115;\
				border: 1px solid #606060;\
				text-align: center;\
				font-size: 10px;\
				list-style: none outside; \
				margin-left: -40px; \
				}');
				
			Utils.insertCSSRule(
			'.finishtime {\
				color: green;\
				}');
				
			Utils.insertCSSRule(
			'#links {\
				overflow: visible;\
				}');
		},
		
		Resources_Run: function()
		{
			if ( !document.getElementById('metal_box') ) return;
			this.Resources_insertCSSRules();
			
			var box = document.getElementById('box');
			if (box) box.style.paddingBottom='0';
			
			var menu = document.getElementById('menuTable');
			
			for (var i=0; i<this.res_array.length; i++)
			{
				var res = this.res_array[i];
				var ticker_name = 'resourceTicker'+this.res_array_firstcap[i];
				var ticker_id = 'antires_'+res;
				
				var node = document.createElement('li');
				node.className = 'antires';
				
				var html = document.getElementById(res+'_box').title;
				html = html.replace('|','');
				html = html.replace(/([\d\.]+)\//gi, '<span id="'+ticker_id+'">$1</span> / ');
				node.innerHTML = html;
				menu.appendChild(node);

				if (res != 'energy') {
					var t = Utils.unsafeWindow[ticker_name];
					var time_to_fill = t.production ? Math.floor((t.limit[1] - t.available)/t.production) : -1;

					if (time_to_fill>0) {
						node.innerHTML += '<br/><span class="finishtime">'+DateTime.formatDate2(DateTime.getFinishTime(time_to_fill))+'</span>';
					}

					var script = '\
						var newticker = {};\
						newticker.available = oldticker.available;\
						newticker.limit = oldticker.limit;\
						newticker.production = oldticker.production;\
						newticker.valueElem = ticker_id;\
						if (!vacation) new resourceTicker(newticker);\
					';

					script = script.replace(/oldticker/g, ticker_name);
					script = script.replace(/newticker/g, ticker_name+'2');
					script = script.replace(/ticker_id/g, '"'+ticker_id+'"');
					
					Utils.runScript(script);
				}

			}
		}
	}
	
	var Stats = {
		showStatsDifs: function(e)
		{
			if (!e.relatedNode || !e.target)
				return;
			if (e.relatedNode.getAttribute("id") != "statisticsContent")
				return;
			if (e.target.getAttribute("class") != "content")
				return;
			allStats = Utils.XPath('//*[@class="overmark" or @class="undermark"][@title]');
			for (var i = 0; i < allStats.snapshotLength; i++)
				allStats.snapshotItem (i).innerHTML = allStats.snapshotItem (i).getAttribute ("title");
		},

		Run: function()
		{
			document.getElementById ('statisticsContent').addEventListener ("DOMNodeInserted", function (e) { Stats.showStatsDifs (e); }, false);
		}
	}
	

	try	{
		// REMINDER: these objects should be initialized strictly in the following order:
		// Utils, Options, DateTime
		
		Utils.Init();

		// checking whether we have redesign at this server
		if (!Utils.checkRedesign()) return;
		
		Options.Init();
		DateTime.Init();
		Ogame.Init();
		
		if (Options.autocopyCoords)
			Coords.Init();

		if (Options.blockAutoComplete && !Utils.isCurrentPage('movement')) {
			Utils.blockAutocomplete();
		}
		
		if (Utils.isCurrentPage('research') /*&& Utils.isFirefox*/)
			Ogame.readTechs();

		if ( Utils.isCurrentPage('fleet1') ) {
			FleetSend.Fleet1_Run();
		}
		else if ( Utils.isCurrentPage('fleet2') ) {
			FleetSend.Fleet2_Run();
		}
		else if ( Utils.isCurrentPage('fleet3') ) {
			FleetSend.Fleet3_Run();
		}
		else if ( Utils.isCurrentPage('galaxy') ) {
			Galaxy.Run();
		}
		else if ( Utils.isCurrentPage('movement') ) {
			FleetMovement.Run();
		}
		else if ( Utils.isCurrentPage('eventList') ) {
			EventList.Run();
		}
		else if ( Utils.isCurrentPage('showmessage,messages') ) {
			if ( Options.msg_fixColors && Utils.isCurrentPage('messages') )
			{
				Utils.insertCSSRule('.combatreport_ididattack_iwon { color: #00B000; }');
				Utils.insertCSSRule('.combatreport_ididattack_ilost { color: #D02222; }');
				Utils.insertCSSRule('.combatreport_ididattack_draw { color: #C0C000; }');
			}

			Messages.Run();
		}
		else if ( Utils.isCurrentPage('statistics') ) {
			Stats.Run();
		}
		else if ( Utils.isCurrentPage('overview,resources,shipyard,station,defense') ) {
			if (Options.showFinishTime) FinishTime.ShowConstructions();
		}

		if ( Utils.isCurrentPage('overview') && Options.showEventList )	
			EventList.showEventList();
		
		if ( Utils.isCurrentPage('resources,station,research,shipyard') && Options.showDeficient )
			Resources.Missing_Run();
			
		if ( Options.showResources )
			Resources.Resources_Run();
			
	}
	catch (e) { 
		Utils.log(e);
	}


}) ()