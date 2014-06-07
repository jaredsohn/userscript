// ==UserScript==
// @name           Brawler edited by Lutfy Asri
// @author         Arun
// @description    Picks targets off the fightlist and auto attacks
// @credits        Absolutely they all goto Arun without him this wouldnt exsist
// ==/UserScript==

var trace_enable = false;
var skip_reason;
javascript: (function () {
var loot_item = [],
    loot_count, loot_log, l_log = '';
    var t = false;
    var u;
    var v;
    var w;
    var x = [];
    var y = [];
    var A = [];
    var B = [];
    var C = [];
    var D = [];
    var E = [];
    var i = 0,
        j = 0;
    var F = 0,
        actual_count = 0;
    var G = 1;
    var H = 0,
        moscow_cash = 0,
        bk_cash = 0,
        cuba_cash = 0,
        vegas_cash = 0,
        italy_cash = 0;
    var I = 0;
    var J = false;
    var K = 0;
    var L;
    var M;
    var N;
    var O;
    var P = false;
    var Q = 0;
    var R = 0,
        loss = 0;
    var S;
    var T = 0,
        temp_loot;
    var U = [];
    var V = [],
        stronger_log = 'Stronger Targets<br>',
        weaker_log = 'Weaker Targets<br>';
    var W = 0,
        ices = 0;
    var X = false,
        bm = false;
    var Y = false;
    var Z = 0;
    var ba = "Fightlist";
    var bb = [];
    var bc = [];
    var bd = [];
    var be = [];
    var bf = 0,
        cash_limit = 0,
        cash_in_hand = 0;
    var bg = true;
    var bh = "100001768779662\n100000814697530\n1569115939\n1645819657\n100001067598459\n100001047658084\n100000898380439\n100001007957685\n100000375495674\n1206819058\n100000848734871\n1793236735\n100000854181941\n100000832602631\n100000848734871\n639239336\n1830672943\n1027758678\n100000956712356";
    var bi;
    var bj;
    var bk;
    var bl = 0,
        Yakuza = 0;
    var bm = false;
    var bn, initial_mafia_attack = 0;
    var bo, initial_mafia_defense = 0;
    var bp = false,
        user_power_attack = false;
    var bq = 0,
        killed_count = 0;
    var br = [];
    var bs = [];
    var bt = [],
        coin_owner_id = [];
    var bu = 0,
        initial_vic_pts = 0;
    var bv = 1,
        wait2 = 2,
        random_delay = 1;
    var bw = 1,
        heal_city_text = 'New York';
    var bx = true,
        levelup_text = 'Stop';
    var by = '';
    var bz = '',
        user_bank_enable = '',
        bank_limit = 10000;
    var bA = '',
        attack_limit_count = 3;
    var bB = 1,
        upper_mafia = 501;
    var bC = 9999,
        lower_level = 0;
    var bD = 0;
    var bE = 'checked';
    var bF = 10;
    var bG = 'checked',
        triad_fac = '',
        yakuza_fac = '',
        faction_bal = 'checked';
    var bH = 'checked',
        user_iced_check = 'checked';
    var bI = 'checked';
    var bJ = false,
        user_power_attack_enable = false;
    var bK = 30;
    var bL = document.getElementsByName('mafiawars');
    if (top === self) {
        try {
            if (bL.length > 0 || (!bL)) {
                window.location.href = document.getElementsByName('mafiawars')[0].src;
                return
            } else {
                try {
                    document.body.parentNode.style.overflowY = "scroll";
                    if (typeof FB != 'undefined') {
                        FB.CanvasClient.stopTimerToSizeToContent;
                        window.clearInterval(FB.CanvasClient._timer);
                        FB.CanvasClient._timer = -1
                    }
                } catch (err) {}
            }
        } catch (err) {}
    }
    try {
        document.getElementById('header_top_promo_banner').parentNode.removeChild(document.getElementById('header_top_promo_banner'))
    } catch (fberr) {}
    try {
        document.getElementById('LoadingOverlay').parentNode.removeChild(document.getElementById('LoadingOverlay'));
        document.getElementById('LoadingBackground').parentNode.removeChild(document.getElementById('LoadingBackground'))
    } catch (fberr) {}
    try {
        document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementsByTagName('div')[0])
    } catch (fberr) {}
    var bk = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
    var bM = /[a-z]\|([0-9]+)/.exec(bk)[1];
    bj = current_city();
    var bN = /&tmp=(.+?)&/.exec(document.body.innerHTML)[1];
    var bO = /&cb=(.+?)&/.exec(document.body.innerHTML)[1];
    if (bk == 'p|47869484' || bk == 'p|78199035') {
        return
    }
    readCookieStuff();
    var bP = '<style type="text/css">' + '.sexy_table1{font-weight:bold; border:1px solid #666666; padding-left:10px; }' + '.sexy_error_table{font-size:17px; background-color:black; color:red; padding-left:10px display:none}' + '.sexy_select{color:#D0D0D0; border: 1px solid #666666; background-color:black;}' + '.sexy_input{background-color:black; color:#D0D0D0; font-size:13px; border: 1px solid #666666; padding-left:0.1em}' + '.sexy_destination1{padding-top: 5px; padding-bottom: 5px; padding-right: 5px; padding-left: 10px; font-weight: bold; background-color:black; color:#FFD927; border: 1px solid #FFD927; overflow: hidden;}' + '.sexy_destination2{font-weight: bold; background-color:black; color:#FFD927; width:150px; border: 1px solid #FFD927; overflow: hidden;}' + '</style>';
    var bQ = '<form id="something">' + '<table width="745px" style="border:1px solid #666666; background-color:black;">' + '<tr>' + '<td width="100%" style="border:1px solid #666666;">' + '<table style="background-color:black; height:40px">' + '<tr>' + '<th width="50%" style="font-size:20px; padding-left:15px;text-align: left">HMMW Brawler ® by Arun</th>' + '<th width="48%" style="font-size:12px; text-align:right"> <a id="Website" align="right" href="http://www.facebook.com/lutfy.asri" target="_blank">Edited by Lutfy Asri</a> - <a id="Forum" align="right" href="http://www.facebook.com/group.php?gid=128834137160784#!/group.php?gid=192121815125" target="_blank">HMMW</a> - <a id="Donate" href="http://codeoutpost.com/?page_id=31" target="_blank">Donate to Mr Arun</a></th>' + '<th width="2%" align=center><a href="#" id="close"><img alt="Exit" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a></th>' + '</tr>' + '</table>' + '</td>' + '</tr>' +
	'<tr><td width="500"><h2><span class="bad">Brawler ni jangan sebar kat orang lain...</span><br />Ini cubaan pertama saya.<br />Amaran!!!<span class="bad">Hanya untuk HMMW jer...</span></h2></td></tr>'
	
+ '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">Fights</td>' + '<td width="1%">:</td>' + '<td width="2%" id="fights">0</td>' + '<td width="3%">Of</td>' + '<td width="75%"><input type=text id="attackcount" value="0" class="sexy_input" style="width:30px" onkeydown="return field_validate(event.keyCode);">' + ' / Exp to Level : <input type=text id="exp_to_level" value="0" class="sexy_input" style="width:30px" onkeydown="return field_validate(event.keyCode);">' + ' / Ice count : <input type=text id="ice_count" value="0" class="sexy_input" style="width:50px" onkeydown="return field_validate(event.keyCode);"></td>' + '<td width="9%"><a id="pause" href="#" style="display:none"><img align="right" alt="Pause" src="http://codeoutpost.com/Scripts/pause.png"></img></a>' + '<a id="begin" href="#" style="display:inline"><img align="right" alt="Start" src="http://codeoutpost.com/Scripts/play.png"></img></a></td>' + '</tr></table>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">On stop</td>' + '<td width="1%">:</td>' + '<td width="89%"><input type="checkbox" id="restart_enable"> Restart in <input type=text id="restart_min" value="1" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"> minutes, ' + '<input type="checkbox" id="finish_heal_enable"> Heal ' + '</td>' + '</tr></table>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">Exp Gain</td>' + '<td width="1%">:</td>' + '<td width="25%">&nbsp;<span id="exp_gained">0</span> &nbsp;(<span id="exp_ratio">0.00</span> exp/stam)</td>' + '<td width="12%" align="right">Exp Reqd</td>' + '<td width="1%" align="right">:</td>' + '<td width="28%" align="right"><span id="exp_reqd">0</span> &nbsp;(<span id="exp_ratio_reqd">0.00</span> exp/stam)</td>' + '<td width="5%">Wins</td>' + '<td width="1%">:</td>' + '<td width="5%"><span class="good" id="wins">0</span><span class="more_in">[<span id="win_percent">0</span>%]</span></td>' + '<td width="1%">&nbsp;</td>' + '<td width="5%">Losses</td>' + '<td width="1%">:</td>' + '<td width="5%"><span class="bad" id="losses">0</span><span class="more_in">[<span id="loss_percent">0</span>%]</span></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">Status</td>' + '<td width="1%">:</td>' + '<td width="62%"><span id="status">&nbsp;</span></td>' + '<td width="13%">Heal City <input type=text id="heal_thres" value="' + bK + '" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></td>' + '<td width="1%">:</td>' + '<td width="13%">&nbsp;<a id="heal_city_change" href="#"><span id="heal_city">' + heal_city_text + '</span></a></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">Cash</td>' + '<td width="1%">:</td>' + '<td width="89%"><span id="cash"><span class="good"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif"></img> $0&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cubanpeso_16x11_01.gif"></img>&nbsp;C$0&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_moscow_16x16_01.gif"></img>&nbsp;R$0&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_bangkok_16x16_01.gif"></img>&nbsp;B$0&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png"></img>&nbsp;V$0&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_italy_16x16_02.png"></img>&nbsp;L$0</span></span></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="61%">&nbsp;</td>' + '<td width="17%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/victory_icon.gif"></img><span id="Victorycoins">0</span></td>' + '<td width="1%">&nbsp;</td>' + '<td width="8%">Delay</td>' + '<td width="1%">:</td>' + '<td width="5%"><input type=text id="delay1" value="' + bv + '" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></td>' + '<td width="2%">to</td>' + '<td width="5%"><input type=text id="delay2" value="' + wait2 + '" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%" >' + '<table width=100% style="background-color:black;">' + '<tr style="height:10px">' + '<td width="10%">Stats</td>' + '<td width="1%">:</td>' + '<td width="5%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/bangkok_yakuza_small.gif" alt="Yakuza"></img></td>' + '<td width="5%" id="Yakuza_points">0</td>' + '<td width="1%">&nbsp;</td>' + '<td width="5%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/bangkok_triads_small.gif" alt="Triad"></img></td>' + '<td width="5%" id="Triad_points">0</td>' + '<td width="3%">&nbsp;</td>' + '<td width="3%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_mafia_attack_22x16_01.gif"></img></td>' + '<td width="17%"> <span id="mafia_attack">0</span> [<span id="attack_diff"><span class="good">+0</span></span>]</td>' + '<td width="3%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_mafia_defense_22x16_01.gif"></img></td>' + '<td width="17%"> <span id="mafia_defense">0</span> [<span id="defense_diff"><span class="good">+0</span></span>]</td>' + '<td width="3%"><img src="http://codeoutpost.com/Scripts/kill.png" alt="Kills"></img></td>' + '<td width="1%">:</td>' + '<td width="7%"><span id="kills_log">0</span></td>' + '<td width="2%">&nbsp;</td>' + '<td width="3%"><img src="http://codeoutpost.com/Scripts/Ice.png" alt="Iced"></img></td>' + '<td width="1%">:</td>' + '<td width="7%"><span id="iced_log">0</span></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width=100% style="background-color:black;">' + '<td width="10%">Fight</td>' + '<td width="1%">:</td>' + '<td width="25%"><input type="radio" id="Fightlist" name="fight_choice" checked>Fightlist</input></td>' + '<td width="25%"><input type="radio" id="Users" name="fight_choice">Specific Users</input></td>' + '<td width="10%" style="text-align:right">&nbsp;</td>' + '<td width="15%">Before level up</td>' + '<td width="1%">:</td>' + '<td width="13%"><a id="levelup" href="#">' + levelup_text + '</a></td>' + '</table>' + '</td>' + '</tr>' + '<tr id="UserChoice" style="display:none">' + '<td width="100%">' + '<table width=100% id="useroption" style="background-color:black;border:1px solid #666666;">' + '<tr>' + '<td colspan="13"><input type="checkbox" id="user_bank_enable" ' + user_bank_enable + '> Enable bank if cash in hand is greater than : <input type="text" id="user_bank_limit" value="' + bank_limit + '" class="sexy_input" onkeydown="return field_validate(event.keyCode);">&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="user_power_attack" ' + bJ + '> Enable Power Attack</td>' + '</tr>' + '<tr>' + '<td colspan="13"><input type="checkbox" id="user_iced_check" ' + user_iced_check + '> Only attack live targets</td>' + '</tr>' + '<tr style="height:10px">' + '<td width="20%">Enter User Id\'s here (one id per line)</td>' + '<td width="1%">:</td>' + '<td width="30%" colspan=4><textarea id="UserIds" class="sexy_input"></textarea></td>' + '<td width="49%" colspan=4><input type="checkbox" id="UserSkip">Stop if all users are Iced/Killed</input>' + '<br><br><a id="AddSpammers" class="sexy_button_new"><span><span>Load Spammer List</span></span></a></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr id="FightChoice">' + '<td width="100%">' + '<table width=100% id="fightlistoption" style="background-color:black;border:1px solid #666666;">' + '<tr>' + '<td colspan="13"><input type="checkbox" id="cash_city" ' + bE + '>Attack only if Cash from same city &nbsp;&nbsp;<input type="checkbox" id="attack_limit_check" ' + bA + '>Limit number of attacks per person <input type="text" id="attack_limit" value="' + attack_limit_count + '" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></td>' + '</tr>' + '<tr>' + '<td colspan="13"><input type="checkbox" id="faction_enable" ' + bG + '> Enable Specific Faction Attack : ' + '<input type="radio" id="Triad" name="faction" ' + triad_fac + '> Attack Triad Only ' + '<input type="radio" id="Yakuza" name="faction" ' + yakuza_fac + '> Attack Yakuza Only ' + '<input type="radio" id="Balance_Faction" name="faction" ' + faction_bal + '> Balance Factions by <input type="text" id="balanceamt" value="' + bF + '" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"> points</td>' + '</tr>' + '<tr>' + '<td colspan="13"><input type="checkbox" id="bank_enable" ' + bz + '> Enable bank if cash in hand is greater than : <input type="text" id="bank_limit" value="' + bank_limit + '" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></td>' + '</tr>' + '<tr>' + '<td colspan="13"><input type="checkbox" id="zynga_ice_check" ' + bI + '>Use Fightlist Ice Check</input> &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="ice_check" ' + bH + '> Only Attack live targets</input> &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="power_attack" ' + bJ + '> Enable Power Attack</input></td>' + '</tr>' + '<tr>' + '<td colspan="13">&nbsp;Minimum cash limit per attack : <input type="text" id="cashlimit" value="' + bD + '" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></td>' + '</tr>' + '<tr style="height:10px">' + '<td width="10%">Levels</td>' + '<td width="1%">:</td>' + '<td width="5%"><input type="text" id="LowerLevel" class="sexy_input" style="width:30px" value="' + lower_level + '"></input></td>' + '<td width="3%">to</td>' + '<td width="5%"><input type="text" id="UpperLevel" class="sexy_input" style="width:30px" value="' + bC + '"></input></td>' + '<td rowspan=2 width="5%">&nbsp;</td>' + '<td rowspan=2 width="30%">Ignore Names with Characters</td>' + '<td rowspan=2 width="1%">:</td>' + '<td rowspan=2 width="35%" colspan=4><textarea id="SpecialChars" class="sexy_input">' + by + '</textarea></td>' + '</tr>' + '<tr style="height:10px">' + '<td width="10%">Mafia </td>' + '<td width="1%">:</td>' + '<td width="5%"><input type="text" id="LowerMafia" style="width:30px" class="sexy_input" value="' + bB + '"></input></td>' + '<td width="3%">to</td>' + '<td width="5%"><input type="text" id="UpperMafia" style="width:30px" class="sexy_input" value="' + upper_mafia + '"></input></td>' + '<td width="76%" colspan=4>&nbsp;</td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '<tr>' + '<td width="100%">' + '<table width="100%" style="background-color:black; height:40px">' + '<tr><td width="10%" valign="top"><a href="#" id="posts_show">Ices/Stashes/Coins</a></td>' + '<td width="1%" valign="top">:</td>' + '<td width="29%" id="ice_posts_log" valign="top" style="display:none">Ice Count - Name - Posts<br></td>' + '<td width="29%" id="stash_posts_log" valign="top" style="display:none">Finder - Stash Post<br></td>' + '<td width="31%" id="coin_posts_log" valign="top" style="display:none">Finder - Coins Post<br></td>' + '</tr>' + '<tr><td width="10%" valign="top"><a href="#" id="targets_show">Targets Log</a></td>' + '<td width="1%" valign="top">:</td>' + '<td width="44%" id="stronger_log" valign="top" style="display:none">Stronger Targets<br></td>' + '<td width="45%" id="weaker_log" valign="top" style="display:none">Weaker Targets<br></td>' + '</tr>' + '<tr><td width="10%" valign="top"><a href="#" id="loot_show">Loot (<span id="loot_percent"></span>%)</a></td>' + '<td width="1%" valign="top">:</td>' + '<td id="loot_log" valign="top" colspan="3"></td>' + '</tr>' + '<tr><td width="10%" valign="top"><a href="#" id="log_show">Log</a> &nbsp;&nbsp;<input type="text" id="log_size" value="10" class="sexy_input" style="width:20px"></input></td>' + '<td width="1%" valign="top">:</td>' + '<td id="attack_log" colspan="3"></td>' + '</tr>' + '</table>' + '</td>' + '</tr>' + '</table>' + '</form>';
    var bR = '<table class="sexy_error_table" width=100% border=2 rules=none bgcolor="black" id="errormsg"></table><br>';
    try {
        document.getElementById('popup_permanence').removeChild(document.getElementById('fight_attack_div'))
    } catch (err) {}
    var bS = document.getElementById('popup_permanence');
    var bT = document.createElement("div");
    bT.id = 'fight_attack_div';
    bT.innerHTML = bP + bR + bQ;
    bS.insertBefore(bT, bS.firstChild);
    document.getElementById("AddSpammers").onclick = loadSpammers;
    document.getElementById("close").onclick = function () {
        writeCookieStuff();
        t = false;
        try {
            document.getElementById('popup_permanence').removeChild(document.getElementById('fight_attack_div'))
        } catch (err) {}
    };
    document.getElementById("begin").onclick = function () {
        if (P) {
            document.getElementById("begin").style.display = 'none';
            document.getElementById("pause").style.display = 'inline';
            t = true;
            Y = true;
            F = parseInt(document.forms.something.attackcount.value);
            writeCookieStuff();
            start_attack()
        }
        return false
    };
    document.getElementById("pause").onclick = function () {
        t = false;
        document.getElementById("pause").style.display = 'none';
        document.getElementById("begin").style.display = 'inline';
        writeCookieStuff();
        return false
    };
    document.getElementById("loot_show").onclick = function () {
        $('#loot_log').toggle();
        return false
    };
    document.getElementById("targets_show").onclick = function () {
        $('#stronger_log').toggle();
        $('#weaker_log').toggle();
        return false
    };
    document.getElementById("posts_show").onclick = function () {
        $('#ice_posts_log').toggle();
        $('#stash_posts_log').toggle();
        $('#coin_posts_log').toggle();
        return false
    };
    document.getElementById("log_show").onclick = function () {
        $('#attack_log').toggle();
        return false
    };
    document.getElementById("Fightlist").onclick = function () {
        ba = "Fightlist";
        document.getElementById("FightChoice").style.display = '';
        document.getElementById("UserChoice").style.display = 'none'
    };
    document.getElementById("Users").onclick = function () {
        ba = "Users";
        document.getElementById("FightChoice").style.display = 'none';
        document.getElementById("UserChoice").style.display = ''
    };
    document.getElementById("levelup").onclick = function () {
        if (bx) {
            bx = false;
            levelup_text = document.getElementById("levelup").innerHTML = "Continue"
        } else {
            bx = true;
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
        bw++;
        bw = (bw > 6) ? 0 : bw;
        switch (bw) {
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
        cb = bk + UnixTS();
        P = false;
        document.getElementById('inner_page').addEventListener('DOMSubtreeModified', function () {
            if (pageLoading == 0) {
                switch (true) {
                case document.forms.something.Fightlist.checked:
                    setTimeout(loadfightlist, 2000);
                    break;
                case document.forms.something.Users.checked:
                    if (Y) {
                        setTimeout(loaduserlist, 2000)
                    }
                    break
                }
                this.removeEventListener('DOMSubtreeModified', arguments.callee, false)
            }
        }, false);
        do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&cb=' + cb, 1, 1, 0)
    }
    function loadfightlist() {
        logmsg('Loading fightlist...', 'status');
        x = [];
        y = [];
        A = [];
        C = [];
        B = [];
        D = [];
        E = [];
        var a = 0;
        try {
            var b = document.evaluate("//a[@class=\"sexy_button_new short_red sexy_attack_new\"]//span//span[contains(string(),'Declare War')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (b.snapshotLength >= 1) {
                a = 1
            }
        } catch (err) {}
        w = document.evaluate("//table[@class=\"main_table fight_table\"]/tbody/tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i = 1; i < w.snapshotLength; i++) {
            if (/Undercover Cop/.test(w.snapshotItem(i).innerText)) {
                continue
            }
            x[x.length] = /<a.+\/a>/.exec(w.snapshotItem(i).getElementsByTagName('td')[0].innerHTML);
            y[y.length] = w.snapshotItem(i).getElementsByTagName('td')[0].getElementsByTagName('a')[0].innerHTML;
            A[A.length] = parseInt(/Level ([0-9]+)/.exec(w.snapshotItem(i).getElementsByTagName('td')[0].innerHTML)[1]);
            E[E.length] = /iced\.png/.test(w.snapshotItem(i).innerHTML);
            if (bj == 4) {
                D[D.length] = w.snapshotItem(i).getElementsByTagName('td')[2].getElementsByTagName('img')[0].alt
            }
        }
        w = document.evaluate("//table[@class=\"main_table fight_table\"]/tbody/tr/td[2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i = 0; i < w.snapshotLength; i++) {
            C[C.length] = parseInt(w.snapshotItem(i).innerHTML.replace(/\s/g, ""))
        }
        w = document.evaluate("//table[@class=\"main_table fight_table\"]//td[@class=\"action\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        try {
            for (i = 0; i < w.snapshotLength; i++) {
				//original broken code
				//B[B.length] = /'([^']+)/.exec(/reg_fight_view_attack\(([^\)]+)\);/.exec(w.snapshotItem(i).innerHTML)[0].replace(/&amp;/g, '&'))[1]
			
				//Pete/Eike Fix
				//var gg=/(remote[^\"]+)\"/.exec(w.snapshotItem(i).innerHTML)[1];
				//B[B.length] = gg.replace(/&amp;/g, '&');
				
				//Martin fix
                B[B.length] = /href="(.*?)"/.exec(w.snapshotItem(i).innerHTML)[1].replace(/&amp;/g, '&');
            }
        } catch (err) {
            alert('Button problem: '+w.snapshotItem(i).innerHTML+'\n'+err)
        }
        i = 0;
        Q++;
        P = true;
        logmsg('Fightlist loaded..', 'status');
        if (Q >= 3) {
            logmsg('No matches on the fightlist with set criteria, trying again in 10 seconds', 'status');
            Q = 0;
            setTimeout(function () {
                Y = true;
                loadfightpage()
            }, 10000);
            return
        }
        if (w.snapshotLength <= 0) {
            logmsg('Blank Fightlist, reloading.', 'status');
            loadfightpage();
            return
        }
        if (Y == true) {
            start_attack()
        }
    }
    function loaduserlist() {
        bb = [];
        bc = [];
        bd = [];
        try {
            if (document.getElementById('UserIds').value.length > 0) {
                bb = document.getElementById('UserIds').value.split('\n');
                bc = document.getElementById('UserIds').value.split('\n')
            } else if (document.getElementById('UserIds').value.length == 0) {
                logmsg('Userlist is empty, Stopping..', 'status');
                logmsg('Userlist is empty, Stopping..', 'attack_log');
                stop();
                bg = true;
                return
            }
        } catch (err) {
            alert('Error ! Check entered Ids')
        }
        cb = bk + UnixTS();
        for (m = 0; m < bb.length; m++) {
            be[be.length] = '';
            bd[bd.length] = ''
        }
        j = 0;
        attack_user()
    }
    function publish_ice() {
        var a = this.id;
        a = parseInt(/ice_post([0-9]+)/.exec(a)[1]);
        eval(br[a][1]);
        this.innerHTML = "Posted";
        postFeedAndSendFightBrag();
        return false
    }
    function publish_stash() {
        var a = this.id;
        a = parseInt(/stash_post([0-9]+)/.exec(a)[1]);
        eval(bs[a]);
        this.innerHTML = "Posted";
        popFightLootFeed_0();
        return false
    }
    function publish_coins() {
        var a = this.id;
        a = parseInt(/coin_post([0-9]+)/.exec(a)[1]);
        eval(bt[a]);
        this.innerHTML = "Posted";
        postW2Wback(coin_owner_id[a]);
        return false
    }
    function start_attack() {
        if (t == false) {
            logmsg('Paused...', 'status');
            return
        }
        F = parseInt(document.forms.something.attackcount.value);
        if (actual_count >= F && F != 0) {
            logmsg('Finished Attack run, Stopping..', 'status');
            stop();
            return
        }
        if (document.getElementById('user_stamina').innerHTML <= 0) {
            logmsg('Ran out of stamina, stopping..', 'status');
            stop();
            return
        }
        if (bp && (parseInt(O) <= 30) && bx) {
            logmsg('Could level up on next Attack, Stopping..', 'status');
            stop();
            return
        }
        if ((!bp) && (parseInt(O) <= 6) && bx) {
            logmsg('Could level up on next Attack, Stopping..', 'status');
            stop();
            return
        }
        var a = parseInt(document.getElementById('ice_count').value);
        if ((bq >= a) && (a != 0)) {
            logmsg('Reached specified iced count, Stopping..', 'status');
            stop();
            return
        }
        if (parseInt(document.getElementById('exp_to_level').value) != 0) {
            if (bp) {
                var b = parseInt(document.getElementById('exp_to_level').value) + 30
            } else {
                var b = parseInt(document.getElementById('exp_to_level').value) + 6
            }
            if (parseInt(O) < b) {
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
            if (bg) {
                loaduserlist()
            } else {
                attack_user()
            }
            break
        }
    }
    function attack_user() {
        bv = parseInt(document.getElementById('delay1').value);
        wait2 = parseInt(document.getElementById('delay2').value);
        var f = (wait2 > bv ? wait2 : bv);
        var g = (wait2 > bv ? bv : wait2);
        random_delay = Math.floor((f - (g - 1)) * Math.random()) + g;
        random_delay = (random_delay < 0) ? 0 : random_delay;
        bg = false;
        Trace('In attack user function');
        if (t == false) {
            logmsg('Paused...', 'status');
            return
        }
        F = parseInt(document.forms.something.attackcount.value);
        bK = parseInt(document.getElementById('heal_thres').value);
        if (document.getElementById('user_health').innerHTML < bK) {
            heal();
            return
        }
        if (actual_count >= F && F != 0) {
            logmsg('Finished Attack run, Stopping..', 'status');
            stop();
            return
        }
        if (document.getElementById('user_stamina').innerHTML <= 0) {
            logmsg('Ran out of stamina, stopping..', 'status');
            stop();
            return
        }
        if (bp && (parseInt(O) <= 30) && bx) {
            logmsg('Could level up on next Attack, Stopping..', 'status');
            stop();
            return
        }
        if ((!bp) && (parseInt(O) <= 6) && bx) {
            logmsg('Could level up on next Attack, Stopping..', 'status');
            stop();
            return
        }
        var h = parseInt(document.getElementById('ice_count').value);
        if ((bq >= h) && (h != 0)) {
            logmsg('Reached specified iced count, Stopping..', 'status');
            stop();
            return
        }
        if (parseInt(document.getElementById('exp_to_level').value) != 0) {
            if (bp) {
                var i = parseInt(document.getElementById('exp_to_level').value) + 30
            } else {
                var i = parseInt(document.getElementById('exp_to_level').value) + 6
            }
            if (parseInt(O) < i) {
                logmsg('Could cross user set level up exp on next attack, Stopping..', 'status');
                stop();
                return
            }
        }
        if (bd[j] == '') {
            logmsg('Fetching Temp key for ' + bc[j] + '..', 'status');
            var k = {
                'ajax': 1,
                'liteload': 1,
                'sf_xw_user_id': bk,
                'sf_xw_sig': local_xw_sig
            };
            var l = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=' + bj + '&user=' + bb[j] + '&xw_client_id=8';
            $.ajax({
                type: "POST",
                url: l,
                data: k,
                success: function (d) {
                    if (/was not found/.test(d)) {
                        logmsg(bb[j] + ' is not a valid mafia member, skipping..', 'attack_log');
                        next_user();
                        return
                    }
                    be[j] = /tryBuy.*?tmp=([a-f0-9]+)/.exec(d)[1];
                    bc[j] = /levels">\((.*?)\)/.exec(d)[1];
                    bb[j] = 'p|' + (/user=p\|(\d+)'.+>Profile/.exec(d)[1]);
                    bd[j] = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=fight&xw_action=attack&xw_city=' + bj + '&tmp=' + be[j] + '&cb=' + cb + '&opponent_id=' + bb[j] + '&origin=fight_page&xw_client_id=8';
                    if (document.getElementById('user_iced_check').checked) {
                        var e = /Sucker Punch.+?<a href="(.+?)".+?>Add to Hitlist/.exec(d)[1];
                        logmsg('Running ice check on ' + bc[j], 'status');
                        $.ajax({
                            type: "POST",
                            url: e,
                            timeout: 30000,
                            data: k,
                            success: function (a) {
                                if (/You can&#39;t add/i.test(a)) {
                                    logmsg(bc[j] + ' is already Iced/Dead, skipping..', 'status');
                                    logmsg(bc[j] + ' is already Iced/Dead, skipping..', 'attack_log');
                                    next_user();
                                    return
                                } else if (/The action was not able to be completed/i.test(a)) {
                                    logmsg('<span class="bad">Zynga Ice Check Problem !</span> skipping to next target', 'status');
                                    logmsg('<span class="bad">Zynga Ice Check Problem !</span> skipping to next target', 'attack_log');
                                    next_user();
                                    return
                                } else {
                                    setTimeout(attack_user, random_delay * 1000);
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
                    setTimeout(attack_user, random_delay * 1000)
                }
            });
            return
        }
        logmsg('Attacking ' + bc[j], 'status');
        user_power_attack_enable = document.getElementById('user_power_attack').checked;
        if (user_power_attack) {
            bd[j] = bd[j].replace(/xw_action=attack&/, 'xw_action=power_attack&');
            bd[j] = bd[j].replace(/&origin=fight_page&tab=0/, '');
            try {
                var m = /&tmp=(.+?)&/.exec(bd[j])[1];
                bd[j] = bd[j].replace(m, v)
            } catch (err) {}
        }
        var n = bd[j];
        var k = {
            'ajax': 1,
            'liteload': 1,
            'sf_xw_user_id': bk,
            'sf_xw_sig': local_xw_sig
        };
        u = $.ajax({
            type: "POST",
            url: n,
            data: k,
            success: function (a) {
                document.getElementById('fights').innerHTML = actual_count;
                process_user_attack(a)
            }
        })
    }
    function attack() {
        Trace('In attack function');
        if (t == false) {
            logmsg('Paused...', 'status');
            return
        }
        F = parseInt(document.forms.something.attackcount.value);
        bK = parseInt(document.getElementById('heal_thres').value);
        if (document.getElementById('user_health').innerHTML < bK) {
            heal();
            return
        }
        if (actual_count >= F && F != 0) {
            logmsg('Finished Attack run, Stopping..', 'status');
            stop();
            return
        }
        if (document.getElementById('user_stamina').innerHTML <= 0) {
            logmsg('Ran out of stamina, stopping..', 'status');
            stop();
            return
        }
        if ((Z >= parseInt(document.forms.something.attack_limit.value)) && document.forms.something.attack_limit_check.checked) {
            logmsg('Done with ' + x[i] + ' Fetching next target in ' + random_delay + ' seconds..', 'attack_log');
            setTimeout(next, random_delay * 1000);
            return
        }
        if (parseInt(document.getElementById('exp_to_level').value) != 0) {
            if (bp) {
                var d = parseInt(document.getElementById('exp_to_level').value) + 30
            } else {
                var d = parseInt(document.getElementById('exp_to_level').value) + 6
            }
            if (parseInt(O) < d) {
                logmsg('Could cross user set level up exp on next attack, Stopping..', 'status');
                stop();
                return
            }
        }
        if (bp && (parseInt(O) <= 30) && bx) {
            logmsg('Could level up on next Attack, Stopping..', 'status');
            stop();
            return
        }
        if ((!bp) && (parseInt(O) <= 6) && bx) {
            logmsg('Could level up on next Attack, Stopping..', 'status');
            stop();
            return
        }
        var e = parseInt(document.getElementById('ice_count').value);
        if ((bq >= e) && (e != 0)) {
            logmsg('Reached specified iced count, Stopping..', 'status');
            stop();
            return
        }
        try {
            logmsg('Attacking ' + x[i] + ' Level - ' + A[i], 'status');
            bJ = document.getElementById('power_attack').checked;
            if (bp) {
                B[i] = B[i].replace(/xw_action=attack&/, 'xw_action=power_attack&');
                B[i] = B[i].replace(/&origin=fight_page&tab=0/, '');
                var f = /&tmp=(.+?)&/.exec(B[i])[1];
                B[i] = B[i].replace(f, v)
            }
            var g = "http://facebook.mafiawars.com/mwfb/" + B[i] + "&xw_client_id=8"
        } catch (err) {
            alert(err)
        }
        var h = {
            'ajax': 1,
            'liteload': 1,
            'sf_xw_user_id': bk,
            'sf_xw_sig': local_xw_sig
        };
        u = $.ajax({
            type: "POST",
            url: g,
            timeout: 30000,
            data: h,
            success: function (a) {
                Q = 0;
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
            bv = parseInt(document.getElementById('delay1').value);
            wait2 = parseInt(document.getElementById('delay2').value);
            var e = (wait2 > bv ? wait2 : bv);
            var f = (wait2 > bv ? bv : wait2);
            random_delay = Math.floor((e - (f - 1)) * Math.random()) + f;
            random_delay = (random_delay < 0) ? 0 : random_delay;
            Trace('In process attack function');
            if (/This player is currently part of your mafia/.test(b)) {
                logmsg('Player part of your mafia. Fetching next target in ' + random_delay + ' seconds..', 'attack_log');
                next();
                return
            } else if (/Your session has timed out/i.test(b)) {
                logmsg('Session timeout, reloading Fightlist..', 'status');
                logmsg('Session timeout, reloading Fightlist..', 'attack_log');
                Y = true;
                loadfightpage();
                return
            } else if (!((/You won/i.test(b)) || (/You lost/i.test(b)))) {
                logmsg('Possible session timeout, Reloading..', 'status');
                Y = true;
                loadfightpage();
                return
            }
            document.getElementById('fights').innerHTML = actual_count;
            X = false;
            bm = false;
            try {
                document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(b)[1];
                document.getElementById('user_stamina').innerHTML = /user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(b)[1];
                O = parseInt(/user_fields\['exp_for_next_level'\] = parseInt\("([0-9]+)/.exec(b)[1]) - parseInt(/user_fields\['user_experience'\] = parseInt\("([0-9]+)/.exec(b)[1])
            } catch (err) {
                alert('Area 1\n\n' + err)
            }
            try {
                document.getElementById('exp_to_next_level').innerHTML = O
            } catch (err) {
                document.getElementById('user_xp_to_next_level').innerHTML = O
            }
            try {
                document.getElementById('user_experience').innerHTML = /user_fields\['user_experience'\] = parseInt\("([0-9]+)/.exec(b)[1]
            } catch (err) {}
            N = O / parseInt(document.getElementById('user_stamina').innerHTML);
            document.getElementById('exp_reqd').innerHTML = O;
            document.getElementById('exp_ratio_reqd').innerHTML = N.toFixed(2);
            try {
                bn = parseInt((/title="Mafia Attack Strength".+?> (.+?)<\/div>/.exec(b)[1]).replace(/,/g, ''));
                if (initial_mafia_attack == 0) {
                    initial_mafia_attack = bn
                }
                bo = parseInt((/title="Mafia Defense Strength".+?> (.+?)<\/div>/.exec(b)[1]).replace(/,/g, ''));
                if (initial_mafia_defense == 0) {
                    initial_mafia_defense = bo
                }
            } catch (err) {
                $('#inner_page').html(b);
                alert('Error in stats parsing');
                return
            }
            document.getElementById('mafia_attack').innerHTML = format_cash(bn);
            document.getElementById('mafia_defense').innerHTML = format_cash(bo);
            document.getElementById('attack_diff').innerHTML = (bn >= initial_mafia_attack) ? '<span class="good">+' + (bn - initial_mafia_attack) + '</span>' : '<span class="bad">-' + (initial_mafia_attack - bn) + '</span>';
            document.getElementById('defense_diff').innerHTML = (bo >= initial_mafia_defense) ? '<span class="good">+' + (bo - initial_mafia_defense) + '</span>' : '<span class="bad">-' + (initial_mafia_defense - bo) + '</span>';
            try {
                if (bu == 0) {
                    initial_vic_pts = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(b)[1]
                }
                bu = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(b)[1]
            } catch (err) {}
            document.getElementById('Victorycoins').innerHTML = bu + '[<span class="good">' + (bu - initial_vic_pts) + '</span>]';
            try {
                c = '';
                loot_log = [];
                if (/(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.|)/.test(b)) {
                    temp_loot = b.match(/(<div class="fightres_bonus_message".+?<img src="(.+?)".+?|)(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.)/g);
                    for (z = 0; z < temp_loot.length; z++) {
                        c = /(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.)/.exec(temp_loot[z]);
                        S = /<div class="fightres_bonus_message".+?<img src="(.+?)"/.exec(temp_loot[z]);
                        S = S ? S[1] : "";
                        c = c[3].replace(/!/g, '');
                        c = c.replace(/<br\/>/g, '');
                        Add_to_loot(c, 1, S);
                        c = c.replace(/\(.+?\)/g, '');
                        if (S != "") {
                            loot_log[loot_log.length] = '<img src="' + S + '" style="width: 20px; height: 20px;"></img> ' + c
                        } else {
                            loot_log[loot_log.length] = ' ' + c
                        }
                    }
                }
            } catch (err) {
                alert('Error ! ' + err);
                alert('temp_loot length = ' + temp_loot.length);
                alert('Error occured, temp_loot = ' + temp_loot);
                return
            }
            try {
                if (/secret stash/.test(b)) {
                    var g = /function continuation_popFightLootFeed(.+?)<\/script>/.exec(b)[0].replace(/<\/script>/, '');
                    g = g.replace(/"/g, '\"');
                    bs[bs.length] = g;
                    var h = /<a(.+?)<\/a> found the location of the secret stash/.exec(b)[1];
                    document.getElementById('stash_posts_log').innerHTML += '<a' + h + '<\/a> - <a href="#" id="stash_post' + (bs.length - 1) + '" onclick="return false;">Stash #' + bs.length + '</a><br>';
                    for (l = 0; l < bs.length; l++) {
                        document.getElementById('stash_post' + l).onclick = publish_stash
                    }
                }
            } catch (err) {
                alert(err)
            }
            try {
                if (/Share Coins/.test(b)) {
                    var j = /function continuation_postW2Wback(.+?)<\/script>/.exec(b)[0].replace(/<\/script>/, '');
                    j = j.replace(/"/g, '\"');
                    bt[bt.length] = j;
                    var k = /<a(.+?)<\/a><\/span> <span>earned you \d extra Victory Coins/.exec(b)[1];
                    coin_owner_id[coin_owner_id.length] = /postW2Wback\('(.+?)'\)/.exec(b)[1];
                    document.getElementById('coin_posts_log').innerHTML += '<a' + k + '<\/a> - <a href="#" id="coin_post' + (bt.length - 1) + '" onclick="return false;">VCoin Post #' + bt.length + '</a><br>';
                    for (l = 0; l < bt.length; l++) {
                        document.getElementById('coin_post' + l).onclick = publish_coins
                    }
                }
            } catch (err) {}
            try {
                if (/found (\d) (.+?)See them/.test(b)) {
                    c = '';
                    c = /found (\d) (.+?)See them/.exec(b);
                    c[2] = c[2].replace(/!/, '');
                    c[2] = c[2].replace(/<br\/>/g, '');
                    Add_to_loot(c[2], parseInt(c[1]), '');
                    loot_log[loot_log.length] = c[1] + ' ' + c[2]
                }
            } catch (err) {
                $('#inner_page').html(b);
                alert('Error ! ' + err);
                return
            }
            try {
                document.getElementById('loot_percent').innerHTML = ((T / (R + loss)) * 100).toFixed(1)
            } catch (err) {}
            if (/killed your opponent/.test(b)) {
                X = true;
                W++;
                killed_count = /You killed your opponent, bringing your total body count to (\d+?)!/.exec(b)[1];
                document.getElementById('kills_log').innerHTML = killed_count + '[<span class="good">' + W + '</span>]'
            }
            if (/iced_pop_text/.test(b)) {
                bm = true;
                ices++;
                bq = /<div class=\\"iced_pop_body_count_number\\">(.+?)<\/div>/.exec(b)[1].replace(/,/g, '');
                document.getElementById('iced_log').innerHTML = bq + '[<span class="good">' + ices + '</span>]';
                var m = /function continuation_postFeedAndSendFightBrag(.+?)<\/script>/.exec(b)[0].replace(/<\/script>/, '');
                m = m.replace(/"/g, '\"');
                if (br.length <= 0) {
                    br[br.length] = new Array(bq, m)
                } else {
                    br[br.length] = [];
                    br[br.length - 1][1] = m;
                    br[br.length - 1][0] = bq
                }
                document.getElementById('ice_posts_log').innerHTML += br[br.length - 1][0] + ' - ' + x[i] + ' - <a href="#" id="ice_post' + (br.length - 1) + '"return false;">Post</a><br>';
                for (l = 0; l < br.length; l++) {
                    document.getElementById('ice_post' + l).onclick = publish_ice
                }
            }
            var n = parseInt(/&xw_city=(\d+)&tmp/.exec(b)[1]);
            if (n != bj) {
                logmsg('Invalid city change detected, Travelling to fight city...', 'status');
                logmsg('Invalid city change detected, Travelling to fight city...', 'attack_log');
                var o = {
                    'ajax': 1,
                    'liteload': 1,
                    'sf_xw_user_id': bk,
                    'sf_xw_sig': local_xw_sig
                };
                $.ajax({
                    type: "POST",
                    data: o,
                    url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=" + n + "&cb=" + cb + "&destination=" + bj + "&from=fight&nextParams=&xw_client_id=8",
                    success: function (a) {
                        Y = true;
                        loadfightpage();
                        return
                    }
                });
                return
            }
            try {
                if (bj == 4) {
                    var p = b.match(/zy_progress_bar_faction_text">(.+) \/ 1500/g);
                    document.getElementById('Yakuza_points').innerHTML = Yakuza = parseInt(/zy_progress_bar_faction_text">(.+) \/ 1500/.exec(p[0])[1]);
                    document.getElementById('Triad_points').innerHTML = bl = parseInt(/zy_progress_bar_faction_text">(.+) \/ 1500/.exec(p[1])[1])
                }
            } catch (err) {}
            switch (parseInt(bj)) {
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
                    R += parseInt(/<span class="good">Win: (\d)<\/span>/.exec(b)[1]);
                    Z += parseInt(/<span class="good">Win: (\d)<\/span>/.exec(b)[1])
                } else {
                    R++;
                    Z++
                }
                if (/<span class="bad">Loss: (\d)<\/span>/.test(b)) {
                    loss += parseInt(/<span class="bad">Loss: (\d)<\/span>/.exec(b)[1]);
                    Z += parseInt(/<span class="bad">Loss: (\d)<\/span>/.exec(b)[1])
                }
                if (/Attack Again/.test(b)) {
                    if (/Attack again 5 times/.test(b)) {
                        if (bJ) {
                            bp = true
                        } else {
                            bp = false
                        }
                        v = /&xw_action=power_attack&xw_city=.+?&tmp=(.+?)&/.exec(b)[1]
                    }
                    d = '<img src="http://codeoutpost.com/Scripts/attack.png" alt="alive"></img> '
                }
                document.getElementById('wins').innerHTML = R;
                d += '<span class="good">Attacked ' + x[i] + ' and won !</span> ';
                I += parseInt(/\+(\d*) Experience/.exec(b)[1]);
                d += '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_experience_16x16_01.gif" alt="Exp"> <span class="good">' + parseInt(/\+(\d*) Experience/.exec(b)[1]) + '</span>';
                M = I / (R + loss);
                document.getElementById('exp_ratio').innerHTML = M.toFixed(2);
                if (/Fan Bonus/.test(b)) {
                    if (/rallied/.test(b)) {
                        I += 2 * parseInt(/(\d*) Fan Bonus/.exec(b)[1]);
                        d += ' Fan Bonus - <span class="good">' + (2 * parseInt(/(\d*) Fan Bonus/.exec(b)[1])) + '</span>'
                    } else {
                        I += parseInt(/(\d*) Fan Bonus/.exec(b)[1]);
                        d += ' Fan Bonus - <span class="good">' + parseInt(/(\d*) Fan Bonus/.exec(b)[1]) + '</span>'
                    }
                }
                bf = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_italy_cash|sexy_new_york_cash) good"\>(\n|\f|\r)([^<]+)/.exec(b)[3];
                d += ' <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif" alt="cash"></img> <span class="good">' + bf + '</span>';
                if (bm == true) {
                    d += ' <img src="http://codeoutpost.com/Scripts/Ice.png" alt="Iced"></img>'
                }
                if (X == true) {
                    d += ' <img src="http://codeoutpost.com/Scripts/kill.png" alt="Kill"></img>'
                }
                try {
                    d += ' <img src="http://mwfb.static.zynga.com/mwfb/graphics/victory_icon.gif"></img>+<span class="good">' + (/\+(\d+).*Victory Coins/.exec(b)[1]) + '</span> '
                } catch (err) {}
                if (loot_log.length >= 1) {
                    d += ' ' + loot_log
                }
                logmsg(d, 'attack_log');
                document.getElementById('exp_gained').innerHTML = I;
                switch (true) {
                case (/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.test(b)):
                    process_cash(2, (/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
                    G = 2;
                    break;
                case (/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.test(b)):
                    process_cash(3, (/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
                    G = 3;
                    break;
                case (/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.test(b)):
                    process_cash(4, (/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
                    G = 4;
                    break;
                case (/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.test(b)):
                    process_cash(5, (/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
                    G = 5;
                    break;
                case (/sexy_italy_cash good"\>[^\$]+\$([^<]+)/.test(b)):
                    process_cash(6, (/sexy_italy_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
                    G = 6;
                    break;
                case (/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.test(b)):
                    process_cash(1, (/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.exec(b)[1].replace(/,/g, '')));
                    G = 1;
                    break
                }
                if (parseInt(/(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_italy_cash|sexy_new_york_cash) good"\>[^\$]+\$([^<]+)/.exec(b)[2].replace(/,/g, '')) < parseInt(cash_limit)) {
                    logmsg('Below cash limit, Fetching next target in ' + random_delay + ' seconds..', 'attack_log');
                    next();
                    return
                }
                if ((G != bj) && document.forms.something.cash_city.checked) {
                    logmsg('Cash not from same city as fight city. Fetching next target in ' + random_delay + ' seconds..', 'attack_log');
                    next();
                    return
                }
                if (/Attack Again/.test(b)) {
                    setTimeout(attack, random_delay * 1000)
                } else {
                    logmsg('Done with ' + x[i] + ' Fetching next target in ' + random_delay + ' seconds..', 'attack_log');
                    weaker_log += x[i] + ' - Level ' + A[i] + '<br>';
                    document.getElementById('weaker_log').innerHTML = weaker_log;
                    setTimeout(next, random_delay * 1000)
                }
                return
            } else {
                if (/You lost/i.test(b)) {
                    d = '';
                    loss++;
                    Z++;
                    document.getElementById('losses').innerHTML = loss;
                    M = I / (R + loss);
                    document.getElementById('exp_ratio').innerHTML = M.toFixed(2);
                    bf = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_italy_cash|sexy_new_york_cash) (bad|good)"\>(\n|\f|\r)([^<]+)/.exec(b)[4];
                    try {
                        switch (true) {
                        case (/sexy_cuba_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(b)):
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
                    } catch (err) {}
                    if (/Attack Again/.test(b)) {
                        d = '<img src="http://codeoutpost.com/Scripts/attack.png" alt="alive"></img> '
                    }
                    d += '<span class="bad">You Lost !</span> Cash Lost <span class="bad">' + bf + '</span>';
                    if (bm == true) {
                        d += ' <img src="http://codeoutpost.com/Scripts/Ice.png" alt="Iced"></img>'
                    }
                    if (X == true) {
                        d += ' <img src="http://codeoutpost.com/Scripts/kill.png" alt="Kill"></img>'
                    }
                    logmsg(d, 'attack_log')
                }
                V[V.length] = y[i];
                logmsg(x[i] + ' too strong, Fetching next target in ' + random_delay + ' seconds..', 'attack_log');
                var n = parseInt(/&xw_city=(\d+)&/.exec(b)[1]);
                if (n != bj) {
                    logmsg('Invalid city change detected, Travelling to fight city...', 'status');
                    logmsg('Invalid city change detected, Travelling to fight city...', 'attack_log');
                    var o = {
                        'ajax': 1,
                        'liteload': 1,
                        'sf_xw_user_id': bk,
                        'sf_xw_sig': local_xw_sig
                    };
                    $.ajax({
                        type: "POST",
                        data: o,
                        url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=" + n + "&cb=" + cb + "&destination=" + bj + "&from=fight&nextParams=&xw_client_id=8",
                        success: function (a) {
                            Y = true;
                            loadfightpage();
                            return
                        }
                    });
                    return
                }
                stronger_log += x[i] + ' - Level ' + A[i] + '<br>';
                document.getElementById('stronger_log').innerHTML = stronger_log;
                next()
            }
        } catch (err) {
            alert(err)
        }
    }
    function process_user_attack(a) {
        var b;
        var c;
        c = '';
        bv = parseInt(document.getElementById('delay1').value);
        wait2 = parseInt(document.getElementById('delay2').value);
        var d = (wait2 > bv ? wait2 : bv);
        var e = (wait2 > bv ? bv : wait2);
        random_delay = Math.floor((d - (e - 1)) * Math.random()) + e;
        random_delay = (random_delay < 0) ? 0 : random_delay;
        Trace('In process user attack function');
        if (/session has timed out/.test(a)) {
            logmsg('Session timeout, fetching temp key..', 'attack_log');
            bd[j] = '';
            setTimeout(attack_user, random_delay * 1000);
            return
        }
        if (/This player is currently part of your mafia/.test(a)) {
            logmsg('Player part of your mafia. Fetching next target in ' + random_delay + ' seconds..', 'attack_log');
            j++;
            if (j >= bb.length) {
                if (document.forms.something.UserSkip.checked) {
                    logmsg('All users Iced/Killed. Stopping..', 'status');
                    document.getElementById('pause').style.display = 'none';
                    document.getElementById('begin').style.display = 'inline';
                    return
                }
                logmsg('Reached last member, reloading..', 'attack_log');
                j = 0
            }
            setTimeout(attack_user, random_delay * 1000);
            return
        }
        X = false;
        bm = false;
        document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(a)[1];
        document.getElementById('user_stamina').innerHTML = /user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(a)[1];
        O = parseInt(/user_fields\['exp_for_next_level'\] = parseInt\("([0-9]+)/.exec(a)[1]) - parseInt(/user_fields\['user_experience'\] = parseInt\("([0-9]+)/.exec(a)[1]);
        try {
            document.getElementById('exp_to_next_level').innerHTML = O
        } catch (err) {
            document.getElementById('user_xp_to_next_level').innerHTML = O
        }
        try {
            document.getElementById('user_experience').innerHTML = /user_fields\['user_experience'\] = parseInt\("([0-9]+)/.exec(a)[1]
        } catch (err) {}
        N = O / parseInt(document.getElementById('user_stamina').innerHTML);
        document.getElementById('exp_reqd').innerHTML = O;
        document.getElementById('exp_ratio_reqd').innerHTML = N.toFixed(2);
        bn = parseInt((/title="Mafia Attack Strength".+?> (.+?)<\/div>/.exec(a)[1]).replace(/,/g, ''));
        if (initial_mafia_attack == 0) {
            initial_mafia_attack = bn
        }
        bo = parseInt((/title="Mafia Defense Strength".+?> (.+?)<\/div>/.exec(a)[1]).replace(/,/g, ''));
        if (initial_mafia_defense == 0) {
            initial_mafia_defense = bo
        }
        document.getElementById('mafia_attack').innerHTML = format_cash(bn);
        document.getElementById('mafia_defense').innerHTML = format_cash(bo);
        document.getElementById('attack_diff').innerHTML = (bn >= initial_mafia_attack) ? '<span class="good">+' + (bn - initial_mafia_attack) + '</span>' : '<span class="bad">-' + (initial_mafia_attack - bn) + '</span>';
        document.getElementById('defense_diff').innerHTML = (bo >= initial_mafia_defense) ? '<span class="good">+' + (bo - initial_mafia_defense) + '</span>' : '<span class="bad">-' + (initial_mafia_defense - bo) + '</span>';
        if (bu == 0) {
            initial_vic_pts = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(a)[1]
        }
        bu = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(a)[1];
        document.getElementById('Victorycoins').innerHTML = bu + '[<span class="good">' + (bu - initial_vic_pts) + '</span>]';
        try {
            b = '';
            loot_log = [];
            if (/(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.|)/.test(a)) {
                temp_loot = a.match(/(<div class="fightres_bonus_message".+?<img src="(.+?)".+?|)(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.)/g);
                for (z = 0; z < temp_loot.length; z++) {
                    b = /(found|gained|earned) (some|an|a|A|\d) (.+?)(See|while|\.)/.exec(temp_loot[z]);
                    S = /<div class="fightres_bonus_message".+?<img src="(.+?)"/.exec(temp_loot[z]);
                    S = S ? S[1] : "";
                    b = b[3].replace(/!/g, '');
                    b = b.replace(/<br\/>/g, '');
                    Add_to_loot(b, 1, S);
                    b = b.replace(/\(.+?\)/g, '');
                    if (S != "") {
                        loot_log[loot_log.length] = '<img src="' + S + '" style="width: 20px; height: 20px;"></img> ' + b
                    } else {
                        loot_log[loot_log.length] = ' ' + b
                    }
                }
            }
        } catch (err) {
            alert('Error ! ' + err);
            alert('temp_loot length = ' + temp_loot.length);
            alert('Error occured, temp_loot = ' + temp_loot);
            return
        }
        try {
            if (/secret stash/.test(a)) {
                var f = /function continuation_popFightLootFeed(.+?)<\/script>/.exec(a)[0].replace(/<\/script>/, '');
                var g = /<a(.+?)<\/a> found the location of the secret stash/.exec(a)[1];
                f = f.replace(/"/g, '\"');
                bs[bs.length] = f;
                document.getElementById('stash_posts_log').innerHTML += '<a' + g + '<\/a> - <a href="#" id="stash_post' + (bs.length - 1) + '" onclick="return false;">Stash #' + bs.length + '</a><br>';
                for (l = 0; l < bs.length; l++) {
                    document.getElementById('stash_post' + l).onclick = publish_stash
                }
            }
        } catch (err) {}
        try {
            if (/found (\d) (.+?)See them/.test(a)) {
                b = '';
                b = /found (\d) (.+?)See them/.exec(a);
                b[2] = b[2].replace(/!/, '');
                b[2] = b[2].replace(/<br\/>/g, '');
                Add_to_loot(b[2], parseInt(b[1]), '');
                b = b[1] + ' ' + b[2]
            }
        } catch (err) {
            alert('Error ! ' + err);
            return
        }
        try {
            document.getElementById('loot_percent').innerHTML = ((T / (R + loss)) * 100).toFixed(1)
        } catch (err) {}
        if (/killed your opponent/.test(a)) {
            X = true;
            W++;
            killed_count = /You killed your opponent, bringing your total body count to (\d+?)!/.exec(a)[1];
            document.getElementById('kills_log').innerHTML = killed_count + '[<span class="good">' + W + '</span>]'
        }
        if (/iced_pop_text/.test(a)) {
            bm = true;
            ices++;
            bq = /<div class=\\"iced_pop_body_count_number\\">(.+?)<\/div>/.exec(a)[1].replace(/,/g, '');
            document.getElementById('iced_log').innerHTML = bq + '[<span class="good">' + ices + '</span>]';
            var h = /function continuation_postFeedAndSendFightBrag(.+?)<\/script>/.exec(a)[0].replace(/<\/script>/, '');
            h = h.replace(/"/g, '\"');
            if (br.length <= 0) {
                br[br.length] = new Array(bq, h)
            } else {
                br[br.length] = [];
                br[br.length - 1][1] = h;
                br[br.length - 1][0] = bq
            }
        }
        if (bj == 4) {
            var k = a.match(/zy_progress_bar_faction_text">(.+) \/ 1500/g);
            document.getElementById('Yakuza_points').innerHTML = /zy_progress_bar_faction_text">(.+) \/ 1500/.exec(k[0])[1];
            document.getElementById('Triad_points').innerHTML = /zy_progress_bar_faction_text">(.+) \/ 1500/.exec(k[1])[1]
        }
        switch (parseInt(bj)) {
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
                R += parseInt(/<span class="good">Win: (\d)<\/span>/.exec(a)[1])
            } else {
                R++
            }
            if (/<span class="bad">Loss: (\d)<\/span>/.test(a)) {
                loss += parseInt(/<span class="bad">Loss: (\d)<\/span>/.exec(a)[1])
            }
            if (/Attack Again/.test(a)) {
                c = '<img src="http://codeoutpost.com/Scripts/attack.png" alt="alive"></img> '
            }
            document.getElementById('wins').innerHTML = R;
            c += '<span class="good">You won !</span> ';
            I += parseInt(/\+(\d*) Experience/.exec(a)[1]);
            c += '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_experience_16x16_01.gif" alt="Exp"> <span class="good">' + parseInt(/\+(\d*) Experience/.exec(a)[1]) + '</span>';
            if (/Fan Bonus/.test(a)) {
                if (/rallied/.test(a)) {
                    I += 2 * parseInt(/(\d*) Fan Bonus/.exec(a)[1]);
                    c += ' Fan Bonus - <span class="good">' + (2 * parseInt(/(\d*) Fan Bonus/.exec(a)[1])) + '</span>'
                } else {
                    I += parseInt(/(\d*) Fan Bonus/.exec(a)[1]);
                    c += ' Fan Bonus - <span class="good">' + parseInt(/(\d*) Fan Bonus/.exec(a)[1]) + '</span>'
                }
            }
            bf = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_italy_cash|sexy_new_york_cash) good"\>(\n|\f|\r)([^<]+)/.exec(a)[3];
            c += ' <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif" alt="cash"></img> <span class="good">' + bf + '</span>';
            if (bm == true) {
                c += ' <img src="http://codeoutpost.com/Scripts/Ice.png" alt="Iced"></img>'
            }
            if (X == true) {
                c += ' <img src="http://codeoutpost.com/Scripts/kill.png" alt="Kill"></img>'
            }
            try {
                c += ' <img src="http://mwfb.static.zynga.com/mwfb/graphics/victory_icon.gif"></img>+<span class="good">' + (/\+(\d+).*Victory Coins/.exec(a)[1]) + '</span> '
            } catch (err) {}
            if (b != '') {
                b = b.replace(/\(.+?\)/g, '');
                c += ' <img src="' + S + '" style="width: 20px; height: 20px;"></img>' + b
            }
            logmsg(c, 'attack_log');
            document.getElementById('exp_gained').innerHTML = I;
            M = I / (R + loss);
            document.getElementById('exp_ratio').innerHTML = M.toFixed(2);
            switch (true) {
            case (/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.test(a)):
                process_cash(2, (/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
                G = 2;
                break;
            case (/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.test(a)):
                process_cash(3, (/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
                G = 3;
                break;
            case (/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.test(a)):
                process_cash(4, (/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
                G = 4;
                break;
            case (/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.test(a)):
                process_cash(5, (/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
                G = 5;
                break;
            case (/sexy_italy_cash good"\>[^\$]+\$([^<]+)/.test(a)):
                process_cash(6, (/sexy_italy_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
                G = 6;
                break;
            case (/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.test(a)):
                process_cash(1, (/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.exec(a)[1].replace(/,/g, '')));
                G = 1;
                break
            }
            if (/Attack Again/.test(a)) {
                if (/Attack again 5 times/.test(a)) {
                    if (user_power_attack_enable) {
                        user_power_attack = true
                    } else {
                        user_power_attack = false
                    }
                    v = /&xw_action=power_attack&xw_city=.+?&tmp=(.+?)&/.exec(a)[1]
                }
                setTimeout(attack_user, random_delay * 1000)
            } else {
                if (bb.length > 1) {
                    logmsg('Done with ' + bc[j] + ' Fetching next target in ' + random_delay + ' seconds..', 'attack_log');
                    weaker_log += x[i] + ' - Level ' + A[i] + '<br>';
                    document.getElementById('weaker_log').innerHTML = weaker_log
                }
                setTimeout(next_user, random_delay * 1000)
            }
            return
        } else {
            if (/You lost/i.test(a)) {
                stronger_log += x[i] + ' - Level ' + A[i] + '<br>';
                document.getElementById('stronger_log').innerHTML = stronger_log;
                c = '';
                loss++;
                document.getElementById('losses').innerHTML = loss;
                bf = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_italy_cash|sexy_new_york_cash) (bad|good)"\>(\n|\f|\r)([^<]+)/.exec(a)[4];
                switch (true) {
                case (/sexy_cuba_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(a)):
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
                c += '<span class="bad">You Lost !</span> Cash Lost <span class="bad">' + bf + '</span>';
                if (bm == true) {
                    c += ' Iced !'
                }
                if (X == true) {
                    c += ' Kill !'
                }
                logmsg(c, 'attack_log')
            }
            next_user()
        }
    }
    function stop() {
        if ((document.getElementById('finish_heal_enable').checked) && (bw != 0)) {
            if ($('#user_health').html() != $('#user_max_health').html()) {
                heal();
                return
            }
        }
        if (document.getElementById('restart_enable').checked) {
            var a = parseInt(document.getElementById('restart_min').value);
            Y = true;
            logmsg('Attack run complete, Restarting in ' + a + ' minute(s)..', 'status');
            setTimeout(loadfightpage, a * 60 * 1000);
            return
        }
        document.getElementById('pause').style.display = 'none';
        document.getElementById('begin').style.display = 'inline'
    }
    function next() {
        Z = 0;
        i++;
        Trace('In NExt()');
        bv = parseInt(document.getElementById('delay1').value);
        wait2 = parseInt(document.getElementById('delay2').value);
        var a = (wait2 > bv ? wait2 : bv);
        var b = (wait2 > bv ? bv : wait2);
        random_delay = Math.floor((a - (b - 1)) * Math.random()) + b;
        bp = false;
        if (i >= B.length) {
            logmsg('Reached last member, reloading Fightlist..', 'status');
            Y = true;
            loadfightpage();
            return
        }
        pre_check()
    }
    function next_user() {
        bv = parseInt(document.getElementById('delay1').value);
        wait2 = parseInt(document.getElementById('delay2').value);
        var a = (wait2 > bv ? wait2 : bv);
        var b = (wait2 > bv ? bv : wait2);
        random_delay = Math.floor((a - (b - 1)) * Math.random()) + b;
        j++;
        user_power_attack = false;
        if (j >= bb.length) {
            if (document.forms.something.UserSkip.checked) {
                logmsg('All users Iced/Killed. Stopping..', 'status');
                stop();
                bg = true;
                Y = true;
                return
            }
            logmsg('Reached last member, reloading..', 'attack_log');
            j = 0
        }
        setTimeout(attack_user, random_delay * 1000)
    }
    function pre_check() {
        var g = (wait2 > bv ? wait2 : bv);
        var h = (wait2 > bv ? bv : wait2);
        random_delay = Math.floor((g - (h - 1)) * Math.random()) + h;
        random_delay = (random_delay < 0) ? 0 : random_delay;
        Trace('In pre check');
        if (P == false) {
            logmsg('Fightlist loading, Please wait..', 'status');
            return
        }
        if (t == false) {
            logmsg('Paused...', 'status');
            return
        }
        F = parseInt(document.forms.something.attackcount.value);
        bK = parseInt(document.getElementById('heal_thres').value);
        if (document.getElementById('user_health').innerHTML < bK) {
            heal();
            return
        }
        if (actual_count >= F && F != 0) {
            logmsg('Finished Attack run, Stopping..', 'status');
            stop();
            return
        }
        if (document.getElementById('user_stamina').innerHTML <= 0) {
            logmsg('Ran out of stamina, stopping..', 'status');
            stop();
            return
        }
        if (bp && (parseInt(O) <= 30) && bx) {
            logmsg('Could level up on next Attack, Stopping..', 'status');
            stop();
            return
        }
        if ((!bp) && (parseInt(O) <= 6) && bx) {
            logmsg('Could level up on next Attack, Stopping..', 'status');
            stop();
            return
        }
        if (parseInt(document.getElementById('exp_to_level').value) != 0) {
            if (bp) {
                var j = parseInt(document.getElementById('exp_to_level').value) + 30
            } else {
                var j = parseInt(document.getElementById('exp_to_level').value) + 6
            }
            if (parseInt(O) < j) {
                logmsg('Could cross user set level up exp on next attack, Stopping..', 'status');
                stop();
                return
            }
        }
        cash_limit = parseInt(document.forms.something.cashlimit.value);
        if (document.getElementById('SpecialChars').value != '') {
            var l = document.getElementById('SpecialChars').value.split('\n');
            for (k = 0; k < l.length; k++) {
                if (y[i].indexOf(l[k]) != -1) {
                    logmsg('Skipping ' + x[i] + ' fetching next target', 'status');
                    skip_reason = 'Ignore char space';
                    next();
                    return
                }
            }
        }
        if (document.forms.something.faction_enable.checked) {
            switch (true) {
            case document.forms.something.Triad.checked:
                if (D[i] == 'Yakuza') {
                    logmsg(x[i] + ' belongs to opposite faction, fetching next target', 'status');
                    skip_reason = 'Yakuza faction, Triad attack checked';
                    next();
                    return
                }
                break;
            case document.forms.something.Yakuza.checked:
                if (D[i] == 'Triad') {
                    logmsg(x[i] + ' belongs to opposite faction, fetching next target', 'status');
                    skip_reason = 'Triad faction, Yakuza attack checked';
                    next();
                    return
                }
                break;
            case document.forms.something.Balance_Faction.checked:
                var m = parseInt(document.forms.something.balanceamt.value);
                if (bl > Yakuza) {
                    Trace('Triad is higher');
                    if ((bl - Yakuza) > m) {
                        if (D[i] == 'Yakuza') {
                            skip_reason = 'Yakuza faction, Triad attack needed';
                            next();
                            return
                        }
                    }
                } else if (bl < Yakuza) {
                    Trace('Yakuza is higher');
                    if ((Yakuza - bl) > m) {
                        if (D[i] == 'Triad') {
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
            var n = parseInt(document.getElementById('LowerLevel').value);
            var o = parseInt(document.getElementById('UpperLevel').value);
            var p = parseInt(document.getElementById('LowerMafia').value);
            var q = parseInt(document.getElementById('UpperMafia').value);
            for (k = 0; k < V.length; k++) {
                if (y[i] == V[k]) {
                    skip_reason = 'Strong list volunteer';
                    next();
                    return
                }
            }
            if (!(A[i] >= n && A[i] <= o)) {
                skip_reason = 'Character Level limits';
                next();
                return
            }
            if (!(C[i] >= p && C[i] <= q)) {
                skip_reason = 'Mafia level limits';
                next();
                return
            }
        } catch (err) {
            alert(err)
        }
        if (document.getElementById('zynga_ice_check').checked) {
            if (!E[i]) {
                attack()
            } else {
                logmsg(x[i] + ' is already Iced/Dead, skipping..', 'status');
                logmsg(x[i] + ' is already Iced/Dead, skipping..', 'attack_log');
                next()
            }
            return
        }
        if (document.getElementById('ice_check').checked) {
            var r = /href="(.+?)"/.exec(x[i])[1].replace(/&amp;/g, '&');
            var s = {
                'ajax': 1,
                'liteload': 1,
                'sf_xw_user_id': bk,
                'sf_xw_sig': local_xw_sig
            };
            logmsg('Opening profile page of ' + x[i], 'status');
            $.ajax({
                type: "POST",
                url: r,
                timeout: 30000,
                data: s,
                success: function (d) {
                    var e = {
                        'ajax': 1,
                        'liteload': 1,
                        'sf_xw_user_id': bk,
                        'sf_xw_sig': local_xw_sig
                    };
                    var f = /Sucker Punch.+?<a href="(.+?)".+?>Add to Hitlist/.exec(d)[1];
                    logmsg('Running ice check on ' + x[i], 'status');
                    $.ajax({
                        type: "POST",
                        url: f,
                        timeout: 30000,
                        data: e,
                        success: function (a) {
                            if (/You can&#39;t add/.test(a)) {
                                logmsg('<span class="bad">Zynga Ice Check Problem !</span> skipping to next target', 'status');
                                logmsg('<span class="bad">Zynga Ice Check Problem !</span> skipping to next target', 'attack_log');
                                skip_reason = 'Iced';
                                setTimeout(next, random_delay * 1000);
                                return
                            } else if (/The action was not able to be completed/i.test(a)) {
                                logmsg(x[i] + ' is already Iced/Dead, skipping..', 'status');
                                logmsg(x[i] + ' is already Iced/Dead, skipping..', 'attack_log');
                                skip_reason = 'Iced';
                                setTimeout(next, random_delay * 1000);
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
        setTimeout(attack, random_delay * 1000)
    }
    function get_xmlHTTP() {
        if (window.XMLHttpRequest) return new XMLHttpRequest();
        if (window.ActiveXObject) return new ActiveXObject('Microsoft.XMLHTTP');
        return
    }
    function loadSpammers() {
        document.getElementById('UserIds').value = bh
    }
    function Add_to_loot(b, c, d) {
        var e = /Forge|Arc Welder|Buzzsaw|Gunpowder|Gun Drill|Sonic Emitter|Weapon Part|Grapple|Boomerang|Railgun Barrel|Laser Rangefinder|Explosive Arrow|Portable Fusion Reactor/;
        var f = /Deposit Box|Magnetic Lock|Motion Sensor|Reinforced Steel|Security Camera|Concrete|Construction Tool|Steel Girder|Cinder Block|Bellhop|Chef|Poker Table|Slot Machine|Casino Dealer/;
        var g = /Zmeya Carbon Blade|Ubijca Assault Rifle|Konstantin Cargo Carrier|Executive Overcoat|Shturmovik|Zoloto Sports Car/;
        var h = /12 Gauge|Devastator|Zeus|Bomb Suit|Segmented Body Plate|Skull Cap|Cobra G7|Ruby Red|Turbo Road Warrior|Condor|Cougar|Rhinoceros/;
        var i = /Woodsman|Buzzard Combat Chopper|Tasmanian Devil|Domestic Defense/;
        var j = /Cement Block|Power Tool|Car Lift|Acetylene Torch|Shipping Container|Car Part|High Tech Car Part|Cuban Car Part|Thai Car Part|Russian Car Part|Solar Panel|Bulletproof Glass|Suspension Coil/;
        var m = /Nak Kha Shotgun|Titanium Katar|Ninja|Royal Thai Marine|Raed Armored Sedan|Lamang Motorcycle|Chain Viper|Forest Scorpion/;
        var n = /Armor Part|Micro-Fission Cell|Bio-Monitor/;
        var o = /M45 Overcast|Ottoman Krug|Phantasm|Nyala/;
        var p = /Arcturion Assault Rifle|Range Finder Rifle|Cooling Vest|Reinhardt and Otto|Foo Fighter|Amphiquad|Bighorn|Diamondback/;
        var q = /Venetian Blinder|Diavolo Piccolo SMG|Corpo Armatura|Pulcinella|Avanti Tutta|Meadow Viper|Cinghiale/;
        var oooo = /Venomous|Toxic Gas Scrubber|Golden Poison Frog|Tainted Blades/; 
        var r, loot_v, loot_m, loot_f, loot_f2, loot_cs, loot_b, loot_a, loot_f3, loot_i, loot_v;
        T += c;
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
        if (b.search(o) > -1) {
            b = '<span class="more_in">[FHEL3]</span> ' + b
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
        if (b.search(p) > -1) {
            b = '<span class="more_in">[LVHEL]</span> ' + b
        }
        if (b.search(q) > -1) {
            b = '<span class="more_in">[IHEL]</span> ' + b
        }
        if (b.search(n) > -1) {
            b = '<span class="more_in">[Armory]</span> ' + b
        }
        if (b.search(oooo) > -1) {b = '<span class="more_in">[FHEL4]</span> ' + b
        }
        if (loot_item.length <= 0) {
            loot_item[loot_item.length] = new Array(b, c, d)
        } else {
            for (k = 0; k < loot_item.length; k++) {
                if (b == loot_item[k][0]) {
                    loot_item[k][1] += c;
                    break
                } else if (k == loot_item.length - 1) {
                    loot_item[loot_item.length] = new Array(b, c, d);
                    break
                }
            }
        }
        loot_item.sort();
        document.getElementById('loot_log').innerHTML = '';
        try {
            l_log = '';
            for (l = (loot_item.length - 1); l >= 0; l--) {
                if (loot_item[l][2] != "") {
                    l_log += '<span class="good">' + loot_item[l][1] + 'x</span> <img src="' + loot_item[l][2] + '" style="width:20px; height:20px" onmouseout="this.style.width=\'20px\';this.style.height=\'20px\';" onmouseover="this.style.width=\'40px\';this.style.height=\'40px\';"></img> ' + loot_item[l][0] + '<br>'
                } else {
                    l_log += '<span class="good">' + loot_item[l][1] + 'x</span> ' + loot_item[l][0] + '<br>'
                }
            }
            document.getElementById('loot_log').innerHTML = l_log
        } catch (err) {
            alert(err)
        }
    }
    function heal() {
        Trace('In heal function');
        cb = bk + UnixTS();
        var e = {
            'ajax': 1,
            'liteload': 1,
            'sf_xw_user_id': bk,
            'sf_xw_sig': local_xw_sig
        };
        if (bw == 0) {
            logmsg('Healing disabled, Stopping..', 'status');
            logmsg('Healing disabled, Stopping..', 'attack_log');
            stop();
            return
        }
        if (bj == bw) {
            J = false;
            logmsg('Healing...', 'status');
            $.ajax({
                type: "POST",
                data: e,
                dataType: "json",
                url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&cb=" + cb + "&xw_client_id=8",
                success: function (a) {
                    if (a == null) {
                        logmsg('Error during healing, retrying in 2 seconds..', 'status');
                        setTimeout(heal, 2000);
                        return
                    }
                    if (a.hospital_message == null) {
                        logmsg('Error during healing, retrying in 2 seconds..', 'status');
                        setTimeout(heal, 2000);
                        return
                    } else if (/healed/.test(a.hospital_message)) {
                        process_cash(bw, -(/for (C|B|R|V|L|)\$([^.]+)/.exec(a.hospital_message)[2].replace(/,/g, '')));
                        document.getElementById('user_health').innerHTML = a.user_fields.user_health;
                        logmsg('<img src="http://codeoutpost.com/Scripts/heal.png" alt="heal"></img> Healed <span class="bad">' + (/for (C|B|R|V|L|)\$([^.]+)/.exec(a.hospital_message)[0]) + '</span>, Resuming attacks..', 'attack_log')
                    } else if (a.user_fields.user_health == a.user_fields.user_max_health) {
                        document.getElementById('user_health').innerHTML = a.user_fields.user_health
                    } else if (/cannot heal so fast/.test(a.hospital_message)) {
                        logmsg('Cannot heal too fast, retrying in 10 seconds..', 'status');
                        document.getElementById('user_health').innerHTML = a.user_fields.user_health;
                        setTimeout(heal, 10000);
                        return
                    } else {
                        document.getElementById('user_health').innerHTML = a.user_fields.user_health
                    }
                    J = false;
                    start_attack();
                    return
                }
            });
            return
        } else if (J == true) {
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
                        process_cash(bw, -(/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[2].replace(/,/g, '')));
                        logmsg('<img src="http://codeoutpost.com/Scripts/heal.png" alt="heal"></img> Healed <span class="bad">' + (/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[0]) + '</span>, Travelling back..', 'status');
                        logmsg('<img src="http://codeoutpost.com/Scripts/heal.png" alt="heal"></img> Healed <span class="bad">' + (/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[0]) + '</span>, Travelling back..', 'attack_log');
                        document.getElementById('user_health').innerHTML = b.user_fields.user_health
                    } else if (b.user_fields.user_health == b.user_fields.user_max_health) {
                        document.getElementById('user_health').innerHTML = b.user_fields.user_health;
                        logmsg('Travelling back..', 'status')
                    } else if (/cannot heal so fast/.test(b.hospital_message)) {
                        logmsg('Cannot heal too fast, retrying in 10 seconds..', 'status');
                        document.getElementById('user_health').innerHTML = b.user_fields.user_health;
                        setTimeout(heal, 10000);
                        return
                    } else {
                        document.getElementById('user_health').innerHTML = b.user_fields.user_health
                    }
                    $.ajax({
                        type: "POST",
                        data: e,
                        url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=" + bw + "&cb=" + cb + "&destination=" + bj + "&from=fight&nextParams=&xw_client_id=8",
                        success: function (a) {
                            logmsg('Travelled Back..', 'status');
                            J = false;
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
                url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=" + bj + "&cb=" + cb + "&destination=" + bw + "&from=fight&nextParams=&xw_client_id=8",
                success: function (c) {
                    J = true;
                    var d = parseInt(/'#mw_city_wrapper'.+?'mw_city(\d+?)'/.exec(c)[1]);
                    if (d != bw) {
                        J = false;
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
                                process_cash(bw, -(/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[2].replace(/,/g, '')));
                                logmsg('<img src="http://codeoutpost.com/Scripts/heal.png" alt="heal"></img> Healed <span class="bad">' + (/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[0]) + '</span>, Travelling back..', 'status');
                                logmsg('<img src="http://codeoutpost.com/Scripts/heal.png" alt="heal"></img> Healed <span class="bad">' + (/for (C|B|R|V|L|)\$([^.]+)/.exec(b.hospital_message)[0]) + '</span>, Travelling back..', 'attack_log');
                                document.getElementById('user_health').innerHTML = b.user_fields.user_health
                            } else if (b.user_fields.user_health == b.user_fields.user_max_health) {
                                document.getElementById('user_health').innerHTML = b.user_fields.user_health;
                                logmsg('Travelling back..', 'status')
                            } else if (/cannot heal so fast/.test(b.hospital_message)) {
                                logmsg('Cannot heal too fast, retrying in 10..', 'status');
                                setTimeout(heal, 10000);
                                return
                            } else {
                                document.getElementById('user_health').innerHTML = b.user_fields.user_health
                            }
                            $.ajax({
                                type: "POST",
                                data: e,
                                url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=" + bw + "&cb=" + cb + "&destination=" + bj + "&from=fight&nextParams=&xw_client_id=8",
                                success: function (a) {
                                    logmsg('Travelled Back..', 'status');
                                    J = false;
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
                H += parseInt(b);
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
            if (H < 0) {
                document.getElementById('cash').innerHTML = '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif"></img>&nbsp;<span class="bad">-$' + format_cash(H) + '</span>'
            } else {
                document.getElementById('cash').innerHTML = '&nbsp;<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif"></img>&nbsp;<span class="good">$' + format_cash(H) + '</span>'
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
        } catch (err) {
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
        c = (c < 10 ? '0' + c : c);
        d = (d < 10 ? '0' + d : d);
        var e = '<font color=#666666>[' + c + ':' + d + ']</font>';
        switch (b) {
        case 'attack_log':
            U.splice(0, 0, ' ' + e + ' ' + a);
            break;
        case 'status':
            document.getElementById('status').innerHTML = a;
            break
        }
        actual_count = R + loss;
        document.getElementById('win_percent').innerHTML = Math.round(R / actual_count * 100);
        document.getElementById('loss_percent').innerHTML = Math.round(loss / actual_count * 100);
        document.getElementById('fights').innerHTML = actual_count;
        l = U.length;
        var f = parseInt(document.getElementById('log_size').value);
        U.length = (l < f) ? l : f;
        document.getElementById('attack_log').innerHTML = '';
        var g = '';
        for (l = 0; l < U.length; l++) {
            g += U[l] + '<br>'
        }
        document.getElementById('attack_log').innerHTML += g
    }
    function bank(d, e) {
        if (bj == 5) {
            var f = {
                'ajax': 1,
                'liteload': 0,
                'sf_xw_user_id': bk,
                'sf_xw_sig': local_xw_sig
            };
            $.ajax({
                type: "POST",
                data: f,
                url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankDeposit&xw_person=" + bM + "&amount=" + d + "&city=5&building_type=6&xw_client_id=8",
                success: function (a) {},
                error: function (a, b, c) {}
            });
            return
        }
        do_ajax('', 'remote/html_server.php?xw_controller=bank&xw_action=deposit&xw_city=' + G + '&cb=' + bk + UnixTS() + '&amount=' + d + '&city=' + e, 1, 0, 0, 0)
    }
    function writeCookieStuff() {
        bv = document.getElementById('delay1').value;
        bv = (bv == '') ? 2 : bv;
        wait2 = document.getElementById('delay2').value;
        wait2 = (wait2 == '') ? 2 : wait2;
        by = document.getElementById('SpecialChars').value.split('\n');
        createCookie('Brawler_ignore', escape(by));
        bz = (document.getElementById('bank_enable').checked) ? 'checked' : ' ';
        user_bank_enable = (document.getElementById('user_bank_enable').checked) ? 'checked' : ' ';
        bank_limit = document.getElementById('bank_limit').value;
        bank_limit = (bank_limit == '') ? 10000 : bank_limit;
        bA = (document.getElementById('attack_limit_check').checked) ? 'checked' : ' ';
        attack_limit_count = document.getElementById('attack_limit').value;
        attack_limit_count = (attack_limit_count == '') ? 3 : attack_limit_count;
        bB = document.getElementById('LowerMafia').value;
        bB = (bB == '') ? 0 : bB;
        upper_mafia = document.getElementById('UpperMafia').value;
        upper_mafia = (upper_mafia == '') ? 501 : upper_mafia;
        lower_level = document.getElementById('LowerLevel').value;
        lower_level = (lower_level == '') ? 0 : lower_level;
        bC = document.getElementById('UpperLevel').value;
        bC = (bC == '') ? 9999 : bC;
        bD = document.getElementById('cashlimit').value;
        bD = (bD == '') ? 0 : bD;
        bE = (document.getElementById('cash_city').checked) ? 'checked' : ' ';
        bF = document.getElementById('balanceamt').value;
        bF = (bF == '') ? 10 : bF;
        bG = (document.getElementById('faction_enable').checked) ? 'checked' : ' ';
        triad_fac = (document.getElementById('Triad').checked) ? 'checked' : ' ';
        yakuza_fac = (document.getElementById('Yakuza').checked) ? 'checked' : ' ';
        faction_bal = (document.getElementById('Balance_Faction').checked) ? 'checked' : ' ';
        bH = (document.getElementById('ice_check').checked) ? 'checked' : ' ';
        bJ = (document.getElementById('power_attack').checked) ? 'checked' : ' ';
        user_power_attack_enable = (document.getElementById('user_power_attack').checked) ? 'checked' : ' ';
        user_iced_check = (document.getElementById('user_iced_check').checked) ? 'checked' : ' ';
        bI = (document.getElementById('zynga_ice_check').checked) ? 'checked' : ' ';
        var a = bv + '|' + wait2 + '|' + bw + '|' + heal_city_text + '|' + bx + '|' + levelup_text + '| |' + bz + '|' + user_bank_enable + '|' + bank_limit + '|' + bA + '|' + attack_limit_count + '|' + bB + '|' + upper_mafia + '|' + lower_level + '|' + bC + '|' + bD + '|' + bE + '|' + bF + '|' + bG + '|' + triad_fac + '|' + yakuza_fac + '|' + faction_bal + '|' + bH + '|' + bJ + '|' + user_power_attack_enable + '|' + user_iced_check + '|' + bI;
        createCookie('Brawler', a)
    }
    function readCookieStuff() {
        try {
            var a = readCookie('Brawler');
            if (a == null || (/undefined/.test(a))) {
                return
            }
            a = a.split('|');
            bv = a[0];
            wait2 = a[1];
            bw = a[2];
            heal_city_text = a[3];
            bx = (a[4] == 'true') ? true : false;
            levelup_text = a[5];
            by = readCookie('Brawler_ignore');
            if (!(by == null || by == '')) {
                if (by == ' ') {
                    by = ''
                } else {
                    by = unescape(by).replace(/,/g, '\n')
                }
            } else {
                by = ''
            }
            bz = a[7];
            user_bank_enable = a[8];
            bank_limit = a[9];
            bA = a[10];
            attack_limit_count = a[11];
            bB = a[12];
            upper_mafia = a[13];
            lower_level = a[14];
            bC = a[15];
            bD = a[16];
            bE = a[17];
            bF = a[18];
            bG = a[19];
            triad_fac = a[20];
            yakuza_fac = a[21];
            faction_bal = a[22];
            bH = a[23];
            bJ = a[24];
            user_power_attack_enable = a[25];
            user_iced_check = a[26];
            bI = a[27]
        } catch (err) {}
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
            var a = _gat._getTracker("UA-8435065-3");
            a._trackPageview("/script/Brawler")
        } catch (err) {}
    }
})();

function Trace(a) {
    if (!trace_enable) {
        return;
    }
    var b = new Date().getHours();
    var c = new Date().getMinutes();
    b = (b < 10 ? '0' + b : b);
    c = (c < 10 ? '0' + c : c);
    var d = '<font color=#666666>[' + b + ':' + c + ']</font>';
    document.getElementById('popup_permanence').innerHTML += d + ' ' + skip_reason;
    document.getElementById('popup_permanence').innerHTML += d + ' ' + a
}
function temp_trace(a) {
    var b = new Date().getHours();
    var c = new Date().getMinutes();
    b = (b < 10 ? '0' + b : b);
    c = (c < 10 ? '0' + c : c);
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

