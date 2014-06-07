// ==UserScript==
// @name           Smart Auto Refresh
// @namespace      smartautomaticalrefresh
// @version        1.0
// @author         maks h.
// @include        *
// ==/UserScript==
var d = GM_getValue("autorefresh");
clearTimeout(to);
var to = "";

if(location.href.match(/\#AF\=.+$/)) {
	i = location.href.split("#AF=");

	if(i[1] == "stop")
		stopAR();
	else if(i[1] == "set")
		setAR();
}
else if(d) { // if on
	GM_registerMenuCommand("Change Refresh Rate", setAR);
	GM_registerMenuCommand("Stop Auto-refreshing", stopAR);
	document.body.innerHTML = document.body.innerHTML + '<div style="color:#000000;font-family:Arial;z-index:999999999;border:solid 1px #000000;border-bottom:none;border-left:none;position:fixed;bottom:0px;left:0px;background-color:#95E386;padding:2px;font-size:10px;"><b>This page will be refreshed every ' + d + ' minutes. <a href="#AF=set" onclick="setTimeout(\'location.reload()\', 100)">Change Rate</a> | <a href="#AF=stop" onclick="setTimeout(\'location.reload()\', 100)">Stop</a></div>';
	to = setTimeout("location.reload()", tFI(d));
}
else // if off
	GM_registerMenuCommand("Start Auto-refreshing", setAR);

function setAR() {
	var t = prompt("Auto-refresh delay (in minutes):", d);
	t = t.replace(/(\s)+/g, "");
	if(t) {
		if(isNaN(t) && !t.match(/^[0-9\.]+\-[0-9\.]+$/)) {
			alert("Please enter only numbers or a range (e.g. 5-16).");
			setAR();
		}
		else
			GM_setValue("autorefresh", t);
	}
		
	window.location = location.href.replace(/\#AF\=.*/, "");
}

function stopAR() {
	clearTimeout(to);
	GM_setValue("autorefresh", "");
	window.location = location.href.replace(/\#AF\=.*/, "");
}

function tFI(t) {
	if(t.match(/^[0-9\.]+\-[0-9\.]+$/)) {
		points = t.split("-");
		max = Number(points[1]) * 60;
		min = Number(points[0]) * 60;
		return (Math.floor((max - (min - 1)) * Math.random()) + min) * 1000;
	}
	else
		return t * 60 * 1000;
}