// ==UserScript==
// @name       Imperion time ETA
// @namespace  http://ad-soft.hu/
// @version    1.0
// @description  Expected time of arrival
// @match      http://*.imperion.*/*
// @copyright  2012+, Daniel Adamkó
// ==/UserScript==

setInterval(ETA, 3000);

function ETA() {
    var el = document.getElementsByClassName("seconds");
    for(var i = 0; i < el.length; i++) {
        el[i].title = PARSE(el[i].innerHTML);
    }
}

function PARSE(str) {
    var minus = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var minusLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var d = new Date();
    var s = str.split(":");
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = new Number(s[0]) + d.getHours();
    var minutes = new Number(s[1]) + d.getMinutes();
    var seconds = new Number(s[2]) + d.getSeconds();
    
    if(seconds > 59) {
     	minutes += Math.floor(seconds / 60);
        seconds %= 60;        
    }
    if(minutes > 59) {
    	hours += Math.floor(minutes / 60);
        minutes %= 60;
    }
    if(hours > 23){
        day += Math.floor(hours / 24)
        hours %= 24;
    }
    if((year % 400 == 0 || year % 4 == 0) && year % 100 != 0) {
        if(day > minusLeap[month]) {
            if(month == 12) {
                year++;
                month = 1;
                day %= minus[month];
            } else {
                month++;
                day %= minusLeap[month];
            }
        }
    } else {
        if(day > minus[month]) {
            if(month == 12) {
                year++;
                month = 1;
            } else {
                month++;
            }
            day %= minus[month];
        }
    }
    return year + "." + (month < 10 ? 0 : "") + month + "." + (day < 10 ? 0 : "") + day + ". " + hours + ":" + (minutes < 10 ? 0 : "") + minutes + ":" + (seconds < 10 ? 0 : "") + seconds;
}