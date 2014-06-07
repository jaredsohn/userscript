// ==UserScript==
// @name			Sporcle Give-Up-Enabler + Timer Pause
// @author			Anthony Myre
// @namespace		http://tonyfox.ws/
// @description		Allows you to instantly give up on sporcle.com, and pause the timer
// @version			2.0
// @include			http://*sporcle.com/games/*/*
// ==/UserScript==


startPaused = false;	// Automatically pause the timer at the beginning?


if (document.getElementById("giveup"))
	document.getElementById("giveup").innerHTML = "<a href='javascript:giveUp();'>Give up?</a>";

if (startPaused)
{
	document.getElementById("giveup").innerHTML = document.getElementById("giveup").innerHTML + "<div id='pause' onclick='doPause();' style='border:1px solid red;background-color:#fcc;padding:2px;cursor:pointer;margin-top:5px;display:none;'>PAUSE</div><div id='unpause' onclick='doUnpause();' style='border:1px solid green;background-color:#cfc;padding:2px;cursor:pointer;margin-top:5px;'>UNPAUSE</div>";
	countd = 0;	
}
else
{
	document.getElementById("giveup").innerHTML = document.getElementById("giveup").innerHTML + "<div id='pause' onclick='doPause();' style='border:1px solid red;background-color:#fcc;padding:2px;cursor:pointer;margin-top:5px;'>PAUSE</div><div id='unpause' onclick='doUnpause();' style='border:1px solid green;background-color:#cfc;padding:2px;cursor:pointer;margin-top:5px;display:none;'>UNPAUSE</div>";
	countd = 1;
}

var script = document.createElement("script");
script.innerHTML = "\
	function redo()\
	{\
		if (stop == true){ return; }\
		if(found.length == answers.length){ $('enterbox').innerHTML = getReckoning(answers.length); runFinished('1'); return; }\
		secs -= countd;\
		if(secs == -1){ secs = 59; mins--; }\
		document.cd.disp.value = dis(mins,secs);\
		if((mins == 0) && (secs == 0)){ $('timeinfo').innerHTML = 'Time is up!'; $('giveup').innerHTML = ''; showMissed(); }\
		else { scountid = setTimeout(\"redo()\",1000); }\
	}\
	function doPause(){ document.getElementById('pause').style.display = 'none'; document.getElementById('unpause').style.display = 'block'; countd = 0; }\
	function doUnpause(){ document.getElementById('pause').style.display = 'block'; document.getElementById('unpause').style.display = 'none'; countd = 1; }\
";

if (startPaused)
	script.innerHTML = script.innerHTML + "countd = 0";
else
	script.innerHTML = script.innerHTML + "countd = 1";
	
document.getElementsByTagName("head")[0].appendChild(script);