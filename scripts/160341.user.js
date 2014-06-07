// ==UserScript==
// @name           Meters [GW]
// @namespace      гном убийца
// @description    Счетчики (v. 1.6.25.04.11.1800)
// @include        http://www.ganjawars.ru/me/
// ==/UserScript==


var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var content_sind = "";
var key = 0;
var nobr_sin_exp = 0;

if(location.href.indexOf("http://www.ganjawars.ru/me/") != -1){
	if(typeof(root.localStorage) == 'undefined' ){
 		alert('Meters [GW]: Ваш браузер не поддерживает LocalStorage(), обновите барузер или удалите скрипт.');
 	}else{
		main();
 	}
}

function main(){
	now_meters = find_now_meters();
	
	var meters = localStorage.getItem('meters');

	if(meters == null){
		meters = now_meters.join("|");
		localStorage.setItem('meters', meters);
	}

	var set_to_zero = document.createElement('table');
		set_to_zero.setAttribute("align", "right");
		set_to_zero.innerHTML = "<tr><td style='font-size: 8px; cursor:pointer;' id='setNewMeters'><u>сбросить счетчики</u></td></tr>";
		
		tb_scils.parentNode.insertBefore(set_to_zero, tb_scils.nextSibling);
		
		root.document.getElementById('setNewMeters').addEventListener('click', setNewMeter, true);
	
	print_meters(now_meters);
}

function find_now_meters(){
	main_table = root.document.getElementsByTagName('table');
	
	for(i = main_table.length-1, len = 0; i > len; i--){
		if(main_table[i].innerHTML.indexOf("skill_combat_pistols.gif")!= -1){
			tb_scils = main_table[i];
		}
		if(main_table[i].innerHTML.indexOf("Боевой уровень:")!= -1){
			tb_levels = main_table[i];
			break;
		}
	}
	
	sin_exp = root.document.getElementsByTagName('span');
	
	for(len = sin_exp.length, i=0; i < len; i++){
		if(sin_exp[i].textContent.indexOf("Основной синдикат")!=-1){
			nobr_sin_exp = sin_exp[i];
			sind_exp = nobr_sin_exp.getElementsByTagName('nobr')[1];
			if(!key){content_sind = nobr_sin_exp.innerHTML};
			key = 1;
			break;
		}
	}
	
	var tmp_meters = new Array();
	
	var reg=/(.+) \((.+)\)/;
	for(i=0; i < 3; i++){
		tmp_meter = tb_levels.rows[i].cells[1].textContent; tmp_meter = reg.exec(tmp_meter)[2];
		tmp_meters[i] = tmp_meter;
	}
	
	var reg=/(.+) \((.+)\)\+(.+)/;
	for(i=0; i < 6; i++){
		tmp_meter = tb_scils.rows[i].cells[1].textContent; tmp_meter = reg.exec(tmp_meter)[2];
		tmp_meters[i+3] = tmp_meter;
	}
	
	if(nobr_sin_exp){
	var reg=/\[ (.+) \((.+)\)(.+)\]/;
		tmp_meters[9] = reg.exec(sind_exp.textContent)[2];
	}else{
		tmp_meters[9] = 0;
	}
	
	tmp_meters[10] = getHours();
	
	return tmp_meters;
}

function print_meters(now_meters){
	meters = localStorage.getItem('meters').split("|");
	
	if(nobr_sin_exp){
		nobr_sin_exp.innerHTML = content_sind + "&nbsp;&nbsp;<font color=red style='font-size: 8px;'>" +(parseInt(parseFloat(now_meters[9]) - parseFloat(meters[9]), 10)) + "</font>";
	}
	
	for(i=0; i < 3; i++){
		meter = tb_levels.rows[i].cells[3];
		meter.setAttribute("align", "right");
		meter.setAttribute("style", "font-size: 8px; color: red;");
		if(i==2){
			tmp = parseFloat(now_meters[i]) - parseFloat(meters[i]);
			meter.innerHTML = tmp.toFixed(1);
		}else{
			meter.innerHTML = parseInt(parseFloat(now_meters[i]) - parseFloat(meters[i]));
		}
	}
	
	for(i=0; i < 6; i++){
		meter = tb_scils.rows[i].cells[2];
		meter.setAttribute("align", "right");
		meter.setAttribute("width", "20");
		
		tmp = parseFloat(now_meters[i+3]) - parseFloat(meters[i+3]);
		tmp = tmp.toFixed(1);
		if(tmp != "0.0"){
			meter.innerHTML = "&nbsp;&nbsp;<font color=red style='font-size: 8px;'>"+tmp+"</font>";
		}else{
			meter.innerHTML = '<img width="20" src="http://images.ganjawars.ru/i/tbg.gif">';
		}
	}
	
	how_long = now_meters[10] - meters[10]; how_long = Math.floor((how_long/60)/60);
	
	if(how_long > 24){
		how_long_d = Math.floor(how_long / 24);
		how_long = Math.floor(how_long % 24);
		how_long = how_long_d + " д. и " + how_long + " ч.";
	}else{
		how_long = how_long + " ч.";
	}
	root.document.getElementById("setNewMeters").setAttribute("title", "Прошло "+ how_long);
}

function setNewMeter(){
	if(confirm("Сбросить счетчики?")){
		now_meters = find_now_meters();
		meters = now_meters.join("|");
		localStorage.setItem('meters', meters);
		print_meters(now_meters);
	}
}

function getHours(){
	var currentTime = new Date();
	var time = Math.round(currentTime.getTime() / 1000);
	return time;
}