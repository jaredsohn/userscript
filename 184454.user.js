// ==UserScript==
// @name       idle
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

var statistics = {
    totalGold : 0,
    totalExp : 0,
    startTime : new Date(),
    endTime : new Date(),
    maxDmg : 0,
    maxDmgSkill : '',
    maxDmgSkillId : 0,
    minDmg : 9999,
    minDmgSkll : '',
    minDmgSkllId : 0,
};
window.onload = function(){
    $("#sidebar").append($("<br /><br />"));
    
    
    var battleData = $("<div><h2 class='color1 weight f20'>统计</h2></div>");
    battleData.append('<dl class="status ml_20">'
                      +'<dt title="获得经验">Exp</dt><dd><span id="bd-exp">NaN</span></dd>'
                      +'<dt title="获得金钱">Gold</dt><dd><span id="bd-gold">NaN</span></dd>'
                      +'<dt title="每小时经验">Exp/h</dt><dd><span id="bd-exp-h">NaN</span></dd>'
                      +'<dt title="每小时金钱">Gold/h</dt><dd><span id="bd-gold-h">NaN</span></dd>'
                      +'<dt title="升级所需时间">LvUp</dt><dd><span id="bd-lvup">NaN</span></dd>'
                      +'</dl><div class="clear"></div>');
    var combatData = $("<div><h2 class='color1 weight f20'>战斗信息</h2></div>");
    combatData.append('<dl class="status ml_20">'
                      +'<dt title="最大伤害">MaxD</dt><dd><span id="cd-maxdmg">NaN</span></dd>'
                      +'<dt title="最大伤害技能">Skill</dt><dd><span class="skill_pop" eid="0" id="cd-maxdmg-skill">普通攻击</span></dd>'
                      +'<dt title="最小伤害">MinD</dt><dd><span id="cd-mindmg">NaN</span></dd>'
                      +'<dt title="最大伤害技能">Skill</dt><dd><span class="skill_pop" eid="0" id="cd-mindmg-skill">普通攻击</span></dd>'
                      +'</dl><div class="clear"></div>');
    $("#sidebar").append(battleData).append(combatData);
    
    ShowBattle = function(data) {
        
        $('#log_content .post').remove();
        
        if (data.ffoe != null) {
            var html = '<div class="post"><div class="entry">战斗刚结束，正在休息恢复中，并搜寻敌人...<em id="find_rounds">(' + data.ffoe + ')</em></div></div>';
            $('#log_content').prepend(html);
            
            _interval_id = self.setInterval(CharaFind, _rnd_sec);
        }
        else if (data.rest != null) {
            var html = '<div class="post"><div class="entry"><h5>' + data.cnm + '</h5> 正在休息恢复中，并搜寻敌人...<em id="rest_rounds">(' + data.rest + ')</em></div></div>';
            $('#log_content').prepend(html);
            
            _interval_id = self.setInterval(CharaRest, _rnd_sec);
        }
            else {
                if (_extreme == true) {
                    if (data[0] == null) {
                        setTimeout(StartBattle, _rnd_sec);
                    }
                    else {
                        if (data[0].tun == null) {
                            setTimeout(StartBattle, _rnd_sec);
                        }
                        else {
                            var html = '<div class="post"><div class="entry">遭遇<h5>敌人</h5>，正在进行激烈的战斗...<em id="fight_rounds">(' + data[0].tun + ')</em></div></div>';
                            $('#log_content').prepend(html);
                            _interval_id = self.setInterval(function () { Fighting(data); }, _rnd_sec);
                        }
                    }
                    
                }
                else {
                    ParseBattleLog(data, 0);
                }
            }
    };
    
    
    ParseBattleLog = function (bl, idx) {
        if (_run == true) {
            if (idx < bl.length) {
                var data = bl[idx];
                
                if (idx == bl.length - 1) {
                    var end_str = "";
                    
                    var draw = "";
                    if (data.drw != null) draw = data.drw;
                    
                    if (draw != "") {
                        end_str += "<h5>" + data.cnm + "</h5> 与对手战斗至精疲力尽依然不分胜负...<br>"                   
                    }
                    
                    if (data.die != null) {
                        for (var i = 0; i < data.die.length; i++) {
                            end_str += "因 <h4>" + data.die[i] + "</h4> 被击败，战斗结束...<br>";
                        }
                    }
                    
                    if (data.lu != null) {
                        end_str += "<h5>" + data.cnm + "</h5> 升级了！<br>"
                    }
                    else {
                        if (data.rt != null) {
                            end_str += "<h5>" + data.cnm + "</h5> HP过低需要休息<br>"
                        }
                    }
                    statistics.endTime = new Date();
                    var exp = "";
                    if (data.exp != null) exp = data.exp;
                    
                    var gold = "";
                    if (data.gold != null) gold = data.gold;
                    
                    var equip = "";
                    if (data.equip != null) {
                        for (var i = 0; i < data.equip.length; i++) {
                            equip += "[" + data.equip[i] + "] ";
                        }
                    }
                    
                    if (exp != "" || gold != "" || equip != "") {
                        end_str += "<h5>" + data.cnm + "</h5> 获得了：";
                        if (gold != "") {
                            end_str += "金币" + gold + "G，";
                        }
                        if (exp != "") {
                            end_str += "经验" + exp + "exp，";
                        }
                        if (equip != "") {
                            end_str += equip + "，"
                        }
                        if (end_str != "") {
                            end_str = end_str.substring(0, end_str.length - 1);
                        }
                        statistics.totalGold += parseInt(gold);
                        $("#bd-gold").text(statistics.totalGold);
                        statistics.totalExp += parseInt(exp);
                        $("#bd-exp").text(statistics.totalExp);
                        var lastTime = statistics.endTime - statistics.startTime;
                        var exph = Math.round((statistics.totalExp * 1000 * 60 * 60) / lastTime);
                        $("#bd-gold-h").text(Math.round((statistics.totalGold * 1000 * 60 * 60) / lastTime));
                        $("#bd-exp-h").text(Math.round((statistics.totalExp * 1000 * 60 * 60) / lastTime));
                        $("#bd-lvup").text(((parseInt(data.nxp) - parseInt(data.mxp)) / exph).toFixed(2) + " h");
                        $.each(bl, function (i, e) {
                            if(e.MC && e.att_combat.dc != '1')
                            {
                                var dmg = parseInt(e.att_combat.d);
                                if(dmg > statistics.maxDmg)
                                {
                                    statistics.maxDmg = dmg; 
                                    statistics.maxDmgSkill = e.att_combat.ats; 
                                    statistics.maxDmgSkillId = e.att_combat.sid;
                                }
                                else if(dmg < statistics.minDmg)
                                {
                                    statistics.minDmg = dmg; 
                                    statistics.minDmgSkill = e.att_combat.ats; 
                                    statistics.minDmgSkillId = e.att_combat.sid;
                                }
                                    }
                        });
                        $("#cd-maxdmg").text(statistics.maxDmg);
                        $("#cd-maxdmg-skill").text(statistics.maxDmgSkill).attr("eid",statistics.maxDmgSkillId).css("color",statistics.maxDmgSkillId > 0 ? "#7796ba" : "");
                        $("#cd-mindmg").text(statistics.minDmg);
                        $("#cd-mindmg-skill").text(statistics.minDmgSkill).attr("eid",statistics.minDmgSkillId).css("color",statistics.minDmgSkillId > 0 ? "#7796ba" : "");
                    }
                    
                    ShowCharaInfo(data);
                    
                    end_str = '<div class="post"><div class="entry">' + end_str + '</div><div>';
                    $('#log_content').prepend(end_str);
                    
                }
                else {
                    var dt = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();
                    var html = "";
                    
                    html = GetAllFightLog(data);
                    
                    html = "<div class=\"post\">" + html + "<div class=\"date\">" + dt + "</div><div class=\"thinline2\"></div></div>";
                    
                    /////////////////
                    
                    if (data.att_combat != null) {
                        HPnEXPnFHP(data);
                        ShowFightDetailM(data.att_combat, data.MC);
                    }
                    
                    $('#log_content').prepend(html);
                }
                
                idx++;
                setTimeout(function () {
                    ParseBattleLog(bl, idx);
                }, _rnd_sec);
            }
            else {
                //是否要休息
                var data = bl[bl.length - 1];
                if (data.rt != null) {
                    var html = '<div class="post"><div class="entry"><h5>' + data.cnm + '</h5> 正在休息恢复中，并搜寻敌人...<em id="rest_rounds">(' + (data.rt) + ')</em></div></div>';
                    $('#log_content').prepend(html);
                    
                    _interval_id = self.setInterval(CharaRest, _rnd_sec);
                }
                else {
                    setTimeout(StartBattle, _rnd_sec);
                }
            }
        }
    }
};