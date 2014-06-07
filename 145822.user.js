// ==UserScript==
// @name          OGame Alliance Chat
// @description   Allows OGame alliances to chat in real-time in-game
// @version 	  0.1
// @include 	  http://*.ogame.*/game/index.php?*page=*
// ==/UserScript==

var div = document.createElement('div');
div.setAttribute('onclick', 'return window;');
p = div.onclick();

var unsafeWindow = p;
var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
var console = unsafeWindow.console;
var io;

var username = $('meta[name="ogame-player-name"]').attr('content');
var allianceID = $('meta[name="ogame-alliance-id"]').attr('content');
var chatInput, messages, password;

var chatbox = $('<div id="ogame-chatbox"></div>').appendTo('body');

$('head').append('<style type="text/css">\
#ogame-chatbox { position: fixed; right: 0; bottom: 25px; height: 300px; width: 200px; color: #FFF; }\
#ogame-chatbox input[name="password"] { position: fixed; right: 5px; bottom: 30px; display: block; border: 1px solid #CCC; padding: 0 0 0 3px; height: 25px; width: 190px; }\
#ogame-messages { overflow: hidden; height: 265px; width: 100%; padding: 4px; }\
#ogame-chatbox input[name="message"] { display: block; border: 1px solid #CCC; padding: 0 0 0 3px; height: 25px; width: 190px; margin: 5px auto 0 auto; }\
.ogame-chat-message { width: 190px; margin: 0 auto; word-wrap: break-word; }\
.ogame-chat-system { color: #848484; }\
.ogame-chat-user { color: #848484; }\
</style>');

$.getScript('http://node.umafia.com/socket.io/socket.io.js', function() {

	io = unsafeWindow.io;
	initialise();

});

function addSystemMessage(message)
{

	$(messages).append('<div class="ogame-chat-message"><span class="ogame-chat-system">&gt;</span> ' + message + '</div>');
	$(messages).prop({ scrollTop: $(messages).prop('scrollHeight') });

}

function addMessage(username, message) {

	$(messages).append('<div class="ogame-chat-message"><span class="ogame-chat-user">' + username + ': </span>' + message + '</div>');
	$(messages).prop({ scrollTop: $(messages).prop('scrollHeight') });

}

function initialise()
{

	if ($.cookie('chatPassword')) return initialiseChat();
	
	var inputPassword = $('<input type="password" name="password" placeholder="Channel password" />').appendTo('#ogame-chatbox');
	$(inputPassword).keyup(function(e) {
	
		if (e.which != 13 || !$(this).val().length) return false;
		$.cookie('chatPassword', $(this).val());
		
		initialiseChat();
	
	});

}

function initialiseChat()
{

	password = $.cookie('chatPassword');
	messages = $('<div id="ogame-messages"></div>').appendTo('#ogame-chatbox');
	chatInput = $('<input type="text" name="message" placeholder="Connecting..." />').appendTo('#ogame-chatbox');
	$('#ogame-chatbox input[name="password"]').remove();
	
	var chatSocket = io.connect('http://node.umafia.com:6001/alliance', { query: 'auth_param=' + encodeURIComponent(JSON.stringify({ username: username, allianceID: allianceID, password: password })) });
	
	chatSocket.socket.on('error', function() {
	
		addSystemMessage('Failed to connect to the chat server! Bad password?');
		addSystemMessage('<a href="#" id="ogame-chat-retry">Try again</a>');
		addSystemMessage('<a href="#" id="ogame-chat-clear">Clear stored password</a>');
		
		$('#ogame-chat-clear').click(function() {
		
			$.cookie('chatPassword', null);
			addSystemMessage('Password cleared!');
		
		});
		
		$('#ogame-chat-retry').click(function() {
		
			$.cookie('chatPassword', null);
			chatSocket.disconnect();
			window.location.reload();
		
		});
	
	});
	
	chatSocket.on('connect', function() {
	
		$(chatInput).attr('placeholder', 'Enter your message.');
		
		$(chatInput).keyup(function(e) {
		
			var message = $(this).val().trim();
			if (e.which != 13 || !message.length) return false;
			
			chatSocket.emit('sendMessage', { text: message });
			$(this).val('');
		
		});
		
		chatSocket.on('playerCount', function(data) {
		
			if (data == 1) addSystemMessage('One player online.');
			else addSystemMessage(data + ' players online.');
		
		});
		
		chatSocket.on('syncMessages', function(data) {
		
			var data = $.parseJSON(data);
			$(data).each(function() {
			
				addMessage(this.username, this.text);
			
			});
			
			addSystemMessage('<br />Connected!');
			addSystemMessage('Messages synced!');
		
		});
		
		chatSocket.on('newMessages', function(data) {
		
			var data = $.parseJSON(data);
			$(data).each(function() {
			
				addMessage(this.username, this.text);
			
			});
		
		});
	
	});
	
	chatSocket.on('disconnect', function() {
	
		addSystemMessage('Disconnected');
	
	});

}