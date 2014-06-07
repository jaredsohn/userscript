// ==UserScript==
// @name Grepo_Alarm_V2
// @namespace trar
//  
// @include http://*.grepolis.*/game/*
// @exclude http://*.grepolis.com/game/town_overviews?*
// @description angriffswarner geht nur wenn du auf stadtmauer gehst
// ==/UserScript==

if (typeof unsafeWindow === 'object'){
	uW = unsafeWindow;
} else {
	uW = window;
}

var uW,allTableContent;
var cookie;
var expr,first,cv_countAttacks,cV_count;
var cv_count=0;


cookie=document.cookie;
console.log("cookie:  " + cookie);
expr=/^.*grepoalarm_v2=(.*)/;
expr.exec(cookie);
cookie=RegExp.$1;

first = cookie.lastIndexOf("[Anfang]");
cv_countAttacks = cookie.substring(first+9, cookie.indexOf("[AnzahlE]"));

first = cookie.lastIndexOf("[Count]");
cv_count = cookie.substring(first+7, cookie.indexOf("[CountE]"));


var $ = uW.jQuery;
var time = 240; //in sec ein sec = 1000 milli sec
var sound = "http://www.villaruth.net/stregthen.wav";
var str = document.createElement('audio');
//var str2 = $(str);

//str2.attr('src', sound);
var countAttacks,count;
countAttacks = 0;
count = 1;
//console.log("Hier");

function check(){

   allTableContent=document.evaluate(
	"//div[@id='incoming_attack_count']",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    countAttacks = allTableContent.snapshotItem(0).innerHTML;
    console.log("countAttacks" + countAttacks);

}


if(document.getElementById("incoming_attack_count"))
{
	console.log("found attac");
	
//	window.setTimeout("check()",3000);
//	check();
//	console.log("cv_countAttacks_:" + countAttacks);
//	if(cv_count < count){ 
//		str.load();
//		str.play(0);
		alert("Angriff");
//		cv_count++;
//	}
//	console.log("cv_count"+cv_count);
//	console.log("countAttacks" + countAttacks);
	
//	if(countAttacks > cv_countAttacks){
//		cv_count = 0;
//	} 
}



var expires = new Date();
var twoMonths = expires.getTime() + (60 * 24 * 60 * 60 * 1000);
expires.setTime(twoMonths);
//document.cookie = "grepoalarm_v2=[Anzahl]" + countAttacks + "[AnzahlE] [Count]" + cv_count+ "[CountE]";
//console.log("Hier2");

window.setTimeout("window.location.reload()", time * 1000);