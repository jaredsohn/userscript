// ==UserScript==
// @name           GLB Survivor List
// @namespace      pbr/lsl
// @include        http://goallineblitz.com/game/leagues.pl
// @copyright      2011, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        11.08.22
// ==/UserScript==

window.setTimeout(function() {
    var button = document.createElement("input");
    button.setAttribute("value","Load Survivor");
    button.setAttribute("type","button");
    button.setAttribute("id","plbutton");
    button.addEventListener("click",main,false);    
	var content = document.getElementById("content");
	content.insertBefore(button, document.getElementById("america_map"));
	
    var button = document.createElement("input");
    button.setAttribute("value","Save");
    button.setAttribute("type","button");
    button.setAttribute("id","svbutton");
    button.addEventListener("click",save,false);
	var content = document.getElementById("content");
	content.insertBefore(button, document.getElementById("america_map"));
	
    var button = document.createElement("input");
    button.setAttribute("value","Reset");
    button.setAttribute("type","button");
    button.setAttribute("id","rstbutton");
    button.addEventListener("click",reset,false);    
	var content = document.getElementById("content");
	content.insertBefore(button, document.getElementById("america_map"));
}, 1000);

var links = [];
var lsrvstr = "http://goallineblitz.com/game/league_survivor.pl?league_id=";

function reset() {
	GM_setValue("glbsurvivor","");
	console.log("resetting --> "+GM_getValue("glbsurvivor"));
}

function save() {
	var leagues = [];
	var select = document.getElementsByTagName("select");
	for (var s=0; s<select.length; s++) {
		if (select[s].getAttribute("name") == "my_pick") {
			var sel = select[s];
			if (sel.value != 0) {
				var lgid = sel.parentNode.parentNode.cells[0].firstChild.href.toString().split("=")[1];
				leagues.push(parseInt(lgid));
			}
		}
	}
	GM_setValue("glbsurvivor",leagues.toString());
	console.log("saved --> "+GM_getValue("glbsurvivor"));
}

function main() {
	document.getElementById("plbutton").disabled = true;
	if (GM_getValue("glbsurvivor") != null) {	
		console.log("saved leagues exist --> "+GM_getValue("glbsurvivor"));
		links = GM_getValue("glbsurvivor").split(",");
		console.log(links.length+") "+links);
	}
	if ((GM_getValue("glbsurvivor") == null) || (isNaN(parseInt(links[0])) == true)) {	
		console.log("no saved leagues. reloading.");
		for each (var l in document.links) {
			var lgid = parseInt(l.toString().split("league_id=")[1]);
			if (isNaN(lgid) == true) continue;
			
			if (links.indexOf(lgid) == -1) {
				links.push(lgid);
			}
		}
	}

	var table = document.createElement("table");
	table.setAttribute("id","survivorTable");
	
	var content = document.getElementById("content");
	content.insertBefore(table, document.getElementById("america_map"));
	
	getInetPage(lsrvstr+links[0], getLeagues, links.slice(1));
}

function getLeagues(address, page, data) {
//	console.log(page.responseText);
	var div = document.createElement("div");
	div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

	try {
		var a = address.split(".com/")[1].replace("_survivor","")+'">';
		var leagueName = div.innerHTML.split(a)[1].split("<")[0];
		
		var table = document.getElementById("survivorTable");
		table.setAttribute("class","nonalternating_color");		
		var tbody = document.createElement("tbody");
		table.appendChild(tbody);
		
		var tr = document.createElement("tr");
		tr.setAttribute("class","alternating_color"+((table.rows.length%2)+1));
			
		var select = div.getElementsByTagName("select");
		if (select[0].name == "my_pick") {
			var idx = select[0].selectedIndex;
			var str = leagueName+") "+select[0].options[idx].text+" ("+select[0].options[idx].value+")";

			var td = document.createElement("td");
			td.innerHTML = "<a style='color:black' href='"+address.replace("_survivor","")+"'>"+leagueName+"</a>";
			tr.appendChild(td);
		
			var td = document.createElement("td");
			td.innerHTML = select[0].parentNode.innerHTML;				
			tr.appendChild(td);
				
			table.appendChild(tr);
		}
	}
	catch (e) {
		console.log(e);
	}

	if (data.length > 0) {
		document.getElementById("plbutton").value = data.length+" remaining";
		getInetPage(lsrvstr+data[0], getLeagues, data.slice(1));
	}
	else {
		alphabetize();
		addListeners();
		document.getElementById("plbutton").value = "done";
	}
}

function alphabetize() {
	var select = document.getElementsByTagName("select");
	for (var s=0; s<select.length; s++) {
		if (select[s].getAttribute("name") == "my_pick") {
			var sel = select[s];
			var selected = sel.value;

			for (var i=1; i<sel.options.length-1; i++) {
				for (var j=i+1; j<sel.options.length; j++) {
					if ((sel.options[i].innerHTML).toLowerCase() > (sel.options[j].innerHTML).toLowerCase()) {
						var temp = sel.options[i].innerHTML;
						sel.options[i].innerHTML = sel.options[j].innerHTML;
						sel.options[j].innerHTML = temp;

						var temp = sel.options[i].value;
						sel.options[i].value = sel.options[j].value;
						sel.options[j].value = temp;
					}

					if (sel.options[i].value == selected) {
						sel.selectedIndex = i;
					}
				}
			}
		}
	}
}

function addListeners() {
	var inputs = document.getElementsByTagName("input");
	for each (var btn in inputs) {
		if (btn.type == "submit") {
		    btn.addEventListener("click",submit,false);		
		}
	}
}

function submit(event) {
	var btn = event.target;
	var lgid = parseInt(btn.parentNode.parentNode.cells[0].firstChild.href.toString().split("=")[1]);
	var idx = parseInt(btn.parentNode.firstChild.selectedIndex);
	var selected = btn.parentNode.firstChild.options[idx].value;
		
	var data = "league_id="+lgid+"&my_pick="+selected+"&action=Submit+Pick";
	
    var req = new XMLHttpRequest();
	req.open( "POST", "http://goallineblitz.com/game/league_survivor.pl", true );
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", data.length);
	req.setRequestHeader("Connection", "close");	
	req.onreadystatechange = function() {
		if(req.readyState == 4 && req.status == 200) {
			event.target.value = "Submitted";
		}
		else { 
			event.target.value = req.status;
		}
	};
	req.send(data);
	return req;
}


function getInetPage(address, func, data) {
    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address, this, data);
		}
	};

	req.send(null);
	return req;
}

