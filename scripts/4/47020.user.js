// ==UserScript==
// @name           GLB Game Log Totals
// @namespace      pbr
// @include        http://goallineblitz.com/game/player_game_log.pl?*player_id=*
// @include        http://glb.warriorgeneral.com/game/player_game_log.pl?*player_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// ==/UserScript==

var blowout = 55;
var titles = ["Scrim","Seas","Post","Diff <"+blowout,"Diff >"+blowout];

window.setTimeout(
    function() {
        game_log_main();
    },
    500
);

function game_log_main() {
    var table = document.getElementById("career_stats");
    table.style.display = "none";

    tableSetup();
    getStats();

    var table = document.getElementById("career_stats");
    table.style.display = "";
}

function Game() {
    this.week = null;
    this.team = null;
    this.teamLink = null;
    this.res = null;
    this.diff = null;
    this.stats = new Array();

    this.toString = function() {
        return (this.week+" : "+this.team+"("+this.teamLink.href.split("=")[1]+" vs. "+this.oppLink.href.split("=")[1]+") -"+this.res+"- "+this.diff+" -- "+this.stats.toString());
    }
}

function getStats() {
    var games = new Array();
    var table = document.getElementById("career_stats");
    for (var i=2; i<table.rows.length; i++) {
        if ((table.rows[i].id.indexOf("total_") == -1) &&
            (table.rows[i].className.indexOf("nonalternating") == -1)) {
            games.push(getGame(table.rows[i]));
        }
    }

    var scrim = new Array();
    var seas = new Array();
    var post = new Array();
    var bl = new Array();
    var nbl = new Array();

    for (var i=0; i<games.length; i++) {
        var g = games[i];
//console.log(g.toString());
        
        if (g.week == 0) {
            scrim.push(g);
        }
        else if (g.week < 17) {
            seas.push(g);
            if (g.diff < blowout) {
				nbl.push(g);
			}
            else {
				bl.push(g);
			}
        }
        else {
            var found = false;
            for (var j=0; j<seas.length; j++) {
                if (seas[j].oppLink.href == g.oppLink.href) {
                    post.push(g);
                    found = true;
                    break;
                }
            }
            if (found == false) {
				if (g.week == 20) {
					var champion = true;
					for (var gidx=games.length-4; gidx<games.length-1; gidx++) {
//console.log(games[gidx].toString()+" <> "+games[gidx].res);
						if (games[gidx].res == "L") {
							champion = false;
							break;
						}
			 	    }
					if (champion == true) {
						post.push(g);
					}
				    else {
						scrim.push(g);
				    }
	   	        }
				else {
					scrim.push(g);
				}
		    }
        }
    }

//    console.log(scrim.length+" - "+seas.length+" - "+post.length+" - "+nbl.length+" - "+bl.length);
    var types = [scrim,seas,post,nbl,bl];
    for (var i=0; i<types.length; i++) {
        if (types[i].length == 0) continue;
        var total = getTotal(types[i]);
//console.log(titles[i]+" : "+total);
        var el = document.getElementById("total_"+titles[i]);
        insertTotals(el, types[i], total);

        var teams = getTeams(types[i]);
        if (teams.length > 1) {
            el.cells[1].setAttribute("align","left");
            el.cells[1].innerHTML = "---";
            for (var t=0; t<teams.length; t++) {
                var tr = document.createElement("tr");
                tr.setAttribute("class",el.getAttribute("class"));
                for (var j=0; j<el.cells.length; j++) {
                    tr.insertCell(0);
                    tr.cells[j].setAttribute("align",el.cells[j].getAttribute("align"));
                }
                var a = document.createElement("a");
                a.href = teams[t][0].teamLink;
                a.textContent = teams[t][0].team;
                tr.cells[1].appendChild(a);
                
                insertTotals(tr, teams[t], getTotal(teams[t]));
                table.insertBefore(tr, el.nextSibling);
            }
        }
    }
}

var start = 4;

function insertTotals(el, g, t) {
    el.cells[2].setAttribute("align","left");
    el.cells[2].innerHTML = g.length;

    var win = 0;
    for (var i=0; i<g.length; i++) {
        if (g[i].res == "W") win++;
    }
    el.cells[3].setAttribute("align","center");
    el.cells[3].innerHTML = win+"-"+(g.length-win);

	var start=5;
    for (var i=start; i<el.cells.length; i++) {
        el.cells[i].setAttribute("align","right");
        if (t[i-start] != null) {
            el.cells[i].innerHTML = t[i-start];
        }
        else {
            el.cells[i].innerHTML = "&nbsp;";
        }
    }
}

function getTeams(g) {
    var idx = -1;
    var ids = new Array();
    var teams = new Array();
    for (var i=0; i<g.length; i++) {
        idx = ids.indexOf(g[i].team);
//        console.log(ids+" -- "+idx);
        if (idx == -1) {
            idx = ids.length;
            ids.push(g[i].team);
            teams[idx] = new Array();
        }
        teams[idx].push(g[i]);
    }
/*
    console.log(teams.length);
    for (var i=0; i<teams.length; i++) {
        console.log(teams[i]+" --> "+teams[i].length);
    }
*/
    return teams;
}

function getTotal(g) {
    var pos = document.getElementsByClassName("position")[0].innerHTML;

    var result = new Array();
    switch (pos) {
        case "C" : ;
        case "G" : ;
        case "OT" : result = olTotal(g);
                    break;
        case "QB" : result = qbTotal(g);
                    break;
        case "HB" : ;
        case "FB" : result = rbTotal(g);
                    break;
        case "TE" : result = teTotal(g);
                    break;
        case "WR" : result = wrTotal(g);
                    break;
        case "DT" : ;
        case "DE" : ;
        case "LB" : ;
        case "FS" : ;
        case "SS" : result = defTotal(g);
                    break;
        case "CB" : result = cbTotal(g);
                    break;
        case "P" : result = pTotal(g);
                    break;
        case "K" : result = kTotal(g);
                    break;
    }
    return result;
}

function defTotal(g) {
    var result = new Array();
    if (g.length == 0) return result;
    
    for (var i=0; i<g[0].stats.length; i++) {
        result[i] = 0;
    }

    for (var i=0; i<g.length; i++) {
        for (var j=0; j<result.length; j++) {
			if (g[i].stats[j] != null) {
	            result[j] += parseInt(g[i].stats[j]);
			}
        }
    }
    return result;
}

function olTotal(g) {
    var result = defTotal(g);
    return result;
}

function cbTotal(g) {
    var result = defTotal(g);
    result[7] = avg(result, 5, 6);
    result[11] = avg(result, 9, 10);
    result[6] = result[6].toFixed(0);
    result[10] = result[10].toFixed(0);
    return result;
}
function qbTotal(g) {
    var result = defTotal(g);
    result[3] = (100*result[1] / result[2]).toFixed(1);
    result[5] = avg(result, 2, 4);
    result[11] = avg(result, 9, 10);
    result[0] = qbrating(result).toFixed(1);
    
    result[4] = result[4].toFixed(0);
    result[10] = result[10].toFixed(0);
    return result;
}
function rbTotal(g) {
    var result = defTotal(g);
    result[2] = avg(result, 0, 1);
    result[6] = avg(result, 4, 5);
    result[7] = yac(g, 4, 7);
    result[1] = result[1].toFixed(0);
    result[5] = result[5].toFixed(0);
    return result;
}
function wrTotal(g) {
    var result = defTotal(g);
    result[2] = avg(result, 0, 1);
    result[7] = avg(result, 5, 6);
    result[11] = avg(result, 9, 10);
    result[3] = yac(g, 0, 3);
    result[1] = result[1].toFixed(0);
    result[6] = result[6].toFixed(0);
    result[10] = result[10].toFixed(0);
    return result;
}
function teTotal(g) {
    var result = defTotal(g);
    result[2] = avg(result, 0, 1);
    result[3] = yac(g, 0, 3);
    result[1] = result[1].toFixed(0);
    result[6] = result[6].toFixed(0);
    return result;
}
function pTotal(g) {
    var result = defTotal(g);
    result[2] = avg(result, 0, 1);
    result[1] = result[1].toFixed(0);
    return result;
}
function kTotal(g) {
    var result = defTotal(g);
    for (var i=2; i<7; i++) {
        result[i] = fgTotal(g,i);
    }
    return result;
}

function fgTotal(g, idx) {
    var fg = 0;
    var att = 0;
    for (var i=0; i<g.length; i++) {
        fg += parseInt(g[i].stats[idx]);
        att += parseInt(g[i].stats[idx].split("/")[1]);
    }
    return fg+"/"+att;
}

function avg(arr, a, y) {
    var res = (arr[y] / arr[a]).toFixed(1);
    if (isNaN(res) == true) {
        res = "0.0";
    }
    return res;
}
function yac(g, r, y) {
    var rec = 0;
    var yac = 0;
    for (var i=0; i<g.length; i++) {
        rec += g[i].stats[r];
        yac += g[i].stats[r]*g[i].stats[y];
    }
    if (rec == 0) return "0.0";
    return (yac/rec).toFixed(1);
}
function qbrating(arr) {
    var x = arr[1] / arr[2];
    x -= 0.3;
    x /= 0.2;
    x = Math.max(x,0);
    x = Math.min(x,2.375);

    var y = arr[4] / arr[2];
    y -= 3;
    y /= 4;
    y = Math.max(y,0);
    y = Math.min(y,2.375);

    var z = arr[6] / arr[2];
    z /= 0.05;
    z = Math.max(z,0);
    z = Math.min(z,2.375);

    var w = arr[7] / arr[2];
    w = 0.095 - w;
    w /= 0.04;
    w = Math.max(w,0);
    w = Math.min(w,2.375);
    //console.log(x+" - "+y+" - "+z+" - "+w);
    rating = (x+y+z+w)*100/6;
    rating = Math.round(rating*10);
    rating /= 10;
    return rating;
}

function getGame(row) {
    var g = new Game();
    g.week = row.cells[0].textContent;
    g.team = row.cells[1].firstChild.innerHTML;
    g.teamLink = row.cells[1].firstChild;
    g.opp = row.cells[2].firstChild.innerHTML;
    g.oppLink = row.cells[2].firstChild;
    g.res = row.cells[3].firstChild.innerHTML.slice(0,1);

    var diff = row.cells[3].firstChild.innerHTML;
    diff = diff.slice(1).split("-");
    g.diff = Math.max(parseInt(diff[0]),parseInt(diff[1])) - Math.min(parseInt(diff[0]),parseInt(diff[1]));

    g.stats = new Array();
//	if (isNaN(parseFloat(row.cells[4].textContent)) == true) start++;
	var start=5;
    for (var i=start; i<row.cells.length; i++) {
        if (row.cells[i].textContent.indexOf("/") == -1) {
            g.stats.push(parseFloat(row.cells[i].textContent));
        }
        else {
            g.stats.push(row.cells[i].textContent);
        }
    }
    return g;
}

function tableSetup() {
    var table = document.getElementById("career_stats");
    if (table == null) return;
    var count = table.rows[1].cells.length;

    var tr = document.createElement("tr");
    tr.setAttribute("class","nonalternating_color2");
    for (var i=0; i<count; i++) {
        var td = tr.insertCell(tr.cells.length);
        var align = "right";
        if (i < 3) align = "left";
        else if (i == 3) align = "center";
        td.setAttribute("align",align);
        if (i == 1) td.innerHTML = "Team";
        else if (i == 2) td.innerHTML = "G";
        else if (i == 3) td.innerHTML = "W-L";
        else if (i < 4) td.innerHTML = '&nbsp;';
        else td.innerHTML = table.rows[1].cells[i].innerHTML;
    }
    table.appendChild(tr);

    for (var j=0; j<5; j++) {
        var tr = document.createElement("tr");
        tr.setAttribute("class","alternating_color"+((j%2)+1));
        tr.setAttribute("id","total_"+titles[j]);
        for (var i=0; i<count; i++) {
            var td = tr.insertCell(0);
            td.innerHTML = '&nbsp;';
        }
        tr.cells[0].setAttribute("style","font-weight:bold");
        tr.cells[0].innerHTML = titles[j];
        table.appendChild(tr);

        if (j == 2) {
            var tr = document.createElement("tr");
            tr.setAttribute("class","nonalternating_color2");
            for (var i=0; i<count; i++) {
                var td = tr.insertCell(tr.cells.length);
                td.innerHTML = '&nbsp;';
            }
            table.appendChild(tr);
        }
    }

    var tr = document.createElement("tr");
    tr.setAttribute("class","nonalternating_color2");
    for (var i=0; i<count; i++) {
        var td = tr.insertCell(tr.cells.length);
        td.innerHTML = '&nbsp;';
    }
    table.appendChild(tr);
}

