// ==UserScript==
// @name           DLeague Challenge Season 28
// @namespace      GLB_Chris465
// @description    Collect the stats for the DLeague Challenge, Season 28, HB.
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==
//

// Only variable to be modified.
//var playerList = [2546008,2545279];
var playerList = [4273182,4265066,4271179,4275312,4266644,4275678,4275845,4275937,4264464,4277146,4270372,4277663,4278059,4278100,4277904,4265732,4278779,4265581 ,4275398 ,4271798 ,4263975 ,4261027 ,4277697 ,4278734,4278795,4257185];
var season = 28;
//
// End

// Variables for script
var gamelinks = [];
var outButton = null;
var netTime = null;
var showEverything = true;

var playerLinks = [ ];
var stats = new Array();
var players = new Array();
var teamPageName = null;
var week = null;

//var statTypes = ["Passing", "Rushing", "Receiving", "Kicking", "Punting", "Kick/Punt Return", "Special Teams", "Offensive Line", "Defense"];
var statTypes = ["Rushing","Receiving"];

var getStats = new Array();
//getStats["Passing"] = getPassing;
//getStats["Kicking"] = getKicking;
//getStats["Punting"] = getPunting;
//getStats["Special Teams"] = getSpecialTeams;
getStats["Rushing"] = getRushing;
getStats["Receiving"] = getReceiving;
//getStats["Offensive Line"] = getOffensiveLine;
//getStats["Kick/Punt Return"] = getReturns;
//getStats["Defense"] = getDefense;


var headings = [];
headings["Rushing"] = ["Yds","TD","BrTk","TFL","Fum"];
headings["Receiving"] = ["Yds","TD","Drop","Fum"];

//headings["Offensive Line"] = ["Pancakes","SackAlw"];
//headings["Kick/Punt Return"] = ["KR","KYds","KAvg","KTD","PR","PYds","PAvg","PTD"];
//headings["Defense"] = ["Tk","MsTk","TFL","Hry","Sack","FFum","FumR","Int","DefTD","PD","KL","Pnkd","RevPnk"];

//headings["Passing"] = ["Plays","Comp","Att","Yds","Pct","Y/A","Hurry","Sack","SackYd","BadTh","Drop","Int","TD","Rating"];
//headings["Rushing"] = ["Plays","Rush","Yds","Avg","TD","BrTk","TFL","Fum","FumL"];
//headings["Receiving"] = ["Plays","Targ","Rec","Yds","Avg","YAC","TD","Drop","TargRZ","Targ3d","Fum","FumL"];
//headings["Kicking"] = ["FGM","FGA","0-19","20-29","30-39","40-49","50+","XPM","XPA","Points","KO","TB","Yds","Avg"];
//headings["Punting"] = ["Punts","Yds","Avg","TB","CofCrn","Inside5","Inside10","Inside20"];
//headings["Kick/Punt Return"] = ["KR","KYds","KAvg","KTD","PR","PYds","PAvg","PTD"];
//headings["Offensive Line"] = ["Plays","Pancakes","RevPnkd","HryAlw","SackAlw"];
//headings["Defense"] = ["Ply","Tk","MsTk","Sack","Hry","TFL","FFum","FumR","PD","Int","DefTD","Pnkd","RevPnk"];
//headings["Special Teams"] = ["Plays","Tk","MsTk","FFum","FRec","FumRTD","Pnkd","BrTk","Fum","FumL"];
//headings["Defense"] = ["Ply","Tk","MsTk","Sack","SYds","Hry","TFL","FFum","FumR","Targ","RecAlw","KL","PD","Int","IYds","DefTD","Pnkd","RevPnk"];


var sortable = [];
//sortable["Passing"] = 4;
sortable["Rushing"] = 3;
sortable["Receiving"] = 4;
//sortable["Kicking"] = 10;
//sortable["Punting"] = 2;
//sortable["Kick/Punt Return"] = 2;
//sortable["Special Teams"] = 2;
//sortable["Offensive Line"] = 2;
//sortable["Defense"] = 2;

var points = [];
//points["Defense"] = [1,-2,1,1,3,6,1,6,10,2,2,-0.1,.1];

points["Rushing"] = ["0.1","6","1","0","-10"];
points["Receiving"] = ["0.1","6","-1","0"];
//points["Defense"] = ["1","-2","1","1","3","6","1","6","10","2","2","-0.1",".1"];
//safety = 4

var agents = [];
 agents["4273182"]="rlawrence";
 agents["4265066"]="chrome";
 agents["4271179"]="vladykins";
 agents["4275312"]="Chris465 DTD";
 agents["4266644"]="cheesepillow";
 agents["4275678"]="lexden11";
 agents["4275845"]="chivas";
 agents["4275937"]="Baustin";
 agents["4264464"]="an_old_dude";
 agents["4277146"]="JackBeQuick";
 agents["4270372"]="Jay Gold";
 agents["4277663"]="TravisRaiders";
 agents["4278059"]="blitzboy";
 agents["4278100"]="Ahrens858";
 agents["4277904"]="AWolf02";
 agents["4265732"]="ZoSo1";
agents["4278779"]="Jayadamo";	
agents["4265581"]="Joe Webb14"; 	
agents["4275398"]="wil75";	
agents["4271798"]="o The Boss x";	
agents["4263975"]="Dr. Brawler";	
agents["4261027"]="Robbnva"; 	
agents["4277697"]="Jaxon Voom";	
agents["4278734"]="ig";
agents["4257185"]="Dave Mr Majors";	
agents["4278795"]="Barlol";

//Called on load - boxSetup loads the button to execute.
window.setTimeout(function() {
	//week = promptForWeek();
	boxSetup();
}, 1000);

function promptForWeek() {
	var h = -1;
    // keep trying until they hit cancel or get in range
    while (h!=null && (h >= 1 || h <= 16)) {
        h = prompt("Enter the week to lookup. (1 to 16)");
        h = parseInt(h);
        //console.log(h);
    }
    return h;
}




//Used to output arrays to the browser.
function print_r(theObj){
  if(theObj.constructor == Array ||
     theObj.constructor == Object){
    document.write("<ul>")
    for(var p in theObj){
      if(theObj[p].constructor == Array||
         theObj[p].constructor == Object){
document.write("<li>["+p+"] => "+typeof(theObj)+"</li>");
        document.write("<ul>")
        print_r(theObj[p]);
        document.write("</ul>")
      } else {
document.write("<li>["+p+"] => "+theObj[p]+"</li>");
      }
    }
    document.write("</ul>")
  }
}

//Need to extract the list of games from the GAME Log, provided the list of players, above.
// table id="career_stats"
// parse table until week = 1 <tr> first <td>.
// 4th <td> = game link: <a href="/game/game.pl?game_id=1626500">W0-245</a>

function boxSetup() {
//console.log("boxSetup");

    var scheduleContent = document.getElementsByClassName("schedule_content");
	var cboxes = document.getElementsByClassName("GScheckbox");
    if ((scheduleContent.length > 0) && (cboxes.length == 0)) {
        for (var scidx=0; scidx<scheduleContent.length; scidx++) {
            var schedules = scheduleContent[scidx];
            var rows = schedules.rows;
            rows[0].cells[1].innerHTML = "[GS] "+rows[0].cells[1].innerHTML;
            for (var i=1; i<rows.length; i++) {
                var link = rows[i].cells[2].firstChild.href;

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
		//console.log("not adding boxes");
	}

    var div = document.createElement("div");
	div.style.clear = "both";

    var button = document.createElement("input");
    button.setAttribute("value","Collect");
    button.setAttribute("type","button");
    button.setAttribute("id","bsbutton");
    button.addEventListener("click",getData,false);
    div.appendChild(button);
/*
    var button = document.createElement("input");
    button.setAttribute("value","Collect Marked Box Scores");
    button.setAttribute("type","button");
    button.setAttribute("id","bsbutton");
    button.addEventListener("click",getData,false);
    div.appendChild(button);

    var button = document.createElement("input");
    button.setAttribute("value","Collect Scripted Box Scores");
    button.setAttribute("type","button");
    button.setAttribute("id","bsencbutton");
    button.addEventListener("click",getData,false);
    div.appendChild(button);

    var checkBox = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("id","showEverything");
    checkBox.setAttribute("class","GScheckbox");
	checkBox.style.marginLeft = "3px";
	checkBox.style.marginRight = "3px";
	div.appendChild(checkBox);

    var span = document.createElement("span");
	span.innerHTML = "Show Everyone";
	div.appendChild(span);
*/
	var weekText = document.createElement("span");
	weekText.innerHTML = " Enter Week: ";
	div.appendChild(weekText);

	var textbox = document.createElement("input");
	textbox.setAttribute("type","input");
	textbox.setAttribute("id","week_input");
	div.appendChild(textbox);

	var content = document.getElementById("content");
	content.parentNode.insertBefore(div, content.nextSibling);
}


function getData() {

//console.log("Getting data...");
	week = document.getElementById("week_input").value;
	//var btn = document.getElementById("bsencbutton");
	//btn.disabled = true;
	var btn = document.getElementById("bsbutton");
	btn.disabled = true;
	outButton = btn;
	//outButton.setAttribute("value","Warning: this might take a while. ("+gamelinks.length+"->"+games.length+")");
	gamelinks=[];
	getStats=[];
	stats.length =0;
	players.length = 0;
	// loop through players
	for each (playerNumber in playerList){

		// get game log page.
		var page = "http://goallineblitz.com/game/player_game_log.pl?player_id="+ playerNumber;
		var page = "http://goallineblitz.com/game/player_game_log.pl?player_id="+ playerNumber + "&season="+ season +"&stat_type=raw";
		//http://goallineblitz.com/game/player_game_log.pl?player_id=2252451&season=21&stat_type=raw
		playerLinks.push(page);
		//console.log(page);
		var html = getInetPage(page	);
		html = html.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
		var div = document.createElement("div");
		div.innerHTML = html;

		var tables = div.getElementsByTagName("table");
		//console.log("loading table...");
		var trs = tables[1].getElementsByTagName("tr");

		//Get all the game links for the player.  games 1 to 16.  Could be modified to look at a specific game.
		/*for (var tr in trs) {
			if (parseInt(tr.getElementsByTagName("td")[0].innerHTML) >= week && parseInt(tr.getElementsByTagName("td")[0].innerHTML) <= week) {
				gamelinks.push(tr.getElementsByTagName("td")[3].getElementsByTagName("a")[0].href);
				//console.log(tr.getElementsByTagName("td")[3].getElementsByTagName("a")[0].href);
			}
		}*/

		//console.log(trs.length); //game logs
		for (var i=0; i<trs.length;i++){
			var td = trs[i].getElementsByTagName('td')[0];
			td = parseInt(td.innerHTML);

			if (td >= week && td <= week){
				var td3 = trs[i].getElementsByTagName('td')[3];
				gamelinks.push(td3.getElementsByTagName("a")[0].href);
			}
		}
	}

	for each (gamelink in gamelinks){
//console.log("process gamelink: " + gamelink);
		var html = getInetPage(gamelink);
		html = html.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
		var div = document.createElement("div");
		div.innerHTML = html;

		var tables = div.getElementsByTagName("table");
		for (var i=3; i<tables.length; i = i+3) {
//console.log("loading table...");
			var type = tables[i].getElementsByTagName("td")[0].innerHTML;
//console.log("loading table: " + type);
			var team1 = tables[i+1];
			var name1 = team1.getElementsByTagName("th")[0].innerHTML;
			var team2 = tables[i+2];
			var name2 = team2.getElementsByTagName("th")[0].innerHTML;

			//console.log("type: " + name1+" vs. "+name2+" : "+type);
//console.log("Proceeding to loadPlayers...");
			loadPlayers(team1, type, name1);
			loadPlayers(team2, type, name2);
			//console.log("After loadplayers");
		}

		//outButton.setAttribute("value","Warning: this might take a while. ("+data.length+" to go)");
		//if (data.length > 1) {
		//	getInetPage(data[1], loadTeam, data.slice(1));
		//}
		//else {
		//	console.log("transfer time : "+(new Date()-netTime).toFixed(0)+"ms");
//
		//	var addTime = new Date();
		//	addition();
		//	console.log("addition time : "+(new Date()-addTime).toFixed(0)+"ms");

			createOutputTable();
			btn.disabled = false;
		//}
	}
	//print_r(players);
}






function getInetPage(address) { //, func, data) {
    //console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, false);// true );
	/*req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			//console.log("loaded: "+address);
			//func(address, this, data);
		}
	};*/
	req.send(null);
	if(req.status == 200) {

		//console.log(req.getResponseHeader("Content-Type"));
	}
	//console.log(address);
	//console.log(req.responseXML);
	//console.log("2");

	return req;
}

function findPlayer(pid) {
	var returnval = false;
	for each(var player in playerList){
		if (player == pid){
			returnval = true;
		}

	}
	return returnval;

}

function loadPlayers(table, heading, tname) {
//console.log(table+" | "+heading+" | "+tname);
	for (var i=1; i<table.rows.length; i++) {
		var r = table.rows[i];
		var pname = r.cells[0].getElementsByTagName("a")[0].innerHTML;
		var pid = r.cells[0].getElementsByTagName("a")[0].href.toString().split("=")[1];
		var ppos = r.cells[0].firstChild.innerHTML;
		var pteam = tname;

		/*console.log("pname: " + pname);
		console.log("pid: " + pid);
		console.log("ppos: " + ppos);
		console.log("pteam: " + pteam);*/

		//console.log("PID: " + pid + " - " + findPlayer(pid));
		if (findPlayer(pid) == true){

//console.log("Finding Player: " + pid);

			if (players[pid] == null) {
//console.log("Player not found, adding: " + pid);
				var player = new Object();
				player.name = pname.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				player.id = pid;
				player.pos = ppos.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				player.tname = pteam.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

				player.stats = new Array();
				for each (var type in statTypes) {
					player.stats[type] = new Array();
				}

				players[pid] = player;
			}

//console.log("Getting stat lines for: " + pid);
			var s = new Array();
			for (var j=1; j<r.cells.length; j++) {
				var statName = table.rows[0].cells[j].innerHTML;
				var value = r.cells[j].innerHTML.replace(",","");
//console.log(statName+" : "+value);
				if (statName == "Yds") value = value;
				if (statName == "SackYd") value = Math.round(parseFloat(value));
				if (heading == "Kick/Punt Return") {
					if (statName == "Yds") {
						if (s["KYds"] == null) statName = "KYds";
						else statName = "PYds";
					}
					else if (statName == "TD") {
						if (s["KTD"] == null) statName = "KTD";
						else statName = "PTD";
					}
				}
				if (heading == "Defense") {
					if (statName == "Yds") {
						if (s["SYds"] == null) statName = "SYds";
						else statName = "IYds";
					}
				}
				s[statName] = value;
			}
			//FF4 = players[pid].stats[heading] is undefined
			try{
				players[pid].stats[heading].push(s);
//console.log("Added");
			}
			catch(ex){
				console.log("Did not find stats for: " + pid + " error: " + ex);
			}
		}
	}
}

function addition() {
//console.log("getting totals");
	outButton.setAttribute("value","Warning: this might take a while. (adding results)");
	var i=0;
	for each (var player in players) {
		i++;
//		console.log(i+") "+player.id+") "+player.name);
		for each (var type in statTypes) {
			var total = getStats[type](player.stats[type]);
			player.stats[type] = total;
		}

		if ((player.stats["Passing"] != null) && (player.stats["Rushing"] != null)) {
			player.stats["Rushing"]["Rush"] -= player.stats["Passing"]["Sack"];
			player.stats["Rushing"]["Yds"] -= player.stats["Passing"]["SackYd"];
			if (player.stats["Rushing"]["Rush"] == 0) {
				player.stats["Rushing"] = null;
			}
			else {
				player.stats["Rushing"]["Avg"] = (parseFloat(player.stats["Rushing"]["Yds"]) / parseFloat(player.stats["Rushing"]["Rush"])).toFixed(2);
			}
		}

		if ((player.stats["Special Teams"] != null) && (player.stats["Defense"] != null)) {
//			player.stats["Defense"]["Ply"] -= player.stats["Special Teams"]["Plays"];
			player.stats["Defense"]["Tk"] -= player.stats["Special Teams"]["Tk"];
			player.stats["Defense"]["MsTk"] -= player.stats["Special Teams"]["MsTk"];
			player.stats["Defense"]["FFum"] -= player.stats["Special Teams"]["FFum"];
			player.stats["Defense"]["FRec"] -= player.stats["Special Teams"]["FRec"];
//			player.stats["Defense"]["Pnkd"] -= player.stats["Special Teams"]["Pnkd"];

			var sum = 0;
			for each (var s in headings["Defense"]) {
				if (s == "Ply") continue;
				sum += parseFloat(player.stats["Defense"][s]);
			}
			if (sum == 0) player.stats["Defense"] = null;
		}

	}
	//console.log(players.length+" -- "+i);
}

// GENERIC - FOR OUTPUT OF STATS



function spacing(w, s) {
	s = Math.min(s,12);
	if (w.length < s) {
		var output = " ";
		for (var i=w.length-1; i<(s-1); i++) {
			output += ".";
		}
		output = output.slice(0,-1)+" ";
		output += w;
		return output;
	}
	return w;
}

function createForumOutput() {
	//console.log("creating half-assed output for Bort's ridiculous 'hey, no one needs to format anything' forum software");
	print_r(players);

	var output = "";
	//for each (var type in statTypes) {
		type = "Defense";
		output += "\n"+type + "\n";
		for each (var h in headings[type]) {
			output += spacing(h, h.length*3)
		}
		output += " .... Pos . Name .(Team)";
		output += "\n";

		for each (var player in players) {
			if (player.stats[type] != null) {
				if (showEverything == false) {
					if (teamPageName.indexOf(player.tname) != 0) {
						continue;
					}
				}


				for each (var h in headings[type]) {
					//ADDED
					var theObj = player.stats[type][0];
					var result;
					for(var p in player.stats[type][0]){
						if (p == h){
							result = theObj[p];
						}
					}
					if (isNaN(parseFloat(result))){
						result=0;
					}
					output += spacing(result.toString(), h.length*3);
					//END ADDED

					//output += spacing(player.stats[type][h].toString(), h.length*3);
				}
				output += " ..... "+spacing(player.pos, 3)+" "+spacing(player.name,7)+" ("+player.tname+")";
				output += "\n";
			}
		}
		output += "\n";
	//}
	console.log(output);
}

function createHTMLOutput() {
	print_r(players);
	//console.log("creating HTML output");
	//var div = document.createElement("div");
	//div.innerHTML = document.getElementsByClassName("bscTable")[0].parentNode.innerHTML;
	//div.removeChild(div.childNodes[0]);
	//console.log(div.innerHTML);
}

function createDelimitedOutput() {
	var delim = "\t";
	//console.log("creating delimited output");
	var output = "";
	for each (var type in statTypes) {
		//type = "Defense";
		output += "\n"+type + "\n";
		output += "Week"+delim+"Pos"+delim+"Name"+delim+"Team"+delim;
		for each (var h in headings[type]) {
			output += h+delim;
		}
		output += "\n";

		//loop through player entries.
		for each (var player in players) {
			if (player.stats[type] != null) {
				if (showEverything == false) {
					if (teamPageName.indexOf(player.tname) != 0) {
						continue;
					}
				}
				//Loop through the games logged.
				for (var i = 0; i<player.stats[type].length; i++){
					output += week + delim + " " + player.pos+delim+player.name.replace("&nbsp;"," ").replace(/,/g,"").slice(0,25)+delim+player.tname.replace("&nbsp;"," ").replace(/,/g,"").slice(0,25)+delim;
					//Loop through the available stat columns
					for each (var h in headings[type]) {
					// ADDED
					// NEED TO ADD A WAY FOR MULTIPLE GAME OUTPUT
						//console.log(player.stats[type].length);

							var theObj = player.stats[type][i];
							var result;
							for(var p in player.stats[type][i]){
								if (p == h){
									result = theObj[p];
								}
							}
							if (isNaN(parseFloat(result))){
								result=0;
							}
						output += result.toString()+delim;

					}
					output += "\n";
					//END ADDED
					//output += player.stats[type][h].toString()+",";
				}
				//output += "\n";
			}
		}
		//output += "\n";
	}
	console.log(output);
	//window.alert(output);
}


function createDelimitedOutputtwo() {
	var delim = "\t";
	//console.log("creating delimited output");
	var output = "";
	for each (var type in statTypes) {
		//type = "Defense";
		output += "\n"+type + "\n";
		output += "Week"+delim+"Pos"+delim+"Name"+delim+"Team"+delim;
		for each (var h in headings[type]) {
			output += h+delim;
		}
		output += "\n";

		//loop through player entries.
		for each (var player in players) {
			if (player.stats[type] != null) {
				if (showEverything == false) {
					if (teamPageName.indexOf(player.tname) != 0) {
						continue;
					}
				}
				//Loop through the games logged.
				for (var i = 0; i<player.stats[type].length; i++){
					output += week + delim + " " + player.pos+delim+player.name.replace("&nbsp;"," ").replace(/,/g,"").slice(0,25)+delim+player.tname.replace("&nbsp;"," ").replace(/,/g,"").slice(0,25)+delim;
					//Loop through the available stat columns
					for each (var h in headings[type]) {
					// ADDED
					// NEED TO ADD A WAY FOR MULTIPLE GAME OUTPUT
						//console.log(player.stats[type].length);

							var theObj = player.stats[type][i];
							var result;
							for(var p in player.stats[type][i]){
								if (p == h){
									result = theObj[p];
								}
							}
							if (isNaN(parseFloat(result))){
								result=0;
							}
						output += result.toString()+delim;

					}
					output += "\n";
					//END ADDED
					//output += player.stats[type][h].toString()+",";
				}
				//output += "\n";
			}
		}
		//output += "\n";
	}
	console.log(output);
	//window.alert(output);
}


function createDelimitedOutputWithPoints() {
	var delim = "\t";
	var totalPoints = 0;
	
	//console.log("creating delimited output");
	var output = "";
	//output += "Week"+delim+"Pos"+delim+"Name"+delim+"Team"+delim;
	output += "Agent"+delim+"Week"+delim+"Pos"+delim+"Name"+delim+"Team"+delim;
	for each (var type in statTypes) {
		for each (var h in headings[type]) {
			output += h+delim;
		}
	}
	output += "\n";

	//loop through player entries.

	for each (var player in players) {
		output += agents[player.id] + delim;
		output += week + delim + " " + player.pos+delim+player.name.replace("&nbsp;"," ").replace(/,/g,"").slice(0,25)+delim+player.tname.replace("&nbsp;"," ").replace(/,/g,"").slice(0,25)+delim;
		//Loop through each stat type (Stat Grouping)
		for each (var type in statTypes) {
			//console.log(type);
			//console.log(player.stats[type].length);
			if (player.stats[type].length > 0)
			{
				if (showEverything == false) {
					if (teamPageName.indexOf(player.tname) != 0) {
						continue;
					}
				}
				//Loop through the games logged.
				//for (var i = 0; i<player.stats[type].length; i++){
				for (var i = 0; i>= 0; i--){
					//Loop through the available stat columns

						for each (var h in headings[type]) {
								var theObj = player.stats[type][i];
								var result;
								var pointsToUse;
								for(var p in player.stats[type][i])
								{
									if (p == h)
									{
										result = theObj[p];
										pointsToUse = points[type][headings[type].indexOf(p)];
										//console.log("indexof: " + headings[type].indexOf(p));
										//console.log("points[type][p]: " + points[type][p]);
										//console.log(parseFloat(pointsToUse));
										
									}
								}
								if (isNaN(parseFloat(result)))
								{
									result=0;
									
								}

							totalPoints += parseFloat(result) * parseFloat(pointsToUse);
							//console.log(parseFloat(result));
							//console.log(parseFloat(points[p]));
							//console.log(p);
							
							output += result.toString()+delim;
						}
				}
			}
			else{
				//console.log(h);
				for each (var h in headings[type]){
					result = 0;
					output += result.toString()+delim;
				}

			}

		}
		//console.log(player.name);
		output += totalPoints.toString() +delim;
		//console.log(totalPoints);
		output += "\n";
		totalPoints = 0;
	}
	console.log(output);
	alert(output);
}

function createWikiOutput() {
	//console.log("creating wiki output");
	var output = "";
	for each (var type in statTypes) {
		output += "\n";
		output += "{| class='wikitable sortable'\n";

		output += "|-\n";
		output += "!Pos";
		output += "!!Name";
		output += "!!Team";
		for each (var h in headings[type]) {
			output += "!!"+h;
		}
		output += "\n";

		for each (var player in players) {
			if (player.stats[type] != null) {
				if (showEverything == false) {
					if (teamPageName.indexOf(player.tname) != 0) {
						continue;
					}
				}
				output += "|-\n";
				output += "|"+player.pos;
				output += "||"+player.name;
				output += "||"+player.tname;
				for each (var h in headings[type]) {
					var s = player.stats[type][h];
					if (s < 0) {
						s = "{{msym}}"+(s*-1);
					}
					output += "||"+s.toString();
				}
				output += "\n";
			}
		}
		output += "|}\n";
	}
	console.log(output);
}

function createOutputButtons() {
	var div = document.createElement("span");
	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("value","Delimited Export");
	btn.addEventListener("click", createDelimitedOutputtwo, false);
	div.appendChild(btn);

	//var div = document.createElement("span");
	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("value","Delimited Export with Points");
	btn.addEventListener("click", createDelimitedOutputWithPoints, false);
	div.appendChild(btn);
		
	
	

	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("value","Half-Assed Forum Export");
	btn.addEventListener("click", createForumOutput, false);
	div.appendChild(btn);

	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("value","PrintR");
	btn.addEventListener("click", createHTMLOutput, false);
	div.appendChild(btn);
/*
	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("value","Wiki Export");
	btn.addEventListener("click", createWikiOutput, false);
	div.appendChild(btn);
*/
	return div;
}


function createOutputTable() {

	var stime = new Date();
	//console.log("creating output");
	var output = document.createElement("div");
	output.appendChild(createOutputButtons());

	for (var i=0; i<statTypes.length; i++) {
		outButton.setAttribute("value","Warning: this might take a while. (creating "+statTypes[i]+" table)");
		var ttime = new Date();

		var table = document.createElement("table");
		table.setAttribute("class","bscTable");
		table.cellSpacing = "0";
		table.cellPadding = "0";
		table.style.marginBottom = "0px";
		table.style.width = "1000px";
		var tbody = document.createElement("tbody");

		var tr = document.createElement("tr");
		tr.setAttribute("class","nonalternating_color");

		var td = document.createElement("td");
		td.innerHTML = statTypes[i];
		td.colSpan = headings[statTypes[i]].length + 1;

		tr.appendChild(td);
		tbody.appendChild(tr);
		table.appendChild(tbody);

		var hrow = document.createElement("tr");
		hrow.setAttribute("class", "nonalternating_color2");
		var head = ["Name"].concat(headings[statTypes[i]]);
		for each (var h in head) {
			var th = document.createElement("th");
			if (h == "Name") {
				th.setAttribute("style","color: black; text-align: left");
			}
			else {
				th.setAttribute("style","color: black; text-align: right");
			}
			th.innerHTML = h;
			hrow.appendChild(th);
		}
		table.appendChild(hrow);

		for each (var player in players) {
			if (showEverything == false) {
				if (teamPageName.indexOf(player.tname) != 0) {
					continue;
				}
			}
			if (player.stats[statTypes[i]] != null) {
				var pRow = getOutputRow(statTypes[i], player);

				var inserted = false;
				//for (var ridx=2; ridx<table.rows.length; ridx++) {
				//	if (parseFloat(pRow.cells[sortable[statTypes[i]]].textContent) >= parseFloat(table.rows[ridx].cells[sortable[statTypes[i]]].textContent)) {
				//		inserted = true;
				//		table.insertBefore(pRow, table.rows[ridx]);
				//		break;
				//	}
				//}
				if (inserted == false) {
					table.appendChild(pRow);
				}
			}
		}
		for (var x=2; x<table.rows.length; x++) {
			table.rows[x].setAttribute("class","alternating_color"+(x%2+1));
		}
		output.appendChild(table);

		var time = new Date() - ttime;
		//console.log("single table ("+statTypes[i]+") : "+time.toFixed(0)+"ms");
	}
	document.getElementById("footer").appendChild(output);

	var time = new Date() - stime;
    //console.log("create time : "+time.toFixed(0)+"ms");

	//console.log("make sortable");
	outButton.setAttribute("value","Warning: this might take a while. (making sortable)");
	makeSortable();

	//console.log("done");
	outButton.setAttribute("value","Done.");
}

function merge(a, b, sortidx) {
	if (a.length == 0) return b;
	if (b.length == 0) return a;

	var output = new Array();
	var idx = 0, aidx = 0, bidx = 0;

	while ((aidx < a.length) && (bidx < b.length)) {
		if (parseFloat(a[aidx].cells[sortidx].textContent) > parseFloat(b[bidx].cells[sortidx].textContent)) {
			output.push(a[aidx++]);
		}
		else {
			output.push(b[bidx++]);
		}
	}

	for (; aidx<a.length; aidx++) {
		output.push(a[aidx]);
	}
	for (; bidx<b.length; bidx++) {
		output.push(b[bidx]);
	}

	return output;
}

function sortColumn(data, sortidx) {
	if (data.length == 1) return data;

	var center = Math.round(data.length/2);

	var left = data.slice(0,center);
	left = sortColumn(left, sortidx);

	var right = data.slice(center);
	right = sortColumn(right, sortidx);

	var output = merge(left, right, sortidx);
	return output;
}

function emit(target) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click",false,false);
    target.dispatchEvent(evt);
}

function makeSortable() {
	var tables = document.getElementsByClassName("bscTable");
	for (var j=0; j<tables.length; j++) {
		var t = tables[j];
		var head = t.getElementsByTagName("th");
		for (var i=0; i<head.length; i++) {
			var th = head[i];
			th.addEventListener("click", sort, false);
		}
	}
}

function sort(event) {
	var tbl = event.target.parentNode.parentNode;
	var tbody = tbl.getElementsByTagName("tbody")[0];

	var idx = event.target.cellIndex;
	if (idx == -1) return;

	tbl.style.visibility = "hidden";

	var stime = new Date();
	var results = sortColumn(getArray(tbl.rows), idx);
	var time = new Date() - stime;
    console.log("sort time : "+time.toFixed(0)+"ms");

	var stime = new Date();
	while (tbl.rows.length > 2) {
		tbl.deleteRow(2);
	}
	var time = new Date() - stime;
    console.log("delete time : "+time.toFixed(0)+"ms");

	var stime = new Date();
	for (var i=0; i<results.length; i++) {
		results[i].setAttribute("class","alternating_color"+(i%2+1));
		tbl.appendChild(results[i]);
	}
	results = null;
	var time = new Date() - stime;
    console.log("append time : "+time.toFixed(0)+"ms");

	tbl.style.visibility = "visible";
}

function getArray(list) {
	var output = new Array();
    for(var i=2, len = list.length; i < len; i++) {
        output.push(list[i]);
    }
    return output;
};

function getOutputRow(type, player) {
	//print_r(player);
	var tr = document.createElement("tr");
	tr.innerHTML = "<td>"+
				   "<span class='cpu'>"+player.pos+"</span>"+
				   //"<a href='/game/player.pl?player_id="+player.id+"'>"+player.name+"</a>"+
				   //agents[player.id]
				   "<a href='/game/player.pl?player_id="+player.id+"'>"+agents[player.id]+"</a>"+
				   "<span class='cpu'> ("+player.tname+")</span>"+
				   "</td>";
	for each (var s in headings[type]) {
		var td = document.createElement("td");
		td.setAttribute("style", "color: black; text-align: right;");
		//issues here - returning undefined, due to [s]
		//added below to solve issue.
		var theObj = player.stats[type][0];
		var result;
		for(var p in player.stats[type][0]){
			if (p == s){
				result = theObj[p];
			}
    	}
    	if (isNaN(parseFloat(result))){
			result=0;
		}
    	td.innerHTML = result;
    	//added above
		//td.innerHTML = player.stats[type][s];
		tr.appendChild(td);
	}
	return tr;
}

function getPassing(stats) {
	var out = getGeneric(headings["Passing"], stats);

	if (out != null) {
		if ((out["Att"] == 0) && (out["Sack"] == 0)) return null;
		if (out["Att"] == 0) {
			out["Rating"] = "0.0";

			out["Pct"] = "0.0";
			out["Y/A"] = "0.0";
		}
		else {
			var a = Math.max(0,Math.min(2.375, (out["Comp"]/out["Att"]-0.3)*5));
			var b = Math.max(0,Math.min(2.375, (out["Yds"]/out["Att"]-3)*0.25));
			var c = Math.max(0,Math.min(2.375, (out["TD"]/out["Att"])*20));
			var d = Math.max(0,Math.min(2.375, 2.375 - (out["Int"]/out["Att"])*25));
			out["Rating"] = (100*(a + b + c + d)/6).toFixed(1);

			out["Pct"] = (100*out["Comp"] / out["Att"]).toFixed(1);
			out["Y/A"] = (parseFloat(out["Yds"]) / parseFloat(out["Att"])).toFixed(1);
		}
	}
	return out;
}
function getRushing(stats) {
	var out = getGeneric(headings["Rushing"], stats);
	if (out != null) {
		out["Avg"] = (parseFloat(out["Yds"]) / parseFloat(out["Rush"])).toFixed(2);
		if (isNaN(out["Avg"]) == true) out["Avg"] = 0.00;
	}
	return out;
}
function getReceiving(stats) {
	for each (var s in stats) {
		s["YAC"] = s["YAC"] * s["Rec"];
	}
	var out = getGeneric(headings["Receiving"], stats);
	if (out != null) {
		out["YAC"] = (out["YAC"]/out["Rec"]).toFixed(1);
		if (isNaN(out["YAC"]) == true) out["YAC"] = 0.0;
		out["Avg"] = (parseFloat(out["Yds"]) / parseFloat(out["Rec"])).toFixed(1);
		if (isNaN(out["Avg"]) == true) out["Avg"] = 0.0;
	}
	return out;
}
function getKicking(stats) {
	var output = new Array();

	var k = ["FGM","FGA","XPM","XPA","KO","TB","Yds"];
	for each (var h in k) {
		output[h] = 0;
		for (var i=0; i<stats.length; i++) {
			var v = parseFloat(stats[i][h]);
			if (isNaN(v) == true) v = 0;
			output[h] += v;
		}
	}
	if (output["KO"] > 0) {
		output["Avg"] = (output["Yds"]/output["KO"]).toFixed(1);
	}
	else {
		output["Avg"] = 0.0;
	}

	var k = ["0-19","20-29","30-39","40-49","50+"];
	for each (var h in k) {
		output[h] = "0/0";
		for (var i=0; i<stats.length; i++) {
			var l = parseInt(stats[i][h].split("/")[0]);
			var r = parseInt(stats[i][h].split("/")[1]);
			output[h] = (parseInt(output[h].split("/")[0])+l)+"/"+(parseInt(output[h].split("/")[1])+r);
		}
	}
	output["Points"] = output["FGM"]*3 + output["XPM"]*1;

	if ((output["FGA"] == 0) && (output["XPA"] == 0) && (output["KO"] == 0)) return null;
	return output;
}

function getPunting(stats) {
	var out = getGeneric(headings["Punting"], stats);
	if (out != null) {
		out["Avg"] = (parseFloat(out["Yds"]) / parseFloat(out["Punts"])).toFixed(1);
		if (isNaN(out["Avg"]) == true) out["Avg"] = 0.0;
	}
	return out;
}
function getReturns(stats) {
	var out = getGeneric(headings["Kick/Punt Return"], stats);
	if (out != null) {
		out["KAvg"] = (parseFloat(out["KYds"]) / parseFloat(out["KR"]) ).toFixed(1);
		if (isNaN(out["KAvg"]) == true) out["KAvg"] = 0.0;
		out["PAvg"] = (parseFloat(out["PYds"]) / parseFloat(out["PR"]) ).toFixed(1);
		if (isNaN(out["PAvg"]) == true) out["PAvg"] = 0.0;
	}
	return out;
}
function getSpecialTeams(stats) {
	return getGeneric(headings["Special Teams"], stats);
}
function getOffensiveLine(stats) {
	return getGeneric(headings["Offensive Line"], stats);
}
function getDefense(stats) {
	return getGeneric(headings["Defense"], stats);
}
function getGeneric(headings, stats) {
	var val = 0;
	var total = 0;
	var output = new Array();
	for each (var h in headings) {
		output[h] = 0;

		for (var i=0; i<stats.length; i++) {
			val = parseFloat(stats[i][h]);
			if (isNaN(val) == true) val = 0;
			output[h] += val;
			if ((h != "Name") && (h != "Plays") && (h != "Ply")) {
				total += Math.abs(parseFloat(stats[i][h]));
			}
		}
	}
	if (total != 0) {
		return output;
	}
	else {
		return null;
	}
}

