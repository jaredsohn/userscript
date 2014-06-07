// ==UserScript==
// @name            MiscCommands
// @namespace       skyboy@kongregate
// @description     Adds a number of misc. commands to chat, like /slap username
// @author          skyboy
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/75201
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
window.location.assign("javascript:function foc(){holodeck.activeDialogue()._input_node.focus();};function s(b,a){sendChatMessage('*slaps'+a.replace(/\\/slap/,'')+' with a trout*');foc();return false};function r(a){return a.replace(/\\\\(?!u[0-9a-fA-f]{4}|x[0-9a-fA-f]{2})/g, '\\\\\\\\')};function sp(b,a){sendPrivMessage('*slaps you with a trout*',a); return false};function sendChatMessage(a){dispatchToKonduit({type:KonduitEvent.ROOM_MESSAGE,data:{message:r(a),room:holodeck.chatWindow()._active_room._room}});return a;};function sendPrivMessage(a,b){dispatchToKonduit({type:KonduitEvent.PRIVATE_MESSAGE,data:{message:r(a),username:b.replace(/\\/\\S*\\s([\\s\\S]+)/,'$1')}});return a;};holodeck.addChatCommand('slap', s);holodeck.addChatCommand('pmslap', sp);void(0);")