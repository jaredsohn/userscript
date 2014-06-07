// ==UserScript==
// @name          Page Timer (New With jQuery)
// @namespace     http://pto2k.blogspot.com
// @description   Show The Time You Wasted on One Page/ Precise Timing/ Language selectable/ Simple Alarm
// @include       *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require       http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.min.js
// ==/UserScript==

/*
Changelog

2009-02-01
keep refreshing page in a given time(via command menu or clicking the timer)
warning:DO NOT set it too low, or you will have no time to change it back...

2009-01-30
rewrote with jQuery
Show The Time You Wasted on One Page
Precise Timing
Language selectable
Simple Alarm
*/
var loc = window.location.href
var language = GM_getValue('language','1');
var alarm = GM_getValue('alarm','5');
var alarmUTC = 0
var refresh = GM_getValue(loc+'_refreseIn','0')*1
var refreshUTC = refresh==0?0:new Date().getTime()+refresh*60*1000;
var startTimeUTC = new Date().getTime()
GM_registerMenuCommand("PagerTime-Language Select", function() {
	language = prompt("Input Code Please:\n1:简体中文\n2:繁体中文\n3:日本語\n4:English",language)
	if(language){
		GM_setValue('language', language);
		switchLang();
	}
	}
);
GM_registerMenuCommand("PagerTime-SetAlarm", function() {
		alarm=prompt("Set Alarm in Miniutes('0.5' acceptable):",alarm);
		if(alarm) {
			alarmUTC = new Date().getTime()+alarm*60*1000;
		}
	}
);
GM_registerMenuCommand("PagerTime-SetRefresh", function(){setRefreshTime()});
function logToConsole(log){
    if(unsafeWindow.console){
       unsafeWindow.console.log(log);
    }else{
    GM_log(log);
    }
}
function switchLang(){
	switch ( language ) {
		case '2':
			hourStr = '小時';
			minStr = '分';
			secStr = '秒';
			break;
		case '3':
			hourStr = '時間';
			minStr = '分';
			secStr = '秒';
			break;
		case '4':
			hourStr = 'h';
			minStr = 'm';
			secStr = 's';
			break;
		case '1':
		default:
			hourStr = '小时';
			minStr = '分';
			secStr = '秒';
	}
}
function refreshTimeDiv() {
	nowTime = new Date();
	nowTimeUTC = nowTime.getTime()
	timeDiff = Math.round((nowTimeUTC - startTimeUTC)/1000)
	hour = Math.floor(timeDiff/3600)
	min = Math.floor((timeDiff)%3600/60)
	sec = ((timeDiff)%3600)%60
	$('#TimeDiv').text((hour>0?hour+hourStr:'')+(min>0?min+minStr:'')+(sec>0?sec+secStr:''))
	if((alarmUTC!=0)&&(alarmUTC<nowTimeUTC)){
		alert(alarm+minStr);
		alarmUTC = 0;
	}
	if((refreshUTC!=0)&&(refreshUTC<nowTimeUTC)){
		window.location.href=window.location.href;
	}
	if(refreshUTC==0){$('#TimeDiv').css({"background-color":"black","color":"white"})}else{$('#TimeDiv').css({"background-color":"lime","color":"black"})}
}
function TimeDivPos(){
	TimeDiv.style['position'] = 'fixed'
	TimeDiv.style['top'] = '-1px'
	TimeDiv.style['left'] = '-1px'
}
function setRefreshTime() {
	refresh=prompt("Set Refresh in Miniutes('0.5' acceptable), 0 to disable:",GM_getValue(loc+'_refreseIn','0'));
	GM_setValue(loc+'_refreseIn',refresh)
	refreshUTC = refresh*1==0?0:new Date().getTime()+refresh*60*1000;
}

GM_addStyle("#TimeDiv{font-family:'Lucida Grande';font-size:0.7em;word-wrap:break-word !important; overflow:hidden !important;cursor:pointer;border:1px solid gray ;width:auto !important;opacity:0.85 ;padding:2px 6px 2px 6px;z-index:9999999 ;verticle-align:center !important;}");
TimeDiv = document.createElement('DIV')
TimeDiv.id = 'TimeDiv'
$('body').append(TimeDiv)
TimeDivPos()
switchLang()
setInterval(function(){refreshTimeDiv()},1000)

$('#TimeDiv').bind('mouseover',function(){
	$('#TimeDiv').hide("slide", {direction:"up"},2000,function(){
		setTimeout(function(){
			TimeDivPos();
			$('#TimeDiv').show("slide",{direction: "up" },2000)
		},1000)
	});
}).bind('click',function(){setRefreshTime()})

//logToConsole(GM_listValues())
//EOF