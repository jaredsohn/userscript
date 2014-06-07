// ==UserScript==
// @name       NK Message Alert
// @namespace  http://ninjakiwi.com
// @version    0.1
// @description  Alert for messages on Ninja Kiwi
// @match      http://ninjakiwi.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
var msgbox = document.getElementsByClassName('unread-count');
if (msgbox.length){
    var msgcount = msgbox[0].innerHTML;
    var oldmsgcount = GM_getValue("oldmsgcount");
    if (msgcount > oldmsgcount) {
        var plural = "";
        if (msgcount > 1) {
            plural = "s";
        }
        if (confirm('You have '+msgcount+' new private message'+plural+'.\n\nPress OK to open inbox, or cancel to hide this prompt.')) {
            if (confirm('Open inbox in new window?\n\n(Press cancel to view in current window)')) {
                window.open('/users/messages/','_blank', 'height=600px, width=1030px');
            }
            else {
                location.href = '/users/messages/';
            }}}}
else {
    msgcount = 0;
}
GM_setValue("oldmsgcount", msgcount);