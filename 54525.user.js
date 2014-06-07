// ==UserScript==
// @name           Stats On Replay
// @namespace      pbr/sor
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://glb.warriorgeneral.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// @require        http://userscripts.org/scripts/source/28938.user.js
// @require        http://userscripts.org/scripts/source/31573.user.js
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

var scriptName = "Player Stats";
var scriptVersion = "13.12.29";
var scriptWebpage = "http://userscripts.org/scripts/show/54525";
/* 
 * 
 * pabst did this 08/06/26+
 *
 * 
 */

var stats = null;
var playerStats = null;
var plays = null;
var currentPlay = -1;

window.setTimeout( function() {
	init(true);
}, 100);

function activate(e) {
    console.log("activate player stats");

    lock();

    pbp();
}

function addStats() {
	var area = document.getElementById("replay_area");
	var width = area.clientWidth/2;

    var specialTeams = false;
    if (document.getElementsByClassName("P").length > 0) specialTeams = true;
    else if (document.getElementsByClassName("K").length > 0) specialTeams = true;
    
	var players = document.getElementsByClassName("player_name");
    playerStats = new Array(players.length);
	for (var i=0; i<players.length; i++) {
		var left = false;
		if (players[i].offsetLeft > width) {
			left = true;
		}
        var id = players[i].href.split("=")[1];
        playerStats[id] = fetchStats(id, specialTeams);
		if (left == true) {
			players[i].addEventListener("mouseover",function(e) { over(e,true); }, false);
			players[i].addEventListener("mouseout",function(e) { out(e,true); }, false);
		}
		else {
			players[i].addEventListener("mouseover",function(e) { over(e,false); }, false);
			players[i].addEventListener("mouseout",function(e) { out(e,false); }, false);
		}
	}
}

function over(e, left) {
    var id = e.target.href.split("=")[1];
	unsafeWindow.set_tip(playerStats[id], left, null, true);
}

function out(e) {
	unsafeWindow.unset_tip();
}

function pbp() {
   var tag = document.getElementById("pbp");
   if (tag == null) {
       setTimeout(pbp, 300);
   }
   else if (tag.childNodes.length == 0) {
       setTimeout(pbp, 300);
   }
   else {
       var page = new Object();
       page.responseText = tag.innerHTML;
       pbpHandler(null, page);
   }
}

function pbpHandler(address, page) {
    if (plays == null) {
        loadPBPSimple(page);
    }
    
    var addr = window.location.toString();
    var rrplay = document.getElementById("rrplay");
    if (rrplay != null) {
        addr = rrplay.value;
    }
	for (var i=0; i<plays.length-1; i++) {
		if (plays[i].replay == addr) {
			currentPlay = i;
			break;
		}
	}
    //console.log("current play is "+currentPlay);

    //addScore();

    stats = new Stats();
	for (var i=0; i<currentPlay; i++) {
		playHandler(stats, new Drive(), plays[i]);
	}
    addStats();

    unlock();
}

function fetchStats(id, specialTeams) {
//    console.log("id is "+id);
    var player = null;
    var player_names = document.getElementsByClassName("player_name");
    for (var j=0; j<player_names.length; j++) {
        var href = player_names[j].href.toString().split("=")[1];
        if (href == id) {
            player = player_names[j];
            break;
        }
    }

    var icon = player.parentNode.getElementsByTagName("img")[0].src;
    while (icon.indexOf("/") != -1) {
        icon = icon.slice(icon.indexOf("/")+1);
    }
    var pos = icon.replace(".gif","");
    if (isNaN(parseFloat(pos.slice(pos.length-1))) == false) {
        pos = pos.slice(0,pos.length-1);
    }
    switch (pos) {
            case "LDE" :
            case "RDE" : pos = "DE"; break;
            case "LOT" :
            case "ROT" : pos = "OT"; break;
            case "LG" :
            case "RG" : pos = "OG"; break;
            case "NT" : pos = "DT"; break;
            case "RILB" :
            case "LILB" :
            case "ROLB" :
            case "LOLB" :
            case "MLB" : pos = "LB"; break;
    }

    var name = player.innerHTML;
    name = name.replace("&nbsp;"," ").replace(/\s+$/,"");
//    console.log(specialTeams+"] ("+pos+") '"+name+"'");
    var html = "";
    if (pos.match("K") != null) {
        html = getKickingString(stats, name);
    }
    else if (pos.match("P") != null) {
        html = getPuntingString(stats, name);
    }
    else if (specialTeams == true) {
        html = "";
        var tmp = getReturnString(stats, name, true);
        if (tmp != "") html += tmp;
        tmp = getReturnString(stats, name, false);
        if (tmp != "") html += tmp;
        tmp = getDefensiveSTString(stats, name);
        if (tmp != "") html += tmp;
    }
    else {
        if ((pos.match("QB") != null) || (pos.match("ball.gif") != null)) {
            var tmp = getPassingString(stats, name);
            if (tmp != "") {
                html += tmp;
            }
            tmp = getRushingString(stats, name);
            if (tmp != "") {
                html += "<br>";
                html += tmp;
            }
        }
        else if ((pos.match("HB") != null) || (pos.match("FB") != null)) {
            var tmp = getRushingString(stats, name);
            if (tmp != "") {
                html += tmp;
            }
            tmp = getReceivingString(stats, name);
            if (tmp != "") {
                html += "<br>";
                html += tmp;
            }
        }
        else if ((pos.match("WR") != null) || (pos.match("TE") != null)) {
            html = getReceivingString(stats, name);
        }
        else if (pos.match("KR") != null) {
            html = getReturnString(stats, name, true);
        }
        else if (pos.match("PR") != null) {
            html = getReturnString(stats, name, false);
        }
        else if ((pos.match("RS") != null) || (pos.match("OS") != null) ||
                (pos.match("LS") != null)) {
            html = getDefensiveSTString(stats, name);
        }
        else if ((pos.match("OU") != null) || (pos.match("IN") != null) ||
                (pos.match("BW") != null) || (pos.match("FW") != null)) {
            html = getDefensiveSTString(stats, name);
        }
        else if ((pos.match("CB") != null) || (pos.match("S") != null)) {
            var tmp = getDefensiveString(stats, name, "rush");
            if (tmp != "") {
                html += tmp;
            }
            tmp = getDefensiveString(stats, name, "pass");
            if (tmp != "") {
                html += "<br>";
                html += tmp;
            }
        }
        else if ((pos.match("G") != null) || (pos.match("C") != null) ||
                 (pos.match("OT") != null)) {
            html = getOffensiveLineString(stats, name);
        }
        else {
            var tmp = getDefensiveString(stats, name, "rush");
            if (tmp != "") {
                html += tmp;
            }
            tmp = getDefensiveString(stats, name, "pass");
            if (tmp != "") {
                html += "<br>";
                html += tmp;
            }
        }
    }
//    console.log("html is "+html);
    return html;
}

function getPassingString(stats, name) {
	var output = "";
	var index = stats.playerPassingName[1].indexOf(name);
	if (index != -1) {
		var s = stats.playerPassingStats[1][index];
		var cmp = s[0];
		var att = s[1];
		var y = s[2];
		var td = s[3];
		var inter = s[4];

		output = att+" / "+cmp+", "+y.toFixed(0)+" yards";
		if (td != 0) output += ", "+td+" td";
		if (inter != 0) output += ", "+inter+" int";
		//console.log(s);
        var titles = ["Cmp","Att","Pct.","Yards","TD","Int"];
        var data = [cmp, att, (100*cmp/att).toFixed(0)+"%", y.toFixed(0), td, inter];
        output = buildTable(titles, data);
        //console.log(output);
	}
	return output;
}
function getRushingString(stats, name) {
	var output = "";
	var index = stats.playerRushingName[1].indexOf(name);
	if (index != -1) {
		var s = stats.playerRushingStats[1][index];
		var att = s[0];
		var y = s[1];
        var lng = s[2]
		var sr = (100*s[3] / s[0]).toFixed(0);
		//var td = s[?];
		//if (td != 0) output += ", "+td+" td";
		//console.log(s);

		output = att+" att, "+y.toFixed(0)+" yards";
        var titles = ["Att","Yards","Avg","Lng","SR"];
        var data = [att, y.toFixed(0), (y/att).toFixed(2), lng.toFixed(0), sr+"%"];
        output = buildTable(titles, data);
	}
	return output;
}
function getReceivingString(stats, name) {
	var output = "";
	var index = stats.playerReceivingName[1].indexOf(name);
	if (index != -1) {
		var s = stats.playerReceivingStats[1][index];
		var tgt = s[1];
		var rec = s[0];
		var d = s[2];
		var y = s[3];
        var lng = s[4];
		//var td = s[?];

		output = "";
		if (tgt == rec) {
			output += rec+" rec, "+y.toFixed(0)+" yards";
		}
		else {
			output = tgt +" tgt";
			if (rec != 0) output += ", "+rec+" rec, "+y.toFixed(0)+" yards";
		}
		if (d != 0) output += ", "+d+" drop";
		//if (td != 0) output += ", "+td+" td";
		//console.log(s);
        var titles = ["Tgt","Cmp","Yards","Avg","Lng"];
        var data = [tgt, rec, y.toFixed(0), (y/tgt).toFixed(2), lng.toFixed(0)];
        output = buildTable(titles, data);
	}
	return output;
}
function getOffensiveLineString(stats, name) {
	return "";
}
function getDefensiveString(stats, name, type) {
	var output = "";
    if (type == "rush") {
		var tk=0; var miss=0; var stop=0; var dft=0; var ypt=0;
    	var rush = stats.playerDefensiveRushName[0].indexOf(name);
		if (rush != -1) {
			tk += stats.playerDefensiveRushStats[0][rush][0];
			miss += stats.playerDefensiveRushStats[0][rush][1];
			stop += stats.playerDefensiveRushStats[0][rush][3];
			dft += stats.playerDefensiveRushStats[0][rush][4];
			if (tk == 0) {
				ypt = 0.0;
			}
			else {
	            ypt = (stats.playerDefensiveRushStats[0][rush][2] / tk).toFixed(1);
	        }

            var titles = ["Tkl","Miss","YPT","Stop","Dft"];
            var data = [tk,miss,ypt,stop,dft];
            output = buildTable(titles, data);
		}
    }
    else {
		var tk=0; var miss=0; var stop=0; var dft=0; var pd=0; var ypt=0; var inter=0;
    	var pass = stats.playerDefensivePassName[0].indexOf(name);
		if (pass != -1) {
			tk += stats.playerDefensivePassStats[0][pass][0];
			miss += stats.playerDefensivePassStats[0][pass][1];
			stop += stats.playerDefensivePassStats[0][pass][3];
			dft += stats.playerDefensivePassStats[0][pass][4];
			pd += stats.playerDefensivePassStats[0][pass][7];
			if (tk == 0) {
				ypt = 0.0;
			}
			else {
	            ypt = (stats.playerDefensivePassStats[0][pass][2] / tk).toFixed(1);
	        }
//			pd += stats.playerDefensivePassStats[0][pass][6];

            var titles = ["Tkl","Miss","YPT","Stop","Dft", "Int", "PD"];
            var data = [tk,miss,ypt,stop,dft,inter,pd];
            output = buildTable(titles, data);
		}
    }
    return output;
}
function getReturnString(stats, name, isKickRet) {
	var output = "";
	var rn = stats.playerKickReturnName;
	var rs = stats.playerKickReturnStats;
	if (isKickRet == false) {
		rn = stats.playerPuntReturnName;
		rs = stats.playerPuntReturnStats;
	}
	var index = rn[1].indexOf(name);

	if (index != -1) {
		var s = rs[1][index];
		var ret = s[0];
		var y = s[1];
		var td = s[3];
		var lng = s[2];

        var titles = ["KR","Yards","Avg","Lng","TD"];
        if (isKickRet == false) titles[0] = "PR";
        var data = [ret,y.toFixed(0),(y/ret).toFixed(1),lng,td];
        output = buildTable(titles, data);
	}
	return output;
}
function getDefensiveSTString(stats, name) {
	var output = "";
	var index = stats.playerDefensiveSTName[0].indexOf(name);

	if (index != -1) {
		var tk = stats.playerDefensiveSTStats[0][index][0];
		var miss = stats.playerDefensiveSTStats[0][index][1];
        var ypt = 0.0;
        if (tk != 0) {
            ypt = (stats.playerDefensiveSTStats[0][index][2] / tk).toFixed(2);
        }
        
        var titles = ["Tkl","Miss","YPT"];
        var data = [tk,miss,ypt];
        output = buildTable(titles, data);
	}
	return output;
}
function getKickingString(stats, name) {
	var output = "";
	var index = stats.playerKickingName[0].indexOf(name);

	if (index != -1) {
		var k = stats.playerKickingStats[0][index][0];
		var y = stats.playerKickingStats[0][index][1];
		var tb = stats.playerKickingStats[0][index][3];
        var net = stats.playerKickingStats[0][index][5];
		var lng = stats.playerKickingStats[0][index][2];
		var in20 = stats.playerKickingStats[0][index][4];

        var titles = ["K","Yards","Avg","Net","Lng","TB"];
        var data = [k,y.toFixed(0),(y/k).toFixed(1),(net/k).toFixed(1),lng,tb];
        output = buildTable(titles, data);
	}
	return output;
}
function getPuntingString(stats, name) {
	var output = "";
	var index = stats.playerPuntingName[0].indexOf(name);

	if (index != -1) {
		var p = stats.playerPuntingStats[0][index][0];
		var y = stats.playerPuntingStats[0][index][1];
		var tb = stats.playerPuntingStats[0][index][3];
        var net = stats.playerPuntingStats[0][index][5];
		var lng = stats.playerPuntingStats[0][index][2];
		var in20 = stats.playerPuntingStats[0][index][4];

        var titles = ["P","Yards","Avg","Net","Lng","In20"];
        var data = [p,y.toFixed(0),(y/p).toFixed(1),(net/p).toFixed(1),lng,in20];
        output = buildTable(titles, data);
	}
	return output;
}

function buildTable(col, data) {
    var output = '<table>';
    output += '<tbody">';

    output += '<tr>';
    for (var i=0; i<col.length; i++) {
        output += '<th style="text-align: center">'+col[i]+'</th>';
    }
    output += "</tr>"

    output += '<tr>';
    for (var i=0; i<data.length; i++) {
        output += '<td style="text-align: center; background-color: black;">'+data[i]+'</td>';
    }
    output += "</tr>"

    output += "</tbody></table>";
//    console.log(output);
    return output;
}

