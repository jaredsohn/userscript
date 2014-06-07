// ==UserScript==
// @name          Kongregate temp. mute
// @description   Allows you to temporary mute people.
// @include       http://www.kongregate.com/games/*/*
// @exclude       http://www.kongregate.com/games/*/*/*
// ==/UserScript==


var interval = setInterval(test, 1000);
var holodeck, dialogue, chatWindow;
var mutes = new Object(), muteLink, muteContainer;
var userRollover, userRolloverManager;

function test() {
	if(unsafeWindow.holodeck && unsafeWindow.holodeck._chat_window._active_room) {
		clearInterval(interval);
		run();
	}
}

function run() {
	holodeck = unsafeWindow.holodeck;
	chatWindow = holodeck._chat_window;
	chatWindow.b36223e5f549a4fa = chatWindow.receivedRoomMessage;
	chatWindow.receivedRoomMessage = function(event) {
		var sender = event.data.user.username;
		if(isMuted(sender)) return;
		this.b36223e5f549a4fa(event);
	} 
	holodeck.d3784239e3e5e589a = holodeck.receivedPrivateMessage;
	holodeck.receivedPrivateMessage = function(event) {
		var sender = event.data.from;
		if(isMuted(sender)) return;
		this.d3784239e3e5e589a(event);
	}
	holodeck.addChatCommand("tm", commandMute);
	initUnsafeWindow();
	initRollOver();
}

function isMuted(user) {
	return (mutes[user] == true);
}

function initRollOver() {
	userRollOver = document.getElementsByClassName("user_rollover_inner")[0];
	userRollOverManager = chatWindow._user_rollover_manager;
	muteContainer = document.createElement("p");
	muteContainer.className = "rollover_mute_link_holder";
	muteLink = document.createElement("a");
	muteLink.className = "rollover_mute_link";
	muteContainer.appendChild(muteLink);
	userRollOver.appendChild(muteContainer);
	userRollOverManager.d075df3701df25bd = userRollOverManager.show;
	userRollOverManager.show = function(user) {
		this.d075df3701df25bd(user);
		setTemporaryMuteLink(user.username);
	}
}

function setTemporaryMuteLink(user) {
	if(isMuted(user)) {
		muteLink.innerHTML = "Temp. unmute";
		muteLink.href = "javascript:temp_unmute(\""+user+"\");void(0);";	
	} else {
		muteLink.innerHTML = "Temporary mute";
		muteLink.href = "javascript:temp_mute(\""+user+"\");void(0);";		
	}
}

function initUnsafeWindow() {
	unsafeWindow.temp_mute = function(user) {
		mutes[user] = true;
		setTemporaryMuteLink(user);
	}
	unsafeWindow.temp_unmute = function(user) {
		delete mutes[user];
		setTemporaryMuteLink(user);
	}
}

function commandMute(tm, input) {
	var usefulParts = /^\/tm (.+)$/.exec(input);
	if(usefulParts) {
		var user = usefulParts[1];
		if(isMuted(user)) {
			unsafeWindow.temp_unmute(user);
			tell(user+" is unmuted temporarily.");
		} else {
			unsafeWindow.temp_mute(user);
			tell(user+" is muted temporarily.");
		}
	} else {
		tell("Please define which user you want to mute.");
	}
	return false;
}

function getDialogue() {
	return holodeck._chat_window._active_room._chat_dialogue;
}

function tell(message) {
	getDialogue().displayMessage("Temp. mute", message, {"class":"whisper received_whisper"}, {"non_user":true});
}