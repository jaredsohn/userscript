// ==UserScript==
// @name       Wikia Chat Alerts
// @version    0.5
// @description  Alerts you whenever someone talks on a Wikia Chat, or calls your name!
// @match      http://*.wikia.com/wiki/Special:Chat
// @copyright  2013+, TUSF
// ==/UserScript==
$('body').append('<span id="sound" style="display:none;"></span>');
window.hasFocus = true;//set a variable to determine Focus or not.
$(window).bind('focus', function() {window.hasFocus = true;document.getElementById('sound').innerHTML = '';});
$(window).bind('blur', function() {window.hasFocus = false;});
$('head').append("<script>var AlertPing=function(type)\
	{\
	var playSound = function(link) {document.getElementById('sound').innerHTML='<audio src=\"'+link+'\" autoplay></audio>';};\
	if(type=='user-join') {playSound('http://images.wikia.com/monchbox/images/0/01/Beep-sound.ogg');}\
	if(type=='user-leave') {playSound('http://images.wikia.com/monchbox/images/0/01/Beep-sound.ogg');}\
	if(type=='user-post') {playSound('http://images.wikia.com/monchbox/images/0/01/Beep-sound.ogg');}\
	if(type=='name-alert') {playSound('http://images.wikia.com/monchbox/images/0/01/Beep-sound.ogg');}\
	else {playSound('http://images.wikia.com/monchbox/images/0/01/Beep-sound.ogg');}\
	}</script>");//Will add new sounds for each. This is temporary. Just setting it up!


NodeChatDiscussion.prototype.chatPing = function (chat)
	{
	var text = chat.attributes.text;
	if(chat.attributes.isInlineAlert && text != $.msg('chat-welcome-message',wgSiteName)) //Don't bother alerting when you first join!
		{AlertPing();return;}
	if(mainRoom.isInitialized && chat.attributes.name != wgUserName && !chat.attributes.isInlineAlert)
		{
		var pings = [wgUserName]; //List of items to alert on. wgUserName is ones own Username. May add more items.
		if(!window.hasFocus) //Only annoy people if the window isn't focused
			{
			for(var i = 0; i < pings.length; i++)
				{
				if(text.toLowerCase().indexOf(pings[i].toLowerCase()) != -1 || this != mainRoom.viewDiscussion)
					{AlertPing();this.scrollToBottom();break;return;}
				}
			if(document.getElementById('sound').innerHTML == '') //Only allert once, until focus is returned. Unless name is called.
				{AlertPing();return;}
			}
		}
	}
mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.chatPing, mainRoom.viewDiscussion));