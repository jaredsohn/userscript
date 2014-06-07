// ==UserScript==
// @name            AFK Beep
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.0.0
// @description     Plays a beep when your name is mentioned in chat or you are pm'd while you're AFK.
// @include         http://www.kongregate.com/games/*/*
// @exclude         http://www.kongregate.com/games/*/*/*
// @homepage        http://userscripts.org/scripts/show/72295
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
window.location.assign("javascript:$('gamepage_header').innerHTML+='<span><object type=\"application/x-shockwave-flash\" data=\"http://www.swfcabin.com/swf-files/1255396997.swf\" width=\"1\" height=\"1\" id=\"Beep_AFK\" style=\"position: absolute; top: 0px; left: 0px; height: 1px; width: 1px; visibility: visible;\"><param name=\"allowscriptaccess\" value=\"always\"><param name=\"allownetworking\" value=\"all\"></object></span>';function listner(obj){var type=obj.type,chatWindow=holodeck.chatWindow(),user=chatWindow.activeRoom().user(holodeck.username()),afk=user.variables.presence==KonduitPresenceType.AWAY,regex=new RegExp(\"(\"+holodeck.username().toLowerCase()+\")\",\"i\");obj=obj.data;switch(type){case KonduitEvent.ROOM_MESSAGE:if(afk&&!chatWindow.isMuted(obj.user.username)&&obj.message.match(regex)){$('Beep_AFK').play();}break;case KonduitEvent.PRIVATE_MESSAGE:if(afk&&!chatWindow.isMuted(obj.from)){$('Beep_AFK').play();}break;}};holodeck._event_dispatcher.register(KonduitEvent.ROOM_MESSAGE, function(a){listner(a)});holodeck._event_dispatcher.register(KonduitEvent.PRIVATE_MESSAGE, function(a){listner(a)});\"\"+holodeck._event_dispatcher.register;void(0);");
}, 1250);
"This is one of my less clean scripts, and could possibly be broken by other scripts.";
"Maybe one day I'll get around to cleaning it up.";