// ==UserScript==
// @name          Kongregate roomwatch
// @description   Notifies you when people join or leave the chatroom you're in.
// @include       http://www.kongregate.com/games/*/*
// @exclude       http://www.kongregate.com/games/*/*/*
// ==/UserScript==

var active = false;
var timeout = null;
var rid = -1, i;
var watchedUsers = GM_getValue("RoomWatchedUsers", 0) || 0;
var watchedUsersA = [];
if(watchedUsers) {
	var watchedUsersA = watchedUsers.split(";");
	watchedUsers = {};
	i = watchedUsersA.length;
	while(i--) {
		if(watchedUsersA[i]) watchedUsers["_"+watchedUsersA[i]] = true;
	}
}

function run() {
	var chatRoom = unsafeWindow.ChatRoom.prototype;
	chatRoom.a89df89a = chatRoom.userJoined;
	chatRoom.userJoined = function(event) {
		this.a89df89a(event);
		active = active && this._room.id == rid;
		if(active) {
			if(isWatched(event))
			this._chat_dialogue.displayUnsanitizedMessage("Info", event.data.user.username+" joined the room.", {
				"class":"whisper received_whisper"
			}, {
				"non_user":true
			});
		} else {
			rid = this._room.id;
			if(timeout) clearTimeout(timeout);
			timeout = setTimeout(activateMsg, 3000);
		}
	}
    chatRoom.ef5678a9 = chatRoom.userLeft;
    chatRoom.userLeft = function(event) {
        this.ef5678a9(event);
		if(isWatched(event))
		this._chat_dialogue.displayUnsanitizedMessage("Info", event.data.user.username+" left the room.", {
			"class":"whisper received_whisper"
		}, {
			"non_user":true
		});
    }
	unsafeWindow.holodeck.addChatCommand("roomwatch", handleCommandX);
}

function isWatched(event) {
	return !watchedUsers || watchedUsers["_"+event.data.user.username];
}

function handleCommandX(holodeck, input) {
	setTimeout(function(){
		handleCommand(holodeck, input);
	}, 0);
	return false;
}

function handleCommand(holodeck, input) {
	var analysis = input.split(" ");
	switch(analysis[1].toUpperCase()) {
		case "ALL":
		watchedUsers = 0;
		watchedUsersA = [];
		displayMessage(holodeck._active_dialogue,  "From now on, everyone is watched.");
		break;
		case "WATCH":
		if(/^[0-9a-zA-Z_]+$/.test(analysis[2])) {
			if(watchedUsers && watchedUsers["_"+analysis[2]]) {
				displayMessage(holodeck._active_dialogue, "Error: "+analysis[2]+" is already watched.");
			} else {
				watchedUsersA.push(analysis[2]);
				if(!watchedUsers) watchedUsers = {};
				watchedUsers["_"+analysis[2]] = true;
				displayMessage(holodeck._active_dialogue, analysis[2]+" will be watched.");
			}
		} else {
			displayMessage(holodeck._active_dialogue, "Error: the target user can't be watched.");
		}
		break;
		case "UNWATCH":
		if(/^[0-9a-zA-Z_]+$/.test(analysis[2]) && watchedUsers && watchedUsers["_"+analysis[2]]) {
			delete watchedUsers["_"+analysis[2]];
			watchedUsersA.splice(watchedUsersA.indexOf(analysis[2]), 1);
			displayMessage(holodeck._active_dialogue, analysis[2]+" has been removed from the watch list.");
			if(!watchedUsersA.length) {
				displayMessage(holodeck._active_dialogue, "The watch list is empty; everyone will be watched.");
				watchedUsers = 0;
			}
		} else {
			displayMessage(holodeck._active_dialogue, "Error: the target user wasn't watched at all.");
		}
		break;
		case "LIST":
		if(watchedUsers) {
			displayMessage(holodeck._active_dialogue, "List of watched users:<br/>\n"+watchedUsersA.join("<br/>\n"));
		} else {
			displayMessage(holodeck._active_dialogue, "Everyone is being watched.");
		}
		break;
		default:
		displayMessage(holodeck._active_dialogue, "Error: invalid command.");
		break;
	}
	GM_setValue("RoomWatchedUsers", watchedUsersA.join(";"));
}

function activateMsg() {
	active = true;
	clearTimeout(timeout);
	timeout = null;
}

function displayMessage(dialogue, message) {
	dialogue.displayUnsanitizedMessage("Info", message, {
		"class":"whisper received_whisper"
	}, {
		"non_user":true
	});
}

setTimeout(run, 0);