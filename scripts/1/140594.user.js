// ==UserScript==
// @name           klavogonki - hide cars
// @version        0.7r
// @namespace      2klavogonki.ru
// @description    hide card while typing
// @include        http://klavogonki.ru/g/*
// @author         rgall
// (r)             Fenex
// ==/UserScript==

function HideCars() {
	if (!game) return; 
	var param = document.getElementById("hide_cars_check");
	if (localStorage["hideCars_STATUS"] == '1') {
		param.checked = 1;
	}
	else { return; }
	var status = document.getElementById("status").className;
	if (status == "steady") {
		hidecars_toggle("hide");
	}
	var you = document.getElementById("players").getElementsByClassName("you")[0];
	if (you.getElementsByClassName("rating")[0].style.display == "") {
		clearInterval(document.getElementById("hide_cars_flag").value);
		hidecars_toggle("show");
	}
}

function hidecars_toggle(act){
	var dsp = "none";
	if (act == "show") {
		dsp = "";
	}
	var players = document.getElementsByClassName("player");
	for(var i=0;i<players.length; i++)
		players[i].style.display = dsp;
}
function changeHideCars() {
	var param = document.getElementById("hide_cars_check");
	if (param.checked == 1) {
		localStorage['hideCars_STATUS'] = '1';
	}
	else {
		localStorage['hideCars_STATUS'] = '0';
	}
}

var elem = document.createElement("div");
//elem.style.display = "none";
elem.id = "hide_cars_hidden";
elem.innerHTML = '<input id="hide_cars_check" type="checkbox" onChange="changeHideCars();"><label for="hide_cars_check">Скрывать машины</label>' + '<input type="hidden" id="hide_cars_flag">';
var params = document.getElementById("param_shadow");
//params.parentNode.insertBefore(elem, params.nextSibling);
params.parentNode.insertBefore(elem, params);

var script = document.createElement("script");
script.innerHTML = HideCars + changeHideCars + hidecars_toggle + ' document.observe("keydown", function(event){if (event.ctrlKey && event.keyCode == 38) hidecars_toggle("show");}); ' +
' document.getElementById("hide_cars_flag").value = setInterval("HideCars()", 500); ';
document.body.appendChild(script);