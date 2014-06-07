// ==UserScript==
// @name           League EL Rankings - Copy and Paste for Forums
// @namespace      pbr
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @copyright      2013
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.09.19
// ==/UserScript==

window.setTimeout( function() {
    var button = document.createElement("input");
    button.setAttribute("value","Generate League's Effective Level Rankings");
    button.setAttribute("type","button");
    button.addEventListener("click", main, true);
	button.setAttribute("id","levelbutton");

	var conferences = document.getElementById("conferences");
	conferences.parentNode.insertBefore(button, conferences);
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

	tsort(data,7);

    var str = "<table><tbody>";
	var hdr = "COPY AND PASTE THIS INTO YOUR LEAGUE FORUM<tr class='nonalternating_color'>";
	var titles = ["Rank ......","Players ......","Age .......","Level ..........","Value .........","Eff Level ...........","Salary ....................","Team"];
	for (var i=0; i<titles.length; i++) {
		hdr += "<td>"+titles[i]+"</td>";
	}
	hdr += "</tr>";

	var cap = document.getElementsByClassName("info_item")[0].lastChild.textContent;
	cap = parseFloat(cap.replace(/\$/g,"").replace(/\,/g,""));
	var output = str+hdr;
	for (var i=0; i<data.length; i++) {
		output += "<tr class='alternating_color"+(i%2+1)+"'>";
		output += "<td>"+(i+1)+"</td>";
		for (var j=0; j<data[i].length; j++) {
			output += "<td";
			if (j == 6) {
				output += " style='text-align: right;";
				if (parseFloat(data[i][j].replace(/\$/g,"").replace(/\,/g,"")) > cap) {
					output += " color:red;";
				}
				output += "'"
			}
			else if (j > 0) {
				output += " style='text-align: right'";
			}
			output += ">"+data[i][j]+"</td>";
		}
		output += "</tr>";
	}
	output += "</tbody></table>";

	var btn = document.getElementById("levelbutton");
	btn.style.visibility = "hidden";
	btn.style.display = "none";

	var div = document.createElement("div");
	div.innerHTML = output;

	var con = document.getElementById("conferences");
	con.parentNode.insertBefore(div,con);
}

function handleTeam(address, page) {
	var pr = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	var team = pr.split('"big_head subhead_head">')[1].split("<")[0];
	team = team.split("(")[0];
	team = "<a href="+address+">"+team+"</a>";

	var text = page.responseText.split("Count:")[1].split("Roster")[0];
	var salary = "$"+text.split("($")[1].split(".00/yr)")[0];
	var numPlayers = parseInt(text.split(">")[2]);
	var avgLevel = parseInt(text.split("Avg Lv ")[1]);
	var avgValue = parseFloat(text.split('margin-bottom: 6px;">')[3].split("</div>"));
	var effLevel = parseInt(text.split("Effective Lv ")[1]);

	text = page.responseText.split("content_contracts")[0];
	text = text.split("content_rosters")[1];
//    console.log(text);

	var cpuPlayers = text.split('class="cpu"').length - 1;
	numPlayers -= cpuPlayers;

	if (numPlayers < 10)
		return;
		
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
	data.push(["...............",numPlayers,"............",avgAge.toFixed(0),"...........",avgLevel,"...........",avgValue.toFixed(2),"...........",effLevel,"...........",salary,"...........",team]);
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