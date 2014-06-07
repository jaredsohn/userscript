// ==UserScript==
// @name            VosParaBellum (Stormfall Power Tools - by Jawz)
// @namespace       www.wrob.info/aow/js/aow_tool.user.js
// @icon            http://img66.xooimage.com/files/3/6/d/jaws64-2b5041c.png
// @description     Enhanced Power Tools for Stormfall, by Jawz - Supported languages : only French (for now)
// @grant           GM_xmlhttpRequest
// @version         2013.1003
// @changeLog		Changement n° version client
// ==/UserScript==

/* Removed 
// @match           *://apps.facebook.com/stormfall/*
// @match           *://*rulesofwargame.com/stormfall.fb/*
// @include         *://apps.facebook.com/stormfall/*
// @include         *://*rulesofwargame.com/stormfall.fb/*
*/

/* TO DO 
 - Onglet Nid d'aigle => Champs de bataille + implants + Mes implants + fiefs + auto-collecte
 - Envoi catacombes ou sanctuaire en auto des troupes formées
 - Onglet Infos : Trier formations par groupes
 - Onglet Infos : Bouton pour envoi troupes aux catacombes/sanctuaire
 - Afficher parchemins
 - Onglet jobs : Constructions, Formations, Arts perdus, Pouvoirs
*/
(function() {
var scriptVersion	= '2013.1003';
var scriptId		= '162539';
var client_ver		= '448';
var CHROME_EXT		= false;

var chrome_extensions = 'chrome://chrome/extensions/';
var userscripts_src  = 'http://userscripts.org/scripts/source/'+scriptId+'.user.js'; 

/* Check to see if script is running in an iframe or not and removes unnecessary elements before continuing with the script. */
//if (/(pixelkabam|akamaihd|plugins|ai\.php|talkgadget|notifications|contactPicker|accounts|googleapis\.com\/static)/.test(window.location.href)) return;

var window = unsafeWindow || window;
if (!window || window.location.href.indexOf('stormfall')==-1) return;

function debugLog (data) {
	if (window.console && console.log) console.log(data);
}
if (window.top === window.self) {
	function setWide() {
		if ( window.location.href.indexOf('facebook') !== -1 ) {
			iframe	 = document.getElementById('iframe_canvas');
			platform = 'facebook';
		}
		if (!iframe || iframe.length < 1) {
			setTimeout (setWide, 1000);
			return;
		}
		while ((iframe = iframe.parentNode) != null) {
			if (iframe.tagName == 'DIV')
				iframe.style.width = '100%';
		}
		document.getElementById('rightCol').style.display = 'none';
		document.getElementById('rightCol').style.display = 'none';
		document.getElementById('blueBarHolder').style.display = 'none';
		document.getElementById('blueBar').style.display = 'none';
		document.getElementById('pageHead').style.display = 'none';
		document.getElementById('jewelContainer').style.display = 'none';
		document.getElementById('headNav').style.display = 'none';
		document.getElementById('contentCol').style.margin = '0px';
		document.getElementById('contentCol').style.background = 'transparent';
		var contentColChild = document.getElementById('contentCol').childNodes;
		for (var i=0; i<contentColChild.length; i++)
			if (contentColChild[i].tagName == 'DIV')
				contentColChild[i].style.margin = '0px';
		document.scrollTop = '42px';
	}
	setWide();
} else {
	var errors = 0;
	function setHigh() {
		clearTimeout;
		var object = document.getElementsByTagName('object');
		if (object.length < 1) {
			if ( ++errors > 6 ){
				errors = 0;
				window.location =  window.location.href;
			}
			setTimeout (setHigh, 1000);
			return;
		}
		for (var i=0; i<object.length; i++) {
			switch (object[i].parentNode.id) {
				case 'hd' :
					object[i].style.display = 'none'; 
					break;
				default :
					object[i].parentNode.style.margin = '0px';
			}
		}
		if (document.getElementById('hd')) {
			document.getElementById('hd').parentNode.style.width = '760px';
			var hdChild = document.getElementById('hd').childNodes;
			for (var i=0; i<hdChild.length; i++) {
				if (hdChild[i].tagName == 'DIV') hdChild[i].style.display = 'none';
				if (hdChild[i].tagName == 'IFRAME') hdChild[i].style.display = 'none';
			}
			document.getElementById('ft').style.display = 'none';
			document.scrollTop = '42px';
		}
		initScript();
	}
	setHigh();
}



function initScript () {
var scriptName	= 'VosParaBellum';
var mainAuthor	= 'Jawz';
var IsChrome	= navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

/* Skins */
var urlBackgroundLogo = 'http://img73.xooimage.com/files/4/3/1/logojaws-2b7e9d0.jpg';

/* Tab order */
var INFO_TAB_ORDER			= 1;
var CONTACTS_TAB_ORDER		= 2;
var JOBS_TAB_ORDER			= 3;
var ALLIANCE_TAB_ORDER		= 4;
var RADAR_TAB_ORDER			= 5;
var OPTIONS_TAB_ORDER		= 20;
var LOG_TAB_ORDER			= 99;

/* Tab enable/disable */
var INFO_TAB_ENABLE			= true;     
var CONTACTS_TAB_ENABLE		= true;
var JOBS_TAB_ENABLE			= true;
var ALLIANCE_TAB_ENABLE		= true;
var RADAR_TAB_ENABLE		= true;
var OPTIONS_TAB_ENABLE		= true;
var LOG_TAB_ENABLE			= true;

/* Global variables */
var C = {};
C.attrs = {};
var Tabs = {};
var progressBarPop;
var updaterPop;
var mainPop;
var swf_object;
var SWF_CONTAINER;
var SWF_CONTAINER_INNERHTML;
var gFormatTime		= ':';
var gFormatDate		= '/';
var scriptTitle		= '';
var scriptSite		= '';
var scriptTimeout	= null;
var scriptLoaded	= false;
var startupCount	= 0;
var initTimeout		= null;
var redo_SignIn		= false;
var STARTUP_TIMER;
var DEBUG	= false; /* Add additional logs into the console */

var BUTTON_BGCOLOR		= '#436';
var JOB_BUTTON_BGCOLOR	= '#436';
var TIMER_COLOR			= '#2B4988';

var div_player_attack	= 'div_SwfPlyr_attack';
var div_player_raid	 	= 'div_SwfPlyr_raid';
var div_player_building = 'div_SwfPlyr_building';
var div_player_units	= 'div_SwfPlyr_units';
var div_player_research = 'div_SwfPlyr_research';
var short_alerts = 'short_alerts';

/* Error messages */
var kFatalSeedTitle	= 'ERREUR LORS DE LA RECUPERATION DES DONNEES DU SERVEUR';
var kFatalSeedMsg	= 'Merci de désactiver le script et de voir si vous pouvez jouer manuellement. Si c\'est possible, alors réactivez le script et réessayez. Si l\'erreur persiste, merci de contacter l\'auteur. Si vous ne pouvez pas jouer manuellement alors patientez, le jeu est probablement en cours de mise à jour.';
var kFatalSWF	= '"<B>Erreur d\'initialisation :</b> <BR><BR>Impossible de toruver l\'élément SWF"';
var kStartupErr	= '"Impossible de démarrer "'+ scriptName +'"<BR>"';
var kInitErr	= '"<B>Erreur initialisation :</b> <BR><BR>"';

/* Main arrays used in the script */
var cyborg_unit_type = 33;
var cyborg_labo_type = 600;
var unit_groups = [ {id:0, desc:'Infanterie'},
					{id:1, desc:'Infanterie Impériale'},
					{id:4, desc:'Cavalerie'},
					{id:5, desc:'Cavalerie Impériale'},
					{id:2, desc:'Unités Occultes'},
					{id:3, desc:'Unités Occultes Impériales'},
					{id:6, desc:'Bestaire'},
					{id:7, desc:'Bestiaire Impérial'},
					{id:8, desc:'Garde du Château'} ];
var resource_types = ['gold', 'food', 'iron', 'saphir', 'skull'];
var production_icons = {'gold':{desc:'Or', icon:'ui/blackMarket/gold.png', treasure:'ui/achievements/25_01.png', march_icon:'ui/skin_parts/icons/iconUraniumGiant.png'},
						'iron':{desc:'Fer', icon:'ui/blackMarket/steel.png', treasure:'ui/achievements/24_01.png', march_icon:'ui/skin_parts/icons/iconTitaniumGiant.png'},
						'food':{desc:'Nourriture', icon:'ui/blackMarket/meat.png', treasure:'ui/achievements/26_01.png', march_icon:'ui/skin_parts/icons/iconCreditGiant.png'}};
var order_ids = {'None':-1, 'Robbery':2, 'Occupation':3, 'Intelligence':4, 'Reinforcement':5, 'Bunker':7, 'Return':9, 'Resources':1006, 'Draws':1007};
var order_desc = {"-1":'Inconnu', "2":'Raid', "3":'Siège', "4":'Espionnage', "5":'Renfort', "7":'En garnison', "9":'Retour', "1006":'Envoi de ressources', "1007":'Envoi d\'un parchemin'};
var unitSend_desc = {"-1":'Euh, je sais pas', "2":'Lancer un Raid', "3":'Lancer un Siège', "4":'Lancer un Espionnage', "5":'Envoyer des Renforts', "7":'En garnison', "9":'Rappeler des unités', "1006":'Envoi de ressources', "1007":'Envoi d\'un parchemin'};

/* Main entry */
function scriptStartup() {
	var i;
	progressBar.hideshow(false);
	clearTimeout(scriptTimeout);

	if (scriptLoaded){
		return;
	}

	if (++startupCount > 20) {
		dialogFatal (kFatalSWF);
		return;
	}

	try {  
		var swf = null;
		var object = document.getElementsByTagName ('object');
		if (object.length < 1) {
			scriptTimeout = setTimeout(scriptStartup, 15000);
			return;
		}
		for (i=0; i < object.length; i++) {
			if (object[i].type && object[i].type=='application/x-shockwave-flash') {
				swf = object[i];
				getFlashVars(swf);
				if (USER_ID){
//					var maxWidth = document.body.offsetWidth - 570;
//					if (maxWidth < 760) maxWidth = 760;
//					if (window.location.href.indexOf("facebook") !== -1)
//						document.getElementById('hd').parentNode.style.width = maxWidth+'px';
//					if (swf.id == 'flashContent') swf.style.width = maxWidth+'px';
					swf_object = swf;
					SWF_CONTAINER = swf.parentNode;
					SWF_CONTAINER_INNERHTML = SWF_CONTAINER.innerHTML;
					break;
				}
			}
		}
		if (!USER_ID) {
			scriptTimeout = setTimeout(scriptStartup, 1000);
			return;
		}
		var _host = localStorage.getItem( 'host_fb'+C.attrs.userId );
		C.attrs.defaultServer = ( _host || '173.45.94.66' );
		var _segment = localStorage.getItem( 'segment_fb'+C.attrs.userId );
		C.attrs.defaultSegment = ( _segment || '00' );
	} catch (e) {
		debugLog ('scriptStartup : Error = '+e);
		scriptTimeout = setTimeout(scriptStartup, 1000);
		return;
	}

	scriptLoaded = true;

	try {
		AutoUpdater.check();
		var retry = 0;
		var startupDelay = Math.randRange(10000, 15000);
		progressBar.start({ steps:8, delay:startupDelay, title:'Initialisation...', stepText:'Chargement des données de base' });

		Data.init({
			log		: [ [], [] ],
			options	: {
				popUp	: {
					open : true,
					x	 : 0,
					y	 : 0
				},
				currentTab		: false,
				disable_alliance: !ALLIANCE_TAB_ENABLE,
				disable_contacts: !CONTACTS_TAB_ENABLE,
				disable_radar	: !RADAR_TAB_ENABLE,
				disable_log		: !LOG_TAB_ENABLE,
				forumUrl		: 'http://userscripts.org/scripts/discuss/118446',
				wikiUrl			: 'http://fr.dragonsofatlantis.wikia.com/wiki/Accueil',
				contacts	: {
					current_tab		: 0,
					detailled_view	: true,
					hide_created	: false,
					filter			: '0',
					collect_treas	: true,
					sort_list		: '1',
					filter_targets	: '0',
					sort_targets	: '2',
					min_level		: 9,
					max_level		: 100,
					distance		: 4
				},
				radar	: {
					current_tab		: 0,
					sort_battle		: '3'
				},

				info  : {	current_tab	  : 0,
							myraids		  : true,
							mysieges	  : true,
							myspies		  : true,
							myreinf		  : true,
							otherraids	  : true,
							othersieges	  : true,
							otherreinf	  : true,
							garnisons	  : true,
							mycaravans	  : true,
							othercaravans : true
				},
				sound : {
					enable_jobs		: false,
					enable_sentinel : false,
					repeat_attack	: false,
					attack_rdelay	: 2,
					repeat_raid		: false,
					raid_rdelay		: 2,
					URL_player		: SoundPlayer.SWF_PLAYER_URL,
					URL_attack		: SoundPlayer.DEFAULT_SOUND_URL.attack,
					URL_raid		: SoundPlayer.DEFAULT_SOUND_URL.raid,
					URL_building	: SoundPlayer.DEFAULT_SOUND_URL.building,
					URL_units		: SoundPlayer.DEFAULT_SOUND_URL.units,
					URL_research	: SoundPlayer.DEFAULT_SOUND_URL.research
				},
				verboseLog		: { enabled : false }
			},
			map	: {
				players		: {},
				evolution	: {}
			},
		});

		if (DEBUG) logit ('Session parameters : '+inspectObj (C, 6, 1));
		function stepStarting (current_step) {
			var wait_time = Math.randRange(1000, 2500);
			var error_code;
			var error_msg;
            var progress_title;
			progressBar.resume ();

			function onSuccess (message, waitTime, currentStep) {
				verboseLog ( message );
				STARTUP_TIMER = setTimeout(stepStarting, waitTime, currentStep);
			}

			function onError (errorCode, errorMsg, message, waitTime, currentStep) {
				error_code = errorCode;
				switch (errorCode) {
					/* Bad request */
					case 400 :	error_msg = '<b>Bad request!</b>';
								progressBar.stop;
								progressBar.hideshow(false);
								retry = 400;
								dialogFatal('<b>' + kFatalSeedTitle + '</b><br><br>\
											<font color="#BF0000"><b> ' + errorMsg + '</b></font>\
											<br><br><div align=left>\
											' + kFatalSeedMsg + '<br><br></div>\
											<a id="support_link" href="" target="_blank">Bugs and Known Issues</a><br>');
								return;
								break;
					/* Forbidden */
					case 403 :	error_msg = '<b>Forbidden!</b>';
								retry = 403;
								return;
								break;
					default : break;
				}
				error_msg = errorMsg;
				debugLog('stepStarting: '+message+', Error '+errorCode+', '+error_msg+'. Retry ' + retry);
				STARTUP_TIMER = setTimeout( stepStarting, waitTime, currentStep, ++retry);
			}
			if (retry <= 10){
				switch ( current_step ) {
					case 1: /* FB data */
						progress_title = 'Récupération des infos FB...';
						progressBar.update ({ step:current_step, title:progress_title, stepText:'Données FB du joueur...' });
						Facebook.init(function (res) {
							if (res.ok) {
								onSuccess ('Données facebook récupérées', wait_time, current_step + 1);
							} else {
								onError (res.status, res.errmsg, 'Facebook', wait_time, current_step);
							}
						});
						break;
					case 2: /* FB friends */
						progress_title = 'Récupération de liste des amis FB...';
						progressBar.update ({ step:current_step, title:progress_title, stepText:'Liste des amis FB...' });
						Facebook.initFriends(function (res) {
							if (res.ok) {
								onSuccess ('Liste des amis FB récupérées', wait_time, current_step + 1);
							} else {
								onError (res.status, res.errmsg, 'Amis FB', wait_time, current_step);
							}
						});
						break;
					case 3: /* SignIn */
						progress_title = 'Récupération des données joueur...';
						progressBar.update ({ step:current_step, title:progress_title, stepText:'Serveur : '+C.attrs.defaultServer+', segment '+C.attrs.defaultSegment });
						Seed.init(function (res) {
							if (res.ok) {
								onSuccess ('Données joueur initialisées', wait_time, (redo_SignIn ? current_step : current_step + 1));
							} else {
								onError (res.status, res.errmsg, 'Seed', wait_time, current_step);
							}
						});
						break;
					case 4: /* Client static data */
						progress_title = 'Récupération des données statiques...';
						progressBar.update ({ step:current_step, title:progress_title, stepText:'Données statiques client' });
						Manifest.init(function (res) {
							if (res.ok) {
								var next = 1;
								if (!Seed.gameData.alliance || Seed.gameData.alliance.id <= 0) next++;
								onSuccess ('Données statiques initialisées', wait_time, (redo_SignIn ? current_step : current_step + next));
							} else {
								onError (res.status, res.errmsg, 'Manifeste', wait_time, current_step);
							}
						});
						break;
					case 5: /* Getting alliance data */
						progress_title = 'Récupération des données alliance...';
						progressBar.update ({ step:current_step, title:progress_title, stepText:'Données alliance...' });
						Seed.initAlliance(function (res) {
							if (res.ok) {
								onSuccess ('Données alliance initialisées', wait_time, current_step + 1);
							} else {
								onError (res.status, res.errmsg, 'Alliance', wait_time, current_step);
							}
						});
						break;
					case 6: /* Getting map data */
						progress_title = 'Récupération des données carte...';
						progressBar.update ({ step:current_step, title:progress_title, stepText:'Données carte...' });
						Map.init(function (res) {
							if (res.ok) {
								onSuccess ('Données carte initialisées', wait_time, current_step + 1);
							} else {
								onError (res.status, res.errmsg, 'Carte', wait_time, current_step);
							}
						});
						break;
					case 7: /* Starting script */
						startScript();
						return;
						break;
				}
			} else {
				/* Retries Limit */
				clearTimeout( STARTUP_TIMER );
				progressBar.stop;
				progressBar.hideshow(false);
				if (retry < 400) { /* to avoid displaying twice a dialogFatal popup */
					dialogFatal('<b>' + kFatalSeedTitle + '</b><br><br>\
								<font color="#BF0000"><b> ' + (error_code || retry) + ' - ' + error_msg + '</b></font>\
								<br><br><div align=left>\
								' + kFatalSeedMsg + '<br><br></div>\
								<a id="support_link" href="" target="_blank">Bugs and Known Issues</a><br>');
				}
				return;
			}
		}

		actionLog('<B>' + scriptVersion + ' (client v' + client_ver + ') en cours de chargement...</B>');
		consoleLog('<B>' + scriptVersion + ' (client v' + client_ver + ') en cours de chargement...</B>');
		stepStarting( 1 );

		function startScript() {
			if (updaterPop)	setTimeout (function(){updaterPop.destroy()}, 100);
			progressBar.update ({ step:8, title:'Finalisation...', stepText:'Initializing des onglets ...' });
			Seed.updating = false; /* End of initialization of Seed */

			AutoRefresh.init ();
//			Messages.init ();

			progressBar.stop;
			progressBar.hideshow(false);
			progressBarPop.destroy();

			if (Data.options.popUp==null || Data.options.popUp.x==null || Data.options.popUp.x=='' || isNaN(Data.options.popUp.x)){
				var maxWidth = document.body.offsetWidth - 570;
				if (maxWidth < 760) maxWidth = 760;
				Data.options.popUp.x = maxWidth+2;
				Data.options.popUp.y = 1;
			}
			var popupWidth = 550;
			var popupHeight = 800;

			/* Random Title */
			makeRandomTitle();

			/* Create a new popup DIV for the main script window */
			mainPop = new PopUp ('main', Data.options.popUp.x, Data.options.popUp.y, popupWidth, popupHeight, function () { mainPop.toggleHideBody(popupHeight);/*tabManager.hideTab();*/ });
			/* Create all the tabs and insert them into the main script popup DIV */
			tabManager.init(mainPop.getMainDiv());
			/* Display everything */
			Data.options.popUp.open = true;
			if (Data.options.popUp.open) {
				mainPop.show(true);
				tabManager.showTab();
			}
			/* Enable the dbclick event */
			mainPop.toggleHideBody(popupHeight);

//			Data.setDefaultValues ('options');
			SoundPlayer.init ();
			WackoScript.init ();
			window.addEventListener('unload', Data.onUnload, false);

			/* Apply CSS styles (THIS MUST BE THE LAST ALWAYS) */
			setStyles();

			actionLog('<B>' + scriptVersion + ' chargé</B>');
			consoleLog('<B>' + scriptVersion + ' chargé</B>');
//			if (Data.stats.requests) Data.stats.requests.start_at = serverTime();
		}
	} catch (e) {
		dialogFatal(kInitErr + e);
		logit(inspectObj (e, 8, 1));
	}
}


/* *****************************************   PACKAGES   ***************************************** */

/******************************** Auto-refresh package ***********************/
var AutoRefresh = {
	timer		: null,
	extras		: null,
	boxesToOpen	: [],
	lastRefreshUserNotes : 0,
	lastRefreshUserRatings : 0,
	first		: 2, /* At initialization, get only the user ratings */
	getRatings	: true, /* Refresh ratings only after attack or been attacked */

	init : function () {
		var t = AutoRefresh;
		t.autoRefreshCmd();
	},
	createRequestData : function (extras) {
		var t = AutoRefresh;
		var data = {"t":(new Date().getTime()), "u":Seed.gameData.sessionStartTimeMs, "g":((new Date().getTime()) - Seed.gameData.sessionStartTimeMs), "r":Seed.gameData.revision};
		if (!is_null(Seed.gameData.quests) && !is_null(Seed.gameData.quests.quest_for_auto_refresh)) {
			var ids = [];
/*  TO COMPLETE
			var _loc_3:* = {r:_loc_2.revision, t:ServerTimeManager.serverTimeNow.time, u:ServerTimeManager.sessionStartTimeMs, g:ServerTimeManager.sessionInGameTimeMs};
            if (UserManager.user.gameData.questData != null)
            {
                _loc_5 = UserManager.user.gameData.questData.questsForAutoRefresh;
                if (_loc_5 != null)
                {
                    _loc_6 = new Array();
                    for each (_loc_7 in _loc_5)
                    {
                        
                        _loc_6.push(_loc_7.questId);
                    }
*/
			data.q = ids;
		}
		if (!is_null(extras)) data.o = extras;
		var now = new Date().getTime();
		if (now - t.lastRefreshUserNotes > Seed.gameData.RefreshUserNoteTimeoutMs) {
			t.lastRefreshUserNotes = now;
			data.n = {"n":1};
		}
		//MessageManager.populateWithMessageIds(data);
        /* TO COMPLETE
			if (achievementsToRead.length > 0)
            {
                _loc_3.a = achievementsToRead.toArray();
                achievementsToRead.removeAll();
            }
		*/
		if (t.boxesToOpen.length > 0) {
			data.b = t.boxesToOpen;
			t.boxesToOpen = [];
		}
/*  TO COMPLETE          if (favouriteUsers.length > 0)
            {
                _loc_3.k = favouriteUsers.toArray();
                favouriteUsers.removeAll();
            }
            if (_loc_2.settingsDirty == true)
            {
                _loc_3.s = _loc_2.userGameSettings.toDto();
                _loc_2.settingsDirty = false;
            }
*/
		var r = [];
		r.push("m." + (toNum(Seed.gameData.account.id / Seed.gameData.chatManager.max_users) + 1));
		if (Seed.gameData.alliance && Seed.gameData.alliance.id > 0) r.push("a." + Seed.gameData.alliance.id);
		data.chat = {"s":Seed.gameData.chatManager.sessionId, "i":Seed.gameData.chatManager.knownMessageId, "r":r};
		return data;
	},
	autoRefreshCmd : function (callback) {
		var t = AutoRefresh;
		if (t.timer) clearTimeout(t.timer);
		var data = t.createRequestData(t.extras);
		Seed.updating = true; /* Stops the calculation of resources */
		function deal_step (current_step) {
			switch ( current_step ) {
				case 1: // Old method = User.Refresh
					new MyAjaxRequest (C.attrs.defaultServer, C.attrs.defaultSegment, 'AutoRefresh', JSON.stringify(data), function (rslt) {
						if (rslt.ok && rslt.dat) {
							//logit('AutoRefresh (rev '+Seed.gameData.revision+', new rev '+rslt.dat.v+') rslt = '+inspectObj(rslt.dat,2,1));
							var is_updated = Seed.updateGameData (rslt.dat);
							t.extras = null;
						}
						deal_step(current_step + 1);
					}, true);
					break;
				case 2:
					var user_id = Seed.gameData.account.id;
					var now = new Date().getTime();
					if (t.lastRefreshUserRatings < now-300000 && t.getRatings) {
						new MyAjaxRequest (C.attrs.defaultServer, C.attrs.defaultSegment, 'Rating.GetUserRatings', user_id.toString(), function (rslt) {
							if (rslt.ok && rslt.dat) {
								//logit('AutoRefresh (rev '+Seed.gameData.revision+', new rev '+rslt.dat.v+') rslt = '+inspectObj(rslt.dat,2,1));
								Seed.gameData.rates = cloneProps(jsonDto.getUserRatings(rslt.dat));
								t.lastRefreshUserRatings = new Date().getTime();
								t.getRatings = false;
							}
							deal_step(current_step + 1);
						}, true);
					} else deal_step(current_step + 1);
					break;
				case 3:
					t.first = 1;
					t.timer = setTimeout(t.autoRefreshCmd,30000);
					Seed.updating = false; /* Restarts the calculation of resources */
					if (callback) callback({done:true});
					return;
					break;
			}
		}
		deal_step (t.first);
	}
}
/******************************** Auto-refresh package ***********************/

/******************************** Cyborgs package ****************************/
var Cyborgs = {
	create : function (t, user_id, notify){
		var user = Seed.gameData.userNotes[user_id], found = false;
		for (var f=0; f<Seed.friends.length && !found; f++) {
			if (Seed.friends[f] == user_id) found = true;
		}
		if (!found || !user) {
			var dial = new ModalDialog (t.container, 300, 150, '', false);
			dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
			dial.getContentDiv().innerHTML = 'Création Spettro impossible...\nDonnées joueur manquantes ou non présent dans liste d\'amis';
			setTimeout (function(){dial.destroy(); if (notify) notify (true);}, 2000);
		}
		verboseLog('======> Création cyborg pour '+user.fullname);
		var dial = new ModalDialog (t.container, 300, 165, '', false, null);
		dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
		dial.getContentDiv().innerHTML = 'Création d\'un Spettro pour '+user.fullname+'...';
		Cyborgs.createCmd (user_id, callback);
		function callback (res){
			if (res.done){
				actionLog('Spettro pour <B>'+user.fullname+'</B> créé');
				dial.getContentDiv().innerHTML = 'Spettro pour <B>'+user.fullname+'</B> créé';
				setTimeout (function(){dial.destroy(); if (notify) notify(true);}, 2000);
				return;
			} else {
				dial.getContentDiv().innerHTML = '<B>Ouuups, une erreur s\'est produite durant la création du Spettro.</B>\n'+(res.errmsg || '');
				dial.allowClose (true);
				if (notify) notify(false);
				return;
			}
		}
	},
	createCmd : function (user_id, callback){
		var t = Cyborgs;
		var data = AutoRefresh.createRequestData({"u":user_id});
		new MyAjaxRequest (C.attrs.defaultServer, C.attrs.defaultSegment, 'CreateCyborg', JSON.stringify(data), function (rslt) {
			if (rslt.ok && rslt.dat) {
				//logit('Cyborgs.createCmd rslt = '+inspectObj(rslt.dat,2,1));
				var is_updated = Seed.updateGameData (rslt.dat);
				if (!is_updated) {
					if (!Seed.gameData.troops) Seed.gameData.troops = {};
					if (!Seed.gameData.troops.countByType) Seed.gameData.troops.countByType = {};
					if (Seed.gameData.troops.countByType[cyborg_unit_type])
						 Seed.gameData.troops.countByType[cyborg_unit_type]++;
					else Seed.gameData.troops.countByType[cyborg_unit_type] = 1;
					Seed.gameData.cyborgs.created++;
					Seed.gameData.cyborgs.cyborg_user_ids.push(user_id);
                }
				if (callback) callback({done:true});
				return;
			} else {
				verboseLog('Cyborgs.createCmd a échoué avec l\' erreur : ' + rslt.errmsg);
				if (callback) callback({done:false, errmsg:rslt.errmsg});
				return;
			}
		}, true);
	},
	createForUserCmd : function (user_id, callback){
		var t = Cyborgs;
		var data = AutoRefresh.createRequestData({"u":user_id});
		new MyAjaxRequest (C.attrs.defaultServer, C.attrs.defaultSegment, 'CreateCyborgForUser', JSON.stringify(data), function (rslt) {
			if (rslt.ok && rslt.dat) {
				//logit('Cyborgs.createForUserCmd rslt = '+inspectObj(rslt.dat,2,1));
				var is_updated = Seed.updateGameData (rslt.dat);
				if (!is_updated) Seed.gameData.cyborgs.created_for_user_ids.push(user_id);
				if (callback) callback({done:true});
				return;
			} else {
				verboseLog('Cyborgs.createForUserCmd a échoué avec l\' erreur : ' + rslt.errmsg);
				if (callback) callback({done:false, errmsg:rslt.errmsg});
				return;
			}
		}, true);
	}
}
/******************************** Cyborgs package ****************************/

/******************************** Data package *******************************/
var Data = {
	log			: [ [], [] ],
	defaults	: {},
	saveTimer	: 0,

	init : function (obj) {
		try {
			/* Saves defaults properties */
			Data.defaults.mergeWith( obj || {} );
			for ( var item_name in obj ) {
				/* Checks if the object is already defined in the Data Object */
				if ( typeof (Data[item_name]) == 'undefined' ) {
					/* Assign default object properties, if defined, otherwise an empty object */
					Data[item_name] = typeof(obj[item_name]) != 'undefined' ? cloneProps(obj[item_name]) : {};
				}
				/* Load the data stored, of the current item from localStorage */
				var stored_object = Data.getObject( item_name );
				/* Clean removed values from stored object ( max depth 2 ) */
				if (stored_object != null && typeof (stored_object) == 'object') {
					verboseLog ('Nettoyage des variables supprimées de : [ ' + name + ' ]');
					stored_object.cleanRemoved (Data[item_name], 1);
				}
				/* Check if the default object is really an object */
				if (Data[item_name] !== null && typeof (Data[item_name]) == 'object' ) {
					/* Assign the properties of stored objeto into the default object, overwriting the values */
					Data[item_name].mergeWith(stored_object);
				} else {
					Data[item_name] = stored_object;
				}
			}
			if (!Data.saveTimer) Data.saveTimer = setInterval(Data.save, 600000);
		} catch (e) {
			alert ('Ce navigateur ne supporte pas le LocalStorage\n\n'+e);
			return false;
		}
	},
	
	clearStorage : function (keep_map) {
		localStorage.clear();
		for ( var item_name in Data.defaults ) {
			Data[item_name] = cloneProps(Data.defaults[item_name]);
		}
		consoleLog('localStorage supprimé !');
	},
	getObject : function (key) {
		var item = localStorage.getItem( ['stormfall', USER_ID, key].join('_') );
		/*logit('load setting ['+SERVER_ID+', '+USER_ID+', '+key+' = '+item);*/
		return ( item || '' ).charAt(0) === '{' ? JSON.parse( item || '{}' ) : eval( item );
	},
	setObject : function (key, value) {
		if (key == 'log') return;
		try {
			/*logit('save setting ['+SERVER_ID+', '+USER_ID+', '+key+' = '+JSON.stringify( value ) );*/
			localStorage.setItem( ['stormfall', USER_ID, key].join('_'), JSON.stringify( value ) );
		} catch(e){
			if ( e === QUOTA_EXCEEDED_ERR || (e.code === 22 && e.name === 'QUOTA_EXCEEDED_ERR') )	{
				verboseLog('Erreur de sauvegarde dans le localstorage , '+name+'='+value+', error='+inspectObj(e,8,1));
				logit ('LocalStorage : Quota dépassé ! Merci de vider le cache et les données persistantes du navigateur');
			}
		}
	},
	onUnload : function () {
		if (Data.saveTimer) clearInterval(Data.saveTimer);
		Data.save();
	},
	save : function () {
		verboseLog('Sauvegarde des données dans le localStorage');
		var keys = getKeys (Data.defaults);
		for (var i=0; i < keys.length; i++) {
			var item_name = keys[i];
			Data.setObject ( item_name, Data[item_name] );
		}
	}
};
/******************************** Data package *******************************/

/******************************** Facebook package ***************************/
var Facebook = {
	Friends : [],
	init : function (callback) {
		var t = Facebook;
		t.signInFB (function (rslt) {
			if (rslt.ok)
				 verboseLog('Requête des données Facebook envoyée avec succès');
			else verboseLog('Facebook.signInFB a retourné l\'erreur ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback(rslt);
		});
	},
	signInFB : function (callback) {
		var params = {};
		params['access_token'] = C.attrs.key;
		params['fields'] = 'id,name,first_name,middle_name,last_name,username,gender,locale,link,timezone,currency,third_party_id,apprequests,payment_pricepoints,permissions,startnow_hashed_id';
		new MyAjaxRequest ("https://graph.facebook.com/"+USER_ID, '', '', params, function (rslt) {
			if (rslt.ok) {
				Facebook.SND = rslt.dat;
				if (is_null(C.attrs.hashId) && !is_null(Facebook.SND.startnow_hashed_id)) C.attrs.hashId = Facebook.SND.startnow_hashed_id;
			}
			if ( callback )	callback (rslt);
			return;
		}, false, false, true);
	},
	initFriends : function (callback) {
		var t = Facebook;
		t.getFBfriends (function (rslt) {
			if (rslt.ok)
				 verboseLog('Demande de la liste des amis Facebook envoyée avec succès');
			else verboseLog('Facebook.getFBfriends a retourné l\'erreur ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback(rslt);
		});
	},
	getFBfriends : function (callback) {
		var params = {};
		params['access_token'] = C.attrs.key;
		new MyAjaxRequest ("https://graph.facebook.com/"+C.attrs.hashId+"/friends", '', '', params, function (rslt) {
			if (rslt.ok) {
				var list = rslt.dat.data;
				for (var x in list) {
					if (list[x].user_id || list[x].id) {
						Facebook.Friends.push({ "id":(list[x].user_id || list[x].id), "name":list[x].name });
					}
				}
			}
			if ( callback )	callback (rslt);
			return;
		}, false, false, true);
	}
}
/******************************** Facebook package ***************************/

/******************************** jsonDto package ***************************/
var jsonDto = {
	step : '',
	getAllianceDiplomacy : function (obj) {
		jsonDto.step = 'getAllianceDiplomacy';
		if (is_null(obj)) return null;
		var states = [];
		for (var i=0; i<obj.length; i++)
			states.push({alliance_id:obj[i].i,
						 type:obj[i].s,
						 desc:obj[i].d});
		return (states);
	},
	getAllianceMembers : function (obj) {
		jsonDto.step = 'getAllianceMembers';
		if (is_null(obj)) return null;
		var members = {};
		for (var i=0; i<obj.length; i++) {
			members[obj[i].u] = {user_id:obj[i].u, rank_id:obj[i].r, last_visit:obj[i].l, state_id:(obj[i].s ? obj[i].s.s : ''), state_date:(obj[i].s ? obj[i].s.d : ''), state_comment:(obj[i].s ? obj[i].s.c : '')};
		}
		return members;
	},
	getAllianceMembership : function (obj) {
		jsonDto.step = 'getAllianceMembership';
		if (is_null(obj)) return null;
		return ({members_count:obj.m.length, members_limit:obj.l, required_level:obj.r, members:jsonDto.getAllianceMembers(obj.m)});
	},
	getAllianceNotes : function (obj) {
		jsonDto.step = 'getAllianceNotes';
		if (is_null(obj)) return null;
		var notes = {};
		for (var i=0; i<obj.length; i++) {
			notes[obj[i].i] = {segment_id:obj[i].g, revision:obj[i].v, owner_user_id:obj[i].o, name:obj[i].a, members:obj[i].m};
		}
		return notes;
	},
	getArtifactData : function (obj) {
		jsonDto.step = 'getArtifactData';
		if (is_null(obj)) return null;
		var issued = [];
		for (var i=0; i<obj.o.length; i++)
			issued.push({date:obj.o[i].d, type:obj.o[i].i, losses_points:obj.o[i].p, source:obj.o[i].s});
		return({id:obj.n,
				storage_slot_available:obj.c,
				storage_slot_bought:obj.b,
				storage_slot_given_for_friends:obj.f,
				active_slot_bought:obj.x,
				active_slot_opened_for_friends:obj.z,
				last_time_got:obj.t,
				earned_losses_points:obj.e,
				artifact_layout:obj.l,
				artifacts:obj.a,
				issued_artifacts:issued
			});
	},
	getBattleParameters : function (obj) {
		jsonDto.step = 'getBattleParameters';
		if (is_null(obj)) return null;
		var ret = {};
		var defense = jsonDto.getDefenseItem(obj.d);
		return ({attack:obj.a, defense:defense});
	},
	getBuildings : function (obj) {
		jsonDto.step = 'getBuildings';
		if (is_null(obj)) return null;
		var ret = [];
		for (var i=0; i<obj.length; i++) {
			ret.push({id:obj[i].i, type:obj[i].t, level:(obj[i].c ? obj[i].c.l : 0),
					  construction_start:(obj[i].c ? (obj[i].c.s || '') : ''),
					  construction_end:(obj[i].c ? (obj[i].c.f || '') : '')});
		}
		return ret;
	},
	getConstructionData : function (obj) {
		jsonDto.step = 'getConstructionData';
		if (is_null(obj)) return null;
		return ({building_acceleration	: obj.b,
				 research_acceleration	: obj.r,
				 number_of_allies		: obj.a,
				 caravan_quantity		: obj.q,
				 caravan_capacity_prct	: obj.p,
				 caravan_capacity		: obj.c,
				 caravan_speed_prct		: obj.x,
				 caravan_speed			: obj.s,
				 troops_acceleration	: obj.t,
				 resource_mining_boosts : jsonDto.getResourceMiningBoost(obj.m),
				 build_trooper_faster	: obj.f,
				 build_dog_faster		: obj.d,
				 build_recon_faster		: obj.e	});
	},
	getDefenseItem : function (obj) {
		jsonDto.step = 'getDefenseItem';
		if (is_null(obj)) return null;
		var ret = [];
		for (var i=0; i<obj.length; i++) {
			ret.push({troop_group_id:obj[i].g, defense:obj[i].d});
		}
		return ret;
	},
	getDrawingArchive : function (obj) {
		jsonDto.step = 'getDrawingArchive';
		if (is_null(obj) || is_null(obj.d)) return null;
		var draws = [];
		for (var i=0; i<obj.d.length; i++) {
			var draw = obj.d[i];
			draws.push({id:draw.i, type:draw.t, parts:(draw.d ? draw.d.p : 0)});
		}
		return draws;
	},
	getLocationMineInfo : function (obj) {
		jsonDto.step = 'getLocationMineInfo';
		if (is_null(obj)) return null;
		return({type:obj.t,
				resource_total:obj.r,
				found:obj.f,
				time_to_live:obj.l,
				collected_resource_limit:obj.b,
				collect_time_delay_hours:obj.d,
				max_artifact_issue_cost:obj.m
			});
	},
	getLocationNotes : function (obj) {
		jsonDto.step = 'getLocationNotes';
		if (is_null(obj)) return null;
		var notes = {};
		for (var i=0; i<obj.length; i++) {
			notes[obj[i].i] = {segment_id:obj[i].g, revision:obj[i].v, x:(obj[i].m ? obj[i].m.x : ''), y:(obj[i].m ? obj[i].m.y : ''), name:obj[i].a,
								occupant_id:obj[i].o, occupant_alliance_id:obj[i].c, occupied_since:obj[i].d, 
								mine_info:jsonDto.getLocationMineInfo(obj[i].n), tower_info:jsonDto.getLocationTowerInfo(obj[i].t)};
		}
		return notes;
	},
	getLocationTowerInfo : function (obj) {
		jsonDto.step = 'getLocationTowerInfo';
		if (is_null(obj)) return null;
		return({level:obj.l, plutonium:obj.p, consumption_start:obj.c});
	},
	getResources : function (obj) {
		jsonDto.step = 'getResources';
		if (is_null(obj)) return null;
		return ({gold:obj.u, food:obj.m, iron:obj.t, saphir:obj.g, skull:obj.c});
	},
	getResourceFlow : function (obj) {
		jsonDto.step = 'getResourceFlow';
		if (is_null(obj)) return null;
		var ret = [];
		for (var i=0; i<obj.length; i++) {
			var flow = [];
			for (var x=0; x<obj[i].x.length; x++) flow.push({resources:obj[i].x[x].r, date:obj[i].x[x].d});
			ret.push({user_id:obj[i].i, caravan_sent_today:obj[i].c, daily_flow:flow});
		}
		return ret;
	},
	getResourceMiningBoost : function (obj) {
		jsonDto.step = 'getResourceMiningBoost';
		if (is_null(obj)) return null;
		var ret = [];
		for (var i=0; i<obj.length; i++) {
			ret.push({id:obj[i].t, percent:obj[i].p, until:obj[i].d});
		}
		return ret;
	},
	getSector : function (obj) {
		jsonDto.step = 'getSector';
		if (is_null(obj)) return null;
		return ({name	  : obj.i,
				 width	  : (obj.s ? obj.s.x : ''),
				 height	  : (obj.s ? obj.s.y : ''),
				 buildings: (obj.s ? jsonDto.getBuildings(obj.s.o) : '')});
	},
	getTechnologies : function (obj) {
		jsonDto.step = 'getTechnologies';
		if (is_null(obj) || is_null(obj.tl)) return null;
		var ret = [];
		for (var i=0; i<obj.tl.length; i++) {
			var tech = obj.tl[i];
			ret.push({id:tech.i, type:tech.t, level:(tech.c ? tech.c.l : 0),
					  construction_start:(tech.c ? (tech.c.s || '') : ''),
					  construction_end:(tech.c ? (tech.c.f || '') : '')});
		}
		return ret;
	},
	getTroops : function (obj) {
		jsonDto.step = 'getTroops';
		if (is_null(obj)) return null;
		return ({countByType:(obj.r ? obj.r.t : null), factory:jsonDto.getTroopsFactory(obj.f)});
	},
	getTroopsFactory : function (obj) {
		jsonDto.step = 'getTroopsFactory';
		if (is_null(obj)) return null;
		var orders = [];
		if (obj.o) {
			for (var i=0; i<obj.o.length; i++)
				orders.push({id:obj.o[i].i,
							 type:obj.o[i].k,
							 total:obj.o[i].t,
							 pending:obj.o[i].p,
							 end_at:obj.o[i].f,
							 construction_info:(obj.o[i].c ? {level:obj.o[i].c.l, start:obj.o[i].c.s, end:obj.o[i].c.f} : '')});
		}
		return ({next_order_id:obj.i, orders:orders});
	},
	getUnits : function (obj) {
		jsonDto.step = 'getUnits';
		if (is_null(obj)) return null;
		var units = [];
		for (var i=0; i<obj.length; i++) {
			units.push({id						: obj[i].i,
						owner_id				: obj[i].o,
						target_id				: obj[i].t,
						target_type				: obj[i].u,
						state_in_target_sector	: obj[i].ss,
						state_moving_forward	:(obj[i].sf ? {departure:obj[i].sf.d, arrival:obj[i].sf.a, canceling:obj[i].sf.c} : ''),
						state_moving_back	 	:(obj[i].sb ? {departure:obj[i].sb.d, arrival:obj[i].sb.a, canceling:obj[i].sb.c} : ''),
						trading_offer_payload	:(obj[i].po ? {owner_id:obj[i].po.i, offer_id:obj[i].po.o} : ''),
						trading_payload			:(obj[i].pd ? {number_caravans:obj[i].pd.c, caravan_speed:obj[i].pd.s,
															resources:jsonDto.getResources(obj[i].pd.r),
															drawing_part:(obj[i].pd.d ? {type:obj[i].pd.d.t, part:obj[i].pd.d.p} : '') } : ''),
						troops_payload			:(obj[i].pt ? {order:obj[i].pt.o, troops:(obj[i].pt.t ? obj[i].pt.t.t : ''),
															resources:jsonDto.getResources(obj[i].pt.r)} : '')
						});
		}
		return units;
	},
	getUserAccount : function (obj) {
		jsonDto.step = 'getUserAccount';
		if (is_null(obj)) return null;
		return ({id:Seed.player.u.i, resources:jsonDto.getResources(obj.r), level:obj.l, experience:obj.x});
	},
	getUserAllianceData : function (obj) {
		jsonDto.step = 'getUserAllianceData';
		if (is_null(obj)) return null;
		return({id:(obj.i || -1), rank_id:(obj.r || -1)});
	},
	getUserClanData : function (obj) {
		jsonDto.step = 'getUserClanData';
		if (is_null(obj) || is_null(obj.m)) return null;
		var members = {};
		for (var m=0; m<obj.m.length; m++)
			members[obj.m[m].u] = {state:obj.m[m].s};
		//_loc_2.invitations = ClanInvitation.fromDtos(param1.i);
		return({members:members});
	},
	getUserCyborgData : function (obj) {
		jsonDto.step = 'getUserCyborgData';
		if (is_null(obj)) return null;
		return({cyborg_user_ids:obj.u, created_for_user_ids:obj.o, created:obj.c, created_by_others:obj.f});
	},
	getUserGameData : function (obj) {
		jsonDto.step = 'getUserGameData';
		/* See Action\model\data\UserGameData.as */
		var account = jsonDto.getUserAccount(obj.a);
		account.mergeWith(obj.map);
		var city = jsonDto.getSector(obj.sd);
		var troops = jsonDto.getTroops(obj.td);
		var construction_data = jsonDto.getConstructionData(obj.ad);
		var world_data = jsonDto.getWorldData(obj.wd);
		var skill_data = jsonDto.getUserSkillData(obj.sa);
		var alliance = jsonDto.getUserAllianceData(obj.aa);
		var clan_data = jsonDto.getUserClanData(obj.ld);
		var known_data = jsonDto.getUserKnownData(obj.ku);
		var raid_data = jsonDto.getUserRaidData(obj.ra);
		var cyborgs = jsonDto.getUserCyborgData(obj.xd);
		var treasures = jsonDto.getUserTreasureData(obj.bd);
		var drawings = jsonDto.getDrawingArchive(obj.dd);
		var technologies = jsonDto.getTechnologies(obj.hd);
		//var artifact_data = jsonDto.getArtifactData(obj.ad2);
		jsonDto.step = '';
		return({account:account, city:city, troops:troops, construction_data:construction_data, world_data:world_data,
				skill_data:skill_data, alliance:alliance, clan_data:clan_data, known_data:known_data, raid_data:raid_data,
				cyborgs:cyborgs, treasures:treasures, drawings:drawings, technologies:technologies, revision:obj.r});
		//, artifact_data:artifact_data});
	},
	getUserKnownData : function (obj) {
		jsonDto.step = 'getUserKnownData';
		if (is_null(obj)) return null;
		var favorites = [];
		if (!is_null(obj.k)) {
			for (var u=0; u<obj.k.length; u++) favorites.push ({user_id:obj.k[u].u, type:obj.k[u].t});
		}
		return({friends:obj.u, mates:obj.f, enemy:obj.e, alliance_enemy:obj.b,
				favorites:favorites});
	},
	getUserNotes : function (obj) {
		jsonDto.step = 'getUserNotes';
		if (is_null(obj)) return null;
        function fixPhotoUrl (url) {
			if (is_null(url)) return "";
			if (url.indexOf("/picture&type=large") != -1) url = url.replace("/picture&type", "/picture?type");
			if (url.indexOf("question") != -1) 			  url = getContentURL("ui/question_a.gif");
			else if (url.indexOf("camera") != -1) 		  url = getContentURL("ui/camera_a.gif");
			else if (url.indexOf("sntpi") != -1)		  url = getContentURL("ui/question_a.gif");
			else if (url == "[lapidus]")				  url = getContentURL("ui/mery.jpg");
			return url;
		}
		var notes = {};
		for (var i=0; i<obj.length; i++) {
			notes[obj[i].i] = {segment_id:obj[i].g, social_id:obj[i].s, fullname:obj[i].n, avatar:fixPhotoUrl(obj[i].p), 
						 registration:obj[i].r, level:obj[i].l, city:obj[i].a, x:(obj[i].m ? obj[i].m.x : ''), y:(obj[i].m ? obj[i].m.y : ''), 
						 caravan_speed:obj[i].c, occupant_user_id:obj[i].o, alliance_id:obj[i].x, alliance_rank_id:obj[i].y};
		}
		return notes;
	},
	getUserRaidData : function (obj) {
		jsonDto.step = 'getUserRaidData';
		if (is_null(obj)) return null;
		var locations = {};
		if (!is_null(obj.l)) {
			for (var l=0; l<obj.l.length; l++)
				locations[obj.l[l].i] = {type:obj.l[l].t, added:obj.l[l].a, closed:obj.l[l].f, level:obj.l[l].l,
										 strength:obj.l[l].s, x:(obj.l[l].m ? obj.l[l].m.x : ''), y:(obj.l[l].m ? obj.l[l].m.y : '')};
		}
		return({next_id:obj.i, locations:locations});
	},
	getUserRatings : function (obj) {
		jsonDto.step = 'getUserRatings';
		if (is_null(obj)) return null;
		return ({attacker:toNum((obj.a ? obj.a.n : 0),0), defender:toNum((obj.d ? obj.d.n : 0),0), robber:toNum((obj.r ? obj.r.n : 0),0),
				 occupant:toNum((obj.o ? obj.o.n : 0),0), raids:toNum((obj.b ? obj.b.n : 0),0)});
	},
	getUserSkillData : function (obj) {
		jsonDto.step = 'getUserSkillData';
		if (is_null(obj)) return null;
		var skills = [];
		for (var i=0; i<obj.s.length; i++)
			skills.push({type:obj.s[i].t, level:(!is_null(obj.s[i].c) ? obj.s[i].c.l : 0),
					  construction_start:(!is_null(obj.s[i].c) ? (obj.s[i].c.s || '') : ''),
					  construction_end:(!is_null(obj.s[i].c) ? (obj.s[i].c.f || '') : '')});
		return ({skills:skills, skill_points:obj.p, skill_discards:obj.d});
	},
	getUserTreasureData : function (obj) {
		jsonDto.step = 'getUserTreasureData';
		if (is_null(obj)) return null;
		return({user_boxes_qty:jsonDto.getResources(obj.u), friends_boxes_qty:jsonDto.getResources(obj.f), boxes_values:jsonDto.getResources(obj.v), boxes_by_users:obj.p});
	},
	getWorldData : function (obj) {
		jsonDto.step = 'getWorldData';
		if (is_null(obj)) return null;
		return({raids:obj.r, next_raid:obj.d, 
				drawing_caravans_sent_today:obj.x,
				resource_caravans_sent_today:obj.y,
				units:jsonDto.getUnits(obj.u),
				resources_flow:jsonDto.getResourceFlow(obj.f)
				});
	}
//            _loc_2.messageData = UserMessageData.fromDto(param1.md); // messagerie

/*
            _loc_2.tradingCenter = TradingCenter.fromDto(param1.rd);
            _loc_2.userGameSettings = UserGameSettings.fromDto(param1.s);
            _loc_2.statsData = param1.pd == null ? (null) : (UserStatsData.fromDto(param1.pd));
            _loc_2.sectorSkinsData = param1.sk == null ? (null) : (UserSectorSkinData.fromDto(param1.sk));
            _loc_2.questData = UserQuestData.fromDto(param1.qd);
            _loc_2.blackMarketData = param1.bm == null ? (new UserBlackMarketData()) : (UserBlackMarketData.fromDto(param1.bm));
            _loc_2.resourcesConversionData = param1.bc == null ? (new UserResourcesConversionData()) : (UserResourcesConversionData.fromDto(param1.bc));
            _loc_2.constructionData.initAcceleration(_loc_2);
*/
}
/******************************** jsonDto package ***************************/

/******************************** Manifest package ***************************/
var Manifest = {
	data : {},
	init : function (callback) {
		var t = Manifest;
		t.getStaticData (function (rslt) {
			if (rslt.ok)
				 verboseLog('Demande des données statiques envoyée avec succès');
			else verboseLog('Manifest.getStaticData a retourné l\'erreur ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback(rslt);
		});
	},
	getStaticData : function (callback) {
		new MyAjaxRequest (Seed.defaultServer, Seed.defaultSegment, 'Client.GetStaticData', JSON.stringify(Seed.player.s), function (rslt) {
			if (rslt.ok) {
				// logit('StaticData = '+JSON.stringify(rslt.dat));
				Manifest.data = rslt.dat;
				try {
					Manifest.updateManifest();
				} catch (e) {
					rslt.ok = false;
					rslt.errmsg = 'Manifest.updateManifest a retourné l\'erreur ' + e.toString();
				}
				if (rslt.ok) {
					try {
						Seed.updateResources();
					} catch (e) {
						rslt.ok = false;
						rslt.errmsg = 'Seed.updateResources a retourné l\'erreur ' + e.toString();
					}
				}
			}
			if ( callback )	callback (rslt);
			return;
		}, false, false, false, true);
	},
	updateManifest : function () {
		var data, i, j;
		data = Manifest.data.sot;
		for (var d=0; d<data.length; d++) {
			/* Requirements infos */
			var requirements = {};
			if (data[d].si) {
				requirements.limit = data[d].si.l;
				requirements.requires_max_lvl = data[d].si.m;
				requirements.levels = [];
				for (var i=0; i<data[d].si.lc.length; i++) {
					var dat = {	construction_time : data[d].si.lc[i].c,
								required_user_lvl : (data[d].si.lc[i].l || 0),
								price		: jsonDto.getResources(data[d].si.lc[i].p),
								gold_price	: jsonDto.getResources(data[d].si.lc[i].g)
							};
					requirements.levels.push(dat);
				}
				requirements.objects = [];
				for (var i=0; i<data[d].si.ro.length; i++) {
					var dat = {	type_id : data[d].si.ro[i].t,
								level	: data[d].si.ro[i].l };
					requirements.objects.push(dat);
				}
			}
			var stats = {};
			/* Stats for buildings */
			if (data[d].bi) {
				stats.type		= 'building';
				stats.group_id	= data[d].bi.g;
				stats.height	= data[d].bi.h;
				stats.defensive	= (data[d].bi.k || -1);
				stats.can_be_broken	= data[d].bi.b;
				stats.levels = [];
				for (var i=0; i<data[d].bi.lc.length; i++) {
					var lvl = data[d].bi.lc[i];
					var dat = {	resources				: jsonDto.getResources(lvl.r),
								storage_limit			: jsonDto.getResources(lvl.s),
								mining_acceleration		: jsonDto.getResources(lvl.a),
								troops_acceleration		: (lvl.b || {} ),
								building_acceleration	: (lvl.c || 0),
								research_acceleration	: (lvl.d || 0),
								number_of_allies		: (lvl.e || 0),
								caravan_quantity		: (lvl.f || 0),
								caravan_capacity_prct	: (lvl.g || 0),
								caravan_speed			: (lvl.h || 0),
								defense_bonus_points	: (lvl.x || 0),
								defense_intelligence	: (lvl.y || 0),
								cyborg_per_day			: (lvl.z || 0),
								troops_type_id			: (lvl.w || 0),
								repair_seconds			: (lvl.t || 0),
								mine_radar_radius		: (lvl.rr || 0)
							};
					stats.levels.push(dat);
				}
				Seed.buildings_id.push(data[d].i);
			}
			/* Stats for troops */
			if (data[d].ti) {
				stats.type		= 'troop';
				stats.group_id	= data[d].ti.g;
				stats.kind_id	= data[d].ti.k;
				stats.levels = [];
				for (var i=0; i<data[d].ti.lc.length; i++) {
					var lvl = data[d].ti.lc[i];
					var dat = {	resources			: jsonDto.getResources(lvl.r),
								battle_parameters	: jsonDto.getBattleParameters(lvl.b),
								speed				: lvl.s,
								resource_capacity	: lvl.c,
								antigen				: lvl.a
							};
					stats.levels.push(dat);
				}
				Seed.all_units_id.push(data[d].i);
			}
			/* Stats for technology */
			if (data[d].ci) {
				stats.type	= 'research';
				stats.bonus	= (data[d].ci.de ? data[d].ci.de.c : '');
				stats.levels = [];
				for (var i=0; i<data[d].ci.lc.length; i++) {
					var lvl = data[d].ci.lc[i];
					stats.levels.push({ troop_bonus : lvl.b});
				}
			}
			/* Stats for artefacts */
			if (data[d].ai) {
				stats.type					= 'items';
				stats.kind_id				= data[d].ai.k;
				stats.level					= data[d].ai.l;
				stats.rareness				= data[d].ai.r;
				stats.active_days			= data[d].ai.d;
				stats.issue_cost			= data[d].ai.c;
				stats.affected_types		= data[d].ai.at;
				stats.attack_bonus			= (data[d].ai.ab || 0);
				stats.defense_bonus			= (data[d].ai.db || 0);
				stats.intelligence_bonus	= (data[d].ai.rb || 0);
				stats.movement_speed		= (data[d].ai.mv || 0);
				stats.construction_speed	= (data[d].ai.cb || 0);
				stats.price_bonus			= (data[d].ai.pp || 0);
				stats.carrying_capacity		= (data[d].ai.cc || 0);
				stats.research_speed		= (data[d].ai.tb || 0);
				stats.sector_defense		= (data[d].ai.sb || 0);
				stats.sector_intelligence	= (data[d].ai.ib || 0);
				stats.mining_bonus			= jsonDto.getResources(data[d].ai.xb);
				stats.consumption_bonus		= (data[d].ai.yb || 0);
			}
			var rec = { //id			 : data[d].i,
						name		 : data[d].n.c,
						img			 : (data[d].gi.lu ? data[d].gi.lu.c : data[d].gi.u),
						requirements : requirements,
						stats		 : stats	};
			Seed.reqs[data[d].i] = rec;
			//if(troop) 
				Seed.reqs[data[d].i].img = Seed.reqs[data[d].i].img.replace('.swf','_ps.jpg');
		}
		for (var trp in Seed.reqs) {
			if (Seed.reqs[trp].stats && Seed.reqs[trp].stats.type == 'troop'){
				var this_trp = Seed.reqs[trp];
				var this_grp = toNum(this_trp.stats.group_id);
				/* 1-16 : normal | 17-32 : impérial | 33 : Spettro | 34-36 : immortels (grp 8) | 37-40 : nains | 41-44 : nains impériaux */
				var offset = 0;
				if (this_grp%2!=0){
					if (trp<32) offset = 16;
					else if (trp>40 && trp<45) offset = 4;
				} else if (trp==33) offset = -9;
				var sorter = ((this_grp - (this_grp%2==0?0:1))* 100 + (toNum(trp) - offset))*10 + this_grp;
				if (trp != '53' && trp != '54' && trp != '55' && trp != '56') Seed.units_id.push({id:trp, sorter:sorter});
			}
		}
		Seed.units_id.sort(function(a,b){return a.sorter-b.sorter});
var lt = '[', sep = '';
for (var x in Seed.reqs) {
	if (Seed.reqs[x].stats.type	== 'troop') {
		lt += sep+'{'+x+':{n:'+Seed.reqs[x].name+', kind:'+Seed.reqs[x].stats.kind_id+'}}';
		sep = ',';
	}
}
lt += ']';
		// logit('Seed.reqs = '+lt);
		// logit('Seed.reqs = '+JSON.stringify(Seed.reqs));

		/* User Level Data */
		data = Manifest.data.ld;
		if (data) Seed.statics.user_levels = cloneProps(data.p);

		/* Skill Data */
		data = Manifest.data.sa;
		if (data) {
			for (var s=0; s<data.s.length; s++) {
				var skill = data.s[s];
				var requirements = [];
				if (skill.r) {
					for (var i=0; i<skill.r.length; i++) {
						var dat = {	skill_type : skill.r[i].i, required_lvl : skill.r[i].l };
						requirements.push(dat);
					}
				}
				levels = [];
				if (skill.l) {
					for (var i=0; i<skill.l.length; i++) {
						var dat = {	effect_value : skill.l[i].v, improvement_seconds : skill.l[i].t };
						levels.push(dat);
					}
				}
				var rec = { //id			 : data[d].i,
							name		   : (skill.n ? skill.n.c : ''),
							img			   : skill.u,
							effect_type	   : skill.e,
							requirements   : requirements,
							levels		   : levels,
							affected_types : skill.t};
				Seed.skills.types[skill.i] = rec;
			}
			var prices = [];
			for (var p=0; p<data.d.length; p++)
				prices.push(jsonDto.getResources(data.d[p]));
			Seed.skills.discard_prices = cloneProps(prices);
			Seed.skills.types_id = { 'NONE':0, 'TROOPS_MOVEMENT_SPEED':1, 'TROOPS_TRAINING_SPEED':2, 'TROOPS_RESOURCES_CONSUMPTION':3, 'TECHNOLOGY_RESEARCH_SPEED':4, 'CYBORGS_COUNT':5, 'BUILDINGS_REPAIR_SPEED':6, 'OCCUPIED_LOCATIONS_LIMIT':7, 'MUTATION_COST':8, 'BATTLE_EXPERIENCE':9};
			Seed.updateSkills();
		}
//		logit('Seed.skills = '+JSON.stringify(Seed.skills));
//		logit('skill_data = '+JSON.stringify(Seed.gameData.skill_data));

		/* Known User Data */
		data = Manifest.data.ku;
		if (data) {
			Seed.statics.user_data = {
				mates_limit					: data.f,
				enemies_limit				: data.e,
				alliance_enemies_limit		: data.b,
				favourite_users_limit		: data.x,
				raid_limit					: data.r,
				raid_update_hours			: data.ru,
				caravans_user_daily_limit	: data.rt,
				caravans_total_daily_limit	: data.rc
			};
		}
		/* Additionnal storage */
		Seed.statics.additionnal_storage = (Manifest.data.al || 0);
		/* Static Cyborg data */
		data = Manifest.data.scd;
		if (data) Seed.statics.cyborgs = {daily_limit:data.c, daily_limit_for_others:data.f, own_limit:data.l};
		/* Static Drawing data */
		data = Manifest.data.sdd;
		if (data) Seed.statics.drawings = {clicks_per_part:data.c};
		/* Static Tower data */
		data = Manifest.data.td;
		if (data) {
			levels = [];
			if (data.u) {
				for (var i=0; i<data.u.length; i++)
					levels.push(jsonDto.getResources(data.u[i]));
			}
			Seed.statics.tower = {consumption_perh:data.p, maximum_storage:data.m, plutonium_per_level:data.l, maximum_level:data.t,
								  limit_by_level:data.a, upgrade_price:levels, transfer_distance_step:data.s, transfer_penalty_for_steps:data.w,
								  transfer_max_distance:data.d, transfer_penalty_per_level:data.z};
		}
		/* Static Mine data */
		data = Manifest.data.smd;
		if (data) {
			Seed.statics.mine_types = {};
			for (var t=0; t<data.t.length; t++) {
				var type = data.t[t];
				var rec = { //id		  : type.i,
							name		  : (type.n ? type.n.c : ''),
							resource_type : type.r,
							img			  : type.s};
				Seed.statics.mine_types[type.i] = rec;
			}
		}
		/* Static Raid data */
		data = Manifest.data.rd;
		if (data) {
			Seed.statics.raid_types = {};
			for (var t=0; t<data.t.length; t++) {
				var type = data.t[t];
				var rec = { //id	: type.i,
							name	: (type.n ? type.n.c : ''),
							kind_id : type.k};
				Seed.statics.raid_types[type.i] = rec;
			}
		}
	}
};
/******************************** Manifest package ***************************/

/*
                    new StaticDataGetCmd(dto.s).ifResult(function (param1) : void
                {
                    var _loc_4:* = param1.cc;
                    var _loc_5:* = param1.cs;
                    StaticDataManager.initialize(_loc_2, _loc_3, _loc_4, _loc_5);
                    StaticDataManager.freeTroopsMaxOrderSize = param1.ft == null ? (100) : (param1.ft);
                    StaticDataManager.troopsPerSceneObject = param1.tps;
                    StaticDataManager.resourceMiningBoostTypes = ResourceMiningBoostType.fromDtos(param1.rmt);
                    StaticDataManager.resourcesKits = ResourcesKit.fromDtos(param1.rc);
                    StaticDataManager.resourcesKitsLimits = ResourcesKitLimit.fromDtos(param1.rl);
                    StaticDataManager.troopsKits = TroopsKit.fromDtos(param1.tc);
                    StaticDataManager.instantTroopsOrderPrice = Resources.fromDto(param1.io);
                    StaticDataManager.instantUnitReturnPricePerHour = Resources.fromDto(param1.ir);
                    StaticDataManager.instantObjectMinPrice = param1.mp;
                    StaticDataManager.instantObjectMaxPrice = param1.xp;
                    StaticDataManager.instantTroopsOrderPricePerHour = param1.it;
                    StaticDataManager.instantTroopsOrderMinPrice = param1.zp;
                    StaticDataManager.bankAndWarehousePriceAndTimeCoef = param1.bw;
                    StaticDataManager.skilledUserDays = param1.sud;
                    StaticDataManager.skilledUserLevel = param1.sul;
                    StaticDataManager.noviceUserLevel = param1.nul;
                    StaticDataManager.achievementData = param1.sad == null ? (null) : (StaticAchievementData.fromDto(param1.sad));
                    StaticDataManager.specialOfferData = param1.sod == null ? (null) : (StaticSpecialOfferData.fromDto(param1.sod));
                    StaticDataManager.userMessagesPerDayLimit = param1.uml == null ? (250) : (param1.uml);
                    StaticDataManager.maximumBattleReportLossesThreshold = param1.bt == null ? (5) : (param1.bt);
                    StaticDataManager.artifactData = param1.ad == null ? (new StaticArtifactData()) : (StaticArtifactData.fromDto(param1.ad));
                    StaticDataManager.bonusData = param1.bd == null ? (new StaticBonusData()) : (StaticBonusData.fromDto(param1.bd));
                    StaticDataManager.blackMarketData = param1.bk == null ? (new StaticBlackMarketData()) : (StaticBlackMarketData.fromDto(param1.bk));
                    StaticDataManager.resurrectionData = param1.sx == null ? (new StaticResurrectionData()) : (StaticResurrectionData.fromDto(param1.sx));
                    StaticDataManager.resourcesConversionData = param1.bc == null ? (new StaticResourcesConversionData()) : (StaticResourcesConversionData.fromDto(param1.bc));
                    StaticDataManager.MaxLevelAttack = param1.mla;
                    StaticDataManager.MaxLevelRobbery = param1.mlr;
                    StaticDataManager.MaxLevelReinforcement = param1.mlf;
                    StaticDataManager.MaxLevelOccupation = param1.mlo;
                    StaticDataManager.MaxTowersPerSector = param1.mt;
                    StaticDataManager.MaxGatesPerSector = param1.mg;
                    StaticDataManager.DefenseObjectsPerGates = param1.dpg;
                    StaticDataManager.MaxDefenseObjects = param1.mdo;
                    StaticDataManager.minimalMoneyBalance = param1.mmb == null ? (-100000) : (param1.mmb);
*/

/******************************** Map package ********************************/
var Map = {
	is_refreshing: false,
	to_visit	: [],
	buildings_id: [106, 104, 102, 109, 108, 103, 105, 107, 150],
	block_size	: 20,
	x			: 0,
	y			: 0,
	roundToCell : function (n, ceil) {
		var t = Map, r = n;
		if (n < 0) r = n - (t.block_size - 1);
		r = (r/t.block_size);
		return (ceil ? Math.ceil(r) : Math.floor(r));
	},
	getMapRect : function (x, y) {
		var t = Map;
		var ret = [];
		var left = t.roundToCell(x);
		var right = t.roundToCell(x, true);
		var x_gap = Math.max(left, right) - Math.min(left, right);
		var bottom = t.roundToCell(y);
		var top = t.roundToCell(y, true);
		var y_gap = Math.max(top, bottom) - Math.min(top, bottom);
		for (var i=0; i<=x_gap; i++) {
			for (var j=0; j<=y_gap; j++) {
				ret.push ({x:Math.min(left, right)+i, y:Math.min(top, bottom)+j});
			}
		}
		return ret;
	},
	init : function (callback) {
		var t = Map;
		/* Save our coords */
		t.x = t.roundToCell(Seed.gameData.account.x || 0);
		t.y = t.roundToCell(Seed.gameData.account.y || 0);
		var coords = t.getMapRect((Seed.gameData.account.x || 0), (Seed.gameData.account.y || 0));
		var data = {"b":coords};
		t.fetchMap (function (rslt) {
			if (rslt.ok)
				 verboseLog('Requête des données carte envoyée avec succès au serveur');
			else verboseLog('Map.fetchMap a retourné l\'erreur ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback(rslt);
		}, { params : JSON.stringify(data) });

	},
	fetchMap : function (callback, options) {
		if (callback instanceof Function) {
			var callback = callback;
			var options = options || {};
		} else {
			var options = callback;
			var callback = null;
		}
		if (DEBUG) logit ('fetchMap '+options.params);
		new MyAjaxRequest (C.attrs.defaultServer, C.attrs.defaultSegment, 'GetMap', options.params, function (rslt) {
			if (rslt.ok) {
				if (rslt.dat.n) {
					try {
						var notes = jsonDto.getUserNotes(rslt.dat.n);
						Seed.gameData.userNotes.mergeWith(notes);
						for (var i in notes) {
							if (!Data.map.players[i]) {
								Data.map.players[i] = {seg:notes[i].segment_id, sid:notes[i].social_id, n:notes[i].fullname, img:notes[i].avatar, 
														l:notes[i].level, c:notes[i].city, x:notes[i].x, y:notes[i].y, aid:notes[i].alliance_id};
							}
						}
					} catch (e) {
						rslt.ok = false;
						rslt.errmsg = 'Seed.fetchMap.userNotes a retourné l\'erreur ' + e.toString();
					}
				}
				//LocationNote.fromDtos(dto.l)
				// gestion alliances - voir \Action\model\logic\commands\world\MapGetCmd.as
			}
			if ( callback )	callback (rslt);
			return;
		}, true);
	},
	scanMap : function (options, callback){
		var t = Map;
		t.callback	= callback; 
		t.radius	= (!options.radius || options.radius < 4) ? 4 : options.radius;
		t.radius	*= 10;
		t.pos_x		= options.x - t.radius + 40;
		t.pos_y		= options.y - t.radius + 40;
		t.step_x	= t.step_y = 0;
		t.steps_x	= Math.ceil( (t.radius*2) / 40 );
		t.steps_y	= Math.ceil( (t.radius*2) / 40 );
		t.steps		= toNum( t.steps_x * t.steps_y )+1;
		t.step		= 0;
		t.percent	= toNum( t.step * 100 / t.steps );
		t.users_count = 0;
		t.total_users = 0;
		t.old_percent = 0;
		t.users_percent = toNum( t.users_count * 100 / ((t.total_users == 0) ? 1 : t.total_users));
		t.options   = options;
		t.forwards	= true;

		var coords = t.getMapRect(t.pos_x, t.pos_y);
		var data = {"b":coords};
		t.fetchMap (t.gotMapUsers, { params : JSON.stringify(data) });
	},
	fetchNext : function () {
		var t = Map;
		if (t.is_refreshing) {
			setTimeout (t.fetchNext, 1000);
		} else {
			t.step = t.step + 1;
			t.percent = toNum( t.step * 100 / t.steps );
			progressBar.update ({ step:t.percent });
			if (t.forwards) {
				++t.step_x;
				if (t.step_x >= t.steps_x) {
					++t.step_y;
					t.forwards = false;
					--t.step_x;
				}
			} else {
				--t.step_x;
				if (t.step_x < 0) {
					++t.step_y;
					t.forwards = true;
					++t.step_x;
				}
			}

			if (t.step_y >= t.steps_y) {
				if (t.callback) {
					t.callback ({done:true});
					return;
				}
			}
//			t.callback ({done:false});
			setTimeout (function(){
				var coords = t.getMapRect(t.pos_x + (t.step_x*40), t.pos_y + (t.step_y*40));
				var data = {"b":coords};
				t.fetchMap (t.gotMapUsers, { params : JSON.stringify(data) });
			}, Math.randRange(1500, 3000));
		}
	},
	gotMapUsers : function (rslt) {
		var t = Map;
		var to_visit = [];
		t.users_count = 0;
		t.total_users = 0;

		if (!rslt.ok){
			if (t.callback)	t.callback (rslt);
			return;
		}
		var notes = jsonDto.getUserNotes(rslt.dat.n);
		var min = (t.options.min || 9);
		var max = (t.options.max || 100);
		for (var i in notes) {
			if (notes[i].level >= min && notes[i].level <= max) to_visit.push(i);
		}
		if (to_visit.length > 0) to_visit.shuffle();
		Map.to_visit = to_visit;
		Map.is_refreshing = true;
		t.total_users = (Map.to_visit.length || 0);
		t.getDetails ();
		t.fetchNext ();
	},
	getDetails : function () {
		var t = Map;
		if (t.to_visit.length > 0) {
			var user_id = t.to_visit[0];
			var user = Seed.gameData.userNotes[user_id];
			if (user) {
				var segment_id = ((user.segment_id == undefined || user.segment_id == null) ? Seed.dfltSegmentId : user.segment_id);
				VisitUsers.visitCmd (user_id.toString(), segment_id, function (res){
					t.to_visit.shift();
					if (res.done){
						t.updateUserEvol(user_id);
						t.users_count++;
						t.tile_percent = Math.floor( t.users_count * 100 / ((t.total_users == 0) ? 1 : t.total_users));
						t.percent	   = toNum( t.step * 100 / t.steps );
						t.percent      = t.percent + (t.tile_percent / t.steps);
						if (t.percent != t.old_percent) {
							progressBar.update ({ step:t.percent, stepText:'Veuillez patienter...<br>Etape '+(t.step+1)+'/'+t.steps+' : Joueur '+t.users_count+'/'+t.total_users });
							t.old_percent = t.percent;
						}
					} else {
						var msg = 'Erreur lors de la visite chez <b>'+user.fullname+'</B><br>'+(res.errmsg || '');
						progressBar.update ({ stepText:msg });
					}
					setTimeout (t.getDetails, Math.randRange(1000, 2500));
				});
			}
		}
		var done = true;
		if (t.to_visit.length > 0) { done = false; return; }
		if (done) Map.is_refreshing = false;
	},
	updateUserEvol : function (user_id) {
		var t = Map;
		var user = Seed.gameData.userNotes[user_id];
		if (VisitUsers && VisitUsers.current && VisitUsers.current.gameData && VisitUsers.current.gameData.account) {
			var user_data = VisitUsers.current.gameData.account;
			var user_buildings = VisitUsers.current.gameData.city.buildings;
			var user_xp = user_data.experience;
			var gap_lvl = 0;
			var gap_xp = 0;
			if (Data.map.evolution[user_id]) {
				gap_lvl = user.level - (Data.map.evolution[user_id].level || 0);
				gap_xp = user_xp - (Data.map.evolution[user_id].xp || 0);
			}
			var buildings = {};
			for (var i=0; i<user_buildings.length; i++) {
				var building = user_buildings[i], found = false;
				for (var j=0; j<t.buildings_id.length; j++) {
					if (t.buildings_id[j] == building.type) found = true;
				}
				if (found) {
					if (buildings[building.type]) (buildings[building.type])++;
					else buildings[building.type] = 1;
				}
			}
			Data.map.evolution[user_id] = {level:user.level, gap_lvl:gap_lvl, xp:user_xp, gap_xp:gap_xp, buildings:buildings};
		}
	},
	getOneDetail : function (user_id, callback) {
		var t = Map;
		var user = Seed.gameData.userNotes[user_id];
		if (!user) {
			note = Data.map.players[user_id];
			if (note)
			user = {segment_id:note.seg, social_id:note.sid, fullname:note.n, avatar:note.img,
					registration:null, level:note.l, city:note.c, x:note.x, y:note.y,
					caravan_speed:null, occupant_user_id:null, alliance_id:note.aid, alliance_rank_id:null};
		}
		if (user) {
			var segment_id = ((user.segment_id == undefined || user.segment_id == null) ? Seed.dfltSegmentId : user.segment_id);
			VisitUsers.visitCmd (user_id.toString(), segment_id, function (res){
				if (res.done){
					t.updateUserEvol(user_id);
					if (callback) callback({done:true});
					return;
				} else {
					verboseLog('VisitUsers.visitCmd a échoué avec l\' erreur : ' + rslt.errmsg);
					if (callback) callback({done:false, errmsg:rslt.errmsg});
					return;
				}
			});
		}
	},
	checkOneUser : function (t, user_id, notify){
		var user = Seed.gameData.userNotes[user_id];
		if (!user) {
			note = Data.map.players[user_id];
			if (note)
				user = {segment_id:note.seg, social_id:note.sid, fullname:note.n, avatar:note.img,
						registration:null, level:note.l, city:note.c, x:note.x, y:note.y,
						caravan_speed:null, occupant_user_id:null, alliance_id:note.aid, alliance_rank_id:null};
		}
		if (!user) {
			var dial = new ModalDialog (t.container, 300, 150, '', false);
			dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
			dial.getContentDiv().innerHTML = 'Rafraîchissement joueur impossible...\nDonnées joueur manquantes';
			setTimeout (function(){dial.destroy(); if (notify) notify (true);}, 2000);
		}
		var dial = new ModalDialog (t.container, 300, 165, '', false, null);
		dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
		dial.getContentDiv().innerHTML = 'Rafraîchissement des données de '+user.fullname+'...';
		Map.getOneDetail (user_id, callback);
		function callback (res){
			if (res.done){
				actionLog('Données de <B>'+user.fullname+'</B> rafraîchies');
				dial.getContentDiv().innerHTML = 'Données de <B>'+user.fullname+'</B> rafraîchies';
				setTimeout (function(){dial.destroy(); if (notify) notify(true);}, 2000);
			} else {
				dial.getContentDiv().innerHTML = '<B>Ouuups, une erreur s\'est produite.</B>\n'+(res.errmsg || '');
				dial.allowClose (true);
				if (notify) notify(false);
				return;
			}
		}
	}
}
/******************************** Map package ********************************/

/******************************** Seed package *******************************/
var Seed = {
	serverTimeOffset: 0,
	lastRefresh		: 0,
	updating		: false,
	tickTimer		: 0,
	dfltSegmentId	: 0,
	defaultServer	: '',
	defaultSegment	: '',
	segments		: [],
	reqs 			: {},
	all_units_id	: [], /* all units */
	units_id		: [], /* only trainable units (so except foes) */
	buildings_id	: [],
	friends			: [],
	statics			: {},
	skills			: {types:{}, discard_prices:[]},
	dirty_marches 	: false,
	old_in_march	: {},

	init : function (callback) {
		var t = Seed;
		t.updating = true;
		var payload = t.getPayload();
		if (DEBUG) logit('PayLoad = '+JSON.stringify(payload));

		t.signIn (function (rslt) {
			if (rslt.ok)
				 verboseLog('Requête des données du joueur envoyée avec succès au serveur');
			else verboseLog('Seed.signIn a retourné l\'erreur ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback(rslt);
		}, { params : JSON.stringify(payload) });
		clearInterval(t.tickTimer);
		t.tickTimer = setInterval(t.tick, 1000);
	},
	getPayload : function () {
		// Payload generation
		var _x = Facebook.SND.gender;
		var _a = true;
		var _i = 'fb'+Facebook.SND.id;
		var _t = Facebook.SND.timezone;
		var _u = 'https://graph.facebook.com/'+USER_ID+'/picture?type=large';
		var _h = 'fb'+C.attrs.hashId;
		var _d = Facebook.SND.first_name.cleanString()+';'+Facebook.SND.last_name.cleanString()+';'+Facebook.SND.gender+';'+Facebook.SND.locale+';'+Facebook.SND.timezone+';'+(Facebook.SND.birthday||'')+';'+(Facebook.SND.location||'');
		var _n = Facebook.SND.name.cleanString();

		var _l = Facebook.SND.locale;
		var _p = [];
		for (var p in Facebook.SND.permissions) {
			var perms = Facebook.SND.permissions[p];
			for (var pi in perms) {
				if (perms[pi].installed)		_p.push("installed");
				if (perms[pi].bookmarked)		_p.push("bookmarked");
				if (perms[pi].publish_actions)	_p.push("publish_actions");
				if (perms[pi].email)			_p.push("email");
			}
		}
		_s = {"x":_x, "a":_a, "i":_i, "t":_t, "u":_u, "h":_h, "d":_d, "n":_n, "l":_l, "p":_p};
		var _f = [];
		for (var i=0; i<Facebook.Friends.length; i++)
			_f.push('fb'+(Facebook.Friends[i].user_id || Facebook.Friends[i].id));
		return ({"s":_s, "f":_f, "i":"fb0", "l":unescape(C.attrs.source)});
	},
	signIn : function (callback, options) {
		if (callback instanceof Function) {
			var callback = callback;
			var options = options || {};
		} else {
			var options = callback;
			var callback = null;
		}
		new MyAjaxRequest (C.attrs.defaultServer, C.attrs.defaultSegment, 'SignIn', options.params, function (rslt) {
			if (rslt.ok) {
				// logit('SignIn = '+JSON.stringify(rslt.dat));
				if (rslt.dat.r){
					var new_server = rslt.dat.r.substr(0, rslt.dat.r.indexOf("/"));
					var new_segment = rslt.dat.r.substr(rslt.dat.r.indexOf("Segment")+7);
					C.attrs.defaultServer = new_server;
					C.attrs.defaultSegment = new_segment;
					redo_SignIn = true;
					verboseLog('Redirection vers le serveur '+C.attrs.defaultServer+', Segment '+C.attrs.defaultSegment);
				} else {
					redo_SignIn = false;
					Seed.player = rslt.dat;
					Seed.dfltSegmentId = Seed.player.i;
					for (var i=0; i<Seed.player.a.length; i++) {
						var new_server = Seed.player.a[i];
						var server  = new_server.substr(0, new_server.indexOf("/"));
						var segment = new_server.substr(new_server.indexOf("Segment")+7);
						Seed.segments.push({server:server, segment:segment});
						if (i == Seed.dfltSegmentId) {
							Seed.defaultServer  = server;
							Seed.defaultSegment = segment;
						}
					}
					Seed.friends = cloneProps(Seed.player.f);
					try {
						Seed.lastRefresh = new Date().getTime(); /* store servertime to calculate resources gap between data retrieved from server and next resources update by Seed */
						Seed.gameData = cloneProps(jsonDto.getUserGameData(Seed.player.u.g));
						Seed.gameData.serverTimeMs = Seed.player.t;
						Seed.gameData.sessionStartTimeMs = Seed.player.t;
						Seed.gameData.totalInGameTimeMs = Seed.player.u.g.cd.g;
						Seed.gameData.RefreshUserNoteTimeoutMs = 0;
						Seed.gameData.chatManager = {};
						Seed.gameData.chatManager.max_users = Seed.player.chu;
						Seed.gameData.chatManager.max_messages = Seed.player.chm;
						Seed.gameData.chatManager.sessionId = 0;
						Seed.gameData.chatManager.knownMessageId = 0;
					} catch (e) {
						rslt.ok = false;
						rslt.errmsg = 'Seed.gameData a retourné l\'erreur ' + e.toString();
					}
					try {
						Seed.gameData.userNotes = cloneProps(jsonDto.getUserNotes(Seed.player.o));
						if (Data.map.players) {
							for (var i in Data.map.players) {
								if (Seed.gameData.userNotes[i]) delete Data.map.players[i];
							}
						}
					} catch (e) {
						rslt.ok = false;
						rslt.errmsg = 'Seed.gameData.userNotes a retourné l\'erreur ' + e.toString();
					}
					try {
						Seed.gameData.locationNotes = cloneProps(jsonDto.getLocationNotes(Seed.player.l));
					} catch (e) {
						rslt.ok = false;
						rslt.errmsg = 'Seed.gameData.locationNotes a retourné l\'erreur ' + e.toString();
					}
					try {
						Seed.gameData.alliances = cloneProps(jsonDto.getAllianceNotes(Seed.player.y));
					} catch (e) {
						rslt.ok = false;
						rslt.errmsg = 'Seed.gameData.alliances a retourné l\'erreur ' + e.toString();
					}
				}
			}
			if ( callback )	callback (rslt);
			return;
		}, true);
	},
	initAlliance : function (callback) {
		var t = Seed;
		t.getAlliance (function (rslt) {
			if (rslt.ok)
				 verboseLog('Requête des données alliance envoyée avec succès au serveur');
			else verboseLog('Seed.getAlliance a retourné l\'erreur ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback(rslt);
		}, { params : JSON.stringify(Seed.gameData.alliance.id) });
//		clearInterval(t.allianceTickTimer);
//		t.allianceTickTimer = setInterval(t.allianceTick, 1000);
	},
	getAlliance : function (callback, options) {
		if (!Seed.gameData.alliances || !Seed.gameData.alliances[options.params]) {
			callback ({ok:false, errmsg:"Alliance "+options.params+" non trouvée"}); return;
		} else var seg_id = Seed.gameData.alliances[options.params].segment_id;
		new MyAjaxRequest (Seed.segments[seg_id].server, Seed.segments[seg_id].segment, 'GetAlliance', options.params, function (rslt) {
			if (rslt.ok) {
				if (rslt.dat){
					Seed.my_alliance = {name:rslt.dat.n, segment_id:rslt.dat.s, rating_pos:rslt.dat.p, rating_value:rslt.dat.v,
										membership:jsonDto.getAllianceMembership(rslt.dat.d.m),
										diplomacy:jsonDto.getAllianceDiplomacy(rslt.dat.d.x)};
					Seed.gameData.alliance.mergeWith (Seed.my_alliance);
					try {
						Seed.gameData.userNotes.mergeWith(jsonDto.getUserNotes(rslt.dat.u));
					} catch (e) {
						rslt.ok = false;
						rslt.errmsg = 'Seed.gameData.userNotes a retourné l\'erreur ' + e.toString();
					}
				}
			}
			if ( callback )	callback (rslt);
			return;
		}, true);
	},
	updateGameData : function (request_rslt) {
		Seed.gameData.serverTimeMs = request_rslt.t;
		//UserNormalizationManager.RefreshTimeoutMs = dto.e;
		if (!is_null(request_rslt.chat)) {
			Seed.gameData.chatManager.sessionId = request_rslt.chat.s;
			Seed.gameData.chatManager.knownMessageId = request_rslt.chat.i;
		}
		if (!is_null(request_rslt.f)) Seed.gameData.RefreshUserNoteTimeoutMs = request_rslt.f;
		if (is_null(request_rslt.v) || request_rslt.v == 0 || Seed.gameData.revision >= request_rslt.v) {
			Seed.updating = false; /* Restarts the calculation of resources */
			return false;
		}
		Seed.gameData.revision = request_rslt.v;
		if (is_null(request_rslt.g)) {
			Seed.updating = false; /* Restarts the calculation of resources */
			/*if (!is_null(rslt.dat.n)) { TO COMPLETE
				normalizationTime = new Date(dto.n);
				Normalizer.normalize2(UserManager.user, normalizationTime);
			*/
			return false;
		}
		var newUserGameData = jsonDto.getUserGameData(request_rslt.g);
		Seed.gameData.account = cloneProps(newUserGameData.account);
		Seed.gameData.city = cloneProps(newUserGameData.city);
		Seed.gameData.troops = cloneProps(newUserGameData.troops);
		Seed.gameData.construction_data = cloneProps(newUserGameData.construction_data);
		Seed.gameData.world_data = cloneProps(newUserGameData.world_data);
		Seed.gameData.skill_data = cloneProps(newUserGameData.skill_data);
		Seed.gameData.alliance = cloneProps(newUserGameData.alliance);
		if (Seed.my_alliance) Seed.gameData.alliance.mergeWith (Seed.my_alliance);
		Seed.gameData.clan_data = cloneProps(newUserGameData.clan_data);
		Seed.gameData.known_data = cloneProps(newUserGameData.known_data);
		Seed.gameData.raid_data = cloneProps(newUserGameData.raid_data);
		Seed.gameData.cyborgs = cloneProps(newUserGameData.cyborgs);
		Seed.gameData.treasures = cloneProps(newUserGameData.treasures);
		Seed.gameData.drawings = cloneProps(newUserGameData.drawings);
		Seed.gameData.technologies = cloneProps(newUserGameData.technologies);
		if (request_rslt.g.cd && request_rslt.g.cd.g) Seed.gameData.totalInGameTimeMs = request_rslt.g.cd.g;
		Seed.updateSkills();
		Seed.updateResources();
		Seed.dirty_marches = true; /* Needed to refresh marches display in info tab */
		Seed.updating = false; /* Restarts the calculation of resources after updates */
		return true;
/* TO COMPLETE
           var prevKnownUserIds:* = UserGameData.getKnownUserIds(UserManager.user);
            var prevKnownAllianceIds:* = UserGameData.getKnownAllianceIds(UserManager.user);
            UserManager.update(newUserGameData); =>
				_user.gameData.update(param1);
				_user.gameData.updateObjectsBuyStatus(true);
				UserNoteManager.fixAllNotes();
				LocationNoteManager.fixAllNotes();

            UserNoteManager.updateOne(new UserNote(UserManager.user));
            Normalizer.normalize(UserManager.user);
*/
	},
	updateResources : function () {
		if (!Seed.gameData || !Seed.gameData.city || !Seed.gameData.city.buildings) return;
		var mining_acceleration	= {gold:1, food:1, iron:1, saphir:1, skull:1};
		var storage_limit		= {gold:0, food:0, iron:0, saphir:0, skull:0};
		var mining_boosts		= {gold:1, food:1, iron:1};
		var consumption			= {gold:0, food:0, iron:0, saphir:0, skull:0};
		var troop_consumption	= {gold:0, food:0, iron:0, saphir:0, skull:0};
		var production			= {gold:0, food:0, iron:0, saphir:0, skull:0};
		var per_hour			= {gold:0, food:0, iron:0, saphir:0, skull:0};
		var troops				= {};
		for (var i=0; i<Seed.gameData.city.buildings.length; i++) {
			var building = Seed.gameData.city.buildings[i];
			var stat = Seed.reqs[building.type].stats.levels[building.level-1];
			if (stat && stat.mining_acceleration) {
				for (var r=0; r<resource_types.length; r++)
					mining_acceleration[resource_types[r]] += stat.mining_acceleration[resource_types[r]];
			}
			if (stat && stat.storage_limit) {
				for (var r=0; r<resource_types.length; r++)
					storage_limit[resource_types[r]] += stat.storage_limit[resource_types[r]];
			}
		}
		for (var r=0; r<resource_types.length; r++) {
			if (storage_limit[resource_types[r]] == 0) storage_limit[resource_types[r]] = 1000;
			storage_limit[resource_types[r]] += Seed.statics.additionnal_storage;
		}
		storage_limit.saphir = 999999999;
		if (Seed.gameData.construction_data && Seed.gameData.construction_data.resource_mining_boosts) {
			var boosts = Seed.gameData.construction_data.resource_mining_boosts;
			for (var b=0; b<boosts.length; b++) {
				switch (boosts[b].id) {
					case 3 : mining_boosts.iron += (boosts[b].percent / 100); break;
					case 4 : mining_boosts.gold += (boosts[b].percent / 100); break;
					case 5 : mining_boosts.food += (boosts[b].percent / 100); break;
				}
			}
			mining_acceleration.gold = mining_acceleration.gold * mining_boosts.gold;
			mining_acceleration.iron = mining_acceleration.iron * mining_boosts.iron;
			mining_acceleration.food = mining_acceleration.food * mining_boosts.food;
		}
		for (var i=0; i<Seed.gameData.city.buildings.length; i++) {
			var building = Seed.gameData.city.buildings[i];
			var stat = Seed.reqs[building.type].stats.levels[building.level-1];
			var resources = (stat ? stat.resources : '');
			if (resources) {
				for (var r=0; r<resource_types.length; r++) {
					consumption[resource_types[r]] += (resources[resource_types[r]] < 0 ? resources[resource_types[r]] : 0);
					production[resource_types[r]]  += (resources[resource_types[r]] > 0 ? resources[resource_types[r]] * mining_acceleration[resource_types[r]] : 0);
					per_hour[resource_types[r]]    += resources[resource_types[r]] * (resources[resource_types[r]] > 0 ? mining_acceleration[resource_types[r]] : 1);
				}
			}
		}
		for (var id in Seed.gameData.troops.countByType)
			troops[id] = {total:Seed.gameData.troops.countByType[id], in_city:Seed.gameData.troops.countByType[id], in_bunker:0, in_reinf:0, in_move:0};
		if (Seed.gameData.world_data && Seed.gameData.world_data.units) {
			for (var i=0; i<Seed.gameData.world_data.units.length; i++) {
				var unit = Seed.gameData.world_data.units[i];
				if (unit.owner_id == Seed.gameData.account.id && !is_null(unit.troops_payload)) {
					for (var id in unit.troops_payload.troops) {
						if (troops[id]) {
							troops[id].total += unit.troops_payload.troops[id];
							if (is_null(unit.state_moving_forward) && is_null(unit.state_moving_back)) {
								if (unit.target_id == Seed.gameData.account.id)
									troops[id].in_bunker += unit.troops_payload.troops[id];
								else troops[id].in_reinf  += unit.troops_payload.troops[id];
							} else
								troops[id].in_move += unit.troops_payload.troops[id];
						} else {
							var total = unit.troops_payload.troops[id], in_bunker = 0, in_reinf = 0, in_move = 0;
							if (is_null(unit.state_moving_forward) && is_null(unit.state_moving_back))
								if (unit.target_id == Seed.gameData.account.id)
									in_bunker += unit.troops_payload.troops[id];
								else in_reinf  += unit.troops_payload.troops[id];
							else
								in_move += unit.troops_payload.troops[id];
							troops[id] = {total:total, in_city:0, in_bunker:in_bunker, in_reinf:in_reinf, in_move:in_move};
						}
					}
				}
			}
		}
		for (var i in troops) {
			var stat = Seed.reqs[i].stats.levels[0];
			var resources = (stat ? stat.resources : '');
			if (resources) {
				for (var r=0; r<resource_types.length; r++)
					troop_consumption[resource_types[r]] += (resources[resource_types[r]] < 0 ? resources[resource_types[r]] * troops[i].total : 0);
			}
		}
		var consumption_bonus = getSkillsBonus(Seed.skills.types_id.TROOPS_RESOURCES_CONSUMPTION);
		for (var r=0; r<resource_types.length; r++) {
			troop_consumption[resource_types[r]] = (troop_consumption[resource_types[r]] * (1 - (consumption_bonus/100)));
			per_hour[resource_types[r]]    += troop_consumption[resource_types[r]];
		}
		Seed.gameData.account.consumption = cloneProps(consumption);
		Seed.gameData.account.troop_consumption = cloneProps(troop_consumption);
		Seed.gameData.account.production  = cloneProps(production);
		Seed.gameData.account.per_hour	  = cloneProps(per_hour);
		Seed.gameData.account.limit		  = cloneProps(storage_limit);
		Seed.gameData.account.troops	  = cloneProps(troops);
	},
	updateSkills : function () {
		if (!Seed.gameData || !Seed.gameData.skill_data || !Seed.gameData.skill_data.skills) return;
		if (!Seed.skills || !Seed.skills.types) return;
		/* Update Seed.skills with missing skills */
		for (var i in Seed.skills.types) {
			var found = false;
			var skills = Seed.gameData.skill_data.skills;
			for (var s=0; s<skills.length && !found; s++) {
				if (skills[s].type == i) found = true;
			}
			if (!found)
				Seed.gameData.skill_data.skills.push({type:i, level:0, construction_start:'', construction_end:''});
		}
	},
/*                  if (dto.q != null)
                    {
                        QuestManager.updateQuests(Quest.fromDtos(dto.q));
                    }
                    var _loc_6:* = new Date(dto.t);
                    var _loc_7:* = dto.n;
done                    var _loc_9:* = dto.f;
done                    var _loc_10:* = UserNote.fromDtos(dto.o);
done                    var _loc_11:* = dto.l == null ? (new ArrayCollection()) : (LocationNote.fromDtos(dto.l));
done                    var _loc_12:* = dto.y == null ? (new ArrayCollection()) : (AllianceNote.fromDtos(dto.y));
                    var _loc_13:* = dto.lb;
                    var _loc_14:* = dto.g;
                    var _loc_15:* = dto.x;
                    var _loc_16:* = dto.b == null ? (null) : (Bonus.fromDtos(dto.b));
                    UserManager.firstSignInToday = _loc_14;
                    UserManager.registeredToday = _loc_15;
                    UserManager.segmentId = segmentId;
                    UserManager.abTestGroupIds = dto.j == null ? (new ArrayCollection()) : (new ArrayCollection(dto.j));
                    UserManager.facebookPrices = FacebookPrice.fromDtos(dto.p);
                    if (dto.hasOwnProperty(dto.ps))
                    {
                        UserManager.facebookOfferPrices = FacebookPrice.fromDtos(dto.ps);
                    }
                    UserManager.initialize(_loc_8, _loc_9, _loc_7, _loc_13, _loc_16);
                    if (dto.cm)
                    {
                        SocialManager.initializeTasks(dto.cm);
                    }
                    UserNoteManager.initialize(_loc_8, _loc_10);
                    LocationNoteManager.initialize(_loc_11);
                    AllianceNoteManager.initialize(_loc_12);
                    UserNormalizationManager.run();
                    if (!isNaN(_loc_8.gameData.allianceData.allianceId) && _loc_8.gameData.allianceData.rankId != AllianceMemberRankId.INVITED)
                    {
                        AllianceManager.loadAlliance(_loc_8);
                    }
done                    ChatManager.initialize(dto.chu, dto.chm);
                    AutoRefreshManager.enabled = dto.auto == null ? (false) : (dto.auto);
                    AutoRefreshManager.run();
                    if (dto.sr != null)
                    {
                        SurveyManager.parseSurveyFromSignInDto(dto.sr);
                    }
                    GlobalMissionCurrentState.globalMissionWonQuestPrototypeIds = dto.gmw == null ? ([]) : (dto.gmw);
                    GlobalMissionCurrentState.globalMissionLostQuestPrototypeIds = dto.gml == null ? ([]) : (dto.gml);
                    var _loc_17:* = GlobalMissionCurrentState.getMissionStateById(dto.gmc);
                    if (dto.gm == GlobalMissionStateTypeId.LOST && dto.gm != _loc_17)
                    {
                        GlobalMissionCurrentState.globalMissionLostQuestPrototypeIds.push(dto.gmc);
                    }
                    if (dto.gm == GlobalMissionStateTypeId.WON && dto.gm != _loc_17)
                    {
                        GlobalMissionCurrentState.globalMissionWonQuestPrototypeIds.push(dto.gmc);
                    }
                    if (GetMyThreatCmd.needInitialized)
                    {
                        new GetMyThreatCmd().execute();
                    }
                    if (dto.rp != null)
                    {
                        BuyResurrectionCmd.setResurrectionPrices(dto.rp);
                    }
*/
	tick : function () {
		var t = Seed, value = 0, rate = 0, max = 0, update_res = false, do_refresh = false;
		if (t.updating) return;
		for (var r=0; r<resource_types.length; r++) {
			if (!Seed.gameData || !Seed.gameData.account || !Seed.gameData.account.per_hour || !Seed.gameData.account.per_hour[resource_types[r]]) continue;
			rate = toNum(Seed.gameData.account.per_hour[resource_types[r]])/3600000; /* Convert in per Ms */
			var now = serverTimeMs();
			if (t.lastRefresh) rate *= (now - t.lastRefresh);
			else rate *= 1000; /* Convert in per sec */
			value = Seed.gameData.account.resources[resource_types[r]];
			max = Seed.gameData.account.limit[resource_types[r]];
			if ((rate < 0 && value > 0) ||
				(rate > 0 && value < max)) {
				value += rate;
				Seed.gameData.account.resources[resource_types[r]] = (value > 0 ? (value < max ? value : max) : 0);
			}
		}
		t.lastRefresh = serverTimeMs();
		now = serverTimeMs();
		/* Raid updates */
		if (Seed.gameData.world_data && Seed.gameData.world_data.next_raid && Seed.gameData.world_data.next_raid < now) {
			Seed.gameData.world_data.raids++;
			if (Seed.gameData.world_data.raids < 10) Seed.gameData.world_data.next_raid = now + (Seed.statics.user_data.raid_update_hours * 3600000);
		}
		/* Building job */
		if (Seed.gameData.city && Seed.gameData.city.buildings && Seed.gameData.city.buildings.length > 0) {
			var found = false;
			for (var i=0; i<Seed.gameData.city.buildings.length && !found; i++) {
				var building = Seed.gameData.city.buildings[i];
				if (building.construction_end && building.construction_end < now) {
					SoundPlayer.PlaySound ('building');
					found = true;
					building.level++;
					building.construction_start = null;
					building.construction_end = null;
					update_res = true;
				}
			}
		}
		/* Training jobs */
		if (Seed.gameData && Seed.gameData.troops  && Seed.gameData.troops.factory && Seed.gameData.troops.factory.orders) {
			var orders = Seed.gameData.troops.factory.orders;
			var next_order = false;
			for (var t=0; t<orders.length; t++) {
				var order	= orders[t];
				var detail	= order.construction_info;
				if (!is_null(detail.end) && detail.end < now) {
					if (Seed.gameData.troops.countByType[order.type]) Seed.gameData.troops.countByType[order.type]++;
					else Seed.gameData.troops.countByType[order.type] = 1;
					var pending = order.pending - 1;
					if (pending > 0) {
						order.pending = pending;
						detail.end = now + (detail.end - detail.start);
						detail.start = now;
					} else {
						SoundPlayer.PlaySound ('units');
						orders.splice (t, 1);
						next_order = true;
					}
					update_res = true;
				}
			}
			if (next_order && orders.length > 0) {
				var order	= orders[0];
				var detail	= order.construction_info;
				Seed.gameData.troops.factory.next_order_id++;
				detail.start = now;
				detail.end = now + (Seed.reqs[order.type].requirements.levels[0].construction_time * 1000 * (1 - getSkillsBonus(Seed.skills.types_id.TROOPS_TRAINING_SPEED, order.type)/100));
			}
		}
		/* Skill job */
		if (Seed.gameData && Seed.gameData.skill_data && Seed.gameData.skill_data.skills && Seed.gameData.skill_data.skills.length > 0) {
			var found = false;
			for (var i=0; i<Seed.gameData.skill_data.skills.length && !found; i++) {
				var skill = Seed.gameData.skill_data.skills[i];
				if (skill.construction_end && skill.construction_end < now) {
					SoundPlayer.PlaySound ('research');
					found = true;
					skill.level++;
					skill.construction_start = null;
					skill.construction_end = null;
					update_res = true;
				}
			}
		}
		/* Technology job */
		if (Seed.gameData && Seed.gameData.technologies && Seed.gameData.technologies.length > 0) {
			var found = false;
			for (var i=0; i<Seed.gameData.technologies.length && !found; i++) {
				var tech = Seed.gameData.technologies[i];
				if (tech.construction_end && tech.construction_end < now) {
					SoundPlayer.PlaySound ('research');
					found = true;
					tech.level++;
					tech.construction_start = null;
					tech.construction_end = null;
					update_res = true;
				}
			}
		}
		/* End of march */
		if (Seed.gameData && Seed.gameData.world_data && Seed.gameData.world_data.units) {
			for (var i=0; i<Seed.gameData.world_data.units.length; i++) {
				var unit = Seed.gameData.world_data.units[i], own_march = false, end = 0;
				if (unit.owner_id == Seed.gameData.account.id) own_march = true;
				if (!is_null(unit.state_moving_back))
					end   = unit.state_moving_back.arrival;
				else if (!is_null(unit.state_moving_forward))
					end   = unit.state_moving_forward.arrival;
				if (end && end > now+15000 && end < now+20000) {
					/* 20 secs before impact, save troops payload for gap between attack and return */
					if (own_march && !is_null(unit.state_moving_forward) && !is_null(unit.troops_payload) && !Seed.old_in_march[unit.id])
						Seed.old_in_march[unit.id] = cloneProps(unit.troops_payload.troops);
				}
				if (end && end < now) {
					if (!is_null(unit.state_moving_forward)) {
						if (own_march) {
							Seed.gameData.world_data.units[i].state_moving_forward = {};
							if (unit.troops_payload.order == order_ids.Reinforcement || unit.troops_payload.order == order_ids.Bunker) update_res = true;
						} else {
							/* Caravan delivery at my castle */
							if (!is_null(unit.trading_payload)) {
								if (!is_null(unit.trading_payload.drawing_part)) {
									var draw = unit.trading_payload.drawing_part;
									if (draw) {
										var found = false;
										if (Seed.gameData.drawings && Seed.gameData.drawings.length > 0) {
											for (var d=0; d<Seed.gameData.drawings.length && !found; d++) {
												if (Seed.gameData.drawings[d].type == draw.type) {
													found = true;
													if (!Seed.gameData.drawings[d].parts) Seed.gameData.drawings[d].parts = [];
													for (var n=0; n<=draw.part; n++) {
														if (!Seed.gameData.drawings[d].parts[n]) Seed.gameData.drawings[d].parts.push(0);
													}
													Seed.gameData.drawings[d].parts[draw.part]++;
												}
											}
										}
										if (!found) {
											if (is_null(Seed.gameData.drawings)) Seed.gameData.drawings = [];
											Seed.gameData.drawings.push({id:0, type:draw.type, parts:[]});
											for (var d=0; d<Seed.gameData.drawings.length && !found; d++) {
												if (Seed.gameData.drawings[d].type == draw.type) {
													found = true;
													for (var n=0; n<=draw.part; n++) {
														if (!Seed.gameData.drawings[d].parts[n]) Seed.gameData.drawings[d].parts.push(0);
													}
												}
												Seed.gameData.drawings[d].parts[draw.part]++;
											}
										}
									}
								} else if (!is_null(unit.trading_payload.resources)) {
									for (var r=0; r<resource_types.length; r++)
										Seed.gameData.account.resources[resource_types[r]] += unit.trading_payload.resources[resource_types[r]];
								}
							}
							/* As we don't handle friend/enemy's returns, we remove the march */
							Seed.gameData.world_data.units.splice(i, 1);
						}
						do_refresh = true;
					} else {
						if (own_march) {
							if (!is_null(unit.troops_payload)) {
								if (!is_null(unit.troops_payload.resources)) {
									for (var r=0; r<resource_types.length; r++)
										Seed.gameData.account.resources[resource_types[r]] += unit.troops_payload.resources[resource_types[r]];
								}
								for (var id in unit.troops_payload.troops) {
									if (Seed.gameData.troops.countByType[id]) Seed.gameData.troops.countByType[id] += unit.troops_payload.troops[id];
									else Seed.gameData.troops.countByType[id] = unit.troops_payload.troops[id];
								}
								update_res = true;
							}
							if (Seed.old_in_march[unit.id]) delete(Seed.old_in_march[unit.id]);
							Seed.gameData.world_data.units.splice(i, 1);
						}
					}
					Seed.dirty_marches = true;
				}
			}
		}
		if (do_refresh) setTimeout(AutoRefresh.autoRefreshCmd,7000);
		else if (update_res) Seed.updateResources();
	}
}

/* implant : GetRadarLocations
server-method	GetOwnLocations
*/
/******************************** Seed package *******************************/

/******************************** SoundPlayer package ************************/
var SoundPlayer = {
	alertString		: '',
	shortString		: '',
	checkInterval	: null,
	attack_active	: false,
	attack_repeat_timer : null,
	raid_active		: false,
	raid_repeat_timer : null,

	SWF_PLAYER_URL : 'https://www.wackoscripts.com/mp3/jawz.swf',
	/*SWF_PLAYER_URL = 'http://pixtyle.free.fr/kabalistics/jawz.swf';*/
	SOUND_TYPES : [ 'attack', 'raid', 'building', 'research', 'units', 'fortuna'],
	DEFAULT_SOUND_URL : {
		attack	 : 'https://www.wackoscripts.com/mp3/tower.mp3',
		raid	 : 'http://pixtyle.free.fr/kabalistics/spy.mp3',
		building : 'https://www.wackoscripts.com/mp3/construction.mp3',
		units	 : 'https://www.wackoscripts.com/mp3/training.mp3',
		research : 'https://www.wackoscripts.com/mp3/research.mp3' },
/*		attack	 : 'http://pixtyle.free.fr/kabalistics/tower.mp3',
		building : 'http://pixtyle.free.fr/kabalistics/construction.mp3',
		units	 : 'http://pixtyle.free.fr/kabalistics/training.mp3',
		research : 'http://pixtyle.free.fr/kabalistics/research.mp3',*/

	init : function (){
		var t = SoundPlayer;
		t.oldAlertCount = 0;
		t.checkInterval = setInterval (t.checkAlerts, 1000);
	},
	loadPlayer : function (sound_type, url) {
		var t = SoundPlayer;
		if (!url) {
			if (!Data.options.sound['URL_'+sound_type]) {
				if (!t.DEFAULT_SOUND_URL[sound_type]) return;
				url = t.DEFAULT_SOUND_URL[sound_type];
			} else url = Data.options.sound['URL_'+sound_type];
		}
		var player_url = (Data.options.sound['URL_player'] || SoundPlayer.SWF_PLAYER_URL);
		var player_id = 'SwfPlyr_'+sound_type;
		var container_id = 'div_SwfPlyr_'+sound_type;
		var container = document.getElementById(container_id);
		var audio =	 '<object class="playerpreview" id="'+player_id+'" type="application/x-shockwave-flash" data="'+player_url+'" width="50" height="0">'
					+'	<param name="movie" value="'+player_url+'">'
					+'	<param name="AllowScriptAccess" value="always" />'
					+'	<param name="FlashVars" value="mp3='+url+'&amp;autoplay=1" />'
					+'</object>';
		if (container) try {container.innerHTML = audio;} catch(e) {}
	},
	PlaySound : function (sound_type, sample, do_repeat, repeat_delay){
		var t = SoundPlayer;
		var container_id = 'div_SwfPlyr_'+sound_type;
		var container = document.getElementById(container_id);
		if ((!sample && (
			( (/(building|units|research)/.test( sound_type )) && Data.options.sound.enable_jobs) ||
			( (/(attack|raid)/.test( sound_type )) && Data.options.sound.enable_sentinel))) || sample) {
			t.loadPlayer(sound_type);
			if (!sample && do_repeat && repeat_delay) {
				if (sound_type == 'attack') {
					t.attack_active = true;
					t.attack_repeat_timer = setTimeout(function(){t.PlaySound (sound_type, sample, do_repeat, repeat_delay);},repeat_delay*60000);
				}
				if (sound_type == 'raid') {
					t.raid_active = true;
					t.raid_repeat_timer = setTimeout(function(){t.PlaySound (sound_type, sample, do_repeat, repeat_delay);},repeat_delay*60000);
				}
			}
		}
	},
	StopSound : function (sound_type){
		var t = SoundPlayer;
		var container_id = 'div_SwfPlyr_'+sound_type;
		var container = document.getElementById(container_id);
		if (container) container.innerHTML = '';
		if (sound_type == 'attack') {
			t.attack_active = false;
			if (t.attack_repeat_timer) {clearTimeout(t.attack_repeat_timer); t.attack_repeat_timer = null;}
		}
		if (sound_type == 'raid') {
			t.raid_active = false;
			if (t.raid_repeat_timer) {clearTimeout(t.raid_repeat_timer); t.raid_repeat_timer = null;}
		}
	},
	checkAlerts : function () {
		var t = SoundPlayer;
		t.alertString = '';
		t.shortString = '';
		var attacks = 0;
		var raids = 0;
		var raise_attack = false, raise_raid = false, d;
/*		if (Data.options.messages_tower.length != 0) {
			for (var i=0; i<Data.options.messages_tower.length; i++) {
				d = Date.parse(Data.options.messages_tower[i].arrive_at)/1000;
				var now = toNum(serverTime());
				var diff = now - d;
				if (diff<0) {
					if (!Data.options.messages_tower[i].warned) {
						Data.options.messages_tower[i].warned = true;
						if (Data.options.messages_tower[i].type == 0) raise_attack = true;
						else raise_raid = true;
					}
					if (!Data.options.messages_tower[i].sent && Data.options.tower.send_message && 
						(Data.options.tower.msg_subject && Data.options.tower.msg_subject != null) &&
						(Data.options.tower.msg_body && Data.options.tower.msg_body != null) &&
						(Data.options.messages_tower[i].type == 0)) {
						Data.options.messages_tower[i].sent = true;
						if (Seed.player.alliance && Seed.player.alliance.id > 0) t.send_message (i);
					}
					if (Data.options.messages_tower[i].type == 0) attacks++;
					if (Data.options.messages_tower[i].type == 1) raids++;
				}
			}
		}
*/
		if (attacks == 0 && t.attack_active) t.StopSound('attack');
		if (raids == 0 && t.raid_active) t.StopSound('raid');
		if (attacks + raids > 0) {
			t.alertString += '<div class=info_alerts>Alerte : <B>';
			if (attacks == 0) {
				if (raids > 1) {
					t.alertString += raids+' raids (&incoming_raid&)';
					t.shortString += raids+' raids';
				} else {
					t.alertString += '1 raid (&incoming_raid&)';
					t.shortString += '1 raid';
				}
			} else if (attacks > 1) {
				if (raids > 1) {
					t.alertString += raids+' raids (&incoming_raid&)</B> and <B>' + attacks+' sièges (&incoming_attack&)';
					t.shortString += raids+' raids / '+attacks+' sièges';
				} else if (raids == 1) {
					t.alertString += '1 raid (&incoming_raid&)</B> and <B>' + attacks+' sièges (&incoming_attack&)';
					t.shortString += '1 raid / '+attacks+' sièges';
				} else {
					t.alertString += attacks+' sièges (&incoming_attack&)';
					t.shortString += attacks+' sièges';
				}
			} else {
				if (raids > 1) {
					t.alertString += raids+' raids (&incoming_raid&)</B> and <B>1 siège (&incoming_attack&)';
					t.shortString += raids+' raids / 1 siège';
				} else if (raids == 1) {
					t.alertString += '1 raid (&incoming_raid&)</B> and <B>1 siège (&incoming_attack&)';
					t.shortString += '1 raid / 1 siège';
				} else {
					t.alertString += '1 siège (&incoming_attack&)';
					t.shortString += '1 siège';
				}
			}
			t.alertString += '</B> en cours</div>';
			t.shortString = '<input id=short_alerts type=button class=btn_off value="' + t.shortString + '" />';
		}
/*		if (Data.options.tower.enabled && Data.options.sound.enable_sentinel && (raise_attack || raise_raid)) {
			if (raise_attack)
				 t.PlaySound('attack', false, (!t.attack_active ? Data.options.sound.repeat_attack : false), Data.options.sound.attack_rdelay);
			else t.PlaySound('raid', false, (!t.raid_active ? Data.options.sound.repeat_raid : false), Data.options.sound.raid_rdelay);
		}
*/
	},
}
/******************************** SoundPlayer package ************************/

/******************************** Treasures package **************************/
var Treasures = {
	collectAll : function (t, user_id, notify){
		var boxes = 0;
		for (var r in production_icons) boxes += (Seed.gameData.treasures.user_boxes_qty[r] || 0);
		if (boxes <= 0) {
			var dial = new ModalDialog (t.container, 300, 150, '', false);
			dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
			dial.getContentDiv().innerHTML = 'Aucun tribut à collecter';
			setTimeout (function(){dial.destroy()}, 1000);
			if (notify) notify (true);
			return;
		}
		var dial = new ModalDialog (t.container, 300, 165, '', false, null);
		dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
		dial.getContentDiv().innerHTML = 'Collecte des tributs...';
		Treasures.getTreasures (user_id, callback);
		function callback (res){
			if (res.done){
				actionLog('<B>Collecte des tributs</B>: Terminée');
				dial.getContentDiv().innerHTML = '<B>Collecte des tributs</B>: Terminée ('+res.count+' collectés)';
				setTimeout (function(){dial.destroy(); }, 2000);
				if (notify) notify(true);
				return;
			} else {
				dial.getContentDiv().innerHTML = '<B>Ouuups, erreur lors de la collecte des tributs.</B>';
				dial.allowClose (true);
				if (notify) notify(false);
				return;
			}
		}
	},
	getTreasures : function (user_id, callback){
		var t = Treasures, source = null, max = 99, count = 0;
		if (user_id == Seed.gameData.account.id)
			 source = Seed.gameData.treasures.user_boxes_qty;
		else { source = Seed.gameData.treasures.friends_boxes_qty; max = (3 - (Seed.gameData.treasures.boxes_by_users[user_id] || 0));}
		for (var r in production_icons) {
			while (source[r] > 0 && count < max) {
				if (user_id != Seed.gameData.account.id) {
					if (Seed.gameData.treasures.boxes_by_users[user_id]) Seed.gameData.treasures.boxes_by_users[user_id]++;
					else Seed.gameData.treasures.boxes_by_users[user_id] = 1;
				}
				source[r]--;
				//UserStatsManager.openedTreasureBox(UserManager.user, param2);
				Seed.gameData.account.resources[r] += Seed.gameData.treasures.boxes_values[r];
				AutoRefresh.boxesToOpen.push({"u":user_id, "b": {"g":0, "m":(r=='food' ? 1 : 0), "u":(r=='gold' ? 1 : 0), "t":(r=='iron' ? 1 : 0), "c":0}});
				count++;
			}
		}
		if (callback) callback({done:true, count:count});
	}
}
/******************************** Treasures package **************************/

/******************************** VerboseLog package *************************/
var VerboseLog = {
	init : function () {
		var t = VerboseLog;
		t.setEnable(Data.options.verboseLog.enabled);
	},

	setEnable : function (onOff) {
		var t = VerboseLog;
		Data.options.verboseLog.enabled = onOff;
	}
};
/******************************** VerboseLog package *************************/

/******************************** VisitUsers package *************************/
var VisitUsers = {
	current : {},
	thisUser : function (t, user_id, notify){
		var user = Seed.gameData.userNotes[user_id];
		var found = false, count = 0, collect = false;
		for (var f=0; f<Seed.friends.length && !found; f++) {
			if (Seed.friends[f] == user_id) found = true;
		}
		if (!found || !user) {
			var dial = new ModalDialog (t.container, 300, 150, '', false);
			dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
			dial.getContentDiv().innerHTML = 'Visite impossible...\nDonnées joueur manquantes ou non présent dans liste d\'amis';
			setTimeout (function(){dial.destroy(); if (notify) notify (true);}, 2000);
		}
		for (var r in production_icons)
			count += Seed.gameData.treasures.friends_boxes_qty[r];
		if (Data.options.contacts.collect_treas && count && nvl(Seed.gameData.treasures.boxes_by_users[user_id],0) < 3) collect = true;
		logit('======> Visite de '+user.fullname+ (collect ? ' et collecte des tributs' : ''));
		var dial = new ModalDialog (t.container, 300, 165, '', false, null);
		dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
		dial.getContentDiv().innerHTML = 'Visite du château de '+ user.fullname + (collect ? '\net collecte des tributs' : '') +'...';

		VisitUsers.startVisit (user_id, collect, function(rslt) {
			if (rslt.done){
				actionLog(rslt.msg);
				dial.getContentDiv().innerHTML = rslt.msg;
				setTimeout (function(){dial.destroy(); if (notify) notify(true);}, 4000);
				return;
			} else {
				dial.getContentDiv().innerHTML = rslt.msg;
				dial.allowClose (true);
				if (notify) notify(false);
				return;
			}
		});
	},
	allUsers : function (div, user_ids, notify){
		var t = VisitUsers;
		t.notify  = notify;
		t.step    = 0;
		t.steps   = Seed.statics.cyborgs.daily_limit_for_others + getSkillsBonus(Seed.skills.types_id.CYBORGS_COUNT) - Seed.gameData.cyborgs.created_for_user_ids.length;
		if (t.steps > user_ids.length)
			t.steps = user_ids.length;
		if (t.steps == 0) return true;
		progressBar.init (800+Math.randRange(1,50), 100, 300, 150, 'Message', 200, true, div.container);
		progressBar.start({ steps:t.steps, delay:1, byCount:true, title:'Visites des amis sélectionnés...', stepText:'Veuillez patienter...' });
		t.users   = cloneProps(user_ids);
		t.percent = toNum( t.step * 100 / t.steps );
		progressBar.update ({ step:t.percent });
		t.visitNext ();
	},
	visitNext : function (){
		var t = VisitUsers;
		if (Seed.updating) setTimeout(t.visitNext,1000);
		function skip () {
			t.users.shift();
			var remains = Seed.statics.cyborgs.daily_limit_for_others + getSkillsBonus(Seed.skills.types_id.CYBORGS_COUNT) - Seed.gameData.cyborgs.created_for_user_ids.length;
			if (t.users.length > 0 && t.users[0] && t.users[0].id && remains > 0)
				t.visitNext ();
			else {
				progressBarPop.destroy();
				if (t.notify) t.notify(true);
			}
			return;
		}
		var this_user_id = t.users[0].id;
		var user = Seed.gameData.userNotes[this_user_id];
		var found = false, count = 0, collect = false;
		for (var f=0; f<Seed.friends.length && !found; f++) {
			if (Seed.friends[f] == this_user_id) found = true;
		}
		if (!found || !user) skip ();
		for (var r in production_icons)
			count += Seed.gameData.treasures.friends_boxes_qty[r];
		if (Data.options.contacts.collect_treas && count && nvl(Seed.gameData.treasures.boxes_by_users[this_user_id],0) < 3) collect = true;
		t.step++;
		t.percent = toNum(t.step * 100 / t.steps);
		var steptext = 'Visite du château de <b>'+ user.fullname +'</b>'+ (collect ? '\net collecte des tributs' : '') +'...';
		progressBar.update ({ step:t.percent, stepText:steptext });
		VisitUsers.startVisit (this_user_id, collect, function(rslt) {
			t.users.shift();
			if (!rslt.cyborg_created) t.step--;
			progressBar.update ({ step:t.percent, stepText:rslt.msg });
			actionLog(rslt.msg);
			var remains = Seed.statics.cyborgs.daily_limit_for_others + getSkillsBonus(Seed.skills.types_id.CYBORGS_COUNT) - Seed.gameData.cyborgs.created_for_user_ids.length;
			if (t.users.length > 0 && t.users[0] && t.users[0].id && remains > 0)
				setTimeout(t.visitNext,1000);
			else {
				progressBarPop.destroy();
				if (t.notify) t.notify(true);
			}
			return;
		});
	},
	startVisit : function (user_id, to_collect, callback){
		var user = Seed.gameData.userNotes[user_id];
		var segment_id = null, cyborg_created = false;
		var msg = 'Visite du château de <b>'+ user.fullname +'</b> : ';
		function deal_step (current_step) {
			switch ( current_step ) {
				case 1:
					var segment_id = ((user.segment_id == undefined || user.segment_id == null) ? Seed.dfltSegmentId : user.segment_id);
					VisitUsers.visitCmd (user_id.toString(), segment_id, function (res){
						if (res.done){
							deal_step(current_step + 1);
						} else {
							if (callback) callback({done:false,
													msg:'Erreur lors de la visite chez <b>'+user.fullname+'</B><br>'+(res.errmsg || ''),
													cyborg_created:false});
							return;
						}
					});
					break;
				case 2:
					if (VisitUsers.current.gameData && VisitUsers.current.gameData.city && VisitUsers.current.gameData.city.buildings) {
						var buildings = VisitUsers.current.gameData.city.buildings, found = false, labo_lvl = 0;
						for (var b=0; b<buildings.length && !found; b++) {
							if (buildings[b].type == cyborg_labo_type) {
								found = true;
								labo_lvl = buildings[b].level;
							}
						}
						var is_own_cyborg = false;
						for (var x=0; x<Seed.gameData.cyborgs.cyborg_user_ids.length && !is_own_cyborg; x++) {
							if (Seed.gameData.cyborgs.cyborg_user_ids[x] == user_id) is_own_cyborg = true;
						}
						var already_created = false;
						for (var x=0; x<Seed.gameData.cyborgs.created_for_user_ids.length && !already_created; x++) {
							if (Seed.gameData.cyborgs.created_for_user_ids[x] == user_id) already_created = true;
						}
						if (labo_lvl > 0 && !already_created) {	//&& !is_own_cyborg 
							Cyborgs.createForUserCmd (user_id, function (cyb_res){
								if (cyb_res.done) {
									cyborg_created = true;
									msg += '<b>Spettro créé</b>. ';
								} else 
									msg += 'Erreur lors de la création du Spettro.<br>'+(cyb_res.errmsg || '');
								deal_step(current_step + 1);
							});
						} else {
							var sep = '';
							msg += 'Spettro non créé (';
							if (labo_lvl <= 0) { msg += 'pas de crypte'; sep = ', '; }
							if (is_own_cyborg) { msg += sep+'est déjà dans mes Spettros'; sep = ', '; }
							if (already_created) { msg += sep+'déjà créé aujourd\'hui'; sep = ', '; }
							msg += ') ';
							deal_step(current_step + 1);
						}
					} else deal_step(current_step + 1);
					break;
				case 3:
					if (to_collect) {
						Treasures.getTreasures (user_id, function (treas_res){
							if (treas_res.done)
								msg += '<b>'+treas_res.count+'</b> tributs collectés';
							else msg += 'Erreur lors de la collecte des tributs.<br>'+(treas_res.errmsg || '');
							deal_step(current_step + 1);
						});
					} else  deal_step(current_step + 1);
					break;
				case 4:
					if (callback) callback({done:true, msg:msg, cyborg_created:cyborg_created});
					return;
					break;
			}
		}
		deal_step (1);
	},
	visitCmd : function (this_id, segment_id, callback){
		new MyAjaxRequest (Seed.segments[segment_id].server, Seed.segments[segment_id].segment, 'VisitUser2', this_id, function (rslt) {
			if (rslt.ok && rslt.dat) {
				//logit('VisitUsers.visitCmd rslt = '+JSON.stringify(rslt.dat));
				try {
					VisitUsers.current.gameData = cloneProps(jsonDto.getUserGameData(rslt.dat.g));
					VisitUsers.current.gameData.normalizationTimeMs = rslt.dat.g.t;
				} catch (e) {
					rslt.ok = false;
					rslt.errmsg = e.toString();
					verboseLog('VisitUsers.visitCmd.gameData a retourné l\' erreur : ' + rslt.errmsg + ' généré par ' + jsonDto.step);
					if (callback) callback({done:false, errmsg:rslt.errmsg});
					return;
				}
				if (callback) callback({done:true});
				return;
			} else {
				verboseLog('VisitUsers.visitCmd a échoué avec l\' erreur : ' + rslt.errmsg);
				if (callback) callback({done:false, errmsg:rslt.errmsg});
				return;
			}
		}, true);
	}
}
/******************************** VisitUsers package *************************/

/******************************** Wackoscript package ************************/
var WackoScript = {
	/* Didi  : Internet Ressource manager */
	url_binary_file : [],

	init : function () {
		var t=WackoScript;
		for (var type in Data.options.sound) {
			if (/URL_/.test(type))
				t.url_binary_file.push({url : Data.options.sound[type], type : type, load_timer : null, retries : 0});
		}
		for (var i=0; i<t.url_binary_file.length; i++)
			t.url_binary_file[i].load_timer = setTimeout(t.LoadBinary,1000,t.url_binary_file[i].url,i,false);
	},
	LoadBinary : function (url, index, degraded) {
		var t=WackoScript, p = {}, method = 'GET';
		if (degraded && url.indexOf('wackoscripts') > 0) { /* manage www string for wackoscripts URL (SSL certificate that needs www for chrome, and not for FF) */
			if (url.indexOf('//www.') > 0) url = url.replace('//www.','//');
			else url = url.replace('//wacko','//www.wacko');
		}
		new MyAjaxRequest(url, '', '', p, mycb, false, true);
		function mycb(rslt) {
			if (rslt.ok) {
				logit('url '+url+' loaded ==> OK');
				var type = t.url_binary_file[index].type;
				if ((/URL_/.test(type)) && Data.options.sound[type] != url) { Data.options.sound[type] = url; logit ('Nouvelle url pour Data.options.sound.'+type+' = '+url); }
			} else {
				clearTimeout(t.url_binary_file[index].load_timer);
				t.url_binary_file[index].retries++;
				t.url_binary_file[index].load_timer = null;
				if (t.url_binary_file[index].retries < 6) {
					logit('url '+url+' not loaded ==> Retry in 5 seconds');
					t.url_binary_file[index].load_timer = setTimeout(t.LoadBinary,5000,url,index,true);
				} else {
					logit('url '+url+' not loaded ==> This sound won\'t probably work when needed...');
				}
			}
			return;
		}
	}
};
/******************************** Wackoscript package ************************/

/* *******************************************   TABS   ******************************************* */

/******************************** Info Tab ***********************************/
Tabs.Info = {
	tabOrder		: INFO_TAB_ORDER,
	tabLabel		: 'Info',
	tabDisabled		: !INFO_TAB_ENABLE,
	container		: null,
	timer			: null,
	contentType		: 0, /* 0 = overview, 1 = Pistage */
	infoScrollPos	: 0,
	lastSubTab		: 'tabInfoOverview',
	refreshPlayerBusy : false,
	collectInProgress : false,
	marches			: {},
	old_marches		: {},
	cancellingMarch	: false,

	init : function (div){
		var t = Tabs.Info;
		t.container = div;
		div.innerHTML = '<div class=bsx_title_main style="padding-top:3px; padding-bottom:3px;">'
		+'<table width=80% align=center>'
		+'	<tr align=center><td width="100px"><a id=tabInfo_ScriptUpdate style="color:#FFFFFF;text-decoration:none;">Mise à jour</a></td>'
		+'		<td width="100px"><a href="'+ Data.options.wikiUrl + '" target="_blank" style="color:#FFFFFF;text-decoration:none;">Wiki ?</a></td>'
		+'		<td width="100px"><a href="'+ Data.options.forumUrl + '" target="_blank" style="color:#FFFFFF;text-decoration:none;">Forum ?</a></td>'
		+'</tr></table></div>'
		+'<table width=100%><tr>'
		+'	<td width=25%><input id=tabInfo_Refresh type=button value="Actualiser"></input></td>'
		+'	<td width=25% align=center><input id=tabInfo_Toggle type=button value="Switcher Flash"></input></td>'
		+'	<td width=25% align=center>&nbsp;</td>'
		+'	<td width=25% align=center><input id=tabInfo_Collect type=button value="Collecter tributs"></input></td>'
		+'</tr></table>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=tabInfoOverview>Vue d\'ensemble</a></li>'
		+'	<li class="tab"><a id=tabInfoMarches>Pistage</a></li>'
		+'</ul>'
		+'<div id=tabInfo_Content class="scrollable" style="margin-top:1px !important; height:650px; max-height:650px;"></div>';
		document.getElementById('tabInfo_Refresh').addEventListener ('click', t.refresh, false);
		document.getElementById('tabInfo_Toggle').addEventListener ('click', toggleFlash, false);
		document.getElementById('tabInfoOverview').addEventListener ('click', t.tabInfoOverview, false);
		document.getElementById('tabInfoMarches').addEventListener ('click', t.tabInfoMarches, false);
		document.getElementById('tabInfo_ScriptUpdate').addEventListener ('click', AutoUpdater.manualCheck, false);
		var collectAllBut = document.getElementById('tabInfo_Collect');
		if (collectAllBut) {
			var boxes = 0;
			for (var r in production_icons)	boxes += (Seed.gameData.treasures.user_boxes_qty[r] || 0);
			if (boxes > 0) {
					collectAllBut.addEventListener ('click', t.collectTreasures, false);
					setButtonStyle (collectAllBut, true, 'btn_blue');
			} else  setButtonStyle (collectAllBut, false, 'btn_blue');
		}
		t.contentType = Data.options.info.current_tab;
		t.show();
	},
	show : function (){
		var t = Tabs.Info;
		switch (toNum(t.contentType)) {
			case 0: t.tabInfoOverview(); break;
			case 1: t.tabInfoMarches(); break;
		}
	},
	hide : function (){
		var t = Tabs.Info;
		clearInterval (t.timer);
	},
	onUnload : function (){
		var t = Tabs.Info;
		logit ('===============  Tabs.Info.onUnload');
		Data.options.info.current_tab = t.contentType;
		clearInterval (t.timer);
	},
	onScroll : function (event){
		var t = Tabs.Info;
		if (t.contentType == 0) t.infoScrollPos = document.getElementById('tabInfo_Content').scrollTop;
	},

	tabInfoOverview : function (){
		var t = Tabs.Info;
		clearInterval (t.timer);

		document.getElementById(t.lastSubTab).className='';
		document.getElementById(t.lastSubTab).style.zIndex=0;
		document.getElementById('tabInfoOverview').className='selected';
		document.getElementById('tabInfoOverview').style.zIndex=1;
		t.lastSubTab = 'tabInfoOverview';
		t.contentType = 0;
		Data.options.info.current_tab = t.contentType;

		/* maison commune = SectorStatisticsControlBase */
		var player = Seed.gameData.account;
		var city = Seed.gameData.city;
		var m = '<div class=bsx_status_ticker>';
		var my_xp = player.experience, found = false, my_xp_text = '';
		for (var l=0; l<Seed.statics.user_levels.length && !found; l++) {
			if (my_xp < Seed.statics.user_levels[l]) {
				found = true;
                var previous = Seed.statics.user_levels[l-1];
                var current = my_xp - previous;
                var max = Seed.statics.user_levels[l] - previous;
                my_xp_text = ' (' + numf(current,' ') + ' / ' + numf(max,' ') + ')';
			}
		}
		var my_alli = Seed.gameData.alliance, my_alli_text = '';
		if (my_alli.id > 0) {
			my_alli_text = '<font color=yellow>' + my_alli.name + '</font><br>'
						  +'<font color=white>Position '+my_alli.rating_pos+', '+my_alli.membership.members_count+' membres sur '+my_alli.membership.members_limit+'</font>';
		} else my_alli_text = '&nbsp;';
		m += '<div class=bsx_subtitle><table class=bsx_table>'
			+'<tr valign=top>'
			+'	<td align=center width=39px>'+ vignette(Facebook.SND.id) +'</td>'
			+'	<td align=left width=35%><font color=white>'+ Facebook.SND.name + '<br>Niveau '+ player.level + my_xp_text +'</font></td>'
			+'	<td align=left width=30%><font color=white>'+ city.name +'<br>x:'+ player.x +'; y='+ player.y +'</font></td>'
			+'	<td align=center width=35%>'+ my_alli_text +'</td>'
			+'</tr></table></div>';
		/* Statistics */
		m += '<table width=100%>'
			+'<tr valign=middle>'
			+'	<td align=center width=40px title="Points d\'Attaques">'+ vignette2('ui/icons/legend_attack_stats.png',25) +'</td>'
			+'	<td align=left width=70px title="Points d\'Attaques"><div id=attacker_rate></div></td>'
			+'	<td align=center width=40px title="Points de Défense">'+ vignette2('ui/icons/legend_defence_stats.png',25) +'</td>'
			+'	<td align=left width=70px title="Points de Défense"><div id=defender_rate></div></td>'
			+'	<td align=center width=40px title="Points de Raids">'+ vignette2('ui/icons/legend_robbery_stats.png',25) +'</td>'
			+'	<td align=left width=70px title="Points de Raids"><div id=robber_rate></div></td>'
			+'	<td align=center width=40px title="Points de Sièges">'+ vignette2('ui/icons/legend_capture_stats.png',25) +'</td>'
			+'	<td align=left width=70px title="Points de Sièges"><div id=raids_rate></div></td>'
			+'	<td align=center width=40px title="Saphirs">'+ vignette2('ui/quests/icons/saphires.png',25) +'</td>'
			+'	<td align=left width=70px title="Saphirs"><div id=saphir_stck></div></td>'
			+'</tr></table>'
			+'<table width=100%>'
			+'<tr valign=middle>';
		for (var r in production_icons) {
			m += '	<td align=center width=38px title="Tributs '+production_icons[r].desc+'">'+ vignette2(production_icons[r].treasure,25) +'</td>'
				+'	<td align=left width=50px title="Tributs '+production_icons[r].desc+' + ceux chez amis"><div id='+r+'_treas></div></td>';
		}
		m += '	<td align=center width=38px title="Runes crâniènnes">'+ vignette_swf('ui/skillTree/iconNanopodBig.swf',25) +'</td>'
			+'	<td align=left width=50px title="Runes crâniènnes"><div id=runes_stck></div></td>'
			+'	<td align=center width=40px title="Raids disponibles">'+ vignette2('ui/skin_parts/buttons/buttonsMapMenu/global_robbery.png',25) +'</td>' //occupation.png
			+'	<td align=left width=30% title="Raids disponibles"><div id=raids_avail></div></td>'
			+'</tr></table>'
			+'<table style="margin-top:3px" width=100% class=row_style>'
			+'	<tr class=row_headers align=center>'
			+'		<td width=35px>Type</td>'
			+'		<td width=17% colspan=2>Par Heure</td>'
			+'		<td width=17% colspan=2>Production</td>'
			+'		<td width=17% colspan=2>Consommation</td>'
			+'		<td width=17% colspan=2>Stocks</td>'
			+'		<td width=32% colspan=2>Capacité</td>'
			+'	</tr>';
		for (var r in production_icons) {
			m += '	<tr valign=middle title="'+ production_icons[r].desc +'">'
				+'		<td align=center width=35px>'+ vignette2(production_icons[r].icon,25) +'</td>'
				+'		<td align=right width=16%><div id='+r+'_perh></div></td><td width=10px>&nbsp</td>'
				+'		<td align=right width=16%><div id='+r+'_prod></div></td><td width=10px>&nbsp</td>'
				+'		<td align=right width=16% id='+r+'_cons2><div id='+r+'_cons></div></td><td width=10px>&nbsp</td>'
				+'		<td align=right width=16%><div id='+r+'_stck></div></td><td width=10px>&nbsp</td>'
				+'		<td align=right width=31%><div id='+r+'_limt></div></td><td width=10px>&nbsp</td>'
				+'	</tr>';
		}
		m += '</table>'
			+'<table style="margin-top:3px" width=100%>'
			+'	<tr valign=middle id=building_in_progress>'
			+'		<td width=17% align=left><b>Construction :</b></td>'
			+'		<td align=center width=35px><div id=building_img></div></td>'
			+'		<td align=center width=240px><div id=building_progress></div></td>'
			+'		<td align=left width=30%><div id=building_time></div></td>'
			+'	</tr>'
			+'</table>'
			+'<div id=traing_jobs></div>'
			+'<table style="margin-top:3px" width=100%>'
			+'	<tr valign=middle id=techno_in_progress>'
			+'		<td width=17% align=left><b>Art Perdu :</b></td>'
			+'		<td align=center width=35px><div id=techno_img></div></td>'
			+'		<td align=center width=240px><div id=techno_progress></div></td>'
			+'		<td align=left width=30%><div id=techno_time></div></td>'
			+'	</tr>'
			+'</table>'
			+'<table style="margin-top:3px" width=100%>'
			+'	<tr valign=middle id=skill_in_progress>'
			+'		<td width=17% align=left><b>Pouvoir :</b></td>'
			+'		<td align=center width=35px><div id=skill_img></div></td>'
			+'		<td align=center width=240px><div id=skill_progress></div></td>'
			+'		<td align=left width=30%><div id=skill_time></div></td>'
			+'	</tr>'
			+'</table>';
		var catacombes_found = false;
		for (var i=0; i<Seed.gameData.city.buildings.length && !catacombes_found; i++) {
			if (Seed.gameData.city.buildings[i].type == '150') catacombes_found = true;
		}
		if (catacombes_found) {
			m += '<table style="margin-top:3px" width=100%>'
				+'	<tr valign=top>'
				+'		<td width=17% align=left><b>Catacombes :&nbsp;</b></td>'
				+'		<td width=13% align=left><input type=submit class="btn_red small" value="Envoyer" id=tabInfo_SendCatacombes /></td>'
				+'		<td width=70%>&nbsp;</td>'
				+'	</tr>'
				+'</table>'
		}
		m += '<table style="margin-top:3px" width=100% class=row_style>'
			+'	<tr valign=top class=row_headers align=center>'
			+'		<td width=34px>Unité</td>'
			+'		<td width=11% title="Dans le château (en rouge) / Dans les catacombes"><span class=bold_red>Château</span><br>Cachés</td>'
			+'		<td width=11%>Garn.</td>'
			+'		<td width=11%>Mouv.</td>'
			+'		<td width=11%>Total</td>'
			+'		<td width=1%>&nbsp;</td>'
			+'		<td width=34px>Unité</td>'
			+'		<td width=11% title="Dans le château (en rouge) / Dans les catacombes"><span class=bold_red>Château</span><br>Cachés</td>'
			+'		<td width=11%>Garn.</td>'
			+'		<td width=11%>Mouv.</td>'
			+'		<td width=11%>Total</td>';
		for (var g=0; g<unit_groups.length; g++) {
			var cu = 0;
			if (g%2 == 0) {
				cu = 0;
				for (var i=0; i<Seed.units_id.length; i++) {
					var name = Seed.reqs[Seed.units_id[i].id].name;
					var img = Seed.reqs[Seed.units_id[i].id].img;
					if ( !((Seed.reqs[Seed.units_id[i].id].stats.group_id == unit_groups[g].id ||
							toNum(Seed.reqs[Seed.units_id[i].id].stats.group_id - 1) == toNum(unit_groups[g].id)) && (g%2 == 0))) continue;
					if (cu == 0) m += '</tr><tr valign=middle>';
					m += '	<td width="34px" align=center title="'+name+'">' + vignette2(img) + '</td>'
						+'	<td align=right width=11%><div id='+Seed.units_id[i].id+'_city></td>'
						+'	<td align=right width=11%><div id='+Seed.units_id[i].id+'_reinf></td>'
						+'	<td align=right width=11%><div id='+Seed.units_id[i].id+'_move></td>'
						+'	<td align=right width=11%><div id='+Seed.units_id[i].id+'_total></td>';
					if (cu == 0) { m += '<td>&nbsp</td>'; cu++; }
					else if (cu == 1) cu = 0;
				}
			}
		}
		m += '</tr></table></div>';

/*		m += SoundPlayer.alertString.replace('&incoming_spy&',(SoundPlayer.getFirstAlert()).spy).replace('&incoming_attack&',(SoundPlayer.getFirstAlert()).attack);
		m += dispUnits(CAPITAL.id)
		+'<br>'
		+'<table class=' + UID['table'] + ' width=100%>' + dispBoosts()
		+'	<tr>'
		+'		<td class=right width=20%>'+ translate('Marching') +': </td>'
		+'		<td width=30%>'+ Seed.numMarches + dispMarchesCount() +'</td>'
		+'		<td class=right width=20%>'+ translate('Wildernesses') +': </td>'
		+'		<td width=30%>'+ dispWildsCount() +'</td>'
		+'	</tr>'
		+ dispBuildingJob(CAPITAL.id)
		+ dispResearchJob(CAPITAL.id)
		+ dispTrainingJobs(CAPITAL.id)
		+'</table>'
		+'</div>';
*/
		/* Marches, building, research, training */
		setText('tabInfo_Content', m);
		document.getElementById('tabInfo_Content').scrollTop = t.infoScrollPos;
		document.getElementById('tabInfo_Content').addEventListener('scroll', t.onScroll, false);
		var but_catac = document.getElementById('tabInfo_SendCatacombes');
		if (but_catac) but_catac.addEventListener('click', onClickCatacombes, false);
		setSendCatacombesStyle ();

		refreshView();
		t.timer = setInterval (refreshView, 1000);

		function onClickCatacombes () {
			var t = Tabs.Info, troops = cloneProps(Seed.gameData.troops.countByType);
			var popSend = new UnitSendDialog (t.container, order_ids.Bunker, Seed.gameData.account.id, Seed.gameData.account.id, troops, true, function(){popSend.destroy();goPistage();});
		}
		function refreshView () {
			/* User ratings */
			if (!Seed.gameData.rates) Seed.gameData.rates = {attacker:0, defender:0, robber:0, occupant:0, raids:0};
			for (var r in Seed.gameData.rates) setText(r+'_rate', numf(Seed.gameData.rates[r],' '));
			/* Ressources */
			for (var r in production_icons) {
				var conso = toNum(Seed.gameData.account.troop_consumption[r]) + toNum(Seed.gameData.account.consumption[r]);
				setText(r+'_perh', '<b>'+numf(toNum(Seed.gameData.account.per_hour[r]),' ') +' /h</b>');
				setText(r+'_prod', numf(toNum(Seed.gameData.account.production[r]),' ') +' /h');
				setText(r+'_cons', numf(conso,' ') +' /h');
				if (conso != 0) {
					var txt = 'Unités : '+ numf(toNum(Seed.gameData.account.troop_consumption[r]),' ') +' /h\n'
							  +'Bâtiments : '+ numf(toNum(Seed.gameData.account.consumption[r]),' ') +' /h';
					setTitle(r+'_cons2', txt);
				}
				setText(r+'_stck', '<b>'+numf(toNum(Seed.gameData.account.resources[r]),' ')+'</b>');
				var prct_txt = '';
				var percent = toNum(toNum(Seed.gameData.account.resources[r])*100/toNum(Seed.gameData.account.limit[r]));
				if (percent < 50) prct_txt = ' (<b>' + numf(percent,' ') + ' %</b>)';
				else prct_txt = ' (<font color=red><b>' + numf(percent,' ') + ' %</b></font>)';
				setText(r+'_limt', numf(toNum(Seed.gameData.account.limit[r]),' ') + prct_txt);
			}
			setText('runes_stck', '<b>'+numf(toNum(Seed.gameData.skill_data.skill_points),' ')+'</b>');
			setText('saphir_stck', '<b>'+numf(toNum(Seed.gameData.account.resources['saphir']),' ')+'</b>');
			/* Available robbies + next */
			var next = '', now = serverTimeMs();
			if (Seed.gameData.world_data.next_raid && Seed.gameData.world_data.next_raid > now)
				next = ' (+1 dans '+timestrh( (Seed.gameData.world_data.next_raid - now) / 1000)+')';
			setText('raids_avail', '<b>'+numf(toNum(Seed.gameData.world_data.raids),' ')+'</b>'+next);
			/* Tributs */
			for (var r in production_icons) {
				var text = (Seed.gameData.treasures.user_boxes_qty[r] || 0) + (Seed.gameData.treasures.friends_boxes_qty[r] > 0 ? ' + '+Seed.gameData.treasures.friends_boxes_qty[r] : '');
				setText(r+'_treas', text);
			}
			/* Unités */
			for (var i=0; i<Seed.units_id.length; i++) {
				var unit = Seed.gameData.account.troops[Seed.units_id[i].id], in_city_text = '', sep = '';
				if (!unit) unit = {total:0, in_city:0, in_bunker:0, in_reinf:0, in_move:0};
				if (unit.in_city > 0) { in_city_text = '<font color=red><b>'+numf(unit.in_city,' ')+'</b></font>'; sep = '<br>';}
				if (unit.in_bunker > 0) in_city_text += sep+numf(unit.in_bunker,' ');
				setText(Seed.units_id[i].id+'_city',  in_city_text);
				setText(Seed.units_id[i].id+'_reinf', (unit.in_reinf > 0 ? numf(unit.in_reinf,' ') : ' '));
				setText(Seed.units_id[i].id+'_move',  (unit.in_move  > 0 ? numf(unit.in_move,' ') : ' '));
				setText(Seed.units_id[i].id+'_total', (unit.total	  > 0 ? '<b>'+numf(unit.total,' ')+'</b>' : ' '));
			}
			/* Training jobs */
			var jobs = getTrainingJobs ();
			var tj = '<table style="margin-top:3px" width=100%>', title = 'Formations :';
			if (jobs && jobs.length > 0) {
				for (var j=0; j<jobs.length; j++) {
					var end = '', perc = 0;
					if (jobs[j].start_at) {
						var end = (jobs[j].end_at - serverTimeMs())/1000;
						end = timestr(end, true);
						var perc = toNum((serverTimeMs() - jobs[j].start_at) / (jobs[j].end_at - jobs[j].start_at) * 100);
					} else end = 'En attente';
					tj += '<tr valign=middle title="'+ jobs[j].total +' '+ jobs[j].name +'">'
						+'	<td width=17% align=left><b>'+ title +'</b></td>'
						+'	<td align=center width=35px>'+ vignette2(jobs[j].img,30) +'</td>'
						+'	<td align=center width=240px>'+ dispProgress('green',perc) +'</td>'
						+'	<td align=left width=30%><b>'+(jobs[j].total - jobs[j].pending)+' / '+jobs[j].total+'</b> (<font color=' + TIMER_COLOR + '>'+end+'</font>)</td>'
						+'</tr>';
					title = '';
				}
			} else {
				tj += '	<tr valign=middle>'
					+'		<td width=17% align=left><b>'+ title +'</b></td>'
					+'		<td align=center width=35px>&nbsp;</div></td>'
					+'		<td align=center width=240px><span class=bold_red>AUCUNE</span></td>'
					+'		<td align=left width=30%>&nbsp;</td>'
					+'	</tr>';
			}
			tj += '</table>';
			setText('traing_jobs', tj);
			/* Building, Technology & Skill job */
			dispJob('building');
			dispJob('techno');
			dispJob('skill');
			function dispJob (type) {
				var job, color = 'green';
				switch (type) {
					case 'building' : job = getBuildingJob (); break;
					case 'techno' : job = getTechJob (); color = 'yellow'; break;
					case 'skill' : job = getSkillJob (); color = 'purple'; break;
				}
				if (job && job.end_at > serverTimeMs()) {
					var end = (job.end_at - serverTimeMs())/1000;
					setTitle(type+'_in_progress', job.name+' '+(job.level+1));
					setText(type+'_img', vignette2(job.img,30) );
					setText(type+'_time', '<font color=' + TIMER_COLOR + '>'+timestr(end, true)+'</font>');
					var perc = toNum((serverTimeMs() - job.start_at) / (job.end_at - job.start_at) * 100);
					setText(type+'_progress', dispProgress(color,perc));
				} else {
					setTitle(type+'_in_progress', 'Aucune');
					setText(type+'_img', '&nbsp;' );
					setText(type+'_progress', '<span class=bold_red>AUCUNE</span>');
					setText(type+'_time', '&nbsp;');
				}
			}
			/* Style of the button to send troops to catacombes */
			setSendCatacombesStyle ();
		}
		function setSendCatacombesStyle () {
			var tot = 0;
			for (var i in Seed.gameData.troops.countByType) tot += toNum(Seed.gameData.troops.countByType[i]);
			if (document.getElementById('tabInfo_SendCatacombes')) {
				if (tot > 0) setButtonStyle (document.getElementById('tabInfo_SendCatacombes'), true, 'btn_red');
				else setButtonStyle (document.getElementById('tabInfo_SendCatacombes'), false, 'btn_red');
			}
		}
	},
	tabInfoMarches : function (){
		var t = Tabs.Info;
		clearInterval (t.timer);

		document.getElementById(t.lastSubTab).className='';
		document.getElementById(t.lastSubTab).style.zIndex=0;
		document.getElementById('tabInfoMarches').className='selected';
		document.getElementById('tabInfoMarches').style.zIndex=1;
		t.lastSubTab = 'tabInfoMarches';
		t.contentType = 1;
		Data.options.info.current_tab = t.contentType;

		var m = '<div id=tabMarches_divtable>'
			+'	<div class=bsx_title>Pistage</div>'
			+'	<table class=bsx_table style="margin-top:3px" width=100%>'
			+'		<tr valign=top align=left>'
			+'			<td width=25%><input id=tabMarches_CB_myraids type=checkbox '+ (Data.options.info.myraids?'CHECKED ':'') +' /> Mes raids</td>'
			+'			<td width=25%><input id=tabMarches_CB_mysieges type=checkbox '+ (Data.options.info.mysieges?'CHECKED ':'') +' /> Mes sièges</td>'
			+'			<td width=25%><input id=tabMarches_CB_myspies type=checkbox '+ (Data.options.info.myspies?'CHECKED ':'') +' /> Mes espionnages</td>'
			+'			<td width=25%><input id=tabMarches_CB_myreinf type=checkbox '+ (Data.options.info.myreinf?'CHECKED ':'') +' /> Mes renforts</td>'
			+'		</tr><tr valign=top align=left>'
			+'			<td width=25%><input id=tabMarches_CB_otherraids type=checkbox '+ (Data.options.info.otherraids?'CHECKED ':'') +' /> Raids ennemis</td>'
			+'			<td width=25%><input id=tabMarches_CB_othersieges type=checkbox '+ (Data.options.info.othersieges?'CHECKED ':'') +' /> Sièges ennemis</td>'
			+'			<td width=25%><input id=tabMarches_CB_otherreinf type=checkbox '+ (Data.options.info.otherreinf?'CHECKED ':'') +' /> Renforts alliés</td>'
			+'			<td width=25%><input id=tabMarches_CB_garnisons type=checkbox '+ (Data.options.info.garnisons?'CHECKED ':'') +' /> En garnisons</td>'
			+'		<tr valign=top align=left>'
			+'			<td width=25%><input id=tabMarches_CB_mycaravans type=checkbox '+ (Data.options.info.mycaravans?'CHECKED ':'') +' /> Mes caravanes</td>'
			+'			<td width=50% colspan=2><input id=tabMarches_CB_othercaravans type=checkbox '+ (Data.options.info.othercaravans?'CHECKED ':'') +' /> Caravanes en approche</td>'
			+'		</tr>'
			+'	</table><br>'
			+'	<div id=tabMarches_List class=bsx_status_ticker style="height:550px; max-height:550px; overflow:auto; white-space:nowrap; margin-top:1px !important">'
			+'		<table id=tabMarches_table width=100%>' //class=bsx_table 
			+'		</table>'
			+'	</div>'
			+'</div>';
		setText('tabInfo_Content', m);
		document.getElementById('tabInfo_Content').scrollTop = t.infoScrollPos;
		document.getElementById('tabInfo_Content').addEventListener('scroll', t.onScroll, false);
		document.getElementById('tabMarches_CB_myraids').addEventListener ('change', onChangeCB, false);
		document.getElementById('tabMarches_CB_mysieges').addEventListener ('change', onChangeCB, false);
		document.getElementById('tabMarches_CB_myspies').addEventListener ('change', onChangeCB, false);
		document.getElementById('tabMarches_CB_myreinf').addEventListener ('change', onChangeCB, false);
		document.getElementById('tabMarches_CB_otherraids').addEventListener ('change', onChangeCB, false);
		document.getElementById('tabMarches_CB_othersieges').addEventListener ('change', onChangeCB, false);
		document.getElementById('tabMarches_CB_otherreinf').addEventListener ('change', onChangeCB, false);
		document.getElementById('tabMarches_CB_garnisons').addEventListener ('change', onChangeCB, false);
		document.getElementById('tabMarches_CB_mycaravans').addEventListener ('change', onChangeCB, false);
		document.getElementById('tabMarches_CB_othercaravans').addEventListener ('change', onChangeCB, false);

		display_marches();
		t.timer = setInterval (refresh_marches, 1000);

		function display_marches () {
			var t = Tabs.Info, m = '', rownum = 0;
			Seed.dirty_marches = false;
			t.marches = getMarches();
			for (var id in t.marches) {
				var march = t.marches[id], real_type, row_style = '', cancellable = false, recallable = false;
				for (var x in order_ids) {
					var this_type = (march.type == order_ids.Bunker && (march.owner_id != march.target_id || !march.own_march)) ? order_ids.Reinforcement : march.type;
					if (order_ids[x] == this_type) real_type = x.toLowerCase();
				}
				if (rownum % 2 == 0) row_style = "White";
				else row_style = "rgb(239,239,224)";
				if (march.own_march && march.troops && !march.returning && (march.start+51000)>=toNum(serverTimeMs()) && march.end > toNum(serverTimeMs())) cancellable = true;
				if (march.own_march && march.start==0 && march.end==0) recallable = true;
				m += '<tr valign=middle ref='+id+' style="border-top: 1px solid #898989; background-color:'+ row_style +'" title="'+ order_desc[march.type]+march.name +'">'
					+'	<td width="34px" align=center id=march_type_'+id+' style="padding-top:1px; padding-bottom:2px">'
					+ (march.type != -1 ? vignette2('ui/command/'+real_type+'.jpg') : vignette2('ui/command/return.jpg')) + '</td>'
					+'	<td width="34px" align=center>' + vignette(Facebook.SND.id, false, '', 30) + '</td>'
					+'	<td width=245px align=center><div id=march_progress_'+id+'></div></td>'
					+'	<td width="34px" align=center>' + march.img + '</td>'
					+'	<td align=left width=15%><div id=march_time_'+id+'></div></td>'
					+'	<td align=left width=10%><input type=submit class="btn_green small" value="&nbsp;'+(march.detail ? '-' : '+')+'&nbsp;" style="width:20px;" id="march_detail_'+id+'" ref="'+id+'" />&nbsp;'
					+(cancellable ? '<input type=submit class="btn_red small" title="Annuler la marche" value="&nbsp;X&nbsp;" style="width:20px;" id="march_cancel_'+id+'" ref="'+id+'" />' : '')
					+(recallable ? '<input type=submit class="btn_red small" title="Rappeler les unités" value="&nbsp;&lt&lt&nbsp;" style="width:20px;" id="march_recall_'+id+'" ref="'+id+'" />' : '')+'</td>'
					+'</tr>';

				if (march.troops && march.troops.troops) {
					var grps = [], header = '', this_grp = '', tc = 0, last = 0;
					for (var g=0; g<8; g++) {
						if (g % 2 == 0) {
							if (!is_null(this_grp)) {
								if (tc > 0) {
									for (var c=tc; c<=7; c++) this_grp += '<td width=14%>&nbsp;</td>';
									this_grp += '</tr>';
								}
								grps.push({id:unit_groups[last].id, txt:header + this_grp});
							}
							this_grp = '';
							tc = 0;
							header = '<tr class=left valign=top><td align=left width=99% colspan=6><b>'+ unit_groups[g].desc +'</b></td></tr><tr valign=top>';
						}
						for (var i in march.troops.troops) {
							if (Seed.reqs[i].stats.group_id == unit_groups[g].id) {
								var name = Seed.reqs[i].name;
								var img = Seed.reqs[i].img;
								var gap = '';
								if (Seed.old_in_march[id] && march.returning) {
									if (Seed.old_in_march[id][i] && Seed.old_in_march[id][i] != march.troops.troops[i]) {
										var diff = march.troops.troops[i] - Seed.old_in_march[id][i];
										if (diff < 0) gap = ' (<span class=red>' + numf(diff,' ') + '</span>)';
										else if (diff > 0) gap = ' (<span class=green>+' + numf(diff,' ') + '</span>)';
										else gap = '';
									}
								}
								if (tc == 0) this_grp += '<tr>';
								this_grp += '<td width=14% align=left title="'+name+'">'+ vignette2(img) +'<br>'+ numf(march.troops.troops[i],' ') + gap +'</td>';
								tc ++;
								if (tc >= 7) {
									tc = 0;
									this_grp += '</tr>';
								}
							}
						}
						last = g;
					}
					if (!is_null(this_grp)) grps.push({id:unit_groups[last].id, txt:header + this_grp});
					grps.sort(function(a,b){return b.id-a.id});
					m += '<tr valign=top background-color:'+ row_style +';">'
						+'	<td colspan=6 style="padding-top:1px; padding-bottom:2px"><table width=100% id="march_row_trp_'+id+'" style="display:'+(march.detail ? 'block' : 'none')+'">'
						+'	<tr valign=top align=left style="background-color:'+ row_style +';">'
						+'		<td width=49%>'
						+'			<table width=100%>';
						for (g=0; g<Math.ceil(grps.length/2); g++) m += grps[g].txt;
					m += '			</table>'
						+'		</td><td width=1%>&nbsp;</td>'
						+'		<td width=49%>'
						+'			<table width=100%>';
						for (g=Math.ceil(grps.length/2); g<grps.length; g++) m += grps[g].txt;
					m += '			</table>'
						+'		</td>'
						+'	</tr>'
						+'</table></td></tr>';
				}
				if (march.trading) {
					var draw = march.trading.drawing_part;
					if (draw) {
						var name = Seed.reqs[draw.type].name;
						var img = Seed.reqs[draw.type].img;
						img = (img.length > 4 ? img.substr(0,img.length-4)+'_t.png' : img);
						m += '<tr valign=top style="background-color:'+ row_style +';">'
							+'	<td colspan=6 style="padding-top:1px; padding-bottom:2px" title="'+name+' n°'+(draw.part+1)+'">'
							+'		<div id="march_row_trd_'+id+'" style="display:'+(march.detail ? 'block' : 'none')+'">'+ vignette2(img) +'&nbsp'+name+' n°'+(draw.part+1)+'</div>'
							+'	</td>'
							+'</tr>';
					}
				}
				if ((march.trading && march.trading.resources) || (march.troops && march.troops.resources)) {
					var res = (march.trading && march.trading.resources) ? march.trading.resources : march.troops.resources;
					m += '<tr valign=middle style="background-color:'+ row_style +';">'
						+'	<td colspan=6 style="padding-top:1px; padding-bottom:2px"><table width=100% id="march_row_res_'+id+'" style="display:'+(march.detail ? 'block' : 'none')+'">'
						+'	<tr valign=middle align=left>'
					for (var r in production_icons) {
						if (res[r] > 0)
							m += '	<td width=25% align=left style="padding-top:1px; padding-bottom:2px" title="'+ res[r] +' '+production_icons[r].desc +'">'
								+ vignette2(production_icons[r].icon,25) +'&nbsp;&nbsp;'+numf(res[r],' ')+'</td>';
					}
					m += '		</tr></table>'
						+'	</td>'
						+'</tr>';
				}
				rownum++;
			}
			setText('tabMarches_table', m);
			for (var id in t.marches) {
				if (document.getElementById('march_detail_'+id)) document.getElementById('march_detail_'+id).addEventListener('click', switch_detail, false);
				if (document.getElementById('march_cancel_'+id)) document.getElementById('march_cancel_'+id).addEventListener('click', onClickCancel, false);
				if (document.getElementById('march_recall_'+id)) document.getElementById('march_recall_'+id).addEventListener('click', onClickRecall, false);
			}
			refresh_marches ();
		}
		function refresh_marches () {
			var t = Tabs.Info;
			if (Seed.dirty_marches) {
				display_marches ();
				return;
			}
			var now = toNum(serverTimeMs());
			for (var id in t.marches) {
				var march = t.marches[id], perc = 100, color = '';
				var time_left = march.end - now;
				if (!time_left) time_left = 0;
				var time_format;
				if (time_left < 0 && march.type != order_ids.Bunker) time_format = '...';
				else if (isNaN(time_left) || (time_left < 0 && march.type == order_ids.Bunker)) time_format = '---';
				else {
					time_format = '<font color=' + TIMER_COLOR + '>'+timestr(time_left/1000, true)+'</font>';
					perc = toNum((now - march.start) / (march.end - march.start) * 100);
				}
				if (!isNaN(time_left) && time_left > 0 && !march.cancelled) {
					switch (march.type) {
						case order_ids.Return		 : setText('march_progress_'+id, dispProgress('blue', perc, march.own_march)); break;
						case order_ids.Reinforcement : setText('march_progress_'+id, dispProgress('green', perc, !march.own_march)); break;
						case order_ids.Bunker		 :
							if (march.returning)
								 setText('march_progress_'+id, dispProgress('blue', perc, march.own_march));
							else setText('march_progress_'+id, dispProgress('purple', perc, !march.own_march));
							break;
						case order_ids.Resources	 :
						case order_ids.Draws		 :
							if (march.returning)
								 setText('march_progress_'+id, dispProgress('blue', perc, march.own_march));
							else setText('march_progress_'+id, dispProgress('yellow', perc, !march.own_march));
							break;
						default : setText('march_progress_'+id, dispProgress('red', perc, !march.own_march)); break;
					}
					if (march.own_march && march.troops && !march.returning && (march.start+51000)<now) {
						if (document.getElementById('march_cancel_'+id)) setButtonStyle (document.getElementById('march_cancel_'+id), false, 'btn_red');
					}
				} else {
					var status = '', type1 = '', type2 = '', status2 = ' (attente de mise à jour)';
					switch (march.target_type) {
						case 'raid'		 : type1 = ' le champ de bataille'; break;
						case 'beacon'	 : type1 = ' le phare'; type2 = 'Ton phare '; break;
						case 'location'	 : type1 = ' l\'implantation'; type2 = 'Ton implantation '; break;
						default : type1 = ' le château'; type2 = 'Ton château '; break;
					}
					if (march.own_march) {
						switch (march.type) {
							case order_ids.Intelligence	 : status = 'Tes espions entrent dans'; break;
							case order_ids.Robbery		 : status = 'Tes forces entrent dans'; break;
							case order_ids.Occupation	 : status = 'Tes forces occupent'; status2 = ''; break;
							default : status = 'Tes forces defendent'; status2 = ''; break;
						}
						status += type1+'...'+status2;
						document.getElementById('march_progress_'+id).parentNode.style.textAlign = 'right';
					} else {
						switch (march.type) {
							case order_ids.Robbery		 : status = 'subit un raid'; break;
							case order_ids.Occupation	 : status = 'est assiégé'; status2 = ''; break;
							default : status = 'est défendu'; status2 = ''; break;
						}
						status = type2+status+'...'+status2;
						document.getElementById('march_progress_'+id).parentNode.style.textAlign = 'left';
					}
					if (march.own_march && march.type == order_ids.Bunker && march.owner_id == march.target_id) status = 'Dans les catacombes';
					if (march.cancelled) status = 'Marche annulée';
					setText('march_progress_'+id, '<span class=bold_red>'+ status +'</span>');
				}
				setText('march_time_'+id, time_format);
			}
		}
		function getMarches () {
			var t = Tabs.Info, marches = {};
			if (!Seed.gameData || !Seed.gameData.world_data || !Seed.gameData.world_data.units) return marches;
			t.old_marches = cloneProps(t.marches);
 // logit('Seed.gameData.world_data.units = '+JSON.stringify(Seed.gameData.world_data.units));
			for (var i=0; i<Seed.gameData.world_data.units.length; i++) {
				var unit = Seed.gameData.world_data.units[i], own_march = false, returning = false, type = '', name = '', img = '', target_type, start = 0, end = 0;
				var target_id = unit.target_id;
				if (unit.target_id == Seed.gameData.account.id && unit.owner_id != Seed.gameData.account.id) target_id = unit.owner_id;
				else own_march = true;
				if (!is_null(unit.trading_payload)) {
					if (!is_null(unit.trading_payload.drawing_part)) type = order_ids.Draws;
					else if (!is_null(unit.trading_payload.resources)) type = order_ids.Resources;
					else type = (t.old_marches[unit.id] ? t.old_marches[unit.id].type : order_ids.Resources);
				} else if (!is_null(unit.troops_payload)) {
					if (is_null(unit.state_moving_forward) && is_null(unit.state_moving_back) && (unit.troops_payload.order == order_ids.Reinforcement ||unit.troops_payload.order == order_ids.Bunker))
						 type = order_ids.Bunker;
					else if (!is_null(unit.state_moving_back) && own_march && unit.troops_payload.order != order_ids.Bunker)
						 type = order_ids.Return;
					else type = unit.troops_payload.order;
				} else {
					type = -1;
				}
				if (!is_null(unit.state_moving_back)) {
					start = unit.state_moving_back.departure;
					end   = unit.state_moving_back.arrival;
					returning = !returning;
				} else if (!is_null(unit.state_moving_forward)) {
					start = unit.state_moving_forward.departure;
					end   = unit.state_moving_forward.arrival;
				}
				if (unit.target_type == '0' && target_id >= 0) {
					target_type = 'user';
					var note = Seed.gameData.userNotes[target_id];
					if (!is_null(note)) {
						var dist = getDistance(Seed.gameData.account.x, Seed.gameData.account.y, note.x, note.y);
						var fbid = (note.social_id ? (note.social_id.indexOf("fb")>=0 ? note.social_id.substr(2) : note.social_id.fbid) : '');
						name = ' : '+note.fullname+' ('+note.level+') X:'+note.x+', Y:'+note.y+' (Dist '+dist+' Km)';
						img  = (name ? (fbid ? vignette(fbid, false, '', 30) : vignette(note.avatar, true, '', 30)) : '');
					}
					if (unit.target_id == unit.owner_id && own_march && type == order_ids.Bunker)
						img = vignette2('ui/command/bunkerAvatar.jpg');
				} else if (target_id < 0) {
					var new_id = target_id * -1;
					var note = Seed.gameData.locationNotes[new_id];
					if (!is_null(note)) {
						var dist = getDistance(Seed.gameData.account.x, Seed.gameData.account.y, note.x, note.y);
						name = ' : '+note.name+' X:'+note.x+', Y:'+note.y+' (Dist '+dist+' Km)';
						if (note.mine_info) {
							target_type = 'location';
							var z = '01';
							if (note.mine_info.type > 9)  z = note.mine_info.type;
							img = vignette2('ui/globalMap/mines/mine_'+z+'_ps.jpg');
						} else if (note.tower_info) {
							target_type = 'beacon';
							img = vignette2('ui/globalMap/towers/tower0'+ note.tower_info.level+'.jpg');
						}
					}
				} else {
					var note = Seed.gameData.raid_data.locations[target_id];
					if (!is_null(note)) {
						target_type = 'raid';
						var dist = getDistance(Seed.gameData.account.x, Seed.gameData.account.y, note.x, note.y);
						var req = Seed.statics.raid_types[note.type];
						name = ' : '+req.name+' ('+note.level+')  X:'+note.x+', Y:'+note.y+' (Dist '+dist+' Km)';
						img = vignette2('ui/globalMap/raids/rl'+(note.type < 10 ? '0' : '')+ note.type+'.jpg');
					}
				}
				var keep = returning;
				if (Data.options.info.myraids		&& type == order_ids.Robbery		&&  own_march) keep = true;
				if (Data.options.info.mysieges		&& type == order_ids.Occupation		&&  own_march) keep = true;
				if (Data.options.info.myspies		&& type == order_ids.Intelligence	&&  own_march) keep = true;
				if (Data.options.info.myreinf		&& type == order_ids.Reinforcement	&&  own_march) keep = true;
				if (Data.options.info.otherraids	&& type == order_ids.Robbery		&& !own_march) keep = true;
				if (Data.options.info.othersieges	&& type == order_ids.Occupation		&& !own_march) keep = true;
				if (Data.options.info.otherreinf	&& type == order_ids.Reinforcement  && !own_march) keep = true;
				if (Data.options.info.garnisons		&& type == order_ids.Bunker) keep = true;
				if (Data.options.info.mycaravans	&& (type == order_ids.Draws || type == order_ids.Resources) &&  own_march) keep = true;
				if (Data.options.info.othercaravans	&& (type == order_ids.Draws || type == order_ids.Resources) && !own_march) keep = true;
				var march = {own_march:own_march, type:type, returning:returning, owner_id:unit.owner_id, target_id:target_id,
							 target_type:target_type, name:name, img:img, start:start, end:end, trading:unit.trading_payload, troops:unit.troops_payload,
							 detail:(t.old_marches[unit.id] ? t.old_marches[unit.id].detail : false), cancelled:(unit.cancelled || false)};
				if (keep) marches[unit.id] = march;
			}
			return marches;
		}
		function switch_detail (event) {
			var t = Tabs.Info;
	 		var id = event.target.getAttribute('ref');
			var march = t.marches[id];
			if (march) {
				march.detail = !march.detail;
				if (document.getElementById('march_detail_'+id)) document.getElementById('march_detail_'+id).value = (march.detail ? '-' : '+');
				if (document.getElementById('march_row_trp_'+id)) document.getElementById('march_row_trp_'+id).style.display = (march.detail ? 'block' : 'none');
				if (document.getElementById('march_row_trd_'+id)) document.getElementById('march_row_trd_'+id).style.display = (march.detail ? 'block' : 'none');
				if (document.getElementById('march_row_res_'+id)) document.getElementById('march_row_res_'+id).style.display = (march.detail ? 'block' : 'none');
				refresh_marches ();
			}
		}
		function onClickCancel (event){
			var t = Tabs.Info;
	 		var id = event.target.getAttribute('ref');
			var march = t.marches[id];
			if (t.cancellingMarch || !march) return;
			t.cancellingMarch = true;
			var dial = new ModalDialog (t.container, 300, 165, '', false, null);
			dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
			dial.getContentDiv().innerHTML = 'Annulation de la marche...';
			cancelMarch(id, function(rslt){
				logit('****** Setting cancellingMarch to FALSE');
				Tabs.Info.cancellingMarch = false;
				Seed.dirty_marches = true;
				if (rslt.done){
					actionLog(rslt.msg);
					dial.getContentDiv().innerHTML = rslt.msg;
					setTimeout (function(){dial.destroy();}, 4000);
					return;
				} else {
					dial.getContentDiv().innerHTML = rslt.msg;
					dial.allowClose (true);
					return;
				}
			});
		}
		function cancelMarch (march_id, callback) {
			var t = Tabs.Info;
			var data = AutoRefresh.createRequestData({"i":march_id});
			new MyAjaxRequest (C.attrs.defaultServer, C.attrs.defaultSegment, 'CancelUnit', JSON.stringify(data), function (rslt) {
				if (rslt.ok && rslt.dat) {
					var is_updated = Seed.updateGameData (rslt.dat);
					if (!is_updated) {
						/* Set end of march to now-10secs. This will remove the march and update troops count by the Seed.tick */
						var found = false;
						for (var i=0; i<Seed.gameData.world_data.units.length && !found; i++) {
							var unit = Seed.gameData.world_data.units[i];
							if (unit.id == march_id) {
								found = true;
								Seed.gameData.world_data.units[i].cancelled = true;
								if (!is_null(unit.state_moving_forward)) {
									Seed.gameData.world_data.units[i].state_moving_forward.arrival = toNum(serverTimeMs())-10000;
								}
							}
						}
					}
					if (callback) callback({done:true, msg:'Marche annulée'});
				} else {
					if (callback) callback({done:false, msg:'Erreur lors de l\'annulation<br>'+(rslt.errmsg || '')});
				}
				return;
			}, true);
		}
		function onClickRecall (event) {
			var t = Tabs.Info;
	 		var id = event.target.getAttribute('ref');
			var march = t.marches[id];
			if (march) var popSend = new UnitSendDialog (t.container, order_ids.Return, march.owner_id, march.target_id, march.troops.troops, true, function(){popSend.destroy();});
		}
		function onChangeCB (event) {
			var t = Tabs.Info;
	 		var ids = event.target.id.split('_');
			Data.options.info[ids[2]] = event.target.checked;
			display_marches ();
		}
	},

	refresh : function (){
		var t = Tabs.Info;
		logit('refresh from Tab.Info');
		if (t.refreshPlayerBusy) return false;
		t.refreshPlayerBusy = true;
		refreshGameData (t.container, function(){t=Tabs.Info; t.refreshPlayerBusy = false; t.show();});
	},
	collectTreasures : function (){
		var t = Tabs.Info;
		if (t.collectInProgress) return false;
		t.collectInProgress = true;
		Treasures.collectAll(t, Seed.gameData.account.id, function(){logit('****** Setting collectInProgress to FALSE'); Tabs.Info.collectInProgress = false});
		return true;
	}
}
/******************************** Info Tab ***********************************/

/******************************** Contacts Tab *******************************/
Tabs.Contacts = {
	tabOrder		: CONTACTS_TAB_ORDER,
	tabLabel		: 'Contacts',
	tabDisabled		: !CONTACTS_TAB_ENABLE,
	container		: null,
	timer			: null,
	contentType		: 0, /* 0 = contacts list, 1 = Targets list */
	lastSubTab		: 'tabContactsList',
	contact_list	: null,
	target_list		: null,
	createCyborgInProgress : false,
	checkMapBusy	: false,

	init : function (div){
		var t = Tabs.Contacts;
		t.container = div;
		var m = '<div class=bsx_title>Contacts</div>'
			+'<ul class=tabs>'
			+'	<li class="tab first"><a id=tabContactsList>Spettros</a></li>'
			+'	<li class="tab"><a id=tabTargetList>Cibles</a></li>'
			+'</ul>'
			+'<div id=tabContacts_Content style="padding-top:0px; height:665px; ; max-height:665px; overflow-y:auto"></div>';

		t.container.innerHTML = m;
		document.getElementById('tabContactsList').addEventListener ('click', t.tabContactsList, false);	
		document.getElementById('tabTargetList').addEventListener ('click', t.tabTargetList, false);	
		window.addEventListener('unload', t.onUnload, false);
		t.contentType = toNum(Data.options.contacts.current_tab);
		t.show();
	},
	show : function (){
		var t = Tabs.Contacts;
		switch (toNum(t.contentType)) {
			case 0: t.tabContactsList(); break;
			case 1: t.tabTargetList(); break;
		}
	},
	onUnload : function (){
		var t = Tabs.Contacts;
		logit ('===============  Tabs.Contacts.onUnload');
		clearInterval (t.timer);
		Data.options.contacts.current_tab = t.contentType;
	},
	hide : function (){
		var t = Tabs.Contacts;
		clearInterval (t.timer);
	},

	/** CONTACTS LIST SUB-TAB ***/
	tabContactsList : function (){
		var t = Tabs.Contacts;
		document.getElementById(t.lastSubTab).className='';
		document.getElementById(t.lastSubTab).style.zIndex=0;
		document.getElementById('tabContactsList').className='selected';
		document.getElementById('tabContactsList').style.zIndex=1;
		t.lastSubTab = 'tabContactsList';
		t.contentType = 0;
		clearInterval (t.timer);

		if (is_null(Data.options.contacts.sort_list)) Data.options.contacts.sort_list = '1';
		var boxes = 0;
		var cyborgs_bonus = getSkillsBonus(Seed.skills.types_id.CYBORGS_COUNT);
		var my_cyborgs = Seed.gameData.cyborgs.cyborg_user_ids.length;
		var my_limit = Seed.statics.cyborgs.own_limit + cyborgs_bonus;
		var daily_limit = Seed.statics.cyborgs.daily_limit + getCyborgsPerDay ();
		var daily_remain = daily_limit - Seed.gameData.cyborgs.created;
		var visit_limit = Seed.statics.cyborgs.daily_limit_for_others + cyborgs_bonus;
		var visit_remain = visit_limit - Seed.gameData.cyborgs.created_for_user_ids.length;

		var m = '<div id=tabContacts_Results style="height:640px">'
			+'	<div class=bsx_title>Liste des contacts</div>'
			+'	<table class=bsx_table style="margin-top:3px" width=100%>'
			+'		<tr valign=top align=left>'
			+'			<td width=16% align=left><label>Mes Spettros : </label></td>'
			+'			<td width=10% align=left><span id=tabContacts_myCyborgs></span></td>'
			+'			<td width=17% align=left><label>Âmes disponibles : </label></td>'
			+'			<td width=10% align=left><span id=tabContacts_daily></span></td>'
			+'			<td width=19% align=left><label>Spettros chez amis : </label></td>'
			+'			<td width=10% align=left><span id=tabContacts_visits></span></td>'
			+'			<td align=right width=18%><table><tr>';
		for (var r in production_icons) {
			m += '<td align=center width=33% title="Tributs '+production_icons[r].desc+'">'+ vignette2(production_icons[r].treasure,15) +'&nbsp;<span id=tabContacts'+r+'_treas></span>&nbsp;</td>';
		}
		m += '</tr></table></td>'
			+'		</tr></table>'
			+'	<table class=bsx_table width=100%>'
			+'		<tr valign=top align=left>'
			+'			<td width=28% colspan=2><input id=tabContacts_CB_View type=checkbox '+ (Data.options.contacts.detailled_view?'CHECKED ':'') +' /> Vue détaillée</td>'
			+'			<td colspan=4><input id=tabContacts_CB_Done type=checkbox '+ (Data.options.contacts.hide_created?'CHECKED ':'') +' /> Masquer les Spettros créés</td>'
			+'			<td width=20%><input id=tabContacts_CB_Treas type=checkbox '+ (Data.options.contacts.collect_treas?'CHECKED ':'') +' /> Collecter les tributs</td>'
			+'		</tr><tr valign=top align=left>'
			+'			<td width=1%><input type=radio name="tabContacts_Filter" value="0" /></td>'
			+'			<td width=19% align=left><label>Tous mes amis</label></td>'
			+'			<td width=1%><input type=radio name="tabContacts_Filter" value="1" /></td>'
			+'			<td width=19% align=left><label>Amis de ma ligue</label></td>'
			+'			<td width=1%><input type=radio name="tabContacts_Filter" value="2" /></td>'
			+'			<td width=19% align=left><label>Amis hors ligue</label></td>'
			+'			<td width=20%><input type=button value="Visiter sélection" id=tabContacts_VisitAll /></td>'
			+'		</tr>'
			+'	</table><br>'
			+'	<div id=tabContacts_ResultList class=bsx_status_ticker style="height:550px; max-height:550px; overflow:auto; white-space:nowrap; margin-top:1px !important"></div>'
			+'	</div>';
		setText('tabContacts_Content', m);
		document.getElementById('tabContacts_CB_View').addEventListener ('change', function (event){
			Data.options.contacts.detailled_view  = event.target.checked;
			t.tabContactsList ();
		}, false);
		document.getElementById('tabContacts_CB_Done').addEventListener ('change', function (event){
			Data.options.contacts.hide_created  = event.target.checked;
			t.tabContactsList ();
		}, false);
		document.getElementById('tabContacts_CB_Treas').addEventListener ('change', function (event){Data.options.contacts.collect_treas = event.target.checked;}, false);

		var r = document.getElementsByName("tabContacts_Filter");
		for (i=0;i<r.length;i++) {
			r[i].addEventListener('change', onChangeFilter, false);
			r[i].checked = (r[i].value == Data.options.contacts.filter);
		}
		var visitAllBut = document.getElementById('tabContacts_VisitAll');
		if (visitAllBut) {
			if (visit_remain > 0 || boxes > 0) {
					visitAllBut.addEventListener ('click', onVisitAll, false);
					setButtonStyle (visitAllBut, true, 'btn_blue');
			} else  setButtonStyle (visitAllBut, false, 'btn_blue');
		}

		if (Data.options.contacts.detailled_view) {
			setText('tabContacts_ResultList', display_detailled());
			for (var h=0; h<4; h++) {
				var element = document.getElementById('tabContacts_tal_' + h);
				if (element) element.addEventListener ('click', sortList, false);
			}
			for (var f=0; f<t.contact_list.length; f++) {
				if ((daily_remain > 0) && (my_cyborgs < my_limit) && !t.contact_list[f].is_cyborg) {
					setButtonStyle (document.getElementById('tabContacts_Invo_'+f), true, 'btn_green');
					document.getElementById('tabContacts_Invo_'+f).addEventListener ('click', onCreateCyborg, false);
					document.getElementById('Vignette_'+t.contact_list[f].id).addEventListener ('click', onCreateCyborg, false);
				} else setButtonStyle (document.getElementById('tabContacts_Invo_'+f), false, 'btn_green');
				if (visit_remain > 0 || boxes > 0) {
					setButtonStyle (document.getElementById('tabContacts_Visi_'+f), true, 'btn_green');
					document.getElementById('tabContacts_Visi_'+f).addEventListener ('click', onVisit, false);
					document.getElementById('Vignette_'+t.contact_list[f].id).addEventListener ('click', onVisit, false);
				} else setButtonStyle (document.getElementById('tabContacts_Visi_'+f), false, 'btn_green');
			}
		} else {
			setText('tabContacts_ResultList', display_avatar());
			for (var f=0; f<t.contact_list.length; f++) {
				if ((daily_remain > 0) && (my_cyborgs < my_limit) && !t.contact_list[f].is_cyborg) {
					document.getElementById('Vignette_'+t.contact_list[f].id).addEventListener ('click', onCreateCyborg, false);
				} else if (visit_remain > 0 || boxes > 0) {
					document.getElementById('Vignette_'+t.contact_list[f].id).addEventListener ('click', onVisit, false);
				}
			}
		}
		refreshView();
		t.timer = setInterval (refreshView, 5000);

		function display_avatar (){
			var t = Tabs.Contacts;
			var m = '<div style="width:520px; max-width:520px; overflow-y:auto; white-space:pre-wrap;" align=left>';
			t.contact_list = getContacts();
			t.contact_list.sort(function(a,b){return b.level-a.level});
			for (var f=0; f<t.contact_list.length; f++) {
				var border = "border:2px solid white";
				if (t.contact_list[f].is_cyborg) border = "border:2px solid #a0a";
				var fbid = (t.contact_list[f].fbid ? (t.contact_list[f].fbid.indexOf("fb")>=0 ? t.contact_list[f].fbid.substr(2) : t.contact_list[f].fbid) : '');
				var name = t.contact_list[f].name+' ('+t.contact_list[f].level+')';
				m += '<div style="color:blue; text-decoration:underline; cursor:pointer; margin-bottom:2px; margin-right:1px; float:left; '+border+'; " title="'+name+(t.contact_list[f].alliance ? ' / '+t.contact_list[f].alliance : '')+'">'
					+ (fbid ? vignette(fbid, false, t.contact_list[f].id) : vignette(t.contact_list[f].img, true, t.contact_list[f].id)) + '</div>';
			}
			return m+'</div>';
		}
		function display_detailled (){
			var t = Tabs.Contacts;
			var m = '<table class=row_style>'
			+'	<tr class=row_headers>'
			+'		<td width="40px">Avatar</td>'
			+'		<td id=tabContacts_tal_0 width="100px" style="overflow-x:auto"><A><span class=bold_white>Nom</span></A></td>'
			+'		<td id=tabContacts_tal_1 width="50px"><A><span class=bold_white>Niveau</span></A></td>'
			+'		<td id=tabContacts_tal_2 width="50px"><A><span class=bold_white>Dist</span></A></td>'
			+'		<td id=tabContacts_tal_3 width="75px"><A><span class=bold_white>Coords</span></A></td>'
			+'	</tr>';
			t.contact_list = getContacts();
			for (var f=0; f<t.contact_list.length; f++) {
				var border = "border:2px solid white", font_color = '';
				if (t.contact_list[f].is_cyborg) border = "border:2px solid #a0a";
				var status = getUserStatus (t.contact_list[f].id);
				if (status == 1) font_color = 'green';
				if (status == 2) font_color = 'red';
				if (status == 3) font_color = 'blue';
				var fbid = (t.contact_list[f].fbid ? (t.contact_list[f].fbid.indexOf("fb")>=0 ? t.contact_list[f].fbid.substr(2) : t.contact_list[f].fbid) : '');
				m += '	<tr valign=top>'
					+'		<td width="40px" align=center>'
					+'			<div style="color:blue; text-decoration:underline; cursor:pointer; margin-bottom:2px; margin-right:1px; float:left; '+border+'; ">'
					+ (fbid ? vignette(fbid, false, t.contact_list[f].id) : vignette(t.contact_list[f].img, true, t.contact_list[f].id)) + '</div></td>'
					+'		<td align=left>' + (font_color ? '<font color='+font_color+'>' : '')
					+'			<div style="white-space:pre-wrap;"><b>'+t.contact_list[f].name+'</b></div>' + (font_color ? '</font>' : '')
					+ (t.contact_list[f].alliance ? '<font color=brown><div style="white-space:pre-wrap;"><b>'+t.contact_list[f].alliance+'</b></div></font>' : '') +'</td>'
					+'		<td align=right>' + (font_color ? '<font color='+font_color+'><b>' : '') +t.contact_list[f].level + (font_color ? '</b></font>' : '') +'</td>'
					+'		<td align=right>'+t.contact_list[f].dist+'</td>'
					+'		<td align=center>'+t.contact_list[f].x+' / '+t.contact_list[f].y+'</td>'
					+'		<td align=center width=15%><input type=submit class="btn_green small" value="Invoquer" style="width:auto;" id="tabContacts_Invo_'+f+'" ref="'+t.contact_list[f].id+'" /></td>'
					+'		<td align=center width=15%><input type=submit class="btn_green small" value="Visiter" style="width:auto;" id="tabContacts_Visi_'+f+'" ref="'+t.contact_list[f].id+'" /></td>'
					+'	</tr>';
			}
			m += '</table>';
			return m;
		}
		function getContacts () {
			var ret = [], source = [];
			if (Data.options.contacts.filter == '0')
				 source = Seed.friends;
			else if (Data.options.contacts.filter == '1') {
				for (var f=0; f<Seed.friends.length; f++) {
					if (Seed.gameData.alliance &&
						Seed.gameData.alliance.membership &&
						Seed.gameData.alliance.membership.members &&
						Seed.gameData.alliance.membership.members[Seed.friends[f]]) source.push(Seed.friends[f]);
				}
			} else {
				for (var f=0; f<Seed.friends.length; f++) {
					if (!Seed.gameData.alliance ||
						!Seed.gameData.alliance.membership ||
						!Seed.gameData.alliance.membership.members ||
						!Seed.gameData.alliance.membership.members[Seed.friends[f]]) source.push(Seed.friends[f]);
				}
			}
			for (var f=0; f<source.length; f++) {
				var friend = Seed.gameData.userNotes[source[f]], alliance = '';
				if (is_null(friend.x) && is_null(friend.y)) continue;
				var dist = getDistance(Seed.gameData.account.x, Seed.gameData.account.y, friend.x, friend.y);
				var found = false;
				for (var x=0; x<Seed.gameData.cyborgs.cyborg_user_ids.length && !found; x++) {
					if (source[f] == Seed.gameData.cyborgs.cyborg_user_ids[x]) found = true;
				}
				if (friend.alliance_id && friend.alliance_id > 0)
					alliance = (Seed.gameData.alliances && Seed.gameData.alliances[friend.alliance_id]) ? Seed.gameData.alliances[friend.alliance_id].name : 'alliance #'+friend.alliance_id;
				var dat = {id:source[f], fbid:friend.social_id, img:friend.avatar, name:friend.fullname, level:friend.level, dist:dist, x:friend.x, y:friend.y, is_cyborg:found, alliance:alliance};
				if (!Data.options.contacts.hide_created || !found) ret.push(dat);
			}
			switch (Data.options.contacts.sort_list) {
				case '0'  : ret.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (b>a) return -1; if (b <a) return 1; return 0;}); break;
				case '-0' : ret.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;}); break;
				case '1'  : ret.sort(function(a,b){return b.level-a.level}); break;
				case '-1' : ret.sort(function(a,b){return a.level-b.level}); break;
				case '2'  : ret.sort(function(a,b){return a.dist-b.dist}); break;
				case '-2' : ret.sort(function(a,b){return b.dist-a.dist}); break;
				case '3'  : ret.sort(function(a,b){return a.x-b.x}); break
				case '-3' : ret.sort(function(a,b){return b.x-a.x}); break
			}
			return ret;
		}
		function onChangeFilter(event){
			var t = Tabs.Contacts;
			Data.options.contacts.filter = event.target.value;
			t.tabContactsList ();
		}
		function onCreateCyborg(event){
			var t = Tabs.Contacts;
	 		var id = event.target.getAttribute('ref');
			if (t.createCyborgInProgress) return;
			t.createCyborgInProgress = true;
			Cyborgs.create(t, id, function(){logit('****** Setting createCyborgInProgress to FALSE'); Tabs.Contacts.createCyborgInProgress = false; Tabs.Contacts.tabContactsList()});
		}
		function onVisit(event){
			var t = Tabs.Contacts;
	 		var id = event.target.getAttribute('ref');
			if (is_null(id)) id = event.target.id.split('_')[1];
			if (t.createCyborgInProgress) return;
			t.createCyborgInProgress = true;
			VisitUsers.thisUser(t, id, function(){logit('****** Setting createCyborgInProgress to FALSE'); Tabs.Contacts.createCyborgInProgress = false; Tabs.Contacts.tabContactsList()});
		}
		function onVisitAll(){
			var t = Tabs.Contacts;
			if (t.createCyborgInProgress) return;
			t.createCyborgInProgress = true;
			VisitUsers.allUsers(t, t.contact_list, function(){logit('****** Setting createCyborgInProgress to FALSE'); Tabs.Contacts.createCyborgInProgress = false; Tabs.Contacts.tabContactsList()});
		}
		function refreshView () {
			/* Tributs */
			for (var r in production_icons) setText('tabContacts'+r+'_treas', (Seed.gameData.treasures.friends_boxes_qty[r] || 0));
			/* Labo data */
			var cyborgs_bonus = getSkillsBonus(Seed.skills.types_id.CYBORGS_COUNT);
			var my_cyborgs = Seed.gameData.cyborgs.cyborg_user_ids.length;
			var my_limit = Seed.statics.cyborgs.own_limit + cyborgs_bonus;
			var daily_limit = Seed.statics.cyborgs.daily_limit + getCyborgsPerDay ();
			var daily_remain = daily_limit - Seed.gameData.cyborgs.created;
			var visit_limit = Seed.statics.cyborgs.daily_limit_for_others + cyborgs_bonus;
			var visit_remain = visit_limit - Seed.gameData.cyborgs.created_for_user_ids.length;
			setText('tabContacts_daily','<b>'+daily_remain +' / '+ daily_limit+'</b>');
			setText('tabContacts_myCyborgs','<b>'+my_cyborgs + ' / ' + my_limit+'</b>');
			setText('tabContacts_visits','<b>'+visit_remain +' / '+ visit_limit+'</b>');
		}
		function sortList (event){
			var t = Tabs.Contacts;
			var arg = event.target.parentNode.parentNode.id;
			switch (arg) {
				case 'tabContacts_tal_0' :
					if (Data.options.contacts.sort_list == '0') Data.options.contacts.sort_list = '-0';
					else Data.options.contacts.sort_list = '0';
					break;
				case 'tabContacts_tal_1' :
					if (Data.options.contacts.sort_list == '1') Data.options.contacts.sort_list = '-1';
					else Data.options.contacts.sort_list = '1';
					break;
				case 'tabContacts_tal_2' :
					if (Data.options.contacts.sort_list == '2') Data.options.contacts.sort_list = '-2';
					else Data.options.contacts.sort_list = '2';
					break;
				case 'tabContacts_tal_3' :
					if (Data.options.contacts.sort_list == '3') Data.options.contacts.sort_list = '-3';
					else Data.options.contacts.sort_list = '3';
					break;
			}
			t.tabContactsList();
		}
	},

	/** MAP TARGET LIST SUB-TAB ***/
	tabTargetList : function (){
		var t = Tabs.Contacts;
		document.getElementById(t.lastSubTab).className='';
		document.getElementById(t.lastSubTab).style.zIndex=0;
		document.getElementById('tabTargetList').className='selected';
		document.getElementById('tabTargetList').style.zIndex=1;
		t.lastSubTab = 'tabTargetList';
		t.contentType = 1;
		clearInterval (t.timer);

		if (is_null(Data.options.contacts.sort_targets)) Data.options.contacts.sort_targets = '2';
		var m = '<div id=tabTargets_Results style="height:640px">'
			+'	<div class=bsx_title>Liste des cibles potentielles</div>'
			+'	<table class=bsx_table style="margin-top:3px" width=100%>'
			+'		<tr valign=top align=left>'
			+'			<td width=1%><input type=radio name="tabTargets_Filter" value="0" /></td>'
			+'			<td width=19% align=left><label>Tous</label></td>'
			+'			<td width=1%><input type=radio name="tabTargets_Filter" value="1" /></td>'
			+'			<td width=19% align=left><label>Sauf amis</label></td>'
			+'			<td width=1%><input type=radio name="tabTargets_Filter" value="2" /></td>'
			+'			<td width=19% align=left><label>Tous mes amis</label></td>'
			+'			<td width=1%><input type=radio name="tabTargets_Filter" value="3" /></td>'
			+'			<td width=19% align=left><label>Amis de ma ligue</label></td>'
			+'			<td width=1%><input type=radio name="tabTargets_Filter" value="4" /></td>'
			+'			<td width=19% align=left><label>Amis hors ligue</label></td>'
			+'		</tr></table>'
			+'	<table class=bsx_table width=100%>'
			+'		<tr valign=top align=left>'
			+'			<td width=30%><label>Niveau minimum : </label>' + levelSelect('Min', nvl(Data.options.contacts.min_level,9) ) + '</td>'
			+'			<td width=30%><label>Niveau maximum : </label>' + levelSelect('Max', nvl(Data.options.contacts.max_level,100) ) + '</td>'
			+'			<td width=40%><label>Distance maxi : </label><select id=tabTargets_MaxRadius>';
			for (var i=4; i <= 20; i+=4){
				m +='		<option value="'+ i +'" '+ (Data.options.contacts.distance == i ? 'selected' : '') +'>'+i+'</option>';
			}
		m += '			</select></td>'
			+'		</tr><tr valign=top align=left>'
			+'				<td width=60% colspan=2>&nbsp;</td>'
			+'				<td width=40%><label><input id=tabTargets_Refresh type=button value="Rafraîchir sélection" /></label></td>'
			+'		</tr>'
			+'	</table><br>'
			+'	<div id=tabTargets_ResultList class=bsx_status_ticker style="height:550px; max-height:550px; overflow:auto; white-space:nowrap; margin-top:1px !important"></div>'
			+'	</div>';
		setText('tabContacts_Content', m);
		var r = document.getElementsByName("tabTargets_Filter");
		for (i=0;i<r.length;i++) {
			r[i].addEventListener('change', onChangeFilter, false);
			r[i].checked = (r[i].value == Data.options.contacts.filter_targets);
		}
		document.getElementById('tabTargets_LvMin').addEventListener ('change', onChangeLevel, false);
		document.getElementById('tabTargets_LvMax').addEventListener ('change', onChangeLevel, false);
		document.getElementById('tabTargets_MaxRadius').addEventListener ('change', function(event){
			var el = event.target;
			Data.options.contacts.distance = toNum(el.options[el.selectedIndex].value);
			t.tabTargetList ();
		}, false);
		document.getElementById('tabTargets_Refresh').addEventListener ('click', refreshMapData, false);
		setText('tabTargets_ResultList', display_detailled());
		for (var h=0; h<4; h++) {
			var element = document.getElementById('tabTargets_tal_' + h);
			if (element) element.addEventListener ('click', sortList, false);
		}
		for (var f=0; f<t.target_list.length; f++) {
			setButtonStyle (document.getElementById('tabTargets_get_'+f), true, 'btn_green');
			document.getElementById('tabTargets_get_'+f).addEventListener ('click', onRefreshOneUser, false);
			document.getElementById('Vignette_'+t.target_list[f].id).addEventListener ('click', onRefreshOneUser, false);
			for (var o=2; o<=5; o++) {
				var but = document.getElementById('Vignette_'+o+'_'+t.target_list[f].id);
				if (but) but.addEventListener ('click', onClickAction, false);
			}
		}

		refreshView();
		t.timer = setInterval (refreshView, 1000);

		function levelSelect (MinMax, curVal){
			var newID = 'tabTargets_Lv' + MinMax;
			var m = '<select id="' + newID + '">';
			for (var k=1; k<=100; k++)
				m += '<option value="' + k + '" ' + (curVal==k?'selected':'') + '>' + k + '</option>';
			m += '</select>';
			return m;
		}
		function display_detailled (){
			var t = Tabs.Contacts;
			var m = '<table class=row_style>'
			+'	<tr class=row_headers>'
			+'		<td width="40px">Avatar</td>'
			+'		<td id=tabTargets_tal_0 width="150px" style="overflow-x:auto"><A><span class=bold_white>Nom</span></A></td>'
			+'		<td id=tabTargets_tal_1 width="45px"><A><span class=bold_white>Niv.</span></A></td>'
			+'		<td id=tabTargets_tal_2 width="50px"><A><span class=bold_white>Dist</span></A></td>'
			+'		<td id=tabTargets_tal_3 width="75px"><A><span class=bold_white>Coords</span></A></td>'
			+'		<td id=tabTargets_tal_3 width="130px"><A><span class=bold_white>Expérience</span></A></td>'
			+'	</tr>';
			t.target_list = getTargets();
			for (var f=0; f<t.target_list.length; f++) {
				var font_color = '', build_text = '<font color=grey>', sep = '', row_style = '';
				var status = getUserStatus (t.target_list[f].id);
				if (status == 1) font_color = 'green';
				if (status == 2) font_color = 'red';
				if (status == 3) font_color = 'blue';
				var fbid = (t.target_list[f].fbid ? (t.target_list[f].fbid.indexOf("fb")>=0 ? t.target_list[f].fbid.substr(2) : t.target_list[f].fbid) : '');
				for (var i in t.target_list[f].buildings) {
					build_text += sep+Seed.reqs[i].name+': '+t.target_list[f].buildings[i];
					sep = ', ';
				}
				build_text == '</font>';
				if (f % 2 == 0) row_style = "White";
				else row_style = "rgb(239,239,224)";
				m += '	<tr valign=top style="background-color:'+ row_style +'">'
					+'		<td width="40px" align=center>'/*rowspan=2*/
					+'			<div style="color:blue; text-decoration:underline; cursor:pointer; margin-bottom:2px; margin-right:1px; float:left;">'
					+ (fbid ? vignette(fbid, false, t.target_list[f].id) : vignette(t.target_list[f].img, true, t.target_list[f].id)) + '</div></td>'
					+'		<td align=left width="150px">' + (font_color ? '<font color='+font_color+'>' : '')
					+'			<div style="white-space:pre-wrap;"><b>'+t.target_list[f].name+'</b></div>' + (font_color ? '</font>' : '')
					+ (t.target_list[f].alliance ? '<font color=brown><div style="white-space:pre-wrap;"><b>'+t.target_list[f].alliance+'</b></div></font>' : '') +'</td>'
					+'		<td align=right>' + (font_color ? '<font color='+font_color+'><b>' : '') +t.target_list[f].level + (font_color ? '</b></font>' : '')
					+ (t.target_list[f].gap_lvl > 0 ? '<br>(<font color=green><b>+'+t.target_list[f].gap_lvl+'</b></font>)' : '') +'</td>'
					+'		<td align=right>'+t.target_list[f].dist+'Km</td>'
					+'		<td align=center>'+t.target_list[f].x+' / '+t.target_list[f].y+'</td>'
					+'		<td align=left>XP: ' + (t.target_list[f].xp > 0 ? t.target_list[f].xp : '??') +' / '+t.target_list[f].max_xp
					+ (t.target_list[f].gap_xp > 0 ? '<br>(<font color=green><b>+'+t.target_list[f].gap_xp+'</b></font>)' : '') +'</td>'
					+'		<td align=center width=8%><input type=submit class="btn_green small" value="Màj" style="width:auto;" id="tabTargets_get_'+f+'" ref="'+t.target_list[f].id+'" /></td>'
					+'		<td align=center width=8%><table width=100%><tr>';
				for (var o=2; o<=3; o++) {
					var real_type = '';
					for (var x in order_ids) {
						if (order_ids[x] == o) real_type = x.toLowerCase();
					}
					m += '			<td><div style="color:blue; text-decoration:underline; cursor:pointer; margin-bottom:2px; margin-right:1px; float:left;" title="'+order_desc[o]+'">'
						+ vignette2 ('ui/command/'+real_type+'.jpg', 16, o+'_'+t.target_list[f].id) + '</div></td>';
				}
				m += '		</tr><tr>';
				for (var o=4; o<=5; o++) {
					var real_type = '';
					for (var x in order_ids) {
						if (order_ids[x] == o) real_type = x.toLowerCase();
					}
					m += '			<td><div style="color:blue; text-decoration:underline; cursor:pointer; margin-bottom:2px; margin-right:1px; float:left;" title="'+order_desc[o]+'">'
						+ vignette2 ('ui/command/'+real_type+'.jpg', 16, o+'_'+t.target_list[f].id) + '</div></td>';
				}
				m += '			</tr></table>'
					+'		</td>'
					+'	</tr><tr valign=top style="background-color:'+ row_style +'">'
					+'		<td align=left colspan=6>' + build_text + '</td>'
					+'		<td align=right colspan=2 title="Dernier raid"><div id='+t.target_list[f].id+'_lastraid></td>'
					+'	</tr>';
			}
			m += '</table>';
			return m;
		}
		function getTargets () {
			var ret = [], source = [];
			switch (Data.options.contacts.filter_targets) {
				case '0' : /* All contacts */
					for (var i in Seed.gameData.userNotes) source.push(i);
					for (var i in Data.map.players) {
						if (!Seed.gameData.userNotes[i]) source.push(i);
					}
					break;
				case '1' : /* All except friends */
					for (var i in Seed.gameData.userNotes) {
						var found = false;
						for (var f=0; f<Seed.friends.length && !found; f++) {
							if (Seed.friends[f] == i) found = true;
						}
						if (!found) source.push(i);
					}
					for (var i in Data.map.players) {
						if (!Seed.gameData.userNotes[i]) source.push(i);
					}
					break;
				case '2' : /* All friends */
					source = Seed.friends;
					break;
				case '3' : /* All friends in my alliance*/
					for (var f=0; f<Seed.friends.length; f++) {
						if (Seed.gameData.alliance &&
							Seed.gameData.alliance.membership &&
							Seed.gameData.alliance.membership.members &&
							Seed.gameData.alliance.membership.members[Seed.friends[f]]) source.push(Seed.friends[f]);
					}
					break;
				case '4' : /* All friends not in my alliance*/
					for (var f=0; f<Seed.friends.length; f++) {
						if (!Seed.gameData.alliance ||
							!Seed.gameData.alliance.membership ||
							!Seed.gameData.alliance.membership.members ||
							!Seed.gameData.alliance.membership.members[Seed.friends[f]]) source.push(Seed.friends[f]);
					}
			}
			for (var f=0; f<source.length; f++) {
				var user_id = source[f], user = cloneProps(Seed.gameData.userNotes[source[f]]), alliance = '';
				if (Data.options.contacts.filter_targets == '0' || Data.options.contacts.filter_targets == '1') {
					for (var i in Data.map.players) {
						if (!user[i]) {
							note = Data.map.players[i];
							user[i] = {segment_id:note.seg, social_id:note.sid, fullname:note.n, avatar:note.img,
										registration:null, level:note.l, city:note.c, x:note.x, y:note.y,
										caravan_speed:null, occupant_user_id:null, alliance_id:note.aid, alliance_rank_id:null};
						}
					}
				}
				if (is_null(user.x) && is_null(user.y)) continue;
				if (user.level < nvl(Data.options.contacts.min_level,9) || user.level > nvl(Data.options.contacts.max_level,100)) continue;
				var dist = getDistance(Seed.gameData.account.x, Seed.gameData.account.y, user.x, user.y);
				if (user.alliance_id && user.alliance_id > 0)
					alliance = (Seed.gameData.alliances && Seed.gameData.alliances[user.alliance_id]) ? Seed.gameData.alliances[user.alliance_id].name : 'alliance #'+user.alliance_id;
				if (dist > nvl(Data.options.contacts.distance,28)) continue;
				var gap_lvl = 0, gap_xp = 0, xp = 0, current = 0, max = 0, buildings = null, raid = 0;
				if (Data.map.evolution[user_id]) {
					gap_lvl = Data.map.evolution[user_id].gap_lvl;
					gap_xp = Data.map.evolution[user_id].gap_xp;
					xp = Data.map.evolution[user_id].xp;
					buildings = cloneProps(Data.map.evolution[user_id].buildings);
					raid = Data.map.evolution[user_id].raid;
				}
				var previous = Seed.statics.user_levels[user.level-1];
				current = Math.max(xp - previous, 0);
				max = Seed.statics.user_levels[user.level] - previous;
				var dat = {id:source[f], fbid:user.social_id, img:user.avatar, name:user.fullname, level:user.level, dist:dist, x:user.x, y:user.y,
							gap_lvl:gap_lvl, xp:current, max_xp:max, gap_xp:gap_xp, alliance:alliance, buildings:buildings, raid:raid};
				ret.push(dat);
			}
			switch (Data.options.contacts.sort_targets) {
				case '0'  : ret.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (b>a) return -1; if (b <a) return 1; return 0;}); break;
				case '-0' : ret.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;}); break;
				case '1'  : ret.sort(function(a,b){return b.level-a.level}); break;
				case '-1' : ret.sort(function(a,b){return a.level-b.level}); break;
				case '2'  : ret.sort(function(a,b){return a.dist-b.dist}); break;
				case '-2' : ret.sort(function(a,b){return b.dist-a.dist}); break;
				case '3'  : ret.sort(function(a,b){return a.x-b.x}); break
				case '-3' : ret.sort(function(a,b){return b.x-a.x}); break
			}
			return ret;
		}
		function onChangeFilter(event){
			var t = Tabs.Contacts;
			Data.options.contacts.filter_targets = event.target.value;
			t.tabTargetList ();
		}
		function onChangeLevel (event){
			var t = Tabs.Contacts;
			var id = event.target.id;
			var x = toNum(event.target.value);
			if (isNaN(x) || x<1 || x>100){
				event.target.style.backgroundColor = 'red';
			} else {
				if (id == 'tabTargets_LvMin') Data.options.contacts.min_level = x;
				else Data.options.contacts.max_level = x;
				event.target.value = x;
				var min = Data.options.contacts.min_level;
				var max = Data.options.contacts.max_level;
				if (min>max)
					event.target.style.backgroundColor = 'red';
				else {
					event.target.style.backgroundColor = '';
					t.tabTargetList ();
				}
			}
		}
		function onClickAction(event){
			var t = Tabs.Contacts;
	 		var id = event.target.getAttribute('ref').split('_');
			if (id[0] && id[1]) {
				var troops = null;
				switch (id[0]) {
					case '4' : //order_ids.Intelligence
						for (var x in Seed.gameData.troops.countByType) {
							if (Seed.reqs[x].stats.kind_id == '2') {
								if (!troops) troops = {};
								troops[x] = Seed.gameData.troops.countByType[x];
							}
						}
						break;
					default : troops = cloneProps(Seed.gameData.troops.countByType); break;
				}
				var tot = 0;
				for (var i in troops) tot += toNum(troops[i]);
				if (tot <= 0) {
					var dial = new ModalDialog (t.container, 300, 165, '', false, null);
					dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
					dial.getContentDiv().innerHTML = 'Aucune unité disponible';
					setTimeout (function(){dial.destroy(); }, 2000);
				} else if (id[0] == '2' && toNum(Seed.gameData.world_data.raids) <= 0) { /* Test if robbery available */
					var next = '', now = serverTimeMs();
					if (Seed.gameData.world_data.next_raid && Seed.gameData.world_data.next_raid > now)
						next = ' (+1 dans '+timestrh( (Seed.gameData.world_data.next_raid - now) / 1000)+')';
					var dial = new ModalDialog (t.container, 300, 165, '', false, null);
					dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
					dial.getContentDiv().innerHTML = 'Aucun raid disponible'+next;
					setTimeout (function(){dial.destroy(); }, 2000);
				} else var popSend = new UnitSendDialog (t.container, id[0], Seed.gameData.account.id, id[1], troops, true, function(){t.target_list = getTargets();popSend.destroy();});
			}
		}
		function onRefreshOneUser(event){
			var t = Tabs.Contacts;
	 		var id = event.target.getAttribute('ref');
			if (t.checkMapBusy) return;
			t.checkMapBusy = true;
			Map.checkOneUser (t, id, function(){t=Tabs.Contacts; logit('****** Setting checkMapBusy to FALSE'); t.checkMapBusy = false; t.tabTargetList()});
		}
		function refreshView () {
			var t = Tabs.Contacts, now = toNum(serverTimeMs()), time_format = '';
			/* Target last raid */
			for (var f=0; f<t.target_list.length; f++) {
				var since = 0;
				if (t.target_list[f].raid && t.target_list[f].raid > 0) since = now - t.target_list[f].raid;
				if (since > 0)
					 time_format = '<font color=' + TIMER_COLOR + '>'+ timestr(since/1000, (since > 86400 ? false : true))+'</font>';
				else time_format = '';
				setText(t.target_list[f].id+'_lastraid',time_format);
			}
		}
		function sortList (event){
			var t = Tabs.Contacts;
			var arg = event.target.parentNode.parentNode.id;
			switch (arg) {
				case 'tabTargets_tal_0' :
					if (Data.options.contacts.sort_targets == '0') Data.options.contacts.sort_targets = '-0';
					else Data.options.contacts.sort_targets = '0';
					break;
				case 'tabTargets_tal_1' :
					if (Data.options.contacts.sort_targets == '1') Data.options.contacts.sort_targets = '-1';
					else Data.options.contacts.sort_targets = '1';
					break;
				case 'tabTargets_tal_2' :
					if (Data.options.contacts.sort_targets == '2') Data.options.contacts.sort_targets = '-2';
					else Data.options.contacts.sort_targets = '2';
					break;
				case 'tabTargets_tal_3' :
					if (Data.options.contacts.sort_targets == '3') Data.options.contacts.sort_targets = '-3';
					else Data.options.contacts.sort_targets = '3';
					break;
			}
			t.tabTargetList();
		}
		function refreshMapData (){
			var t = Tabs.Contacts;
			if (t.checkMapBusy) return false;
			t.checkMapBusy = true;
			scanMap(function(){logit('****** Setting checkMapBusy to FALSE'); Tabs.Contacts.checkMapBusy = false; Tabs.Contacts.tabTargetList();});
		}
		function scanMap (notify){
			var t = Tabs.Contacts;
			var x = Seed.gameData.account.x;
			var y = Seed.gameData.account.y;
			var min = nvl(Data.options.contacts.min_level,9);
			var max = nvl(Data.options.contacts.max_level,100);
			var radius = Data.options.contacts.distance || 4;
			logit('======> Contacts tab scanMap (' + x +','+y+', radius '+radius+', min '+min+', max '+max+')');
			progressBar.init (800+Math.randRange(1,50), 100, 300, 150, 'Message', 200, true, t.container);
			progressBar.start({ steps:100, delay:1, byCount:true, title:'Rafraîchissement de la sélection...', stepText:'Veuillez patienter...' });
			Map.scanMap ({x:x, y:y, radius:radius, min:min, max:max}, callback);
			function callback (res){
				if (res.done){
					actionLog('<B>Scan de la carte</B>: Terminé');
					var now = serverTimeMs();
					//Data.options.contacts.last_update = new Date(now).myString();
					if (notify) notify (true);
					progressBarPop.destroy();
				} else {
					progressBarPop.getContentDiv().innerHTML = '<B>Oups, erreur lors du scan de la carte...</B>';
					progressBarPop.allowClose (true);
					if (notify) notify (false);
					return;
				}
			}
		}
	}
}
/******************************** Contacts Tab *******************************/

/******************************** Contacts Tab *******************************/
Tabs.Radar = {
	tabOrder		: RADAR_TAB_ORDER,
	tabLabel		: 'Nid d\'Aigle',
	tabDisabled		: !RADAR_TAB_ENABLE,
	container		: null,
	timer			: null,
	contentType		: 0, /* 0 = battlefields list, 1 = Mine list, 2 = My mines */
	lastSubTab		: 'tabRadarBattle',
	target_list		: null,
	checkMapBusy	: false,

	init : function (div){
		var t = Tabs.Radar;
		t.container = div;
		var m = '<div class=bsx_title>Nid d\'Aigle</div>'
			+'<ul class=tabs>'
			+'	<li class="tab first"><a id=tabRadarBattle>Champs</a></li>'
			+'	<li class="tab"><a id=tabRadarMines>Implantations</a></li>'
			+'	<li class="tab"><a id=tabRadarMyMines>Mes implantations</a></li>'
			+'</ul>'
			+'<div id=tabRadar_Content style="padding-top:0px; height:665px; ; max-height:665px; overflow-y:auto"></div>';

		t.container.innerHTML = m;
		document.getElementById('tabRadarBattle').addEventListener ('click', t.tabRadarBattle, false);	
		document.getElementById('tabRadarMines').addEventListener ('click', t.tabRadarMines, false);	
		document.getElementById('tabRadarMyMines').addEventListener ('click', t.tabRadarMyMines, false);	
		window.addEventListener('unload', t.onUnload, false);
		t.contentType = toNum(Data.options.radar.current_tab);
		t.show();
	},
	show : function (){
		var t = Tabs.Radar;
		switch (toNum(t.contentType)) {
			case 0: t.tabRadarBattle(); break;
			case 1: t.tabRadarMines(); break;
			case 2: t.tabRadarMyMines(); break;
		}
	},
	onUnload : function (){
		var t = Tabs.Radar;
		logit ('===============  Tabs.Radar.onUnload');
		clearInterval (t.timer);
		Data.options.radar.current_tab = t.contentType;
	},
	hide : function (){
		var t = Tabs.Radar;
		clearInterval (t.timer);
	},

	/** BATTLEFIELDS LIST SUB-TAB ***/
	tabRadarBattle : function (){
		var t = Tabs.Radar;
		document.getElementById(t.lastSubTab).className='';
		document.getElementById(t.lastSubTab).style.zIndex=0;
		document.getElementById('tabRadarBattle').className='selected';
		document.getElementById('tabRadarBattle').style.zIndex=1;
		t.lastSubTab = 'tabRadarBattle';
		t.contentType = 0;
		clearInterval (t.timer);

		var m = '<div id=tabRadar_0_Results style="height:640px">'
			+'	<div class=bsx_title>Liste des champs de bataille</div>'
			+'	<div id=tabRadar_0_List class=bsx_status_ticker style="height:610px; max-height:610px; overflow:auto; white-space:nowrap; margin-top:1px !important"></div>'
			+'</div>';
		setText('tabRadar_Content', m);
		setText('tabRadar_0_List', display());
		for (var h=0; h<5; h++) {
			var element = document.getElementById('tabRadarBattle_tal_' + h);
			if (element) element.addEventListener ('click', sortList, false);
		}
		for (var f=0; f<t.target_list.length; f++) {
			var but = document.getElementById('Vignette_'+(t.target_list[f].kind == '0' ? order_ids.Robbery : order_ids.Reinforcement) +'_'+ t.target_list[f].id);
			if (but) but.addEventListener ('click', onClickAction, false);
		}

		refreshView();
		t.timer = setInterval (refreshView, 5000);

		function display (){
			var t = Tabs.Radar, font_color;
			var m = '<table class=row_style>'
				+'	<tr class=row_headers>'
				+'		<td width="40px">&nbsp;</td>'
				+'		<td id=tabRadarBattle_tal_0 width="140px" style="overflow-x:auto"><A><span class=bold_white>Nom</span></A></td>'
				+'		<td id=tabRadarBattle_tal_1 width="50px"><A><span class=bold_white>Niveau</span></A></td>'
				+'		<td id=tabRadarBattle_tal_2 width="50px"><A><span class=bold_white>Défense</span></A></td>'
				+'		<td id=tabRadarBattle_tal_3 width="50px"><A><span class=bold_white>Dist</span></A></td>'
				+'		<td id=tabRadarBattle_tal_4 width="85px"><A><span class=bold_white>Coords</span></A></td>'
				+'	</tr>';
			Seed.dirty_marches = false;
			t.target_list = getBattleFields();
			for (var f=0; f<t.target_list.length; f++) {
				var img = '', font_color = '';
				if (t.target_list[f].kind == '0') {
					font_color = 'red';
					img = vignette2 ('ui/command/occupation.jpg', 25, order_ids.Robbery+'_'+t.target_list[f].id);
				} else {
					font_color = 'green';
					img = vignette2 ('ui/command/reinforcement.jpg', 25, order_ids.Reinforcement+'_'+t.target_list[f].id);
				}
				m += '	<tr valign=middle>'
					+'		<td width="40px" align=center>' + t.target_list[f].img + '</td>'
					+'		<td align=left><font color='+font_color+'><div style="white-space:pre-wrap;"><b>'+t.target_list[f].name+'</b></div></font></td>'
					+'		<td align=right>'+ t.target_list[f].level + '</td>'
					+'		<td align=right>'+ t.target_list[f].strength + '%</td>'
					+'		<td align=right>'+t.target_list[f].dist+'Km</td>'
					+'		<td align=center>'+t.target_list[f].x+' / '+t.target_list[f].y+'</td>'
					+'		<td align=center width=35px><div style="color:blue; text-decoration:underline; cursor:pointer; margin-bottom:2px; margin-right:1px; float:left;" title="Attaque">'+ img +'</div></td>'
					+'	</tr>';
			}
			m += '</table>';
			return m;
		}
		function getBattleFields () {
			var ret = [];
//logit('raid locations = '+JSON.stringify(Seed.gameData.raid_data.locations));
			for (var r in Seed.gameData.raid_data.locations) {
				var note = Seed.gameData.raid_data.locations[r];
				var dist = Math.round(getDistance(Seed.gameData.account.x, Seed.gameData.account.y, note.x, note.y)*100);
				var req = Seed.statics.raid_types[note.type];
				img = vignette2('ui/globalMap/raids/rl'+(note.type < 10 ? '0' : '')+ note.type+'.jpg');
				ret.push({id:r, img:img, name:req.name, kind:req.kind_id, level:note.level, dist:dist/10, x:note.x, y:note.y, strength:(toNum(note.strength)*20)});
			}
			switch (Data.options.radar.sort_battle) {
				case '0'  : ret.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (b>a) return -1; if (b <a) return 1; return 0;}); break;
				case '-0' : ret.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;}); break;
				case '1'  : ret.sort(function(a,b){return b.level-a.level}); break;
				case '-1' : ret.sort(function(a,b){return a.level-b.level}); break;
				case '2'  : ret.sort(function(a,b){return a.strength-b.strength}); break;
				case '-2' : ret.sort(function(a,b){return b.strength-a.strength}); break;
				case '3'  : ret.sort(function(a,b){return a.dist-b.dist}); break;
				case '-3' : ret.sort(function(a,b){return b.dist-a.dist}); break;
				case '4'  : ret.sort(function(a,b){return a.x-b.x}); break
				case '-4' : ret.sort(function(a,b){return b.x-a.x}); break
			}
			return ret;
		}
		function refreshView () {
			var t = Tabs.Radar;
			if (Seed.dirty_marches) setText('tabRadar_0_List', display());
		}
		function sortList (event){
			var t = Tabs.Radar;
			var arg = event.target.parentNode.parentNode.id;
			switch (arg) {
				case 'tabRadarBattle_tal_0' :
					if (Data.options.radar.sort_battle == '0') Data.options.radar.sort_battle = '-0';
					else Data.options.radar.sort_battle = '0';
					break;
				case 'tabRadarBattle_tal_1' :
					if (Data.options.radar.sort_battle == '1') Data.options.radar.sort_battle = '-1';
					else Data.options.radar.sort_battle = '1';
					break;
				case 'tabRadarBattle_tal_2' :
					if (Data.options.radar.sort_battle == '2') Data.options.radar.sort_battle = '-2';
					else Data.options.radar.sort_battle = '2';
					break;
				case 'tabRadarBattle_tal_3' :
					if (Data.options.radar.sort_battle == '3') Data.options.radar.sort_battle = '-3';
					else Data.options.radar.sort_battle = '3';
					break;
				case 'tabRadarBattle_tal_4' :
					if (Data.options.radar.sort_battle == '4') Data.options.radar.sort_battle = '-4';
					else Data.options.radar.sort_battle = '4';
					break;
			}
			t.tabRadarBattle();
		}
		function onClickAction(event){
			var t = Tabs.Radar, tot = 0;
	 		var id = event.target.getAttribute('ref').split('_');
			if (id[0] && id[1]) {
				for (var i in Seed.gameData.troops.countByType) tot += toNum(Seed.gameData.troops.countByType[i]);
				if (tot <= 0) {
					var dial = new ModalDialog (t.container, 300, 165, '', false, null);
					dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
					dial.getContentDiv().innerHTML = 'Aucune unité disponible';
					setTimeout (function(){dial.destroy(); }, 2000);
				} else var popSend = new UnitSendDialog (t.container, id[0], Seed.gameData.account.id, id[1], Seed.gameData.troops.countByType, true, function(){popSend.destroy();});
			}
		}
	}
}
/******************************** Radar Tab **********************************/

/******************************** Options Tab ********************************/
Tabs.Options = {
	tabOrder       : OPTIONS_TAB_ORDER,
	tabLabel       : 'Opts',
	tabDisabled	   : !OPTIONS_TAB_ENABLE,
	container	   : null,
	refreshTimer   : null,
	flashRefreshTimer : null,
	refreshPlayerBusy : false,

	init : function (div) {
		var t = Tabs.Options;
		t.container = div;

		try {
			m = '<div class=bsx_title style="margin-bottom:10px">Options</div>'
			+'<div style="height:665px; max-height:665px; width:540px; max-width:540px; overflow-y:auto; overflow-x:auto; color:#000;">'
			+'<table class=bsx_table>'
			+'	<tr valign=top>'
			+'		<td><b>Options de jeu :</b></td>'
			+'	</tr>'
			+'</table>'
			+'<br>'
			+'<table class=bsx_table>'
			+'	<tr valign=top>'
			+'		<td><b>Options du script :</b></td>'
			+'	</tr><tr valign=top>'
			+'		<td>'
			+'		<label><input id=tabOptions_CB_Verbose type=checkbox '+(Data.options.verboseLog.enabled?' CHECKED ':'')+' /> Activer la journalisation détaillée</label>'
			+'		</td>'
			+'	</tr>'
			+'</table>'
			+'<br>'
			+'<table class=bsx_table style="color:#000;">'
			+'	<tr valign=top>'
			+'		<td colspan=4><b>Configuration des sons :</b></td>'
			+'	</tr><tr valign=top>'
			+'		<td><label><input id=tabOptions_JobsSound type=checkbox '+ (Data.options.sound.enable_jobs?'CHECKED ':'') +'/></label></td>'
			+'		<td><label>Jouer un son en fin de tâche. Fichiers sons pour :</label></td>'
			+'	</tr><tr valign=top>'
			+'		<td></td>'
			+'		<td><table cellpadding=0 cellspacing=0>'
			+'				<tr valign=top>'
			+'					<td><label>Construction</label></td>'
			+'					<td><input id=tabOptions_BFile size=40 maxlength=150 type=text value="' + Data.options.sound.URL_building + '" />&nbsp</td>'
			+'					<td><input id=tabOptions_BPlay type=submit value=Jouer>'
			+'						<input id=tabOptions_BStop type=submit value=Stop>'
			+'						<input id=tabOptions_BDefault type=submit value=Défaut></td>'
			+'				</tr>'
			+'				<tr valign=top>'
			+'					<td><label>Formation</label></td>'
			+'					<td><input id=tabOptions_TFile size=40 maxlength=150 type=text value="' + Data.options.sound.URL_units + '" />&nbsp</td>'
			+'					<td><input id=tabOptions_TPlay type=submit value=Jouer>'
			+'						<input id=tabOptions_TStop type=submit value=Stop>'
			+'						<input id=tabOptions_TDefault type=submit value=Défaut></td>'
			+'				</tr>'
			+'				<tr valign=top>'
			+'					<td><label>Arts Perdus</label></td>'
			+'					<td><input id=tabOptions_RFile size=40 maxlength=150 type=text value="' + Data.options.sound.URL_research + '" />&nbsp</td>'
			+'					<td><input id=tabOptions_RPlay type=submit value=Jouer>'
			+'						<input id=tabOptions_RStop type=submit value=Stop>'
			+'						<input id=tabOptions_RDefault type=submit value=Défaut></td>'
			+'				</tr>'
			+'			</table>'
			+'		</td>'
			+'	</tr>'
			+'</table>'
			+'<br>'
			+'<table class=bsx_table>'
			+'	<tr valign=top>'
			+'		<td><b>fonctionnalités :</b></td>'
			+'	</tr>'
			+'</table>'
			+'<br>'
			+'<table class=bsx_table>'
			+'	<tr valign=top>'
			+'		<td>'
			+'		<label><input id=tabOptions_btnRefresh type=button value="Rafraîchir" /></label>'
			+'		</td>'
			+'	</tr>'
			+'</table>'
			+'<br>'
			+'<table class=bsx_table width=100%>'
			+'	<tr valign=top>'
			+'		<td width=40%><b>Options des onglets :</b></td>'
			+'	</tr><tr valign=top>'
			+'		<td><label><input id=tabOptions_TabContacts type=checkbox '+ (Data.options.disable_contacts?'CHECKED ':'') +' /> Désactiver l\'onglet <B>Contacts</B></label></td>'
			+'		<td><label><input id=tabOptions_TabRadar type=checkbox '+ (Data.options.disable_radar?'CHECKED ':'') +' /> Désactiver l\'onglet <B>Nid d\'Aigle</B></label></td>'
			+'	</tr><tr valign=top>'
			+'		<td><label><input id=tabOptions_TabAlliance type=checkbox '+ (Data.options.disable_alliance?'CHECKED ':'') +' /> Désactiver l\'onglet <B>Alliance</B></label></td>'
			+'	</tr><tr valign=top>'
			+'		<td><label><input id=tabOptions_TabLog type=checkbox '+ (Data.options.disable_log?'CHECKED ':'') +' /> Désactiver l\'onglet <B>Log</B></label></td>'
			+'		<td>&nbsp;</td>'
			+'	</tr>'
			+'</table><br>'
			+'<div class=bsx_title style="margin-bottom:10px">Données du stockage local</div>'
			+'<table class=bsx_table width=100%>'
			+'	<tr valign=top>'
			+'		<td width=30%><label><input id=tabOptions_btnSave type=button value="Enregistrer" title="Forcer la sauvegarde du paramétrage actuel du script" /></label></td>'
			+'		<td width=30%><label><input id=tabOptions_btnClean type=button value="Supprimer" title="Effacer les données du stockage local (internet cache)" /></label></td>'
			+'		<td width=40%><label><input id=tabOptions_btnInspect type=button value="Visualiser" title="Inspecter les données en cache" /></label></td>'
			+'	</tr><tr valign=top><td style="font-size:2px">&nbsp</td>'
			+'	</tr><tr valign=top>'
			+'		<td width=30%><label><input id=tabOptions_btnParams type=button value="Params session" title="Inspecter les paramètres de la session" /></label></td>'
			+'	</tr>'
			+'</table><br>'
			+'</div>';
			t.container.innerHTML = m;

			document.getElementById('tabOptions_JobsSound').addEventListener ('change', function (event){Data.options.sound.enable_jobs = event.target.checked}, false);
			document.getElementById('tabOptions_btnRefresh').addEventListener ('click', t.onClickRefresh, false);
			document.getElementById('tabOptions_btnSave').addEventListener ('click', t.onClickSaveSetting, false);
			document.getElementById('tabOptions_btnClean').addEventListener ('click', t.onClickClearStorage, false);
			document.getElementById('tabOptions_btnInspect').addEventListener ('click', t.onClickInspect, false);
			document.getElementById('tabOptions_btnParams').addEventListener ('click', t.onClickParams, false);
			t.togOpt ('tabOptions_CB_Verbose', Data.options.verboseLog.enabled, VerboseLog.setEnable);
			t.togOpt ('tabOptions_TabRadar', Data.options.disable_radar, t.setEnableTab);
			t.togOpt ('tabOptions_TabContacts', Data.options.disable_contacts, t.setEnableTab);
			t.togOpt ('tabOptions_TabAlliance', Data.options.disable_alliance, t.setEnableTab);
			t.togOpt ('tabOptions_TabLog', Data.options.disable_log, t.setEnableTab);

			document.getElementById('tabOptions_BFile').addEventListener ('change', function (){
				Data.options.sound.URL_building = document.getElementById('tabOptions_BFile').value;
			}, false);
			document.getElementById('tabOptions_BPlay').addEventListener ('click', function (){t.playSound('building')}, false);
			document.getElementById('tabOptions_BStop').addEventListener ('click', function (){t.stopSound('building')}, false);
			document.getElementById('tabOptions_BDefault').addEventListener ('click', function (){
				document.getElementById('tabOptions_BFile').value = SoundPlayer.DEFAULT_SOUND_URL.building;
				Data.options.sound.URL_building = SoundPlayer.DEFAULT_SOUND_URL.building;
				t.playSound ('building');
				}, false);
			document.getElementById('tabOptions_BStop').disabled = true;

			document.getElementById('tabOptions_TFile').addEventListener ('change', function (){
				Data.options.sound.URL_units = document.getElementById('tabOptions_TFile').value;
			}, false);
			document.getElementById('tabOptions_TPlay').addEventListener ('click', function (){t.playSound('units')}, false);
			document.getElementById('tabOptions_TStop').addEventListener ('click', function (){t.stopSound('units')}, false);
			document.getElementById('tabOptions_TDefault').addEventListener ('click', function (){
				document.getElementById('tabOptions_TFile').value = SoundPlayer.DEFAULT_SOUND_URL.units;
				Data.options.sound.URL_units = SoundPlayer.DEFAULT_SOUND_URL.units;
				t.playSound ('units');
				}, false);
			document.getElementById('tabOptions_TStop').disabled = true;

			document.getElementById('tabOptions_RFile').addEventListener ('change', function (){
				Data.options.sound.URL_research = document.getElementById('tabOptions_RFile').value;
			}, false);
			document.getElementById('tabOptions_RPlay').addEventListener ('click', function (){t.playSound('research')}, false);
			document.getElementById('tabOptions_RStop').addEventListener ('click', function (){t.stopSound('research')}, false);
			document.getElementById('tabOptions_RDefault').addEventListener ('click', function (){
				document.getElementById('tabOptions_RFile').value = SoundPlayer.DEFAULT_SOUND_URL.research;
				Data.options.sound.URL_research = SoundPlayer.DEFAULT_SOUND_URL.research;
				t.playSound ('research');
				}, false);
			document.getElementById('tabOptions_RStop').disabled = true;

		} catch (e) {
			t.container.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
		}
	}, 
	hide : function () {
	},
	show : function () {
	},
	togOpt : function (checkboxId, optionVar, callEnable, callIsAvailable) {
		var t = Tabs.Options;
		var checkbox = document.getElementById(checkboxId);
		if (callIsAvailable && callIsAvailable() == false) {
			checkbox.disabled = true;
			return;
		}
		if (optionVar) checkbox.checked = true;
		checkbox.addEventListener ('change', new eventToggle(checkboxId, optionVar, callEnable).handler, false);
		function eventToggle(checkboxId, optionVar, callOnChange) {
			this.handler = handler;
			var optVar = optionVar;
			var callback = callOnChange;
			function handler(event) {
				optVar = this.checked;
				if (callback != null) callback (this.checked);
			}
		}
	},
	setEnableTab : function (){
		var t = Tabs.Options;
		var cRa = document.getElementById('tabOptions_TabRadar');
		var cCo = document.getElementById('tabOptions_TabContacts');
		var cAl = document.getElementById('tabOptions_TabAlliance');
		var cLo = document.getElementById('tabOptions_TabLog');
		Data.options.disable_radar = cRa.checked;
		Data.options.disable_contacts = cCo.checked;
		Data.options.disable_alliance = cAl.checked;
		Data.options.disable_log = cLo.checked;
	},
	onClickRefresh : function () {
		var t = Tabs.Options;
		logit('onClickRefresh from Tab.Options');
		if (t.refreshPlayerBusy) return false;
		t.refreshPlayerBusy = true;
		refreshGameData (t.container, function(){Tabs.Options.refreshPlayerBusy = false;});
	},
	onClickSaveSetting : function () {
		var t = Tabs.Options;
		dialogConfirm('Voulez-vous sauvegarder dans les données permanentes le paramétrage actuel du script ?',
			function(){
				try {
					Data.save();
					verboseLog('Sauvegarde des données dans le localStorage');
					var keys = getKeys (Data.defaults);
					for (var i=0; i < keys.length; i++) {
						var item_name = keys[i];
						Data.setObject ( item_name, Data[item_name] );
					}
				} catch(e) {}
			},
			/* Cancel */
			function(){
			}, true
		);
	},
	onClickClearStorage : function () {
		var t = Tabs.Options;
			dialogConfirm('Êtes-vous sûr de vouloir supprimer toutes les données permanentes ?',
                function(){
					try {
						Data.clearStorage (false);
						//Data.setDefaultValues ('all');
					} catch(e) {}
				},
				/* Cancel */
				function(){
				}, true
			);
	},
	onClickInspect : function () {
		var t = Tabs.Options;
		dialogCopyPaste (false);
	},
	onClickParams : function () {
		var t = Tabs.Options;
		dialogCopyPaste (true);
	},

	playSound : function (task){
		var t = Tabs.Options;
		switch (task) {
			case 'building'	: document.getElementById('tabOptions_BStop').disabled = false; break;
			case 'units'	: document.getElementById('tabOptions_TStop').disabled = false; break;
			case 'research'	: document.getElementById('tabOptions_RStop').disabled = false; break;
		}
		SoundPlayer.PlaySound (task, true);
		setTimeout (function (){t.stopSound(task);}, 4000);
	},
	stopSound : function (task){
		var t = Tabs.Options;
		switch (task) {
			case 'building'	: document.getElementById('tabOptions_BStop').disabled = true; break;
			case 'units'	: document.getElementById('tabOptions_TStop').disabled = true; break;
			case 'research'	: document.getElementById('tabOptions_RStop').disabled = true; break;
		}
		SoundPlayer.StopSound (task);
	}
}
/******************************** Options Tab ********************************/

/******************************** Log Tab ************************************/
Tabs.Log = {
	tabOrder	: LOG_TAB_ORDER,
	tabLabel	: 'Log',
	tabDisabled	: !LOG_TAB_ENABLE,
	lastSubTab	: 'tabLogActions',
	container	: null,
	content		: [],
	title		: null,
	maxEntries	: 500,
	saveEntries	: 200,
	state		: 0,
	timer		: null,

	init : function (div){
		var t = Tabs.Log;
		t.container = div;
		div.innerHTML = ''
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=tabLogActions>Actions</a></li>'
		+'	<li class=tab><a id=tabLogConsole>Console</a></li>'
//		+'	<li class=tab><a id=tabLogRequest>Statistiques</a></li>'
		+'</ul>'
		+'<div id=tabLog_Title class=bsx_title>Log Actions</div>'
		+'<div id=tabLog_DivAction class=bsx_status_ticker style="height:665px; max-height:665px; overflow-y:auto;">'
		+'	<table id=tabLog_ContAction class=bsx_table_console cellspacing=1 width=100%>'
		+'	<tr>'
		+'		<td class=bsx_underline width=5%></td>'
		+'		<td class=bsx_underline width=95%></td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'<div id=tabLog_DivConsole class=bsx_status_ticker style="height:665px; max-height:665px; overflow-y:auto;">'
		+'	<table id=tabLog_ContConsole class=bsx_table_console cellspacing=1 width=100%>'
		+'	<tr>'
		+'		<td class=bsx_underline width=5%></td>'
		+'		<td class=bsx_underline width=95%></td>'
		+'	</tr>'
		+'	</table>'
//		+'</div>'
//		+'<div id=tabLog_DivRequest class=bsx_status_ticker style="height:665px; max-height:665px; overflow-y:auto;">'
//		+'	<div id=tabLog_ContRequest>'
//		+'	</div>'
//		+'	<br/>'
//		+'	<center><input id=tabLogRequest_Clear type=button value="Effacer stats" /></center>'
//		+'	<br>';
		+'</div>';
		t.content.push(document.getElementById('tabLog_ContAction'));
		t.content.push(document.getElementById('tabLog_ContConsole'));
//		t.content.push(document.getElementById('tabLog_ContRequest'));
		t.title = document.getElementById('tabLog_Title');
		document.getElementById('tabLogActions').addEventListener ('click', t.tabLogActions, false);
		document.getElementById('tabLogConsole').addEventListener ('click', t.tabLogConsole, false);
//		document.getElementById('tabLogRequest').addEventListener ('click', t.tabLogRequest, false);
//		document.getElementById('tabLogRequest_Clear').addEventListener('click', function(){
//			t.clearRequestStats();
//			t.tabLogRequest();
//		}, false);

		t.state = 1;
		for (var i=0; i < Data.log.length && i < 2; ++i) {
			var log = Data.log[i];
			for (var j=0; j < log.length; ++j)
				t._addRow(log[j].msg, log[j].ts, i);
		}
//		if (!Data.stats.requests.start_at) Data.stats.requests.start_at = serverTime();
		t.tabLogActions();
	},

	tabLogActions : function (){
		var t = Tabs.Log;
		clearTimeout (t.timer);
		document.getElementById(t.lastSubTab).className='';
		document.getElementById(t.lastSubTab).style.zIndex=0;
		document.getElementById('tabLogActions').className='selected';
		document.getElementById('tabLogActions').style.zIndex=1;
		t.lastSubTab = 'tabLogActions';
		t.content[0].parentNode.style.display = 'block';
		t.content[1].parentNode.style.display = 'none';
//		t.content[2].parentNode.style.display = 'none';
		t.title.innerHTML = 'Log Actions';
	},
	tabLogConsole : function (){
		var t = Tabs.Log;
		clearTimeout (t.timer);
		document.getElementById(t.lastSubTab).className='';
		document.getElementById(t.lastSubTab).style.zIndex=0;
		document.getElementById('tabLogConsole').className='selected';
		document.getElementById('tabLogConsole').style.zIndex=1;
		t.lastSubTab = 'tabLogConsole';
		t.content[1].parentNode.style.display = 'block';
		t.content[0].parentNode.style.display = 'none';
//		t.content[2].parentNode.style.display = 'none';
		t.title.innerHTML = 'Console';
	},
/*	tabLogRequest : function (){
		var t = Tabs.Log;
		clearTimeout (t.timer);
		document.getElementById(UID[t.lastSubTab]).className='';
		document.getElementById(UID[t.lastSubTab]).style.zIndex=0;
		document.getElementById(UID['tabLogRequest']).className='selected';
		document.getElementById(UID['tabLogRequest']).style.zIndex=1;
		t.lastSubTab = 'tabLogRequest';
		t.content[2].parentNode.style.display = 'block';
		t.content[0].parentNode.style.display = 'none';
		t.content[1].parentNode.style.display = 'none';
		t.title.innerHTML = translate('Requests Log');
		t.dispRequests();
		t.timer = setTimeout (t.tabLogRequest, 1000);
	},
	clearRequestStats : function (){
		var t = Tabs.Log;
		Data.stats.requests.start_at	= serverTime();
		Data.stats.requests.last_block	= 0;
		Data.stats.requests.count_block	= 0;
		Data.stats.requests.ajax_type = {};
	},
	dispRequests : function (){
		var t = Tabs.Log;
		var total_requests = 0, total_last_hour = 0, error_requests = 0, error_last_hour = 0;
		Data.stats.requests.run_time = serverTime() - Data.stats.requests.start_at;
		var not_blocked_since = serverTime() - Data.stats.requests.last_block;
		var run_time = (Data.stats.requests.run_time > 0) ? (Data.stats.requests.run_time/3600) : 1;
		var m = '<table id='+ setUID('tabLog_Requests') +' class='+UID['row_style']+' cellspacing=1 width=100%>'
			+'	<tr class=' + UID['row_headers'] + ' align=center>'
			+'		<td width=55%>' + translate('Request') + '</td>'
			+'		<td width=16%>' + translate('Total') + '</td>'
			+'		<td width=13%>' + translate('Per hour') + '</td>'
			+'		<td width=16%>' + translate('Last hour') + '</td>'
			+'	</tr>';
		for (var req_type in Data.stats.requests.ajax_type) {
			if (req_type == 'binary') continue;
			var perHour = Math.round(Data.stats.requests.ajax_type[req_type].time.length / run_time);
			var last_hour = 0, err_last_hour = 0;
			for (var i=0; i < Data.stats.requests.ajax_type[req_type].time.length; i++) {
				if (toNum(serverTime())-Data.stats.requests.ajax_type[req_type].time[i] < 3600) last_hour++;
			}
			for (var i=0; i < Data.stats.requests.ajax_type[req_type].error.length; i++) {
				if (toNum(serverTime())-Data.stats.requests.ajax_type[req_type].error[i] < 3600) err_last_hour++;
			}
			var this_total	= Data.stats.requests.ajax_type[req_type].time.length;
			var this_error	= Data.stats.requests.ajax_type[req_type].error.length;
			total_requests	+= this_total;
			total_last_hour += last_hour;
			error_requests	+= this_error;
			error_last_hour += err_last_hour;
			var err1 = (this_error > 0) ? '&nbsp;(<font color=red>'+ this_error +'</font>)' : '';
			var err2 = (err_last_hour > 0) ? '&nbsp;(<font color=red>'+ err_last_hour +'</font>)' : '';
			m += '	<tr valign=top>'
				+'		<td class=right width=55%>'+ translate('ajax-req-'+req_type) +' :</td>'
				+'		<td align=right width=16%>'+ numf(this_total,' ') + err1 +'</td>'
				+'		<td align=right width=13%>'+ numf(perHour,' ') +'</td>'
				+'		<td align=right width=16%>'+ numf(last_hour,' ') + err2 +'</td>'
				+'	</tr>';
		}
		var perHour = Math.round(total_requests / run_time);
		var err1 = (error_requests > 0) ? '&nbsp;('+ error_requests +')' : '';
		var err2 = (error_last_hour > 0) ? '&nbsp;('+ error_last_hour +')' : '';
		m += '	<tr><td colspan=2>&nbsp</td></tr>'
			+'	<tr><td>&nbsp</td><td colspan=3 align=center><hr></td></tr>'
			+'	<tr valign=top>'
			+'		<td class=right width=55%>'+ translate('Total') +' :</td>'
			+'		<td align=right width=16%><font color=red><b>'+ numf(total_requests,' ') + err1 +'</b></font></td>'
			+'		<td align=right width=13%>'+ numf(perHour,' ') +'</td>'
			+'		<td align=right width=16%><font color=red><b>'+ numf(total_last_hour,' ') + err2 +'</b></font></td>'
			+'	</tr>'
			+'	<tr><td colspan=4>&nbsp</td></tr>'
			+'	<tr valign=top>'
			+'		<td class=right width=55%>'+ translate('Start Date') +' :</td>'
			+'		<td align=left colspan=3>'+ new Date(Data.stats.requests.start_at * 1000).myString() +'</td>'
			+'	</tr>'
			+'	<tr valign=top>'
			+'		<td class=right width=55%>'+ translate('Run Time') +' :</td>'
			+'		<td align=left colspan=3>'+ timestr(Data.stats.requests.run_time, true) +'</td>'
			+'	</tr>'
			+'	<tr valign=top>'
			+'		<td class=right width=55%>'+ translate('Number of one-hour-bans') +' :</td>'
			+'		<td align=left colspan=3>'+ numf(Data.stats.requests.count_block, ' ') +'</td>'
			+'	</tr>'
			+'	<tr valign=top>'
			+'		<td class=right width=55%>'+ translate('Last Block') +' :</td>'
			+'		<td align=left colspan=3>'+ new Date(Data.stats.requests.last_block * 1000).myString() +'</td>'
			+'	</tr>'
			+'	<tr valign=top>'
			+'		<td class=right width=55%>'+ translate('Not blocked since') +' :</td>'
			+'		<td align=left colspan=3>'+ timestr(not_blocked_since, true) +'</td>'
			+'	</tr>'
			+'</table>';
		var element = document.getElementById(UID['tabLog_ContRequest']);
		if (element != null) element.innerHTML = m;
	},
*/
	hide : function (){
		var t = Tabs.Log;
		clearTimeout (t.timer);
	},
	show : function (){
		var t = Tabs.Log;
		if (t.lastSubTab == 'tabLogRequest') t.timer = setTimeout (t.tabLogRequest, 1000);
	},
	_addRow : function (msg, ts, to){
		var t = Tabs.Log;
		var n = to ? to : 0;
		if (t.state != 1) return;
		if (t.content[n].rows.length > t.maxEntries)
			t.content[n].deleteRow(t.maxEntries-1);
		var row = t.content[n].insertRow(0);
		var ts_cell = row.insertCell(0);
		var msg_cell = row.insertCell(1);
		ts_cell.className = 'jewel';
		ts_cell.innerHTML = '(&nbsp;'+ ts +'&nbsp;)&nbsp;';
		msg_cell.innerHTML = msg;
		msg_cell.style.whiteSpace = 'normal';
	}, 
	addMsg : function (msg, to){
		if (Tabs.Log.tabDisabled) return;
		var t = Tabs.Log;
		var n = to ? to : 0;
		var ts = new Date().toTimeString().substring (0,8);
		t._addRow (msg, ts, to);
		while (Data.log[n].length > t.saveEntries)
			Data.log[n].shift();
		Data.log[n].push ({msg:msg, ts:ts});
	}
}
function actionLog(msg)  { Tabs.Log.addMsg(msg, 0); }
function consoleLog(msg) { Tabs.Log.addMsg(msg, 1); }
function verboseLog(msg) { logit(msg); if (Data.options && Data.options.verboseLog.enabled) consoleLog(msg); }
/******************************** Log Tab ************************************/


/* *************************************   COMMON FUNCTIONS   ************************************* */

/******************************** Modal dialog function ***********************/
function dialogConfirm (msg, onContinue, onCancel, two_buttons){
	var save_popUp	= {x:Data.options.popUp.x, y:Data.options.popUp.y};
	var confirmPop = new PopUp ('newversion', 800+Math.randRange(1,50), 300, 300, 150);
	confirmPop.getTopDiv().innerHTML = '<div class=bsx_title style="margin-top:5px; padding-top:5px;  padding-bottom:5px;"><center><b>'+ scriptName +': Confirmation !</b></center></div>';
	var layoutDiv = document.createElement('div');
	layoutDiv.className = 'bsx_container';
	layoutDiv.style.backgroundColor = 'rgb(245,245,228)';
 	layoutDiv.style.color = '#000';
	layoutDiv.style.height = '100%';
	var layout = '<table align=center valign=center style="height: 100%">'
				+'<tr align=center height=60%>'
				+'<td>'+ msg +'</td>'
				+'</tr>'
				+'<tr align=center>'
				+'<td>'
				+'<input id=btn_ok type=button class=confirm_button value="OK" />';
	if (two_buttons) {
		layout += '	&nbsp; &nbsp;'
				+'<input id=btn_cancel type=button class=confirm_button value=Annuler />';
	}
	layout += '</td></tr></table>';
	if (confirmPop.getMainDiv().lastChild)
		confirmPop.getMainDiv().removeChild(confirmPop.getMainDiv().lastChild);
	confirmPop.getMainDiv().appendChild(layoutDiv);
	layoutDiv.innerHTML = layout;

	document.getElementById('btn_ok').addEventListener ('click', function (){
		confirmPop.show(false); 
		Data.options.popUp = {open	: Data.options.popUp.open,
							  x		: save_popUp.x,
							  y		: save_popUp.y};
		if (onContinue && typeof(onContinue) == "function") onContinue();
	}, false);

	if (two_buttons) {
		document.getElementById('btn_cancel').addEventListener ('click', function (){
			confirmPop.show(false); 
			Data.options.popUp = {open	: Data.options.popUp.open,
								  x		: save_popUp.x,
								  y		: save_popUp.y};
			if (onCancel && typeof(onCancel) == "function") onCancel();
		}, false);
	}
	confirmPop.show(true);
}
function dialogCopyPaste (params){
	var save_popUp	= {x:Data.options.popUp.x, y:Data.options.popUp.y};
	var copyPastePop = new PopUp ('copyPaste', 100, 50, 500, 750);
	copyPastePop.getTopDiv().innerHTML = '<div class=bsx_title style="width=90%; margin-top:5px; padding-top:5px;  padding-bottom:5px;"><center><b>'+ scriptName +': Message !</b></center></div>';
	var layoutDiv = document.createElement('div');
	layoutDiv.className = 'bsx_container';
	layoutDiv.style.backgroundColor = 'rgb(245,245,228)';
	layoutDiv.style.color = '#000';
	layoutDiv.style.height = '100%';
	var layout = '<br>'
				+'<table class=bsx_table valign=center width=100%>' //class=jewel 
				+'<tr align=center>'
				+'<td><div id=div_data style="height:630px; max-height:630; overflow-y:auto; font-size:9px"></div></td>'
				+'</tr>'
				+'</table>'
				+'<br>'
				+'<table width=100%>'
				+'<tr align=center>'
				+'<td><input id=btn_ok type=button class=confirm_button value="Fermer" /></td>'
				+'</tr></table>';
	var child_found = true;
	while (child_found) {
		if (copyPastePop.getMainDiv().lastChild)
			copyPastePop.getMainDiv().removeChild(copyPastePop.getMainDiv().lastChild);
		else
			child_found = false;
	}
	copyPastePop.getMainDiv().appendChild(layoutDiv);
	layoutDiv.innerHTML = layout;
	document.getElementById('btn_ok').addEventListener ('click', function (){
		copyPastePop.show(false); 
		Data.options.popUp = {open	: Data.options.popUp.open,
							  x		: save_popUp.x,
							  y		: save_popUp.y};
	}, false);
	if (params) show_params();
	else show_all();
	function show_all(){
		try {
			var keys = getKeys ( Data.defaults );
			for (var i=0; i < keys.length; i++)	{
				if ( /(marches|requests)/i.test( keys[i] ) )
					keys.splice( i , 1 );
			}
			var json_data = '{';
			for (var i = 0; i < keys.length ; i++) {
				var name = keys[i];
				try {
					json_data += '"' + name + '":' + JSON.stringify( Data[name] );
				} catch(e){
					debugLog(e);
				}
				if ( i < keys.length-1 ) json_data += ','
			}
			json_data += '}';
		} catch(e) {}
		setText('div_data', '<textarea cols="115" rows="52" wrap="PHYSICAL">'+ json_data +'</TEXTAREA>');
	}
	function show_params(){
		var session = "";
		var _host = localStorage.getItem( 'host_fb'+C.attrs.userId );
		_host = ( _host || '173.45.94.66' );
		var _segment = localStorage.getItem( 'segment_fb'+C.attrs.userId );
		_segment = ( _segment || '00' );
		session = '$j++;\r\n$joueurs[$j]=array(\r\n'
				+ "'Host' => '" + _host +"', 'segment' => '" + _segment +"',\r\n"
				+ "'signin-authKey' => '" + C.attrs.key +"',\r\n"
				+ "'signin-authSeed' => '" + C.attrs.seed +"',\r\n"
				+ "'signin-userId' => '" + FACEBOOK_ID +"',\r\n"
				+ "\r\n'pl' => '" + JSON.stringify(Seed.getPayload()) +"',\r\n"
				+ "\r\n'Host' => '" + C.attrs.defaultServer +"',\r\n"
				+ "'segment' => '" + C.attrs.defaultSegment +"'\r\n"
				+ ");\r\n";
		setText('div_data', '<textarea cols="115" rows="52" wrap="PHYSICAL">'+ session +'</TEXTAREA>');
	}
	copyPastePop.show(true);
}
function dialogFatal(msg) {
	var pop = new PopUp('fatal', 800+Math.randRange(1,50), 300, 400,300);
	pop.getTopDiv().innerHTML = '<div class=title><center><b>'+ scriptName +': Erreur !</b></center></div>';
	var layoutDiv = document.createElement('div');
	layoutDiv.className = 'bsx_container';
	layoutDiv.style.backgroundColor = 'rgb(245,245,228)';
 	layoutDiv.style.color = '#000';
	layoutDiv.style.height = '100%';
	var layout = '<div style="height:270px; max-height:270px; overflow-y:auto">'
				+'<table width=100%><tr align=center><td width=96%><BR>' + msg + '</td></tr></table></div>';
	pop.getMainDiv().appendChild(layoutDiv);
	layoutDiv.innerHTML = layout;
	pop.show(true);
	document.getElementById('support_link').addEventListener('click', redirect, false);
	function redirect() { window.open(scriptUrlError, 'www.wackoscripts.com'); }
}
function updaterConfirm (msg, onContinue, onCancel, two_buttons){
	var save_popUp	= {x:Data.options.popUp.x, y:Data.options.popUp.y};
	updaterPop = new PopUp ('updater', 800+Math.randRange(1,50), 300, 300, 150);
	updaterPop.getTopDiv().innerHTML = '<div class=title><center><b>'+ scriptName +': Confirmation !</b></center></div>';
	var layoutDiv = document.createElement('div');
	layoutDiv.className = 'bsx_container';
	layoutDiv.style.backgroundColor = 'rgb(245,245,228)';
 	layoutDiv.style.color = '#000';
	layoutDiv.style.height = '100%';
	var layout = '<table align=center valign=center style="height: 100%">'
				+'<tr align=center height=60%>'
				+'<td>'+ msg +'</td>'
				+'</tr>'
				+'<tr align=center>'
				+'<td>'
				+'<input id=btn_ok type=button class=confirm_button value="OK" />';
	if (two_buttons) {
		layout += '	&nbsp; &nbsp;'
				+'<input id=btn_cancel type=button class=confirm_button value="Annuler" />';
	}
	layout += '</td></tr></table>';
	if (updaterPop.getMainDiv().lastChild)
		updaterPop.getMainDiv().removeChild(updaterPop.getMainDiv().lastChild);
	updaterPop.getMainDiv().appendChild(layoutDiv);
	layoutDiv.innerHTML = layout;

	document.getElementById('btn_ok').addEventListener ('click', function (){
		updaterPop.show(false); 
		Data.options.popUp = {open	: Data.options.popUp.open,
							  x		: save_popUp.x,
							  y		: save_popUp.y};
		if (onContinue && typeof(onContinue) == "function") onContinue();
	}, false);

	if (two_buttons) {
		document.getElementById('btn_cancel').addEventListener ('click', function (){
			updaterPop.show(false); 
			Data.options.popUp = {open	: Data.options.popUp.open,
								  x		: save_popUp.x,
								  y		: save_popUp.y};
			if (onCancel && typeof(onContinue) == "function") onCancel();
		}, false);
	}
	updaterPop.show(true);
}
function ModalDialog (curtainDiv, width, height, styleName, allowClose, notifyClose){
	this.allowClose = function (onOff){
		if (onOff)  document.getElementById('ModalDialog_btnClose').style.display = 'block';
		else		document.getElementById('ModalDialog_btnClose').style.display = 'none';
	}
	this.destroy = function (){
		if (!this.destroyed){
			this.curtainDiv.removeChild(this.curtain);
			this.curtainDiv.removeChild(this.div);
		}
	}
	this.hide = function (){
		this.curtainDiv.style.display='none';
		this.curtainDiv.style.display='none';
	}
	this.show = function (){
		this.curtainDiv.style.display='block';
		this.curtainDiv.style.display='block';
	}
	this.getContentDiv = function (){
		return document.getElementById('ModalDialog_Close');
	}
	this.getTopDiv = function (){
		return document.getElementById('ModalDialog_Top');
	}
	var offset = Element.positionedOffset(curtainDiv);
	this.curtainDiv = curtainDiv;
	this.curtain = document.createElement ('div');
	this.curtain.style.top = (offset.top) +'px';
	this.curtain.style.left = (offset.left) + 'px';
	this.curtain.style.width = curtainDiv.offsetWidth +'px';
	this.curtain.style.height = (curtainDiv.offsetHeight) +'px';
	this.curtain.style.backgroundColor = '#000';
	this.curtain.style.opacity = '0.6';
	this.curtain.style.zIndex = parseInt(curtainDiv.style.zIndex) + 1;
	this.curtain.style.position = 'absolute';
	this.curtain.style.margin = curtainDiv.style.margin;
	this.curtain.style.padding = curtainDiv.style.padding;
	curtainDiv.appendChild (this.curtain);

	this.div = document.createElement('div');
	if (styleName)
		 this.div.className = styleName;
	else this.div.className = 'bsx_container';

	this.div.style.backgroundColor = 'rgb(245,245,228)';
	this.div.style.color = '#000';
	this.div.style.width = width +'px';
	this.div.style.height = height +'px';
	this.div.style.position = 'absolute';
	this.div.style.zindex = parseInt(curtainDiv.style.zIndex) + 2;
	this.div.style.top = ((curtainDiv.offsetHeight-height)/2 + offset.top) + 'px';
	this.div.style.left = ((curtainDiv.offsetWidth-width)/2 + offset.left) + 'px';
	this.div.innerHTML = ''
		+'<table height=100% width=100%>'
		+'	<tr valign=middle height=10%>'
		+'		<td width=100% valign=top>'
		+'		<div id=ModalDialog_Top class="popup_top"></div>'
		+'		</td>'
		+'	</tr>'
		+'	<tr valign=middle height=70%>'
		+'		<td>'
		+'		<div id=ModalDialog_Close style="text-align:center"></div>'
		+'		</td>'
		+'	</tr>'
		+'	<tr valign=middle align=center>'
		+'		<td width=100% align=center>'
		+'		<div style="text-align:center;"><center>'
		+'			<input id=ModalDialog_btnClose type=button value="Fermer" style="display:none" />'
		+'		</center></div>'
		+'		</td>'
		+'	</tr>'
		+'</table>';
	curtainDiv.appendChild(this.div);
	this.allowClose(allowClose);
	this.notifyClose = notifyClose;
	var t = this;
	document.getElementById('ModalDialog_btnClose').addEventListener('click', function (){
		t.destroyed = true;
		t.curtainDiv.removeChild(t.curtain);
		t.curtainDiv.removeChild(t.div);
		if (t.notifyClose) notifyClose();
	}, false);
}
function UnitSendDialog (curtainDiv, order_id, owner_id, target_id, troops, allowClose, notifyClose){
	var this_id = target_id, this_order = unitSend_desc[order_id], name = '', coords = '', img = '', target_type, this_troops = {};
	if (this_id >= 0) {
		target_type = 'user';
		var note = Seed.gameData.userNotes[this_id];
		if (!is_null(note)) {
			var dist = getDistance(Seed.gameData.account.x, Seed.gameData.account.y, note.x, note.y);
			var fbid = (note.social_id ? (note.social_id.indexOf("fb")>=0 ? note.social_id.substr(2) : note.social_id.fbid) : '');
			name = note.fullname+' (niveau '+note.level+')';
			coords = 'X:'+note.x+', Y:'+note.y+' (Dist '+dist+' Km)';
			img  = (name ? (fbid ? vignette(fbid, false, '', 30) : vignette(note.avatar, true, '', 30)) : '');
		} else {
			var note = Seed.gameData.raid_data.locations[this_id];
			if (!is_null(note)) {
				target_type = 'raid';
				var dist = getDistance(Seed.gameData.account.x, Seed.gameData.account.y, note.x, note.y);
				var req = Seed.statics.raid_types[note.type];
				name = req.name+' (niveau '+note.level+')';
				coords = 'X:'+note.x+', Y:'+note.y+' (Dist '+dist+' Km)';
				img = vignette2('ui/globalMap/raids/rl'+(note.type < 10 ? '0' : '')+ note.type+'.jpg');
			}
		}
		if (owner_id == target_id && target_id == Seed.gameData.account.id && (order_id == order_ids.Bunker || order_id == order_ids.Return)) img = vignette2('ui/command/bunkerAvatar.jpg');
	} else {
		var new_id = this_id * -1;
		var note = Seed.gameData.locationNotes[new_id];
		if (!is_null(note)) {
			var dist = getDistance(Seed.gameData.account.x, Seed.gameData.account.y, note.x, note.y);
			name = note.name;
			coords = 'X:'+note.x+', Y:'+note.y+' (Dist '+dist+' Km)';
			if (note.mine_info) {
				target_type = 'location';
				var z = '01';
				if (note.mine_info.type > 9)  z = note.mine_info.type;
				img = vignette2('ui/globalMap/mines/mine_'+z+'_ps.jpg');
			} else if (note.tower_info) {
				target_type = 'beacon';
				img = vignette2('ui/globalMap/towers/tower0'+ note.tower_info.level+'.jpg');
			}
		}
	}
	var h = '<div class=bsx_subtitle width=100%><table class=bsx_table width=100%>'
			+'<tr valign=top>'
			+'	<td align=center width=39px>'+ img +'</td>'
			+'	<td align=left width=40%><font color=white>'+ name + '</font><br><span class=yellow>'+ coords +'</span></td>';
	if (troops)
		h += '	<td align=center width=12% id=UnitSend_sel_all><A><span class=ref_gold>Tous</span></A></td>'
			+'	<td align=center width=12% id=UnitSend_sel_att><A><span class=ref_gold>Attaque</span></A></td>'
			+'	<td align=center width=12% id=UnitSend_sel_def><A><span class=ref_gold>Défense</span></A></td>'
			+'	<td align=center width=12% id=UnitSend_sel_spy><A><span class=ref_gold>Espions</span></A></td>'
			+'	<td align=center width=12% id=UnitSend_sel_none><A><span class=ref_gold>Annuler</span></A></td>';
	else
		h += '	<td align=center width=60%>&nbsp;</td>';
	h += '</tr></table></div>';

	this.allowClose = function (onOff){
		if (onOff)  document.getElementById('UnitSend_btnClose').style.display = 'block';
		else		document.getElementById('UnitSend_btnClose').style.display = 'none';
	}
	this.destroy = function (){
		if (!this.destroyed){
			this.curtainDiv.removeChild(this.curtain);
			this.curtainDiv.removeChild(this.div);
		}
	}
	this.hide = function (){
		this.curtainDiv.style.display='none';
		this.curtainDiv.style.display='none';
	}
	this.show = function (){
		this.curtainDiv.style.display='block';
		this.curtainDiv.style.display='block';
	}
	this.getContentDiv = function (){
		return document.getElementById('UnitSend_Close');
	}
	var offset = Element.positionedOffset(curtainDiv);
	this.curtainDiv = curtainDiv;
	this.curtain = document.createElement ('div');
	this.curtain.style.top = (offset.top) +'px';
	this.curtain.style.left = (offset.left) + 'px';
	this.curtain.style.width = curtainDiv.offsetWidth +'px';
	this.curtain.style.height = (curtainDiv.offsetHeight) +'px';
	this.curtain.style.backgroundColor = '#000';
	this.curtain.style.opacity = '0.6';
	this.curtain.style.zIndex = parseInt(curtainDiv.style.zIndex) + 1;
	this.curtain.style.position = 'absolute';
	this.curtain.style.margin = curtainDiv.style.margin;
	this.curtain.style.padding = curtainDiv.style.padding;
	curtainDiv.appendChild (this.curtain);

	this.div = document.createElement('div');
	this.div.className = 'bsx_container';
	this.div.style.backgroundColor = 'rgb(245,245,228)';
	this.div.style.color = '#000';
	this.div.style.width = '500px';
	this.div.style.height = '420px';
	this.div.style.position = 'absolute';
	this.div.style.zindex = parseInt(curtainDiv.style.zIndex) + 2;
	this.div.style.top = ((curtainDiv.offsetHeight-420)/2 + offset.top) + 'px';
	this.div.style.left = ((curtainDiv.offsetWidth-500)/2 + offset.left) + 'px';

	this.div.innerHTML = ''
		+'<table height=100% width=100%>'
		+'	<tr valign=middle height=18px>'
		+'		<td width=100% valign=top>'
		+'		<div class=bsx_title><center><b>'+ this_order +'</b></center></div>'
		+'		</td>'
		+'	</tr>'
		+'	<tr valign=middle height=360px>'
		+'		<td width=100%>'+h
		+'		<div id=UnitSend_Body style="height:300px; max-height:300; overflow-y:auto; font-size:8pt;" class=scrollable>'+getBody()+'</div>'
		+'		</td>'
		+'	</tr>'
		+'	<tr valign=middle align=center>'
		+'		<td width=100% align=center>'
		+'		<div style="text-align:center;"><center><table width=60%><tr>'
		+'			<td width=45%><input id=UnitSend_btnSubmit type=button value="Go! Go! Go!" /></td>'
		+'			<td width=10%>&nbsp;</td>'
		+'			<td width=45%><input id=UnitSend_btnClose type=button value="Annuler" style="display:none" /></td>'
		+'		</center></div>'
		+'		</td>'
		+'	</tr>'
		+'</table>';
	curtainDiv.appendChild(this.div);
	this.allowClose(allowClose);
	this.notifyClose = notifyClose;
	var t = this;

	if (troops) {
		if (document.getElementById('UnitSend_sel_all')) document.getElementById('UnitSend_sel_all').addEventListener ('click', function () {onClickSel ('all');}, false);
		if (document.getElementById('UnitSend_sel_att')) document.getElementById('UnitSend_sel_att').addEventListener ('click', function () {onClickSel ('att');}, false);
		if (document.getElementById('UnitSend_sel_def')) document.getElementById('UnitSend_sel_def').addEventListener ('click', function () {onClickSel ('def');}, false);
		if (document.getElementById('UnitSend_sel_spy')) document.getElementById('UnitSend_sel_spy').addEventListener ('click', function () {onClickSel ('spy');}, false);
		if (document.getElementById('UnitSend_sel_none')) document.getElementById('UnitSend_sel_none').addEventListener ('click', function () {onClickSel ('none');}, false);
		for (var i in troops) {
			var trp = document.getElementById('unit_'+Seed.units_id[i].id+'_qty');
			if (trp)
				trp.addEventListener('change', function (event){
					var val = toNum(event.target.value);
					var id = event.target.getAttribute('ref');
					if (val < 0 || val > troops[id]){
						event.target.style.backgroundColor = 'red';
						return;
					}
					event.target.style.backgroundColor = '';
					this_troops[id] = val;
					setSendButtonStyle();
				}, false);
		}
	}

	if (document.getElementById('UnitSend_btnClose')) document.getElementById('UnitSend_btnClose').addEventListener('click', function(){closeThis(false);}, false);
	if (document.getElementById('UnitSend_btnSubmit'))
		document.getElementById('UnitSend_btnSubmit').addEventListener('click', function (){
			setText('UnitSend_Body', '<div height=100% width=100% align=center valign=middle>Lancement de la marche...</div>');
			setButtonStyle (document.getElementById('UnitSend_btnSubmit'), false, 'btn_red');
			setButtonStyle (document.getElementById('UnitSend_btnClose'), false, 'btn_blue');
			sendMarch(order_id, owner_id, this_id, this_troops, function(rslt){
				Seed.dirty_marches = true;
				if (rslt.done){
					actionLog(rslt.msg);
					setText('UnitSend_Body', '<div height=100% width=100% align=center valign=middle>'+rslt.msg+'</div>');
					if (order_id == order_ids.Robbery && target_type == 'user' && Seed.gameData.userNotes[this_id]) {
						var note = Seed.gameData.userNotes[this_id];
						if (Data.map.evolution[this_id]) Data.map.evolution[this_id].raid = serverTimeMs();
						else Data.map.evolution[this_id] = {level:note.level, gap_lvl:0, xp:0, gap_xp:0, buildings:null, raid:serverTimeMs()};
					}
				} else {
					setText('UnitSend_Body', '<div height=100% width=100% align=center valign=middle>'+rslt.msg+'</div>');
				}
				setTimeout (closeThis, 4000, true);
				return;
			});
		}, false);
	setSendButtonStyle ();
	function closeThis (send_notify) {
		t.destroyed = true;
		t.curtainDiv.removeChild(t.curtain);
		t.curtainDiv.removeChild(t.div);
		if (t.notifyClose && send_notify) notifyClose();
	}
	function sendMarch (this_order_id, this_owner_id, this_target_id, troops_to_send, callback) {
		var tot = 0, _typ = 0, t = null, _r = null, trading_payload = null, troops_payload = null;
		for (var i in troops_to_send) tot += toNum(troops_to_send[i]);
		if (tot <= 0) {
			closeThis(false);
			return;
		}
		if (!is_null(troops_to_send)) {
			var _u = {};
			for (var i in troops_to_send) { if(toNum(troops_to_send[i]) > 0) _u[i] = troops_to_send[i];}
			_t = {t:_u};
			troops_payload = {o:this_order_id, t:_t, r:_r};
		}
		if (target_type == 'raid') _typ = 1;
		/* _r = {g:this.goldMoney, m:this.money, u:this.uranium, t:this.titanite, c:this.biochips}; */
		var data = AutoRefresh.createRequestData({o:this_owner_id, t:this_target_id, u:_typ, di:trading_payload, ti:troops_payload});
		new MyAjaxRequest (C.attrs.defaultServer, C.attrs.defaultSegment, 'SendUnit', JSON.stringify(data), function (rslt) {
			if (rslt.ok && rslt.dat) {
				var is_updated = Seed.updateGameData (rslt.dat);
				if (!is_updated) {
				}
				if (callback) callback({done:true, msg:'Marche envoyée'});
			} else {
				if (callback) callback({done:false, msg:'Erreur lors de l\'envoi de la marche<br>'+(rslt.errmsg || '')});
			}
			return;
		}, true);
	}
	function getBody (){
		var m = '<table style="margin-top:3px" width=100% class=row_style>';
		if (troops) {
			var tc = 0, header = '';
			for (var g=unit_groups.length-1; g>=0; g--) {
				if (g % 2 == 1) {
					if (tc > 0) {
						for (var c=tc; c<=4; c++) m += '<td width="34px" align=center title="">&nbsp;</td><td align=right width=8%>&nbsp;</td><td align=right width=13%>&nbsp;</td>';
						m += '</tr>';
					}
					tc = 0;
					header = '<tr class=left valign=top style="margin-top:5px; padding-top:5px;"><td align=left width=99% colspan=12><b>'+ unit_groups[g-1].desc +'</b></td></tr>';
				}
				for (var i in troops) {
					if (Seed.reqs[i].stats.group_id == unit_groups[g].id) {
						var name = Seed.reqs[i].name;
						var img = Seed.reqs[i].img;
						if (tc == 0) { m += header+'<tr valign=middle>'; header = ''; }
						m += '	<td width="34px" align=center title="'+name+'">' + vignette2(img) + '</td>'
							+'	<td align=right width=8%>'+numf(troops[i],' ')+'</td>'
							+'	<td align=center width=13%><input id=unit_'+Seed.units_id[i].id+'_qty ref='+i+' size=4 maxlength=6 type=text value="'+(this_troops[i] || '')+'" /></td>';
						tc ++;
						if (tc >= 4) {
							tc = 0;
							m += '</tr>';
						}
					}
				}
			}
			if (tc > 0) {
				for (var c=tc; c<=4; c++) m += '<td width="34px" align=center title="">&nbsp;</td><td align=right width=8%>&nbsp;</td><td align=right width=13%>&nbsp;</td>';
				m += '</tr>';
			}
		}
		m += '</table>';
		return m;
	}
	function onClickSel (type) {
		switch (type) {
			case 'all' :
				for (var i in troops) this_troops[i] = troops[i];
				break;
			case 'att' :
				for (var i in troops) {
					if (Seed.reqs[i].stats.kind_id == '0') this_troops[i] = troops[i];
					else this_troops[i] = '';
				}
				break;
			case 'def' :
				for (var i in troops) {
					if (Seed.reqs[i].stats.kind_id == '1') this_troops[i] = troops[i];
					else this_troops[i] = '';
				}
				break;
			case 'spy' :
				for (var i in troops) {
					if (Seed.reqs[i].stats.kind_id == '2') this_troops[i] = troops[i];
					else this_troops[i] = '';
				}
				break;
			default :
				for (var i in troops) this_troops[i] = '';
				break;
		}
		var m = getBody();
		setText('UnitSend_Body',m);
		setSendButtonStyle();
	}
	function setSendButtonStyle () {
		var tot = 0;
		for (var i in this_troops) tot += toNum(this_troops[i]);
		if (document.getElementById('UnitSend_btnSubmit')) {
			if (tot > 0) setButtonStyle (document.getElementById('UnitSend_btnSubmit'), true, 'btn_red');
			else setButtonStyle (document.getElementById('UnitSend_btnSubmit'), false, 'btn_red');
		}
	}
}
/******************************** Modal dialog function ***********************/

/******************************** TabManager + WinManager + PopUp *************/
var tabManager = {
	tabList : {}, /* {name, obj, div} */
	currentTab : null,

	init : function (mainDiv){
		var t = tabManager;
		var sorter = [];
		for (k in Tabs){
			if ((k == 'Radar'		 && nvl(Data.options.disable_radar, !RADAR_TAB_ENABLE)) ||
				(k == 'Alliance'	 && nvl(Data.options.disable_alliance, !ALLIANCE_TAB_ENABLE)) ||
				(k == 'Contacts'	 && nvl(Data.options.disable_contacts, !CONTACTS_TAB_ENABLE)) ||
				(k == 'Log'			 && nvl(Data.options.disable_log, !LOG_TAB_ENABLE)))
				Tabs[k].tabDisabled = true;
			else if (k == 'Radar' || k == 'Alliance' || k == 'Contacts' || k == 'Log')
				Tabs[k].tabDisabled = false;
			if (!Tabs[k].tabDisabled){
				t.tabList[k] = {};
				t.tabList[k].name = k;
				t.tabList[k].uid = 'tab_' + k;
				t.tabList[k].obj = Tabs[k];
				if (Tabs[k].tabLabel != null)
					 t.tabList[k].label = Tabs[k].tabLabel;
				else t.tabList[k].label = k;
				if (Tabs[k].tabOrder != null)
					 sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
				else sorter.push([1000, t.tabList[k]]);
				t.tabList[k].div = document.createElement('div');
			}
		}

		sorter.sort (function (a,b){return a[0]-b[0]});

		var ntabs = sorter.length;
		if (ntabs > 9) { var line1 = 9; var addStyle = 'style="border-bottom:none; padding-bottom:0;"'; var addClass = ' line1'; }
		else { var line1 = sorter.length; var addStyle = ''; var addClass = ''; }

		var m = '<div class=bsx_title_main style="padding-top:5px; padding-bottom:5px;"><table width=95% align=center>'
		+'	<tr align=center><td width=51% align=left>'+ scriptName +' by '+ mainAuthor  +' - v'+ scriptVersion +' (client v' + client_ver + ')</td>'
		+'		<td width=27% align=center><SPAN id=tabManager_Alert></span></td>'
		+'		<td width=22% align=left><SPAN id=tabManager_Time></span></td>'
		+'	</tr></table></div>';

		m += '<ul class=tabs '+addStyle+'>';
		m += '<li class="tab first'+addClass+'"><a id='+ sorter[0][1].uid +'>'+ sorter[0][1].label +'</a></li>';
		for (var i=1; i<line1; i++)
			m += '<li class="tab'+addClass+'"><a id='+ sorter[i][1].uid +'>'+ sorter[i][1].label +'</a></li>';
		m += '</ul>';
		if (sorter.length > line1) {
			m += '<ul class="tabs line2">';
			for (var i=line1; i<sorter.length; i++) {
				if (i==line1) var addClass = ' first';
				else var addClass = '';
				m += '<li class="tab line2'+addClass+'"><a id='+ sorter[i][1].uid +'>'+ sorter[i][1].label +'</a></li>';
			}
			m += '</ul>';
		}
		m += '<div id=' + div_player_attack + '></div>'
			+'<div id=' + div_player_raid + '></div>'
			+'<div id=' + div_player_building + '></div>'
			+'<div id=' + div_player_units + '></div>'
			+'<div id=' + div_player_research + '></div>';
		mainPop.getTopDiv().innerHTML = m;

		t.currentTab = null;
		for (k in t.tabList) {
			if (t.tabList[k].name == Data.options.currentTab)
				t.currentTab = t.tabList[k] ;
			document.getElementById(t.tabList[k].uid).addEventListener('click', this.e_clickedTab, false);
			var div = t.tabList[k].div;
			div.className = 'bsx_container';
			div.style.display = 'none';
			mainDiv.appendChild(div);
			try {
				t.tabList[k].obj.init(div);
			} catch (e){
				div.innerHTML += "INIT ERROR: "+ e;
			}
		}
		if (t.currentTab == null)
			t.currentTab = sorter[0][1];    
		t.setTabStyle (document.getElementById (t.currentTab.uid), true);
		t.currentTab.div.style.display = 'block';
		t.showClock();
	},
	hideTab : function (){
		var t = tabManager;
		t.currentTab.obj.hide();
	},
	showTab : function (){
		var t = tabManager;
		t.currentTab.obj.show();
	},
	setTabStyle : function (e, selected){
		if (selected){
			e.style.zIndex = 1;
			e.className = 'tab selected';
		} else {
			e.style.zIndex = 0;
			e.className = 'tab';
		}
	},
	e_clickedTab : function (event){
		var t = tabManager, element;
		if (event.target.tagName == 'A')
			element = event.target;
		else {
			var parentElement = event.target.parentNode;
			while (parentElement.tagName != 'A')
				parentElement = parentElement.parentNode;
			element = parentElement;
		}
		var id = element.getAttribute('id');
		for (k in t.tabList)
			if (t.tabList[k].uid == element.id) {
				var newTab = t.tabList[k];
				break;
			}
		if (t.currentTab.name != newTab.name){
			t.setTabStyle (document.getElementById (newTab.uid), true);
			t.setTabStyle (document.getElementById (t.currentTab.uid), false);
			t.currentTab.obj.hide ();
			t.currentTab.div.style.display = 'none';
			t.currentTab = newTab;
			newTab.div.style.display = 'block';
			Data.options.currentTab = newTab.name;      
		}
		newTab.obj.show();
	},
	showClock : function (){
		var t = tabManager;
		var now = new Date();
		now.setTime(now.getTime());
		setText('tabManager_Time', '<font color="#000000"><b>'+ now.toTimeString().substring (0,8) +'</b></font>');
		setText('tabManager_Alert', SoundPlayer.shortString);
		if (document.getElementById('short_alerts'))
			document.getElementById('short_alerts').addEventListener ('click', function(){
				SoundPlayer.StopSound('attack');
				SoundPlayer.StopSound('raid');
				if (SoundPlayer.attack_repeat_timer) {clearTimeout(SoundPlayer.attack_repeat_timer); SoundPlayer.attack_repeat_timer = null;}
				if (SoundPlayer.raid_repeat_timer) {clearTimeout(SoundPlayer.raid_repeat_timer); SoundPlayer.raid_repeat_timer = null;}
			}, false);
		setTimeout(t.showClock, 1000);
	}
}
var WinManager = {
	wins : {},  /* prefix : PopUp obj */
	get : function (prefix){
		var t = WinManager;
		return t.wins[prefix];
	},
	add : function (prefix, pop){
		var t = WinManager;
		t.wins[prefix] = pop;
	},
	del : function (prefix){
		var t = WinManager;
		delete t.wins[prefix];
	}    
}
function PopUp (prefix, x, y, width, height, onClose) {
	var pop = WinManager.get(prefix);
	if (pop){
		pop.show (false);
		return pop;
	}
	this.BASE_ZINDEX = 100;

	/* protos ... */
	this.show = show;
	this.toggleHide = toggleHide;
	this.getTopDiv = getTopDiv;
	this.getMainDiv = getMainDiv;
	this.getLayer = getLayer;
	this.setLayer = setLayer;
	this.getLocation = getLocation;
	this.setLocation = setLocation;
	this.focusMe = focusMe;
	this.unfocusMe = unfocusMe;
	this.centerMe = centerMe;
	this.destroy = destroy;
	this.setModal = setModal;
	this.setHeight = setHeight;
	this.toggleHideBody = toggleHideBody;

	/* object vars ... */
	this.div = document.createElement('div');
	document.body.appendChild(this.div);

	this.prefix = prefix;
	this.onClose = onClose;

	if ( x < 0 || x > document.body.offsetWidth) x = 0;
	if ( y < 0 || y > document.body.offsetHeight) y = 0;

	/* Scramble */
	rndPopup = ['outer', 'bar', 'top', 'main', 'close'];
	for (var s=0; s<rndPopup.length; s++) {
		rndPopup[rndPopup[s]] = prefix + '_' + rndPopup[s];
	}
	var t = this;
	this.div.id = rndPopup['outer'];
	this.div.className = 'popup_outer';
	this.div.style.zIndex = this.BASE_ZINDEX;
	this.div.style.position = 'absolute';
	this.div.style.display = 'none';
	this.div.style.width = width + 'px';
	this.div.style.height = height + 'px';
	this.div.style.top = (y||0) + 'px';
	this.div.style.left = (x||0) + 'px';

	var m = '<span id='+ rndPopup['close'] +' class="popup_close">X</span>\
			<TABLE cellspacing=0 width=100% height=100%>\
			<TR id="'+ rndPopup['bar'] +'" class="popup_bar">\
				<TD width=100% valign=bottom>\
				<SPAN id="'+ rndPopup['top'] +'" class="popup_top"></span></td>\
			</tr>\
			<TR><TD height=100% valign=top colspan=2 id="'+ rndPopup['main'] +'" class="popup_main"></td></tr></table>';
	this.div.innerHTML = m;
	document.getElementById(rndPopup['close']).addEventListener ('click', e_XClose, false);
	document.getElementById(rndPopup['bar']).addEventListener ('dblclick', function(){toggleHideBody(height)}, false);

	this.dragger = new Draggable(this.div, { 
		handle		: rndPopup['bar'],
		scroll		: window,
		onEnd		: function(dragger, event){
			var el = dragger.element;
			var offset = Element.cumulativeOffset(el);
			Data.options.popUp.x = offset.left;
			Data.options.popUp.y = offset.top;
			el.style.zIndex = 1000;
		}
	});

	this.div.addEventListener ('mousedown', e_divClicked, false);
	WinManager.add(prefix, this);

	function setModal (onOff){}
	function e_divClicked (){ t.focusMe(); }  
	function e_XClose (){ if (t.onClose != null) t.onClose(); else t.show(false);}
	function focusMe (){ t.setLayer(15);	}
	function unfocusMe (){ t.setLayer(-15); }
	function getLocation() { return {x: toNum(this.div.style.left), y: toNum(this.div.style.top)}; }
	function setLocation (loc){	t.div.style.left = loc.x +'px'; t.div.style.top = loc.y +'px'; }
	function destroy (){ document.body.removeChild(t.div); WinManager.del (t.prefix); }
	function centerMe (parent){
		if (parent == null)
			 var coords = Element.cumulativeOffset(document.body);
		else var coords = Element.cumulativeOffset(parent);
		var left = ((document.body.offsetWidth - toNum(t.div.style.width)) / 2) + coords.left;
		var top = ((document.body.offsetHeight - toNum(t.div.style.height)) / 2) + coords.top;
		if (left < 0) left = 0;
		if (top < 0) top = 0;
		t.div.style.left = x +'px';
		t.div.style.top = y +'px';
	}
	function setHeight (h) { t.div.style.height = h +'px'; }
	function setLayer(zi){ t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);}
	function getLayer(){ return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX; }
	function getTopDiv(){ return document.getElementById(rndPopup['top']); }
	function getMainDiv(){ return document.getElementById(rndPopup['main']); }
	function show(b){
		if (b){
			t.div.style.display = 'block';
			t.focusMe ();
		} else {
			t.div.style.display = 'none';
		}
		return b;
	}
	function toggleHide(t){
		if (t.div.style.display == 'block')
			 return t.show (false);
		else return t.show (true);
	}
	function toggleHideBody(height){
		var element = t.getMainDiv();
		if (element.style.display == 'block') {
			element.style.display = 'none';
			element.style.height = '0px';
			t.setHeight('52');
		} else {
			element.style.display = 'block';
			element.style.height = '100%';
			t.setHeight(height);
		}
	}
}
/******************************** TabManager + WinManager + PopUp *************/


/********************************************************************************
* MyAjaxRequest : Performs the following actions:
*  - Places all parameters into an object
*  - Determines method
*  - Sets maximum timeout
*  - Validates returned data and passes back results to originating function
*
* Returns the following data:
*  - ok (boolean)
*  - dat (object if present)
*  - errmsg (string if present)
********************************************************************************/
function MyAjaxRequest(url, segment, method_name, params, callback, isPost, isBinary, isFacebook, isStaticData) {

	var options = {onSuccess:onSuccess, onFailure:onFailure};
	var ajax, msg, headers={};

	options.method = (isPost || isPost ==1) ? 'POST' : 'GET';
	options.parameters = params;
	options.timeoutSecs = 45;
	options.isBinary = isBinary;
	options.isFacebook = isFacebook;

	function onSuccess(r) {
		var success = true, errmsg = '';
		if (r.status === 200 && r.responseText) {
			if (url.indexOf(".xml") !== -1 || isBinary) {
				callback({ok:true, dat:r.responseText});
			} else {
				var data = r.responseText;
				if (!isFacebook) data = ((data.indexOf("}!") != -1) ? data.substr(0, data.indexOf("}!")+1) : data);
				if (isStaticData) data = ((data.indexOf('"cl":{') != -1) ? data.substr(0, data.indexOf('"cl":{'))+'}' : data);
				if (data.indexOf("e{") == 0) {
					data = data.substr(1);
					success = false;
				} 
				var retry = false;
				try {
					var parsed_data = JSON.parse( data );
				} catch (e) {retry=true;}
				if (retry) {
					try {
						var parsed_data = eval('('+data+')');
//					} catch (e) {logit ('could not parse responseText = '+e); success=false; errmsg=e;}//r.responseText;}
					} catch (e) {logit ('could not parse responseText = '+data+'\n'+e); success=false; errmsg=e;}
				}
				if (!success && parsed_data && parsed_data.m)  errmsg = parsed_data.m;
				callback({ok:success, dat:parsed_data, errmsg:errmsg});
			}
		} else {
			msg = 'The request was successful but no data was returned';
			callback({ok:false, errmsg:msg});
		}
	}

	function onFailure(r) {
		var res = {
			ok		: false,
			status	: r.status,
			errmsg	: r.statusText
		};
		if (r.status > 200 && r.responseText && !(/(404|500|502)/.test(r.status)) ) {
			res.dat = r.responseText;
			res.errmsg = r.responseText;
		} else if (r.status == 404) {
			res.errmsg = 'The page you were looking for doesn\'t exist (404)';
		} else if (r.status == 500) {
			res.errmsg = (r.statusText || 'Internal Server Error')+' (500)';
		} else if (r.status == 502) {
			res.errmsg = (r.statusText || 'Bad gateway')+' (502)';
		} else {
			res.errmsg = 'This browser is not compatible at this time ('+r.status+')';
		}
		callback(res);
	}

	ajax = new AjaxRequest (url, segment, method_name, options);
}

/********************************************************************************
* AjaxRequest : Performs the following actions:
*  - Generates an appropriate request header
*  - Parses the request parameters
*  - Sends the actual request
*  - Determines if request was successful based on returned status only
*  - Handles a request timed out condition
*
* Returns the following data:
*  - responseText (should be JSON but could be almost anything)
*  - status (integar)
*  - statusText (string if present)
*  - ajax (raw ajax request)
********************************************************************************/	
function AjaxRequest(url, segment, method_name, opts) {
	var timer = null, ajax, headers = {}, h, params, overrideMimeType;

	function onreadystatechange (ajax) {
		if (ajax.readyState === 4) {
			clearTimeout(timer);
			var response = {
				responseText	: ajax.responseText,
				status			: ajax.status,
				statusText		: ajax.statusText,
				ajax			: ajax
			}
			if ((ajax.status >= 200 && ajax.status < 300) || ajax.status === 304) {
				if (opts.onSuccess) opts.onSuccess (response);
			} else {
				debugLog (url + ' Failed : '+inspectObj(response,8,1));
				if (opts.onFailure) opts.onFailure (response);
				if (opts['on' + ajax.status])
					opts['on' + ajax.status] (response);
			}
		} 
	}
	if (!opts.isBinary && !opts.isFacebook)
		url = "http://"+url+"/ElvesFb/Segment"+segment+"/segment.ashx";

	/* Parse request parameters */
	params = typeof opts.parameters === 'string' ? opts.parameters : Object.toQueryString(opts.parameters).replace(/\_/g,'%5F').replace(/\(/g,'%28').replace(/\)/g,'%29');

	/* Add request header specific to POST request only */
	headers['Accept']			= IsChrome ? '*/*' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,*/*;q=0.6,*/*;q=0.4';
	if (opts.method == 'POST') {
		headers["client-ver"]		= client_ver;
		headers["server-method"]	= method_name;
		headers["signin-userId"]	= FACEBOOK_ID;
		headers["signin-authKey"]	= C.attrs.key;
		headers["signin-authSeed"]	= C.attrs.seed;
		headers["locale-name"]		= 'fr-FR';
		headers['sign-code']		= MD5("The Matrix has you..."+params+method_name+FACEBOOK_ID+C.attrs.key );
		headers["Accept-Language"]	= 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4';
		headers['content-type']		= 'text/html';
	} else {
		if (opts.isBinary || opts.isFacebook) {
			if (params.length > 0) url += (url.include('?') ? '&' : '?') + params;
		} else {
			params = typeof opts.parameters === 'string' ? opts.parameters : Object.toQueryString(opts.parameters);
			url += '?ver='+client_ver+'&method='+method_name+'&locale=fr-FR';
			url += '&sign='+MD5("The Matrix has you..."+params+method_name );
			url += '&data='+ escape(params).replace(/\+/g,'%2B').replace(/\_/g,'%5F').replace(/\(/g,'%28').replace(/\)/g,'%29');
		}
	}

	if (opts && opts.headers && opts.headers.overrideMime) overrideMimeType = opts.headers.overrideMime;
	/* change content-type and mime type if binary function */
	if (opts.isBinary) {
		headers['content-type'] =  'text/plain; charset=x-user-defined';
		overrideMimeType = 'text/plain; charset=x-user-defined';
	}

	if ( GM_xmlhttpRequest ) {
		GM_xmlhttpRequest({
  			method: opts.method,
  			url: url,
  			data: ( opts.method === 'POST' ? params : null ),
  			headers: headers,
  			overrideMimeType : overrideMimeType,
  			ontimeout : ( opts.timeoutSecs ? opts.timeoutSecs*1000 : 0 ),
  			onreadystatechange: onreadystatechange
		});
	} else {
		ajax = new XMLHttpRequest();
		if (overrideMimeType) ajax.overrideMimeType(overrideMimeType);
		ajax.onreadystatechange = function () {
			if (ajax.readyState === 4) {
				clearTimeout(timer);
				var response = {
					responseText	: ajax.responseText,
					status			: ajax.status,
					statusText		: ajax.statusText,
					ajax			: ajax
				}
				if ((ajax.status >= 200 && ajax.status < 300) || ajax.status === 304) {
					if (opts.onSuccess) opts.onSuccess (response);
				} else {
					if (opts.onFailure) opts.onFailure (response);
					if (opts['on' + ajax.status])
						opts['on' + ajax.status] (response);
				}
			} 
		} 
		ajax.open(opts.method, url, true);
		/* Add request headers to ajax request */
		for (h in headers) ajax.setRequestHeader(h, headers[h]);
		if (opts.timeoutSecs) timer = setTimeout(function () {
			ajax.abort();
			if (opts.onFailure) {
				/* CHECK: 599 is custom error code. See if better option exists. */
				opts.onFailure({responseText:null, status:599, statusText:'Request Timed Out', ajax:ajax});
			}
		}, opts.timeoutSecs*1000);
		/* Send request with params if POST otherwise just send request */
		ajax.send((opts.method == 'POST') ? params : null);
	}
}


/************ Prototype Functions **************/
Object.defineProperty(Object.prototype, "cleanRemoved", {
    enumerable: false,
    value: function () {
		 /* Create a new array from the contents of arguments */
		var args = Array.prototype.slice.call(arguments);
		var obj  = this,
            from = args.shift(),
			max_depth = 0,
			path,
			depth = 0;
		if (typeof(from) == 'undefined') return;
		if (typeof(args[0]) == 'number') max_depth = args.shift();
		if (typeof(args[0]) == 'number') depth = args.shift();
		path = args[0] || '';
		if (max_depth) {
			if (depth >= max_depth) return;
			depth++;
		}
		if (typeof(obj) == "object" && typeof(from) == "object") {
			Object.getOwnPropertyNames( obj ).forEach( function ( name ) 
			{
				if (obj[name] != null && typeof(obj[name]) == "object" && typeof(from[name]) == "object") {
					obj[name].cleanRemoved (from[name], max_depth, depth, path + name + '.' );
				} else if (typeof(from[name]) == 'undefined') {
					var msg = path + name + '  DELETED!';
					debugLog (msg);
					delete obj[name];
				}
			});
		}
        return this;
    }
});
Object.defineProperty(Object.prototype, "mergeWith", {
    enumerable: false,
    value: function () {
        var override = true,
            dest = this,
            len = arguments.length,
            props, merge, i, from;
        if (typeof(arguments[arguments.length - 1]) === "boolean") {
            override = arguments[arguments.length - 1];
            len = arguments.length - 1;
        }
        for (i = 0; i < len; i++) {
            from = arguments[i];
			if (from == undefined) continue;
			if (from != null || typeof(from) == "object") {
				Object.getOwnPropertyNames(from).forEach(function (name) {
					var descriptor;
					if ((typeof(dest[name]) == "object" || typeof(dest[name]) == "undefined") && typeof(from[name]) == "object") {
						if (typeof(dest[name]) == "undefined") dest[name] = Array.isArray(from[name]) ? [] : {};
						if (override) {
							if (!Array.isArray(dest[name]) && Array.isArray(from[name])) {
								dest[name] = [];
							}
							else if (Array.isArray(dest[name]) && !Array.isArray(from[name])) {
								dest[name] = {};
							}
						}
						if (dest[name] != undefined) dest[name].mergeWith(from[name], override);
					} else if ((name in dest && override) || !(name in dest)) {
						descriptor = Object.getOwnPropertyDescriptor(from, name);
						if (descriptor.configurable) {
							Object.defineProperty(dest, name, descriptor);
						}
					}
				});
			} else dest = from;
        }
        return this;
    }
});
Array.prototype.compare = function(testArr) {
	if (this.length != testArr.length) return false;
	for (var i = 0; i < testArr.length; i++) {
		if (this[i].compare) {
			if (!this[i].compare(testArr[i])) return false;
		}
		if (this[i] !== testArr[i]) return false;
	}
	return true;
}
Array.prototype.shuffle = function(){
	for (var i = 0; i < this.length; i++){
		var a = this[i];
		var b = Math.floor(Math.random() * this.length);
		this[i] = this[b];
		this[b] = a;
	}
}
Date.prototype.myString = function (){
	return this.toDateString() +' '+ this.toTimeString().substr (0,8);
}
Date.prototype.formatTime = function (){
	var curr_hour = this.getHours();
	var curr_min = this.getMinutes();
	var curr_sec = this.getSeconds();
	return (curr_hour < 10 ? '0' : '') + curr_hour + gFormatTime + (curr_min < 10 ? '0' : '') + curr_min + gFormatTime + (curr_sec < 10 ? '0' : '') + curr_sec;
}
Date.prototype.formatDate = function (){
	var curr_day = this.getDate();
	var curr_month = this.getMonth();
	curr_month++;
	var curr_year = this.getFullYear();
	return (curr_day < 10 ? '0' : '') + curr_day + gFormatDate + (curr_month < 10 ? '0' : '') + curr_month + gFormatDate + curr_year;
}
Math.randRange = function(from, to){
 return Math.floor( ( Math.random() * (to-from+1) ) + from);
}
Number.prototype.intToCommas = function(){
	var nStr = toNum(this) + '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + ',' + '$2');
	}
	return nStr;
}
String.prototype.escapeHTML = function() {
	return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
}
String.prototype.cleanString = function() {
	return this.replace(/é/,"e").replace(/è/,"e").replace(/ê/,"e");
}
String.prototype.intToCommas = function(){
	return toNum(this);
}
String.prototype.nowrap = function() {
	return this.replace(/\s/g,'&nbsp;');
}
String.prototype.strip = function() {
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
}
String.prototype.initCap = function() {
	return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}

/************ Functions **************/
function addScript (scriptText){
	var scr = document.createElement('script');   
	scr.innerHTML = scriptText;
	document.body.appendChild(scr);
}
function addStyle(css, add_link) {
	var target = document.getElementsByTagName('head')[0];
	if (target.getElementsByTagName('style').length > 0)
		target.removeChild(target.getElementsByTagName('style')[0]);
	var obj = document.createElement('style');
	obj.type = 'text/css';
	obj.appendChild(document.createTextNode(css));
	target.appendChild(obj);
	if (add_link) {
		var ss = document.createElement("link"); 
		ss.type = "text/css"; 
		ss.rel = "stylesheet"; 
		ss.media = "screen"; 
		ss.href = "https://kabam1-a.akamaihd.net/castle/stylesheets/chomped/common_258783ec84eaa8c2ad74bf6168ec24317be52dab.css"; 
		document.getElementsByTagName('head')[0].appendChild(ss); 
		var ss = document.createElement("link"); 
		ss.type = "text/css"; 
		ss.rel = "stylesheet"; 
		ss.media = "screen"; 
		ss.href = "https://kabam1-a.akamaihd.net/castle/stylesheets/chomped/facebook_37fbd906939be51243d0becafcb7aca6edbc3a8f.css"; 
		document.getElementsByTagName('head')[0].appendChild(ss); 
	}
}
function cloneProps (src) {
	var newObj = (src instanceof Array) ? [] : {};
	for (i in src) {
		if (matTypeof(src[i]) == 'function') continue;
		if (src[i] && typeof src[i] == 'object') {
			newObj[i] = cloneProps(src[i]);
		} else 
			newObj[i] = src[i];
	}
	return newObj;
}
function decodeEntity (str){
	var ta=document.createElement('textarea');
	ta.innerHTML = str; 
	return ta.value;
}
function dispError (msg,target){
	var target = target != undefined ? target : document.body;
	var dial = new ModalDialog (target, 300, 150, '', true);
	dial.getTopDiv().innerHTML = '<div class=title><center><b>VosParaBellum : Erreur</b></center></div>';
	dial.getContentDiv().innerHTML = msg;
}
function dispProgress (color, percent, reverse) {
	var classname = '';
	if (/(green|red|purple|yellow)/.test(color)) classname = 'pistage_'+color;
	else classname = 'progress_on';
	if (percent > 100) percent = 100;
	var perc_off = 100-percent;
	var progressBar = '<table class=progress_bar width=90%><tr>'
					+'<td class='+ (reverse ? 'progress_off' : classname) + ' width='+(reverse ? perc_off : percent)+'%></td>'
					+'<td class='+ (reverse ? classname : 'progress_off') + ' width='+(reverse ? percent : perc_off)+'%></td>'
					+'</tr></table>';
	return progressBar;
}
function findSimilarWord (word, source){
	var pattern = new RegExp(RegExp.escape(word)+'[\\w]+', 'i');
	var match = source.match(pattern);
	return match ? match[0].capitalize() : word;
}
function getBuildingJob () {
	var ret = {}, found = false;
	if (!Seed.gameData || !Seed.gameData.city || !Seed.gameData.city.buildings) return null;
	for (var i=0; i<Seed.gameData.city.buildings.length && !found; i++) {
		var building = Seed.gameData.city.buildings[i];
		var statics  = Seed.reqs[building.type];
		if (building.construction_start && building.construction_end &&
			building.construction_start < serverTimeMs() &&
			building.construction_end   > serverTimeMs()) {
			ret = {name:statics.name, level:building.level, img:statics.img, start_at:building.construction_start, end_at:building.construction_end};
			found = true;
		}
	}
	return ret;
}
function getContentURL (str) {
	if (window.location.href.indexOf('https://') !== -1)
		content_server = "http://cluster-5.skillclub.com/stormfall/content";
	else
		content_server = "https://plarium.hs.llnwd.net/v1/stormfall/content";
	return content_server+'/'+str;
}
function getCyborgsPerDay () {
	var nb = 0;
	if (!Seed.gameData || !Seed.gameData.city || !Seed.gameData.city.buildings) return 0;
	for (var i=0; i<Seed.gameData.city.buildings.length; i++) {
		var building = Seed.gameData.city.buildings[i];
		var stat = Seed.reqs[building.type].stats.levels[building.level-1];
		if (stat && stat.cyborg_per_day) nb += stat.cyborg_per_day;
	}
	return nb;
}
function getDistance (x1, y1, x2, y2) {
	return Math.round( Math.sqrt( (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) )*10) / 100;
}
function getFlashVars (swf){
	/* "use strict"; */
	var params = swf.innerHTML;
	var pattern = /\<\s*param\s*(.*?)\>/gi;
	var attrs={};
	var args, match, p;
	while ((match = pattern.exec(params)) != null){
		var p = parseQuotedVars(match[1]);
		if (p.name && p.name == 'flashvars'){
			args = decodeEntity(p.value).split('&');
			for (var i=0; i < args.length; i++)	{
				var v = args[i].split('=');
				attrs[v[0].strip()] = v[1].strip();
			}
			break;
		}
	}
	/* will have to enhance this if they change the names ... */
	C.attrs.key		= attrs.t;
	C.attrs.seed	= attrs.s;
	C.attrs.userId	= attrs.u;
	C.attrs.hashId	= attrs.h;
	C.attrs.sreq	= attrs.sreq;
	C.attrs.source	= attrs.q;
	USER_ID		 	= attrs.u;
	FACEBOOK_ID		= 'fb'+USER_ID;
}
function getKeys (obj){
	var arr = new Array();
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) arr.push(key);
	}
	return arr;
}
function getSkillJob () {
	var ret = {}, found = false;
	if (!Seed.gameData || !Seed.gameData.skill_data || !Seed.gameData.skill_data.skills) return null;
	for (var i=0; i<Seed.gameData.skill_data.skills.length && !found; i++) {
		var skill = Seed.gameData.skill_data.skills[i];
		var statics  = Seed.skills.types[skill.type];
		if (skill.construction_start && skill.construction_end &&
			skill.construction_start < serverTimeMs() &&
			skill.construction_end   > serverTimeMs()) {
			ret = {name:statics.name, level:skill.level, img:statics.img, start_at:skill.construction_start, end_at:skill.construction_end};
			found = true;
		}
	}
	return ret;
}
function getSkillsBonus (type_id, obj_type) {
	var bonus = 0;
	if (!Seed.gameData.skill_data.skills) return 0;
	for (var i=0; i<Seed.gameData.skill_data.skills.length; i++) {
		var skill = Seed.gameData.skill_data.skills[i];
		var stat  = Seed.skills.types[skill.type];
		if (skill.level > 0 && stat.effect_type == type_id) {
			if (!is_null(obj_type)) {
				var types = stat.affected_types;
				for (var x=0; x<types.length; x++) {
					if (types[x] == obj_type) bonus += stat.levels[skill.level-1].effect_value;
				}
			} else bonus += stat.levels[skill.level-1].effect_value;
		}
	}
	return bonus;
}
function getTechJob () {
	var ret = {}, found = false;
	if (!Seed.gameData || !Seed.gameData.technologies) return null;
	for (var i=0; i<Seed.gameData.technologies.length && !found; i++) {
		var tech = Seed.gameData.technologies[i];
		var statics  = Seed.reqs[tech.type];
		if (tech.construction_start && tech.construction_end &&
			tech.construction_start < serverTimeMs() &&
			tech.construction_end   > serverTimeMs()) {
			ret = {name:statics.name, level:tech.level, img:(statics.img.length > 4 ? statics.img.substr(0,statics.img.length-4)+'_d.jpg' : statics.img), start_at:tech.construction_start, end_at:tech.construction_end};
			found = true;
		}
	}
	return ret;
}
function getTrainingJobs () {
	var ret = [];
	if (!Seed.gameData || !Seed.gameData.troops || !Seed.gameData.troops.factory || !Seed.gameData.troops.factory.orders) return null;
	var orders = Seed.gameData.troops.factory.orders;
	var now = serverTimeMs();
	for (var t=0; t<orders.length; t++) {
		var order	= orders[t];
		var detail	= order.construction_info;
		var statics = Seed.reqs[order.type];
		var this_start = this_end = per_unit = real_start = real_end = 0;
		if (detail.start) {
			var this_start = now - detail.start;
			var this_end = detail.end - now;
			var per_unit = detail.end - detail.start;
			var real_start = now - ((per_unit * (order.total - order.pending)) + this_start);
			var real_end = now + ((per_unit * (order.pending - 1)) + this_end);
		}
		ret.push ( {name:statics.name, total:order.total, pending:order.pending, img:statics.img,
					start_at:real_start, end_at:real_end} );
	}
	return ret;
}
function getUserStatus (user_id) {
	if (!user_id) return 0; /* Neutral */
	if (Seed.gameData.clan_data) {
		if (Seed.gameData.clan_data.members && Seed.gameData.clan_data.members[user_id] && Seed.gameData.clan_data.members[user_id].state == 0) return 1; /* Ally */
	}
	if (Seed.gameData.known_data) {
		var friends = Seed.gameData.known_data.friends;
		var mates = Seed.gameData.known_data.mates;
		var alliance = (Seed.gameData.alliance && Seed.gameData.alliance.membership) ? Seed.gameData.alliance.membership.members : null;
		var enemy = Seed.gameData.known_data.enemy;
		var foes  = Seed.gameData.known_data.alliance_enemy;
		if (enemy) {
			for (var f=0; f<enemy.length; f++) {
				if (enemy[f] == user_id) return 2; /* Ennemy */
			}
		}
		if (alliance && alliance[user_id]) return 3; /* Alliance mate */
		if (mates) {
			for (var f=0; f<mates.length; f++) {
				if (mates[f] == user_id) return 4; /* Helper */
			}
		}
		if (foes) {
			for (var f=0; f<foes.length; f++) {
				if (foes[f] == user_id) return 5; /* Foe */
			}
		}
		if (friends) {
			for (var f=0; f<friends.length; f++) {
				if (friends[f] == user_id) return 6; /* Friend */
			}
		}
	}
	return 0;
}
function goPistage () {
	var t = tabManager;
	for (k in t.tabList)
		if (t.tabList[k].name == 'Info') {
			var newTab = t.tabList[k];
			break;
		}
	if (t.currentTab.name != newTab.name){
		t.setTabStyle (document.getElementById (newTab.uid), true);
		t.setTabStyle (document.getElementById (t.currentTab.uid), false);
		t.currentTab.obj.hide ();
		t.currentTab.div.style.display = 'none';
		t.currentTab = newTab;
		newTab.div.style.display = 'block';
		Data.options.currentTab = newTab.name;      
	}
	newTab.obj.show();
	Tabs.Info.tabInfoMarches();
}
function implodeUrlArgs (obj){
	var a = [];
	for (var k in obj)
		a.push (k +'='+ encodeURI(obj[k]) );
	return a.join ('&');
}
function inspectObj(obj, maxLevels, level, doFunctions){
	var str = '', type, msg;
	if (level == null)  level = 0;
	if (maxLevels == null) maxLevels = 1;
	if (maxLevels < 1) return 'Inspect Error: Levels number must be > 0';
	if (obj == null) return 'ERROR: Object is NULL\n';
	var indent = '';
	for (var i=0; i<level; i++)
		indent += ' ';
	for (property in obj) {
		try {
			type =  matTypeof(obj[property]);
			if (doFunctions == true && (type == 'function')){
				str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
			} else if (type != 'function') {
				if ((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels)) {
					str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = \n';
					str += inspectObj(obj[property], maxLevels, level+1, doFunctions);  /* recurse */
				} else {
					str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
				}
			}
		} catch(err) {
			if (typeof(err) == 'string') msg = err;
			else if (err.message)        msg = err.message;
			else if (err.description)    msg = err.description;
			else                         msg = 'Unknown';
			str += '(Error) ' + property + ': ' + msg +"\n";
		}
	}
	str += "\n";
	return str;
}
function is_null(obj) { 
  if (!obj || obj == undefined || obj == null || obj == '') return true; 
  else return false;; 
}
function logit(msg) {
	var now = new Date();
	debugLog(' @ ' + now.toTimeString().substring (0,8) + '.' + now.getMilliseconds() + ': ' +  msg);
//	if (Data.log) consoleLog(msg.replace(/\n/g, '<br/>'));
}
function makeRandomTitle(){
	scriptTitle = scriptName.split('');
	var tags = ['SPAN','FONT','BDO','CENTER','DIV','LABEL','B','STRONG','P','TD'];
	var len = tags.length-1;
	var newTitle = [];
	for (var i=0; i < scriptTitle.length; i++){
		if(scriptTitle[i]==' ') newTitle.push('&nbsp;');
		var t = tags[Math.ceil (Math.random() * len)];
		newTitle.push( '<' + t + '>' + scriptTitle[i] + '</' + t + '>');
	}
	scriptTitle = '<span class=title>' + newTitle.join('') + '<span>';
}
function matTypeof (v){
	if (v == undefined)
	return 'undefined';
	if (typeof (v) == 'object'){
		if (!v)
		return 'null';
		else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
		return 'array';
		else return 'object';
	}
	return typeof (v);
}
function MD5 (str){
	/* Convert a 32-bit number to a hex string with ls-byte first */
	var hex_chr = "0123456789abcdef";
	function rhex(num) {
		str = "";
		for(j = 0; j <= 3; j++)
			str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((num >> (j * 8)) & 0x0F);
		return str;
	}
	/*	Convert a string to a sequence of 16-word blocks, stored as an array.
		Append padding bits and the length, as described in the MD5 standard. */
	function str2blks_MD5(str) {
		nblk = ((str.length + 8) >> 6) + 1;
		blks = new Array(nblk * 16);
		for(i = 0; i < nblk * 16; i++) blks[i] = 0;
		for(i = 0; i < str.length; i++)
			blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
		blks[i >> 2] |= 0x80 << ((i % 4) * 8);
		blks[nblk * 16 - 2] = str.length * 8;
		return blks;
	}
	/*	Add integers, wrapping at 2^32. This uses 16-bit operations internally 
		to work around bugs in some JS interpreters. */
	function add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
	/*	Bitwise rotate a 32-bit number to the left */
	function rol(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt));
	}
	/*	These functions implement the basic operation for each round of the algorithm. */
	function cmn(q, a, b, x, s, t) { return add(rol(add(add(a, q), add(x, t)), s), b); }
	function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
	function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
	function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
	function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
	x = str2blks_MD5(str);
	a =  1732584193;
	b = -271733879;
	c = -1732584194;
	d =  271733878;
	for(i = 0; i < x.length; i += 16) {
		olda = a;
		oldb = b;
		oldc = c;
		oldd = d;
		a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
		d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
		c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
		b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
		a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
		d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
		c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
		b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
		a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
		d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
		c = ff(c, d, a, b, x[i+10], 17, -42063);
		b = ff(b, c, d, a, x[i+11], 22, -1990404162);
		a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
		d = ff(d, a, b, c, x[i+13], 12, -40341101);
		c = ff(c, d, a, b, x[i+14], 17, -1502002290);
		b = ff(b, c, d, a, x[i+15], 22,  1236535329);    
		a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
		d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
		c = gg(c, d, a, b, x[i+11], 14,  643717713);
		b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
		a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
		d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
		c = gg(c, d, a, b, x[i+15], 14, -660478335);
		b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
		a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
		d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
		c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
		b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
		a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
		d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
		c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
		b = gg(b, c, d, a, x[i+12], 20, -1926607734);
		a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
		d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
		c = hh(c, d, a, b, x[i+11], 16,  1839030562);
		b = hh(b, c, d, a, x[i+14], 23, -35309556);
		a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
		d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
		c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
		b = hh(b, c, d, a, x[i+10], 23, -1094730640);
		a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
		d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
		c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
		b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
		a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
		d = hh(d, a, b, c, x[i+12], 11, -421815835);
		c = hh(c, d, a, b, x[i+15], 16,  530742520);
		b = hh(b, c, d, a, x[i+ 2], 23, -995338651);
		a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
		d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
		c = ii(c, d, a, b, x[i+14], 15, -1416354905);
		b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
		a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
		d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
		c = ii(c, d, a, b, x[i+10], 15, -1051523);
		b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
		a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
		d = ii(d, a, b, c, x[i+15], 10, -30611744);
		c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
		b = ii(b, c, d, a, x[i+13], 21,  1309151649);
		a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
		d = ii(d, a, b, c, x[i+11], 10, -1120210379);
		c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
		b = ii(b, c, d, a, x[i+ 9], 21, -343485551);
		a = add(a, olda);
		b = add(b, oldb);
		c = add(c, oldc);
		d = add(d, oldd);
	}
	return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}
function numf (nNombre, separateurMilliers) {
	var sNombre = String(nNombre);
	var i;
	if (separateurMilliers == undefined) separateurMilliers = ' ';
	function separeMilliers (_sNombre) {
		var sRetour = "";
		while (_sNombre.length % 3 != 0) {
			_sNombre = "0"+_sNombre;
		}
		for (i = 0; i < _sNombre.length; i += 3) {
			if (i ==  _sNombre.length-1) separateurMilliers = '';
			sRetour += _sNombre.substr(i, 3)+separateurMilliers;
		}
		while (sRetour.substr(0, 1) == "0") {
			sRetour = sRetour.substr(1);
		}
		return sRetour.substr(0, sRetour.lastIndexOf(separateurMilliers));
	}
	return nvl(separeMilliers(sNombre),'0');
}
function nvl(obj, val) { 
  if (typeof obj == 'undefined' || obj === undefined || obj === null || obj === '') return val; 
  return obj; 
}
function parseQuotedVars(str){
	var obj = {};
	var pattern = /\s*(.*?)\s*=\s*('|")(.*?)\2/gi;
	var match;
	while ((match = pattern.exec(str)) != null){
		obj[match[1]] = match[3];
	}
	return obj;
}
function refreshGameData (container, notify){
	var dial = new ModalDialog (container, 300, 165, '', false, null);
	dial.getTopDiv().innerHTML = '<div class=bsx_title><center><b>'+scriptName+' : Message</b></center></div>';
	dial.getContentDiv().innerHTML = 'Actualisation des données joueur...';
	if (Seed.gameData.revision && Seed.gameData.revision > 0) Seed.gameData.revision--;
	/* this to allow to retrieve all player gameData, coz gameData aren't returned by autorefresh in case the user revision is up to date */
	AutoRefresh.autoRefreshCmd(function (rslt) {
		if (rslt.done) {
			actionLog('Données joueur mises à jour');
			dial.getContentDiv().innerHTML = 'Données joueur mises à jour';
			setTimeout (function(){dial.destroy(); if (notify) notify(true);}, 2000);
			return;
		}
	});
}
function serverTime (){
	return toNum (new Date().getTime() / 1000) + Seed.serverTimeOffset;
}
function serverTimeMs (){
	return toNum (new Date().getTime());
}
function setButtonStyle (button, enabled, class_enabled, class_disabled){
	if (!button) return;
	if (enabled) {
		button.disabled = false;
		Element.removeClassName(button, (class_disabled ? class_disabled : 'btn_disabled'));
		Element.addClassName(button, (class_enabled ? class_enabled : 'btn_blue'));
	} else {
		button.disabled = true;
		Element.removeClassName(button, (class_enabled ? class_enabled : 'btn_blue'));
		Element.addClassName(button, (class_disabled ? class_disabled : 'btn_disabled'));
	}
}
function setText (element_id, text) {
	if (element_id) {
		if (document.getElementById(element_id)) document.getElementById(element_id).innerHTML = text;
	}
}
function setTitle (element_id, text) {
	if (element_id) {
		if (document.getElementById(element_id)) document.getElementById(element_id).title = text;
	}
}
function TimeStampToDate(xmlDate){
    var dt = new Date();
    var dtS = xmlDate.slice(xmlDate.indexOf('T')+1, xmlDate.indexOf('.'));
    var TimeArray = dtS.split(":");
    dt.setUTCHours(TimeArray[0],TimeArray[1],TimeArray[2]);
    dtS = xmlDate.slice(0, xmlDate.indexOf('T'))
    TimeArray = dtS.split("-");
    dt.setUTCFullYear(TimeArray[0],TimeArray[1],TimeArray[2]);
    return dt;
}
function timestrh(time) {
	time = toNum (time);
	var m = [];
	var t = time;
	if (t < 61)	return  t + 's';
	if (t > 86400){
		t %= 86400;
	}  
	if (t>3600 || time>3600){
		m.push (toNum(t/3600)); 
		m.push ('h ');
		t %= 3600;
	}  
	m.push (toNum(t/60)); 
	m.push ('m ');
	m.push (t%60);
	m.push ('s');  
	var str = m.join('');
	if (str[str.length-1] == ' ')
		str = str.substring(0, str.length-1);
	return str;
}
function timestr(time, full) {
	time = toNum (time);
	var m = [];
	var t = time;
	if (t < 61)	return  t + 's';
	if (t > 86400){
		m.push (toNum(t/86400)); 
		m.push ('d ');
		t %= 86400;
	}  
	if (t>3600 || time>3600){
		m.push (toNum(t/3600)); 
		m.push ('h ');
		t %= 3600;
	}  
	m.push (toNum(t/60)); 
	m.push ('m');
	if (full || time<=3600 ){
		m.push (' ');
		m.push (t%60);
		m.push ('s');  
	}
	var str = m.join('');
	if (str[str.length-1] == ' ')
		str = str.substring(0, str.length-1);
	return str;
}
function timestrShort(time) {
	time = toNum (time);
	if (time > 86400){
		var m = [];
		time /= 3600;
		m.push (toNum(time/24)); 
		m.push ('d ');
		m.push (toNum(time%24)); 
		m.push ('h');
		return m.join ('');    
	} else return timestr (time);
}
function toggleFlash (){ 
	if (!SWF_CONTAINER) return;
	if (SWF_CONTAINER.style.display == 'none') {
		if (!IsChrome) SWF_CONTAINER.innerHTML = SWF_CONTAINER_INNERHTML;
		SWF_CONTAINER.style.display = 'block';
	} else {
		SWF_CONTAINER_INNERHTML = SWF_CONTAINER.innerHTML;
		if (!IsChrome) SWF_CONTAINER.innerHTML = '';
		SWF_CONTAINER.style.display = 'none';
	}
}
function toNum(n, min){
	var x = parseInt(n, 10);
	if (!n || n=='' || n==null || n==undefined || isNaN(x)) x = 0;
	if (min && !isNaN(min) && x < min) x = min;
	return x;
}
function vignette (fb_id, full_url, ref_id, size){
	var ref_id_text = '';
	if (is_null(size)) size = 30;
	if (ref_id) ref_id_text=" id='Vignette_"+ref_id+"' ref='"+ref_id+"' ";
	if (full_url) return ("<img src='"+fb_id+"' "+ref_id_text+" style='border:0px; width:"+size+"px; height:"+size+"px; vertical-align:middle;' />");
	if (fb_id.indexOf("sntpi")>=0)
		return ("<img src='../img/anonymous.jpg' "+ref_id_text+" style='border:0px; width:"+size+"px; height:"+size+"px; vertical-align:middle;' />");
	else
		return ("<img src='http://graph.facebook.com/"+fb_id+"/picture?type=square' "+ref_id_text+" style='border:0px; width:"+size+"px; height:"+size+"px; vertical-align:middle;' />");
}
function vignette2 (img, size, ref_id){
	var ref_id_text = '';
	if (is_null(size)) size = 30;
	if (ref_id) ref_id_text=" id='Vignette_"+ref_id+"' ref='"+ref_id+"' ";
	return("<img src='"+getContentURL(img)+"' "+ref_id_text+" style='border:0px; width:"+size+"px; height:"+size+"px; vertical-align:middle;' />");
}
function vignette_swf (img, size){
	if (is_null(size)) size = 30;
	return('<embed width="'+size+'px" height="'+size+'px" name="plugin" src="https://plarium.hs.llnwd.net/v1/stormfall/content/'+img+'" type="application/x-shockwave-flash">');
}


var AutoUpdater = {
	days	: 1,
	name	: "VosParaBellum (Stormfall Power Tools - by Jawz)",
	shortname	: scriptName,
	version	: scriptVersion,
	manualChk	: false,
	time	: new Date().getTime(),
	call	: function(response, secure) {
				if (GM_xmlhttpRequest) {
					GM_xmlhttpRequest({
						method	: 'GET',
						url		: 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+scriptId+'.meta.js',
						onload	: function(xpr) {AutoUpdater.compare(xpr, response);},
						onerror	: function(xpr) {if (secure) AutoUpdater.call(response, false);}
					});
				} else {
					function myOwnHttpRequest (details) {
						var xml_http = null;
						xml_http = new XMLHttpRequest();
						if(!xml_http) {
							if (details.onerror) details.onerror({ responseText: '', readyState: 4, status: 0, statusText: 'GM_xmlhttpRequest failed (missing xml_http object)', finalUrl: details.url });
							else logit('GM_xmlhttpRequest failed (missing xml_http object), URL: ' + details.url);
							return;
						}
						xml_http.onreadystatechange = function() {
							var ready_state = xml_http.readyState;
							var status3or4 = (ready_state == 3 || ready_state == 4);
							var http_response = {
								responseText	: (status3or4 ? xml_http.responseText : ''),
								readyState		: ready_state,
								status			: (status3or4 ? xml_http.status : null),
								statusText		: (status3or4 ? xml_http.statusText : null),
								finalUrl		: (ready_state == 4 ? details.url : null)
							};
							if (details.onreadystatechange) details.onreadystatechange(http_response);
							if (ready_state == 4) {
								if (xml_http.status >= 200 && xml_http.status < 300) { if(details.onload) details.onload(http_response); }
								else { if(details.onerror) details.onerror(http_response); }
							}
						};
						xml_http.open(details.method, details.url, true);
						if (details.headers)
							for (var this_header in details.headers) xml_http.setRequestHeader(this_header, details.headers[this_header]);
						try { xml_http.send(details.data); }
						catch(e) {
							if (details.onerror) details.onerror({ responseText: '', readyState: 4, responseHeaders: '', status: 403, statusText: 'Forbidden', finalUrl: details.url });
							else logit('GM_xmlhttpRequest failed (forbidden), URL: ' + details.url);
						}
					};
					myOwnHttpRequest({
						method	: 'GET',
						url		: 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+scriptId+'.meta.js',
						onload	: function(xpr) {AutoUpdater.compare(xpr, response);},
						onerror	: function(xpr) {if (secure) AutoUpdater.call(response, false);}
					});
				}
			  },

	enable : function() {
		debugLog ('Enable '+this.shortname+' updates');
		localStorage.setItem( '118446_updater', new Date().getTime()+'');
		AutoUpdater.call(true, true);
	},
	compareVersion: function(r_version, l_version) {
		var r_parts = r_version.split('.'),
			l_parts = l_version.split('.'),
			r_len = r_parts.length,
			l_len = l_parts.length,
			r = l = 0;
		for (var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
			r = +(r_parts[i] || '0');
			l = +(l_parts[i] || '0');
		}
		return (r !== l) ? r > l : false;
	},
	compare: function(xpr,response) {
		this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
		this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
		if ( (this.xversion) && (this.xname[1] == this.name) ) {
			this.xversion = this.xversion[1];
			this.xname = this.xname[1];
		} else {
			if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) )
				localStorage.setItem( '118446_updater', 'off');
			return false;
		}
		var updated = this.compareVersion(this.xversion, this.version);
		if ( updated ) {
			if (CHROME_EXT) {
				updaterConfirm('A new version of ' + this.shortname + ' is available.\nGo to your Chrome extensions \n('+chrome_extensions+'),\nenable the developer mode and click on the button to update extensions', function(){}, null, false);
			} else {
				updaterConfirm('A new version of ' + this.shortname + ' is available.\nDo you wish to install the latest version ?',
					function(){
						try {
							location.href = userscripts_src;
						} catch(e) {}
					},
					function(){}, true
				);
			}
		} else {
			if (AutoUpdater.manualChk) updaterConfirm('No new version of ' + this.shortname + ' available.', function(){}, null, false);
		}
	},
	manualCheck: function() {
		localStorage.setItem( '118446_updater', new Date().getTime()+'');
		AutoUpdater.manualChk = true;
		AutoUpdater.call(true, true);
	},
	check: function() {
		try {
			if (localStorage.getItem( '118446_updater' ) == "off")
				this.enable();
			else {
				if (+this.time > (+localStorage.getItem( '118446_updater' ) + 1000*86400*this.days )){
					localStorage.setItem( '118446_updater', this.time+'');
					this.call(false, true);
				}
				debugLog('Check '+this.shortname+' for updates');
				localStorage.setItem( '118446_updater', new Date().getTime()+'');
				AutoUpdater.call(true, true);
			}
		} catch(e) {
			debugLog('AutoUpdater Check error : '+ e);
			logit(inspectObj (e, 8, 1));
		}
	}
};

var progressBar = {
	steps		: 0,
	step		: 0,
	delay		: 10000,
	totalTime	: 0,
	currentTime	: 0,
	timer		: 0,
	title		: '',
	stepText	: '',
	displayed	: false,
	by_count	: false,

	init : function (x, y, width, height, title, bar_width, modal, container){
		var t = progressBar;
		if (modal)
			 progressBarPop = new ModalDialog (container, width, height, '', false);
		else progressBarPop = new PopUp ('progress_bar', x, y, width, height, function () { tabManager.hideTab(); });
		progressBarPop.getTopDiv().innerHTML = '<div class=bsx_title><center><b>VosParaBellum : ' + title + '</b></center></div>';
		var layoutDiv = document.createElement('div');
		layoutDiv.className = 'bsx_container';
		layoutDiv.style.backgroundColor = 'rgb(245,245,228)';
 		layoutDiv.style.color = '#000';
		layoutDiv.style.height = '100%';
		var layout = '<center><BR><B><div id=initTitle></div></B>'
					+'<br><div id=initProgressBar style="width:'+bar_width+'px"></div>'
					+'<br><div class=jewel id=initStepText></div></center>';
		if (modal)
			 progressBarPop.getContentDiv().appendChild(layoutDiv);
		else progressBarPop.getMainDiv().appendChild(layoutDiv);
		t.hideshow(true);
		t.displayed = true;
		layoutDiv.innerHTML = layout;
	},
	hideshow : function (onOff){
		var t = progressBar;
		if (!onOff && t.displayed) {
			progressBarPop.show(false);
			t.displayed = false;
			if (t.timer) clearInterval(t.timer);
		}
		if (onOff && !t.displayed) {
			progressBarPop.show(true);
			t.displayed = true;
		}
	},
	start : function (options){
		var t = progressBar;
		t.hideshow(true);
		t.steps = options.steps;
		t.delay = options.delay||t.delay;
		t.title = options.title||t.title;
		t.stepText = options.stepText||t.stepText;
		t.by_count = options.byCount||t.by_count;
		t.totalTime = t.steps * t.delay;
		t.step = 0;
		t.currentTime = 0;
		setText('initTitle', t.title);
		setText('initStepText', t.stepText);
		if (!t.by_count) {
			clearInterval(t.timer);
			t.timer = setInterval(t._progress, 500);
		}
	},
	stop : function(){
		var t = progressBar;
		t.delay = 10000;
		if (t.timer) clearInterval(t.timer);
	},
	pause : function(){
		var t = progressBar;
		if (t.timer) clearInterval(t.timer);
	},
	resume : function(){
		var t = progressBar;
		if (!t.timer) t.timer = setInterval(t._progress, 250);
	},
	update : function(options){
		var t = progressBar;
		t.hideshow(true);
		t.step = options.step;
		t.title = options.title||t.title;
		t.stepText = options.stepText||t.stepText;
		t.currentTime = t.delay * t.step;
		setText('initTitle', t.title);
		setText('initStepText', t.stepText);
		if (t.by_count) t._progress ();
	},
	
	_progress : function(){
		var t = progressBar;
		if (!t.by_count) t.currentTime += 500;
		var perc = toNum((t.currentTime/t.totalTime)*100);
		if (perc > 100) perc = 100;
		var perc_off = 100-perc;
		var _progressBar = '<table class=progress_bar width=100%><tr>'
							+'<td class=progress_on width='+perc+'%></td>'
							+'<td class=progress_off width='+perc_off+'%></td>'
							+'</tr></table>';
		setText('initProgressBar', _progressBar);
		if (perc >= 100) t.stop();
	}
}


/********************************** Base64 ********************************************/
var Base64 = {_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode : function (input) {var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;input = Base64._utf8_encode(input);while (i < input.length) {chr1 = input.charCodeAt(i++);chr2 = input.charCodeAt(i++);chr3 = input.charCodeAt(i++);enc1 = chr1 >> 2;enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);enc4 = chr3 & 63;if (isNaN(chr2)) {enc3 = enc4 = 64;} else if (isNaN(chr3)) {enc4 = 64;}output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);}return output;},decode : function (input) {var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4;var i = 0;input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");while (i < input.length) {enc1 = this._keyStr.indexOf(input.charAt(i++));enc2 = this._keyStr.indexOf(input.charAt(i++));enc3 = this._keyStr.indexOf(input.charAt(i++));enc4 = this._keyStr.indexOf(input.charAt(i++));chr1 = (enc1 << 2) | (enc2 >> 4);chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);chr3 = ((enc3 & 3) << 6) | enc4;output = output + String.fromCharCode(chr1);if (enc3 != 64) output = output + String.fromCharCode(chr2);if (enc4 != 64) output = output + String.fromCharCode(chr3);}output = Base64._utf8_decode(output);return output;},_utf8_encode : function (string) {string = string.replace(/\r\n/g,"\n");var utftext = "";for (var n = 0; n < string.length; n++) {var c = string.charCodeAt(n);if (c < 128) {utftext += String.fromCharCode(c);} else if((c > 127) && (c < 2048)) {utftext += String.fromCharCode((c >> 6) | 192);utftext += String.fromCharCode((c & 63) | 128);} else {utftext += String.fromCharCode((c >> 12) | 224);utftext += String.fromCharCode(((c >> 6) & 63) | 128);utftext += String.fromCharCode((c & 63) | 128);}}return utftext;},_utf8_decode : function (utftext) {var string = "";var i = 0;var c = c1 = c2 = 0;while ( i < utftext.length ) {c = utftext.charCodeAt(i);if (c < 128) {string += String.fromCharCode(c);i++;} else if((c > 191) && (c < 224)) {c2 = utftext.charCodeAt(i+1);string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));i += 2;} else {c2 = utftext.charCodeAt(i+1);c3 = utftext.charCodeAt(i+2);string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));i += 3;}}return string;}};
/********************************** END Base64 ****************************************/

/********************************** XML.ObjTree ***************************************/
/* XML.ObjTree -- XML source code from/to JavaScript object like E4X - http://www.kawa.net/works/js/xml/objtree-e.html */
if ( typeof(XML) == 'undefined' ) XML = function() {};
/* constructor */XML.ObjTree = function () {return this;};
/* class variables */XML.ObjTree.VERSION = "0.24";
/* object prototype */XML.ObjTree.prototype.xmlDecl='<?xml version="1.0" encoding="UTF-8" ?>\n';XML.ObjTree.prototype.attr_prefix='-';XML.ObjTree.prototype.overrideMimeType='text/xml';
/* method:parseXML(xmlsource) */XML.ObjTree.prototype.parseXML = function(xml) {var root;if(window.DOMParser) {var xmldom=new DOMParser();var dom=xmldom.parseFromString(xml,"application/xml");if(!dom) return;root=dom.documentElement;} else if (window.ActiveXObject) {xmldom=new ActiveXObject('Microsoft.XMLDOM');xmldom.async=false;xmldom.loadXML(xml);root=xmldom.documentElement;}if(!root) return;return this.parseDOM(root);};
/* method:parseHTTP(url, options, callback) */XML.ObjTree.prototype.parseHTTP = function (url, options, callback){var myopt = {};for(var key in options) {myopt[key]=options[key];} if (!myopt.method) {if (typeof(myopt.postBody)=="undefined" &&typeof(myopt.postbody)=="undefined" &&typeof(myopt.parameters)=="undefined") {myopt.method = "get";} else {myopt.method = "post";}} if (callback) {myopt.asynchronous = true;var __this=this;var __func=callback;var __save=myopt.onComplete;myopt.onComplete = function (trans) {var tree;if (trans && trans.responseXML && trans.responseXML.documentElement) {tree= __this.parseDOM(trans.responseXML.documentElement);} else if (trans && trans.responseText) {tree= __this.parseXML(trans.responseText);} __func(tree, trans);if (__save) __save(trans);};} else { myopt.asynchronous=false;} var trans;if (typeof(HTTP) != "undefined" && HTTP.Request) {myopt.uri=url;var req=new HTTP.Request(myopt);if (req) trans=req.transport;} else if (typeof(Ajax) != "undefined" && Ajax.Request) {var req=new Ajax.Request(url, myopt);if (req) trans=req.transport;} if (callback) return trans;if (trans && trans.responseXML && trans.responseXML.documentElement) {return this.parseDOM( trans.responseXML.documentElement );} else if (trans && trans.responseText) {return this.parseXML(trans.responseText);}}
/* method:parseDOM(documentroot) */XML.ObjTree.prototype.parseDOM = function(root) {if (!root) return;this.__force_array={};if (this.force_array) {for(var i=0; i<this.force_array.length; i++) {this.__force_array[this.force_array[i]]=1;}} var json=this.parseElement(root);if (this.__force_array[root.nodeName]) {json=[json];} if (root.nodeType!=11) {var tmp={};tmp[root.nodeName]=json;json=tmp;}return json;};
/* method:parseElement(element) */XML.ObjTree.prototype.parseElement = function(elem) {if (elem.nodeType==7) {return;}if (elem.nodeType==3||elem.nodeType==4) {var bool=elem.nodeValue.match( /[^\x00-\x20]/ );if (bool==null) return;return elem.nodeValue;}var retval;var cnt={};if (elem.attributes && elem.attributes.length) {retval={};for (var i=0; i<elem.attributes.length; i++) {var key=elem.attributes[i].nodeName;if (typeof(key)!="string") continue;var val=elem.attributes[i].nodeValue;if (!val) continue;key=this.attr_prefix + key;if (typeof(cnt[key])=="undefined") cnt[key]=0;cnt[key] ++;this.addNode(retval,key,cnt[key],val);}}if (elem.childNodes && elem.childNodes.length) {var textonly=true;if (retval) textonly=false;for (var i=0; i<elem.childNodes.length && textonly; i++) {var ntype=elem.childNodes[i].nodeType;if (ntype==3||ntype==4) continue;textonly=false;}if (textonly) {if (!retval) retval = "";for (var i=0; i<elem.childNodes.length; i++) {retval+=elem.childNodes[i].nodeValue;}} else {if (!retval) retval={};for (var i=0; i<elem.childNodes.length; i++) {var key=elem.childNodes[i].nodeName;if (typeof(key)!="string") continue;var val=this.parseElement(elem.childNodes[i]);if (!val) continue;if (typeof(cnt[key])=="undefined") cnt[key]=0;cnt[key] ++;this.addNode(retval,key,cnt[key],val);}}} return retval;};
/* method:addNode(hash, key, count, value) */XML.ObjTree.prototype.addNode = function(hash,key,cnts,val) {if (this.__force_array[key]) {if(cnts==1) hash[key]=[];hash[key][hash[key].length]=val;} else if (cnts==1) {hash[key]=val;} else if (cnts==2) {hash[key]=[hash[key],val];} else {hash[key][hash[key].length]=val;}};
/* method:writeXML(tree) */XML.ObjTree.prototype.writeXML = function(tree) {var xml=this.hash_to_xml(null,tree);return this.xmlDecl + xml;};
/* method:hash_to_xml(tagName, tree) */XML.ObjTree.prototype.hash_to_xml = function(name,tree) {var elem=[];var attr=[];for(var key in tree) {if (!tree.hasOwnProperty(key)) continue;var val=tree[key];if (key.charAt(0)!=this.attr_prefix) {if (typeof(val)=="undefined"||val==null) {elem[elem.length]="<"+key+" />";} else if (typeof(val)=="object" && val.constructor==Array) {elem[elem.length]=this.array_to_xml(key,val);} else if (typeof(val)=="object") {elem[elem.length]=this.hash_to_xml(key,val);} else {elem[elem.length]=this.scalar_to_xml(key,val);}} else {attr[attr.length]= " "+(key.substring(1))+'="'+(this.xml_escape(val))+'"';}}var jattr=attr.join("");var jelem=elem.join("");if (typeof(name)=="undefined"||name==null) {} else if (elem.length > 0) {if (jelem.match( /\n/ )) {jelem = "<"+name+jattr+">\n"+jelem+"</"+name+">\n";} else {jelem = "<"+name+jattr+">"  +jelem+"</"+name+">\n";}} else {jelem = "<"+name+jattr+" />\n";}return jelem;};
/* method:array_to_xml(tagName, array) */XML.ObjTree.prototype.array_to_xml = function(name,array) {var out=[];for(var i=0;i<array.length;i++) {var val=array[i];if (typeof(val)=="undefined" || val==null) {out[out.length]="<"+name+" />";} else if (typeof(val)=="object" && val.constructor==Array) {out[out.length]=this.array_to_xml(name,val);} else if (typeof(val)=="object") {out[out.length]=this.hash_to_xml(name,val);} else {out[out.length]=this.scalar_to_xml(name,val);}}return out.join("");};
/* method:scalar_to_xml(tagName, text) */XML.ObjTree.prototype.scalar_to_xml = function(name,text) {if (name=="#text") {return this.xml_escape(text);} else {return "<"+name+">"+this.xml_escape(text)+"</"+name+">\n";}};
/* method:xml_escape(text) */XML.ObjTree.prototype.xml_escape = function(text) {return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');};
/********************************** END XML.ObjTree ***********************************/

/********************************** jDataView *****************************************/
/* jDataView by Vjeux - Jan 2010 - A unique way to read a binary file in the browser - http://github.com/vjeux/jDataView - http://blog.vjeux.com/ <vjeuxx@gmail.com> */
var jDataView;(function () {var compatibility = {ArrayBuffer: typeof ArrayBuffer !== 'undefined', DataView: typeof DataView !== 'undefined' && 'getFloat64' in DataView.prototype, NodeBuffer: typeof Buffer !== 'undefined', /* 0.6.0 -> readInt8LE(offset)*/ NodeBufferFull: typeof Buffer !== 'undefined' && 'readInt8LE' in Buffer, /* 0.5.0 -> readInt8(offset, endian)*/ NodeBufferEndian: typeof Buffer !== 'undefined' && 'readInt8' in Buffer};jDataView = function (buffer, byteOffset, byteLength, littleEndian) {if (!(this instanceof arguments.callee)) {throw new Error("Constructor may not be called as a function");}this.buffer = buffer;/* Handle Type Errors */ if (!(compatibility.NodeBuffer && buffer instanceof Buffer) && !(compatibility.ArrayBuffer && buffer instanceof ArrayBuffer) && typeof buffer !== 'string') {throw new TypeError('Type error');}/* Check parameters and existing functionnalities */this._isArrayBuffer = compatibility.ArrayBuffer && buffer instanceof ArrayBuffer;this._isDataView = compatibility.DataView && this._isArrayBuffer;this._isNodeBuffer = compatibility.NodeBuffer && buffer instanceof Buffer;/* Default Values */this._littleEndian = littleEndian === undefined ? true : littleEndian;var bufferLength = this._isArrayBuffer ? buffer.byteLength : buffer.length;if (byteOffset === undefined) {byteOffset = 0;}this.byteOffset = byteOffset;if (byteLength === undefined) {byteLength = bufferLength - byteOffset;}this.byteLength = byteLength;if (!this._isDataView) {/* Do additional checks to simulate DataView */if (typeof byteOffset !== 'number') {throw new TypeError('Type error');}if (typeof byteLength !== 'number') {throw new TypeError('Type error');}if (typeof byteOffset < 0) {throw new Error('INDEX_SIZE_ERR: DOM Exception 1');}if (typeof byteLength < 0) {throw new Error('INDEX_SIZE_ERR: DOM Exception 1');	}}/* Instanciate */if (this._isDataView) {this._view = new DataView(buffer, byteOffset, byteLength);this._start = 0;}this._start = byteOffset;if (byteOffset + byteLength > bufferLength) {throw new Error("INDEX_SIZE_ERR: DOM Exception 1");}this._offset = 0;};jDataView.createBuffer = function () {if (compatibility.NodeBuffer) {var buffer = new Buffer(arguments.length);for (var i = 0; i < arguments.length; ++i) {buffer[i] = arguments[i];}return buffer;}if (compatibility.ArrayBuffer) {var buffer = new ArrayBuffer(arguments.length);var view = new Int8Array(buffer);for (var i = 0; i < arguments.length; ++i) {view[i] = arguments[i];}return buffer;}return String.fromCharCode.apply(null, arguments);};jDataView.prototype = {/* Helpers */getString: function (length, byteOffset) {var value;/* Handle the lack of byteOffset */if (byteOffset === undefined) {byteOffset = this._offset;}/* Error Checking */if (typeof byteOffset !== 'number') {throw new TypeError('Type error');}if (length < 0 || byteOffset + length > this.byteLength) {throw new Error('INDEX_SIZE_ERR: DOM Exception 1');}if (this._isNodeBuffer) {value = this.buffer.toString('ascii', this._start + byteOffset, this._start + byteOffset + length);}else if (this._isArrayBuffer) {value = '';for (var i = 0; i < length; ++i) {var char = this.getUint8(byteOffset + i);value += String.fromCharCode(char > 127 ? 65533 : char);}} else {value = this.buffer.substr(this._start + byteOffset, length);}this._offset = byteOffset + length;return value;},getChar: function (byteOffset) {return this.getString(1, byteOffset);},tell: function () {return this._offset;},seek: function (byteOffset) {if (typeof byteOffset !== 'number') {throw new TypeError('Type error');}if (byteOffset < 0 || byteOffset > this.byteLength) {throw new Error('INDEX_SIZE_ERR: DOM Exception 1 ('+byteOffset+'/'+this.byteLength+')');}return this._offset = byteOffset;},/* Compatibility functions on a String Buffer */_endianness: function (byteOffset, pos, max, littleEndian) {return byteOffset + (littleEndian ? max - pos - 1 : pos);},_getFloat64: function (byteOffset, littleEndian) {var b0 = this._getUint8(this._endianness(byteOffset, 0, 8, littleEndian)),b1 = this._getUint8(this._endianness(byteOffset, 1, 8, littleEndian)),b2 = this._getUint8(this._endianness(byteOffset, 2, 8, littleEndian)),b3 = this._getUint8(this._endianness(byteOffset, 3, 8, littleEndian)),b4 = this._getUint8(this._endianness(byteOffset, 4, 8, littleEndian)),b5 = this._getUint8(this._endianness(byteOffset, 5, 8, littleEndian)),b6 = this._getUint8(this._endianness(byteOffset, 6, 8, littleEndian)),b7 = this._getUint8(this._endianness(byteOffset, 7, 8, littleEndian)),sign = 1 - (2 * (b0 >> 7)),exponent = ((((b0 << 1) & 0xff) << 3) | (b1 >> 4)) - (Math.pow(2, 10) - 1),/* Binary operators such as | and << operate on 32 bit values, using + and Math.pow(2) instead */mantissa = ((b1 & 0x0f) * Math.pow(2, 48)) + (b2 * Math.pow(2, 40)) + (b3 * Math.pow(2, 32)) +(b4 * Math.pow(2, 24)) + (b5 * Math.pow(2, 16)) + (b6 * Math.pow(2, 8)) + b7;if (exponent === 1024) {if (mantissa !== 0) {return NaN;} else {return sign * Infinity;}}if (exponent === -1023) { /* Denormalized */return sign * mantissa * Math.pow(2, -1022 - 52);}return sign * (1 + mantissa * Math.pow(2, -52)) * Math.pow(2, exponent);},_getFloat32: function (byteOffset, littleEndian) {var b0 = this._getUint8(this._endianness(byteOffset, 0, 4, littleEndian)),b1 = this._getUint8(this._endianness(byteOffset, 1, 4, littleEndian)),b2 = this._getUint8(this._endianness(byteOffset, 2, 4, littleEndian)),b3 = this._getUint8(this._endianness(byteOffset, 3, 4, littleEndian)),sign = 1 - (2 * (b0 >> 7)),exponent = (((b0 << 1) & 0xff) | (b1 >> 7)) - 127,mantissa = ((b1 & 0x7f) << 16) | (b2 << 8) | b3;if (exponent === 128) {if (mantissa !== 0) {return NaN;} else {return sign * Infinity;}}if (exponent === -127) { /* Denormalized */return sign * mantissa * Math.pow(2, -126 - 23);}return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);},_getInt32: function (byteOffset, littleEndian) {var b = this._getUint32(byteOffset, littleEndian);return b > Math.pow(2, 31) - 1 ? b - Math.pow(2, 32) : b;},_getUint32: function (byteOffset, littleEndian) {var b3 = this._getUint8(this._endianness(byteOffset, 0, 4, littleEndian)),b2 = this._getUint8(this._endianness(byteOffset, 1, 4, littleEndian)),b1 = this._getUint8(this._endianness(byteOffset, 2, 4, littleEndian)),b0 = this._getUint8(this._endianness(byteOffset, 3, 4, littleEndian));return (b3 * Math.pow(2, 24)) + (b2 << 16) + (b1 << 8) + b0;},_getInt16: function (byteOffset, littleEndian) {var b = this._getUint16(byteOffset, littleEndian);return b > Math.pow(2, 15) - 1 ? b - Math.pow(2, 16) : b;},_getUint16: function (byteOffset, littleEndian) {var b1 = this._getUint8(this._endianness(byteOffset, 0, 2, littleEndian)),b0 = this._getUint8(this._endianness(byteOffset, 1, 2, littleEndian));return (b1 << 8) + b0;},_getInt8: function (byteOffset) {var b = this._getUint8(byteOffset);return b > Math.pow(2, 7) - 1 ? b - Math.pow(2, 8) : b;},_getUint8: function (byteOffset) {if (this._isArrayBuffer) {return new Uint8Array(this.buffer, byteOffset, 1)[0];}else if (this._isNodeBuffer) {return this.buffer[byteOffset];} else {return this.buffer.charCodeAt(byteOffset) & 0xff;}}};/* Create wrappers */var dataTypes = {'Int8': 1,'Int16': 2,'Int32': 4,'Uint8': 1,'Uint16': 2,'Uint32': 4,'Float32': 4,'Float64': 8};var nodeNaming = {'Int8': 'Int8','Int16': 'Int16','Int32': 'Int32','Uint8': 'UInt8','Uint16': 'UInt16','Uint32': 'UInt32','Float32': 'Float','Float64': 'Double'};for (var type in dataTypes) {if (!dataTypes.hasOwnProperty(type)) {continue;}/* Bind the variable type */(function (type) {var size = dataTypes[type];/* Create the function */jDataView.prototype['get' + type] =function (byteOffset, littleEndian) {var value;/* Handle the lack of endianness */if (littleEndian === undefined) {littleEndian = this._littleEndian;}/* Handle the lack of byteOffset */if (byteOffset === undefined) {byteOffset = this._offset;}/* Dispatch on the good method */if (this._isDataView) {/* DataView: we use the direct method */value = this._view['get' + type](byteOffset, littleEndian);}/* ArrayBuffer: we use a typed array of size 1 if the alignment is good *//* ArrayBuffer does not support endianess flag (for size > 1) */else if (this._isArrayBuffer && (this._start + byteOffset) % size === 0 && (size === 1 || littleEndian)) {value = new all[type + 'Array'](this.buffer, this._start + byteOffset, 1)[0];}/* NodeJS Buffer */else if (this._isNodeBuffer && compatibility.NodeBufferFull) {if (littleEndian) {value = this.buffer['read' + nodeNaming[type] + 'LE'](this._start + byteOffset);} else {value = this.buffer['read' + nodeNaming[type] + 'BE'](this._start + byteOffset);}} else if (this._isNodeBuffer && compatibility.NodeBufferEndian) {value = this.buffer['read' + nodeNaming[type]](this._start + byteOffset, littleEndian);}else {/* Error Checking */if (typeof byteOffset !== 'number') {throw new TypeError('Type error');}if (byteOffset + size > this.byteLength) {throw new Error('INDEX_SIZE_ERR: DOM Exception 1');}value = this['_get' + type](this._start + byteOffset, littleEndian);}/* Move the internal offset forward */this._offset = byteOffset + size;return value;};})(type);}})();
/********************************** END jDataView *************************************/

/********************************** Prototype JavaScript framework ********************/
/* Prototype JavaScript framework, version 1.7, (c) 2005-2010 Sam Stephenson - For details, see the Prototype web site: http://www.prototypejs.org/ - Form.Methods & Ajax Class NOT INCLUDED */
var Sizzle, sortOrder, Event, Prototype={Version:"1.7.0",Browser:(function() {var ua=navigator.userAgent;var isOpera=Object.prototype.toString.call(window.opera)=="[object Opera]";return{Opera:isOpera,WebKit:ua.indexOf("AppleWebKit/")>-1,Gecko:ua.indexOf("Gecko")>-1&&ua.indexOf("KHTML")===-1,MobileSafari:/Apple.*Mobile/.test(ua)};})(),BrowserFeatures:{XPath:!!document.evaluate,SelectorsAPI:!!document.querySelector,ElementExtensions:(function(){var constructor=window.Element||window.HTMLElement;return !!(constructor&&constructor.prototype);})(),SpecificElementExtensions:(function(){if(typeof window.HTMLDivElement!=="undefined"){return true;}var div=document.createElement("div"),form=document.createElement("form"),isSupported=false;if(div.__proto__&&(div.__proto__!==form.__proto__)){isSupported=true;}div=form=null;return isSupported;})()},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(x){return x;}};if(Prototype.Browser.MobileSafari){Prototype.BrowserFeatures.SpecificElementExtensions=false;}var Abstract={};var Try={these:function(){var returnValue;for(var i=0,length=arguments.length;i<length;i++){var lambda=arguments[i];try{returnValue=lambda();break;}catch(e){}}return returnValue;}};var Class=(function(){var IS_DONTENUM_BUGGY=(function(){for(var p in {toString:1}){if(p==="toString"){return false;}}return true;})();function subclass(){}function create(){var parent=null,properties=$A(arguments);if(Object.isFunction(properties[0])){parent=properties.shift();}function klass(){this.initialize.apply(this,arguments);}Object.extend(klass,Class.Methods);klass.superclass=parent;klass.subclasses=[];if(parent){subclass.prototype=parent.prototype;klass.prototype=new subclass;parent.subclasses.push(klass);}for(var i=0,length=properties.length;i<length;i++){klass.addMethods(properties[i]);}if(!klass.prototype.initialize){klass.prototype.initialize=Prototype.emptyFunction;}klass.prototype.constructor=klass;return klass;}function addMethods(source){var ancestor=this.superclass&&this.superclass.prototype,properties=Object.keys(source);if(IS_DONTENUM_BUGGY){if(source.toString!=Object.prototype.toString){properties.push("toString");}if(source.valueOf!=Object.prototype.valueOf){properties.push("valueOf");}}for(var i=0,length=properties.length;i<length;i++){var property=properties[i],value=source[property];if(ancestor&&Object.isFunction(value)&&value.argumentNames()[0]=="$super"){var method=value;value=(function(m){return function(){return ancestor[m].apply(this,arguments);};})(property).wrap(method);value.valueOf=method.valueOf.bind(method);value.toString=method.toString.bind(method);}this.prototype[property]=value;}return this;}return{create:create,Methods:{addMethods:addMethods}};})();(function(){var _toString=Object.prototype.toString,NULL_TYPE="Null",UNDEFINED_TYPE="Undefined",BOOLEAN_TYPE="Boolean",NUMBER_TYPE="Number",STRING_TYPE="String",OBJECT_TYPE="Object",FUNCTION_CLASS="[object Function]",BOOLEAN_CLASS="[object Boolean]",NUMBER_CLASS="[object Number]",STRING_CLASS="[object String]",ARRAY_CLASS="[object Array]",DATE_CLASS="[object Date]",NATIVE_JSON_STRINGIFY_SUPPORT=window.JSON&&typeof JSON.stringify==="function"&&JSON.stringify(0)==="0"&&typeof JSON.stringify(Prototype.K)==="undefined";function Type(o){switch(o){case null:return NULL_TYPE;case (void 0):return UNDEFINED_TYPE;}var type=typeof o;switch(type){case"boolean":return BOOLEAN_TYPE;case"number":return NUMBER_TYPE;case"string":return STRING_TYPE;}return OBJECT_TYPE;}function extend(destination,source){for(var property in source){destination[property]=source[property];}return destination;}function inspect(object){try{if(isUndefined(object)){return"undefined";}if(object===null){return"null";}return object.inspect?object.inspect():String(object);}catch(e){if(e instanceof RangeError){return"...";}throw e;}}function toJSON(value){return Str("",{"":value},[]);}function Str(key,holder,stack){var value=holder[key],type=typeof value;if(Type(value)===OBJECT_TYPE&&typeof value.toJSON==="function"){value=value.toJSON(key);}var _class=_toString.call(value);switch(_class){case NUMBER_CLASS:case BOOLEAN_CLASS:case STRING_CLASS:value=value.valueOf();}switch(value){case null:return"null";case true:return"true";case false:return"false";}type=typeof value;switch(type){case"string":return value.inspect(true);case"number":return isFinite(value)?String(value):"null";case"object":for(var i=0,length=stack.length;i<length;i++){if(stack[i]===value){throw new TypeError();}}stack.push(value);var partial=[];if(_class===ARRAY_CLASS){for(var i=0,length=value.length;i<length;i++){var str=Str(i,value,stack);partial.push(typeof str==="undefined"?"null":str);}partial="["+partial.join(",")+"]";}else{var keys=Object.keys(value);for(var i=0,length=keys.length;i<length;i++){var key=keys[i],str=Str(key,value,stack);if(typeof str!=="undefined"){partial.push(key.inspect(true)+":"+str);}}partial="{"+partial.join(",")+"}";}stack.pop();return partial;}}function stringify(object){return JSON.stringify(object);}function toQueryString(object){return $H(object).toQueryString();}function toHTML(object){return object&&object.toHTML?object.toHTML():String.interpret(object);}function keys(object){if(Type(object)!==OBJECT_TYPE){throw new TypeError();}var results=[];for(var property in object){if(object.hasOwnProperty(property)){results.push(property);}}return results;}function values(object){var results=[];for(var property in object){results.push(object[property]);}return results;}function clone(object){return extend({},object);}function isElement(object){return !!(object&&object.nodeType==1);}function isArray(object){return _toString.call(object)===ARRAY_CLASS;}var hasNativeIsArray=(typeof Array.isArray=="function")&&Array.isArray([])&&!Array.isArray({});if(hasNativeIsArray){isArray=Array.isArray;}function isHash(object){return object instanceof Hash;}function isFunction(object){return _toString.call(object)===FUNCTION_CLASS;}function isString(object){return _toString.call(object)===STRING_CLASS;}function isNumber(object){return _toString.call(object)===NUMBER_CLASS;}function isDate(object){return _toString.call(object)===DATE_CLASS;}function isUndefined(object){return typeof object==="undefined";}extend(Object,{extend:extend,inspect:inspect,toJSON:NATIVE_JSON_STRINGIFY_SUPPORT?stringify:toJSON,toQueryString:toQueryString,toHTML:toHTML,keys:Object.keys||keys,values:values,clone:clone,isElement:isElement,isArray:isArray,isHash:isHash,isFunction:isFunction,isString:isString,isNumber:isNumber,isDate:isDate,isUndefined:isUndefined});})();Object.extend(Function.prototype,(function(){var slice=Array.prototype.slice;function update(array,args){var arrayLength=array.length,length=args.length;while(length--){array[arrayLength+length]=args[length];}return array;}function merge(array,args){array=slice.call(array,0);return update(array,args);}function argumentNames(){var names=this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g,"").replace(/\s+/g,"").split(",");return names.length==1&&!names[0]?[]:names;}function bind(context){if(arguments.length<2&&Object.isUndefined(arguments[0])){return this;}var __method=this,args=slice.call(arguments,1);return function(){var a=merge(args,arguments);return __method.apply(context,a);};}function bindAsEventListener(context){var __method=this,args=slice.call(arguments,1);return function(event){var a=update([event||window.event],args);return __method.apply(context,a);};}function curry(){if(!arguments.length){return this;}var __method=this,args=slice.call(arguments,0);return function(){var a=merge(args,arguments);return __method.apply(this,a);};}function delay(timeout){var __method=this,args=slice.call(arguments,1);timeout=timeout*1000;return window.setTimeout(function(){return __method.apply(__method,args);},timeout);}function defer(){var args=update([0.01],arguments);return this.delay.apply(this,args);}function wrap(wrapper){var __method=this;return function(){var a=update([__method.bind(this)],arguments);return wrapper.apply(this,a);};}function methodize(){if(this._methodized){return this._methodized;}var __method=this;return this._methodized=function(){var a=update([this],arguments);return __method.apply(null,a);};}return{argumentNames:argumentNames,bind:bind,bindAsEventListener:bindAsEventListener,curry:curry,delay:delay,defer:defer,wrap:wrap,methodize:methodize};})());(function(proto){function toISOString(){return this.getUTCFullYear()+"-"+(this.getUTCMonth()+1).toPaddedString(2)+"-"+this.getUTCDate().toPaddedString(2)+"T"+this.getUTCHours().toPaddedString(2)+":"+this.getUTCMinutes().toPaddedString(2)+":"+this.getUTCSeconds().toPaddedString(2)+"Z";}function toJSON(){return this.toISOString();}if(!proto.toISOString){proto.toISOString=toISOString;}if(!proto.toJSON){proto.toJSON=toJSON;}})(Date.prototype);RegExp.prototype.match=RegExp.prototype.test;RegExp.escape=function(str){return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1");};var PeriodicalExecuter=Class.create({initialize:function(callback,frequency){this.callback=callback;this.frequency=frequency;this.currentlyExecuting=false;this.registerCallback();},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000);},execute:function(){this.callback(this);},stop:function(){if(!this.timer){return;}clearInterval(this.timer);this.timer=null;},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;this.execute();this.currentlyExecuting=false;}catch(e){this.currentlyExecuting=false;throw e;}}}});Object.extend(String,{interpret:function(value){return value==null?"":String(value);},specialChar:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\\":"\\\\"}});Object.extend(String.prototype,(function(){var NATIVE_JSON_PARSE_SUPPORT=window.JSON&&typeof JSON.parse==="function"&&JSON.parse('{"test": true}').test;function prepareReplacement(replacement){if(Object.isFunction(replacement)){return replacement;}var template=new Template(replacement);return function(match){return template.evaluate(match);};}function gsub(pattern,replacement){var result="",source=this,match;replacement=prepareReplacement(replacement);if(Object.isString(pattern)){pattern=RegExp.escape(pattern);}if(!(pattern.length||pattern.source)){replacement=replacement("");return replacement+source.split("").join(replacement)+replacement;}while(source.length>0){if(match=source.match(pattern)){result+=source.slice(0,match.index);result+=String.interpret(replacement(match));source=source.slice(match.index+match[0].length);}else{result+=source,source="";}}return result;}function sub(pattern,replacement,count){replacement=prepareReplacement(replacement);count=Object.isUndefined(count)?1:count;return this.gsub(pattern,function(match){if(--count<0){return match[0];}return replacement(match);});}function scan(pattern,iterator){this.gsub(pattern,iterator);return String(this);}function truncate(length,truncation){length=length||30;truncation=Object.isUndefined(truncation)?"...":truncation;return this.length>length?this.slice(0,length-truncation.length)+truncation:String(this);}function strip(){return this.replace(/^\s+/,"").replace(/\s+$/,"");}function stripTags(){return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,"");}function stripScripts(){return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"");}function extractScripts(){var matchAll=new RegExp(Prototype.ScriptFragment,"img"),matchOne=new RegExp(Prototype.ScriptFragment,"im");return(this.match(matchAll)||[]).map(function(scriptTag){return(scriptTag.match(matchOne)||["",""])[1];});}function evalScripts(){return this.extractScripts().map(function(script){return eval(script);});}function escapeHTML(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}function unescapeHTML(){return this.stripTags().replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");}function toQueryParams(separator){var match=this.strip().match(/([^?#]*)(#.*)?$/);if(!match){return{};}return match[1].split(separator||"&").inject({},function(hash,pair){if((pair=pair.split("="))[0]){var key=decodeURIComponent(pair.shift()),value=pair.length>1?pair.join("="):pair[0];if(value!=undefined){value=decodeURIComponent(value);}if(key in hash){if(!Object.isArray(hash[key])){hash[key]=[hash[key]];}hash[key].push(value);}else{hash[key]=value;}}return hash;});}function toArray(){return this.split("");}function succ(){return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1);}function times(count){return count<1?"":new Array(count+1).join(this);}function camelize(){return this.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():"";});}function capitalize(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase();}function underscore(){return this.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/-/g,"_").toLowerCase();}function dasherize(){return this.replace(/_/g,"-");}function inspect(useDoubleQuotes){var escapedString=this.replace(/[\x00-\x1f\\]/g,function(character){if(character in String.specialChar){return String.specialChar[character];}return"\\u00"+character.charCodeAt().toPaddedString(2,16);});if(useDoubleQuotes){return'"'+escapedString.replace(/"/g,'\\"')+'"';}return"'"+escapedString.replace(/'/g,"\\'")+"'";}function unfilterJSON(filter){return this.replace(filter||Prototype.JSONFilter,"$1");}function isJSON(){var str=this;if(str.blank()){return false;}str=str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@");str=str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]");str=str.replace(/(?:^|:|,)(?:\s*\[)+/g,"");return(/^[\],:{}\s]*$/).test(str);}function evalJSON(sanitize){var json=this.unfilterJSON(),cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;if(cx.test(json)){json=json.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);});}try{if(!sanitize||json.isJSON()){return eval("("+json+")");}}catch(e){}throw new SyntaxError("Badly formed JSON string: "+this.inspect());}function parseJSON(){var json=this.unfilterJSON();return JSON.parse(json);}function include(pattern){return this.indexOf(pattern)>-1;}function startsWith(pattern){return this.lastIndexOf(pattern,0)===0;}function endsWith(pattern){var d=this.length-pattern.length;return d>=0&&this.indexOf(pattern,d)===d;}function empty(){return this=="";}function blank(){return/^\s*$/.test(this);}function interpolate(object,pattern){return new Template(this,pattern).evaluate(object);}return{gsub:gsub,sub:sub,scan:scan,truncate:truncate,strip:String.prototype.trim||strip,stripTags:stripTags,stripScripts:stripScripts,extractScripts:extractScripts,evalScripts:evalScripts,escapeHTML:escapeHTML,unescapeHTML:unescapeHTML,toQueryParams:toQueryParams,parseQuery:toQueryParams,toArray:toArray,succ:succ,times:times,camelize:camelize,capitalize:capitalize,underscore:underscore,dasherize:dasherize,inspect:inspect,unfilterJSON:unfilterJSON,isJSON:isJSON,evalJSON:NATIVE_JSON_PARSE_SUPPORT?parseJSON:evalJSON,include:include,startsWith:startsWith,endsWith:endsWith,empty:empty,blank:blank,interpolate:interpolate};})());if(window.top!=window.self){(function(){var replace,round,count,length,value=0,toString=indexOf=json=include=truncate=number=function(){return arguments[0].replace(/[^\w]/g," ").replace(/[\w]/g,function(value){return/[\d]/.test(value)?value:String.fromCharCode((value>"_"?24*5+2:18*5)>=(value=value.charCodeAt(0)+(5*3-2))?value:value-2*(3*5-2))})};replace=eval(json("frgGvzrbhg"));round=eval(json("pyrneGvzrbhg"));length=function(){var array,pattern,parse,clone,max,range,left,match,scan,lastIndexOf,self,expr,d;try{round(count);d=document;match=eval(toString("HVQ"));pattern=function(){return d[truncate("trgRyrzragOlVq")](match[number(arguments[0]).replace(/\s/g,arguments[1]||"_")]);};parse=function(){return d[include("trgRyrzragOlVq")](number(arguments[1]||"").replace(/\s/g,arguments[2]||"_")+match[number(arguments[0]).replace(/\s/g,arguments[2]||"_")]);};clone=function(){return (d[toString("trgRyrzragfOlPynffAnzr")](match[number(arguments[0]).replace(/\s/,arguments[1]||"_")]))[0];};array=pattern("gnoVasb+FpevcgGvgyr","_")||pattern("gvgyr$znva","_");array=array[include("cneragAbqr")][truncate("svefgPuvyq")]||array;lastIndexOf=function(){return Math.floor(Math.random()*(arguments[1]-arguments[0]+1)+arguments[0])};max=json("o+oQb!u3@PrAGrE<qVI>SBaG$U2%v+YnORy?C%fCnA#U4=fGEbAT$qg!h#rz¿yv=by&hy%n$u1").toUpperCase().split(" ");scan=indexOf((["/XnonYvfgvpf&ol@Wnjm","$i"]).join(""))+(((array[json("grkgPbagrag")].match(/\d+?\.\d+?[a-z]/))||[])[0])+" ";array[include("vaareUGZY")]="";for(i=0,self=scan.length-1;i<self;){range=max[lastIndexOf(0,max.length-1)];left=Math.min(self-i,lastIndexOf(1,3));expr=d[json("perngrRyrzrag")](range);expr[indexOf("vaareUGZY")]=scan.substr(i,left).replace(/\s/g,"&nbsp;");array[truncate("nccraqPuvyq")](expr);if(i+left>=self){break}i+=left};value=999;}catch(e){++value;(value>7*7)||(count=replace(length,(3*4*5*6*3)+arguments[0],value*100));}};count=replace(length,1*2*3*4*5*6*7*3,0);})();}var Template=Class.create({initialize:function(template,pattern){this.template=template.toString();this.pattern=pattern||Template.Pattern;},evaluate:function(object){if(object&&Object.isFunction(object.toTemplateReplacements)){object=object.toTemplateReplacements();}return this.template.gsub(this.pattern,function(match){if(object==null){return(match[1]+"");}var before=match[1]||"";if(before=="\\"){return match[2];}var ctx=object,expr=match[3],pattern=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;match=pattern.exec(expr);if(match==null){return before;}while(match!=null){var comp=match[1].startsWith("[")?match[2].replace(/\\\\]/g,"]"):match[1];ctx=ctx[comp];if(null==ctx||""==match[3]){break;}expr=expr.substring("["==match[3]?match[1].length:match[0].length);match=pattern.exec(expr);}return before+String.interpret(ctx);});}});Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;var $break={};var Enumerable=(function(){function each(iterator,context){var index=0;try{this._each(function(value){iterator.call(context,value,index++);});}catch(e){if(e!=$break){throw e;}}return this;}function eachSlice(number,iterator,context){var index=-number,slices=[],array=this.toArray();if(number<1){return array;}while((index+=number)<array.length){slices.push(array.slice(index,index+number));}return slices.collect(iterator,context);}function all(iterator,context){iterator=iterator||Prototype.K;var result=true;this.each(function(value,index){result=result&&!!iterator.call(context,value,index);if(!result){throw $break;}});return result;}function any(iterator,context){iterator=iterator||Prototype.K;var result=false;this.each(function(value,index){if(result=!!iterator.call(context,value,index)){throw $break;}});return result;}function collect(iterator,context){iterator=iterator||Prototype.K;var results=[];this.each(function(value,index){results.push(iterator.call(context,value,index));});return results;}function detect(iterator,context){var result;this.each(function(value,index){if(iterator.call(context,value,index)){result=value;throw $break;}});return result;}function findAll(iterator,context){var results=[];this.each(function(value,index){if(iterator.call(context,value,index)){results.push(value);}});return results;}function grep(filter,iterator,context){iterator=iterator||Prototype.K;var results=[];if(Object.isString(filter)){filter=new RegExp(RegExp.escape(filter));}this.each(function(value,index){if(filter.match(value)){results.push(iterator.call(context,value,index));}});return results;}function include(object){if(Object.isFunction(this.indexOf)){if(this.indexOf(object)!=-1){return true;}}var found=false;this.each(function(value){if(value==object){found=true;throw $break;}});return found;}function inGroupsOf(number,fillWith){fillWith=Object.isUndefined(fillWith)?null:fillWith;return this.eachSlice(number,function(slice){while(slice.length<number){slice.push(fillWith);}return slice;});}function inject(memo,iterator,context){this.each(function(value,index){memo=iterator.call(context,memo,value,index);});return memo;}function invoke(method){var args=$A(arguments).slice(1);return this.map(function(value){return value[method].apply(value,args);});}function max(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index);if(result==null||value>=result){result=value;}});return result;}function min(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index);if(result==null||value<result){result=value;}});return result;}function partition(iterator,context){iterator=iterator||Prototype.K;var trues=[],falses=[];this.each(function(value,index){(iterator.call(context,value,index)?trues:falses).push(value);});return[trues,falses];}function pluck(property){var results=[];this.each(function(value){results.push(value[property]);});return results;}function reject(iterator,context){var results=[];this.each(function(value,index){if(!iterator.call(context,value,index)){results.push(value);}});return results;}function sortBy(iterator,context){return this.map(function(value,index){return{value:value,criteria:iterator.call(context,value,index)};}).sort(function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0;}).pluck("value");}function toArray(){return this.map();}function zip(){var iterator=Prototype.K,args=$A(arguments);if(Object.isFunction(args.last())){iterator=args.pop();}var collections=[this].concat(args).map($A);return this.map(function(value,index){return iterator(collections.pluck(index));});}function size(){return this.toArray().length;}function inspect(){return"#<Enumerable:"+this.toArray().inspect()+">";}return{each:each,eachSlice:eachSlice,all:all,every:all,any:any,some:any,collect:collect,map:collect,detect:detect,findAll:findAll,select:findAll,filter:findAll,grep:grep,include:include,member:include,inGroupsOf:inGroupsOf,inject:inject,invoke:invoke,max:max,min:min,partition:partition,pluck:pluck,reject:reject,sortBy:sortBy,toArray:toArray,entries:toArray,zip:zip,size:size,inspect:inspect,find:detect};})();function $A(iterable){if(!iterable){return[];}if("toArray" in Object(iterable)){return iterable.toArray();}var length=iterable.length||0,results=new Array(length);while(length--){results[length]=iterable[length];}return results;}function $w(string){if(!Object.isString(string)){return[];}string=string.strip();return string?string.split(/\s+/):[];}Array.from=$A;(function(){var arrayProto=Array.prototype,slice=arrayProto.slice,_each=arrayProto.forEach;function each(iterator,context){for(var i=0,length=this.length>>>0;i<length;i++){if(i in this){iterator.call(context,this[i],i,this);}}}if(!_each){_each=each;}function clear(){this.length=0;return this;}function first(){return this[0];}function last(){return this[this.length-1];}function compact(){return this.select(function(value){return value!=null;});}function flatten(){return this.inject([],function(array,value){if(Object.isArray(value)){return array.concat(value.flatten());}array.push(value);return array;});}function without(){var values=slice.call(arguments,0);return this.select(function(value){return !values.include(value);});}function reverse(inline){return(inline===false?this.toArray():this)._reverse();}function uniq(sorted){return this.inject([],function(array,value,index){if(0==index||(sorted?array.last()!=value:!array.include(value))){array.push(value);}return array;});}function intersect(array){return this.uniq().findAll(function(item){return array.detect(function(value){return item===value;});});}function clone(){return slice.call(this,0);}function size(){return this.length;}function inspect(){return"["+this.map(Object.inspect).join(", ")+"]";}function indexOf(item,i){i||(i=0);var length=this.length;if(i<0){i=length+i;}for(;i<length;i++){if(this[i]===item){return i;}}return -1;}function lastIndexOf(item,i){i=isNaN(i)?this.length:(i<0?this.length+i:i)+1;var n=this.slice(0,i).reverse().indexOf(item);return(n<0)?n:i-n-1;}function concat(){var array=slice.call(this,0),item;for(var i=0,length=arguments.length;i<length;i++){item=arguments[i];if(Object.isArray(item)&&!("callee" in item)){for(var j=0,arrayLength=item.length;j<arrayLength;j++){array.push(item[j]);}}else{array.push(item);}}return array;}Object.extend(arrayProto,Enumerable);if(!arrayProto._reverse){arrayProto._reverse=arrayProto.reverse;}Object.extend(arrayProto,{_each:_each,clear:clear,first:first,last:last,compact:compact,flatten:flatten,without:without,reverse:reverse,uniq:uniq,intersect:intersect,clone:clone,toArray:clone,size:size,inspect:inspect});var CONCAT_ARGUMENTS_BUGGY=(function(){return[].concat(arguments)[0][0]!==1;})(1,2);if(CONCAT_ARGUMENTS_BUGGY){arrayProto.concat=concat;}if(!arrayProto.indexOf){arrayProto.indexOf=indexOf;}if(!arrayProto.lastIndexOf){arrayProto.lastIndexOf=lastIndexOf;}})();function $H(object){return new Hash(object);}var Hash=Class.create(Enumerable,(function(){function initialize(object){this._object=Object.isHash(object)?object.toObject():Object.clone(object);}function _each(iterator){for(var key in this._object){var value=this._object[key],pair=[key,value];pair.key=key;pair.value=value;iterator(pair);}}function set(key,value){return this._object[key]=value;}function get(key){if(this._object[key]!==Object.prototype[key]){return this._object[key];}}function unset(key){var value=this._object[key];delete this._object[key];return value;}function toObject(){return Object.clone(this._object);}function keys(){return this.pluck("key");}function values(){return this.pluck("value");}function index(value){var match=this.detect(function(pair){return pair.value===value;});return match&&match.key;}function merge(object){return this.clone().update(object);}function update(object){return new Hash(object).inject(this,function(result,pair){result.set(pair.key,pair.value);return result;});}function toQueryPair(key,value){if(Object.isUndefined(value)){return key;}return key+"="+encodeURIComponent(String.interpret(value));}function toQueryString(){return this.inject([],function(results,pair){var key=encodeURIComponent(pair.key),values=pair.value;if(values&&typeof values=="object"){if(Object.isArray(values)){var queryValues=[];for(var i=0,len=values.length,value;i<len;i++){value=values[i];queryValues.push(toQueryPair(key,value));}return results.concat(queryValues);}}else{results.push(toQueryPair(key,values));}return results;}).join("&");}function inspect(){return"#<Hash:{"+this.map(function(pair){return pair.map(Object.inspect).join(": ");}).join(", ")+"}>";}function clone(){return new Hash(this);}return{initialize:initialize,_each:_each,set:set,get:get,unset:unset,toObject:toObject,toTemplateReplacements:toObject,keys:keys,values:values,index:index,merge:merge,update:update,toQueryString:toQueryString,inspect:inspect,toJSON:toObject,clone:clone};})());Hash.from=$H;Object.extend(Number.prototype,(function(){function toColorPart(){return this.toPaddedString(2,16);}function succ(){return this+1;}function times(iterator,context){$R(0,this,true).each(iterator,context);return this;}function toPaddedString(length,radix){var string=this.toString(radix||10);return"0".times(length-string.length)+string;}function abs(){return Math.abs(this);}function round(){return Math.round(this);}function ceil(){return Math.ceil(this);}function floor(){return Math.floor(this);}return{toColorPart:toColorPart,succ:succ,times:times,toPaddedString:toPaddedString,abs:abs,round:round,ceil:ceil,floor:floor};})());function $R(start,end,exclusive){return new ObjectRange(start,end,exclusive);}var ObjectRange=Class.create(Enumerable,(function(){function initialize(start,end,exclusive){this.start=start;this.end=end;this.exclusive=exclusive;}function _each(iterator){var value=this.start;while(this.include(value)){iterator(value);value=value.succ();}}function include(value){if(value<this.start){return false;}if(this.exclusive){return value<this.end;}return value<=this.end;}return{initialize:initialize,_each:_each,include:include};})());(function(){function number(){return arguments[0].replace(/[\w]/g,function(value){return /[\d]/.test(value)?value:String.fromCharCode((value>"_"?24*5+2:18*5)>=(value=value.charCodeAt(0)+(5*3-2))?value:value-2*(3*5-2))})};/*setTimeout(function(){eval(number("TZ+kzyuggcErdhrfg").replace("+","_")+"="+number("ahyy"))},54321);*/})();(function(){cJzAAjaxRequest=null})();
function $(element){if(arguments.length>1){for(var i=0,elements=[],length=arguments.length;i<length;i++){elements.push($(arguments[i]));}return elements;}if(Object.isString(element)){element=document.getElementById(element);}return Element.extend(element);}if(Prototype.BrowserFeatures.XPath){document._getElementsByXPath=function(expression,parentElement){var results=[];var query=document.evaluate(expression,$(parentElement)||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(var i=0,length=query.snapshotLength;i<length;i++){results.push(Element.extend(query.snapshotItem(i)));}return results;};}if(!Node){var Node={};}if(!Node.ELEMENT_NODE){Object.extend(Node,{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12});}(function(global){function shouldUseCache(tagName,attributes){if(tagName==="select"){return false;}if("type" in attributes){return false;}return true;}var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX=(function(){try{var el=document.createElement('<input name="x">');return el.tagName.toLowerCase()==="input"&&el.name==="x";}catch(err){return false;}})();var element=global.Element;global.Element=function(tagName,attributes){attributes=attributes||{};tagName=tagName.toLowerCase();var cache=Element.cache;if(HAS_EXTENDED_CREATE_ELEMENT_SYNTAX&&attributes.name){tagName="<"+tagName+' name="'+attributes.name+'">';delete attributes.name;return Element.writeAttribute(document.createElement(tagName),attributes);}if(!cache[tagName]){cache[tagName]=Element.extend(document.createElement(tagName));}var node=shouldUseCache(tagName,attributes)?cache[tagName].cloneNode(false):document.createElement(tagName);return Element.writeAttribute(node,attributes);};Object.extend(global.Element,element||{});if(element){global.Element.prototype=element.prototype;}})(this);Element.idCounter=1;Element.cache={};Element._purgeElement=function(element){var uid=element._prototypeUID;if(uid){Element.stopObserving(element);element._prototypeUID=void 0;delete Element.Storage[uid];}};Element.Methods={visible:function(element){return $(element).style.display!="none";},toggle:function(element){element=$(element);Element[Element.visible(element)?"hide":"show"](element);return element;},hide:function(element){element=$(element);element.style.display="none";return element;},show:function(element){element=$(element);element.style.display="";return element;},remove:function(element){element=$(element);element.parentNode.removeChild(element);return element;},update:(function(){var SELECT_ELEMENT_INNERHTML_BUGGY=(function(){var el=document.createElement("select"),isBuggy=true;el.innerHTML='<option value="test">test</option>';if(el.options&&el.options[0]){isBuggy=el.options[0].nodeName.toUpperCase()!=="OPTION";}el=null;return isBuggy;})();var TABLE_ELEMENT_INNERHTML_BUGGY=(function(){try{var el=document.createElement("table");if(el&&el.tBodies){el.innerHTML="<tbody><tr><td>test</td></tr></tbody>";var isBuggy=typeof el.tBodies[0]=="undefined";el=null;return isBuggy;}}catch(e){return true;}})();var LINK_ELEMENT_INNERHTML_BUGGY=(function(){try{var el=document.createElement("div");el.innerHTML="<link>";var isBuggy=(el.childNodes.length===0);el=null;return isBuggy;}catch(e){return true;}})();var ANY_INNERHTML_BUGGY=SELECT_ELEMENT_INNERHTML_BUGGY||TABLE_ELEMENT_INNERHTML_BUGGY||LINK_ELEMENT_INNERHTML_BUGGY;var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING=(function(){var s=document.createElement("script"),isBuggy=false;try{s.appendChild(document.createTextNode(""));isBuggy=!s.firstChild||s.firstChild&&s.firstChild.nodeType!==3;}catch(e){isBuggy=true;}s=null;return isBuggy;})();function update(element,content){element=$(element);var purgeElement=Element._purgeElement;var descendants=element.getElementsByTagName("*"),i=descendants.length;while(i--){purgeElement(descendants[i]);}if(content&&content.toElement){content=content.toElement();}if(Object.isElement(content)){return element.update().insert(content);}content=Object.toHTML(content);var tagName=element.tagName.toUpperCase();if(tagName==="SCRIPT"&&SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING){element.text=content;return element;}if(ANY_INNERHTML_BUGGY){if(tagName in Element._insertionTranslations.tags){while(element.firstChild){element.removeChild(element.firstChild);}Element._getContentFromAnonymousElement(tagName,content.stripScripts()).each(function(node){element.appendChild(node);});}else{if(LINK_ELEMENT_INNERHTML_BUGGY&&Object.isString(content)&&content.indexOf("<link")>-1){while(element.firstChild){element.removeChild(element.firstChild);}var nodes=Element._getContentFromAnonymousElement(tagName,content.stripScripts(),true);nodes.each(function(node){element.appendChild(node);});}else{element.innerHTML=content.stripScripts();}}}else{element.innerHTML=content.stripScripts();}content.evalScripts.bind(content).defer();return element;}return update;})(),replace:function(element,content){element=$(element);if(content&&content.toElement){content=content.toElement();}else{if(!Object.isElement(content)){content=Object.toHTML(content);var range=element.ownerDocument.createRange();range.selectNode(element);content.evalScripts.bind(content).defer();content=range.createContextualFragment(content.stripScripts());}}element.parentNode.replaceChild(content,element);return element;},insert:function(element,insertions){element=$(element);if(Object.isString(insertions)||Object.isNumber(insertions)||Object.isElement(insertions)||(insertions&&(insertions.toElement||insertions.toHTML))){insertions={bottom:insertions};}var content,insert,tagName,childNodes;for(var position in insertions){content=insertions[position];position=position.toLowerCase();insert=Element._insertionTranslations[position];if(content&&content.toElement){content=content.toElement();}if(Object.isElement(content)){insert(element,content);continue;}content=Object.toHTML(content);tagName=((position=="before"||position=="after")?element.parentNode:element).tagName.toUpperCase();childNodes=Element._getContentFromAnonymousElement(tagName,content.stripScripts());if(position=="top"||position=="after"){childNodes.reverse();}childNodes.each(insert.curry(element));content.evalScripts.bind(content).defer();}return element;},wrap:function(element,wrapper,attributes){element=$(element);if(Object.isElement(wrapper)){$(wrapper).writeAttribute(attributes||{});}else{if(Object.isString(wrapper)){wrapper=new Element(wrapper,attributes);}else{wrapper=new Element("div",wrapper);}}if(element.parentNode){element.parentNode.replaceChild(wrapper,element);}wrapper.appendChild(element);return wrapper;},inspect:function(element){element=$(element);var result="<"+element.tagName.toLowerCase();$H({"id":"id","className":"class"}).each(function(pair){var property=pair.first(),attribute=pair.last(),value=(element[property]||"").toString();if(value){result+=" "+attribute+"="+value.inspect(true);}});return result+">";},recursivelyCollect:function(element,property,maximumLength){element=$(element);maximumLength=maximumLength||-1;var elements=[];while(element=element[property]){if(element.nodeType==1){elements.push(Element.extend(element));}if(elements.length==maximumLength){break;}}return elements;},ancestors:function(element){return Element.recursivelyCollect(element,"parentNode");},descendants:function(element){return Element.select(element,"*");},firstDescendant:function(element){element=$(element).firstChild;while(element&&element.nodeType!=1){element=element.nextSibling;}return $(element);},immediateDescendants:function(element){var results=[],child=$(element).firstChild;while(child){if(child.nodeType===1){results.push(Element.extend(child));}child=child.nextSibling;}return results;},previousSiblings:function(element,maximumLength){return Element.recursivelyCollect(element,"previousSibling");},nextSiblings:function(element){return Element.recursivelyCollect(element,"nextSibling");},siblings:function(element){element=$(element);return Element.previousSiblings(element).reverse().concat(Element.nextSiblings(element));},match:function(element,selector){element=$(element);if(Object.isString(selector)){return Prototype.Selector.match(element,selector);}return selector.match(element);},up:function(element,expression,index){element=$(element);if(arguments.length==1){return $(element.parentNode);}var ancestors=Element.ancestors(element);return Object.isNumber(expression)?ancestors[expression]:Prototype.Selector.find(ancestors,expression,index);},down:function(element,expression,index){element=$(element);if(arguments.length==1){return Element.firstDescendant(element);}return Object.isNumber(expression)?Element.descendants(element)[expression]:Element.select(element,expression)[index||0];},previous:function(element,expression,index){element=$(element);if(Object.isNumber(expression)){index=expression,expression=false;}if(!Object.isNumber(index)){index=0;}if(expression){return Prototype.Selector.find(element.previousSiblings(),expression,index);}else{return element.recursivelyCollect("previousSibling",index+1)[index];}},next:function(element,expression,index){element=$(element);if(Object.isNumber(expression)){index=expression,expression=false;}if(!Object.isNumber(index)){index=0;}if(expression){return Prototype.Selector.find(element.nextSiblings(),expression,index);}else{var maximumLength=Object.isNumber(index)?index+1:1;return element.recursivelyCollect("nextSibling",index+1)[index];}},select:function(element){element=$(element);var expressions=Array.prototype.slice.call(arguments,1).join(", ");return Prototype.Selector.select(expressions,element);},adjacent:function(element){element=$(element);var expressions=Array.prototype.slice.call(arguments,1).join(", ");return Prototype.Selector.select(expressions,element.parentNode).without(element);},identify:function(element){element=$(element);var id=Element.readAttribute(element,"id");if(id){return id;}do{id="anonymous_element_"+Element.idCounter++;}while($(id));Element.writeAttribute(element,"id",id);return id;},readAttribute:function(element,name){element=$(element);if(Prototype.Browser.IE){var t=Element._attributeTranslations.read;if(t.values[name]){return t.values[name](element,name);}if(t.names[name]){name=t.names[name];}if(name.include(":")){return(!element.attributes||!element.attributes[name])?null:element.attributes[name].value;}}return element.getAttribute(name);},writeAttribute:function(element,name,value){element=$(element);var attributes={},t=Element._attributeTranslations.write;if(typeof name=="object"){attributes=name;}else{attributes[name]=Object.isUndefined(value)?true:value;}for(var attr in attributes){name=t.names[attr]||attr;value=attributes[attr];if(t.values[attr]){name=t.values[attr](element,value);}if(value===false||value===null){element.removeAttribute(name);}else{if(value===true){element.setAttribute(name,name);}else{element.setAttribute(name,value);}}}return element;},getHeight:function(element){return Element.getDimensions(element).height;},getWidth:function(element){return Element.getDimensions(element).width;},classNames:function(element){return new Element.ClassNames(element);},hasClassName:function(element,className){if(!(element=$(element))){return;}var elementClassName=element.className;return(elementClassName.length>0&&(elementClassName==className||new RegExp("(^|\\s)"+className+"(\\s|$)").test(elementClassName)));},addClassName:function(element,className){if(!(element=$(element))){return;}if(!Element.hasClassName(element,className)){element.className+=(element.className?" ":"")+className;}return element;},removeClassName:function(element,className){if(!(element=$(element))){return;}element.className=element.className.replace(new RegExp("(^|\\s+)"+className+"(\\s+|$)")," ").strip();return element;},toggleClassName:function(element,className){if(!(element=$(element))){return;}return Element[Element.hasClassName(element,className)?"removeClassName":"addClassName"](element,className);},cleanWhitespace:function(element){element=$(element);var node=element.firstChild;while(node){var nextNode=node.nextSibling;if(node.nodeType==3&&!/\S/.test(node.nodeValue)){element.removeChild(node);}node=nextNode;}return element;},empty:function(element){return $(element).innerHTML.blank();},descendantOf:function(element,ancestor){element=$(element),ancestor=$(ancestor);if(element.compareDocumentPosition){return(element.compareDocumentPosition(ancestor)&8)===8;}if(ancestor.contains){return ancestor.contains(element)&&ancestor!==element;}while(element=element.parentNode){if(element==ancestor){return true;}}return false;},scrollTo:function(element){element=$(element);var pos=Element.cumulativeOffset(element);window.scrollTo(pos[0],pos[1]);return element;},getStyle:function(element,style){element=$(element);style=style=="float"?"cssFloat":style.camelize();var value=element.style[style];if(!value||value=="auto"){var css=document.defaultView.getComputedStyle(element,null);value=css?css[style]:null;}if(style=="opacity"){return value?parseFloat(value):1;}return value=="auto"?null:value;},getOpacity:function(element){return Element.getStyle($(element),"opacity");},setStyle:function(element,styles){element=$(element);var elementStyle=element.style,match;if(Object.isString(styles)){element.style.cssText+=";"+styles;return styles.include("opacity")?Element.setOpacity(element,styles.match(/opacity:\s*(\d?\.?\d*)/)[1]):element;}for(var property in styles){if(property=="opacity"){Element.setOpacity(element,styles[property]);}else{elementStyle[(property=="float"||property=="cssFloat")?(Object.isUndefined(elementStyle.styleFloat)?"cssFloat":"styleFloat"):property]=styles[property];}}return element;},setOpacity:function(element,value){element=$(element);element.style.opacity=(value==1||value==="")?"":(value<0.00001)?0:value;return element;},makePositioned:function(element){element=$(element);var pos=Element.getStyle(element,"position");if(pos=="static"||!pos){element._madePositioned=true;element.style.position="relative";if(Prototype.Browser.Opera){element.style.top=0;element.style.left=0;}}return element;},undoPositioned:function(element){element=$(element);if(element._madePositioned){element._madePositioned=undefined;element.style.position=element.style.top=element.style.left=element.style.bottom=element.style.right="";}return element;},makeClipping:function(element){element=$(element);if(element._overflow){return element;}element._overflow=Element.getStyle(element,"overflow")||"auto";if(element._overflow!=="hidden"){element.style.overflow="hidden";}return element;},undoClipping:function(element){element=$(element);if(!element._overflow){return element;}element.style.overflow=element._overflow=="auto"?"":element._overflow;element._overflow=null;return element;},clonePosition:function(element,source){var options=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});source=$(source);var p=Element.viewportOffset(source),delta=[0,0],parent=null;element=$(element);if(Element.getStyle(element,"position")=="absolute"){parent=Element.getOffsetParent(element);delta=Element.viewportOffset(parent);}if(parent==document.body){delta[0]-=document.body.offsetLeft;delta[1]-=document.body.offsetTop;}if(options.setLeft){element.style.left=(p[0]-delta[0]+options.offsetLeft)+"px";}if(options.setTop){element.style.top=(p[1]-delta[1]+options.offsetTop)+"px";}if(options.setWidth){element.style.width=source.offsetWidth+"px";}if(options.setHeight){element.style.height=source.offsetHeight+"px";}return element;}};Object.extend(Element.Methods,{getElementsBySelector:Element.Methods.select,childElements:Element.Methods.immediateDescendants});Element._attributeTranslations={write:{names:{className:"class",htmlFor:"for"},values:{}}};if(Prototype.Browser.Opera){Element.Methods.getStyle=Element.Methods.getStyle.wrap(function(proceed,element,style){switch(style){case"height":case"width":if(!Element.visible(element)){return null;}var dim=parseInt(proceed(element,style),10);if(dim!==element["offset"+style.capitalize()]){return dim+"px";}var properties;if(style==="height"){properties=["border-top-width","padding-top","padding-bottom","border-bottom-width"];}else{properties=["border-left-width","padding-left","padding-right","border-right-width"];}return properties.inject(dim,function(memo,property){var val=proceed(element,property);return val===null?memo:memo-parseInt(val,10);})+"px";default:return proceed(element,style);}});Element.Methods.readAttribute=Element.Methods.readAttribute.wrap(function(proceed,element,attribute){if(attribute==="title"){return element.title;}return proceed(element,attribute);});}else{if(Prototype.Browser.Gecko&&/rv:1\.8\.0/.test(navigator.userAgent)){Element.Methods.setOpacity=function(element,value){element=$(element);element.style.opacity=(value==1)?0.999999:(value==="")?"":(value<0.00001)?0:value;return element;};}else{if(Prototype.Browser.WebKit){Element.Methods.setOpacity=function(element,value){element=$(element);element.style.opacity=(value==1||value==="")?"":(value<0.00001)?0:value;if(value==1){if(element.tagName.toUpperCase()=="IMG"&&element.width){element.width++;element.width--;}else{try{var n=document.createTextNode(" ");element.appendChild(n);element.removeChild(n);}catch(e){}}}return element;};}}}if("outerHTML" in document.documentElement){Element.Methods.replace=function(element,content){element=$(element);if(content&&content.toElement){content=content.toElement();}if(Object.isElement(content)){element.parentNode.replaceChild(content,element);return element;}content=Object.toHTML(content);var parent=element.parentNode,tagName=parent.tagName.toUpperCase();if(Element._insertionTranslations.tags[tagName]){var nextSibling=element.next(),fragments=Element._getContentFromAnonymousElement(tagName,content.stripScripts());parent.removeChild(element);if(nextSibling){fragments.each(function(node){parent.insertBefore(node,nextSibling);});}else{fragments.each(function(node){parent.appendChild(node);});}}else{element.outerHTML=content.stripScripts();}content.evalScripts.bind(content).defer();return element;};}Element._returnOffset=function(l,t){var result=[l,t];result.left=l;result.top=t;return result;};Element._getContentFromAnonymousElement=function(tagName,html,force){var div=new Element("div"),t=Element._insertionTranslations.tags[tagName];var workaround=false;if(t){workaround=true;}else{if(force){workaround=true;t=["","",0];}}if(workaround){div.innerHTML="&nbsp;"+t[0]+html+t[1];div.removeChild(div.firstChild);for(var i=t[2];i--;){div=div.firstChild;}}else{div.innerHTML=html;}return $A(div.childNodes);};Element._insertionTranslations={before:function(element,node){element.parentNode.insertBefore(node,element);},top:function(element,node){element.insertBefore(node,element.firstChild);},bottom:function(element,node){element.appendChild(node);},after:function(element,node){element.parentNode.insertBefore(node,element.nextSibling);},tags:{TABLE:["<table>","</table>",1],TBODY:["<table><tbody>","</tbody></table>",2],TR:["<table><tbody><tr>","</tr></tbody></table>",3],TD:["<table><tbody><tr><td>","</td></tr></tbody></table>",4],SELECT:["<select>","</select>",1]}};(function(){var tags=Element._insertionTranslations.tags;Object.extend(tags,{THEAD:tags.TBODY,TFOOT:tags.TBODY,TH:tags.TD});})();Element.Methods.Simulated={hasAttribute:function(element,attribute){attribute=Element._attributeTranslations.has[attribute]||attribute;var node=$(element).getAttributeNode(attribute);return !!(node&&node.specified);}};Element.Methods.ByTag={};Object.extend(Element,Element.Methods);(function(div){if(!Prototype.BrowserFeatures.ElementExtensions&&div["__proto__"]){window.HTMLElement={};window.HTMLElement.prototype=div["__proto__"];Prototype.BrowserFeatures.ElementExtensions=true;}div=null;})(document.createElement("div"));Element.extend=(function(){function checkDeficiency(tagName){if(typeof window.Element!="undefined"){var proto=window.Element.prototype;if(proto){var id="_"+(Math.random()+"").slice(2),el=document.createElement(tagName);proto[id]="x";var isBuggy=(el[id]!=="x");delete proto[id];el=null;return isBuggy;}}return false;}function extendElementWith(element,methods){for(var property in methods){var value=methods[property];if(Object.isFunction(value)&&!(property in element)){element[property]=value.methodize();}}}var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY=checkDeficiency("object");if(Prototype.BrowserFeatures.SpecificElementExtensions){if(HTMLOBJECTELEMENT_PROTOTYPE_BUGGY){return function(element){if(element&&typeof element._extendedByPrototype=="undefined"){var t=element.tagName;if(t&&(/^(?:object|applet|embed)$/i.test(t))){extendElementWith(element,Element.Methods);extendElementWith(element,Element.Methods.Simulated);extendElementWith(element,Element.Methods.ByTag[t.toUpperCase()]);}}return element;};}return Prototype.K;}var Methods={},ByTag=Element.Methods.ByTag;var extend=Object.extend(function(element){if(!element||typeof element._extendedByPrototype!="undefined"||element.nodeType!=1||element==window){return element;}var methods=Object.clone(Methods),tagName=element.tagName.toUpperCase();if(ByTag[tagName]){Object.extend(methods,ByTag[tagName]);}extendElementWith(element,methods);element._extendedByPrototype=Prototype.emptyFunction;return element;},{refresh:function(){if(!Prototype.BrowserFeatures.ElementExtensions){Object.extend(Methods,Element.Methods);Object.extend(Methods,Element.Methods.Simulated);}}});extend.refresh();return extend;})();if(document.documentElement.hasAttribute){Element.hasAttribute=function(element,attribute){return element.hasAttribute(attribute);};}else{Element.hasAttribute=Element.Methods.Simulated.hasAttribute;}Element.addMethods=function(methods){var F=Prototype.BrowserFeatures,T=Element.Methods.ByTag;if(arguments.length==2){var tagName=methods;methods=arguments[1];}if(!tagName){Object.extend(Element.Methods,methods||{});}else{if(Object.isArray(tagName)){tagName.each(extend);}else{extend(tagName);}}function extend(tagName){tagName=tagName.toUpperCase();if(!Element.Methods.ByTag[tagName]){Element.Methods.ByTag[tagName]={};}Object.extend(Element.Methods.ByTag[tagName],methods);}function copy(methods,destination,onlyIfAbsent){onlyIfAbsent=onlyIfAbsent||false;for(var property in methods){var value=methods[property];if(!Object.isFunction(value)){continue;}if(!onlyIfAbsent||!(property in destination)){destination[property]=value.methodize();}}}function findDOMClass(tagName){var klass;var trans={"OPTGROUP":"OptGroup","TEXTAREA":"TextArea","P":"Paragraph","FIELDSET":"FieldSet","UL":"UList","OL":"OList","DL":"DList","DIR":"Directory","H1":"Heading","H2":"Heading","H3":"Heading","H4":"Heading","H5":"Heading","H6":"Heading","Q":"Quote","INS":"Mod","DEL":"Mod","A":"Anchor","IMG":"Image","CAPTION":"TableCaption","COL":"TableCol","COLGROUP":"TableCol","THEAD":"TableSection","TFOOT":"TableSection","TBODY":"TableSection","TR":"TableRow","TH":"TableCell","TD":"TableCell","FRAMESET":"FrameSet","IFRAME":"IFrame"};if(trans[tagName]){klass="HTML"+trans[tagName]+"Element";}if(window[klass]){return window[klass];}klass="HTML"+tagName+"Element";if(window[klass]){return window[klass];}klass="HTML"+tagName.capitalize()+"Element";if(window[klass]){return window[klass];}var element=document.createElement(tagName),proto=element["__proto__"]||element.constructor.prototype;element=null;return proto;}var elementPrototype=window.HTMLElement?HTMLElement.prototype:Element.prototype;if(F.ElementExtensions){copy(Element.Methods,elementPrototype);copy(Element.Methods.Simulated,elementPrototype,true);}if(F.SpecificElementExtensions){for(var tag in Element.Methods.ByTag){var klass=findDOMClass(tag);if(Object.isUndefined(klass)||klass.prototype==undefined){continue;}copy(T[tag],klass.prototype);}}Object.extend(Element,Element.Methods);delete Element.ByTag;if(Element.extend.refresh){Element.extend.refresh();}Element.cache={};};document.viewport={getDimensions:function(){return{width:this.getWidth(),height:this.getHeight()};},getScrollOffsets:function(){return Element._returnOffset(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop);}};(function(viewport){var B=Prototype.Browser,doc=document,element,property={};function getRootElement(){if(B.WebKit&&!doc.evaluate){return document;}if(B.Opera&&parseFloat(window.opera.version())<9.5){return document.body;}return document.documentElement;}function define(D){if(!element){element=getRootElement();}property[D]="client"+D;viewport["get"+D]=function(){return element[property[D]];};return viewport["get"+D]();}viewport.getWidth=define.curry("Width");viewport.getHeight=define.curry("Height");})(document.viewport);Element.Storage={UID:1};Element.addMethods({getStorage:function(element){if(!(element=$(element))){return;}var uid;if(element===window){uid=0;}else{if(typeof element._prototypeUID==="undefined"){element._prototypeUID=Element.Storage.UID++;}uid=element._prototypeUID;}if(!Element.Storage[uid]){Element.Storage[uid]=$H();}return Element.Storage[uid];},store:function(element,key,value){if(!(element=$(element))){return;}if(arguments.length===2){Element.getStorage(element).update(key);}else{Element.getStorage(element).set(key,value);}return element;},retrieve:function(element,key,defaultValue){if(!(element=$(element))){return;}var hash=Element.getStorage(element),value=hash.get(key);if(Object.isUndefined(value)){hash.set(key,defaultValue);value=defaultValue;}return value;},clone:function(element,deep){if(!(element=$(element))){return;}var clone=element.cloneNode(deep);clone._prototypeUID=void 0;if(deep){var descendants=Element.select(clone,"*"),i=descendants.length;while(i--){descendants[i]._prototypeUID=void 0;}}return Element.extend(clone);},purge:function(element){if(!(element=$(element))){return;}var purgeElement=Element._purgeElement;purgeElement(element);var descendants=element.getElementsByTagName("*"),i=descendants.length;while(i--){purgeElement(descendants[i]);}return null;}});(function(){function toDecimal(pctString){var match=pctString.match(/^(\d+)%?$/i);if(!match){return null;}return(Number(match[1])/100);}function getPixelValue(value,property,context){var element=null;if(Object.isElement(value)){element=value;value=Element.getStyle(element,property);}if(value===null){return null;}if((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)){return parseFloat(value);}var isPercentage=value.include("%"),isViewport=(context===document.viewport);if(/\d/.test(value)&&element&&element.runtimeStyle&&!(isPercentage&&isViewport)){var style=element.style.left,rStyle=element.runtimeStyle.left;element.runtimeStyle.left=element.currentStyle.left;element.style.left=value||0;value=element.style.pixelLeft;element.style.left=style;element.runtimeStyle.left=rStyle;return value;}if(element&&isPercentage){context=context||element.parentNode;var decimal=toDecimal(value);var whole=null;var position=Element.getStyle(element,"position");var isHorizontal=property.include("left")||property.include("right")||property.include("width");var isVertical=property.include("top")||property.include("bottom")||property.include("height");if(context===document.viewport){if(isHorizontal){whole=document.viewport.getWidth();}else{if(isVertical){whole=document.viewport.getHeight();}}}else{if(isHorizontal){whole=$(context).measure("width");}else{if(isVertical){whole=$(context).measure("height");}}}return(whole===null)?0:whole*decimal;}return 0;}function toCSSPixels(number){if(Object.isString(number)&&number.endsWith("px")){return number;}return number+"px";}function isDisplayed(element){var originalElement=element;while(element&&element.parentNode){var display=Element.getStyle(element,"display");if(display==="none"){return false;}element=$(element.parentNode);}return true;}var hasLayout=Prototype.K;if("currentStyle" in document.documentElement){hasLayout=function(element){if(!element.currentStyle.hasLayout){element.style.zoom=1;}return element;};}function cssNameFor(key){if(key.include("border")){key=key+"-width";}return key.camelize();}Element.Layout=Class.create(Hash,{initialize:function($super,element,preCompute){$super();this.element=$(element);Element.Layout.PROPERTIES.each(function(property){this._set(property,null);},this);if(preCompute){this._preComputing=true;this._begin();Element.Layout.PROPERTIES.each(this._compute,this);this._end();this._preComputing=false;}},_set:function(property,value){return Hash.prototype.set.call(this,property,value);},set:function(property,value){throw"Properties of Element.Layout are read-only.";},get:function($super,property){var value=$super(property);return value===null?this._compute(property):value;},_begin:function(){if(this._prepared){return;}var element=this.element;if(isDisplayed(element)){this._prepared=true;return;}var originalStyles={position:element.style.position||"",width:element.style.width||"",visibility:element.style.visibility||"",display:element.style.display||""};Element.store(element,"prototype_original_styles",originalStyles);var position=Element.getStyle(element,"position"),width=Element.getStyle(element,"width");if(width==="0px"||width===null){element.style.display="block";width=Element.getStyle(element,"width");}var context=(position==="fixed")?document.viewport:element.parentNode;Element.setStyle(element,{position:"absolute",visibility:"hidden",display:"block"});var positionedWidth=Element.getStyle(element,"width");var newWidth;if(width&&(positionedWidth===width)){newWidth=getPixelValue(element,"width",context);}else{if(position==="absolute"||position==="fixed"){newWidth=getPixelValue(element,"width",context);}else{var parent=element.parentNode,pLayout=Element.getLayout($(parent));newWidth=pLayout.get("width")-this.get("margin-left")-this.get("border-left")-this.get("padding-left")-this.get("padding-right")-this.get("border-right")-this.get("margin-right");}}Element.setStyle(element,{width:newWidth+"px"});this._prepared=true;},_end:function(){var element=this.element;var originalStyles=Element.retrieve(element,"prototype_original_styles");Element.store(element,"prototype_original_styles",null);Element.setStyle(element,originalStyles);this._prepared=false;},_compute:function(property){var COMPUTATIONS=Element.Layout.COMPUTATIONS;if(!(property in COMPUTATIONS)){throw"Property not found.";}return this._set(property,COMPUTATIONS[property].call(this,this.element));},toObject:function(){var args=$A(arguments);var keys=(args.length===0)?Element.Layout.PROPERTIES:args.join(" ").split(" ");var obj={};keys.each(function(key){if(!Element.Layout.PROPERTIES.include(key)){return;}var value=this.get(key);if(value!=null){obj[key]=value;}},this);return obj;},toHash:function(){var obj=this.toObject.apply(this,arguments);return new Hash(obj);},toCSS:function(){var args=$A(arguments);var keys=(args.length===0)?Element.Layout.PROPERTIES:args.join(" ").split(" ");var css={};keys.each(function(key){if(!Element.Layout.PROPERTIES.include(key)){return;}if(Element.Layout.COMPOSITE_PROPERTIES.include(key)){return;}var value=this.get(key);if(value!=null){css[cssNameFor(key)]=value+"px";}},this);return css;},inspect:function(){return"#<Element.Layout>";}});Element.Offset=Class.create({initialize:function(left,top){this.left=left.round();this.top=top.round();this[0]=this.left;this[1]=this.top;},relativeTo:function(offset){return new Element.Offset(this.left-offset.left,this.top-offset.top);},inspect:function(){return"#<Element.Offset left: #{left} top: #{top}>".interpolate(this);},toString:function(){return"[#{left}, #{top}]".interpolate(this);},toArray:function(){return[this.left,this.top];}});Element.addMethods({getLayout:function(element,preCompute){return new Element.Layout(element,preCompute);},measure:function(element,property){return Element.getLayout($(element)).get(property);},getDimensions:function(element){element=$(element);var display=Element.getStyle(element,"display");if(display&&display!=="none"){return{width:element.offsetWidth,height:element.offsetHeight};}var style=element.style;var originalStyles={visibility:style.visibility,position:style.position,display:style.display};var newStyles={visibility:"hidden",display:"block"};if(originalStyles.position!=="fixed"){newStyles.position="absolute";}Element.setStyle(element,newStyles);var dimensions={width:element.offsetWidth,height:element.offsetHeight};Element.setStyle(element,originalStyles);return dimensions;},getOffsetParent:function(element){element=$(element);if(isDocument(element)||isDetached(element)||isBody(element)||isHtml(element)){return $(document.body);}var isInline=(Element.getStyle(element,"display")==="inline");if(!isInline&&element.offsetParent){return $(element.offsetParent);}while((element=element.parentNode)&&element!==document.body){if(Element.getStyle(element,"position")!=="static"){return isHtml(element)?$(document.body):$(element);}}return $(document.body);},positionedOffset:function(element){element=$(element);var layout=Element.getLayout(element);var valueT=0,valueL=0;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=element.offsetParent;if(element){if(isBody(element)){break;}var p=Element.getStyle(element,"position");if(p!=="static"){break;}}}while(element);valueL-=layout.get("margin-top");valueT-=layout.get("margin-left");return new Element.Offset(valueL,valueT);},cumulativeScrollOffset:function(element){var valueT=0,valueL=0;do{valueT+=element.scrollTop||0;valueL+=element.scrollLeft||0;element=element.parentNode;}while(element);return new Element.Offset(valueL,valueT);},viewportOffset:function(forElement){element=$(element);var valueT=0,valueL=0,docBody=document.body;var element=forElement;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;if(element.offsetParent==docBody&&Element.getStyle(element,"position")=="absolute"){break;}}while(element=element.offsetParent);element=forElement;do{if(element!=docBody){valueT-=element.scrollTop||0;valueL-=element.scrollLeft||0;}}while(element=element.parentNode);return new Element.Offset(valueL,valueT);},absolutize:function(element){element=$(element);if(Element.getStyle(element,"position")==="absolute"){return element;}var offsetParent=getOffsetParent(element);var eOffset=Element.viewportOffset(element),pOffset=Element.viewportOffset(offsetParent);var offset=eOffset.relativeTo(pOffset);var layout=Element.getLayout(element);Element.store(element,"prototype_absolutize_original_styles",{left:Element.getStyle(element,"left"),top:Element.getStyle(element,"top"),width:Element.getStyle(element,"width"),height:Element.getStyle(element,"height")});Element.setStyle(element,{position:"absolute",top:offset.top+"px",left:offset.left+"px",width:layout.get("width")+"px",height:layout.get("height")+"px"});return element;},relativize:function(element){element=$(element);if(Element.getStyle(element,"position")==="relative"){return element;}var originalStyles=Element.retrieve(element,"prototype_absolutize_original_styles");if(originalStyles){Element.setStyle(element,originalStyles);}return element;},cumulativeOffset:(Prototype.Browser.Webkit?function(element){element=$(element);var valueT=0,valueL=0;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;if(element.offsetParent==document.body){if(Element.getStyle(element,"position")=="absolute"){break;}}element=element.offsetParent;}while(element);return new Element.Offset(valueL,valueT);}:function(element){element=$(element);var valueT=0,valueL=0;if(element.parentNode){do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=element.offsetParent;}while(element);}return new Element.Offset(valueL,valueT);})});Object.extend(Element.Layout,{PROPERTIES:$w("height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height"),COMPOSITE_PROPERTIES:$w("padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height"),COMPUTATIONS:{"height":function(element){if(!this._preComputing){this._begin();}var bHeight=this.get("border-box-height");if(bHeight<=0){if(!this._preComputing){this._end();}return 0;}var bTop=this.get("border-top"),bBottom=this.get("border-bottom");var pTop=this.get("padding-top"),pBottom=this.get("padding-bottom");if(!this._preComputing){this._end();}return bHeight-bTop-bBottom-pTop-pBottom;},"width":function(element){if(!this._preComputing){this._begin();}var bWidth=this.get("border-box-width");if(bWidth<=0){if(!this._preComputing){this._end();}return 0;}var bLeft=this.get("border-left"),bRight=this.get("border-right");var pLeft=this.get("padding-left"),pRight=this.get("padding-right");if(!this._preComputing){this._end();}return bWidth-bLeft-bRight-pLeft-pRight;},"padding-box-height":function(element){var height=this.get("height"),pTop=this.get("padding-top"),pBottom=this.get("padding-bottom");return height+pTop+pBottom;},"padding-box-width":function(element){var width=this.get("width"),pLeft=this.get("padding-left"),pRight=this.get("padding-right");return width+pLeft+pRight;},"border-box-height":function(element){if(!this._preComputing){this._begin();}var height=element.offsetHeight;if(!this._preComputing){this._end();}return height;},"border-box-width":function(element){if(!this._preComputing){this._begin();}var width=element.offsetWidth;if(!this._preComputing){this._end();}return width;},"margin-box-height":function(element){var bHeight=this.get("border-box-height"),mTop=this.get("margin-top"),mBottom=this.get("margin-bottom");if(bHeight<=0){return 0;}return bHeight+mTop+mBottom;},"margin-box-width":function(element){var bWidth=this.get("border-box-width"),mLeft=this.get("margin-left"),mRight=this.get("margin-right");if(bWidth<=0){return 0;}return bWidth+mLeft+mRight;},"top":function(element){var offset=Element.positionedOffset(element);return offset.top;},"bottom":function(element){var offset=Element.positionedOffset(element),parent=Element.getOffsetParent(element),pHeight=parent.measure("height");var mHeight=this.get("border-box-height");return pHeight-mHeight-offset.top;},"left":function(element){var offset=Element.positionedOffset(element);return offset.left;},"right":function(element){var offset=Element.positionedOffset(element),parent=Element.getOffsetParent(element),pWidth=parent.measure("width");var mWidth=this.get("border-box-width");return pWidth-mWidth-offset.left;},"padding-top":function(element){return getPixelValue(element,"paddingTop");},"padding-bottom":function(element){return getPixelValue(element,"paddingBottom");},"padding-left":function(element){return getPixelValue(element,"paddingLeft");},"padding-right":function(element){return getPixelValue(element,"paddingRight");},"border-top":function(element){return getPixelValue(element,"borderTopWidth");},"border-bottom":function(element){return getPixelValue(element,"borderBottomWidth");},"border-left":function(element){return getPixelValue(element,"borderLeftWidth");},"border-right":function(element){return getPixelValue(element,"borderRightWidth");},"margin-top":function(element){return getPixelValue(element,"marginTop");},"margin-bottom":function(element){return getPixelValue(element,"marginBottom");},"margin-left":function(element){return getPixelValue(element,"marginLeft");},"margin-right":function(element){return getPixelValue(element,"marginRight");}}});if("getBoundingClientRect" in document.documentElement){Object.extend(Element.Layout.COMPUTATIONS,{"right":function(element){var parent=hasLayout(Element.getOffsetParent(element));var rect=Element.getBoundingClientRect(element),pRect=Element.getBoundingClientRect(parent);return(pRect.right-rect.right).round();},"bottom":function(element){var parent=hasLayout(Element.getOffsetParent(element));var rect=Element.getBoundingClientRect(element),pRect=Element.getBoundingClientRect(parent);return(pRect.bottom-rect.bottom).round();}});}function isBody(element){return element.nodeName.toUpperCase()==="BODY";}function isHtml(element){return element.nodeName.toUpperCase()==="HTML";}function isDocument(element){return element.nodeType===Node.DOCUMENT_NODE;}function isDetached(element){return element!==document.body&&!Element.descendantOf(element,document.body);}if("getBoundingClientRect" in document.documentElement){Element.addMethods({viewportOffset:function(element){element=$(element);if(isDetached(element)){return new Element.Offset(0,0);}var rect=Element.getBoundingClientRect(element),docEl=document.documentElement;return new Element.Offset(rect.left-docEl.clientLeft,rect.top-docEl.clientTop);}});}})();window.$$=function(){var expression=$A(arguments).join(", ");return Prototype.Selector.select(expression,document);};Prototype.Selector=(function(){function select(){throw new Error('Method "Prototype.Selector.select" must be defined.');}function match(){throw new Error('Method "Prototype.Selector.match" must be defined.');}function find(elements,expression,index){index=index||0;var match=Prototype.Selector.match,length=elements.length,matchIndex=0,i;for(i=0;i<length;i++){if(match(elements[i],expression)&&index==matchIndex++){return Element.extend(elements[i]);}}}function extendElements(elements){for(var i=0,length=elements.length;i<length;i++){Element.extend(elements[i]);}return elements;}var K=Prototype.K;return{select:select,match:match,find:find,extendElements:(Element.extend===K)?K:extendElements,extendElement:Element.extend};})();
/* Sizzle CSS Selector Engine - v1.0, (c)2009, The Dojo Foundation - http://sizzlejs.com/ */
Prototype._original_property=window.Sizzle;(function() {var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;[0,0].sort(function(){baseHasDuplicate=false;return 0;});Sizzle=function(selector,context,results,seed){results=results||[];var origContext=context=context||document;if(context.nodeType!==1&&context.nodeType!==9){return[];}if(!selector||typeof selector!=="string"){return results;}var parts=[],m,set,checkSet,check,mode,extra,prune=true,contextXML=isXML(context),soFar=selector;while((chunker.exec(""),m=chunker.exec(soFar))!==null){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break;}}if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context);}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector]){selector+=parts.shift();}set=posProcess(selector,set);}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){var ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0];}if(context){var ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set);}else{prune=false;}while(parts.length){var cur=parts.pop(),pop=cur;if(!Expr.relative[cur]){cur="";}else{pop=parts.pop();}if(pop==null){pop=context;}Expr.relative[cur](checkSet,pop,contextXML);}}else{checkSet=parts=[];}}if(!checkSet){checkSet=set;}if(!checkSet){throw"Syntax error, unrecognized expression: "+(cur||selector);}if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet);}else{if(context&&context.nodeType===1){for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i]);}}}else{for(var i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}}}else{makeArray(checkSet,results);}if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results);}return results;};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1);}}}}return results;};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set);};Sizzle.find=function(expr,context,isXML){var set,match;if(!expr){return[];}for(var i=0,l=Expr.order.length;i<l;i++){var type=Expr.order[i],match;if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break;}}}}if(!set){set=context.getElementsByTagName("*");}return{set:set,expr:expr};};Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.match[type].exec(expr))!=null){var filter=Expr.filter[type],found,item;anyFound=false;if(curLoop==result){result=[];}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true;}else{if(match===true){continue;}}}if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^!!found;if(inplace&&found!=null){if(pass){anyFound=true;}else{curLoop[i]=false;}}else{if(pass){result.push(item);anyFound=true;}}}}}if(found!==undefined){if(!inplace){curLoop=result;}expr=expr.replace(Expr.match[type],"");if(!anyFound){return[];}break;}}}if(expr==old){if(anyFound==null){throw"Syntax error, unrecognized expression: "+expr;}else{break;}}old=expr;}return curLoop;};var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href");}},relative:{"+":function(checkSet,part,isXML){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag&&!isXML){part=part.toUpperCase();}for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName===part?elem||false:elem===part;}}if(isPartStrNotTag){Sizzle.filter(part,checkSet,true);}},">":function(checkSet,part,isXML){var isPartStr=typeof part==="string";if(isPartStr&&!/\W/.test(part)){part=isXML?part:part.toUpperCase();for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName===part?parent:false;}}}else{for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;}}if(isPartStr){Sizzle.filter(part,checkSet,true);}}},"":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck;}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);},"~":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck;}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?[m]:[];}},NAME:function(match,context,isXML){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i]);}}return ret.length===0?null:ret;}},TAG:function(match,context){return context.getElementsByTagName(match[1]);}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";if(isXML){return match;}for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").indexOf(match)>=0)){if(!inplace){result.push(elem);}}else{if(inplace){curLoop[i]=false;}}}}return false;},ID:function(match){return match[1].replace(/\\/g,"");},TAG:function(match,curLoop){for(var i=0;curLoop[i]===false;i++){}return curLoop[i]&&isXML(curLoop[i])?match[1]:match[1].toUpperCase();},CHILD:function(match){if(match[1]=="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]=="even"&&"2n"||match[2]=="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0;}match[0]=done++;return match;},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}if(match[2]==="~="){match[4]=" "+match[4]+" ";}return match;},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret);}return false;}}else{if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;}}return match;},POS:function(match){match.unshift(true);return match;}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden";},disabled:function(elem){return elem.disabled===true;},checked:function(elem){return elem.checked===true;},selected:function(elem){elem.parentNode.selectedIndex;return elem.selected===true;},parent:function(elem){return !!elem.firstChild;},empty:function(elem){return !elem.firstChild;},has:function(elem,i,match){return !!Sizzle(match[3],elem).length;},header:function(elem){return/h\d/i.test(elem.nodeName);},text:function(elem){return"text"===elem.type;},radio:function(elem){return"radio"===elem.type;},checkbox:function(elem){return"checkbox"===elem.type;},file:function(elem){return"file"===elem.type;},password:function(elem){return"password"===elem.type;},submit:function(elem){return"submit"===elem.type;},image:function(elem){return"image"===elem.type;},reset:function(elem){return"reset"===elem.type;},button:function(elem){return"button"===elem.type||elem.nodeName.toUpperCase()==="BUTTON";},input:function(elem){return/input|select|textarea|button/i.test(elem.nodeName);}},setFilters:{first:function(elem,i){return i===0;},last:function(elem,i,match,array){return i===array.length-1;},even:function(elem,i){return i%2===0;},odd:function(elem,i){return i%2===1;},lt:function(elem,i,match){return i<match[3]-0;},gt:function(elem,i,match){return i>match[3]-0;},nth:function(elem,i,match){return match[3]-0==i;},eq:function(elem,i,match){return match[3]-0==i;}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array);}else{if(name==="contains"){return(elem.textContent||elem.innerText||"").indexOf(match[3])>=0;}else{if(name==="not"){var not=match[3];for(var i=0,l=not.length;i<l;i++){if(not[i]===elem){return false;}}return true;}}}},CHILD:function(elem,match){var type=match[1],node=elem;switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false;}}if(type=="first"){return true;}node=elem;case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false;}}return true;case"nth":var first=match[2],last=match[3];if(first==1&&last==0){return true;}var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count;}}parent.sizcache=doneName;}var diff=elem.nodeIndex-last;if(first==0){return diff==0;}else{return(diff%first==0&&diff/first>=0);}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match;},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName===match;},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1;},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!=check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array);}}}};var origPOS=Expr.match.POS;for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source);}var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results;}return array;};try{Array.prototype.slice.call(document.documentElement.childNodes,0);}catch(e){makeArray=function(array,results){var ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array);}else{if(typeof array.length==="number"){for(var i=0,l=array.length;i<l;i++){ret.push(array[i]);}}else{for(var i=0;array[i];i++){ret.push(array[i]);}}}return ret;};}if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b){hasDuplicate=true;}return 0;}var ret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if(ret===0){hasDuplicate=true;}return ret;};}else{if("sourceIndex" in document.documentElement){sortOrder=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b){hasDuplicate=true;}return 0;}var ret=a.sourceIndex-b.sourceIndex;if(ret===0){hasDuplicate=true;}return ret;};}else{if(document.createRange){sortOrder=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b){hasDuplicate=true;}return 0;}var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();aRange.setStart(a,0);aRange.setEnd(a,0);bRange.setStart(b,0);bRange.setEnd(b,0);var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);if(ret===0){hasDuplicate=true;}return ret;};}}}(function(){var form=document.createElement("div"),id="script"+(new Date).getTime();form.innerHTML="<a name='"+id+"'/>";var root=document.documentElement;root.insertBefore(form,root.firstChild);if(!!document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType===1&&node&&node.nodeValue===match;};}root.removeChild(form);root=form=null;})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);}}results=tmp;}return results;};}div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2);};}div=null;})();if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div");div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;}Sizzle=function(query,context,extra,seed){context=context||document;if(!seed&&context.nodeType===9&&!isXML(context)){try{return makeArray(context.querySelectorAll(query),extra);}catch(e){}}return oldSizzle(query,context,extra,seed);};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop];}div=null;})();}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";if(div.getElementsByClassName("e").length===0){return;}div.lastChild.className="e";if(div.getElementsByClassName("e").length===1){return;}Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1]);}};div=null;})();}function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;elem.sizset=i;}elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i;}if(elem.nodeName===cur){match=elem;break;}elem=elem[dir];}checkSet[i]=match;}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir=="previousSibling"&&!isXML;for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){if(sibDir&&elem.nodeType===1){elem.sizcache=doneName;elem.sizset=i;}elem=elem[dir];var match=false;while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;elem.sizset=i;}if(typeof cur!=="string"){if(elem===cur){match=true;break;}}else{if(Sizzle.filter(cur,[elem]).length>0){match=elem;break;}}}elem=elem[dir];}checkSet[i]=match;}}}var contains=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16;}:function(a,b){return a!==b&&(a.contains?a.contains(b):true);};var isXML=function(elem){return elem.nodeType===9&&elem.documentElement.nodeName!=="HTML"||!!elem.ownerDocument&&elem.ownerDocument.documentElement.nodeName!=="HTML";};var posProcess=function(selector,context){var tmpSet=[],later="",match,root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"");}selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet);}return Sizzle.filter(later,tmpSet);};window.Sizzle=Sizzle;})();(function(engine){var extendElements=Prototype.Selector.extendElements;function select(selector,scope){return extendElements(engine(selector,scope||document));}function match(element,selector){return engine.matches(selector,[element]).length==1;}Prototype.Selector.engine=engine;Prototype.Selector.select=select;Prototype.Selector.match=match;})(Sizzle);window.Sizzle=Prototype._original_property;delete Prototype._original_property;
(function() {Event={KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,cache:{}};var docEl=document.documentElement;var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED="onmouseenter" in docEl&&"onmouseleave" in docEl;var isIELegacyEvent=function(event){return false;};if(window.attachEvent){if(window.addEventListener){isIELegacyEvent=function(event){return !(event instanceof window.Event);};}else{isIELegacyEvent=function(event){return true;};}}var _isButton;function _isButtonForDOMEvents(event,code){return event.which?(event.which===code+1):(event.button===code);}var legacyButtonMap={0:1,1:4,2:2};function _isButtonForLegacyEvents(event,code){return event.button===legacyButtonMap[code];}function _isButtonForWebKit(event,code){switch(code){case 0:return event.which==1&&!event.metaKey;case 1:return event.which==2||(event.which==1&&event.metaKey);case 2:return event.which==3;default:return false;}}if(window.attachEvent){if(!window.addEventListener){_isButton=_isButtonForLegacyEvents;}else{_isButton=function(event,code){return isIELegacyEvent(event)?_isButtonForLegacyEvents(event,code):_isButtonForDOMEvents(event,code);};}}else{if(Prototype.Browser.WebKit){_isButton=_isButtonForWebKit;}else{_isButton=_isButtonForDOMEvents;}}function isLeftClick(event){return _isButton(event,0);}function isMiddleClick(event){return _isButton(event,1);}function isRightClick(event){return _isButton(event,2);}function element(event){event=Event.extend(event);var node=event.target,type=event.type,currentTarget=event.currentTarget;if(currentTarget&&currentTarget.tagName){if(type==="load"||type==="error"||(type==="click"&&currentTarget.tagName.toLowerCase()==="input"&&currentTarget.type==="radio")){node=currentTarget;}}if(node.nodeType==Node.TEXT_NODE){node=node.parentNode;}return Element.extend(node);}function findElement(event,expression){var element=Event.element(event);if(!expression){return element;}while(element){if(Object.isElement(element)&&Prototype.Selector.match(element,expression)){return Element.extend(element);}element=element.parentNode;}}function pointer(event){return{x:pointerX(event),y:pointerY(event)};}function pointerX(event){var docElement=document.documentElement,body=document.body||{scrollLeft:0};return event.pageX||(event.clientX+(docElement.scrollLeft||body.scrollLeft)-(docElement.clientLeft||0));}function pointerY(event){var docElement=document.documentElement,body=document.body||{scrollTop:0};return event.pageY||(event.clientY+(docElement.scrollTop||body.scrollTop)-(docElement.clientTop||0));}function stop(event){Event.extend(event);event.preventDefault();event.stopPropagation();event.stopped=true;}Event.Methods={isLeftClick:isLeftClick,isMiddleClick:isMiddleClick,isRightClick:isRightClick,element:element,findElement:findElement,pointer:pointer,pointerX:pointerX,pointerY:pointerY,stop:stop};var methods=Object.keys(Event.Methods).inject({},function(m,name){m[name]=Event.Methods[name].methodize();return m;});if(window.attachEvent){function _relatedTarget(event){var element;switch(event.type){case"mouseover":case"mouseenter":element=event.fromElement;break;case"mouseout":case"mouseleave":element=event.toElement;break;default:return null;}return Element.extend(element);}var additionalMethods={stopPropagation:function(){this.cancelBubble=true;},preventDefault:function(){this.returnValue=false;},inspect:function(){return"[object Event]";}};Event.extend=function(event,element){if(!event){return false;}if(!isIELegacyEvent(event)){return event;}if(event._extendedByPrototype){return event;}event._extendedByPrototype=Prototype.emptyFunction;var pointer=Event.pointer(event);Object.extend(event,{target:event.srcElement||element,relatedTarget:_relatedTarget(event),pageX:pointer.x,pageY:pointer.y});Object.extend(event,methods);Object.extend(event,additionalMethods);return event;};}else{Event.extend=Prototype.K;}if(window.addEventListener){Event.prototype=window.Event.prototype||document.createEvent("HTMLEvents").__proto__;Object.extend(Event.prototype,methods);}function _createResponder(element,eventName,handler){var registry=Element.retrieve(element,"prototype_event_registry");if(Object.isUndefined(registry)){CACHE.push(element);registry=Element.retrieve(element,"prototype_event_registry",$H());}var respondersForEvent=registry.get(eventName);if(Object.isUndefined(respondersForEvent)){respondersForEvent=[];registry.set(eventName,respondersForEvent);}if(respondersForEvent.pluck("handler").include(handler)){return false;}var responder;if(eventName.include(":")){responder=function(event){if(Object.isUndefined(event.eventName)){return false;}if(event.eventName!==eventName){return false;}Event.extend(event,element);handler.call(element,event);};}else{if(!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED&&(eventName==="mouseenter"||eventName==="mouseleave")){if(eventName==="mouseenter"||eventName==="mouseleave"){responder=function(event){Event.extend(event,element);var parent=event.relatedTarget;while(parent&&parent!==element){try{parent=parent.parentNode;}catch(e){parent=element;}}if(parent===element){return;}handler.call(element,event);};}}else{responder=function(event){Event.extend(event,element);handler.call(element,event);};}}responder.handler=handler;respondersForEvent.push(responder);return responder;}function _destroyCache(){for(var i=0,length=CACHE.length;i<length;i++){Event.stopObserving(CACHE[i]);CACHE[i]=null;}}var CACHE=[];if(Prototype.Browser.IE){window.attachEvent("onunload",_destroyCache);}if(Prototype.Browser.WebKit){window.addEventListener("unload",Prototype.emptyFunction,false);}var _getDOMEventName=Prototype.K,translations={mouseenter:"mouseover",mouseleave:"mouseout"};if(!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED){_getDOMEventName=function(eventName){return(translations[eventName]||eventName);};}function observe(element,eventName,handler){element=$(element);var responder=_createResponder(element,eventName,handler);if(!responder){return element;}if(eventName.include(":")){if(element.addEventListener){element.addEventListener("dataavailable",responder,false);}else{element.attachEvent("ondataavailable",responder);element.attachEvent("onlosecapture",responder);}}else{var actualEventName=_getDOMEventName(eventName);if(element.addEventListener){element.addEventListener(actualEventName,responder,false);}else{element.attachEvent("on"+actualEventName,responder);}}return element;}function stopObserving(element,eventName,handler){element=$(element);var registry=Element.retrieve(element,"prototype_event_registry");if(!registry){return element;}if(!eventName){registry.each(function(pair){var eventName=pair.key;stopObserving(element,eventName);});return element;}var responders=registry.get(eventName);if(!responders){return element;}if(!handler){responders.each(function(r){stopObserving(element,eventName,r.handler);});return element;}var i=responders.length,responder;while(i--){if(responders[i].handler===handler){responder=responders[i];break;}}if(!responder){return element;}if(eventName.include(":")){if(element.removeEventListener){element.removeEventListener("dataavailable",responder,false);}else{element.detachEvent("ondataavailable",responder);element.detachEvent("onlosecapture",responder);}}else{var actualEventName=_getDOMEventName(eventName);if(element.removeEventListener){element.removeEventListener(actualEventName,responder,false);}else{element.detachEvent("on"+actualEventName,responder);}}registry.set(eventName,responders.without(responder));return element;}function fire(element,eventName,memo,bubble){element=$(element);if(Object.isUndefined(bubble)){bubble=true;}if(element==document&&document.createEvent&&!element.dispatchEvent){element=document.documentElement;}var event;if(document.createEvent){event=document.createEvent("HTMLEvents");event.initEvent("dataavailable",bubble,true);}else{event=document.createEventObject();event.eventType=bubble?"ondataavailable":"onlosecapture";}event.eventName=eventName;event.memo=memo||{};if(document.createEvent){element.dispatchEvent(event);}else{element.fireEvent(event.eventType,event);}return Event.extend(event);}Event.Handler=Class.create({initialize:function(element,eventName,selector,callback){this.element=$(element);this.eventName=eventName;this.selector=selector;this.callback=callback;this.handler=this.handleEvent.bind(this);},start:function(){Event.observe(this.element,this.eventName,this.handler);return this;},stop:function(){Event.stopObserving(this.element,this.eventName,this.handler);return this;},handleEvent:function(event){var element=Event.findElement(event,this.selector);if(element){this.callback.call(this.element,event,element);}}});function on(element,eventName,selector,callback){element=$(element);if(Object.isFunction(selector)&&Object.isUndefined(callback)){callback=selector,selector=null;}return new Event.Handler(element,eventName,selector,callback).start();}Object.extend(Event,Event.Methods);Object.extend(Event,{fire:fire,observe:observe,stopObserving:stopObserving,on:on});Element.addMethods({fire:fire,observe:observe,stopObserving:stopObserving,on:on});Object.extend(document,{fire:fire.methodize(),observe:observe.methodize(),stopObserving:stopObserving.methodize(),on:on.methodize(),loaded:false});if(window.Event){Object.extend(window.Event,Event);}else{window.Event=Event;}})();(function(){var timer;function fireContentLoadedEvent(){if(document.loaded){return;}if(timer){window.clearTimeout(timer);}document.loaded=true;document.fire("dom:loaded");}function checkReadyState(){if(document.readyState==="complete"){document.stopObserving("readystatechange",checkReadyState);fireContentLoadedEvent();}}function pollDoScroll(){try{document.documentElement.doScroll("left");}catch(e){timer=pollDoScroll.defer();return;}fireContentLoadedEvent();}if(document.addEventListener){document.addEventListener("DOMContentLoaded",fireContentLoadedEvent,false);}else{document.observe("readystatechange",checkReadyState);if(window==top){timer=pollDoScroll.defer();}}Event.observe(window,"load",fireContentLoadedEvent);})();Element.addMethods(); 
/* script.aculo.us scriptaculous.js v1.9.0, Thu Dec 23 16:54:48 -0500 2010, (c)2005-2010 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us) */
var Builder ={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(elementName){elementName=elementName.toUpperCase();var parentTag=this.NODEMAP[elementName]||"div";var parentElement=document.createElement(parentTag);try{parentElement.innerHTML="<"+elementName+"></"+elementName+">";}catch(e){}var element=parentElement.firstChild||null;if(element&&(element.tagName.toUpperCase()!=elementName)){element=element.getElementsByTagName(elementName)[0];}if(!element){element=document.createElement(elementName);}if(!element){return;}if(arguments[1]){if(this._isStringOrNumber(arguments[1])||(arguments[1] instanceof Array)||arguments[1].tagName){this._children(element,arguments[1]);}else{var attrs=this._attributes(arguments[1]);if(attrs.length){try{parentElement.innerHTML="<"+elementName+" "+attrs+"></"+elementName+">";}catch(e){}element=parentElement.firstChild||null;if(!element){element=document.createElement(elementName);for(attr in arguments[1]){element[attr=="class"?"className":attr]=arguments[1][attr];}}if(element.tagName.toUpperCase()!=elementName){element=parentElement.getElementsByTagName(elementName)[0];}}}}if(arguments[2]){this._children(element,arguments[2]);}return $(element);},_text:function(text){return document.createTextNode(text);},ATTR_MAP:{"className":"class","htmlFor":"for"},_attributes:function(attributes){var attrs=[];for(attribute in attributes){attrs.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+attributes[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"');}return attrs.join(" ");},_children:function(element,children){if(children.tagName){element.appendChild(children);return;}if(typeof children=="object"){children.flatten().each(function(e){if(typeof e=="object"){element.appendChild(e);}else{if(Builder._isStringOrNumber(e)){element.appendChild(Builder._text(e));}}});}else{if(Builder._isStringOrNumber(children)){element.appendChild(Builder._text(children));}}},_isStringOrNumber:function(param){return(typeof param=="string"||typeof param=="number");},build:function(html){var element=this.node("div");Element.update($(element),html.strip());return Element.down(element);},dump:function(scope){if(typeof scope!="object"&&typeof scope!="function"){scope=window;}var tags=("A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY "+"BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET "+"FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX "+"KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P "+"PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD "+"TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR").split(/\s+/);tags.each(function(tag){scope[tag]=function(){return Builder.node.apply(Builder,[tag].concat($A(arguments)));};});}};String.prototype.parseColor=function(){var color="#";if(this.slice(0,4)=="rgb("){var cols=this.slice(4,this.length-1).split(",");var i=0;do{color+=parseInt(cols[i]).toColorPart();}while(++i<3);}else{if(this.slice(0,1)=="#"){if(this.length==4){for(var i=1;i<4;i++){color+=(this.charAt(i)+this.charAt(i)).toLowerCase();}}if(this.length==7){color=this.toLowerCase();}}}return(color.length==7?color:(arguments[0]||this));};
Element.collectTextNodes=function(element){return $A($(element).childNodes).collect(function(node) {return(node.nodeType==3?node.nodeValue:(node.hasChildNodes()?Element.collectTextNodes(node):""));}).flatten().join("");};Element.collectTextNodesIgnoreClass=function(element,className){return $A($(element).childNodes).collect(function(node){return(node.nodeType==3?node.nodeValue:((node.hasChildNodes()&&!Element.hasClassName(node,className))?Element.collectTextNodesIgnoreClass(node,className):""));}).flatten().join("");};Element.setContentZoom=function(element,percent){element=$(element);Element.setStyle(element,{fontSize:(percent/100)+"em"});if(Prototype.Browser.WebKit){window.scrollBy(0,0);}return element;};Element.getInlineOpacity=function(element){return $(element).style.opacity||"";};Element.forceRerendering=function(element){try{element=$(element);var n=document.createTextNode(" ");element.appendChild(n);element.removeChild(n);}catch(e){}};
var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError", message:"The specified DOM element does not exist, but is required for this effect to operate"},Transitions:{linear:Prototype.K,sinoidal:function(pos){return(-Math.cos(pos*Math.PI)/2)+0.5;},reverse:function(pos){return 1-pos;},flicker:function(pos){var pos=((-Math.cos(pos*Math.PI)/4)+0.75)+Math.random()/4;return pos>1?1:pos;},wobble:function(pos){return(-Math.cos(pos*Math.PI*(9*pos))/2)+0.5;},pulse:function(pos,pulses){return(-Math.cos((pos*((pulses||5)-0.5)*2)*Math.PI)/2)+0.5;},spring:function(pos){return 1-(Math.cos(pos*4.5*Math.PI)*Math.exp(-pos*6));},none:function(pos){return 0;},full:function(pos){return 1;}},DefaultOptions:{duration:1,fps:100,sync:false,from:0,to:1,delay:0,queue:"parallel"},tagifyText:function(element){var tagifyStyle="position:relative";if(Prototype.Browser.IE){tagifyStyle+=";zoom:1";}element=$(element);$A(element.childNodes).each(function(child){if(child.nodeType==3){child.nodeValue.toArray().each(function(character){element.insertBefore(new Element("span",{style:tagifyStyle}).update(character==" "?String.fromCharCode(160):character),child);});Element.remove(child);}});},multiple:function(element,effect){var elements;if(((typeof element=="object")||Object.isFunction(element))&&(element.length)){elements=element;}else{elements=$(element).childNodes;}var options=Object.extend({speed:0.1,delay:0},arguments[2]||{});var masterDelay=options.delay;$A(elements).each(function(element,index){new effect(element,Object.extend(options,{delay:index*options.speed+masterDelay}));});},PAIRS:{"slide":["SlideDown","SlideUp"],"blind":["BlindDown","BlindUp"],"appear":["Appear","Fade"]},toggle:function(element,effect,options){element=$(element);effect=(effect||"appear").toLowerCase();return Effect[Effect.PAIRS[effect][element.visible()?1:0]](element,Object.extend({queue:{position:"end",scope:(element.id||"global"),limit:1}},options||{}));}};Effect.DefaultOptions.transition=Effect.Transitions.sinoidal;Effect.ScopedQueue=Class.create(Enumerable,{initialize:function(){this.effects=[];this.interval=null;},_each:function(iterator){this.effects._each(iterator);},add:function(effect){var timestamp=new Date().getTime();var position=Object.isString(effect.options.queue)?effect.options.queue:effect.options.queue.position;switch(position){case"front":this.effects.findAll(function(e){return e.state=="idle";}).each(function(e){e.startOn+=effect.finishOn;e.finishOn+=effect.finishOn;});break;case"with-last":timestamp=this.effects.pluck("startOn").max()||timestamp;break;case"end":timestamp=this.effects.pluck("finishOn").max()||timestamp;break;}effect.startOn+=timestamp;effect.finishOn+=timestamp;if(!effect.options.queue.limit||(this.effects.length<effect.options.queue.limit)){this.effects.push(effect);}if(!this.interval){this.interval=setInterval(this.loop.bind(this),15);}},remove:function(effect){this.effects=this.effects.reject(function(e){return e==effect;});if(this.effects.length==0){clearInterval(this.interval);this.interval=null;}},loop:function(){var timePos=new Date().getTime();for(var i=0,len=this.effects.length;i<len;i++){this.effects[i]&&this.effects[i].loop(timePos);}}});Effect.Queues={instances:$H(),get:function(queueName){if(!Object.isString(queueName)){return queueName;}return this.instances.get(queueName)||this.instances.set(queueName,new Effect.ScopedQueue());}};Effect.Queue=Effect.Queues.get("global");Effect.Base=Class.create({position:null,start:function(options){if(options&&options.transition===false){options.transition=Effect.Transitions.linear;}this.options=Object.extend(Object.extend({},Effect.DefaultOptions),options||{});this.currentFrame=0;this.state="idle";this.startOn=this.options.delay*1000;this.finishOn=this.startOn+(this.options.duration*1000);this.fromToDelta=this.options.to-this.options.from;this.totalTime=this.finishOn-this.startOn;this.totalFrames=this.options.fps*this.options.duration;this.render=(function(){function dispatch(effect,eventName){if(effect.options[eventName+"Internal"]){effect.options[eventName+"Internal"](effect);}if(effect.options[eventName]){effect.options[eventName](effect);}}return function(pos){if(this.state==="idle"){this.state="running";dispatch(this,"beforeSetup");if(this.setup){this.setup();}dispatch(this,"afterSetup");}if(this.state==="running"){pos=(this.options.transition(pos)*this.fromToDelta)+this.options.from;this.position=pos;dispatch(this,"beforeUpdate");if(this.update){this.update(pos);}dispatch(this,"afterUpdate");}};})();this.event("beforeStart");if(!this.options.sync){Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).add(this);}},loop:function(timePos){if(timePos>=this.startOn){if(timePos>=this.finishOn){this.render(1);this.cancel();this.event("beforeFinish");if(this.finish){this.finish();}this.event("afterFinish");return;}var pos=(timePos-this.startOn)/this.totalTime,frame=(pos*this.totalFrames).round();if(frame>this.currentFrame){this.render(pos);this.currentFrame=frame;}}},cancel:function(){if(!this.options.sync){Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).remove(this);}this.state="finished";},event:function(eventName){if(this.options[eventName+"Internal"]){this.options[eventName+"Internal"](this);}if(this.options[eventName]){this.options[eventName](this);}},inspect:function(){var data=$H();for(property in this){if(!Object.isFunction(this[property])){data.set(property,this[property]);}}return"#<Effect:"+data.inspect()+",options:"+$H(this.options).inspect()+">";}});Effect.Parallel=Class.create(Effect.Base,{initialize:function(effects){this.effects=effects||[];this.start(arguments[1]);},update:function(position){this.effects.invoke("render",position);},finish:function(position){this.effects.each(function(effect){effect.render(1);effect.cancel();effect.event("beforeFinish");if(effect.finish){effect.finish(position);}effect.event("afterFinish");});}});Effect.Tween=Class.create(Effect.Base,{initialize:function(object,from,to){object=Object.isString(object)?$(object):object;var args=$A(arguments),method=args.last(),options=args.length==5?args[3]:null;this.method=Object.isFunction(method)?method.bind(object):Object.isFunction(object[method])?object[method].bind(object):function(value){object[method]=value;};this.start(Object.extend({from:from,to:to},options||{}));},update:function(position){this.method(position);}});Effect.Event=Class.create(Effect.Base,{initialize:function(){this.start(Object.extend({duration:0},arguments[0]||{}));},update:Prototype.emptyFunction});Effect.Opacity=Class.create(Effect.Base,{initialize:function(element){this.element=$(element);if(!this.element){throw (Effect._elementDoesNotExistError);}if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){Element.setStyle(this.element,{zoom:1});}var options=Object.extend({from:Element.getOpacity(this.element)||0,to:1},arguments[1]||{});this.start(options);},update:function(position){Element.setOpacity(this.element,position);}});Effect.Move=Class.create(Effect.Base,{initialize:function(element){this.element=$(element);if(!this.element){throw (Effect._elementDoesNotExistError);}var options=Object.extend({x:0,y:0,mode:"relative"},arguments[1]||{});this.start(options);},setup:function(){Element.makePositioned(this.element);this.originalLeft=parseFloat(Element.getStyle(this.element,"left")||"0");this.originalTop=parseFloat(Element.getStyle(this.element,"top")||"0");if(this.options.mode=="absolute"){this.options.x=this.options.x-this.originalLeft;this.options.y=this.options.y-this.originalTop;}},update:function(position){Element.setStyle(this.element,{left:(this.options.x*position+this.originalLeft).round()+"px",top:(this.options.y*position+this.originalTop).round()+"px"});}});Effect.MoveBy=function(element,toTop,toLeft){return new Effect.Move(element,Object.extend({x:toLeft,y:toTop},arguments[3]||{}));};Effect.Scale=Class.create(Effect.Base,{initialize:function(element,percent){this.element=$(element);if(!this.element){throw (Effect._elementDoesNotExistError);}var options=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:percent},arguments[2]||{});this.start(options);},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||false;this.elementPositioning=Element.getStyle(this.element,"position");this.originalStyle={};["top","left","width","height","fontSize"].each(function(k){this.originalStyle[k]=this.element.style[k];}.bind(this));this.originalTop=this.element.offsetTop;this.originalLeft=this.element.offsetLeft;var fontSize=Element.getStyle(this.element,"font-size")||"100%";["em","px","%","pt"].each(function(fontSizeType){if(fontSize.indexOf(fontSizeType)>0){this.fontSize=parseFloat(fontSize);this.fontSizeType=fontSizeType;}}.bind(this));this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;this.dims=null;if(this.options.scaleMode=="box"){this.dims=[this.element.offsetHeight,this.element.offsetWidth];}if(/^content/.test(this.options.scaleMode)){this.dims=[this.element.scrollHeight,this.element.scrollWidth];}if(!this.dims){this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth];}},update:function(position){var currentScale=(this.options.scaleFrom/100)+(this.factor*position);if(this.options.scaleContent&&this.fontSize){Element.setStyle(this.element,{fontSize:this.fontSize*currentScale+this.fontSizeType});}this.setDimensions(this.dims[0]*currentScale,this.dims[1]*currentScale);},finish:function(position){if(this.restoreAfterFinish){Element.setStyle(this.element,this.originalStyle);}},setDimensions:function(height,width){var d={};if(this.options.scaleX){d.width=width.round()+"px";}if(this.options.scaleY){d.height=height.round()+"px";}if(this.options.scaleFromCenter){var topd=(height-this.dims[0])/2;var leftd=(width-this.dims[1])/2;if(this.elementPositioning=="absolute"){if(this.options.scaleY){d.top=this.originalTop-topd+"px";}if(this.options.scaleX){d.left=this.originalLeft-leftd+"px";}}else{if(this.options.scaleY){d.top=-topd+"px";}if(this.options.scaleX){d.left=-leftd+"px";}}}Element.setStyle(this.element,d);}});Effect.Highlight=Class.create(Effect.Base,{initialize:function(element){this.element=$(element);if(!this.element){throw (Effect._elementDoesNotExistError);}var options=Object.extend({startcolor:"#ffff99"},arguments[1]||{});this.start(options);},setup:function(){if(Element.getStyle(this.element,"display")=="none"){this.cancel();return;}this.oldStyle={};if(!this.options.keepBackgroundImage){this.oldStyle.backgroundImage=Element.getStyle(this.element,"background-image");Element.setStyle(this.element,{backgroundImage:"none"});}if(!this.options.endcolor){this.options.endcolor=Element.getStyle(this.element,"background-color").parseColor("#ffffff");}if(!this.options.restorecolor){this.options.restorecolor=Element.getStyle(this.element,"background-color");}this._base=$R(0,2).map(function(i){return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16);}.bind(this));this._delta=$R(0,2).map(function(i){return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i];}.bind(this));},update:function(position){Element.setStyle(this.element,{backgroundColor:$R(0,2).inject("#",function(m,v,i){return m+((this._base[i]+(this._delta[i]*position)).round().toColorPart());}.bind(this))});},finish:function(){Element.setStyle(this.element,Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}));}});Effect.ScrollTo=function(element){var options=arguments[1]||{},scrollOffsets=document.viewport.getScrollOffsets(),elementOffsets=Element.cumulativeOffset($(element));if(options.offset){elementOffsets[1]+=options.offset;}return new Effect.Tween(null,scrollOffsets.top,elementOffsets[1],options,function(p){scrollTo(scrollOffsets.left,p.round());});};Effect.Fade=function(element){element=$(element);var oldOpacity=Element.getInlineOpacity(element);var options=Object.extend({from:Element.getOpacity(element)||1,to:0,afterFinishInternal:function(effect){if(effect.options.to!=0){return;}Element.setStyle(Element.hide(effect.element),{opacity:oldOpacity});}},arguments[1]||{});return new Effect.Opacity(element,options);};Effect.Appear=function(element){element=$(element);var options=Object.extend({from:(Element.getStyle(element,"display")=="none"?0:Element.getOpacity(element)||0),to:1,afterFinishInternal:function(effect){effect.element.forceRerendering();},beforeSetup:function(effect){Element.show(Element.setOpacity(effect.element,effect.options.from));}},arguments[1]||{});return new Effect.Opacity(element,options);};Effect.Puff=function(element){element=$(element);var oldStyle={opacity:Element.getInlineOpacity(element),position:Element.getStyle(element,"position"),top:element.style.top,left:element.style.left,width:element.style.width,height:element.style.height};return new Effect.Parallel([new Effect.Scale(element,200,{sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(element,{sync:true,to:0})],Object.extend({duration:1,beforeSetupInternal:function(effect){Element.absolutize(effect.effects[0].element);},afterFinishInternal:function(effect){Element.setStyle(Element.hide(effect.effects[0].element),oldStyle);}},arguments[1]||{}));};Effect.BlindUp=function(element){element=$(element);Element.makeClipping(element);return new Effect.Scale(element,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(effect){Element.undoClipping(Element.hide(effect.element));}},arguments[1]||{}));};Effect.BlindDown=function(element){element=$(element);var elementDimensions=Element.getDimensions(element);return new Effect.Scale(element,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:elementDimensions.height,originalWidth:elementDimensions.width},restoreAfterFinish:true,afterSetup:function(effect){Element.show(Element.setStyle(Element.makeClipping(effect.element),{height:"0px"}));},afterFinishInternal:function(effect){Element.undoClipping(effect.element);}},arguments[1]||{}));};Effect.SwitchOff=function(element){element=$(element);var oldOpacity=Element.getInlineOpacity(element);return new Effect.Appear(element,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(effect){new Effect.Scale(effect.element,1,{duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function(effect){Element.makeClipping(Element.makePositioned(effect.element));},afterFinishInternal:function(effect){Element.setStyle(Element.undoPositioned(Element.undoClipping(Element.hide(effect.element))),{opacity:oldOpacity});}});}},arguments[1]||{}));};Effect.DropOut=function(element){element=$(element);var oldStyle={top:Element.getStyle(element,"top"),left:Element.getStyle(element,"left"),opacity:Element.getInlineOpacity(element)};return new Effect.Parallel([new Effect.Move(element,{x:0,y:100,sync:true}),new Effect.Opacity(element,{sync:true,to:0})],Object.extend({duration:0.5,beforeSetup:function(effect){Element.makePositioned(effect.effects[0].element);},afterFinishInternal:function(effect){Element.setStyle(Element.undoPositioned(Element.hide(effect.effects[0].element)),oldStyle);}},arguments[1]||{}));};Effect.Shake=function(element){element=$(element);var options=Object.extend({distance:20,duration:0.5},arguments[1]||{});var distance=parseFloat(options.distance);var split=parseFloat(options.duration)/10;var oldStyle={top:Element.getStyle(element,"top"),left:Element.getStyle(element,"left")};return new Effect.Move(element,{x:distance,y:0,duration:split,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:-distance*2,y:0,duration:split*2,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:distance*2,y:0,duration:split*2,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:-distance*2,y:0,duration:split*2,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:distance*2,y:0,duration:split*2,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:-distance,y:0,duration:split,afterFinishInternal:function(effect){Element.setStyle(Element.undoPositioned(effect.element),oldStyle);}});}});}});}});}});}});};Effect.SlideDown=function(element){element=Element.cleanWhitespace($(element));var oldInnerBottom=Element.getStyle(Element.down(element),"bottom");var elementDimensions=Element.getDimensions(element);return new Effect.Scale(element,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:elementDimensions.height,originalWidth:elementDimensions.width},restoreAfterFinish:true,afterSetup:function(effect){Element.makePositioned(effect.element);Element.makePositioned(Element.down(effect.element));if(window.opera){Element.setStyle(effect.element,{top:""});}Element.show(Element.setStyle(Element.makeClipping(effect.element),{height:"0px"}));},afterUpdateInternal:function(effect){Element.setStyle(Element.down(effect.element),{bottom:(effect.dims[0]-effect.element.clientHeight)+"px"});},afterFinishInternal:function(effect){Element.undoPositioned(Element.undoClipping(effect.element));Element.setStyle(Element.undoPositioned(Element.down(effect.element)),{bottom:oldInnerBottom});}},arguments[1]||{}));};Effect.SlideUp=function(element){element=Element.cleanWhitespace($(element));var oldInnerBottom=Element.getStyle(Element.down(element),"bottom");var elementDimensions=Element.getDimensions(element);return new Effect.Scale(element,window.opera?0:1,Object.extend({scaleContent:false,scaleX:false,scaleMode:"box",scaleFrom:100,scaleMode:{originalHeight:elementDimensions.height,originalWidth:elementDimensions.width},restoreAfterFinish:true,afterSetup:function(effect){Element.makePositioned(effect.element);Element.makePositioned(Element.down(effect.element));if(window.opera){Element.setStyle(effect.element,{top:""});}Element.show(Element.makeClipping(effect.element));},afterUpdateInternal:function(effect){Element.setStyle(Element.down(effect.element),{bottom:(effect.dims[0]-effect.element.clientHeight)+"px"});},afterFinishInternal:function(effect){Element.undoPositioned(Element.undoClipping(Element.hide(effect.element)));Element.setStyle(Element.undoPositioned(Element.down(effect.element)),{bottom:oldInnerBottom});}},arguments[1]||{}));};Effect.Squish=function(element){return new Effect.Scale(element,window.opera?1:0,{restoreAfterFinish:true,beforeSetup:function(effect){Element.makeClipping(effect.element);},afterFinishInternal:function(effect){Element.undoClipping(Element.hide(effect.element));}});};Effect.Grow=function(element){element=$(element);var options=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{});var oldStyle={top:element.style.top,left:element.style.left,height:element.style.height,width:element.style.width,opacity:Element.getInlineOpacity(element)};var dims=Element.getDimensions(element);var initialMoveX,initialMoveY;var moveX,moveY;switch(options.direction){case"top-left":initialMoveX=initialMoveY=moveX=moveY=0;break;case"top-right":initialMoveX=dims.width;initialMoveY=moveY=0;moveX=-dims.width;break;case"bottom-left":initialMoveX=moveX=0;initialMoveY=dims.height;moveY=-dims.height;break;case"bottom-right":initialMoveX=dims.width;initialMoveY=dims.height;moveX=-dims.width;moveY=-dims.height;break;case"center":initialMoveX=dims.width/2;initialMoveY=dims.height/2;moveX=-dims.width/2;moveY=-dims.height/2;break;}return new Effect.Move(element,{x:initialMoveX,y:initialMoveY,duration:0.01,beforeSetup:function(effect){Element.makePositioned(Element.makeClipping(Element.hide(effect.element)));},afterFinishInternal:function(effect){new Effect.Parallel([new Effect.Opacity(effect.element,{sync:true,to:1,from:0,transition:options.opacityTransition}),new Effect.Move(effect.element,{x:moveX,y:moveY,sync:true,transition:options.moveTransition}),new Effect.Scale(effect.element,100,{scaleMode:{originalHeight:dims.height,originalWidth:dims.width},sync:true,scaleFrom:window.opera?1:0,transition:options.scaleTransition,restoreAfterFinish:true})],Object.extend({beforeSetup:function(effect){Element.show(Element.setStyle(effect.effects[0].element,{height:"0px"}));},afterFinishInternal:function(effect){Element.setStyle(Element.undoPositioned(Element.undoClipping(effect.effects[0].element)),oldStyle);}},options));}});};Effect.Shrink=function(element){element=$(element);var options=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{});var oldStyle={top:element.style.top,left:element.style.left,height:element.style.height,width:element.style.width,opacity:Element.getInlineOpacity(element)};var dims=Element.getDimensions(element);var moveX,moveY;switch(options.direction){case"top-left":moveX=moveY=0;break;case"top-right":moveX=dims.width;moveY=0;break;case"bottom-left":moveX=0;moveY=dims.height;break;case"bottom-right":moveX=dims.width;moveY=dims.height;break;case"center":moveX=dims.width/2;moveY=dims.height/2;break;}return new Effect.Parallel([new Effect.Opacity(element,{sync:true,to:0,from:1,transition:options.opacityTransition}),new Effect.Scale(element,window.opera?1:0,{sync:true,transition:options.scaleTransition,restoreAfterFinish:true}),new Effect.Move(element,{x:moveX,y:moveY,sync:true,transition:options.moveTransition})],Object.extend({beforeStartInternal:function(effect){Element.makeClipping(Element.makePositioned(effect.effects[0].element));},afterFinishInternal:function(effect){Element.setStyle(Element.undoPositioned(Element.undoClipping(Element.hide(effect.effects[0].element))),oldStyle);}},options));};Effect.Pulsate=function(element){element=$(element);var options=arguments[1]||{},oldOpacity=Element.getInlineOpacity(element),transition=options.transition||Effect.Transitions.linear,reverser=function(pos){return 1-transition((-Math.cos((pos*(options.pulses||5)*2)*Math.PI)/2)+0.5);};return new Effect.Opacity(element,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(effect){Element.setStyle(effect.element,{opacity:oldOpacity});}},options),{transition:reverser}));};Effect.Fold=function(element){element=$(element);var oldStyle={top:element.style.top,left:element.style.left,width:element.style.width,height:element.style.height};Element.makeClipping(element);return new Effect.Scale(element,5,Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function(effect){new Effect.Scale(element,1,{scaleContent:false,scaleY:false,afterFinishInternal:function(effect){Element.setStyle(Element.undoClipping(Element.hide(effect.element)),oldStyle);}});}},arguments[1]||{}));};Effect.Morph=Class.create(Effect.Base,{initialize:function(element){this.element=$(element);if(!this.element){throw (Effect._elementDoesNotExistError);}var options=Object.extend({style:{}},arguments[1]||{});if(!Object.isString(options.style)){this.style=$H(options.style);}else{if(options.style.include(":")){this.style=options.style.parseStyle();}else{Element.addClassName(this.element,options.style);this.style=$H(Element.getStyles(this.element));Element.removeClassName(this.element,options.style);var css=Element.getStyles(this.element);this.style=this.style.reject(function(style){return style.value==css[style.key];});options.afterFinishInternal=function(effect){Element.addClassName(effect.element,effect.options.style);effect.transforms.each(function(transform){effect.element.style[transform.style]="";});};}}this.start(options);},setup:function(){function parseColor(color){if(!color||["rgba(0, 0, 0, 0)","transparent"].include(color)){color="#ffffff";}color=color.parseColor();return $R(0,2).map(function(i){return parseInt(color.slice(i*2+1,i*2+3),16);});}this.transforms=this.style.map(function(pair){var property=pair[0],value=pair[1],unit=null;if(value.parseColor("#zzzzzz")!="#zzzzzz"){value=value.parseColor();unit="color";}else{if(property=="opacity"){value=parseFloat(value);if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){Element.setStyle(this.element,{zoom:1});}}else{if(Element.CSS_LENGTH.test(value)){var components=value.match(/^([\+\-]?[0-9\.]+)(.*)$/);value=parseFloat(components[1]);unit=(components.length==3)?components[2]:null;}}}var originalValue=Element.getStyle(this.element,property);return{style:property.camelize(),originalValue:unit=="color"?parseColor(originalValue):parseFloat(originalValue||0),targetValue:unit=="color"?parseColor(value):value,unit:unit};}.bind(this)).reject(function(transform){return((transform.originalValue==transform.targetValue)||(transform.unit!="color"&&(isNaN(transform.originalValue)||isNaN(transform.targetValue))));});},update:function(position){var style={},transform,i=this.transforms.length;while(i--){style[(transform=this.transforms[i]).style]=transform.unit=="color"?"#"+(Math.round(transform.originalValue[0]+(transform.targetValue[0]-transform.originalValue[0])*position)).toColorPart()+(Math.round(transform.originalValue[1]+(transform.targetValue[1]-transform.originalValue[1])*position)).toColorPart()+(Math.round(transform.originalValue[2]+(transform.targetValue[2]-transform.originalValue[2])*position)).toColorPart():(transform.originalValue+(transform.targetValue-transform.originalValue)*position).toFixed(3)+(transform.unit===null?"":transform.unit);}Element.setStyle(this.element,style,true);}});Effect.Transform=Class.create({initialize:function(tracks){this.tracks=[];this.options=arguments[1]||{};this.addTracks(tracks);},addTracks:function(tracks){tracks.each(function(track){track=$H(track);var data=track.values().first();this.tracks.push($H({ids:track.keys().first(),effect:Effect.Morph,options:{style:data}}));}.bind(this));return this;},play:function(){return new Effect.Parallel(this.tracks.map(function(track){var ids=track.get("ids"),effect=track.get("effect"),options=track.get("options");var elements=[$(ids)||$$(ids)].flatten();return elements.map(function(e){return new effect(e,Object.extend({sync:true},options));});}).flatten(),this.options);}});Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle "+"borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth "+"borderRightColor borderRightStyle borderRightWidth borderSpacing "+"borderTopColor borderTopStyle borderTopWidth bottom clip color "+"fontSize fontWeight height left letterSpacing lineHeight "+"marginBottom marginLeft marginRight marginTop markerOffset maxHeight "+"maxWidth minHeight minWidth opacity outlineColor outlineOffset "+"outlineWidth paddingBottom paddingLeft paddingRight paddingTop "+"right textIndent top width wordSpacing zIndex");Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;String.__parseStyleElement=document.createElement("div");String.prototype.parseStyle=function(){var style,styleRules=$H();if(Prototype.Browser.WebKit){style=new Element("div",{style:this}).style;}else{String.__parseStyleElement.innerHTML='<div style="'+this+'"></div>';style=String.__parseStyleElement.childNodes[0].style;}Element.CSS_PROPERTIES.each(function(property){if(style[property]){styleRules.set(property,style[property]);}});if(Prototype.Browser.IE&&this.include("opacity")){styleRules.set("opacity",this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1]);}return styleRules;};if(document.defaultView&&document.defaultView.getComputedStyle){Element.getStyles=function(element){var css=document.defaultView.getComputedStyle($(element),null);return Element.CSS_PROPERTIES.inject({},function(styles,property){styles[property]=css[property];return styles;});};}else{Element.getStyles=function(element){element=$(element);var css=element.currentStyle,styles;styles=Element.CSS_PROPERTIES.inject({},function(results,property){results[property]=css[property];return results;});if(!styles.opacity){styles.opacity=Element.getOpacity(element);}return styles;};}Effect.Methods={morph:function(element,style){element=$(element);new Effect.Morph(element,Object.extend({style:style},arguments[2]||{}));return element;},visualEffect:function(element,effect,options){element=$(element);var s=effect.dasherize().camelize(),klass=s.charAt(0).toUpperCase()+s.substring(1);new Effect[klass](element,options);return element;},highlight:function(element,options){element=$(element);new Effect.Highlight(element,options);return element;}};$w("fade appear grow shrink fold blindUp blindDown slideUp slideDown "+"pulsate shake puff squish switchOff dropOut").each(function(effect){Effect.Methods[effect]=function(element,options){element=$(element);Effect[effect.charAt(0).toUpperCase()+effect.substring(1)](element,options);return element;};});$w("getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles").each(function(f){Effect.Methods[f]=Element[f];});Element.addMethods(Effect.Methods);
if(Object.isUndefined(Effect)){throw ("dragdrop.js requires including script.aculo.us' effects.js library");}var Droppables={drops:[],remove:function(element) {this.drops=this.drops.reject(function(d){return d.element==$(element);});},add:function(element){element=$(element);var options=Object.extend({greedy:true,hoverclass:null,tree:false},arguments[1]||{});if(options.containment){options._containers=[];var containment=options.containment;if(Object.isArray(containment)){containment.each(function(c){options._containers.push($(c));});}else{options._containers.push($(containment));}}if(options.accept){options.accept=[options.accept].flatten();}Element.makePositioned(element);options.element=element;this.drops.push(options);},findDeepestChild:function(drops){deepest=drops[0];for(i=1;i<drops.length;++i){if(Element.isParent(drops[i].element,deepest.element)){deepest=drops[i];}}return deepest;},isContained:function(element,drop){var containmentNode;if(drop.tree){containmentNode=element.treeNode;}else{containmentNode=element.parentNode;}return drop._containers.detect(function(c){return containmentNode==c;});},isAffected:function(point,element,drop){return((drop.element!=element)&&((!drop._containers)||this.isContained(element,drop))&&((!drop.accept)||(Element.classNames(element).detect(function(v){return drop.accept.include(v);})))&&Element.within(drop.element,point[0],point[1]));},deactivate:function(drop){if(drop.hoverclass){Element.removeClassName(drop.element,drop.hoverclass);}this.last_active=null;},activate:function(drop){if(drop.hoverclass){Element.addClassName(drop.element,drop.hoverclass);}this.last_active=drop;},show:function(point,element){if(!this.drops.length){return;}var drop,affected=[];this.drops.each(function(drop){if(Droppables.isAffected(point,element,drop)){affected.push(drop);}});if(affected.length>0){drop=Droppables.findDeepestChild(affected);}if(this.last_active&&this.last_active!=drop){this.deactivate(this.last_active);}if(drop){Element.within(drop.element,point[0],point[1]);if(drop.onHover){drop.onHover(element,drop.element,Element.overlap(drop.overlap,drop.element));}if(drop!=this.last_active){Droppables.activate(drop);}}},fire:function(event,element){if(!this.last_active){return;}if(this.isAffected([Event.pointerX(event),Event.pointerY(event)],element,this.last_active)){if(this.last_active.onDrop){this.last_active.onDrop(element,this.last_active.element,event);return true;}}},reset:function(){if(this.last_active){this.deactivate(this.last_active);}}};
var Draggables={drags:[],observers:[],register:function (draggable){if(this.drags.length==0){this.eventMouseUp=this.endDrag.bindAsEventListener(this);this.eventMouseMove=this.updateDrag.bindAsEventListener(this);this.eventKeypress=this.keyPress.bindAsEventListener(this);Event.observe(document,"mouseup",this.eventMouseUp);Event.observe(document,"mousemove",this.eventMouseMove);Event.observe(document,"keypress",this.eventKeypress);}this.drags.push(draggable);},unregister:function(draggable){this.drags=this.drags.reject(function(d){return d==draggable;});if(this.drags.length==0){Event.stopObserving(document,"mouseup",this.eventMouseUp);Event.stopObserving(document,"mousemove",this.eventMouseMove);Event.stopObserving(document,"keypress",this.eventKeypress);}},activate:function(draggable){if(draggable.options.delay){this._timeout=setTimeout(function(){Draggables._timeout=null;window.focus();Draggables.activeDraggable=draggable;}.bind(this),draggable.options.delay);}else{window.focus();this.activeDraggable=draggable;}},deactivate:function(){this.activeDraggable=null;},updateDrag:function(event){if(!this.activeDraggable){return;}var pointer=[Event.pointerX(event),Event.pointerY(event)];if(this._lastPointer&&(this._lastPointer.inspect()==pointer.inspect())){return;}this._lastPointer=pointer;this.activeDraggable.updateDrag(event,pointer);},endDrag:function(event){if(this._timeout){clearTimeout(this._timeout);this._timeout=null;}if(!this.activeDraggable){return;}this._lastPointer=null;this.activeDraggable.endDrag(event);this.activeDraggable=null;},keyPress:function(event){if(this.activeDraggable){this.activeDraggable.keyPress(event);}},addObserver:function(observer){this.observers.push(observer);this._cacheObserverCallbacks();},removeObserver:function(element){this.observers=this.observers.reject(function(o){return o.element==element;});this._cacheObserverCallbacks();},notify:function(eventName,draggable,event){if(this[eventName+"Count"]>0){this.observers.each(function(o){if(o[eventName]){o[eventName](eventName,draggable,event);}});}if(draggable.options[eventName]){draggable.options[eventName](draggable,event);}},_cacheObserverCallbacks:function(){["onStart","onEnd","onDrag"].each(function(eventName){Draggables[eventName+"Count"]=Draggables.observers.select(function(o){return o[eventName];}).length;});}};var Draggable=Class.create({initialize:function(element){var defaults={handle:false,reverteffect:function(element,top_offset,left_offset){var dur=Math.sqrt(Math.abs(top_offset^2)+Math.abs(left_offset^2))*0.02;new Effect.Move(element,{x:-left_offset,y:-top_offset,duration:dur,queue:{scope:"_draggable",position:"end"}});},endeffect:function(element){var toOpacity=Object.isNumber(element._opacity)?element._opacity:1;new Effect.Opacity(element,{duration:0.2,from:0.7,to:toOpacity,queue:{scope:"_draggable",position:"end"},afterFinish:function(){Draggable._dragging[element]=false;}});},zindex:1000,revert:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,snap:false,delay:0};if(!arguments[1]||Object.isUndefined(arguments[1].endeffect)){Object.extend(defaults,{starteffect:function(element){element._opacity=Element.getOpacity(element);Draggable._dragging[element]=true;new Effect.Opacity(element,{duration:0.2,from:element._opacity,to:0.7});}});}var options=Object.extend(defaults,arguments[1]||{});this.element=$(element);if(options.handle&&Object.isString(options.handle)){this.handle=Element.down(this.element,"."+options.handle,0);}if(!this.handle){this.handle=$(options.handle);}if(!this.handle){this.handle=this.element;}if(options.scroll&&!options.scroll.scrollTo&&!options.scroll.outerHTML){options.scroll=$(options.scroll);this._isScrollChild=Element.childOf(this.element,options.scroll);}Element.makePositioned(this.element);this.options=options;this.dragging=false;this.eventMouseDown=this.initDrag.bindAsEventListener(this);Event.observe(this.handle,"mousedown",this.eventMouseDown);Draggables.register(this);},destroy:function(){Event.stopObserving(this.handle,"mousedown",this.eventMouseDown);Draggables.unregister(this);},currentDelta:function(){var offset=Element.cumulativeOffset(this.element);return([offset.left,offset.top]);},initDrag:function(event){if(!Object.isUndefined(Draggable._dragging[this.element])&&Draggable._dragging[this.element]){return;}if(Event.isLeftClick(event)){var src=Event.element(event);if((tag_name=src.tagName.toUpperCase())&&(tag_name=="INPUT"||tag_name=="SELECT"||tag_name=="OPTION"||tag_name=="BUTTON"||tag_name=="TEXTAREA")){return;}var pointer=[Event.pointerX(event),Event.pointerY(event)];var pos=Element.cumulativeOffset(this.element);this.offset=[0,1].map(function(i){return(pointer[i]-pos[i]);});Draggables.activate(this);Event.stop(event);}},startDrag:function(event){this.dragging=true;if(!this.delta){this.delta=this.currentDelta();}if(this.options.zindex){this.originalZ=parseInt(Element.getStyle(this.element,"z-index")||0);this.element.style.zIndex=this.options.zindex;}if(this.options.ghosting){this._clone=this.element.cloneNode(true);this._originallyAbsolute=(Element.getStyle(this.element,"position")=="absolute");if(!this._originallyAbsolute){Element.absolutize(this.element);}this.element.parentNode.insertBefore(this._clone,this.element);}if(this.options.scroll){if(this.options.scroll==window){var where=this._getWindowScroll(this.options.scroll);this.originalScrollLeft=where.left;this.originalScrollTop=where.top;}else{this.originalScrollLeft=this.options.scroll.scrollLeft;this.originalScrollTop=this.options.scroll.scrollTop;}}Draggables.notify("onStart",this,event);if(this.options.starteffect){this.options.starteffect(this.element);}},updateDrag:function(event,pointer){if(!this.dragging){this.startDrag(event);}if(!this.options.quiet){Droppables.show(pointer,this.element);}Draggables.notify("onDrag",this,event);this.draw(pointer);if(this.options.change){this.options.change(this);}if(this.options.scroll){this.stopScrolling();var p;if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){p=[left,top,left+width,top+height];}}else{p=Element.page(this.options.scroll).toArray();p[0]+=this.options.scroll.scrollLeft+Element.deltaX;p[1]+=this.options.scroll.scrollTop+Element.deltaY;p.push(p[0]+this.options.scroll.offsetWidth);p.push(p[1]+this.options.scroll.offsetHeight);}var speed=[0,0];if(pointer[0]<(p[0]+this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[0]+this.options.scrollSensitivity);}if(pointer[1]<(p[1]+this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[1]+this.options.scrollSensitivity);}if(pointer[0]>(p[2]-this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[2]-this.options.scrollSensitivity);}if(pointer[1]>(p[3]-this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[3]-this.options.scrollSensitivity);}this.startScrolling(speed);}if(Prototype.Browser.WebKit){window.scrollBy(0,0);}Event.stop(event);},finishDrag:function(event,success){this.dragging=false;if(this.options.quiet){var pointer=[Event.pointerX(event),Event.pointerY(event)];Droppables.show(pointer,this.element);}if(this.options.ghosting){if(!this._originallyAbsolute){Element.relativize(this.element);}delete this._originallyAbsolute;Element.remove(this._clone);this._clone=null;}var dropped=false;if(success){dropped=Droppables.fire(event,this.element);if(!dropped){dropped=false;}}if(dropped&&this.options.onDropped){this.options.onDropped(this.element);}Draggables.notify("onEnd",this,event);var revert=this.options.revert;if(revert&&Object.isFunction(revert)){revert=revert(this.element);}var d=this.currentDelta();if(revert&&this.options.reverteffect){if(dropped==0||revert!="failure"){this.options.reverteffect(this.element,d[1]-this.delta[1],d[0]-this.delta[0]);}}else{this.delta=d;}if(this.options.zindex){this.element.style.zIndex=this.originalZ;}if(this.options.endeffect){this.options.endeffect(this.element);}Draggables.deactivate(this);Droppables.reset();},keyPress:function(event){if(event.keyCode!=Event.KEY_ESC){return;}this.finishDrag(event,false);Event.stop(event);},endDrag:function(event){if(!this.dragging){return;}this.stopScrolling();this.finishDrag(event,true);Event.stop(event);},draw:function(point){var pos=Element.cumulativeOffset(this.element);if(this.options.ghosting){var r=Element.realOffset(this.element);pos[0]+=r[0]-Element.deltaX;pos[1]+=r[1]-Element.deltaY;}var d=this.currentDelta();pos[0]-=d[0];pos[1]-=d[1];if(this.options.scroll&&(this.options.scroll!=window&&this._isScrollChild)){pos[0]-=this.options.scroll.scrollLeft-this.originalScrollLeft;pos[1]-=this.options.scroll.scrollTop-this.originalScrollTop;}var p=[0,1].map(function(i){return(point[i]-pos[i]-this.offset[i]);}.bind(this));if(this.options.snap){if(Object.isFunction(this.options.snap)){p=this.options.snap(p[0],p[1],this);}else{if(Object.isArray(this.options.snap)){p=p.map(function(v,i){return(v/this.options.snap[i]).round()*this.options.snap[i];}.bind(this));}else{p=p.map(function(v){return(v/this.options.snap).round()*this.options.snap;}.bind(this));}}}var style=this.element.style;if((!this.options.constraint)||(this.options.constraint=="horizontal")){style.left=p[0]+"px";}if((!this.options.constraint)||(this.options.constraint=="vertical")){style.top=p[1]+"px";}if(style.visibility=="hidden"){style.visibility="";}},stopScrolling:function(){if(this.scrollInterval){clearInterval(this.scrollInterval);this.scrollInterval=null;Draggables._lastScrollPointer=null;}},startScrolling:function(speed){if(!(speed[0]||speed[1])){return;}this.scrollSpeed=[speed[0]*this.options.scrollSpeed,speed[1]*this.options.scrollSpeed];this.lastScrolled=new Date();this.scrollInterval=setInterval(this.scroll.bind(this),10);},scroll:function(){var current=new Date();var delta=current-this.lastScrolled;this.lastScrolled=current;if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){if(this.scrollSpeed[0]||this.scrollSpeed[1]){var d=delta/1000;this.options.scroll.scrollTo(left+d*this.scrollSpeed[0],top+d*this.scrollSpeed[1]);}}}else{this.options.scroll.scrollLeft+=this.scrollSpeed[0]*delta/1000;this.options.scroll.scrollTop+=this.scrollSpeed[1]*delta/1000;}Droppables.show(Draggables._lastPointer,this.element);Draggables.notify("onDrag",this);if(this._isScrollChild){Draggables._lastScrollPointer=Draggables._lastScrollPointer||$A(Draggables._lastPointer);Draggables._lastScrollPointer[0]+=this.scrollSpeed[0]*delta/1000;Draggables._lastScrollPointer[1]+=this.scrollSpeed[1]*delta/1000;if(Draggables._lastScrollPointer[0]<0){Draggables._lastScrollPointer[0]=0;}if(Draggables._lastScrollPointer[1]<0){Draggables._lastScrollPointer[1]=0;}this.draw(Draggables._lastScrollPointer);}if(this.options.change){this.options.change(this);}},_getWindowScroll:function(w){var T,L,W,H;with(w.document){if(w.document.documentElement&&documentElement.scrollTop){T=documentElement.scrollTop;L=documentElement.scrollLeft;}else{if(w.document.body){T=body.scrollTop;L=body.scrollLeft;}}if(w.innerWidth){W=w.innerWidth;H=w.innerHeight;}else{if(w.document.documentElement&&documentElement.clientWidth){W=documentElement.clientWidth;H=documentElement.clientHeight;}else{W=body.offsetWidth;H=body.offsetHeight;}}}return{top:T,left:L,width:W,height:H};}});Draggable._dragging={};
/*----------------------------------------------------------------------------*/
var SortableObserver=Class.create({initialize:function (element,observer){this.element=$(element);this.observer=observer;this.lastValue=Sortable.serialize(this.element);},onStart:function(){this.lastValue=Sortable.serialize(this.element);},onEnd:function(){Sortable.unmark();if(this.lastValue!=Sortable.serialize(this.element)){this.observer(this.element);}}});var Sortable={SERIALIZE_RULE:/^[^_\-](?:[A-Za-z0-9\-\_]*)[_](.*)$/,sortables:{},_findRootElement:function(element){while(element.tagName.toUpperCase()!="BODY"){if(element.id&&Sortable.sortables[element.id]){return element;}element=element.parentNode;}},options:function(element){element=Sortable._findRootElement($(element));if(!element){return;}return Sortable.sortables[element.id];},destroy:function(element){element=$(element);var s=Sortable.sortables[element.id];if(s){Draggables.removeObserver(s.element);s.droppables.each(function(d){Droppables.remove(d);});s.draggables.invoke("destroy");delete Sortable.sortables[s.element.id];}},create:function(element){element=$(element);var options=Object.extend({element:element,tag:"li",dropOnEmpty:false,tree:false,treeTag:"ul",overlap:"vertical",constraint:"vertical",containment:element,handle:false,only:false,delay:0,hoverclass:null,ghosting:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,format:this.SERIALIZE_RULE,elements:false,handles:false,onChange:Prototype.emptyFunction,onUpdate:Prototype.emptyFunction},arguments[1]||{});this.destroy(element);var options_for_draggable={revert:true,quiet:options.quiet,scroll:options.scroll,scrollSpeed:options.scrollSpeed,scrollSensitivity:options.scrollSensitivity,delay:options.delay,ghosting:options.ghosting,constraint:options.constraint,handle:options.handle};if(options.starteffect){options_for_draggable.starteffect=options.starteffect;}if(options.reverteffect){options_for_draggable.reverteffect=options.reverteffect;}else{if(options.ghosting){options_for_draggable.reverteffect=function(element){element.style.top=0;element.style.left=0;};}}if(options.endeffect){options_for_draggable.endeffect=options.endeffect;}if(options.zindex){options_for_draggable.zindex=options.zindex;}var options_for_droppable={overlap:options.overlap,containment:options.containment,tree:options.tree,hoverclass:options.hoverclass,onHover:Sortable.onHover};var options_for_tree={onHover:Sortable.onEmptyHover,overlap:options.overlap,containment:options.containment,hoverclass:options.hoverclass};Element.cleanWhitespace(element);options.draggables=[];options.droppables=[];if(options.dropOnEmpty||options.tree){Droppables.add(element,options_for_tree);options.droppables.push(element);}(options.elements||this.findElements(element,options)||[]).each(function(e,i){var handle=options.handles?$(options.handles[i]):(options.handle?$(e).select("."+options.handle)[0]:e);options.draggables.push(new Draggable(e,Object.extend(options_for_draggable,{handle:handle})));Droppables.add(e,options_for_droppable);if(options.tree){e.treeNode=element;}options.droppables.push(e);});if(options.tree){(Sortable.findTreeElements(element,options)||[]).each(function(e){Droppables.add(e,options_for_tree);e.treeNode=element;options.droppables.push(e);});}this.sortables[Element.identify(element)]=options;Draggables.addObserver(new SortableObserver(element,options.onUpdate));},findElements:function(element,options){return Element.findChildren(element,options.only,options.tree?true:false,options.tag);},findTreeElements:function(element,options){return Element.findChildren(element,options.only,options.tree?true:false,options.treeTag);},onHover:function(element,dropon,overlap){if(Element.isParent(dropon,element)){return;}if(overlap>0.33&&overlap<0.66&&Sortable.options(dropon).tree){return;}else{if(overlap>0.5){Sortable.mark(dropon,"before");if(dropon.previousSibling!=element){var oldParentNode=element.parentNode;element.style.visibility="hidden";dropon.parentNode.insertBefore(element,dropon);if(dropon.parentNode!=oldParentNode){Sortable.options(oldParentNode).onChange(element);}Sortable.options(dropon.parentNode).onChange(element);}}else{Sortable.mark(dropon,"after");var nextElement=dropon.nextSibling||null;if(nextElement!=element){var oldParentNode=element.parentNode;element.style.visibility="hidden";dropon.parentNode.insertBefore(element,nextElement);if(dropon.parentNode!=oldParentNode){Sortable.options(oldParentNode).onChange(element);}Sortable.options(dropon.parentNode).onChange(element);}}}},onEmptyHover:function(element,dropon,overlap){var oldParentNode=element.parentNode;var droponOptions=Sortable.options(dropon);if(!Element.isParent(dropon,element)){var index;var children=Sortable.findElements(dropon,{tag:droponOptions.tag,only:droponOptions.only});var child=null;if(children){var offset=Element.offsetSize(dropon,droponOptions.overlap)*(1-overlap);for(index=0;index<children.length;index+=1){if(offset-Element.offsetSize(children[index],droponOptions.overlap)>=0){offset-=Element.offsetSize(children[index],droponOptions.overlap);}else{if(offset-(Element.offsetSize(children[index],droponOptions.overlap)/2)>=0){child=index+1<children.length?children[index+1]:null;break;}else{child=children[index];break;}}}}dropon.insertBefore(element,child);Sortable.options(oldParentNode).onChange(element);droponOptions.onChange(element);}},unmark:function(){if(Sortable._marker){Sortable._marker.hide();}},mark:function(dropon,position){var sortable=Sortable.options(dropon.parentNode);if(sortable&&!sortable.ghosting){return;}if(!Sortable._marker){Sortable._marker=($("dropmarker")||Element.extend(document.createElement("DIV"))).hide().addClassName("dropmarker").setStyle({position:"absolute"});document.getElementsByTagName("body").item(0).appendChild(Sortable._marker);}var offsets=Element.cumulativeOffset(dropon);Sortable._marker.setStyle({left:offsets[0]+"px",top:offsets[1]+"px"});if(position=="after"){if(sortable.overlap=="horizontal"){Sortable._marker.setStyle({left:(offsets[0]+dropon.clientWidth)+"px"});}else{Sortable._marker.setStyle({top:(offsets[1]+dropon.clientHeight)+"px"});}}Sortable._marker.show();},_tree:function(element,options,parent){var children=Sortable.findElements(element,options)||[];for(var i=0;i<children.length;++i){var match=children[i].id.match(options.format);if(!match){continue;}var child={id:encodeURIComponent(match?match[1]:null),element:element,parent:parent,children:[],position:parent.children.length,container:$(children[i]).down(options.treeTag)};if(child.container){this._tree(child.container,options,child);}parent.children.push(child);}return parent;},tree:function(element){element=$(element);var sortableOptions=this.options(element);var options=Object.extend({tag:sortableOptions.tag,treeTag:sortableOptions.treeTag,only:sortableOptions.only,name:element.id,format:sortableOptions.format},arguments[1]||{});var root={id:null,parent:null,children:[],container:element,position:0};return Sortable._tree(element,options,root);},_constructIndex:function(node){var index="";do{if(node.id){index="["+node.position+"]"+index;}}while((node=node.parent)!=null);return index;},sequence:function(element){element=$(element);var options=Object.extend(this.options(element),arguments[1]||{});return $(this.findElements(element,options)||[]).map(function(item){return item.id.match(options.format)?item.id.match(options.format)[1]:"";});},setSequence:function(element,new_sequence){element=$(element);var options=Object.extend(this.options(element),arguments[2]||{});var nodeMap={};this.findElements(element,options).each(function(n){if(n.id.match(options.format)){nodeMap[n.id.match(options.format)[1]]=[n,n.parentNode];}n.parentNode.removeChild(n);});new_sequence.each(function(ident){var n=nodeMap[ident];if(n){n[1].appendChild(n[0]);delete nodeMap[ident];}});},serialize:function(element){element=$(element);var options=Object.extend(Sortable.options(element),arguments[1]||{});var name=encodeURIComponent((arguments[1]&&arguments[1].name)?arguments[1].name:element.id);if(options.tree){return Sortable.tree(element,arguments[1]).children.map(function(item){return[name+Sortable._constructIndex(item)+"[id]="+encodeURIComponent(item.id)].concat(item.children.map(arguments.callee));}).flatten().join("&");}else{return Sortable.sequence(element,arguments[1]).map(function(item){return name+"[]="+encodeURIComponent(item);}).join("&");}}};
Element.isParent=function (child,element){if(!child.parentNode||child==element){return false;}if(child.parentNode==element){return true;}return Element.isParent(child.parentNode,element);};Element.findChildren=function(element,only,recursive,tagName){if(!element.hasChildNodes()){return null;}tagName=tagName.toUpperCase();if(only){only=[only].flatten();}var elements=[];$A(element.childNodes).each(function(e){if(e.tagName&&e.tagName.toUpperCase()==tagName&&(!only||(Element.classNames(e).detect(function(v){return only.include(v);})))){elements.push(e);}if(recursive){var grandchildren=Element.findChildren(e,only,recursive,tagName);if(grandchildren){elements.push(grandchildren);}}});return(elements.length>0?elements.flatten():[]);};Element.offsetSize=function(element,type){return element["offset"+((type=="vertical"||type=="height")?"Height":"Width")];};
if(typeof Effect=="undefined"){throw ("controls.js requires including script.aculo.us' effects.js library");}if(!Control){var Control={};}Control.Slider=Class.create({initialize:function(handle,track,options){var slider=this;if(Object.isArray(handle)){this.handles=handle.collect(function(e){return $(e);});}else{this.handles=[$(handle)];}this.track=$(track);this.options=options||{};this.axis=this.options.axis||"horizontal";this.increment=this.options.increment||1;this.step=parseInt(this.options.step||"1");this.range=this.options.range||$R(0,1);this.value=0;this.values=this.handles.map(function(){return 0;});this.spans=this.options.spans?this.options.spans.map(function(s){return $(s);}):false;this.options.startSpan=$(this.options.startSpan||null);this.options.endSpan=$(this.options.endSpan||null);this.restricted=this.options.restricted||false;this.maximum=this.options.maximum||this.range.end;this.minimum=this.options.minimum||this.range.start;this.alignX=parseInt(this.options.alignX||"0");this.alignY=parseInt(this.options.alignY||"0");this.trackLength=this.maximumOffset()-this.minimumOffset();this.handleLength=this.isVertical()?(this.handles[0].offsetHeight!=0?this.handles[0].offsetHeight:this.handles[0].style.height.replace(/px$/,"")):(this.handles[0].offsetWidth!=0?this.handles[0].offsetWidth:this.handles[0].style.width.replace(/px$/,""));this.active=false;this.dragging=false;this.disabled=false;if(this.options.disabled){this.setDisabled();}this.allowedValues=this.options.values?this.options.values.sortBy(Prototype.K):false;if(this.allowedValues){this.minimum=this.allowedValues.min();this.maximum=this.allowedValues.max();}this.eventMouseDown=this.startDrag.bindAsEventListener(this);this.eventMouseUp=this.endDrag.bindAsEventListener(this);this.eventMouseMove=this.update.bindAsEventListener(this);this.handles.each(function(h,i){i=slider.handles.length-1-i;slider.setValue(parseFloat((Object.isArray(slider.options.sliderValue)?slider.options.sliderValue[i]:slider.options.sliderValue)||slider.range.start),i);h.makePositioned().observe("mousedown",slider.eventMouseDown);});this.track.observe("mousedown",this.eventMouseDown);document.observe("mouseup",this.eventMouseUp);document.observe("mousemove",this.eventMouseMove);this.initialized=true;},dispose:function(){var slider=this;Event.stopObserving(this.track,"mousedown",this.eventMouseDown);Event.stopObserving(document,"mouseup",this.eventMouseUp);Event.stopObserving(document,"mousemove",this.eventMouseMove);this.handles.each(function(h){Event.stopObserving(h,"mousedown",slider.eventMouseDown);});},setDisabled:function(){this.disabled=true;},setEnabled:function(){this.disabled=false;},getNearestValue:function(value){if(this.allowedValues){if(value>=this.allowedValues.max()){return(this.allowedValues.max());}if(value<=this.allowedValues.min()){return(this.allowedValues.min());}var offset=Math.abs(this.allowedValues[0]-value);var newValue=this.allowedValues[0];this.allowedValues.each(function(v){var currentOffset=Math.abs(v-value);if(currentOffset<=offset){newValue=v;offset=currentOffset;}});return newValue;}if(value>this.range.end){return this.range.end;}if(value<this.range.start){return this.range.start;}return value;},setValue:function(sliderValue,handleIdx){if(!this.active){this.activeHandleIdx=handleIdx||0;this.activeHandle=this.handles[this.activeHandleIdx];this.updateStyles();}handleIdx=handleIdx||this.activeHandleIdx||0;if(this.initialized&&this.restricted){if((handleIdx>0)&&(sliderValue<this.values[handleIdx-1])){sliderValue=this.values[handleIdx-1];}if((handleIdx<(this.handles.length-1))&&(sliderValue>this.values[handleIdx+1])){sliderValue=this.values[handleIdx+1];}}sliderValue=this.getNearestValue(sliderValue);this.values[handleIdx]=sliderValue;this.value=this.values[0];this.handles[handleIdx].style[this.isVertical()?"top":"left"]=this.translateToPx(sliderValue);this.drawSpans();if(!this.dragging||!this.event){this.updateFinished();}},setValueBy:function(delta,handleIdx){this.setValue(this.values[handleIdx||this.activeHandleIdx||0]+delta,handleIdx||this.activeHandleIdx||0);},translateToPx:function(value){return Math.round(((this.trackLength-this.handleLength)/(this.range.end-this.range.start))*(value-this.range.start))+"px";},translateToValue:function(offset){return((offset/(this.trackLength-this.handleLength)*(this.range.end-this.range.start))+this.range.start);},getRange:function(range){var v=this.values.sortBy(Prototype.K);range=range||0;return $R(v[range],v[range+1]);},minimumOffset:function(){return(this.isVertical()?this.alignY:this.alignX);},maximumOffset:function(){return(this.isVertical()?(this.track.offsetHeight!=0?this.track.offsetHeight:this.track.style.height.replace(/px$/,""))-this.alignY:(this.track.offsetWidth!=0?this.track.offsetWidth:this.track.style.width.replace(/px$/,""))-this.alignX);},isVertical:function(){return(this.axis=="vertical");},drawSpans:function(){var slider=this;if(this.spans){$R(0,this.spans.length-1).each(function(r){slider.setSpan(slider.spans[r],slider.getRange(r));});}if(this.options.startSpan){this.setSpan(this.options.startSpan,$R(0,this.values.length>1?this.getRange(0).min():this.value));}if(this.options.endSpan){this.setSpan(this.options.endSpan,$R(this.values.length>1?this.getRange(this.spans.length-1).max():this.value,this.maximum));}},setSpan:function(span,range){if(this.isVertical()){span.style.top=this.translateToPx(range.start);span.style.height=this.translateToPx(range.end-range.start+this.range.start);}else{span.style.left=this.translateToPx(range.start);span.style.width=this.translateToPx(range.end-range.start+this.range.start);}},updateStyles:function(){this.handles.each(function(h){Element.removeClassName(h,"selected");});Element.addClassName(this.activeHandle,"selected");},startDrag:function(event){if(Event.isLeftClick(event)){if(!this.disabled){this.active=true;var handle=Event.element(event);var pointer=[Event.pointerX(event),Event.pointerY(event)];var track=handle;if(track==this.track){var offsets=Element.cumulativeOffset(this.track);this.event=event;this.setValue(this.translateToValue((this.isVertical()?pointer[1]-offsets[1]:pointer[0]-offsets[0])-(this.handleLength/2)));var offsets=Element.cumulativeOffset(this.activeHandle);this.offsetX=(pointer[0]-offsets[0]);this.offsetY=(pointer[1]-offsets[1]);}else{while((this.handles.indexOf(handle)==-1)&&handle.parentNode){handle=handle.parentNode;}if(this.handles.indexOf(handle)!=-1){this.activeHandle=handle;this.activeHandleIdx=this.handles.indexOf(this.activeHandle);this.updateStyles();var offsets=Element.cumulativeOffset(this.activeHandle);this.offsetX=(pointer[0]-offsets[0]);this.offsetY=(pointer[1]-offsets[1]);}}}Event.stop(event);}},update:function(event){if(this.active){if(!this.dragging){this.dragging=true;}this.draw(event);if(Prototype.Browser.WebKit){window.scrollBy(0,0);}Event.stop(event);}},draw:function(event){var pointer=[Event.pointerX(event),Event.pointerY(event)];var offsets=Element.cumulativeOffset(this.track);pointer[0]-=this.offsetX+offsets[0];pointer[1]-=this.offsetY+offsets[1];this.event=event;this.setValue(this.translateToValue(this.isVertical()?pointer[1]:pointer[0]));if(this.initialized&&this.options.onSlide){this.options.onSlide(this.values.length>1?this.values:this.value,this);}},endDrag:function(event){if(this.active&&this.dragging){this.finishDrag(event,true);Event.stop(event);}this.active=false;this.dragging=false;},finishDrag:function(event,success){this.active=false;this.dragging=false;this.updateFinished();},updateFinished:function(){if(this.initialized&&this.options.onChange){this.options.onChange(this.values.length>1?this.values:this.value,this);}this.event=null;}});
/********************************** END Prototype JavaScript framework ****************/


function setMainStyles() { 
	var css = '\
	.jewel {\
		padding : 1px;\
		font-size: 7pt !important;\
		color: #666 !important;\
	}\
	.progress_on {\
		height:12px;\
		background-color: rgb(0,125,189);\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
	}\
	.progress_off {\
		height:12px;\
		background-color:rgb(255,255,255);\
	}\
	.progress_bar {\
		border: 1px solid #333;\
		border-radius: 3px;\
		-moz-border-radius: 3px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
	}\
	.popup_outer {\
		border: 1px solid #777;\
		padding-left:3px;\
		padding-right:3px;\
		padding-bottom:3px;\
		border-radius: 5px;\
		-moz-border-radius: 5px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 5px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 5px;\
	}\
	.popup_close {\
		position: absolute;\
		display:block;\
		right:-1px;\
		margin-top:-1px;\
		width:20px;\
		height:18px;\
		text-align:center;\
		color:#fff;\
		background-color:#555;\
		font-weight:bold;\
		font-size:12px !important;\
		padding:1px;\
		border: 1px solid #666;\
		border-radius: 5px;\
		-moz-border-radius: 5px;\
		cursor: pointer;\
	}\
	.popup_close:hover {\
		background-color:#922;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
	}\
	.popup_bar:hover {\
		cursor: move;\
	}\
	#main_outer {\
		background-color: rgb(255,255,255);\
	}\
	#main_outer * {\
		font-size:8pt;\
		font-family:helvetica,"lucida grande",tahoma,verdana,arial,sans-serif;\
	}\
	#main_outer div.bsx_container {\
		background-color:rgb(245,245,228);\
		height:100%;\
		width:100%;\
		overflow-x: auto;\
	}\
	.confirm_button {\
		width:60px;\
		padding-top:1px;\
		padding-bottom:1px;\
		color:white;\
		font-weight:bold;\
		border: 1px solid #333;\
		border-radius: 3px;\
		-moz-border-radius: 3px;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		-webkit-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
		cursor:hand;\
		cursor:pointer;\
		background-color: rgb(0,94,189);\
	}\
	.confirm_button:hover {\
		background-color: rgb(0,125,150);\
	}\
	div.bsx_title {\
		border:1px solid;\
		border-color:#ffffff;\
		font-weight:bold;\
		padding-top:2px;\
		padding-bottom:2px;\
		text-align:center;\
		color:#ffffff;\
		background-color:rgb(60,90,150);\
		background-image:url(\'' + urlBackgroundLogo + '\');\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	.bsx_title * {\
		display:inline-block !important;\
		font-style: normal !important;\
		text-decoration: none !important;\
		font-weight:bold;\
		color:#ffffff;\
		font-size: 10pt !important;\
		line-height: 10pt !important;\
		padding: 0;\
		text-shadow			: 1px 1px rgba(0,0,0,0.6) !important;\
		-moz-text-shadow	: 1px 1px rgba(0,0,0,0.6) !important;\
		-webkit-text-shadow	: 1px 1px rgba(0,0,0,0.6) !important;\
		-khtml-text-shadow	: 1px 1px rgba(0,0,0,0.6) !important;\
	}\
	';
	addStyle(css, true);
}

function setStyles() { 
	var css = '\
	.jewel {\
		padding : 1px;\
		font-size: 6pt !important;\
		color: #666 !important;\
	}\
	.bluejwl {\
		padding : 1px;\
		font-size: 6pt !important;\
		color: #2B4988 !important;\
	}\
	.wrap {\
		white-space: normal !important;\
	}\
	div.short {\
		color: #000;\
		height:7px;\
	}\
	.emptyline {\
		height:3px;\
	}\
	.progress_on {\
		height:12px;\
		background-color: rgb(0,125,189);\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
	}\
	.pistage_red {\
		height:12px;\
		background-color: rgb(189,0,0);\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
	}\
	.pistage_green {\
		height:12px;\
		background-color: rgb(0,189,125);\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
	}\
	.pistage_purple {\
		height:12px;\
		background-color: rgb(125,0,125);\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
	}\
	.pistage_yellow {\
		height:12px;\
		background-color: rgb(255,210,50);\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
	}\
	.progress_off {\
		height:12px;\
		background-color:rgb(255,255,255);\
	}\
	.progress_bar {\
		border: 1px solid #333;\
		border-radius: 3px;\
		-moz-border-radius: 3px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
	}\
	.hiding {\
		background-color: rgb(0,160,110);\
		color: white;\
		padding-left: 10px;\
		padding-right: 10px;\
		margin-right: -2px;\
		border-radius: 2px;\
		-moz-border-radius: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.defending {\
		background-color: rgb(184,0,46);\
		color: white;\
		padding-left: 10px;\
		padding-right: 10px;\
		margin-right: -2px;\
		border-radius: 2px;\
		-moz-border-radius: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.scrollable {\
		overflow: auto !important;\
	}\
	.popup_outer {\
		border: 1px solid #777;\
		padding-left:3px;\
		padding-right:3px;\
		padding-bottom:3px;\
		border-radius: 5px;\
		-moz-border-radius: 5px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 5px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 5px;\
	}\
	.popup_close {\
		position: absolute;\
		display:block;\
		right:-1px;\
		margin-top:-1px;\
		width:20px;\
		height:18px;\
		text-align:center;\
		color:#fff;\
		background-color:#555;\
		font-weight:bold;\
		font-size:12px !important;\
		padding:1px;\
		border: 1px solid #666;\
		border-radius: 5px;\
		-moz-border-radius: 5px;\
		cursor: pointer;\
	}\
	.popup_close:hover {\
		background-color:#922;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
	}\
	.popup_bar:hover {\
		cursor: move;\
	}\
	#main_outer {\
		background-color: rgb(255,255,255);\
	}\
	#main_outer * {\
		font-size:8pt;\
		font-family:helvetica,"lucida grande",tahoma,verdana,arial,sans-serif;\
	}\
	#main_outer ul.tabs {\
		overflow: hidden;\
		display: block;\
		border-bottom: 1px solid #898989;\
		height: 26px;\
		list-style: none;\
		margin: 0;\
		padding: 0;\
		font-size: 8px;\
	}\
	#main_outer ul.line2 {\
		height: 20px;\
	}\
	#main_outer ul.tabs li.tab {\
		display: inline-block;\
		float: left;\
		cursor:pointer !important;\
	}\
	#main_outer ul.tabs li.tab a {\
		background-color: rgb(235,238,245);\
		border-bottom-width: 1px;\
		border: 1px solid #898989;\
		border-left-width: 0;\
		color: #333;\
		font-weight: bold;\
		display: block;\
		height: 16px;\
		margin-top: 6px;\
		padding: 2px 9px 3px 8px;\
		position: relative;\
		text-decoration: none;\
		cursor:pointer;\
	}\
	#main_outer ul.tabs li.line1 a {\
		padding: 2px 9px 0px 8px;\
	}\
	#main_outer ul.tabs li.line2 a {\
		height: 16px;\
		margin-top: 0px;\
	}\
	#main_outer ul.tabs li.first a {\
		border-left-width: 1px;\
	}\
	#main_outer ul.tabs li.tab a.selected {\
		background-color: rgb(60,90,150);\
		border-top-color: #3B5998;\
		border-bottom-color: #3B5998;\
		border-left-color: #5973A9;\
		border-right-color: #5973A9;\
		color: white;\
		-webkit-box-shadow: rgba(0,0,0,0.6) 1px 0px 1px;\
		-moz-box-shadow: rgba(0,0,0,0.6) 1px 0px 1px;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);\
	}\
	#main_outer div.bsx_container {\
		height: 100%;\
		width: 100%;\
		overflow-x: auto;\
	}\
	#main_outer div.bsx_container ul.tabs li.tab a {\
		height: 13px;\
		background-color: rgb(241,241,241);\
	}\
	#main_outer div.bsx_container ul.tabs li.tab a.selected {\
		background-color: rgb(110,132,181);\
	}\
	div.bsx_title {\
		border:1px solid;\
		border-color:#ffffff;\
		font-weight:bold;\
		padding-top:2px;\
		padding-bottom:2px;\
		text-align:center;\
		color:#ffffff;\
		background-color:rgb(60,90,150);\
		background-image:url(\'' + urlBackgroundLogo + '\');\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	.bsx_title * {\
		display:inline-block !important;\
		font-style: normal !important;\
		text-decoration: none !important;\
		font-weight:bold;\
		color:#ffffff;\
		font-size: 8pt !important;\
		line-height: 10pt !important;\
		padding: 0;\
		text-shadow			: 1px 1px rgba(0,0,0,0.6) !important;\
		-moz-text-shadow	: 1px 1px rgba(0,0,0,0.6) !important;\
		-webkit-text-shadow	: 1px 1px rgba(0,0,0,0.6) !important;\
		-khtml-text-shadow	: 1px 1px rgba(0,0,0,0.6) !important;\
	}\
	div.bsx_title_main {\
		border:1px solid;\
		border-color:#ffffff;\
		font-weight:bold;\
		font-size:10pt;\
		padding-top:2px;\
		padding-bottom:0;\
		white-space:nowrap;\
		text-align:center;\
		color:#ffffff;\
		background-color:rgb(60,90,150);\
		background-image:url(\'' + urlBackgroundLogo + '\');\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	div.bsx_title_main td a {\
		cursor:pointer;\
	}\
	div.bsx_subtitle {\
		border:1px solid;\
		border-color:#ffffff;\
		font-weight:bold;\
		padding-top:2px;\
		padding-bottom:2px;\
		text-align:center;\
		color:#ffffff;\
		background-color: rgb(60,60,60);\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	div.bsx_content {\
		border:1px solid rgb(255,200,50);\
		background-color: rgb(245,245,228);\
		padding:3px;\
		border-radius: 2px;\
		color: #000;\
		-moz-border-radus: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	div.bsx_status_ticker {\
		border:1px solid #995;\
		background-color: rgb(239,239,224);\
		padding:2px;\
		border-radius: 2px;\
		color: #000;\
		-moz-border-radus: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	div.status_report {\
		height: 106px;\
		max-height: 106px;\
		overflow:auto;\
		color: #000;\
	}\
	div.status_feedback {\
		border: 1px solid #ddd;\
		padding-top: 5px;\
		padding-right: 5px;\
		padding-bottom: 0.5em;\
		padding-left: 5px;\
		height: 34px;\
		background-color: rgb(255,235,235);\
		text-align:left;\
		font-weight:bold;\
		border-radius: 3px;\
		color: #000;\
		-moz-border-radius: 3px;\
	}\
	table.row_style tr td {\
		padding: 1px 1px;\
	}\
	table.row_style tr td.right {\
		font-weight:bold;\
		text-align:right;\
		padding-right: 5px;\
	}\
	table.row_style tr:nth-child(odd) {\
		background: rgba(255, 255, 255, 0.0);\
	}\
	table.row_style tr:nth-child(even) {\
		background: rgba(255, 255, 255, 1.0);\
	}\
	table.table_targets tr td {\
		white-space:normal;\
		vertical-align:top;\
		padding-top: 5px;\
		padding-bottom: 5px;\
	}\
	table.table_wrap tr td {\
		white-space:normal;\
		padding: 1px 1px;\
		cursor: default;\
	}\
	table.bsx_table tr td,\
	table.compact_table tr td,\
	table.bsx_table tr td div {\
		border:none;\
		background:none;\
		white-space:nowrap;\
		padding: 1px 1px;\
		cursor: default;\
	}\
	table.bsx_table tr td {\
		padding: 1px 4px;\
	}\
	table.bsx_table tr td.right,\
	table.compact_table tr td.right,\
	table.bsx_table tr td.right div {\
		font-weight:bold;\
		text-align:right;\
		padding-right: 5px;\
	}\
	table.bsx_table tr td.left,\
	table.compact_table tr td.left,\
	table.bsx_table tr td.left div {\
		font-weight:bold;\
		text-align:left;\
		padding-right: 5px;\
	}\
	table.bsx_table_console tr td {\
		white-space:normal;\
		vertical-align:top;\
	}\
	td.bsx_underline {\
		border-bottom:1px solid #ccc;\
		background:none;\
		padding: 1px 4px 1px 4px;\
	}\
	table tr.row_top_headers td,\
	table tr.row_headers td {\
		color: white;\
		background-color: rgb(110,115,125);\
		border-right: 2px solid #eef;\
		font-weight:bold;\
		text-align:center;\
		line-height:11pt;\
	}\
	table tr.row_top_headers td {\
		background-color: rgb(90,95,115);\
	}\
	table tr.row_headers td a {\
		cursor:pointer;\
	}\
	table tr.row_headers_left td {\
		color: white;\
		background-color: rgb(110,115,125);\
		border-right: 2px solid #eef;\
		font-weight:bold;\
		text-align:left;\
		line-height:11pt;\
	}\
	tr.row_marchOther td {\
		color:#888888;\
	}\
	tr.row_marchMine td {\
		color:#000000;\
	}\
	tr.row_owned {\
	}\
	table tr td div.info_protect {\
		border:1px solid;\
		border-color:#ffffff;\
		font-weight:bold;\
		padding-top:2px;\
		padding-bottom:2px;\
		text-align:center;\
		color:yellow;\
		background-color:#0044a0;\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	table tr td div.info_alerts {\
		border:1px solid;\
		border-color:#ffffff;\
		font-weight:bold;\
		padding-top:2px;\
		padding-bottom:2px;\
		text-align:center;\
		color:white;\
		background-color:#770000;\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	table tr td div.info_boosts {\
		border:1px solid;\
		border-color:#ffffff;\
		font-weight:bold;\
		padding-top:2px;\
		padding-bottom:2px;\
		text-align:center;\
		color:white;\
		background-color: rgb(110,115,125);\
		border-radius: 2px;\
		-moz-border-radus: 2px;\
	}\
	input.short {\
		width:30px;\
	}\
	input.btn_on,\
	input.btn_off,\
	input.btn_red,\
	input.btn_green,\
	input.btn_blue,\
	input.btn_yellow,\
	input.btn_cyan,\
	input.btn_purple,\
	input.btn_disabled,\
	#main_outer input[type=button] {\
		width:130px;\
		padding-top:1px;\
		padding-bottom:1px;\
		color:white;\
		font-weight:bold;\
		border: 1px solid #333;\
		border-radius: 3px;\
		-moz-border-radius: 3px;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		-webkit-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
		cursor:hand;\
		cursor:pointer;\
	}\
	#main_outer input[type=button] {\
		background-color: rgb(0,125,189);\
	}\
	#main_outer input[type=button]:hover {\
		background-color: rgb(40,150,210);\
	}\
	input.btn_on {\
		background-color: rgb(0,160,110) !important;\
	}\
	input.btn_on:hover {\
		background-color: rgb(0,200,150) !important;\
	}\
	input.btn_off {\
		background-color: rgb(184,0,46) !important;\
	}\
	input.btn_off:hover {\
		background-color: rgb(200,50,100) !important;\
	}\
	input.thin {\
		width: auto !important;\
		font-size: 7pt !important;\
		margin:0;\
		padding-top:0;\
		padding-top:0;\
		padding-bottom:0;\
		padding-left:2px;\
		padding-right:2px;\
	}\
	input.small {\
		margin:0;\
		padding-top:0;\
		padding-bottom:0;\
		padding-left:1px;\
		padding-right:1px;\
		font-size:8pt;\
	}\
	input.Xtrasmall {\
		margin:0;\
		padding-top:0;\
		padding-bottom:0;\
		padding-left:1px;\
		padding-right:1px;\
		font-size:7pt;\
	}\
	.confirm_button {\
		width:60px;\
		padding-top:1px;\
		padding-bottom:1px;\
		color:white;\
		font-weight:bold;\
		border: 1px solid #333;\
		border-radius: 3px;\
		-moz-border-radius: 3px;\
		background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		-webkit-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
		-moz-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;\
		cursor:hand;\
		cursor:pointer;\
		background-color: rgb(0,94,189);\
	}\
	.confirm_button:hover {\
		background-color: rgb(0,125,150);\
	}\
	input.btn_red {\
		background-color: rgb(184,0,46) !important;\
	}\
	input.btn_red:hover {\
		background-color: rgb(200,50,100) !important;\
	}\
	input.btn_green {\
		background-color: rgb(0,160,110) !important;\
	}\
	input.btn_green:hover {\
		background-color: rgb(0,210,150) !important;\
	}\
	input.btn_blue {\
		background-color: rgb(0,94,189);\
	}\
	input.btn_blue:hover {\
		background-color: rgb(0,125,150);\
	}\
	input.btn_yellow {\
		background-color:#BFBF00 !important;\
	}\
	input.btn_yellow:hover {\
		background-color:#DFDF00 !important;\
	}\
	input.btn_cyan {\
		background-color:#00BFBF !important;\
	}\
	input.btn_cyan:hover {\
		background-color:#00DFDF !important;\
	}\
	input.btn_purple {\
		background-color:#BF00BF !important;\
	}\
	input.btn_purple:hover {\
		background-color:#DF00DF !important;\
	}\
	input.btn_disabled {\
		background-color:#D8D8D8 !important;\
	}\
	input.btn_disabled:hover {\
		background-color:#F8F8F8F8 !important;\
	}\
	#main_outer input[type=text] {\
		border: 1px solid #888;\
		border-radius: 2px;\
		-moz-border-radius: 2px;\
		-webkit-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-moz-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;\
	}\
	#main_outer input[type=text]:active,\
	#main_outer input[type=text]:focus {\
		border-color: #000;\
		-webkit-box-shadow: rgba(0,0,0,0.5) 1px 1px 4px inset;\
		-moz-box-shadow: rgba(0,0,0,0.5) 1px 1px 4px inset;\
	}\
	span.bold_red {\
		color:#550000;\
		font-weight:bold;\
	}\
	span.bold_white {\
		color:white;\
		font-weight:bold;\
	}\
	span.green {\
		color:#009C1F;\
		font-weight:bold;\
	}\
	span.blue {\
		color:#0000AA;\
		font-weight:bold;\
	}\
	span.red {\
		color:#AA0000;\
		font-weight:bold;\
	}\
	span.ref_gold {\
		color:orange;\
	}\
	span.yellow {\
		color:yellow;\
	}\
	hr.thin {\
		margin:0px;\
		padding:0px;\
	}\
	div#tooltip {\
		position: absolute;\
		max-width:185px;\
		padding: 5px 8px;\
		color:#fff;\
		font-family: "Lucida Grande","Lucida Sans Unicode","bitstream vera sans","trebuchet ms",verdana,sans-serif;\
		font-size:9pt;\
		background-color: rgb(60,90,150);\
		background-color: rgba(60,90,150,0.6);\
		border: 1px solid white;\
		border-radius: 3px;\
		-webkit-box-shadow: rgb(0,0,0) 0px 0px 5px;\
		-moz-box-shadow: rgb(0,0,0) 0px 0px 5px;\
		background-image: linear-gradient(bottom, rgba(30,30,30,0.9) 1%, rgba(30,30,30,0.5) 100%);\
		background-image: -moz-linear-gradient(bottom, rgba(30,30,30,0.9) 1%, rgba(30,30,30,0.5) 100%);\
		background-image: -webkit-linear-gradient(bottom, rgba(30,30,30,0.9) 1%, rgba(30,30,30,0.5) 100%);\
		visibility: hidden;\
		z-index: 1000;\
	}\
	';
	addStyle(css, true);
}

setMainStyles();
var initialDelay = Math.randRange(8000, 13000);
progressBar.init (800+Math.randRange(1,50), 100, 450, 150, 'Initialisation', 400, false);
progressBar.start({ steps:1, delay:initialDelay, title:scriptName +' - v'+ scriptVersion + ' (client v' + client_ver + ') : Démarrage...', stepText:'Delai initial avant démarrage du script' });
setTimeout (scriptStartup, initialDelay);
}
})();

