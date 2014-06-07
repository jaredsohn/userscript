// ==UserScript==
// @name           Player Award Ranking On Roster Page
// @namespace      pbr/par
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.12.18
// ==/UserScript==

window.setTimeout( function() {
	setupTabs();

    var input = document.createElement("input");
    input.type = "button";
    input.value = "Load Awards";

    var content = document.getElementById("content_awards");
    content.insertBefore(input, content.childNodes[0]);

    input.addEventListener("click",main,false);
}, 1000);

var atts = ["Pos","Name","Conf O","Conf D","Conf ST","Pos O","Pos D","Pos ST","Global O","Global D","Global ST"];

function setupTabs() {
	var div = document.createElement("div");
	div.setAttribute("id","tab_awards");
	div.setAttribute("class","subtab_off");
	div.innerHTML = "<a onclick=\"changeTab('awards', 1)\" href=\"javascript:;\">Awards</a>";

	var content = document.createElement("div");
	content.setAttribute("id","content_awards");
	content.setAttribute("class","content_container");
	content.style.display = "none"
	content.style.visibility = "hidden";
	
	var titles = ["blah","Offense","Defense","Kicker"];
	for (var i=1; i<4; i++) {
		var title = document.createElement("div");
		title.setAttribute("class","medium_head");
		title.innerHTML = titles[i]+" Awards";
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
		table.rows[0].cells[1].style.width = "200px";
		content.appendChild(table);

	}

	document.getElementById("content").appendChild(content);
	var tabs = document.getElementsByClassName("tabs")[0];
	tabs.appendChild(div);
}

function main() {
	var attContent = document.getElementById("content_awards");
	var a = attContent.getElementsByTagName("a");
	for (var i=0; i<a.length; i++) {
	    if (a[i].href.toString().indexOf("/game/player.pl") != -1) {
	        getInetPage(a[i].href.toString().replace("player.pl","player_awards.pl"),handlePlayer);
	    }
	}
}

function handlePlayer(address, page) {
    var div = document.createElement("div");
    div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

	var attributes = [];
	var cls = div.getElementsByClassName("large_info");
	for (var i=6; i<cls.length; i++) {
		var n = parseFloat(cls[i].innerHTML);
		if (isNaN(n) == false) {
			attributes.push(n);
		}
		else {
			attributes.push(cls[i].firstChild.innerHTML);
		}
	}

	var pid = address.split("=")[1];
	var attContent = document.getElementById("content_awards");
    var a = attContent.getElementsByTagName("a");
    for (var i=0; i<a.length; i++) {
        if (a[i].href.toString().split("=")[1] == pid) {
			var tr = a[i].parentNode.parentNode.parentNode;
			for (var j=0; j<attributes.length; j++) {
				var td = document.createElement("td");
				td.innerHTML = attributes[j];
				tr.appendChild(td);
			}
			break;
        }
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

