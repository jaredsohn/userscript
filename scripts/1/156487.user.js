// ==UserScript==
// @name		HV Random Encounter Notification
// @namespace	sigo8@e-hentai.org
// @author		sigo8, LangTuTaiHoa, GaryMcNabb
// @version		1.3.2
// @match		http://hentaiverse.org/*
// @exclude		http://hentaiverse.org/pages/showequip*
// @run-at		document-end
// ==/UserScript==

var battleLog = document.getElementById("togpane_log"),
	rawDate, timeToDawn = {}, logRows, timerDiv, timerLink, resetLink, time, timerID, minute, second;

function updateTimeToDawn() {
	rawDate = new Date();
	timeToDawn = {
		hour: rawDate.getUTCHours(),
		minute: rawDate.getUTCMinutes(),
		second: rawDate.getUTCSeconds()
	}
}
function timerUpdate() {
	if (--second < 0) {
		second = 59;
		if (--minute < 0) {
			timerLink.href = "http://e-hentai.org/";
			timerLink.onclick = timerReset;
			timerLink.style.setProperty("color", "red");
			timerLink.innerHTML = "Ready";
			clearInterval(timerID);
			return;
		}
	}
	timerLink.innerHTML = minute + ":" + (second < 10 ? "0" : "") + second;
}
function timerReset() {
	updateTimeToDawn();
	if (timeToDawn.hour === 23) {
		localStorage.lastRandomEncounter = Date.now() - ((timeToDawn.minute * 60000) + (timeToDawn.second * 1000));
		minute = 59 - timeToDawn.minute;
		second = 60 - timeToDawn.second;
	} else {
		localStorage.lastRandomEncounter = Date.now();
		minute = 60;
		second = 0;
	}
	timerLink.innerHTML = minute + ":" + (second < 10 ? "0" : "") + second;
	timerLink.style.color = "#5C0C11";
	if (timerID) clearInterval(timerID);
	timerID = setInterval(timerUpdate, 1000);
}
if (battleLog) {
	logRows = battleLog.firstElementChild.firstElementChild.children;
	if (logRows[0].firstElementChild.textContent === "0" && logRows[logRows.length-2].lastElementChild.textContent[13] === "r") {
		updateTimeToDawn();
		localStorage.lastRandomEncounter = (timeToDawn.hour !== 23 ? Date.now() : Date.now() - ((timeToDawn.minute * 60000) + (timeToDawn.second * 1000)) );
	}
} else {
	timerDiv = document.createElement("div");
	timerLink = document.createElement("a");
	resetLink = document.createElement("a");
	if (!localStorage.lastRandomEncounter) timerReset();
	time = localStorage.lastRandomEncounter - (Date.now() - 3600000);
	minute = second = 0;

	timerDiv.style.cssText = "display:block; position: absolute; top:4px; left:470px;";
	timerLink.style.cssText = "text-decoration:none; font-size:20px; font-weight:bold; color:#5C0C11;";
	resetLink.style.cssText = "text-decoration:none; color:red; top:-3px; position:relative; left:3px;";
	resetLink.innerHTML = "RESET";
	resetLink.onclick = timerReset;
	resetLink.href = "#";

	timerDiv.appendChild(timerLink);
	timerDiv.appendChild(resetLink);
	if (time < 0) {
		timerLink.href = "http://e-hentai.org/";
		timerLink.onclick = timerReset;
		timerLink.style.color="red";
		timerLink.innerHTML="Ready";
	} else {
		time = Math.round(time / 1000);
		minute = Math.floor(time / 60);
		second = time - (minute * 60);
		timerLink.innerHTML = minute + ":" + (second < 10 ? "0" : "") + second;
		timerID = setInterval(timerUpdate, 1000);
	}
	document.body.appendChild(timerDiv);
}