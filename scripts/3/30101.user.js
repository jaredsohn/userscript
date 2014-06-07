// ==UserScript==
// @name           Gametime Countdown
// @description    Change "next sim" times to countdowns
// @namespace      pbr
// @include        http://goallineblitz.com/game/home.pl*
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @copyright      2008, pabst
// @version        11.07.04
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// ==/UserScript==

    var reloadDisabled = false;
    var leeway = 3;

    var clocks = [];
    var gameTime = [];

    var version;

	function getClocks() {
		var timeLocation = document.getElementsByClassName("list_nextgame");
		for (var i=0; i<timeLocation.length; i++) {
			version = "list";
			var t = timeLocation[i];
			var c = t.getElementsByTagName("a")[0];
			clocks.push(c);
		}
		if (clocks.length == 0) {
			for each (var a in document.links) {
				if (a.href == null) continue;
				if (a.href.indexOf("compare_teams.pl") != -1) {
					clocks.push(a.parentNode.lastChild);
				}
			}
		}
	}

    function parseClocks() {
        for each (var clock in clocks) {
			if (!clock) {
				gameTime.push(null);
				continue;
			}
		    var clockString;
			if (clock.data) clockString = clock.data;
			else clockString = clock.innerHTML;
		    if (clockString == null) continue;
	
			if (clockString.indexOf("(in") != -1) {
		        clockString = clockString.slice(clockString.indexOf("(in ")+4);
			}
		    clockString = clockString.split(":");
		    var hours = parseFloat(clockString[0]);
		    var minutes = parseFloat(clockString[1]);
		    var seconds = parseFloat(clockString[2]);
		    if ((hours < 0) && (seconds > 1)) reloadDisabled = true;
			var currentDate = new Date();
		    var game = new Date();
		    game.setHours(currentDate.getHours()+hours);
		    game.setMinutes(currentDate.getMinutes()+minutes);
		    game.setSeconds(currentDate.getSeconds()+seconds+leeway);
		    gameTime.push(game);
        }
    }

    function updateClocks() {
        for (var i=0; i<clocks.length; i++) {
            if (!clocks[i]) continue;
            var difference = gameTime[i].getTime() - new Date().getTime();
            if (difference < 0) {
                if (reloadDisabled == false) {
                    window.location.reload();
                }
                return;
            }

            var hours = Math.floor(difference/1000/60/60);
            difference -= hours*1000*60*60;
            var minutes = Math.floor(difference/1000/60);
            difference -= minutes*1000*60;
            var seconds = Math.floor(difference/1000);

            if (minutes < 10) minutes = "0"+minutes;
            if (seconds < 10) seconds = "0"+seconds;

            var inetAddress = window.location+"";
            if (inetAddress.match("home.pl") != null) {
                if (isNaN(hours) == false) {
		    if (version == "list") {
			clocks[i].innerHTML = hours+":"+minutes+":"+seconds;
		    }
		    else {
		        var s = clocks[i].data;
		        s = s.slice(0,s.indexOf("(in "));
		        clocks[i].data = s+" (in "+hours+":"+minutes+":"+seconds+")";
		    }
                }
            }
            else if (inetAddress.match("league.pl") != null) {
                clocks[i].innerHTML = "Today's Games - Next sim in: ";
                if (isNaN(hours) == true) {
                    clocks[i].innerHTML += "UNKNOWN";
                }
                else {
                    clocks[i].innerHTML += hours+":"+minutes+":"+seconds;
                }
            }
            else {
                clocks[i].innerHTML = "Schedule and Scores (Next Sim: ";
                if (isNaN(hours) == true) {
                    clocks[i].innerHTML += "UNKNOWN)";
                }
                else {
                    clocks[i].innerHTML += hours+":"+minutes+":"+seconds+")";
                }
            }
        }
        if (clocks.length > 0) {
            var updateThread = setTimeout(updateClocks,1000);
        }
    }

    function getGenericClocks(str) {
        var e = document.getElementById(str);
        if (e == null) return;

        var clock = e.getElementsByClassName("medium_head");
        if (clock == null) return;
        clock = clock[0];

        var clockString = clock.innerHTML;
        clockString = clockString.split(":");

        var hours = parseFloat(clockString[1]);
        var minutes = parseFloat(clockString[2]);
        var seconds = parseFloat(clockString[3]);
    
        var currentDate = new Date();
        var game = new Date();
        game.setHours(currentDate.getHours()+hours);
        game.setMinutes(currentDate.getMinutes()+minutes);
        game.setSeconds(currentDate.getSeconds()+seconds+leeway);

        clocks.push(clock);
        gameTime.push(game);
    }

    function getTeamClocks() {
        getGenericClocks("schedule");
    }

    function getLeagueClocks() {
        getGenericClocks("upcoming_games");
    }

    function getOwnerClocks() {
        var teams = document.getElementsByClassName("team_next_game");
        for each (t in teams) {
            clocks.push(t.lastChild);
        }
    }

window.setTimeout( function() {
    var inetAddress = window.location+"";

    if (inetAddress.match("home.pl") != null) {
        getClocks();
        getOwnerClocks();
        parseClocks();
    }
    else if (inetAddress.match("league.pl") != null) {
        getLeagueClocks();
    }
    else {
        getTeamClocks();
    }

    updateClocks();
}, 2000);
