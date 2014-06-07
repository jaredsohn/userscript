// ==UserScript==
// @name           Travian: Troop Saver - CFK
// @namespace      n\a
// @author		   crazyfacka
// @version 	   0.3.5
// @description    When under attack, it saves your troops from obliteration
// @include        http://*.travian*.*/dorf1.php*
// ==/UserScript==

var x_coor = "";
var y_coor = "";
var debugVar = 1;
var c = 2; // 2: Reinforcements; 3: Normal Attack; 4: Assault

/* **********
 * DEBUG CODE
 */

var divCreated = false;

function debug(data) {
	
	if(debugVar != 1) return;
	
	data = data + "<br /><b>Current destination:</b> " + x_coor + "<b>:</b>" + y_coor;
	
	if(divCreated) {
		temp = document.getElementById("nheca");
		temp.innerHTML = data;
	} else {
		temp = document.createElement("DIV");
		temp.style.position = "absolute";
		temp.style.top = "0px";
		temp.style.left = "690px";
		temp.style.visibility = "visible";
		temp.style.color = "white";
		temp.style.fontSize = "10px";
		temp.setAttribute("id","nheca");
		temp.innerHTML = data;
		document.getElementsByTagName('BODY')[0].appendChild(temp);	
		divCreated = true;
	}
	
}

function setDebug() {
	
	if(debugVar == 1) {
		if(confirm("Do you wish to disable debug text?")) {
			debugVar = 0;
			setCookie("tts_debug", "0");
		}
	} else {
		if(confirm("Do you wish to enable debug text?")) {
			debugVar = 1;
			setCookie("tts_debug", "1");
		}
	}
	
}

/* ****************************** */

var check = null;
var wait = null;

/* ***************
 * COOKIE HANDLING
 */

function setCookie(CookieName, value, expiredTimes) {
	
	escape(value);
	expiredTimes = (expiredTimes) ? ';expires=' + expiredTimes.toGMTString() : ' ';
	document.cookie = CookieName + '=' + value + expiredTimes;
	
}

function getCookie(CookieName) {
	
	Cookies = document.cookie;
	start = Cookies.indexOf(CookieName + '=');

	if (start == -1) return null;
	
	len = start + CookieName.length+1;
	end = Cookies.indexOf(';', len);
	
	if (end == -1) end = Cookies.length;
	
	return unescape(Cookies.substring(len, end));

}

/* ****************
 * SEND TROOPS AWAY
 */

function kickTroopsAway(data, troops) {
	
	timestamp = "";
	timestamp_checksum = "";
	kid = "";
	id = "";
	a = "";
	
	for(i = 0; i < data.length; i++) {
		if(data[i].indexOf('type="hidden" name="timestamp"') != -1) {
			timestamp = data[i].substring(data[i].indexOf('value="') + 7, data[i].indexOf('/>') - 2);
		} else if(data[i].indexOf('type="hidden" name="id"') != -1) {
			timestamp_checksum = data[i].substring(data[i].indexOf('value="') + 7, data[i].indexOf('/>') - 2);
		} else if(data[i].indexOf('type="hidden" name="a"') != -1) {
			id = data[i].substring(data[i].indexOf('value="') + 7, data[i].indexOf('/>') - 2);
		} else if(data[i].indexOf('type="hidden" name="c"') != -1) {
			a = data[i].substring(data[i].indexOf('value="') + 7, data[i].indexOf('/>') - 2);
		} else if(data[i].indexOf('type="hidden" name="t1"') != -1) {
			kid = data[i].substring(data[i].indexOf('value="') + 7, data[i].indexOf('/>') - 2);
			break;
		}
	}
	
	troopURL = "http://" + window.location.hostname + "/a2b.php";
	postData = "timestamp=" + timestamp +
				"&timestamp_checksum=" + timestamp_checksum +
				"&id=" + id +
				"&a=" + a +
				"&c=" + c +
				"&kid=" + kid;
				
	for(i = 0; i < troops.length; i++) {
		postData += "&t" + (i + 1) + "=" + troops[i];
	}
	
	postData += "&t11=1" +
				"&s1.x=20" +
				"&s1.y=12" +
				"&s1=ok";
				
	postData = encodeURI(postData);

	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			setCookie("goingAway", "1");
		}
	};
	
	xmlhttp.open("POST", troopURL, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Content-legth", postData.length);
    xmlhttp.setRequestHeader("Connection", "close");
    xmlhttp.send(postData);
	
}

function moveTroops(data) {
	
	checkTroops = false;
	curPos = 0;
	troops = new Array();
	
	timestamp = "";
	timestamp_checksum = "";
	b = "";
	
	for(i = 0; i < data.length; i++) {
		if(checkTroops) {
			if(data[i].indexOf('name') != -1) {
				data[i] = data[i].substring(data[i].indexOf('name="t') + 7);
				curPos = parseInt(data[i].substring(0, data[i].indexOf('"')));
			} else if(data[i].indexOf('(') != -1) {
				troops[curPos - 1] = parseInt(data[i].substring(data[i].indexOf('(') + 1, data[i].indexOf(')')));
				if(curPos == 6) break;
			}
		} else {
			if(data[i].indexOf('name="timestamp"') != -1) {
				timestamp = data[i].substring(data[i].indexOf('value="') + 7, data[i].indexOf('/>') - 2);
			} else if (data[i].indexOf('name="timestamp_checksum"') != -1) {
				timestamp_checksum = data[i].substring(data[i].indexOf('value="') + 7, data[i].indexOf('/>') - 2);
			} else if (data[i].indexOf('type="hidden" name="b"') != -1) {
				b = data[i].substring(data[i].indexOf('value="') + 7, data[i].indexOf('/>') - 2);
			} else if(data[i].indexOf('<table id="troops"') != -1) {
				checkTroops = true;
			}
		}
	}
	
	troopURL = "http://" + window.location.hostname + "/a2b.php";
	postData = "timestamp=" + timestamp +
				"&timestamp_checksum=" + timestamp_checksum +
				"&b=" + b;
	
	for(i = 0; i < troops.length; i++) {
		if(parseInt(troops[i]) > 0) {
			postData += "&t" + (i + 1) + "=" + troops[i];
		} else {
			postData += "&t" + (i + 1) + "=";
		}
	}
	
	postData += "&t11=1" +
				"&c=" + c +
				"&dname=" +
				"&x=" + x_coor +
				"&y=" + y_coor +
				"&s1.x=23" +
				"&s1.y=14" +
				"&s1=ok";
				
	postData = encodeURI(postData);
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			kickTroopsAway(xmlhttp.responseText.split("\n"), troops);
		}
	};
	
	xmlhttp.open("POST", troopURL, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Content-legth", postData.length);
    xmlhttp.setRequestHeader("Connection", "close");
    xmlhttp.send(postData);
	
}

/* ********************************
 * ATTACK IS OVER, CALL TROOPS BACK
 */

function callTroopsBack() {
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			
			data = xmlhttp.responseText.split("\n");
			retreatURL = "";
			for(i = 0; i < data.length; i++) {
				if(data[i].indexOf('<div class="abort">') != -1) {
					retreatURL = data[i].substring(data[i].indexOf('<a href="') + 9);
					retreatURL = retreatURL.substring(0, retreatURL.indexOf('">'))
					retreatURL = "http://" + window.location.hostname + "/" + retreatURL;
					break;
				}
			}
			
			xmlhttp2 = new XMLHttpRequest();
			xmlhttp2.onreadystatechange = function() {
				if(xmlhttp2.readyState == 4) {
					debug("Troops are returning :)"); // DEBUG
					check = window.setInterval(checkAttack, 2000);
				}
			};
			
			xmlhttp2.open("GET", retreatURL, true);
			xmlhttp2.setRequestHeader("Connection", "close");
			xmlhttp2.send(null);
			
		}
	};
	
	troopURL = "http://" + window.location.hostname + "/build.php?id=39";
	xmlhttp.open("GET", troopURL, true);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.send(null);
	
}

/* *****************************
 * COUNTDOWN TO CALL TROOPS BACK
 */

function waitRetreat() {
	
	countDown = parseInt(getCookie("countDown"));
	
	if(countDown > 0) {
		debug("Returning troops in " + countDown + " seconds."); // DEBUG
		countDown--;
		setCookie("countDown", countDown);
	} else {
		setCookie("goingAway", "0");
		setCookie("countDown", "50");
		window.clearInterval(wait);
		wait = null;
		callTroopsBack();
	}
	
}

/* *******************************************
 * LOAD TROOP PAGE AND START THE WHOLE PROCESS
 */

function loadTroopPage() {
	
	if(getCookie("goingAway") == "1") {
		if(wait == null) {
			window.clearInterval(check);
			check = null;
			wait = window.setInterval(waitRetreat, 1000);
		}
		return;
	}
	
	debug("Troops sent away :)"); // DEBUG
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			moveTroops(xmlhttp.responseText.split("\n"));
		}
	};
	
	troopURL = "http://" + window.location.hostname + "/a2b.php";
	xmlhttp.open("GET", troopURL, true);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.send(null);
	
}

/* ****************************
 * CHECK FOR AN INCOMING ATTACK
 */

function checkAttack() {
	
	troopCount = document.getElementById("troops").childNodes[2].innerHTML;
	if(troopCount.indexOf("<img") == -1) {
		debug("You have no troops in your village :(");
		return;
	}
	
	if(document.getElementById("timer1") == null) {
		debug("No movements found..."); // DEBUG
		return;
	}

	tableName = document.getElementById("timer1").parentNode.parentNode.parentNode.parentNode.parentNode.id;
	if(tableName == "movements") {
		try {
			attackType = document.getElementById("timer1").parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].className;
			if(attackType == "att2") {
				debug("It ain't an incoming attack. Nice!"); // DEBUG
			} else if(attackType == "att1") {
				curTime = document.getElementById("timer1").innerHTML.split(":");
				debug("<b>Attack detected</b> in <i>" + parseFloat(curTime[0]) + "h" + parseFloat(curTime[1]) + "m" + parseFloat(curTime[2]) + "s</i>"); // DEBUG
				if(parseFloat(curTime[0]) == 0 && parseFloat(curTime[1]) == 0 && parseFloat(curTime[2]) < 30) {
					loadTroopPage();
				}
			} else {
				debug("It ain't no attack :)") // DEBUG
			}
		} catch(e) {
			debug("It ain't no attack :)") // DEBUG
		}
	} else {
		debug("No movements found..."); // DEBUG
	}
	
}

/* *************************************************
 * STORE COORDINATES AS COOKIES FOR FUTURE REFERENCE
 */

function setCoordinates() {
	
	coord = prompt("Please enter village coordinates in the form x;y\nExample: -160;-100\n\nCurrent destination\nX: " + x_coor + "\nY: " + y_coor, "");
	dest = coord.split(";");
	new_x = dest[0];
	new_y = dest[1];
	
	confirm = confirm("New coordinates:\nX: " + new_x + "\nY: " + new_y + "\n\nAre these values correct?");
	if(confirm) {
		x_coor = new_x;
		y_coor = new_y;
		setCookie("x_coor", new_x);
		setCookie("y_coor", new_y);
	}
	
}

/* ***************************************************
 * CHECK IF STARTUP VARIABLES HAVE ALREADY BEEN STORED
 */

if(getCookie("x_coor") == null || getCookie("y_coor") == null) {
	setCoordinates();
} else {
	x_coor = getCookie("x_coor");
	y_coor = getCookie("y_coor");
}

if(getCookie("tts_debug") != null) {
	debugVar = parseInt(getCookie("tts_debug"));
}

/* ********************************
 * CHECK STATE AND START THE SCRIPT
 */

if(getCookie("goingAway") == "1") {
	wait = window.setInterval(waitRetreat, 1000);
} else {
	setCookie("countDown", "50");
	check = window.setInterval(checkAttack, 2000);
}

/* **************************
 * GREASEMONKEY SPECIFIC CODE
 */

GM_registerMenuCommand("Travian Troop Saver: Set coordinates", setCoordinates);
GM_registerMenuCommand("Travian Troop Saver: Set debug on/off", setDebug);