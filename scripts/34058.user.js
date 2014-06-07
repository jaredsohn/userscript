// ==UserScript==
// @name           HWM_Time_Seconds
// @description    HWM mod - Time_Seconds
// @include       http://www.heroeswm.ru/roulette.php*
// @include       http://www.heroeswm.ru/*
// @exclude       http://www.heroeswm.ru/warlog.php*
// @exclude       http://www.heroeswm.ru/war.php*
// @exclude       http://www.heroeswm.ru/brd.php
// @exclude       http://www.heroeswm.ru/rightcol.php
// @exclude       http://www.heroeswm.ru/ch_box.php
// @exclude       http://www.heroeswm.ru/chatonline.php*
// @exclude       http://www.heroeswm.ru/chat_line.php*
// @exclude       http://www.heroeswm.ru/chatpost.php*
// @exclude       http://www.heroeswm.ru/chat.php*
// @exclude       http://www.heroeswm.ru/ticker.php*
// @exclude       http://www.heroeswm.ru/
// ==/UserScript==


//http://www.heroeswm.ru/sms.php?notebook=1

var url_cur = location.href ;
var curDate = new Date();
var curHour = curDate.getHours();
var curMin = curDate.getMinutes();
var curSec = curDate.getSeconds();
	//alert("HWM_Time_Seconds\n time = "+curHour+":"+curMin+":"+curSec);

var isRoulette = (url_cur.indexOf("/roulette.php") != -1);
	//alert("isRoulette = "+isRoulette);
	
var time_shift = GM_getValue("hwm_tsec_t_shift", 0)
	//alert("GM time_shift = "+time_shift);
	
var all_td = document.getElementsByTagName('td');
var topTimeTd = getTopTimeTd();
	//alert("topTimeTd = "+topTimeTd.innerHTML);

var top_time_pattern = /([^,]*)(, \d+ online)/;
var users_online_str = top_time_pattern.exec(topTimeTd.innerHTML)[2];
	//alert("users_online_str = "+users_online_str);
	
//				
if(isRoulette){
	getServTime();	
}



showTimeSec();


setInterval( function(){ showTimeSec() }, 1000 );

//

// =====
function getServTime(){
	var roul_time_regexp = /&nbsp;\u0412\u0440\u0435\u043C\u044F: ([\d:]+)<br>/;
	var s = (roul_time_regexp.exec(document.body.innerHTML))[1];
	if(s != null){
		getTimeShift(s);
	}
	
	
}

function getTimeShift(ts){
	//alert("getTimeShift,  ts = "+ts);
	
	var srv_time = ts.split(":");
	var srvHour = Number(srv_time[0]);
	var srvMin = Number(srv_time[1]);
	var srvSec = Number(srv_time[2]);
		//alert("srvHour = "+srvHour+"\n srvMin = "+srvMin+"\n srvSec = "+srvSec);
	
	var curAllSec = curHour*3600 + curMin*60 + curSec;
	var srvAllSec = srvHour*3600 + srvMin*60 + srvSec;
	// 
	var shift_hour = curHour-srvHour;
	var shift_time = curAllSec-srvAllSec;
	
	GM_setValue("hwm_tsec_t_shift", shift_time );

}

function showTimeSec(){
		//alert("showTimeSec");
	//return;
	var curD = new Date();
	var curH = curD.getHours();
	var curM = curD.getMinutes();
	var curS = curD.getSeconds();
	var mySecTotal = curH*3600 + curM*60 + curS;
	var curSecTotal = (mySecTotal >= time_shift)? (mySecTotal - time_shift) : (mySecTotal +24*3600 - time_shift);
	//var curSecTotal = curH*3600 + curM*60 + curS - time_shift;
	var curSrvTimeStr = curSecTotal;
	//
	var curSrvH = Math.floor(curSecTotal/3600);
	var curSrvM = Math.floor(curSecTotal%3600 / 60);
	curSrvM = (curSrvM>=10)? curSrvM : "0"+curSrvM;
	var curSrvS = curSecTotal - curSrvH*3600 - curSrvM*60;
	curSrvS = (curSrvS>=10)? curSrvS : "0"+curSrvS;
	
	curSrvTimeStr = curSrvH+":"+curSrvM+":"+curSrvS;
	
	topTimeTd.innerHTML = curSrvTimeStr +users_online_str;	
	
}

function getTopTimeTd(){
		//alert("getTopTimeTd ");  
	//return;
	var time_pattern = /\d{1,2}:\d{2}, \d+ online/;
	var time_only = /\d{1,2}:\d{2}/;
	//
	var btd;
	var btd_t;
	for (var i = 0; i < all_td.length; i++) {
		btd = all_td[i];
		btd_t = btd.innerHTML;		
		if(btd_t.search(time_pattern)!=-1 && btd_t.indexOf("td") == -1 ) {
			return btd;
		}	
	}	
}

// =========================
