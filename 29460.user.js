// ==UserScript==
// @name           pbr Highlight
// @description    Provides automatic highlighting of players in replays, play-by-plays, & on the league leaders lists.
// @namespace      pbr
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp*
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @include        http://goallineblitz.com/game/stats.pl?*
// @include        http://goallineblitz.com/game/team.pl?*
// @include        http://glb.warriorgeneral.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://glb.warriorgeneral.com/game/home.pl
// @include        http://glb.warriorgeneral.com/game/game.pl?game_id=*&mode=pbp*
// @include        http://glb.warriorgeneral.com/game/league.pl?league_id=*
// @include        http://glb.warriorgeneral.com/game/stats.pl?*
// @include        http://glb.warriorgeneral.com/game/team.pl?*
// @version        13.12.29
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

/* 
 * 
 * pabst did this 08/06/26+
 *
 * 
 */

window.setTimeout( function() {
    pbr_replay_highlight_main();
}, 100);

var cookieName = "pbr_pl";

function getColor(idx) {			
    var color;
    var b = "00"+(idx%8).toString(2);
    b = b.slice(b.length-3);

    var color = "#";
    for each (ch in b) {
        if (ch == "0") {
            color += "00";
        }
        else {
            color += "D0";
        }
    }
    return color;
}

function Player() {
    this.id = -1;
    this.name = "unnamed";

    this.toString = function() {
        return this.id+" - '"+this.name+"'";
    };
}

function readCookieData() {
	var arr = new Array();
	for (var n=0; n<10; n++) {
		var data = getCookie(cookieName+n);
		if (data == null) continue;

		var str = data.split("\f");
		if (str.length > 1) {
			for (var i=0; i<str.length; i+=2) {
				var p = new Player();
				p.id = parseFloat(str[i]);
				p.name = str[i+1];
				if ((isNaN(p.id) == false) && (p.name != null)) {
					arr.push(p);
				}
			}
		}
	}
	if (arr.length == 0) return null;
	else return arr;
}

function writeCookie(arr) {
	var plist = ["","","","","","","","","",""];
	for (var i=0; i<arr.length; i=i+2) {
		var id = parseInt(arr[i]);
		if (isNaN(id) == false) {
			var name = arr[i+1];
			plist[id%10] += id+"\f"+name+"\f";
		}
	}
	for (var i=0; i<10; i++) {
		setCookie(cookieName+i,plist[i]+";");
	}
}

function parsePlayers(address, page) {
    var text = page.responseText;
    parsePage(text);
}

function parsePage(text) {
//    console.log(text);
	var div = document.createElement("div");
	div.innerHTML = text.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	
    var playerArray = [];
	var p = div.getElementsByClassName("list_name");
	if (p.length != 0) {
		for (var i=0; i<p.length; i++) {
			playerArray.push(p[i].firstChild.href.split("=")[1]);
			var n = p[i].firstChild.innerHTML;
		    n = n.replace("&nbsp;"," ");
		    n = n.replace("&amp;","&");
			playerArray.push(n);
		}
	}
	else {
		p = div.getElementsByClassName("playerhead");
		for (var i=0; i<p.length; i++) {
			playerArray.push(p[i].getElementsByTagName("a")[0].href.split("=")[1]);
			var n = p[i].getElementsByTagName("a")[0].innerHTML;
		    n = n.replace("&nbsp;"," ");
		    n = n.replace("&amp;","&");
			playerArray.push(n);
		}
	}
	console.log("playerArray ("+(playerArray.length/2)+") = "+playerArray);
    writeCookie(playerArray);
}

var myPlayers;
var cookieDate;
var cookieData;

function pbr_replay_highlight_main() {
    cookieData = readCookieData(cookieName);

    var inetAddress = window.location+"";
    if ((window.location+"") != "/game/home.pl") {
        if (cookieData == null) {
            getInetPage("/game/home.pl", parsePlayers);
            myPlayers = [];
        }
        else {
            myPlayers = cookieData;
        }
		console.log("MP="+myPlayers);
    }

    if (inetAddress.match("replay.pl") != null) {
        // ----- on a replay page --------
        for (var i=0; i<myPlayers.length; i++) {
            var p = myPlayers[i].id;
            if (document.getElementById(p+"")) {
                var color = getColor(i);
                document.getElementById(p+"").style.backgroundColor = color;
                for each (var l in document.links) {
                    if (l.href.match("player_id="+p) != null) {
                        l.setAttribute("style","color:"+color+";font-weight:bold");
                    }
                }
            }
        }
    }
    else if (inetAddress.match("game.pl") != null) {
        // ------- on a pbp page ----------
        var pbpTable = document.getElementById("play_by_play_table");
        for each (htmlTableRowElement in pbpTable.rows) {
            var className = htmlTableRowElement.className;
            if (className == null) continue;
	
            if (className.match("pbp_play_row") != null) {
                var coll = htmlTableRowElement.cells;
                for each (node in coll) {
                    var cName = node.className;
					if (cName == null) continue;
                    if (cName.match("pbp_play") != null) {
                        var playText = node.firstChild.data;
                        if (playText.match("penalty committed by") != null) {
                            node.parentNode.setAttribute("style","color:orange;font-weight:bold");
                        }
                        for each (p in cookieData) {
                            if ((playText.match(p.name) != null) &&
                                (playText.indexOf(p.name+" pitch to") != 0)) {
                                node.parentNode.setAttribute("style","color:green;font-weight:bold");
                            }
                            else if ((playText.replace(/\u00a0/,' ').indexOf(p.name) != -1) &&
                                (playText.indexOf(p.name+" pitch to") != 0)) {
                                node.parentNode.setAttribute("style","color:green;font-weight:bold");
                            }
                        }
                    }
                }
            }
        }
    }
    else if ((inetAddress.match("league.pl") != null) ||
        (inetAddress.match("stats.pl") != null) ||
        (inetAddress.match("team.pl") != null)) {
        // ------- on a stats page or team home page--------
        for each (var l in document.links) {
            for each (var p in myPlayers) {
                if (l.href.match("player_id="+p.id) != null) {
                    l.setAttribute("style","color:green;font-weight:bold");
                }
            }
        }
    }
    else {
        // -------- on the home page ---------
        parsePage(document.getElementById("players").innerHTML);
    }
}

function getInetPage(address, func, target) {
    console.log("getInetPage -- '"+address+"'  -- "+(func+"").slice(0,(func+"").indexOf("{")));
    var req = new XMLHttpRequest();
    req.open( 'GET', address, true );
    req.onreadystatechange = function() {
        if (target != null) {
            var d = ["..","...","."];
            var str = target.innerHTML.split(" ");
            target.innerHTML = str[0]+" "+d[str[1].length-1];
        }
    };
    req.onload = function() {
        if (this.status != 200) {
            alert("pbr gm script: Error "+this.status+" loading "+address);
        }
        else {
            console.log("loaded: "+address)
            func(address,this);
        }
    };
	
    req.send(null);
    return req;
}

