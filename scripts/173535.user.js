// ==UserScript==
// @name        Siemens Forum Private Message Notification
// @namespace   https://www.automation.siemens.com/WW/forum
// @description Notifies about the amount of private messages on Siemens forum
// @include     https://www.automation.siemens.com/WW/forum/*
// @exclude     https://www.automation.siemens.com/WW/forum/members/UserInbox*
// @version     1.0
// ==/UserScript==

var links = document.getElementsByClassName('arrow');
var lnkLength = links.length;
var msgObj = null;
var msgAmount = 0;

for ( var i = 1; i < lnkLength; i++ ) {
    if ( links[i].text.search("Private Messages ") == 0 ) {
        msgObj = links[i];
        break;
    }
}

if ( msgObj != null ) {
    msgAmount = msgObj.text.match(/\d+/);
    if ( msgAmount > 0 ) {
        alert('You have  ' + msgAmount + '  unread private messages!');
    }
}