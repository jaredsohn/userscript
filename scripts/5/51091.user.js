// ==UserScript==
// @name           Slap-command
// @namespace      tag://kongregate
// @description    A copy of the IRC slap command for Kongregate
// @include        http://www.kongregate.com/games/*
// @author         Jonathanasdf
// @version        1.0
// @date           06/07/09
// ==/UserScript==

var _holodeck, loaded = false;

var defaultMsg, numMsg, slapMsgs;

function init(){

	if(this.holodeck){
		loaded = true;
                _holodeck = this.holodeck;

		defaultMsg = GM_getValue('SlapDefaultMessage',"slaps ~~ around a bit with a 

big smelly tuna.");
		numMsg = GM_getValue('NumSlapMessages', 0);
		slapMsgs = new Array();
		for (var i=0; i<numMsg; i++) {
			slapMsgs[i] = GM_getValue('SlapMessage'+i);
		}

		if (unsafeWindow.SimpleContextMenu) {
			unsafeWindow.SimpleContextMenu.addItem('kongslapscript', 'Slap!', 

slap);
		}

		_holodeck.addChatCommand("slap", function(l,n) { slap(n.substring

(n.indexOf("\/slap ")+6)); return false;});

	}
};

function slap(m) {

	if (!_holodeck) {
                return false;
        }

	if (typeof(m) == 'object') {
		m = m.getNamedItem("username").value.replace(/\s*/g, '');
	}

        if (!m.length) {
		_holodeck.activeDialogue().displayMessage("Error", "Please enter a username 

or type /slap ? for help.", {class: "whisper received_whisper"}, {non_user: true});
		return false;
	}

	var cmds = m.split(' ');


	if (cmds[0] == '!set') {

		cmds.shift();
		m = cmds.join(' ');

		if (m.indexOf('~~') == -1) {
			_holodeck.activeDialogue().displayMessage("Error", "You must 

indicate the other user using '~~'.", {class: "whisper received_whisper"}, {non_user: 

true});
			return false;
		}

		defaultMsg = m;
		window.setTimeout(function(){GM_setValue('SlapDefaultMessage', m)}, 0);

		_holodeck.activeDialogue().displayMessage("Success", "Default slap message 

changed.", {class: "whisper received_whisper"}, {non_user: true});
		return false;



	
	} else if (cmds[0] == '!resetDefault') {

		defaultMsg = "slaps ~~ around a bit with a big smelly tuna."
		window.setTimeout(function(){GM_setValue('SlapDefaultMessage', 

defaultMsg)}, 0);

		return false;


	} else if (cmds[0] == '!add') {		
		cmds.shift();
		m = cmds.join(' ');

		if (m.indexOf('~~') == -1) {
			_holodeck.activeDialogue().displayMessage("Error", "You must 

indicate the other user using '~~'.", {class: "whisper received_whisper"}, {non_user: 

true});
			return false;
		}

		slapMsgs[numMsg] = m;

		_holodeck.activeDialogue().displayMessage("Success", "New slap message 

added at position " + numMsg, {class: "whisper received_whisper"}, {non_user: true});

		window.setTimeout(function(){GM_setValue('SlapMessage'+numMsg, m); 

GM_setValue('NumSlapMessages', ++numMsg)}, 0);
		return false;





	} else if (cmds[0] == '!edit') {
		var pos = cmds[1];
		if (!pos.match(/\d+/) || !slapMsgs[pos]) {
			_holodeck.activeDialogue().displayMessage("Error", "Invalid 

Index.", {class: "whisper received_whisper"}, {non_user: true});
			return false;
		}
	
		cmds.shift();
		cmds.shift();
		m = cmds.join(' ');

		if (m.indexOf('~~') == -1) {
			_holodeck.activeDialogue().displayMessage("Error", "You must 

indicate the other user using '~~'.", {class: "whisper received_whisper"}, {non_user: 

true});
			return false;
		}

		slapMsgs[pos] = m;

		_holodeck.activeDialogue().displayMessage("Success", "Slap message at 

position " + pos + " changed.", {class: "whisper received_whisper"}, {non_user: true});

		window.setTimeout(function(){GM_setValue('SlapMessage'+pos, m)}, 0);
		return false;




	} else if (cmds[0] == '!remove') {
		var pos = cmds[1];
		if (!pos.match(/\d+/) || !slapMsgs[pos]) {
			_holodeck.activeDialogue().displayMessage("Error", "Invalid 

Index.", {class: "whisper received_whisper"}, {non_user: true});
			return false;
		}
		slapMsgs[pos] = undefined;
		window.setTimeout(function(){GM_deleteValue('SlapMessage'+pos)},0);

		if (parseInt(pos) == numMsg-1) {
			window.setTimeout(function(){GM_setValue('NumSlapMessages', --

numMsg)}, 0);
		}

		_holodeck.activeDialogue().displayMessage("Success", "Message " + pos + " 

removed.", {class: "whisper received_whisper"}, {non_user: true});

		return false;



	} else if (cmds[0] == '!removeall') {

		for (var i=0; i<numMsg; i++) {
			if (slapMsgs[pos]) {
				slapMsgs[pos] = undefined;
				window.setTimeout(function(){GM_deleteValue

('SlapMessage'+pos)},0);
			}
		}

		numMsg = 0;
		window.setTimeout(function(){GM_setValue('NumSlapMessages', numMsg)}, 0);

		_holodeck.activeDialogue().displayMessage("Success", "Messages removed.", 

{class: "whisper received_whisper"}, {non_user: true});

		return false;

	} else if (cmds[0].match(/^\!\d+/)) {

		var pos = parseInt(cmds[0].substring(1));

		cmds.shift();
		m = cmds.join(' ');

		if (slapMsgs[pos]) {
			_holodeck.chatWindow().activeRoom().sendRoomMessage('\u200B' + 

slapMsgs[pos].replace(/\~\~/g, m));
		} else {
			_holodeck.activeDialogue().displayMessage("Error", "Invalid 

index.", {class: "whisper received_whisper"}, {non_user: true});
		}

		return false;



	} else if (cmds[0] == "!reorganize") {
		for (var i=0; i<numMsg; i++) {
			if (!slapMsgs[i]) {
				slapMsgs.splice(i, 1);
			}
			window.setTimeout(function(){GM_deleteValue('SlapMessage'+i)},0);
		}
		numMsg = slapMsgs.length;
		window.setTimeout(function(){GM_setValue('NumSlapMessages', numMsg)}, 0);
		for (var i=0; i<numMsg; i++) {
			window.setTimeout(function(){GM_setValue('SlapMessage'+i, slapMsgs

[i])}, 0);
		}

		_holodeck.activeDialogue().displayMessage("Success", "Messages reorganized. 

Use /slap !list to see the new indexes.", {class: "whisper received_whisper"}, {non_user: 

true});
		return false;



	} else if (cmds[0] == "!list") {
		var message = '';
		for (var i=0; i<numMsg; i++) {
			if (slapMsgs[i]) {
				message += i + ": " + slapMsgs[i] + "<br>";			

}
		}

		_holodeck.activeDialogue().displayUnsanitizedMessage("Command", message ? 

"<br>" + message : "There are no custom slap messages.", {class: "whisper 

received_whisper"}, {non_user: true});
		return false;



	} else if (cmds[0] == '?') {

		var message = 	

"Kongregate Chat Slap Command - by Jonathanasdf<br><br> \
Usage: /slap [!options] username or commands <br> \
ie. /slap jonathanasdf <br><br> \
      options: <br><br> \
      !set - sets the default slap message. You must indicate the other user using ~~. <br> 

\
             &nbsp;&nbsp;&nbsp;usage: /slap !set message <br><br> \
      !resetDefault - resets the default slap message. <br><br> \
      !add - adds a custom slap message. <br> \
             &nbsp;&nbsp;&nbsp;usage: /slap !add message_to_add <br><br> \
      !edit - edits an existing message. <br> \
              &nbsp;&nbsp;&nbsp;usage: /slap !edit # new_message <br><br> \
      !remove - removes a custom message. <br> \
                &nbsp;&nbsp;&nbsp;usage: /slap !remove # <br><br> \
      !removeall - removes all the custom messages. <br><br> \
      !reorganize - reorganizes the custom messages to fill in index gaps. <br><br> \
      !list - lists all of the custom messages you have made. <br><br> \
      !# - choose the custom message at the specified index. <br> \
           &nbsp;&nbsp;&nbsp;usage: /slap !# username <br>";

		_holodeck.activeDialogue().displayUnsanitizedMessage("", '\ufeff' + 

message, {class: "whisper received_whisper"}, {non_user: true});
					

		return false;


	} else if (cmds[0].match(/^\!/)) {
		_holodeck.activeDialogue().displayMessage("Error", message ? message : 

"Invalid Command.", {class: "whisper received_whisper"}, {non_user: true});

		return false;
	}
	             
	_holodeck.chatWindow().activeRoom().sendRoomMessage('\u200B' + defaultMsg.replace

(/\~\~/g, m));

	return false;
};


if (!loaded) {
  setTimeout(init, 1000);
};

