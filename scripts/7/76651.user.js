// ==UserScript==
// @name           Zoo World :: Auto Race
// @namespace      BonesKung
// @description    Facebook Game Zoo World Auto Race
// @include        http://fbeq.rockyou.com/facebook_apps/zoo/race_iframe.php*
// @version	0.0.1
// ==/UserScript==

var ms;
var retryReload = 60;
var delayRace = 125;

window.setTimeout(getRaceInFrame, 7000);

function getRaceInFrame() {

	var opp = document.getElementsByTagName("fb:profile-pic");
	if (opp.length >= 1) {
		var uid = opp[(Math.floor(Math.random()*opp.length))].getAttribute('uid');
		location.href = "javascript: raceOpponent("+uid+");";

		ms = delayRace;
		window.setTimeout(reloadPage, 1000);
	}
	else {
		ms = delayRace;
		window.setTimeout(reloadPage, 1000);
	}
}

function reloadPage() {
	if(ms>0)
	{
		window.setTimeout(reloadPage, 1000);
	} else {
		window.location.reload('true');
		ms = retryReload;
		window.setTimeout(reloadPage, 1000);
	}
}

function FormatCountDown (timeLeft)
{
	if (!timeLeft) return false;
	if (isNaN(parseInt(timeLeft))) return timeLeft;
   
	var hoursLeft = parseInt(timeLeft / 3600);
	var msLeft = timeLeft % 3600;
	var minLeft = parseInt(msLeft / 60);
	var detik = msLeft % 60;
	var penampakan = "";

	if (hoursLeft < 10) hoursLeft = "0" + hoursLeft;
	if (minLeft < 10) minLeft = "0" + minLeft;
	if (detik < 10) detik = "0" + detik;
	if (detik <= 0)
	{
		if (minLeft <= 0)
		{
			if (hoursLeft > 0) penampakan = hoursLeft + " h";
		}
		else if (hoursLeft > 0) penampakan = hoursLeft + " h " + minLeft + " m";
		else penampakan = minLeft + " m";      
	}
	else
	{
		if (hoursLeft <= 0)
		{
			if (minLeft > 0) penampakan = minLeft + " m " + detik + " s";
			else penampakan = detik + " s";
		}
		else penampakan = hoursLeft + " h " + minLeft + " m " + detik + " s";
	}
	msLeft=null;hoursLeft=null;minLeft=null;detik=null;
	return penampakan;
}