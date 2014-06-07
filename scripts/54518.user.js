// ==UserScript==
// @name           Player Highlight On Replay
// @namespace      pbr/phor
// @include        http://*goallineblitz.com/game/home.pl
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://glb.warriorgeneral.com/game/home.pl
// @include        http://glb.warriorgeneral.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        14.01.30
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

/* 
 * 
 * pabst did this 08/06/26+
 *
 * 
 */

var scriptName = "Player Highlight";
var scriptVersion = "14.01.30";
var scriptWebpage = "http://userscripts.org/scripts/show/54518";

var other_player_ids = [];

var cookieName = "pbr_pl";
var myPlayers;
var cookieDate;
var cookieData;

window.setTimeout( function() {
    player_highlight_on_replay();
}, 1000);

function player_highlight_on_replay() {
    var inetAddress = window.location.toString();

    if (inetAddress.match("replay.pl") != null) {
        cookieData = readCookieData(cookieName);
        console.log("CD="+cookieData);

        if (cookieData != null) {
            myPlayers = cookieData;
        }
        else {
            myPlayers = new Array();
        }

        for (var i=0; i<other_player_ids.length; i++) {
            var p = new Player();
            p.id = other_player_ids[i];
            myPlayers.push(p);
        }

        console.log("players found = "+myPlayers.length);
        init();
    }
    else {
        // -------- on the home page ---------
        parsePage(document.getElementById("players").innerHTML);
    }
}

function colorize(id, color) {
    var dot = document.getElementById(id);
    if (dot != null) {
        console.log("changing color for "+id);
        dot.style.backgroundColor = color;
    }
    else {
        console.log("waiting for color");
        setTimeout(function() {
            colorize(id, color);
        }, 500);
    }
}

function activate(e) {
    lock();
    console.log("activate highlight");

    var player_names = document.getElementsByClassName("player_name");
    for (var j=0; j<player_names.length; j++) {
        var href = player_names[j].href.toString().split("=")[1];
        //console.log(j+"/"+href.length+" --> looking for player "+href);

        for (var i=0; i<myPlayers.length; i++) {
            var id = myPlayers[i].id;
            //console.log("\t"+i+" id is "+id);
            if (href == myPlayers[i].id) {
                var color = getColor(i);
                player_names[j].style.color = color;
                colorize(id, color);
            }
        }
    }

    unlock();
}

function getColor(idx) {			
    var color;
    var b = "00"+(idx%8).toString(2);
    b = b.slice(b.length-3);

    var color = "#";
    for (var i=0; i<3; i++) {
        var ch = b.slice(i,i+1);
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
		for (var i=0; i<str.length; i+=2) {
		    var p = new Player();
		    p.id = parseFloat(str[i]);
		    p.name = str[i+1];
		    arr.push(p);
		}
	}
	if (arr.length == 0) return null;
	else return arr;
}

function writeCookie(arr) {
	var plist = ["","","","","","","","","",""];
	for (var i=0; i<arr.length; i=i+2) {
		var id = parseInt(arr[i]);
		var name = arr[i+1];
		plist[id%10] += id+"\f"+name+"\f";
	}
	for (var i=0; i<10; i++) {
		setCookie(cookieName+i,plist[i]+";");
	}
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
	console.log("playerArray : "+(playerArray.length/2));
    writeCookie(playerArray);
}
