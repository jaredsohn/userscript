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
// @version        09.10.18
// @require        http://userscripts.org/scripts/source/31567.user.js
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


function readCookieDate() {
    var data = getCookie(cookieName);
    if (data == null) {
        return null;
    }

    var str = data.slice(0,data.indexOf("\t"));
    var date = new Date(str);
    return date;
}

function setCookie(c_name, value) {
    var expDate = new Date();
    expDate.setDate(expDate.getDate() + 1000*60*60*24*7);
    document.cookie = c_name + "=" + value + ";expires=" + expDate;
}

function getCookie(c_name) {
    var start = document.cookie.indexOf(c_name+"=");
    if (start != -1) {
        var c = document.cookie.slice(start,document.cookie.length);
        var end = c.indexOf(";");
        if (end != -1) {
            var data = c.slice(c_name.length+1,end);
            console.log(data);
            return data;
        }
        else {
            var data = c.slice(c_name.length+1);
            console.log(data);
            return data;
        }
    }
    else {
        console.log("cookie not set");
    }
    return null;
}

function readCookieData() {
    var data = getCookie(cookieName);
    if (data == null) {
        return null;
    }

    var str = data.split("\t");
    var arr = new Array();
    for (var i=1; i<str.length; i+=2) {
        var p = new Player();
        p.id = parseFloat(str[i]);
/*
var s = "";
for (var j=0; j<str[i+1].length; j++) {
s += str[i+1].charCodeAt(j) +",";
}
console.log("'"+str[i+1]+"' | '"+trim(str[i+1])+"'"+" | "+s);
*/
        p.name = trim(str[i+1]);
        arr.push(p);
    }
    return arr;
}

function writeCookie(arr) {
    var d = new Date();
    var data = d;
    for each (p in arr) {
        data += "\t" + p;
    }
    data += ";";
    setCookie(cookieName,data);
}

function parsePlayers(address, page) {
    var text = page.responseText;
    parsePage(text);
}

function parsePage(text) {
    //console.log(text);
    var searchString = "/game/player.pl?player_id=";
    var sslen = searchString.length;
    var playerArray = [];

    while (text.indexOf(searchString) != -1) {
        var start = text.indexOf(searchString)+sslen;
        text = text.slice(start);

        var end = text.indexOf('"');
        var t = text.slice(0,end);

        text = text.slice(end+2);
        end = text.indexOf("</a>");
        var name = text.slice(text.indexOf(">")+1,end);
        if (name == "") {
            name = text.slice(0,text.indexOf("<"));
        }

        name = name.replace("&nbsp;"," ");
        name = name.replace("&amp;","&");
        playerArray.push(parseInt(t));
        playerArray.push(name);

        text = text.slice(end);
    }

    //console.log("writing cookie : "+playerArray);
    writeCookie(playerArray);
}


var cookieName;
var myPlayers;
var cookieDate;
var cookieData;

function pbr_replay_highlight_main() {
    cookieName = "glb-greasemonkey: player list";
    cookieDate = readCookieDate(cookieName);
    cookieData = readCookieData(cookieName);
    myPlayers = null;
	
    var currentDate = new Date();
    var inetAddress = window.location+"";

    //console.log("DATE="+cookieDate);
    //console.log("CD="+cookieData);
    if ((window.location+"") != "http://goallineblitz.com/game/home.pl") {
        if ((cookieData == null) || (currentDate > cookieDate + 1000*60*60*6)) {
            getInetPage("http://goallineblitz.com/game/home.pl", parsePlayers);
            myPlayers = [];
        }
        else {
            myPlayers = cookieData;
        }
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
                    //document.getElementById(p+"").innerHTML = '<img src="http://www.maploco.com/maps/dots/red-circle.png">';
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

function findChild(id,node) {
    if (node.id+"" == id+"") {
        return node;
    }
    for (var i=0; i<node.childNodes.length; i++) {
        var c = node.childNodes[i];
        var r = findChild(id,c);
        if (r != null) {
            return r;
        }
    }
    return null;
}

function trim(str) {
    try {
        var s = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        return s.replace(/\n/," ");
    }
    catch (e) {
        return str;
    }
}

