 // ==UserScript==
// @name            vorp
// @namespace       skyboy@kongregate
// @description     none
// @author          skyboy
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/review/72086
// ==/UserScript==
if (window.location.pathname.match(/\/games\/[^\/]\/[^\/]\/.+/)) {
	// we're not on the right page, kill it. throwing an error would be bad, since all of my scripts will use this
} else
window.location.assign("javascript:$('header').innerHTML+='<style>.VORP{clear:none;margin:0px;padding:0px 0px;font-size:5pt;} .VORPc{position:absolute;right:0px;top:13px}</style>';function vorc(){sendChatMessage('VORCHILLEEEEEES!');holodeck.activeDialogue()._input_node.focus();return false};function sendChatMessage(a){a = a.replace(/\\\\(?!u[0-9a-fA-f]{4}|x[0-9a-fA-f]{2})/g, '\\\\\\\\');dispatchToKonduit({type:KonduitEvent.ROOM_MESSAGE,data:{message:a,room:holodeck.chatWindow()._active_room._room}});return a;};holodeck.addChatCommand('vorp', vorc);holodeck.addChatCommand('VORP', vorc);(function(){var a=$$('.room_name_container'),b,i;for(i in a){if(!(b=a[i]).VORP)b.VORP=b.innerHTML+=\"<span class='VORPc'><input type='button' onclick='vorc();' class='VORP' value='VORP'></span>\";}})();window.vorc=vorc;window.sendChatMessage=sendChatMessage;void(0);")