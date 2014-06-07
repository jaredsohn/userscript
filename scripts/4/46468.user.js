// ==UserScript==
// @name           Training Buttons On Training Editor
// @namespace      pbr
// @include        http://goallineblitz.com/game/quick_training.pl
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/ 
// @version        09.04.08
// ==/UserScript==

window.setTimeout( function() {
    trainingButtonMain();
}, 100);

function trainingButtonMain() {
    var table = document.getElementById("training_table");
    table.style.visibility = "hidden";
    fixStats();
    fixOrder();
    fixColors();
    addButtons();
    table.style.visibility = "visible";
}

function fixStats() {
    var divs = document.getElementsByClassName("progress_div");
    for (var i=0; i<divs.length; i++) {
        var strings = divs[i].firstChild.textContent.split(" ");

        var d1 = document.createElement("div");
        d1.innerHTML = strings[0];

        var d2 = document.createElement("div");
        d2.innerHTML = strings[1];

        var div = document.createElement("div");
        div.appendChild(d1);
        div.appendChild(d2);

        divs[i].removeChild(divs[i].firstChild);
        divs[i].removeChild(divs[i].firstChild);
        divs[i].insertBefore(div,divs[i].firstChild);
    }
}

function fixOrder() {
    var arr = new Array();
    var players = document.getElementsByClassName("player_name");
    for (var i=1; i<players.length; i++) {
        var id = players[i].getElementsByTagName("a")[0].href.toString();
        var lvl = players[i].getElementsByTagName("span")[0].innerHTML;
        var pos = lvl;

        id = id.split("=")[1];
        lvl = pos.split(" ")[0];
        pos = pos.split(" ")[1];

        arr.push([id, lvl, pos, players[i].parentNode]);
    }
    
    arr = bsort(arr,1);
    arr = bsort(arr,2);
    arr = psort(arr,2);


    var table = document.getElementsByTagName("tbody")[0];
    while (table.childNodes.length > 1) {
        table.removeChild(table.lastChild);
    }

    var last = null;
    for (var i=0; i<arr.length; i++) {
        if (last != arr[i][2]) {
            var tr = document.createElement("tr");
            tr.setAttribute("class","nonalternating_color");
            var td = document.createElement("td");
            td.setAttribute("colspan","5");
            td.textContent = arr[i][2];

            tr.appendChild(td);
            table.appendChild(tr);
        }
        table.appendChild(arr[i][3]);
        last = arr[i][2];
    }

    var tr = document.createElement("tr");
    tr.setAttribute("class","nonalternating_color");
    var td = document.createElement("td");
    td.setAttribute("colspan","5");
    td.textContent = " ";
    tr.appendChild(td);
    table.appendChild(tr);

    var color = 0;
    var rows = document.getElementsByTagName("tr");
    for (var i=0; i<rows.length; i++) {
        if (rows[i].className.indexOf("alternating_color") == 0) {
            color = (color+1)%2;
            rows[i].className = "alternating_color"+(color+1);
        }
    }
}

function fixColors() {
    var points = document.getElementsByClassName("training_points");
    for (var i=1; i<points.length; i++) {
        if (parseInt(points[i].textContent) >= 5) {
            points[i].style.color = "green";
        }
        else if (parseInt(points[i].textContent) >= 2) {
            points[i].style.color = "blue";
        }
        else {
            points[i].style.color = "red";
        }
    }
}

function bsort(arr, idx) {
    for (var i=0; i<arr.length-1; i++) {
        for (var j=i+1; j<arr.length; j++) {
            if (arr[j][idx] < arr[i][idx]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

function psort(arr, idx) {
    var p = ["QB","HB","FB","TE","WR","C","G","OT","DT","DE","LB","CB","SS","FS","K","P"];
    for (var i=0; i<arr.length-1; i++) {
        for (var j=i+1; j<arr.length; j++) {
            if (p.indexOf(arr[j][idx]) < p.indexOf(arr[i][idx])) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

function addButtons() {
    var players = document.getElementsByClassName("player_name");
    players[0].parentNode.insertCell(players[0].parentNode.cells.length);

    for (var i=1; i<players.length; i++) {
        var row = players[i].parentNode;
        var id = players[i].getElementsByTagName("a")[0].href.toString();
        id = id.split("=")[1];

        var input = document.createElement("input");
        input.type = "button";
        input.value = "Train";
        input.id = "button_"+id;
        input.addEventListener("click",trainPlayer,false);
        row.insertCell(row.cells.length);
        row.cells[row.cells.length-1].appendChild(input);
    }
}

function trainPlayer() {
    this.removeEventListener("click", trainPlayer, false);
    this.value = "-----";
    var parent = this.parentNode.parentNode;
    var id = parent.getElementsByTagName("a")[0].href.toString();
    id = id.split("=")[1];
    //console.log("train: "+id);

    var training = parent.getElementsByClassName("training")[0];
    var selects = training.getElementsByTagName("select");
    if ((selects[0].options[selects[0].selectedIndex].className == "disabled_training") ||
        (selects[0].options[selects[0].selectedIndex].value == "none")) {
        console.log("Can't train this.");
        return;
    }

    var data = "";
    if (selects[1].disabled == false) {
        data += "training_type=normal";
        data += "&training_normal=";
        data += selects[0].options[selects[0].selectedIndex].value.replace(" ","+");
        data += "&training_intense=Sled+Drills";
        data += "&option2=";
        data += selects[1].options[selects[1].selectedIndex].value.replace(" ","+");
    }
    else {
        data += "training_type=intense";
        data += "&training_normal=Bench+Press";
        data += "&training_intense=";
        data += selects[0].options[selects[0].selectedIndex].value.replace(" ","+");
        data += "&option2=";
    }
    data += "&player_id="+id;
    data += "&action=Train";
    console.log(id+": "+data);
    sendSubmissionPage(id, data);
}

function sendSubmissionPage(id, d) {
    var address = "http://goallineblitz.com/game/training.pl?player_id="+id;
    //console.log(address);
    //console.log(d);
	return GM_xmlhttpRequest({
		method: 'POST',
		url: address,
        data: d,
		headers: {
		    'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008052912 Firefox/3.0 Greasemonkey',
		    'Accept': 'text/xml',
            'Host': 'goallineblitz.com',
            'Referer': address,
            'Content-type': 'application/x-www-form-urlencoded'
	    },
	    onreadystatechange: function(page) {
	    	if (page.readyState == 4) {
				if (page.status != 200) {
					alert("pbr gm script: Error "+page.status+" loading "+address);
				}
				else {
                    console.log("Training request sent: "+page.status);
                    var price = 5;
                    if (d.indexOf("training_type=normal") == 0) {
                        price = 2;
                    }
                    fixColors();
                    
                    var el = document.getElementById("training_"+id);
                    if (el != null) {
                        el = el.parentNode.parentNode.parentNode;
                        el = el.getElementsByClassName("training_points")[0];
                        el.textContent = parseInt(el.textContent) - price;
                    }
                    else {
                        console.log("why?");
                    }

                    var button = document.getElementById("button_"+id);
                    button.addEventListener("click",trainPlayer, false);
                    button.value = "Train";
				}
	    	}
		}
    });
}
