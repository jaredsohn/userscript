// ==UserScript==
// @name 	     TW beeper
// @description TW script for beeping when your nick was typed in chat
// @author 	Macabre2077
// @version 	0.72
// @include 	http://*.the-west.*/game.php*
// ==/UserScript==


function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
}

exec(function() {
	
var VERSION = 0.72;
	
// sometimes its possible..
if(window.hasOwnProperty("Sounds") && Sounds.version > VERSION) return;

Sounds = {
	version: VERSION,
	CHECK_FILE_URL: "http://macabre2077.koding.com/userscripts/the-west/sounds/getVersion.php",
    SCRIPT_SITE: "http://userscripts.org/scripts/show/152774",
	roomsListening:[],
	lang: {
		"changelist": "Changelist",
		"version": "version",
		"update_available": "TW Beeper update available",
		"update_question": "You can download the latest version from userscripts.org. Visit the site?"
	},
	playSound: function(sound) {
		AudioController.play(sound);
	},
	getMessageDialog: function(text, type) {
		if(window.hasOwnProperty("MessageDialog")) {
			if(type == "warning") {
				type =  MessageDialog.SYS_WARNING;
			}
			return new MessageDialog(text, "", type);
		} else {
			if(type == "warning") {
				type =  tw2gui.dialog.SYS_WARNING;
			}
			return new tw2gui.dialog(text, "", type);		
		}
	},
	addListeners: function() {
		var roomChanged = function (room, type, data) {
			switch (type) {
				case "NewMessage":
					var div = $(data[0]);
					var text = div.find(".chat_text").html();
					var nickInText = text.toLowerCase().indexOf(Chat.MyClient.pname.toLowerCase()) > -1;
					if(nickInText) {
						Sounds.playSound('newmsg');
					}
				break;
			}
		};
		var r, room, rooms = Chat.Resource.Manager.getRooms();
		for(r in rooms) {
			room = Chat.Resource.Manager.getRoom(r);
			if(!Sounds.roomsListening.hasOwnProperty(room.id)){
				Sounds.roomsListening.push(room.id);
				room.addListener(roomChanged);
			}
		}
	},
	checkUpdate: function() {
		var url = Sounds.CHECK_FILE_URL;
		url += "?name="+Character.name;
		url += "&world="+location.href;
		url += "&callback=?";
		$.getScript(url);
	},
	compareVersions: function(actualVersion) {
		if(parseFloat(Sounds.version) >= parseFloat(actualVersion)) return;
		var md = this.getMessageDialog(this.lang.update_available, "warning");
		md
			.setText(Sounds.lang.update_question)
			.addButton("OK",function(){
				window.open(Sounds.SCRIPT_SITE,'_blank');
			})
			.addButton("cancel")
			.show();
	},
	intro: function(){
		if(localStorage.getItem('Beeper.version') >= Sounds.version) return;
		localStorage.setItem('Beeper.version' , Sounds.version);

		var title = 'TW Beeper, '+Sounds.lang.version+' '+Sounds.version;
		var text = Sounds.lang.changelist+':<br/><ul>';
		switch(Game.locale){
			case "ru_RU":
				text += '<li>Исправлена ошибка на бете</li>';
				text += '<li><a href="http://userscripts.org/scripts/show/154884" target="_blank">TW Gold Jobs Finder - поиск золотых и сереряных работ</a></li>';
			break;
			default:
				text += '<li>Fixed beta server bug</li>';
				text += '<li><a href="http://userscripts.org/scripts/show/154884" target="_blank">TW Gold Jobs Finder</a></li>';
            break;
		}
		text += '</ul>';

		Sounds.mb = this.getMessageDialog(title).addButton("OK");
		Sounds.mb.setText(text).show();
	}
};

$(document).ready(function() {
	try {
		Sounds.checkUpdate();
		Sounds.intro();
		if(EventHandler.hasOwnProperty("add")) {
			EventHandler.add("chat_room_added",function(room){
				Sounds.addListeners();
			});			
		} else {
			EventHandler.listen("chat_room_added",function(room){
				Sounds.addListeners();
			});			
		}
	} catch(e) {
		console.log(e.stack);
		alert("TW Beeper error: " + e);
	}
});
});