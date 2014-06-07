// ==UserScript==
// @name           Attributes On Roster Page A_S
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

var atts = ["Eff","Age","Str","Spd","Agi","Jmp","Sta","Vis","Cnf","Blk","Tck","Thr","Cat","Car","Kck","Pnt","Agent"];

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

	var a = document.getElementsByTagName("a");
	for (var i=0; i<a.length; i++) {
	    if (a[i].href.toString().indexOf("/game/player.pl") != -1) {
	        getInetPage(a[i].href.toString(),handlePlayer);
	    }
	}
}

function handlePlayer(address, page) {
    var div = document.createElement("div");
    div.innerHTML = page.responseText;

    var attributes = new Array();
    var eff = div.getElementsByClassName("current_stats_value")[0];
	eff = parseInt(eff.innerHTML.split("Level: ")[1]);
    attributes.push(eff);

    var age = parseFloat(div.getElementsByClassName("vital_data")[2].innerHTML.split("-")[1]);
    attributes.push(age);

    var d = div.getElementsByTagName("div");
    for (var i=0; i<d.length; i++) {
        if (d[i].getAttribute("class") == "stat_container") {
			attributes.push(Math.round(parseFloat(d[i].lastChild.innerHTML)));
        }
    }

    while (attributes.length < 16) {
        attributes.push("-");
    }

    var agent = div.getElementsByClassName("vital_data")[5].innerHTML;
	attributes.push(agent);

    var r = [0,1,2,4,6,8,10,12,14,3,5,7,9,11,13,15,16];
    var a = document.getElementsByTagName("a");
    for (var i=0; i<a.length; i++) {
        if (a[i].href.toString() == address) {
			var tr = a[i].parentNode.parentNode.parentNode;
            for (var att=0; att<attributes.length; att++) {
                console.log(atts[att]+" : "+attributes[r[att]]);
                var td = document.createElement("td");
                td.innerHTML = "<div>"+attributes[r[att]]+"</div>";
                tr.appendChild(td);
            }
        }
    }
}

function getInetPage(address, func) {
    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address,this);
		}
	};

	req.send(null);
	return req;
}

