// ==UserScript==
// @name	IP.Chat Extended History + Concise Format
// @namespace	Makaze
// @include	*
// @version	1.2.4
// ==/UserScript==

var extend,
opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
applyConcise = (opts.hasOwnProperty('ipc_apply_concise')) ? opts.ipc_apply_concise : false,
extendHistory = (opts.hasOwnProperty('ipc_extend_history')) ? opts.ipc_extend_history : true,
extension = (opts.hasOwnProperty('ipc_history_extension')) ? opts.ipc_history_extension : 10000,
changeInactiveKick = (opts.hasOwnProperty('ipc_change_inactive_kick')) ? opts.ipc_change_inactive_kick : true,
inactiveKick = (opts.hasOwnProperty('ipc_inactive_kick')) ? opts.ipc_inactive_kick : 0;

function extendHistoryFunc() {
	ipb.chat.maxMessages = extension;
}

function changeInactiveKickFunc() {
	ipb.chat.inactiveKick = inactiveKick;
}

function applyConciseFunc() {
	ipb.chat.templates['msg-1']		= new Template( "<li class='post chat-message #{ownclass}'><div style='margin-left: 0px; padding: 0px 5px;'><label style='margin: 0px; display: inline;'>#{username}</label>: <div style='display: inline; margin-left: 0px;'>#{message}</div></div></li>" );
	ipb.chat.templates['msg-1-compound']	= new Template( "<li class='post chat-message #{ownclass}'><div style='margin-left: 0px; padding: 0px 5px;'><label style='margin: 0px; display: inline;'>#{username}</label>: <div style='display: inline; margin-left: 0px;'>#{message}</div></div></li>" );
	ipb.chat.templates['msg-2']		= new Template( "<li class='post chat-notice'><div style='margin-left: 0px; padding: 0px 5px;'><label style='margin: 0px; display: inline;'>#{username}</label>#{action}</div></li>" );
	ipb.chat.templates['msg-3']		= new Template( "<li class='post chat-me'><div style='margin-left: 0px; padding: 0px 5px;'>**<label style='margin: 0px; display: inline;'>#{username}</label> #{message}**</div></li>" );
	ipb.chat.templates['msg-4']		= new Template( "<li class='post chat-system'>SYSTEM MESSAGE: #{message}</li>" );
	ipb.chat.templates['msg-5']		= new Template( "<li class='post chat-moderator'><div style='margin-left: 0px; padding: 0px 5px;'><label class='fluid' style='margin: 0px; display: inline;'>#{username}</label> kicked #{extra}</div></li>" );
	ipb.chat.templates['msg-K']		= new Template( "<li class='post chat-moderator'><div style='margin-left: 0px; padding: 0px 5px;'>You have been kicked from the chat room</div></li>" );
}

if (document.body.id === 'ipboard_body' && document.getElementById('storage_chatroom') != null) {
	extend = document.createElement('script');
	extend.setAttribute('type', 'text/javascript');
	extend.id = 'IPChatExtension';
	if (extendHistory) {
		extend.innerHTML += extendHistoryFunc.toString() + 'extendHistoryFunc();';
	}
	if (changeInactiveKick) {
		extend.innerHTML += changeInactiveKickFunc.toString() + 'changeInactiveKickFunc();';
	}
	if (applyConcise) {
		extend.innerHTML += applyConciseFunc.toString() + 'applyConciseFunc();';
	}

	document.body.appendChild(extend);
}