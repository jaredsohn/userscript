// ==UserScript==
// @name           AntiGame_mod
// @description    Modification of Antigame OGame scripts with some additional features(RUN AFTER ANTIGAME) Multilanguage!!
// @version        1.3.1
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==



var version = '1.3.1'
document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
var css = document.styleSheets[document.styleSheets.length-1];


//=======================================================================================
//
//								Antigame default lang pack
//
//=======================================================================================
var Antimod_lang = {};

Antimod_lang.LabelsEN =
	{
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
		
		lbl_shipSCargo: 'Small Cargo',
		lbl_shipLCargo: 'Large Cargo',
		lbl_shipLFighter: 'Light Fighter',
		lbl_shipHFighter: 'Heavy Fighter',
		lbl_shipCruiser: 'Cruiser',
		lbl_shipBattleship: 'Battleship',
		lbl_shipColonizator: 'Colony Ship',
		lbl_shipRecycler: 'Recycler',
		lbl_shipSpy: 'Espionage Probe',
		lbl_shipBomber: 'Bomber',
		lbl_shipDestroyer: 'Destroyer',
		lbl_shipRIP: 'Deathstar',
		lbl_shipBCruiser: 'Battlecruiser',
		lbl_shipSatellite: 'Solar Satellite',
		
		lbl_defRLauncher: 'Rocket Launcher',
		lbl_defLLaser: 'Light Laser',
		lbl_defHLaser: 'Heavy Laser',
		lbl_defGauss: 'Gauss Cannon',
		lbl_defIon: 'Ion Cannon',
		lbl_defPlasma: 'Plasma Turret',
		lbl_defSShield: 'Small Shield Dome',
		lbl_defLShield: 'Large Shield Dome',
		
		lbl_RequiredEnergy: 'Energy needed',
		
		rx_sendMail: /Send a message to (.+)\./
		
	}
	
	Antimod_lang.InterfaceEN =
	{
		opt_languageName: 'English',
	
		opt_title: 'AntiGame Options',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancel',
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
	
	

	
//=======================================================================================
//
//								Global settings/variables
//
//=======================================================================================

var Options ={};


try { this.unsafeWindow = unsafeWindow; }
catch (e) { this.unsafeWindow = window; }

ress_names = new Array( 'Metal', 'Crystal', 'Deuterium');

var Tools = {
	page:"",
	putInCSS : function(rule) {
		css.insertRule(rule,0);
	},
	unsafeWindow: window,
	isCurrentPage: function (page){
			return page.test(document.URL.toString());
	},
	setOptions: function(){
		
		
		
		//styles
		if(GM_getValue('antimod_styleOld'))
			Options.style = GM_getValue('antimod_styleOld');
		else
			Options.style = 'line';
		
		//fleet send
		if(GM_getValue('antimod_setFleet1') != null)
			Options.setFleet1 = GM_getValue('antimod_setFleet1');
		else
			Options.setFleet1 = true;
			
		if(GM_getValue('antimod_setFleet2') != null)
			Options.setFleet2 = GM_getValue('antimod_setFleet2');
		else
			Options.setFleet2 = true;
		
		if(GM_getValue('antimod_setFleet3') != null)
			Options.setFleet3 = GM_getValue('antimod_setFleet3');
		else
			Options.setFleet3 = true;
		
		
		//colors
		if(GM_getValue('antimod_colorAtt'))
			Options.colorAtt = GM_getValue('antimod_colorAtt');
		else
			Options.colorAtt = '#fc1d1d';
		
		if(GM_getValue('antimod_colorAlt'))
			Options.colorAlt = GM_getValue('antimod_colorAlt');
		else
			Options.colorAlt = '#960000';
			
		if(GM_getValue('antimod_colorTran'))
			Options.colorTran = GM_getValue('antimod_colorTran');
		else
			Options.colorTran = '#779f5c';
		
		if(GM_getValue('antimod_colorStat'))
			Options.colorStat = GM_getValue('antimod_colorStat');
		else
			Options.colorStat = '#13f3eb';
			
		if(GM_getValue('antimod_colorSpio'))
			Options.colorSpio = GM_getValue('antimod_colorSpio');
		else
			Options.colorSpio = '#fdfa03';
			
		if(GM_getValue('antimod_colorKolo'))
			Options.colorKolo = GM_getValue('antimod_colorKolo');
		else
			Options.colorKolo = '#97fffb';
			
		if(GM_getValue('antimod_colorZer'))
			Options.colorZer = GM_getValue('antimod_colorZer');
		else
			Options.colorZer = '#c113f3';
			
		if(GM_getValue('antimod_colorVerband'))
			Options.colorVerband = GM_getValue('antimod_colorVerband');
		else
			Options.colorVerband = '#d71353';
			
		if(GM_getValue('antimod_colorHold'))
			Options.colorHold = GM_getValue('antimod_colorHold');
		else
			Options.colorHold = '#ff7000';
			
		if(GM_getValue('antimod_colorAbb'))
			Options.colorAbb = GM_getValue('antimod_colorAbb');
		else
			Options.colorAbb = '#06c01c';
			
		if(GM_getValue('antimod_colorExp'))
			Options.colorExp = GM_getValue('antimod_colorExp');
		else
			Options.colorExp = '#2675d0';
			
			
		//Pranger
		if(GM_getValue('antimod_insertPillar') != null)
			Options.insertPillar = GM_getValue('antimod_insertPillar');
		else
			Options.insertPillar = true;
		
		if(GM_getValue('antimod_pillarName'))
			Options.pillarName = GM_getValue('antimod_pillarName');
		else
			Options.pillarName = 'Pillary';
		
		//checks
		if(GM_getValue('antimod_insertEvent') != null)
			Options.insertEvent = GM_getValue('antimod_insertEvent');
		else
			Options.insertEvent = true;
			
		if(GM_getValue('antimod_insertBars') != null)
			Options.insertBars = GM_getValue('antimod_insertBars');
		else
			Options.insertBars = true;
		
		if(GM_getValue('antimod_modGala') != null)
			Options.modGala = GM_getValue('antimod_modGala');
		else
			Options.modGala = true;
			
	  	if(GM_getValue('antimod_autoUpdate') != null)
			Options.autoUpdate = GM_getValue('antimod_autoUpdate');
		else
			Options.autoUpdate = true;
			
		if(GM_getValue('antimod_BBPreview') != null)
			Options.BBPreview = GM_getValue('antimod_BBPreview');
		else
			Options.BBPreview = true;
			
		if(GM_getValue('antimod_skin') != null)
			Options.skin = GM_getValue('antimod_skin');
		else
			Options.skin = false;
			
		if(!GM_getValue('firstRun'))
			firstRun();
			GM_setValue('firstRun',1);
			
	}
	
}


//import lang pack if present
var external_langpack = unsafeWindow.AntiGame_lang;
if (external_langpack){
	for (var i in external_langpack){
		var el = i.toString();
		var name = el.match(/^Labels([A-Z]{2,3})$/);
		if (name) {
			Antimod_lang['LabelsEN']= external_langpack[name[0]];
		}
		var name2 = el.match(/^Interface([A-Z]{2,3})$/);
		if (name2) {
			Antimod_lang['InterfaceEN']= external_langpack[name2[0]];
		}
	}
}




Tools.setOptions();

Tools.putInCSS('.antires {\
			   width: 151px !important;\
			   background: #0D1014 !important;\
			   border: 3px double #000000 !important;\
			   }\
			  ');

Tools.putInCSS('.finishtime {\
				color: #7C8E9A;\
				}');
Tools.putInCSS('.green {\
			   color: #7C8E9A;\
			   }\
			   ');

//CSS highlight fix
Tools.putInCSS('.premiumHighligt span {\
  color: #767F88;\
}\
');

Tools.putInCSS('.premiumHighligt span:hover {\
  color: #FFffff;\
}\
');

//=======================================================================================
//
//								Sending Fleets
//
//=======================================================================================
if(Options.setFleet1 && Tools.isCurrentPage(/fleet1/)){

	
	Tools.putInCSS('#allornone .allornonewrap {\
				   margin-top: 0px;\
				   }\
				   ');
	Tools.putInCSS('#fleet1 #allornone {\
				   padding-top: 132px;\
				   padding-left: 0px;\
				   }\
				   ');
	
	Tools.putInCSS('#antimod_Box {\
				margin: 5px 0 10px 3px;\
			   }\
			  ');
			  
	Tools.putInCSS('#antimod_Box .secondcol {\
				margin-left: 30px;\
			   }\
			  ');
	
	Tools.putInCSS('#antimod_Box #continue {\
				margin-right: 40px !important;\
			   }\
			  ');
			  
	Tools.putInCSS('#fleet1 #buttonz {\
				height: auto;\
			   }\
			  ');

	
	
	
	
	
	var allornone = document.getElementById('allornone');

	
   surroundBox(allornone, allornone.getElementsByClassName('allornonewrap')[0]);
				   
	var node = document.getElementById('calculator');
	if(node){
		
		Tools.putInCSS('#calculator {\
				   margin: 0 auto;\
				   border: 0px;\
				   width: 664px;\
				   background-color: transparent;\
				   ');
				   
		
		
		surroundBox(allornone, node);
		
	}
	allornone.focus();
	boxCSS();
	
	var comps = document.getElementsByClassName('combatunits')[0];
	if(comps){
		
		Tools.putInCSS('#antimod_fleetshortbox {\
						width:630px;\
						height:110px;\
						float: left;\
						padding: 0 10px 0 10px;\
						margin: 5px 0 0 10px;\
						}\
						');
		
		Tools.putInCSS('#antimod_fleetshortbox .antimod_fleetshort {\
						cursor: pointer;\
						width: 125px;\
						color: #6F9FC8;\
						font: 700 11px Verdana,Arial,SunSans-Regular,Sans-Serif;\
						padding: 3px 12px;\
						border: 2px dotted #7e3917;\
						overflow: hidden;\
						float: left;\
						margin: 4px 2px;\
						}\
						');
						
		Tools.putInCSS('#fleet1 #allornone {\
				   padding-top: 15px !important;\
				   }\
				   ');
		
		
		var surround = document.createElement('div');
		surround.id = 'antimod_fleetshortbox';
		comps = comps.children;
		var form = document.forms[1];
		for (var i = 1; i < comps.length && i < 12;i++){
			var box = document.createElement('div');
			box.className = 'antimod_fleetshort';
			//box.setAttribute('type','button');
			var value = comps[i].innerHTML.replace(/^\s+/,"").replace(/\s+$/,"");
			if (value.length > 18) {
				value = value.substr(0,15);
				value += "...";		
			}
			box.innerHTML = value;
			box.setAttribute('onclick', 'document.getElementById(\'continue\').focus();' +comps[i].getAttribute('onclick') );
			surround.appendChild(box);
		}
		form.appendChild(surround);
	}
}
		
		
if(Options.setFleet2 && Tools.isCurrentPage(/fleet2/)){
	
	document.getElementById('fleetBriefingPart1').style.marginLeft = '40px';
	Tools.putInCSS('#slPanel {\
			   padding: 5px;\
			   margin: 0 auto;\
			   width: 667px;\
			   }\
			  ');
			  
	Tools.putInCSS('#slPanel th {\
			  text-decoration: underline;\
			  margin-bottom: 5px;\
			   }\
			  ');

	Tools.putInCSS('#antimod_Box {\
				margin: 5px 0 10px 3px;\
			   }\
			  ');
			  
	Tools.putInCSS('#exposhort {\
				width: 17px;\
				height: 17px;\
				float: right;\
				position: relative;\
				right: 16px;\
				top: 4px;\
				background: url(img/layout/icon-expedition.gif);\
				cursor: pointer;\
			   }\
			  ');
	
	boxCSS();
	
	//insert Exposhortcut
	var target = document.getElementById('target').children[2];
	var input = document.createElement('div');
	input.id = 'exposhort';
	input.setAttribute('onclick','document.getElementById(\'position\').value = \'16\'; updateVariables();document.getElementById(\'continue\').focus();');
	target.appendChild(input);
	
	surroundBox(document.getElementById('inhalt'), document.getElementById('slPanel'));
	showFleet();
}



function surroundBox(parent, node){
	var inhalt = parent;
	
	//Shortlinksbox bearbeiten
	var box = document.createElement('div');
	var head = document.createElement('div');
	var footer = document.createElement('div');
	
	head.className = 'antimod_head';
	footer.className = 'antimod_footer';
	box.id = 'antimod_Box';
	
	var content = node;
	content.className = 'antimod_content';
	
	box.appendChild(head);
	box.appendChild(content);
	box.appendChild(footer);
	
	inhalt.appendChild(box);
}


function showFleet(){
	//Ausgewählte Flotte Anzeigen
	var inhalt = document.getElementById('inhalt');
 	var selectedFleet = new Array();
	var formFelds = document.forms[0].elements;
	for (var i = 0;i < formFelds.length-1;i++){
		if(formFelds[i].name.match(/am/g)){
			var Selection = {
			name: formFelds[i].name,
			number: formFelds[i].value
			}
			selectedFleet.push(Selection);}
	}
	var box = document.createElement('div');
	var head = document.createElement('div');
	var content = document.createElement('div');
	var footer = document.createElement('div');
	
	head.className = 'antimod_head';
	content.className = 'antimod_content';
	footer.className = 'antimod_footer';
	
	box.id = 'antimod_fleetSelect';
	var output = "<table><tbody>";
	var switcher = 0;
	for (var i = 0; i < selectedFleet.length;i++){
		var name = "";
		var anzahl = "";
		switch(selectedFleet[i].name){
			case 'am204': name = Antimod_lang.LabelsEN.lbl_shipLFighter;break;
			case 'am205': name = Antimod_lang.LabelsEN.lbl_shipHFighter;break;
			case 'am206': name = Antimod_lang.LabelsEN.lbl_shipCruiser;break;
			case 'am207': name = Antimod_lang.LabelsEN.lbl_shipBattleship;break;
			case 'am202': name = Antimod_lang.LabelsEN.lbl_shipSCargo;break;
			case 'am203': name = Antimod_lang.LabelsEN.lbl_shipLCargo;break;
			case 'am208': name = Antimod_lang.LabelsEN.lbl_shipColonizator;break;
			case 'am209': name = Antimod_lang.LabelsEN.lbl_shipRecycler;break;
			case 'am210': name = Antimod_lang.LabelsEN.lbl_shipSpy;break;
			case 'am215': name = Antimod_lang.LabelsEN.lbl_shipBCruiser;break;
			case 'am211': name = Antimod_lang.LabelsEN.lbl_shipBomber;break;
			case 'am213': name = Antimod_lang.LabelsEN.lbl_shipDestroyer;break;
			case 'am214': name = Antimod_lang.LabelsEN.lbl_shipRIP;break;
			default: break;
		}
		if(switcher % 2 == 0){
			output += "<tr><td class=\"antimod_shipname\">"+name+":</td><td class=\"antimod_shipcount\">"+ selectedFleet[i].number+"</td>";
		} else { 
			output += "<td class=\"antimod_shipname\">"+name+":</td><td class=\"antimod_shipcount\">"+ selectedFleet[i].number+"</td></tr>";
		}
		switcher++;
	}
	
	output += "</tbody></table>";
	content.innerHTML = output;
	if(selectedFleet.length == 1)
		content.firstChild.style.width = '320px';
	//content.appendChild(list);
	box.appendChild(head);
	box.appendChild(content);
	box.appendChild(footer);
	inhalt.appendChild(box);
	
}


function boxCSS(){
	
	Tools.putInCSS('#antimod_fleetSelect {\
				margin: 5px 0 10px 3px;\
			   }\
			  ');
			  
	Tools.putInCSS('#antimod_fleetSelect table {\
				margin-left: 20px;\
			   }\
			  ');
	
	Tools.putInCSS('.antimod_head {\
				height: 17px;\
				background:url("data:image/gif;base64,R0lGODlhlwIRALMIAAkLDggJDAoMDw4RFgoNEA4RFQAAAA0QFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjgxQkNFMEI2ODlBN0RGMTE5NzgyOTcyMEY5RTgxNTU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQwQzBFOEQ0QTc4QTExREY5MkExQUFGODdFNkNDMEU5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQwQzBFOEQzQTc4QTExREY5MkExQUFGODdFNkNDMEU5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgxQkNFMEI2ODlBN0RGMTE5NzgyOTcyMEY5RTgxNTU4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgxQkNFMEI2ODlBN0RGMTE5NzgyOTcyMEY5RTgxNTU4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAACAAsAAAAAJcCEQAABP8QSWSqvXbqzbv/YCiOZGmeaKqubOu+cCzPdG3feC5hfNX1QJ1wSCwaj8ikcslsOm3A3iZKrVqf2Kx2y+16v2CadUzO7MrotHrNbrvf8Lh8Tq/b7/i8fs/v++EUQASDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkkGkCBamqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycq3ZQDLB9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8N9kz/H19vf4+fr7/P3+/wADtrMSwIDAgwgTKlzIsKHDhxAZGqQywGDEixgzatzIsaPHj9FbJkY5YBGkyZMoU6pcyRKiSEElW8qcSbOmzZsyX/YgibOnz59Agwp9p9NAoAo8hypdyrSpU5o6zyCN+bSq1atYs+6LenSi1q9gw4odi43rmaRk06pdy9anyAkRAAA7") no-repeat scroll 0 0 transparent;\
			   }\
			  ');
			  
	Tools.putInCSS('.antimod_footer {\
					height: 17px;\
					width: 663px;\
					background:url("./img/layout/wrap-footer.gif") no-repeat scroll -2px -12px transparent;\
			   }\
			  ');
			  
	Tools.putInCSS('.antimod_content {\
					width: 667px;\
					margin: 0 auto;\
					background:url("img/layout/wrap-body.gif") repeat-y scroll -2px 0 transparent;\
			   }\
			  ');
			  
	Tools.putInCSS('#antimod_fleetSelect table {\
				margin-left: 20px;\
				width: 645px;\
			   }\
			  ');
	
	Tools.putInCSS('#antimod_fleetSelect .antimod_shipcount {\
				text-align: right;\
				padding-right: 25px;\
			   }\
			  ');	
}

if(Options.setFleet3 && Tools.isCurrentPage(/fleet3/)){
	boxCSS();
	showFleet();
	
}


//=======================================================================================
//
//								Eventlist
//
//=======================================================================================
if(Tools.isCurrentPage(/eventList/) && Options.insertEvent){
	
	
	Tools.putInCSS('#eventHeader {\
			   background: url("./img/layout/header-stuff.gif") no-repeat scroll transparent;\
			   height: 27px;\
			   }\
			  ');
	if(!Options.skin){
	Tools.putInCSS('#eventHeader {\
			   background-position: 2px 0 !important;\
			   }\
			  ');
			  
	Tools.putInCSS('#eventListWrap {\
				   width: 670px;\
				   }\
				   ');
	
	Tools.putInCSS('#eventContent {\
					width: 667px;\
					margin-left: 2px;\
					background:url("./img/layout/wrap-body.gif") repeat-y scroll 0 0 transparent;\
					}\
					');
					
	Tools.putInCSS('#eventFooter {\
				   background:url("./img/layout/wrap-footer.gif") no-repeat scroll 2px 0 transparent;\
				   height: 29px;\
				   }\
				   ');
	}
	
	Tools.putInCSS('#eventContent {\
					text-align: center;\
					');
	
	
	Tools.putInCSS('#eventListWrap {\
				   margin-top: 5px;\
				   }\
				   ');
	
					
	Tools.putInCSS('#eventContent table {\
					width: 647px;\
					margin: 0 auto;\
					}\
					');
	
	
				
	if (Options.style == "box") {
		
		Tools.putInCSS('#eventContent td {\
					border: 1px solid #7C8E9A;\
					}\
					');
					
		Tools.putInCSS('#eventContent tr{\
					height: 32px;\
					}\
					');
	} else {
		
	Tools.putInCSS('#eventContent tr{\
					height: 34px;\
					}\
					');
				
	Tools.putInCSS('#eventContent .antimod_detail,#eventContent .antimod_detail,#eventContent .antimod_arrive,#eventContent .antimod_ships,#eventContent .antimod_dest,#eventContent .antimod_origin,#eventContent .antimod_mail {\
					border-left: 1px dashed #7C8E9A;\
					}\
					');
					
	Tools.putInCSS('#eventContent table {\
					border-collapse: collapse;\
					}\
					');
					
	Tools.putInCSS('#eventContent tr{\
					height: 32px;\
					}\
					');
					
	Tools.putInCSS('#eventContent .hell{\
					background-color: #1d1d1d;\
					}\
					');
					
	
	}
	
	
	
	
	
					
	Tools.putInCSS('.antimod_arrive span,.antimod_detail span{\
					display: block;\
					}\
					');
	
    
	Tools.putInCSS('#eventContent .antimod_origin a, #eventContent .antimod_dest a {\
					color: white;\
					margin-left:5px;\
					font-weight: normal;\
					text-decoration: none;\
					}\
					');
					
	Tools.putInCSS('#eventContent .antimod_origin a:hover, #eventContent .antimod_dest a:hover {\
					text-decoration: underline;\
					}\
					');
					
	Tools.putInCSS('#eventContent .antimod_detail {\
					width: 25px;\
					position: relative;\
					}\
					');
					
	Tools.putInCSS('.icon_movement_reserve, .icon_movement {\
					left: 5px;\
					position: relative;\
					}\
					');
					
	Tools.putInCSS('.antimod_mail a {\
					margin-left: 3px;\
					}\
					');
					
	Tools.putInCSS('.antimod_arraive {\
					text-decoration: none;\
					}\
					');
					
	Tools.putInCSS('.underline td {\
					text-decoration: underline;\
					}\
					');
	
	
	var eventList = document.getElementById('eventContent').cloneNode(true);
	var eventBox = document.createElement('div');
	var eventTable = document.createElement('table');
	var timers = eventList.getElementsByClassName('countDown');
	var arrivals = eventList.getElementsByClassName('arrivalTime');
	var descsFleet = eventList.getElementsByClassName('descFleet');
	var missionsFleet = eventList.getElementsByClassName('missionFleet');
	var originsFleet = eventList.getElementsByClassName('originFleet');
	var coordsOrigins = eventList.getElementsByClassName('coordsOrigin');
	var detailsFleet = eventList.getElementsByClassName('detailsFleet');
	var destsFleet = eventList.getElementsByClassName('destFleet');
	var destsCoords = eventList.getElementsByClassName('destCoords');
	var sendMail = eventList.getElementsByClassName('sendMail');
	var sendProbe = eventList.getElementsByClassName('sendProbe');
	var descFleet = eventList.getElementsByClassName('descFleet');
	var evtDetails = document.getElementsByClassName('antigame_evtDetails');
	var fleetcomp = false;
	if (evtDetails[0])
		fleetcomp = true;
  
	var parent = window.parent;
	var h = 310 + timers.length * 34;
	if(fleetcomp){
		h  += timers.length * 34;
	}
 
	if(parent && timers.length > 0) {
		parent = parent.document;
		var sheet = parent.styleSheets[parent.styleSheets.length-1];
		var node = parent.getElementById('newEventBox');
		if(node.previousSibling){  // check here
			h -= 18;
		}
		if(node.nextSibling){
		  if(node.nextSibling.id == "planet"){
			var planet = parent.getElementById('planet');
			planet.style.marginTop = '-220px';
			var anker = planet.getElementsByClassName('openPlanetrenameGiveupBox')[0];
			anker.style.position = 'relative';
			anker.style.zIndex = '99';
		  }
			
			
		}
		if(!Options.skin)	
			sheet.insertRule('#newEventBox { height: '+h+'px !important; margin-left: -1px; width: 690px;position: relative; z-index: 99;}',sheet.cssRules.length);
		else
			sheet.insertRule('#newEventBox { height: '+h+'px !important; position: relative; z-index: 99;}',sheet.cssRules.length);
		
		
	}
	
	var k = 0;
	var duration = eventList.children.length;
	eventBox.id = 'eventContent';
	var switcher = 0;
	for (var i = 0; i < duration;i++){
		
		var loopMission = missionsFleet[i];
		var loopTimer = timers[i];
		var loopDetails = detailsFleet[i];
		
		var loopMissionType = loopMission.lastChild.innerHTML;
		var mission = loopMission.firstChild.attributes[0].value;
		var list = timers.parentNode;
		var eventRow = eventList.children[i];
		var newrow = document.createElement('tr');
		if(switcher % 2 == 0)
			newrow.className = 'dunkel';
		else 
			newrow.className = 'hell';
		
		var newrowSub = null;
		
		
		//falls fleet comp
		if(fleetcomp){
			newrowSub = document.createElement('tr');
			if(switcher % 2 == 0)
				newrowSub.className = 'hell';
			else 
				newrowSub.className = 'dunkel';
			var cell = document.createElement('td');
			cell.style.border = 'none';
			newrowSub.appendChild(cell);
			getDetails(newrowSub, eventRow,mission);
			if(loopMissionType.match(/\(R\)/g)){
			  newrowSub.style.fontStyle = 'oblique';
			  newrowSub.style.fontSize = '11px';
			  newrowSub.style.opacity = '0.58';
			} else { 
			  if(loopMissionType.match(/\(E\)/g) || loopMissionType.match(/\(H\)/g)){
				  newrowSub.className += ' underline';
				  newrowSub.style.fontSize = '12px';
			  } else{
				  newrowSub.style.fontSize = '12px';
			  }
	         }
		}
		
		switcher++;
		
		//Setze Schrift
		if(loopMissionType.match(/\(R\)/g)){
			newrow.style.fontStyle = 'oblique';
			newrow.style.fontSize = '11px';
			newrow.style.opacity = '0.58';
		} else { 
			if(loopMissionType.match(/\(E\)/g) || loopMissionType.match(/\(H\)/g)){
				newrow.className += ' underline';
				newrow.style.fontSize = '12px';
			}else{
				newrow.style.fontSize = '12px';
				}
	    }
		var desc = loopTimer.firstChild.className;
		if (!desc.match(/friendly/g) && mission == "img/layout/icon-angriff.gif"){
			mission = "incoming";}
		if (!desc.match(/friendly/g) && mission == "img/layout/icon-spionage.gif"){
			mission = "incomingspy";}
		//setze Farbe
		switch (mission) {
			case "img/layout/icon-expedition.gif": newrow.style.color = Options.colorExp;break;
			case "img/layout/icon-angriff.gif": newrow.style.color = Options.colorAtt ;break;
			case "img/layout/icon-spionage.gif": newrow.style.color = Options.colorSpio;break;
			case "img/layout/icon-stationieren.gif": newrow.style.color = Options.colorStat;break;
			case "img/layout/icon-transport.gif": newrow.style.color = Options.colorTran;break;
			case "img/layout/icon-kolonisieren.gif": newrow.style.color = Options.colorKolo;break;
			case "img/layout/icon-zerstoeren.gif": newrow.style.color = Options.colorZer;break;
			case "img/layout/icon-verband.gif": newrow.style.color = Options.colorVerband;break;
			case "img/layout/icon-halten.gif": newrow.style.color = Options.colorHold;break;
			case "img/layout/icon-tf-abbauen.gif": newrow.style.color = Options.colorAbb;break;
			case "incoming": newrow.style.color = Options.colorAlt;mission ="img/layout/icon-angriff.gif"; break;
			case "incomingspy": newrow.style.color = Options.colorSpio;mission ="img/layout/icon-angriff.gif"; break;
			default: newrow.style.color = '#7C8E9A';
		}
		
		
		var att = document.createAttribute('id');
		att.value = eventRow.getAttribute('id');
		newrow.setAttributeNode(att);
		
		//Missionsart
		var cell = document.createElement('td');
		cell.appendChild(loopMission.firstChild);
		cell.className = 'antimod_mission';
		if (!desc.match(/friendly/g) && mission == "img/layout/icon-angriff.gif"){
			cell.firstChild.attributes[0].value = "data:image/gif;base64,R0lGODlhEQARAPf/ABIMDjcMDxQMD0UEBTkEBDYEBRQOEFQHCc8qK4otLz4DBLAHCRQNEDsMD0wJCnMGBzsLDlE0NyYDBHwGB7ItLyUCAkoJC5AyNKMFBnMPE5wJC8UFBogpKdwpKzkND8cpKrIqLEMEBroGCDoFB4QxNFcICVIICmspKpArLVEEBmgrLKgHCWg7QJUwM4A0NoszNdADBV8tL3EqLDcNEMwEBkw0N18JDGYpKUQLDU4rLHQ2OjQNEE00N5gICTsEBHgpKmcJCloDBHI0OHUFBqsJCkQICsErLG03PG8qKzwMDmc0N7suL1QpKV0zNWASFl4KDV4PFIc2OoAzNW00NkoJDC4NEFg1OIAHCGgsLLQFBow0NzYEBlg6QHwzNWg2OrwsLmgpKXs3O2UMDlApKZEqK3kHCJ4xNM4FBo8FBhQPEl0KDXM4PGUoKIgJC2MFBmYFBzkoKaowM6MvMI8yNX4KDEQKDGwGB1Y0N0wEBW0KDDgMD5kICYUHCDoEBUIFBpgKDXwqK1Q3OmAICWI0NikBAS4MD3E1OXM1OmE7QJsxNJwwM6QICXIpKWsNEHEsLrQuL8UGCKYvM7UvMMAICT0LDuApKmQzNukDBFAKDcEEBX00OH02On41OX42OkEDBGA5PUQCAlMDBJMrK6wvMVUFBXkxNHkzNrEKDGgzNms5PW86P6gEBogzNcsDBXsKDawsLX0JC3MzNKAxNKMyNFs0NzwEBVw0No80NzgEBn80N2I0OJAuL5YyNX8zNYQzNko0NzECA74tLp8ICXA0Nnk2OlU0NjsoKZIJCk40NlMpKoIzNoQLDn0HCKAFBp0yNWs2OhMNEHM3O4wFB/cpKUYKDJUyNZQyNEU0OXM5PVQJCoU0NlQDA4gICVIGB1MFB3szNmU1OTQEBk4ICpUpKkcEBaowNMYEBqMvMY8yNIozNX0LDY8HCDkLDnM3PEULDcErK24GB1c0N0oDBJYsLTUMDzkMD3IGB9MpKREND0sICoQHCKIHCBUOETsEBX0GB////yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjc1NDJEQzA5RTNBMkRGMTE5M0MxQzBCNDUwREIwNEUyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc4NjMzMkI0QTMxMjExREY4ODBGRTQ4NEUzOURCNDRFIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc4NjMzMkIzQTMxMjExREY4ODBGRTQ4NEUzOURCNDRFIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc2NDJEQzA5RTNBMkRGMTE5M0MxQzBCNDUwREIwNEUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc1NDJEQzA5RTNBMkRGMTE5M0MxQzBCNDUwREIwNEUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAA/wAsAAAAABEAEQAACP8A//279gtZhDu2mtCKVywCjxoC/wWyogvVsG8xcpTqFWuKEkuD/nH55MVQl3Qkko1xZGaOFFNCnoFDlOoQpwuJsMxbomJXHGuscuk4wmJNJy2zEiD58g6FDAqjeL3Q1E5VmCjOzp0A8YOJEQ6igkWqpo0Ytk23yv0g04ENHAT3GL2SpAidi2i+ZCUAg6DSDWMfpo0D9EhOC2VOMiwbgOYMjVASMl3asM3fH3WNoLjqFmSBCHOrMMBoBUkauTZ08oixUYCPsAVZQBFqNmkFEVLeYAF5ssXNsT2L9imosO6Uhh7cfAgSUwTYGzsPylyZMEQfM3vwHsgLpwYHrn4EanlG8oMnRYgBCgj0KTACEyV3VBw4yFbigH0T4vJZqEMtyb8q9ATAjgcNNAABBPXoEcAOMxQSEQAMQMOAAfxMaAA0AuCThkABAQA7";	
		}
			
		newrow.appendChild(cell);
		
		//Ankunftszeit
		cell = document.createElement('td');
		cell.className = 'antimod_arrive';
		var span = document.createElement('span');
		var count = loopTimer.firstChild;
		count.className = '';
		if(!loopTimer.innerHTML.match(/---/g)){
		  span.innerHTML = arrivals[i-k].innerHTML.substring(0,8);
		  cell.appendChild(count);
		  cell.appendChild(span);
		}else{
			k++;
			cell.appendChild(count);
		}
		newrow.appendChild(cell);
		
		//Anzahl der Schiffe
		cell = document.createElement('td');
		cell.className = 'antimod_ships';
		
		if(loopDetails.children.length < 2){
			cell.appendChild(loopDetails.firstChild);
		}
		else{
				cell.innerHTML = loopDetails.children[0].innerHTML;								//prüfen ob append moeglich
		}
		newrow.appendChild(cell);
		
		//Uhrsprung
		cell = document.createElement('td');
		cell.className = 'antimod_origin';
		cell.appendChild(originsFleet[i].firstChild);
		cell.appendChild(coordsOrigins[i].firstChild);
		newrow.appendChild(cell);
		
		//Flottenpfeil
		cell = document.createElement('td');
		cell.className = 'antimod_detail';
		if(loopDetails.children.length > 1)
			cell.appendChild(loopDetails.children[1]);
		else{
		  if(!fleetcomp)
			  cell.innerHTML = loopDetails.innerHTML;
		  else {
			  if(loopMissionType.match(/\(R\)/g))
			  	cell.innerHTML = "<span class=\"icon_movement_reserve\">&nbsp;</span>";
			  else
				cell.innerHTML = "<span class=\"icon_movement\">&nbsp;</span>";
			  }
		}
		newrow.appendChild(cell);
		
		
		//Ziel
		cell = document.createElement('td');
		cell.className = 'antimod_dest';
		var input = destsFleet[i].innerHTML;
		input += destsCoords[i].innerHTML;
		cell.innerHTML = input;
		newrow.appendChild(cell);
		
		
		
		//mail und Spio
		cell = document.createElement('td');
		cell.className = 'antimod_mail';
		var probe = eventRow.getElementsByClassName('sendProbe');
		var mail = eventRow.getElementsByClassName('sendMail');
		if(probe[0]){
			cell.innerHTML = probe[0].innerHTML;	
		}
		if(mail[0]){
			cell.innerHTML += mail[0].innerHTML;	
		}
		newrow.appendChild(cell);
		eventTable.appendChild(newrow);
		if(newrowSub != null)
			eventTable.appendChild(newrowSub);
		
		
	}
	eventBox.appendChild(eventTable);
	document.getElementById('eventListWrap').replaceChild(eventBox,  document.getElementById('eventContent'));
	
	
	
	
}


//=======================================================================================
//
//								Galaxy
//
//=======================================================================================

if(Tools.isCurrentPage(/galaxy/) && Options.modGala){
	Tools.putInCSS('.planetMoveIcons {\
					opacity: 0.17;\
					}\
					');
					
	Tools.putInCSS('.planetMoveIcons:hover {\
					opacity: 1.0;\
					}\
					');
					
	
}

//=======================================================================================
//
//								Ressources
//
//=======================================================================================
if(Options.insertBars){
	Tools.putInCSS('.antimod_capbg {\
				background:url(img/navigation/fleet-storage-capacity-bg.jpg) no-repeat scroll 0 0 transparent;\
				height:20px;\
				position:relative;\
				width:128px;\
				margin: 0 auto; }\
				');



	Tools.putInCSS('.antimod_capbg div {\
                background:url(img/navigation/energy_balken.gif) no-repeat scroll left top transparent;\
                height:6px;\
                left:8px;\
                position:absolute;\
                top:7px;\
                width:112px;}\
				');
				
  var boxes = document.getElementsByClassName('antires');
  if(boxes[0]){
	for(var i = 0; i < ress_names.length;i++){
		var ticker = 'resourceTicker'+ress_names[i];
		var ress_tick = unsafeWindow[ticker];
		var node = document.createElement('div');
		node.className = 'antimod_capbg';
		node.innerHTML = "<div style=\"background-position: -"+ (188-(ress_tick.available / ress_tick.limit[1] * 188)) +"px 0px;\"class=\"antimod_thebar\">\
		<\/div>";
		
		boxes[i].insertBefore(node,boxes[i].children[4]);
	}
  }
}

//=======================================================================================
//
//										Update
//
//=======================================================================================
var AutoUpdater = {
    id: 83064,
    days: 1,
    name: 'AntiGame_mod',
    version: version,
    time: new Date().getTime(),
    call: function(response) {
        GM_xmlhttpRequest({
            method: 'GET',
	    url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	    onload: function(xpr) {AutoUpdater.compare(xpr,response);}
        });
    },
    compareVersion: function(r_version, l_version) {
		if (r_version == l_version) 
			return false;
		else 
			return true;
    },
    compare: function(xpr,response) {
        this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
        if ( (this.xversion) && (this.xname[1] == this.name) ) {
            this.xversion = this.xversion[1];
            this.xname = this.xname[1];
        } else {
            if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	    GM_setValue('antimod_autoUpdate', false);
            return false;
        }
        var updated = this.compareVersion(this.xversion, this.version);
        if ( updated && confirm('A new version of '+this.xname+' is available.\nDo you wish to install the latest version?') )
            GM_openInTab('https://userscripts.org/scripts/show/'+this.id);
        else if ( this.xversion && updated ) {
            
        } else if (response)
            alert('No updates available for '+this.name);
    },
    check: function() {
			if(!GM_getValue('updated_83064'))
				GM_setValue('updated_83064', this.time+'');

            if (+this.time > (+GM_getValue('updated_83064') + 28800000*this.days)) { //nur 8 stunden 
                GM_setValue('updated_83064', this.time+'');
                this.call();
            }
        
    }
};

if(Options.autoUpdate && Tools.isCurrentPage(/overview/)){
  if (typeof GM_xmlhttpRequest !== 'undefined'){
		  AutoUpdater.check();}
}
//=======================================================================================
//
//								Interface
//
//=======================================================================================
GM_registerMenuCommand("AntiGame_mod manual Update", function(){GM_setValue('updated_83064', new Date().getTime()+''); AutoUpdater.call(true);});

if (Tools.isCurrentPage(/preferences/)){
	
	
	Tools.putInCSS('.antimod_bigHead {\
				height: 30px;\
				padding-top: 4px;\
				width: 667px;\
				background: url("./img/layout/header-stuff.gif") no-repeat scroll 0 0 transparent;\
			   }\
			  ');
	Tools.putInCSS('#antimod_preferences {\
				margin: 5px 0 5px 2px;\
				width 667px;\
				padding-left: 2px;\
			   }\
			  ');
			  
	Tools.putInCSS('#antimod_preferences .antimod_content{\
				margin-top: -1px;\
			   }\
			  ');
			  
	Tools.putInCSS('#anti_options_window #content{\
				width: 580px;\
			   }\
			  ');
	Tools.putInCSS('#antimod_form2 div{\
				width: 586px;\
				margin: 0 auto;\
				border: 1px solid black;\
				padding: 10px;\
				height: 300px;\
				overflow: auto;\
			   }\
			  ');
			  
	Tools.putInCSS('#antimod_form2{\
				padding: 8px 20px 0 20px;\
			   }\
			  ');
			  
	Tools.putInCSS('#antimod_form2 table{\
				width: 100%;\
			   }\
			  ');
	Tools.putInCSS('#antimod_form2 td {\
				padding-top: 8px;\
				color: #6F9FC8;\
				font-weight: 700;\
				font: 11px Verdana,Arial,SunSans-Regular,Sans-Serif;\
				font-weight: 700;\
				text-align: center;\
			   }\
			  ');
	Tools.putInCSS('#antimod_form2 input {\
				width: 120px;\
				margin-right: 15px;\
			   }\
			  ');
			  
	Tools.putInCSS('#antimod_form2 .antimod_labels {\
				text-align: left;\
				margin: 0;\
			   }\
			  ');
			  
	Tools.putInCSS('#antimod_form2 .button188 {\
				width: 175px;\
				margin: 10px auto 0;\
			   }\
			  ');
			  
	Tools.putInCSS('#antimod_form2 #antimod_log {\
				padding: 15px;\
				color: #6F9FC8;\
			   }\
			  ');
			  
	Tools.putInCSS('#antimod_pLabel {\
				margin: 0 auto;\
				color: #6F9FC8;\
				height: 16px;\
				width: 160px;\
				background: #0D1014;\
				border-top: 2px double black;\
				border-left: 2px double black;\
				border-right: 2px double black;\
				text-align: center;\
				padding: 5px 0 3px 0;\
				font-weight: 700;\
			   }\
			  ');
	Tools.putInCSS('.antimod_footer {\
					height: 17px;\
					width: 663px;\
					background:url("./img/layout/wrap-footer.gif") no-repeat scroll 0 -12px transparent;\
			   }\
			  ');
			  
	Tools.putInCSS('.antimod_content {\
					width: 667px;\
					margin: 0 auto;\
					background:url("img/layout/wrap-body.gif") repeat-y scroll 0 0 transparent;\
			   }\
			  ');
			  


	var changelog = "Änderungen der Version "+version+":<br />\
					<br />\
					*Änderung: Hinweis auf das neue Interface entfernt(bei Doppelklick aufs Icon)<br />\
					+Neu: BBCode Preview unterstüzt alle tags<br />\
					+Neu: Aussehen der Preview angepasst<br />\
					+Bugfix: Preview auf Alliance seite nach Reiterwechsel<br />\
					+Neu: Preview im Interface aussschaltbar<br />\
					+Neu: Option für die Verwendung von skins hinzugefügt<br />\
					*Bugfix: falls Infcompte3 nach AntiGame lief - fixed<br />\
					<br /><br /><br />\
					Changes on Version "+version+":<br />\
					<br />\
					*Change: Hint to new Interface deleted(after doubleklick on AntiGame icon)<br />\
					+New: Inserted missing tags to Preview<br />\
					+New: New look of the Preview<br />\
					+Bugfix: Preview after tab change on alliance side<br />\
					+New: Preview selectable in the Interface<br />\
					+New: Option for running other skins<br />\
					*Bugfix: if Infocompte3 was running after AntiGame - fixed<br />\
					";
					
	var tree = Antimod_lang.InterfaceEN;
	var parent = document.getElementById('inhalt');
	var box = document.createElement('div');
	var head = document.createElement('div');
	var content = document.createElement('div');
	var footer = document.createElement('div');
	var label = document.createElement('p');
	label.id = 'antimod_pLabel';
	label.innerHTML = "AntiGame_mod "+ version;
	
	head.className = 'antimod_bigHead';
	content.className = 'antimod_content';
	footer.className = 'antimod_footer';
	
	box.id = 'antimod_preferences';
	head.innerHTML = "<ul class=\"tabsbelow\">\
						<li class=\"ui-tabs-selected\"><a id=\"antimod_pGeneral\" href=\"#\"><span>" + tree.lbl_sectionGeneral + "</span></a>\
						</li>\
						<li><a id=\"antimod_pEvent\" href=\"#\"><span>" + tree.lbl_sectionEventList.replace(/\s\w+/g,"") + "</span></a>\
						</li>\
						<li><a id=\"antimod_pFleet\" href=\"#\"><span>" + tree.lbl_sectionFleetDispatch +"</span></a>\
						</li>\
						<li><a id=\"antimod_pChange\" href=\"#\"><span>ChangeLog</span></a>\
						</li>\
					  </ul>";
     box.appendChild(label);
	 var form = document.createElement('form');
	 form.id = 'antimod_form2';
	 form.setAttribute('name','antimod_set2');
	 form.innerHTML = "<div id=\"antimod_pTab0\" style=\"display: block;\">\
	 						<table><tbody>\
							  <tr>\
									<td class=\"antimod_labels\">Insert Pillary-Link:</td>\
									<td><input id=\"antimod_insertPillar\" type=\"checkbox\" ></td>\
									<td class=\"antimod_labels\">Name of Pillary-Link:</td>\
									<td><input  id=\"antimod_pillarName\" type=\"Text\" ></td>\
								</tr>\
								<tr>\
								  <td class=\"antimod_labels\">Insert Resource-Bars:</td>\
								  <td><input id=\"antimod_insertBars\" type=\"checkbox\" ></td>\
								  <td class=\"antimod_labels\">Modify Galaxy:</td>\
								  <td><input id=\"antimod_modGala\" type=\"checkbox\" ></td>\
							  </tr>\
							  <tr>\
								  <td class=\"antimod_labels\">Daily update check:</td>\
								  <td><input id=\"antimod_autoUpdate\" type=\"checkbox\" ></td>\
								  <td class=\"antimod_labels\">Insert Preview for msg:</td>\
								  <td><input id=\"antimod_BBPreview\" type=\"checkbox\" ></td>\
							  </tr>\
							  <tr>\
								  <td class=\"antimod_labels\">I am Running a skin:</td>\
								  <td><input id=\"antimod_skin\" type=\"checkbox\" ></td>\
							  </tr>\
							</tbody></table>\
	 				   </div>\
					   <div id=\"antimod_pTab1\" style=\"display: none;\">\
					   		<table><tbody>\
							 <tr>\
								  <td class=\"antimod_labels\">Modify Event-List:</td>\
								  <td><input id=\"antimod_insertEvent\" type=\"checkbox\" ></td>\
								  <td class=\"antimod_labels\">Event-List styles:</td>\
								  <td><select id=\"antimod_styleOld\" size=\"1\" ><option value=\"box\">  boxed Style  </option><option value=\"line\">  lined Style  </option></td>\
							  </tr>\
							  <tr>\
								  <td class=\"antimod_labels\">Event-List ColorCodes:</td>\
							  </tr>\
							  <tr></tr>\
							   <tr>\
								  <td class=\"antimod_labels\">"+  tree.opt_missAttack +"(out)</td>\
								  <td><input id=\"antimod_colorAtt\" type=\"Text\" ></td>\
								  <td class=\"antimod_labels\">"+  tree.opt_missTransport +"</td>\
								  <td><input id=\"antimod_colorTran\" type=\"Text\" ></td>\
							  </tr>\
							  <tr>\
								  <td class=\"antimod_labels\">"+  tree.opt_missEspionage +"</td>\
								  <td><input id=\"antimod_colorSpio\" type=\"Text\" ></td>\
								  <td class=\"antimod_labels\">"+  tree.opt_missDeploy +"</td>\
								  <td><input id=\"antimod_colorStat\" type=\"Text\" ></td>\
							  </tr>\
							  <tr>\
								  <td class=\"antimod_labels\">"+  tree.opt_missColony +"</td>\
								  <td><input id=\"antimod_colorKolo\" type=\"Text\" ></td>\
								  <td class=\"antimod_labels\">"+  tree.opt_missDestroy +"</td>\
								  <td><input id=\"antimod_colorZer\" type=\"Text\" ></td>\
							  </tr>\
							  <tr>\
								  <td class=\"antimod_labels\">"+  tree.opt_missHold +"</td>\
								  <td><input id=\"antimod_colorHold\" type=\"Text\" ></td>\
								  <td class=\"antimod_labels\">"+  tree.opt_missExpedition +"</td>\
								  <td><input id=\"antimod_colorExp\" type=\"Text\" ></td>\
							  </tr>\
							  <tr>\
								  <td class=\"antimod_labels\">"+  tree.opt_missHarvest +"</td>\
								  <td><input id=\"antimod_colorAbb\" type=\"Text\" ></td>\
								  <td class=\"antimod_labels\">"+  tree.opt_missFederation +"</td>\
								  <td><input id=\"antimod_colorVerband\" type=\"Text\" ></td>\
							  </tr>\
							  <tr>\
								  <td class=\"antimod_labels\">"+  tree.opt_missAttack +"(in)</td>\
								  <td><input id=\"antimod_colorAlt\" type=\"Text\" ></td>\
							  </tr>\
							</tbody></table>\
	 				   </div>\
					   <div id=\"antimod_pTab2\" style=\"display: none;\">\
					   		<table><tbody>\
							<tr>\
								  <td class=\"antimod_labels\">Modify Fleet1-Page:</td>\
								  <td><input id=\"antimod_setFleet1\" type=\"checkbox\" ></td>\
							  </tr>\
							 <tr>\
								  <td class=\"antimod_labels\">Modify Fleet2-Page:</td>\
								  <td><input id=\"antimod_setFleet2\" type=\"checkbox\" ></td>\
							  </tr>\
							  <tr>\
								  <td class=\"antimod_labels\">Modify Fleet3-Page:</td>\
								  <td><input id=\"antimod_setFleet3\" type=\"checkbox\" ></td>\
							  </tr>\
							</tbody></table>\
	 				   </div>\
					   <div id=\"antimod_pTab3\" style=\"display: none;\">\
					   		<p id=\"antimod_log\">\
							"+ changelog +"\
							</p>\
	 				   </div>\
					   <td><input type=\"button\" class=\"button188\" id=\"antimod_sub\" value=\""+  tree.opt_btnOk +"\"></td>\
					   <td><input type=\"button\" class=\"button188\" id=\"antimod_reset\" value=\""+  tree.opt_btnDefault +"\"></td>\
						";
	content.appendChild(form);

	
	
	box.appendChild(head);
	box.appendChild(content);
	box.appendChild(footer);
	parent.appendChild(box);

	
	
	
	loadSetting2();
	document.getElementById('antimod_sub').addEventListener('click',antiModSub2,true);
	document.getElementById('antimod_reset').addEventListener('click',resetOptions2,true);
	document.getElementById('antimod_pGeneral').addEventListener('click',function(){switchTab(0)},true);
	document.getElementById('antimod_pEvent').addEventListener('click',function(){switchTab(1)},true);
	document.getElementById('antimod_pFleet').addEventListener('click',function(){switchTab(2)},true);
	document.getElementById('antimod_pChange').addEventListener('click',function(){switchTab(3)},true);
}

function switchTab(number){
		var divs = document.getElementById('antimod_form2').children;
		var head = document.getElementsByClassName('antimod_bigHead')[0];
		var lis = head.getElementsByTagName('li');
		for (var i = 0;i < 4; i++ ){
			lis[i].className = '';
			divs[i].style.display = 'none';
		}
		lis[number].className = 'ui-tabs-selected';	
		divs[number].style.display = 'block';	
}

function loadSetting2() {
	if(document.getElementById('antimod_form2')){
	  var formular = document.getElementById('antimod_form2')
	  formular.elements[0].checked = Options.insertPillar;
	  formular.elements[1].value = Options.pillarName;
	  formular.elements[2].checked = Options.insertBars;
	  formular.elements[3].checked = Options.modGala;
	  formular.elements[4].checked = Options.autoUpdate;
	  formular.elements[5].checked = Options.BBPreview;
	  formular.elements[6].checked = Options.skin;
	  formular.elements[7].checked = Options.insertEvent;
	  if(Options.style == "box")
	  	formular.elements[8].options[0].selected = true;
	  else
		formular.elements[8].options[1].selected = true;
	  formular.elements[9].value = Options.colorAtt;
	  formular.elements[9].style.backgroundColor = Options.colorAtt;
	  formular.elements[10].value = Options.colorTran;
	  formular.elements[10].style.backgroundColor = Options.colorTran;
	  formular.elements[11].value = Options.colorSpio;
	  formular.elements[11].style.backgroundColor = Options.colorSpio;
	  formular.elements[12].value = Options.colorStat;
	  formular.elements[12].style.backgroundColor = Options.colorStat;
	  formular.elements[13].value = Options.colorKolo;
	  formular.elements[13].style.backgroundColor = Options.colorKolo;
	  formular.elements[14].value = Options.colorZer;
	  formular.elements[14].style.backgroundColor = Options.colorZer;
	  formular.elements[15].value = Options.colorHold;
	  formular.elements[15].style.backgroundColor = Options.colorHold;
	  formular.elements[16].value = Options.colorExp;
	  formular.elements[16].style.backgroundColor = Options.colorExp;
	  formular.elements[17].value = Options.colorAbb;
	  formular.elements[17].style.backgroundColor = Options.colorAbb;
	  formular.elements[18].value = Options.colorVerband;
	  formular.elements[18].style.backgroundColor = Options.colorVerband;
	  formular.elements[19].value = Options.colorAlt;
	  formular.elements[19].style.backgroundColor = Options.colorAlt;
	  formular.elements[20].checked = Options.setFleet1;
	  formular.elements[21].checked = Options.setFleet2;
	  formular.elements[22].checked = Options.setFleet3;
	  }
}



function resetOptions2() {
	var form = document.getElementById('antimod_form2');
	if(form && confirm('Are u sure? - All saved settings will be set to default!!')){
	  for (var i = 0; i < 23;i++){
		  var id = form.elements[i].id;
		  try{GM_deleteValue(id); }
		  catch(e){}
	  }
	  form.style.display = 'none';
	  GM_deleteValue('firstRun');
	  window.location.reload();
	}
}


function antiModSub2(){
	var formular = document.getElementById('antimod_form2');
	if(formular){
		  for (var i = 0; i < 23;i++){
			  var id = formular.elements[i].id;
			  if ((i < 8 && i != 1)|| i > 19)   {
				  GM_setValue(id,formular.elements[i].checked);
			  } else {
				  GM_setValue(id,formular.elements[i].value);
			  }
		  }
	}
	window.location.reload();
	
	
}

//=======================================================================================
//
//								Messages && BB-CodeParser
//
//=======================================================================================

if(Options.BBPreview && Tools.isCurrentPage(/alliance/)){
	document.body.addEventListener('DOMNodeInserted',insertPreviewA,true);
	Tools.putInCSS('#previewB {\
				background-position: 0 -54px;\
				width: 88px;\
				margin: 0px;\
				}');
				
	Tools.putInCSS('#previewB:hover {\
				background-position: 0 -81px;\
				}');
	
	Tools.putInCSS('#netz #alliance input.buttonSave {\
				float: left;\
				margin-left: 200px;\
				}');
				
	Tools.putInCSS('#previewBox {\
				position: absolute;\
				width: 653px;\
				height: 310px;\
				background: #0D1014;\
				border: 2px solid black;\
				top: -128px;\
				left: 5px;\
				overflow: auto;\
				z-index: 99;\
				color: #6F9FC8;\
				}');
				
		Tools.putInCSS('#previewBox #previewP {\
				text-align: left;\
				padding: 5px;\
				width: 570px;\
				margin: 20px 20px 0;\
				}');
				
		Tools.putInCSS('#previewBox #previewP p {\
				margin-top: 0;\
				margin-bottom: 0;\
				}');
				
		Tools.putInCSS('#previewClose {\
				background: url("./img/layout/detail-spriteset.gif") no-repeat scroll -207px -2px transparent;\
				float: right;\
				}');		
				
}





if(Options.BBPreview && Tools.isCurrentPage(/writemessage/)){
	Tools.putInCSS('#writemessage .buttonbox {\
				width: 355px;\
				}');
				
	Tools.putInCSS('#previewBox {\
				width: 768px;\
				height: 310px;\
				top: 88px;\
				left: 2px;\
				}');
				
	messageCSS();	
	var tr = document.getElementsByClassName('buttonbox')[0];
	var button = document.createElement('input');
	button.id = 'previewB';
	button.className = 'button188';
	button.setAttribute('type','button');
	button.value = 'Preview';
	button.addEventListener('click',function(){showPreview(tr.parentNode);},true);
	tr.appendChild(button);
}

if(Options.BBPreview && Tools.isCurrentPage(/showmessage/)){
	
	Tools.putInCSS('#showmessage .button188 {\
				margin-left: 5px;\
				}');
	
	Tools.putInCSS('#previewBox {\
				width: 768px;\
				height: 205px;\
				top: 120px;\
				left: 2px;\
				}');			
	
	messageCSS();		
	var tr = document.getElementsByClassName('buttonbox')[0];
	var button = document.createElement('input');
	button.id = 'previewB';
	button.className = 'button188';
	button.setAttribute('type','button');
	button.value = 'Preview';
	button.addEventListener('click',function(){showPreview(tr.parentNode.parentNode);},true);
	tr.appendChild(button);
}

function messageCSS(){
	Tools.putInCSS('#previewB {\
				float: right;\
				}');
				
	
	Tools.putInCSS('#previewBox {\
				position: absolute;\
				background: #0D1014;\
				border: 2px solid black;\
				overflow: auto;\
				z-index: 99;\
				color: #A9A9A9;\
				}');
				
		Tools.putInCSS('#previewBox #previewP {\
				text-align: left;\
				padding: 5px;\
 				-moz-border-radius: 5px 5px 5px 5px;\
 				border: 1px solid #000000;\
				background: none repeat scroll 0 0 #1C232C;\
				width: 690px;\
				margin: 20px 20px 0;\
				}');
				
		Tools.putInCSS('#previewBox #previewP p {\
				margin-top: 0;\
				margin-bottom: 0;\
				}');
				
		Tools.putInCSS('#previewClose {\
				background: url("./img/layout/detail-spriteset.gif") no-repeat scroll -207px -2px transparent;\
				float: right;\
				}');
	
}


function insertPreviewA() {
	var button = document.getElementById("previewB");
	if(button){
		return;}
	var table = document.getElementsByClassName('buttonSave');
	if(table) {
		
		
		
		var tr = table[0].parentNode;
		var button = document.createElement('input');
		document.body.removeEventListener('DOMNodeInserted',insertPreviewA,true);
		button.id = 'previewB';
		button.className = 'button188';
		button.setAttribute('type','button');
		button.value = 'Preview';
		button.addEventListener('click',function(){showPreview(tr.parentNode.parentNode);},true);
		tr.appendChild(button);
		document.body.addEventListener('DOMNodeInserted',insertPreviewA,true);
		
	}
	
	
}


function showPreview(node){
	
	var textfield = node.getElementsByTagName('textarea');
	var msg = textfield[0].value;
	var prebox = document.getElementById('previewBox');
	if(!prebox){
	var box = document.createElement('div');
	box.id = 'previewBox';
	box.innerHTML = "<a onclick=\"this.parentNode.style.display = 'none';\" href=\"#\" id=\"previewClose\"><img height=\"16px\" width=\"16px\" src=\"img/layout/pixel.gif\">\
	</a><div id=\"previewP\"><p>"+parseBBCode(msg)+"</p></div>";
	}else{
		prebox.innerHTML = "<a onclick=\"this.parentNode.style.display = 'none';\" href=\"#\" id=\"previewClose\"><img height=\"16px\" width=\"16px\" src=\"img/layout/pixel.gif\">\
		</a><div id=\"previewP\"><p>"+parseBBCode(msg)+"</p></div>";
		prebox.style.display = 'block';
	}
	
	
	node.appendChild(box);
}


var opentags;     
var urlstart = -1;

// RegExps
var email_re = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
var font_re = /^(:arial|times|currere|lettera)$/i;
var align_re = /^(:left|right|center)$/i;
var tagname_re = /^\/?(?:b|i|u|color|list|\u002A|font|size|email|p|align|sub|sup|center|url|s|)$/;
var color_re = /^(:?black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua|#(?:[0-9a-f]{3})?[0-9a-f]{3})$/i;
var number_re = /^[\\.0-9]{1,8}$/i;
var uri_re = /^[-;\/\?:@&=\+\$,_\.!~\*'\(\)%0-9a-z]{1,512}$/i;
var postfmt_re = /([\r\n])|(?:\[([a-z]{1,16}|\u002A)(?:=([^\x00-\x1F"'\(\)<>\[\]]{1,256}))?\])|(?:\[\/([a-z]{1,16}|\u002A)\])/ig;

// In stack schieben
function taginfo_t(bbtag, etag)
{
   this.bbtag = bbtag;
   this.etag = etag;
}

// Tagpruefung
function isValidTag(str)
{
   if(!str || !str.length)
      return false;

   return tagname_re.test(str);
}

//
// m1 - zeilenumbruch
// m2 - tag
// m3 - tag option
// m4 - close tag
//
function textToHtmlCB(mstr, m1, m2, m3, m4, offset, string)
{  
   
   //zeilenumbruch check
   if(m1 && m1.length) {
      if(m1 == 'p' || m1 == '\n')
            return "<br />";
   }

   
   if(isValidTag(m2)) {
      // falls url offen
      if(opentags.length && opentags[opentags.length-1].bbtag == "url" && urlstart >= 0)
         return "[" + m2 + "]";
      switch (m2) {
		  
		  case "p":
		  	return "<br />"
		  
         case "color":
            if(!m3 || !color_re.test(m3))
               m3 = "inherit";
            opentags.push(new taginfo_t(m2, "</span>"));
            return "<span style=\"color: " + m3 + "\">";
			
		 case "align":
            if(!m3 || !align_re.test(m3))
              return mstr;
            opentags.push(new taginfo_t(m2, "</p>"));
            return "<p style=\"text-align: " + m3 + "\">";
			
		 case "font":
            if(!m3 || !font_re.test(m3))
				return mstr;
			opentags.push(new taginfo_t(m2, "</span>"));
			return "<span style=\"font-family: " + m3 + "\">";
            
         case "size":
            if(!m3 || !number_re.test(m3))
               m3 = "1";
            opentags.push(new taginfo_t(m2, "</span>"));
            return "<span style=\"font-size: " + Math.min(Math.max(m3, 0.7), 3) + "em\">";

         case "s":
            opentags.push(new taginfo_t(m2, "</span>"));
            return "<span style=\"text-decoration: line-through\">";
			
		 case "center":
            opentags.push(new taginfo_t(m2, "</p>"));
            return "<p style=\"text-align: center\">";
			
		case "sup":
            opentags.push(new taginfo_t(m2, "</span>"));
            return "<span style=\"vertical-align: super\">";
			
		case "sub":
            opentags.push(new taginfo_t(m2, "</span>"));
            return "<span style=\"vertical-align: sub\">";
		
		case "list":
            opentags.push(new taginfo_t(m2, "</ul>"));
            return "<ul style=\"list-style-type: square;\"\">";
			
		case "*":
			return "<li>";	
			
		 case "email":
			if(m3 && !email_re.test(m3))
				return mstr;
			if (m3 && email_re.test(m3)){
			  opentags.push(new taginfo_t(m2, "</a>"));
			  return "<a href=\"mailto://" + m3 +"\">";
			}
			if (!m3 && email_re.test(string.substring(7,string.length - 8))){
			  opentags.push(new taginfo_t(m2, "</a>"));
			  return "<a href=\"mailto://" + string.substring(7,string.length - 8) +"\">";
			} else
				return mstr;

         case "url":
            opentags.push(new taginfo_t(m2, "</a>"));
            
           
            if(m3 && uri_re.test(m3)) {
               urlstart = -1;
               return "<a href=\"" + m3 + "\">";
            }

          
            urlstart = mstr.length + offset;
            return "<a href=\"";


         default:
		 	
            // [b],[i],[u]
            opentags.push(new taginfo_t(m2, "</" + m2 + ">"));
			
            return "<" + m2 + ">";
            
      }
   }
   
  //schluss tags 
 if(isValidTag(m4)) {
      if(!opentags.length || opentags[opentags.length-1].bbtag != m4)
         return "<span style=\"color: red\">[/" + m4 + "]</span>";

      if(m4 == "url") {
         if(urlstart > 0)
            return "\">" + string.substr(urlstart, offset-urlstart) + opentags.pop().etag;
         
         return opentags.pop().etag;
      }
    else if(m4 == "code" || m4 == "pre")
         crlf2br = true;
      return opentags.pop().etag;
 }
   return mstr;
}

function parseBBCode(post)
{
   var result, endtags, tag;

   //init stack
   if(opentags == null || opentags.length)
      opentags = new Array(0);

   // parse
   result = post.replace(postfmt_re, textToHtmlCB);
   

   if(opentags.length) {
      endtags = new String();
      
      if(opentags[opentags.length-1].bbtag == "url") {
         opentags.pop();
         endtags += "\">" + post.substr(urlstart, post.length-urlstart) + "</a>";
      }
      
      while(opentags.length)
         endtags += opentags.pop().etag;
   }

   return endtags ? result + endtags : result;

}

//=======================================================================================
//
//								Global mixed stuff
//
//=======================================================================================
var src = "this.rel='data:image/gif;base64,R0lGODlhGwAbAOYAACodDRkaGwAAACYqLTMzMyMmK0pANRwUCQ8SFQoMDw8TFR8lKtSmbHFOJAsLDAoNDwsNEAwPEBATFhUWFw8SFsaKPx8jKIZtTQoNEBAUF5lmMzgnEgoMDgwPEciMQmJFH4JpSxgUECwqJRITEzwyJal7QSElKSAiI8WJP0lANAsOERsfIxEVGBsgIwkLDo9yT4FbKwkMDY1iLQ0PEh8kKceMQZBzT55/VygmIciMQYNqS1tBIrSOXy0hERIVGaqIXLeRYZ51QA4PD9Sla8eLQWpNJxoeIiQoKyMlJysfDxIWGSAkJ4hvUHtmS0pBNZV4VLOBQZd7VkA7NVk/IH9qTkY9MMaKQDgxJ1BGO8aLQXhjSIlpPy8qI8yZZjsvIHdaNndVK0U1IH9YKNSma0A+OwkLDScpK09FOql2NkdBOB4iJn1gPAkJDCAXDL6VYriBPF9GJoFpSXNfREE/PXRcPopkNVQ7Gx0iJwwQEjAjFN6tcBYaHtOTQxwhJRwgJf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mjg5NTQ1RjNBMzlCMTFERjg5REJDQjU0MkRFQUE3ODMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mjg5NTQ1RjRBMzlCMTFERjg5REJDQjU0MkRFQUE3ODMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyODk1NDVGMUEzOUIxMURGODlEQkNCNTQyREVBQTc4MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyODk1NDVGMkEzOUIxMURGODlEQkNCNTQyREVBQTc4MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAH8ALAAAAAAbABsAAAf/gH9/C32FhoeIiQuCg4p+j46JjZGQlZaUl5mae5udnXp6Np6WcqAEnI+hTqOVBDp6KagEsKyXtKi3BAMWu7omvQXAfrmzKXNdQARSoUMpBD9jyASzorB7uGcEF3oEIF3DUdTeaUzfw7GPxX5pzBd+NgxUQ2bUQ+7DVXsCnHwERwQaUPTbQ4CPBw2cAvKRwo+EgIcB+AAQQCAMHzQPBZSQ+HDDxQkPOUKUOKHiRYhBRB74GHLiSABIABo8QJEPHxkPxRjE0jJjRAAEQvCBQ6SOgC1v1lgJgeNmFg0jBIgUEHHah34NPEzw0EDE0C9Ys5yQmsQnR64Q2gzlqCGHFRgYR4TuIGsWTNmMePP6vOqSqk04egNntDPTZ1DBiCkSSMy4sWPGCOI+DoxAwB88kjGnzZiZTQIOnVlEYJShtGnNSiigjqxgtaBAADs=';";
var button = document.getElementById('btnCoords');
if(button){
button.setAttribute('onmouseover',src);
button.setAttribute('title','Delete autocopied koords!');
button.style.cursor= 'pointer';}



if(Options.insertPillar){
var pranger = Options.pillarName;
var prangNode = document.createElement('li');
prangNode.innerHTML = "<a href=\"pranger.php\" target=\"_blank\">"+ pranger +"</a>";
var barNodes = document.getElementById('bar').children[0]
barNodes.insertBefore(prangNode,barNodes.children[6]);
}


function getDetails(subrow, eventRow,mission)
		{
			try {
				function sendRequest(url, li) {
					var xhr = new XMLHttpRequest();
					xhr.open('GET', url, true); 
					xhr.onreadystatechange = function()
					{	
						if (xhr.readyState == 4)
							if (xhr.status == 200)
								showFleetDetails(li, xhr.responseText);
					}; 
					xhr.send(null); 
				}
				
					
					var li = document.createElement('td');
					li.className = 'antigame_evtDetails ';
					li.setAttribute('colspan','6');
					subrow.appendChild(li);
					switch (mission) {
						case "img/layout/icon-expedition.gif":subrow.style.color = Options.colorExp;break;
						case "img/layout/icon-angriff.gif": subrow.style.color = Options.colorAtt ;break;
						case "img/layout/icon-spionage.gif": subrow.style.color = Options.colorSpio;break;
						case "img/layout/icon-stationieren.gif": subrow.style.color = Options.colorStat;break;
						case "img/layout/icon-transport.gif": subrow.style.color = Options.colorTran;break;
						case "img/layout/icon-kolonisieren.gif": subrow.style.color = Options.colorKolo;break;
						case "img/layout/icon-zerstoeren.gif": subrow.style.color = Options.colorZer;break;
						case "img/layout/icon-verband.gif": subrow.style.color = Options.colorVerband;break;
						case "img/layout/icon-halten.gif": subrow.style.color = Options.colorHold;break;
						case "img/layout/icon-tf-abbauen.gif": subrow.style.color = Options.colorAbb;break;
						case "incoming": newrow.style.color = Options.colorAlt;break;
						default: newrow.style.color = '#7C8E9A';
			}
					var url = eventRow.getElementsByClassName('tipsTitleArrowClose')[0].href;
					sendRequest(url, li);
				
			} catch (e) { }
		}
		
function showFleetDetails(li, data)
		{	
			data = data
				.replace(/<th colspan="2">.+?<\/th>/gi, '')
				.replace(/(<.+?>\s*)+/gi,' ')
				.replace(' &nbsp; ','<br/><br/>')
				.replace(/^\s/,'')
			;
			li.innerHTML = data;

		}

function firstRun(){
	alert('Your are running Antigame_Mod for the first time! \n Thx for giving it a try :) \n You can find the settings under the normal OGame-preferences.');
	
}