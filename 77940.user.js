// ==UserScript==
// @name            ac
// @namespace       skyboy@kongregate
// @description     none
// @author          skyboy
// @include         http://www.kongregate.com/games/*/*
// ==/UserScript==
if (window.location.pathname.match(/\/games\/[^\/]\/[^\/]\/.+/)) {
	// we're not on the right page, kill it. throwing an error would be bad, since all of my scripts will use this
} else
window.location.assign("javascript:$('header').innerHTML+='<style>.ac{clear:none;margin:0px;padding:0px 0px;font-size:5pt;} .acc{position:absolute;right:61px;top:13px}</style>';function andeh(){sendChatMessage('AAAAAAANDEH CANDEH!');holodeck.activeDialogue()._input_node.focus();return false};function sendChatMessage(a){a = a.replace(/\\\\(?!u[0-9a-fA-f]{4}|x[0-9a-fA-f]{2})/g, '\\\\\\\\');dispatchToKonduit({type:KonduitEvent.ROOM_MESSAGE,data:{message:a,room:holodeck.chatWindow()._active_room._room}});return a;};holodeck.addChatCommand('ac', andeh);holodeck.addChatCommand('ac', andeh);(function(){var a=$$('.room_name_container'),b,i;for(i in a){if(!(b=a[i]).ac)b.ac=b.innerHTML+=\"<span class='acc'><input type='button' onclick='andeh();' class='ac' value='AND'></span>\";}})();window.andeh=andeh;window.sendChatMessage=sendChatMessage;void(0);")