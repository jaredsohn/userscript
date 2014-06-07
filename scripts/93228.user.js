// ==UserScript==
// @name           Depth Chart Position On Roster Page
// @namespace      pbr/dcp
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.12.21
// ==/UserScript==

window.setTimeout( function() {
	setupTabs();

    var input = document.createElement("input");
    input.type = "button";
    input.value = "Load Depth Chart";
	input.id = "buttonLoadDepthChart";

    var input2 = document.createElement("input");
	input2.type.checked = false;
    input2.type = "checkbox";
    input2.value = "Load Special Teams";
	input2.id = "buttonLoadSecialTeams";
	input2.style.marginLeft = "5px";
    var text = document.createElement("text");
    text.textContent = " Load Special Teams";

    var content = document.getElementById("content_depth");
    content.insertBefore(text, content.childNodes[0]);
    content.insertBefore(input2, content.childNodes[0]);
    content.insertBefore(input, content.childNodes[0]);

    input.addEventListener("click",main,false);
}, 1000);

var attsO = ["Pos","Name","Lvl","QB","HB","FB","WR","WR1","WR2","WR3","WR4","WR5","TE","C","LOT","ROT","LG","RG"];
var attsD = ["Pos","Name","Lvl","NT","DT","LDE","RDE","LOLB","LILB","RILB","ROLB","CB","CB1","CB2","CB3","CB4","CB5","SS","FS"];
var attsK = ["Pos","Name","Lvl","K","P"];
var attsKO = ["Pos","Name","Lvl","KOS","OU1","OU2","OU3","OU4","OU5","OU6","IN1","IN2","IN3","IN4"];
var attsKR = ["Pos","Name","Lvl","KRS","OU1","OU2","OU3","OU4","FW1","FW2","FW3","BW1","BW2","BW3","KR"];
var attsP = ["Pos","Name","Lvl","LT","LG","LS","RG","RT","SE1","SE2","SB1","SB2","PP"];
var attsPR = ["Pos","Name","Lvl","SE1","SE2","ER1","ER2","DL1","DL2","DL3","DL4","PP1","PP2","PR"];
var attsFG = ["Pos","Name","Lvl","UB1","TE1","LT","LG","LS","RG","RT","TE2","UB2","PH"];
var attsFGB = ["Pos","Name","Lvl","DE1","DT1","NT","DT2","DE2","LB1","LB2","LB3","FS","FL1","FL2"];


var fullRoster = "";

function setupTabs() {
	fullRoster = document.createElement("thead");

	var div = document.createElement("div");
	div.setAttribute("id","tab_depth");
	div.setAttribute("class","subtab_off");
	div.innerHTML = "<a onclick=\"changeTab('depth', 1)\" href=\"javascript:;\">Depth</a>";

	var content = document.createElement("div");
	content.setAttribute("id","content_depth");
	content.setAttribute("class","content_container");
	content.style.display = "none"
	content.style.visibility = "hidden";

	var headings = [attsO,attsD,attsK];
	var titles = ["blah","Offense","Defense","Kicker"];
	for (var i=1; i<titles.length; i++) {
		var title = document.createElement("div");
		title.setAttribute("class","medium_head");
		title.innerHTML = titles[i]+" Depth";
		content.appendChild(title);

		var table = document.createElement("table");
		table.setAttribute("class","players rowstyle-alternating_color2 onload-zebra no-arrow");

		var thead = document.createElement("thead");
		var tr = document.createElement("tr");
		for (var j=0; j<headings[i-1].length; j++) {
			var th = document.createElement("th");
			th.setAttribute("class","sortable-numeric fd-column-"+j);
			th.innerHTML = "<a class=\"fdTableSortTrigger\" title=\"Sort on “"+headings[i-1][j]+"”\" href=\"#\">"+headings[i-1][j]+"</a>";
			tr.appendChild(th);
		}
		thead.appendChild(tr);

		var roster = document.getElementById("fd-table-"+i);
		for (var j=1; j<roster.rows.length; j++) {
			var tr = document.createElement("tr");
			tr.setAttribute("class","alternating_color"+(((j+1)%2)+1));

			var td1 = document.createElement("td");
			td1.setAttribute("class",roster.rows[j].cells[7].className);
			td1.innerHTML = roster.rows[j].cells[7].innerHTML;
			tr.appendChild(td1);

			var td2 = document.createElement("td");
			td2.setAttribute("class",roster.rows[j].cells[3].className);
			td2.innerHTML = roster.rows[j].cells[3].innerHTML.split("<img")[0];
			tr.appendChild(td2);

			fullRoster.appendChild(tr.cloneNode(true));
			thead.appendChild(tr);
		}

		table.appendChild(thead);	
		table.rows[0].cells[0].setAttribute("class",table.rows[0].cells[0].getAttribute("class").replace("-numeric","-text"));
		table.rows[0].cells[1].setAttribute("class",table.rows[0].cells[1].getAttribute("class").replace("-numeric","-text"));
		table.rows[0].cells[1].style.width = "250px";
		content.appendChild(table);

	}

	document.getElementById("content").appendChild(content);
	var tabs = document.getElementsByClassName("tabs")[0];
	tabs.appendChild(div);
}

function main() {
	var btn = document.getElementById("buttonLoadDepthChart");
	btn.disabled = true;
	var btn2 = document.getElementById("buttonLoadSpecialTeams");
	btn.disabled = true;

	var addr = "http://goallineblitz.com/game/depth_chart.pl?team_id=";
	getInetPage(addr+window.location.toString().split("=")[1], handleDepthChart);
}

function handleDepthChart(address, page) {
	var code = page.responseText;
	code = code.split("<script>")[1].split("</script>")[0];
//	console.log(code);
	var roster = [];
	var rosterById = [];
	var positionIds = [];

	eval(code);
	positionIds["krkr"] = positionIds["kr"];
	positionIds["prpr"] = positionIds["pr"];
	positionIds["pls"] = positionIds["ls"];
	positionIds["fgph"] = positionIds["ph"];

	var content = document.getElementById("content_depth");

	//add offense
	insertion(content.getElementsByTagName("table")[0], attsO, positionIds);	

	//add defense
	insertion(content.getElementsByTagName("table")[1], attsD, positionIds);	

	//add kicker
	insertion(content.getElementsByTagName("table")[2], attsK, positionIds);	

	var btn = document.getElementById("buttonLoadSecialTeams");
	if (btn.checked == true) {
		var headings = [attsKO, attsKR, attsP, attsPR, attsFG, attsFGB];
		var titles = ["blah", "Kickoff", "Kickoff Return", "Punt", "Punt Return", "Field Goal", "Field Goal Block"];
		for (var i=1; i<titles.length; i++) {
			var title = document.createElement("div");
			title.setAttribute("class","medium_head");
			title.innerHTML = titles[i]+" Depth";
			content.appendChild(title);

			var table = document.createElement("table");
			table.setAttribute("class","players rowstyle-alternating_color2 onload-zebra no-arrow");
			table.style.visibility = "hidden";
			table.style.display = "none";

			table.appendChild(fullRoster.cloneNode(true));

			var tr = table.insertRow(0);
			for (var j=0; j<headings[i-1].length; j++) {
				var th = document.createElement("th");
				th.setAttribute("class","sortable-numeric fd-column-"+j);
				th.innerHTML = "<a class=\"fdTableSortTrigger\" title=\"Sort on “"+headings[i-1][j]+"”\" href=\"#\">"+headings[i-1][j]+"</a>";
				tr.appendChild(th);
			}

			table.rows[0].cells[0].setAttribute("class",table.rows[0].cells[0].getAttribute("class").replace("-numeric","-text"));
			table.rows[0].cells[1].setAttribute("class",table.rows[0].cells[1].getAttribute("class").replace("-numeric","-text"));
			table.rows[0].cells[1].style.width = "250px";
			content.appendChild(table);
		}

		//add s-teams
		insertion(content.getElementsByTagName("table")[3], attsKO, positionIds);
		insertion(content.getElementsByTagName("table")[4], attsKR, positionIds, "kr");
		insertion(content.getElementsByTagName("table")[5], attsP, positionIds, "p");
		insertion(content.getElementsByTagName("table")[6], attsPR, positionIds, "pr");
		insertion(content.getElementsByTagName("table")[7], attsFG, positionIds, "fg");
		insertion(content.getElementsByTagName("table")[8], attsFGB, positionIds, "fg");
	}
	fullRoster = null;

	//add levels
	var content = document.getElementById("content_depth");
	var tbl = content.getElementsByTagName("table");
	for (var tidx=0; tidx<tbl.length; tidx++) {
		for (var ridx=1; ridx<tbl[tidx].rows.length; ridx++) {
			var pid = tbl[tidx].rows[ridx].cells[1].getElementsByTagName("a")[0].href.split("=")[1];
			var lvl = rosterById[pid].level;
            tbl[tidx].rows[ridx].insertCell(2);
            tbl[tidx].rows[ridx].cells[2].innerHTML = "<div style='text-align:center'>"+lvl+"</div>";
		}
	}

	var tables = content.getElementsByTagName("table");
	for (var i=0; i<tables.length; i++) {
		if (i > 2) {
			if (btn.checked == true) {
				for (var r=tables[i].rows.length-1; r>0; r--) {
					var empty = true;
					for (var c=3; c<tables[i].rows[r].cells.length; c++) {
						if (tables[i].rows[r].cells[c].firstChild.innerHTML != " - ") {
							empty = false;
							break;
						}
					}
					if (empty == true) {
						tables[i].deleteRow(r);
					}
				}
				tables[i].style.visibility = "visible";
				tables[i].style.display = "block";
			}
		}
		else {
			tables[i].style.visibility = "visible";
			tables[i].style.display = "block";
		}
	}
}

function insertion(tbl, pos, positionIds, prefix) {
	if (prefix == null) prefix = "";
	for (var ridx=1; ridx<tbl.rows.length; ridx++) {
		var pid = tbl.rows[ridx].cells[1].getElementsByTagName("a")[0].href.split("=")[1];

		for (var i=3; i<pos.length; i++) {
			var a = prefix+pos[i].toLowerCase();
            var td = document.createElement("td");
            td.innerHTML = "<div style='text-align:center'> - </div>";
			
			if (positionIds[a] != null) {
				var depth = positionIds[a].indexOf(pid);
				if (depth != -1) {
//					console.log(pid+":"+a+") "+positionIds[a]+" !!!!! "+depth);
		            td.innerHTML = "<div style='text-align:center'>"+(depth+1)+"</div>";
				}
			}
            tbl.rows[ridx].appendChild(td);
		}
	}
}

function changeTab(pos) {
	return;
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


