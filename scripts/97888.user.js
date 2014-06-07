// ==UserScript==
// @name           Combo Breaker
// @namespace      ganthor93@kongregate
// @description    Adds a C-C-Combo Breaker button and function to the Kongregate chat
// @include        http://www.kongregate.com/games/*/*
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?#]+([\?#].*)?$/.test(window.location.pathname)) {
setTimeout(function(){
javascript:void(window.location.assign("javascript:$('header').innerHTML+='<style>.CCCB{clear:none;margin:0px;padding:0px 5px;} .CCCBc{position:absolute;left:185px;top:3px}</style>';var timeObj={time:0};function comboBreaker(){if(timeObj.time < new Date().getTime()){sendChatMessage('C-C-Combo Breaker');timeObj.time=new Date().getTime()+7000}holodeck.activeDialogue()._input_node.focus();return false};function sendChatMessage(a){a = a.replace(/\\\\(?!u[0-9a-fA-f]{4}|x[0-9a-fA-f]{2})/g, '\\\\\\\\');dispatchToKonduit({type:KonduitEvent.ROOM_MESSAGE,data:{message:a,room:holodeck.chatWindow()._active_room._room}});return a;};holodeck.addChatCommand('cccb', comboBreaker);holodeck.addChatCommand('CCCB', comboBreaker);(function(){var a=$$('.room_name_container'),b,i;for(i in a){if(!(b=a[i]).CCCB)b.CCCB=b.innerHTML+=\"<span class='CCCBc'><input type='button' onclick='comboBreaker();' class='CCCB' value='CCCB'></span>\";}})();window.comboBreaker=comboBreaker;window.sendChatMessage=sendChatMessage;void(0);"));
}, 1250);
}