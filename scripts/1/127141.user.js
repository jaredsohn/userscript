// ==UserScript==
// @name           Robber BG 1.04 JC Mod
// @namespace      Delete_tester
// @description    Bookmarklet - Mafia Wars robber
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==
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
		//Credits to Christopher(?) for this new fix
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
	//end unframe code

	//hack to kill the resizer calls
	iframeResizePipe = function() {};

	//initial variables
	var version = 'Robber BG v1.04 beta',
	userid = User.id,
	personid = User.id.substr(2),
	spocklet = 'rob_bg',
	bossenergy = parseInt($('#user_max_energy').html()*0.2).toFixed(0),
	tagname = spocklet+'_savecookie',
	start_time = 0,
	burners_used = 0,
	restarts = 0,
	restartlimit = 30,
	failed = 0;
	run = false;
		
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';

	//objects for misc stuff
	var looted = {},
	robResult = {},
	stats = {
		"money_gained": 0,
		"money_banked": 0,
		"stamina_used": 0,
		"exp_gained": 0,
		"stamina_gained": 0,
		"energy_gained": 0,
		"robs_done": 0,
		"boards_done": 0,
		"success": 0,
		"failed": 0,
		"attack": 0,
		"attack_start": 0,
		"defense": 0,
		"defense_start": 0,
		"lootcount": 0,
		"vc_start": 0,
		"vc_count": 0
	},
	board_stats = [],
	slots = [];

	function imgurl(img,w,h,a) {
		return '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+img+'" width="'+w+'" height="'+h+'" title="'+a+'" alt="'+a+'">';
	}

	function currentCity() {
		var wrapper = $('#mw_city_wrapper').attr('class');
		switch(wrapper){
			case 'mw_city1':
				return 1;
				break;
			case 'mw_city2':
				return 2;
				break;
			case 'mw_city3':
				return 3;
				break;
			case 'mw_city4':
				return 4;
				break;
			case 'mw_city5':
				return 5;
				break;
			case 'mw_city6':
				return 6;
				break;
			case 'mw_city7':
				return 7;
				break;
			case 'mw_city8':
				return 8;
				break;
			default:
				alert('Unknown City, not sure what to do.\nPanic? [y/N]');
		}
	}
	var xw_city = currentCity();
	
	//setup images
	var staminaimg = imgurl('icon_stamina_16x16.png','13','13','Stamina'),
	mafia_attack = imgurl('icon_mafia_attack_22x16_01.gif','22','16','Mafia Attack Strength'),
	mafia_defense = imgurl('icon_mafia_defense_22x16_01.gif','22','16','Mafia Defense Strength'),
	//sign = '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/brz_real_sm.png" width="15" height="15" align="middle" />',
	sign = '';
	var clockimg = 'data:image/gif;base64,R0lGODlhDwAPAPcAAAQCBJyaBERCFNTSBLSyBCQiBGxuBMTCBOzuBDQyBBQSBKSmBFRSFJSWFLSyFCQiJBQSFOTiBCwqBHR2BMTCFPz6BFxaBDw6BBwaBJyeFLy6FNzeFFxaFAwODJyeBExOFLy6BCQmBGxqFMTGBPT2BBQWBKyuBJyaFLS2FBQWFCwuBHx+BMzKFPz+BDw+BOTiFFxeFACHPwA2kgB+fOSchebnPxMTkgAAfCA0COmHApE2AHx+AGByLAAg7JINE3wAAP8PAP8AAP8AAP8AAF0AuAAA6JIAE3wAAIUAkucAAIEAAHwAAAAmAADlABY6FgB3AKDNGAOrAAC6AADcAEAAaBUA5xcAlgAAALjYD2rnABYTAAAAAAAmogDl6QA6EwB3AH4uAgBnAABpAMBmAAAAQwCIOgA2XAB+RP8Ab//wa//9df9/bf8EZf/obv8TdP8AZQBaIACIdQA2bgB+ZADEIADnRQATaQAAbgAqcwCIdBY2ZQB+bHMAAOMAAAAAAAAAAPRyAOYgABMNFgAAAJ8A3Ovw6IEAE3wAAEsUw+MAMYEAknwAfOAB3wIAMVEAkgAAfLgACGoABgEAFgAAAHQAOAAAAAAArAAAADBzAObjABMAAAAAADQMAADoAAATAMAAAKi1GPsr6RODEwB8ACAAnekA/5EAgHwAfGAApQAA/5IAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJIAAHwAAOoZAPQsAICDAHx8AAAwOADoABYTrAAAAAD0NQArBACDkgB8fLgAAGoAABYAAAAAAADR6AHp6AATEwAAAAAMdACh6ABPEwAAAPdaqPQA+4AAE3wAABw02OjpmhMTgwAAfLidqGpk/xaDgAB8fABw/wC9/wBP/wAA/wCcpQDI/wBPgAAAfLAAiCcBgRcAQgAAAAAwPADoAAATrAAAAAAAAAABAAAAAAAAAHi40QFk6RaDEwB8ABIBZAAAZAAAgwAAfLgAcycA4xcAAAB8AEM+ZDoEZACSgwB8fLguajlncRdpSABmACH5BAAAAAAALAAAAAAPAA8ABwiVAB90SNGBQQAKLA5k4DCwg0AACha0mEixhQkMADpAUDCioscBGDp0kOjRI4gUAiqULMmgwcqSDih4HJHAhYUJBCa+OODRAgYVJQCs0CmT4gEAA1pUQKCyRYQMFSUYWIniA0UPChCshNHBRAsECgKsHJECAoYIBC6sjBACQgcABbyWPCAh4wMIeEU42PBigwYRZSE8CAgAOw==';
	
	//setup the initial html
	var style = '<style type="text/css">'+
		'.messages {border: 1px solid #888888; margin-bottom: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;}'+
		'.messages img{margin:0 3px;vertical-align:middle}'+
		'.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px;}'+
	'</style>';

	var logo = '<a href="http://www.spockholm.com/mafia/testing.php#RobberBG" target="_blank"><img src="http://www.mafia-tools.com/uploads/banner-spockholm-mafia-tools.png#RobberBG" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" style="margin-bottom: 5px;" /></a>';
	var bankingrow = sign+' Bank above $<input id="'+spocklet+'_bankamount" name="'+spocklet+'_savecookie" type="text" value="0" maxlength="9" style="width:65px" />';

	var spocklet_html =
	'<div id="'+spocklet+'_main">'+
		style+
		'<table class="messages">'+
		'<tr><td colspan="3" align="center" style="text-align:center;">'+logo+'<br />'+
			'<a href="http://www.spockholm.com/mafia/donate.php#RobberBG" id="'+spocklet+'_donate" class="sexy_button_new short white" target="_blank" title="Like what we do? Donate to Team Spockholm" alt="Like what we do? Donate to Team Spockholm"><span><span>Donate</span></span></a>'+
			'&nbsp;<a href="http://www.spockholm.com/mafia/help.php#RobberBG" id="'+spocklet+'_help" class="sexy_button_new short" target="_blank" title="Get help" alt="Get help"><span><span>Help</span></span></a>'+
			'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="good">'+version+'</span>'+
			'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href="#" id="'+spocklet+'_play" class="sexy_button_new short green" title="Start RobberBG" alt="Start RobberBG"><span><span>Start</span></span></a>'+
			'<a href="#" id="'+spocklet+'_pause" class="sexy_button_new short orange" title="Pause RobberBG" alt="Pause RobberBG"><span><span>Pause</span></span></a>'+
			'&nbsp;<a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close RobberBG" alt="Close RobberBG"><span><span>Close</span></span></a>'+
		'</td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr>'+
			'<td>Robberies done:</td><td><span id="'+spocklet+'_robs_done">0</span> of <input id="'+spocklet+'_robs_todo" type="text" value="0" maxlength="4" />'+bankingrow+'</td>'+
			'<td align="right" style="text-align:right;">Delay <input id="'+spocklet+'_delay1" name="'+spocklet+'_savecookie" type="text" value="1" maxlength="4" /> - <input id="'+spocklet+'_delay2" name="'+spocklet+'_savecookie" type="text" value="3" maxlength="4" />sec</td></tr>'+
		'<tr>'+
			'<td valign="top">Stats:</td>'+
			'<td valign="top">'+
				// 'Experience: <span id="'+spocklet+'_exp_gained" class="good"></span> <span id="'+spocklet+'_exp_ratio" class="more_in"></span>&nbsp;'+
				//edit
				'<span id="'+spocklet+'_exp_gained" class="good"></span><span id="abc"> / </span>'+
				'<span id="'+spocklet+'_stamina_used" class="good"></span><span id="abc">  </span>'+
				'<span id="'+spocklet+'_exp_ratio" class="more_in">0</span>&nbsp;'+
				'<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/victory_icon.gif" style="vertical-align: middle;" height="18" width="18"><span id="'+spocklet+'_vcoins">?</span><br />'+
				'Money: <span id="'+spocklet+'_money_gained" class="good"></span>&nbsp;'+
				'<span class="more_in">(Banked: <span id="'+spocklet+'_money_banked"></span>)</span>&nbsp;'+
				'&nbsp;<span id="'+spocklet+'_brazil_row" style="display:none;">Energy: <span id="'+spocklet+'_energy_gained" class="good"></span>&nbsp;'+
				'Stamina: <span id="'+spocklet+'_stamina_gained" class="good"></span>&nbsp;</span><br />'+
				'<a id="'+spocklet+'_boards_toggle" class="'+spocklet+'_toggle" alt="Hide/Show board stats" title="Hide/Show board stats">Boards</a>: <span id="'+spocklet+'_boards_done" class="good"></span>&nbsp;'+
				'Successful: <span id="'+spocklet+'_success" class="good"></span>&nbsp;'+
				'Failed: <span id="'+spocklet+'_failed" class="bad"></span>&nbsp;'+
			'</td>'+
			'<td align="right" style="text-align:right;">'+
				'Use Burners <span id="'+spocklet+'_burners_have">(-)</span> <input id="'+spocklet+'_max_burners" style="width:20px;" type="text" value="1" maxlength="2" name="'+spocklet+'_savecookie" />:<input id="'+spocklet+'_burners" style="width:20px;" type="checkbox" name="'+spocklet+'_savecookie" /><br />'+
				'Before levelup:<input id="'+spocklet+'_levelup" style="width:20px;" type="checkbox" name="'+spocklet+'_savecookie" /><br />'+
				'Show Popups:<input id="'+spocklet+'_popups" style="width:20px;" type="checkbox" name="'+spocklet+'_savecookie" />'+
			'</td>'+
		'</tr>'+
		'<tr id="'+spocklet+'_boards" style="display:none;"><td valign="top">Board Stats:</td><td colspan="2"><span id="'+spocklet+'_board_stats"><span class="mode_in">No boards logged yet</span></span></td></tr>'+
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
		'<tr id="'+spocklet+'_runtime_row" style="display:none;"><td>Runtime:</td><td colspan="2"><span id="'+spocklet+'_runtime"></span></td></tr>'+
		'<tr><td>Status:</td><td colspan="2" id="'+spocklet+'_status"></td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr>'+
			'<td valign="top"><a href="#" id="'+spocklet+'_loot_toggle" class="'+spocklet+'_toggle" alt="Hide/Show loot" title="Hide/Show loot">Show</a> loot:</td>'+
			'<td colspan="2"><span id="'+spocklet+'_loot_stats"><span class="more_in">No loot found yet.</span></span><br /><span id="'+spocklet+'_loot"></span></td>'+
		'</tr>'+
		'<tr>'+
			'<td valign="top"><a href="#" id="'+spocklet+'_log_toggle" class="'+spocklet+'_toggle" alt="Hide/Show log" title="Hide/Show log">Show</a> log:<br />'+
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

	function camelize(str) {
		return str.toLowerCase().replace(/\b[a-z]/g, cnvrt);
		function cnvrt() {
			return arguments[0].toUpperCase();
		}
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
		var delay = (seconds > 0)? delay = 500 : delay = 10;
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

	function banker(cash,city) {
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
			'xw_person': personid,
			'clicks': User.clicks
		};
		if (city == 5) {
			var url = preurl+'xw_controller=propertyV2&xw_action=doaction&doaction=ActionBankDeposit&building_type=6&city=5';
		}
		else {
			var url = preurl+'xw_controller=bank&xw_action=deposit_all';
		}
		$.ajax({
			type: "POST",
			url: url,
			data: params,
			success: function (bankresponse) {
				var bankobject = jQuery.parseJSON(bankresponse.replace(/^(\s\d\s+)/,''));
				var message = '';
				try {
					user_fields_update(bankobject.user_fields);
					user_info_update(bankobject.user_fields, bankobject.user_info);
					stats_update(bankobject.user_fields);
				}
				catch (banker_user_fields) {
					log('Ran into trouble in banker(), user_fields: '+banker_user_fields);
					log('<a href="http://www.spockholm.com/mafia/help.php#bugreporting">Read here</a> on how to report this problem.');
				}
				if (Util.isset(bankobject.questData)) {
					MW.QuestBar.update(bankobject.questData);
				}
				if (params.xw_city == 5) {
					bankobject = jQuery.parseJSON(bankobject.data);
				}
				if (Util.isset(bankobject.deposit_message)) {
					if (/bank can only hold/.test(bankobject.deposit_message)) {
						//New York bank is full
						$('#'+spocklet+'_bankamount').val('0');
						$('#'+spocklet+'_bankamount').trigger('keyup');
					}
					else {
						var banked = /[A-Z]+?\$([\d,]+)/.exec(bankobject.deposit_message)[1];
						stats.money_banked += parseInt(banked.replace(/[^0-9]/g, ''));
					}
					var message = bankobject.deposit_message;
				}
				if (Util.isset(bankobject.success_message)) {
					if (/You cannot deposit any more/.test(bankobject.success_message)) {
						// Vault full = 'You cannot deposit any more'
						$('#'+spocklet+'_bankamount').val('0');
						$('#'+spocklet+'_bankamount').trigger('keyup');						
					}
					else if (/You cannot deposit that much/.test(bankobject.success_message)) {
					}
					else {
						var banked = /[A-Z]+?\$([\d,]+)/.exec(bankobject.success_message)[1];
						stats.money_banked += parseInt(banked.replace(/[^0-9]/g, ''));
					}
					var message = bankobject.success_message;
				}
				log(timestamp()+message);
				repeat_rob();
			}
		});
	}
	
	function age(diff) {
		if (diff == 0) {
			return 0;
		}
		diff*=1000;
		var hours = Math.floor(diff / (60 * 60 * 1000)); 
		diff -= hours * (60 * 60 * 1000);
		var minutes = Math.floor(diff / (60*1000)); 
		diff -= minutes * 60 * 1000;
		var seconds = Math.floor(diff / 1000); 
		return '<span class="more_in">'+hours+' h '+minutes+' min '+seconds+' sec</span>';
	}
	
	// From Vern's toolkit.js, http://vern.com/mwtools/
	var logs = [];
	var extralog = [];
	function logtrunc(message) {
		var limit = parseInt($('#'+spocklet+'_logsize').val());
		var keep = /icanhazcheeseburger/;
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
		for (x in stats) {
			if ($('#'+spocklet+'_'+x)) {
				if (x == 'success') {
					$('#'+spocklet+'_'+x).html(stats.success+' <span class="more_in">('+parseFloat(stats.success/stats.robs_done*100).toFixed(1)+'%)</span>');
				}
				else if (x == 'failed') {
					$('#'+spocklet+'_'+x).html(stats.failed+' <span class="more_in">('+parseFloat(stats.failed/stats.robs_done*100).toFixed(1)+'%)</span>');
				}
				else if (/money_/.test(x)) {
					$('#'+spocklet+'_'+x).html('$'+commas(stats[x]));
				}
				else {
					$('#'+spocklet+'_'+x).html(stats[x]);
				}
			}
		}
		$('#'+spocklet+'_exp_ratio').html('  ('+(stats.exp_gained/stats.stamina_used).toFixed(2)+' exp/stamina)');
		if (stats.energy_gained > 0 || stats.stamina_gained > 0) {
			$('#'+spocklet+'_brazil_row').show();
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
			
		var now = unix_timestamp();
		if (start_time == 0) {
			start_time = parseInt(new Date().getTime().toString().substring(0, 10));
		}
		var timediff = parseInt(now-start_time);
		$('#'+spocklet+'_runtime').html(age(timediff)+' &nbsp; '+parseFloat(stats.robs_done/timediff).toFixed(2)+'/second');
	}

	function customSort(property) {
		return function (b, a) {
			return parseInt(a[property]) - parseInt(b[property]);
		};
	}
	
	function add_board(stat) {
		var found = false;
		for (var x in board_stats) {
			if (board_stats[x].stat == stat) {
				board_stats[x].count++;
				found = true;
				break;
			}
		}
		if (!found) {
			board_stats.push({"count": 1, "stat": stat});
		}
		board_stats.sort(customSort('stat'));
		var output = '';
		for (x in board_stats) {
			output += '['+board_stats[x].stat+']: <span class="good">'+board_stats[x].count+'</span> <span class="more_in">('+parseFloat(board_stats[x].count/stats.boards_done*100).toFixed(1)+'%)</span><br />';
		}
		$('#'+spocklet+'_board_stats').html(output);
	}
	
	function add_loot(itemid, name, count) {
		stats.lootcount += count;
		var attack = 0;
		var defense = 0;
		if (itemid) {
			if(typeof looted[itemid] == 'object') {
				looted[itemid].quantity += count;
			}
			else {
				looted[itemid] = {"id": itemid, "name": name, "quantity": count, "attack": attack, "defense": defense};
				//get_item_data(itemid); not needed for robbery log
			}
		}
		else {
			if (typeof looted[name] == 'object') {
				looted[name].quantity += count;
			}
			else {
				looted[name] = {"id": itemid, "name": name, "quantity": count, "attack": attack, "defense": defense};
			}
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
			url: preurl+'xw_controller=item&xw_action=get_item_data&item_id='+itemid,
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
				}
				update_loot_log();
			}
		});
	}

	function get_rob_data(action) {
		cb = userid+unix_timestamp();
		User.clicks++;
		var params = {
			"cb": cb,
			//"xw_city": xw_city,
			"xw_city": '',
			"xw_client_id": 8,
			"ajax": 1,
			"liteload": 1,
			"sf_xw_sig": local_xw_sig,
			"sf_xw_user_id": userid,
			"clicks": User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+'xw_controller=robbing&xw_action='+action,
			data: params,
			success: function (response) {
				try {
					var object = {};
					object.user_energy = parseInt(/user_energy.*\("(\d+)"\)/.exec(response)[1]);
					object.user_stamina = parseInt(/user_stamina.*\("(\d+)"\)/.exec(response)[1]);
					object.exp_for_next_level = parseInt(/exp_for_next_level.*\("(\d+)"\)/.exec(response)[1]);
					stats_update(object);
				}
				catch (get_rob_data_user_fields) {
					log('Ran into trouble in get_rob_data(), user_fields: '+get_rob_data_user_fields);
				}
				
				try {
					local_xw_sig = /local_xw_sig.*?([a-f0-9]{32})/.exec(response)[1];
				}
				catch (workaroundignore) {}
				
				if (/Get New Targets \(0 stamina\)/.test(response)) {
					msg('Reloading rob board...');
					slots = [];
					get_rob_data('refresh');
				}
				else {
					$(response).find('.rob_slot').each(function() {
						if ($(this).find('.rob_btn').length > 0) {
							var slot = /rob_slot_(\d+)/.exec($(this).attr('id'))[1];
							var name = camelize($(this).find('.rob_prop_name_short').text());
							var stamina = $(this).find('.rob_prop_stamina').text();
							var url = /xw_controller=robbing([&;=\w]+)/.exec($(this).find('.rob_btn').html())[1];
							slots[slots.length] = {"slot": slot, "name": name, "stamina": stamina, "url": url.replace(/&amp;/g,'&')};
							msg('Board loaded, waiting for start...');
							controls_display(true,false,true);
						}						
					});
					if (slots.length == 0) {
						failed++;
						if (failed < 5) {
							log('Failed for the '+failed+' time, reloading rob board and trying again...');
							get_rob_data('view');
						}
						if (failed == 5) { get_rob_data('refresh');}
						else {
							log('Failed '+failed+' times, giving up.');
							msg('Failed '+failed+' times, giving up.');
							run = false;
							controls_display(true,false,true);
						}
					}
					if (run && slots.length > 0) {
						failed = 0;
						repeat_rob();
					}
				}
			}
		});
	}
	
	function repeat_rob() {
		//helper function to handle all the conditions before repeating a robbery
		var wait = myRandom(parseInt($('#'+spocklet+'_delay1').val()),parseInt($('#'+spocklet+'_delay2').val()));
		var bankamount = parseInt($('#'+spocklet+'_bankamount').val());
		var robs_done = parseInt($('#'+spocklet+'_robs_done').html());
		var robs_todo = parseInt($('#'+spocklet+'_robs_todo').val());
		var energy_ratio_val = parseFloat($('#'+spocklet+'_energy_ratio').val());
		var stamina_ratio_val = parseFloat($('#'+spocklet+'_stamina_ratio').val());
		var exp_level = parseInt($('#exp_to_next_level').html());
		var exp_val = parseInt($('#'+spocklet+'_exp_level').val());
		var energy_val = parseInt($('#'+spocklet+'_energy_remain').val());
		var user_energy = parseInt($('#user_energy').html());
		
		if (run) {
			if (User.cash > bankamount && bankamount > 0) {
				pausing(wait,'Banking money in ',function(){ banker(User.cash,xw_city); });
			}
			else if ((exp_level < 100) && $('#'+spocklet+'_levelup').is(':checked')) {
				msg('<span class="good">Could levelup on next robbery, pausing...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			else if (robs_todo == 0) {
				controls_display(false,true,true);
				pausing(wait,'Robbing again in ',function(){ do_rob(); });
				return;
			}
			else {
				msg('Taking a break after doing '+robs_todo+' robberies.');
				controls_display(true,false,true);
				run = false;
			}
		}
		else {
			msg('Pausing...');
			controls_display(true,false,true);
		}
	}
	
	function do_rob() {
		if (slots.length == 0) {
			log('Ran out of slots to rob, reloading rob page...');
			get_rob_data('view');
			return;
		}
		var slot = slots[0];
		if (run) {
			msg('Robbing '+slot.name+'...');
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
				url: preurl+'xw_controller=robbing'+slot.url.replace(/(cb=.*?&)/,''),
				data: params,
				success: function (response) {
					var board_complete = false;
					if (/index_controller/.test(response)) {
						msg('Session timed out, reloading rob page...');
						log(timestamp()+'Session timed out, reloading rob page. Press Start to try again.');
						run = false;
						controls_display(true,false,true);
					}
					else if (/It looks like you changed cities in another browser window/.test(response)) {
						msg('Travelling detected, stopping...');
						log(timestamp()+'<span class="bad">Travelling detected!</span>');
						run = false;
						controls_display(true,false,true);
					}
					else if (/please try again later/.test(response)) {
						log(timestamp()+'Odd response, skipping this and move on...');
						slots.shift();
						repeat_rob();
					}
					else {
						var object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
						try {
							user_fields_update(object.user_fields);
							user_info_update(object.user_fields, object.user_info);
							stats_update(object.user_fields);
						}
						catch (do_job_user_fields) {
							log('Ran into trouble in do_rob(), user_fields: '+do_job_user_fields);
						}
						if (Util.isset(object.questData)) {
							MW.QuestBar.update(object.questData);
						}

						//job successfully done
						if (Util.isset(object.slot)) {
							robResult = object.slot;
							var success;
							//update the stats
							stats.stamina_used += parseInt(slot.stamina);

							if (/Success/i.test(robResult)) {
								stats.success++;
								stats.robs_done++;
								success = true;
							}
							if (/Failed/i.test(robResult)) {
								stats.failed++;
								stats.robs_done++;
								success = false;
							}

							//Check energy/stamina
							if (m = /\+(\d+) Energy/.exec(robResult)) {
								var number = parseInt(m[1].replace(/[^0-9]/g, ''));
								stats.energy_gained += number;
							}
							if (m = /\+(\d+) Stamina/.exec(robResult)) {
								var number = parseInt(m[1].replace(/[^0-9]/g, ''));
								stats.stamina_gained += number;
							}
							var exp_output = '';
							if (m = /(\d+) Experience/.exec(robResult)) {
								var exp = parseInt(m[1].replace(/[^0-9]/g, ''));
								stats.exp_gained += exp;
								exp_output = 'Gained <span class="good">'+exp+'</span> exp';
							}
							var loot = ' ', quantity = 1;
							
							var board_result = '';
							if (Util.isset(object.popup)) {
								if (/You cleared the full board and earned/.test(object.popup)) {
									board_complete = true;
									var bonus_exp = parseInt(/(\d+) Bonus Experience/.exec(object.popup)[1]);
									stats.exp_gained += bonus_exp;
									exp_output = 'Gained <span class="good">'+exp+'(+'+bonus_exp+')</span> exp';
									stats.boards_done++;
								}
								if (stat = /Your record on this board was (\d-\d)/.exec(object.popup)) {
									board_result = ' Board result: <span class="good">'+stat[1]+'</span>';
									add_board(stat[1]);
								}
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
							
							var cash = 0, cash_output = '';
							if (m = /([A-Z]{0,3}\$)([\d,]+)/.exec(robResult)) {
								var c = /([A-Z]{0,3}?\$)/.exec(m[1]);
								sign = c[1];
								var cash = parseInt(m[2].replace(/[^0-9]/g, ''));
								stats.money_gained += cash;
								cash_output = ' <span class="good">'+sign+commas(cash)+'</span>';
							}

							if (Util.isset(object.popup) && /You do not have enough stamina/.test(object.popup)) {
								if ($('#'+spocklet+'_restart').is(':checked')) {
									if (restarts < restartlimit) {
										var delay = parseInt($('#'+spocklet+'_restart_time').val()*60);
										pausing(delay,'Restarting again in ',function(){ repeat_rob(); });
										log(timestamp()+'<span class="bad">Ran out of stamina, restarting is enabled...</span>');
										restarts++;
										return;
									}
									else {
										log('Failed restarting '+restartlimit+' times, stopping.')
										run = false;
									}
								}
								else {
									log(timestamp()+'<span class="bad">Ran out of stamina, stopping...</span>');
									msg('<span class="bad">Out of stamina, stopped.</span>');
									controls_display(true,false,true);
									run = false;
									return;
								}
							}
							
							//show popups
							if (Util.isset(object.popup) && $('#'+spocklet+'_popups').is(':checked')) {
								//console.log('adding popup id: '+object.popup_id);
								if (!/You cleared the full board and earned/.test(object.popup)) {
									$('#popup_fodder').prepend('<div id="'+object.popup_id+'"></div>');
									$('#'+object.popup_id).append(object.popup);
								}
							}

							//check if burner was used
							if (object.call_for_backup > 0) {
								burners_used++;
							}
							else {
								burners_used = 0;
							}
							
							//log the result
							if (success) {
								var status = '<span class="good">Win!</span>';
								slots.shift();
							}
							else {
								var status = '<span class="bad">Fail!</span>';
								if ($('#'+spocklet+'_burners').is(':checked') && (object.phones_left > 0) && (burners_used < parseInt($('#'+spocklet+'_max_burners').val()))) {
									var burner_button = $(robResult).find('.rob_res_burner_button:first').html();
									if (burner = /tmp=([a-z0-9]+)/.exec(burner_button)) {
										slots[0].url = slots[0].url.replace(/tmp=([a-z0-9]+)/,'tmp='+burner[1]);
										slots[0].url = slots[0].url.replace(/xw_action=rob/,'xw_action=call_for_help');
										slots[0].url += '&slot_id='+slots[0].slot;
									}
									else {
										slots.shift();
									}
								}
								else {
									slots.shift();
								}
								
							}
							
							if (object.call_for_backup > 0) {
								status = '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/item_theburner_01.gif" alt="Burner used" title="Burner used" style="height:16px;width:16px;" align="middle">'+status;
							}
							$('#'+spocklet+'_burners_have').html('('+object.phones_left+')')
							log(timestamp()+status+' '+exp_output+cash_output+loot+board_result);
							
							//decide next action
							if (board_complete) {
								slots = [];
								msg('Reloading rob board...');
								get_rob_data('refresh');
								load_vc_count();
							}
							else {
								repeat_rob();
							}
						}
						else {
							log(timestamp()+' Something went terribly wrong!');
						}
					}
				}
			});
		}
	}

	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	}
	
	function load_vc_count() {
		var url = 'xw_controller=fight&xw_action=view&xw_city=7&mwcom=1';
		request(url,function(s){ parse_vc_count(s); });
	}
	function parse_vc_count(msg) {
		var coins = parseInt($(msg).find('.fightmastery_tokens:first').html().replace(/,/,''));
		if (stats.vc_start == 0) {
			stats.vc_count = coins;
			stats.vc_start = coins;
			$('#'+spocklet+'_vcoins').html(coins);
		}
		else {
			stats.vc_count = coins;
			$('#'+spocklet+'_vcoins').html(stats.vc_count+' (<span class="good">+'+parseInt(stats.vc_count-stats.vc_start)+'</span>)');
		}
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
			url: 'http://facebook.mafiawars.zynga.com/mwfb/sf_updater.php',
			data: params,
			success: function (response) {
				//console.log('Before: '+local_xw_sig);
				local_xw_sig = /([a-f0-9]{32})/.exec(response)[1];
				//console.log('After: '+local_xw_sig);
			}
		});
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
	if (xw_city == 1) {
		$('#'+spocklet+'_bankamount').val('0');
		$('#'+spocklet+'_bankamount').trigger('keyup');
	}
	controls_display(false,false,true);
	if ($('#'+spocklet+'_restart').is(':checked')) {
		$('#'+spocklet+'_restart_row').show();
	}
	else {
		$('#'+spocklet+'_restart_row').hide();
	}
	
	//bind buttons
	$('#'+spocklet+'_play').click(function() {
		run = true;
		start_time = 0;
		clearInterval(timer);
		controls_display(false,true,true);
		$('#'+spocklet+'_donate').animate({ color: "white" }, 1000, "swing" ,function() { $('#'+spocklet+'_donate').animate({ color: "black" }, 1000); });
		get_rob_data('view');
		//repeat_rob();
	});

	$('#'+spocklet+'_pause').click(function() {
		run = false;
		controls_display(true,false,true);
		load_vc_count();
		if (/(Restarting in|Robbing again)/.test($('#'+spocklet+'_status').html())) {
			clearInterval(timer);
			msg('Paused...');
		}
	});

	$('#'+spocklet+'_close').click(function() {
		run = false;
		clearInterval(timer);
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
	});

	//runtime toggle icon, somewhat hidden, no need to encourage 0-0 timers
	var pos = $('#'+spocklet+'_main').position();
	$('#'+spocklet+'_main').prepend('<a href="#" id="'+spocklet+'_runtime_row_toggle" class="'+spocklet+'_toggle"><img src="'+clockimg+'" width="2" height="1" style="position: absolute; left:'+parseInt(pos.left+7)+'px; top: '+parseInt(pos.top+7)+'px;" alt="Show/Hide runtime" title="Show/Hide runtime" /></a>');
	
	$('a[class='+spocklet+'_toggle]').click(function() {
		$('#'+this.id.replace(/_toggle/,'')).toggle()
	});

	//bind events for error checking user input boxes
	$('#'+spocklet+'_robs_todo').bind('keyup',function() {
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
	$('#'+spocklet+'_delay1, #'+spocklet+'_max_burners').bind('keyup',function() {
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
	$('#'+spocklet+'_popups, #'+spocklet+'_levelup, #'+spocklet+'_burners').change(function() {
		saveForm(spocklet+'_cookie');
	});
	
	//get started with the bookmarklet
	get_rob_data('view');
	load_vc_count();
	$('#'+spocklet+'_donate').effect("pulsate", { times:1 }, 750);
	
	update_sig();
	setInterval(update_sig, 300000);
	log('This is <span class="good">'+version+'</span>, a bookmarklet from <strong>Spockholm Mafia Tools</strong><br /> Visit our <a href="http://www.facebook.com/mafiatools/">[Fan Page]</a> or website <a href="http://www.spockholm.com/mafia/testing.php">[spockholm.com]</a> for more bookmarklets.');
	if (xw_city == 8) {
		log('<span class="bad">Robbing in Chicago may not be active yet, manually check robbing board to verify.</span>');
	}


})()

