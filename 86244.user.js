// ==UserScript==   
// @name            MessageTimev2
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.2.0
// @description     Each message shows what time it was sent at when you hover the mouse over it; when you copy a message the time is pre-pended to it. After a minute without any room messages or whispers being sent, a notification with the last time will pop up in chat. When a new one comes up, the old one is removed, with whispers(collectively, not per-user)/rooms each having their own.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/86244
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {
	javascript:void(window.location.assign("javascript:void($$('head').invoke('insert','<style>.skytimecont{float:left;text-indent:-9999px;width:0}.skytimemessage {color:#777;border-top:1px solid #333;border-bottom:1px dashed #333;background-color:#c9c9c9}</style>'));"), setTimeout(function(){javascript:void(window.location.assign("javascript:void(document.observe('holodeck:ready',function(){var a=ChatDialogue.prototype,q=a.insert,e=new Element('div'),E=new Element('div'),o={delay:60000},m=function(m,r){var a=holodeck.chatWindow().room(r)||holodeck.chatWindow(),d=$(r+'m');if(a){if(d)d.remove();holodeck.scheduleRender(function(){a.insert('<p id=\"'+r+'m\" class=\"sky'+(r?'room':'pm')+'messagetime skytimemessage\">'+m+'</p>')});}},f=function(event){if(event.data.room){clearTimeout(o[event.data.room.id]);o[event.data.room.id]=setTimeout(m,o.delay,'Last message received at '+(new Date()).toLocaleTimeString(),event.data.room.id)}else{clearTimeout(o.user);o.user=setTimeout(m,o.delay,'Last whisper received at ' + (new Date()).toLocaleTimeString(),0)}};a.insert=function(w){var a=(new Date()).toLocaleTimeString();e.update(w).firstDescendant().writeAttribute('title', a).insert({top:'<span class=\"skytimecont\">'+a+'&nbsp;</span>'});return q.call(this,e.firstDescendant()? e.firstDescendant().remove():e.innerHTML);};holodeck.registerKonduitCallback(KonduitEvent.PRIVATE_MESSAGE,f);holodeck.registerKonduitCallback(KonduitEvent.ROOM_MESSAGE,f)}))"));}, 100));
}, 1250);
}