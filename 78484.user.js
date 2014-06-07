// ==UserScript==
// @name			Ogamealarma
// @version			new
// @namespace		Skeletondevil
// @description		Yeni versiyon icin
// @include			http://*.ogame.*/*
// @include			http://ogame.*/


//	Goto -> http://formtoemail.com/
//		(Click Free Version, then Download, you will need to unzip it, make some text edits and then
//		copy it to your webhost)
//	
//	FormToEmail.php is needed. (On my webhost I had to rename it to FormToEmail.php5).
//		This file must be hosted by a server of your choosing. Im sure you can find a free one that
//		supports PHP somewhere.  You will need to make a few changes to that file with a text editor
//		then copy that file to your webhost.
//
//	Open FormToEmail.php in some text editor and  :
//		-   goto the line that starts with "$my_email =" (i think its line 101)... to enter the email address
//			you wish to recieve the ogame messages. In server-side PHP, your email address is much
//			safer, and invisible on the internet.
//		-   Comment out line 152 ( goto line 152 and put // in the beginning)
//			(its the line that starts with "if(!(isset($_SERVER['HTTP_REFERER']) ")

// ==/UserScript==

//**** Begin user variables ****
//
//	After you have setup your PHP server. (by copying that PHP file over to the webhoster). You will need
//	to get its URL.  Something like: HTTP://www.FreeDomainsOrSomething.com/UserAccount/FormToEmail.php5
// 	That URL will need to be copied into this place here, inbetween the double-quotes:
var EmailURL = "delete this";
// Example: var EmailURL = "http://www.FreeDomainsOrSomething.com/UserAccount/FormToEmail.php5";

// ** Some sound URL options for ya. You will need to copy and paste the URLs here to the variables in the code
//		 below. These websites have multitudes of sounds to choose from; these are just few.
//var probeSound = "hhttp://simplythebest.net/sounds/WAV/events_WAV/event_WAV_files/alarm_3.wav";
//var attackSound    = "http://www.ilovewavs.com/Effects/War/Sound%20Effect%20-%20Air%20Raid%20Siren%2002.wav";
//var attackSound = "http://xlx.ogame.free.fr/sons/sirene1.mp3";
//var messageSound   = "http://www.ilovewavs.com/Effects/Beeps/FlyinOff.wav";
//var messageSound -> http://simplythebest.net/sounds/WAV/WAV_files/cartoon_WAV_files/meep_meep.wav

var probeSound = "http://simplythebest.net/sounds/WAV/events_WAV/event_WAV_files/alarm_3.wav";
var attackSound    = "http://xlx.ogame.free.fr/sons/sirene1.mp3";
var attackSoundRIP    = "http://www.ilovewavs.com/Effects/War/Sound%20Effect%20-%20Air%20Raid%20Siren%2002.wav";
var messageSound   = "http://simplythebest.net/sounds/WAV/WAV_files/cartoon_WAV_files/meep_meep.wav";
var confedeSound   = "http://xlx.ogame.free.fr/sons/sirene2.mp3";

// ** Volume Settings
var volMessages	= "50";   // Setting to 0 also mutes everything but probes and attacks.
var volProbes	= "75";
var volAttacks  = "100";

// ** Email Timeout. This is how long it will wait until it tries to close the window (tab) that the emailer opened. Default is 15 seconds = 15000
var EmailWindowTimeout = 15000;

var LOG_LEVEL = 0;

// ** ReLoader wait range. Default is that it will wait between 14 to 30 minutes randomly to Reload the game.
var MIN = 840;  // Minmum number of seconds to wait until reload overview. Default = 14 minutes = 840 seconds
var MAX = 1800; // Maximum number of seconds to wait until reload overview. Default = 30 minutes = 1800 seconds
// ***** End User Variables ****

// ***** Begin Main Variables
var theSound=0;
var ReLoadID;
var newWin = null;
// ***** End  Main Variables
/////*****  END ***** VARIABLE DECLARATIOPNS  *****/////

/////*****  BEGIN ***** FUNCTION DECLARATIOPNS  *****/////
function bLog (msg) {
	if ( LOG_LEVEL > 0 ) GM_log(msg);
}

function myRandomNumber() {
	aleat = Math.random() * (MAX-MIN);
	aleat = Math.round(aleat);
	return parseInt(MIN) + aleat;
} 

function playSound() {
	body = document.getElementsByTagName("body")[0];
	var emb = document.createElement("embed");
	emb.src = theSound;
	emb.setAttribute("autostart", "true");
	emb.setAttribute("loop", "false");
	emb.setAttribute("hidden", "true");
	switch ( theSound ) {
		case attackSound:	emb.setAttribute("volume", volAttacks);
							break;
		case probeSound:	emb.setAttribute("volume", volProbes);
							break;
		default:			emb.setAttribute("volume", volMessages);
							break;
	}
	body.appendChild(emb);
}

function sendMail(from,subject) {
	if ( EmailURL == "delete this" ) {
		GM_log("You need to set the EmailURL at the top of the code.");
		return;
	}
	var tForm = document.createElement("FORM");
	tForm.setAttribute("action",EmailURL); // You will need an external PHP server that has the FormToEmail.php5 file hosted on it (in that PHP file you enter the email address you wish to send all this goodness to )
	tForm.setAttribute("method", "post");
	tForm.setAttribute("target","_self");
	tForm.setAttribute("type","hidden");
	var tElement1 = document.createElement("INPUT");
	tElement1.setAttribute("type","text");
	tElement1.setAttribute("name","name");
	tElement1.setAttribute("value",subject);  //Used here to show amount of time until the attack hits. (Ex: Attack hits in 4h21m5s)
	var tElement2 = document.createElement("INPUT");
	tElement2.setAttribute("type","text");
	tElement2.setAttribute("name","email");
	tElement2.setAttribute("value",from);  //Can be any text in the form :   text@text.text. Used here to show the attack arrival time (ex: Attack@03.42.06.. local time)
	var tElement3 = document.createElement("TEXTAREA"); // to Conform to the standard Forms2Email.php page
	tElement3.setAttribute("name","comments");
	tElement3.setAttribute("value","you have incoming cheese");
	var tElement4 = document.createElement("INPUT");
	tElement4.setAttribute("type","submit");
	tElement4.setAttribute("value","send");
	tElement4.setAttribute("id","SendIt");
	
	tForm.appendChild(tElement1);
	tForm.appendChild(tElement2);
	tForm.appendChild(tElement3);
	tForm.appendChild(tElement4);
	
	if ( typeof (newWin) == "undefined" || newWin == null ) newWin = window.open("","EmailerWindow");  // Create a new window to put this form in and send off the email. Then trys to close the window after 15 seconds.
	newWin.document.body.appendChild(tForm);
	tElement4.click();
	setTimeout("newWin = window.open(\"\",\"EmailerWindow\"); if (newWin != null) newWin.close();", EmailWindowTimeout);
}

function AlarmCheck (){
	var hostileSpan = document.getElementById("eventdetails").getElementsByClassName("tipsStandard");
	var sUrl = hostileSpan[0].href.split("/");
	sUrl = sUrl[sUrl.length-1];
	bLog("url = " + sUrl);
	theSound = 0;
	if ( parseInt(document.getElementById("message_alert_box").title.replace("|","")) > 0 ) theSound = messageSound;
	var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET",sUrl, true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) { //complete
				if (httpRequest.status == 200) { // ok
					//bLog("Content = \n" + httpRequest.responseText);
					var holder = document.createElement('div');
					holder.innerHTML = httpRequest.responseText;
					var tEvents = holder.getElementsByClassName("eventFleet");
					bLog("i found " + tEvents.length + " events!");
					var tPlayerType, tMission;
					var tCount = 0;
					for ( var i = 0 ; i < tEvents.length ; ++i ) {
						tPlayerType = tEvents[i].getElementsByClassName("hostile");
				//		tPlayerType = tEvents[i].getElementsByClassName("friendly");
						if ( tPlayerType.length < 1 ) continue;
						tMission = tEvents[i].getElementsByClassName("missionFleet");
						if ( tMission.length < 1 ) continue;
						if ( tMission[0].firstChild.src.indexOf("angriff") != -1 ) {
							theSound = attackSound;
							break;
						}
					}
					if ( theSound != 0 ) {
						playSound();
						if ( theSound == attackSound ) sendMail("Attack@ogame.org", "You have an incoming attack!");
					}
				}
			}
		}
	httpRequest.send(null);
}
/////*****  END  ***** FUNCTION DECLARATIOPNS  *****/////

/////*****  BEGIN ***** MAIN CODE BLOCK  *****/////
bLog("location = " + location);

if ( location.search.indexOf("eventList") != -1 ) return;

ReLoadID = setTimeout("window.location.reload();",myRandomNumber()*1000);

window.addEventListener("load", AlarmCheck,false);
/////*****  END  ***** MAIN CODE Skeletondevil *****/////
/////*****  END ***** OGAME ALARM by skeletondevil *****/////
