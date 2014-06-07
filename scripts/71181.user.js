// ==UserScript==
// @name           Directed Graph Rank
// @namespace      pbr/dgr
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        12.01.11
// ==/UserScript==

window.setTimeout( function() {
	setup();
}, 100);

var nodes = new Array();
function Node() {
    this.name = "Unnamed";
    this.id = -1;
    this.win = null;
    this.loss = null;
}

function setup() {
	var div = document.createElement("div");
	div.id = "graph_ranking";

	var btn = document.createElement("input");
	btn.setAttribute("id","graph_ranking_button");
	btn.setAttribute("value","Run Graph Ranking");
    btn.setAttribute("type","button");
	btn.disabled = false;

	var spc = document.createElement("text");
	spc.textContent = "   ";
	
	var box = document.createElement("input");
	box.setAttribute("id","graph_ranking_box");
    box.setAttribute("type","checkbox");
	box.checked = false;

	var lbl = document.createElement("text");
	lbl.textContent = " Use All Games";
	
	div.appendChild(btn);
	div.appendChild(spc);
	div.appendChild(box);
	div.appendChild(lbl);

	var res = document.createElement("div");
	res.id = "graph_ranking_results";

	var endorsements = document.getElementById("endorsements");
	endorsements.parentNode.insertBefore(div, endorsements);
	endorsements.parentNode.insertBefore(res, endorsements);
    btn.addEventListener("click",ranking_main,false);
}

function ranking_main() {
	var btn = document.getElementById("graph_ranking_button");
	btn.disabled = true;
	
    var waiting = document.createElement("div");
    waiting.id = "waiting";

    var footer = document.getElementById("footer");
    footer.appendChild(waiting);

	var ids = new Array();
    var conf = document.getElementsByClassName("conference_table");
    for (var i=0; i<conf.length; i++) {
        var a = conf[i].getElementsByTagName("a");
        var add = "team.pl?team_id=";
        for (var j=0; j<a.length; j++) {
            var idx = a[j].href.indexOf(add);
            if (idx != -1) {
                var teamId = parseInt(a[j].href.slice(idx+add.length));
				ids.push(teamId);
                var tname = a[j].innerHTML.replace(/^\s*|\s*$/g,'');

                var n = new Node();
                n.name = tname;
                n.id = teamId;
				n.win = new Array();
				n.loss = new Array();
                nodes[teamId] = n;

				var div = document.createElement("div");
				div.innerHTML = teamId;
				document.getElementById("waiting").appendChild(div);
			}
		}
	}
    setTimeout(function() { waitFunction(); }, 5000);
	
	var n = new Node();
	n.name = "Blank";
	n.id = 0;
	n.win = new Array();
	n.loss = new Array();
	nodes[0] = n;
	for (var i=0; i<ids.length; i++) {
/*
		nodes[0].win.push(nodes[ids[i]]);
		nodes[0].loss.push(nodes[ids[i]]);
		nodes[ids[i]].win.push(nodes[0]);
		nodes[ids[i]].loss.push(nodes[0]);
*/
		var addr = "http://goallineblitz.com/game/team.pl?team_id="+ids[i];
		getInetPage(addr, handleTeamPage);
    }
}

function waitFunction() {
    if (document.getElementById("waiting").childNodes.length > 1) {
        setTimeout(function() { waitFunction(); }, 5000);
        console.log("["+document.getElementById("waiting").childNodes.length+"] setTimeout");
        return;
    }
    console.log("finished");
    calc();
}

function handleTeamPage(address, page) {
    var teamName = page.responseText.split('big_head subhead_head">')[1].split("<")[0].replace(/^\s*|\s*$/g,'');
console.log("'"+teamName+"' --- '"+teamName.substring(-1,1)+"'");
//console.log(teamName.length+" |||| "+teamName.lastIndexOf("(")+" == "+(teamName.length-1));
    if (teamName.lastIndexOf("(") == (teamName.length-1)) {
        teamName = teamName.substring(0,teamName.length-2).replace(/^\s*|\s*$/g,'');
//console.log("XXXX '"+teamName+"'");
    }
    var teamId = parseInt(address.split("team_id=")[1]);

	var p = document.createElement("div");
	p.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

	var dates = p.getElementsByClassName("schedule_date_value");
	dlen = 16;
	
	if (document.getElementById("graph_ranking_box").checked == true) {
		dlen = dates.length;
	}
	else {
		if (p.innerHTML.indexOf("Playoff Games (") != -1) {
			var po = p.getElementsByClassName("schedule_content")[1];
			dlen += po.getElementsByClassName("schedule_date_value").length;
		}
	}
//console.log("dlen="+dlen);

	for (var i=0; i<dlen; i++) {
		var oppstr = dates[i].parentNode.childNodes[3].getElementsByTagName("a")[0].innerHTML;
		var opplink = dates[i].parentNode.childNodes[3].getElementsByTagName("a")[0].href;
		var oppId = parseInt(opplink.split("=")[1]);

		if (oppstr.indexOf("at ") == 0) oppstr = oppstr.slice(3);
		if (oppstr.indexOf(" (R)") == (oppstr.length-4)) oppstr = oppstr.slice(0,oppstr.length-4);
		
		var scrstr = dates[i].parentNode.childNodes[5].textContent;

		if (isNaN(parseFloat(scrstr.split(" ")[1])) == false) {
		    var n = new Node();
		    n.name = oppstr;
			n.id = oppId;
			n.win = new Array();
			n.loss = new Array();

		    if (nodes[oppId] == null) {
		        nodes[oppId] = n;
				if (scrstr.indexOf("W") == 0) {
					nodes[teamId].win.push(nodes[oppId]);
					nodes[oppId].loss.push(nodes[teamId]);
				}
				else if (scrstr.indexOf("L") == 0) {
					nodes[teamId].loss.push(nodes[oppId]);
					nodes[oppId].win.push(nodes[teamId]);
				}				
		    }
			else {
				if (scrstr.indexOf("W") == 0) {
				    nodes[teamId].win.push(nodes[oppId]);
				    nodes[oppId].loss.push(nodes[teamId]);
				}
			}
		}
	}

    var div = document.getElementById("waiting");
    for (var i=0; i<div.childNodes.length; i++) {
        if (div.childNodes[i].innerHTML == teamId) {
            div.childNodes[i].parentNode.removeChild(div.childNodes[i]);
			i = -1;
			console.log(div.childNodes.length+" left ..");
			break;
        }
    }
}

var maxDepth;
var alphaWin;
var alphaLoss;

function calc() {
console.log("calculating ...");
	var constant = 0;
    for each (var n in nodes) {
		if (n.id == 0) continue;
		var g = n.win.length + n.loss.length;
		constant = Math.max(constant,g);
	}

    var min = Math.floor(constant/4)+1;
	maxDepth = Math.floor(Math.sqrt(constant));

    var ratings = new Array();
    for each (var n in nodes) {
		console.log("... "+n.id);
		if (n.id == 0) continue;

        var w = recursionWin(n.id, 0);
        var l = recursionLoss(n.id, 0);
        ratings.push( [n.name, w-l, w, l, n.win.length,n.loss.length,n.id] );
//		console.log(n.name+" -- "+n.win.length+"= "+w+" | "+n.loss.length+"= "+l+" -="+n.id+"=-");
    }
    
    for (var i=0; i<ratings.length-1; i++) {
        for (var j=i+1; j<ratings.length; j++) {
            if (ratings[j][1] > ratings[i][1]) {
                var temp = ratings[i];
                ratings[i] = ratings[j];
                ratings[j] = temp;
            }
        }
    }

    var str = "<br><div class='medium_head'>Directed Graph Rankings</div>";
	str += "<table><tr class='nonalternating_color'><td>Rank</td><td>Team</td><td>Record</td><td>Games</td><td>Wins</td><td>Losses</td></tr>";
    var ct = 0;
    for (var i=0; i< ratings.length; i++) {
        if (ratings[i][4]+ratings[i][5] < min) continue;
        ct++;
        str += "<tr class='alternating_color"+(ct%2+1)+"'><td><h2>"+(ct)+"</h2></td><td><a href='team.pl?team_id="+ratings[i][6]+"'>"+ratings[i][0]+"</a>";
        str += "<td>"+ratings[i][4]+"-"+ratings[i][5]+"</td>";
        str += "<td>"+ratings[i][1].toFixed(2)+"</td>";
        str += "<td>"+ratings[i][2].toFixed(2)+"</td><td>"+ratings[i][3].toFixed(2)+"</td>";
		str += "</tr>";
	    //str += "<div>"+(i+1)+") "+ratings[i][0]+" | "+ratings[i][1]+" -- "+ratings[i][2]+" / "+ratings[i][3]+"</div><br>";
//    	console.log(i+") "+ratings[i][0]+" -- "+ratings[i][1]+" -- "+ratings[i][2]+"/"+ratings[i][3]);
    }
    str += "</table>";

	var div = document.getElementById("graph_ranking_results");
	div.innerHTML = str;

	var btn = document.getElementById("graph_ranking_button");
	btn.disabled = false;
}

function recursionWin(t, depth) {
	var node = nodes[t];
    var score = node.win.length;
    if (depth < maxDepth) {
        for (var i=0; i<node.win.length; i++) {
			var t =  recursionWin(node.win[i].id, depth+1);
//			console.log(depth+" =W=> "+score+"+"+t+" ::: "+alphaWin);
			score += t;
        }
    }
//	return score*Math.pow(2,(depth+1)*-1);
	return score*Math.pow(maxDepth-depth+1,(depth+1)*-1);
}

function recursionLoss(t, depth) {
	var node = nodes[t];
    var score = node.loss.length;
    if (depth < maxDepth) {
        for (var i=0; i<node.loss.length; i++) {
			var t =  recursionLoss(node.loss[i].id, depth+1);
//			console.log(depth+" =L=> "+score+"+"+t+" ::: "+alphaLoss);
			score += t;
        }
    }
//	return score*Math.pow(2,(depth+1)*-1);
	return score*Math.pow(maxDepth-depth+1,(depth+1)*-1);
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
//            console.log("loaded: "+address)
            func(address,this);
        }
    };

    req.send(null);
    return req;
}

