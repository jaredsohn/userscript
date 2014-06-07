// ==UserScript==
// @name          CAGE - Castle Age Game Enhancer
// @namespace     CAGE
// @description   Enhances gameplay by taking care of time consuming tasks.
// @license       GNU General Public License v3 - http://www.gnu.org/licenses/gpl.html
// @include       http://web3.castleagegame.com/castle_ws/*
// @match         http://web3.castleagegame.com/castle_ws/*
// ==/UserScript==

/**
 * Print Debug Messages to Console / Debug Div
 */
function contentEval(source) {
	// Check for function input.
	if('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	}

	// Create a script node holding this  source code.
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(function() {
	cageDbg = {};

	cageDbg.info = function(_message) {

		if(CAGE.Debug) {
			if(window.console) {
				console.log(_message);
			}
		}

	};
	/**
	 * cage_init.js
	 */
	// Init some CAGE basics
	var CAGE = {
		id : 'CAGESettings',
		Build : '4477',
		Type : 'beta',
		Version : '0.9.2',
		Revision : '295',
		Date : '2011-06-18 20:29',
		jQuery : '//ajax.googleapis.com/ajax/libs/jquery/1.6/',
		jQueryUI : '//ajax.googleapis.com/ajax/libs/jqueryui/1.8/',
		jQueryUICSS : '//ajax.googleapis.com/ajax/libs/jqueryui/1.8/',
		Theme : {
			'Standard' : 'base',
			'Lightness' : 'ui-lightness',
			'Darkness' : 'ui-darkness',
			'DarkHive' : 'dark-hive'
		},
		tempPage : null,
		Language : null,
		fbHidden : true,
		Healed : false,
		Debug : true,
		uid : ( typeof Env !== 'undefined') ? Env.user : FB._session.uid,
		SettingType : {
			text : "text",
			bool : "bool"
		},
		Settings : {
			language : 'English',
			langData : null,
			favourites : []
		}
	};

	// All Castle Age data goes in here
	var CastleAge = null;
	CastleAge = {
		bqh : null,
		Guild : null,
		Loader : null,
		General : null
	};

	// load all needed jQuery stuff
	cageDbg.info('CAGE: Inject jQuery');
	var inject = document.createElement('script');
	var head = document.getElementsByTagName('head')[0];
	inject.setAttribute('type', 'application/javascript');
	inject.src = CAGE.jQuery + 'jquery.min.js';
	head.appendChild(inject);
	cageDbg.info('CAGE: Inject jQueryUI CSS.');
	inject = document.createElement('link');
	inject.id = 'CAGETheme';
	inject.setAttribute('type', 'text/css');
	inject.rel = 'stylesheet';
	inject.href = CAGE.jQueryUICSS + 'themes/' + CAGE.Theme['Darkness'] + '/jquery-ui.css';
	head.appendChild(inject);
	inject = null;
	/**
	 *  Init languages
	 *
	 *  English (default) language data 2010/09/22
	 *
	 *  Editors: Unknowner
	 *
	 */
	function LanguageData() {

		// CAGE
		this.CAGE = 'CAGE';
		this.CAGEBetaBuild = 'Use beta build, more updates but sometimes broken (requires reload).';
		this.CAGEUseImageServer = 'Use own server for images';
		this.CAGEImageServer = 'Image server';

		// Stash
		this.Stash = 'Stash Gold';
		this.StashDone = 'All Gold was stashed';
		this.StashError = 'You got no gold to stash';

		// Eliteguard
		this.Eliteguard = 'Fill Elite guard';
		this.EliteguardDone = 'Your Elite guard is full';
		this.EliteguardError = 'Can\'t fill Elite guard';
		this.EliteguardUseFavourite = 'Use favourites';
		this.EliteguardUseElitefriends = 'Use elite friends';
		this.EliteguardUseGuild = 'Use guild members';
		this.EliteguardUseArmy = 'Use army';
		this.EliteguardFavourite = 'Enter the the Ids of your favourite guards here.';

		// Assister
		this.Assist = 'Assist';
		this.AssistedFor = 'Assisted for [NAME]';
		this.AssistMaxStamina = 'Maximum stamina for Assists';
		this.AssistNoStamina = 'No Stamina for assists.';
		this.AssistLivefeed = 'Assist on livefeed';
		this.AssistGuildfeed = 'Assist on Guildfeed';
		this.AssistCommentCTA = 'Leave comment CTA at user page/newsfeed';
		this.AssistCommentText = 'Text ([NUM]=1st,2nd... / [NAME]=username)';
		this.AssistCommentMonster = 'Leave comment at assisted monster';
		this.AssistMonsterText = 'Text ([NUM]=1st,2nd... / [NAME]=username)';

		//Heal
		this.Heal = 'Heal';
		this.HealDone = 'You have been healed';

	}

	// Set to default language if no other is set
	if(CAGE.Settings.language == 'English' || CAGE.Settings.language === null || CAGE.Settings.language === undefined) {
		CAGE.Settings.langData = new LanguageData();
	}
	/**
	 * cage_init_pages.js
	 */
	// Array of all pagechanges
	var cage_pages = {};

	function cage_page(_id) {

		cage_pages[_id] = this;
		this.id = _id;
		this.data = null;
		this.script = null;

	}/**

	 * cage_init_tool.js
	 */
	// array of all utilities
	var cage_tools = {};

	function cage_tool(_id) {
		cage_tools[_id] = this;
		this.id = _id;
		this.jq = '#' + 'CAGETool' + _id;
		this.init = null;
		// do inital stuff if necessary
		this.initiated = false;
		// true when init done, all tools must set true after init
		this.background = false;
		// init tool in background (eg generals.js)
		this.progress = 0;
		// steps for the loader
		this.cache = null;
		// save stuff
		this.clearcache = function() {
			this.cache = null;
		};
		this.settings = null;
		// Available settings
		this.enable = function() {
			$jQ(this.jq).button("option", "icons", {
				primary : this.uiicon
			}).parent().children().removeClass('ui-state-hover').button("option", "disabled", false);
		};
		this.disable = function(_icon) {
			$jQ(this.jq).button("option", "icons", {
				primary : 'ui-icon-clock'
			}).parent().children().removeClass('ui-state-hover').button("option", "disabled", true);
		};
		this.uiicon = 'ui-icon-gear';
		this.menubutton = function(_label, _icon) {
			if(_icon) {
				this.uiicon = 'ui-icon-' + _icon;
			}
			var _scope = this;
			var _buttonid = 'CAGETool' + this.id;
			$jQ('#CAGEToolsContainer').append('<div class="CAGETool"><button id="' + _buttonid + '" class="CAGEToolButton ui-corner-left">' + _label + '</button></div>');
			$jQ(('#' + _buttonid)).button({
				icons : {
					primary : _scope.uiicon
				},
				disabled : true
			}).click(function() {
				_scope.start();
			}).removeClass('ui-corner-all');
		};
		this.start = null;
		// start tool
		this.work = null;
		// main work is done here
		this.finish = null;
		// clean up
	}

	function cageInitTools() {

		$jQ('#CAGESidebar').append($jQ('<div id="CAGEToolsContainer">').addClass('ui-corner-left'));
		$jQ.each(cage_tools, function(i, v) {
			if(v.init) {
				if(v.background) {
					cageDbg.info('Init tool: ' + v.id + ' (BG)');
					window.setTimeout(v.init, 1);
				} else {
					cageDbg.info('Init tool: ' + v.id);
					v.init();
				}
			}
		});
	}

	function cageWaitForTools(_callback) {

		var _init = false;
		$jQ.each(cage_tools, function(i) {
			if(!cage_tools[i].initiated) {
				cageProgress.runtime.max++;
				cageProgress.work();
				_init = true;
				console.log('wait');
				window.setTimeout(function() {cageWaitForTools(_callback);
				}, 100);
				return false;
			}
		});
		if(!_init) {
			_callback();
		}
	}

	/**
	 * cage_init_util.js
	 */
	// array of all utilities
	var cageUtils = {};

	function cage_util(_id) {
		cageUtils[_id] = this;
		this.id = _id;
		this.init = null;
		// do inital stuff if necessary
		this.cache = {};
		// save stuff
		this.work = null;
		// do stuff
	}

	function cageInitUtils() {

		$jQ.each(cageUtils, function(i, v) {
			cageDbg.info('Init util: ' + v.id);
			if(v.init) {
				v.init();
			}
		});
	}

	/**
	 *  German language data 2010/09/22
	 *
	 *  Editors: Unknowner
	 *
	 */
	if(CAGE.Settings.language == 'Deutsch') {

		var _lang = new LanguageData();

		_lang.Assist = 'Unterstützen';
		_lang.Stash = 'Gold bunkern';
		_lang.Eliteguard = 'Eliteguard füllen';

		CAGE.Settings.langData = _lang;

	}

	/**
	 * CSS
	 */
	var cageCSS = new cage_util('CSS');

	cageCSS.init = function() {

		var _css = '\n';
		// _css += '. {}\n';
		_css += '.CAGE {font-family:verdana;font-size:11px;}\n';
		_css += '.CAGEresults {background-image:url("http://image4.castleagegame.com/graphics/bg_main_middle.jpg");background-color:#d0b682;width:728px;border:1px solid #701919;padding:5px;}\n';
		_css += '.CAGESettingTop {font-weight:bold;font-size:16px;text-align:center;margin-bottom:20px;}\n';
		_css += '.CAGESettingHead {font-weight:bold;font-size:14px;font-style:italic;}\n';
		_css += '.CAGESetting {}\n';
		_css += '.CAGELoader {height: 80px! important;position: fixed! important;width: 80px ! important;z-index: 999! important;display: none;top: 30px !important;left: 5px !important;overflow: hidden;}\n';
		// navigation
		_css += '.CAGETopMenuItem {margin:-1px;}\n';
		_css += '.CAGETopMenuSubItems {position: absolute;border-top: 1px solid black;display: none;opacity: 0;margin-top: 1px;}\n';
		_css += '#CAGENavigation {height: 26px;top:0;position: fixed;z-index: 25;border-bottom: 1px solid #000;padding:2px 10px 1px;left: 0;right: 0;background:#333;}\n';
		_css += '.CAGETopMenuSubItem {display: block;width: 105%;text-align: left;margin: 0px;}\n';
		// notes
		_css += '#CAGENotes {z-index: 98;position: fixed;left: 0px;top: 100px;height: auto;width: auto;opacity: 0.9;}\n';
		_css += '.CAGENote {padding: 2px;border: 1px solid #AAA}\n';
		// sidebar
		_css += '#CAGESidebar {position: fixed;top: 60px; right:0;z-index:100;background:#333;}\n';
		_css += '#CAGEShowSidebar {float: right;width: 27px;height: 25px;margin-top: -1px;}\n';
		// tools
		_css += '#CAGEToolsMenu {float: right;width: 27px;height: 25px;margin-top: -1px;}\n';
		_css += '#CAGEToolsContainer {top: 265px;position: absolute;width: 215px;right: -1px;border: 1px solid #aaa;padding:10px 0 20px;background:#333;}\n';
		_css += '.CAGETool {height: 14px;display: inline-block;width: 198px;font-size: 11px;margin-left: 15px;margin-bottom: 5px;margin-top: 5px;position:relative;}\n';
		_css += '.CAGEToolButton {height:23px;width:200px;text-align:left;}\n';
		// stats
		_css += '#CAGEStatsContainer {top: 88px;position: absolute;width: 215px;right: -1px;height: 145px;border: 1px solid #AAA;padding: 10px 0;background:#333;}\n';
		_css += '.CAGEStat {height: 14px;display: inline-block;width: 198px;font-size: 11px;margin: 4px 0 4px 15px;position:relative;}\n';
		_css += '.CAGEStatsImage {position: absolute; bottom: -5px; left: -5px; height: 25px;}\n';
		_css += '.CAGEStatsTimer {position: absolute;right: 145px;}\n';
		_css += '.CAGEStatsValue {position: absolute;right: 10px;}\n';
		_css += '#CAGEStatsPoints {color: white;display: block;font-size: 25px;font-weight: bolder;left: -2px;position: absolute;text-align: center;text-shadow: yellow 0px 0px 10px, green 0px 0px 5px;top: -13px;width: 20px;}\n';
		//generals
		_css += '#CAGEGeneral {width: 215px;position: absolute;height: 66px;border: 1px solid #AAA;right: -1px;top: 10px;background:#333;}\n';
		_css += '#CAGECurrentGeneralImage {height: 50px;width: 50px;cursor: pointer;position: absolute;top: 7px;left: 7px;;border: 1px solid #AAA}\n';
		_css += '#CAGEGeneralsbar {z-index:3;position:fixed;top:74px;background-color:#000;padding:2px;right:-10000px;border: 1px solid #aaa; height: 54px;}\n';
		_css += '.CAGEFastGeneralsImage {height: 50px;width: 50px;cursor: pointer;margin: 2px;opacity:0.7;}\n';
		_css += '#CAGEAllGeneralsbar {z-index: 3;position: fixed;top: -300px;width: 694px;padding: 13px;left: 30px;}\n';
		_css += '#CAGEAllGenerals {z-index: 3;position: absolute;top: 7px;width: 150px;right: -1px;height: 24px;font-size: 12px;}\n';
		_css += '#CAGEAllGeneralsImages {background-color: black;border: 1px solid #AAA;height: 288px;margin-top: 3px;width: 465px;overflow: auto;padding: 3px;}\n';
		_css += '#CAGEAllGeneralsStats {background-color: #333;width: 186px;height: 267px;padding: 15px;border: 1px #AAA solid;right: 17px;position: absolute;}\n';
		_css += '#CAGEAllGeneralsSelected {border: 1px solid #AAA;margin-left: 12px;width: 160px;}\n';
		_css += '.CAGEAllGeneralsImage {height: 50px;cursor: pointer;border:1px solid #000;margin:2px;}\n';
		// opacity: 0.6;margin:3px;
		_css += '#CAGEAllGeneralsData {color:#aaa;margin-top:5px;}\n';
		/*// fb stuff
		 _css += '.CAGEfbblueBar {position: fixed !important; top: 0;z-index:24 !important;}\n';
		 _css += '.CAGEfbpageHead {position: fixed; top: 0; display: block; z-index: 25;}\n';
		 _css += '.CAGEfbContent {margin-top:-326px;}\n';
		 _css += '.CAGEfbcontentCol {background-color:#000 !important;}\n';
		 */
		$jQ('head').append('<style type="text/css"><!--\n' + _css + '\n--></style>');

	};
	/**
	 * Load Save data to Local Storage
	 */
	var cageData = new cage_util('data');

	//cageData.cache = {};

	cageData.save = function(_data) {

		cageDbg.info('Saving data for: ' + _data.id);
		localStorage.setItem('CAGE_' + CAGE.uid + '_' + _data.id, JSON.stringify(_data.cache));

	};

	cageData.load = function(_data, _default) {

		cageDbg.info('Loading data for: ' + _data.id);
		var _cache = localStorage.getItem('CAGE_' + CAGE.uid + '_' + _data.id);
		if(_cache === null) {
			return _default;
		} else {
			return JSON.parse(_cache);
		}

	};

	cageData.clear = function(_data) {

		localStorage.clear('CAGE_' + CAGE.uid + '_' + _data.id);

	};
	/**
	 * loader.js
	 */
	var cageLoader = new cage_util('loader');

	cageLoader.busy = false;

	cageLoader.init = function() {
		CastleAge.Loader = $jQ('#AjaxLoadIcon');
		CastleAge.Loader.addClass('CAGELoader').next('img:first').css('width', 60);

	};

	cageLoader.on = function() {

		CastleAge.Loader.fadeIn('slow');
		cageLoader.busy = true;

	};

	cageLoader.off = function() {

		CastleAge.Loader.fadeOut('slow');
		cageLoader.busy = false;

	};
	/**
	 * Info popup for tools
	 */
	var cageNote = new cage_util('Note');

	cageNote.init = function() {

		$jQ('<div id="CAGENotes">').appendTo(document.body);

	};

	cageNote.work = function(_message, _time) {

		cageDbg.info('Notify: ' + _message);
		var $_CAGENotify = $jQ('#CAGENotes');
		$_CAGENotify.prepend('<div class="ui-corner-right ui-state-default CAGENote CAGE">' + _message + '</div>').show('fast');
		window.setTimeout(function() {
			$_CAGENotify.children('div:last').hide('slow', function() {
				$_CAGENotify.children('div:last').remove();
				if($_CAGENotify.children('div').length === 0) {
					$_CAGENotify.css('height', 0).hide();
				}
			});
		}, _time ? _time : 8000);
	};
	/**
	 * cage_util_page.js
	 */
	var cagePage = new cage_util('page');

	cagePage.init = function() {

		// new CA page loaders
		cagePage.reassign();

	};

	cagePage.runtime = {};
	/**
	 * Store original func and replace with CAGE's
	 */
	cagePage.reassign = function() {
		get_cached_ajax = cagePage.get_cached_ajax;
		ajaxLinkSend = cagePage.ajaxLinkSend;
		ajaxFormSend = cagePage.ajaxFormSend;

	};

	cagePage.loadPage = function(_url, _type) {

		get_cached_ajax(_url, _type ? _type : 'get_body');

	};

	cagePage.ajaxLinkSend = function(div, url) {
		friend_browse_offset = 0;
		reset_raid_lst();
		pageCache = {};
		ajaxPerforming = true;

		showLoaderIfAjax();

		var params = 'ajax=1';

		if(!url) {
			url = 'index.php?adkx=2';
		}

		$.ajax({
			url : url,
			context : document.body,
			data : params,
			type : 'POST',
			success : function(data) {
				if(cageCAGE.cache.UseImageServer && cageCAGE.cache.ImageServer) {
					data = data.replace(/(http:\/\/image4\.castleagegame\.com\/graphics.*?)(?=\/\w*?\.\w{3})/g, cageCAGE.cache.ImageServer);
				}
				ajaxPerforming = false;
				$('#AjaxLoadIcon').hide();

				if(data.lastIndexOf('<fb:') == -1) {
					$('#' + div).html(data);
				} else {
					document.getElementById(div).innerHTML = data;
					FB.XFBML.parse(document.getElementById(div));
				}
				cagePage.loadDone(url, div);
				centerPopups();
			}
		});

		scrollToElement('#main_anchor');

	};

	cagePage.background = function(_url, _callback) {

		$jQ.get(_url, function(_data) {
			if(_callback) { _callback(_data);
			}
		});
	};

	cagePage.get_cached_ajax = function get_cached_ajax(url, get_type) {

		//just_body_cache
		var url_key = url;
		if(url.indexOf('?') != -1) {
			url_key = url.substring(0, url.indexOf('?'));
		}
		if(get_type == 'cache_body' && pageCache[url_key]) {
			if(pageCache[url_key].lastIndexOf('<fb:') == -1) {
				$('#app_body_container').html(pageCache[url_key]);
			} else {
				document.getElementById('app_body_container').innerHTML = data;
				FB.XFBML.parse(document.getElementById('app_body_container'));
			}
		} else {

			if(get_type == 'get_page') {
				stopTimers = true;
				pageCache[url_key] = null;
			} else if(get_type == 'destroy_all_get_page') {
				stopTimers = true;
				pageCache = {};
			}
			var params = 'ajax=1';
			if((get_type == 'cache_body') || (get_type == 'get_body')) {
				params += '&get_type=body';
			}
			ajaxPerforming = true;
			showLoaderIfAjax();

			$.ajax({
				url : url,
				context : document.body,
				data : params,
				type : 'POST',
				success : function(data) {
					if(cageCAGE.cache.UseImageServer && cageCAGE.cache.ImageServer.length > 0) {
						data = data.replace(/(http:\/\/image4\.castleagegame\.com\/graphics.*?)(?=\/\w*?\.\w{3})/g, cageCAGE.cache.ImageServer);
					}
					stopTimers = false;
					ajaxPerforming = false;
					$('#AjaxLoadIcon').hide();
					if((get_type == 'cache_body') || (get_type == 'get_body')) {

						if(data.lastIndexOf('<fb:') == -1) {
							$('#app_body_container').html(data);
						} else {
							document.getElementById('app_body_container').innerHTML = data;
							FB.XFBML.parse(document.getElementById('app_body_container'));
						}
						cagePage.loadDone(url);

					} else {

						if(data.lastIndexOf('<fb:') == -1) {
							$('#globalContainer').html(data);
						} else {
							document.getElementById('globalContainer').innerHTML = data;
							FB.XFBML.parse(document.getElementById('globalContainer'));
						}
						cagePage.loadDone(_url);
					}
					centerPopups();
				}
			});
		}
		scrollToElement('#main_anchor');
	};

	cagePage.ajaxFormSend = function(div, url, formElement, anchor) {
		friend_browse_offset = 0;
		reset_raid_lst();

		if(!anchor) {
			anchor = 'main_anchor';
		}
		stopTimers = true;
		params = $(formElement).serialize();
		params += '&ajax=1';
		pageCache = {};
		if(!url) {
			url = 'index.php?adkx=7';
		}
		ajaxPerforming = true;
		showLoaderIfAjax();

		$.ajax({
			url : url,
			context : document.body,
			data : params,
			type : 'POST',
			success : function(data) {
				if(cageCAGE.cache.UseImageServer && cageCAGE.cache.ImageServer.length > 0) {
					data = data.replace(/(http:\/\/image4\.castleagegame\.com\/graphics.*?)(?=\/\w*?\.\w{3})/g, cageCAGE.cache.ImageServer);
				}
				stopTimers = false;
				ajaxPerforming = false;
				$('#AjaxLoadIcon').hide();
				if(data.lastIndexOf('<fb:') == -1) {
					$('#' + div).html(data);
				} else {
					document.getElementById(div).innerHTML = data;
					FB.XFBML.parse(document.getElementById(div));
				}
				cagePage.loadDone(url, div);
				centerPopups();
			}
		});

		scrollToElement('#' + anchor);

	};

	cagePage.loadDone = function(_url, _div) {

		cage_pages['allPages'].script();
		cage_pages['allPages'].data();
		_url = _url.indexOf('?') == -1 ? _url : _url.substring(0, _url.indexOf('?'));
		cagePage.reassign();
		cageStats.reassign();
		cageStats.work();
		if(cage_pages[_url]) {
			if(cage_pages[_url].data) {
				cage_pages[_url].data();
			}
			if(cage_pages[_url].script) {
				cage_pages[_url].script();
			}
		}
		if(_div && _div === 'globalContainer') {
			$jQ('#CAGEStats_gold').text($jQ('#gold_current_value').text());
			$jQ('#CAGEStats_energy > span.current').text($jQ('#energy_current_value').text());
			$jQ('#CAGEStats_health > span.current').text($jQ('#health_current_value').text());
			$jQ('#CAGEStats_stamina > span.current').text($jQ('#stamina_current_value').text());
			$jQ('#CAGEStats_energy > span.max').text($jQ('#energy_current_value').next().text());
			$jQ('#CAGEStats_health > span.max').text($jQ('#health_current_value').next().text());
			$jQ('#CAGEStats_stamina > span.max').text($jQ('#stamina_current_value').next().text());
		}
		cageGenerals.changeToCurrent();
		$jQ('body, html').animate({
			scrollTop : 0
		}, 'slow');

	};
	/**
	 * Progressbar while initing CAGE
	 */
	var cageProgress = new cage_util('Progress');

	cageProgress.runtime = {

		max : 0,
		current : 0,
		value : 0

	};

	cageProgress.init = function() {

		$jQ.each(cage_tools, function(i, e) {
			cageProgress.runtime.max += e.progress;
		});
		cageProgress.runtime.max++;
		$jQ('<div>').attr({
			id : 'CAGEProgressBackground'
		}).css({
			'zIndex' : 20000,
			'position' : 'fixed',
			'right' : 0,
			'top' : 0,
			'height' : '100%',
			'width' : '100%',
			'background' : '#000'
		}).html('<span style="right:50%;position:fixed;font-size:20px;width:400px;margin-right:-200px;text-align:center;font-family:verdana;top:35%;color:#999;"><b>CAGE</b> - Castle Age Game Enhancer<br><br>enhancing...</span>').appendTo(document.body);
		$jQ('<div>').attr({
			id : 'CAGEProgressbar'
		}).css({
			'zIndex' : 20001,
			'position' : 'fixed',
			'right' : '50%',
			'top' : '30%',
			'marginRight' : -200,
			'height' : 20,
			'width' : 400
		}).appendTo($jQ('#CAGEProgressBackground'));
		$jQ('#CAGEProgressbar').progressbar({
			value : 0
		});
		window.setTimeout(function() {
			cageProgress.increase();
		}, 50);
	};

	cageProgress.work = function() {

		cageProgress.runtime.current++;

	};

	cageProgress.increase = function() {

		if(cageProgress.runtime.value < cageProgress.runtime.current / cageProgress.runtime.max * 100) {
			cageProgress.runtime.value++;
		}
		$jQ('#CAGEProgressbar').progressbar({
			value : cageProgress.runtime.value
		});
		if(cageProgress.runtime.value < 100) {
			window.setTimeout(function() {
				cageProgress.increase();
			}, 40);
		} else {
			window.setTimeout(function() {
				$jQ('#CAGEProgressbar, #CAGEProgressBackground').fadeOut('slow', function() {
					$jQ('#CAGEProgressbar, #CAGEProgressBackground').remove();
				});
			}, 400);
		}

	};
	/**
	 * Gets all stats from server
	 */
	var cageStats = new cage_util('stats');

	//cageStats.cache = {};

	//cageStats.runtime = {};

	cageStats.busy = false;

	cageStats.timer = null;

	cageStats.reassign = function() {
		gold_increase_ticker = cageStats.tickerGold;
		stat_increase_ticker = cageStats.tickerStats;

	};

	cageStats.init = function() {

		$jQ('body').append($jQ('<div id="CAGESidebar">').append($jQ('<div id="CAGEStatsContainer">').addClass('ui-corner-left').append($jQ('<div class="CAGEStat ui-widget ui-state-default">').append('<img class="CAGEStatsImage" src="http://image4.castleagegame.com/graphics/favor_clear.gif">').append('<span id="CAGEStats_gold" class="CAGEStatsValue"></span>').append('<span id="CAGEStatsTimer_gold" class="CAGEStatsTimer"></span>'))//stat_gold.gif
		.append($jQ('<div class="CAGEStat ui-widget ui-state-default">').append('<img class="CAGEStatsImage" src="http://image4.castleagegame.com/graphics/stat_energy.gif">').append('<span id="CAGEStats_energy" class="CAGEStatsValue"><span class="current"></span>/<span class="max"></span></span>').append('<span id="CAGEStatsTimer_energy" class="CAGEStatsTimer"></span>')).append($jQ('<div class="CAGEStat ui-widget ui-state-default">').append('<img class="CAGEStatsImage" src="http://image4.castleagegame.com/graphics/stat_health.gif">').append('<span id="CAGEStats_health" class="CAGEStatsValue"><span class="current"></span>/<span class="max"></span></span>').append('<span id="CAGEStatsTimer_health" class="CAGEStatsTimer"></span>')).append($jQ('<div class="CAGEStat ui-widget ui-state-default">').append('<img class="CAGEStatsImage" src="http://image4.castleagegame.com/graphics/stat_stamina.gif">').append('<span id="CAGEStats_stamina" class="CAGEStatsValue"><span class="current"></span>/<span class="max"></span></span>').append('<span id="CAGEStatsTimer_stamina" class="CAGEStatsTimer"></span>')).append($jQ('<div class="CAGEStat ui-widget ui-state-default ui-corner-left">').append('<span id="CAGEStatsPoints"></span><span id="CAGEStatsLevel" class="CAGEStatsValue"></span>'))));

		$jQ('#CAGEStats_gold').text($jQ('#gold_current_value').text());
		$jQ('#CAGEStats_energy > span.current').text($jQ('#energy_current_value').text());
		$jQ('#CAGEStats_health > span.current').text($jQ('#health_current_value').text());
		$jQ('#CAGEStats_stamina > span.current').text($jQ('#stamina_current_value').text());
		$jQ('#CAGEStats_energy > span.max').text($jQ('#energy_current_value').next().text());
		$jQ('#CAGEStats_health > span.max').text($jQ('#health_current_value').next().text());
		$jQ('#CAGEStats_stamina > span.max').text($jQ('#stamina_current_value').next().text());
		cageStats.start();
		cageStats.reassign();

	};

	cageStats.start = function(_callback) {

		if(cageStats.busy) {
			cageDbg.info('cageStats.start: currently busy...');
			window.setTimeout(function() {
				cageStats.start(_callback);
			}, 500);
		} else {
			cageDbg.info('cageStats.start: calling reader.');
			cageStats.busy = true;
			window.setTimeout(function() {
				cageStats.work(_callback);
			}, 1);
		}

	};

	cageStats.work = function(_callback) {

		var _con = $jQ('#globalContainer');
		var $_xp = $jQ('#st_2_5 strong:first', _con).html().split('/');
		var _temp = $jQ('#main_bntp span:contains("My Stats")', _con).html();
		$jQ('#CAGEStatsLevel').html($_xp[1] - $_xp[0] + ' XP to level ' + (parseInt($jQ('#st_5 div:contains("Level"):last', _con).html().match(/\d+/)[0], 10) + 1));
		$jQ('#CAGEStatsPoints').html(_temp.match(/\d+/) ? _temp.match(/\d+/)[0] : '');
		if(CastleAge.Guild === null) {
			$jQ.get('guild.php', function(data) {
				CastleAge.Guild = data.search(/tab_guild_current_battles/) == -1 ? false : true;
			});
		}
		if($jQ('input[name="bqh"]:first', _con).length > 0) {
			CastleAge.bqh = $jQ('input[name="bqh"]:first', _con).attr('value');
		}
		if(CastleAge.bqh === null) {
			cageDbg.info('Getting Castle Age stats from keep...');
			cagePage.background('keep.php?user=' + CAGE.uid, function(_data) {
				CastleAge.bqh = $jQ('input[name="bqh"]:first', _data).attr('value');
				cageStats.busy = false;
				if(_callback) {
					_callback();
				}
			});
		} else {
			cageStats.busy = false;
			if(_callback) {
				_callback();
			}
		}

	};

	cageStats.tickerGold = function(_ticks_left, _stat_current, _tick_time, _increase_value, _first_call) {

		cageStats.tickerStats(_ticks_left, _stat_current, 0, _tick_time, _increase_value, 'gold', _first_call);

	};

	cageStats.tickerStats = function(_ticks_left, _stat_current, _stat_max, _tick_time, _increase_value, _stat_type, _first_call) {

		if(!_first_call && stopTimers) {
			return;
		}

		if(timedStats[_stat_type] && _first_call) {
			window.clearTimeout(timedStats[_stat_type]);
		}

		if(_ticks_left <= 0) {
			_stat_current += _increase_value;
			_ticks_left = _tick_time;
		} else {
			_ticks_left -= 1;
		}
		switch (_stat_type) {

			case 'gold':

				if(cageStash.runtime && cageStash.runtime.stashed) {
					_stat_current = 0;
					cageStash.runtime.stashed = false;
				}
				if(_stat_current >= 0) {
					output_stat = _stat_current.toString();
					var _rgx = new RegExp('(\\d+)(\\d{3})', '');
					while(_rgx.test(output_stat)) {
						output_stat = output_stat.replace(_rgx, '$1,$2');
					}
					$jQ('#CAGEStats_gold').text("$" + output_stat);
				}
				$jQ('#CAGEStatsTimer_' + _stat_type).text(parseInt(_ticks_left / 60, 10) + ':' + ('0' + (_ticks_left % 60)).slice(-2));
				break;

			case 'guild_token':

				$jQ('#guild_token_current_value').text(_stat_current > _stat_max ? _stat_max : _stat_current);
				$jQ('#guild_token_time_value').text(parseInt(_ticks_left / 60, 10) + ':' + ('0' + (_ticks_left % 60)).slice(-2));
				break;

			default:

				if(_stat_type == 'health' && cageHeal.runtime.healed === true) {
					cageHeal.runtime.healed = false;
					_stat_current = _stat_max;
				}
				$jQ('#CAGEStats_' + _stat_type + ' span.current').text(_stat_current > _stat_max ? _stat_max : _stat_current);
				$jQ('#CAGEStats_' + _stat_type + ' span.max').text(_stat_max);
				if(_stat_max == _stat_current) {
					$jQ('#CAGEStatsTimer_' + _stat_type).text('');
					return;
				}
				$jQ('#CAGEStatsTimer_' + _stat_type).text(parseInt(_ticks_left / 60, 10) + ':' + ('0' + (_ticks_left % 60)).slice(-2));
				break;

		}
		timedStats[_stat_type] = window.setTimeout(function() {
			cageStats.tickerStats(_ticks_left, _stat_current, _stat_max, _tick_time, _increase_value, _stat_type, false);
		}, 1000);
	};
	/**
	 * Check if newer version was delivered
	 */
	var cageUpdate = new cage_util('Update');

	cageUpdate.init = function() {

		var _lastbuild = localStorage.getItem('CAGE_Build');
		var _update = false;
		var _text = '';
		var _head = '<b>CAGE - Castle Age Game Enhancer V' + CAGE.Version + ' build ' + CAGE.Build + ' ' + CAGE.Type + '</b><br><br>Your Castle Age experience is now enhanced!';
		if(_lastbuild === null || _lastbuild !== CAGE.Build) {
			localStorage.setItem('CAGE_Build', CAGE.Build);
			_text = '<br><b>CAGE just received an update, more infos on the <a href="http://cagenhancer.blogspot.com/search/label/last-update" target="_blank">Blog</a>.<b><br>';
		}
		var _foot = '<a href="http://cagenhancer.blogspot.com/" target="_blank">Blog</a> - <a href="http://caaplayer.freeforums.org/c-a-g-e-f29.html" target="_blank">Forum</a> - <a href="mailto:cageunknowner@gmail.com">Email</a>';
		var _msg = _head + '<br>' + _text + '<br>' + _foot;
		$jQ('#results_main_wrapper').prepend('<div class="results" style="text-align:center;background-image: url(&quot;http://image4.castleagegame.com/graphics/bg_main_middle.jpg&quot;); background-color: #d0b682; width: 728px;"><div class="result"><span class="result_body">' + _msg + '</span></div></div><br><br>');

	};
	/**
	 * Rework fast generals switch for quests
	 */
	new cage_page('alchemy.php');

	/*cage_pages['alchemy.php'].script = function() {

	 cageDbg.info('Reworking script: Alchemy');
	 $jQ('img.CAGEQuestSwitchGeneral').each(function(){
	 var _img = $jQ(this);
	 _img.click(function(){
	 _img.fadeOut();
	 cageGenerals.set(_img.prevAll('img').attr('title'));
	 _img.fadeIn();
	 });
	 });
	 //http://image4.castleagegame.com/2745/graphics/nogen.gif
	 };*/

	cage_pages['alchemy.php'].data = function() {

		cageDbg.info('Reworking data: Alchemy');
		$jQ('div.ingredientUnit img, div.recipeImgContainer, div.recipeImgContainer img').addClass('ui-corner-all');
		$jQ('div.recipeTitle').css('margin', '0');
		$jQ('div.alchemyRecipeBackMonster, div.alchemyRecipeBack, div.alchemyRecipeBackClass, div.alchemyQuestBack').css('height', 120);
		$jQ('div.alchemyRecipeBack_inc, div.alchemyRecipeBackMonster_inc, div.alchemyRecipeBackClass_inc, div.alchemyQuestBack_inc').css('padding', 0);
		$jQ('div.alchemyRecipeBackMonster table td').css('paddingTop', 0);

	};
	/**
	 * cage_Page_UICleaner.js
	 */
	new cage_page('allPages');

	cage_pages['allPages'].script = function() {

		// New results closing
		$jQ('div.results img[src$="help_close_x.gif"]').each(function(_index, _element) {
			var _href = $jQ(this).parent().attr('href');
			$jQ(_element).click(function() {
				$jQ.post(_href);
				$jQ(this).parents('div.results:first').hide('slow', function() {
					$jQ(this).remove();
				});
				$jQ(this).parents('div.results:first').next('br').hide();
			}).css('cursor', 'pointer');
			$jQ(_element).unwrap();
		});
		/*
		 $jQ('img.CAGETempRepeat').slideUp('fast', function(){$jQ(this).remove();});
		 var _img = null;
		 if($jQ('div.result input[src*="battle_invade_again"]:first').length > 0){
		 _img = $jQ('div.result input[src*="battle_invade_again"]:first');
		 } else if($jQ('div.result input[src*="battle_duel_again"]:first').length > 0){
		 _img = $jQ('div.result input[src*="battle_duel_again"]:first');
		 } else if ($jQ('div.result input[src*="quest_do"]:first').length > 0){
		 _img = $jQ('div.result input[src*="quest_do"]:first');
		 }
		 if (_img !== null) {
		 $jQ('#CAGESidebar').append($jQ('<img class="CAGETempRepeat" src="' + _img.attr('src') + '" >').css({
		 'position'	: 'fixed',
		 'top'		: 440,
		 'right'		: 120,
		 'width'		: 80,
		 'cursor'	: 'pointer',
		 'zIndex'	: -1
		 }).click(function(){
		 _img.click();
		 }).slideDown('slow')
		 );
		 }
		 */
	};

	cage_pages['allPages'].data = function() {

		$jQ('#globalContainer').css('marginTop', 31);
		$jQ('div.indexRightCol:has(img[src*="/newiphone_ad_facebook.jpg"])').remove();
		$jQ('#main_sts').hide();
		$jQ('#nvbar').hide();
		$jQ('#main_bntp').hide();
		$jQ('#main_bn').hide();
		$jQ('#main_bn_container').hide();

	};
	/**
	 * Reworks army page accept gift links
	 */
	new cage_page('army.php');

	cage_pages['army.php'].script = function() {

		cageDbg.info('Reworking script: Army');
		// http://apps.facebook.com/castle_age/gift_accept.php?act=acpt&rqtp= gift&uid=
		var _con = $jQ('#globalContainer');
		$_ids = $jQ('a:contains("Accept")', _con).parent('div').prev('div').find('a');
		$_links = $jQ('a:contains("Accept")', _con);
		$jQ.each($_ids, function(_index, _element) {
			$jQ($_links[_index]).attr('href', '#', _con).click(function() {
				$jQ('#app_body div.messages', _con).fadeTo('slow', 0.5).find('div:eq(1)').append('<img style="position:absolute;left:50%;margin-left:-40px;top:75px;" src="' + CastleAge.Loader.find('img').attr('src') + '" >');
				$jQ.post('gift_accept.php?act=acpt&rqtp=gift&uid=' + /\d+/.exec($jQ(_element).attr('href')), function() {
					$jQ.get('army.php', function(_data) {
						if($jQ('#app_body div.messages', _data).length > 0) {
							$jQ('#app_body div.messages', _con).html($jQ('#app_body div.messages', _data).html()).fadeTo('slow', 1);
							cageArmy.script();
						} else {
							$jQ('#app_body div.messages', _con).hide('slow', function() {
								$jQ(this).remove();
							});
						}
					});
				});
				//cagePage.work('gift_accept.php?act=acpt&rqtp=gift&uid=' + /\d+/.exec($jQ(_element).attr('href')), 'get_body');
				//$jQ('http://apps.facebook.com/castle_age/gift_accept.php?act=acpt&rqtp=gift&uid=' + /\d+/.exec($jQ(_element).attr('href'))
				//$jQ(_element).closest('div[style*="width: 240px; height: 50px;"]').hide('slow');
			});
		});
	};
	/*
	cage_pages['army.php'].data = function(_data) {

	};
	*//**
	 * Rework fast generals switch for quests
	 */
	new cage_page('festival_guild_battle.php');

	/*cagePageFestivalGuildBattle.script = function() {

	 cageDbg.info('Reworking script: Guild Battle');

	 };*/

	cage_pages['festival_guild_battle.php'].data = function() {

		cageDbg.info('Reworking data: Guild Battle');
		var _your = (1 - ($jQ('div[style*="/guild_battle_bar_you.gif"]').width() / $jQ('div[style*="/guild_battle_bar_you.gif"]').parent().width())) * 100;
		var _enemy = (1 - ($jQ('div[style*="/guild_battle_bar_enemy.gif"]').width() / $jQ('div[style*="/guild_battle_bar_enemy.gif"]').parent().width())) * 100;
		var $_your = $jQ('#guild_battle_health span:contains("/"):first');
		var $_enemy = $jQ('#guild_battle_health span:contains("/"):last');
		if($jQ('#guild_battle_health span:contains("/")').length === 2) {
			$_your.html($_your.html() + ' (' + _your.toFixed(1) + '%)');
		}
		$_enemy.html($_enemy.html() + ' (' + _enemy.toFixed(1) + '%)');
		$_enemy = $jQ('span.result_body div[style*="width: 285px;"]:last');
		if($_enemy.length > 0) {
			var _target = $jQ('span.result_body input[name="target_id"]').attr('value');
			var _health = /Health:\s*(\d+)\/\d+/.exec($jQ('#enemy_guild_battle_section_battle_list img[src*="' + _target + '"]').parents('div').eq(2).text())[1];
			$_enemy.html($_enemy.html() + ' (' + _health + ')');
		}
		var _tokens = $jQ('div.result div:contains("-1 Battle Tokens"):last');
		_tokens.text(_tokens.text() + ' (' + $jQ('#guild_token_current_value').text() + ' left)');

	};
	/**
	 * Interact with Generalsbar when choosing general via CA-page
	 */
	new cage_page('generals.php');

	cage_pages['generals.php'].script = function() {

		cageDbg.info('Reworking script: Generals');
		var _present = {};
		$jQ.each(cageGenerals.cache, function(_index, _general) {
			_present[_general.item] = true;
		});
		$jQ('div.generalSmallContainer2 button[id^="CAGEGeneral_"]').each(function(i, e) {
			var $_this = $jQ(this);
			var _img = $_this.next('div').find('input.imgButton:first').attr('src');
			var _item = $_this.parent().find('input[name="item"]').attr('value');
			var _itype = $_this.parent().find('input[name="itype"]').attr('value');
			$_this.button({
				icons : {
					primary : $jQ('#CAGEFastGeneral_' + _item).length === 1 ? 'ui-icon-minus' : 'ui-icon-plus'
				}
			}).css({
				'height' : 26,
				'border' : '1px solid #fff',
				'marginLeft' : 6,
				'marginTop' : 1,
				'position' : 'absolute',
				'width' : 32,
				'zIndex' : 2
			}).click(function() {
				if($jQ('#CAGEFastGeneral_' + _item).length === 0) {//($_this.attr('isset') == 'false') {
					// Save selected general
					$_this.button('option', 'icons', {
						primary : 'ui-icon-minus'
					});
					cageGenerals.cache.push({
						item : _item,
						itype : _itype
					});
					cageData.save(cageGenerals);
					cageGenerals.AddToBar(_item, _itype);
				} else {
					$_this.button('option', 'icons', {
						primary : 'ui-icon-plus'
					});
					// remove general from saved data
					$jQ.each(cageGenerals.cache, function(_index, _general) {
						if(_general && _general.hasOwnProperty('image')) {
							delete _general.image;
						}
						if(_general && _general.hasOwnProperty('attack')) {
							delete _general.attack;
						}
						if(_general && _general.hasOwnProperty('defense')) {
							delete _general.defense;
						}
						if(_general && _general.hasOwnProperty('text')) {
							delete _general.text;
						}
						if(_general && _general.item == _item) {
							cageGenerals.cache.splice(_index, 1);
						}
					});
					cageData.save(cageGenerals);
					$jQ('#CAGEFastGeneral_' + _item).remove();
				}
			});
		});
	};

	cage_pages['generals.php'].data = function() {

		cageDbg.info('Reworking data: Generals');
		$jQ('#generalContainerBox2 div.generalSmallContainer2 div.general_pic_div3').each(function(i, e) {
			$jQ(e).prepend($jQ('<button id="CAGEGeneral_' + $jQ(e).find('input[name="item"]').attr('value') + '">'));
		});
		cageGenerals.getGenerals($jQ('body'));

	};
	/**
	 * Rework send gift page
	 */

	var cageGift = new cage_page('gift.php');
	/*
	 cage_pages['gift.php'].script = function() {

	 cageDbg.info('Reworking script: Gift');
	 $jQ('#giftContainer div[id^="gift"] img').each(function(_index){
	 $jQ(this).click(function(){
	 $jQ('div.request_form form').attr('action','gift_accept.php?act=create&gift=' + (_index + 1));
	 });
	 });

	 };
	 */
	cage_pages['gift.php'].data = function(_data) {

		cageDbg.info('Reworking data: Gift');
		$jQ('div.show_extra_link > a').attr('onclick', '$(\'#giftContainer\').addClass(\'show_extra\'); return false;');

	};
	/**
	 * Rework fast generals switch for quests
	 */
	var cagePageGuildBattle = new cage_page('guild_battle.php');

	/*cage_pages['guild_battle.php'].script = function() {

	 cageDbg.info('Reworking script: Guild Battle');

	 };*/

	cage_pages['guild_battle.php'].data = function() {

		cageDbg.info('Reworking data: Guild Battle');
		//add percentage to health bars
		var _your = (1 - ($jQ('div[style*="/guild_battle_bar_you.gif"]').width() / $jQ('div[style*="/guild_battle_bar_you.gif"]').parent().width())) * 100;
		var _enemy = (1 - ($jQ('div[style*="/guild_battle_bar_enemy.gif"]').width() / $jQ('div[style*="/guild_battle_bar_enemy.gif"]').parent().width())) * 100;
		var $_your = $jQ('span:contains("YOUR GUILD")');
		var $_enemy = $jQ('span:contains("ENEMY\'S GUILD")');
		$_your.html($_your.html() + ' (' + _your.toFixed(1) + '%)');
		$_enemy.html($_enemy.html() + ' (' + _enemy.toFixed(1) + '%)');
		$_enemy = $jQ('span.result_body div[style*="width: 285px;"]:last');
		if($_enemy.length > 0) {
			var _target = $jQ('span.result_body input[name="target_id"]').attr('value');
			var _health = /Health:\s*(\d+)\/\d+/.exec($jQ('#enemy_guild_battle_section_battle_list img[src*="' + _target + '"]').parents('div').eq(2).text())[1];
			$_enemy.html($_enemy.html() + ' (' + _health + ')');
		}
		//resize top image
		$jQ('#guild_battle_banner_section').css('height', 190).find('div').eq(5).css('marginTop', 0);
		$jQ('div:contains("The Battle Between"):last').parent().css('marginTop', 20);
		$jQ('input[src*="collect_reward_button2.jpg"]').parents('div:eq(2)').css('marginTop', 0);
		//add current tokens to result
		var _tokens = $jQ('div.result div:contains("-1 Battle Tokens"):last');
		_tokens.text(_tokens.text() + ' (' + $jQ('#guild_token_current_value').text() + ' left)');

	};
	/**
	 * Display enemy health percentage
	 */
	new cage_page('guild_battle_monster.php');

	/*cage_pages['guild_battle_monster.php'].script = function() {

	 cageDbg.info('Reworking script: Guild Battle');

	 };*/

	cage_pages['guild_battle_monster.php'].data = function(_data) {

		cageDbg.info('Reworking data: Guild Battle Monster');
		var _health = 100 - $jQ('span.result_body div[style*="guild_battle_bar_health.gif"]:first').height();
		var $_player = $jQ('span.result_body div[style*="width: 285px;"]:first');
		$_player.html($_player.html() + ' (' + _health + '%)');
		_health = 100 - $jQ('span.result_body div[style*="guild_battle_bar_health.gif"]:last').height();
		var $_enemy = $jQ('span.result_body div[style*="width: 285px;"]:last');
		$_enemy.html($_enemy.html() + ' (' + _health + '%)');

	};
	/**
	 * cage_Page_Keep.js
	 */
	new cage_page('keep.php');

	cage_pages['keep.php'].script = function() {

		cageDbg.info('Reworking script: Keep');
		$jQ('div.statsTTitle').toggle(function() {
			$jQ(this).parents('div.statsT2:first').css('height', '');
		}, function() {
			$jQ(this).parents('div.statsT2:first').css('height', 30);
		});
	};

	cage_pages['keep.php'].data = function(data) {

		cageDbg.info('Reworking data: Keep');
		var _con = $jQ('#globalContainer');
		// folding units, items ...
		$jQ('div.statsT2:has(div.statsTTitle)').css({
			'height' : 30,
			'overflow' : 'hidden',
			'cursor' : 'pointer'
		});
		// Some more stats, like BSI, LSI...	keep_attribute_section
		var _lvl = $jQ('#st_5 div:contains("Level"):last').text();
		if(_lvl) {
			_lvl = parseInt(_lvl.match(/\d+/)[0], 10);
			var _stats = $jQ('div.keep_attribute_section');
			var _eng = parseInt($jQ('div.attribute_stat_container:eq(0)', _stats).text(), 10);
			var _sta = parseInt($jQ('div.attribute_stat_container:eq(1)', _stats).text(), 10);
			var _att = parseInt($jQ('div.attribute_stat_container:eq(2)', _stats).text(), 10);
			var _def = parseInt($jQ('div.attribute_stat_container:eq(3)', _stats).text(), 10);
			var _bsi = Math.round((_att + _def) / _lvl * 100) / 100;
			var _lsi = Math.round((_eng + _sta * 2) / _lvl * 100) / 100;
			var _tsi = _bsi + _lsi;

			$jQ('div.keep_healer_section', _con).prepend($jQ('<div>').css({
				'backgroundColor' : '#000',
				'marginLeft' : 26,
				'marginTop' : -232,
				'opacity' : 0.8,
				'color' : 'white',
				'textAlign' : 'left',
				'padding' : 10,
				'height' : 204,
				'width' : 180
			}).html('BSI: ' + _bsi.toFixed(2) + '<br><span style="font-size:9px;">Battle Strength Index</span><br>LSI: ' + _lsi.toFixed(2) + '<br><span style="font-size:9px;">Levelling Speed Index</span><br>TSI: ' + _tsi.toFixed(2) + '<br><span style="font-size:9px;">Total Skillpoints per Level</span><br>'));
		}
	};
	/**
	 * cage_util_page_land.js
	 */
	var cagePageLand = new cage_page('land.php');

	cage_pages['land.php'].script = function() {
		cageDbg.info('Reworking script: Land');
		$jQ('div.mContT1').parent().hover(function() {
			$jQ(this).css('cursor', 'pointer');
		}, function() {
			$jQ(this).css('cursor', 'default');
		}).toggle(function() {
			$jQ(this).css({
				'height' : 6,
				'overflow' : 'hidden'
			});
		}, function() {
			$jQ(this).css('height', null);
		});
	};

	cage_pages['land.php'].data = function() {

		cageDbg.info('Reworking data: Land');
		var _con = $jQ('#globalContainer');
		$jQ('#app46755028429_section_land > div', _con).each(function(i, e) {
			var _income = $jQ('strong.gold', this).eq(0).text();
			if(_income) {
				_income = (_income.match(/\d+/g)).join('');
			}
			var _cost = $jQ('strong.gold', this).eq(1).text();
			if(_cost) {
				_cost = (_cost.match(/\d+/g)).join('');
			}
			if(_cost && _income) {
				var _roi = ((_income / _cost) * 100).toFixed(4) + '%';
				// Land ROI
				$jQ('#app46755028429_section_land img', this).eq(i).parent().append('<span style="float: left;">ROI:</span><span style="float: right;"> ' + _roi + '</span>');
				// Retrieve costs from keep
				$jQ('div.land_buy_costs', this).prepend('<a href="#" style="width:20px;display:inline;position:absolute;left:482px;height:25px;"> </a>').children().first().click(function() {
					var _amount = $jQ(this).next().find('select[name="amount"]').val();
					$jQ.get('/keep.php', function(data) {
						var _bqh = $jQ('input:hidden[name="bqh"]', data).attr('value');
						data = null;
						$jQ.get('keep.php?do=Retrieve&get_gold=' + _cost * _amount + 'bqh=' + _bqh, function(data) {
							$jQ('#st_2_1').html($jQ('#st_2_1', data).html());
						});
					});
				});
			}
		});
		$jQ('#app46755028429_section_special_land > div', _con).each(function(i, e) {
			var _income = $jQ('div.land_buy_info2 strong.gold', this).html();
			if(_income) {
				_income = (_income.match(/\d+/g)).join('');
			}
			var _cost = $jQ('div.land_buy_costs strong.gold', this).html();
			if(_cost) {
				_cost = (_cost.match(/\d+/g)).join('');
			}
			if(_cost && _income) {
				var _roi = ((_income / _cost) * 100).toFixed(4) + '%';
				// Unique land ROI + Pos fix
				$jQ('div.land_buy_image2', this).attr('style', 'margin: 11px 0pt -11px 10px;').append('<div style="display: block; position: relative; top: -20px; left: 15px; width: 120px; color: rgb(255, 255, 255); text-shadow: 1px 1px 1px rgb(0, 0, 0);"><span style="float: left;">ROI:</span><span style="float: right;"> ' + _roi + '</span></div>');

				// Unique land info
				$jQ('div.land_buy_info2', this).attr('style', 'margin:15px -13px -15px 4px;');

				// Retrieve costs from keep
				$jQ('div.land_buy_costs', this).prepend('<a href="#" style="width:20px;display:inline;position:absolute;left:482px;height:25px;"> </a>').children().first().click(function() {
					var _amount = $jQ(this).next().find('select[name="amount"]').val();
					$jQ.get('keep.php?do=Retrieve&get_gold=' + _cost * _amount + '&bqh=' + CastleAge.bqh, function(data) {
						$jQ('#st_2_1').html($jQ('#st_2_1', data).html());
					});
				});
			}
		});
	};
	/**
	 * cage_page_livefeed.js
	 */
	new cage_page('army_news_feed.php');

	cage_pages['army_news_feed.php'].script = function() {

		cageDbg.info('Reworking script: army_news_feed');
		$jQ('a[href*="doObjective"]').each(function() {
			var _link = jQuery(this).attr('href');
			$jQ(this).prev().css('cursor', 'pointer').click(function() {
				cagePage.loadPage(_link.replace(/&action=doObjective/, '').replace(/http:\/\/apps.facebook.com\/castle_age\//, ''), false);
			});
		});
	};

	cage_pages['army_news_feed.php'].data = function(_data) {

		cageDbg.info('Reworking data: army_news_feed');
		$jQ('a[href*="doObjective"]').each(function() {
			var _link = jQuery(this).attr('href');
			$jQ(this).before($jQ('<div style="float:right;position:absolute;margin-top:106px;right:52px;cursor:pointer;"><img style="width:80px;height:38px;" src="http://image4.castleagegame.com/graphics/dragon_list_btn_4.jpg"></div>'));
		});
	};
	/**
	 * Rework fast generals switch for quests
	 */
	new cage_page('monster_quests.php');

	cage_pages['monster_quests.php'].script = function() {

		cageDbg.info('Reworking script: MonsterQuests');
		$jQ('img.CAGEQuestSwitchGeneral').each(function() {
			var _img = $jQ(this);
			_img.click(function() {
				_img.fadeOut();
				cageGenerals.set(_img.prevAll('img').attr('title'));
				_img.fadeIn();
			});
		});
	};

	cage_pages['monster_quests.php'].data = function() {

		cageDbg.info('Reworking data: MonsterQuests');
		$jQ('div.quest_act_gen').each(function() {
			$jQ(this).append($jQ('<img class="CAGEQuestSwitchGeneral" src="http://image4.castleagegame.com/graphics/quick_switch_button.gif">').css({
				'marginTop' : -17,
				'position' : 'absolute',
				'width' : 78,
				'cursor' : 'pointer'
			})).find('img:first').unwrap();
		});
	};
	/**
	 * Rework fast generals switch for quests
	 */
	new cage_page('quests.php');

	cage_pages['quests.php'].script = function() {

		cageDbg.info('Reworking script: Quests');
		$jQ('img.CAGEQuestSwitchGeneral').each(function() {
			var _img = $jQ(this);
			_img.click(function() {
				_img.fadeOut();
				cageGenerals.set(_img.prevAll('img').attr('title'));
				_img.fadeIn();
			});
		});
		//http://image4.castleagegame.com/2745/graphics/nogen.gif
	};

	cage_pages['quests.php'].data = function() {

		cageDbg.info('Reworking data: Quests');
		$jQ('div.quest_act_gen:not(:has(img[src*="nogen.gif"]))').each(function() {
			$jQ(this).append($jQ('<img class="CAGEQuestSwitchGeneral" src="http://image4.castleagegame.com/graphics/quick_switch_button.gif">').css({
				'marginTop' : -17,
				'position' : 'absolute',
				'width' : 78,
				'cursor' : 'pointer'
			})).find('img:first').unwrap();
		});
	};
	/**
	 * Rework fast generals switch for quests
	 */
	new cage_page('symbolquests.php');

	cage_pages['symbolquests.php'].script = function() {

		cageDbg.info('Reworking script: Symbolquests');
		$jQ('img.CAGEQuestSwitchGeneral').each(function() {
			var _img = $jQ(this);
			_img.click(function() {
				_img.fadeOut();
				cageGenerals.set(_img.prevAll('img').attr('title'));
				_img.fadeIn();
			});
		});
	};

	cage_pages['symbolquests.php'].data = function(_data) {

		cageDbg.info('Reworking data: Symbolquests');
		$jQ('div.quest_act_gen').each(function() {
			$jQ(this).append($jQ('<img class="CAGEQuestSwitchGeneral" src="http://image4.castleagegame.com/graphics/quick_switch_button.gif">').css({
				'marginTop' : -17,
				'position' : 'absolute',
				'width' : 78,
				'cursor' : 'pointer'
			})).find('img:first').unwrap();
		});
	};
	/**
	 * assister.js - Assist CTAs from Userpage, Livefeed, Guildfeed and HTML source
	 */
	var cageAssister = [];
	//new cage_tool('Assister');

	cageAssister.progress = 1;

	cageAssister.cache = cageData.load(cageAssister, {

		MaxStamina : 10,
		Livefeed : true,
		Guildfeed : true,
		CommentMonster : true,
		MonsterText : '[NUM] for [NAME]',
		CommentCTA : true,
		CTAText : '[NUM]',

		User : true,
		Users : []

	});

	cageAssister.runtime = {

		Stamina : 0,
		Assists : 0,
		Assisted : [],
		CTA : [],
		AssistFor : []

	};

	cageAssister.settings = {
		/*
		 *

		 */
		head : CAGE.Settings.langData.Assist,
		items : [{
			type : 'text',
			size : 4,
			label : CAGE.Settings.langData.AssistMaxStamina,
			cache : 'MaxStamina'
		}, {
			type : 'bool',
			label : CAGE.Settings.langData.AssistGuildfeed,
			cache : 'Guildfeed'
		}, {
			type : 'bool',
			label : CAGE.Settings.langData.AssistLivefeed,
			cache : 'Livefeed'
		}, {
			type : 'bool',
			label : CAGE.Settings.langData.AssistCommentMonster,
			cache : 'CommentMonster'
		}, {
			type : 'text',
			size : 50,
			label : CAGE.Settings.langData.AssistMonsterText,
			cache : 'MonsterText'
		}, {
			type : 'bool',
			label : CAGE.Settings.langData.AssistCommentCTA,
			cache : 'CommentCTA'
		}, {
			type : 'text',
			size : 50,
			label : CAGE.Settings.langData.AssistCommentText,
			cache : 'CTAText'
		}]

	};

	cageAssister.init = function() {

		//cageAssister.menubutton(CAGE.Settings.langData.Assist);
		cageProgress.work();
		cageAssister.enable();
		cageAssister.initiated = true;

	};

	cageAssister.start = function() {

		cageDbg.info('cageAssister.start');
		cageAssister.disable();
		if(parseInt($jQ('#stamina_current_value').text(), 10) > 0) {
			cageAssister.runtime.AssistFor = [];
			if(cageAssister.cache.Livefeed) {
				cageAssister.runtime.AssistFor.push(cageAssister.Livefeed);
			}
			if(cageAssister.cache.Guildfeed) {
				cageAssister.runtime.AssistFor.push(cageAssister.Guildfeed);
			}
			if(cageAssister.cache.User && cageAssister.cache.Users.length > 0) {
				cageAssister.runtime.AssistFor.push(cageAssister.User);
			}
			cageAssister.getCTA();
		} else {
			cageNote.work(CAGE.Settings.langData.AssistNoStamina);
		}
	};

	cageAssister.getCTA = function() {

		if(cageAssister.runtime.AssistFor.length > 0) {
			cageAssister.runtime.AssistFor.pop()();
		} else {
			cageAssister.work();
		}

	};
	cageAssister.Guildfeed = function() {

		cageDbg.info('cageAssister.Guildfeed');
		cagePage.background('guild.php', function(data) {
			$jQ('div.guild_news_feed_container', data).each(function(i, e) {
				var _href = $jQ('a[href*="action=doObjective"]', e).attr('href');
				if(_href) {
					cageAssister.runtime.CTA.push({
						MonsterLink : _href,
						UID : $jQ('*[uid]:first', e).attr('uid'),
						Username : $jQ('a:first', e).text()
					});
				}
			});
			cageAssister.getCTA();
		});
	};

	cageAssister.Livefeed = function() {

		cageDbg.info('cageAssister.Livefeed');
		cagePage.background('army_news_feed.php', function(data) {
			$jQ('div.show_monster > a[href*="action=doObjective"]', data).each(function(i, e) {
				var _href = $jQ(e).attr('href');
				cageAssister.runtime.CTA.push({
					MonsterLink : _href,
					UID : $jQ('*[uid]:first', $jQ(e)).attr('uid'),
					Username : /(?:[You|Your] friend )(.*)(?: has requested your help)/.exec($jQ(e).text())[1]
				});
			});
			cageAssister.getCTA();
		});
	};

	cageAssister.User = function(_index) {

		cageDbg.info('cageAssister.User');
		_index = _index ? _index : 0;
		var _user = cageAssister.cache.Users[_index];
		$jQ.get('party.php?casuser=' + _user, function(data) {
			cageDbg.info('name: ' + $jQ('img[uid="' + _user + '"]:first', data).attr('alt'));
			var _name = $jQ('img[uid="' + _user + '"]:first', data).attr('alt').split(' ')[0];
			$jQ('div.streamImg > a', data).each(function() {
				var _href = jQuery(this).attr('href');
				if(_href.match(/action=doObjective/) !== null) {
					cageAssister.runtime.CTA.push({
						MonsterLink : _href,
						UID : _user,
						Username : _name
					});
				}
			});
			if(cageAssister.cache.Users.length == (_index + 1)) {
				cageAssister.getCTA();
			} else {
				cageAssister.User(_index + 1);
			}
		});
	};

	cageAssister.Facebook = function() {

		cageDbg.info('cageAssister.Facebook');
		cageAssister.work();

	};

	cageAssister.Source = function() {

		cageDbg.info('cageAssister.Source');
		cageAssister.work();

	};

	cageAssister.Assist = function(_cta) {

		cagePage.background(_cta.MonsterLink.replace('http://apps.facebook.com/castle_age/', ''), function(_monsterdata) {
			var _num = $jQ('span.result_body', _monsterdata).text();
			if(_num !== null && _cta.UID !== CAGE.uid && _num.match(/\d+(?:st|nd|rd|th)/) !== null) {
				cageAssister.runtime.Stamina += 1;
				$jQ('#stamina_current_value').text($jQ('#stamina_current_value').text() - 1);
				cageAssister.runtime.Assisted.push(_cta.MonsterLink);
				cageNote.work(CAGE.Settings.langData.AssistedFor.replace(/\[NAME\]/g, _cta.Username));
				cageAssister.runtime.Assisted.push(_cta);
				_num = _num.match(/\d+(?:st|nd|rd|th)/);
				if(cageAssister.cache.CommentMonster) {
					cageAssister.CommentMonster(_cta, _num[0]);
				} else if(cageAssister.cache.CommentCTA) {
					cageAssister.CommentCTA(_cta, _num[0]);
				} else {
					cageAssister.work();
				}
			} else {
				cageAssister.work();
			}
		});
	};

	cageAssister.CommentMonster = function(_cta, _num) {

		$jQ.post(_cta.MonsterLink + '&action=commentDragon&text=' + cageAssister.cache.MonsterText.replace(/\[NUM\]/g, _num).replace(/\[NAME\]/g, _cta.Username), function() {
			if(cageAssister.cache.CommentCTA) {
				cageAssister.CommentCTA(_cta, _num);
			} else {
				cageAssister.work();
			}
		});
	};

	cageAssister.CommentCTA = function(_cta, _num) {

		var _tempID = 'CAGETemp' + Date.parse((new Date()));
		$jQ('body').append('<div id="' + _tempID + '" style="display:none;">');
		var $_temp = $jQ('#' + _tempID);
		cagePage.background('party.php?user=' + _cta.UID, function(_userdata) {
			var _postid = $jQ('div.streamContainer:has([href*="' + _cta.MonsterLink + '"]) input[name="like_recent_news_post_id"]', _userdata).attr('value');
			var _fbid = /(?:_)(\d+)/.exec(_postid)[1];
			$jQ.get('http://apps.facebook.com/permalink.php?story_fbid=' + _fbid + '&id=' + _cta.UID, function(_feed) {
				var $_form = $jQ('div.storyContent', _feed);
				if($_form.length > 0) {
					$_temp.html($_form.html());
					var _text = cageAssister.cache.CTAText.replace(/\[NUM\]/g, _num).replace(/\[NAME\]/g, _cta.Username);
					$jQ('button.like_link', $_temp).click();
					window.setTimeout(function() {
						window.setTimeout(function() {
							$jQ('textarea.enter_submit', $_temp).val(_text);
							window.setTimeout(function() {
								$jQ('input.enter_submit_target', $_temp).click();
								window.setTimeout(function() {
									$_temp.remove();
								}, 250);
								cageAssister.work();
							}, 250);
						}, 1000);
						$jQ('textarea.enter_submit', $_temp).focus();
					}, 250);
				} else {
					cageAssister.work();
				}
			});
		});
	};

	cageAssister.work = function() {

		cageDbg.info('cageAssister.work...');
		if(parseInt($jQ('#stamina_current_value').text(), 10) > 0 && cageAssister.runtime.CTA.length > 0 && cageAssister.runtime.Stamina < cageAssister.cache.MaxStamina) {
			var _cta = cageAssister.runtime.CTA.pop();
			if(cageAssister.runtime.Assisted.length === 0 || $jQ.inArray(_cta.MonsterLink, cageAssister.runtime.Assisted) === -1) {
				cageAssister.Assist(_cta);
			} else {
				cageAssister.work();
			}
		} else {
			cageAssister.finish();
		}

	};

	cageAssister.finish = function() {

		cageDbg.info('cageAssister.finish');
		cageAssister.runtime.Assisted = [];
		cageAssister.runtime.Stamina = 0;
		cageAssister.enable();

	};
	/**
	 * Fill ELiteguard
	 */
	var cageCAGE = new cage_tool('CAGE');

	cageCAGE.cache = cageData.load(cageCAGE, {

		Beta : false,
		UseImageServer : false,
		ImageServer : ''

	});

	cageCAGE.runtime = {};

	cageCAGE.settings = {

		head : CAGE.Settings.langData.CAGE,
		items : [{
			type : 'bool',
			label : CAGE.Settings.langData.CAGEBetaBuild,
			cache : 'Beta'
		}, {
			type : 'bool',
			label : CAGE.Settings.langData.CAGEUseImageServer,
			cache : 'UseImageServer'
		}, {
			type : 'text',
			size : 256,
			label : CAGE.Settings.langData.CAGEImageServer,
			cache : 'ImageServer'
		}]

	};

	cageCAGE.init = function() {

		cageCAGE.initiated = true;

	};
	/**
	 * New top nav bar for CA
	 */
	cageCAMenubar = new cage_tool('Navigation');

	cageCAMenubar.background = true;

	cageCAMenubar.progress = 1;

	cageCAMenubar.cache = {

		timeouts : [],
		menuItems : {
			'Home' : {
				url : 'index.php',
				items : {
					'Crusaders' : {
						url : 'specialmembership.php'
					}
				}
			},
			'Festival' : {
				url : 'festival_home.php',
				items : {
					'Battle' : {
						url : 'festival_battle_home.php'
					},
					'Monster Tower' : {
						url : 'festival_tower.php',
						type : 'get_body'
					},
					'Monster List' : {
						url : 'festival_tower.php?tab=monster',
						type : 'get_body'
					},
					'Games' : {
						url : 'festival_games.php',
						type : 'get_body'
					},
					'Feats' : {
						url : 'festival_feat_nav.php'
					},
					'Quests' : {
						url : 'festival_quests.php'
					}
				}
			},
			'Quests' : {
				url : 'quests.php',
				items : {
					'Demi Quests' : {
						url : 'symbolquests.php'
					},
					'Atlantis' : {
						url : 'monster_quests.php'
					}
				}

			},
			'Battle' : {
				url : 'battle.php',
				type : 'get_body',
				items : {
					'Battle Rank' : {
						url : 'battlerank.php'
					},
					'War Rank' : {
						url : 'war_rank.php'
					},
					'War Council' : {
						url : 'war_council.php'
					},
					'Raid' : {
						url : 'raid.php'
					},
					'Arena' : {
						url : 'arena.php'
					}
				}
			},
			'Monster' : {
				url : 'player_monster_list.php',
				type : 'get_body',
				items : {
					'Summon monster' : {
						url : 'monster_summon_list.php'
					},
					'Monster class' : {
						url : 'view_class_progress.php'
					},
					'Live feed' : {
						url : 'army_news_feed.php',
						type : 'get_body'
					}
				}
			},
			'Generals' : {
				url : 'generals.php',
				items : {
					'Heroes' : {
						url : 'mercenary.php'
					}
				}
			},
			'Soldiers' : {
				url : 'soldiers.php',
				items : {
					'Black smith' : {
						url : 'item.php'
					},
					'Magic' : {
						url : 'magic.php'
					},
					'Land' : {
						url : 'land.php'
					}
				}
			},
			'Oracle' : {
				url : 'oracle.php',
				items : {
					'Reinforcements' : {
						url : 'reinforcements.php'
					},
					'Demi power' : {
						url : 'symbols.php'
					},
					'Chest' : {
						url : 'treasure_chest.php',
						type : 'get_body'
					}
				}
			},
			'Keep' : {
				url : 'keep.php',
				type : 'get_body',
				items : {
					'Elite guard' : {
						url : 'party.php',
						type : 'get_body'
					},
					'Achievements' : {
						url : 'achievements.php'
					},
					'Alchemy' : {
						url : 'alchemy.php'
					},
					'Goblin emporium' : {
						url : 'goblin_emp.php'
					}
				}
			},
			'Gift' : {
				url : 'gift.php',
				type : 'get_body',
				items : {
					'Invite' : {
						url : 'army.php',
						type : 'get_body'
					},
					'View army' : {
						url : 'army_member.php',
						type : 'get_body'
					},
					'Sent invites' : {
						url : 'army_reqs.php',
						type : 'get_body'
					}
				}
			},
			'Guild' : {
				url : 'guild.php',
				type : 'get_body',
				items : {
					'Leaderboard' : {
						url : 'http://web.castleagegame.com/castle/leaderboard.php',
						type : 'offpage'
					}
				}
			}
		}
	};

	cageCAMenubar.init = function() {

		if(CastleAge.Guild === null) {
			window.setTimeout(cageCAMenubar.init, 750);
		} else {

			if(CastleAge.Guild) {
				cageCAMenubar.cache.menuItems.Guild = {
					url : 'guild.php',
					type : 'get_body',
					items : {
						'Management' : {
							url : 'guild_panel.php',
							type : 'get_body'
						},
						'Guild List' : {
							url : 'guild.php?guild_page=1',
							type : 'get_body'
						},
						'Guild Battles' : {
							url : 'guild_current_battles.php',
							type : 'get_body'
						},
						'Guild Monsters' : {
							url : 'guild_current_monster_battles.php',
							type : 'get_body'
						}
					}
				};
			}

			$jQ('body').prepend('<div id="CAGENavigation" class="CAGE"></div>');
			$_NavBar = $jQ('#CAGENavigation');
			$jQ.each(cageCAMenubar.cache.menuItems, function(_name, _item) {

				var $_Menuitems = null;

				var $_Menu = $jQ('<span>');

				var $_MenuTitle = $jQ('<button class="CAGETopMenuItem">').button({
					label : _name
				});
				$_Menu.append($_MenuTitle);
				if(_item.items) {
					$_Menuitems = $jQ('<div class="CAGETopMenuSubItems">');
					$jQ.each(_item.items, function(_itemname, _menuitem) {
						$_Menuitems.append($jQ('<button class="CAGETopMenuSubItem">').button({
							label : _itemname
						}).click(function() {
							cagePage.loadPage(_menuitem.url, _menuitem.type ? _menuitem.type : 'cache_body');
							$_Menuitems.stop().fadeTo('fast', 0, function() {
								$jQ(this).hide();
							});
							$jQ(this).blur();
						})).hide();
					});
					$_Menu.append($_Menuitems);
				}
				$_MenuTitle.click(function() {
					cagePage.loadPage(_item.url, _item.type ? _item.type : 'cache_body');
					if($_Menuitems !== null) {
						$_Menuitems.stop().fadeTo('fast', 0, function() {
							$jQ(this).hide();
						});
					}
					$jQ(this).blur();
				});
				$_Menu.hover(function() {
					$jQ('button.CAGETopMenuItem').mouseleave();
					$_MenuTitle.addClass('ui-state-hover');
					if($_Menuitems !== null) {
						$_Menuitems.css({
							'left' : $_MenuTitle.position().left
						}).stop().show().fadeTo('fast', 1);
					}
				}, function() {
					$_Menuitems.stop().fadeTo('fast', 0).hide();
				});

				$_NavBar.append($_Menu);

			});
			$_items = $_NavBar.find('button.CAGETopMenuItem');
			$_NavBar.find('button').removeClass('ui-corner-all');
			$_items.first().addClass('ui-corner-left');
			$_items.last().addClass('ui-corner-right');
			cageProgress.work();
			cageCAMenubar.enable();
			cageCAMenubar.initiated = true;

		}
	};
	/**
	 * Fill ELiteguard
	 */
	var cageEliteguard = new cage_tool('Eliteguard');

	cageEliteguard.cache = cageData.load(cageEliteguard, {

		Favourites : [],
		CloseFriends : true,
		GuildMembers : true,
		Army : true

	});

	cageEliteguard.runtime = {
		ids : []
	};

	cageEliteguard.settings = {

		head : CAGE.Settings.langData.Eliteguard,
		items : [{
			type : 'bool',
			label : CAGE.Settings.langData.EliteguardUseGuild,
			cache : 'GuildMembers'
		}, {
			type : 'bool',
			label : CAGE.Settings.langData.EliteguardUseArmy,
			cache : 'Army'
		}]

	};

	cageEliteguard.progress = 1;

	cageEliteguard.init = function() {

		cageEliteguard.menubutton(CAGE.Settings.langData.Eliteguard);
		cageProgress.work();
		cageEliteguard.enable();
		cageEliteguard.initiated = true;

	};

	cageEliteguard.getGuild = function() {

		cageDbg.info('Eliteguard: Reading guild...');
		//cageEliteguard.cache.friends = [];
		cagePage.background('guild.php', function(guild) {
			$jQ('#cta_log input[name="guild_player_id"]', guild).each(function() {
				cageEliteguard.runtime.ids.push($jQ(this).prop('value'));
			});
			if(cageEliteguard.cache.Army) {
				cageEliteguard.getArmy();
			} else {
				cageEliteguard.work();
			}
		});
	};

	cageEliteguard.getArmy = function() {

		cageDbg.info('Eliteguard: Reading army...');
		FB.api({
			method : 'fql.query',
			query : 'SELECT uid FROM user WHERE is_app_user=1 and uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
		}, function(response) {
			if(response.length > 0) {
				$jQ.each(response, function(i, e) {
					cageEliteguard.runtime.ids.push(this.uid);
				});
			}
			cageEliteguard.work();
		});
	};

	cageEliteguard.start = function() {
		cageDbg.info('Eliteguard: Checking...');
		cageEliteguard.disable();
		$jQ.get('party.php?casuser=' + CAGE.uid, function(guarddata) {
			if($jQ('img[src*="elite_guard_add"]', guarddata)) {
				if(cageEliteguard.cache.GuildMembers) {
					cageEliteguard.getGuild();
				} else if(cageEliteguard.cache.Army) {
					cageEliteguard.getArmy();
				}
			} else {
				cageEliteguard.finish(true);
			}
		});
	};

	cageEliteguard.work = function() {

		cageDbg.info('Eliteguard: Filling...');
		if(cageEliteguard.runtime.ids.length > 0) {
			var _id = cageEliteguard.runtime.ids.pop();
			$jQ.get('party.php?twt=jneg&jneg=true&user=' + _id + '&lka=' + _id + '&etw=1&ref=nf', function(guarddata) {
				if($jQ(guarddata).text().match(/YOUR Elite Guard is FULL!/i)) {
					cageEliteguard.finish(true);
				} else {
					cageEliteguard.work();
				}
			});
		} else {
			cageEliteguard.finish(false);
		}

	};

	cageEliteguard.finish = function(_result) {

		cageDbg.info('Eliteguard: Result=' + _result);
		if(_result) {
			cageEliteguard.runtime.ids = [];
			cageNote.work(CAGE.Settings.langData.EliteguardDone);
		} else {
			cageNote.work(CAGE.Settings.langData.EliteguardError);
		}
		cageEliteguard.enable();

	};
	/**
	 * Generals quick selector
	 */
	var cageGenerals = new cage_tool('Generals');

	/*
	 * Array of generals cache
	 *
	 * {
	 * 	item
	 * 	item
	 * 	attack
	 * 	defense
	 * 	text
	 * }
	 *
	 */
	cageGenerals.cache = cageData.load(cageGenerals, []);

	cageGenerals.runtime = {

		general : {}

	};

	cageGenerals.progress = 2;

	cageGenerals.blocked = false;

	cageGenerals.showAll = false;

	cageGenerals.background = true;

	cageGenerals.init = function() {

		if(cageCAMenubar.initiated && cageSidebar.initiated) {

			$jQ('body').append('<div id="CAGEGeneralsbar" class="ui-corner-left"></div>');
			$jQ('body').append('<div id="CAGEAllGeneralsbar"><div id="CAGEAllGeneralsStats" class="ui-corner-br"><img id="CAGEAllGeneralsSelected" class="ui-corner-all"/><div id="CAGEAllGeneralsData" class="ui-corner-all CAGE"></div></div><div id="CAGEAllGeneralsImages" class="ui-corner-bl"></div></div>');

			$jQ('#CAGESidebar').append($jQ('<div id="CAGEGeneral" class="ui-corner-left">').append($jQ('<img id="CAGECurrentGeneralImage" class="ui-corner-all" src="' + $jQ('#equippedGeneralContainer img').attr('src') + '" />').toggle(function() {
				$jQ('#CAGEGeneralsbar').stop().animate({
					'right' : $jQ('#CAGEGeneral').width()
				}, 'fast');
				cageGenerals.shown = true;
			}, function() {
				$jQ('#CAGEGeneralsbar').stop().animate({
					'right' : -$jQ('#CAGEGeneralsbar').width() + $jQ('#CAGEGeneral').width() - 5
				}, 'fast');
				cageGenerals.shown = false;
			})).append($jQ('<button id="CAGEAllGenerals" class="ui-corner-left">Generals</button>').button().removeClass('ui-corner-all').click(function() {
				if(!cageGenerals.showAll) {
					cageGenerals.showAll = true;
					$jQ('#CAGEAllGeneralsSelected').attr('src', cageGenerals.runtime.general[CastleAge.General].image);
					$jQ('#CAGEAllGeneralsData').html('<strong>' + cageGenerals.runtime.general[CastleAge.General].name + '</strong><br><br>Attack <strong>' + ('   ' + cageGenerals.runtime.general[CastleAge.General].attack).slice(2) + '</strong> / Defense <strong>' + ('   ' + cageGenerals.runtime.general[CastleAge.General].defense).slice(2) + '</strong><br>' + cageGenerals.runtime.general[CastleAge.General].text);
					$jQ.each(cageGenerals.runtime.general, function(i, e) {
						$jQ('#CAGEAllGeneralsImages').append($jQ('<img src="' + e.image + '" general="' + e.name + '" class="ui-corner-all CAGEAllGeneralsImage">').click(cageGeneralsClick).hover(cageGeneralsHover, cageGeneralsUnHover));
					});
					$jQ('#CAGEAllGeneralsbar').animate({
						'top' : 14
					}, 'slow');
				} else {
					$jQ('#CAGEAllGeneralsbar').animate({
						'top' : -300
					}, 'slow', function() {
						$jQ('#CAGEAllGeneralsImages > img').remove();
						cageGenerals.showAll = false;
					});
				}
			})));

			CastleAge.General = $jQ('#equippedGeneralContainer div.general_name_div3').text().trim();

			if(cageGenerals.cache !== []) {
				cageGenerals.start();
			} else {
				cageProgress.work();
				cageProgress.work();
				cageGenerals.initiated = true;
			}
		} else {
			window.setTimeout(cageGenerals.init, 100);
		}

	};
	cageGeneralsClick = function() {

		cageGenerals.block(true);
		cageGenerals.set($jQ(this).attr('general'));
		$jQ('#CAGEAllGeneralsbar').animate({
			'top' : -300
		}, 'slow', function() {
			$jQ('#CAGEAllGeneralsImages > img').remove();
			cageGenerals.showAll = false;
		});
	};
	cageGeneralsHover = function() {

		$jQ.data(this, 'hover', true);
		var _this = this, $_this = $jQ(this), e = cageGenerals.runtime.general[$jQ(_this).attr('general')];
		//$_this.stop().animate({'opacity': 1}, 'fast', function(){
		$_this.stop().animate({
			'borderColor' : '#fff'
		}, 'fast', function() {
			if($jQ.data(_this, 'hover') === true) {
				$jQ('#CAGEAllGeneralsSelected').attr('src', e.image);
				$jQ('#CAGEAllGeneralsData').html('<strong>' + e.name + '</strong><br><br>Attack <strong>' + ('   ' + e.attack).slice(2) + '</strong> / Defense <strong>' + ('   ' + e.defense).slice(2) + '</strong><br>' + e.text);
			}
		});
	};
	cageGeneralsUnHover = function() {

		$jQ.data(this, 'hover', false);
		//$jQ(this).stop().animate({'opacity': 0.6}, 'slow');
		$jQ(this).stop().animate({
			'borderColor' : '#000'
		}, 'slow');

	};
	// Move out if generals are switching automatically and don't allow change to Change it with CAGE (e.g stash)
	cageGenerals.block = function(_state) {

		cageGenerals.blocked = _state ? true : false;
		$jQ('#CAGECurrentGeneralImage').stop().animate({
			'opacity' : ( _state ? 0 : 1)
		}, 'fast');

	};
	//
	cageGenerals.changeToCurrent = function() {

		CastleAge.General = $jQ('#equippedGeneralContainer div.general_name_div3').text().trim();
		if($jQ('#CAGECurrentGeneralImage').attr('src') !== cageGenerals.runtime.general[CastleAge.General].image) {
			cageGenerals.block(true);
			window.setTimeout(function() {
				$jQ('#CAGECurrentGeneralImage').attr('src', cageGenerals.runtime.general[CastleAge.General].image);
				cageGenerals.block();
			}, 'slow');
		}

	};

	cageGenerals.AddToBar = function(_item, _itype, _context) {

		if(!_context) {
			_context = $jQ(document.body)[1];
		}
		var $_image = $jQ('form:has(input[name="item"][value="' + _item + '"]) input.imgButton', _context);
		var $_general = $_image.parents('div.generalSmallContainer2:first');
		var _image = $_image.attr('src');
		var _name = $_general.children('div.general_name_div3:first').text().trim();
		var _text = $_general.children('div:last').children('div').text().trim();
		var _stats = $_general.find('div.generals_indv_stats_padding');
		var _att = _stats.children('div:eq(0)').text();
		var _def = _stats.children('div:eq(1)').text();
		var _level = $_general.find('div.generals_indv_stats').next().text().trim();
		var _percent = $_general.find('div.generals_indv_stats').next().find('div[style*="#3b5561"]').css('width');

		$jQ('#CAGEGeneralsbar').append($jQ('<img id="CAGEFastGeneral_' + _item + '" text="' + _text + '" attack="' + _att + '" defense="' + _def + '" general="' + _name + '" src="' + _image + '" class="CAGEFastGeneralsImage ui-corner-all" />').hover(function() {
			$jQ(this).stop().animate({
				'opacity' : 1
			}, 'fast');
		}, function(_this) {
			$jQ(this).stop().animate({
				'opacity' : 0.7
			}, 'slow');
		}).click(function() {
			$jQ('#CAGECurrentGeneralImage').click();
			if(!cageGenerals.blocked && _image != CastleAge.General.Image) {
				cageGenerals.block(true);
				$_this = $jQ(this);
				$_this.mouseleave();
				cagePage.cache['generals.php'] = null;
				cageGenerals.set(_name);
			}
		}));
	};
	//
	/**
	 * Set general by name
	 * @param {String} _name Generals name to set
	 */
	cageGenerals.set = function(_name) {

		if(CastleAge.General !== _name) {
			CastleAge.General = _name;
			if($jQ('div.generalContainerBox').length > 0) {
				cagePage.loadPage('generals.php?item=' + cageGenerals.runtime.general[_name].item + '&itype=' + cageGenerals.runtime.general[_name].itype + '&bqh=' + CastleAge.bqh);
			} else {
				cagePage.background('generals.php?item=' + cageGenerals.runtime.general[_name].item + '&itype=' + cageGenerals.runtime.general[_name].itype + '&bqh=' + CastleAge.bqh, function(_data) {
					$jQ('div.equippedGeneralCnt2').html($jQ('div.equippedGeneralCnt2', _data).html());
					cageGenerals.changeToCurrent();
				});
			}
		}

	};
	/**
	 * Get all general infos need.
	 * @param {Object} _context Page data for jQuery context
	 */
	cageGenerals.getGenerals = function(_context) {

		cageGenerals.runtime.general = {};
		$jQ('div.generalSmallContainer2 div.general_pic_div3', _context).each(function(i, e) {
			var $_this = $jQ(this);
			var $_image = $jQ('form:has(input[name="item"]) input.imgButton', e);
			var $_general = $_image.parents('div.generalSmallContainer2:first');
			var _image = $_image.attr('src');
			var _name = $_general.children('div.general_name_div3:first').text().trim();
			var _item = $_this.parent().find('input[name="item"]').attr('value');
			var _itype = $_this.parent().find('input[name="itype"]').attr('value');
			var _text = $_general.children('div:last').children('div').html().trim().replace(/<br>/g, ' ');
			var _stats = $_general.find('div.generals_indv_stats_padding');
			var _att = _stats.children('div:eq(0)').text().trim();
			var _def = _stats.children('div:eq(1)').text().trim();
			cageGenerals.runtime.general[_name] = {
				name : _name,
				image : _image,
				item : _item,
				itype : _itype,
				attack : _att,
				defense : _def,
				text : _text
			};
		});
	};
	cageGenerals.start = function() {

		cagePage.background('generals.php', function(_data) {
			cageProgress.work();
			cageGenerals.getGenerals(_data);
			$jQ.each(cageGenerals.cache, function(_index, _general) {
				cageGenerals.AddToBar(_general.item, _general.itype, _data);
			});
			$jQ('#CAGEGeneralsbar').css('right', -$jQ('#CAGEGeneralsbar').width() + $jQ('#CAGESidebar').width() - 4);
			cageProgress.work();
			cageGenerals.initiated = true;
		});
	};
	/**
	 * Generals quick selector
	 */
	var cageGuildClass = [];
	//new cage_tool('GuildClass');

	cageGuildClass.cache = cageData.load(cageGuildClass, []);

	cageGuildClass.runtime = {

		guildClass : {}

	};

	cageGuildClass.progress = 2;

	cageGuildClass.background = true;

	cageGuildClass.init = function() {

		cageProgress.work();
		cageProgress.work();
		/*var _gen = $jQ('#CAGEGeneral');
		 if (_gen.length === 1) {
		 _gen.append('<img gclass="warrior" src="http://image4.castleagegame.com/graphics/guild_battle_icon_warrior.gif" style="width: 24px; position: absolute; top: 36px; left: 65px; cursor: pointer;">')
		 .append('<img gclass="rogue" src="http://image4.castleagegame.com/graphics/guild_battle_icon_rogue.gif" style="width: 24px; position: absolute; top: 36px; left: 95px; cursor: pointer;">')
		 .append('<img gclass="mage" src="http://image4.castleagegame.com/graphics/guild_battle_icon_mage.gif" style="width: 24px; position: absolute; top: 36px; left: 125px; cursor: pointer;">')
		 .append('<img gclass="cleric" src="http://image4.castleagegame.com/graphics/guild_battle_icon_cleric.gif" style="width: 24px; position: absolute; top: 36px; left: 155px; cursor: pointer;">');
		 $jQ('img[gclass]', _gen).click(function(){
		 var _gclass = $jQ(this).attr('gclass');
		 });
		 cagePage.background('guild_class.php', function(_data){
		 cageProgress.work();
		 cageGuildClass.getAbilties(_data);
		 cageProgress.work();
		 cageGuildClass.initiated = true;
		 cageGuildClass.enable();
		 });
		 } else {
		 window.setTimeout(cageGuildClass.init, 100);
		 }*/

	};

	cageGuildClass.start = function() {

	};

	cageGuildClass.getAbilties = function(_data) {

		var _classes = $jQ('div[id*="collapsed_power"]');

		$jQ.each(_classes, function(_index, _class, _data) {
			var $_class = $jQ(_class), _name = $_class.attr('id').substring($_class.attr('id').lastIndexOf('_') + 1), _abilities = [], _num = 0;

			$jQ('#expanded_power_' + _name + ' div[id*="class_power_"]', _data).each(function(_index, _element) {
				var _id = $jQ(_element).attr('id'), _arr = _id.match(/(?:_)(\d+)/g), _img = $jQ(_element).find('img').attr('src');
				_abilities.push({
					cat : parseInt(_arr[1].substring(1), 10),
					id : parseInt(_arr[2].substring(1), 10),
					img : _img
				});
				_num = parseInt(_arr[0].substring(1), 10);
			});
			cageGuildClass.runtime.guildClass[_name] = {
				number : _num,
				slots : $jQ('#expanded_power_' + _name + ' div[id*="free_slot"]', _data).length,
				abilities : _abilities
			};

		});
	};
	/**
	 * Heal
	 */
	var cageHeal = new cage_tool('Heal');

	cageHeal.progress = 1;

	cageHeal.init = function() {

		cageHeal.menubutton(CAGE.Settings.langData.Heal);
		cageProgress.work();
		cageHeal.enable();
		cageHeal.initiated = true;

	};

	cageHeal.runtime = {

		healed : false

	};

	cageHeal.start = function() {

		cageDbg.info('Healing...');
		cageHeal.disable();
		var _health = $jQ('#CAGEStats_health').text().split('/');
		if(parseInt(_health[1], 10) - parseInt(_health[0], 10) > 0) {
			cagePage.background('keep.php?action=heal_avatar&do=heal wounds&bqh=' + CastleAge.bqh, function() {
				cageHeal.runtime.healed = true;
				cageNote.work(CAGE.Settings.langData.HealDone);
				cageHeal.finish();
			});
		} else {
			cageHeal.finish();
		}

	};

	cageHeal.finish = function(_worked) {

		cageHeal.enable();
		cageDbg.info('Heal finished...');

	};
	/**
	 * CAGE Settings
	 */
	var cageSettings = new cage_tool('Settings');

	cageSettings.progress = 1;

	cageSettings.init = function() {

		if(cageCAMenubar.initiated) {
			$jQ('#CAGENavigation').append($jQ('<div id="CAGEToolsMenu">').button({
				icons : {
					primary : 'ui-icon-power'
				}
			}));
			$jQ('#CAGEToolsMenu').click(function() {
				cageSettings.start();
			});
			cageSettings.enable();
			cageProgress.work();
			cageSettings.initiated = true;
		} else {
			window.setTimeout(cageSettings.init, 100);
		}

	};

	cageSettings.start = function() {

		var _msg = 'CAGE - Settings';
		$jQ('#app_body').empty().append('<div class="CAGE CAGEresults CAGESettingTop">' + _msg + '</div><div id="CAGESettings"></div>');
		$jQ.each(cage_tools, function(index) {
			if(cage_tools[index].settings !== null) {
				var _settings = cage_tools[index].settings;
				$jQ('#CAGESettings').append('<div class="CAGEresults"><div class="CAGESettingHead">' + _settings.head + '</div></div><br>');
				var _div = $jQ('#CAGESettings div.CAGEresults:last');
				for(var _i = 0; _i <= _settings.items.length - 1; _i++) {
					var _label = _settings.items[_i].label;
					var _value = _settings.items[_i].cache;
					switch(_settings.items[_i].type) {
						case 'bool':
							_div.append('<div style="margin-left:10px;line-height: 2em;"><label><input id="' + index + _value + '" tool="' + index + '" item="' + _value + '" type="checkbox" ' + (cage_tools[index].cache[_value] ? 'checked="checked"' : '') + '> ' + _label + '</label></div>');
							$jQ('#' + index + _value).change(function() {
								var _this = $jQ(this);
								var _tool = _this.attr('tool');
								var _item = _this.attr('item');
								var _val = _this.is(':checked');
								cage_tools[_tool].cache[_item] = _val;
								cageData.save(cage_tools[_tool]);
								//console.log(_tool+'-'+_item+'-'+_val);
							});
							break;
						case 'text':
							_div.append('<div style="margin-left:10px;line-height: 2em;"><label>' + _label + ' <input id="' + index + _value + '" tool="' + index + '" item="' + _value + '" type="text" size="' + (_settings.items[_i].size > 50 ? 50 : _settings.items[_i].size) + '" maxlength="' + _settings.items[_i].size + '" value="' + cage_tools[index].cache[_value] + '"></label></div>');
							$jQ('#' + index + _value).change(function() {
								var _this = $jQ(this);
								var _tool = _this.attr('tool');
								var _item = _this.attr('item');
								var _val = _this.val();
								cage_tools[_tool].cache[_item] = _val;
								cageData.save(cage_tools[_tool]);
							});
							break;
					}
				}
				_div.append('</div>');
			}
		});
	};
	/**
	 * CAGE Sidebar
	 */
	var cageSidebar = new cage_tool('Sidebar');

	cageSettings.progress = 1;

	//cageSidebar.cache = cageData.load(cageSidebar, {});

	cageSidebar.init = function() {

		if(cageCAMenubar.initiated) {
			$_NavBar = $jQ('#CAGENavigation');
			$_NavBar.append($jQ('<div id="CAGEShowSidebar">').button({
				icons : {
					primary : 'ui-icon-circle-triangle-e'
				}
			}).toggle(function() {
				$jQ('#CAGEShowSidebar').button('option', 'icons', {
					primary : 'ui-icon-circle-triangle-w'
				});
				$jQ('#CAGESidebar').animate({
					'right' : -255
				}, 'fast');
				$jQ('#CAGEGeneralsbar').animate({
					'right' : -$jQ('#CAGEGeneralsbar').width() - 50
				}, 'fast');
			}, function() {
				$jQ('#CAGEShowSidebar').button('option', 'icons', {
					primary : 'ui-icon-circle-triangle-e'
				});
				$jQ('#CAGESidebar').animate({
					'right' : 0
				}, 'fast');
			}));
			cageSidebar.enable();
			cageProgress.work();
			cageSidebar.initiated = true;
		} else {
			window.setTimeout(cageSidebar.init, 100);
		}
	};

	cageSidebar.quickBars = [];
	cageSidebar.addQuickBar = function() {

	};
	/**
	 * Switch to Aeris and stash all gold
	 */
	var cageStash = new cage_tool('Stash');

	cageStash.progress = 1;

	cageStash.init = function() {

		cageStash.menubutton(CAGE.Settings.langData.Stash);
		cageProgress.work();
		cageStash.enable();
		cageStash.initiated = true;

	};

	cageStash.runtime = {

		stashed : false

	};

	cageStash.start = function() {

		cageDbg.info('Stash starting...');
		cageStash.cache = {
			aeris : false,
			general : null,
			item : null,
			itype : null
		};
		if(parseInt($jQ('#CAGEStats_gold').text().match(/\d*/g).join(''), 10) >= 10) {
			if(cageGenerals.blocked) {
				window.setTimeout(cageStash.start, 500);
				return;
			}
			if(!CastleAge.bqh) {
				cageStats.start(cageStash.start);
				return;
			}
			cageGenerals.block(true);
			cageStash.disable();
			$jQ('#AjaxLoadIcon').fadeIn('slow');
			cagePage.cache['keep.php'] = null;
			cageStash.cache.aeris = CastleAge.General == 'Aeris' ? true : false;
			if(cageStash.cache.aeris) {
				cageStash.work();
			} else {
				cageStash.cache.general = $jQ('#equippedGeneralContainer div.general_name_div3').text().trim();
				cagePage.background('generals.php?item=16&itype=0&bqh=' + CastleAge.bqh, function(data) {
					cageStash.work();
				});
			}
		} else {
			cageStash.finish();
		}

	};

	cageStash.work = function() {

		cageDbg.info('Stash working...');
		cagePage.background('keep.php?do=Stash&stash_gold=' + $jQ('#CAGEStats_gold').text().match(/\d*/g).join('') + '&bqh=' + CastleAge.bqh, function(_keep) {
			if($jQ('input[name="stash_gold"]').length > 0) {
				$jQ('input[name="stash_gold"]').val('0');
				$jQ('b.money').text($jQ('b.money', _keep).text());
			}
			cageStash.runtime.stashed = true;
			if(cageStash.cache.aeris === true) {
				cageStash.finish(true);
			} else {
				cagePage.background('generals.php?item=' + cageGenerals.runtime.general[cageStash.cache.general].item + '&itype=' + cageGenerals.runtime.general[cageStash.cache.general].itype + '&bqh=' + CastleAge.bqh, function() {
					cageStash.finish(true);
				});
			}
		});
	};

	cageStash.finish = function(_worked) {

		if(_worked) {
			cageGenerals.block(false);
			$jQ('#CAGEStats_gold').html('$0');
			$jQ('#AjaxLoadIcon').fadeOut('slow');
			cageStash.enable();
			cageNote.work(CAGE.Settings.langData.StashDone);
		} else {
			cageNote.work(CAGE.Settings.langData.StashError);
		}
		cageStash.clearcache();
		cageDbg.info('Stash finished...');

	};
	/**
	 * cage_start.js
	 */
	function cage_Start() {

		// reposition within web/web3
		$jQ('body > center > div:first').unwrap();
		//
		cageInitUtils();
		//Restore CAGE Settings or set default
		cageData.load(CAGE, CAGE);
		//Remove unwanted stuff on start page
		cage_pages['allPages'].data();
		cage_pages['allPages'].script();
		// get start page and rearrange it
		if(document.location.pathname.indexOf('.php') > 0) {
			var _page = /\w*(?:\.php)/.exec(document.location.pathname)[0];
			if(cage_pages[_page]) {
				if(cage_pages[_page].data) {
					cage_pages[_page].data();
				}
				if(cage_pages[_page].script) {
					cage_pages[_page].script();
				}
			}
		}
		// Init tools
		cageInitTools();
		cageWaitForTools(function() {
			cageProgress.work();
		});
		//
		$jQ('body').scrollTop(0);

	}

	// Wait till jQuery is loaded, then start CAGE
	function cage_WaitForjQuery() {
		if( typeof window.jQuery === 'function' && window.jQuery().jquery.match('1.6') !== null) {//
			cageDbg.info('CAGE: using JQuery ' + jQuery().jquery);
			$jQ = jQuery.noConflict();
			cageDbg.info('CAGE: jQuery ready...');
			cageDbg.info('CAGE: Inject jQueryUI.');
			var _inject = document.createElement('script');
			_inject.setAttribute('type', 'application/javascript');
			_inject.src = CAGE.jQueryUI + 'jquery-ui.min.js';
			document.body.appendChild(_inject);
			_inject = null;
			cage_WaitForjQueryUI();
		} else {
			cageDbg.info('CAGE: Waiting for jQuery...');
			window.setTimeout(cage_WaitForjQuery, 100);
		}
	}

	function cage_WaitForjQueryUI() {
		if( typeof $jQ.ui === 'object') {
			cageDbg.info('CAGE: jQueryUI ready...');
			cage_Start();
		} else {
			cageDbg.info('CAGE: Waiting for jQueryUI...');
			window.setTimeout(cage_WaitForjQueryUI, 100);
		}
	}

	cage_WaitForjQuery();
});
