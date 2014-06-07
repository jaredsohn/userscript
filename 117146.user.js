// ==UserScript==
// @name           AntiGameOriginMOD
// @namespace      okon3
// @description    A couple of Neogame functions for Ogame Redesign - v1.43.6 Works with Localhost (OA)
// @version	1.43.6
// @include        http://*/game/index.php?page=*
// ==/UserScript==

//PER VEDERE LE MODIFICHE BASTA CERCARE "MODIFICA"

/*
Minimal browser: FF 3.5, Opera 10.5, Chrome 5, Safari ?

Ongoing changes:

- showAllyRank need many changes bec. 3.0

//##### 2.x   
- Old code for 2.x - can be removed

//##### OPERA

//##### RUNSCRIPT

//##### TRIGGER
- Started to replace Utils.trigger with jquery functions.


//##### IFRAME

- Renew iframe handling - check all related functions

- Messageboxes, espionage reports ....
- Fleet dispatch
- Antigame settings in general
*/

/*
ToDo / Problems:
//##### Cleanup RIP

- Fleetdispatch Page 2 - Error: Greasemonkey access violation: unsafeWindow cannot call GM_getValue. since long time

//##### 1.32.7
//##### Cleanup
*/

/*
Recent changes:
18.12.2011 v1.43.6
* Ogame 2.3: Fixed ranks in galaxy view - Last version for Ogame 2

16.12.2011 v1.43.4
* Galaxy view: Fixed link to alliancehighscore
* Fixed broken coords copy from other pages.

15.12.2011 v1.43.2
* Fixed syntax error (causes problems for some user)

15.12.2011 v1.43.0
+ Added JP translation
* Galaxy view: Fixed link to playerhighscore
* Antigame settings: Merged Eventlists and Fleet movement section into Fleet lists - Now all is in one place.
* Antigame settings: Merged Universe into General section
+ Added a few new language variables, marked with // New 1.43.0
* Removed old code #2 

*/
function AntigameFunc()
{

	// Line 4 in Chrome  Error 1727 = 700 line here
	// =======================================================================
	// Global parameter / objects
	// =======================================================================
	
	var version = '1.43.6';
	
	var mywindow = ((typeof unsafeWindow) != "undefined") ? unsafeWindow : window;
	if (mywindow.AntiGame_started) { return; }
	mywindow.AntiGame_started = 1;
	
	
	var isOpera = (window.opera) ? true : false;
	var isFirefox = (window.navigator.userAgent.indexOf('Firefox') > -1 ) ? true : false;
	var isChrome = (window.navigator.userAgent.indexOf('Chrome') > -1 ) ? true : false;
	var isIframe = (top === self) ? false : true;

	var isGM = (typeof GM_getResourceURL == 'function');
	var isStorage = (window.localStorage) ? true : false;
	
	var AntiGame_lang = {};

	// =======================================================================
	// Parameter
	// =======================================================================
	var Para =
	{

		version: version,
		testVersion: (version.charAt(version.length-1) % 2 == 0) ? false : true,
		langVersion: 2,
		scriptName: 'AntiGame',
		scriptURL: 'http://userscripts.org/scripts/show/116819',
		scriptUpdateURL: 'http://userscripts.org/scripts/source/116819.user.js',
		scriptVersionURL: 'http://tools.francolino.de/antigame/version.php',

		versionLabels: 2,
		versionMissionLabels: 3,
		versionTechs: 2,

		
		Init: function()
		{
		
			this.ogame_version = Menu.getVersion( Utils.getMetatag('ogame-version', '')); // 30 . 000 . 01   - 3000000
	
			this.uni_SpeedFactor = N( Utils.getMetatag('ogame-universe-speed', 1));
	
		},
		
		
		coms: {
			// def_lang: Default language to complete selected language - Use only complete ones !! EN DE PT ES FR RU HR
			// wsim   : URL parameter for websim (default en)
			// dsim   : URL parameter for dragosim (default english)
			// osim   : URL parameter for Osimulate (default en)
			EN: {domain: '',				def_lang: '',	wsim: 'en',	osim: 'en',	dsim: '',			lang_Name: 'English',				fn_Label: LabelsEN,	fn_Inter: InterfaceEN},

			AE: {domain: 'AE.OGAME.ORG/',	def_lang: 'FR',	wsim: 'en',	osim: 'ae',	dsim: ''},
			AR: {domain: 'AR.OGAME.ORG/',	def_lang: 'ES',	wsim: 'sp',	osim: 'ar',	dsim: 'spanish',										fn_Label: LabelsES,	fn_Inter: InterfaceES},
			BA: {domain: 'BA.OGAME.ORG/',	def_lang: 'HR', wsim: 'ba',	osim: 'hr',	dsim: 'bosnian',	lang_Name: 'Bosnian',				fn_Label: LabelsBA,	fn_Inter: InterfaceBA},
			BR: {domain: 'OGAME.COM.BR/',	def_lang: 'PT', wsim: 'pt',	osim: 'br',	dsim: 'brazilian',	lang_Name: 'Português do Brasil',	fn_Label: LabelsBR,	fn_Inter: InterfacePT},
			CZ: {domain: 'OGAME.CZ/',		def_lang: 'EN', wsim: 'cz',	osim: 'cz',	dsim: 'czech',		lang_Name: 'Čeština',				fn_Label: LabelsCZ,	fn_Inter: InterfaceCZ},
			DE: {domain: 'OGAME.DE/',		def_lang: '',	wsim: 'de',	osim: 'de',	dsim: 'german',		lang_Name: 'Deutsch',				fn_Label: LabelsDE,	fn_Inter: InterfaceDE},
			DK: {domain: 'OGAME.DK/',		def_lang: '',	wsim: 'dk',	osim: 'dk',	dsim: 'danish',		lang_Name: 'Dansk',					fn_Label: LabelsDK,	fn_Inter: InterfaceDK},
			ES: {domain: 'OGAME.COM.ES/',	def_lang: '',	wsim: 'sp',	osim: 'es',	dsim: 'spanish',	lang_Name: 'Español',				fn_Label: LabelsES,	fn_Inter: InterfaceES},
			FI: {domain: 'FI.OGAME.ORG/',	def_lang: 'EN',	wsim: 'fi',	osim: 'fi',	dsim: ''},
			FR: {domain: 'OGAME.FR/',		def_lang: '',	wsim: 'fr',	osim: 'fr',	dsim: 'french',		lang_Name: 'Français',				fn_Label: LabelsFR,	fn_Inter: InterfaceFR},
			GR: {domain: 'OGAME.GR/',		def_lang: '',	wsim: 'gr',	osim: 'gr',	dsim: 'greek',		lang_Name: 'Ελληνικά',				fn_Label: LabelsGR,	fn_Inter: InterfaceGR},
			HR: {domain: 'OGAME.COM.HR/',	def_lang: '',	wsim: 'ba',	osim: 'hr',	dsim: '',			lang_Name: 'Hrvatski',				fn_Label: LabelsHR,	fn_Inter: InterfaceHR},
			HU: {domain: 'OGAME.HU/',		def_lang: 'EN',	wsim: 'hu',	osim: 'hu',	dsim: 'hungarian'},
			IT: {domain: 'OGAME.IT/',		def_lang: '',	wsim: 'it',	osim: 'it',	dsim: 'italian',	lang_Name: 'Italiano',				fn_Label: LabelsIT,	fn_Inter: InterfaceIT},
			JP: {domain: 'OGAME.JP/',		def_lang: 'EN',	wsim: 'jp',	osim: 'jp',	dsim: '',			lang_Name: '日本語',					fn_Label: LabelsJP,	fn_Inter: InterfaceJP},
			MX: {domain: 'MX.OGAME.ORG/',	def_lang: '',	wsim: 'sp',	osim: 'mx',	dsim: 'spanish',										fn_Label: LabelsES,	fn_Inter: InterfaceES},
			NL: {domain: 'OGAME.NL/',		def_lang: 'EN',	wsim: 'nl',	osim: 'nl',	dsim: 'dutch',		lang_Name: 'Dutch',					fn_Label: LabelsNL,	fn_Inter: InterfaceNL},
			NO: {domain: 'OGAME.NO/',		def_lang: '',	wsim: 'no',	osim: 'no',	dsim: '',			lang_Name: 'Norsk',					fn_Label: LabelsNO,	fn_Inter: InterfaceNO},
			PL: {domain: 'OGAME.PL/',		def_lang: '',	wsim: 'pl',	osim: 'pl',	dsim: 'polish',		lang_Name: 'Polski',				fn_Label: LabelsPL,	fn_Inter: InterfacePL},
			PT: {domain: 'OGAME.COM.PT/',	def_lang: '',	wsim: 'pt',	osim: 'pt',	dsim: 'portuguese',	lang_Name: 'Português',				fn_Label: LabelsPT,	fn_Inter: InterfacePT},
			RO: {domain: 'OGAME.RO/',		def_lang: '',	wsim: 'ro',	osim: 'ro',	dsim: 'romanian',	lang_Name: 'Romana',				fn_Label: LabelsRO,	fn_Inter: InterfaceRO},
			RU: {domain: 'OGAME.RU/',		def_lang: '',	wsim: 'ru',	osim: 'ru',	dsim: 'russian',	lang_Name: 'Русский',				fn_Label: LabelsRU,	fn_Inter: InterfaceRU},
			SE: {domain: 'OGAME.SE/',		def_lang: 'EN', wsim: 'sv',	osim: 'se',	dsim: 'swedish'},
			SI: {domain: 'OGAME.SI/',		def_lang: 'EN', wsim: 'si',	osim: 'si',	dsim: ''},
			SK: {domain: 'OGAME.SK/',		def_lang: '',	wsim: 'sk',	osim: 'sk',	dsim: 'slovak',		lang_Name: 'Slovenčina',			fn_Label: LabelsSK,	fn_Inter: InterfaceSK},
			TR: {domain: 'OGAME.COM.TR/',	def_lang: 'EN',	wsim: 'tr',	osim: 'tr',	dsim: 'turkish'},
			TW: {domain: 'OGAME.TW/',		def_lang: 'EN',	wsim: 'tw',	osim: 'tw',	dsim: 'taiwanese'},
			US: {domain: 'OGAME.US/',		def_lang: '',	wsim: 'en',	osim: 'us',	dsim: '',												fn_Label: LabelsEN,	fn_Inter: InterfaceEN},
			ORG:{domain: 'OGAME.ORG/',		def_lang: '',	wsim: 'en',	osim: 'en',	dsim: '',												fn_Label: LabelsEN,	fn_Inter: InterfaceEN}
		},

		storageCapacity: [ 10, 20, 40, 75, 140, 255, 470, 865, 1590, 2920, 5355, 9820, 18005, 33005, 60510, 110925, 203350, 372785, 683385, 1297589, 2296600, 4210115, 7717970, 14148545, 25937050],

		speedColors: ['F00', 'F30', 'F60', 'F90', 'FC0', 'FF0' ,'CF0' ,'9F0' ,'6F0', '3F0', '0F0']
		
	};







	// =======================================================================
	// Main
	// =======================================================================

	function Main()
	{
		try	{

			// Check supported browser
			if ( !JSON || ( !isGM && !isStorage)) {	return; }

			Para.Init();
			Utils.Init();
			Options.loadOptions();

			// if not ogame page = just init coordinates processing
			if ( ! Utils.ogame ) {
				if ( Options.autocopyCoords && Options.autocopyGlobal ) { Coords.Init(); }
				return;
			}

			// checking whether we have redesign at this server
			if (! (Utils.$ || Utils.isCurrentPage('showmessage'))) {return; }

			Options.Init();
			Lang.Init();

			Menu.Init();
			DateTime.Init();
			Ogame.Init();

			if (Options.autocopyCoords) {
				Coords.Init();
			}
			if (isGM && Options.update_check ) {
				Menu.checkUpdate();
			}
			if (Options.blockAutoComplete && !Utils.isCurrentPage('movement')) {
				Utils.blockAutocomplete();
			}
			if (Utils.isCurrentPage('research')) {
				Ogame.readTechs();
			}
			if ( Utils.isCurrentPage('statistics,galaxy') ) {
				Colorer.Init();
			}
			if ( Options.showNames ) {
				Names.Show();
			}
			if (Options.showConstructionTitle) {
				Names.showPlanetConstruction();
			}
			if (Options.timeSetting == 1) {	// vac. mode toooltip
				DateTime.changeNodesTime('//*[@id="advice-bar"]/A', '[d].[m].[Y] [H]:[i]:[s]', 'title');
			}
			if ( !Utils.isCurrentPage('fleet2,fleet3') ) {
				Calculator.reset();
			}
			if (Options.showPageStartTime) {
				DateTime.showPageStartTime();
			}
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
				Lang.readMissionLabels('read');
				FleetSend.Fleet3_Run();
			}
			else if ( Utils.isCurrentPage('galaxy') ) {
				Galaxy.Run();
			}
			else if ( Utils.isCurrentPage('movement') ) {
				FleetMovement.Run();
			}
			else if ( Utils.isCurrentPage('phalanx') ) {
				EventList.Run();
			}
			else if ( Utils.isCurrentPage('showmessage,messages') ) {
				Messages.Run();
			}
			else if ( Utils.isCurrentPage('alliance') ) {
				Network.Run();
			}
			else if ( Utils.isCurrentPage('statistics') ) {
				Stats.Run();
			}
			else if ( Utils.isCurrentPage('overview,resources,shipyard,station,station-moon,defense') ) {
				if (Options.showFinishTime) { FinishTime.ShowConstructions(); }
			}
			else if ( Utils.isCurrentPage('resourceSettings') ) {
				Resources.addResButtons();
			}

			EventList2.Run();

			if ( Utils.isCurrentPage('resources,station,station-moon,research,shipyard,defense') ) {
				Buildings.Run();
			}
			if ( Utils.isCurrentPage('jumpgatelayer') ) {
				Jumpgate.Run();
			}
			if ( Options.showResources ) {
				Resources.Resources_Run();
			}
			if (Options.misc_scrollTitle && ! Utils.isCurrentPage('showmessage,eventlist, phalanx') ) {
				Misc.scrollTitle();
			}

		} catch (e) { Utils.log(e); }
	}









	// =======================================================================
	// Options functions
	// =======================================================================

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
		uni_SpeedFactor: 1,
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
		evt_dimReverse: true,
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

		// Galaxy
		galaxyShowRank: true,
		galaxyShowAllyRank: true,
		galaxyRankColor: '#DDDDDD',

		// galaxyRank0: '#305060',		 // not needed
		galaxyRank10: '#FFFF40',
		galaxyRank50: '#FFDF00',
		galaxyRank100: '#FFBF00',
		galaxyRank200: '#FF8F00',
		galaxyRank800: '#33FF33',

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
		msg_expandBox: 0,
		msg_killTips: false,
		msg_addButtons: true,
		msg_EspionageLayout: false,
		msg_EspionageSpace: 0,
		msg_PlunderThreshold: 10,
		msg_DebrisThreshold: 20,
		msg_foldSmallPlunder: true,
		msg_showPlunder: true,
		msg_addSimButton: 3,
		msg_fixColors: true,

		// Fleet Dispatch
		fleet1_Layout: false,
		fleet_showCapacity: true,
		fleet1_showResCalc: true,
		uni_maxPlayerScore: false,
		fleet1_killTips: false,
		fleet2_Layout: true,
		//fleet2_fixLayout: true, // removed in 1.43.0
		autocopyCoords: false,
		autocopyGlobal: false,
		fleet2_setTargetDF: false,
		fleet2_ShortLinks: "",
		fleet2_MoonColor: "#0000FF",
		fleet2_MoonsToEnd: false,
		fleet2_expandLists: true,
		fleet2_expandMoonColor: true,
		fleet2_checkProbeCapacity: true,
		fleet3_Layout: true,
		// 1 - attack		2 - federation	3 - transport	4 - deploy	5 - hold	6 - espionage
		// 7 - colonization	8 - recycle		9 - destroy		15 - expedition
		mission1: 6,
		mission2: 1,
		mission3: 4,
		mission4: 3,
		mission5: 9,

		uni_options:
		{
			fleet2_ShortLinks:1, galaxyDebrisMin:1, msg_PlunderThreshold:1, msg_DebrisThreshold:1,
			galaxy_Players:1, galaxy_PlayerColors:1, galaxy_Allys:1, galaxy_AllyColors:1,
			uni_SpeedFactor:1, uni_DFPercent:1, uni_DefenseToDF:1, uni_maxPlayerScore:1
		},

		// =======================================================================

		Init: function()
		{

			//##### Cleanup - to Ogame  - it's not longer an option
		//	this.uni_SpeedFactor = N( Para.getMetatag('ogame-universe-speed', 1));

			//this.loadOptions();
		},

		saveOptions: function()
		{

			try {
				var str = '';
				var str_uni = '';

				for (var i in Options) {
					var param = Options[i];

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

				if (isGM){
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

				if (!str) return;

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
		}
	};



	// =======================================================================
	// Language
	// =======================================================================

	var Lang =
	{

		Labels: {}, //null,
		Interface: {}, //null,

		Init: function()
		{

			if (!Options.language) Options.language = Utils.server;

			var external_langpack = Utils.unsafeWindow.AntiGame_lang;
			if (external_langpack)
			{

				for (var i in external_langpack) {

					AntiGame_lang[i] = external_langpack[i];
					var str = i.toString().match(/^Interface([A-Z]{2,3})$/);
					if (str && str[1] != 'EN') {
						if (AntiGame_lang[i].version > 0) {
							if (!Para.coms[str[1]]) Para.coms[str[1]] = {};
							Para.coms[str[1]].lang_Name = AntiGame_lang[i].languageName;
							Para.coms[str[1]].def_lang = 'EN';
						}
					}
				}

				if (AntiGame_lang['Labels'+Utils.server]) {
					Lang.Labels = AntiGame_lang['Labels'+Utils.server];
				}

				if (AntiGame_lang['Interface'+Options.language]) {
					Lang.Interface = AntiGame_lang['Interface'+Options.language];
				}
			}


            if (Para.coms[Utils.server].fn_Label && !Lang.Labels.version)
				Lang.Labels = Para.coms[Utils.server].fn_Label();

			if (Para.coms[Utils.server].def_lang != '')
				this.copyMissingProperties(Para.coms[ Para.coms[Utils.server].def_lang ].fn_Label(), Lang, 'Labels');

			Lang.readLabels();
			Lang.readResLabels();
			// Don't overwrite existing labels - As long as matching mission depends on labels.
			Lang.readMissionLabels();

		//	if (Para.langVersion > N(Lang.Labels.version))
			this.copyMissingProperties(LabelsEN(), Lang, 'Labels');

			Lang.Labels.btnDeleteSmallPlunder = Lang.Labels.btnDeleteSmallPlunder
				.replace( '$plunder', Utils.formatNumber(Options.msg_PlunderThreshold*1000) )
				.replace( '$debris', Utils.formatNumber(Options.msg_DebrisThreshold*1000) )
			;


			if (!Para.coms[Options.language]) Options.language = 'EN';

            if ( Para.coms[Options.language].fn_Inter && !Lang.Interface.version)
				Lang.Interface = Para.coms[Options.language].fn_Inter();

			if (Para.coms[Options.language].def_lang != '')
				this.copyMissingProperties(Para.coms[ Para.coms[Options.language].def_lang ].fn_Inter(), Lang, 'Interface');

		//	if (Para.langVersion > N(Lang.Interface.version))
			this.copyMissingProperties(InterfaceEN(), Lang, 'Interface');

		},

		readResLabels: function()
		{

			function getValueFromId(id) {
				if (top === self)
					var node = document.getElementById(id);
				else
					var node = parent.document.getElementById(id);

				if (!node || !node.title) return;
				return node.title.split(':')[0];
			}
			Lang.Labels.metal = getValueFromId('metal_box');
			Lang.Labels.crystal = getValueFromId('crystal_box');
			Lang.Labels.deuterium = getValueFromId('deuterium_box');
			Lang.Labels.energy = getValueFromId('energy_box');
			Lang.Labels.darkmatter = getValueFromId('darkmatter_box');
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

		readMissionLabels: function(modus)
		{

			var Key = {
				missAttack:		{ id:1,		lbl:'#button1'},
				missFederation:	{ id:2,		lbl:'#button2'},
				missTransport:	{ id:3,		lbl:'#button3'},
				missDeploy:		{ id:4,		lbl:'#button4'},
				missHold:		{ id:5,		lbl:'#button5'},
				missEspionage:	{ id:6,		lbl:'#button6'},
				missColony:		{ id:7,		lbl:'#button7'},
				missHarvest:	{ id:8,		lbl:'#button8'},
				missDestroy:	{ id:9,		lbl:'#button9'},
				missIPMattack:	{ id:10,	lbl:'#button10'},
				missExpedition:	{ id:15,	lbl:'#button15'}
			};

			if ( modus == "read" && Lang.Labels.versionMissionLabels != Para.versionMissionLabels) {

				var missLabels = [];
				var data = Utils.$('#buttonz');

				for (name in Key)
					missLabels[Key[name].id] = Utils.$( Key[name].lbl +' .textlabel', data).text().trim();

				missLabels[0] = Para.versionMissionLabels;
				Utils.setValueCom("LabelsMission", Utils.JSON_stringify(missLabels));
			}

			var data = Utils.getValueCom("LabelsMission");
			if (data) {
				var missLabels = Utils.JSON_parse(data);

				if (missLabels.length > 0 && missLabels[0] == Para.versionMissionLabels) {

					for (var name in Key) {
						if (missLabels[Key[name].id] != null)
							if (!Lang.Labels[name])
								Lang.Labels[name] = missLabels[Key[name].id];
					}
					Lang.Labels.versionMissionLabels = Para.versionMissionLabels;
				}
			}
		},

		readLabels : function()
		{

			var Key = {
				defRLauncher:	{ id:1,		grp: 'def',		lbl:'#defense1'},
				defLLaser:		{ id:2,		grp: 'def',		lbl:'#defense2'},
				defHLaser:		{ id:3,		grp: 'def',		lbl:'#defense3'},
				defGauss:		{ id:4,		grp: 'def',		lbl:'#defense4'},
				defIon:			{ id:5,		grp: 'def',		lbl:'#defense5'},
				defPlasma:		{ id:6,		grp: 'def',		lbl:'#defense6'},
				defSShield:		{ id:7,		grp: 'def',		lbl:'#defense7'},
				defLShield:		{ id:8,		grp: 'def',		lbl:'#defense8'},
				defABmissile:	{ id:9,		grp: 'def',		lbl:'#defense9'},
				defIPmissile:	{ id:10,	grp: 'def',		lbl:'#defense10'},

				shipSCargo:		{ id:12,	grp: 'shipC',	lbl:'#button1'},
				shipLCargo:		{ id:13,	grp: 'shipC',	lbl:'#button2'},
				shipColonizator:{ id:14,	grp: 'shipC',	lbl:'#button3'},
				shipRecycler:	{ id:15,	grp: 'shipC',	lbl:'#button4'},
				shipSpy:		{ id:16,	grp: 'shipC',	lbl:'#button5'},
				shipSatellite:	{ id:17,	grp: 'shipC',	lbl:'#button6'},

				shipLFighter:	{ id:20,	grp: 'shipB',	lbl:'#button1'},
				shipHFighter:	{ id:21,	grp: 'shipB',	lbl:'#button2'},
				shipCruiser:	{ id:22,	grp: 'shipB',	lbl:'#button3'},
				shipBattleship:	{ id:23,	grp: 'shipB',	lbl:'#button4'},
				shipBCruiser:	{ id:24,	grp: 'shipB',	lbl:'#button5'},
				shipBomber:		{ id:25,	grp: 'shipB',	lbl:'#button6'},
				shipDestroyer:	{ id:26,	grp: 'shipB',	lbl:'#button7'},
				shipRIP:		{ id:27,	grp: 'shipB',	lbl:'#button8'}

			};

			var translation = [];
			var data = Utils.getValueCom("Labels");
			if (data)
				translation = Utils.JSON_parse(data);

			if ((translation.length > 0) && (translation[0] == Para.versionLabels)) {

				for (var name in Key) {
					if (translation[Key[name].id] != null)
						Lang.Labels[name] = translation[Key[name].id];

				}
				Lang.Labels.versionLabels = Para.versionLabels;

			}
			else {

				translation = [];
				Utils.$.get('/game/index.php?page=defense', function(data) {

					var pageData = Utils.$('<div>' + data + '</div>');

					var defData = Utils.$('#buttonz', pageData);
					for (var name in Key) {
						if (Key[name].grp == 'def')
							translation[Key[name].id] = Utils.$( Key[name].lbl +' .textlabel', defData).text().trim();
					}

					Utils.$.get('/game/index.php?page=shipyard', function(data) {

						var pageData = Utils.$('<div>' + data + '</div>');

						var shipCData = Utils.$('#buttonz #civilships', pageData);
						for (name in Key) {
							if (Key[name].grp == 'shipC')
								translation[Key[name].id] = Utils.$( Key[name].lbl +' .textlabel', shipCData).text().trim();
						}

						var shipBData = Utils.$('#buttonz #battleships', pageData);
						for (name in Key) {
							if (Key[name].grp == 'shipB')
								translation[Key[name].id] = Utils.$( Key[name].lbl +' .textlabel', shipBData).text().trim();
						}


						//Utils.$.get('/game/index.php?page=resources', function(data) {
						//	pageData = Utils.$('<div>' + data + '</div>');

						translation[0] = Para.versionLabels; // signal data complete
						Utils.setValueCom("Labels", Utils.JSON_stringify(translation));

					//	(Utils.$('#menuTable a[href*="overview"] span')[0]).click();
					});
				});
			}
		}

	};








	// =======================================================================
	// Menu
	// =======================================================================

	var Menu =
	{

		Init: function()
		{
			Utils.insertCSSRule('.adviceWrapper { margin-top: 0px; }');
			
			Menu.addButton();
		},

		insertCSSRules: function()
		{
			Utils.insertCSSRule('#anti_options_window { position:absolute; top:120px; left:40px; width:760px; background:#202025; border: 1px solid #555555; z-index:1000; }');
			Utils.insertCSSRule('#anti_options_window div[id] { padding: 6px; }');
			Utils.insertCSSRule('#anti_options_window span.notemark, #anti_options_window td.notemark { color: #3344CC; font-size: 10px; }');
			Utils.insertCSSRule('#anti_options_window td.notemark { width:60%; }');
			Utils.insertCSSRule('#anti_options_window #content { text-align: left; max-height: 400px; max-height: 600px; overflow:auto; border-top: 1px #555555 dashed; border-bottom: 1px #555555 dashed; }');

			Utils.insertCSSRule('#anti_options_window #content .sectiontitle { text-align: left; color:#909090; padding: 2px 0 2px 40%; background:#13181D; border: 1px solid #404040; cursor: pointer; margin-top: 4px; margin-bottom: 4px; font-weight: 700; }'); // border: 1px solid #772277;
			Utils.insertCSSRule('#anti_options_window #content .sectiontitle:hover { border-color: #909090; }');
			Utils.insertCSSRule('#anti_options_window #content .subsectiontitle { padding-top:14px; font-weight: 700; }');

			Utils.insertCSSRule('#anti_options_window .section table { width: 100%;	}');
			Utils.insertCSSRule('#anti_options_window .section td.input { width: 22em; }');
			Utils.insertCSSRule('#anti_options_window #content td { padding: 0.2em; padding-left: 8px; text-align: left; font-size: 11px; }');
			Utils.insertCSSRule('#anti_options_window #content td.label { padding-left: 26px; }');
			Utils.insertCSSRule('#anti_options_window select { min-width: 11em; }');
			Utils.insertCSSRule('#anti_options_window input[type="text"] { width: 8em; }');
			Utils.insertCSSRule('#anti_options_window input[type="text"].long { width: 18em; }');

			Utils.insertCSSRule('a.anti_button { display:block; min-width:80px; white-space:nowrap; background:#442233; border: 2px black solid; text-decoration: none; margin: 5px; padding: 2px 5px; }');
			Utils.insertCSSRule('a.anti_button:hover { background:#664466; }');
		},

		addButton: function()
		{
			try {
				var item = Utils.$('#menuTable li').eq(1).clone(true);

				var img =
				item.find('.menu_icon')
				.find('a')
					.attr({ 'class':'', 'href':'javascript:void(0)'	})
					.unbind('click')
					.click(function(){ setTimeout( function(){	Coords.reset();	Coords.initImg(null,true); }, 0); })
				.find('img')
					.attr({	'id':'btnCoords', 'width':'27',	'height':'27' })
					.get(0);

				Coords.initImg(img);

				item.find('.menubutton')
					.attr('href','javascript:void(0)')
					.attr('id','btnAntiOptions')
					.attr('target','_self')
					.removeClass('selected')
					.bind('click', Menu.showWindow)
					.find('.textlabel').html(Para.scriptName + ' ' + Para.version + (Para.testVersion ? 'T' : ''));

				item.appendTo('#menuTableTools');
			} catch (e) { Utils.log(e); }
		},

		hideWindow: function(save)
		{
			try {

				if (save) {
					var inputs = Utils.$('#anti_options_window input, #anti_options_window select');

					for (var i=0; i<inputs.length; i++) {
						var item = inputs.eq(i);
						var id = item.attr('id');
						var param = Options[id];

						if (typeof(param) == 'boolean')
							Options[id] = item.attr('checked');

						else if ( (typeof(param) == 'string' || typeof(param) == 'number') ) {
							Options.setOptionWithValidation(id, item.attr('value'));
						}
					}

					Options.saveOptions();
				}

				Utils.$('#anti_options_window').hide();
			}
			catch (e) { Utils.log(e); }
		},

		showWindow: function()
		{
			try {
				if (Utils.$('#anti_options_window').length == 0) Menu.createWindow();

				var inputs = Utils.$('#anti_options_window input, #anti_options_window select');

				for (var i=0; i<inputs.length; i++) {
					var item = inputs.eq(i);
					var param = Options[item.attr('id')];

					if (typeof(param) == 'boolean' && param)
						item.attr('checked', param);

					else if ( (typeof(param) == 'string' || typeof(param) == 'number') )
						item.attr('value', param);
				}

				Utils.$('#anti_options_window .color').trigger('keyup');

				Utils.$('#anti_options_window').show();
			}
			catch (e) { Utils.log(e); }
		},

		createWindow: function()
		{

			Menu.insertCSSRules();
			var notemark = '<span class="notemark">(*)</span>';

			// prepare dropdown boxes
			var missions = [
				{value:1, text:Lang.Labels.missAttack},
				{value:3, text:Lang.Labels.missTransport},
				{value:4, text:Lang.Labels.missDeploy},
				{value:5, text:Lang.Labels.missHold},
				{value:6, text:Lang.Labels.missEspionage},
				{value:9, text:Lang.Labels.missDestroy}
			];

			missions.sort( function (a,b) { return (a.text==b.text) ? 0 :  (a.text<b.text) ? -1 : 1; } );

			// language
			var language_list = [];
			for (var i in Para.coms)
				if (Para.coms[i].lang_Name)
					language_list.push( {value: i, text: Para.coms[i].lang_Name} );

			// Thousand separator
			var separator_list = [
				{value:'--', text: Lang.Interface.btnDefault},
				{value:'', text: '-'},
				{value:'.', text: '"."'},
				{value:',', text: '","'},
				{value:' ', text: '" "'}
			];

			// Time settings
			// 0 - leave as is, 1 - local everywhere, 2 - server everywhere
			var time_settings_list = [
				{value:0, text: Lang.Interface.timeDontChange},
				{value:1, text: Lang.Interface.timeLocal},
				{value:2, text: Lang.Interface.timeServer}
				];

			// Resources info position
			var res_positions_list = [
				{value:0, text: ' - '},
				{value:1, text: Lang.Interface.show_onBottom},
				{value:2, text: Lang.Interface.show_onLeft}
				];

			// Expand Messagebox
			var msg_expandBox_list = [
				{value:0, text: ' - '},
				{value:1, text: '100px'},
				{value:2, text: '200px'},
				{value:3, text: '300px'},
				{value:4, text: '400px'},
				{value:5, text: '500px'},
				{value:6, text: '600px'}
			];

			// spy reports - space between lines
			var msg_EspionageSpace_list = [
				{value:0, text: ' - '},
				{value:1, text: '25%'},
				{value:2, text: '50%'},
				{value:3, text: '75%'},
				{value:4, text: '100%'}
			];

			var sim_buttons_list = [
				{value:0, text: ' - '},
				{value:1, text: Lang.Labels.msg_Simulator1},
				{value:2, text: Lang.Labels.msg_Simulator2},
				{value:3, text: Lang.Labels.msg_Simulator3}
			];

			var div = document.createElement('div');
			div.className = 'hidden';
			div.id = 'anti_options_window';
			div.innerHTML =
				'<div id="title">'+Lang.Interface.title+'</div>' +
				'<div id="content">' +
				/*
				startSection('Antigame Origin') +
					createInfo('Homepage',createButtonHref('btnHomePage', Para.scriptURL)) +
					createInfo('Supported threads',createButtonHref('btnHomePage', Para.scriptURL)) +
					createInfo('Update or add translations',createButtonHref('btnHomePage', Para.scriptURL)) +
					createInfo('You have to go to fleet page 3 before mission coloring works.', '') +
					createInfo('Another tip to use Antigame well #1.', '') +
					createInfo('And once again another tip to use Antigame well #2.', '') +
				endSection() +
				*/
				startSection(Lang.Interface.sectionGeneral) +
						createSelect('language', language_list) +
						((! isOpera) ? createInput('update_check') : '') +
						((isFirefox) ? createInput('blockAutoComplete') : '') +
					createSubsection('sectionGeneral_Universe') +
						createInfo('uni_SpeedFactor', Para.uni_SpeedFactor + ' (' + Utils.server + ' - ' + Utils.uni + ')') +
						createInput('uni_DFPercent') +
						createInput('uni_DefenseToDF') +
						createInput('uni_maxPlayerScore') +
					createSubsection('sectionGeneral_Globalview') +
						createSelect('showResources', res_positions_list) +
						createInput('showConstructionTitle') +
						createInput('shortHeader') +
						createInput('misc_scrollTitle') +
						createSelect('thousandSeparator', separator_list) +
					createSubsection('sectionGeneral_Objectview') +
						createInput('showDeficient') +
						createInput('showNames') +
						createInput('nameColorOn') +
						createInput('nameColorOff') +
						createInput('nameColorDisabled') +
				endSection() +

				startSection(Lang.Interface.sectionTime) +
					createSelect('timeSetting', time_settings_list) +
					createInput('timeAMPM') +
					createInput('showServerOgameClock') +
					createInput('showServerPhalanx') +
					createInput('showPageStartTime') +

				endSection() +

				startSection(Lang.Interface.sectionGalaxy) +
						createInput('galaxy_killTips', Lang.Interface.killTips) +
						createInput('galaxy_keepTipsPlanets') +
						createInput('galaxy_keepTipsDebris') +
						createInput('galaxyHideMoon') +
					createSubsection('sectionGalaxy_Player') +
						createInput('galaxyShowRank') +
						createInput('galaxyRankColor') +
						createInput('galaxy_Players') +
						createInput('galaxy_PlayerColors') +
					createSubsection('sectionGalaxy_Alliance') +
						createInput('galaxyShowAllyRank') +
						createInput('galaxy_Allys') +
						createInput('galaxy_AllyColors') +
					createSubsection('sectionGalaxy_Debris') +
						createInput('galaxyDebrisMin') +
						createInput('galaxyDebrisColor') +
				endSection() +

				startSection(Lang.Interface.sectionMessages) +
						createSelect('msg_expandBox', msg_expandBox_list) +
						createInput('msg_killTips', Lang.Interface.killTips) +
						createInput('msg_addButtons') +
					createSubsection('sectionMessages_Espionage') +
						//createInput('msg_EspionageLayout') +
						createSelect('msg_EspionageSpace', msg_EspionageSpace_list) +
						createInput('msg_PlunderThreshold') +
						createInput('msg_DebrisThreshold') +
						createInput('msg_foldSmallPlunder') +
						createInput('msg_showPlunder') +
						createSelect('msg_addSimButton', sim_buttons_list) +
						createSubsection('sectionMessages_Combat') +
						createInput('msg_fixColors') +
				endSection() +

				startSection(Lang.Interface.sectionFleetDispatch) +
					createSubsection('sectionFleetDispatch_Fleet1') +
						createInput('fleet1_Layout', Lang.Interface.improveLayoutUse) +
						createInput('fleet_showCapacity') +
						createInput('fleet1_showResCalc') +
				//		createInput('uni_maxPlayerScore') +
						createInput('fleet1_killTips', Lang.Interface.killTips) +
					createSubsection('sectionFleetDispatch_Fleet2') +
						createInput('fleet2_Layout', Lang.Interface.improveLayoutUse) +
						//createInput('fleet2_fixLayout') +
						createInput('autocopyCoords') +
						createInput('autocopyGlobal') +
						createInput('fleet2_setTargetDF') +
						createInput('fleet2_ShortLinks') +
						createInput('fleet2_MoonsToEnd') +
						createInput('fleet2_MoonColor') +
						createInput('fleet2_expandLists') +
						createInput('fleet2_expandMoonColor') +
						createInput('fleet2_checkProbeCapacity') +
					createSubsection('sectionFleetDispatch_Fleet3') +
						createSelect('mission1', missions, Lang.Interface.missionPriority) +
						createSelect('mission2', missions, '') +
						createSelect('mission3', missions, '') +
						createSelect('mission4', missions, '') +
						createSelect('mission5', missions, '') +
				endSection() +

				startSection(Lang.Interface.sectionFleet) +
					createSubsection('sectionFleet_Movement') +
						createInput('mvmt_expandFleets') +
						createInput('mvmt_showReversal') +
					createSubsection('sectionFleet_Phalanx') +
						createInput('evt_expandFleetsPhal') +
						createInput('phalanx_showDebris') +
					createSubsection('sectionFleet_Events') +
						createInput('evt_expandFleetsEvt') +				
					createSubsection('sectionFleet_MissionColor') +
						createInput('evt_dimReverse') +
						createInput('missAttack', Lang.Labels.missAttack) +
						createInput('missColony', Lang.Labels.missColony) +
						createInput('missDeploy', Lang.Labels.missDeploy) +
						createInput('missDestroy', Lang.Labels.missDestroy) +
						createInput('missEspionage', Lang.Labels.missEspionage) +
						createInput('missExpedition', Lang.Labels.missExpedition) +
						createInput('missFederation', Lang.Labels.missFederation) +
						createInput('missHarvest', Lang.Labels.missHarvest) +
						createInput('missHold', Lang.Labels.missHold) +
						createInput('missTransport', Lang.Labels.missTransport) +
				endSection() +
				'</div>' +

				'<table id="footer"><tr><td class="notemark"> ' + notemark + ' ' + Lang.Interface.optionsNote1 + '</td>' +
				  createButton('btnOk') +
				  createButton('btnCancel') +
				  createButtonHref('btnHomePage', Para.scriptURL)+'</tr></table>';

			document.body.appendChild(div);

			Utils.$('#btnOk').bind('click', function() { setTimeout( function () {Menu.hideWindow(true);}, 0); } );
			Utils.$('#btnCancel').bind('click', function() { Menu.hideWindow(false);} );
			Utils.$('#anti_options_window .color')
				.bind('change', Menu.changeInputColor)
				.bind('keyup', Menu.changeInputColor);

			Utils.$('.sectiontitle').bind('click', function() {
				Utils.$(this).next().toggleClass('hidden')
				.end()
				.find('.indicator').html( Utils.$(this).next().hasClass('hidden')?'▼':'▲');
			} ).eq(0).trigger('click');

			function startSection(title, classname) {
				return  '<div class="'
					+ (classname || '') + ' section"><div class="sectiontitle"><span class="indicator">▼</span> '
					+ (title || ' ') + '</div><table class="hidden">';
			};

			function endSection() {	return '</table></div>'; };

			function createSubsection(label) {
				label = (Lang.Interface[label]) ? Lang.Interface[label] : label;
				return '<tr><td class="subsectiontitle" colspan="2">' + label + ':</td></tr>';
			};

			function createInfo(label,content) {
				label = (Lang.Interface[label]) ? Lang.Interface[label] : label;
				return addItem(label, content);
			};

			function createSelect(id, options, label, noRow) {
				if(typeof(label) == 'undefined' || label == '-auto-') label = Lang.Interface[id];

				var str = '';
				for (var i=0; i<options.length; i++)
					str += '<option value="'+options[i].value+'">'+options[i].text+'</option>';

				return addItem(label, '<select id="'+id+'">' + str + '</select>', noRow);
			};

			function createInput(id, label, noRow) {
				var type, class_attr='', param = Options[id];

				if (typeof(param)=='boolean') type = 'checkbox';
				if ((typeof(param) == 'string' || typeof(param) == 'number') ) type = 'text';
				if(!type) return;

				if (id == 'galaxy_PlayerColors' || id == 'galaxy_AllyColors') class_attr = 'class="color long"';
				else if (Options.getValueType(param) == 'color') class_attr = 'class="color"';
				else if (typeof(param) == 'string') class_attr = 'class="long"';

				if(typeof(label) == 'undefined' || label == '-auto-') label = Lang.Interface[id];
				if (Options.uni_options[id]) label += ' ' + notemark;

				return addItem(label, '<input id="'+id+'" type="'+type+'" '+class_attr+'>', noRow);
			};

			function addItem(label, content, noRow) {
				return '<tr><td class="label">' + label + '</td><td class="input">' + content + '</td></tr>';
			};

			function createButton(id) {
				return '<td class="button"><a class="anti_button" id="' + id + '" href="javascript:void(0)">' +	Lang.Interface[id] + '</a></td>';
			};

			function createButtonHref(id, href) {
				return '<td class="button"><a class="anti_button" target="_blank" id="' + id + '" href="' + href + '">' + Lang.Interface[id] + '</a></td>';
			};
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

		checkUpdate: function()
		{
			var now = (new Date()).getTime();
			var last = N( parseInt(Utils.getValue('update_LastTS',0),10) );

			if ( now-last < 1000*60*60*4 ) // every 4 hour
				Menu.showUpdateMarker();
			else { 
				Utils.xmlhttpRequest({method:'GET', url:Para.scriptVersionURL, onload: function(response){ Menu.handleUpdateResponse(response); } });
			}
		},

		getVersion: function (ver)
		{
			if (!ver) return 0;
			var s = ver.split('.');
			s = parseInt(s[0],10)*1000000 + parseInt(s[1],10)*100 + parseInt(s[2],10);
			if (isNaN(s)) s = -1;
			return s;
		},

		showUpdateMarker: function()
		{
			var newversion = Utils.getValue('update_Version','');
			if (this.getVersion(Para.version) >= this.getVersion(newversion)) return;

			Utils.insertCSSRule('#update_marker, #update_marker:hover { display:block; width:19px; position:relative; top:-25px; left:-20px;'
				+ 'padding:0; line-height:normal !important; font-family:Verdana; font-weight:700; font-size:16px !important; cursor:pointer; }'
			);
			Utils.insertCSSRule('#update_marker { color:orange !important; }');
			Utils.insertCSSRule('#update_marker:hover { color:#FFEE66 !important; }');

			var marker = document.createElement('a');
			marker.innerHTML = '[!]';
			marker.id = 'update_marker';
			marker.title = Lang.Interface.installNewVersion + ': '+newversion;
			marker.setAttribute('href', Para.scriptUpdateURL);
			var btnAntiOptions = document.getElementById('btnAntiOptions');
			if(btnAntiOptions) btnAntiOptions.parentNode.appendChild(marker);
		},

		handleUpdateResponse: function(response)
		{
			try {
				var newversion = response.responseText;
				if (!newversion) return;

				Utils.setValue('update_Version', newversion);
				Utils.setValue('update_LastTS', (new Date()).getTime().toString());
				Menu.showUpdateMarker();
			} catch (e) { Utils.log(e);	}
		}
	};







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
			var script = Utils.script;
			var starttime = script.innerHTML.match(/currTime\.setTime\(\((\d+)-startServerTime/i);
			if (!starttime) return;
			starttime = parseInt(starttime[1],10);
			this.InitialServerTime = starttime;

			this.TimeZoneDelta = - (Utils.unsafeWindow.localTime.getTime() - Utils.unsafeWindow.startServerTime);
			this.TimeDelta = now.getTime() - starttime;

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
			var code = ' \
					var func = UhrzeitAnzeigen.toString();\
					func = func.replace(/(getFormatedDate\\(currTime\\.getTime\\(\\))/i,"$1-(' + this.TimeZoneDelta + ')"); \
					eval(func); \
				';

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
			if (Options.timeSetting != 1 || Options.showServerOgameClock)
				date -= this.TimeZoneDelta;

			date = new Date(date);

			div.innerHTML = this.formatDate(date, '[d].[m].[Y] <span style="font-weight:700">[H]:[i]:[s]</span>');
			Utils.insertAfter(div, clock);
		},

		Init: function()
		{
			this.getTimeDelta();

			if (Options.timeSetting == 1) {
				var code = 'window.old_getFormatedDate = window.getFormatedDate; window.getFormatedDate = function(date,format) { return window.old_getFormatedDate(date+'+this.TimeZoneDelta+',format) }';
				Utils.runScript(code);
			}

			if ( Options.timeSetting == 1 && Options.showServerOgameClock ) {
				this.changeOgameClocks2Server();
			}
		}
	};








	// =======================================================================
	// misc functions
	// =======================================================================

	var Utils =
	{
		page: "",

		unsafeWindow: ((typeof unsafeWindow) != "undefined" ? unsafeWindow : window),
		bg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAALHRFWHRDcmVhdGlvbiBUaW1lAHPhYiAzMSBPdXQgMjAwOSAxODoyNjowOSAtMDAwMBvBwloAAAAHdElNRQfZCh8SGy7RbQlkAAAACXBIWXMAAB7BAAAewQHDaVRTAAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpjYGBgmAEAAJ0AmeuxAnUAAAAASUVORK5CYII=",

		// wrappers for GM functions
		xmlhttpRequest: ((typeof GM_xmlhttpRequest) != "undefined" ? GM_xmlhttpRequest : function(){}),

		Init: function()
		{

			//OPERA FIX
			var element = (isOpera) ? 'body' : 'head';
			document.getElementsByTagName(element)[0].appendChild(document.createElement("style"));
			Utils.stylesheet = document.styleSheets[document.styleSheets.length-1];

			this.$ = this.unsafeWindow.$;

			this.separator = (this.unsafeWindow.LocalizationStrings) ? (this.unsafeWindow.LocalizationStrings['thousandSeperator'] || '.') : '.';

			// server abbr, server language, uni, speedfactor, page name
			this.initUni();

			this.getDocScript();
      //MODIFICA
			//this.ogame = (document.location.href.match(/http:\/\/.+\.ogame\..+\/game\/index\.php\?page=*/i)) ? true : false;
			this.ogame = true;

			var array = document.location.search.match(/&session=([0-9a-f]*)/i);
			this.session = array ? array[1] : null;

		},

		initUni: function()
		{
			this.server = "EN";
			var url = document.location.href;
			server = url.match(/http:\/\/([^\\\/]+[\\\/])/i);

			if (server) server = server[1].toUpperCase();
			server = server.replace(/\\/i, '/');

			for ( c in Para.coms)
				if ((Para.coms[c].domain != '') && (server.indexOf(Para.coms[c].domain) > -1)) { this.server = c; break};

			this.uni = url.toUpperCase().match(/:\/\/([a-z0-9]+)\./i);
			this.uni = this.uni ? this.uni[1] : '0';

			var uni_server = this.uni + '.' + this.server;

			this.uni_prefix = uni_server.replace(/[\.\-]/g, '_');

			this.page = document.body.id.toLowerCase();
			if (!this.page) {
				this.page = document.location.search.match(/page=(\w+)/i);
				this.page = this.page ? this.page[1].toLowerCase() : "";
			}

		},

		//##### Cleanup can be removed
		// wrappers for JSON functions
		JSON_stringify: function(obj)
		{
			return JSON ? JSON.stringify(obj) : null;
		},

		JSON_parse: function(str)
		{
			return JSON ? JSON.parse(str) : null;
		},


		setValue: function ( name, value )
		{
			if( !name ) return;

			if (isGM) {
				// setTimeout is necessary to store from Utils.xmlhttpRequest()
				//GM_setValue(name, value);
				var setValue_Name = name;
				var setValue_Value = value;
				setTimeout(function() {	GM_setValue(setValue_Name, setValue_Value);	}, 0);
			}
			else if (localStorage) {
				localStorage.setItem(name, Utils.JSON_stringify(value));
			}
		},

		getValue: function ( name, default_value )
		{

			if (isGM)	{
				return GM_getValue(name, default_value);
			}
			else if (localStorage) {
				var value = Utils.JSON_parse(localStorage.getItem(name));
				return (value == null && typeof default_value != 'undefined') ? default_value : value;
			}
		},

		deleteValue: function(name)
		{
			if (isGM) {
				GM_deleteValue(name);
			}
			else if (localStorage) {
				localStorage.removeItem(name);
			}
		},

		setValueCom: function ( name, value )
		{
			Utils.setValue(Utils.server + name, value);
		},

		getValueCom: function ( name, def )
		{
			return Utils.getValue(Utils.server + name, def);
		},

		deleteValueCom: function( name )
		{
			Utils.deleteValue(Utils.server + name);
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
			if (Para.testVersion) {
				if (isGM)
					GM_log(str);
				else if (isOpera)
					window.opera.postError(str);
				else if (isChrome)
					console.log('Antigame: '+str);
			}
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
							Utils.log(i+': '+obj[i]);
					} catch(e) {}

			}
			else {
				var props = proplist.split(',');
				for (var i=0; i<props.length; i++)
					try {
						var prop = props[i];
						if (showUndefined || typeof(obj[prop]) != 'undefined') Utils.log(prop+': '+obj[props[i]]);
					} catch(e) {}
			}
		},

		whenrendered: function(f)
		{
			if (document.defaultView.getComputedStyle(document.body, null)) f();
			else setTimeout(function(){Utils.whenrendered(f); }, 100);
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

			for (var i=0; i<scripts.length; i++) {
				if (!scripts[i].src && ! (this.isCurrentPage('messages') && n++ == 0) && scripts[i].childNodes[0].nodeValue.indexOf('session =') > -1 ) {
					this.script = scripts[i];
					break;
				}
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

		createElement: function(tagName, attributes, children)
		{
			var result = document.createElement(tagName);
			for (var attribute in attributes)
			{
				result.setAttribute(attribute, attributes[attribute]);
			}
			for (var child in children)
			{
				result.appendChild(children[child]);
			}
			return result;
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
			for (var i=0; i<pages.length; i++) {
				if (pages[i] == this.page )
					return true;
			}
			return false;
		},

		runScript: function (code)
		{
			if (!code || code=="") return;
			var script = document.createElement('script');
			script.setAttribute('type','text/javascript');
			if (isOpera) {
				script.innerText = code;
			}
			else {
				script.innerHTML = code;
			}
			document.body.appendChild(script);
			setTimeout(function(){script.parentNode.removeChild(script); }, 0);
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
		//	else if (event == 'keyup' || event == 'keypress') {
		//	}

			if (evt) node.dispatchEvent(evt);

		},

		killCluetips: function(selector)
		{
			selector = selector || '.tipsStandard';
			setTimeout( function(){ Utils.$(selector).cluetip('destroy').unbind('mouseover').each(function(){this.title = this.title.replace('|',''); }); }, 1000);
		},

		XPath: function(path, context, type)
		{
			try {
				if (!context) context = document;
				mydoc = context.ownerDocument || document;
				if (!type) type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
				return mydoc.evaluate(path, context, null, type, null);
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

		getMetatag: function(name, def) {
			var node = document.getElementsByName(name);
			if (!node && isIframe) {
				node = parent.document.getElementsByName(name);
			}
			return (node && node.length) ? node[0].content : (def) ? def : 0;
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
		}


	};








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

		Init: function()
		{
			this.techs = {};
			this.loadTechs();
			this.checkTechsUpdate();

			this.temperature = this.geologist = this.engineer = this.active_planet = null;

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


		},



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

				if (isIframe) {
					var nodes = Utils.XPath('//A[contains(@class,"planetlink")][@title]', window.parent.document.body);
				}
				else {
					var nodes = Utils.XPath('//A[contains(@class,"planetlink")][@title]');
				}
				if (!nodes) return;

				if (nodes.snapshotLength == 1) {
					this.active_planet = nodes.snapshotItem(0);
				}
				else {
					for (var i=0; i<nodes.snapshotLength; i++) {
						if ( nodes.snapshotItem(i).className.indexOf('active') > -1 ) {
							this.active_planet = nodes.snapshotItem(i);
							break;
						}
					}
				}
			} catch (e) { Utils.log(e);	}
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
				return officers.get (i).parentNode.className.indexOf (" on") >= 0;
			}
			var officers = Utils.$('#officers a img');
			this.engineer = checkOfficer(2);
			this.geologist = checkOfficer(3);
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
			if (!id || level<0) return 0;

			if (level == 0) return 0;

			var res = 0;

			if (id == 12)
				res = Math.floor( 10 * level * Math.pow(1.1, level) ) * Para.uni_SpeedFactor;

			return Math.floor(res);
		},

		getProduction: function(id, level)
		{
			if (!id || level<0) return 0;

			// solar sat.
			if (id == 212)
			{
				return Math.floor ((this.getTemperature()+40 + 140) / 6) * (this.getEngineer() ? 1.1 : 1);
			}

			if (level == 0)
				return (id==1) ? 30 * Para.uni_SpeedFactor :
								(id==2) ? 15  * Para.uni_SpeedFactor : 0;

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
				res = Math.floor(res) * Para.uni_SpeedFactor;

			if (id <=3 && this.getGeologist())
				res = Math.floor(res) * 1.1;
			else if (id>3 && this.getEngineer())
				res = Math.floor(res) * 1.1;


			return Math.floor( res + this.getProduction(id, 0) );

		},

		getStorageCapacity: function(id, level)
		{
			if (Para.storageCapacity[level] && (id == 22 || id == 23 || id == 24))
				return Para.storageCapacity[level] * 1000;
			return 0;
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
			return Math.round(((35000 / speed * Math.sqrt(distance * 10 / this.ships[id].speed) + 10) / Para.uni_SpeedFactor ));
		},

		getFleetConsumption: function (id, distance, speed)
		{
			var duration = this.getFleetDuration(id, distance, speed);
			var shipSpeedValue = 35000 / (duration * Para.uni_SpeedFactor - 10) * Math.sqrt(distance * 10 / this.ships[id].speed);
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
					var label = Lang.Labels['ship'+ship.name];

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
					var label = Lang.Labels['def'+def.name];

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


		// =======================================================================

		getTech: function(id)
		{
			return N(Ogame.techs[id]);
		},

		readTechs: function()
		{
			try {
				var techs = { version: Para.versionTechs };
				Utils.$('#buttonz a.detail_button').each(
					function() { techs[this.getAttribute('ref')] = Utils.parseInt( Utils.$(this).find('.level').get(0).lastChild.nodeValue );}
				);
				Utils.setValueUni('techs', Utils.JSON_stringify(techs));
			} catch (e) { Utils.log(e);}
		},

		checkTechsUpdate: function()
		{
			var now = (new Date()).getTime();
			var last = N( parseInt(Utils.getValueUni('techs_LastTS',0),10) );

			if ( (now-last > 1000*60*60*4) || (N(Ogame.techs.version) != Para.versionTechs) ) {// every 4 hour
				Ogame.readTechsServer();
				Utils.setValueUni('techs_LastTS', (new Date()).getTime().toString());
			}
		},

		readTechsServer: function()
		{
			var data;
			Utils.$.get('/game/index.php?page=research', function(data) {

				var pageData = Utils.$('<div>' + data + '</div>');
				try {
					var techs = { version: Para.versionTechs };
					Utils.$('#buttonz a.detail_button', pageData).each(
						function() { techs[this.getAttribute('ref')] = Utils.parseInt( Utils.$(this).find('.level').get(0).lastChild.nodeValue );}
					);
					Utils.setValueUni('techs', Utils.JSON_stringify(techs));
				} catch (e) { Utils.log(e);}
			});
		},

		loadTechs: function()
		{

			try {
				var str = Utils.getValueUni('techs');
				if (str)
					Ogame.techs = Utils.JSON_parse(str);
			} catch (e) { Utils.log(e);	}
		},

		getMissionClass: function (mission)
		{
			var mclass = "";
			if (mission) {
				switch(mission) {
					case (Lang.Labels.missAttack): mclass = "ownattack"; break;
					case (Lang.Labels.missHold): mclass = "ownhold"; break;
					case (Lang.Labels.missColony): mclass = "owncolony"; break;
					case (Lang.Labels.missDeploy): mclass = "owndeploy"; break;
					case (Lang.Labels.missHarvest): mclass = "ownharvest"; break;
					case (Lang.Labels.missTransport): mclass = "owntransport"; break;
					case (Lang.Labels.missFederation): mclass = "ownfederation"; break;
					case (Lang.Labels.missDestroy): mclass = "owndestroy"; break;
					case (Lang.Labels.missEspionage): mclass = "ownespionage"; break;
					case (Lang.Labels.missExpedition): mclass = "ownexpedition"; break;
					default: mclass = "ownharvest"; // harvest as default, because it's different in eventlist and fleetpage 3
				//	default: mclass = "owntransport";
				}
			}
			return mclass;
		}

	};








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
			} catch(e) { Utils.log(e); };
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
			} catch(e) { Utils.log(e); }
		},

		Init: function()
		{
			this.prepare(this.PLAYER, Options['galaxy_Players'], Options['galaxy_PlayerColors'] );
			this.prepare(this.ALLY, Options['galaxy_Allys'], Options['galaxy_AllyColors'] );
		}
	};







	// =======================================================================
	// Functions to create simple table like
	// =======================================================================
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

		createTableString: function(values_in_row, noHeader)
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

			if (noHeader)
				str = '<tbody>' + str + '</tbody>';
			else
				str = '<tbody><tr>' + '<th class="'+this.title_class+'" colspan="'+values_in_row*2+'">' + this.title +'</th>' + '</tr>' + str + '</tbody>';

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
			img.setAttribute('title',(saved?Lang.Interface.resetCoords+this.get():''));
			img.parentNode.style.cursor = saved ? 'pointer': 'default';
		},

		onMouseUp: function(e) {
			if ((!e) || ((e.ctrlKey) && (!e.keyCode))) return;

			var targetclassname = e.target.toString();

			try {
				if(targetclassname.match(/InputElement|SelectElement|OptionElement/i) || targetclassname.match(/object XUL/i))
					return;
				Coords.read(window.getSelection().toString());
			} catch(e) { Utils.log(e); }
		},

		Init: function()
		{
			document.addEventListener('mouseup', function (e){ Coords.onMouseUp(e); }, false);
			window.addEventListener('focus', function (e){ Coords.initImg(); }, false);
		}

	};







	// =======================================================================
	// Eventlist
	// =======================================================================
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
			Utils.insertCSSRule('#newEventBox { height: 0; width: 720px; margin-left: -5px; }');
			Utils.insertCSSRule('#newEventBox iframe { width: 100%; height: 100%; }');
			Utils.insertCSSRule('#rechts{ margin-left: 20px; }');
			if (!Options.evt_showOnTop)
				Utils.insertCSSRule('#newEventBox { float: left; }');

			if (Options.evt_showOnTop && Options.evt_noScroll)
				Utils.insertCSSRule('#planetdata { float: left !important; margin-left: 30px !important; }');
		},

		show3StateIndicator: function(icon)
		{
			function id2num(id) { return id.replace('eventRow-','');
			}
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
			} catch(e) { Utils.log(e); }
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
			var mclass = "";

			var fleetType = this.getFleetType(row);
			if (fleetType == 0) mclass = 'hostile';
			else if (fleetType == 1) mclass = 'neutral';
			else {
				var mission = row.querySelector('.missionFleet img');
				mission = mission && mission.getAttribute('title');
				mission = mission && mission.substr(mission.indexOf('|')+1);
				mission = mission.split(" (")[0];

				mclass = Ogame.getMissionClass (mission)
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
								Utils.whenrendered(function(){EventList.showFleetDetails(li, xhr.responseText); });
					};
					xhr.send(null);
				}

				var rows = Utils.XPath('//*[contains(@class,"eventFleet")]/UL | //*[contains(@class,"partnerInfo")]/UL');
				for (var i=0; i<rows.snapshotLength; i++) {
					row = rows.snapshotItem(i);
					if (row.parentNode.className.indexOf('acsFleet') > -1) continue;

					var url = Utils.getElementByClassName('tipsTitleArrowClose', row);
					if (!url) continue;
					url = url.href || url.getAttribute('rel');

					var li = document.createElement('li');
					li.className = 'antigame_evtDetails ' + this.getMissionClass(row);
					li.style.display = 'none';
					row.appendChild(li);

					sendRequest(url, li);
				}
			} catch (e) { Utils.log(e);	}
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

					var rx = new RegExp(Lang.Labels.rx_sendMail.source);

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
					};
				    var div = document.createElement('div');
					div.id = 'evt_timeMode';
					div.innerHTML = '<span id="tmTime">'+Lang.Labels.tmTime+'</span> / <span id="tmCountdown">'+Lang.Labels.tmCountdown+'</span>';
					div.addEventListener('click',f,false);
					document.getElementById('eventHeader').appendChild(div);


				}
			} catch(e) { Utils.log(e); }
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

					if (Options.evt_noScroll) {
						h += this.maxClueHeight;
					}
					newEventBox.style.height = h  + 'px';

					if (Options.evt_showOnTop) {
						putElementDown(Utils.getElementByClassName('c-left', parent.body), delta);
						putElementDown(Utils.getElementByClassName('c-right', parent.body), delta);
					}

					if (Options.evt_noScroll && Options.evt_showOnTop) {
						parent.getElementById('planet').style.marginTop = (-this.maxClueHeight) + 'px';
					}
				}

				document.body.className = 'eventListPro';
			}
			catch (e) { Utils.log(e); }
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
				'<tr><th colspan="2">'+Lang.Labels.debris+':</th></tr>' +
				'<tr><td>'+Lang.Labels.metal+':</td><td class="value">'+Utils.formatNumber(debris.metal)+'</td></tr>' +
				'<tr><td>'+Lang.Labels.crystal+':</td><td class="value">'+Utils.formatNumber(debris.crystal)+'</td></tr>' +
				'<tr><td>'+Lang.Labels.shipRecyclerAlt+':</td><td class="value">'+Utils.formatNumber(debris.recs)+'</td></tr>'
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

			} catch (e) { Utils.log(e); }
		},

		showEventList: function ()
		{
			try {
				this.insertCSSRulesPro();
				var div = document.createElement('div');
				div.id = 'newEventBox';
				div.innerHTML = '<iframe id="iframeEventBox" src="index.php?page=eventList&pro=1&session='+ Utils.session +'"></iframe>';

				if (Options.evt_showOnTop) {
					var next = document.getElementById('planet');
					next.parentNode.insertBefore(div, next);
				}
				else {
					var prev = Utils.XPathSingle('//*[@class="content-box-s"][last()]');
					Utils.insertAfter(div, prev);
				}

				this.iframe = document.getElementById("iframeEventBox");
				this.iframe.contentWindow.addEventListener('load', function() { EventList.iframeReady(); }, false);
			} catch (e) { Utils.log(e); }
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
					};
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
	};








	// =======================================================================
	// Eventlist new
	// =======================================================================
	var EventList2 =
	{

		changeTime: function()
		{
			DateTime.changeNodesTime('//*[@id="eventboxContent"]/descendant::*[contains(@class,"arrivalTime")]', '[H]:[i]:[s]');
		},

		insertCSSRules: function()
		{
			/*Utils.insertCSSRule('.coordsOrigin a, .destCoords a { text-decoration:none }');*/

			Utils.insertCSSRule(' \
				.antigame_evtDetails2 .fleetContents { \
					text-align: left !important; \
					font-size: 9px !important; \
					line-height: 9px !important; \
					padding-top: 1px !important; \
					padding-bottom: 2px !important; \
				} \
			');

			Utils.insertCSSRule(' \
				tr.eventFleet[style="display: none;"] + tr.antigame_evtDetails2,\
				tr.eventFleet[style="display: none; "] + tr.antigame_evtDetails2\
				{\
				  display: none;\
				}\
			');

			Utils.insertCSSRule('.antigame_evtDetails2 .missionName	{ text-align: left; padding-left: 10px; vertical-align: top; }');

			Utils.insertCSSRule(' \
				.antigame_evtDetails2 .playername { \
					text-align: right !important; \
					font-size: 10px !important; \
					color: green !important; \
					white-space:nowrap !important; \
				} \
			');

			if (Options.evt_dimReverse)
			{
				//##### Cleanup  - dirty bugfix for Opera
				if (isOpera) {
					Utils.insertCSSRule('#eventContent .reverse td { opacity: 0.3; }');
					Utils.insertCSSRule('#eventContent .reverse + .antigame_evtDetails2 td { opacity: 0.5; }');
				}
				else {
					Utils.insertCSSRule('#eventContent .reverse { opacity: 0.3; }');
					Utils.insertCSSRule('#eventContent .reverse + .antigame_evtDetails2 { opacity: 0.5; }');
				};
			}

			FleetMovement.cssFleetColors();
		},

		show3StateIndicator: function(icon)
		{
			function id2num(id) { return id.replace('eventRow-','');
			}
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
			} catch(e) { Utils.log(e); }
		},

		// 0: hostile, 1:neutral, 2:friendly
		getFleetType: function(row)
		{
			var countdown = Utils.XPathSingle('TD[@class="countDown" or contains(@id, "counter-")]', row);
			var fleetType = 2;
			if (countdown) {
				if (countdown.className.indexOf('neutral') > -1)
					fleetType = 1;
				else if (countdown.className.indexOf('hostile') > -1)
					fleetType = 0;
			}

			return fleetType;
		},


		getMissionClass: function (row)
		{
			var mclass = "";

			var fleetType = this.getFleetType(row);
			if (fleetType == 0) mclass = 'hostile';
			else if (fleetType == 1) mclass = 'neutral';
			else {
				var mission = row.querySelector('.missionFleet img');
				mission = mission && mission.getAttribute('title');
				mission = mission && mission.substr(mission.indexOf('|')+1);
				mission = mission.split(" (")[0];

				mclass = Ogame.getMissionClass (mission)
			}

			return mclass;
		},

		showFleetDetails: function(row, data)
		{
			var contents = data
				.replace(/<th colspan="2">.+?<\/th>/gi, '')
				.replace(/(<.+?>\s*)+/gi,' ')
				.replace(' &nbsp; ','<br/><br/>')
				.replace(/^\s/,'')
			;

			var acsID = row.className.match(/\bunion\d+\b/);

			// get player name
			var nick = Utils.XPathSingle('*[@class="sendMail"]/A',row);
			var rx = new RegExp(Lang.Labels.rx_sendMail.source);
			nick = nick && nick.title.match(rx);
			nick = nick && nick[1];

			var mission = row.querySelector('.missionFleet img');
			mission = mission && mission.getAttribute('title');
			mission = mission && mission.substr(mission.indexOf('|')+1);

			var datarow = document.createElement('tr');

			datarow.className = 'antigame_evtDetails2 ' + this.getMissionClass(row);
			if (acsID)
			{
				datarow.className += ' ' + acsID;
				if (row.style.display == 'none') datarow.style.display = 'none';
			}

			var td1 = document.createElement('td');
			td1.setAttribute('colspan','2');
			td1.className = 'missionName';
			td1.innerHTML = mission;

			var td2 = document.createElement('td');
			td2.setAttribute('colspan','6');
			td2.className = 'fleetContents';
			td2.innerHTML = contents;

			var td3 = document.createElement('td');
			td3.setAttribute('colspan','3');
			td3.className = 'playername';
			if (nick) td3.innerHTML = nick;

			datarow.appendChild(td1);
			datarow.appendChild(td2);
			datarow.appendChild(td3);

			Utils.insertAfter(datarow, row);
		},

		addRefreshButton: function(eventListWrap)
		{
			var headerText = eventListWrap.querySelector("h4");
			if (!headerText) return;

			var refreshDetails = headerText.querySelector("a.refresh_details");
			if (refreshDetails) return;


                        var refresh_gif = 'data:image/gif;base64,R0lGODlhEAAQAOYAAGB6jpGmtdXe5V54jXGKntrh5vDz9nCJnYedrqu7x/3+/+3w8+zw9LfFz/L1+GZ/k3ePo/7//42gsI2isrC+ycjT22uDlsDM1aGwvXONoIacreHm64ugsai2wpaotq+8x6GywHWOodri5pCltWF7j/Dz9crU3HSNoI+jsdDa4IqfrnmSpNjh6K+9yevv8/j5++Xq7qu4w2J7kMjU3HmRpKi5xtzi6KW0v3iNn7rFzvr7/bzJ04SaqnaMnsjU3X+VpgAAAP///2+JnVx2iwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAdxgEBDg4SFhYKGiYqGMoM/D4tDODc+FB4MPIoAMS8uJhtBQTskiQA5HRYDLQpBOiqRgz0oGB8SsItCubq7vLscGidCB728AgsFFTTEuwmhLCsEGQECAb0QBiUOMCkiETYIxDUjEw0zFyAhy+q6QOu7QIEAOw==';
                        refreshDetails = Utils.createElement("A", {href: "javascript:void(0);", 'class': "refresh_details"}, [Utils.createElement("IMG", {src: refresh_gif})]);

			headerText.insertBefore(document.createTextNode(" "), headerText.firstChild);
			headerText.insertBefore(refreshDetails, headerText.firstChild);
			refreshDetails.addEventListener("click", function(){ Utils.runScript(
				"$.get('/game/index.php?page=eventList&session=" + Utils.session + "&ajax=1', function(response) { \
					window.DOM_GET_ELEMENT_BY_ID_CACHE = new Array(); \
					$('#eventboxContent').html(response); \
					$('#eventHeader .close_details').click(toggleEvents); \
				})"
			);	}, false);

		},

		// Add the arrival time and date in tooltip
		addArrivalDate: function()
		{
			//##### RUNSCRIPT
		//	Utils.runScript('$("<div>").attr("id","initEventList_text").html(window.initEventlist.toString()).css("display","none").appendTo("body");');
			Utils.$("<div>").attr("id","initEventList_text").html(window.initEventlist.toString()).css("display","none").appendTo("body");

			var initEventList_text = document.getElementById('initEventList_text');
			if (initEventList_text) initEventList_text = initEventList_text.innerHTML;
			if (!initEventList_text) return;

			var list = initEventList_text.split(';');
			for (var i=0; i<list.length; i++)
			{
				var id_time = list[i].match(/getElementByIdWithCache\("(.*?)"\),\s*(\d+)/i);
				if (id_time)
				{
					var countdown = document.getElementById(id_time[1]);
					if (countdown)
					{
						var arrivalDateTime = DateTime.getFinishTime(id_time[2]);
						arrivalDateTime = DateTime.formatDate(new Date(arrivalDateTime), '[Y]-[m]-[d] [H]:[i]:[s]');
						countdown.setAttribute('title', arrivalDateTime);

						if (countdown.nextElementSibling)
							countdown.nextElementSibling.setAttribute('title', arrivalDateTime);
					}
				}
			}
		},

		Show: function(eventListWrap)
		{
			if (Options.timeSetting == 1)
				this.changeTime();

			this.addRefreshButton(eventListWrap);

			setTimeout(this.addArrivalDate, 0);

			var rows = Utils.XPath('descendant::*[contains(@class,"eventFleet") or contains(@class,"partnerInfo") or contains(@class,"allianceAttack")]', eventListWrap);
			var acsID, row, mainrow;
			var fleetType; // 0: hostile, 1:neutral, 2:friendly
			var fleetTypeNames = ['hostile', 'neutral', 'friendly'];

			for (var i=0; i<rows.snapshotLength; i++) {
				row = rows.snapshotItem(i);

				fleetType = this.getFleetType(row);
				if (fleetType != 2)
					row.className += ' ' + fleetTypeNames[fleetType];

				// show ships/cargo
				if (Options.evt_expandFleetsEvt && row.className.indexOf('allianceAttack') == -1)
				{
					var url = Utils.getElementByClassName('tipsTitleArrowClose', row);
					url = url && url.getAttribute('href');

					if (url)
					{
						(function (url, source_row) {
							var xhr = new XMLHttpRequest();
							xhr.open('GET', url, true);
							xhr.onreadystatechange = function()
							{
								if (xhr.readyState == 4 && xhr.status == 200)
									EventList2.showFleetDetails(source_row, xhr.responseText);
							};

							xhr.send(null);
						})(url, row);
					}
				}

				// mark reverse fleets
				if (row.querySelector('.icon_movement_reserve'))
					row.className += ' reverse';
			}
		},

		onDOMNodeInserted: function(e)
		{
			if(!e || !e.target || !e.target.id || e.target.id != "eventListWrap") return;
			EventList2.Show(e.target);
		},

		Run: function()
		{
			this.insertCSSRules();

			var eventListWrap = document.getElementById('eventListWrap');
			if (eventListWrap)
				EventList2.Show(eventListWrap);
			else
			{
				var eventboxContent = document.getElementById('eventboxContent');
				if (eventboxContent)
					eventboxContent.addEventListener('DOMNodeInserted', EventList2.onDOMNodeInserted, false);
			}
		}
	};






	// =======================================================================
	// Finish time
	// =======================================================================
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
	};







	// =======================================================================
	// Functions for Fleet movement view
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
			return Ogame.getMissionClass (mission.innerHTML);
		},

		cssFleetColors: function()
		{
			if (this.cssColorsAdded) return;
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
			this.cssColorsAdded = true;
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
					mission.innerHTML += ' ('+Lang.Labels.mvmt_Return+')';

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
			} catch(e) { Utils.log(e); }
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
			} catch (e) { Utils.log(e); }

		},

		Run: function()
		{
			if (!Options.mvmt_expandFleets && !Options.mvmt_showReversal) return;

			this.insertCSSRules();

			this.tipsClass = 'tipsTitleSmall';

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
	};







	// =======================================================================
	// Resource Calculator
	// =======================================================================
	var Calculator =
	{
		insertCSSRules: function()
		{
			Utils.insertCSSRule('#calculator { margin: 3px 0; padding: 1px 0; background-color: #13181D; border: 3px double black; width: 633px; }');
			Utils.insertCSSRule('#calculator table { width:620px; margin: 0 auto; }');
			Utils.insertCSSRule('#calculator td, #calculator th, #calculator input { text-align:right;}');
			Utils.insertCSSRule('#calculator select, #calculator option { text-align:center;}');
			Utils.insertCSSRule('#calculator #calc_res input, #calculator #calculator #calc_coords { width:100px; }');
			Utils.insertCSSRule('#calculator #calc_sl { font-size:11px;}');
			Utils.insertCSSRule('#calculator option { padding-right:3px;}');
			Utils.insertCSSRule('#buttonz { height:auto !important; }');
			Utils.insertCSSRule('#fleet1 #buttonz #calculator a { text-decoration:underline !important; color:#5577EE; }');
			Utils.insertCSSRule('#calculator td, #calculator th { border:1px solid grey; padding: 1px 3px;}');
			Utils.insertCSSRule('#calculator #calc_g {width:14px;}');
			Utils.insertCSSRule('#calculator #calc_s {width:27px;}');
			Utils.insertCSSRule('#calculator #calc_p {width:16px;}');
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
				var list = [202,203,209,214];

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

			} catch (e) { Utils.log(e); }
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
				return '<td colspan="3"><a href="javascript:void(0);" ref="'+id+'">0</a></td>';
			}
			function addResLink(res) {
				return '<th colspan="4"><a href="javascript:void(0);" id="calc_hdr_'+res+'">'+Lang.Labels[res]+'</a></th>';
			}
			function addResInput(res) {
				return '<td colspan="4"><input type="text" id="calc_'+res+'" value="0"></td>';
			}
			function addShipCons(id) {
				return '<td colspan="3" ref="'+id+'"></td>';
			}
			function addShipDur(id) {
				return '<td colspan="3" ref="'+id+'"></td>';
			}
		//##### Cleanup RIP
		/*
			function addShipLink(id) {
				return '<td><a href="javascript:void(0);" ref="'+id+'">0</a></td>';
			}
			function addResLink(res) {
				return '<th><a href="javascript:void(0);" id="calc_hdr_'+res+'">'+Lang.Labels[''+res]+'</a></th>';
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
			*/
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
				} catch (e) { Utils.log(e); };

				slinks.sort(function(a,b){ return (a.galaxy-b.galaxy) || (a.system-b.system) || (a.planet-b.planet); });
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

				var btnSave = '<td><a id="calc_save" href="javascript:void(0);">'+Lang.Labels.Save+'</a></td>';
				var btnClear = '<td><a id="calc_clear" href="javascript:void(0);">'+Lang.Labels.Clear+'</a></td>';

				var calc = document.createElement('div');

				calc.id = 'calculator';
				calc.innerHTML = '<table>' + 
					'<tr id="calc_res_hdr"><th></th>'+addResLink('metal')+addResLink('crystal')+addResLink('deuterium')+'<th>'+Lang.Labels.total+'</th></tr>' +
					'<tr id="calc_res"><td></td>'+addResInput('metal')+addResInput('crystal')+addResInput('deuterium')+'<td id="calc_total">0</td></tr>' +
					'<tr><th></th><th colspan="3">'+Lang.Labels.shipSCargoAlt +'</th><th colspan="3">'+Lang.Labels.shipLCargoAlt +'</th><th colspan="3">'+Lang.Labels.shipRecyclerAlt+'</th><th colspan="3">'+Lang.Labels.shipRIPAlt+'</th><th>'+coords+'</th></tr>' +
					'<tr id="calc_ships"><th>'+Lang.Labels.Quantity+'</th>'+addShipLink(202)+addShipLink(203)+addShipLink(209)+addShipLink(214)+addSL()+'</tr>' +
					'<tr id="calc_cons"><th>'+Lang.Labels.Consumption+'</th>'+addShipCons(202)+addShipCons(203)+addShipCons(209)+addShipCons(214)+btnClear+'</tr>' +
					'<tr id="calc_dur"><th>'+Lang.Labels.Duration+'</th>'+addShipDur(202)+addShipDur(203)+addShipDur(209)+addShipDur(214)+btnSave+'</tr>' +
					'</table>';
				parent.appendChild(calc);
				//##### Cleanup RIP
/*
				calc.id = 'calculator';
				calc.innerHTML = '<table>' +
					'<tr id="calc_res_hdr"><th></th>'+addResLink('metal')+addResLink('crystal')+addResLink('deuterium')+'<th>'+Lang.Labels.total+'</th></tr>' +
					'<tr id="calc_res"><td></td>'+addResInput('metal')+addResInput('crystal')+addResInput('deuterium')+'<td id="calc_total">0</td></tr>' +
					'<tr><th></th><th>'+Lang.Labels.shipSCargoAlt+'</th><th>'+Lang.Labels.shipLCargoAlt+'</th><th>'+Lang.Labels.shipRecyclerAlt+'</th><th>'+coords+'</th></tr>' +
					'<tr id="calc_ships"><th>'+Lang.Labels.Quantity+'</th>'+addShipLink(202)+addShipLink(203)+addShipLink(209)+addSL()+'</tr>' +
					'<tr id="calc_cons"><th>'+Lang.Labels.Consumption+'</th>'+addShipCons(202)+addShipCons(203)+addShipCons(209)+btnClear+'</tr>' +
					'<tr id="calc_dur"><th>'+Lang.Labels.Duration+'</th>'+addShipDur(202)+addShipDur(203)+addShipDur(209)+btnSave+'</tr>' +
					'</table>';
				parent.appendChild(calc);
*/
				this.container = calc;

				Utils.$('#calculator input')
					.bind('keyup', function(){Calculator.checkInput(this); Calculator.calculate();
					})
					.bind('focus',function(){this.value='';Calculator.calculate();})
					.bind('blur', function(){if (!this.value)this.value='0';})
				;
				Utils.$('#calculator #calc_ships a').bind('click', function(){ FleetSend.setShips('ship_'+this.getAttribute('ref'), Utils.parseInt(this.innerHTML)); });
				Utils.$('#calculator #calc_res_hdr a').bind('click', function()
					{
						var res = this.id.replace('calc_hdr_','');
						var value = Utils.getIntById('resources_'+res);
						document.getElementById('calc_'+res).value = value;
						Calculator.calculate();
					})
					.trigger('click');

				Utils.$('#calc_save').bind('click',function(){setTimeout(function(){Calculator.save(); },0); });
				Utils.$('#calc_clear').bind('click',function(){setTimeout(function(){Calculator.clear(); },0); });
				Utils.$('#calc_sl').bind('change',function(){
					if (!this.value) return;
					var coords = this.value.split('#');
					Calculator.writeValue('calc_g',coords[0]);
					Calculator.writeValue('calc_s',coords[1]);
					Calculator.writeValue('calc_p',coords[2]);
					Calculator.calculate();
					});
			} catch (e) { Utils.log(e); }
		}

	};







	// =======================================================================
	// functions for Send fleet pages
	// =======================================================================
	var FleetSend =
	{

		Fleet1_Run: function()
		{
			try {

				if (Options.fleet1_Layout) {
					Utils.insertCSSRule('a.max.tipsStandard { display:none !important; }');
					Utils.insertCSSRule('#fleet1 #buttonz div ul li input { width: 66px; height: 12px; line-height: 12px; font-size: 11px; top: 83px; left: 6px; }');
					Utils.insertCSSRule('div.secondcol.fleft { margin-right:70px; }');
				}

				var unsafe = Utils.unsafeWindow;

				if (Options.fleet2_setTargetDF) {
					unsafe.old_trySubmit = unsafe.trySubmit;
					unsafe.trySubmit = function () { FleetSend.checkRecyclers(); unsafe.old_trySubmit();
					};
				}

				if (Options.fleet1_killTips) {
					Utils.killCluetips();
				}

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
				SimpleTable.addCell(Lang.Labels.resources, res);

				if (no_fleet) {
					Utils.insertCSSRule('.total_capacity {margin: 2px 25px;}');

					SimpleTable.addCell(Lang.Labels.shipSCargo, scargo);
					SimpleTable.addCell(Lang.Labels.shipLCargo, lcargo);
					newDiv.innerHTML = '<table>' + SimpleTable.createTableString(1) + '</table>';
					parent.appendChild(newDiv);
				}
				else {
					Utils.$('form li')
						.filter( function() {return !isNaN(this.id.replace('button','')); } )
						.each( function(){FleetSend.addSpeed(this); });

					SimpleTable.addCell(Lang.Labels.TotalCapacity,0, '', 'total_capacity');

					if (!Options.fleet1_showResCalc) {
						SimpleTable.addHref(Lang.Labels.shipSCargo, scargo, 'SCargo');
						SimpleTable.addHref(Lang.Labels.shipLCargo, lcargo, 'LCargo');
					}

					SimpleTable.addCell(Lang.Labels.ExPoints,0, '', 'expoints');
					SimpleTable.addCell(Lang.Labels.MinSpeed,0, '', 'min_speed');

					newDiv.innerHTML = '<table>' + SimpleTable.createTableString(1) + '</table>';

					var prev = Utils.getElementByClassName('combatunits', parent) || Utils.getElementByClassName('secondcol', parent);
					Utils.insertAfter(newDiv, prev);

					if (!Options.fleet1_showResCalc) {
						document.getElementById('SCargo').addEventListener('click', function (){ FleetSend.setShips('ship_202', scargo); return true; }, false );
						document.getElementById('LCargo').addEventListener('click', function (){ FleetSend.setShips('ship_203', lcargo); return true; }, false );
					}

					unsafe.old_checkShips = unsafe.checkShips;
					unsafe.checkShips = function(form) { FleetSend.showCapacity(); unsafe.old_checkShips(form);	};
				    Utils.$('input.fleetValues').bind('focus', function(){ FleetSend.showCapacity(); } );
				}
			} catch (e) { Utils.log(e);	}
		},

		checkRecyclers: function()
		{
			var recyclers = false;
			var value = document.getElementById('ship_209').value;
			if (value && !isNaN(value) && parseInt(value, 10)>0) recyclers = true;

			setTimeout( function(){ Utils.setValueUni('fleet1_recyclers', recyclers); }, 0);
		},

		Capacity_insertCSSRules: function()
		{
			Utils.insertCSSRule('.total_capacity td {padding: 2px 5px; /*color: #A1A1A1;*/ font-size: 11px;}');
			Utils.insertCSSRule('.total_capacity #total_capacity {color: green;}');
			Utils.insertCSSRule('.total_capacity td.capacity_href {text-decoration: underline; color: #5577EE;}');
			Utils.insertCSSRule('.speed { position: absolute; top: ' + (Options.showNames ? 34 : 8) + 'px; right: 3px; max-width: 76px; '
				+ 'color: white; text-align: right; font-size: 10px; background: transparent url("'+Utils.bg+'") repeat; }'
			);
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

		setShips: function(ship_id, cnt)
		{
			var node = document.getElementById(ship_id);
			if (!node || node.disabled) return;
			node.value = cnt;
			Utils.trigger(ship_id,'change');
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
			} catch (e) {Utils.log(e);}
			return true;
		},

		// =======================================================================
		Fleet2_Run: function()
		{

			this.Fleet2_insertCSSRules();

			if (Options.fleet2_checkProbeCapacity) {
				var w=Utils.unsafeWindow;
				w.getFreeStorage = function()
				{
					var s = w.storageCapacity, c=w.consumption, ps=w.probeStorageCapacity;
					return (s==ps)? s-c : s-c - (ps-w.getConsumption(210));
				};
			}

			var activePlanet = Ogame.getActivePlanet();
			var activelink = this.Fleet2_getSLinkFromPlanet(activePlanet);

			var nextPlanet = Utils.XPathSingle('parent::*/following-sibling::*/A[contains(@class,"planetlink")]', activePlanet);
			var nextlink = (nextPlanet) ? this.Fleet2_getSLinkFromPlanet(nextPlanet) : '';

			this.Fleet2_insertShortLink(activelink, nextlink);

			var shortlinks = Options.fleet2_ShortLinks.split(',');
			for (var i=0; i<shortlinks.length; i++) {
				this.Fleet2_insertShortLink(shortlinks[i]);
			}
			if (Options.fleet2_setTargetDF && Utils.getValueUni('fleet1_recyclers')) {
				setTimeout(function(){Utils.$('#dbutton').click();}, 100);
			}
			
			if (this.Fleet2_isTargetEmpty()) {
				this.Fleet2_setCoords();
			}
			
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

			//Utils.runScript("$('#speed option').bind('mouseover', function(){ this.parentNode.value = this.value; updateVariables(); });"); // Old code
			// To remove color - Changing color with mouseover disturbs hover
			if (Options.fleet2_Layout)
				Utils.$('#speed').click( function() {this.style.color = '#848484'});
			// färbt die Options ein - Werte holen aus dem Array dann ist es perfekt
			//	Utils.$('#speed').click( function() {this.style.color = 'red'});

			Utils.$('#speed option').mouseover(
				function(){
					this.parentNode.value = this.value;
					Utils.unsafeWindow.updateVariables();
				}
			);

			if (Options.fleet2_expandLists) {
				this.Fleet2_expandSpeed();
				this.Fleet2_expandShortLinks();
			}
		},

		Fleet2_insertCSSRules: function()
		{
			Utils.insertCSSRule('.anti_moon { background-color: ' + Options.fleet2_MoonColor + '; }');	 // .slMoon a

			//if (Options.fleet2_fixLayout)
			//	Utils.insertCSSRule('#fleetBriefingPart1, #fleetBriefingPart1_2 { margin-left:40px; }');

			if (Options.fleet2_expandLists) {
				Utils.insertCSSRule('#fleetBriefingPart1, #fleetBriefingPart1_2 { margin-left:40px; }');
				Utils.insertCSSRule('#fleetBriefingPart1, #fleetBriefingPart1_2 { margin-bottom:-5px; }');
				Utils.insertCSSRule('#speed_plain { list-style-type: none; position: relative; top: 15px; }');
				Utils.insertCSSRule('#slPanel a, #speed_plain a { text-decoration: none; font-weight: 100; color: #AAAAAA; }');
				Utils.insertCSSRule('#slPanel a { font-size: 11px; padding: 1px 0px; }');
				Utils.insertCSSRule('#speed_plain a { font-size: 12px; padding: 3px 1px; }');
				Utils.insertCSSRule('#slPanel a:hover, #speed_plain a:hover { color: white; background-color: #0A246A;}');

				Utils.insertCSSRule('#slPanel {	width: 669px; padding: 0px; margin: 0px auto; background-image: url("http://gf1.geo.gfsrv.net/cdn46/02fe767c2729dcf9e742233a5f1b26.gif"); }');
				Utils.insertCSSRule('#slPanel table { width: 640px; margin: 0px auto; padding: 0px; }');
				Utils.insertCSSRule('#slPanel th { color: #6F9FC8; font-weight: bold; padding: 7px 0px 5px 10px; min-width: 180px; text-align: center; }');
				Utils.insertCSSRule('#slPanel td { padding: 1px 0px; padding-left: 5px; white-space: nowrap; }');

				if (Options.fleet2_expandMoonColor)
					Utils.insertCSSRule('.slMoon a { background-color: ' + Options.fleet2_MoonColor + '; }');
			}
		},

		Fleet2_insertShortLink: function(link,nextlink)
		{
			try {
				var parts = this.Fleet2_getPartsFromLink(link);
				if (!parts) return;
				if (!parts.name) link += '#';

				var slbox = document.getElementById('slbox');
				if (!slbox) return;
				var options = slbox.getElementsByTagName('option');
				var next;

				var nextparts = nextlink ? this.Fleet2_getPartsFromLink(nextlink) : null;

				for (var i=1; i<options.length; i++) {
					if (nextlink) {
						var curparts = this.Fleet2_getPartsFromLink(options[i].value);
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

				if (next) slbox.insertBefore(opt,next);
				else slbox.appendChild(opt);

			} catch (e) { Utils.log(e); }
		},

		Fleet2_getPartsFromLink: function(link)
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

		Fleet2_getSLinkFromPlanet: function(planet)
		{
			try {
				var coords = Ogame.getCoordsFromPlanet(planet);
				var res = coords.galaxy + '#' + coords.system + '#' + coords.planet + '#' + coords.type + '#' + coords.name;
				return res;
			} catch (e) { Utils.log(e); };
		},

		Fleet2_isTargetEmpty: function()
		{
			//check whether the coords have been already set
			var items = Utils.XPath('//*[@id="inhalt"]/descendant::*[@class="fleetStatus"]/UL/LI');

			for (var i=0; i<items.snapshotLength; i++)
				if ( Coords.read(items.snapshotItem(i).innerHTML, false) )
					return false;

			return true;
		},

		Fleet2_setCoords: function ()
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

		Fleet2_expandSpeed: function()
		{

			var html = '';
			for (var i=1; i<=10; i++) {
				html += '<a href="javascript:void(0);" rel="' + i + '"';
				html += (Options.fleet2_Layout) ? ' style="color: #'+Para.speedColors[i]+';">' : '>';
				html += (i*10) + '&nbsp;</a>';
			}

			Utils.$('<li>').attr("id","speed_plain").html(html + '%').appendTo("#fleetBriefingPart1");

			Utils.$('#speed_plain a').click(
				function(){
					Utils.$('#speed').val(Utils.$(this).attr('rel'));
					if (Options.fleet2_Layout) {	document.getElementById('speed').style.color = this.style.color};
					Utils.unsafeWindow.updateVariables();
				}
			);

		},

		Fleet2_expandShortLinks: function()
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
					parts = this.Fleet2_getPartsFromLink(sl);
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
					parts = this.Fleet2_getPartsFromLink(sl);

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
			catch (e) { Utils.log(e); }

		},

// =======================================================================
		Fleet3_Run: function()
		{
			this.setMission();
			this.setResources();
			//this.showACStime();
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
				if (missions[i]>0 && document.getElementById('button' + missions[i]).className == 'on' ) {
					setTimeout(function(){Utils.$('#missionButton' + missions[i]).click();}, 100);
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
			this.intervalACS = setInterval(function(){FleetSend.checkACStime(); }, 1000);

			var li = document.createElement('li');
			li.style.color = 'yellow';
			li.innerHTML = Lang.Labels.ArrivalACS+': <span class="value" id="timeACS">'+DateTime.formatDate2(this.dateACS)+'</span>';
			Utils.insertAfter(li, document.getElementById('aks') );

			// fixing layout
			var h = Utils.XPathSingle('//*[@id="roundup"]/descendant::UL').offsetHeight;
			if (h > 125) {
				h -= 125;
				var div = Utils.XPathSingle('//*[@id="sendfleet"]/DIV');
				if (div) div.style.paddingTop = '' + (parseInt(div.style.paddingTop) + h) + 'px';
			}
		}
	};







	// =======================================================================
	// functions for Galaxy view
	// =======================================================================
	var Galaxy =
	{
	
		Run: function()
		{
			this.insertCSSRules();

			if (Options.galaxy_killTips) {
				this.killTips();
			}

			document.body.addEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);

			//##### OPERA
			// A  Workaround for Opera - Since 11.10 galaxy sometimes is not ready - so try again
			if (document.getElementById('galaxytable')) {
				Galaxy.redrawGalaxy();
			}
		},
		
		insertCSSRules: function()
		{
			Utils.insertCSSRule('.allytag a {text-decoration:none; color:#CFCBC2; }'); 
		},

		killTips: function()
		{
			var selector = "";
			//##### Cleanup - It's false to kill all tips and renew those to keep
			var tipsClass = 'tipsGalaxy';
			if (Options.galaxy_keepTipsPlanets) selector = '.microplanet, .moon .'+tipsClass;
			if (Options.galaxy_keepTipsDebris) selector += (selector?',':'') + '.debris .'+tipsClass;

			var initCluetip = function()
				{
				if (selector)
					Utils.$(selector).cluetip("destroy")
						.cluetip({local:true,cluetipClass:"galaxy",width:250,showTitle:false,delayedClose:500,mouseOutClose:true,hoverIntent:false,clickThrough:false,sticky:true});
			};

			Utils.unsafeWindow.initCluetip = initCluetip;
		},

		onDOMNodeInserted: function(e)
		{
			if(!e || !e.target || !e.target.id || e.target.id != "galaxytable") return;
			Galaxy.redrawGalaxy();
		},

		redrawGalaxy: function ()
		{
			try {
				// prevent double execution
				var container = document.getElementById('galaxytable');
				if (container.getAttribute('antigame_processed')) return;
				container.setAttribute('antigame_processed', '1');

				document.body.removeEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);

				var rows = Utils.XPath('//*[@id="galaxyContent"]/descendant::*[@class="row"]');
				for ( var i=0; i<rows.snapshotLength; i++ ) {
					var row = rows.snapshotItem(i);

					if (Options.galaxyShowRank)
						this.showRank(row);
					if (Options.galaxyShowAllyRank)
						this.showAllyRank(row);
					this.showDebris(row);
					this.showCurrent(row);
					this.showMoon(row);

					this.highlightAllyPlayer(row);

				}

        //MODIFICA

        var offset = 2;

        for (pianeta = 1; pianeta <= 15; pianeta++){
          oggetto = '/html/body/div/div[2]/div/div[@id=\'contentWrapper\']/div[2]/div[2]/table/tbody/tr[';
          oggetto += pianeta+offset;
          oggetto += ']/td[@class=\'debris\']/div/div/div/ul[@class=\'ListLinks\']/li[4]/a';
          element = document.evaluate(oggetto, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
          if(element){
            link = 'index.php?page=fleet1&galaxy='+galaxy+'&system='+system+'&position='+pianeta+'&type=2&mission=8';
            oggetto2 = '/html/body/div/div[2]/div/div[@id=\'contentWrapper\']/div[2]/div[2]/table/tbody/tr[';
            oggetto2 += pianeta+offset;
            oggetto2 += ']/td[@class=\'debris\']/div/div/div/ul[@class=\'ListLinks\']';
            element2 = document.evaluate(oggetto2, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
            var newNode;
            nodo = document.createElement('li');
            nodo2 = document.createElement('a');
            nodo2.href = link;
            nodo2.innerHTML = 'Recycle';
            nodo2.style.color ='red';
            nodo.appendChild(nodo2);
            element2.appendChild(nodo);
          }
        }

				document.body.addEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);
			}
			catch(e) { Utils.log(e); }
		},

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
			catch (e) { Utils.log(e); }
		},

		showDebris: function (row)
		{
			try {
				var debris = Utils.getElementByClassName('debris', row);

				var link = Utils.getElementByClassName( 'tipsGalaxy', debris);

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
			} catch (e) { Utils.log(e); }
		},

		showMoon: function (row)
		{
			try {
				if (Options.galaxyHideMoon) {
					var mainNode = Utils.$('.moon .tipsGalaxy img', row).hide().parent();
					mainNode.append(Utils.$('<div>' + mainNode.parent().find('span#moonsize').text() + '</div>'));
				}
			} catch (e) { Utils.log(e); }
		},

		showRank: function (row)
		{
			try {
				var player = Utils.getElementByClassName('playername', row);
				//##### Cleanup
			//	var rank = Utils.parseInt( Utils.$(player).find('.rank').text() );
			//##### 2.x+ 3.0
				var rank = Utils.parseInt( Utils.$('li.rank', player).text() );
				
			// 3.0
			//	var rank = Utils.parseInt( Utils.$('li.rank a', player).text() );
				
				if (rank > 0)
				{
					var newNode;
					//##### 2.x
					if (Para.ogame_version < 3000000) { 

						if (Options.galaxy_killTips) {
							newNode = document.createElement('a');
							newNode.href = 'index.php?page=statistics&session='+Utils.unsafeWindow.session+'&start='+rank;
						}
						else
							newNode = document.createElement('span');
						}
					else {

						var href = Utils.$('li.rank a', player).attr('href');
						
						newNode = document.createElement('a');
						if (href) {
							newNode.href = href;
						}
					
					}
						
					newNode.className = 'anti_rank';
					newNode.innerHTML = ' #'+rank;

					var color = Options.galaxyRankColor;

					if (rank<=10) color=Options.galaxyRank10;
					else if (rank<=50) color=Options.galaxyRank50;
					else if (rank<=100) color=Options.galaxyRank100;
					else if (rank<=200) color=Options.galaxyRank200;
					else if (rank<=800) color=Options.galaxyRank800;

					newNode.style.color = color;
					player.appendChild(newNode);
				}
			} catch (e) { Utils.log(e); }
		},

		showAllyRank: function (row)
		{
		
		//##### Cleanup
		//##### 2.x
			if (Para.ogame_version < 3000000) {
				this.showAllyRank2x(row);
				return;
			}
			
			var ally = Utils.getElementByClassName('allytag', row);
			if (ally) {

				var rank = Utils.parseInt( Utils.$('li.rank a', ally).text() );	
				var members = Utils.parseInt( Utils.$('li.members', ally).text() );
				var href = Utils.$('li.rank a', ally).attr('href');

				if (rank > 0) {

					// Killing tooltip body and inserting links to ally info
					if (Options.galaxy_killTips) {
						var siteurl = Utils.$('a[target="_ally"]', ally).attr('href');	
						var tooltip = Utils.XPathSingle('descendant::DIV[contains(@id,"alliance")]', ally);
						if (siteurl && tooltip) {
							var allyname = tooltip.parentNode;
							allyname.removeChild(tooltip);
							allyname.innerHTML = '<a href="' + siteurl + '" target="_ally">' + allyname.innerHTML + '</a>';
						}
					}
					
					var str = ' #' + rank;
					if (members > 0) str += '/'+members;

					var newNode = document.createElement('a');
					if (href) {
						newNode.href = href;
					}
						
					newNode.className = 'anti_allyrank';
					newNode.innerHTML = str;
					newNode.style.color = Options.galaxyRankColor;

					ally.appendChild(newNode);

				}
			}

		},

		//##### 2.x
		showAllyRank2x: function (row)
		{

			var ally = Utils.getElementByClassName('allytag', row);
			if(!ally) return;

			var rank = Utils.parseInt( Utils.$(ally).find('.rank').text() );
			var members = Utils.parseInt( Utils.$(ally).find('.members').text() );

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

		}
		
		

	};







	// =======================================================================
	// Functions for Jump gate
	// =======================================================================
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
	};







	// =======================================================================
	//
	// =======================================================================
	var Names =
	{
		// workaround for weird Firefox behaviour with images containing NO alt attribute
		showImgAlt: function(img)
		{
			if (isFirefox && img.clientWidth == 0) {
				img.style.display = 'none';
				setTimeout(function(){img.style.display = 'inline'; }, 150);
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
			} catch (e) { Utils.log(e); }
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


					img.setAttribute('alt',  Lang.Labels[''+id]);
					this.showImgAlt(img);
				}
			} catch (e) { Utils.log(e); }
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

			} catch (e) { Utils.log(e); }
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
			} catch (e) { Utils.log(e); }
		},

		Show: function()
		{
			if (Utils.isCurrentPage('fleet1,resources,station,station-moon,research,shipyard,defense,techtree') )
				this.showBuildingNames();

			this.showResNames();
		}

	};






	// =======================================================================
	// Messages functions
	// =======================================================================
	var Messages =
	{

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
			else {
				this.Show();
			}
		},

		insertCSSRules: function()
		{

			if (Options.msg_expandBox >= 1) {
				expand = Options.msg_expandBox * 100
				Utils.insertCSSRule( '#TB_iframeContent { height: ' + (612 + expand) + 'px !important; }');
				Utils.insertCSSRule( '#messagebox { height: ' + (504 + expand) + 'px !important; }');
				Utils.insertCSSRule( '#messagebox .textWrapper { height: ' + (335 + expand) + 'px !important; }');
				Utils.insertCSSRule( '#messagebox .textWrapper div.note { height: ' + (295 + expand) + 'px; }');
			}

			if ( Utils.isCurrentPage('messages') ) {

				var formular_buttons_gif = 'data:image/gif;base64,R0lGODlhsABsAOZ/AEllgG6VtnegwmqLqH2jwHGXumSBnT5WbZW514Oqy0FcekJbdEBZcVlzjkBbdztQZzlPZDVJXWGAnHacvz9ad3mcunCVtkJffkRgf0poh01sjnCSr0hifUpoiICmx3aZtkRignCYuk9ti0Vhe22TtHmhxD5ZdURdeJKxzKG91j1TanOZvEJefHaYuHCTsEZkhH+mx0Vjg2yHpXedu2iHpFl1j3OWs22PrWWGoXqgvXScvkVigneewXygvXeewkNgfkVjgm2Pq3OUs3ObvmiIpEdjfWOAnFl1kEdjfjhMYGeGoWyIpXSbvn2iwmWEoUpniH+kx0FefHGZvD1XcUVhgoay1X+iwXedwnOcvoSu0U5xlWuQsV55lFBzmFd1j2uMqBMcJqTE3meEoW6QrnGUsjtTaj1Ua1FxkDdLYG6Us4ivzURddm6SskNggGuPr3CNqj9Yc1d6oD9adHScwEBadX+jx3ykx0Bcd2WGqURhf32hwXadv4CoyjhMYSQpLwc6VCH5BAEAAH8ALAAAAACwAGwAAAf/gH9/foSFhoeIiYqLjI2Oj5CRkpOUfoKDEWgRm5ydnp+goaKjpKWmp6ipqqialmAHZUl9s7S1trd9Sbq7vLy4ub2+tcHEsrjFwb/HyMK3zM3K0WhmB2B+sNHZ2tvc3d7f4OHitmUHhFNTEOrr7O3u7/Dx8vP09fb3+Pn56IQLUw8AAwocSLCgwYMIEypcyLChw4cPpywgtGaKiotmLmrcyLGjx48gQ4ocSbKkyZMoQ2a8OGUNoRFwDsicSbOmzZs4c+rcybOnz59AgwaFM4IQEjkMkipdyrSp06dQo0qdSrWq1atYscpBQggAhQVgw4odS7as2bNo06pdy7at27dv/+kAIJTBwYm7ePPq3cu3r9+/gAMLHky4sGHDDjIQ0uBghOPHkCNLnky5suXLmDNr3sy5c2cHGhYr4ICkiOkiSFKrXr0aderTsGO7Zl1a9unXqm3Lpv1aN+zcvGn7/s17+G3cwVn/5rAgtJ8zFABIn069uvXr2LNr3869u/fv4MOHp3CG0BMT6NOrX8++vfv38OPLn0+/vv37+E08IdTBgQMKAAbo34AEFhjggQgKWCCBCSr4X4MNLsgghAlKaCCFB1roH4YIanhhhg50wJ8CJJZo4okopqjiiiy26OKLMMYo44w0RiGiHxpEwcKOO+rI448/RiEkkEQWaaSRQvp45P+STCI5ZJNQRumkkkdSuaNzGlyg5ZYX/ODll2CGGSaXZJZpppliennmmmxumeabYrYpJ5pw1mmmc1rkoWcebezp559+YgDooIQWCqighiaq6KGLNuoooYg22ueeWhCixQ6YZqrppppS4SmnoIYqaqefjmrqqZx6SgWqrLaaaqmu7lCpH128EMOtuOaqK65A9Orrr8D6umuuwRZrbLDD8nqsscnGsOyvzTr7LLLRDvtCF4TU+sK23Hbr7bfgglttDOGWG+645qar7rforutuuNj6EccT9D7RQQf23qvvvvvmy++/AAccsL8CF2wwwAQfrPDCCC+cb71PxEEIDVw0YPH/xRhnrPHGHHfs8ccghyzyyCSXXDIXNFjiBw1vLLGEDDK4DPPMNNP8cs04w+zyzjzvnPPMN/9sc89EC11z0EYnTXTRSevcdMw3u/xGypdUYvXVWGet9daUXDII12CHLfbYZFfdABc1eOFFDWy37fbbcMct99x012333Xjnrffec6tdAxfl/QHGFwMYYYQBhiNu+OKMM65445BHLrnkj09u+eWRV4755pxnzrniig/whTVjDGDA6ainrvrqrLfu+uuwxy777LTXbrvtA4xByBhuiOGEGErg4IQTShRv/PHB4yD88Mo37/zz0Ecf/fBOSG/99dMzrzzyx2uP/ffWU988//fIM6+E72K4obsfZGxBBBE0wP/+/PTXDz8N+Oev//7898//+/4LoAAHqD/71Y+ACExg/AxowPgtcAtkIMQHtjCAChKughjMoAY3yMEOevCDIAyhCEdIwhKa0IMXHMAWPkCICrDhBjcIAgxnSMMaxjAIMrwhDnfIwx3aEIY9DCIOgSjEIP5Qh0X0oQ6PSMQkKtGGTuRhE5kIRRiyoQKEyEEaXMDFLnrxi2AMoxjHSMYymvGMaEyjGte4xjTkgBBNIIMN5khHGwjhjnjMox7zWMc++vGPf9zjHQFJyELSUZCI3KMhFxnIRCbyj2RoAiE8YIEWWLIFH7ikJjeJyQ9kkv+ToAylKC/pyU+O8pSo3GQpU8nKVnJylag0ZQss4AFCJCAAM6iALnc5g1768pe+5CUwh9nLXRqzAsQEpjCT+ctjLpOZxdQlNHM5zWA6E5nVzKU0q3nNACSAEGqwQA9y0INyjjMH6EynOtN5TnKa853wXCc74flOdLaTnviUpz3xGU976lOe/OwnQANqTnb+c6DlJGcB1ADOADSBAHogAAEeKtGKWlSiVshoEyh60Y5OdKMg3ahHK5pRK4h0pBcNaUhRmtImlBSlHGXpR1UaU5Zu9KUypWhEmxAAhvoBCiQIqlCHStSiGvWoSE2qUpfK1KY69alQjSoJoEAIGATAAlj/zWoAtsrVrnZVq14N61azSlYLiNWrYD3rV8uKVbWita1uNatbucpWuM71qnadK1sDAANC8KEABQgBYAdL2MIa9rCHDYFiF8tYxDr2sYyNrGAfS9nKJlayi7WsZhMLWD7YcgWgDa0UQkva0krhtKVNrWpXu9rTjpa1sI0ta10r29radraoje1rSftNP2SBCcANLhN0QNziGve4xcUCFobA3OY697nQje4QkKtc6Vr3us1VLnK3a9zqYve70NUud8cr3OBmgRBZ0MEe9qCDOahXveuNr3zjO4H52ve++M3vHuqr3/761778/a+ABwzg/77XvevVwXn9UAUf8ODBEPaB/4QnTGEJX+HCEM6whh9c4Q47eMM8uPAVQAxiD1eYxBsWsYk/jGIOr1jCLc6wil/M4ghXgRBVEICOd8zjHvv4x0AOspCHTOQiG/nISE6ykgVwYwaX4MlQjrKUp0zlKlv5yljOspa3zOUue/nLJWgyAuoAhTLDwANQgIGa18xmNkPBA3Bus5znTOc5vznOdc6zntcMZzTrGc97DvSc+5zmQL8ZBmWGQh0QQIgwIAAFkI60pCdN6Upb+tKYzrSmN83pTnv6059GQBhUloIwpODUqE61qlfN6la7+tWwjrWsZ03rWtua1qa2hCDIxute+/rXifAasIfdCGEP22vITrayl//N7Gb7IROriLa0p72JVuwa2tQmhbWbze1ue/sVZRiHuMfdjWlUA9zkzoa5weDtdrtb2NhIt7znTYtyECLe9L6Fvd/Nb2/7AR36CLjAB86OA0yBEAxIB8HrMQUG6LrfEFe2H/wBkYpb/OICkUg//oHxhWg84iBHth8qopGVpOTkKDeJyVtCEYtgJOUeWblLQk7zQcBEKDjPuc5pQpSXxGTnPel5zUPuh6Nk5ehIT/pStmIUpCidKkwfOsj94BW4WP3qWBeLXLrylayvZetSj7gf6nKYspv97Hmhg2LGbhe0C0btDw/7u/0ggsZ45u54z/tjHCACQojgDnrXzB36Lvf/ftN9NMZJvOIXz3jGc0ABfaf7HTjQ+MoXgQODj3vh/Q0d8Xj+86CnDnkI0fnQd2f0m5/7efLD+ta7Xj/meX199pN6d/uhPw8CkYc2xCEHSaj3vvdQhULEH97rfvcWGr6Iat9uHNHo+dCP/olAIxrpxyg0zPe3BohkpSIlSUrgr9KTltR9LHGfSd0/P5Cwn31u44hOdXrTnObvpvjLn0w/wBL87Q+nMuVf8+2XbH6QJ3syKY0SKY+SgIHyKAaYB7NCgHrSgAoIKA1YKQHobJcSKzugKhrYgZnCgRr4gJoCAphCgh64AyZogphigRe4bLRiK+OiK9NCLckyg8ASg7py/y3ZAoM42IM5iC0t6ILa8i5EyC3tUoRFGC9DiIRJCIBBOAjzUi/3Yi8ZUIVWeIVW+ARVuDBYaIVcmAFa2IVdiC9TWC8SIy8QU4VhKIZsKIZhCDES84QCiAcVYzJ2eId4eDFcgAeEQId5KDJ76IRPuDItEzVIIzSHiIhLwzNPEzNPIzNQMzW6RoiQCImNiDOVuASSKIcuSGyeiAjGBmyc2ImfWIpxR2yjKIBncwRqcwSu+IqwGIuyOIu0WIu2eIu02IqAM4mr2Iq4+IuuqIuBk4qCMDiFcziJ8zmds4yToznNmIxGIDpgYIwSgIwS4IzMeDjViDgSII3EOAg3YDq3M/+O5FiOqJM7uyOO5hg76PiNfsA7wwM8y0M+x9M84gM++Ag994gD9Gg85oM+6rM7vfM7wTM8/Rg8B6kE//g7AemO7QNA8sNA9qNAFDlAEjmREQlBhPCQ8rNAF/mR8+NA76OR7jhBGJRCJ5SSKjlCKbRCEkRBFrSSHNSSLOSOLgREVFRDShRFT6STPJlDPZmTOXRFLfRCOXmUR0mU7qhFbNSUTvmUXuRGWZQGG1CVVrkBUHmVVimV7hhHjeRIgsRIYnlIYBmWfhRJhEAAFvCVZWmWfWQBBCCILegHlKRJsiRKsORKeqlKnpRKskRLkxQAdhlLfqlJAVBL7pgAFqBNxpT/Tc8ETdeETdy0TdPkTDNgAb11S4z5mNnUTM7kTXJ5gX4QTuNUTwelTvdEUAmlT6q5muR0mqhZUD2wUOBUAKVZULCZm/U0mwzljmoQABIVUTJFUhk1nMZ5nASAU8YpnD0FTmmAnNB5UWnQm8ToB3YgVdiZndoZVHZACNe5nU3Vne5oVXt1V3glV3dVV+ipV3kVV2XFV341Vu9pnmdVnp7ljn8VWJu1n4OFWZnFn/s5WZ7lBwkgWJMFoJU1Wd+UmKm1W7jloLcVoaaVW7AFoSuQmRKaoaG1oNX5W+U1XOPFXd4FXiQ6BOIVosj1oUywYB5aXij6ojqgoufljumVYAgGuF/9FWAEtqPypaP5dWDwpWDoFaQ3yqPyBaQJNqPV2WAbRmM+IGIxFmE0FqUPNmMv1qRNxqQa5qROiqWhGYAMtmRiOqZkqmNZWqZHdmPuWAVg1qZu+qZPlqVwymVqWp1jlmhnVmh7dmceIGh+2maEJmiHlmh2wGh+cKdm5md/amd9SqiM5o6OBmqSOqmUKmmi1miPVqmbdqnfOAildmugGqqiemq5tmufOqqwVqqd+jWm+Imh+GurGggAOw==';

				if ( Options.msg_fixColors)	{
					Utils.insertCSSRule('.combatreport_ididattack_iwon { color: #00B000; }');
					Utils.insertCSSRule('.combatreport_ididattack_ilost { color: #D02222; }');
					Utils.insertCSSRule('.combatreport_ididattack_draw { color: #C0C000; }');
				}

				Utils.insertCSSRule('.msgButtons input { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding;'
					+ 'background:transparent url(' + formular_buttons_gif + ') no-repeat scroll -88px -54px;'
					+ 'border:0 none; color:#0D1014; cursor:pointer; font-size:11px; font-weight:700; text-align:center; height: 27px; width: 42px; }'
				)
				Utils.insertCSSRule('.msgButtons input:hover { background:transparent url(' + formular_buttons_gif + ') no-repeat scroll -88px -80px;}');
			}

			SpyReport.insertCSSRules();

		},


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
			insertButton('VV', -12, Lang.Labels.btnMarkReadAll);
			insertButton('X', 7);
			insertButton('Xx', -7, Lang.Labels.btnDeleteSmallPlunder);
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
			} catch (e) { Utils.log(e); }
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
			if(!e || !e.target || e.target.tagName != 'FORM' || e.target.name != 'delMsg' ) return;
			Messages.Show();
		},

		Show: function()
		{
			try {
				/* prevent double execution (in Chrome) */
				if (Utils.page == 'messages')
				{
					var container = document.getElementsByName('delMsg')[0];
					if (container.getAttribute('antigame_processed')) return;
					container.setAttribute('antigame_processed', '1');
				}

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
					setTimeout( function() { Utils.$('.smallplunder .subject a').trigger('click'); }, 0);

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
			catch(e) { Utils.log(e); }
		}
	};









	// =======================================================================
	// Functions for spy reports processing
	// =======================================================================

	var SpyReport =
	{

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
		},

		// Is used in Messages.Run()
		insertCSSRules: function()
		{
			Utils.insertCSSRule(".plkey { width: 30% }");
			Utils.insertCSSRule(".plvalue { width: 20% }");
			Utils.insertCSSRule(".plunder { border: 1px solid grey !important; }");
			Utils.insertCSSRule("table.plunder { border-collapse: collapse; }");
			Utils.insertCSSRule(".plkey, .plvalue { padding: 5px !important; }");
			Utils.insertCSSRule(".dummy { width: 33% !important; }");

			if (Options.msg_EspionageSpace) {
				Utils.insertCSSRule( '#netz .contentz #showSpyReportsNow table th.area { padding: 4px 0px;}');

				var space = { 1:{top:3,bot:6}, 2:{top:2,bot:4}, 3:{top:1,bot:2}, 4:{top:0,bot:0} };  // t 4   b 8
				var top = space[Options.msg_EspionageSpace].top;
				var bot = space[Options.msg_EspionageSpace].bot;

				Utils.insertCSSRule( '#netz #inhalt .contentz td { padding-top: ' + top + 'px; padding-bottom: ' + bot + 'px; }');
				Utils.insertCSSRule( '#messagebox .spy td { padding-top: ' + top + 'px; padding-bottom: ' + top + 'px; }');
			}

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
			} catch (e) { Utils.log(e); }
		},

		showPlunder: function (report, noHeader)
		{
			var total = this.metal + this.crystal + this.deuterium;
      //MODIFICA
      /*
			var capacity_needed =
				Math.max(	this.plunder_metal + this.plunder_crystal + this.plunder_deuterium,
							Math.min(	(2 * this.plunder_metal + this.plunder_crystal + this.plunder_deuterium) * 3 / 4,
										(2 * this.plunder_metal + this.plunder_deuterium)
									)
						);
      */
      var capacity_needed = total/2;
      
			var small_cargos = Math.ceil(capacity_needed/5000);
			var large_cargos = Math.ceil(capacity_needed/25000);

			SimpleTable.init(Lang.Labels.resources);
			SimpleTable.addCell(Lang.Labels.total, total);
			SimpleTable.addCell(Lang.Labels.loot, Math.floor(total/2));
			SimpleTable.addCell(Lang.Labels.shipLCargoAlt, large_cargos);
			SimpleTable.addCell(Lang.Labels.shipSCargoAlt, small_cargos);

			this.insertTable(report, SimpleTable, noHeader);
		},

		showDebris: function (report)
		{
			var total = this.debris_metal + this.debris_crystal;
			if (!total) return;

			SimpleTable.init(Lang.Labels.debris);
			SimpleTable.addCell(Lang.Labels.metal, this.debris_metal);
			SimpleTable.addCell(Lang.Labels.crystal, this.debris_crystal);
			SimpleTable.addCell(Lang.Labels.total, total);
			SimpleTable.addCell(Lang.Labels.shipRecyclerAlt, Math.ceil(total/20000));

			this.insertTable(report, SimpleTable);
		},

		readValue: function(cell)
		{
			return parseInt(cell.innerHTML.replace(/\D/g, ''), 10);
		},

		insertTable: function(container, mytable, noHeader)
		{
			var table = document.createElement('table');
			table.className = 'fleetdefbuildings spy plunder';
			mytable.title_class = 'area plunder';
			mytable.key_class = 'plkey plunder';
			mytable.value_class = 'plvalue plunder';
			table.innerHTML = mytable.createTableString(2, noHeader);

			container.appendChild(table);
		},

		addSimButton: function(report)
		{
			try {
				var dummy = document.createElement('td');
				dummy.className = 'dummy';

				var attack = Utils.getElementByClassName('attack', report);
				attack.parentNode.insertBefore(dummy, attack);
				Utils.insertAfter(dummy.cloneNode(false), attack);

				var name = '';
				switch (Options.msg_addSimButton) {
					case(1): name = Lang.Labels.msg_Simulator1; break;
					case(2): name = Lang.Labels.msg_Simulator2; break;
					case(3): name = Lang.Labels.msg_Simulator3; break;
					default: ;
				}

				var simButton = attack.cloneNode(false);
				simButton.innerHTML = '<a class="buttonSave" href="javascript:void(0)"><span>' + name + '</span></a>';
				Utils.insertAfter(simButton, attack);

				simButton.addEventListener('click', function(e){ SpyReport.submitToSim(e); }, false);

			} catch (e) { Utils.log(e);	}
		},

		// Sim 1
		createWebSimForm: function()
		{
			function addTech(id, param) {
				return (Ogame.getTech(id) > -1) ? '&'+param+'='+Ogame.getTech(id) : '';
			}

			var lang = (Para.coms[Utils.server].wsim) ? Para.coms[Utils.server].wsim : 'en';
			var coords = Ogame.getActiveCoords();

			this.sim_form = document.createElement('form');
			this.sim_form.id = 'sim_form';
			this.sim_form.method = 'POST';
			this.sim_form.target = '_websim';

			this.sim_form.action = 'http://websim.speedsim.net/index.php?version=1'
				+ '&lang='+lang

				+ addTech(Ogame.TECH_WEAPONS, 'tech_a0_0')
				+ addTech(Ogame.TECH_SHIELD, 'tech_a0_1')
				+ addTech(Ogame.TECH_ARMOUR, 'tech_a0_2')

				+ addTech(Ogame.TECH_COMB_DRIVE, 'engine0_0')
				+ addTech(Ogame.TECH_IMPULSE_DRIVE, 'engine0_1')
				+ addTech(Ogame.TECH_HYPER_DRIVE, 'engine0_2')

				+ ((coords) ? '&start_pos='+coords.galaxy+':'+coords.system+':'+coords.planet : '')

				+ '&perc-df='+Options.uni_DFPercent
			;

			this.sim_form.innerHTML = '<input type="hidden" id="sim_input" name="report" />';

			document.body.appendChild(this.sim_form);
		},

		// Sim 2
		createDragoSimForm: function()
		{
			function addParam(name, value) {
				return '<input type="hidden" name="'+name+'" value="'+value+'" />';
			}

			function addTech(id, param) {
				return (Ogame.getTech(id) > -1) ? addParam(param, Ogame.getTech(id)) : '';
			}

			var lang = (Para.coms[Utils.server].dsim) ? Para.coms[Utils.server].dsim : 'english';

			this.sim_form = document.createElement('form');
			this.sim_form.id = 'sim_form';
			this.sim_form.method = 'POST';
			this.sim_form.action = 'http://drago-sim.com/';
			this.sim_form.target = '_dragosim';

			this.sim_form.innerHTML = addParam('lang', lang)
				+ addTech(Ogame.TECH_WEAPONS, 'techs[0][0][w_t]')
				+ addTech(Ogame.TECH_SHIELD, 'techs[0][0][s_t]')
				+ addTech(Ogame.TECH_ARMOUR, 'techs[0][0][r_p]')

				+ addParam('debris_ratio', Options.uni_DFPercent/100 )
				+ '<input type="hidden" id="sim_input" name="scan" />'
			;

			document.body.appendChild(this.sim_form);
		},

		// Sim 3
		createOSimulateSimForm: function()
		{
			function addParam(name, value) {
				return '<input type="hidden" name="'+name+'" value="'+value+'" />';
			}

			function addTech(id, param) {
				return (Ogame.getTech(id) > -1) ? addParam(param, Ogame.getTech(id)) : '';
			}

			var lang = (Para.coms[Utils.server].osim) ? Para.coms[Utils.server].osim : 'en';
			var coords = Ogame.getActiveCoords();

			this.sim_form = document.createElement('form');
			this.sim_form.id = 'sim_form';
			this.sim_form.method = 'POST';
			this.sim_form.action = 'http://www.osimulate.com/report';
			this.sim_form.target = '_osimulate';

			this.sim_form.innerHTML = addParam('lang', lang)
				+ addParam('debris_ratio', Options.uni_DFPercent/100 )

				+ addTech(Ogame.TECH_WEAPONS, 'techs[0][0][w_t]')
				+ addTech(Ogame.TECH_SHIELD, 'techs[0][0][s_t]')
				+ addTech(Ogame.TECH_ARMOUR, 'techs[0][0][r_p]')

				+ addTech(Ogame.TECH_COMB_DRIVE, 'engine0_0')
				+ addTech(Ogame.TECH_IMPULSE_DRIVE, 'engine0_1')
				+ addTech(Ogame.TECH_HYPER_DRIVE, 'engine0_2')

				+ ((coords) ? addParam('start_pos', coords.galaxy+':'+coords.system+':'+coords.planet) : '')
				+ '<input type="hidden" id="sim_input" name="report" />'
			;

			document.body.appendChild(this.sim_form);
		},

		submitToSim: function(evt)
		{
			if (!this.sim_form) {
				if (Options.msg_addSimButton == 1)
					this.createWebSimForm();
				else if (Options.msg_addSimButton == 2)
					this.createDragoSimForm();
				else if (Options.msg_addSimButton == 3)
					this.createOSimulateSimForm();
			}

			if (!this.sim_form) return;

			var report = evt.target
				.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
				.innerHTML.replace(/<[^>]+>|\n/g,'');

			document.getElementById('sim_input').value = (Options.msg_addSimButton == 1 || Options.msg_addSimButton == 3) ? encodeURI(report) : report;

			this.sim_form.submit();
		}
	};








	// =======================================================================
	// Misc functions
	// =======================================================================
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

				setTimeout(function(){scroller.run(); }, 200);
			};
		    setTimeout(function(){scroller.run(); }, 200);
		}
	};








	// =======================================================================
	// Network
	// =======================================================================
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

		Show: function(e) {
 			var list = document.getElementById('link11');
 			if (list.className == 'opened')
 			Utils.trigger(list,'click');


 			var list = document.getElementById('link12');
 			if (list.className == 'closed')
 			Utils.trigger(list,'click');

			// reduce alliance member list
			Utils.insertCSSRule( '#netz #alliance #inhalt #eins .contentz .members td {	padding-top:0px; padding-bottom:0px; }');

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
	};







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
				.click(function(){Utils.$('select').val(this.getAttribute('ref')); })
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

				SimpleTable.init(Lang.Labels.deficientRes);

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
						'//*[@id="content"]/descendant::*[@id="resources"]/LI[contains(@title,"'+Lang.Labels[''+attr]+'")]',
						'title');

					if (this.costRes[attr] == null) continue;

					var def = this.costRes[attr] - this.currentRes[attr];

					if (def>0) {
						SimpleTable.addCell(Lang.Labels[''+attr], def, attr);
						show = true;
						
						//MODIFICA

						var index = 0;

						if (attr =="metal")
							index = 0;
						if (attr =="crystal")
							index = 1;
						if (attr =="deuterium")
							index = 2;

						var ticker_name = 'resourceTicker'+this.res_array_firstcap[index];
						var t = Utils.unsafeWindow[ticker_name];
						var secondi = Math.ceil(def/t.production);
						var hh = Math.floor(secondi/3600);
						secondi = secondi - (hh*3600);
						var mm = Math.floor(secondi/60);
						secondi = secondi - (mm * 60);
						SimpleTable.addCell(Lang.Labels[''+attr],hh+"h "+mm+"m "+secondi+"s");

						if (attr != 'energy') sum += def;
					}
				}

				if (!show) return;

				var html = '<table>'+SimpleTable.createTableString()+'</table>';

				SimpleTable.init('');
				SimpleTable.addCell(Lang.Labels.shipSCargo, Math.ceil(sum/5000));
				SimpleTable.addCell(Lang.Labels.shipLCargo, Math.ceil(sum/25000));

				html += '<table>'+SimpleTable.createTableString()+'</table>';

				var node = document.createElement('div');
				node.id = 'deficient';

				node.innerHTML = html;
				container.appendChild(node);
			}
			catch (e) { Utils.log(e); }
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
				if (id == 1 || id == 2 || id == 3) {
					var spareEnergy = Utils.getIntById('resources_energy');

					var pos =($('#action ul #possibleInTime').size());
					var energy = $('#action ul li').find('.time').eq(1 + pos);

					var missingEnergy = spareEnergy - Utils.parseInt( energy.html() );

					var sats = Math.ceil( -missingEnergy / Ogame.getProduction(212,0) );
					str = (sats>0) ? '<span>('+sats+' '+Lang.Labels.shipSatelliteAlt+')</span>' : '';

					energy.after( Utils.addSpanMark(missingEnergy) + str );
				}

				str = '';

				// deuterium consumption in fusion reactor
				if (id == 12) {
					oldvalue = -Ogame.getConsumption(id,level);
					newvalue = -Ogame.getConsumption(id,level+1);
					str = '<li>'+Lang.Labels['deuterium']+': <span class="time">'+Utils.formatNumber(newvalue)+'</span> '
						+ Utils.addSpanMark(newvalue-oldvalue)+'</li>';
					$('#action ul').append(str);
				}

				// res/energy production
				if (id == 1 || id == 2 || id == 3 || id == 4 || id == 12) {
					oldvalue = Ogame.getProduction(id,level);
					newvalue = Ogame.getProduction(id,level+1);
					if (newvalue || isNaN(newvalue) ) {
						str = '<li>'+Lang.Labels.Production + ': <span class="time">'+Utils.formatNumber(newvalue)+'</span> '
							+ Utils.addSpanMark(newvalue-oldvalue)+'</li>';

						$('#action ul').append(str);
					}
				}

				// storage capacity
				if (id == 22 || id == 23 || id == 24) {
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
				}

				// if at least 1 line was appended - increase size of the container
				if (str) $('#action ul').css('padding-top', '0');

			}
			catch (e) { Utils.log(e); }
		},

		Missing_insertCSSRules: function()
		{
			Utils.insertCSSRule( '#deficient table tr td, #deficient table tr th { padding: 1px; font-size: 11px; color: white; }');
			Utils.insertCSSRule( '#deficient { background: transparent url("'+Utils.bg+'") repeat; position: absolute; bottom: 0; right: 0; }');
		},

		Resources_insertCSSRules: function()
		{
			var width = 151;
			Utils.insertCSSRule( '.antires { margin: 2px !important; padding: 4px !important; display: block; width: '+width+'px !important; height: auto !important; }');
			Utils.insertCSSRule( '.antires { float: left !important; background: #0D1014 !important; border: 1px solid #606060 !important; }');
			Utils.insertCSSRule( '.antires { text-align: center !important; font-size: 10px !important; list-style: none outside !important; }');
  		/*				' +	((Options.showResources == 1) ? 'margin-left: -40px;' : '') + ' \ */
			Utils.insertCSSRule( '.finishtime { color: green; }');
			Utils.insertCSSRule( '#links { overflow: visible; }');

			if (Options.showResources == 2)	{
				Utils.insertCSSRule( '#links { position: relative; }');
				Utils.insertCSSRule( '#antires_cont { position: absolute; top: 0; left: -171px; width: '+(width+13)+'px; }');
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
				this.res_container = document.getElementById('menuTableTools');
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

			var parser = new DOMParser();

			for (var i=0; i<this.res_array.length; i++)
			{
				var res = this.res_array[i];
				var ticker_name = 'resourceTicker'+this.res_array_firstcap[i];
				var ticker_id = 'antires_'+res;

				var node = document.createElement('li');
				node.className = 'antires';

				var html = document.getElementById(res+'_box').title;

				if (html.indexOf('|') === 0)
				{
					html = html.replace('|','');
					var rx = new RegExp('([\\d\\'+Utils.separator+']+)\\/','gi');
					html = html.replace(rx, '<span id="'+ticker_id+'">$1</span> / ');
				}
				else // res except energy in ogame 2.2.0
				{
					var doc = parser.parseFromString('<div>'+html.replace(/<br>/gi,'<br/>')+'</div>', 'text/xml');

					var current = doc.getElementsByTagName('span')[0];
					var storage = doc.getElementsByTagName('span')[1];
					var prod = doc.getElementsByTagName('span')[2];

					var name = doc.getElementsByTagName('B');
					name = name && name[0] || doc.firstChild;

					html = '<b>' + name.firstChild.nodeValue.split('|')[0] + '</b>';
					html += '<br/>';

					//##### Cleanup
					if (res != 'energy')
					{
						html += '<span class="'+current.getAttribute('class')+'">';
						html += '<span id="'+ticker_id+'">' + current.firstChild.nodeValue + '</span> / ';
						html += storage.firstChild.nodeValue;
						html += '</span>';
						html += '<br/>';
						html += '<span class="'+prod.getAttribute('class')+'">(' + prod.firstChild.nodeValue + ')</span>';
					}
					else // since 2.2.6
					{
						var consumed = prod.firstChild.nodeValue.replace('-','');
						var total = storage.firstChild.nodeValue.replace('+','');
						html += '<span class="'+current.getAttribute('class')+'">';
						html += current.firstChild.nodeValue;
						html += '<br/>';
						html += '(' + consumed + '/ '+ total + ')</span>';
					}
				}


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

					Utils.runScript(script);
				}

			}
		}
	};







	// =======================================================================
	// Buildings
	// =======================================================================
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
	};






	// =======================================================================
	// Stats
	// =======================================================================
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
			} catch (e) { Utils.log(e);
			}

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
	};







	// =======================================================================
	// Languages
	// =======================================================================
	function LabelsXX ()
	{
	    return {
		}
	};

	function InterfaceXX ()
	{
		return {
		}
	};

	function LabelsEN ()
	{
		// Labels are shown in Ogame pages
	    return {
			version: 2,
			// Following labels (missions, ships and defense) are taken from the game, please don't translate them.
			// Mission labels are takem from Fleet page 3 - In case there are differences between Fleet page 3 and eventlist you can add this mission translation here. 
			// Known differences (and no need to add them here) : Harvest in many languages
			missAttack: 'Attack',
			missColony: 'Colonization',
			missDeploy: 'Deployment',
			missDestroy: 'Moon Destruction',
			missEspionage: 'Espionage',
			missExpedition: 'Expedition',
			missFederation: 'ACS Attack',
			missHarvest: 'Harvest',
			missHold: 'ACS Defend',
			missTransport: 'Transport',

			shipSCargo: 'Small Cargo',
			shipLCargo: 'Large Cargo',
			shipLFighter: 'Light Fighter',
			shipHFighter: 'Heavy Fighter',
			shipCruiser: 'Cruiser',
			shipBattleship: 'Battleship',
			shipColonizator: 'Colony Ship',
			shipRecycler: 'Recycler',
			shipSpy: 'Espionage Probe',
			shipBomber: 'Bomber',
			shipDestroyer: 'Destroyer',
			shipRIP: 'Deathstar',
			shipBCruiser: 'Battlecruiser',
			shipSatellite: 'Solar Satellite',

			defRLauncher: 'Rocket Launcher',
			defLLaser: 'Light Laser',
			defHLaser: 'Heavy Laser',
			defGauss: 'Gauss Cannon',
			defIon: 'Ion Cannon',
			defPlasma: 'Plasma Turret',
			defSShield: 'Small Shield Dome',
			defLShield: 'Large Shield Dome',
			
			// Following labels are shown in Ogame pages
			// Messages
			btnMarkReadAll: 'Mark all displayed messages as read',
			btnDeleteSmallPlunder: 'Delete spy reports with plunder < $plunder and debris < $debris',
			// SpyReport
			msg_Simulator1: 'WebSim', // New 1.40.0
			msg_Simulator2: 'DragoSim', // New 1.40.0
			msg_Simulator3: 'OSimulate', // New 1.40.0
			debris: 'Debris',
			total: 'Total',
			loot: 'Loot',
			Save: 'Save',
			Clear: 'Clear',
			// Galaxy
			Moon: 'Moon',
			// Eventlist
			tmTime: 'Time',
			tmCountdown: 'Countdown',
			rx_sendMail: /Send a message to (.+)\./,
			// FleetSend
			TotalCapacity: 'Total capacity',
			MinSpeed: 'Minimal speed',
			ExPoints: 'Expedition points',
			resources: 'Resources',
			ArrivalACS: 'Arrival (ACS)',
			// FleetMovement
			mvmt_Return: 'R',
			// Calculator
			shipSCargoAlt: 'SC',
			shipLCargoAlt: 'LC',
			shipRecyclerAlt: 'Recs',
			shipRIPAlt: 'RIP',  // New 1.40.0
			Quantity: 'Quantity',
			Duration: 'Duration',
			Consumption: 'Consumption',
			// Resources
			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Missing resources',
			Production: 'Production',
			// Not used
			RequiredEnergy: 'Energy needed'
		}
	};

	function InterfaceEN ()
	{
		// Interface is shown in Antigame options only.
		return {
			version: 2,
			//
			title: 'AntiGame Options',
			btnOk: 'OK',
			btnCancel: 'Cancel',
			btnHomePage: 'Home page', // New 1.40.0
			optionsNote1: 'The option is stored for this universe only',
			resetCoords: 'Reset - ',
			installNewVersion: 'Click to install new version',
			// Sections
			sectionGeneral: 'General',
			sectionGeneral_Universe: 'Universe',
			sectionGeneral_Globalview: 'Global view', // New 1.40.0
			sectionGeneral_Objectview: 'Buildings, researches and ships', // New 1.40.0
			
			sectionTime: 'Time settings',
			sectionGalaxy: 'Galaxy',
			sectionGalaxy_Player: 'Player', // New 1.40.0
			sectionGalaxy_Alliance: 'Alliance', // New 1.40.0
			sectionGalaxy_Debris: 'Debris', // New 1.40.0
			sectionMessages: 'Messages',
			sectionMessages_Espionage: 'Espionage reports', // New 1.40.0
			sectionMessages_Combat: 'Combat reports', // New 1.40.0
			sectionFleetDispatch: 'Fleet dispatch',
			sectionFleetDispatch_Fleet1: 'Fleet page 1', // New 1.40.0
			sectionFleetDispatch_Fleet2: 'Fleet page 2', // New 1.40.0
			sectionFleetDispatch_Fleet3: 'Fleet page 3', // New 1.40.0
			sectionFleet: 'Fleet lists',  // New 1.43.0
			sectionFleet_Movement: 'Fleet movement',
			sectionFleet_Phalanx: 'Phalanx', // New 1.43.0
			sectionFleet_Events: 'Events', // New 1.43.0
			sectionFleet_MissionColor: 'Mission colors (format: ABCDEF - Websafe format ACE)', // New 1.40.0
			// Global
			improveLayout: 'Improve the layout of this page', // New 1.40.0
			improveUsability: 'Improve the usability of this page', // New 1.40.0
			improveLayoutUse: 'Improve layout and usebility of this page', // New 1.40.0
			simpleLayout: 'Simplify the layout of this page', // New 1.40.0
			killTips: 'Remove tooltips from this page',
			// General
			language: 'Settings menu language',  // Changed 1.40.0
			update_check: 'Auto-check for updates',
			thousandSeparator: 'Thousand separator',
			btnDefault: 'Default',
			blockAutoComplete: 'Block Auto-Complete in Firefox',
			// Universe
			uni_SpeedFactor: 'Speed factor of this universe',
			uni_DFPercent: 'Percentage of fleet structure to debris',
			uni_DefenseToDF: 'Percentage of defense to debris',
			uni_maxPlayerScore: 'The strongest player has more than 5M points',
			
			showDeficient: 'Show missing resources',
			showResources: 'Show extended resources information',
			show_onTop: 'On top',
			show_onBottom: 'On bottom',
			show_onLeft: 'On left',

			showNames: 'Show ship/building/research names over images',
			nameColorOn: 'Name color: available',
			nameColorOff: 'Name color: unavailable',
			nameColorDisabled: 'Name color: not enough resources',
			showConstructionTitle: 'Show construction titles in the planet list',
			shortHeader: 'Always minimize planet image',
			misc_scrollTitle: 'Scroll time to the next event in the window title',
			// Time
			timeAMPM: 'Use 12-hours format (AM/PM) instead of 24-hours',
			timeSetting: 'Change time values (hours only)',
			timeDontChange: 'Don\'t change time',
			timeLocal: 'Always set to local timezone',
			timeServer: 'Always set to server timezone',
			showServerOgameClock: 'Keep server time for top-right Ogame clock',
			showServerPhalanx: 'Keep server time for Phalanx view',
			showPageStartTime: 'Display the time the page was last refreshed',
			// Galaxy
			galaxy_keepTipsPlanets: 'Keep tooltips for planets and moons',
			galaxy_keepTipsDebris: 'Keep tooltips for debris fields',
			galaxyHideMoon: 'Hide Moon picture (display moon size instead)',
			// Galaxy_Player
			galaxyShowRank: 'Show player ranks in Galaxy view', // Changed 1.40.0
			galaxyRankColor: 'Player/alliance ranks color',
			galaxy_Players: 'Highlight the following players',
			galaxy_PlayerColors: 'Colors for player highlighting',
			// Galaxy_Alliance
			galaxyShowAllyRank: 'Show alliance ranks in Galaxy view', // New 1.40.0
			galaxy_Allys: 'Highlight the following alliances',
			galaxy_AllyColors: 'Colors for alliance highlighting',
			// Galaxy_Debris
			galaxyDebrisMin: 'Minimal size of debris to highlight (0 to turn off)',
			galaxyDebrisColor: 'Color of highlighted debris',
			// Messages
			msg_expandBox: 'Expand the messagebox height',
			msg_addButtons: 'Additional buttons on Messages',
			// Messages - Espionage reports
			msg_EspionageSpace: 'Reducing row spacing with',
			msg_PlunderThreshold: 'Low limit for theoretical plunder (x1000)',
			msg_DebrisThreshold: 'Low limit for theoretical debris (x1000)',
			msg_foldSmallPlunder: 'Fold reports with plunder and debris less than the limit',
			msg_showPlunder: 'Show plunder in spy reports',
			msg_addSimButton: 'Add buttons for submitting spy reports to simulator',
			// Messages - Combat reports
			msg_fixColors: 'Fix colors of combat reports',
			// Fleet dispatch - page 1
			fleet_showCapacity: 'Show ships capacity and speed',
			fleet1_showResCalc: 'Show resource calculator',
			// Fleet dispatch - page 2
			// fleet2_fixLayout: 'Fix flight information layout for long texts', // Changed 1.40.0 -  Removed in 1.43.0
			autocopyCoords: 'Auto-copy coordinates',
			autocopyGlobal: 'Memorize coordinates from any other external page',
			fleet2_setTargetDF: 'Set target to DF if the fleet includes recyclers',
			fleet2_ShortLinks: 'Target shortlinks',
			fleet2_MoonColor: 'Color for moons in the shortlink list',
			fleet2_MoonsToEnd: 'Move moons to the end of the shortlinks list',
			fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',
			fleet2_expandMoonColor: 'Color moons in expand list',
			fleet2_checkProbeCapacity: 'Check probes capacity before departure',
			// Fleet dispatch - page 3
			missionPriority: 'Mission priority order',
			// Fleet movement
			mvmt_expandFleets: 'Show fleet ships and cargo',
			mvmt_showReversal: 'Show reversal time for fleets',
			evt_expandFleetsPhal: 'Show fleet composition and cargo',
			phalanx_showDebris: 'Show theoretical debris in Phalanx view',
			evt_expandFleetsEvt: 'Show fleet composition and cargo',
			evt_dimReverse: 'Dim returning fleets'
			
		}
	};

	// BA : Only difference to HR
	function LabelsBA ()
	{
	    return {
			rx_sendMail: /Pošalji poruku (.+)\./,

			ExPoints: 'Ekspedicijski poeni'
		};
	};

	function InterfaceBA ()
	{
		return {
			thousandSeparator: 'Zarez za hiljadu',

			fleet2_ShortLinks: 'Precica do mete (stranica 2)',
			mvmt_showReversal: 'Pokaži vrijeme povratka flote'
		};
	};

	// BR : Only difference to PT
	function LabelsBR ()
	{
	    return {
			missEspionage: 'Espionar',

			missHold: 'Guardar Posições',

			shipBCruiser: 'Interceptador',

			defIon: 'Canhão de Íons',

			rx_sendMail: /Enviar uma mensagem a (.+)\./

		};
	};

	function LabelsCZ()
	{
	    return {
			version: 3,

			btnMarkReadAll: 'Označit všechny zobrazené zprávy jako přečtené',
			btnDeleteSmallPlunder: 'Smazat špionážní zprávy s kořistí nižší než < $plunder a troskami < $debris',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Trosky',
			total: 'Celkem',
			loot: 'Kořist',
			Save: 'Uložit',
			Clear: 'Vymazat',

			Moon: 'Měsíc',

			tmTime: 'Čas',
			tmCountdown: 'Odpočet',
			rx_sendMail: /Odešli zprávu (.+)\./,

			TotalCapacity: 'Celková kapacita',
			MinSpeed: 'Minimální rychlost',
			ExPoints: 'Body expedice',
			resources: 'Zdroje',
			ArrivalACS: 'Přílet (APP)',

			mvmt_Return: 'N',

			shipSCargoAlt: 'MT',
			shipLCargoAlt: 'VT',
			shipRecyclerAlt: 'Rec',
			shipRIPAlt: 'RIP',
			Quantity: 'Množství',
			Duration: 'Trvání',
			Consumption: 'Spotřeba deuteria',

			shipSatelliteAlt: 'Sat',
			deficientRes: 'Chybějící zdroje',
			Production: 'Produkce',

			RequiredEnergy: 'Potřebná energie'
		}
	};

	function InterfaceCZ ()
	{
		return {
			version: 3,

			title: 'AntiGame Origin - Nastavení',
			btnOk: 'OK',
			btnCancel: 'Storno',
			btnHomePage: 'Domovská stránka',
			optionsNote1: 'Volba je uložena pouze pro tento vesmír',
			resetCoords: 'Reset - ',
			installNewVersion: 'Pro instalaci nové verze klikněte',

			sectionGeneral: 'Obecné',
			sectionGeneral_Universe: 'Vesmír',
			sectionGeneral_Globalview: 'Globální nastavení',
			sectionGeneral_Objectview: 'Budovy, výzkum a lodě',
			sectionTime: 'Nastavení času',
			sectionGalaxy: 'Galaxie',
			sectionGalaxy_Player: 'Hráč',
			sectionGalaxy_Alliance: 'Aliance',
			sectionGalaxy_Debris: 'Pole trosek',
			sectionMessages: 'Zprávy',
			sectionMessages_Espionage: 'Špionážní zprávy',
			sectionMessages_Combat: 'Bitevní zprávy',
			sectionFleetDispatch: 'Odeslání letky',
			sectionFleetDispatch_Fleet1: 'Odeslání letky - strana 1.',
			sectionFleetDispatch_Fleet2: 'Odeslání letky - strana 2.',
			sectionFleetDispatch_Fleet3: 'Odeslání letky - strana 3.',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Přesun letky',
			sectionFleet_Phalanx: 'Senzor falang',
			sectionFleet_Events: 'Seznam událostí',
			sectionFleet_MissionColor: 'Barva mise',

			improveLayout: 'Zlepšit vzhled této stránky',
			improveUsability: 'Zlepšit uspořádání a použitelnost stránky',
			improveLayoutUse: 'Zlepšit vzhled a použitelnost této stránky',
			simpleLayout: 'Zjednodušit rozvržení stránky',
			killTips: 'Zakázat bublinové (tooltip) nápovědy',

			language: 'Jazyk',
			update_check: 'Automaticky kontrolovat aktualizace',
			thousandSeparator: 'Oddělovač tisíců',
			btnDefault: 'Výchozí',
			blockAutoComplete: 'Blokovat automatické doplňování ve Firefoxu',

			uni_SpeedFactor: 'Faktor rychlosti tohoto vesmíru',
			uni_DFPercent: 'Procenta složení letky z nichž vzniknou trosky',
			uni_DefenseToDF: 'Procenta obrany z nichž vzniknou trosky',
			uni_maxPlayerScore: 'Nejsilnější hráč má více než 5M bodů',
			
			showDeficient: 'Zobrazovat chybějící suroviny',
			showResources: 'Zobrazovat rozšířené info o zdrojích',
			show_onTop: 'Nahoře',
			show_onBottom: 'Dole',
			show_onLeft: 'Vlevo',

			showNames: 'Zobrazovat názvy lodí/budov/výzkumů (přes obrázky)',
			nameColorOn: 'Typ barvy: dostupné',
			nameColorOff: 'Typ barvy: nedostupné',
			nameColorDisabled: 'Typ barvy: nedostatek zdrojů',
			showConstructionTitle: 'Zobrazovat názvy výstavby v seznamu planet',
			shortHeader: 'Vždy zmenšit obrázky planet',
			misc_scrollTitle: 'Zobrazovat čas do další události v titulku okna',

			timeAMPM: 'Používat 12hodinový formát času (AM/PM) namísto 24hodinového',
			timeSetting: 'Změnit časové hodnoty (jen hodiny)',
			timeDontChange: 'Neměnit čas',
			timeLocal: 'Vždy nastavit na místní časové pásmo',
			timeServer: 'Vždy nastavit na časové pásmo serveru',
			showServerOgameClock: 'Nechat Ogame hodiny vpravo nahoře ukazovat serverový čas',
			showServerPhalanx: 'Nechat serverový čas pro zobrazení falang',
			showPageStartTime: 'Zobrazovat čas poslední aktualizace stránky',

			galaxy_keepTipsPlanets: 'Ponechat bublinové nápovědy pro planety a jejich měsíce',
			galaxy_keepTipsDebris: 'Ponechat bublinové nápovědy pro pole trosek',
			galaxyHideMoon: 'Skrýt obrázek měsíce (zobrazit jeho velikost)',

			galaxyShowRank: 'Zobrazovat hodnocení hráče/aliance v přehledu Galaxie',
			galaxyRankColor: 'Barvy hodnocení hráče/aliance',
			galaxy_Players: 'Zvýraznit následující hráče',
			galaxy_PlayerColors: 'Barvy pro zvýraznění hráčů',

			galaxyShowAllyRank: 'Zobrazovat skóre aliancí v přehledu galaxie',
			galaxy_Allys: 'Zvýraznit následující aliance',
			galaxy_AllyColors: 'Barvy pro zvýraznění aliancí',

			galaxyDebrisMin: 'Minimální velikost trosek pro zvýraznění (0 = vypnuto)',
			galaxyDebrisColor: 'Barva zvýrazněných trosek',

			msg_expandBox: 'Zvětšit výšku zobrazených zpráv',
			msg_addButtons: 'Přídavná tlačítka u zpráv',

			msg_EspionageSpace: 'Zmenšit mezeru mezi řádky o',
			msg_PlunderThreshold: 'Nejnižší hranice pro teoretickou kořist (x1000)',
			msg_DebrisThreshold: 'Nejnižší hranice pro teoretické trosky (x1000)',
			msg_foldSmallPlunder: 'Rozvinout zprávy s kořistí a troskami nižšími než nejnižší hranice',
			msg_showPlunder: 'Zobrazovat kořist ve špionážních zprávách',
			msg_addSimButton: 'Přidat tlačítko pro načítání reportu do simulátoru',

			msg_fixColors: 'Upravit barvy bitevních zpráv',

			fleet_showCapacity: 'Zobrazovat kapacitu a rychlost lodí',
			fleet1_showResCalc: 'Zobrazovat kalkulačku zdrojů',

			fleet2_fixLayout: 'Opravit rozložení letových informací (strana 2)',
			autocopyCoords: 'Automaticky kopírovat souřadnice',
			autocopyGlobal: 'Pamatovat si souřadnice ze všech stránek (nejen panely s tímto vesmírem)',
			fleet2_setTargetDF: 'Nastavit cíl na DF pokud letka obsahuje recyklátory',
			fleet2_ShortLinks: 'Seznam zkratek (strana 2)',
			fleet2_MoonColor: 'Barvy měsíců v seznamu zkratek',
			fleet2_MoonsToEnd: 'Umístit měsíce na konec seznamu zkratek',
			fleet2_expandLists: 'Rozbalovat rozbalovací nabídky (Rychlost, Seznam zkratek, ACS)',
			fleet2_expandMoonColor: 'Zvýraznit měsíce v rozšířeném seznamu',
			fleet2_checkProbeCapacity: 'Zkontrolovat kapacitu špionážních sond při odesílání (strana 2)',

			missionPriority: 'Priorita misí',

			mvmt_expandFleets: 'Zobrazovat lodě a transportéry letky',
			mvmt_showReversal: 'Zobrazovat obrácený čas pro letky',
			evt_expandFleetsPhal: 'Zobrazit složení letky a transportu (Senzor Falang)',
			phalanx_showDebris: 'Zobrazovat teoretické trosky v zobrazení senzoru falang',
			evt_expandFleetsEvt: 'Zobrazit složení letky a transportu (Seznam událostí)',
			evt_dimReverse: 'Potlačit vracející se letky'
		}
	};

	function LabelsDE ()
	{
	    return {
			version: 2,

			btnMarkReadAll: 'Alle angezeigten Nachrichten als gelesen markieren',
			btnDeleteSmallPlunder: 'Spionageberichte mit < $plunder Beute und < $debris TF entfernen',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'TF',
			total: 'Gesamt',
			loot: 'Beute',
			Save: 'Speichern',
			Clear: 'Löschen',

			Moon: 'Mond',

			tmTime: 'Zeit',
			tmCountdown: 'Countdown',
			rx_sendMail: /Sende Nachricht zu (.+)\./,

			TotalCapacity: 'Ladekapazität',
			MinSpeed: 'Minimale Geschwindigkeit',
			ExPoints: 'Expeditionspunkte',
			resources: 'Rohstoffe',
			ArrivalACS: 'Ankunft (AKS)',

			mvmt_Return: 'R',

			shipSCargoAlt: 'KT',
			shipLCargoAlt: 'GT',
			shipRecyclerAlt: 'Recs',
			shipRIPAlt: 'RIP',
			Quantity: 'Menge',
			Duration: 'Dauer',
			Consumption: 'Verbrauch',

			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Fehlende Rohstoffe',
			Production: 'Produktion',

			RequiredEnergy: 'Energiebedarf'
		};
	};

	function InterfaceDE ()
	{
		return {
			version: 2,

			title: 'AntiGame Optionen',
			btnOk: 'OK',
			btnCancel: 'Abbr.',
			btnHomePage: 'Homepage',
			optionsNote1: 'Diese Option wird nur für dieses Universum gespeichert',
			resetCoords: 'Zurücksetzen - ',
			installNewVersion: 'Klicken zum Installieren der neuen Version',
			
			sectionGeneral: 'Allgemein',
			sectionGeneral_Universe: 'Universum',
			sectionGeneral_Globalview: 'Global',
			sectionGeneral_Objectview: 'Gebäude, Forschungen und Schiffe',
			sectionTime: 'Zeiteinstellungen',
			sectionGalaxy: 'Galaxie',
			sectionGalaxy_Player: 'Spieler',
			sectionGalaxy_Alliance: 'Allianzen',
			sectionGalaxy_Debris: 'Trümmerfelder',
			sectionMessages: 'Nachrichten',
			sectionMessages_Espionage: 'Spionageberichte',
			sectionMessages_Combat: 'Kampfberichte',
			sectionFleetDispatch: 'Flotte versenden',
			sectionFleetDispatch_Fleet1: 'Flottenseite 1',
			sectionFleetDispatch_Fleet2: 'Flottenseite 2',
			sectionFleetDispatch_Fleet3: 'Flottenseite 3',
			sectionFleet: 'Flotten Listen',
			sectionFleet_Movement: 'Flottenbewegungen',
			sectionFleet_Phalanx: 'Phalanx',
			sectionFleet_Events: 'Ereignisse',
			sectionFleet_MissionColor: 'Auftragsfarbe (Format: ABCDEF - Websafe-Format ACE)',

			improveLayout: 'Layout dieser Seite verbessern',
			improveUsability: 'Nutzerfreundlichkeit dieser Seite verbessern',
			improveLayoutUse: 'Layout und Nutzerfreundlichkeit dieser Seite verbessern',
			simpleLayout: 'Layout dieser Seite vereinfachen',
			killTips: 'Entferne Tooltips auf dieser Seite',

			language: 'Menüsprache',
			update_check: 'Automatisch nach Updates suchen',
			thousandSeparator: 'Tausender trennen mit',
			btnDefault: 'Standard',
			blockAutoComplete: 'Blocke automatisches Vervollständigen in Firefox',

			uni_SpeedFactor: 'Geschwindigkeit des Universums',
			uni_DFPercent: 'Prozent-Anteil von Flotte in Trümmerfeld',
			uni_DefenseToDF: 'Prozent-Anteil von Verteidigung in Trümmerfeld',
			uni_maxPlayerScore: 'Der stärkste Spieler hat mehr als 5M Punkte',
			
			showDeficient: 'Zeige fehlende Rohstoffe',
			showResources: 'Zeige erweiterte Rohstoff-Informationen',
			show_onTop: 'Oben',
			show_onBottom: 'Unten',
			show_onLeft: 'Links',

			showNames: 'Zeige Schiff/Gebäude/Forschungsname über dem Bild',
			nameColorOn: 'Farbe für: verfügbar',
			nameColorOff: 'Farbe für: nicht verfügbar',
			nameColorDisabled: 'Farbe für: nicht genügend Ressourcen',
			showConstructionTitle: 'Zeige im Bau befindliche Gebäude in der Planetenliste',
			shortHeader: 'Planetenbild immer minimieren',
			misc_scrollTitle: 'Zeit bis zum nächsten Ereignis in Titelleiste anzeigen',

			timeAMPM: 'Benutze 12-Stunden-Anzeige (AM/PM) statt 24-Stunden-Anzeige',
			timeSetting: 'Zeitversatz (nur Stunden)',
			timeDontChange: 'Zeit nicht ändern',
			timeLocal: 'Immer die aktuelle Zeitzone setzen',
			timeServer: 'Immer die Server-Zeitzone setzen',
			showServerOgameClock: 'Behalte Serverzeit für OGame-Uhr (oben rechts)',
			showServerPhalanx: 'Behalte Serverzeit für Phalanxansicht',
			showPageStartTime: 'Zeige die Zeit der letzten Aktualisierung',

			galaxy_keepTipsPlanets: 'Behalte Tooltips für Planeten und Monde',
			galaxy_keepTipsDebris: 'Behalte Tooltips für Trümmerfelder',
			galaxyHideMoon: 'Verberge Mondbild (Zeige nur die Größe)',

			galaxyShowRank: 'Zeige Spieler-Rang in der Galaxie',
			galaxyRankColor: 'Spieler/Allianz-Rang Farben',
			galaxy_Players: 'Hebe folgende Spieler hervor',
			galaxy_PlayerColors: 'Farbe der hervorgehobenen Spieler',

			galaxyShowAllyRank: 'Zeige Allianz-Rang in der Galaxie',
			galaxy_Allys: 'Hebe folgende Allianzen hervor',
			galaxy_AllyColors: 'Farbe der hervorgehobenen Allianzen',

			galaxyDebrisMin: 'Minimale Größe von Trümmerfeldern zeigen',
			galaxyDebrisColor: 'Farbe des Trümmerfelds',

			msg_expandBox: 'Größe der Nachrichtenbox erhöhen',
			msg_addButtons: 'Zusätzliche Nachrichtenfelder',

			msg_EspionageSpace: 'Zeilenabstand verringern um',
			msg_PlunderThreshold: 'Mindestgröße für theoretische Beute (in k)',
			msg_DebrisThreshold: 'Mindestgröße für theoretisches Trümmerfeld (in k)',
			msg_foldSmallPlunder: 'Spionageberichte unter diesem Limit einklappen',
			msg_showPlunder: 'Zeige Beute in Spionageberichten',
			msg_addSimButton: 'Füge Buttons für Übertragung an WebSim hinzu',

			msg_fixColors: 'Farben von Kampfberichten ändern',

			fleet_showCapacity: 'Zeige Schiffe, Kapazität, Geschwindigkeit',
			fleet1_showResCalc: 'Zeige Ressourcen-Rechner',

			fleet2_fixLayout: 'Verändere Layout für sehr lange Texte',
			autocopyCoords: 'Koordinaten automatisch kopieren',
			autocopyGlobal: 'Merke Koordinaten von allen externen Webseiten',
			fleet2_setTargetDF: 'Setze Ziel auf Trümmerfeld, wenn Recycler dabei sind',
			fleet2_ShortLinks: 'Vorgegebene Shortlinks',
			fleet2_MoonColor: 'Farbe für Mond in der Shortlink-Liste',
			fleet2_MoonsToEnd: 'Verschiebe Monde an das Ende der Shortlink-Liste',
			fleet2_expandLists: 'Auswahlboxen aufklappen (Geschwindigkeit, Shortlinks, AKSs)',
			fleet2_expandMoonColor: 'Färbe Monde in der Auswahlbox',
			fleet2_checkProbeCapacity: 'Prüfe Sondenkapazität vor Absenden',

			missionPriority: 'Auftragspriorität',

			mvmt_expandFleets: 'Zeige Flotte, Schiffe und Laderaum',
			mvmt_showReversal: 'Zeige Rückkehrzeit der Flotte',
			evt_expandFleetsPhal: 'Zeige Flottenzusammenstellung und Ladung (Phalanx)',
			phalanx_showDebris: 'Zeige theoretisches Trümmerfeld in der Phalanx',
			evt_expandFleetsEvt: 'Zeige Flottenzusammenstellung (Eventliste)',
			evt_dimReverse: 'Zurückkehrende Flotten schwach anzeigen'		
		}
	};

	function LabelsDK ()
	{
	    return {
			version: 2,

			btnMarkReadAll: 'Mærker alle viste beskeder som læste',
			btnDeleteSmallPlunder: 'Slet Spion reporter og kamp reporter < $plyndring og ruinmark < $ruinmark',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Debris',
			total: 'Total',
			loot: 'Loot',
			Save: 'Save',
			Clear: 'Clear',

			Moon: 'Moon',

			tmTime: 'Time',
			tmCountdown: 'Countdown',
			rx_sendMail: /Send a message to (.+)\./,

			TotalCapacity: 'Total capacity',
			MinSpeed: 'Minimal fart',
			ExPoints: 'Expedition points',
			resources: 'Ressourcer',
			ArrivalACS: 'Ankomst (AKS)',

			mvmt_Return: 'R',

			shipSCargoAlt: 'SC',
			shipLCargoAlt: 'LC',
			shipRecyclerAlt: 'Recs',
			shipRIPAlt: 'RIP',
			Quantity: 'Quantity',
			Duration: 'Duration',
			Consumption: 'Consumption',

			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Manglende Ressourcer',
			Production: 'Produktion',

			RequiredEnergy: 'Energi behøvet'
		}
	};

	function InterfaceDK ()
	{
		return {
			version: 2,

			title: 'AntiGame Indstillinger',
			btnOk: 'OK',
			btnCancel: 'Annuler',
			btnHomePage: 'Home page',
			optionsNote1: 'The option is stored for this universe only',
			resetCoords: 'Reset - ',
			installNewVersion: 'Click to install new version',

			sectionGeneral: 'Generalt',
			sectionGeneral_Universe: 'Universe',
			sectionGeneral_Globalview: 'Global view',
			sectionGeneral_Objectview: 'Buildings, researches and ships',
			sectionTime: 'Time settings',
			sectionGalaxy: 'Galakse',
			sectionGalaxy_Player: 'Player',
			sectionGalaxy_Alliance: 'Alliance',
			sectionGalaxy_Debris: 'Debris',
			sectionMessages: 'Beskeder',
			sectionMessages_Espionage: 'Espionage reports',
			sectionMessages_Combat: 'Combat reports',
			sectionFleetDispatch: 'Fleet dispatch',
			sectionFleetDispatch_Fleet1: 'Fleet page 1',
			sectionFleetDispatch_Fleet2: 'Fleet page 2',
			sectionFleetDispatch_Fleet3: 'Fleet page 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Flåde bevægelse',
			sectionFleet_Phalanx: 'Phalanx',
			sectionFleet_Events: 'Events',
			sectionFleet_MissionColor: 'Mission farve',

			improveLayout: 'Improve the layout of this page',
			improveUsability: 'Improve the usability of this page',
			improveLayoutUse: 'Improve layout and usebility of this page',
			simpleLayout: 'Simplify the layout of this page',
			killTips: 'Kill tooltips',

			language: 'Sprog',
			update_check: 'Auto-check for updates',
			thousandSeparator: 'Thousand separator',
			btnDefault: 'Standart',
			blockAutoComplete: 'Bloker auto complete i Firefox',

			uni_SpeedFactor: 'Speed factor of this universe',
			uni_DFPercent: 'Percentage of fleet structure to debris',
			uni_DefenseToDF: 'Percentage of defense to debris',
			uni_maxPlayerScore: 'The strongest player has more than 5M points',
			
			showDeficient: 'Vis manglende ressourcer',
			showResources: 'Vis udvidede ressource information',
			show_onTop: 'On top',
			show_onBottom: 'On bottom',
			show_onLeft: 'On left',

			showNames: 'Show ship/building/research names over images',
			nameColorOn: 'Name color: available',
			nameColorOff: 'Name color: unavailable',
			nameColorDisabled: 'Name color: not enough resources',
			showConstructionTitle: 'Show construction titles in the planet list',
			shortHeader: 'Always minimize planet image',
			misc_scrollTitle: 'Scroll time to the next event in the window title',

			timeAMPM: 'Use 12-hours format (AM/PM) instead of 24-hours',
			timeSetting: 'Change time values (hours only)',
			timeDontChange: 'Don\'t change time',
			timeLocal: 'Always set to local timezone',
			timeServer: 'Always set to server timezone',
			showServerOgameClock: 'Keep server time for top-right Ogame clock',
			showServerPhalanx: 'Keep server time for Phalanx view',
			showPageStartTime: 'Display the time the page was last refreshed',

			galaxy_keepTipsPlanets: 'Keep tooltips for planets and moons',
			galaxy_keepTipsDebris: 'Keep tooltips for debris fields',
			galaxyHideMoon: 'Hide Moon picture (display moon size instead)',

			galaxyShowRank: 'Vis spiller/alliance ranks i Galakse oversigt',
			galaxyRankColor: 'Spiller/alliance ranks farver',
			galaxy_Players: 'Highlight the following players',
			galaxy_PlayerColors: 'Colors for player highlighting',

			galaxyShowAllyRank: 'Show alliance ranks in Galaxy view',
			galaxy_Allys: 'Highlight the following alliances',
			galaxy_AllyColors: 'Colors for alliance highlighting',

			galaxyDebrisMin: 'Minimum størrelse af ruin mark til highlight (sæt til 0 for at slå fra)',
			galaxyDebrisColor: 'Farve til highlighted ruin mark',

			msg_expandBox: 'Expand the messagebox height',
			msg_addButtons: 'Ekstra knapper i beskeder',

			msg_EspionageSpace: 'Reducing row spacing with',
			msg_PlunderThreshold: 'Lav grænse for teoretisk udplyndre (x1000)',
			msg_DebrisThreshold: 'Lav grænse for teoretisk ruinmark (x1000)',
			msg_foldSmallPlunder: 'hvis ikke rapporter med plyndring og ruinmarker der er mindre end den grænse',
			msg_showPlunder: 'Vis mængde af resurser der kan hentes i spy raport',
			msg_addSimButton: 'Add buttons for submitting spy reports to simulator',

			msg_fixColors: 'Fix farver i kamp rapporter',

			fleet_showCapacity: 'Show ships capacity and speed',
			fleet1_showResCalc: 'Show resource calculator',

			fleet2_fixLayout: 'Fleet 2: Improve Layout',
			autocopyCoords: 'Auto-copy coordinates',
			autocopyGlobal: 'Memorize coordinates from any page (not only current Ogame universe tabs)',
			fleet2_setTargetDF: 'Set target to DF if the fleet includes recyclers',
			fleet2_ShortLinks: 'Target shortlinks (page 2)',
			fleet2_MoonColor: 'Color for moons in the shortlink list',
			fleet2_MoonsToEnd: 'Move moons to the end of the shortlinks list',
			fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',
			fleet2_expandMoonColor: 'Color moons in expand list',
			fleet2_checkProbeCapacity: 'Check probes capacity before departure(page 2)',

			missionPriority: 'Mission prioritet',

			mvmt_expandFleets: 'Vis flåde skibe og transtortere',
			mvmt_showReversal: 'Vis  flådens tilbagevending ankomst (klokkeslæt)',
			evt_expandFleetsPhal: 'Show fleet composition and cargo (Phalanx)',
			phalanx_showDebris: 'Show theoretical debris in Phalanx view',
			evt_expandFleetsEvt: 'Show fleet composition and cargo (EventList)',
			evt_dimReverse: 'Dim returning fleets'
		};
	};

	function LabelsES ()
	{
	    return {
			version: 3,

			btnMarkReadAll: 'Marcar todos los mensajes como leídos',
			btnDeleteSmallPlunder: 'Eliminar los informes de espionaje con el botón < $plunder y los escombros < $debris',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Escombros',
			total: 'Total',
			loot: 'Botín',
			Save: 'Guardar',
			Clear: 'Borrar',

			Moon: 'Luna',

			tmTime: 'Hora',
			tmCountdown: 'Cuenta atrás',
			rx_sendMail: /Enviar mensaje a (.+)\./,

			TotalCapacity: 'Capacidad total',
			MinSpeed: 'Velocidad mínima',
			ExPoints: 'Puntos de Espedición',
			resources: 'Recursos',
			ArrivalACS: 'Llegada (SAC)',

			mvmt_Return: 'R',

			shipSCargoAlt: 'NPC',
			shipLCargoAlt: 'NGC',
			shipRecyclerAlt: 'Recis',
			shipRIPAlt: 'EDLM',
			Quantity: 'Cantidad',
			Duration: 'Duración',
			Consumption: 'Consumo',

			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Recursos necesarios',
			Production: 'Producción',

			RequiredEnergy: 'Energía necesaria'
		}
	};

	function InterfaceES ()
	{
		return {
			version: 3,

			title: 'Opciones AntiGame',
			btnOk: 'OK',
			btnCancel: 'Cancelar',
			btnHomePage: 'Página de Inicio',
			optionsNote1: 'La opción se guardará sólo en este Universo',
			resetCoords: 'Resetear - ',
			installNewVersion: 'Click para instalar la nueva versión',

			sectionGeneral: 'General',
			sectionGeneral_Universe: 'Universo',
			sectionGeneral_Globalview: 'Vista General',
			sectionGeneral_Objectview: 'Edificios, Investigaciones y Naves',
			sectionTime: 'Configuración de Hora',
			sectionGalaxy: 'Galaxia',
			sectionGalaxy_Player: 'Jugador',
			sectionGalaxy_Alliance: 'Alianza',
			sectionGalaxy_Debris: 'Escombros',
			sectionMessages: 'Mensajes',
			sectionMessages_Espionage: 'Informes de Espionaje',
			sectionMessages_Combat: 'Informes de Batalla',
			sectionFleetDispatch: 'Envío de Flota',
			sectionFleetDispatch_Fleet1: 'Página de envío de Flota 1',
			sectionFleetDispatch_Fleet2: 'Página de envío de Flota 2',
			sectionFleetDispatch_Fleet3: 'Página de envío de Flota 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Movimiento de Flotas',
			sectionFleet_Phalanx: 'Lista de Phalanx',
			sectionFleet_Events: 'Lista de Eventos',
			sectionFleet_MissionColor: 'Color para la misión',

			improveLayout: 'Mejorar el diseño de esta página',
			improveUsability: 'Mejorar la funcionalidad de esta página',
			improveLayoutUse: 'Mejorar diseño y funcionalidad de esta página',
			simpleLayout: 'Simplificar el diseño de esta página',
			killTips: 'Eliminar tooltips',

			language: 'Idioma',
			update_check: 'Auto-check actualizaciones',
			thousandSeparator: 'Separador de Miles',
			btnDefault: 'Defecto',
			blockAutoComplete: 'Bloquear Autocompletar en Firefox',

			uni_SpeedFactor: 'Velocidad de este Universo',
			uni_DFPercent: 'Porcentaje de flota a escombros',
			uni_DefenseToDF: 'Porcentaje de defensa a escombros',
			uni_maxPlayerScore: 'El Top 1 tiene más de 5M de puntos',
			
			showDeficient: 'Mostrar los recursos que faltan',
			showResources: 'Mostrar ampliada la información sobre los recursos',
			show_onTop: 'Arriba',
			show_onBottom: 'Abajo',
			show_onLeft: 'Izquierda',

			showNames: 'Mostrar los nombres de naves/edificios/investigaciones sobre las imágenes',
			nameColorOn: 'Colorear Nombre: disponible',
			nameColorOff: 'Colorear Nombre: no disponible',
			nameColorDisabled: 'Colorear Nombre: sin recursos suficientes',
			showConstructionTitle: 'Mostrar las construcciones en curso en la lista de planetas',
			shortHeader: 'Minimizar siempre la imagen del Planeta',
			misc_scrollTitle: 'Tiempo restante para el próximo evento en el título de la ventana del navegador',

			timeAMPM: 'Usar formato 12-hors (AM/PM) en lugar del fomato 24-horas',
			timeSetting: 'Cambiar valores de hora (sólo horas)',
			timeDontChange: 'No cambiar la hora',
			timeLocal: 'Mantener siempre la hora local',
			timeServer: 'Mantener siempre hora del servidor',
			showServerOgameClock: 'Mantener la hora del servidor en el reloj superior derecho de OGame',
			showServerPhalanx: 'Mantener la hora del servidor en el informe de Phalanx',
			showPageStartTime: 'Mostrar la hora a la que la página ha sido actualizada',

			galaxy_keepTipsPlanets: 'Mantener tooltips para planetas y lunas',
			galaxy_keepTipsDebris: 'Mantener tooltips para escombros',
			galaxyHideMoon: 'Eliminar imagen de las Lunas (mostra únicamente el tamaño)',

			galaxyShowRank: 'Mostrar ranking jugador/alianza en la vista de la Galaxia',
			galaxyRankColor: 'Color del ranking jugador/alianza',
			galaxy_Players: 'Resaltar a los siguientes Jugadores',
			galaxy_PlayerColors: 'Colores para los Jugadores resaltados',

			galaxyShowAllyRank: 'Mostrar ranking de las alianzas en la Galaxia',
			galaxy_Allys: 'Resaltar a las siguientes Alianzas',
			galaxy_AllyColors: 'Colores para las Alianzas resaltadas',

			galaxyDebrisMin: 'Tamaño mínimo de los escombros para recogerlos (0 para desactivar)',
			galaxyDebrisColor: 'Color de los escombros',

			msg_expandBox: 'Expandir el recuadro de mensaje',
			msg_addButtons: 'Otros botones de mensajes',

			msg_EspionageSpace: 'Reducir el spacio entre las filas',
			msg_PlunderThreshold: 'El límite mínimo para el saqueo teórico (x1000)',
			msg_DebrisThreshold: 'El límite mínimo de los escombros teórico (x1000)',
			msg_foldSmallPlunder: 'Ocultar los informes de batalla y de reciclaje por debajo del límite',
			msg_showPlunder: 'Mostrar el posible saqueo en los informes de espionaje',
			msg_addSimButton: 'Añadir botones para enviar los informes de espionaje al simulador',

			msg_fixColors: 'Corregir los colores de los informes de batalla',

			fleet_showCapacity: 'Mostrar la capacidad de carga y velocidad de las naves',
			fleet1_showResCalc: 'Mostrar calculadora de recursos',

			fleet2_fixLayout: 'Arreglar el diseño de la página de información del vuelo (página 2)',
			autocopyCoords: 'Auto-copiar coordenadas',
			autocopyGlobal: 'Memorizar coordenadas de cualquier página',
			fleet2_setTargetDF: 'Configurar escombros como objetivo si la flota incluye recicladores',
			fleet2_ShortLinks: 'Accesos directos a objetivos (page 2)',
			fleet2_MoonColor: 'Colorear lunas en la lista de accesos directos',
			fleet2_MoonsToEnd: 'Mover lunas al final de la lista de accesos directos',
			fleet2_expandLists: 'Expandir desplegables (Velocidad, Atajos, SACs)',
			fleet2_expandMoonColor: 'Lunas coloreadas en la lista expandida',
			fleet2_checkProbeCapacity: 'Comprobar capacidad de las sondas antes del envío (página 2)',

			missionPriority: 'Prioridad de la misión',

			mvmt_expandFleets: 'Mostrar la flota de buques y la carga',
			mvmt_showReversal: 'Mostrar la hora de vuelta de las flotas',
			evt_expandFleetsPhal: 'Mostrar la composición y capacidad de carga de la flota (Phalanx)',
			phalanx_showDebris: 'Mostrar escombros teóricos en el informe de Phalanx',
			evt_expandFleetsEvt: 'Mostrar la composición y capacidad de carga de la flota (Lista de Eventos)',
			evt_dimReverse: 'Resaltar flotas en retorno'
		}
	};

	function LabelsFR ()
	{
	    return {
			version: 2,

			btnMarkReadAll: 'Marquer tous les messages sélectionnés comme lus',
			btnDeleteSmallPlunder: 'Supprimer les rapports d\'espionnage avec pillage < $plunder et débris < $debris',

			msg_Simulator1: 'WebSim', 
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Débris',
			total: 'Total',
			loot: 'Butin',
			Save: 'Sauver',
			Clear: 'Effacer',

			Moon: 'Lune',
			
			tmTime: 'Heure',
			tmCountdown: 'Compte à rebours',
			rx_sendMail: /Envoyer un message à (.+)\./,
			
			TotalCapacity: 'Capacité totale',
			MinSpeed: 'Vitesse minimale',
			ExPoints: 'Expedition points',
			resources: 'Ressources',
			ArrivalACS: 'Arrivée (AG)',
			
			mvmt_Return: 'R',
			
			shipSCargoAlt: 'PT',
			shipLCargoAlt: 'GT',
			shipRecyclerAlt: 'Recs',
			shipRIPAlt: 'RIP',
			Quantity: 'Quantité',
			Duration: 'Durée',
			Consumption: 'Consommation',
			
			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Ressources manquantes',
			Production: 'Production',

			RequiredEnergy: 'Énergie requise'
		}
	};

	function InterfaceFR ()
	{
		return {
			version: 2,
			
			title: 'Options AntiGame',
			title: 'Options AntiGame',
			btnOk: 'OK',
			btnCancel: 'Annuler',
			btnHomePage: 'Home page',
			optionsNote1: 'L\'option est sauvegardée uniquement pour cet univers',
			resetCoords: 'Réinitialiser  - ',
			installNewVersion: 'Cliquer pour installer la nouvelle version',

			sectionGeneral: 'Général',
			sectionGeneral_Universe: 'Univers',
			sectionGeneral_Globalview: 'Vue globale',
			sectionGeneral_Objectview: 'Constructions, recherches et vaisseaux',
			sectionTime: 'Paramètres de l\'heure',
			sectionGalaxy: 'Galaxie',
			sectionGalaxy_Player: 'Player',
			sectionGalaxy_Alliance: 'Alliance',
			sectionGalaxy_Debris: 'Debris',
			sectionMessages: 'Messages',
			sectionMessages_Espionage: 'Rapports d\'espionnage',
			sectionMessages_Combat: 'Rapports de combat',
			sectionFleetDispatch: 'Envoi de flottes',
			sectionFleetDispatch_Fleet1: 'Page d\'envoi de flotte 1',
			sectionFleetDispatch_Fleet2: 'Page d\'envoi de flotte 2',
			sectionFleetDispatch_Fleet3: 'Page d\'envoi de flotte 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: ' Mouvements de flotte',
			sectionFleet_Phalanx: 'Phalanx',
			sectionFleet_Events: 'Events',
			sectionFleet_MissionColor: 'Couleur de mission',
			
			improveLayout: 'Améliorer l\'aménagement de cette page',
			improveUsability: 'Améliorer la convivialité de cette page',
			improveLayoutUse: 'Améliorer la disposition et la convivialité de cette page',
			simpleLayout: 'Simplifiez l\'agencement de cette page',
			killTips: 'Désactiver les info-bulles',
			
			language: 'Langage',
			update_check: 'Mise à jour automatique',
			thousandSeparator: 'Séparateur pour les milliers',
			btnDefault: 'Par défaut',
			blockAutoComplete: 'Bloquer l\'auto-complétion dans firefox',
			
			uni_SpeedFactor: 'Facteur de vitesse pour cet univers',
			uni_DFPercent: 'Percentage de la flotte dans les débris',
			uni_DefenseToDF: 'Pourcentage de la défence dans les débris',
			uni_maxPlayerScore: 'Le joueur le plus fort à plus de 5M points',
			
			showDeficient: 'Afficher les ressources manquantes',
			showResources: 'Afficher les informations de ressources avancées',
			show_onTop: 'Au dessus',
			show_onBottom: 'En dessous',
			show_onLeft: 'A gauche',

			showNames: 'Afficher les noms des vaisseaux/constructions/recherches sur les images',
			nameColorOn: 'Couleur du nom: disponible',
			nameColorOff: 'Couleur du nom: indisponible',
			nameColorDisabled: 'Couleur du nom: pas assez de ressources',
			showConstructionTitle: 'Afficher les titres des constructions dans la liste des planètes',
			shortHeader: 'Toujours réduire les images planètes',
			misc_scrollTitle: 'Temps restant avant le prochain évènement dans le titre de la fenêtre',
		
			timeAMPM: 'Utilisez le format 12h (AM/PM) au lieu de 24h',
			timeSetting: 'Changer les valeurs de temps (les heures seulement)',
			timeDontChange: 'Ne pas changer l\'heure',
			timeLocal: 'Toujours régler à l\'heure locale',
			timeServer: 'Toujours régler à l\'heure serveur',
			showServerOgameClock: 'Garder l\'heure du serveur pour l\'horloge en haut à droite',
			showServerPhalanx: 'Garder l\'heure du serveur pour la vue Phalanx',
			showPageStartTime: 'Afficher l`heure du dernier raffraichisement de la page',

			galaxy_keepTipsPlanets: 'Garder les infos-bulles pour les lunes et planètes',
			galaxy_keepTipsDebris: 'Garder les infos-bulles pour les champs de débris',
			galaxyHideMoon: 'Cacher l\'image de la lune (afficher sa taille à la place)',
			
			galaxyShowRank: 'Afficher le rang des joueurs dans la vue Galaxie',
			galaxyRankColor: 'Couleur des rangs Joueur/alliance',
			galaxy_Players: 'Surligner les joueurs suivants',
			galaxy_PlayerColors: 'Couleur des joueurs surlignés',
			
			galaxyShowAllyRank: 'Montrer le classement alliance dans la vue Galaxie', 
			galaxy_Allys: 'Surligner les alliances suivantes',
			galaxy_AllyColors: 'Couleur des alliances surlignées',

			galaxyDebrisMin: 'Taille minimale pour surligner les débris (0 pour désactiver)',
			galaxyDebrisColor: 'Couleur des débris surlignés',

			msg_expandBox: 'Augmenter la hauteur de des messages',		
			msg_addButtons: 'Ajouter des boutons pour les messages',
			
			msg_EspionageSpace: 'Réduire l\'espacement des ligne d\'un rapport d\'espionnage ',	
			msg_PlunderThreshold: 'Taille minimale pour pillage théorique (en K)',
			msg_DebrisThreshold: 'Taille minimale pour recyclage théorique (en K)',
			msg_foldSmallPlunder: 'Pliez les rapports avec le pillage et les débris inférieurs à la limite',
			msg_showPlunder: 'Afficher le pillage dans les rapports d\'espionnage',
			msg_addSimButton: 'Ajouter un bouton pour envoyer le rapport d\'espionnage sur WebSim',
					
			msg_fixColors: 'Fixer la couleur des rapports de combat', 
			
			fleet_showCapacity: 'Afficher la vitesse et la capacité des flottes',
			fleet1_showResCalc: 'Afficher le calculateur de ressources',

			fleet2_fixLayout: 'Corriger les informations d\'agencement',
			autocopyCoords: 'Copier automatiquement les coordonnées',
			autocopyGlobal: 'Mémoriser les coords sur toutes les pages (pas seulement la page courante d\ogame)',
			fleet2_setTargetDF: 'Sélectionner automatiquement le champ de débris si la flotte inclus un recycleur',
			fleet2_ShortLinks: 'Raccourcis de cibles',
			fleet2_MoonColor: 'Couleur de la lune dans la liste de raccourcis',
			fleet2_MoonsToEnd: 'Deplacer la lune à la fin de la liste de raccourcis',
			fleet2_expandLists: 'Epandre la liste de selectionner pour la vitesse et attaques groupées',
			fleet2_expandMoonColor: 'Color moons in expand list',
			fleet2_checkProbeCapacity: 'Vérifier la capacité des sondes avant le départ(page 2)',	

			missionPriority: 'Priorité de la mission',
			
			mvmt_expandFleets: 'Montrez la flotte et la cargaison de celle-ci',
			mvmt_showReversal: 'Afficher le temps inversé pour les flottes',
			evt_expandFleetsPhal: 'Afficher la composition et la cargaison de la flotte sur la phalange (Phalanx)',
			phalanx_showDebris: 'Afficher les débris théoriques sur la phalange',
			evt_expandFleetsEvt: 'Afficher la composition et la cargaison de la flotte dans la liste d\'événement (EventList)',
			evt_dimReverse: 'Assombrir les flottes de retour'
		}
	};

	function LabelsGR ()
	{
	    return {
			version: 2,

			btnMarkReadAll: 'Σημείωσε όλα τα μηνύματα ως διαβασμένα',
			btnDeleteSmallPlunder: 'Διαγραφή κατασκοπευτικών αναφορών με λάφυρα < $plunder και συντρίμμια < $debris',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Συντρίμμια',
			total: 'Συνολικά',
			loot: 'Λάφυρα',
			Save: 'Αποθήκευση',
			Clear: 'Καθαρισμός',

			Moon: 'φεγγάρι',

			tmTime: 'Χρόνος',
			tmCountdown: 'Αντίστροφη μέτρηση',
			rx_sendMail: /συγγραφή μηνύματος (.+)\./,

			TotalCapacity: 'Συνολική χωρητικότητα',
			MinSpeed: 'Ελάχιστη ταχύτητα',
			ExPoints: 'Βαθμοί Αποστολής',
			resources: 'Πόροι',
			ArrivalACS: 'Άφιξη ACS',

			mvmt_Return: 'Ε',

			shipSCargoAlt: 'Μικρό Μεταγωγικό',
			shipLCargoAlt: 'Μεγάλο Μεταγωγικό',
			shipRecyclerAlt: 'Ανακυκλωτής',
			shipRIPAlt: 'RIP',
			Quantity: 'Ποσότητα',
			Duration: 'Διάρκεια',
			Consumption: 'Κατανάλωση',

			shipSatelliteAlt: 'Η.Σ.',
			deficientRes: 'Έλλειψη πόρων',
			Production: 'Παραγωγή',

			RequiredEnergy: 'Χρειάζεται ενέργεια:'
		};
	};

	function InterfaceGR ()
	{
		return {
			version: 2,

			title: 'AntiGame Επιλογές',
			btnOk: 'OK',
			btnCancel: 'Άκυρο',
			btnHomePage: 'Home page',
			optionsNote1: 'Η επιλογή έχει αποθηκευτεί για το συγκεκριμένο σύμπαν',
			resetCoords: 'Επαναφορά - ',
			installNewVersion: 'Κάντε κλικ για εγκατάσταση νέας έκδοσης',

			sectionGeneral: 'Γενικές Ρυθμίσεις',
			sectionGeneral_Universe: 'Σύμπαν',
			sectionGeneral_Globalview: 'Global view',
			sectionGeneral_Objectview: 'Buildings, researches and ships',
			sectionTime: 'Ρυθμίσεις ώρας',
			sectionGalaxy: 'Γαλαξίας',
			sectionGalaxy_Player: 'Player',
			sectionGalaxy_Alliance: 'Alliance',
			sectionGalaxy_Debris: 'Debris',
			sectionMessages: 'Μηνύματα',
			sectionMessages_Espionage: 'Espionage reports',
			sectionMessages_Combat: 'Combat reports',
			sectionFleetDispatch: 'Αποστολή στόλου',
			sectionFleetDispatch_Fleet1: 'Fleet page 1',
			sectionFleetDispatch_Fleet2: 'Fleet page 2',
			sectionFleetDispatch_Fleet3: 'Fleet page 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Μετακίνηση στόλου',
			sectionFleet_Phalanx: 'Phalanx',
			sectionFleet_Events: 'Λίστα γεγονότων',			
			sectionFleet_MissionColor: 'Χρώμα αποστολής',

			improveLayout: 'Improve the layout of this page',
			improveUsability: 'Improve the usability of this page',
			improveLayoutUse: 'Improve layout and usebility of this page',
			simpleLayout: 'Simplify the layout of this page',
			killTips: 'Να μην εμφανίζονται tooltips',

			language: 'Γλώσσα',
			update_check: 'Έλεγχος για ενημερώσεις',
			thousandSeparator: 'Διαχωριστής πλήθους αριθμών',
			btnDefault: 'Default',
			blockAutoComplete: 'Σταμάτημα αυτόματης ολοκλήρωσης στον Firefox',

			uni_SpeedFactor: 'Ταχύτητα του σύμπαντος',
			uni_DFPercent: 'Ποσοστό αξίας στόλου σε πεδίο συντριμμιών',
			uni_DefenseToDF: 'Ποσοστό αξίας άμυνας σε πεδίο συντριμμιών',
			uni_maxPlayerScore: 'Ο δυνατότερος παίκτης έχει πάνω από 5M βαθμούς',
			
			showDeficient: 'Εμφάνιση πόρων που λείπουν',
			showResources: 'Εμφάνιση εκτεταμένων πληροφοριών πόρων',
			show_onTop: 'Στην κορυφή της σελίδας',
			show_onBottom: 'Στο τέλος της σελίδας',
			show_onLeft: 'Στα αριστερά',

			showNames: 'Εμφάνιση ονομάτων από διαστημόπλοια/κτήρια/έρευνες πάνω από τις εικόνες',
			nameColorOn: 'Χρώμα ονόματος: Διαθέσιμο',
			nameColorOff: 'Χρώμα ονόματος: Μη διαθέσιμο',
			nameColorDisabled: 'Χρώμα ονόματος: Δεν υπάρχουν αρκετοί πόροι',
			showConstructionTitle: 'Εμφάνιση κατασκευών στην επισκόπηση',
			shortHeader: 'Απόκρυψη εικόνας πλανήτη',
			misc_scrollTitle: 'Scroll time to the next event in the window title',

			timeAMPM: 'Χρήση 12ωρου αντί 24ωρου',
			timeSetting: 'Ρυθμίσεις ώρας',
			timeDontChange: 'Καμία άλλαγή - Αρχικές ρυθμίσεις',
			timeLocal: 'Ρύθμιση σε τοπική ζώνη ώρας',
			timeServer: 'Ρύθμιση με βάση την ώρα του server',
			showServerOgameClock: 'Χρήση ρυθμίσεων ώρας του server (πάνω δεξιά)',
			showServerPhalanx: 'Χρήση ρυθμίσεων ώρας για την Φάλαγγα',
			showPageStartTime: 'Εμφάνισε το χρόνο της τελευταίας ανανέωσης σελίδας',

			galaxy_keepTipsPlanets: 'Διατήρηση tooltips για τους πλανήτες και τα φεγγάρια',
			galaxy_keepTipsDebris: 'Διατήρηση tooltips για τα πεδία των συντριμμιών',
			galaxyHideMoon: 'Κρύψε την φωτογραφία του φεγγαριού (δείξε το μέγεθος του φεγγαριού αντί της φωτογραφίας)',

			galaxyShowRank: 'Εμφάνιση επιπέδων παίκτη/συμμαχίας στον γαλαξία',
			galaxyRankColor: 'Χρώμα των επιπέδων παίκτη/συμμαχίας',
			galaxy_Players: 'Επισήμανε τους εξής παίκτες',
			galaxy_PlayerColors: 'Χρώματα για την επισήμανση των παικτών',

			galaxyShowAllyRank: 'Show alliance ranks in Galaxy view',
			galaxy_Allys: 'Επισήμανε τις εξής συμμαχίες',
			galaxy_AllyColors: 'Χρώματα για την επισήμανση των συμμαχιών',

			galaxyDebrisMin: 'Ελάχιστο μέγεθος από συντρίμμια για επισήμανση (0 για να απενεργοποιηθεί)',
			galaxyDebrisColor: 'Χρώμα των επισημανόμενων συντριμμιών',

			msg_expandBox: 'Expand the messagebox height',
			msg_addButtons: 'Πρόσθετα κουμπιά στα μηνύματα',

			msg_EspionageSpace: 'Reducing row spacing with',
			msg_PlunderThreshold: 'Ελάχιστο όριο για λεηλάτηση (x1000)',
			msg_DebrisThreshold: 'Ελάχιστο όριο για συντρίμμια (x1000)',
			msg_foldSmallPlunder: 'Μην ενημερώσεις σχετικά με λεηλάτηση ή συντρίμμια χαμηλότερα από το όριο',
			msg_showPlunder: 'Συμπεριέλαβε την λεηλασία στις αναφορές σχετικά με κατασκοπεία',
			msg_addSimButton: 'Πρόσθεση κουμπιών για υποβολή των αναφορών κατασκοπείας στο WebSim',

			msg_fixColors: 'Αλλαγή χρωμάτων στις αναφορές μάχης',

			fleet_showCapacity: 'Εμφάνιση χωρητικότητας και ταχύτητας διαστημοπλοίων',
			fleet1_showResCalc: 'Εμφάνιση υπολογιστή πόρων',

			fleet2_fixLayout: 'Δημιουργία έκθεσης πληροφοριών πτήσης (σελίδα 2)',
			autocopyCoords: 'Αυτόματη αντιγραφή συντεταγμένων',
			autocopyGlobal: 'Memorize coordinates from any page (not only current Ogame universe tabs)',
			fleet2_setTargetDF: 'Θέσε τον στόχο σε DF αν ο στόλος περιλαμβάνει Ανακυκλωτές',
			fleet2_ShortLinks: 'Μικροσύνδεσμοι στόχων (σελίδα 2)',
			fleet2_MoonColor: 'Χρωματισμός φεγγαριών στη λίστα συντομεύσεων',
			fleet2_MoonsToEnd: 'Μετακίνηση φεγγαριών στο τέλος της λίστας συντομεύσεων',
			fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',
			fleet2_expandMoonColor: 'Color moons in expand list',
			fleet2_checkProbeCapacity: 'Έλεγχος χωρητικότητας πριν την αναχώρηση',

			missionPriority: 'Προτεραιότητα αποστολής',

			mvmt_expandFleets: 'Εμφάνισε τα διαστημόπλοια του στόλου και τα φορτία',
			mvmt_showReversal: 'Εμφάνισε τον χρόνο επιστροφής του στόλου',
			evt_expandFleetsPhal: 'Show fleet composition and cargo (Phalanx)',
			phalanx_showDebris: 'Εμφάνιση θεωρητικών συντριμμιών στη Φάλαγγα',
			evt_expandFleetsEvt: 'Show fleet composition and cargo (EventList)',
			evt_dimReverse: 'Dim returning fleets'
		};
	};

	function LabelsHR ()
	{
		return {
			version: 3,

			btnMarkReadAll: 'Označi sve prikazane poruke kao pročitane',
			btnDeleteSmallPlunder: 'Izbriši sva izvješća gdje je plijen < $plunder i ruševina < $debris',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Ruševine',
			total: 'Ukupno',
			loot: 'Plijen',
			Save: 'Sačuvaj',
			Clear: 'Očisti',

			Moon: 'Mjesec',

			tmTime: 'Vrijeme',
			tmCountdown: 'Odbrojavanje',
			rx_sendMail: /Pošalji poruku (.+)\./,

			TotalCapacity: 'Ukupni kapacitet',
			MinSpeed: 'Minimalna brzina',
			ExPoints: 'Bodovi expedicije',
			resources: 'Resursi',
			ArrivalACS: 'Dolazak (AKS)',

			mvmt_Return: 'R',

			shipSCargoAlt: 'MT',
			shipLCargoAlt: 'VT',
			shipRecyclerAlt: 'Rec',
			shipRIPAlt: 'ZS',
			Quantity: 'Količina',
			Duration: 'Trajanje',
			Consumption: 'Potrošnja',

			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Resursi koji nedostaju',
			Production: 'Proizvodnja',

			RequiredEnergy: 'Potrebno energije'
		}
	};

	function InterfaceHR ()
	{
		return {
			version: 3,

			title: 'AntiGame Opcije',
			btnOk: 'OK',
			btnCancel: 'Poništi',
			btnHomePage: 'Početna stranica',
			optionsNote1: 'Opcija je spremljena samo za ovaj univerzum',
			resetCoords: 'Poništi - ',
			installNewVersion: 'Klikni za instalaciju nove verzije',

			sectionGeneral: 'Općenito',
			sectionGeneral_Universe: 'Univerzum',
			sectionGeneral_Globalview: 'Globalni pregled',
			sectionGeneral_Objectview: 'Zgrade, istraživanja i brodovi',
			sectionTime: 'Postavke vremena',
			sectionGalaxy: 'Galaksija',
			sectionGalaxy_Player: 'Igrač',
			sectionGalaxy_Alliance: 'Savez',
			sectionGalaxy_Debris: 'Ruševine',
			sectionMessages: 'Poruke',
			sectionMessages_Espionage: 'Izvještaji špijunaže',
			sectionMessages_Combat: 'Izvještaji borbi',
			sectionFleetDispatch: 'Otpremanje flota',
			sectionFleetDispatch_Fleet1: 'Stranica flote 1',
			sectionFleetDispatch_Fleet2: 'Stranica flote 2',
			sectionFleetDispatch_Fleet3: 'Stranica flote 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Kretanje flota',
			sectionFleet_Phalanx: 'Falanga',
			sectionFleet_Events: 'Događanja',
			sectionFleet_MissionColor: 'Boja misije',

			improveLayout: 'Poboljšaj izgled ove stranice',
			improveUsability: 'Poboljšaj upotrebljivost ove stranice',
			improveLayoutUse: 'Poboljšaj izgled i upotrebljivost ove stranice',
			simpleLayout: 'Pojednostavi izgled ove stranice',
			killTips: 'Ne prikazuj napomene',

			language: 'Jezik',
			update_check: 'Automatska provjera za nadogradnju',
			thousandSeparator: 'Zarez za tisuću',
			btnDefault: 'Zadano',
			blockAutoComplete: 'Blokiraj Auto-Complete u Firefoxu',

			uni_SpeedFactor: 'Faktor brzine za ovaj uni',
			uni_DFPercent: 'Postotak flote koji se pretvara u ruševinu',
			uni_DefenseToDF: 'Postotak obrane koji se pretvara u ruševinu',
			uni_maxPlayerScore: 'Najjači igrač ima više od 5M bodova',
			
			showDeficient: 'Prikaži resurse koji nedostaju',
			showResources: 'Prikaži dodatne informacije o resursima',
			show_onTop: 'Na vrhu',
			show_onBottom: 'Na dnu',
			show_onLeft: 'Nalijevo',

			showNames: 'Prikaži imena preko slika za brodove/zgrade/istraživanja',
			nameColorOn: 'Naziv boje: Moguće',
			nameColorOff: 'Naziv boje: Nije moguće',
			nameColorDisabled: 'Naziv boje: Nedovoljno resursa',
			showConstructionTitle: 'Prikaži nazive gradnji na listi planeta',
			shortHeader: 'Uvijek smanji sliku planete',
			misc_scrollTitle: 'Prikaži vrijeme sljedece flote u naslovu prozora/taba',

			timeAMPM: 'Koristi 12-satni format (AM/PM) umjesto 24-satnog',
			timeSetting: 'Promjeni postavke vremena (samo za sate)',
			timeDontChange: 'Ne mijenjaj vrijeme',
			timeLocal: 'Uvijek prikazuj lokalno vrijeme',
			timeServer: 'Uvijek prikazuj vrijeme servera',
			showServerOgameClock: 'Zadrži prikaz vremena servera u gornjem desnom uglu',
			showServerPhalanx: 'Zadrži vrijeme servera za Falangu',
			showPageStartTime: 'Prikaži vrijeme kada je stranica zadnji puta osvježena',

			galaxy_keepTipsPlanets: 'Zadrži prikaz napomena za planete i mjesece',
			galaxy_keepTipsDebris: 'Zadrži prikaz napomena za ruševine',
			galaxyHideMoon: 'Sakrij sliku mjeseca (umjesto slike prikaži velicinu mjeseca)',

			galaxyShowRank: 'Prikaži rang igrača/saveza u galaksiji',
			galaxyRankColor: 'Boja za rang igrača/saveza',
			galaxy_Players: 'Označi sljedece igrače',
			galaxy_PlayerColors: 'Boje za označavanje igrača',

			galaxyShowAllyRank: 'Prikaži rang saveza u pregledu galaksije',
			galaxy_Allys: 'Označi slijedeće saveze',
			galaxy_AllyColors: 'Boje za označavanje saveza',

			galaxyDebrisMin: 'Minimalna veličina ruševine koja će se istaknuti (0 za isključiti)',
			galaxyDebrisColor: 'Boja istaknutih ruševina',

			msg_expandBox: 'Povećaj veličinu okvira za poruku',
			msg_addButtons: 'Dodatne tipke na porukama',

			msg_EspionageSpace: 'Smanji razmak između redova',
			msg_PlunderThreshold: 'Donji limit za teoretski plijen (x1000)',
			msg_DebrisThreshold: 'Donji limit za teoretsku ruševinu (x1000)',
			msg_foldSmallPlunder: 'Skopiti izvješća s pljačkom i ruševinama manjih od zadanog minimuma',
			msg_showPlunder: 'Prikaži plijen u izvješću špijunaže',
			msg_addSimButton: 'Dodaj gumbove za online simulaciju borbi',

			msg_fixColors: 'Podesi boje izvještaja o borbi',

			fleet_showCapacity: 'Prikaži kapacitet i brzinu brodova',
			fleet1_showResCalc: 'Prikaži kalkulator za resurse',

			fleet2_fixLayout: 'Popravi prikaz menija za slanje flote (stranica 2)',
			autocopyCoords: 'Automatski kopiraj koordinate',
			autocopyGlobal: 'Zapamti koordinate sa bilo koje stranice (sa svih OGame tabova)',
			fleet2_setTargetDF: 'Namjesti cilj na ruševinu ako u floti ima reciklera',
			fleet2_ShortLinks: 'Prečac do mete (stranica 2)',
			fleet2_MoonColor: 'Boja za mjesece u izborniku',
			fleet2_MoonsToEnd: 'Premjesti mjesece na kraj liste',
			fleet2_expandLists: 'Proširi padajuće izbornike (Brzina, Kratice za planete, AKS)',
			fleet2_expandMoonColor: 'Boja mjesecu u proširenoj listi',
			fleet2_checkProbeCapacity: 'Provjeri kapacitet sonde prije slanja (stranica 2)',

			missionPriority: 'Prioritet misije',

			mvmt_expandFleets: 'Pokaži sastav flote i teret flote',
			mvmt_showReversal: 'Pokaži povratno vrijeme flote',
			evt_expandFleetsPhal: 'Prikaži sastav flote i teret (Falanga)',
			phalanx_showDebris: 'Prikaži teoretsku veličinu ruševine u Falangi',
			evt_expandFleetsEvt: 'Prikaži sastav flote i teret (u listi događanja)',
			evt_dimReverse: 'Zatamni flote na povratku'
		}
	};

	function LabelsIT ()
	{
	    return {
			version: 2,

			btnMarkReadAll: 'Segna tutti i messaggi visualizzati come letti',
			btnDeleteSmallPlunder: 'Cancella i rapporti di spionaggio con saccheggio < di $plunder e detriti < di $debris',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Detriti',
			total: 'Totale',
			loot: 'Bottino',
			Save: 'Salva',
			Clear: 'Azzera',

			Moon: 'Luna',

			tmTime: 'Orario',
			tmCountdown: 'Conto alla rovescia',
			rx_sendMail: /Send a message to (.+)\./,

			TotalCapacity: 'Capacità Totale',
			MinSpeed: 'Velocità minima',
			ExPoints: 'Punti spedizione',
			resources: 'Risorse',
			ArrivalACS: 'Arrivo (ACS)',

			mvmt_Return: 'R',

			shipSCargoAlt: 'CL',
			shipLCargoAlt: 'CP',
			shipRecyclerAlt: 'Recy',
			shipRIPAlt: 'RIP',
			Quantity: 'Quantità',
			Duration: 'Durata',
			Consumption: 'Consumo',

			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Risorse mancanti',
			Production: 'Produzione',

			RequiredEnergy: 'Energia necessaria'
		};
	};

	function InterfaceIT ()
	{
		return {
			version: 2,

			title: 'Opzioni di AntiGame',
			btnOk: 'OK',
			btnCancel: 'Annulla',
			btnHomePage: 'Home page',
			optionsNote1: 'L\'opzione viene memorizzata solo per questo universo',
			resetCoords: 'Annulla - ',
			installNewVersion: 'Clicca per installare la nuova versione',

			sectionGeneral: 'Generale',
			sectionGeneral_Universe: 'Universo',
			sectionGeneral_Globalview: 'Global view',
			sectionGeneral_Objectview: 'Buildings, researches and ships',
			sectionTime: 'Impostazioni orario',
			sectionGalaxy: 'Galassia',
			sectionGalaxy_Player: 'Player',
			sectionGalaxy_Alliance: 'Alliance',
			sectionGalaxy_Debris: 'Debris',
			sectionMessages: 'Messaggi',
			sectionMessages_Espionage: 'Espionage reports',
			sectionMessages_Combat: 'Combat reports',
			sectionFleetDispatch: 'Invio della flotta',
			sectionFleetDispatch_Fleet1: 'Fleet page 1',
			sectionFleetDispatch_Fleet2: 'Fleet page 2',
			sectionFleetDispatch_Fleet3: 'Fleet page 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Movimenti di flotta',
			sectionFleet_Phalanx: 'Phalanx',
			sectionFleet_Events: 'Lista Eventi',
			sectionFleet_MissionColor: 'Colore della missione',

			improveLayout: 'Improve the layout of this page',
			improveUsability: 'Improve the usability of this page',
			improveLayoutUse: 'Improve layout and usebility of this page',
			simpleLayout: 'Simplify the layout of this page',
			killTips: 'Nascondi i suggerimenti',

			language: 'Lingua',
			update_check: 'Controllo automatico aggiornamenti',
			thousandSeparator: 'Separatore delle migliaia',
			btnDefault: 'Default',
			blockAutoComplete: 'Blocca l\'autocompletamento in Firefox',

			uni_SpeedFactor: 'Fattore di velocità di questo universo',
			uni_DFPercent: 'Percentuale di flotta nel Campo Detriti',
			uni_DefenseToDF: 'Percentuale di difese nel Campo Detriti',
			uni_maxPlayerScore: 'Il giocatore più forte ha più di 5M punti',
			
			showDeficient: 'Mostra le risorse mancanti',
			showResources: 'Mostra informazioni estese sulle risorse',
			show_onTop: 'In alto',
			show_onBottom: 'In basso',
			show_onLeft: 'A sinistra',

			showNames: 'Mostra i nomi di navi/costruzioni/ricerche sulle immagini',
			nameColorOn: 'Colore per: disponibile',
			nameColorOff: 'Colore per: non disponibile',
			nameColorDisabled: 'Colore per: risorse insufficienti',
			showConstructionTitle: 'Mostra il nome della costruzione nella lista pianeti',
			shortHeader: 'Riduci sempre l\'immagine dei pianeti',
			misc_scrollTitle: 'Mostra l\'orario del prossimo evento nel titolo della finestra',

			timeAMPM: 'Usa il formato 12 ore (AM/PM) al posto di quello 24 ore',
			timeSetting: 'Cambia le impostazioni dell\'orario (solo per le ore)',
			timeDontChange: 'Non cambiare l\'orario',
			timeLocal: 'Imposta sempre il fuso orario locale',
			timeServer: 'Imposta sempre il fuso orario del server',
			showServerOgameClock: 'Mantieni l\'ora del server nell\'orologio in alto a destra di Ogame',
			showServerPhalanx: 'Mantieni l\'ora del server nella visuale Falange',
			showPageStartTime: 'Mostra l\'orario in cui la pagina è stata aggiornata l\'ultima volta',

			galaxy_keepTipsPlanets: 'Mantieni i suggerimenti per pianeti e lune',
			galaxy_keepTipsDebris: 'Mantieni i suggerimenti per i campi detriti',
			galaxyHideMoon: 'Nascondi l\'immagine della Luna (mostra la dimensione al suo posto)',

			galaxyShowRank: 'Mostra la posizione in classifica del giocatore/alleanza nella visuale galassia',
			galaxyRankColor: 'Colore della posizione in classifica del giocatore/alleanza',
			galaxy_Players: 'Evidenzia i seguenti giocatori',
			galaxy_PlayerColors: 'Colori da usare per evidenziare i giocatori',

			galaxyShowAllyRank: 'Show alliance ranks in Galaxy view',
			galaxy_Allys: 'Evidenzia le seguenti alleanze',
			galaxy_AllyColors: 'Colori da usare per evidenziare le alleanze',

			galaxyDebrisMin: 'Dimensione minima del campo detriti da evidenziare (0 per disabilitarlo)',
			galaxyDebrisColor: 'Colore del campo detriti evidenziato',

			msg_expandBox: 'Expand the messagebox height',
			msg_addButtons: 'Pulsanti aggiuntivi nei messaggi',

			msg_EspionageSpace: 'Reducing row spacing with',
			msg_PlunderThreshold: 'Valore minimo per il saccheggio teorico (x1000)',
			msg_DebrisThreshold: 'Valore minimo per i detriti teorici (x1000)',
			msg_foldSmallPlunder: 'Elimina i rapporti con saccheggio e campo detriti inferiori al minimo',
			msg_showPlunder: 'Mostra il saccheggio nei rapporti di spionaggio',
			msg_addSimButton: 'Aggiungi i pulsanti per inviare il rapporto di spionaggio a WebSim',

			msg_fixColors: 'Correggi i colori dei rapporti di combattimento',

			fleet_showCapacity: 'Mostra la stiva e la velocità delle navi',
			fleet1_showResCalc: 'Mostra il calcolatore di risorse',

			fleet2_fixLayout: 'Correggi l\'impostazione delle informazioni di volo (pagina 2)',
			autocopyCoords: 'Copia automatica delle coordinate',
			autocopyGlobal: 'Memorizza le coordinate da qualunque pagina (non solo dalla scheda del corrente universo di Ogame)',
			fleet2_setTargetDF: 'Imposta l\'obiettivo a Campo detriti se la flotta include riciclatrici',
			fleet2_ShortLinks: 'Collegamento rapido all\'obiettivo (pagina 2)',
			fleet2_MoonColor: 'Colore delle lune nella lista scorciatoie',
			fleet2_MoonsToEnd: 'Sposta le lune alla fine della lista scorciatoie',
			fleet2_expandLists: 'Espandi i menu a tendina (Velocità, Scorciatoie, ACS)',
			fleet2_expandMoonColor: 'Color moons in expand list',
			fleet2_checkProbeCapacity: 'Verifica la capacità delle sonde spia prima dell\'invio (pagina 2)',

			missionPriority: 'Priorità della missione',

			mvmt_expandFleets: 'Mostra le navi della flotta',
			mvmt_showReversal: 'Mostra il conto alla rovescia per le flotte',
			evt_expandFleetsPhal: 'Mostra la composizione di flotta e le risorse trasportate (Falange)',
			phalanx_showDebris: 'Mostra i detriti teorici nella vista Falange',
			evt_expandFleetsEvt: 'Mostra la composizione di flotta e le risorse trasportate (Lista Eventi)',
			evt_dimReverse: 'Dim returning fleets'
		};
	};

	function LabelsJP()
	{
	    return {
			version: 2,

			btnMarkReadAll: '読み取りとして表示されているすべてのメッセージをマーク',
			btnDeleteSmallPlunder: 'スパイレポートを削除 略奪品 < $plunder とデブリ < $debris',
			// SpyReport
			msg_Simulator1: 'WebSim', // New 1.40.0
			msg_Simulator2: 'DragoSim', // New 1.40.0
			msg_Simulator3: 'OSimulate', // New 1.40.0
			debris: 'デブリ',
			total: '合計',
			loot: '戦利品',
			Save: '保存',
			Clear: 'クリア',
			// Galaxy
			Moon: '月',
			// Eventlist
			tmTime: '時間',
			tmCountdown: 'カウントダウン',
			rx_sendMail: /Send a message to (.+)\./,
			// FleetSend
			TotalCapacity: '総容量',
			MinSpeed: '最小限の速度',
			ExPoints: '遠征ポイント',
			resources: '資源',
			ArrivalACS: '到着 (ACS)',
			// FleetMovement
			mvmt_Return: 'R',
			// Calculator
			shipSCargoAlt: '小型輸送機',
			shipLCargoAlt: '大型輸送機',
			shipRecyclerAlt: '残骸回収船',
			shipRIPAlt: 'デススター',  // New 1.40.0
			Quantity: '数量',
			Duration: '期間',
			Consumption: '消費',
			// Resources
 			shipSatelliteAlt: 'サテライト',
			deficientRes: '資源不足',
			Production: '生産',
			// Not used
			RequiredEnergy: '必要なエネルギー'
		}
	};

	function InterfaceJP ()
	{
		return {
			version: 2,

			title: 'AntiGameオプション',
			btnOk: 'OK',
			btnCancel: 'キャンセル',
			btnHomePage: 'ホームページ', 
			optionsNote1: 'このオプションは、この宇宙のために保存されます',
			resetCoords: 'リセット - ',
			installNewVersion: '新しいバージョンをインストールするにはクリック',

			sectionGeneral: '全般',
			sectionGeneral_Universe: '宇宙',
			sectionGeneral_Globalview: 'グローバルビュー',
			sectionGeneral_Objectview: '施設, リサーチと艦隊',
			sectionTime: '時間設定',
			sectionGalaxy: '銀河',
			sectionGalaxy_Player: 'プレイヤー',
			sectionGalaxy_Alliance: '同盟',
			sectionGalaxy_Debris: 'デブリ',
			sectionMessages: 'メッセージ',
			sectionMessages_Espionage: 'スパイレポート',
			sectionMessages_Combat: 'バトルレポート',
			sectionFleetDispatch: '艦隊派遣',
			sectionFleetDispatch_Fleet1: '艦隊 ページ 1',
			sectionFleetDispatch_Fleet2: '艦隊 ページ 2',
			sectionFleetDispatch_Fleet3: '艦隊 ページ 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: '艦隊動向',
			sectionFleet_Phalanx: 'Phalanx',
			sectionFleet_Events: 'イベントリストと大型センサー',
			sectionFleet_MissionColor: 'ミッションの色 (フォーマット: ABCDEF - Websafe format ACE)',

			improveLayout: 'このページのレイアウトを向上させる',
			improveUsability: 'このページのユーザビリティを向上させる',
			improveLayoutUse: 'このページのレイアウトとユーザビリティを向上させる',
			simpleLayout: 'このページのレイアウトを簡素化',
			killTips: 'ツールチップ非表示',

			language: '設定メニューの言語',
			update_check: 'アップデートの自動チェック',
			thousandSeparator: '桁区切り記号',
			btnDefault: 'デフォルト',
			blockAutoComplete: 'Firefoxのオートコンプリートをブロックする',

			uni_SpeedFactor: 'この宇宙の速度係数',
			uni_DFPercent: '艦隊デブリの割合',
			uni_DefenseToDF: '防衛デブリの割合',
			uni_maxPlayerScore: '5Mポイント以上のものを持っている最強プレーヤー',
			
			showDeficient: '不足資源の情報を表示',
			showResources: '拡張資源の情報を表示',
			show_onTop: '上部に',
			show_onBottom: '下部に',
			show_onLeft: '左に',
			
			showNames: '画像の上に船/施設/リサーチの名前を表示する',
			nameColorOn: '名前の色：使用',
			nameColorOff: '名前の色：未使用',
			nameColorDisabled: '名前の色：資源不足',
			showConstructionTitle: '惑星リストで建設タイトルを表示',
			shortHeader: '常に惑星の画像を最小限に抑える',
			misc_scrollTitle: 'ウィンドウタイトルに次のイベント時間をスクロール',

			timeAMPM: '12時間形式(AM/PM)の代わりに24時間形式を使用',
			timeSetting: '時刻の値を変更(時間のみ)',
			timeDontChange: '時間を変更しない',
			timeLocal: '常にローカルタイムゾーンに設定',
			timeServer: '常にサーバータイムゾーンに設定',
			showServerOgameClock: '右上OGame時間のためにサーバの時間を維持',
			showServerPhalanx: '大型センサービューのためにサーバの時間を維持',
			showPageStartTime: 'ページが最後にリフレッシュされる時間を表示',

			galaxy_keepTipsPlanets: '惑星と月のためにツールチップを残す',
			galaxy_keepTipsDebris: 'デブリフィールドにツールチップを残す',
			galaxyHideMoon: '月の画像を隠す(代わりに表示する月の大きさ)',

			galaxyShowRank: '銀河ビューでプレイヤーランクの表示', 
			galaxyRankColor: 'プレイヤー/同盟ランクの色',
			galaxy_Players: 'プレーヤーを強調表示',
			galaxy_PlayerColors: 'プレーヤーを色の強調表示',

			galaxyShowAllyRank: '銀河ビューで同盟ランクの表示',
			galaxy_Allys: '同盟員の色の強調表示',
			galaxy_AllyColors: '同盟の色の強調表示',

			galaxyDebrisMin: '強調表示するためのデブリの最小サイズ (0 to turn off)',
			galaxyDebrisColor: 'デブリを色の強調表示',

			msg_expandBox: 'メッセージボックスの高さを拡張する',
			msg_addButtons: 'メッセージの追加ボタン',

			msg_EspionageSpace: '行間隔を減らす',
			msg_PlunderThreshold: '理論上の略奪のための下限値 (x1000)',
			msg_DebrisThreshold: '理論上のデブリのための下限値 (x1000)',
			msg_foldSmallPlunder: '略奪とデブリの限界未満のレポートをフォールド',
			msg_showPlunder: 'スパイレポートでの略奪品の表示',
			msg_addSimButton: 'シミュレータにスパイの報告書を提出するためのボタンを追加',

			msg_fixColors: '戦闘報告書の色の修正',

			fleet_showCapacity: '船の容量と速度の表示',
			fleet1_showResCalc: '資源の計算機を表示',

			fleet2_fixLayout: '長いテキストのフライト情報のレイアウトの修正',
			autocopyCoords: '座標の自動コピー',
			autocopyGlobal: '他の外部ページから座標を記憶',
			fleet2_setTargetDF: '艦隊に残骸回収船が含まれている場合デブリに目標を設定',
			fleet2_ShortLinks: 'ターゲットのショートリンク',
			fleet2_MoonColor: 'ショートリンク一覧で月の色',
			fleet2_MoonsToEnd: '月をショートリンク一覧の末尾に移動',
			fleet2_expandLists: 'ドロップダウンボックス(スピード,ショートカット,ACS)を展開',
			fleet2_expandMoonColor: '色の月リストを展開',
			fleet2_checkProbeCapacity: '出発する前にプローブの容量を確認',

			missionPriority: 'ミッションの優先度',

			mvmt_expandFleets: '艦隊の船と輸送船の表示',
			mvmt_showReversal: '艦隊の帰還時間の表示',
			evt_expandFleetsPhal: '艦隊の構成と貨物を表示 (大型センサー)',
			phalanx_showDebris: '大型センサービューで理論上の残骸を表示する',
			evt_expandFleetsEvt: '艦隊の構成と貨物を表示 (イベントリスト)',
			evt_dimReverse: '帰還艦隊を暗く表示'
		}
	};
	
	function LabelsNL ()
	{
	    return {
			version: 2,

			btnMarkReadAll: 'Markeer alle zichtbare berichten als gelezen',
			btnDeleteSmallPlunder: 'Verwijder spionagerapporten met buit onder < $plunder en puin onder < $debris',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Puin',
			total: 'Totaal',
			loot: 'Buit',
			Save: 'Opslaan',
			Clear: 'Wissen',

			Moon: 'Maan',

			tmTime: 'Tijd',
			tmCountdown: 'Aftellen',
			rx_sendMail: /Stuur een bericht naar (.+)\./,

			TotalCapacity: 'Totale laadvermogen',
			MinSpeed: 'Minimale snelheid',
			ExPoints: 'Expeditie punten',
			resources: 'Grondstoffen',
			ArrivalACS: 'Aankomst (AGS)',

			mvmt_Return: 'R',

			shipSCargoAlt: 'KV',
			shipLCargoAlt: 'GV',
			shipRecyclerAlt: 'Recs',
			shipRIPAlt: 'RIP',
			Quantity: 'Aantal',
			Duration: 'Duur',
			Consumption: 'Consumptie',

			shipSatelliteAlt: 'Sats',
			deficientRes: 'Missende grondstoffen',
			Production: 'Productie',

			RequiredEnergy: 'Benodigde energie'
		};
	};

	function InterfaceNL ()
	{
		return {
			version: 2,

			title: 'AntiGame Opties',
			btnOk: 'OK',
			btnCancel: 'Annuleer',
			btnHomePage: 'Home page',
			optionsNote1: 'Deze opties gelden enkel voor dit universum',
			resetCoords: 'Herstel - ',
			installNewVersion: 'Klik om nieuwe versie te installeren',

			sectionGeneral: 'Algemeen',
			sectionGeneral_Universe: 'Universum',
			sectionGeneral_Globalview: 'Global view',
			sectionGeneral_Objectview: 'Buildings, researches and ships',
			sectionTime: 'Tijd instellingen',
			sectionGalaxy: 'Melkweg',
			sectionGalaxy_Player: 'Player',
			sectionGalaxy_Alliance: 'Alliance',
			sectionGalaxy_Debris: 'Debris',
			sectionMessages: 'Berichten',
			sectionMessages_Espionage: 'Espionage reports',
			sectionMessages_Combat: 'Combat reports',
			sectionFleetDispatch: 'Vlootverzending',
			sectionFleetDispatch_Fleet1: 'Fleet page 1',
			sectionFleetDispatch_Fleet2: 'Fleet page 2',
			sectionFleetDispatch_Fleet3: 'Fleet page 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Vlootbeweging',
			sectionFleet_Phalanx: 'Phalanx',
			sectionFleet_Events: 'Gebeurtenissenlijst',
			sectionFleet_MissionColor: 'Kleur voor',

			improveLayout: 'Improve the layout of this page',
			improveUsability: 'Improve the usability of this page',
			improveLayoutUse: 'Improve layout and usebility of this page',
			simpleLayout: 'Simplify the layout of this page',
			killTips: 'Verwijder tooltips',

			language: 'Taal',
			update_check: 'Zoek automatisch naar updates',
			thousandSeparator: 'Duizendtal scheidingsteken',
			btnDefault: 'Standaard',
			blockAutoComplete: 'Blokkeer automatisch aanvullen in Firefox',

			uni_SpeedFactor: 'Snelheid van universum',
			uni_DFPercent: 'Percentage vloot-naar-puin',
			uni_DefenseToDF: 'Percentage verdediging-naar-puin',
			uni_maxPlayerScore: 'De sterkste speler heeft meer dan 5M punten',
			
			showDeficient: 'Toon missende grondstoffen',
			showResources: 'Toon uitgebreide grondstof informatie',
			show_onTop: 'Boven',
			show_onBottom: 'Onder menu',
			show_onLeft: 'Links van menu',

			showNames: 'Toon schip/gebouw/onderzoek namen op afbeeldingen',
			nameColorOn: 'Kleur als het beschikbaar is',
			nameColorOff: 'Kleur als het niet beschikbaar is',
			nameColorDisabled: 'Kleur als er niet genoeg grondstoffen zijn',
			showConstructionTitle: 'Toon constructies die bezig zijn in planetenlijst',
			shortHeader: 'Minimaliseer planeet afbeelding altijd',
			misc_scrollTitle: 'Laat volgende gebeurtenis in titel van de brower scrollen',

			timeAMPM: 'Gebruik 12-uurs notatie (AM/PM) i.p.v. 24-uurs',
			timeSetting: 'Verander tijd-waarden (alleen uren)',
			timeDontChange: 'Verander de tijd niet',
			timeLocal: 'Gebruik altijd naar locale tijdzone',
			timeServer: 'Gebruik altijd server tijdzone',
			showServerOgameClock: 'Gebruik server tijd voor de Ogame klok rechts boven',
			showServerPhalanx: 'Gebruik server tijd voor Phalanx overzicht',
			showPageStartTime: 'Toon de tijd sinds laatste pagina refresh',

			galaxy_keepTipsPlanets: 'Behoud tooltips voor planeten en maan',
			galaxy_keepTipsDebris: 'Behoud tooltips voor puinveld',
			galaxyHideMoon: 'Toon omvang maan i.p.v. afbeelding',

			galaxyShowRank: 'Toon speler/alliantie ranks in melkweg',
			galaxyRankColor: 'Kleur van speler/alliantie ranks',
			galaxy_Players: 'Markeer de volgende spelers',
			galaxy_PlayerColors: 'Kleuren voor speler markering',

			galaxyShowAllyRank: 'Show alliance ranks in Galaxy view',
			galaxy_Allys: 'Markeer de volgende allianties',
			galaxy_AllyColors: 'Kleuren voor alliantie markering',

			galaxyDebrisMin: 'Minimale grootte om puinveld te markeren (0 om uit te zetten)',
			galaxyDebrisColor: 'Kleur van gemarkeerd puinveld',

			msg_expandBox: 'Expand the messagebox height',
			msg_addButtons: 'Extra knoppen bij berichten',

			msg_EspionageSpace: 'Reducing row spacing with',
			msg_PlunderThreshold: 'Minimale theoretische buit (x1000)',
			msg_DebrisThreshold: 'Minimaal theoretisch puinveld (x1000)',
			msg_foldSmallPlunder: 'Minimaliseer spionagerapporten met buit en puin onder het minimaal aantal',
			msg_showPlunder: 'Toon buit in spionagerapporten',
			msg_addSimButton: 'Knoppen om spionagerapporten naar WebSim/DragoSim te zenden',

			msg_fixColors: 'Geef correcte kleur aan gevechtsrapporten',

			fleet_showCapacity: 'Toon laadvermogen en snelheid schepen',
			fleet1_showResCalc: 'Toon grondstoffen calculator',

			fleet2_fixLayout: 'Pas de vlucht informatie layout aan (pagina 2)',
			autocopyCoords: 'Kopieer coordinaten automatisch',
			autocopyGlobal: 'Onthoud coordinaten van iedere pagina (Niet alleen OGame pagina\'s)',
			fleet2_setTargetDF: 'Zet bestemming naar puinveld als er recyclers bij de vloot zitten',
			fleet2_ShortLinks: 'Planeet shortcut lijst (pagina 2)',
			fleet2_MoonColor: 'Kleur van manen in shortcut lijst',
			fleet2_MoonsToEnd: 'Verplaats manen naar het einde van de shortcut lijst',
			fleet2_expandLists: 'Breid drop-down boxen uit(Snelheid, Shortcuts, AGS)',
			fleet2_expandMoonColor: 'Color moons in expand list',
			fleet2_checkProbeCapacity: 'Controleer sonde opslagruimte voor vertrek (pagina 2)',

			missionPriority: 'Missie prioriteit',

			mvmt_expandFleets: 'Toon lading en schepen in vloot',
			mvmt_showReversal: 'Toon terugkeer tijd voor vloten',
			evt_expandFleetsPhal: 'Toon vloot samenstelling en vracht (Phalanx)',
			phalanx_showDebris: 'Toon theoretisch puin in Phalanx overzicht',
			evt_expandFleetsEvt: 'Toon vloot samenstelling en vracht (Gebeurtenissenlijst)',
			evt_dimReverse: 'Maak terugkerende vloten dof'
		};
	};

	function LabelsNO ()
	{
	    return {
			version: 3,

			btnMarkReadAll: 'Marker alle vises meldinger som lest ',
			btnDeleteSmallPlunder: 'Slett spion rapporter med Bytte <$ Bytte og vrakrester <$ vrakrester',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'vrakrester',
			total: 'Totall',
			loot: 'bytte',
			Save: 'Lagre',
			Clear: 'Slett',

			Moon: 'Måne',

			tmTime: 'Tid',
			tmCountdown: 'nedtelling',
			rx_sendMail: /Send melding til (.+)\./,

			TotalCapacity: 'Totall kapasitet',
			MinSpeed: 'minste hastighet',
			ExPoints: 'Ekspedisjons poeng',
			resources: 'ressurser',
			ArrivalACS: 'Ankomst (ACS)',

			mvmt_Return: 'R',

			shipSCargoAlt: 'LL',
			shipLCargoAlt: 'SL',
			shipRecyclerAlt: 'Recs',
			shipRIPAlt: 'RIP',
			Quantity: 'Antall',
			Duration: 'varighet',
			Consumption: 'forbruk',

			shipSatelliteAlt: 'Sat.',
			deficientRes: 'manglende ressurser',
			Production: 'Produksjon',

			RequiredEnergy: 'Energi behov'
		}
	};

	function InterfaceNO ()
	{
		return {
			version: 3,

			title: 'AntiGame Innstillinger',
			btnOk: 'OK',
			btnCancel: 'Avbryt',
			btnHomePage: 'Home page',
			optionsNote1: 'Alternativet er lagret for kun dette universet',
			resetCoords: 'Reset kordinater- ',
			installNewVersion: 'Klikk for å installere ny versjon',

			sectionGeneral: 'Generell',
			sectionGeneral_Universe: 'Univers',
			sectionGeneral_Globalview: 'Generell oversikt',
			sectionGeneral_Objectview: 'Bygninger, forskning og skip ',
			sectionTime: 'tidsinnstillinger',
			sectionGalaxy: 'Galakse',
			sectionGalaxy_Player: 'Spiller',
			sectionGalaxy_Alliance: 'Allianse',
			sectionGalaxy_Debris: 'vrakfelt',
			sectionMessages: 'Meldinger',
			sectionMessages_Espionage: 'Spionasje rapporter',
			sectionMessages_Combat: 'Angreps rapporter',
			sectionFleetDispatch: 'Flåte utsendelse',
			sectionFleetDispatch_Fleet1: 'Flåte side 1',
			sectionFleetDispatch_Fleet2: 'Flåte side 2',
			sectionFleetDispatch_Fleet3: 'Flåte side 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Flåte bevegelse',
			sectionFleet_Phalanx: 'Phalanx',
			sectionFleet_Events: 'Event liste',
			sectionFleet_MissionColor: 'Oppdrags farge',

			improveLayout: 'Forbedre utseendet på denne siden',
			improveUsability: 'Forbedre brukbarheten av denne siden',
			improveLayoutUse: 'Forbedre oppsett og brukervennlighet på denne siden',
			simpleLayout: 'Forenkle oppsettet av denne siden',
			killTips: 'Slå av tips',

			language: 'Språk',
			update_check: 'Auto-sjekk for oppdateringer',
			thousandSeparator: 'Tusind separator',
			btnDefault: 'standard',
			blockAutoComplete: 'Blokere Auto-fullfør i Firefox',

			uni_SpeedFactor: 'Speed faktor i dette univers',
			uni_DFPercent: 'Prosentandel av flåtestruktur til avfallsavdeling',
			uni_DefenseToDF: 'Prosentandel av forsvar til avfallsavdeling',
			uni_maxPlayerScore: 'Den sterkeste spilleren har mer enn 5M poeng',
			
			showDeficient: 'Vis manglende ressurser',
			showResources: 'Vis utvidet ressursene informasjon',
			show_onTop: 'på toppen',
			show_onBottom: 'på bunden',
			show_onLeft: 'til venstre',

			showNames: 'Vis skip / bygg / forskning navn over bildene',
			nameColorOn: 'Navn farge: tilgjengelig',
			nameColorOff: 'Navn farge: utilgjengelig ',
			nameColorDisabled: 'Navn farge: ikke nok ressurser',
			showConstructionTitle: 'Vis byggingens titler i planet listen',
			shortHeader: 'Alltid minimere planet bilde',
			misc_scrollTitle: 'Bla til neste arrangement i vinduet tittelen',

			timeAMPM: 'Bruk 12-timers format (AM / PM) i stedet for 24-timers',
			timeSetting: 'Endre tids verdier (Kun timer )',
			timeDontChange: 'Ikke endre tid',
			timeLocal: 'Alltid sett til lokal tidssone',
			timeServer: 'Alltid sett til server tidssone',
			showServerOgameClock: 'Behold server tid for top-høyre Ogame klokke',
			showServerPhalanx: 'Beholde server tid for Phalanx visning',
			showPageStartTime: 'Vise tiden, siden ble oppdatert sist',

			galaxy_keepTipsPlanets: 'Beholde tips på planeter og måner',
			galaxy_keepTipsDebris: 'Beholde tips på avfallsavdeling felt',
			galaxyHideMoon: 'Skjul Måne bilde (vis måne størrelse i stedet)',

			galaxyShowRank: 'Vis spiller / allianse rank i Galaxy visning',
			galaxyRankColor: 'Spiller / allianse rank farge',
			galaxy_Players: 'Uthev følgende spillere',
			galaxy_PlayerColors: 'Farger på spilleren som fremheves',

			galaxyShowAllyRank: 'Vis allianse rank i Galakse oversikt',
			galaxy_Allys: 'Uthev følgende allianser',
			galaxy_AllyColors: 'Farger på alliansen som fremheves',

			galaxyDebrisMin: 'Minste størrelse på avfallsavdeling som fremheves (0 for å slå av)',
			galaxyDebrisColor: 'Farge på uthevet avfallsavdeling',

			msg_expandBox: 'Utvid medingsboks høyde',
			msg_addButtons: 'Ekstra knapper på meldinger',

			msg_EspionageSpace: 'Redusrer rekkeavstand med',
			msg_PlunderThreshold: 'Lavest grense for teoretisk plyndring (x1000)',
			msg_DebrisThreshold: 'Lavest grense for teoretisk avfallsavdeling (x1000)',
			msg_foldSmallPlunder: 'Fold sammen rapporter med bytte og vrakfelt mindre enn limit',
			msg_showPlunder: 'Vis byttet i spion rapporter',
			msg_addSimButton: 'Legg til knapper for å sende spion rapporter til simulator',

			msg_fixColors: 'Fiks farger av kamp rapporter',

			fleet_showCapacity: 'Vis skips kapasitet og hastighet',
			fleet1_showResCalc: 'Vis ressurs kalkulator',

			fleet2_fixLayout: 'Fiks flygeinformasjon layout (side 2)',
			autocopyCoords: 'Auto-kopi koordinater',
			autocopyGlobal: 'Lagrer koordinater fra en side (ikke bare Gjeldende Ogame universet faner)',
			fleet2_setTargetDF: 'Sett målet til DF hvis flåte inneholder gjenvinnere',
			fleet2_ShortLinks: 'Mål snarveislinker (side 2)',
			fleet2_MoonColor: 'Farge på månene i snarveislisten',
			fleet2_MoonsToEnd: 'Flytt måner til slutten av snarveislisten',
			fleet2_expandLists: 'Utvid rullegardinmenyen (Fart, Snarveier, ACSs)',
			fleet2_expandMoonColor: 'Farg måner i utviddet liste',
			fleet2_checkProbeCapacity: 'Sjekk probers kapasitet før avreise (side 2)',

			missionPriority: 'oppdrags prioritet',

			mvmt_expandFleets: 'Vis flåte skip og lasteskip',
			mvmt_showReversal: 'Vis returtid tid på flåter',
			evt_expandFleetsPhal: 'Vis flåte sammensetning og lasteskip (Phalanx)',
			phalanx_showDebris: 'Vis teoretisk avfallsavdeling i Phalanx visning',
			evt_expandFleetsEvt: 'Vis flåte sammensetning og lasteskip (Eventliste)',
			evt_dimReverse: 'Dimme returnere flåter'
		}
	};

	function LabelsPL ()
	{
	    return {
			version: 2,

			btnMarkReadAll: 'Zaznacz wszystkie wyświetlone wiadomości jako przeczytane',
			btnDeleteSmallPlunder: 'Usuń raporty szpiegowskie z rabunkiem < $plunder i odpadkami < $debris',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Pole zniszczeń',
			total: 'Razem',
			loot: 'Rabunek',
			Save: 'Zapisz',
			Clear: 'Wyczyść',

			Moon: 'Księżyc',

			tmTime: 'Czas',
			tmCountdown: 'Odliczanie',
			rx_sendMail: /Wyślij wiadomość do (.+)\./,

			TotalCapacity: 'Pojemność',
			MinSpeed: 'Maksymalna prędkość',
			ExPoints: 'Punkty ekpedycji',
			resources: 'Surowce',
			ArrivalACS: 'Przybycie (ACS)',

			mvmt_Return: 'R',

			shipSCargoAlt: 'MT',
			shipLCargoAlt: 'DT',
			shipRecyclerAlt: 'Rec',
			shipRIPAlt: 'RIP',
			Quantity: 'Ilość',
			Duration: 'Czas trwania',
			Consumption: 'Konsumpcja',

			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Brakujące surowce',
			Production: 'Produkcja',

			RequiredEnergy: 'Potrzebna energia'
		};
	};

	function InterfacePL ()
	{
		return {
			version: 2,
		// updated 1.41.x
			title: 'Opcje AntiGame',
			btnOk: 'OK',
			btnCancel: 'Anuluj',
			btnHomePage: 'Strona domowa',
			optionsNote1: 'Te opcje są zapisane tylko dla tego uniwersum',
			resetCoords: 'Resetuj koordynaty - ',
			installNewVersion: 'Kliknij, aby zainstalować nową wersję',

			sectionGeneral: 'Główne',
			sectionGeneral_Universe: 'Uniwersum',
			sectionGeneral_Globalview: 'Widok ogólny',
			sectionGeneral_Objectview: 'Budynki, badania i statki',
			sectionTime: 'Ustawienia czasu',
			sectionGalaxy: 'Galaktyka',
			sectionGalaxy_Player: 'Gracz',
			sectionGalaxy_Alliance: 'Sojusz',
			sectionGalaxy_Debris: 'Pole Zniszczeń',
			sectionMessages: 'Wiadomości',
			sectionMessages_Espionage: 'Raporty Szpiegowskie',
			sectionMessages_Combat: 'Raporty Wojenne',
			sectionFleetDispatch: 'Wyświetlanie floty',
			sectionFleetDispatch_Fleet1: 'Flota strona 1',
			sectionFleetDispatch_Fleet2: 'Flota strona 2',
			sectionFleetDispatch_Fleet3: 'Flota strona 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Ruchy floty',
			sectionFleet_Phalanx: 'Falanga',
			sectionFleet_Events: 'Lista Zdarzeń',
			sectionFleet_MissionColor: 'Kolory misji (format: ABCDEF - format Websafe ACE)',

			improveLayout: 'Poprawiaj wygląd strony',
			improveUsability: 'Popraw użyteczność strony',
			improveLayoutUse: 'Popraw wygląd i użyteczność strony',
			simpleLayout: 'Uprość wygląd strony',
			killTips: 'Zamknij tooltips',

			language: 'Język',
			update_check: 'Sprawdzaj czy są aktualizacje',
			thousandSeparator: 'Separator tysiąca',
			btnDefault: 'Domyślne',
			blockAutoComplete: 'Blokuj autouzupełnianie w Firefox',

			uni_SpeedFactor: 'Współczynnik prędkości tego uniwersum',
			uni_DFPercent: 'Procent debrisu z floty',
			uni_DefenseToDF: 'Procent debrisu z obrony',

			showDeficient: 'Pokazuj brakujące surowce',
			showResources: 'Pokazuj rozszerzone informacje o surowcach',
			show_onTop: 'Na górze',
			show_onBottom: 'Na dole',
			show_onLeft: 'Po lewej',

			showNames: 'Pokazuj nazwy statków/budynków/badań na obrazkach',
			nameColorOn: 'Kolor dla: dostępne',
			nameColorOff: 'Kolor dla: niedostępne',
			nameColorDisabled: 'Kolor dla: brak surowców',
			showConstructionTitle: 'Pokazuj nazwy budowanych konstrukcji pod nazwami planet',
			showprodPercentUpdate: 'Pokazuj postęp budowy/badań w procentach',
			shortHeader: 'Zawsze ukrywaj obrazek planety gdy jest taka możliwość',
			misc_scrollTitle: 'Przewijaj czas do nastepnego zdarzenia w nagłówku przeglądarki',

			timeAMPM: 'Uzyj 12-godzinnego formatu (AM/PM) zamiast 24-godzinnego',
			timeSetting: 'Ustaw godzine',
			timeDontChange: 'Nie zmieniaj czasu',
			timeLocal: 'Ustaw do lokalnej strefy czasowej',
			timeServer: 'Ustaw do strefy czasowej serwera',
			showServerOgameClock: 'Nie zmieniaj czasu Ogame zegara z prawego górnego rogu',
			showServerPhalanx: 'Nie zmieniaj czasu serwera dla widoku Falangi Czujników',
			showPageStartTime: 'Wyświetlaj czas ostatniego odświeżenia strony',


			galaxy_keepTipsPlanets: 'Pozostaw tooltips dla planet i księżyców',
			galaxy_keepTipsDebris: 'Pozostaw tooltips dla Pola Zniszczeń',
			galaxyHideMoon: 'Ukrywaj ikonę Księżyca, a pokazuj zamiast niego jego rozmiar',

			galaxyShowRank: 'Pokazuj pozycje graczy w widoku galaktyki',
			galaxyRankColor: 'Kolor pozycji graczy/sojuszów w galaktyce',
			galaxy_Players: 'Koloruj nazwy graczy',
			galaxy_PlayerColors: 'Kolor dla pokolorowanych graczów',

			galaxyShowAllyRank: 'Pokazuj pozycje sojuszy w widoku galaktyki',
			galaxy_Allys: 'Koloruj nazwy sojuszów',
			galaxy_AllyColors: 'Kolor dla pokolorowanych sojuszów',

			galaxyDebrisMin: 'Minimalny rozmiar pola zniszczeń do podświetlenia (0 wyłącza)',
			galaxyDebrisColor: 'Kolor podświetlania pola zniszczeń',

			msg_expandBox: 'Zmień wysokość okna wiadomości:',
			msg_addButtons: 'Dodatkowe przyciski w wiadomościach',

			msg_EspionageSpace: 'Zmniejsz odstępy między wierszami',
			msg_PlunderThreshold: 'Minimalny teoretyczny rabunek (x1000)',
			msg_DebrisThreshold: 'Minimalny rozmiar pola zniszczeń (x1000)',
			msg_foldSmallPlunder: 'Zwijaj raporty z rabunkiem i odpadkami mniejszymi niż podany powyżej minimalny limit',
			msg_showPlunder: 'Pokazuj rabunek w raportach szpiegowskich',
			msg_addSimButton: 'Dodaj przycisk do wysyłania raportów szpiegowskich do  symulatorów',

			msg_fixColors: 'Popraw raporty wojenne',

			fleet_showCapacity: 'Pokazuj ładowność i prędkość statków',
			fleet1_showResCalc: 'Pokazuj rozszerzony kalkulator zasobów',
			fleet1_showSimpleResCalc: 'Pokazuj uproszczony kalkulator zasobów',
			uni_maxPlayerScore: 'Silniejszy gracz ma więcej niż 5M punktów',

			fleet2_fixLayout: 'Poprawiaj wygląd informacji o flocie (strona 2)',
			autocopyCoords: 'Auto-kopiowanie koordynatów',
			autocopyGlobal: 'Zapamiętaj koordynaty z dowolnej strony (nie tylko z Ogame)',
			fleet2_setTargetDF: 'Automatycznie ustaw miejsce przeznaczenia: "PZ" gdy wysylasz recyklery',
			fleet2_ShortLinks: 'Dodaj pozycje widoczną na liście koordynatów (strona 2)<br /><br />Format: G#S#P#T#N, gdzie:<br />G#S#P = koordynaty<br />T = 1 - planeta, 2 - szczątki, 3 - księżyc<br />N - nazwa, która jest opcjonalna<br/>Kolejne wpisy oddzielamy przecinkiem',
			fleet2_MoonColor: 'Kolor dla księżycy w krótkiej liście - druga zakładka',
			fleet2_MoonsToEnd: '<br>Prznieś księżyce na koniec listy wyboru koordynatów',
			fleet2_expandLists: 'Pokazuj listę szybkiego wyboru koordynatów (strona 2)',
			fleet2_expandMoonColor: 'Koloruj Księżyce na liście szybkiego wyboru koordynatów (strona 2)',
			fleet2_checkProbeCapacity: 'Sprawdzaj pojemność sond przed wyruszeniem (strona 2)',

			missionPriority: 'Priorytety misji',

			mvmt_expandFleets: 'Pokazuj w Ruchach Flot statki i zawartość ładowni',
			mvmt_showReversal: 'Pokazuj czas powrotu po zawróceniu',
			evt_expandFleetsPhal: 'Pokazuj skład floty i ładunek w falandze',
			phalanx_showDebris: 'Pokazuj przybliżone pole zniszczeń powstałe z floty widocznej na falandze',
			evt_expandFleetsEvt: 'Pokazuj skład floty i ładunek na liście lotów',
			evt_dimReverse: 'Przyciemnij sloty powracających flot'
		};
	};

	function LabelsPT ()
	{
	    return {
			version: 2,

			btnMarkReadAll: 'Marcar todas as mensagens como lidas',
			btnDeleteSmallPlunder: 'Apagar relatórios de espionagem com roubo < $roubo e destroços < $destroços',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Destroços',
			total: 'Total',
			loot: 'Roubo',
			Save: 'Guardar',
			Clear: 'Limpar',

			Moon: 'Lua',

			tmTime: 'Hora',
			tmCountdown: 'Contagem decrescente',
			rx_sendMail: /Enviar uma mensagem a (.+)\./,
			
			TotalCapacity: 'Capacidade total',
			MinSpeed: 'Velocidade Mínima',
			ExPoints: 'Pontos de expedição',
			resources: 'Recursos',
			ArrivalACS: 'Chegada (ACS)',
			
			mvmt_Return: 'R',
			
			shipSCargoAlt: 'CP',
			shipLCargoAlt: 'CG',
			shipRecyclerAlt: 'Recs',
			shipRIPAlt: 'EDM',
			Quantity: 'Quantidade',
			Duration: 'Duração',
			Consumption: 'Consumo',
			
			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Recursos necessários',
			Production: 'Produção',
			
			RequiredEnergy: 'Energia necessária'		};
	};

	function InterfacePT ()
	{
		return {
			version: 2,

			title: 'Opções AntiGame',
			btnOk: 'Confirmar',
			btnCancel: 'Cancelar',
			btnHomePage: 'Home page',
			optionsNote1: 'A opção é guardada apenas para este Universo',
			resetCoords: 'Limpar coordenada - ',
			installNewVersion: 'Clique para actualizar',
			
			sectionGeneral: 'Geral',
			sectionGeneral_Universe: 'Universo',
			sectionGeneral_Globalview: 'Vista global',
			sectionGeneral_Objectview: 'Edifícios, Defesas e Frota',
			sectionTime: 'Configurações da Hora',
			sectionGalaxy: 'Galáxia',
			sectionGalaxy_Player: 'Jogador',
			sectionGalaxy_Alliance: 'Aliança',
			sectionGalaxy_Debris: 'Destroços',
			sectionMessages: 'Mensagens',
			sectionMessages_Espionage: 'Relatórios de Espionagem',
			sectionMessages_Combat: 'Relatórios de Combate',
			sectionFleetDispatch: 'Envio de Frota',
			sectionFleetDispatch_Fleet1: 'Envio de frota página 1',
			sectionFleetDispatch_Fleet2: 'Envio de frota página 2',
			sectionFleetDispatch_Fleet3: 'Envio de frota página 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Movimento de Frotas',
			sectionFleet_Phalanx: 'Lista de Phalanx',
			sectionFleet_Events: 'Lista de Eventos',
			sectionFleet_MissionColor: 'Cor para a missão',
			
			improveLayout: 'Melhorar layout da página',
			improveUsability: 'Melhorar usabilidade da página',
			improveLayoutUse: 'Melhorar layout e usabilidade da página',
			simpleLayout: 'Simplificar layout da página',
			killTips: 'Desativar tooltips',
			
			language: 'Linguagem',
			update_check: 'Procura automática de atualizações',
			thousandSeparator: 'Separador de Milhares',
			btnDefault: 'Padrão',
			blockAutoComplete: 'Bloquear Autocompletar do Firefox',
			
			uni_SpeedFactor: 'Velocidade do Universo',
			uni_DFPercent: 'Percentagem de frota para destroços',
			uni_DefenseToDF: 'Percentagem de defensa para destroços',

			showDeficient: 'Mostrar recursos que faltam',
			showResources: 'Mostrar informações adicionais de recursos',
			show_onTop: 'No topo',
			show_onBottom: 'Em baixo',
			show_onLeft: 'À esquerda',
			
			showNames: 'Mostrar os nomes de naves/edifícios/pesquisas sobre as imagens',
			nameColorOn: 'Cor no Nome: disponível',
			nameColorOff: 'Cor no Nome: indisponível',
			nameColorDisabled: 'Cor no Nome: sem recursos suficientes',
			showConstructionTitle: 'Mostrar construções em curso na lista do planeta',
			shortHeader: 'Minimizar sempre imagem do Planeta',
			misc_scrollTitle: 'Passar no título da janela o tempo para o próximo evento',
		
			timeAMPM: 'Usar formato 12horas (AM/PM) no lugar do formato 24horas',
			timeSetting: 'Mudar valores do tempo (só horas)',
			timeDontChange: 'Não alterar a hora',
			timeLocal: 'Manter sempre a hora local',
			timeServer: 'Manter sempre a hora do servidor',
			showServerOgameClock: 'Manter hora do servidor no relógio superior direito do OGame',
			showServerPhalanx: 'Manter hora do servidor na vista Phalanx',
			showPageStartTime: 'Mostrar hora em que a página foi atualizada pela ultima vez',
			
			galaxy_keepTipsPlanets: 'Manter tooltips para planetas e luas',
			galaxy_keepTipsDebris: 'Manter tooltips para destroços',
			galaxyHideMoon: 'Eliminar imagem das Luas (mostrar únicamente o tamanho)',
			
			galaxyShowRank: 'Mostrar classificação jogador/aliança na vista Galáxia',
			galaxyRankColor: 'Cor na classificação jogador/aliança',
			galaxy_Players: 'Jogadores seguintes em destaque',
			galaxy_PlayerColors: 'Cor para jogadores seguintes',
			
			galaxyShowAllyRank: 'Ranks de alianças na vista da Galáxia',
			galaxy_Allys: 'Alianças seguintes em destaque',
			galaxy_AllyColors: 'Cor para as alianças seguintes',
			
			galaxyDebrisMin: 'Tamanho mínimo dos destroços em destaque (0 para desativar)',
			galaxyDebrisColor: 'Cor dos destroços em destaque',
			
			msg_expandBox: 'Expandir altura da caixa mensagens',
			msg_addButtons: 'Adicionar botões às mensagens',
			
			msg_EspionageSpace: 'Reduzir espaçamento entre linhas',
			msg_PlunderThreshold: 'Valor mínimo para roubo teórico (x1000)',
			msg_DebrisThreshold: 'Valor mínimo para destroços teórico (x1000)',
			msg_foldSmallPlunder: 'Ocultar informações do roubo e destroços abaixo desse valor',
			msg_showPlunder: 'Mostrar roubo no relatório de espionagem',
			msg_addSimButton: 'Adicionar botões nos relatórios de espionagem para usar o simulador',
			
			msg_fixColors: 'Corrigir cores nos relatórios de combate',
			
			fleet_showCapacity: 'Mostrar capacidade de carga e velocidade das naves',
			fleet1_showResCalc: 'Mostrar calculadora de recursos',
			uni_maxPlayerScore: 'O jogador mais forte tem mais de 5M de pontos',
			
			fleet2_fixLayout: 'Corrigir layout de informação de voo (página 2)',
			autocopyCoords: 'Auto-copiar coordenadas',
			autocopyGlobal: 'Memorizar coordenadas de qualquer página (não só no separador do universo atual)',
			fleet2_setTargetDF: 'Definir destino Campo de Destroços se a frota incluir recicladores',
			fleet2_ShortLinks: 'Direcionar atalhos (página 2)',
			fleet2_MoonColor: 'Colorir luas na lista de atalhos',
			fleet2_MoonsToEnd: 'Mover luas para o final da lista de atalhos',
			fleet2_expandLists: 'Expandir caixas de seleção (Velocidade, Atalhos, ACSs)',
			fleet2_expandMoonColor: 'Colorir luas na lista expandida',
			fleet2_checkProbeCapacity: 'Verificar capacidade das sondas antes do envio (página 2)',
			
			missionPriority: 'Prioridade da missão',
			
			mvmt_expandFleets: 'Mostrar naves e capacidade de carga da frota',
			mvmt_showReversal: 'Mostrar hora do regresso da frota',
			evt_expandFleetsPhal: 'Mostrar composição da frota e capacidade de carga (Phalanx)',
			phalanx_showDebris: 'Mostrar destroços teóricos na vista Phalanx',
			evt_expandFleetsEvt: 'Mostrar composição da frota e capacidade de carga (Lista de Eventos)',
			evt_dimReverse: 'Escurecer frotas em regresso'
		};
	};

	function LabelsRO ()
	{
	    return {
			version: 2,

			btnMarkReadAll: 'Noteaza toate mesajele ca fiind citite',
			btnDeleteSmallPlunder: 'Sterge toate mesajele cu dobanda de < $plunder si derbis de < $debris',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Derbis',
			total: 'Total',
			loot: 'Dobanda',
			Save: 'Save',
			Clear: 'Clear',

			Moon: 'Luna',

			tmTime: 'Time',
			tmCountdown: 'Countdown',
			rx_sendMail: /Send a message to (.+)\./,

			TotalCapacity: 'capacitatea totala',
			MinSpeed: 'Viteza minima',
			ExPoints: 'Expedition points',
			resources: 'Resurse',
			ArrivalACS: 'Intoarcere (SAL)',

			mvmt_Return: 'R',

			shipSCargoAlt: 'Transportor Mic',
			shipLCargoAlt: 'Ttransportor Mare',
			shipRecyclerAlt: 'Reciclatoare',
			shipRIPAlt: 'RIP',
			Quantity: 'Quantity',
			Duration: 'Duration',
			Consumption: 'Consumption',

			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Lipsa de resurse',
			Production: 'Producere',

			RequiredEnergy: 'Energie necesara'
		};
	};

	function InterfaceRO ()
	{
		return {
			version: 2,

			title: 'Optiuni AntiGame',
			btnOk: 'OK',
			btnCancel: 'Renunta',
			btnHomePage: 'Home page',
			optionsNote1: 'Setarea este salvata numai pentru acest univers',
			resetCoords: 'Renunta - ',
			installNewVersion: 'Click to install new version',

			sectionGeneral: 'Total',
			sectionGeneral_Universe: 'Universe',
			sectionGeneral_Globalview: 'Global view',
			sectionGeneral_Objectview: 'Buildings, researches and ships',
			sectionTime: 'Time settings',
			sectionGalaxy: 'Univers',
			sectionGalaxy_Player: 'Player',
			sectionGalaxy_Alliance: 'Alliance',
			sectionGalaxy_Debris: 'Debris',
			sectionMessages: 'Mesaj',
			sectionMessages_Espionage: 'Espionage reports',
			sectionMessages_Combat: 'Combat reports',
			sectionFleetDispatch: 'Trimite flota',
			sectionFleetDispatch_Fleet1: 'Fleet page 1',
			sectionFleetDispatch_Fleet2: 'Fleet page 2',
			sectionFleetDispatch_Fleet3: 'Fleet page 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Lista flotei',
			sectionFleet_Phalanx: 'Phalanx',
			sectionFleet_Events: 'Lista evenimentelor',
			sectionFleet_MissionColor: 'Culoare flota, misiune',

			improveLayout: 'Improve the layout of this page',
			improveUsability: 'Improve the usability of this page',
			improveLayoutUse: 'Improve layout and usebility of this page',
			simpleLayout: 'Simplify the layout of this page',
			killTips: 'Block pop-up sfaturi',

			language: 'Limba',
			update_check: 'Auto-check for updates',
			thousandSeparator: 'Thousand separator',
			btnDefault: 'Default',
			blockAutoComplete: 'Deconecteaza Auto-Fill in Firefox',

			uni_SpeedFactor: 'Factorul de accelerare in acest univers',
			uni_DFPercent: 'Percentage of fleet structure to debris',
			uni_DefenseToDF: 'Percentage of defense to debris',

			showDeficient: 'Arata resurse insuficiente',
			showResources: 'Afiseaza extins informatiile despre resurse',
			show_onTop: 'Sus',
			show_onBottom: 'Jos',
			show_onLeft: 'In stanga',

			showNames: 'Aata denumirea navelor/uzinelor/cercetarilor peste imagine',
			nameColorOn: 'Culoare misiunei: disponibil',
			nameColorOff: 'Culoare misiunei: indisponibil',
			nameColorDisabled: 'Culoare misiunei: Nu ajung resurse',
			showConstructionTitle: 'Arata denumirea misiunei a constructiilor langa lista planetelor',
			shortHeader: 'Always minimize planet image',
			misc_scrollTitle: 'Scroll time to the next event in the window title',

			timeAMPM: 'Use 12-hours format (AM/PM) instead of 24-hours',
			timeSetting: 'Change time values (hours only)',
			timeDontChange: 'Don\'t change time',
			timeLocal: 'Always set to local timezone',
			timeServer: 'Always set to server timezone',
			showServerOgameClock: 'Keep server time for top-right Ogame clock',
			showServerPhalanx: 'Keep server time for Phalanx view',
			showPageStartTime: 'Display the time the page was last refreshed',

			galaxy_keepTipsPlanets: 'Salveaza sfaturile pentru planete si luni',
			galaxy_keepTipsDebris: 'Salveaza sfaturile pentru campurile de ramasite',
			galaxyHideMoon: 'Ascunde imaginea Lunii (in schimb arat dimensiunea Lunei)',

			galaxyShowRank: 'Arata rank-ul jucator/alianta in sistem',
			galaxyRankColor: 'Culoarea pentru rank/alianta',
			galaxy_Players: 'Ilumineaza urmatorii jucatori',
			galaxy_PlayerColors: 'Culoarea pentru iluminarea jucatorilor',

			galaxyShowAllyRank: 'Show alliance ranks in Galaxy view',
			galaxy_Allys: 'Ilumineaza urmatoarele aliante',
			galaxy_AllyColors: 'Culoare pentru iluminarea aliantelor',

			galaxyDebrisMin: 'CR-ul minim pentru iluminare (0 - nu este iluminat)',
			galaxyDebrisColor: 'Culoarea ce ilumineaza CR-ului',

			msg_expandBox: 'Expand the messagebox height',
			msg_addButtons: 'Butoane suplimentare un casuta de mesaje',

			msg_EspionageSpace: 'Reducing row spacing with',
			msg_PlunderThreshold: 'Limita minima pentru o posibila captura (x1000)',
			msg_DebrisThreshold: 'Limina minima pentru un posibil derbis (x1000)',
			msg_foldSmallPlunder: 'Minimizeaza rapoartele capturate unde dobanda si derbisul limita',
			msg_showPlunder: 'Arata posibila capacitate capturata in rapoartele de spionaj',
			msg_addSimButton: 'Adauga butonul de simulare a raportului de lupta WebSim',

			msg_fixColors: 'Corecteaza culorile rapoartelor de lupta',

			fleet_showCapacity: 'Arata capacitatea cargo si viteza navelor',
			fleet1_showResCalc: 'Show resource calculator',
			uni_maxPlayerScore: 'The strongest player has more than 5M points',

			fleet2_fixLayout: 'Corecteaza locatia si informatia despre misiune (pagina2)',
			autocopyCoords: 'Auto-copy coordinates',
			autocopyGlobal: 'Memorize coordinates from any page (not only current Ogame universe tabs)',
			fleet2_setTargetDF: 'Trimite la CR daca in flota exista reciclatoare',
			fleet2_ShortLinks: 'Lista tintelor pentru atasare rapida (pagina 2)',
			fleet2_MoonColor: 'Color for moons in the shortlink list',
			fleet2_MoonsToEnd: 'Move moons to the end of the shortlinks list',
			fleet2_expandLists: 'Expand drop-down boxes (Speed, Shortcuts, ACSs)',
			fleet2_expandMoonColor: 'Color moons in expand list',
			fleet2_checkProbeCapacity: 'Arata capacitatea de stocare a probelor inainte de a trimite (pagina 2)',

			missionPriority: 'Sarcini prioritare',

			mvmt_expandFleets: 'Arata resursele si structura flotelor',
			mvmt_showReversal: 'Arata timpul de retur la retragere',
			evt_expandFleetsPhal: 'Show fleet composition and cargo (Phalanx)',
			phalanx_showDebris: 'Show theoretical debris in Phalanx view',
			evt_expandFleetsEvt: 'Show fleet composition and cargo (EventList)',
			evt_dimReverse: 'Dim returning fleets'
		};
	};

	function LabelsRU ()
	{
	    return {
			version: 3,

			btnMarkReadAll: 'Пометить все показанные сообщения как прочитанные',
			btnDeleteSmallPlunder: 'Удалить шпионские доклады с добычей < $plunder и ломом < $debris',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Лом',
			total: 'Всего',
			loot: 'Добыча',
			Save: 'Запомнить',
			Clear: 'Очистить',

			Moon: 'Луна',

			tmTime: 'Время',
			tmCountdown: 'Обратный отсчет',
			rx_sendMail: /Послать сообщение (.+)\./,

			TotalCapacity: 'Суммарная вместимость',
			MinSpeed: 'Минимальная скорость',
			ExPoints: 'Экспедиционные очки',
			resources: 'Ресурсы',
			ArrivalACS: 'Прибытие (САБ)',

			mvmt_Return: 'В',

			shipSCargoAlt: 'МТ',
			shipLCargoAlt: 'БТ',
			shipRecyclerAlt: 'Рабов',
			shipRIPAlt: 'ЗС',
			Quantity: 'Количество',
			Duration: 'Время полета',
			Consumption: 'Потребление',

			shipSatelliteAlt: 'cc',
			deficientRes: 'Ресурсов не хватает',
			Production: 'Производство',

			RequiredEnergy: 'Необходимо энергии'
		};
	};

	function InterfaceRU()
	{
		return {
			version: 3,

			title: 'Настройки AntiGame',
			btnOk: 'OK',
			btnCancel: 'Отмена',
			btnHomePage: 'Home page',
			optionsNote1: 'Настройка сохраняется только для этой вселенной',
			resetCoords: 'Сбросить - ',
			installNewVersion: 'Установить новую версию',

			sectionGeneral: 'Общие',
			sectionGeneral_Universe: 'Вселенная',
			sectionGeneral_Globalview: 'Общий вид',
			sectionGeneral_Objectview: 'Здания, исследования, корабли',
			sectionTime: 'Настройки времени',
			sectionGalaxy: 'Галактика',
			sectionGalaxy_Player: 'Игрок',
			sectionGalaxy_Alliance: 'Альянс',
			sectionGalaxy_Debris: 'Поле Обломков',
			sectionMessages: 'Сообщения',
			sectionMessages_Espionage: 'Шпионские доклады',
			sectionMessages_Combat: 'Боевые доклады',
			sectionFleetDispatch: 'Отправка флота',
			sectionFleetDispatch_Fleet1: 'Страница флотов 1',
			sectionFleetDispatch_Fleet2: 'Страница флотов 2',
			sectionFleetDispatch_Fleet3: 'Страница флотов 3',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Список флотов',
			sectionFleet_Phalanx: 'Фаланга',
			sectionFleet_Events: 'Список событий',
			sectionFleet_MissionColor: 'Цвет флота, задание',

			improveLayout: 'Улучшить показ этой страницы',
			improveUsability: 'Сделать страницу более удобной',
			improveLayoutUse: 'Улучшить показ этой страницы и сделать её более удобной',
			simpleLayout: 'Упростить показ этой страницы',
			killTips: 'Заблокировать всплывающие подсказки',

			language: 'Язык',
			update_check: 'Автоматически проверять обновления',
			thousandSeparator: 'Разделитель тысяч в числах',
			btnDefault: 'По умолчанию',
			blockAutoComplete: 'Отключить Авто-Заполнение в Firefox',

			uni_SpeedFactor: 'Коэффициент ускорения в этой вселенной',
			uni_DFPercent: 'Процент выпадения флота в обломки',
			uni_DefenseToDF: 'Процент выпадения обороны в обломки (ОвО)',

			showDeficient: 'Показывать недостающие ресурсы',
			showResources: 'Показывать расширенную информацию о ресурсах',
			show_onTop: 'Вверху',
			show_onBottom: 'Внизу',
			show_onLeft: 'Слева',

			showNames: 'Показывать названия кораблей/строений/исследований поверх картинок',
			nameColorOn: 'Цвет названия: доступно',
			nameColorOff: 'Цвет названия: недоступно',
			nameColorDisabled: 'Цвет названия: не хватает ресурсов',
			showConstructionTitle: 'Показывать названия ведущихся построек в списке планет',
			shortHeader: 'Всегда минимизировать картинку планеты',
			misc_scrollTitle: 'Прокручивать в заголовке окна время до следующего события',

			timeAMPM: 'Использовать 12-часовой формат времени (AM/PM) вместо 24-часового',
			timeSetting: 'Исправлять время (только часы)',
			timeDontChange: 'Не исправлять время',
			timeLocal: 'Всегда местное время',
			timeServer: 'Всегда серверное время',
			showServerOgameClock: 'Оставить серверное время для часов Огейм вверху справа',
			showServerPhalanx: 'Оставить серверное время в сканах фаланги',
			showPageStartTime: 'Показывать время, когда страница в последний раз обновилась',

			galaxy_keepTipsPlanets: 'Сохранить тултипы для планет и лун',
			galaxy_keepTipsDebris: 'Сохранить тултипы для поля обломков',
			galaxyHideMoon: 'Скрывать картинку Луны (вместо нее выводить размер луны)',

			galaxyShowRank: 'Показывать рейтинг игрока/альянса в Галактике',
			galaxyRankColor: 'Цвет для рейтинга игрока/альянса',
			galaxy_Players: 'Подсвечивать следующих игроков',
			galaxy_PlayerColors: 'Цвета для подсветки игроков',

			galaxyShowAllyRank: 'Показывать рейтинг альянса в Галактике',
			galaxy_Allys: 'Подсвечивать следующие альянсы',
			galaxy_AllyColors: 'Цвета для подсветки альянсов',

			galaxyDebrisMin: 'Минимальный размер ПО для подсветки (0 - не подсвечивать)',
			galaxyDebrisColor: 'Цвет подсвеченного ПО',

			msg_expandBox: 'Расширить высоту окна сообщений',
			msg_addButtons: 'Дополнительные кнопки в Сообщениях',

			msg_EspionageSpace: 'Уменьшить расстояние между строками',
			msg_PlunderThreshold: 'Нижний предел для возможной добычи (x1000)',
			msg_DebrisThreshold: 'Нижний предел для возможного лома (x1000)',
			msg_foldSmallPlunder: 'Сворачивать доклады с добычей и ломом меньше предела',
			msg_showPlunder: 'Показывать возможную добычу в шпионских докладах',
			msg_addSimButton: 'Добавить кнопки для симуляции докладов в WebSim',

			msg_fixColors: 'Исправить цвета боевых докладов',

			fleet_showCapacity: 'Показывать вместимость и скорость кораблей',
			fleet1_showResCalc: 'Показывать калькулятор ресурсов',
			uni_maxPlayerScore: 'У самого сильного игрока более 5М очков',

			fleet2_fixLayout: 'Исправить расположение информации о полете (страница 2)',
			autocopyCoords: 'Авто-вставка координат',
			autocopyGlobal: 'Запоминать координаты с любой страницы (не только из вкладок текущей вселенной Ogame)',
			fleet2_setTargetDF: 'Отправлять на ПО, если во флоте есть переработчики',
			fleet2_ShortLinks: 'Список целей для быстрой вставки (страница 2)',
			fleet2_MoonColor: 'Цвет для выделения лун в списке выбора планет',
			fleet2_MoonsToEnd: 'Перемещать луны в конец списка выбора планет',
			fleet2_expandLists: 'Разворачивать выпадающие списки (скорость, планеты, САБы)',
			fleet2_expandMoonColor: 'Раскрасить луны в расширенном списке',
			fleet2_checkProbeCapacity: 'Проверять вместимость шпионских зондов при отправке (страница 2)',

			missionPriority: 'Приоритет задания',

			mvmt_expandFleets: 'Показывать состав и груз флотов',
			mvmt_showReversal: 'Показывать время возврата флота при отзыве',
			evt_expandFleetsPhal: 'Показывать состав и груз флотов (фаланга)',
			phalanx_showDebris: 'Показывать возможный лом в сканах фаланги',
			evt_expandFleetsEvt: 'Показывать состав и груз флотов (список событий)',
			evt_dimReverse: 'Затемнить возвращающиеся флоты'
		}
	};

	function LabelsSK()
	{
	    return {
			version: 2,

			btnMarkReadAll: 'Označ všetky zobrazené správy ako prečítané',
			btnDeleteSmallPlunder: 'Vymaž špionážne správy s korisťou < $plunder and debris < $debris',

			msg_Simulator1: 'WebSim',
			msg_Simulator2: 'DragoSim',
			msg_Simulator3: 'OSimulate',
			debris: 'Trosky',
			total: 'Celkovo',
			loot: 'Korisť',
			Save: 'Ulož',
			Clear: 'Zmaž',

			Moon: 'Mesiac',

			tmTime: 'Čas',
			tmCountdown: 'Odpočítavanie',
			rx_sendMail: /Odošli správu (.+)\./,

			TotalCapacity: 'Celková kapacita',
			MinSpeed: 'Minimálna rýchlosť',
			ExPoints: 'Expedičné body',
			resources: 'Zdroje',
			ArrivalACS: 'Návrat (ACS)',

			mvmt_Return: 'N',

			shipSCargoAlt: 'MT',
			shipLCargoAlt: 'VT',
			shipRecyclerAlt: 'Recyk.',
			shipRIPAlt: 'RIP',
			Quantity: 'Množstvo',
			Duration: 'Trvanie',
			Consumption: 'Spotreba',

			shipSatelliteAlt: 'Sat.',
			deficientRes: 'Chýbajúce zdroje',
			Production: 'Produkcia',

			RequiredEnergy: 'Potrebná energia'
		}
	};

	function InterfaceSK ()
	{
		return {
			version: 2,

			title: 'AntiGame Origin nastavenia',
			btnOk: 'OK',
			btnCancel: 'Storno',
			btnHomePage: 'Dom. stránka',
			optionsNote1: 'Nastavenie platí iba pre tento vesmír',
			resetCoords: 'Reset - ',
			installNewVersion: 'Klikni pre nainštalovanie novej verzie',

			sectionGeneral: 'Všeobecné',
			sectionGeneral_Universe: 'Vesmír',
			sectionGeneral_Globalview: 'Všeobecný prehľad',
			sectionGeneral_Objectview: 'Budovy, výskumy a lode',
			sectionTime: 'Časové možnosti',
			sectionGalaxy: 'Galaxia',
			sectionGalaxy_Player: 'Hráč',
			sectionGalaxy_Alliance: 'Aliancia',
			sectionGalaxy_Debris: 'Trosky',
			sectionMessages: 'Správy',
			sectionMessages_Espionage: 'Špionážne správy',
			sectionMessages_Combat: 'Správy z boja',
			sectionFleetDispatch: 'Vyslanie flotily',
			sectionFleetDispatch_Fleet1: 'Flotila strana 1.',
			sectionFleetDispatch_Fleet2: 'Flotila strana 2.',
			sectionFleetDispatch_Fleet3: 'Flotila strana 3.',
			sectionFleet: 'Fleet lists',
			sectionFleet_Movement: 'Pohyb flotily',
			sectionFleet_Phalanx: 'List Falanga',
			sectionFleet_Events: 'List udalostí',
			sectionFleet_MissionColor: 'Farby úloh (formát: ABCDEF - Websafe formát ACE)',

			improveLayout: 'Vylepši rozvrhnutie tejto stránky',
			improveUsability: 'Vylepši použiteľnosť tejto stránky',
			improveLayoutUse: 'Vylepši rozvrhnutie a použiteľnosť tejto stránky',
			simpleLayout: 'Zjednoduš rozvrhnutie tejto stránky',
			killTips: 'Odstráň info. okná z tejto stránky',

			language: 'Jazyk ponuky Nastavenia',
			update_check: 'Auto-kontrola pre aktualizácie',
			thousandSeparator: 'Oddelovač tisícov',
			btnDefault: 'Predvolené',
			blockAutoComplete: 'Blokovať auto-dokončovanie vo Firefoxe',

			uni_SpeedFactor: 'Faktor rýchlosti tohoto vesmíru',
			uni_DFPercent: 'Percentáž flotily do trosiek',
			uni_DefenseToDF: 'Percentáž obrany do trosiek',

			showDeficient: 'Ukáž chýbajúce suroviny',
			showResources: 'Ukáž rozšírené informácie o zdrojoch',
			show_onTop: 'Hore',
			show_onBottom: 'Dole',
			show_onLeft: 'Naľavo',

			showNames: 'Ukáž názvy lodí/budov/výskumov cez obrázky',
			nameColorOn: 'Názov farby: dostupné',
			nameColorOff: 'Názov farby: nedostupné',
			nameColorDisabled: 'Názov farby: nedostatok zdrojov',
			showConstructionTitle: 'Zobraz názvy výstavby v zozname planét',
			shortHeader: 'Vždy zmenši obrázky planét',
			misc_scrollTitle: 'Ukáž čas do ďalšej udalosti v názve karty',

			timeAMPM: 'Použi 12-hodinový formát (AM/PM) namiesto 24-hodinového',
			timeSetting: 'Zmeň časové hodnoty (iba hodiny)',
			timeDontChange: 'Nemeniť čas',
			timeLocal: 'Vždy nastav na lokálnu časovú zónu',
			timeServer: 'Vždy nastav na serverovú časovú zónu',
			showServerOgameClock: 'Ponechaj serverový čas pre Ogame hodiny vpravo-hore',
			showServerPhalanx: 'Ponechaj serverový čas pre Falangu',
			showPageStartTime: 'Zobraz čas poslednej obnovy stránky',

			galaxy_keepTipsPlanets: 'Ponechaj informačné okná pre planéty a Mesiace',
			galaxy_keepTipsDebris: 'Ponechaj informačné okná pre troskové polia',
			galaxyHideMoon: 'Skry obrázok Mesiaca (miesto toho zobraz veľkosť Mesiaca)',

			galaxyShowRank: 'Ukáž hodnosti hráča v prehľade galaxie',
			galaxyRankColor: 'Farba hodností hráča/aliancie',
			galaxy_Players: 'Zvýrazni nasledujúcich hráčov',
			galaxy_PlayerColors: 'Farby pre zvýrazňovanie hráča',

			galaxyShowAllyRank: 'Ukáž hodnosti aliancie v prehľade galaxie',
			galaxy_Allys: 'Zvýrazni nasledujúce aliancie',
			galaxy_AllyColors: 'Farby pre zvýrazňovanie aliancie',

			galaxyDebrisMin: 'Minimálna veľkosť trosiek pre zvýraznenie (0 pre vypnutie)',
			galaxyDebrisColor: 'Farba zvýraznených trosiek',

			msg_expandBox: 'Predĺž telo správy',
			msg_addButtons: 'Doplnkové tlačidlá v Správach',

			msg_EspionageSpace: 'Zmenšenie odstupu riadkov na',
			msg_PlunderThreshold: 'Najnižší limit pre teoretickú korisť (x1000)',
			msg_DebrisThreshold: 'Najnižší limit pre teoretické trosky (x1000)',
			msg_foldSmallPlunder: 'Zabaliť správy s korisťou a troskami menšími ako limit',
			msg_showPlunder: 'Ukáž korisť v špionážnych správach',
			msg_addSimButton: 'Pridaj tlačidlá na odoslanie špionážnych správ do simulátora',

			msg_fixColors: 'Upraviť farby správ z boja',

			fleet_showCapacity: 'Ukáž kapacitu a rýchlosť lodí',
			fleet1_showResCalc: 'Ukáž výpočet zdrojov',
			uni_maxPlayerScore: 'Silnejší hráč má viac ako 5M bodov',

			fleet2_fixLayout: 'Upraviť rozvrhnutie informácií o lete pre dlhé texty',
			autocopyCoords: 'Auto-kopíruj súradnice',
			autocopyGlobal: 'Pamätaj súradnice z akejkoľvek externej stránky',
			fleet2_setTargetDF: 'Nastav cieľ na trosky ak flotila obsahuje Recyklátory',
			fleet2_ShortLinks: 'Skratky cieľov',
			fleet2_MoonColor: 'Farby pre Mesiace v zozname skratiek',
			fleet2_MoonsToEnd: 'Presuň Mesiace na koniec v zozname skratiek',
			fleet2_expandLists: 'Rozšír rozbaľovacie ponuky (Rýchlosť, Skratky, Bojové zoskupenia)',
			fleet2_expandMoonColor: 'Farby Mesiacov v zozname skratiek',
			fleet2_checkProbeCapacity: 'Over kapacitu sond pred odletom',

			missionPriority: 'Prioritný výber úlohy',

			mvmt_expandFleets: 'Ukáž lode flotily a náklad',
			mvmt_showReversal: 'Ukáž čas pre odvolanie letu',
			evt_expandFleetsPhal: 'Ukáž zloženie flotily a nákladu (Falanga)',
			phalanx_showDebris: 'Ukáž teoretické trosky vo Falange',
			evt_expandFleetsEvt: 'Ukáž zloženie flotily a nákladu (List Udalostí)',
			evt_dimReverse: 'Ztmav vracajúce sa flotily'
		}
	};

	Main();

	function N(n){return (isNaN(n))?0:+(n)}
	
	function Log (str) {
		if (isGM)
			GM_log(str);
		else if (isOpera)
			window.opera.postError(str);
		else if (isChrome)
			console.log('Antigame: '+str);
	}

	
	

};
// AntigameFunc

if (window.navigator.userAgent.indexOf('Chrome') > -1 && typeof GM_getResourceURL == 'undefined')
{
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.innerHTML = '('+AntigameFunc.valueOf()+')();';
	document.body.appendChild(script);
}
else
	AntigameFunc();