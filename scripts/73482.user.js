// ==UserScript==
// @name            ReloadCommands
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     Adds a command to reload your chat, game, or the entire page. /reload /reload game /reload g /reload all /reload page /reload p
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/73482
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
javascript:void(window.location.assign("javascript:void(document.observe('holodeck:ready',function(){var rC=(function(){var d=$(\"konduit\").nextElementSibling.innerHTML+\"\\n/* */holodeck._konduit=!1\";holodeck.chatWindow()._rooms.each(function(T){try{T.value.destroy()}catch(e){}});holodeck.chatWindow()._rooms=new Hash();holodeck.showDisconnectedIndicator();$(\"chat_default_content\").show();holodeck.updateDefaultChatTabMessage(\"Reloading Chat...\");eval(d);holodeck._has_logged_in=holodeck.chatWindow()._logged_in_to_chat=!1;new Ajax.Request(holodeck.chatWindow()._chat_bootstrap_url, {method:'post',parameters:{room_id:Cookie.get(\"kong_room_id\")}, onSuccess:function(a){console.log(a);eval(a.responseText)}});}).bind(window),r=function(b,d,q){d=(d.match(/^\\/reload\\s*([a-z]+)/i)||[0,0])[1];try{if(d!=0){switch(d.toLowerCase()){case 'page':case 'p':case 'all':d=window.location.href;if(window.location.hash)d=d.replace(/#.*$/,'');if((q=window.location.search)||((q='?0&0.1')&&false))d=d.replace(/\\?.*/,'');if(!(q.indexOf('&')+1))q+='&0.1';window.location.href=d+q.replace(/\\d?[.]?\\d+$/,'')+Math.random();break;case 'game':case 'g':case 'flash':activateGame();break;default:throw 0;}}else{throw 0}}catch(e){if(e!=0){throw e}rC.defer()}return false};holodeck.addChatCommand(\"reload\",r);window.reloadKonduit=rC;$('chat_connected_indicator').up('.user_connection').observe('dblclick',rC);}))"));
}, 1250);