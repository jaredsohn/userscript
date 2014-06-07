// ==UserScript==
// @name			Mob Wars Turbo - Jonatan
// @namespace		http://userscripts.org/users/41677
// @description		Automate the boring stuff on Mob Wars.
// @version			1.0
// @include			http://*apps.facebook.com/mobwars*
// @include			http://*apps.new.facebook.com/mobwars*
// @copyright		2009, Jonatan Marin & 'Mob Wars Turbo'
// ==/UserScript==

var product_name = "Mob Wars Turbo -Jonatan";
var script_version = "1.0";
var script_timestamp = 1228400523253;
var script_update_url = 'http://www.mobwarsturbo.com/download.php';
var script_menu_html = '<img style="display:block;" src="data:image/png;base64,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" alt="Mob Wars Turbo" /> <div id="mwt_menu_content" style="background-color:#ffffff;padding:5px;width:188px;border:solid #3b5998;border-width:0 1px 1px;"> <center> <div id="mwt_menu_links" style="padding:0 0 16px 0;"> <span style="margin:11px 0 0 0;" id="mwt_hitlist" class="free_link">Attack Hitlist</span> <span id="mwt_fight" class="free_link">Fight Mobs</span> <span id="mwt_job">Do Job</span> <span id="mwt_buy">Buy Property</span> <span id="mwt_defend">Defend Boss</span> <button type="button" id="mwt_options" class="inputsubmit">Options</button> </div> <div id="mwt_menu_stop" style="display:none;padding:16px 0;"><button type="button" id="mwt_stop" class="inputsubmit">Stop MWT</button> </div> <div id="mwt_menu_options" style="display:none;padding:0 0 16px;"> <span id="mwt_upgrade">Upgrade to Full Version</span> <span id="mwt_reset">Reset Mob Wars Turbo</span> <span id="mwt_version">Current Version</span> <button type="button" id="mwt_return" class="inputsubmit">Main Menu</button> </div> <div style="overflow:hidden;text-align:left;height:18px;width:176px;margin:0 2px 5px;padding:5px 0 0 8px;background-color:#d8dfea;color:#3b5998;font-weight:bold;font-size:9px;" id="mwt_status_container">Status: <span style="font-weight:normal !important;" id="mwt_status">Idle. </span> </div> <button type="button" id="mwt_pref_button" class="inputsubmit">Edit Preferences</button> </center> <div id="sound_player" style="overflow: hidden; height: 0pt; width: 0pt;"></div> </div>';
var pref_html = '<div class="generic_dialog_popup" style="top: 80px;"> <table class="pop_dialog_table" id="pop_dialog_table"> <tbody> <tr> <td class="pop_topleft"></td> <td class="pop_border"></td> <td class="pop_topright"></td> </tr> <tr> <td class="pop_border"></td> <td id="pop_content" class="pop_content"> <h2 class="dialog_title"><span>Mob Wars Turbo Preferences</span></h2> <div class="dialog_content"> <div class="dialog_body"> <h3 class="mwt_pref_title" style="margin-top:0;">General</h3> <setline> <preflabel>Bank Cash:</preflabel> <input id="pref_bank" type="checkbox" style="display:block;float:left;" /> <description title="Do you want to bank your cash went it reaches the limit?">?</description> </setline> <setline> <preflabel>Bank Limit:</preflabel> <input id="pref_bank_limit" type="text" class="pref number" /> <description title="Bank cash when reaches this amount?">?</description> </setline> <setline> <preflabel>Heal:</preflabel> <input id="pref_heal" type="checkbox" style="display:block;float:left;" /> <description title="Do you want your boss healed when below set health?">?</description> </setline> <setline> <preflabel>Min Health: (%)</preflabel> <input id="pref_min_health" type="text" class="pref number" /> <description title="Minimum health as a %">?</description> </setline> <setline> <preflabel>Max Health: (%)</preflabel> <input id="pref_max_health" type="text" class="pref number" /> <description title="Stops healing once above this %. Maximum is 60%.">?</description> </setline> <setline> <preflabel>Script Repeat:</preflabel> <input id="pref_script_repeat" type="text" class="pref number" /> <span class="infinite">[Infinite]</span> <description title="How many times you want to do a action.">?</description> </setline> <setline> <preflabel>Auto Invite:</preflabel> <input id="pref_invite" type="checkbox" style="display:block;float:left;" /> <description title="Do you want to automatically invite Mob Members while playing?">?</description> </setline> <setline> <preflabel>Captcha Sound:</preflabel> <input id="pref_captcha_sound" type="checkbox" style="display:block;float:left;" /> <description title="Do you want to play a sound when a captcha is found?">?</description> </setline> <h3 class="mwt_pref_title">Fight Script</h3> <setline> <preflabel>Stamina:</preflabel> <input id="pref_fight_stamina" type="text" class="pref number" /> <description title="When stamina reaches 0, recharge to this amount.">?</description> </setline> <setline> <preflabel>Max Mob Size:</preflabel> <input id="pref_max_mob_size" type="text" class="pref number" /> <description title="The biggest Mob you want to fight.">?</description> </setline> <setline> <preflabel>Min Mob Size:</preflabel> <input id="pref_min_mob_size" type="text" class="pref number" /> <description title="The smallest Mob you want to fight.">?</description> </setline> <setline> <preflabel>Fight Repeat:</preflabel> <span class="inputlabel">Exp:</span><input id="pref_exp_repeat" name="repeattype" class="prefradio" type="radio" /> <span class="inputlabel">Cash:</span><input id="pref_cash_repeat" name="repeattype" class="prefradio" type="radio" /> <span class="inputlabel">Threshold:</span><input id="pref_repeat_threshold" type="text" class="pref number" /> </setline> <setline> <preflabel>Repeat Limit:</preflabel> <input id="pref_repeat_limit" type="text" class="pref number" /> <span class="infinite">[Infinite]</span> <span class="off">[Off]</span> <description title="Maximum number of times to repeativly attack a Mob.">?</description> </setline> <setline> <preflabel>Ignore Reset:</preflabel> <input id="pref_fight_reset" type="text" class="pref number" /> <span class="off">[Off]</span> <description title="Reset ignore list after this many attacks.">?</description> </setline> <h3 class="mwt_pref_title">Hitlist Script</h3> <setline> <preflabel>Stamina:</preflabel> <input id="pref_hitlist_stamina" type="text" class="pref number" /> <description title="When stamina reaches 0, recharge to this amount.">?</description> </setline> <setline> <preflabel>Min Refresh:</preflabel> <input id="pref_min_refresh" type="text" class="pref number" /> <description title="Minimum page refresh time in seconds.">?</description> </setline> <setline> <preflabel>Max Refresh:</preflabel> <input id="pref_max_refresh" type="text" class="pref number" /> <description title="Maximum page refresh time in seconds.">?</description> </setline> <setline> <preflabel>Min Bounty:</preflabel> <input id="pref_min_bounty" type="text" class="pref number" /> <description title="What is the smallest bounty you want to attack?">?</description> <span class="off">[Off]</span> </setline> <setline> <preflabel>Max Bounty:</preflabel> <input id="pref_max_bounty" type="text" class="pref number" /> <description title="What is the largest bounty you want to attack?">?</description> <span class="off">[Off]</span> </setline> <setline> <preflabel>Repeats:</preflabel> <input id="pref_hitlist_repeat" type="text" class="pref number" /> <description title="How many times to you want to try get the bounty?">?</description> </setline> <h3 class="mwt_pref_title">Job Script</h3> <setline> <preflabel>Job Number:</preflabel> <input id="pref_job_number" type="text" class="pref number" /> <description title="What job to do. 1 = Mugging, 2 = House Burglary etc.">?</description> </setline> <h3 class="mwt_pref_title">Defend Script</h3> <setline> <preflabel>Wait Time:</preflabel> <input id="pref_defend_time" type="text" class="pref number" /> <description title="How long to wait before rechecking stats.">?</description> </setline> <setline> <preflabel>Refresh Page:</preflabel> <input id="pref_defend_refresh" type="checkbox" style="display:block;float:left;" /> <description title="Do you want to refresh the page before checking stats?">?</description> </setline> </div> <div class="dialog_buttons"> <input id="mwtp_save" value="Save" name="save" class="inputsubmit" type="button"> <input id="mwtp_cancel" value="Cancel" name="cancel" class="inputsubmit inputaux" type="button"> </div> </div> </td> <td class="pop_border"></td> </tr> <tr> <td class="pop_bottomleft"></td> <td class="pop_border"></td> <td class="pop_bottomright"></td> </tr> </tbody> </table> </div>';

/**
 * Function: Script Update Checker
 * Description: Script Update Checker (http://userscripts.org/scripts/show/41677)
 * written by Jarett (http://userscripts.org/users/41677).
 */
var version_scriptNum = 41677; // Change this to the number given to the script by userscripts.org (check the address bar)
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/script_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > script_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);

/*------------*/
// The Objects
/*------------*/

var menu = {};
var preferences = {};
var boss = {};
var page = {};
var action = {};
var utility = {};
var element = {};

/*-----------*/
// Page stuff
/*-----------*/

page.domain = 'http://apps.facebook.com';

/**
 * Init Page
 *
 * @return	Boolean
 */
page.init = function()
{
	menu.init();
	preferences.update();
	if (captcha_test = dom.get('app8743457343_content'))
	{
		if (captcha_test.innerHTML.match('Are You Human?'))
		{
			page.script_cookie = false;
			if (preferences.settings.captcha_sound)
			{
				var timer = new utility.timer();
				timer.message = 'Captcha Found [[time]]...';
				timer.time = 180;
				utility.play_sound('http://www.mobwarsturbo.com/sound.wav', timer);
				return true;
			}
			menu.status('Captcha Found!');
			return true;
		}
	}
	page.locate_id = page.make_locate_id();
	//ID the right Cookie, first by location
	var ca = document.cookie.split(';');
	var sca = [];
	for (var i=0;i<ca.length;i++)
	{
		var c = ca[i];
		var str = '';
		if (str = c.match(new RegExp('mwt_script([0-9]+?)=(.*)')))
		{
			var sc = {
				id:str[1],
				value:str[2]
			}
			var data = eval(sc.value);
			if (data.loaded === false)
			{
				sca.push(sc);
			}
		}
	}
	//Now by location
	if (sca.length > 0)
	{
		var _sca = [];
		for (var i=0;i<sca.length;i++)
		{
			var sc = sca[i];
			var data = eval(sc.value);
			if (data.locate_id && data.locate_id == page.locate_id) // We have a location!
			{
				_sca.push(sc);
			}
		}
		//If we have location, get best timestamp
		if (_sca.length>0)
		{
			var c_time = new Date().getTime();
			var bsc = false;
			for(var i=0;i<_sca.length;i++)
			{
				var sc = _sca[i];
				var data = eval(sc.value);
				var diff = c_time-data.last_date;
				if (bsc === false || diff<bsc.diff)
				{
					bsc = sc;
					bsc.diff = diff;
				}
			}
			if (bsc)
			{
				page.script_cookie = 'mwt_script'+bsc.id;
				page.ignore_cookie = 'mwt_ignore'+bsc.id;
			}
		}
		else //We are only left with timestamp accuracy
		{
			var lsca = sca;
			sca = [];
			for(var i=0;i<lsca.length;i++)
			{
				var sc = lsca[i];
				var data = eval(sc.value);
				if (data.locate_id === false) // We only want cookies that don't have location
				{
					sca.push(sc);
				}
			}
			var c_time = new Date().getTime();
			var bsc = false;
			for(var i=0;i<sca.length;i++)
			{
				var sc = sca[i];
				var data = eval(sc.value);
				var diff = c_time-data.last_date;
				if (bsc === false || diff<bsc.diff)
				{
					bsc = sc;
					bsc.diff = diff;
				}
			}
			if (bsc)
			{
				page.script_cookie = 'mwt_script'+bsc.id;
				page.ignore_cookie = 'mwt_ignore'+bsc.id;
			}
		}
	}
	else
	{
		page.script_cookie = false;
		page.ignore_cookie = false;
	}
	window.addEventListener("unload", function(e)
	{
		if (page.script_cookie && page.script_redirect)
		{
			var data = eval(getCookie(page.script_cookie));
			data.loaded = false;
			data.last_date = new Date().getTime();
			createCookie(page.script_cookie, data.toSource(), 30);
		}
		else
		{
			action.stop_script();
		}
		return true;
	}, false);
	var links = document.getElementsByTagName('a');
	for(var i=0;i<links.length;i++)
	{
		var link = links[i];
		if (link.href.match('facebook.com/mobwars'))
		{
			link.addEventListener("click", function(e)
			{
				if (page.script_cookie)
				{
					page.script_redirect = true;
					menu.stop_called = true;
					var data = eval(getCookie(page.script_cookie));
					data.locate_id = page.make_locate_id(this.href);
					data.stage = 0;
					if (data.script == 'job')
					{
						data.stage = 1;
					}
					createCookie(page.script_cookie, data.toSource(), 30);
				}
				return true;
			}, false);
		}
	}
	if (page.script_cookie)
	{
		action.do_script();
	}
	return true;
}

page.make_locate_id = function(url)
{
	url = url || location.href;
	var locate_id = url.match(new RegExp('/mobwars/.*'))[0];
	locate_id = locate_id.replace('index.php', '');
	if (locate_id.substr(-1) == '/')
	{
		locate_id = locate_id.substring(0,locate_id.length-1);
	}
	return locate_id;
}

page.largest_id = function()
{
	var ca = document.cookie.split(';');
	var sca = [];
	for (var i=0;i<ca.length;i++)
	{
		var c = ca[i];
		var str = '';
		if (str = c.match(new RegExp('mwt_script([0-9]+?)=.*')))
		{
			sca.push(str[1]);
		}
	}
	//Find biggest ID
	if (sca.length>0)
	{
		var id = false;
		for (var i=0;i<sca.length;i++)
		{
			var cid = parseInt(sca[i]);
			if (id === false || cid>id)
			{
				id = cid;
			}
		}
		return id;
	}
	return false;
}

page.script_redirect = false;

/**
 * Goto link
 *
 * @param	string	The link
 * @param	string	The Status Message
 * @return	boolean	
 */
page.goto_link = function(link, message, time)
{
	if (message)
	{
		var timer = new utility.timer();
		timer.destination = link;
		timer.fn = function()
		{
			location.href = this.destination;
			return true;
		}
		timer.message = message+' [[time]]...';
		if (time || time == 0) timer.time = time;
		timer.start();
		return true;
	}
	location.href = link;
	return true;
}

/*-----------*/
// Menu stuff
/*-----------*/

/**
 * Init Menu
 *
 * @return	Boolean
 */
menu.init = function()
{
	var menu_code = script_menu_html;
	var div = document.createElement('div');
	div.id = 'mwt_menu';
	div.innerHTML = menu_code;
	var css = "div#mwt_menu { position:fixed; bottom:27px; right:2px; width:200px; overflow:hidden; z-index:10; } div#mwt_menu_links span, div#mwt_menu_options span { display:block; color:#3B5998; cursor:pointer; margin:16px 0; } div#mwt_menu_links span:hover, div#mwt_menu_options span:hover { text-decoration:underline; } .free_link { color:#999999 !important; cursor:default !important; } .free_link:hover { text-decoration:none !important; } h3.mwt_pref_title { margin:3px 0; padding:0; color:#333333; font-size:13px; font-weight:bold; width:100%; border:solid #D8DFEA; border-width:0 0 1px; } setline { margin:0; padding:0; display:block; overflow:hidden; height:22px; } preflabel { margin:0; padding:4px 0 0; font-size:11px; display:block; float:left; width:90px; color:gray; clear:left; } description { display:block; height:18px; width:18px; background-color:#3B5998; font-size:12px; font-weight:bold; color:#FFF; float:right; clear:right; text-align:center; cursor:help; } input.pref { display: block; float:left; border:1px solid #BDC7D8; padding:3px; font-size:11px; } input.number { width:79px; } input.small { width:30px !important; } input.string { width:100px; } input.prefradio { display:block; float:left; } span.inputlabel { margin:0; padding:4px 2px 0 3px; font-size:11px; display:block; float:left; color:#000000; } span.infinite, span.off { display:block; float:left; padding:3px 2px 0; color:#3B5998; cursor:pointer; } span.infinite:hover, span.off:hover { text-decoration:underline; }";
	GM_addStyle(css);
	document.body.insertBefore(div, document.body.lastChild);
	// Add events
	event.add(dom.get('mwt_pref_button'), 'click', function()
	{
		if (preferences.displayed === false)
		{
			preferences.show();
		}
		return true;
	});
	event.add(dom.get('mwt_stop'), 'click', function()
	{
		action.stop_script();
		return true;
	});
	event.add(dom.get('mwt_options'), 'click', function()
	{
		menu.toggle('options');
		return true;
	});
	event.add(dom.get('mwt_return'), 'click', function()
	{
		menu.toggle('menu');
		return true;
	});
	event.add(dom.get('mwt_job'), 'click', function()
	{
		action.do_script('job');
		return true;
	});
	event.add(dom.get('mwt_buy'), 'click', function()
	{
		action.do_script('buy');
		return true;
	});
	event.add(dom.get('mwt_defend'), 'click', function()
	{
		action.do_script('defend');
		return true;
	});
	event.add(dom.get('mwt_reset'), 'click', function()
	{
		var ca = document.cookie.split(';');
		var sca = [];
		for (var i=0;i<ca.length;i++)
		{
			var c = ca[i];
			var str = '';
			if (str = c.match(new RegExp('(mwt_script[0-9]+?)=.*')))
			{
				deleteCookie(str[1]);
			}
		}
		GM_setValue('preferences', 'null');
		preferences.update();
		alert('Mob Wars Turbo has now been reset!');
		return true;
	});
	event.add(dom.get('mwt_version'), 'click', function()
	{
		alert(product_name+"\n\nCurrent Version: "+script_version+"\nVersion Timestamp: "+script_timestamp);
		return true;
	});
	event.add(dom.get('mwt_upgrade'), 'click', function()
	{
		GM_openInTab('http://www.mobwarsturbo.com/product.php');
		return true;
	});
	return true;
}

/**
 * Set Status
 *
 * @param	string	Set to this
 * @return	boolean	Success?
 */
menu.status = function(string)
{
	var span = dom.get('mwt_status');
	span.innerHTML = string;
	return true;
}
menu.stop_called = false;
menu.toggle = function(page)
{
	var divs = [];
	divs.push(dom.get('mwt_menu_links'));
	divs.push(dom.get('mwt_menu_stop'));
	divs.push(dom.get('mwt_menu_options'));
	for(var i=0;i<divs.length;i++)
	{
		var div = divs[i];
		div.style.display = 'none';
	}
	if (page == 'options')
	{
		dom.get('mwt_menu_options').style.display = '';
	}
	else if (page == 'menu')
	{
		dom.get('mwt_menu_links').style.display = '';
	}
	else if (page == 'stop')
	{
		dom.get('mwt_menu_stop').style.display = '';
	}
	return true;
}

/*------------------*/
// Preferences stuff
/*------------------*/

// Variables
preferences.settings = {};
preferences.displayed = false;

preferences.show = function()
{
	preferences.update();
	this.temp = this.settings;
	this.div = document.createElement('div');
	this.div.className = 'generic_dialog pop_dialog';
	this.div.id = 'mwt_pref';
	this.div.innerHTML = pref_html;
	document.body.insertBefore(this.div, document.body.lastChild);
	event.add(dom.get('mwtp_save'), 'click', function()
	{
		preferences.settings = preferences.temp;
		preferences.save();
		element.fade_out('mwt_pref', 500, true);
		preferences.displayed = false;
		return true;
	});
	
	event.add(dom.get('mwtp_cancel'), 'click', function()
	{
		element.fade_out('mwt_pref', 500, true);
		preferences.displayed = false;
		return true;
	});
	// Prefrence setting events
	var inputs = dom.get('mwt_pref').getElementsByTagName('input');
	var input = {};
	for (var i = 0; i < inputs.length; i++)
	{
		input = inputs[i];
		event.add(input, 'change', function()
		{
			preferences.change_temp_value(this);
			return true;
		});
	}
	var infinites = dom.get('mwt_pref').getElementsByTagName('span');
	var infinite = {};
	for (var i = 0; i < infinites.length; i++)
	{
		infinite = infinites[i];
		if (infinite.className == 'infinite')
		{
			event.add(infinite, 'click', function()
			{
				var input = this.parentNode.getElementsByTagName('input')[0];
				input.value = -1;
				preferences.change_temp_value(input);
				return true;
			});
		}
	}
	var offs = dom.get_by_class('off', dom.get('mwt_pref'));
	var off = {};
	for (var i = 0; i < offs.length; i++)
	{
		off = offs[i];
		event.add(off, 'click', function()
		{
			var input = this.parentNode.getElementsByTagName('input')[0];
			input.value = 0;
			preferences.change_temp_value(input);
			return true;
		});
	}
	// Inject Values
	var inputs = dom.get('mwt_pref').getElementsByTagName('input');
	for (var i=0;i<inputs.length;i++)
	{
		var id = '';
		var input = inputs[i];
		if (id = input.id.match(/pref_(.+)/))
		{
			id = id[1];
			if(input.type == 'checkbox')
			{
				input.checked = eval('this.temp.' + id);
			}
			else
			{
				input.value = eval('this.temp.'+id);
			}
		}
	}
	dom.get('pref_min_health').value = this.temp.min_health * 100;
	dom.get('pref_max_health').value = this.temp.max_health * 100;
	if (this.temp.repeat_type == 'cash')
	{
		dom.get('pref_cash_repeat').checked = true;
	}
	else
	{
		dom.get('pref_exp_repeat').checked = true;
	}
	this.displayed = true;
	return true;
}

preferences.change_temp_value = function(a)
{
	var id = a.id;
	if (id == 'pref_exp_repeat')
	{
		this.temp.repeat_type = 'exp';
	}
	else if (id == 'pref_cash_repeat')
	{
		this.temp.repeat_type = 'cash';
	}
	else if (id == 'pref_min_health')
	{
		this.temp.min_health = a.value / 100;
	}
	else if (id == 'pref_max_health')
	{
		if (a.value > 60)
		{
			a.value = 60;
		}
		this.temp.max_health = a.value / 100;
	}
	else
	{
		var var_name = a.id.replace('pref_', '');
		if (a.type == 'checkbox')
		{
			eval('this.temp.' + var_name + ' = a.checked;');
		}
		else
		{
			eval('this.temp.' + var_name + ' = utility.make_number(a.value);');
		}
	}
	return true;
}

preferences.save = function()
{
	GM_setValue('preferences', this.settings.toSource());
	return true;
}

preferences.update = function()
{
	this.settings = eval(GM_getValue('preferences'));
	if (this.settings == undefined)
	{
		this.settings = {
			bank:false,
			bank_limit:1000000,
			heal:true,
			min_health:0.25,
			max_health:0.6,
			invite:false,
			captcha_sound:false,
			fight_stamina:5,
			max_mob_size:20,
			min_mob_size:5,
			fight_repeat:true,
			repeat_type:'exp',
			repeat_threshold:10,
			repeat_limit:-1,
			fight_reset:0,
			script_repeat:-1,
			hitlist_stamina:1,
			min_refresh:1,
			max_refresh:4,
			min_bounty:0,
			max_bounty:0,
			hitlist_repeat:4,
			job_number:1,
			defend_time:30,
			defend_refresh:true
		}
	}
	preferences.save();
	return true;
}


/*-----------*/
// Boss stuff
/*-----------*/

/**
 * Get Boss Cash
 *
 * @return	integer	The Boss's cash
 */
boss.cash = function()
{
	var div = dom.get('app8743457343_cur_cash');
	if (div)
	{
		return utility.make_number(div.textContent);
	}
	return false;
}

/**
 * Get Boss Health
 *
 * @return	integer	The Boss's health as a percentage
 */
boss.health = function()
{
	var re = new RegExp('([0-9]+?)/([0-9]+)');
	var div = dom.get('app8743457343_cur_health').parentNode;
	if(health=div.textContent.match(re))
	{
		return parseInt(health[1])/parseInt(health[2]);
	}
	return false;
}

/**
 * Get Boss energy
 *
 * @return	array	The Boss's energy and max energy
 */
boss.energy = function()
{
	var re = new RegExp('([0-9]+?)/([0-9]+)');
	var div = dom.get('app8743457343_cur_energy').parentNode;
	if(fraction=div.textContent.match(re))
	{
		return [parseInt(fraction[1]),parseInt(fraction[2])];
	}
	return false;
}

boss.link = function()
{
	var test = document.getElementById('app8743457343_header');
	var links = test.getElementsByTagName('a');
	for (var i=0; i<links.length; i++)
	{
		var link = links[i];
		if (link.href.match('user_id='))
		{
			return link.href;
		}
	}
	return false;
}

/*-------------*/
// Action stuff
/*-------------*/

action.script_at_location = function(locate_id)
{
	var ca = document.cookie.split(';');
	var sca = [];
	for (var i=0;i<ca.length;i++)
	{
		var c = ca[i];
		var str = '';
		if (str = c.match(new RegExp('mwt_script([0-9]+?)=(.*)')))
		{
			var sc = {
				id:str[1],
				value:str[2]
			}
			var data = eval(sc.value);
			if (data.locate_id == locate_id)
			{
				return true;
			}
		}
	}
	return false;
}

action.do_job = function (job_number)
{
	job_number = job_number-1;
	var row_data = dom.get_by_class('rowData');
	var table = row_data[0].parentNode;
	while (table.tagName != 'TABLE')
	{
		table = table.parentNode;
	}
	var forms = table.getElementsByTagName('form');
	var form = {};
	var matches = [];
	for (var i=0; i < forms.length; i++)
	{
		form = forms[i];
		if (form.method == 'post' && form.getAttribute('action').match('do.php') != null)
		{
			matches.push(form);
		}
	}
	if (matches[job_number])
	{
		preferences.save();
		var timer = new utility.timer();
		timer.match = matches[job_number];
		timer.fn = function()
		{
			this.match.submit();
			return true;
		}
		timer.message = 'Doing Job [[time]]...';
		timer.start();
		return true;
	}
	return false;
}

/**
 * Bank Cash
 *
 * @return	boolean
 */
action.bank_cash = function()
{
	var inputs = document.getElementsByTagName('input');
	var form = {};
	var matches = [];
	for (var i=0; i < inputs.length; i++)
	{
		input = inputs[i];
		form = inputs[i].parentNode;
		if (input.value == 'Deposit' && form.method == 'post' && form.action == page.domain + '/mobwars/bank/do.php')
		{
			matches.push(form);
		}
	}
	preferences.save();
	var timer = new utility.timer();
	timer.match = matches[0];
	timer.fn = function()
	{
		this.match.submit();
		return true;
	}
	timer.message = 'Banking [[time]]...';
	timer.start();
	return true;
}

/**
 * Heal Boss
 *
 * @return	boolean
 */
action.heal_boss = function()
{
	var inputs = document.getElementsByTagName('input');
	var form = {};
	var matches = [];
	for (var i=0; i < inputs.length; i++)
	{
		input = inputs[i];
		form = inputs[i].parentNode;
		if (input.value.indexOf('Heal') && form.method == 'post' && form.action.indexOf('do.php'))
		{
			matches.push(form);
		}
	}
	preferences.save();
	var timer = new utility.timer();
	timer.match = matches[0];
	timer.fn = function()
	{
		this.match.submit();
		return true;
	}
	timer.message = 'Healing [[time]]...';
	timer.start();
	return true;
}

/**
 * Get a Job's required energy
 *
 * @param	integer	The Job Position
 * @return	integer	The Required energy
 */
action.job_requirements = function(position)
{
	var job = {};
	var row_data = dom.get_by_class('rowData');
	var table = row_data[0].parentNode;
	while (table.tagName != 'TABLE')
	{
		table = table.parentNode;
	}
	var trs = dom.get_by_class('rowData', table);
	var tr = {};
	var str = '';
	var energy = [];
	var requires = [];
	for (var i = 0; i < trs.length; i++)
	{
		tr = trs[i];
		if (str = tr.innerHTML.match(/Energy:.*?([0-9]+)/))
		{
			energy.push(parseInt(str[1]));
			if (items = tr.innerHTML.match(new RegExp('\\(use ([0-9]+?)\\)', 'g')))
			{
				var array = [];
				for (j in items)
				{
					array[j] = {};
					array[j].amount = items[j].match(new RegExp('\\(use ([0-9]+?)\\)'))[1];
				}
				var spans = tr.getElementsByTagName('SPAN');
				var k = 0;
				for (j in spans)
				{
					var span = spans[j];
					var html = '<span>' + span.innerHTML + '</span>';
					if (html.match(new RegExp('<span>\\(use [0-9]+?\\)</span>')))
					{
						var link = span.previousSibling;
						while (link.tagName != 'A')
						{
							link = link.previousSibling;
						}
						array[k].name = link.href.match(new RegExp('mobwars/jobs/#(item_[0-9]+)'))[1];
						k++;
					}
				}
				requires.push(array);
			}
			else
			{
				requires.push(false);
			}
		}
	}
	if (energy.length < position)
	{
		return false;
	}
	job.energy = parseInt(energy[position - 1]);
	job.requires = requires[position - 1];
	return job;
}

action.job_prep = function(item)
{
	var result = {};
	var links = document.getElementsByTagName('a');
	for (i in links)
	{
		var link = links[i];
		if (link.name == item)
		{
			var tr = link.parentNode;
			while (!tr.className.match('rowData'))
			{
				tr = tr.parentNode;
			}
			result.energy = parseInt(tr.innerHTML.match(new RegExp('\\bEnergy:.+?([0-9]+?)\\b'))[1]);
			result.amount = parseInt(tr.innerHTML.match(new RegExp('\\bOwned:.+?([0-9]+?)\\b'))[1]);
			if (str = tr.innerHTML.match(new RegExp('\\(use ([0-9]+?)\\)')))
			{
				result.require_amount = str[1];
				var spans = tr.getElementsByTagName('SPAN');
				for (i in spans)
				{
					var span = spans[i];
					var html = '<span>' + span.innerHTML + '</span>';
					if (html.match(new RegExp('<span>\\(use [0-9]+?\\)</span>')))
					{
						result.requires = span.parentNode.innerHTML.match(/mobwars\/jobs\/#(item_[0-9]+)/)[1];
					}
				}
			}
			else
			{
				result.requires = false;
			}
			return result;
		}
	}
	return false;
}

action.do_prep = function(item)
{
	var result = {};
	var links = document.getElementsByTagName('a');
	for (i in links)
	{
		var link = links[i];
		if (link.name == item)
		{
			var tr = link.parentNode;
			while (!tr.className.match('rowData'))
			{
				tr = tr.parentNode;
			}
			if (form = tr.getElementsByTagName('FORM')[0])
			{
				var timer = new utility.timer();
				timer.message = 'Doing Prep [[time]]...';
				timer.form = form;
				timer.fn = function()
				{
					this.form.submit();
					return true;
				}
				timer.start();
				return true;
			}
		}
	}
	return false;
}

action.prop_info = function()
{
	var tables = dom.get_by_class('3col');
	var undev_table = tables[0];
	var table = tables[1];
	var undev_trs = [];
	var trs = [];
	var tr = undev_table.getElementsByTagName('tr')[0];
	var props = [];
	while (tr.nextSibling)
	{
		tr = tr.nextSibling;
		if(tr.tagName == 'TR')
		{
			undev_trs.push(tr);
		}
	}
	tr = table.getElementsByTagName('tr')[0];
	while (tr.nextSibling)
	{
		tr = tr.nextSibling;
		if(tr.tagName == 'TR')
		{
			trs.push(tr);
		}
	}
	var cost_re = new RegExp('\\$([0-9]{1,4}(,[0-9]{3})*)</span>');
	var income_re = new RegExp('Income:.*?\\$([0-9]{1,4}(,[0-9]{3})*)');
	var req_re = new RegExp('<br>Built.+?On:.+?(.+?)(  )');
	var owned_re = new RegExp('([0-9]+?)</b></span>');
	for(var i=0;i<trs.length;i++)
	{
		tr = trs[i];
		var prop = {};
		var b = tr.getElementsByTagName('b')[0];
		prop.name = b.innerHTML;
		prop.undev = false;
		if (match = tr.innerHTML.match(cost_re))
		{
			prop.cost = utility.make_number(match[1]);
		}
		if (match = tr.innerHTML.match(income_re))
		{
			prop.income = utility.make_number(match[1]);
		}
		if (match = tr.innerHTML.match(req_re))
		{
			prop.require = match[1];
		}
		if (prop.cost && prop.income)
		{
			prop.ror = (prop.income/prop.cost)*100;
		}
		props.push(prop);
	}
	for(var i=0;i<undev_trs.length;i++)
	{
		tr = undev_trs[i];
		var prop = {};
		var b = tr.getElementsByTagName('b')[0];
		prop.name = b.innerHTML;
		prop.undev = true;
		prop.require = false;
		if (match = tr.innerHTML.match(cost_re))
		{
			prop.cost = utility.make_number(match[1]);
		}
		if (match = tr.innerHTML.match(income_re))
		{
			prop.income = utility.make_number(match[1]);
		}
		if (match = tr.innerHTML.match(owned_re))
		{
			prop.owned = utility.make_number(match[1]);
		}
		if (prop.cost && prop.income)
		{
			prop.ror = (prop.income/prop.cost)*100;
		}
		props.push(prop);
	}
	props.sort(function(a, b){return (b.ror-a.ror);});
	return props;
}

action.buy_prop = function (prop_name, amount)
{
	amount = amount || 10;
	var tables = dom.get_by_class('3col');
	var undev_table = tables[0];
	var table = tables[1];
	var trs = [];
	var tr = undev_table.getElementsByTagName('tr')[0];
	var props = [];
	while (tr.nextSibling)
	{
		tr = tr.nextSibling;
		if(tr.tagName == 'TR')
		{
			trs.push(tr);
		}
	}
	tr = table.getElementsByTagName('tr')[0];
	while (tr.nextSibling)
	{
		tr = tr.nextSibling;
		if(tr.tagName == 'TR')
		{
			trs.push(tr);
		}
	}
	for(var i=0;i<trs.length;i++)
	{
		var tr = trs[i];
		var b = tr.getElementsByTagName('b')[0];
		var c_name = b.innerHTML;
		if (c_name == prop_name)
		{
			var form = tr.getElementsByTagName('form')[0];
			form.getElementsByTagName('select')[0].value = amount;
			var timer = new utility.timer();
			timer.message = c_name+' [[time]]...';
			timer.form = form;
			timer.fn = function()
			{
				this.form.submit();
				return true;
			}
			timer.start();
			return true;
		}
	}
	return false;
}

action.do_script = function(script)
{
	menu.toggle('stop');
	menu.status('Running Script...');
	if (script)
	{
		// Make sure script type isn't used
		var ca = document.cookie.split(';');
		var sca = [];
		for (var i=0;i<ca.length;i++)
		{
			var c = ca[i];
			var str = '';
			if (str = c.match(new RegExp('mwt_script([0-9]+?)=(.*)')))
			{
				var sc = {
					id:str[1],
					value:str[2]
				}
				var data = eval(sc.value);
				if (data.script == script && data.loaded)
				{
					var timer = new utility.timer();
					timer.message = 'Already Running [[time]]...';
					timer.time = 5;
					timer.fn = function()
					{
						action.stop_script();
						return true;
					}
					timer.start();
					return false;
				}
				else if(data.script == script)
				{
					deleteCookie(sc.id);
					page.script_cookie=false;
				}
			}
		}
	}
	if (page.script_cookie === false)
	{
		var script_id = '0';
		var largest_id = page.largest_id();
		if (largest_id === false)
		{
			script_id = '0';
		}
		else
		{
			script_id = largest_id+1;
		}
		page.script_cookie = 'mwt_script'+script_id;
		page.ignore_cookie = 'mwt_ignore'+script_id;
	}
	var data = getCookie(page.script_cookie);
	var settings = preferences.settings;
	if (data)
	{
		data = eval(data);
		script = data.script;
	}
	else
	{
		data = {};
		data.script = script;
		data.stage = 0;
		data.count = 0;
		data.repeats = 0;
		data.refreshed = false;
	}
	data.locate_id = false;
	data.loaded = true;
	createCookie(page.script_cookie, data.toSource(), 30);
	if(settings.invite)
	{
		var invite = eval(GM_getValue('inviter', null));
		if(!invite)
		{
			invite = {};
			invite.rid = '';
			invite.last = 0;
		}
		var date = new Date().getTime();
		if ((date-invite.last) >= 86400000)
		{
			if (location.href.match('/mobwars/mob'))
			{
				invite.last = new Date().getTime();
				var id = document.getElementsByTagName('form')[1].id.replace('req_form_','');
				invite.rid = id;
				data.locate_id = invite.locate;
				GM_setValue('inviter', invite.toSource());
				createCookie(page.script_cookie, data.toSource(), 30);
				page.goto_link(page.domain+invite.locate+'/', 'Redirecting');
				return true;
			}
			else
			{
				invite.locate = page.locate_id;
				GM_setValue('inviter', invite.toSource());
				data.locate_id = '/mobwars/mob';
				createCookie(page.script_cookie, data.toSource(), 30);
				page.goto_link(page.domain+'/mobwars/mob/', 'Redirecting');
				return true;
			}
		}
		else
		{
			var links = document.getElementsByTagName('a');
			var count = 0;
			var re = new RegExp('/mobwars/profile/\\?user_id=([0-9]+)');
			var own_id = '';
			var idstr = '';
			for(var i=0;i<links.length;i++)
			{
				link = links[i];
				if (id = link.href.match(re))
				{
					id = id[1];
					count++;
					if (count>1 && id != own_id) //Ignore own link
					{
						idstr += '&ids%5B%5D='+id;
					}
					else
					{
						own_id = id;
					}
				}
			}
			if (idstr.length>0)
			{
				idstr = invite.rid+'=Start+Typing+a+Friend%27s+Name'+idstr;
				GM_xmlhttpRequest({
					method: "POST",
					url: 'http://apps.facebook.com/mobwars/mob/do.php',
					headers:{'Content-type':'application/x-www-form-urlencoded'},
					data:idstr,
					onload: function(xhr){}
				});
			}
		}
	}
	if (script == 'job')
	{       menu.status('Starting Job scripit');
		createCookie(page.script_cookie, data.toSource(), 30);
			//Health check
                        menu.status('Starting Healing from job ...');
			if (settings.heal && boss.health() <= settings.min_health)
			{
				data.healing = true;
				data.locate_id = '/mobwars/hospital';
				createCookie(page.script_cookie, data.toSource(), 30);
				if (location.href.match('mobwars/hospital'))
				{
					menu.status('Healing from job...');
					action.heal_boss();
				}
				else
				{
					page.goto_link(page.domain+'/mobwars/hospital/', 'Healing');
                                        menu.status('Healing from job...');
					action.heal_boss();
				}
			}
			if (data.healing && boss.health() < settings.max_health)
			{
				data.locate_id = '/mobwars/hospital';
				createCookie(page.script_cookie, data.toSource(), 30);
				if (location.href.match('mobwars/hospital'))
				{
					menu.status('Healing from job...');
					action.heal_boss();
				}
				else
				{
					page.goto_link(page.domain+'/mobwars/hospital/', 'Healing');
					menu.status('Healing from job...');
					action.heal_boss();
				}
			}
			data.healing = false;
	

		createCookie(page.script_cookie, data.toSource(), 30);
		if (data.stage == 0) //Get boss type
		{
			var link = boss.link();
			if (location.href.match(link.substr(-15)))
			{
				var reg = new RegExp('Level [0-9]+? (\\b.*\\b)');
				var title = dom.get('app8743457343_content').getElementsByTagName('H1')[0];
				data.boss_type = title.innerHTML.match(reg)[1].toLowerCase();
				data.stage = 1;
			}
			else
			{
				data.locate_id = page.make_locate_id(link);
				createCookie(page.script_cookie, data.toSource(), 30);
				page.goto_link(link, 'Redirecting');
				return true;
			}
		}
		if (data.stage == 1) // Cash / Banking check
		{
			if (settings.bank && action.script_at_location('/mobwars/bank') === false && boss.cash() >= settings.bank_limit)
			{
				data.locate_id = '/mobwars/bank';
				createCookie(page.script_cookie, data.toSource(), 30);
				if (location.href.match('mobwars/bank'))
				{
					menu.status('Banking...');
					action.bank_cash();
				}
				else
				{
					page.goto_link(page.domain+'/mobwars/bank/', 'Banking');
				}
				return true;
			}
			data.stage = 2;
		}
		if (data.stage == 2) // Page redirect
		{
			data.locate_id = '/mobwars/jobs';
			createCookie(page.script_cookie, data.toSource(), 30);
			if (location.href.match('mobwars/jobs'))
			{
				menu.status('Checking Reqs...');
				data.require = action.job_requirements(settings.job_number);
				data.stage = 3;
			}
			else
			{
				page.goto_link(page.domain+'/mobwars/jobs/', 'Redirecting');
				return true;
			}
		}
		if (data.stage == 3) //Check energy
		{
			var recharging = 0;
			if (boss.energy()[1] < data.require.energy)
			{
				recharging = 1;
			}
			else if (boss.energy()[0] < data.require.energy)
			{
				var energy_req = parseInt(data.require.energy);
				recharging = 2;
			}
			if (data.require.requires)
			{
				var items = data.require.requires;
				for (i in items)
				{
					var item = items[i];
					data.c_prep = item;
					data.prep = action.job_prep(item.name);
					if (data.prep.requires) //Item requires something else
					{
						require_amount = data.prep.require_amount; //Item require amount
						data.c_prep = {};
						data.c_prep.amount = require_amount;
						data.c_prep.name = data.prep.requires;
						data.prep = action.job_prep(data.prep.requires);
						if (data.prep.energy > boss.energy()[1])
						{
							recharging = 1;
							break;
						}
						else if (data.prep.energy > boss.energy()[0] && require_amount > data.prep.amount)
						{
							var energy_req = parseInt(data.prep.energy);
							recharging = 2;
							break;
						}
						else if (require_amount > data.prep.amount)
						{
							recharging = 0;
							break;
						}
						else
						{
							data.prep = action.job_prep(item.name);
						}
					}
					if (data.prep.energy > boss.energy()[1])
					{
						recharging = 1;
						break;
					}
					else if (data.prep.energy > boss.energy()[0] && item.amount > data.prep.amount)
					{
						var energy_req = parseInt(data.prep.energy);
						recharging = 2;
						break;
					}
					else if (item.amount > data.prep.amount)
					{
						recharging = 0;
						break;
					}
				}
			}
			if (recharging == 1)
			{
				var timer = new utility.timer();
				timer.message = 'Can\'t Do Job [[time]]...';
				timer.time = 5;
				timer.fn = function ()
				{
					action.stop_script();
					return true;
				}
				timer.start();
				return false;
			}
			else if (recharging == 2)
			{
				var recharge = parseInt(energy_req - boss.energy()[0]);
				var wait = 300;
				if (data.boss_type == 'insomniac') wait = 240;
				recharge = recharge * wait;
				data.locate_id = '/mobwars/jobs';
				createCookie(page.script_cookie, data.toSource(), 30);
				page.goto_link(page.domain+'/mobwars/jobs/', 'Getting Energy', recharge);
				return true;
			}
			data.stage = 4;
		}
		if (data.stage == 4) //Do Prep
		{
			if (data.require.requires)
			{
				if (data.c_prep.amount > data.prep.amount) //Do we need prep?
				{
					data.stage = 1;
					data.locate_id = '/mobwars/jobs';
					createCookie(page.script_cookie, data.toSource(), 30);
					action.do_prep(data.c_prep.name);
					return true;
				}
			}
			data.stage = 5;
		}
		if (data.stage == 5) //Do Job
		{
			if (action.do_job(settings.job_number) === false)
			{
				var timer = new utility.timer();
				timer.message = 'Can\'t Do Job [[time]]...';
				timer.time = 5;
				timer.fn = function ()
				{
					action.stop_script();
					return true;
				}
				timer.start();
				return false;
			}
			else
			{
				data.stage = 1;
				data.count++;
				if (data.count >= settings.script_repeat && -1 != settings.script_repeat) data.stage = -1;
				data.locate_id = '/mobwars/jobs';
				createCookie(page.script_cookie, data.toSource(), 30);
			}
			return true;
		}
	}
	else if (script == 'buy')
	{
		createCookie(page.script_cookie, data.toSource(), 30);
		if (data.stage == 0)
		{
			if (location.href.match('mobwars/city'))
			{
				data.stage = 1;
			}
			else
			{
				data.refreshed = false;
				data.locate_id = '/mobwars/city';
				createCookie(page.script_cookie, data.toSource(), 30);
				page.goto_link(page.domain+'/mobwars/city/', 'Redirecting');
				return true;
			}
		}
		if (data.stage == 1)
		{
			if (data.count >= settings.script_repeat && -1 != settings.script_repeat)
			{
				action.stop_script();
				return true;
			}
			if (data.refreshed === true)
			{
				// AJAX get cash
				data.locate_id = '/mobwars/city';
				data.stage = 2;
				createCookie(page.script_cookie, data.toSource(), 30);
				var timer = new utility.timer();
				timer.time = 120;
				timer.message = 'Waiting [[time]]...';
				if (data.c_prop)
				{
					timer.message = data.c_prop+' [[time]]...';
				}
				timer.fn = function()
				{
					menu.status('Checking Cash...');
					GM_xmlhttpRequest({
						method: "GET",
						url: 'http://apps.facebook.com/mobwars/',
						onload: function(xhr)
						{
							var data = eval(getCookie(page.script_cookie));
							var re = new RegExp('\\$([0-9]{1,4}(,[0-9]{3})*)</span>');
							data.cash = utility.make_number(xhr.responseText.match(re)[1]);
							createCookie(page.script_cookie, data.toSource(), 30);
							action.do_script();
							return true;
						}
					});
					return true;
				}
				timer.start();
				return true;
			}
			else
			{
				// Normal get cash
				data.cash = boss.cash();
				data.stage = 2;
				data.refreshed = true;
			}
		}
		if (data.stage == 2)
		{
			var props = action.prop_info();
			var prop = props[0];
			data.c_prop=prop.name;
			cost = prop.cost * 10;
			if (cost <= data.cash)
			{
				if (prop.undev)
				{
					data.locate_id = '/mobwars/city';
					data.refreshed = false;
					data.stage = 0;
					data.count++;
					createCookie(page.script_cookie, data.toSource(), 30);
					action.buy_prop(prop.name);
					return true;
				}
				else
				{
					data.locate_id = '/mobwars/city';
					data.refreshed = false;
					var require = prop.require;
					var c_require = '';
					var c_prop = {};
					var i = 0;
					while(require != c_require)
					{
						c_prop = props[i];
						if (c_prop.undev)
						{
							c_require = c_prop.name;
						}
						i++;
					}
					if (c_prop && 10>c_prop.owned)
					{
						data.stage = 0;
						data.count++;
						createCookie(page.script_cookie, data.toSource(), 30);
						action.buy_prop(c_prop.name);
						return true;
					}
					data.stage = 0;
					data.count++;
					createCookie(page.script_cookie, data.toSource(), 30);
					action.buy_prop(prop.name);
					return true;
				}
			}
			else
			{
				data.stage = 0;
				createCookie(page.script_cookie, data.toSource(), 30);
				action.do_script();
				return true;
			}
		}
	}
	else if (script == 'defend')
	{
		createCookie(page.script_cookie, data.toSource(), 30);
		if (data.stage == 0) // Health checks
		{
			//Health check
			if (settings.heal && boss.health() <= settings.min_health)
			{
				data.healing = true;
				data.locate_id = '/mobwars/hospital';
				createCookie(page.script_cookie, data.toSource(), 30);
				if (location.href.match('mobwars/hospital'))
				{
					menu.status('Healing...');
					action.heal_boss();
				}
				else
				{
					page.goto_link(page.domain+'/mobwars/hospital/', 'Healing');
				}
				return true;
			}
			if (data.healing && boss.health() < settings.max_health)
			{
				data.locate_id = '/mobwars/hospital';
				createCookie(page.script_cookie, data.toSource(), 30);
				if (location.href.match('mobwars/hospital'))
				{
					menu.status('Healing...');
					action.heal_boss();
				}
				else
				{
					page.goto_link(page.domain+'/mobwars/hospital/', 'Healing');
				}
				return true;
			}
			data.healing = false;
			data.stage = 1;
		}
		if (data.stage == 1) // Cash / Banking check
		{
			if (settings.bank && boss.cash() >= settings.bank_limit)
			{
				data.locate_id = '/mobwars/bank';
				createCookie(page.script_cookie, data.toSource(), 30);
				if (location.href.match('mobwars/bank'))
				{
					menu.status('Banking...');
					action.bank_cash();
				}
				else
				{
					page.goto_link(page.domain+'/mobwars/bank/', 'Banking');
				}
				return true;
			}
			data.stage = 2;
		}
		if (data.stage == 2) //Count and set timestamp
		{
			data.count++
			if (data.count >= settings.script_repeat && -1 != settings.script_repeat)
			{
				action.stop_script();
				return true;
			}
			data.timestamp = new Date().getTime()+(settings.defend_time*1000);
			data.stage = 3;
		}
		if (data.stage == 3) //Wait time!
		{
			var time = new Date().getTime();
			if (time >= data.timestamp)
			{
				data.stage = 0
				data.locate_id = page.locate_id;
				createCookie(page.script_cookie, data.toSource(), 30);
				if (true === settings.defend_refresh)
				{
					page.goto_link(location.href, 'Checking Stats', 0);
				}
				else
				{
					action.do_script();
				}
				return true;
			}
			time = Math.ceil((data.timestamp-time)/1000);
			var timer = new utility.timer();
			timer.time = time;
			timer.message = 'Waiting [[time]]...';
			timer.fn = function()
			{
				action.do_script();
				return true;
			}
			createCookie(page.script_cookie, data.toSource(), 30);
			timer.start();
			return true;
		}
	}
	action.stop_script();
	return true;
}

action.stop_script = function()
{
	menu.toggle('menu');
	menu.status('Idle.');
	if (page.script_cookie)
	{
		deleteCookie(page.script_cookie);
		deleteCookie(page.ignore_cookie);
		menu.stop_called = true;
		page.script_cookie = false;
	}
	else
	{
		menu.stop_called = false;
	}
	return true;
}

/*--------------*/
// Utility stuff
/*--------------*/

/**
 * Extract Number characters from a string
 *
 * @param	string
 * @return	integer	The Number
 */
utility.make_number = function(string)
{
	var number = 0;
	var number_string = '';
	for (var i = 0; i < string.length; i++)
	{
		var character = string.charAt(i);
		if (parseInt(character) || parseInt(character) == 0)
		{
			number_string += parseInt(character);
		}
	}
	number = parseInt(number_string);
	return number;
}

utility.seconds_to_string = function(seconds)
{
	if (seconds>60)
	{
		var minutes = Math.floor(seconds/60);
		seconds = seconds - (minutes*60);
		if (minutes>60)
		{
			var hours = Math.floor(minutes/60);
			minutes = minutes-(hours*60);
			return hours+'h:'+minutes+'m:'+seconds+'s';
		}
		return minutes+'m:'+seconds+'s';
	}
	return seconds+'s';
}

utility.play_sound = function(src, timer)
{
	var html = '<embed src="'+src+'" hidden="true" autostart="true" loop="false">';
	dom.get('sound_player').innerHTML = html;
	if (timer)
	{
		var _timer = new utility.timer();
		_timer.repeat = timer;
		_timer.sid = src;
		_timer.time = timer.time;
		_timer.message = timer.message;
		_timer.fn = function()
		{
			page.script_redirect = false; // We aren't going anywhere
			utility.play_sound(this.sid, this.repeat);
			return true;
		}
		_timer.start();
	}
	return true;
}

utility.get_form = function(form)
{
	theForm = dom.get(form);
	var reqStr = "";
	
	for(i=0; i < theForm.elements.length; i++) 
	{ 
		isFormObject = false; 
		
		switch (theForm.elements[i].tagName) 
		{ 
			case "INPUT": 
			
			switch (theForm.elements[i].type) 
			{ 
				case "text":
				case "password":
				case "hidden": 
				reqStr += theForm.elements[i].name + "=" + encodeURIComponent(theForm.elements[i].value); 
				isFormObject = true; 
				break; 
				
				case "checkbox":
				if (theForm.elements[i].checked) 
				{
					reqStr += theForm.elements[i].name + "=" + theForm.elements[i].value; 
				}
				else
				{ 
					reqStr += theForm.elements[i].name + "="; 
				}
				
				isFormObject = true; 
				break; 
				
				case "radio": 
				if (theForm.elements[i].checked) 
				{ 
					reqStr += theForm.elements[i].name + "=" + theForm.elements[i].value; 
					isFormObject = true; 
				} 
			} 
			break; 
			
			case "TEXTAREA": 
			
			reqStr += theForm.elements[i].name + "=" + encodeURIComponent(theForm.elements[i].value); 
			isFormObject = true; 
			break; 
			
			case "SELECT": 
			var sel = theForm.elements[i]; 
			reqStr += sel.name + "=" + sel.options[sel.selectedIndex].value; 
			isFormObject = true; 
			break; 
		} 
		
		if (isFormObject && (i+1)!= theForm.elements.length) 
		{ 
			reqStr += "&"; 
		}
	}

	return reqStr;
}

/**
 * Timer, replaces '[time]' in message with remaining time.
 *
 * @param	object	Element
 * @param	string	The message to put in innerHTML
 * @param	function	Fn to run after timer finished
 * @param	integer	Time in seconds to display
 * @return	boolean	param2
 */
utility.timer = function ()
{
	this.fn = function(){};
	this.time = Math.floor(Math.random() * 5 + 2);
	this.message = false;
	this.start = function()
	{
		if (menu.stop_called === true)
		{
			menu.stop_called = false;
			return false;
		}
		this.time = parseInt(this.time);
		if (this.message)
		{
			var html = this.message.replace('[time]', utility.seconds_to_string(this.time))
			menu.status(html);
		}
		if (this.time > 0)
		{
			this.time = this.time - 1;
			var func = function(ob)
			{
				ob.start();
			}
			setTimeout(func, 1000, this);
		}
		else
		{
			if (page.script_cookie)
			{
				var data = eval(getCookie(page.script_cookie));
				data.last_date = new Date().getTime();
				data.loaded = false;
				createCookie(page.script_cookie, data.toSource(), 30);
			}
			page.script_redirect = true;
			this.fn();
		}
		return true;
	}
	return true;
}

/*--------------*/
// Element stuff
/*--------------*/

/**
 * Fade Out
 */
element.fade_out = function(selector, time, destroy)
{
	var object = dom.get(selector);
	if (element.fading_out == undefined)
	{
		element.fading_out = false;
	}
	if (object.style.opacity == '' || object.style.opacity == undefined)
	{
		object.style.opacity = parseInt(1);
	}
	if (element.fading_out === false)
	{
		var changes = Math.ceil(time / 50);
		element.fade_out_change = object.style.opacity / changes;
		element.fade_out_opacity = object.style.opacity;
		element.fading_out = true;
	}
	element.fade_out_opacity = element.fade_out_opacity - element.fade_out_change;
	object.style.opacity = element.fade_out_opacity;
	time = time - 50;
	if (time > 0)
	{
		setTimeout(element.fade_out, 50, selector, time, destroy);
	}
	else
	{
		object.style.opacity = 0;
		if (destroy === true)
		{
			object.parentNode.removeChild(object);
		}
		else
		{
			object.style.display = 'none';
		}
		element.fading_out = false;
	}
	return true;
}

/**
 * Document elements
 * 
 * @var	object
 */
var dom = {
	get: function(element)
	{
		if (typeof element === 'string')
		{
			return document.getElementById(element);
		}
		else if (element.nodeType)
		{
			return element;
		}
		else
		{
			return false;
		}
	},
	get_by_class: function(string, element)
	{
		element = element || document;
		if (element.nodeType)
		{
			element = element;
		}
		else if ( this.get(element) )
		{
			element = this.get(element); 
		}
		else
		{
			return false;
		}
		var elements = element.getElementsByTagName('*');
		var result_elements = [];
		var re = new RegExp('\\b' + string + '\\b', 'i');
		for (var i = 0; i < elements.length; i++)
		{
			if (elements[i].className.match(re))
			{
				result_elements.push(elements[i]);
			}
		}
		return result_elements;
	},
	add: function(element, destination)
	{
		var element = this.get(element);
		var destination = this.get(destination);
		destination.appendChild(element);
	},
	remove: function(element)
	{
		var element = this.get(element);
		element.parentNode.removeChild(element);
	},
	replace: function(elementOne, elementTwo)
	{
		elementOne = this.get(elementOne);
		var theParent = elementOne.parentNode;
		this.remove(elementOne);
		this.add(elementTwo, theParent);
	}
};

/**
 * Events
 * 
 * @var	object
 */
var event = {
	add: function()
	{
		if (window.addEventListener)
		{
			return function(element, type, fn)
			{
				dom.get(element).addEventListener(type, fn, false);
			};
		}
		else if (window.attachEvent)
		{
			return function(element, type, fn)
			{
				var fn2 = function() {
					fn.call(dom.get(element), window.event);
				};
				dom.get(element).attachEvent('on' + type, fn2);
			};
		}
	}(),
	
	remove: function()
	{
		if (window.removeEventListener)
		{
			return function(element, type, fn)
			{
				dom.get(element).removeEventListener(type, fn, false);
			};
		}
		else if (window.detachEvent)
		{
			return function (element, type, fn)
			{
				var fn2 = function() {
					fn.call(dom.get(element), window.event);
				};
				dom.get(element).detachEvent('on' + type, fn2);
			};
		}
	}()
};

String.prototype.trim = function()
{
	return this.replace(/^\s*|\s*$/g,'');
}

String.prototype.ltrim = function()
{
	return this.replace(/^\s*/g,'');
}

String.prototype.rtrim = function()
{
	return this.replace(/\s*$/g,'');
}

function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; domain=.facebook.com; path=/";
}

function getCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function deleteCookie(name)
{
	createCookie(name,"",-1);
}

// Do the stuff
page.init();