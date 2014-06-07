// ==UserScript==
// @name       RSI TIME 
// @version    0.2 
// @description  simple little clock to throw up on the CIG RSI pages.
// @include     https://*.robertsspaceindustries.com/*
// @copyright  2013, Greevus
// sample text UEE UTC: 15:30:42CE Local Earth TIme: 10:30 2013 
// ==/UserScript==


if (window.top != window.self) return;

var topbar = document.getElementById("social");

var box = document.createElement("div");
box.setAttribute("style", "color:#ce926d; font-family:arial; font-size:10pt; padding-top:25px; margin-left:520px; z-index:999; font-weight:bold;");

topbar.appendChild(box);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

	var tTab = " &nbsp; &nbsp; &nbsp; &nbsp;";
	
    var WM = new Date();
    if(WM.getDay() < 5 ) {WM.setDate(WM.getDate()+ (5 - WM.getDay()));};
    if(WM.getDay() > 5 ) {WM.setDate(WM.getDate()+ (WM.getDay() - 1))};
	
	WM.setHours(11);
    WM.setMinutes(0);

    var now = new Date();
    var distance = WM - now;
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

	tWM = "<font style='color:#25e4ff;'>Wingman's Hangar</font>: " + (hours + (days * 24)) + " hrs, " + minutes +" min";

function tick()
{
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	
	var dU = new Date();
	var hU = dU.getUTCHours();
	var mU = dU.getUTCMinutes();
    
	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
	if (hU < 10) hU = "0" + hU;
	if (mU < 10) mU = "0" + mU;
    
    box.innerHTML = "<font style='color:#25e4ff;'>UEE UTC</font>: " + hU + ":" + mU +" 2943" +  tTab + "<font style='color:#25e4ff;'>Local Earth Time</font>: " + h + ":" + m +" 2013" + tTab + tWM;
    
}

tick();
setInterval(tick, 9000);
