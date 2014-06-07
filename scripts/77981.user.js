// ==UserScript==
// @name            "That's what she said." slim
// @namespace       skyboy@kongregate
// @description     Adds a "That's what she said." button and chat command (/TWSS or /twss) to kongregate chat
// @author          skyboy
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/review/72086
// ==/UserScript==
if (window.location.pathname.match(/\/games\/[^\/]\/[^\/]\/.+/)) {
	// we're not on the right page, kill it. throwing an error would be bad, since all of my scripts will use this
} else
window.location.assign("javascript:$('header').innerHTML+='<style>.TWSS{clear:none;margin:0px;padding:0px 0px;font-size:5pt;} .TWSSc{position:absolute;right:0px;top:0px}</style>';function sheSaid(){sendChatMessage('That\\\'s what she said.');holodeck.activeDialogue()._input_node.focus();return false};function sendChatMessage(a){a = a.replace(/\\\\(?!u[0-9a-fA-f]{4}|x[0-9a-fA-f]{2})/g, '\\\\\\\\');dispatchToKonduit({type:KonduitEvent.ROOM_MESSAGE,data:{message:a,room:holodeck.chatWindow()._active_room._room}});return a;};holodeck.addChatCommand('twss', sheSaid);holodeck.addChatCommand('TWSS', sheSaid);(function(){var a=$$('.room_name_container'),b,i;for(i in a){if(!(b=a[i]).TWSS)b.TWSS=b.innerHTML+=\"<span class='TWSSc'><input type='button' onclick='sheSaid();' class='TWSS' value='TWSS'></span>\";}})();window.sheSaid=sheSaid;window.sendChatMessage=sendChatMessage;void(0);")