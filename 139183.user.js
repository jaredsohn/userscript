// ==UserScript==
// @name        Milepoint Chat Hider
// @namespace   http://www.milepoint.com
// @description Hide the Milepoint help chat.
// @include     http://milepoint.com/*
// @include     http://www.milepoint.com/*

// @version     1.1
// ==/UserScript==

window.addEventListener('load',
function() {
   var scripts = document.getElementsByTagName('script');
    for(var i = 0; i < scripts.length; i++) {
        if(scripts[i].src.indexOf('livechatinc.com') != -1) {
            scripts[i].src = '';
        }
    }

    var chats = document.evaluate("//div[starts-with(@id, 'livechat-')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for(var i = 0; i < chats.snapshotLength; i++) {
        chats.snapshotItem(i).style.display='none';
    }
}, true);
