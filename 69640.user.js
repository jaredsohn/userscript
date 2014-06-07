// ==UserScript==
// @name           FarmVille Harvest Calculator
// @description    This script calculates the remaining time for growth of seeds in FarmVille on Facebook.
// @include        http://apps.facebook.com/onthefarm/
// @include        http://apps.facebook.com/onthefarm/index.php*
// @version        1.4
// ==/UserScript==

var percent = 0;

function dateToTime(dt){
	var day = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")[dt.getDay()].substring(0,3).toLowerCase();
	var hours = dt.getHours(); hours = (hours < 10)? "0" + hours : hours;
	var minutes = dt.getMinutes(); minutes = (minutes < 10)? '0' + minutes : minutes;
	return hours + ":" + minutes + " (" + day + ")";
}

function calcDate(f,date){
	var dt = new Date(date.getTime());
	var d = Math.floor(f/24);
	var h = Math.floor(f)%24;
	var m = Math.floor((f - Math.floor(f))*60);
	dt.setDate(dt.getDate() + d);
	dt.setHours(dt.getHours() + h);
	dt.setMinutes(dt.getMinutes() + m);
	return dt;
}

function _calc(h) {
	var dt = new Date();
	var f = (h*percent/100);
	dt = calcDate(f,dt);
	return dt;
}

function calc(id,hour) {
	var dt1 = _calc(hour);
	var dt2 = calcDate(hour, dt1);
	document.getElementById(id).innerHTML = dateToTime(dt1) + " / " + dateToTime(dt2);
}

function fv_calculate() {
	var p = parseInt(document.getElementById('fv_percent').value);
	percent = (isNaN(p))? 0 : p;
	percent = 100 - percent;
	calc('fv_c2h',2);
	calc('fv_c4h',4);
	calc('fv_c8h',8);
	calc('fv_c10h',10);
	calc('fv_c12h',12);
	calc('fv_c1d',23);	//one facebook day is 23 hours long
	calc('fv_c2d',46);
	calc('fv_c3d',69);
	calc('fv_c4d',92);
	calc('fv_c5d',115);
	calc('fv_c6d',138);
	calc('fv_c7d',161);
	calc('fv_c8d',184);
}

function show_hide(){
	if (document.getElementById('blargmeh12g').style.display=='none'){
		document.getElementById('blargmeh12g').style.display='block';
	} else {
		document.getElementById('blargmeh12g').style.display='none';
	}
}


var out=document.createElement("div");
out.setAttribute("id", "blargmeh12g");
out.setAttribute("style",
"\
border: 1px solid rgb(59, 89, 152);\
padding: 5px;\
background: rgb(241, 241, 241) none repeat scroll 0% 0%;\
position: absolute;\
left: 2px;\
top: 30%;\
width: 220px;\
");
out.innerHTML='\
<h2 align=center>\
<b>\
FV Calculator\
</b>\
</h2>\
<div style="margin-top:6px;">\
<input maxlength="2" type="text" size="3" id="fv_percent" value="0">% grown\
</div>\
<div style="font-family: monospace;">\
<b>Time:</b>  <b>100% grown</b> / <b>spoiled</b><br />\
<b>&nbsp;2 h</b>: <span id="fv_c2h"></span><br />\
<b>&nbsp;4 h</b>: <span id="fv_c4h"></span><br />\
<b>&nbsp;8 h</b>: <span id="fv_c8h"></span><br />\
<b>10 h</b>: <span id="fv_c10h"></span><br />\
<b>12 h</b>: <span id="fv_c12h"></span><br />\
<b>&nbsp;1 d</b>: <span id="fv_c1d"></span><br />\
<b>&nbsp;2 d</b>: <span id="fv_c2d"></span><br />\
<b>&nbsp;3 d</b>: <span id="fv_c3d"></span><br />\
<b>&nbsp;4 d</b>: <span id="fv_c4d"></span><br />\
<b>&nbsp;5 d</b>: <span id="fv_c5d"></span><br />\
<b>&nbsp;6 d</b>: <span id="fv_c6d"></span><br />\
<b>&nbsp;7 d</b>: <span id="fv_c7d"></span><br />\
<b>&nbsp;8 d</b>: <span id="fv_c8d"></span><br />\
</div>\
';

var sizechg=document.createElement("a");
sizechg.innerHTML="+/-";
sizechg.setAttribute("id", "show_hide");
sizechg.setAttribute("href", "javascript:void(0);");
sizechg.setAttribute("style", "position: absolute; top: 28%;");

document.getElementById('content').appendChild(sizechg);
document.getElementById('show_hide').addEventListener("click", show_hide, false);

document.getElementById('content').appendChild(out);
document.getElementById('fv_percent').addEventListener('keyup', fv_calculate, false);

fv_calculate();


