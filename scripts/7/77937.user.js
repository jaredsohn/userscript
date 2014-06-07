 // ==UserScript==
// @name            AHS
// @namespace       skyboy@kongregate
// @description     none
// @author          skyboy
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/review/72086
// ==/UserScript==
if (window.location.pathname.match(/\/games\/[^\/]\/[^\/]\/.+/)) {
	// we're not on the right page, kill it. throwing an error would be bad, since all of my scripts will use this
} else
window.location.assign("javascript:$('header').innerHTML+='<style>.AHS{clear:none;margin:0px;padding:0px 0px;font-size:5pt;} .AHSc{position:absolute;right:51px;top:0px}</style>';function ahsem(){sendChatMessage('AHS! Σ:3♥*!');holodeck.activeDialogue()._input_node.focus();return false};function sendChatMessage(a){a = a.replace(/\\\\(?!u[0-9a-fA-f]{4}|x[0-9a-fA-f]{2})/g, '\\\\\\\\');dispatchToKonduit({type:KonduitEvent.ROOM_MESSAGE,data:{message:a,room:holodeck.chatWindow()._active_room._room}});return a;};holodeck.addChatCommand('AHS', ahsem);holodeck.addChatCommand('AHS', ahsem);(function(){var a=$$('.room_name_container'),b,i;for(i in a){if(!(b=a[i]).AHS)b.AHS=b.innerHTML+=\"<span class='AHSc'><input type='button' onclick='ahsem();' class='AHS' value='AHS'></span>\";}})();window.ahsem=ahsem;window.sendChatMessage=sendChatMessage;void(0);")