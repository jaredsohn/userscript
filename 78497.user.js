var meta = <><![CDATA[
// ==UserScript==
// @name           qqqqqqqqqq
// @namespace      http://userscripts.org/scripts/show/78497
// @description    ARE's MOUSEHUNT SCRIPT
// @version        0.92
// @include        http://apps.facebook.com/mousehunt/*
// @author         are (all credits goes to ARE)
// ==/UserScript==
]]></>.toString();

/*  Adjust these value into your preferences  */
var minHornDelay = 10;       // in seconds, minimum waiting time from horn valid until we sound the horn
var maxHornDelay = 90;       // in seconds, maximum waiting time from horn valid until we sound the horn
var minRandomLink = 240;     // in seconds, minimum waiting time to random a link
var maxRandomLink = 600;     // in seconds, maximum waiting time to random a link
var miscDelay = 60;          // in seconds, misc delay time (recommended 60)
var delayKingReward = 95;    // in minutes, time to wait until KR dissapear (must be 90+)
var enableRandomLink = true; // activate/deactivate random link (true/false)
var enableAlertKR = true;   // enable this to make sound when King Reward appear (true/false)
var alertKRVolume = 80;      // sound volume for King Reward

/* Begin script function list */
function fireEvent(element,event) {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent(event, true, true );
	return !element.dispatchEvent(evt);
}

function soundAlarm(){
	var alarm = document.getElementById('alarm');
	if (!alarm)	{
		alarm = document.createElement("span");
		alarm.id = 'alarm';
		document.body.appendChild(alarm);
	}

	alarm.innerHTML = "<embed type=\"application/x-mplayer2\" loop=\"false\" hiddren=\"true\" width=\"0\" height=\"0\" src=\"http://furoma.com/mousehunt_horn_timer_sound1.wav\" autostart=\"true\" volume=\"" + alertKRVolume + "\" ></embed>";
}

function soundthehorn(){
	var horns = document.evaluate("//a[@href='http://apps.facebook.com/mousehunt/soundthehorn.php']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (horns.snapshotLength > 0) {
		for (var i = 0; i < horns.snapshotLength; i++) {
			var horn = horns.snapshotItem(i);
			if (horn.id.indexOf("hornLink") != -1) {
				fireEvent(horn, 'click');
			}
		} 
		// precaution if cannot run programmatically, have to redirect manually to soundthehorn.php
		setTimeout(function() {
			document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php';
		}, miscDelay * 1000);
		return;
	}
	// just precaution that missing horn link, will access main page
	setTimeout(function() {
		document.location = 'http://apps.facebook.com/mousehunt/';
	}, miscDelay * 1000);
}

function randomLinks(){
	var links = document.evaluate("//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (links.snapshotLength > 0) {
		var daftar = new Array();

		for (var i = 0; i < links.snapshotLength; i++) {
			var link = links.snapshotItem(i);
			if(link.href.indexOf("http://apps.facebook.com/mousehunt/") != -1 && 
			link.href.indexOf("#") == -1  && link.href.indexOf("&") == -1 && 
			link.href.indexOf("donate") == -1 && link.href.indexOf("horn") == -1 && 
			link.href.indexOf("comment") == -1 && link.href.indexOf("trade") == -1 && 
			link.href.indexOf("pay") == -1 && link.href.indexOf("party") == -1 && 
			link.href.indexOf("item") == -1 && link.href.indexOf("chat") == -1 && 
			link.href.indexOf("hash") == -1 && link.href.indexOf("all") == -1 && 
			link.href.indexOf("invite") == -1 && link.href.indexOf("travel") == -1) {
				var sudahada = false;
				for (var x = 0; x < daftar.length; x++) {
					if (daftar[x].href == link.href) {
						sudahada = true;
						break;
					}
				}
				if (!sudahada) daftar.push(link);
			}
		}

		if (daftar.length > 0){
			var x = Math.floor(Math.random() * daftar.length);
			fireEvent(daftar[x], 'click');
			document.location = daftar[x].href;
		}
	}
}

function checkKR(){
	if (document.title.indexOf("Claim a King's Reward") != -1) {
		var labels = document.evaluate("//div[@class='messagetitle']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (labels.snapshotLength > 0) {
			for (var i = 0; i < labels.snapshotLength; i++) {
				var lbl = labels.snapshotItem(i);
				if (lbl.innerHTML.indexOf("Reward claimed!") != -1) {
					return true;
				}
			}
		}	
		setTimeout(function() {
			document.location = 'http://apps.facebook.com/mousehunt/';
		}, delayKingReward * 60000);
		if (enableAlertKR) soundAlarm();
		return false;
	}
	return true;
}

function checkCheese(){
	var labels = document.evaluate("//span[@class='hudstatlabel']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (labels.snapshotLength > 0) {
		for (var i = 0; i < labels.snapshotLength; i++) {
			var lbl = labels.snapshotItem(i);
			if (lbl.parentNode.innerHTML.indexOf("None!") != -1) {
				return false;
			}
		}
		return true;
	} 

	// sometimes page load error (blank white page)  or maintenance occurs and this will handle it. It will go to main page after some delay
	timeoutvalue = Math.round(Math.random() * miscDelay * 2) + miscDelay;
	setTimeout(function() {
		document.location = 'http://apps.facebook.com/mousehunt/';
	}, timeoutvalue * 1000);
	return false;
}

function checkHorn(){
	var inputs = document.evaluate("//input[@type='hidden']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var timervalue = -1;
	if (inputs.snapshotLength > 0) {
		for (var i = 0; i < inputs.snapshotLength; i++) {
			var inp = inputs.snapshotItem(i);
			if(inp.id.indexOf("hornWaitValue") != -1) {
				timervalue = parseInt(inp.value);
				break;
			}
		}
	}

	if(timervalue > 0) {
		timeoutvalue = Math.floor(Math.random() * Math.abs(maxRandomLink - minRandomLink)) + minRandomLink;
		if (enableRandomLink && timeoutvalue < (timervalue - 60)) {
			setTimeout(function() { randomLinks(); }, timeoutvalue * 1000);
		} else {
			timeoutvalue = timervalue + Math.floor(Math.random() * Math.abs(maxHornDelay - minHornDelay)) + minHornDelay;
			setTimeout(function() { soundthehorn(); } , timeoutvalue * 1000);
		}
	} else if (timervalue==0) {
		soundthehorn();
	}
}

function checkVersion(ver){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/74721.user.js?source',

		onload:function(response){
			if (response.status != 200) return;
			if (!response.responseText.match(/@version\s+([\d.]+)/)) return;
			nv = RegExp.$1;
			if (nv > ver && confirm("There is newer version of 'Mousehunt AutoHorn' script, go to update site?")){
				document.location = 'http://userscripts.org/scripts/show/74721';
			}
		}
	});
}

if (checkKR() && checkCheese()){
	checkHorn();
	setTimeout(function() { checkVersion(0.92); }, miscDelay * 1000);
}