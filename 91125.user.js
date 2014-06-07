// ==UserScript==
// @name           [IBFSU] BlackFantome Script Utilities for Ikariam
// @namespace      Ikariam IBFSU
// @description    Script regroupant des outils nécessaire pour certains scripts comme "[IBFSU] Ikariam - voir toutes les offres du comptoir" ou "[IBFSU] voir les temps de recherche partout"
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://support.ikariam.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        0.1.0
// ==/UserScript==

var IBFSU = function ()
{
	var script_name = '[IBFSU] BlackFantome Script Utilities for Ikariam';
	var version = '0.1.0';
	var mywindow;
	try
	{
		mywindow = unsafeWindow;
	}
	catch (e)
	{
		mywindow = window;
	}
	
	if (mywindow.IBFSU_started)
		return;
	mywindow.IBFSU_started = 1;
	

	var Cookies =
	{
		cookieList: undefined,
		cookieListName: undefined,
		addCookie: function (cookieName, defaultValue)
		{
			if (this.cookieListName.indexOf ('|' + cookieName + '|') != -1)
			{
				if (Options.debug)
					Tools.alert (new Error ('addCookie##The cookie "' + cookieName + '" has already been defined'));
				return;
			}
			this.cookieList[cookieName] = defaultValue;
			this.cookieListName += cookieName + '|';
			if (Tools.getValue (cookieName) == undefined)
			{
				if (Options.debug)
					alert (new Error ('addCookie##' + cookieName + ' is undefined'));
				Tools.setValue (cookieName, defaultValue);
			}
		},
		exists: function (cookieName)
		{
			return this.cookieListName.indexOf ('|' + cookieName + '|') != -1;
		},
		getCookie: function (cookieName)
		{
			if (this.cookieListName.indexOf ('|' + cookieName + '|') == -1)
			{
				if (Options.debug)
					Tools.alert (new Error ('Cookies##The cookie "' + cookieName + '" does not exists'));
				return;
			}
			return Tools.getValue (cookieName, this.cookieList[cookieName]);
		},
		init: function ()
		{
			this.cookieList = new Array ();
			this.cookieListName = '|';
		},
	}
	
	var DateTime =
	{
		current_time: 0,
		previous_time: 0,
		init: function ()
		{
			this.current_time = (new Date()).getTime ();
			Cookies.addCookie ('PreviousTime', '0' + this.current_time);
			this.previous_time = parseInt (Tools.getValue ('PreviousTime').substr (1));
			
			if (this.current_time - this.previous_time >= 1000)
				Tools.setValue ('PreviousTime', '0' + this.current_time);
		},
		toString2: function (nb_second)
		{
			var second = nb_second % 60;
			var minute = Math.floor (nb_second / 60) % 60;
			var hour = Math.floor (nb_second / 3600) % 24;
			var day = Math.floor (nb_second / 86400);
			
			var returnValue = '';
			if (day > 0)
			{
				returnValue += day + 'j ';
				if (hour < 10)
					hour = '0' + hour;
			}

			returnValue += hour + 'h ';
			if (minute < 10)
				returnValue += '0';
			returnValue += minute + 'mn ';
			if (second < 10)
				returnValue += '0';
			returnValue += second + 's';
			return returnValue;
		}
	}
	
	var Game =
	{
		launch: function ()
		{
			Options.init ();
			Tools.init ();
			Cookies.init ();
			DateTime.init ();
			Version.check (script_name, version);

			Menu.create ();
		}
	}
	
	var Menu =
	{
		cur_mod_id: 0,
		addModule: function (moduleName, value, onAction)
		{
			var input = $('<input type="checkbox" />');
			if (value == true)
				input.attr ({'checked':'checked'});
			if (onAction)
			{
				input.unbind ('click')
					.click (onAction);
			}
			
			var content = $('<div></div>')
				.attr ({'id':'module_' + this.cur_mod_id});
			content.append ($('<h4></h4>'));
			content.find ('h4')
				.text (moduleName)
				.append (input);
			
			if (this.cur_mod_id == 0)
				$('#menu_script h3').eq (0).after (content);
			else
				$('#menu_script div#module_' + (this.cur_mod_id - 1)).eq (0).after (content);
			this.cur_mod_id++;
		},
		addOption: function (moduleNum, optionName, value, onAction)
		{
			if (moduleNum >= this.cur_mod_id)
			{
				if (Options.debug)
					Tools.alert (new Error ('Menu:addOption##The module is not found'));
				return;
			}
			var name = optionName.split ('_');
			if (name.length == 1)
			{
				if (Options.debug)
					Tools.alert (new Error ('Menu:addOption##You must set the type of your input'));
				return;
			}
			var create_option = $('<li></li>')
				.addClass ('citylevel')
				.append ($('<span></span>'));
			create_option.find ('span')
					.addClass ('textLabel')
					.text (name[1].replace (/\|/g, ' '));
			
			switch (name[0])
			{
				case 'check':
					input_type = 'checkbox';
					create_option.append ($('<input type="checkbox" />'));
					if (onAction)
						create_option.find ('input')
							.unbind ('click')
							.click (onAction);
					if (value == true)
						create_option.find ('input')
							.attr ({'checked': 'checked'});
					
					break;
				case 'txt':
				default:
					input_type = 'text';
					create_option.append ($('<input type="text" />'));
					create_option.find ('input')
						.attr ({'value': value});
					if (onAction)
						create_option.find ('input')
							.change (onAction)
							.keyup (onAction);
					break;
			}
			if ($('#module_' + moduleNum + ' ul').size () == 0)
			{
				$('#module_' + moduleNum + ' h4').eq (0).after ('<ul class="cityinfo"></ul>');
				$('#module_' + moduleNum + ' ul').eq (0).append (create_option);
			}
			else
				$('#module_' + moduleNum + ' ul li').eq ($('#module_' + moduleNum + ' ul li').size () - 1).append (create_option);
		},
		create: function ()
		{
			this.createMenuLink ();
			this.createMenu ();
			this.insertCSSRule ();
		},
		createMenu: function ()
		{
			if ($('div.dynamic').size == 0)
				return;
			var menu = $('div.dynamic').eq (0).clone (true);
			menu.attr({'id': 'menu_script'})
				.find ('h3')
					.text ('Options des scripts')
					.click(function(){
						$('#menu_script').eq(0).css('display', 'none');
				})
			;
			menu.find ('.content').remove ();
			menu.css ('display', 'none');
			$('div.dynamic').eq ($('div.dynamic').size () - 1).after (menu);
		},
		createMenuLink: function ()
		{
			if ($('#menu_script_link').size () != 0)
				return;
			var menuLink = $('#GF_toolbar ul li.options').eq(0).clone (true);
							
			menuLink
			.find ('a')
				.attr({
					'href':'javascript:void(0)'
				})
				.unbind('click')
				.click(function(){
					var elt = $('#menu_script').eq(0).css('display');
					if (!elt)
						return;
					if (elt.indexOf ('none') != -1)
						$('#menu_script').eq(0).css('display', '');
					else
						$('#menu_script').eq(0).css('display', 'none');
				})
			.find('span')
				.attr ({'class':'textLabel'})
				.text ('Options Script');
			
			$('#GF_toolbar ul .options').after(menuLink);
		},
		insertCSSRule: function ()
		{
			Tools.insertCSSRule ('#menu_script h4 {text-align:center; font-size: 12px; color: #993333; font-weight: bold; padding-top:7px;}');
			Tools.insertCSSRule ('#menu_script h4 input {margin-left: 10px;}');
			Tools.insertCSSRule ('#menu_script li {width: 100%; margin: auto;line-height: 15px;vertical-align:middle;}');
			Tools.insertCSSRule ('#menu_script li span {display: block; width: 60%; float:left; text-align: right; padding-right: 5px;}');
			Tools.insertCSSRule ('#menu_script li input {width: 20%;height: 15px; text-align: center;}');
		}
	}
	
	var Options =
	{
		current_page: undefined,
		debug: false,
		lang: undefined,
		module: '|',
		monde: undefined,
		server: undefined,
		addModule: function (moduleName, value, onAction)
		{
			if (this.module.indexOf ('|' + moduleName + '|') != -1)
			{
				if (this.debug)
					Tools.alert (new Error ('Options##The module "' + moduleName + '" already exists'));
				return;
			}
			this.module += moduleName + '|';
			Menu.addModule (moduleName, value, onAction);
		},
		/*
			optionName:
			check_* => input type = checkbox
			txt_*	=> input type = text	
		*/
		addOption: function (moduleName, optionName, value, func)
		{
			if (this.module.indexOf ('|' + moduleName + '|') == -1)
			{
				if (this.debug)
					Tools.alert (new Error ('Options##The module "' + moduleName + '" does not exists yet'));
				return;
			}
			var mod_split = this.module.split ('|');
			var mod_num = 0;
			for (var i = 1; i < mod_split.length - 1; i++)
				if (mod_split[i] == moduleName)
				{
					mod_num = i - 1;
					break;
				}
			Menu.addOption (mod_num, optionName, value, func);
		},
		init: function ()
		{
			var url = location.href.match (/http:\/\/s([0-9]+)\.([^\.]*)\.ikariam\.com/);
			if (url)
			{
				this.monde = url[1];
				this.lang = url[2];
			}
			var id = $('body').eq (0).attr ('id');
			if (!id)
				id = location.href.match (/view=([^&]*)/)[1];
			this.current_page = id;
			this.server = 's' + this.monde + '.' + this.lang + '.ikariam.com';
		},
		setDebug: function (bool)
		{
			this.debug = bool;
		}
	}
	
	var Tools =
	{
		stylesheet: undefined,
		unsafeWindow: undefined,
		alert: function (error)
		{
			if (!Options.debug)
				return;
			var line = error.lineNumber;
			var func = error.message.split ('##')[0];
			var mess = error.message.split ('##')[1];
			window.alert ('Error: ' + func + ':' + line + ': ' + mess);
		},
		createStyleSheet: function()
		{
			document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
			this.stylesheet = document.styleSheets[document.styleSheets.length-1];
		},
		formatXML: function (text)
		{
			text = text.replace (/&/g, '&amp;');
			text = text.replace (/  /g, ' ');
			text = text.replace (/ checked[^=]/g, ' checked="checked"');
			text = text.replace (/(<option [^><]*)[^\"]selected([^=])/g, '$1 selected="selected"$2');
			text = text.replace (/type="radio"name/g, 'type="radio" name');
			//GM_log (text);
			return text;
		},
		getNumber: function (string)
		{
			if (!string)
				return 0;
			string = this.trim (string.replace (/[,\.]/g, ''));
			return parseInt (string);
		},
		getValue: function (cookieName, cookieValue)
		{
			if (!Cookies.exists (cookieName))
			{
				if (Options.debug)
					this.alert (new Error ('getValue##unknown cookie: "' + cookieName + '"'));
				return;
			}
			return GM_getValue ('Ikariam_' + cookieName + '_monde_' + Options.monde + '_lang_' + Options.lang, cookieValue);
		},
		init: function ()
		{
			try { this.unsafeWindow = unsafeWindow; }
			catch (e) { this.unsafeWindow = window; }	
			this.createStyleSheet ();
		},
		insertCSSRule: function (rule)
		{
			this.stylesheet.insertRule(rule, 0);
		},
		isCurrentPage: function (page)
		{
			var pages = page.toLowerCase().split(',');
			for (var i=0; i<pages.length; i++)
				if (pages[i] == Options.current_page.toLowerCase())
					return true;	
			return false;
		},
		setValue: function (cookieName, cookieValue)
		{
			if (!Cookies.exists (cookieName))
			{
				if (Options.debug)
					this.alert (new Error ('setValue##unknown cookie: "' + cookieName + '"'));
				return;
			}
			GM_setValue ('Ikariam_' + cookieName + '_monde_' + Options.monde + '_lang_' + Options.lang, cookieValue);
		},
		trim: function (string)
		{
			return string.replace(/^\s+/g,'').replace(/\s+$/g,'');
		}
	}
	
	var Version =
	{
		script: undefined,
		check: function (script, version, url)
		{
			this.script = script.replace(/ /g, '_');
			Cookies.addCookie(this.script, version);
			if (!url)
				url = 'http://blackfantome.free.fr/game/script/check_version.php';
			GM_xmlhttpRequest({
				method:'GET',
				url: url + '?game=ikariam&script=' + script + '&version=' + version,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
					'Referer': 'http://' + Options.server + '/index.php', 
					'Cookie': document.cookie
				},
				onload:Version.isLatest
			});
		},
		isLatest: function (responseDetails)
		{
			var response = Tools.formatXML (responseDetails.responseText);
			if (!response)
				return;

			var debug = false
			if (response.match (/debug\n/))
			{
				debug = true;
				response = response.substr (response.indexOf ('\n') + 1);
			}
			var current_script  = response.match (/script: ([^\n]*)\n/);
			response = response.substr (response.indexOf ('\n') + 1);
			var current_version = response.match (/current version: ([^\n]*)\n/);
			response = response.substr (response.indexOf ('\n') + 1);

			if (!response)
				return;
			if (debug == true)
			{
				alert (response);
				return;
			}
			var version = response.match (/\(v. ([^\)]*)\)/);
			if (!version || !current_version || !current_script)
				alert ('test de la version mal formatté');
			else
			{
				version = version[1];
				current_version = current_version[1];
				current_script = current_script[1].replace (/ /g, '_');

				var known_version = Tools.getValue (current_script, current_version);
				
				if (known_version != version)
				{
					alert (response);
					Tools.setValue (current_script, version);
				}
			}
		}
	}
	Game.launch ();
	mywindow.$ = $;
	mywindow.Cookies = Cookies;
	mywindow.DateTime = DateTime;
	mywindow.Options = Options;
	mywindow.Tools = Tools;
	mywindow.Version = Version;
}

if (window.navigator.userAgent.indexOf('Chrome') > -1 && window.google)
	document.location.href = 'javascript:('+IBFSU+')();void(0);';
else
	IBFSU();