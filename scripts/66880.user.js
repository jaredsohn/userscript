// ==UserScript==
// @name           Griffin8r Rank
// @namespace      pbr/gr
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version		   10.03.12
// ==/UserScript==

window.setTimeout( function() {
	setup();
}, 100);

function setup() {
	var btn = document.createElement("input");
	btn.setAttribute("id","griff_ranking_button");
	btn.setAttribute("value","Run Griffn8r Ranking");
    btn.setAttribute("type","button");
	btn.disabled = false;

	var div = document.createElement("div");
	div.id = "griff_ranking";
	div.appendChild(btn);

	var res = document.createElement("div");
	res.id = "griff_ranking_results";

	var endorsements = document.getElementById("endorsements");
	endorsements.parentNode.insertBefore(div, endorsements);
	endorsements.parentNode.insertBefore(res, endorsements);
    btn.addEventListener("click",griff_ranking_main,false);
}

function griff_ranking_main() {
	var btn = document.getElementById("griff_ranking_button");
	btn.disabled = true;

	try {
		var waiting = document.createElement("div");
		waiting.id = "waiting_grf";

		var footer = document.getElementById("footer");
		footer.appendChild(waiting);

		if (window.location.toString().indexOf("league") != -1) {
			ranking_on_league();
			waitFunction();
		}
		else if (window.location.toString().indexOf("team") != -1) {
			ranking_on_team();
			waitFunction();
		}
	}
	catch (e) {
		console.log(e);
	}
}

var nodes = new Array();

function Node() {
    this.name = "Unnamed";
    this.id = -1;
    this.win = [new Array(),new Array()];
    this.loss = [new Array(),new Array()];
	this.mov = [new Array(),new Array()];
	this.mol = [new Array(),new Array()];
}

function ranking_on_team() {
	var div = document.getElementsByClassName("schedule_content")[0];

	var addresses = new Array();
	var a = div.getElementsByTagName("a");
    var add = "team.pl?team_id=";
	for (var i=0; i<a.length-1; i++) {
		if (a[i].href.toString().indexOf("team.pl") != -1) {
			console.log(a[i].href.toString());

            var idx = a[i].href.indexOf(add);
            var teamId = parseInt(a[i].href.slice(idx+add.length));
			var tname = namefix(a[i].innerHTML);

            var n = new Node();
            n.name = tname;
            n.id = teamId;
            nodes[tname] = n;

            var div = document.createElement("div");
            div.innerHTML = teamId;
            document.getElementById("waiting_grf").appendChild(div);

            var addr = "http://goallineblitz.com/game/team.pl?&team_id="+teamId;
			addresses.push(addr);

			console.log(tname+" : "+addr);
		}
	}

	for (var i=0; i<addresses.length; i++) {
	    getInetPage(addresses[i], handleTeamPage);
	}
}

function ranking_on_league() {
	var addresses = new Array();
    var conf = document.getElementsByClassName("conference_table");
    for (var i=0; i<conf.length; i++) {
        var a = conf[i].getElementsByTagName("a");
        var add = "team.pl?team_id=";
        for (var j=0; j<a.length; j++) {
            var idx = a[j].href.indexOf(add);
            if (idx != -1) {
                var teamId = parseInt(a[j].href.slice(idx+add.length));
                var tname = a[j].innerHTML.replace(/^\s*|\s*$/g,'');
				tname = tname.replace(/&#39;/g,"'");

                var n = new Node();
                n.name = tname;
                n.id = teamId;
                nodes[tname] = n;

                var div = document.createElement("div");
                div.innerHTML = teamId;
                document.getElementById("waiting_grf").appendChild(div);

                var addr = "http://goallineblitz.com/game/team.pl?&team_id="+teamId;
				addresses.push(addr);
            }
        }
    }

	for (var i=0; i<addresses.length; i++) {
	    getInetPage(addresses[i], handleTeamPage);
	}
}

function waitFunction() {
    var waiting = document.getElementById("waiting_grf");
    if (waiting.childNodes.length > 1) {
        setTimeout(waitFunction, 2500);
        console.log("["+waiting.childNodes.length+"] setTimeout");
        return;
    }
    calc();

	var btn = document.getElementById("griff_ranking_button");
	btn.disabled = false;
}

function handleTeamPage(address, page) {
    var teamName = page.responseText.split('big_head subhead_head">')[1].split("<")[0];
	teamName = namefix(teamName);
//console.log("'"+teamName+"' --- '"+teamName.substring(-1,1)+"'");
//console.log(teamName.length+" |||| "+teamName.lastIndexOf("(")+" == "+(teamName.length-1));
    if (teamName.lastIndexOf("(") == (teamName.length-1)) {
        teamName = teamName.substring(0,teamName.length-2).replace(/^\s*|\s*$/g,'');
//console.log("XXXX '"+teamName+"'");
    }
	teamName = namefix(teamName);

    var teamId = address.split("team_id=")[1];
	
//console.log(teamId+" '"+teamName+"'");
	for (var idx=1; idx<3; idx++) {
		var div = document.createElement("div");
	    var schedules = page.responseText.split("schedule_content");
		div.innerHTML = schedules[idx];

		var a = div.getElementsByTagName("a");
		for (var i=0; i<a.length-1; i=i+2) {
			var res = 0;
			var tname = a[i].innerHTML;
			tname = namefix(tname);

			var id = parseInt(a[i].href.toString().split("=")[1]);

			if (nodes[tname] == null) {
				console.log("Opposing team is missing : "+tname+" : "+id);
                var n = new Node();
                n.name = tname;
                n.id = teamId;
                nodes[tname] = n;

                var div = document.createElement("div");
                div.innerHTML = teamId;
                document.getElementById("waiting_grf").appendChild(div);

                var addr = "http://goallineblitz.com/game/team.pl?team_id="+id;
			    getInetPage(addr, handleTeamPage);
			}

			try {
				res = a[i+1].innerHTML.split(" ")[1].split("-");
				res = parseInt(res[0]) - parseInt(res[1]);
			}
			catch (e) {
				res = 0;
			}
//console.log(idx+") "+teamName+" vs. "+tname+" -- "+id+" :: '"+res+"' "+(res > 0));

		    if (res > 0) {
				nodes[teamName].win[idx-1].push(nodes[tname]);
				nodes[teamName].mov[idx-1].push(res);
			}
			else if (res < 0) {
				nodes[teamName].loss[idx-1].push(nodes[tname]);
				nodes[teamName].mol[idx-1].push(res);
			}
		}

		if (page.responseText.indexOf("Playoff Games") == -1) break;
	}
    
    var div = document.getElementById("waiting_grf");
    for (var i=0; i<div.childNodes.length; i++) {
        if (div.childNodes[i].innerHTML == teamId) {
            div.childNodes[i].parentNode.removeChild(div.childNodes[i]);
        }
    }
}

function calc() {
	var ratings = new Array();

    var ratingsA = new Array();
    for each (var n in nodes) {
//console.log(n.name+" -- "+n.win[0].length+"= "+tw+" | "+n.loss[0].length+"= "+tl+" | "+total);
		var tw = 0;
		for (var i=0; i<n.mov[0].length; i++) {
//console.log(i);
			var opp = Math.pow(n.win[0][i].win[0].length,2) / Math.pow(n.win[0][i].loss[0].length,2);
			tw = tw + Math.min(n.mov[0][i],63) * opp;
		}

		var tl = 0;
		for (var i=0; i<n.mol[0].length; i++) {
			var opp = Math.pow(n.loss[0][i].loss[0].length,2) / Math.pow(n.loss[0][i].win[0].length,2);
			tl = tl + n.mol[0][i] * opp;
		}

		var total = tw + tl;

		if (total > 0) {
			ratingsA[n.name] = total/(n.loss[0].length+1);
		}
		else {
			ratingsA[n.name] = total;
		}
    }

	var pmin = 0;
	var ratingsP = new Array();
    for each (var n in nodes) {
		var tw = 0;
		for (var i=0; i<n.mov[1].length; i++) {
			var opp = Math.pow(n.win[1][i].win[0].length+n.win[1][i].win[1].length,2) / 
				      Math.pow(n.win[1][i].loss[0].length+n.win[1][i].loss[1].length,2);
			tw = tw + Math.min(n.mov[1][i],63) * opp;
		}

		var tl = 0;
		for (var i=0; i<n.mol[1].length; i++) {
			var opp = Math.pow(n.loss[0].length+n.loss[1].length,2) / 
					  Math.pow(n.win[0].length+n.win[1].length,2);
			tl = tl + n.mol[1][i] * opp;
		}

		var total = tw + tl;
//console.log(n.name+" -- "+n.win.length+"= "+tw+" | "+n.loss.length+"= "+tl+" | "+total);
//		ratingsP[n.name] = total;
		ratingsP[n.name] = Math.max(total,0);

		if (total < pmin) pmin = total;
	}
/*
	if (pmin < 0) {
		for each (var n in nodes) {
			if (ratingsP[n.name] != 0) {
				ratingsP[n.name] -= 0;//pmin;
			}
		}
	}
*/
	for each (var n in nodes) {
		ratings.push([n.name,ratingsA[n.name]+ratingsP[n.name]]);
	}

	for (var i=0; i<ratings.length-1; i++) {
		for (var j=i+1; j<ratings.length; j++) {
			if (ratings[i][1] < ratings[j][1]) {
				var temp = ratings[i];
				ratings[i] = ratings[j];
				ratings[j] = temp;
			}
		}
	}

	var output = "<br><div class='medium_head'>Griffin8r Rankings</div><table>";
	output += "<tr class='nonalternating_color'><td>Pos</td><td>Score</td><td>Name</td><td>Season</td><td>Playoffs</td></tr>";
	for (var i=0; i<ratings.length; i++) {
		output += "<tr class='alternating_color"+(i%2+1)+"'>"
		output += "<td>"+(i+1)+"</td>";
		output += "<td>"+ratings[i][1].toFixed(0)+"</td>"
		output += "<td><a href='/game/team.pl?team_id="+nodes[ratings[i][0]].id+"'>"+ratings[i][0]+"</a></td>";
		output += "<td>"+ratingsA[ratings[i][0]].toFixed(0)+"</td>";
		output += "<td>"+ratingsP[ratings[i][0]].toFixed(0)+"</td>";
		output += "</tr>";
	}
	output += "</table>";

	var div = document.getElementById("griff_ranking_results");	
	div.innerHTML = output;
}

function getInetPage(address, func) {
    var req = new XMLHttpRequest();
    req.open( 'GET', address, true );
    req.onload = function() {
        if (this.status != 200) {
            alert("pbr gm script: Error "+this.status+" loading "+address);
        }
        else {
            func(address,this);
        }
    };

    req.send(null);
    return req;
}

function namefix(str) {
	var output = str;
	output = output.replace(/^\s*|\s*$/g,'');
	output = output.replace(/&#39;/g,"'");
	return output;
}

