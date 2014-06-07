 // ==UserScript==
// @name            DW
// @namespace       skyboy@kongregate
// @description     none
// @author          skyboy
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/review/72086
// ==/UserScript==
if (window.location.pathname.match(/\/games\/[^\/]\/[^\/]\/.+/)) {
	// we're not on the right page, kill it. throwing an error would be bad, since all of my scripts will use this
} else
window.location.assign("javascript:$('header').innerHTML+='<style>.DW{clear:none;margin:0px;padding:0px 0px;font-size:5pt;} .DWc{position:absolute;right:30px;top:0px}</style>';function ddubs(){sendChatMessage('DDUBS! OM LAM LAM LAM!');holodeck.activeDialogue()._input_node.focus();return false};function sendChatMessage(a){a = a.replace(/\\\\(?!u[0-9a-fA-f]{4}|x[0-9a-fA-f]{2})/g, '\\\\\\\\');dispatchToKonduit({type:KonduitEvent.ROOM_MESSAGE,data:{message:a,room:holodeck.chatWindow()._active_room._room}});return a;};holodeck.addChatCommand('DW', ddubs);holodeck.addChatCommand('DW', ddubs);(function(){var a=$$('.room_name_container'),b,i;for(i in a){if(!(b=a[i]).DW)b.DW=b.innerHTML+=\"<span class='DWc'><input type='button' onclick='ddubs();' class='DW' value='DW'></span>\";}})();window.ddubs=ddubs;window.sendChatMessage=sendChatMessage;void(0);")