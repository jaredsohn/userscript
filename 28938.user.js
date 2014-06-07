// ==UserScript==
// @name           pbr Game Scout
// @description    modification of tciss(?)'s game scout script for GoalLineBlitz.com
// @namespace      pbr
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp&quarter=*
// @include        http://goallineblitz.com/game/team.pl?*
// @include        http://goallineblitz.com/game/player_game_log.pl?*
// @include        http://glb.warriorgeneral.com/game/game.pl?game_id=*&mode=pbp
// @include        http://glb.warriorgeneral.com/game/game.pl?game_id=*&mode=pbp&quarter=*
// @include        http://glb.warriorgeneral.com/game/team.pl?*
// @include        http://glb.warriorgeneral.com/game/player_game_log.pl?*
// @require        http://userscripts.org/scripts/source/31567.user.js
// @require        http://userscripts.org/scripts/source/31572.user.js
// @require        http://userscripts.org/scripts/source/31573.user.js
// @copyright      2008, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// ==/UserScript==

/*
 *
 * based on code by tciss from www.goallineblitz.com
 * pabst modified it 6/22/08+
 *
 */

// you can modify the following variables
var showEverything = false; //this will SERIOUSLY slow down loading multiple games
var longPass = 15;
var mediumPass = 7.5;
var shortPass = 0;
// you can modify the previous variables

var storageStats = [];
var forceTeam = null;

window.setTimeout( 
    function() {
        runTeamScout();
    },
    1500
    );

function runTeamScout() {
    console.log("start");

    var scoutTable;
    try {
        scoutTable = getEmptyTables();
    }
    catch (err) {
        console.log("normal for replay rewrite : "+err);
        return;
    }
    scoutTable.addEventListener("game loaded",fillScoutTable,true);
    scoutTable.addEventListener("table sort",sortTable,true);

    var location = document.getElementById("pbp");
    if (location != null) {
        var div = document.createElement('div');
        div.setAttribute("id","storage:"+window.location);
        div.setAttribute("class","GSstorage");
        div.setAttribute("style","visibility:hidden; display:none;");
        div.innerHTML = document.getElementsByTagName("body")[0].innerHTML;
        //console.log(div.innerHTML);
        document.getElementById("footer").appendChild(div);
		
        location.parentNode.insertBefore(scoutTable,location);
        var checkBox = document.createElement("input");
        checkBox.checked = true;
        checkBox.setAttribute("class","GScheckbox");
        checkBox.setAttribute("id",window.location+"");
        checkBox.setAttribute("style","visibility:hidden;");
        document.getElementById("footer").appendChild(checkBox);
        showEverything = true;
    }
    else {
        location = document.getElementById("footer");
        location.parentNode.insertBefore(scoutTable,location);
    }

    var scheduleContent = document.getElementsByClassName("schedule_content");
    if (scheduleContent.length > 0) { //on a team page?
        for (var scidx=0; scidx<scheduleContent.length; scidx++) {
            var schedules = scheduleContent[scidx];
            var rows = schedules.rows;
            rows[0].cells[1].innerHTML = "[GS] "+rows[0].cells[1].innerHTML;
            for (var i=1; i<rows.length; i++) {
                var link = rows[i].cells[2].firstChild.href+"&mode=pbp";
	
                var oldCell = rows[i].cells[1];
                rows[i].deleteCell(1);
	
                var checkBox = document.createElement("input");
                checkBox.setAttribute("type","checkbox");
                checkBox.setAttribute("id",link);
                checkBox.setAttribute("class","GScheckbox");
	
                var div = document.createElement("span");
                div.appendChild(checkBox);
                for (var cidx=0; cidx<oldCell.childNodes.length; cidx++) {
                    var c = oldCell.childNodes[cidx];
                    if (c == null) continue;
                    var c2 = c.nextSibling;
                    div.appendChild(c);
                    if (c2 != null) {
                        div.appendChild(c2);
                    }
                }
                var newCell = rows[i].insertCell(1);
                newCell.appendChild(div);
            }
        }
    }
    else {
        var tbl = document.getElementById("career_stats");
        if (tbl != null) { //on a player's game log
            //console.log("player game log");
            forceTeam = [];
            var rows = tbl.rows;
            for (var i=2; i<rows.length; i++) {
                if (rows[i].getAttribute("class").indexOf("nonalternating") != -1) {
                    break;
                }
				
                var s = rows[i].cells[1].innerHTML;
                s = s.slice(s.indexOf("team_id=")+"team_id=".length);
                s = s.slice(0,s.indexOf('"'));
                forceTeam[i-2] = parseFloat(s);
                var link = rows[i].cells[3].firstChild.href+"&mode=pbp";
	
                var oldCell = rows[i].cells[0];
                rows[i].deleteCell(0);
	
                var checkBox = document.createElement("input");
                checkBox.setAttribute("type","checkbox");
                checkBox.setAttribute("id",link);
                checkBox.setAttribute("class","GScheckbox");
	
                var div = document.createElement("span");
                div.appendChild(checkBox);
                for (var cidx=0; cidx<oldCell.childNodes.length; cidx++) {
                    var c = oldCell.childNodes[cidx];
                    if (c == null) continue;
                    var c2 = c.nextSibling;
                    div.appendChild(c);
                    if (c2 != null) {
                        div.appendChild(c2);
                    }
                }
                var newCell = rows[i].insertCell(0);
                newCell.appendChild(div);
            }
        }
    }
    storageStats = new Array(document.getElementsByClassName("GScheckbox").length);

    var button = document.createElement("input");
    button.setAttribute("value","Run Game Scout");
    button.setAttribute("type","button");
    button.setAttribute("id","gsbutton");
    button.addEventListener("click",input,false);

    var counter = document.createElement("div");
    counter.setAttribute("class","medium_head");
    counter.setAttribute("id","gspagecounter");
    counter.innerHTML = "0 of 0";

    var spn = document.createElement("span");
    spn.appendChild(button);
    spn.appendChild(counter);
    scoutTable.insertBefore(spn,scoutTable.firstChild);
}
//---------------------- end --------------------------------

function handlePageLoad(address,page) {
    var storage = document.getElementById('storage:'+address);
    var index = -1;
    var s = document.getElementsByClassName("GScheckbox");
    for (var i=0; i<s.length; i++) {
        if (s[i].id == address) {
            index = i;
            break;
        }
    }
    if (storageStats[index] == null) {
        storage.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
        storageStats[index] = gameScout(address,storage);
        if (window.location.toString().indexOf("mode=pbp") != -1) {
        //on the play by play
        //cannot delete storage so filtering still works
        }
        else {
            storage.innerHTML = "";
        }
    }
    else {
        console.log("already calculated: "+address);
    }
	
    var tscout = document.getElementById("gamescout");
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("game loaded",false,false);
    tscout.dispatchEvent(evt);
}

var total = null;
function fillScoutTable() {
    var fstFinished = true;
    clearPageCount();
    var checkBoxes = document.getElementsByClassName("GScheckbox");
    for (var i=0; i<storageStats.length; i++) {
        if (checkBoxes[i].checked == true) {
            if (storageStats[i] == null) {



                fstFinished = false;
            }
            else {
                incrementPageCount();
            }
        }
    }
    if (fstFinished == false) {
        return;
    }
	
    if (total != null) return;
    total = new Stats();
    if (document.getElementById("career_stats") != null) { //on a game log
        total.team_name[0] = "My Team";
        total.team_id[0] = forceTeam;
        total.team_name[1] = "Opponents";
    }
    else {
        var teamHeading = document.getElementsByClassName("big_head subhead_head");
        if (teamHeading[0].childNodes.length == 1) { //on a team page
            total.team_name[0] = teamHeading[0].innerHTML;
            total.team_id[0] = (window.location+"").slice((window.location+"").indexOf("team_id=")+8);
            total.team_name[1] = "Opponents";
            var id = (window.location+"").slice((window.location+"").indexOf("team_id=")+8);
            total.team_id[0] = new Array(checkBoxes.length);
            for (var i=0; i<total.team_id[0].length; i++) {
                total.team_id[0][i] = id;
            }
        }
        else if (teamHeading[0].firstChild.innerHTML == null) {
            //on a team page with rename link
            var str = teamHeading[0].innerHTML;
            str = str.slice(0,str.indexOf(" (<a href="));
            total.team_name[0] = str;
            total.team_name[1] = "Opponents";
            var id = (window.location+"").slice((window.location+"").indexOf("team_id=")+8);
            total.team_id[0] = new Array(checkBoxes.length);
            for (var i=0; i<total.team_id[0].length; i++) {
                total.team_id[0][i] = id;
            }
        }
        else {
            // on a play-by-play page
            total.team_name[0] = teamHeading[0].firstChild.innerHTML;
            total.team_name[1] = teamHeading[0].lastChild.innerHTML;
        }
    }
    var stats = [];
    //console.log(checkBoxes.length+" -- "+storageStats.length);
    for (var i=0; i<checkBoxes.length; i++) {
        if (checkBoxes[i].checked == true) {
            var s = eval(uneval(storageStats[i]));
            if (total.team_id[0] == null) {
                total = addition(total, s);
            }
            else if (total.team_id[0].length != null) {
                var save = total.team_id[0];
                total.team_id[0] = save[i];
                total = addition(total, s);
                total.team_id[0] = save;
            }
            else {
                total = addition(total, s);
            }
            stats.push(storageStats[i]);
        }
    }
    fillTables(total);

    var tables = document.getElementById("gamescout");
    changeVisibility(0,2);
    tables.setAttribute("style","visibility: visible;");
	
    if (window.location.toString().match("team.pl")) {
        var addr = (window.location+"").replace("team.pl","roster.pl");
        var div = document.getElementById("storage:"+addr);
        if (div == null) {
            getInetPage(addr, parsePlayerFromRoster);
        }
        else {
            p = []; p.page = div.innerHTML;
            parsePlayerFromRoster(addr,p);
        }
    }
    else if (window.location.toString().match("player_game_log.pl")) {
        var last = null;
        for (var i=0; i<total.team_id[0].length; i++) {
            if (total.team_id[0][i] != last) {
                var addr = "/game/roster.pl?team_id="+total.team_id[0][i];
                var div = document.getElementById("storage:"+addr);
                if (div == null) {
                    getInetPage(addr, parsePlayerFromRoster);
                }
                else {
                    p = []; p.page = div.innerHTML;
                    parsePlayerFromRoster(addr,p);
                }
            }
            last = total.team_id[0][i];
        }
    }
    else { //on a play-by-play page
        var addr = window.location.toString();
        addr = addr.slice(0,addr.indexOf("&mode=pbp"));
        var div = document.getElementById("storage:"+addr);
        if (div == null) {
            getInetPage(addr,parsePlayerFromBoxScore);
        }
        else {
            p = []; p.page = div.innerHTML;
            parsePlayerFromBoxScore(addr,p);
        }
        storageStats = new Array(document.getElementsByClassName("GScheckbox").length);
    }
}

function clearPageCount() {
    var text = document.getElementById("gspagecounter");
    text.innerHTML = "0 of ";
    var inc = 0;
    var checkBoxes = document.getElementsByClassName("GScheckbox");
    for (var cidx=0; cidx<checkBoxes.length; cidx++) {
        var c = checkBoxes[cidx];
        if (c.checked == true) {
            inc++;
        }
    }
    text.innerHTML += inc;
}
function incrementPageCount() {
    var text = document.getElementById("gspagecounter");
    var num = parseInt(text.innerHTML.slice(0,2));
    num += 1;
    text.innerHTML = num+" "+text.innerHTML.slice(text.innerHTML.indexOf("of"));
}

function input() {
    /*
	var location = document.getElementById("pbp");
	if (location != null) {
		var old = document.getElementById("storage:"+window.location);
		if (old != null) { 
			old.parentNode.removeChild(old); 
		}
		
		var div = document.createElement('div');
		div.setAttribute("id","storage:"+window.location);
		div.setAttribute("class","GSstorage");
		div.setAttribute("style","visibility:hidden; display:none;");
		div.innerHTML = document.getElementsByTagName("body")[0].innerHTML; 
		//console.log(div.innerHTML);
		document.getElementById("footer").appendChild(div);
	}
	*/
	
    total = null;
    positionsFilled = false;
    var updating = false;
    clearPageCount();
    var checkBoxes = document.getElementsByClassName("GScheckbox");
    //console.log("cb.len="+checkBoxes.length);
    for (var i=0; i<checkBoxes.length; i++) {
        if (checkBoxes[i] == null) continue;

        if (checkBoxes[i].checked == true) {
            var storage = document.getElementById("storage:"+checkBoxes[i].id);
            if (storage == null) {
                //haven't downloaded this game yet
                var div = document.createElement('div');
                div.setAttribute("id","storage:"+checkBoxes[i].id);
                div.setAttribute("class","GSstorage");
                div.setAttribute("style","visibility:hidden; display:none;");
                document.getElementById("footer").appendChild(div);

                console.log("downloading this one: "+checkBoxes[i].id);
                updating = true;
                getInetPage(checkBoxes[i].id, handlePageLoad);
            }
            else {
                //downloaded this one already
                //hold off on updating the tables for now
                console.log("already downloaded this one: "+checkBoxes[i].id);
                var p = [];
                p.responseText = storage.innerHTML;
                handlePageLoad(checkBoxes[i].id,p);
            }
        }
    }
    if (updating == false) {
        //updating = true;
        //make sure tables have updated at least once
        fillScoutTable();
    }
}


//------------ start box score loading ------------------------

function parsePlayerFromBoxScore(address, page) {
    console.log("parsePlayerFromBoxScore("+address+")");
    var s = document.getElementById("storage:"+address);
    if (s == null) {
        var footer = document.getElementById("footer");
        var div = document.createElement("div");
        div.setAttribute("id","storage:"+address);
        div.setAttribute("style","visibility: hidden; display:none;");
        div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
        footer.appendChild(div);
    }
    else {
        page.responseText = s.innerHTML;
    }
	
    var text = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
    var playerLinks = [];
    var header = "<td class=\"box_score_player_stat_name\">";

    var t = text;
    var i=-1;
    while ( (i=t.indexOf(header)) != -1) {
        t = t.slice(i+header.length);

        if (t.indexOf("<span") != 0) {
            continue;
        }
        var end = t.indexOf("</td");
        playerLinks.push(t.slice(0,end));
        t = t.slice(end+1);
    }
    addPositionsToTables(playerLinks);
    console.log("end --> parsePlayerFromBoxScore("+address+")");
}

function parsePlayerFromRoster(address, page) {
    console.log("parsePlayerFromRoster("+address+")");
    var s = document.getElementById("storage:"+address);
    if (s == null) {
        var footer = document.getElementById("footer");
        var div = document.createElement("div");
        div.setAttribute("id","storage:"+address);
        div.setAttribute("style","visibility: hidden; display:none;");
        div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
        footer.appendChild(div);
    }
	
    var playerLinks = [];
    var s = document.getElementById("storage:"+address);
    var l = s.getElementsByClassName("player_name");
    for (var pidx=0; pidx<l.length; pidx++) {
        var p = l[pidx];
        if (p.parentNode == null) continue;
		
        var name = p.firstChild.innerHTML;
        var pos = p.parentNode.getElementsByClassName("player_position")[0].firstChild.innerHTML;
		
        while (pos.length < 4) {
            pos += "&nbsp;";
        }
        var html = "<span class=\"cpu\">"+pos+"</span>"+name;
        playerLinks.push(html);
    }
    addPositionsToTables(playerLinks);
}

function addPositionsToTables(playerLinks) {
    console.log("addPositionsToTables()");
    var nodes = document.getElementsByClassName("pbp_pbr_title_row");
    for (var i=0;i<nodes.length; i++) {
        var rowName = nodes[i].firstChild.innerHTML;
        for (var pidx=0; pidx<playerLinks.length; pidx++) {
            var p = playerLinks[pidx];
            if (trim(rowName).length == 0) continue;

            if ((p.indexOf(">"+rowName+"<") != -1) ||
                (p.indexOf("> "+rowName+"<") != -1) ||
                (p.indexOf(">"+rowName+" <") != -1)) {
                nodes[i].firstChild.innerHTML = p;
            }
            else if (p.indexOf(">"+fixEscapedText(rowName)+"<") != -1) {
                nodes[i].firstChild.innerHTML = p;
            }
        }
    }
}

//------------ end box score loading ------------------------



//------------ game scout start -----------------------------

function arrayPush(ct, arr1, data1, arr2, data2) {
    if (arr1 == null) console.log("arr1 is null");
    if (arr1[ct] == null) console.log("arr["+ct+"] is null");
    //console.log("ap arr1["+ct+"]--> "+arr1[ct]);
    var d = trim(data1);
    var index = arr1[ct].indexOf(d);
    if (index == -1) {
        index = arr1[ct].length;
        arr1[ct].push(d);
        arr2[ct].push(data2);
    }
    return index;
}

function convertTime(s) {
    if (s == null) {
        console.log("convertTime == null | '"+s+"'");
        return 0;
    }
    var v = s.split(':');
    return parseFloat(v[0])*60 + parseFloat(v[1]);
}

function yardReverse(marker) {
    var y = parseFloat(marker.slice(4));
    if (marker.indexOf("OWN") == 0) return "OPP "+y;
    else return "OWN "+y;
}

function kickDistance(start, add) {
    if ((start == null) || (add == null)) return 0;
    var y = parseFloat(start.slice(4));
    if (start.slice(0,3) == "OPP") {
        y = 100-y;
    }
    y += add;
    if (y < 50) {
        y = "OWN "+y;
    }
    else {
        y = 100 - y;
        y = "OPP "+y;
    }
    return y;
}

function yardAddition(start, add) {
    if ((start == null) || (add == null)) return 0;
    var y = parseFloat(start.slice(4));
    if (start.slice(0,3) == "OPP") {
        y += 50;
    }
    y += add;
    if (y < 50) {
        y = "OWN "+y;
    }
    else {
        y = 100 - y;
        y = "OPP "+y;
    }
    //console.log(start+" - "+add+" : "+y);
    return y;
}

function yardDiff(start, end) {
    if ((start == null) || (end == null)) return 0;
    var starty = parseFloat(start.slice(4));
    var endy = parseFloat(end.slice(4));
    //console.log(starty+"--"+endy);
    var yards = -1000;
    if (start.slice(0,3) == "OWN") {
        if (end.slice(0,3) == "OWN") {
            yards = endy - starty;
        }
        else {
            yards = 100-endy-starty;
        }
    }
    else if (start.slice(0,3) == "OPP") {
        if (end.slice(0,3) == "OPP") {
            yards = starty - endy;
        }
        else {
            yards = starty+endy-100;
        }
    }
    return yards;
}

function Play() {
    this.quarter;
    this.team;
    this.timeRemaining;
    this.timeoutsRemaining;
    this.marker;
    this.down;
    this.togo;
    this.play;
    this.replay;
    this.yards;
	
    this.toString = function() {
        return this.quarter+" : "+this.team+" - "+this.timeRemaining+" - "+
        this.marker+" - "+this.down+"&"+this.togo;
    }
}

function penaltyHandler(stats, p) {
    var playText = p.play;

    var s1 = playText.indexOf(" penalty committed by ")
    var s2 = s1 + (" penalty committed by ").length;
	
    var penalty = playText.slice(0,s1);
    var player = playText.slice(s2);
	
    if (penalty == "False start") {
        var ct = current_team;
        var playerIndex = arrayPush(ct,stats.playerPenaltyName,player,
            stats.playerPenaltyStats,[0,0,0]);
        stats.playerPenaltyStats[ct][playerIndex][0] += 1;
        stats.team_penalty[ct*6+0] += 1;
        stats.team_penalty[ct*6+(parseFloat(p.quarter))] += 1;
    }
    else if (penalty == "Offside") {
        var ct = (current_team+1)%2;
        var playerIndex = arrayPush(ct,stats.playerPenaltyName,player,
            stats.playerPenaltyStats,[0,0,0]);
        stats.playerPenaltyStats[ct][playerIndex][1] += 1;
        stats.team_penalty[ct*6+0] += 1;
        stats.team_penalty[ct*6+(parseFloat(p.quarter))] += 1;
    }
    else if (penalty == "Encroachment") {
        var ct = (current_team+1)%2;
        var playerIndex = arrayPush(ct,stats.playerPenaltyName,player,
            stats.playerPenaltyStats,[0,0,0]);
        stats.playerPenaltyStats[ct][playerIndex][2] += 1;
        stats.team_penalty[ct*6+0] += 1;
        stats.team_penalty[ct*6+(parseFloat(p.quarter))] += 1;
    }
    else {
        console.log("report this!!! ==>> unknown penalty : "+penalty);
    }
	
    return stats;
}

function sliceBrackets(str, idx) {
    //console.log(str);
    var lead = str.substring(0,idx);
    var slice = str.substring(idx).indexOf("]");
    var tail = str.substring(lead.length+slice);

    var string = lead+tail;
    //console.log(string);
    return string;
}

function defenseHandler(stats, shift, p, playType) {
    //defenders
    var playText = p.play;
    var ct = (current_team+1)%2;
    var dt = false;
    var s1 = -1;


	playText = playText.replace( new RegExp("diving tackle: ","g"), "tackle: ");   
    playText = playText.replace("[Big Hit tackle: ","[tackle: ");
    playText = playText.replace("[Monster Hit tackle: ","[tackle: ");
    playText = playText.replace("[Big Sack tackle: ","[tackle: ");

    var s1 = playText.indexOf("[tackle: ");
    if (s1 == -1) {
        s1 = playText.indexOf("[diving tackle: ");
        dt = true;
    }
	
    if (s1 != -1) {
        if (dt == false) s1 += "[tackle: ".length;
        else s1 += "[diving tackle: ".length;

        var s2 = playText.slice(s1).indexOf("]");
        s = playText.slice(s1,s1+s2);
        //s = trim(s); //am I necessary?
        //console.log(s);
		
        var defeat = false;
        var stop = 0.45;
        if (p.down == 2) stop = 0.6;
        if (p.down > 2) {
            stop = 1.0;
            defeat = true;
        }
        if (playType == "rush") {
            var playerIndex = arrayPush(ct,stats.playerDefensiveRushName,s,
                stats.playerDefensiveRushStats,[0,0,0,0,0,0]);
            stats.playerDefensiveRushStats[ct][playerIndex][0] += 1;
            stats.playerDefensiveRushStats[ct][playerIndex][2] += p.yards;
            if (p.yards < (p.togo*stop)) {
                stats.playerDefensiveRushStats[ct][playerIndex][3] += 1;
                if ((defeat == true) || (p.yards < 0)) {
                    stats.playerDefensiveRushStats[ct][playerIndex][4] += 1;
                }
            }
        //console.log(stats.playerDefensiveRushName[ct][playerIndex]+" -- "+stats.playerDefensiveRushStats[ct][playerIndex]+" : "+p.play);
        }
        else if (playType == "pass") {
            var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
                stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0,0]);
            stats.playerDefensivePassStats[ct][playerIndex][0] += 1;
            stats.playerDefensivePassStats[ct][playerIndex][2] += p.yards;
            if (p.yards < (p.togo*stop)) {
                stats.playerDefensivePassStats[ct][playerIndex][3] += 1;
                if ((defeat == true) || (p.yards < 0)) {
                    stats.playerDefensivePassStats[ct][playerIndex][4] += 1;
                }
            }
        }
        else if (playType == "st") {
            var playerIndex = arrayPush(ct,stats.playerDefensiveSTName,s,
                stats.playerDefensiveSTStats,[0,0,0,0]);
            stats.playerDefensiveSTStats[ct][playerIndex][0] += 1;
            stats.playerDefensiveSTStats[ct][playerIndex][2] += p.yards;
        }
        else console.log("defenseHandler says WTF?!?!");
    }

    var string = playText+"";

    //var string = sliceBrackets(p.play, s1);

    while ( (s1 = string.indexOf("[missed tackle: ")) != -1) {
        string = string.slice(s1+"[missed tackle: ".length);
        s2 = string.indexOf("]");
        if (string.indexOf(" (Spin)]") > 0) {
            s2 = Math.min(s2,string.indexOf(" (Spin)]"));
        }
        else if (string.indexOf(" (Juke)]") > 0) {
            s2 = Math.min(s2,string.indexOf(" (Juke)]"));
        }
        else if (string.indexOf(" (Power Through)]") > 0) {
            s2 = Math.min(s2,string.indexOf(" (Power Through)]"));
        }
        else if (string.indexOf(" (Lower the Shoulder)]") > 0) {
            s2 = Math.min(s2,string.indexOf(" (Lower the Shoulder)]"));
        }
        else if (string.indexOf(" (Stiff Arm)]") > 0) {
            s2 = Math.min(s2,string.indexOf(" (Stiff Arm)]"));
        }
        else if (string.indexOf(" (Hurdle)]") > 0) {
            s2 = Math.min(s2,string.indexOf(" (Hurdle)]"));
        }
        s = string.slice(0,s2);
        //s = trim(s); // am I necessary?

        if (playType == "rush") {
            var playerIndex = arrayPush(ct,stats.playerDefensiveRushName,s,
                stats.playerDefensiveRushStats,[0,0,0,0,0,0]);
            stats.playerDefensiveRushStats[ct][playerIndex][1] += 1;
        }
        else if (playType == "pass") {
            var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
                stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0,0]);
            stats.playerDefensivePassStats[ct][playerIndex][1] += 1;
        }
        else if (playType == "st") {
            var playerIndex = arrayPush(ct,stats.playerDefensiveSTName,s,
                stats.playerDefensiveSTStats,[0,0,0,0]);
            stats.playerDefensiveSTStats[ct][playerIndex][1] += 1;
        }
        else console.log("defenseHandler says WTF?!?!");
		
        string = string.slice(s2);
    }
	
    //forced fumble
    string = p.play+"";
    if ( (s1 = string.indexOf("[forced fumble: ")) != -1) {
        string = string.slice(s1+"[forced fumble: ".length);
        s2 = string.indexOf("]");
        s = string.slice(0,s2);
		
        if (playType == "rush") {
            var playerIndex = arrayPush(ct,stats.playerDefensiveRushName,s,
                stats.playerDefensiveRushStats,[0,0,0,0,0,0]);
            stats.playerDefensiveRushStats[ct][playerIndex][5] += 1;
        }
        else if (playType == "pass") {
            var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
                stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0,0]);
            stats.playerDefensivePassStats[ct][playerIndex][5] += 1;
        }
        else if (playType == "st") {
            var playerIndex = arrayPush(ct,stats.playerDefensiveSTName,s,
                stats.playerDefensiveSTStats,[0,0,0,0]);
            stats.playerDefensiveSTStats[ct][playerIndex][3] += 1;
        }
        else console.log("defenseHandler says WTF?!?!");
    }
    if (playType == "pass") {
        //deflected by
        string = p.play+"";

        var kl = string.indexOf(", knocked loose by ") != -1;
        while ( (s1 = string.indexOf("[deflected by ")) != -1) {
            string = string.slice(s1+"[deflected by ".length);
            s2 = string.indexOf("]");
            s = string.slice(0,s2);
            //s = trim(s); // am I necessary?
	
            if ((string.indexOf("(incomplete)") != -1) ||
                (string.indexOf("(incomplete - bad throw)") != -1)) {
                var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
                    stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0,0]);
                stats.playerDefensivePassStats[ct][playerIndex][7] += 1;
                //stats.playerDefensivePassStats[ct][playerIndex][3] += 1;
                if (p.down > 2) {
                    //stats.playerDefensivePassStats[ct][playerIndex][4] += 1;
                }
                if (kl == true) {
                    stats.playerDefensivePassStats[ct][playerIndex][8] += 1;
                }
            }
            string = string.slice(s2);
        }
		
        string = p.play+"";
        if ( (s1 = string.indexOf(" sacked by ")) != -1) {
            string = string.slice(s1+" sacked by ".length);
            s2 = string.indexOf(" (");
            s = string.slice(0,s2);
			
            //console.log(p.yards+" -- "+p.play);
            if (p.yards < 0) {
                var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
                    stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0,0]);
                stats.playerDefensivePassStats[ct][playerIndex][0] += 1;
                stats.playerDefensivePassStats[ct][playerIndex][2] += p.yards;
                stats.playerDefensivePassStats[ct][playerIndex][3] += 1;
                stats.playerDefensivePassStats[ct][playerIndex][4] += 1;
            }
            else console.log("DH: fuckup?");
        }
    }
    return stats;
}

function intDefenseHandler(stats, shift, p, playType) {
    var ct = (current_team+1)%2;
    var s1 = -1;
    var string = p.play+"";

    if (playType == "pass") {
        //intercepted by
        string = p.play+"";
        if ( (s1 = string.indexOf(" intercepted by ")) != -1) {
            string = string.slice(s1+" intercepted by ".length);
            s2 = Math.min(string.indexOf("("),string.indexOf("["));
            if (string.indexOf(", PAT m") != -1) {
                s2 = Math.min(s2,string.indexOf(", PAT m"));
            }
            s = string.slice(0,s2);
            s = trim(s);

            if (string.indexOf("yd return") != -1) {
                var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
                    stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0,0]);
                stats.playerDefensivePassStats[ct][playerIndex][6] += 1;
            }
        }

        //deflected by
        string = p.play+"";
        while ( (s1 = string.indexOf("[deflected by ")) != -1) {
            string = string.slice(s1+"[deflected by ".length);
            s2 = string.indexOf("]");
            s = string.slice(0,s2);

            if ((string.indexOf("(incomplete)") != -1) ||
                (string.indexOf("(incomplete - bad throw)") != -1)) {
                var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
                    stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0,0]);
                stats.playerDefensivePassStats[ct][playerIndex][7] += 1;
                //stats.playerDefensivePassStats[ct][playerIndex][3] += 1;
                if (p.down > 2) {

            //stats.playerDefensivePassStats[ct][playerIndex][4] += 1;
            }
            }
            string = string.slice(s2);
        }
    }
    return stats;
}


function playHandler(stats, drive,p) {
    //console.log("playHandler loop: "+pages+" - "+p.replay);
    //console.log(p);
    //console.log(p.play);
    var playText = p.play;
    playText = trim(playText);
    var quarter = parseFloat(p.quarter);
    var down = parseFloat(p.down);
    var togo = -1;
    var minGain = -1;

    if (p.team == stats.team_name[0]) current_team = 0;
    else current_team = 1;

    try {
        try {
            if (p.togo ==  null) {
                p.togo = -1;
            }
            else if (p.togo == "G") {
                togo = parseFloat(p.marker.slice(4));
            }
            else if (p.togo.indexOf("inches") != -1) {
                togo = 0.5;
            }
            else {
                togo = parseFloat(p.togo);
            }
        }
        catch (err) {
            //console.log(err);
            togo = 0.5;
        }
        if (down == 1) {
            minGain = togo*0.40;
        }
        else if (down == 2) {
            minGain = togo*0.60;
        }
        else {
            minGain = togo;
        }
        var sp = -1;
        var ep = -1;
        var y = NaN;
        var yt;

        var line = playText;
        do {
            //unfortunately, some people have parentheses in their names
            sp = line.indexOf('(')+1;
            ep = line.indexOf(')');
            if ((sp == -1) || (ep == -1)) {
                //no parentheses left in this line
                y = NaN;
                break;
            }
            else {
                //one complete set of parentheses found
                yt = line.slice(sp,ep);
                if (yt.indexOf("incomplete") != -1) {
                    y = 0;
                }
                else if (yt.indexOf("no gain") != -1) {
                    y = 0;
                }
                else {
                    y = parseFloat(yt);
                }
                line = line.slice(ep+1);

                if(yt.indexOf(" yd gain") != -1) {
                //y = y;
                }
                else if(yt.indexOf(" yd loss") != -1) {
                    y = -y;
                }
                else if(yt.indexOf(" yd return") != -1) {
                }
                else if(yt.indexOf("no return") != -1) {
                }
                else if(yt.indexOf("touchback") != -1) {
                }
                else {
                    if (y != 0) { //this stupid parenthesized name has numbers first
                        y = NaN;
                    }
                }
            }
        } while (isNaN(y) == true);
    }
    catch (error) {
        console.log(error);
    }
    p.yards = y;

    if (drive.numOfPlays == 0) {
        drive.driveBegan = null;
        drive.quarter = quarter;
        lastDrive.endTime = p.timeRemaining;
    }
    if (drive.startTime == null) {
        drive.startTime = p.timeRemaining;
    }
    if (drive.driveBegan == null) {
        drive.driveBegan = p.marker;
    }
    drive.endTime = p.timeRemaining;
    drive.driveEnded = p.marker; // fix me?
    drive.numOfPlays++;
    //console.log(drive+" -- "+playText.slice(0,30));


    if ((playText.match(" rush") != null) || (playText.match(" pitch to ") != null)) {
        //console.log("rush "+playText.slice(0,20));

        var inside = true;
        if (playText.match(" pitch to ") != null) {
            inside = false;
        }

        if ((yt.indexOf(" yd return") != -1) || (playText.indexOf("(touchback)") != -1)) {
            //must have been a fumble here
            //can't include without calculating the position
            //and still won't know the direction of the run
            if (drive.numOfPlays == 1) {
                lastDrive.result = "Fumble";
                lastDrive.numOfPlays += 1;
                if (lastDrive.driveBegan == null) {
                    lastDrive.driveBegan = p.marker;
                }
                lastDrive.driveEnded = p.marker;
                lastDrive.endTime = p.timeRemaining;

                drive.numOfPlays = 0;
                if (playText.indexOf("[TD]") != -1) {
                    drive.result = "Touchdown";
                    drive.driveEnded = "OPP 0";
                    drive.driveStarted = p.marker;
                }
            }
        // can't display this stuff as I don't know
        // which team recovered if the play was the
        // first play of a drive
        // stats = defenseHandler(stats,0,p,"rush");
        }
        else if(playText.indexOf("[SAFETY]") != -1) {
            //must have been a safety here
            //and, of course, it's a possession for the wrong team
            //ignoring it for now as we don't know where the runner was tackled
            if (drive.numOfPlays == 1) {
                lastDrive.result = "Safety";
            }
            stats = defenseHandler(stats,0,p,"rush");
        }
        else {
            // 0 - 1 - 2 - 3 - 4
            var index = current_team * 5;
            var r1 = -1;
            var r2 = -1;
            var s;
            if (inside == false) {
                if ( (r2 = playText.indexOf(" to the left")) != -1) {
                //index += 0;
                }
                else if( (r2 = playText.indexOf(" up the middle")) != -1) {
                    // sometimes outside runs get stuffed immediately, so
                    // I'm just calling it a middle run regardless
                    index += 2;
                }
                else if ( (r2 = playText.indexOf(" to the right")) != -1) {
                    index += 4;
                }
                r3 = playText.indexOf("[missed");
                if (r3 != -1) {
                    if (playText[r3-1] == ' ') r3--;
                    r2 = Math.min(r2,r3);
                }
                r3 = playText.indexOf(", out of bounds ");
                if (r3 != -1) {
                    if (playText[r3-1] == ' ') r3--;
                    r2 = Math.min(r2,r3);
                }
                r1 = playText.slice(0,r2).indexOf(" pitch to ")+" pitch to ".length;
                s = playText.slice(r1,r2);
                if ( (r2 = s.indexOf(", PAT m")) != -1) {
                    s = s.slice(0,r2);
                }
            }
            else {
                if ( (r2=playText.indexOf(" to the left")) != -1) {
                    index += 1;
                }
                else if ( (r2=playText.indexOf(" up the middle")) != -1) {
                    index += 2;
                }
                else if ( (r2=playText.indexOf(" to the right")) != -1) {
                    index += 3;
                }
                r1 = 0;
                r2 = playText.indexOf(" rush");
                r3 = playText.indexOf("[missed");
                if (r3 != -1) r2 = Math.min(r2,r3);
                s = playText.slice(r1,r2);
            }
			if (s.indexOf(" [TD]") == (s.length-5)) {
				s = s.slice(0,s.length-5);
			}

            var playerIndex = arrayPush(current_team,stats.playerRushingName,s,
                stats.playerRushingStats,[0,0,0,0,0,0]);
            stats.team_att[index] += 1;
            stats.team_yards[index] += y;
            var ytemp = Math.min(y,10);
            var ly = 0;
            if (ytemp < 0) ly += ytemp*1.2;
            else {
                ly += Math.min(ytemp,5);
                if (ytemp > 5) {
                    ly += (Math.min(ytemp,10)-5)*0.5;
                }
            }
            stats.team_lyards[index] += ly;
            //console.log(y+" -- "+ytemp+" -- "+ly);
			
            stats.team_quarter_totals[0][0+current_team*7] += 1;
            stats.team_quarter_totals[0][1+current_team*7] += y;
            stats.team_quarter_totals[quarter][0+current_team*7] += 1;
            stats.team_quarter_totals[quarter][1+current_team*7] += y;

            stats.team_att_down[(down-1)+(current_team*4)] += 1;
            stats.team_yards_down[(down-1)+(current_team*4)] += y;
            stats.team_lyards_down[(down-1)+(current_team*4)] += ly;

            stats.playerRushingStats[current_team][playerIndex][0] += 1;
            stats.playerRushingStats[current_team][playerIndex][1] += y;
            stats.playerRushingStats[current_team][playerIndex][2] =
            Math.max(stats.playerRushingStats[current_team][playerIndex][2],y);
            if (y >= minGain) {
                stats.team_success[index] += 1;
                stats.team_success_down[(down-1)+(current_team*4)] += 1;

                stats.team_quarter_totals[0][2+current_team*7] += 1;
                stats.team_quarter_totals[quarter][2+current_team*7] += 1;

                stats.playerRushingStats[current_team][playerIndex][3] += 1;
            }
            if (y >= togo) {
                stats.team_firsts[index] += 1;
                stats.team_firsts_down[(down-1)+(current_team*4)] += 1;
                stats.playerRushingStats[current_team][playerIndex][4] += 1;
            }

            stats = defenseHandler(stats,0,p,"rush");

            if (playText.indexOf("[TD]") != -1) {
                drive.result = "Touchdown";
                drive.driveEnded = "OPP 0";
            }
			
            var m = playText.split("[missed tackle:");
            if (m.length > 1) {
                stats.playerRushingStats[current_team][playerIndex][5] += m.length-1;
            }
            m = playText.split("[missed diving tackle:");
            if (m.length > 1) {
                stats.playerRushingStats[current_team][playerIndex][5] += m.length-1;
            }
        }
    //console.log((down-1)+" "+((down-1)+current_team*4)+" "+downs[down_index].innerHTML+" "+playText);
    }
    else if (playText.indexOf(" pass to ") != -1) {
//        console.log(playText);
		playText = playText.replace(" screen pass to ", " pass to ");
        var index = current_team * 3;
        var dindex;
		var isBad = false;

        var p1 = playText.indexOf(" bad pass to ")+" bad pass to ".length;
		if (p1 == (-1 + " bad pass to ".length)) {
        	p1 = playText.indexOf(" pass to ")+" pass to ".length;
		}
		else {
			isBad = true;
		}
        var p2;
        if (playText.indexOf(" the left side") != -1) {
            //index += 0;
            dindex = 0;
            p2 = playText.indexOf(" the left side") - 3;
        }
        else if(playText.indexOf(" over the middle") != -1) {
            index += 1;
            dindex = 1;
            p2 = playText.indexOf(" over the middle");
        }
        else if (playText.indexOf(" the right side") != -1) {
            index += 2;
            dindex = 2;
            p2 = playText.indexOf(" the right side") - 3;
        }

        var d = current_team*9 + dindex*3;
        var s = playText.slice(p1,p2);
        var h = s.indexOf(", hurried by");
        if (h != -1) {
            s = s.slice(0,h);
        }

        var qbn = playText.slice(0,playText.indexOf(" pass to"));
		if (isBad == true) {
        	qbn = playText.slice(0,playText.indexOf(" bad pass to"));
		}
        var qbIndex = arrayPush(current_team,stats.playerPassingName,qbn,
            stats.playerPassingStats,[0,0,0,0,0,0,0,0,0]);
        var playerIndex = arrayPush(current_team,stats.playerReceivingName,s,
            stats.playerReceivingStats,[0,0,0,0,0,0,0,0,0,0]);
  //      console.log(qbn+" : "+qbIndex+" : "+playerIndex);
        if ((yt.indexOf(" yd return") != -1) || (playText.indexOf("(touchback)") != -1)) {
            // some sort of turnover
            if ((playText.indexOf(" intercepted by ") != -1) &&
                (playText.indexOf("fumbled , recovered by") == -1)) {
                //intercepted & not fumbled
                stats.team_pass_att[(index+3)%6] += 1;
                stats.team_pass_att_down[((down-1)+(current_team*4)+4)%8] += 1;

                stats.team_quarter_totals[0][4+((current_team*7)+7)%14] += 1;
                stats.team_quarter_totals[quarter][4+((current_team*7)+7)%14] += 1;

                if (h != -1) {
                    stats.team_pass_pressure_down[((down-1)+(current_team*4)+4)%8] += 1;
                    stats.team_quarter_totals[0][6+((current_team*7)+7)%14] += 1;
                    stats.team_quarter_totals[quarter][6+((current_team*7)+7)%14] += 1;
                }

                stats.playerPassingName[current_team].pop();
                stats.playerPassingStats[current_team].pop();
                stats.playerReceivingName[current_team].pop();
                stats.playerReceivingStats[current_team].pop();
                current_team = (current_team+1)%2;

                var qbIndex = arrayPush(current_team,stats.playerPassingName,qbn,
                    stats.playerPassingStats,[0,0,0,0,0,0,0,0,0]);
                var playerIndex = arrayPush(current_team,stats.playerReceivingName,s,
                    stats.playerReceivingStats,[0,0,0,0,0,0,0,0,0,0]);
                stats.playerPassingStats[current_team][qbIndex][1] += 1;   //att
                stats.playerReceivingStats[current_team][playerIndex][1] += 1;
                stats.playerPassingStats[current_team][qbIndex][4] += 1;   //int
                if (h != -1) {
                    stats.playerPassingStats[current_team][qbIndex][8] += 1;   //pressure
                }
	            if (isBad == true) {
    	            stats.playerPassingStats[current_team][qbIndex][7] += 1; //bad pass
    	        }
                if (playText.indexOf("[deflected by ") != -1) {
                    stats.playerReceivingStats[current_team][playerIndex][6] += 1; //pd
                    stats.playerPassingStats[current_team][qbIndex][6] += 1;
                    if (playText.indexOf(", knocked loose by ") != -1) {
                        stats.playerReceivingStats[current_team][playerIndex][9] += 1; //kl
                    }
                }
				
                //can't do it yet
                stats = intDefenseHandler(stats,2,p,"pass");
                current_team = (current_team+1)%2;
                if (drive.numOfPlays == 1) {
                    lastDrive.result = "Interception";
                    //console.log(lastDrive.endTime+" -- "+drive.startTime+" -- "+p.timeRemaining);
                    lastDrive.numOfPlays += 1;
                    lastDrive.endTime = p.timeRemaining;
                    if (lastDrive.driveBegan == null) {
                        lastDrive.driveBegan = p.marker;
                    }
                    //console.log(lastDrive+"\n\n"+drive);
                    lastDrive.driveEnded = p.marker;

                    drive.numOfPlays = 0;
                    if (playText.indexOf("[TD]") != -1) {
                        drive.result = "Touchdown";
                        drive.driveEnded = "OPP 0";
                        drive.driveStarted = p.marker;
                    }
                }
            }
            else if ((playText.indexOf(" intercepted by ") != -1) &&
                (playText.indexOf("fumbled , recovered by") != -1)) {
                // intercepted and fumbled
                // can't display this stuff as I don't know
                // which team recovered if the play was the
                // first play of a drive
                //stats = defenseHandler(stats,2,p,"pass");
                if (stats.playerPassingStats[current_team][qbIndex][1] == 0) {
                    stats.playerPassingName[current_team].pop();
                    stats.playerPassingStats[current_team].pop();
                    stats.playerReceivingName[current_team].pop();
                    stats.playerReceivingStats[current_team].pop();
                }
                if (drive.numOfPlays == 1) {
                    lastDrive.result = "Interception";
                    //console.log(lastDrive.endTime+" -- "+drive.startTime+" -- "+p.timeRemaining);
                    lastDrive.numOfPlays += 1;
                    lastDrive.endTime = p.timeRemaining;
                    if (lastDrive.driveBegan == null) {
                        lastDrive.driveBegan = p.marker;
                    }
                    //console.log(lastDrive+"\n\n"+drive);
                    lastDrive.driveEnded = p.marker;

                    drive.numOfPlays = 0;
                    if (playText.indexOf("[TD]") != -1) {
                        drive.result = "Touchdown";
                        drive.driveEnded = "OPP 0";
                        drive.driveStarted = p.marker;
                    }
                }
            }
            else if ((playText.indexOf(" intercepted by ") == -1) &&
                (playText.indexOf(" recovered by") != -1)) {

                if (stats.playerPassingStats[current_team][qbIndex][1] == 0) {
                    stats.playerPassingName[current_team].pop();
                    stats.playerPassingStats[current_team].pop();
                    stats.playerReceivingName[current_team].pop();
                    stats.playerReceivingStats[current_team].pop();
                }
                // not intercepted, but fumbled reception
                // can't display this stuff as I don't know
                // which team recovered if the play was the
                // first play of a drive
                //stats = defenseHandler(stats,2,p,"pass");
                if (drive.numOfPlays == 1) {
                    lastDrive.result = "Fumble";
                    //console.log(lastDrive.endTime+" -- "+drive.startTime+" -- "+p.timeRemaining);
                    lastDrive.numOfPlays += 1;
                    lastDrive.endTime = p.timeRemaining;
                    if (lastDrive.driveBegan == null) {
                        lastDrive.driveBegan = p.marker;
                    }
                    //console.log(lastDrive+"\n\n"+drive);
                    lastDrive.driveEnded = p.marker;

                    drive.numOfPlays = 0;
                    if (playText.indexOf("[TD]") != -1) {
                        drive.result = "Touchdown";
                        drive.driveEnded = "OPP 0";
                        drive.driveStarted = p.marker;
                    }
                }
            }
        }
        else if (yt.indexOf("incomplete") != -1) {
            stats.team_pass_att[index] += 1;
            stats.team_pass_att_down[(down-1)+(current_team*4)] += 1;

            stats.team_quarter_totals[0][4+current_team*7] += 1;
            stats.team_quarter_totals[quarter][4+current_team*7] += 1;

            stats.playerPassingStats[current_team][qbIndex][1] += 1;
            if (h != -1) {
                stats.team_pass_pressure_down[(down-1)+(current_team*4)] += 1;
                stats.playerPassingStats[current_team][qbIndex][8] += 1;
                stats.team_quarter_totals[0][6+current_team*7] += 1;
                stats.team_quarter_totals[quarter][6+current_team*7] += 1;
            }

            var ta = "[thrown away] (incomplete)";
            if (playText.indexOf(ta) != playText.length-ta.length) {
                stats.playerReceivingStats[current_team][playerIndex][1] += 1;
            }
            if (yt.indexOf("dropped - incomplete") != -1) {
                stats.playerPassingStats[current_team][qbIndex][5] += 1;
                stats.playerReceivingStats[current_team][playerIndex][2] += 1;
            }
            else if ((yt.indexOf("incomplete - bad throw") != -1) || (isBad == true)) {
                stats.playerPassingStats[current_team][qbIndex][7] += 1;
            }
            if (playText.indexOf("[deflected by ") != -1) {
                stats.playerPassingStats[current_team][qbIndex][6] += 1;
                stats.playerReceivingStats[current_team][playerIndex][6] += 1;

                stats = defenseHandler(stats,2,p,"pass");
                if (playText.indexOf(", knocked loose by ") != -1) {
                    stats.playerReceivingStats[current_team][playerIndex][9] += 1; //kl
                }
            //console.log("pt= '"+playText+"'");
            }
        }
        else {
            stats.team_pass_comp[index] += 1;
            stats.team_pass_att[index] += 1;
            stats.team_pass_yards[index] += y;

            stats.team_quarter_totals[0][3+current_team*7] += 1;
            stats.team_quarter_totals[0][4+current_team*7] += 1;
            stats.team_quarter_totals[0][5+current_team*7] += y;
            stats.team_quarter_totals[quarter][3+current_team*7] += 1;
            stats.team_quarter_totals[quarter][4+current_team*7] += 1;
            stats.team_quarter_totals[quarter][5+current_team*7] += y;

            stats.team_pass_att_down[(down-1)+(current_team*4)] += 1;
            stats.team_pass_comp_down[(down-1)+(current_team*4)] += 1;
            stats.team_pass_yards_down[(down-1)+(current_team*4)] += y;

            stats.playerPassingStats[current_team][qbIndex][0] += 1;
            stats.playerPassingStats[current_team][qbIndex][1] += 1;
            stats.playerPassingStats[current_team][qbIndex][2] += y;
            if (isBad == true) {
   	            stats.playerPassingStats[current_team][qbIndex][7] += 1;
   	        }
            if (h != -1) {
                stats.team_pass_pressure_down[(down-1)+(current_team*4)] += 1;
                stats.playerPassingStats[current_team][qbIndex][8] += 1;
                stats.team_quarter_totals[0][6+current_team*7] += 1;
                stats.team_quarter_totals[quarter][6+current_team*7] += 1;
            }

            stats.playerReceivingStats[current_team][playerIndex][0] += 1;
            stats.playerReceivingStats[current_team][playerIndex][1] += 1;
            stats.playerReceivingStats[current_team][playerIndex][3] += y;
            stats.playerReceivingStats[current_team][playerIndex][4] =
            Math.max(stats.playerReceivingStats[current_team][playerIndex][4],y);
            if (playText.indexOf("[deflected by ") != -1) {
                stats.playerPassingStats[current_team][qbIndex][6] += 1;
                stats.playerReceivingStats[current_team][playerIndex][6] += 1;
            }
            if (y >= togo) {
                stats.team_pass_firsts[index] += 1;
                stats.team_pass_firsts_down[(down-1)+(current_team*4)] += 1;
                stats.playerReceivingStats[current_team][playerIndex][7] += 1;
            }

            if (y >= longPass) {
                stats.distanceStats[0][d] += 1;
                stats.distanceStats[0][d+1] += 1;
                stats.distanceStats[0][d+2] += y;
            }
            else if (y >= mediumPass) {
                stats.distanceStats[1][d] += 1;
                stats.distanceStats[1][d+1] += 1;
                stats.distanceStats[1][d+2] += y;
            }
            else if (y >= shortPass) {
                stats.distanceStats[2][d] += 1;
                stats.distanceStats[2][d+1] += 1;
                stats.distanceStats[2][d+2] += y;
            }
            else {
                stats.distanceStats[3][d] += 1;
                stats.distanceStats[3][d+1] += 1;
                stats.distanceStats[3][d+2] += y;
            }

            //stats = defenseHandler(stats,2,playText,"pass");
            stats = defenseHandler(stats,2,p,"pass");

            if (playText.indexOf("[TD]") != -1) {
                drive.result = "Touchdown";
                drive.driveEnded = "OPP 0";
                stats.playerPassingStats[current_team][qbIndex][3] += 1;
            }
			
            var m = playText.split("[missed tackle:");
            if (m.length > 1) {
                stats.playerReceivingStats[current_team][playerIndex][8] += m.length-1;
            }
            m = playText.split("[missed diving tackle:");
            if (m.length > 1) {
                stats.playerReceivingStats[current_team][playerIndex][8] += m.length-1;
            }
        }
    //console.log((down-1)+" "+((down-1)+current_team*4)+" "+downs[down_index].innerHTML+" "+playText);
    }
    else if (playText.indexOf("Kickoff by ") == 0) {
        if (playText.indexOf(", fumbled") == -1) {
            var ct = (current_team+1)%2;
            var s1 = "Kickoff by ".length;
	
            var s2 = playText.slice(s1).indexOf(', ');
            var s = playText.slice(s1,s1+s2);
	
            var s3 = playText.slice(s1+s2).indexOf(" yd");
            var yardstring = playText.slice(s1+s2+s3-3,s1+s2+s3);
            if (yardstring[1] == ".") {
                //fix for the out of the endzone decimal lengths
                yardstring = playText.slice(s1+s2+s3-3-2,s1+s2+s3);
            }
            var len = parseInt(yardstring,10);
            if (isNaN(len) == true) {
                return stats;
            }
            var playerIndex = arrayPush(ct,stats.playerKickingName,s,
                stats.playerKickingStats,[0,0,0,0,0,0]);
            stats.playerKickingStats[ct][playerIndex][0] += 1;
            stats.playerKickingStats[ct][playerIndex][1] += len;
            if (len > stats.playerKickingStats[ct][playerIndex][2]) {
                stats.playerKickingStats[ct][playerIndex][2] = len;
            }
            var kd = kickDistance(p.marker,len);
            if (p.marker == null) kd = kickDistance("Own 30",len);
            if ((parseFloat(kd.slice(4)) < 20) && (playText.indexOf("(touchback)") == -1)) {//inside 20?
                stats.playerKickingStats[ct][playerIndex][4] += 1;
            }
            if (playText.indexOf("(touchback)") != -1) {
                stats.playerKickingStats[ct][playerIndex][3] += 1;
                stats.playerKickingStats[ct][playerIndex][5] += len+parseFloat(kd.slice(4))-20; //net
            }
            else if (playText.indexOf(" yd return)") != -1) {
                var ct = current_team;
                var namestr = playText.slice(playText.indexOf(" fielded by ")+" fielded by ".length);

                var yidx = namestr.indexOf(" yd return)")-6;
                yidx = yidx+namestr.slice(yidx).indexOf(" (");
                var y = parseFloat(namestr.slice(yidx+2));

                var namestr = namestr.slice(0,yidx);
                if (namestr.indexOf(", out of bounds") == (namestr.length-", out of bounds".length)) {
                    namestr = namestr.slice(0,namestr.indexOf(", out of bounds"));
                }

                if (namestr.indexOf(" [missed tackle:") != -1) {
                    namestr = namestr.slice(0,namestr.indexOf(" [missed tackle:"));
                }
                if (namestr.indexOf(" [missed diving tackle:") != -1) {
                    namestr = namestr.slice(0,namestr.indexOf(" [missed diving tackle:"));
                }

                if (namestr.indexOf(", PAT m") != -1) {
                    namestr = namestr.slice(0,namestr.indexOf(", PAT m"));
                }
				if (namestr.indexOf(" [TD]") == (namestr.length-5)) {
					namestr = namestr.slice(0,namestr.length-5);
				}
                var returnerIndex = arrayPush(ct, stats.playerKickReturnName,namestr,
                    stats.playerKickReturnStats,[0,0,0,0,0,0]);
                stats.playerKickReturnName[ct][returnerIndex] = namestr;
                stats.playerKickReturnStats[ct][returnerIndex][0] += 1;
                stats.playerKickReturnStats[ct][returnerIndex][1] += y;
                if (y > stats.playerKickReturnStats[ct][returnerIndex][2]) {
                    stats.playerKickReturnStats[ct][returnerIndex][2] = y;
                }
				
                var m = playText.split("[missed tackle:");
                if (m.length > 1) {
                    stats.playerKickReturnStats[ct][returnerIndex][4] += m.length-1;
                }
                m = playText.split("[missed diving tackle:");
                if (m.length > 1) {
                    stats.playerKickReturnStats[ct][returnerIndex][4] += m.length-1;
                }
                stats.playerKickingStats[(ct+1)%2][playerIndex][5] += Math.max(len-y,0); //net
                stats.playerKickReturnStats[ct][returnerIndex][5] += Math.min(1,y/len);
            //console.log(len+" -- "+y+" -- "+(y/len).toFixed(3));
            }
            stats = defenseHandler(stats,4,p,"st");

            drive.startTime = p.timeRemaining;
            if (playText.indexOf("[TD]") != -1) {
                drive.driveBegan = kickDistance("OPP 30",-len);
                drive.driveEnded = "OPP 0";
                drive.result = "Touchdown";
                stats.playerKickReturnStats[ct][returnerIndex][3] += 1;
            }
            else if (playText.indexOf("(touchback)") != -1) {
                drive.driveBegan = "OWN 20";
            }
            else {
                drive.driveBegan = kickDistance("OPP 30",-len+y);

            }
        }
        else {
    //a damn fumble
    /*
			if (drive.numOfPlays != 1) {
				stats.playerKickingName[ct].pop();
				stats.playerKickingStats[ct].pop();
				playerIndex = arrayPush(current_team,stats.playerKickingName,s,
						stats.playerKickingStats,[0,0,0,0]);
				stats.playerKickingStats[current_team][playerIndex][0] += 1;
				stats.playerKickingStats[current_team][playerIndex][1] += len;
				if (len > stats.playerKickingStats[current_team][playerIndex][2]) {
					stats.playerKickingStats[current_team][playerIndex][2] = len;
				}
			}
			else {
				//kicking team recovered
				stats.playerKickingStats[ct][playerIndex][0] += 1;
				stats.playerKickingStats[ct][playerIndex][1] += len;
				if (len > stats.playerKickingStats[ct][playerIndex][2]) {
					stats.playerKickingStats[ct][playerIndex][2] = len;
				}
			}
*/
    // can't display this stuff as I don't know
    // which team recovered if the play was the
    // first play of a drive
    //stats = defenseHandler(stats,4,p,"st");
    }
    }
    else if (playText.indexOf("Punt by ") == 0) {
        var ct = (current_team+1)%2;
        var s1 = "Punt by ".length;

        var s2 = playText.slice(s1).indexOf(', ');
        var s = playText.slice(s1,s1+s2);

        var lenstr = playText.slice(s1+s2+2);
        var len = parseFloat(lenstr);
        if (isNaN(len) == true) {
            return stats;
        }
        var playerIndex = arrayPush(ct,stats.playerPuntingName,s,
            stats.playerPuntingStats,[0,0,0,0,0,0]);
        stats.playerPuntingStats[ct][playerIndex][0] += 1;
        stats.playerPuntingStats[ct][playerIndex][1] += len;
        if (len > stats.playerPuntingStats[ct][playerIndex][2]) {
            stats.playerPuntingStats[ct][playerIndex][2] = len;
        }
        var kd = kickDistance(p.marker,len);
        if ((parseFloat(kd.slice(4)) < 20) && (playText.indexOf("(touchback)") == -1)) {//inside 20?
            stats.playerPuntingStats[ct][playerIndex][4] += 1;
        }
        if (playText.indexOf(", fumbled") == -1) {
            //was a return, no fumbles
            if (playText.indexOf("(touchback)") != -1) {
                stats.playerPuntingStats[ct][playerIndex][3] += 1;
                stats.playerPuntingStats[ct][playerIndex][5] += len+parseFloat(kd.slice(4))-20;
            //console.log("tb: punted="+len+" || net="+(len+parseFloat(kd.slice(4))-20)+" \\ kd="+kd);
            }
            else if (playText.indexOf(" yd return)") != -1) {
                var ct = current_team;
                var namestr = playText.slice(playText.indexOf(" fielded by ")+" fielded by ".length);

                var yidx = namestr.indexOf(" yd return)")-6;
                yidx = yidx+namestr.slice(yidx).indexOf(" (");
                var y = parseFloat(namestr.slice(yidx+2));

                var namestr = namestr.slice(0,yidx);
                if (namestr.indexOf(", out of bounds") == (namestr.length-", out of bounds".length)) {
                    namestr = namestr.slice(0,namestr.indexOf(", out of bounds"));
                }

                if (namestr.indexOf(" [missed tackle:") != -1) {
                    namestr = namestr.slice(0,namestr.indexOf(" [missed tackle:"));
                }
                if (namestr.indexOf(" [missed diving tackle:") != -1) {

                    namestr = namestr.slice(0,namestr.indexOf(" [missed diving tackle:"));
                }

                if (namestr.indexOf(", PAT m") != -1) {
                    namestr = namestr.slice(0,namestr.indexOf(", PAT m"));
                }
				if (namestr.indexOf(" [TD]") == (namestr.length-5)) {
					namestr = namestr.slice(0,namestr.length-5);
				}
                var returnerIndex = arrayPush(ct, stats.playerPuntReturnName,namestr,
                    stats.playerPuntReturnStats,[0,0,0,0,0,0]);
                stats.playerPuntReturnName[ct][returnerIndex] = namestr;
                stats.playerPuntReturnStats[ct][returnerIndex][0] += 1;
                stats.playerPuntReturnStats[ct][returnerIndex][1] += y;
                if (y > stats.playerPuntReturnStats[ct][returnerIndex][2]) {
                    stats.playerPuntReturnStats[ct][returnerIndex][2] = y;
                }
                if (playText.indexOf("[TD]") != -1) {
                    stats.playerPuntReturnStats[ct][returnerIndex][3] += 1;
                }
				
                var m = playText.split("[missed tackle:");
                if (m.length > 1) {
                    stats.playerPuntReturnStats[ct][returnerIndex][4] += m.length-1;
                }
                m = playText.split("[missed diving tackle:");
                if (m.length > 1) {
                    stats.playerPuntReturnStats[ct][returnerIndex][4] += m.length-1;
                }
                stats.playerPuntingStats[(ct+1)%2][playerIndex][5] += Math.max(len-y,0);
                //console.log("ret: punted="+len+" || net="+Math.max(len-y,0)+" // ret="+y);
                if (isNaN(len) == false) {
                    stats.playerPuntReturnStats[ct][returnerIndex][5] += Math.min(1,y/len);
                //console.log(stats.playerPuntReturnStats[ct][returnerIndex][5]);
                }
                else {
            //console.log("isNaN==true : "+playText);
            }
            }
            else {
                stats.playerPuntingStats[ct][playerIndex][5] += len;
            //console.log("no ret: punted="+len+" || net="+(len));
            }
            stats = defenseHandler(stats,4,p,"st");

            lastDrive.result = "Punt";
            lastDrive.numOfPlays += 1;
            lastDrive.driveEnded = p.marker;

            drive.numOfPlays = 0;
            drive.startTime = p.timeRemaining;
            if (playText.indexOf("[TD]") != -1) {
                drive.driveBegan = kickDistance(p.marker,len);
                drive.driveBegan = yardReverse(drive.driveBegan);
                drive.driveEnded = "OPP 0";
                drive.result = "Touchdown";
            }
            else if (playText.indexOf("(touchback)") != -1) {
                drive.driveBegan = "OWN 20";
            }
            else {
                drive.driveBegan = kickDistance(p.marker,-len+y);
            }
        }
        else {
            if (drive.numOfPlays == 1) {
                //punt was fumbled & return team recovered
                lastDrive.result = "Punt";
                lastDrive.numOfPlays += 1;
                lastDrive.driveEnded = p.marker;
                lastDrive.endTime = p.timeRemaining;

                drive.numOfPlays = 0;
                drive.startTime = p.timeRemaining;
                stats.playerPuntingStats[ct][playerIndex][5] += len;
            //console.log("fum retrec: punted="+len+" || net="+(len));
            }
            else {
                //punt was fumbled & kickoff team recovered
                stats.playerPuntingName[ct].pop();
                stats.playerPuntingStats[ct].pop();
                ct = (ct+1)%2;
                var playerIndex = arrayPush(ct,stats.playerPuntingName,s,
                    stats.playerPuntingStats,[0,0,0,0,0,0]);
                stats.playerPuntingStats[ct][playerIndex][0] += 1;
                stats.playerPuntingStats[ct][playerIndex][1] += len;
                if (len > stats.playerPuntingStats[ct][playerIndex][2]) {
                    stats.playerPuntingStats[ct][playerIndex][2] = len;
                }
                stats.playerPuntingStats[ct][playerIndex][5] += len;
            //console.log("fum punrec: punted="+len+" || net="+(len));
            }
        // can't display this stuff as I don't know
        // which team recovered if the play was the
        // first play of a drive
        //stats = defenseHandler(stats,4,p,"st");
        }
    }
    else if (playText.indexOf("yd field goal attempted by") != -1) {
        if (playText.indexOf(", missed") == (playText.length - ", missed".length)) {
            lastDrive.result = "Missed FG";
            lastDrive.endTime = p.timeRemaining;
            lastDrive.driveEnded = p.marker;
            lastDrive.numOfPlays++;
            drive.numOfPlays = 0;
        }
        else {
            drive.result = "FG";
        }
    }
    else if ((playText.indexOf("[forced fumble:") == 0) ||
        (playText.indexOf("[Big Sack forced fumble:") == 0)) {
        //sack with fumble
        //can't handle this right now since we don't know
        //which team has the ball
        if (drive.numOfPlays == 1) {
            //lost fumble on a sack
            if (playText.indexOf("[SAFETY]") != -1) {
                lastDrive.result = "Safety";
                lastDrive.numOfPlays += 1;
                lastDrive.driveEnded = p.marker;
                lastDrive.endTime = p.timeRemaining;

                drive.numOfPlays = 0;
                drive.startTime = p.timeRemaining;
            }
            else if (playText.indexOf("forced fumble:") != -1) {
                lastDrive.result = "Fumble";
                lastDrive.numOfPlays += 1;
                lastDrive.driveEnded = p.marker;
                lastDrive.endTime = p.timeRemaining;

                drive.numOfPlays = 0;
                drive.startTime = p.timeRemaining;
                if (playText.indexOf("[TD]") != -1) {
                    drive.driveEnded = "Opp 0";
                    drive.result = "Touchdown";
                }
            }
        }
    }
    else if ((playText.match(" sacked by ") != null) ||
        (playText.indexOf("[tackle:") == 0) ||
        (playText.indexOf("[Monster Hit tackle:") == 0) ||
        (playText.indexOf("[Big Sack tackle:") == 0) ||
        (playText.indexOf("[diving tackle:") == 0))  {
        //sack without fumble
        //console.log("sack "+playText.slice(0,40));
        if (playText.indexOf("] [SAFETY]") != -1) {
            current_team = (current_team+1)%2;
            stats = defenseHandler(stats,2,p,"pass");
            current_team = (current_team+1)%2;
        }
        else {
            stats = defenseHandler(stats,2,p,"pass");
        }
		
        if (drive.numOfPlays == 1) {
            //lost fumble on a sack
            if (playText.indexOf("[SAFETY]") != -1) {
                lastDrive.result = "Safety";
                lastDrive.numOfPlays += 1;
                lastDrive.driveEnded = p.marker;
                lastDrive.endTime = p.timeRemaining;

                drive.numOfPlays = 0;
                drive.startTime = p.timeRemaining;
            }
            else if (playText.indexOf("[forced fumble:") != -1) {
                lastDrive.result = "Fumble";
                lastDrive.numOfPlays += 1;
                lastDrive.driveEnded = p.marker;
                lastDrive.endTime = p.timeRemaining;

                drive.numOfPlays = 0;
                drive.startTime = p.timeRemaining;
                if (playText.indexOf("[TD]") != -1) {
                    drive.driveEnded = "Opp 0";
                    drive.result = "Touchdown";
                }
            }
        }
    }
    else if (playText.indexOf("penalty committed by") != -1) {
        //console.log("Penalty: "+playText.slice(0,40));
        stats = penaltyHandler(stats, p);
    }
    else if (playText.indexOf(" calls timeout") != -1) {
    //nothing to do here
    }
    else if (playText.indexOf("Offensive Timeout Called") == 0) {
    //nothing to do here
    }
    else if (playText.indexOf("Extra point attempted by") == 0) {
    //nothing to do here
    }
    else {
        //something really wierd
        console.log("You shouldn't see me, so I'm probably a bug: '"+playText+"'");
    }

    if (playText.indexOf("turnover on downs") != -1) {
        drive.result = "Downs";
    //drive.driveEnded = p.marker;
    }

    if (lastTime == null) {
    }
    else {
        if (lastTime < convertTime(p.timeRemaining)) {
            stats.team_possession[current_team*6] += lastTime;
            stats.team_possession[current_team*6+quarter-1] += lastTime;
        }
        else {
            stats.team_possession[current_team*6] += lastTime - convertTime(p.timeRemaining);
            stats.team_possession[current_team*6+quarter] += lastTime - convertTime(p.timeRemaining);
        }
    }
    lastTime = convertTime(p.timeRemaining);

    //console.log(stats.playerRushingName);
    //console.log(stats.playerReceivingName);
    //console.log(stats.playerDefensiveName);
    return stats;
}

function getTeamNames(stats, page) {
    var heading = page.getElementsByClassName("big_head subhead_head");
    heading = heading[0];
    var teams = heading.innerHTML.split("team_id=");
    stats.team_id[0] = teams[1].slice(0,teams[1].indexOf('"'));
    stats.team_name[0] = heading.firstChild.innerHTML;
    stats.team_id[1] = teams[2].slice(0,teams[2].indexOf('"'));
    stats.team_name[1] = heading.lastChild.innerHTML;
}

var current_team = 0;
var lastTime = 900;
var quarter = 0;
var team;
var lastDrive = new Drive();

function Drive() {
	this.teamName;
	this.quarter;
	this.startTime;
	this.endTime;
	this.driveBegan;
	this.driveEnded;
	this.numOfPlays = 0;
	this.netYards = 0;
	this.result;

	this.toString = function() {
		return this.quarter+" : "+this.startTime+" : "+this.endTime+" : " +
		this.timePoss+" : "+this.driveBegan+" : " +
		this.driveEnded+" : "+this.numOfPlays+" : " +
		yardDiff(this.driveBegan,this.driveEnded) +
		" : "+this.result;
	}
}

function gameScout(inetAddress,page) {
    var stats = new Stats();
    current_team = 0;
    lastTime = 900;
    quarter = 0;
    lastDrive = new Drive();
    var d = null;
    var p = null;
    var pbpTable = findChild("play_by_play_table",page);
    if (pbpTable == null) {
        console.log("pbpTable is null. exiting. gamescout 28938user.js");
        return stats;
    }
	   
    console.log("start");
    getTeamNames(stats, page);
	
    pages = pbpTable.rows.length;
    //for each (htmlTableRowElement in pbpTable.rows) {
    for (var hidx=0; hidx<pbpTable.rows.length; hidx++) {
        var htmlTableRowElement = pbpTable.rows[hidx];
        //console.log(htmlTableRowElement.textContent);
        var className = htmlTableRowElement.className;
        if (className == null) {
            continue;
        }
        if (className.match("pbp_quarter") != null) {
            quarter++;
            if (quarter == 3) {
                if (d != null) {
                    if (d.result == null) {
                        d.result = "End of Half";
                    }
                    d.endTime = "0:00";
                    //console.log(d);
                    lastDrive = d;
                    stats.driveList[current_team].push(d);
                    d = new Drive();
                }
            }
        }
        else if (className.match("pbp_team") != null) {
            var coll = htmlTableRowElement.cells;
            var node = coll.item(0);
            var idx = 0;
            do {
                var s = node.innerHTML.slice(idx,node.innerHTML.length);
                var i = s.indexOf(" ");
                if (i != -1) idx += i + 1;
            }
            while (i != -1);
            team = node.innerHTML.slice(0,idx-1);

            var found = false;
            for (var tidx=0; tidx<stats.team_name.length; tidx++) {
                var t = stats.team_name[tidx];
                if (t == team) {
                    found = true;
                    break;
                }
            }
            if (found == false) {
                stats.team_name.push(team);
                console.log(stats.team_name+" -- "+stats.team_id);
            }
            if (d != null) {
                if (d.quarter != null) {
                    //console.log(d);
                    lastDrive = d;
                    stats.driveList[current_team].push(lastDrive);
                }
            }
            d = new Drive();
            d.teamName = team;
        }
        else if (className.match("pbp_play_row") != null) {
            p = new Play();
            p.quarter = quarter;
            p.team = team;

            var coll = htmlTableRowElement.cells;
            //for each (node in coll) {
            for (var nidx=0; nidx<coll.length; nidx++) {
                var node = coll[nidx];
                var cName = node.className;
                if (cName.match("pbp_time_remaining") != null) {
                    p.timeRemaining = node.innerHTML;
                }
                else if (cName.match("pbp_marker") != null) {
                    p.marker = node.innerHTML;
                }
                else if (cName.match("pbp_down") != null) {
                    p.down = node.innerHTML.slice(0,1);
                    p.togo = node.innerHTML.slice(node.innerHTML.indexOf("amp; ")+5);
                }
                else if (cName.match("pbp_replay") != null) {
                    p.replay = node.firstChild;
                    //if (p.playText != null) {
                    if (htmlTableRowElement.className.toString().indexOf("pbrfiltered") == -1) {
                        //console.log(htmlTableRowElement.className+" -- "+p.play);
                        stats = playHandler(stats,d,p);
                    }
                //}
                }
                else if (cName.match("pbp_play") != null) {
                    p.play = node.firstChild.data;
                    if (isNaN(parseInt(p.play)) == false) {
                        p.play = p.play.slice(p.play.indexOf(" "));
                    }
                    var playText = p.play;
                    p.score = 0;
                    while (playText.indexOf("[") != -1) {
                        var startidx = playText.indexOf("[")+1;
                        playText = playText.substring(startidx);
                        var endidx = playText.indexOf("]");
                        if (endidx == -1) break;

                        var score = playText.substring(0, endidx);
                        if (score == "FG") {
                            p.score = 3;
                        }
                        else if (score == "TD") {
                            p.score = 6;
                            if (p.play.indexOf(", PAT made by ") != -1) {
                                p.score += 1;
                            }
                        }
                        else if (score == "SAFETY") {
                            p.score = 2;
                        }
                        else if (score.indexOf("deflected by ") != 0) p.score = 0;
                    }
                }
            /*
					var playText = p.play;
					if (playText.indexOf("made [FG]") != -1) p.score = 3;
					else if (playText.indexOf("[TD]") != -1) p.score = 6;
					else if (playText.indexOf("[SAFETY]") != -1) p.score = 2;
					else p.score = 0;
					if (playText.indexOf(", PAT made by ") != -1) p.score += 1;}
                    */
            }
        }
        else {
    //			console.log("main loop removal : "+pages+" / "+pbpTable.rows.length);
    }

    }
    console.log("game over");

    d.endTime = "00:00";
    d.result = "End of Game";
    stats.driveList[current_team].push(d);

    //time of possession for last play
    if ((p.quarter != 5) && ((window.location.toString()).indexOf("quarter=5") == -1)) {
        stats.team_possession[current_team*6] += lastTime;
        stats.team_possession[current_team*6+p.quarter] += lastTime;
    }
    if (p.quarter == 1) {
        d.result = "End of Quarter";
    }
    console.log("main loop done");

    /*//shouldn't be needed anymore
	var pbp = findChild("pbp",page);
	if (pbp != null) {
		pbp.parentNode.removeChild(pbp);
	}
	*/

    //var index = links.indexOf(inetAddress);
    var index = -1;
    var s = document.getElementsByClassName("GScheckbox");
    for (var i=0; i<s.length; i++) {
        if (s[i].id == inetAddress) {
            index = i;
            break;
        }
    }
    //console.log("storageArr[]: "+(index+1)+" of "+storageArr.length);
    //storageArr[index] = stats;

    console.log("exiting gs run");

    return stats;
}

function loadPBPSimple(page) {
    var timeouts = [3, 3];
    var quarter = 0;
    var p = null;
    var team;
    plays = [];
	
    var div = document.createElement("div");
/*
    div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
    var pbpTable = findChild("play_by_play_table",div);
*/
    var string = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
    string = string.slice(string.indexOf('<div id="page_box_score"'));
    string = string.slice(0,string.indexOf('<div id="footer"'));
    div.innerHTML = string;

    var pbpTable = findChild("play_by_play_table",div);
    console.log("pbpTable = "+pbpTable);
    if (pbpTable == null) {
        console.log("pbpTable is null. exiting. loadpbpsimple 28938user.js");
        return;
    }
	   
    for (var hidx=0; hidx<pbpTable.rows.length; hidx++) {
        var htmlTableRowElement = pbpTable.rows[hidx];
        var className = htmlTableRowElement.className;
        if (className == null) {
            continue;
        }
        if (className.match("pbp_quarter") != null) {
            quarter++;
            if (quarter%2 == 1) timeouts = [3, 3];
        }
        else if (className.match("pbp_team") != null) {
            var coll = htmlTableRowElement.cells;
            var node = coll.item(0);
            var idx = 0;
            do {
                var s = node.innerHTML.slice(idx,node.innerHTML.length);
                var i = s.indexOf(" ");
                if (i != -1) idx += i + 1;
            }
            while (i != -1);
            team = node.innerHTML.slice(0,idx-1);

            var temp = timeouts[0];
            timeouts[0] = timeouts[1];
            timeouts[1] = temp;
        }
        else if (className.match("pbp_play_row") != null) {
            p = new Play();
            p.quarter = quarter;
            p.team = team;
            p.timeoutsRemaining = new Array();
            p.timeoutsRemaining[0] = timeouts[0];
            p.timeoutsRemaining[1] = timeouts[1];

            var coll = htmlTableRowElement.cells;
            for (var nidx=0; nidx<coll.length; nidx++) {
                var node = coll[nidx];
                var cName = node.className;
                if (cName.match("pbp_time_remaining") != null) {
                    p.timeRemaining = node.innerHTML;
                }
                else if (cName.match("pbp_marker") != null) {
                    p.marker = node.innerHTML;
                }
                else if (cName.match("pbp_down") != null) {
                    p.down = node.innerHTML.slice(0,1);
                    p.togo = node.innerHTML.slice(node.innerHTML.indexOf("amp; ")+5);
                }
                else if (cName.match("pbp_replay") != null) {
                    p.replay = node.firstChild;
                }
                else if (cName.match("pbp_play") != null) {
                    p.play = node.firstChild.data;
                    p.score = 0;
                    
                    var playText = p.play;
                    p.score = 0;
                    while (playText.indexOf("[") != -1) {
                        var startidx = playText.indexOf("[")+1;
                        playText = playText.substring(startidx);
                        var endidx = playText.indexOf("]");
                        if (endidx == -1) break;

                        var score = playText.substring(0, endidx);
                        if (score == "FG") {
                            p.score = 3;
                        }
                        else if (score == "TD") {
                            p.score = 6;
                            if (p.play.indexOf(", PAT made by ") != -1) {
                                p.score += 1;
                            }
                        }
                        else if (score == "SAFETY") {
                            p.score = 2;
                        }
                        else if (score.indexOf("deflected by ") != 0) p.score = 0;
                    //                        if (p.score != 0) console.log(p.score+" : "+p.play+" : "+playText);
                    }
                    if (p.play.indexOf("Offensive Timeout Called: ") == 0) {
                        var tm = p.play.slice("Offensive Timeout Called: ".length);
                        timeouts[0]--;
                    }
                    else if (p.play.indexOf("Defensive Timeout Called: ") == 0) {
                        var tm = p.play.slice("Defensive Timeout Called: ".length);
                        timeouts[1]--;
                    }
                    else if (p.play.indexOf(" calls timeout") != -1) {
                        var tm = p.play.slice(0,p.play.indexOf(" calls timeout"));
                        if (tm == p.team) {
                            timeouts[0]--;
                        }
                        else {
                            timeouts[1]--;
                        }
                    }
                }
            }
            plays.push(p);
        }
    }
    console.log(plays.length);
}
