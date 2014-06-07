// ==UserScript==
// @name        Таймер
// @namespace   http://*.voyna-plemyon.ru
// @description Таймер отправки войск в ВП
// @author ShatterMan при содействии ЖРЕЦъ
// @version 0.0.1
// @license absolutely free
// @include     http://ru*.voyna-plemyon.ru/*
// @version     1
// ==/UserScript==

(function(window, undefined ) {

//Приход
function getlandingtime(f_dur_ms,f_fixtime) {   
	landing_time=new Date(server_time);   
	landing_time.setMilliseconds(server_time.getMilliseconds());   
	landing_time.setMilliseconds(landing_time.getMilliseconds()+f_dur_ms);
//	-(-f_fixtime));   
} 

//Отправка
function getlaunchtime(f_dur_ms) {   
	launch_time=new Date(server_time);   
	launch_time.setMilliseconds(server_time.getMilliseconds());
//	-(-fixtime));   
} 

function getdurbyserv(f_table_ind,f_durtr_num) {   
	var f_dur_txt=f_table_ind.getElementsByTagName('tr')[f_durtr_num].getElementsByTagName('td')[1].innerHTML;   
	var f_dur_arr=f_dur_txt.match(/\d+/g);   
	var f_dur_ms=-(-(f_dur_arr[0]*3600)-(f_dur_arr[1]*60)-f_dur_arr[2])*1000;   
	return f_dur_ms;   
} 

function finddurrownum(f_table_ind) {   
	var f_durtr_num=3;   
	for (f=1;f<=4;f++) {     
		if (f_table_ind.getElementsByTagName('tr')[f].getElementsByTagName('td')[1].id=='date_arrival') f_durtr_num=f-1;     
	}   
	return f_durtr_num;   
} 

function findattacktableindex() {   
	for (var f=10;f<=50;f++) {     
		if (document.getElementsByTagName('tbody')[f]) 
			if ( (document.getElementsByTagName('tbody')[f].innerHTML).match(/id="date_arrival"/g) ) 
				var f_table_num=f;
		}   
		var f_table_ind=document.getElementsByTagName('tbody')[f_table_num];   
	return f_table_ind;   
} 

function getservertime() {  
	server_time=new Date();   
	server_time.setSeconds(server_time.getSeconds()+synch_time_zone);     
	var f_servertime_arr=(document.getElementById('serverTime').innerHTML).match(/\d+/g);     
	if ((-last_servertime_sec)!=(-f_servertime_arr[2])) {       
		last_servertime_sec=f_servertime_arr[2];       
		var f_serverdate_arr=(document.getElementById('serverDate').innerHTML).match(/\d+/g);       
		var page_time=new Date(f_serverdate_arr[2], f_serverdate_arr[1]-1, f_serverdate_arr[0], f_servertime_arr[0], f_servertime_arr[1], f_servertime_arr[2]);       
		pagetimefix=page_time-server_time;
		if(!synch) {
			synch = true;
			synch_time_zone = parseInt(pagetimefix/1000,10);
			pagetimefix = pagetimefix%1000;
			server_time.setSeconds(server_time.getSeconds()+synch_time_zone);     
		}
	}		
	server_time.setMilliseconds(server_time.getMilliseconds()+pagetimefix);     
} 

function timing() {
	getservertime();
	getlandingtime(dur_ms,fixtime);   
	getlaunchtime(dur_ms);   
	
	document.getElementById('time_out').innerHTML = addZero(launch_time.getDate(),1) + "/" + addZero(launch_time.getMonth(),1) + "/" + launch_time.getFullYear() + " - " +
		addZero(launch_time.getHours(),1) + ":" + addZero(launch_time.getMinutes(),1) + ":" + addZero(launch_time.getSeconds(),1)	+ "." + addZero(launch_time.getMilliseconds(),2);
	document.getElementById('time_in').innerHTML = addZero(landing_time.getDate(),1) + "/" + addZero(landing_time.getMonth(),1) + "/" + landing_time.getFullYear() + " - " +
		addZero(landing_time.getHours(),1) + ":" + addZero(landing_time.getMinutes(),1) + ":" + addZero(landing_time.getSeconds(),1) + "." + addZero(landing_time.getMilliseconds(),2);
	if(document.getElementById("type_time").checked) {
		var control_time = launch_time;
	} else {
		var control_time = landing_time;
	}
	control_time.setMilliseconds(control_time.getMilliseconds() + parseInt(document.getElementById("fixtime").value));
	if(planned_time <= control_time) {
//		document.getElementById("btnStart").value=" Пуск "
		document.getElementById('troop_confirm_go').click();
//		alert("Приехали")
	} else {
		timeout_id = setTimeout(timing, 1);
	}

	back_timer=""+(planned_time-control_time)/1000;     
//document.getElementById('timer_back').innerHTML=pagetimefix;
	if(back_timer<60) {     
		document.getElementById('timer_back').innerHTML="<font color=red><b>"+(back_timer.match(/-?\d+/))+"</b></font><font color=gray size=&quot;-1&quot;>"+((back_timer+"00.000").match(/\.\d\d\d/))+"</font>";     
	} else {     
		document.getElementById('timer_back').innerHTML=(back_timer.match(/-?\d+/))+"<font color=gray size=&quot;-1&quot;>"+((back_timer+"00.000").match(/\.\d\d\d/))+"</font>";     
	}   

}

function timer_start_stop() {
	planned_time.setDate(parseInt(document.getElementById("DD").value,10));
	planned_time.setMonth(parseInt(document.getElementById("MM").value,10) -1);
	planned_time.setFullYear(parseInt(document.getElementById("YYYY").value));
	planned_time.setHours(parseInt(document.getElementById("HH").value,10));
	planned_time.setMinutes(parseInt(document.getElementById("mm").value,10));
	planned_time.setSeconds(parseInt(document.getElementById("ss").value,10));
	planned_time.setMilliseconds(parseInt(document.getElementById("ms").value,10));
	if(document.getElementById("btnStart").value==" Пуск ") {
		
		if((planned_time-server_time) <= ((document.getElementById("type_time").checked)? 0: (dur_ms + fixtime))) {
			alert("Время отправки пропущено!");
		} else {
			timing();
			document.getElementById("btnStart").value=" Стоп "
		}
	} else {
		clearTimeout(timeout_id);
		document.getElementById("btnStart").value=" Пуск "
	}
}

function addZero(i,y) {
	switch(y) {
		case 1:
			return (i < 10)? "0" + i: i;
		case 2:
			return (i < 100)? ((i < 10)? "00" + i: "0" + i): i;
	}
}

var synch = false;
var synch_time_zone = 0;
var table_ind=findattacktableindex(); 
var durtr_num=finddurrownum(table_ind);
var dur_ms=getdurbyserv(table_ind,durtr_num);  
var fixtime=1000; 
var	back_timer = 0;      
var timeout_id;
var last_servertime_sec=-1;   
var pagetimefix=0;   
var server_time=new Date();   
getservertime();   
var planned_time = new Date();
//Приход
var landing_time=new Date();   
getlandingtime(dur_ms,fixtime);  
planned_time = landing_time; 
planned_time.setMinutes(planned_time.getMinutes() + 2);
getlandingtime(dur_ms,fixtime);  
//Отправка
var launch_time=new Date();
getlaunchtime(dur_ms);   
var timerDivElem = document.createElement('div');
timerDivElem = '' + 
	'<div id="timerZZ" style="position:relative; background:#ecd7ac; border:1px solid #603000; border-radius:3px; ' + 
	'	box-shadow:4px 4px 10px rgba(0,0,0,0.7); bottom:360px; left:60%; width:320px; height:auto; padding:5px">'	+ 
	'		<table width=100% height=100%> ' +	
	"			<tr> " +
	"				<th colspan=4><center>Таймер</center></th> " + 
	"			</tr> " + 
	"			<tr> " + 
	"				<td colspan=2 width='43%'> " + 
	"					Погрешность в мс:" +
	"				</td>" + 
	"				<td colspan=2> " + 
	"					<input type=text id='fixtime' onchange=void(0) value='" + fixtime + "' size=3>&nbsp;&nbsp;" + 
	"                      Время отправки: <input type=checkbox id='type_time'>" +
	"				</td>" + 
	"			</tr>" + 
	"			<tr>" + 
	"				<td colspan=2>" + 
	"					План:" + 
	"				</td>" + 
	"				<td colspan=2>" + 
	"					<input type=text id='DD' value=" + addZero(planned_time.getDate(),1) + " size=2>/" + 
	"					<input type=text id='MM' value=" + addZero((planned_time.getMonth()+1),1) + " size=2>/" + 
	"					<input type=text id='YYYY' value=" + planned_time.getFullYear()+" size=4>" + 
	"					<br>" + 
	"					<input type=text id='HH' value=" + addZero(planned_time.getHours(),1) + " size=2>:" + 
	"					<input type=text id='mm' value=" + addZero(planned_time.getMinutes(),1) + " size=2>:" + 
	"					<input type=text id='ss' value=" + addZero(planned_time.getSeconds(),1) + " size=2>." + 
	"					<input type=text id='ms' value=" + addZero(planned_time.getMilliseconds(),2) + " size=3>" + 
	"				</td>" + 
	"			</tr>" + 
	"           <tr>" +
	"				<td colspan=4> " + 
	"                   <Hr align='center'" +
	"               </td" +
	"           </tr>" +
	"			<tr> " + 
	"				<td colspan=2 >" + 
	"					Время отправки:" + 
	"				</td>" + 
	"				<td colspan=2 id='time_out'>" + 
						addZero(launch_time.getDate(),1) + "/" + addZero(launch_time.getMonth(),1) + "/" + launch_time.getFullYear() + " - " +
						addZero(launch_time.getHours(),1) + ":" + addZero(launch_time.getMinutes(),1) + ":" + addZero(launch_time.getSeconds(),1) + "." +
						addZero(launch_time.getMilliseconds(),2) +
	"				</td>" + 
	"			</tr>" + 
	"			<tr>" + 
	"				<td colspan=2 > " + 
	"					Время прихода:" + 
	"				</td>" + 
	"				<td colspan=2 id='time_in'>" +
						addZero(landing_time.getDate(),1) + "/" + addZero(landing_time.getMonth(),1) + "/" + landing_time.getFullYear() + " - " +
						addZero(landing_time.getHours(),1) + ":" + addZero(landing_time.getMinutes(),1) + ":" + addZero(landing_time.getSeconds(),1) + "." +
						addZero(landing_time.getMilliseconds(),2) +
	"				</td>" + 
	"			</tr>" + 
	"			<tr> " + 
	"				<td colspan=4> " + 
	"                   <Hr align='center'" +
	"				</td>" + 
	"			</tr>" + 
	"			<tr>" + 
	"				<td colspan=2>" + 
	"					Таймер: " + 
	"				</td>" + 
	"				<td id='timer_back'>" + back_timer + "</td>" + 
	"				<td width='20%'>" + 
	"                   <input type='button' id='btnStart' onclick=void(0) value=' Пуск '/>" +
	"				</td>" + 
	"			</tr>" + 
	'		</table> ' + 
	'</div>';

document.body.insertAdjacentHTML('beforeEnd', timerDivElem);

if (document.getElementById('btnStart') != null) {
  document.getElementById('btnStart').onclick = timer_start_stop;
}

////////////////////////////////////////////////////////////////
// функция использования нативных скриптов открытой страницы
// window.addEventListener("load", function() {
//// script injection
//   exec(function(){...});
//// location hack
//   location.assign("javascript:alert('registered?');void(0)");
// }, false);

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

exec( function () { $('#timerZZ').draggable (); } );

})(window);
