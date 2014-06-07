// ==UserScript==
// @name           Bootleggers Timer Fix
// @namespace      http://
// @description    Fixes the NaN issue on various timers for Firefox 3.6 users
// @include        http://www.bootleggers.us/*
// ==/UserScript==

document.getElementById("timeleft").id = "timeleft_new";

var minsLeft = document.getElementById("timeleft_new").innerHTML.split(":");
var secsLeft = parseInt(minsLeft[0]*60*60) + parseInt(minsLeft[1]*60) + parseInt(minsLeft[2]);

StartCountDown("timeleft_new",secsLeft, "Time has Expired!");
unsafeWindow.CountBack = CountBack;


function StartCountDown(myDiv,myTargetDate,action) {
	
	CountBack(myDiv,myTargetDate, action);
	
}


function Calcage(secs, num1, num2) {
	
	s = ((Math.floor(secs/num1))%num2).toString();
	
	if (s.length < 2) {	
	  s = "0" + s;
	}
	
	return (s);

}


function CountBack(myDiv, secs, action) {
	
	var DisplayStr;
	
	var DisplayFormat = "%%H%%:%%M%%:%%S%%";

	DisplayStr = DisplayFormat.replace(/%%D%%/g, Calcage(secs,86400,100000));
	DisplayStr = DisplayStr.replace(/%%H%%/g, Calcage(secs,3600,24));
	DisplayStr = DisplayStr.replace(/%%M%%/g, Calcage(secs,60,60));
	DisplayStr = DisplayStr.replace(/%%S%%/g, Calcage(secs,1,60));
	
	if(secs > 0) {	
	  document.getElementById(myDiv).innerHTML = DisplayStr;
	  setTimeout("CountBack('" + myDiv + "'," + (secs-1) + ", '" + action + "');", 990);
	}
	else {
	  document.getElementById(myDiv).innerHTML = action;
	}

}