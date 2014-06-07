// ==UserScript==
// @name           Andre_Macareno's no-error counter
// @description    special for no-error fans
// @namespace      klavogonki
// @include        http://klavogonki.ru/play/*
// @author         andremacareno
// ==/UserScript==
(function() {
	function set_cookie(name, value) {
		var exp_date = new Date();
		exp_date.setTime(exp_date.getTime() + (1000 * 60 * 60 * 24 * 365 * 20));
		document.cookie = name + "=" + escape(value) + "; path=/" + "; expires=" + exp_date.toUTCString();
	}	
	function get_cookie(c){var b=document.cookie;var e=c+"=";var d=b.indexOf("; "+e);if(d==-1){d=b.indexOf(e);if(d!=0){return null}}else{d+=2}var a=document.cookie.indexOf(";",d);if(a==-1){a=b.length}return decodeURIComponent(b.substring(d+e.length,a))}
function incCount(type) {
	if(typeof(type) == 'undefined') type='all';
	current_value=parseInt(document.getElementById(type+'_link').innerHTML);
	new_value=current_value+1;
	current_value_overall=parseInt(document.getElementById(type+'_link_overall').innerHTML);
	new_value_overall=current_value_overall+1;
	document.getElementById(type+'_link').innerHTML=new_value;
	document.getElementById(type+"_link_overall").innerHTML=new_value_overall;
	if(type == 'completed') {
		new_value_all=parseInt(document.getElementById('all_link').innerHTML)+1;
		new_value_all_overall=parseInt(document.getElementById('all_link_overall').innerHTML)+1;
		document.getElementById('all_link').innerHTML=new_value_all;
		document.getElementById('all_link_overall').innerHTML=new_value_all_overall;
		set_cookie('all', new_value_all);
		set_cookie('all_overall', new_value_all_overall);
	}
	set_cookie(type, new_value);
	set_cookie(type+"_overall", new_value_overall);
	var completed=parseInt(document.getElementById('completed_link').innerHTML);
	var all=parseInt(document.getElementById('all_link').innerHTML);
	var percents=parseInt(document.getElementById('completed_link').innerHTML)/parseInt(document.getElementById('all_link').innerHTML)*100;
	if(typeof(percents) != 'number' || isNaN(percents) || percents == "Infinity") percents=0;
	else percents=percents.toFixed(2);
	document.getElementById('percents').innerHTML=percents;
	var percents_overall=parseInt(document.getElementById('completed_link_overall').innerHTML)/parseInt(document.getElementById('all_link_overall').innerHTML)*100;
	if(typeof(percents_overall) != 'number' || isNaN(percents_overall) || percents_overall == "Infinity") percents_overall=0;
	else percents_overall=percents_overall.toFixed(2);
	document.getElementById('percents_overall').innerHTML=percents_overall;
	//alert(document.getElementById('completed_link').innerHTML+"/"+document.getElementById('all_link').innerHTML+" ("+parseInt(document.getElementById('completed_link').innerHTML)/parseInt(document.getElementById('all_link').innerHTML)*100+")");
}
function decCount(type) {
	if(typeof(type) == 'undefined') type='all';
	current_value=parseInt(document.getElementById(type+'_link').innerHTML);
	new_value=current_value-1;
	current_value_overall=parseInt(document.getElementById(type+'_link_overall').innerHTML);
	new_value_overall=current_value_overall-1;
	if(new_value<0) new_value=0;
	if(new_value_overall<0) new_value_overall=0;
	document.getElementById(type+'_link').innerHTML=new_value;
	document.getElementById(type+"_link_overall").innerHTML=new_value_overall;
	set_cookie(type, new_value);
	set_cookie(type+'_overall', new_value_overall);
	var percents=parseInt(document.getElementById('completed_link').innerHTML)/parseInt(document.getElementById('all_link').innerHTML)*100;
	if(typeof(percents) != 'number' || isNaN(percents) || percents == "Infinity") percents=0;
	else percents=percents.toFixed(2);
	document.getElementById('percents').innerHTML=percents;
	var percents_overall=parseInt(get_cookie('completed_overall'))/parseInt(get_cookie('all_overall'))*100;
	if(typeof(percents_overall) != 'number' || isNaN(percents_overall) || percents_overall == "Infinity") percents_overall=0;
	else percents_overall=percents_overall.toFixed(2);
	document.getElementById('percents_overall').innerHTML=percents_overall;
	//alert(document.getElementById('completed_link').innerHTML+"/"+document.getElementById('all_link').innerHTML+" ("+parseInt(document.getElementById('completed_link').innerHTML)/parseInt(document.getElementById('all_link').innerHTML)*100+")");
	}
	function addCounter() {
	if(game.params.gametype != 'noerror') return;
	var completed_value=(parseInt(get_cookie('completed'))) ? parseInt(get_cookie('completed')) : 0;
	var all_value=(parseInt(get_cookie('all'))) ? parseInt(get_cookie('all')) : 0;
	var percents=completed_value/all_value*100;
	if(typeof(percents) != 'number' || isNaN(percents) || percents == "Infinity") percents=0;
	else percents=percents.toFixed(2);
	
	var months=new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");
	var start_date=getCookie('date_start').split(".");
	date_start=start_date[0]+" "+months[start_date[1]]+" "+start_date[2];
	var completed_value_overall=(parseInt(get_cookie('completed_overall'))) ? parseInt(get_cookie('completed_overall')) : 0;
	var all_value_overall=(parseInt(get_cookie('all_overall'))) ? parseInt(get_cookie('all_overall')) : 0;
	var percents_overall=completed_value_overall/all_value_overall*100;
	if(typeof(percents_overall) != 'number' || isNaN(percents_overall) || percents_overall == "Infinity") percents_overall=0;
	else percents_overall=percents_overall.toFixed(2);	
	
	var elm=document.createElement("div");
	elm.id="races-counter";
	elm.style.background="none repeat scroll 0 0 #F8F4E6";
	elm.style.marginBottom="10px";
	elm.innerHTML="<div class=\"r tl\"><div class=\"tr\"><div class=\"bl\"><div class=\"br\"><div class=\"rc\"><h4 class=\"header\">Безошибочный</h4>"+
	"<table><tr class=\"session\"><td>Промежуток времени</td><td>Завершено</td><td>&nbsp;</td><td>Всего</td><td>%</td></tr><tr class=\"content\"><td>Текущая сессия</td><td style=\"text-align:center;\"><span id=\"completed\" title=\"закончено\"><b>"+
	"<a style=\"cursor:pointer;color:#009900;\" id=\"completed_link\" onclick=\"incCount('completed');\" oncontextmenu=\"decCount('completed'); return false;\">"+completed_value+"</a></b>"+
	"</span></td><td><span style=\"cursor:pointer;\" ondblclick=\"resetCounter('session')\" title=\"сброс счетчика текущей сессии\">/</span></td>"+
	"<td style=\"text-align:center;\"><span id=\"all\" title=\"всего\"><b><a style=\"cursor:pointer;\" id=\"all_link\" onClick=\"incCount('all');\" oncontextmenu=\"decCount('all'); return false;\">"+all_value+"</a></b></span></td><td style=\"text-align:center;\"><span id=\"percents\">"+percents+"</span></td></tr>"+
	"<tr class=\"overall\"><td>С "+date_start+"</td><td style=\"text-align:center;\"><span id=\"completed\" title=\"закончено\"><b>"+
	"<a style=\"cursor:pointer;color:#009900;\" id=\"completed_link_overall\" onclick=\"incCount('completed');\" oncontextmenu=\"decCount('completed'); return false;\">"+completed_value_overall+"</a></b>"+
	"</span></td><td><span style=\"cursor:pointer;\" ondblclick=\"resetCounter('overall')\" title=\"отсчитывать статистику от настоящего времени\">/</span></td>"+
	"<td style=\"text-align:center;\"><span id=\"all\" title=\"всего\"><b><a style=\"cursor:pointer;\" id=\"all_link_overall\" onClick=\"incCount('all');\" oncontextmenu=\"decCount('all'); return false;\">"+all_value_overall+"</a></b></span></td><td style=\"text-align:center;\"><span id=\"percents_overall\">"+percents_overall+"</span></td></tr></table><br /><input type=\"checkbox\" id=\"true_noerror\" onClick=\"changeErrorsLimit()\"><label for=\"true_noerror\">Безошибочный старого образца</label></div></div></div></div></div>";
	var invite_div = document.getElementById("invite");
	invite_div.parentNode.insertBefore(elm, invite_div.previousSibling);
}
function initCounter() {
	cnt = document.getElementById("cnt_init");
	if(!get_cookie('date_start')) {
		var date_start=new Date();
		var month=date_start.getMonth();
		set_cookie('date_start', date_start.getDate()+"."+month+"."+date_start.getFullYear()+" "+date_start.getHours()+":"+date_start.getMinutes());
	}
	if (cnt.value && game && game.params) {
	 	if(get_cookie('last_game') != 'noerror'){set_cookie('all', 0); set_cookie('completed', 0);}
		clearInterval(cnt.value);
		addCounter();
	set_cookie('last_game', game.params.gametype);
	if(get_cookie("true_noerror") == "1")
		document.getElementById("true_noerror").checked=true;
	}
}
function monitor() {
if(game.params.gametype == 'noerror') {
	var you = document.getElementById("players").getElementsByClassName("you")[0];
	if(you.getElementsByClassName('rating')[0].innerHTML == 'Игрок сошел с трассы' && flag == 0) {incCount('all'); flag=1;}
	if(you.getElementsByClassName('rating')[0].getElementsByClassName('place')[0] && flag == 0) {incCount('completed'); flag=1;}
	if(parseInt(get_cookie('true_noerror')) == 1)
		if(game.errors>0)
			game.errors++;
	if(flag==1) {
		var mon_interval=document.getElementById('cnt_monitor').value;
		clearInterval(mon_interval);
	}
	}
}
function resetCounter(type) {
	if(typeof type == 'undefined') type='session';
	if(type == 'session') {
		set_cookie('completed', 0);
		set_cookie('all', 0);
		document.getElementById('percents').innerHTML='0.00';
		document.getElementById('all_link').innerHTML='0';
		document.getElementById('completed_link').innerHTML='0';

	}
	else {
		var date_start=new Date();
		var month=date_start.getMonth();
		set_cookie('date_start', date_start.getDate()+"."+month+"."+date_start.getFullYear()+" "+date_start.getHours()+":"+date_start.getMinutes());
		set_cookie('all_overall', 0);
		set_cookie('completed_overall', 0);
		document.getElementById('percents_overall').innerHTML='0.00';
		document.getElementById('all_link_overall').innerHTML='0';
		document.getElementById('completed_link_overall').innerHTML='0';
	}
}
function changeErrorsLimit() {
	var elm = document.getElementById("true_noerror");
	if (!elm) return false;

	if (elm.checked)
		set_cookie("true_noerror",1);
	else
		set_cookie("true_noerror",0);
}
	var hidden_elm_init=document.createElement('input');
	hidden_elm_init.type='hidden';
	hidden_elm_init.id='cnt_init';
	document.body.appendChild(hidden_elm_init);
	var hidden_elm_monitor=document.createElement('input');
	hidden_elm_monitor.type='hidden';
	hidden_elm_monitor.id="cnt_monitor";
	document.body.appendChild(hidden_elm_monitor);
var s=document.createElement('script');
	s.innerHTML=changeErrorsLimit+addCounter+initCounter+incCount+decCount+monitor+set_cookie+get_cookie+resetCounter+'var flag=0;document.getElementById("cnt_init").value=setInterval("initCounter()", 1000); document.getElementById("cnt_monitor").value=setInterval("monitor()", 100);';
	document.body.appendChild(s);
	})();