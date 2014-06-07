// ==UserScript==
// @name       IRCCloud Toolkit
// @namespace  http://toxic-productions.com/irccloud
// @version    1.2
// @description  Adds links to IRCCloud for carrying out various operations
// @include      https://*irccloud.com/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @copyright  2013 Toxic-Productions
// @run-at document-body
// ==/UserScript==

document.getElementById('statusActions').innerHTML += ' | <span id="clearBacklog" style="display: inline;"><a href="#">Clear backlog</a></span> | <span id="markAllRead" style="display: inline;"><a href="#">Mark all as read</a></span>';
var el = document.getElementById('clearBacklog');

if (el.addEventListener){
    el.addEventListener("click",clearBacklog,false);
}else{
    el.attachEvent('onclick',clearBacklog);
}
el = document.getElementById('markAllRead');

if (el.addEventListener){
    el.addEventListener("click",markAllAsRead,false);
}else{
    el.attachEvent('onclick',markAllAsRead);
}

function markAllAsRead(){
    SESSION.buffers.each(function (b) { b.setLastSeen(b.messages.last()) });
}
function clearBacklog(){
	$(cbv().scroll.log.el).empty();
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('function markAllAsRead(){ SESSION.buffers.each(function (b) { b.setLastSeen(b.messages.last()) }); } function clearBacklog(){ $(cbv().scroll.log.el).empty(); }'));