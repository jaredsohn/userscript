// ==UserScript==
// @name           klavogonki: No-error counter
// @version        0.9.5
// @namespace      klavogonki.ru
// @author         rgall
// @description    add additional stats to the no-error games.
// @include        http://klavogonki.ru/play/*
// ==/UserScript==

function nerCount() {
	if (game.params.gametype == "noerror"){
		//alert ('here we are! - noerror game');
		if (document.getElementById("counter_loopID").value) {
			clearInterval(document.getElementById("counter_loopID").value);
		}
		var elem = document.getElementById("counter-panel");
		elem.innerHTML = 
		'<div class="r tl"><div class="tr"><div class="bl"><div class="br"><div class="rc">' +

		'<style type="text/css">' +
			'#counter_success { font-weight:bold;color:#74B30E;font-size:13px; }' +
			'#counter_attempts { font-weight:bold;color:#CF0C36;font-size:13px; }' +
			'#counter_success_all { font-weight:bold;color:#74B30E;font-size:13px; }' +
			'#counter_attempts_all { font-weight:bold;color:#CF0C36;font-size:13px; }' +
			'.c_noerror_stat { float:left;width:85px; }' +
		'</style>' +
		'<h4>Безошибочный</h4>' +

		'<div style="height:20px;margin-top:4px;width:268px;">' +
		'<div class="c_noerror_stat">' +
		'<span id="counter_success"></span>&nbsp;/&nbsp;<span id="counter_attempts"></span>' +
		'</div>' +
		'<div style="float:left"><span id=counter_attempts_pc></span>Текущая сессия</div>' +
		'<div id="counter_reset" style="float:right;font-size:8px;cursor:pointer;margin-top:4px;margin-left:2px;margin-right:-3px;" onclick="c_Reset(1);"><img title="Сбросить счетчик" alt="Сбросить счетчик" src="/img/logout.gif"></div>' +
		'</div>' +

		'<div style="height:20px;width:268px;">' +
		'<div class="c_noerror_stat">' +
		'<span id="counter_success_all"></span>&nbsp;/&nbsp;<span id="counter_attempts_all"></span>' +
		'</div>' +
		'<div style="float:left"><span id=counter_attempts_all_pc></span>Все время</div>' +
		'<div id="counter_reset" style="float:right;font-size:8px;cursor:pointer;margin-top:4px;margin-left:2px;margin-right:-3px;" onclick="c_Reset(2);"><img title="Сбросить счетчик" alt="Сбросить счетчик" src="/img/logout.gif"></div>' +
		'</div>' +

		'<input type="hidden" id="counter_success">' +
		'<input type="hidden" id="counter_attempts">' +
		'<input type="hidden" id="counter_loopID">' +
		'<input onMouseUp="c_NoError();" type="checkbox" name="" id="c_real_noerror" ' +
						 'title="Игра заканчивается при первой ошибке. Изменения вступят в силу со следующей игры." ' +
						 'alt="Игра заканчивается при первой ошибке. Изменения вступят в силу со следующей игры." >' +
						 '<label for="param_preview">Настоящий безошибочный</label><br>' +
		'</div></div></div></div></div>';
		elem.style.diplay = "";
		///---------
		document.getElementById("counter_loopID").value = setInterval("c_checkGameStatus()", 500);
		var rnr = document.getElementById("c_real_noerror");
		if (count_getCookie("c_ck_RealNoErrror") == 1) {
			rnr.checked = 1;
			//game.errors++;
		}
		c_printVals();
	}
	else {
		if (document.getElementById("counter_loopID").value) {
			clearInterval(document.getElementById("counter_loopID").value);
		}
	}
}

function c_Reset(mode) {
	if (mode == 1) {
		count_setCookie("c_ck_Attempts",0);
		count_setCookie("c_ck_Success",0);
	}
	else if (mode == 2) {
		count_setCookie("c_ck_Attempts_all",0);
		count_setCookie("c_ck_Success_all",0);
	}
	c_printVals();
}

function c_NoError() {
	var rnr = document.getElementById("c_real_noerror");
	if (!rnr) return false;

	if (rnr.checked == 1) {
		count_setCookie("c_ck_RealNoErrror",1);
	}
	else {
		count_setCookie("c_ck_RealNoErrror",0);
	}
}

function c_printVals() {
		var atts = count_getCookie("c_ck_Attempts");
		var sccs = count_getCookie("c_ck_Success");
		document.getElementById("counter_attempts").innerHTML = atts;
		document.getElementById("counter_success").innerHTML = sccs;
		var atts_a = count_getCookie("c_ck_Attempts_all");
		var sccs_a = count_getCookie("c_ck_Success_all");
		document.getElementById("counter_attempts_all").innerHTML = atts_a;
		document.getElementById("counter_success_all").innerHTML = sccs_a;
		// percentage
		var pc_all = Math.round((sccs_a/(atts_a/100))*100)/100;
		var pc_curr = Math.round((sccs/(atts/100))*100)/100;
		if (isNaN(pc_all)) pc_all = 0;
		if (isNaN(pc_curr)) pc_curr = 0;
		document.getElementById("counter_attempts_all_pc").innerHTML = '['+pc_all+'%]&nbsp;';
		document.getElementById("counter_attempts_pc").innerHTML = '['+pc_curr+'%]&nbsp;';;
}

function counter_start() {
		c_interval = document.getElementById("counter_startup")
		if (c_interval.value && game && game.params) {
			clearInterval(c_interval.value);
			nerCount();
		}
}

function c_checkGameStatus() {
	if (!game) return; 
	if(game.params.gametype != "noerror") {
		if (document.getElementById("counter_loopID").value) {
			clearInterval(document.getElementById("counter_loopID").value);
		}
		return;
	}
	if (count_getCookie("c_ck_RealNoErrror") == 1 && game.errors > 0) {
		game.errors++;
		//for(var l=0;l<game.players.length;l++){if(game.players[l].you){game.players[l].rsq6()}}
		game.tto8();
	}
	c_NoError();
	var g_status = document.getElementById("finished");
	if (g_status.style.display != "none"){
		c_checkPlayer();
	}
	else {
		c_checkPlayer();
	}
}

function c_checkPlayer () {
	var you = document.getElementById("players").getElementsByClassName("you");
	if (!you || you == 'undefined' || you[0] == 'undefined') {
		return false;
	}
	var rating = you[0].getElementsByClassName("rating");
	if (rating[0].style.display != "none" && !NEC_FLAG) {
		//game.errors--;
		var atts = count_getCookie("c_ck_Attempts");
		var sccs = count_getCookie("c_ck_Success");
		var atts_a = count_getCookie("c_ck_Attempts_all");
		var sccs_a = count_getCookie("c_ck_Success_all");
		if (rating[0].getElementsByClassName("place").length == 1) {
			// success
			atts++;
			sccs++;
			atts_a++;
			sccs_a++;
		}
		else {
			// fail
			atts++;
			atts_a++;
		}
		count_setCookie("c_ck_Attempts",atts);
		count_setCookie("c_ck_Success",sccs);
		count_setCookie("c_ck_Attempts_all",atts_a);
		count_setCookie("c_ck_Success_all",sccs_a);
		NEC_FLAG = true;
		c_printVals();
		if (document.getElementById("counter_loopID").value) {
			clearInterval(document.getElementById("counter_loopID").value);
		}
	}
}

function count_setCookie(name, value) {
	var expires = new Date();
	expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 365 * 20));
	document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : "; expires=" + expires.toGMTString());
} 
function count_getCookie (name) {
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
elem.style.setProperty("background", "none repeat scroll 0 0 #F8F4E6", null);
elem.style.setProperty("margin-top", "10px", null);
elem.style.setProperty("margin-bottom", "10px", null);
elem.style.diplay = "none";
elem.id = "counter-panel";
elem.innerHTML = 
				 '<input type="hidden" id="counter_startup">' +
				 '<input type="hidden" id="counter_loopID">';
var params = document.getElementById("params");
params.parentNode.insertBefore(elem, params.nextSibling);

var script = document.createElement("script");
script.innerHTML = nerCount + counter_start + c_checkGameStatus + c_checkPlayer + c_printVals + count_setCookie + count_getCookie + c_Reset + c_NoError + 
' var NEC_FLAG = false; ' +
' document.getElementById("counter_startup").value = setInterval("counter_start()", 1000); ' +
' document.getElementById("counter_loopID").value = setInterval("c_checkGameStatus()", 700); ';
document.body.appendChild(script);

