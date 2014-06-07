// ==UserScript==
// @name           RJ BC 1.11 (mod)
// @namespace      Delete_tester
// @description    Bookmarklet loader for the Spockholm Mafia Tools
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==

/*
	Credits:
	Vern for a lot of code and inspiration, http://vern.com/mwtools/
	Pete Lundrigan (Pistol Pete) for contributing code.

	(c) Spockholm Mafia Tools - http://www.spockholm.com/mafia/bookmarklets.php

	2011-03-16	v1.00	First version of a RepeatJob for Brazil
	2011-03-20	v1.01	More features added, released as public beta.
	2011-03-21	v1.02	User mafia strength and attack added.
	2011-03-22	v1.03	Pause options added.
	2011-03-24	v1.04	Loot fetching added and pause before levelup.
				v1.05	Adding job selection to dropdown menu
				v1.06	Fix for change in item lookup response
				v1.06m	Add button to use mini-energypack
	2011-04-10	v1.07	Loot drop % added
	2011-06-17			Triage to the find_active_job function
	2011-08-14	v1.09	Attempt to fix the session problem
	2011-09-20	v1.10	Blindfolded Chicago patches
	2011-10-11	v1.11	Brazil secret district consumable
*/
refresh_timer = false;
javascript:(function(){
	//begin unframe code
	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/m.mafiawars.com/.test(document.location)) {
		window.location.href = document.location+'?iframe=1';
	}
	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
		//Credits to Toenailsin for this fix
		for (var i = 0; i < document.forms.length; i++) {
			if (/canvas_iframe_post/.test(document.forms[i].id) && document.forms[i].target == "mafiawars") {
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
		}
	}
	else if (document.getElementById('some_mwiframe')) {
		// new mafiawars.com iframe
		window.location.href = document.getElementById('some_mwiframe').src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY = "scroll";
		document.body.style.overflowX = "auto";
		document.body.style.overflowY = "auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
			if (typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent;
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer = -1;
			}
			document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);

		} catch (fberr) {}
		//Revolving Revolver of Death from Arun, http://arun.keen-computing.co.uk/?page_id=33
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
	}
	//fix for the broken popups when unframing FB
	function fix_block() {
		setTimeout(function(){
			//Thanks to Shih-Yuan Hsu for hints on how to optimize this
			$('#popup_fodder div:first').find("div[id^='pop_b']").each(function() {
				if (!$(this).attr('opened')) {
					$(this).css('display','block');
					$(this).attr('opened','yes');
				}
			});
		},250);
	}
	if (/snapi_auth_hash/.test(document.location)) {
		//popups appear to be broken on apps.facebook.com still, fix this
		document.getElementById('popup_fodder').addEventListener('DOMSubtreeModified', fix_block, false);
	}
	//end unframe code

	//hack to kill the resizer calls
	iframeResizePipe = function() {};

	//initial variables
	var version = 'RepeatJob Brazil/Chicago v1.11 beta',
	userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1],
	personid = /([a-z]\|([0-9]+))/.exec(userid)[2],
	bossenergy = parseInt($('#user_max_energy').html()*0.2).toFixed(0),
	spocklet = 'rj_brazil',
	tagname = spocklet+'_savecookie',
	restarts = 0, restartlimit = 100,
	energy_ratio = 0, stamina_ratio = 0, combined_ratio = 0,
	job_energy = 0,
	consumable_farm = false,
	run = true;
	var xw_city = $('#mw_city_wrapper').attr('class').substr(7), sign;
	switch (parseInt(xw_city)) {
		case 7:
			sign = '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/brz_real_sm.png" width="15" height="15" align="middle" />';
			break;
		case 8:
			sign = '<img src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/chic_clam_sm.png" width="15" height="15" align="middle" />';
			break;
		default: 
			sign = '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/brz_real_sm.png" width="15" height="15" align="middle" />';
	}

	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	var preurl = http+'facebook.mafiawars.zynga.com/mwfb/';
	//objects for misc stuff
	var looted = {},
	jobResult = {},
	stats = {
		"money_gained": 0,
		"money_spent": 0,
		"money_banked": 0,
		"energy_used":0,
		"stamina_used": 0,
		"experience_gained": 0,
		"jobs_done": 0,
		"attack": 0,
		"attack_start": 0,
		"defense": 0,
		"defense_start": 0,
		"mastermind": 0,
		"wheelman": 0,
		"bagman": 0,
		"lootcount": 0
	},
	consumables = {
		2680: {	"name": "Radio Phone", "tab": 3, "job": 29 },
		2681: {	"name": "Button Camera", "tab": 2, "job": 24 },
		2682: {	"name": "Satchel Charge", "tab": 5, "job": 49 },
		2683: {	"name": "Gas Can", "tab": 1, "job": 2 },
		2684: {	"name": "Local Informant", "tab": 1, "job": 3 },
		8026: {	"name": "Life Saver", "tab": 101, "job": 102 },
		5689: {	"name": "Jungle Map", "tab": 102, "job": 202 },
		11048: { "name": "Body Bag", "tab": 1, "job": 5 },	
		11049: { "name": "Incriminating Documents", "tab": 2, "job": 13 },
		11050: { "name": "Concrete Shoes", "tab": 3, "job": 22 },
		5708: { "name": "Casa Grande Reservation", "tab": 103, "job": 301 },
		3212: { "name": "Confidential Records", "tab": 4, "job": 26 },
		3229: { "name": "Beer Barrel", "tab": 5, "job": 34 },
		3245: { "name": "Mediator", "tab": 6, "job": 41 }
	};

	function imgurl(img,w,h,a) {
		return '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+img+'" width="'+w+'" height="'+h+'" title="'+a+'" alt="'+a+'">';
	}
	
	//setup images
	var playimg = 'data:image/gif;base64,R0lGODlhEAAQAMQAAP8A/2K1SIHOEXbIAIPTHZXbMIDRFnbIAXfJA33OEM/vqIbWJHrMC5HLf3jKB/D/3/X/6fn/8uz/1ej/zJjcRc7vpv3/+qHfVP///+T/xAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAVqICCOZEk2QaqmTRlUSizHVTA21LXs/H5RLUCAQCRgikib0MA0WCzNpjKQqCYiWGt1yugyIGCIlzF1mB2P9OPsmCLeCIkc/p4e7ofJBI+fDv4DGYCDSg0Ch4iJh0FCBY6PkEo3KyuMJpcjIQA7',
	pauseimg = 'data:image/gif;base64,R0lGODlhEAAQAOYAAP8A/zaa/3O4/xal/6jd//L6//r9/87s/8bp/+r3/+Dz/////9bv/xel/xim/xun/xyn/1zA/1a+/0q5/y6u/yWr/x6o/3nL/0S3/yGp/6fd/xqn/2fE/zmz/zmy/2jF/yKq/4rS/27H/3bK/026/zOw/zGw/z+0/1q//0i4/0O2/0m5/3HI/zax/3fK/ySq/067/1O8/1G8/1m//y2u/z20/2HC/5DU/3vM/1C7/yis/x+o/zCv/6vf/3LI/4vS/yOq/zqz/23H/z+1/z60/zuz/zWx/1i+/1vA/2LC/2rF/33N/0u6/2bE/3PJ/yyu/3jL/2nF/y+v/yms/2TD/4nR/6re/xmm/2DC/ySr/3rM/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAewgACCg4SFhAIBiYqJAoUBPQSRkRoaBFYBgwI3IThaFxdQLiNLP1WNAAFOPiwLCyJCrUpRH5ioHE1UBgY2WLoRSCi1ATNHEgUFMTLHMCRMwhMrKQkJGCrTQ0Q1wkVBHQoKLUbfJjxSwhQ0TwwMUzrrFVkvwkAgGQcHOxb3EBAPwhsbriBA4MDBwAYNBtQSMKChwwYOHljIUOEUKgolPJzAMCGHhAhJamVatMiioZODAgEAOw%3D%3D',
	stopimg = 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7',
	levelup = imgurl('icon_promote_up_15x15_01.gif','13','13','Level up'),
	star = imgurl('icon_star_16x16_gold_01.gif','13','13','Mastered Job or Tier'),
	mastermind = imgurl('icon_experience_16x16_01.gif','13','13','Mastermind bonus, 50% more exp'),
	wheelman = imgurl('icon-energy.gif','13','13','Wheelman bonus, no energy spent'),
	bagman = imgurl('icon_cash_16x16_01.gif','13','13','Bagman bonus, double cash'),
	staminaimg = imgurl('icon_stamina_16x16.png','13','13','Stamina'),
	mafia_attack = imgurl('icon_mafia_attack_22x16_01.gif','22','16','Mafia Attack Strength'),
	mafia_defense = imgurl('icon_mafia_defense_22x16_01.gif','22','16','Mafia Defense Strength');
	
	function get_selected_jobinfo(callfrom) {
		//function that reads the selected job
	}

	//setup the initial html
	var style = '<style type="text/css">'+
		'.messages {border: 1px solid #888888; margin-bottom: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;}'+
		'.messages img{margin:0 3px;vertical-align:middle}'+
		'.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px;}'+
	'</style>';

	var logo = '<a href="http://www.spockholm.com/mafia/testing.php#RepeatJobBrazil" target="_blank"><img src="http://www.mafia-tools.com/uploads/banner-spockholm-mafia-tools.png#RepeatJobBrazil" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" /></a>';
	var bankingrow = sign+' Bank above $<input id="'+spocklet+'_bankamount" name="'+spocklet+'_savecookie" type="text" value="50000" maxlength="9" style="width:65px" />';

	var spocklet_html =
	'<div id="'+spocklet+'_main">'+
		style+
		'<table class="messages">'+
		'<tr><td colspan="3" align="center" style="text-align:center;">'+logo+'<br />'+
			'<a href="http://www.spockholm.com/mafia/donate.php#RepeatJobBrazil" id="'+spocklet+'_donate" class="sexy_button_new short white" target="_blank" title="Like what we do? Donate to Team Spockholm" alt="Like what we do? Donate to Team Spockholm"><span><span>Donate</span></span></a>'+
			'&nbsp;<a href="http://www.spockholm.com/mafia/help.php#RepeatJobBrazil" id="'+spocklet+'_help" class="sexy_button_new short" target="_blank" title="Get help" alt="Get help"><span><span>Help</span></span></a>'+
			'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="good">'+version+'</span>'+
			'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href="#" id="'+spocklet+'_play" class="sexy_button_new short green" title="Start RepeatJob" alt="Start RepeatJob"><span><span>Start</span></span></a>'+
			'<a href="#" id="'+spocklet+'_pause" class="sexy_button_new short orange" title="Pause RepeatJob" alt="Pause RepeatJob"><span><span>Pause</span></span></a>'+
			'&nbsp;<a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close RepeatJob" alt="Close RepeatJob"><span><span>Close</span></span></a>'+
		'</td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr>'+
			'<td>Jobs done:</td><td><span id="'+spocklet+'_jobsdone">0</span> of <input id="'+spocklet+'_jobstodo" type="text" value="0" maxlength="4" />'+bankingrow+'</td>'+
			'<td align="right" style="text-align:right;">Delay <input id="'+spocklet+'_delay1" name="'+spocklet+'_savecookie" type="text" value="1" maxlength="4" /> - <input id="'+spocklet+'_delay2" name="'+spocklet+'_savecookie" type="text" value="3" maxlength="4" />sec</td></tr>'+
		'<tr>'+
			'<td valign="top">Stats:</td>'+
			'<td valign="top">'+
				'Exp: <span id="'+spocklet+'_exp_gained" class="good"></span> <span id="'+spocklet+'_exp_ratio" class="more_in"></span> &nbsp;'+
				'Money: <span id="'+spocklet+'_money_gained" class="good"></span> '+
				//'Money Spent: <span id="'+spocklet+'_lost" class="bad"></span>'+
				'<span class="more_in" id="'+spocklet+'_money_banked"></span>'+
				'<br /><span id="'+spocklet+'_topmafia_stats">&nbsp;</span>'+
			'</td>'+
			'<td align="right" style="text-align:right;">Stop on Mastery:<input id="'+spocklet+'_mastery" type="checkbox" name="'+spocklet+'_savecookie" checked /><br />Before levelup:<input id="'+spocklet+'_levelup" type="checkbox" name="'+spocklet+'_savecookie" checked /><br />Show Popups:<input id="'+spocklet+'_popups" type="checkbox" name="'+spocklet+'_savecookie" checked /></td>'+
		'</tr>'+
		//'<tr id="'+spocklet+'_topmafia_row" style="display:none;"><td>Top Mafia:</td><td colspan="2"><span id="'+spocklet+'_topmafia_stats"></span></td></tr>'+
		'<tr id="'+spocklet+'_strength_row" style="display:none;"><td>Strength:</td><td colspan="2"><span id="'+spocklet+'_strength_stats"></span></td></tr>'+
		'<tr id="'+spocklet+'_pause_row">'+
			'<td>Pause options:</td>'+
			'<td colspan="2">'+
				'<input id="'+spocklet+'_energy_ratio" type="text" value="0" maxlength="4" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp Ratio">&nbsp;&nbsp;'+
				'<input id="'+spocklet+'_stamina_ratio" type="text" value="0" maxlength="4" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Stamina Ratio">&nbsp;&nbsp;'+
				'<input id="'+spocklet+'_exp_level" type="text" value="0" maxlength="4" /> exp to level&nbsp;&nbsp;'+
				'<input id="'+spocklet+'_energy_remain" type="text" value="0" maxlength="6" style="width:50px;" /> energy remaining&nbsp;<span class="more_in">(<a href="#" class="more_in" onclick="$(\'#'+spocklet+'_energy_remain\').val(\''+bossenergy+'\');return false;">'+bossenergy+' for boss fight</a>)</span>'+
			'</td>'+
		'</tr>'+
		'<tr>'+
			'<td>Restart:</td>'+
			'<td colspan="2">Enable restarting: <input id="'+spocklet+'_restart" type="checkbox" name="'+spocklet+'_savecookie" /> &nbsp; <span id="'+spocklet+'_restart_row"><input id="'+spocklet+'_restart_time" name="'+spocklet+'_savecookie" type="text" value="5" maxlength="4" /> Minute(s) before restarting. <span class="more_in">(Minimum: 1)</span></span></td>'+
		'</tr>'+
		'<tr>'+
			'<td valign="top">Job (<a href="#" id="'+spocklet+'_job_reload">reload</a>):</td>'+
			'<td colspan="2"><select id="'+spocklet+'_job_list"></select> <span id="'+spocklet+'_job_info"></span></td>'+
		'</tr>'+
		'<tr><td>Status:</td><td colspan="2" id="'+spocklet+'_status"></td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr>'+
			'<td valign="top"><a href="#" id="'+spocklet+'_loot_toggle" class="'+spocklet+'_toggle">Show</a> loot:</td>'+
			'<td colspan="2"><span id="'+spocklet+'_loot_stats"><span class="more_in">No loot found yet.</span></span><br /><span id="'+spocklet+'_loot"></span></td>'+
		'</tr>'+
		'<tr>'+
			'<td valign="top"><a href="#" id="'+spocklet+'_log_toggle" class="'+spocklet+'_toggle">Show</a> log:<br />'+
				'Limit: <input id="'+spocklet+'_logsize" name="'+spocklet+'_savecookie" type="text" value="10" maxlength="4" /></td>'+
			'<td valign="top" colspan="2" id="'+spocklet+'_log"></td>'+
		'</tr>'+
		'</table>'+
	'</div>';

	function timestamp() {
		now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?'0'+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?'0'+CurM:CurM);
		var CurS = now.getSeconds();
		CurS = (CurS<10?'0'+CurS:CurS);
		return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
	}

	function myRandom(min,max) {
		return min +  Math.floor(Math.round((Math.random() * (max - min))));
	}
	
	function commas(s) {
		while (d=/(-)?(\d+)(\d{3}.*)/.exec(s)) {
			s = (d[1]?d[1]+d[2]+','+d[3]:d[2]+','+d[3]);
		}
		return s;
	}
	
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	}
	
	function msg(s) {
		$('#'+spocklet+'_status').html(s);
	}

	//make timer global so we can remove it quickly
	var timer;
	function pausing(seconds,message,resume_func) {
		var delay = (seconds > 0)? delay = 500 : delay = 20;
		// if the message was left out, shuffle things a bit
		if (typeof message == 'function') {
			resume_func = message;
			message = null;
		}
		if (message) {
			message = message;
		}
		else {
			message='Pausing';
		}
		var minutes = (parseInt(seconds/60) == 1) ? 0 : parseInt(seconds/60);
		if (minutes > 0) {
			msg(message+' <span id="minutes">'+minutes+' minutes</span> <span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>...');
		}
		else {
			msg(message+' <span id="minutes"></span><span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>...');
		}
		timer = setInterval(function(){
			if (seconds%60 == 0) {
				minutes--;
			}
			seconds--;
			if (document.getElementById('minutes')) {
				document.getElementById('minutes').innerHTML = (minutes > 0) ? minutes+' minute'+(minutes==1?'':'s') : '';
			}
			if (document.getElementById('seconds')) {
				document.getElementById('seconds').innerHTML = (seconds % 60)+' second'+(seconds==1 ? '' : 's');
			}
			else {
				clearInterval(timer);
			}
			if (seconds <= 0) {
				clearInterval(timer);
				if (typeof resume_func == 'function') {
					resume_func();
				}
			}
		},delay);
	}

	function create_div() {
		//setup the spockdiv
		if ($('#'+spocklet+'_main').length == 0) {
			$('#inner_page').before(spocklet_html);
		}
		else {
			$('#'+spocklet+'_log').html();
		}
	}

	function stats_update(o) {
		var d, d2, d3;
		energy_ratio = o.exp_to_next_level/o.user_energy;
		stamina_ratio = o.exp_to_next_level/o.user_stamina;
		combined_ratio = o.exp_to_next_level/(o.user_energy+o.user_stamina);
		Math.abs(energy_ratio) < 10 ? (d=2) : (d=0);
		Math.abs(stamina_ratio) < 10 ? (d2=2) :(d2=0);
		Math.abs(combined_ratio) < 10 ? (d3=2) :(d3=0);
		if (energy_ratio=='Infinity') { energy_ratio=0; d=0; }
		if (stamina_ratio=='Infinity') { stamina_ratio=0; d2=0; }
		if (combined_ratio=='Infinity') { combined_ratio=0; d3=0; }
		document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML = 'Exp Need: <span id="exp_to_next_level" class="energy_highlight">'+o.exp_to_next_level+'</span><br>(<span class="energy_highlight">'+(energy_ratio).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(stamina_ratio).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(combined_ratio).toFixed(d3)+'</span>';
	}

	function banker(cash,deposit) {
		var cb = userid+unix_timestamp();
		User.clicks++;
		var params = {
			'ajax': 1,
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,
			'liteload': 1,
			'cb': cb,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'amount': cash,
			'xw_city': xw_city,
			'city': 'brazil',
			'xw_person': personid,
			'clicks': User.clicks
		};
		if (deposit) {
			var url = preurl+'remote/html_server.php?xw_controller=bank&xw_action=deposit_all';
		}
		else {
			var url = preurl+'remote/html_server.php?xw_controller=bank&xw_action=withdraw';
		}
		$.ajax({
			type: "POST",
			url: url,
			data: params,
			success: function (bankresponse) {
				var bankobject = jQuery.parseJSON(bankresponse.replace(/^(\s\d\s+)/,''));
				try {
					user_fields_update(bankobject.user_fields);
					user_info_update(bankobject.user_fields, bankobject.user_info);
				}
				catch (banker_user_fields) {
					log('Ran into trouble in banker(), user_fields: '+banker_user_fields);
				}
				if (Util.isset(bankobject.questData)) {
					MW.QuestBar.update(bankobject.questData);
				}
				if (/was deposited in your account/.test(bankobject.deposit_message)) {
					var banked = /(([A-Z¢]+)?(\\u00a2)?\$?[\d,]+)/.exec(bankobject.deposit_message)[1];
					banked = banked.replace(/\\u00a2/, '');
					stats.money_banked += parseInt(banked.replace(/[^0-9]/g, ''));
				}
				if (/You withdrew/.test(bankobject.withdraw_message)) {
					var banked = /(([A-Z¢]+)?(\\u00a2)?\$?[\d,]+)/.exec(bankobject.withdraw_message)[1];
					banked = banked.replace(/\\u00a2/, '');
					stats.money_banked -= parseInt(banked.replace(/[^0-9]/g, ''));
				}
				var message = '';
				if (bankobject.deposit_message.length > 1) {
					var message = bankobject.deposit_message;
				}
				if (bankobject.withdraw_message.length > 1) {
					var message = bankobject.withdraw_message;
				}
				log(timestamp()+message);
				repeat_job();
			}
		});
	}

	// From Vern's toolkit.js, http://vern.com/mwtools/
	// log puts a message in the log array and outputs it
	// limit is how many log lines we keep (0 == infinite)
	// keep is a regex of lines that we never delete
	var logs = [];
	var extralog = [];
	function logtrunc(message) {
		var limit = parseInt($('#'+spocklet+'_logsize').val());
		var keep = /Session|processing|changed/;
		logs.unshift(message);
		if (limit > 0) {
			if (logs.length>limit) {
				message=logs.pop();
				if ((keep.test) && (keep.test(message)))
						extralog.unshift(message);
			}
		}
		$('#'+spocklet+'_log').html(logs.concat(extralog,'').join('<br />'));
	}
	
	function log(s) {
		logtrunc(s);
		$('#'+spocklet+'_jobsdone').html(stats.jobs_done);
		$('#'+spocklet+'_exp_gained').html(stats.experience_gained);
		$('#'+spocklet+'_exp_ratio').html('('+(stats.experience_gained/stats.energy_used).toFixed(2)+' exp/energy)');
		$('#'+spocklet+'_money_gained').html(sign+'$'+commas(stats.money_gained));
		$('#'+spocklet+'_money_banked').html('($'+commas(stats.money_banked)+' banked)');
		//$('#'+spocklet+'_lost').html(sign+commas(stats.money_spent));

		if (stats.mastermind > 0 || stats.wheelman > 0 || stats.bagman > 0) {
			//$('#'+spocklet+'_topmafia_row').show();
			var masterratio = ' <span class="more_in">('+parseFloat(stats.mastermind/stats.jobs_done*100).toFixed(0)+'%)</span>&nbsp;';
			var wheelratio = ' <span class="more_in">('+parseFloat(stats.wheelman/stats.jobs_done*100).toFixed(0)+'%)</span>&nbsp;';
			var bagratio = ' <span class="more_in">('+parseFloat(stats.bagman/stats.jobs_done*100).toFixed(0)+'%)</span>&nbsp;';
			$('#'+spocklet+'_topmafia_stats').html(
				(stats.mastermind>0?mastermind+'x'+stats.mastermind+masterratio:'')+
				(stats.wheelman>0?wheelman+'x'+stats.wheelman+wheelratio:'')+
				(stats.bagman>0?bagman+'x'+stats.bagman+bagratio:'')
			);
		}
		
		$('#'+spocklet+'_strength_stats').html('');
		if (stats.attack > stats.attack_start) {
			$('#'+spocklet+'_strength_row').show();
			$('#'+spocklet+'_strength_stats').append(mafia_attack+' '+commas(stats.attack)+' (<span class="good">+'+commas(stats.attack-stats.attack_start)+'</span>) ');
		}
		if (stats.defense > stats.defense_start) {
			$('#'+spocklet+'_strength_row').show();
			$('#'+spocklet+'_strength_stats').append(mafia_defense+' '+commas(stats.defense)+' (<span class="good">+'+commas(stats.defense-stats.defense_start)+'</span>) ');
		}
	}

	function update_loot_log() {
		//function to update the loot log
		var lootoutput = '';
		for (x in looted) {
			var attack = '', defense = '';
			if (looted[x].attack > 0) {
				var attack = '['+looted[x].attack+'A';
			}
			if (looted[x].defense > 0) {
				var defense = looted[x].defense+'D]';
			}
			lootoutput += '<span class="good">&times;'+looted[x].quantity+'</span> '+looted[x].id+' '+looted[x].name+' '+attack+' '+defense+' <span class="more_in">('+parseFloat(looted[x].quantity/stats.lootcount*100).toFixed(1)+'%)</span><br />';
		}
		$('#'+spocklet+'_loot_stats').html('Loot stats: '+stats.lootcount+'/'+stats.jobs_done+' <span class="more_in">('+parseFloat(stats.lootcount/stats.jobs_done*100).toFixed(1)+'%)</span>');
		$('#'+spocklet+'_loot').html(lootoutput);
	}
	
	function add_loot(itemid, name, count) {
		stats.lootcount += count;
		if (itemid) {
			if(typeof looted[itemid] == 'object') {
				looted[itemid].quantity += count;
				if (itemid == consumable_farm) {
					consumable_farm = false;
				}
			}
			else {
				looted[itemid] = {"id": itemid, "name": name, "quantity": count};
				get_item_data(itemid);
			}
		}
		else {
			typeof looted[name] == 'object' ? looted[name].quantity += count : looted[name] = {"id": itemid, "name": name, "quantity": count };
		}
		update_loot_log();
	}

	function get_item_data(itemid) {
		cb = userid+unix_timestamp();
		User.clicks++;
		var params = {
			"cb": cb,
			"xw_client_id": 8,
			"ajax": 1,
			"liteload": 1,
			"sf_xw_sig": local_xw_sig,
			"sf_xw_user_id": userid
		};
		$.ajax({
			type: "POST",
			url: preurl+'remote/html_server.php?xw_controller=item&xw_action=get_item_data&item_id='+itemid,
			data: params,
			success: function (response) {
				var object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
				if (Util.isset(object.data)) {
					if (Util.isset(object.data.itemData)) {
						var itemData = object.data.itemData;
						looted[itemid].id = itemData.id;
						looted[itemid].attack = itemData.attack;
						looted[itemid].defense = itemData.defense;
						looted[itemid].name = itemData.name;
					}
					if (Util.isset(object.popup)) {
						looted[itemid].id = itemid;
						looted[itemid].attack = $(object.popup).find('.attack:first').text();
						looted[itemid].defense = $(object.popup).find('.defense:first').text();
						var name = $(object.popup).find('h3:first').text();
						looted[itemid].name = name.replace(/(\s(\d+)\s(\d+))/,''); //remove trailing attack/defense stats
					}
				}
				else {
					log('No response was given by the lookup.');
				}
				update_loot_log();
			}
		});
	}
	
	function use_minipack() {
		cb = userid+unix_timestamp();
		User.clicks++;
		var params = {
			"cb": cb,
			"xw_client_id": 8,
			"ajax": 1,
			"liteload": 1,
			"sf_xw_sig": local_xw_sig,
			"sf_xw_user_id": userid
		};
		$.ajax({
			type: "POST",
			url: preurl+'remote/html_server.php?xw_controller=module&xw_action=useEnergyPack&xw_city='+xw_city+'&mwcom=1',
			data: params,
			success: function (response) {
				var object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
				try {
					user_fields_update(object.user_fields);
					user_info_update(object.user_fields, object.user_info);
					stats_update(object.user_fields);
				}
				catch (use_minipack_user_fields) {
					log('Ran into trouble in use_minipack(), user_fields: '+use_minipack_user_fields);
				}

				if (Util.isset(object.responses)) {
					for (x in object.responses) {
						var data = object.responses[x];
						if (Util.isset(data.module) && /MiniPackModule/.test(data.module[0])) {
							if (data.data.success) {
								msg(timestamp()+' Used mini-energy pack to gain <span class="good">'+parseInt(object.user_fields.user_max_energy*0.25)+' energy</span>.');
								log(timestamp()+' Used mini-energy pack to gain <span class="good">'+parseInt(object.user_fields.user_max_energy*0.25)+' energy</span>.');
							}
							else {
								//console.log(data.module[0]);
							}
						}
					}
				}
			}
		});
	}
	
	function repeat_job() {
		//helper function to handle all the conditions before repeating a job
		find_active_job();
		var wait = myRandom(parseInt($('#'+spocklet+'_delay1').val()),parseInt($('#'+spocklet+'_delay2').val()));
		var bankamount = parseInt($('#'+spocklet+'_bankamount').val());
		var jobsdone = parseInt($('#'+spocklet+'_jobsdone').html());
		var jobstodo = parseInt($('#'+spocklet+'_jobstodo').val());
		var energy_ratio_val = parseFloat($('#'+spocklet+'_energy_ratio').val());
		var stamina_ratio_val = parseFloat($('#'+spocklet+'_stamina_ratio').val());
		var exp_level = parseInt($('#exp_to_next_level').html());
		var exp_val = parseInt($('#'+spocklet+'_exp_level').val());
		var energy_val = parseInt($('#'+spocklet+'_energy_remain').val());
		var user_energy = parseInt($('#user_energy').html());
		
		if (run) {
			if (User.cash > bankamount && bankamount > 0) {
				pausing(wait,'Banking money in ',function(){banker(User.cash,true);});
			}
			else if ((parseInt(job_exp*1.5) >= exp_level) && $('#'+spocklet+'_levelup').is(':checked')) {
				msg('<span class="good">Could gain level on next repeat, pausing...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			else if ((energy_ratio <= energy_ratio_val) && (energy_ratio_val > 0)) {
				msg('<span class="good">Reached energy ratio, pausing...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			else if ((stamina_ratio <= stamina_ratio_val) && (stamina_ratio_val > 0)) {
				msg('<span class="good">Reached stamina ratio, pausing...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			else if ((exp_level <= exp_val) && (exp_val > 0)) {
				msg('<span class="good">Reached exp to level value, pausing...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			else if ((user_energy <= parseInt(energy_val+job_energy)) && (energy_val > 0)) {
				msg('<span class="good">Could cross energy remain value, pausing...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			else if ((jobsdone < jobstodo) || (jobstodo == 0)) {
				controls_display(false,true,true);
				pausing(wait,'Doing job again in ',function(){do_job(active_job);});
				return;
			}
			else {
				msg('Taking a break after doing '+jobstodo+' jobs.');
				controls_display(true,false,true);
				run = false;
			}
		}
		else {
			msg('Pausing...');
			controls_display(true,false,true);
		}
	}
	
	function do_job(url) {
		if (run) {
			cb = userid+unix_timestamp();
			User.clicks++;
			var params = {
				"cb": cb,
				"xw_client_id": 8,
				"ajax": 1,
				"liteload": 1,
				"sf_xw_sig": local_xw_sig,
				"sf_xw_user_id": userid,
				"clicks": User.clicks
			};
			$.ajax({
				type: "POST",
				url: preurl+''+url.replace(/(cb=.*?&)/,''),
				data: params,
				success: function (response){
					if (/index_controller/.test(response)) {
						msg('Session timed out, reloading job page...');
						log(timestamp()+'Session timed out, reloading job page. Press Start to try again.');
						reload_job_page();
					}
					else if (/It looks like you changed cities in another browser window/.test(response)) {
						msg('Travelling detected!');
						if ($('#'+spocklet+'_restart').is(':checked')) {
							log(timestamp()+'<span class="bad">Travelling detected!</span> Attempting to restart in '+$('#'+spocklet+'_restart_time').val()+' minute(s)');
							var wait = parseInt($('#'+spocklet+'_restart_time').val()*60);
							pausing(wait,'Restarting in ',function() { repeat_job(); });
						}
						else {
							log(timestamp()+'<span class="bad">Travelling detected!</span> Go back to Brazil/Chicago, select job and press start to resume.');
							run = false;
							controls_display(true,false,true);
						}
					}
					else if (/There was an issue processing your request/.test(response)) {
						msg('There was an issue processing your request, reloading job page...');
						log(timestamp()+'There was an issue processing your request, reloading job page...');

						reload_job_page();
					}
					else {
						var object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
						try {
							user_fields_update(object.user_fields);
							user_info_update(object.user_fields, object.user_info);
						}
						catch (do_job_user_fields) {
							log('Ran into trouble in do_job(), user_fields: '+do_job_user_fields);
						}
						if (Util.isset(object.questData)) {
							MW.QuestBar.update(object.questData);
						}
						stats_update(object.user_fields);

						//job successfully done
						if (Util.isset(object.jobResult)) {
							jobResult = object.jobResult;
							restarts = 0;
							
							//update the stats
							stats.jobs_done++;
							stats.money_gained += parseInt(jobResult.cash);
							stats.money_gained -= parseInt(jobResult.cashUsed);
							//stats.money_spent += parseInt(jobResult.cashUsed);
							stats.energy_used += parseInt(jobResult.energy);
							stats.stamina_used += parseInt(jobResult.stamina);
							stats.experience_gained += parseInt(jobResult.experience);
							job_exp = parseInt(jobResult.experience);
							if (jobResult.id == active_job_id) {
								jobs[jobResult.id].mastery = jobResult.masteryTotal;
								$("#"+spocklet+"_job_list option[value='"+jobResult.id+"']").html('#'+jobResult.id+' '+jobResult.name+' ('+jobResult.masteryTotal+'%)');
							}
							
							if (Util.isset(object.fightbar)) {
								if (stats.attack_start == 0) {
									stats.attack_start = parseInt(object.fightbar.group_atk.replace(/[^0-9]/g, ''));
								}
								if (stats.defense_start == 0) {
									stats.defense_start = parseInt(object.fightbar.group_def.replace(/[^0-9]/g, ''));
								}
								stats.attack = parseInt(object.fightbar.group_atk.replace(/[^0-9]/g, ''));
								stats.defense = parseInt(object.fightbar.group_def.replace(/[^0-9]/g, ''));
							}

							//handle loot
							var loot = ' ', lootid = false, lootname = false, quantity = 1;
							for (x in jobResult.loot) {
								if (typeof loot[x] != 'function') {
									loot += '<img src='+/<img src=(.*?)>/.exec(jobResult.loot[x].replace(/\\"/,'"'))[1]+'> ';
									if (lootid = /item_id=.?"(\d+).?"/.exec(jobResult.loot[x])) {
										lootid = lootid[1];
									}
									if (lootname = /\/(item|standard)_(.*?)_\d+?.(png|gif)/.exec(jobResult.loot[x])) {
										lootname = lootname[2];
									}
									if (/item_card_mini_shadow/.test(jobResult.loot[x])) {
										//double loot was gained
										quantity = 2;
										loot += loot;
									}
									add_loot(lootid,lootname,quantity);
								}
							}
							loot = loot.replace(/"75"/g,'"20"');
							
							//update mastery
							var mastery = (jobResult.mastered || jobResult.masteryTotal == 100)?' Job mastered!':' Mastery: '+jobResult.masteryTotal+'%';
							var width = ((1 - (jobResult.masteryTotal / 100)) * 179);
							$(selected_job).find('.mastery_bar div').css({"width":width});
							$(selected_job).find('.mastery_bar p').html(jobResult.masteryTotal+' % Mastered');
							
							var pre = '';
							if (jobResult.extraData.bonusCash > 0) {
								jobResult.cash += parseInt(jobResult.extraData.bonusCash);
								stats.bagman++;
								pre = bagman;
							}
							if (jobResult.extraData.bonusExperience > 0) {
								stats.experience_gained += jobResult.extraData.bonusExperience;
								jobResult.experience += jobResult.extraData.bonusExperience;
								stats.mastermind++;
								pre = mastermind;
							}
							if (jobResult.energy == 0) {
								stats.wheelman++;
								pre = wheelman;
							}
							
							//chandle cash gained/spent
							var cash = 0;
							if (jobResult.cash > 0) {
								cash = sign+' <span class="good">$'+commas(parseInt(jobResult.cash))+'</span>';
							}
							if (jobResult.cashUsed > 0) {
								cash = 'spent '+sign+' <span class="bad">-$'+commas(parseInt(jobResult.cashUsed))+'</span>';
							}
							
							//show popups
							if (Util.isset(object.popup) && $('#'+spocklet+'_popups').is(':checked')) {
								//console.log('adding popup id: '+object.popup_id);
								$('#popup_fodder').prepend('<div id="'+object.popup_id+'"></div>');
								$('#'+object.popup_id).append(object.popup);
							}
							
							//log the result
							log(timestamp()+pre+'Gained <span class="good">'+jobResult.experience+'</span> exp and '+cash+'.'+mastery+loot);
							
							//decide next action
							if (jobResult.mastered || jobResult.masteryTotal == 100 && $('#'+spocklet+'_mastery').is(':checked') && (jobResult.id == active_job_id)) {
								msg('Job mastered! Press Start to continue with next selected job.');
								controls_display(true,false,true);
								run = false;
								reload_job_page();
							}
							else {
								repeat_job();
							}
						}

						//job not done, need to buy stuff
						if (Util.isset(object.data)) {
							if (Util.isset(object.data.impulseBuy)) {
								if (object.data.impulseBuy.success == 1) {
									log(timestamp()+$(object.data.impulseBuy.message).text());
								}
								else {
									//{"impulseBuy":{"success":0,"message":"<p>You need the following items for this job..."}}
									if (/You need the following items for this job/.test(object.data.impulseBuy.message)) {
										var regexp = /alt="(.*?)".*?times;(\d+)/g;
										var needed = 'Need items: ';
										while((need = regexp.exec(object.data.impulseBuy.message)) != null) {
											needed += '<span class="good">&times;'+need[2]+'</span> '+need[1]+', ';
										}
										needed = needed.slice(0,needed.length-2);
										var cost;
										if (cost = /([A-Z]+\$[\d,]+)/.exec(object.data.impulseBuy.message)) {
											cost = cost[1];
										}
										else {
											cost = 0+'';
										}
										needed += ' Cost: '+cost;
										log(timestamp()+needed);
										msg('<span class="bad">Need to buy items, stopping.</span>')
										controls_display(true,false,true);
										run = false;
										
										//if(buyurl = /href='(.*?)'/.exec(object.data.impulseBuy.message) && !/paypal/.test(object.data.impulseBuy.message)) {
										if(buyurl = /href='(.*?)'/.exec(object.data.impulseBuy.message)) {
											buyurl = buyurl[1];
											if (/marketplace/.test(buyurl)) {
												log(object.data.impulseBuy.message);
												msg(timestamp()+' Stopped, not spending RP\'s on refill.')
												controls_display(true,false,true);
												run = false;
											}
											else {
												controls_display(false,true,true);
												run = true;
												buy_needed(buyurl,cost);
											}
										}
										else {
											log(timestamp()+object.data.impulseBuy.message);
										}
										
									}
									else if (/You do not have enough cash to do this job/.test(object.data.impulseBuy.message)) {
										msg('<span class="bad">You do not have enough cash to do this job.</span>')
										log(object.data.impulseBuy.message);
										controls_display(false,true,true);
										run = false;
									}
									//{"impulseBuy":{"success":0,"message":"<p>These loot drops are needed for this job:..."}}
									else if (/These loot drops/.test(object.data.impulseBuy.message)) {
										var consumable = /item_id="(\d+)"/.exec(object.data.impulseBuy.message)[1];
										msg('<span class="bad">Need consumables, attempting to get them...</span>')
										//log(timestamp()+' Need consumable: '+consumables[consumable].name);
										find_active_job();
										consumable_farm = consumable;
										do_job(active_job.replace(/tab=(\d+)/,'tab='+consumables[consumable].tab).replace(/job=(\d+)/,'job='+consumables[consumable].job).replace(/btn_dojob_(\d+)/,'btn_dojob_'+consumables[consumable].job))
										//controls_display(true,false,true);
									}
									//{"impulseBuy":{"success":0,"message":"not_enough_energy"}}
									else if (/(not_enough_energy|You do not have enough energy)/.test(object.data.impulseBuy.message)) {
										if ($('#'+spocklet+'_restart').is(':checked')) {
											if (restarts < restartlimit) {
												var wait = parseInt($('#'+spocklet+'_restart_time').val()*60);
												restarts++;
												pausing(wait,'Restarting in ',function() { repeat_job(); });
											}
											else {
												log(timestamp()+'<span class="bad">Failed restarting '+restartlimit+' times, giving up.</span>');
												controls_display(true,false,true);
											}
										}
										else {
											controls_display(true,false,true);
											//msg('<span class="bad">Ran out of energy.</span>')
											msg(timestamp()+'<span class="bad">Ran out of energy.</span> <a id="'+spocklet+'_minipack" href="#" class="sexy_mini_energy_pack_brief sexy_button_new short white"><span><span>Use Energypack</span></span></a>');
											$('#'+spocklet+'_minipack').click(function() { use_minipack(); });
											log(timestamp()+'<span class="bad">Ran out of energy.</span>')
											//log(timestamp()+'<span class="bad">Ran out of energy.</span> <a onclick="return use_minipack();" href="#" class="sexy_mini_energy_pack_brief sexy_button_new short white"><span><span>Use Minipack</span></span></a>');
										}
									}
									else {
										log(timestamp()+object.data.impulseBuy.message);
									}
								}
							}
						}
					}

				}
			});
		}
	}
	function reload_job_page() {
		document.getElementById('inner_page').addEventListener('DOMSubtreeModified', reload_job_parameters, false);
		if (active_tab_id != 0) {
			do_ajax('inner_page', 'remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city='+xw_city+'&tmp=&cb=&xw_person=&mwcom=1&from=job&zone=1&destination='+xw_city+'&tab='+active_tab_id, 1, 1, 0, 0);
		}
		else {
			do_ajax('inner_page', 'remote/html_server.php?xw_controller=job&xw_action=view&xw_city='+xw_city+'&tmp=&cb=&xw_person=&mwcom=1', 1, 1, 0, 0);
		}
	}
	
	function reload_job_parameters() {
		if (pageLoading == 0) {
			document.getElementById('inner_page').removeEventListener('DOMSubtreeModified',reload_job_parameters,false);
			setTimeout(function() {
				$('#'+spocklet+'_job_list').val(active_job_id);
				$('#'+spocklet+'_job_list').trigger('change');
				find_active_job();
				list_jobs();
				list_jobs(); //twice to ugly hack the width
				job_ratios();
				if (run) {
					do_job(active_job);
				}
				//msg('Job data processed, select job and press Start.');
			},1000);
		}
		else {
			//console.log(unix_timestamp()+' '+pageLoading);
		}
	}
	
	//function to buy needed items, if needed
	function buy_needed(url,cost) {
		var cost = cost.replace(/[^0-9]/g, '');
		msg('Buying needed items...');
		cb = userid+unix_timestamp();
		User.clicks++;
		var params = {
			"cb": cb,
			"xw_client_id": 8,
			"ajax": 1,
			"liteload": 1,
			"sf_xw_sig": local_xw_sig,
			"sf_xw_user_id": userid
		};
		$.ajax({
			type: "POST",
			url: preurl+url.replace(/(cb=.*?)&/,''),
			data: params,
			success: function (response){
				if (/index_controller/.test(response)) {
					log(timestamp()+'Session timed out during buy action, reloading job page. Press Start to try again.');
					do_ajax('inner_page', 'remote/html_server.php?xw_controller=job&xw_action=view&xw_city='+xw_city+'&tmp=&cb=&xw_person=&mwcom=1', 1, 1, 0, 0);
				}
				else {
					var object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
					try {
						user_fields_update(object.user_fields);
						user_info_update(object.user_fields, object.user_info);
					}
					catch (buy_needed_user_fields) {
						log('Ran into trouble in buy_needed(), user_fields: '+buy_needed_user_fields);
					}
					if (Util.isset(object.questData)) {
						MW.QuestBar.update(object.questData);
					}

					if (Util.isset(object.data)) {
						if (Util.isset(object.data.impulseBuy)) {
							if (/You bought/.test(object.data.impulseBuy.message)) {
								log(timestamp()+object.data.impulseBuy.message.replace(/<[^<]+?>/g,' ')+' for '+sign+commas(cost));
								stats.money_spent += parseInt(cost)
								repeat_job();
							}
							else {
								log(timestamp()+$(object.data.impulseBuy.message).text());
							}
						}
						else {
							log('object.data.impulseBuy was not set');
						}
					}
					else {
						log('object.data was not set');
					}
				}
			}
		});
	}
	
	function update_sig() {
		//function to get the local_xw_sig value
		cb = userid+unix_timestamp();
		var params = {
			"cb": cb,
			"xw_client_id": 8,
			"ajax": 1,
			"liteload": 1,
			"sf_xw_sig": local_xw_sig,
			"sf_xw_user_id": userid
		};
		$.ajax({
			type: "POST",
			url: preurl+'sf_updater.php',
			data: params,
			success: function (response) {
				//console.log('Before: '+local_xw_sig);
				local_xw_sig = /([a-f0-9]{32})/.exec(response)[1];
				//console.log('After: '+local_xw_sig);
			}
		});
	}
	
	function job_ratios() {
		$('.job').each(function(index){
			var energy = $(this).find('.uses.clearfix').find('.energy').attr('current_value');
			var experience = $(this).find('.pays.clearfix').find('.experience').attr('current_value');
			//pays = $(this).find('.cash_icon_jobs_'+xw_city).text();
			$(this).find('.uses.clearfix').find('.energy').html(energy+' ('+(experience/energy).toFixed(2)+')');
			//$(this).find('.pays.clearfix').find('.experience').html(experience+ '('+(experience/energy).toFixed(2)+')');
		});
	}

	var jobs = [];
	function list_jobs() {
		$('.job').each(function(index){
			//log(index+' '+$(this).find('.job_art').css('height'));
			//log(index+' '+$(this).closest('.jobs').css('display'));
			if ($(this).closest('.jobs').css('display') == 'block') {
				var name = $(this).find('.job_details.clearfix h4').html();
				var energy = $(this).find('.uses.clearfix').find('.energy').attr('current_value');
				var experience = $(this).find('.pays.clearfix').find('.experience').attr('current_value');
				var cash = $(this).find('.cash_icon_jobs_'+xw_city).attr('current_value');
				var url = $(this).find('a[id*="btn_dojob_"]').attr('href');
				var id = /job=(\d+)/.exec(url)[1];
				var tab = /tab=(\d+)/.exec(url)[1];
				var mastery = $(this).find('.mastery_bar p:first').text().trim();
				var ratio = parseFloat(experience/energy).toFixed(2);
				var selected = false;
				//if (/255, 255, 255|FFF/.test($(this).css('borderColor'))) {
				if (/255, 255, 255|FFF/.test($(this).attr('style'))) {
					selected = true;
					active_job_id = id;
				}
				jobs[id] = {
					"name": name,
					"energy": energy,
					"exp": experience,
					"ratio": ratio,
					"cash": cash,
					"url": url,
					"id": id,
					"tab": tab,
					"mastery": parseInt(mastery),
					"selected": selected
				}
				//log(name+' Energy: '+energy+' Experience: '+experience+' Cash: '+cash);
			}
		});
		var list_width = parseInt($('#'+spocklet+'_job_list').css('width'));
		//width = '347';
		for (x in jobs) {
			var job = jobs[x];
			var width = parseInt(list_width*(job.mastery/100));
			if ($('#'+spocklet+'_job_list option[value='+job.id+']').length > 0) {
				$('#'+spocklet+'_job_list option[value='+job.id+']').html('#'+job.id+' '+job.name+' ('+job.mastery+'%)');
			}
			else {
				$('#'+spocklet+'_job_list').append(new Option('#'+job.id+' '+job.name+' ('+job.mastery+'%)', job.id, job.selected, job.selected));			
			}
			//$("#"+spocklet+"_job_list option[value='"+job.id+"']").css('background','url(http://mwfb.static.zgncdn.com/mwfb/graphics/map_based_jobs/mastery_bar_silver.gif) no-repeat');
			//$("#"+spocklet+"_job_list option[value='"+job.id+"']").css('background','url("http://mwfb.static.zgncdn.com/mwfb/graphics/v3/progress_bar_fill.jpg") no-repeat');
			$("#"+spocklet+"_job_list option[value='"+job.id+"']").css('background','url("http://mwfb.static.zgncdn.com/mwfb/graphics/v3/buttons_600x2100_06.png") no-repeat');
			$("#"+spocklet+"_job_list option[value='"+job.id+"']").css('background-position',parseInt(-600+width)+'px -249px');
		}
		
		$('#'+spocklet+'_job_list').val(active_job_id);
		$('#'+spocklet+'_job_list').trigger('change');
	}

	function controls_display(play,pause,stop) {
		//helper function to toggle the icons
		play ? $('#'+spocklet+'_play').css({'display':'inline-block'}) : $('#'+spocklet+'_play').css({'display':'none'});
		pause ? $('#'+spocklet+'_pause').css({'display':'inline-block'}) : $('#'+spocklet+'_pause').css({'display':'none'});
		stop ? $('#'+spocklet+'_close').css({'display':'inline-block'}) : $('#'+spocklet+'_close').css({'display':'none'});
	}


	// createCookie from Vern's Toolkit http://vern.com/mwtools/
	function createCookie(name, value) {
		var expires = new Date();
		expires.setDate(expires.getDate() + 14);
		document.cookie = name + "=" + value + ";expires=" + expires.toGMTString() + "; path=/";
	}

	// readCookie from Vern's Toolkit http://vern.com/mwtools/
	function readCookie(name) {
		var i, cookie, nameEQ = name + "=",	cookieArray = document.cookie.split(";");
		for (i = 0; i < cookieArray.length; i++) {
			cookie = cookieArray[i];
			while (cookie.charAt(0) == ' ')
				cookie = cookie.substring(1, cookie.length);
			if (cookie.indexOf(nameEQ) == 0) 
				return cookie.substring(nameEQ.length, cookie.length);
		}
		return null;
	}	

	function saveForm(cookiename) {
		var output = new Object();
        var inputs = $(':input[name="'+tagname+'"]');
        for (var i=0;i<inputs.length;i++) {
        	switch(inputs[i].type) {
				case 'select-one':
					output[inputs[i].id] = inputs[i].selectedIndex;
					break;
				case 'text':
					output[inputs[i].id] = inputs[i].value;
					break;
				case 'checkbox':
					output[inputs[i].id] = inputs[i].checked;
					break;
				default:
					alert(inputs[i].type);
			}
        }
		createCookie(cookiename,JSON.stringify(output));
		//console.log(JSON.stringify(output));
	}

	function loadForm(cookiename) {
		var cookie = readCookie(cookiename);
		var input = JSON.parse(cookie);
		for (name in input) {
			try {
				var el = $(':input[id="'+name+'"]')[0];
				if(el) {
					switch (el.type) {
						case 'select-one':
							el.selectedIndex = input[name];
							break;
						case 'text':
							el.value = input[name];
							break;
						case 'checkbox':
							el.checked = input[name];
							break;
					}
				}				
			}
			catch(e) { }	
		}
	}
	
	create_div();
	//saveForm(spocklet+'_cookie');
	loadForm(spocklet+'_cookie');
	controls_display(false,true,true);
	if ($('#'+spocklet+'_restart').is(':checked')) {
		$('#'+spocklet+'_restart_row').show();
	}
	else {
		$('#'+spocklet+'_restart_row').hide();
	}
	
	//find selected job
	var active_job = false,
	active_job_id = 0,
	active_tab_id = 0,
	selected_job = false,
	job_exp = 0;
	
	function find_active_job() {
		$('.job').each(function(index){
			//if (/255, 255, 255|FFF/.test($(this).css('borderColor'))) {
			if (/255, 255, 255|FFF/i.test($(this).attr('style'))) {
				if ($(this.parentNode).css('display') == 'block') {
					//log(index+' '+$(this).css('borderColor'));
					//log($(this).find('a[id*="btn_dojob_"]').attr('href'));
					active_job = $(this).find('a[id*="btn_dojob_"]').attr('href');
					active_job_id = /job=(\d+)/.exec(active_job)[1];
					active_tab_id = /tab=(\d+)/.exec(active_job)[1];
					selected_job = this;
					job_exp = $(this).find('.pays.clearfix').find('.experience').attr('current_value');
					job_energy = parseInt($(this).find('.uses.clearfix').find('.energy').attr('current_value'));
					//console.log('Active job: '+active_job_id);
				}
			}
		});
	}
	find_active_job();
	
	//bind buttons
	$('#'+spocklet+'_play').click(function() {
		run = true;
		clearTimeout(timer);
		controls_display(false,true,true);
		$('#'+spocklet+'_donate').animate({ color: "white" }, 1000, "swing" ,function() { $('#'+spocklet+'_donate').animate({ color: "black" }, 1000); });
		job_ratios();
		repeat_job();
	});

	$('#'+spocklet+'_pause').click(function() {
		run = false;
		controls_display(true,false,true);
		if (/(Restarting in|Doing job again)/.test($('#'+spocklet+'_status').html())) {
			clearTimeout(timer);
			msg('Paused...');
		}
	});

	$('#'+spocklet+'_close').click(function() {
		run = false;
		clearTimeout(timer);
		clearInterval(refresh_timer);
		$('#'+spocklet+'_main').remove();
		document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML = 'Experience to Level Up <strong><span id="exp_to_next_level" style="text-align: right; float: right; min-width: 30px;">Spock on!</span></strong>';
	});
	
	$('#'+spocklet+'_restart').change(function() {
		if ($('#'+spocklet+'_restart').is(':checked')) {
			$('#'+spocklet+'_restart_row').show();
		}
		else {
			$('#'+spocklet+'_restart_row').hide();
		}
		saveForm(spocklet+'_cookie');
		//console.log('Updated cookie for '+this.id);
	});
	
	$('a[class='+spocklet+'_toggle]').click(function() {
		$('#'+this.id.replace(/_toggle/,'')).toggle()
	});
	$('#'+spocklet+'_job_reload').click(function() {
		reload_job_parameters();
	});

	$('#'+spocklet+'_job_list').bind('change',function() {
		if (this.value == 0) {
			$('#'+spocklet+'_job_info').html('');
		}
		else {
			var job = jobs[this.value];
			job_exp = job.exp;
			//alert($('#btn_dojob_'+job.id).closest('.job').find('.job_art').html());
			$('.job').each(function(index){
				$(this).css('borderColor','#333');
				$(this).find('.job_art').css('height','0px');
			});
			$('#btn_dojob_'+job.id).closest('.job').find('.job_art').css('height','226px');
			$('#btn_dojob_'+job.id).closest('.job').css('borderColor','#fff');
			$('#'+spocklet+'_job_info').html(
				'<span class="energy">'+job.energy+' ('+job.ratio+')</span> '+
				'<span class="experience">'+job.exp+'</span> '+
				'<span class="">'+sign+commas(job.cash)+'</span>'
			);
		}
	});
	
	//bind events for error checking user input boxes
	$('#'+spocklet+'_jobstodo').bind('keyup',function() {
		if (isNaN(this.value)) {
			this.value = 0;
		}
	});
	$('#'+spocklet+'_logsize').bind('keyup',function() {
		if (isNaN(this.value)) {
			this.value = 10;
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_bankamount').bind('keyup',function() {
		if (isNaN(this.value)) {
			$(this).val('20000');
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_delay1').bind('keyup',function() {
		if (isNaN(this.value)) {
			$(this).val('1');
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_delay2').bind('keyup',function() {
		if (isNaN(this.value)) {
			$(this).val('3');
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_mastery').change(function() {
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_levelup').change(function() {
		saveForm(spocklet+'_cookie');
	});
	// $('#'+spocklet+'_help').mouseover(function() {
		// $('#'+spocklet+'_main').append('<div id="'+spocklet+'_dialog" title="Dialog Title">I\'m in a dialog</div>');
		// $('#'+spocklet+'_dialog').dialog({
			// position: 'center',
		// });
	// }).mouseout(function(){
		// $('#'+spocklet+'_dialog').remove();
	// });
	
	//get started with the bookmarklet
	if (active_job) {
		repeat_job();
		//add_loot(5610, 'freigther', 1)
		//add_loot(2503, 'secretidentity ', 1)
	}
	else {
		//msg('<span class="bad">Could not find a selected job.</span>');
		log(timestamp()+'Could not find a selected job. Loading the job page and reading data...');
		run = false;
		controls_display(true,false,true);
		document.getElementById('inner_page').addEventListener('DOMSubtreeModified', reload_job_parameters, false);
		do_ajax('inner_page', 'remote/html_server.php?xw_controller=job&xw_action=view&xw_city='+xw_city+'&tmp=&cb=&xw_person=&mwcom=1', 1, 1, 0, 0);
	}

	list_jobs();
	job_ratios();
	list_jobs(); //run twice to fix the width properly
	update_sig();
	refresh_timer = setInterval(update_sig, 300000);
	//log('This is <span class="good">'+version+'</span>, a bookmarklet from <strong>Spockholm Mafia Tools</strong><br /> Visit our <a href="http://www.facebook.com/mafiatools/">[Fan Page]</a> or website <a href="http://www.spockholm.com/mafia/testing.php">[spockholm.com]</a> for more bookmarklets.');
	//$('#'+spocklet+'_donate').animate({ color: "white" }, 1000, "swing" ,function() { $('#'+spocklet+'_donate').animate({ color: "black" }, 1000); });
	$('#'+spocklet+'_donate').effect("pulsate", { times:1 }, 750);

	//add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	loadContent('http://www.google-analytics.com/ga.js');
	try {
		var pageTracker = _gat._getTracker("UA-8435065-3");
		pageTracker._trackPageview();
		pageTracker._trackPageview("/script/RepeatJobBrazil");
	}
	catch(err) {}
	//end analytics
})()
