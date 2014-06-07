// ==UserScript==
// @name          Kongregate antispam
// @description   Insta-mutes spammers.
// @include       http://www.kongregate.com/games/*/*
// @exclude       http://www.kongregate.com/games/*/*/*
// ==/UserScript==


var interval = setInterval(test, 1000);
var holodeck, dialogue, chatWindow;
var people = new Object(), mutes = new Object(), muteable = false;
var whitelist = new Object(), pwhitelist = new Object();
var limit, time; loadFilter(); loadWhitelist();

function test() {
	if(unsafeWindow.holodeck && unsafeWindow.holodeck._chat_window._active_room) {
		clearInterval(interval);
		run();
	}
}

function run() {
	holodeck = unsafeWindow.holodeck;
	chatWindow = holodeck._chat_window;
	chatWindow.e3ba407c69f1fb1d = chatWindow.joinedRoom;
	chatWindow.joinedRoom = function(room) {
		this.e3ba407c69f1fb1d(room);
		muteable = true;
	}
	chatWindow.a2b2274f4b0e0a7d = chatWindow.leftRoom;
	chatWindow.leftRoom = function(room) {
		muteable = false;
		this.a2b2274f4b0e0a7d(room);
	}
	chatWindow.c46229e5ce87be98 = chatWindow.receivedRoomMessage;
	chatWindow.receivedRoomMessage = function(event) {
		var sender = event.data.user.username;
		if(isMuted(sender)) return;
		this.c46229e5ce87be98(event);
		registerMessage(sender);
	} 
	holodeck.da2eb29e335e589a = holodeck.receivedPrivateMessage;
	holodeck.receivedPrivateMessage = function(event) {
		var sender = event.data.from;
		if(isMuted(sender)) return;
		this.da2eb29e335e589a(event);
		registerMessage(sender);
	}
	unsafeWindow.antispam_unmute = function(user) {
		if(mutes[user]) {
			delete mutes[user];
			tell(user+" has been unmuted.");
		}
	}
	holodeck.addChatCommand("sasf", sasf);
	holodeck.addChatCommand("dasm", dasm);
	holodeck.addChatCommand("dasw", dasw);
	holodeck.addChatCommand("aswu", aswu);
	holodeck.addChatCommand("ascw", ascw);
	setInterval(clearPeople, 900000);
}

function registerMessage(user) {
	if(!people[user])
	people[user] = [];
	var currentTime = getTime();
	people[user].push(currentTime);
	while(true) {
		if(people[user][0] && people[user][0]+time < currentTime) {
			people[user].shift();
		} else {
			break;
		}	
	}
	if(people[user].length >= limit) {
		if(whitelist[user]) return;
		tell(user+" has been muted. (<a href=\"javascript:antispam_unmute(\'"+user+"\');void(0);\">Cancel</a>)");
		mutes[user] = true;
	}
}

function isMuted(user) {
	return (mutes[user] == true);
}

function loadFilter() {
	var stuff = GM_getValue("KongregateAntispamFilter", "4 3").split(" ");
	limit = parseInt(stuff[0])
	time = parseInt(stuff[1])*1000;
}

function saveFilter() {
	try {
		GM_setValue("KongregateAntispamFilter", String(limit+" "+(time/1000)));
	} catch(e) {
		tell("Error: the filter has been temporary updated, but could not be saved.");
	}
}

function loadWhitelist() {
	var list = GM_getValue("KongregateAntispamFilterWhitelist", "").split("|"), i;
	for(i=0;i<list.length;i++) {
		pwhitelist[list[i]] = true;
		whitelist[list[i]] = true;
	}
}

function saveWhitelist() {
	try {
		var str = "", i;
		for(i in pwhitelist)
		str += i+"|";
		if(str.length)
		str = str.substr(0,str.length-1);
		GM_setValue("KongregateAntispamFilterWhitelist", str);
		if(!str.length)
		GM_deleteValue("KongregateAntispamFilterWhitelist");
	} catch(e) {
		tell("Error: the whitelist has been temoprary changed, but has not been saved.");
	}
}

function getDialogue() {
	return holodeck._chat_window._active_room._chat_dialogue;
}

function getTime() {
	return ((new Date()).getTime());
}

function sasf(holodeck, input) {
	var usefulParts = /^\/sasf ([0-9]+) ([0-9]+)$/.exec(input);
	if(usefulParts) {
		limit = parseInt(usefulParts[1]);
		time = parseInt(usefulParts[2])*1000;
		tell("The filter has been updated.");
		setTimeout(saveFilter, 0);
	} else {
		tell("Incorrect filter syntax.");
	}
	return false;
}

function dasm(holodeck, input) {
	people = new Object();
	mutes = new Object();
	tell("List of mutes dropped.");
	return false;
}

function aswu(holodeck, input) {
	var usefulParts = /^\/aswu (.+?)(\([sp]\))?$/.exec(input);
	if(usefulParts) {
		var user = usefulParts[1];
		var duration = usefulParts[2];
		switch(duration) {
			case "(p)":
			pwhitelist[user] = true;
			setTimeout(saveWhitelist, 0);
			case "(s)":
			whitelist[user] = true;
			default:
			delete mutes[user];
		}
		tell(user+" has been whitelisted.");
	} else {
		tell("Please define which user to whitelist.");
	}
	return false;
}

function ascw(holodeck, input) {
	var usefulParts = /^\/ascw (.+?)$/.exec(input);
	if(usefulParts) {
		var user = usefulParts[1];
		delete whitelist[user];
		delete pwhitelist[user];
		setTimeout(saveWhitelist, 0);
		tell(user+" has been de-whitelisted.");
	} else {
		tell("Please define which user to de-whitelist.");
	}
	return false;
}

function dasw(holodeck, input) {
	whitelist = new Object();
	pwhitelist = new Object();
	setTimeout(saveWhitelist, 0);
	tell("Whitelist dropped.");
	return false;
}


function tell(message) {
	getDialogue().displayUnsanitizedMessage("Antispam", message, {"class":"whisper received_whisper"}, {"non_user":true});
}

function clearPeople() {
	var currentTime = getTime();
	for(var i in people) {
		if(currentTime-people[i][0] > 2*time) {
			delete people[i];
		}
	}
}