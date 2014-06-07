// ==UserScript==
// @name          HWM Roulette Manager
// @description   HWM mod - stores/manages some Roulette data
// @include       http://www.heroeswm.ru/*
// @exclude       http://www.heroeswm.ru/warlog.php*
// @exclude       http://www.heroeswm.ru/war.php*
// @exclude       http://www.heroeswm.ru/brd.php
// @exclude       http://www.heroeswm.ru/rightcol.php
// @exclude       http://www.heroeswm.ru/ch_box.php
// @exclude       http://www.heroeswm.ru/chatonline.php*
// @exclude       http://www.heroeswm.ru/hat_line.php*
// @exclude       http://www.heroeswm.ru/chatpost.php*
// @exclude       http://www.heroeswm.ru/chat.php*
// @exclude       http://www.heroeswm.ru/ticker.php*
// ==/UserScript==


var url_cur = location.href ;

var url_r_main = "http://www.heroeswm.ru/roulette.php" ;
var url_r_info = "http://www.heroeswm.ru/inforoul.php" ;
var url_r_hist = "http://www.heroeswm.ru/allroul.php";


var td_roulette = ['roulette.php', 'inforoul.php', 'allroul.php'];


var all_td_Elements, this_td_Element;
	all_td_Elements = document.getElementsByTagName('td');
		//alert("found " + all_td_Elements.length + "  TD elements!");

var cur_time_str = getServerTime();
	//alert("cur_time_str:\n" + cur_time_str );	

var sec_to = 0; // seconds remaining

var totalBids = GM_getValue("hwm_r_total_bids", 0);	
	//alert("total bids: "+totalBids);	
	
rm_start();	

startRoulTimer();



// ==================== functions ===========================

function rm_start(){
		//alert("rm_start,  \n url_cur = "+url_cur);  	
	
	//
	if(url_cur == url_r_main){
		//alert("rm_start, MAIN page");
		rm_doMainPage();		
				
	}else if(url_cur.indexOf(url_r_info)!=-1){
		//alert("rm_start, INFO page");
			
	}else if(url_cur.indexOf(url_r_hist)!=-1){
		//alert("rm_start, HISTORY page");
	}
	
	addPanel();	
		
}


function getServerTime(){
		//alert("getServerTime ");  
	//return;
	var time_pattern = /\d{1,2}:\d{2}, \d+ online/;
	var time_only = /\d{1,2}:\d{2}/;
	//
	var btd;
	var btd_t;
	for (var i = 0; i < all_td_Elements.length; i++) {
		btd = all_td_Elements[i];
		btd_t = btd.innerHTML;		
		if(btd_t.search(time_pattern)!=-1 && btd_t.indexOf("td") == -1 ) {
				//alert("found time:\n" + btd_t.match(time_only)[0] );
			//
			return btd_t.match(time_only)[0];
		}	
	}	
}


function rm_doMainPage(){	
	//
	var rform = document.forms[0];
		//alert("rform = "+rform+",   "+rform.length+" elements");
	//
	var ff_num = 3;
	if(rform.length<4){ // roulette is spinning, just 2 fields in form...
		ff_num = 1;
		//return;
	}
	//var tb = rform[3].value;
	var tb = rform[ff_num].value;
	tb = tb? tb : 0;
	GM_setValue("hwm_r_total_bids", tb);
	
	totalBids = GM_getValue("hwm_r_total_bids", 0);	
	
	
	
	return;
	
	//====== debug
	var ts = "";
	for(var i=0; i<rform.length; i++){
		ts += rform[i].name + "\n";
		
	}
	//alert("rform elements:\n"+ts);
	
}



function addPanel(){
		//alert("addPanel");
	//return;	
	var d = document.createElement( 'div' );
	//
	d.innerHTML = 
'<table width="200" border="0" align="center" cellpadding="0" cellspacing="0" style="position:absolute; top:60px; left:auto; " background="none">'+
'<tr><td>'+
'<table width="200" border="0" align="center" cellpadding="0" cellspacing="0">'+
'<tr>'+
'<td>&nbsp;</td>'+
'<td width="70">'+
'<div id="roul_panel" style="background-color:#ddd9cd; width:70px; height:20px; display:block; border:1px solid #333; text-align:center; font-size:10px;">'+
'<table border="0" align="center" cellpadding="0" cellspacing="0"><tr>'+
'<td style="font-size:11px;"><b>'+
cur_time_str+
'</b></td>'+
'<td><img border=0 width=24 height=24 alt="" src="i/gold.gif" title="Your Bids: '+ totalBids +'" align="right"></td>'+
'</tr></table>'+
'</div>'+
'</td>'+
'</tr>'+
'</table>'+
'</td></tr></table>' ;
	
	document.body.appendChild( d ) ;
	
}


function startRoulTimer(){
	var cur_min = cur_time_str.split(":")[1];
	var min_to = 10 - cur_min%10 ;
	sec_to = min_to * 60;
		//alert("startRoulTimer:   \n cur_min = "+cur_min +",   \n min_to = "+min_to+",   \n sec_to = "+sec_to);
		
	show_r_timer();
	
	
}



function show_r_timer(){
	sec_to--;
	
  //var el = document.getElementById( 'pers_' + t ) ;
  var timer_div = document.getElementById("roul_panel") ;
  if(!timer_div){
		//alert("timer_div not found!");
	return;
  }
  //
  var min_to = Math.floor(sec_to/60);
  var s_to = sec_to%60 ;
  s_to = (s_to>=10)? s_to : "0"+s_to;
  //
  timer_div.innerHTML = "";
  //return;
if(totalBids != 0){
	timer_div.innerHTML += 
	'<table border="0" align="center" cellpadding="0" cellspacing="0"><tr>'+
'<td style="font-size:11px;"><b>'+
min_to +":"+ s_to+
'</b></td>'+
'<td><img border=0 width=24 height=24 alt="" src="i/gold.gif" title="Your Bets: '+ totalBids +'" align="right"></td>'+
'</tr></table>';

}else{
	timer_div.innerHTML += 
	'<table border="0" align="center" cellpadding="0" cellspacing="0"><tr>'+
'<td style="font-size:11px;"><b>'+
min_to +":"+ s_to+
'</b></td>'+
'<td>&nbsp;</td>'+
'</tr></table>';
}

	//alert("timer_div.innerHTML = \n"+timer_div.innerHTML);

	
	if(sec_to <= 0){ 
		if(totalBids != 0){
			alert("Roulette Wheel Spinning!");			
		}
		return; 
	}
	//
	setTimeout( function() { show_r_timer() } , 1000 )
	  
}


//==========================
