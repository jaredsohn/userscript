// ==UserScript==   
// @name            ExitGameChat
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.0.1
// @description     Exits game chat when the page loads.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/120982
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {
window.location.assign("javascript:void(document.observe('load', function(){holodeck.chatWindow().joinRoom(holodeck.chatWindow()._deferred_room_params),(function(){holodeck.chatWindow().setFirstAvailableRoomAsActive(['chat']),holodeck.leaveRoom('game'),$('game_room_tab').hide()}).delay(10)}));");
}, 50);
}