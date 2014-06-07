// ==UserScript==
// @name           Starfleet Test
// @namespace      *.playstarfleetextreme.com*
// @include        http://*.playstarfleetextreme.com/profile/overview*
// ==/UserScript==
/*
Versoin 1.0
Changelog:
Thursday, February 24, 2011
- Initial Script writing


For questions or suggestions, email me at Alacrondoom606@gmail.com
*/
var url = location.href
var StarfleetCountdown = document.getElementsByClassName('countdown');
var sfsplit;
var t;
var f;
var num1;
var num2;
var num3;
var timetowait;
DisplayMessage(' ');
getsmallest();
function getsmallest() {
	if (StarfleetCountdown[0]) {
		StarfleetCountdown = document.getElementsByClassName('countdown');
		var length = StarfleetCountdown.length;
		var sfnum = 0;
		var smallest = 0;
		var numbah = 0;
		while (sfnum < length) {
			sfsplit = StarfleetCountdown[sfnum].innerHTML.split(":");
			num1 = parseInt(sfsplit[0]);
			num2 = parseInt(sfsplit[1]);
			num3 = parseInt(sfsplit[2]);
			numbah = num1 * 60 * 60 + num2 * 60 + num3
			if (sfnum < 1) {
				smallest = numbah;
			}
			if (numbah < smallest) {
				smallest = numbah;
			}
			sfnum++;
			timetowait = smallest;
		}
		timedCount();
	}
	if (!StarfleetCountdown[0]) {
	document.getElementById('GM_Message').innerHTML='SError... Please refresh.';
	}
}
function timedCount() {
	if (timetowait < 1) {
		document.getElementById('GM_Message').innerHTML='<EMBED SRC="http://www.soundjay.com/button/sounds/beep-1.mp3" AUTOSTART=true HIDDEN=True HEIGHT=60 WIDTH=144>BEEP!';
		//t=setTimeout(function() { location.reload(true) } ,10000);
		//t=setTimeout(function() { DisplayMessage(document.getElementById('GM_Message').innerHTML='Refreshing...'); } ,10000);
		t=setTimeout(function() { getsmallest() } ,7000);
	    t=setTimeout(function() { document.getElementById('GM_Message').innerHTML='One Moment...'; } ,3000);
		f=setTimeout(function() { ClearTimeout(t); } ,11000);
	}
	if (timetowait >= 1) {
		timetowait--;
		document.getElementById('GM_Message').innerHTML='Seconds Remaining: '+timetowait;
		t=setTimeout(function() { timedCount() } ,1000);
	}
}
function DisplayMessage(message) {
	var gm_button=document.createElement('div');
	gm_button.setAttribute('name','gm-button');
	gm_button.setAttribute('id','gm-button');
	gm_button.setAttribute('style','position:fixed;bottom:10px;right:10px;background-color:#FFFFFF;border:2px solid #000000;padding:5px;text-align:center;');
	var gm_paragraph=document.createElement('p');
	gm_paragraph.setAttribute('id','GM_Message');
	gm_paragraph.setAttribute('style','font:normal normal normal 20px Arial,Helvetica,sans-serif;color:#000000;text-decoration:none;margin:0;padding:0;');
	gm_paragraph.innerHTML = message;

	var gm_span_1=document.createElement('span');
	gm_span_1.setAttribute('id','gm-span-1');
	gm_span_1.setAttribute('style','cursor:pointer;');

	document.getElementsByTagName('body')[0].appendChild(gm_button);
	gm_button.appendChild(gm_paragraph);
	gm_paragraph.appendChild(gm_span_1);
}