// ==UserScript==
// @name       idle adverture
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  for http://idle.marrla.com/
// @match      http://idle2.marrla.com/*
// @copyright  2013+, 原作者（魔法少女小爱）， 移植（zeerd）
// @include	http://idle*.marrla.com/*
// ==/UserScript==

document.body.appendChild( document.createElement( 'script'));
document.body.lastChild.innerHTML = 
    '\
	GamePlugin = {\n\
    _interval_showlog: 10,\n\
    GetEuqipList: function () {\n\
        var result = [];\n\
        $.ajax({\n\
            type: \"get\",\n\
            url: \"GetEquipList.aspx\",\n\
            data: { \"type\": \"\", \"mc\": -1, \"p\": 1 },\n\
            cache: false,\n\
            success: function (data) {\n\
                for (var i = 1; i < data.length; i++) {\n\
                    if (data[i].enabled == 1) {\n\
                        result.push({ id: data[i].id, name: data[i].name, mc: data[i].mc });\n\
                    }\n\
                }\n\
            },\n\
            async: false,\n\
            error: function () { alert(\'error_equip_list\') },\n\
            dataType: \"json\"\n\
        });\n\
        return result;\n\
    },\n\
    AttachPlugin: function () {\n\
        if (window.location.href.toLowerCase().indexOf(\"pvp.aspx\") != -1) {\n\
            //this.AttachPlugin_PVP();\n\
        }\n\
        else if (window.location.href.toLowerCase().indexOf(\"default.aspx\") != -1) {\n\
            this.AttachPlugin_Default();\n\
        }\n\
        else if (window.location.href.toLowerCase().indexOf(\"replay.aspx\") != -1) {\n\
            this.AttachPlugin_Replay();\n\
        }\n\
    },\n\
    AttachPlugin_PVP: function () {\n\
\n\
    },\n\
    AttachPlugin_Default: function () {\n\
        var battleData = {\n\
            exp: 0,\n\
            gold: 0,\n\
            startTime: new Date(),\n\
            endTime: new Date(),\n\
            eph: 0,\n\
            gph: 0\n\
        };\n\
        window.ParseBattleLog = function (bl, idx) {\n\
            if (_run == true) {\n\
                if (idx < bl.length) {\n\
                    var data = bl[idx];\n\
                    if (idx == bl.length - 1) {\n\
                        var end_str = \"\";\n\
                        var draw = \"\";\n\
                        if (data.drw != null) draw = data.drw;\n\
                        if (draw != \"\") {\n\
                            end_str += \"<h5>\" + data.cnm + \"</h5> 与对手战斗至精疲力尽依然不分胜负...<br>\"\n\
                        }\n\
                        if (data.die != null) {\n\
                            for (var i = 0; i < data.die.length; i++) {\n\
                                end_str += \"因 <h4>\" + data.die[i] + \"</h4> 被击败，战斗结束...<br>\";\n\
                            }\n\
                        }\n\
                        if (data.lu != null) {\n\
                            end_str += \"<h5>\" + data.cnm + \"</h5> 升级了！<br>\"\n\
                        }\n\
                        else {\n\
                            if (data.rt != null) {\n\
                                end_str += \"<h5>\" + data.cnm + \"</h5> HP过低需要休息<br>\"\n\
                            }\n\
                        }\n\
                        var exp = \"\";\n\
                        if (data.exp != null) exp = data.exp;\n\
                        var gold = \"\";\n\
                        if (data.gold != null) gold = data.gold;\n\
                        var equip = \"\";\n\
                        if (data.equip != null) {\n\
                            for (var i = 0; i < data.equip.length; i++) {\n\
                                equip += \"[\" + data.equip[i] + \"] \";\n\
                            }\n\
                        }\n\
                        if (exp != \"\" || gold != \"\" || equip != \"\") {\n\
                            end_str += \"<h5>\" + data.cnm + \"</h5> 获得了：\";\n\
                            if (gold != \"\") {\n\
                                end_str += \"金币\" + gold + \"G，\";\n\
                            }\n\
                            if (exp != \"\") {\n\
                                end_str += \"经验\" + exp + \"exp，\";\n\
                            }\n\
                            if (equip != \"\") {\n\
                                end_str += equip + \"，\"\n\
                            }\n\
                            if (end_str != \"\") {\n\
                                end_str = end_str.substring(0, end_str.length - 1);\n\
                            }\n\
\n\
                            //额外显示\n\
                            battleData.exp += parseInt(exp);\n\
                            battleData.gold += parseInt(gold);\n\
                            battleData.endTime = new Date();\n\
\n\
                            var ul = $(\"#battleData\");\n\
                            if (ul.length == 0) {\n\
                                var str = \"<div class=\'thinline\'></div>\"\n\
                                + \"<div  class=\'left ml_20 weight color3 f25\'>Statistics</div>\"\n\
                                + \"<div class=\'w250 right\'>\"\n\
                                + \"<ul id=\'battleData\' style=\'margin-left:-50px;\' class=\'item f14 color2\'></ul></div>\"\n\
                                + \"<div class=\'clear\'></div>\";\n\
                                $(\"#sidebar > .clear\").eq(3).after(str);\n\
                                ul = $(\"#battleData\");\n\
                            }\n\
                            ul.empty();\n\
                            var lastTime = battleData.endTime - battleData.startTime;\n\
                            var exp = parseInt($(\"#exp\").html());\n\
                            var nextExp = parseInt($(\"#next_exp\").html());\n\
                            var eph = Math.round((battleData.exp * 1000 * 60 * 60) / lastTime);\n\
                            var gph = Math.round((battleData.gold * 1000 * 60 * 60) / lastTime);\n\
                            var ale = parseFloat((nextExp - exp) / eph).toFixed(2);\n\
                            var levelUpTime = new Date( Date.parse(new Date()) + Math.round((nextExp - exp) * lastTime / battleData.exp) );\n\
\n\
                            ul.append(\"<li><span>exp：\" + battleData.exp + \"</span></li>\");\n\
                            ul.append(\"<li><span>gold：\" + battleData.gold + \"</span></li>\");\n\
                            ul.append(\"<li><span>eph：\" + eph + \"</span></li>\");\n\
                            ul.append(\"<li><span>gph：\" + gph + \"</span></li>\");\n\
                            ul.append(\"<li><span>ALE：\" + ale + \"</span></li>\");\n\
                            ul.append(\"<li><span>time：\" + levelUpTime.toLocaleDateString() + \" \" +levelUpTime.toLocaleTimeString() + \"</span></li>\");\n\
                        }\n\
                        ShowCharaInfo(data);\n\
                        end_str = \'<div class=\"post\"><div class=\"entry\">\' + end_str + \'</div><div>\';\n\
                        $(\'#log_content\').prepend(end_str);\n\
                    }\n\
                    else {\n\
                        var dt = (new Date()).toLocaleDateString() + \" \" + (new Date()).toLocaleTimeString();\n\
                        var html = \"\";\n\
                        html = GetAllFightLog(data);\n\
                        html = \"<div class=\\"post\\">\" + html + \"<div class=\\"date\\">\" + dt + \"</div><div class=\\"thinline2\\"></div></div>\";\n\
                        /////////////////\n\
                        if (data.att_combat != null) {\n\
                            HPnEXPnFHP(data);\n\
                            ShowFightDetailM(data.att_combat, data.MC);\n\
                        }\n\
                        $(\'#log_content\').prepend(html);\n\
                    }\n\
                    idx++;\n\
                    setTimeout(function () {\n\
                        ParseBattleLog(bl, idx);\n\
                    }, this._rnd_sec);\n\
                }\n\
                else {\n\
                    //是否要休息\n\
                    var data = bl[bl.length - 1];\n\
                    if (data.rt != null) {\n\
                        var html = \'<div class=\"post\"><div class=\"entry\"><h5>\' + data.cnm + \'</h5> 正在休息恢复中，并搜寻敌人...<em id=\"rest_rounds\">(\' + data.rt + \')</em></div></div>\';\n\
                        $(\'#log_content\').prepend(html);\n\
\n\
                        _interval_id = self.setInterval(CharaRest, _rnd_sec);\n\
                    }\n\
                    else {\n\
                        setTimeout(StartBattle, _rnd_sec);\n\
                    }\n\
                }\n\
            }\n\
        }\n\
    },\n\
    AttachPlugin_Replay: function () {\n\
        var battleData = {};\n\
        for (var i in fl[0].all_chara) {\n\
            var char = fl[0].all_chara[i];\n\
            battleData[char.cid] = {\n\
                cid: char.cid,\n\
                name: null,\n\
                hp: char.mhp,\n\
                damage: 0,\n\
                heal: 0,\n\
                counter: 0\n\
            };\n\
        }\n\
        for (var i = 0; i < fl.length - 1; i++) {\n\
            var turn = fl[i];\n\
            battleData[turn.cid].name = turn.cnm;\n\
            battleData[turn.cid].damage += parseInt(turn.att_combat.d);\n\
            battleData[turn.cid].heal += parseInt(turn.att_combat.Heal);\n\
            if (turn.aoe_combat != undefined) {\n\
                for (var j in turn.aoe_combat) {\n\
                    battleData[turn.cid].damage += parseInt(turn.aoe_combat[j].d);\n\
                    battleData[turn.cid].heal += parseInt(turn.aoe_combat[j].Heal);\n\
                }\n\
            }\n\
            if (turn.att_poison != undefined) {\n\
                for (var j in turn.att_poison) {\n\
                    battleData[turn.fid].damage += parseInt(turn.att_poison[j].psd);\n\
                }\n\
            }\n\
            if (turn.att_round != undefined) {\n\
                for (var j in turn.att_round) {\n\
                    battleData[turn.cid].damage += parseInt(turn.att_round[j].dmg);\n\
                    battleData[turn.fid].heal += parseInt(turn.att_round[j].heal);\n\
                }\n\
            }\n\
            if (turn.att_aura != undefined) {\n\
                for (var j in turn.att_round) {\n\
                    battleData[turn.cid].heal += parseInt(turn.att_round[j].heal);\n\
                }\n\
            }\n\
            battleData[turn.fid].counter += parseInt(turn.att_combat.ct);\n\
            battleData[turn.fid].counter += parseInt(turn.att_combat.dbk);\n\
            battleData[turn.fid].counter += parseInt(turn.att_combat.dsf);\n\
            battleData[turn.fid].heal += parseInt(turn.att_combat.fhl);\n\
\n\
        }\n\
\n\
        var divLog = $(\"#log_content\");\n\
        var log = \"<div class=\'post\'>\"\n\
        for (var i in battleData) {\n\
            log += \"<div class=\'entry\'>\";\n\
            log += \"<h5>\" + battleData[i].name + \"</h5>  \";\n\
            log += \"主动伤害：<u>\" + battleData[i].damage + \"</u>  \";\n\
            log += \"反击伤害：<u>\" + battleData[i].counter + \"</u>  \";\n\
            log += \"治疗量：<i>\" + battleData[i].heal + \"</i>  \";\n\
            log += \"</div>\";\n\
        }\n\
        log += \"</div>\";\n\
        divLog.prepend(log);\n\
    }\n\
};\n\
GamePlugin.AttachPlugin();\n\
';