// ==UserScript==
// @name		Pardus Message Alert
// @version		v1
// @namespace	marnick.leau@skynet.be
// @description	Message alerter that can use the window/tab title, alert popups or sounds.
// @icon		http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include		http*://*.pardus.at/msgframe.php
// @resource	dataDyneCentralAlarm		https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/dataDyneCentralAlarm.ogg
// @resource	DataUplinkHackingFailed		https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/DataUplinkHackingFailed.ogg
// @resource	DataUplinkHackingSucceeded	https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/DataUplinkHackingSucceeded.ogg
// @resource	DataUplinkPickup			https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/DataUplinkPickup.ogg
// @resource	FiringRangeHorn				https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/FiringRangeHorn.ogg
// @resource	InterfaceChoose				https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/InterfaceChoose.ogg
// @resource	InterfaceOpen				https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/InterfaceOpen.ogg
// @resource	InterfaceSelect				https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/InterfaceSelect.ogg
// @resource	InterfaceSwitch				https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/InterfaceSwitch.ogg
// @resource	InterfaceWarning			https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/InterfaceWarning.ogg
// @resource	InterfaceWarningSelect		https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/InterfaceWarningSelect.ogg
// @resource	Message						https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/Message.ogg
// @resource	MineAttach					https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/MineAttach.ogg
// @resource	MineTrigger					https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/MineTrigger.ogg
// @resource	RadioMessage				https://dl.dropboxusercontent.com/u/3357590/Userscripts/pardus_message_alert/RadioMessage.ogg
// @grant		GM_getResourceURL
// @grant		GM_getValue
// @grant		GM_setValue
// ==/UserScript==

var settings = {
	alertProfiles:{
		personalMessage:{	// make a pref blank ("") to disable it, always enclose text within "" (except priority, because that's a number, not text)
			titlebar:"[%d] new PMs",
			// %d will be replaced by the number of messages, text will be suffixed to the title
			popup:"",
			// %d will be replaced by the number of messages, text will show in a foreground popup, Firefox will flash
			sound:"RadioMessage",
			// choose a name from the "@resource" list above (open the Add-ons window, then the GM Scripts tab, right-click this script and Open Containing Folder to play the sound files and decide on one)
			priority:2
			// higher number means higher priority, only highest priority will be used (may be multiple with the same priority), 0 means disabled
		},
		allianceMessage:{
			titlebar:"[%d] new AMs",
			popup:"",
			sound:"InterfaceWarning",
			priority:2
		},
		combatLog:{
			titlebar:"[%d] new Combat Logs",
			popup:"",
			sound:"FiringRangeHorn",
			priority:3
		},
		tradeLog:{
			titlebar:"[%d] new Trade Logs",
			popup:"",
			sound:"Message",
			priority:1
		},
		paymentLog:{
			titlebar:"[%d] new Payment Logs",
			popup:"",
			sound:"Message",
			priority:1
		},
		missionLog:{
			titlebar:"[%d] new Mission Logs",
			popup:"",
			sound:"Message",
			priority:1
		}
	},
	repeatAlerts:true // true or false
}

function logTemplate() {
	this.personalMessage = 0;
	this.allianceMessage = 0;
	this.combatLog = 0;
	this.tradeLog = 0;
	this.paymentLog = 0;
	this.missionLog = 0;
}

settings.alertProfiles.minimal = {};
settings.alertProfiles.minimal.priority = 0;

var oldMailData = JSON.parse(GM_getValue("maildata@" + location.hostname,JSON.stringify(new logTemplate())));

var newMailData = gatherData();
GM_setValue("maildata@" + location.hostname,JSON.stringify(newMailData));

newMailData = prioritiseData(newMailData, oldMailData);
alertUser(newMailData);

function gatherData() {
	var data = new logTemplate();
	var link = [["new_msg","personalMessage"],["new_amsg","allianceMessage"],["new_cl","combatLog"],["new_tl","tradeLog"],["new_ml","missionLog"],["new_pl","paymentLog"]];
	for (var i = 0;i < link.length;i++) {
		var el = document.getElementById(link[i][0]);
		if (el != null) {
			data[link[i][1]] = parseInt(el.innerHTML);
		}
	}
	return data;
}

function prioritiseData(data, oldData) {
	var previousType = "minimal";
	for (var type in data) {
		if (data[type] == 0 || settings.alertProfiles[type].priority == 0 || settings.alertProfiles[type].priority < settings.alertProfiles[previousType].priority) {
			delete data[type];
		} else {
			if (settings.alertProfiles[type].priority > settings.alertProfiles[previousType].priority) {
				delete data[previousType];
			}
			previousType = type;
		}
	}
	
	if (settings.repeatAlerts == false) {
		for (var type in data) {
			if (data[type] == oldData[type]) {
				delete data[type];
			}
		}
	}
	return data;
}

function alertUser(data) {
	setTitle("",0);
	for (var type in data) {
		setTitle(settings.alertProfiles[type].titlebar,data[type]);
		doPopup(settings.alertProfiles[type].popup,data[type]);
		playSound(settings.alertProfiles[type].sound);
	}
}

function playSound(name) {
	if (name != "") {
		var soundBox = document.createElement("audio");
		// soundBox.style.display = "none";
		var src = document.createElement("source");
		src.setAttribute("src",GM_getResourceURL(name));
		src.setAttribute("type","audio/ogg");
		soundBox.appendChild(src);
		document.body.appendChild(soundBox);
		soundBox.play();
	}
}

function doPopup(text,quantity) {
	if (text != "") {
		alert(text.replace(/%d/g,quantity));
	}
}

function setTitle(text,quantity) {
	var doctitle = parent.document.head.getElementsByTagName("title")[0];
	if (doctitle.dataset["originaltitle"] == undefined) {
		doctitle.dataset["originaltitle"] = doctitle.innerHTML;
	}
	
	if (text != "") {
		doctitle.innerHTML = doctitle.dataset["originaltitle"] + " - " + text.replace(/%d/g,quantity);
	} else {
		doctitle.innerHTML = doctitle.dataset["originaltitle"];
	}
}