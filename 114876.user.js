// ==UserScript==
// @name Grepo_Alarm_V2
// @namespace trar
// @include http://*.grepolis.*/game/*
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

allTableContent=document.evaluate(
	"//span[@id='game_incoming']",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

cookie=document.cookie;

expr=/^.*grepoalarm_v2=(.*)/;
expr.exec(cookie);
cookie=RegExp.$1;
first = cookie.lastIndexOf("[Anfang]");
cv_countAttacks = cookie.substring(first+9, cookie.indexOf("[AnzahlE]"));

first = cookie.lastIndexOf("[Count]");
cv_count = cookie.substring(first+7, cookie.indexOf("[CountE]"));


var $ = uW.jQuery;
var time = 300000; //in milli sec ein sec = 1000 milli sec
var sound = "http://www.villaruth.net/stregthen.wav";
var str = document.createElement('audio');
var $str = $(str);

$str.attr('src', sound);
var countAttacks,count;
countAttacks = 0;
count = 10;
if(document.getElementById("game_incoming"))
{
	countAttacks = allTableContent.snapshotItem(0).firstChild.nodeValue;
	if(cv_count < count){ 
		str.load();
		str.play(0);
		cv_count++;
	}
	//alert(cv_count);	
	//alert(countAttacks);
	//alert(cv_countAttacks);
	if(countAttacks > cv_countAttacks){
		cv_count = 0;
	} 
}

var expires = new Date();
var twoMonths = expires.getTime() + (60 * 24 * 60 * 60 * 1000);
expires.setTime(twoMonths);
document.cookie = "grepoalarm_v2=[Anzahl]" + countAttacks + "[AnzahlE] [Count]" + cv_count+ "[CountE]";

window.setTimeout("window.location.reload()", time);