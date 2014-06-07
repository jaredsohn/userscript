// ==UserScript==
// @name           I lost the game
// @namespace      ganthor93@kongregate made the original, I mod'ed it for The Crunchy. I hope you don't mind. Please don't sue. ggppjj@kongregate
// @description    Adds a !g button and function to the Kongregate chat just for The Crunchy
// @include        http://www.kongregate.com/games/*/*
// @version        2.1
// @icon           http://images.wikia.com/kongregate/images/e/e1/The_Crunchy.png
// @require http://sizzlemctwizzle.com/updater.php?id=116775
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?#]+([\?#].*)?$/.test(window.location.pathname)) {
setTimeout(function(){
javascript:void(window.location.assign("javascript:$('header').innerHTML+='<style>.HEAD{clear:none;margin:0px;padding:0px 5px;} .HEADc{position:absolute;left:260px;top:3px}</style>';var timeObj={time:0};function g(){if(timeObj.time < new Date().getTime()){sendChatMessage('!g');timeObj.time=new Date().getTime()+7000}holodeck.activeDialogue()._input_node.focus();return false};function sendChatMessage(a){a = a.replace(/\\\\(?!u[0-9a-fA-f]{4}|x[0-9a-fA-f]{2})/g, '\\\\\\\\');dispatchToKonduit({type:KonduitEvent.ROOM_MESSAGE,data:{message:a,room:holodeck.chatWindow()._active_room._room}});return a;};holodeck.addChatCommand('!g', g);holodeck.addChatCommand('!G', g);(function(){var a=$$('.room_name_container'),b,i;for(i in a){if(!(b=a[i]).HEAD)b.HEAD=b.innerHTML+=\"<span class='HEADc'><input type='button' onclick='g();' class='HEAD' value='!g'></span>\";}})();window.g=g;window.sendChatMessage=sendChatMessage;void(0);"));
}, 1250);
}