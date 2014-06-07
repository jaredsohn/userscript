// ==UserScript==
// @name FB MafiaWars Ranking
// @copyright 2011 - Rhun Aikhan
// @version 0.2.3.0
// @description Facebook MafiaWars Ranking
// @include http://apps.facebook.com/inthemafia/*
// @include http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @exclude http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=requests*
// @exclude http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=freegifts*
// ==/UserScript==

// Launch app with correct window object
(function(w){MWRanking((typeof(unsafeWindow)!=='undefined')?unsafeWindow:w);})(window);

/**
 * Main
 * @param {Object} unsafeWindow
 */
 
 // TODO own object for user info
 
function MWRanking(unsafeWindow) {
	var $;
	var DEBUG_MODE = false;
	var scriptAppInfo = {
		appName:      'FB MafiaWars Ranking',
		appVer:       '0.2.3.0',
		appHomePage:  'http://mwranking.rhunaikhan.net/',
		appUrl:       'http://userscripts.org/scripts/source/108050.user.js',
		appPlugInUrl: 'http://mwranking.rhunaikhan.net/scripts/chrome/extension/fb_mafiawars_ranking.crx'
	};
	var global = {
		mw_user_id       : function() { return unsafeWindow.User.id; },
		mw_user_name     : null,          // filled in PageLoaded_Profile
		mw_user_title    : '',            // filled in PageLoaded_Profile
		mw_user_class    : '',            // filled in PageLoaded_Profile
		fb_user_id       : function() { return unsafeWindow.User.trackId; },
		fb_user_name     : function() { 
			if (typeof(unsafeWindow.SNAPI)!=='undefined') {
				return unsafeWindow.SNAPI.getCurrentUserInfo().name;
			} else {
				return GetFacebookUserName();
			}
		},
		mw_clan : { // family data filled in PageLoaded_MyMafia
			id           : '',         
			name         : '',
			tag          : '',
			fights       : 0,
			fights_won   : 0,
			iced         : 0,
			killed       : 0,
			members      : 0,
			progress : { // current clan mission mastery
				level              : 0,
				mastery_complete   : 0,
				mastery_jobs       : 0,
				mastery_ice        : 0,
				mastery_properties : 0,
				mastery_helper     : 0
			}
		},
		xd_support       : false,         // set in constructor
		script_timer     : 60,            // one minute on startup
		script_interval  : 1800,          // thirty minutes timer 1800=30minutes
		timer_handle     : null,          // to abort the timer
		base64           : null,          // instanciated in constructor
		localStorage     : null,          // instanciated in constructor
		localPauseResume : 'Pause',       // the localPauseResume state to not start the timer from other tab
		chrome           : {
			extension01   : 'bldeglnghgenlffakmoighkhffckapei', // FBMWRanking extension
			extension02   : 'hppjlcpgmenflhpooppkbiceomcccoak', // FBMWAddon extension
			extension03   : 'llfmkjppmncfcgdebajkjnopgodlcaoe', // new FBMWAddon extension (20111005)
			call_name01   : 'FBMWRanking',
			call_name02   : 'FBMWAddon',
			call_name03   : 'FBMWAddon',
			is_chrome     : false,
			use_extension : null,
			use_name      : null
		},
		currentTimestamp : function() {
			return Math.round(new Date().getTime() / 1000, 0);
		},
		postParams       : function() {
			return 'ajax=1&liteload=1&sf_xw_user_id='+global.mw_user_id()+'&sf_xw_sig='+unsafeWindow.local_xw_sig+'&xw_client_id=8';
		},
		getSendParams    : function() {
			var result = 'mw_user_id='+global.mw_user_id()+
                        '&mw_user_name='+encodeURIComponent(global.mw_user_name===null?'':global.mw_user_name)+
						'&mw_user_title='+encodeURIComponent(global.mw_user_title)+
						'&mw_user_class='+encodeURIComponent(global.mw_user_class)+
			            '&fb_user_id='+global.fb_user_id()+
                        '&fb_user_name='+encodeURIComponent(global.fb_user_name()===null?'':global.fb_user_name())+
						'&mw_family_id='+global.mw_clan.id+
                        '&mw_family_name='+encodeURIComponent(global.mw_clan.name===null?'':global.mw_clan.name)+
						'&mw_family_tag='+encodeURIComponent(global.mw_clan.tag)+
						'&mw_family_fights='+global.mw_clan.fights+
						'&mw_family_fights_won='+global.mw_clan.fights_won+
						'&mw_family_iced='+global.mw_clan.iced+
						'&mw_family_killed='+global.mw_clan.killed+
						'&mw_family_members='+global.mw_clan.members+
						'&max_health='+global.userStats.max_health()+
                        '&max_energy='+global.userStats.max_energy()+
						'&max_stamina='+global.userStats.max_stamina()+
                        '&attack='+global.userStats.attack+
						'&defense='+global.userStats.defense+
                        '&mafiasize='+global.userStats.mafiasize()+
						'&level='+global.userStats.level()+
						'&skills='+global.userStats.skills()+
						'&fights_won='+global.fightStats.fights_won+
                        '&fights_lost='+global.fightStats.fights_lost+
						'&death='+global.fightStats.death+
                        '&mobsters_iced='+global.fightStats.mobsters_iced+
						'&mobsters_whacked='+global.fightStats.mobsters_whacked+
						'&fight_mastery_level='+global.fightStats.fight_mastery_level+
						'&fight_mastery_percent='+global.fightStats.fight_mastery_percent+
                        '&hitlist_kills='+global.fightStats.hitlist_kills+
						'&longest_hitlist_survival='+global.fightStats.longest_hitlist_survival+
						'&robbing_wins='+global.robStats.robbing_wins+
                        '&robbing_losses='+global.robStats.robbing_losses+
						'&robbing_board_clears='+global.robStats.robbing_board_clears+
						'&wars_won='+global.warStats.wars_won+
                        '&wars_lost='+global.warStats.wars_lost+
						'&war_assists='+global.warStats.war_assists+
		                '&wI_wea_att='+global.lootStats.weakestItems.weapon.attack+
                        '&wI_wea_def='+global.lootStats.weakestItems.weapon.defense+
                        '&wI_veh_att='+global.lootStats.weakestItems.vehicle.attack+
		                '&wI_veh_def='+global.lootStats.weakestItems.vehicle.defense+
			            '&wI_arm_att='+global.lootStats.weakestItems.armor.attack+
			            '&wI_arm_def='+global.lootStats.weakestItems.armor.defense+
			            '&wI_ani_att='+global.lootStats.weakestItems.animal.attack+
			            '&wI_ani_def='+global.lootStats.weakestItems.animal.defense+
			            '&wI_hen_att='+global.lootStats.weakestItems.henchmen.attack+
			            '&wI_hen_def='+global.lootStats.weakestItems.henchmen.defense+
			            '&attack501='+global.lootStats.attack501+
			            '&defense501='+global.lootStats.defense501+
			            '&exp_for_next_level='+global.experience.exp_for_next_level()+
			            '&exp_for_this_level='+global.experience.exp_for_this_level()+
			            '&exp_to_next_level='+global.experience.exp_to_next_level()+
						'&clan_progress_level='+global.mw_clan.progress.level+
						'&clan_progress_mastery_complete='+global.mw_clan.progress.mastery_complete+
						'&clan_progress_mastery_jobs='+global.mw_clan.progress.mastery_jobs+
						'&clan_progress_mastery_ice='+global.mw_clan.progress.mastery_ice+
						'&clan_progress_mastery_properties='+global.mw_clan.progress.mastery_properties+
						'&clan_progress_mastery_helper='+global.mw_clan.progress.mastery_helper+
						'&scriptVersion='+scriptAppInfo.appVer
						;
			return result;
		},
		userStats: {
			health                   : function() { return unsafeWindow.User.health; },
			max_health               : function() { return unsafeWindow.User.max_health; },
			energy                   : function() { return unsafeWindow.User.energy; },
			max_energy               : function() { return unsafeWindow.User.max_energy; },
			stamina                  : function() { return unsafeWindow.User.stamina; },
			max_stamina              : function() { return unsafeWindow.User.max_stamina; },
			attack                   : null,     //  filled in PageLoaded_Profile
			defense                  : null,     //  filled in PageLoaded_Profile
			mafiasize                : function() { return unsafeWindow.User.mafia_size; },
			level                    : function() {
											var elt = document.getElementById('user_level');
											if (elt){
												return parseInt(elt.innerHTML);
											}
											return null;
									   },
			skills                   : function() { return unsafeWindow.User.skill; }
		},
		fightStats: {
			fights_won               : null,     //  filled in PageLoaded_Fights
			fights_lost              : null,     //  filled in PageLoaded_Fights
			death                    : null,     //  filled in PageLoaded_Fights
			mobsters_iced            : null,     //  filled in PageLoaded_Fights
			mobsters_whacked         : null,     //  filled in PageLoaded_Fights
			hitlist_kills            : null,     //  filled in PageLoaded_Fights
			longest_hitlist_survival : null,     //  filled in PageLoaded_Fights
			fight_mastery_level      : null,
			fight_mastery_percent    : null
		},
		robStats: {
			robbing_wins             : null,     //  filled in PageLoaded_Profile
			robbing_losses           : null,     //  filled in PageLoaded_Profile
			robbing_board_clears     : null      //  filled in PageLoaded_Profile
		},
		warStats: {
			wars_won                 : null,     //  filled in PageLoaded_Profile
			wars_lost                : null,     //  filled in PageLoaded_Profile
			war_assists              : null      //  filled in PageLoaded_Profile
		},
		lootStats: {
			weakestItems: {
				weapon: {
					attack               : null,
					defense              : null
				},
				vehicle: {
					attack               : null,
					defense              : null
				},
				armor: {
					attack               : null,
					defense              : null
				},
				animal: {
					attack               : null,
					defense              : null
				},
				henchmen: {
					attack               : null,
					defense              : null
				}
			},
			attack501                    : null,    //  filled in PageLoaded_Fight
			defense501                   : null     //  filled in PageLoaded_Fight
		},
		experience: {
			exp_for_next_level           : function() { return unsafeWindow.User.exp_for_next_level; },
			exp_for_this_level           : function() { return unsafeWindow.User.exp_for_this_level; },
			exp_to_next_level            : function() { return unsafeWindow.User.exp_to_next_level; }
		}
	};
	/**
	 * Base64 / utf8 encode/decode
	 */
	var Base64 = function () {
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		/**
		 * private method for UTF-8 encoding
		 * 
		 * @private
		 * @param {String} string
		 * @return {String}
		 */
		var _utf8_encode = function(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";
			
			for (var n = 0; n < string.length; n++) {
			
				var c = string.charCodeAt(n);
				
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		};
		/**
		 * private method for UTF-8 decoding
		 * 
		 * @private
		 * @param {String} utftext
		 * @return {String}
		 */
		var _utf8_decode = function(utftext) {
			var string = "";
			var i = 0;
			var c = 0, c1 = 0, c2 = 0, c3 = 0;
			
			while (i < utftext.length) {
			
				c = utftext.charCodeAt(i);
				
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		};  
		/**
		 * Public method for encode
		 * 
		 * @param {String} input
		 * @return {String}
		 */
		this.encode = function(input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			
			input = _utf8_encode(input);
			
			while (i < input.length) {
			
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				}
				else if (isNaN(chr3)) {
					enc4 = 64;
				}
				
				output = output +
				_keyStr.charAt(enc1) +
				_keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) +
				_keyStr.charAt(enc4);
				
			}
			return output;
		};
		/**
		 * Public method for decode
		 * 
		 * @param {String} input
		 * @return {String}
		 */
		this.decode = function(input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			
			while (i < input.length) {
			
				enc1 = _keyStr.indexOf(input.charAt(i++));
				enc2 = _keyStr.indexOf(input.charAt(i++));
				enc3 = _keyStr.indexOf(input.charAt(i++));
				enc4 = _keyStr.indexOf(input.charAt(i++));
				
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				
				output = output + String.fromCharCode(chr1);
				
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
				
			}
			output = _utf8_decode(output);
			return output;
		};
		
		return this;
	};
	/**
	 * Helper
	 */
	function Trim(str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	}
	/**
	 * Methods
	 */
	var LocalStorage = function() {
		this.setValue = function(key, value) {
			if (global.chrome.is_chrome) {
				localStorage[key] = value;
			} else {
				GM_setValue(key, value)
			}
		};
		this.getValue = function(key, defaultValue) {
			if (global.chrome.is_chrome) {
				return localStorage[key] || defaultValue;
			} else {
				return GM_getValue(key, defaultValue);
			}
		};
	}
	
	function GetFacebookUserName() {
		var match, name;
		// "currentUserInfo":{"name":"Rhun Aikhan",
		match = /"currentUserInfo":{"name":"([^"]+)"/.exec(document.getElementsByTagName('head')[0].innerHTML);
		if (match) {
			name = unescape(match[1].replace(/\u/g,"%u"));
			WriteLog('GetFacebookUserName', 'Facebook Username: '+name);
			return name;
		}
		WriteLog('GetFacebookUserName', 'Facebook Username not found');
		return null;
	}
	
	function CheckXDChromeSupport() {
		// try with own extension
		try {
			chrome.extension.sendRequest(
				global.chrome.extension01, 
				{ id:global.chrome.call_name01, action:'test' }, 
				function(success) { 
					global.xd_support = success;
					global.chrome.use_extension = global.chrome.extension01;
					global.chrome.use_name = global.chrome.call_name01;
					WriteLog('CheckXDChromeSupport', 'global.xd_support='+global.xd_support);
				}
			);    
		}
		catch(err) {
			WriteLog('CheckXDChromeSupport', err.message);
		}
		// try with MWAddon extension if MWRankiong extension was not successful
		if (global.xd_support!==true) {
			try {
				chrome.extension.sendRequest(
					global.chrome.extension02, 
					{ id:global.chrome.call_name02, action:'test' }, 
					function(success) { 
						global.xd_support = success;
						global.chrome.use_extension = global.chrome.extension02;
						global.chrome.use_name = global.chrome.call_name02;
						WriteLog('CheckXDChromeSupport', 'global.xd_support='+global.xd_support);
					}
				);    
			}
			catch(err) {
				WriteLog('CheckXDChromeSupport', err.message);
			}
		}
		// try with new MWAddon extension if MWRankiong extension was not successful
		if (global.xd_support!==true) {
			try {
				chrome.extension.sendRequest(
					global.chrome.extension03, 
					{ id:global.chrome.call_name03, action:'get_version' }, 
					function(success) { 
						global.xd_support = true;
						global.chrome.use_extension = global.chrome.extension03;
						global.chrome.use_name = global.chrome.call_name03;
						WriteLog('CheckXDChromeSupport', 'global.xd_support='+global.xd_support);
					}
				);    
			}
			catch(err) {
				WriteLog('CheckXDChromeSupport', err.message);
			}
		}
		WriteLog('CheckXDChromeSupport', 'Extension: '+global.chrome.use_name);
	}

	function CreateLogBox() {
		var container = x$('//div[@id="mw_masthead"]');
		if (container !== null) {
			var divElt = document.createElement('div');
			var divEltStyle = document.createAttribute('style');
			divEltStyle.nodeValue = 'display: block; border: 2px solid blue; height: 300px; ';
			divElt.setAttributeNode(divEltStyle);
			var divEltId = document.createAttribute('id');
			divEltId.nodeValue = 'rhunaikhanlogbox';
			divElt.setAttributeNode(divEltId);
			divElt.innerHTML = '<textarea name="rhunaikhanlogtextbox" id="rhunaikhanlogtextbox" rows="15" cols="92" readonly>'+
							   'CreateLogBox(): Logbox created'+
							   '</textarea>';
			container.parentNode.insertBefore(divElt, container.nextSibling);
		}
	}
	function CreateTitle() {
		var container = x$('//div[@id="menubar"]');
		if (container !== null) {
			// create main box
			var divMain = document.createElement('div');
			var divMainStyle = document.createAttribute('style');
			divMainStyle.nodeValue = 'width:760px; height:40px; border-top:solid #999 1px; display:block; ';
			divMain.setAttributeNode(divMainStyle);
			
			// create left box
			var divLeft = document.createElement('div');
			var divLeftStyle = document.createAttribute('style');
			divLeftStyle.nodeValue = 'width:464px; border-right:solid #999 0px; float:left; font-weight:bold; font-size:10px; padding-left:15px; display:block; clear:none; ';
			divLeft.setAttributeNode(divLeftStyle);
			// temp add text
			divLeft.appendChild(document.createTextNode(' '));
			// create newsfeed box
			var spanNewsFeed = document.createElement('span');
			var spanNewsFeedStyle = document.createAttribute('style');
			spanNewsFeedStyle.nodeValue = 'font-size:10px; display:block; clear:none; border:solid 0px blue; ';
			spanNewsFeed.id='rhunaikhannewsfeed';
			spanNewsFeed.setAttributeNode(spanNewsFeedStyle);
			spanNewsFeed.appendChild(document.createTextNode('News Feed:'));
			// append newsfeed to leftbox
			divLeft.appendChild(spanNewsFeed);
			// append left box to main box
			divMain.appendChild(divLeft);
			// create right box
			var divRight = document.createElement('div');
			// create style-attribute
			var divRightStyle = document.createAttribute('style');
			divRightStyle.nodeValue = 'width:265px; border:solid red 0px; font-weight:bold; font-size:10px; padding-left:10px; float:right; display:block; clear:none; ';
			divRight.setAttributeNode(divRightStyle);
			// create Timer-Span
			var spanEltTimer = document.createElement('span');
			spanEltTimer.id='rhunaikhanrankingtimer';
			spanEltTimer.appendChild(document.createTextNode(ConvertTimerText()));
			// create pause/resume link
			var aEltPauseResume = document.createElement('a');
			aEltPauseResume.href='#';
			aEltPauseResume.id='rhunaikhanrankingpauseresume';
			aEltPauseResume.title='Click to pause or resume the timer';
			aEltPauseResume.appendChild(document.createTextNode(global.localStorage.getValue('pauseresume', 'Pause')));
			aEltPauseResume.addEventListener('click', PauseResume_Clicked, false);
			var colorText = 'green';
			if (global.localStorage.getValue('pauseresume', 'Pause')==='Resume') {
				colorText = 'red';
			}
			var aEltPauseResumeStyle = document.createAttribute('style');
			aEltPauseResumeStyle.nodeValue="color:"+colorText+";";
			aEltPauseResume.setAttributeNode(aEltPauseResumeStyle);
			// last result element
			var spanEltLastResult = document.createElement('span');
			spanEltLastResult.id='rhunaikhanrankinglastresultstate';
			spanEltLastResult.title='This is the result of the last send request or the current state (PARSE/SEND)';
			spanEltLastResult.innerHTML=global.localStorage.getValue('lastUpdateResult', 'N/A');
			var colorText2 = 'green';
			if (global.localStorage.getValue('lastUpdateResult', 'N/A')!=='OK') {
				colorText = 'red';
			}
			var spanEltLastResultStyle = document.createAttribute('style');
			spanEltLastResultStyle.nodeValue="color:"+colorText2+"; ";
			spanEltLastResult.setAttributeNode(spanEltLastResultStyle);
			// create updatelink
			var aEltUpdate         = document.createElement('a');
			aEltUpdate.href        = scriptAppInfo.appUrl;
			aEltUpdate.id          = 'rhunaikhanrankingupdatescript';
			aEltUpdate.title       = 'Get the latest version of the script';
			aEltUpdate.appendChild(document.createTextNode('Update script'));
			// send now link
			var aEltSendNow = document.createElement('a');
			aEltSendNow.href='#';
			aEltSendNow.id='rhunaikhanrankingsendnow';
			aEltSendNow.title='Click to send data now (minimum every one minute)';
			aEltSendNow.appendChild(document.createTextNode('Send data now'));
			aEltSendNow.addEventListener('click', SendNow_Clicked, false);
			// weblink
			var aEltWebLink    = document.createElement('a');
			aEltWebLink.href   = 'http://mwranking.rhunaikhan.net/';
			aEltWebLink.id     = 'rhunaikhanweblink';
			aEltWebLink.title  = 'Open website in a new window/tab';
			aEltWebLink.target = '_blank';
			aEltWebLink.appendChild(document.createTextNode('open website'));
			// append childs to the right box
			divRight.appendChild(document.createTextNode('Ver: '+scriptAppInfo.appVer+' '));
			divRight.appendChild(aEltPauseResume);
			divRight.appendChild(document.createTextNode(' Next: '));
			divRight.appendChild(spanEltTimer);
			divRight.appendChild(document.createTextNode(' Last: '));
			divRight.appendChild(spanEltLastResult);
			divRight.appendChild(document.createElement('br'));
			divRight.appendChild(aEltUpdate);
			divRight.appendChild(document.createTextNode(' | '));
			divRight.appendChild(aEltSendNow);
			divRight.appendChild(document.createTextNode(' | '));
			divRight.appendChild(aEltWebLink);
			// append left box to main box
			divMain.appendChild(divRight);
			
			// append the main div to the container
			container.parentNode.insertBefore(divMain, container);
			WriteLog('CreateTitle', 'Title created');
		} else {
			WriteLog('CreateTitle', 'element "level_bar_container" not found');
		}
	}
	// Main loop
	function MainTimer() {
		// decrement timer only, if xd_support is true
		if (global.xd_support===true) {
			if (global.localPauseResume==='Pause') {
				global.script_timer--;
				UpdateTitle('timer');
				if (global.script_timer <= 0) {
					if (Parse()===true) {
						global.script_timer = global.script_interval;
					} else {
						global.script_timer = 60;
						if(DEBUG_MODE) {
							global.script_timer = 5;
						}
					}
					// check for script updates
					GetCurrentScriptVersion();
					// read news Feed
					GetNewsFeed();
				}
				global.timer_handle = setTimeout(MainTimer, 995);
			} else {
				global.timer_handle = setTimeout(MainTimer, 2450);
			}
		} else {
			// Try get XD-Support again
			CheckXdSupport();
			WriteLog('MainTimer','global.xd_support='+global.xd_support+', wait 5 seconds');
			global.localStorage.setValue('lur'+global.mw_user_id().substring(2), 'START...');
			UpdateTitle('sendstatus');
			global.timer_handle = setTimeout(MainTimer, 5000);
		}
	}
	function UpdateTitle(type) {
		var elt;
		if (type==='timer') {
			// update timer
			elt = x$('//span[@id="rhunaikhanrankingtimer"]');
			if (elt!=null) {
				elt.innerHTML = ConvertTimerText();
				return true;
			}
		}
		if (type==='sendstatus') {
			// update Status
			elt = x$('//span[@id="rhunaikhanrankinglastresultstate"]');
			if (elt!=null) {
				var colorText = 'red';
				var currentState = global.localStorage.getValue('lur'+global.mw_user_id().substring(2));
				switch (currentState) {
					case '<br /><b>please update script</b>':
						colorText = 'red';
						PauseResume_Clicked(null);
						break;
					case 'ERR':
						colorText = 'red';
						break;
					case 'PARSE...':
					case 'START...':
						colorText = 'orange';
						break;
					case 'SEND...':
						colorText = 'yellow';
						break;
					case 'OK':
					case 'N/A':
						colorText = 'green';
						break;
					default:
						colorText = 'red';
						currentState = '<br />Server error<b></b>';
						global.script_timer = 60;
						break;
				}
				elt.style.color = colorText;
				elt.innerHTML = currentState;
				return true;
			}
		}
		return false;
	}
	function ConvertTimerText() {
		var seconds    = global.script_timer%60;
		var secondStr  = '00'+seconds;
		var minutes    = (global.script_timer-seconds)/60;
		var minutesStr = '000'+minutes;
		return minutesStr.substr(minutesStr.length-3,3)+':'+secondStr.substr(secondStr.length-2,2);
	}
	// Event Listener
	function PauseResume_Clicked(e) {
		var currentText = global.localStorage.getValue('pauseresume', 'Pause');
		var aEltPauseResume = document.getElementById('rhunaikhanrankingpauseresume');
		if (currentText==='Pause') {
			global.localStorage.setValue('pauseresume', 'Resume');
			aEltPauseResume.style.color='red';
		} else {
			global.localStorage.setValue('pauseresume', 'Pause');
			aEltPauseResume.style.color='green';
		}
		aEltPauseResume.innerHTML=global.localStorage.getValue('pauseresume', 'Pause');
		global.localPauseResume=global.localStorage.getValue('pauseresume', 'Pause');
	}
	function SendNow_Clicked() {
		if (!DEBUG_MODE) {
			var lastSend = global.currentTimestamp()-global.localStorage.getValue('lus'+global.mw_user_id().substring(2), 0);
			global.script_timer = lastSend<60?60-lastSend:1;
		} else {
			global.script_timer = 1;
		}
		UpdateTitle('timer');
	}
	// get Xpath
	function x$(selector, context) {
		context = context || document;
		return context.evaluate(selector, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	// write a message to the logbox
	function WriteLog(functionname, message) {
		if (DEBUG_MODE===true) {
			var now = new Date();
			var logBoxElt = document.getElementById('rhunaikhanlogtextbox');
			if (logBoxElt !== null) {
				if (logBoxElt.innerHTML.length>=5000) {
					logBoxElt.innerHTML = logBoxElt.innerHTML.substring(0, 5000);
				}
				logBoxElt.innerHTML = now.toGMTString()+': '+functionname+'(): '+message+"\r\n"+logBoxElt.innerHTML;
			}
		}
	}
	// Check if mandatory global fields are filled
	function IsGlobalDataSet() {
		if (global.mw_user_id()!=='undefined' &&
			global.mw_user_name!==null &&
			global.fb_user_id()!=='undefined' &&
			global.fb_user_name()!==null &&
			global.xd_support!==false) {
			return true;
		}
		WriteLog('IsGlobalDataSet', 'missing data: '+
		                            'mw_user_id='+global.mw_user_id()+
		                        '; mw_user_name='+global.mw_user_name+
							      '; fb_user_id='+global.fb_user_id()+
								'; fb_user_name='+global.fb_user_name()+
								  '; xd_support='+global.xd_support+'; ');
		return false;
	}
	function SetWeakestItems() {
		var snapshot, value;
		// get weakest items
		// Weapon
		snapshot        = document.getElementById('worstitem_type_1');
		if (snapshot!==null) {
			value           = snapshot.getElementsByTagName('span')[0].innerHTML;
			if (!isNaN(value)) {
				global.lootStats.weakestItems.weapon.attack = value;
			}
			value           = snapshot.getElementsByTagName('span')[1].innerHTML;
			if (!isNaN(value)) {
				global.lootStats.weakestItems.weapon.defense = value;
			}
		}
		// Armor
		snapshot        = document.getElementById('worstitem_type_2');
		if (snapshot!==null) {
			value           = snapshot.getElementsByTagName('span')[0].innerHTML;
			if (!isNaN(value)) {
				global.lootStats.weakestItems.armor.attack = value;
			}
			value           = snapshot.getElementsByTagName('span')[1].innerHTML;
			if (!isNaN(value)) {
				global.lootStats.weakestItems.armor.defense = value;
			}
		}
		// Vehicle
		snapshot        = document.getElementById('worstitem_type_3');
		if (snapshot!==null) {
			value           = snapshot.getElementsByTagName('span')[0].innerHTML;
			if (!isNaN(value)) {
				global.lootStats.weakestItems.vehicle.attack = value;
			}
			value           = snapshot.getElementsByTagName('span')[1].innerHTML;
			if (!isNaN(value)) {
				global.lootStats.weakestItems.vehicle.defense = value;
			}
		}
		// Animal
		snapshot        = document.getElementById('worstitem_type_8');
		if (snapshot!==null) {
			value           = snapshot.getElementsByTagName('span')[0].innerHTML;
			if (!isNaN(value)) {
				global.lootStats.weakestItems.animal.attack = value;
			}
			value           = snapshot.getElementsByTagName('span')[1].innerHTML;
			if (!isNaN(value)) {
				global.lootStats.weakestItems.animal.defense = value;
			}
		}
		// Henchmen
		snapshot        = document.getElementById('worstitem_type_13');
		if (snapshot!==null) {
			value           = snapshot.getElementsByTagName('span')[0].innerHTML;
			if (!isNaN(value)) {
				global.lootStats.weakestItems.henchmen.attack = value;
			}
			value           = snapshot.getElementsByTagName('span')[1].innerHTML;
			if (!isNaN(value)) {
				global.lootStats.weakestItems.henchmen.defense = value;
			}
		}
	}
	// get the current script version
	function GetCurrentScriptVersion() {
		var url;
		url = scriptAppInfo.appHomePage+'getScriptVersion.php';
		WriteLog('GetCurrentScriptVersion', 'try read current script version');
		LoadPage('GET', url, null, PageLoaded_GetScriptVersion);
	}
	function PageLoaded_GetScriptVersion(options) {
		var currentVersion = scriptAppInfo.appVer;
		var eltUpdateLink = document.getElementById('rhunaikhanrankingupdatescript');
		if (options!==null && eltUpdateLink!==null) {
			if (options.responseText.length==7) {
				currentVersion = options.responseText;
				if (currentVersion>scriptAppInfo.appVer) {
					eltUpdateLink.innerHTML = 'Update ('+currentVersion+')';
				}
			}
		}
	}
	// get news feed
	function GetNewsFeed() {
		var url;
		url = scriptAppInfo.appHomePage+'getNewsFeed.php';
		WriteLog('GetNewsFeed', 'try read news feed');
		LoadPage('GET', url, null, PageLoaded_GetNewsFeed);
	}
	function PageLoaded_GetNewsFeed(options) {
		var eltNewsFeedSpan = document.getElementById('rhunaikhannewsfeed');
		if (options!==null && eltNewsFeedSpan!==null) {
			if (options.responseText.length!=0) {
				eltNewsFeedSpan.innerHTML = options.responseText;
			}
		}
	}
	// Read all necesarry pages and grab current data
	function Parse() {
		global.localStorage.setValue('lur'+global.mw_user_id().substring(2), 'PARSE...');
		UpdateTitle('sendstatus');
		var url, user_clicks=1;
		// Step 00: set weakest Items
		SetWeakestItems();
		// Step 01: load MyMafia-Page
		try { user_clicks = ++unsafeWindow.User.clicks; } catch(err) {WriteLog('Parse', err.message);}
		url = x$('.//div[@id="nav_link_mafia"]//a');
		if (url!==null) {
			WriteLog('Parse', 'try loading "MyMafia"-Page');
			LoadPage('POST', url.href, global.postParams()+'&clicks='+user_clicks, PageLoaded_MyMafia);
			return true;
		} else {
			WriteLog('Parse', 'could not find url of "MyMafia"-Page');
			global.localStorage.setValue('lur'+global.mw_user_id().substring(2), 'INT_ERR');
			UpdateTitle('sendstatus');
			return false;
		}
	}
	function Send() {
		global.localStorage.setValue('lur'+global.mw_user_id().substring(2), 'SEND...');
		UpdateTitle('sendstatus');
		var url, params;
		url = 'http://mwranking.rhunaikhan.net/_post.php';
		params = global.getSendParams();
		WriteLog('Send', 'try sending data');
		LoadPage('POST', url, params, PageLoaded_Send);
	}
	function PageLoaded_Send(options) {
		if (options!==null) {
			WriteLog('PageLoaded_Send', 'responseText.length: '+options.responseText.length);
			WriteLog('PageLoaded_Send', 'sendresult = "'+options.responseText+'"');
			global.localStorage.setValue('lur'+global.mw_user_id().substring(2), options.responseText);
		} else {
			WriteLog('PageLoaded_Send', 'no incoming result');
			global.localStorage.setValue('lur'+global.mw_user_id().substring(2), 'N/A');
		}
		global.localStorage.setValue('lus'+global.mw_user_id().substring(2), global.currentTimestamp());
		UpdateTitle('sendstatus');
	}
	// Load page in background
	function LoadPage(method_in, url_in, params_in, callback) {
		if (global.xd_support) {
			if (global.chrome.is_chrome) {
				WriteLog('LoadPage', 'chrome.extension.sendRequest...');
				chrome.extension.sendRequest(global.chrome.use_extension, {id: global.chrome.use_name, method: method_in, url: url_in, params: params_in,
																header: {'Content-type': 'application/x-www-form-urlencoded'}, data: params_in}, callback);
			} else {
				WriteLog('LoadPage', 'XMLHttpRequest direct...');
				GM_xmlhttpRequest({
					method:method_in,
					url: url_in,
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: params_in,
					onload: callback,
				});
			}
		} else {
			WriteLog('LoadPage', 'global.xd_support is false');
		}
	}
	function UrlIsRedirect(options, callback) {
		var jsRedirect, start, end, redirectUrl;
		jsRedirect = options.responseText.indexOf('top.location.href');
		if (jsRedirect!=-1) {
			start       = options.responseText.indexOf('"', jsRedirect);
			end         = options.responseText.indexOf('"', start+1);
			redirectUrl = options.responseText.substring(start+1, end)+'&_fb_noscript=1';
			if (redirectUrl.substr(0,7)=='http://') {
				WriteLog('UrlIsRedirect', 'RedirectUrl in responseText found...');
				LoadPage('POST', redirectUrl, global.postParams(), callback);
				return true;
			}
		}
		return false;
	}
	function PageLoaded_MyMafia(options) {
		WriteLog('PageLoaded_MyMafia', 'responseText.length: '+options.responseText.length);
		if(!UrlIsRedirect(options, PageLoaded_MyMafia)) {
			var start, linkStart, linkEnd;
			var url, user_clicks=1;
			start = options.responseText.indexOf('class="tab_on tab_first"');
			if (start!=-1) {
				linkStart   = options.responseText.indexOf('<a href="', start);
				linkEnd     = options.responseText.indexOf('"', linkStart+9);
				url         = options.responseText.substring(linkStart+9, linkEnd);
				WriteLog('PageLoaded_MyMafia', '"Families"-url found, Try loading "Families"-Page');
				// Step 02: load Families-Page
				try { user_clicks = ++unsafeWindow.User.clicks; } catch(err) {WriteLog('Parse', err.message);}
				LoadPage('POST', url, global.postParams()+'&clicks='+user_clicks, PageLoaded_Families);
			} else {
				WriteLog('PageLoaded_MyMafia', 'start "tab_on tab_first" not found');
				// Step 03: load Profile-Page
				url = x$('.//div[@id="nav_link_profile"]//a');
				WriteLog('PageLoaded_MyMafia', 'try loading "Profile"-Page');
				try { user_clicks = ++unsafeWindow.User.clicks; } catch(err) {WriteLog('Parse', err.message);}
				LoadPage('POST', url.href, global.postParams()+'&clicks='+user_clicks, PageLoaded_Profile);
			}
		}
	}
	function PageLoaded_Families(options) {
		WriteLog('PageLoaded_Families', 'responseText.length: '+options.responseText.length);
		var start, start1, end1, content1, content2, value1, value2;
		var url, user_clicks=1;
		// get familyID
		start     = options.responseText.indexOf('http://apps.facebook.com/inthemafia/family.php?id=');
		if (start!=-1) {
			start1    = options.responseText.indexOf('%22%3A%22', start);
			end1      = options.responseText.indexOf('%22%7D\'', start1);
			global.mw_clan.id = atob(unescape(options.responseText.substring(start1+9, end1)));
			if (isNaN(global.mw_clan.id)) { 
				WriteLog('PageLoaded_Families', 'MafiaWars FamilyId not found');
				global.mw_clan.id = '';
			} else {
				WriteLog('PageLoaded_Families', 'MafiaWars FamilyId found: '+global.mw_clan.id);
			}
		} else {
			WriteLog('PageLoaded_Families', 'start "http://apps.facebook.com/inthemafia/family.php?id=" not found');
		}
		// get Family header (name)
		if (global.mw_clan.id!=='') {
			// read name
			start          = options.responseText.indexOf('id="clan_header"');
			start1         = options.responseText.indexOf('<h3>', start);
			end1           = options.responseText.indexOf('</h3>', start1);
			global.mw_clan.name = options.responseText.substring(start1+4, end1);
			if (start!=-1 && start1!=-1 && end1!=-1 && global.mw_clan.name!='') {
				WriteLog('PageLoaded_Families', 'MafiaWars Familyname found: '+global.mw_clan.name);
			} else {
				WriteLog('PageLoaded_Families', 'MafiaWars Familyname not found');
				global.mw_clan.name = '';
			}
			// read Family Progress
			start         = options.responseText.indexOf('id="clan_xp_meter"');
			if (start!=-1) {
				// read current level
				start1     = options.responseText.indexOf('<span style="margin-left: 150px;"><b>Level:', start);
				end1       = options.responseText.indexOf('</b></span>', start1+43);
				content1   = parseInt(options.responseText.substring(start1+43, end1));
				if (content1!='NaN') {
					global.mw_clan.progress.level = content1;
				}
				// read td-tag with masteries percentage
				start1     = options.responseText.indexOf('<td>', end1);
				start1     = options.responseText.indexOf('<td>', start1+4);
				end1       = options.responseText.indexOf('class="motd_outer"', start1+4);
				content1   = options.responseText.substring(start1+4, end1);
				// read next level progress
				start1     = content1.indexOf('class="mastery_bar zy_progress_bar_yellow"');
				start1     = content1.indexOf('<p>', start1);
				end1       = content1.indexOf('% Mastered', start1);
				content2   = parseInt(content1.substring(start1+3, end1));
				if (content2!='NaN') {
					global.mw_clan.progress.mastery_complete = content2;
				}
				// read mini_masteries
				start1     = content1.indexOf('id="mini_mastery"', end1);
				end1       = content1.indexOf('</table>', start1);
				content1   = content1.substring(start1, end1);
				// read mastery_jobs
				start1     = content1.indexOf('title="Jobs"');
				end1       = content1.indexOf('</td>', start1);
				content2   = content1.substring(start1, end1);
				start1     = content2.indexOf('<p>');
				end1       = content2.indexOf('%', start1);
				content2   = parseInt(content2.substring(start1+3, end1));
				if (content2!='NaN') {
					global.mw_clan.progress.mastery_jobs = content2;
				}
				// read mastery_ice
				start1     = content1.indexOf('title="Ice"');
				end1       = content1.indexOf('</td>', start1);
				content2   = content1.substring(start1, end1);
				start1     = content2.indexOf('<p>');
				end1       = content2.indexOf('%', start1);
				content2   = parseInt(content2.substring(start1+3, end1));
				if (content2!='NaN') {
					global.mw_clan.progress.mastery_ice = content2;
				}
				// read mastery_properties
				start1     = content1.indexOf('title="Properties"');
				end1       = content1.indexOf('</td>', start1);
				content2   = content1.substring(start1, end1);
				start1     = content2.indexOf('<p>');
				end1       = content2.indexOf('%', start1);
				content2   = parseInt(content2.substring(start1+3, end1));
				if (content2!='NaN') {
					global.mw_clan.progress.mastery_properties = content2;
				}
				// read mastery_helper
				start1     = content1.indexOf('title="Helper"');
				end1       = content1.indexOf('</td>', start1);
				content2   = content1.substring(start1, end1);
				start1     = content2.indexOf('<p>');
				end1       = content2.indexOf('%', start1);
				content2   = parseInt(content2.substring(start1+3, end1));
				if (content2!='NaN') {
					global.mw_clan.progress.mastery_helper = content2;
				}
			}
			// read family stats
			start         = options.responseText.indexOf('id="clan_stats"');
			if (start!=-1) {
				start1    = options.responseText.indexOf('<table>', start);
				end1      = options.responseText.indexOf('</table>', start1);
				content1  = options.responseText.substring(start1+7, end1);
				// read Fights
				start             = content1.indexOf('Fights .....');
				if (start!=-1) {
					start1     = content1.indexOf('<span>', start);
					end1       = content1.indexOf('</span>', start1+6);
					global.mw_clan.fights = content1.substring(start1+6, end1);
					if (isNaN(global.mw_clan.fights)) { 
						WriteLog('PageLoaded_Families', 'MafiaWars Family Fights not found');
						global.mw_clan.fights = '';
					} else {
						WriteLog('PageLoaded_Families', 'MafiaWars Family Fights found: '+global.mw_clan.fights);
					}
				}
				// read Fights Won
				start             = content1.indexOf('Fights Won .....');
				if (start!=-1) {
					start1     = content1.indexOf('<span>', start);
					end1       = content1.indexOf('</span>', start1+6);
					global.mw_clan.fights_won = content1.substring(start1+6, end1);
					if (isNaN(global.mw_clan.fights_won)) { 
						WriteLog('PageLoaded_Families', 'MafiaWars Family fights_won not found');
						global.mw_clan.fights_won = '';
					} else {
						WriteLog('PageLoaded_Families', 'MafiaWars Family fights_won found: '+global.mw_clan.fights_won);
					}
				}
				// read Iced
				start             = content1.indexOf('Iced .....');
				if (start!=-1) {
					start1     = content1.indexOf('<span>', start);
					end1       = content1.indexOf('</span>', start1+6);
					global.mw_clan.iced = content1.substring(start1+6, end1);
					if (isNaN(global.mw_clan.iced)) { 
						WriteLog('PageLoaded_Families', 'MafiaWars Family iced not found');
						global.mw_clan.iced = '';
					} else {
						WriteLog('PageLoaded_Families', 'MafiaWars Family iced found: '+global.mw_clan.iced);
					}
				}
				// read Killed
				start             = content1.indexOf('Killed .....');
				if (start!=-1) {
					start1     = content1.indexOf('<span>', start);
					end1       = content1.indexOf('</span>', start1+6);
					global.mw_clan.killed = content1.substring(start1+6, end1);
					if (isNaN(global.mw_clan.killed)) { 
						WriteLog('PageLoaded_Families', 'MafiaWars Family killed not found');
						global.mw_clan.killed = '';
					} else {
						WriteLog('PageLoaded_Families', 'MafiaWars Family killed found: '+global.mw_clan.killed);
					}
				}
				// read Members
				start             = content1.indexOf('Members .....');
				if (start!=-1) {
					start1     = content1.indexOf('<span>', start);
					end1       = content1.indexOf('</span>', start1+6);
					global.mw_clan.members = content1.substring(start1+6, end1);
					if (isNaN(global.mw_clan.members)) { 
						WriteLog('PageLoaded_Families', 'MafiaWars Family members not found');
						global.mw_clan.members = '';
					} else {
						WriteLog('PageLoaded_Families', 'MafiaWars Family members found: '+global.mw_clan.members);
					}
				}
			}
		}
		// Step 03: load Profile-Page
		url = x$('.//div[@id="nav_link_profile"]//a');
		WriteLog('PageLoaded_Families', 'try loading "Profile"-Page');
		try { user_clicks = ++unsafeWindow.User.clicks; } catch(err) {WriteLog('Parse', err.message);}
		LoadPage('POST', url.href, global.postParams()+'&clicks='+user_clicks, PageLoaded_Profile);
	}
	function PageLoaded_Profile(options) {
		var start, end, start1, end1, content1, content2, value1, value2;
		var url, user_clicks=1;
		WriteLog('PageLoaded_Profile', 'responseText.length: '+options.responseText.length);
		start          = options.responseText.indexOf('experience points to your next level');
		if (start==-1) {	start = options.responseText.indexOf('Skill Point to spend.'); }
		if (start==-1) {	start = options.responseText.indexOf('Skill Points to spend.'); }
		if (start!=-1) {
			start1    = options.responseText.indexOf('<table>', start);
			end1      = options.responseText.indexOf('</table>', start1);
			content1  = options.responseText.substring(start1, end1);
			// read attack
			start     = content1.indexOf('Attack:')
			start1    = content1.indexOf('<td>', start);
			end1      = content1.indexOf('</td>', start1+4)
			global.userStats.attack = parseInt(content1.substring(start1+4, end1));
			if (isNaN(global.userStats.attack)) { 
				WriteLog('PageLoaded_Profile', 'Userstats attack not found');
				global.userStats.attack = null;
			} else {
				WriteLog('PageLoaded_Profile', 'Userstats attack found: '+global.userStats.attack);
			}
			// read defense
			start       = content1.indexOf('Defense:', end1)
			start1      = content1.indexOf('<td>', start);
			end1        = content1.indexOf('</td>', start1+4)
			global.userStats.defense = parseInt(content1.substring(start1+4, end1));
			if (isNaN(global.userStats.defense)) { 
				WriteLog('PageLoaded_Profile', 'Userstats defense not found');
				global.userStats.defense = null;
			} else {
				WriteLog('PageLoaded_Profile', 'Userstats defense found: '+global.userStats.defense);
			}
			// read context for title and names
			start  = options.responseText.indexOf('<div class="stats_title_text">');
			if (start!=-1) {
				end = options.responseText.indexOf('</div>', start+30);
				content1 = options.responseText.substring(start+30, end);
				// read title
				end1   = content1.indexOf('"');
				global.mw_user_title = Trim(content1.substring(0, end1));
				start1 = end1+1; // start with name
				// read clan tag
				if (global.mw_clan.id!='') {
					start1 = content1.indexOf('<span style="color:red">');
					end1   = content1.indexOf('</span>', end1);
					global.mw_clan.tag = content1.substring(start1+24, end1);
					start1 = end1+7; // start with name
				}
				// read MafiaWars name
				end1 = content1.indexOf('" level ', end1+7);
				global.mw_user_name = Trim(content1.substring(start1, end1));
				// read class name
				start1 = content1.indexOf(' ', end1+8);
				global.mw_user_class = Trim(content1.substring(start1));
			}
			// read other Stats
			start1            = options.responseText.indexOf('class="main_table stats"');
			end1              = options.responseText.indexOf('</table>', start1);
			content1          = options.responseText.substring(start1, end1);
			start             = content1.indexOf('<tr>');
			end               = content1.indexOf('</tr>', start+4);
			// Clear stats
			while (start!=-1 && end!=-1) {
				// get tr content
				content2           = content1.substring(start+4, end);
				// read Key
				start1             = content2.indexOf('<td>');
				end1               = content2.indexOf('</td>', start1+4);
				value1             = content2.substring(start1+4, end1);
				// read Value
				start1             = content2.indexOf('<td style="text-align:right;">', end1);
				end1               = content2.indexOf('</td>', start1+30);
				value2             = content2.substring(start1+30, end1);
				switch(value1) {
					case 'Fights Won':
						global.fightStats.fights_won               = value2;
						WriteLog('PageLoaded_Profile', 'Fights Won: '+value2);
						break;
					case 'Fights Lost':
						global.fightStats.fights_lost              = value2;
						WriteLog('PageLoaded_Profile', 'Fights Lost: '+value2);
						break;
					case 'Death':
						global.fightStats.death                    = value2;
						WriteLog('PageLoaded_Profile', 'Death: '+value2);
						break;
					case 'Mobsters Iced':
						global.fightStats.mobsters_iced            = value2;
						WriteLog('PageLoaded_Profile', 'Mobsters Iced: '+value2);
						break;
					case 'Mobsters Whacked':
						global.fightStats.mobsters_whacked         = value2;
						WriteLog('PageLoaded_Profile', 'Mobsters Whacked: '+value2);
						break;
					case 'Hitlist Kills':
						global.fightStats.hitlist_kills            = value2;
						WriteLog('PageLoaded_Profile', 'Hitlist Kills: '+value2);
						break;
					case 'Longest Hitlist Survival':
						global.fightStats.longest_hitlist_survival = value2;
						WriteLog('PageLoaded_Profile', 'Longest Hitlist Survival: '+value2);
						break;
					case 'Robbing Wins':
						global.robStats.robbing_wins               = value2;
						WriteLog('PageLoaded_Profile', 'Robbing Wins: '+value2);
						break;
					case 'Robbing Losses':
						global.robStats.robbing_losses             = value2;
						WriteLog('PageLoaded_Profile', 'Robbing Losses: '+value2);
						break;
					case 'Robbing Board Clears (9-0)':
						global.robStats.robbing_board_clears       = value2;
						WriteLog('PageLoaded_Profile', 'Robbing Board Clears (9-0): '+value2);
						break;
					case 'Wars Won':
						global.warStats.wars_won                   = value2;
						WriteLog('PageLoaded_Profile', 'Wars Won: '+value2);
						break;
					case 'Wars Lost':
						global.warStats.wars_lost                  = value2;
						WriteLog('PageLoaded_Profile', 'Wars Lost: '+value2);
						break;
					case 'War Assists':
						global.warStats.war_assists                = value2;
						WriteLog('PageLoaded_Profile', 'War Assists: '+value2);
						break;
				}
				// try read next tr element
				start              = content1.indexOf('<tr>', end);
				end                = content1.indexOf('</tr>', start+4);
			}
			// Step 04: load Fight-Page
			url = x$('.//div[@id="nav_link_fight_unlock"]//a');
			WriteLog('PageLoaded_Profile', 'try loading "Fight"-Page');
			try { user_clicks = ++unsafeWindow.User.clicks; } catch(err) {WriteLog('Parse', err.message);}
			LoadPage('POST', url.href, global.postParams()+'&clicks='+user_clicks, PageLoaded_Fight);
		} else {
			WriteLog('PageLoaded_Profile', 'Could not find beginning of datatables');
		}
	}
	var secondChance = false;
	function PageLoaded_Fight(options) {
		var start, start1, end1, end2, content1, value1;
		var url, user_clicks=1;
		WriteLog('PageLoaded_Fight', 'responseText.length: '+options.responseText.length);
		start          = options.responseText.indexOf('fightbar_cont');
		if (start!=-1) {
			// read attack501
			start1          = options.responseText.indexOf('Mafia Attack Strength', start);
			end1            = options.responseText.indexOf('>', start1);
			end2            = options.responseText.indexOf('<', end1);
			content1        = options.responseText.substring(end1+1, end2);
			value1          = parseInt(content1.replace(/,/g,''));
			if (!isNaN(value1)) {
				global.lootStats.attack501 = value1;
				WriteLog('PageLoaded_Fight', 'attack501: '+value1);
			} else {
				global.lootStats.attack501 = null;
				WriteLog('PageLoaded_Fight', 'Value for attack501 nat valid');
				return false;
			}
			// read defense501
			start1          = options.responseText.indexOf('Mafia Defense Strength', end2);
			end1            = options.responseText.indexOf('>', start1);
			end2            = options.responseText.indexOf('<', end1);
			content1        = options.responseText.substring(end1+1, end2);
			value1    = parseInt(content1.replace(/,/g,''));
			if (!isNaN(value1)) {
				global.lootStats.defense501 = value1;
				WriteLog('PageLoaded_Fight', 'defense501: '+value1);
			} else {
				global.lootStats.defense501 = null;
				WriteLog('PageLoaded_Fight', 'Value for defense501 not valid');
				return false;
			}
			// read fight mastery level
			start1          = options.responseText.indexOf('<div class="fightmastery_meter_text">')+37;
			end1            = options.responseText.indexOf('</div>', start1);
			content1        = options.responseText.substring(start1, end1);
			start1          = content1.indexOf('Level ')+6;
			end1            = content1.indexOf(':', start1);
			value1          = content1.substring(start1, end1);
			if (!isNaN(value1)) {
				global.fightStats.fight_mastery_level = value1;
				WriteLog('PageLoaded_Fight', 'fight_mastery_level: '+value1);
			} else {
				global.fightStats.fight_mastery_level = null;
				WriteLog('PageLoaded_Fight', 'Value for fight_mastery_level not valid');
				return false;
			}
			// read fight mastery percent
			start1          = options.responseText.indexOf('<div class="fightmastery_meter_text_percent">')+45;
			end1            = options.responseText.indexOf('%</div>', start1);
			value1          = options.responseText.substring(start1, end1);
			if (!isNaN(value1)) {
				global.fightStats.fight_mastery_percent = value1;
				WriteLog('PageLoaded_Fight', 'fight_mastery_percent: '+value1);
			} else {
				global.fightStats.fight_mastery_percent = null;
				WriteLog('PageLoaded_Fight', 'Value for fight_mastery_percent not valid');
				return false;
			}
			// Step 05: send all data to server
			Send();
		} else if (secondChance===false) {
			WriteLog('PageLoaded_Fight', 'Could not find "fightbar_cont" - Try load again');
			// Maybe wrong subpage displayed, try to load FightTab
			secondChance = true;
			start = options.responseText.indexOf('class="tab_off tab_first"');
			if (start!=-1) {
				start1      = options.responseText.indexOf('<a href="', start);
				end1        = options.responseText.indexOf('"', start1+9);
				url         = options.responseText.substring(start1+9, end1);
				WriteLog('PageLoaded_Fight', '"Fight"-url found, Try loading "Fight"-Page');
				// Step 04a: load Fight-Page again
				try { user_clicks = ++unsafeWindow.User.clicks; } catch(err) {WriteLog('Parse', err.message);}
				LoadPage('POST', url, global.postParams()+'&clicks='+user_clicks, PageLoaded_Fight);
			} else {
				WriteLog('PageLoaded_Fight', 'Could not find element "tab_off tab_first"');
				global.localStorage.setValue('lur'+global.mw_user_id().substring(2), 'INT_ERR');
				UpdateTitle('sendstatus');
				secondChance=false;
			}
		} else {
			WriteLog('PageLoaded_Fight', 'Could not find "fightbar_cont" - this was the secondChance');
			global.localStorage.setValue('lur'+global.mw_user_id().substring(2), 'INT_ERR');
			UpdateTitle('sendstatus');
			secondChance=false;
		}
	}
	function CheckXdSupport() {
		if (typeof chrome !== 'undefined' && typeof chrome.extension !== 'undefined') {
			WriteLog('constructor', 'Chromium browser detected.');
			global.chrome.is_chrome = true;
			CheckXDChromeSupport();
		} else {
			WriteLog('constructor', 'Firefox browser detected.');
			global.xd_support = (typeof GM_xmlhttpRequest !== 'undefined'); 
		}
	}
	/**
	 * Constructor
	 */
	(function(){
		var getWindow = function() {
			var elt = document.createElement("div");
			elt.setAttribute("onclick", "return window;");
			return elt.onclick();
		};
		if (typeof(unsafeWindow==='undefined')) {
			try {
				unsafeWindow = getWindow();
			} catch(err) {
				WriteLog('constructor', err.message);
			}
		}
		if (typeof(unsafeWindow.User)!=='undefined') {
			// create debug elements and set debug timer values
			if (DEBUG_MODE===true) {
				CreateLogBox();
				global.script_timer    = 5;
				global.script_interval = 60;
			}
			// instanciate internal objects
			global.base64 = new Base64;
			global.localStorage = new LocalStorage;
			// try get xd_support
			CheckXdSupport();
			// create the title
			WriteLog('constructor', 'try creating Title...');
			CreateTitle();
			// set jQuery
			$ = unsafeWindow.$;
			// check for values in storage
			if (!global.localStorage.getValue('pauseresume')) {
				global.localStorage.setValue('pauseresume', 'Pause');
			}
			if (!global.localStorage.getValue('lus'+global.mw_user_id().substring(2))) {
				global.localStorage.setValue('lus'+global.mw_user_id().substring(2), global.currentTimestamp());
			} else {
				// calculate the global.script_timer
				var nextSend = parseInt(global.script_interval) + parseInt(global.localStorage.getValue('lus'+global.mw_user_id().substring(2)));
				WriteLog('constructor', 'global.script_interval='+global.script_interval);
				WriteLog('constructor', 'LastUpdateSend='+global.localStorage.getValue('lus'+global.mw_user_id().substring(2)));
				WriteLog('constructor', 'nextSend='+nextSend);
				WriteLog('constructor', 'global.currentTimestamp()='+global.currentTimestamp());
				if (nextSend > global.currentTimestamp()) {
					// next send is in future
					global.script_timer = (parseInt(nextSend) - parseInt(global.currentTimestamp()));
					if (global.script_timer>global.script_interval) {
						global.script_timer = global.script_interval;
					}
				}
			}
			if (!global.localStorage.getValue('lur'+global.mw_user_id().substring(2))) {
				global.localStorage.setValue('lur'+global.mw_user_id().substring(2), 'N/A');
			}
			WriteLog('constructor', 'localStorage->lastUpdateSend: '+global.localStorage.getValue('lus'+global.mw_user_id().substring(2)));
			WriteLog('constructor', 'localStorage->lastUpdateResult: '+global.localStorage.getValue('lur'+global.mw_user_id().substring(2)));
			// set local pauseResume state
			global.localPauseResume=global.localStorage.getValue('pauseresume', 'Pause');
			// update title and sendstatus
			UpdateTitle('timer');
			UpdateTitle('sendstatus');
			// start MainTimer
			WriteLog('constructor', 'try starting MainTimer...');
			global.timer_handle = setTimeout(MainTimer, 1500);
			// check for updates
			GetCurrentScriptVersion();
			// read news feed
			GetNewsFeed();
		}
		// end...
		return false;
	})()
} // end of Main