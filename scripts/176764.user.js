// ==UserScript==
// @name        World Of Tanks - My Clan Auto Check
// @namespace   silentrazgriz
// @description -
// @include     http://worldoftanks.asia/community/clans/*
// @version     1
// @grant       none
// ==/UserScript==

var style = "width:300px;height:145px;background-color:#fff;top:30px;right:10px;position:fixed;z-index:999;display:block;padding:10px";
var text_style = "width:280px;height:100px;resize:none;border:solid 1px #999;margin-top:5px;font-size:12px;";
var btn_style = "margin-top:5px;";
var box = document.createElement("div");
var text = document.createElement("textarea");
var btn = document.createElement("button");
var z = 0, alt = 0;

box.setAttribute("style", style);

text.id = "name-list";
text.setAttribute("style", text_style);

btn.onclick = checkAll;
btn.setAttribute("style", btn_style);

btn.appendChild(document.createTextNode("Check All"));
box.appendChild(document.createTextNode("Press Alt + Z to show/hide window"));
box.appendChild(text);
box.appendChild(btn);

document.body.appendChild(box);
window.addEventListener("keydown", listenKey, false);
window.addEventListener("keyup", upKey, false);

function checkAll() {
	var all_nick = document.getElementById("name-list").value.toLowerCase().replace("\n","|");
	var table = document.getElementById("member_table_container");
	var tr = table.getElementsByTagName("tr");
	for(var i = 1; i < tr.length; i++) {
		var nick = tr[i].getElementsByTagName("a")[0].innerHTML;
		if(all_nick.indexOf(nick.toLowerCase()) != -1) {
			tr[i].getElementsByTagName("span")[0].click();
		}
	}
}

function upKey(e) {
	if(e.keyCode == 90) {
		z = 0;
	} else if(e.keyCode == 18) {
		alt = 0;
	}
}

function listenKey(e) {
	if(e.keyCode == 90) {
		z = 1;
	} else if(e.keyCode == 18) {
		alt = 1;
	}
	if(z == 1 && alt == 1) {
		if(box.style.display != "none")
			box.style.display = "none";
		else
			box.style.display = "block";
	}
}