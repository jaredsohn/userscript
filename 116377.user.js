// ==UserScript==
// @name           AI Output Count
// @namespace      pbr/aioc
// @include        http://goallineblitz.com/game/team_create_defense.pl*
// @version        11.10.26
// @copyright      2011, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// ==/UserScript==

var teamId = 0;

window.setTimeout(
    function() {
		getTeamId();
		main();
    }
, 500);

function main() {
    var div = document.createElement("div");

    var count = document.createElement("input");
    count.setAttribute("type","button");
	count.setAttribute("value","Show AI Count");
    count.setAttribute("id","ai_button");
	count.setAttribute("style","margin-left: 10px; margin-right: 10px");
	count.addEventListener("click",fetchAIList,false);
    div.appendChild(count);
    
    var count2 = document.createElement("input");
    count2.setAttribute("type","button");
	count2.setAttribute("value","Show Pkg Count");
    count2.setAttribute("id","pkg_button");
	count2.setAttribute("style","margin-left: 10px; margin-right: 10px");
	count2.addEventListener("click",fetchPkgList,false);
    div.appendChild(count2);

    var footer = document.getElementById("footer");
    footer.parentNode.insertBefore(div, footer);
}

function getTeamId() {
	var addr = window.location.toString();

	if (addr.indexOf("team_id=") != -1) {
		teamId = parseInt(addr.split("team_id=")[1]);
		console.log("is team "+teamId);
	}
	else {
		teamId = 0;
		console.log("is owned "+teamId);
	}
}

function fetchPkgList() {
	console.log("fetchPkgList()");
	document.getElementById("pkg_button").disabled = true;

    var address = "http://goallineblitz.com/game/team_package.pl?team_id="+teamId;

    var req = new XMLHttpRequest();
    req.open( 'GET', address, true );
    req.onload = function() {
		console.log("loaded ("+this.status+"): "+address);
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
			return [];
		}
		else {
			var div = document.createElement("div");
			div.innerHTML = this.responseText;

			var ai = []
			for each (var a in div.getElementsByTagName("a")) {
				if (a.href == null) continue;
				if ((a.href.toString().indexOf("type=d&edit=") != -1) && (a.innerHTML != "edit")) {
					var id = parseInt(a.href.toString().split("&edit=")[1]);
					ai.push([id, a.innerHTML]);
				}
			}
			console.log("ai[] = "+ai);

			for each (var id in ai) {
				if (id != null) countPkgOutput(id[0], id[1]);
			}
		}
	};
	req.send(null);
	return req;
}

function countPkgOutput(id, name) {
//	console.log("countPkgOutput("+id+","+name+")");
    var address = "http://goallineblitz.com/game/team_package.pl?team_id="+teamId+"&type=d&edit="+id;

    var table = document.getElementsByClassName("tactic_container")[0];
    table.style.visibility = "hidden";

	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address);

            var div = document.createElement("div");
			div.innerHTML = this.responseText;

			var plays = [];
			var inputs = div.getElementsByTagName("input");
			for each (var i in inputs) {
				if (i.id == null) continue;
				if (i.id.indexOf("play_id_") == 0) {
					var val = parseInt(i.value);
					if (plays[val] == null) {
						plays[val] = 0;
					}
					plays[val]++;
				}
			}

			var tbl = document.getElementById("content_All").getElementsByTagName("tbody")[0];
			var td = document.createElement("td");
			td.innerHTML = name.toString();
			tbl.rows[0].appendChild(td);

			var tbl = document.getElementById("content_All").getElementsByTagName("tbody")[0];
			for (var r=1; r<tbl.rows.length; r++) {
				var td = document.createElement("td");
				tbl.rows[r].appendChild(td);
			}

			var col = -1;
			var tbl = document.getElementById("content_All").getElementsByTagName("tbody")[0];
			for (var c=0; c<tbl.rows[0].cells.length; c++) {
				if (tbl.rows[0].cells[c].innerHTML == name) {
					col = c;
					break;
				}
			}

			var tbl = document.getElementById("content_All").getElementsByTagName("tbody")[0];
			for (var r=1; r<tbl.rows.length; r++) {
				var pid = (tbl.rows[r].cells[0].firstChild.value).toString();
				var td = tbl.rows[r].cells[col];
				if (plays[pid] == null) td.innerHTML = 0;
				else td.innerHTML = plays[pid];
			}
		}
	};

	req.send(null);
	return req;
}

function fetchAIList() {
	console.log("fetchAIList()");
	document.getElementById("ai_button").disabled = true;

    var address = "http://goallineblitz.com/game/team_ai.pl?team_id="+teamId;

    var req = new XMLHttpRequest();
    req.open( 'GET', address, true );
    req.onload = function() {
		console.log("loaded ("+this.status+"): "+address);

		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
			return [];
		}
		else {
			var div = document.createElement("div");
			div.innerHTML = this.responseText;

			var ai = []
			for each (var a in div.getElementsByTagName("a")) {
				if (a.href == null) continue;
				if (a.href.toString().indexOf("/game/team_defense_ai.pl?") != -1) {
					var id = parseInt(a.href.toString().split("&id=")[1]);
					ai.push([id, a.innerHTML]);
				}
			}
			console.log("ai[] = "+ai);

			for each (var id in ai) {
				if (id != null) countAIOutput(id[0], id[1]);
			}
		}
	}

	req.send(null);
	return req;
}

function countAIOutput(id, name) {
//	console.log("countAIOutput("+id+","+name+")");
    var address = "http://goallineblitz.com/game/team_defense_ai.pl?id="+id;

    var table = document.getElementsByClassName("tactic_container")[0];
    table.style.visibility = "hidden";

	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address);

            var div = document.createElement("div");
			div.innerHTML = this.responseText;

			var plays = [];
			var inputs = div.getElementsByTagName("input");
			for each (var i in inputs) {
				if (i.id == null) continue;
				if ((i.id.indexOf("specific_play_") == 0) && (isNaN(parseInt(i.value)) != true)) {
					var val = i.value.toString();
					if (plays[val] == null) {
						plays[val] = 0;
					}
					plays[val]++;
				}
			}

			var tbl = document.getElementById("content_All").getElementsByTagName("tbody")[0];
			var td = document.createElement("td");
			td.innerHTML = name.toString();
			tbl.rows[0].appendChild(td);

			var tbl = document.getElementById("content_All").getElementsByTagName("tbody")[0];
			for (var r=1; r<tbl.rows.length; r++) {
				var td = document.createElement("td");
				tbl.rows[r].appendChild(td);
			}

			var col = -1;
			var tbl = document.getElementById("content_All").getElementsByTagName("tbody")[0];
			for (var c=0; c<tbl.rows[0].cells.length; c++) {
				if (tbl.rows[0].cells[c].innerHTML == name) {
					col = c;
					break;
				}
			}

			var tbl = document.getElementById("content_All").getElementsByTagName("tbody")[0];
			for (var r=1; r<tbl.rows.length; r++) {
				var pid = (tbl.rows[r].cells[0].firstChild.value).toString();
				var td = tbl.rows[r].cells[col];
				if (plays[pid] == null) td.innerHTML = 0;
				else td.innerHTML = plays[pid];
			}
		}
	};

	req.send(null);
	return req;
}

