// ==UserScript==
// @name           Attributes On Search Page
// @namespace      pbr/aosp
// @include        http://goallineblitz.com/game/search.pl*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.06.01
// ==/UserScript==

window.setTimeout( function() {
    main();
}, 100);

var atts = ["Age","Arch","Elvl","Str","Spd","Agi","Jmp","Sta","Vis","Cnf","Blk","Tck","Thr","Cat","Car","Kck","Pnt"];

function main() {
    var results = document.getElementsByClassName("search_name_head");
    if (results == null) return;
    results = results[0];
    results.style.width = "200px";
    for (var i=0; i<atts.length; i++) {
        var td = document.createElement("td");
        td.innerHTML = atts[i];
        results.parentNode.insertBefore(td, results.parentNode.lastChild.previousSibling);
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
    div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

    var attributes = new Array();

    var age = parseFloat(div.getElementsByClassName("vital_data")[2].innerHTML.split("-")[1]);
    attributes.push(age);

	var arch = "";
	var a = div.innerHTML.split('src="/images/game/archetypes/');
	if (a.length > 1) {
		arch = '<img src="/images/game/archetypes/'+a[1].split("</div>")[0]+"</img>";
	}
	attributes.push(arch);

	var elvl = "";
    elvl = parseFloat(div.getElementsByClassName("current_stats_value")[0].childNodes[1].innerHTML);
	attributes.push(elvl);

    var d = div.getElementsByTagName("div");
    for (var i=0; i<d.length; i++) {
        if (d[i].getAttribute("class") == "stat_container") {
            attributes.push(parseFloat(d[i].innerHTML.split('">')[2].split("<")[0]));
        }
    }
    while (attributes.length < 17) {
        attributes.push("-");
    }

	var attNames = ["Strength","Blocking","Speed","Tackling","Agility","Throwing","Jumping",
					"Catching","Stamina","Carrying","Vision","Kicking","Confidence","Punting"];
	for (var i=0; i<attNames.length; i++) {
		var v = div.innerHTML.split("<td>"+attNames[i]+"</td>");
		if (v.length > 1) {
			v = parseFloat(v[1].split(">")[1]);
			attributes[i+3] = Math.round(attributes[i+3] + v);
		}
		else {
			attributes[i+3] = Math.round(attributes[i+3]);
			if (isNaN(attributes[i+3]) == true) {
				attributes[i+3] = "-";
			}
		}
	}


	var v = 2;
    var r = [0,1,2,1+v,3+v,5+v,7+v,9+v,11+v,13+v,2+v,4+v,6+v,8+v,10+v,12+v,14+v];
    var a = document.getElementsByTagName("a");
    for (var i=0; i<a.length; i++) {
        if (a[i].href.toString() == address) {
            for (var att=0; att<attributes.length; att++) {
                var td = document.createElement("td");
                td.innerHTML = "<div>"+attributes[r[att]]+"</div>";
                a[i].parentNode.parentNode.insertBefore(td, a[i].parentNode.parentNode.lastChild.previousSibling);
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

