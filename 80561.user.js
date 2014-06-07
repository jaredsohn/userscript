// ==UserScript==
// @name           klavogonki - hide cars
// @version        0.7
// @namespace      2klavogonki.ru
// @description    hide card while typing
// @include        http://klavogonki.ru/play/*
// ==/UserScript==

function HideCars () {
	if (!game) return; 
	var param = document.getElementById("hide_cars_check");
	if (count_getCookie("hideCars_STATUS") == 1) {
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
	for(var i=0,j=players.length; i<j; i++)
		players[i].style.display = dsp;
}
function changeHideCars() {
	var param = document.getElementById("hide_cars_check");
	if (param.checked == 1) {
		hidecars_setCookie("hideCars_STATUS",1);
	}
	else {
		hidecars_setCookie("hideCars_STATUS",0);
	}
}
function hidecars_setCookie(name, value) {
	var expires = new Date();
	expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 365 * 20));
	document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : "; expires=" + expires.toGMTString());
} 
function hidecars_getCookie (name) {
	var dc = document.cookie;
	var cname = name + "=";
	if (dc.length > 0) {
		begin = dc.indexOf(cname);
		if (begin != -1) {
			begin += cname.length;
			end = dc.indexOf(";", begin);
			if (end == -1) end = dc.length;
			return unescape(dc.substring(begin, end));
		}
	}
	return 0;
}



var elem = document.createElement("div");
//elem.style.display = "none";
elem.id = "hide_cars_hidden";
elem.innerHTML = '<input id="hide_cars_check" type="checkbox" onChange="changeHideCars();"><label for="hide_cars">Скрывать машины</label>' +
'<input type="hidden" id="hide_cars_flag">';
var params = document.getElementById("param_shadow");
//params.parentNode.insertBefore(elem, params.nextSibling);
params.parentNode.insertBefore(elem, params);

var script = document.createElement("script");
script.innerHTML = HideCars + hidecars_setCookie + hidecars_getCookie + changeHideCars + hidecars_toggle +
' document.observe("keydown", function(event){if (event.ctrlKey && event.keyCode == 38) hidecars_toggle("show");}); ' +
' document.getElementById("hide_cars_flag").value = setInterval("HideCars()", 500); ';
document.body.appendChild(script);


