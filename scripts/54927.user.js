// ==UserScript==
// @name           AI Testing On Replay
// @namespace      pbr/aitor
// @description    Offensive & Defensive AI Buttons On GLB Replay
// @include        http://*goallineblitz.com/game/home.pl
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://glb.warriorgeneral.com/game/home.pl
// @include        http://glb.warriorgeneral.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        14.01.02
// @require        http://userscripts.org/scripts/source/54630.user.js
// @require        http://userscripts.org/scripts/source/28938.user.js
// @require        http://userscripts.org/scripts/source/31573.user.js
// ==/UserScript==

var scriptName = "AI Testing";
var scriptVersion = "14.01.02";
var scriptWebpage = "http://userscripts.org/scripts/show/54927";
/*
 *
 * pabst did this 09/08/01+
 *
 *
 */

window.setTimeout( function() {
	console.log("AI start: "+GM_getValue("gmlist"));
	if ((window.location+"").indexOf("home.pl") != -1) {
        atHome();
    }
    else {
        pageMod();

        init(true);
    }
}, 100);

function atHome() {
    GM_setValue("gmlist","");
	var gmlist = "";

	for (var i=0; i<document.links.length; i++) {
		if (document.links[i].href.match("team_tactics.pl") != null) {
			var id = document.links[i].href.toString();
		 	id = id.slice(id.indexOf("=")+1);

			var str = document.body.innerHTML.split('game/team.pl?team_id='+id+'"')[1].split("</a>")[0];
			if (str.match('class="team_name"') != null) str = str.split(">")[1];
			else str = str.slice(1);
		 	gmlist += GM_getValue("gmlist")+id+":"+str+"\t";
		}
	}

    if (gmlist.length > 0) gmlist = gmlist.slice(0,gmlist.length-1);
    GM_setValue("gmlist",gmlist);
	console.log("gmlist="+gmlist);
}

function pageMod() {
    var div = document.createElement("div");
    div.setAttribute("id","dai_container");
    div.style.width = "480px";
    div.style.visiblity = "hidden";
    div.style.display = "none";

    var el = document.getElementById("footer");
    el.parentNode.insertBefore(div, el);

    var oaitest = document.createElement("input");
    oaitest.setAttribute("type","button");
    oaitest.setAttribute("id","oai_button");
    oaitest.setAttribute("value","Test OAI");
	oaitest.disabled = false;
    oaitest.addEventListener("click",testOAI,true);
	oaitest.disabled = true;
    div.appendChild(oaitest);

    var select = document.createElement("select");
    select.setAttribute("id","oai_team_select");
    div.appendChild(select);
	select.addEventListener("change", clearOAI, false);

    var tms = ["0:Mine"].concat(GM_getValue("gmlist","").split("\t"));
    if (tms[0].length > 0) {
        for (var i=0; i<tms.length; i++) {
            var opt = document.createElement('option');
            opt.text = tms[i].split(":")[1];
            opt.value = tms[i].split(":")[0];
            select.add(opt,null);
        }
        div.style.visibility = "visible";
        div.style.display = "block";
    }

    var load = document.createElement("input");
    load.setAttribute("type","button");
    load.setAttribute("value","Load OAI");
    load.addEventListener("click",oaiPageLoad,true);
    div.appendChild(load);

    var select2 = document.createElement("select");
    select2.setAttribute("id","oai_select");
    div.appendChild(select2);

	var br = document.createElement("br");
	div.appendChild(br);

    var daitest = document.createElement("input");
    daitest.setAttribute("type","button");
    daitest.setAttribute("id","dai_button");
    daitest.setAttribute("value","Test DAI");
    daitest.addEventListener("click",testDAI,true);
	daitest.disabled = true;
    div.appendChild(daitest);

    var select = document.createElement("select");
    select.setAttribute("id","dai_team_select");
    div.appendChild(select);
	select.addEventListener("change", clearDAI, false);

    var tms = ["0:Mine"].concat(GM_getValue("gmlist","").split("\t"));
    if (tms[0].length > 0) {
        for (var i=0; i<tms.length; i++) {
            var opt = document.createElement('option');
            opt.text = tms[i].split(":")[1];
            opt.value = tms[i].split(":")[0];
            select.add(opt,null);
        }
        div.style.visibility = "visible";
        div.style.display = "block";
    }

    var load = document.createElement("input");
    load.setAttribute("type","button");
    load.setAttribute("value","Load DAI");
    load.addEventListener("click",daiPageLoad,true);
    div.appendChild(load);

    var select2 = document.createElement("select");
    select2.setAttribute("id","dai_select");
    div.appendChild(select2);

	var pos = ["HB","FB","QB","TE"];
	var tags = ["Untagged","Speedy","Combo","Power","Rusher","Passer","Receiver","Blocker",
				"Custom Tag 1","Custom Tag 2","Custom Tag 3"];
	var flags = ["none","speedy","combo","power","rusher","passer","receiver","blocker","custom1","custom2","custom3"];

	for (var p=0; p<pos.length; p++) {
		if (p%2 == 0) {
			var br = document.createElement("br");
			div.appendChild(br);
		}

		var select = document.createElement("select");
		select.setAttribute("id",pos[p]+"_tag_select");
		select.setAttribute("class","tag_select");
		select.disabled = true;

		for (var t=0; t<tags.length; t++) {
		    var opt = document.createElement('option');
		    opt.text = pos[p]+" "+tags[t];
		    opt.value = flags[t];
		    select.add(opt,null);
		}

		div.appendChild(select);
	}
}

function clearOAI() {
	clearAI("oai");
}
function clearDAI() {
	clearAI("dai");
	for (var i=0; i<document.getElementsByClassName("tag_select").length; i++) {
		document.getElementsByClassName("tag_select")[i].disabled = true;
	}
}
function clearAI(str) {
	var select = document.getElementById(str+"_select");
	while (select.options.length > 0) {
		select.remove(0);
	}

	document.getElementById(str+"_button").disabled = true;
	for (var i=0; i<document.getElementsByClassName("tab_select").length; i++) {
		document.getElementsByClassName("tab_select")[i].disabled = true;
	}
}

function oaiPageLoad() {
	var teamId = document.getElementById("oai_team_select").value;
	if (teamId == null) return;

	var address = "/game/team_ai.pl?team_id="+teamId;
	address += "&ai_type=team";
	getInetPage(address, loadOAI, null);
}

function loadOAI(address, page) {
	clearOAI();

	var select = document.getElementById("oai_select");
	var aiList = page.responseText.split("team_offense_ai.pl?team_id=");
	for (var i=1; i<aiList.length; i++) {
		var str = aiList[i].split("\">")[1].split("</a>")[0]; 
		var id = aiList[i].split("=")[1].split("\"")[0];

		var opt = document.createElement("option");		
	    opt.text = str;
	    opt.value = id;
	    select.add(opt,null);
	}

	if (select.options.length > 0) document.getElementById("oai_button").disabled = false;
}

function daiPageLoad() {
	var teamId = document.getElementById("dai_team_select").value;
	if (teamId == null) return;

	var address = "/game/team_ai.pl?team_id="+teamId;
	address += "&ai_type=team";
	getInetPage(address, loadDAI, null);
}

function loadDAI(address, page) {
	clearDAI();

	var select = document.getElementById("dai_select");
	var aiList = page.responseText.split("team_defense_ai.pl?team_id=");
	for (var i=1; i<aiList.length; i++) {
		var str = aiList[i].split("\">")[1].split("</a>")[0]; 
		var id = aiList[i].split("=")[1].split("\"")[0];

		var opt = document.createElement("option");		
	    opt.text = str;
	    opt.value = id;
	    select.add(opt,null);
	}

	if (select.options.length > 0) {
		document.getElementById("dai_button").disabled = false;
		for (var i=0; i<document.getElementsByClassName("tag_select").length; i++) {
			document.getElementsByClassName("tag_select")[i].disabled = false;
		}
	}
}

function activate(e) {
    console.log("activate AI testing");
    lock();

    run();
}

function run() {
   var pbp = document.getElementById("pbp");
   if (pbp == null) {
       setTimeout(run, 300);
   }
   else if (pbp.childNodes.length == 0) {
       setTimeout(run, 300);
   }
   else {
       var page = new Object();
       page.responseText = pbp.innerHTML;

       loadPBPSimple(page);

       unlock();
   }
}

function testDAI() {
    var oteam = document.getElementsByClassName("secondary_container")[0].childNodes[0].innerHTML.split("&nbsp;")[0];
    var dteam = document.getElementsByClassName("secondary_container")[1].childNodes[0].innerHTML.split("&nbsp;")[0];

    var timeytg = document.getElementById("time_ytg");
    var t = timeytg.innerHTML.split(" ")[0];
    var dn = timeytg.innerHTML.split(" ")[1].slice(0,1);
    var ds = timeytg.innerHTML.split(" ")[3];
    var loc = timeytg.innerHTML.split(" on ")[1];

    var score = new Array();
    score[oteam] = 0;
    score[dteam] = 0;

    try {
        var play = plays[0];
        for (var i=0; i<plays.length; i++) {
//	        console.log(t+" -- "+dn+" -- "+ds+" -- "+loc);
//	        console.log(plays[i].timeRemaining+" | "+plays[i].down+" | "+plays[i].togo+" | "+plays[i].marker);
            if (plays[i].timeRemaining == t) {
                if (plays[i].down == dn) {
                    if (plays[i].togo == ds) {
                        if (plays[i].marker == loc) {
                            play = plays[i];
                            break;
                        }
                    }
                }
            }
            score[plays[i].team] += plays[i].score;
        }
    } 
	catch (e) {
        var dai = document.getElementById("dai");
        if (dai == null) {
            var cont = document.getElementById("dai_container");
            dai = document.createElement("div");
            dai.setAttribute("id","dai");
            dai.style.textAlign = "left";
            dai.innerHTML = "Script not completely loaded yet, try again in a second.";
            cont.appendChild(dai);
        }
        return;
    }

    var oscore = score[oteam];
    var dscore = score[dteam];
    if (oscore == "-") oscore = 0;
    if (dscore == "-") dscore = 0;
    var score = Math.abs(dscore - oscore);
    var score_neg_pos = (dscore - oscore) / (score || 1);

    var qtr = play.quarter;
    var secs = play.timeRemaining.split(":");
    secs = parseInt(secs[0])*60+parseInt(secs[1]);
    var spotWho = play.marker.split(" ")[0];
    if (spotWho.toLowerCase() == "opp") {
        spotWho = "own";
    }
    else {
        spotWho = "their";
    }
    var spot = play.marker.split(" ")[1];
    var down = play.down;
    var togo = play.togo;
    play.formation = getFormation();
    formation = play.formation;

    var receivers = 2;
    if (formation == "Shotgun+5WR") {
        formation = "Shotgun";
        receivers = 5;
    }
    else if (formation == "Shotgun") {
        receivers = 3;
    }
    else if (formation.indexOf("Singleback+Spread") != -1) {
        receivers = 4;
    }
    else if (formation.indexOf("Singleback+Big") != -1) {
        receivers = 2;
    }
    else if (formation.indexOf("Singleback") != -1) {
        receivers = 3;
    }
    else if (formation == "I+Big") {
        receivers = 1;
    }
    else if (formation == "I") {
        receivers = 2;
    }
    else if (formation == "Goal+Line") {
        receivers = 0;
    }

    var mytime = play.timeoutsRemaining[1];
    var opptime = play.timeoutsRemaining[0];
    var teamid = document.getElementById("dai_team_select").value;
	var daiId = document.getElementById("dai_select").value;
    var action = "Test";
    var post = "quarter="+qtr;
    post += "&time_remaining="+secs;
    post += "&spot_who="+spotWho;
    post += "&spot="+spot;
    post += "&down="+down;
    post += "&to_go="+togo;
    post += "&score_neg_pos="+score_neg_pos;
    post += "&score="+score;
    post += "&formation="+formation;
    post += "&receivers="+receivers;
    post += "&my_timeouts="+mytime;
    post += "&opponent_timeouts="+opptime;
    post += "&team_id="+teamid;
	post += "&id="+daiId;

	var pos = ["HB","FB","QB","TE"];
	for (var i=0; i<pos.length; i++) {
		var value = document.getElementById(pos[i]+"_tag_select").value;
		if (value != "none") {
			post += "&"+pos[i].toLowerCase()+"_flag="+value;
		}
	}

    post += "&action="+action;
    console.log("("+post.length+") "+post);

    var dai = document.getElementById("dai");
    if (dai == null) {
        var cont = document.getElementById("dai_container");
        dai = document.createElement("div");
        dai.setAttribute("id","dai");
        dai.style.textAlign = "left";
        cont.appendChild(dai);
    }

    var address = "/game/team_defense_ai_test.pl";
    var http = new XMLHttpRequest();
    http.open("POST",address,true);

    http.setRequestHeader('User-agent', 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008052912 Firefox/3.0 Greasemonkey');
    http.setRequestHeader('Accept', 'text/html');
    http.setRequestHeader('Host', 'goallineblitz.com');
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Content-length', post.length);
    http.setRequestHeader('Connection', 'close');

    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) {
                alert("pbr gm script: Error "+page.status+" loading "+address);
            }
            else {
                var text = this.responseText;
                var idx = text.indexOf('<div class="medium_head">Matching Input</div>');
                text = text.slice(idx);
                idx = text.indexOf('</div></div>');
                text = text.slice(0,idx+'</div></div>'.length);
				text = "<div>Warning: automatic tagging & running clocks not implemented.<br>"+
                               "I have no idea why 'Singleback' is now called 'Singleback Left'.</div>"+text;

                dai.innerHTML = "<br><b>Formation:</b> "+formation.replace("+"," ")+" ("+receivers+")<br>"+text;
            }
	   	}
    }
    http.send(post);
}

function testOAI() {
    var oteam = document.getElementsByClassName("secondary_container")[0].childNodes[0].innerHTML.split("&nbsp;")[0];
    var dteam = document.getElementsByClassName("secondary_container")[1].childNodes[0].innerHTML.split("&nbsp;")[0];

    var timeytg = document.getElementById("time_ytg");
    var t = timeytg.innerHTML.split(" ")[0];
    var dn = timeytg.innerHTML.split(" ")[1].slice(0,1);
    var ds = timeytg.innerHTML.split(" ")[3];
    var loc = timeytg.innerHTML.split(" on ")[1];

    var score = new Array();
    score[oteam] = 0;
    score[dteam] = 0;

    try {
        var play = plays[0];
        for (var i=0; i<plays.length; i++) {
//	        console.log(t+" -- "+dn+" -- "+ds+" -- "+loc);
//	        console.log(plays[i].timeRemaining+" | "+plays[i].down+" | "+plays[i].togo+" | "+plays[i].marker);
            if (plays[i].timeRemaining == t) {
                if (plays[i].down == dn) {
                    if (plays[i].togo == ds) {
                        if (plays[i].marker == loc) {
                            play = plays[i];
                            break;
                        }
                    }
                }
            }
            score[plays[i].team] += plays[i].score;
        }
    } catch (e) {
        var dai = document.getElementById("dai");
        if (dai == null) {
            var cont = document.getElementById("dai_container");
            dai = document.createElement("div");
            dai.setAttribute("id","dai");
            dai.style.textAlign = "left";
            dai.innerHTML = "Script not completely loaded yet, try again in a second.";
            cont.appendChild(dai);
        }
        return;
    }

    var oscore = score[oteam];
    var dscore = score[dteam];
    if (oscore == "-") oscore = 0;
    if (dscore == "-") dscore = 0;

    var score = Math.abs(oscore - dscore);
    var score_neg_pos = (oscore - dscore) / (score || 1);

    var qtr = play.quarter;
    var secs = play.timeRemaining.split(":");
    secs = parseInt(secs[0])*60+parseInt(secs[1]);

    var spotWho = play.marker.split(" ")[0];
    if (spotWho.toLowerCase() == "opp") {
        spotWho = "their";
    }
    else {
        spotWho = "own";
    }
    var spot = play.marker.split(" ")[1];
    var down = play.down;
    var togo = play.togo;

    var mytime = play.timeoutsRemaining[0];
    var opptime = play.timeoutsRemaining[1];
    var teamid = document.getElementById("oai_team_select").value;
	var oaiId = document.getElementById("oai_select").value;
    var action = "Test";
    var post = "quarter="+qtr;
    post += "&time_remaining="+secs;
    post += "&spot_who="+spotWho;
    post += "&spot="+spot;
    post += "&down="+down;
    post += "&to_go="+togo;
    post += "&score_neg_pos="+score_neg_pos;
    post += "&score="+score;
    post += "&my_timeouts="+mytime;
    post += "&opponent_timeouts="+opptime;
    post += "&team_id="+teamid;
	post += "&id="+oaiId;
    post += "&action="+action;
    console.log(post);

    var address = "/game/team_ai_test.pl";
    var http = new XMLHttpRequest();
    http.open("POST",address,true);

    http.setRequestHeader('User-agent', 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008052912 Firefox/3.0 Greasemonkey');
    http.setRequestHeader('Accept', 'text/html');
    if (window.location.toString().indexOf("goallineblitz") != -1) {
        http.setRequestHeader('Host', 'goallineblitz.com');
    }
    else {
        http.setRequestHeader('Host', 'glb.warriorgeneral.com');
    }
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Content-length', post.length);
    http.setRequestHeader('Connection', 'close');

    http.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) {
                    alert("pbr gm script: Error "+page.status+" loading "+address);
            }
            else {
                var text = this.responseText;
                var idx = text.indexOf('<div class="medium_head">Matching Input</div>');
                text = text.slice(idx);
                idx = text.indexOf('<div style="clear');
                text = text.slice(0,idx);

                var dai = document.getElementById("dai");
                if (dai == null) {
                    var cont = document.getElementById("dai_container");
                    dai = document.createElement("div");
                    dai.setAttribute("id","dai");
                    dai.style.textAlign = "left";
                    cont.appendChild(dai);
                }
		    text = "<div>Warning: tagging & running clocks not implemented.<br>"+
			     "I have no idea why 'Singleback' is now called 'Singleback Left'.</div>"+text;
                dai.innerHTML = text;
            }
        }
    }
    http.send(post);
}

function getPlayer(pos) {
    var output = new Array();
    var images = document.getElementById("offense_container").getElementsByTagName("img");
    for (var i=0; i<images.length; i++) {
        var str = images[i].src;
        if (str.indexOf("/"+pos+".gif") != -1) {
            while(str.indexOf("/") != -1) {
                str = str.slice(str.indexOf("/")+1);
            }
            var id = images[i].parentNode.id.split("_")[2];
            for (var z=0; z<unsafeWindow.play_data[0].length; z++) {
                var p = unsafeWindow.play_data[0][z];
                if (p.id == id) {
                    output.push(p);
                }
            }
        }
    }
    return output;
}

function premodTest() {
	var xdiff = 115;
    var play_data = unsafeWindow.play_data;
	var minx = play_data[0][0].x;
	var maxx = play_data[0][0].x;
    for (var i = 1; i < unsafeWindow.play_data[0].length; i++) {
		minx = Math.min(minx, play_data[0][i].x);
		maxx = Math.max(maxx, play_data[0][i].x);
	}
	console.log("premodTest(): "+minx+" --> "+maxx+" : "+((maxx - minx)>xdiff));
	if ((maxx-minx) > xdiff) return true;
	return false;
}

function getFormation() {
    var offense = ["QB","HB","FB","TE","LOT","ROT","LG","RG","C","WR1","WR2","WR3","WR4","WR5","K","P"];
    var players = new Array();

    for (var i=0; i<offense.length; i++) {
        var p = getPlayer(offense[i]);
        if (p != null) {
            players[offense[i]] = p;
        }
    }

	var shotgunDist = 8;
	if (premodTest() == true) shotgunDist = shotgunDist*3;
console.log(premodTest()+": sgdist="+(diff(players["QB"][0].y, players["C"][0].y)));

    var formation = "Unknown";
    try {
        if (players["K"].length != 0) {
            formation = "Kickoff";
        }
        else if (players["P"].length != 0) {
            formation = "Punt";
        }
        else if (players["FB"].length == 2) {
            formation = "Spike";
        }
        else if (players["WR5"].length != 0) {
            formation = "Shotgun+5WR";
        }
        else if (players["WR4"].length != 0) {
            formation = "Singleback+Spread";
        }
        else if (players["TE"].length == 3) {
            formation = "Goal+Line";
        }
        else if (diff(players["QB"][0].y, players["C"][0].y) > shotgunDist) {
			console.log("sgdist="+(diff(players["QB"][0].y, players["C"][0].y)));
            formation = "Shotgun";
        }
        else if ((diff(players["QB"][0].y, players["HB"][0].y) > shotgunDist) &&
                 (players["FB"].length == 0)) {
            if (players["TE"].length == 1) {
				var cnt = 0;
				for (var r=0; r<3; r++) {
					if (players["WR"+(r+1)][0].x < players["QB"][0].x) cnt++;
					else cnt--;
				}
				if (Math.abs(cnt) == 3) formation = "Singleback+Trips";
				else formation = "Singleback+Left";
            }
            else {
                formation = "Singleback+Big";
            }
        }
        else if (diff(players["HB"][0].y, players["FB"][0].y) < 3) {
            formation = "Splitbacks+Pro";
        }
        else if (diff(players["HB"][0].x, players["FB"][0].x) < 3) {
            if (players["TE"].length == 2) {
                formation = "I+Big";
            }
            else {
                formation = "I";
            }
        }
        else if ((diff(players["QB"][0].y, players["HB"][0].y) > 8) &&
                 (diff(players["WR1"][0].x, players["HB"][0].x) > diff(players["WR1"][0].x, players["FB"][0].x))) {
            formation = "I+Weak";
        }
        else if ((diff(players["QB"][0].y, players["HB"][0].y) > 8) &&
                 (diff(players["WR1"][0].x, players["HB"][0].x) < diff(players["WR1"][0].x, players["FB"][0].x))) {
            formation = "I+Strong";
        }
    }
    catch (e) {
        console.log("AI Testing: "+e);
    }
    console.log("Formation = "+formation);

    return formation;
}


function diff(x, y) {
    var a = parseFloat(x);
    var b = parseFloat(y);
    return Math.max(a,b) - Math.min(a,b);
}
