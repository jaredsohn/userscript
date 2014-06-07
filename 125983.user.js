// ==UserScript==
// @name           GLB VA Reset
// @namespace      pbr/var
// @include        http://goallineblitz.com/game/home.pl
// @copyright      2012, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        12.02.16
// ==/UserScript==

window.setTimeout(function() {
	var links = document.getElementsByTagName("a");
	for each (var l in links) {
		if (l.href.toString().indexOf("player.pl?player_id=") != -1) {
			var box = document.createElement("input");
			box.setAttribute("type","checkbox");
			box.setAttribute("class","vabox");
			box.checked = false;
			l.parentNode.appendChild(box);
		}
	}

    var div = document.createElement("div");
	div.style.clear = "both";

    var button = document.createElement("input");
    button.setAttribute("value","Invert VA checkboxes");
    button.setAttribute("type","button");
    button.setAttribute("id","vainvertbutton");
    button.addEventListener("click",invert,false);
    div.appendChild(button);

    var button = document.createElement("input");
    button.setAttribute("value","Reset My VA's");
    button.setAttribute("type","button");
    button.setAttribute("id","varesetbutton");
    button.addEventListener("click",main,false);
    div.appendChild(button);

	var ap = document.getElementById("content");
	ap.appendChild(div);
}, 3000);

function invert() {
	var boxes = document.getElementsByClassName("vabox");
	for each (var b in boxes) {
		b.checked = !b.checked;
	}
}

function main() {
	var data = new Array();

	var boxes = document.getElementsByClassName("vabox");
	for each (var b in boxes) {
		if (b.checked == true) {
			l = b.previousSibling;
			data.push(l.href.toString().replace("player.pl","vet_skill_reset.pl"));
		}
	}
	if (data.length > 0) getInetPage(data[0], getInetPage, data.slice(0));
}

function getInetPage(address, func, data) {
	console.log("getInetPage: "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			console.log("status = "+this.status);
			getInetPage(address, getInetPage, data);
		}
		else {
			reset(address, this, data);
		}
	};

	req.send(null);
	return req;
}

function reset(address, page, data) {
	var div = document.createElement("div");
	div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

	var params = [];
	var inputs = div.getElementsByTagName("input");
	for each (var i in inputs) {
		var n = i.getAttribute("name");
		if ((n != "player_id") && (n != "skill_id")) break;

		params.push(i.getAttribute("value"));
	}

	if (params.length > 0) {
		sendPost(params);
	}
	
	if (data.length > 1) {
		getInetPage(data[1], reset, data.slice(1));
	}
}

function sendPost(data) {
	console.log("sendPost: "+data);
	var addr = "http://goallineblitz.com/game/vet_skill_reset.pl";
	var params = "player_id="+data[0]+"&skill_id="+data[1];

    var req = new XMLHttpRequest();
	req.open("POST", addr, true );
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", params.length);
	req.setRequestHeader("Connection", "keep-alive");
	req.onload = function() {
		if (this.status != 200) {
			console.log("error status = "+this.status+" : "+addr);
		}
		else {
			if (data.length > 2) {
				sendPost(data.slice(2));
			}
		}
	};

	req.send(params);
	return req;
}

