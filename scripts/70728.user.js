// ==UserScript==
// @name           junk
// @namespace      pbr
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.02.04
// ==/UserScript==

window.setTimeout( function() {
    var input = document.createElement("input");
    input.type = "button";
    input.value = "Load Attributes";

    var heading = document.getElementsByClassName("medium_head")[0];
    heading.parentNode.insertBefore(input, heading);

    input.addEventListener("click",main,false);
}, 100);

var totalPlayers = 0;
var atts = ["Eff","Age","V/S","Str","Spd","Agi","Jmp","Sta","Vis","Cnf","Blk","Tck","Thr","Cat","Car","Kck","Pnt","Agent"];

function main() {
	document.body.innerHTML = document.body.innerHTML.replace(/ season, day /g,"-d");
	document.body.innerHTML = document.body.innerHTML.replace(/,[0123456789]{3}.00/g,"k");
	document.body.innerHTML = document.body.innerHTML.replace(/Contract End/g,"Contract");
	document.body.innerHTML = document.body.innerHTML.replace(/Salary\/Yr/g,"Salary");

    var res = document.getElementsByClassName("nonalternating_color");
    if (res == null) return;
	for (var p=0; p<res.length; p++) {
		results = res[p];
		for (var i=0; i<atts.length; i++) {
		    var td = document.createElement("td");
		    td.innerHTML = atts[i];
			results.appendChild(td);
		}
	}

	var div = document.createElement("div");
	div.setAttribute("id","agefooter");
	document.getElementById("footer").appendChild(div);

	var a = document.getElementsByTagName("a");
	for (var i=0; i<a.length; i++) {
	    if (a[i].href.toString().indexOf("/game/player.pl") != -1) {
			totalPlayers++;
	    }
	}
	var a = document.getElementsByTagName("a");
	for (var i=0; i<a.length; i++) {
	    if (a[i].href.toString().indexOf("/game/player.pl") != -1) {
	        getInetPage(a[i].href.toString(),handlePlayer);
	    }
	}

	sortSetup();
}

function handlePlayer(address, page) {
    var div = document.createElement("div");
    div.innerHTML = page.responseText;

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

	var ftr = document.createElement("div");
	ftr.setAttribute("class","age");
	ftr.innerHTML = -1;
	try {
		var age = parseFloat(div.getElementsByClassName("vital_data")[2].innerHTML.split("-")[1]);
		attributes.push(age);

		var val = parseFloat(div.getElementsByClassName("current_stats_value")[0].lastChild.firstChild.innerHTML);
		attributes.push( ((val-164)/(Math.min(age,400)/40)).toFixed(0) );

		ftr.innerHTML = age;
	}
	catch (e) {
		console.log(e);
	}
	document.getElementById("agefooter").appendChild(ftr);

    var d = div.getElementsByTagName("div");
    for (var i=0; i<d.length; i++) {
        if (d[i].getAttribute("class") == "stat_container") {
			attributes.push(Math.round(parseFloat(d[i].lastChild.innerHTML)));
        }
    }

    while (attributes.length < 17) {
        attributes.push("-");
    }

	try {
		var agent = div.getElementsByClassName("vital_data")[5].innerHTML;
		attributes.push(agent);
	}
	catch (e) {
		attributes.push("CPU");
	}

    var r = [0,1,2,3,5,7,9,11,13,15,4,6,8,10,12,14,16,17];
    var a = document.getElementsByTagName("a");
    for (var i=0; i<a.length; i++) {
        if (a[i].href.toString() == address) {
			var tr = a[i].parentNode.parentNode.parentNode;
            for (var att=0; att<attributes.length; att++) {
//                console.log(atts[att]+" : "+attributes[r[att]]);
                var td = document.createElement("td");
                td.innerHTML = "<div>"+attributes[r[att]]+"</div>";
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
//		console.log(age+" / "+players+" = "+(age/players).toFixed(0));
		var div = document.createElement("div");
		div.setAttribute("class","medium_head");
		div.innerHTML = "Avg Player Age: "+(age/players).toFixed(0);
		var head = document.getElementsByClassName("medium_head");
		head[2].parentNode.insertBefore(div,head[2]);		

		document.getElementById("footer").removeChild(document.getElementById("agefooter"));
	}
//	else {
//		console.log(ages.length+","+totalPlayers);
//	}
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

function sortSetup() {
	var rows = document.getElementsByClassName("nonalternating_color");

	for (var i=0; i<rows.length; i++) {
		for (var j=0; j<rows[i].cells.length; j++) {
			rows[i].cells[j].addEventListener("click",sortEvent,true);
		}
	}
}

function sortEvent(evt) {
	evt.target.parentNode.parentNode.style.visibility = "hidden";
	evt.target.parentNode.parentNode.style.display = "none";
	sortTable(evt.target.parentNode.parentNode,evt.target.cellIndex);
	return true;
}

function sortTable(table, column) {
//	console.log(table.innerHTML);
	var rows = table.rows;
	for (var i=1; i<rows.length-1; i++) {
		for (var j=i+1; j<rows.length; j++) {
			var lrow = rows[i];
			var lcell = lrow.cells[column];
			var rrow = rows[j];
			var rcell = rrow.cells[column];
			var left = parseFloat(lcell.textContent);
			var right = parseFloat(rcell.textContent);
			
			if (isNaN(left) || isNaN(right)) {
				left = lcell.firstChild.textContent.toLowerCase();
				right = rcell.firstChild.textContent.toLowerCase();
				if (left == right) {
					left = lcell.lastChild.textContent.toLowerCase();
					right = rcell.lastChild.textContent.toLowerCase();
				}
			}

			if (left < right) {
				var temp = table.rows[i].innerHTML;
				table.rows[i].innerHTML = table.rows[j].innerHTML;
				table.rows[j].innerHTML = temp;
			}
		}
	}
/*
	for (var i=1; i<rows.length-1; i++) {
		var swap = i;
		for (var j=i; j<rows.length-1; j++) {
			var lrow = rows.item(swap);
			var lcell = lrow.cells.item(column);
			var rrow = rows.item(j+1);
			var rcell = rrow.cells.item(column);
			
			var left = parseFloat(lcell.innerHTML);
			var right = parseFloat(rcell.innerHTML);
			
			if (isNaN(left) || isNaN(right)) {
				left = lcell.firstChild.innerHTML.toLowerCase();
				right = rcell.firstChild.innerHTML.toLowerCase();
				if (left == right) {
					left = lcell.lastChild.innerHTML.toLowerCase();
					right = rcell.lastChild.innerHTML.toLowerCase();
				}
				
				if (left > right) {
					swap = j+1;
				}
			}
			else {
				if (left < right) {
					swap = j+1;
				}
			}
		}
		if (swap != -1) {
			var temp = table.rows[i].innerHTML;
			table.rows[i].innerHTML = table.rows[swap].innerHTML;
			table.rows[swap].innerHTML = temp;
		}
		var r = table.rows.item(i);
	}
	
	for (var i=2; i<table.rows.length; i++) {
		var r = table.rows.item(i);
		var attr = r.getAttribute("class");
		if (attr.indexOf("nonalternating_color") != -1) continue;
		attr = attr.slice(0,17) + ((i%2)+1) + attr.slice(18);
		r.setAttribute("class",attr);
	}
*/
	
	table.style.visibility = "visible";
	table.style.display = "block";
}

