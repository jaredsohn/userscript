// ==UserScript==
// @name           GuedesGame
// @namespace      antiGuedes
// @description    Teste de antigame
// @version	0.0.1
// include        http://*.ogame.*/game/index.php?page=*
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

// Recent changes:

/*
teste
*/

var cmgp = document.getElementById('playerName');
var AntigameFunc = function()
{
	var version = '.0.0.1';
	
	var mywindow;
	if((typeof unsafeWindow) != "undefined")
		mywindow = unsafeWindow;
	else
		mywindow = window;
	
	if (mywindow.AntiGame_started) return;
	mywindow.AntiGame_started = 1;
	
	var AntiGame_lang = {};
	
	AntiGame_lang.LabelsBR =
	{
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruir Lua',
		lbl_missEspionage: 'Espionar',
		lbl_missExpedition: 'Expedição',
		lbl_missFederation: 'ACS',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Manter Posições',
		lbl_missTransport: 'Transportar',
		
		lbl_shipSCargo: 'CP',
		lbl_shipLCargo: 'CG',
		lbl_shipLFighter: 'CL',
		lbl_shipHFighter: 'CP',
		lbl_shipCruiser: 'CZ',
		lbl_shipBattleship: 'NB',
		lbl_shipColonizator: 'Colonização',
		lbl_shipRecycler: 'Reciclador',
		lbl_shipSpy: 'SPY',
		lbl_shipBomber: 'BB',
		lbl_shipDestroyer: 'DD',
		lbl_shipRIP: 'EDM',
		lbl_shipBCruiser: 'Battlecruiser',
		lbl_shipSatellite: 'Sats',
		
		lbl_defRLauncher: 'LM',
		lbl_defLLaser: 'LL',
		lbl_defHLaser: 'LP',
		lbl_defGauss: 'Gauss',
		lbl_defIon: 'Ions',
		lbl_defPlasma: 'Plasma',
		lbl_defSShield: 'P. Escudo',
		lbl_defLShield: 'G. Escudo',
		
		lbl_RequiredEnergy: 'Energia necessária',
		
		rx_sendMail: /Enviar mensagem para (.+)\./
		
	}
	
	AntiGame_lang.InterfaceBR =
	{
		opt_languageName: 'Português',
	
		opt_title: 'Opções',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Default',

		opt_language: 'Language',
		opt_update_check: 'Auto-check for updates',
		opt_thousandSeparator: 'Thousand separator',
		opt_blockAutoComplete: 'Block Auto-Complete in Firefox',
		
		opt_showDeficient: 'Show missing resources',
		opt_showResources: 'Show extended resources information',
		opt_showNames: 'Show ship/building/research names over images',
		opt_nameColorOn: 'Name color: available',
		opt_nameColorOff: 'Name color: unavailable',
		opt_nameColorDisabled: 'Name color: not enough resources',
		opt_showConstructionTitle: 'Show construction titles in the planet list',
		opt_shortHeader: 'Always minimize planet image',
		opt_misc_scrollTitle: 'Scroll time to the next event in the window title',

		opt_uni_reDesigned: 'Old universe with the re-design installed',
		opt_uni_SpeedFactor: 'Speed factor of this universe',
		opt_uni_DFPercent: 'Percentage of fleet structure to debris',
		opt_uni_DefenseToDF: 'Percentage of defense to debris',
		
		opt_timeSetting: 'Change time values (hours only)',
		opt_showServerOgameClock: 'Keep server time for top-right Ogame clock',
		opt_showServerPhalanx: 'Keep server time for Phalanx view',
		opt_showPageStartTime: 'Display the time the page was last refreshed',
		opt_timeAMPM: 'Use 12-hours format (AM/PM) instead of 24-hours',
		
		opt_timeDontChange: 'Don\'t change time',
		opt_timeLocal: 'Always set to local timezone',
		opt_timeServer: 'Always set to server timezone',

		opt_killTips: 'Kill tooltips',

		opt_showEventList: 'Show unfolded Event list on Overview',
		opt_evt_showOnTop: 'Position of the Event list on the screen',
		opt_evt_showReduced: 'Reduced Event list',
		opt_evt_TimeMode: 'Clock/Countdown by default in the reduced Event List',
		opt_evt_noScroll: 'No frame scrollbars appear when tooltips are displayed',
		opt_phalanx_showDebris: 'Show theoretical debris in Phalanx view',
		opt_evt_expandFleetsEvt: 'Show fleet composition and cargo (EventList)',
		opt_evt_expandFleetsPhal: 'Show fleet composition and cargo (Phalanx)',
		
		opt_galaxyShowRank: 'Show player/alliance ranks in Galaxy view',
		opt_galaxyRankColor: 'Player/alliance ranks color',
		opt_galaxyDebrisMin: 'Minimal size of debris to highlight (0 to turn off)',
		opt_galaxyDebrisColor: 'Color of highlighted debris',
		opt_galaxyHideMoon: 'Hide Moon picture (display moon size instead)',
		opt_galaxy_Players: 'Highlight the following players',
		opt_galaxy_PlayerColors: 'Colors for player highlighting',
		opt_galaxy_Allys: 'Highlight the following alliances',
		opt_galaxy_AllyColors: 'Colors for alliance highlighting',
		opt_galaxy_keepTipsPlanets: 'Keep tooltips for planets and moons',
		opt_galaxy_keepTipsDebris: 'Keep tooltips for debris fields',
		
		opt_msg_PlunderThreshold: 'Low limit for theoretical plunder (x1000)',
		opt_msg_DebrisThreshold: 'Low limit for theoretical debris (x1000)',
		opt_msg_foldSmallPlunder: 'Fold reports with plunder and debris less than the limit',
		opt_msg_showPlunder: 'Show plunder in spy reports',
		opt_msg_addButtons: 'Additional buttons on Messages',
		opt_msg_fixColors: 'Fix colors of combat reports',
		
		opt_fleet_showCapacity: 'Show ships capacity and speed',
		opt_fleet1_showResCalc: 'Show resource calculator',
		opt_uni_maxPlayerScore: 'The strongest player has more than 5M points',
		opt_autocopyCoords: 'Auto-copy coordinates',
		opt_autocopyGlobal: 'Memorize coordinates from any page (not only current Ogame universe tabs)',
		opt_fleet2_setTargetDF: 'Set target to DF if the fleet includes recyclers',
		opt_fleet2_fixLayout: 'Fix flight information layout (page 2)',
		opt_fleet2_ShortLinks: 'Target shortlinks (page 2)',
		opt_fleet2_MoonColor: 'Color for moons in the shortlink list',
		opt_fleet2_MoonsToEnd: 'Move moons to the end of the shortlinks list',
		opt_fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',
		opt_fleet2_checkProbeCapacity: 'Check probes capacity before departure(page 2)',
		
		opt_missionPriority: 'Mission priority',
		
		opt_mvmt_expandFleets: 'Show fleet ships and cargo',
		opt_mvmt_showReversal: 'Show reversal time for fleets',
		
		opt_missAttack: 'Mission color: Attack',
		opt_missColony: 'Mission color: Colonization',
		opt_missDeploy: 'Mission color: Deploy',
		opt_missDestroy: 'Mission color: Destroy',
		opt_missEspionage: 'Mission color: Espionage',
		opt_missExpedition: 'Mission color: Expedition',
		opt_missFederation: 'Mission color: Federation',
		opt_missHarvest: 'Mission color: Harvest',
		opt_missHold: 'Mission color: Hold',
		opt_missTransport: 'Mission color: Transport',
		opt_msg_addSimButton: 'Add buttons for submitting spy reports to WebSim',
		
		lbl_missAttack: 'Attack',
		lbl_missColony: 'Colonization',
		lbl_missDeploy: 'Deployment',
		lbl_missDestroy: 'Moon Destruction',
		lbl_missEspionage: 'Espionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'ACS Attack',
		lbl_missHarvest: 'Harvest',
		lbl_missHold: 'ACS Defend',
		lbl_missTransport: 'Transport',

		lbl_sectionGeneral: 'General',
		lbl_sectionUniverse: 'Universe',
		lbl_sectionTime: 'Time settings',
		lbl_sectionEventList: 'Event list & Phalanx',
		lbl_sectionGalaxy: 'Galaxy',
		lbl_sectionMessages: 'Messages',
		lbl_sectionFleetDispatch: 'Fleet dispatch',
		lbl_sectionFleetMovement: 'Fleet movement',
		
		lbl_optionsNote1: 'The option is stored for this universe only',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Total capacity',
		lbl_MinSpeed: 'Minimal speed',
		lbl_ExPoints: 'Expedition points',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Resources',
		lbl_debris: 'Debris',
		lbl_total: 'Total',
		lbl_loot: 'Loot',
		lbl_metal: 'Metal',
		lbl_crystal: 'Crystal',
		
		lbl_shipSCargoAlt: 'SC',
		lbl_shipLCargoAlt: 'LC',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Missing resources',
		lbl_Production: 'Production',
		lbl_ArrivalACS: 'Arrival (ACS)',
		
		lbl_btnMarkReadAll: 'Mark all displayed messages as read',
		lbl_btnDeleteSmallPlunder: 'Delete spy reports with plunder < $plunder and debris < $debris',
		
		lbl_Moon: 'Moon',
		
		lbl_onTop: 'On top',
		lbl_onBottom: 'On bottom',
		lbl_onLeft: 'On left',
		
		lbl_installNewVersion: 'Click to install new version',
		lbl_Save: 'Save',
		lbl_Clear: 'Clear',
		lbl_Quantity: 'Quantity',
		lbl_Duration: 'Duration',
		lbl_Consumption: 'Consumption',
		
		lbl_tmTime: 'Time',
		lbl_tmCountdown: 'Countdown'
	}

	var Options =
	{
		// General
		language: '',
		update_check: true,
		blockAutoComplete: true,
		thousandSeparator: '--',
		showDeficient : true,
		showResources : 1,
		showNames: true,
		nameColorOn: '#FFFFFF',
		nameColorOff: '#777777',
		nameColorDisabled: '#D43635',
		showConstructionTitle: true,
		shortHeader: false,
		misc_scrollTitle: false,
		
		// Universe
		uni_reDesigned: false,
		uni_SpeedFactor: 4,
		uni_DFPercent: 30,
		uni_DefenseToDF: 0,
		
		// Time settings
		timeSetting: 1, // 0 - leave as is, 1 - local everywhere, 2 - server everywhere
		showServerOgameClock: false,
		showServerPhalanx: false,
		showPageStartTime: false,
		timeAMPM: false,
		showFinishTime: true,
		
		// EventList & Phalanx
		showEventList: true,
		evt_showOnTop: 0,
		evt_showReduced: false,
		evt_TimeMode: 1, // 1: Time, 2: Countdown
		evt_noScroll: false,
		phalanx_showDebris: true,
		evt_expandFleetsEvt: true,
		evt_expandFleetsPhal: true,
		
		// Fleet Movement
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
		
		// Fleet Dispatch
		
		// 1 - attack		2 - federation	3 - transport	4 - deploy	5 - hold	6 - espionage
		// 7 - colonization	8 - recycle		9 - destroy		15 - expedition
		mission1: 6,
		mission2: 1,
		mission3: 4,
		mission4: 3,
		mission5: 9,
		
		fleet_showCapacity: true,
		fleet1_showResCalc: true,
		uni_maxPlayerScore: false, 
		fleet1_killTips: false,
		fleet2_fixLayout: true,
		autocopyCoords: false,
		autocopyGlobal: false,
		fleet2_setTargetDF: false,
		fleet2_ShortLinks: "",
		fleet2_MoonColor: "#0000FF",
		fleet2_MoonsToEnd: false,
		fleet2_expandLists: true,
		fleet2_checkProbeCapacity: true,
		
		// Galaxy
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
		galaxy_killTips: false,
		galaxy_keepTipsPlanets: true,
		galaxy_keepTipsDebris: true,
		
		galaxy_Players: 'Legor,player 2',
		galaxy_PlayerColors: '#FF0000,#2222FF',
		galaxy_Allys: 'alliance 1,alliance 2',
		galaxy_AllyColors: '#FF00FF,#00FFFF',
		
		// Messages
		msg_PlunderThreshold: 10,
		msg_DebrisThreshold: 20,
		msg_foldSmallPlunder: true,
		msg_showPlunder: true,
		msg_fixColors: true,
		msg_addButtons: true,
		msg_killTips: false,
		msg_addSimButton: 1, // 0 - no, 1 - WebSim, 2 - DragoSim
	
		Labels: null,
		Interface: null,
		
		uni_options: 
		{
			fleet2_ShortLinks:1, galaxyDebrisMin:1, msg_PlunderThreshold:1, msg_DebrisThreshold:1, 
			galaxy_Players:1, galaxy_PlayerColors:1, galaxy_Allys:1, galaxy_AllyColors:1, fleet2_fixLayout:1,
			uni_SpeedFactor:1, uni_DFPercent:1, uni_DefenseToDF:1, uni_maxPlayerScore:1, uni_reDesigned:1
		},
		
		firefox_options: 
		{
			fleet2_setTargetDF:1,
			update_check:1
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
				var str_uni = Utils.getValueUni('antigame');
				
				if (!str) 
				{
					// read the settings in the old format (cookies)
					if (Utils.isOpera) 
					{
						str = Utils.getValue('antigame', '', 'COOKIE');
						if (str) Utils.setValue('antigame', str); // save it again in localStorage
					}
					if (!str) return;
				}

				if (str_uni) str += '&' + str_uni;

				str = str.split('&');

				for (var i=0; i<str.length; i++) {
					var pair = str[i].split('=');
					if (!pair || pair.length != 2) continue;

					var param = Options[pair[0]];
					switch (typeof(param))
					{
						case('number'): if ( !isNaN(parseInt(pair[1],10)) ) Options[pair[0]] = parseInt(pair[1],10); break;
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
				overflow-x:auto; \
				overflow-y:scroll; \
				border-top: 1px #555555 dashed; \
				border-bottom: 1px #555555 dashed; \
				}');
				
			Utils.insertCSSRule('#anti_options_window #content .sectiontitle {\
				text-align: left;\
				padding: 1px 0 1px 40%;\
				border: 1px solid #772277;\
				cursor: pointer; \
				margin-bottom: 4px; \
				font-weight: 700; \
				}');
				
			Utils.insertCSSRule('#anti_options_window #content .sectiontitle:hover {\
				border-color: yellow;\
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
				
			Utils.insertCSSRule('.anti_button { \
				display: block; \
				float: left; \
				width: 50px; \
				background:#442233; \
				border: 2px black solid; \
				text-decoration: none; \
				margin: 0px 5px 5px 5px; \
				padding: 2px 5px; \
				}');
			Utils.insertCSSRule('.anti_button:hover { \
				background:#664466; \
				}');
				
			Utils.insertCSSRule('#btnHomePage { \
				width: 80px; \
				}');
		},

		addOptionsButton: function()
		{
			try {
				var $ = Utils.$;
				var item = $('#menuTable li').eq(1).clone(true);
				
				var img = 				
				item.find('.menu_icon')
				.find('a')
					.attr({
						'class':'',
						'href':'javascript:void(0)'
					})
					.unbind('click')
					.click(function(){ setTimeout( function(){
							Coords.reset();
							Coords.initImg(null,true);

						}, 0) })
				.find('img')
					.attr({
						'id':'btnCoords',
						'width':'27',
						'height':'27'
						})
					.get(0)
				;
				
				Coords.initImg(img);
				
				item.find('.menubutton')
					.attr('href','javascript:void(0)')
					.attr('id','btnAntiOptions')
					.attr('target','_self')
					.removeClass('selected')
					.bind('click', Options.showWindow)
					//.find('.textlabel').html('Guedesgame v'+version);
					.find('.textlabel').html('v'+cmgp);
				item.appendTo('#menuTable');
				item.find('.menubutton2')
					.attr('href','http://supernovacapella.mygamesonline.org')
					.attr('id','btnAntiOptions2')
					.attr('target','_self')
					.removeClass('selected')
					.bind('click', Options.showWindow)
					//.find('.textlabel').html('Guedesgame v'+version);
					.find('.textlabel').html(cmgp);
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
				var str = '<a class="anti_button" id="'+id+'" href="javascript:void(0)">' +	Options.Interface['opt_'+id] + '</a>';
				return str;
			}
			
			function createButtonHref(id, href, label) {
				var str = '<a class="anti_button" target="_blank" id="'+id+'" href="' + href + '">' +
					(label || Options.Interface['opt_'+id]) + '</a>';
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
				if (Options.firefox_options[id] && !Utils.isFirefox) return '';
				
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
				title = title || ' ';
				var str = '<div class="'+classname+'"><div class="sectiontitle"><span class="indicator">▼</span> '+title+'</div><table class="hidden">';
				
				return str;
			}

			function endSection() {
				return '</table></div>';
			}

			var $ = Utils.unsafeWindow.$;

			// prepare dropdown boxes
			
			// missions
			var missions = [
				{value:1, text:Options.Interface.lbl_missAttack},
				{value:3, text:Options.Interface.lbl_missTransport},
				{value:4, text:Options.Interface.lbl_missDeploy},
				{value:5, text:Options.Interface.lbl_missHold},
				{value:6, text:Options.Interface.lbl_missEspionage},
				{value:9, text:Options.Interface.lbl_missDestroy},
				];
				
			missions.sort( function (a,b) { return (a.text==b.text) ? 0 :  (a.text<b.text) ? -1 : 1 } );
				
			// language
			var language_list = [];
			for (var i in AntiGame_lang) {
				var str = i.toString().match(/^Interface([A-Z]{2,3})$/);
				if (str)
					language_list.push( {value: str[1], text: AntiGame_lang[i].opt_languageName} );
			}
			
			// Thousand separator
			var separator_list = [ 
				{value:'--', text: Options.Interface.opt_btnDefault}, 
				{value:'', text: '-'},
				{value:'.', text: '"."'},
				{value:',', text: '","'},
				{value:' ', text: '" "'}
				];
				
			// Time settings
			// 0 - leave as is, 1 - local everywhere, 2 - server everywhere
			var time_settings = [ 
				{value:0, text: Options.Interface.opt_timeDontChange}, 
				{value:1, text: Options.Interface.opt_timeLocal}, 
				{value:2, text: Options.Interface.opt_timeServer}
				];
				
			// EventList position
			var evt_positions = [ 
				{value:1, text: Options.Interface.lbl_onTop}, 
				{value:0, text: Options.Interface.lbl_onBottom}
				];
				
			// EventList time mode
			var evt_timemode = [ 
				{value:1, text: Options.Interface.lbl_tmTime}, 
				{value:2, text: Options.Interface.lbl_tmCountdown}
				];
				
			// Resources info position
			var res_positions = [ 
				{value:0, text: ' - '}, 
				{value:1, text: Options.Interface.lbl_onBottom},
				{value:2, text: Options.Interface.lbl_onLeft}
				];
				
			// Sim button
			var sim_buttons = [ 
				{value:0, text: ' - '}, 
				{value:1, text: 'WebSim'},
				{value:2, text: 'DragoSim'}
				];

			var div = document.createElement('div');
			div.className = 'hidden';
			div.id = 'anti_options_window';
			div.innerHTML =
				'<div id="title">'+Options.Interface.opt_title+'</div>' + 
				'<div id="content">' +
				startSection(Options.Interface.lbl_sectionGeneral) +
					createSelect('language', language_list) +
					createInput('update_check') +
					createInput('blockAutoComplete') +
					createSelect('thousandSeparator', separator_list) +
					createSelect('showResources', res_positions) +
					createInput('showDeficient') +
					createInput('showNames') +
					createInput('nameColorOn') +
					createInput('nameColorOff') +
					createInput('nameColorDisabled') +
					createInput('showConstructionTitle') +
					createInput('shortHeader') +
					createInput('misc_scrollTitle') +
				endSection() +
				startSection(Options.Interface.lbl_sectionUniverse) +
					createInput('uni_reDesigned') +
					createInput('uni_SpeedFactor') +
					createInput('uni_DFPercent') +
					createInput('uni_DefenseToDF') +
				endSection() +
				startSection(Options.Interface.lbl_sectionTime) +
					createSelect('timeSetting', time_settings) +
					createInput('showServerOgameClock') +
					createInput('showServerPhalanx') +
					createInput('showPageStartTime') +
					createInput('timeAMPM') +
				endSection() +
				startSection(Options.Interface.lbl_sectionEventList) +
					createInput('showEventList') +
					createSelect('evt_showOnTop', evt_positions) +
					createInput('evt_showReduced') +
					createSelect('evt_TimeMode', evt_timemode) +
					createInput('evt_noScroll') +
					createInput('phalanx_showDebris') +
					createInput('evt_expandFleetsEvt') +
					createInput('evt_expandFleetsPhal') +
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
					createInput('galaxy_killTips') +
					createInput('galaxy_keepTipsPlanets') +
					createInput('galaxy_keepTipsDebris') +
				endSection() +
				startSection(Options.Interface.lbl_sectionMessages) +
					createInput('msg_PlunderThreshold') +
					createInput('msg_DebrisThreshold') +
					createInput('msg_foldSmallPlunder') +
					createInput('msg_showPlunder') +
					createInput('msg_addButtons') +
					createInput('msg_fixColors') +
					createInput('msg_killTips') +
					createSelect('msg_addSimButton', sim_buttons) +
				endSection() +
				startSection(Options.Interface.lbl_sectionFleetDispatch) +
					createInput('fleet_showCapacity') +
					createInput('fleet1_showResCalc') +
					createInput('uni_maxPlayerScore') +
					createInput('fleet1_killTips') +
					createInput('autocopyCoords') +
					createInput('autocopyGlobal') +
					createInput('fleet2_setTargetDF') +
					createInput('fleet2_fixLayout') +
					createInput('fleet2_ShortLinks') +
					createInput('fleet2_MoonsToEnd') +
					createInput('fleet2_MoonColor') +
					createInput('fleet2_expandLists') +
					createInput('fleet2_checkProbeCapacity') +
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
					createButtonHref('btnHomePage','http://userscripts.org/scripts/show/58952', 'Home page')
				'<div style="clear:both; padding: 0px"></div></div>';
			document.body.appendChild(div);
			
			$('#btnOk').bind('click', function() { setTimeout( function () {Options.hideWindow(true);}, 0)} );
			$('#btnCancel').bind('click', function() { Options.hideWindow(false);} );
			$('#anti_options_window .color')
				.bind('change', Options.changeInputColor)
				.bind('keyup', Options.changeInputColor);
				
			$('.sectiontitle').bind('click', function() { 
				$(this).next().toggleClass('hidden')
				.end()
				.find('.indicator').html( $(this).next().hasClass('hidden')?'▼':'▲');
			} ).eq(0).trigger('click');
		},
		
		showUpdateMarker: function()
		{
			function ver2num(ver) {
				if (!ver) return 0;
				var s = ver.split('.');
				s = parseInt(s[0],10)*1000000 + parseInt(s[1],10)*100 + parseInt(s[2],10);
				if (isNaN(s)) s = -1;
				return s;
			}
			
			var newversion = Utils.getValue('update_Version','');
			if (ver2num(version)>=ver2num(newversion)) return;

			Utils.insertCSSRule('#update_marker, #update_marker:hover { \
				display:block !important; \
				width:19px !important; \
				position:relative !important; \
				top:-25px !important; \
				left:-20px !important; \
				padding:0 !important; \
				line-height:normal !important; \
				font-family:Verdana !important; \
				font-weight:700 !important; \
				font-size:16px !important; \
				cursor:pointer !important; \
			}');
			
			Utils.insertCSSRule('#update_marker { \
				color:orange !important; \
			}');
			
			Utils.insertCSSRule('#update_marker:hover { \
				color:#FFEE66 !important; \
			}');
			
			var marker = document.createElement('a');
			marker.innerHTML = '[!]';
			marker.id = 'update_marker';
			marker.title = Options.Interface.lbl_installNewVersion + ': '+newversion;
			marker.setAttribute('href','http://userscripts.org/scripts/source/58952.user.js');
			var btnAntiOptions = document.getElementById('btnAntiOptions');
			if(btnAntiOptions) btnAntiOptions.parentNode.appendChild(marker);
		},
		
		handleUpdateResponse: function(response)
		{
			try {
				var newversion = response.responseText;

				if (!newversion) return;
				
				Utils.setValue('update_Version', newversion);
				Utils.setValue('update_LastTS', DateTime.formatDate(new Date(),'[Y][m][d][H][i]'));
				this.showUpdateMarker();
			} catch (e) { Utils.log(e) }
		},
		
		checkUpdate: function()
		{
			var now = parseInt(DateTime.formatDate(new Date(),'[Y][m][d][H][i]',true),10);
			var last = parseInt(Utils.getValue('update_LastTS',0),10);
			
			if ( last && now-last < 60*24 ) 
				this.showUpdateMarker();
			else {
				var url = 'http://ogamespec.com/tools/antigame_version.php';
				Utils.xmlhttpRequest({method:'GET',url:url,onload:function(response){Options.handleUpdateResponse(response)}});
			}
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
			this.Labels.lbl_darkmatter = getValueFromId('darkmatter_box');
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
			
			if (Utils.uni_prefix == 'UNI42_ORG') this.uni_SpeedFactor = 2;
			else if (Utils.uni_prefix == 'ELECTRA_ORG') this.uni_SpeedFactor = 4;
			else if (Utils.uni_prefix == 'CAPELLA_RU') this.uni_SpeedFactor = 4;
			
			//this.loadOptions();
			
			this.initLang();
			this.addOptionsButton();
			
			this.Interface.lbl_btnDeleteSmallPlunder = this.Interface.lbl_btnDeleteSmallPlunder
				.replace( '$plunder', Utils.formatNumber(this.msg_PlunderThreshold*1000) )
				.replace( '$debris', Utils.formatNumber(this.msg_DebrisThreshold*1000) )
				;
				
			this.Interface.opt_galaxy_killTips = this.Interface.opt_killTips + ' ('+this.Interface.lbl_sectionGalaxy+')';
			this.Interface.opt_fleet1_killTips = this.Interface.opt_killTips + ' ('+this.Interface.lbl_sectionFleetDispatch+' 1)';
			this.Interface.opt_msg_killTips = this.Interface.opt_killTips + ' ('+this.Interface.lbl_sectionMessages+')';
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
			if (Utils.isCurrentPage('showmessage,eventList,phalanx'))
			{
				this.TimeZoneDelta = parseInt(Utils.getValueUni('TimeZoneDelta', 0), 10);
				return;
			}

			this.TimeDelta = 0;
			if (!Utils.script) return;
			
			var now = new Date();


			// timezone correction
			if (Utils.ogameVersion == '1.2.1') {
				var script = Utils.script;
				var starttime = script.innerHTML.match(/currTime\.setTime\(\((\d+)-startServerTime/i);
				if (!starttime) return;
				starttime = parseInt(starttime[1],10);
				this.InitialServerTime = starttime;
				
				this.TimeZoneDelta = - (Utils.unsafeWindow.localTime.getTime() - Utils.unsafeWindow.startServerTime);
				this.TimeDelta = now.getTime() - starttime;

			}
			else { // ogame 1.1
			
				this.InitialServerTime = Utils.unsafeWindow.serverTime;

				if (!this.InitialServerTime) return;
				this.InitialServerTime = this.InitialServerTime.getTime();


				// server time (using current timezone) - local time
				this.TimeDelta = now.getTime() - this.InitialServerTime;

			
				this.TimeZoneDelta = - ( now.getTimezoneOffset()/60 + /*Utils.unsafeWindow.TimezoneOffset*/2 ) *60*60*1000;
			}

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
		
		formatTime: function(tick)
		{
			var h = Math.floor(tick/60/60);
			tick -= h*60*60;
			var m = Math.floor(tick/60);
			tick -= m*60;
			return this.LZ(h)+':'+this.LZ(m)+':'+this.LZ(tick);
		},
		
		formatDate: function (date, format, asis)
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
				var hours = date.getHours();
				if (!asis && Options.timeAMPM && str.indexOf('[H]') > -1 ) {
					str += ' ' + ( (hours>=0 && hours<12) ? 'AM' : 'PM' );
					
					if  (hours>12) hours -= 12;
					else if (hours==0) hours = 12;
				}
				
				str = str.replace("[d]",this.LZ(date.getDate()));
				str = str.replace("[m]", this.LZ(date.getMonth()+1));
				str = str.replace("[Y]", date.getFullYear());
				str = str.replace("[y]", date.getFullYear().toString().substr(2,4));
				str = str.replace("[H]", this.LZ(hours));
				str = str.replace("[i]", this.LZ(date.getMinutes()));
				str = str.replace("[s]",this.LZ(date.getSeconds()));
			}
			catch (e) { Utils.log(e); }

			return str;
		},
		
		formatDate2: function (date, format)
		{
			if (Options.timeSetting == 1)
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
			
			if (str[index.d]) date.setDate(1); 
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
			str = str.replace(this.formatDate(oldDate,timeFormat, true), this.formatDate(newDate,timeFormat));
			
			if (dateFormat) str = str.replace(this.formatDate(oldDate,dateFormat), this.formatDate(newDate,dateFormat));
			
			return str;
		},
		
		changeOgameClocks2Server: function()
		{
			var code;
			
			if (Utils.ogameVersion=='1.1') { // ogame 1.1
				code = ' \
					function UhrzeitAnzeigen() { \
					var Sekunden = serverTime.getSeconds(); \
					serverTime.setSeconds(Sekunden+1); \
					Uhrzeitanzeige = getFormatedDate(serverTime.getTime() - ' + this.TimeZoneDelta + ', "[d].[m].[Y] <span>[H]:[i]:[s]</span>"); \
					if(document.getElementById) \
						document.getElementById("OGameClock").innerHTML = Uhrzeitanzeige; \
					else if(document.all) \
						Uhrzeit.innerHTML = Uhrzeitanzeige; \
					} ';
			}
			
			if (Utils.ogameVersion=='1.2.1') { // ogame 1.2.1
				var code = ' \
					var func = UhrzeitAnzeigen.toString();\
					func = func.replace(/(getFormatedDate\\(currTime\\.getTime\\(\\))/i,"$1-(' + this.TimeZoneDelta + ')"); \
					eval(func); \
				';
			}
				
			Utils.runScript(code);
		},
		
		changeNodesTime: function (xpath, format, property)
		{
			var nodes = Utils.XPath(xpath);
			if (!nodes) return;
			//property = property || 'innerHTML';
			
			for (var i = 0; i < nodes.snapshotLength; i++)
				{
					var node = nodes.snapshotItem(i);
					
					if (property)
					{
						node.setAttribute('original_'+property, node[property]);
						node[property] = DateTime.convertStringServer2Local(node[property], format);
					}
					else
					{
						node.setAttribute('original', node.firstChild.nodeValue);
						node.firstChild.nodeValue = DateTime.convertStringServer2Local(node.firstChild.nodeValue, format);
					}
					
					//node[property] = DateTime.convertStringServer2Local(node[property], format);
				}
		},
		
		showPageStartTime: function()
		{
			var clock = document.getElementById('OGameClock');
			if (!clock) return;
			var div = document.createElement('div');
			div.id = 'StartTime';
			div.setAttribute('style', 'color:#848484; font-size:11px; position:absolute; right:1px; text-align:right; top:16px');
			//var date = new Date(this.InitialServerTime - (Options.showServerOgameClock?this.TimeZoneDelta:0) );
			var date = this.InitialServerTime;
			if (Utils.ogameVersion=='1.1' && Options.showServerOgameClock || Utils.ogameVersion=='1.2.1' && ! (Options.timeSetting == 1 && !Options.showServerOgameClock) )
				date -= this.TimeZoneDelta;
				
			date = new Date(date);
			
			div.innerHTML = this.formatDate(date, '[d].[m].[Y] <span style="font-weight:700">[H]:[i]:[s]</span>');
			Utils.insertAfter(div, clock);
		},
		
		Init: function()
		{
			this.getTimeDelta();
			
			if (Utils.ogameVersion=='1.1') { // ogame 1.1
				if (Options.timeSetting == 2) {
					var code = 'window.old_getFormatedDate = window.getFormatedDate; window.getFormatedDate = function(date,format) { return window.old_getFormatedDate(date-'+this.TimeZoneDelta+',format) }';
					Utils.runScript(code);
				}
				
				if (Options.timeSetting != 2 && Options.showServerOgameClock)
					this.changeOgameClocks2Server();
			}
			
			if (Utils.ogameVersion=='1.2.1') { // ogame 1.2.1
				if (Options.timeSetting == 1) {
					var code = 'window.old_getFormatedDate = window.getFormatedDate; window.getFormatedDate = function(date,format) { return window.old_getFormatedDate(date+'+this.TimeZoneDelta+',format) }';
					Utils.runScript(code);
				}
				
				if ( Options.timeSetting == 1 && Options.showServerOgameClock )
					this.changeOgameClocks2Server();
			}
			
		}
	}

	
	// =======================================================================
	// misc functions
	// =======================================================================
	var storage = (window.localStorage ? localStorage : null);
	var Utils =
	{
		page: "",
		unsafeWindow: ((typeof unsafeWindow) != "undefined" ? unsafeWindow : window),
		bg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAALHRFWHRDcmVhdGlvbiBUaW1lAHPhYiAzMSBPdXQgMjAwOSAxODoyNjowOSAtMDAwMBvBwloAAAAHdElNRQfZCh8SGy7RbQlkAAAACXBIWXMAAB7BAAAewQHDaVRTAAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpjYGBgmAEAAJ0AmeuxAnUAAAAASUVORK5CYII=",
		
		ogameVersion: '1.1',
		
		// wrappers for JSON functions
		// if needed JSON emulation will be added later here
		JSON_stringify: function(obj)
		{
			return JSON ? JSON.stringify(obj) : null;
		},
		
		JSON_parse: function(str)
		{
			return JSON ? JSON.parse(str) : null;
		},
		
		// wrappers for GM functions
		xmlhttpRequest: ((typeof GM_xmlhttpRequest) != "undefined" ? GM_xmlhttpRequest : function(){}),

		setValue: function ( name, value )
		{
			if( !name ) return;
			
			if (Utils.isFirefox)
			{
				GM_setValue(name, value);
			}
			else if (localStorage)
			{
				localStorage.setItem(name, Utils.JSON_stringify(value));
			}
			else {
				var lifeTime = 31536000;
				document.cookie = escape( cookieName ) + "=" + escape( Utils.getRecoverableString( cookieValue ) ) +
					";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
			}
		},

		// method: COOKIE, GM, STORAGE
		getValue: function ( name, default_value, method )
		{
			if (!method) 
			{
				if (Utils.isFirefox) method = 'GM';
				else if (localStorage) method = 'STORAGE';
				else method = 'COOKIE';
			}
			
			if (method == 'GM')
			{
				return GM_getValue(name, default_value);
			}
			else if (method == 'STORAGE')
			{
				var value = Utils.JSON_parse(localStorage.getItem(name));
				return (value == null && typeof default_value != 'undefined') ? default_value : value;
			}
			else {
				var cookieJar = document.cookie.split( "; " );
				for( var x = 0; x < cookieJar.length; x++ ) {
					var oneCookie = cookieJar[x].split( "=" );
					if( oneCookie[0] == escape( name ) ) {
						try {
							eval('var footm = '+unescape( oneCookie[1] ));
						} catch(e) { return default_value; }
						return footm;
					}
				}
				return default_value;
			}
		},
		
		deleteValue: function(name)
		{
			if (Utils.isFirefox)
			{
				GM_deleteValue(name);
			}
			else if (localStorage)
			{
				localStorage.removeItem(name);
			}
			else if (this.getValue(name))
				document.cookie = escape( name ) + "=" + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
		},
		
		setValueUni: function ( name, value )
		{
			Utils.setValue(Utils.uni_prefix + name, value);
		},

		getValueUni: function ( name, def )
		{
			return Utils.getValue(Utils.uni_prefix + name, def);
		},
		
		deleteValueUni: function( name )
		{
			Utils.deleteValue(Utils.uni_prefix + name);
		},

		log: function (str)
		{
			if (Utils.isFirefox)
				GM_log(str);
			else if (Utils.isOpera)
				window.opera.postError(str);
			else if (Utils.isChrome)
				console.log('Antigame: '+str);
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
						} else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac')+ 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
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
		
		whenrendered: function(f)
		{
			if (document.defaultView.getComputedStyle(document.body, null)) f();
			else setTimeout(function(){Utils.whenrendered(f)}, 100);
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
			var separator = ( (Options.thousandSeparator == '--') ? this.separator : Options.thousandSeparator) || '';
			num = ''+num;
			
			if (!separator || isNaN(num)) return num;
			
			var group, res='';
			while (group = num.slice(-3)) {
				res = (res && group != '-') ? group+separator+res : group+res;
				num = num.substr(0,num.length-group.length);
			}

			return res;
		},
		
		trim: function(str)
		{
			return str ? str.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1") : null;
		},
		
		getDocScript: function()
		{
			var scripts = document.getElementsByTagName('script');
			this.script = null;
			
			var n = 0;

			for (var i=0; i<scripts.length; i++)
				if (!scripts[i].src && ! (this.isCurrentPage('messages') && n++ == 0) && scripts[i].childNodes[0].nodeValue.indexOf('session =') > -1 ) {
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
			var pages = page.toLowerCase().split(',');
			for (var i=0; i<pages.length; i++)
				if (pages[i] == this.page )
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
		
		killCluetips: function(selector)
		{
			selector = selector || '.tipsStandard';
			setTimeout( function(){ Utils.$(selector).cluetip('destroy').unbind('mouseover').each(function(){this.title = this.title.replace('|','')}) }, 0);
		},
		
		XPath: function(path, context, type)
		{
			try {
				if (!context) context = document;
				mydoc = context.ownerDocument || document;
				if (!type) type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
				return mydoc.evaluate(path, context, null, type, null)
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
			//str = str.replace(/(\d+)kk/i, '$1'+'000000');
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
		
		getIntById: function(id, property, rx)
		{
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
			else if (server.indexOf('OGAME.PL/') > -1)  this.server = 'PL'; // Poland
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
			if (this.server == 'US' || this.server == 'ORG') this.server_lang = 'EN';
			else if (this.server == 'AR' || this.server == 'MX') this.server_lang = 'ES';

			this.uni = url.toUpperCase().match(/:\/\/([a-z0-9]+)\./i);
			this.uni = this.uni ? this.uni[1] : '0';
			
			var uni_server = this.uni + '.' + this.server;
			
			this.uni_prefix = uni_server.replace(/[\.\-]/g, '_');
			
			this.page = document.body.id.toLowerCase();
			if (!this.page) {
				this.page = document.location.search.match(/page=(\w+)/i);
				this.page = this.page ? this.page[1].toLowerCase() : "";
			}
			
			if (this.unsafeWindow.startServerTime)
				this.ogameVersion = '1.2.1';
		},
		
		Init: function()
		{
			this.createStyleSheet();

			this.isOpera = (window.opera) ? true : false;
			this.isFirefox = (window.navigator.userAgent.indexOf('Firefox') > -1 ) ? true : false;
			this.isChrome = (window.navigator.userAgent.indexOf('Chrome') > -1 ) ? true : false;
			
			this.$ = this.unsafeWindow.$;
			
			if(this.unsafeWindow.LocalizationStrings)
				this.separator = this.unsafeWindow.LocalizationStrings['thousandSeperator'] || '.';
			else
				this.separator = '.';
			
			// server abbr, server language, uni, speedfactor, page name
			this.initUni();
			
			this.getDocScript();
			
			if (document.location.href.match(/http:\/\/.+\.ogame\..+\/game\/index\.php\?page=*/i)) this.ogame = true;
			else this.ogame = false;
		}
	}


	// =======================================================================
	// Ogame formulas and functions
	// =======================================================================
	
	var Ogame =
	{
		TECH_WEAPONS: 109,
		TECH_SHIELD: 110,
		TECH_ARMOUR: 111,
		TECH_ENERGY: 113,
		TECH_COMB_DRIVE: 115,
		TECH_IMPULSE_DRIVE: 117,
		TECH_HYPER_DRIVE: 118,
		
		used_techs: [109, 110, 111, 113, 115, 117, 118],

		createShip: function (id, name, metal, crystal, drive, speed, capacity, consumption, exp)
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
			ship.consumption = consumption || 0;
			ship.exp = exp;
			
			this.ships[id] = ship;
		},
		
		createDef: function (id, name, metal, crystal)
		{
			var def = new Object();
			def.name = name;
			def.metal = metal;
			def.crystal = crystal;
			
			this.defs[id] = def;
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
			// min t
			// ---------
			this.temperature = 0;
			
			var node = this.getActivePlanet();
			if (!node) return;

			var t = node.title.match(/<br>.*<br>[^\d\-]*([\d\-]+)/i);
			if (!t) return;

			this.temperature = parseInt(t[1],10);
		},
		
		readActivePlanet: function()
		{	
			try {
				this.active_planet = null;
				
				var nodes = Utils.XPath('//A[contains(@class,"planetlink")][@title]');
				if (!nodes) return;
				
				if (nodes.snapshotLength == 1)
					this.active_planet = nodes.snapshotItem(0);
				else 
					for (var i=0; i<nodes.snapshotLength; i++)
						if ( nodes.snapshotItem(i).className.indexOf('active') > -1 ) {
							this.active_planet = nodes.snapshotItem(i);
							break;
						}
			} catch (e) { Utils.log(e) }
		},
		
		getActivePlanet: function()
		{
			if (this.active_planet == null) this.readActivePlanet();
			return this.active_planet;
		},
		
		getCoordsFromPlanet: function(planet)
		{
			if (!planet) return { galaxy:0, system:0, planet:0, type:0, name:'' };

			var name = Utils.XPathSingle('SPAN[@class="planet-name"]', planet).innerHTML;
			var coords = Utils.XPathSingle('SPAN[@class="planet-koords"]', planet).innerHTML;
			var type = 1;
			coords = coords.replace(/[\[\]]/g,'').split(':');
			var res = {
				galaxy: parseInt(coords[0],10),
				system: parseInt(coords[1],10),
				planet: parseInt(coords[2],10),
				type: type,
				name: name
				};
			return res;
		},
		
		getActiveCoords: function()
		{
			return this.getCoordsFromPlanet(this.getActivePlanet());
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
			
			if(!this.techs.length) { this.showNoTechWarning(); } // will return undefined anyway in order to show (with NaNs) why it's important to visit Researches

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
				res = Math.floor( 10 * level * Math.pow(1.1, level) ) * Options.uni_SpeedFactor;
				
			return Math.floor(res);
		},
		
		getProduction: function(id, level)
		{
			if (!id || level<0) return;
			
			// solar sat.
			if (id == 212)
			{
				if (Options.uni_reDesigned)
					return Math.floor ((this.getTemperature()+40) / 4 + 20) * (this.getEngineer() ? 1.1 : 1);
				else
					return Math.floor ((this.getTemperature()+40 + 140) / 6) * (this.getEngineer() ? 1.1 : 1);
			}

			if (level == 0)
				return (id==1) ? 20 * Options.uni_SpeedFactor :
								(id==2) ? 10  * Options.uni_SpeedFactor : 0;
			
			var res = 0;

			if (id == 1)
				res = 30 * level * Math.pow(1.1, level);
			else if (id == 2)
				res = 20 * level * Math.pow(1.1, level);
			else if (id == 3)
				res = 10 * level * Math.pow(1.1, level) * (1.28 - 0.002 * this.getTemperature()*2);
			else if (id == 4)
				res = 20 * level * Math.pow(1.1, level);
			else if (id == 12)
				res = 30 * level * Math.pow( 1.05 + this.getTech(this.TECH_ENERGY) * 0.01, level);
			
			if (id==1 || id==2 || id==3)
				res = Math.floor(res) * Options.uni_SpeedFactor;
				
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
			
			if (Options.uni_reDesigned)
				res = 100 + 50 * Math.floor( Math.pow(1.6, level) );
			else {
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
				
			}
			
			return res*1000;
		},
		
		loadTechs: function()
		{
			try {
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
				ship.speed = Math.floor( ship.speed * (10 + this.getTech(ship.drive) * factor * 10) / 10 );
				
			}
			
		},
		
		getFleetDistance: function(current, target)
		{
			var diffGalaxy = Math.abs(current.galaxy - target.galaxy);
			var diffSystem = Math.abs(current.system - target.system);
			var diffPlanet = Math.abs(current.planet - target.planet);

			if(diffGalaxy != 0)
			{
				return diffGalaxy * 20000;
			} 
			else if(diffSystem != 0) 
			{
				return diffSystem * 5 * 19 + 2700;
			} 
			else if(diffPlanet != 0) 
			{
				return diffPlanet * 5 + 1000;
			} 
			else 
			{
				return 5;
			}
		},
		
		getFleetDuration: function(id, distance, speed) 
		{
			return Math.round(((35000 / speed * Math.sqrt(distance * 10 / this.ships[id].speed) + 10) / Options.uni_SpeedFactor ));
		},
		
		getFleetConsumption: function (id, distance, speed) 
		{
			var duration = this.getFleetDuration(id, distance, speed);
			var shipSpeedValue = 35000 / (duration * Options.uni_SpeedFactor - 10) * Math.sqrt(distance * 10 / this.ships[id].speed);
			var consumption = this.ships[id].consumption * distance / 35000 * ((shipSpeedValue / 10) + 1) * ((shipSpeedValue / 10) + 1);

			return Math.round(consumption) + 1;
		},

		// ships = [ {name:'NN', count:XX}, ... ]
		getFleetDebris: function(ships, calcDef)
		{
			var first = 0, metal = 0, crystal = 0;
			for (var i=0; i<ships.length; i++) 
			{
				var txt = ships[i].name;
				var cnt = ships[i].count;

				for (var j in Ogame.ships)
				{ 	
					var ship = Ogame.ships[j];
					var label = Options.Labels['lbl_ship'+ship.name];

					if (label && txt.indexOf(label) > -1)
					{
						metal += cnt * ship.metal * Options.uni_DFPercent * 0.01;
						crystal += cnt * ship.crystal * Options.uni_DFPercent * 0.01;
						first = j;
						break;
					}
				}
				
				if (calcDef && Options.uni_DefenseToDF)
				for (var j in Ogame.defs)
				{ 	
					var def = Ogame.defs[j];
					var label = Options.Labels['lbl_def'+def.name];

					if (label && txt.indexOf(label) > -1)
					{
						metal += cnt * def.metal * Options.uni_DefenseToDF * 0.01;
						crystal += cnt * def.crystal * Options.uni_DefenseToDF * 0.01;
						first = j;
						break;
					}
				}
			}
			
			var recs = Math.ceil( (metal+crystal)/20000 );
			return { metal:metal, crystal:crystal, recs: recs };
		},
		
		showNoTechWarning: function()
		{
			if (this.noTechWarning_shown) return;
			if (Utils.page == 'research') return;
			
			var btnResearch = Utils.XPathSingle('//A[contains(@class,"menubutton") and contains(@href,"page=research")]');
			if (!btnResearch) return;
			
			Utils.insertCSSRule('#notech_marker, #notech_marker:hover { \
				display:block !important; \
				width:19px !important; \
				position:relative !important; \
				top:-25px !important; \
				left:-20px !important; \
				padding:0 !important; \
				line-height:normal !important; \
				font-family:Verdana !important; \
				font-weight:700 !important; \
				font-size:16px !important; \
				cursor:pointer !important; \
			}');
			
			Utils.insertCSSRule('#update_marker { \
				color:orange !important; \
			}');
			
			Utils.insertCSSRule('#update_marker:hover { \
				color:#FFEE66 !important; \
			}');
			
			var marker = document.createElement('a');
			marker.innerHTML = '[!]';
			marker.id = 'notech_marker';
			marker.title = 'Antigame says: Visit the Research page to get the techs.';
			marker.setAttribute('href', btnResearch.getAttribute('href'));
			btnResearch.parentNode.appendChild(marker);
			
			this.noTechWarning_shown = true;
		},
		
		Init: function()
		{
			this.temperature = this.geologist = this.engineer = this.techs = this.active_planet = null;

			var str = document.location.href.match(/:\/\/([^\/]+)\//);
			this.prefix = str ? str[1].toUpperCase().replace(/[\.\-]/g, '') : '';

			this.ships = [];
			// id, name, metal, crystal, drive, speed, capacity, consumption, exp.points
			this.createShip(202, 'SCargo',		2000,	2000,	1, 5000,	5000,	20,	12);
			this.createShip(203, 'LCargo',		6000,	6000,	1, 7500,	25000,	50,	47);
			this.createShip(204, 'LFighter',	3000,	1000,	1, 12500,	50,		0,	12);
			this.createShip(205, 'HFighter',	6000,	4000,	2, 10000,	100,	0,	110);
			this.createShip(206, 'Cruiser',		20000,	7000,	2, 15000,	800,	0,	47);
			this.createShip(207, 'Battleship',	45000,	15000,	3, 10000,	1500,	0,	160);
			this.createShip(208, 'Colonizator',	10000,	20000,	2, 2500,	7500,	0,	30);
			this.createShip(209, 'Recycler',	10000,	6000,	1, 2000,	20000,	300, 16);
			this.createShip(210, 'Spy',			0,		1000,	1, 100000000, 0,	0,	1);
			this.createShip(211, 'Bomber',		50000,	25000,	2, 4000,	500,	0,	75);
			this.createShip(213, 'Destroyer',	60000,	50000,	3, 5000,	2000,	0,	110);
			this.createShip(214, 'RIP',			5000000,4000000,3, 100,		1000000,0,	9000);
			this.createShip(215, 'BCruiser',	30000,	40000,	3, 10000,	750,	0,	70);
			this.createShip(212, 'Satellite',	0,		2000,	1, 0,		0);
			
			this.defs = [];
			this.createDef(401, 'RLauncher',	2000,	0);
			this.createDef(402, 'LLaser',		1500,	500);
			this.createDef(403, 'HLaser',		6000,	2000);
			this.createDef(404, 'Gauss',		20000,	15000);
			this.createDef(405, 'Ion',			2000,	6000);
			this.createDef(406, 'Plasma',		50000,	50000);
			this.createDef(407, 'SShield',		10000,	10000);
			this.createDef(408, 'LShield',		50000,	50000);
			
			this.updateShipSpeed();
		}
	}


	// =======================================================================
	// A few functions for player/ally highlighting
	// =======================================================================
	var Colorer = 
	{
		PLAYER: 'Player',
		ALLY: 'Ally',
		
		prepare: function(who, names, colors)
		{
			try {
				if (!names || !colors) return;

				names = names.toUpperCase().split(',');
				colors = colors.toUpperCase().split(',');
				
				this[who+'Colors'] = [];
				
				for (var i=0; i<names.length; i++)
					if (names[i] || colors[i]) this[who+'Colors'][names[i]] = colors[i];
			} catch(e) { Utils.log(e) }
		},
		
		highlight: function(who, xpath, context, parser)
		{
			try {
				if ( !this[who+'Colors'] ) return;
				var node = Utils.XPathSingle(xpath, context);
				if(!node || !node.firstChild) return;
				
				var name = Utils.trim(node.firstChild.nodeValue);
				if (typeof parser == 'function') name = parser(name);
				if(!name) return;

				var color = this[who+'Colors'][name.toUpperCase()];
				if (color) node.style.color = color;
			} catch(e) { Utils.log(e) }
		},
		
		Init: function()
		{
			this.prepare(this.PLAYER, Options['galaxy_Players'], Options['galaxy_PlayerColors'] );
			this.prepare(this.ALLY, Options['galaxy_Allys'], Options['galaxy_AllyColors'] );
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
			var str = '<a href="javascript:void(0)" id="'+id+'">'+Utils.formatNumber(value)+'</a>';
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
		img_on: 'data:image/gif;base64,R0lGODlhGwAbAOYAAAAAAP///wkJDAYHCQcICgkLDgoMDwsNEA0PEg8SFhIVGRwgJQoNEAcJCwsOEQkLDQ8SFQoMDhATFhYaHhcbHx0iJx8kKRoeIhsfIyowNiMoLQcICRseIRIUFgkKCx8lKjhARzE4PltncVRfaBAUFxEVGBIWGRsgJBwhJT9IT0pUXGJveT5GTAoNDwwPETtESlFdZU1YYEZQV4WXo36Pm3eHkml3gTU8QSwyNmJveFllbXyNmHODjVBbYhsgI2p5gkdRVyMoKwwQEgYICQcJCg8TFQcKCwkMDQwPEAECAgQEBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEsALAAAAAAbABsAAAf/gEtLHyiFhoeIiR+CSxaHC5CQiJKIHz6DhpGam5GTPhMTmZyjoxWgCxkgGqSsCyEgKKAXMTMgraQ2MwunMSKrt5whMye8McCkw8UgMgvLGTLLzTLP0dEzsRMYMTEpNAsrIyA23d/h497gC7qg2sY0MjMhzwvv8fP1Ieq7oNsLIjU1NP0LGGkgpBkUJhCZoELFhBczYIACBVHixIqgZkzYAAAACxYAPMzA0bGjSJIlT3acUdIjyBszerSEKbMkzZUtPwLQ8WNHS54+SwLFWfKjSA47cHAAcjTp0qYkWRZlcYMHgB49guSoejXrVqtYAcxIMrUDBwBmPXAwi5aDWrZsZKV21NmypJKOd+sSnZujg96/dWHmnBFEL1kAh/XmkAu4ceMhAAY4nlyywJEHlhsYIcC5c2POQzwIWCIEgQsXDg6obsHagOsIrxkwAOAAiW1GJhSQICGhdxEIv4EnEE68RAlBgQAAOw==',
		img_off: 'data:image/gif;base64,R0lGODlhGwAbAOYAAAAAAP///wkJDAcHCAsLDAYHCQcICiMmKwkLDgoMDwsNEA0PEg8SFhIVGSgrLysuMhwgJR8jKAoNEAcJCwsOEQkLDQ8SFQoMDhATFhYaHhcbHx0iJx8kKRoeIhsfIwcICR4iJiElKSQoLAkKCycqLS0wMzM2OSMlJycpKxUWFxkaGx8lKhAUFxEVGBIWGRsgJBwhJSAkJyQoKyYqLSktMAoNDwwPETI1NzE0NjU4OhsgIwwQEgYICQcJCg8TFS4yNBweHyAiIwcKCwkMDQwPECotLi4xMgECAg4PDxITEwQEBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEsALAAAAAAbABsAAAf/gEtLKzCFhoeIiSuCSxyHEJCQiJKIKzqDhpGam5GTOhkZmZyjoxugEBEHIKSsECEHMKAdDjkHraQ/ORCnDg+rt5whOS+8DsCkw8UHMxDLETPLzTPP0dE5sRkeDg4iJhAlNAc/3d/h497gELqg2sYmMzkhzxDv8fP1Ieq7oNsQDzc3NP0LGGkgpBwaMvTIIENGhhg5SIACBVHixIqgcmT4AACAChUAlORI0rGjSJIlT3bMUdIjyBQ5grSEKbMkzZUtPwI4UQRHS54+SwLFWfKjSAI4khAAcjTp0qYkWRZVkcIIgCBBkKCoejXrVqtYAeQ4MnUAAQBmlRAwi5aAWrZsYqV21Nkypcm6JeV6RDEAr9+6MHPmQIKXLADDeFHo/cv4Lw8ABRpLLolgSIXKE4QY2MyZ8WYeIwQs2bHAhg0KClLXWJ2g9QXXEiQAoECkNiMXDViwwMDbhwXfvxkEH96ihaBAADs=',
		img_hl: 'data:image/gif;base64,R0lGODlhGwAbAOYAAAAAAP///wkJDAYHCQcICgkLDgoMDwsNEA0PEg8SFhIVGRwgJQoNEAcJCwsOEQkLDQ8SFQoMDhATFhYaHhcbHx0iJx8kKRoeIhsfIwcICQkKCx8lKhAUFxEVGBIWGRsgJBwhJQoNDwwPERsgIwwQEgYICQcJCg8TFQcKCwkMDQwPEAECAmlNMVpCKks3IzwsHC0hFR4WDg8LB62BVoNkRXheRDYyLpdtRYhiPnlXN+KkaNOZYcSOWrWDU6Z4TNWbZMiSX6B4UpNvTYZmSXVaQWtVQFpIN15MO1FDN0Q6MikpKQQEBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEwALAAAAAAbABsAAAf/gExMGyCFhoeIiRuCTBaHC5CQiJKIGyODhpGam5GTIxMTmZyjoxWgCzZISqSsC0lIIKAXNTpIraQzOgunNUKrt5xJOh+8NcCkw8VIRQvLNkXLzUXP0dE6sRMYNTVHPwtBQ0gz3d/h497gC7qg2sY/RTpJzwvv8fP1Seq7oNsLQkBANP0LGGkgJB0UJpiYQITIBCM6aIACBVHixIqgdEzIAAAACxYAZOhw0bGjSJIlT3bUUdIjyBY6cLSEKbMkzZUtPwK40WNHS54+SwLFWfKjSBg7XMDIcTTp0qYkWRZl0YIHABw4XvioejXrVqtYAehYMTUGDABmZcAwixaGWrZsZKV21Nmy5JKOd+sSnesjht6/dWHm1PFCL1kAh/X6kAu4ceMSAAY4nlyyQIoHlhugIMC5c2POJTQIYEICgQgRDg6oDsHagOsIrxkwAOBAhW1GHhRw4CCh9wkIv4EnEE68QwdBgQAAOw==',
	
		get: function ()
			{
				return Options.autocopyGlobal ? Utils.getValue('Coords') : Utils.getValueUni('Coords');
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
				return  ( (Options.autocopyGlobal ? Utils.getValue('CoordsFlag') : Utils.getValueUni('CoordsFlag')) == '1');
			},
			
		set: function (value)
			{
				if (Options.autocopyGlobal) {
					Utils.setValue('Coords', value); 
					Utils.setValue('CoordsFlag', '1');
				}
				else {
					Utils.setValueUni('Coords', value); 
					Utils.setValueUni('CoordsFlag', '1');
				}
				
				if (Utils.ogame)
					this.initImg();
			},
			
		reset: function()
			{
				if (Options.autocopyGlobal) {
					Utils.setValue('Coords', ''); 
					Utils.setValue('CoordsFlag', '0');
				}
				else {
					Utils.setValueUni('Coords', ''); 
					Utils.setValueUni('CoordsFlag', '0');
				}
			},
			
		initImg: function(img,mouseover)
		{
			img = img || document.getElementById('btnCoords');
			if (!img) return;
			var saved = this.saved();
			
			if (mouseover) {
				img.setAttribute('rel', (saved?this.img_on:this.img_off) );
				
				if (!saved)
					img.setAttribute('src', this.img_off );
			}
			else {
				img.setAttribute('src', (saved?this.img_on:this.img_off) );
				img.setAttribute('rel', (saved?this.img_hl:this.img_off) );
			}
			img.setAttribute('title',(saved?Options.Interface.lbl_resetCoords+this.get():''));
			img.parentNode.style.cursor = saved ? 'pointer': 'default';
		},
			
		onMouseUp: function(e) {
			if ((!e) || ((e.ctrlKey) && (!e.keyCode))) return;
			
			var targetclassname = e.target.toString();

			try {
				if(targetclassname.match(/InputElement|SelectElement|OptionElement/i) || targetclassname.match(/object XUL/i))
					return;
				Coords.read(window.getSelection().toString());
			}
			catch(e) {
				Utils.log(e);
			}
		},
		
		Init: function()
		{
			document.addEventListener('mouseup', function (e){ Coords.onMouseUp(e); }, false);
			window.addEventListener('focus', function (e){ Coords.initImg(); }, false);
		}
	
	}
	
	
	
	var EventList =
	{
		maxClueHeight: (5+14) * 12,
		reduced: false,
		bExpand: false,
		pro: false,
		
		changeTime: function()
		{
			DateTime.changeNodesTime('//LI[contains(@class,"arrivalTime")]', '[H]:[i]:[s]');
		},
		
		insertCSSRules: function()
		{
			Utils.insertCSSRule('.eventFleet .playername, .eventFleet .playername2, .partnerInfo .playername, .partnerInfo .playername2, .partnerInfo .playername3  { \
				top: 38px; \
				font-size: 10px; \
				color: green; \
				white-space:nowrap; \
			}');
			Utils.insertCSSRule('.eventFleet .playername, .partnerInfo .playername { left: 526px }');
			Utils.insertCSSRule('.eventFleet .playername2, .partnerInfo .playername2, .partnerInfo .playername3 { left: 303px }');
			Utils.insertCSSRule('.coordsOrigin a, .destCoords a { text-decoration:none }');
			
			if (this.bExpand) {
				Utils.insertCSSRule(' \
					.antigame_evtDetails{ \
						left: 142px !important; \
						top: ' + (this.reduced ? 20 : 50) + 'px !important; \
						text-align: left !important; \
						font-size: 9px; \
						line-height: 9px; \
						padding-top: 1px; \
						padding-bottom: 2px; \
					} \
				');
				
				FleetMovement.cssFleetColors();
			}
			
			if (this.reduced) {
				Utils.insertCSSRule('.descFleet, .originFleet, .destFleet { display: none !important}');
				Utils.insertCSSRule('.countDown, .arrivalTime, .coordsOrigin, .detailsFleet, .destCoords, .sendMail, .sendProbe { top: 4px !important}');
				Utils.insertCSSRule('.missionFleet { top: 2px !important}');
				Utils.insertCSSRule('.missionFleet img { padding-top: 0 !important}');
				Utils.insertCSSRule('.eventFleet, .partnerInfo { height: 23px}');
				Utils.insertCSSRule('#eventFooter { height: 2px}');
				
				Utils.insertCSSRule('.sendMail { left: 500px !important}');
				Utils.insertCSSRule('.sendProbe { left: 480px !important}');
				Utils.insertCSSRule('.playername, .playername2 { left: 590px !important; top: 3px !important}');
				Utils.insertCSSRule('.playername3 { left: 0px !important; top: 3px !important; right:520px !important; text-align:right}');
				
				Utils.insertCSSRule('.acsFleet .arrivalTime, .acsFleet .missionFleet, .acsFleet .coordsOrigin, .acsFleet .detailsFleet, .acsFleet .destCoords { top: 13px !important}');
				Utils.insertCSSRule('.acsFleet { height: 40px !important}');
				Utils.insertCSSRule('.acsFleet .playername, .acsFleet .playername2 { top: 13px !important}');
				Utils.insertCSSRule('.toggleInfos { left: 500px !important}');
				Utils.insertCSSRule('.partnerInfo > ul { display: inline}');
				
				// time mode
				Utils.insertCSSRule('#evt_timeMode { position: absolute; width: 250px; left:40px; top:9px; text-align:left; color:#6F9FC8}');
				Utils.insertCSSRule('.tmTime #tmTime, .tmCountdown #tmCountdown { /*text-decoration: none; cursor:default;*/ font-weight:700}');
				Utils.insertCSSRule('.tmTime #tmCountdown, .tmCountdown #tmTime { text-decoration: underline; cursor:pointer}');
				Utils.insertCSSRule('.tmTime .countDown, .tmCountdown .arrivalTime { display: none !important}');
				
			}

		},
		
		insertCSSRulesPro: function ()
		{
			Utils.insertCSSRule(' \
			#newEventBox{ \
				height: 0; \
				width: 720px; \
				margin-left: -5px; \
			} \
			');
			
			Utils.insertCSSRule(' \
			#newEventBox iframe{ \
				width: 100%; \
				height: 100%; \
			} \
			');
			
			Utils.insertCSSRule(' \
				#rechts{ \
					margin-left: 20px; \
				} \
			');
			
			if (!Options.evt_showOnTop) {
				Utils.insertCSSRule(' \
				#newEventBox { \
					float: left; \
				} \
				');
			}

			if (Options.evt_showOnTop && Options.evt_noScroll) {
				Utils.insertCSSRule(' \
				#planetdata { \
					float: left !important; \
					margin-left: 30px !important; \
				} \
				');
			}

		},
		
		show3StateIndicator: function(icon)
		{
			function id2num(id) { return id.replace('eventRow-','') }
			function markRow(id, marker) {
				if (marker=='-') {
					var item = Utils.XPathSingle('//*[@id="eventRow-'+id+'"]/UL/*[@class="missionFleet"]/SPAN');
					if (item) item.innerHTML += ' ('+item.innerHTML.substr(0,1)+')';
				}
			}
			
			try {
				var items = Utils.XPath('//*[@class="missionFleet"]/IMG[contains(@src,"icon-'+icon+'")]/ancestor::*[contains(@id,"eventRow")]');
				var holdlist = [];
				for (var i=0; i<items.snapshotLength; i++) {
					holdlist[ id2num(items.snapshotItem(i).id) ] = items.snapshotItem(i);
				}
				
				var counter = 0;
				var phalanx_coords ='';
				var coords;
				if (Utils.page=='phalanx') {
					coords = document.location.href.match(/galaxy=(\d+).+system=(\d+).+position=(\d+)/i);
					if (coords)
						phalanx_coords = '['+coords[1]+':'+coords[2]+':'+coords[3]+']';
				}
				
				for (var id in holdlist) {
					var i = parseInt(id,10);
					
					if (!holdlist[i]) continue;
					
					var countdown = Utils.XPathSingle('UL/LI[@class="countDown"]/SPAN', holdlist[id]);
					fleetType = 1;
					if (countdown) {
						if (countdown.className.indexOf('neutral') > -1)
							fleetType = 0;
						else if (countdown.className.indexOf('hostile') > -1)
							fleetType = -1;
					}
					
					
					if (Utils.page == 'phalanx' && 
							phalanx_coords != Utils.XPathSingle('UL/*[@class="coordsOrigin"]/A', holdlist[id]).innerHTML
						||
						Utils.page != 'phalanx' && fleetType!=1
					) {
						counter++;

						if (holdlist[i+1]) {
							//markRow(i,'+');
							markRow(i+1,'-');
							holdlist[i+1] = null;
						}
						else {
							markRow(i,'-');
						}
						
						holdlist[i] = null;
					}
					else {
						if (holdlist[i+1]) {
							
							counter++;
							
							if (holdlist[i+2]) {
								markRow(i,'+');
								markRow(i+1,'-');
								holdlist[i+2] = null;
							}
							else {
								markRow(i,'-');
							}
							
							holdlist[i] = null;
							holdlist[i+1] = null;
						}
					}
					
				}
			} catch(e) { Utils.log(e) }
		},
		
		// -1: hostile, 0:neutral, 1:friendly
		getFleetType: function(row)
		{
			var countdown = Utils.XPathSingle('LI[@class="countDown"]/SPAN', row);
			var fleetType = 1;
			if (countdown) {
				if (countdown.className.indexOf('neutral') > -1)
					fleetType = 0;
				else if (countdown.className.indexOf('hostile') > -1)
					fleetType = -1;
			}
			
			return fleetType;
		},
		
		adjustHeight: function (row, li) {
			li = li || Utils.getElementByClassName('antigame_evtDetails', row);
			
			if  (li.style.display == 'none' && row.style.display != 'none') {
				li.style.display = '';

				var details_height = parseInt(li.offsetHeight, 10);
				var fleet_height = parseInt(row.offsetHeight, 10);
				if (! (fleet_height+details_height)) { return; }
				row.style.height = (fleet_height+details_height)+"px";
			}
			else if (row.style.display == 'none') // if ACS fleets were collapsed again
				li.style.display = 'none';
			
			if (this.pro) {
				var parent = window.parent.document;
				var h = document.body.offsetHeight;

				var newEventBox = parent.getElementById('newEventBox');
				newEventBox.style.height = h + (Options.evt_noScroll? this.maxClueHeight : 0)  + 'px';
			}
		},
		
		getMissionClass: function (row)
		{
			var mission = Utils.XPathSingle('*[@class="missionFleet"]/IMG', row);
			mission = mission.src.match(/icon\-(.+)\.gif/)[1];
			var mclass = "";
			
			var fleetType = this.getFleetType(row);
			if (fleetType == -1) mclass = 'hostile';
			else if (fleetType == 0) mclass = 'neutral';
			else
				switch(mission) {
					case ('angriff'): mclass = "ownattack"; break;
					case ('halten'): mclass = "ownhold"; break;
					case ('kolonisieren'): mclass = "owncolony"; break;
					case ('stationieren'): mclass = "owndeploy"; break;
					case ('tf-abbauen'): mclass = "ownharvest"; break;
					case ('transport'): mclass = "owntransport"; break;
					case ('verband'): mclass = "ownfederation"; break;
					case (Options.Labels.lbl_missDestroy): mclass = "owndestroy"; break;
					case ('spionage'): mclass = "ownespionage"; break;
					case ('expedition'): mclass = "ownexpedition"; break;
					default: mclass = "owntransport";
				}
			
			return mclass;
		},
		
		expandFleets: function()
		{
			try {
				function sendRequest(url, li) {
					var xhr = new XMLHttpRequest();
					xhr.open('GET', url, true);                
					xhr.onreadystatechange = function()
					{
						if (xhr.readyState == 4)
							if (xhr.status == 200)
								Utils.whenrendered(function(){EventList.showFleetDetails(li, xhr.responseText)});
					}; 
					xhr.send(null); 
				}
				
				var rows = Utils.XPath('//*[contains(@class,"eventFleet")]/UL | //*[contains(@class,"partnerInfo")]/UL');
				for (var i=0; i<rows.snapshotLength; i++) {
					row = rows.snapshotItem(i);
					if (row.parentNode.className.indexOf('acsFleet') > -1) continue;
					
					var url = Utils.getElementByClassName('tipsTitleArrowClose', row);
					if (!url) continue;
					url = url.href
					
					var li = document.createElement('li');
					li.className = 'antigame_evtDetails ' + this.getMissionClass(row);
					li.style.display = 'none';
					row.appendChild(li);
					
					sendRequest(url, li);
				}
			} catch (e) { Utils.log(e) }
		},
		
		showFleetDetails: function(li, data)
		{
			function adjustHeightAll() {
				var rows = Utils.XPath('//*[contains(@class,"partnerInfo")]');
				for (var i=0; i<rows.snapshotLength; i++)
					EventList.adjustHeight(rows.snapshotItem(i));
			}
			
			data = data
				.replace(/<th colspan="2">.+?<\/th>/gi, '')
				.replace(/(<.+?>\s*)+/gi,' ')
				.replace(' &nbsp; ','<br/><br/>')
				.replace(/^\s/,'')
			;
			
			li.innerHTML = data;

			var row = li.parentNode.parentNode;
			if (row.style.display == 'none') {
				var buttons = document.getElementsByClassName('toggleInfos');
				for (var i=0; i<buttons.length; i++)
					buttons[i].addEventListener('click', /*setTimeout(adjustHeightAll, 0)*/adjustHeightAll, false);
			}
			else {
				this.adjustHeight(row, li);
				
			}
		},
		
		
		process: function()
		{
			try {
				var rows = Utils.XPath('//*[contains(@class,"eventFleet")]/UL | //*[contains(@class,"partnerInfo")]/UL');
				var acsID, row, parent;
				var fleetType; // -1: hostile, 0:neutral, 1:friendly

				for (var i=0; i<rows.snapshotLength; i++) {
					row = rows.snapshotItem(i);
					
					acsID = row.parentNode.className.match(/\bunion\d+\b/);
					if (acsID) acsID = acsID[0].replace('union','');
					
					if (row.className.indexOf('allianceAttack') > -1)
						row.parentNode.className += ' acsFleet';
						
					parent = acsID ? document.getElementById('eventRow-'+acsID) : row;
						
					var countdown = Utils.XPathSingle('LI[@class="countDown"]/SPAN', parent);
					fleetType = this.getFleetType(parent);;

					// display player name
					var nickclass = 'playername';
					var nick = Utils.XPathSingle('*[@class="sendMail"]/A',row);
					if (!nick && acsID) {
						nick = Utils.XPathSingle('*[@class="descFleet"]/A',row);
						nickclass = 'playername3';
					}
					else nickclass = (fleetType==1) ? 'playername' : 'playername2';
					
					var rx = new RegExp(Options.Labels.rx_sendMail.source);

					if (nick && (nick = nick.title.match(rx)) && (nick = nick[1])) {
						var li = document.createElement('li');
						li.className = nickclass;
						li.innerHTML = nick;
						row.appendChild(li);
						
						
						var id = row.parentNode.className.match(/\bunion\d+\b/);
						if (nickclass!='playername3' && id && (id=id[0].replace('union',''))) {
							var acs = document.getElementById('eventRow-'+id);
							acs = acs.getElementsByTagName('UL')[0];
							if (!Utils.XPathSingle('*[@class="playername" or @class="playername2"]',acs))
								acs.appendChild( li.cloneNode(true) );
						}
					}

					// reduced eventList
					if (this.reduced && !acsID) {
						var arrivalTime = Utils.XPathSingle('LI[@class="arrivalTime"]', row);
						if (arrivalTime) {
							countdown = countdown.className;
							if (fleetType == 0)
								arrivalTime.className += ' neutral';
							else if (fleetType == -1)
								arrivalTime.className += ' hostile';
						}
					}
					
				}
				
				// show TimeMode selector
				if (this.reduced) {
					var container = document.getElementById('eventListWrap');
					container.className = (Options.evt_TimeMode==1) ? 'tmTime' : 'tmCountdown';
					var f = function(e){ 
						if ((e.target.id=='tmTime' || e.target.id=='tmCountdown') && container.className!=e.target.id) container.className=e.target.id;
					}
					var div = document.createElement('div');
					div.id = 'evt_timeMode';
					div.innerHTML = '<span id="tmTime">'+Options.Interface.lbl_tmTime+'</span> / <span id="tmCountdown">'+Options.Interface.lbl_tmCountdown+'</span>';
					div.addEventListener('click',f,false);
					document.getElementById('eventHeader').appendChild(div);
					
					
				}
			} catch(e) { Utils.log(e) }
		},
		
		processPro: function()
		{
			function putElementDown(el, delta){
				el.style.top = (el.offsetTop + delta) + 'px';
			}
		
			try{
				Utils.insertCSSRule('#eventListWrap { margin-left: 0 !important}');
				
				var parent = window.parent;
				if (parent) {

					parent = parent.document;
					var h = document.body.offsetHeight;

					var newEventBox = parent.getElementById('newEventBox');
					delta = h - newEventBox.clientHeight;

					if (Options.evt_noScroll)
						h += this.maxClueHeight;
					
					newEventBox.style.height = h  + 'px';
					
					if (Options.evt_showOnTop) {
						putElementDown(Utils.getElementByClassName('c-left', parent.body), delta);
						putElementDown(Utils.getElementByClassName('c-right', parent.body), delta);
					}
					
					if (Options.evt_noScroll && Options.evt_showOnTop)
						parent.getElementById('planet').style.marginTop = (-this.maxClueHeight) + 'px';

				}

				document.body.className = 'eventListPro';
			}
			catch (e) { Utils.log(e) }
		},
		
		processCluetip: function(e)
		{
			if(!e || !e.target || /*!e.target.id*/e.target.id != 'cluetip-close') return;
			
			var container = e.target.parentNode.nextElementSibling.firstElementChild.firstElementChild;
			
			var rows = container.getElementsByTagName('tr');
			var ships = [], name, count;
			for (var i=0; i<rows.length; i++) {
				name = rows[i].firstElementChild;
				count = name.nextElementSibling;
				if (count && count.innerHTML) {
					ships.push( { name: name.innerHTML, count: Utils.parseInt(count.innerHTML) } );
				}
			}
			
			var debris = Ogame.getFleetDebris(ships);
			var str = 
				'<tr><td colspan="2">&nbsp;</td></tr>' +
				'<tr><th colspan="2">'+Options.Interface.lbl_debris+':</th></tr>' +
				'<tr><td>'+Options.Interface.lbl_metal+':</td><td class="value">'+Utils.formatNumber(debris.metal)+'</td></tr>' +
				'<tr><td>'+Options.Interface.lbl_crystal+':</td><td class="value">'+Utils.formatNumber(debris.crystal)+'</td></tr>' +
				'<tr><td>'+Options.Interface.lbl_shipRecyclerAlt+':</td><td class="value">'+Utils.formatNumber(debris.recs)+'</td></tr>'
			;
			
			container.innerHTML += str;
		},
		
		iframeReady: function()
		{
			try {
				var body = this.iframe.contentWindow.document.body;
				document.getElementById('eventboxLoading').style.display = 'none';
				
				if (!body || !body.firstChild)
					document.getElementById('eventboxBlank').style.display = 'block';

			} catch (e) { Utils.log(e) }
		},
		
		showEventList: function ()
		{
			try {
				this.insertCSSRulesPro();
				var div = document.createElement('div');
				div.id = 'newEventBox';
				div.innerHTML = '<iframe id="iframeEventBox" src="index.php?page=eventList&pro=1&session='+ Utils.unsafeWindow.session +'"></iframe>';
				
				if (Options.evt_showOnTop) {
					var next = document.getElementById('planet');
					next.parentNode.insertBefore(div, next);
				}
				else {
					var prev = Utils.XPathSingle('//*[@class="content-box-s"][last()]');
					Utils.insertAfter(div, prev);
				}
				
				this.iframe = document.getElementById("iframeEventBox");
				this.iframe.contentWindow.addEventListener('load', function() { EventList.iframeReady() }, false)
				
			} catch (e) { Utils.log(e) }
		},

		
		Run: function()
		{
			if (Utils.isCurrentPage('eventList') && document.location.href.indexOf('pro=1') > -1 && Options.evt_showReduced)
				this.reduced = true;
				
			if ( document.location.href.indexOf('pro=1') > -1 )
				this.pro = true;
				
			if (Options.evt_expandFleetsEvt && Utils.isCurrentPage('eventList') || 
				Options.evt_expandFleetsPhal && Utils.isCurrentPage('phalanx')
			)
				this.bExpand = true;


			this.insertCSSRules();
			
			// eventList function Only
			if (Utils.isCurrentPage('eventList')) {
				this.process();
				
				if ( this.pro ) {
					this.processPro();
					
					Utils.unsafeWindow.old_hideRows = Utils.unsafeWindow.hideRows;
					Utils.unsafeWindow.hideRows = function (data) {
						Utils.unsafeWindow.old_hideRows(data);
						EventList.processPro();
					}
				}
			}
			// phalanx functions only
			else {
				if (Options.phalanx_showDebris)
					document.body.addEventListener("DOMNodeInserted", EventList.processCluetip, false);
			}
			
			//both eventList and phalanx
			if (Options.timeSetting == 1 && ! (Options.showServerPhalanx && Utils.page=='phalanx') )
				this.changeTime();
			
			this.show3StateIndicator('halten');
			this.show3StateIndicator('expedition');
			
				
			if (this.bExpand)
				this.expandFleets();
			
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
		tipsClass: 'tips4',
		
		addReversalTimeBox: function(fleet)
		{
			if (! Utils.getElementsByClassName('reversal',fleet).snapshotLength ) return;

			var tip = Utils.XPathSingle('//*[@id="'+ fleet.id +'"]/descendant::*[contains(@class,"origin")]/*[@class="'+this.tipsClass+'"]');
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
			/*var times = Utils.XPath(
				'descendant::*[contains(@class,"absTime")] | ' +
				'*[@class="starStreak"]/descendant::*[@class="' + this.tipsClass + '"] | ' +
				'*[contains(@class, "reversal") and @class!="reversalTime"]',
			fleet);
					
			for (var i=0 ; i < times.snapshotLength; i++ )
			{
				var node = times.snapshotItem(i);
				var property = (node.className.indexOf(this.tipsClass)>-1 ? 'title' : 'innerHTML');
				node[property] = DateTime.convertStringServer2Local(node[property]);
			}*/
			var xpath = this.fleetXPath + '/descendant::*[contains(@class,"absTime")] | ' +
				this.fleetXPath + '/*[contains(@class, "reversal") and @class!="reversalTime"]';
			DateTime.changeNodesTime(xpath);
			
			xpath = this.fleetXPath + '/*[@class="starStreak"]/descendant::*[@class="' + this.tipsClass + '"]';
			DateTime.changeNodesTime(xpath, null, 'title');
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
		
		cssFleetColors: function()
		{
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
		},

		insertCSSRules: function ()
		{
			if (Options.mvmt_expandFleets) {
				Utils.insertCSSRule(".detailsOpened .starStreak  {background:none}");
				Utils.insertCSSRule(".anti_fleetDetails {left:60px; width:290px; white-space:normal; padding:0px 7px; font-size:0.9em; text-align:left; line-height:1.2em}");

				this.cssFleetColors();
			}
			
			if (Options.mvmt_showReversal)
				Utils.insertCSSRule(".reversalTime { position: absolute; top: 43px; left: 555px; color: yellow;} ");
				
			Utils.insertCSSRule(".targetName { position:absolute; top:45px; left:7px; color:green;} ");
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
			try {
				var id = fleet.id.replace(/\D+/g, '');

				if (!id) return;
				
				var mission = Utils.getElementByClassName('mission', fleet);
				var reversal = Utils.getElementByClassName('reversal', fleet);
				var next = Utils.getElementByClassName('nextMission', fleet);

				var details = document.getElementById('bl'+id);

				if (!details) return;

				var newNode = document.createElement('div');
				newNode.setAttribute('class', 'anti_fleetDetails fixed '+this.getMissionClass(fleet));
				
				if (!reversal && next /*|| reversal && finish*/) // in the Expedition or on Hold
					mission.innerHTML += ' ('+mission.innerHTML.substr(0,1)+')';
				else if (!reversal) // Returning
					mission.innerHTML += ' ('+Options.Interface.lbl_mvmt_Return+')';

				var res = this.getDetails(details);
				newNode.innerHTML = res.ships+'<br/><br/>'+res.cargo;

				var picto = Utils.XPathSingle(
					'descendant::*[contains(@class,"starStreak")]/' +
					'descendant::*[contains(@class,"route")]', fleet);

				//picto.parentNode.replaceChild(newNode, picto);
				picto.parentNode.insertBefore(newNode, picto);
				picto.style.display = "none";
				
				// set 'openDetails' button handler
				var btn = Utils.XPathSingle('descendant::*[contains(@class,"openDetails")]/A', fleet);
				btn.addEventListener("click", function (){ setTimeout(function (){ FleetMovement.myOpenCloseFleet(fleet.id, 1); }, 0); }, false);

				// invoke the handler
				this.myOpenCloseFleet(fleet.id, 0);
			} catch(e) { Utils.log(e) }
		},

		showTargetName: function(fleet)
		{
			try {
				var name = Utils.getElementByClassName('destinationCoords', fleet);
				if (!name || !name.title || !name.title=='|') return;
				name = name.title.slice(1);
				
				var span = document.createElement('span');
				span.className = 'targetName';
				span.innerHTML = name;
				var mission = Utils.getElementByClassName('mission', fleet);
				Utils.insertAfter(span, mission);
			} catch (e) { Utils.log(e) }
			
		},
		
		Run: function()
		{
			if (!Options.mvmt_expandFleets && !Options.mvmt_showReversal) return;

			this.insertCSSRules();

			if (Utils.ogameVersion == '1.1') this.tipsClass = 'tips4';
			else this.tipsClass = 'tipsTitleSmall';

			var fleets = Utils.XPath(FleetMovement.fleetXPath);

			for (var i=0; i<fleets.snapshotLength; i++) {
				var fleet = fleets.snapshotItem(i);
				if (Options.mvmt_expandFleets) this.expandFleet(fleet);
				if (Options.mvmt_showReversal) this.addReversalTimeBox(fleet);
				//if (Options.timeSetting == 1) this.correctTimes(fleet);
				this.showTargetName(fleet);
			}
			
			if (Options.timeSetting == 1) this.correctTimes();

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
	// Resource Calculator
	// =======================================================================
	var Calculator =
	{
		insertCSSRules: function()
		{
			Utils.insertCSSRule('#calculator { \
				margin: 3px 0; \
				padding: 1px 0; \
				background-color: #13181D; \
				border: 3px double black; \
				width: 633px; \
			}');
			Utils.insertCSSRule('#calculator table { margin: 0 auto; }');
			Utils.insertCSSRule('#calculator td, #calculator th, #calculator input { text-align:right;}');
			Utils.insertCSSRule('#calculator select, #calculator option { text-align:center;}');
			Utils.insertCSSRule('#calculator #calc_res input, #calculator #calculator #calc_coords { width:100px; }');
			Utils.insertCSSRule('#calculator #calc_sl { font-size:11px;}');
			Utils.insertCSSRule('#calculator option { padding-right:3px;}');
			Utils.insertCSSRule('#buttonz { height:auto !important; }');
			Utils.insertCSSRule('#fleet1 #buttonz #calculator a { text-decoration:underline !important; color:#5577EE; }');
			Utils.insertCSSRule('#calculator td, #calculator th { border:1px solid grey; padding: 1px 3px;}');
			Utils.insertCSSRule('#calculator #calc_g {width:14px}');
			Utils.insertCSSRule('#calculator #calc_s {width:27px}');
			Utils.insertCSSRule('#calculator #calc_p {width:16px}');
		},
		
		readValue: function(node, allow_empty) 
		{
			allow_empty = allow_empty || false;

			if (typeof node == 'string')
				node = document.getElementById(node);
			if 	(typeof node != 'object') return;

			var value = Utils.parseInt(node.value);
			if (isNaN(value) || (!value && value!=0)) value = allow_empty ? '' : 0;
			return value;
		},
		
		writeValue: function(node, value)
		{
			if (typeof node == 'string')
				node = document.getElementById(node);
			if 	(typeof node != 'object') return;
			
			node.value = value;
		},
		
		getResources: function()
		{
			var nodes = Utils.XPath('descendant::TR[@id="calc_res"]/descendant::INPUT', this.container);
			var res = {};
			res.metal =  this.readValue(nodes.snapshotItem(0));
			res.crystal = this.readValue(nodes.snapshotItem(1));
			res.deuterium = this.readValue(nodes.snapshotItem(2));
			return res;
		},
		
		getTarget: function()
		{
			return {galaxy:this.readValue('calc_g'),system:this.readValue('calc_s'),planet:this.readValue('calc_p')};
		},
		
		getShipCount: function(id)
		{
			var node = Utils.XPathSingle('//*[@id="button'+id+'"]/descendant::*[@class="level"]');
			return Utils.parseInt(node.lastChild.nodeValue);
		},
		
		checkInput: function(targetNode)
		{
			var value = this.readValue(targetNode, true);
			if (!isNaN(value) && value!=='') {
				var min, max;
				switch (targetNode.id) {
					case 'calc_g': min=1; max = 9; break;
					case 'calc_s': min=1; max = 499; break;
					case 'calc_p': min=1; max = 16; break;
					default: min=0; max = 0;
				}
				if (max && value>max) value = max;
				if (value<min) value = min;
			}
			targetNode.value = ''+value;
		},
		
		calculate: function(targetNode)
		{
			try {
				var res = this.getResources();
				var total = res.metal + res.crystal + res.deuterium;
				
				var target = this.getTarget();
				var distance = Ogame.getFleetDistance(this.ActiveCoords, target);
				
				document.getElementById('calc_total').innerHTML = Utils.formatNumber(total);

				var node;
				var list = [202,203,209];

				for (var i=0; i<list.length; i++) {
					var id = list[i];

					var duration = Ogame.getFleetDuration(id, distance, 10);
					var consumption = Ogame.getFleetConsumption(id, distance, 10);
					var cnt = Math.max( 0, Math.ceil(total / (Ogame.ships[id].capacity-consumption) ));
					
					// count
					node = Utils.XPathSingle('descendant::TR[@id="calc_ships"]/descendant::*[@ref="'+id+'"]', this.container);
					node.innerHTML = Utils.formatNumber(cnt);
					var cnt_available = this.getShipCount(id);
					if (cnt<=cnt_available) node.style.color = '';
					else if (!cnt_available) node.style.color = Options.nameColorOff;
					else if (cnt>cnt_available) node.style.color = Options.nameColorDisabled;

					// duration
					node = Utils.XPathSingle('descendant::TR[@id="calc_dur"]/descendant::*[@ref="'+id+'"]', this.container);
					node.innerHTML = DateTime.formatTime(duration);
					
					// consumption
					node = Utils.XPathSingle('descendant::TR[@id="calc_cons"]/descendant::*[@ref="'+id+'"]', this.container);
					node.innerHTML = Utils.formatNumber(consumption*cnt);
				}
				
			} catch (e) { Utils.log(e) }
		},
		
		save: function()
		{
			var target = this.getTarget();
			var res = this.getResources();
			Utils.setValueUni('calc_res',res.metal+':'+res.crystal+':'+res.deuterium);
			Utils.setValueUni('calc_coords', target.galaxy+':'+target.system+':'+target.planet);
		},
		
		reset: function()
		{
			Utils.deleteValueUni('calc_res');
			Utils.deleteValueUni('calc_coords');
		},
		
		getStoredRes: function()
		{
			return Utils.getValueUni('calc_res','');
		},
		
		getStoredCoords: function()
		{
			return Utils.getValueUni('calc_coords','');
		},
		
		clear: function()
		{
			var res = this.getResources();
			this.writeValue('calc_metal', 0);
			this.writeValue('calc_crystal', 0);
			this.writeValue('calc_deuterium', 0);
			this.writeValue('calc_g', this.ActiveCoords.galaxy);
			this.writeValue('calc_s', this.ActiveCoords.system);
			this.writeValue('calc_p', this.ActiveCoords.planet);
			this.calculate();
			
			this.reset();
		},
		
		show: function(parent)
		{
			function addShipLink(id) {
				return '<td><a href="javascript:void(0);" ref="'+id+'">0</a></td>';
			}
			function addResLink(res) {
				return '<th><a href="javascript:void(0);" id="calc_hdr_'+res+'">'+Options.Labels['lbl_'+res]+'</a></th>';
			}
			function addResInput(res) {
				return '<td><input type="text" id="calc_'+res+'" value="0"></td>';
			}
			function addShipCons(id) {
				return '<td ref="'+id+'"></td>';
			}
			function addShipDur(id) {
				return '<td ref="'+id+'"></td>';
			}
			function addSL() {
				var sl_select = '<option value="">-</option>';
				
				var slinks = [];
				var nodes = Utils.getElementsByClassName('planetlink');
				for (var i=0; i<nodes.snapshotLength; i++)
					slinks.push(Ogame.getCoordsFromPlanet(nodes.snapshotItem(i)));

				try {
					var slinks2 = Options.fleet2_ShortLinks.split(',');
					for (var i=0; i<slinks2.length; i++) {
						var link = slinks2[i].split('#');
						if (!link || link.length<4) continue;
						slinks.push( {galaxy:link[0], system:link[1], planet:link[2], name: link[4]||''} );
					}
				} catch (e) { Utils.log(e) }
				
				slinks.sort(function(a,b){ return (a.galaxy-b.galaxy) || (a.system-b.system) || (a.planet-b.planet) });
				var t = target;
				for (var i=0; i<slinks.length; i++) {
					var s = slinks[i];
					sl_select += '<option '+((s.galaxy==t.galaxy&&s.system==t.system&&s.planet==t.planet)?'selected':'')+' value="'+s.galaxy+'#'+s.system+'#'+s.planet+'">'+s.name+' ('+s.galaxy+':'+s.system+':'+s.planet+')</option>';
				}
				
				sl_select = '<td><select id="calc_sl">'+sl_select+'</select></td>';
				return sl_select;
			}
			
			try {
				this.insertCSSRules();
				this.ActiveCoords = Ogame.getActiveCoords();
				
				var target;
				if (Coords.saved()) {
					var coords = Coords.get().split(':');
					target = {galaxy:coords[0], system:coords[1], planet:coords[2]};
				}
				else 
					target = {galaxy:this.ActiveCoords.galaxy, system:this.ActiveCoords.system, planet:this.ActiveCoords.planet};
					
				var coords = '<div id="calc_coords"><input id="calc_g" value="'+target.galaxy+'"> : <input id="calc_s" value="'+target.system+'"> : <input id="calc_p" value="'+target.planet+'"></div>';
				
				var btnSave = '<td><a id="calc_save" href="javascript:void(0);">'+Options.Interface.lbl_Save+'</a></td>';
				var btnClear = '<td><a id="calc_clear" href="javascript:void(0);">'+Options.Interface.lbl_Clear+'</a></td>';

				var calc = document.createElement('div');
				calc.id = 'calculator';
				calc.innerHTML = '<table>' + 
					'<tr id="calc_res_hdr"><th></th>'+addResLink('metal')+addResLink('crystal')+addResLink('deuterium')+'<th>'+Options.Interface.lbl_total+'</th></tr>' +
					'<tr id="calc_res"><td></td>'+addResInput('metal')+addResInput('crystal')+addResInput('deuterium')+'<td id="calc_total">0</td></tr>' +
					'<tr><th></th><th>'+Options.Interface.lbl_shipSCargoAlt+'</th><th>'+Options.Interface.lbl_shipLCargoAlt+'</th><th>'+Options.Interface.lbl_shipRecyclerAlt+'</th><th>'+coords+'</th></tr>' +
					'<tr id="calc_ships"><th>'+Options.Interface.lbl_Quantity+'</th>'+addShipLink(202)+addShipLink(203)+addShipLink(209)+addSL()+'</tr>' +
					'<tr id="calc_cons"><th>'+Options.Interface.lbl_Consumption+'</th>'+addShipCons(202)+addShipCons(203)+addShipCons(209)+btnClear+'</tr>' +
					'<tr id="calc_dur"><th>'+Options.Interface.lbl_Duration+'</th>'+addShipDur(202)+addShipDur(203)+addShipDur(209)+btnSave+'</tr>' +
					'</table>';
				parent.appendChild(calc);
				
				this.container = calc;

				Utils.$('#calculator input')
					.bind('keyup', function(){Calculator.checkInput(this); Calculator.calculate()})
					.bind('focus',function(){this.value='';Calculator.calculate();})
					.bind('blur', function(){if (!this.value)this.value='0';})
				;
				Utils.$('#calculator #calc_ships a').bind('click', function(){ FleetSend.setShips('ship_'+this.getAttribute('ref'), Utils.parseInt(this.innerHTML))});
				Utils.$('#calculator #calc_res_hdr a').bind('click', function()
					{
						var res = this.id.replace('calc_hdr_','');
						var value = Utils.getIntById('resources_'+res);
						document.getElementById('calc_'+res).value = value;
						Calculator.calculate();
					})
					.trigger('click');
					
				Utils.$('#calc_save').bind('click',function(){setTimeout(function(){Calculator.save()},0)});
				Utils.$('#calc_clear').bind('click',function(){setTimeout(function(){Calculator.clear()},0)});
				Utils.$('#calc_sl').bind('change',function(){
					if (!this.value) return;
					var coords = this.value.split('#');
					Calculator.writeValue('calc_g',coords[0]); 
					Calculator.writeValue('calc_s',coords[1]); 
					Calculator.writeValue('calc_p',coords[2]);
					Calculator.calculate();
					});
			} catch (e) { Utils.log(e) }
		},

	}
	
	// =======================================================================
	// functions for Send fleet pages
	// =======================================================================
	var FleetSend = 
	{
		Capacity_insertCSSRules: function()
		{
			Utils.insertCSSRule('.total_capacity td {padding: 2px 5px; /*color: #A1A1A1;*/ font-size: 11px;}');
			Utils.insertCSSRule('.total_capacity #total_capacity {color: green;}');
			Utils.insertCSSRule('.total_capacity td.capacity_href {text-decoration: underline; color: #5577EE;}');
			
			var top = Options.showNames ? 34 : 8;
			
			Utils.insertCSSRule('.speed { \
				position: absolute; \
				top: '+top+'px; \
				right: 3px; \
				max-width: 76px; \
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
			speed = Utils.formatNumber(speed);
			
			var a = Utils.XPathSingle('descendant::DIV/descendant::A', node);
			if (!a) return;
			
			var div = document.createElement('div');
			div.className = 'speed';
			div.innerHTML = speed;
			
			a.appendChild(div);
		},
		
		showCapacity: function (node)
		{
			try {
				var txtFields = Utils.getElementsByClassName('fleetValues');

				var sum = 0, minspeed = 0, expoints = 0;
				
				for ( var i=0; i<txtFields.snapshotLength; i++ ) {
					txt = txtFields.snapshotItem(i);
					var id = txt.id.replace('ship_','');
					if (! (id in Ogame.ships) ) continue;
					
					capacity = Ogame.ships[id].capacity;
					exp = Ogame.ships[id].exp;

					if (!isNaN(txt.value) && txt.value>0) {
						sum += txt.value * capacity;
						expoints += txt.value * exp;
						minspeed = Math.min(minspeed, Ogame.ships[id].speed) || Ogame.ships[id].speed;
					}
				}

				document.getElementById('total_capacity').innerHTML = Utils.formatNumber(sum);
				document.getElementById('min_speed').innerHTML = Utils.formatNumber(minspeed);
				
				var expnode = document.getElementById('expoints');
				expnode.innerHTML = Utils.formatNumber(expoints);

				var upperLimit = Options.uni_maxPlayerScore ? 12000 : 9000;
				if (expoints > upperLimit)
					expnode.className = "overmark";
	            else if (expoints < upperLimit)
 					expnode.className = "undermark";
			    else
 					expnode.className = "middlemark";
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
			try {
				var unsafe = Utils.unsafeWindow;
				
				if (Options.fleet2_setTargetDF) {
					unsafe.old_trySubmit = unsafe.trySubmit;
					unsafe.trySubmit = function () { FleetSend.checkRecyclers(); unsafe.old_trySubmit() };
				}
				
				if (Options.fleet1_killTips)
					Utils.killCluetips();
					
				var allornone;
				if(Options.fleet1_showResCalc)
					if(allornone = document.getElementById('allornone'))
						Calculator.show(allornone);

			
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
				
				if (no_fleet) {
					Utils.insertCSSRule('.total_capacity {margin: 2px 25px;}');
					
					SimpleTable.addCell(Options.Labels.lbl_shipSCargo, scargo);
					SimpleTable.addCell(Options.Labels.lbl_shipLCargo, lcargo);
					newDiv.innerHTML = '<table>' + SimpleTable.createTableString(1) + '</table>';
					parent.appendChild(newDiv);
				}
				else {
					Utils.$('form li')
						.filter( function() {return !isNaN(this.id.replace('button','')) } )
						.each( function(){FleetSend.addSpeed(this)});
						
					SimpleTable.addCell(Options.Interface.lbl_TotalCapacity,0, '', 'total_capacity');

					if (!Options.fleet1_showResCalc) {
						SimpleTable.addHref(Options.Labels.lbl_shipSCargo, scargo, 'SCargo');
						SimpleTable.addHref(Options.Labels.lbl_shipLCargo, lcargo, 'LCargo');
					}
					
					SimpleTable.addCell(Options.Interface.lbl_ExPoints,0, '', 'expoints');
					SimpleTable.addCell(Options.Interface.lbl_MinSpeed,0, '', 'min_speed');

					newDiv.innerHTML = '<table>' + SimpleTable.createTableString(1) + '</table>';
					
					var prev = Utils.getElementByClassName('combatunits', parent) || Utils.getElementByClassName('secondcol', parent);
					Utils.insertAfter(newDiv, prev);

					if (!Options.fleet1_showResCalc) {
						document.getElementById('SCargo').addEventListener('click', function (){ FleetSend.setShips('ship_202', scargo); return true; }, false );
						document.getElementById('LCargo').addEventListener('click', function (){ FleetSend.setShips('ship_203', lcargo); return true; }, false );
					}

					unsafe.old_checkShips = unsafe.checkShips;
					unsafe.checkShips = function(form) { FleetSend.showCapacity(); unsafe.old_checkShips(form) }
					Utils.$('input.fleetValues').bind('focus', function(){ FleetSend.showCapacity() } );
					
				}
			} catch (e) { Utils.log(e) }
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
				
				
				var nextparts = nextlink ? this.getPartsFromLink(nextlink) : null;
				
				for (var i=1; i<options.length; i++) {
					if (nextlink) {
						var curparts = this.getPartsFromLink(options[i].value);
						if (curparts.galaxy == nextparts.galaxy && curparts.system == nextparts.system && 
							curparts.planet == nextparts.planet && curparts.type == nextparts.type
							) 
							next = options[i];
					}
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
				var coords = Ogame.getCoordsFromPlanet(planet);
				var res = coords.galaxy + '#' + coords.system + '#' + coords.planet + '#' + coords.type + '#' + coords.name;
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
			var coords = Calculator.getStoredCoords() || ( (Options.autocopyCoords && Coords.saved()) ? Coords.get() : '' );
			if (!coords) return;

			coords = coords.split(':');
			
			document.getElementById('galaxy').value = coords[0];
			document.getElementById('system').value = coords[1];
			document.getElementById('position').value = coords[2];

			Utils.trigger('galaxy', 'change');
			
			var df = document.getElementById('dbutton');
			if ( !df || df.className.indexOf('selected') == -1 )			
				Utils.trigger('pbutton', 'click');
		},
		
		expandSpeed: function()
		{
			var html = '';
			for (var i=1; i<=10; i++)
				html += '<a href="javascript:void(0);" rel="'+i+'">' + (i*10) + '%</a> ';
			var code = '\
			$("<li>")\
				.attr("id","speed_plain")\
				.html(\'' + html + '\')\
				.find("a")\
					.bind("click", function(){ $("#speed").attr("value",this.getAttribute("rel")); updateVariables(); })\
				.end()\
				.appendTo("#fleetBriefingPart1")\
			.parent()\
				.css("margin-bottom","-3px");\
			';
			Utils.runScript(code);

		},
		
		expandSLinks: function()
		{
			function createHrefFromItem(item, className) {
				className = className || 'slHref';
				return '<a class="' + className + '" href="javascript:void(0)" rel="'+item.index+'">'+item.name+'</a>';
			}
			
			try {
				var slNodes = Utils.XPath('//*[@id="slbox"]/option[@value!="-"]');
				var rows = [], coords_list = [];
				var row_cnt = 0;
				var sl, parts, coords, current_row;
				
				// Shortcuts
				for (var i=0; i<slNodes.snapshotLength; i++) {
					sl = slNodes.snapshotItem(i).value;
					parts = this.getPartsFromLink(sl);
					coords = parts.galaxy * 100000 + parts.system*100 + parts.planet;

					if (parts.type == 2)	{
						current_row = row_cnt++;
						rows[ current_row ] = [];
					}
					else if (typeof coords_list[coords] == 'undefined')	{
						current_row = row_cnt++;
						coords_list[coords] = current_row;
						rows[ current_row ] = [];
					}
					else {
						current_row = coords_list[coords];
					}
						
					rows[ current_row ] [ ((parts.type==2)?1:parts.type) ] = {sl: sl, name: slNodes.snapshotItem(i).innerHTML, index: i };
				}

				// ACS
				slNodes = Utils.XPath('//*[@id="aksbox"]/option[@value!="-"]');
				for (var i=0; i<slNodes.snapshotLength; i++) {
					sl = slNodes.snapshotItem(i).value;
					parts = this.getPartsFromLink(sl);

					if (typeof rows[i] == 'undefined')	{
						rows[i] = [];
					}
					
					rows[i] [5] = {sl: sl, name: parts.name + ' [' + parts.galaxy + ':' + parts.system + ':' + parts.planet + '] - ' + slNodes.snapshotItem(i).innerHTML, 
						index: i, type: parts.type };
				}

				var slTable = '';
				var slRow, slItem;
				
				for (var i=0; i<rows.length; i++) {
					var row = rows[i];
					slRow =
						'<td class="slPlanet">' + (row[1]?createHrefFromItem(row[1]):'') + '</td>' + 
						'<td class="slMoon">' + (row[3]?createHrefFromItem(row[3]):'') + '</td>' +
						'<td ' + ( row[5]&&row[5].type==3 ? 'class="slMoon"': '') + '>' + (row[5]?createHrefFromItem(row[5],'slACS'):'') + '</td>'
					;
					slTable += '<tr>' + slRow + '</tr>';
				}
				
				var lblPlanet = document.getElementById('pbutton').firstElementChild.innerHTML;
				var lblMoon = document.getElementById('mbutton').firstElementChild.innerHTML;
				var lblACS = document.getElementById('combatunits tips').innerHTML.replace(':','');
				
				slTable = '<tr><th>'+lblPlanet+'</th><th>'+lblMoon+'</th><th>'+lblACS+'</th></tr>' + slTable ;
				slTable = '<table><tbody>' + slTable + '</tbody></table>';
				var slPanel = document.createElement('div');
				slPanel.id = 'slPanel';
				slPanel.innerHTML = slTable;
				
				document.getElementById('inhalt').appendChild(slPanel);
				
				// 'Click' handlers
				Utils.runScript('$(".slHref").bind("click", function(){ $("#slbox option").get(1+parseInt(this.getAttribute("rel"))).selected = true; shortLinkChange(); updateVariables(); } )');
				Utils.runScript('$(".slACS").bind("click", function(){ $("#aksbox option").get(1+parseInt(this.getAttribute("rel"))).selected = true; shortLinkChange(true); updateVariables(); handleUnion() } )');
			}
			catch (e) { Utils.log(e) }
			
		},
		
		fleet2_insertCSSRules: function()
		{
			Utils.insertCSSRule('#speed_plain { list-style-type: none; }');
			Utils.insertCSSRule('#speed_plain a { text-decoration: none; font-weight:100; }');
			Utils.insertCSSRule('.anti_moon, .slMoon a { background-color: ' + Options.fleet2_MoonColor + '; }');
			
			if (Options.fleet2_expandLists) {
				Utils.insertCSSRule('#slPanel { \
					padding: 5px; \
					margin: 2px 0 0 5px;\
					background-image: url("img/layout/wrap-body.gif"); \
					width: 642px;\
				}');
				Utils.insertCSSRule('#slPanel table { width: 100%; }');
				Utils.insertCSSRule('#slPanel td, #slPanel th { padding: 0 3px; font-size: 11px; min-width: 180px; }');
				Utils.insertCSSRule('#slPanel th { color: #7C8E9A; }');
				Utils.insertCSSRule('#slPanel a, #speed_plain a { color: #AAAAAA; }');
				Utils.insertCSSRule('#slPanel a:hover, #speed_plain a:hover { color: white; }');
			}
			
		},
		
		Fleet2_Run: function()
		{
			this.fleet2_insertCSSRules();

			if (Options.fleet2_fixLayout) {
				var nodes = Utils.XPath('//DIV[@id="buttonz"]/DIV/UL');
				if (nodes.snapshotLength) {
					nodes.snapshotItem(0).style.marginLeft = "20px";
					nodes.snapshotItem(1).style.marginLeft = "20px";
				}
			}
			
			if (Options.fleet2_checkProbeCapacity) {
				var w=Utils.unsafeWindow;
				w.getFreeStorage = function()
				{
					var s = w.storageCapacity, c=w.consumption, ps=w.probeStorageCapacity;
					return (s==ps)? s-c : s-c - (ps-w.getConsumption(210));
				}
			}
			
			var unsafe = Utils.unsafeWindow;
			
			var activelink, nextlink;
			
			var activePlanet = Ogame.getActivePlanet();
			activelink = this.getSLinkFromPlanet(activePlanet);
			
			var nextPlanet = Utils.XPathSingle('parent::*/following-sibling::*/A[contains(@class,"planetlink")]', activePlanet);
			if (nextPlanet) nextlink = this.getSLinkFromPlanet(nextPlanet);
			
			this.insertShortLink(activelink, nextlink);
			
			var shortlinks = Options.fleet2_ShortLinks.split(',');
			for (var i=0; i<shortlinks.length; i++)
				this.insertShortLink(shortlinks[i]);
		
			if (Options.fleet2_setTargetDF && Utils.getValueUni('fleet1_recyclers'))
				Utils.trigger('dbutton', 'click');

			if (this.isTargetEmpty())
				this.SetCoords();
				
			shortlinks = Utils.XPath('//*[@id="slbox"]/option');
			for (var i=0; i<shortlinks.snapshotLength; i++) {
				var item = shortlinks.snapshotItem(i);
				if ( item.value.split('#')[3] == 3 ) {
					//item.style.backgroundColor = Options.fleet2_MoonColor;
					item.className = 'anti_moon';
					
					if (Options.fleet2_MoonsToEnd)
						item.parentNode.appendChild(item);
				}
			}
			
			Utils.runScript("$('#speed option').bind('mouseover', function(){ this.parentNode.value = this.value; updateVariables(); });");
			
			if (Options.fleet2_expandLists) {
				this.expandSpeed();
				this.expandSLinks();
			}
		},
		
		setMission: function ()
		{
			// if mission is set then do nothing
			if (Utils.XPath('//*[@id="missions"]/descendant::*[contains(@id,"missionButton") and contains(@class,"selected")]').snapshotLength > 0)
				return;

			// look for the first 'on' mission
			var missions = new Array(
				7, // priority to colonization - workaround for existing bug in ogame
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
		
		setResources: function()
		{
			var res = Calculator.getStoredRes();
			if (!res) return;
			res = res.split(':');
			Calculator.writeValue('metal',res[0]);
			Calculator.writeValue('crystal',res[1]);
			Calculator.writeValue('deuterium',res[2]);
			Utils.runScript('setTimeout(function(){checkRes();updateVariables();},0)');
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
			this.setResources();
			//this.showACStime();
		}
	}
	
	
	// =======================================================================
	// functions for Galaxy view
	// =======================================================================
	var Galaxy =
	{
		highlightAllyPlayer: function(row)
		{
			
			Colorer.highlight(Colorer.PLAYER, 'descendant::*[contains(@class,"status_abbr")]', row);
			
			if (Options.galaxy_killTips)
				Colorer.highlight(Colorer.ALLY, 'descendant::SPAN[contains(@rel,"alliance")]/A', row);
			else 
				Colorer.highlight(Colorer.ALLY, 'descendant::SPAN[contains(@rel,"alliance")]', row);
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

				var link = Utils.getElementByClassName( (Utils.ogameVersion=='1.1')?'TTgalaxy':'tipsGalaxy', debris);
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
				
				if (!Names.showImgAlt(img) && Options.galaxyHideMoon)
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
					var newNode;
					
					if (Options.galaxy_killTips) {
						newNode = document.createElement('a');
						newNode.href = 'index.php?page=statistics&session='+Utils.unsafeWindow.session+'&start='+rank;
					}
					else
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
			if(!ally) return;
			
			var rank = Utils.getElementByClassName('rank', ally);
			var members = Utils.getElementByClassName('members', ally);

			if (!rank) return;

			// Killing tooltip body and inserting links to ally info and stats
			if (Options.galaxy_killTips) {
				var tooltip = Utils.XPathSingle('descendant::DIV[contains(@id,"alliance")]', ally);
				var allyname = tooltip.parentNode;
				var siteurl = Utils.XPathSingle('descendant::A[@target="_ally" or contains(@href,"alliance")]', ally);
				if (siteurl) {
					siteurl = siteurl.href;
					allyname.removeChild(tooltip);
					allyname.innerHTML = '<a href="' + siteurl + '">' + allyname.innerHTML + '</a>';
				}
			}


			// Displaying rank
			rank = Utils.parseInt(rank.innerHTML);
			members = Utils.parseInt(members.innerHTML);
			
			var str = '';
			if (rank && !isNaN(rank)) str += '#'+rank;
			if (members && !isNaN(members)) str += '/'+members;

			if (str)
			{
				var newNode;
					
					if (Options.galaxy_killTips) {
						newNode = document.createElement('a');
						newNode.href = 'index.php?page=statistics&session='+Utils.unsafeWindow.session+'&who=ally&start='+rank;
					}
					else
						newNode = document.createElement('span');

				newNode.className = 'anti_allyrank';
				newNode.innerHTML = ' '+str;

				color=Options.galaxyRankColor;
				newNode.style.color = color;

				ally.appendChild(newNode);
			}
			
		},
		
		killTips: function()
		{
			var selector = "";
			var tipsClass = (Utils.ogameVersion=='1.1') ? 'TTgalaxy' : 'tipsGalaxy';
			if (Options.galaxy_keepTipsPlanets) selector = '.microplanet, .moon .'+tipsClass;
			if (Options.galaxy_keepTipsDebris) selector += (selector?',':'') + '.debris .'+tipsClass;
			
			var initCluetip = function() {
				if (selector)
					Utils.unsafeWindow.$(selector).cluetip("destroy").cluetip({local:true,cluetipClass:"galaxy",width:250,showTitle:false,closeDelay:250,mouseOutClose:true,hoverIntent:false})
				}

			if (Utils.ogameVersion=='1.1')
				Utils.unsafeWindow.AjaxCluetip = initCluetip;
			else
				Utils.unsafeWindow.initCluetip = initCluetip;
		},
		
		onDOMNodeInserted: function(e)
		{
			if(!e || !e.target || !e.target.id) return;
			if( e.target.id == "galaxytable")  Galaxy.redrawGalaxy();
		},

		insertCSSRules: function()
		{
			if (Options.galaxy_killTips) {
				Utils.insertCSSRule('.allytag a {text-decoration:none; color:#CFCBC2;}');
			}
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
			this.insertCSSRules();
			
			if (Options.galaxy_killTips)
				this.killTips();
			
			document.body.addEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);
			
			// workaround for Opera
			if (document.getElementById('galaxytable'))
				Galaxy.redrawGalaxy();
			
		}
	}
	
	var Jumpgate = {
		Show: function()
		{
			var code = '\
$(".quantity").each(function() {\
	var fvalue = this.innerHTML.replace(/[\\(\\)]/g,"");\
	var value = fvalue.replace(/\\D/g,"");\
	$(this)\
		.html(\'(<a href="javascript:void(0)">\' + fvalue + "</a>)")\
		.find("a")\
		.addClass("quantity_link")\
		.click(function(){ \
			$(this).parent().parent().next().find("input")\
			.attr("value",value);\
		});\
	})\
';
			Utils.runScript(code);
		},
		
		insertCSSRules: function()
		{
			Utils.insertCSSRule('.quantity_link {color:#5577EE !important;}');
		},
		
		Run: function()
		{
			this.insertCSSRules();
			this.Show();
		}
	}


	var Names = 
	{
		// workaround for weird Firefox behaviour with images containing NO alt attribute
		showImgAlt: function(img)
		{
			if (Utils.isFirefox && img.clientWidth == 0) {
				img.style.display = 'none';
				setTimeout(function(){img.style.display = 'inline'}, 150);
				return true;
			}
			return false;
		},
	
		insertCSSRules: function()
		{
			Utils.insertCSSRule('.itemname { \
				position: absolute; \
				top: 8px; \
				right: 3px; \
				max-width: 76px; \
				height: auto !important; \
				background: transparent url("'+Utils.bg+'") repeat !important;\
				text-align: right; \
				font-size: 10px; \
				overflow: hidden; \
			}');
			
			if (Utils.page == 'techtree'){
				Utils.insertCSSRule('.redBorder .itemname { color: '+Options.nameColorOff+'; }');
				Utils.insertCSSRule('.greenBorder .itemname { color: '+Options.nameColorOn+'; }');
			}
			
			else {
				Utils.insertCSSRule('.off .itemname { color: '+Options.nameColorOff+'; }');
				Utils.insertCSSRule('.on .itemname { color: '+Options.nameColorOn+'; }');
				Utils.insertCSSRule('.disabled .itemname { color: '+Options.nameColorDisabled+'; }');
			}
		},
		
		showBuildingResNames: function()
		{
			try {
				var images = Utils.XPath('//*[@id="costs"]/descendant::*[contains(@class,"metal")][@title]/IMG');
				if (!images) return;
				
				for (var i=0; i<images.snapshotLength; i++) {
					var img = images.snapshotItem(i);
					if (img.getAttribute('alt'))
						continue;
					
					var title = img.parentNode.title;
					title = title.match(/\s([^\s]+)$/);
					
					img.setAttribute('alt',title[1]);
					this.showImgAlt(img);
				}
			} catch (e) { Utils.log(e) }
		},
		
		showResNames: function()
		{
			try {
				var images = Utils.XPath('//*[@id="resources"]/*[contains(@id,"_box")]');
				if (!images) return;
				
				for (var i=0; i<images.snapshotLength; i++) {
					var img = Utils.XPathSingle('descendant::IMG', images.snapshotItem(i));
					if (!img || img.getAttribute('alt'))
						continue;
					
					var id = images.snapshotItem(i).id;
					id = id.substr(0, id.indexOf('_'));
					if (!id) continue;
					
					
					img.setAttribute('alt',  Options.Labels['lbl_'+id]);
					this.showImgAlt(img);
				}
			} catch (e) { Utils.log(e) }
		},
		
		showBuildingNames: function()
		{
			try {
				this.insertCSSRules();
				
				var xpath;
				
				if ( Utils.isCurrentPage('fleet1') ) xpath = '//*[@class="buildingimg"]/A';
				else if ( Utils.isCurrentPage('techtree') ) xpath = '//A/DIV[contains(@class,"Border")]';
				else xpath = '//A[@ref]';
				
				xpath += '[@title]';
				var nodes = Utils.XPath(xpath);
				var div, title, node;
				var rx='\\|([^<\\(]+)';
				if ( Utils.isCurrentPage('techtree') )
					rx='([^<\\(|]+)';
				
				rx = new RegExp(rx,'');
				
				for (var i=0; i<nodes.snapshotLength; i++) {
					node = nodes.snapshotItem(i);
					title = node.title.match(rx);
					if (!title) continue;
					
					div = document.createElement('div');
					div.className = 'itemname';
					
					if (Utils.page=='resources') { 
						var ref = node.getAttribute('ref');
						if (ref == '1' || ref == '2' || ref == '3' || ref == '4' || ref == '12' || ref == '212')
							div.style.maxWidth = '96px';
					}
						
					div.innerHTML = title[1];
					node.appendChild(div);
					
				}
				
			} catch (e) { Utils.log(e) }
		},
		
		showPlanetConstruction: function()
		{
			try {
				
				var cons = Utils.getElementsByClassName('constructionIcon');
				var span0 = document.createElement('span');
				span0.className = 'constructionName';
				
				if (cons.snapshotLength > 0) {
					var offset = 0;
					if ( Utils.getElementsByClassName('smallplanet').snapshotLength > 5 ) 
						offset = -10;
				
					Utils.insertCSSRule('.constructionName { \
						font-size: 10px; \
						color: grey; \
						'+(offset?'position:relative; top:'+offset+'px;':'')+' \
					}');
				}
				
				for (var i=0; i<cons.snapshotLength; i++) {
					var item = cons.snapshotItem(i);
					var parent = item.parentNode;
					var title = item.title.replace('|','');
					var span = span0.cloneNode(false);
					span.innerHTML = title;
					parent.appendChild(span);
					parent.style.height = (parent.clientHeight + span.offsetHeight + offset)+'px';
				}
			} catch (e) { Utils.log(e) }
		},
		
		Show: function()
		{
			if (Utils.isCurrentPage('fleet1,resources,station,station-moon,research,shipyard,defense,techtree') )
				this.showBuildingNames();
				
			this.showResNames();
		}
		
	}

	
	// =======================================================================
	// functions for spy reports processing
	// =======================================================================

	var SpyReport = 
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
			this.metal = this.crystal = this.deuterium =
			this.plunder_metal = this.plunder_crystal = this.plunder_deuterium = 0;
			
			var cells = Utils.XPath('descendant::*[contains(@class,"fragment")]/descendant::TD', report);
			
			this.metal = this.readValue(cells.snapshotItem(1));
			this.crystal = this.readValue(cells.snapshotItem(3));
			this.deuterium = this.readValue(cells.snapshotItem(5));

			this.plunder_metal =  this.metal / 2;
			this.plunder_crystal = this.crystal / 2;
			this.plunder_deuterium = this.deuterium / 2;
		},
		
		calculateDebris: function(report)
		{
			try {
				this.debris_metal = this.debris_crystal = 0;
				
				var cells = Utils.XPath('descendant::*[@class="fleetdefbuildings spy"][position()=1 or position()=2]/descendant::*[@class="key"]', report);

				var ships = [];
				for (var i=0; i<cells.snapshotLength; i++) 
				{
					var cell = cells.snapshotItem(i);
					var cntNode  = cell.nextSibling;
					
					ships.push( {name:cell.innerHTML, count:this.readValue(cntNode) } );
				}

				var debris = Ogame.getFleetDebris(ships, true);
				this.debris_metal = debris.metal;
				this.debris_crystal = debris.crystal;
			} catch (e) { Utils.log(e) }

		},

		showPlunder: function (report)
		{
			var total = this.metal + this.crystal + this.deuterium;

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
			
			this.insertTable(report, SimpleTable);
		},

		showDebris: function (report)
		{
			var total = this.debris_metal + this.debris_crystal;
			if (!total) return;
			
			SimpleTable.init(Options.Interface.lbl_debris);
			SimpleTable.addCell(Options.Interface.lbl_metal, this.debris_metal);
			SimpleTable.addCell(Options.Interface.lbl_crystal, this.debris_crystal);
			SimpleTable.addCell(Options.Interface.lbl_total, total);
			SimpleTable.addCell(Options.Interface.lbl_shipRecyclerAlt, Math.ceil(total/20000));
			
			this.insertTable(report, SimpleTable);
		},

		addSimButton: function(report)
		{
			try {
				var dummy = document.createElement('td');
				dummy.className = 'dummy';
				
				var attack = Utils.getElementByClassName('attack', report);
				
				attack.parentNode.insertBefore(dummy, attack);
				Utils.insertAfter(dummy.cloneNode(false), attack);
				
				var sim = attack.cloneNode(false);
				sim.innerHTML = '<a class="buttonSave" href="javascript:void(0)"><span>'+ (Options.msg_addSimButton==1?'WebSim':'DragoSim')+'</span></a>';
				Utils.insertAfter(sim, attack);
				
				sim.addEventListener('click', function(e){ 
						SpyReport.submitToSim(e)
				}, false);
			} catch (e) { Utils.log(e) }
		},
		
		createWebSimForm: function()
		{
			function addTech(id, param) {
				if (Ogame.getTech(id) > -1) SpyReport.sim_form.action += '&'+param+'='+Ogame.getTech(id);
			}
			
			var lang = Utils.server_lang.toLowerCase();
			if (Utils.server_lang == 'HR') lang = 'ba';
			else if (Utils.server == 'US') lang = 'us';
			
			this.sim_form = document.createElement('form');
			this.sim_form.id = 'sim_form';
			this.sim_form.method = 'POST';
			this.sim_form.action = 'http://websim.speedsim.net/index.php?version=1&lang='+lang;

			// techs
			addTech(Ogame.TECH_WEAPONS, 'tech_a0_0');
			addTech(Ogame.TECH_SHIELD, 'tech_a0_1');
			addTech(Ogame.TECH_ARMOUR, 'tech_a0_2');

			// drives
			addTech(Ogame.TECH_COMB_DRIVE, 'engine0_0');
			addTech(Ogame.TECH_IMPULSE_DRIVE, 'engine0_1');
			addTech(Ogame.TECH_HYPER_DRIVE, 'engine0_2');

			//coords
			var coords = Ogame.getActiveCoords();
			if (coords)
				this.sim_form.action += '&start_pos='+coords.galaxy+':'+coords.system+':'+coords.planet;
				
			this.sim_form.action += '&perc-df='+Options.uni_DFPercent;
			
			this.sim_form.target = '_websim';
			this.sim_form.innerHTML = '<input type="hidden" id="sim_input" name="report" />';
			document.body.appendChild(this.sim_form);
		},
		
		createDragoSimForm: function()
		{
			function addParam(name, value) {
				return '<input type="hidden" name="'+name+'" value="'+value+'"/>';
			}
			
			function addTech(id, param) {
				if (Ogame.getTech(id) > -1) return addParam(param, Ogame.getTech(id));
			}

			var lang = 'english';
			
			if (Utils.server_lang == 'BA') lang = 'bosnian';
			else if (Utils.server_lang == 'BR') lang = 'brazilian';
			else if (Utils.server_lang == 'BG') lang = 'bulgarian';
			else if (Utils.server_lang == '') lang = 'catalan';
			else if (Utils.server_lang == 'CZ') lang = 'czech';
			else if (Utils.server_lang == 'DK') lang = 'danish';
			else if (Utils.server_lang == 'NL') lang = 'dutch';
			else if (Utils.server_lang == 'EN') lang = 'english';
			else if (Utils.server_lang == 'FR') lang = 'french';
			else if (Utils.server_lang == 'DE') lang = 'german';
			else if (Utils.server_lang == 'GR') lang = 'greek';
			else if (Utils.server_lang == 'HU') lang = 'hungarian';
			else if (Utils.server_lang == 'IT') lang = 'italian';
			else if (Utils.server_lang == 'KR') lang = 'korean';
			else if (Utils.server_lang == 'PL') lang = 'polish';
			else if (Utils.server_lang == 'PT') lang = 'portuguese';
			else if (Utils.server_lang == 'RO') lang = 'romanian';
			else if (Utils.server_lang == 'RU') lang = 'russian';
			else if (Utils.server_lang == 'SK') lang = 'slovak';
			else if (Utils.server_lang == 'ES') lang = 'spanish';
			else if (Utils.server_lang == 'SE') lang = 'swedish';
			else if (Utils.server_lang == 'TW') lang = 'taiwanese';
			else if (Utils.server_lang == 'TR') lang = 'turkish';
			
			this.sim_form = document.createElement('form');
			this.sim_form.id = 'sim_form';
			this.sim_form.method = 'POST';
			this.sim_form.action = 'http://drago-sim.com/';

			this.sim_form.target = '_dragosim';
			
			var html = addParam('lang', lang);
			
			// techs
			html += addTech(Ogame.TECH_WEAPONS, 'techs[0][0][w_t]');
			html += addTech(Ogame.TECH_SHIELD, 'techs[0][0][s_t]');
			html += addTech(Ogame.TECH_ARMOUR, 'techs[0][0][r_p]');
/*
			// drives
			addTech(Ogame.TECH_COMB_DRIVE, 'engine0_0');
			addTech(Ogame.TECH_IMPULSE_DRIVE, 'engine0_1');
			addTech(Ogame.TECH_HYPER_DRIVE, 'engine0_2');

			//coords
			var coords = Ogame.getActiveCoords();
			if (coords)
				this.sim_form.action += '&start_pos='+coords.galaxy+':'+coords.system+':'+coords.planet;*/
				
			html += addParam('debris_ratio', Options.uni_DFPercent/100 );
			
			html += '<input type="hidden" id="sim_input" name="scan" />';

			this.sim_form.innerHTML = html;
			document.body.appendChild(this.sim_form);
		},

		submitToSim: function(evt)
		{
			if (!this.sim_form) {
				if (Options.msg_addSimButton == 1)
					this.createWebSimForm();
				else if (Options.msg_addSimButton == 2)
					this.createDragoSimForm();
			}
			
			if (!this.sim_form) return;

			var report = evt.target
				.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
				.innerHTML.replace(/<[^>]+>|\n/g,'');
				
			document.getElementById('sim_input').value = (Options.msg_addSimButton == 1 ? encodeURI(report) : report);
			this.sim_form.submit();
		},
		
		insertCSSRules: function()
		{
			Utils.insertCSSRule(".plkey { width: 30% }");
			Utils.insertCSSRule(".plvalue { width: 20% }");
			Utils.insertCSSRule(".plunder { border: 1px solid grey !important; }");
			Utils.insertCSSRule("table.plunder { border-collapse: collapse; }");
			Utils.insertCSSRule(".plkey, .plvalue { padding: 5px !important; }");
			
			Utils.insertCSSRule(".dummy { width: 33% !important; }");
		},
		
		Show: function()
		{
			//this.insertCSSRules();
			
			var container;
			if ( Utils.isCurrentPage('showmessage') ) {
				container = document.getElementById("messagebox");
			} else {
				container = document.getElementById("messageContent");
			}

			var rows = Utils.getElementsByClassName('material spy', container);

			for (var i=0; i<rows.snapshotLength; i++) {
				var report = rows.snapshotItem(i).parentNode;

				this.calculatePlunder(report);
				this.calculateDebris(report);
				
				if (Options.msg_PlunderThreshold && Utils.isCurrentPage('messages') ) {
					var total_pl = this.plunder_metal + this.plunder_crystal + this.plunder_deuterium;
					var total_df = this.debris_metal + this.debris_crystal;
					if (total_pl < Options.msg_PlunderThreshold*1000 && total_df < Options.msg_DebrisThreshold*1000)
						document.getElementById( report.parentNode.parentNode.id.replace('spioDetails_','')+'TR' ).className += ' smallplunder';
				}
				
				if (Options.msg_showPlunder) {
					this.showPlunder(report);
					this.showDebris(report);
				}
				
				if (Options.msg_addSimButton) {
					this.addSimButton(report);
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
			
			var form = Utils.XPathSingle('//FORM[@name="delMsg"]');
			form.parentNode.insertBefore(span, form);
			
			var $ = Utils.$;
			Utils.insertAfter( $('.msgButtons').clone(true).get(0), form);
			$('.msgButtons input').click(Messages.onButtonClick);
			
			$('.selectContainer')
				.clone(true)
				.prependTo('#messageContent')
				.css({width:'160px',position:'absolute',right:'20px',fontSize:'11px'})
				.find('div').eq(0)
					.css('float','left');
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
		
		changeTimes: function()
		{
			if (Utils.isCurrentPage('messages'))
			{
				DateTime.changeNodesTime(
					'//*[@id="mailz"]/TBODY/TR[contains(@class,"entry")]/*[@class="date"]',
					'[d].[m].[Y] [H]:[i]:[s]' );
					
				DateTime.changeNodesTime(
					'//*[@id="mailz"]/TBODY/TR[contains(@id,"spioDetails")]/descendant::*[@class="material spy"]/TBODY/TR/TH',
					'[m]-[d] [H]:[i]:[s]' );
			}

			else if (Utils.isCurrentPage('showmessage'))
			{
				DateTime.changeNodesTime(
					'//*[contains(@class,"infohead")]/TABLE/TBODY/TR[last()]/TD | '+
					'//*[@id="battlereport"]/P',
					'[d].[m].[Y] [H]:[i]:[s]' );

				DateTime.changeNodesTime(
					'//*[@class="material spy"]/TBODY/TR/TH',
					'[m]-[d] [H]:[i]:[s]' );
			}

		},
		
		onDOMNodeInserted: function(e)
		{
			if(!e || !e.target || e.target.tagName != 'FORM' || e.target.name != 'delMsg') return;
			Messages.Show();

		},

		Show: function()
		{
			try {
				var need_plunder = false;
				if ( Utils.isCurrentPage('messages') && Options.msg_PlunderThreshold && (Options.msg_foldSmallPlunder || Options.msg_addButtons) )
					need_plunder = true;
					
				if (Options.msg_showPlunder || need_plunder || Options.msg_addSimButton) {
					SpyReport.Show();
				}
				
				if (Options.timeSetting == 1) {
					Messages.changeTimes();
				}
				
				if ( Utils.isCurrentPage('messages') && Options.msg_PlunderThreshold && Options.msg_foldSmallPlunder)
					setTimeout( function() { Utils.$('.smallplunder .subject a').trigger('click') }, 0);

				if ( Options.msg_addButtons && Utils.isCurrentPage('messages') ) {
					Messages.addButtons();
				}
				
				if ( Utils.isCurrentPage('showmessage') ) {
					var span = Utils.XPathSingle('//DIV[@class="note"]/SPAN[contains(@class,"tips") and @title]');
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
			
			SpyReport.insertCSSRules();

		},

		Run: function()
		{
			this.insertCSSRules();
			
			if ( Utils.isCurrentPage('messages') ) {
				document.getElementById('section2').addEventListener('DOMNodeInserted', this.onDOMNodeInserted, false);
				
				// workaround for Opera
				if (Utils.XPathSingle('//FORM[@name="delMsg"]'))
					this.Show();
				
				if (Options.msg_killTips)
					Utils.unsafeWindow.initCluetip = function(){};
			}
			else
				this.Show();
		}

	}
	
	var Misc = 
	{
		scrollTitle: function() {
			document.body.setAttribute('original_title', document.title);

			var scroller = {};
			scroller.title = document.title;
			scroller.index = 0;
			
			var counter = document.getElementById('tempcounter');
			var content = document.getElementById('eventContent');
			var blank = document.getElementById('eventboxBlank');
			
			scroller.run = function (){

				if (blank.offsetHeight) {
					document.title = this.title;
					return;
				}
					
				if (content && counter && counter.offsetHeight) {
					var t = this.title + ': '
						+ counter.innerHTML + ' ' 
						+ content.innerHTML + ' ';
						
					t = t.substr(this.index) + t.substr(0, this.index);
					this.index = (this.index+1) % t.length;
					document.title = t;
				}
				else
					document.title = this.title;
					
				setTimeout(function(){scroller.run()}, 200);
			}

			setTimeout(function(){scroller.run()}, 200);
		}
	}
	
	
	var Network =
	{
		/*showMemberScores: function()
		{
			try {
				var items = Utils.XPath('//*[@class="member_score"]/SPAN');
				for (var i=0; i<items.snapshotLength; i++) {
					var item = items.snapshotItem(i);
					var scores = Utils.parseInt(item.title);
					item.innerHTML += ' (' + Utils.formatNumber(scores) + ')';
				}
			} catch (e) { Utils.log(e) }
		},*/
		
		onDOMNodeInserted: function(e)
		{
			if(!e || !e.target || e.target.id != "allyMemberlist") return;
			Network.Show();
		},

		
		Show: function() {
			var list = document.getElementById('link12');
			if(!list || list.rel != "allyMemberlist") { Utils.log("Error => Network.Show() => The element \"link12\" is missing or it have a different rel."); return; }

			if (list.className == 'closed')
				Utils.trigger(list,'click');
				
			//this.showMemberScores();
		},
		
		Run: function()
		{
			// Invoke now if the element already exist
			if(document.getElementById("allyMemberlist"))
				this.Show();

			var eins = document.getElementById("eins");
			if(!eins) { Utils.log("Error => Network.Run() => The element \"eins\" is missing."); return; }

			// Invoked on page loading (not always) and also when you click on buttons
			eins.addEventListener("DOMNodeInserted", this.onDOMNodeInserted, false);

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
		res_container: null,
		
		addResButtons: function()
		{
			Utils.$('<input>')
				.attr('class','buttonOK')
				.attr({type:'button', value:'0%', ref:'0'})
				.click(function(){Utils.$('select').val(this.getAttribute('ref'))})
				.appendTo('.factorbutton')
				.clone(true)
				.attr({value:'100%', ref:'100'})
				.appendTo('.factorbutton')
			;
		},
		
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

				container = Utils.XPathSingle('//*[@id="detail"]/DIV[@class="pic"]');
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
				var id = document.getElementsByName('type')[0];
				if (!id) return;
				id = parseInt(id.value,10);
				
				var level = Utils.XPathSingle('//*[@ref="'+id+'"]/descendant::*[@class="level"]');
				if (!level) return;
				level = Utils.parseInt(level.lastChild.nodeValue);

				var str, oldvalue, newvalue;
				var $ = Utils.$;
				
				// energy consumption
				var spareEnergy = Utils.getIntById('resources_energy');
				var energy = $('#action ul li')
					.filter( function(){return $(this).html().indexOf( Options.Labels.lbl_RequiredEnergy ) >- 1 } )
					.find('.time')
				;
				var missingEnergy = spareEnergy - Utils.parseInt( energy.html() );
				
				var sats = Math.ceil( -missingEnergy / Ogame.getProduction(212,0) );
				str = (sats>0) ? '<span>('+sats+' '+Options.Interface.lbl_shipSatelliteAlt+')</span>' : '';
				
				energy.after( Utils.addSpanMark(missingEnergy) + str );
				
				str = '';

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
				if (id != 212 && (newvalue || isNaN(newvalue) ) ) {
					str = '<li>'+Options.Interface.lbl_Production + ': <span class="time">'+Utils.formatNumber(newvalue)+'</span> '
						+ Utils.addSpanMark(newvalue-oldvalue)+'</li>';
					
					$('#action ul').append(str);
				}
				
				// storage capacity
				oldvalue = Ogame.getStorageCapacity(id,level);
				newvalue = Ogame.getStorageCapacity(id,level+1);
				if (newvalue)
				{
					var element = $('#description div.display div').get(0);
					if(element)
					{
						var label = element.firstChild.nodeValue;
						str = '<li>'+label+' <span class="time">'+Utils.formatNumber(newvalue)+'</span> '
							+ Utils.addSpanMark(newvalue-oldvalue)+'</li>';
						
						$('#action ul').append(str);
						$('.techtree').css('display','none');
					}
					else
						Utils.log("Error => Missing element in Resources.showProduction()");
				}

				
				// if at least 1 line was appended - increase size of the container
				if (str) $('#action ul').css('padding-top', '0');
				
			} catch (e) { Utils.log(e) }
			
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

		Resources_insertCSSRules: function()
		{
			var width = 151;
			Utils.insertCSSRule(
			'.antires {\
				margin: 2px !important;\
				padding: 4px !important;\
				display: block;\
				width: '+width+'px !important;\
				height: auto !important;\
				float: left !important;\
				background: #0D1014 !important;\
				border: 1px solid #606060 !important;\
				text-align: center !important;\
				font-size: 10px !important;\
				list-style: none outside !important; \
				}');
				
				/*				' +	((Options.showResources == 1) ? 'margin-left: -40px;' : '') + ' \ */
				
			Utils.insertCSSRule(
			'.finishtime {\
				color: green;\
				}');
				
			Utils.insertCSSRule(
			'#links {\
				overflow: visible;\
				}');
				
			if (Options.showResources == 2)	{
				Utils.insertCSSRule(
				'#links {\
					position: relative;\
					}');
					
				Utils.insertCSSRule(
				'#antires_cont {\
					position: absolute;\
					top: 0; \
					left: -171px; \
					width: '+(width+13)+'px;\
					}');
			}
			
		},
		
		Resources_createContainer: function(ul)
		{
			/*$('#links').css('position','relative');
			$('<ul></ul>').attr('id','ttt').appendTo('#links');
			$('.antires').appendTo('#ttt');
			$('#ttt').css({'position':'absolute','top':'0','left':'-135px'});
			*/
			if (Options.showResources == 1) {
				var box = document.getElementById('box');
				if (box) box.style.paddingBottom='0';
				this.res_container = document.getElementById('menuTable');
			}
			else if (Options.showResources == 2) {
				var links = document.getElementById('links');
				if (links) {
					this.res_container = document.createElement('ul');
					this.res_container.id = 'antires_cont';
					links.appendChild(this.res_container);
				}
				
			}
		},
		
		Resources_append: function(node)
		{
			if (!this.res_container)
				this.Resources_createContainer();
				
			if (this.res_container)
				this.res_container.appendChild(node);
		},
		
		Resources_Run: function()
		{
			if ( !document.getElementById('metal_box') ) return;
			this.Resources_insertCSSRules();
			
			
			for (var i=0; i<this.res_array.length; i++)
			{
				var res = this.res_array[i];
				var ticker_name = 'resourceTicker'+this.res_array_firstcap[i];
				var ticker_id = 'antires_'+res;
				
				var node = document.createElement('li');
				node.className = 'antires';
				
				var html = document.getElementById(res+'_box').title;
				html = html.replace('|','');
				
				var rx = new RegExp('([\\d\\'+Utils.separator+']+)\\/','gi');
				
				html = html.replace(rx, '<span id="'+ticker_id+'">$1</span> / ');
				node.innerHTML = html;
				this.Resources_append(node);

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
					
					setTimeout(script, 0);
				}

			}
		}
	}
	
	var Buildings = 
	{
		showRange: function(id) {
			var spanInfo = Utils.getElementByClassName('solarSatEnergyInfo');
			if (!spanInfo) return;
			
			var range = Utils.parseInt(spanInfo.innerHTML);
			var coords = Ogame.getActiveCoords();
			if (!coords || !range) return;
			
			var system1 = coords.system-range;
			var system2 = coords.system+range;

			if (Utils.page != 'defense') {
				system1++;
				system2--;
			}
			
			system1 = Math.max(system1, 1);
			system2 = Math.min(system2, 499);
			
			range = ' <span class="antigame_range">('+coords.galaxy+':'+system1+' - '+coords.galaxy+':'+system2+')</span>';
			spanInfo.innerHTML += range;
			
		},
		
		Show: function(e)
		{
			if (!e || !e.target || e.target.id != 'content') return;
			
			if (Options.showDeficient)
				Resources.showMissing();
			
			if (Utils.isCurrentPage('resources'))
				Resources.showProduction();
				
			var id = document.getElementsByName('type')[0];
			if (id) id = parseInt(id.value,10);
				
			// phalax and IPM range
			if (id == 42 || id == 503)
				this.showRange(id);
				
			Names.showBuildingResNames();
		},
		
		
		Run: function()
		{
			if (Options.showDeficient)
				Resources.Missing_insertCSSRules();
			
			var planet = document.getElementById("planet");
			if(!planet) { Utils.log("Error => Buildings.Run() => The element \"planet\" is missing."); return; }

			planet.addEventListener('DOMNodeInserted', function(e){ setTimeout(function(){ Buildings.Show(e); }, 0); }, false);
		}
	}
	
	var Stats = {
		highlightAllyPlayer: function(row)
		{
			function parseAlly(name) {
				var res;
				if (name) {
					res = name.match(/\[(.+)\]/i);
					if (res) res = res[1];
				}
				return res;
			}

			Colorer.highlight(Colorer.PLAYER, 'descendant::*[@class="name"]/A', row);
			Colorer.highlight(Colorer.ALLY, 'descendant::*[@class="ally-tag"]/A', row, parseAlly);
		},
		
		showStatsDifs: function(row)
		{
			stats = Utils.XPathSingle('descendant::*[@class="overmark" or @class="undermark"][@title]', row);
			if (stats) stats.innerHTML = stats.getAttribute ("title");
		},
		
		onDOMNodeInserted: function(e)
		{
			if(!e || !e.relatedNode || !e.target || e.relatedNode.id != "statisticsContent" || e.target.className != "content") return;
			Stats.Show();
		},

		
		Show: function()
		{
			try {
				var paging = document.getElementById('paging').cloneNode(true);
				Utils.insertAfter( paging, document.getElementById('row') );
			} catch (e) { Utils.log(e) }
				
			var rows = document.getElementById('ranks').getElementsByTagName('tr');
			for (var i=0; i<rows.length; i++) {
				this.highlightAllyPlayer(rows[i]);
			}
		},

		Run: function()
		{
			// Invoke now if the element already exist
			var send = document.getElementById('send');
			if(send && send.parentNode.className == "content")
				this.Show();

			var statisticsContent = document.getElementById("statisticsContent");
			if(!statisticsContent) { Utils.log("Error => Stats.Run() => The element \"statisticsContent\" is missing."); return; }

			// Invoked on page loading (not always) and also when you click on buttons
			statisticsContent.addEventListener("DOMNodeInserted", this.onDOMNodeInserted, false);

		}
	}
	

	try	{
		// REMINDER: these objects should be initialized strictly in the following order:
		// Utils, Options, DateTime
		Utils.Init();
		Options.loadOptions();
			
		// if not ogame page = just init coordinates processing
		if ( ! Utils.ogame ) {
			
			if ( Options.autocopyCoords && Options.autocopyGlobal ) {
				Coords.Init();
			}
			
			return;
		}

		
		// checking whether we have redesign at this server
		if (!Utils.checkRedesign()) return;

		Options.Init();
		DateTime.Init();
		Ogame.Init();
		
		if (Options.autocopyCoords)	Coords.Init();


		if (Utils.isFirefox && Options.update_check && Utils.isCurrentPage('overview'))
			Options.checkUpdate();
		

		if (Options.blockAutoComplete && !Utils.isCurrentPage('movement')) {
			Utils.blockAutocomplete();
		}
		
		if (Utils.isCurrentPage('research'))
			Ogame.readTechs();
			
		if ( Utils.isCurrentPage('statistics,galaxy') )
			Colorer.Init();
			
		if ( Options.showNames )
			Names.Show();
			
		if (Options.showConstructionTitle)
				Names.showPlanetConstruction();
				
		
		if (Options.timeSetting == 1) {
			// vac. mode toooltip
			DateTime.changeNodesTime('//*[@id="advice-bar"]/A', '[d].[m].[Y] [H]:[i]:[s]', 'title');
		}
			
		if ( !Utils.isCurrentPage('fleet2,fleet3') )
			Calculator.reset();
			
		if (Options.showPageStartTime) DateTime.showPageStartTime();
		
		if (Options.shortHeader && Utils.getElementByClassName('toggleHeader') && document.getElementById('planet').className != 'shortHeader') {	
			Utils.$('a.toggleHeader').trigger('click');
		}

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
		else if ( Utils.isCurrentPage('eventlist,phalanx') ) {
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
		else if ( Utils.isCurrentPage('alliance') ) {
			Network.Run();
		}
		else if ( Utils.isCurrentPage('statistics') ) {
			Stats.Run();
		}
		else if ( Utils.isCurrentPage('overview,resources,shipyard,station,station-moon,defense') ) {
			if (Options.showFinishTime) FinishTime.ShowConstructions();
		}
		else if ( Utils.isCurrentPage('resourceSettings') ) {
			Resources.addResButtons();
		}

		if ( Utils.isCurrentPage('overview') && Options.showEventList )	
			EventList.showEventList();
		
		if ( Utils.isCurrentPage('resources,station,station-moon,research,shipyard,defense') )
			Buildings.Run();
			
		if ( Utils.isCurrentPage('jumpgatelayer') )
			Jumpgate.Run();
			
		if ( Options.showResources )
			Resources.Resources_Run();
			
		if (Options.misc_scrollTitle && ! Utils.isCurrentPage('showmessage,eventlist, phalanx') )
			Misc.scrollTitle();
		
	}
	catch (e) { 
		Utils.log(e);
	}
	
} // AntigameFunc

if (window.navigator.userAgent.indexOf('Chrome') > -1 && window.google)
	document.location.href = 'javascript:('+AntigameFunc+')();void(0);';
else
	AntigameFunc();