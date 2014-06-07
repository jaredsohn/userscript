// ==UserScript==
// @name           Linksys WRT54G Status
// @namespace      localhost
// @description    Reports connection status in title of Status 
//                 page, refreshes page in 'refresh' milliseconds, 
//                 and attempts reconnection if disconnected.
// @include        http://192.168.1.1/Status_Router.asp
// @version        0.3
// @author         pw
// ==/UserScript==

var refresh = 20000;

var then = GM_getValue('now',0);
var d = new Date();
var now = d.getTime();
// The stringification is necessary because Greasemonkey truncates 
// the result of getTime() when stored as an integer.
GM_setValue('now', now + "");
var tween = now - then;
// This test works because, when connecting, the default refresh 
// time is 5 seconds and our refresh is more.  It's liable to give a 
// false negative if the connection happens to be down when the page 
// is first opened after being closed a while.
tween < refresh ? GM_setValue('connecting', true) : GM_setValue('connecting', false);
//alert('tween = ' + tween + "\nnow = " + now + "\nthen = " + then);

// The Reconnect() function is derived from the Connect() function 
// on the page and the hidden input elements in the form.  It might 
// be possible to call unsafeWindow.Connect(), but this seems to 
// work.
function Reconnect () {
	F = document.forms[0];
	F.elements[0].value = "Status_Router";
	F.elements[1].value = "Connect_pppoe";
	F.elements[2].value = "gozila_cgi";
	F.elements[3].value = 0;
	F.elements[4].value = "ppoe";
	F.submit();
}

function clearData() {
	GM_setValue('uptime', 0);
	GM_setValue('downtime', 0);
}

// This suppresses the alert which would otherwise 
// interrupt the attempt to reconnect.
// alerts ahead of this in the script can still be used to debug.
var alert_scr  = document.createElement("script");
alert_scr.setAttribute("language", "JavaScript");
alert_scr.setAttribute("type", "text/javascript");
alert_scr.innerHTML = "function alert() {}";
document.body.insertBefore(alert_scr, document.body.firstChild);

var button = document.forms[0].elements[5];
if (button.value == "Connect") {
	document.title = "Down";
	window.status = "Internet connection down - attempting reconnect.";
	GM_setValue('connecting', true);
	Reconnect();
}
else if (button.value == "Disconnect" && GM_getValue('connecting') == false) {
	document.title = "Up";
	window.status = window.defaultStatus;
}
else {
// We arrive here when the button is "Disconnect" but we're still 
// connecting
	document.title = "Down";
	window.status = "Internet connection still down - attempting reconnect.";
}

// Here we calculate cumulative uptime and downtime and figure the 
// ratio of uptime to total.
var uptime = GM_getValue('uptime',0);
var downtime = GM_getValue('downtime',0);
// If tween is too large, the page has not been continually open and 
// we get false readings for uptime.
if (tween < 2*refresh) {
	document.title == "Up" ? uptime += tween : downtime += tween;
}
GM_setValue('uptime', uptime);
GM_setValue('downtime', downtime);
var ratio = (uptime/(uptime+downtime))*100;
GM_setValue('ratio', ratio.toFixed(2) + "%");

var uphours = uptime/(60*60*1000);
var uph = Math.floor(uphours);
var upm = Math.round((uphours - uph)*60);
var downhours = downtime/(60*60*1000);
var downh = Math.floor(downhours);
var downm = Math.round((downhours - downh)*60);

var report = uph + "h" + upm + "m/" + downh + "h" + downm + "m/" + GM_getValue('ratio');
var newRow = document.createElement('tr');
//<td bgcolor="#e7e7e7" height="25" width="156">&nbsp;</td>
var td0 = document.createElement('td');
td0.setAttribute('bgcolor', "#e7e7e7");
td0.setAttribute('height', "25");
td0.setAttribute('width', "156");
td0.innerHTML = "&nbsp;";
newRow.appendChild(td0);
//<td background="image/UI_04.gif" height="25" width="8">&nbsp;</td>
var td1 = document.createElement('td');
td1.setAttribute('background', "image/UI_04.gif");
td1.setAttribute('height', "25");
td1.setAttribute('width', "8");
td1.innerHTML = "&nbsp;";
newRow.appendChild(td1);
//<td colspan="3" height="25">&nbsp;</td>
var td2 = document.createElement('td');
td2.setAttribute('colspan', "3");
td2.setAttribute('height', "25");
td2.innerHTML = "&nbsp;";
newRow.appendChild(td2);
//<td><font style="font-size: 8pt;">Up/Down/Ratio&nbsp;:&nbsp;</font></td>
var td3 = document.createElement('td');
td3.innerHTML = "<font style=\"font-size: 8pt;\">Up/Down/Up%&nbsp;:&nbsp;</font>";
newRow.appendChild(td3);
//<td><font style="font-size: 8pt;"><b>[report]</b></font></td>';
var td4 = document.createElement('td');
td4.innerHTML = "<font style=\"font-size: 8pt;\"><b><a id=\"report\" title=\"Click to clear data.\">" + report + "</a></b></font></td>";
newRow.appendChild(td4);
//<td height="25" width="13">&nbsp;</td>
var td5 = document.createElement('td');
td5.setAttribute('height', "25");
td5.setAttribute('width', "13");
td5.innerHTML = "&nbsp;";
newRow.appendChild(td5);
//<td background="image/UI_05.gif" height="25" width="15">&nbsp;</td>
var td6 = document.createElement('td');
td6.setAttribute('background', "image/UI_05.gif");
td6.setAttribute('height', "25");
td6.setAttribute('width', "15");
td6.innerHTML = "&nbsp;";
newRow.appendChild(td6);

var trs = document.getElementsByTagName("tr");
for (var i = trs.length - 1; i >= 0; i--) {
	if (trs[i].innerHTML.match("IP Address")) {
		var trIP = trs[i];
		break;
	}
}
trIP.parentNode.insertBefore(newRow, trIP);
// Listen for a click on the report data and clear data
document.getElementById('report').addEventListener("click", clearData, true);

// Override page's Refresh() function; if refresh > 60 seconds, this 
// will have no effect as that's the default refresh time.
setTimeout('window.location=window.location', refresh);

//Scroll button into view
button.scrollIntoView();
