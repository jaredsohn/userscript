// ==UserScript==
// @name      	Quake Live Extended Stats
// @version     1.14
// @namespace   http://userscripts.org/scripts/show/126719
// @homepage    http://userscripts.org/scripts/show/126719
// @description Additional stats (like net frags and damage, game location and weapon shots) on Match Details.
// @author      Lam
// @include     http://*.quakelive.com/*
// @exclude     http://*.quakelive.com/forum*
// @downloadURL https://userscripts.org/scripts/source/126719.user.js
// @updateURL   https://userscripts.org/scripts/source/126719.meta.js
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
        {field:"SCORE",title:"Score",extraClass:"tc",fmt:null},
        {field:"KILLS",title:"Frags",extraClass:"tc",fmt:null},
        {field:"DEATHS",title:"Deaths",extraClass:"tc",fmt:null},
        {field:"CAPTURES",title:"Caps",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Captures"},
        {field:"DEFENDS",title:"Defd",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Defends"},
        {field:"ASSISTS",title:"Assts",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Assists"},
        {field:"THAWS",title:"Thaws",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber, alt:"Thaw Assists"},
        {field:"ROUNDS_WON",title:"Rounds Won",extraClass:"tc",fmt:null},
        {field:"DAMAGE_DEALT",title:"DmgD",extraClass:"tc",fmt:null, alt:"Damage Dealt"},
        {field:"DAMAGE_TAKEN",title:"DmgR",extraClass:"tc",fmt:null, alt:"Damage Received"},
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
            {field:"DAMAGE_DEALT",title:"DmgD",extraClass:"tc",fmt:null, alt:"Damage Dealt"},
            {field:"DAMAGE_TAKEN",title:"DmgR",extraClass:"tc",fmt:null, alt:"Damage Received"},
            {field:"ACCURACY",title:"Acc",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Accuracy"},
            {field:"MIN",title:"Time",extraClass:"tc",fmt:quakelive.statstip.FormatTime},
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
            {field:"DAMAGE_DEALT",title:"DmgD",extraClass:"tc",fmt:null, alt:"Damage Dealt"},
            {field:"DAMAGE_TAKEN",title:"DmgR",extraClass:"tc",fmt:null, alt:"Damage Received"},
            {field:"ACCURACY",title:"Acc",extraClass:"tc",fmt:quakelive.statstip.FormatPercent,alt:"Accuracy"},
            {field:"MIN",title:"Time",extraClass:"tc",fmt:quakelive.statstip.FormatTime},
            {field:"EXCELLENT",title:"Exc",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Excellent" medals',optional:true},
            {field:"IMPRESSIVE",title:"Imp",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Impressive" medals', optional:true},
            {field:"HUMILIATION",title:"Hum",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:'"Humiliation" medals',optional:true}
        ],weaponFields:c,weaponAccFields:y,fieldOptions:{quitters_summary:true,board_class:"SCOREBOARD"}},
        { index: 'RACE_SCOREBOARD', type: 'normal', fields: [
            { field: 'RANK', title: 'Rank', extraClass: 'tc', fmt: quakelive.statstip.FormatRank },
            { field: 'PLAYER_NICK', title: 'Player', extraClass: 'tl', fmt: quakelive.statstip.FormatProfileLink },
            { field: 'SCORE', title: 'Best Time', extraClass: 'tc', fmt: quakelive.statstip.FormatTimeMsec },
            { field: "MIN", title: "Time Played", extraClass: "tc", fmt: quakelive.statstip.FormatTime }
          ],weaponFields: c,weaponAccFields: y, fieldOptions: { board_class: 'SCOREBOARD' } },
        { index: 'RACE_SCOREBOARD_QUITTERS', type: 'normal', fields: [
            { field: 'RANK', title: 'Rank', extraClass: 'tc', fmt: quakelive.statstip.FormatRank },
            { field: 'PLAYER_NICK', title: 'Player', extraClass: 'tl', fmt: quakelive.statstip.FormatProfileLink },
            { field: 'SCORE', title: 'Best Time', extraClass: 'tc', fmt: quakelive.statstip.FormatTimeMsec },
            { field: "MIN", title: "Time Played", extraClass: "tc", fmt: quakelive.statstip.FormatTime }
          ], weaponFields: c, weaponAccFields: y, fieldOptions: { quitters_summary: true, board_class: 'SCOREBOARD' } },
        {index:"TEAM_SCOREBOARD",type:"team",fields:[
            {field:"TEAM",title:"Team",extraClass:"tl",fmt:null},
            {field:"CAPTURES",title:"Caps",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Captures"},
            {field:"DEFENDS",title:"Defs",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Defends"},
            {field:"ASSISTS",title:"Assts",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Flag Assists"},
            {field:"ROUNDS_WON",title:"Rounds",extraClass:"tc",fmt:null,alt:"Rounds Won"},
            {field:"SCORE",title:"Score",extraClass:"tc",fmt:null},
            {field:"THAWS",title:"Thaws",extraClass:"tc",fmt:quakelive.statstip.FormatWeaponNumber,alt:"Thaw Assists"},
            {field:"KILLS",title:"Frags",extraClass:"tc",fmt:null},
            {field:"DEATHS",title:"Deaths",extraClass:"tc",fmt:null},
            {field:"DAMAGE_DEALT",title:"DmgD",extraClass:"tc",fmt:null, alt:"Damage Dealt"},
            {field:"DAMAGE_TAKEN",title:"DmgR",extraClass:"tc",fmt:null, alt:"Damage Received"},
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

// QL no longer breaks on teams without players, even with all quitters, as of 2012-04-30 update (QLPP12)
// workarounds removed. http://www.quakelive.com/#!profile/*/*/108a6f8a-ef8f-11e0-8a3a-00259031fd90/tdm/1


    /*
     * This is overriden to add hits/shots to weapons on the accuracy tab
     */
    quakelive.statstip.GetHtmlForFields = function(json, boardDef, boardFields, userOptions) {
      var options = $.extend({}, {
        'board_data': null,
        'board_type': boardDef.type,
        'board_class': boardDef.index,
        'show_optional': true
      }, userOptions);
      if (options.class_prefix) {
        options.board_class = options.class_prefix + options.board_class
      }
      var sb = options.board_data || json[boardDef.index];
      var cls = options.quitters_summary ? "" : ("board_" + options.board_type);
      var html = "<div class='" + cls + "'>";
      if (!options.quitters_summary) {
        html += "<table class='" + options.board_type + "BG'>";
        html += "<thead><tr>";
        var hsb = (sb[0]) ? sb[0] : json[boardDef.index + '_QUITTERS'][0];
        for (var fieldIndex in boardFields) {
          var fieldDef = boardFields[fieldIndex];
          if (hsb && typeof(hsb[fieldDef.field]) != 'undefined') {
            if (fieldDef.optional && options.show_optional == false) {
              continue
            } else {
              html += "<th class='" + options.board_class + "_" + fieldDef.field + " " + fieldDef.extraClass + "'";
              if (fieldDef.alt) {
                html += " title=\"" + fieldDef.alt + "\""
              }
              html += ">" + fieldDef.title + "</th>"
            }
          }
        }
        html += "</tr></thead>"
      } else {
        html += "<table class='quitterstable_" + options.board_type + "'><thead>"
      }
      var count = 0;
      for (var i = 0; i < sb.length; i++) {
        var player = sb[i];
        var className = "";
        html += "<tr class='";
        if (options.quitters_summary && !player['QUITTERS_SUM']) {
          html += " " + (player['TEAM'] ? player['TEAM'] : '') + 'Quitters'
        }
        html += "'";
        if (options.quitters_summary && !player['QUITTERS_SUM']) {
          html += " style='display: none'"
        }
        html += ">";
        for (var fieldIndex in boardFields) {
          var fieldDef = boardFields[fieldIndex];
          if (fieldDef.optional && options.show_optional == false) {
            continue
          } else {
            if (typeof(player[fieldDef.field]) != 'undefined') {
              var value = player[fieldDef.field];
              if (fieldDef.fmt) {
                value = fieldDef.fmt(value, player, boardDef)
              }
              if (typeof(value) == 'undefined' || typeof(value) == 'NaN') {
                value = ''
              }
              if (value == -999) {
                value = '-'
              }
              if (player['QUITTERS_SUM']) {
                var tag = "th"
              } else {
                var tag = "td"
              }
// all magic here
              var accmapping = {
//             	"GT_A":{hits:"GAUNTLET_HITS",shots:"GAUNTLET_SHOTS"}, -- this is in the stats, but as 0/0
              	"MG_A":{hits:"MACHINEGUN_HITS",shots:"MACHINEGUN_SHOTS"},
              	"SG_A":{hits:"SHOTGUN_HITS",shots:"SHOTGUN_SHOTS"},
              	"GL_A":{hits:"GRENADE_HITS",shots:"GRENADE_SHOTS"},
              	"LG_A":{hits:"LIGHTNING_HITS",shots:"LIGHTNING_SHOTS"},
              	"RL_A":{hits:"ROCKET_HITS",shots:"ROCKET_SHOTS"},
              	"RG_A":{hits:"RAILGUN_HITS",shots:"RAILGUN_SHOTS"},
              	"PG_A":{hits:"PLASMA_HITS",shots:"PLASMA_SHOTS"},
              	"BFG_A":{hits:"BFG_HITS",shots:"BFG_SHOTS"},
              	"CG_A":{hits:"CHAINGUN_HITS",shots:"CHAINGUN_SHOTS"},
              	"NG_A":{hits:"NAILGUN_HITS",shots:"NAILGUN_SHOTS"},
              	"PM_A":{hits:"PROXMINE_HITS",shots:"PROXMINE_SHOTS"} 

              };
              var popuptitle = "";
              if ( accmapping[ fieldDef.field ] ) {
              	if ( player[ accmapping[ fieldDef.field ].shots ] > 0 ) {
                  popuptitle = " title = 'Hits: " + player[ accmapping[ fieldDef.field ].hits ] + " / "
                               + player[ accmapping[ fieldDef.field ].shots ] + " Shots'";
                } else {
                  popuptitle = " title = 'Never fired'";
                }
              }
              html += "<" + tag + " class='" + options.board_class + "_" + fieldDef.field + " " + fieldDef.extraClass + "'" + popuptitle + ">" + value + "</+" + tag + ">"
// magic ends
            }
          }
        }
        html += "</tr>";
        if (player['QUITTERS_SUM']) {
          html += "</thead>"
        }
      }
      html += "</table>";
      return html
    };

    /**
     * Override quakelive.statstip.OnShowStatsDetails_Success to hook up additional functions
     */
    quakelive.statstip.OnShowStatsDetails_Success = function(node, public_id, game_type, json) {
      $('#stats_datacontainer').html(quakelive.mod_stats.TPL_MATCH_DETAILS_INNER);
      var topPlayers = [];
      var topTeams = [null, null];
      if (json.WINNING_TEAM) {
        var teamId = json.WINNING_TEAM.toUpperCase();
        if (teamId == 'NA') {
          teamId = 'RED'
        }
        var teamScoreboard = json[teamId + "_SCOREBOARD"];
        if (!teamScoreboard || !teamScoreboard.length) {
          teamScoreboard = json[teamId + "_SCOREBOARD_QUITTERS"]
        }
        var oppScoreboard = json[(teamId == "RED" ? "BLUE" : "RED") + "_SCOREBOARD"];
        if (!oppScoreboard || !oppScoreboard.length) {
          oppScoreboard = json[(teamId == "RED" ? "BLUE" : "RED") + "_SCOREBOARD_QUITTERS"]
        }
        topPlayers[0] = teamScoreboard[0];
        topPlayers[1] = oppScoreboard[0];
        if (json.WINNING_TEAM == json.TEAM_SCOREBOARD[0].TEAM) {
          topTeams[0] = json.TEAM_SCOREBOARD[0];
          topTeams[1] = json.TEAM_SCOREBOARD[1]
        } else {
          topTeams[0] = json.TEAM_SCOREBOARD[1];
          topTeams[1] = json.TEAM_SCOREBOARD[0]
        }
        winner = json.WINNING_TEAM
      } else {
        if ( json.GAME_TYPE == 'race' ) {
          topPlayers[0] = json.RACE_SCOREBOARD[0];
          topPlayers[1] = json.RACE_SCOREBOARD[1];
          winner = topPlayers[0];
        } else {
          topPlayers[0] = json.SCOREBOARD[0];
          topPlayers[1] = json.SCOREBOARD[1];
          winner = topPlayers[0]
        }
      }
      node.find('#match_vscontainer').empty().append(this.GetVersusFrame(json.GAME_TYPE, topPlayers[0], topPlayers[1], topTeams[0], topTeams[1]));
      node.find('#match_gametype').html(this.FormatGameType(json));
      node.find('#match_mapshot').html("<img alt=\"\" src=\"" + quakelive.resource("/images/levelshots/md/" + json.MAP_NAME_SHORT + ".jpg") + "\" width=\"112\" height=\"84\" class=\"placeImg\" />");
      var html = "<span class=\"grayNameTxt\">" + json.MAP_NAME + "</span><br />";
      html += "<span class=\"Norm11px\"><b>Date:</b> <span class=\"text_tooltip\" title=\"" + json.GAME_TIMESTAMP + "\">" + json.GAME_TIMESTAMP_NICE + " ago</span><br />";
      html += "<span class=\"Norm11px\"><b>Winner:</b> ";
      if (json.WINNING_TEAM) {
        html += json.WINNING_TEAM
      } else {
        if ( json.GAME_TYPE == 'race' ) {
          html += json.RACE_SCOREBOARD[0].PLAYER_NICK;
        } else {
          html += json.SCOREBOARD[0].PLAYER_NICK
        }
      }
      html += "</span><br />";
      html += "<span class=\"Norm11px\"><b>Duration:</b> " + json.GAME_LENGTH_NICE + "</span><br />";
      html += "<span class=\"Norm11px\"><b>Ranked:</b> " + (json.RANKED == 1 ? "Yes" : "No") + "</span><br />";

      // magic
      var qlslist = {
		"qls11": "San Francisco",
		"qls13": "Palo Alto",
		"qls14": "Ashburn",
		"qls19": "Amsterdam",
		"qls23": "Frankfurt",
		"qls26": "Frankfurt",
		"qls27": "Frankfurt",
		"qls31": "Frankfurt",
		"qls32": "Dallas",
		"qls33": "Dallas",
		"qls35": "Maidenhead",
		"qls36": "Maidenhead",
		"qls45": "Paris",
		"qls46": "Paris",
		"qls48": "Chicago",
		"qls62": "Atlanta",
		"qls65": "New York",
		"qls67": "Los Angeles",
		"qls68": "Seatle",
		"qls69": "Toronto",
		"qls71": "Madrid",
		"qls76": "Warsaw",
		"qls77": "Sydney",
		"qls79": "Sydney",
		"qls80": "Perth",
		"qls83": "Santiago",
		"qls84": "Bucharest",
		"qls85": "Buenos Aires",
		"qls86": "Keflavik",
		"qls87": "Tokyo",
		"qls89": "Moscow",
		"qls91": "Johannesburg",
		"qls92": "Beograd",
		"qls94": "Seoul",
		"qls96": "Adelaide",
		"qls98": "Kiev",
		"qls99": "Stockholm",
		"qls100": "Milan",
		"qls101": "Singapore",
		"qls102": "Washington",
		"qls103": "Bucharest",
		"qls104": "Indianapolis",
		"qls105": "Seattle",
		"qls106": "Chicago",
		"qls107": "Rotterdam",
		"qls108": "Rotterdam",
		"qls109": "Oslo",
		"qls110": "São Paulo",
		"qls111": "Istanbul",
		"qls112": "Auckland",
		"qlslan3": "UGC LAN",
		"qlslan4": "DreamHack LAN",
		"qlslan6": "The Party LAN",
		"qlsbyoc": "QuakeCon BYOC",
		"adroits": "Adroits LAN",
		"praguelan": "Prague LAN"
      }

      if ( qlslist[ json.QLS ] )
	html += '<span class="Norm11px"><b>Location:</b> ' + qlslist[ json.QLS ] + "</span><br />";
      else
	html += '<span class="Norm11px"><b>Location:</b> ' + json.QLS + "</span><br />";

      node.find('#match_maindata').html(html);
      var container = node.find('.match_scoreboard').empty();
      var wpContainer = node.find('.match_weapons').empty();
      var wpAccContainer = node.find('.match_weaponaccuracy').empty();
      var count = 0;
      var boardOrder = ['SCOREBOARD', 'TEAM_SCOREBOARD', 'RACE_SCOREBOARD'];
      if (json.WINNING_TEAM) {
        if (json.WINNING_TEAM.toLowerCase() == 'red') {
          boardOrder[boardOrder.length] = 'RED_SCOREBOARD';
          boardOrder[boardOrder.length] = 'BLUE_SCOREBOARD'
        } else {
          boardOrder[boardOrder.length] = 'BLUE_SCOREBOARD';
          boardOrder[boardOrder.length] = 'RED_SCOREBOARD'
        }
      }
      for (var orderIndex in boardOrder) {
        var boardId = boardOrder[orderIndex];
        var i = 0;
        for (; i < this.BOARD_DEFS.length; ++i) {
          var boardDef = this.BOARD_DEFS[i];
          if (json[boardDef.index] && boardDef.index == boardId) {
            if (count++ > 0) {
              container.append('<br />');
              wpContainer.append('<br />');
              wpAccContainer.append('<br />')
            }
            container.append(this.GetScoreboard(json, boardDef));
            wpContainer.append(this.GetWeaponDetails(json, boardDef));
            wpAccContainer.append(this.GetWeaponAccuracyDetails(json, boardDef));
            if (boardDef.index == 'RED_SCOREBOARD' || boardDef.index == 'BLUE_SCOREBOARD' || boardDef.index == 'SCOREBOARD' || boardDef.index == 'RACE_SCOREBOARD') {
              var quittersIndex = boardDef.index + '_QUITTERS';
              if (json[quittersIndex]) {
                var quittersDef = this.BOARD_DEFS[i + 1];
                container.append(this.GetScoreboard(json, quittersDef));
                wpContainer.append(this.GetWeaponDetails(json, quittersDef));
                wpAccContainer.append(this.GetWeaponAccuracyDetails(json, quittersDef))
              }
            }
            break
          }
        }
      }

      // more magic
      extra(json);

      $.tablesorter.addParser({
        id: 'names',
        is: function(s) {
          return false
        },
        format: function(s) {
          s = $(s)[2];
          if (s) {
            s = s.innerHTML.toLowerCase()
          } else {
            s = '-'
          }
          return s
        },
        type: 'text'
      });
      $.tablesorter.addParser({
        id: 'int',
        is: function(s) {
          return (s.split(':').length !== 2)
        },
        format: function(s) {
          return $.tablesorter.formatInt(s)
        },
        type: 'numeric'
      });
      $.tablesorter.addParser({
        id: 'time',
        is: function(s) {
          return (s.split(':').length === 2)
        },
        format: function(s) {
          var parts = s.split(':');
          return parts[0] * 60 + parts[1]
        }
      });
      $.tablesorter.defaults.sortList = [
        [0, 0]
      ];
      $.tablesorter.defaults.widgets = ['zebra'];
      $.tablesorter.defaults.widgetZebra = {
        css: ["normalZebraOff", "normalZebraOn"]
      };
      $.tablesorter.defaults.cssHeader = '';
      $.tablesorter.defaults.headers = {
        1: { sorter: 'names' },
        2: { sorter: 'numeric' },
        3: { sorter: 'numeric' },
        4: { sorter: 'numeric' },
        5: { sorter: 'numeric' },
        6: { sorter: 'numeric' },
        7: { sorter: 'numeric' },
        8: { sorter: 'numeric' },
        9: { sorter: 'numeric' },
        10: { sorter: 'numeric' },
        11: { sorter: 'numeric' },
        12: { sorter: 'numeric' },
        13: { sorter: 'numeric' }
      };
      this.setupTableSorter();
      var quittersTables = $('.quitterstable_normal, .quitterstable_red, .quitterstable_blue');
      quittersTables.find('tbody tr:even').addClass('normalZebraOff');
      quittersTables.find('tbody tr:odd').addClass('normalZebraOn');
      quittersTables.find('thead tr').click(this.ToggleQuitters);
      var sel = ['.match_scoreboard > .board_blue > table', '.match_scoreboard > .board_red > table', '.match_scoreboard > .board_team > table', '.match_scoreboard > .board_normal > table', '.match_weaponaccuracy > .board_normal > table', '.match_weaponaccuracy > .board_team > table', '.match_weaponaccuracy > .board_blue > table', '.match_weaponaccuracy > .board_red > table'].join(',');
      $(sel).each(function(i, table) {
        var maxValNodes = [];
        var maxVals = [];
        var rows = table.rows;
        for (var x = 0; x < rows.length; x++) {
          var td = rows[x].getElementsByTagName('td');
          for (var y = 0; y < td.length; y++) {
            if (maxValNodes[y] === undefined) {
              maxValNodes[y] = []
            }
            var thisClass = td[y].className;
            if (!/(SCOREBOARD_TEAM_RANK|SCOREBOARD_PLAYER_NICK|SCOREBOARD_MIN|SCOREBOARD_RANK)/.test(thisClass)) {
              var currVal = parseInt(td[y].innerHTML);
              if (/(SCOREBOARD_DEATHS|SCOREBOARD_DAMAGE_TAKEN)/.test(thisClass)) {
                var comparison = (!isNaN(currVal) && (currVal < maxVals[y] || maxVals[y] == undefined))
              } else {
                var comparison = (!isNaN(currVal) && (currVal > maxVals[y] || maxVals[y] == undefined))
              }
              if (comparison) {
                maxValNodes[y] = [td[y]];
                maxVals[y] = currVal
              } else if (currVal == maxVals[y]) {
                maxValNodes[y].push(td[y])
              }
            }
          }
        }
        for (var x = 0; x < maxValNodes.length; x++) {
          for (var y = 0; y < maxValNodes[x].length; y++) {
            $(maxValNodes[x][y]).addClass('maxTableValue')
          }
        }
      });
      var shareUrl = quakelive.siteConfig.baseUrl + "/r/" + quakelive.UndecorateAnchor(window.location.hash);
      var mailToSubj = "QUAKE LIVE Game Details\n\n";
      var mailToText = "Check out the details of this QUAKE LIVE game here:\n" + "\n" + quakelive.siteConfig.baseUrl + "/" + window.location.hash + "\n\n" + "Arena: " + json.MAP_NAME + "\n" + "Game type: " + this.FormatGameType(json) + "\n" + "Date played: " + json.GAME_TIMESTAMP + "\n" + "\nNote: This link will expire at " + json.GAME_EXPIRES_FULL + "\n" + "\nQUAKE LIVE is a totally FREE online multiplayer game from id Software, the makers of DOOM and QUAKE.  Easily play against friends or others at your skill level in more than 30 arenas and 5 exciting game modes. Check us out at www.quakelive.com.\n";
      mailToSubj = mailToSubj.replace(/ /g, "%20");
      mailToText = mailToText.replace(/ /g, "%20").replace(/\n/g, "%0D").replace(/#/g, "%23");
      node.find('.share_email').attr('href', "mailto:?subject=" + mailToSubj + "&body=" + mailToText);
      var self = this;
      node.find('.share_link').click(function() {
        qlPrompt({
          title: "Link to this match",
          body: "Copy and paste the below URL to link to this match.<br/><br/>" + "<b>Arena:</b> " + json.MAP_NAME + "<br/>" + "<b>Game type:</b> " + self.FormatGameType(json) + "<br/>" + "<b>Date played:</b> " + json.GAME_TIMESTAMP + "<br/><br/>" + "<center>This link will expire at " + json.GAME_EXPIRES_FULL + "</center>",
          input: true,
          inputLabel: shareUrl,
          inputReadOnly: true,
          alert: true
        })
      });
      if (typeof(addthis) != 'undefined') {
        var btn = $("<a class='addthis_button' href='http://www.addthis.com/bookmark.php?v=250&pub=idsoftware'><img src='" + quakelive.resource('/images/share_button.gif') + "' width='67' height='15' alt='Bookmark and Share' style='border:0'/></a>");
        var share = {
          url: shareUrl,
          title: 'Quake Live Match - ' + this.FormatGameType(json) + ' on ' + json.MAP_NAME,
          templates: {
            twitter: (quakelive.mod_profile && quakelive.mod_profile.activeProfileName) ? ('Check out this ' + this.FormatGameTypeShort(json) + ' match on ' + json.MAP_NAME + ' that ' + quakelive.mod_profile.activeProfileName + ' played @QuakeLive! {{url}} #QLmatch') : ('Check out this ' + this.FormatGameTypeShort(json) + ' match on ' + json.MAP_NAME + ' @QuakeLive! {{url}} #QLmatch')
          }
        };
        addthis.button(btn.get(), addthis_config, share);
        node.find('.addthis_container').empty().append(btn)
      }
      this.ShowVerts(node)
    };


    var extra = function (n) {
        var dfb = 0, dfr = 0, dddb = 0, dddr = 0, ddtb = 0, ddtr = 0, ddb = 0, ddr = 0;

        $(".teamBG thead .TEAM_SCOREBOARD_DEATHS").after("<th class=\"TEAM_SCOREBOARD_NETD tc\">netD</th>").after("<th class=\"TEAM_SCOREBOARD_DAMAGE_TAKEN tc\">DmgR</th>").after("<th class=\"TEAM_SCOREBOARD_DAMAGE_DEALT tc\">DmgD</th>").after("<th class=\"TEAM_SCOREBOARD_NETF tc\">netF</th>");
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

        // #tdmpickup rating
        if ( n.GAME_TYPE == 'tdm' ) {
            $(".blueBG thead .BLUE_SCOREBOARD_NETD").after("<th class=\"BLUE_SCOREBOARD_RTNG tc\">Rating</th>");
            $(".redBG thead .RED_SCOREBOARD_NETD").after("<th class=\"RED_SCOREBOARD_RTNG tc\">Rating</th>");
            $(".blueBG tbody .BLUE_SCOREBOARD_NETD,.quitterstable_blue thead .BLUE_SCOREBOARD_NETD,.quitterstable_blue tbody .BLUE_SCOREBOARD_NETD").after("<td class=\"BLUE_SCOREBOARD_RTNG\">&nbsp;</td>");
            $(".redBG tbody .RED_SCOREBOARD_NETD,.quitterstable_red thead .RED_SCOREBOARD_NETD,.quitterstable_red tbody .RED_SCOREBOARD_NETD").after("<td class=\"RED_SCOREBOARD_RTNG\">&nbsp;</td>");
        }

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
            var x = (n.GAME_TYPE == "rr") ? parseInt($(this).prev().prev().text()) - parseInt($(this).prev().text()) : parseInt($(this).prev().prev().prev().text()) - parseInt($(this).prev().text());
            $(this).text(isNaN(x) ? "-" : x);
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

        //sum dmgR
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

        if ( n.GAME_TYPE == 'tdm' ) {
            $("tbody .BLUE_SCOREBOARD_RTNG,tbody .RED_SCOREBOARD_RTNG").each(function() {
                var x = parseInt($(this).prev().prev().prev().prev().text())*0.5
                      + parseInt($(this).prev().text())/100*0.4
                      + parseInt($(this).prev().prev().prev().text())/100*0.3;
                $(this).text(x.toFixed(2));
            });
        }
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
