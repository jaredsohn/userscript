// ==UserScript==
// @name				Kongregate Chat Timestamp - jonathanasdf edition
// @namespace				tag://kongregate
// @include				http://www.kongregate.com/games/*
// @author				Ventero
// ==/UserScript==

// Original Written by Ventero (http://www.kongregate.com/accounts/Ventero) 06/04/09
// Rewritten by jonathanasdf as example to his Right Click Menu script.

function init(){
	if(this.holodeck && this.ChatDialogue){
	

		this.ChatDialogue.MESSAGE_TEMPLATE.template = '<p class="#

{classNames}"><span username="#{username}" time="#{time}" class="#{userClassNames}">#

{prefix}#{username}</span>: #{message}</p>';
		
		this.ChatDialogue.prototype.displayUnsanitizedMessage = function(username, 

message, attributes, options) {
			if (this._user_manager.isMuted(username)) { return; }
			
			if (!attributes) { attributes = {}; }
			if (!options) { options = {}; }
			var clickable = !options.non_user,
					username_class = clickable ? 

'chat_message_window_username' : 'chat_message_window_undecorated_username',
					is_self = (username == this._user_manager.username

()),
					classNames = [],
					userClassNames = [username_class],
					user_manager = this._user_manager,
					prefix = options['private'] ? 'To ' : '',
					date = new Date(),
					hours = date.getHours(),
					minutes = date.getMinutes(),
					seconds = date.getSeconds();
					time = (hours<10?(hours==0?"12":"0"+hours):

(hours>12?(hours>21?hours-12:"0"+(hours-12)):hours))+":"+(minutes<10?"0":"")+minutes+":"+

(seconds<10?"0":"")+seconds+(hours>11?" PM":" AM");
			
			if (this._messages_count % 2) { classNames.push('even'); }
			if (attributes['class']) { classNames.push(attributes['class']); }
			if (is_self) { userClassNames.push('is_self'); }
			
			var dialogue = this,
					content	= 

unsafeWindow.ChatDialogue.MESSAGE_TEMPLATE.evaluate({
											

prefix:					prefix,
											

username:				username,
											

message:				message,
											

time:						time,
											

classNames:			classNames.join(" "),
											

userClassNames:	userClassNames.join(" ")
										});
			dialogue.insert(content);
			this._messages_count++;
		}
		
		if (unsafeWindow.SimpleContextMenu) {
			unsafeWindow.SimpleContextMenu.addStaticItem

('kongregate_chat_timestamp', checkTime);
		}	

	}
};

function checkTime(attributes) {
	if (attributes.getNamedItem("time")) {
		return attributes.getNamedItem("time").value.toString() + '<br>';
	} else return '';
}

setTimeout(init, 0);