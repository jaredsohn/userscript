// ==UserScript==
// @name           Attributes On Roster Page
// @namespace      pbr
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @include        http://glb.warriorgeneral.com/game/roster.pl?team_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// ==/UserScript==

window.setTimeout( function() {
	setupTabs();

    var input = document.createElement("input");
    input.type = "button";
    input.value = "Load Attributes";

    var content = document.getElementById("content_attributes");
    content.insertBefore(input, content.childNodes[0]);

    input.addEventListener("click",main,false);
}, 2000);

var totalPlayers = 0;
var atts = ["Pos","Name","Eff","Age","Val","Fame","Str","Spd","Agi","Jmp","Sta","Vis", "Cnf","Blk","Tck","Thr","Cat","Car","Kck","Pnt"];
var attNames = ["Strength","Speed","Agility","Jumping","Stamina","Vision","Confidence",
				"Blocking","Tackling","Throwing","Catching","Carrying","Kicking","Punting"];

function setupTabs() {
	var div = document.createElement("div");
	div.setAttribute("id","tab_attributes");
	div.setAttribute("class","subtab_off");
	div.innerHTML = "<a onclick=\"changeTab('attributes', 1)\" href=\"javascript:;\">Attributes</a>";

	var content = document.createElement("div");
	content.setAttribute("id","content_attributes");
	content.setAttribute("class","content_container");
	content.style.display = "none"
	content.style.visibility = "hidden";

	var titles = ["blah","Offense","Defense","Kicker"];
	for (var i=1; i<4; i++) {
		var title = document.createElement("div");
		title.setAttribute("class","medium_head");
		title.innerHTML = titles[i]+" Attributes";
		content.appendChild(title);

		var table = document.createElement("table");
		table.setAttribute("class","players rowstyle-alternating_color2 onload-zebra no-arrow");

		var thead = document.createElement("thead");
		var tr = document.createElement("tr");
		for (var j=0; j<atts.length; j++) {
			var th = document.createElement("th");
			th.setAttribute("class","sortable-numeric fd-column-"+j);
			th.innerHTML = "<a class=\"fdTableSortTrigger\" title=\"Sort on “"+atts[j]+"”\" href=\"#\">"+atts[j]+"</a>";
			tr.appendChild(th);
		}
		thead.appendChild(tr);

		var roster = document.getElementById("fd-table-"+i);
		for (var j=1; j<roster.rows.length; j++) {
//console.log(roster.rows[j].innerHTML);
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
	var div = document.createElement("div");
	div.setAttribute("id","agefooter");
	document.getElementById("footer").appendChild(div);

	var attContent = document.getElementById("content_attributes");
	var a = attContent.getElementsByTagName("a");
	for (var i=0; i<a.length; i++) {
	    if (a[i].href.toString().indexOf("/game/player.pl") != -1) {
			if (a[i].parentNode.innerHTML.indexOf('class="cpu"') == -1) {
				totalPlayers++;
			}
	    }
	}

	var a = attContent.getElementsByTagName("a");
	for (var i=0; i<a.length; i++) {
	    if (a[i].href.toString().indexOf("/game/player.pl") != -1) {
			if (a[i].parentNode.innerHTML.indexOf('class="cpu"') == -1) {
		        getInetPage(a[i].href.toString(),handlePlayer);
			}
	    }
	}
}

function handlePlayer(address, page) {
    var div = document.createElement("div");
    div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

    var attributes = new Array();
	var lvl = parseInt(div.getElementsByClassName("current_stats_value")[0].innerHTML);
    var eff = div.getElementsByClassName("current_stats_value")[0];
	eff = parseInt(eff.innerHTML.split("Level: ")[1]);
	if (eff > (lvl+5)) {
	    attributes.push('<div style="color:blue">'+eff+'</div>');
	}
	else if (eff > (lvl+2)) {
	    attributes.push('<div style="color:green">'+eff+'</div>');
	}
	else if (eff < (lvl-2)) {
	    attributes.push('<div style="color:red">'+eff+'</div>');
	}
	else {
	    attributes.push(eff);
	}

	var fame = div.getElementsByClassName("current_stats_fame")[0];
	if (fame != null) fame = parseInt(fame.innerHTML);
	else fame = "";

	var ftr = document.createElement("div");
	ftr.setAttribute("class","age");
	ftr.innerHTML = -1;

	var age = parseFloat(div.getElementsByClassName("vital_data")[2].firstChild.innerHTML.split("d")[0]);
	attributes.push(age);

	var val = parseFloat(div.getElementsByClassName("current_stats_value")[0].lastChild.firstChild.innerHTML);
	lvl=1; //fix me
	attributes.push((val/lvl).toFixed(1));
	ftr.innerHTML = age;

	document.getElementById("agefooter").appendChild(ftr);

	var atts = [];
	var list = div.getElementsByClassName("stat_head_tall");
	for (var i=0; i<list.length; i++) {
		atts[list[i].innerHTML.split(":")[0]] = parseFloat(list[i].nextSibling.innerHTML);
	}
	
	var tidx = div.getElementsByClassName("column_320").length-1;
	var table = div.getElementsByClassName("column_320")[tidx];
//	console.log(tidx+" --- "+table.innerHTML.slice(80));
	if (table != null) {
		var splits = table.innerHTML.split("<td>");
		for (var i=1; i<splits.length-1; i=i+2) {
			if (atts[splits[i].split("<")[0]] != null) {
				var a = atts[splits[i].split("<")[0]];
				var change = parseFloat(splits[i+1].split("<")[0]);
//				console.log(a+" + "+change+" = "+(a+change));
				atts[splits[i].split("<")[0]] = a+change;
			}
		}
	}

	attributes.push(fame);
	var idx = 0;
	while (attributes.length < 18) {
		var val = atts[attNames[idx]];
//		console.log(attNames[idx]+" -- "+(idx)+" -- "+val);
		if (val == null) attributes.push("-");
		else attributes.push(val.toFixed(0));
		idx++;
//		console.log("atts="+attributes);
	}

	try {
		var agent = div.getElementsByClassName("vital_data")[5].innerHTML;
		attributes.push(agent);
	}
	catch (e) {
		attributes.push("CPU");
	}

    var attContent = document.getElementById("content_attributes");
    var a = attContent.getElementsByTagName("a");
    for (var i=0; i<a.length; i++) {
        if (a[i].href.toString() == address) {
			var tr = a[i].parentNode.parentNode.parentNode;
            for (var att=0; att<attributes.length-1; att++) {
                var td = document.createElement("td");
                td.innerHTML = "<div style='text-align:center'>"+attributes[att]+"</div>";
                tr.appendChild(td);
            }
        }
    }

	var ages = document.getElementsByClassName("age");
	if (ages.length == totalPlayers) {
		var age = 0;
		var players = 0;
		for (var i=0; i<ages.length; i++) {
			if (parseInt(ages[i].innerHTML) > 0) {
				players++;
				age += parseInt(ages[i].innerHTML);
			}
		}

		var div = document.createElement("div");
		div.setAttribute("style", "width: 300px; float: left");
		var child = document.createElement("div");
		child.setAttribute("class","small_head");
		child.innerHTML = "Avg. Player Age:";
		div.appendChild(child);
		div.innerHTML += (age/players).toFixed(0);

		var cont = document.getElementsByClassName("content_container")[0];
		cont.insertBefore(div, cont.childNodes[cont.childNodes.length-4]);

		document.getElementById("footer").removeChild(document.getElementById("agefooter"));
	}
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

