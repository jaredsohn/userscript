// ==UserScript==
// @name            "Tardface." slim
// @namespace       skyboy@kongregate
// @description     Adds a "That's what she said." button and chat command (/tard or /tard) to kongregate chat
// @author          skyboy
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/review/72086
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
window.location.assign("javascript:$('header').innerHTML+='<style>.tard{clear:none;margin:0px;padding:0px 5px;} .tardc{position:absolute;left:235px;top:0px}</style>';function hurr(){sendChatMessage('(ºд.ಠ) HURRRRRR');holodeck.activeDialogue()._input_node.focus();return false};function sendChatMessage(a){a = a.replace(/\\\\(?!u[0-9a-fA-f]{4}|x[0-9a-fA-f]{2})/g, '\\\\\\\\');dispatchToKonduit({type:KonduitEvent.ROOM_MESSAGE,data:{message:a,room:holodeck.chatWindow()._active_room._room}});return a;};holodeck.addChatCommand('tard', hurr);holodeck.addChatCommand('TARD', hurr);(function(){var a=$$('.room_name_container'),b,i;for(i in a){if(!(b=a[i]).tard)b.tard=b.innerHTML+=\"<span class='tardc'><input type='button' onclick='hurr();' class='tard' value='(º?.?)'></span>\";}})();window.hurr=hurr;window.sendChatMessage=sendChatMessage;void(0);")