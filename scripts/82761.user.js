// ==UserScript==
// @name           Brawler
// @author         Arun
// @description     Picks targets off the fightlist and auto attacks
// ==/UserScript==

var trace_enable = false;
var skip_reason;
javascript: (function () {
	var u = false;
	var v;
	var w;
	var x;
	var y = [];
	var A = [];
	var B = [];
	var C = [];
	var D = [];
	var E = [];
	var F = [];
	var i = 0,
	j = 0;
	var G = 0,
	actual_count = 0;
	var H = 1;
	var I = 0,
	moscow_cash = 0,
	bk_cash = 0,
	cuba_cash = 0,
	vegas_cash = 0,
	italy_cash = 0;
	var J = 0;
	var K = false;
	var L = 0;
	var M;
	var N;
	var O;
	var P;
	var Q = false;
	var R = 0;
	var S = 0,
	loss = 0;
	var T = [],
	loot_count,
	loot_log,
	l_log = '';
	var U;
	var V = 0,
	temp_loot;
	var W = [];
	var X = [];
	var Y = 0,
	ices = 0;
	var Z = false,
	bo = false;
	var ba = false;
	var bb = 0;
	var bc = "Fightlist";
	var bd = [];
	var be = [];
	var bf = [];
	var bg = [];
	var bh = 0,
	cash_limit = 0,
	cash_in_hand = 0;
	var bi = true;
	var bj = "100001768779662\n100000814697530\n1569115939\n1645819657\n100001067598459\n100001047658084\n100000898380439\n100001007957685\n100000375495674\n1206819058\n100000848734871\n1793236735\n100000854181941\n100000832602631\n100000848734871\n639239336\n1830672943\n1027758678\n100000956712356";
	var bk;
	var bl;
	var bm;
	var bn = 0,
	Yakuza = 0;
	var bo = false;
	var bp, initial_mafia_attack = 0;
	var bq, initial_mafia_defense = 0;
	var br = false,
	user_power_attack = false;
	var bs = 0,
	killed_count = 0;
	var bt = [];
	var bu = [];
	var bv = [],
	coin_owner_id = [];
	var bw = 0,
	initial_vic_pts = 0;
	var bx = 1,
	wait2 = 2;
	var by = 1,
	heal_city_text = 'New York';
	var bz = true,
	levelup_text = 'Stop';
	var bA = '';
	var bB = '',
	user_bank_enable = '',
	bank_limit = 10000;
	var bC = '',
	attack_limit_count = 3;
	var bD = 1,
	upper_mafia = 501;
	var bE = 9999,
	lower_level = 0;
	var bF = 0;
	var bG = 'checked';
	var bH = 10;
	var bI = 'checked',
	triad_fac = '',
	yakuza_fac = '',
	faction_bal = 'checked';
	var bJ = 'checked',
	user_iced_check = 'checked';
	var bK = 'checked';
	var bL = false,
	user_power_attack_enable = false;
	var bM = 30;
	var bN = document.getElementsByName('mafiawars');
	try {
		if (bN.length > 0 || (!bN)) {
			window.location.href = document.getElementsByName('mafiawars')[0].src;
			return
		} else {
			document.body.parentNode.style.overflowY = "scroll";
			try {
				if (typeof FB != 'undefined') {
					FB.CanvasClient.stopTimerToSizeToContent;
					window.clearInterval(FB.CanvasClient._timer);
					FB.CanvasClient._timer = -1
				}
			} catch(err) {}
		}
	} catch(err) {}
	try {
		document.getElementById('header_top_promo_banner').parentNode.removeChild(document.getElementById('header_top_promo_banner'))
	} catch(fberr) {}
	try {
		document.getElementById('LoadingOverlay').parentNode.removeChild(document.getElementById('LoadingOverlay'));
		document.getElementById('LoadingBackground').parentNode.removeChild(document.getElementById('LoadingBackground'))
	} catch(fberr) {}
	var bm = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
	var bO = /[a-z]\|([0-9]+)/.exec(bm)[1];
	bl = current_city();
	var bP = /&tmp=(.+?)&/.exec(document.body.innerHTML)[1];
	var bQ = /&cb=(.+?)&/.exec(document.body.innerHTML)[1];
	if (bm == 'p|47869484' || bm == 'p|78199035') {
		return
	}
	readCookieStuff();
	var bR = '<style type="text/css">' + '.sexy_table1{font-weight:bold; border:1px solid #666666; padding-left:10px; }' + '.sexy_error_table{font-size:17px; background-color:black; color:red; padding-left:10px display:none}' + '.sexy_select{color:#D0D0D0; border: 1px solid #666666; background-color:black;}' + '.sexy_input{background-color:black; color:#D0D0D0; font-size:13px; border: 1px solid #666666; padding-left:0.1em}' + '.sexy_destination1{padding-top: 5px; padding-bottom: 5px; padding-right: 5px; padding-left: 10px; font-weight: bold; background-color:black; color:#FFD927; border: 1px solid #FFD927; overflow: hidden;}' + '.sexy_destination2{font-weight: bold; background-color:black; color:#FFD927; width:150px; border: 1px solid #FFD927; overflow: hidden;}' + '</style>';
	var bS = '<form id="something">' + '<table width="745px" style="border:1px solid #666666; background-color:black;">' + '<tr>' + '<td width="100%" style="border:1px solid #666666;">' + '<table style="background-color:black; height:40px">' + '<tr>' + '<th width="50%" style="font-size:20px; padding-left:15px;text-align: left">Brawler v4.1</th>' + '<th width="48%" style="font-size:12px; text-align:right"> <a id="Website" align="right" href="http://codeoutpost.com/?page_id=33" target="_blank">Outpost Mafia Tools</a> - <a id="Forum" align="right" href="http://mafia-taskforce.info/viewforum.php?f=72" target="_blank">Updates/Bugs</a> - <a id="Donate" href="http://codeoutpost.com/?page_id=31" target="_blank">Donate</a></th>' + '<th width="2%" align=center><a href="#" id="close"><img alt="Exit" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a></th>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">Fights</td>' + '<td width="1%">:</td>' + '<td width="2%" id="fights">0</td>' + '<td width="3%">Of</td>' + '<td width="75%"><input type=text id="attackcount" value="0" class="sexy_input" style="width:30px" onkeydown="return field_validate(event.keyCode);">' + ' / Exp to Level : <input type=text id="exp_to_level" value="0" class="sexy_input" style="width:30px" onkeydown="return field_validate(event.keyCode);">' + ' / Ice count : <input type=text id="ice_count" value="0" class="sexy_input" style="width:50px" onkeydown="return field_validate(event.keyCode);"></td>' + '<td width="9%"><a id="pause" href="#" style="display:none"><img align="right" alt="Pause" src="http://codeoutpost.com/Scripts/pause.png"></img></a>' + '<a id="begin" href="#" style="display:inline"><img align="right" alt="Start" src="http://codeoutpost.com/Scripts/play.png"></img></a></td>' + '</tr></table>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">On stop</td>' + '<td width="1%">:</td>' + '<td width="89%"><input type="checkbox" id="restart_enable"> Restart in <input type=text id="restart_min" value="1" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"> minutes, ' + '<input type="checkbox" id="finish_heal_enable"> Heal ' + '</td>' + '</tr></table>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">Exp Gain</td>' + '<td width="1%">:</td>' + '<td width="25%">&nbsp;<span id="exp_gained">0</span> &nbsp;(<span id="exp_ratio">0.00</span> exp/stam)</td>' + '<td width="12%" align="right">Exp Required</td>' + '<td width="1%" align="right">:</td>' + '<td width="28%" align="right"><span id="exp_reqd">0</span> &nbsp;(<span id="exp_ratio_reqd">0.00</span> exp/stam)</td>' + '<td width="5%">Wins</td>' + '<td width="1%">:</td>' + '<td width="5%"><span class="good" id="wins">0</span></td>' + '<td width="1%">&nbsp;</td>' + '<td width="5%">Losses</td>' + '<td width="1%">:</td>' + '<td width="5%"><span class="bad" id="losses">0</span></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">Status</td>' + '<td width="1%">:</td>' + '<td width="62%"><span id="status">&nbsp;</span></td>' + '<td width="13%">Heal City <input type=text id="heal_thres" value="' + bM + '" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></td>' + '<td width="1%">:</td>' + '<td width="13%">&nbsp;<a id="heal_city_change" href="#"><span id="heal_city">' + heal_city_text + '</span></a></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">Cash</td>' + '<td width="1%">:</td>' + '<td width="89%"><span id="cash"><span class="good"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif"></img> $0&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cubanpeso_16x11_01.gif"></img>&nbsp;C$0&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_moscow_16x16_01.gif"></img>&nbsp;R$0&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_bangkok_16x16_01.gif"></img>&nbsp;B$0&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png"></img>&nbsp;V$0&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_italy_16x16_02.png"></img>&nbsp;L$0</span></span></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="65%">&nbsp;</td>' + '<td width="13%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/victory_icon.gif"></img><span id="Victorycoins">0</span></td>' + '<td width="1%">&nbsp;</td>' + '<td width="8%">Delay</td>' + '<td width="1%">:</td>' + '<td width="5%"><input type=text id="delay1" value="' + bx + '" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></td>' + '<td width="2%">to</td>' + '<td width="5%"><input type=text id="delay2" value="' + wait2 + '" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%" >' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">Stats</td>' + '<td width="1%">:</td>' + '<td width="5%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/bangkok_yakuza_small.gif" alt="Yakuza"></img></td>' + '<td width="5%" id="Yakuza_points">0</td>' + '<td width="1%">&nbsp;</td>' + '<td width="5%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/bangkok_triads_small.gif" alt="Triad"></img></td>' + '<td width="5%" id="Triad_points">0</td>' + '<td width="3%">&nbsp;</td>' + '<td width="3%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_mafia_attack_22x16_01.gif"></img></td>' + '<td width="17%"> <span id="mafia_attack">0</span> [<span id="attack_diff"><span class="good">+0</span></span>]</td>' + '<td width="3%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_mafia_defense_22x16_01.gif"></img></td>' + '<td width="17%"> <span id="mafia_defense">0</span> [<span id="defense_diff"><span class="good">+0</span></span>]</td>' + '<td width="3%"><img src="http://codeoutpost.com/Scripts/kill.png" alt="Kills"></img></td>' + '<td width="1%">:</td>' + '<td width="7%"><span id="kills_log">0</span></td>' + '<td width="2%">&nbsp;</td>' + '<td width="3%"><img src="http://codeoutpost.com/Scripts/Ice.png" alt="Iced"></img></td>' + '<td width="1%">:</td>' + '<td width="7%"><span id="iced_log">0</span></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<td width="10%">Fight</td>' + '<td width="1%">:</td>' + '<td width="25%"><input type="radio" id="Fightlist" name="fight_choice" checked>Fightlist</input></td>' + '<td width="25%"><input type="radio" id="Users" name="fight_choice">Specific Users</input></td>' + '<td width="10%" style="text-align:right">&nbsp;</td>' + '<td width="15%">Before level up</td>' + '<td width="1%">:</td>' + '<td width="13%"><a id="levelup" href="#">' + levelup_text + '</a></td>' + '</table>' + '</td>' + '</tr>' + '<tr id="UserChoice" style="display:none">' + '<td width="100%">' + '<table width=100% id="useroption" style="background-color:black;border:1px solid #666666;">' + '<tr>' + '<td colspan="13"><input type="checkbox" id="user_bank_enable" ' + user_bank_enable + '> Enable bank if cash in hand is greater than : <input type="text" id="user_bank_limit" value="' + bank_limit + '" class="sexy_input" onkeydown="return field_validate(event.keyCode);">&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="user_power_attack" ' + bL + '> Enable Power Attack</td>' + '</tr>' + '<tr>' + '<td colspan="13"><input type="checkbox" id="user_iced_check" ' + user_iced_check + '> Only attack live targets</td>' + '</tr>' + '<tr style="height:10px">' + '<td width="20%">Enter User Id\'s here (one id per line)</td>' + '<td width="1%">:</td>' + '<td width="30%" colspan=4><textarea id="UserIds" class="sexy_input"></textarea></td>' + '<td width="49%" colspan=4><input type="checkbox" id="UserSkip">Stop if all users are Iced/Killed</input>' + '<br><br><a id="AddSpammers" class="sexy_button_new"><span><span>Load Spammer List</span></span></a></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr id="FightChoice">' + '<td width="100%">' + '<table width=100% id="fightlistoption" style="background-color:black;border:1px solid #666666;">' + '<tr>' + '<td colspan="13"><input type="checkbox" id="cash_city" ' + bG + '>Attack only if Cash from same city &nbsp;&nbsp;<input type="checkbox" id="attack_limit_check" ' + bC + '>Limit number of attacks per person <input type="text" id="attack_limit" value="' + attack_limit_count + '" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></td>' + '</tr>' + '<tr>' + '<td colspan="13"><input type="checkbox" id="faction_enable" ' + bI + '> Enable Specific Faction Attack : ' + '<input type="radio" id="Triad" name="faction" ' + triad_fac + '> Attack Triad Only ' + '<input type="radio" id="Yakuza" name="faction" ' + yakuza_fac + '> Attack Yakuza Only ' + '<input type="radio" id="Balance_Faction" name="faction" ' + faction_bal + '> Balance Factions by <input type="text" id="balanceamt" value="' + bH + '" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"> points</td>' + '</tr>' + '<tr>' + '<td colspan="13"><input type="checkbox" id="bank_enable" ' + bB + '> Enable bank if cash in hand is greater than : <input type="text" id="bank_limit" value="' + bank_limit + '" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></td>' + '</tr>' + '<tr>' + '<td colspan="13"><input type="checkbox" id="zynga_ice_check" ' + bK + '>Use Fightlist Ice Check</input> &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="ice_check" ' + bJ + '> Only Attack live targets</input> &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="power_attack" ' + bL + '> Enable Power Attack</input></td>' + '</tr>' + '<tr>' + '<td colspan="13">&nbsp;Minimum cash limit per attack : <input type="text" id="cashlimit" value="' + bF + '" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></td>' + '</tr>' + '<tr style="height:10px">' + '<td width="10%">Levels</td>' + '<td width="1%">:</td>' + '<td width="5%"><input type="text" id="LowerLevel" class="sexy_input" style="width:30px" value="' + lower_level + '"></input></td>' + '<td width="3%">to</td>' + '<td width="5%"><input type="text" id="UpperLevel" class="sexy_input" style="width:30px" value="' + bE + '"></input></td>' + '<td rowspan=2 width="5%">&nbsp;</td>' + '<td rowspan=2 width="30%">Ignore Names with Characters</td>' + '<td rowspan=2 width="1%">:</td>' + '<td rowspan=2 width="35%" colspan=4><textarea id="SpecialChars" class="sexy_input">' + bA + '</textarea></td>' + '</tr>' + '<tr style="height:10px">' + '<td width="10%">Mafia </td>' + '<td width="1%">:</td>' + '<td width="5%"><input type="text" id="LowerMafia" style="width:30px" class="sexy_input" value="' + bD + '"></input></td>' + '<td width="3%">to</td>' + '<td width="5%"><input type="text" id="UpperMafia" style="width:30px" class="sexy_input" value="' + upper_mafia + '"></input></td>' + '<td width="76%" colspan=4>&nbsp;</td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width="100%" style="background-color:black; height:40px">' + '<tr><td width="10%" valign="top"><a href="#" id="posts_show">Ices/Stashes/Coins</a></td>' + '<td width="1%" valign="top">:</td>' + '<td width="29%" id="ice_posts_log" valign="top" style="display:none">Ice Count - Name - Posts<br></td>' + '<td width="29%" id="stash_posts_log" valign="top" style="display:none">Finder - Stash Post<br></td>' + '<td width="31%" id="coin_posts_log" valign="top" style="display:none">Finder - Coins Post<br></td>' + '</tr>' + '<tr><td width="10%" valign="top"><a href="#" id="loot_show">Loot (<span id="loot_percent"></span>%)</a></td>' + '<td width="1%" valign="top">:</td>' + '<td id="loot_log" valign="top" colspan="3"></td>' + '</tr>' + '<tr><td width="10%" valign="top"><a href="#" id="log_show">Log</a> &nbsp;&nbsp;<input type="text" id="log_size" value="10" class="sexy_input" style="width:20px"></input></td>' + '<td width="1%" valign="top">:</td>' + '<td id="attack_log" colspan="3"></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '</table>' + '</form>';
	var bT = '<table class="sexy_error_table" width=100% border=2 rules=none bgcolor="black" id="errormsg"></table><br>';
	try {
		document.getElementById('popup_permanence').removeChild(document.getElementById('fight_attack_div'))
	} catch(err) {}
	var bU = document.getElementById('popup_permanence');
	var bV = document.createElement("div");
	bV.id = 'fight_attack_div';
	bV.innerHTML = bR + bT + bS;
	bU.insertBefore(bV, bU.firstChild);
	document.getElementById("AddSpammers").onclick = loadSpammers;
	document.getElementById("close").onclick = function () {
		writeCookieStuff();
		u = false;
		try {
			document.getElementById('popup_permanence').removeChild(document.getElementById('fight_attack_div'))
		} catch(err) {}
	};
	document.getElementById("begin").onclick = function () {
		if (Q) {
			document.getElementById("begin").style.display = 'none';
			document.getElementById("pause").style.display = 'inline';
			u = true;
			ba = true;
			G = parseInt(document.forms.something.attackcount.value);
			writeCookieStuff();
			start_attack()
		}
		return false
	};
	document.getElementById("pause").onclick = function () {
		u = false;
		document.getElementById("pause").style.display = 'none';
		document.getElementById("begin").style.display = 'inline';
		writeCookieStuff();
		return false
	};
	document.getElementById("loot_show").onclick = function () {
		switch (document.getElementById('loot_log').style.display) {
		case '':
			document.getElementById('loot_log').style.display = 'none';
			break;
		case 'none':
			document.getElementById('loot_log').style.display = '';
			break
		}
		return false
	};
	document.getElementById("posts_show").onclick = function () {
		switch (document.getElementById('ice_posts_log').style.display) {
		case '':
			document.getElementById('ice_posts_log').style.display = 'none';
			document.getElementById('stash_posts_log').style.display = 'none';
			document.getElementById('coin_posts_log').style.display = 'none';
			break;
		case 'none':
			document.getElementById('ice_posts_log').style.display = '';
			document.getElementById('stash_posts_log').style.display = '';
			document.getElementById('coin_posts_log').style.display = '';
			break
		}
		return false
	};
	document.getElementById("log_show").onclick = function () {
		switch (document.getElementById('attack_log').style.display) {
		case '':
			document.getElementById('attack_log').style.display = 'none';
			break;
		case 'none':
			document.getElementById('attack_log').style.display = '';
			break
		}
		return false
	};
	document.getElementById("Fightlist").onclick = function () {
		bc = "Fightlist";
		document.getElementById("FightChoice").style.display = '';
		document.getElementById("UserChoice").style.display = 'none'
	};
	document.getElementById("Users").onclick = function () {
		bc = "Users";
		document.getElementById("FightChoice").style.display = 'none';
		document.getElementById("UserChoice").style.display = ''
	};
	document.getElementById("levelup").onclick = function () {
		if (bz) {
			bz = false;
			levelup_text = document.getElementById("levelup").innerHTML = "Continue"
		} else {
			bz = true;
			levelup_text = document.getElementById("levelup").innerHTML = "Stop"
		}
		writeCookieStuff();
		return false
	};
	document.getElementById("bank_enable").onclick = function () {
		writeCookieStuff()
	};
	document.getElementById("user_bank_enable").onclick = function () {
		writeCookieStuff()
	};
	document.getElementById("cash_city").onclick = function () {
		writeCookieStuff()
	};
	document.getElementById("faction_enable").onclick = function () {
		writeCookieStuff()
	};
	document.getElementById("Triad").onclick = function () {
		writeCookieStuff()
	};
	document.getElementById("Yakuza").onclick = function () {
		writeCookieStuff()
	};
	document.getElementById("Balance_Faction").onclick = function () {
		writeCookieStuff()
	};
	document.getElementById("heal_city_change").onclick = function () {
		by++;
		by = (by > 6) ? 0 : by;
		switch (by) {
		case 0:
			heal_city_text = document.getElementById("heal_city").innerHTML = "Disabled";
			break;
		case 1:
			heal_city_text = document.getElementById("heal_city").innerHTML = "New York";
			break;
		case 2:
			heal_city_text = document.getElementById("heal_city").innerHTML = "Cuba";
			break;
		case 3:
			heal_city_text = document.getElementById("heal_city").innerHTML = "Moscow";
			break;
		case 4:
			heal_city_text = document.getElementById("heal_city").innerHTML = "Bangkok";
			break;
		case 5:
			heal_city_text = document.getElementById("heal_city").innerHTML = "Las Vegas";
			break;
		case 6:
			heal_city_text = document.getElementById("heal_city").innerHTML = "Italy";
			break
		}
		writeCookieStuff();
		return false
	};
	function UnixTS() {
		return (Math.round(new Date().getTime() / 1000))
	}
	function loadfightpage() {
		logmsg('Loading fight page...', 'status');
		cb = bm + UnixTS();
		Q = false;
		document.getElementById('inner_page').addEventListener('DOMSubtreeModified', function () {
			if (pageLoading == 0) {
				switch (true) {
				case document.forms.something.Fightlist.checked:
					setTimeout(loadfightlist, 1000);
					break;
				case document.forms.something.Users.checked:
					if (ba) {
						setTimeout(loaduserlist, 1000)
					}
					break
				}
				this.removeEventListener('DOMSubtreeModified', arguments.callee, false)
			}
		},
		false);
		do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&cb=' + cb, 1, 1, 0)
	}
	function loadfightlist() {
		y = [];
		A = [];
		B = [];
		D = [];
		C = [];
		E = [];
		F = [];
		var a = 0;
		try {
			var b = document.evaluate("//a[@class=\"sexy_button_new short_red sexy_attack_new\"]//span//span[contains(string(),'Declare War')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (b.snapshotLength >= 1) {
				a = 1
			}
		} catch(err) {}
		x = document.evaluate("//table[@class=\"main_table fight_table\"]/tbody/tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 1; i < x.snapshotLength; i++) {
			y[y.length] = /<a.+\/a>/.exec(x.snapshotItem(i).getElementsByTagName('td')[0].innerHTML);
			A[A.length] = x.snapshotItem(i).getElementsByTagName('td')[0].getElementsByTagName('a')[0].innerHTML;
			B[B.length] = parseInt(/Level ([0-9]+)/.exec(x.snapshotItem(i).getElementsByTagName('td')[0].innerHTML)[1]);
			F[F.length] = /\(iced\)/.test(x.snapshotItem(i).innerHTML);
			if (bl == 4) {
				E[E.length] = x.snapshotItem(i).getElementsByTagName('td')[2].getElementsByTagName('img')[0].alt
			}
		}
		x = document.evaluate("//table[@class=\"main_table fight_table\"]/tbody/tr/td[2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; i < x.snapshotLength; i++) {
			D[D.length] = parseInt(x.snapshotItem(i).innerHTML.replace(/\s/g, ""))
		}
		x = document.evaluate("//table[@class=\"main_table fight_table\"]//td[@class=\"action\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		try {
			for (i = 0; i < x.snapshotLength; i++) {
				C[C.length] = /'([^']+)/.exec(/reg_fight_view_attack\(([^\)]+)\);/.exec(x.snapshotItem(i).innerHTML)[0].replace(/&amp;/g, '&'))[1]
			}
		} catch(err) {
			alert(x.snapshotItem(i).innerHTML)
		}
		i = 0;
		R++;
		Q = true;
		logmsg('Fightlist loaded..', 'status');
		if (R >= 3) {
			logmsg('No matches on the fightlist with set criteria, trying again in 2 seconds', 'status');
			R = 0;
			setTimeout(function () {
				ba = true;
				loadfightpage()
			},
			2000);
			return
		}
		if (x.snapshotLength <= 0) {
			logmsg('Blank Fightlist, reloading.', 'status');
			loadfightpage();
			return
		}
		if (ba == true) {
			start_attack()
		}
	}
	function loaduserlist() {
		bd = [];
		be = [];
		bf = [];
		try {
			if (document.getElementById('UserIds').value.length > 0) {
				bd = document.getElementById('UserIds').value.split('\n');
				be = document.getElementById('UserIds').value.split('\n')
			} else if (document.getElementById('UserIds').value.length == 0) {
				logmsg('Userlist is empty, Stopping..', 'status');
				logmsg('Userlist is empty, Stopping..', 'attack_log');
				stop();
				bi = true;
				return
			}
		} catch(err) {
			alert('Error ! Check entered Ids')
		}
		cb = bm + UnixTS();
		for (m = 0; m < bd.length; m++) {
			bg[bg.length] = '';
			bf[bf.length] = ''
		}
		j = 0;
		attack_user()
	}
	function publish_ice() {
		var a = this.id;
		a = parseInt(/ice_post([0-9]+)/.exec(a)[1]);
		eval(bt[a][1]);
		this.innerHTML = "Posted";
		postFeedAndSendFightBrag();
		return false
	}
	function publish_stash() {
		var a = this.id;
		a = parseInt(/stash_post([0-9]+)/.exec(a)[1]);
		eval(bu[a]);
		this.innerHTML = "Posted";
		popFightLootFeed_0();
		return false
	}
	function publish_coins() {
		var a = this.id;
		a = parseInt(/coin_post([0-9]+)/.exec(a)[1]);
		eval(bv[a]);
		this.innerHTML = "Posted";
		postW2Wback(coin_owner_id[a]);
		return false
	}
	function start_attack() {
		if (u == false) {
			logmsg('Paused...', 'status');
			return
		}
		G = parseInt(document.forms.something.attackcount.value);
		if (actual_count >= G && G != 0) {
			logmsg('Finished Attack run, Stopping..', 'status');
			stop();
			return
		}
		if (document.getElementById('user_stamina').innerHTML <= 0) {
			logmsg('Ran out of stamina, stopping..', 'status');
			stop();
			return
		}
		if (br && (parseInt(P) <= 30) && bz) {
			logmsg('Could level up on next Attack, Stopping..', 'status');
			stop();
			return
		}
		if ((!br) && (parseInt(P) <= 6) && bz) {
			logmsg('Could level up on next Attack, Stopping..', 'status');
			stop();
			return
		}
		var a = parseInt(document.getElementById('ice_count').value);
		if ((bs >= a) && (a != 0)) {
			logmsg('Reached specified iced count, Stopping..', 'status');
			stop();
			return
		}
		if (parseInt(document.getElementById('exp_to_level').value) != 0) {
			if (br) {
				var b = parseInt(document.getElementById('exp_to_level').value) + 30
			} else {
				var b = parseInt(document.getElementById('exp_to_level').value) + 6
			}
			if (parseInt(P) < b) {
				logmsg('Could cross user set level up exp on next attack, Stopping..', 'status');
				stop();
				return
			}
		}
		Trace('In Start attack function');
		switch (true) {
		case document.forms.something.Fightlist.checked:
			pre_check();
			break;
		case document.forms.something.Users.checked:
			if (bi) {
				loaduserlist()
			} else {
				attack_user()
			}
			break
		}
	}
	function attack_user() {
		bx = parseInt(document.getElementById('delay1').value);
		wait2 = parseInt(document.getElementById('delay2').value);
		var f = (wait2 > bx ? wait2: bx);
		var g = (wait2 > bx ? bx: wait2);
		var h = Math.floor((f - (g - 1)) * Math.random()) + g;
		h = (h < 0) ? 0 : h;
		bi = false;
		Trace('In attack user function');
		if (u == false) {
			logmsg('Paused...', 'status');
			return
		}
		G = parseInt(document.forms.something.attackcount.value);
		bM = parseInt(document.getElementById('heal_thres').value);
		if (document.getElementById('user_health').innerHTML < bM) {
			heal();
			return
		}
		if (actual_count >= G && G != 0) {
			logmsg('Finished Attack run, Stopping..', 'status');
			stop();
			return
		}
		if (document.getElementById('user_stamina').innerHTML <= 0) {
			logmsg('Ran out of stamina, stopping..', 'status');
			stop();
			return
		}
		if (br && (parseInt(P) <= 30) && bz) {
			logmsg('Could level up on next Attack, Stopping..', 'status');
			stop();
			return
		}
		if ((!br) && (parseInt(P) <= 6) && bz) {
			logmsg('Could level up on next Attack, Stopping..', 'status');
			stop();
			return
		}
		var i = parseInt(document.getElementById('ice_count').value);
		if ((bs >= i) && (i != 0)) {
			logmsg('Reached specified iced count, Stopping..', 'status');
			stop();
			return
		}
		if (parseInt(document.getElementById('exp_to_level').value) != 0) {
			if (br) {
				var k = parseInt(document.getElementById('exp_to_level').value) + 30
			} else {
				var k = parseInt(document.getElementById('exp_to_level').value) + 6
			}
			if (parseInt(P) < k) {
				logmsg('Could cross user set level up exp on next attack, Stopping..', 'status');
				stop();
				return
			}
		}
		if (bf[j] == '') {
			logmsg('Fetching Temp key for ' + be[j] + '..', 'status');
			var l = {
				'ajax': 1,
				'liteload': 1,
				'sf_xw_user_id': bm,
				'sf_xw_sig': local_xw_sig
			};
			var m = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=' + bl + '&user=' + bd[j] + '&xw_client_id=8';
			$.ajax({
				type: "POST",
				url: m,
				data: l,
				success: function (d) {
					if (/was not found/.test(d)) {
						logmsg(bd[j] + ' is not a valid mafia member, skipping..', 'attack_log');
						j++;
						if (j >= bd.length) {
							if (document.forms.something.UserSkip.checked) {
								logmsg('All users Iced/Killed. Stopping..', 'status');
								document.getElementById('pause').style.display = 'none';
								document.getElementById('begin').style.display = 'inline';
								return
							}
							logmsg('Reached last member, reloading..', 'attack_log');
							j = 0
						}
						setTimeout(attack_user, h * 100);
						return
					}
					bg[j] = /tryBuy.*?tmp=([a-f0-9]+)/.exec(d)[1];
					be[j] = /levels">\((.*?)\)/.exec(d)[1];
					bd[j] = 'p|' + (/user=p\|(\d+)'.+>Profile/.exec(d)[1]);
					bf[j] = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=fight&xw_action=attack&xw_city=' + bl + '&tmp=' + bg[j] + '&cb=' + cb + '&opponent_id=' + bd[j] + '&origin=fight_page&xw_client_id=8';
					if (document.getElementById('user_iced_check').checked) {
						var e = /Sucker Punch.+?<a href="(.+?)".+?>Add to Hitlist/.exec(d)[1];
						logmsg('Running ice check on ' + be[j], 'status');
						$.ajax({
							type: "POST",
							url: e,
							timeout: 30000,
							data: l,
							success: function (a) {
								if (/You can't add/.test(a)) {
									logmsg(be[j] + ' is already Iced/Dead, skipping..', 'status');
									logmsg(be[j] + ' is already Iced/Dead, skipping..', 'attack_log');
									j++;
									if (j >= bd.length) {
										if (document.forms.something.UserSkip.checked) {
											logmsg('All users Iced/Killed. Stopping..', 'status');
											document.getElementById('pause').style.display = 'none';
											document.getElementById('begin').style.display = 'inline';
											return
										}
										logmsg('Reached last member, reloading..', 'attack_log');
										j = 0
									}
									setTimeout(attack_user, h * 100);
									return
								} else if (/The action was not able to be completed/i.test(a)) {
									logmsg('<span class="bad">Zynga Ice Check Problem !</span> skipping to next target', 'status');
									logmsg('<span class="bad">Zynga Ice Check Problem !</span> skipping to next target', 'attack_log');
									j++;
									if (j >= bd.length) {
										if (document.forms.something.UserSkip.checked) {
											logmsg('All users Iced/Killed. Stopping..', 'status');
											document.getElementById('pause').style.display = 'none';
											document.getElementById('begin').style.display = 'inline';
											return
										}
										logmsg('Reached last member, reloading..', 'attack_log');
										j = 0
									}
									setTimeout(attack_user, h * 100);
									return
								} else {
									setTimeout(attack_user, h * 100);
									return
								}
							},
							error: function (a, b, c) {
								pre_check();
								return
							}
						});
						return
					}
					setTimeout(attack_user, h * 100)
				}
			});
			return
		}
		logmsg('Attacking ' + be[j], 'status');
		user_power_attack_enable = document.getElementById('user_power_attack').checked;
		if (user_power_attack) {
			bf[j] = bf[j].replace(/xw_action=attack&/, 'xw_action=power_attack&');
			bf[j] = bf[j].replace(/&origin=fight_page&tab=0/, '');
			try {
				var n = /&tmp=(.+?)&/.exec(bf[j])[1];
				bf[j] = bf[j].replace(n, w)
			} catch(err) {}
		}
		var o = bf[j];
		var l = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': bm,
			'sf_xw_sig': local_xw_sig
		};
		v = $.ajax({
			type: "POST",
			url: o,
			data: l,
			success: function (a) {
				document.getElementById('fights').innerHTML = actual_count;
				process_user_attack(a)
			}
		})
	}
	function attack() {
		Trace('In attack function');
		if (u == false) {
			logmsg('Paused...', 'status');
			return
		}
		G = parseInt(document.forms.something.attackcount.value);
		bM = parseInt(document.getElementById('heal_thres').value);
		if (document.getElementById('user_health').innerHTML < bM) {
			heal();
			return
		}
		if (actual_count >= G && G != 0) {
			logmsg('Finished Attack run, Stopping..', 'status');
			stop();
			return
		}
		if (document.getElementById('user_stamina').innerHTML <= 0) {
			logmsg('Ran out of stamina, stopping..', 'status');
			stop();
			return
		}
		if (parseInt(document.getElementById('exp_to_level').value) != 0) {
			if (br) {
				var d = parseInt(document.getElementById('exp_to_level').value) + 30
			} else {
				var d = parseInt(document.getElementById('exp_to_level').value) + 6
			}
			if (parseInt(P) < d) {
				logmsg('Could cross user set level up exp on next attack, Stopping..', 'status');
				stop();
				return
			}
		}
		if (br && (parseInt(P) <= 30) && bz) {
			logmsg('Could level up on next Attack, Stopping..', 'status');
			stop();
			return
		}
		if ((!br) && (parseInt(P) <= 6) && bz) {
			logmsg('Could level up on next Attack, Stopping..', 'status');
			stop();
			return
		}
		var e = parseInt(document.getElementById('ice_count').value);
		if ((bs >= e) && (e != 0)) {
			logmsg('Reached specified iced count, Stopping..', 'status');
			stop();
			return
		}
		try {
			logmsg('Attacking ' + y[i] + ' Level - ' + B[i], 'status');
			bL = document.getElementById('power_attack').checked;
			if (br) {
				C[i] = C[i].replace(/xw_action=attack&/, 'xw_action=power_attack&');
				C[i] = C[i].replace(/&origin=fight_page&tab=0/, '');
				var f = /&tmp=(.+?)&/.exec(C[i])[1];
				C[i] = C[i].replace(f, w)
			}
			var g = "http://facebook.mafiawars.com/mwfb/" + C[i] + "&xw_client_id=8"
		} catch(err) {
			alert(err)
		}
		var h = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': bm,
			'sf_xw_sig': local_xw_sig
		};
		v = $.ajax({
			type: "POST",
			url: g,
			timeout: 30000,
			data: h,
			success: function (a) {
				R = 0;
				process_attack(a)
			},
			error: function (a, b, c) {
				logmsg('Request timed out, Retrying attack..', 'status');
				setTimeout(attack, 2000)
			}
		})
	}
	function process_attack(b) {
		try {
			var c;
			var d;
			d = '';
			bx = parseInt(document.getElementById('delay1').value);
			wait2 = parseInt(document.getElementById('delay2').value);
			var e = (wait2 > bx ? wait2: bx);
			var f = (wait2 > bx ? bx: wait2);
			var g = Math.floor((e - (f - 1)) * Math.random()) + f;
			g = (g < 0) ? 0 : g;
			Trace('In process attack function');
			if (/This player is currently part of your mafia/.test(b)) {
				logmsg('Player part of your mafia. Fetching next target in ' + g + ' seconds..', 'attack_log');
				next();
				return
			} else if (/Your session has timed out/i.test(b)) {
				logmsg('Session timeout, reloading Fightlist..', 'status');
				logmsg('Session timeout, reloading Fightlist..', 'attack_log');
				ba = true;
				loadfightpage();
				return
			} else if (! ((/You won/i.test(b)) || (/You lost/i.test(b)))) {
				logmsg('Possible session timeout, Reloading..', 'status');
				ba = true;
				loadfightpage();
				return
			}
			actual_count++;
			document.getElementById('fights').innerHTML = actual_count;
			Z = false;
			bo = false;
			try {
				document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(b)[1];
				document.getElementById('user_stamina').innerHTML = /user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(b)[1];
				P = parseInt(/user_fields\['exp_for_next_level'\] = parseInt\("([0-9]+)/.exec(b)[1]) - parseInt(/user_fields\['user_experience'\] = parseInt\("([0-9]+)/.exec(b)[1])
			} catch(err) {
				alert('Area 1\n\n' + err)
			}
			try {
				document.getElementById('exp_to_next_level').innerHTML = P
			} catch(err) {
				document.getElementById('user_xp_to_next_level').innerHTML = P
			}
			try {
				document.getElementById('user_experience').innerHTML = /user_fields\['user_experience'\] = parseInt\("([0-9]+)/.exec(b)[1]
			} catch(err) {}
			O = P / parseInt(document.getElementById('user_stamina').innerHTML);
			document.getElementById('exp_reqd').innerHTML = P;
			document.getElementById('exp_ratio_reqd').innerHTML = O.toFixed(2);
			try {
				bp = parseInt((/title="Mafia Attack Strength".+?> (.+?)<\/div>/.exec(b)[1]).replace(/,/g, ''));
				if (initial_mafia_attack == 0) {
					initial_mafia_attack = bp
				}
				bq = parseInt((/title="Mafia Defense Strength".+?> (.+?)<\/div>/.exec(b)[1]).replace(/,/g, ''));
				if (initial_mafia_defense == 0) {
					initial_mafia_defense = bq
				}
			} catch(err) {
				$('#inner_page').html(b);
				alert('PROBLEM !');
				return
			}
			document.getElementById('mafia_attack').innerHTML = format_cash(bp);
			document.getElementById('mafia_defense').innerHTML = format_cash(bq);
			document.getElementById('attack_diff').innerHTML = (bp >= initial_mafia_attack) ? '<span class="good">+' + (bp - initial_mafia_attack) + '</span>': '<span class="bad">-' + (initial_mafia_attack - bp) + '</span>';
			document.getElementById('defense_diff').innerHTML = (bq >= initial_mafia_defense) ? '<span class="good">+' + (bq - initial_mafia_defense) + '</span>': '<span class="bad">-' + (initial_mafia_defense - bq) + '</span>';
			try {
				if (bw == 0) {
					initial_vic_pts = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(b)[1]
				}
				bw = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(b)[1]
			} catch(err) {}
			document.getElementById('Victorycoins').innerHTML = bw + '[<span class="good">' + (bw - initial_vic_pts) + '</span>]';
			try {
				c = '';
				loot_log = [];
				if (/(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.|)/.test(b)) {
					temp_loot = b.match(/(<div class="fightres_bonus_message".+?<img src="(.+?)".+?|)(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.)/g);
					for (z = 0; z < temp_loot.length; z++) {
						c = /(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.)/.exec(temp_loot[z]);
						U = /<div class="fightres_bonus_message".+?<img src="(.+?)"/.exec(temp_loot[z]);
						U = U ? U[1] : "";
						c = c[3].replace(/!/g, '');
						c = c.replace(/<br\/>/g, '');
						Add_to_loot(c, 1, U);
						c = c.replace(/\(.+?\)/g, '');
						if (U != "") {
							loot_log[loot_log.length] = '<img src="' + U + '" style="width: 20px; height: 20px;"></img> ' + c
						} else {
							loot_log[loot_log.length] = ' ' + c
						}
					}
				}
			} catch(err) {
				alert('Error ! ' + err);
				alert('temp_loot length = ' + temp_loot.length);
				alert('Error occured, temp_loot = ' + temp_loot);
				return
			}
			try {
				if (/secret stash/.test(b)) {
					var h = /function continuation_popFightLootFeed(.+?)<\/script>/.exec(b)[0].replace(/<\/script>/, '');
					h = h.replace(/"/g, '\"');
					bu[bu.length] = h;
					var j = /<a(.+?)<\/a> found the location of the secret stash/.exec(b)[1];
					document.getElementById('stash_posts_log').innerHTML += '<a' + j + '<\/a> - <a href="#" id="stash_post' + (bu.length - 1) + '" onclick="return false;">Stash #' + bu.length + '</a><br>';
					for (l = 0; l < bu.length; l++) {
						document.getElementById('stash_post' + l).onclick = publish_stash
					}
				}
			} catch(err) {
				alert(err)
			}
			try {
				if (/Share Coins/.test(b)) {
					var k = /function continuation_postW2Wback(.+?)<\/script>/.exec(b)[0].replace(/<\/script>/, '');
					k = k.replace(/"/g, '\"');
					bv[bv.length] = k;
					var m = /<a(.+?)<\/a><\/span> <span>earned you \d extra Victory Coins/.exec(b)[1];
					coin_owner_id[coin_owner_id.length] = /postW2Wback\('(.+?)'\)/.exec(b)[1];
					document.getElementById('coin_posts_log').innerHTML += '<a' + m + '<\/a> - <a href="#" id="coin_post' + (bv.length - 1) + '" onclick="return false;">VCoin Post #' + bv.length + '</a><br>';
					for (l = 0; l < bv.length; l++) {
						document.getElementById('coin_post' + l).onclick = publish_coins
					}
				}
			} catch(err) {}
			try {
				if (/found (\d) (.+?)See them/.test(b)) {
					c = '';
					c = /found (\d) (.+?)See them/.exec(b);
					c[2] = c[2].replace(/!/, '');
					c[2] = c[2].replace(/<br\/>/g, '');
					Add_to_loot(c[2], parseInt(c[1]), '');
					loot_log[loot_log.length] = c[1] + ' ' + c[2]
				}
			} catch(err) {
				$('#inner_page').html(b);
				alert('Error ! ' + err);
				return
			}
			try {
				document.getElementById('loot_percent').innerHTML = ((V / (S + loss)) * 100).toFixed(1)
			} catch(err) {}
			try {
				if (/killed your opponent/.test(b)) {
					Z = true;
					Y++;
					killed_count = /You killed your opponent, bringing your total body count to (\d+?)!/.exec(b)[1];
					document.getElementById('kills_log').innerHTML = killed_count + '[<span class="good">' + Y + '</span>]'
				}
			} catch(err) {
				alert('Area 2\n\n' + err)
			}
			try {
				if (/iced_pop_text/.test(b)) {
					bo = true;
					ices++;
					bs = /<div class=\\"iced_pop_body_count_number\\">(.+?)<\/div>/.exec(b)[1].replace(/,/g, '');
					document.getElementById('iced_log').innerHTML = bs + '[<span class="good">' + ices + '</span>]';
					var n = /function continuation_postFeedAndSendFightBrag(.+?)<\/script>/.exec(b)[0].replace(/<\/script>/, '');
					n = n.replace(/"/g, '\"');
					if (bt.length <= 0) {
						bt[bt.length] = new Array(bs, n)
					} else {
						bt[bt.length] = [];
						bt[bt.length - 1][1] = n;
						bt[bt.length - 1][0] = bs
					}
					document.getElementById('ice_posts_log').innerHTML += bt[bt.length - 1][0] + ' - ' + y[i] + ' - <a href="#" id="ice_post' + (bt.length - 1) + '"return false;">Post</a><br>';
					for (l = 0; l < bt.length; l++) {
						document.getElementById('ice_post' + l).onclick = publish_ice
					}
				}
			} catch(err) {
				alert('Area 2\n\n' + err)
			}
			var o = parseInt(/&xw_city=(\d+)&tmp/.exec(b)[1]);
			if (o != bl) {
				logmsg('Invalid city change detected, Travelling to fight city...', 'status');
				logmsg('Invalid city change detected, Travelling to fight city...', 'attack_log');
				var p = {
					'ajax': 1,
					'liteload': 1,
					'sf_xw_user_id': bm,
					'sf_xw_sig': local_xw_sig
				};
				$.ajax({
					type: "POST",
					data: p,
					url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=" + o + "&cb=" + cb + "&destination=" + bl + "&from=fight&nextParams=&xw_client_id=8",
					success: function (a) {
						ba = true;
						loadfightpage();
						return
					}
				});
				return
			}
			try {
				if (bl == 4) {
					var q = b.match(/zy_progress_bar_faction_text">(.+) \/ 1500/g);
					document.getElementById('Yakuza_points').innerHTML = Yakuza = parseInt(/zy_progress_bar_faction_text">(.+) \/ 1500/.exec(q[0])[1]);
					document.getElementById('Triad_points').innerHTML = bn = parseInt(/zy_progress_bar_faction_text">(.+) \/ 1500/.exec(q[1])[1])
				}
			} catch(err) {}
			switch (parseInt(bl)) {
			case 1:
				document.getElementById('user_cash_nyc').innerHTML = /user_fields\['user_cash_nyc'\] = "([^"]+)/.exec(b)[1];
				cash_in_hand = document.getElementById('user_cash_nyc').innerHTML.replace(/,/g, '').replace(/\$/g, '');
				if ((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && (document.forms.something.bank_enable.checked)) {
					logmsg('Banking <span class="good">' + document.getElementById('user_cash_nyc').innerHTML + '</span>', 'attack_log');
					bank(cash_in_hand, 'nyc')
				}
				break;
			case 2:
				document.getElementById('user_cash_cuba').innerHTML = /user_fields\['user_cash_cuba'\] = "([^"]+)/.exec(b)[1];
				cash_in_hand = document.getElementById('user_cash_cuba').innerHTML.replace(/,/g, '').replace(/C\$/g, '');
				if ((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && (document.forms.something.bank_enable.checked)) {
					logmsg('Banking <span class="good">' + document.getElementById('user_cash_cuba').innerHTML + '</span>', 'attack_log');
					bank(cash_in_hand, 'cuba')
				}
				break;
			case 3:
				document.getElementById('user_cash_moscow').innerHTML = /user_fields\['user_cash_moscow'\] = "([^"]+)/.exec(b)[1];
				cash_in_hand = document.getElementById('user_cash_moscow').innerHTML.replace(/,/g, '').replace(/R\$/g, '');
				if ((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && (document.forms.something.bank_enable.checked)) {
					logmsg('Banking <span class="good">' + document.getElementById('user_cash_moscow').innerHTML + '</span>', 'attack_log');
					bank(cash_in_hand, 'moscow')
				}
				break;
			case 4:
				document.getElementById('user_cash_bangkok').innerHTML = /user_fields\['user_cash_bangkok'\] = "([^"]+)/.exec(b)[1];
				cash_in_hand = document.getElementById('user_cash_bangkok').innerHTML.replace(/,/g, '').replace(/B\$/g, '');
				if ((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && (document.forms.something.bank_enable.checked)) {
					logmsg('Banking <span class="good">' + document.getElementById('user_cash_bangkok').innerHTML + '</span>', 'attack_log');
					bank(cash_in_hand, 'bangkok')
				}
				break;
			case 5:
				document.getElementById('user_cash_vegas').innerHTML = /user_fields\['user_cash_vegas'\] = "([^"]+)/.exec(b)[1];
				cash_in_hand = document.getElementById('user_cash_vegas').innerHTML.replace(/,/g, '').replace(/V\$/g, '');
				if ((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && (document.forms.something.bank_enable.checked)) {
					logmsg('Banking <span class="good">' + document.getElementById('user_cash_vegas').innerHTML + '</span>', 'attack_log');
					bank(cash_in_hand, 'vegas')
				}
				break;
			case 6:
				document.getElementById('user_cash_italy').innerHTML = /user_fields\['user_cash_italy'\] = "([^"]+)/.exec(b)[1];
				cash_in_hand = document.getElementById('user_cash_italy').innerHTML.replace(/,/g, '').replace(/L\$/g, '');
				if ((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && (document.forms.something.bank_enable.checked)) {
					logmsg('Banking <span class="good">' + document.getElementById('user_cash_italy').innerHTML + '</span>', 'attack_log');
					bank(cash_in_hand, 'italy')
				}
				break
			}
			if (/You won/i.test(b)) {
				if (/<span class="good">Win: (\d)<\/span>/.test(b)) {
					S += parseInt(/<span class="good">Win: (\d)<\/span>/.exec(b)[1])
				} else {
					S++
				}
				if (/<span class="bad">Loss: (\d)<\/span>/.test(b)) {
					loss += parseInt(/<span class="bad">Loss: (\d)<\/span>/.exec(b)[1])
				}
				if (/Attack Again/.test(b)) {
					if (/Attack again 5 times/.test(b)) {
						if (bL) {
							br = true
						} else {
							br = false
						}
						w = /&xw_action=power_attack&xw_city=.+?&tmp=(.+?)&/.exec(b)[1]
					}
					d = '<img src="http://codeoutpost.com/Scripts/attack.png" alt="alive"></img> '
				}
				document.getElementById('wins').innerHTML = S;
				d += '<span class="good">Attacked ' + y[i] + ' and won !</span> ';
				J += parseInt(/\+(\d*) Experience/.exec(b)[1]);
				d += '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_experience_16x16_01.gif" alt="Exp"> <span class="good">' + parseInt(/\+(\d*) Experience/.exec(b)[1]) + '</span>';
				N = J / (S + loss);
				document.getElementById('exp_ratio').innerHTML = N.toFixed(2);
				if (/Fan Bonus/.test(b)) {
					if (/rallied/.test(b)) {
						J += 2 * parseInt(/(\d*) Fan Bonus/.exec(b)[1]);
						d += ' Fan Bonus - <span class="good">' + (2 * parseInt(/(\d*) Fan Bonus/.exec(b)[1])) + '</span>'
					} else {
						J += parseInt(/(\d*) Fan Bonus/.exec(b)[1]);
						d += ' Fan Bonus - <span class="good">' + parseInt(/(\d*) Fan Bonus/.exec(b)[1]) + '</span>'
					}
				}
				bh = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_italy_cash|sexy_new_york_cash) good"\>(\n|\f|\r)([^<]+)/.exec(b)[3];
				d += ' <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif" alt="cash"></img> <span class="good">' + bh + '</span>';
				if (bo == true) {
					d += ' <img src="http://codeoutpost.com/Scripts/Ice.png" alt="Iced"></img>'
				}
				if (Z == true) {
					d += ' <img src="http://codeoutpost.com/Scripts/kill.png" alt="Kill"></img>'
				}
				try {
					d += ' <img src="http://mwfb.static.zynga.com/mwfb/graphics/victory_icon.gif"></img>+<span class="good">' + (/\+(\d+).*Victory Coins/.exec(b)[1]) + '</span> '
				} catch(err) {}
				if (loot_log.length >= 1) {
					d += ' ' + loot_log
				}
				logmsg(d, 'attack_log');
				document.getElementById('exp_gained').innerHTML = J;
				switch (true) {
				case(/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.test(b)):
					process_cash(2, (/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
					H = 2;
					break;
				case (/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.test(b)):
					process_cash(3, (/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
					H = 3;
					break;
				case (/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.test(b)):
					process_cash(4, (/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
					H = 4;
					break;
				case (/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.test(b)):
					process_cash(5, (/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
					H = 5;
					break;
				case (/sexy_italy_cash good"\>[^\$]+\$([^<]+)/.test(b)):
					process_cash(6, (/sexy_italy_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
					H = 6;
					break;
				case (/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.test(b)):
					process_cash(1, (/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
					H = 1;
					break
				}
				if (parseInt(/(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_italy_cash|sexy_new_york_cash) good"\>[^\$]+\$([^<]+)/.exec(b)[2].replace(/,/g, '')) < parseInt(cash_limit)) {
					logmsg('Below cash limit, Fetching next target in ' + g + ' seconds..', 'attack_log');
					next();
					return
				}
				if ((H != bl) && document.forms.something.cash_city.checked) {
					logmsg('Cash not from same city as fight city. Fetching next target in ' + g + ' seconds..', 'attack_log');
					next();
					return
				}
				bb++;
				if ((bb >= parseInt(document.forms.something.attack_limit.value)) && document.forms.something.attack_limit_check.checked) {
					logmsg('Done with ' + y[i] + ' Fetching next target in ' + g + ' seconds..', 'attack_log');
					next();
					return
				}
				if (/Attack Again/.test(b)) {
					setTimeout(attack, g * 100)
				} else {
					logmsg('Done with ' + y[i] + ' Fetching next target in ' + g + ' seconds..', 'attack_log');
					next()
				}
				return
			} else {
				if (/You lost/i.test(b)) {
					d = '';
					loss++;
					document.getElementById('losses').innerHTML = loss;
					N = J / (S + loss);
					document.getElementById('exp_ratio').innerHTML = N.toFixed(2);
					bh = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_italy_cash|sexy_new_york_cash) (bad|good)"\>(\n|\f|\r)([^<]+)/.exec(b)[4];
					try {
						switch (true) {
						case(/sexy_cuba_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(b)):
							process_cash(2, -(/sexy_cuba_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(b)[2].replace(/,/g, '')));
							break;
						case (/sexy_moscow_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(b)):
							process_cash(3, -(/sexy_moscow_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(b)[2].replace(/,/g, '')));
							break;
						case (/sexy_bangkok_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(b)):
							process_cash(4, -(/sexy_bangkok_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(b)[2].replace(/,/g, '')));
							break;
						case (/sexy_vegas_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(b)):
							process_cash(5, -(/sexy_vegas_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(b)[2].replace(/,/g, '')));
							break;
						case (/sexy_italy_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(b)):
							process_cash(6, -(/sexy_italy_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(b)[2].replace(/,/g, '')));
							break;
						case (/sexy_new_york_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(b)):
							process_cash(1, -(/sexy_new_york_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(b)[2].replace(/,/g, '')));
							break
						}
					} catch(err) {}
					if (/Attack Again/.test(b)) {
						d = '<img src="http://codeoutpost.com/Scripts/attack.png" alt="alive"></img> '
					}
					d += '<span class="bad">You Lost !</span> Cash Lost <span class="bad">' + bh + '</span>';
					if (bo == true) {
						d += ' <img src="http://codeoutpost.com/Scripts/Ice.png" alt="Iced"></img>'
					}
					if (Z == true) {
						d += ' <img src="http://codeoutpost.com/Scripts/kill.png" alt="Kill"></img>'
					}
					logmsg(d, 'attack_log')
				}
				X[X.length] = A[i];
				logmsg(y[i] + ' too strong, Fetching next target in ' + g + ' seconds..', 'attack_log');
				var o = parseInt(/&xw_city=(\d+)&/.exec(b)[1]);
				if (o != bl) {
					logmsg('Invalid city change detected, Travelling to fight city...', 'status');
					logmsg('Invalid city change detected, Travelling to fight city...', 'attack_log');
					var p = {
						'ajax': 1,
						'liteload': 1,
						'sf_xw_user_id': bm,
						'sf_xw_sig': local_xw_sig
					};
					$.ajax({
						type: "POST",
						data: p,
						url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=" + o + "&cb=" + cb + "&destination=" + bl + "&from=fight&nextParams=&xw_client_id=8",
						success: function (a) {
							ba = true;
							loadfightpage();
							return
						}
					});
					return
				}
				next()
			}
		} catch(err) {
			alert(err)
		}
	}
	function process_user_attack(a) {
		var b;
		var c;
		c = '';
		bx = parseInt(document.getElementById('delay1').value);
		wait2 = parseInt(document.getElementById('delay2').value);
		var d = (wait2 > bx ? wait2: bx);
		var e = (wait2 > bx ? bx: wait2);
		var f = Math.floor((d - (e - 1)) * Math.random()) + e;
		f = (f < 0) ? 0 : f;
		Trace('In process user attack function');
		if (/session has timed out/.test(a)) {
			logmsg('Session timeout, fetching temp key..', 'attack_log');
			bf[j] = '';
			setTimeout(attack_user, f * 100);
			return
		}
		if (/This player is currently part of your mafia/.test(a)) {
			logmsg('Player part of your mafia. Fetching next target in ' + f + ' seconds..', 'attack_log');
			j++;
			if (j >= bd.length) {
				if (document.forms.something.UserSkip.checked) {
					logmsg('All users Iced/Killed. Stopping..', 'status');
					document.getElementById('pause').style.display = 'none';
					document.getElementById('begin').style.display = 'inline';
					return
				}
				logmsg('Reached last member, reloading..', 'attack_log');
				j = 0
			}
			setTimeout(attack_user, f * 100);
			return
		}
		actual_count++;
		Z = false;
		bo = false;
		document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(a)[1];
		document.getElementById('user_stamina').innerHTML = /user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(a)[1];
		P = parseInt(/user_fields\['exp_for_next_level'\] = parseInt\("([0-9]+)/.exec(a)[1]) - parseInt(/user_fields\['user_experience'\] = parseInt\("([0-9]+)/.exec(a)[1]);
		try {
			document.getElementById('exp_to_next_level').innerHTML = P
		} catch(err) {
			document.getElementById('user_xp_to_next_level').innerHTML = P
		}
		try {
			document.getElementById('user_experience').innerHTML = /user_fields\['user_experience'\] = parseInt\("([0-9]+)/.exec(a)[1]
		} catch(err) {}
		O = P / parseInt(document.getElementById('user_stamina').innerHTML);
		document.getElementById('exp_reqd').innerHTML = P;
		document.getElementById('exp_ratio_reqd').innerHTML = O.toFixed(2);
		bp = parseInt((/title="Mafia Attack Strength".+?> (.+?)<\/div>/.exec(a)[1]).replace(/,/g, ''));
		if (initial_mafia_attack == 0) {
			initial_mafia_attack = bp
		}
		bq = parseInt((/title="Mafia Defense Strength".+?> (.+?)<\/div>/.exec(a)[1]).replace(/,/g, ''));
		if (initial_mafia_defense == 0) {
			initial_mafia_defense = bq
		}
		document.getElementById('mafia_attack').innerHTML = format_cash(bp);
		document.getElementById('mafia_defense').innerHTML = format_cash(bq);
		document.getElementById('attack_diff').innerHTML = (bp >= initial_mafia_attack) ? '<span class="good">+' + (bp - initial_mafia_attack) + '</span>': '<span class="bad">-' + (initial_mafia_attack - bp) + '</span>';
		document.getElementById('defense_diff').innerHTML = (bq >= initial_mafia_defense) ? '<span class="good">+' + (bq - initial_mafia_defense) + '</span>': '<span class="bad">-' + (initial_mafia_defense - bq) + '</span>';
		if (bw == 0) {
			initial_vic_pts = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(a)[1]
		}
		bw = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(a)[1];
		document.getElementById('Victorycoins').innerHTML = bw + '[<span class="good">' + (bw - initial_vic_pts) + '</span>]';
		try {
			b = '';
			loot_log = [];
			if (/(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.|)/.test(a)) {
				temp_loot = a.match(/(<div class="fightres_bonus_message".+?<img src="(.+?)".+?|)(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.)/g);
				for (z = 0; z < temp_loot.length; z++) {
					b = /(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.)/.exec(temp_loot[z]);
					U = /<div class="fightres_bonus_message".+?<img src="(.+?)"/.exec(temp_loot[z]);
					U = U ? U[1] : "";
					b = b[3].replace(/!/g, '');
					b = b.replace(/<br\/>/g, '');
					Add_to_loot(b, 1, U);
					b = b.replace(/\(.+?\)/g, '');
					if (U != "") {
						loot_log[loot_log.length] = '<img src="' + U + '" style="width: 20px; height: 20px;"></img> ' + b
					} else {
						loot_log[loot_log.length] = ' ' + b
					}
				}
			}
		} catch(err) {
			alert('Error ! ' + err);
			alert('temp_loot length = ' + temp_loot.length);
			alert('Error occured, temp_loot = ' + temp_loot);
			return
		}
		try {
			if (/secret stash/.test(a)) {
				var g = /function continuation_popFightLootFeed(.+?)<\/script>/.exec(a)[0].replace(/<\/script>/, '');
				var h = /<a(.+?)<\/a> found the location of the secret stash/.exec(a)[1];
				g = g.replace(/"/g, '\"');
				bu[bu.length] = g;
				document.getElementById('stash_posts_log').innerHTML += '<a' + h + '<\/a> - <a href="#" id="stash_post' + (bu.length - 1) + '" onclick="return false;">Stash #' + bu.length + '</a><br>';
				for (l = 0; l < bu.length; l++) {
					document.getElementById('stash_post' + l).onclick = publish_stash
				}
			}
		} catch(err) {}
		try {
			if (/found (\d) (.+?)See them/.test(a)) {
				b = '';
				b = /found (\d) (.+?)See them/.exec(a);
				b[2] = b[2].replace(/!/, '');
				b[2] = b[2].replace(/<br\/>/g, '');
				Add_to_loot(b[2], parseInt(b[1]), '');
				b = b[1] + ' ' + b[2]
			}
		} catch(err) {
			alert('Error ! ' + err);
			return
		}
		try {
			document.getElementById('loot_percent').innerHTML = ((V / (S + loss)) * 100).toFixed(1)
		} catch(err) {}
		if (/killed your opponent/.test(a)) {
			Z = true;
			Y++;
			killed_count = /You killed your opponent, bringing your total body count to (\d+?)!/.exec(a)[1];
			document.getElementById('kills_log').innerHTML = killed_count + '[<span class="good">' + Y + '</span>]'
		}
		if (/iced_pop_text/.test(a)) {
			bo = true;
			ices++;
			bs = /<div class=\\"iced_pop_body_count_number\\">(.+?)<\/div>/.exec(a)[1].replace(/,/g, '');
			document.getElementById('iced_log').innerHTML = bs + '[<span class="good">' + ices + '</span>]';
			var i = /function continuation_postFeedAndSendFightBrag(.+?)<\/script>/.exec(a)[0].replace(/<\/script>/, '');
			i = i.replace(/"/g, '\"');
			if (bt.length <= 0) {
				bt[bt.length] = new Array(bs, i)
			} else {
				bt[bt.length] = [];
				bt[bt.length - 1][1] = i;
				bt[bt.length - 1][0] = bs
			}
		}
		if (bl == 4) {
			var k = a.match(/zy_progress_bar_faction_text">(.+) \/ 1500/g);
			document.getElementById('Yakuza_points').innerHTML = /zy_progress_bar_faction_text">(.+) \/ 1500/.exec(k[0])[1];
			document.getElementById('Triad_points').innerHTML = /zy_progress_bar_faction_text">(.+) \/ 1500/.exec(k[1])[1]
		}
		switch (parseInt(bl)) {
		case 1:
			document.getElementById('user_cash_nyc').innerHTML = /user_fields\['user_cash_nyc'\] = "([^"]+)/.exec(a)[1];
			cash_in_hand = document.getElementById('user_cash_nyc').innerHTML.replace(/,/g, '').replace(/\$/g, '');
			if ((parseInt(cash_in_hand) > parseInt(document.getElementById('user_bank_limit').value)) && (document.getElementById('user_bank_enable').checked)) {
				logmsg('Banking <span class="good">' + document.getElementById('user_cash_nyc').innerHTML + '</span>', 'attack_log');
				bank(cash_in_hand)
			}
			break;
		case 2:
			document.getElementById('user_cash_cuba').innerHTML = /user_fields\['user_cash_cuba'\] = "([^"]+)/.exec(a)[1];
			cash_in_hand = document.getElementById('user_cash_cuba').innerHTML.replace(/,/g, '').replace(/C\$/g, '');
			if ((parseInt(cash_in_hand) > parseInt(document.getElementById('user_bank_limit').value)) && (document.getElementById('user_bank_enable').checked)) {
				logmsg('Banking <span class="good">' + document.getElementById('user_cash_cuba').innerHTML + '</span>', 'attack_log');
				bank(cash_in_hand)
			}
			break;
		case 3:
			document.getElementById('user_cash_moscow').innerHTML = /user_fields\['user_cash_moscow'\] = "([^"]+)/.exec(a)[1];
			cash_in_hand = document.getElementById('user_cash_moscow').innerHTML.replace(/,/g, '').replace(/R\$/g, '');
			if ((parseInt(cash_in_hand) > parseInt(document.getElementById('user_bank_limit').value)) && (document.getElementById('user_bank_enable').checked)) {
				logmsg('Banking <span class="good">' + document.getElementById('user_cash_moscow').innerHTML + '</span>', 'attack_log');
				bank(cash_in_hand)
			}
			break;
		case 4:
			document.getElementById('user_cash_bangkok').innerHTML = /user_fields\['user_cash_bangkok'\] = "([^"]+)/.exec(a)[1];
			cash_in_hand = document.getElementById('user_cash_bangkok').innerHTML.replace(/,/g, '').replace(/B\$/g, '');
			if ((parseInt(cash_in_hand) > parseInt(document.getElementById('user_bank_limit').value)) && (document.getElementById('user_bank_enable').checked)) {
				logmsg('Banking <span class="good">' + document.getElementById('user_cash_bangkok').innerHTML + '</span>', 'attack_log');
				bank(cash_in_hand)
			}
			break;
		case 5:
			document.getElementById('user_cash_vegas').innerHTML = /user_fields\['user_cash_vegas'\] = "([^"]+)/.exec(a)[1];
			cash_in_hand = document.getElementById('user_cash_vegas').innerHTML.replace(/,/g, '').replace(/V\$/g, '');
			if ((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && (document.getElementById('user_bank_enable').checked)) {
				logmsg('Banking <span class="good">' + document.getElementById('user_cash_vegas').innerHTML + '</span>', 'attack_log');
				bank(cash_in_hand, 'vegas')
			}
			break;
		case 6:
			document.getElementById('user_cash_italy').innerHTML = /user_fields\['user_cash_italy'\] = "([^"]+)/.exec(a)[1];
			cash_in_hand = document.getElementById('user_cash_italy').innerHTML.replace(/,/g, '').replace(/L\$/g, '');
			if ((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && (document.forms.something.bank_enable.checked)) {
				logmsg('Banking <span class="good">' + document.getElementById('user_cash_italy').innerHTML + '</span>', 'attack_log');
				bank(cash_in_hand, 'italy')
			}
			break
		}
		if (/You won/i.test(a)) {
			if (/<span class="good">Win: (\d)<\/span>/.test(a)) {
				S += parseInt(/<span class="good">Win: (\d)<\/span>/.exec(a)[1])
			} else {
				S++
			}
			if (/<span class="bad">Loss: (\d)<\/span>/.test(a)) {
				loss += parseInt(/<span class="bad">Loss: (\d)<\/span>/.exec(a)[1])
			}
			if (/Attack Again/.test(a)) {
				c = '<img src="http://codeoutpost.com/Scripts/attack.png" alt="alive"></img> '
			}
			document.getElementById('wins').innerHTML = S;
			c += '<span class="good">You won !</span> ';
			J += parseInt(/\+(\d*) Experience/.exec(a)[1]);
			c += '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_experience_16x16_01.gif" alt="Exp"> <span class="good">' + parseInt(/\+(\d*) Experience/.exec(a)[1]) + '</span>';
			if (/Fan Bonus/.test(a)) {
				if (/rallied/.test(a)) {
					J += 2 * parseInt(/(\d*) Fan Bonus/.exec(a)[1]);
					c += ' Fan Bonus - <span class="good">' + (2 * parseInt(/(\d*) Fan Bonus/.exec(a)[1])) + '</span>'
				} else {
					J += parseInt(/(\d*) Fan Bonus/.exec(a)[1]);
					c += ' Fan Bonus - <span class="good">' + parseInt(/(\d*) Fan Bonus/.exec(a)[1]) + '</span>'
				}
			}
			bh = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_italy_cash|sexy_new_york_cash) good"\>(\n|\f|\r)([^<]+)/.exec(a)[3];
			c += ' <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif" alt="cash"></img> <span class="good">' + bh + '</span>';
			if (bo == true) {
				c += ' <img src="http://codeoutpost.com/Scripts/Ice.png" alt="Iced"></img>'
			}
			if (Z == true) {
				c += ' <img src="http://codeoutpost.com/Scripts/kill.png" alt="Kill"></img>'
			}
			try {
				c += ' <img src="http://mwfb.static.zynga.com/mwfb/graphics/victory_icon.gif"></img>+<span class="good">' + (/\+(\d+).*Victory Coins/.exec(a)[1]) + '</span> '
			} catch(err) {}
			if (b != '') {
				b = b.replace(/\(.+?\)/g, '');
				c += ' <img src="' + U + '" style="width: 20px; height: 20px;"></img>' + b
			}
			logmsg(c, 'attack_log');
			document.getElementById('exp_gained').innerHTML = J;
			N = J / (S + loss);
			document.getElementById('exp_ratio').innerHTML = N.toFixed(2);
			switch (true) {
			case(/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.test(a)):
				process_cash(2, (/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
				H = 2;
				break;
			case (/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.test(a)):
				process_cash(3, (/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
				H = 3;
				break;
			case (/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.test(a)):
				process_cash(4, (/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
				H = 4;
				break;
			case (/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.test(a)):
				process_cash(5, (/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
				H = 5;
				break;
			case (/sexy_italy_cash good"\>[^\$]+\$([^<]+)/.test(a)):
				process_cash(6, (/sexy_italy_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
				H = 6;
				break;
			case (/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.test(a)):
				process_cash(1, (/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
				H = 1;
				break
			}
			if (/Attack Again/.test(a)) {
				if (/Attack again 5 times/.test(a)) {
					if (user_power_attack_enable) {
						user_power_attack = true
					} else {
						user_power_attack = false
					}
					w = /&xw_action=power_attack&xw_city=.+?&tmp=(.+?)&/.exec(a)[1]
				}
				setTimeout(attack_user, f * 100)
			} else {
				if (bd.length > 1) {
					logmsg('Done with ' + be[j] + ' Fetching next target in ' + f + ' seconds..', 'attack_log')
				}
				j++;
				if (j >= bd.length) {
					if (document.forms.something.UserSkip.checked) {
						logmsg('All users Iced/Killed. Stopping..', 'status');
						stop();
						bi = true;
						return
					}
					if (bd.length > 1) {
						logmsg('Reached last member, reloading..', 'attack_log')
					}
					j = 0
				}
				setTimeout(attack_user, f * 100)
			}
			return
		} else {
			if (/You lost/i.test(a)) {
				c = '';
				loss++;
				document.getElementById('losses').innerHTML = loss;
				bh = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_italy_cash|sexy_new_york_cash) (bad|good)"\>(\n|\f|\r)([^<]+)/.exec(a)[4];
				switch (true) {
				case(/sexy_cuba_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(a)):
					process_cash(2, -(/sexy_cuba_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(a)[2].replace(/,/g, '')));
					break;
				case (/sexy_moscow_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(a)):
					process_cash(3, -(/sexy_moscow_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(a)[2].replace(/,/g, '')));
					break;
				case (/sexy_bangkok_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(a)):
					process_cash(4, -(/sexy_bangkok_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(a)[2].replace(/,/g, '')));
					break;
				case (/sexy_vegas_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(a)):
					process_cash(5, -(/sexy_vegas_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(a)[2].replace(/,/g, '')));
					break;
				case (/sexy_italy_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(a)):
					process_cash(6, -(/sexy_italy_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(a)[2].replace(/,/g, '')));
					break;
				case (/sexy_new_york_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(a)):
					process_cash(1, -(/sexy_new_york_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(a)[2].replace(/,/g, '')));
					break
				}
				if (/Attack Again/.test(a)) {
					c = '<img src="http://codeoutpost.com/Scripts/attack.png" alt="alive"></img> '
				}
				c += '<span class="bad">You Lost !</span> Cash Lost <span class="bad">' + bh + '</span>';
				if (bo == true) {
					c += ' Iced !'
				}
				if (Z == true) {
					c += ' Kill !'
				}
				logmsg(c, 'attack_log')
			}
			if (bd.length > 1) {
				logmsg(be[j] + ' too strong, Fetching next target in ' + f + ' seconds..', 'attack_log')
			}
			j++;
			if (j >= bd.length) {
				if (document.forms.something.UserSkip.checked) {
					logmsg('All users Iced/Killed. Stopping..', 'status');
					stop();
					bi = true;
					return
				}
				if (bd.length > 1) {
					logmsg('Reached last member, reloading..', 'status')
				}
				ba = true;
				j = 0;
				setTimeout(attack_user, f * 100);
				return
			} else {
				setTimeout(attack_user, f * 100);
				return
			}
		}
	}
	function stop() {
		if ((document.getElementById('finish_heal_enable').checked) && (by != 0)) {
			if ($('#user_health').html() != $('#user_max_health').html()) {
				heal();
				return
			}
		}
		if (document.getElementById('restart_enable').checked) {
			var a = parseInt(document.getElementById('restart_min').value);
			ba = true;
			logmsg('Attack run complete, Restarting in ' + a + ' minute(s)..', 'status');
			setTimeout(loadfightpage, a * 60 * 1000);
			return
		}
		document.getElementById('pause').style.display = 'none';
		document.getElementById('begin').style.display = 'inline'
	}
	function next() {
		bb = 0;
		i++;
		Trace('In NExt()');
		bx = parseInt(document.getElementById('delay1').value);
		wait2 = parseInt(document.getElementById('delay2').value);
		var a = (wait2 > bx ? wait2: bx);
		var b = (wait2 > bx ? bx: wait2);
		var c = Math.floor((a - (b - 1)) * Math.random()) + b;
		br = false;
		if (i >= C.length) {
			logmsg('Reached last member, reloading Fightlist..', 'status');
			ba = true;
			loadfightpage();
			return
		}
		pre_check()
	}
	function pre_check() {
		var g = (wait2 > bx ? wait2: bx);
		var h = (wait2 > bx ? bx: wait2);
		var j = Math.floor((g - (h - 1)) * Math.random()) + h;
		j = (j < 0) ? 0 : j;
		Trace('In pre check');
		if (Q == false) {
			logmsg('Fightlist loading, Please wait..', 'status');
			return
		}
		if (u == false) {
			logmsg('Paused...', 'status');
			return
		}
		G = parseInt(document.forms.something.attackcount.value);
		bM = parseInt(document.getElementById('heal_thres').value);
		if (document.getElementById('user_health').innerHTML < bM) {
			heal();
			return
		}
		if (actual_count >= G && G != 0) {
			logmsg('Finished Attack run, Stopping..', 'status');
			stop();
			return
		}
		if (document.getElementById('user_stamina').innerHTML <= 0) {
			logmsg('Ran out of stamina, stopping..', 'status');
			stop();
			return
		}
		if (br && (parseInt(P) <= 30) && bz) {
			logmsg('Could level up on next Attack, Stopping..', 'status');
			stop();
			return
		}
		if ((!br) && (parseInt(P) <= 6) && bz) {
			logmsg('Could level up on next Attack, Stopping..', 'status');
			stop();
			return
		}
		if (parseInt(document.getElementById('exp_to_level').value) != 0) {
			if (br) {
				var l = parseInt(document.getElementById('exp_to_level').value) + 30
			} else {
				var l = parseInt(document.getElementById('exp_to_level').value) + 6
			}
			if (parseInt(P) < l) {
				logmsg('Could cross user set level up exp on next attack, Stopping..', 'status');
				stop();
				return
			}
		}
		cash_limit = parseInt(document.forms.something.cashlimit.value);
		if (document.getElementById('SpecialChars').value != '') {
			var m = document.getElementById('SpecialChars').value.split('\n');
			for (k = 0; k < m.length; k++) {
				if (A[i].indexOf(m[k]) != -1) {
					logmsg('Skipping ' + y[i] + ' fetching next target', 'status');
					skip_reason = 'Ignore char space';
					next();
					return
				}
			}
		}
		if (document.forms.something.faction_enable.checked) {
			switch (true) {
			case document.forms.something.Triad.checked:
				if (E[i] == 'Yakuza') {
					logmsg(y[i] + ' belongs to opposite faction, fetching next target', 'status');
					skip_reason = 'Yakuza faction, Triad attack checked';
					next();
					return
				}
				break;
			case document.forms.something.Yakuza.checked:
				if (E[i] == 'Triad') {
					logmsg(y[i] + ' belongs to opposite faction, fetching next target', 'status');
					skip_reason = 'Triad faction, Yakuza attack checked';
					next();
					return
				}
				break;
			case document.forms.something.Balance_Faction.checked:
				var n = parseInt(document.forms.something.balanceamt.value);
				if (bn > Yakuza) {
					Trace('Triad is higher');
					if ((bn - Yakuza) > n) {
						if (E[i] == 'Yakuza') {
							skip_reason = 'Yakuza faction, Triad attack needed';
							next();
							return
						}
					}
				} else if (bn < Yakuza) {
					Trace('Yakuza is higher');
					if ((Yakuza - bn) > n) {
						if (E[i] == 'Triad') {
							skip_reason = 'Triad faction, Yakuza attack needed';
							next();
							return
						}
					}
				}
				break
			}
		}
		try {
			var o = parseInt(document.getElementById('LowerLevel').value);
			var p = parseInt(document.getElementById('UpperLevel').value);
			var q = parseInt(document.getElementById('LowerMafia').value);
			var r = parseInt(document.getElementById('UpperMafia').value);
			for (k = 0; k < X.length; k++) {
				if (A[i] == X[k]) {
					skip_reason = 'Strong list volunteer';
					next();
					return
				}
			}
			if (! (B[i] >= o && B[i] <= p)) {
				skip_reason = 'Character Level limits';
				next();
				return
			}
			if (! (D[i] >= q && D[i] <= r)) {
				skip_reason = 'Mafia level limits';
				next();
				return
			}
		} catch(err) {
			alert(err)
		}
		if (document.getElementById('zynga_ice_check').checked) {
			if (!F[i]) {
				attack()
			} else {
				logmsg(y[i] + ' is already Iced/Dead, skipping..', 'status');
				logmsg(y[i] + ' is already Iced/Dead, skipping..', 'attack_log');
				next()
			}
			return
		}
		if (document.getElementById('ice_check').checked) {
			var s = /href="(.+?)"/.exec(y[i])[1].replace(/&amp;/g, '&');
			var t = {
				'ajax': 1,
				'liteload': 1,
				'sf_xw_user_id': bm,
				'sf_xw_sig': local_xw_sig
			};
			logmsg('Opening profile page of ' + y[i], 'status');
			$.ajax({
				type: "POST",
				url: s,
				timeout: 30000,
				data: t,
				success: function (d) {
					var e = {
						'ajax': 1,
						'liteload': 1,
						'sf_xw_user_id': bm,
						'sf_xw_sig': local_xw_sig
					};
					var f = /Sucker Punch.+?<a href="(.+?)".+?>Add to Hitlist/.exec(d)[1];
					logmsg('Running ice check on ' + y[i], 'status');
					$.ajax({
						type: "POST",
						url: f,
						timeout: 30000,
						data: e,
						success: function (a) {
							if (/You can't add/.test(a)) {
								logmsg('<span class="bad">Zynga Ice Check Problem !</span> skipping to next target', 'status');
								logmsg('<span class="bad">Zynga Ice Check Problem !</span> skipping to next target', 'attack_log');
								skip_reason = 'Iced';
								setTimeout(next, j * 1000);
								return
							} else if (/The action was not able to be completed/i.test(a)) {
								logmsg(y[i] + ' is already Iced/Dead, skipping..', 'status');
								logmsg(y[i] + ' is already Iced/Dead, skipping..', 'attack_log');
								skip_reason = 'Iced';
								setTimeout(next, j * 1000);
								return
							} else {
								attack();
								return
							}
						},
						error: function (a, b, c) {
							pre_check();
							return
						}
					});
					return
				}
			});
			return
		}
		setTimeout(attack, j * 100)
	}
	function get_xmlHTTP() {
		if (window.XMLHttpRequest) return new XMLHttpRequest();
		if (window.ActiveXObject) return new ActiveXObject('Microsoft.XMLHTTP');
		return
	}
	function loadSpammers() {
		document.getElementById('UserIds').value = bj
	}
	function Add_to_loot(b, c, d) {
		var e = /Forge|Arc Welder|Buzzsaw|Gunpowder|Gun Drill|Sonic Emitter|Weapon Part|Grapple|Boomerang|Railgun Barrel|Laser Rangefinder|Explosive Arrow|Portable Fusion Reactor/;
		var f = /Deposit Box|Magnetic Lock|Motion Sensor|Reinforced Steel|Security Camera|Concrete|Construction Tool|Steel Girder|Cinder Block|Bellhop|Chef|Poker Table|Slot Machine|Casino Dealer/;
		var g = /Zmeya Carbon Blade|Ubijca Assault Rifle|Konstantin Cargo Carrier|Executive Overcoat|Shturmovik|Zoloto Sports Car/;
		var h = /12 Gauge|Devastator|Zeus|Bomb Suit|Segmented Body Plate|Skull Cap|Cobra G7|Ruby Red|Turbo Road Warrior|Condor|Cougar|Rhinoceros/;
		var i = /Woodsman|Buzzard Combat Chopper|Tasmanian Devil|Domestic Defense/;
		var j = /Cement Block|Power Tool|Car Lift|Acetylene Torch|Shipping Container|Car Part|High Tech Car Part|Cuban Car Part|Thai Car Part|Russian Car Part|Solar Panel|Bulletproof Glass|Suspension Coil/;
		var m = /Nak Kha Shotgun|Titanium Katar|Ninja|Royal Thai Marine|Raed Armored Sedan|Lamang Motorcycle|Chain Viper|Forest Scorpion/;
		var n = /Micro-Fission Cell|Bio-Monitor/;
		V += c;
		if (/sexy_attack/.test(b)) {
			var a = /sexy_attack">(\d+)<.*?sexy_defense">(\d+)/.exec(b);
			b = b.replace(/\(.+?\)/, '');
			if (a[1] >= a[2]) {
				b = '(<span class="sexy_attack">' + a[1] + '</span> <span class="sexy_defense">' + a[2] + '</span>) ' + b
			} else {
				b = '(<span class="sexy_defense">' + a[2] + '</span> <span class="sexy_attack">' + a[1] + '</span>) ' + b
			}
		}
		if (b.search(e) > -1) {
			b = '<span class="more_in">[WD]</span> ' + b
		}
		if (b.search(j) > -1) {
			b = '<span class="more_in">[CS]</span> ' + b
		}
		if (b.search(h) > -1) {
			b = '<span class="more_in">[FHEL]</span> ' + b
		}
		if (b.search(i) > -1) {
			b = '<span class="more_in">[FHEL2]</span> ' + b
		}
		if (b.search(f) > -1) {
			b = '<span class="more_in">[Vegas]</span> ' + b
		}
		if (b.search(m) > -1) {
			b = '<span class="more_in">[BHEL]</span> ' + b
		}
		if (b.search(g) > -1) {
			b = '<span class="more_in">[MHEL]</span> ' + b
		}
		if (b.search(n) > -1) {
			b = '<span class="more_in">[Armory]</span> ' + b
		}
		if (T.length <= 0) {
			T[T.length] = new Array(b, c, d)
		} else {
			for (k = 0; k < T.length; k++) {
				if (b == T[k][0]) {
					T[k][1] += c;
					break
				} else if (k == T.length - 1) {
					T[T.length] = new Array(b, c, d);
					break
				}
			}
		}
		T.sort();
		document.getElementById('loot_log').innerHTML = '';
		try {
			l_log = '';
			for (l = (T.length - 1); l >= 0; l--) {
				if (T[l][2] != "") {
					l_log += '<span class="good">' + T[l][1] + 'x</span> <img src="' + T[l][2] + '" style="width:20px; height:20px" onmouseout="this.style.width=\'20px\';this.style.height=\'20px\';" onmouseover="this.style.width=\'40px\';this.style.height=\'40px\';"></img> ' + T[l][0] + '<br>'
				} else {
					l_log += '<span class="good">' + T[l][1] + 'x</span> ' + T[l][0] + '<br>'
				}
			}
			document.getElementById('loot_log').innerHTML = l_log
		} catch(err) {
			alert(err)
		}
	}
	function heal() {
		Trace('In heal function');
		cb = bm + UnixTS();
		var e = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': bm,
			'sf_xw_sig': local_xw_sig
		};
		if (by == 0) {
			logmsg('Healing disabled, Stopping..', 'status');
			logmsg('Healing disabled, Stopping..', 'attack_log');
			stop();
			return
		}
		if (bl == by) {
			K = false;
			logmsg('Healing...', 'status');
			$.ajax({
				type: "POST",
				data: e,
				dataType: "json",
				url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&cb=" + cb + "&xw_client_id=8",
				success: function (a) {
					if (a.hospital_message == null) {
						logmsg('Error during healing, retrying in 2 seconds..', 'status');
						setTimeout(heal, 2000);
						return
					} else if (/healed/.test(a.hospital_message)) {
						process_cash(by, -(/for (C|B|R|V|L|)\$([^.]+)/.exec(a.hospital_message)[2].replace(/,/g, '')));
						document.getElementById('user_health').innerHTML = a.user_fields.user_health;
						logmsg('<img src="http://codeoutpost.com/Scripts/heal.png" alt="heal"></img> Healed <span class="bad">' + (/for (C|B|R|V|L|)\$([^.]+)/.exec(a.hospital_message)[0]) + '</span>, Resuming attacks..', 'attack_log')
					} else if (a.user_fields.user_health == a.user_fields.user_max_health) {
						document.getElementById('user_health').innerHTML = a.user_fields.user_health
					} else if (/cannot heal so fast/.test(a.hospital_message)) {
						logmsg('Cannot heal too fast, retrying in 2 seconds..', 'status');
						document.getElementById('user_health').innerHTML = a.user_fields.user_health;
						setTimeout(heal, 2000);
						return
					} else {
						document.getElementById('user_health').innerHTML = a.user_fields.user_health
					}
					K = false;
					start_attack();
					return
				}
			});
			return
		} else if (K == true) {
			logmsg('Retrying Heal...', 'status');
			$.ajax({
				type: "POST",
				data: e,
				dataType: "json",
				url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&cb=" + cb + "&xw_client_id=8",
				success: function (b) {
					if (b.hospital_message == null) {
						logmsg('Error during healing, retrying in 2 seconds..', 'status');
						setTimeout(heal, 2000);
						return
					} else if (/healed/.test(b.hospital_message)) {
						process_cash(by, -(/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[2].replace(/,/g, '')));
						logmsg('<img src="http://codeoutpost.com/Scripts/heal.png" alt="heal"></img> Healed <span class="bad">' + (/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[0]) + '</span>, Travelling back..', 'status');
						logmsg('<img src="http://codeoutpost.com/Scripts/heal.png" alt="heal"></img> Healed <span class="bad">' + (/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[0]) + '</span>, Travelling back..', 'attack_log');
						document.getElementById('user_health').innerHTML = b.user_fields.user_health
					} else if (b.user_fields.user_health == b.user_fields.user_max_health) {
						document.getElementById('user_health').innerHTML = b.user_fields.user_health;
						logmsg('Travelling back..', 'status')
					} else if (/cannot heal so fast/.test(b.hospital_message)) {
						logmsg('Cannot heal too fast, retrying in 2 seconds..', 'status');
						document.getElementById('user_health').innerHTML = b.user_fields.user_health;
						setTimeout(heal, 2000);
						return
					} else {
						document.getElementById('user_health').innerHTML = b.user_fields.user_health
					}
					$.ajax({
						type: "POST",
						data: e,
						url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=" + by + "&cb=" + cb + "&destination=" + bl + "&from=fight&nextParams=&xw_client_id=8",
						success: function (a) {
							logmsg('Travelled Back..', 'status');
							K = false;
							start_attack();
							return
						}
					})
				}
			});
			return
		} else {
			logmsg('Travelling to heal city..', 'status');
			$.ajax({
				type: "POST",
				data: e,
				url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=" + bl + "&cb=" + cb + "&destination=" + by + "&from=fight&nextParams=&xw_client_id=8",
				success: function (c) {
					K = true;
					var d = parseInt(/'#mw_city_wrapper'.+?'mw_city(\d+?)'/.exec(c)[1]);
					if (d != by) {
						K = false;
						heal()
					}
					logmsg('Healing...', 'status');
					$.ajax({
						type: "POST",
						data: e,
						dataType: "json",
						url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&cb=" + cb + "&xw_client_id=8",
						success: function (b) {
							if (b.hospital_message == null) {
								logmsg('Error during healing, retrying in 2 seconds..', 'status');
								setTimeout(heal, 2000);
								return
							} else if (/healed/.test(b.hospital_message)) {
								process_cash(by, -(/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[2].replace(/,/g, '')));
								logmsg('<img src="http://codeoutpost.com/Scripts/heal.png" alt="heal"></img> Healed <span class="bad">' + (/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[0]) + '</span>, Travelling back..', 'status');
								logmsg('<img src="http://codeoutpost.com/Scripts/heal.png" alt="heal"></img> Healed <span class="bad">' + (/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[0]) + '</span>, Travelling back..', 'attack_log');
								document.getElementById('user_health').innerHTML = b.user_fields.user_health
							} else if (b.user_fields.user_health == b.user_fields.user_max_health) {
								document.getElementById('user_health').innerHTML = b.user_fields.user_health;
								logmsg('Travelling back..', 'status')
							} else if (/cannot heal so fast/.test(b.hospital_message)) {
								logmsg('Cannot heal too fast, retrying in 2..', 'status');
								setTimeout(heal, 2000);
								return
							} else {
								document.getElementById('user_health').innerHTML = b.user_fields.user_health
							}
							$.ajax({
								type: "POST",
								data: e,
								url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=" + by + "&cb=" + cb + "&destination=" + bl + "&from=fight&nextParams=&xw_client_id=8",
								success: function (a) {
									logmsg('Travelled Back..', 'status');
									K = false;
									start_attack();
									return
								}
							})
						}
					})
				}
			});
			return
		}
	}
	function process_cash(a, b) {
		try {
			switch (parseInt(a)) {
			case 1:
				I += parseInt(b);
				break;
			case 2:
				cuba_cash += parseInt(b);
				break;
			case 3:
				moscow_cash += parseInt(b);
				break;
			case 4:
				bk_cash += parseInt(b);
				break;
			case 5:
				vegas_cash += parseInt(b);
				break;
			case 6:
				italy_cash += parseInt(b);
				break
			}
			if (I < 0) {
				document.getElementById('cash').innerHTML = '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif"></img>&nbsp;<span class="bad">-$' + format_cash(I) + '</span>'
			} else {
				document.getElementById('cash').innerHTML = '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif"></img>&nbsp;<span class="good">$' + format_cash(I) + '</span>'
			}
			if (cuba_cash < 0) {
				document.getElementById('cash').innerHTML += '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cubanpeso_16x11_01.gif"></img>&nbsp;<span class="bad">-C$' + format_cash(cuba_cash) + '</span>'
			} else {
				document.getElementById('cash').innerHTML += '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cubanpeso_16x11_01.gif"></img>&nbsp;<span class="good">C$' + format_cash(cuba_cash) + '</span>'
			}
			if (moscow_cash < 0) {
				document.getElementById('cash').innerHTML += '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_moscow_16x16_01.gif"></img>&nbsp;<span class="bad">-R$' + format_cash(moscow_cash) + '</span>'
			} else {
				document.getElementById('cash').innerHTML += '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_moscow_16x16_01.gif"></img>&nbsp;<span class="good">R$' + format_cash(moscow_cash) + '</span>'
			}
			if (bk_cash < 0) {
				document.getElementById('cash').innerHTML += '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_bangkok_16x16_01.gif"></img>&nbsp;<span class="bad">-B$' + format_cash(bk_cash) + '</span>'
			} else {
				document.getElementById('cash').innerHTML += '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_bangkok_16x16_01.gif"></img>&nbsp;<span class="good">B$' + format_cash(bk_cash) + '</span>'
			}
			if (vegas_cash < 0) {
				document.getElementById('cash').innerHTML += '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png"></img>&nbsp;<span class="bad">-V$' + format_cash(vegas_cash) + '</span>'
			} else {
				document.getElementById('cash').innerHTML += '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png"></img>&nbsp;<span class="good">V$' + format_cash(vegas_cash) + '</span>'
			}
			if (italy_cash < 0) {
				document.getElementById('cash').innerHTML += '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_italy_16x16_02.png"></img>&nbsp;<span class="bad">-L$' + format_cash(italy_cash) + '</span>'
			} else {
				document.getElementById('cash').innerHTML += '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_italy_16x16_02.png"></img>&nbsp;<span class="good">L$' + format_cash(italy_cash) + '</span>'
			}
		} catch(err) {
			alert(err)
		}
	}
	function format_cash(a) {
		var d;
		while (d = /(\d+)(\d{3}.*)/.exec(a)) {
			a = d[1] + ',' + d[2]
		}
		return a
	}
	loadfightpage();
	function logmsg(a, b) {
		var l = 0;
		var c = new Date().getHours();
		var d = new Date().getMinutes();
		c = (c < 10 ? '0' + c: c);
		d = (d < 10 ? '0' + d: d);
		var e = '<font color=#666666>[' + c + ':' + d + ']</font>';
		switch (b) {
		case 'attack_log':
			W.splice(0, 0, ' ' + e + ' ' + a);
			break;
		case 'status':
			document.getElementById('status').innerHTML = a;
			break
		}
		actual_count = S + loss;
		document.getElementById('fights').innerHTML = actual_count;
		l = W.length;
		var f = parseInt(document.getElementById('log_size').value);
		W.length = (l < f) ? l: f;
		document.getElementById('attack_log').innerHTML = '';
		var g = '';
		for (l = 0; l < W.length; l++) {
			g += W[l] + '<br>'
		}
		document.getElementById('attack_log').innerHTML += g
	}
	function bank(d, e) {
		if (bl == 5) {
			var f = {
				'ajax': 1,
				'liteload': 0,
				'sf_xw_user_id': bm,
				'sf_xw_sig': local_xw_sig
			};
			$.ajax({
				type: "POST",
				data: f,
				url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankDeposit&xw_person=" + bO + "&amount=" + d + "&city=5&building_type=6&xw_client_id=8",
				success: function (a) {},
				error: function (a, b, c) {}
			});
			return
		}
		do_ajax('', 'remote/html_server.php?xw_controller=bank&xw_action=deposit&xw_city=' + H + '&cb=' + bm + UnixTS() + '&amount=' + d + '&city=' + e, 1, 0, 0, 0)
	}
	function writeCookieStuff() {
		bx = document.getElementById('delay1').value;
		bx = (bx == '') ? 2 : bx;
		wait2 = document.getElementById('delay2').value;
		wait2 = (wait2 == '') ? 2 : wait2;
		bA = document.getElementById('SpecialChars').value.split('\n');
		createCookie('Brawler_ignore', escape(bA));
		bB = (document.getElementById('bank_enable').checked) ? 'checked': ' ';
		user_bank_enable = (document.getElementById('user_bank_enable').checked) ? 'checked': ' ';
		bank_limit = document.getElementById('bank_limit').value;
		bank_limit = (bank_limit == '') ? 10000 : bank_limit;
		bC = (document.getElementById('attack_limit_check').checked) ? 'checked': ' ';
		attack_limit_count = document.getElementById('attack_limit').value;
		attack_limit_count = (attack_limit_count == '') ? 3 : attack_limit_count;
		bD = document.getElementById('LowerMafia').value;
		bD = (bD == '') ? 0 : bD;
		upper_mafia = document.getElementById('UpperMafia').value;
		upper_mafia = (upper_mafia == '') ? 501 : upper_mafia;
		lower_level = document.getElementById('LowerLevel').value;
		lower_level = (lower_level == '') ? 0 : lower_level;
		bE = document.getElementById('UpperLevel').value;
		bE = (bE == '') ? 9999 : bE;
		bF = document.getElementById('cashlimit').value;
		bF = (bF == '') ? 0 : bF;
		bG = (document.getElementById('cash_city').checked) ? 'checked': ' ';
		bH = document.getElementById('balanceamt').value;
		bH = (bH == '') ? 10 : bH;
		bI = (document.getElementById('faction_enable').checked) ? 'checked': ' ';
		triad_fac = (document.getElementById('Triad').checked) ? 'checked': ' ';
		yakuza_fac = (document.getElementById('Yakuza').checked) ? 'checked': ' ';
		faction_bal = (document.getElementById('Balance_Faction').checked) ? 'checked': ' ';
		bJ = (document.getElementById('ice_check').checked) ? 'checked': ' ';
		bL = (document.getElementById('power_attack').checked) ? 'checked': ' ';
		user_power_attack_enable = (document.getElementById('user_power_attack').checked) ? 'checked': ' ';
		user_iced_check = (document.getElementById('user_iced_check').checked) ? 'checked': ' ';
		bK = (document.getElementById('zynga_ice_check').checked) ? 'checked': ' ';
		var a = bx + '|' + wait2 + '|' + by + '|' + heal_city_text + '|' + bz + '|' + levelup_text + '| |' + bB + '|' + user_bank_enable + '|' + bank_limit + '|' + bC + '|' + attack_limit_count + '|' + bD + '|' + upper_mafia + '|' + lower_level + '|' + bE + '|' + bF + '|' + bG + '|' + bH + '|' + bI + '|' + triad_fac + '|' + yakuza_fac + '|' + faction_bal + '|' + bJ + '|' + bL + '|' + user_power_attack_enable + '|' + user_iced_check + '|' + bK;
		createCookie('Brawler', a)
	}
	function readCookieStuff() {
		try {
			var a = readCookie('Brawler');
			if (a == null || (/undefined/.test(a))) {
				return
			}
			a = a.split('|');
			bx = a[0];
			wait2 = a[1];
			by = a[2];
			heal_city_text = a[3];
			bz = (a[4] == 'true') ? true: false;
			levelup_text = a[5];
			bA = readCookie('Brawler_ignore');
			if (! (bA == null || bA == '')) {
				if (bA == ' ') {
					bA = ''
				} else {
					bA = unescape(bA).replace(/,/g, '\n')
				}
			} else {
				bA = ''
			}
			bB = a[7];
			user_bank_enable = a[8];
			bank_limit = a[9];
			bC = a[10];
			attack_limit_count = a[11];
			bD = a[12];
			upper_mafia = a[13];
			lower_level = a[14];
			bE = a[15];
			bF = a[16];
			bG = a[17];
			bH = a[18];
			bI = a[19];
			triad_fac = a[20];
			yakuza_fac = a[21];
			faction_bal = a[22];
			bJ = a[23];
			bL = a[24];
			user_power_attack_enable = a[25];
			user_iced_check = a[26];
			bK = a[27]
		} catch(err) {}
	}
	function loadContent(a) {
		var b = document.getElementsByTagName('head').item(0);
		var c = document.getElementById('loadScript');
		if (c) b.removeChild(c);
		script = document.createElement('script');
		script.src = a;
		script.type = 'text/javascript';
		script.id = 'loadScript';
		b.appendChild(script);
		setTimeout(load, 5000)
	}
	loadContent('http://www.google-analytics.com/ga.js');
	function load() {
		try {
			var a = _gat._getTracker("UA-12870604-2");
			a._trackPageview("/Brawler")
		} catch(err) {}
	}
})();
function Trace(a) {
	if (!trace_enable) {
		return
	}
	var b = new Date().getHours();
	var c = new Date().getMinutes();
	b = (b < 10 ? '0' + b: b);
	c = (c < 10 ? '0' + c: c);
	var d = '<font color=#666666>[' + b + ':' + c + ']</font>';
	document.getElementById('popup_permanence').innerHTML += d + ' ' + skip_reason;
	document.getElementById('popup_permanence').innerHTML += d + ' ' + a
}
function temp_trace(a) {
	var b = new Date().getHours();
	var c = new Date().getMinutes();
	b = (b < 10 ? '0' + b: b);
	c = (c < 10 ? '0' + c: c);
	var d = '<font color=#666666>[' + b + ':' + c + ']</font>';
	document.getElementById('popup_fodder').innerHTML += d + ' ' + a
}
function current_city() {
	if ($('#mw_city_wrapper').hasClass('mw_city1')) {
		return 1
	} else if ($('#mw_city_wrapper').hasClass('mw_city2')) {
		return 2
	} else if ($('#mw_city_wrapper').hasClass('mw_city3')) {
		return 3
	} else if ($('#mw_city_wrapper').hasClass('mw_city4')) {
		return 4
	} else if ($('#mw_city_wrapper').hasClass('mw_city5')) {
		return 5
	} else if ($('#mw_city_wrapper').hasClass('mw_city6')) {
		return 6
	}
}
function field_validate(a) {
	if ((a >= 48 && a <= 57) || (a >= 96 && a <= 105) || a == 8 || a == 127 || a == 37 || a == 39 || a == 9 || a == 46 || a == 13 || a == 17 || a == 86) {
		return true
	} else {
		return false
	}
}
function createCookie(a, b) {
	var c = new Date();
	c.setDate(c.getDate() + 30);
	document.cookie = a + "=" + b + ";expires=" + c.toGMTString() + "; path=/"
}
function readCookie(a) {
	var i, cookie, nameEQ = a + "=",
	cookieArray = document.cookie.split(";");
	for (i = 0; i < cookieArray.length; i++) {
		cookie = cookieArray[i];
		while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
		if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length)
	}
	return null
}