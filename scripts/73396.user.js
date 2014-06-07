// ==UserScript==
// @name            FriendCommands
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     Adds commands to add and remove people from your friends list. /add <username> /friend <username> /unadd <username> /remove <username> /unfriend <username>
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/73396
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
	window.location.assign("javascript:void(document.observe('holodeck:ready',function(){(function(){var t=ChatRoom.prototype.refreshUsers=function(e){for(var d=0,b,a=e.length;d<a;d++){b=this.user(e[d]);if(!!b){this.userChanged({data:{user:b,force:true}})}};holodeck.chatWindow()._rooms.values().each(function(f){f.refreshUsers=t})}})();function aD(b){return b.activeDialogue()};var eUC=encodeURIComponent,o={n:function(b){return b.username()},e:function(b){aD(b).kongBotMessage('Enter a username between three and sixteen characters long.')},u:function(n,b){var g;b.chatWindow()._rooms.values().each(function(f){ if(!g){g=f.user(n);if(g)g=g.username}});return(g)},a:function(a,b){return(!aD(b)._user_manager._friends[a.toLowerCase()])},aU:function(a,b){new Ajax.Request('http://www.kongregate.com/accounts/'+o.n(b)+'/friends/'+a+'.chat', {asynchronous:true, evalScripts:true, method:o.ar(a,b,0), onSuccess:function(r){aD(b).kongBotMessage(a+' was '+o.ar(a,b,1)+' for '+o.n(b)+'.') }, parameters:'authenticity_token='+eUC(active_user.formAuthenticityToken())} );},ar:function(a,b,c){return(c?this.a(a,b)?'removed':'added':this.a(a,b)?'delete':'put')}},mute=(function(b,d){d=(d.match(/^\\/(?:add|friend)\\s*([a-z0-9_]{3,16})/i)||[0,0])[1];if(d!=0){if(this.a(d,b))b.addFriend(d=this.u(d,b)||d),this.aU(d,b)}else{this.e(b)}return(!1)}).bind(o),umute=(function(b,d){d=(d.match(/^\\/(?:unadd|remove|unfriend)\\s*([a-z0-9_]{3,16})/i)||[0,0])[1];if(d!=0){if(!this.a(d,b))b.removeFriend(d=this.u(d,b)||d),this.aU(d,b)}else{this.e(b)}return !1}).bind(o);holodeck.addChatCommand('add', mute);holodeck.addChatCommand('friend', mute);holodeck.addChatCommand('unadd', umute);holodeck.addChatCommand('remove', umute);holodeck.addChatCommand('unfriend', umute)}))");
}, 1250);