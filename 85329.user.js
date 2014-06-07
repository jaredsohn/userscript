// ==UserScript==
// @name           niboris
// @namespace      pbr/nib
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.05.10
// ==/UserScript==



var teamList = [3423, 149, 104, 5636, 1530, 3600, 904, 590, 3194, 2676, 4410, 5517, 4132, 1509, 696, 5961, 2784, 5692, 4138, 632, 4813, 4816, 1656, 5258, 215, 750, 1600, 4982, 602, 6206, 1691, 1711, 6097, 2694, 612, 729, 626, 5283, 5193, 2659, 5192, 1293, 473, 3510, 5300, 5601, 4238, 2735, 2678, 2867, 4411, 5395, 269, 2725, 2723, 7028, 5298, 5749, 5348, 5174, 2837, 5168, 5370, 5214, 5679, 3608, 5838, 5669, 5504, 1801, 3472, 6156, 1852, 5827, 5670, 3606, 5402, 252, 3496, 248, 7019, 5479, 5841, 5560, 4650, 3594, 162, 5771, 3433, 3539, 1768, 3474, 153, 3542, 6637, 5846, 4318, 2022, 384, 4262, 4329, 6451, 5422, 5828, 7171, 6466, 4254, 6483, 353, 2020, 349, 4311, 2054, 1511, 2071, 4369, 842, 413, 857, 7045, 6577, 1993, 4218, 840, 6533, 8765, 2972, 4207, 6470, 3153, 5927, 598, 3628, 595, 1440, 6464, 2926, 2877, 1503, 956, 6737, 2906, 975, 4211, 6646, 4698, 5829, 5128, 2964, 4727, 6302, 5894, 4803, 963, 290, 4693, 4653, 4859, 4713, 7064, 877, 7279, 1742, 1654, 7199, 7207, 486, 7232, 250, 4610, 4512, 7419, 7320, 4604, 4572, 7096, 4392, 3060, 503, 5323, 7203, 6283, 885, 4429, 4127, 4621, 5354, 915, 510, 4504, 4867, 4551, 1876, 2835, 5123, 3150, 3088, 7145, 5750, 1242, 442, 5902, 417, 5290, 7026, 3073, 5113, 1526, 3143, 412, 7109, 4989, 3102, 1434, 5762, 5140, 3123, 5040, 2019, 997, 7060, 5812, 5049, 623, 1161, 1024, 695, 900, 1022, 106, 1532, 3327, 5312, 1384, 1180, 1577, 1192, 6309, 5429, 1466, 391, 1494, 1239, 3421, 1153, 670, 116, 1202, 1178, 96, 5950, 809, 57, 1288, 1300, 1680, 6258, 165, 5589, 1927, 3366, 637, 4223, 647, 6073, 694, 3314, 286, 4800, 3199, 861, 265, 6122, 6133, 6080, 3415, 1934, 3310, 6130, 5974, 3222, 1133, 6214, 652, 7406, 7181, 624, 6580, 8176, 8155, 8658, 8301, 8343, 8606, 8508, 8673, 8153, 3358, 8779, 8148, 4771, 8521, 8018, 8080, 8045, 3055, 8683, 8616, 8467, 8188, 8023, 8421, 8032, 8724, 8531, 8712, 8034, 8039, 1837, 8487, 1];

window.setTimeout ( function ( ) {
setup ( ) ;
} , 100 ) ;



var nodes = new Array();
function Node() {
    this.name = "Unnamed";
	this.league = "Unnamed";
    this.id = -1;
    this.win = null;
    this.loss = null;
	this.tie = null;
	this.league = null;
}

function setup() {
	var div = document.createElement("div");
	div.id = "niboris_ranking";

	var btn = document.createElement("input");
	btn.setAttribute("id","niboris_script_button");
	btn.setAttribute("value","Run Niboris Script");
    btn.setAttribute("type","button");
	btn.disabled = false;

	var spc = document.createElement("text");
	spc.textContent = "   ";
	
	var box = document.createElement("input");
	box.setAttribute("id","niboris_script_box");
    box.setAttribute("type","checkbox");
	box.checked = false;
	var lbl = document.createElement("text");
	lbl.textContent = " Get Team ID's ";

//	var boxReg = document.createElement("input");
//	boxReg.setAttribute("id","niboris_regular_box");
 //   boxReg.setAttribute("type","checkbox");
//	boxReg.checked = false;
//	var lblReg = document.createElement("text");
//	lblReg.textContent = " Use Regular Season ";
//
//	var boxPlayoff = document.createElement("input");
//	boxPlayoff.setAttribute("id","niboris_playoff_box");
 //   boxPlayoff.setAttribute("type","checkbox");
//	boxPlayoff.checked = false;
//	var lblPlayoff = document.createElement("text");
//	lblPlayoff.textContent = " Use Playoff Games ";
//	
//	var boxRank = document.createElement("input");
//	boxRank.setAttribute("id","niboris_ranked_box");
 //   boxRank.setAttribute("type","checkbox");
//	boxRank.checked = false;
//	var lblRank = document.createElement("text");
//	lblRank.textContent = " Use Ranked Scrimmages ";

	div.appendChild(btn);
	div.appendChild(spc);
	div.appendChild(box);
	div.appendChild(lbl);
//	div.appendChild(boxReg);
//	div.appendChild(lblReg);
//	div.appendChild(boxRank);
//	div.appendChild(lblRank);
//	div.appendChild(boxPlayoff);
//	div.appendChild(lblPlayoff);

	var res = document.createElement("div");
	res.id = "niboris_script_results";

	var endorsements = document.getElementById("endorsements");
	endorsements.parentNode.insertBefore(div, endorsements);
	endorsements.parentNode.insertBefore(res, endorsements);
    btn.addEventListener("click",ranking_main,false);
}

function getTeamList() {
	teamList = new Array();
	var links = document.getElementById("conferences").getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		var l = links[i].href.toString();
		if (l.indexOf("team.pl") != -1) {
			teamList.push(parseInt(l.split("=")[1]));
		}
	}

	var html = "<br><br><br><text>";
	for (var t=0; t<teamList.length; t++) {
		html += teamList[t]+", ";
	}
	html = html.slice(0,html.length-2);
	html += "</text><br>";

	document.body.innerHTML += html;
}

function getTeamRankings() {
    for (var i=0; i<teamList.length; i++) {
		var n = new Node();
        n.name = "Unknown";
        n.id = teamList[i];
		n.win = new Array();
		n.loss = new Array();
		n.tie = new Array();
        nodes[teamList[i]] = n;

		var div = document.createElement("div");
		div.innerHTML = teamList[i];
		document.getElementById("waiting").appendChild(div);
	}
	
	for (var i=0; i<teamList.length; i++) {
		var addr = "http://goallineblitz.com/game/team.pl?team_id="+teamList[i];
		getInetPage(addr, handleTeamPage);
    }
}

function ranking_main() {
	var btn = document.getElementById("niboris_script_button");
	btn.disabled = true;
	
    var waiting = document.createElement("div");
    waiting.id = "waiting";

    var remote = document.createElement("div");
    remote.id = "remote";

    var footer = document.getElementById("footer");
    footer.appendChild(waiting);
    footer.appendChild(remote);

	var box = document.getElementById("niboris_script_box");
	if (box.checked == true) {
		getTeamList();
	}
	else {
		getTeamRankings();
	}

  	console.log(nodes.length);
	waitFunction();
}

function waitFunction() {
//    console.log("waiting()");
    var waiting = document.getElementById("waiting");
    var remote = document.getElementById("remote");
    if ((waiting.childNodes.length > 1) || (remote.childNodes.length > 0)) {
        setTimeout(waitFunction, 5000);
        console.log("["+waiting.childNodes.length+"] setTimeout");
        return;
    }
    console.log("finished");
    calc();
}

function handleTeamPage(address, page) {
    var teamName = page.responseText.split('big_head subhead_head">')[1].split("<")[0].replace(/^\s*|\s*$/g,'');
//console.log("'"+teamName+"' --- '"+teamName.substring(-1,1)+"'");
//console.log(teamName.length+" |||| "+teamName.lastIndexOf("(")+" == "+(teamName.length-1));
    if (teamName.lastIndexOf("(") == (teamName.length-1)) {
        teamName = teamName.substring(0,teamName.length-2).replace(/^\s*|\s*$/g,'');
//console.log("XXXX '"+teamName+"'");
    }
    var teamId = parseInt(address.split("team_id=")[1]);
	nodes[teamId].name = teamName;

    var league = page.responseText.split("league_id=")[1].split("<")[0].split(">")[1];
	nodes[teamId].league = league;

	var p = document.createElement("div");
	p.innerHTML = page.responseText;

	var dates = p.getElementsByClassName("schedule_date_value");
	var dstart = 0;
	var dlen = dates.length;

	for (var i=dstart; i<dlen; i++) {
		var valid = false;
		if (i < 16) {
			// valid = valid || document.getElementById("niboris_regular_box").checked;
			valid = true;
		}
		if (dates[i].parentNode.innerHTML.indexOf(" (R)") != -1) {
			// valid = valid || document.getElementById("niboris_ranked_box").checked;
			valid = true;
		}
		if ((p.getElementsByClassName("schedule_content").length == 3) && ((i>15) && (i<20))) {

			if (p.getElementsByClassName("schedule_content")[1].innerHTML.indexOf(dates[i].innerHTML) != -1) {
				// valid = valid || document.getElementById("niboris_playoff_box").checked;
				valid = true;
			}
		}
		if (valid == true) {
			var oppstr = dates[i].parentNode.childNodes[3].getElementsByTagName("a")[0].innerHTML;
			var opplink = dates[i].parentNode.childNodes[3].getElementsByTagName("a")[0].href;
			var oppId = parseInt(opplink.split("=")[1]);

			if (oppstr.indexOf("at ") == 0) oppstr = oppstr.slice(3);
		
			var scrstr = dates[i].parentNode.childNodes[5].textContent;
//			console.log(rpr+" '"+oppstr+"' : '"+scrstr+"' -- '"+opplink+"'");

			if (nodes[oppId] != null) {
				if (scrstr.indexOf("W") == 0) {
//console.log(teamId+" beats "+oppId);
					nodes[teamId].win.push(nodes[oppId]);
					nodes[oppId].loss.push(nodes[teamId]);
				}
				else if (scrstr.indexOf("T") == 0) {
//console.log(teamId+" ties "+oppId);
					if (teamId < oppId) {
						nodes[teamId].tie.push(nodes[oppId]);
					}
				}
			}
		}
	}

    var div = document.getElementById("waiting");
    for (var i=0; i<div.childNodes.length; i++) {
        if (div.childNodes[i].innerHTML == teamId) {
            div.childNodes[i].parentNode.removeChild(div.childNodes[i]);
			i = -1;
        }
    }
}

function calc() {
	var html = "<br><br>";
    for each (var n in nodes) {
		if (n == null) continue;
		if (n.id == 0) continue;
//console.log(n.id+" : "+n.name+" -- ("+n.win.length+","+n.loss.length+","+n.tie.length+")");
		for (var g=0; g<n.win.length; g++) {
			html += "<br>"+n.id+":"+n.name+":"+n.league+":";
			html += n.win[g].id+":"+n.win[g].name+":"+n.win[g].league+":"+"W";
		}
		for (var g=0; g<n.tie.length; g++) {
			html += "<br>"+n.id+":"+n.name+":"+n.league+":";
			html += n.tie[g].id+":"+n.tie[g].name+":"+n.tie[g].league+":"+"T";
		}
	}
	var res = document.getElementById("niboris_script_results");
	res.innerHTML = html;

	var btn = document.getElementById("niboris_script_button");
	btn.disabled = false;
}

function getInetPage(address, func) {
//    console.log("getInetPage : "+address);
	var remote = document.getElementById("remote");
	if (remote.childNodes.length > 10) {
		setTimeout( function() { getInetPage(address, func); }, 10000);
//		console.log("delaying lookup : "+address.split("=")[1]+" / "+nodes.length);
		return;
	}
	
//	console.log("looking up : "+address.split("=")[1]+" / "+nodes.length);

    var req = new XMLHttpRequest();
    req.open( 'GET', address, true );
    req.onload = function() {
		var remote = document.getElementById("remote");
		for (var i=0; i<remote.childNodes.length; i++) {
			if (remote.childNodes[i].innerHTML == address) {
				remote.removeChild(remote.childNodes[i]);
				i = -1;
			}
		}
	    if (this.status != 200) {
	        console.log("pbr gm script: Error "+this.status+" loading "+address);
			setTimeout( function() { getInetPage(address, func); }, 10000);
        }
        else {
			console.log("loaded: "+address.split("=")[1]);
            func(address,this);
        }
    };

	var adiv = document.createElement("div");
	adiv.innerHTML = address;
	var remote = document.getElementById("remote");
	remote.appendChild(adiv);

    req.send(null);
    return req;
}

