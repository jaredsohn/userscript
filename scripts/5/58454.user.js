// ==UserScript==
// @name           MythMonger AutoTurn
// @namespace      WackyFish
// @description    MythMonger AutoTurn
// @include        http://apps.facebook.com/mythmonger/*
// ==/UserScript==

// if you want to change the "waiting time", set it here, default is set to 30 seconds
var __doh_WaitingTime = 30;


// below is not for you to edit :)
var __adsColumn = document.getElementById('sidebar_ads');
var __doh_ =
'<div>' +
	'<div><b>Messages:</b><br/><span id="__doh_Info__"></span></div><br/>' +
	'<div><b>Next Auto:</b><br/><span id="__doh_Time__">00:00</span></div>' +
'</div><hr/><br/>';
__adsColumn.innerHTML = __doh_ + __adsColumn.innerHTML;

var __doh_ElementInfo = document.getElementById('__doh_Info__');
var __doh_ElementTime = document.getElementById('__doh_Time__');
var __doh_RemainingTime = -1;
var __doh_TimeOut = -1;
var __doh_Minute = '00';
var __doh_Second = '00';
var __doh_Counter = 0;
var __doh_Timer = 0;


autoTurn();


function autoTurn() {
	if ((document.title.toLowerCase().indexOf("puzzle") > -1) || (getElementsByClassName(document.getElementById('app79378246206_mainContent'), 'div', 'overbar-c')[0].innerHTML.indexOf('x0') != -1)) {
		__doh_ElementTime.innerHTML = "NOT RUNNING (PUZZLE / NO CARD)";
		return;
	}

	__doh_RemainingTime = unsafeWindow.a79378246206_remainingActiveTurnWaitSeconds;
	if (__doh_RemainingTime == null) {
		__doh_ElementInfo.innerHTML = 'timer is null!<br />going to retry again in 5 seconds - tries #' + __doh_Counter + ' (will retry 5x)';
		__doh_Counter++;

		if (__doh_Counter == 6) {
			document.location = 'http://apps.facebook.com/mythmonger/';
		} else {
			setTimeout(autoTurn, 5000);
		}
		return;
	}

	__doh_ElementInfo.innerHTML = "";

	// set the time, add a random xx seconds, so it will think you're the one who click
	__doh_TimeOut = (parseInt(__doh_RemainingTime) + Math.round(Math.random() * __doh_WaitingTime) + (__doh_WaitingTime / 10)) * 1000;

	// the "click"
	setTimeout(function() { document.location = 'http://apps.facebook.com/mythmonger/turn.php'; }, __doh_TimeOut);

	// decoration, timer
	__doh_Timer = parseInt(__doh_TimeOut / 1000);

	// force refresh the time
	writeTime();
}

function writeTime() {
	__doh_Minute = parseInt(__doh_Timer / 60).toString();
	__doh_Second = parseInt(__doh_Timer - (__doh_Minute * 60)).toString();

	if (__doh_Minute.length == 1) __doh_Minute = '0' + __doh_Minute;
	if (__doh_Second.length == 1) __doh_Second = '0' + __doh_Second;
	__doh_ElementTime.innerHTML = __doh_Minute + ':' + __doh_Second;

	// reduce time
	__doh_Timer -= 1;

	// repeat
	setTimeout(writeTime, 1000);
}


/*
	getElementByClassName
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com
*/
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}
