// ==UserScript==
// @name           XC_1
// @namespace      Edited
// @description    
// @include        http://apps.facebook.com/mousehunt/*
// @version        v1 - For friends only.

// ==/UserScript==

// set this to "false" (without quote) if you don't want the auto turn
var adsColumn = document.getElementById('sidebar_ads');

var MythM_ =
'<div>' +
	'<div><b>Messages:</b><br/><span id="MythM_Info"></span></div><br/>' +
	'<div><b>Next Auto:</b><br/><span id="MythM_Time">00:00</span></div>' +
'</div><hr/><br/>';
adsColumn.innerHTML = MythM_ + adsColumn.innerHTML;

var MythM_ElementInfo = document.getElementById('MythM_Info');
var MythM_ElementTime = document.getElementById('MythM_Time');
var MythM_RemainingTime = -1;
var MythM_TimeOut = -1;
var MythM_Minute = '00';
var MythM_Second = '00';
var MythM_Counter = 0;
var MythM_Timer = 0;
var i=0;
var j=0;
var timerWordIndex = document.body.innerHTML.indexOf('next_activeturn_seconds\\":')
var wordlength = 'next_activeturn_seconds\\\":'.length
var timerIndex = (timerWordIndex + wordlength)
Mythtimer = parseFloat(document.body.innerHTML.substring(timerIndex, (timerIndex + 6)))

//Random delay of blowing after the actual horn blowing time
var mhDelay_min = 5;                      // minimum delay in seconds
var mhDelay_max = 50;                     // maximum delay in seconds
autoTurn();

function autoTurn() {
	

	if ((document.body.innerHTML.indexOf('Claim Your Reward!') != -1)||(document.body.innerHTML.indexOf('The Downtime Lounge!') != -1)||(document.body.innerHTML.indexOf('Please wait a few seconds before reloading the page') != -1)) {
		MythM_ElementTime.innerHTML = "NOT RUNNING (PUZZLE / NO CARD)";
		return;
	}

	if (document.body.innerHTML.indexOf('hornbutton') == -1)
     { document.title = "White Page of Death, refreshing in 5 min";
     setTimeout(function() {document.location = 'http://apps.facebook.com/mousehunt/'; }, 200000) }
	
	// some null is usually occurs, due it's generated on the onReload stuff... oh well...
	if (Mythtimer == null) {
		MythM_ElementInfo.innerHTML = 'timer is null!<br />going to retry again in 5 seconds - tries #' + MythM_Counter + ' (will retry 5x)';
		MythM_Counter++;

		if (MythM_Counter == 6) {
			document.location = 'http://apps.facebook.com/mousehunt/';
		} else {
			setTimeout(autoTurn, 300000);
		}
		return;
	}

	MythM_ElementInfo.innerHTML = "";

	// set the time, add a random 30 seconds, so it will think you're the one who click
	MythM_TimeOut = (parseInt(Mythtimer) + Math.round(Math.random() * mhDelay_max) + mhDelay_min) * 1000;
        MythM_Timeout2 = Math.round(Math.random*3)*1000;


	// the "click"
	setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/turn.php'; }, MythM_TimeOut);




	// decoration, timer
	MythM_Timer = parseInt(MythM_TimeOut / 1000);

	// force refresh the time
	writeTime();
}

// this is just the decoration, it will show you how much time untill it will err... explode
function writeTime() {
	MythM_Minute = parseInt(MythM_Timer / 60).toString();
	MythM_Second = parseInt(MythM_Timer - (MythM_Minute * 60)).toString();

	if (MythM_Minute.length == 1) MythM_Minute = '0' + MythM_Minute;
	if (MythM_Second.length == 1) MythM_Second = '0' + MythM_Second;
	MythM_ElementTime.innerHTML = MythM_Minute + ':' + MythM_Second;

	// reduce time
	MythM_Timer -= 1;

	// repeat
	setTimeout(writeTime, 1000);
}
// END OF AUTOHUNT FEATURE