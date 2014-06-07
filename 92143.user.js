// ==UserScript==
// @name            Quakelive Extended Stats
// @version          0.4
// @namespace    http://userscripts.org/scripts/show/92143
// @homepage     http://userscripts.org/scripts/show/92143
// @description    Adds few additional stats to quakelive match stats page. Ie. net frags, damage dealt, damage taken, net damage 
// @author          ambro
// @include          http://*.quakelive.com/*
// @exclude         http://*.quakelive.com/forum*
// ==/UserScript==

function QuakeliveExtendedStats(unsafeWindow) {
    /**
     * GM_ API emulation for Chrome
     * 2009, 2010 James Campos
     * cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
     */
    if (typeof GM_getValue == "undefined") {
        GM_getValue = function(name, defaultValue) {
            var value = localStorage.getItem(name);
            if (!value)
                return defaultValue;
            var type = value[0];
            value = value.substring(1);
            switch (type) {
                case 'b':
                    return value == 'true';
                case 'n':
                    return Number(value);
                default:
                    return value;
            }
        };
        GM_setValue = function(name, value) {
            value = (typeof value)[0] + value;
            localStorage.setItem(name, value);
        };
        GM_addStyle = function(css) {
            var style = document.createElement('style');
            style.textContent = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        };
        GM_registerMenuCommand = function() {
        }
    }

    var $ = unsafeWindow.jQuery;
    var quakelive = unsafeWindow.quakelive;


    var l = [
        {field:"TEAM_RANK",title:"Rank",extraClass:"tc",fmt:quakelive.statstip.FormatRank},
        {field:"PLAYER_NICK",title:"Player",extraClass:"tl",fmt:quakelive.statstip.FormatProfileLink},
        {field:"CAPTURES",title:"Caps",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Captures"},
        {field:"DEFENDS",title:"Defd",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Defends"},
        {field:"ASSISTS",title:"Assts",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Assists"},
        {field:"THAWS",title:"Thaws",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber, alt:"Thaw Assists"},
        {field:"ROUNDS_WON",title:"Rounds Won",extraClass:"tc",fmt:null},
        {field:"SCORE",title:"Score",extraClass:"tc",fmt:null},
        {field:"KILLS",title:"Frags",extraClass:"tc",fmt:null},
        {field:"DEATHS",title:"Deaths",extraClass:"tc",fmt:null},
        {field:"DAMAGE_DEALT",title:"DmgD",extraClass:"tc",fmt:null, alt:"Damage dealt"},
        {field:"DAMAGE_TAKEN",title:"DmgT",extraClass:"tc",fmt:null, alt:"Damage taken"},
        {field:"ACCURACY",title:"Acc",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Accuracy"},
        {field:"MIN",title:"Time",extraClas:"tc",fmt:quakelive.statstip.FormatTime},
        {field:"EXCELLENT",title:"Exc",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Excellent" medals',optional:true},
        {field:"IMPRESSIVE",title:"Imp",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Impressive" medals',optional:true},
        {field:"HUMILIATION",title:"Hum",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Humiliation" medals',optional:true}
    ],c = [
        {field:"RANK",title:"Rank",extraClass:"tc",fmt:quakelive.statstip.FormatRank},
        {field:"PLAYER_NICK",title:"Player",extraClass:"tl",fmt:quakelive.statstip.FormatProfileLink},
        {field:"GT",title:"GT",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Gauntlet"},
        {field:"MG",title:"MG",extraClass:"tc", fmt:quakelive.statstip.FormatWeaponNumber,alt:"Machine Gun"},
        {field:"SG",title:"SG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Shot Gun"},
        {field:"GL",title:"GL",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Grenade Launcher"},
        {field:"LG",title:"LG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Lightning Gun"},
        {field:"RL",title:"RL",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Rocket Launcher"},
        {field:"RG",title:"RG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Rail Gun"},
        {field:"PG",title:"PG", extraClas:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Plasma Gun"},
        {field:"BFG",title:"BFG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"BFG"},
        {field:"CG",title:"CG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Chain Gun"},
        {field:"NG",title:"NG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Nail Gun"},
        {field:"PM",title:"PL",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Prox Launcher"}
    ],e = [
        {field:"TEAM_RANK",title:"Rank",extraClass:"tc",fmt:quakelive.statstip.FormatRank},
        {field:"PLAYER_NICK",title:"Player", extraClass:"tl",fmt:quakelive.statstip.FormatProfileLink},
        {field:"GT",title:"GT",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Gauntlet"},
        {field:"MG",title:"MG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Machine Gun"},
        {field:"SG",title:"SG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Shot Gun"},
        {field:"GL",title:"GL",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Grenade Launcher"},
        {field:"LG",title:"LG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Lightning Gun"},
        {field:"RL",title:"RL",extraClass:"tc", fmt:quakelive.statstip.FormatWeaponNumber,alt:"Rocket Launcher"},
        {field:"RG",title:"RG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Rail Gun"},
        {field:"PG",title:"PG",extraClas:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Plasma Gun"},
        {field:"BFG",title:"BFG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"BFG"},
        {field:"CG",title:"CG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Chain Gun"},
        {field:"NG",title:"NG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Nail Gun"},
        {field:"PM",title:"PL",extraClass:"tc", fmt:quakelive.statstip.FormatWeaponNumber,alt:"Prox Launcher"}
    ],q = ["GT_A","MG_A","SG_A","GL_A","LG_A","RL_A","RG_A","PG_A","BFG_A","CG_A","NG_A","PM_A","ACCURACY"],y = [
        {field:"RANK",title:"Rank",extraClass:"tc",fmt:quakelive.statstip.FormatRank},
        {field:"PLAYER_NICK",title:"Player",extraClass:"tl",fmt:quakelive.statstip.FormatProfileLink},
        {field:"GT_A",title:"GT",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Gauntlet"},
        {field:"MG_A",title:"MG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Machine Gun"},
        {field:"SG_A",title:"SG",extraClass:"tc", fmt:quakelive.statstip.FormatPercent,alt:"Shot Gun"},
        {field:"GL_A",title:"GL",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Grenade Launcher"},
        {field:"LG_A",title:"LG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Lightning Gun"},
        {field:"RL_A",title:"RL",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Rocket Launcher"},
        {field:"RG_A",title:"RG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Rail Gun"},
        {field:"PG_A",title:"PG",extraClas:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Plasma Gun"},
        {field:"BFG_A",title:"BFG",extraClass:"tc", fmt:quakelive.statstip.FormatPercent,alt:"BFG"},
        {field:"CG_A",title:"CG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Chain Gun"},
        {field:"NG_A",title:"NG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Nail Gun"},
        {field:"PM_A",title:"PL",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Prox Launcher"}
    ],r = [
        {field:"TEAM_RANK",title:"Rank",extraClass:"tc",fmt:quakelive.statstip.FormatRank},
        {field:"PLAYER_NICK",title:"Player",extraClass:"tl",fmt:quakelive.statstip.FormatProfileLink},
        {field:"GT_A",title:"GT",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Gauntlet"},
        {field:"MG_A",title:"MG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Machine Gun"},
        {field:"SG_A",title:"SG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Shot Gun"},
        {field:"GL_A",title:"GL",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Grenade Launcher"},
        {field:"LG_A",title:"LG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Lightning Gun"},
        {field:"RL_A",title:"RL",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Rocket Launcher"},
        {field:"RG_A",title:"RG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Rail Gun"},
        {field:"PG_A",title:"PG",extraClas:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Plasma Gun"},
        {field:"BFG_A",title:"BFG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"BFG"},
        {field:"CG_A",title:"CG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Chain Gun"},
        {field:"NG_A",title:"NG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Nail Gun"},
        {field:"PM_A",title:"PL",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Prox Launcher"}
    ];
    quakelive.statstip.BOARD_DEFS = [
        {index:"SCOREBOARD",type:"normal",fields:[
            {field:"RANK",title:"Rank",extraClass:"tc", fmt:quakelive.statstip.FormatRank},
            {field:"PLAYER_NICK",title:"Player",extraClass:"tl",fmt:quakelive.statstip.FormatProfileLink},
            {field:"SCORE",title:"Score",extraClass:"tc",fmt:null},
            {field:"KILLS",title:"Frags",extraClass:"tc",fmt:null},
            {field:"DEATHS",title:"Deaths",extraClass:"tc",fmt:null},
            {field:"DAMAGE_DEALT",title:"DmgD",extraClass:"tc",fmt:null, alt:"Damage dealt"},
            {field:"DAMAGE_TAKEN",title:"DmgT",extraClass:"tc",fmt:null, alt:"Damage taken"},
            {field:"ACCURACY",title:"Acc",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Accuracy"},
            {field:"MIN",title:"Time",extraClas:"tc",fmt:quakelive.statstip.FormatTime},
            {field:"EXCELLENT",title:"Exc",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Excellent" medals', optional:true},
            {field:"IMPRESSIVE",title:"Imp",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Impressive" medals',optional:true},
            {field:"HUMILIATION",title:"Hum",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Humiliation" medals',optional:true}
        ],weaponFields:c,weaponAccFields:y,fieldOptions:null},
        {index:"SCOREBOARD_QUITTERS",type:"normal",fields:[
            {field:"RANK",title:"Rank",extraClass:"tc",fmt:quakelive.statstip.FormatRank},
            {field:"PLAYER_NICK",title:"Player",extraClass:"tl",fmt:quakelive.statstip.FormatProfileLink},
            {field:"SCORE", title:"Score",extraClass:"tc",fmt:null},
            {field:"KILLS",title:"Frags",extraClass:"tc",fmt:null},
            {field:"DEATHS",title:"Deaths",extraClass:"tc",fmt:null},
            {field:"DAMAGE_DEALT",title:"DmgD",extraClass:"tc",fmt:null, alt:"Damage dealt"},
            {field:"DAMAGE_TAKEN",title:"DmgT",extraClass:"tc",fmt:null, alt:"Damage taken"},
            {field:"ACCURACY",title:"Acc",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Accuracy"},
            {field:"MIN",title:"Time",extraClas:"tc",fmt:quakelive.statstip.FormatTime},
            {field:"EXCELLENT",title:"Exc",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Excellent" medals',optional:true},
            {field:"IMPRESSIVE",title:"Imp",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Impressive" medals', optional:true},
            {field:"HUMILIATION",title:"Hum",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Humiliation" medals',optional:true}
        ],weaponFields:c,weaponAccFields:y,fieldOptions:{quitters_summary:true,board_class:"SCOREBOARD"}},
        {index:"TEAM_SCOREBOARD",type:"team",fields:[
            {field:"TEAM",title:"Team",extraClass:"tl",fmt:null},
            {field:"CAPTURES",title:"Caps",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Captures"},
            {field:"DEFENDS",title:"Defs",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Defends"},
            {field:"ASSISTS",title:"Assts",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Assists"},
            {field:"ROUNDS_WON",title:"Rounds",extraClass:"tc",fmt:null,alt:"Rounds Won"},
            {field:"SCORE",title:"Score",extraClass:"tc",fmt:null},
            {field:"KILLS",title:"Frags",extraClass:"tc",fmt:null},
            {field:"DEATHS",title:"Deaths",extraClass:"tc",fmt:null},
            {field:"DAMAGE_DEALT",title:"DmgD",extraClass:"tc",fmt:null, alt:"Damage dealt"},
            {field:"DAMAGE_TAKEN",title:"DmgT",extraClass:"tc",fmt:null, alt:"Damage taken"},
            {field:"ACCURACY",title:"Acc",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Accuracy"},
            {field:"EXCELLENT",title:"Exc",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Excellent" medals', optional:true},
            {field:"IMPRESSIVE",title:"Imp",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Impressive" medals',optional:true},
            {field:"HUMILIATION",title:"Hum",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Humiliation" medals',optional:true}
        ],weaponFields:[
            {field:"TEAM",title:"Team",extraClass:"tl",fmt:null},
            {field:"GT",title:"GT",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Gauntlet"},
            {field:"MG",title:"MG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Machine Gun"},
            {field:"SG",title:"SG", extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Shot Gun"},
            {field:"GL",title:"GL",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Grenade Launcher"},
            {field:"LG",title:"LG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Lightning Gun"},
            {field:"RL",title:"RL",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Rocket Launcher"},
            {field:"RG",title:"RG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Rail Gun"},
            {field:"PG",title:"PG",extraClas:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Plasma Gun"},
            {field:"BFG", title:"BFG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"BFG"},
            {field:"CG",title:"CG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Chain Gun"},
            {field:"NG",title:"NG",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Nail Gun"},
            {field:"PM",title:"PL",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Prox Launcher"}
        ],weaponAccFields:[
            {field:"TEAM",title:"Team",extraClass:"tl",fmt:null},
            {field:"GT_A",title:"GT",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Gauntlet"},
            {field:"MG_A",title:"MG",extraClass:"tc", fmt:quakelive.statstip.FormatPercent,alt:"Machine Gun"},
            {field:"SG_A",title:"SG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Shot Gun"},
            {field:"GL_A",title:"GL",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Grenade Launcher"},
            {field:"LG_A",title:"LG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Lightning Gun"},
            {field:"RL_A",title:"RL",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Rocket Launcher"},
            {field:"RG_A",title:"RG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Rail Gun"},
            {field:"PG_A",title:"PG",extraClas:"tc", fmt:quakelive.statstip.FormatPercent,alt:"Plasma Gun"},
            {field:"BFG_A",title:"BFG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"BFG"},
            {field:"CG_A",title:"CG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Chain Gun"},
            {field:"NG_A",title:"NG",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Nail Gun"},
            {field:"PM_A",title:"PL",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Prox Launcher"}
        ],fieldOptions:null},
        {index:"RED_SCOREBOARD",type:"red",fields:l,weaponFields:e,weaponAccFields:r,fieldOptions:null,weaponFieldOptions:{class_prefix:"WP_"}},
        {index:"RED_SCOREBOARD_QUITTERS",type:"red",fields:l,weaponFields:e,weaponAccFields:r,fieldOptions:{board_type:"red",board_class:"RED_SCOREBOARD",quitters_summary:true}},
        {index:"BLUE_SCOREBOARD",type:"blue",fields:l,weaponFields:e,weaponAccFields:r,fieldOptions:null},
        {index:"BLUE_SCOREBOARD_QUITTERS",type:"blue",fields:l,weaponFields:e,weaponAccFields:r,fieldOptions:{board_type:"blue",board_class:"BLUE_SCOREBOARD",quitters_summary:true}}
    ];

    /**
     * Override quakelive.statstip.OnShowStatsDetails_Success to hook up additional functions
     */
    quakelive.statstip.OnShowStatsDetails_Success = function(m, k, u, n) {
        var a = $;
        a("#stats_datacontainer").html(quakelive.mod_stats.TPL_MATCH_DETAILS_INNER);
        k = [];
        u = [null,null];
        if (n.WINNING_TEAM) {
            var g = n.WINNING_TEAM.toUpperCase(),t = n.WINNING_TEAM != "NA" ? n[(g == "RED" ? "BLUE" : "RED") + "_SCOREBOARD"] : n.BLUE_SCOREBOARD;
            k[0] = (n.WINNING_TEAM != "NA" ? n[g + "_SCOREBOARD"] : n.RED_SCOREBOARD)[0];
            k[1] = t[0];
            if (n.WINNING_TEAM == n.TEAM_SCOREBOARD[0].TEAM) {
                u[0] = n.TEAM_SCOREBOARD[0];
                u[1] = n.TEAM_SCOREBOARD[1]
            } else {
                u[0] = n.TEAM_SCOREBOARD[1];
                u[1] = n.TEAM_SCOREBOARD[0]
            }
            winner = n.WINNING_TEAM
        } else {
            k[0] = n.SCOREBOARD[0];
            k[1] = n.SCOREBOARD[1];
            winner = k[0]
        }
        m.find("#match_vscontainer").empty().append(quakelive.statstip.GetVersusFrame(n.GAME_TYPE, k[0], k[1], u[0], u[1]));
        m.find("#match_gametype").html(quakelive.statstip.FormatGameType(n));
        m.find("#match_mapshot").html('<img alt="" src="' + quakelive.resource("/images/levelshots/md/" + n.MAP_NAME_SHORT + ".jpg") + '" width="112" height="84" class="placeImg" />');
        k = '<span class="grayNameTxt">' + n.MAP_NAME + "</span><br />";
        k += '<span class="Norm11px"><b>Date:</b> ' + n.GAME_TIMESTAMP_NICE + " ago</span><br />";
        k += '<span class="Norm11px"><b>Winner:</b> ';
        k += n.WINNING_TEAM ? n.WINNING_TEAM : n.SCOREBOARD[0].PLAYER_NICK;
        k += "</span><br />";
        k += '<span class="Norm11px"><b>Duration:</b> ' + n.GAME_LENGTH_NICE + "</span><br />";
        m.find("#match_maindata").html(k);
        k = m.find(".match_scoreboard").empty();
        u = m.find(".match_weapons").empty();
        g = m.find(".match_weaponaccuracy").empty();
        t = 0;
        var p = ["SCOREBOARD","TEAM_SCOREBOARD"];
        if (n.WINNING_TEAM)if (n.WINNING_TEAM.toLowerCase() == "red") {
            p[p.length] = "RED_SCOREBOARD";
            p[p.length] = "BLUE_SCOREBOARD"
        } else {
            p[p.length] = "BLUE_SCOREBOARD";
            p[p.length] = "RED_SCOREBOARD"
        }
        for (var x in p)for (var E = p[x],F = 0; F < quakelive.statstip.BOARD_DEFS.length; ++F) {
            var H = quakelive.statstip.BOARD_DEFS[F];
            if (n[H.index] && H.index == E) {
                if (t++ > 0) {
                    k.append("<br />");
                    u.append("<br />");
                    g.append("<br />")
                }
                k.append(quakelive.statstip.GetScoreboard(n, H));
                u.append(quakelive.statstip.GetWeaponDetails(n, H));
                g.append(quakelive.statstip.GetWeaponAccuracyDetails(n, H));
                if (H.index == "RED_SCOREBOARD" || H.index == "BLUE_SCOREBOARD" || H.index == "SCOREBOARD")if (n[H.index + "_QUITTERS"]) {
                    E = quakelive.statstip.BOARD_DEFS[F + 1];
                    k.append(quakelive.statstip.GetScoreboard(n, E));
                    u.append(quakelive.statstip.GetWeaponDetails(n, E));
                    g.append(quakelive.statstip.GetWeaponAccuracyDetails(n, E))
                }
                break
            }
        }

        var I = quakelive.siteConfig.baseUrl + "/r/" + quakelive.UndecorateAnchor(window.location.hash);
        x = "QUAKE LIVE Game Details\n\n";
        k = "Check out the details of this QUAKE LIVE game here:\n\n" + quakelive.siteConfig.baseUrl + "/" + window.location.hash + "\n\nArena: " + n.MAP_NAME + "\nGame type: " + quakelive.statstip.FormatGameType(n) + "\nDate played: " + n.GAME_TIMESTAMP + "\n\nNote: This link will expire at " + n.GAME_EXPIRES_FULL + "\n\nQUAKE LIVE is a totally FREE online multiplayer game from id Software, the makers of DOOM and QUAKE.  Easily play against friends or others at your skill level in more than 30 arenas and 5 exciting game modes. Check us out at www.quakelive.com.\n";
        x = x.replace(/ /g, "%20");
        k = k.replace(/ /g, "%20").replace(/\n/g, "%0D").replace(/#/g, "%23");
        m.find(".share_email").attr("href", "mailto:?subject=" + x + "&body=" + k);
        var K = this;
        m.find(".share_link").click(function() {
            qlPrompt({title:"Link to this match",body:"Copy and paste the below URL to link to this match.<br/><br/><b>Arena:</b> " + n.MAP_NAME + "<br/><b>Game type:</b> " + K.FormatGameType(n) + "<br/><b>Date played:</b> " + n.GAME_TIMESTAMP + "<br/><br/><center>This link will expire at " + n.GAME_EXPIRES_FULL + "</center>", input:true,inputLabel:I,inputReadOnly:true,alert:true})
        });
        if (typeof addthis != "undefined") {
            x = a("<a class='addthis_button' href='http://www.addthis.com/bookmark.php?v=250&pub=idsoftware'><img src='" + quakelive.resource("/images/share_button.gif") + "' width='67' height='15' alt='Bookmark and Share' style='border:0'/></a>");
            k = {url:I,title:"Quake Live Match - " + quakelive.statstip.FormatGameType(n) + " on " + n.MAP_NAME,templates:{twitter:quakelive.mod_profile && quakelive.mod_profile.activeProfileName ? "Check out this " + quakelive.statstip.FormatGameTypeShort(n) + " match on " + n.MAP_NAME + " that " + quakelive.mod_profile.activeProfileName + " played @QuakeLive! {{url}} #QLmatch" : "Check out this " + quakelive.statstip.FormatGameTypeShort(n) + " match on " + n.MAP_NAME + " @QuakeLive! {{url}} #QLmatch"}};
            addthis.button(x.get(), addthis_config, k);
            m.find(".addthis_container").empty().append(x)
        }
        quakelive.statstip.ShowVerts(m);
        extra(n);
    };

    var extra = function (n) {
        var dfb = 0, dfr = 0, dddb = 0, dddr = 0, ddtb = 0, ddtr = 0, ddb = 0, ddr = 0;

        $(".teamBG thead .TEAM_SCOREBOARD_DEATHS").after("<th class=\"TEAM_SCOREBOARD_NETD tc\">netD</th>").after("<th class=\"TEAM_SCOREBOARD_DAMAGE_TAKEN tc\">DmgT</th>").after("<th class=\"TEAM_SCOREBOARD_DAMAGE_DEALT tc\">DmgD</th>").after("<th class=\"TEAM_SCOREBOARD_NETF tc\">netF</th>");
        $(".teamBG tbody tr").each(function() {
            if ($($(this).find("td")[0]).text().toLowerCase() == "blue") $(this).addClass("TEAM_BLUE_SCOREBOARD");
            if ($($(this).find("td")[0]).text().toLowerCase() == "red") $(this).addClass("TEAM_RED_SCOREBOARD");
            $($(this).find(".TEAM_SCOREBOARD_DEATHS")).after("<td class=\"TEAM_SCOREBOARD_NETD tc\">&nbsp;</td>").after("<td class=\"TEAM_SCOREBOARD_DAMAGE_TAKEN tc\">&nbsp;</td>").after("<td class=\"TEAM_SCOREBOARD_DAMAGE_DEALT tc\">&nbsp;</td>").after("<td class=\"TEAM_SCOREBOARD_NETF tc\">&nbsp;</td>");
        });

        $(".blueBG thead .BLUE_SCOREBOARD_DEATHS").after("<th class=\"BLUE_SCOREBOARD_NETF tc\">netF</th>");
        $(".redBG thead .RED_SCOREBOARD_DEATHS").after("<th class=\"RED_SCOREBOARD_NETF tc\">netF</th>");
        $(".normalBG thead .SCOREBOARD_DEATHS").after("<th class=\"SCOREBOARD_NETF tc\">netF</th>");

        $(".blueBG tbody .BLUE_SCOREBOARD_DEATHS,.quitterstable_blue tbody .BLUE_SCOREBOARD_DEATHS").after("<td class=\"BLUE_SCOREBOARD_NETF\">&nbsp;</td>");
        $(".quitterstable_blue thead .BLUE_SCOREBOARD_DEATHS").after("<th class=\"BLUE_SCOREBOARD_NETF\">&nbsp;</tH>");
        $(".redBG tbody .RED_SCOREBOARD_DEATHS, .quitterstable_red tbody .RED_SCOREBOARD_DEATHS").after("<td class=\"RED_SCOREBOARD_NETF\">&nbsp;</td>");
        $(".quitterstable_red thead .RED_SCOREBOARD_DEATHS").after("<th class=\"RED_SCOREBOARD_NETF\">&nbsp;</th>");

        $(".normalBG tbody .SCOREBOARD_DEATHS, .quitterstable_normal tbody .SCOREBOARD_DEATHS").after("<td class=\"SCOREBOARD_NETF\">&nbsp;</td>");
        $(".quitterstable_normal thead .SCOREBOARD_DEATHS").after("<th class=\"SCOREBOARD_NETF\">&nbsp;</th>");

        $(".blueBG thead .BLUE_SCOREBOARD_DAMAGE_TAKEN").after("<th class=\"BLUE_SCOREBOARD_NETD tc\">netD</th>");
        $(".redBG thead .RED_SCOREBOARD_DAMAGE_TAKEN").after("<th class=\"RED_SCOREBOARD_NETD tc\">netD</th>");
        $(".normalBG thead .SCOREBOARD_DAMAGE_TAKEN").after("<th class=\"SCOREBOARD_NETD tc\">netD</th>");
        $(".blueBG tbody .BLUE_SCOREBOARD_DAMAGE_TAKEN,.quitterstable_blue thead .BLUE_SCOREBOARD_DAMAGE_TAKEN,.quitterstable_blue tbody .BLUE_SCOREBOARD_DAMAGE_TAKEN").after("<td class=\"BLUE_SCOREBOARD_NETD\">&nbsp;</td>");
        $(".redBG tbody .RED_SCOREBOARD_DAMAGE_TAKEN,.quitterstable_red thead .RED_SCOREBOARD_DAMAGE_TAKEN,.quitterstable_red tbody .RED_SCOREBOARD_DAMAGE_TAKEN").after("<td class=\"RED_SCOREBOARD_NETD\">&nbsp;</td>");
        $(".normalBG tbody .SCOREBOARD_DAMAGE_TAKEN,.quitterstable_normal thead .SCOREBOARD_DAMAGE_TAKEN,.quitterstable_normal tbody .SCOREBOARD_DAMAGE_TAKEN").after("<td class=\"SCOREBOARD_NETD\">&nbsp;</td>");

        //sum netF
        $("tbody .BLUE_SCOREBOARD_NETF, .quitterstable_blue .BLUE_SCOREBOARD_NETF").each(function() {
            var x = (n.GAME_TYPE == "tdm") ? parseInt($(this).prev().prev().prev().text()) - parseInt($(this).prev().text()) : parseInt($(this).prev().prev().text()) - parseInt($(this).prev().text());
            if ($(this).is("td")) dfb += x;
            $(this).text(x);
        });
        $("tbody .RED_SCOREBOARD_NETF, .quitterstable_red .RED_SCOREBOARD_NETF").each(function() {
            var x = (n.GAME_TYPE == "tdm") ? parseInt($(this).prev().prev().prev().text()) - parseInt($(this).prev().text()) : parseInt($(this).prev().prev().text()) - parseInt($(this).prev().text());
            if ($(this).is("td")) dfr += x;
            $(this).text(x);
        });
        $("tbody .SCOREBOARD_NETF, .quitterstable_normal .SCOREBOARD_NETF").each(function() {
            $(this).text(parseInt($(this).prev().prev().prev().text()) - parseInt($(this).prev().text()));
        });
        $(".TEAM_RED_SCOREBOARD").find(".TEAM_SCOREBOARD_NETF").text(dfr);
        $(".TEAM_BLUE_SCOREBOARD").find(".TEAM_SCOREBOARD_NETF").text(dfb);

        //sum dmgD
        $("tbody .BLUE_SCOREBOARD_DAMAGE_DEALT, .quitterstable_blue .BLUE_SCOREBOARD_DAMAGE_DEALT").each(function() {
            dddb += parseInt($(this).text());
        });
        $("tbody .RED_SCOREBOARD_DAMAGE_DEALT, .quitterstable_red .RED_SCOREBOARD_DAMAGE_DEALT").each(function() {
            dddr += parseInt($(this).text());
        });
        $(".TEAM_RED_SCOREBOARD").find(".TEAM_SCOREBOARD_DAMAGE_DEALT").text(dddr);
        $(".TEAM_BLUE_SCOREBOARD").find(".TEAM_SCOREBOARD_DAMAGE_DEALT").text(dddb);

        //sum dmgT
        $("tbody .BLUE_SCOREBOARD_DAMAGE_TAKEN, .quitterstable_blue .BLUE_SCOREBOARD_DAMAGE_TAKEN").each(function() {
            ddtb += parseInt($(this).text());
        });
        $("tbody .RED_SCOREBOARD_DAMAGE_TAKEN, .quitterstable_red .RED_SCOREBOARD_DAMAGE_TAKEN").each(function() {
            ddtr += parseInt($(this).text())
        });
        $(".TEAM_RED_SCOREBOARD").find(".TEAM_SCOREBOARD_DAMAGE_TAKEN").text(ddtr);
        $(".TEAM_BLUE_SCOREBOARD").find(".TEAM_SCOREBOARD_DAMAGE_TAKEN").text(ddtb);

        //sum netD
        $("tbody .BLUE_SCOREBOARD_NETD, .quitterstable_blue .BLUE_SCOREBOARD_NETD").each(function() {
            var x = parseInt($(this).prev().prev().text()) - parseInt($(this).prev().text());
            ddb += x;
            $(this).text(x);
        });
        $("tbody .RED_SCOREBOARD_NETD, .quitterstable_red .RED_SCOREBOARD_NETD").each(function() {
            var x = parseInt($(this).prev().prev().text()) - parseInt($(this).prev().text());
            ddr += x;
            $(this).text(x);
        });
        $("tbody .SCOREBOARD_NETD, .quitterstable_normal .SCOREBOARD_NETD").each(function() {
            $(this).text(parseInt($(this).prev().prev().text()) - parseInt($(this).prev().text()));
        });
        $(".TEAM_RED_SCOREBOARD").find(".TEAM_SCOREBOARD_NETD").text(ddr);
        $(".TEAM_BLUE_SCOREBOARD").find(".TEAM_SCOREBOARD_NETD").text(ddb);

        //inherited
        $.tablesorter.addParser({id:"names",
            is:function() {
                return false
            },format:function(S) {
                return S = (S = $(S)[2]) ? S.innerHTML.toLowerCase() : "-"
            },type:"text"});
        $.tablesorter.addParser({id:"int",is:function(S) {
            return S.split(":").length !== 2
        },format:function(S) {
            return $.tablesorter.formatInt(S)
        },type:"numeric"});
        $.tablesorter.addParser({id:"time",is:function(S) {
            return S.split(":").length === 2
        },format:function(S) {
            S = S.split(":");
            return S[0] * 60 + S[1]
        }});
        $.tablesorter.defaults.sortList = [
            [0,0]
        ];
        $.tablesorter.defaults.widgets = ["zebra"];
        $.tablesorter.defaults.widgetZebra = {css:["normalZebraOff","normalZebraOn"]};
        $.tablesorter.defaults.cssHeader = "";
        $.tablesorter.defaults.headers = {1:{sorter:"names"},2:{sorter:"numeric"},3:{sorter:"numeric"},4:{sorter:"numeric"},5:{sorter:"numeric"},6:{sorter:"numeric"},7:{sorter:"numeric"},8:{sorter:"numeric"},9:{sorter:"numeric"},10:{sorter:"numeric"},11:{sorter:"numeric"},12:{sorter:"numeric"},13:{sorter:"numeric"}};
        $("div#stats_datacontainer table:not(.teamBG, .quitterstable_normal, .quitterstable_red, .quitterstable_blue)").tablesorter();
        $("table.teamBG").tablesorter({sortList:[
            [1,0]
        ],headers:{0:{sorter:"text"},1:{sorter:"numeric"}}});
        var x = $(".quitterstable_normal, .quitterstable_red, .quitterstable_blue");
        x.find("tbody tr:even").addClass("normalZebraOff");
        x.find("tbody tr:odd").addClass("normalZebraOn");
        x.find("thead tr").click(quakelive.statstip.ToggleQuitters);

        $(".match_scoreboard > .board_blue > table,.match_scoreboard > .board_red > table,.match_scoreboard > .board_team > table,.match_scoreboard > .board_normal > table,.match_weaponaccuracy > .board_normal > table,.match_weaponaccuracy > .board_team > table,.match_weaponaccuracy > .board_blue > table,.match_weaponaccuracy > .board_red > table").each(function(S, ea) {
            for (var fa = [],R = [],W = ea.rows,Z = 0; Z < W.length; Z++)for (var ja = W[Z].getElementsByTagName("td"),ia = 0; ia < ja.length; ia++) {
                if (fa[ia] === undefined)fa[ia] = [];
                var ta = ja[ia].className;
                if (!/(SCOREBOARD_TEAM_RANK|SCOREBOARD_PLAYER_NICK|SCOREBOARD_MIN|SCOREBOARD_RANK)/.test(ta)) {
                    var xa = parseInt(ja[ia].innerHTML);
                    if (/(SCOREBOARD_DEATHS|DAMAGE_TAKEN)/.test(ta) ? !isNaN(xa) && (xa < R[ia] || R[ia] == undefined) : !isNaN(xa) && (xa > R[ia] || R[ia] == undefined)) {
                        fa[ia] = [ja[ia]];
                        R[ia] = xa;
                    } else xa == R[ia] && fa[ia].push(ja[ia])
                }
            }
            for (Z = 0; Z < fa.length; Z++)
                for (ia = 0; ia < fa[Z].length; ia++)
                    $(fa[Z][ia]).addClass("maxTableValue")
        });
    };

    GM_addStyle("" +
                ".dataDetailL th, .dataDetailL td{font-size:11px !important;line-height:20px !important;width:34px !important;padding:2px !important;text-align:center !important;}" +
                ".dataDetailL .tl{width:120px !important;text-align:left !important;}" +
                "");
}

if (new RegExp('Firefox/\\d', 'i').test(navigator.userAgent)) {
    //Firefox
    QuakeliveExtendedStats(unsafeWindow);
} else {
    //Chrome
    var scriptNode = document.createElement("script");
    scriptNode.setAttribute("type", "text/javascript");
    scriptNode.text = "(" + QuakeliveExtendedStats.toString() + ")(window);";
    document.body.appendChild(scriptNode);
}