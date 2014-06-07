// ==UserScript==
// @name           mj Notification Counter
// @namespace      facebook.com
// @description    SHow number of notification in title bar
// @include        http*://*facebook.com/*
// ==/UserScript==

/**
 * @author Mostafa J
 * @version 1.0
 */
function countNotification(){
    try {
        var strong = document.getElementById('presence_notifications_count').getElementsByTagName('strong');
    } 
    catch (e) {
    }
    try {
        count = strong[0].innerHTML;
        if (!count) {
            count = '0';
        }
    } 
    catch (e) {
        count = '0';
    }
    
    text = document.title;
    if (document.title[0] == '[') {
        text = text.substring(text.indexOf("]") + 2, text.length);
    }
    
    
    document.title = '[' + count + '] ' + text
    
    window.setTimeout(function(){
        countNotification();
    }, 1000);
    
}

countNotification();


