// ==UserScript==
// @name           Player Value To League Page
// @namespace      pbr
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @include        http://glb.warriorgeneral.com/game/league.pl?league_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// ==/UserScript==

window.setTimeout( function() {
    var button = document.createElement("input");
    button.setAttribute("value","Get Eff Levels");
    button.setAttribute("type","button");
    button.addEventListener("click", main, true);
	button.setAttribute("id","levelbutton");

	var endorsements = document.getElementById("endorsements");
	endorsements.parentNode.insertBefore(button, endorsements);
}, 100);

var numTeams;
var data = new Array();

function main() {
	document.getElementById("levelbutton").disabled = "true";

	var conferences = document.getElementsByClassName("conference_table");
	numTeams = conferences.length*16;
	for (var c=0; c<conferences.length; c++) {
		var teams = conferences[c].getElementsByTagName("a");
		for (var t=0; t<teams.length; t++) {
//			console.log(teams[t].href.toString());
			if (teams[t].href.toString().indexOf("team.pl") != -1) {
				getInetPage(teams[t].href.toString().replace("team","roster"), handleTeam);
			}
		}
	}
	setTimeout(finish, 2000);
}

function tsort(arr, col) {
	for (var i=0; i<arr.length-1; i++) {
		for (var j=i; j<arr.length; j++) {
			if (parseFloat(arr[i][col]) < parseFloat(arr[j][col])) {
				var temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
}

function finish() {
	if (data.length != numTeams) {
		setTimeout(finish, 2000);
		return;
	}

	tsort(data,4);

	var text = "";

    var str = "<table><tbody>";
	var hdr = "<tr class='nonalternating_color'>";
	var titles = ["Rank","Team","Players","Age","Level","Value","Eff Level","Salary"];
	for (var i=0; i<titles.length; i++) {
		hdr += "<td>"+titles[i]+"</td>";
	}
	hdr += "</tr>";

	var cap = document.getElementsByClassName("info_item")[0].lastChild.textContent;
	cap = parseFloat(cap.replace(/\$/g,"").replace(/\,/g,""));
	var output = str+hdr;
	var t = "";
	for (var i=0; i<data.length; i++) {
		output += "<tr class='alternating_color"+(i%2+1)+"'>";
		output += "<td>"+(i+1)+"</td>";

		if ((i+1) < 10) text += ".";
		text += (i+1)+" ... ";

		for (var j=0; j<data[i].length; j++) {
			output += "<td";
			if (j == 6) {
				output += " style='text-align: right;";
				if (parseFloat(data[i][j].replace(/\$/g,"").replace(/\,/g,"")) > cap) {
					output += " color:red;";
				}
				output += "'";
			}
			else if (j > 0) {
				output += " style='text-align: center'";
			}
			output += ">"+data[i][j]+"</td>";

			if (j == 0) {
				t = data[i][j].slice(data[i][j].indexOf(">")+1, data[i][j].indexOf("</a"));
				t = t.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			}
			else {
				var d = [null, 2, 3, 2, 7, 2, 11];
				if (isNaN(data[i][j].toString().slice(-1)) == true) data[i][j] = 0;
				while (data[i][j].toString().length < d[j]) data[i][j] = "."+data[i][j];
				text += data[i][j] + " ... ";
			}

			if (j == 6) {
				text += t + " ... ";
			}
		}
		output += "</tr>";
		text = text.slice(0,text.length-4) + "\n";
	}
	output += "</tbody></table>";
	console.log(text);

	var btn = document.getElementById("levelbutton");
	btn.style.visibility = "hidden";
	btn.style.display = "none";

	var div = document.createElement("div");
	div.innerHTML = output;

	var end = document.getElementById("endorsements");
	end.parentNode.insertBefore(div,end);
}

var processed=0;

function handleTeam(address, page) {
	processed++;
	var pr = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	var team = pr.split('"big_head subhead_head">')[1].split("<")[0];
	team = team.split("(")[0].replace(/\s+$/g,"");;
    
	var color="#ff0000";
	if (processed > 16) color = "#0000ff";
	team = "<a style=color:"+color+" href="+address+">"+team+"</a>";

	var text = page.responseText.split("Count:")[1].split("Roster")[0];
	var salary = "$"+text.split("($")[1].split("/yr)")[0];
	var numPlayers = parseInt(text.split(">")[2]);
	var avgLevel = parseInt(text.split("Avg Lv ")[1]);
	var avgValue = parseFloat(text.split('margin-bottom: 6px;">')[3].split("</div>"));
	var effLevel = parseInt(text.split("Effective Lv ")[1]);

	text = page.responseText.split("content_contracts")[0];
	text = text.split("content_rosters")[1];
//    console.log(text);

	var cpuPlayers = text.split('class="cpu"').length - 1;
	numPlayers -= cpuPlayers;

	var avgAge = 0;
// td class name bug here
	var ages = text.split("player_level\">");
	if (ages.length > 0) {
		for (var i=2; i<ages.length; i=i+2) {
			var tmp = ages[i].split("<")[0];
			if (isNaN(parseInt(tmp)) == false) {
				avgAge += parseInt(ages[i]);
			}
		}
	}
	avgAge = avgAge / numPlayers;
//    console.log(team+") "+numPlayers+" - "+cpuPlayers+" - "+avgLevel+" - "+avgValue+" - "+avgAge+" - "+effLevel+" - "+salary);
	data.push([team,numPlayers,avgAge.toFixed(0),avgLevel,avgValue.toFixed(2),effLevel,salary]);
	document.getElementById("levelbutton").value += ".";
}

function getInetPage(address, func) {
//    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
//			console.log("loaded: "+address)
			func(address,this);
		}
	};

	req.send(null);
	return req;
}


