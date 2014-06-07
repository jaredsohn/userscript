// ==UserScript==
// @name        看你在K島浪費多少時間
// @namespace   http://userscripts.org/users/499785
// @include     http://eden.komica.org/00/*
// @include	http://*.komica.org/*/*
// @include	http://*.komica.net/*/*
// @include	http://*.komica2.net/*/*
// @include	http://*.komica3.net/*/*
// @include	http://*.komica4.net/*/*
// @include	http://komica*.dreamhosters.com/*
// @exclude http://komica2.dreamhosters.com/bbsmenu.htm
// @version     1
// ==/UserScript==
var KEY = "komica_waste_time", KEY_F5 = "komica_key_f5";
var wasted_time = GM_getValue(KEY), f5_pressed = GM_getValue(KEY_F5);

if( typeof wasted_time == 'undefined' ){
	GM_setValue(KEY, 0);
    wasted_time = 0;
}

if( typeof f5_pressed == 'undefined'){
    GM_setValue(KEY_F5, 0);
    f5_pressed = 0;
}
 
var d = document.createElement("div"), time_d = document.createElement("div"), f5_d = document.createElement("div");
d.style.position = "fixed";
d.style.right = 10;
d.style.bottom = 10;
d.style.color = "red";
d.align = "right";

f5_d.innerHTML = "F5次數: " + f5_pressed;
d.appendChild(f5_d);

time_d.innerHTML = "你已經在K島浪費了 " + secondsToString(wasted_time);
d.appendChild(time_d);

document.body.appendChild(d);

setInterval(function(){
    GM_setValue(KEY, ++wasted_time);
	
    time_d.innerHTML = "你已經在K島浪費了 " + secondsToString(wasted_time);
    
}, 1000);

document.onkeydown = function(e){
    var k = e.keyCode||e.which||e.charCode;
    if(k==116)
    	GM_setValue(KEY_F5, ++f5_pressed);
}

function secondsToString(seconds){
    var numdays = Math.floor(seconds / 86400);
    var numhours = Math.floor((seconds % 86400) / 3600);
    var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var numseconds = ((seconds % 86400) % 3600) % 60;
    
    return (numdays>0 ? numdays + " 天 " : "") + (numhours>0 ? numhours + " 小時 " : "") + (numminutes>0 ? numminutes + " 分鐘 " : "") + numseconds + " 秒";
}
