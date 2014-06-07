// ==UserScript==
// @name           NEC (no-error counter)
// @version        1.0.3
// @namespace      klavogonki.ru
// @author         Fenex
// (r)             rgall
// @description    add additional stats to the no-error games
// @include        http://klavogonki.ru/g/*
// ==/UserScript==

NEC = function(name) {
	this.name = name;
	this.timer = setInterval(name+'.checkGame()', 100);
	this.session = 0;
	this.counters = new Object();
	this.id = null;
}

var str_NEC = new Object();

str_NEC.getIdOfPlayer = function() {
	for(var i=0; i<game.players.length; i++) {
		if(game.players[i].you)
			return i;
	}
	return null;
}

str_NEC.changeRealMode = function(e) {
	if(e.checked)
		localStorage['NEC_realMode'] = '1';
	else
		localStorage['NEC_realMode'] = '0';
}

str_NEC.saveValues = function() {
	localStorage['NEC_alltime_all'] = this.counters.alltime.all;
	localStorage['NEC_alltime_success'] = this.counters.alltime.success;
	localStorage['NEC_session_all'] = this.counters.session.all;
	localStorage['NEC_session_success'] = this.counters.session.success;
}

str_NEC.reset = function(mode) {
	if(!mode) {
		this.counters.session.all = 0;
		this.counters.session.success = 0;
	} else {
		this.counters.alltime.all = 0;
		this.counters.alltime.success = 0;
	}
	this.updateValues();
	this.saveValues();
}

str_NEC.listenerGame = function() {
	if(game.finished&&game.errors<2) {
		this.counters.session.success++;
		this.counters.alltime.success++;
		this.counters.session.all++;
		this.counters.alltime.all++;
		
		this.finish();
		return;
	}	
	if(game.errors==1&&localStorage['NEC_realMode']=='1') {
		this.counters.session.all++;
		this.counters.alltime.all++;
		game.players[this.id].errorKick();		
		game.finish();
		document.getElementById('rating_loading').parentNode.removeChild(document.getElementById('rating_loading'));
		
		this.finish();
		return;
	}
	if(game.errors>1) {
		this.counters.session.all++;
		this.counters.alltime.all++;
		
		this.finish();
		return;
	}
}

str_NEC.finish = function()  {
	clearInterval(this.timer);
	this.timer = false;
	this.updateValues();
	this.saveValues();
	
	return;
}

str_NEC.updateValues = function() {
	document.getElementById('counter_success').innerHTML = this.counters.session.success;
	document.getElementById('counter_attempts').innerHTML = this.counters.session.all;
	document.getElementById('counter_success_all').innerHTML = this.counters.alltime.success;
	document.getElementById('counter_attempts_all').innerHTML = this.counters.alltime.all;
	
	var i = (Math.round((this.counters.session.success / this.counters.session.all) * 10000)) / 100;
	if(isNaN(i))
		i = '0.00';
	document.getElementById('counter_attempts_pc').innerHTML = '['+i.toString()+'%] ';
	
	i = (Math.round((this.counters.alltime.success / this.counters.alltime.all) * 10000)) / 100;
	if(isNaN(i))
		i = '0.00';
	document.getElementById('counter_attempts_all_pc').innerHTML = '['+i.toString()+'%] ';

}

str_NEC.initLocalStorage = function() {
	var counters = new Object();
	
	if(!localStorage['NEC_firstRUN']) {
		localStorage['NEC_firstRUN'] = '1';
		localStorage['NEC_alltime_all'] = '0';
		localStorage['NEC_alltime_success'] = '0';
		localStorage['NEC_session_all'] = '0';
		localStorage['NEC_session_success'] = '0';
		localStorage['NEC_realMode'] = '0'
		this.session = localStorage['NEC_session'] = 0;
	}
	
	if(localStorage['NEC_session'] == '0') {
		localStorage['NEC_session_all'] = '0';
		localStorage['NEC_session_success'] = '0';
		this.session = localStorage['NEC_session'] = 1;
	}
	counters.alltime = new Object();
	counters.session = new Object();
	counters.alltime.all = localStorage['NEC_alltime_all'];
	counters.alltime.success = localStorage['NEC_alltime_success'];
	counters.session.all = localStorage['NEC_session_all'];
	counters.session.success = localStorage['NEC_session_success'];
	
	localStorage['NEC_realMode'];
	
	return counters;
}

str_NEC.init = function() {
	if(game.params.gametype!='noerror') {
		this.session = localStorage['NEC_session'] = 0;
		return;
	}
	this.counters = this.initLocalStorage();
	
	var elem = document.getElementById("counter-panel");
	
	elem.innerHTML = '<div class="r tl"><div class="tr"><div class="bl"><div class="br"><div class="rc">' +

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
	'<div id="counter_reset" style="float:right;font-size:8px;cursor:pointer;margin-top:4px;margin-left:2px;margin-right:-3px;" onclick="nec.reset(0);"><img title="Сбросить счетчик" alt="Сбросить счетчик" src="/img/logout.gif"></div>' +
	'</div>' +

	'<div style="height:20px;width:268px;">' +
	'<div class="c_noerror_stat">' +
	'<span id="counter_success_all"></span>&nbsp;/&nbsp;<span id="counter_attempts_all"></span>' +
	'</div>' +
	'<div style="float:left"><span id=counter_attempts_all_pc></span>Все время</div>' +
	'<div id="counter_reset" style="float:right;font-size:8px;cursor:pointer;margin-top:4px;margin-left:2px;margin-right:-3px;" onclick="nec.reset(1);"><img title="Сбросить счетчик" alt="Сбросить счетчик" src="/img/logout.gif"></div>' +
	'</div>' +
	'<input onChange="nec.changeRealMode(this);" type="checkbox" id="c_real_noerror" ' +
						 'title="Игра заканчивается при первой ошибке." >' +
						 '<label style="cursor:pointer;" for="c_real_noerror">Настоящий безошибочный</label><br>'+
	'</div></div></div></div></div>';
	
	this.updateValues();
	if(localStorage['NEC_realMode']=='1') {
		document.getElementById('c_real_noerror').checked = true;
	}	
	elem.style.display = "";
	this.timer = setInterval(this.name+'.listenerGame()', 10);
	
}

str_NEC.checkGame = function() {
	if(!game||!game.players)
		return;
	clearInterval(this.timer);
	this.timer = false;
	this.id = this.getIdOfPlayer();
	this.init();
}

var elem = document.createElement("div");
elem.style.setProperty("background", "none repeat scroll 0 0 #F8F4E6", null);
elem.style.setProperty("margin-top", "10px", null);
elem.style.setProperty("margin-bottom", "10px", null);
elem.style.diplay = "none";
elem.id = "counter-panel";

var params = document.getElementById("params");
params.parentNode.insertBefore(elem, params.nextSibling);

var script = document.createElement("script");
script.innerHTML = 'NEC = ' + NEC;
for(var name in str_NEC)
	script.innerHTML += ';\nNEC.prototype.' + name.toString() + ' = ' + str_NEC[name.toString()];
script.innerHTML += ';nec = new NEC("nec");';
document.body.appendChild(script);