// ==UserScript==
// @name           Error Control Mode
// @namespace      klavogonki.ru
// @version        0.8
// @author         rgall 
// @description    No-Error Mode for Users Ditionaries
// @include        http://klavogonki.ru/play/*
// ==/UserScript==

function clarify_functions()
{
	var funcs = {};
	for(param in game) {
		if((typeof game[param]) === 'function') {
			if (/\(\"typeplayblock\"\)\.hide\(\)/g.test(game[param])){funcs.finish_func = param;}
		}
	}

	for(param in game.players[0]) {
		if (/update\(strRatingFail\)/g.test(game.players[0][param])){funcs.message_func = param;}
	}
	return funcs;
}

function noerror_english_monitor() {
	if (document.getElementById("noerror_english_startup").value && game && game.params) {
		if (game.params.gametype != "noerror"){ //&& NO_ERROR_LIMIT != -1
			if (NO_ERROR_INIT == false) {
				if (typeof(game[PURE_FUNCTIONS.finish_func]) != "function") { 
					NO_ERROR_LIMIT = -1;
					document.getElementById('cs_noerrorall').innerHTML = "ERROR!";
					document.getElementById('cs_noerrorall_less').innerHTML = " ";
					document.getElementById('cs_noerrorall_more').innerHTML = " ";
				}
				else {
					NO_ERROR_INIT = game.params.gametype;
					changeErrorLimit("init");
				}
			}
			var nr_tr = document.getElementById("noerror-all");
			nr_tr.style.display = "";
			if(NO_ERROR_LIMIT != -1 && game.errors>NO_ERROR_LIMIT){
				//game.params.gametype='noerror';
				if (NO_ERROR_LIMIT == 0) {
					//game.errors++;
				}
				for(var l=0;l<game.players.length;l++){
					if(game.players[l].you){
						game.players[l][PURE_FUNCTIONS.message_func](); 
					}
				}
				game[PURE_FUNCTIONS.finish_func]();
				
				var you = document.getElementById("players").getElementsByClassName("you")[0];
				var children = you.childNodes;
				for (var i=0; i < children.length; i++) {
					if (children[i].id == "rating_loading") {
						return children[i].style.display = "none";
						break;
					}
				}
				clearInterval(document.getElementById("noerror_english_startup").value);
			}
		}
		else {
			clearInterval(document.getElementById("noerror_english_startup").value);
		}
	}
	else {return;}
}

function changeErrorLimit(act) {
	var cookie_name = "general_noerror_limit_"+NO_ERROR_INIT;
	var c_limit = noerror_getCookie (cookie_name);
	var c_limit_txt = "";
	if (act == "less") { c_limit--; }
	if (act == "more") { c_limit++; }
	if (c_limit < 0){
		c_limit_txt = "выкл";
		c_limit = -1;
	}
	else {
		c_limit_txt = c_limit;
	}
	noerror_setCookie(cookie_name,c_limit);
	NO_ERROR_LIMIT = c_limit;
	document.getElementById('cs_noerrorall').innerHTML = c_limit_txt;
}

function noerror_setCookie(name, value) {
	var expires = new Date();
	expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 365 * 20));
	document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : "; expires=" + expires.toGMTString());
} 
function noerror_getCookie (name) {
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
	return -1;
}


var par_row = document.getElementById("param_metronome").parentNode.parentNode.parentNode.parentNode.insertRow(4);
par_row.style.display = "none";
par_row.id = "noerror-all";

var td1 = par_row.insertCell(0);
td1.innerHTML = 'Лимит ошибок:';
var td2 = par_row.insertCell(1);
td2.style.setProperty("text-align", "center", null);
td2.innerHTML = '<span id="cs_noerrorall_less" style="font-weight:bold;color:#CF0C36;font-size:13px;cursor:pointer;" onClick="changeErrorLimit(\'less\');">&#171;</span>&nbsp;' +
				'<span id="cs_noerrorall" style="font-weight:bold;color:#11013F;font-size:13px;"></span>&nbsp;' +
				'<span id="cs_noerrorall_more" style="font-weight:bold;color:#74B30E;font-size:13px;cursor:pointer;" onClick="changeErrorLimit(\'more\');">&#187;</span>' + 
				'<input type="hidden" id="noerror_english_startup">';
var td3 = par_row.insertCell(2);
td3.id = "label_noerrorall";
td3.innerHTML = '&nbsp;';

var script = document.createElement("script");
script.innerHTML = clarify_functions + noerror_english_monitor + noerror_setCookie + noerror_getCookie + changeErrorLimit + ' var NO_ERROR_LIMIT = false; var NO_ERROR_INIT = false; var PURE_FUNCTIONS = clarify_functions();' +
'document.getElementById("noerror_english_startup").value = setInterval("noerror_english_monitor()", 400);';
document.body.appendChild(script);
