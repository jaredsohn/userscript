// ==UserScript==
// @name Fantasy Wars
// @namespace Fantasy Wars
// @description autoplayer for Fantasy Wars game I modified code from xauto-streetfights-office-bankmission http://orz.hk/wp-content/files/streetfightsbot_v2_1.user.js
// @include        http://apps.new.facebook.com/fantasy-wars/job.php
// @include        http://apps.new.facebook.com/fantasy-wars/bank.php
// @include        http://apps.facebook.com/fantasy-wars/job.php
// @include        http://apps.facebook.com/fantasy-wars/bank.php
// Version 0.5
// ==/UserScript==


// Things you can change
//---------------------------------------------------------------------------------------------
/*
進取工作
true - 5 分鐘 check 一次。一夠能力就做 job。reload 次數比較多，晚間 try again 錯誤機會較高，但萬一 try again 錯誤時損失較少。
false - 等能力升滿先做 job，等級高時 reload 次數少很多。晚間 try again 錯誤較少。而且因為唔做野會當 logout，比人打機會減少好多。但萬一 try again 錯誤時損失較大。
*/
var aggressive = true;
/* Fantasy Wars Job
自我訓練 id:1, req:1
調理農務 id:2, req:1
飼養馬匹 id:3, req:2
砍伐樹木 id:4, req:4
傳送密函 id:5, req:6

*/
var fantasymissionID = 3;   // Fantasy Wars Job。改這個的話，記得改埋 fightsmissionReq.
var fantasymissionReq = 2; // 
var bankthreshold = 100; // 現金上限，現金大於這個數，就所有錢存入銀行。
//---------------------------------------------------------------------------------------------


// Things you may change, but don't if you are not an expert
var fj='http://apps.new.facebook.com/fantasy-wars/job.php';
var fb='http://apps.new.facebook.com/fantasy-wars/bank.php';
var fj2='http://apps.facebook.com/fantasy-wars/job.php';
var fb2='http://apps.facebook.com/fantasy-wars/bank.php';

//---------------------------------------------------------------------------------------------


// Things you don't need to change, unless you are a coder. 
// If you made useful changes, please share it.
var last_check = new Date();
var backgroundcolor = '#eeeeff';
var status_tag = null;
var ranjob = false;
var check_interval;



if ( (location.href==fb) || (location.href==fj)||(location.href==fb2) || (location.href==fj2) ) {
	backgroundcolor = '#eeeeee';//要改
	status_tag = document.getElementById('app40813389603_main');//要改
}

// setup a count down box
var htmlElement = document.createElement('div');
htmlElement.id = 'neotimer';
htmlElement.style.top = '56px';
htmlElement.style.right = '2px';
htmlElement.style.position = 'absolute';
htmlElement.style.width = '160px';
htmlElement.style.height = '300px';
htmlElement.style.background = backgroundcolor;
htmlElement.style.font = '11px arial';
htmlElement.style.color = 'grey';
htmlElement.style.textAlign = 'center';
htmlElement.style.zIndex = 100;
window.parent.document.body.appendChild(htmlElement);


// start up check
function errorreload() {
    if ( (location.href==fb) || (location.href==fj)) {
		location.href=fj;
	} else if ( (location.href==fb2) || (location.href==fj2)) {
		location.href=fj2;
	}
}

function checkTime(i) {
  if (i<10) {i="0" + i;}
  return i;
}

function check_money() {
  // check money
  if ( status_tag === null) {return null;}
  var str = new RegExp('金幣:[^v]+').exec(status_tag.innerHTML);
  if (str === null) {return null;}
  var money = parseInt(str.toString(10).split('$')[1].split('<')[0].replace(/,/g,""),10);
  return money;	
 }

 function check_mind() {
  // check mind
  if ( status_tag === null) {return null;}
  var str = new RegExp('精神:[^<]+').exec(status_tag.innerHTML);
  if (str === null) {return null;}
  var mind = parseInt(str.toString(10).split(':')[1].split('/')[0],10);
  return mind;
}

 function check_maxmind() {
  // check mind
  if ( status_tag === null) {return null;}
  var str = new RegExp('精神:[^<]+').exec(status_tag.innerHTML);
  if (str === null) {return null;}
  var maxmind = parseInt(str.toString(10).split('/')[1],10);
  return maxmind;
}

function check_strength() {
  // check strength
  if ( status_tag === null) {return null;}
  var str = new RegExp('體力:[^<]+').exec(status_tag.innerHTML);
  if (str === null) {return null;}
  var strength = parseInt(str.toString(10).split(':')[1].split('/')[0],10);
  return strength;
}

function check_maxstrength() {
  // check strength
  if ( status_tag === null) {return null;}
  var str = new RegExp('體力:[^<]+').exec(status_tag.innerHTML);
  if (str === null) {return null;}
  var maxstrength = parseInt(str.toString(10).split('/')[1],10);
  return maxstrength;
}

function check_life() {
  // check strength
  if ( status_tag === null) {return null;}
  var str = new RegExp('生命力:[^<]+').exec(status_tag.innerHTML);
  if (str === null) {return null;}
  var life = parseInt(str.toString(10).split(':')[1].split('/')[0],10);
  return life;
}

function check_maxlife() {
  // check strength
  if ( status_tag === null) {return null;}
  var str = new RegExp('生命力:[^<]+').exec(status_tag.innerHTML);
  if (str === null) {return null;}
  var maxlife = parseInt(str.toString(10).split('/')[1],10);
  return maxlife;
}

function run_mission() {
  var action;
    if ( (location.href==fj)||(location.href==fj2) ) {
		if (check_strength(status_tag) < fantasymissionReq) {return '冇體力';}
		action = document.getElementById('app40813389603_mod_action-' + fantasymissionID);//要改!!
	} else if ( (location.href==fb)|| (location.href==fb2)) {
		return '存錢';
	} else {
		return '呢度邊道？唔好玩啦哥哥仔。 O.o';
	}
  if (action === null) {return '依？有問題';}
  var action_link = action.getElementsByTagName('a')[0];
  if (action_link === null) {return '下？有問題';}

  // click
  ranjob = true;
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  action_link.dispatchEvent(evt);
  return '做嘢！';
}


if (aggressive) {
	check_interval = 300; // if aggressive, check every 5 minutes
} else {
    if ( (location.href==fb) || (location.href==fj)||(location.href==fb2) || (location.href==fj2) )
	{
		// if not aggressive, check only when strength reach max
		check_interval = (check_maxstrength() - check_strength()) * 300;
	}
	// if something goes wrong, set reload in 1 hour
	if (check_interval < 300) {check_interval = 3596;}
}

function tick() {

  // display 
  var displaytext;
  displaytext = '<table width="100%" height="100%" style="border:medium double grey;font:11px arial;color:#333366;"><tr><td colspan=4 height=80>' ;
  displaytext += '　自動做嘢存錢機 v2.0<br />　　　　　by neo@orz.hk<br /><br />' ;
  displaytext += '　支援：Fantasy Wars<br />';

  displaytext += '</td></tr>' ;

  var current = new Date();
  displaytext += '<tr height=50><td colspan=4 style="border:medium dotted grey; text-align:center;">Current Time: ' + current.getHours() + ':' + checkTime(current.getMinutes()) + ':' + checkTime(current.getSeconds()) + '<br />';

  var seconds = (current - last_check) / 1000;
  displaytext += 'Next check: ' + (check_interval - Math.round(seconds)) + ' sec</td></tr>';

  displaytext += '<tr><td colspan=4></td></tr>';

  htmlElement.innerHTML = '<br />Checking life . . .';
  var life = check_life();
  var maxlife = check_maxlife();
  if (life !== null) {displaytext += '<tr height=20><td width="20"></td><td style="border-bottom:thin solid grey;">生命力:</td><td style="text-align:right;border-bottom:thin solid grey;">' + life + '/' + maxlife  + '</td><td width="20"></td></tr>';}

  htmlElement.innerHTML = '<br />Checking strength . . .';
  var strength = check_strength();
  var maxstrength = check_maxstrength();
  if (strength !== null) {displaytext += '<tr height=20><td width="20"></td><td style="border-bottom:thin solid grey;">體力:</td><td style="text-align:right;border-bottom:thin solid grey;">' + strength + '/' + maxstrength + '</td><td width="20"></td></tr>';}

  htmlElement.innerHTML = '<br />Checking mind . . .';
  var mind = check_mind();
  var maxmind = check_maxmind();
  if (mind !== null) {displaytext += '<tr height=20><td width="20"></td><td style="border-bottom:thin solid grey;">精神:</td><td style="text-align:right;border-bottom:thin solid grey;">' + mind + '/' + maxmind + '</td><td width="20"></td></tr>';}

  htmlElement.innerHTML = '<br />Checking money . . .';
  var money = check_money();
  if (money !== null) {displaytext += '<tr height=20><td width="20"></td><td style="border-bottom:thin solid grey;">金幣:</td><td style="text-align:right;border-bottom:thin solid grey;">$ ' + money + '</td><td width="20"></td></tr>';}

  htmlElement.innerHTML = '<br />Checking action . . .';
  var action = run_mission();
  displaytext += '<tr height=30><td colspan=4 style="text-align:center;">' + action + '</td></tr>';
  displaytext += '<tr><td colspan=4></td></tr>';
  displaytext += '</table>';
  
  htmlElement.innerHTML = displaytext;
  var GMregister = new GM_setValue('neoFacebookWorker', current.getHours() + ':' + checkTime(current.getMinutes()) + ':' + checkTime(current.getSeconds()));

  // reload on error
  if (document.getElementById('error_message') !== null) {
	window.setTimeout(function() { errorreload(); }, 30000);  // 30 seconds no respond, reload
    return;
  }

  // reload if a job ran
  if (ranjob === true) {
    ranjob = false;
	window.setTimeout(function() { errorreload(); }, 30000);  // 30 seconds no response, reload  
    return;
  }  
  
  
    if ( (location.href==fj)|| (location.href==fj2) ) {

	  // hourly income will save to bank, unless the script is set to non-aggressive and the user has enough time to fade out to background
	  if ((location.href==fj) && (current.getMinutes()===0) && (current.getSeconds()>=21) && (current.getSeconds()<=23) && 
		((aggressive) || (last_check.getMinutes() > 49))) {
		location.href=fb;
		return;
	  }
	  if ((location.href==fj2) && (current.getMinutes()===0) && (current.getSeconds()>=21) && (current.getSeconds()<=23) && 
		((aggressive) || (last_check.getMinutes() > 49))) {
		location.href=fb2;
		return;
	  }
	  
	  // reload according to the check interval
	  if (seconds > check_interval) {
		if ( location.href==fj ) {
			location.href=fb;
		}
		} else if ( location.href==fj2 ) {
			location.href=fb2;
		}
	    return;
	  }

	  // save money to bank
	  if (money > bankthreshold) {
		if ( location.href==fj ) {
			location.href=fb;
			return;
		} else if ( location.href==fj2 ) {
			location.href=fb2;
			return;
		}
	  }

    }

    // click the deposit button if there is money to save
    if ( (location.href==fb)|| (location.href==fb2) ) {
	    if (document.getElementsByName("amount").length > 1) {
	      if (parseInt(document.getElementsByName("amount")[1].value,10) > bankthreshold) {
			document.getElementsByName("deposit")[0].click();
			window.setTimeout(function() { errorreload(); }, 30000);  // 30 seconds no response, reload  
			return;
		  } else {
			if ( location.href==fb ) {
				location.href=fj;
			} else if ( location.href==fb2 ) {
				location.href=fj2;
			}
			window.setTimeout(function() { errorreload(); }, 30000);  // 30 seconds no response, reload  
			return;
	      }	
		} else {
			if ( location.href==fb ) {
				location.href=fj;
			} else if ( location.href==fb2 ) {
				location.href=fj2;
			}
			window.setTimeout(function() { errorreload(); }, 30000);  // 30 seconds no response, reload  
			return;
	    }
    }
  
  window.setTimeout(function() { tick(); }, 1049);  
}

// initial run
htmlElement.innerHTML = '<br />Initializing . . .' ;
window.setTimeout(function() { tick(); }, 500);