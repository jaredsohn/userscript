// ==UserScript==
// @name          HWM_war_Timer
// @description   HWM_war_Timer
// @include       http://www.heroeswm.ru/warlog.php*
// @include       http://www.heroeswm.ru/war.php*
// @include       http://www.heroeswm.ru/pl_warlog.php*
// @include       http://www.heroeswm.ru/home.php*
// ==/UserScript==


//alert("WM_war_Timer");
var url_cur = location.href ;


var home_page = 'http://www.heroeswm.ru/home.php';
var war_page = 'http://www.heroeswm.ru/war.php';
var warlog_page = 'http://www.heroeswm.ru/warlog.php';
var pl_warlog_page = 'http://www.heroeswm.ru/pl_warlog.php';

//var clock_icon_title_str = "TimeOfCurBattle";
var clock_icon_title_str = "\u0412\u0440\u0435\u043C\u044F \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0431\u043E\u044F";
var static_time_str = "WarTimer";

var warTimerData = GM_getValue("hwm_wtimer_data", "").split("|");
	//alert("GM warTimerData = "+warTimerData);
var lastBtlData = GM_getValue("hwm_wtimer_lastbtldata", "").split("|");
	//alert("GM lastBtlData = "+lastBtlData);	

var secInBattle = 0;
var warTimer_div;
	

if(url_cur.indexOf(war_page) != -1){ 
	showWarTimer();
}else if(url_cur.indexOf(warlog_page) != -1){
	recordLastBattle();
	showWarTimerRec();
}else if(url_cur.indexOf(pl_warlog_page) != -1){
	//recordLastBattle();
	showWarTimerStat();
}else if(url_cur.indexOf(home_page) != -1){
	recordLastBattle();
}


addPanel();



// =================== functions below ===================

function addPanel(){
		//alert("addPanel");
	if(url_cur.indexOf(home_page) != -1){ return; }
	//
	var d = document.createElement( 'div' );
	d.id = "hwmWarTimer_div";
	//
	d.innerHTML = '<div style="border:2px solid #999; background-color:#eeeeee; width:100; height:25; '+
	'position:absolute; top:0px; right:10px;" >'+
	'<table width="100" border="0" cellpadding="0" cellspacing="0" background="none">'+
	'<tr><td><img src="i/s_initiative.gif" border=0 width=24 height=24 alt="'+clock_icon_title_str+'" title="'+clock_icon_title_str+'"></td>'+
	'<td style="font-weight:bold;">'+static_time_str+'</td></tr>'+
	'</table>'+
	'</div>';
	
	d.style.display = "block";	
	//alert("d.innerHTML = "+d.innerHTML);
	
	document.body.appendChild( d ) ;
	warTimer_div = d;
	//
}
//

function showWarTimer(){
	//alert("showWarTimer");
	
	var doCountTime = true;
	var curDate = new Date();
	var curTime = curDate.getTime();
	
	var cur_warid = getUrlParam("warid");
		//alert("cur_warid = "+ cur_warid);
	cur_warid = cur_warid? cur_warid : "10101010";
		//alert("cur_warid = "+ cur_warid);
	if(lastBtlData[0] != cur_warid){ // new battle
		recordLastBattle(); // record last battle to history
		//
		lastBtlData[0] = cur_warid;
		lastBtlData[1] = curTime;
		lastBtlData[2] = 0;
		GM_setValue("hwm_wtimer_lastbtldata", lastBtlData.join("|"));
		
	}else{ // re-enter last battle...
		var diff = Math.floor((curTime - Number(lastBtlData[1]))/1000);
		if(diff<3600){ 
			//alert("less than 1 hour passed = maybe group...");
			secInBattle = Number(lastBtlData[2]) + diff;
			
		}else{ 
			//alert("delayed hunt or GN");
			secInBattle = Number(lastBtlData[2]);
			/*
			doCountTime = false;
			var recBattleTime = Number(lastBtlData[2]);
			var th = Math.floor(recBattleTime/3600);
			var tm = Math.floor(recBattleTime%3600 / 60);
			tm = (tm>=10)? tm : "0"+tm;
			var ts = recBattleTime - th*3600 - tm*60;
			ts = (ts>=10)? ts : "0"+ts;
			
			static_time_str = th+":"+tm+":"+ts;	
			*/
		}
	
	}
		
	if(doCountTime){
		setInterval( function(){ countWarTime() }, 1000 );
	}
}

function countWarTime(){
	var my_td = warTimer_div.firstChild.firstChild.firstChild.firstChild.childNodes[1];	
		//alert("warTimer_div = "+warTimer_div.innerHTML);
		//alert("warTimer_div = "+warTimer_div.innerHTML+ "\n my_td = "+my_td.innerHTML);
	//
	secInBattle++;
	//
	var curH = Math.floor(secInBattle/3600);
	var curM = Math.floor(secInBattle%3600 / 60);
	curM = (curM>=10)? curM : "0"+curM;
	var curS = secInBattle - curH*3600 - curM*60;
	curS = (curS>=10)? curS : "0"+curS;
	
	curTimeStr = curH+":"+curM+":"+curS;
	
	my_td.innerHTML = curTimeStr;
	//
	lastBtlData[2] = secInBattle;
	GM_setValue("hwm_wtimer_lastbtldata", lastBtlData.join("|"));
}


function recordLastBattle(){
	//alert("recordLastBattle");
	var lastRecordedBtl = warTimerData[0].split(":");
		//alert("comparing "+ lastRecordedBtl[0]+"  to  "+lastBtlData[0]);
	if(lastRecordedBtl[0] == lastBtlData[0]){ return; }
	//
	warTimerData.unshift(lastBtlData[0]+":"+lastBtlData[2]);
	//alert("warTimerData.len = "+warTimerData.length);
	//alert("warTimerData = \n"+warTimerData.join("\n_"));
	if(warTimerData.length>50){
		warTimerData.length = 50;
	}
	if(!warTimerData[warTimerData.length-1]){
		warTimerData.pop();
	}
	//
	GM_setValue("hwm_wtimer_data", warTimerData.join("|"));
	//GM_setValue("hwm_wtimer_data", "");
	//
}



function showWarTimerRec(){
	//alert("showWarTimerRec");
	var cur_warid = getUrlParam("warid");
		//alert("cur_warid = "+ cur_warid);
	var recBattleTime = 0;
	var len = warTimerData.length;
	var tmp_arr;
	for(var i=0; i<len; i++){
		if(warTimerData[i].indexOf(cur_warid) == -1){ continue; }
		//
		tmp_arr = warTimerData[i].split(":");
		recBattleTime = Number( tmp_arr[1] );
		break;
	}
		//alert("recBattleTime = "+recBattleTime);
		
	var th = Math.floor(recBattleTime/3600);
	var tm = Math.floor(recBattleTime%3600 / 60);
	tm = (tm>=10)? tm : "0"+tm;
	var ts = recBattleTime - th*3600 - tm*60;
	ts = (ts>=10)? ts : "0"+ts;
	
	static_time_str = th+":"+tm+":"+ts;		
	
}

function showWarTimerStat(){
	//alert("showWarTimerStat");
	//alert("warTimerData.len = "+warTimerData.length);
	//alert("warTimerData = \n"+warTimerData.join("\n"));
	
	var timeSum = 0;
	var avgBattleTime = 0;
	var len = warTimerData.length;
	var tmp_arr;
	for(var i=0; i<len; i++){
		tmp_arr = warTimerData[i].split(":");
		timeSum += Number( tmp_arr[1] );
	}
	avgBattleTime = Math.floor(timeSum/len);
		//alert("timeSum = "+timeSum+",   avgBattleTime = "+avgBattleTime);
	
	var th = Math.floor(avgBattleTime/3600);
	var tm = Math.floor(avgBattleTime%3600 / 60);
	tm = (tm>=10)? tm : "0"+tm;
	var ts = avgBattleTime - th*3600 - tm*60;
	ts = (ts>=10)? ts : "0"+ts;
	
	static_time_str = th+":"+tm+":"+ts;	
	
	// srednee vremya za NN Vashih boev
	var avgTimeStr = "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u0431\u043E\u044F (\u0437\u0430 "+len+"  \u0412\u0430\u0448\u0438\u0445 \u0431\u043E\u0435\u0432)";
	
	clock_icon_title_str = avgTimeStr;
	//	
}


function getUrlParam( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// === END === 
