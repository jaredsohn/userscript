// ==UserScript==
// @name           FD Buddy
// @namespace      http://www.google.com/
// @description    This does nothing
//
// @version 1.12
// @downloadurl    https://userscripts.org/scripts/source/136000.user.js
// @updateURL      https://userscripts.org/scripts/source/136000.meta.js 
//
// @include        http://www.baseballpress.com/lineups*
// @include        http://www.fandue*
// @include        https://www.fandue*
//
// 
// ==/UserScript==


var aliases = [
["Kendrys Morales","Kendry Morales"],
["Jerry Hairston", "Jerry Hairston Jr"],
["Michael Morse", "Mike Morse"],
["Howard Kendrick", "Howie Kendrick"],
["Tommy Milone", "Tom Milone"],
["Drew Hutchison", "Andrew Hutchison"],
["Robert Ross Jr.", "Robbie Ross"],
["Dan Straily", "Daniel Straily"]
];

var teamnicks =  new Array("Angels","Astros","Athletics","Blue Jays","Braves","Brewers",
"Cardinals","Cubs","Diamondbacks","Dodgers","Giants","Indians",
"Mariners","Marlins","Mets","Nationals","Orioles","Padres",
"Phillies","Pirates","Rangers","Rays","Red Sox","Reds",
"Rockies","Royals","Tigers","Twins","White Sox","Yankees");

var teamsshort =  new Array("LAA", "HOU", "OAK", "TOR", "ATL", "MIL",
"STL", "CHC", "ARI", "LOS", "SFG", "CLE",
"SEA", "MIA", "NYM", "WAS", "BAL", "SDP",
"PHI", "PIT", "TEX", "TAM", "BOS", "CIN",
"COL", "KAN", "DET", "MIN", "CWS", "NYY");


if (document.URL.match(/baseballpress.com\/lineups/)) {
    
    var allplayers = "";
    var playercount = 0;


    //get teams
    var teams = "";
    var ateams = new Array();
    var postedteams = "";
    var teamdivs = document.getElementsByClassName("team-name");
    for (var i = 0; i < teamdivs.length; i++) {
        teams = teams + teamdivs[i].innerHTML + ',';
        ateams[i] = teamdivs[i].innerHTML;
    }

    //get pitchers
    var allpitchers = "";
    var allphands = "";
    var pitcherdivs = document.getElementsByClassName("team-data");
    for (var i = 0; i < pitcherdivs.length; i++) {
        var pitcher = pitcherdivs[i].innerHTML;
        pitcher = pitcher.replace(/(\r\n|\n|\r)/gm, "");
        pitcher = pitcher.replace(/.*mlb/, '', 'gi');
        pitcher = pitcher.replace(/.*?\>/, '', 'gi');

        if (pitcher.match(/\(L\)/i)) {
            allphands = allphands + "L" + ',';
        }
        else if (pitcher.match(/\(R\)/i)) {
            allphands = allphands + "R" + ',';
        }
        else
            allphands = allphands + "?" + ',';


        pitcher = pitcher.replace(/div.*/, '', 'gi');
        pitcher = pitcher.replace(/\<\/a\>.*/, '', 'gi');

        allpitchers = allpitchers + pitcher + ',';
        
        GM_setValue("FDB_Pitchers", allpitchers);
        GM_setValue("FDB_PHands", allphands);
    }



    //get batters
    var lineupdivs = document.getElementsByClassName("team-lineup clearfix");
    var allplayers = "";
    var oppteams = "";
    var allbhands = "";

    for (var i = 0; i < lineupdivs.length; i++) {
        var gotteam = 0;
        var links = lineupdivs[i].getElementsByTagName("a");
        //no players listed

        if (links && links.length < 10)
            continue;

        var hand = "";
        var arr = lineupdivs[i].innerHTML.split("\<\/div\>");


       for (var j = 0; j < arr.length; j++) {
            if (arr[j].match(/\(S\)/))
                hand = "S";
            else if (arr[j].match(/\(L\)/))
                hand = "L";
            else if (arr[j].match(/\(R\)/))
                hand = "R";
            else
                hand = "?";

            arr[j] = arr[j].replace(/<\/a><div/, '', 'gi');
            arr[j] = arr[j].replace(/\<\/a\>.*/, '', 'gi');
            arr[j] = arr[j].replace(/.*\>/, '', 'gi');
             
            if (arr[j]) {
                if (i % 2 == 0) {
                    //oppteams = oppteams + ateams[i + 1] + ',';
                    oppteams = oppteams + (i + 1) + ',';
                }
                else {
                    //oppteams = oppteams + ateams[i - 1] + ',';
                    oppteams = oppteams + (i - 1) + ',';
                }
                allplayers = allplayers + arr[j] + ',';
                allbhands = allbhands + hand + ',';

                gotteam = 1;
            }

        }
        if (gotteam) {
            postedteams = postedteams + ateams[i] +',';

        }
    }

   
    GM_setValue("FDB_Players", allplayers);
    GM_setValue("FDB_Oppteams", oppteams);
    GM_setValue("FDB_Teams", ateams+',');
    GM_setValue("FDB_BHands", allbhands);
    GM_setValue("FDB_PostedTeams", postedteams);    


     var divs = teamdivs[1].getElementsByTagName("div");

    var weathers = "";
    var weatherdivs = document.getElementsByClassName("weather clearfix");


    for (var i = 0; i < weatherdivs.length; i++) {
        var indome = 0;
 
        if (weatherdivs[i].innerHTML.match(/dome/)){
            indome = 1;
        }
        var txt = weatherdivs[i].innerHTML.replace(/Gametime Forecast:/, '');
        txt = txt.replace(/(\r\n|\n|\r)/gm,"");
            txt = txt.replace(/PoP.*/, '');
        txt = txt.replace (/.*\>/,'');
        txt = trim(txt);
        if (indome == 1) 
            {txt = txt + ' - Dome';}
        weathers = weathers + txt + ',';
    }

    GM_setValue("FDB_Weathers", weathers);

    var ts = Math.round((new Date()).getTime() / 1000);
    GM_setValue("FDB_rostertime", ts);

}


var green_pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAALHRFWHRDcmVhdGlvbiBUaW1lAFdlZCAxMyBKdW4gMjAxMiAwMzo1NzoyMiAtMDUwMAdQSicAAAAHdElNRQfcBg0HOToZxRkEAAAACXBIWXMAAB7CAAAewgFu0HU+AAAABGdBTUEAALGPC/xhBQAAAB5JREFUeNpjYMALGIG4+5EeVrlSuUtM+HUPXWkCAAAffAMQ/QOWUAAAAABJRU5ErkJggg==";
var yellow_pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAALHRFWHRDcmVhdGlvbiBUaW1lAFdlZCAxMyBKdW4gMjAxMiAwMzo1NzoyMiAtMDUwMAdQSicAAAAHdElNRQfcBg0JOyWsZVt5AAAACXBIWXMAAB7CAAAewgFu0HU+AAAABGdBTUEAALGPC/xhBQAAAB5JREFUeNpjYMALGIH480dlrHK8/HeZ8OseutIEAAApnAMQ27pY/QAAAABJRU5ErkJggg==";
var red_pic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAALHRFWHRDcmVhdGlvbiBUaW1lAFdlZCAxMyBKdW4gMjAxMiAwMzo1NzoyMiAtMDUwMAdQSicAAAAHdElNRQfeBAcUGxbKejzhAAAACXBIWXMAAB7BAAAewQHDaVRTAAAABGdBTUEAALGPC/xhBQAAABlJREFUeNpjYMALGIH4P245Jvy6h640AQAAHb4BEEsc8CUAAAAASUVORK5CYII=";

function trim(s) {
    s = s.replace(/(^\s*)|(\s*$)/gi, "");
    s = s.replace(/[ ]{2,}/gi, " ");
    s = s.replace(/\n /, "\n");
    return s;
}



/*
if (document.URL.match(/fanduel/)) {
    setTimeout(function () { addlink() }, 1000);
}
function addlink() {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].innerHTML == "View") {           
            console.log(links[i].href);
        }
    }
}*/


if (document.URL.match(/fanduel/)) {
    //Add the floating div.

    floatingDiv = window.document.createElement('div');
    floatingDiv.setAttribute("class", "floatingdiv");
    floatingDiv.style.position = "fixed";
    floatingDiv.style.left = "10px";
    floatingDiv.style.bottom = "10px";
    floatingDiv.style.fontFamily = "Arial";
    document.getElementsByTagName("body")[0].appendChild(floatingDiv);

    floatingDiv.innerHTML = "<a target= 'lineups' style='background:#000000;color:#FFFFFF;font-weight:bold' href='http://baseballpress.com/lineup.php'>Update</a>";
    floatingDiv.value = GM_getValue("FDB_Players");

     if (document.URL.match(/export/))
        return;

    if (! (document.URL.match(/tableId/) || document.URL.match(/\/entry/) || document.URL.match(/view\?/)))
        return;


    setTimeout(function () { parsepage() }, 1000);
    setTimeout(function () { timerdelay() }, 2000);
   // parsepage();
    
}

function timerdelay() {
    setInterval(function () { myTimer() }, 1000);
}


function parsepage() {
    
    var ts = Math.round((new Date()).getTime() / 1000);
    GM_setValue("FDB_parsetime", ts);

    //clear old squares
    var imgs = document.getElementsByClassName("sqpic");
    var ilength = imgs.length;
    for (var i = ilength - 1; i >= 0; i--) {
        var clength = imgs[i].parentNode.childNodes.length;
        for (var j = clength - 1; j >= 0; j--) {

            if (imgs[i].parentNode.childNodes[j].className == "sqpic") {

                imgs[i].parentNode.removeChild(imgs[i].parentNode.childNodes[j]);
                break;
            }
        }
    }
    var imgs = document.getElementsByClassName("playerinfo");
    var ilength = imgs.length;
    for (var i = ilength - 1; i >= 0; i--) {
        var clength = imgs[i].parentNode.childNodes.length;
        for (var j = clength - 1; j >= 0; j--) {

            if (imgs[i].parentNode.childNodes[j].className == "playerinfo") {

                imgs[i].parentNode.removeChild(imgs[i].parentNode.childNodes[j]);
                break;
            }
        }
    }
    



    var plyrs = GM_getValue("FDB_Players");
    var players = "";
    if (plyrs)
        players = plyrs.split(",");

    var tms = GM_getValue("FDB_Teams");
    var ateams = "";
    if (tms)
        ateams = tms.split(",");


    var otms = GM_getValue("FDB_Oppteams");
    var oppteams = "";
    if (otms)
        oppteams = otms.split(",");

    var postedteams = GM_getValue("FDB_PostedTeams");

    var ptrs = GM_getValue("FDB_Pitchers");
    var pitchers = "";
    if (ptrs)
        pitchers = ptrs.split(",");

    var phnds = GM_getValue("FDB_PHands");
    var phands = "";
    if (phnds)
        phands = phnds.split(",");

    var bhnds = GM_getValue("FDB_BHands");
    var bhands = "";
    if (bhnds)
        bhands = bhnds.split(",");

    var wtrs = GM_getValue("FDB_Weathers");
    var weathers = "";
    if (wtrs)
        weathers = wtrs.split(",");

    var divs = document.getElementsByTagName("td");

    for (var i = 0; i < pitchers.length; i++) {
        for (var j = 0; j < aliases.length; j++) {
            if (pitchers[i] == aliases[j][0]) {
                pitchers[i] = aliases[j][1];
                break;
            }
        }
    }
    for (var i = 0; i < players.length; i++) {
        for (var j = 0; j < aliases.length; j++) {
            if (players[i] == aliases[j][0]) {
                players[i] = aliases[j][1];
                break;
            }
        }
    }

    var iimg = document.createElement("img");
    iimg.src = green_pic;
    iimg.width = 6;
    iimg.height = 6;
    //iimg.align = "left";
    iimg.setAttribute("class", "sqpic");

    var yiimg = document.createElement("img");
    yiimg.src = yellow_pic;
    yiimg.width = 6;
    yiimg.height = 6;
    //yiimg.align = "left";
    yiimg.setAttribute("class", "sqpic");

    var riimg = document.createElement("img");
    riimg.src = red_pic;
    riimg.width = 6;
    riimg.height = 6;
    //riimg.align = "left";
    riimg.setAttribute("class", "sqpic");


    //add info to left
    //go through clickable divs
    for (var i = 0; i < divs.length; i++) {
        var chk = divs[i].getAttribute("onclick");
        
        if (chk == "")
            continue;
        if (chk == "<")
            continue;
        if (!divs[i].innerHTML.match(/onclick/))
            continue;
        if (divs[i].innerHTML.match(/button/))
            continue;
        //get the team each listed player is on
        var team = divs[i].parentNode.innerHTML;
        team = team.replace(/(\r\n|\n|\r)/gm, "");
        team = team.replace(/\<\/b\>.*/, '', 'gi');
        team = team.replace(/.*\<b\>/, '', 'gi');

        var nick = getnick(team);

        var tnum = getteamnum(nick, ateams);

        //find opposing team #           
        var oppteam = -1;
        if (tnum % 2 == 0)
            oppteam = tnum + 1;
        else
            oppteam = tnum - 1;

        var game = Math.floor(oppteam / 2);

        var match = 0;
        var ispitcher = 0;
        

        //see if listed as pitcher on roster page
        for (var k = 0; k < pitchers.length; k++) {
            if (pitchers[k].length < 3) continue;
            var keyword = pitchers[k];
            var regex = new RegExp(keyword, 'gi');
            
            if (divs[i].innerHTML.match(regex)) {
                if (divs[i].innerHTML.match(/Chris Young/) && nick != "Mariners")
                    continue;

                ispitcher = 1;
                match = 1;
                break;
            }
        }

        //see if listed as batter on roster page
        if (match == 0) {
            for (var j = 0; j < players.length; j++) {
                if (players[j] < 3) { continue; }

                var keyword = players[j];
                var regex = new RegExp(keyword, 'gi');

                if (divs[i].innerHTML.match(regex)) {
                    if (divs[i].innerHTML.match(/Chris Young/) && nick != "Mets")
                        continue;

                    match = 1;
                    
                    break;
                }
            }
        }

        //decide what color square to use
        var regex = new RegExp(nick,'g');

        if (tms.match(regex) && tms.match(regex).length > 1) //doubleheader, give yellow square
                divs[i].appendChild(yiimg.cloneNode(yiimg));
        else if (match == 1) {          
                divs[i].appendChild(iimg.cloneNode(iimg));
        }
        else if (postedteams.match(regex)) { //roster is posted, player not on there
            divs[i].appendChild(riimg.cloneNode(riimg));
        }
        //else no square


        var txt = "";
        //if it's a batter print lineup position + handedness
        if (match == 1 && ispitcher == 0){
            txt = " " + (1 + j % 9) + " " + bhands[j];
        }

        //print opposing pitcher and weather
                      //nick
        if (tms.match(regex))  //team is playing
        {
            if (tnum > -1 && oppteam > -1 && game > -1) {
                txt = txt + " v " + phands[oppteam] + " " + pitchers[oppteam] + " " + weathers[game];
            }
        }
        
        var t = document.createTextNode(txt);
        var span = document.createElement('span');
        span.setAttribute("class", "playerinfo");
        span.style.fontSize = "8px";
        span.style.color = "black";
        span.appendChild(t);
        divs[i].appendChild(span);

        if (tms.match(regex) && tms.match(regex).length > 1){
            var t = document.createTextNode("Doubleheader. Info may be inaccurate.");
            var span = document.createElement('div');
            span.setAttribute("class", "playerinfo");
            span.style.fontSize = "8px";
            span.style.color = "black";
            span.appendChild(t);
            divs[i].appendChild(span);
        }
    }


    //add info to right
    //go through clickable divs
    var divs = document.getElementsByClassName("player");

    for (var i = 0; i < divs.length; i++) {
        if (divs[i].innerHTML.length < 5)
            continue;
        if (divs[i].innerHTML.match(/username/))
            continue;            
        //get the team each listed player is on
        var team = divs[i].parentNode.innerHTML;

        team = team.replace(/(\r\n|\n|\r)/gm, "");
        team = team.replace(/\<\/strong\>.*/, '', 'gi');
        team = team.replace(/.*\<strong\>/, '', 'gi');
        
        team = team.replace(/\<\/b\>.*/, '', 'gi');
        team = team.replace(/.*\<b\>/, '', 'gi');


        var nick = getnick(team);

        var tnum = getteamnum(nick, ateams);

        //find opposing team #           
        var oppteam = -1;
        if (tnum % 2 == 0)
            oppteam = tnum + 1;
        else
            oppteam = tnum - 1;

        var game = Math.floor(oppteam / 2);

        var match = 0;
        var ispitcher = 0;


        
        //see if listed as pitcher on roster page
        for (var k = 0; k < pitchers.length; k++) {
            if (pitchers[k].length < 3) continue;
            var keyword = pitchers[k];
            var regex = new RegExp(keyword, 'gi');

            if (divs[i].innerHTML.match(regex)) {
                if (divs[i].innerHTML.match(/Chris Young/) && nick != "Mariners")
                    continue;
                ispitcher = 1;
                match = 1;
                break;
            }
        }

        //see if listed as batter on roster page
        if (match == 0) {
            for (var j = 0; j < players.length; j++) {
                if (players[j] < 3) { continue; }

                var keyword = players[j];
                var regex = new RegExp(keyword, 'gi');

                if (divs[i].innerHTML.match(regex)) {
                   if (divs[i].innerHTML.match(/Chris Young/) && nick != "Mets")
                        continue;
                    match = 1;

                    break;
                }
            }
        }

        //decide what color square to use
        var regex = new RegExp(nick,'g');
        if (tms.match(regex) && tms.match(regex).length > 1) //doubleheader, give yellow square
                divs[i].appendChild(yiimg.cloneNode(yiimg));
        else if (match == 1) 
                divs[i].appendChild(iimg.cloneNode(iimg));
        else if (postedteams.match(regex))  //roster is posted, player not on there
                divs[i].appendChild(riimg.cloneNode(riimg));


        var txt = "";
        //if it's a batter print lineup position + handedness
        if (match == 1 && ispitcher == 0) {
            txt = " " + (1 + j % 9) + " " + bhands[j];
        }

        //print opposing pitcher and weather
        if (tnum > -1) {
            txt = txt + " v " + phands[oppteam] + " " + pitchers[oppteam] + " " + weathers[game];
        }

        var t = document.createTextNode(txt);

        if (document.URL.match(/\/entry/))
            var span = document.createElement('span');
        else
            var span = document.createElement('div');
        span.setAttribute("class", "playerinfo");
        span.style.fontSize = "8px";
        span.style.color = "black";
        span.appendChild(t);
        divs[i].appendChild(span);

        if (tms.match(regex) && tms.match(regex).length > 1){
            var t = document.createTextNode("Doubleheader. Info may be inaccurate.");
            var span = document.createElement('div');
            span.setAttribute("class", "playerinfo");
            span.style.fontSize = "8px";
            span.style.color = "black";
            span.appendChild(t);
            divs[i].appendChild(span);
        }
    } 



    var divs = document.getElementsByClassName("floatingdiv");
    if (divs != null)
        divs[0].value = GM_getValue("FDB_Players") + GM_getValue("FDB_Pitchers");
}


function myTimer() {

    if (GM_getValue("FDB_parsetime") < GM_getValue("FDB_rostertime"))
    {
        var divs = document.getElementsByClassName("floatingdiv");
        if (divs == null)
            return;

        if (!(divs[0].value == GM_getValue("FDB_Players") + GM_getValue("FDB_Pitchers"))) {
            parsepage();
        }
    }

}

function log(msg) {
    setTimeout(function () {
        throw new Error(msg);
    }, 0);
}

function getnick(team) {

    for (var i = 0; i < 32; i++) {
        if (teamsshort[i] == team)
            return teamnicks[i];
    }
    return "";
}

function getteamnum(team, tms) {
    if (team == "")
        return -1;
    for (var i = 0; i < tms.length; i++) {
        if (team == tms[i])
            return i;
    }
    return -1;

}