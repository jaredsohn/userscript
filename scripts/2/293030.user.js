// ==UserScript==
// @name         Kongregate chat addons
// @namespace    tag176.kgchataddons
// @include      http://www.kongregate.com/games/*
// @author       Jon Swift (JonS42)
// @description  Various improvements over the Kongregate chat system
// @grant        none
// @version      1.04
// ==/UserScript==

//var dom = (typeof(unsafeWindow) === 'undefined' ? window : unsafeWindow);

var DEBUG = false;
var injected = false;

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.qq=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
	if (typeof window._kgchat_addons === 'undefined')
		window._kgchat_addons = 1;
}

function main() {
	var dtitle = document.title;
	var current_msg_count = 0;
	var old_msg_count = 0;
	var whisperlist = [];
	var whispers = '';
	var users = [];
	var activetemplate = null;
	var activewindow = null;

	qq(document).ready(function() {

		
		if (location.href.search(/just-chatting/) != -1) {

			// Add styles.
			qq('#gameholder').css('width', '0px');
			qq('#game').css('width', '0px');
			qq('#chat_container_cell').css('width', '920px');
			qq('#chat_container').css('width', '920px');
			qq('#kong_game_ui #chat_tab_pane.tabpane').css('width', '910px');
			qq('#kong_game_ui .users_in_room').css('height', '400px');
			qq('#kong_game_ui .users_in_room').css('position', 'absolute');
			qq('#kong_game_ui .users_in_room').css('top', '10%');
			qq('#kong_game_ui .users_in_room').css('right', '0%');
			qq('#kong_game_ui .users_in_room').css('width', '215px');
			qq('#kong_game_ui .chat_message_window').css('clear','both');
			qq('#kong_game_ui .chat_message_window').css('height','400px');
			qq('#kong_game_ui .chat_message_window').css('width','695px');
			qq('#kong_game_ui .chat_controls .chat_input').css('width', '680px');

			//Add sounds.
			qq('<audio id="chatAudio"><source src="http://www.soundjay.com/button/button-09.mp3" type="audio/mpeg"><source src="http://www.soundjay.com/button/button-09.wav" type="audio/wav"></audio>').appendTo('body');
		}

		qq('<li><a id="kg_refresh" onclick="javascript:document.getElementById(\'gameholder\').innerHTML = document.getElementById(\'gameholder\').innerHTML;">Refresh</a></li>').appendTo('#quicklinks');
		qq('<li><a id="kg_mute" onclick="javascript:document.getElementById(\'gamediv\').append(\'<param name="volume" value="0"\'); document.getElementById(\'gameholder\').innerHTML = document.getElementById(\'gameholder\').innerHTML;">Mute</a></li>').appendTo('#quicklinks');

		qq('<style type="text/css">.recent_whisper { border:1px #FF5151 solid; background:#900; color:#fff; padding:5px; cursor:pointer; display:inline; margin-left:2px; } #recent_whispers { display:auto; position: relative; width:150px; height:40px; top:3%; left:-5%;} #kg_refresh { cursor:pointer; padding-top:5px;}</style>').appendTo('head');
		qq('<div id="recent_whispers"></div>').appendTo('#maingame');

		qq('<div class="message hyphenate error_msg">'
			+'Kongregate chat addons loaded.<br />'
			+'Go to <a href="http://www.kongregate.com/games/2DArray/just-chatting">Just Chatting</a> for the full experience.<br />'
			+'Use TAB to private message, Shift+TAB to reply to the last PM.<br />'
			+'</div>')
		.appendTo('#kong_game_ui .chat_message_window');
		
		window.setInterval(function(){
			//Determine the active template.
			if (qq('.chat_room_template') == null)
				return;

			qq('.chat_room_template').each(function(index, el) {
				if(qq(this).css('display') != 'none') {
					activetemplate = qq(this);
					activewindow = qq(this).find('.chat_message_window > div');
					
				}
			});

			if (activewindow == null || activetemplate == null)
				return;

			whispers = activewindow.find('.sent_whisper').last().find('.chat_message_window_username').text().substr(3);

			// Start of the recent whispers stuff.
/*			if ((qq('.recent_whisper').length == 0) && whispers != '')
				qq('<div class="recent_whisper">'+whispers+'</div>').appendTo('#recent_whispers');
			var foundornot = true;
			
			qq('.recent_whisper').each( function(index) {
				if (qq(this).text().toLowerCase() == whispers.toLowerCase()) {
					foundornot = true;
				} else {
					foundornot = false;
				}
			});
			
			if (foundornot == false)
				qq('<div class="recent_whisper">'+whispers+'</div>').appendTo('#recent_whispers');*/
			// End of the recent whispers stuff.

			//Flash the window.
			current_msg_count = activewindow.children().length;
			if (current_msg_count > old_msg_count) {
				var last = activewindow.children().last();
				if (typeof last.find('.sent_whisper') !== 'undefined')
					console.log(last);
				/*
					qq('#chatAudio')[0].currentTime = 0;
					qq('#chatAudio')[0].play();
					console.log(qq('#chatAudio'));
				*/

				var user = last.find('.chat_message_window_username').text();
				if (user.substr(0, 3) != 'To ' && user != holodeck.username())
					document.title = user + " says... " + dtitle;
			} else if (old_msg_count == current_msg_count) {
				document.title = dtitle;
			}
			old_msg_count = current_msg_count;


			// Create old users list and current users list.
			var users_copy = [];
			if (typeof(users) !== 'undefined')
				users_copy = users;
			users = [];
			
			activetemplate.find('.username').each(function(index, el) {
				users.push(qq(this).text());
			});

/*			if (users_copy.length > 0) {
				if (users_copy.length < users.length) {
					qq('<div class="message hyphenate error_msg">Someone has joined. ' + users_copy.length + ' - ' + users.length + '</div>').appendTo('#kong_game_ui .chat_message_window');
				} else if (users_copy.length > users.length) {
					qq('<div class="message hyphenate error_msg">Someone has parted. ' + users_copy.length + ' - ' + users.length + '</div>').appendTo('#kong_game_ui .chat_message_window');
				}
				q("#kong_game_ui .chat_message_window").animate({"scrollTop": q('#kong_game_ui .chat_message_window')[0].scrollHeight}, "slow");
			}*/
		}, 700);
	});

	// Handle the TAB key.
	qq(document).keydown(function(e) {
		console.log(e);
		if (e.shiftKey && e.which == 9) {
			e.preventDefault();

			var eval_this = activewindow.find('.reply_link');
			if (eval_this.length != 0) {
				eval(eval_this.last().attr('onclick').replace('return false;', ''));
			}
		} else if (e.which == 9) {
			e.preventDefault();
			holodeck.showChatApiTab();
			holodeck.insertPrivateMessagePrefixFor(whispers);
			//activetemplate.find('textarea.chat_input')[0].focus();
			//activetemplate.find('textarea.chat_input')[0].value = '/w '+whispers+' ';
		}
	});

}

injected = setInterval(function(){
	if (typeof holodeck !== 'undefined')
	if (holodeck.ready == false) {
		DEBUG && console.log('Waiting for the holodeck...');
	} else {
		DEBUG && console.log('Everything seems loaded, injecting.');
		addJQuery(main);
		clearInterval(injected);

		console.log(holodeck);
		return;
	}
}, 1000);