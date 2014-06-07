// ==UserScript==
// @name            AutoAfk
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     Automatically marks you as AFK after a specified period of time greater than zero.  Type "/aafk time_in_minutes" to automatically go afk after time_in_minutes; "/aafk 0.1" will mark you as afk 6 seconds after you send a message
// @include         http://www.kongregate.com/games/*/*
// @exclude         http://www.kongregate.com/games/*/*/*
// @homepage        http://userscripts.org/scripts/show/72449
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
window.location.assign("javascript:(function(){var a=ChatDialogue.prototype.sendInput,t=function(){clearTimeout(window.skyAFKTimer);window.skyAFKTimer=setTimeout(\"holodeck.setPresenceAway();\",window.skyAFKTimout||900000);a.apply(this,arguments)};holodeck.addChatCommand(\"aafk\",function(b,d){var a=window.skyAFKTimout=(parseFloat((d.match(/^\\/aafk\\s*((?:(\\d+)?\\.\\d)|\\d+)/i)||[0,\"15\"])[1],10)*60000)||900000;Cookie.set(\"afkAFKTimeout\",a);window.skyAFKTimer=setTimeout(\"holodeck.setPresenceAway();\",a);return false});holodeck.chatWindow()._rooms.each(function(T){T.value._chat_dialogue.sendInput=t});window.skyAFKTimeout=parseInt(Cookie.get(\"afkAFKTimeout\"),10)||900000;(function(){try{if($(holodeck.chatWindow()._active_room.usernameNodeId(holodeck.username())).parentNode.className.match(/\\baway\\b/)){return;}}catch(e){clearTimeout(window.skyAFKTimer);var a=window.skyAFKTimeout||900000;window.skyAFKTimer=setTimeout(\"holodeck.setPresenceAway();\",a);arguments.callee.delay((a+50)||10)}}).defer()})();void(0)");
}, 1250);