// ==UserScript==
// @name           OnlineClock Set Alarm
// @namespace      http://online.net/*
// @description    Sets the alarm on the site to 7:07 am
// @include        http://onlineclock.net/
// ==/UserScript==

var alarmHour = document.getElementsByName("alarm_hour");
var alarmMin = document.getElementsByName("alarm_minute");

alarmHour[0].selectedIndex=7;
alarmMin[0].selectedIndex=7;