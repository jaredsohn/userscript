// ==UserScript==   
// @name            Fix Base64 Chat Issue
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.0.4
// @description     Fixes the issue of chat being displayed in Base64 caused by Ventero's scripts
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/84495
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {
window.location.assign('javascript:(function(){var a=ChatRoom.prototype,fixit=function(){var b = a.receivedMessage;a.receivedMessage= function(m){m.data.message= Base64.decode(m.data.message);return b.call(this,m)}};setInterval( (function(){try{a.receivedMessage.call({_chat_dialogue:{displayMessage:function(u,m){if(m!="YQ==")return; fixit();}}}, {data:{message:"YQ==",user:{}}}); return arguments.callee}catch(e){fixit()}})(), 25000);})();void(0)');
}, 1250);
}